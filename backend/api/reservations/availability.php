<?php
require_once __DIR__ . '/../../bootstrap.php';

use DateTimeImmutable;
use InvalidArgumentException;
use PDO;
use Throwable;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method !== 'GET') {
    respondError('Method not allowed', 405);
    exit;
}

try {
    // Lightweight availability endpoint used by the dashboard to validate single equipment
    // or package bookings before committing them. Designed to be easy to extend with more
    // complex resource rules (maintenance, technician assignments, etc.) if needed later.
    requireAuthenticated();
    $pdo = getDatabaseConnection();

    $type = strtolower(trim($_GET['type'] ?? 'equipment'));
    $identifier = trim($_GET['id'] ?? $_GET['code'] ?? '');
    $start = trim($_GET['start'] ?? '');
    $end = trim($_GET['end'] ?? '');
    $ignore = isset($_GET['ignore']) ? (int) $_GET['ignore'] : null;

    if ($identifier === '' || $start === '' || $end === '') {
        throw new InvalidArgumentException('Missing type, id, start or end parameters');
    }

    $startTimestamp = normaliseDateTime($start);
    $endTimestamp = normaliseDateTime($end);

    if ($startTimestamp >= $endTimestamp) {
        throw new InvalidArgumentException('Start time must be before end time');
    }

    if ($type === 'package') {
        $payload = evaluatePackageAvailability($pdo, $identifier, $startTimestamp, $endTimestamp, $ignore);
    } else {
        $payload = evaluateEquipmentAvailability($pdo, $identifier, $startTimestamp, $endTimestamp, $ignore);
    }

    respond($payload);
} catch (InvalidArgumentException $exception) {
    respondError($exception->getMessage(), 400);
} catch (Throwable $exception) {
    respondError('Failed to evaluate availability', 500, [
        'details' => $exception->getMessage(),
    ]);
}

function evaluateEquipmentAvailability(PDO $pdo, string $identifier, string $start, string $end, ?int $ignoreReservationId = null): array
{
    $equipmentId = lookupEquipmentId($pdo, $identifier);
    if ($equipmentId === null) {
        throw new InvalidArgumentException('Equipment not found');
    }

    $conflicts = fetchBlockingReservations($pdo, [$equipmentId], $start, $end, $ignoreReservationId);

    return [
        'type' => 'equipment',
        'identifier' => $identifier,
        'equipment_id' => $equipmentId,
        'start' => $start,
        'end' => $end,
        'available' => count($conflicts) === 0,
        'conflicts' => $conflicts,
    ];
}

function evaluatePackageAvailability(PDO $pdo, string $identifier, string $start, string $end, ?int $ignoreReservationId = null): array
{
    $packageRow = fetchPackageRow($pdo, $identifier);
    if (!$packageRow) {
        throw new InvalidArgumentException('Package not found');
    }

    $equipmentIds = json_decode((string) ($packageRow['equipment_ids'] ?? '[]'), true);
    if (!is_array($equipmentIds) || count($equipmentIds) === 0) {
        throw new InvalidArgumentException('Package definition does not include equipment items');
    }

    $normalizedIds = array_values(array_unique(array_map('intval', $equipmentIds)));
    $conflicts = fetchBlockingReservations($pdo, $normalizedIds, $start, $end, $ignoreReservationId);

    return [
        'type' => 'package',
        'identifier' => $identifier,
        'package_id' => $packageRow['id'],
        'name' => $packageRow['name'] ?? null,
        'equipment_ids' => $normalizedIds,
        'start' => $start,
        'end' => $end,
        'available' => count($conflicts) === 0,
        'conflicts' => $conflicts,
    ];
}

function fetchBlockingReservations(PDO $pdo, array $equipmentIds, string $start, string $end, ?int $ignoreReservationId = null): array
{
    if (count($equipmentIds) === 0) {
        return [];
    }

    $placeholders = implode(',', array_fill(0, count($equipmentIds), '?'));

    $query = "
        SELECT
            re.equipment_id,
            r.id AS reservation_id,
            r.reservation_code,
            r.start_datetime,
            r.end_datetime,
            r.status
        FROM reservation_equipment re
        INNER JOIN reservations r ON r.id = re.reservation_id
        WHERE re.equipment_id IN ($placeholders)
          AND r.start_datetime < :end_time
          AND COALESCE(r.end_datetime, r.start_datetime) > :start_time
    ";

    if ($ignoreReservationId) {
        $query .= ' AND r.id != :ignore_id';
    }

    $statement = $pdo->prepare($query);

    foreach ($equipmentIds as $index => $equipmentId) {
        $statement->bindValue($index + 1, $equipmentId, PDO::PARAM_INT);
    }

    $statement->bindValue(':start_time', $start);
    $statement->bindValue(':end_time', $end);

    if ($ignoreReservationId) {
        $statement->bindValue(':ignore_id', $ignoreReservationId, PDO::PARAM_INT);
    }

    $statement->execute();

    $conflicts = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $conflicts[] = [
            'reservation_id' => (int) $row['reservation_id'],
            'reservation_code' => $row['reservation_code'],
            'equipment_id' => (int) $row['equipment_id'],
            'status' => $row['status'],
            'start' => $row['start_datetime'],
            'end' => $row['end_datetime'],
        ];
    }

    return $conflicts;
}

function lookupEquipmentId(PDO $pdo, string $identifier): ?int
{
    if ($identifier === '') {
        return null;
    }

    if (ctype_digit($identifier)) {
        return (int) $identifier;
    }

    $statement = $pdo->prepare('SELECT id FROM equipment WHERE barcode = :barcode LIMIT 1');
    $statement->execute(['barcode' => $identifier]);
    $row = $statement->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        return (int) $row['id'];
    }

    return null;
}

function fetchPackageRow(PDO $pdo, string $identifier): ?array
{
    try {
        $statement = $pdo->prepare('SELECT id, name, equipment_ids FROM equipment_packages WHERE id = :id OR slug = :id OR code = :id LIMIT 1');
        $statement->execute(['id' => $identifier]);
        $row = $statement->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    } catch (Throwable $exception) {
        throw new InvalidArgumentException('Package catalogue not configured');
    }
}

function normaliseDateTime(string $value): string
{
    try {
        $dateTime = new DateTimeImmutable($value);
    } catch (Throwable $exception) {
        throw new InvalidArgumentException('Invalid date value provided');
    }

    return $dateTime->format('Y-m-d H:i:s');
}
