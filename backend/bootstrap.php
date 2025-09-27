<?php
declare(strict_types=1);

use PDO;

require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

$configFile = __DIR__ . '/config.php';

if (!is_file($configFile)) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Missing configuration file. Copy backend/config.example.php to backend/config.php and fill in your credentials.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$config = require $configFile;

$sessionName = $config['security']['session_name'] ?? 'art_ratio_session';
$cookieParams = [
    'lifetime' => 0,
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax',
];

if (!empty($_SERVER['HTTPS']) && strtolower((string) $_SERVER['HTTPS']) !== 'off') {
    $cookieParams['secure'] = true;
}

if (PHP_SESSION_ACTIVE !== session_status()) {
    session_name($sessionName);
    session_set_cookie_params($cookieParams);
    session_start();
}

// Basic CORS allow list
$allowedOrigins = $config['security']['allowed_origins'] ?? [];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin && (empty($allowedOrigins) || in_array($origin, $allowedOrigins, true))) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function respond(mixed $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function respondError(string $message, int $status = 400, array $extra = []): void
{
    respond(array_merge([
        'ok' => false,
        'error' => $message,
    ], $extra), $status);
}

function getDatabaseConnection(): PDO
{
    global $config;
    return create_pdo($config['db'] ?? []);
}

function getAuthSettings(): ?array
{
    global $config;

    $auth = $config['auth'] ?? null;
    if (!is_array($auth)) {
        return null;
    }

    if (!isset($auth['username_hash'], $auth['password_hash'])) {
        return null;
    }

    return [
        'username_hash' => (string) $auth['username_hash'],
        'password_hash' => (string) $auth['password_hash'],
    ];
}

function verifyCredentials(string $username, string $password): bool
{
    $auth = getAuthSettings();
    if (!$auth) {
        return false;
    }

    $usernameHash = hash('sha256', trim($username));
    $passwordHash = hash('sha256', trim($password));

    return hash_equals($auth['username_hash'], $usernameHash)
        && hash_equals($auth['password_hash'], $passwordHash);
}

function loginUser(string $username): void
{
    $_SESSION['user'] = [
        'username' => $username,
        'login_at' => time(),
    ];
}

function logoutUser(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        return;
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
    if (!isset($_SESSION['user']['username'])) {
        return null;
    }

    return [
        'username' => (string) $_SESSION['user']['username'],
        'loginAt' => $_SESSION['user']['login_at'] ?? null,
    ];
}

function isAuthenticated(): bool
{
    return isset($_SESSION['user']['username']) && $_SESSION['user']['username'] !== '';
}

function requireAuthenticated(): void
{
    if (!isAuthenticated()) {
        respondError('Unauthorized', 401);
        exit;
    }
}
