<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

// Admin-only diagnostics to verify notification configuration on production
try {
    requireRole('admin');

    $email = getAppConfig('email') ?? [];
    $noti = getAppConfig('notifications') ?? [];

    // Sanitize sensitive fields
    $safeEmail = [
        'enabled' => (bool)($email['enabled'] ?? false),
        'provider' => (string)($email['provider'] ?? ''),
        'from_email' => (string)($email['from_email'] ?? ''),
        'from_name' => (string)($email['from_name'] ?? ''),
        'smtp_host' => (string)($email['smtp_host'] ?? ''),
        'smtp_port' => isset($email['smtp_port']) ? (int)$email['smtp_port'] : null,
        'smtp_secure' => (string)($email['smtp_secure'] ?? ''),
        'smtp_user' => (string)($email['smtp_user'] ?? ''),
        // do not expose smtp_pass or API keys
    ];

    $adminEmails = array_values(array_filter(array_map('trim', (array)($noti['admin_emails'] ?? []))));
    $adminWhatsapp = array_values(array_filter(array_map('trim', (array)($noti['admin_whatsapp_numbers'] ?? []))));

    $diagnostics = [
        'email' => $safeEmail,
        'notifications' => [
            'admin_only' => (bool)($noti['admin_only'] ?? false),
            'admin_receive_all' => (bool)($noti['admin_receive_all'] ?? false),
            'admin_emails' => $adminEmails,
            'admin_whatsapp_numbers' => $adminWhatsapp,
        ],
        'computed' => [
            'admin_email_count' => count($adminEmails),
            'admin_whatsapp_count' => count($adminWhatsapp),
            'fallback_enabled' => true, // server has fallback logic for empty recipients
            'default_email_if_no_channel' => true,
        ],
    ];

    respond($diagnostics);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}

