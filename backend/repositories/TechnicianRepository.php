<?php

declare(strict_types=1);

namespace ArtRatio\Repositories;

/**
 * Data-access layer for the technicians table.
 */
class TechnicianRepository extends BaseRepository
{
    // -------------------------------------------------------------------------
    // Reads
    // -------------------------------------------------------------------------

    public function findById(int $id): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT * FROM technicians WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => $id]);
        $row = $statement->fetch();
        return $row !== false ? $row : null;
    }

    public function exists(int $id): bool
    {
        $statement = $this->pdo->prepare(
            'SELECT id FROM technicians WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => $id]);
        return (bool) $statement->fetchColumn();
    }

    /**
     * Return a page of technicians with optional filtering.
     *
     * @param  array<string, mixed> $filters  Keys: search, status, role
     * @return array<int, array<string, mixed>>
     */
    public function findAll(array $filters = [], int $limit = 50, int $offset = 0): array
    {
        $where  = [];
        $params = [];

        if (!empty($filters['search'])) {
            $where[]          = '(full_name LIKE :search OR phone LIKE :search OR email LIKE :search OR specialization LIKE :search)';
            $params['search'] = '%' . $filters['search'] . '%';
        }

        if (array_key_exists('status', $filters) && $filters['status'] !== null && $filters['status'] !== '') {
            $where[]          = 'status = :status';
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['role'])) {
            $where[]        = 'department = :role';
            $params['role'] = $filters['role'];
        }

        $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $query = sprintf(
            'SELECT * FROM technicians %s ORDER BY created_at DESC LIMIT %d OFFSET %d',
            $whereClause,
            $limit,
            $offset
        );

        $statement = $this->pdo->prepare($query);
        foreach ($params as $key => $value) {
            $statement->bindValue(':' . $key, $value);
        }
        $statement->execute();
        return $statement->fetchAll();
    }

    // -------------------------------------------------------------------------
    // Writes
    // -------------------------------------------------------------------------

    /**
     * Insert a new technician. Returns the new row.
     */
    public function create(array $data): array
    {
        $sql = 'INSERT INTO technicians
                    (full_name, phone, email, specialization, department,
                     daily_wage, daily_total, status, notes, active)
                VALUES
                    (:full_name, :phone, :email, :specialization, :department,
                     :daily_wage, :daily_total, :status, :notes, :active)';

        $statement = $this->pdo->prepare($sql);
        $statement->execute($data);

        $id = $this->lastInsertId();
        return $this->findById($id) ?? [];
    }

    /**
     * Update technician fields dynamically. Returns the updated row.
     */
    public function update(int $id, array $data): ?array
    {
        $fields = [];
        foreach (array_keys($data) as $column) {
            $fields[] = sprintf('%s = :%s', $column, $column);
        }

        $data['id'] = $id;
        $statement  = $this->pdo->prepare(
            'UPDATE technicians SET ' . implode(', ', $fields) . ' WHERE id = :id'
        );
        $statement->execute($data);

        return $this->findById($id);
    }

    /**
     * Delete a technician. Returns true when a row was deleted.
     */
    public function delete(int $id): bool
    {
        $statement = $this->pdo->prepare(
            'DELETE FROM technicians WHERE id = :id'
        );
        $statement->execute(['id' => $id]);
        return $statement->rowCount() > 0;
    }
}
