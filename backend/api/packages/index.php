<?php
require_once __DIR__ . '/../../bootstrap.php';

use InvalidArgumentException;
use PDO;
use Throwable;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = getDatabaseConnection();
    requireAuthenticated();

    ensurePackageQuantityColumn($pdo);

    switch ($method) {
        case 'GET':
            handlePackagesGet($pdo);
            break;
        case 'POST':
            handlePackagesCreate($pdo);
            break;
        case 'PUT':
        case 'PATCH':
            handlePackagesUpdate($pdo);
            break;
        case 'DELETE':
            handlePackagesDelete($pdo);
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

function handlePackagesGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if ($id) {
        $package = fetchPackageById($pdo, $id);
        if (!$package) {
            respondError('Package not found', 404);
            return;
        }

        respond($package);
        return;
    }

    $search = trim($_GET['search'] ?? '');
    $active = $_GET['active'] ?? null;
    $all = isset($_GET['all']) ? filter_var($_GET['all'], FILTER_VALIDATE_BOOLEAN) : false;
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 100;
    $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

    $where = [];
    $params = [];

    if ($search !== '') {
        $where[] = '(package_code LIKE :search OR name LIKE :search OR description LIKE :search)';
        $params['search'] = '%' . $search . '%';
    }

    if ($active !== null && $active !== '') {
        $where[] = 'is_active = :is_active';
        $params['is_active'] = filter_var($active, FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
    }

    if ($limit < 1) {
        $limit = 100;
    } elseif ($limit > 500) {
        $limit = 500;
    }

    if ($offset < 0) {
        $offset = 0;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';
    $limitClause = $all ? '' : sprintf(' LIMIT %d OFFSET %d', $limit, $offset);

    $query = sprintf('SELECT * FROM equipment_packages %s ORDER BY created_at DESC%s', $whereClause, $limitClause);
    $statement = $pdo->prepare($query);
    foreach ($params as $key => $value) {
        $statement->bindValue(':' . $key, $value);
    }
    $statement->execute();

    $items = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $items[] = mapPackageRow($row);
    }

    $meta = [
        'count' => count($items),
    ];

    if (!$all) {
        $meta['limit'] = $limit;
        $meta['offset'] = $offset;
    } else {
        $totalStatement = $pdo->query('SELECT COUNT(*) FROM equipment_packages');
        $meta['total'] = (int) $totalStatement->fetchColumn();
    }

    respond($items, 200, $meta);
}

function handlePackagesCreate(PDO $pdo): void
{
    requireRole('admin');
    $payload = readJsonPayload();

    [$data, $errors] = validatePackagePayload($pdo, $payload, false);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $sql = 'INSERT INTO equipment_packages (package_code, slug, name, description, price, package_qty, equipment_ids, is_active)
        VALUES (:package_code, :slug, :name, :description, :price, :package_qty, :equipment_ids, :is_active)';

    $statement = $pdo->prepare($sql);
    $statement->execute($data);

    $id = (int) $pdo->lastInsertId();
    $package = fetchPackageById($pdo, $id);

    logActivity($pdo, 'PACKAGE_CREATE', [
        'package_id' => $id,
        'payload' => $data,
    ]);

    respond($package, 201);
}

function handlePackagesUpdate(PDO $pdo): void
{
    requireRole('admin');
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    if (!$id) {
        respondError('Missing or invalid package id', 400);
        return;
    }

    $existing = fetchPackageById($pdo, $id);
    if (!$existing) {
        respondError('Package not found', 404);
        return;
    }

    $payload = readJsonPayload();
    [$data, $errors] = validatePackagePayload($pdo, $payload, true, $id);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $updates = [];
    $params = [];
    foreach ($data as $key => $value) {
        $updates[] = sprintf('%s = :%s', $key, $key);
        $params[$key] = $value;
    }

    if (!$updates) {
        respond($existing);
        return;
    }

    $params['id'] = $id;
    $sql = 'UPDATE equipment_packages SET ' . implode(', ', $updates) . ' WHERE id = :id';
    $statement = $pdo->prepare($sql);
    $statement->execute($params);

    $package = fetchPackageById($pdo, $id);

    logActivity($pdo, 'PACKAGE_UPDATE', [
        'package_id' => $id,
        'payload' => $params,
    ]);

    respond($package);
}

function handlePackagesDelete(PDO $pdo): void
{
    requireRole('admin');
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if (!$id) {
        respondError('Missing or invalid package id', 400);
        return;
    }

    $existing = fetchPackageById($pdo, $id);
    if (!$existing) {
        respondError('Package not found', 404);
        return;
    }

    $statement = $pdo->prepare('DELETE FROM equipment_packages WHERE id = :id');
    $statement->execute(['id' => $id]);

    logActivity($pdo, 'PACKAGE_DELETE', [
        'package_id' => $id,
    ]);

    respond(['deleted' => true]);
}

/**
 * Adds package_qty column to equipment_packages if missing.
 */
function ensurePackageQuantityColumn(PDO $pdo): void
{
    try {
        if (!tableColumnExists($pdo, 'equipment_packages', 'package_qty')) {
            $pdo->exec("ALTER TABLE equipment_packages ADD COLUMN package_qty INT NOT NULL DEFAULT 1 AFTER price");
        }
    } catch (Throwable $_) {
        // best-effort; ignore if cannot alter
    }
}

function validatePackagePayload(PDO $pdo, $payload, bool $isUpdate, ?int $packageId = null): array
{
    if (!is_array($payload)) {
        return [[], ['payload' => 'Payload must be an object']];
    }

    $errors = [];
    $data = [];

    $code = trim((string)($payload['package_code'] ?? ($payload['code'] ?? '')));
    $name = trim((string)($payload['name'] ?? ''));
    $description = trim((string)($payload['description'] ?? ''));
    $price = $payload['price'] ?? 0;
    $packageQtyRaw = $payload['package_qty'] ?? $payload['packageQty'] ?? null;
    $itemsRaw = $payload['items'] ?? $payload['equipment_ids'] ?? [];
    $isActive = $payload['is_active'] ?? true;

    if (!$isUpdate || $code !== '') {
        if ($code === '') {
            $errors['package_code'] = 'Package code is required';
        } else {
            $statement = $pdo->prepare('SELECT id FROM equipment_packages WHERE package_code = :code LIMIT 1');
            $statement->execute(['code' => $code]);
            $existing = $statement->fetch(PDO::FETCH_ASSOC);
            if ($existing && (int)$existing['id'] !== (int)$packageId) {
                $errors['package_code'] = 'Package code already exists';
            } else {
                $data['package_code'] = $code;
            }
        }
    }

    if (!$isUpdate || $name !== '') {
        if ($name === '') {
            $errors['name'] = 'Package name is required';
        } else {
            $data['name'] = $name;
        }
    }

    if ($description !== '' || !$isUpdate) {
        $data['description'] = $description !== '' ? $description : null;
    }

    if ($price !== null || !$isUpdate) {
        $numericPrice = filter_var($price, FILTER_VALIDATE_FLOAT);
        $data['price'] = $numericPrice !== false ? round($numericPrice, 2) : 0;
    }

    if ($packageQtyRaw !== null || !$isUpdate) {
        $qty = filter_var($packageQtyRaw, FILTER_VALIDATE_INT);
        if ($qty === false || $qty < 1) {
            $errors['package_qty'] = 'package_qty must be at least 1';
        } else {
            $data['package_qty'] = $qty;
        }
    }

    $itemsNormalized = normalizePackageItemsArray($itemsRaw);
    if (!$isUpdate || $itemsRaw !== []) {
        if (!$itemsNormalized) {
            $errors['items'] = 'Package must include at least one equipment item';
        } else {
            $missing = findMissingEquipment($pdo, $itemsNormalized);
            if ($missing) {
                $errors['items'] = sprintf('Equipment IDs not found: %s', implode(', ', $missing));
            } else {
                $data['equipment_ids'] = json_encode($itemsNormalized, JSON_UNESCAPED_UNICODE);
            }
        }
    }

    if ($isActive !== null || !$isUpdate) {
        $data['is_active'] = filter_var($isActive, FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
    }

    if (!isset($data['slug']) && isset($data['package_code'])) {
        $data['slug'] = generateSlug($data['package_code']);
    }

    foreach ($data as $key => $value) {
        if ($value === null && in_array($key, ['description'], true)) {
            continue;
        }
        if ($value === null) {
            unset($data[$key]);
        }
    }

    return [$data, $errors];
}

/**
 * Checks if a given column exists on a table (best-effort, safe to use at runtime).
 */
function tableColumnExists(PDO $pdo, string $table, string $column): bool
{
    try {
        $stmt = $pdo->prepare("SHOW COLUMNS FROM `{$table}` LIKE :col");
        $stmt->execute(['col' => $column]);
        return (bool) $stmt->fetch();
    } catch (Throwable $_) {
        return false;
    }
}

function fetchPackageById(PDO $pdo, int $id): ?array
{
    $statement = $pdo->prepare('SELECT * FROM equipment_packages WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    $row = $statement->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        return null;
    }
    return mapPackageRow($row);
}

function mapPackageRow(array $row): array
{
    $items = [];
    $itemsCount = 0;
    $itemsQuantity = 0;
    if (!empty($row['equipment_ids'])) {
        $decoded = json_decode($row['equipment_ids'], true);
        if (is_array($decoded)) {
            $items = normalizePackageItemsArray($decoded);
            foreach ($items as $item) {
                $qty = isset($item['quantity']) ? (int)$item['quantity'] : 0;
                if ($qty < 1) {
                    $qty = 1;
                }
                $itemsQuantity += $qty;
                $itemsCount += 1;
            }
        }
    }

    $row['items'] = $items;
    $row['items_count'] = $itemsCount;
    $row['items_total_quantity'] = $itemsQuantity;
    $row['package_qty'] = isset($row['package_qty']) ? (int)$row['package_qty'] : 1;
    return $row;
}

function normalizePackageItemsArray($items): array
{
    if (!is_array($items)) {
        return [];
    }

    $normalized = [];
    foreach ($items as $item) {
        if ($item === null) {
            continue;
        }
        if (is_numeric($item)) {
            $normalized[] = [
                'equipment_id' => (int)$item,
                'quantity' => 1,
            ];
            continue;
        }
        if (!is_array($item)) {
            continue;
        }
        $equipmentId = $item['equipment_id'] ?? $item['equipmentId'] ?? $item['id'] ?? null;
        if ($equipmentId === null) {
            continue;
        }
        $quantity = $item['quantity'] ?? $item['qty'] ?? 1;
        $unitPrice = $item['unit_price'] ?? $item['price'] ?? null;

        $normalized[] = [
            'equipment_id' => (int)$equipmentId,
            'quantity' => max(1, (int)$quantity),
            'unit_price' => $unitPrice !== null ? round((float)$unitPrice, 2) : null,
        ];
    }

    return $normalized;
}

function findMissingEquipment(PDO $pdo, array $items): array
{
    if (!$items) {
        return [];
    }

    $ids = array_unique(array_map(static fn ($item) => (int)$item['equipment_id'], $items));
    if (!$ids) {
        return [];
    }

    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $statement = $pdo->prepare('SELECT id FROM equipment WHERE id IN (' . $placeholders . ')');
    foreach ($ids as $index => $id) {
        $statement->bindValue($index + 1, $id, PDO::PARAM_INT);
    }
    $statement->execute();
    $found = $statement->fetchAll(PDO::FETCH_COLUMN, 0);

    $missing = array_diff($ids, array_map('intval', $found));
    return array_map('strval', $missing);
}

function generateSlug(string $value): string
{
    $value = strtolower($value);
    $value = preg_replace('/[^a-z0-9\-]+/i', '-', $value);
    $value = trim($value, '-');
    return $value ?: bin2hex(random_bytes(4));
}

function readJsonPayload(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new InvalidArgumentException('Invalid JSON payload');
    }

    return is_array($decoded) ? $decoded : [];
}
