<?php

declare(strict_types=1);

namespace ArtRatio\Tests;

use ArtRatio\Repositories\ReservationRepository;
use PDO;
use PDOStatement;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

final class ReservationRepositoryTest extends TestCase
{
    private PDO&MockObject $pdo;
    private ReservationRepository $repo;

    protected function setUp(): void
    {
        $this->pdo  = $this->createMock(PDO::class);
        $this->repo = new ReservationRepository($this->pdo);
    }

    // -------------------------------------------------------------------------
    // findById
    // -------------------------------------------------------------------------

    public function testFindByIdJoinsCustomers(): void
    {
        $row  = ['id' => 1, 'reservation_code' => 'RSV-0001', 'customer_name' => 'Ahmed'];
        $stmt = $this->stubFetch($row);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalAnd(
                $this->stringContains('JOIN customers'),
                $this->stringContains('r.id = :id')
            ))
            ->willReturn($stmt);

        $this->assertSame($row, $this->repo->findById(1));
    }

    public function testFindByIdReturnsNullWhenNotFound(): void
    {
        $this->pdo->method('prepare')->willReturn($this->stubFetch(false));
        $this->assertNull($this->repo->findById(999));
    }

    // -------------------------------------------------------------------------
    // generateCode
    // -------------------------------------------------------------------------

    public function testGenerateCodeIncrementsLastCode(): void
    {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);
        $stmt->method('fetchColumn')->willReturn('RSV-0010');

        $this->pdo->method('prepare')->willReturn($stmt);

        $this->assertSame('RSV-0011', $this->repo->generateCode());
    }

    public function testGenerateCodeStartsAtOneWhenNoReservations(): void
    {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);
        $stmt->method('fetchColumn')->willReturn(false);

        $this->pdo->method('prepare')->willReturn($stmt);

        $this->assertSame('RSV-0001', $this->repo->generateCode());
    }

    // -------------------------------------------------------------------------
    // codeExists
    // -------------------------------------------------------------------------

    public function testCodeExistsReturnsTrueWhenFound(): void
    {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);
        $stmt->method('fetchColumn')->willReturn('1');

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalNot($this->stringContains('ignore_id')))
            ->willReturn($stmt);

        $this->assertTrue($this->repo->codeExists('RSV-0001'));
    }

    public function testCodeExistsWithIgnoreIdExcludesRow(): void
    {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);
        $stmt->method('fetchColumn')->willReturn(false);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('ignore_id'))
            ->willReturn($stmt);

        $this->assertFalse($this->repo->codeExists('RSV-0001', 3));
    }

    // -------------------------------------------------------------------------
    // findAll
    // -------------------------------------------------------------------------

    public function testFindAllWithNoFiltersOmitsWhereClause(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalAnd(
                $this->stringContains('JOIN customers'),
                $this->logicalNot($this->stringContains('WHERE'))
            ))
            ->willReturn($stmt);

        $this->repo->findAll();
    }

    public function testFindAllWithTechnicianIdUsesExistsSubquery(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('reservation_technicians'))
            ->willReturn($stmt);

        $this->repo->findAll(['technician_id' => 5]);
    }

    public function testFindAllWithStatusFilter(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('r.status = :status'))
            ->willReturn($stmt);

        $this->repo->findAll(['status' => 'confirmed']);
    }

    // -------------------------------------------------------------------------
    // create
    // -------------------------------------------------------------------------

    public function testCreateInsertsAndReturnsRow(): void
    {
        $data   = $this->sampleReservationData();
        $newRow = array_merge(['id' => 1], $data, ['customer_name' => 'Ahmed']);

        $insertStmt = $this->createMock(PDOStatement::class);
        $insertStmt->method('execute')->willReturn(true);

        $selectStmt = $this->stubFetch($newRow);

        $this->pdo->method('prepare')
            ->willReturnOnConsecutiveCalls($insertStmt, $selectStmt);
        $this->pdo->method('lastInsertId')->willReturn('1');

        $result = $this->repo->create($data);
        $this->assertSame($newRow, $result);
    }

    // -------------------------------------------------------------------------
    // update
    // -------------------------------------------------------------------------

    public function testUpdateBuildsSetClauseAndReturnsRow(): void
    {
        $updated = ['id' => 2, 'status' => 'confirmed', 'customer_name' => 'X'];

        $updateStmt = $this->createMock(PDOStatement::class);
        $updateStmt->method('execute')->willReturn(true);

        $selectStmt = $this->stubFetch($updated);

        $this->pdo->expects($this->exactly(2))
            ->method('prepare')
            ->willReturnCallback(function (string $sql) use ($updateStmt, $selectStmt) {
                if (stripos($sql, 'UPDATE') !== false) {
                    $this->assertStringContainsString('status = :status', $sql);
                    $this->assertStringContainsString('WHERE id = :id', $sql);
                    return $updateStmt;
                }
                return $selectStmt;
            });

        $result = $this->repo->update(2, ['status' => 'confirmed']);
        $this->assertSame($updated, $result);
    }

    // -------------------------------------------------------------------------
    // delete
    // -------------------------------------------------------------------------

    public function testDeleteCleansRelatedTablesBeforeDeleting(): void
    {
        $sqls    = [];
        $stmt    = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);
        $stmt->method('rowCount')->willReturn(1);

        $this->pdo->method('prepare')
            ->willReturnCallback(function (string $sql) use ($stmt, &$sqls) {
                $sqls[] = $sql;
                return $stmt;
            });
        $this->pdo->method('beginTransaction')->willReturn(true);
        $this->pdo->method('commit')->willReturn(true);

        $this->assertTrue($this->repo->delete(1));

        $deleteSqls = array_filter($sqls, fn($s) => stripos($s, 'DELETE') !== false);
        $this->assertCount(3, $deleteSqls); // reservation_technicians, reservation_equipment, reservations
    }

    public function testDeleteRollsBackOnException(): void
    {
        $this->pdo->method('beginTransaction')->willReturn(true);
        $this->pdo->method('prepare')->willThrowException(new \RuntimeException('DB error'));
        $this->pdo->expects($this->once())->method('rollBack');

        $this->expectException(\RuntimeException::class);
        $this->repo->delete(1);
    }

    // -------------------------------------------------------------------------
    // syncItems
    // -------------------------------------------------------------------------

    public function testSyncItemsDeletesThenInserts(): void
    {
        $sqls = [];
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);

        $this->pdo->method('prepare')
            ->willReturnCallback(function (string $sql) use ($stmt, &$sqls) {
                $sqls[] = $sql;
                return $stmt;
            });

        $this->repo->syncItems(1, [['equipment_id' => 5, 'quantity' => 2, 'unit_price' => 100, 'unit_cost' => 60, 'notes' => null]]);

        $this->assertStringContainsString('DELETE FROM reservation_equipment', $sqls[0]);
        $this->assertStringContainsString('INSERT INTO reservation_equipment', $sqls[1]);
    }

    public function testSyncItemsWithEmptyArrayOnlyDeletes(): void
    {
        $prepareCount = 0;
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);

        $this->pdo->method('prepare')->willReturnCallback(function () use ($stmt, &$prepareCount) {
            $prepareCount++;
            return $stmt;
        });

        $this->repo->syncItems(1, []);
        $this->assertSame(1, $prepareCount);
    }

    // -------------------------------------------------------------------------
    // syncPackages
    // -------------------------------------------------------------------------

    public function testSyncPackagesDeletesThenInserts(): void
    {
        $sqls = [];
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);

        $this->pdo->method('prepare')
            ->willReturnCallback(function (string $sql) use ($stmt, &$sqls) {
                $sqls[] = $sql;
                return $stmt;
            });

        $this->repo->syncPackages(1, [['package_id' => 2, 'quantity' => 1, 'unit_price' => 200, 'unit_cost' => 100]]);

        $this->assertStringContainsString('DELETE FROM reservation_packages', $sqls[0]);
        $this->assertStringContainsString('INSERT INTO reservation_packages', $sqls[1]);
    }

    // -------------------------------------------------------------------------
    // syncTechnicians
    // -------------------------------------------------------------------------

    public function testSyncTechniciansDeletesThenInserts(): void
    {
        $sqls = [];
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);

        $this->pdo->method('prepare')
            ->willReturnCallback(function (string $sql) use ($stmt, &$sqls) {
                $sqls[] = $sql;
                return $stmt;
            });

        $this->repo->syncTechnicians(1, [['technician_id' => 7]]);

        $this->assertStringContainsString('DELETE FROM reservation_technicians', $sqls[0]);
        $this->assertStringContainsString('INSERT INTO reservation_technicians', $sqls[1]);
    }

    // -------------------------------------------------------------------------
    // syncPayments
    // -------------------------------------------------------------------------

    public function testSyncPaymentsDeletesThenInserts(): void
    {
        $sqls = [];
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);

        $this->pdo->method('prepare')
            ->willReturnCallback(function (string $sql) use ($stmt, &$sqls) {
                $sqls[] = $sql;
                return $stmt;
            });

        $this->repo->syncPayments(1, [['payment_type' => 'cash', 'value' => 500, 'amount' => 500, 'percentage' => null, 'note' => null, 'recorded_at' => null]]);

        $this->assertStringContainsString('DELETE FROM reservation_payments', $sqls[0]);
        $this->assertStringContainsString('INSERT INTO reservation_payments', $sqls[1]);
    }

    // -------------------------------------------------------------------------
    // findItems / findPackages / findTechnicians / findPayments
    // -------------------------------------------------------------------------

    public function testFindItemsJoinsEquipment(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('INNER JOIN equipment'))
            ->willReturn($stmt);

        $this->repo->findItems(1);
    }

    public function testFindPackagesQueriesPackagesTable(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('FROM reservation_packages'))
            ->willReturn($stmt);

        $this->repo->findPackages(1);
    }

    public function testFindTechniciansJoinsTechniciansAndPositions(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalAnd(
                $this->stringContains('INNER JOIN technicians'),
                $this->stringContains('LEFT JOIN technician_positions')
            ))
            ->willReturn($stmt);

        $this->repo->findTechnicians(1);
    }

    public function testFindPaymentsOrdersByDate(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('ORDER BY COALESCE(recorded_at'))
            ->willReturn($stmt);

        $this->repo->findPayments(1);
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    private function sampleReservationData(): array
    {
        return [
            'reservation_code'        => 'RSV-0001',
            'customer_id'             => 1,
            'title'                   => 'Wedding',
            'start_datetime'          => '2026-05-01 10:00:00',
            'end_datetime'            => '2026-05-01 22:00:00',
            'status'                  => 'pending',
            'location'                => 'Riyadh',
            'notes'                   => null,
            'total_amount'            => 5000,
            'project_id'              => null,
            'discount'                => 0,
            'discount_type'           => 'fixed',
            'apply_tax'               => 0,
            'paid_status'             => 'unpaid',
            'paid_amount'             => 0,
            'paid_percentage'         => 0,
            'payment_progress_type'   => null,
            'payment_progress_value'  => null,
            'confirmed'               => 0,
        ];
    }

    private function stubFetch(array|false $row): PDOStatement&MockObject
    {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);
        $stmt->method('fetch')->willReturn($row);
        return $stmt;
    }

    private function stubFetchAll(array $rows): PDOStatement&MockObject
    {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);
        $stmt->method('bindValue')->willReturn(true);
        $stmt->method('fetchAll')->willReturn($rows);
        return $stmt;
    }
}
