<?php

declare(strict_types=1);

namespace ArtRatio\Repositories;

use PDO;

/**
 * Data-access layer for the equipment table and its dependents.
 */
class EquipmentRepository extends BaseRepository
{
    /** Dependent tables that must be cleared before deleting equipment. */
    private const DEPENDENT_TABLES = [
        'reservation_equipment',
        'project_equipment',
        'maintenance_requests',
    ];

    // -------------------------------------------------------------------------
    // Reads
    // -------------------------------------------------------------------------

    public function findById(int $id): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT * FROM equipment WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => $id]);
        $row = $statement->fetch();
        return $row !== false ? $row : null;
    }

    /**
     * Return equipment rows with optional filtering.
     *
     * @param array<string, mixed> $filters  Keys: search, status, category
     * @param int|null             $limit    null means no LIMIT (all rows)
     * @return array<int, array<string, mixed>>
     */
    public function findAll(array $filters = [], ?int $limit = 100, int $offset = 0): array
    {
        $where  = [];
        $params = [];

        if (!empty($filters['search'])) {
            $where[]          = '(description LIKE :search OR name LIKE :search OR barcode LIKE :search OR category LIKE :search OR subcategory LIKE :search)';
            $params['search'] = '%' . $filters['search'] . '%';
        }

        if (!empty($filters['status'])) {
            $where[]          = 'status = :status';
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['category'])) {
            $where[]            = 'category = :category';
            $params['category'] = $filters['category'];
        }

        $whereClause  = $where ? 'WHERE ' . implode(' AND ', $where) : '';
        $limitClause  = $limit !== null
            ? sprintf(' LIMIT %d OFFSET %d', $limit, $offset)
            : '';

        $query = 'SELECT * FROM equipment ' . $whereClause . ' ORDER BY created_at DESC' . $limitClause;

        $statement = $this->pdo->prepare($query);
        foreach ($params as $key => $value) {
            $statement->bindValue(':' . $key, $value);
        }
        $statement->execute();
        return $statement->fetchAll();
    }

    public function count(): int
    {
        return (int) $this->pdo->query('SELECT COUNT(*) FROM equipment')->fetchColumn();
    }

    /**
     * Find equipment by barcode, optionally excluding one ID (for uniqueness checks).
     */
    public function findByBarcode(string $barcode, ?int $excludeId = null): ?array
    {
        $sql    = 'SELECT id FROM equipment WHERE barcode = :barcode';
        $params = ['barcode' => $barcode];

        if ($excludeId !== null) {
            $sql          .= ' AND id <> :excludeId';
            $params['excludeId'] = $excludeId;
        }

        $statement = $this->pdo->prepare($sql . ' LIMIT 1');
        $statement->execute($params);
        $row = $statement->fetch();
        return $row !== false ? $row : null;
    }

    public function exists(int $id): bool
    {
        $statement = $this->pdo->prepare(
            'SELECT id FROM equipment WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => $id]);
        return (bool) $statement->fetchColumn();
    }

    // -------------------------------------------------------------------------
    // Writes
    // -------------------------------------------------------------------------

    /**
     * Insert a single equipment row.
     * $data must already be validated; returns the new row.
     */
    public function create(array $data): array
    {
        $sql = 'INSERT INTO equipment
                    (category, subcategory, name, description, quantity,
                     unit_price, unit_cost, barcode, status, image_url, lessor)
                VALUES
                    (:category, :subcategory, :name, :description, :quantity,
                     :unit_price, :unit_cost, :barcode, :status, :image_url, :lessor)';

        $statement = $this->pdo->prepare($sql);
        $statement->execute($data);

        $id = $this->lastInsertId();
        return $this->findById($id) ?? [];
    }

    /**
     * Insert multiple equipment rows in a single transaction.
     * Returns IDs of newly inserted rows.
     *
     * @param  array<int, array<string, mixed>> $rows
     * @return int[]
     */
    public function bulkCreate(array $rows): array
    {
        $sql = 'INSERT INTO equipment
                    (category, subcategory, name, description, quantity,
                     unit_price, unit_cost, barcode, status, image_url, lessor)
                VALUES
                    (:category, :subcategory, :name, :description, :quantity,
                     :unit_price, :unit_cost, :barcode, :status, :image_url, :lessor)';

        $statement   = $this->pdo->prepare($sql);
        $insertedIds = [];

        foreach ($rows as $data) {
            $statement->execute($data);
            $insertedIds[] = $this->lastInsertId();
        }

        return $insertedIds;
    }

    /**
     * Update equipment fields dynamically.
     * Returns the updated row, or null when not found.
     */
    public function update(int $id, array $data): ?array
    {
        $fields = [];
        foreach (array_keys($data) as $column) {
            $fields[] = sprintf('%s = :%s', $column, $column);
        }

        $data['id'] = $id;
        $statement  = $this->pdo->prepare(
            'UPDATE equipment SET ' . implode(', ', $fields) . ' WHERE id = :id'
        );
        $statement->execute($data);

        return $this->findById($id);
    }

    /**
     * Delete a single equipment item and its dependent records.
     * Runs inside a transaction. Returns true when deleted.
     */
    public function delete(int $id): bool
    {
        $this->pdo->beginTransaction();

        try {
            foreach (self::DEPENDENT_TABLES as $table) {
                $cleanup = $this->pdo->prepare(
                    'DELETE FROM ' . $table . ' WHERE equipment_id = :id'
                );
                $cleanup->execute(['id' => $id]);
            }

            $statement = $this->pdo->prepare(
                'DELETE FROM equipment WHERE id = :id LIMIT 1'
            );
            $statement->execute(['id' => $id]);
            $deleted = $statement->rowCount() > 0;

            $this->pdo->commit();
            return $deleted;
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Delete all equipment and their dependent records.
     * Returns the number of equipment rows removed.
     */
    public function deleteAll(): int
    {
        $this->pdo->beginTransaction();

        try {
            $total = $this->count();

            foreach (self::DEPENDENT_TABLES as $table) {
                $this->pdo->exec('DELETE FROM ' . $table);
            }

            $this->pdo->exec('DELETE FROM equipment');
            $this->pdo->commit();
            return $total;
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Fetch a minimal record (id + status) used for maintenance checks.
     */
    public function findBasicInfo(int $id): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT id, status FROM equipment WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => $id]);
        $row = $statement->fetch();
        return $row !== false ? $row : null;
    }
}
