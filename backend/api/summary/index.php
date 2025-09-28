<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use PDO;
use Throwable;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method !== 'GET') {
    respondError('Method not allowed', 405);
    return;
}

try {
    $pdo = getDatabaseConnection();
    requireAuthenticated();
    $data = buildSummaryResponse($pdo);
    respond($data);
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}

function buildSummaryResponse(PDO $pdo): array
{
    return [
        'customers' => [
            'total' => countQuery($pdo, 'SELECT COUNT(*) FROM customers'),
        ],
        'reservations' => [
            'total' => countQuery($pdo, 'SELECT COUNT(*) FROM reservations'),
            'today' => countQuery($pdo, 'SELECT COUNT(*) FROM reservations WHERE DATE(start_datetime) = CURDATE()'),
            'upcoming' => countQuery($pdo, 'SELECT COUNT(*) FROM reservations WHERE start_datetime >= CURDATE()'),
        ],
        'equipment' => [
            'total' => countQuery($pdo, 'SELECT COUNT(*) FROM equipment'),
            'maintenance' => countQuery($pdo, "SELECT COUNT(*) FROM equipment WHERE status = 'maintenance'"),
        ],
        'technicians' => [
            'total' => countQuery($pdo, 'SELECT COUNT(*) FROM technicians'),
            'busy' => countQuery($pdo, "SELECT COUNT(*) FROM technicians WHERE status = 'busy'"),
        ],
        'projects' => [
            'total' => countQuery($pdo, 'SELECT COUNT(*) FROM projects'),
            'active' => countQuery($pdo, 'SELECT COUNT(*) FROM projects WHERE end_datetime IS NULL OR end_datetime >= NOW()'),
        ],
        'maintenance' => [
            'open' => countQuery($pdo, "SELECT COUNT(*) FROM maintenance_requests WHERE status IN ('open','in_progress')"),
            'highPriority' => countQuery(
                $pdo,
                "SELECT COUNT(*) FROM maintenance_requests WHERE priority = 'high' AND status IN ('open','in_progress')"
            ),
        ],
    ];
}

function countQuery(PDO $pdo, string $sql): int
{
    try {
        $statement = $pdo->query($sql);
        if ($statement === false) {
            return 0;
        }
        $value = $statement->fetchColumn();
        return (int) ($value ?? 0);
    } catch (Throwable $exception) {
        // If the table does not exist yet, treat the count as zero.
        return 0;
    }
}
