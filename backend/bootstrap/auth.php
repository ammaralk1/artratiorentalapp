<?php

declare(strict_types=1);

function getClientIpAddress(): string
{
    $fallback = '0.0.0.0';

    $candidates = [];

    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $forwardedFor = explode(',', (string) $_SERVER['HTTP_X_FORWARDED_FOR']);
        foreach ($forwardedFor as $part) {
            $trimmed = trim($part);
            if ($trimmed !== '') {
                $candidates[] = $trimmed;
            }
        }
    }

    if (!empty($_SERVER['HTTP_X_REAL_IP'])) {
        $candidates[] = (string) $_SERVER['HTTP_X_REAL_IP'];
    }

    if (!empty($_SERVER['REMOTE_ADDR'])) {
        $candidates[] = (string) $_SERVER['REMOTE_ADDR'];
    }

    foreach ($candidates as $candidate) {
        if (filter_var($candidate, FILTER_VALIDATE_IP)) {
            return $candidate;
        }
    }

    return $fallback;
}

function validateLoginUsername(string $username): ?string
{
    if ($username === '') {
        return 'Username is required';
    }

    $length = strlen($username);

    if ($length < 3) {
        return 'Username must be at least 3 characters';
    }

    if ($length > 100) {
        return 'Username must be 100 characters or fewer';
    }

    if (!preg_match('/^[A-Za-z0-9._@-]+$/', $username)) {
        return 'Username contains invalid characters';
    }

    return null;
}

function validateLoginPassword(string $password): ?string
{
    if ($password === '') {
        return 'Password is required';
    }

    $length = strlen($password);

    if ($length < 8) {
        return 'Password must be at least 8 characters';
    }

    if ($length > 255) {
        return 'Password must be 255 characters or fewer';
    }

    if (preg_match('/[\x00-\x1F\x7F]/', $password)) {
        return 'Password contains invalid characters';
    }

    return null;
}

function findUserByUsername(PDO $pdo, string $username): ?array
{
    $statement = $pdo->prepare('SELECT id, username, password_hash, role, last_login FROM users WHERE username = :username LIMIT 1');
    $statement->execute(['username' => $username]);
    $user = $statement->fetch();

    return $user ?: null;
}

function verifyCredentials(string $username, string $password, ?PDO $pdo = null): ?array
{
    $normalizedUsername = trim($username);

    if ($normalizedUsername === '' || $password === '') {
        return null;
    }

    $pdo ??= getDatabaseConnection();
    $user = findUserByUsername($pdo, $normalizedUsername);

    if (!$user) {
        return null;
    }

    $storedHash = (string) ($user['password_hash'] ?? '');
    $passwordValid = false;
    $needsUpgrade = false;

    if ($storedHash !== '' && password_verify($password, $storedHash)) {
        $passwordValid = true;
    }

    if (!$passwordValid) {
        $plainMatch = $storedHash !== '' && hash_equals($storedHash, $password);
        $legacyMd5Match = $storedHash !== ''
            && preg_match('/^[a-f0-9]{32}$/i', $storedHash)
            && hash_equals($storedHash, md5($password));

        if ($plainMatch || $legacyMd5Match) {
            $passwordValid = true;
            $needsUpgrade = true;
        }
    }

    if (!$passwordValid) {
        return null;
    }

    if ($needsUpgrade) {
        try {
            $newHash = password_hash($password, PASSWORD_DEFAULT);
            if (is_string($newHash) && $newHash !== '') {
                $statement = $pdo->prepare('UPDATE users SET password_hash = :hash WHERE id = :id');
                $statement->execute([
                    'hash' => $newHash,
                    'id' => $user['id'],
                ]);
                $user['password_hash'] = $newHash;
            }
        } catch (Throwable $error) {
            error_log('Failed to upgrade password hash: ' . $error->getMessage());
        }
    }

    return $user;
}

function ensureLoginAttemptsTable(PDO $pdo): void
{
    static $ensured = false;

    if ($ensured) {
        return;
    }

    try {
        $pdo->exec(
            'CREATE TABLE IF NOT EXISTS login_attempts (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                ip_address VARCHAR(45) NOT NULL,
                attempted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                success TINYINT(1) NOT NULL DEFAULT 0,
                INDEX idx_login_attempts_username (username),
                INDEX idx_login_attempts_ip (ip_address),
                INDEX idx_login_attempts_attempted_at (attempted_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
        );
    } catch (Throwable $error) {
        error_log('Failed to ensure login_attempts table: ' . $error->getMessage());
    }

    $ensured = true;
}

function purgeLoginAttempts(PDO $pdo, ?DateTimeImmutable $threshold = null): void
{
    static $purged = false;

    if ($purged) {
        return;
    }

    $threshold ??= new DateTimeImmutable('-1 day');

    try {
        $statement = $pdo->prepare('DELETE FROM login_attempts WHERE attempted_at < :threshold');
        $statement->execute([
            'threshold' => $threshold->format('Y-m-d H:i:s'),
        ]);
    } catch (Throwable $error) {
        error_log('Failed to purge login attempts: ' . $error->getMessage());
    }

    $purged = true;
}

function recordLoginAttempt(PDO $pdo, string $username, string $ipAddress, bool $success): void
{
    $normalizedUsername = trim($username);
    $ip = $ipAddress !== '' ? $ipAddress : '0.0.0.0';

    try {
        ensureLoginAttemptsTable($pdo);
        purgeLoginAttempts($pdo);

        $statement = $pdo->prepare('INSERT INTO login_attempts (username, ip_address, attempted_at, success)
            VALUES (:username, :ip_address, :attempted_at, :success)');
        $statement->execute([
            'username' => substr($normalizedUsername, 0, 100),
            'ip_address' => substr($ip, 0, 45),
            'attempted_at' => (new DateTimeImmutable())->format('Y-m-d H:i:s'),
            'success' => $success ? 1 : 0,
        ]);

        if ($success) {
            $cleanup = $pdo->prepare('DELETE FROM login_attempts WHERE (username = :username OR ip_address = :ip_address) AND success = 0');
            $cleanup->execute([
                'username' => substr($normalizedUsername, 0, 100),
                'ip_address' => substr($ip, 0, 45),
            ]);
        }
    } catch (Throwable $error) {
        error_log('Failed to record login attempt: ' . $error->getMessage());
    }
}

function isLoginRateLimited(PDO $pdo, string $username, string $ipAddress, int $maxAttempts = 5, int $decaySeconds = 900): bool
{
    $normalizedUsername = trim($username);
    $ip = $ipAddress !== '' ? $ipAddress : '0.0.0.0';

    try {
        ensureLoginAttemptsTable($pdo);
        purgeLoginAttempts($pdo);

        $since = (new DateTimeImmutable(sprintf('-%d seconds', max(1, $decaySeconds))))->format('Y-m-d H:i:s');

        $conditions = ['ip_address = :ip_address'];
        $params = [
            'ip_address' => substr($ip, 0, 45),
            'since' => $since,
        ];

        if ($normalizedUsername !== '') {
            $conditions[] = 'username = :username';
            $params['username'] = substr($normalizedUsername, 0, 100);
        }

        $query = 'SELECT COUNT(*) AS failures FROM login_attempts WHERE success = 0 AND attempted_at >= :since AND (' . implode(' OR ', $conditions) . ')';
        $statement = $pdo->prepare($query);
        $statement->execute($params);

        $failures = (int) $statement->fetchColumn();

        if ($failures >= $maxAttempts) {
            error_log(sprintf('Login rate limit triggered for username "%s" from IP %s', $normalizedUsername ?: 'unknown', $ip));
            return true;
        }
    } catch (Throwable $error) {
        error_log('Failed to evaluate login rate limit: ' . $error->getMessage());
    }

    return false;
}

function normaliseActivityDetails(mixed $details): ?string
{
    if ($details === null) {
        return null;
    }

    if ($details instanceof JsonSerializable) {
        $details = $details->jsonSerialize();
    }

    if (is_string($details)) {
        $details = ['message' => $details];
    } elseif (!is_array($details)) {
        $details = ['value' => $details];
    }

    $encoded = json_encode($details, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    return $encoded === false ? null : $encoded;
}

function logActivity(PDO $pdo, string $action, mixed $details = null): void
{
    if (!isAuthenticated()) {
        return;
    }

    $user = $_SESSION['user'];

    try {
        $statement = $pdo->prepare('INSERT INTO activity_logs (user_id, session_id, action, details)
            VALUES (:user_id, :session_id, :action, :details)');
        $statement->execute([
            'user_id' => $user['id'],
            'session_id' => $user['session_id'],
            'action' => $action,
            'details' => normaliseActivityDetails($details),
        ]);
    } catch (Throwable $exception) {
        error_log('Failed to write activity log: ' . $exception->getMessage());
    }
}

function loginUser(array $user): void
{
    $pdo = getDatabaseConnection();

    session_regenerate_id(true);
    $sessionId = session_id();
    $loginTime = (new DateTimeImmutable())->format('Y-m-d H:i:s');

    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;

    $statement = $pdo->prepare('INSERT INTO session_logs (user_id, session_id, login_time, ip_address, user_agent)
        VALUES (:user_id, :session_id, :login_time, :ip_address, :user_agent)');
    $statement->execute([
        'user_id' => $user['id'],
        'session_id' => $sessionId,
        'login_time' => $loginTime,
        'ip_address' => $ipAddress,
        'user_agent' => $userAgent,
    ]);

    $sessionLogId = (int) $pdo->lastInsertId();

    $update = $pdo->prepare('UPDATE users SET last_login = :last_login WHERE id = :id');
    $update->execute([
        'last_login' => $loginTime,
        'id' => $user['id'],
    ]);

    $_SESSION['user'] = [
        'id' => (int) $user['id'],
        'username' => (string) $user['username'],
        'role' => (string) $user['role'],
        'login_at' => $loginTime,
        'session_id' => $sessionId,
        'session_log_id' => $sessionLogId,
    ];

    $_SESSION['preferences'] = fetchPersistedUserPreferences($pdo, (int) $user['id']);

    logActivity($pdo, 'LOGIN_SUCCESS', [
        'ip' => $ipAddress,
        'user_agent' => $userAgent,
        'previous_login' => $user['last_login'] ?? null,
    ]);
}

function logoutUser(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        return;
    }

    $user = $_SESSION['user'] ?? null;

    if ($user && isset($user['session_id'])) {
        $pdo = getDatabaseConnection();
        $sessionId = (string) $user['session_id'];

        try {
            $statement = $pdo->prepare('UPDATE session_logs SET logout_time = :logout_time WHERE session_id = :session_id AND logout_time IS NULL');
            $statement->execute([
                'logout_time' => (new DateTimeImmutable())->format('Y-m-d H:i:s'),
                'session_id' => $sessionId,
            ]);
        } catch (Throwable $exception) {
            error_log('Failed to update session_logs on logout: ' . $exception->getMessage());
        }

        logActivity($pdo, 'LOGOUT', [
            'ip' => $_SERVER['REMOTE_ADDR'] ?? null,
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
        ]);
    }

    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'] ?? '/',
            $params['domain'] ?? '',
            (bool) ($params['secure'] ?? false),
            (bool) ($params['httponly'] ?? true)
        );
    }

    session_destroy();
}

function getAuthenticatedUser(): ?array
{
    if (!isAuthenticated()) {
        return null;
    }

    return [
        'id' => (int) $_SESSION['user']['id'],
        'username' => (string) $_SESSION['user']['username'],
        'role' => (string) $_SESSION['user']['role'],
        'loginAt' => $_SESSION['user']['login_at'] ?? null,
    ];
}

function isAuthenticated(): bool
{
    return isset($_SESSION['user']['id']) && (int) $_SESSION['user']['id'] > 0;
}

function requireAuthenticated(): void
{
    if (!isAuthenticated()) {
        respondError('Unauthorized', 401);
        exit;
    }
}

function requireRole(string|array $roles): void
{
    requireAuthenticated();

    $allowedRoles = is_array($roles) ? $roles : [$roles];
    $allowedRoles = array_map(static fn($role) => (string) $role, $allowedRoles);
    $currentRole = (string) ($_SESSION['user']['role'] ?? '');

    if (!in_array($currentRole, $allowedRoles, true)) {
        logActivity(getDatabaseConnection(), 'AUTHORIZATION_DENIED', [
            'required_roles' => $allowedRoles,
            'current_role' => $currentRole,
            'path' => $_SERVER['REQUEST_URI'] ?? null,
        ]);

        respondError('Forbidden', 403);
        exit;
    }
}
