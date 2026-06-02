<?php

declare(strict_types=1);

namespace ArtRatio\Tests\Repositories;

use PDO;
use PHPUnit\Framework\TestCase;
use ProjectReservationPackageRepairService;

final class ProjectReservationPackageRepairServiceTest extends TestCase
{
    private PDO $pdo;
    private ProjectReservationPackageRepairService $service;

    protected function setUp(): void
    {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->createSchema();
        $this->service = new ProjectReservationPackageRepairService($this->pdo);
    }

    public function testDryRunReportsLegacyPackageIssuesWithoutMutatingRows(): void
    {
        $this->seedProjectReservationWithDuplicatePackageRows();

        $summary = $this->service->repair(false);

        $this->assertSame(1, $summary['reservations_scanned']);
        $this->assertSame(2, $summary['package_rows_seen']);
        $this->assertSame(1, $summary['package_rows_deleted']);
        $this->assertSame(1, $summary['package_rows_normalized']);
        $this->assertSame(2, $summary['legacy_equipment_rows_deleted']);
        $this->assertSame(2, (int) $this->pdo->query('SELECT COUNT(*) FROM reservation_packages')->fetchColumn());
        $this->assertSame(3, (int) $this->pdo->query('SELECT COUNT(*) FROM reservation_equipment')->fetchColumn());
    }

    public function testApplyNormalizesProjectPackageRowsAndRemovesOnlyLegacyPackageEquipment(): void
    {
        $this->seedProjectReservationWithDuplicatePackageRows();

        $summary = $this->service->repair(true);

        $this->assertSame(1, $summary['package_rows_deleted']);
        $this->assertSame(1, $summary['package_rows_normalized']);
        $this->assertSame(2, $summary['legacy_equipment_rows_deleted']);
        $this->assertSame(1, (int) $this->pdo->query('SELECT COUNT(*) FROM reservation_packages')->fetchColumn());
        $this->assertSame(1, (int) $this->pdo->query('SELECT COUNT(*) FROM reservation_equipment')->fetchColumn());
        $this->assertSame(
            'Standalone line',
            (string) $this->pdo->query('SELECT notes FROM reservation_equipment LIMIT 1')->fetchColumn()
        );

        $itemsJson = (string) $this->pdo->query('SELECT items_json FROM reservation_packages LIMIT 1')->fetchColumn();
        $items = json_decode($itemsJson, true);

        $this->assertCount(2, $items);
        $this->assertSame(1, $items[0]['quantity']);
        $this->assertSame(1, $items[0]['qtyPerPackage']);
        $this->assertSame(1, $items[1]['quantity']);
    }

    private function createSchema(): void
    {
        $this->pdo->exec('CREATE TABLE reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER
        )');
        $this->pdo->exec('CREATE TABLE reservation_packages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reservation_id INTEGER,
            package_id INTEGER,
            package_code TEXT,
            package_name TEXT,
            name TEXT,
            quantity INTEGER,
            unit_price REAL,
            unit_cost REAL,
            items_json TEXT,
            package_metadata TEXT
        )');
        $this->pdo->exec('CREATE TABLE reservation_equipment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reservation_id INTEGER,
            equipment_id INTEGER,
            quantity INTEGER,
            unit_price REAL,
            unit_cost REAL,
            notes TEXT
        )');
    }

    private function seedProjectReservationWithDuplicatePackageRows(): void
    {
        $this->pdo->exec('INSERT INTO reservations (id, project_id) VALUES (10, 99)');

        $items = json_encode([
            ['equipment_id' => 5, 'quantity' => 33, 'qtyPerPackage' => 33, 'desc' => 'Camera'],
            ['equipment_id' => 5, 'quantity' => 1, 'qtyPerPackage' => 1, 'desc' => 'Camera duplicate'],
            ['equipment_id' => 7, 'quantity' => 2, 'qtyPerPackage' => 2, 'desc' => 'Lens'],
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        $insertPackage = $this->pdo->prepare('INSERT INTO reservation_packages (
            reservation_id, package_id, package_code, package_name, name, quantity,
            unit_price, unit_cost, items_json, package_metadata
        ) VALUES (10, 44, "PKG-44", "Production Kit", "Production Kit", 1, 3010, 1000, :items_json, NULL)');
        $insertPackage->execute(['items_json' => $items]);
        $insertPackage->execute(['items_json' => $items]);

        $insertEquipment = $this->pdo->prepare('INSERT INTO reservation_equipment (
            reservation_id, equipment_id, quantity, unit_price, unit_cost, notes
        ) VALUES (10, :equipment_id, 1, 0, 0, :notes)');
        $insertEquipment->execute(['equipment_id' => 5, 'notes' => 'Package: Production Kit']);
        $insertEquipment->execute(['equipment_id' => 7, 'notes' => 'Package: Production Kit']);
        $insertEquipment->execute(['equipment_id' => 5, 'notes' => 'Standalone line']);
    }
}
