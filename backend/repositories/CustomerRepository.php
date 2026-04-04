<?php

declare(strict_types=1);

namespace ArtRatio\Repositories;

use PDO;

/**
 * Data-access layer for the customers table.
 *
 * All methods use parameterised queries. Validation and HTTP logic
 * remain in the API endpoint (thin controller).
 */
class CustomerRepository extends BaseRepository
{
    /**
     * Find a single customer by primary key.
     * Returns the raw DB row or null if not found.
     */
    public function findById(int $id): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT * FROM customers WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => $id]);
        $row = $statement->fetch();
        return $row !== false ? $row : null;
    }

    /**
     * Return a page of customers with optional full-text search.
     *
     * @return array<int, array<string, mixed>>
     */
    public function findAll(string $search = '', int $limit = 50, int $offset = 0): array
    {
        $params = [];
        $where  = '';

        if ($search !== '') {
            $params['search'] = '%' . $search . '%';
            $where = 'WHERE full_name LIKE :search
                         OR phone     LIKE :search
                         OR company   LIKE :search';
        }

        $query = sprintf(
            'SELECT * FROM customers %s ORDER BY created_at DESC LIMIT %d OFFSET %d',
            $where,
            $limit,
            $offset
        );

        $statement = $this->pdo->prepare($query);
        foreach ($params as $key => $value) {
            $statement->bindValue(':' . $key, $value, PDO::PARAM_STR);
        }
        $statement->execute();
        return $statement->fetchAll();
    }

    /**
     * Insert a new customer row.
     * $data must already be sanitised and validated by the caller.
     * Returns the newly created row.
     */
    public function create(array $data): array
    {
        $columns      = array_keys($data);
        $placeholders = array_map(static fn(string $col) => ':' . $col, $columns);

        $sql = sprintf(
            'INSERT INTO customers (%s) VALUES (%s)',
            implode(', ', $columns),
            implode(', ', $placeholders)
        );

        $statement = $this->pdo->prepare($sql);
        $statement->execute($data);

        $newId = $this->lastInsertId();
        return $this->findById($newId) ?? [];
    }

    /**
     * Update an existing customer row.
     * $data must not contain 'id'; $id is supplied separately.
     * Returns the updated row, or null when the record does not exist.
     */
    public function update(int $id, array $data): ?array
    {
        $fields = [];
        foreach (array_keys($data) as $column) {
            $fields[] = sprintf('%s = :%s', $column, $column);
        }

        $data['id'] = $id;
        $statement  = $this->pdo->prepare(
            'UPDATE customers SET ' . implode(', ', $fields) . ' WHERE id = :id'
        );
        $statement->execute($data);

        return $this->findById($id);
    }

    /**
     * Delete a customer row.
     * Returns true when a row was deleted, false when it was not found.
     */
    public function delete(int $id): bool
    {
        $statement = $this->pdo->prepare(
            'DELETE FROM customers WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => $id]);
        return $statement->rowCount() > 0;
    }

    /**
     * Check whether a customer with the given ID exists.
     */
    public function exists(int $id): bool
    {
        $statement = $this->pdo->prepare(
            'SELECT id FROM customers WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => $id]);
        return (bool) $statement->fetchColumn();
    }
}
