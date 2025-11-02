<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/notifications.php';
require_once __DIR__ . '/../../services/telegram.php';

use PDO;
use Throwable;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    requireRole('admin');

    $pdo = getDatabaseConnection();
    ensureNotificationEventsTable($pdo);

    if ($method === 'GET') {
        try {
        // If the table still does not exist (e.g., DB user lacks CREATE/ALTER privileges),
        // degrade gracefully by returning an empty list instead of a 500.
        try {
            $chk = $pdo->query("SHOW TABLES LIKE 'notification_events'");
            $hasTable = $chk && $chk->fetch() ? true : false;
        } catch (Throwable $_) { $hasTable = false; }
        if (!$hasTable) {
            respond([], 200, [
                'limit' => 0,
                'offset' => 0,
                'count' => 0,
                'total' => 0,
                'page' => 1,
                'pages' => 1,
            ]);
            exit;
        }
        $eventType = trim((string)($_GET['event_type'] ?? ''));
        $entityType = trim((string)($_GET['entity_type'] ?? ''));
        $status = trim((string)($_GET['status'] ?? ''));
        $channel = trim((string)($_GET['channel'] ?? ''));
        $recipientType = trim((string)($_GET['recipient_type'] ?? ''));
        $entityId = isset($_GET['entity_id']) ? (int) $_GET['entity_id'] : null;
        $batchId = trim((string)($_GET['batch_id'] ?? ''));
        $q = trim((string)($_GET['q'] ?? ''));
        $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 20;
        $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : null;
        $page = isset($_GET['page']) ? max(1, (int) $_GET['page']) : 1;

        if ($limit < 1 || $limit > 200) { $limit = 20; }
        if ($offset === null) { $offset = ($page - 1) * $limit; }
        if ($offset < 0) { $offset = 0; }

        $where = [];
        $params = [];

        if ($eventType !== '') { $where[] = 'event_type = :event_type'; $params['event_type'] = $eventType; }
        if ($entityType !== '') { $where[] = 'entity_type = :entity_type'; $params['entity_type'] = $entityType; }
        if ($status !== '') { $where[] = 'status = :status'; $params['status'] = $status; }
        if ($channel !== '') { $where[] = 'channel = :channel'; $params['channel'] = $channel; }
        if ($recipientType !== '') { $where[] = 'recipient_type = :recipient_type'; $params['recipient_type'] = $recipientType; }
        if ($entityId) { $where[] = 'entity_id = :entity_id'; $params['entity_id'] = $entityId; }
        if ($batchId !== '') {
            // Be defensive: if DB user lacks ALTER privileges, batch_id column may be missing
            $hasBatch = false;
            try {
                $chk = $pdo->query("SHOW COLUMNS FROM notification_events LIKE 'batch_id'");
                $hasBatch = $chk && $chk->fetch() ? true : false;
            } catch (Throwable $_) { $hasBatch = false; }
            if ($hasBatch) {
                $where[] = 'batch_id = :batch_id';
                $params['batch_id'] = $batchId;
            }
        }
        if ($q !== '') { $where[] = 'recipient_identifier LIKE :q'; $params['q'] = '%' . $q . '%'; }

        $whereClause = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

        // total count for pagination
        $countSql = 'SELECT COUNT(*) FROM notification_events ' . $whereClause;
        $countStmt = $pdo->prepare($countSql);
        foreach ($params as $key => $value) { $countStmt->bindValue(':' . $key, $value); }
        $countStmt->execute();
        $total = (int) $countStmt->fetchColumn();
        $pages = (int) max(1, (int) ceil($total / $limit));
        if ($page > $pages) { $page = $pages; $offset = ($page - 1) * $limit; }

        // Some MySQL/MariaDB drivers are picky about binding LIMIT/OFFSET.
        // To avoid 500s from SQLSTATE[42000], inline the sanitized integers.
        $safeLimit = (int) $limit;
        $safeOffset = (int) $offset;
        $sql = 'SELECT id, event_type, entity_type, entity_id, recipient_type, recipient_identifier, channel, status, error, batch_id, created_at
                FROM notification_events ' . $whereClause . ' ORDER BY created_at DESC, id DESC'
            . ' LIMIT ' . $safeLimit . ' OFFSET ' . $safeOffset;

        $stmt = $pdo->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        $stmt->execute();

        $items = [];
        while ($row = $stmt->fetch()) {
            $type = (string)($row['recipient_type'] ?? '');
            $identifier = (string)($row['recipient_identifier'] ?? '');
            $channel = (string)($row['channel'] ?? '');
            $recipientDisplay = buildRecipientDisplay($pdo, $type, $identifier, $channel);
            $recipientName = extractRecipientName($pdo, $type, $identifier, $channel);
            $items[] = [
                'id' => (int) $row['id'],
                'event_type' => $row['event_type'],
                'entity_type' => $row['entity_type'],
                'entity_id' => (int) $row['entity_id'],
                'recipient_type' => $row['recipient_type'],
                'recipient_identifier' => $row['recipient_identifier'],
                'recipient_display' => $recipientDisplay,
                'recipient_name' => $recipientName,
                'channel' => $row['channel'],
                'status' => $row['status'],
                'error' => $row['error'] ?? null,
                'batch_id' => $row['batch_id'] ?? null,
                'created_at' => $row['created_at'],
            ];
        }

        respond($items, 200, [
            'limit' => $limit,
            'offset' => $offset,
            'count' => count($items),
            'total' => $total,
            'page' => $page,
            'pages' => $pages,
        ]);
        exit;
        } catch (Throwable $e) {
            // Graceful fallback: do not block the UI on logs errors in production
            respond([], 200, [
                'limit' => 0,
                'offset' => 0,
                'count' => 0,
                'total' => 0,
                'page' => 1,
                'pages' => 1,
                'error' => $e->getMessage(),
            ]);
            exit;
        }
    }

    if ($method === 'DELETE') {
        // Optional filtered delete using same filters as GET. If no filters, deletes all.
        $eventType = trim((string)($_GET['event_type'] ?? ''));
        $entityType = trim((string)($_GET['entity_type'] ?? ''));
        $status = trim((string)($_GET['status'] ?? ''));
        $channel = trim((string)($_GET['channel'] ?? ''));
        $recipientType = trim((string)($_GET['recipient_type'] ?? ''));
        $entityId = isset($_GET['entity_id']) ? (int) $_GET['entity_id'] : null;
        $q = trim((string)($_GET['q'] ?? ''));

        $where = [];
        $params = [];
        if ($eventType !== '') { $where[] = 'event_type = :event_type'; $params['event_type'] = $eventType; }
        if ($entityType !== '') { $where[] = 'entity_type = :entity_type'; $params['entity_type'] = $entityType; }
        if ($status !== '') { $where[] = 'status = :status'; $params['status'] = $status; }
        if ($channel !== '') { $where[] = 'channel = :channel'; $params['channel'] = $channel; }
        if ($recipientType !== '') { $where[] = 'recipient_type = :recipient_type'; $params['recipient_type'] = $recipientType; }
        if ($entityId) { $where[] = 'entity_id = :entity_id'; $params['entity_id'] = $entityId; }
        if ($q !== '') { $where[] = 'recipient_identifier LIKE :q'; $params['q'] = '%' . $q . '%'; }

        $whereClause = $where ? ('WHERE ' . implode(' AND ', $where)) : '';
        $sql = 'DELETE FROM notification_events ' . $whereClause;
        $stmt = $pdo->prepare($sql);
        foreach ($params as $key => $value) { $stmt->bindValue(':' . $key, $value); }
        $stmt->execute();
        respond([ 'deleted' => (int) $stmt->rowCount() ]);
        exit;
    }

    respondError('Method not allowed', 405);
    exit;
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}

function buildRecipientDisplay(PDO $pdo, string $type, string $identifier, string $channel): string
{
    $id = trim($identifier);
    if ($type === 'technician') {
        // Try by telegram_chat_id
        try {
            if ($id !== '') {
                $stmt = $pdo->prepare('SELECT full_name FROM technicians WHERE telegram_chat_id = :id LIMIT 1');
                $stmt->execute(['id' => $id]);
                $name = $stmt->fetchColumn();
                if ($name) return (string)$name;
            }
            // Try by email match
            if ($id !== '') {
                $stmt = $pdo->prepare('SELECT full_name FROM technicians WHERE email = :em LIMIT 1');
                $stmt->execute(['em' => $id]);
                $name = $stmt->fetchColumn();
                if ($name) return (string)$name;
            }
            // Try by phone normalized
            if ($id !== '') {
                $digits = telegramNormalizePhone($id);
                if ($digits !== '') {
                    $q = $pdo->prepare('SELECT id, full_name, phone FROM technicians');
                    $q->execute();
                    while ($row = $q->fetch()) {
                        $p = telegramNormalizePhone((string)($row['phone'] ?? ''));
                        if ($p !== '' && $p === $digits) {
                            return (string)($row['full_name'] ?? '');
                        }
                    }
                }
            }
            // Try via telegram_links back-reference
            if ($id !== '') {
                $stmt = $pdo->prepare('SELECT technician_id FROM telegram_links WHERE chat_id = :cid AND technician_id IS NOT NULL ORDER BY used_at DESC LIMIT 1');
                $stmt->execute(['cid' => $id]);
                $tid = (int)($stmt->fetchColumn() ?: 0);
                if ($tid > 0) {
                    $s2 = $pdo->prepare('SELECT full_name FROM technicians WHERE id = :tid LIMIT 1');
                    $s2->execute(['tid' => $tid]);
                    $name = $s2->fetchColumn();
                    if ($name) return (string)$name;
                }
            }
        } catch (Throwable $_) {}
        // Fallback label
        return 'Technician: ' . $id;
    }
    if ($type === 'admin') {
        return 'Admin: ' . $id;
    }
    if ($type) {
        return ucfirst($type) . ': ' . $id;
    }
    return $id;
}

function extractRecipientName(PDO $pdo, string $type, string $identifier, string $channel): ?string
{
    $id = trim($identifier);
    if ($type === 'technician') {
        try {
            if ($id !== '') {
                $stmt = $pdo->prepare('SELECT full_name FROM technicians WHERE telegram_chat_id = :id LIMIT 1');
                $stmt->execute(['id' => $id]);
                $name = $stmt->fetchColumn();
                if ($name) return (string)$name;
            }
            if ($id !== '' && filter_var($id, FILTER_VALIDATE_EMAIL)) {
                $stmt = $pdo->prepare('SELECT full_name FROM technicians WHERE email = :em LIMIT 1');
                $stmt->execute(['em' => $id]);
                $name = $stmt->fetchColumn();
                if ($name) return (string)$name;
            }
            if ($id !== '') {
                $digits = telegramNormalizePhone($id);
                if ($digits !== '') {
                    $q = $pdo->prepare('SELECT full_name, phone FROM technicians');
                    $q->execute();
                    while ($row = $q->fetch()) {
                        $p = telegramNormalizePhone((string)($row['phone'] ?? ''));
                        if ($p !== '' && $p === $digits) return (string)($row['full_name'] ?? '');
                    }
                }
            }
            if ($id !== '') {
                $stmt = $pdo->prepare('SELECT technician_id FROM telegram_links WHERE chat_id = :cid AND technician_id IS NOT NULL ORDER BY used_at DESC LIMIT 1');
                $stmt->execute(['cid' => $id]);
                $tid = (int)($stmt->fetchColumn() ?: 0);
                if ($tid > 0) {
                    $s2 = $pdo->prepare('SELECT full_name FROM technicians WHERE id = :tid LIMIT 1');
                    $s2->execute(['tid' => $tid]);
                    $name = $s2->fetchColumn();
                    if ($name) return (string)$name;
                }
            }
        } catch (Throwable $_) {}
        return null;
    }
    if ($type === 'admin') {
        return 'Admin';
    }
    return null;
}
