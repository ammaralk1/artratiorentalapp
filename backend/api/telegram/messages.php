<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/telegram.php';

use PDO;
use Throwable;

try {
    requireRole('admin');
    $pdo = getDatabaseConnection();

    // Ensure table exists (noop if already exists)
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
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_tm_chat (chat_id),
      INDEX idx_tm_tech (technician_id),
      INDEX idx_tm_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    // Ensure optional media_json column exists (older schema compatibility)
    try {
        $chkCol = $pdo->prepare("SHOW COLUMNS FROM telegram_messages LIKE 'media_json'");
        $chkCol->execute();
        if (!$chkCol->fetch()) {
            $pdo->exec("ALTER TABLE telegram_messages ADD COLUMN media_json JSON NULL");
        }
    } catch (Throwable $_) { /* ignore */ }

    // Ensure read marks table exists for unread counters
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS telegram_read_marks (
          id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          user_id BIGINT UNSIGNED NOT NULL,
          technician_id BIGINT UNSIGNED NULL,
          chat_id VARCHAR(64) NULL,
          last_message_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_trm_user (user_id),
          INDEX idx_trm_chat (chat_id),
          INDEX idx_trm_tech (technician_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    } catch (Throwable $_) { /* ignore */ }

    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    if ($method === 'GET') {
        // Special list mode: recent chats with unread counts
        $list = trim((string)($_GET['list'] ?? ''));
        if ($list === 'recent') {
            $userId = (int)($_SESSION['user']['id'] ?? 0);
            // Get last chat per (chat_id, technician_id)
            $stmt = $pdo->query('SELECT chat_id, technician_id, MAX(id) AS last_id, MAX(created_at) AS last_at
                                 FROM telegram_messages GROUP BY chat_id, technician_id ORDER BY last_at DESC LIMIT 50');
            $rows = [];
            while ($r = $stmt->fetch()) {
                $chatId = (string)($r['chat_id'] ?? '');
                $tid = isset($r['technician_id']) ? (int)$r['technician_id'] : 0;
                $lastId = (int)$r['last_id'];
                // Resolve name
                $name = null;
                if ($tid > 0) {
                    try { $s = $pdo->prepare('SELECT full_name FROM technicians WHERE id = :id LIMIT 1'); $s->execute(['id' => $tid]); $name = $s->fetchColumn() ?: null; } catch (Throwable $_) {}
                }
                // Fetch last text/dir/time
                $lastText = '';
                $lastDir = '';
                $lastAt = (string)($r['last_at'] ?? '');
                try {
                    $s2 = $pdo->prepare('SELECT text, direction, created_at FROM telegram_messages WHERE chat_id = :cid ORDER BY id DESC LIMIT 1');
                    $s2->execute(['cid' => $chatId]);
                    if ($row2 = $s2->fetch()) { $lastText = (string)($row2['text'] ?? ''); $lastDir = (string)($row2['direction'] ?? ''); $lastAt = (string)($row2['created_at'] ?? $lastAt); }
                } catch (Throwable $_) {}
                // Unread count (inbound only) based on read mark
                $unread = 0;
                try {
                    $mark = 0;
                    $m = $pdo->prepare('SELECT last_message_id FROM telegram_read_marks WHERE user_id = :u AND chat_id = :c ORDER BY updated_at DESC LIMIT 1');
                    $m->execute(['u' => $userId, 'c' => $chatId]);
                    $mark = (int)($m->fetchColumn() ?: 0);
                    $c = $pdo->prepare("SELECT COUNT(*) FROM telegram_messages WHERE chat_id = :c AND direction = 'inbound' AND id > :mark");
                    $c->execute(['c' => $chatId, 'mark' => $mark]);
                    $unread = (int)$c->fetchColumn();
                } catch (Throwable $_) {}
                $rows[] = [
                    'chat_id' => $chatId,
                    'technician_id' => $tid ?: null,
                    'technician_name' => $name,
                    'last_id' => $lastId,
                    'last_text' => $lastText,
                    'last_direction' => $lastDir,
                    'last_at' => $lastAt,
                    'unread' => $unread,
                ];
            }
            respond($rows);
            exit;
        }
        $chatId = trim((string)($_GET['chat_id'] ?? ''));
        $technicianId = isset($_GET['technician_id']) ? (int)$_GET['technician_id'] : 0;
        $limit = isset($_GET['limit']) ? max(1, min(200, (int)$_GET['limit'])) : 50;
        $beforeId = isset($_GET['before_id']) ? (int)$_GET['before_id'] : 0;
        $sinceId = isset($_GET['since_id']) ? (int)$_GET['since_id'] : 0;

        $where = [];
        $params = [];
        if ($chatId !== '') { $where[] = 'm.chat_id = :cid'; $params['cid'] = $chatId; }
        if ($technicianId > 0) { $where[] = 'm.technician_id = :tid'; $params['tid'] = $technicianId; }
        if ($beforeId > 0) { $where[] = 'm.id < :before'; $params['before'] = $beforeId; }
        if ($sinceId > 0) { $where[] = 'm.id > :since'; $params['since'] = $sinceId; }
        $whereClause = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

        $sql = 'SELECT m.id, m.message_id, m.chat_id, m.technician_id, m.direction, m.text, m.from_id, m.from_username, m.created_at,
                       t.full_name AS technician_name
                FROM telegram_messages m
                LEFT JOIN technicians t ON t.id = m.technician_id
                ' . $whereClause . '
                ORDER BY m.id DESC
                LIMIT ' . (int)$limit;
        $stmt = $pdo->prepare($sql);
        foreach ($params as $k => $v) { $stmt->bindValue(':' . $k, $v); }
        $stmt->execute();
        $rows = $stmt->fetchAll();

        // Return ascending order for chat UI
        $rows = array_reverse($rows);
        respond(array_map(static function($r) {
            return [
                'id' => (int)$r['id'],
                'message_id' => $r['message_id'] !== null ? (int)$r['message_id'] : null,
                'chat_id' => (string)$r['chat_id'],
                'technician_id' => $r['technician_id'] !== null ? (int)$r['technician_id'] : null,
                'technician_name' => $r['technician_name'] ?? null,
                'direction' => (string)$r['direction'],
                'text' => $r['text'] ?? '',
                'from_id' => $r['from_id'] !== null ? (int)$r['from_id'] : null,
                'from_username' => $r['from_username'] ?? null,
                'created_at' => (string)$r['created_at'],
            ];
        }, $rows));
        exit;
    }

    if ($method === 'POST') {
        $raw = file_get_contents('php://input') ?: '';
        $payload = $raw !== '' ? (json_decode($raw, true) ?: []) : [];
        $action = isset($payload['action']) ? trim((string)$payload['action']) : '';
        $chatId = trim((string)($payload['chat_id'] ?? ''));
        $technicianId = isset($payload['technician_id']) ? (int)$payload['technician_id'] : 0;
        $text = trim((string)($payload['text'] ?? ''));

        // Resolve chat_id if only technician_id provided
        if ($chatId === '' && $technicianId > 0) {
            try {
                $s = $pdo->prepare('SELECT telegram_chat_id FROM technicians WHERE id = :id LIMIT 1');
                $s->execute(['id' => $technicianId]);
                $c = (string)($s->fetchColumn() ?: '');
                if ($c !== '') { $chatId = $c; }
                if ($chatId === '') {
                    // fallback via telegram_links
                    $s2 = $pdo->prepare("SELECT chat_id FROM telegram_links WHERE technician_id = :tid AND chat_id IS NOT NULL AND used_at IS NOT NULL ORDER BY used_at DESC LIMIT 1");
                    $s2->execute(['tid' => $technicianId]);
                    $c2 = (string)($s2->fetchColumn() ?: '');
                    if ($c2 !== '') { $chatId = $c2; }
                }
            } catch (Throwable $_) {}
        }

        // Typing action
        if ($action === 'typing') {
            if ($chatId === '') { respondError('Chat ID not found for recipient', 422); exit; }
            sendTelegramChatAction($chatId, 'typing');
            respond(['ok' => true]);
            exit;
        }

        // Mark read action
        if ($action === 'mark_read') {
            $lastSeen = isset($payload['last_seen_id']) ? (int)$payload['last_seen_id'] : 0;
            $userId = (int)($_SESSION['user']['id'] ?? 0);
            if ($userId <= 0) { respondError('Unauthorized', 401); exit; }
            try {
                $ins = $pdo->prepare('INSERT INTO telegram_read_marks (user_id, technician_id, chat_id, last_message_id) VALUES (:u, :t, :c, :m)');
                $ins->execute(['u' => $userId, 't' => ($technicianId > 0 ? $technicianId : null), 'c' => ($chatId !== '' ? $chatId : null), 'm' => max(0, $lastSeen)]);
            } catch (Throwable $_) {
                try {
                    $upd = $pdo->prepare('UPDATE telegram_read_marks SET last_message_id = :m WHERE user_id = :u AND chat_id <=> :c AND technician_id <=> :t');
                    $upd->execute(['m' => max(0, $lastSeen), 'u' => $userId, 'c' => ($chatId !== '' ? $chatId : null), 't' => ($technicianId > 0 ? $technicianId : null)]);
                } catch (Throwable $_i) { /* ignore */ }
            }
            respond(['ok' => true]);
            exit;
        }

        // Media sending
        $photoUrl = isset($payload['photo_url']) ? trim((string)$payload['photo_url']) : '';
        $photoUrls = [];
        if (isset($payload['photo_urls']) && is_array($payload['photo_urls'])) {
            foreach ($payload['photo_urls'] as $p) { $p = trim((string)$p); if ($p !== '') $photoUrls[] = $p; }
        }

        if ($photoUrl === '' && empty($photoUrls) && $text === '') {
            respondError('Message text or photo is required', 422);
            exit;
        }

        if ($chatId === '') { respondError('Chat ID not found for recipient', 422); exit; }

        $ok = true;
        $mediaMeta = null;
        if ($photoUrl !== '') {
            $ok = sendTelegramPhoto($chatId, $photoUrl, ($text !== '' ? $text : null));
            $mediaMeta = [ 'photos' => [$photoUrl] ];
        } elseif (!empty($photoUrls)) {
            $media = array_map(static fn($u) => [ 'type' => 'photo', 'media' => $u ], $photoUrls);
            $ok = sendTelegramMediaGroup($chatId, $media);
            $mediaMeta = [ 'photos' => $photoUrls ];
        } else {
            $ok = sendTelegramText($chatId, $text);
        }
        if (!$ok) {
            $err = function_exists('telegramGetLastError') ? (telegramGetLastError() ?? 'Telegram send failed') : 'Telegram send failed';
            respondError($err, 502);
            exit;
        }

        // Log outbound message
        try {
            $stmt = $pdo->prepare('INSERT INTO telegram_messages (chat_id, technician_id, direction, text, media_json) VALUES (:cid, :tid, :dir, :txt, :media)');
            $stmt->execute([
                'cid' => $chatId,
                'tid' => $technicianId > 0 ? $technicianId : null,
                'dir' => 'outbound',
                'txt' => $text !== '' ? $text : null,
                'media' => $mediaMeta ? json_encode($mediaMeta, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null,
            ]);
        } catch (Throwable $_) {}

        respond(['sent' => true]);
        exit;
    }

    respondError('Method not allowed', 405);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}
