<?php
declare(strict_types=1);

// Lightweight last-error storage for email providers
function emailSetLastError(string $message): void
{
    $GLOBALS['email_last_error'] = $message;
}

function emailGetLastError(): ?string
{
    $err = $GLOBALS['email_last_error'] ?? null;
    return is_string($err) && $err !== '' ? $err : null;
}

/**
 * Returns validated email config from app config.
 */
function getEmailConfig(): array
{
    $config = getAppConfig('email') ?? [];

    $enabled = (bool)($config['enabled'] ?? false);
    $provider = strtolower(trim((string)($config['provider'] ?? '')));

    if (!$enabled) {
        return [
            'enabled' => false,
        ];
    }

    if ($provider === 'sendgrid') {
        $apiKey = trim((string)($config['sendgrid_api_key'] ?? ''));
        $fromEmail = trim((string)($config['from_email'] ?? ''));
        $fromName = trim((string)($config['from_name'] ?? ''));

        if ($apiKey === '' || $fromEmail === '') {
            throw new RuntimeException('Email is enabled but SendGrid config is incomplete.');
        }

        return [
            'enabled' => true,
            'provider' => 'sendgrid',
            'api_key' => $apiKey,
            'from_email' => $fromEmail,
            'from_name' => $fromName !== '' ? $fromName : $fromEmail,
        ];
    }

    if ($provider === 'phpmail') {
        $fromEmail = trim((string)($config['from_email'] ?? ''));
        $fromName = trim((string)($config['from_name'] ?? ''));

        if ($fromEmail === '') {
            throw new RuntimeException('Email is enabled but from_email is not configured.');
        }

        return [
            'enabled' => true,
            'provider' => 'phpmail',
            'from_email' => $fromEmail,
            'from_name' => $fromName !== '' ? $fromName : $fromEmail,
        ];
    }

    throw new RuntimeException('Email provider is not supported or not configured.');
}

/**
 * Sends an email using the configured provider.
 * Returns true on success, false on failure.
 */
function sendEmail(string $toEmail, string $toName, string $subject, string $htmlBody, ?string $textBody = null): bool
{
    try {
        $cfg = getEmailConfig();
    } catch (Throwable $e) {
        error_log('Email config error: ' . $e->getMessage());
        emailSetLastError('Email config error: ' . $e->getMessage());
        return false;
    }

    if (empty($cfg['enabled'])) {
        return false;
    }

    $toEmail = trim($toEmail);
    if ($toEmail === '' || !filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    $subject = trim($subject);
    $toName = trim($toName);
    $textBody = $textBody ?? strip_tags($htmlBody);

    if ($cfg['provider'] === 'sendgrid') {
        return sendEmailViaSendGrid(
            $cfg['api_key'],
            $cfg['from_email'],
            $cfg['from_name'],
            $toEmail,
            $toName,
            $subject,
            $htmlBody,
            $textBody
        );
    }

    if ($cfg['provider'] === 'phpmail') {
        return sendEmailViaPhpMail(
            $cfg['from_email'],
            $cfg['from_name'],
            $toEmail,
            $toName,
            $subject,
            $htmlBody,
            $textBody ?? strip_tags($htmlBody)
        );
    }

    return false;
}

function sendEmailViaSendGrid(
    string $apiKey,
    string $fromEmail,
    string $fromName,
    string $toEmail,
    string $toName,
    string $subject,
    string $htmlBody,
    string $textBody
): bool {
    if (!extension_loaded('curl')) {
        error_log('curl extension is required for SendGrid.');
        emailSetLastError('curl extension is required for SendGrid');
        return false;
    }

    $payload = [
        'personalizations' => [[
            'to' => [[
                'email' => $toEmail,
                'name' => $toName !== '' ? $toName : $toEmail,
            ]],
            'subject' => $subject,
        ]],
        'from' => [
            'email' => $fromEmail,
            'name' => $fromName,
        ],
        'content' => [
            [
                'type' => 'text/plain',
                'value' => $textBody,
            ],
            [
                'type' => 'text/html',
                'value' => $htmlBody,
            ],
        ],
    ];

    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        error_log('Failed to encode SendGrid payload.');
        emailSetLastError('Failed to encode SendGrid payload');
        return false;
    }

    $ch = curl_init('https://api.sendgrid.com/v3/mail/send');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => $json,
        CURLOPT_TIMEOUT => 30,
    ]);

    $response = curl_exec($ch);
    if ($response === false) {
        $curlErr = curl_error($ch);
        error_log('SendGrid request error: ' . $curlErr);
        curl_close($ch);
        emailSetLastError('SendGrid request error: ' . $curlErr);
        return false;
    }
    $status = (int) (curl_getinfo($ch, CURLINFO_RESPONSE_CODE) ?: 0);
    curl_close($ch);

    if ($status >= 200 && $status < 300) {
        return true;
    }

    $msg = sprintf('SendGrid responded with status %d: %s', $status, (string)$response);
    error_log($msg);
    emailSetLastError($msg);
    return false;
}

function sendEmailViaPhpMail(
    string $fromEmail,
    string $fromName,
    string $toEmail,
    string $toName,
    string $subject,
    string $htmlBody,
    string $textBody
): bool {
    // Basic validation
    if (!filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
        emailSetLastError('Invalid recipient email');
        return false;
    }

    $boundary = 'b_' . bin2hex(random_bytes(12));

    // Encode subject for UTF-8
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    $headers = [];
    $headers[] = 'From: ' . ($fromName !== '' ? ('=?UTF-8?B?' . base64_encode($fromName) . '?= <' . $fromEmail . '>') : $fromEmail);
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: 8bit';

    $bodyParts = [];
    $bodyParts[] = '--' . $boundary;
    $bodyParts[] = 'Content-Type: text/plain; charset=UTF-8';
    $bodyParts[] = 'Content-Transfer-Encoding: 8bit';
    $bodyParts[] = '';
    $bodyParts[] = $textBody;
    $bodyParts[] = '--' . $boundary;
    $bodyParts[] = 'Content-Type: text/html; charset=UTF-8';
    $bodyParts[] = 'Content-Transfer-Encoding: 8bit';
    $bodyParts[] = '';
    $bodyParts[] = $htmlBody;
    $bodyParts[] = '--' . $boundary . '--';
    $bodyParts[] = '';

    $message = implode("\r\n", $bodyParts);

    $params = '-f' . $fromEmail; // Set envelope sender for better deliverability

    try {
        // Try with envelope sender first
        $ok = @mail($toEmail, $encodedSubject, $message, implode("\r\n", $headers), $params);
        if ($ok) {
            return true;
        }
        // Fallback: try without additional params (some hosts disallow -f)
        $fallbackMsg = 'phpmail() with -f failed for ' . $toEmail . '; falling back without -f';
        error_log($fallbackMsg);
        $ok2 = @mail($toEmail, $encodedSubject, $message, implode("\r\n", $headers));
        if (!$ok2) {
            $failMsg = 'phpmail() fallback returned false for recipient ' . $toEmail;
            error_log($failMsg);
            emailSetLastError($failMsg);
        }
        return $ok2;
    } catch (Throwable $e) {
        error_log('phpmail() failed: ' . $e->getMessage());
        emailSetLastError('phpmail exception: ' . $e->getMessage());
        return false;
    }
}
