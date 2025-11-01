<?php
declare(strict_types=1);

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
        error_log('SendGrid request error: ' . curl_error($ch));
        curl_close($ch);
        return false;
    }
    $status = (int) (curl_getinfo($ch, CURLINFO_RESPONSE_CODE) ?: 0);
    curl_close($ch);

    if ($status >= 200 && $status < 300) {
        return true;
    }

    error_log(sprintf('SendGrid responded with status %d: %s', $status, (string)$response));
    return false;
}
