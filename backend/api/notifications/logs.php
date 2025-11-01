<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/notifications.php';

use PDO;
use Throwable;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    requireRole('admin');

    if ($method !== 'GET') {
        respondError('Method not allowed', 405);
        exit;
    }

    $pdo = getDatabaseConnection();
    ensureNotificationEventsTable($pdo);

    $eventType = trim((string)($_GET['event_type'] ?? ''));
    $entityType = trim((string)($_GET['entity_type'] ?? ''));
    $status = trim((string)($_GET['status'] ?? ''));
    $channel = trim((string)($_GET['channel'] ?? ''));
    $recipientType = trim((string)($_GET['recipient_type'] ?? ''));
    $entityId = isset($_GET['entity_id']) ? (int) $_GET['entity_id'] : null;
    $q = trim((string)($_GET['q'] ?? ''));
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 50;
    $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

    if ($limit < 1 || $limit > 200) { $limit = 50; }
    if ($offset < 0) { $offset = 0; }

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

    $sql = 'SELECT id, event_type, entity_type, entity_id, recipient_type, recipient_identifier, channel, status, error, created_at
            FROM notification_events ' . $whereClause . ' ORDER BY created_at DESC, id DESC LIMIT :limit OFFSET :offset';
    $stmt = $pdo->prepare($sql);
    foreach ($params as $key => $value) {
        $stmt->bindValue(':' . $key, $value);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $items = [];
    while ($row = $stmt->fetch()) {
        $items[] = [
            'id' => (int) $row['id'],
            'event_type' => $row['event_type'],
            'entity_type' => $row['entity_type'],
            'entity_id' => (int) $row['entity_id'],
            'recipient_type' => $row['recipient_type'],
            'recipient_identifier' => $row['recipient_identifier'],
            'channel' => $row['channel'],
            'status' => $row['status'],
            'error' => $row['error'] ?? null,
            'created_at' => $row['created_at'],
        ];
    }

    respond($items, 200, [
        'limit' => $limit,
        'offset' => $offset,
        'count' => count($items),
    ]);
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}

