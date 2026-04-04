#!/usr/bin/env php
<?php

/**
 * Database migration runner.
 *
 * Usage:
 *   php backend/tools/migrate.php            — run all pending migrations
 *   php backend/tools/migrate.php --status   — list applied / pending migrations
 *   php backend/tools/migrate.php --baseline — mark all existing SQL files as applied
 *                                              without executing them (first-time setup)
 *   php backend/tools/migrate.php --dry-run  — show what would run, make no changes
 *
 * Migrations are plain .sql files in backend/sql/, applied in alphabetical order.
 * The `schema_migrations` table tracks which files have been applied.
 */

declare(strict_types=1);

require_once __DIR__ . '/../db.php';

// ── Bootstrap ────────────────────────────────────────────────────────────────

$configPath = realpath(__DIR__ . '/../config.php');
if ($configPath === false || !file_exists($configPath)) {
    fwrite(STDERR, "config.php not found.\n");
    exit(1);
}

$config    = require $configPath;
$dbSettings = $config['db'] ?? null;
if (!is_array($dbSettings)) {
    fwrite(STDERR, "Database settings missing from config.php.\n");
    exit(1);
}

try {
    $pdo = create_pdo($dbSettings);
} catch (Throwable $e) {
    fwrite(STDERR, 'Database connection failed: ' . $e->getMessage() . "\n");
    exit(1);
}

// ── Parse flags ───────────────────────────────────────────────────────────────

$flags   = array_flip(array_slice($argv, 1));
$isStatus  = isset($flags['--status']);
$isBaseline = isset($flags['--baseline']);
$isDryRun  = isset($flags['--dry-run']);

// ── Ensure tracking table ─────────────────────────────────────────────────────

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS schema_migrations (
        id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        filename    VARCHAR(255) NOT NULL UNIQUE,
        applied_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_sm_filename (filename)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
);

// ── Load applied migrations ───────────────────────────────────────────────────

$applied = [];
foreach ($pdo->query('SELECT filename FROM schema_migrations ORDER BY filename')->fetchAll(PDO::FETCH_COLUMN) as $f) {
    $applied[$f] = true;
}

// ── Discover SQL files ────────────────────────────────────────────────────────

$sqlDir = realpath(__DIR__ . '/../sql');
if ($sqlDir === false) {
    fwrite(STDERR, "backend/sql/ directory not found.\n");
    exit(1);
}

$files = glob($sqlDir . '/*.sql');
sort($files);

// ── --status ──────────────────────────────────────────────────────────────────

if ($isStatus) {
    $pending = 0;
    echo str_pad('STATUS', 10) . "  FILE\n";
    echo str_repeat('-', 70) . "\n";
    foreach ($files as $path) {
        $name   = basename($path);
        $status = isset($applied[$name]) ? '[applied]' : '[PENDING]';
        if (!isset($applied[$name])) {
            $pending++;
        }
        echo str_pad($status, 10) . "  $name\n";
    }
    echo str_repeat('-', 70) . "\n";
    echo count($applied) . ' applied, ' . $pending . " pending.\n";
    exit(0);
}

// ── --baseline ────────────────────────────────────────────────────────────────

if ($isBaseline) {
    $count = 0;
    $stmt  = $pdo->prepare(
        'INSERT IGNORE INTO schema_migrations (filename, applied_at) VALUES (:filename, NOW())'
    );
    foreach ($files as $path) {
        $name = basename($path);
        if (!isset($applied[$name])) {
            $stmt->execute(['filename' => $name]);
            echo "  baselined  $name\n";
            $count++;
        } else {
            echo "  skipped    $name  (already recorded)\n";
        }
    }
    echo "\nBaselined $count new migration(s). Existing DB is now the baseline.\n";
    exit(0);
}

// ── Run pending migrations ────────────────────────────────────────────────────

$pending = array_filter($files, fn($p) => !isset($applied[basename($p)]));

if (empty($pending)) {
    echo "Nothing to run — all migrations are applied.\n";
    exit(0);
}

// Safety guard: if schema_migrations is empty and there are many pending files,
// this is almost certainly a first-time setup on an existing database.
// Running all migrations against an existing DB would cause "table already exists" errors.
if (count($applied) === 0 && count($pending) > 5) {
    fwrite(STDERR, "\n⚠️  WARNING: schema_migrations is empty but " . count($pending) . " SQL files are pending.\n");
    fwrite(STDERR, "   If this database already has these tables applied, run --baseline first:\n");
    fwrite(STDERR, "   php backend/tools/migrate.php --baseline\n\n");
    fwrite(STDERR, "   If this is a brand-new empty database, run with --force to proceed:\n");
    fwrite(STDERR, "   php backend/tools/migrate.php --force\n\n");
    if (!isset($flags['--force'])) {
        exit(1);
    }
}

echo ($isDryRun ? '[dry-run] ' : '') . count($pending) . " pending migration(s):\n";

$insertStmt = $pdo->prepare(
    'INSERT INTO schema_migrations (filename, applied_at) VALUES (:filename, NOW())'
);

$errors = 0;
foreach ($pending as $path) {
    $name = basename($path);
    echo "  → $name ... ";

    if ($isDryRun) {
        echo "would run\n";
        continue;
    }

    $sql = file_get_contents($path);
    if ($sql === false) {
        echo "FAILED (cannot read file)\n";
        $errors++;
        continue;
    }

    try {
        $pdo->exec($sql);
        $insertStmt->execute(['filename' => $name]);
        echo "done\n";
    } catch (Throwable $e) {
        echo "FAILED\n";
        fwrite(STDERR, "  Error in $name: " . $e->getMessage() . "\n");
        $errors++;
        // Stop on first failure to avoid partially applied migrations
        break;
    }
}

if ($errors > 0) {
    fwrite(STDERR, "\nMigration stopped due to errors. Fix the failing migration and re-run.\n");
    exit(1);
}

if (!$isDryRun) {
    echo "\nAll migrations applied successfully.\n";
}
