#!/usr/bin/env php
<?php
declare(strict_types=1);

/**
 * Schema report for release rehearsal targets.
 *
 * Usage:
 *   php backend/tools/schema_report.php --config /safe/staging-config.php
 *   php backend/tools/schema_report.php --config /safe/staging-config.php --json
 *
 * This tool is read-only. It reports table/column/index counts plus migration
 * status for the selected database config.
 */

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/tool_config.php';

$flags = array_flip(array_slice($argv, 1));
$asJson = isset($flags['--json']);

try {
    $dbSettings = loadCliDbSettings($argv, __DIR__ . '/../config.php');
    $pdo = create_pdo($dbSettings);

    $databaseName = (string) $pdo->query('SELECT DATABASE()')->fetchColumn();

    $tableRows = $pdo->prepare(
        'SELECT table_name AS table_name, table_rows AS table_rows
         FROM information_schema.tables
         WHERE table_schema = DATABASE()
         ORDER BY table_name'
    );
    $tableRows->execute();
    $tables = $tableRows->fetchAll();

    $columnRows = $pdo->prepare(
        'SELECT table_name AS table_name, COUNT(*) AS column_count
         FROM information_schema.columns
         WHERE table_schema = DATABASE()
         GROUP BY table_name
         ORDER BY table_name'
    );
    $columnRows->execute();
    $columnsByTable = [];
    foreach ($columnRows->fetchAll() as $row) {
        $columnsByTable[(string) $row['table_name']] = (int) $row['column_count'];
    }

    $indexRows = $pdo->prepare(
        'SELECT table_name AS table_name, COUNT(DISTINCT index_name) AS index_count
         FROM information_schema.statistics
         WHERE table_schema = DATABASE()
         GROUP BY table_name
         ORDER BY table_name'
    );
    $indexRows->execute();
    $indexesByTable = [];
    foreach ($indexRows->fetchAll() as $row) {
        $indexesByTable[(string) $row['table_name']] = (int) $row['index_count'];
    }

    $appliedMigrations = [];
    $hasMigrationTable = false;
    $migrationTableStmt = $pdo->prepare(
        'SELECT 1
         FROM information_schema.tables
         WHERE table_schema = DATABASE() AND table_name = :table
         LIMIT 1'
    );
    $migrationTableStmt->execute(['table' => 'schema_migrations']);
    $hasMigrationTable = (bool) $migrationTableStmt->fetchColumn();

    if ($hasMigrationTable) {
        foreach ($pdo->query('SELECT filename FROM schema_migrations ORDER BY filename')->fetchAll(PDO::FETCH_COLUMN) as $filename) {
            $appliedMigrations[(string) $filename] = true;
        }
    }

    $sqlDir = realpath(__DIR__ . '/../sql');
    $migrationFiles = $sqlDir === false ? [] : glob($sqlDir . '/*.sql');
    sort($migrationFiles);

    $pendingMigrations = [];
    foreach ($migrationFiles as $path) {
        $filename = basename($path);
        if (!isset($appliedMigrations[$filename])) {
            $pendingMigrations[] = $filename;
        }
    }

    $reportTables = [];
    foreach ($tables as $row) {
        $tableName = (string) $row['table_name'];
        $reportTables[] = [
            'name' => $tableName,
            'rows_estimate' => $row['table_rows'] === null ? null : (int) $row['table_rows'],
            'columns' => $columnsByTable[$tableName] ?? 0,
            'indexes' => $indexesByTable[$tableName] ?? 0,
        ];
    }

    $report = [
        'database' => $databaseName,
        'table_count' => count($reportTables),
        'tables' => $reportTables,
        'migration_table_exists' => $hasMigrationTable,
        'applied_migrations' => count($appliedMigrations),
        'pending_migrations' => $pendingMigrations,
    ];

    if ($asJson) {
        echo json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n";
        exit(0);
    }

    echo "Database: {$databaseName}\n";
    echo 'Tables: ' . count($reportTables) . "\n";
    echo 'schema_migrations: ' . ($hasMigrationTable ? 'present' : 'missing') . "\n";
    echo 'Applied migrations: ' . count($appliedMigrations) . "\n";
    echo 'Pending migrations: ' . count($pendingMigrations) . "\n\n";

    echo str_pad('Table', 38) . str_pad('Columns', 10) . str_pad('Indexes', 10) . "Rows estimate\n";
    echo str_repeat('-', 76) . "\n";
    foreach ($reportTables as $table) {
        echo str_pad($table['name'], 38)
            . str_pad((string) $table['columns'], 10)
            . str_pad((string) $table['indexes'], 10)
            . ($table['rows_estimate'] === null ? '-' : (string) $table['rows_estimate'])
            . "\n";
    }

    if ($pendingMigrations !== []) {
        echo "\nPending migration files:\n";
        foreach ($pendingMigrations as $filename) {
            echo "  - {$filename}\n";
        }
    }

    exit(0);
} catch (Throwable $error) {
    fwrite(STDERR, '[error] ' . $error->getMessage() . "\n");
    exit(1);
}
