<?php

declare(strict_types=1);

namespace ArtRatio\Repositories;

use PDO;

/**
 * Data-access layer for the reservations table and all its related tables.
 */
class ReservationRepository extends BaseRepository
{
    // -------------------------------------------------------------------------
    // Single reservation reads
    // -------------------------------------------------------------------------

    public function findById(int $id): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT r.*, c.full_name AS customer_name
             FROM reservations r
             INNER JOIN customers c ON c.id = r.customer_id
             WHERE r.id = :id
             LIMIT 1'
        );
        $statement->execute(['id' => $id]);
        $row = $statement->fetch();
        return $row !== false ? $row : null;
    }

    public function exists(int $id): bool
    {
        $statement = $this->pdo->prepare(
            'SELECT id FROM reservations WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => $id]);
        return (bool) $statement->fetchColumn();
    }

    public function codeExists(string $code, ?int $ignoreId = null): bool
    {
        $sql    = 'SELECT 1 FROM reservations WHERE reservation_code = :code';
        $params = ['code' => $code];

        if ($ignoreId !== null) {
            $sql           .= ' AND id <> :ignore_id';
            $params['ignore_id'] = $ignoreId;
        }

        $statement = $this->pdo->prepare($sql . ' LIMIT 1');
        $statement->execute($params);
        return (bool) $statement->fetchColumn();
    }

    /**
     * Generate the next sequential reservation code (e.g. RSV-0042).
     */
    public function generateCode(): string
    {
        $statement = $this->pdo->prepare(
            "SELECT reservation_code FROM reservations
             WHERE reservation_code REGEXP '^RSV-[0-9]+$'
             ORDER BY CAST(SUBSTRING(reservation_code, 5) AS UNSIGNED) DESC
             LIMIT 1"
        );
        $statement->execute();
        $last = $statement->fetchColumn();

        if ($last && preg_match('/^RSV-(\d+)$/', (string) $last, $m)) {
            return sprintf('RSV-%04d', (int) $m[1] + 1);
        }

        return 'RSV-0001';
    }

    // -------------------------------------------------------------------------
    // List
    // -------------------------------------------------------------------------

    /**
     * Return a page of reservations joined to customers.
     *
     * @param  array<string, mixed> $filters  Keys: search, status, customer_id, technician_id, date_from, date_to
     * @return array<int, array<string, mixed>>
     */
    public function findAll(array $filters = [], int $limit = 50, int $offset = 0): array
    {
        $where  = [];
        $params = [];

        if (!empty($filters['search'])) {
            $where[]          = '(r.reservation_code LIKE :search OR r.title LIKE :search OR c.full_name LIKE :search)';
            $params['search'] = '%' . $filters['search'] . '%';
        }

        if (!empty($filters['status'])) {
            $where[]          = 'r.status = :status';
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['customer_id'])) {
            $where[]               = 'r.customer_id = :customer_id';
            $params['customer_id'] = (int) $filters['customer_id'];
        }

        if (!empty($filters['technician_id'])) {
            $where[]                 = 'EXISTS (SELECT 1 FROM reservation_technicians rt WHERE rt.reservation_id = r.id AND rt.technician_id = :technician_id)';
            $params['technician_id'] = (int) $filters['technician_id'];
        }

        if (!empty($filters['date_from'])) {
            $where[]             = 'r.start_datetime >= :date_from';
            $params['date_from'] = $filters['date_from'];
        }

        if (!empty($filters['date_to'])) {
            $where[]           = 'r.start_datetime <= :date_to';
            $params['date_to'] = $filters['date_to'];
        }

        $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $query = sprintf(
            'SELECT r.*, c.full_name AS customer_name
             FROM reservations r
             INNER JOIN customers c ON c.id = r.customer_id
             %s
             ORDER BY r.start_datetime DESC
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
     * Insert a new reservation. Returns the new row.
     */
    public function create(array $data): array
    {
        $sql = 'INSERT INTO reservations
                    (reservation_code, customer_id, title,
                     start_datetime, end_datetime, status, location,
                     notes, total_amount, project_id, discount,
                     discount_type, apply_tax, paid_status, paid_amount,
                     paid_percentage, payment_progress_type, payment_progress_value, confirmed)
                VALUES
                    (:reservation_code, :customer_id, :title,
                     :start_datetime, :end_datetime, :status, :location,
                     :notes, :total_amount, :project_id, :discount,
                     :discount_type, :apply_tax, :paid_status, :paid_amount,
                     :paid_percentage, :payment_progress_type, :payment_progress_value, :confirmed)';

        $statement = $this->pdo->prepare($sql);
        $statement->execute($data);

        $id = $this->lastInsertId();
        return $this->findById($id) ?? [];
    }

    /**
     * Update reservation fields. Returns the updated row.
     */
    public function update(int $id, array $data): ?array
    {
        $fields = [];
        foreach (array_keys($data) as $column) {
            $fields[] = sprintf('%s = :%s', $column, $column);
        }

        $data['id'] = $id;
        $statement  = $this->pdo->prepare(
            'UPDATE reservations SET ' . implode(', ', $fields) . ' WHERE id = :id'
        );
        $statement->execute($data);

        return $this->findById($id);
    }

    /**
     * Delete a reservation and its related records.
     */
    public function delete(int $id): bool
    {
        $this->pdo->beginTransaction();

        try {
            foreach (['reservation_technicians', 'reservation_equipment'] as $table) {
                $cleanup = $this->pdo->prepare(
                    'DELETE FROM ' . $table . ' WHERE reservation_id = :id'
                );
                $cleanup->execute(['id' => $id]);
            }

            $del = $this->pdo->prepare('DELETE FROM reservations WHERE id = :id');
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
     * Replace all equipment items for a reservation.
     *
     * @param array<int, array<string, mixed>> $items
     */
    public function syncItems(int $reservationId, array $items): void
    {
        $del = $this->pdo->prepare(
            'DELETE FROM reservation_equipment WHERE reservation_id = :id'
        );
        $del->execute(['id' => $reservationId]);

        if (!$items) {
            return;
        }

        $ins = $this->pdo->prepare(
            'INSERT INTO reservation_equipment
                 (reservation_id, equipment_id, quantity, unit_price, unit_cost, notes)
             VALUES
                 (:reservation_id, :equipment_id, :quantity, :unit_price, :unit_cost, :notes)'
        );

        foreach ($items as $item) {
            $ins->execute([
                'reservation_id' => $reservationId,
                'equipment_id'   => $item['equipment_id'],
                'quantity'       => $item['quantity'] ?? 1,
                'unit_price'     => $item['unit_price'] ?? 0,
                'unit_cost'      => $item['unit_cost'] ?? 0,
                'notes'          => $item['notes'] ?? null,
            ]);
        }
    }

    /**
     * Replace all packages for a reservation.
     *
     * @param array<int, array<string, mixed>> $packages
     */
    public function syncPackages(int $reservationId, array $packages): void
    {
        $del = $this->pdo->prepare(
            'DELETE FROM reservation_packages WHERE reservation_id = :id'
        );
        $del->execute(['id' => $reservationId]);

        if (!$packages) {
            return;
        }

        $ins = $this->pdo->prepare(
            'INSERT INTO reservation_packages
                 (reservation_id, package_id, package_code, package_name, name,
                  quantity, unit_price, unit_cost, items_json, package_metadata)
             VALUES
                 (:reservation_id, :package_id, :package_code, :package_name, :name,
                  :quantity, :unit_price, :unit_cost, :items_json, :package_metadata)'
        );

        foreach ($packages as $pkg) {
            $ins->execute([
                'reservation_id'   => $reservationId,
                'package_id'       => $pkg['package_id'] ?? null,
                'package_code'     => $pkg['package_code'] ?? null,
                'package_name'     => $pkg['package_name'] ?? null,
                'name'             => $pkg['name'] ?? null,
                'quantity'         => $pkg['quantity'] ?? 1,
                'unit_price'       => $pkg['unit_price'] ?? 0,
                'unit_cost'        => $pkg['unit_cost'] ?? 0,
                'items_json'       => $pkg['items_json'] ?? null,
                'package_metadata' => $pkg['package_metadata'] ?? null,
            ]);
        }
    }

    /**
     * Replace all technician assignments for a reservation.
     *
     * @param array<int, array<string, mixed>> $technicians
     */
    public function syncTechnicians(int $reservationId, array $technicians): void
    {
        $del = $this->pdo->prepare(
            'DELETE FROM reservation_technicians WHERE reservation_id = :id'
        );
        $del->execute(['id' => $reservationId]);

        if (!$technicians) {
            return;
        }

        $ins = $this->pdo->prepare(
            'INSERT INTO reservation_technicians
                 (reservation_id, technician_id, role, notes,
                  position_id, position_key, position_name,
                  position_label_ar, position_label_en,
                  position_cost, position_client_price, assignment_id)
             VALUES
                 (:reservation_id, :technician_id, :role, :notes,
                  :position_id, :position_key, :position_name,
                  :position_label_ar, :position_label_en,
                  :position_cost, :position_client_price, :assignment_id)'
        );

        foreach ($technicians as $tech) {
            $ins->execute([
                'reservation_id'       => $reservationId,
                'technician_id'        => $tech['technician_id'],
                'role'                 => $tech['role'] ?? null,
                'notes'                => $tech['notes'] ?? null,
                'position_id'          => $tech['position_id'] ?? null,
                'position_key'         => $tech['position_key'] ?? null,
                'position_name'        => $tech['position_name'] ?? null,
                'position_label_ar'    => $tech['position_label_ar'] ?? null,
                'position_label_en'    => $tech['position_label_en'] ?? null,
                'position_cost'        => $tech['position_cost'] ?? null,
                'position_client_price'=> $tech['position_client_price'] ?? null,
                'assignment_id'        => $tech['assignment_id'] ?? null,
            ]);
        }
    }

    /**
     * Replace all payment records for a reservation.
     *
     * @param array<int, array<string, mixed>> $payments
     */
    public function syncPayments(int $reservationId, array $payments): void
    {
        $del = $this->pdo->prepare(
            'DELETE FROM reservation_payments WHERE reservation_id = :id'
        );
        $del->execute(['id' => $reservationId]);

        if (!$payments) {
            return;
        }

        $ins = $this->pdo->prepare(
            'INSERT INTO reservation_payments
                 (reservation_id, payment_type, value, amount, percentage, note, recorded_at)
             VALUES
                 (:reservation_id, :payment_type, :value, :amount, :percentage, :note, :recorded_at)'
        );

        foreach ($payments as $payment) {
            $ins->execute([
                'reservation_id' => $reservationId,
                'payment_type'   => $payment['payment_type'] ?? $payment['paymentType'] ?? null,
                'value'          => $payment['value'] ?? null,
                'amount'         => $payment['amount'] ?? null,
                'percentage'     => $payment['percentage'] ?? null,
                'note'           => $payment['note'] ?? null,
                'recorded_at'    => $payment['recorded_at'] ?? $payment['recordedAt'] ?? null,
            ]);
        }
    }

    // -------------------------------------------------------------------------
    // Related-record reads
    // -------------------------------------------------------------------------

    /**
     * @return array<int, array<string, mixed>>
     */
    public function findItems(int $reservationId): array
    {
        $statement = $this->pdo->prepare(
            'SELECT re.id, re.equipment_id, re.quantity, re.unit_price,
                    COALESCE(re.unit_cost, 0) AS unit_cost, re.notes,
                    e.description, e.name, e.barcode, e.image_url
             FROM reservation_equipment re
             INNER JOIN equipment e ON e.id = re.equipment_id
             WHERE re.reservation_id = :id'
        );
        $statement->execute(['id' => $reservationId]);
        return $statement->fetchAll();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function findPackages(int $reservationId): array
    {
        $statement = $this->pdo->prepare(
            'SELECT id, package_id, package_code, package_name, name,
                    quantity, unit_price, unit_cost, items_json, package_metadata
             FROM reservation_packages
             WHERE reservation_id = :id'
        );
        $statement->execute(['id' => $reservationId]);
        return $statement->fetchAll();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function findTechnicians(int $reservationId): array
    {
        $statement = $this->pdo->prepare(
            'SELECT rt.*, t.full_name AS technician_name,
                    COALESCE(rt.position_name, tp.label_ar, tp.label_en, tp.name) AS effective_position_name
             FROM reservation_technicians rt
             INNER JOIN technicians t ON t.id = rt.technician_id
             LEFT JOIN technician_positions tp
                 ON (tp.id = rt.position_id
                     OR (rt.position_id IS NULL AND rt.position_key IS NOT NULL
                         AND tp.name COLLATE utf8mb4_unicode_ci = rt.position_key COLLATE utf8mb4_unicode_ci))
             WHERE rt.reservation_id = :id'
        );
        $statement->execute(['id' => $reservationId]);
        return $statement->fetchAll();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function findPayments(int $reservationId): array
    {
        $statement = $this->pdo->prepare(
            'SELECT id, payment_type, value, amount, percentage, note, recorded_at
             FROM reservation_payments
             WHERE reservation_id = :id
             ORDER BY COALESCE(recorded_at, created_at), id'
        );
        $statement->execute(['id' => $reservationId]);
        return $statement->fetchAll();
    }
}
