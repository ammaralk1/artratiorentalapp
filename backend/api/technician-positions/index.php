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
            handleTechnicianPositionsGet($pdo);
            break;
        case 'POST':
            handleTechnicianPositionsCreate($pdo);
            break;
        case 'PUT':
        case 'PATCH':
            handleTechnicianPositionsUpdate($pdo);
            break;
        case 'DELETE':
            handleTechnicianPositionsDelete($pdo);
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

function handleTechnicianPositionsGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if ($id) {
        $position = fetchTechnicianPositionById($pdo, $id);
        if (!$position) {
            respondError('Position not found', 404);
            return;
        }

        respond($position);
        return;
    }

    $search = trim($_GET['search'] ?? '');
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
        $where[] = 'name LIKE :search';
        $params['search'] = '%' . $search . '%';
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $query = sprintf(
        'SELECT * FROM technician_positions %s ORDER BY name ASC LIMIT %d OFFSET %d',
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
        $items[] = mapTechnicianPositionRow($row);
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

function handleTechnicianPositionsCreate(PDO $pdo): void
{
    requireRole(['manager', 'admin']);

    [$data, $errors] = validateTechnicianPositionPayload(readJsonPayload(), false);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $pdo->beginTransaction();

    try {
        $data = ensurePositionLabels($data);
        $data['name'] = generatePositionSlug($data['name'] ?? $data['label_en'] ?? $data['label_ar'] ?? '');

        $existing = findTechnicianPositionByName($pdo, $data['name']);
        if ($existing) {
            throw new InvalidArgumentException('A position with that name already exists');
        }

        $supportsTranslations = technicianPositionsSupportsTranslations($pdo);

        if ($supportsTranslations) {
            $statement = $pdo->prepare(
                'INSERT INTO technician_positions (name, label_ar, label_en, cost, client_price) VALUES (:name, :label_ar, :label_en, :cost, :client_price)'
            );
            $statement->execute([
                'name' => $data['name'],
                'label_ar' => $data['label_ar'],
                'label_en' => $data['label_en'],
                'cost' => $data['cost'],
                'client_price' => $data['client_price'],
            ]);
        } else {
            $statement = $pdo->prepare(
                'INSERT INTO technician_positions (name, cost, client_price) VALUES (:name, :cost, :client_price)'
            );
            $statement->execute([
                'name' => $data['name'],
                'cost' => $data['cost'],
                'client_price' => $data['client_price'],
            ]);
        }

        $id = (int) $pdo->lastInsertId();
        $position = fetchTechnicianPositionById($pdo, $id);

        logActivity($pdo, 'TECHNICIAN_POSITION_CREATE', [
            'position_id' => $id,
            'payload' => $data,
        ]);

        $pdo->commit();
        respond($position, 201);
    } catch (Throwable $error) {
        $pdo->rollBack();
        if ($error instanceof InvalidArgumentException) {
            throw $error;
        }
        throw new RuntimeException($error->getMessage(), 0, $error);
    }
}

function handleTechnicianPositionsUpdate(PDO $pdo): void
{
    requireRole(['manager', 'admin']);

    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid position id', 400);
        return;
    }

    [$data, $errors] = validateTechnicianPositionPayload(readJsonPayload(), true);

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
    $original = fetchTechnicianPositionById($pdo, $id);
    if (!$original) {
        respondError('Position not found', 404);
        return;
    }

    $supportsTranslations = technicianPositionsSupportsTranslations($pdo);

    $data = ensurePositionLabels($data, $original);

        if (isset($data['name'])) {
            $data['name'] = generatePositionSlug($data['name']);
            $duplicate = findTechnicianPositionByName($pdo, $data['name'], $id);
            if ($duplicate) {
                throw new InvalidArgumentException('A position with that name already exists');
            }
        }

    $fields = [];
    $params = ['id' => $id];

    foreach ($data as $column => $value) {
        if (!$supportsTranslations && ($column === 'label_ar' || $column === 'label_en')) {
            continue;
        }
        $fields[] = sprintf('%s = :%s', $column, $column);
        $params[$column] = $value;
    }

    if ($fields) {
        $sql = 'UPDATE technician_positions SET ' . implode(', ', $fields) . ' WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute($params);

        if ($statement->rowCount() === 0) {
            $existing = fetchTechnicianPositionById($pdo, $id);
            if (!$existing) {
                throw new InvalidArgumentException('Position not found');
            }
        }
    }

    $position = fetchTechnicianPositionById($pdo, $id);

        logActivity($pdo, 'TECHNICIAN_POSITION_UPDATE', [
            'position_id' => $id,
            'changes' => array_keys($data),
        ]);

        $pdo->commit();
        respond($position);
    } catch (Throwable $error) {
        $pdo->rollBack();
        if ($error instanceof InvalidArgumentException) {
            throw $error;
        }
        throw new RuntimeException($error->getMessage(), 0, $error);
    }
}

function handleTechnicianPositionsDelete(PDO $pdo): void
{
    requireRole('admin');

    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid position id', 400);
        return;
    }

    $statement = $pdo->prepare('DELETE FROM technician_positions WHERE id = :id');
    $statement->execute(['id' => $id]);

    if ($statement->rowCount() === 0) {
        respondError('Position not found', 404);
        return;
    }

    logActivity($pdo, 'TECHNICIAN_POSITION_DELETE', [
        'position_id' => $id,
    ]);

    respond(null);
}

function validateTechnicianPositionPayload(array $payload, bool $isUpdate): array
{
    $errors = [];

    $name = isset($payload['name']) ? trim((string) $payload['name']) : null;
    $cost = array_key_exists('cost', $payload) ? $payload['cost'] : null;
    $clientPrice = array_key_exists('client_price', $payload) ? $payload['client_price'] : null;
    $labelAr = array_key_exists('label_ar', $payload) ? trim((string) $payload['label_ar']) : null;
    $labelEn = array_key_exists('label_en', $payload) ? trim((string) $payload['label_en']) : null;

    if (!$isUpdate || array_key_exists('name', $payload)) {
        if ($name === null || $name === '') {
            $errors['name'] = 'Position name is required';
        } elseif (mb_strlen($name) > 150) {
            $errors['name'] = 'Position name is too long (max 150 characters)';
        }
    }

    if (!$isUpdate || array_key_exists('cost', $payload)) {
        if ($cost === null || $cost === '') {
            $errors['cost'] = 'Cost is required';
        } elseif (!is_numeric($cost)) {
            $errors['cost'] = 'Cost must be numeric';
        } elseif ((float) $cost < 0) {
            $errors['cost'] = 'Cost must be zero or greater';
        }
    }

    if (array_key_exists('client_price', $payload) && $clientPrice !== null && $clientPrice !== '') {
        if (!is_numeric($clientPrice)) {
            $errors['client_price'] = 'Client price must be numeric';
        } elseif ((float) $clientPrice < 0) {
            $errors['client_price'] = 'Client price must be zero or greater';
        }
    }

    if ($labelAr !== null && mb_strlen($labelAr) > 150) {
        $errors['label_ar'] = 'Arabic label is too long (max 150 characters)';
    }

    if ($labelEn !== null && mb_strlen($labelEn) > 150) {
        $errors['label_en'] = 'English label is too long (max 150 characters)';
    }

    $data = [];

    if ($errors) {
        return [$data, $errors];
    }

    if (!$isUpdate || array_key_exists('name', $payload)) {
        $data['name'] = $name;
    }

    if (!$isUpdate || array_key_exists('cost', $payload)) {
        $data['cost'] = $cost !== null ? (float) $cost : 0.0;
    }

    if (array_key_exists('client_price', $payload)) {
        if ($clientPrice === null || $clientPrice === '') {
            $data['client_price'] = null;
        } else {
            $data['client_price'] = (float) $clientPrice;
        }
    }

    if (array_key_exists('label_ar', $payload)) {
        $data['label_ar'] = $labelAr === '' ? null : $labelAr;
    }

    if (array_key_exists('label_en', $payload)) {
        $data['label_en'] = $labelEn === '' ? null : $labelEn;
    }

    return [$data, $errors];
}

function fetchTechnicianPositionById(PDO $pdo, int $id): ?array
{
    $statement = $pdo->prepare('SELECT * FROM technician_positions WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    $row = $statement->fetch();

    return $row ? mapTechnicianPositionRow($row) : null;
}

function findTechnicianPositionByName(PDO $pdo, string $name, ?int $excludeId = null): ?array
{
    $sql = 'SELECT * FROM technician_positions WHERE name = :name';
    $params = ['name' => $name];

    if ($excludeId) {
        $sql .= ' AND id <> :exclude_id';
        $params['exclude_id'] = $excludeId;
    }

    $sql .= ' LIMIT 1';

    $statement = $pdo->prepare($sql);
    $statement->execute($params);
    $row = $statement->fetch();

    return $row ? mapTechnicianPositionRow($row) : null;
}

function technicianPositionsSupportsTranslations(PDO $pdo): bool
{
    static $cache = null;
    if ($cache !== null) {
        return $cache;
    }

    try {
        $statement = $pdo->query("SHOW COLUMNS FROM technician_positions LIKE 'label_ar'");
        $cache = $statement && $statement->fetch() ? true : false;
    } catch (Throwable $error) {
        $cache = false;
    }

    return $cache;
}

function mapTechnicianPositionRow(array $row): array
{
    return [
        'id' => (int) ($row['id'] ?? 0),
        'name' => (string) ($row['name'] ?? ''),
        'label_ar' => array_key_exists('label_ar', $row) ? ($row['label_ar'] !== null ? (string) $row['label_ar'] : null) : null,
        'label_en' => array_key_exists('label_en', $row) ? ($row['label_en'] !== null ? (string) $row['label_en'] : null) : null,
        'cost' => (float) ($row['cost'] ?? 0),
        'client_price' => isset($row['client_price']) ? (float) $row['client_price'] : null,
        'created_at' => $row['created_at'] ?? null,
        'updated_at' => $row['updated_at'] ?? null,
    ];
}

function ensurePositionLabels(array $data, ?array $existing = null): array
{
    $labelAr = $data['label_ar'] ?? ($existing['label_ar'] ?? null);
    $labelEn = $data['label_en'] ?? ($existing['label_en'] ?? null);
    $base = $data['name'] ?? ($existing['name'] ?? '');

    if ($labelAr === null || $labelAr === '') {
        $labelAr = attemptTranslate($labelEn ?? $base, 'en', 'ar') ?? $labelAr;
    }

    if ($labelEn === null || $labelEn === '') {
        $labelEn = attemptTranslate($labelAr ?? $base, 'ar', 'en') ?? $labelEn;
    }

    if ($labelAr === null || $labelAr === '') {
        $labelAr = $base;
    }

    if ($labelEn === null || $labelEn === '') {
        $labelEn = $base;
    }

    $data['label_ar'] = trim(mb_substr($labelAr, 0, 150));
    $data['label_en'] = trim(mb_substr($labelEn, 0, 150));

    return $data;
}

function generatePositionSlug(string $value): string
{
    $value = trim(mb_strtolower($value));
    if ($value === '') {
        $value = uniqid('position-', true);
    }

    if (function_exists('iconv')) {
        $transliterated = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value);
        if ($transliterated !== false && $transliterated !== '') {
            $value = $transliterated;
        }
    }

    $value = preg_replace('/[^a-z0-9\-\s]+/i', '', $value) ?? $value;
    $value = preg_replace('/[\s_]+/', '-', $value) ?? $value;
    $value = trim($value, '-');

    return $value !== '' ? $value : uniqid('position-', true);
}

function attemptTranslate(?string $text, string $assumedSource, string $target): ?string
{
    $text = trim((string) $text);
    if ($text === '') {
        return null;
    }

    $detected = detectLanguage($text);
    if ($detected === $target) {
        return $text;
    }

    $source = $detected ?? $assumedSource;
    if ($source === $target) {
        return $text;
    }

    $translated = translateText($text, $source, $target);
    return $translated ?: null;
}

function detectLanguage(string $text): ?string
{
    if (preg_match('/\p{Arabic}/u', $text)) {
        return 'ar';
    }

    if (preg_match('/[a-z]/i', $text)) {
        return 'en';
    }

    return null;
}

function translateText(string $text, string $source, string $target): ?string
{
    if ($text === '' || $source === $target) {
        return $text;
    }

    $sourceParam = $source === '' ? 'auto' : $source;
    $url = 'https://api.mymemory.translated.net/get?q=' . rawurlencode($text) . '&langpair=' . $sourceParam . '|' . $target;

    $response = httpRequest($url);
    if (!$response) {
        return null;
    }

    $decoded = json_decode($response, true);
    $translated = $decoded['responseData']['translatedText'] ?? null;
    if (!is_string($translated) || trim($translated) === '') {
        return null;
    }

    return trim($translated);
}

function httpRequest(string $url): ?string
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_USERAGENT, 'ArtRatioApp/1.0');
        $body = curl_exec($ch);
        curl_close($ch);
        return $body === false ? null : $body;
    }

    $context = stream_context_create([
        'http' => [
            'timeout' => 5,
            'header' => 'User-Agent: ArtRatioApp/1.0' . "\r\n",
        ],
    ]);

    $body = @file_get_contents($url, false, $context);
    return $body === false ? null : $body;
}
