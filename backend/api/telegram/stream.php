<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use PDO;
use Throwable;

// Simple SSE stream for new messages in a chat. Optional; falls back to polling on clients if blocked.
try {
    requireRole('admin');
    $pdo = getDatabaseConnection();

    $chatId = isset($_GET['chat_id']) ? trim((string)$_GET['chat_id']) : '';
    $technicianId = isset($_GET['technician_id']) ? (int)$_GET['technician_id'] : 0;
    $sinceId = isset($_GET['since_id']) ? (int)$_GET['since_id'] : 0;
    $timeout = isset($_GET['timeout']) ? max(5, min(30, (int)$_GET['timeout'])) : 25;

    if ($chatId === '' && $technicianId > 0) {
        try { $s = $pdo->prepare('SELECT telegram_chat_id FROM technicians WHERE id = :id LIMIT 1'); $s->execute(['id' => $technicianId]); $c = (string)($s->fetchColumn() ?: ''); if ($c !== '') $chatId = $c; } catch (Throwable $_) {}
    }
    if ($chatId === '') { http_response_code(400); echo "event: error\n" . 'data: {"error":"chat required"}' . "\n\n"; exit; }

    @set_time_limit(0);
    header('Content-Type: text/event-stream');
    header('Cache-Control: no-cache');
    header('Connection: keep-alive');
    header('X-Accel-Buffering: no');

    $start = time();
    $last = (int)$sinceId;
    while (time() - $start < $timeout) {
        try {
            $stmt = $pdo->prepare('SELECT id, technician_id, direction, text, created_at FROM telegram_messages WHERE chat_id = :c AND id > :id ORDER BY id ASC LIMIT 100');
            $stmt->execute(['c' => $chatId, 'id' => $last]);
            $rows = $stmt->fetchAll();
            if ($rows) {
                $batch = [];
                foreach ($rows as $r) { $last = max($last, (int)$r['id']); $batch[] = [
                    'id' => (int)$r['id'],
                    'technician_id' => $r['technician_id'] !== null ? (int)$r['technician_id'] : null,
                    'direction' => (string)$r['direction'],
                    'text' => (string)($r['text'] ?? ''),
                    'created_at' => (string)$r['created_at'],
                ]; }
                echo 'data: ' . json_encode($batch, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n\n";
                @ob_flush(); @flush();
            }
        } catch (Throwable $_) { /* ignore */ }
        usleep(500000); // 0.5s
    }
    echo "event: done\n" . 'data: {}' . "\n\n";
    @ob_flush(); @flush();
} catch (Throwable $e) {
    http_response_code(200);
    header('Content-Type: text/event-stream');
    echo "event: error\n" . 'data: {"error":"server"}' . "\n\n";
}

