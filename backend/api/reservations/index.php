<?php
require_once __DIR__ . '/../../bootstrap.php';

use InvalidArgumentException;
use PDO;
use RuntimeException;
use Throwable;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

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

function handleReservationsGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if ($id) {
        $reservation = fetchReservationById($pdo, $id);
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
        $where[] = '(
            r.reservation_code LIKE :search OR
            r.notes LIKE :search OR
            c.full_name LIKE :search OR
            c.company LIKE :search
        )';
        $params['search'] = '%' . $search . '%';
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
    ensureReservationProjectColumn($pdo);

    [$data, $errors] = validateReservationPayload(readJsonPayload(), false, $pdo);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $pdo->beginTransaction();

    try {
        $reservationId = insertReservation($pdo, $data);
        upsertReservationItems($pdo, $reservationId, $data['items'] ?? []);
        upsertReservationTechnicians($pdo, $reservationId, $data['technicians'] ?? []);
        if (array_key_exists('payments', $data)) {
            upsertReservationPayments($pdo, $reservationId, $data['payments']);
        }

        $pdo->commit();

        $reservation = fetchReservationById($pdo, $reservationId);

        logActivity($pdo, 'RESERVATION_CREATE', [
            'reservation_id' => $reservationId,
            'customer_id' => $data['customer_id'] ?? null,
            'items' => isset($data['items']) ? count((array) $data['items']) : 0,
        ]);

        respond($reservation, 201);
    } catch (Throwable $exception) {
        $pdo->rollBack();
        error_log(sprintf('Reservation create failed: %s', $exception->getMessage()));
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

    [$data, $errors] = validateReservationPayload(readJsonPayload(), true, $pdo, $id);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $pdo->beginTransaction();

    try {
        updateReservation($pdo, $id, $data);

        if (array_key_exists('items', $data)) {
            upsertReservationItems($pdo, $id, $data['items']);
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
    if ($rawPaymentHistory !== null) {
        $normalizedPayments = normalisePaymentHistoryPayload($rawPaymentHistory, $errors);
    }

    if ($normalizedPayments === null && !$isUpdate) {
        $normalizedPayments = [];
    }

    $items = array_key_exists('items', $payload) ? $payload['items'] : null;
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

    if (!$isUpdate || array_key_exists('technicians', $payload)) {
        $data['technicians'] = $technicians ?? [];
    }

    if (!$isUpdate || array_key_exists('payment_history', $payload) || array_key_exists('paymentHistory', $payload)) {
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
        if ($column === 'items' || $column === 'technicians' || $column === 'payments') {
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
    $pdo->prepare('DELETE FROM reservation_equipment WHERE reservation_id = :id')->execute(['id' => $reservationId]);

    if (!$items) {
        return;
    }

    $sql = 'INSERT INTO reservation_equipment (
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

    $statement = $pdo->prepare($sql);

    foreach ($items as $item) {
        $statement->execute([
            'reservation_id' => $reservationId,
            'equipment_id' => (int) $item['equipment_id'],
            'quantity' => isset($item['quantity']) ? (int) $item['quantity'] : 1,
            'unit_price' => isset($item['unit_price']) ? (float) $item['unit_price'] : 0,
            'notes' => $item['notes'] ?? null,
        ]);
    }
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
            'payment_type' => $payment['payment_type'],
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
    $reservation['technicians'] = fetchReservationTechnicians($pdo, (int) $reservation['id']);
    $payments = fetchReservationPayments($pdo, (int) $reservation['id']);
    $reservation['payment_history'] = $payments;
    $reservation['paymentHistory'] = $payments;

    return $reservation;
}

function fetchReservationItems(PDO $pdo, int $reservationId): array
{
    $statement = $pdo->prepare(
        'SELECT re.*, e.description, e.name, e.barcode, e.image_url
         FROM reservation_equipment re
         INNER JOIN equipment e ON e.id = re.equipment_id
         WHERE re.reservation_id = :id'
    );
    $statement->execute(['id' => $reservationId]);
    $items = [];
    while ($row = $statement->fetch()) {
        $items[] = [
            'id' => (int) $row['id'],
            'equipment_id' => (int) $row['equipment_id'],
            'quantity' => (int) $row['quantity'],
            'unit_price' => (float) $row['unit_price'],
            'notes' => $row['notes'] ?? null,
            'description' => $row['description'] ?? $row['name'] ?? '',
            'barcode' => $row['barcode'] ?? '',
            'image_url' => $row['image_url'] ?? null,
        ];
    }
    return $items;
}

function fetchReservationTechnicians(PDO $pdo, int $reservationId): array
{
    $statement = $pdo->prepare(
        'SELECT 
            rt.*,
            t.full_name AS technician_name,
            COALESCE(rt.position_name, tp.label_ar, tp.label_en, tp.name) AS effective_position_name,
            COALESCE(NULLIF(rt.position_cost,0), tp.cost, 0) AS effective_position_cost,
            COALESCE(NULLIF(rt.position_client_price,0), tp.client_price, 0) AS effective_position_client_price
         FROM reservation_technicians rt
         INNER JOIN technicians t ON t.id = rt.technician_id
         LEFT JOIN technician_positions tp ON tp.id = rt.position_id
         WHERE rt.reservation_id = :id'
    );
    $statement->execute(['id' => $reservationId]);
    $techs = [];
    while ($row = $statement->fetch()) {
        // Prefer the assigned/derived position name as the role shown in details, fallback to stored role
        $effectiveRole = $row['effective_position_name'] ?? $row['position_name'] ?? null;
        if ($effectiveRole === null || trim((string) $effectiveRole) === '') {
            $effectiveRole = $row['role'];
        }

        $techs[] = [
            'id' => (int) $row['technician_id'],
            'technician_id' => (int) $row['technician_id'],
            'role' => $effectiveRole,
            'notes' => $row['notes'] ?? null,
            'name' => $row['technician_name'],
            'position_id' => isset($row['position_id']) ? (int) $row['position_id'] : null,
            'position_key' => $row['position_key'] ?? null,
            'position_name' => $row['effective_position_name'] ?? ($row['position_name'] ?? null),
            'position_label_ar' => $row['position_label_ar'] ?? null,
            'position_label_en' => $row['position_label_en'] ?? null,
            'position_cost' => isset($row['effective_position_cost']) ? (float) $row['effective_position_cost'] : (isset($row['position_cost']) ? (float) $row['position_cost'] : 0),
            'position_client_price' => isset($row['effective_position_client_price']) ? (float) $row['effective_position_client_price'] : (isset($row['position_client_price']) ? (float) $row['position_client_price'] : 0),
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

function normaliseStatus(?string $status): string
{
    $normalized = strtolower(trim((string) $status));

    return match ($normalized) {
        'pending', 'معلق', 'قيد الانتظار' => 'pending',
        'confirmed', 'مؤكد' => 'confirmed',
        'in_progress', 'جاري', 'قيد التنفيذ' => 'in_progress',
        'completed', 'مكتمل' => 'completed',
        'cancelled', 'ملغي' => 'cancelled',
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
