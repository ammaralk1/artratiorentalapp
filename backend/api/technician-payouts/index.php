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
            handlePayoutsGet($pdo);
            break;
        case 'POST':
            handlePayoutsCreate($pdo);
            break;
        case 'DELETE':
            handlePayoutsDelete($pdo);
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

function handlePayoutsGet(PDO $pdo): void
{
    $technicianId = isset($_GET['technician_id']) ? (int) $_GET['technician_id'] : null;
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if ($id) {
        $payout = fetchPayoutById($pdo, $id);
        if (!$payout) {
            respondError('Technician payout not found', 404);
            return;
        }

        respond($payout);
        return;
    }

    $params = [];
    $where = [];

    if ($technicianId) {
        $where[] = 'tp.technician_id = :technician_id';
        $params['technician_id'] = $technicianId;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $sql = "SELECT tp.*, u.username AS recorded_by_username
            FROM technician_payouts tp
            LEFT JOIN users u ON tp.recorded_by = u.id
            $whereClause
            ORDER BY tp.paid_at ASC, tp.id ASC";

    $statement = $pdo->prepare($sql);
    foreach ($params as $key => $value) {
        $statement->bindValue(':' . $key, $value, PDO::PARAM_INT);
    }
    $statement->execute();

    $items = [];
    while ($row = $statement->fetch()) {
        $items[] = mapPayoutRow($row);
    }

    respond($items);
}

function handlePayoutsCreate(PDO $pdo): void
{
    [$data, $errors] = validatePayoutPayload(readJsonPayload());

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    ensureTechnicianExists($pdo, $data['technician_id']);

    $user = getAuthenticatedUser();
    $recordedBy = $user['id'] ?? null;

    $sql = 'INSERT INTO technician_payouts (
        technician_id,
        amount,
        note,
        paid_at,
        recorded_by
    ) VALUES (
        :technician_id,
        :amount,
        :note,
        :paid_at,
        :recorded_by
    )';

    $statement = $pdo->prepare($sql);
    $statement->execute([
        'technician_id' => $data['technician_id'],
        'amount' => $data['amount'],
        'note' => $data['note'],
        'paid_at' => $data['paid_at'],
        'recorded_by' => $recordedBy,
    ]);

    $id = (int) $pdo->lastInsertId();
    $payout = fetchPayoutById($pdo, $id);

    logActivity($pdo, 'TECHNICIAN_PAYOUT_CREATE', [
        'technician_id' => $data['technician_id'],
        'payout_id' => $id,
        'amount' => $data['amount'],
    ]);

    respond($payout, 201);
}

function handlePayoutsDelete(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid payout id', 400);
        return;
    }

    $existing = fetchPayoutById($pdo, $id);
    if (!$existing) {
        respondError('Technician payout not found', 404);
        return;
    }

    $statement = $pdo->prepare('DELETE FROM technician_payouts WHERE id = :id');
    $statement->execute(['id' => $id]);

    logActivity($pdo, 'TECHNICIAN_PAYOUT_DELETE', [
        'technician_id' => $existing['technicianId'],
        'payout_id' => $id,
        'amount' => $existing['amount'],
    ]);

    respond(['deleted' => true]);
}

function validatePayoutPayload(array $payload): array
{
    $errors = [];

    $technicianId = isset($payload['technician_id']) ? (int) $payload['technician_id'] : 0;
    if ($technicianId <= 0) {
        $errors['technician_id'] = '⚠️ يجب تحديد عضو الطاقم.';
    }

    $rawAmount = $payload['amount'] ?? null;
    $amount = is_numeric($rawAmount) ? (float) $rawAmount : null;
    if ($amount === null || $amount <= 0) {
        $errors['amount'] = '⚠️ أدخل قيمة صحيحة للمبلغ.';
    }

    $note = isset($payload['note']) ? trim((string) $payload['note']) : null;

    $paidAtRaw = $payload['paid_at'] ?? null;
    $paidAt = $paidAtRaw ? strtotime((string) $paidAtRaw) : time();
    if ($paidAt === false) {
        $errors['paid_at'] = '⚠️ تاريخ الدفع غير صحيح.';
    }

    if ($errors) {
        return [[], $errors];
    }

    $formattedPaidAt = date('Y-m-d H:i:s', $paidAt);

    return [[
        'technician_id' => $technicianId,
        'amount' => number_format((float) $amount, 2, '.', ''),
        'note' => $note !== '' ? $note : null,
        'paid_at' => $formattedPaidAt,
    ], []];
}

function fetchPayoutById(PDO $pdo, int $id): array|false
{
    $statement = $pdo->prepare('SELECT tp.*, u.username AS recorded_by_username FROM technician_payouts tp LEFT JOIN users u ON tp.recorded_by = u.id WHERE tp.id = :id');
    $statement->execute(['id' => $id]);
    $row = $statement->fetch();
    if (!$row) {
        return false;
    }
    return mapPayoutRow($row);
}

function ensureTechnicianExists(PDO $pdo, int $technicianId): void
{
    $statement = $pdo->prepare('SELECT id FROM technicians WHERE id = :id');
    $statement->execute(['id' => $technicianId]);
    if (!$statement->fetch()) {
        throw new InvalidArgumentException('Technician not found');
    }
}

function mapPayoutRow(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'technicianId' => (int) $row['technician_id'],
        'amount' => (float) $row['amount'],
        'note' => $row['note'] ?? null,
        'paidAt' => $row['paid_at'],
        'recordedBy' => $row['recorded_by'] !== null ? (int) $row['recorded_by'] : null,
        'recordedByUsername' => $row['recorded_by_username'] ?? null,
        'createdAt' => $row['created_at'] ?? null,
        'updatedAt' => $row['updated_at'] ?? null,
    ];
}

function readJsonPayload(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        throw new InvalidArgumentException('Invalid JSON payload');
    }

    return $decoded;
}
