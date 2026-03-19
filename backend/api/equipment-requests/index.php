<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/email.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if (!defined('API_INCLUDE_MODE')) {
    try {
        if ($method !== 'POST') {
            respondError('Method not allowed', 405);
            return;
        }

        $pdo = getDatabaseConnection();
        ensureEquipmentCartTable($pdo);
        ensureEquipmentRequestTables($pdo);
        purgeStaleEquipmentCartRows($pdo);

        handleEquipmentRequestCreate($pdo);
    } catch (InvalidArgumentException $exception) {
        respondError($exception->getMessage(), 422);
    } catch (Throwable $exception) {
        respondError('Unexpected server error', 500, [
            'details' => $exception->getMessage(),
        ]);
    }
}

function handleEquipmentRequestCreate(PDO $pdo): void
{
    $payload = readEquipmentRequestJsonPayload();
    $sessionToken = getEquipmentCartSessionToken();

    $name = normalizeEquipmentRequestText((string) ($payload['name'] ?? ''), 160);
    $email = strtolower(trim((string) ($payload['email'] ?? '')));
    $phone = normalizeEquipmentRequestText((string) ($payload['phone'] ?? ''), 80);
    $notes = normalizeEquipmentRequestMultiline((string) ($payload['notes'] ?? ''), 3000);
    $language = normalizeEquipmentRequestLanguage((string) ($payload['language'] ?? ''));

    if ($name === '' || $email === '' || $phone === '') {
        throw new InvalidArgumentException('Name, email, and phone are required');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('Invalid email address');
    }

    $ipAddress = function_exists('getClientIpAddress')
        ? substr(getClientIpAddress(), 0, 45)
        : substr((string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0'), 0, 45);
    $userAgent = substr(trim((string) ($_SERVER['HTTP_USER_AGENT'] ?? '')), 0, 500);

    if (isEquipmentRequestRateLimited($pdo, $ipAddress, $sessionToken)) {
        respondError('Too many requests. Please wait before sending another request.', 429);
        return;
    }

    $items = fetchEquipmentCartItems($pdo, $sessionToken);
    if (count($items) === 0) {
        throw new InvalidArgumentException('Cart is empty');
    }

    $totalItems = 0;
    foreach ($items as $item) {
        $totalItems += max(1, (int) ($item['qty'] ?? 1));
    }

    $requestCode = generateEquipmentRequestCode();

    $pdo->beginTransaction();
    try {
        $insertRequest = $pdo->prepare(
            'INSERT INTO equipment_requests (
                request_code,
                session_token,
                customer_name,
                customer_email,
                customer_phone,
                notes,
                status,
                total_items,
                request_lang,
                ip_address,
                user_agent,
                raw_payload
            ) VALUES (
                :request_code,
                :session_token,
                :customer_name,
                :customer_email,
                :customer_phone,
                :notes,
                :status,
                :total_items,
                :request_lang,
                :ip_address,
                :user_agent,
                :raw_payload
            )'
        );
        $insertRequest->execute([
            'request_code' => $requestCode,
            'session_token' => $sessionToken,
            'customer_name' => $name,
            'customer_email' => $email,
            'customer_phone' => $phone,
            'notes' => $notes !== '' ? $notes : null,
            'status' => 'pending',
            'total_items' => $totalItems,
            'request_lang' => $language,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent !== '' ? $userAgent : null,
            'raw_payload' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ]);

        $requestId = (int) $pdo->lastInsertId();

        $insertItem = $pdo->prepare(
            'INSERT INTO equipment_request_items (
                request_id,
                item_key,
                name,
                image_url,
                category,
                subcategory,
                qty
            ) VALUES (
                :request_id,
                :item_key,
                :name,
                :image_url,
                :category,
                :subcategory,
                :qty
            )'
        );

        foreach ($items as $item) {
            $insertItem->execute([
                'request_id' => $requestId,
                'item_key' => (string) ($item['item_key'] ?? ''),
                'name' => (string) ($item['name'] ?? ''),
                'image_url' => (string) ($item['image'] ?? '') !== '' ? (string) $item['image'] : null,
                'category' => (string) ($item['category'] ?? '') !== '' ? (string) $item['category'] : null,
                'subcategory' => (string) ($item['subcategory'] ?? '') !== '' ? (string) $item['subcategory'] : null,
                'qty' => max(1, (int) ($item['qty'] ?? 1)),
            ]);
        }

        $clearCart = $pdo->prepare('DELETE FROM equipment_cart_items WHERE session_token = :session_token');
        $clearCart->execute([
            'session_token' => $sessionToken,
        ]);

        $pdo->commit();

        $emailResult = notifyEquipmentRequestByEmail(
            $requestCode,
            $name,
            $email,
            $phone,
            $notes,
            $totalItems,
            $items
        );

        respond([
            'request_code' => $requestCode,
            'status' => 'pending',
            'total_items' => $totalItems,
            'email_sent' => $emailResult['sent'],
            'email_provider' => $emailResult['provider'],
        ], 201);
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $exception;
    }
}

function notifyEquipmentRequestByEmail(
    string $requestCode,
    string $customerName,
    string $customerEmail,
    string $customerPhone,
    string $notes,
    int $totalItems,
    array $items
): array {
    $subject = sprintf('Equipment Request %s - Art Ratio', $requestCode);
    $htmlBody = buildEquipmentRequestEmailHtml(
        $requestCode,
        $customerName,
        $customerEmail,
        $customerPhone,
        $notes,
        $totalItems,
        $items
    );
    $textBody = buildEquipmentRequestEmailText(
        $requestCode,
        $customerName,
        $customerEmail,
        $customerPhone,
        $notes,
        $totalItems,
        $items
    );

    $recipients = resolveEquipmentRequestRecipients();

    $sent = false;
    foreach ($recipients as $recipient) {
        if (!is_string($recipient) || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
            continue;
        }
        if (sendEmail($recipient, 'Art Ratio Team', $subject, $htmlBody, $textBody)) {
            $sent = true;
        }
    }

    if ($sent) {
        return [
            'sent' => true,
            'provider' => 'smtp',
        ];
    }

    $fallbackSent = sendEquipmentRequestViaWeb3Forms(
        $subject,
        $customerName,
        $customerEmail,
        $customerPhone,
        $textBody
    );

    return [
        'sent' => $fallbackSent,
        'provider' => $fallbackSent ? 'web3forms' : 'none',
    ];
}

function resolveEquipmentRequestRecipients(): array
{
    $configured = getAppConfig('notifications', 'admin_emails', []);
    if (is_array($configured)) {
        $emails = array_values(array_filter(array_map('trim', $configured)));
        if ($emails) {
            return $emails;
        }
    }

    return ['info@art-ratio.com'];
}

function sendEquipmentRequestViaWeb3Forms(
    string $subject,
    string $customerName,
    string $customerEmail,
    string $customerPhone,
    string $message
): bool {
    $accessKey = trim((string) getAppConfig('web3forms', 'access_key', ''));
    if ($accessKey === '') {
        // Existing project forms already use this key on contact/feedback.
        $accessKey = '6d7bc3fc-6190-43c5-8298-89ac5ef7494f';
    }

    $payload = [
        'access_key' => $accessKey,
        'subject' => $subject,
        'from_name' => $customerName,
        'email' => $customerEmail,
        'phone' => $customerPhone,
        'message' => $message,
    ];

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\nAccept: application/json\r\n",
            'content' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'timeout' => 15,
        ],
    ]);

    $raw = @file_get_contents('https://api.web3forms.com/submit', false, $context);
    if ($raw === false) {
        return false;
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) && ($decoded['success'] ?? false) === true;
}

function buildEquipmentRequestEmailHtml(
    string $requestCode,
    string $customerName,
    string $customerEmail,
    string $customerPhone,
    string $notes,
    int $totalItems,
    array $items
): string {
    $rows = '';
    foreach ($items as $item) {
        $name = htmlspecialchars((string) ($item['name'] ?? ''), ENT_QUOTES, 'UTF-8');
        $category = htmlspecialchars((string) ($item['category'] ?? ''), ENT_QUOTES, 'UTF-8');
        $subcategory = htmlspecialchars((string) ($item['subcategory'] ?? ''), ENT_QUOTES, 'UTF-8');
        $qty = max(1, (int) ($item['qty'] ?? 1));
        $categoryText = trim($category . ($subcategory !== '' ? ' • ' . $subcategory : ''));
        if ($categoryText === '') {
            $categoryText = '-';
        }

        $rows .= '<tr>'
            . '<td style="padding:8px;border:1px solid #ddd;">' . $name . '</td>'
            . '<td style="padding:8px;border:1px solid #ddd;">' . $categoryText . '</td>'
            . '<td style="padding:8px;border:1px solid #ddd;text-align:center;">' . $qty . '</td>'
            . '</tr>';
    }

    $safeNotes = $notes !== '' ? nl2br(htmlspecialchars($notes, ENT_QUOTES, 'UTF-8')) : '-';

    return '<h2>New Equipment Request</h2>'
        . '<p><strong>Request Code:</strong> ' . htmlspecialchars($requestCode, ENT_QUOTES, 'UTF-8') . '</p>'
        . '<p><strong>Name:</strong> ' . htmlspecialchars($customerName, ENT_QUOTES, 'UTF-8') . '</p>'
        . '<p><strong>Email:</strong> ' . htmlspecialchars($customerEmail, ENT_QUOTES, 'UTF-8') . '</p>'
        . '<p><strong>Phone:</strong> ' . htmlspecialchars($customerPhone, ENT_QUOTES, 'UTF-8') . '</p>'
        . '<p><strong>Total Items:</strong> ' . $totalItems . '</p>'
        . '<p><strong>Notes:</strong><br>' . $safeNotes . '</p>'
        . '<table style="border-collapse:collapse;width:100%;margin-top:16px;">'
        . '<thead><tr>'
        . '<th style="padding:8px;border:1px solid #ddd;text-align:left;">Item</th>'
        . '<th style="padding:8px;border:1px solid #ddd;text-align:left;">Category</th>'
        . '<th style="padding:8px;border:1px solid #ddd;text-align:center;">Qty</th>'
        . '</tr></thead>'
        . '<tbody>' . $rows . '</tbody>'
        . '</table>';
}

function buildEquipmentRequestEmailText(
    string $requestCode,
    string $customerName,
    string $customerEmail,
    string $customerPhone,
    string $notes,
    int $totalItems,
    array $items
): string {
    $lines = [];
    $lines[] = 'New Equipment Request';
    $lines[] = 'Request Code: ' . $requestCode;
    $lines[] = 'Name: ' . $customerName;
    $lines[] = 'Email: ' . $customerEmail;
    $lines[] = 'Phone: ' . $customerPhone;
    $lines[] = 'Total Items: ' . $totalItems;
    $lines[] = 'Notes: ' . ($notes !== '' ? $notes : '-');
    $lines[] = '';
    $lines[] = 'Requested Items:';

    foreach ($items as $idx => $item) {
        $category = trim(((string) ($item['category'] ?? '')) . ' ' . ((string) ($item['subcategory'] ?? '')));
        if ($category === '') {
            $category = '-';
        }
        $lines[] = sprintf(
            '%d. %s | Qty: %d | Category: %s',
            $idx + 1,
            (string) ($item['name'] ?? ''),
            max(1, (int) ($item['qty'] ?? 1)),
            $category
        );
    }

    return implode("\n", $lines);
}

function isEquipmentRequestRateLimited(PDO $pdo, string $ipAddress, string $sessionToken): bool
{
    $statement = $pdo->prepare(
        'SELECT COUNT(*)
         FROM equipment_requests
         WHERE (ip_address = :ip_address OR session_token = :session_token)
           AND created_at >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)'
    );
    $statement->execute([
        'ip_address' => $ipAddress,
        'session_token' => $sessionToken,
    ]);

    $count = (int) $statement->fetchColumn();
    return $count >= 5;
}

function ensureEquipmentRequestTables(PDO $pdo): void
{
    static $ensured = false;
    if ($ensured) {
        return;
    }

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS equipment_requests (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            request_code VARCHAR(40) NOT NULL,
            session_token VARCHAR(128) NOT NULL,
            customer_name VARCHAR(160) NOT NULL,
            customer_email VARCHAR(190) NOT NULL,
            customer_phone VARCHAR(80) NOT NULL,
            notes TEXT NULL,
            status ENUM('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
            total_items INT UNSIGNED NOT NULL DEFAULT 0,
            request_lang VARCHAR(5) NOT NULL DEFAULT 'ar',
            ip_address VARCHAR(45) NOT NULL,
            user_agent VARCHAR(500) NULL,
            raw_payload JSON NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY uq_equipment_requests_code (request_code),
            KEY idx_equipment_requests_created_at (created_at),
            KEY idx_equipment_requests_status (status),
            KEY idx_equipment_requests_ip (ip_address),
            KEY idx_equipment_requests_session (session_token)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS equipment_request_items (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            request_id BIGINT UNSIGNED NOT NULL,
            item_key CHAR(64) NOT NULL,
            name VARCHAR(255) NOT NULL,
            image_url TEXT NULL,
            category VARCHAR(190) NULL,
            subcategory VARCHAR(190) NULL,
            qty INT UNSIGNED NOT NULL DEFAULT 1,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY idx_equipment_request_items_request (request_id),
            CONSTRAINT fk_equipment_request_items_request
                FOREIGN KEY (request_id) REFERENCES equipment_requests(id)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $ensured = true;
}

function ensureEquipmentCartTable(PDO $pdo): void
{
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
    $statement->execute([
        'session_token' => $sessionToken,
    ]);
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

function readEquipmentRequestJsonPayload(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false) {
        throw new InvalidArgumentException('Unable to read request body');
    }

    $raw = trim($raw);
    if ($raw === '') {
        return [];
    }

    $payload = json_decode($raw, true);
    if (!is_array($payload)) {
        throw new InvalidArgumentException('Invalid JSON payload');
    }

    return $payload;
}

function normalizeEquipmentRequestText(string $value, int $maxLength): string
{
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value) ?? '';
    $value = trim(preg_replace('/\s+/u', ' ', $value) ?? '');

    if ($maxLength > 0 && function_exists('mb_strlen') && mb_strlen($value, 'UTF-8') > $maxLength) {
        return trim((string) mb_substr($value, 0, $maxLength, 'UTF-8'));
    }
    if ($maxLength > 0 && strlen($value) > $maxLength) {
        return trim(substr($value, 0, $maxLength));
    }

    return $value;
}

function normalizeEquipmentRequestMultiline(string $value, int $maxLength): string
{
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    $value = trim($value);

    if ($maxLength > 0 && function_exists('mb_strlen') && mb_strlen($value, 'UTF-8') > $maxLength) {
        return trim((string) mb_substr($value, 0, $maxLength, 'UTF-8'));
    }
    if ($maxLength > 0 && strlen($value) > $maxLength) {
        return trim(substr($value, 0, $maxLength));
    }

    return $value;
}

function normalizeEquipmentRequestLanguage(string $value): string
{
    $value = strtolower(trim($value));
    if ($value === 'en') {
        return 'en';
    }
    return 'ar';
}

function generateEquipmentRequestCode(): string
{
    return 'ER-' . gmdate('Ymd-His') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));
}
