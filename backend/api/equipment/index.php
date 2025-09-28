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
            handleEquipmentGet($pdo);
            break;
        case 'POST':
            handleEquipmentCreate($pdo);
            break;
        case 'PUT':
        case 'PATCH':
            handleEquipmentUpdate($pdo);
            break;
        case 'DELETE':
            handleEquipmentDelete($pdo);
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

function handleEquipmentGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if ($id) {
        $statement = $pdo->prepare('SELECT * FROM equipment WHERE id = :id LIMIT 1');
        $statement->execute(['id' => $id]);
        $equipment = $statement->fetch();

        if (!$equipment) {
            respondError('Equipment item not found', 404);
            return;
        }

        respond($equipment);
        return;
    }

    $search = trim($_GET['search'] ?? '');
    $status = trim($_GET['status'] ?? '');
    $category = trim($_GET['category'] ?? '');
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 100;
    $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

    if ($limit < 1 || $limit > 200) {
        $limit = 100;
    }

    if ($offset < 0) {
        $offset = 0;
    }

    $where = [];
    $params = [];

    if ($search !== '') {
        $where[] = '(description LIKE :search OR name LIKE :search OR barcode LIKE :search OR category LIKE :search OR subcategory LIKE :search)';
        $params['search'] = '%' . $search . '%';
    }

    if ($status !== '') {
        $normalizedStatus = normalizeStatus($status);
        if ($normalizedStatus) {
            $where[] = 'status = :status';
            $params['status'] = $normalizedStatus;
        }
    }

    if ($category !== '') {
        $where[] = 'category = :category';
        $params['category'] = $category;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $query = sprintf(
        'SELECT * FROM equipment %s ORDER BY created_at DESC LIMIT %d OFFSET %d',
        $whereClause,
        $limit,
        $offset
    );

    $statement = $pdo->prepare($query);
    foreach ($params as $key => $value) {
        $statement->bindValue(':' . $key, $value);
    }
    $statement->execute();
    $items = $statement->fetchAll();

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

function handleEquipmentCreate(PDO $pdo): void
{
    [$data, $errors] = validateEquipmentPayload(readJsonPayload(), false, $pdo);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $sql = 'INSERT INTO equipment (category, subcategory, name, description, quantity, unit_price, barcode, status, image_url) 
        VALUES (:category, :subcategory, :name, :description, :quantity, :unit_price, :barcode, :status, :image_url)';

    $statement = $pdo->prepare($sql);
    $statement->execute($data);

    $id = (int) $pdo->lastInsertId();
    $statement = $pdo->prepare('SELECT * FROM equipment WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    $created = $statement->fetch();

    logActivity($pdo, 'EQUIPMENT_CREATE', [
        'equipment_id' => $id,
        'payload' => $data,
    ]);

    respond($created, 201);
}

function handleEquipmentUpdate(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid equipment id', 400);
        return;
    }

    [$data, $errors] = validateEquipmentPayload(readJsonPayload(), true, $pdo, $id);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    if (!$data) {
        respondError('No fields provided for update', 422);
        return;
    }

    $fields = [];
    foreach ($data as $column => $_value) {
        $fields[] = sprintf('%s = :%s', $column, $column);
    }

    $data['id'] = $id;
    $sql = 'UPDATE equipment SET ' . implode(', ', $fields) . ' WHERE id = :id';
    $statement = $pdo->prepare($sql);
    $statement->execute($data);

    if ($statement->rowCount() === 0) {
        $check = $pdo->prepare('SELECT id FROM equipment WHERE id = :id LIMIT 1');
        $check->execute(['id' => $id]);
        if (!$check->fetch()) {
            respondError('Equipment item not found', 404);
            return;
        }
    }

    $statement = $pdo->prepare('SELECT * FROM equipment WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    $updated = $statement->fetch();

    $changedColumns = array_values(array_filter(array_keys($data), static fn($column) => $column !== 'id'));

    logActivity($pdo, 'EQUIPMENT_UPDATE', [
        'equipment_id' => $id,
        'changes' => $changedColumns,
    ]);

    respond($updated);
}

function handleEquipmentDelete(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid equipment id', 400);
        return;
    }

    $statement = $pdo->prepare('DELETE FROM equipment WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);

    if ($statement->rowCount() === 0) {
        respondError('Equipment item not found', 404);
        return;
    }

    logActivity($pdo, 'EQUIPMENT_DELETE', [
        'equipment_id' => $id,
    ]);

    respond(null);
}

function validateEquipmentPayload(array $payload, bool $isUpdate, PDO $pdo, ?int $currentId = null): array
{
    $errors = [];

    $category = isset($payload['category']) ? trim((string) $payload['category']) : null;
    $subcategory = isset($payload['subcategory']) ? trim((string) $payload['subcategory']) : null;
    $name = isset($payload['name']) ? trim((string) $payload['name']) : null;
    $description = isset($payload['description']) ? trim((string) $payload['description']) : null;
    $quantity = isset($payload['quantity']) ? $payload['quantity'] : null;
    $unitPrice = isset($payload['unit_price']) ? $payload['unit_price'] : null;
    $barcode = isset($payload['barcode']) ? trim((string) $payload['barcode']) : null;
    $status = isset($payload['status']) ? trim((string) $payload['status']) : null;
    $imageUrl = isset($payload['image_url']) ? trim((string) $payload['image_url']) : null;

    if (!$isUpdate || array_key_exists('description', $payload)) {
        if ($description === null || $description === '') {
            $errors['description'] = 'Description is required';
        } elseif (mb_strlen($description) > 500) {
            $errors['description'] = 'Description is too long (max 500 characters)';
        }
    }

    if (!$isUpdate || array_key_exists('barcode', $payload)) {
        if ($barcode === null || $barcode === '') {
            $errors['barcode'] = 'Barcode is required';
        } elseif (mb_strlen($barcode) > 100) {
            $errors['barcode'] = 'Barcode is too long (max 100 characters)';
        } else {
            $duplicate = findEquipmentByBarcode($pdo, $barcode, $currentId);
            if ($duplicate) {
                $errors['barcode'] = 'Barcode already exists';
            }
        }
    }

    if ($category !== null && mb_strlen($category) > 100) {
        $errors['category'] = 'Category is too long (max 100 characters)';
    }

    if ($subcategory !== null && mb_strlen($subcategory) > 100) {
        $errors['subcategory'] = 'Subcategory is too long (max 100 characters)';
    }

    if ($name !== null && mb_strlen($name) > 150) {
        $errors['name'] = 'Name is too long (max 150 characters)';
    }

    if ($quantity !== null) {
        if (!is_numeric($quantity)) {
            $errors['quantity'] = 'Quantity must be numeric';
        } else {
            $quantity = (int) $quantity;
            if ($quantity < 0) {
                $errors['quantity'] = 'Quantity must be zero or greater';
            }
        }
    }

    if ($unitPrice !== null) {
        if (!is_numeric($unitPrice)) {
            $errors['unit_price'] = 'Unit price must be numeric';
        } else {
            $unitPrice = (float) $unitPrice;
            if ($unitPrice < 0) {
                $errors['unit_price'] = 'Unit price must be zero or greater';
            }
        }
    }

    $normalizedStatus = null;
    if ($status !== null && $status !== '') {
        $normalizedStatus = normalizeStatus($status);
        if (!$normalizedStatus) {
            $errors['status'] = 'Status is invalid';
        }
    }

    if ($imageUrl !== null && mb_strlen($imageUrl) > 255) {
        $errors['image_url'] = 'Image URL is too long (max 255 characters)';
    }

    $data = [];

    if ($errors) {
        return [$data, $errors];
    }

    if (!$isUpdate || array_key_exists('category', $payload)) {
        $data['category'] = $category;
    }

    if (!$isUpdate || array_key_exists('subcategory', $payload)) {
        $data['subcategory'] = $subcategory;
    }

    if (!$isUpdate || array_key_exists('name', $payload)) {
        $data['name'] = $name;
    }

    if (!$isUpdate || array_key_exists('description', $payload)) {
        $data['description'] = $description;
    }

    if (!$isUpdate || array_key_exists('quantity', $payload)) {
        $data['quantity'] = $quantity !== null ? (int) $quantity : ($isUpdate ? 0 : 1);
    }

    if (!$isUpdate || array_key_exists('unit_price', $payload)) {
        $data['unit_price'] = $unitPrice !== null ? (float) $unitPrice : 0;
    }

    if (!$isUpdate || array_key_exists('barcode', $payload)) {
        $data['barcode'] = $barcode;
    }

    if (!$isUpdate || array_key_exists('status', $payload)) {
        $data['status'] = $normalizedStatus ?? 'available';
    }

    if (!$isUpdate || array_key_exists('image_url', $payload)) {
        $data['image_url'] = $imageUrl;
    }

    return [$data, $errors];
}

function findEquipmentByBarcode(PDO $pdo, string $barcode, ?int $ignoreId = null): array|false
{
    $sql = 'SELECT id FROM equipment WHERE barcode = :barcode';
    $params = ['barcode' => $barcode];

    if ($ignoreId !== null) {
        $sql .= ' AND id <> :ignoreId';
        $params['ignoreId'] = $ignoreId;
    }

    $statement = $pdo->prepare($sql . ' LIMIT 1');
    $statement->execute($params);
    return $statement->fetch();
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

function normalizeStatus(string $value): ?string
{
    $normalized = strtolower(trim($value));

    return match ($normalized) {
        'available', 'متاح', 'متوفر' => 'available',
        'reserved', 'محجوز' => 'reserved',
        'maintenance', 'صيانة' => 'maintenance',
        'retired', 'متوقف', 'خارج الخدمة' => 'retired',
        default => null,
    };
}
