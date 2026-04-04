<?php
require_once __DIR__ . '/../../bootstrap.php';

use ArtRatio\Repositories\EquipmentRepository;
use InvalidArgumentException;
use PDO;
use RuntimeException;
use Throwable;

try {
    $pdo  = getDatabaseConnection();
    AuthMiddleware::authenticated();
    $repo = new EquipmentRepository($pdo);

    (new Router($_SERVER['REQUEST_METHOD'] ?? 'GET', $_SERVER['REQUEST_URI'] ?? '/'))
        ->get('/api/equipment',    fn() => handleEquipmentGet($pdo, $repo))
        ->post('/api/equipment',   fn() => handleEquipmentCreate($pdo, $repo))
        ->put('/api/equipment',    fn() => handleEquipmentUpdate($pdo, $repo))
        ->patch('/api/equipment',  fn() => handleEquipmentUpdate($pdo, $repo))
        ->delete('/api/equipment', fn() => handleEquipmentDelete($pdo, $repo))
        ->dispatch();
} catch (InvalidArgumentException $exception) {
    respondError($exception->getMessage(), 400);
} catch (Throwable $exception) {
    error_log('API error: ' . $exception->getMessage());
    respondError('Unexpected server error', 500);
}

function handleEquipmentGet(PDO $pdo, EquipmentRepository $repo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if ($id) {
        $equipment = $repo->findById($id);

        if (!$equipment) {
            respondError('Equipment item not found', 404);
            return;
        }

        respond($equipment);
        return;
    }

    $search   = trim($_GET['search'] ?? '');
    $status   = trim($_GET['status'] ?? '');
    $category = trim($_GET['category'] ?? '');
    $all      = isset($_GET['all']) ? filter_var($_GET['all'], FILTER_VALIDATE_BOOLEAN) : false;
    $limit    = isset($_GET['limit'])  ? (int) $_GET['limit']  : 100;
    $offset   = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

    if ($all) {
        $repoLimit = null;
        $offset    = 0;
    } else {
        if ($limit < 1) { $limit = 100; } elseif ($limit > 1000) { $limit = 1000; }
        if ($offset < 0) { $offset = 0; }
        $repoLimit = $limit;
    }

    $filters = [];
    if ($search !== '') { $filters['search'] = $search; }
    if ($status !== '') {
        $normalizedStatus = normalizeStatus($status);
        if ($normalizedStatus) { $filters['status'] = $normalizedStatus; }
    }
    if ($category !== '') { $filters['category'] = $category; }

    $items = $repo->findAll($filters, $repoLimit, $offset);

    $meta = ['count' => count($items)];
    if (!$all) {
        $meta['limit']  = $limit;
        $meta['offset'] = $offset;
    } else {
        $meta['total'] = $repo->count();
    }

    respond($items, 200, $meta);
}

function handleEquipmentCreate(PDO $pdo, EquipmentRepository $repo): void
{
    requireRole(['admin', 'manager']);
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

        handleEquipmentBulkCreate($pdo, $repo, $items);
        return;
    }

    [$data, $errors] = validateEquipmentPayload($payload, false, $repo);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $created = $repo->create($data);

    logActivity($pdo, 'EQUIPMENT_CREATE', [
        'equipment_id' => $created['id'] ?? 0,
        'payload' => $data,
    ]);

    respond($created, 201);
}

function handleEquipmentBulkCreate(PDO $pdo, EquipmentRepository $repo, array $items): void
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
                'errors' => ['payload' => 'Each item must be an object'],
            ];
            continue;
        }

        [$data, $itemErrors] = validateEquipmentPayload($item, false, $repo);

        if ($itemErrors) {
            $dupError = isset($itemErrors['barcode']) && $itemErrors['barcode'] === 'Barcode already exists';

            if ($dupError && $updateExisting) {
                $barcodeValue = isset($item['barcode']) ? trim((string) $item['barcode']) : (isset($item['باركود']) ? trim((string) $item['باركود']) : null);
                if ($barcodeValue === null || $barcodeValue === '') {
                    $errors[] = ['index' => $index, 'errors' => $itemErrors];
                    continue;
                }
                $existingIdRow = $repo->findByBarcode($barcodeValue);
                if (!$existingIdRow) {
                    $errors[] = ['index' => $index, 'errors' => $itemErrors];
                    continue;
                }
                $existing = $repo->findById((int) $existingIdRow['id']);
                if (!$existing) {
                    $errors[] = ['index' => $index, 'errors' => $itemErrors];
                    continue;
                }

                [$updateData, $updateErrors] = validateEquipmentPayload($item, true, $repo, (int) $existing['id']);
                if ($updateErrors) {
                    $errors[] = ['index' => $index, 'errors' => $updateErrors];
                    continue;
                }
                // Never update status or barcode via bulk import
                unset($updateData['status'], $updateData['barcode']);
                if (!$updateData) {
                    $skippedDuplicates++;
                    continue;
                }
                $changed = [];
                foreach ($updateData as $col => $val) {
                    $currentVal = $existing[$col] ?? null;
                    if (is_numeric($val) && is_numeric($currentVal)) {
                        if ((string) (0 + $val) !== (string) (0 + $currentVal)) {
                            $changed[$col] = $val;
                        }
                    } elseif ((string) $val !== (string) $currentVal) {
                        $changed[$col] = $val;
                    }
                }

                if ($changed) {
                    $updates[] = ['id' => (int) $existing['id'], 'data' => $changed];
                } else {
                    $skippedDuplicates++;
                }
                continue;
            }

            if ($skipDuplicates && $dupError) {
                $skippedDuplicates++;
                continue;
            }

            $errors[] = ['index' => $index, 'errors' => $itemErrors];
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
                'errors' => ['barcode' => 'Barcode duplicated within upload batch'],
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
        respond([], 201, ['count' => 0, 'updated' => 0, 'skipped_duplicates' => $skippedDuplicates]);
        return;
    }

    $insertedIds = [];
    $updatedCount = 0;

    try {
        $pdo->beginTransaction();
        if ($prepared) {
            $insertedIds = $repo->bulkCreate($prepared);
        }
        foreach ($updates as $entry) {
            $repo->update($entry['id'], $entry['data']);
            $updatedCount++;
        }
        $pdo->commit();
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_log('API error: ' . $exception->getMessage());
        respondError('Failed to import equipment', 500);
        return;
    }

    if (!$insertedIds) {
        respond([], 201, ['count' => 0]);
        return;
    }

    $created = array_values(array_filter(array_map(fn($id) => $repo->findById($id), $insertedIds)));

    logActivity($pdo, 'EQUIPMENT_BULK_CREATE', [
        'count' => count($insertedIds),
        'ids' => $insertedIds,
    ]);

    respond($created, 201, [
        'count' => count($created),
        'updated' => $updatedCount,
        'skipped_duplicates' => $skippedDuplicates,
        'errors' => $errors ?: null,
    ]);
}

function handleEquipmentUpdate(PDO $pdo, EquipmentRepository $repo): void
{
    requireRole(['admin', 'manager']);
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid equipment id', 400);
        return;
    }

    [$data, $errors] = validateEquipmentPayload(readJsonPayload(), true, $repo, $id);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    if (!$data) {
        respondError('No fields provided for update', 422);
        return;
    }

    if (!$repo->exists($id)) {
        respondError('Equipment item not found', 404);
        return;
    }

    $updated = $repo->update($id, $data);

    logActivity($pdo, 'EQUIPMENT_UPDATE', [
        'equipment_id' => $id,
        'changes' => array_keys($data),
    ]);

    respond($updated);
}

function handleEquipmentDelete(PDO $pdo, EquipmentRepository $repo): void
{
    requireRole('admin');
    $deleteAll = isset($_GET['all']) ? filter_var($_GET['all'], FILTER_VALIDATE_BOOLEAN) : false;

    if ($deleteAll) {
        $total = $repo->deleteAll();

        logActivity($pdo, 'EQUIPMENT_CLEAR_ALL', ['count' => $total]);

        respond(null, 200, ['deleted' => $total]);
        return;
    }

    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid equipment id', 400);
        return;
    }

    if (!$repo->delete($id)) {
        respondError('Equipment item not found', 404);
        return;
    }

    logActivity($pdo, 'EQUIPMENT_DELETE', ['equipment_id' => $id]);

    respond(null);
}

function validateEquipmentPayload(array $payload, bool $isUpdate, EquipmentRepository $repo, ?int $currentId = null): array
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
            $duplicate = $repo->findByBarcode($barcode, $currentId);
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
