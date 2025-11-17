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
    $all = isset($_GET['all']) ? filter_var($_GET['all'], FILTER_VALIDATE_BOOLEAN) : false;
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 100;
    $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

    if ($all) {
        $limitClause = '';
        $offset = 0;
    } else {
        if ($limit < 1) {
            $limit = 100;
        } elseif ($limit > 1000) {
            $limit = 1000;
        }

        if ($offset < 0) {
            $offset = 0;
        }

        $limitClause = sprintf(' LIMIT %d OFFSET %d', $limit, $offset);
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

    $query = 'SELECT * FROM equipment ' . $whereClause . ' ORDER BY created_at DESC' . $limitClause;

    $statement = $pdo->prepare($query);
    foreach ($params as $key => $value) {
        $statement->bindValue(':' . $key, $value);
    }
    $statement->execute();
    $items = $statement->fetchAll();

    $meta = [
        'count' => count($items),
    ];

    if (!$all) {
        $meta['limit'] = $limit;
        $meta['offset'] = $offset;
    } else {
        $totalStatement = $pdo->query('SELECT COUNT(*) FROM equipment');
        $meta['total'] = (int) $totalStatement->fetchColumn();
    }

    respond($items, 200, $meta);
}

function handleEquipmentCreate(PDO $pdo): void
{
    $payload = readJsonPayload();

    if (isset($_GET['bulk']) || (is_array($payload) && array_is_list($payload)) || (is_array($payload) && isset($payload['items']) && array_is_list($payload['items']))) {
        $items = $payload;
        if (is_array($payload) && isset($payload['items']) && array_is_list($payload['items'])) {
            $items = $payload['items'];
        }

        if (!is_array($items)) {
            respondError('Invalid bulk payload', 422);
            return;
        }

        handleEquipmentBulkCreate($pdo, $items);
        return;
    }

    [$data, $errors] = validateEquipmentPayload($payload, false, $pdo);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $sql = 'INSERT INTO equipment (category, subcategory, name, description, quantity, unit_price, unit_cost, barcode, status, image_url, lessor) 
        VALUES (:category, :subcategory, :name, :description, :quantity, :unit_price, :unit_cost, :barcode, :status, :image_url, :lessor)';

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

function handleEquipmentBulkCreate(PDO $pdo, array $items): void
{
    requireRole('admin');
    if (!array_is_list($items)) {
        respondError('Invalid bulk payload', 422);
        return;
    }

    if (count($items) === 0) {
        respondError('No equipment payload provided', 422);
        return;
    }

    $prepared = [];
    $errors = [];
    $seenBarcodes = [];
    $skipDuplicates = isset($_GET['skip_duplicates']) ? filter_var($_GET['skip_duplicates'], FILTER_VALIDATE_BOOLEAN) : false;
    $updateExisting = isset($_GET['update_existing']) ? filter_var($_GET['update_existing'], FILTER_VALIDATE_BOOLEAN) : false;
    $skippedDuplicates = 0;
    $updates = [];

    foreach ($items as $index => $item) {
        if (!is_array($item)) {
            $errors[] = [
                'index' => $index,
                'errors' => [
                    'payload' => 'Each item must be an object',
                ],
            ];
            continue;
        }

        [$data, $itemErrors] = validateEquipmentPayload($item, false, $pdo);

        if ($itemErrors) {
            $dupError = isset($itemErrors['barcode']) && $itemErrors['barcode'] === 'Barcode already exists';
            if ($dupError && $updateExisting) {
                // Prepare update for existing record
                $barcodeValue = isset($item['barcode']) ? trim((string) $item['barcode']) : (isset($item['باركود']) ? trim((string) $item['باركود']) : null);
                if ($barcodeValue === null || $barcodeValue === '') {
                    $errors[] = [ 'index' => $index, 'errors' => $itemErrors ];
                    continue;
                }
                $existingStmt = $pdo->prepare('SELECT * FROM equipment WHERE barcode = :barcode LIMIT 1');
                $existingStmt->execute(['barcode' => $barcodeValue]);
                $existing = $existingStmt->fetch();
                if (!$existing) {
                    // fallback
                    $errors[] = [ 'index' => $index, 'errors' => $itemErrors ];
                    continue;
                }

                // Validate as update against existing id
                [$updateData, $updateErrors] = validateEquipmentPayload($item, true, $pdo, (int) $existing['id']);
                if ($updateErrors) {
                    $errors[] = [ 'index' => $index, 'errors' => $updateErrors ];
                    continue;
                }
                // Never update status via bulk import
                unset($updateData['status']);
                // Never change barcode via this flow
                unset($updateData['barcode']);
                if (!$updateData) {
                    $skippedDuplicates++;
                    continue;
                }
                // Compute only changed fields
                $changed = [];
                foreach ($updateData as $col => $val) {
                    $currentVal = $existing[$col] ?? null;
                    // Normalize numeric comparisons
                    if (is_numeric($val) && is_numeric($currentVal)) {
                        if ((string) (0 + $val) !== (string) (0 + $currentVal)) {
                            $changed[$col] = $val;
                        }
                    } else {
                        if ((string) $val !== (string) $currentVal) {
                            $changed[$col] = $val;
                        }
                    }
                }

                if ($changed) {
                    $updates[] = [ 'id' => (int) $existing['id'], 'data' => $changed ];
                } else {
                    $skippedDuplicates++;
                }
                continue;
            }

            // If only duplication-related errors and skipDuplicates is enabled, silently skip
            if ($skipDuplicates && $dupError) {
                $skippedDuplicates++;
                continue;
            }

            $errors[] = [
                'index' => $index,
                'errors' => $itemErrors,
            ];
            continue;
        }

        $barcode = $data['barcode'] ?? null;
        if ($barcode && isset($seenBarcodes[$barcode])) {
            if ($skipDuplicates) {
                $skippedDuplicates++;
                continue;
            }
            $errors[] = [
                'index' => $index,
                'errors' => [
                    'barcode' => 'Barcode duplicated within upload batch',
                ],
            ];
            continue;
        }

        if ($barcode) {
            $seenBarcodes[$barcode] = true;
        }

        $prepared[] = $data;
    }

    if ($errors && !$prepared) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    if (!$prepared && !$updates) {
        // Nothing to insert or update
        respond([], 201, ['count' => 0, 'updated' => 0, 'skipped_duplicates' => $skippedDuplicates]);
        return;
    }

    $sql = 'INSERT INTO equipment (category, subcategory, name, description, quantity, unit_price, unit_cost, barcode, status, image_url, lessor) 
        VALUES (:category, :subcategory, :name, :description, :quantity, :unit_price, :unit_cost, :barcode, :status, :image_url, :lessor)';

    $insertedIds = [];

    try {
        $pdo->beginTransaction();
        // Inserts
        if ($prepared) {
            $statement = $pdo->prepare($sql);
            foreach ($prepared as $data) {
                $statement->execute($data);
                $insertedIds[] = (int) $pdo->lastInsertId();
            }
        }
        // Updates
        $updatedCount = 0;
        if ($updates) {
            foreach ($updates as $entry) {
                $id = $entry['id'];
                $data = $entry['data'];
                if (!$data) continue;
                $fields = [];
                foreach ($data as $col => $_v) {
                    $fields[] = sprintf('%s = :%s', $col, $col);
                }
                if ($fields) {
                    $data['id'] = $id;
                    $upd = $pdo->prepare('UPDATE equipment SET ' . implode(', ', $fields) . ' WHERE id = :id');
                    $upd->execute($data);
                    $updatedCount += $upd->rowCount() >= 0 ? 1 : 0; // count item as processed
                }
            }
        }
        $pdo->commit();
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        respondError('Failed to import equipment', 500, ['details' => $exception->getMessage()]);
        return;
    }

    if (!$insertedIds) {
        respond([], 201, ['count' => 0]);
        return;
    }

    $placeholders = implode(',', array_fill(0, count($insertedIds), '?'));
    $created = [];
    if ($insertedIds) {
        $statement = $pdo->prepare('SELECT * FROM equipment WHERE id IN (' . $placeholders . ') ORDER BY id ASC');
        $statement->execute($insertedIds);
        $created = $statement->fetchAll();
    }

    logActivity($pdo, 'EQUIPMENT_BULK_CREATE', [
        'count' => count($insertedIds),
        'ids' => $insertedIds,
    ]);

    respond($created, 201, [
        'count' => count($created),
        'updated' => isset($updatedCount) ? $updatedCount : 0,
        'skipped_duplicates' => $skippedDuplicates,
        'errors' => $errors ?: null,
    ]);
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
    requireRole('admin');
    $deleteAll = isset($_GET['all']) ? filter_var($_GET['all'], FILTER_VALIDATE_BOOLEAN) : false;

    if ($deleteAll) {
        try {
            $pdo->beginTransaction();
            $countStatement = $pdo->query('SELECT COUNT(*) FROM equipment');
            $total = (int) $countStatement->fetchColumn();
            if ($total > 0) {
                // Clean related records first to honour foreign key constraints.
                $dependentTables = [
                    'reservation_equipment',
                    'project_equipment',
                    'maintenance_requests',
                ];

                foreach ($dependentTables as $table) {
                    $pdo->exec('DELETE FROM ' . $table);
                }

                $pdo->exec('DELETE FROM equipment');
            }
            $pdo->commit();

            logActivity($pdo, 'EQUIPMENT_CLEAR_ALL', [
                'count' => $total,
            ]);

            respond(null, 200, ['deleted' => $total]);
        } catch (Throwable $exception) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            respondError('Failed to clear equipment list', 500, ['details' => $exception->getMessage()]);
        }
        return;
    }

    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid equipment id', 400);
        return;
    }

    try {
        $pdo->beginTransaction();

        $check = $pdo->prepare('SELECT id FROM equipment WHERE id = :id LIMIT 1');
        $check->execute(['id' => $id]);
        if (!$check->fetchColumn()) {
            $pdo->rollBack();
            respondError('Equipment item not found', 404);
            return;
        }

        // Clean related records first to honour foreign key constraints.
        $dependentTables = [
            'reservation_equipment',
            'project_equipment',
            'maintenance_requests',
        ];

        foreach ($dependentTables as $table) {
            $cleanup = $pdo->prepare('DELETE FROM ' . $table . ' WHERE equipment_id = :id');
            $cleanup->execute(['id' => $id]);
        }

        $statement = $pdo->prepare('DELETE FROM equipment WHERE id = :id LIMIT 1');
        $statement->execute(['id' => $id]);

        if ($statement->rowCount() === 0) {
            $pdo->rollBack();
            respondError('Equipment item not found', 404);
            return;
        }

        $pdo->commit();
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        respondError('Failed to delete equipment item', 500, ['details' => $exception->getMessage()]);
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
    $unitCost = isset($payload['unit_cost'])
        ? $payload['unit_cost']
        : (isset($payload['cost'])
            ? $payload['cost']
            : (isset($payload['purchase_price'])
                ? $payload['purchase_price']
                : (isset($payload['rental_cost']) ? $payload['rental_cost'] : null)));
    $barcode = isset($payload['barcode']) ? trim((string) $payload['barcode']) : null;
    $status = isset($payload['status']) ? trim((string) $payload['status']) : null;
    $imageUrl = isset($payload['image_url']) ? trim((string) $payload['image_url']) : null;
    $lessor = isset($payload['lessor']) ? trim((string) $payload['lessor']) : null;

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

    if ($unitCost !== null) {
        if (!is_numeric($unitCost)) {
            $errors['unit_cost'] = 'Unit cost must be numeric';
        } else {
            $unitCost = (float) $unitCost;
            if ($unitCost < 0) {
                $errors['unit_cost'] = 'Unit cost must be zero or greater';
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

    if ($lessor !== null && mb_strlen($lessor) > 255) {
        $errors['lessor'] = 'Lessor is too long (max 255 characters)';
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

    if (!$isUpdate || array_key_exists('unit_cost', $payload) || array_key_exists('cost', $payload) || array_key_exists('purchase_price', $payload) || array_key_exists('rental_cost', $payload)) {
        $data['unit_cost'] = $unitCost !== null ? (float) $unitCost : 0;
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

    if (!$isUpdate || array_key_exists('lessor', $payload)) {
        $data['lessor'] = $lessor;
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
        'reserved', 'محجوز', 'مؤجرة', 'rented' => 'reserved',
        'maintenance', 'صيانة' => 'maintenance',
        'retired', 'متوقف', 'خارج الخدمة' => 'retired',
        default => null,
    };
}
