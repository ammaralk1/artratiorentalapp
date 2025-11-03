<?php
declare(strict_types=1);

// CLI script to send reservation reminders.
// Usage: php send_reminders.php [--window=24h|1h]

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../services/notifications.php';

function parseArgs(array $argv): array {
    $result = ['window' => '24h'];
    foreach ($argv as $arg) {
        if (str_starts_with($arg, '--window=')) {
            $val = substr($arg, 9);
            if (in_array($val, ['24h', '1h'], true)) {
                $result['window'] = $val;
            }
        }
    }
    return $result;
}

function loadUpcomingReservations(PDO $pdo, string $window): array {
    $now = new DateTimeImmutable();
    if ($window === '1h') {
        $from = $now->format('Y-m-d H:i:s');
        $to = $now->modify('+1 hour')->format('Y-m-d H:i:s');
        $eventKey = '1h';
    } else {
        $from = $now->format('Y-m-d H:i:s');
        $to = $now->modify('+24 hours')->format('Y-m-d H:i:s');
        $eventKey = '24h';
    }

    // Exclude cancelled
    $stmt = $pdo->prepare("SELECT r.*, c.full_name AS customer_name FROM reservations r INNER JOIN customers c ON c.id = r.customer_id WHERE r.status <> 'cancelled' AND r.start_datetime BETWEEN :from AND :to ORDER BY r.start_datetime ASC");
    $stmt->execute(['from' => $from, 'to' => $to]);

    $items = [];
    while ($row = $stmt->fetch()) {
        $resId = (int)$row['id'];
        $full = fetchReservationForNotification($pdo, $resId);
        if ($full) {
            $full['__reminder_key'] = $eventKey;
            $items[] = $full;
        }
    }
    return $items;
}

function main(array $argv): int {
    $args = parseArgs(array_slice($argv, 1));
    try {
        $pdo = getDatabaseConnection();
    } catch (Throwable $e) {
        fwrite(STDERR, "DB connection failed: {$e->getMessage()}\n");
        return 1;
    }

    $upcoming = loadUpcomingReservations($pdo, $args['window']);
    $count = 0;
    foreach ($upcoming as $reservation) {
        notifyReservationReminder($pdo, $reservation, (string)$reservation['__reminder_key']);
        $count++;
    }

    echo "Processed {$count} reservation reminders for window {$args['window']}.\n";
    return 0;
}

exit(main($argv));
