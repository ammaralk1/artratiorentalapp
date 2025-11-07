<?php
declare(strict_types=1);

// Usage examples:
//   php backend/tools/backup_mysql.php
//   php backend/tools/backup_mysql.php --output-dir /path/to/backups --retention-days 14
//
// This script reads DB config from backend/config.php via bootstrap.php,
// runs a safe mysqldump, gzips it, and (optionally) prunes old backups.

require_once __DIR__ . '/../bootstrap.php';

function eprintf(string $fmt, mixed ...$args): void {
    fwrite(STDERR, vsprintf($fmt, $args));
}

function parseArgs(array $argv): array {
    $opts = [
        'outputDir' => null,
        'retentionDays' => null,
        'all' => false,
    ];

    foreach ($argv as $arg) {
        if (str_starts_with($arg, '--output-dir=')) {
            $opts['outputDir'] = substr($arg, strlen('--output-dir='));
        } elseif ($arg === '--output-dir') {
            // support "--output-dir /path"
            $opts['outputDir'] = null; // will be filled by next token in main
        } elseif (str_starts_with($arg, '--retention-days=')) {
            $opts['retentionDays'] = (int) substr($arg, strlen('--retention-days='));
        } elseif ($arg === '--retention-days') {
            $opts['retentionDays'] = null; // will be filled by next token in main
        } elseif ($arg === '--all' || $arg === '-A') {
            $opts['all'] = true;
        }
    }

    return $opts;
}

function nextTokenValue(array $argv, int $i): ?string {
    return $argv[$i + 1] ?? null;
}

function ensureDir(string $dir): void {
    if (!is_dir($dir)) {
        if (!mkdir($dir, 0775, true) && !is_dir($dir)) {
            throw new RuntimeException("Failed to create directory: {$dir}");
        }
    }
}

function buildDefaultsFile(array $db): string {
    $content = "[client]\n" .
        'user=' . $db['user'] . "\n" .
        'password=' . $db['pass'] . "\n" .
        'host=' . ($db['host'] ?? 'localhost') . "\n" .
        'port=' . ($db['port'] ?? 3306) . "\n";

    $tmpDir = sys_get_temp_dir();
    $path = tempnam($tmpDir, 'mycnf_');
    if ($path === false) {
        throw new RuntimeException('Failed to create temp defaults file');
    }
    // Restrict perms: owner read/write only
    umask(0077);
    file_put_contents($path, $content);
    chmod($path, 0600);
    return $path;
}

function run(string $cmd, array $env = []): array {
    $descriptorspec = [
        1 => ['pipe', 'w'], // stdout
        2 => ['pipe', 'w'], // stderr
    ];
    $proc = proc_open($cmd, $descriptorspec, $pipes, null, $env);
    if (!is_resource($proc)) {
        throw new RuntimeException('Failed to start process');
    }
    $stdout = stream_get_contents($pipes[1]);
    $stderr = stream_get_contents($pipes[2]);
    foreach ($pipes as $p) { if (is_resource($p)) fclose($p); }
    $code = proc_close($proc);
    return [$code, $stdout, $stderr];
}

function pruneOldBackups(string $dir, int $retentionDays, string $dbName): void {
    if ($retentionDays <= 0) { return; }
    $now = time();
    $dh = opendir($dir);
    if ($dh === false) { return; }
    $patternPrefix = "mysql-backup-{$dbName}-"; // e.g. mysql-backup-db-YYYYMMDD_HHMMSS.sql.gz
    while (($file = readdir($dh)) !== false) {
        if ($file === '.' || $file === '..') { continue; }
        if (!str_starts_with($file, $patternPrefix)) { continue; }
        $full = rtrim($dir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $file;
        if (!is_file($full)) { continue; }
        $mtime = filemtime($full) ?: 0;
        $ageDays = (int) floor(($now - $mtime) / 86400);
        if ($ageDays > $retentionDays) {
            @unlink($full);
        }
    }
    closedir($dh);
}

try {
    $argv0 = array_values($argv);
    $opts = parseArgs($argv0);

    // Fill separated values (e.g., --output-dir /path)
    for ($i = 0; $i < $argc; $i++) {
        if ($argv[$i] === '--output-dir') {
            $opts['outputDir'] = nextTokenValue($argv, $i) ?? $opts['outputDir'];
        } elseif ($argv[$i] === '--retention-days') {
            $val = nextTokenValue($argv, $i);
            $opts['retentionDays'] = $val !== null ? (int) $val : $opts['retentionDays'];
        }
    }

    $db = getAppConfig('db');
    if (!is_array($db) || empty($db['name']) || empty($db['user'])) {
        throw new RuntimeException('Missing DB configuration in backend/config.php');
    }

    $dbName = (string) $db['name'];
    $outputDir = $opts['outputDir'] ?: realpath(__DIR__ . '/..' . '/../backups/mysql');
    if ($outputDir === false) {
        // fallback to project root backups/mysql
        $outputDir = dirname(__DIR__, 2) . '/backups/mysql';
    }
    ensureDir($outputDir);

    $timestamp = (new DateTimeImmutable('now'))->format('Ymd_His');
    $label = ($opts['all'] ?? false) ? 'all-databases' : $dbName;
    $filename = sprintf('mysql-backup-%s-%s.sql.gz', $label, $timestamp);
    $backupPath = rtrim($outputDir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $filename;

    // Create a secure temp defaults file to avoid exposing password via argv
    $defaultsFile = buildDefaultsFile($db);

    // Prefer absolute path for mysqldump if available
    $mysqldump = trim((string) shell_exec('command -v mysqldump 2>/dev/null')) ?: 'mysqldump';

    $what = ($opts['all'] ?? false) ? '--all-databases' : escapeshellarg($dbName);
    $dumpCmd = sprintf(
        '%s --defaults-extra-file=%s --single-transaction --quick --routines --triggers --events --set-gtid-purged=OFF %s | gzip -c > %s',
        escapeshellcmd($mysqldump),
        escapeshellarg($defaultsFile),
        $what,
        escapeshellarg($backupPath)
    );

    echo ($opts['all'] ?? false)
        ? "Starting backup for ALL databases...\n"
        : "Starting backup for database '{$dbName}'...\n";
    [$code, $stdout, $stderr] = run($dumpCmd);

    // Always remove the temp defaults file
    @unlink($defaultsFile);

    if ($code !== 0) {
        eprintf("Backup failed (exit=%d). Error: %s\n", $code, $stderr ?: 'Unknown error');
        exit($code);
    }

    // Verify file exists and non-empty
    if (!is_file($backupPath) || filesize($backupPath) === 0) {
        eprintf("Backup file was not created or is empty: %s\n", $backupPath);
        exit(1);
    }

    echo sprintf("Backup completed: %s (%.2f MB)\n", $backupPath, filesize($backupPath) / 1048576.0);

    // Optional pruning
    if (is_int($opts['retentionDays'] ?? null) && ($opts['retentionDays'] ?? 0) > 0) {
        pruneOldBackups($outputDir, (int) $opts['retentionDays'], $label);
        echo sprintf("Applied retention: %d day(s)\n", (int) $opts['retentionDays']);
    }

    exit(0);
} catch (Throwable $e) {
    eprintf("ERROR: %s\n", $e->getMessage());
    exit(1);
}
