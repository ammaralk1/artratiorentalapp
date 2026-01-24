<?php
require_once __DIR__ . '/../../bootstrap.php';

use InvalidArgumentException;
use PDO;
use PDOException;
use RuntimeException;
use Throwable;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Only run the HTTP dispatcher when this file is the direct entrypoint.
// When included from another endpoint (e.g. to use helper functions), skip dispatch.
if (!defined('API_INCLUDE_MODE')) {
    try {
        $pdo = getDatabaseConnection();
        requireAuthenticated();

        switch ($method) {
            case 'GET':
                handleReservationsGet($pdo);
                break;
            case 'POST':
                handleReservationsCreate($pdo);
                break;
            case 'PUT':
            case 'PATCH':
                handleReservationsUpdate($pdo);
                break;
            case 'DELETE':
                handleReservationsDelete($pdo);
                break;
            default:
                respondError('Method not allowed', 405);
        }
    } catch (InvalidArgumentException $exception) {
        respondError($exception->getMessage(), 400);
    } catch (Throwable $exception) {
        respondError('Unexpected server error', 500, [
            'details' => $exception->getMessage(),
        ]);
    }
}

function handleReservationsGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if ($id) {
        $reservation = fetchReservationById($pdo, $id);

        try {
            if (array_key_exists('packages', $data)) {
                error_log(sprintf('[reservations] updateReservation payload packages (id=%d): %s', $id, json_encode($data['packages'], JSON_UNESCAPED_UNICODE)));
            }
            if (isset($reservation['packages'])) {
                error_log(sprintf('[reservations] updateReservation DB packages (id=%d): %s', $id, json_encode($reservation['packages'], JSON_UNESCAPED_UNICODE)));
            }
        } catch (Throwable $_logError) {
            // avoid crashing on logging failure
        }
        if (!$reservation) {
            respondError('Reservation not found', 404);
            return;
        }

        respond($reservation);
        return;
    }

    $search = trim($_GET['search'] ?? '');
    $status = trim($_GET['status'] ?? '');
    $customerId = isset($_GET['customer_id']) ? (int) $_GET['customer_id'] : null;
    $technicianId = isset($_GET['technician_id']) ? (int) $_GET['technician_id'] : null;
    $startDate = trim($_GET['start_date'] ?? '');
    $endDate = trim($_GET['end_date'] ?? '');
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 100;
    $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

    if ($limit < 1 || $limit > 200) {
        $limit = 100;
    }

    if ($offset < 0) {
        $offset = 0;
    }

    $where = [];
    $params = [];

    if ($search !== '') {
        $searchable = [];
        if (tableColumnExists($pdo, 'reservations', 'reservation_code')) {
            $searchable[] = 'r.reservation_code LIKE :search';
        }
        if (tableColumnExists($pdo, 'reservations', 'notes')) {
            $searchable[] = 'r.notes LIKE :search';
        }
        if (tableColumnExists($pdo, 'customers', 'full_name')) {
            $searchable[] = 'c.full_name LIKE :search';
        }
        if (tableColumnExists($pdo, 'customers', 'company')) {
            $searchable[] = 'c.company LIKE :search';
        }

        if ($searchable) {
            $where[] = '(' . implode(' OR ', $searchable) . ')';
            $params['search'] = '%' . $search . '%';
        }
    }

    if ($status !== '') {
        $where[] = 'r.status = :status';
        $params['status'] = normaliseStatus($status);
    }

    if ($customerId) {
        $where[] = 'r.customer_id = :customer_id';
        $params['customer_id'] = $customerId;
    }

    if ($technicianId) {
        $where[] = 'EXISTS (
            SELECT 1 FROM reservation_technicians rt
            WHERE rt.reservation_id = r.id AND rt.technician_id = :technician_id
        )';
        $params['technician_id'] = $technicianId;
    }

    $startDateParam = $startDate !== '' ? $startDate . ' 00:00:00' : null;
    $endDateParam = $endDate !== '' ? $endDate . ' 23:59:59' : null;

    if ($startDateParam && $endDateParam) {
        $where[] = '(
            r.start_datetime <= :end_range
            AND COALESCE(r.end_datetime, r.start_datetime) >= :start_range
        )';
        $params['start_range'] = $startDateParam;
        $params['end_range'] = $endDateParam;
    } elseif ($startDateParam) {
        $where[] = 'COALESCE(r.end_datetime, r.start_datetime) >= :start_range';
        $params['start_range'] = $startDateParam;
    } elseif ($endDateParam) {
        $where[] = 'r.start_datetime <= :end_range';
        $params['end_range'] = $endDateParam;
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

    $statement = $pdo->prepare($query);
    foreach ($params as $key => $value) {
        $statement->bindValue(':' . $key, $value);
    }
    $statement->execute();

    $items = [];
    while ($row = $statement->fetch()) {
        $items[] = decorateReservation($pdo, $row);
    }

    respond(
        $items,
        200,
        [
            'limit' => $limit,
            'offset' => $offset,
            'count' => count($items),
        ]
    );
}

function handleReservationsCreate(PDO $pdo): void
{
    $reqId = bin2hex(random_bytes(4));
    $t0 = microtime(true);
    $mark = function (string $label) use ($t0, $reqId): void {
        $elapsed = (microtime(true) - $t0) * 1000;
        error_log(sprintf('[reservations:create:%s] %s +%.1fms', $reqId, $label, $elapsed));
    };

    ensureReservationProjectColumn($pdo);
    $mark('ensureReservationProjectColumn');
    ensureReservationEquipmentCostColumn($pdo);
    $mark('ensureReservationEquipmentCostColumn');
    ensureReservationPaymentColumns($pdo);
    $mark('ensureReservationPaymentColumns');
    ensureReservationPackagesTable($pdo);
    $mark('ensureReservationPackagesTable');
    ensureReservationPackagesTable($pdo);
    $mark('ensureReservationPackagesTable (repeat)');

    [$data, $errors] = validateReservationPayload(readJsonPayload(), false, $pdo);
    $mark('validateReservationPayload');

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $pdo->beginTransaction();

    try {
        $reservationId = insertReservation($pdo, $data);
        $mark('insertReservation');
        upsertReservationItems($pdo, $reservationId, $data['items'] ?? []);
        $mark('upsertReservationItems');
        if (array_key_exists('packages', $data)) {
            upsertReservationPackages($pdo, $reservationId, $data['packages']);
            $mark('upsertReservationPackages');
        }
        upsertReservationTechnicians($pdo, $reservationId, $data['technicians'] ?? []);
        $mark('upsertReservationTechnicians');
        if (array_key_exists('payments', $data)) {
            upsertReservationPayments($pdo, $reservationId, $data['payments']);
            $mark('upsertReservationPayments');
        }

        $pdo->commit();
        $mark('commit');

        $reservation = fetchReservationById($pdo, $reservationId);
        $mark('fetchReservationById');

        logActivity($pdo, 'RESERVATION_CREATE', [
            'reservation_id' => $reservationId,
            'customer_id' => $data['customer_id'] ?? null,
            'items' => isset($data['items']) ? count((array) $data['items']) : 0,
        ]);

        // Respond immediately to avoid slow notification channels blocking the request.
        respond($reservation, 201);
        $mark('respond');
        if (function_exists('fastcgi_finish_request')) {
            fastcgi_finish_request();
        } else {
            if (function_exists('session_write_close')) {
                @session_write_close();
            }
            @ob_end_flush();
            @flush();
            @ignore_user_abort(true);
        }

        // Fire-and-forget notifications; log but do not block response
        try {
            require_once __DIR__ . '/../../services/notifications.php';
            if (is_array($reservation)) {
                notifyReservationCreated($pdo, $reservation);
            }
            $mark('notifyReservationCreated');
        } catch (Throwable $notifyError) {
            error_log('Reservation create notification failed: ' . $notifyError->getMessage());
        }
        return;
    } catch (Throwable $exception) {
        $pdo->rollBack();
        error_log(sprintf('[reservations:create:%s] failed after +%.1fms: %s', $reqId, (microtime(true) - $t0) * 1000, $exception->getMessage()));
        respondError('reservations.errors.createFailed', 500, [
            'details' => $exception->getMessage(),
        ]);
        return;
    }
}

function handleReservationsUpdate(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid reservation id', 400);
        return;
    }

    ensureReservationProjectColumn($pdo);
    ensureReservationEquipmentCostColumn($pdo);
    ensureReservationPaymentColumns($pdo);

    [$data, $errors] = validateReservationPayload(readJsonPayload(), true, $pdo, $id);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    // Load existing reservation for change detection (status/technicians)
    $existing = fetchReservationById($pdo, $id);

    $pdo->beginTransaction();

    try {
        updateReservation($pdo, $id, $data);

        if (array_key_exists('items', $data)) {
            upsertReservationItems($pdo, $id, $data['items']);
        }

        if (array_key_exists('packages', $data)) {
            upsertReservationPackages($pdo, $id, $data['packages']);
        }

        if (array_key_exists('technicians', $data)) {
            upsertReservationTechnicians($pdo, $id, $data['technicians']);
        }

        if (array_key_exists('payments', $data)) {
            upsertReservationPayments($pdo, $id, $data['payments']);
        }

        $pdo->commit();

        $reservation = fetchReservationById($pdo, $id);

        logActivity($pdo, 'RESERVATION_UPDATE', [
            'reservation_id' => $id,
            'changes' => array_keys($data),
        ]);

        // Notifications for status change and newly assigned technicians
        try {
            require_once __DIR__ . '/../../services/notifications.php';
            if (is_array($reservation)) {
                // Status change
                if ($existing && array_key_exists('status', $data)) {
                    $old = normaliseStatus($existing['status'] ?? 'pending');
                    $new = normaliseStatus($reservation['status'] ?? 'pending');
                    if ($old !== $new) {
                        notifyReservationStatusChanged($pdo, $reservation, $old, $new);
                    }
                }
                // Technician assignment changes
                if (array_key_exists('technicians', $data)) {
                    $oldIds = [];
                    if ($existing && is_array($existing['technicians'] ?? null)) {
                        foreach ($existing['technicians'] as $t) {
                            $oldIds[] = (int)($t['technician_id'] ?? ($t['id'] ?? 0));
                        }
                    }
                    $newIds = [];
                    if (is_array($reservation['technicians'] ?? null)) {
                        foreach ($reservation['technicians'] as $t) {
                            $newIds[] = (int)($t['technician_id'] ?? ($t['id'] ?? 0));
                        }
                    }
                    $added = array_values(array_diff(array_unique($newIds), array_unique($oldIds)));
                    if ($added) {
                        notifyReservationTechnicianAssigned($pdo, $reservation, $added);
                    }
                }
            }
        } catch (Throwable $notifyError) {
            error_log('Reservation update notifications failed: ' . $notifyError->getMessage());
        }

        respond($reservation);
    } catch (Throwable $exception) {
        $pdo->rollBack();
        error_log(sprintf('Reservation update failed (id=%d): %s', $id, $exception->getMessage()));
        respondError('reservations.errors.updateFailed', 500, [
            'details' => $exception->getMessage(),
        ]);
        return;
    }
}

function handleReservationsDelete(PDO $pdo): void
{
    requireRole('admin');
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid reservation id', 400);
        return;
    }

    $pdo->beginTransaction();

    try {
        $statement = $pdo->prepare('DELETE FROM reservation_technicians WHERE reservation_id = :id');
        $statement->execute(['id' => $id]);

        $statement = $pdo->prepare('DELETE FROM reservation_equipment WHERE reservation_id = :id');
        $statement->execute(['id' => $id]);

        $statement = $pdo->prepare('DELETE FROM reservations WHERE id = :id');
        $statement->execute(['id' => $id]);

        if ($statement->rowCount() === 0) {
            $pdo->rollBack();
            respondError('Reservation not found', 404);
            return;
        }

        $pdo->commit();

        logActivity($pdo, 'RESERVATION_DELETE', [
            'reservation_id' => $id,
        ]);

        respond(null);
    } catch (Throwable $exception) {
        $pdo->rollBack();
        throw $exception;
    }
}

function validateReservationPayload(array $payload, bool $isUpdate, PDO $pdo, ?int $reservationId = null): array
{
    $errors = [];

    $customerId = isset($payload['customer_id']) ? (int) $payload['customer_id'] : null;
    $start = isset($payload['start_datetime']) ? trim((string) $payload['start_datetime']) : null;
    $end = isset($payload['end_datetime']) ? trim((string) $payload['end_datetime']) : null;
    $status = isset($payload['status']) ? trim((string) $payload['status']) : null;
    $title = isset($payload['title']) ? trim((string) $payload['title']) : null;
    $location = isset($payload['location']) ? trim((string) $payload['location']) : null;
    $notes = isset($payload['notes']) ? trim((string) $payload['notes']) : null;
    $totalAmount = isset($payload['total_amount']) ? (float) $payload['total_amount'] : 0;
    $hasReservationCodeField = array_key_exists('reservation_code', $payload);
    $reservationCode = null;
    if ($hasReservationCodeField) {
        $rawReservationCode = trim((string) $payload['reservation_code']);

        if ($rawReservationCode !== '') {
            if (mb_strlen($rawReservationCode) > 50) {
                $errors['reservation_code'] = 'Reservation code is too long (max 50 characters)';
            } else {
                $normalizedCode = normalizeReservationCode($rawReservationCode);
                if ($normalizedCode === null) {
                    $errors['reservation_code'] = 'Reservation code is invalid';
                } else {
                    if ($reservationId !== null && reservationCodeExists($pdo, $normalizedCode, $reservationId)) {
                        $errors['reservation_code'] = 'Reservation code already exists';
                    }
                    $reservationCode = $normalizedCode;
                }
            }
        }
    }
    $discount = isset($payload['discount']) ? (float) $payload['discount'] : 0;
    $discountType = isset($payload['discount_type']) ? trim((string) $payload['discount_type']) : null;
    $applyTax = isset($payload['apply_tax']) ? (bool) $payload['apply_tax'] : false;
    $paidAmount = array_key_exists('paid_amount', $payload) ? parseDecimalValue($payload['paid_amount']) : null;
    $paidPercentage = array_key_exists('paid_percentage', $payload) ? parseDecimalValue($payload['paid_percentage']) : null;
    $paymentProgressType = array_key_exists('payment_progress_type', $payload)
        ? trim((string) $payload['payment_progress_type'])
        : null;
    $paymentProgressValue = array_key_exists('payment_progress_value', $payload)
        ? parseDecimalValue($payload['payment_progress_value'])
        : null;
    $rawPaymentHistory = $payload['payment_history'] ?? ($payload['paymentHistory'] ?? null);
    $rawPaymentsAlias = $payload['payments'] ?? null;
    $paidStatus = isset($payload['paid_status']) ? trim((string) $payload['paid_status']) : null;
    $confirmed = isset($payload['confirmed']) ? (bool) $payload['confirmed'] : null;
    $rawProjectId = $payload['project_id'] ?? null;
    $projectId = null;

    if ($rawProjectId !== null && $rawProjectId !== '') {
        $projectId = (int) $rawProjectId;
        if ($projectId <= 0) {
            $projectId = null;
        }
    }

    if (!$isUpdate || array_key_exists('customer_id', $payload)) {
        if (!$customerId) {
            $errors['customer_id'] = 'Customer is required';
        } elseif (!customerExists($pdo, $customerId)) {
            $errors['customer_id'] = 'Customer not found';
        }
    }

    if (!$isUpdate || array_key_exists('start_datetime', $payload)) {
        if (!$start) {
            $errors['start_datetime'] = 'Start date/time is required';
        } elseif (!isValidDateTime($start)) {
            $errors['start_datetime'] = 'Start date/time is invalid';
        }
    }

    if (!$isUpdate || array_key_exists('end_datetime', $payload)) {
        if (!$end) {
            $errors['end_datetime'] = 'End date/time is required';
        } elseif (!isValidDateTime($end)) {
            $errors['end_datetime'] = 'End date/time is invalid';
        }
    }

    if (!$isUpdate || (array_key_exists('start_datetime', $payload) || array_key_exists('end_datetime', $payload))) {
        if ($start && $end && strtotime($start) >= strtotime($end)) {
            $errors['date_range'] = 'End date/time must be after start date/time';
        }
    }

    if ($status !== null && $status !== '') {
        $normalizedStatus = normaliseStatus($status);
        if (!$normalizedStatus) {
            $errors['status'] = 'Status is invalid';
        }
    }

    if ($location !== null && mb_strlen($location) > 255) {
        $errors['location'] = 'Location is too long (max 255 characters)';
    }

    if ($title !== null && mb_strlen($title) > 200) {
        $errors['title'] = 'Title is too long (max 200 characters)';
    }

    if ($discount < 0) {
        $errors['discount'] = 'Discount must be zero or greater';
    }

    if ($discountType !== null && !in_array($discountType, ['percent', 'amount'], true)) {
        $errors['discount_type'] = 'Discount type must be percent or amount';
    }

    if ($paidAmount !== null && $paidAmount < 0) {
        $errors['paid_amount'] = 'Paid amount must be zero or greater';
    }

    if ($paidPercentage !== null && ($paidPercentage < 0 || $paidPercentage > 100)) {
        $errors['paid_percentage'] = 'Paid percentage must be between 0 and 100';
    }

    $normalizedProgressType = null;
    if ($paymentProgressType !== null && $paymentProgressType !== '') {
        $candidateType = strtolower($paymentProgressType);
        if (!in_array($candidateType, ['amount', 'percent'], true)) {
            $errors['payment_progress_type'] = 'Payment progress type must be amount or percent';
        } else {
            $normalizedProgressType = $candidateType;
        }
    }

    if ($paymentProgressValue !== null && $paymentProgressValue < 0) {
        $errors['payment_progress_value'] = 'Payment progress value must be zero or greater';
    }

    if ($normalizedProgressType === 'percent' && $paymentProgressValue !== null && $paymentProgressValue > 100) {
        $errors['payment_progress_value'] = 'Payment progress percentage cannot exceed 100';
    }

    if ($paidStatus !== null) {
        $normalizedPaid = normalisePaidStatus($paidStatus);
        if ($normalizedPaid === null) {
            $errors['paid_status'] = 'Paid status is invalid';
        }
    }

    if ($projectId !== null && !projectExists($pdo, $projectId)) {
        $errors['project_id'] = 'Project not found';
    }

    $normalizedPayments = null;
    $paymentSource = $rawPaymentHistory !== null ? $rawPaymentHistory : $rawPaymentsAlias;
    if ($paymentSource !== null) {
        $normalizedPayments = normalisePaymentHistoryPayload($paymentSource, $errors);
    }

    if ($normalizedPayments === null && !$isUpdate) {
        $normalizedPayments = [];
    }

    $items = array_key_exists('items', $payload) ? $payload['items'] : null;
    $packages = array_key_exists('packages', $payload) ? $payload['packages'] : null;
    if ($items !== null) {
        if (!is_array($items)) {
            $errors['items'] = 'Items must be an array';
        } else {
            foreach ($items as $index => $item) {
                if (!is_array($item)) {
                    $errors["items.$index"] = 'Item must be an object';
                    continue;
                }

                $equipmentId = isset($item['equipment_id']) ? (int) $item['equipment_id'] : null;
                $quantity = isset($item['quantity']) ? (int) $item['quantity'] : 1;
                $unitPrice = isset($item['unit_price']) ? (float) $item['unit_price'] : 0;

                if (!$equipmentId) {
                    $errors["items.$index.equipment_id"] = 'Equipment id is required';
                    continue;
                }

                $equipmentRecord = fetchEquipmentBasicInfo($pdo, $equipmentId);
                if (!$equipmentRecord) {
                    $errors["items.$index.equipment_id"] = 'Equipment not found';
                    continue;
                }

                if (isEquipmentMarkedMaintenance($equipmentRecord)) {
                    $errors["items.$index.equipment_id"] = 'Equipment is in maintenance and cannot be reserved';
                    continue;
                }

                if ($quantity < 1) {
                    $errors["items.$index.quantity"] = 'Quantity must be at least 1';
                }

                if ($unitPrice < 0) {
                    $errors["items.$index.unit_price"] = 'Unit price must be zero or greater';
                }

                $unitCost = isset($item['unit_cost'])
                    ? (float) $item['unit_cost']
                    : (isset($item['cost']) ? (float) $item['cost'] : null);
                if ($unitCost !== null && $unitCost < 0) {
                    $errors["items.$index.unit_cost"] = 'Unit cost must be zero or greater';
                }
            }
        }
    }

    if ($packages !== null) {
        if (!is_array($packages)) {
            $errors['packages'] = 'Packages must be an array';
        } else {
            foreach ($packages as $index => $package) {
                if (!is_array($package)) {
                    $errors["packages.$index"] = 'Package entry must be an object';
                    continue;
                }
                $qty = isset($package['quantity']) ? (int) $package['quantity'] : 1;
                $unitPrice = isset($package['unit_price']) ? (float) $package['unit_price'] : 0;
                $unitCost = isset($package['unit_cost'])
                    ? (float) $package['unit_cost']
                    : (isset($package['cost']) ? (float) $package['cost'] : 0);

                if ($qty < 1) {
                    $errors["packages.$index.quantity"] = 'Quantity must be at least 1';
                }

                if ($unitPrice < 0) {
                    $errors["packages.$index.unit_price"] = 'Unit price must be zero or greater';
                }

                if ($unitCost < 0) {
                    $errors["packages.$index.unit_cost"] = 'Unit cost must be zero or greater';
                }

                if (isset($package['package_code']) && mb_strlen((string) $package['package_code']) > 100) {
                    $errors["packages.$index.package_code"] = 'Package code is too long (max 100 characters)';
                }
            }
        }
    }

    $technicians = array_key_exists('technicians', $payload) ? $payload['technicians'] : null;
    if ($technicians !== null) {
        if (!is_array($technicians)) {
            $errors['technicians'] = 'Technicians must be an array';
        } else {
            foreach ($technicians as $index => $technicianId) {
                $techId = (int) $technicianId;
                if (!$techId) {
                    $errors["technicians.$index"] = 'Technician id is required';
                    continue;
                }
                if (!technicianExists($pdo, $techId)) {
                    $errors["technicians.$index"] = 'Technician not found';
                }
            }
        }
    }

    $data = [];

    if ($errors) {
        return [$data, $errors];
    }

    if (!$isUpdate || array_key_exists('customer_id', $payload)) {
        $data['customer_id'] = $customerId;
    }

    if (!$isUpdate || array_key_exists('start_datetime', $payload)) {
        $data['start_datetime'] = $start;
    }

    if (!$isUpdate || array_key_exists('end_datetime', $payload)) {
        $data['end_datetime'] = $end;
    }

    if (!$isUpdate || array_key_exists('status', $payload)) {
        $data['status'] = normaliseStatus($status ?? 'pending');
    }

    if (!$isUpdate || array_key_exists('title', $payload)) {
        $data['title'] = $title;
    }

    if (!$isUpdate || array_key_exists('location', $payload)) {
        $data['location'] = $location;
    }

    if (!$isUpdate || array_key_exists('notes', $payload)) {
        $data['notes'] = $notes;
    }

    if (!$isUpdate || array_key_exists('total_amount', $payload)) {
        $data['total_amount'] = $totalAmount;
    }

    if (!$isUpdate || array_key_exists('project_id', $payload)) {
        $data['project_id'] = $projectId;
    }

    if (!$isUpdate || $hasReservationCodeField) {
        $data['reservation_code'] = $reservationCode;
    }

    if (!$isUpdate || array_key_exists('discount', $payload)) {
        $data['discount'] = $discount;
    }

    if (!$isUpdate || array_key_exists('discount_type', $payload)) {
        $data['discount_type'] = $discountType ?? 'percent';
    }

    if (!$isUpdate || array_key_exists('apply_tax', $payload)) {
        $data['apply_tax'] = $applyTax ? 1 : 0;
    }

    if (!$isUpdate || array_key_exists('paid_status', $payload)) {
        $data['paid_status'] = normalisePaidStatus($paidStatus ?? 'unpaid') ?? 'unpaid';
    }

    if (!$isUpdate || array_key_exists('paid_amount', $payload)) {
        $data['paid_amount'] = $paidAmount !== null ? round($paidAmount, 2) : 0;
    }

    if (!$isUpdate || array_key_exists('paid_percentage', $payload)) {
        $data['paid_percentage'] = $paidPercentage !== null ? round($paidPercentage, 2) : 0;
    }

    if (!$isUpdate || array_key_exists('payment_progress_type', $payload)) {
        $data['payment_progress_type'] = $normalizedProgressType;
    }

    if (!$isUpdate || array_key_exists('payment_progress_value', $payload)) {
        $data['payment_progress_value'] = $paymentProgressValue !== null ? round($paymentProgressValue, 2) : null;
    }

    if (!$isUpdate || array_key_exists('confirmed', $payload)) {
        $data['confirmed'] = $confirmed === null ? null : ($confirmed ? 1 : 0);
    }

    if (!$isUpdate || array_key_exists('items', $payload)) {
        $data['items'] = $items ?? [];
    }

    if (!$isUpdate || array_key_exists('packages', $payload)) {
        $data['packages'] = $packages ?? [];
    }

    if (!$isUpdate || array_key_exists('technicians', $payload)) {
        $data['technicians'] = $technicians ?? [];
    }

    if (!$isUpdate || array_key_exists('payment_history', $payload) || array_key_exists('paymentHistory', $payload) || array_key_exists('payments', $payload)) {
        $data['payments'] = $normalizedPayments ?? [];
    }

    return [$data, $errors];
}

function readJsonPayload(): array
{
    $raw = file_get_contents('php://input');

    if ($raw === false) {
        throw new RuntimeException('Unable to read request body');
    }

    $raw = trim($raw);

    if ($raw === '') {
        return [];
    }

    $data = json_decode($raw, true);

    if (!is_array($data)) {
        throw new InvalidArgumentException('Invalid JSON payload');
    }

    return $data;
}

function normalisePaymentHistoryPayload(mixed $payload, array &$errors): array
{
    if ($payload === null) {
        return [];
    }

    if (!is_array($payload)) {
        $errors['payment_history'] = 'Payment history must be an array';
        return [];
    }

    $normalized = [];

    foreach ($payload as $index => $entry) {
        if (!is_array($entry)) {
            $errors[sprintf('payment_history.%d', $index)] = 'Payment entry must be an object';
            continue;
        }

        $typeRaw = $entry['type'] ?? $entry['payment_type'] ?? null;
        $type = $typeRaw !== null ? strtolower(trim((string) $typeRaw)) : null;

        if (!in_array($type, ['amount', 'percent'], true)) {
            $errors[sprintf('payment_history.%d.type', $index)] = 'Payment type must be amount or percent';
            continue;
        }

        $value = parseDecimalValue($entry['value'] ?? null);
        $amount = parseDecimalValue($entry['amount'] ?? null);
        $percentage = parseDecimalValue($entry['percentage'] ?? null);

        if ($type === 'amount' && $amount === null && $value !== null) {
            $amount = $value;
        }

        if ($type === 'percent' && $percentage === null && $value !== null) {
            $percentage = $value;
        }

        if ($amount !== null && $amount < 0) {
            $errors[sprintf('payment_history.%d.amount', $index)] = 'Payment amount must be zero or greater';
            continue;
        }

        if ($percentage !== null && ($percentage < 0 || $percentage > 100)) {
            $errors[sprintf('payment_history.%d.percentage', $index)] = 'Payment percentage must be between 0 and 100';
            continue;
        }

        if ($amount === null && $percentage === null && $value === null) {
            $errors[sprintf('payment_history.%d.value', $index)] = 'Payment entry requires amount or percentage';
            continue;
        }

        $noteRaw = isset($entry['note']) ? trim((string) $entry['note']) : null;
        if ($noteRaw !== null && $noteRaw !== '' && mb_strlen($noteRaw) > 500) {
            $errors[sprintf('payment_history.%d.note', $index)] = 'Payment note must be 500 characters or less';
            continue;
        }
        $note = $noteRaw === '' ? null : $noteRaw;

        $recordedAtRaw = $entry['recorded_at'] ?? $entry['recordedAt'] ?? null;
        if ($recordedAtRaw) {
            $timestamp = strtotime((string) $recordedAtRaw);
            if ($timestamp === false) {
                $errors[sprintf('payment_history.%d.recorded_at', $index)] = 'Payment recorded_at must be a valid date/time';
                continue;
            }
            $recordedAt = date('Y-m-d H:i:s', $timestamp);
        } else {
            $recordedAt = date('Y-m-d H:i:s');
        }

        $valueForStorage = $value;
        if ($valueForStorage === null) {
            $valueForStorage = $type === 'amount' ? $amount : ($type === 'percent' ? $percentage : null);
        }

        $normalized[] = [
            'payment_type' => $type,
            'value' => $valueForStorage,
            'amount' => $amount,
            'percentage' => $percentage,
            'note' => $note,
            'recorded_at' => $recordedAt,
        ];
    }

    return $normalized;
}

function parseDecimalValue(mixed $value): ?float
{
    if ($value === null || $value === '') {
        return null;
    }

    if (is_numeric($value)) {
        return round((float) $value, 2);
    }

    $stringValue = normalizeLocalizedDigits((string) $value);
    $stringValue = str_replace(',', '.', $stringValue);
    $stringValue = preg_replace('/[^0-9\-\.]/u', '', $stringValue);

    if ($stringValue === '' || !is_numeric($stringValue)) {
        return null;
    }

    return round((float) $stringValue, 2);
}

function normalizeLocalizedDigits(string $value): string
{
    $map = [
        '٠' => '0',
        '١' => '1',
        '٢' => '2',
        '٣' => '3',
        '٤' => '4',
        '٥' => '5',
        '٦' => '6',
        '٧' => '7',
        '٨' => '8',
        '٩' => '9',
        '۰' => '0',
        '۱' => '1',
        '۲' => '2',
        '۳' => '3',
        '۴' => '4',
        '۵' => '5',
        '۶' => '6',
        '۷' => '7',
        '۸' => '8',
        '۹' => '9',
    ];

    return strtr($value, $map);
}

function normalizeReservationCode(?string $code): ?string
{
    if (!$code) {
        return null;
    }

    if (!preg_match('/^RSV-(\d+)$/i', $code, $matches)) {
        return null;
    }

    $sequence = (int) $matches[1];
    if ($sequence <= 0) {
        return null;
    }

    return sprintf('RSV-%04d', $sequence);
}

function reservationCodeExists(PDO $pdo, string $code, ?int $ignoreId = null): bool
{
    $sql = 'SELECT 1 FROM reservations WHERE reservation_code = :code';
    $params = ['code' => $code];

    if ($ignoreId !== null) {
        $sql .= ' AND id <> :ignore_id';
        $params['ignore_id'] = $ignoreId;
    }

    $sql .= ' LIMIT 1';

    $statement = $pdo->prepare($sql);
    $statement->execute($params);
    return (bool) $statement->fetchColumn();
}

function generateReservationCode(PDO $pdo): string
{
    $statement = $pdo->query(
        "SELECT reservation_code FROM reservations WHERE reservation_code REGEXP '^RSV-[0-9]+$' ORDER BY CAST(SUBSTRING(reservation_code, 5) AS UNSIGNED) DESC LIMIT 1"
    );

    $lastCode = $statement ? $statement->fetchColumn() : null;
    $nextSequence = 1;

    if ($lastCode && preg_match('/^RSV-(\d+)$/', $lastCode, $matches)) {
        $nextSequence = ((int) $matches[1]) + 1;
    }

    // Ensure uniqueness in case of concurrent inserts
    do {
        $candidate = sprintf('RSV-%04d', $nextSequence);
        $nextSequence++;
    } while (reservationCodeExists($pdo, $candidate));

    return $candidate;
}

function insertReservation(PDO $pdo, array $data): int
{
    $reservationCode = normalizeReservationCode($data['reservation_code'] ?? null);
    if (!$reservationCode) {
        $reservationCode = generateReservationCode($pdo);
    } elseif (reservationCodeExists($pdo, $reservationCode)) {
        $reservationCode = generateReservationCode($pdo);
    }

    $sql = 'INSERT INTO reservations (
        reservation_code,
        customer_id,
        title,
        start_datetime,
        end_datetime,
        status,
        location,
        notes,
        total_amount,
        project_id,
        discount,
        discount_type,
        apply_tax,
        paid_status,
        paid_amount,
        paid_percentage,
        payment_progress_type,
        payment_progress_value,
        confirmed
    ) VALUES (
        :reservation_code,
        :customer_id,
        :title,
        :start_datetime,
        :end_datetime,
        :status,
        :location,
        :notes,
        :total_amount,
        :project_id,
        :discount,
        :discount_type,
        :apply_tax,
        :paid_status,
        :paid_amount,
        :paid_percentage,
        :payment_progress_type,
        :payment_progress_value,
        :confirmed
    )';

    $statement = $pdo->prepare($sql);
    $statement->execute([
        'reservation_code' => $reservationCode,
        'customer_id' => $data['customer_id'],
        'title' => $data['title'] ?? null,
        'start_datetime' => $data['start_datetime'],
        'end_datetime' => $data['end_datetime'],
        'status' => $data['status'] ?? 'pending',
        'location' => $data['location'] ?? null,
        'notes' => $data['notes'] ?? null,
        'total_amount' => $data['total_amount'] ?? 0,
        'project_id' => $data['project_id'] ?? null,
        'discount' => $data['discount'] ?? 0,
        'discount_type' => $data['discount_type'] ?? 'percent',
        'apply_tax' => !empty($data['apply_tax']) ? 1 : 0,
        'paid_status' => normalisePaidStatus($data['paid_status'] ?? 'unpaid') ?? 'unpaid',
        'paid_amount' => isset($data['paid_amount']) ? (float) $data['paid_amount'] : 0,
        'paid_percentage' => isset($data['paid_percentage']) ? (float) $data['paid_percentage'] : 0,
        'payment_progress_type' => $data['payment_progress_type'] ?? null,
        'payment_progress_value' => $data['payment_progress_value'] ?? null,
        'confirmed' => isset($data['confirmed']) ? (int) !empty($data['confirmed']) : 0,
    ]);

    return (int) $pdo->lastInsertId();
}

function updateReservation(PDO $pdo, int $id, array $data): void
{
    if (!$data) {
        return;
    }

    $fields = [];
    $params = ['id' => $id];

    foreach ($data as $column => $value) {
        if (in_array($column, ['items', 'packages', 'technicians', 'payments'], true)) {
            continue;
        }
        $fields[] = sprintf('%s = :%s', $column, $column);
        $params[$column] = $value;
    }

    if (!$fields) {
        return;
    }

    $sql = 'UPDATE reservations SET ' . implode(', ', $fields) . ' WHERE id = :id';
    $statement = $pdo->prepare($sql);
    $statement->execute($params);

    if ($statement->rowCount() === 0) {
        if (!fetchReservationById($pdo, $id)) {
            respondError('Reservation not found', 404);
        }
    }
}

function upsertReservationItems(PDO $pdo, int $reservationId, array $items): void
{
    ensureReservationEquipmentCostColumn($pdo);
    $hasUnitCostColumn = true; // assume present; fallback handled below

    $pdo->prepare('DELETE FROM reservation_equipment WHERE reservation_id = :id')->execute(['id' => $reservationId]);

    if (!$items) {
        return;
    }

    $sqlWithCost = 'INSERT INTO reservation_equipment (
        reservation_id,
        equipment_id,
        quantity,
        unit_price,
        unit_cost,
        notes
    ) VALUES (
        :reservation_id,
        :equipment_id,
        :quantity,
        :unit_price,
        :unit_cost,
        :notes
    )';
    $sqlWithoutCost = 'INSERT INTO reservation_equipment (
        reservation_id,
        equipment_id,
        quantity,
        unit_price,
        notes
    ) VALUES (
        :reservation_id,
        :equipment_id,
        :quantity,
        :unit_price,
        :notes
    )';

    try {
        $statement = $pdo->prepare($sqlWithCost);
    } catch (PDOException $_) {
        // Fallback for legacy tables: retry without unit_cost
        $hasUnitCostColumn = false;
        $statement = $pdo->prepare($sqlWithoutCost);
    }

    foreach ($items as $item) {
        $unitCost = isset($item['unit_cost'])
            ? (float) $item['unit_cost']
            : (isset($item['cost']) ? (float) $item['cost'] : 0);

        $params = [
            'reservation_id' => $reservationId,
            'equipment_id' => (int) $item['equipment_id'],
            'quantity' => isset($item['quantity']) ? (int) $item['quantity'] : 1,
            'unit_price' => isset($item['unit_price']) ? (float) $item['unit_price'] : 0,
            'notes' => $item['notes'] ?? null,
        ];

        if ($hasUnitCostColumn) {
            $params['unit_cost'] = $unitCost;
        }

        try {
            $statement->execute($params);
        } catch (PDOException $error) {
            // If unit_cost is unknown, retry without it after ensuring the column
            $message = strtolower($error->getMessage());
            if ($hasUnitCostColumn && (str_contains($message, 'unit_cost') || str_contains($message, 'unknown column'))) {
                $hasUnitCostColumn = false;
                ensureReservationEquipmentCostColumn($pdo);
                $statement = $pdo->prepare($sqlWithoutCost);
                unset($params['unit_cost']);
                $statement->execute($params);
                continue;
            }
            throw $error;
        }
    }
}

function upsertReservationPackages(PDO $pdo, int $reservationId, array $packages): void
{
    ensureReservationPackagesTable($pdo);

    $existingCostByKey = [];
    try {
        $existingPackages = fetchReservationPackages($pdo, $reservationId);
        foreach ($existingPackages as $existingPackage) {
            if (!is_array($existingPackage)) {
                continue;
            }
            $key = normalizeReservationPackageKey($existingPackage);
            if (!$key) {
                continue;
            }
            $existingCost = isset($existingPackage['unit_cost']) ? (float) $existingPackage['unit_cost'] : 0.0;
            if ($existingCost <= 0) {
                continue;
            }
            if (!isset($existingCostByKey[$key]) || $existingCostByKey[$key] < $existingCost) {
                $existingCostByKey[$key] = $existingCost;
            }
        }
    } catch (Throwable $error) {
        error_log('⚠️ Failed to fetch existing reservation packages before update: ' . $error->getMessage());
    }

    $pdo->prepare('DELETE FROM reservation_packages WHERE reservation_id = :id')->execute(['id' => $reservationId]);

    if (!$packages) {
        return;
    }

    $normalizedPackages = [];

    foreach ($packages as $package) {
        if (!is_array($package)) {
            continue;
        }

        $key = normalizeReservationPackageKey($package);
        if (!$key) {
            continue;
        }

        $packageId = null;
        foreach (['package_id', 'packageId', 'id'] as $idField) {
            if (!isset($package[$idField])) {
                continue;
            }
            $candidate = $package[$idField];
            if (is_numeric($candidate)) {
                $packageId = (int) $candidate;
                if ($packageId <= 0) {
                    $packageId = null;
                }
                if ($packageId !== null) {
                    break;
                }
            }
        }

        $packageCode = null;
        foreach (['package_code', 'code', 'packageId', 'package_id', 'id'] as $codeField) {
            if (!empty($package[$codeField])) {
                $packageCode = (string) $package[$codeField];
                break;
            }
        }

        $rawName = '';
        foreach (['package_name', 'packageName', 'name', 'title', 'desc', 'description'] as $nameField) {
            if (!empty($package[$nameField])) {
                $rawName = trim((string) $package[$nameField]);
                if ($rawName !== '') {
                    break;
                }
            }
        }
        $packageName = $rawName !== '' ? mb_substr($rawName, 0, 255) : null;

        $quantity = isset($package['quantity'])
            ? (int) $package['quantity']
            : (isset($package['qty']) ? (int) $package['qty'] : 1);
        if ($quantity < 1) {
            $quantity = 1;
        }

        $unitPrice = 0.0;
        if (isset($package['unit_price']) && is_numeric($package['unit_price'])) {
            $unitPrice = (float) $package['unit_price'];
        } elseif (isset($package['price']) && is_numeric($package['price'])) {
            $unitPrice = (float) $package['price'];
        }
        if ($unitPrice < 0) {
            $unitPrice = 0.0;
        }

        $unitCost = null;
        if (array_key_exists('unit_cost', $package) && is_numeric($package['unit_cost'])) {
            $unitCost = (float) $package['unit_cost'];
        } elseif (array_key_exists('package_cost', $package) && is_numeric($package['package_cost'])) {
            $unitCost = (float) $package['package_cost'];
        } elseif (array_key_exists('packageCost', $package) && is_numeric($package['packageCost'])) {
            $unitCost = (float) $package['packageCost'];
        } elseif (array_key_exists('cost', $package) && is_numeric($package['cost'])) {
            $unitCost = (float) $package['cost'];
        }
        if ($unitCost === null && isset($existingCostByKey[$key])) {
            $unitCost = $existingCostByKey[$key];
        }
        if ($unitCost === null || $unitCost < 0) {
            $unitCost = 0.0;
        }

        $itemsJson = null;
        if (isset($package['items']) && is_array($package['items']) && count($package['items'])) {
            $itemsJson = json_encode($package['items'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }

        $packageMetadata = null;
        if (array_key_exists('package_metadata', $package)) {
            $metaValue = $package['package_metadata'];
            if (is_string($metaValue)) {
                $metaValue = trim($metaValue);
                $packageMetadata = $metaValue !== '' ? $metaValue : null;
            } elseif (is_array($metaValue)) {
                $packageMetadata = json_encode($metaValue, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            }
        } else {
            $meta = [];
            if ($packageName !== null && $packageName !== '') {
                $meta['name'] = $packageName;
            }
            if ($packageCode !== null && $packageCode !== '') {
                $meta['code'] = $packageCode;
            }
            if ($packageId !== null) {
                $meta['id'] = $packageId;
            }
            if ($meta) {
                $packageMetadata = json_encode($meta, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            }
        }

        if (!isset($normalizedPackages[$key])) {
            $normalizedPackages[$key] = [
                'reservation_id' => $reservationId,
                'package_id'     => $packageId,
                'package_code'   => $packageCode,
                'package_name'   => $packageName,
                'name'           => $packageName,
                'quantity'       => $quantity,
                'unit_price'     => $unitPrice,
                'unit_cost'      => $unitCost,
                'items_json'     => $itemsJson,
                'package_metadata' => $packageMetadata,
            ];
            continue;
        }

        $existing = $normalizedPackages[$key];
        $existing['quantity'] = $quantity;
        // Always trust the latest incoming cost even if it is lower than the previous value.
        $existing['unit_cost'] = $unitCost;
        if ($unitPrice >= 0) {
            $existing['unit_price'] = $unitPrice;
        }
        if ($packageId !== null) {
            $existing['package_id'] = $packageId;
        }
        if ($packageCode !== null) {
            $existing['package_code'] = $packageCode;
        }
        if ($packageName !== null && $packageName !== '') {
            $existing['package_name'] = $packageName;
            $existing['name'] = $packageName;
        }
        if ($itemsJson !== null) {
            $existing['items_json'] = $itemsJson;
        }
        if ($packageMetadata !== null) {
            $existing['package_metadata'] = $packageMetadata;
        }
        $normalizedPackages[$key] = $existing;
    }

    if (!$normalizedPackages) {
        return;
    }

    $statement = $pdo->prepare(
        'INSERT INTO reservation_packages (reservation_id, package_id, package_code, package_name, name, quantity, unit_price, unit_cost, items_json, package_metadata)
         VALUES (:reservation_id, :package_id, :package_code, :package_name, :name, :quantity, :unit_price, :unit_cost, :items_json, :package_metadata)'
    );

    foreach ($normalizedPackages as $params) {
        try {
            $statement->execute($params);
        } catch (PDOException $error) {
            $message = strtolower($error->getMessage());
            if (str_contains($message, 'unit_cost') || str_contains($message, 'items_json') || str_contains($message, 'unknown column')) {
                ensureReservationPackagesTable($pdo);
                $statement = $pdo->prepare(
                    'INSERT INTO reservation_packages (reservation_id, package_id, package_code, package_name, name, quantity, unit_price, unit_cost, items_json, package_metadata)
                     VALUES (:reservation_id, :package_id, :package_code, :package_name, :name, :quantity, :unit_price, :unit_cost, :items_json, :package_metadata)'
                );
                $statement->execute($params);
                continue;
            }
            throw $error;
        }
    }
}

function normalizeReservationPackageKey(array $package): ?string
{
    if (!empty($package['package_code'])) {
        return 'code:' . strtolower((string) $package['package_code']);
    }
    if (!empty($package['package_id'])) {
        return 'id:' . (string) $package['package_id'];
    }
    if (!empty($package['packageId'])) {
        return 'id:' . (string) $package['packageId'];
    }
    if (!empty($package['id'])) {
        return 'id:' . (string) $package['id'];
    }
    return null;
}

function upsertReservationTechnicians(PDO $pdo, int $reservationId, array $technicians): void
{
    $pdo->prepare('DELETE FROM reservation_technicians WHERE reservation_id = :id')->execute(['id' => $reservationId]);

    if (!$technicians) {
        return;
    }

    $sql = 'INSERT INTO reservation_technicians (
        reservation_id,
        technician_id,
        role,
        notes,
        position_id,
        position_key,
        position_name,
        position_label_ar,
        position_label_en,
        position_cost,
        position_client_price,
        assignment_id
    ) VALUES (
        :reservation_id,
        :technician_id,
        :role,
        :notes,
        :position_id,
        :position_key,
        :position_name,
        :position_label_ar,
        :position_label_en,
        :position_cost,
        :position_client_price,
        :assignment_id
    )';

    $statement = $pdo->prepare($sql);

    foreach ($technicians as $technician) {
        if (is_array($technician)) {
            $technicianId = (int) ($technician['id'] ?? $technician['technician_id'] ?? 0);
            $role = $technician['role'] ?? null;
            $notes = $technician['notes'] ?? null;

            $positionId = isset($technician['position_id']) ? (int) $technician['position_id']
                : (isset($technician['positionId']) ? (int) $technician['positionId'] : null);
            $positionKey = $technician['position_key'] ?? ($technician['positionKey'] ?? ($technician['position_code'] ?? null));
            $positionName = $technician['position_name'] ?? ($technician['positionName'] ?? ($technician['position_label'] ?? null));
            $positionLabelAr = $technician['position_label_ar'] ?? ($technician['positionLabelAr'] ?? null);
            $positionLabelEn = $technician['position_label_en'] ?? ($technician['positionLabelEn'] ?? null);

            // pricing fallbacks
            $positionCost = $technician['position_cost']
                ?? $technician['positionCost']
                ?? $technician['cost']
                ?? $technician['daily_wage']
                ?? $technician['dailyWage']
                ?? 0;
            $positionClientPrice = $technician['position_client_price']
                ?? $technician['positionClientPrice']
                ?? $technician['client_price']
                ?? $technician['customer_price']
                ?? $technician['position_price']
                ?? $technician['daily_total']
                ?? $technician['dailyTotal']
                ?? $technician['total']
                ?? 0;

            $assignmentId = $technician['assignment_id'] ?? ($technician['assignmentId'] ?? null);
        } else {
            $technicianId = (int) $technician;
            $role = null;
            $notes = null;
            $positionId = null;
            $positionKey = null;
            $positionName = null;
            $positionLabelAr = null;
            $positionLabelEn = null;
            $positionCost = 0;
            $positionClientPrice = 0;
            $assignmentId = null;
        }

        $statement->execute([
            'reservation_id' => $reservationId,
            'technician_id' => $technicianId,
            'role' => $role,
            'notes' => $notes,
            'position_id' => $positionId,
            'position_key' => $positionKey,
            'position_name' => $positionName,
            'position_label_ar' => $positionLabelAr,
            'position_label_en' => $positionLabelEn,
            'position_cost' => (float) $positionCost,
            'position_client_price' => (float) $positionClientPrice,
            'assignment_id' => $assignmentId,
        ]);
    }
}

function upsertReservationPayments(PDO $pdo, int $reservationId, array $payments): void
{
    $pdo->prepare('DELETE FROM reservation_payments WHERE reservation_id = :id')->execute(['id' => $reservationId]);

    if (!$payments) {
        return;
    }

    $sql = 'INSERT INTO reservation_payments (
        reservation_id,
        payment_type,
        value,
        amount,
        percentage,
        note,
        recorded_at
    ) VALUES (
        :reservation_id,
        :payment_type,
        :value,
        :amount,
        :percentage,
        :note,
        :recorded_at
    )';

    $statement = $pdo->prepare($sql);

    foreach ($payments as $payment) {
        $statement->execute([
            'reservation_id' => $reservationId,
            'payment_type' => $payment['payment_type'] ?? $payment['type'],
            'value' => $payment['value'],
            'amount' => $payment['amount'],
            'percentage' => $payment['percentage'],
            'note' => $payment['note'] ?? null,
            'recorded_at' => $payment['recorded_at'] ?? null,
        ]);
    }
}

function fetchReservationById(PDO $pdo, int $id): array|false
{
    $statement = $pdo->prepare(
        'SELECT r.*, c.full_name AS customer_name
         FROM reservations r
         INNER JOIN customers c ON c.id = r.customer_id
         WHERE r.id = :id
         LIMIT 1'
    );
    $statement->execute(['id' => $id]);
    $reservation = $statement->fetch();

    if (!$reservation) {
        return false;
    }

    return decorateReservation($pdo, $reservation);
}

function decorateReservation(PDO $pdo, array $reservation): array
{
    $reservation['status'] = normaliseStatus($reservation['status'] ?? 'pending');
    $reservation['discount'] = isset($reservation['discount']) ? (float) $reservation['discount'] : 0;
    $reservation['discount_type'] = $reservation['discount_type'] ?? 'percent';
    $reservation['apply_tax'] = !empty($reservation['apply_tax']);
    $reservation['paid_status'] = normalisePaidStatus($reservation['paid_status'] ?? 'unpaid') ?? 'unpaid';
    $reservation['confirmed'] = isset($reservation['confirmed'])
        ? (bool) $reservation['confirmed']
        : ($reservation['status'] === 'confirmed' || $reservation['status'] === 'in_progress' || $reservation['status'] === 'completed');
    $reservation['total_amount'] = isset($reservation['total_amount']) ? (float) $reservation['total_amount'] : 0;
    $reservation['paid_amount'] = isset($reservation['paid_amount']) ? (float) $reservation['paid_amount'] : 0;
    $reservation['paid_percentage'] = isset($reservation['paid_percentage']) ? (float) $reservation['paid_percentage'] : 0;
    $reservation['payment_progress_type'] = $reservation['payment_progress_type'] ?? null;
    $reservation['payment_progress_value'] = isset($reservation['payment_progress_value'])
        ? (float) $reservation['payment_progress_value']
        : null;

    $reservation['items'] = fetchReservationItems($pdo, (int) $reservation['id']);
    try {
        $reservation['packages'] = fetchReservationPackages($pdo, (int) $reservation['id']);
    } catch (Throwable $error) {
        error_log('Failed to fetch reservation packages: ' . $error->getMessage());
        $reservation['packages'] = [];
    }
    $reservation['technicians'] = fetchReservationTechnicians($pdo, (int) $reservation['id']);
    // Provide rich crew arrays so frontend prefers assigned position data in details view
    $reservation['crewAssignments'] = $reservation['technicians'];
    $reservation['techniciansDetails'] = $reservation['technicians'];
    $payments = fetchReservationPayments($pdo, (int) $reservation['id']);
    $reservation['payment_history'] = $payments;
    $reservation['paymentHistory'] = $payments;

    return $reservation;
}

function fetchReservationItems(PDO $pdo, int $reservationId): array
{
    ensureReservationEquipmentCostColumn($pdo);
    $statement = null;
    $fallback = false;

    $sqlWithCost = 'SELECT 
         re.id,
         re.equipment_id,
         re.quantity,
         re.unit_price,
         COALESCE(re.unit_cost, 0) AS unit_cost,
         re.notes,
         e.description,
         e.name,
         e.barcode,
         e.image_url
     FROM reservation_equipment re
     INNER JOIN equipment e ON e.id = re.equipment_id
     WHERE re.reservation_id = :id';

    $sqlWithoutCost = 'SELECT 
         re.id,
         re.equipment_id,
         re.quantity,
         re.unit_price,
         0 AS unit_cost,
         re.notes,
         e.description,
         e.name,
         e.barcode,
         e.image_url
     FROM reservation_equipment re
     INNER JOIN equipment e ON e.id = re.equipment_id
     WHERE re.reservation_id = :id';

    try {
        $statement = $pdo->prepare($sqlWithCost);
    } catch (PDOException $_) {
        $fallback = true;
        $statement = $pdo->prepare($sqlWithoutCost);
    }

    try {
        $statement->execute(['id' => $reservationId]);
    } catch (PDOException $error) {
        $message = strtolower($error->getMessage());
        if (!$fallback && (str_contains($message, 'unit_cost') || str_contains($message, 'unknown column'))) {
            $fallback = true;
            $statement = $pdo->prepare($sqlWithoutCost);
            $statement->execute(['id' => $reservationId]);
        } else {
            throw $error;
        }
    }

    $items = [];
    while ($row = $statement->fetch()) {
        $unitCost = isset($row['unit_cost']) ? (float) $row['unit_cost'] : 0;
        $items[] = [
            'id' => (int) $row['id'],
            'equipment_id' => (int) $row['equipment_id'],
            'quantity' => (int) $row['quantity'],
            'unit_price' => (float) $row['unit_price'],
            'unit_cost' => $unitCost,
            'notes' => $row['notes'] ?? null,
            'description' => $row['description'] ?? $row['name'] ?? '',
            'barcode' => $row['barcode'] ?? '',
            'image_url' => $row['image_url'] ?? null,
        ];
    }
    return $items;
}

function fetchReservationPackages(PDO $pdo, int $reservationId): array
{
    ensureReservationPackagesTable($pdo);

    $sqlWithCost = 'SELECT id, package_id, package_code, package_name, name, quantity, unit_price, unit_cost, items_json, package_metadata
         FROM reservation_packages
         WHERE reservation_id = :id';
    $sqlWithoutCost = 'SELECT id, package_id, package_code, package_name, name, quantity, unit_price, 0 AS unit_cost, items_json, package_metadata
         FROM reservation_packages
         WHERE reservation_id = :id';

    try {
        $statement = $pdo->prepare($sqlWithCost);
    } catch (PDOException $_) {
        $statement = $pdo->prepare($sqlWithoutCost);
    }

    try {
        $statement->execute(['id' => $reservationId]);
    } catch (PDOException $error) {
        $message = strtolower($error->getMessage());
        if (str_contains($message, 'unit_cost') || str_contains($message, 'items_json') || str_contains($message, 'unknown column')) {
            ensureReservationPackagesTable($pdo);
            try {
                $statement = $pdo->prepare($sqlWithCost);
            } catch (PDOException $_prep) {
                $statement = $pdo->prepare($sqlWithoutCost);
            }
            $statement->execute(['id' => $reservationId]);
        } else {
            throw $error;
        }
    }

    $packages = [];
    while ($row = $statement->fetch()) {
        $items = [];
        if (!empty($row['items_json'])) {
            try {
                $decoded = json_decode($row['items_json'], true, 512, JSON_THROW_ON_ERROR);
                if (is_array($decoded)) {
                    $items = $decoded;
                }
            } catch (Throwable $_) {
                $items = [];
            }
        }
        $packages[] = [
            'id' => (int) $row['id'],
            'package_id' => isset($row['package_id']) ? (int) $row['package_id'] : null,
            'package_code' => $row['package_code'] ?? null,
            'name' => $row['package_name'] ?? $row['name'] ?? null,
            'quantity' => isset($row['quantity']) ? (int) $row['quantity'] : 0,
            'unit_price' => isset($row['unit_price']) ? (float) $row['unit_price'] : 0,
            'unit_cost' => isset($row['unit_cost']) ? (float) $row['unit_cost'] : 0,
            'items' => $items,
            'package_metadata' => !empty($row['package_metadata'])
                ? (json_decode($row['package_metadata'], true) ?: [])
                : [],
        ];
    }

    return $packages;
}

function fetchReservationTechnicians(PDO $pdo, int $reservationId): array
{
    $hasPositionsTable = tableColumnExists($pdo, 'technician_positions', 'id');
    $hasRtPositionKey = tableColumnExists($pdo, 'reservation_technicians', 'position_key');
    $hasRtPositionId = tableColumnExists($pdo, 'reservation_technicians', 'position_id');

    if ($hasPositionsTable && ($hasRtPositionId || $hasRtPositionKey)) {
        // Prefer joining by id; if missing/null fall back to matching by key/name
        $joinConditionParts = [];
        if ($hasRtPositionId) {
            $joinConditionParts[] = 'tp.id = rt.position_id';
        }
        if ($hasRtPositionKey) {
            $joinConditionParts[] = '(rt.position_id IS NULL AND rt.position_key IS NOT NULL AND tp.name = rt.position_key)';
        }
        $joinCondition = implode(' OR ', $joinConditionParts);

        $sql = 'SELECT 
            rt.*,
            t.full_name AS technician_name,
            COALESCE(rt.position_name, tp.label_ar, tp.label_en, tp.name) AS effective_position_name
         FROM reservation_technicians rt
         INNER JOIN technicians t ON t.id = rt.technician_id
         LEFT JOIN technician_positions tp ON (' . $joinCondition . ')
         WHERE rt.reservation_id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $reservationId]);
    } else {
        // Fallback: no positions table or columns — return raw RT data with safe aliases
        $statement = $pdo->prepare(
            'SELECT 
                rt.*,
                t.full_name AS technician_name,
                rt.position_name AS effective_position_name
             FROM reservation_technicians rt
             INNER JOIN technicians t ON t.id = rt.technician_id
             WHERE rt.reservation_id = :id'
        );
        $statement->execute(['id' => $reservationId]);
    }
    $techs = [];
    while ($row = $statement->fetch()) {
        // Prefer the assigned/derived position name as the role shown in details, fallback to stored role
        $effectiveRole = $row['effective_position_name'] ?? $row['position_name'] ?? null;
        if ($effectiveRole === null || trim((string) $effectiveRole) === '') {
            $effectiveRole = $row['role'];
        }

        $label = $row['effective_position_name'] ?? ($row['position_name'] ?? null);
        if ($label === null || trim((string) $label) === '') {
            $label = $effectiveRole; // ensure we always have a readable label
        }

        $techs[] = [
            'id' => (int) $row['technician_id'],
            'technician_id' => (int) $row['technician_id'],
            'role' => $effectiveRole,
            'notes' => $row['notes'] ?? null,
            'name' => $row['technician_name'],
            'position_id' => isset($row['position_id']) ? (int) $row['position_id'] : null,
            'position_key' => $row['position_key'] ?? null,
            'position_name' => $label,
            'position_label_ar' => $row['position_label_ar'] ?? null,
            'position_label_en' => $row['position_label_en'] ?? null,
            'position_cost' => isset($row['position_cost']) ? (float) $row['position_cost'] : 0,
            'position_client_price' => isset($row['position_client_price']) ? (float) $row['position_client_price'] : 0,
            'assignment_id' => $row['assignment_id'] ?? null,
        ];
    }
    return $techs;
}

function fetchReservationPayments(PDO $pdo, int $reservationId): array
{
    $statement = $pdo->prepare(
        'SELECT id, payment_type, value, amount, percentage, note, recorded_at
         FROM reservation_payments
         WHERE reservation_id = :id
         ORDER BY COALESCE(recorded_at, created_at), id'
    );
    $statement->execute(['id' => $reservationId]);

    $payments = [];
    while ($row = $statement->fetch()) {
        $amount = $row['amount'] !== null ? (float) $row['amount'] : null;
        $percentage = $row['percentage'] !== null ? (float) $row['percentage'] : null;
        $value = $row['value'] !== null ? (float) $row['value'] : null;
        $recordedAt = $row['recorded_at'] ?? null;

        $payments[] = [
            'id' => (int) $row['id'],
            'type' => $row['payment_type'],
            'value' => $value,
            'amount' => $amount,
            'percentage' => $percentage,
            'note' => $row['note'] ?? null,
            'recorded_at' => $recordedAt,
            'recordedAt' => $recordedAt,
        ];
    }

    return $payments;
}

function customerExists(PDO $pdo, int $id): bool
{
    $statement = $pdo->prepare('SELECT id FROM customers WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    return (bool) $statement->fetchColumn();
}

function fetchEquipmentBasicInfo(PDO $pdo, int $id): array|false
{
    $statement = $pdo->prepare('SELECT id, status FROM equipment WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    return $statement->fetch();
}

function normaliseEquipmentStatus(?string $status): ?string
{
    if ($status === null) {
        return null;
    }

    $normalized = strtolower(trim($status));

    return match ($normalized) {
        'maintenance', 'صيانة' => 'maintenance',
        'available', 'متاح', 'متوفر' => 'available',
        'reserved', 'محجوز' => 'reserved',
        'retired', 'متوقف', 'خارج الخدمة' => 'retired',
        default => $normalized ?: null,
    };
}

function isEquipmentMarkedMaintenance(array $equipment): bool
{
    $status = normaliseEquipmentStatus($equipment['status'] ?? null);
    return $status === 'maintenance';
}

function equipmentExists(PDO $pdo, int $id): bool
{
    return (bool) fetchEquipmentBasicInfo($pdo, $id);
}

function technicianExists(PDO $pdo, int $id): bool
{
    $statement = $pdo->prepare('SELECT id FROM technicians WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    return (bool) $statement->fetchColumn();
}

function projectExists(PDO $pdo, int $id): bool
{
    $statement = $pdo->prepare('SELECT id FROM projects WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    return (bool) $statement->fetchColumn();
}

function isValidDateTime(string $dateTime): bool
{
    $timestamp = strtotime($dateTime);
    return $timestamp !== false;
}

function ensureReservationProjectColumn(PDO $pdo): void
{
    static $checked = false;

    if ($checked) {
        return;
    }

    try {
        $statement = $pdo->query("SHOW COLUMNS FROM reservations LIKE 'project_id'");
        $columnExists = $statement && $statement->fetch();

        if ($columnExists) {
            $checked = true;
            return;
        }

        $pdo->exec('ALTER TABLE reservations ADD COLUMN project_id BIGINT UNSIGNED NULL DEFAULT NULL AFTER total_amount');
        $pdo->exec('ALTER TABLE reservations ADD INDEX idx_reservations_project_id (project_id)');
        $checked = true;
        error_log('Added project_id column to reservations table automatically.');
    } catch (Throwable $error) {
        $checked = true;
        error_log('Failed to ensure project_id column on reservations table: ' . $error->getMessage());
    }
}

function ensureReservationEquipmentCostColumn(PDO $pdo): void
{
    static $checked = false;

    if ($checked) {
        return;
    }

    try {
        $statement = $pdo->query("SHOW COLUMNS FROM reservation_equipment LIKE 'unit_cost'");
        $columnExists = $statement && $statement->fetch();

        if ($columnExists) {
            $checked = true;
            return;
        }

        $pdo->exec('ALTER TABLE reservation_equipment ADD COLUMN unit_cost DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER unit_price');
        $checked = true;
        error_log('Added unit_cost column to reservation_equipment table automatically.');
    } catch (Throwable $error) {
        // Do not flip $checked so we retry later; log once per request.
        error_log('Failed to ensure unit_cost column on reservation_equipment table: ' . $error->getMessage());
    }
}

function ensureReservationPaymentColumns(PDO $pdo): void
{
    static $checked = false;

    if ($checked) {
        return;
    }

    try {
        if (!tableColumnExists($pdo, 'reservations', 'paid_amount')) {
            $pdo->exec('ALTER TABLE reservations ADD COLUMN paid_amount DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER paid_status');
        }
        if (!tableColumnExists($pdo, 'reservations', 'paid_percentage')) {
            $pdo->exec('ALTER TABLE reservations ADD COLUMN paid_percentage DECIMAL(8,2) NOT NULL DEFAULT 0 AFTER paid_amount');
        }
        if (!tableColumnExists($pdo, 'reservations', 'payment_progress_type')) {
            $pdo->exec('ALTER TABLE reservations ADD COLUMN payment_progress_type VARCHAR(20) DEFAULT NULL AFTER paid_percentage');
        }
        if (!tableColumnExists($pdo, 'reservations', 'payment_progress_value')) {
            $pdo->exec('ALTER TABLE reservations ADD COLUMN payment_progress_value DECIMAL(12,2) DEFAULT NULL AFTER payment_progress_type');
        }
        $checked = true;
    } catch (Throwable $error) {
        // Do not flip $checked so we retry later; log once per request.
        error_log('Failed to ensure reservation payment columns: ' . $error->getMessage());
    }
}

function ensureReservationPackagesTable(PDO $pdo): void
{
    static $checked = false;

    if ($checked) {
        return;
    }

    try {
        $pdo->exec('
            CREATE TABLE IF NOT EXISTS reservation_packages (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                reservation_id BIGINT UNSIGNED NOT NULL,
                package_id BIGINT UNSIGNED DEFAULT NULL,
                package_code VARCHAR(100) DEFAULT NULL,
                package_name VARCHAR(255) DEFAULT NULL,
                name VARCHAR(255) DEFAULT NULL,
                quantity INT NOT NULL DEFAULT 1,
                unit_price DECIMAL(12,2) NOT NULL DEFAULT 0,
                unit_cost DECIMAL(12,2) NOT NULL DEFAULT 0,
                items_json LONGTEXT DEFAULT NULL,
                package_metadata LONGTEXT DEFAULT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_reservation_packages_reservation_id (reservation_id),
                FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');
        // Backfill columns in case table exists without new fields
        try { if (!tableColumnExists($pdo, 'reservation_packages', 'package_id')) { $pdo->exec("ALTER TABLE reservation_packages ADD COLUMN package_id BIGINT UNSIGNED DEFAULT NULL AFTER reservation_id"); } } catch (Throwable $_) {}
        try { if (!tableColumnExists($pdo, 'reservation_packages', 'package_name')) { $pdo->exec("ALTER TABLE reservation_packages ADD COLUMN package_name VARCHAR(255) DEFAULT NULL AFTER package_code"); } } catch (Throwable $_) {}
        try { if (!tableColumnExists($pdo, 'reservation_packages', 'unit_cost')) { $pdo->exec("ALTER TABLE reservation_packages ADD COLUMN unit_cost DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER unit_price"); } } catch (Throwable $_) {}
        try { if (!tableColumnExists($pdo, 'reservation_packages', 'items_json')) { $pdo->exec("ALTER TABLE reservation_packages ADD COLUMN items_json LONGTEXT DEFAULT NULL AFTER unit_cost"); } } catch (Throwable $_) {}
        try { if (!tableColumnExists($pdo, 'reservation_packages', 'package_metadata')) { $pdo->exec("ALTER TABLE reservation_packages ADD COLUMN package_metadata LONGTEXT DEFAULT NULL AFTER items_json"); } } catch (Throwable $_) {}
        try { if (!tableColumnExists($pdo, 'reservation_packages', 'package_code')) { $pdo->exec("ALTER TABLE reservation_packages ADD COLUMN package_code VARCHAR(100) DEFAULT NULL AFTER reservation_id"); } } catch (Throwable $_) {}
        try { if (!tableColumnExists($pdo, 'reservation_packages', 'name')) { $pdo->exec("ALTER TABLE reservation_packages ADD COLUMN name VARCHAR(255) DEFAULT NULL AFTER package_name"); } } catch (Throwable $_) {}
        $checked = true;
    } catch (Throwable $error) {
        error_log('Failed to ensure reservation_packages table: ' . $error->getMessage());
    }
}

/**
 * Checks if a given column exists on a table (best-effort, safe to use at runtime).
 */
function tableColumnExists(PDO $pdo, string $table, string $column): bool
{
    try {
        $stmt = $pdo->prepare("SHOW COLUMNS FROM `{$table}` LIKE :col");
        $stmt->execute(['col' => $column]);
        return (bool) $stmt->fetch();
    } catch (Throwable $_) {
        return false;
    }
}

function normaliseStatus(?string $status): string
{
    $normalized = strtolower(trim((string) $status));

    return match ($normalized) {
        'pending', 'معلق', 'قيد الانتظار' => 'pending',
        'confirmed', 'مؤكد' => 'confirmed',
        'in_progress', 'in-progress', 'جاري', 'قيد التنفيذ' => 'in_progress',
        'completed', 'مكتمل', 'منتهي', 'منتهية' => 'completed',
        'cancelled', 'canceled', 'ملغي', 'ملغى', 'ملغية' => 'cancelled',
        default => 'pending',
    };
}

function normalisePaidStatus(?string $status): ?string
{
    if ($status === null) {
        return null;
    }

    $normalized = strtolower(trim($status));

    return match ($normalized) {
        'paid', 'مدفوع' => 'paid',
        'unpaid', 'غير مدفوع', 'not_paid' => 'unpaid',
        'partial', 'مدفوع جزئياً', 'partial_paid' => 'partial',
        default => null,
    };
}
