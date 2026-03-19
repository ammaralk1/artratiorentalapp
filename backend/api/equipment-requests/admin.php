<?php
declare(strict_types=1);

define('API_INCLUDE_MODE', true);
require_once __DIR__ . '/index.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = getDatabaseConnection();
    requireRole(['admin', 'manager']);

    ensureEquipmentRequestTables($pdo);
    ensureEquipmentRequestItemStatusColumns($pdo);
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
    $statusNote = normalizeEquipmentRequestMultiline((string) ($payload['status_note'] ?? ''), 1200);
    $itemUpdates = extractAdminItemUpdatesFromPayload($payload);

    if ($id <= 0) {
        throw new InvalidArgumentException('Valid request id is required');
    }
    if ($status === '') {
        throw new InvalidArgumentException('Valid status is required');
    }

    $requestBefore = fetchEquipmentRequestRow($pdo, $id);
    if (!$requestBefore) {
        respondError('Request not found', 404);
        return;
    }
    $previousStatus = strtolower((string) ($requestBefore['status'] ?? 'pending'));
    $itemUpdateSummary = applyEquipmentRequestItemUpdates($pdo, $id, $itemUpdates);
    $hasItemUpdates = ((int) ($itemUpdateSummary['updated_count'] ?? 0)) > 0;

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
    if ($statusNote !== '') {
        $systemMessage .= ' Note: ' . $statusNote;
    }
    if ($hasItemUpdates) {
        $systemMessage .= sprintf(
            ' Item-level updates applied: %d (unavailable: %d).',
            (int) ($itemUpdateSummary['updated_count'] ?? 0),
            (int) ($itemUpdateSummary['unavailable_count'] ?? 0)
        );
    }
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
    if (!$details || !is_array($details)) {
        respondError('Request not found', 404);
        return;
    }

    $statusChanged = $previousStatus !== $status;
    $statusEmailLogged = false;
    $statusEmailResult = [
        'attempted' => false,
        'sent' => false,
        'provider' => 'none',
        'recipient' => '',
        'subject' => '',
        'message' => '',
        'error' => null,
    ];
    // Customer status email is expected on every admin status action, even if status value did not change.
    $statusEmailResult = sendEquipmentRequestStatusUpdateToCustomer(
        (array) ($details['request'] ?? []),
        is_array($details['items'] ?? null) ? $details['items'] : [],
        $status,
        $statusNote
    );

    if (!empty($statusEmailResult['attempted'])) {
        try {
            insertEquipmentRequestMessage($pdo, [
                'request_id' => $id,
                'sender_user_id' => (int) ($user['id'] ?? 0) ?: null,
                'channel' => 'email',
                'subject' => (string) ($statusEmailResult['subject'] ?? ''),
                'message' => (string) ($statusEmailResult['message'] ?? ''),
                'recipient' => (string) ($statusEmailResult['recipient'] ?? ''),
                'delivery_status' => !empty($statusEmailResult['sent']) ? 'sent' : 'failed',
                'provider' => (string) ($statusEmailResult['provider'] ?? 'none'),
                'error_message' => (string) ($statusEmailResult['error'] ?? ''),
            ]);
            $statusEmailLogged = true;
            $details = fetchEquipmentRequestDetails($pdo, $id) ?: $details;
        } catch (Throwable $emailLogError) {
            error_log('Equipment request status email log failure: ' . $emailLogError->getMessage());
        }
    }

    respond($details, 200, [
        'status_email_attempted' => (bool) ($statusEmailResult['attempted'] ?? false),
        'status_email_sent' => (bool) ($statusEmailResult['sent'] ?? false),
        'status_email_provider' => (string) ($statusEmailResult['provider'] ?? 'none'),
        'status_email_recipient' => (string) ($statusEmailResult['recipient'] ?? ''),
        'status_email_error' => (string) ($statusEmailResult['error'] ?? ''),
        'status_email_logged' => $statusEmailLogged,
        'status_changed' => $statusChanged,
        'item_updates_applied' => (int) ($itemUpdateSummary['updated_count'] ?? 0),
        'item_unavailable_count' => (int) ($itemUpdateSummary['unavailable_count'] ?? 0),
    ]);
}

function handleEquipmentRequestsAdminPost(PDO $pdo): void
{
    $payload = readEquipmentRequestJsonPayload();
    $action = strtolower(trim((string) ($payload['action'] ?? '')));

    if ($action === 'retry_email') {
        handleEquipmentRequestsAdminRetryEmail($pdo, $payload);
        return;
    }

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

    $isArabic = strtolower((string) ($request['request_lang'] ?? 'ar')) !== 'en';
    $body = '<div' . ($isArabic ? ' dir="rtl"' : '') . ' style="font-family:' . ($isArabic ? 'Tahoma,Arial,sans-serif' : 'Arial,sans-serif') . ';line-height:1.8;">'
        . '<p>' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>'
        . '<hr>'
        . '<p><strong>Request:</strong> ' . htmlspecialchars((string) ($request['request_code'] ?? ''), ENT_QUOTES, 'UTF-8') . '</p>'
        . '<p><strong>Customer:</strong> ' . htmlspecialchars((string) ($request['customer_name'] ?? ''), ENT_QUOTES, 'UTF-8') . '</p>'
        . buildEquipmentRequestClosingHtml($isArabic)
        . '</div>';
    $html = buildEquipmentRequestEmailShellHtml($body, $isArabic, 'Equipment Request Message');

    $sendResult = sendEquipmentRequestEmailWithRetry(
        $recipient,
        (string) ($request['customer_name'] ?? 'Customer'),
        $subject,
        $html,
        $message
    );
    $sent = !empty($sendResult['sent']);
    $provider = (string) ($sendResult['provider'] ?? 'none');
    $errorMessage = $sent ? null : (string) ($sendResult['error'] ?? '');

    if (!$sent && $errorMessage === '') {
        $errorMessage = emailGetLastError() ?? 'Failed to send message';
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

function handleEquipmentRequestsAdminRetryEmail(PDO $pdo, array $payload): void
{
    $id = isset($payload['id']) ? (int) $payload['id'] : 0;
    $messageId = isset($payload['message_id']) ? (int) $payload['message_id'] : 0;

    if ($id <= 0) {
        throw new InvalidArgumentException('Valid request id is required');
    }
    if ($messageId <= 0) {
        throw new InvalidArgumentException('Valid message id is required');
    }

    $request = fetchEquipmentRequestRow($pdo, $id);
    if (!$request) {
        respondError('Request not found', 404);
        return;
    }

    $messageStatement = $pdo->prepare(
        'SELECT id, request_id, channel, subject, message, recipient
         FROM equipment_request_messages
         WHERE id = :id AND request_id = :request_id
         LIMIT 1'
    );
    $messageStatement->execute([
        'id' => $messageId,
        'request_id' => $id,
    ]);
    $messageRow = $messageStatement->fetch();
    if (!$messageRow) {
        respondError('Message not found', 404);
        return;
    }

    $channel = strtolower((string) ($messageRow['channel'] ?? ''));
    if ($channel !== 'email') {
        throw new InvalidArgumentException('Only email messages can be retried');
    }

    $recipient = trim((string) ($messageRow['recipient'] ?? ''));
    if ($recipient === '' || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('Message recipient is missing or invalid');
    }

    $customerName = (string) ($request['customer_name'] ?? 'Customer');
    $customerPhone = (string) ($request['customer_phone'] ?? '');
    $requestCode = (string) ($request['request_code'] ?? '#');
    $subject = normalizeEquipmentRequestText((string) ($messageRow['subject'] ?? ''), 255);
    if ($subject === '') {
        $subject = sprintf('Update for request %s', $requestCode);
    }

    $message = normalizeEquipmentRequestMultiline((string) ($messageRow['message'] ?? ''), 5000);
    if ($message === '') {
        $message = sprintf('Follow-up update for request %s', $requestCode);
    }

    $html = '<p>' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>'
        . '<hr>'
        . '<p><strong>Request:</strong> ' . htmlspecialchars($requestCode, ENT_QUOTES, 'UTF-8') . '</p>'
        . '<p><strong>Customer:</strong> ' . htmlspecialchars($customerName, ENT_QUOTES, 'UTF-8') . '</p>';

    $sendResult = sendEquipmentRequestEmailWithRetry(
        $recipient,
        $customerName,
        $subject,
        $html,
        $message
    );

    $sent = !empty($sendResult['sent']);
    $provider = (string) ($sendResult['provider'] ?? 'none');
    $errorMessage = $sent ? null : (string) ($sendResult['error'] ?? '');

    if (!$sent && $errorMessage === '') {
        $errorMessage = emailGetLastError() ?? 'Failed to resend email';
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
        'error' => $errorMessage,
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
        'SELECT id, item_key, name, image_url, category, subcategory, qty, item_status, item_status_note, created_at
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

function extractAdminItemUpdatesFromPayload(array $payload): array
{
    $rawUpdates = $payload['item_updates'] ?? null;
    if (!is_array($rawUpdates)) {
        return [];
    }

    $updatesById = [];
    foreach ($rawUpdates as $entry) {
        if (!is_array($entry)) {
            continue;
        }

        $itemId = (int) ($entry['id'] ?? 0);
        if ($itemId <= 0) {
            continue;
        }

        $status = normalizeEquipmentRequestItemStatus((string) ($entry['status'] ?? $entry['item_status'] ?? 'pending'));
        $note = normalizeEquipmentRequestMultiline((string) ($entry['note'] ?? $entry['item_status_note'] ?? ''), 500);

        $updatesById[$itemId] = [
            'id' => $itemId,
            'item_status' => $status,
            'item_status_note' => $note,
        ];
    }

    return array_values($updatesById);
}

function applyEquipmentRequestItemUpdates(PDO $pdo, int $requestId, array $itemUpdates): array
{
    if ($requestId <= 0 || !$itemUpdates) {
        return [
            'updated_count' => 0,
            'unavailable_count' => 0,
        ];
    }

    $existingStatement = $pdo->prepare(
        'SELECT id, item_status, item_status_note
         FROM equipment_request_items
         WHERE request_id = :request_id'
    );
    $existingStatement->execute([
        'request_id' => $requestId,
    ]);
    $existingRows = $existingStatement->fetchAll() ?: [];
    if (!$existingRows) {
        return [
            'updated_count' => 0,
            'unavailable_count' => 0,
        ];
    }

    $existingById = [];
    foreach ($existingRows as $row) {
        $existingById[(int) ($row['id'] ?? 0)] = $row;
    }

    $updateStatement = $pdo->prepare(
        'UPDATE equipment_request_items
         SET item_status = :item_status,
             item_status_note = :item_status_note
         WHERE id = :id
           AND request_id = :request_id'
    );

    $updatedCount = 0;
    foreach ($itemUpdates as $update) {
        $itemId = (int) ($update['id'] ?? 0);
        if ($itemId <= 0 || !isset($existingById[$itemId])) {
            continue;
        }

        $nextStatus = normalizeEquipmentRequestItemStatus((string) ($update['item_status'] ?? 'pending'));
        $nextNote = normalizeEquipmentRequestMultiline((string) ($update['item_status_note'] ?? ''), 500);

        $existing = $existingById[$itemId];
        $currentStatus = normalizeEquipmentRequestItemStatus((string) ($existing['item_status'] ?? 'pending'));
        $currentNote = normalizeEquipmentRequestMultiline((string) ($existing['item_status_note'] ?? ''), 500);

        if ($nextStatus === $currentStatus && $nextNote === $currentNote) {
            continue;
        }

        $updateStatement->execute([
            'item_status' => $nextStatus,
            'item_status_note' => $nextNote !== '' ? $nextNote : null,
            'id' => $itemId,
            'request_id' => $requestId,
        ]);
        $updatedCount += $updateStatement->rowCount() > 0 ? 1 : 0;
    }

    $countUnavailableStatement = $pdo->prepare(
        'SELECT COUNT(*)
         FROM equipment_request_items
         WHERE request_id = :request_id
           AND item_status = :item_status'
    );
    $countUnavailableStatement->execute([
        'request_id' => $requestId,
        'item_status' => 'unavailable',
    ]);
    $unavailableCount = (int) $countUnavailableStatement->fetchColumn();

    return [
        'updated_count' => $updatedCount,
        'unavailable_count' => $unavailableCount,
    ];
}

function sendEquipmentRequestStatusUpdateToCustomer(
    array $request,
    array $items,
    string $status,
    string $statusNote
): array {
    $recipient = trim((string) ($request['customer_email'] ?? ''));
    if ($recipient === '' || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
        return [
            'attempted' => false,
            'sent' => false,
            'provider' => 'none',
            'recipient' => $recipient,
            'subject' => '',
            'message' => '',
            'error' => 'Customer email is missing or invalid',
        ];
    }

    $isArabic = strtolower((string) ($request['request_lang'] ?? 'ar')) !== 'en';
    $requestCode = (string) ($request['request_code'] ?? '#');
    $customerName = (string) ($request['customer_name'] ?? 'Customer');
    $customerPhone = (string) ($request['customer_phone'] ?? '-');
    $totalItems = (int) ($request['total_items'] ?? 0);

    $statusTextAr = match ($status) {
        'confirmed' => 'تم تأكيد الطلب',
        'cancelled' => 'غير متوفر حالياً',
        default => 'قيد المراجعة',
    };
    $statusTextEn = match ($status) {
        'confirmed' => 'Confirmed',
        'cancelled' => 'Unavailable',
        default => 'Under review',
    };

    $subject = $isArabic
        ? ('تحديث حالة طلب المعدات - ' . $requestCode)
        : ('Equipment request status update - ' . $requestCode);
    $html = buildEquipmentRequestStatusUpdateEmailHtml(
        $requestCode,
        $customerName,
        $customerPhone,
        $totalItems,
        $items,
        $status,
        $statusTextAr,
        $statusTextEn,
        $statusNote,
        $isArabic
    );
    $text = buildEquipmentRequestStatusUpdateEmailText(
        $requestCode,
        $customerName,
        $customerPhone,
        $totalItems,
        $items,
        $statusTextAr,
        $statusTextEn,
        $statusNote,
        $isArabic
    );

    $sendResult = sendEquipmentRequestEmailWithRetry($recipient, $customerName, $subject, $html, $text);
    $sent = !empty($sendResult['sent']);
    $provider = (string) ($sendResult['provider'] ?? 'none');
    $error = $sent ? null : (string) ($sendResult['error'] ?? 'Failed to send status update email');

    if (!$sent && $error === '') {
        $error = emailGetLastError() ?? 'Failed to send status update email';
    }

    return [
        'attempted' => true,
        'sent' => $sent,
        'provider' => $provider,
        'recipient' => $recipient,
        'subject' => $subject,
        'message' => $text,
        'error' => $error,
    ];
}

function mapEquipmentRequestItemStatusMeta(string $status): array
{
    $normalized = normalizeEquipmentRequestItemStatus($status);
    return match ($normalized) {
        'available' => [
            'key' => 'available',
            'ar' => 'متاح',
            'en' => 'Available',
            'background' => '#ecfdf3',
            'text' => '#166534',
            'border' => '#86efac',
        ],
        'unavailable' => [
            'key' => 'unavailable',
            'ar' => 'غير متوفر',
            'en' => 'Unavailable',
            'background' => '#fef2f2',
            'text' => '#991b1b',
            'border' => '#fca5a5',
        ],
        default => [
            'key' => 'pending',
            'ar' => 'قيد المراجعة',
            'en' => 'Pending',
            'background' => '#fffbeb',
            'text' => '#92400e',
            'border' => '#fcd34d',
        ],
    };
}

function buildEquipmentRequestStatusUpdateEmailHtml(
    string $requestCode,
    string $customerName,
    string $customerPhone,
    int $totalItems,
    array $items,
    string $status,
    string $statusTextAr,
    string $statusTextEn,
    string $statusNote,
    bool $isArabic
): string {
    $safeName = htmlspecialchars($customerName, ENT_QUOTES, 'UTF-8');
    $safeCode = htmlspecialchars($requestCode, ENT_QUOTES, 'UTF-8');
    $safePhone = buildEquipmentRequestPhoneHtml($customerPhone);
    $safeNote = $statusNote !== '' ? nl2br(htmlspecialchars($statusNote, ENT_QUOTES, 'UTF-8')) : '';

    $rows = '';
    foreach ($items as $item) {
        $name = htmlspecialchars((string) ($item['name'] ?? ''), ENT_QUOTES, 'UTF-8');
        $category = htmlspecialchars((string) ($item['category'] ?? ''), ENT_QUOTES, 'UTF-8');
        $subcategory = htmlspecialchars((string) ($item['subcategory'] ?? ''), ENT_QUOTES, 'UTF-8');
        $qty = max(1, (int) ($item['qty'] ?? 1));
        $itemNoteRaw = normalizeEquipmentRequestMultiline((string) ($item['item_status_note'] ?? ''), 500);
        $itemNote = $itemNoteRaw !== '' ? htmlspecialchars($itemNoteRaw, ENT_QUOTES, 'UTF-8') : '-';
        $itemStatusMeta = mapEquipmentRequestItemStatusMeta((string) ($item['item_status'] ?? 'pending'));
        $itemStatusLabel = $isArabic ? (string) $itemStatusMeta['ar'] : (string) $itemStatusMeta['en'];
        $statusTag = '<span style="display:inline-block;padding:3px 9px;border-radius:999px;'
            . 'font-weight:700;font-size:12px;background:' . htmlspecialchars((string) $itemStatusMeta['background'], ENT_QUOTES, 'UTF-8') . ';'
            . 'color:' . htmlspecialchars((string) $itemStatusMeta['text'], ENT_QUOTES, 'UTF-8') . ';'
            . 'border:1px solid ' . htmlspecialchars((string) $itemStatusMeta['border'], ENT_QUOTES, 'UTF-8') . ';">'
            . htmlspecialchars($itemStatusLabel, ENT_QUOTES, 'UTF-8')
            . '</span>';
        $categoryText = trim($category . ($subcategory !== '' ? ' • ' . $subcategory : ''));
        if ($categoryText === '') {
            $categoryText = '-';
        }

        $rows .= '<tr>'
            . '<td style="padding:8px;border:1px solid #ddd;">' . $name . '</td>'
            . '<td style="padding:8px;border:1px solid #ddd;">' . $categoryText . '</td>'
            . '<td style="padding:8px;border:1px solid #ddd;text-align:center;">' . $qty . '</td>'
            . '<td style="padding:8px;border:1px solid #ddd;text-align:center;">' . $statusTag . '</td>'
            . '<td style="padding:8px;border:1px solid #ddd;">' . $itemNote . '</td>'
            . '</tr>';
    }

    $statusLine = $isArabic ? $statusTextAr : $statusTextEn;
    $messageLine = '';
    if ($isArabic) {
        $messageLine = match ($status) {
            'confirmed' => 'تم تأكيد طلبك، وسيقوم فريقنا بالتواصل معك لإكمال الإجراءات.',
            'cancelled' => 'نعتذر، بعض المعدات المطلوبة غير متوفرة حالياً. يمكنك الرد على هذا البريد لإرسال بدائل مناسبة.',
            default => 'طلبك ما زال قيد المراجعة، وسيتم تحديثك في أقرب وقت.',
        };
    } else {
        $messageLine = match ($status) {
            'confirmed' => 'Your request has been confirmed. Our team will contact you to complete the next steps.',
            'cancelled' => 'We are sorry, some requested equipment is currently unavailable. Reply to this email and we can suggest alternatives.',
            default => 'Your request is still under review and we will update you shortly.',
        };
    }

    if ($isArabic) {
        $body = '<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;line-height:1.8;">'
            . '<p>مرحبًا ' . $safeName . '،</p>'
            . '<p>' . $messageLine . '</p>'
            . '<p><strong>حالة الطلب:</strong> ' . htmlspecialchars($statusLine, ENT_QUOTES, 'UTF-8') . '<br>'
            . '<strong>رقم الطلب:</strong> ' . $safeCode . '<br>'
            . '<strong>الجوال:</strong> ' . $safePhone . '<br>'
            . '<strong>إجمالي المعدات:</strong> ' . $totalItems . '</p>'
            . ($safeNote !== '' ? '<p><strong>ملاحظة التحديث:</strong><br>' . $safeNote . '</p>' : '')
            . '<table style="border-collapse:collapse;width:100%;margin-top:16px;">'
            . '<thead><tr>'
            . buildEquipmentRequestTableHeaderCell('العنصر', 'right')
            . buildEquipmentRequestTableHeaderCell('التصنيف', 'right')
            . buildEquipmentRequestTableHeaderCell('الكمية', 'center')
            . buildEquipmentRequestTableHeaderCell('حالة العنصر', 'center')
            . buildEquipmentRequestTableHeaderCell('ملاحظة', 'right')
            . '</tr></thead>'
            . '<tbody>' . $rows . '</tbody>'
            . '</table>'
            . buildEquipmentRequestClosingHtml(true)
            . '</div>';
        return buildEquipmentRequestEmailShellHtml($body, true, 'Equipment Request Status');
    }

    $body = '<div style="font-family:Arial,sans-serif;line-height:1.7;">'
        . '<p>Hello ' . $safeName . ',</p>'
        . '<p>' . $messageLine . '</p>'
        . '<p><strong>Status:</strong> ' . htmlspecialchars($statusLine, ENT_QUOTES, 'UTF-8') . '<br>'
        . '<strong>Request code:</strong> ' . $safeCode . '<br>'
        . '<strong>Phone:</strong> ' . $safePhone . '<br>'
        . '<strong>Total quantity:</strong> ' . $totalItems . '</p>'
        . ($safeNote !== '' ? '<p><strong>Update note:</strong><br>' . $safeNote . '</p>' : '')
        . '<table style="border-collapse:collapse;width:100%;margin-top:16px;">'
        . '<thead><tr>'
        . buildEquipmentRequestTableHeaderCell('Item', 'left')
        . buildEquipmentRequestTableHeaderCell('Category', 'left')
        . buildEquipmentRequestTableHeaderCell('Qty', 'center')
        . buildEquipmentRequestTableHeaderCell('Item status', 'center')
        . buildEquipmentRequestTableHeaderCell('Note', 'left')
        . '</tr></thead>'
        . '<tbody>' . $rows . '</tbody>'
        . '</table>'
        . buildEquipmentRequestClosingHtml(false)
        . '</div>';
    return buildEquipmentRequestEmailShellHtml($body, false, 'Equipment Request Status');
}

function buildEquipmentRequestStatusUpdateEmailText(
    string $requestCode,
    string $customerName,
    string $customerPhone,
    int $totalItems,
    array $items,
    string $statusTextAr,
    string $statusTextEn,
    string $statusNote,
    bool $isArabic
): string {
    $lines = [];
    if ($isArabic) {
        $lines[] = 'مرحبًا ' . $customerName . '،';
        $lines[] = 'تم تحديث حالة طلب المعدات الخاص بك.';
        $lines[] = 'حالة الطلب: ' . $statusTextAr;
        $lines[] = 'رقم الطلب: ' . $requestCode;
        $lines[] = 'الجوال: ' . $customerPhone;
        $lines[] = 'إجمالي المعدات: ' . $totalItems;
        if ($statusNote !== '') {
            $lines[] = 'ملاحظة التحديث: ' . $statusNote;
        }
        $lines[] = '';
        $lines[] = 'قائمة المعدات:';
    } else {
        $lines[] = 'Hello ' . $customerName . ',';
        $lines[] = 'Your equipment request status has been updated.';
        $lines[] = 'Status: ' . $statusTextEn;
        $lines[] = 'Request code: ' . $requestCode;
        $lines[] = 'Phone: ' . $customerPhone;
        $lines[] = 'Total quantity: ' . $totalItems;
        if ($statusNote !== '') {
            $lines[] = 'Update note: ' . $statusNote;
        }
        $lines[] = '';
        $lines[] = 'Requested items:';
    }

    foreach ($items as $idx => $item) {
        $category = trim(((string) ($item['category'] ?? '')) . ' ' . ((string) ($item['subcategory'] ?? '')));
        if ($category === '') {
            $category = '-';
        }
        $itemStatusMeta = mapEquipmentRequestItemStatusMeta((string) ($item['item_status'] ?? 'pending'));
        $itemStatusText = $isArabic ? (string) $itemStatusMeta['ar'] : (string) $itemStatusMeta['en'];
        $itemNote = normalizeEquipmentRequestMultiline((string) ($item['item_status_note'] ?? ''), 500);
        $lines[] = sprintf(
            '%d. %s | Qty: %d | Category: %s | %s: %s%s',
            $idx + 1,
            (string) ($item['name'] ?? ''),
            max(1, (int) ($item['qty'] ?? 1)),
            $category,
            $isArabic ? 'الحالة' : 'Status',
            $itemStatusText,
            $itemNote !== '' ? (' | ' . ($isArabic ? 'ملاحظة' : 'Note') . ': ' . $itemNote) : ''
        );
    }

    $lines[] = '';
    $lines[] = buildEquipmentRequestClosingText($isArabic);
    $lines[] = '';
    $lines[] = buildEquipmentRequestEmailFooterText($isArabic);
    return implode("\n", $lines);
}
