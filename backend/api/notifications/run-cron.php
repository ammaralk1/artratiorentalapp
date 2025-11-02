<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/notifications.php';

use PDO;
use Throwable;

function allowCronAccess(): bool {
    $key = getAppConfig('cron', 'key', null);
    if ($key) {
        $k = $_GET['key'] ?? $_POST['key'] ?? '';
        return hash_equals((string)$key, (string)$k);
    }
    // Fallback: allow admin session
    return isAuthenticated() && (($_SESSION['user']['role'] ?? '') === 'admin');
}

try {
    if (!allowCronAccess()) { respondError('Forbidden', 403); exit; }
    $pdo = getDatabaseConnection();

    $now = new DateTimeImmutable();
    $tz = getApplicationTimezone() ?: 'UTC';
    $window = (int)($_GET['window'] ?? 10); // minutes tolerance around target time
    $window = max(1, min(60, $window));

    $runs = [
        [ 'key' => '48h', 'offset' => '+48 hours' ],
        [ 'key' => '24h', 'offset' => '+24 hours' ],
        [ 'key' => '1h', 'offset' => '+1 hour' ],
    ];

    $processed = [];
    foreach ($runs as $r) {
        $target = $now->modify($r['offset']);
        $from = $target->modify('-' . $window . ' minutes')->format('Y-m-d H:i:s');
        $to = $target->modify('+' . $window . ' minutes')->format('Y-m-d H:i:s');

        // Find reservations starting in the window
        $sql = 'SELECT id FROM reservations WHERE start_datetime BETWEEN :from AND :to';
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['from' => $from, 'to' => $to]);
        } catch (Throwable $e) {
            respondError('Query failed', 500, [ 'details' => $e->getMessage() ]);
            exit;
        }
        while ($row = $stmt->fetch()) {
            $rid = (int)$row['id'];
            $reservation = fetchReservationForNotification($pdo, $rid);
            if ($reservation) {
                // notifyReservationReminder internally dedupes per recipient using hasNotificationBeenSent
                notifyReservationReminder($pdo, $reservation, $r['key']);
                $processed[] = [ 'reservation_id' => $rid, 'window' => $r['key'] ];
            }
        }
    }

    // Same-day morning reminder (e.g., 08:00 local time): notify all reservations starting today
    try {
        $hour = (int) (getAppConfig('cron', 'morning_hour', 8));
        $min = (int) (getAppConfig('cron', 'morning_minute', 0));
        $morning = (new DateTimeImmutable((new DateTimeImmutable('now', new DateTimeZone($tz)))->format('Y-m-d') . sprintf(' %02d:%02d:00', $hour, $min), new DateTimeZone($tz)));
        $from = $morning->modify('-' . $window . ' minutes')->format('Y-m-d H:i:s');
        $to = $morning->modify('+' . $window . ' minutes')->format('Y-m-d H:i:s');
        $stmt = $pdo->prepare('SELECT id FROM reservations WHERE start_datetime >= :startDay AND start_datetime < :endDay');
        $startDay = (new DateTimeImmutable('today', new DateTimeZone($tz)))->format('Y-m-d 00:00:00');
        $endDay = (new DateTimeImmutable('tomorrow', new DateTimeZone($tz)))->format('Y-m-d 00:00:00');

        // Only run at morning window
        $nowStr = $now->format('Y-m-d H:i:s');
        if ($nowStr >= $from && $nowStr <= $to) {
            $stmt->execute(['startDay' => $startDay, 'endDay' => $endDay]);
            while ($row = $stmt->fetch()) {
                $rid = (int)$row['id'];
                $reservation = fetchReservationForNotification($pdo, $rid);
                if ($reservation) {
                    notifyReservationReminder($pdo, $reservation, 'morning');
                    $processed[] = [ 'reservation_id' => $rid, 'window' => 'morning' ];
                }
            }
        }
    } catch (Throwable $_) { /* ignore */ }

    respond([ 'processed' => $processed, 'timezone' => $tz, 'window_minutes' => $window ]);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}
