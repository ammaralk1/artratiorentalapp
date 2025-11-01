<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/notifications.php';

use InvalidArgumentException;
use Throwable;

function readJsonBody(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false) {
        throw new InvalidArgumentException('Unable to read request body');
    }
    $raw = trim($raw);
    if ($raw === '') { return []; }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        throw new InvalidArgumentException('Invalid JSON payload');
    }
    return $data;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    requireRole('admin');
    $pdo = getDatabaseConnection();

    if ($method !== 'POST') {
        respondError('Method not allowed', 405);
        exit;
    }

    $payload = readJsonBody();

    $entityType = strtolower(trim((string)($payload['entity_type'] ?? '')));
    $entityId = (int)($payload['entity_id'] ?? 0);
    $channels = (array)($payload['channels'] ?? []);
    $recipients = (array)($payload['recipients'] ?? []);
    $message = (array)($payload['message'] ?? []);

    if (!in_array($entityType, ['reservation', 'project'], true)) {
        throw new InvalidArgumentException('Invalid entity_type');
    }
    if ($entityId <= 0) {
        throw new InvalidArgumentException('Invalid entity_id');
    }

    $sendEmail = (bool)($channels['email'] ?? true);
    $sendWhatsApp = (bool)($channels['whatsapp'] ?? false);
    if (!$sendEmail && !$sendWhatsApp) {
        throw new InvalidArgumentException('At least one channel must be enabled');
    }

    $toTechnicians = (bool)($recipients['technicians'] ?? true);
    $toAdmins = (bool)($recipients['admins'] ?? true);
    $extraEmails = array_values(array_filter(array_map('trim', (array)($recipients['additional_emails'] ?? []))));
    $extraPhones = array_values(array_filter(array_map('trim', (array)($recipients['additional_phones'] ?? []))));

    $subject = trim((string)($message['subject'] ?? 'تنبيه إداري'));
    $htmlBody = (string)($message['html'] ?? '');
    $textBody = (string)($message['text'] ?? '');

    if ($htmlBody === '' && $textBody === '') {
        throw new InvalidArgumentException('Message body is required');
    }

    if ($htmlBody === '' && $textBody !== '') {
        $htmlBody = nl2br(htmlspecialchars($textBody, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
    }
    if ($textBody === '' && $htmlBody !== '') {
        $textBody = strip_tags($htmlBody);
    }

    // Load entity
    $reservation = null;
    $project = null;
    $techIds = [];
    if ($entityType === 'reservation') {
        require_once __DIR__ . '/../reservations/index.php';
        $reservation = fetchReservationById($pdo, $entityId);
        if (!$reservation) {
            respondError('Reservation not found', 404);
            exit;
        }
        foreach ((array)($reservation['technicians'] ?? []) as $t) {
            $id = (int)($t['technician_id'] ?? ($t['id'] ?? 0));
            if ($id > 0) { $techIds[] = $id; }
        }
    } else {
        require_once __DIR__ . '/../projects/index.php';
        $project = fetchProjectById($pdo, $entityId);
        if (!$project) {
            respondError('Project not found', 404);
            exit;
        }
        foreach ((array)($project['technicians'] ?? []) as $t) {
            $id = (int)($t['id'] ?? 0);
            if ($id > 0) { $techIds[] = $id; }
        }
    }

    $channelsSent = [
        'email' => 0,
        'whatsapp' => 0,
    ];

    // Recipients resolution
    $targets = [
        'email' => [],
        'whatsapp' => [],
    ];

    if ($toTechnicians && $techIds) {
        foreach (array_unique($techIds) as $tid) {
            $contact = fetchTechnicianContacts($pdo, (int)$tid);
            if (!$contact) { continue; }
            if ($sendEmail && !empty($contact['email'])) {
                $targets['email'][] = [
                    'recipient' => (string)$contact['email'],
                    'name' => (string)($contact['name'] ?? ''),
                    'type' => 'technician',
                ];
            }
            if ($sendWhatsApp && !empty($contact['phone'])) {
                $targets['whatsapp'][] = [
                    'recipient' => (string)$contact['phone'],
                    'name' => (string)($contact['name'] ?? ''),
                    'type' => 'technician',
                ];
            }
        }
    }

    if ($toAdmins) {
        $settings = getNotificationSettings();
        if ($sendEmail) {
            foreach ((array)$settings['admin_emails'] as $email) {
                $targets['email'][] = [
                    'recipient' => (string)$email,
                    'name' => 'Admin',
                    'type' => 'admin',
                ];
            }
        }
        if ($sendWhatsApp) {
            foreach ((array)$settings['admin_whatsapp_numbers'] as $phone) {
                $targets['whatsapp'][] = [
                    'recipient' => (string)$phone,
                    'name' => 'Admin',
                    'type' => 'admin',
                ];
            }
        }
    }

    foreach ($extraEmails as $email) {
        if ($sendEmail) {
            $targets['email'][] = [
                'recipient' => (string)$email,
                'name' => 'Custom',
                'type' => 'custom',
            ];
        }
    }
    foreach ($extraPhones as $phone) {
        if ($sendWhatsApp) {
            $targets['whatsapp'][] = [
                'recipient' => (string)$phone,
                'name' => 'Custom',
                'type' => 'custom',
            ];
        }
    }

    // Fallback: if no recipients resolved, force-include admins once
    if (empty($targets['email']) && empty($targets['whatsapp'])) {
        $settings = getNotificationSettings();
        if ($sendEmail) {
            foreach ((array)$settings['admin_emails'] as $email) {
                $targets['email'][] = [
                    'recipient' => (string)$email,
                    'name' => 'Admin',
                    'type' => 'admin',
                ];
            }
        }
        if ($sendWhatsApp) {
            foreach ((array)$settings['admin_whatsapp_numbers'] as $phone) {
                $targets['whatsapp'][] = [
                    'recipient' => (string)$phone,
                    'name' => 'Admin',
                    'type' => 'admin',
                ];
            }
        }
    }

    // Abort if still empty after fallback
    if (empty($targets['email']) && empty($targets['whatsapp'])) {
        respondError('No recipients found for selected channels', 422, [
            'meta' => [
                'channels_requested' => [ 'email' => $sendEmail, 'whatsapp' => $sendWhatsApp ],
                'technicians_requested' => $toTechnicians,
                'admins_requested' => $toAdmins,
                'additional_emails' => count($extraEmails),
                'additional_phones' => count($extraPhones),
            ],
        ]);
        exit;
    }

    // Send
    foreach ($targets['email'] as $target) {
        $ok = sendEmail($target['recipient'], $target['name'], $subject, $htmlBody, $textBody);
        $err = function_exists('emailGetLastError') ? (emailGetLastError() ?? null) : null;
        recordNotificationEvent($pdo, 'manual_notification', $entityType, $entityId, $target['type'], $target['recipient'], 'email', $ok ? 'sent' : 'failed', $ok ? null : $err);
        if ($ok) { $channelsSent['email']++; }
    }
    foreach ($targets['whatsapp'] as $target) {
        $ok = sendWhatsAppText($target['recipient'], $textBody);
        recordNotificationEvent($pdo, 'manual_notification', $entityType, $entityId, $target['type'], $target['recipient'], 'whatsapp', $ok ? 'sent' : 'failed', $ok ? null : 'WhatsApp send failed');
        if ($ok) { $channelsSent['whatsapp']++; }
    }

    logActivity($pdo, 'NOTIFICATION_MANUAL_SEND', [
        'entity_type' => $entityType,
        'entity_id' => $entityId,
        'email_count' => $channelsSent['email'],
        'whatsapp_count' => $channelsSent['whatsapp'],
    ]);

    respond([
        'sent' => $channelsSent,
        'targets' => [
            'email' => count($targets['email']),
            'whatsapp' => count($targets['whatsapp']),
        ],
        'errors' => [
            // For quick debugging on the client side — detailed per-event stored in notification_events
            'last_email_error' => function_exists('emailGetLastError') ? (emailGetLastError() ?? null) : null,
        ],
    ]);
} catch (InvalidArgumentException $exception) {
    respondError($exception->getMessage(), 400);
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}
