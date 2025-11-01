<?php
declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/email.php';
require_once __DIR__ . '/whatsapp.php';

function getNotificationSettings(): array
{
    $cfg = getAppConfig('notifications') ?? [];
    return [
        'manager_emails' => array_values(array_filter(array_map('trim', (array)($cfg['manager_emails'] ?? [])))) ,
        'manager_whatsapp_numbers' => array_values(array_filter(array_map('trim', (array)($cfg['manager_whatsapp_numbers'] ?? [])))) ,
        'channels' => [
            'email' => (bool)($cfg['email_enabled'] ?? getAppConfig('email', 'enabled', false)),
            'whatsapp' => (bool)($cfg['whatsapp_enabled'] ?? getAppConfig('whatsapp', 'enabled', false)),
        ],
    ];
}

function ensureNotificationEventsTable(PDO $pdo): void
{
    static $checked = false;
    if ($checked) { return; }

    try {
        $pdo->exec('CREATE TABLE IF NOT EXISTS notification_events (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            event_type VARCHAR(64) NOT NULL,
            entity_type VARCHAR(32) NOT NULL,
            entity_id BIGINT UNSIGNED NOT NULL,
            recipient_type VARCHAR(32) NOT NULL,
            recipient_identifier VARCHAR(191) NOT NULL,
            channel VARCHAR(16) NOT NULL,
            status VARCHAR(16) NOT NULL,
            error TEXT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY uq_event (event_type, entity_type, entity_id, recipient_identifier, channel)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
        $checked = true;
    } catch (Throwable $e) {
        error_log('Failed ensuring notification_events table: ' . $e->getMessage());
        $checked = true; // avoid retry loop
    }
}

function hasNotificationBeenSent(PDO $pdo, string $eventType, string $entityType, int $entityId, string $recipient, string $channel): bool
{
    ensureNotificationEventsTable($pdo);
    try {
        $stmt = $pdo->prepare('SELECT 1 FROM notification_events WHERE event_type = :event AND entity_type = :etype AND entity_id = :eid AND recipient_identifier = :rcpt AND channel = :channel LIMIT 1');
        $stmt->execute([
            'event' => $eventType,
            'etype' => $entityType,
            'eid' => $entityId,
            'rcpt' => $recipient,
            'channel' => $channel,
        ]);
        return (bool) $stmt->fetchColumn();
    } catch (Throwable $e) {
        error_log('Notification dedupe check failed: ' . $e->getMessage());
        return false;
    }
}

function recordNotificationEvent(PDO $pdo, string $eventType, string $entityType, int $entityId, string $recipientType, string $recipient, string $channel, string $status, ?string $error = null): void
{
    ensureNotificationEventsTable($pdo);
    try {
        $stmt = $pdo->prepare('INSERT INTO notification_events (event_type, entity_type, entity_id, recipient_type, recipient_identifier, channel, status, error)
            VALUES (:event_type, :entity_type, :entity_id, :recipient_type, :recipient_identifier, :channel, :status, :error)');
        $stmt->execute([
            'event_type' => $eventType,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'recipient_type' => $recipientType,
            'recipient_identifier' => $recipient,
            'channel' => $channel,
            'status' => $status,
            'error' => $error,
        ]);
    } catch (Throwable $e) {
        // swallow to avoid breaking flows
        error_log('Failed recording notification event: ' . $e->getMessage());
    }
}

function fetchTechnicianContacts(PDO $pdo, int $technicianId): ?array
{
    try {
        $stmt = $pdo->prepare('SELECT id, full_name, email, phone FROM technicians WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $technicianId]);
        $row = $stmt->fetch();
        if (!$row) { return null; }
        return [
            'id' => (int) $row['id'],
            'name' => (string) ($row['full_name'] ?? ''),
            'email' => $row['email'] ?? null,
            'phone' => $row['phone'] ?? null,
        ];
    } catch (Throwable $e) {
        error_log('Failed fetching technician contacts: ' . $e->getMessage());
        return null;
    }
}

function buildReservationSummary(array $reservation): array
{
    $title = (string) ($reservation['title'] ?? '');
    $code = (string) ($reservation['reservation_code'] ?? '');
    $start = (string) ($reservation['start_datetime'] ?? '');
    $end = (string) ($reservation['end_datetime'] ?? '');
    $location = (string) ($reservation['location'] ?? '');
    $customer = (string) ($reservation['customer_name'] ?? '');
    $projectCode = (string) ($reservation['project_code'] ?? '');

    $when = $start;
    if ($end && $end !== $start) {
        $when .= ' — ' . $end;
    }

    $titleLine = $title !== '' ? $title : ($code !== '' ? $code : 'حجز');
    return [
        'title' => $titleLine,
        'code' => $code,
        'when' => $when,
        'location' => $location,
        'customer' => $customer,
        'project_code' => $projectCode,
    ];
}

function sendReservationNotificationsToTechnicians(PDO $pdo, array $reservation, string $eventType): void
{
    $settings = getNotificationSettings();
    $channels = $settings['channels'];
    $summary = buildReservationSummary($reservation);
    $entityId = (int) $reservation['id'];

    $subject = 'تم تعيينك على حجز جديد: ' . $summary['title'];
    $html = '<p>مرحباً،</p>' .
        '<p>تم تعيينك على الحجز التالي:</p>' .
        '<ul>' .
        '<li>العنوان: ' . htmlspecialchars($summary['title']) . '</li>' .
        ($summary['code'] !== '' ? '<li>كود الحجز: ' . htmlspecialchars($summary['code']) . '</li>' : '') .
        '<li>الوقت: ' . htmlspecialchars($summary['when']) . '</li>' .
        ($summary['location'] !== '' ? '<li>الموقع: ' . htmlspecialchars($summary['location']) . '</li>' : '') .
        ($summary['customer'] !== '' ? '<li>العميل: ' . htmlspecialchars($summary['customer']) . '</li>' : '') .
        ($summary['project_code'] !== '' ? '<li>رقم المشروع: ' . htmlspecialchars($summary['project_code']) . '</li>' : '') .
        '</ul>' .
        '<p>يرجى تأكيد استلامك.</p>';
    $text = "تم تعيينك على حجز: {$summary['title']}\n" .
        ($summary['code'] !== '' ? "كود: {$summary['code']}\n" : '') .
        "الوقت: {$summary['when']}\n" .
        ($summary['location'] !== '' ? "الموقع: {$summary['location']}\n" : '') .
        ($summary['customer'] !== '' ? "العميل: {$summary['customer']}\n" : '') .
        ($summary['project_code'] !== '' ? "المشروع: {$summary['project_code']}\n" : '') .
        'شكراً.';

    $techs = (array)($reservation['technicians'] ?? []);
    foreach ($techs as $t) {
        $techId = (int) ($t['technician_id'] ?? ($t['id'] ?? 0));
        if ($techId <= 0) { continue; }
        $contacts = fetchTechnicianContacts($pdo, $techId);
        if (!$contacts) { continue; }

        if ($channels['email'] && !empty($contacts['email'])) {
            $recipient = (string) $contacts['email'];
            if (!hasNotificationBeenSent($pdo, $eventType, 'reservation', $entityId, $recipient, 'email')) {
                $ok = sendEmail($recipient, (string) $contacts['name'], $subject, $html, $text);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'technician', $recipient, 'email', $ok ? 'sent' : 'failed');
            }
        }

        if ($channels['whatsapp'] && !empty($contacts['phone'])) {
            $recipient = (string) $contacts['phone'];
            if (!hasNotificationBeenSent($pdo, $eventType, 'reservation', $entityId, $recipient, 'whatsapp')) {
                $ok = sendWhatsAppText($recipient, $text);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'technician', $recipient, 'whatsapp', $ok ? 'sent' : 'failed');
            }
        }
    }
}

function sendReservationNotificationsToManagers(PDO $pdo, array $reservation, string $eventType): void
{
    $settings = getNotificationSettings();
    $channels = $settings['channels'];
    $entityId = (int) $reservation['id'];
    $summary = buildReservationSummary($reservation);

    $subject = 'تم إنشاء حجز جديد: ' . $summary['title'];
    $html = '<p>تم إنشاء حجز جديد.</p>' .
        '<ul>' .
        ($summary['code'] !== '' ? '<li>كود الحجز: ' . htmlspecialchars($summary['code']) . '</li>' : '') .
        '<li>العنوان: ' . htmlspecialchars($summary['title']) . '</li>' .
        '<li>الوقت: ' . htmlspecialchars($summary['when']) . '</li>' .
        ($summary['location'] !== '' ? '<li>الموقع: ' . htmlspecialchars($summary['location']) . '</li>' : '') .
        ($summary['customer'] !== '' ? '<li>العميل: ' . htmlspecialchars($summary['customer']) . '</li>' : '') .
        '</ul>';
    $text = "حجز جديد\n" .
        ($summary['code'] !== '' ? "كود: {$summary['code']}\n" : '') .
        "العنوان: {$summary['title']}\nالوقت: {$summary['when']}\n" .
        ($summary['location'] !== '' ? "الموقع: {$summary['location']}\n" : '') .
        ($summary['customer'] !== '' ? "العميل: {$summary['customer']}\n" : '');

    foreach ($settings['manager_emails'] as $email) {
        if ($channels['email']) {
            $recipient = (string) $email;
            if (!hasNotificationBeenSent($pdo, $eventType, 'reservation', $entityId, $recipient, 'email')) {
                $ok = sendEmail($recipient, 'Manager', $subject, $html, $text);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'manager', $recipient, 'email', $ok ? 'sent' : 'failed');
            }
        }
    }

    foreach ($settings['manager_whatsapp_numbers'] as $phone) {
        if ($channels['whatsapp']) {
            $recipient = (string) $phone;
            if (!hasNotificationBeenSent($pdo, $eventType, 'reservation', $entityId, $recipient, 'whatsapp')) {
                $ok = sendWhatsAppText($recipient, $text);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'manager', $recipient, 'whatsapp', $ok ? 'sent' : 'failed');
            }
        }
    }
}

function notifyReservationCreated(PDO $pdo, array $reservation): void
{
    try {
        $eventType = 'reservation_created';
        sendReservationNotificationsToTechnicians($pdo, $reservation, $eventType);
        sendReservationNotificationsToManagers($pdo, $reservation, $eventType);
    } catch (Throwable $e) {
        error_log('notifyReservationCreated error: ' . $e->getMessage());
    }
}

function notifyReservationReminder(PDO $pdo, array $reservation, string $windowKey = '24h'): void
{
    $eventType = 'reservation_reminder_' . $windowKey;
    try {
        // For reminders, reuse same templates with a small prefix
        $reservation['title'] = '[تذكير] ' . (string)($reservation['title'] ?? '');
        sendReservationNotificationsToTechnicians($pdo, $reservation, $eventType);
        sendReservationNotificationsToManagers($pdo, $reservation, $eventType);
    } catch (Throwable $e) {
        error_log('notifyReservationReminder error: ' . $e->getMessage());
    }
}

function fetchReservationForNotification(PDO $pdo, int $reservationId): ?array
{
    require_once __DIR__ . '/../api/reservations/index.php';
    $res = fetchReservationById($pdo, $reservationId);
    if (!$res) { return null; }
    // Attempt to fetch related project code (if present)
    if (!empty($res['project_id'])) {
        try {
            $stmt = $pdo->prepare('SELECT project_code FROM projects WHERE id = :id LIMIT 1');
            $stmt->execute(['id' => (int)$res['project_id']]);
            $code = $stmt->fetchColumn();
            if ($code) { $res['project_code'] = (string)$code; }
        } catch (Throwable $_) { /* ignore */ }
    }
    return $res;
}

function notifyProjectCreated(PDO $pdo, array $project): void
{
    $settings = getNotificationSettings();
    $channels = $settings['channels'];
    $entityId = (int) $project['id'];
    $eventType = 'project_created';

    $title = (string) ($project['title'] ?? '');
    $code = (string) ($project['project_code'] ?? '');
    $start = (string) ($project['start_datetime'] ?? '');
    $end = (string) ($project['end_datetime'] ?? '');
    $when = $start;
    if ($end && $end !== $start) { $when .= ' — ' . $end; }

    $subjectTech = 'تم تعيينك على مشروع جديد: ' . ($title !== '' ? $title : $code);
    $text = "مشروع جديد\n" .
        ($code !== '' ? "كود: {$code}\n" : '') .
        ($title !== '' ? "العنوان: {$title}\n" : '') .
        ($when !== '' ? "الوقت: {$when}\n" : '');
    $htmlTech = '<p>مرحباً،</p><p>تم تعيينك على مشروع جديد.</p>' .
        '<ul>' .
        ($title !== '' ? '<li>العنوان: ' . htmlspecialchars($title) . '</li>' : '') .
        ($code !== '' ? '<li>كود المشروع: ' . htmlspecialchars($code) . '</li>' : '') .
        ($when !== '' ? '<li>الوقت: ' . htmlspecialchars($when) . '</li>' : '') .
        '</ul>';

    // notify technicians
    foreach ((array)($project['technicians'] ?? []) as $t) {
        $techId = (int) ($t['id'] ?? 0);
        if ($techId <= 0) { continue; }
        $contacts = fetchTechnicianContacts($pdo, $techId);
        if (!$contacts) { continue; }

        if ($channels['email'] && !empty($contacts['email'])) {
            $rcpt = (string) $contacts['email'];
            if (!hasNotificationBeenSent($pdo, $eventType, 'project', $entityId, $rcpt, 'email')) {
                $ok = sendEmail($rcpt, (string)$contacts['name'], $subjectTech, $htmlTech, $text);
                recordNotificationEvent($pdo, $eventType, 'project', $entityId, 'technician', $rcpt, 'email', $ok ? 'sent' : 'failed');
            }
        }

        if ($channels['whatsapp'] && !empty($contacts['phone'])) {
            $rcpt = (string) $contacts['phone'];
            if (!hasNotificationBeenSent($pdo, $eventType, 'project', $entityId, $rcpt, 'whatsapp')) {
                $ok = sendWhatsAppText($rcpt, $text);
                recordNotificationEvent($pdo, $eventType, 'project', $entityId, 'technician', $rcpt, 'whatsapp', $ok ? 'sent' : 'failed');
            }
        }
    }

    // notify managers
    $subjectMgr = 'تم إنشاء مشروع جديد: ' . ($title !== '' ? $title : $code);
    $htmlMgr = '<p>تم إنشاء مشروع جديد.</p>' .
        '<ul>' .
        ($title !== '' ? '<li>العنوان: ' . htmlspecialchars($title) . '</li>' : '') .
        ($code !== '' ? '<li>كود المشروع: ' . htmlspecialchars($code) . '</li>' : '') .
        ($when !== '' ? '<li>الوقت: ' . htmlspecialchars($when) . '</li>' : '') .
        '</ul>';

    foreach ($settings['manager_emails'] as $email) {
        if ($channels['email']) {
            $rcpt = (string) $email;
            if (!hasNotificationBeenSent($pdo, $eventType, 'project', $entityId, $rcpt, 'email')) {
                $ok = sendEmail($rcpt, 'Manager', $subjectMgr, $htmlMgr, $text);
                recordNotificationEvent($pdo, $eventType, 'project', $entityId, 'manager', $rcpt, 'email', $ok ? 'sent' : 'failed');
            }
        }
    }

    foreach ($settings['manager_whatsapp_numbers'] as $phone) {
        if ($channels['whatsapp']) {
            $rcpt = (string) $phone;
            if (!hasNotificationBeenSent($pdo, $eventType, 'project', $entityId, $rcpt, 'whatsapp')) {
                $ok = sendWhatsAppText($rcpt, $text);
                recordNotificationEvent($pdo, $eventType, 'project', $entityId, 'manager', $rcpt, 'whatsapp', $ok ? 'sent' : 'failed');
            }
        }
    }
}
