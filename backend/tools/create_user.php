<?php
declare(strict_types=1);

require_once __DIR__ . '/../db.php';

$configPath = realpath(__DIR__ . '/../config.php');
if ($configPath === false || !file_exists($configPath)) {
    fwrite(STDERR, "Configuration file not found.\n");
    exit(1);
}

$config = require $configPath;
$dbSettings = $config['db'] ?? null;

if (!is_array($dbSettings)) {
    fwrite(STDERR, "Database settings are missing from config.php.\n");
    exit(1);
}

$allowedRoles = ['admin', 'manager', 'technician'];

if ($argc < 4) {
    fwrite(STDERR, "Usage: php create_user.php <username> <password> <role>\n");
    fwrite(STDERR, "Allowed roles: " . implode(', ', $allowedRoles) . "\n");
    exit(1);
}

[$script, $username, $password, $role] = $argv;

$username = trim($username);
$role = strtolower(trim($role));

if ($username === '') {
    fwrite(STDERR, "Username cannot be empty.\n");
    exit(1);
}

if ($password === '') {
    fwrite(STDERR, "Password cannot be empty.\n");
    exit(1);
}

if (!in_array($role, $allowedRoles, true)) {
    fwrite(STDERR, "Invalid role '{$role}'. Allowed roles: " . implode(', ', $allowedRoles) . "\n");
    exit(1);
}

try {
    $pdo = create_pdo($dbSettings);
} catch (Throwable $exception) {
    fwrite(STDERR, "Failed to connect to the database: " . $exception->getMessage() . "\n");
    exit(1);
}

$hash = password_hash($password, PASSWORD_DEFAULT);

try {
    $statement = $pdo->prepare('INSERT INTO users (username, password_hash, role) VALUES (:username, :password_hash, :role)');
    $statement->execute([
        'username' => $username,
        'password_hash' => $hash,
        'role' => $role,
    ]);
} catch (PDOException $exception) {
    if ((int) $exception->getCode() === 23000) {
        fwrite(STDERR, "A user with that username already exists.\n");
        exit(1);
    }

    fwrite(STDERR, "Failed to create user: " . $exception->getMessage() . "\n");
    exit(1);
}

echo "User '{$username}' created successfully with role '{$role}'.\n";
