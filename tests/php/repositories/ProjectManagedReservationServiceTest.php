<?php

declare(strict_types=1);

namespace ArtRatio\Tests\Repositories;

use ArtRatio\Repositories\ReservationRepository;
use PDO;
use PHPUnit\Framework\TestCase;
use ProjectManagedReservationService;

final class ProjectManagedReservationServiceTest extends TestCase
{
    private PDO $pdo;
    private ProjectManagedReservationService $service;

    protected function setUp(): void
    {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->sqliteCreateFunction('REGEXP', static function (string $pattern, string $value): int {
            return preg_match('/' . str_replace('/', '\/', $pattern) . '/', $value) === 1 ? 1 : 0;
        }, 2);
        $this->createSchema();
        $this->service = new ProjectManagedReservationService(
            $this->pdo,
            new ReservationRepository($this->pdo)
        );
    }

    public function testValidateProjectBookingBlocksEquipmentConflict(): void
    {
        $this->insertCustomer(1);
        $this->insertEquipment(10);
        $this->insertReservation(1, 'RSV-0001', 1, '2026-01-10 10:00:00', '2026-01-10 12:00:00');
        $this->insertReservationEquipment(1, 10);

        $errors = $this->service->validateProjectBooking(
            [
                'start_datetime' => '2026-01-10 11:00:00',
                'end_datetime' => '2026-01-10 13:00:00',
            ],
            [['equipment_id' => 10, 'quantity' => 1]],
            []
        );

        $this->assertArrayHasKey('managed_reservation.equipment.0', $errors);
        $this->assertStringContainsString('RSV-0001', $errors['managed_reservation.equipment.0']);
    }

    public function testValidateProjectBookingIgnoresOwnLinkedReservation(): void
    {
        $this->insertCustomer(1);
        $this->insertEquipment(10);
        $this->insertReservation(1, 'RSV-0001', 1, '2026-01-10 10:00:00', '2026-01-10 12:00:00', 7);
        $this->insertReservationEquipment(1, 10);

        $errors = $this->service->validateProjectBooking(
            [
                'start_datetime' => '2026-01-10 11:00:00',
                'end_datetime' => '2026-01-10 13:00:00',
            ],
            [['equipment_id' => 10, 'quantity' => 1]],
            [],
            1
        );

        $this->assertSame([], $errors);
    }

    public function testValidateProjectBookingAllowsQuantityWithinRemainingStock(): void
    {
        $this->insertCustomer(1);
        $this->insertEquipment(10, 'available', 4);
        $this->insertReservation(1, 'RSV-0004', 1, '2026-01-10 10:00:00', '2026-01-10 12:00:00');
        $this->insertReservationEquipment(1, 10, 2);

        $errors = $this->service->validateProjectBooking(
            [
                'start_datetime' => '2026-01-10 11:00:00',
                'end_datetime' => '2026-01-10 13:00:00',
            ],
            [['equipment_id' => 10, 'quantity' => 2]],
            []
        );

        $this->assertSame([], $errors);
    }

    public function testValidateProjectBookingBlocksQuantityAboveRemainingStock(): void
    {
        $this->insertCustomer(1);
        $this->insertEquipment(10, 'available', 4);
        $this->insertReservation(1, 'RSV-0005', 1, '2026-01-10 10:00:00', '2026-01-10 12:00:00');
        $this->insertReservationEquipment(1, 10, 2);

        $errors = $this->service->validateProjectBooking(
            [
                'start_datetime' => '2026-01-10 11:00:00',
                'end_datetime' => '2026-01-10 13:00:00',
            ],
            [['equipment_id' => 10, 'quantity' => 3]],
            []
        );

        $this->assertArrayHasKey('managed_reservation.equipment.0', $errors);
        $this->assertStringContainsString('exceeds available stock', $errors['managed_reservation.equipment.0']);
        $this->assertStringContainsString('RSV-0005', $errors['managed_reservation.equipment.0']);
    }

    public function testValidateProjectBookingAllowsQuantityAcrossEquivalentEquipmentVariants(): void
    {
        $this->insertCustomer(1);
        $this->insertEquipment(10, 'available', 1, 'Aputure 600D', 'Art Ratio', 300, 100);
        $this->insertEquipment(11, 'available', 1, 'Aputure 600D', 'Art Ratio', 300, 100);
        $this->insertEquipment(12, 'available', 1, 'Aputure 600D', 'Other Lessor', 300, 100);

        $errors = $this->service->validateProjectBooking(
            [
                'start_datetime' => '2026-01-10 11:00:00',
                'end_datetime' => '2026-01-10 13:00:00',
            ],
            [['equipment_id' => 10, 'quantity' => 2]],
            []
        );

        $this->assertSame([], $errors);
    }

    public function testValidateProjectBookingBlocksQuantityAboveEquivalentVariantStock(): void
    {
        $this->insertCustomer(1);
        $this->insertEquipment(10, 'available', 1, 'Aputure 600D', 'Art Ratio', 300, 100);
        $this->insertEquipment(11, 'available', 1, 'Aputure 600D', 'Art Ratio', 300, 100);
        $this->insertReservation(1, 'RSV-0007', 1, '2026-01-10 10:00:00', '2026-01-10 12:00:00');
        $this->insertReservationEquipment(1, 11, 1);

        $errors = $this->service->validateProjectBooking(
            [
                'start_datetime' => '2026-01-10 11:00:00',
                'end_datetime' => '2026-01-10 13:00:00',
            ],
            [['equipment_id' => 10, 'quantity' => 2]],
            []
        );

        $this->assertArrayHasKey('managed_reservation.equipment.0', $errors);
        $this->assertStringContainsString('exceeds available stock', $errors['managed_reservation.equipment.0']);
        $this->assertStringContainsString('RSV-0007', $errors['managed_reservation.equipment.0']);
    }

    public function testValidateProjectBookingCountsOwnLinkedReservationAsAvailableStock(): void
    {
        $this->insertCustomer(1);
        $this->insertEquipment(10, 'available', 4);
        $this->insertReservation(1, 'RSV-0006', 1, '2026-01-10 10:00:00', '2026-01-10 12:00:00', 7);
        $this->insertReservationEquipment(1, 10, 4);

        $errors = $this->service->validateProjectBooking(
            [
                'start_datetime' => '2026-01-10 11:00:00',
                'end_datetime' => '2026-01-10 13:00:00',
            ],
            [['equipment_id' => 10, 'quantity' => 4]],
            [],
            1
        );

        $this->assertSame([], $errors);
    }

    public function testValidateProjectBookingBlocksTechnicianConflict(): void
    {
        $this->insertCustomer(1);
        $this->insertTechnician(22);
        $this->insertReservation(1, 'RSV-0002', 1, '2026-02-01 08:00:00', '2026-02-01 18:00:00');
        $this->insertReservationTechnician(1, 22);

        $errors = $this->service->validateProjectBooking(
            [
                'start_datetime' => '2026-02-01 09:00:00',
                'end_datetime' => '2026-02-01 12:00:00',
            ],
            [],
            [['technician_id' => 22]]
        );

        $this->assertArrayHasKey('managed_reservation.technicians.0', $errors);
        $this->assertStringContainsString('RSV-0002', $errors['managed_reservation.technicians.0']);
    }

    public function testSyncForProjectCreatesReservationAndRelatedRows(): void
    {
        $this->insertCustomer(1);
        $this->insertEquipment(10);
        $this->insertTechnician(22);

        $reservationId = $this->service->syncForProject(
            7,
            [
                'client_id' => 1,
                'title' => 'Shoot Day',
                'start_datetime' => '2026-03-01 09:00:00',
                'end_datetime' => '2026-03-01 17:00:00',
                'confirmed' => true,
                'payment_status' => 'partial',
                'total_with_tax' => 1500,
            ],
            [['equipment_id' => 10, 'quantity' => 2]],
            [[
                'technician_id' => 22,
                'position_key' => 'dop',
                'position_name' => 'DOP',
                'position_cost' => 500,
                'position_client_price' => 900,
            ]]
        );

        $this->assertIsInt($reservationId);
        $this->assertSame(7, (int) $this->pdo->query('SELECT project_id FROM reservations LIMIT 1')->fetchColumn());
        $this->assertSame('confirmed', (string) $this->pdo->query('SELECT status FROM reservations LIMIT 1')->fetchColumn());
        $this->assertSame(2, (int) $this->pdo->query('SELECT quantity FROM reservation_equipment LIMIT 1')->fetchColumn());
        $this->assertSame('dop', (string) $this->pdo->query('SELECT position_key FROM reservation_technicians LIMIT 1')->fetchColumn());
    }

    public function testSyncForProjectUpdatesExistingLinkedReservation(): void
    {
        $this->insertCustomer(1);
        $this->insertEquipment(10);
        $this->insertEquipment(11);
        $this->insertReservation(1, 'RSV-0003', 1, '2026-04-01 09:00:00', '2026-04-01 17:00:00', 7);
        $this->insertReservationEquipment(1, 10);

        $reservationId = $this->service->syncForProject(
            7,
            [
                'client_id' => 1,
                'title' => 'Updated Shoot',
                'start_datetime' => '2026-04-02 09:00:00',
                'end_datetime' => '2026-04-02 17:00:00',
                'confirmed' => false,
            ],
            [['equipment_id' => 11, 'quantity' => 1]],
            []
        );

        $this->assertSame(1, $reservationId);
        $this->assertSame(1, (int) $this->pdo->query('SELECT COUNT(*) FROM reservations')->fetchColumn());
        $this->assertSame(11, (int) $this->pdo->query('SELECT equipment_id FROM reservation_equipment LIMIT 1')->fetchColumn());
        $this->assertSame('pending', (string) $this->pdo->query('SELECT status FROM reservations LIMIT 1')->fetchColumn());
    }

    public function testSyncForProjectUpdatesLinkedReservationClientAndExactCrewAssignments(): void
    {
        $this->insertCustomer(1);
        $this->insertCustomer(2);
        $this->insertEquipment(10);
        $this->insertTechnician(22);
        $this->insertTechnician(33);
        $this->insertReservation(1, 'RSV-0008', 1, '2026-05-01 09:00:00', '2026-05-01 17:00:00', 7);
        $this->insertReservationTechnician(1, 22);

        $reservationId = $this->service->syncForProject(
            7,
            [
                'client_id' => 2,
                'title' => 'Updated Client and Crew',
                'start_datetime' => '2026-05-02 09:00:00',
                'end_datetime' => '2026-05-02 17:00:00',
                'confirmed' => true,
                'payment_status' => 'paid',
                'total_with_tax' => 2400,
            ],
            [['equipment_id' => 10, 'quantity' => 1]],
            [[
                'technician_id' => 33,
                'position_key' => 'producer',
                'position_name' => 'Producer',
                'position_label_ar' => 'منتج',
                'position_label_en' => 'Producer',
                'position_cost' => 400,
                'position_client_price' => 900,
                'assignment_id' => 'crew-33',
            ]]
        );

        $this->assertSame(1, $reservationId);
        $this->assertSame(2, (int) $this->pdo->query('SELECT customer_id FROM reservations WHERE id = 1')->fetchColumn());
        $this->assertSame('paid', (string) $this->pdo->query('SELECT paid_status FROM reservations WHERE id = 1')->fetchColumn());
        $this->assertSame(1, (int) $this->pdo->query('SELECT COUNT(*) FROM reservation_technicians WHERE reservation_id = 1')->fetchColumn());

        $crew = $this->pdo->query('SELECT * FROM reservation_technicians WHERE reservation_id = 1 LIMIT 1')->fetch(PDO::FETCH_ASSOC);
        $this->assertIsArray($crew);
        $this->assertSame(33, (int) $crew['technician_id']);
        $this->assertSame('producer', (string) $crew['position_key']);
        $this->assertSame('Producer', (string) $crew['position_name']);
        $this->assertSame('منتج', (string) $crew['position_label_ar']);
        $this->assertSame('Producer', (string) $crew['position_label_en']);
        $this->assertSame(400.0, (float) $crew['position_cost']);
        $this->assertSame(900.0, (float) $crew['position_client_price']);
        $this->assertSame('crew-33', (string) $crew['assignment_id']);
    }

    private function createSchema(): void
    {
        $this->pdo->exec('CREATE TABLE customers (id INTEGER PRIMARY KEY, full_name TEXT)');
        $this->pdo->exec('CREATE TABLE equipment (
            id INTEGER PRIMARY KEY,
            status TEXT,
            quantity INTEGER,
            description TEXT,
            name TEXT,
            lessor TEXT,
            unit_price REAL,
            unit_cost REAL
        )');
        $this->pdo->exec('CREATE TABLE technicians (id INTEGER PRIMARY KEY, full_name TEXT)');
        $this->pdo->exec('CREATE TABLE reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reservation_code TEXT,
            customer_id INTEGER,
            title TEXT,
            start_datetime TEXT,
            end_datetime TEXT,
            status TEXT,
            location TEXT,
            notes TEXT,
            total_amount REAL,
            project_id INTEGER,
            discount REAL,
            discount_type TEXT,
            apply_tax INTEGER,
            paid_status TEXT,
            paid_amount REAL,
            paid_percentage REAL,
            payment_progress_type TEXT,
            payment_progress_value REAL,
            confirmed INTEGER
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
        $this->pdo->exec('CREATE TABLE reservation_technicians (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reservation_id INTEGER,
            technician_id INTEGER,
            role TEXT,
            notes TEXT,
            position_id INTEGER,
            position_key TEXT,
            position_name TEXT,
            position_label_ar TEXT,
            position_label_en TEXT,
            position_cost REAL,
            position_client_price REAL,
            assignment_id TEXT
        )');
    }

    private function insertCustomer(int $id): void
    {
        $this->pdo->prepare('INSERT INTO customers (id, full_name) VALUES (:id, :name)')
            ->execute(['id' => $id, 'name' => 'Client']);
    }

    private function insertEquipment(
        int $id,
        string $status = 'available',
        int $quantity = 1,
        string $description = '',
        string $lessor = '',
        float $unitPrice = 0,
        float $unitCost = 0
    ): void
    {
        $this->pdo->prepare('INSERT INTO equipment (
            id, status, quantity, description, name, lessor, unit_price, unit_cost
        ) VALUES (
            :id, :status, :quantity, :description, :name, :lessor, :unit_price, :unit_cost
        )')->execute([
            'id' => $id,
            'status' => $status,
            'quantity' => $quantity,
            'description' => $description,
            'name' => $description,
            'lessor' => $lessor,
            'unit_price' => $unitPrice,
            'unit_cost' => $unitCost,
        ]);
    }

    private function insertTechnician(int $id): void
    {
        $this->pdo->prepare('INSERT INTO technicians (id, full_name) VALUES (:id, :name)')
            ->execute(['id' => $id, 'name' => 'Crew']);
    }

    private function insertReservation(
        int $id,
        string $code,
        int $customerId,
        string $start,
        string $end,
        ?int $projectId = null,
        string $status = 'confirmed'
    ): void {
        $this->pdo->prepare('INSERT INTO reservations (
            id, reservation_code, customer_id, title, start_datetime, end_datetime, status,
            location, notes, total_amount, project_id, discount, discount_type, apply_tax,
            paid_status, paid_amount, paid_percentage, payment_progress_type,
            payment_progress_value, confirmed
        ) VALUES (
            :id, :code, :customer_id, :title, :start_datetime, :end_datetime, :status,
            NULL, NULL, 0, :project_id, 0, "percent", 0, "unpaid", 0, 0, NULL, NULL, 0
        )')->execute([
            'id' => $id,
            'code' => $code,
            'customer_id' => $customerId,
            'title' => 'Existing',
            'start_datetime' => $start,
            'end_datetime' => $end,
            'status' => $status,
            'project_id' => $projectId,
        ]);
    }

    private function insertReservationEquipment(int $reservationId, int $equipmentId, int $quantity = 1): void
    {
        $this->pdo->prepare('INSERT INTO reservation_equipment (
            reservation_id, equipment_id, quantity, unit_price, unit_cost, notes
        ) VALUES (:reservation_id, :equipment_id, :quantity, 0, 0, NULL)')
            ->execute([
                'reservation_id' => $reservationId,
                'equipment_id' => $equipmentId,
                'quantity' => $quantity,
            ]);
    }

    private function insertReservationTechnician(int $reservationId, int $technicianId): void
    {
        $this->pdo->prepare('INSERT INTO reservation_technicians (
            reservation_id, technician_id, role, notes, position_id, position_key,
            position_name, position_label_ar, position_label_en, position_cost,
            position_client_price, assignment_id
        ) VALUES (
            :reservation_id, :technician_id, NULL, NULL, NULL, NULL,
            NULL, NULL, NULL, 0, 0, NULL
        )')->execute(['reservation_id' => $reservationId, 'technician_id' => $technicianId]);
    }
}
