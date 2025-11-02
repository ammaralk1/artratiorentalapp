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
    $sendTelegram = (bool)($channels['telegram'] ?? false);
    // Default to email if no channel explicitly selected to reduce friction
    if (!$sendEmail && !$sendTelegram) {
        $sendEmail = true;
    }
    if (!$sendEmail && !$sendTelegram) {
        throw new InvalidArgumentException('At least one channel must be enabled');
    }

    $toTechnicians = (bool)($recipients['technicians'] ?? true);
    $toAdmins = (bool)($recipients['admins'] ?? true);
    $extraEmails = array_values(array_filter(array_map('trim', (array)($recipients['additional_emails'] ?? []))));
    $extraTgChatIds = array_values(array_filter(array_map('trim', (array)($recipients['additional_telegram_chat_ids'] ?? []))));

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
        'telegram' => 0,
    ];

    // Recipients resolution
    $targets = [
        'email' => [],
        'telegram' => [],
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
            if ($sendTelegram) {
                $cid = getTelegramChatIdForTechnician($pdo, $contact);
                if (!empty($cid)) {
                    $targets['telegram'][] = [
                        'recipient' => (string)$cid,
                        'name' => (string)($contact['name'] ?? ''),
                        'type' => 'technician',
                    ];
                }
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
        if ($sendTelegram) {
            // From config
            $adminChats = array_values(array_filter(array_map('trim', (array)$settings['admin_telegram_chat_ids'])));
            foreach ($adminChats as $chat) {
                $targets['telegram'][] = [
                    'recipient' => (string)$chat,
                    'name' => 'Admin',
                    'type' => 'admin',
                ];
            }
            // From telegram_links (context=admin) if available
            try {
                $stmt = $pdo->query("SHOW TABLES LIKE 'telegram_links'");
                if ($stmt && $stmt->fetch()) {
                    $q = $pdo->query("SELECT DISTINCT chat_id FROM telegram_links WHERE context = 'admin' AND chat_id IS NOT NULL AND used_at IS NOT NULL");
                    while ($row = $q->fetch()) {
                        $cid = trim((string)($row['chat_id'] ?? ''));
                        if ($cid !== '') {
                            $targets['telegram'][] = [
                                'recipient' => $cid,
                                'name' => 'Admin',
                                'type' => 'admin',
                            ];
                        }
                    }
                }
            } catch (Throwable $_) { /* ignore */ }
            // Deduplicate admin telegram recipients
            if (!empty($targets['telegram'])) {
                $seen = [];
                $targets['telegram'] = array_values(array_filter($targets['telegram'], function($t) use (&$seen) {
                    if (($t['type'] ?? '') !== 'admin') return true; // do not dedupe non-admins here
                    $key = strtolower(trim((string)($t['recipient'] ?? '')));
                    if ($key === '' || isset($seen[$key])) return false;
                    $seen[$key] = true;
                    return true;
                }));
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
    foreach ($extraTgChatIds as $chat) {
        if ($sendTelegram) {
            $targets['telegram'][] = [
                'recipient' => (string)$chat,
                'name' => 'Custom',
                'type' => 'custom',
            ];
        }
    }

    // Fallback: if no recipients resolved, force-include admins once
    if (empty($targets['email']) && empty($targets['telegram'])) {
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
        if ($sendTelegram) {
            foreach ((array)$settings['admin_telegram_chat_ids'] as $chat) {
                $targets['telegram'][] = [
                    'recipient' => (string)$chat,
                    'name' => 'Admin',
                    'type' => 'admin',
                ];
            }
        }
    }

    // Abort if still empty after fallback
    if (empty($targets['email']) && empty($targets['telegram'])) {
        respondError('No recipients found for selected channels', 422, [
            'meta' => [
                'channels_requested' => [ 'email' => $sendEmail, 'telegram' => $sendTelegram ],
                'technicians_requested' => $toTechnicians,
                'admins_requested' => $toAdmins,
                'additional_emails' => count($extraEmails),
                'additional_telegram_chat_ids' => count($extraTgChatIds),
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
    foreach ($targets['telegram'] as $target) {
        $ok = sendTelegramText($target['recipient'], $textBody);
        $tgErr = function_exists('telegramGetLastError') ? (telegramGetLastError() ?? null) : null;
        recordNotificationEvent($pdo, 'manual_notification', $entityType, $entityId, $target['type'], $target['recipient'], 'telegram', $ok ? 'sent' : 'failed', $ok ? null : $tgErr);
        if ($ok) { $channelsSent['telegram']++; }
    }

    logActivity($pdo, 'NOTIFICATION_MANUAL_SEND', [
        'entity_type' => $entityType,
        'entity_id' => $entityId,
        'email_count' => $channelsSent['email'],
        'telegram_count' => $channelsSent['telegram'],
    ]);

    respond([
        'sent' => $channelsSent,
        'targets' => [
            'email' => count($targets['email']),
            'telegram' => count($targets['telegram']),
        ],
        // Provide resolved targets detail so clients can derive accurate counts when needed
        'targets_detail' => [
            'email' => array_map(static function($t) { return [
                'recipient' => (string)($t['recipient'] ?? ''),
                'type' => (string)($t['type'] ?? ''),
                'name' => (string)($t['name'] ?? ''),
            ]; }, $targets['email']),
            'telegram' => array_map(static function($t) { return [
                'recipient' => (string)($t['recipient'] ?? ''),
                'type' => (string)($t['type'] ?? ''),
                'name' => (string)($t['name'] ?? ''),
            ]; }, $targets['telegram']),
        ],
        'errors' => [
            // For quick debugging on the client side — detailed per-event stored in notification_events
            'last_email_error' => function_exists('emailGetLastError') ? (emailGetLastError() ?? null) : null,
            'last_telegram_error' => function_exists('telegramGetLastError') ? (telegramGetLastError() ?? null) : null,
        ],
    ]);
} catch (InvalidArgumentException $exception) {
    respondError($exception->getMessage(), 400);
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}
