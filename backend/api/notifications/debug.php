<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/notifications.php';
require_once __DIR__ . '/../../services/email.php';

// Admin-only diagnostics to verify notification configuration on production
try {
    requireRole('admin');

    $emailRaw = getAppConfig('email') ?? [];
    $notiRaw = getAppConfig('notifications') ?? [];

    // Sanitize sensitive fields
    $safeEmailRaw = [
        'enabled' => (bool)($emailRaw['enabled'] ?? false),
        'provider' => (string)($emailRaw['provider'] ?? ''),
        'from_email' => (string)($emailRaw['from_email'] ?? ''),
        'from_name' => (string)($emailRaw['from_name'] ?? ''),
        'smtp_host' => (string)($emailRaw['smtp_host'] ?? ''),
        'smtp_port' => isset($emailRaw['smtp_port']) ? (int)$emailRaw['smtp_port'] : null,
        'smtp_secure' => (string)($emailRaw['smtp_secure'] ?? ''),
        'smtp_user' => (string)($emailRaw['smtp_user'] ?? ''),
        // do not expose smtp_pass or API keys
    ];

    // Resolved (validated) email config
    $emailResolved = null;
    $emailConfigError = null;
    try {
        $emailResolved = getEmailConfig();
        if (isset($emailResolved['smtp_pass'])) {
            unset($emailResolved['smtp_pass']);
        }
    } catch (Throwable $e) {
        $emailConfigError = $e->getMessage();
    }

    // Raw notifications
    $adminEmailsRaw = array_values(array_filter(array_map('trim', (array)($notiRaw['admin_emails'] ?? []))));
    $adminWhatsappRaw = array_values(array_filter(array_map('trim', (array)($notiRaw['admin_whatsapp_numbers'] ?? []))));

    // Resolved notifications via getNotificationSettings (includes fallback)
    $resolved = getNotificationSettings();
    $diagnostics = [
        'email_raw' => $safeEmailRaw,
        'email_resolved' => $emailResolved,
        'email_error' => $emailConfigError,
        'notifications_raw' => [
            'admin_only' => (bool)($notiRaw['admin_only'] ?? false),
            'admin_receive_all' => (bool)($notiRaw['admin_receive_all'] ?? false),
            'admin_emails' => $adminEmailsRaw,
            'admin_whatsapp_numbers' => $adminWhatsappRaw,
        ],
        'notifications_resolved' => $resolved,
        'computed' => [
            'admin_email_count_raw' => count($adminEmailsRaw),
            'admin_whatsapp_count_raw' => count($adminWhatsappRaw),
            'admin_email_count_resolved' => count($resolved['admin_emails'] ?? []),
            'admin_whatsapp_count_resolved' => count($resolved['admin_whatsapp_numbers'] ?? []),
            'channels_resolved' => $resolved['channels'] ?? [],
        ],
    ];

    respond($diagnostics);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}
