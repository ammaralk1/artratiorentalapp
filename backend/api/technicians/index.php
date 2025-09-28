<?php
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
            handleTechniciansGet($pdo);
            break;
        case 'POST':
            handleTechniciansCreate($pdo);
            break;
        case 'PUT':
        case 'PATCH':
            handleTechniciansUpdate($pdo);
            break;
        case 'DELETE':
            handleTechniciansDelete($pdo);
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

function handleTechniciansGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if ($id) {
        $technician = fetchTechnicianById($pdo, $id);
        if (!$technician) {
            respondError('Technician not found', 404);
            return;
        }

        respond($technician);
        return;
    }

    $search = trim($_GET['search'] ?? '');
    $status = trim($_GET['status'] ?? '');
    $role = trim($_GET['role'] ?? '');
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

    if ($search !== '') {
        $where[] = '(
            full_name LIKE :search OR
            phone LIKE :search OR
            email LIKE :search OR
            specialization LIKE :search OR
            department LIKE :search OR
            notes LIKE :search
        )';
        $params['search'] = '%' . $search . '%';
    }

    if ($status !== '') {
        $normalizedStatus = normalizeTechnicianStatus($status);
        if ($normalizedStatus) {
            $where[] = 'status = :status';
            $params['status'] = $normalizedStatus;
        }
    }

    if ($role !== '') {
        $where[] = 'specialization = :role';
        $params['role'] = $role;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $query = sprintf(
        'SELECT * FROM technicians %s ORDER BY created_at DESC LIMIT %d OFFSET %d',
        $whereClause,
        $limit,
        $offset
    );

    $statement = $pdo->prepare($query);
    foreach ($params as $key => $value) {
        $statement->bindValue(':' . $key, $value);
    }
    $statement->execute();

    $items = [];
    while ($row = $statement->fetch()) {
        $items[] = mapTechnicianRow($row);
    }

    respond(
        $items,
        200,
        [
            'limit' => $limit,
            'offset' => $offset,
            'count' => count($items),
        ]
    );
}

function handleTechniciansCreate(PDO $pdo): void
{
    [$data, $errors] = validateTechnicianPayload(readJsonPayload(), false);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $sql = 'INSERT INTO technicians (
        full_name,
        phone,
        email,
        specialization,
        department,
        daily_wage,
        status,
        notes,
        active
    ) VALUES (
        :full_name,
        :phone,
        :email,
        :specialization,
        :department,
        :daily_wage,
        :status,
        :notes,
        :active
    )';

    $statement = $pdo->prepare($sql);
    $statement->execute([
        'full_name' => $data['full_name'],
        'phone' => $data['phone'],
        'email' => $data['email'],
        'specialization' => $data['specialization'],
        'department' => $data['department'],
        'daily_wage' => $data['daily_wage'],
        'status' => $data['status'],
        'notes' => $data['notes'],
        'active' => $data['active'],
    ]);

    $id = (int) $pdo->lastInsertId();
    $technician = fetchTechnicianById($pdo, $id);

    logActivity($pdo, 'TECHNICIAN_CREATE', [
        'technician_id' => $id,
        'payload' => $data,
    ]);

    respond($technician, 201);
}

function handleTechniciansUpdate(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid technician id', 400);
        return;
    }

    [$data, $errors] = validateTechnicianPayload(readJsonPayload(), true);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    if (!$data) {
        respondError('No fields provided for update', 422);
        return;
    }

    $fields = [];
    $params = ['id' => $id];

    foreach ($data as $column => $value) {
        $fields[] = sprintf('%s = :%s', $column, $column);
        $params[$column] = $value;
    }

    $sql = 'UPDATE technicians SET ' . implode(', ', $fields) . ' WHERE id = :id';
    $statement = $pdo->prepare($sql);
    $statement->execute($params);

    if ($statement->rowCount() === 0) {
        if (!fetchTechnicianById($pdo, $id)) {
            respondError('Technician not found', 404);
            return;
        }
    }

    $technician = fetchTechnicianById($pdo, $id);

    logActivity($pdo, 'TECHNICIAN_UPDATE', [
        'technician_id' => $id,
        'changes' => array_keys($data),
    ]);

    respond($technician);
}

function handleTechniciansDelete(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid technician id', 400);
        return;
    }

    $statement = $pdo->prepare('DELETE FROM technicians WHERE id = :id');
    $statement->execute(['id' => $id]);

    if ($statement->rowCount() === 0) {
        respondError('Technician not found', 404);
        return;
    }

    logActivity($pdo, 'TECHNICIAN_DELETE', [
        'technician_id' => $id,
    ]);

    respond(null);
}

function validateTechnicianPayload(array $payload, bool $isUpdate): array
{
    $errors = [];

    $name = isset($payload['full_name']) ? trim((string) $payload['full_name']) : null;
    $phone = isset($payload['phone']) ? trim((string) $payload['phone']) : null;
    $email = isset($payload['email']) ? trim((string) $payload['email']) : null;
    $specialization = isset($payload['specialization']) ? trim((string) $payload['specialization']) : null;
    $department = isset($payload['department']) ? trim((string) $payload['department']) : null;
    $dailyWage = isset($payload['daily_wage']) ? $payload['daily_wage'] : null;
    $status = isset($payload['status']) ? trim((string) $payload['status']) : null;
    $notes = isset($payload['notes']) ? trim((string) $payload['notes']) : null;
    $active = isset($payload['active']) ? (int) ((bool) $payload['active']) : 1;

    if (!$isUpdate || array_key_exists('full_name', $payload)) {
        if ($name === null || $name === '') {
            $errors['full_name'] = 'Full name is required';
        } elseif (mb_strlen($name) > 150) {
            $errors['full_name'] = 'Full name is too long (max 150 characters)';
        }
    }

    if (!$isUpdate || array_key_exists('phone', $payload)) {
        if ($phone === null || $phone === '') {
            $errors['phone'] = 'Phone number is required';
        } elseif (mb_strlen($phone) > 30) {
            $errors['phone'] = 'Phone number is too long (max 30 characters)';
        }
    }

    if ($email !== null && $email !== '') {
        if (mb_strlen($email) > 150) {
            $errors['email'] = 'Email is too long (max 150 characters)';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Email is invalid';
        }
    }

    if (!$isUpdate || array_key_exists('specialization', $payload)) {
        if ($specialization === null || $specialization === '') {
            $errors['specialization'] = 'Role is required';
        } elseif (mb_strlen($specialization) > 150) {
            $errors['specialization'] = 'Role is too long (max 150 characters)';
        }
    }

    if ($department !== null && mb_strlen($department) > 150) {
        $errors['department'] = 'Department is too long (max 150 characters)';
    }

    if ($notes !== null && mb_strlen($notes) > 500) {
        $errors['notes'] = 'Notes are too long (max 500 characters)';
    }

    if ($dailyWage !== null) {
        if (!is_numeric($dailyWage)) {
            $errors['daily_wage'] = 'Daily wage must be numeric';
        } elseif ((float) $dailyWage < 0) {
            $errors['daily_wage'] = 'Daily wage must be zero or greater';
        }
    }

    if ($status !== null && $status !== '') {
        $normalizedStatus = normalizeTechnicianStatus($status);
        if (!$normalizedStatus) {
            $errors['status'] = 'Status is invalid';
        }
    }

    $data = [];

    if ($errors) {
        return [$data, $errors];
    }

    if (!$isUpdate || array_key_exists('full_name', $payload)) {
        $data['full_name'] = $name;
    }

    if (!$isUpdate || array_key_exists('phone', $payload)) {
        $data['phone'] = $phone;
    }

    if (!$isUpdate || array_key_exists('email', $payload)) {
        $data['email'] = $email ?: null;
    }

    if (!$isUpdate || array_key_exists('specialization', $payload)) {
        $data['specialization'] = $specialization;
    }

    if (!$isUpdate || array_key_exists('department', $payload)) {
        $data['department'] = $department ?: null;
    }

    if (!$isUpdate || array_key_exists('daily_wage', $payload)) {
        $data['daily_wage'] = $dailyWage !== null ? (float) $dailyWage : 0;
    }

    if (!$isUpdate || array_key_exists('status', $payload)) {
        $data['status'] = normalizeTechnicianStatus($status ?? 'available');
    }

    if (!$isUpdate || array_key_exists('notes', $payload)) {
        $data['notes'] = $notes ?: null;
    }

    if (!$isUpdate || array_key_exists('active', $payload)) {
        $data['active'] = $active ? 1 : 0;
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

function fetchTechnicianById(PDO $pdo, int $id): array|false
{
    $statement = $pdo->prepare('SELECT * FROM technicians WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    $row = $statement->fetch();

    if (!$row) {
        return false;
    }

    return mapTechnicianRow($row);
}

function mapTechnicianRow(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'full_name' => $row['full_name'] ?? '',
        'phone' => $row['phone'] ?? '',
        'email' => $row['email'] ?? null,
        'specialization' => $row['specialization'] ?? '',
        'department' => $row['department'] ?? null,
        'daily_wage' => isset($row['daily_wage']) ? (float) $row['daily_wage'] : 0,
        'status' => normalizeTechnicianStatus($row['status'] ?? 'available'),
        'notes' => $row['notes'] ?? null,
        'active' => (bool) ($row['active'] ?? 1),
        'created_at' => $row['created_at'] ?? null,
        'updated_at' => $row['updated_at'] ?? null,
    ];
}

function normalizeTechnicianStatus(string $value): ?string
{
    $normalized = strtolower(trim($value));

    return match ($normalized) {
        'available', 'متاح' => 'available',
        'busy', 'مشغول', 'قيد العمل' => 'busy',
        'leave', 'إجازة', 'خارج الخدمة' => 'leave',
        'inactive', 'متوقف' => 'inactive',
        default => null,
    };
}
