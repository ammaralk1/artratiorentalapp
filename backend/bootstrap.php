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
