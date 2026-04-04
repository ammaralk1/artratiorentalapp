<?php

declare(strict_types=1);

namespace ArtRatio\Tests;

use ArtRatio\Repositories\EquipmentRepository;
use PDO;
use PDOStatement;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

final class EquipmentRepositoryTest extends TestCase
{
    private PDO&MockObject $pdo;
    private EquipmentRepository $repo;

    protected function setUp(): void
    {
        $this->pdo  = $this->createMock(PDO::class);
        $this->repo = new EquipmentRepository($this->pdo);
    }

    // -------------------------------------------------------------------------
    // findById
    // -------------------------------------------------------------------------

    public function testFindByIdReturnsRowWhenFound(): void
    {
        $row       = ['id' => 1, 'description' => 'Camera', 'barcode' => 'CAM001'];
        $statement = $this->mockFetchStatement($row);

        $this->pdo->method('prepare')
            ->with($this->stringContains('WHERE id = :id LIMIT 1'))
            ->willReturn($statement);

        $this->assertSame($row, $this->repo->findById(1));
    }

    public function testFindByIdReturnsNullWhenNotFound(): void
    {
        $statement = $this->mockFetchStatement(false);
        $this->pdo->method('prepare')->willReturn($statement);

        $this->assertNull($this->repo->findById(99));
    }

    // -------------------------------------------------------------------------
    // findAll
    // -------------------------------------------------------------------------

    public function testFindAllWithNoFiltersOmitsWhereClause(): void
    {
        $rows      = [['id' => 1], ['id' => 2]];
        $statement = $this->mockFetchAllStatement($rows);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalNot($this->stringContains('WHERE')))
            ->willReturn($statement);

        $this->assertSame($rows, $this->repo->findAll());
    }

    public function testFindAllWithStatusFilterAddsWhereClause(): void
    {
        $statement = $this->mockFetchAllStatement([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('status = :status'))
            ->willReturn($statement);

        $this->repo->findAll(['status' => 'available']);
    }

    public function testFindAllWithCategoryFilterAddsWhereClause(): void
    {
        $statement = $this->mockFetchAllStatement([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('category = :category'))
            ->willReturn($statement);

        $this->repo->findAll(['category' => 'Cameras']);
    }

    public function testFindAllWithSearchBindsParam(): void
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->expects($this->once())
            ->method('bindValue')
            ->with(':search', '%cam%');
        $statement->method('execute')->willReturn(true);
        $statement->method('fetchAll')->willReturn([]);

        $this->pdo->method('prepare')->willReturn($statement);

        $this->repo->findAll(['search' => 'cam']);
    }

    public function testFindAllWithNullLimitOmitsLimitClause(): void
    {
        $statement = $this->mockFetchAllStatement([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalNot($this->stringContains('LIMIT')))
            ->willReturn($statement);

        $this->repo->findAll([], null);
    }

    // -------------------------------------------------------------------------
    // findByBarcode
    // -------------------------------------------------------------------------

    public function testFindByBarcodeWithoutExcludeId(): void
    {
        $row       = ['id' => 3];
        $statement = $this->mockFetchStatement($row);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalAnd(
                $this->stringContains('barcode = :barcode'),
                $this->logicalNot($this->stringContains('excludeId'))
            ))
            ->willReturn($statement);

        $this->assertSame($row, $this->repo->findByBarcode('CAM001'));
    }

    public function testFindByBarcodeWithExcludeIdAddsExclusion(): void
    {
        $statement = $this->mockFetchStatement(false);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('id <> :excludeId'))
            ->willReturn($statement);

        $this->assertNull($this->repo->findByBarcode('CAM001', 7));
    }

    // -------------------------------------------------------------------------
    // create
    // -------------------------------------------------------------------------

    public function testCreateExecutesInsertAndReturnsRow(): void
    {
        $data  = $this->sampleEquipmentData();
        $newRow = array_merge(['id' => 10], $data);

        $insertStmt = $this->createMock(PDOStatement::class);
        $insertStmt->method('execute')->willReturn(true);

        $selectStmt = $this->mockFetchStatement($newRow);

        $this->pdo->method('prepare')
            ->willReturnOnConsecutiveCalls($insertStmt, $selectStmt);
        $this->pdo->method('lastInsertId')->willReturn('10');

        $result = $this->repo->create($data);

        $this->assertSame($newRow, $result);
    }

    // -------------------------------------------------------------------------
    // bulkCreate
    // -------------------------------------------------------------------------

    public function testBulkCreateReturnsInsertedIds(): void
    {
        $rows = [$this->sampleEquipmentData(), $this->sampleEquipmentData()];

        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);

        $this->pdo->method('prepare')->willReturn($statement);
        $this->pdo->method('lastInsertId')->willReturnOnConsecutiveCalls('1', '2');

        $ids = $this->repo->bulkCreate($rows);

        $this->assertSame([1, 2], $ids);
    }

    // -------------------------------------------------------------------------
    // update
    // -------------------------------------------------------------------------

    public function testUpdateReturnsUpdatedRow(): void
    {
        $updated = ['id' => 5, 'description' => 'Updated'];

        $updateStmt = $this->createMock(PDOStatement::class);
        $updateStmt->method('execute')->willReturn(true);

        $selectStmt = $this->mockFetchStatement($updated);

        $this->pdo->method('prepare')
            ->willReturnOnConsecutiveCalls($updateStmt, $selectStmt);

        $result = $this->repo->update(5, ['description' => 'Updated']);

        $this->assertSame($updated, $result);
    }

    public function testUpdateBuildsSetClauseCorrectly(): void
    {
        $updateStmt = $this->createMock(PDOStatement::class);
        $updateStmt->method('execute')->willReturn(true);

        $selectStmt = $this->mockFetchStatement(['id' => 1]);

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

        $this->repo->update(1, ['status' => 'maintenance']);
    }

    // -------------------------------------------------------------------------
    // delete
    // -------------------------------------------------------------------------

    public function testDeleteCleansUpDependentsBeforeDeleting(): void
    {
        $preparedSqls = [];

        $cleanupStmt = $this->createMock(PDOStatement::class);
        $cleanupStmt->method('execute')->willReturn(true);

        $deleteStmt = $this->createMock(PDOStatement::class);
        $deleteStmt->method('execute')->willReturn(true);
        $deleteStmt->method('rowCount')->willReturn(1);

        $callCount = 0;
        $this->pdo->method('prepare')
            ->willReturnCallback(function (string $sql) use ($cleanupStmt, $deleteStmt, &$callCount, &$preparedSqls) {
                $preparedSqls[] = $sql;
                $callCount++;
                if (stripos($sql, 'DELETE FROM equipment WHERE') !== false) {
                    return $deleteStmt;
                }
                return $cleanupStmt;
            });

        $this->pdo->method('beginTransaction')->willReturn(true);
        $this->pdo->method('commit')->willReturn(true);

        $result = $this->repo->delete(1);

        $this->assertTrue($result);
        // 3 dependent tables + 1 equipment delete = 4 prepare calls
        $this->assertCount(4, $preparedSqls);
        $this->assertStringContainsString('reservation_equipment', $preparedSqls[0]);
        $this->assertStringContainsString('project_equipment', $preparedSqls[1]);
        $this->assertStringContainsString('maintenance_requests', $preparedSqls[2]);
    }

    public function testDeleteReturnsFalseWhenNotFound(): void
    {
        $cleanupStmt = $this->createMock(PDOStatement::class);
        $cleanupStmt->method('execute')->willReturn(true);

        $deleteStmt = $this->createMock(PDOStatement::class);
        $deleteStmt->method('execute')->willReturn(true);
        $deleteStmt->method('rowCount')->willReturn(0);

        $this->pdo->method('prepare')
            ->willReturnCallback(fn(string $sql) =>
                stripos($sql, 'DELETE FROM equipment WHERE') !== false ? $deleteStmt : $cleanupStmt
            );
        $this->pdo->method('beginTransaction')->willReturn(true);
        $this->pdo->method('commit')->willReturn(true);

        $this->assertFalse($this->repo->delete(99));
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
    // exists
    // -------------------------------------------------------------------------

    public function testExistsReturnsTrueWhenFound(): void
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);
        $statement->method('fetchColumn')->willReturn('1');

        $this->pdo->method('prepare')
            ->with($this->stringContains('SELECT id FROM equipment'))
            ->willReturn($statement);

        $this->assertTrue($this->repo->exists(1));
    }

    public function testExistsReturnsFalseWhenNotFound(): void
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);
        $statement->method('fetchColumn')->willReturn(false);

        $this->pdo->method('prepare')->willReturn($statement);

        $this->assertFalse($this->repo->exists(99));
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    private function sampleEquipmentData(): array
    {
        return [
            'category'    => 'Cameras',
            'subcategory' => 'DSLR',
            'name'        => 'Canon 5D',
            'description' => 'Full frame camera',
            'quantity'    => 2,
            'unit_price'  => 1500.0,
            'unit_cost'   => 900.0,
            'barcode'     => 'CAM001',
            'status'      => 'available',
            'image_url'   => null,
            'lessor'      => null,
        ];
    }

    private function mockFetchStatement(array|false $row): PDOStatement&MockObject
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);
        $statement->method('fetch')->willReturn($row);
        return $statement;
    }

    private function mockFetchAllStatement(array $rows): PDOStatement&MockObject
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);
        $statement->method('bindValue')->willReturn(true);
        $statement->method('fetchAll')->willReturn($rows);
        return $statement;
    }
}
