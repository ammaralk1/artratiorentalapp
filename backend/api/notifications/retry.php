<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/notifications.php';
require_once __DIR__ . '/../../services/telegram.php';

use PDO;
use Throwable;

try {
    requireRole('admin');
    $pdo = getDatabaseConnection();

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        respondError('Method not allowed', 405);
        exit;
    }

    $raw = file_get_contents('php://input') ?: '';
    $payload = $raw !== '' ? (json_decode($raw, true) ?: []) : [];
    $batchId = trim((string)($payload['batch_id'] ?? ''));
    if ($batchId === '') { respondError('batch_id is required', 422); exit; }
    $channelFilter = trim((string)($payload['channel'] ?? ''));

    // Fetch failed events in this batch
    ensureNotificationEventsTable($pdo);
    $sql = 'SELECT id, event_type, entity_type, entity_id, recipient_type, recipient_identifier, channel, status, error, meta_json
            FROM notification_events
            WHERE batch_id = :bid AND status = "failed"';
    if ($channelFilter !== '') { $sql .= ' AND channel = :ch'; }
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':bid', $batchId);
    if ($channelFilter !== '') { $stmt->bindValue(':ch', $channelFilter); }
    $stmt->execute();

    $rows = $stmt->fetchAll();
    if (!$rows) { respond(['retried' => 0, 'sent' => 0]); exit; }

    $sent = 0; $retried = 0; $errors = [];
    foreach ($rows as $row) {
        $retried++;
        $to = (string)($row['recipient_identifier'] ?? '');
        $channel = (string)($row['channel'] ?? '');
        $meta = null;
        try { $meta = $row['meta_json'] ? json_decode((string)$row['meta_json'], true) : null; } catch (Throwable $_) { $meta = null; }
        $text = is_array($meta) ? (string)($meta['message']['text'] ?? '') : '';
        $subject = is_array($meta) ? (string)($meta['message']['subject'] ?? 'تنبيه إداري') : 'تنبيه إداري';
        $html = is_array($meta) ? (string)($meta['message']['html'] ?? '') : '';
        $ok = false; $err = null;
        if ($channel === 'telegram') {
            if ($text === '' && $html !== '') { $text = strip_tags($html); }
            $ok = sendTelegramText($to, $text);
            $err = function_exists('telegramGetLastError') ? (telegramGetLastError() ?? null) : null;
        } elseif ($channel === 'email') {
            if ($html === '' && $text !== '') { $html = nl2br(htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')); }
            if ($text === '' && $html !== '') { $text = strip_tags($html); }
            $ok = sendEmail($to, 'Recipient', $subject, $html, $text);
            $err = function_exists('emailGetLastError') ? (emailGetLastError() ?? null) : null;
        }
        recordNotificationEvent(
            $pdo,
            'manual_notification_retry',
            (string)$row['entity_type'],
            (int)$row['entity_id'],
            (string)$row['recipient_type'],
            $to,
            $channel,
            $ok ? 'sent' : 'failed',
            $ok ? null : $err,
            $batchId,
            $meta
        );
        if ($ok) { $sent++; }
        if (!$ok && $err) { $errors[] = $err; }
    }

    respond([ 'retried' => $retried, 'sent' => $sent, 'errors' => $errors ]);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}

