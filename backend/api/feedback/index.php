<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/email.php';
require_once __DIR__ . '/../../services/brand_email.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if (!defined('API_INCLUDE_MODE')) {
    try {
        if ($method !== 'POST') {
            respondError('Method not allowed', 405);
            return;
        }

        $pdo = getDatabaseConnection();
        ensureFeedbackSubmissionTables($pdo);
        handleFeedbackSubmissionCreate($pdo);
    } catch (InvalidArgumentException $exception) {
        respondError($exception->getMessage(), 422);
    } catch (Throwable $exception) {
        respondError('Unexpected server error', 500, [
            'details' => $exception->getMessage(),
        ]);
    }
}

function handleFeedbackSubmissionCreate(PDO $pdo): void
{
    $payload = readFeedbackJsonPayload();

    $fullName = normalizeFeedbackText((string) ($payload['full_name'] ?? ''), 160);
    $email = strtolower(trim((string) ($payload['email'] ?? '')));
    $companyName = normalizeFeedbackText((string) ($payload['company_name'] ?? ''), 160);
    $serviceType = normalizeFeedbackServiceType((string) ($payload['service_type'] ?? ''));
    $overallRating = normalizeFeedbackRating($payload['overall_rating'] ?? null);
    $recommendation = normalizeFeedbackRecommendation((string) ($payload['recommendation'] ?? ''));
    $feedbackMessage = normalizeFeedbackMultiline((string) ($payload['feedback_message'] ?? ''), 4000);
    $language = normalizeFeedbackLanguage((string) ($payload['language'] ?? ''));
    $sourcePath = normalizeFeedbackText((string) ($payload['source_path'] ?? ''), 255);

    if ($fullName === '' || $overallRating === 0 || $feedbackMessage === '') {
        throw new InvalidArgumentException('Full name, overall rating, and feedback are required');
    }

    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('Invalid email address');
    }

    $ipAddress = function_exists('getClientIpAddress')
        ? substr(getClientIpAddress(), 0, 45)
        : substr((string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0'), 0, 45);
    $userAgent = substr(trim((string) ($_SERVER['HTTP_USER_AGENT'] ?? '')), 0, 500);

    if (isFeedbackSubmissionRateLimited($pdo, $ipAddress, $email)) {
        respondError('Too many requests. Please wait before sending another feedback.', 429);
        return;
    }

    $pdo->beginTransaction();
    try {
        $feedbackCode = generateFeedbackSubmissionCode($pdo);
        $statement = $pdo->prepare(
            'INSERT INTO feedback_submissions (
                feedback_code,
                full_name,
                email,
                company_name,
                service_type,
                overall_rating,
                recommendation,
                feedback_message,
                feedback_lang,
                source_path,
                ip_address,
                user_agent,
                notification_attempted,
                notification_sent,
                raw_payload
            ) VALUES (
                :feedback_code,
                :full_name,
                :email,
                :company_name,
                :service_type,
                :overall_rating,
                :recommendation,
                :feedback_message,
                :feedback_lang,
                :source_path,
                :ip_address,
                :user_agent,
                0,
                0,
                :raw_payload
            )'
        );
        $statement->execute([
            'feedback_code' => $feedbackCode,
            'full_name' => $fullName,
            'email' => $email !== '' ? $email : null,
            'company_name' => $companyName !== '' ? $companyName : null,
            'service_type' => $serviceType !== '' ? $serviceType : null,
            'overall_rating' => $overallRating,
            'recommendation' => $recommendation !== '' ? $recommendation : null,
            'feedback_message' => $feedbackMessage,
            'feedback_lang' => $language,
            'source_path' => $sourcePath !== '' ? $sourcePath : null,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent !== '' ? $userAgent : null,
            'raw_payload' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ]);
        $feedbackId = (int) $pdo->lastInsertId();
        $pdo->commit();

        $teamEmailResult = notifyFeedbackTeamByEmail(
            $feedbackCode,
            $fullName,
            $email,
            $companyName,
            $serviceType,
            $overallRating,
            $recommendation,
            $feedbackMessage,
            $language
        );

        try {
            updateFeedbackSubmissionNotificationStatus($pdo, $feedbackId, $teamEmailResult);
        } catch (Throwable $loggingError) {
            error_log('Feedback email update failure: ' . $loggingError->getMessage());
        }

        $customerEmailResult = ['attempted' => false, 'sent' => false, 'provider' => 'none', 'error' => null];
        if ($email !== '') {
            $customerEmailResult = notifyFeedbackCustomerByEmail(
                $feedbackCode,
                $fullName,
                $email,
                $serviceType,
                $overallRating,
                $language
            );
        }

        respond([
            'feedback_code' => $feedbackCode,
            'stored' => true,
            'email_attempted' => true,
            'email_sent' => !empty($teamEmailResult['sent']),
            'email_provider' => (string) ($teamEmailResult['provider'] ?? 'none'),
            'email_error' => $teamEmailResult['error'] ?? null,
            'customer_email_attempted' => !empty($customerEmailResult['attempted']),
            'customer_email_sent' => !empty($customerEmailResult['sent']),
            'customer_email_provider' => (string) ($customerEmailResult['provider'] ?? 'none'),
            'customer_email_error' => $customerEmailResult['error'] ?? null,
            'required_fields' => ['full_name', 'overall_rating', 'feedback_message'],
            'optional_fields' => ['email', 'company_name', 'service_type', 'recommendation'],
        ], 201);
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $exception;
    }
}

function notifyFeedbackTeamByEmail(
    string $feedbackCode,
    string $fullName,
    string $email,
    string $companyName,
    string $serviceType,
    int $overallRating,
    string $recommendation,
    string $feedbackMessage,
    string $language
): array {
    $isArabic = $language !== 'en';
    $subject = sprintf('%s %s - %s', $isArabic ? 'تقييم عميل جديد' : 'New client feedback', $feedbackCode, $fullName);
    $htmlBody = buildFeedbackTeamEmailHtml(
        $feedbackCode,
        $fullName,
        $email,
        $companyName,
        $serviceType,
        $overallRating,
        $recommendation,
        $feedbackMessage,
        $isArabic
    );
    $textBody = buildFeedbackTeamEmailText(
        $feedbackCode,
        $fullName,
        $email,
        $companyName,
        $serviceType,
        $overallRating,
        $recommendation,
        $feedbackMessage,
        $isArabic
    );

    $recipients = resolveFeedbackRecipients();
    $sent = false;
    $provider = 'none';
    $lastError = null;

    foreach ($recipients as $recipient) {
        $sendResult = sendFeedbackEmailWithRetry($recipient, 'Art Ratio Team', $subject, $htmlBody, $textBody);
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
        'error' => $sent ? null : ($lastError ?? 'Failed to send feedback notification'),
    ];
}

function notifyFeedbackCustomerByEmail(
    string $feedbackCode,
    string $fullName,
    string $email,
    string $serviceType,
    int $overallRating,
    string $language
): array {
    $isArabic = $language !== 'en';
    $subject = $isArabic ? 'شكرًا على تقييمك لأرت ريشيو' : 'Thank you for your feedback to Art Ratio';
    $htmlBody = buildFeedbackCustomerEmailHtml($feedbackCode, $fullName, $serviceType, $overallRating, $isArabic);
    $textBody = buildFeedbackCustomerEmailText($feedbackCode, $fullName, $serviceType, $overallRating, $isArabic);
    $sendResult = sendFeedbackEmailWithRetry(
        $email,
        $fullName !== '' ? $fullName : ($isArabic ? 'عميل أرت ريشيو' : 'Art Ratio Customer'),
        $subject,
        $htmlBody,
        $textBody
    );

    return [
        'attempted' => true,
        'sent' => !empty($sendResult['sent']),
        'provider' => (string) ($sendResult['provider'] ?? 'none'),
        'error' => $sendResult['error'] ?? null,
    ];
}

function sendFeedbackEmailWithRetry(
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

    $retrySent = sendEmail($toEmail, $toName, $subject, $htmlBody, $textBody);
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

function buildFeedbackTeamEmailHtml(
    string $feedbackCode,
    string $fullName,
    string $email,
    string $companyName,
    string $serviceType,
    int $overallRating,
    string $recommendation,
    string $feedbackMessage,
    bool $isArabic
): string {
    $serviceLabel = resolveFeedbackServiceLabel($serviceType, $isArabic);
    $recommendationLabel = resolveFeedbackRecommendationLabel($recommendation, $isArabic);
    $safeMessage = nl2br(htmlspecialchars($feedbackMessage, ENT_QUOTES, 'UTF-8'));

    $rows = [
        buildFeedbackRowHtml($isArabic ? 'رقم التقييم' : 'Feedback Code', $feedbackCode),
        buildFeedbackRowHtml($isArabic ? 'الاسم الكامل' : 'Full Name', $fullName),
        buildFeedbackRowHtml($isArabic ? 'البريد الإلكتروني' : 'Email', $email !== '' ? $email : '-'),
        buildFeedbackRowHtml($isArabic ? 'اسم الشركة' : 'Company Name', $companyName !== '' ? $companyName : '-'),
        buildFeedbackRowHtml($isArabic ? 'الخدمة' : 'Service', $serviceLabel),
        buildFeedbackRowHtml($isArabic ? 'التقييم العام' : 'Overall Rating', $overallRating . ' / 5'),
        buildFeedbackRowHtml($isArabic ? 'التوصية' : 'Recommendation', $recommendationLabel),
    ];

    $body = '<div style="line-height:1.8;">'
        . '<p>' . htmlspecialchars($isArabic ? 'وصلكم تقييم جديد من أحد العملاء.' : 'A new client feedback has been received.', ENT_QUOTES, 'UTF-8') . '</p>'
        . '<table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">'
        . '<tbody>' . implode('', $rows) . '</tbody>'
        . '</table>'
        . '<div style="margin-top:18px;">'
        . '<p style="margin:0 0 8px;font-weight:700;">' . htmlspecialchars($isArabic ? 'نص التقييم' : 'Feedback message', ENT_QUOTES, 'UTF-8') . '</p>'
        . '<div style="padding:14px 16px;border:1px solid #e5e7eb;border-radius:10px;background:#f9fafb;">' . $safeMessage . '</div>'
        . '</div>'
        . '</div>';

    return buildBrandEmailShellHtml($body, $isArabic, $isArabic ? 'Feedback' : 'Feedback');
}

function buildFeedbackTeamEmailText(
    string $feedbackCode,
    string $fullName,
    string $email,
    string $companyName,
    string $serviceType,
    int $overallRating,
    string $recommendation,
    string $feedbackMessage,
    bool $isArabic
): string {
    $lines = [];
    $lines[] = $isArabic ? 'وصلكم تقييم جديد من أحد العملاء.' : 'A new client feedback has been received.';
    $lines[] = ($isArabic ? 'رقم التقييم: ' : 'Feedback code: ') . $feedbackCode;
    $lines[] = ($isArabic ? 'الاسم الكامل: ' : 'Full name: ') . $fullName;
    $lines[] = ($isArabic ? 'البريد الإلكتروني: ' : 'Email: ') . ($email !== '' ? $email : '-');
    $lines[] = ($isArabic ? 'اسم الشركة: ' : 'Company name: ') . ($companyName !== '' ? $companyName : '-');
    $lines[] = ($isArabic ? 'الخدمة: ' : 'Service: ') . resolveFeedbackServiceLabel($serviceType, $isArabic);
    $lines[] = ($isArabic ? 'التقييم العام: ' : 'Overall rating: ') . $overallRating . ' / 5';
    $lines[] = ($isArabic ? 'التوصية: ' : 'Recommendation: ') . resolveFeedbackRecommendationLabel($recommendation, $isArabic);
    $lines[] = '';
    $lines[] = $isArabic ? 'نص التقييم:' : 'Feedback message:';
    $lines[] = $feedbackMessage;
    return implode("\n", $lines);
}

function buildFeedbackCustomerEmailHtml(
    string $feedbackCode,
    string $fullName,
    string $serviceType,
    int $overallRating,
    bool $isArabic
): string {
    $safeName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
    $safeCode = htmlspecialchars($feedbackCode, ENT_QUOTES, 'UTF-8');
    $serviceLabel = htmlspecialchars(resolveFeedbackServiceLabel($serviceType, $isArabic), ENT_QUOTES, 'UTF-8');

    if ($isArabic) {
        $body = '<div style="line-height:1.8;">'
            . '<p>مرحبًا ' . $safeName . '،</p>'
            . '<p>شكرًا لمشاركة رأيك مع <strong>فريق أرت ريشيو</strong>.</p>'
            . '<p>تم استلام تقييمك بنجاح، وسنراجع ملاحظاتك بعناية لأنها تساعدنا على تحسين خدماتنا بشكل مستمر.</p>'
            . '<p><strong>رقم التقييم:</strong> ' . $safeCode . '<br>'
            . '<strong>التقييم العام:</strong> ' . $overallRating . ' / 5<br>'
            . '<strong>الخدمة:</strong> ' . $serviceLabel . '</p>'
            . '<p>نقدّر وقتك وثقتك، ونتطلع لخدمتك مرة أخرى.</p>'
            . buildBrandEmailClosingHtml(true)
            . '</div>';

        return buildBrandEmailShellHtml($body, true, 'Feedback');
    }

    $body = '<div style="line-height:1.8;">'
        . '<p>Hello ' . $safeName . ',</p>'
        . '<p>Thank you for sharing your feedback with <strong>Art Ratio</strong>.</p>'
        . '<p>We have received your feedback successfully, and we will review it carefully because it helps us improve our service continuously.</p>'
        . '<p><strong>Feedback code:</strong> ' . $safeCode . '<br>'
        . '<strong>Overall rating:</strong> ' . $overallRating . ' / 5<br>'
        . '<strong>Service:</strong> ' . $serviceLabel . '</p>'
        . '<p>We appreciate your time and trust, and we look forward to serving you again.</p>'
        . buildBrandEmailClosingHtml(false)
        . '</div>';

    return buildBrandEmailShellHtml($body, false, 'Feedback');
}

function buildFeedbackCustomerEmailText(
    string $feedbackCode,
    string $fullName,
    string $serviceType,
    int $overallRating,
    bool $isArabic
): string {
    $lines = [];
    if ($isArabic) {
        $lines[] = 'مرحبًا ' . $fullName . '،';
        $lines[] = 'شكرًا لمشاركة رأيك مع فريق أرت ريشيو.';
        $lines[] = 'تم استلام تقييمك بنجاح وسنراجع ملاحظاتك بعناية.';
        $lines[] = 'رقم التقييم: ' . $feedbackCode;
        $lines[] = 'التقييم العام: ' . $overallRating . ' / 5';
        $lines[] = 'الخدمة: ' . resolveFeedbackServiceLabel($serviceType, true);
    } else {
        $lines[] = 'Hello ' . $fullName . ',';
        $lines[] = 'Thank you for sharing your feedback with Art Ratio.';
        $lines[] = 'We have received your feedback successfully and will review it carefully.';
        $lines[] = 'Feedback code: ' . $feedbackCode;
        $lines[] = 'Overall rating: ' . $overallRating . ' / 5';
        $lines[] = 'Service: ' . resolveFeedbackServiceLabel($serviceType, false);
    }

    $lines[] = '';
    $lines[] = buildBrandEmailClosingText($isArabic);
    $lines[] = '';
    $lines[] = buildBrandEmailFooterText($isArabic);
    return implode("\n", $lines);
}

function buildFeedbackRowHtml(string $label, string $value): string
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

function resolveFeedbackRecipients(): array
{
    $configured = getAppConfig('feedback', 'notification_emails', []);
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

function updateFeedbackSubmissionNotificationStatus(PDO $pdo, int $feedbackId, array $delivery): void
{
    if ($feedbackId <= 0) {
        return;
    }

    $statement = $pdo->prepare(
        'UPDATE feedback_submissions
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
        'id' => $feedbackId,
        'notification_sent' => !empty($delivery['sent']) ? 1 : 0,
        'notification_provider' => trim((string) ($delivery['provider'] ?? '')) ?: null,
        'notification_recipient' => trim((string) ($delivery['recipient'] ?? '')) ?: null,
        'notification_subject' => trim((string) ($delivery['subject'] ?? '')) ?: null,
        'notification_error' => trim((string) ($delivery['error'] ?? '')) ?: null,
    ]);
}

function isFeedbackSubmissionRateLimited(PDO $pdo, string $ipAddress, string $email): bool
{
    $sql = 'SELECT COUNT(*)
            FROM feedback_submissions
            WHERE ip_address = :ip_address
              AND created_at >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)';
    $params = ['ip_address' => $ipAddress];

    if ($email !== '') {
        $sql = 'SELECT COUNT(*)
                FROM feedback_submissions
                WHERE (ip_address = :ip_address OR email = :email)
                  AND created_at >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)';
        $params['email'] = $email;
    }

    $statement = $pdo->prepare($sql);
    $statement->execute($params);
    return (int) $statement->fetchColumn() >= 5;
}

function ensureFeedbackSubmissionTables(PDO $pdo): void
{
    static $ensured = false;
    if ($ensured) {
        return;
    }

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS feedback_submissions (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            feedback_code VARCHAR(40) NOT NULL,
            full_name VARCHAR(160) NOT NULL,
            email VARCHAR(190) NULL,
            company_name VARCHAR(160) NULL,
            service_type VARCHAR(120) NULL,
            overall_rating TINYINT UNSIGNED NOT NULL,
            recommendation VARCHAR(10) NULL,
            feedback_message TEXT NOT NULL,
            feedback_lang VARCHAR(5) NOT NULL DEFAULT 'ar',
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
            UNIQUE KEY uq_feedback_submissions_code (feedback_code),
            KEY idx_feedback_submissions_created_at (created_at),
            KEY idx_feedback_submissions_email (email),
            KEY idx_feedback_submissions_ip (ip_address),
            KEY idx_feedback_submissions_rating (overall_rating)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS feedback_submission_code_counter (
            id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
            next_number INT UNSIGNED NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $ensured = true;
}

function generateFeedbackSubmissionCode(PDO $pdo): string
{
    $statement = $pdo->prepare('SELECT next_number FROM feedback_submission_code_counter WHERE id = 1 FOR UPDATE');
    $statement->execute();
    $current = $statement->fetchColumn();

    if ($current === false) {
        $nextNumber = 1000;
        $insert = $pdo->prepare('INSERT INTO feedback_submission_code_counter (id, next_number) VALUES (1, 1001)');
        $insert->execute();
    } else {
        $nextNumber = max(1000, (int) $current);
        $update = $pdo->prepare('UPDATE feedback_submission_code_counter SET next_number = :next_number WHERE id = 1');
        $update->execute([
            'next_number' => $nextNumber + 1,
        ]);
    }

    return sprintf('FDBK# %d', $nextNumber);
}

function readFeedbackJsonPayload(): array
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

function normalizeFeedbackText(string $value, int $maxLength): string
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

function normalizeFeedbackMultiline(string $value, int $maxLength): string
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

function normalizeFeedbackServiceType(string $value): string
{
    $value = strtolower(trim($value));
    $allowed = [
        'production_consultancy',
        'commercial_photography',
        'events_coverage',
        'social_media_content',
        'tv_commercial_ads',
        'equipment_rental',
    ];

    return in_array($value, $allowed, true) ? $value : '';
}

function normalizeFeedbackRating(mixed $value): int
{
    $rating = (int) $value;
    return $rating >= 1 && $rating <= 5 ? $rating : 0;
}

function normalizeFeedbackRecommendation(string $value): string
{
    $value = strtolower(trim($value));
    if (in_array($value, ['yes', 'y', '1'], true)) {
        return 'yes';
    }
    if (in_array($value, ['no', 'n', '0'], true)) {
        return 'no';
    }

    return '';
}

function normalizeFeedbackLanguage(string $value): string
{
    $value = strtolower(trim($value));
    return $value === 'en' ? 'en' : 'ar';
}

function resolveFeedbackServiceLabel(string $serviceType, bool $isArabic): string
{
    $labels = [
        'production_consultancy' => $isArabic ? 'الاستشارات الإنتاجية' : 'Production Consultancy',
        'commercial_photography' => $isArabic ? 'التصوير التجاري' : 'Commercial Photography',
        'events_coverage' => $isArabic ? 'تغطية الفعاليات' : 'Events Coverage',
        'social_media_content' => $isArabic ? 'محتوى السوشال ميديا' : 'Social Media Content',
        'tv_commercial_ads' => $isArabic ? 'الإعلانات التلفزيونية والتجارية' : 'TV & Commercial Ads',
        'equipment_rental' => $isArabic ? 'تأجير المعدات' : 'Equipment Rental',
    ];

    if ($serviceType === '') {
        return '-';
    }

    return $labels[$serviceType] ?? $serviceType;
}

function resolveFeedbackRecommendationLabel(string $recommendation, bool $isArabic): string
{
    if ($recommendation === 'yes') {
        return $isArabic ? 'نعم' : 'Yes';
    }
    if ($recommendation === 'no') {
        return $isArabic ? 'لا' : 'No';
    }

    return '-';
}
