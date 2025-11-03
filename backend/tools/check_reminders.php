<?php
declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../services/notifications.php';

try {
    $pdo = getDatabaseConnection();
    ensureNotificationEventsTable($pdo);

    $since = (new DateTimeImmutable('-30 minutes'))->format('Y-m-d H:i:s');
    $stmt = $pdo->prepare(
        "SELECT id, event_type, entity_id, channel, status, recipient_identifier, created_at
         FROM notification_events
         WHERE event_type LIKE 'reservation_reminder_%' AND created_at >= :since
         ORDER BY id DESC LIMIT 50"
    );
    $stmt->execute(['since' => $since]);

    $rows = $stmt->fetchAll();
    if (!$rows) {
        echo "NO_EVENTS\n";
        exit(0);
    }
    foreach ($rows as $r) {
        printf(
            "%s | %s | res=%s | %s | %s | %s\n",
            $r['created_at'],
            $r['event_type'],
            $r['entity_id'],
            $r['channel'],
            $r['status'],
            $r['recipient_identifier']
        );
    }
} catch (Throwable $e) {
    fwrite(STDERR, 'ERROR: ' . $e->getMessage() . "\n");
    exit(1);
}

