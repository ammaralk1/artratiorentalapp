<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/notifications.php';
require_once __DIR__ . '/../../services/telegram.php';
// Ensure included API controllers don't auto-dispatch when required here
if (!defined('API_INCLUDE_MODE')) { define('API_INCLUDE_MODE', true); }

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

try {
    requireRole('admin');
    $pdo = getDatabaseConnection();

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        respondError('Method not allowed', 405);
        exit;
    }

    $payload = readJsonBody();
    $entityType = strtolower(trim((string)($payload['entity_type'] ?? '')));
    $entityId = (int)($payload['entity_id'] ?? 0);
    $channels = (array)($payload['channels'] ?? []);
    $recipients = (array)($payload['recipients'] ?? []);

    if (!in_array($entityType, ['reservation', 'project'], true)) {
        throw new InvalidArgumentException('Invalid entity_type');
    }
    if ($entityId <= 0) {
        throw new InvalidArgumentException('Invalid entity_id');
    }

    $sendEmail = (bool)($channels['email'] ?? true);
    $sendTelegram = (bool)($channels['telegram'] ?? false);
    if (!$sendEmail && !$sendTelegram) {
        $sendEmail = true;
    }

    $toTechnicians = (bool)($recipients['technicians'] ?? true);
    $toAdmins = (bool)($recipients['admins'] ?? true);
    $extraEmails = array_values(array_filter(array_map('trim', (array)($recipients['additional_emails'] ?? []))));
    $extraTgChatIds = array_values(array_filter(array_map('trim', (array)($recipients['additional_telegram_chat_ids'] ?? []))));

    // Load entity and resolve technician ids
    $techIds = [];
    if ($entityType === 'reservation') {
        require_once __DIR__ . '/../reservations/index.php';
        $reservation = fetchReservationById($pdo, $entityId);
        if (!$reservation) { respondError('Reservation not found', 404); exit; }
        foreach ((array)($reservation['technicians'] ?? []) as $t) {
            $id = (int)($t['technician_id'] ?? ($t['id'] ?? 0));
            if ($id > 0) { $techIds[] = $id; }
        }
    } else {
        require_once __DIR__ . '/../projects/index.php';
        $project = fetchProjectById($pdo, $entityId);
        if (!$project) { respondError('Project not found', 404); exit; }
        foreach ((array)($project['technicians'] ?? []) as $t) {
            $id = (int)($t['id'] ?? 0);
            if ($id > 0) { $techIds[] = $id; }
        }
    }

    $targets = [ 'email' => [], 'telegram' => [] ];

    if ($toTechnicians && $techIds) {
        foreach (array_unique($techIds) as $tid) {
            $contact = fetchTechnicianContacts($pdo, (int)$tid);
            if (!$contact) { continue; }
            if ($sendEmail && !empty($contact['email'])) {
                $targets['email'][] = [ 'recipient' => (string)$contact['email'], 'name' => (string)($contact['name'] ?? ''), 'type' => 'technician' ];
            }
            if ($sendTelegram) {
                $cid = getTelegramChatIdForTechnician($pdo, $contact);
                if (!empty($cid)) {
                    $targets['telegram'][] = [ 'recipient' => (string)$cid, 'name' => (string)($contact['name'] ?? ''), 'type' => 'technician' ];
                }
            }
        }
    }

    if ($toAdmins) {
        $settings = getNotificationSettings();
        if ($sendEmail) {
            foreach ((array)$settings['admin_emails'] as $email) {
                $targets['email'][] = [ 'recipient' => (string)$email, 'name' => 'Admin', 'type' => 'admin' ];
            }
        }
        if ($sendTelegram) {
            // From config
            foreach ((array)$settings['admin_telegram_chat_ids'] as $chat) {
                $targets['telegram'][] = [ 'recipient' => (string)$chat, 'name' => 'Admin', 'type' => 'admin' ];
            }
            // From telegram_links (context=admin)
            try {
                $stmt = $pdo->query("SHOW TABLES LIKE 'telegram_links'");
                if ($stmt && $stmt->fetch()) {
                    $q = $pdo->query("SELECT DISTINCT chat_id FROM telegram_links WHERE context = 'admin' AND chat_id IS NOT NULL AND used_at IS NOT NULL");
                    while ($row = $q->fetch()) {
                        $cid = trim((string)($row['chat_id'] ?? ''));
                        if ($cid !== '') {
                            $targets['telegram'][] = [ 'recipient' => $cid, 'name' => 'Admin', 'type' => 'admin' ];
                        }
                    }
                }
            } catch (Throwable $_) {}
            // Dedupe
            if (!empty($targets['telegram'])) {
                $seen = [];
                $targets['telegram'] = array_values(array_filter($targets['telegram'], function($t) use (&$seen) {
                    $key = strtolower(trim((string)($t['recipient'] ?? '')));
                    if ($key === '' || isset($seen[$key])) return false;
                    $seen[$key] = true; return true;
                }));
            }
        }
    }

    foreach ($extraEmails as $email) {
        if ($sendEmail) { $targets['email'][] = [ 'recipient' => (string)$email, 'name' => 'Custom', 'type' => 'custom' ]; }
    }
    foreach ($extraTgChatIds as $chat) {
        if ($sendTelegram) { $targets['telegram'][] = [ 'recipient' => (string)$chat, 'name' => 'Custom', 'type' => 'custom' ]; }
    }

    respond([
        'targets' => [ 'email' => count($targets['email']), 'telegram' => count($targets['telegram']) ],
        'targets_detail' => [
            'email' => array_map(static function($t) { return [ 'recipient' => (string)($t['recipient'] ?? ''), 'type' => (string)($t['type'] ?? ''), 'name' => (string)($t['name'] ?? '') ]; }, $targets['email']),
            'telegram' => array_map(static function($t) { return [ 'recipient' => (string)($t['recipient'] ?? ''), 'type' => (string)($t['type'] ?? ''), 'name' => (string)($t['name'] ?? '') ]; }, $targets['telegram']),
        ],
    ]);
} catch (InvalidArgumentException $exception) {
    respondError($exception->getMessage(), 400);
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [ 'details' => $exception->getMessage() ]);
}
