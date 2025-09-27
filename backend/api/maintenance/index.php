<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use InvalidArgumentException;
use PDO;
use RuntimeException;
use Throwable;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = getDatabaseConnection();
    requireAuthenticated();

    switch ($method) {
        case 'GET':
            handleMaintenanceGet($pdo);
            break;
        case 'POST':
            handleMaintenanceCreate($pdo);
            break;
        case 'PUT':
        case 'PATCH':
            handleMaintenanceUpdate($pdo);
            break;
        case 'DELETE':
            handleMaintenanceDelete($pdo);
            break;
        default:
            respondError('Method not allowed', 405);
    }
} catch (InvalidArgumentException $exception) {
    respondError($exception->getMessage(), 400);
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}

function handleMaintenanceGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if ($id) {
        $ticket = fetchMaintenanceTicket($pdo, $id);
        if (!$ticket) {
            respondError('Maintenance ticket not found', 404);
            return;
        }

        respond(['ok' => true, 'data' => $ticket]);
        return;
    }

    $status = trim($_GET['status'] ?? '');
    $equipmentId = isset($_GET['equipment_id']) ? (int) $_GET['equipment_id'] : null;
    $priority = trim($_GET['priority'] ?? '');
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 200;
    $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

    if ($limit < 1 || $limit > 500) {
        $limit = 200;
    }

    if ($offset < 0) {
        $offset = 0;
    }

    $where = [];
    $params = [];

    if ($status !== '') {
        $normalizedStatus = normalizeMaintenanceStatus($status);
        if ($normalizedStatus) {
            $where[] = 'mr.status = :status';
            $params['status'] = $normalizedStatus;
        }
    }

    if ($equipmentId) {
        $where[] = 'mr.equipment_id = :equipment_id';
        $params['equipment_id'] = $equipmentId;
    }

    if ($priority !== '') {
        $normalizedPriority = normalizePriority($priority);
        if ($normalizedPriority) {
            $where[] = 'mr.priority = :priority';
            $params['priority'] = $normalizedPriority;
        }
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $query = sprintf(
        'SELECT mr.*, e.barcode AS equipment_barcode, e.description AS equipment_description, e.name AS equipment_name
         FROM maintenance_requests mr
         INNER JOIN equipment e ON e.id = mr.equipment_id
         %s
         ORDER BY mr.reported_at DESC
         LIMIT %d OFFSET %d',
        $whereClause,
        $limit,
        $offset
    );

    $statement = $pdo->prepare($query);
    foreach ($params as $key => $value) {
        $statement->bindValue(':' . $key, $value);
    }
    $statement->execute();

    $tickets = [];
    while ($row = $statement->fetch()) {
        $tickets[] = mapMaintenanceRow($row);
    }

    respond([
        'ok' => true,
        'data' => $tickets,
        'meta' => [
            'limit' => $limit,
            'offset' => $offset,
            'count' => count($tickets),
        ],
    ]);
}

function handleMaintenanceCreate(PDO $pdo): void
{
    [$data, $errors] = validateMaintenancePayload(readJsonPayload(), false, $pdo);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $pdo->beginTransaction();

    try {
        $sql = 'INSERT INTO maintenance_requests (
            equipment_id,
            technician_id,
            maintenance_type,
            priority,
            reported_at,
            scheduled_at,
            status,
            notes,
            resolution_report,
            resolved_at
        ) VALUES (
            :equipment_id,
            :technician_id,
            :maintenance_type,
            :priority,
            :reported_at,
            :scheduled_at,
            :status,
            :notes,
            :resolution_report,
            :resolved_at
        )';

        $statement = $pdo->prepare($sql);
        $statement->execute([
            'equipment_id' => $data['equipment_id'],
            'technician_id' => $data['technician_id'],
            'maintenance_type' => $data['maintenance_type'],
            'priority' => $data['priority'],
            'reported_at' => $data['reported_at'],
            'scheduled_at' => $data['scheduled_at'],
            'status' => $data['status'],
            'notes' => $data['notes'],
            'resolution_report' => null,
            'resolved_at' => null,
        ]);

        $id = (int) $pdo->lastInsertId();
        updateEquipmentStatus($pdo, $data['equipment_id'], 'maintenance');

        $pdo->commit();

        $ticket = fetchMaintenanceTicket($pdo, $id);
        respond(['ok' => true, 'data' => $ticket], 201);
    } catch (Throwable $exception) {
        $pdo->rollBack();
        throw $exception;
    }
}

function handleMaintenanceUpdate(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid maintenance id', 400);
        return;
    }

    $existing = fetchMaintenanceRow($pdo, $id);
    if (!$existing) {
        respondError('Maintenance ticket not found', 404);
        return;
    }

    [$data, $errors] = validateMaintenancePayload(readJsonPayload(), true, $pdo, (int) $existing['equipment_id']);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    if (!$data) {
        respondError('No fields provided for update', 422);
        return;
    }

    $pdo->beginTransaction();

    try {
        $fields = [];
        $params = ['id' => $id];

        foreach ($data as $column => $value) {
            $fields[] = sprintf('%s = :%s', $column, $column);
            $params[$column] = $value;
        }

        if (isset($data['status'])) {
            $newStatus = $data['status'];
            if (in_array($newStatus, ['completed', 'cancelled'], true)) {
                if (!isset($data['resolved_at'])) {
                    $fields[] = 'resolved_at = :resolved_at_auto';
                    $params['resolved_at_auto'] = date('Y-m-d H:i:s');
                }
                if (!isset($data['resolution_report'])) {
                    $fields[] = 'resolution_report = :resolution_report_auto';
                    $params['resolution_report_auto'] = null;
                }
            }
        }

        if ($fields) {
            $sql = 'UPDATE maintenance_requests SET ' . implode(', ', $fields) . ' WHERE id = :id';
            $statement = $pdo->prepare($sql);
            $statement->execute($params);
        }

        $ticketRow = fetchMaintenanceRow($pdo, $id);
        if (!$ticketRow) {
            throw new RuntimeException('Failed to fetch updated maintenance ticket');
        }

        $ticket = mapMaintenanceRow($ticketRow + fetchEquipmentData($pdo, (int) $ticketRow['equipment_id']));

        if ($ticket['status_raw'] === 'completed' || $ticket['status_raw'] === 'cancelled') {
            updateEquipmentStatus($pdo, (int) $ticket['equipment_id'], 'available');
        } elseif ($ticket['status_raw'] === 'open' || $ticket['status_raw'] === 'in_progress') {
            updateEquipmentStatus($pdo, (int) $ticket['equipment_id'], 'maintenance');
        }

        $pdo->commit();

        respond(['ok' => true, 'data' => $ticket]);
    } catch (Throwable $exception) {
        $pdo->rollBack();
        throw $exception;
    }
}

function handleMaintenanceDelete(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid maintenance id', 400);
        return;
    }

    $existing = fetchMaintenanceRow($pdo, $id);
    if (!$existing) {
        respondError('Maintenance ticket not found', 404);
        return;
    }

    $pdo->beginTransaction();

    try {
        $statement = $pdo->prepare('DELETE FROM maintenance_requests WHERE id = :id');
        $statement->execute(['id' => $id]);

        if (in_array($existing['status'], ['open', 'in_progress'], true)) {
            updateEquipmentStatus($pdo, (int) $existing['equipment_id'], 'available');
        }

        $pdo->commit();

        respond(['ok' => true]);
    } catch (Throwable $exception) {
        $pdo->rollBack();
        throw $exception;
    }
}

function validateMaintenancePayload(array $payload, bool $isUpdate, PDO $pdo, ?int $currentEquipmentId = null): array
{
    $errors = [];

    $equipmentId = isset($payload['equipment_id']) ? (int) $payload['equipment_id'] : null;
    $technicianId = isset($payload['technician_id']) ? (int) $payload['technician_id'] : null;
    $maintenanceType = isset($payload['maintenance_type']) ? trim((string) $payload['maintenance_type']) : null;
    $priority = isset($payload['priority']) ? trim((string) $payload['priority']) : null;
    $reportedAt = isset($payload['reported_at']) ? trim((string) $payload['reported_at']) : null;
    $scheduledAt = isset($payload['scheduled_at']) ? trim((string) $payload['scheduled_at']) : null;
    $status = isset($payload['status']) ? trim((string) $payload['status']) : null;
    $notes = isset($payload['notes']) ? trim((string) $payload['notes']) : null;
    $resolutionReport = isset($payload['resolution_report']) ? trim((string) $payload['resolution_report']) : null;
    $resolvedAt = isset($payload['resolved_at']) ? trim((string) $payload['resolved_at']) : null;

    if (!$isUpdate || array_key_exists('equipment_id', $payload)) {
        if (!$equipmentId) {
            $errors['equipment_id'] = 'Equipment is required';
        } elseif (!equipmentExists($pdo, $equipmentId)) {
            $errors['equipment_id'] = 'Equipment not found';
        }
    } else {
        $equipmentId = $currentEquipmentId;
    }

    if ($technicianId) {
        if (!technicianExists($pdo, $technicianId)) {
            $errors['technician_id'] = 'Technician not found';
        }
    }

    if ($maintenanceType !== null && mb_strlen($maintenanceType) > 150) {
        $errors['maintenance_type'] = 'Maintenance type is too long (max 150 characters)';
    }

    if ($priority !== null && $priority !== '') {
        $normalizedPriority = normalizePriority($priority);
        if (!$normalizedPriority) {
            $errors['priority'] = 'Priority is invalid';
        }
    }

    if ($notes !== null && mb_strlen($notes) > 1000) {
        $errors['notes'] = 'Notes are too long (max 1000 characters)';
    }

    if ($resolutionReport !== null && mb_strlen($resolutionReport) > 2000) {
        $errors['resolution_report'] = 'Resolution report is too long (max 2000 characters)';
    }

    if ($status !== null && $status !== '') {
        $normalizedStatus = normalizeMaintenanceStatus($status);
        if (!$normalizedStatus) {
            $errors['status'] = 'Status is invalid';
        }
    }

    $data = [];

    if ($errors) {
        return [$data, $errors];
    }

    if (!$isUpdate || array_key_exists('equipment_id', $payload)) {
        $data['equipment_id'] = $equipmentId;
    }

    if (!$isUpdate || array_key_exists('technician_id', $payload)) {
        $data['technician_id'] = $technicianId ?: null;
    }

    if (!$isUpdate || array_key_exists('maintenance_type', $payload)) {
        $data['maintenance_type'] = $maintenanceType ?: null;
    }

    if (!$isUpdate || array_key_exists('priority', $payload)) {
        $data['priority'] = normalizePriority($priority ?? 'medium');
    }

    if (!$isUpdate || array_key_exists('reported_at', $payload)) {
        $data['reported_at'] = $reportedAt ?: date('Y-m-d H:i:s');
    }

    if (!$isUpdate || array_key_exists('scheduled_at', $payload)) {
        $data['scheduled_at'] = $scheduledAt ?: null;
    }

    if (!$isUpdate || array_key_exists('status', $payload)) {
        $data['status'] = normalizeMaintenanceStatus($status ?? 'open');
    }

    if (!$isUpdate || array_key_exists('notes', $payload)) {
        $data['notes'] = $notes ?: null;
    }

    if (!$isUpdate || array_key_exists('resolution_report', $payload)) {
        $data['resolution_report'] = $resolutionReport ?: null;
    }

    if (!$isUpdate || array_key_exists('resolved_at', $payload)) {
        $data['resolved_at'] = $resolvedAt ?: null;
    }

    return [$data, $errors];
}

function readJsonPayload(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false) {
        throw new RuntimeException('Unable to read request body');
    }

    $raw = trim($raw);
    if ($raw === '') {
        return [];
    }

    $data = json_decode($raw, true);
    if (!is_array($data)) {
        throw new InvalidArgumentException('Invalid JSON payload');
    }

    return $data;
}

function fetchMaintenanceTicket(PDO $pdo, int $id): array|false
{
    $sql = 'SELECT mr.*, e.barcode AS equipment_barcode, e.description AS equipment_description, e.name AS equipment_name
            FROM maintenance_requests mr
            INNER JOIN equipment e ON e.id = mr.equipment_id
            WHERE mr.id = :id
            LIMIT 1';
    $statement = $pdo->prepare($sql);
    $statement->execute(['id' => $id]);
    $row = $statement->fetch();
    if (!$row) {
        return false;
    }
    return mapMaintenanceRow($row);
}

function fetchEquipmentData(PDO $pdo, int $equipmentId): array
{
    $statement = $pdo->prepare('SELECT barcode AS equipment_barcode, description AS equipment_description, name AS equipment_name FROM equipment WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $equipmentId]);
    return $statement->fetch() ?: [];
}

function fetchMaintenanceRow(PDO $pdo, int $id): array|false
{
    $statement = $pdo->prepare('SELECT * FROM maintenance_requests WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    return $statement->fetch() ?: false;
}

function mapMaintenanceRow(array $row): array
{
    $statusRaw = normalizeMaintenanceStatus($row['status'] ?? 'open');
    $status = in_array($statusRaw, ['completed', 'cancelled'], true) ? 'closed' : 'open';

    return [
        'id' => (int) $row['id'],
        'equipment_id' => (int) $row['equipment_id'],
        'equipmentBarcode' => $row['equipment_barcode'] ?? null,
        'equipmentDesc' => $row['equipment_description'] ?? $row['equipment_name'] ?? '',
        'issue' => $row['notes'] ?? '',
        'priority' => $row['priority'] ?? 'medium',
        'status' => $status,
        'status_raw' => $statusRaw,
        'createdAt' => $row['reported_at'] ?? null,
        'reportedAt' => $row['reported_at'] ?? null,
        'scheduledAt' => $row['scheduled_at'] ?? null,
        'resolvedAt' => $row['resolved_at'] ?? null,
        'resolutionReport' => $row['resolution_report'] ?? null,
        'technicianId' => $row['technician_id'] ? (int) $row['technician_id'] : null,
    ];
}

function normalizeMaintenanceStatus(string $value): ?string
{
    $normalized = strtolower(trim($value));
    return match ($normalized) {
        'open', 'قيد الصيانة', 'قيد الانتظار' => 'open',
        'in_progress', 'in-progress', 'جاري العمل' => 'in_progress',
        'completed', 'مكتمل', 'تم الإصلاح' => 'completed',
        'cancelled', 'ملغي' => 'cancelled',
        default => null,
    };
}

function normalizePriority(string $value): ?string
{
    $normalized = strtolower(trim($value));
    return match ($normalized) {
        'low', 'منخفضة' => 'low',
        'medium', 'متوسطة' => 'medium',
        'high', 'مرتفعة' => 'high',
        default => null,
    };
}

function equipmentExists(PDO $pdo, int $id): bool
{
    $statement = $pdo->prepare('SELECT id FROM equipment WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    return (bool) $statement->fetchColumn();
}

function technicianExists(PDO $pdo, int $id): bool
{
    $statement = $pdo->prepare('SELECT id FROM technicians WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    return (bool) $statement->fetchColumn();
}

function updateEquipmentStatus(PDO $pdo, int $equipmentId, string $status): void
{
    $statement = $pdo->prepare('UPDATE equipment SET status = :status WHERE id = :id');
    $statement->execute([
        'status' => $status,
        'id' => $equipmentId,
    ]);
}
