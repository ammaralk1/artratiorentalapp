<?php
declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/email.php';
require_once __DIR__ . '/telegram.php';

function getNotificationSettings(): array
{
    $cfg = getAppConfig('notifications') ?? [];
    $adminEmails = array_values(array_filter(array_map('trim', (array)($cfg['admin_emails'] ?? []))));
    // Safe fallback: if admin_emails is empty, try to use the configured from_email or smtp_user
    if (empty($adminEmails)) {
        $fallbackFrom = (string)(getAppConfig('email', 'from_email', '') ?? '');
        $fallbackUser = (string)(getAppConfig('email', 'smtp_user', '') ?? '');
        foreach ([$fallbackFrom, $fallbackUser] as $maybe) {
            $maybe = trim($maybe);
            if ($maybe !== '' && filter_var($maybe, FILTER_VALIDATE_EMAIL)) {
                $adminEmails[] = $maybe;
            }
        }
        $adminEmails = array_values(array_unique($adminEmails));
    }

    return [
        'admin_receive_all' => (bool)($cfg['admin_receive_all'] ?? false),
        'admin_only' => (bool)($cfg['admin_only'] ?? false),
        'admin_emails' => $adminEmails,
        'admin_telegram_chat_ids' => array_values(array_filter(array_map('trim', (array)($cfg['admin_telegram_chat_ids'] ?? [])))),
        'manager_emails' => array_values(array_filter(array_map('trim', (array)($cfg['manager_emails'] ?? [])))),
        'manager_telegram_chat_ids' => array_values(array_filter(array_map('trim', (array)($cfg['manager_telegram_chat_ids'] ?? [])))),
        'channels' => [
            'email' => (bool)($cfg['email_enabled'] ?? getAppConfig('email', 'enabled', false)),
            'telegram' => (bool)($cfg['telegram_enabled'] ?? getAppConfig('telegram', 'enabled', false)),
        ],
    ];
}

function ensureNotificationEventsTable(PDO $pdo): void
{
    static $checked = false;
    if ($checked) { return; }

    try {
        // Create table without unique constraints so repeated sends are logged as separate rows.
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
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

        // If an older schema exists with a unique index, drop it to allow duplicates in the log.
        try {
            $stmt = $pdo->query("SHOW INDEX FROM notification_events WHERE Key_name = 'uq_event'");
            if ($stmt && $stmt->fetch()) {
                $pdo->exec('DROP INDEX uq_event ON notification_events');
            }
        } catch (Throwable $_dropErr) {
            // ignore index drop errors to avoid breaking runtime
        }

        // Ensure extended columns exist
        $ensureColumn = function(string $name, string $ddl) use ($pdo) {
            try {
                $stmt = $pdo->prepare('SHOW COLUMNS FROM notification_events LIKE :col');
                $stmt->execute(['col' => $name]);
                if (!$stmt->fetch()) {
                    $pdo->exec('ALTER TABLE notification_events ADD COLUMN ' . $ddl);
                }
            } catch (Throwable $_) { /* ignore to avoid breaking runtime */ }
        };
        $ensureColumn('batch_id', 'batch_id VARCHAR(64) NULL');
        $ensureColumn('attempt', 'attempt INT UNSIGNED NOT NULL DEFAULT 1');
        $ensureColumn('sent_at', 'sent_at DATETIME NULL');
        $ensureColumn('provider_status_code', 'provider_status_code VARCHAR(32) NULL');
        $ensureColumn('provider_message_id', 'provider_message_id VARCHAR(64) NULL');
        $ensureColumn('provider_error', 'provider_error TEXT NULL');
        $ensureColumn('meta_json', 'meta_json JSON NULL');
        $ensureColumn('scheduled_at', 'scheduled_at DATETIME NULL');

        // Ensure helpful indexes
        $ensureIndex = function(string $name, string $ddl) use ($pdo) {
            try {
                $stmt = $pdo->prepare('SHOW INDEX FROM notification_events WHERE Key_name = :k');
                $stmt->execute(['k' => $name]);
                if (!$stmt->fetch()) {
                    $pdo->exec('CREATE INDEX ' . $ddl);
                }
            } catch (Throwable $_) { /* ignore */ }
        };
        $ensureIndex('idx_notification_created_at', 'idx_notification_created_at ON notification_events (created_at)');
        $ensureIndex('idx_notification_event', 'idx_notification_event ON notification_events (event_type)');
        $ensureIndex('idx_notification_entity', 'idx_notification_entity ON notification_events (entity_type, entity_id)');
        $ensureIndex('idx_notification_status', 'idx_notification_status ON notification_events (status)');
        $ensureIndex('idx_notification_channel', 'idx_notification_channel ON notification_events (channel)');
        $ensureIndex('idx_notification_recipient', 'idx_notification_recipient ON notification_events (recipient_identifier(64))');

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

function recordNotificationEvent(PDO $pdo, string $eventType, string $entityType, int $entityId, string $recipientType, string $recipient, string $channel, string $status, ?string $error = null, ?string $batchId = null, ?array $meta = null): void
{
    ensureNotificationEventsTable($pdo);
    try {
        // Always insert a new row to keep a full history of sends.
        $sql = 'INSERT INTO notification_events (
                    event_type, entity_type, entity_id,
                    recipient_type, recipient_identifier,
                    channel, status, error,
                    batch_id, sent_at, provider_status_code, provider_message_id, provider_error, meta_json
                ) VALUES (
                    :event_type, :entity_type, :entity_id,
                    :recipient_type, :recipient_identifier,
                    :channel, :status, :error,
                    :batch_id, :sent_at, :p_status, :p_msg_id, :p_error, :meta_json
                )';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'event_type' => $eventType,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'recipient_type' => $recipientType,
            'recipient_identifier' => $recipient,
            'channel' => $channel,
            'status' => $status,
            'error' => $error,
            'batch_id' => $batchId,
            'sent_at' => $status === 'sent' ? (new DateTimeImmutable())->format('Y-m-d H:i:s') : null,
            'p_status' => null,
            'p_msg_id' => null,
            'p_error' => null,
            'meta_json' => $meta ? json_encode($meta, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null,
        ]);
    } catch (Throwable $e) {
        // swallow to avoid breaking flows
        error_log('Failed recording notification event: ' . $e->getMessage());
    }
}

function fetchTechnicianContacts(PDO $pdo, int $technicianId): ?array
{
    try {
        // Detect optional telegram_chat_id column once
        static $hasTelegramColumn = null;
        if ($hasTelegramColumn === null) {
            try {
                $chk = $pdo->query("SHOW COLUMNS FROM technicians LIKE 'telegram_chat_id'");
                $hasTelegramColumn = $chk && $chk->fetch() ? true : false;
            } catch (Throwable $_) { $hasTelegramColumn = false; }
        }
        $select = $hasTelegramColumn
            ? 'id, full_name, email, phone, telegram_chat_id'
            : 'id, full_name, email, phone';
        $stmt = $pdo->prepare("SELECT $select FROM technicians WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $technicianId]);
        $row = $stmt->fetch();
        if (!$row) { return null; }
        return [
            'id' => (int) $row['id'],
            'name' => (string) ($row['full_name'] ?? ''),
            'email' => $row['email'] ?? null,
            'phone' => $row['phone'] ?? null,
            'telegram_chat_id' => $row['telegram_chat_id'] ?? null,
        ];
    } catch (Throwable $e) {
        error_log('Failed fetching technician contacts: ' . $e->getMessage());
        return null;
    }
}

/**
 * Attempt to resolve a Telegram chat id using stored mappings.
 */
function getTelegramChatIdForTechnician(PDO $pdo, array $contacts): ?string
{
    $cid = isset($contacts['telegram_chat_id']) ? (string)$contacts['telegram_chat_id'] : '';
    if ($cid !== '') return $cid;
    $phone = isset($contacts['phone']) ? trim((string)$contacts['phone']) : '';
    $techId = isset($contacts['id']) ? (int)$contacts['id'] : 0;
    try {
        // Ensure table exists
        $chk = $pdo->query("SHOW TABLES LIKE 'telegram_links'");
        if (!$chk || !$chk->fetch()) {
            return null;
        }
        // Prefer lookup by technician_id if available; fallback to phone match
        if ($techId > 0) {
            $stmt = $pdo->prepare('SELECT chat_id FROM telegram_links WHERE technician_id = :tid AND chat_id IS NOT NULL AND used_at IS NOT NULL ORDER BY used_at DESC LIMIT 1');
            $stmt->execute(['tid' => $techId]);
            $found = $stmt->fetchColumn();
            if ($found) return (string)$found;
        }
        if ($phone !== '') {
            $digits = telegramNormalizePhone($phone);
            if ($digits !== '') {
                $stmt = $pdo->prepare('SELECT chat_id FROM telegram_links WHERE phone = :p AND chat_id IS NOT NULL AND used_at IS NOT NULL ORDER BY used_at DESC LIMIT 1');
                $stmt->execute(['p' => $digits]);
                $found = $stmt->fetchColumn();
                if ($found) return (string)$found;
            }
            // fallback legacy exact match
            $stmt = $pdo->prepare('SELECT chat_id FROM telegram_links WHERE phone = :p AND chat_id IS NOT NULL AND used_at IS NOT NULL ORDER BY used_at DESC LIMIT 1');
            $stmt->execute(['p' => $phone]);
            $found = $stmt->fetchColumn();
            if ($found) return (string)$found;
        }
        return null;
    } catch (Throwable $_) {
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

    $displayId = $code !== '' ? $code : ($title !== '' ? $title : 'حجز');

    $titleLine = $title !== '' ? $title : ($code !== '' ? $code : 'حجز');
    $days = computeReservationDays($start, $end);
    return [
        'title' => $titleLine,
        'code' => $code,
        'display_id' => $displayId,
        'when' => $when,
        'location' => $location,
        'customer' => $customer,
        'project_code' => $projectCode,
        'days' => $days,
    ];
}

function computeReservationDays(?string $start, ?string $end): ?int
{
    if (!$start || !$end) { return null; }
    try {
        $s = new DateTimeImmutable($start);
        $e = new DateTimeImmutable($end);
        if ($e < $s) { return null; }
        $diff = $e->diff($s);
        $days = (int) $diff->days;
        $hasTimeRemainder = ($diff->h > 0 || $diff->i > 0 || $diff->s > 0);
        if ($hasTimeRemainder || $days === 0) { $days += 1; }
        return $days > 0 ? $days : 1;
    } catch (Throwable $_) {
        return null;
    }
}

function formatDetailsBlockHtml(string $detailsBlock): string
{
    if ($detailsBlock === '') { return ''; }
    return '<p><strong>تفاصيل إضافية:</strong><br>' .
        nl2br(htmlspecialchars(ltrim($detailsBlock), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) .
        '</p>';
}

function appendFooterText(string $text): string
{
    return rtrim($text) . "\nلمزيد من المعلومات فضلا ادخل على بطاقة الحجز فريق Art Ratio";
}

function appendFooterHtml(string $html): string
{
    return $html . '<p>لمزيد من المعلومات فضلا ادخل على بطاقة الحجز فريق Art Ratio</p>';
}

function expandReservationForNotifications(PDO $pdo, array $reservation): array
{
    // If technicians/items/packages are missing, try to reload a full reservation
    $needsExpansion = !isset($reservation['technicians']) || !isset($reservation['items']) || !isset($reservation['packages']);
    if (!$needsExpansion) { return $reservation; }
    $rid = isset($reservation['id']) ? (int)$reservation['id'] : 0;
    if ($rid <= 0) { return $reservation; }
    try {
        $full = fetchReservationForNotification($pdo, $rid);
        if (is_array($full)) { return $full; }
    } catch (Throwable $_) { /* ignore */ }
    return $reservation;
}

function buildReservationDetailsBlock(array $reservation): string
{
    $lines = [];
    $notes = trim((string)($reservation['notes'] ?? ''));
    if ($notes !== '') {
        $lines[] = 'الملاحظات: ' . $notes;
    }

    $techs = [];
    foreach ((array)($reservation['technicians'] ?? []) as $t) {
        $name = trim((string)($t['name'] ?? $t['technician_name'] ?? ''));
        $role = trim((string)($t['position_name'] ?? $t['role'] ?? ''));
        if ($name === '') { continue; }
        $label = $role !== '' ? ($name . ' — ' . $role) : $name;
        $techs[] = '- ' . $label;
    }
    if ($techs) {
        $lines[] = 'الفنيون:';
        $lines = array_merge($lines, $techs);
    }

    $items = [];
    foreach ((array)($reservation['items'] ?? []) as $item) {
        $title = trim((string)($item['description'] ?? $item['name'] ?? ''));
        $qty = isset($item['quantity']) ? (int)$item['quantity'] : 0;
        $note = trim((string)($item['notes'] ?? ''));
        if ($title === '') { continue; }
        $line = '- ' . $title . ($qty > 0 ? ' ×' . $qty : '');
        if ($note !== '') {
            $line .= ' (' . $note . ')';
        }
        $items[] = $line;
    }

    $packages = [];
    foreach ((array)($reservation['packages'] ?? []) as $pkg) {
        $name = trim((string)($pkg['name'] ?? $pkg['package_name'] ?? ''));
        if ($name === '') { $name = 'حزمة'; }
        $qty = isset($pkg['quantity']) ? (int)$pkg['quantity'] : 0;
        $line = '- ' . $name . ($qty > 0 ? ' ×' . $qty : '');
        $packages[] = $line;
    }
    if ($packages) {
        $lines[] = 'الحزم:';
        $lines = array_merge($lines, $packages);
    }
    if ($items) {
        $lines[] = 'المعدات:';
        $lines = array_merge($lines, $items);
    }

    if (empty($lines)) {
        return '';
    }
    return "\n" . implode("\n", $lines);
}

function pdfEscape(string $text): string
{
    return str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $text);
}

function renderSimplePdf(array $lines): string
{
    $contentLines = [];
    $contentLines[] = 'BT';
    $contentLines[] = '/F1 12 Tf';
    $contentLines[] = '14 TL';
    $contentLines[] = '72 750 Td';
    foreach ($lines as $line) {
        $contentLines[] = '(' . pdfEscape($line) . ') Tj';
        $contentLines[] = 'T*';
    }
    $contentLines[] = 'ET';
    $content = implode("\n", $contentLines);

    $objects = [];
    $objects[] = "<< /Type /Catalog /Pages 2 0 R >>\n";
    $objects[] = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>\n";
    $objects[] = "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\n";
    $objects[] = "<< /Length " . strlen($content) . " >>\nstream\n" . $content . "\nendstream\n";
    $objects[] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\n";

    $pdf = "%PDF-1.4\n";
    $offsets = [];
    $objId = 1;
    foreach ($objects as $obj) {
        $offsets[$objId] = strlen($pdf);
        $pdf .= $objId . " 0 obj\n" . $obj . "endobj\n";
        $objId++;
    }
    $xrefPos = strlen($pdf);
    $pdf .= "xref\n0 " . ($objId) . "\n";
    $pdf .= "0000000000 65535 f \n";
    for ($i = 1; $i < $objId; $i++) {
        $pdf .= sprintf("%010d 00000 n \n", $offsets[$i]);
    }
    $pdf .= "trailer<< /Size " . ($objId) . " /Root 1 0 R >>\n";
    $pdf .= "startxref\n" . $xrefPos . "\n%%EOF";
    return $pdf;
}

function buildReservationPdfAttachment(array $reservation, string $eventType): ?array
{
    // Allow PDF for any reservation_* event (create/reminder/status/assignment)
    return null;
}

function sendReservationNotificationsToTechnicians(PDO $pdo, array $reservation, string $eventType): void
{
    $reservation = expandReservationForNotifications($pdo, $reservation);
    $settings = getNotificationSettings();
    $channels = $settings['channels'];
    $summary = buildReservationSummary($reservation);
    $entityId = (int) $reservation['id'];
    $detailsBlock = buildReservationDetailsBlock($reservation);
    $attachment = null;
    $detailsHtml = '';

    $subject = 'تم تعيينك على حجز جديد: ' . $summary['display_id'];
    $textBase = "تم تعيينك على حجز\nرقم الحجز: {$summary['display_id']}\n" .
        "الوقت: {$summary['when']}\n" .
        ($summary['customer'] !== '' ? "العميل: {$summary['customer']}\n" : '') .
        ($summary['project_code'] !== '' ? "المشروع: {$summary['project_code']}\n" : '') .
        'شكراً.';
    $daysLine = $summary['days'] ? "عدد الأيام: {$summary['days']}\n" : '';
    $textUnified = appendFooterText($textBase . $daysLine . $detailsBlock);
    $textEmail = $textUnified;
    $textTelegram = $textUnified;
    $html = '<p>' . nl2br(htmlspecialchars($textUnified, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) . '</p>';

    $techs = (array)($reservation['technicians'] ?? []);
    foreach ($techs as $t) {
        $techId = (int) ($t['technician_id'] ?? ($t['id'] ?? 0));
        if ($techId <= 0) { continue; }
        $contacts = fetchTechnicianContacts($pdo, $techId);
        if (!$contacts) { continue; }

        if ($channels['email'] && !empty($contacts['email'])) {
            $recipient = (string) $contacts['email'];
            if (!hasNotificationBeenSent($pdo, $eventType, 'reservation', $entityId, $recipient, 'email')) {
                $ok = sendEmail($recipient, (string) $contacts['name'], $subject, $html, $textEmail);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'technician', $recipient, 'email', $ok ? 'sent' : 'failed');
            }
        }

        if ($channels['telegram']) {
            $recipient = (string) (getTelegramChatIdForTechnician($pdo, $contacts) ?: '');
            if ($recipient !== '' && !hasNotificationBeenSent($pdo, $eventType, 'reservation', $entityId, $recipient, 'telegram')) {
                $ok = sendTelegramText($recipient, $textTelegram);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'technician', $recipient, 'telegram', $ok ? 'sent' : 'failed');
            }
        }
    }

    // Admin will receive assignment info via dedicated admin templates in assignment/status handlers.
}

function sendReservationNotificationsToManagers(PDO $pdo, array $reservation, string $eventType): void
{
    $reservation = expandReservationForNotifications($pdo, $reservation);
    $settings = getNotificationSettings();
    $channels = $settings['channels'];
    $entityId = (int) $reservation['id'];
    $summary = buildReservationSummary($reservation);
    $detailsBlock = buildReservationDetailsBlock($reservation);
    $attachment = null;
    $detailsHtml = '';

    $subject = 'تم إنشاء حجز جديد: ' . $summary['display_id'];
    $daysLine = $summary['days'] ? "عدد الأيام: {$summary['days']}\n" : '';
    $text = "حجز جديد\nرقم الحجز: {$summary['display_id']}\nالوقت: {$summary['when']}\n" .
        ($summary['customer'] !== '' ? "العميل: {$summary['customer']}\n" : '');
    $textUnified = appendFooterText($text . $daysLine . $detailsBlock);
    $textEmail = $textUnified;
    $textTelegram = $textUnified;
    $html = '<p>' . nl2br(htmlspecialchars($textUnified, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) . '</p>';

    $emailRecipients = $settings['admin_only']
        ? $settings['admin_emails']
        : array_values(array_unique(array_merge($settings['admin_emails'], $settings['manager_emails'])));
    foreach ($emailRecipients as $email) {
        if ($channels['email']) {
            $recipient = (string) $email;
            if (!hasNotificationBeenSent($pdo, $eventType, 'reservation', $entityId, $recipient, 'email')) {
                $ok = sendEmail($recipient, 'Manager', $subject, $html, $textEmail, $attachment ? [$attachment] : []);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'manager', $recipient, 'email', $ok ? 'sent' : 'failed');
            }
        }
    }

    $tgRecipients = $settings['admin_only']
        ? $settings['admin_telegram_chat_ids']
        : array_values(array_unique(array_merge($settings['admin_telegram_chat_ids'], $settings['manager_telegram_chat_ids'])));
    foreach ($tgRecipients as $chat) {
        if ($channels['telegram']) {
            $recipient = (string) $chat;
            if (!hasNotificationBeenSent($pdo, $eventType, 'reservation', $entityId, $recipient, 'telegram')) {
                $ok = sendTelegramText($recipient, $textTelegram);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'manager', $recipient, 'telegram', $ok ? 'sent' : 'failed');
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
    if (!defined('API_INCLUDE_MODE')) { define('API_INCLUDE_MODE', true); }
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

        if ($channels['telegram'] && !empty($contacts['telegram_chat_id'])) {
            $rcpt = (string) $contacts['telegram_chat_id'];
            if (!hasNotificationBeenSent($pdo, $eventType, 'project', $entityId, $rcpt, 'telegram')) {
                $ok = sendTelegramText($rcpt, $text);
                recordNotificationEvent($pdo, $eventType, 'project', $entityId, 'technician', $rcpt, 'telegram', $ok ? 'sent' : 'failed');
            }
        }
    }

    // Admin will receive project assignment info via dedicated admin template when technicians are assigned.

    // notify managers
    $subjectMgr = 'تم إنشاء مشروع جديد: ' . ($title !== '' ? $title : $code);
    $htmlMgr = '<p>تم إنشاء مشروع جديد.</p>' .
        '<ul>' .
        ($title !== '' ? '<li>العنوان: ' . htmlspecialchars($title) . '</li>' : '') .
        ($code !== '' ? '<li>كود المشروع: ' . htmlspecialchars($code) . '</li>' : '') .
        ($when !== '' ? '<li>الوقت: ' . htmlspecialchars($when) . '</li>' : '') .
        '</ul>';

    $emailRecipients = $settings['admin_only']
        ? $settings['admin_emails']
        : array_values(array_unique(array_merge($settings['admin_emails'], $settings['manager_emails'])));
    foreach ($emailRecipients as $email) {
        if ($channels['email']) {
            $rcpt = (string) $email;
            if (!hasNotificationBeenSent($pdo, $eventType, 'project', $entityId, $rcpt, 'email')) {
                $ok = sendEmail($rcpt, 'Manager', $subjectMgr, $htmlMgr, $text);
                recordNotificationEvent($pdo, $eventType, 'project', $entityId, 'manager', $rcpt, 'email', $ok ? 'sent' : 'failed');
            }
        }
    }

    $tgRecipients2 = $settings['admin_only']
        ? $settings['admin_telegram_chat_ids']
        : array_values(array_unique(array_merge($settings['admin_telegram_chat_ids'], $settings['manager_telegram_chat_ids'])));
    foreach ($tgRecipients2 as $chat) {
        if ($channels['telegram']) {
            $rcpt = (string) $chat;
            if (!hasNotificationBeenSent($pdo, $eventType, 'project', $entityId, $rcpt, 'telegram')) {
                $ok = sendTelegramText($rcpt, $text);
                recordNotificationEvent($pdo, $eventType, 'project', $entityId, 'manager', $rcpt, 'telegram', $ok ? 'sent' : 'failed');
            }
        }
    }
}

function notifyReservationTechnicianAssigned(PDO $pdo, array $reservation, array $technicianIds): void
{
    if (!$technicianIds) { return; }
    $reservation = expandReservationForNotifications($pdo, $reservation);
    $eventType = 'reservation_technician_assigned';
    $settings = getNotificationSettings();
    $channels = $settings['channels'];
    $summary = buildReservationSummary($reservation);
    $entityId = (int)$reservation['id'];
    $detailsBlock = buildReservationDetailsBlock($reservation);
    $detailsHtml = '';
    $attachment = null;
    $subject = 'تم تعيينك على حجز: ' . $summary['display_id'];
    $daysLine = $summary['days'] ? "عدد الأيام: {$summary['days']}\n" : '';
    $text = "تم تعيينك على حجز\nرقم الحجز: {$summary['display_id']}\nالوقت: {$summary['when']}\n";
    $textUnified = appendFooterText($text . $daysLine . $detailsBlock);
    $textEmail = $textUnified;
    $textTelegram = $textUnified;
    $html = '<p>' . nl2br(htmlspecialchars($textUnified, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) . '</p>';

    foreach ($technicianIds as $techId) {
        $contacts = fetchTechnicianContacts($pdo, (int)$techId);
        if (!$contacts) { continue; }
        if ($channels['email'] && !empty($contacts['email'])) {
            $ok = sendEmail((string)$contacts['email'], (string)$contacts['name'], $subject, $html, $textEmail);
            recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'technician', (string)$contacts['email'], 'email', $ok ? 'sent' : 'failed');
        }
        if ($channels['telegram']) {
            $cid = (string) (getTelegramChatIdForTechnician($pdo, $contacts) ?: '');
            if ($cid !== '') {
                $ok = sendTelegramText($cid, $textTelegram);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'technician', $cid, 'telegram', $ok ? 'sent' : 'failed');
            }
        }
    }

    // Admin-specific notification: list assigned technicians and include full reservation details
    if (!empty($settings['admin_receive_all'])) {
        $names = [];
        foreach ($technicianIds as $techId) {
            $c = fetchTechnicianContacts($pdo, (int)$techId);
            if ($c && !empty($c['name'])) { $names[] = (string)$c['name']; }
        }
        $namesStr = $names ? implode('، ', $names) : 'فني(ون)';
        $adminSubject = 'تم تعيين ' . $namesStr . ' على الحجز: ' . $summary['display_id'];
        $adminHtml = '<p>' . nl2br(htmlspecialchars($textUnified, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) . '</p>';
        $adminText = 'تعيين فنيين: ' . $namesStr . "\n" .
            "رقم الحجز: {$summary['display_id']}\n" .
            "الوقت: {$summary['when']}\n" .
            ($summary['customer'] !== '' ? "العميل: {$summary['customer']}\n" : '') .
            ($summary['project_code'] !== '' ? "المشروع: {$summary['project_code']}\n" : '');
        $adminText .= $detailsBlock;
        $adminText = appendFooterText($adminText);

        if ($channels['email']) {
            foreach ($settings['admin_emails'] as $email) {
                $ok = sendEmail((string)$email, 'Admin', $adminSubject, $adminHtml, $adminText);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'admin', (string)$email, 'email', $ok ? 'sent' : 'failed');
            }
        }
        if ($channels['telegram']) {
            foreach ($settings['admin_telegram_chat_ids'] as $chat) {
                $ok = sendTelegramText((string)$chat, $adminText);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'admin', (string)$chat, 'telegram', $ok ? 'sent' : 'failed');
            }
        }
    }
}

function notifyProjectTechnicianAssigned(PDO $pdo, array $project, array $technicianIds): void
{
    if (!$technicianIds) { return; }
    $eventType = 'project_technician_assigned';
    $settings = getNotificationSettings();
    $channels = $settings['channels'];
    $entityId = (int)$project['id'];
    $title = (string) ($project['title'] ?? '');
    $code = (string) ($project['project_code'] ?? '');
    $start = (string) ($project['start_datetime'] ?? '');
    $end = (string) ($project['end_datetime'] ?? '');
    $when = $start && $end && $end !== $start ? ($start . ' — ' . $end) : $start;
    $subject = 'تم تعيينك على مشروع: ' . ($title !== '' ? $title : $code);
    $text = "تم تعيينك على مشروع\n" .
        ($code !== '' ? "كود: {$code}\n" : '') .
        ($title !== '' ? "العنوان: {$title}\n" : '') .
        ($when !== '' ? "الوقت: {$when}\n" : '');
    $html = '<p>تم تعيينك على مشروع جديد.</p><ul>' .
        ($title !== '' ? '<li>العنوان: ' . htmlspecialchars($title) . '</li>' : '') .
        ($code !== '' ? '<li>كود المشروع: ' . htmlspecialchars($code) . '</li>' : '') .
        ($when !== '' ? '<li>الوقت: ' . htmlspecialchars($when) . '</li>' : '') .
        '</ul>';

    foreach ($technicianIds as $techId) {
        $contacts = fetchTechnicianContacts($pdo, (int)$techId);
        if (!$contacts) { continue; }
        if ($channels['email'] && !empty($contacts['email'])) {
            $ok = sendEmail((string)$contacts['email'], (string)$contacts['name'], $subject, $html, $text);
            recordNotificationEvent($pdo, $eventType, 'project', $entityId, 'technician', (string)$contacts['email'], 'email', $ok ? 'sent' : 'failed');
        }
        if ($channels['telegram']) {
            $cid = (string) (getTelegramChatIdForTechnician($pdo, $contacts) ?: '');
            if ($cid !== '') {
                $ok = sendTelegramText($cid, $text);
                recordNotificationEvent($pdo, $eventType, 'project', $entityId, 'technician', $cid, 'telegram', $ok ? 'sent' : 'failed');
            }
        }
    }

    // Admin-specific notification: list assigned technicians and include key project details
    if (!empty($settings['admin_receive_all'])) {
        $names = [];
        foreach ($technicianIds as $techId) {
            $c = fetchTechnicianContacts($pdo, (int)$techId);
            if ($c && !empty($c['name'])) { $names[] = (string)$c['name']; }
        }
        $namesStr = $names ? implode('، ', $names) : 'فني(ون)';
        $adminSubject = 'تم تعيين ' . $namesStr . ' على المشروع: ' . ($code !== '' ? $code : $title);
        $adminHtml = '<p>تم تعيين ' . htmlspecialchars($namesStr) . ' على المشروع التالي:</p><ul>' .
            ($code !== '' ? '<li>كود المشروع: ' . htmlspecialchars($code) . '</li>' : '') .
            ($title !== '' ? '<li>العنوان: ' . htmlspecialchars($title) . '</li>' : '') .
            ($when !== '' ? '<li>الوقت: ' . htmlspecialchars($when) . '</li>' : '') .
            '</ul>';
        $adminText = 'تعيين فنيين: ' . $namesStr . "\n" .
            ($code !== '' ? "كود المشروع: {$code}\n" : '') .
            ($title !== '' ? "العنوان: {$title}\n" : '') .
            ($when !== '' ? "الوقت: {$when}\n" : '');

        if ($channels['email']) {
            foreach ($settings['admin_emails'] as $email) {
                $ok = sendEmail((string)$email, 'Admin', $adminSubject, $adminHtml, $adminText);
                recordNotificationEvent($pdo, $eventType, 'project', $entityId, 'admin', (string)$email, 'email', $ok ? 'sent' : 'failed');
            }
        }
        if ($channels['telegram']) {
            foreach ($settings['admin_telegram_chat_ids'] as $chat) {
                $ok = sendTelegramText((string)$chat, $adminText);
                recordNotificationEvent($pdo, $eventType, 'project', $entityId, 'admin', (string)$chat, 'telegram', $ok ? 'sent' : 'failed');
            }
        }
    }
}

function notifyReservationStatusChanged(PDO $pdo, array $reservation, string $oldStatus, string $newStatus): void
{
    $reservation = expandReservationForNotifications($pdo, $reservation);
    $eventType = 'reservation_status_changed';
    $settings = getNotificationSettings();
    $channels = $settings['channels'];
    $summary = buildReservationSummary($reservation);
    $entityId = (int)$reservation['id'];
    $detailsBlock = buildReservationDetailsBlock($reservation);
    $detailsHtml = '';
    $attachment = null;
    $subject = 'تحديث حالة الحجز: ' . $summary['display_id'];
    $daysLine = $summary['days'] ? "عدد الأيام: {$summary['days']}\n" : '';
    $text = "تغيير حالة الحجز\n" .
        "رقم الحجز: {$summary['display_id']}\n" .
        "من {$oldStatus} إلى {$newStatus}\nالوقت: {$summary['when']}";
    $textUnified = appendFooterText($text . $daysLine . $detailsBlock);
    $textEmail = $textUnified;
    $textTelegram = $textUnified;
    $html = '<p>' . nl2br(htmlspecialchars($textUnified, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) . '</p>';

    // notify technicians currently on reservation
    foreach ((array)($reservation['technicians'] ?? []) as $t) {
        $techId = (int) ($t['technician_id'] ?? ($t['id'] ?? 0));
        if ($techId <= 0) { continue; }
        $contacts = fetchTechnicianContacts($pdo, $techId);
        if (!$contacts) { continue; }
        if ($channels['email'] && !empty($contacts['email'])) {
            $ok = sendEmail((string)$contacts['email'], (string)$contacts['name'], $subject, $html, $textEmail, $attachment ? [$attachment] : []);
            recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'technician', (string)$contacts['email'], 'email', $ok ? 'sent' : 'failed');
        }
        if ($channels['telegram']) {
            $cid = (string) (getTelegramChatIdForTechnician($pdo, $contacts) ?: '');
            if ($cid !== '') {
                $ok = sendTelegramText($cid, $textTelegram);
                recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'technician', $cid, 'telegram', $ok ? 'sent' : 'failed');
            }
        }
    }

    // Admin notification with details (distinct from technician message)
    if (!empty($settings['admin_receive_all'])) {
        $adminSubject = 'تغيير حالة الحجز: ' . $summary['display_id'];
        $adminHtml = '<p>' . nl2br(htmlspecialchars($textUnified, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) . '</p>';
        $adminText = 'تغيير حالة الحجز\n' .
            "رقم الحجز: {$summary['display_id']}\n" .
            "من {$oldStatus} إلى {$newStatus}\n" .
            "الوقت: {$summary['when']}\n" .
            ($summary['location'] !== '' ? "الموقع: {$summary['location']}\n" : '') .
            ($summary['customer'] !== '' ? "العميل: {$summary['customer']}\n" : '') .
            ($summary['project_code'] !== '' ? "المشروع: {$summary['project_code']}\n" : '');
        $adminText .= $detailsBlock;
        $adminText = appendFooterText($adminText);

        if ($channels['email']) {
            foreach ($settings['admin_emails'] as $email) {
                if (!hasNotificationBeenSent($pdo, $eventType, 'reservation', $entityId, (string)$email, 'email')) {
                    $ok = sendEmail((string)$email, 'Admin', $adminSubject, $adminHtml, $adminText);
                    recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'admin', (string)$email, 'email', $ok ? 'sent' : 'failed');
                }
            }
        }
        if ($channels['telegram']) {
            foreach ($settings['admin_telegram_chat_ids'] as $chat) {
                if (!hasNotificationBeenSent($pdo, $eventType, 'reservation', $entityId, (string)$chat, 'telegram')) {
                    $ok = sendTelegramText((string)$chat, $adminText);
                    recordNotificationEvent($pdo, $eventType, 'reservation', $entityId, 'admin', (string)$chat, 'telegram', $ok ? 'sent' : 'failed');
                }
            }
        }
    }

    // notify admins/managers according to settings (manager-style content)
    sendReservationNotificationsToManagers($pdo, $reservation, $eventType);
}
