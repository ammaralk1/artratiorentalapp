<?php
declare(strict_types=1);

define('API_INCLUDE_MODE', true);
require_once __DIR__ . '/index.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = getDatabaseConnection();
    requireRole(['admin', 'manager']);

    ensureEquipmentRequestTables($pdo);
    ensureEquipmentRequestMessagesTable($pdo);

    switch ($method) {
        case 'GET':
            handleEquipmentRequestsAdminGet($pdo);
            break;
        case 'PATCH':
        case 'PUT':
            handleEquipmentRequestsAdminPatch($pdo);
            break;
        case 'POST':
            handleEquipmentRequestsAdminPost($pdo);
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

function handleEquipmentRequestsAdminGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    if ($id > 0) {
        $details = fetchEquipmentRequestDetails($pdo, $id);
        if (!$details) {
            respondError('Request not found', 404);
            return;
        }
        respond($details);
        return;
    }

    $status = normalizeAdminRequestStatus((string) ($_GET['status'] ?? ''));
    $search = trim((string) ($_GET['search'] ?? ''));
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 50;
    $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

    if ($limit < 1) {
        $limit = 50;
    } elseif ($limit > 200) {
        $limit = 200;
    }

    if ($offset < 0) {
        $offset = 0;
    }

    $where = [];
    $params = [];

    if ($status !== '') {
        $where[] = 'r.status = :status';
        $params['status'] = $status;
    }

    if ($search !== '') {
        $where[] = '(r.request_code LIKE :search OR r.customer_name LIKE :search OR r.customer_email LIKE :search OR r.customer_phone LIKE :search)';
        $params['search'] = '%' . $search . '%';
    }

    $whereClause = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

    $countQuery = 'SELECT COUNT(*) FROM equipment_requests r ' . $whereClause;
    $countStatement = $pdo->prepare($countQuery);
    foreach ($params as $key => $value) {
        $countStatement->bindValue(':' . $key, $value);
    }
    $countStatement->execute();
    $total = (int) $countStatement->fetchColumn();

    $query = sprintf(
        'SELECT
            r.id,
            r.request_code,
            r.customer_name,
            r.customer_email,
            r.customer_phone,
            r.status,
            r.total_items,
            r.created_at,
            r.updated_at,
            (
                SELECT MAX(m.created_at)
                FROM equipment_request_messages m
                WHERE m.request_id = r.id
            ) AS last_message_at,
            (
                SELECT COUNT(*)
                FROM equipment_request_messages m2
                WHERE m2.request_id = r.id
            ) AS messages_count
         FROM equipment_requests r
         %s
         ORDER BY r.created_at DESC
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
    $rows = $statement->fetchAll() ?: [];

    respond($rows, 200, [
        'count' => count($rows),
        'total' => $total,
        'limit' => $limit,
        'offset' => $offset,
    ]);
}

function handleEquipmentRequestsAdminPatch(PDO $pdo): void
{
    $payload = readEquipmentRequestJsonPayload();
    $id = isset($payload['id']) ? (int) $payload['id'] : 0;
    $status = normalizeAdminRequestStatus((string) ($payload['status'] ?? ''));

    if ($id <= 0) {
        throw new InvalidArgumentException('Valid request id is required');
    }
    if ($status === '') {
        throw new InvalidArgumentException('Valid status is required');
    }

    $statement = $pdo->prepare(
        'UPDATE equipment_requests
         SET status = :status, updated_at = CURRENT_TIMESTAMP
         WHERE id = :id'
    );
    $statement->execute([
        'status' => $status,
        'id' => $id,
    ]);

    if ($statement->rowCount() === 0) {
        $exists = $pdo->prepare('SELECT id FROM equipment_requests WHERE id = :id LIMIT 1');
        $exists->execute(['id' => $id]);
        if (!$exists->fetchColumn()) {
            respondError('Request not found', 404);
            return;
        }
    }

    $statusLabel = mapAdminStatusLabel($status);
    $user = getAuthenticatedUser();
    $systemMessage = sprintf(
        'Status changed to "%s" by %s.',
        $statusLabel,
        (string) ($user['username'] ?? 'system')
    );
    insertEquipmentRequestMessage($pdo, [
        'request_id' => $id,
        'sender_user_id' => (int) ($user['id'] ?? 0) ?: null,
        'channel' => 'system',
        'subject' => 'Status update',
        'message' => $systemMessage,
        'recipient' => null,
        'delivery_status' => 'sent',
        'provider' => 'internal',
        'error_message' => null,
    ]);

    $details = fetchEquipmentRequestDetails($pdo, $id);
    respond($details);
}

function handleEquipmentRequestsAdminPost(PDO $pdo): void
{
    $payload = readEquipmentRequestJsonPayload();
    $action = strtolower(trim((string) ($payload['action'] ?? '')));

    if ($action !== 'send_message') {
        throw new InvalidArgumentException('Unsupported action');
    }

    $id = isset($payload['id']) ? (int) $payload['id'] : 0;
    if ($id <= 0) {
        throw new InvalidArgumentException('Valid request id is required');
    }

    $request = fetchEquipmentRequestRow($pdo, $id);
    if (!$request) {
        respondError('Request not found', 404);
        return;
    }

    $subject = normalizeEquipmentRequestText((string) ($payload['subject'] ?? ''), 255);
    $message = normalizeEquipmentRequestMultiline((string) ($payload['message'] ?? ''), 5000);
    if ($message === '') {
        throw new InvalidArgumentException('Message is required');
    }

    if ($subject === '') {
        $subject = sprintf('Update for request %s', (string) ($request['request_code'] ?? '#'));
    }

    $recipient = trim((string) ($request['customer_email'] ?? ''));
    if ($recipient === '' || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('Customer email is missing or invalid');
    }

    $html = '<p>' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>'
        . '<hr>'
        . '<p><strong>Request:</strong> ' . htmlspecialchars((string) ($request['request_code'] ?? ''), ENT_QUOTES, 'UTF-8') . '</p>'
        . '<p><strong>Customer:</strong> ' . htmlspecialchars((string) ($request['customer_name'] ?? ''), ENT_QUOTES, 'UTF-8') . '</p>';

    $sent = sendEmail(
        $recipient,
        (string) ($request['customer_name'] ?? 'Customer'),
        $subject,
        $html,
        $message
    );
    $provider = 'smtp';
    $errorMessage = null;

    if (!$sent) {
        $sent = sendEquipmentRequestViaWeb3Forms(
            $subject,
            (string) ($request['customer_name'] ?? 'Customer'),
            $recipient,
            (string) ($request['customer_phone'] ?? ''),
            $message
        );
        $provider = $sent ? 'web3forms' : 'none';
        if (!$sent) {
            $errorMessage = emailGetLastError() ?? 'Failed to send message';
        }
    }

    $user = getAuthenticatedUser();
    insertEquipmentRequestMessage($pdo, [
        'request_id' => $id,
        'sender_user_id' => (int) ($user['id'] ?? 0) ?: null,
        'channel' => 'email',
        'subject' => $subject,
        'message' => $message,
        'recipient' => $recipient,
        'delivery_status' => $sent ? 'sent' : 'failed',
        'provider' => $provider,
        'error_message' => $errorMessage,
    ]);

    $details = fetchEquipmentRequestDetails($pdo, $id);
    respond([
        'sent' => $sent,
        'provider' => $provider,
        'details' => $details,
    ]);
}

function fetchEquipmentRequestDetails(PDO $pdo, int $id): ?array
{
    $request = fetchEquipmentRequestRow($pdo, $id);
    if (!$request) {
        return null;
    }

    $itemsStatement = $pdo->prepare(
        'SELECT id, item_key, name, image_url, category, subcategory, qty, created_at
         FROM equipment_request_items
         WHERE request_id = :request_id
         ORDER BY id ASC'
    );
    $itemsStatement->execute(['request_id' => $id]);
    $items = $itemsStatement->fetchAll() ?: [];

    $messagesStatement = $pdo->prepare(
        'SELECT id, request_id, sender_user_id, channel, subject, message, recipient, delivery_status, provider, error_message, created_at
         FROM equipment_request_messages
         WHERE request_id = :request_id
         ORDER BY created_at DESC, id DESC'
    );
    $messagesStatement->execute(['request_id' => $id]);
    $messages = $messagesStatement->fetchAll() ?: [];

    return [
        'request' => $request,
        'items' => $items,
        'messages' => $messages,
    ];
}

function fetchEquipmentRequestRow(PDO $pdo, int $id): ?array
{
    $statement = $pdo->prepare(
        'SELECT id, request_code, customer_name, customer_email, customer_phone, notes, status, total_items, request_lang, created_at, updated_at
         FROM equipment_requests
         WHERE id = :id
         LIMIT 1'
    );
    $statement->execute(['id' => $id]);
    $row = $statement->fetch();
    return $row ?: null;
}

function insertEquipmentRequestMessage(PDO $pdo, array $payload): void
{
    $statement = $pdo->prepare(
        'INSERT INTO equipment_request_messages (
            request_id,
            sender_user_id,
            channel,
            subject,
            message,
            recipient,
            delivery_status,
            provider,
            error_message
         ) VALUES (
            :request_id,
            :sender_user_id,
            :channel,
            :subject,
            :message,
            :recipient,
            :delivery_status,
            :provider,
            :error_message
         )'
    );

    $statement->execute([
        'request_id' => (int) ($payload['request_id'] ?? 0),
        'sender_user_id' => $payload['sender_user_id'] ?? null,
        'channel' => (string) ($payload['channel'] ?? 'system'),
        'subject' => (string) ($payload['subject'] ?? '') !== '' ? (string) $payload['subject'] : null,
        'message' => (string) ($payload['message'] ?? ''),
        'recipient' => (string) ($payload['recipient'] ?? '') !== '' ? (string) $payload['recipient'] : null,
        'delivery_status' => (string) ($payload['delivery_status'] ?? 'pending'),
        'provider' => (string) ($payload['provider'] ?? '') !== '' ? (string) $payload['provider'] : null,
        'error_message' => (string) ($payload['error_message'] ?? '') !== '' ? (string) $payload['error_message'] : null,
    ]);
}

function ensureEquipmentRequestMessagesTable(PDO $pdo): void
{
    static $ensured = false;
    if ($ensured) {
        return;
    }

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS equipment_request_messages (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            request_id BIGINT UNSIGNED NOT NULL,
            sender_user_id BIGINT UNSIGNED NULL,
            channel ENUM('email','system') NOT NULL DEFAULT 'email',
            subject VARCHAR(255) NULL,
            message TEXT NOT NULL,
            recipient VARCHAR(190) NULL,
            delivery_status ENUM('sent','failed','pending') NOT NULL DEFAULT 'pending',
            provider VARCHAR(50) NULL,
            error_message VARCHAR(500) NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY idx_equipment_request_messages_request (request_id),
            KEY idx_equipment_request_messages_created (created_at),
            CONSTRAINT fk_equipment_request_messages_request
                FOREIGN KEY (request_id) REFERENCES equipment_requests(id)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $ensured = true;
}

function normalizeAdminRequestStatus(string $status): string
{
    $status = strtolower(trim($status));
    $allowed = ['pending', 'confirmed', 'cancelled'];
    return in_array($status, $allowed, true) ? $status : '';
}

function mapAdminStatusLabel(string $status): string
{
    return match ($status) {
        'confirmed' => 'confirmed',
        'cancelled' => 'cancelled',
        default => 'pending',
    };
}
