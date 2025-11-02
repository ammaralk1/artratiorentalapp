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

    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    if ($method === 'GET') {
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
        $chatId = trim((string)($payload['chat_id'] ?? ''));
        $technicianId = isset($payload['technician_id']) ? (int)$payload['technician_id'] : 0;
        $text = trim((string)($payload['text'] ?? ''));
        if ($text === '') { respondError('Message text is required', 422); exit; }

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
        if ($chatId === '') { respondError('Chat ID not found for recipient', 422); exit; }

        $ok = sendTelegramText($chatId, $text);
        if (!$ok) {
            $err = function_exists('telegramGetLastError') ? (telegramGetLastError() ?? 'Telegram send failed') : 'Telegram send failed';
            respondError($err, 502);
            exit;
        }

        // Log outbound message
        try {
            $stmt = $pdo->prepare('INSERT INTO telegram_messages (chat_id, technician_id, direction, text) VALUES (:cid, :tid, :dir, :txt)');
            $stmt->execute([
                'cid' => $chatId,
                'tid' => $technicianId > 0 ? $technicianId : null,
                'dir' => 'outbound',
                'txt' => $text,
            ]);
        } catch (Throwable $_) {}

        respond(['sent' => true]);
        exit;
    }

    respondError('Method not allowed', 405);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}
