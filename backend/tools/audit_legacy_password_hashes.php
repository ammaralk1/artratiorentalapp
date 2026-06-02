<?php
declare(strict_types=1);

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/tool_config.php';

try {
    $dbSettings = loadCliDbSettings($argv, __DIR__ . '/../config.php');
} catch (Throwable $configError) {
    fwrite(STDERR, $configError->getMessage() . "\n");
    exit(1);
}

try {
    $pdo = create_pdo($dbSettings);
} catch (Throwable $exception) {
    fwrite(STDERR, "Failed to connect to the database: " . $exception->getMessage() . "\n");
    exit(1);
}

$statement = $pdo->query('SELECT id, username, password_hash, role FROM users ORDER BY id ASC');
$rows = $statement ? $statement->fetchAll() : [];

$legacyRows = [];
foreach ($rows as $row) {
    $hash = (string) ($row['password_hash'] ?? '');
    $type = null;

    if ($hash !== '' && preg_match('/^[a-f0-9]{32}$/i', $hash)) {
        $type = 'md5';
    } elseif ($hash !== '' && !password_get_info($hash)['algo']) {
        $type = 'plain_or_unknown';
    }

    if ($type !== null) {
        $legacyRows[] = [
            'id' => (string) ($row['id'] ?? ''),
            'username' => (string) ($row['username'] ?? ''),
            'role' => (string) ($row['role'] ?? ''),
            'type' => $type,
        ];
    }
}

if ($legacyRows === []) {
    echo "No legacy password hashes found.\n";
    exit(0);
}

echo "Legacy password hashes found: " . count($legacyRows) . "\n";
echo "These users should be force-reset before disabling security.allow_legacy_password_login.\n\n";
echo str_pad('ID', 8) . str_pad('Username', 32) . str_pad('Role', 16) . "Type\n";
echo str_repeat('-', 68) . "\n";

foreach ($legacyRows as $row) {
    echo str_pad($row['id'], 8)
        . str_pad($row['username'], 32)
        . str_pad($row['role'], 16)
        . $row['type']
        . "\n";
}

exit(2);
