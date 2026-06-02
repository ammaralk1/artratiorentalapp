<?php

declare(strict_types=1);

namespace ArtRatio\Repositories;

use PDO;

/**
 * Data-access layer for the projects table and its related tables.
 */
class ProjectRepository extends BaseRepository
{
    // -------------------------------------------------------------------------
    // Single project reads
    // -------------------------------------------------------------------------

    public function findById(int $id): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT p.*, c.full_name AS client_name
             FROM projects p
             INNER JOIN customers c ON c.id = p.client_id
             WHERE p.id = :id'
        );
        $statement->execute(['id' => $id]);
        $row = $statement->fetch();
        return $row !== false ? $row : null;
    }

    public function exists(int $id): bool
    {
        $statement = $this->pdo->prepare(
            'SELECT id FROM projects WHERE id = :id'
        );
        $statement->execute(['id' => $id]);
        return (bool) $statement->fetchColumn();
    }

    public function codeExists(string $code, ?int $excludeId = null): bool
    {
        $sql    = 'SELECT id FROM projects WHERE project_code = :code';
        $params = ['code' => $code];

        if ($excludeId !== null) {
            $sql           .= ' AND id <> :exclude';
            $params['exclude'] = $excludeId;
        }

        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return (bool) $statement->fetchColumn();
    }

    /**
     * Generate the next sequential project code (e.g. PRJ-0042).
     */
    public function generateCode(): string
    {
        $statement = $this->pdo->prepare(
            "SELECT project_code FROM projects
             WHERE project_code REGEXP '^PRJ-[0-9]+$'
             ORDER BY CAST(SUBSTRING(project_code, 5) AS UNSIGNED) DESC
             LIMIT 1"
        );
        $statement->execute();
        $last = $statement->fetchColumn();

        if ($last && preg_match('/^PRJ-(\d+)$/', (string) $last, $m)) {
            return sprintf('PRJ-%04d', (int) $m[1] + 1);
        }

        return 'PRJ-0001';
    }

    // -------------------------------------------------------------------------
    // List
    // -------------------------------------------------------------------------

    /**
     * Return a page of projects joined to the customers table.
     *
     * @param  array<string, mixed> $filters  Keys: search, client_id, payment_status, date_from, date_to
     * @return array<int, array<string, mixed>>
     */
    public function findAll(array $filters = [], int $limit = 50, int $offset = 0): array
    {
        $where  = [];
        $params = [];

        if (!empty($filters['search'])) {
            $where[]          = '(p.title LIKE :search OR p.project_code LIKE :search OR c.full_name LIKE :search)';
            $params['search'] = '%' . $filters['search'] . '%';
        }

        if (!empty($filters['client_id'])) {
            $where[]              = 'p.client_id = :client_id';
            $params['client_id']  = (int) $filters['client_id'];
        }

        if (!empty($filters['payment_status'])) {
            $where[]                   = 'p.payment_status = :payment_status';
            $params['payment_status']  = $filters['payment_status'];
        }

        if (!empty($filters['date_from'])) {
            $where[]               = 'p.start_datetime >= :date_from';
            $params['date_from']   = $filters['date_from'];
        }

        if (!empty($filters['date_to'])) {
            $where[]             = 'p.start_datetime <= :date_to';
            $params['date_to']   = $filters['date_to'];
        }

        $whereClause = $where
            ? 'WHERE ' . implode(' AND ', $where)
            : '';

        $query = sprintf(
            'SELECT p.*, c.full_name AS client_name
             FROM projects p
             INNER JOIN customers c ON c.id = p.client_id
             %s
             ORDER BY p.start_datetime DESC
             LIMIT %d OFFSET %d',
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
     * Insert a new project row. Returns the new row.
     */
    public function create(array $data): array
    {
        $columns      = array_keys($data);
        $placeholders = array_map(static fn(string $c) => ':' . $c, $columns);

        $sql = sprintf(
            'INSERT INTO projects (%s) VALUES (%s)',
            implode(', ', $columns),
            implode(', ', $placeholders)
        );

        $statement = $this->pdo->prepare($sql);
        $statement->execute($data);

        $id = $this->lastInsertId();
        return $this->findById($id) ?? [];
    }

    /**
     * Update an existing project. Returns the updated row.
     */
    public function update(int $id, array $data): ?array
    {
        $fields = [];
        foreach (array_keys($data) as $column) {
            $fields[] = sprintf('%s = :%s', $column, $column);
        }

        $data['id'] = $id;
        $statement  = $this->pdo->prepare(
            'UPDATE projects SET ' . implode(', ', $fields) . ' WHERE id = :id'
        );
        $statement->execute($data);

        return $this->findById($id);
    }

    /**
     * Delete a project and cascade to all related tables.
     */
    public function delete(int $id): bool
    {
        $this->pdo->beginTransaction();

        try {
            // Detach reservations (nullify FK rather than delete them)
            $stmt = $this->pdo->prepare(
                'UPDATE reservations SET project_id = NULL WHERE project_id = :id'
            );
            $stmt->execute(['id' => $id]);

            foreach (['project_technicians', 'project_equipment', 'project_expenses', 'project_payments'] as $table) {
                $cleanup = $this->pdo->prepare('DELETE FROM ' . $table . ' WHERE project_id = :id');
                $cleanup->execute(['id' => $id]);
            }

            $del  = $this->pdo->prepare('DELETE FROM projects WHERE id = :id');
            $del->execute(['id' => $id]);
            $deleted = $del->rowCount() > 0;

            $this->pdo->commit();
            return $deleted;
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    // -------------------------------------------------------------------------
    // Related-record sync
    // -------------------------------------------------------------------------

    /**
     * Replace all technician assignments for a project.
     *
     * @param array<int, int> $technicianIds
     */
    public function syncTechnicians(int $projectId, array $technicianIds): void
    {
        $del = $this->pdo->prepare(
            'DELETE FROM project_technicians WHERE project_id = :project_id'
        );
        $del->execute(['project_id' => $projectId]);

        if (!$technicianIds) {
            return;
        }

        $ins = $this->pdo->prepare(
            'INSERT INTO project_technicians (project_id, technician_id)
             VALUES (:project_id, :technician_id)'
        );

        foreach ($technicianIds as $techId) {
            $ins->execute(['project_id' => $projectId, 'technician_id' => $techId]);
        }
    }

    /**
     * Replace all equipment assignments for a project.
     *
     * @param array<int, array{equipment_id: int, quantity: int}> $items
     */
    public function syncEquipment(int $projectId, array $items): void
    {
        $del = $this->pdo->prepare(
            'DELETE FROM project_equipment WHERE project_id = :project_id'
        );
        $del->execute(['project_id' => $projectId]);

        if (!$items) {
            return;
        }

        $ins = $this->pdo->prepare(
            'INSERT INTO project_equipment (project_id, equipment_id, quantity)
             VALUES (:project_id, :equipment_id, :quantity)'
        );

        foreach ($items as $item) {
            $ins->execute([
                'project_id'   => $projectId,
                'equipment_id' => $item['equipment_id'],
                'quantity'     => $item['quantity'] ?? 1,
            ]);
        }
    }

    /**
     * Replace all expense rows for a project.
     *
     * @param array<int, array<string, mixed>> $expenses
     */
    public function syncExpenses(int $projectId, array $expenses): void
    {
        $del = $this->pdo->prepare(
            'DELETE FROM project_expenses WHERE project_id = :project_id'
        );
        $del->execute(['project_id' => $projectId]);

        if (!$expenses) {
            return;
        }

        $ins = $this->pdo->prepare(
            'INSERT INTO project_expenses (project_id, label, amount, sale_price, service_days, note)
             VALUES (:project_id, :label, :amount, :sale_price, :service_days, :note)'
        );

        foreach ($expenses as $exp) {
            $ins->execute([
                'project_id' => $projectId,
                'label'      => $exp['label'] ?? '',
                'amount'     => $exp['amount'] ?? 0,
                'sale_price' => $exp['sale_price'] ?? $exp['salePrice'] ?? 0,
                'service_days' => $exp['service_days'] ?? $exp['days'] ?? 1,
                'note'       => $exp['note'] ?? $exp['notes'] ?? null,
            ]);
        }
    }

    /**
     * Replace all payment rows for a project.
     *
     * @param array<int, array<string, mixed>> $payments
     */
    public function syncPayments(int $projectId, array $payments): void
    {
        $del = $this->pdo->prepare(
            'DELETE FROM project_payments WHERE project_id = :id'
        );
        $del->execute(['id' => $projectId]);

        if (!$payments) {
            return;
        }

        $ins = $this->pdo->prepare(
            'INSERT INTO project_payments
                 (project_id, payment_type, value, amount, percentage, note, recorded_at)
             VALUES
                 (:project_id, :payment_type, :value, :amount, :percentage, :note, :recorded_at)'
        );

        foreach ($payments as $payment) {
            $ins->execute([
                'project_id'   => $projectId,
                'payment_type' => $payment['payment_type'] ?? $payment['paymentType'] ?? null,
                'value'        => $payment['value'] ?? null,
                'amount'       => $payment['amount'] ?? null,
                'percentage'   => $payment['percentage'] ?? null,
                'note'         => $payment['note'] ?? null,
                'recorded_at'  => $payment['recorded_at'] ?? $payment['recordedAt'] ?? null,
            ]);
        }
    }

    // -------------------------------------------------------------------------
    // Related-record reads
    // -------------------------------------------------------------------------

    /**
     * @return array<int, array<string, mixed>>
     */
    public function findTechnicians(int $projectId): array
    {
        $statement = $this->pdo->prepare(
            'SELECT pt.technician_id, t.full_name
             FROM project_technicians pt
             LEFT JOIN technicians t ON t.id = pt.technician_id
             WHERE pt.project_id = :project_id'
        );
        $statement->execute(['project_id' => $projectId]);
        return $statement->fetchAll();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function findEquipment(int $projectId): array
    {
        $statement = $this->pdo->prepare(
            'SELECT pe.id, pe.equipment_id, pe.quantity, e.barcode, e.description, e.name
             FROM project_equipment pe
             INNER JOIN equipment e ON e.id = pe.equipment_id
             WHERE pe.project_id = :project_id'
        );
        $statement->execute(['project_id' => $projectId]);
        return $statement->fetchAll();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function findExpenses(int $projectId): array
    {
        $statement = $this->pdo->prepare(
            'SELECT id, label, amount, sale_price, service_days, note
             FROM project_expenses
             WHERE project_id = :project_id'
        );
        $statement->execute(['project_id' => $projectId]);
        return $statement->fetchAll();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function findPayments(int $projectId): array
    {
        $statement = $this->pdo->prepare(
            'SELECT id, payment_type, value, amount, percentage, note, recorded_at
             FROM project_payments
             WHERE project_id = :project_id
             ORDER BY recorded_at ASC, id ASC'
        );
        $statement->execute(['project_id' => $projectId]);
        return $statement->fetchAll();
    }
}
