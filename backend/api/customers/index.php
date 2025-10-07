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
            handleGetCustomers($pdo);
            break;
        case 'POST':
            handleCreateCustomer($pdo);
            break;
        case 'PUT':
        case 'PATCH':
            handleUpdateCustomer($pdo);
            break;
        case 'DELETE':
            handleDeleteCustomer($pdo);
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

function handleGetCustomers(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;

    if ($id) {
        $statement = $pdo->prepare('SELECT * FROM customers WHERE id = :id LIMIT 1');
        $statement->execute(['id' => $id]);
        $customer = $statement->fetch();

        if (!$customer) {
            respondError('Customer not found', 404);
            return;
        }

        respond(formatCustomerRecord($customer));
        return;
    }

    $search = trim($_GET['search'] ?? '');
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

    if ($limit < 1 || $limit > 200) {
        $limit = 50;
    }

    if ($offset < 0) {
        $offset = 0;
    }

    $params = [];
    $where = '';

    if ($search !== '') {
        $params['search'] = '%' . $search . '%';
        $where = 'WHERE full_name LIKE :search OR phone LIKE :search OR company LIKE :search';
    }

    $query = sprintf(
        'SELECT * FROM customers %s ORDER BY created_at DESC LIMIT %d OFFSET %d',
        $where,
        $limit,
        $offset
    );

    $statement = $pdo->prepare($query);

    foreach ($params as $key => $value) {
        $statement->bindValue(':' . $key, $value, PDO::PARAM_STR);
    }

    $statement->execute();
    $customers = array_map('formatCustomerRecord', $statement->fetchAll());

    respond(
        $customers,
        200,
        [
            'limit' => $limit,
            'offset' => $offset,
            'count' => count($customers),
        ]
    );
}

function handleCreateCustomer(PDO $pdo): void
{
    $payload = readJsonPayload();
    [$data, $errors] = validateCustomerPayload($payload, false);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $columns = array_keys($data);
    $placeholders = array_map(static fn($column) => ':' . $column, $columns);

    $sql = sprintf(
        'INSERT INTO customers (%s) VALUES (%s)',
        implode(', ', $columns),
        implode(', ', $placeholders)
    );

    $statement = $pdo->prepare($sql);
    $statement->execute($data);

    $newId = (int) $pdo->lastInsertId();

    $statement = $pdo->prepare('SELECT * FROM customers WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $newId]);
    $customer = $statement->fetch();

    logActivity($pdo, 'CUSTOMER_CREATE', [
        'customer_id' => $newId,
        'payload' => $data,
    ]);

    respond(formatCustomerRecord($customer), 201);
}

function handleUpdateCustomer(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid customer id', 400);
        return;
    }

    $payload = readJsonPayload();
    [$data, $errors] = validateCustomerPayload($payload, true);

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

    $sql = 'UPDATE customers SET ' . implode(', ', $fields) . ' WHERE id = :id';
    $statement = $pdo->prepare($sql);
    $statement->execute($data);

    if ($statement->rowCount() === 0) {
        $check = $pdo->prepare('SELECT id FROM customers WHERE id = :id LIMIT 1');
        $check->execute(['id' => $id]);
        if (!$check->fetch()) {
            respondError('Customer not found', 404);
            return;
        }
    }

    $statement = $pdo->prepare('SELECT * FROM customers WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    $customer = $statement->fetch();

    $changedColumns = array_values(array_filter(array_keys($data), static fn($column) => $column !== 'id'));

    logActivity($pdo, 'CUSTOMER_UPDATE', [
        'customer_id' => $id,
        'changes' => $changedColumns,
    ]);

    respond(formatCustomerRecord($customer));
}

function handleDeleteCustomer(PDO $pdo): void
{
    requireRole('admin');
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid customer id', 400);
        return;
    }

    $statement = $pdo->prepare('DELETE FROM customers WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);

    if ($statement->rowCount() === 0) {
        respondError('Customer not found', 404);
        return;
    }

    logActivity($pdo, 'CUSTOMER_DELETE', [
        'customer_id' => $id,
    ]);

    respond(null);
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

function validateCustomerPayload(array $payload, bool $isUpdate): array
{
    $errors = [];

    $fullName = isset($payload['full_name']) ? trim((string) $payload['full_name']) : null;
    $phone = isset($payload['phone']) ? trim((string) $payload['phone']) : null;
    $email = isset($payload['email']) ? trim((string) $payload['email']) : null;
    $address = isset($payload['address']) ? trim((string) $payload['address']) : null;
    $company = isset($payload['company']) ? trim((string) $payload['company']) : null;
    $notes = isset($payload['notes']) ? trim((string) $payload['notes']) : null;

    $taxId = null;
    foreach (['tax_id', 'taxId', 'vat_number', 'vatNumber', 'taxNumber'] as $taxKey) {
        if (array_key_exists($taxKey, $payload)) {
            $value = $payload[$taxKey];
            $taxId = $value === null ? null : trim((string) $value);
            break;
        }
    }

    if (!$isUpdate || array_key_exists('full_name', $payload)) {
        if ($fullName === null || $fullName === '') {
            $errors['full_name'] = 'Full name is required';
        } elseif (mb_strlen($fullName) > 150) {
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
            $errors['email'] = 'Email format is invalid';
        }
    }

    if ($address !== null && mb_strlen($address) > 255) {
        $errors['address'] = 'Address is too long (max 255 characters)';
    }

    if ($company !== null && mb_strlen($company) > 150) {
        $errors['company'] = 'Company is too long (max 150 characters)';
    }

    if ($taxId !== null && $taxId !== '' && mb_strlen($taxId) > 128) {
        $errors['tax_id'] = 'Tax/VAT number is too long (max 128 characters)';
    }

    $documentColumns = normalizeDocumentPayload($payload, $isUpdate, $errors);

    if ($errors) {
        return [[], $errors];
    }

    $data = [];

    if (!$isUpdate || array_key_exists('full_name', $payload)) {
        $data['full_name'] = $fullName;
    }

    if (!$isUpdate || array_key_exists('phone', $payload)) {
        $data['phone'] = $phone;
    }

    if (!$isUpdate || array_key_exists('email', $payload)) {
        $data['email'] = $email ?: null;
    }

    if (!$isUpdate || array_key_exists('address', $payload)) {
        $data['address'] = $address ?: null;
    }

    if (!$isUpdate || array_key_exists('company', $payload)) {
        $data['company'] = $company ?: null;
    }

    if (!$isUpdate || array_key_exists('notes', $payload)) {
        $data['notes'] = $notes ?: null;
    }

    $taxRequested = array_key_exists('tax_id', $payload)
        || array_key_exists('taxId', $payload)
        || array_key_exists('vat_number', $payload)
        || array_key_exists('vatNumber', $payload)
        || array_key_exists('taxNumber', $payload);

    if (!$isUpdate || $taxRequested) {
        $data['tax_id'] = $taxId !== '' ? $taxId : null;
    }

    if ($documentColumns !== null) {
        $data = array_merge($data, $documentColumns);
    } elseif (!$isUpdate) {
        $data = array_merge($data, buildDocumentColumnDefaults());
    }

    return [$data, $errors];
}

function normalizeDocumentPayload(array $payload, bool $isUpdate, array &$errors): ?array
{
    $documentProvided = false;
    $documentInput = null;

    if (array_key_exists('document', $payload)) {
        $documentProvided = true;
        $documentInput = $payload['document'];

        if ($documentInput === null) {
            return buildDocumentColumnDefaults();
        }

        if (!is_array($documentInput)) {
            $errors['document'] = 'Document payload must be an object';
            return null;
        }
    } else {
        $documentInput = [
            'url' => $payload['document_url'] ?? $payload['documentUrl'] ?? null,
            'path' => $payload['document_path'] ?? $payload['documentPath'] ?? null,
            'mimeType' => $payload['document_mime_type'] ?? $payload['documentMimeType'] ?? null,
            'fileName' => $payload['document_file_name'] ?? $payload['documentFileName'] ?? null,
            'size' => $payload['document_size'] ?? $payload['documentSize'] ?? null,
        ];

        foreach ($documentInput as $value) {
            if (!in_array($value, [null, ''], true)) {
                $documentProvided = true;
                break;
            }
        }
    }

    if (!$documentProvided) {
        return $isUpdate ? null : buildDocumentColumnDefaults();
    }

    if ($documentInput === null) {
        return buildDocumentColumnDefaults();
    }

    $url = '';
    foreach (['url', 'document_url', 'href', 'link'] as $candidate) {
        if (isset($documentInput[$candidate]) && $documentInput[$candidate] !== null) {
            $url = trim((string) $documentInput[$candidate]);
            break;
        }
    }

    $path = '';
    foreach (['path', 'document_path'] as $candidate) {
        if (isset($documentInput[$candidate]) && $documentInput[$candidate] !== null) {
            $path = trim((string) $documentInput[$candidate]);
            break;
        }
    }

    $mimeType = '';
    foreach (['mimeType', 'document_mime_type', 'contentType', 'type'] as $candidate) {
        if (isset($documentInput[$candidate]) && $documentInput[$candidate] !== null) {
            $mimeType = trim((string) $documentInput[$candidate]);
            break;
        }
    }

    $fileName = '';
    foreach (['fileName', 'document_file_name', 'filename', 'name'] as $candidate) {
        if (isset($documentInput[$candidate]) && $documentInput[$candidate] !== null) {
            $fileName = trim((string) $documentInput[$candidate]);
            break;
        }
    }

    $sizeRaw = $documentInput['size'] ?? $documentInput['document_size'] ?? null;
    $documentSize = null;

    if ($sizeRaw !== null && $sizeRaw !== '') {
        if (is_int($sizeRaw)) {
            if ($sizeRaw < 0) {
                $errors['document_size'] = 'Document size must be zero or a positive integer';
            } else {
                $documentSize = $sizeRaw;
            }
        } elseif (is_float($sizeRaw)) {
            if ($sizeRaw < 0) {
                $errors['document_size'] = 'Document size must be zero or a positive integer';
            } else {
                $documentSize = (int) floor($sizeRaw);
            }
        } elseif (is_string($sizeRaw)) {
            $trimmed = trim($sizeRaw);
            if ($trimmed === '') {
                $documentSize = null;
            } elseif (ctype_digit($trimmed)) {
                $documentSize = (int) $trimmed;
            } else {
                $errors['document_size'] = 'Document size must be zero or a positive integer';
            }
        } else {
            $errors['document_size'] = 'Document size must be zero or a positive integer';
        }
    }

    $hasMetaWithoutUrl = ($path !== '' || $mimeType !== '' || $fileName !== '' || $documentSize !== null);

    if ($url === '') {
        if ($hasMetaWithoutUrl) {
            $errors['document_url'] = 'Document URL is required when providing document metadata';
            return null;
        }

        return buildDocumentColumnDefaults();
    }

    if (!preg_match('/^(https?:\/\/|data:|blob:)/i', $url)) {
        $errors['document_url'] = 'Document URL must start with http(s), data:, or blob:';
    }

    if ($path !== '' && mb_strlen($path) > 512) {
        $errors['document_path'] = 'Document path is too long (max 512 characters)';
    }

    if ($mimeType !== '' && mb_strlen($mimeType) > 128) {
        $errors['document_mime_type'] = 'Document MIME type is too long (max 128 characters)';
    }

    if ($fileName !== '' && mb_strlen($fileName) > 255) {
        $errors['document_file_name'] = 'Document file name is too long (max 255 characters)';
    }

    if ($documentSize !== null && $documentSize < 0) {
        $errors['document_size'] = 'Document size must be zero or a positive integer';
    }

    if ($errors) {
        return null;
    }

    return [
        'document_url' => $url,
        'document_path' => $path !== '' ? $path : null,
        'document_mime_type' => $mimeType !== '' ? $mimeType : null,
        'document_file_name' => $fileName !== '' ? $fileName : null,
        'document_size' => $documentSize,
    ];
}

function buildDocumentColumnDefaults(): array
{
    return [
        'document_url' => null,
        'document_path' => null,
        'document_mime_type' => null,
        'document_file_name' => null,
        'document_size' => null,
    ];
}

function formatCustomerRecord($customer)
{
    if (!is_array($customer)) {
        return $customer;
    }

    $document = buildCustomerDocumentFromRow($customer);
    $customer['document'] = $document;

    return $customer;
}

function buildCustomerDocumentFromRow(array $row): ?array
{
    $url = isset($row['document_url']) ? trim((string) $row['document_url']) : '';
    $path = isset($row['document_path']) ? trim((string) $row['document_path']) : '';
    $mimeType = isset($row['document_mime_type']) ? trim((string) $row['document_mime_type']) : '';
    $fileName = isset($row['document_file_name']) ? trim((string) $row['document_file_name']) : '';
    $sizeRaw = $row['document_size'] ?? null;

    $size = null;
    if ($sizeRaw !== null && $sizeRaw !== '') {
        if (is_int($sizeRaw)) {
            $size = $sizeRaw;
        } elseif (is_numeric($sizeRaw)) {
            $size = (int) $sizeRaw;
        }
    }

    $hasValues = ($url !== '' || $path !== '' || $mimeType !== '' || $fileName !== '' || $size !== null);

    if (!$hasValues) {
        return null;
    }

    $document = [
        'url' => $url !== '' ? $url : null,
        'path' => $path !== '' ? $path : null,
        'mimeType' => $mimeType !== '' ? $mimeType : null,
        'fileName' => $fileName !== '' ? $fileName : null,
        'size' => $size,
    ];

    if ($document['url'] && stripos((string) $document['url'], 'sirv.com') !== false) {
        $document['source'] = 'sirv';
    }

    return $document;
}
