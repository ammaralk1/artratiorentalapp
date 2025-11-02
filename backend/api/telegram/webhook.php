<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/telegram.php';

use Throwable;

function tg_reply_text(string $chatId, string $text): void {
    try { sendTelegramText($chatId, $text); } catch (Throwable $_) {}
}

try {
    // Telegram sends POST JSON updates
    $raw = file_get_contents('php://input') ?: '';
    $update = $raw !== '' ? json_decode($raw, true) : null;
    if (!is_array($update)) { echo 'ok'; exit; }

    $pdo = getDatabaseConnection();

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

                if ((string)$link['context'] === 'technician' && !empty($link['technician_id'])) {
                    // store on technician record too
                    try {
                        $pdo->prepare('UPDATE technicians SET telegram_chat_id = :cid WHERE id = :tid LIMIT 1')
                            ->execute(['cid' => $chatId, 'tid' => (int)$link['technician_id']]);
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

    echo 'ok';
} catch (Throwable $e) {
    // Never leak errors to Telegram
    echo 'ok';
}

