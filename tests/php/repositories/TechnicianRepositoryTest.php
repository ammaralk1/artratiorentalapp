<?php

declare(strict_types=1);

namespace ArtRatio\Tests;

use ArtRatio\Repositories\TechnicianRepository;
use PDO;
use PDOStatement;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

final class TechnicianRepositoryTest extends TestCase
{
    private PDO&MockObject $pdo;
    private TechnicianRepository $repo;

    protected function setUp(): void
    {
        $this->pdo  = $this->createMock(PDO::class);
        $this->repo = new TechnicianRepository($this->pdo);
    }

    // -------------------------------------------------------------------------
    // findById
    // -------------------------------------------------------------------------

    public function testFindByIdReturnsRowWhenFound(): void
    {
        $row  = ['id' => 1, 'full_name' => 'Khalid', 'phone' => '0501111111'];
        $stmt = $this->stubFetch($row);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('WHERE id = :id LIMIT 1'))
            ->willReturn($stmt);

        $this->assertSame($row, $this->repo->findById(1));
    }

    public function testFindByIdReturnsNullWhenNotFound(): void
    {
        $this->pdo->method('prepare')->willReturn($this->stubFetch(false));
        $this->assertNull($this->repo->findById(99));
    }

    // -------------------------------------------------------------------------
    // exists
    // -------------------------------------------------------------------------

    public function testExistsReturnsTrueWhenFound(): void
    {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);
        $stmt->method('fetchColumn')->willReturn('1');

        $this->pdo->method('prepare')
            ->with($this->stringContains('SELECT id FROM technicians'))
            ->willReturn($stmt);

        $this->assertTrue($this->repo->exists(1));
    }

    public function testExistsReturnsFalseWhenNotFound(): void
    {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);
        $stmt->method('fetchColumn')->willReturn(false);

        $this->pdo->method('prepare')->willReturn($stmt);

        $this->assertFalse($this->repo->exists(99));
    }

    // -------------------------------------------------------------------------
    // findAll
    // -------------------------------------------------------------------------

    public function testFindAllWithNoFiltersOmitsWhereClause(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalNot($this->stringContains('WHERE')))
            ->willReturn($stmt);

        $this->repo->findAll();
    }

    public function testFindAllWithSearchBindsParam(): void
    {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->expects($this->once())
            ->method('bindValue')
            ->with(':search', '%Khalid%');
        $stmt->method('execute')->willReturn(true);
        $stmt->method('fetchAll')->willReturn([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('full_name LIKE :search'))
            ->willReturn($stmt);

        $this->repo->findAll(['search' => 'Khalid']);
    }

    public function testFindAllWithStatusFilter(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('status = :status'))
            ->willReturn($stmt);

        $this->repo->findAll(['status' => 'active']);
    }

    public function testFindAllWithRoleFilter(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('department = :role'))
            ->willReturn($stmt);

        $this->repo->findAll(['role' => 'photographer']);
    }

    public function testFindAllCombinesMultipleFilters(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalAnd(
                $this->stringContains('full_name LIKE :search'),
                $this->stringContains('status = :status')
            ))
            ->willReturn($stmt);

        $this->repo->findAll(['search' => 'Ali', 'status' => 'active']);
    }

    public function testFindAllAppliesLimitAndOffset(): void
    {
        $stmt = $this->stubFetchAll([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalAnd(
                $this->stringContains('LIMIT 10'),
                $this->stringContains('OFFSET 30')
            ))
            ->willReturn($stmt);

        $this->repo->findAll([], 10, 30);
    }

    // -------------------------------------------------------------------------
    // create
    // -------------------------------------------------------------------------

    public function testCreateInsertsAndReturnsRow(): void
    {
        $data   = $this->sampleTechnicianData();
        $newRow = array_merge(['id' => 3], $data);

        $insertStmt = $this->createMock(PDOStatement::class);
        $insertStmt->method('execute')->willReturn(true);

        $selectStmt = $this->stubFetch($newRow);

        $this->pdo->method('prepare')
            ->willReturnOnConsecutiveCalls($insertStmt, $selectStmt);
        $this->pdo->method('lastInsertId')->willReturn('3');

        $result = $this->repo->create($data);
        $this->assertSame($newRow, $result);
    }

    public function testCreateUsesAllExpectedColumns(): void
    {
        $data = $this->sampleTechnicianData();

        $insertStmt = $this->createMock(PDOStatement::class);
        $insertStmt->method('execute')->willReturn(true);

        $selectStmt = $this->stubFetch(array_merge(['id' => 1], $data));

        $this->pdo->expects($this->exactly(2))
            ->method('prepare')
            ->willReturnCallback(function (string $sql) use ($insertStmt, $selectStmt) {
                if (stripos($sql, 'INSERT') !== false) {
                    $this->assertStringContainsString('full_name', $sql);
                    $this->assertStringContainsString('specialization', $sql);
                    $this->assertStringContainsString('daily_wage', $sql);
                    return $insertStmt;
                }
                return $selectStmt;
            });

        $this->pdo->method('lastInsertId')->willReturn('1');

        $this->repo->create($data);
    }

    // -------------------------------------------------------------------------
    // update
    // -------------------------------------------------------------------------

    public function testUpdateBuildsSetClauseAndReturnsRow(): void
    {
        $updated = ['id' => 4, 'full_name' => 'Updated', 'phone' => '0500000000'];

        $updateStmt = $this->createMock(PDOStatement::class);
        $updateStmt->method('execute')->willReturn(true);

        $selectStmt = $this->stubFetch($updated);

        $this->pdo->expects($this->exactly(2))
            ->method('prepare')
            ->willReturnCallback(function (string $sql) use ($updateStmt, $selectStmt) {
                if (stripos($sql, 'UPDATE') !== false) {
                    $this->assertStringContainsString('full_name = :full_name', $sql);
                    $this->assertStringContainsString('WHERE id = :id', $sql);
                    return $updateStmt;
                }
                return $selectStmt;
            });

        $result = $this->repo->update(4, ['full_name' => 'Updated']);
        $this->assertSame($updated, $result);
    }

    // -------------------------------------------------------------------------
    // delete
    // -------------------------------------------------------------------------

    public function testDeleteReturnsTrueWhenRowDeleted(): void
    {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);
        $stmt->method('rowCount')->willReturn(1);

        $this->pdo->method('prepare')
            ->with($this->stringContains('DELETE FROM technicians'))
            ->willReturn($stmt);

        $this->assertTrue($this->repo->delete(1));
    }

    public function testDeleteReturnsFalseWhenNotFound(): void
    {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('execute')->willReturn(true);
        $stmt->method('rowCount')->willReturn(0);

        $this->pdo->method('prepare')->willReturn($stmt);

        $this->assertFalse($this->repo->delete(99));
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    private function sampleTechnicianData(): array
    {
        return [
            'full_name'      => 'Khalid Saeed',
            'phone'          => '0501111111',
            'email'          => 'khalid@example.com',
            'specialization' => 'Photographer',
            'department'     => 'Photography',
            'daily_wage'     => 500.0,
            'daily_total'    => 500.0,
            'status'         => 'active',
            'notes'          => null,
            'active'         => 1,
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
