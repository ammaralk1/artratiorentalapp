<?php
declare(strict_types=1);

define('API_INCLUDE_MODE', true);
require_once __DIR__ . '/index.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = getDatabaseConnection();
    requireRole(['admin', 'manager']);

    ensureContactInquiryTables($pdo);
    ensureContactInquiryWorkflowColumns($pdo);
    ensureContactInquiryActivitiesTable($pdo);

    switch ($method) {
        case 'GET':
            handleContactInquiriesAdminGet($pdo);
            break;
        case 'PATCH':
        case 'PUT':
            handleContactInquiriesAdminPatch($pdo);
            break;
        default:
            respondError('Method not allowed', 405);
    }
} catch (InvalidArgumentException $exception) {
    respondError($exception->getMessage(), 422);
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}

function handleContactInquiriesAdminGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    if ($id > 0) {
        $details = fetchContactInquiryDetails($pdo, $id);
        if (!$details) {
            respondError('Inquiry not found', 404);
            return;
        }
        respond($details);
        return;
    }

    $status = normalizeContactAdminStatus((string) ($_GET['status'] ?? ''));
    $search = trim((string) ($_GET['search'] ?? ''));
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 50;
    $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

    if ($limit < 1) {
        $limit = 50;
    } elseif ($limit > 200) {
        $limit = 200;
    }
    if ($offset < 0) {
        $offset = 0;
    }

    $where = [];
    $params = [];

    if ($status !== '') {
        $where[] = 'c.status = :status';
        $params['status'] = $status;
    }

    if ($search !== '') {
        $where[] = '(c.inquiry_code LIKE :search OR c.full_name LIKE :search OR c.company_name LIKE :search OR c.email LIKE :search OR c.phone LIKE :search OR c.project_type LIKE :search)';
        $params['search'] = '%' . $search . '%';
    }

    $whereClause = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

    $countStmt = $pdo->prepare('SELECT COUNT(*) FROM contact_inquiries c ' . $whereClause);
    foreach ($params as $key => $value) {
        $countStmt->bindValue(':' . $key, $value);
    }
    $countStmt->execute();
    $total = (int) $countStmt->fetchColumn();

    $query = sprintf(
        'SELECT
            c.id,
            c.inquiry_code,
            c.full_name,
            c.company_name,
            c.email,
            c.phone,
            c.project_type,
            c.status,
            c.assigned_username,
            c.follow_up_at,
            c.last_contacted_at,
            c.notification_sent,
            c.notification_provider,
            c.created_at,
            c.updated_at,
            (
                SELECT MAX(a.created_at)
                FROM contact_inquiry_activities a
                WHERE a.inquiry_id = c.id
            ) AS last_activity_at
         FROM contact_inquiries c
         %s
         ORDER BY c.created_at DESC
         LIMIT %d OFFSET %d',
        $whereClause,
        $limit,
        $offset
    );
    $stmt = $pdo->prepare($query);
    foreach ($params as $key => $value) {
        $stmt->bindValue(':' . $key, $value);
    }
    $stmt->execute();
    $rows = $stmt->fetchAll() ?: [];

    respond($rows, 200, [
        'count' => count($rows),
        'total' => $total,
        'limit' => $limit,
        'offset' => $offset,
    ]);
}

function handleContactInquiriesAdminPatch(PDO $pdo): void
{
    $payload = readContactJsonPayload();
    $id = isset($payload['id']) ? (int) $payload['id'] : 0;
    if ($id <= 0) {
        throw new InvalidArgumentException('Valid inquiry id is required');
    }

    $existing = fetchContactInquiryRow($pdo, $id);
    if (!$existing) {
        respondError('Inquiry not found', 404);
        return;
    }

    $user = getAuthenticatedUser();
    $userId = (int) ($user['id'] ?? 0) ?: null;
    $username = trim((string) ($user['username'] ?? 'system')) ?: 'system';
    $changes = [];
    $activityMessages = [];

    if (array_key_exists('status', $payload)) {
        $status = normalizeContactAdminStatus((string) ($payload['status'] ?? ''));
        if ($status === '') {
            throw new InvalidArgumentException('Valid status is required');
        }
        if ($status !== (string) ($existing['status'] ?? 'new')) {
            $changes['status'] = $status;
            $activityMessages[] = sprintf('Status changed from "%s" to "%s".', (string) ($existing['status'] ?? 'new'), $status);
            if (in_array($status, ['contacted', 'won', 'lost', 'closed'], true)) {
                $changes['last_contacted_at'] = (new DateTimeImmutable())->format('Y-m-d H:i:s');
            }
            $changes['closed_at'] = in_array($status, ['won', 'lost', 'closed'], true)
                ? (new DateTimeImmutable())->format('Y-m-d H:i:s')
                : null;
        }
    }

    if (array_key_exists('internal_notes', $payload)) {
        $notes = normalizeContactMultiline((string) ($payload['internal_notes'] ?? ''), 5000);
        $existingNotes = trim((string) ($existing['internal_notes'] ?? ''));
        if ($notes !== $existingNotes) {
            $changes['internal_notes'] = $notes !== '' ? $notes : null;
            $activityMessages[] = $notes !== ''
                ? 'Internal notes updated.'
                : 'Internal notes cleared.';
        }
    }

    if (array_key_exists('follow_up_at', $payload)) {
        $followUpAt = normalizeContactDateTime(isset($payload['follow_up_at']) ? (string) $payload['follow_up_at'] : null);
        $existingFollowUp = trim((string) ($existing['follow_up_at'] ?? ''));
        $normalizedExistingFollowUp = $existingFollowUp !== '' ? str_replace('T', ' ', substr($existingFollowUp, 0, 19)) : '';
        if (($followUpAt ?? '') !== $normalizedExistingFollowUp) {
            $changes['follow_up_at'] = $followUpAt;
            $activityMessages[] = $followUpAt
                ? ('Follow-up date set to ' . $followUpAt . '.')
                : 'Follow-up date cleared.';
        }
    }

    if (!empty($payload['assign_to_me'])) {
        if ((int) ($existing['assigned_user_id'] ?? 0) !== (int) ($userId ?? 0)) {
            $changes['assigned_user_id'] = $userId;
            $changes['assigned_username'] = $username;
            $activityMessages[] = sprintf('Inquiry assigned to %s.', $username);
        }
    }

    if (!empty($payload['mark_contacted'])) {
        $changes['last_contacted_at'] = (new DateTimeImmutable())->format('Y-m-d H:i:s');
        if (!isset($changes['status']) && (string) ($existing['status'] ?? 'new') === 'new') {
            $changes['status'] = 'contacted';
        }
        $activityMessages[] = 'Customer contact marked as completed.';
    }

    if ($changes === []) {
        throw new InvalidArgumentException('No changes provided');
    }

    $assignments = [];
    $params = ['id' => $id];
    foreach ($changes as $column => $value) {
        $assignments[] = $column . ' = :' . $column;
        $params[$column] = $value;
    }
    $assignments[] = 'updated_at = CURRENT_TIMESTAMP';

    $stmt = $pdo->prepare(
        'UPDATE contact_inquiries
         SET ' . implode(', ', $assignments) . '
         WHERE id = :id'
    );
    $stmt->execute($params);

    foreach ($activityMessages as $message) {
        insertContactInquiryActivity($pdo, [
            'inquiry_id' => $id,
            'user_id' => $userId,
            'username' => $username,
            'action_type' => 'updated',
            'message' => $message,
        ]);
    }

    $details = fetchContactInquiryDetails($pdo, $id);
    if (!$details) {
        respondError('Inquiry not found', 404);
        return;
    }

    respond($details);
}

function fetchContactInquiryDetails(PDO $pdo, int $id): ?array
{
    $inquiry = fetchContactInquiryRow($pdo, $id);
    if (!$inquiry) {
        return null;
    }

    $activityStmt = $pdo->prepare(
        'SELECT id, inquiry_id, user_id, username, action_type, message, created_at
         FROM contact_inquiry_activities
         WHERE inquiry_id = :id
         ORDER BY created_at DESC, id DESC'
    );
    $activityStmt->execute(['id' => $id]);
    $activities = $activityStmt->fetchAll() ?: [];

    return [
        'inquiry' => $inquiry,
        'activities' => $activities,
    ];
}

function fetchContactInquiryRow(PDO $pdo, int $id): ?array
{
    $stmt = $pdo->prepare(
        'SELECT
            id,
            inquiry_code,
            full_name,
            company_name,
            email,
            phone,
            project_type,
            message,
            status,
            internal_notes,
            assigned_user_id,
            assigned_username,
            follow_up_at,
            last_contacted_at,
            closed_at,
            inquiry_lang,
            source_path,
            notification_attempted,
            notification_sent,
            notification_provider,
            notification_recipient,
            notification_subject,
            notification_error,
            notified_at,
            created_at,
            updated_at
         FROM contact_inquiries
         WHERE id = :id
         LIMIT 1'
    );
    $stmt->execute(['id' => $id]);
    $row = $stmt->fetch();
    return $row ?: null;
}
