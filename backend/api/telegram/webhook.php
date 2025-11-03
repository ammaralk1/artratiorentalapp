<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/telegram.php';

use Throwable;

function tg_reply_text(string $chatId, string $text): void {
    try { sendTelegramText($chatId, $text); } catch (Throwable $_) {}
}

try {
    // Optional: verify Telegram secret token header if configured
    try {
        $cfg = getTelegramConfig();
        if (!empty($cfg['secret_token'])) {
            // Header comes as X-Telegram-Bot-Api-Secret-Token (PHP exposes as HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN)
            $provided = $_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'] ?? '';
            if (!hash_equals((string)$cfg['secret_token'], (string)$provided)) {
                // Silently ignore to not leak details
                echo 'ok';
                exit;
            }
        }
    } catch (Throwable $_) { /* ignore and proceed */ }

    // Telegram sends POST JSON updates
    $raw = file_get_contents('php://input') ?: '';
    $update = $raw !== '' ? json_decode($raw, true) : null;
    if (!is_array($update)) { echo 'ok'; exit; }

    $pdo = getDatabaseConnection();
    // Minimal handling for callback_query (inline buttons)
    if (isset($update['callback_query']) && is_array($update['callback_query'])) {
        $cb = $update['callback_query'];
        $chatId = isset($cb['message']['chat']['id']) ? (string)$cb['message']['chat']['id'] : '';
        $data = isset($cb['data']) ? (string)$cb['data'] : '';
        // Store as inbound control event for visibility (optional)
        try {
            $pdo->exec("CREATE TABLE IF NOT EXISTS telegram_messages (
              id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
              message_id BIGINT NULL,
              chat_id VARCHAR(64) NOT NULL,
              technician_id BIGINT UNSIGNED NULL,
              direction ENUM('inbound','outbound') NOT NULL,
              text TEXT NULL,
              from_id BIGINT NULL,
              from_username VARCHAR(191) NULL,
              raw_json JSON NULL,
              media_json JSON NULL,
              created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              INDEX idx_tm_chat (chat_id),
              INDEX idx_tm_tech (technician_id),
              INDEX idx_tm_created (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
            if ($chatId !== '') {
                $stmt = $pdo->prepare('INSERT INTO telegram_messages (chat_id, direction, text, raw_json) VALUES (:cid, :dir, :txt, :raw)');
                $stmt->execute(['cid' => $chatId, 'dir' => 'inbound', 'txt' => $data !== '' ? ('callback:' . $data) : 'callback', 'raw' => json_encode($cb, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)]);
            }
        } catch (Throwable $_) {}
        // Acknowledge callback to remove client-side spinner if possible
        try {
            $cfg = getTelegramConfig();
            if (!empty($cfg['enabled']) && extension_loaded('curl') && !empty($cb['id'])) {
                $endpoint = sprintf('%s/bot%s/answerCallbackQuery', $cfg['api_base'], $cfg['bot_token']);
                $ch = curl_init($endpoint);
                curl_setopt_array($ch, [
                    CURLOPT_POST => true,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_HTTPHEADER => [ 'Content-Type: application/json' ],
                    CURLOPT_POSTFIELDS => json_encode(['callback_query_id' => (string)$cb['id']], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    CURLOPT_TIMEOUT => 10,
                ]);
                curl_exec($ch);
                curl_close($ch);
            }
        } catch (Throwable $_) {}
        echo 'ok';
        exit;
    }

    $msg = $update['message'] ?? $update['channel_post'] ?? null;
    if (!$msg) { echo 'ok'; exit; }
    $chat = $msg['chat'] ?? [];
    $chatId = isset($chat['id']) ? (string)$chat['id'] : '';
    if ($chatId === '') { echo 'ok'; exit; }

    $text = trim((string)($msg['text'] ?? ''));

    // Handle /start <token>
    if (str_starts_with($text, '/start')) {
        $parts = preg_split('/\s+/', $text);
        $token = isset($parts[1]) ? trim((string)$parts[1]) : '';
        if ($token !== '') {
            // try to resolve token
            $stmt = $pdo->prepare('SELECT id, context, technician_id, phone FROM telegram_links WHERE token = :t LIMIT 1');
            $stmt->execute(['t' => $token]);
            $link = $stmt->fetch();
            if ($link) {
                // mark used
                $pdo->prepare('UPDATE telegram_links SET chat_id = :cid, used_at = NOW() WHERE id = :id')
                    ->execute(['cid' => $chatId, 'id' => (int)$link['id']]);

                $resolvedName = null;
                if ((string)$link['context'] === 'technician' && !empty($link['technician_id'])) {
                    // store on technician record too
                    try {
                        $tid = (int)$link['technician_id'];
                        $pdo->prepare('UPDATE technicians SET telegram_chat_id = :cid WHERE id = :tid LIMIT 1')
                            ->execute(['cid' => $chatId, 'tid' => $tid]);
                        $sName = $pdo->prepare('SELECT full_name FROM technicians WHERE id = :tid LIMIT 1');
                        $sName->execute(['tid' => $tid]);
                        $n = $sName->fetchColumn();
                        if ($n) $resolvedName = (string)$n;
                    } catch (Throwable $_) {}
                } elseif (!empty($link['phone'])) {
                    // try to map by normalized phone if technician_id is absent
                    try {
                        $digits = telegramNormalizePhone((string)$link['phone']);
                        if ($digits !== '') {
                            // match technicians by digits-only comparison
                            $q = $pdo->prepare('SELECT id, full_name, phone FROM technicians');
                            $q->execute();
                            while ($rowT = $q->fetch()) {
                                $tPhone = telegramNormalizePhone((string)($rowT['phone'] ?? ''));
                                if ($tPhone !== '' && $tPhone === $digits) {
                                    $pdo->prepare('UPDATE technicians SET telegram_chat_id = :cid WHERE id = :tid LIMIT 1')
                                        ->execute(['cid' => $chatId, 'tid' => (int)$rowT['id']]);
                                    $resolvedName = (string)($rowT['full_name'] ?? '');
                                    break;
                                }
                            }
                        }
                    } catch (Throwable $_) {}
                }
                // update technician_name on this link for quick inspection
                if ($resolvedName) {
                    try {
                        $pdo->prepare('UPDATE telegram_links SET technician_name = :nm WHERE id = :id LIMIT 1')
                            ->execute(['nm' => $resolvedName, 'id' => (int)$link['id']]);
                    } catch (Throwable $_) {}
                }
                tg_reply_text($chatId, "✅ Your Telegram has been linked. You'll now receive notifications here.");
                echo 'ok';
                exit;
            }
        }
        tg_reply_text($chatId, 'Welcome! Please ask your admin for a valid linking link.');
        echo 'ok';
        exit;
    }

    // For any other inbound message, store it for admin viewing
    try {
        // Ensure messages table exists
        $pdo->exec("CREATE TABLE IF NOT EXISTS telegram_messages (
          id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          message_id BIGINT NULL,
          chat_id VARCHAR(64) NOT NULL,
          technician_id BIGINT UNSIGNED NULL,
          direction ENUM('inbound','outbound') NOT NULL,
          text TEXT NULL,
          from_id BIGINT NULL,
          from_username VARCHAR(191) NULL,
          raw_json JSON NULL,
          media_json JSON NULL,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_tm_chat (chat_id),
          INDEX idx_tm_tech (technician_id),
          INDEX idx_tm_created (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
        // Add media_json if missing
        try {
            $chk = $pdo->prepare("SHOW COLUMNS FROM telegram_messages LIKE 'media_json'");
            $chk->execute();
            if (!$chk->fetch()) { $pdo->exec("ALTER TABLE telegram_messages ADD COLUMN media_json JSON NULL"); }
        } catch (Throwable $_) {}

        // Try to resolve technician_id by chat_id
        $techId = 0;
        try {
            $s = $pdo->prepare('SELECT id FROM technicians WHERE telegram_chat_id = :cid LIMIT 1');
            $s->execute(['cid' => $chatId]);
            $techId = (int) ($s->fetchColumn() ?: 0);
            if ($techId <= 0) {
                // fallback via telegram_links reverse lookup
                $s2 = $pdo->prepare("SELECT technician_id FROM telegram_links WHERE chat_id = :cid AND technician_id IS NOT NULL ORDER BY used_at DESC LIMIT 1");
                $s2->execute(['cid' => $chatId]);
                $techId = (int) ($s2->fetchColumn() ?: 0);
            }
        } catch (Throwable $_) { $techId = 0; }

        // Detect inbound photo(s)
        $media = null;
        if (isset($msg['photo']) && is_array($msg['photo']) && count($msg['photo']) > 0) {
            // pick largest size id for preview; also store all ids
            $all = $msg['photo'];
            $best = $all[count($all)-1];
            $ids = [];
            foreach ($all as $p) { if (!empty($p['file_id'])) { $ids[] = (string)$p['file_id']; } }
            $media = [ 'photos' => $ids, 'best' => isset($best['file_id']) ? (string)$best['file_id'] : null ];
        }

        $stmt = $pdo->prepare('INSERT INTO telegram_messages (message_id, chat_id, technician_id, direction, text, from_id, from_username, raw_json, media_json) VALUES (:mid, :cid, :tid, :dir, :txt, :fromid, :fromuser, :raw, :media)');
        $stmt->execute([
            'mid' => isset($msg['message_id']) ? (int)$msg['message_id'] : null,
            'cid' => $chatId,
            'tid' => $techId > 0 ? $techId : null,
            'dir' => 'inbound',
            'txt' => $text !== '' ? $text : null,
            'fromid' => isset($msg['from']['id']) ? (int)$msg['from']['id'] : null,
            'fromuser' => $msg['from']['username'] ?? null,
            'raw' => json_encode($msg, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'media' => $media ? json_encode($media, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null,
        ]);
    } catch (Throwable $_) { /* ignore */ }

    echo 'ok';
} catch (Throwable $e) {
    // Never leak errors to Telegram
    echo 'ok';
}
