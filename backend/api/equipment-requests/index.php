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
        ensureEquipmentRequestMessagesTableForCreate($pdo);
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

    $pdo->beginTransaction();
    try {
        $requestCode = generateEquipmentRequestCode($pdo);

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

        $customerEmailResult = notifyEquipmentRequestCustomerReceivedByEmail(
            $requestCode,
            $name,
            $email,
            $phone,
            $notes,
            $totalItems,
            $items,
            $language
        );
        $teamEmailResult = notifyEquipmentRequestTeamByEmail(
            $requestCode,
            $name,
            $email,
            $phone,
            $notes,
            $totalItems,
            $items
        );
        try {
            logEquipmentRequestEmailDelivery($pdo, $requestId, $customerEmailResult);
            if (is_array($teamEmailResult['details'] ?? null) && $teamEmailResult['details']) {
                foreach ($teamEmailResult['details'] as $deliveryRow) {
                    if (!is_array($deliveryRow)) {
                        continue;
                    }
                    logEquipmentRequestEmailDelivery($pdo, $requestId, $deliveryRow);
                }
            } else {
                logEquipmentRequestEmailDelivery($pdo, $requestId, $teamEmailResult);
            }
        } catch (Throwable $loggingError) {
            error_log('Equipment request email log failure: ' . $loggingError->getMessage());
        }

        respond([
            'request_code' => $requestCode,
            'status' => 'pending',
            'total_items' => $totalItems,
            'email_attempted' => true,
            'email_sent' => $customerEmailResult['sent'],
            'email_provider' => $customerEmailResult['provider'],
            'email_error' => $customerEmailResult['error'] ?? null,
            'team_email_attempted' => true,
            'team_email_sent' => $teamEmailResult['sent'],
            'team_email_provider' => $teamEmailResult['provider'],
            'team_email_error' => $teamEmailResult['error'] ?? null,
        ], 201);
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $exception;
    }
}

function notifyEquipmentRequestTeamByEmail(
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
    $lastError = null;
    $deliveryDetails = [];
    foreach ($recipients as $recipient) {
        if (!is_string($recipient) || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
            continue;
        }
        $sendResult = sendEquipmentRequestEmailWithRetry(
            $recipient,
            'Art Ratio Team',
            $subject,
            $htmlBody,
            $textBody
        );
        $deliveryDetails[] = [
            'sent' => !empty($sendResult['sent']),
            'provider' => (string) ($sendResult['provider'] ?? 'none'),
            'error' => isset($sendResult['error']) ? (string) $sendResult['error'] : null,
            'recipient' => $recipient,
            'subject' => $subject,
            'message' => $textBody,
        ];
        if (!empty($sendResult['sent'])) {
            $sent = true;
        } else {
            $lastError = (string) ($sendResult['error'] ?? ('Failed to send team email to ' . $recipient));
        }
    }

    if ($sent) {
        return [
            'sent' => true,
            'provider' => 'smtp',
            'error' => null,
            'subject' => $subject,
            'message' => $textBody,
            'details' => $deliveryDetails,
        ];
    }

    $fallbackSent = sendEquipmentRequestViaWeb3Forms(
        $subject,
        $customerName,
        $customerEmail,
        $customerPhone,
        $textBody
    );

    $result = [
        'sent' => $fallbackSent,
        'provider' => $fallbackSent ? 'web3forms' : 'none',
        'error' => $fallbackSent ? null : ($lastError ?? 'Failed to send team notification'),
        'subject' => $subject,
        'message' => $textBody,
        'details' => $deliveryDetails,
    ];
    $result['details'][] = [
        'sent' => $fallbackSent,
        'provider' => $fallbackSent ? 'web3forms' : 'none',
        'error' => $fallbackSent ? null : ($lastError ?? 'Failed to send team notification'),
        'recipient' => implode(', ', array_values(array_filter(array_map('strval', $recipients)))),
        'subject' => $subject,
        'message' => $textBody,
    ];
    return $result;
}

function notifyEquipmentRequestCustomerReceivedByEmail(
    string $requestCode,
    string $customerName,
    string $customerEmail,
    string $customerPhone,
    string $notes,
    int $totalItems,
    array $items,
    string $language
): array {
    if (!filter_var($customerEmail, FILTER_VALIDATE_EMAIL)) {
        return [
            'attempted' => false,
            'sent' => false,
            'provider' => 'none',
            'recipient' => $customerEmail,
            'subject' => '',
            'message' => '',
            'error' => 'Customer email is missing or invalid',
        ];
    }

    $isArabic = $language !== 'en';
    $subject = $isArabic
        ? ('تم استلام طلب المعدات - ' . $requestCode)
        : ('Your equipment request has been received - ' . $requestCode);
    $htmlBody = buildEquipmentRequestCustomerReceivedEmailHtml(
        $requestCode,
        $customerName,
        $customerPhone,
        $notes,
        $totalItems,
        $items,
        $isArabic
    );
    $textBody = buildEquipmentRequestCustomerReceivedEmailText(
        $requestCode,
        $customerName,
        $customerPhone,
        $notes,
        $totalItems,
        $items,
        $isArabic
    );

    $result = sendEquipmentRequestEmailWithRetry(
        $customerEmail,
        $customerName,
        $subject,
        $htmlBody,
        $textBody
    );
    $sent = !empty($result['sent']);
    $provider = (string) ($result['provider'] ?? 'none');
    $error = $sent ? null : (string) ($result['error'] ?? 'Failed to send customer confirmation email');

    if (!$sent) {
        $fallbackSent = sendEquipmentRequestViaWeb3Forms(
            $subject,
            $customerName,
            $customerEmail,
            $customerPhone,
            $textBody
        );
        if ($fallbackSent) {
            $sent = true;
            $provider = 'web3forms';
            $error = null;
        }
    }

    $result['sent'] = $sent;
    $result['provider'] = $provider;
    $result['error'] = $error;
    $result['attempted'] = true;
    $result['recipient'] = $customerEmail;
    $result['subject'] = $subject;
    $result['message'] = $textBody;
    return $result;
}

function sendEquipmentRequestEmailWithRetry(
    string $toEmail,
    string $toName,
    string $subject,
    string $htmlBody,
    string $textBody
): array {
    $sent = sendEmail($toEmail, $toName, $subject, $htmlBody, $textBody);
    if ($sent) {
        return [
            'sent' => true,
            'provider' => 'smtp',
            'error' => null,
        ];
    }

    $firstError = emailGetLastError() ?? 'First SMTP attempt failed';

    // Retry once to mitigate temporary provider throttling on immediate sequential sends.
    // Use a sanitized ASCII recipient display name on retry to avoid header encoding issues
    // seen with some SMTP relays.
    usleep(350000);
    $retryName = trim((string) preg_replace('/[^\x20-\x7E]/', '', $toName));
    if ($retryName === '') {
        $retryName = 'Customer';
    }
    $retrySent = sendEmail($toEmail, $retryName, $subject, $htmlBody, $textBody);
    if ($retrySent) {
        return [
            'sent' => true,
            'provider' => 'smtp-retry',
            'error' => null,
        ];
    }

    $retryError = emailGetLastError() ?? 'Second SMTP attempt failed';
    return [
        'sent' => false,
        'provider' => 'none',
        'error' => $firstError . ' | Retry failed: ' . $retryError,
    ];
}

function buildEquipmentRequestCustomerReceivedEmailHtml(
    string $requestCode,
    string $customerName,
    string $customerPhone,
    string $notes,
    int $totalItems,
    array $items,
    bool $isArabic
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

    $safeName = htmlspecialchars($customerName, ENT_QUOTES, 'UTF-8');
    $safeCode = htmlspecialchars($requestCode, ENT_QUOTES, 'UTF-8');
    $safePhone = htmlspecialchars($customerPhone, ENT_QUOTES, 'UTF-8');
    $safeNotes = $notes !== '' ? nl2br(htmlspecialchars($notes, ENT_QUOTES, 'UTF-8')) : '-';

    if ($isArabic) {
        return '<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;line-height:1.8;">'
            . '<p>مرحبًا ' . $safeName . '،</p>'
            . '<p>شكرًا لاختيارك <strong>أرت ريشيو</strong>.</p>'
            . '<p>تم استلام طلب المعدات الخاص بك بنجاح، وفريقنا يراجع الطلب الآن وسيقوم بتحديث الحالة في أقرب وقت.</p>'
            . '<p><strong>رقم الطلب:</strong> ' . $safeCode . '<br>'
            . '<strong>الجوال:</strong> ' . $safePhone . '<br>'
            . '<strong>إجمالي المعدات:</strong> ' . $totalItems . '</p>'
            . '<p><strong>ملاحظاتك:</strong><br>' . $safeNotes . '</p>'
            . '<table style="border-collapse:collapse;width:100%;margin-top:16px;">'
            . '<thead><tr>'
            . '<th style="padding:8px;border:1px solid #ddd;text-align:right;">العنصر</th>'
            . '<th style="padding:8px;border:1px solid #ddd;text-align:right;">التصنيف</th>'
            . '<th style="padding:8px;border:1px solid #ddd;text-align:center;">الكمية</th>'
            . '</tr></thead>'
            . '<tbody>' . $rows . '</tbody>'
            . '</table>'
            . '<p style="margin-top:20px;">مع التحية،<br>فريق أرت ريشيو</p>'
            . '</div>';
    }

    return '<div style="font-family:Arial,sans-serif;line-height:1.7;">'
        . '<p>Hello ' . $safeName . ',</p>'
        . '<p>Thank you for choosing <strong>Art Ratio</strong>.</p>'
        . '<p>Your equipment request has been received and is now under review. Our team will update your request status as soon as possible.</p>'
        . '<p><strong>Request code:</strong> ' . $safeCode . '<br>'
        . '<strong>Phone:</strong> ' . $safePhone . '<br>'
        . '<strong>Total quantity:</strong> ' . $totalItems . '</p>'
        . '<p><strong>Your notes:</strong><br>' . $safeNotes . '</p>'
        . '<table style="border-collapse:collapse;width:100%;margin-top:16px;">'
        . '<thead><tr>'
        . '<th style="padding:8px;border:1px solid #ddd;text-align:left;">Item</th>'
        . '<th style="padding:8px;border:1px solid #ddd;text-align:left;">Category</th>'
        . '<th style="padding:8px;border:1px solid #ddd;text-align:center;">Qty</th>'
        . '</tr></thead>'
        . '<tbody>' . $rows . '</tbody>'
        . '</table>'
        . '<p style="margin-top:20px;">Best regards,<br>Art Ratio Team</p>'
        . '</div>';
}

function buildEquipmentRequestCustomerReceivedEmailText(
    string $requestCode,
    string $customerName,
    string $customerPhone,
    string $notes,
    int $totalItems,
    array $items,
    bool $isArabic
): string {
    $lines = [];
    if ($isArabic) {
        $lines[] = 'مرحبًا ' . $customerName . '،';
        $lines[] = 'شكرًا لاختيارك أرت ريشيو.';
        $lines[] = 'تم استلام طلب المعدات الخاص بك وهو الآن قيد المراجعة.';
        $lines[] = 'رقم الطلب: ' . $requestCode;
        $lines[] = 'الجوال: ' . $customerPhone;
        $lines[] = 'إجمالي المعدات: ' . $totalItems;
        $lines[] = 'ملاحظاتك: ' . ($notes !== '' ? $notes : '-');
        $lines[] = '';
        $lines[] = 'قائمة المعدات:';
    } else {
        $lines[] = 'Hello ' . $customerName . ',';
        $lines[] = 'Thank you for choosing Art Ratio.';
        $lines[] = 'Your equipment request has been received and is now under review.';
        $lines[] = 'Request code: ' . $requestCode;
        $lines[] = 'Phone: ' . $customerPhone;
        $lines[] = 'Total quantity: ' . $totalItems;
        $lines[] = 'Your notes: ' . ($notes !== '' ? $notes : '-');
        $lines[] = '';
        $lines[] = 'Requested items:';
    }

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

    $lines[] = '';
    $lines[] = $isArabic ? 'فريق أرت ريشيو' : 'Art Ratio Team';
    return implode("\n", $lines);
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

function logEquipmentRequestEmailDelivery(PDO $pdo, int $requestId, array $delivery): void
{
    if ($requestId <= 0) {
        return;
    }

    ensureEquipmentRequestMessagesTableForCreate($pdo);

    $sent = !empty($delivery['sent']);
    $provider = (string) ($delivery['provider'] ?? '');
    $recipient = trim((string) ($delivery['recipient'] ?? ''));
    $subject = trim((string) ($delivery['subject'] ?? ''));
    $message = trim((string) ($delivery['message'] ?? ''));
    $error = trim((string) ($delivery['error'] ?? ''));

    if ($message === '') {
        $message = $sent
            ? 'Email delivery logged as sent.'
            : 'Email delivery failed.';
    }

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
            NULL,
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
        'request_id' => $requestId,
        'channel' => 'email',
        'subject' => $subject !== '' ? $subject : null,
        'message' => $message,
        'recipient' => $recipient !== '' ? $recipient : null,
        'delivery_status' => $sent ? 'sent' : 'failed',
        'provider' => $provider !== '' ? $provider : null,
        'error_message' => $error !== '' ? $error : null,
    ]);
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

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS equipment_request_code_counter (
            id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
            next_number INT UNSIGNED NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $ensured = true;
}

function ensureEquipmentRequestMessagesTableForCreate(PDO $pdo): void
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

function generateEquipmentRequestCode(PDO $pdo): string
{
    $seedNumber = max(1000, detectMaxEquipmentOrderNumber($pdo) + 1);

    $seedStatement = $pdo->prepare(
        'INSERT INTO equipment_request_code_counter (id, next_number)
         VALUES (1, :seed)
         ON DUPLICATE KEY UPDATE
         next_number = GREATEST(next_number, VALUES(next_number))'
    );
    $seedStatement->execute([
        'seed' => $seedNumber,
    ]);

    $selectStatement = $pdo->prepare(
        'SELECT next_number
         FROM equipment_request_code_counter
         WHERE id = 1
         FOR UPDATE'
    );
    $selectStatement->execute();
    $current = (int) $selectStatement->fetchColumn();
    if ($current < 1000) {
        $current = 1000;
    }

    $updateStatement = $pdo->prepare(
        'UPDATE equipment_request_code_counter
         SET next_number = :next_number
         WHERE id = 1'
    );
    $updateStatement->execute([
        'next_number' => $current + 1,
    ]);

    return 'Order #' . $current;
}

function detectMaxEquipmentOrderNumber(PDO $pdo): int
{
    $statement = $pdo->query(
        "SELECT MAX(CAST(SUBSTRING(request_code, 8) AS UNSIGNED))
         FROM equipment_requests
         WHERE request_code REGEXP '^Order #[0-9]+$'"
    );
    $value = (int) $statement->fetchColumn();
    return $value > 0 ? $value : 0;
}
