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
        ensureContactInquiryTables($pdo);
        ensureContactInquiryWorkflowColumns($pdo);
        ensureContactInquiryActivitiesTable($pdo);
        handleContactInquiryCreate($pdo);
    } catch (InvalidArgumentException $exception) {
        respondError($exception->getMessage(), 422);
    } catch (Throwable $exception) {
        respondError('Unexpected server error', 500, [
            'details' => $exception->getMessage(),
        ]);
    }
}

function handleContactInquiryCreate(PDO $pdo): void
{
    $payload = readContactJsonPayload();

    $fullName = normalizeContactText((string) ($payload['full_name'] ?? ''), 160);
    $companyName = normalizeContactText((string) ($payload['company_name'] ?? ''), 160);
    $email = strtolower(trim((string) ($payload['email'] ?? '')));
    $phone = normalizeContactText((string) ($payload['phone'] ?? ''), 80);
    $projectType = normalizeContactText((string) ($payload['project_type'] ?? ''), 160);
    $message = normalizeContactMultiline((string) ($payload['message'] ?? ''), 4000);
    $language = normalizeContactLanguage((string) ($payload['language'] ?? ''));
    $sourcePath = normalizeContactText((string) ($payload['source_path'] ?? ''), 255);

    if ($fullName === '' || $email === '' || $phone === '' || $message === '') {
        throw new InvalidArgumentException('Full name, email, phone, and message are required');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('Invalid email address');
    }

    $ipAddress = function_exists('getClientIpAddress')
        ? substr(getClientIpAddress(), 0, 45)
        : substr((string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0'), 0, 45);
    $userAgent = substr(trim((string) ($_SERVER['HTTP_USER_AGENT'] ?? '')), 0, 500);

    if (isContactInquiryRateLimited($pdo, $ipAddress, $email)) {
        respondError('Too many requests. Please wait before sending another message.', 429);
        return;
    }

    $pdo->beginTransaction();
    try {
        $inquiryCode = generateContactInquiryCode($pdo);

        $statement = $pdo->prepare(
            'INSERT INTO contact_inquiries (
                inquiry_code,
                full_name,
                company_name,
                email,
                phone,
                project_type,
                message,
                inquiry_lang,
                source_path,
                ip_address,
                user_agent,
                notification_attempted,
                notification_sent,
                raw_payload
            ) VALUES (
                :inquiry_code,
                :full_name,
                :company_name,
                :email,
                :phone,
                :project_type,
                :message,
                :inquiry_lang,
                :source_path,
                :ip_address,
                :user_agent,
                0,
                0,
                :raw_payload
            )'
        );
        $statement->execute([
            'inquiry_code' => $inquiryCode,
            'full_name' => $fullName,
            'company_name' => $companyName !== '' ? $companyName : null,
            'email' => $email,
            'phone' => $phone,
            'project_type' => $projectType !== '' ? $projectType : null,
            'message' => $message,
            'inquiry_lang' => $language,
            'source_path' => $sourcePath !== '' ? $sourcePath : null,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent !== '' ? $userAgent : null,
            'raw_payload' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ]);

        $inquiryId = (int) $pdo->lastInsertId();
        insertContactInquiryActivity($pdo, [
            'inquiry_id' => $inquiryId,
            'user_id' => null,
            'username' => 'website',
            'action_type' => 'created',
            'message' => 'Inquiry created from contact form.',
        ]);
        $pdo->commit();

        $emailResult = notifyContactTeamByEmail(
            $inquiryCode,
            $fullName,
            $companyName,
            $email,
            $phone,
            $projectType,
            $message,
            $language
        );

        try {
            updateContactInquiryNotificationStatus($pdo, $inquiryId, $emailResult);
        } catch (Throwable $loggingError) {
            error_log('Contact inquiry email update failure: ' . $loggingError->getMessage());
        }

        respond([
            'inquiry_code' => $inquiryCode,
            'stored' => true,
            'email_attempted' => true,
            'email_sent' => !empty($emailResult['sent']),
            'email_provider' => (string) ($emailResult['provider'] ?? 'none'),
            'email_error' => $emailResult['error'] ?? null,
            'required_fields' => ['full_name', 'email', 'phone', 'message'],
            'optional_fields' => ['company_name', 'project_type'],
        ], 201);
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $exception;
    }
}

function notifyContactTeamByEmail(
    string $inquiryCode,
    string $fullName,
    string $companyName,
    string $email,
    string $phone,
    string $projectType,
    string $message,
    string $language
): array {
    $subject = sprintf('New Contact Inquiry %s - %s', $inquiryCode, $fullName);
    $htmlBody = buildContactInquiryEmailHtml(
        $inquiryCode,
        $fullName,
        $companyName,
        $email,
        $phone,
        $projectType,
        $message,
        $language
    );
    $textBody = buildContactInquiryEmailText(
        $inquiryCode,
        $fullName,
        $companyName,
        $email,
        $phone,
        $projectType,
        $message,
        $language
    );

    $recipients = resolveContactInquiryRecipients();
    $sent = false;
    $provider = 'none';
    $lastError = null;

    foreach ($recipients as $recipient) {
        if (!is_string($recipient) || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
            continue;
        }

        $sendResult = sendContactInquiryEmailWithRetry(
            $recipient,
            'Art Ratio Team',
            $subject,
            $htmlBody,
            $textBody
        );

        if (!empty($sendResult['sent'])) {
            $sent = true;
            $provider = (string) ($sendResult['provider'] ?? 'smtp');
        } else {
            $lastError = (string) ($sendResult['error'] ?? ('Failed to send team email to ' . $recipient));
        }
    }

    return [
        'sent' => $sent,
        'provider' => $provider,
        'recipient' => implode(', ', $recipients),
        'subject' => $subject,
        'message' => $textBody,
        'error' => $sent ? null : ($lastError ?? 'Failed to send team notification'),
    ];
}

function sendContactInquiryEmailWithRetry(
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

    usleep(350000);
    $retrySent = sendEmail($toEmail, 'Art Ratio Team', $subject, $htmlBody, $textBody);
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

function buildContactInquiryEmailHtml(
    string $inquiryCode,
    string $fullName,
    string $companyName,
    string $email,
    string $phone,
    string $projectType,
    string $message,
    string $language
): string {
    $isArabic = $language !== 'en';
    $safeDirection = $isArabic ? 'rtl' : 'ltr';
    $safeAlign = $isArabic ? 'right' : 'left';
    $safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

    $rows = [
        buildContactInquiryRowHtml($isArabic ? 'رقم الطلب' : 'Inquiry Code', $inquiryCode),
        buildContactInquiryRowHtml($isArabic ? 'الاسم الكامل' : 'Full Name', $fullName),
        buildContactInquiryRowHtml($isArabic ? 'اسم الشركة' : 'Company Name', $companyName !== '' ? $companyName : '-'),
        buildContactInquiryRowHtml($isArabic ? 'البريد الإلكتروني' : 'Email', $email),
        buildContactInquiryRowHtml($isArabic ? 'رقم الجوال' : 'Phone', $phone),
        buildContactInquiryRowHtml($isArabic ? 'نوع المشروع' : 'Project Type', $projectType !== '' ? $projectType : '-'),
    ];

    return '<div style="font-family:Arial,sans-serif;line-height:1.8;color:#111827;direction:' . $safeDirection . ';text-align:' . $safeAlign . ';">'
        . '<h2 style="margin:0 0 16px;">' . htmlspecialchars($isArabic ? 'رسالة جديدة من صفحة تواصل معنا' : 'New contact inquiry from the website', ENT_QUOTES, 'UTF-8') . '</h2>'
        . '<table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">'
        . '<tbody>' . implode('', $rows) . '</tbody>'
        . '</table>'
        . '<div style="margin-top:18px;">'
        . '<p style="margin:0 0 8px;font-weight:700;">' . htmlspecialchars($isArabic ? 'تفاصيل الرسالة' : 'Message Details', ENT_QUOTES, 'UTF-8') . '</p>'
        . '<div style="padding:14px 16px;border:1px solid #e5e7eb;border-radius:10px;background:#f9fafb;">' . $safeMessage . '</div>'
        . '</div>'
        . '</div>';
}

function buildContactInquiryRowHtml(string $label, string $value): string
{
    return '<tr>'
        . '<th style="padding:10px 12px;border:1px solid #e5e7eb;background:#f3f4f6;font-weight:700;text-align:start;">'
        . htmlspecialchars($label, ENT_QUOTES, 'UTF-8')
        . '</th>'
        . '<td style="padding:10px 12px;border:1px solid #e5e7eb;">'
        . htmlspecialchars($value, ENT_QUOTES, 'UTF-8')
        . '</td>'
        . '</tr>';
}

function buildContactInquiryEmailText(
    string $inquiryCode,
    string $fullName,
    string $companyName,
    string $email,
    string $phone,
    string $projectType,
    string $message,
    string $language
): string {
    $isArabic = $language !== 'en';
    $lines = [];
    $lines[] = $isArabic ? 'رسالة جديدة من صفحة تواصل معنا' : 'New contact inquiry from the website';
    $lines[] = ($isArabic ? 'رقم الطلب: ' : 'Inquiry Code: ') . $inquiryCode;
    $lines[] = ($isArabic ? 'الاسم الكامل: ' : 'Full Name: ') . $fullName;
    $lines[] = ($isArabic ? 'اسم الشركة: ' : 'Company Name: ') . ($companyName !== '' ? $companyName : '-');
    $lines[] = ($isArabic ? 'البريد الإلكتروني: ' : 'Email: ') . $email;
    $lines[] = ($isArabic ? 'رقم الجوال: ' : 'Phone: ') . $phone;
    $lines[] = ($isArabic ? 'نوع المشروع: ' : 'Project Type: ') . ($projectType !== '' ? $projectType : '-');
    $lines[] = '';
    $lines[] = $isArabic ? 'تفاصيل الرسالة:' : 'Message Details:';
    $lines[] = $message;
    return implode("\n", $lines);
}

function resolveContactInquiryRecipients(): array
{
    $configured = getAppConfig('contact', 'notification_emails', []);
    $recipients = is_array($configured) ? array_values(array_filter(array_map('trim', $configured))) : [];

    $notificationAdmins = getAppConfig('notifications', 'admin_emails', []);
    if (is_array($notificationAdmins)) {
        foreach ($notificationAdmins as $email) {
            $email = trim((string) $email);
            if ($email !== '') {
                $recipients[] = $email;
            }
        }
    }

    $recipients[] = 'ammar@art-ratio.com';

    $recipients = array_values(array_unique(array_filter($recipients, static function ($value): bool {
        return is_string($value) && filter_var($value, FILTER_VALIDATE_EMAIL);
    })));

    return $recipients ?: ['ammar@art-ratio.com'];
}

function updateContactInquiryNotificationStatus(PDO $pdo, int $inquiryId, array $delivery): void
{
    if ($inquiryId <= 0) {
        return;
    }

    $statement = $pdo->prepare(
        'UPDATE contact_inquiries
         SET notification_attempted = 1,
             notification_sent = :notification_sent,
             notification_provider = :notification_provider,
             notification_recipient = :notification_recipient,
             notification_subject = :notification_subject,
             notification_error = :notification_error,
             notified_at = CASE WHEN :notification_sent = 1 THEN NOW() ELSE notified_at END
         WHERE id = :id'
    );
    $statement->execute([
        'id' => $inquiryId,
        'notification_sent' => !empty($delivery['sent']) ? 1 : 0,
        'notification_provider' => trim((string) ($delivery['provider'] ?? '')) ?: null,
        'notification_recipient' => trim((string) ($delivery['recipient'] ?? '')) ?: null,
        'notification_subject' => trim((string) ($delivery['subject'] ?? '')) ?: null,
        'notification_error' => trim((string) ($delivery['error'] ?? '')) ?: null,
    ]);
}

function isContactInquiryRateLimited(PDO $pdo, string $ipAddress, string $email): bool
{
    $statement = $pdo->prepare(
        'SELECT COUNT(*)
         FROM contact_inquiries
         WHERE (ip_address = :ip_address OR email = :email)
           AND created_at >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)'
    );
    $statement->execute([
        'ip_address' => $ipAddress,
        'email' => $email,
    ]);

    return (int) $statement->fetchColumn() >= 5;
}

function ensureContactInquiryTables(PDO $pdo): void
{
    static $ensured = false;
    if ($ensured) {
        return;
    }

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS contact_inquiries (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            inquiry_code VARCHAR(40) NOT NULL,
            full_name VARCHAR(160) NOT NULL,
            company_name VARCHAR(160) NULL,
            email VARCHAR(190) NOT NULL,
            phone VARCHAR(80) NOT NULL,
            project_type VARCHAR(160) NULL,
            message TEXT NOT NULL,
            status VARCHAR(30) NOT NULL DEFAULT 'new',
            internal_notes TEXT NULL,
            assigned_user_id BIGINT UNSIGNED NULL,
            assigned_username VARCHAR(120) NULL,
            follow_up_at DATETIME NULL,
            last_contacted_at DATETIME NULL,
            closed_at DATETIME NULL,
            inquiry_lang VARCHAR(5) NOT NULL DEFAULT 'ar',
            source_path VARCHAR(255) NULL,
            ip_address VARCHAR(45) NOT NULL,
            user_agent VARCHAR(500) NULL,
            notification_attempted TINYINT(1) NOT NULL DEFAULT 0,
            notification_sent TINYINT(1) NOT NULL DEFAULT 0,
            notification_provider VARCHAR(50) NULL,
            notification_recipient VARCHAR(500) NULL,
            notification_subject VARCHAR(255) NULL,
            notification_error TEXT NULL,
            notified_at DATETIME NULL,
            raw_payload JSON NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY uq_contact_inquiries_code (inquiry_code),
            KEY idx_contact_inquiries_created_at (created_at),
            KEY idx_contact_inquiries_email (email),
            KEY idx_contact_inquiries_ip (ip_address),
            KEY idx_contact_inquiries_status (status),
            KEY idx_contact_inquiries_follow_up_at (follow_up_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS contact_inquiry_code_counter (
            id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
            next_number INT UNSIGNED NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $ensured = true;
}

function ensureContactInquiryWorkflowColumns(PDO $pdo): void
{
    static $ensured = false;
    if ($ensured) {
        return;
    }

    $columns = [
        'status' => "ALTER TABLE contact_inquiries ADD COLUMN status VARCHAR(30) NOT NULL DEFAULT 'new' AFTER message",
        'internal_notes' => "ALTER TABLE contact_inquiries ADD COLUMN internal_notes TEXT NULL AFTER status",
        'assigned_user_id' => "ALTER TABLE contact_inquiries ADD COLUMN assigned_user_id BIGINT UNSIGNED NULL AFTER internal_notes",
        'assigned_username' => "ALTER TABLE contact_inquiries ADD COLUMN assigned_username VARCHAR(120) NULL AFTER assigned_user_id",
        'follow_up_at' => "ALTER TABLE contact_inquiries ADD COLUMN follow_up_at DATETIME NULL AFTER assigned_username",
        'last_contacted_at' => "ALTER TABLE contact_inquiries ADD COLUMN last_contacted_at DATETIME NULL AFTER follow_up_at",
        'closed_at' => "ALTER TABLE contact_inquiries ADD COLUMN closed_at DATETIME NULL AFTER last_contacted_at",
    ];

    foreach ($columns as $name => $ddl) {
        $statement = $pdo->prepare('SHOW COLUMNS FROM contact_inquiries LIKE :name');
        $statement->execute(['name' => $name]);
        if (!$statement->fetch()) {
            $pdo->exec($ddl);
        }
    }

    $pdo->exec("UPDATE contact_inquiries SET status = 'new' WHERE status IS NULL OR TRIM(status) = ''");

    try {
        $pdo->exec('CREATE INDEX idx_contact_inquiries_status ON contact_inquiries (status)');
    } catch (Throwable $ignored) {
    }

    try {
        $pdo->exec('CREATE INDEX idx_contact_inquiries_follow_up_at ON contact_inquiries (follow_up_at)');
    } catch (Throwable $ignored) {
    }

    $ensured = true;
}

function ensureContactInquiryActivitiesTable(PDO $pdo): void
{
    static $ensured = false;
    if ($ensured) {
        return;
    }

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS contact_inquiry_activities (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            inquiry_id BIGINT UNSIGNED NOT NULL,
            user_id BIGINT UNSIGNED NULL,
            username VARCHAR(120) NULL,
            action_type VARCHAR(40) NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY idx_contact_inquiry_activities_inquiry (inquiry_id),
            KEY idx_contact_inquiry_activities_created_at (created_at),
            CONSTRAINT fk_contact_inquiry_activities_inquiry
                FOREIGN KEY (inquiry_id) REFERENCES contact_inquiries(id)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $ensured = true;
}

function insertContactInquiryActivity(PDO $pdo, array $activity): void
{
    $inquiryId = isset($activity['inquiry_id']) ? (int) $activity['inquiry_id'] : 0;
    if ($inquiryId <= 0) {
        return;
    }

    ensureContactInquiryActivitiesTable($pdo);

    $statement = $pdo->prepare(
        'INSERT INTO contact_inquiry_activities (
            inquiry_id,
            user_id,
            username,
            action_type,
            message
        ) VALUES (
            :inquiry_id,
            :user_id,
            :username,
            :action_type,
            :message
        )'
    );
    $statement->execute([
        'inquiry_id' => $inquiryId,
        'user_id' => isset($activity['user_id']) && (int) $activity['user_id'] > 0 ? (int) $activity['user_id'] : null,
        'username' => trim((string) ($activity['username'] ?? '')) !== '' ? trim((string) ($activity['username'] ?? '')) : null,
        'action_type' => trim((string) ($activity['action_type'] ?? 'note')) ?: 'note',
        'message' => trim((string) ($activity['message'] ?? 'Activity recorded.')) ?: 'Activity recorded.',
    ]);
}

function normalizeContactAdminStatus(string $value): string
{
    $value = strtolower(trim($value));
    $allowed = ['new', 'in_progress', 'contacted', 'won', 'lost', 'closed'];
    return in_array($value, $allowed, true) ? $value : '';
}

function normalizeContactDateTime(?string $value): ?string
{
    $raw = trim((string) ($value ?? ''));
    if ($raw === '') {
        return null;
    }

    if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $raw)) {
        $raw .= ' 00:00:00';
    } elseif (preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/', $raw)) {
        $raw = str_replace('T', ' ', $raw) . ':00';
    } else {
        $raw = str_replace('T', ' ', $raw);
    }

    $date = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $raw);
    if (!$date) {
        throw new InvalidArgumentException('Invalid follow-up date');
    }

    return $date->format('Y-m-d H:i:s');
}

function generateContactInquiryCode(PDO $pdo): string
{
    $statement = $pdo->prepare('SELECT next_number FROM contact_inquiry_code_counter WHERE id = 1 FOR UPDATE');
    $statement->execute();
    $current = $statement->fetchColumn();

    if ($current === false) {
        $nextNumber = 1;
        $insert = $pdo->prepare('INSERT INTO contact_inquiry_code_counter (id, next_number) VALUES (1, 2)');
        $insert->execute();
    } else {
        $nextNumber = max(1, (int) $current);
        $update = $pdo->prepare('UPDATE contact_inquiry_code_counter SET next_number = :next_number WHERE id = 1');
        $update->execute([
            'next_number' => $nextNumber + 1,
        ]);
    }

    return sprintf('CNT-%s-%04d', (new DateTimeImmutable())->format('Ymd'), $nextNumber);
}

function readContactJsonPayload(): array
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

function normalizeContactText(string $value, int $maxLength): string
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

function normalizeContactMultiline(string $value, int $maxLength): string
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

function normalizeContactLanguage(string $value): string
{
    $value = strtolower(trim($value));
    return $value === 'en' ? 'en' : 'ar';
}
