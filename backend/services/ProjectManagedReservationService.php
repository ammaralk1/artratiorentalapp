<?php

declare(strict_types=1);

use ArtRatio\Repositories\ReservationRepository;

final class ProjectManagedReservationService
{
    public function __construct(
        private readonly PDO $pdo,
        private readonly ReservationRepository $reservations
    ) {}

    /**
     * @param array<string, mixed> $project
     * @param array<int, array<string, mixed>> $equipment
     * @param array<int, array<string, mixed>> $technicians
     * @return array<string, string>
     */
    public function validateProjectBooking(array $project, array $equipment, array $technicians, ?int $ignoreReservationId = null): array
    {
        $errors = [];
        $start = trim((string) ($project['start_datetime'] ?? ''));
        $end = trim((string) ($project['end_datetime'] ?? ''));

        if ($start === '' || $end === '') {
            if (count($equipment) > 0 || count($technicians) > 0) {
                $errors['managed_reservation.schedule'] = 'Start and end date/time are required when assigning equipment or crew';
            }
            return $errors;
        }

        if (strtotime($end) !== false && strtotime($start) !== false && strtotime($end) <= strtotime($start)) {
            $errors['managed_reservation.schedule'] = 'End date/time must be after start date/time';
            return $errors;
        }

        foreach ($equipment as $index => $item) {
            $equipmentId = (int) ($item['equipment_id'] ?? 0);
            if ($equipmentId <= 0) {
                continue;
            }

            $equipmentRecord = $this->fetchEquipmentRecord($equipmentId);
            $status = $equipmentRecord['status'];
            if (in_array($status, ['maintenance', 'retired'], true)) {
                $errors[sprintf('managed_reservation.equipment.%d', $index)] = sprintf(
                    '%s is unavailable (%s)',
                    $this->describeEquipmentRecord($equipmentRecord),
                    $status === 'maintenance' ? 'maintenance' : 'retired'
                );
                continue;
            }

            $requestedQuantity = max(1, (int) ($item['quantity'] ?? 1));
            $groupKey = $this->resolveEquipmentGroupKey($equipmentRecord);
            $stockQuantity = $groupKey !== ''
                ? $this->sumEquipmentGroupStockQuantity($groupKey)
                : max(1, (int) $equipmentRecord['quantity']);
            $reservedQuantity = $groupKey !== ''
                ? $this->sumReservedEquipmentGroupQuantity($groupKey, $start, $end, $ignoreReservationId)
                : $this->sumReservedEquipmentQuantity($equipmentId, $start, $end, $ignoreReservationId);
            $availableQuantity = max(0, $stockQuantity - $reservedQuantity);
            if ($requestedQuantity > $availableQuantity) {
                $conflict = $groupKey !== ''
                    ? $this->findEquipmentGroupConflict($groupKey, $start, $end, $ignoreReservationId)
                    : $this->findEquipmentConflict($equipmentId, $start, $end, $ignoreReservationId);
                $errors[sprintf('managed_reservation.equipment.%d', $index)] = sprintf(
                    'Equipment quantity exceeds available stock%s',
                    $conflict
                        ? sprintf(' because of reservation %s', $conflict['reservation_code'] ?: ('#' . $conflict['reservation_id']))
                        : ''
                );
            }
        }

        foreach ($technicians as $index => $assignment) {
            $technicianId = (int) ($assignment['technician_id'] ?? 0);
            if ($technicianId <= 0) {
                continue;
            }

            $conflict = $this->findTechnicianConflict($technicianId, $start, $end, $ignoreReservationId);
            if ($conflict) {
                $errors[sprintf('managed_reservation.technicians.%d', $index)] = sprintf(
                    'Technician conflicts with reservation %s',
                    $conflict['reservation_code'] ?: ('#' . $conflict['reservation_id'])
                );
            }
        }

        return $errors;
    }

    /**
     * @param array<string, mixed> $project
     * @param array<int, array<string, mixed>> $equipment
     * @param array<int, array<string, mixed>> $technicians
     * @param array<int, array<string, mixed>> $packages
     */
    public function syncForProject(int $projectId, array $project, array $equipment, array $technicians, array $packages = []): ?int
    {
        $hasResources = count($equipment) > 0 || count($technicians) > 0;
        if (!$hasResources) {
            return null;
        }

        $existingReservationId = $this->findLinkedReservationId($projectId);
        $reservationData = $this->buildReservationData($projectId, $project);

        if ($existingReservationId !== null) {
            $this->reservations->update($existingReservationId, $reservationData);
            $reservationId = $existingReservationId;
        } else {
            $reservationData['reservation_code'] = $this->reservations->generateCode();
            $created = $this->reservations->create($reservationData);
            $reservationId = (int) ($created['id'] ?? 0);
        }

        if ($reservationId <= 0) {
            throw new RuntimeException('Failed to sync project managed reservation');
        }

        $this->reservations->syncItems($reservationId, $equipment);
        if ($this->reservationPackagesTableExists()) {
            $this->reservations->syncPackages($reservationId, $packages);
        }
        $this->reservations->syncTechnicians($reservationId, $technicians);

        return $reservationId;
    }

    private function reservationPackagesTableExists(): bool
    {
        try {
            $this->pdo->query('SELECT 1 FROM reservation_packages LIMIT 1');
            return true;
        } catch (Throwable) {
            return false;
        }
    }

    public function findLinkedReservationId(int $projectId): ?int
    {
        $statement = $this->pdo->prepare(
            'SELECT id FROM reservations WHERE project_id = :project_id ORDER BY id ASC LIMIT 1'
        );
        $statement->execute(['project_id' => $projectId]);
        $value = $statement->fetchColumn();

        return $value ? (int) $value : null;
    }

    /**
     * @return array<string, mixed>
     */
    private function buildReservationData(int $projectId, array $project): array
    {
        $status = $this->normalizeStatus($project['status'] ?? null, !empty($project['confirmed']));
        $paidStatus = $this->normalizePaidStatus($project['payment_status'] ?? null);

        return [
            'customer_id' => (int) ($project['client_id'] ?? 0),
            'title' => $project['title'] ?? null,
            'start_datetime' => $project['start_datetime'],
            'end_datetime' => $project['end_datetime'] ?? $project['start_datetime'],
            'status' => $status,
            'location' => null,
            'notes' => 'Project-managed operational booking',
            'total_amount' => (float) ($project['total_with_tax'] ?? $project['equipment_estimate'] ?? 0),
            'project_id' => $projectId,
            'discount' => 0,
            'discount_type' => 'percent',
            'apply_tax' => 0,
            'paid_status' => $paidStatus,
            'paid_amount' => 0,
            'paid_percentage' => 0,
            'payment_progress_type' => null,
            'payment_progress_value' => null,
            'confirmed' => !empty($project['confirmed']) ? 1 : 0,
        ];
    }

    private function findEquipmentConflict(int $equipmentId, string $start, string $end, ?int $ignoreReservationId): ?array
    {
        $sql = '
            SELECT r.id AS reservation_id, r.reservation_code
            FROM reservation_equipment re
            INNER JOIN reservations r ON r.id = re.reservation_id
            WHERE re.equipment_id = :equipment_id
              AND r.start_datetime < :end_time
              AND COALESCE(r.end_datetime, r.start_datetime) > :start_time
              AND LOWER(COALESCE(r.status, "")) NOT IN ("cancelled", "canceled")
        ';

        $params = [
            'equipment_id' => $equipmentId,
            'start_time' => $start,
            'end_time' => $end,
        ];

        if ($ignoreReservationId !== null) {
            $sql .= ' AND r.id <> :ignore_id';
            $params['ignore_id'] = $ignoreReservationId;
        }

        $sql .= ' ORDER BY r.start_datetime ASC, r.id ASC LIMIT 1';

        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        $row = $statement->fetch(PDO::FETCH_ASSOC);

        return is_array($row) ? $row : null;
    }

    private function findTechnicianConflict(int $technicianId, string $start, string $end, ?int $ignoreReservationId): ?array
    {
        $sql = '
            SELECT r.id AS reservation_id, r.reservation_code
            FROM reservation_technicians rt
            INNER JOIN reservations r ON r.id = rt.reservation_id
            WHERE rt.technician_id = :technician_id
              AND r.start_datetime < :end_time
              AND COALESCE(r.end_datetime, r.start_datetime) > :start_time
              AND LOWER(COALESCE(r.status, "")) NOT IN ("cancelled", "canceled")
        ';

        $params = [
            'technician_id' => $technicianId,
            'start_time' => $start,
            'end_time' => $end,
        ];

        if ($ignoreReservationId !== null) {
            $sql .= ' AND r.id <> :ignore_id';
            $params['ignore_id'] = $ignoreReservationId;
        }

        $sql .= ' ORDER BY r.start_datetime ASC, r.id ASC LIMIT 1';

        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        $row = $statement->fetch(PDO::FETCH_ASSOC);

        return is_array($row) ? $row : null;
    }

    /**
     * @return array<string, mixed>
     */
    private function fetchEquipmentRecord(int $equipmentId): array
    {
        try {
            $statement = $this->pdo->prepare('
                SELECT id,
                       LOWER(COALESCE(status, "")) AS status,
                       COALESCE(quantity, 1) AS quantity,
                       COALESCE(description, "") AS description,
                       COALESCE(name, "") AS name,
                       COALESCE(lessor, "") AS lessor,
                       COALESCE(unit_price, 0) AS unit_price,
                       COALESCE(unit_cost, 0) AS unit_cost
                FROM equipment
                WHERE id = :id
                LIMIT 1
            ');
            $statement->execute(['id' => $equipmentId]);
            $row = $statement->fetch(PDO::FETCH_ASSOC);
        } catch (Throwable) {
            $statement = $this->pdo->prepare('SELECT id, LOWER(COALESCE(status, "")) AS status, COALESCE(quantity, 1) AS quantity FROM equipment WHERE id = :id LIMIT 1');
            $statement->execute(['id' => $equipmentId]);
            $row = $statement->fetch(PDO::FETCH_ASSOC);
        }
        if (!is_array($row)) {
            return ['id' => $equipmentId, 'status' => '', 'quantity' => 1];
        }

        return [
            'id' => (int) ($row['id'] ?? $equipmentId),
            'status' => trim((string) ($row['status'] ?? '')),
            'quantity' => max(1, (int) ($row['quantity'] ?? 1)),
            'description' => (string) ($row['description'] ?? ''),
            'name' => (string) ($row['name'] ?? ''),
            'lessor' => (string) ($row['lessor'] ?? ''),
            'unit_price' => (float) ($row['unit_price'] ?? 0),
            'unit_cost' => (float) ($row['unit_cost'] ?? 0),
        ];
    }

    private function describeEquipmentRecord(array $equipment): string
    {
        $name = trim((string) ($equipment['description'] ?? $equipment['name'] ?? ''));
        if ($name !== '') {
            return $name;
        }

        return sprintf('Equipment #%d', (int) ($equipment['id'] ?? 0));
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function fetchEquipmentRecords(): array
    {
        try {
            $rows = $this->pdo->query('
                SELECT id,
                       LOWER(COALESCE(status, "")) AS status,
                       COALESCE(quantity, 1) AS quantity,
                       COALESCE(description, "") AS description,
                       COALESCE(name, "") AS name,
                       COALESCE(lessor, "") AS lessor,
                       COALESCE(unit_price, 0) AS unit_price,
                       COALESCE(unit_cost, 0) AS unit_cost
                FROM equipment
            ')->fetchAll(PDO::FETCH_ASSOC);
        } catch (Throwable) {
            $rows = $this->pdo->query('
                SELECT id,
                       LOWER(COALESCE(status, "")) AS status,
                       COALESCE(quantity, 1) AS quantity
                FROM equipment
            ')->fetchAll(PDO::FETCH_ASSOC);
        }

        return array_map(fn (array $row): array => [
            'id' => (int) ($row['id'] ?? 0),
            'status' => trim((string) ($row['status'] ?? '')),
            'quantity' => max(1, (int) ($row['quantity'] ?? 1)),
            'description' => (string) ($row['description'] ?? ''),
            'name' => (string) ($row['name'] ?? ''),
            'lessor' => (string) ($row['lessor'] ?? ''),
            'unit_price' => (float) ($row['unit_price'] ?? 0),
            'unit_cost' => (float) ($row['unit_cost'] ?? 0),
        ], is_array($rows) ? $rows : []);
    }

    private function resolveEquipmentGroupKey(array $equipment): string
    {
        $description = $this->normalizeEquipmentGroupText($equipment['description'] ?? $equipment['name'] ?? '');
        if ($description === '') {
            return '';
        }

        return implode('::', [
            $description,
            $this->normalizeEquipmentGroupText($equipment['lessor'] ?? ''),
            $this->normalizeEquipmentGroupMoney($equipment['unit_price'] ?? 0),
            $this->normalizeEquipmentGroupMoney($equipment['unit_cost'] ?? 0),
        ]);
    }

    private function normalizeEquipmentGroupText(mixed $value): string
    {
        $normalized = trim(mb_strtolower((string) $value));
        return preg_replace('/\s+/u', ' ', $normalized) ?? $normalized;
    }

    private function normalizeEquipmentGroupMoney(mixed $value): string
    {
        $number = is_numeric($value) ? (float) $value : 0.0;
        return number_format(max(0, $number), 2, '.', '');
    }

    private function sumEquipmentGroupStockQuantity(string $groupKey): int
    {
        $total = 0;
        foreach ($this->fetchEquipmentRecords() as $record) {
            if ($this->resolveEquipmentGroupKey($record) !== $groupKey) {
                continue;
            }
            if (in_array($record['status'], ['maintenance', 'retired'], true)) {
                continue;
            }
            $total += max(1, (int) ($record['quantity'] ?? 1));
        }

        return $total;
    }

    private function sumReservedEquipmentGroupQuantity(string $groupKey, string $start, string $end, ?int $ignoreReservationId): int
    {
        $reservedByEquipmentId = $this->sumReservedEquipmentQuantities($start, $end, $ignoreReservationId);
        $total = 0;
        foreach ($this->fetchEquipmentRecords() as $record) {
            if ($this->resolveEquipmentGroupKey($record) === $groupKey) {
                $total += $reservedByEquipmentId[(int) $record['id']] ?? 0;
            }
        }

        return $total;
    }

    private function findEquipmentGroupConflict(string $groupKey, string $start, string $end, ?int $ignoreReservationId): ?array
    {
        foreach ($this->fetchEquipmentRecords() as $record) {
            if ($this->resolveEquipmentGroupKey($record) !== $groupKey) {
                continue;
            }
            $conflict = $this->findEquipmentConflict((int) $record['id'], $start, $end, $ignoreReservationId);
            if ($conflict !== null) {
                return $conflict;
            }
        }

        return null;
    }

    private function sumReservedEquipmentQuantity(int $equipmentId, string $start, string $end, ?int $ignoreReservationId): int
    {
        $sql = '
            SELECT COALESCE(SUM(re.quantity), 0)
            FROM reservation_equipment re
            INNER JOIN reservations r ON r.id = re.reservation_id
            WHERE re.equipment_id = :equipment_id
              AND r.start_datetime < :end_time
              AND COALESCE(r.end_datetime, r.start_datetime) > :start_time
              AND LOWER(COALESCE(r.status, "")) NOT IN ("cancelled", "canceled")
        ';

        $params = [
            'equipment_id' => $equipmentId,
            'start_time' => $start,
            'end_time' => $end,
        ];

        if ($ignoreReservationId !== null) {
            $sql .= ' AND r.id <> :ignore_id';
            $params['ignore_id'] = $ignoreReservationId;
        }

        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return max(0, (int) $statement->fetchColumn());
    }

    /**
     * @return array<int, int>
     */
    private function sumReservedEquipmentQuantities(string $start, string $end, ?int $ignoreReservationId): array
    {
        $sql = '
            SELECT re.equipment_id, COALESCE(SUM(re.quantity), 0) AS reserved_quantity
            FROM reservation_equipment re
            INNER JOIN reservations r ON r.id = re.reservation_id
            WHERE r.start_datetime < :end_time
              AND COALESCE(r.end_datetime, r.start_datetime) > :start_time
              AND LOWER(COALESCE(r.status, "")) NOT IN ("cancelled", "canceled")
        ';

        $params = [
            'start_time' => $start,
            'end_time' => $end,
        ];

        if ($ignoreReservationId !== null) {
            $sql .= ' AND r.id <> :ignore_id';
            $params['ignore_id'] = $ignoreReservationId;
        }

        $sql .= ' GROUP BY re.equipment_id';

        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);

        $reserved = [];
        foreach ($statement->fetchAll(PDO::FETCH_ASSOC) ?: [] as $row) {
            $reserved[(int) ($row['equipment_id'] ?? 0)] = max(0, (int) ($row['reserved_quantity'] ?? 0));
        }

        return $reserved;
    }

    private function normalizeStatus(mixed $status, bool $confirmed): string
    {
        $normalized = strtolower(trim((string) $status));

        return match ($normalized) {
            'completed', 'closed' => 'completed',
            'cancelled', 'canceled' => 'cancelled',
            'in_progress', 'in-progress' => 'in_progress',
            'confirmed' => 'confirmed',
            default => $confirmed ? 'confirmed' : 'pending',
        };
    }

    private function normalizePaidStatus(mixed $status): string
    {
        $normalized = strtolower(trim((string) $status));

        return match ($normalized) {
            'paid' => 'paid',
            'partial', 'partially_paid', 'partial_paid' => 'partial',
            default => 'unpaid',
        };
    }
}
