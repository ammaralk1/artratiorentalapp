<?php

declare(strict_types=1);

namespace ArtRatio\Tests;

use ArtRatio\Repositories\CustomerRepository;
use PDO;
use PDOStatement;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/**
 * Unit tests for CustomerRepository.
 *
 * All tests use a PDO mock — no live database required.
 */
final class CustomerRepositoryTest extends TestCase
{
    private PDO&MockObject $pdo;
    private CustomerRepository $repo;

    protected function setUp(): void
    {
        $this->pdo  = $this->createMock(PDO::class);
        $this->repo = new CustomerRepository($this->pdo);
    }

    // -------------------------------------------------------------------------
    // findById
    // -------------------------------------------------------------------------

    public function testFindByIdReturnsRowWhenFound(): void
    {
        $expected  = ['id' => 1, 'full_name' => 'Ahmed Ali', 'phone' => '0501234567'];
        $statement = $this->mockStatement([$expected]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('WHERE id = :id LIMIT 1'))
            ->willReturn($statement);

        $result = $this->repo->findById(1);

        $this->assertSame($expected, $result);
    }

    public function testFindByIdReturnsNullWhenNotFound(): void
    {
        $statement = $this->mockStatement(false);

        $this->pdo->method('prepare')->willReturn($statement);

        $result = $this->repo->findById(99);

        $this->assertNull($result);
    }

    // -------------------------------------------------------------------------
    // findAll
    // -------------------------------------------------------------------------

    public function testFindAllWithoutSearchReturnsRows(): void
    {
        $rows = [
            ['id' => 1, 'full_name' => 'Ahmed Ali'],
            ['id' => 2, 'full_name' => 'Sara Mohamed'],
        ];

        $statement = $this->createMock(PDOStatement::class);
        $statement->method('bindValue')->willReturn(true);
        $statement->method('execute')->willReturn(true);
        $statement->method('fetchAll')->willReturn($rows);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalNot($this->stringContains('WHERE')))
            ->willReturn($statement);

        $result = $this->repo->findAll();

        $this->assertSame($rows, $result);
    }

    public function testFindAllWithSearchBindsSearchParam(): void
    {
        $rows = [['id' => 1, 'full_name' => 'Ahmed Ali']];

        $statement = $this->createMock(PDOStatement::class);
        $statement->expects($this->once())
            ->method('bindValue')
            ->with(':search', '%Ahmed%', PDO::PARAM_STR);
        $statement->method('execute')->willReturn(true);
        $statement->method('fetchAll')->willReturn($rows);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->stringContains('WHERE'))
            ->willReturn($statement);

        $result = $this->repo->findAll('Ahmed');

        $this->assertSame($rows, $result);
    }

    public function testFindAllWithLimitAndOffset(): void
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('bindValue')->willReturn(true);
        $statement->method('execute')->willReturn(true);
        $statement->method('fetchAll')->willReturn([]);

        $this->pdo->expects($this->once())
            ->method('prepare')
            ->with($this->logicalAnd(
                $this->stringContains('LIMIT 10'),
                $this->stringContains('OFFSET 20')
            ))
            ->willReturn($statement);

        $this->repo->findAll('', 10, 20);
    }

    // -------------------------------------------------------------------------
    // create
    // -------------------------------------------------------------------------

    public function testCreateInsertsAndReturnsNewRow(): void
    {
        $data     = ['full_name' => 'New Customer', 'phone' => '0509999999'];
        $newRow   = array_merge(['id' => 5], $data);

        // First call: INSERT; second call: SELECT after insert
        $insertStatement = $this->createMock(PDOStatement::class);
        $insertStatement->method('execute')->willReturn(true);

        $selectStatement = $this->mockStatement([$newRow]);

        $this->pdo->method('prepare')
            ->willReturnOnConsecutiveCalls($insertStatement, $selectStatement);

        $this->pdo->method('lastInsertId')->willReturn('5');

        $result = $this->repo->create($data);

        $this->assertSame($newRow, $result);
    }

    public function testCreateBuildsDynamicInsertFromData(): void
    {
        $data = ['full_name' => 'Test', 'phone' => '05000'];

        $insertStatement = $this->createMock(PDOStatement::class);
        $insertStatement->method('execute')->willReturn(true);

        $selectStatement = $this->mockStatement([array_merge(['id' => 1], $data)]);

        $this->pdo->expects($this->exactly(2))
            ->method('prepare')
            ->willReturnCallback(function (string $sql) use ($insertStatement, $selectStatement) {
                if (stripos($sql, 'INSERT') !== false) {
                    $this->assertStringContainsString('full_name', $sql);
                    $this->assertStringContainsString('phone', $sql);
                    return $insertStatement;
                }
                return $selectStatement;
            });

        $this->pdo->method('lastInsertId')->willReturn('1');

        $this->repo->create($data);
    }

    // -------------------------------------------------------------------------
    // update
    // -------------------------------------------------------------------------

    public function testUpdateReturnsUpdatedRow(): void
    {
        $updated = ['id' => 3, 'full_name' => 'Updated Name', 'phone' => '0500'];

        $updateStatement = $this->createMock(PDOStatement::class);
        $updateStatement->method('execute')->willReturn(true);

        $selectStatement = $this->mockStatement([$updated]);

        $this->pdo->method('prepare')
            ->willReturnOnConsecutiveCalls($updateStatement, $selectStatement);

        $result = $this->repo->update(3, ['full_name' => 'Updated Name']);

        $this->assertSame($updated, $result);
    }

    public function testUpdateBuildsSetClauseFromData(): void
    {
        $data = ['full_name' => 'X', 'email' => 'x@x.com'];

        $updateStatement = $this->createMock(PDOStatement::class);
        $updateStatement->method('execute')->willReturn(true);

        $selectStatement = $this->mockStatement([array_merge(['id' => 1], $data)]);

        $this->pdo->expects($this->exactly(2))
            ->method('prepare')
            ->willReturnCallback(function (string $sql) use ($updateStatement, $selectStatement) {
                if (stripos($sql, 'UPDATE') !== false) {
                    $this->assertStringContainsString('full_name = :full_name', $sql);
                    $this->assertStringContainsString('email = :email', $sql);
                    $this->assertStringContainsString('WHERE id = :id', $sql);
                    return $updateStatement;
                }
                return $selectStatement;
            });

        $this->repo->update(1, $data);
    }

    // -------------------------------------------------------------------------
    // delete
    // -------------------------------------------------------------------------

    public function testDeleteReturnsTrueWhenRowDeleted(): void
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);
        $statement->method('rowCount')->willReturn(1);

        $this->pdo->method('prepare')
            ->with($this->stringContains('DELETE FROM customers'))
            ->willReturn($statement);

        $this->assertTrue($this->repo->delete(1));
    }

    public function testDeleteReturnsFalseWhenNotFound(): void
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);
        $statement->method('rowCount')->willReturn(0);

        $this->pdo->method('prepare')->willReturn($statement);

        $this->assertFalse($this->repo->delete(99));
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
            ->with($this->stringContains('SELECT id FROM customers'))
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

    /**
     * Build a PDOStatement mock that returns the given rows from fetch().
     * Pass false to simulate "not found".
     */
    private function mockStatement(array|false $rows): PDOStatement&MockObject
    {
        $statement = $this->createMock(PDOStatement::class);
        $statement->method('execute')->willReturn(true);

        if ($rows === false) {
            $statement->method('fetch')->willReturn(false);
        } else {
            // First row via fetch(), all rows via fetchAll()
            $statement->method('fetch')->willReturn($rows[0] ?? false);
            $statement->method('fetchAll')->willReturn($rows);
        }

        return $statement;
    }
}
