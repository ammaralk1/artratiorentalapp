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

        respond([
            'ok' => true,
            'data' => $customer,
        ]);
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
    $customers = $statement->fetchAll();

    respond([
        'ok' => true,
        'data' => $customers,
        'meta' => [
            'limit' => $limit,
            'offset' => $offset,
            'count' => count($customers),
        ],
    ]);
}

function handleCreateCustomer(PDO $pdo): void
{
    $payload = readJsonPayload();
    [$data, $errors] = validateCustomerPayload($payload, false);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $sql = 'INSERT INTO customers (full_name, phone, email, address, company, notes) VALUES (:full_name, :phone, :email, :address, :company, :notes)';
    $statement = $pdo->prepare($sql);
    $statement->execute($data);

    $newId = (int) $pdo->lastInsertId();

    $statement = $pdo->prepare('SELECT * FROM customers WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $newId]);
    $customer = $statement->fetch();

    respond([
        'ok' => true,
        'data' => $customer,
    ], 201);
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

    respond([
        'ok' => true,
        'data' => $customer,
    ]);
}

function handleDeleteCustomer(PDO $pdo): void
{
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

    respond([
        'ok' => true,
    ]);
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

    $data = [];

    if ($errors) {
        return [$data, $errors];
    }

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

    return [$data, $errors];
}
