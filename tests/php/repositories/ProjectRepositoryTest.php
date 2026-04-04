<?php

declare(strict_types=1);

namespace ArtRatio\Tests;

use ArtRatio\Repositories\ProjectRepository;
use PDO;
use PDOStatement;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

final class ProjectRepositoryTest extends TestCase
{
    private PDO&MockObject $pdo;
    private ProjectRepository $repo;

    protected function setUp(): void
    {
        $this->pdo  = $this->createMock(PDO::class);
        $this->repo = new ProjectRepository($this->pdo);
    }

    // -------------------------------------------------------------------------
    // findById
    // -------------------------------------------------------------------------

    public function testFindByIdJoinsCustomers(): void
    {
        $row       = ['id' => 1, 'title' => 'Festival', 'client_name' => 'Ahmed'];
        $statement = $this->stubFetch($row);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalAnd(
                $this->stringContains('JOIN customers'),
                $this->stringContains('p.id = :id')
            ))
            ->willReturn($statement);

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
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);
        $statement->method('fetchColumn')->willReturn('PRJ-0041');

        $this->pdo->method('prepare')->willReturn($statement);

        $this->assertSame('PRJ-0042', $this->repo->generateCode());
    }

    public function testGenerateCodeStartsAtOneWhenNoProjects(): void
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);
        $statement->method('fetchColumn')->willReturn(false);

        $this->pdo->method('prepare')->willReturn($statement);

        $this->assertSame('PRJ-0001', $this->repo->generateCode());
    }

    public function testGenerateCodePadsFourDigits(): void
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);
        $statement->method('fetchColumn')->willReturn('PRJ-0099');

        $this->pdo->method('prepare')->willReturn($statement);

        $this->assertSame('PRJ-0100', $this->repo->generateCode());
    }

    // -------------------------------------------------------------------------
    // codeExists
    // -------------------------------------------------------------------------

    public function testCodeExistsReturnsTrueWhenFound(): void
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);
        $statement->method('fetchColumn')->willReturn('5');

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalNot($this->stringContains('exclude')))
            ->willReturn($statement);

        $this->assertTrue($this->repo->codeExists('PRJ-0001'));
    }

    public function testCodeExistsWithExcludeAddsCondition(): void
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);
        $statement->method('fetchColumn')->willReturn(false);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('id <> :exclude'))
            ->willReturn($statement);

        $this->assertFalse($this->repo->codeExists('PRJ-0001', 5));
    }

    // -------------------------------------------------------------------------
    // findAll
    // -------------------------------------------------------------------------

    public function testFindAllWithNoFiltersOmitsWhereClause(): void
    {
        $statement = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalAnd(
                $this->stringContains('JOIN customers'),
                $this->logicalNot($this->stringContains('WHERE'))
            ))
            ->willReturn($statement);

        $this->repo->findAll();
    }

    public function testFindAllWithSearchBindsParam(): void
    {
        $statement = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('p.title LIKE :search'))
            ->willReturn($statement);

        $this->repo->findAll(['search' => 'Festival']);
    }

    public function testFindAllWithClientIdFilter(): void
    {
        $statement = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('p.client_id = :client_id'))
            ->willReturn($statement);

        $this->repo->findAll(['client_id' => 3]);
    }

    // -------------------------------------------------------------------------
    // create
    // -------------------------------------------------------------------------

    public function testCreateInsertsAndReturnsRow(): void
    {
        $data   = ['title' => 'New Project', 'client_id' => 1, 'project_code' => 'PRJ-0001'];
        $newRow = array_merge(['id' => 7], $data, ['client_name' => 'Ahmed']);

        $insertStmt = $this->createMock(PDOStatement::class);
        $insertStmt->method('execute')->willReturn(true);

        $selectStmt = $this->stubFetch($newRow);

        $this->pdo->method('prepare')
            ->willReturnOnConsecutiveCalls($insertStmt, $selectStmt);
        $this->pdo->method('lastInsertId')->willReturn('7');

        $result = $this->repo->create($data);

        $this->assertSame($newRow, $result);
    }

    // -------------------------------------------------------------------------
    // update
    // -------------------------------------------------------------------------

    public function testUpdateBuildsSetClauseAndReturnsRow(): void
    {
        $updated = ['id' => 2, 'title' => 'Updated', 'client_name' => 'Sara'];

        $updateStmt = $this->createMock(PDOStatement::class);
        $updateStmt->method('execute')->willReturn(true);

        $selectStmt = $this->stubFetch($updated);

        $this->pdo->expects($this->exactly(2))
            ->method('prepare')
            ->willReturnCallback(function (string $sql) use ($updateStmt, $selectStmt) {
                if (stripos($sql, 'UPDATE') !== false) {
                    $this->assertStringContainsString('title = :title', $sql);
                    $this->assertStringContainsString('WHERE id = :id', $sql);
                    return $updateStmt;
                }
                return $selectStmt;
            });

        $result = $this->repo->update(2, ['title' => 'Updated']);
        $this->assertSame($updated, $result);
    }

    // -------------------------------------------------------------------------
    // delete
    // -------------------------------------------------------------------------

    public function testDeleteDetachesReservationsAndCleansRelated(): void
    {
        $sqls       = [];
        $voidStmt   = $this->createMock(PDOStatement::class);
        $voidStmt->method('execute')->willReturn(true);
        $voidStmt->method('rowCount')->willReturn(1);

        $this->pdo->method('prepare')
            ->willReturnCallback(function (string $sql) use ($voidStmt, &$sqls) {
                $sqls[] = $sql;
                return $voidStmt;
            });
        $this->pdo->method('beginTransaction')->willReturn(true);
        $this->pdo->method('commit')->willReturn(true);

        $result = $this->repo->delete(1);

        $this->assertTrue($result);

        // Expect: UPDATE reservations, 4 related table deletes, final DELETE projects
        $updateSql  = array_filter($sqls, fn($s) => stripos($s, 'UPDATE reservations') !== false);
        $deleteSqls = array_filter($sqls, fn($s) => stripos($s, 'DELETE FROM') !== false);

        $this->assertCount(1, $updateSql, 'Should detach reservations via UPDATE');
        $this->assertCount(5, $deleteSqls, 'Should delete 4 related tables + projects');
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
    // syncTechnicians
    // -------------------------------------------------------------------------

    public function testSyncTechniciansDeletesThenInserts(): void
    {
        $sqls   = [];
        $stmt   = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);

        $this->pdo->method('prepare')
            ->willReturnCallback(function (string $sql) use ($stmt, &$sqls) {
                $sqls[] = $sql;
                return $stmt;
            });

        $this->repo->syncTechnicians(1, [10, 20]);

        $this->assertStringContainsString('DELETE FROM project_technicians', $sqls[0]);
        $this->assertStringContainsString('INSERT INTO project_technicians', $sqls[1]);
    }

    public function testSyncTechniciansWithEmptyArrayOnlyDeletes(): void
    {
        $prepareCount = 0;
        $stmt         = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);

        $this->pdo->method('prepare')
            ->willReturnCallback(function () use ($stmt, &$prepareCount) {
                $prepareCount++;
                return $stmt;
            });

        $this->repo->syncTechnicians(1, []);

        // Only 1 prepare call (the DELETE), no INSERT
        $this->assertSame(1, $prepareCount);
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

        $this->repo->syncPayments(1, [
            ['payment_type' => 'cash', 'value' => 1000, 'amount' => 1000, 'percentage' => null, 'note' => null, 'recorded_at' => null],
        ]);

        $this->assertStringContainsString('DELETE FROM project_payments', $sqls[0]);
        $this->assertStringContainsString('INSERT INTO project_payments', $sqls[1]);
    }

    // -------------------------------------------------------------------------
    // findTechnicians / findEquipment / findExpenses / findPayments
    // -------------------------------------------------------------------------

    public function testFindTechniciansJoinsTechniciansTable(): void
    {
        $rows = [['technician_id' => 5, 'full_name' => 'Ali']];
        $stmt = $this->stubFetchAll($rows);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('LEFT JOIN technicians'))
            ->willReturn($stmt);

        $this->assertSame($rows, $this->repo->findTechnicians(1));
    }

    public function testFindEquipmentJoinsEquipmentTable(): void
    {
        $rows = [['equipment_id' => 3, 'description' => 'Camera']];
        $stmt = $this->stubFetchAll($rows);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('INNER JOIN equipment'))
            ->willReturn($stmt);

        $this->assertSame($rows, $this->repo->findEquipment(1));
    }

    public function testFindExpensesReturnsRows(): void
    {
        $rows = [['id' => 1, 'label' => 'Catering', 'amount' => 500]];
        $stmt = $this->stubFetchAll($rows);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('FROM project_expenses'))
            ->willReturn($stmt);

        $this->assertSame($rows, $this->repo->findExpenses(1));
    }

    public function testFindPaymentsOrdersByDateThenId(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('ORDER BY recorded_at'))
            ->willReturn($stmt);

        $this->repo->findPayments(1);
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

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
