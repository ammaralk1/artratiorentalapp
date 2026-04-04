<?php
declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';

if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "This tool must be run from the command line.\n");
    exit(1);
}

function tableExists(PDO $pdo, string $table): bool
{
    $statement = $pdo->prepare(
        'SELECT 1
         FROM information_schema.tables
         WHERE table_schema = DATABASE() AND table_name = :table
         LIMIT 1'
    );
    $statement->execute(['table' => $table]);
    return (bool) $statement->fetchColumn();
}

function columnExists(PDO $pdo, string $table, string $column): bool
{
    $statement = $pdo->prepare(
        'SELECT 1
         FROM information_schema.columns
         WHERE table_schema = DATABASE()
           AND table_name = :table
           AND column_name = :column
         LIMIT 1'
    );
    $statement->execute([
        'table' => $table,
        'column' => $column,
    ]);
    return (bool) $statement->fetchColumn();
}

function columnCollation(PDO $pdo, string $table, string $column): ?string
{
    $statement = $pdo->prepare(
        'SELECT collation_name
         FROM information_schema.columns
         WHERE table_schema = DATABASE()
           AND table_name = :table
           AND column_name = :column
         LIMIT 1'
    );
    $statement->execute([
        'table' => $table,
        'column' => $column,
    ]);

    $value = $statement->fetchColumn();
    return is_string($value) && $value !== '' ? $value : null;
}

function indexExists(PDO $pdo, string $table, string $index): bool
{
    $statement = $pdo->prepare(
        'SELECT 1
         FROM information_schema.statistics
         WHERE table_schema = DATABASE()
           AND table_name = :table
           AND index_name = :index
         LIMIT 1'
    );
    $statement->execute([
        'table' => $table,
        'index' => $index,
    ]);
    return (bool) $statement->fetchColumn();
}

function execPatch(PDO $pdo, string $description, string $sql): void
{
    fwrite(STDOUT, "[apply] {$description}\n");
    $pdo->exec($sql);
}

try {
    $pdo = getDatabaseConnection();

    if (!columnExists($pdo, 'projects', 'status')) {
        execPatch($pdo, 'projects.status', 'ALTER TABLE projects ADD COLUMN status VARCHAR(50) NULL DEFAULT NULL AFTER end_datetime');
    }
    if (!columnExists($pdo, 'projects', 'cancelled')) {
        execPatch($pdo, 'projects.cancelled', 'ALTER TABLE projects ADD COLUMN cancelled TINYINT(1) NOT NULL DEFAULT 0 AFTER status');
    }
    if (!columnExists($pdo, 'projects', 'services_client_price')) {
        execPatch($pdo, 'projects.services_client_price', 'ALTER TABLE projects ADD COLUMN services_client_price DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER expenses_total');
    }
    if (!columnExists($pdo, 'project_expenses', 'sale_price')) {
        execPatch($pdo, 'project_expenses.sale_price', 'ALTER TABLE project_expenses ADD COLUMN sale_price DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER amount');
    }
    if (!columnExists($pdo, 'project_expenses', 'note')) {
        $notePosition = columnExists($pdo, 'project_expenses', 'sale_price')
            ? 'AFTER sale_price'
            : 'AFTER amount';
        execPatch($pdo, 'project_expenses.note', "ALTER TABLE project_expenses ADD COLUMN note TEXT NULL DEFAULT NULL {$notePosition}");
    }

    if (!columnExists($pdo, 'reservations', 'project_id')) {
        execPatch($pdo, 'reservations.project_id', 'ALTER TABLE reservations ADD COLUMN project_id BIGINT UNSIGNED NULL DEFAULT NULL AFTER total_amount');
    }
    if (!indexExists($pdo, 'reservations', 'idx_reservations_project_id')) {
        execPatch($pdo, 'idx_reservations_project_id', 'CREATE INDEX idx_reservations_project_id ON reservations (project_id)');
    }
    if (!columnExists($pdo, 'reservations', 'paid_amount')) {
        execPatch($pdo, 'reservations.paid_amount', 'ALTER TABLE reservations ADD COLUMN paid_amount DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER paid_status');
    }
    if (!columnExists($pdo, 'reservations', 'paid_percentage')) {
        execPatch($pdo, 'reservations.paid_percentage', 'ALTER TABLE reservations ADD COLUMN paid_percentage DECIMAL(8,2) NOT NULL DEFAULT 0 AFTER paid_amount');
    }
    if (!columnExists($pdo, 'reservations', 'payment_progress_type')) {
        execPatch($pdo, 'reservations.payment_progress_type', 'ALTER TABLE reservations ADD COLUMN payment_progress_type VARCHAR(20) DEFAULT NULL AFTER paid_percentage');
    }
    if (!columnExists($pdo, 'reservations', 'payment_progress_value')) {
        execPatch($pdo, 'reservations.payment_progress_value', 'ALTER TABLE reservations ADD COLUMN payment_progress_value DECIMAL(12,2) DEFAULT NULL AFTER payment_progress_type');
    }

    if (!columnExists($pdo, 'reservation_equipment', 'unit_cost')) {
        execPatch($pdo, 'reservation_equipment.unit_cost', 'ALTER TABLE reservation_equipment ADD COLUMN unit_cost DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER unit_price');
    }

    if (!columnExists($pdo, 'reservation_technicians', 'notes')) {
        execPatch($pdo, 'reservation_technicians.notes', 'ALTER TABLE reservation_technicians ADD COLUMN notes TEXT NULL AFTER role');
    }
    if (!columnExists($pdo, 'reservation_technicians', 'position_id')) {
        execPatch($pdo, 'reservation_technicians.position_id', 'ALTER TABLE reservation_technicians ADD COLUMN position_id INT UNSIGNED NULL AFTER role');
    }
    if (!columnExists($pdo, 'reservation_technicians', 'position_key')) {
        execPatch($pdo, 'reservation_technicians.position_key', 'ALTER TABLE reservation_technicians ADD COLUMN position_key VARCHAR(255) COLLATE utf8mb4_unicode_ci NULL AFTER position_id');
    }
    if (!columnExists($pdo, 'reservation_technicians', 'position_name')) {
        execPatch($pdo, 'reservation_technicians.position_name', 'ALTER TABLE reservation_technicians ADD COLUMN position_name VARCHAR(255) COLLATE utf8mb4_unicode_ci NULL AFTER position_key');
    }
    if (!columnExists($pdo, 'reservation_technicians', 'position_label_ar')) {
        execPatch($pdo, 'reservation_technicians.position_label_ar', 'ALTER TABLE reservation_technicians ADD COLUMN position_label_ar VARCHAR(255) COLLATE utf8mb4_unicode_ci NULL AFTER position_name');
    }
    if (!columnExists($pdo, 'reservation_technicians', 'position_label_en')) {
        execPatch($pdo, 'reservation_technicians.position_label_en', 'ALTER TABLE reservation_technicians ADD COLUMN position_label_en VARCHAR(255) COLLATE utf8mb4_unicode_ci NULL AFTER position_label_ar');
    }
    if (!columnExists($pdo, 'reservation_technicians', 'position_cost')) {
        execPatch($pdo, 'reservation_technicians.position_cost', 'ALTER TABLE reservation_technicians ADD COLUMN position_cost DECIMAL(10,2) NULL DEFAULT 0 AFTER position_label_en');
    }
    if (!columnExists($pdo, 'reservation_technicians', 'position_client_price')) {
        execPatch($pdo, 'reservation_technicians.position_client_price', 'ALTER TABLE reservation_technicians ADD COLUMN position_client_price DECIMAL(10,2) NULL DEFAULT 0 AFTER position_cost');
    }
    if (!columnExists($pdo, 'reservation_technicians', 'assignment_id')) {
        execPatch($pdo, 'reservation_technicians.assignment_id', 'ALTER TABLE reservation_technicians ADD COLUMN assignment_id VARCHAR(64) NULL AFTER position_client_price');
    }
    if (tableExists($pdo, 'reservation_technicians') && !indexExists($pdo, 'reservation_technicians', 'idx_rt_position_id')) {
        execPatch($pdo, 'idx_rt_position_id', 'CREATE INDEX idx_rt_position_id ON reservation_technicians (position_id)');
    }

    $reservationTechnicianUnicodeColumns = [
        'position_key',
        'position_name',
        'position_label_ar',
        'position_label_en',
    ];
    foreach ($reservationTechnicianUnicodeColumns as $column) {
        if (columnExists($pdo, 'reservation_technicians', $column) && columnCollation($pdo, 'reservation_technicians', $column) !== 'utf8mb4_unicode_ci') {
            execPatch(
                $pdo,
                "reservation_technicians.{$column} collation",
                "ALTER TABLE reservation_technicians MODIFY {$column} VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL"
            );
        }
    }

    if (!tableExists($pdo, 'reservation_packages')) {
        execPatch(
            $pdo,
            'reservation_packages table',
            'CREATE TABLE reservation_packages (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                reservation_id BIGINT UNSIGNED NOT NULL,
                package_id BIGINT UNSIGNED DEFAULT NULL,
                package_code VARCHAR(100) DEFAULT NULL,
                package_name VARCHAR(255) DEFAULT NULL,
                name VARCHAR(255) DEFAULT NULL,
                quantity INT NOT NULL DEFAULT 1,
                unit_price DECIMAL(12,2) NOT NULL DEFAULT 0,
                unit_cost DECIMAL(12,2) NOT NULL DEFAULT 0,
                items_json LONGTEXT DEFAULT NULL,
                package_metadata LONGTEXT DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_reservation_packages_reservation_id (reservation_id),
                FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
        );
    }
    if (!columnExists($pdo, 'reservation_packages', 'package_id')) {
        execPatch($pdo, 'reservation_packages.package_id', 'ALTER TABLE reservation_packages ADD COLUMN package_id BIGINT UNSIGNED DEFAULT NULL AFTER reservation_id');
    }
    if (!columnExists($pdo, 'reservation_packages', 'package_code')) {
        execPatch($pdo, 'reservation_packages.package_code', 'ALTER TABLE reservation_packages ADD COLUMN package_code VARCHAR(100) DEFAULT NULL AFTER package_id');
    }
    if (!columnExists($pdo, 'reservation_packages', 'package_name')) {
        execPatch($pdo, 'reservation_packages.package_name', 'ALTER TABLE reservation_packages ADD COLUMN package_name VARCHAR(255) DEFAULT NULL AFTER package_code');
    }
    if (!columnExists($pdo, 'reservation_packages', 'name')) {
        execPatch($pdo, 'reservation_packages.name', 'ALTER TABLE reservation_packages ADD COLUMN name VARCHAR(255) DEFAULT NULL AFTER package_name');
    }
    if (!columnExists($pdo, 'reservation_packages', 'unit_cost')) {
        execPatch($pdo, 'reservation_packages.unit_cost', 'ALTER TABLE reservation_packages ADD COLUMN unit_cost DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER unit_price');
    }
    if (!columnExists($pdo, 'reservation_packages', 'items_json')) {
        execPatch($pdo, 'reservation_packages.items_json', 'ALTER TABLE reservation_packages ADD COLUMN items_json LONGTEXT DEFAULT NULL AFTER unit_cost');
    }
    if (!columnExists($pdo, 'reservation_packages', 'package_metadata')) {
        execPatch($pdo, 'reservation_packages.package_metadata', 'ALTER TABLE reservation_packages ADD COLUMN package_metadata LONGTEXT DEFAULT NULL AFTER items_json');
    }

    if (
        tableExists($pdo, 'technician_positions')
        && columnExists($pdo, 'reservation_technicians', 'position_id')
        && columnExists($pdo, 'reservation_technicians', 'position_key')
        && columnExists($pdo, 'reservation_technicians', 'position_name')
        && columnExists($pdo, 'reservation_technicians', 'position_cost')
        && columnExists($pdo, 'reservation_technicians', 'position_client_price')
        && columnExists($pdo, 'reservation_technicians', 'position_label_ar')
        && columnExists($pdo, 'reservation_technicians', 'position_label_en')
    ) {
        execPatch(
            $pdo,
            'reservation technician position snapshot backfill',
            "UPDATE reservation_technicians rt
             LEFT JOIN technician_positions tp ON (
                 (rt.position_id IS NOT NULL AND tp.id = rt.position_id)
                 OR (rt.position_id IS NULL AND rt.position_key IS NOT NULL AND tp.name COLLATE utf8mb4_unicode_ci = rt.position_key COLLATE utf8mb4_unicode_ci)
             )
             SET
                 rt.position_cost = CASE
                     WHEN (rt.position_cost IS NULL OR rt.position_cost = 0) AND tp.cost IS NOT NULL THEN tp.cost
                     ELSE rt.position_cost
                 END,
                 rt.position_client_price = CASE
                     WHEN (rt.position_client_price IS NULL OR rt.position_client_price = 0) AND tp.client_price IS NOT NULL THEN tp.client_price
                     ELSE rt.position_client_price
                 END,
                 rt.position_name = CASE
                     WHEN (rt.position_name IS NULL OR rt.position_name = '') THEN COALESCE(tp.label_ar, tp.label_en, tp.name, rt.position_name)
                     ELSE rt.position_name
                 END,
                 rt.position_label_ar = CASE
                     WHEN (rt.position_label_ar IS NULL OR rt.position_label_ar = '') AND tp.label_ar IS NOT NULL THEN tp.label_ar
                     ELSE rt.position_label_ar
                 END,
                 rt.position_label_en = CASE
                     WHEN (rt.position_label_en IS NULL OR rt.position_label_en = '') AND tp.label_en IS NOT NULL THEN tp.label_en
                     ELSE rt.position_label_en
                 END
             WHERE tp.id IS NOT NULL
               AND (
                    ((rt.position_cost IS NULL OR rt.position_cost = 0) AND tp.cost IS NOT NULL)
                 OR ((rt.position_client_price IS NULL OR rt.position_client_price = 0) AND tp.client_price IS NOT NULL)
                 OR (rt.position_name IS NULL OR rt.position_name = '')
                 OR ((rt.position_label_ar IS NULL OR rt.position_label_ar = '') AND tp.label_ar IS NOT NULL)
                 OR ((rt.position_label_en IS NULL OR rt.position_label_en = '') AND tp.label_en IS NOT NULL)
               )"
        );
    }

    fwrite(STDOUT, "[done] Phase 4 schema updates applied successfully.\n");
    exit(0);
} catch (Throwable $error) {
    fwrite(STDERR, "[error] " . $error->getMessage() . "\n");
    exit(1);
}
