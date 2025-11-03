<?php
declare(strict_types=1);

// Usage: php list_upcoming.php [--hours=2]

require_once __DIR__ . '/../bootstrap.php';

function parseArgs(array $argv): array {
    $res = ['hours' => 2];
    foreach (array_slice($argv, 1) as $arg) {
        if (str_starts_with($arg, '--hours=')) {
            $val = (int) substr($arg, 8);
            if ($val >= 1 && $val <= 48) { $res['hours'] = $val; }
        }
    }
    return $res;
}

try {
    $args = parseArgs($argv);
    $pdo = getDatabaseConnection();
    $now = new DateTimeImmutable();
    $from = $now->format('Y-m-d H:i:s');
    $to = $now->modify('+' . (int)$args['hours'] . ' hours')->format('Y-m-d H:i:s');
    $stmt = $pdo->prepare('SELECT id, reservation_code, start_datetime, status FROM reservations WHERE start_datetime BETWEEN :from AND :to ORDER BY start_datetime ASC');
    $stmt->execute(['from' => $from, 'to' => $to]);
    $rows = $stmt->fetchAll();
    if (!$rows) { echo "NO_UPCOMING_WITHIN_{$args['hours']}H\n"; exit(0); }
    foreach ($rows as $r) {
        echo ($r['id'] ?? '') . ' | ' . ($r['reservation_code'] ?? '') . ' | ' . ($r['start_datetime'] ?? '') . ' | ' . ($r['status'] ?? '') . "\n";
    }
} catch (Throwable $e) {
    fwrite(STDERR, 'ERROR: ' . $e->getMessage() . "\n");
    exit(1);
}

