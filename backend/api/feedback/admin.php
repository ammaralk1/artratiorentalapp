<?php
declare(strict_types=1);

define('API_INCLUDE_MODE', true);
require_once __DIR__ . '/index.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = getDatabaseConnection();
    requireRole(['admin', 'manager']);

    ensureFeedbackSubmissionTables($pdo);
    ensureFeedbackSubmissionWorkflowColumns($pdo);
    ensureFeedbackSubmissionActivitiesTable($pdo);

    switch ($method) {
        case 'GET':
            handleFeedbackAdminGet($pdo);
            break;
        case 'PATCH':
        case 'PUT':
            handleFeedbackAdminPatch($pdo);
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

function handleFeedbackAdminGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    if ($id > 0) {
        $details = fetchFeedbackSubmissionDetails($pdo, $id);
        if (!$details) {
            respondError('Feedback not found', 404);
            return;
        }
        respond($details);
        return;
    }

    $status = normalizeFeedbackAdminStatus((string) ($_GET['status'] ?? ''));
    $search = trim((string) ($_GET['search'] ?? ''));
    $rating = isset($_GET['rating']) ? (int) $_GET['rating'] : 0;
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
        $where[] = 'f.status = :status';
        $params['status'] = $status;
    }

    if ($rating >= 1 && $rating <= 5) {
        $where[] = 'f.overall_rating = :rating';
        $params['rating'] = $rating;
    }

    if ($search !== '') {
        $where[] = '(f.feedback_code LIKE :search OR f.full_name LIKE :search OR f.company_name LIKE :search OR f.email LIKE :search OR f.service_type LIKE :search OR f.feedback_message LIKE :search)';
        $params['search'] = '%' . $search . '%';
    }

    $whereClause = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

    $countStmt = $pdo->prepare('SELECT COUNT(*) FROM feedback_submissions f ' . $whereClause);
    foreach ($params as $key => $value) {
        $countStmt->bindValue(':' . $key, $value);
    }
    $countStmt->execute();
    $total = (int) $countStmt->fetchColumn();

    $query = sprintf(
        'SELECT
            f.id,
            f.feedback_code,
            f.full_name,
            f.email,
            f.company_name,
            f.service_type,
            f.overall_rating,
            f.recommendation,
            f.status,
            f.assigned_username,
            f.follow_up_at,
            f.last_responded_at,
            f.notification_sent,
            f.notification_provider,
            f.created_at,
            f.updated_at,
            (
                SELECT MAX(a.created_at)
                FROM feedback_submission_activities a
                WHERE a.feedback_id = f.id
            ) AS last_activity_at
         FROM feedback_submissions f
         %s
         ORDER BY f.created_at DESC
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

function handleFeedbackAdminPatch(PDO $pdo): void
{
    $payload = readFeedbackJsonPayload();
    $id = isset($payload['id']) ? (int) $payload['id'] : 0;
    if ($id <= 0) {
        throw new InvalidArgumentException('Valid feedback id is required');
    }

    $existing = fetchFeedbackSubmissionRow($pdo, $id);
    if (!$existing) {
        respondError('Feedback not found', 404);
        return;
    }

    $user = getAuthenticatedUser();
    $userId = (int) ($user['id'] ?? 0) ?: null;
    $username = trim((string) ($user['username'] ?? 'system')) ?: 'system';
    $changes = [];
    $activityMessages = [];

    if (array_key_exists('status', $payload)) {
        $status = normalizeFeedbackAdminStatus((string) ($payload['status'] ?? ''));
        if ($status === '') {
            throw new InvalidArgumentException('Valid status is required');
        }
        if ($status !== (string) ($existing['status'] ?? 'new')) {
            $changes['status'] = $status;
            $activityMessages[] = sprintf('Status changed from "%s" to "%s".', (string) ($existing['status'] ?? 'new'), $status);
            if ($status === 'responded') {
                $changes['last_responded_at'] = (new DateTimeImmutable())->format('Y-m-d H:i:s');
            }
            $changes['closed_at'] = $status === 'closed'
                ? (new DateTimeImmutable())->format('Y-m-d H:i:s')
                : null;
        }
    }

    if (array_key_exists('internal_notes', $payload)) {
        $notes = normalizeFeedbackMultiline((string) ($payload['internal_notes'] ?? ''), 5000);
        $existingNotes = trim((string) ($existing['internal_notes'] ?? ''));
        if ($notes !== $existingNotes) {
            $changes['internal_notes'] = $notes !== '' ? $notes : null;
            $activityMessages[] = $notes !== ''
                ? 'Internal notes updated.'
                : 'Internal notes cleared.';
        }
    }

    if (array_key_exists('follow_up_at', $payload)) {
        $followUpAt = normalizeFeedbackDateTime(isset($payload['follow_up_at']) ? (string) $payload['follow_up_at'] : null);
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
            $activityMessages[] = sprintf('Feedback assigned to %s.', $username);
        }
    }

    if (!empty($payload['mark_responded'])) {
        $changes['last_responded_at'] = (new DateTimeImmutable())->format('Y-m-d H:i:s');
        if (!isset($changes['status']) && in_array((string) ($existing['status'] ?? 'new'), ['new', 'reviewed', 'follow_up_needed'], true)) {
            $changes['status'] = 'responded';
        }
        $activityMessages[] = 'Customer response marked as completed.';
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
        'UPDATE feedback_submissions
         SET ' . implode(', ', $assignments) . '
         WHERE id = :id'
    );
    $stmt->execute($params);

    foreach ($activityMessages as $message) {
        insertFeedbackSubmissionActivity($pdo, [
            'feedback_id' => $id,
            'user_id' => $userId,
            'username' => $username,
            'action_type' => 'updated',
            'message' => $message,
        ]);
    }

    $details = fetchFeedbackSubmissionDetails($pdo, $id);
    if (!$details) {
        respondError('Feedback not found', 404);
        return;
    }

    respond($details);
}

function fetchFeedbackSubmissionDetails(PDO $pdo, int $id): ?array
{
    $feedback = fetchFeedbackSubmissionRow($pdo, $id);
    if (!$feedback) {
        return null;
    }

    $activityStmt = $pdo->prepare(
        'SELECT id, feedback_id, user_id, username, action_type, message, created_at
         FROM feedback_submission_activities
         WHERE feedback_id = :id
         ORDER BY created_at DESC, id DESC'
    );
    $activityStmt->execute(['id' => $id]);
    $activities = $activityStmt->fetchAll() ?: [];

    return [
        'feedback' => $feedback,
        'activities' => $activities,
    ];
}

function fetchFeedbackSubmissionRow(PDO $pdo, int $id): ?array
{
    $stmt = $pdo->prepare(
        'SELECT
            id,
            feedback_code,
            full_name,
            email,
            company_name,
            service_type,
            overall_rating,
            recommendation,
            feedback_message,
            status,
            internal_notes,
            assigned_user_id,
            assigned_username,
            follow_up_at,
            last_responded_at,
            closed_at,
            feedback_lang,
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
         FROM feedback_submissions
         WHERE id = :id
         LIMIT 1'
    );
    $stmt->execute(['id' => $id]);
    $row = $stmt->fetch();
    return $row ?: null;
}
