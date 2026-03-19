<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = getDatabaseConnection();
    ensureEquipmentCartTable($pdo);
    purgeStaleEquipmentCartRows($pdo);

    switch ($method) {
        case 'GET':
            handleEquipmentCartGet($pdo);
            break;
        case 'POST':
            handleEquipmentCartUpsert($pdo);
            break;
        case 'PATCH':
        case 'PUT':
            handleEquipmentCartPatch($pdo);
            break;
        case 'DELETE':
            handleEquipmentCartDelete($pdo);
            break;
        default:
            respondError('Method not allowed', 405);
    }
} catch (InvalidArgumentException $exception) {
    respondError($exception->getMessage(), 422);
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}

function handleEquipmentCartGet(PDO $pdo): void
{
    $sessionToken = getEquipmentCartSessionToken();
    $items = fetchEquipmentCartItems($pdo, $sessionToken);

    respond($items, 200, buildEquipmentCartMeta($items));
}

function handleEquipmentCartUpsert(PDO $pdo): void
{
    $payload = readEquipmentCartJsonPayload();
    $sessionToken = getEquipmentCartSessionToken();

    $name = normalizeEquipmentCartText((string) ($payload['name'] ?? ''), 255);
    if ($name === '') {
        throw new InvalidArgumentException('Equipment name is required');
    }

    $image = normalizeEquipmentCartUrl((string) ($payload['image'] ?? ''));
    $category = normalizeEquipmentCartText((string) ($payload['category'] ?? ''), 190);
    $subcategory = normalizeEquipmentCartText((string) ($payload['subcategory'] ?? ''), 190);
    $qty = normalizeEquipmentCartQty($payload['qty'] ?? 1);

    $itemKey = normalizeEquipmentCartItemKey((string) ($payload['item_key'] ?? ''));
    if ($itemKey === '') {
        $itemKey = buildEquipmentCartItemKey($name, $image, $category, $subcategory);
    }

    $statement = $pdo->prepare(
        'INSERT INTO equipment_cart_items (
            session_token,
            item_key,
            name,
            image_url,
            category,
            subcategory,
            qty
        ) VALUES (
            :session_token,
            :item_key,
            :name,
            :image_url,
            :category,
            :subcategory,
            :qty
        )
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            image_url = VALUES(image_url),
            category = VALUES(category),
            subcategory = VALUES(subcategory),
            qty = VALUES(qty),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        'session_token' => $sessionToken,
        'item_key' => $itemKey,
        'name' => $name,
        'image_url' => $image !== '' ? $image : null,
        'category' => $category !== '' ? $category : null,
        'subcategory' => $subcategory !== '' ? $subcategory : null,
        'qty' => $qty,
    ]);

    $items = fetchEquipmentCartItems($pdo, $sessionToken);

    respond([
        'item_key' => $itemKey,
        'items' => $items,
    ], 200, buildEquipmentCartMeta($items));
}

function handleEquipmentCartPatch(PDO $pdo): void
{
    $payload = readEquipmentCartJsonPayload();
    $sessionToken = getEquipmentCartSessionToken();

    $itemKey = normalizeEquipmentCartItemKey((string) ($payload['item_key'] ?? ''));
    if ($itemKey === '') {
        throw new InvalidArgumentException('item_key is required');
    }

    $qty = normalizeEquipmentCartQty($payload['qty'] ?? 1);

    $statement = $pdo->prepare(
        'UPDATE equipment_cart_items
         SET qty = :qty, updated_at = CURRENT_TIMESTAMP
         WHERE session_token = :session_token AND item_key = :item_key'
    );
    $statement->execute([
        'qty' => $qty,
        'session_token' => $sessionToken,
        'item_key' => $itemKey,
    ]);

    $items = fetchEquipmentCartItems($pdo, $sessionToken);

    respond([
        'item_key' => $itemKey,
        'items' => $items,
    ], 200, buildEquipmentCartMeta($items));
}

function handleEquipmentCartDelete(PDO $pdo): void
{
    $payload = readEquipmentCartJsonPayload(true);
    $sessionToken = getEquipmentCartSessionToken();
    $itemKey = normalizeEquipmentCartItemKey((string) ($payload['item_key'] ?? ''));

    if ($itemKey !== '') {
        $statement = $pdo->prepare(
            'DELETE FROM equipment_cart_items
             WHERE session_token = :session_token AND item_key = :item_key'
        );
        $statement->execute([
            'session_token' => $sessionToken,
            'item_key' => $itemKey,
        ]);
    } else {
        $statement = $pdo->prepare(
            'DELETE FROM equipment_cart_items
             WHERE session_token = :session_token'
        );
        $statement->execute([
            'session_token' => $sessionToken,
        ]);
    }

    $items = fetchEquipmentCartItems($pdo, $sessionToken);

    respond([
        'items' => $items,
    ], 200, buildEquipmentCartMeta($items));
}

function ensureEquipmentCartTable(PDO $pdo): void
{
    static $ensured = false;
    if ($ensured) {
        return;
    }

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS equipment_cart_items (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            session_token VARCHAR(128) NOT NULL,
            item_key CHAR(64) NOT NULL,
            name VARCHAR(255) NOT NULL,
            image_url TEXT NULL,
            category VARCHAR(190) NULL,
            subcategory VARCHAR(190) NULL,
            qty INT UNSIGNED NOT NULL DEFAULT 1,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY uq_equipment_cart_session_item (session_token, item_key),
            KEY idx_equipment_cart_session_updated (session_token, updated_at),
            KEY idx_equipment_cart_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $ensured = true;
}

function purgeStaleEquipmentCartRows(PDO $pdo): void
{
    static $purged = false;
    if ($purged) {
        return;
    }

    $statement = $pdo->prepare(
        'DELETE FROM equipment_cart_items
         WHERE updated_at < DATE_SUB(NOW(), INTERVAL 30 DAY)'
    );
    $statement->execute();

    $purged = true;
}

function fetchEquipmentCartItems(PDO $pdo, string $sessionToken): array
{
    $statement = $pdo->prepare(
        'SELECT item_key, name, image_url, category, subcategory, qty
         FROM equipment_cart_items
         WHERE session_token = :session_token
         ORDER BY created_at ASC, id ASC'
    );
    $statement->execute(['session_token' => $sessionToken]);
    $rows = $statement->fetchAll() ?: [];

    return array_map(static function (array $row): array {
        return [
            'item_key' => (string) ($row['item_key'] ?? ''),
            'name' => (string) ($row['name'] ?? ''),
            'image' => (string) ($row['image_url'] ?? ''),
            'category' => (string) ($row['category'] ?? ''),
            'subcategory' => (string) ($row['subcategory'] ?? ''),
            'qty' => max(1, (int) ($row['qty'] ?? 1)),
        ];
    }, $rows);
}

function buildEquipmentCartMeta(array $items): array
{
    $totalItems = 0;
    foreach ($items as $item) {
        $totalItems += max(1, (int) ($item['qty'] ?? 1));
    }

    return [
        'count' => count($items),
        'total_items' => $totalItems,
    ];
}

function getEquipmentCartSessionToken(): string
{
    $sessionId = session_id();
    if ($sessionId === '') {
        if (PHP_SESSION_ACTIVE !== session_status()) {
            session_start();
        }
        $sessionId = session_id();
    }

    return hash('sha256', 'equipment-cart|' . $sessionId);
}

function readEquipmentCartJsonPayload(bool $allowEmpty = false): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false) {
        throw new InvalidArgumentException('Unable to read request body');
    }

    $raw = trim($raw);
    if ($raw === '') {
        return $allowEmpty ? [] : [];
    }

    $payload = json_decode($raw, true);
    if (!is_array($payload)) {
        throw new InvalidArgumentException('Invalid JSON payload');
    }

    return $payload;
}

function normalizeEquipmentCartText(string $value, int $maxLength): string
{
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value) ?? '';
    $value = trim(preg_replace('/\s+/u', ' ', $value) ?? '');

    if ($maxLength > 0 && function_exists('mb_strlen') && mb_strlen($value, 'UTF-8') > $maxLength) {
        $value = trim((string) mb_substr($value, 0, $maxLength, 'UTF-8'));
    } elseif ($maxLength > 0 && strlen($value) > $maxLength) {
        $value = trim(substr($value, 0, $maxLength));
    }

    return $value;
}

function normalizeEquipmentCartUrl(string $value): string
{
    $value = trim($value);
    if ($value === '') {
        return '';
    }

    if (strlen($value) > 2000) {
        $value = substr($value, 0, 2000);
    }

    return $value;
}

function normalizeEquipmentCartQty(mixed $qty): int
{
    $normalized = (int) $qty;
    if ($normalized < 1) {
        return 1;
    }
    if ($normalized > 999) {
        return 999;
    }
    return $normalized;
}

function normalizeEquipmentCartItemKey(string $itemKey): string
{
    $itemKey = strtolower(trim($itemKey));
    if ($itemKey === '') {
        return '';
    }
    if (!preg_match('/^[a-f0-9]{64}$/', $itemKey)) {
        return '';
    }
    return $itemKey;
}

function buildEquipmentCartItemKey(
    string $name,
    string $image,
    string $category,
    string $subcategory
): string {
    $lower = static function (string $value): string {
        $value = trim($value);
        if (function_exists('mb_strtolower')) {
            return mb_strtolower($value, 'UTF-8');
        }
        return strtolower($value);
    };

    $parts = [
        $lower($name),
        $lower($image),
        $lower($category),
        $lower($subcategory),
    ];

    return hash('sha256', implode('|', $parts));
}
