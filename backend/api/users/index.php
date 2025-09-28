<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = getDatabaseConnection();
    requireRole('admin');

    $scope = isset($_GET['scope']) ? trim((string) $_GET['scope']) : '';
    if ($method === 'GET' && $scope === 'logs') {
        handleUserLogs($pdo);
        return;
    }

    switch ($method) {
        case 'GET':
            handleUsersGet($pdo);
            break;
        case 'POST':
            handleUsersCreate($pdo);
            break;
        case 'PUT':
        case 'PATCH':
            handleUsersUpdate($pdo);
            break;
        case 'DELETE':
            handleUsersDelete($pdo);
            break;
        default:
            respondError('Method not allowed', 405);
    }
} catch (InvalidArgumentException $exception) {
    respondError($exception->getMessage(), 400);
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}

function getAllowedUserRoles(): array
{
    return ['admin', 'manager', 'technician'];
}

function handleUsersGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    if ($id > 0) {
        $user = fetchUserById($pdo, $id);
        if (!$user) {
            respondError('User not found', 404);
            return;
        }
        respond($user);
        return;
    }

    $search = trim((string) ($_GET['search'] ?? ''));
    $role = trim((string) ($_GET['role'] ?? ''));

    if ($role !== '' && !in_array($role, getAllowedUserRoles(), true)) {
        respondError('Invalid role filter', 422);
        return;
    }

    $query = <<<'SQL'
        SELECT
            u.id,
            u.username,
            u.role,
            u.last_login,
            u.created_at,
            COALESCE(s.session_count, 0) AS session_count,
            COALESCE(a.activity_count, 0) AS activity_count
        FROM users u
        LEFT JOIN (
            SELECT user_id, COUNT(*) AS session_count
            FROM session_logs
            GROUP BY user_id
        ) s ON s.user_id = u.id
        LEFT JOIN (
            SELECT user_id, COUNT(*) AS activity_count
            FROM activity_logs
            GROUP BY user_id
        ) a ON a.user_id = u.id
    SQL;

    $conditions = [];
    $params = [];

    if ($search !== '') {
        $conditions[] = 'u.username LIKE :search';
        $params['search'] = '%' . $search . '%';
    }

    if ($role !== '') {
        $conditions[] = 'u.role = :role';
        $params['role'] = $role;
    }

    if ($conditions) {
        $query .= ' WHERE ' . implode(' AND ', $conditions);
    }

    $query .= ' ORDER BY u.username ASC';

    $statement = $pdo->prepare($query);
    foreach ($params as $key => $value) {
        $statement->bindValue(':' . $key, $value, PDO::PARAM_STR);
    }
    $statement->execute();

    $users = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $users[] = mapUserRow($row);
    }

    respond($users, 200, ['count' => count($users)]);
}

function handleUsersCreate(PDO $pdo): void
{
    [$data, $errors] = validateUserPayload(readJsonPayload(), false);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    try {
        $statement = $pdo->prepare('INSERT INTO users (username, password_hash, role) VALUES (:username, :password_hash, :role)');
        $statement->execute([
            'username' => $data['username'],
            'password_hash' => password_hash($data['password'], PASSWORD_DEFAULT),
            'role' => $data['role'],
        ]);
    } catch (PDOException $exception) {
        if ((int) $exception->getCode() === 23000) {
            respondError('A user with that username already exists', 409);
            return;
        }
        throw $exception;
    }

    $userId = (int) $pdo->lastInsertId();
    $user = fetchUserById($pdo, $userId);

    logActivity($pdo, 'USER_CREATE', [
        'user_id' => $userId,
        'username' => $data['username'],
        'role' => $data['role'],
    ]);

    respond($user, 201);
}

function handleUsersUpdate(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    if ($id <= 0) {
        respondError('Missing or invalid user id', 400);
        return;
    }

    $current = fetchUserRow($pdo, $id);
    if (!$current) {
        respondError('User not found', 404);
        return;
    }

    [$data, $errors] = validateUserPayload(readJsonPayload(), true);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    if (!$data) {
        respondError('No fields provided for update', 422);
        return;
    }

    $fields = [];
    $params = ['id' => $id];

    if (isset($data['username'])) {
        if (isUsernameTaken($pdo, $data['username'], $id)) {
            respondError('A user with that username already exists', 409);
            return;
        }
        $fields[] = 'username = :username';
        $params['username'] = $data['username'];
    }

    if (isset($data['password'])) {
        $fields[] = 'password_hash = :password_hash';
        $params['password_hash'] = password_hash($data['password'], PASSWORD_DEFAULT);
    }

    if (isset($data['role'])) {
        if ($current['role'] === 'admin' && $data['role'] !== 'admin' && !hasAnotherAdmin($pdo, $id)) {
            respondError('At least one administrator must remain', 422);
            return;
        }
        $fields[] = 'role = :role';
        $params['role'] = $data['role'];
    }

    if (!$fields) {
        respondError('No fields provided for update', 422);
        return;
    }

    $sql = 'UPDATE users SET ' . implode(', ', $fields) . ' WHERE id = :id';
    $statement = $pdo->prepare($sql);
    $statement->execute($params);

    $updated = fetchUserById($pdo, $id);

    if ((int) ($_SESSION['user']['id'] ?? 0) === $id && $updated) {
        $_SESSION['user']['username'] = $updated['username'];
        $_SESSION['user']['role'] = $updated['role'];
    }

    logActivity($pdo, 'USER_UPDATE', [
        'user_id' => $id,
        'changes' => array_keys($data),
    ]);

    respond($updated);
}

function handleUsersDelete(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    if ($id <= 0) {
        respondError('Missing or invalid user id', 400);
        return;
    }

    if ((int) ($_SESSION['user']['id'] ?? 0) === $id) {
        respondError('You cannot delete the account you are currently using', 422);
        return;
    }

    $user = fetchUserRow($pdo, $id);
    if (!$user) {
        respondError('User not found', 404);
        return;
    }

    if ($user['role'] === 'admin' && !hasAnotherAdmin($pdo, $id)) {
        respondError('At least one administrator must remain', 422);
        return;
    }

    $statement = $pdo->prepare('DELETE FROM users WHERE id = :id');
    $statement->execute(['id' => $id]);

    logActivity($pdo, 'USER_DELETE', [
        'user_id' => $id,
        'username' => $user['username'],
    ]);

    respond(['deleted' => true]);
}

function handleUserLogs(PDO $pdo): void
{
    $userId = isset($_GET['user_id']) ? (int) $_GET['user_id'] : 0;
    if ($userId <= 0) {
        respondError('Missing or invalid user id', 400);
        return;
    }

    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 50;
    if ($limit < 1) {
        $limit = 1;
    } elseif ($limit > 200) {
        $limit = 200;
    }

    $user = fetchUserById($pdo, $userId);
    if (!$user) {
        respondError('User not found', 404);
        return;
    }

    $sessions = fetchUserSessionLogs($pdo, $userId, $limit);
    $activity = fetchUserActivityLogs($pdo, $userId, $limit);

    logActivity($pdo, 'USER_LOGS_VIEW', [
        'user_id' => $userId,
        'limit' => $limit,
    ]);

    respond(
        [
            'user' => array_merge($user, [
                'session_count_returned' => count($sessions),
                'activity_count_returned' => count($activity),
            ]),
            'sessions' => $sessions,
            'activity' => $activity,
        ],
        200,
        [
            'sessions_returned' => count($sessions),
            'activity_returned' => count($activity),
        ]
    );
}

function validateUserPayload(array $payload, bool $isUpdate): array
{
    $data = [];
    $errors = [];

    $hasUsername = array_key_exists('username', $payload) || !$isUpdate;
    $hasPassword = array_key_exists('password', $payload) || !$isUpdate;
    $hasRole = array_key_exists('role', $payload) || !$isUpdate;

    if ($hasUsername) {
        $username = trim((string) ($payload['username'] ?? ''));
        if ($username === '') {
            $errors['username'] = 'Username is required';
        } elseif (strlen($username) > 100) {
            $errors['username'] = 'Username must be 100 characters or fewer';
        } else {
            $data['username'] = $username;
        }
    }

    if ($hasPassword) {
        $password = (string) ($payload['password'] ?? '');
        if ($password === '') {
            $errors['password'] = 'Password is required';
        } elseif (strlen($password) < 8) {
            $errors['password'] = 'Password must be at least 8 characters';
        } elseif (strlen($password) > 255) {
            $errors['password'] = 'Password must be 255 characters or fewer';
        } else {
            $data['password'] = $password;
        }
    }

    if ($hasRole) {
        $role = strtolower(trim((string) ($payload['role'] ?? '')));
        if ($role === '') {
            $errors['role'] = 'Role is required';
        } elseif (!in_array($role, getAllowedUserRoles(), true)) {
            $errors['role'] = 'Invalid role';
        } else {
            $data['role'] = $role;
        }
    }

    return [$data, $errors];
}

function readJsonPayload(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new InvalidArgumentException('Invalid JSON payload');
    }

    return is_array($decoded) ? $decoded : [];
}

function fetchUserById(PDO $pdo, int $id): ?array
{
    $statement = $pdo->prepare(
        'SELECT
            u.id,
            u.username,
            u.role,
            u.last_login,
            u.created_at,
            (SELECT COUNT(*) FROM session_logs WHERE user_id = u.id) AS session_count,
            (SELECT COUNT(*) FROM activity_logs WHERE user_id = u.id) AS activity_count
        FROM users u
        WHERE u.id = :id
        LIMIT 1'
    );
    $statement->execute(['id' => $id]);
    $row = $statement->fetch(PDO::FETCH_ASSOC);

    return $row ? mapUserRow($row) : null;
}

function fetchUserRow(PDO $pdo, int $id): ?array
{
    $statement = $pdo->prepare('SELECT id, username, role FROM users WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    $row = $statement->fetch(PDO::FETCH_ASSOC);

    return $row ?: null;
}

function isUsernameTaken(PDO $pdo, string $username, int $ignoreId): bool
{
    $statement = $pdo->prepare('SELECT 1 FROM users WHERE username = :username AND id <> :id LIMIT 1');
    $statement->execute([
        'username' => $username,
        'id' => $ignoreId,
    ]);

    return (bool) $statement->fetchColumn();
}

function hasAnotherAdmin(PDO $pdo, int $excludeId): bool
{
    $statement = $pdo->prepare("SELECT COUNT(*) FROM users WHERE role = 'admin' AND id <> :id");
    $statement->execute(['id' => $excludeId]);
    $count = (int) $statement->fetchColumn();

    return $count > 0;
}

function fetchUserSessionLogs(PDO $pdo, int $userId, int $limit): array
{
    $statement = $pdo->prepare(
        'SELECT id, session_id, login_time, logout_time, ip_address, user_agent
        FROM session_logs
        WHERE user_id = :user_id
        ORDER BY login_time DESC
        LIMIT :limit'
    );
    $statement->bindValue(':user_id', $userId, PDO::PARAM_INT);
    $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
    $statement->execute();

    $rows = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = mapSessionRow($row);
    }

    return $rows;
}

function fetchUserActivityLogs(PDO $pdo, int $userId, int $limit): array
{
    $statement = $pdo->prepare(
        'SELECT id, session_id, action, details, timestamp
        FROM activity_logs
        WHERE user_id = :user_id
        ORDER BY timestamp DESC
        LIMIT :limit'
    );
    $statement->bindValue(':user_id', $userId, PDO::PARAM_INT);
    $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
    $statement->execute();

    $rows = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = mapActivityRow($row);
    }

    return $rows;
}

function mapUserRow(array $row): array
{
    $userId = (int) ($row['id'] ?? 0);
    $currentId = (int) ($_SESSION['user']['id'] ?? 0);

    return [
        'id' => $userId,
        'username' => (string) ($row['username'] ?? ''),
        'role' => (string) ($row['role'] ?? ''),
        'last_login' => isset($row['last_login']) ? ($row['last_login'] !== null ? (string) $row['last_login'] : null) : null,
        'created_at' => isset($row['created_at']) ? ($row['created_at'] !== null ? (string) $row['created_at'] : null) : null,
        'session_count' => (int) ($row['session_count'] ?? 0),
        'activity_count' => (int) ($row['activity_count'] ?? 0),
        'is_current_user' => $userId === $currentId,
    ];
}

function mapSessionRow(array $row): array
{
    return [
        'id' => (int) ($row['id'] ?? 0),
        'session_id' => (string) ($row['session_id'] ?? ''),
        'login_time' => isset($row['login_time']) ? ($row['login_time'] !== null ? (string) $row['login_time'] : null) : null,
        'logout_time' => isset($row['logout_time']) ? ($row['logout_time'] !== null ? (string) $row['logout_time'] : null) : null,
        'ip_address' => isset($row['ip_address']) ? ($row['ip_address'] !== null ? (string) $row['ip_address'] : null) : null,
        'user_agent' => isset($row['user_agent']) ? ($row['user_agent'] !== null ? (string) $row['user_agent'] : null) : null,
    ];
}

function mapActivityRow(array $row): array
{
    $detailsRaw = $row['details'] ?? null;
    $details = null;

    if ($detailsRaw !== null && $detailsRaw !== '') {
        $decoded = json_decode((string) $detailsRaw, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            $details = $decoded;
        } else {
            $details = (string) $detailsRaw;
        }
    }

    return [
        'id' => (int) ($row['id'] ?? 0),
        'session_id' => (string) ($row['session_id'] ?? ''),
        'action' => (string) ($row['action'] ?? ''),
        'details' => $details,
        'timestamp' => isset($row['timestamp']) ? ($row['timestamp'] !== null ? (string) $row['timestamp'] : null) : null,
    ];
}
