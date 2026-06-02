<?php
declare(strict_types=1);

final class ProjectReservationPackageRepairService
{
    public function __construct(private PDO $pdo)
    {
    }

    /**
     * Normalize old project-managed package data.
     *
     * This intentionally targets project-linked reservations only. It removes
     * duplicate package rows, clamps package child quantities to one, and
     * removes legacy reservation_equipment rows marked as package children.
     *
     * @return array<string, int>
     */
    public function repair(bool $apply = false): array
    {
        $summary = [
            'reservations_scanned' => 0,
            'package_rows_seen' => 0,
            'package_rows_deleted' => 0,
            'package_rows_normalized' => 0,
            'legacy_equipment_rows_deleted' => 0,
        ];

        if (!$this->requiredTablesExist()) {
            return $summary;
        }

        $reservationIds = $this->findProjectReservationIds();
        $summary['reservations_scanned'] = count($reservationIds);

        foreach ($reservationIds as $reservationId) {
            $packages = $this->findPackages($reservationId);
            $summary['package_rows_seen'] += count($packages);
            if (!$packages) {
                continue;
            }

            $seenPackageKeys = [];
            $packageItemEquipmentIds = [];

            foreach ($packages as $package) {
                $packageKey = $this->packageKey($package);
                $items = $this->normalizeItemsJson((string) ($package['items_json'] ?? ''));
                foreach ($items as $item) {
                    $equipmentId = (int) ($item['equipment_id'] ?? $item['equipmentId'] ?? 0);
                    if ($equipmentId > 0) {
                        $packageItemEquipmentIds[$equipmentId] = true;
                    }
                }

                if ($packageKey !== '' && isset($seenPackageKeys[$packageKey])) {
                    $summary['package_rows_deleted']++;
                    if ($apply) {
                        $this->deletePackage((int) $package['id']);
                    }
                    continue;
                }
                if ($packageKey !== '') {
                    $seenPackageKeys[$packageKey] = true;
                }

                $normalizedJson = json_encode($items, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                if ($normalizedJson !== false && $normalizedJson !== (string) ($package['items_json'] ?? '')) {
                    $summary['package_rows_normalized']++;
                    if ($apply) {
                        $this->updatePackageItemsJson((int) $package['id'], $normalizedJson);
                    }
                }
            }

            if ($packageItemEquipmentIds) {
                $legacyRows = $this->findLegacyPackageEquipmentRows(
                    $reservationId,
                    array_keys($packageItemEquipmentIds)
                );
                $summary['legacy_equipment_rows_deleted'] += count($legacyRows);
                if ($apply && $legacyRows) {
                    $this->deleteReservationEquipmentRows($legacyRows);
                }
            }
        }

        return $summary;
    }

    private function requiredTablesExist(): bool
    {
        return $this->tableExists('reservations')
            && $this->tableExists('reservation_packages')
            && $this->tableExists('reservation_equipment');
    }

    private function tableExists(string $table): bool
    {
        if ($this->pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'sqlite') {
            $statement = $this->pdo->prepare(
                'SELECT 1 FROM sqlite_master WHERE type = "table" AND name = :table LIMIT 1'
            );
        } else {
            $statement = $this->pdo->prepare(
                'SELECT 1
                 FROM information_schema.tables
                 WHERE table_schema = DATABASE() AND table_name = :table
                 LIMIT 1'
            );
        }
        $statement->execute(['table' => $table]);
        return (bool) $statement->fetchColumn();
    }

    /**
     * @return array<int, int>
     */
    private function findProjectReservationIds(): array
    {
        $statement = $this->pdo->query(
            'SELECT DISTINCT r.id
             FROM reservations r
             INNER JOIN reservation_packages rp ON rp.reservation_id = r.id
             WHERE r.project_id IS NOT NULL
             ORDER BY r.id ASC'
        );

        return array_map('intval', $statement ? $statement->fetchAll(PDO::FETCH_COLUMN) : []);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function findPackages(int $reservationId): array
    {
        $statement = $this->pdo->prepare(
            'SELECT id, package_id, package_code, package_name, name, quantity,
                    unit_price, unit_cost, items_json, package_metadata
             FROM reservation_packages
             WHERE reservation_id = :reservation_id
             ORDER BY id ASC'
        );
        $statement->execute(['reservation_id' => $reservationId]);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * @param array<string, mixed> $package
     */
    private function packageKey(array $package): string
    {
        foreach (['package_id', 'package_code', 'package_name', 'name'] as $field) {
            $value = trim((string) ($package[$field] ?? ''));
            if ($value !== '') {
                return strtolower($value);
            }
        }

        return '';
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function normalizeItemsJson(string $itemsJson): array
    {
        $decoded = json_decode($itemsJson, true);
        if (!is_array($decoded)) {
            return [];
        }

        $items = [];
        $seen = [];
        foreach ($decoded as $item) {
            if (!is_array($item)) {
                continue;
            }
            $equipmentId = (int) ($item['equipment_id'] ?? $item['equipmentId'] ?? 0);
            $barcode = trim((string) ($item['barcode'] ?? $item['normalizedBarcode'] ?? ''));
            $key = $equipmentId > 0 ? 'id:' . $equipmentId : ($barcode !== '' ? 'barcode:' . strtolower($barcode) : '');
            if ($key === '' || isset($seen[$key])) {
                continue;
            }
            $seen[$key] = true;

            $item['equipment_id'] = $equipmentId > 0 ? $equipmentId : ($item['equipment_id'] ?? null);
            $item['quantity'] = 1;
            $item['qty'] = 1;
            $item['qtyPerPackage'] = 1;
            $items[] = $item;
        }

        return $items;
    }

    private function deletePackage(int $packageRowId): void
    {
        $statement = $this->pdo->prepare('DELETE FROM reservation_packages WHERE id = :id');
        $statement->execute(['id' => $packageRowId]);
    }

    private function updatePackageItemsJson(int $packageRowId, string $itemsJson): void
    {
        $statement = $this->pdo->prepare(
            'UPDATE reservation_packages SET items_json = :items_json WHERE id = :id'
        );
        $statement->execute([
            'id' => $packageRowId,
            'items_json' => $itemsJson,
        ]);
    }

    /**
     * @param array<int, int> $equipmentIds
     * @return array<int, int>
     */
    private function findLegacyPackageEquipmentRows(int $reservationId, array $equipmentIds): array
    {
        if (!$equipmentIds) {
            return [];
        }

        $placeholders = implode(',', array_fill(0, count($equipmentIds), '?'));
        $statement = $this->pdo->prepare(
            "SELECT id
             FROM reservation_equipment
             WHERE reservation_id = ?
               AND equipment_id IN ({$placeholders})
               AND LOWER(COALESCE(notes, '')) LIKE 'package:%'"
        );
        $statement->execute(array_merge([$reservationId], $equipmentIds));
        return array_map('intval', $statement->fetchAll(PDO::FETCH_COLUMN));
    }

    /**
     * @param array<int, int> $rowIds
     */
    private function deleteReservationEquipmentRows(array $rowIds): void
    {
        $placeholders = implode(',', array_fill(0, count($rowIds), '?'));
        $statement = $this->pdo->prepare("DELETE FROM reservation_equipment WHERE id IN ({$placeholders})");
        $statement->execute($rowIds);
    }
}
