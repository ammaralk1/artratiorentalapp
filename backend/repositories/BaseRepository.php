<?php

declare(strict_types=1);

namespace ArtRatio\Repositories;

use PDO;

/**
 * Shared helpers for all repository classes.
 *
 * Repositories receive PDO via constructor (no global state),
 * making them fully testable with mock/stub PDO objects.
 */
abstract class BaseRepository
{
    public function __construct(protected readonly PDO $pdo) {}

    /**
     * Check whether a column exists in a table using information_schema.
     */
    public function columnExists(string $table, string $column): bool
    {
        $statement = $this->pdo->prepare(
            'SELECT 1
             FROM information_schema.columns
             WHERE table_schema = DATABASE()
               AND table_name   = :table
               AND column_name  = :column
             LIMIT 1'
        );
        $statement->execute(['table' => $table, 'column' => $column]);
        return (bool) $statement->fetchColumn();
    }

    /**
     * Check whether a table exists in the current schema.
     */
    public function tableExists(string $table): bool
    {
        $statement = $this->pdo->prepare(
            'SELECT 1
             FROM information_schema.tables
             WHERE table_schema = DATABASE()
               AND table_name   = :table
             LIMIT 1'
        );
        $statement->execute(['table' => $table]);
        return (bool) $statement->fetchColumn();
    }

    /**
     * Return the last auto-incremented ID from the connection.
     */
    protected function lastInsertId(): int
    {
        return (int) $this->pdo->lastInsertId();
    }
}
