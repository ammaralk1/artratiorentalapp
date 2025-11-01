<?php
declare(strict_types=1);

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
            handleProjectsGet($pdo);
            break;
        case 'POST':
            handleProjectsCreate($pdo);
            break;
        case 'PUT':
        case 'PATCH':
            handleProjectsUpdate($pdo);
            break;
        case 'DELETE':
            handleProjectsDelete($pdo);
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

function handleProjectsGet(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    if ($id) {
        $project = fetchProjectById($pdo, $id);
        if (!$project) {
            respondError('Project not found', 404);
            return;
        }

        respond($project);
        return;
    }

    $search = trim($_GET['search'] ?? '');
    $clientId = isset($_GET['client_id']) ? (int) $_GET['client_id'] : null;
    $paymentStatus = trim($_GET['payment_status'] ?? '');
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
            p.title LIKE :search OR
            p.project_code LIKE :search OR
            p.description LIKE :search OR
            p.client_company LIKE :search OR
            c.full_name LIKE :search
        )';
        $params['search'] = '%' . $search . '%';
    }

    if ($clientId) {
        $where[] = 'p.client_id = :client_id';
        $params['client_id'] = $clientId;
    }

    if ($paymentStatus !== '') {
        $normalizedPayment = normalizePaymentStatus($paymentStatus);
        if ($normalizedPayment) {
            $where[] = 'p.payment_status = :payment_status';
            $params['payment_status'] = $normalizedPayment;
        }
    }

    $startDateParam = $startDate !== '' ? $startDate . ' 00:00:00' : null;
    $endDateParam = $endDate !== '' ? $endDate . ' 23:59:59' : null;

    if ($startDateParam && $endDateParam) {
        $where[] = '(
            p.start_datetime <= :end_range
            AND COALESCE(p.end_datetime, p.start_datetime) >= :start_range
        )';
        $params['start_range'] = $startDateParam;
        $params['end_range'] = $endDateParam;
    } elseif ($startDateParam) {
        $where[] = 'COALESCE(p.end_datetime, p.start_datetime) >= :start_range';
        $params['start_range'] = $startDateParam;
    } elseif ($endDateParam) {
        $where[] = 'p.start_datetime <= :end_range';
        $params['end_range'] = $endDateParam;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

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

    $statement = $pdo->prepare($query);
    foreach ($params as $key => $value) {
        $statement->bindValue(':' . $key, $value);
    }
    $statement->execute();

    $items = [];
    while ($row = $statement->fetch()) {
        $items[] = mapProjectRow($pdo, $row);
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

function handleProjectsCreate(PDO $pdo): void
{
    // Ensure schema supports project status/cancelled flags
    ensureProjectCancellationColumns($pdo);
    // Ensure expenses 'note' column exists when possible
    ensureProjectExpensesNotesColumn($pdo);
    [$result, $errors] = validateProjectPayload(readJsonPayload(), false, $pdo);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $payload = $result['fields'];

    if (empty($payload['project_code'])) {
        $payload['project_code'] = generateProjectCode($pdo);
    }

    $pdo->beginTransaction();

    try {
        $projectId = insertProject($pdo, $payload);

        if (!empty($result['technicians'])) {
            syncProjectTechnicians($pdo, $projectId, $result['technicians']);
        }

        if (!empty($result['equipment'])) {
            syncProjectEquipment($pdo, $projectId, $result['equipment']);
        }

        if (!empty($result['expenses'])) {
            syncProjectExpenses($pdo, $projectId, $result['expenses']);
        }

        if (!empty($result['payments'])) {
            syncProjectPayments($pdo, $projectId, $result['payments']);
        }

        $pdo->commit();

        $project = fetchProjectById($pdo, $projectId);
        if (!$project) {
            throw new RuntimeException('Failed to load created project');
        }

        logActivity($pdo, 'PROJECT_CREATE', [
            'project_id' => $projectId,
            'client_id' => $payload['client_id'] ?? null,
            'technicians' => $result['technicians'] ?? [],
        ]);

        // Fire-and-forget notifications; log but do not block response
        try {
            require_once __DIR__ . '/../../services/notifications.php';
            notifyProjectCreated($pdo, $project);
        } catch (Throwable $notifyError) {
            error_log('Project create notification failed: ' . $notifyError->getMessage());
        }

        respond($project, 201);
    } catch (Throwable $exception) {
        $pdo->rollBack();
        throw $exception;
    }
}

function handleProjectsUpdate(PDO $pdo): void
{
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid project id', 400);
        return;
    }

    if (!projectExists($pdo, $id)) {
        respondError('Project not found', 404);
        return;
    }

    // Ensure schema supports project status/cancelled flags
    ensureProjectCancellationColumns($pdo);
    // Ensure expenses 'note' column exists when possible
    ensureProjectExpensesNotesColumn($pdo);

    [$result, $errors] = validateProjectPayload(readJsonPayload(), true, $pdo, $id);

    if ($errors) {
        respondError('Validation failed', 422, ['errors' => $errors]);
        return;
    }

    $payload = $result['fields'];
    // Capture existing technicians before update to detect assignments
    $existingTechs = fetchProjectTechnicians($pdo, $id);

    if (array_key_exists('project_code', $payload) && empty($payload['project_code'])) {
        $payload['project_code'] = generateProjectCode($pdo);
    }

    $pdo->beginTransaction();

    try {
        if ($payload) {
            updateProject($pdo, $id, $payload);
        }

        if ($result['technicians'] !== null) {
            syncProjectTechnicians($pdo, $id, $result['technicians']);
        }

        if ($result['equipment'] !== null) {
            syncProjectEquipment($pdo, $id, $result['equipment']);
        }

        if ($result['expenses'] !== null) {
            syncProjectExpenses($pdo, $id, $result['expenses']);
        }

        if ($result['payments'] !== null) {
            syncProjectPayments($pdo, $id, $result['payments']);
        }

        $pdo->commit();

        $project = fetchProjectById($pdo, $id);
        if (!$project) {
            throw new RuntimeException('Failed to load updated project');
        }

        $changedFields = array_keys($payload);
        if ($result['technicians'] !== null) {
            $changedFields[] = 'technicians';
        }
        if ($result['equipment'] !== null) {
            $changedFields[] = 'equipment';
        }
        if ($result['expenses'] !== null) {
            $changedFields[] = 'expenses';
        }

        logActivity($pdo, 'PROJECT_UPDATE', [
            'project_id' => $id,
            'changes' => array_values(array_unique($changedFields)),
        ]);

        // Notify newly assigned technicians (if technicians were included in payload)
        try {
            if ($result['technicians'] !== null) {
                require_once __DIR__ . '/../../services/notifications.php';
                $oldIds = [];
                foreach ((array)$existingTechs as $t) { $oldIds[] = (int)($t['id'] ?? 0); }
                $newIds = [];
                foreach ((array)$project['technicians'] as $t) { $newIds[] = (int)($t['id'] ?? 0); }
                $added = array_values(array_diff(array_unique($newIds), array_unique($oldIds)));
                if ($added) {
                    notifyProjectTechnicianAssigned($pdo, $project, $added);
                }
            }
        } catch (Throwable $notifyError) {
            error_log('Project update notification (assignment) failed: ' . $notifyError->getMessage());
        }

        respond($project);
    } catch (Throwable $exception) {
        $pdo->rollBack();
        throw $exception;
    }
}

function handleProjectsDelete(PDO $pdo): void
{
    requireRole('admin');
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($id <= 0) {
        respondError('Missing or invalid project id', 400);
        return;
    }

    if (!projectExists($pdo, $id)) {
        respondError('Project not found', 404);
        return;
    }

    $pdo->beginTransaction();

    try {
        $statement = $pdo->prepare('UPDATE reservations SET project_id = NULL WHERE project_id = :id');
        $statement->execute(['id' => $id]);

        $statement = $pdo->prepare('DELETE FROM project_technicians WHERE project_id = :id');
        $statement->execute(['id' => $id]);

        $statement = $pdo->prepare('DELETE FROM project_equipment WHERE project_id = :id');
        $statement->execute(['id' => $id]);

        $statement = $pdo->prepare('DELETE FROM project_expenses WHERE project_id = :id');
        $statement->execute(['id' => $id]);

        $statement = $pdo->prepare('DELETE FROM project_payments WHERE project_id = :id');
        $statement->execute(['id' => $id]);

        $statement = $pdo->prepare('DELETE FROM projects WHERE id = :id');
        $statement->execute(['id' => $id]);

        $pdo->commit();

        logActivity($pdo, 'PROJECT_DELETE', [
            'project_id' => $id,
        ]);

        respond(null);
    } catch (Throwable $exception) {
        $pdo->rollBack();
        throw $exception;
    }
}

function validateProjectPayload(array $payload, bool $isUpdate, PDO $pdo, ?int $projectId = null): array
{
    $errors = [];

    $fields = [];

    // Detect optional columns for status/cancelled on projects table
    $hasStatusColumn = false;
    $hasCancelledColumn = false;
    try {
        $colsStmt = $pdo->query("SHOW COLUMNS FROM projects LIKE 'status'");
        $hasStatusColumn = (bool) ($colsStmt && $colsStmt->fetch());
    } catch (Throwable $_) { /* ignore */ }
    try {
        $colsStmt2 = $pdo->query("SHOW COLUMNS FROM projects LIKE 'cancelled'");
        $hasCancelledColumn = (bool) ($colsStmt2 && $colsStmt2->fetch());
    } catch (Throwable $_) { /* ignore */ }

    $titleExists = array_key_exists('title', $payload) || !$isUpdate;
    $title = $titleExists ? trim((string) ($payload['title'] ?? '')) : null;
    if ($titleExists) {
        if ($title === '') {
            $errors['title'] = 'Title is required';
        } elseif (mb_strlen($title) > 255) {
            $errors['title'] = 'Title must be 255 characters or fewer';
        }
    }

    $typeExists = array_key_exists('type', $payload) || !$isUpdate;
    $type = $typeExists ? trim((string) ($payload['type'] ?? '')) : null;
    if ($typeExists) {
        if ($type === '') {
            $errors['type'] = 'Project type is required';
        } elseif (mb_strlen($type) > 100) {
            $errors['type'] = 'Project type must be 100 characters or fewer';
        }
    }

    $clientExists = array_key_exists('client_id', $payload) || !$isUpdate;
    $clientId = $clientExists ? (int) ($payload['client_id'] ?? 0) : null;
    if ($clientExists) {
        if (!$clientId) {
            $errors['client_id'] = 'Client is required';
        } elseif (!customerExists($pdo, $clientId)) {
            $errors['client_id'] = 'Client not found';
        }
    }

    $clientCompanyExists = array_key_exists('client_company', $payload);
    $clientCompany = $clientCompanyExists ? trim((string) ($payload['client_company'] ?? '')) : null;
    if ($clientCompanyExists && mb_strlen((string) $clientCompany) > 255) {
        $errors['client_company'] = 'Client company must be 255 characters or fewer';
    }

    // Only accept explicit `description` for project description
    $descriptionExists = array_key_exists('description', $payload);
    $description = $descriptionExists ? trim((string) ($payload['description'] ?? '')) : null;

    $startExists = array_key_exists('start_datetime', $payload) || !$isUpdate;
    $start = $startExists ? trim((string) ($payload['start_datetime'] ?? '')) : null;
    if ($startExists) {
        if ($start === '') {
            $errors['start_datetime'] = 'Start date/time is required';
        } elseif (!isValidDateTime($start)) {
            $errors['start_datetime'] = 'Start date/time is invalid';
        }
    }

    $endExists = array_key_exists('end_datetime', $payload) || (!$isUpdate && array_key_exists('end_datetime', $payload));
    $end = $endExists ? trim((string) ($payload['end_datetime'] ?? '')) : null;
    if ($endExists && $end !== '') {
        if (!isValidDateTime($end)) {
            $errors['end_datetime'] = 'End date/time is invalid';
        } elseif ($start && strtotime($start) !== false && strtotime($end) !== false && strtotime($end) <= strtotime($start)) {
            $errors['date_range'] = 'End date/time must be after start date/time';
        }
    }

    $applyTaxExists = array_key_exists('apply_tax', $payload) || !$isUpdate;
    $applyTax = $applyTaxExists ? filter_var($payload['apply_tax'] ?? false, FILTER_VALIDATE_BOOLEAN) : null;

    $paymentStatusExists = array_key_exists('payment_status', $payload) || !$isUpdate;
    $paymentStatusRaw = $paymentStatusExists ? (string) ($payload['payment_status'] ?? '') : '';
    $paymentStatus = $paymentStatusExists ? normalizePaymentStatus($paymentStatusRaw) : null;
    if ($paymentStatusExists && !$paymentStatus) {
        $errors['payment_status'] = 'Payment status must be paid, partially paid, or unpaid';
    }

    $discountExists = array_key_exists('discount', $payload) || !$isUpdate;
    $discount = $discountExists ? (float) ($payload['discount'] ?? 0) : null;
    if ($discountExists && $discount !== null && $discount < 0) {
        $errors['discount'] = 'Discount must be zero or greater';
    }

    $discountTypeExists = array_key_exists('discount_type', $payload) || !$isUpdate;
    $discountTypeRaw = $discountTypeExists ? strtolower(trim((string) ($payload['discount_type'] ?? 'percent'))) : null;
    $discountType = $discountTypeExists ? ($discountTypeRaw === 'amount' ? 'amount' : ($discountTypeRaw === 'percent' ? 'percent' : null)) : null;
    if ($discountTypeExists && $discountType === null) {
        $errors['discount_type'] = 'Discount type must be percent or amount';
    }

    $companyShareEnabledExists = array_key_exists('company_share_enabled', $payload) || !$isUpdate;
    $companyShareEnabled = $companyShareEnabledExists ? filter_var($payload['company_share_enabled'] ?? false, FILTER_VALIDATE_BOOLEAN) : null;

    $companySharePercentExists = array_key_exists('company_share_percent', $payload) || !$isUpdate;
    $companySharePercent = $companySharePercentExists ? (float) ($payload['company_share_percent'] ?? 0) : null;
    if ($companySharePercentExists) {
        if ($companySharePercent < 0) {
            $errors['company_share_percent'] = 'Company share percent must be zero or greater';
        } elseif ($companySharePercent > 100) {
            $errors['company_share_percent'] = 'Company share percent must be 100 or less';
        }
    }

    $companyShareAmountExists = array_key_exists('company_share_amount', $payload) || !$isUpdate;
    $companyShareAmount = $companyShareAmountExists ? (float) ($payload['company_share_amount'] ?? 0) : null;
    if ($companyShareAmountExists && $companyShareAmount < 0) {
        $errors['company_share_amount'] = 'Company share amount must be zero or greater';
    }

    $equipmentEstimateExists = array_key_exists('equipment_estimate', $payload) || !$isUpdate;
    $equipmentEstimate = $equipmentEstimateExists ? (float) ($payload['equipment_estimate'] ?? 0) : null;
    if ($equipmentEstimateExists && $equipmentEstimate !== null && $equipmentEstimate < 0) {
        $errors['equipment_estimate'] = 'Equipment estimate must be zero or greater';
    }

    $taxAmountExists = array_key_exists('tax_amount', $payload) || !$isUpdate;
    $taxAmount = $taxAmountExists ? (float) ($payload['tax_amount'] ?? 0) : null;
    if ($taxAmountExists && $taxAmount !== null && $taxAmount < 0) {
        $errors['tax_amount'] = 'Tax amount must be zero or greater';
    }

    $totalWithTaxExists = array_key_exists('total_with_tax', $payload) || !$isUpdate;
    $totalWithTax = $totalWithTaxExists ? (float) ($payload['total_with_tax'] ?? 0) : null;
    if ($totalWithTaxExists && $totalWithTax !== null && $totalWithTax < 0) {
        $errors['total_with_tax'] = 'Total with tax must be zero or greater';
    }

    // New: services client price (revenue side for production services)
    $servicesClientPriceExists = array_key_exists('services_client_price', $payload) || !$isUpdate;
    $servicesClientPrice = $servicesClientPriceExists ? (float) ($payload['services_client_price'] ?? 0) : null;
    if ($servicesClientPriceExists && $servicesClientPrice !== null && $servicesClientPrice < 0) {
        $errors['services_client_price'] = 'Services client price must be zero or greater';
    }

    $paidAmountExists = array_key_exists('paid_amount', $payload) || !$isUpdate;
    $paidAmount = $paidAmountExists ? (float) ($payload['paid_amount'] ?? 0) : null;
    if ($paidAmountExists && $paidAmount < 0) {
        $errors['paid_amount'] = 'Paid amount must be zero or greater';
    }

    $paidPercentageExists = array_key_exists('paid_percentage', $payload) || !$isUpdate;
    $paidPercentage = $paidPercentageExists ? (float) ($payload['paid_percentage'] ?? 0) : null;
    if ($paidPercentageExists) {
        if ($paidPercentage < 0) {
            $errors['paid_percentage'] = 'Paid percentage must be zero or greater';
        } elseif ($paidPercentage > 100) {
            $errors['paid_percentage'] = 'Paid percentage must be 100 or less';
        }
    }

    $paymentProgressTypeExists = array_key_exists('payment_progress_type', $payload) || !$isUpdate;
    $paymentProgressTypeRaw = $paymentProgressTypeExists ? strtolower(trim((string) ($payload['payment_progress_type'] ?? ''))) : '';
    $paymentProgressType = $paymentProgressTypeExists
        ? ($paymentProgressTypeRaw === 'amount' ? 'amount' : ($paymentProgressTypeRaw === 'percent' ? 'percent' : null))
        : null;
    if ($paymentProgressTypeExists && $paymentProgressTypeRaw !== '' && $paymentProgressType === null) {
        $errors['payment_progress_type'] = 'Payment progress type must be amount or percent';
    }

    $paymentProgressValueExists = array_key_exists('payment_progress_value', $payload) || (!$isUpdate && $paymentProgressTypeExists);
    $paymentProgressValue = $paymentProgressValueExists ? (float) ($payload['payment_progress_value'] ?? 0) : null;
    if ($paymentProgressValueExists && $paymentProgressValue < 0) {
        $errors['payment_progress_value'] = 'Payment progress value must be zero or greater';
    }
    if ($paymentProgressType === 'percent' && $paymentProgressValue !== null && $paymentProgressValue > 100) {
        $errors['payment_progress_value'] = 'Payment progress percentage must be 100 or less';
    }

    // Optional: project status normalisation
    $statusExists = array_key_exists('status', $payload);
    $statusRaw = $statusExists ? (string) $payload['status'] : '';
    $normalizedProjectStatus = null;
    if ($statusExists) {
        $normalizedProjectStatus = normaliseProjectStatus($statusRaw);
        if ($normalizedProjectStatus === null) {
            $errors['status'] = 'Project status must be upcoming, ongoing, completed or cancelled';
        }
    }

    // Optional: cancelled boolean flag (accept multiple aliases)
    $cancelledExists = array_key_exists('cancelled', $payload)
        || array_key_exists('canceled', $payload)
        || array_key_exists('is_cancelled', $payload)
        || array_key_exists('isCanceled', $payload);
    $cancelledValue = null;
    if ($cancelledExists) {
        $rawCancelled = $payload['cancelled']
            ?? $payload['canceled']
            ?? $payload['is_cancelled']
            ?? $payload['isCanceled']
            ?? null;
        $cancelledValue = filter_var($rawCancelled, FILTER_VALIDATE_BOOLEAN);
    }

    $expensesExists = array_key_exists('expenses', $payload);
    $expenses = $expensesExists ? $payload['expenses'] : null;
    $normalizedExpenses = null;
    $expensesTotal = 0.0;
    if ($expensesExists) {
        if ($expenses === null) {
            $normalizedExpenses = [];
        } elseif (!is_array($expenses)) {
            $errors['expenses'] = 'Expenses must be an array';
        } else {
            $normalizedExpenses = [];
            foreach ($expenses as $index => $expense) {
                if (!is_array($expense)) {
                    $errors["expenses.$index"] = 'Expense must be an object';
                    continue;
                }

                $label = trim((string) ($expense['label'] ?? ''));
                $amount = isset($expense['amount']) ? (float) $expense['amount'] : 0.0;
                // Accept both sale_price and salePrice keys
                $salePrice = isset($expense['sale_price'])
                    ? (float) $expense['sale_price']
                    : (isset($expense['salePrice']) ? (float) $expense['salePrice'] : 0.0);
                // Accept note synonyms (note, notes, description)
                $noteRaw = $expense['note'] ?? ($expense['notes'] ?? ($expense['description'] ?? ''));
                $note = trim((string) $noteRaw);

                if ($label === '') {
                    $errors["expenses.$index.label"] = 'Expense label is required';
                } elseif (mb_strlen($label) > 255) {
                    $errors["expenses.$index.label"] = 'Expense label must be 255 characters or fewer';
                }

                if ($amount < 0) {
                    $errors["expenses.$index.amount"] = 'Expense amount must be zero or greater';
                }
                if ($salePrice < 0) {
                    $errors["expenses.$index.sale_price"] = 'Expense sale price must be zero or greater';
                }
                if ($note !== '' && mb_strlen($note) > 1000) {
                    $errors["expenses.$index.note"] = 'Expense note must be 1000 characters or fewer';
                }

                if (!isset($errors["expenses.$index.label"]) && !isset($errors["expenses.$index.amount"]) && !isset($errors["expenses.$index.sale_price"])) {
                    $normalizedExpenses[] = [
                        'label' => $label,
                        'amount' => round($amount, 2),
                        'sale_price' => round($salePrice, 2),
                        'note' => $note !== '' ? $note : null,
                    ];
                    $expensesTotal += round($amount, 2);
                }
            }
        }
    }

    $paymentsExists = array_key_exists('payments', $payload)
        || array_key_exists('payment_history', $payload)
        || array_key_exists('paymentHistory', $payload);
    $rawPaymentsPayload = $paymentsExists
        ? ($payload['payments'] ?? ($payload['payment_history'] ?? ($payload['paymentHistory'] ?? [])))
        : null;
    $normalizedPayments = null;
    if ($paymentsExists) {
        $normalizedPayments = normaliseProjectPaymentsPayload($rawPaymentsPayload, $errors);
    }

    $expensesTotalExists = array_key_exists('expenses_total', $payload) || (!$isUpdate && $expensesExists);
    $expensesTotalPayload = $expensesTotalExists ? (float) ($payload['expenses_total'] ?? 0) : null;
    if ($expensesTotalExists) {
        $expensesTotal = $expensesExists ? $expensesTotal : ($expensesTotalPayload ?? 0);
        if ($expensesTotal < 0) {
            $errors['expenses_total'] = 'Expenses total must be zero or greater';
        }
    }

    if ($applyTaxExists && $applyTax === false) {
        $companyShareEnabled = false;
        $companySharePercent = 0;
        $companyShareAmount = 0;
        $companyShareEnabledExists = true;
        $companySharePercentExists = true;
        $companyShareAmountExists = true;
    }

    $techniciansExists = array_key_exists('technicians', $payload);
    $technicians = $techniciansExists ? $payload['technicians'] : null;
    $normalizedTechnicians = null;
    if ($techniciansExists) {
        if ($technicians === null) {
            $normalizedTechnicians = [];
        } elseif (!is_array($technicians)) {
            $errors['technicians'] = 'Technicians must be an array';
        } else {
            $normalizedTechnicians = [];
            foreach ($technicians as $index => $technicianId) {
                $techId = (int) $technicianId;
                if (!$techId) {
                    $errors["technicians.$index"] = 'Technician id is required';
                    continue;
                }
                if (!technicianExists($pdo, $techId)) {
                    $errors["technicians.$index"] = 'Technician not found';
                    continue;
                }
                $normalizedTechnicians[] = $techId;
            }
        }
    }

    $equipmentExists = array_key_exists('equipment', $payload);
    $equipment = $equipmentExists ? $payload['equipment'] : null;
    $normalizedEquipment = null;
    if ($equipmentExists) {
        if ($equipment === null) {
            $normalizedEquipment = [];
        } elseif (!is_array($equipment)) {
            $errors['equipment'] = 'Equipment must be an array';
        } else {
            $normalizedEquipment = [];
            foreach ($equipment as $index => $item) {
                if (!is_array($item)) {
                    $errors["equipment.$index"] = 'Equipment entry must be an object';
                    continue;
                }
                $equipmentId = isset($item['equipment_id']) ? (int) $item['equipment_id'] : 0;
                $quantity = isset($item['quantity']) ? (int) $item['quantity'] : 1;
                if (!$equipmentId) {
                    $errors["equipment.$index.equipment_id"] = 'Equipment id is required';
                } elseif (!equipmentExists($pdo, $equipmentId)) {
                    $errors["equipment.$index.equipment_id"] = 'Equipment not found';
                }
                if ($quantity < 1) {
                    $errors["equipment.$index.quantity"] = 'Quantity must be at least 1';
                }

                if (!isset($errors["equipment.$index.equipment_id"]) && !isset($errors["equipment.$index.quantity"])) {
                    $normalizedEquipment[] = [
                        'equipment_id' => $equipmentId,
                        'quantity' => $quantity,
                    ];
                }
            }
        }
    }

    $confirmedExists = array_key_exists('confirmed', $payload) || !$isUpdate;
    $confirmed = $confirmedExists ? filter_var($payload['confirmed'] ?? false, FILTER_VALIDATE_BOOLEAN) : null;

    $projectCodeExists = array_key_exists('project_code', $payload) || !$isUpdate;
    $projectCode = $projectCodeExists ? trim((string) ($payload['project_code'] ?? '')) : null;
    if ($projectCodeExists && $projectCode !== '') {
        if (mb_strlen($projectCode) > 50) {
            $errors['project_code'] = 'Project code must be 50 characters or fewer';
        } elseif (projectCodeExists($pdo, $projectCode, $projectId)) {
            $errors['project_code'] = 'Project code already exists';
        }
    }

    if ($errors) {
        return [
            [
                'fields' => [],
                'technicians' => null,
                'equipment' => null,
                'expenses' => null,
                'payments' => null,
            ],
            $errors,
        ];
    }

    if ($titleExists) {
        $fields['title'] = $title;
    }
    if ($typeExists) {
        $fields['type'] = $type;
    }
    if ($clientExists) {
        $fields['client_id'] = $clientId;
    }
    if ($clientCompanyExists) {
        $fields['client_company'] = $clientCompany !== '' ? $clientCompany : null;
    }
    if ($descriptionExists) {
        $fields['description'] = $description !== null ? $description : null;
    }
    if ($startExists) {
        $fields['start_datetime'] = $start;
    }
    if ($endExists) {
        $fields['end_datetime'] = $end !== '' ? $end : null;
    }
    if ($applyTaxExists) {
        $fields['apply_tax'] = $applyTax ? 1 : 0;
    }
    if ($paymentStatusExists) {
        $fields['payment_status'] = $paymentStatus ?? 'unpaid';
    }
    if ($equipmentEstimateExists) {
        $fields['equipment_estimate'] = $equipmentEstimate !== null ? round($equipmentEstimate, 2) : 0;
    }
    if ($expensesTotalExists) {
        $fields['expenses_total'] = round($expensesTotal, 2);
    }
    if ($servicesClientPriceExists) {
        $fields['services_client_price'] = $servicesClientPrice !== null ? round($servicesClientPrice, 2) : 0;
    }
    if ($taxAmountExists) {
        $fields['tax_amount'] = $taxAmount !== null ? round($taxAmount, 2) : 0;
    }
    if ($totalWithTaxExists) {
        $fields['total_with_tax'] = $totalWithTax !== null ? round($totalWithTax, 2) : 0;
    }
    if ($discountExists) {
        $fields['discount'] = $discount !== null ? round($discount, 2) : 0;
    }
    if ($discountTypeExists) {
        $fields['discount_type'] = $discountType ?? 'percent';
    }
    if ($companyShareEnabledExists) {
        $fields['company_share_enabled'] = $companyShareEnabled ? 1 : 0;
    }
    if ($companySharePercentExists) {
        $fields['company_share_percent'] = $companySharePercent !== null ? round($companySharePercent, 2) : 0;
    }
    if ($companyShareAmountExists) {
        $fields['company_share_amount'] = $companyShareAmount !== null ? round($companyShareAmount, 2) : 0;
    }
    if ($paidAmountExists) {
        $fields['paid_amount'] = $paidAmount !== null ? round($paidAmount, 2) : 0;
    }
    if ($paidPercentageExists) {
        $fields['paid_percentage'] = $paidPercentage !== null ? round($paidPercentage, 2) : 0;
    }
    if ($paymentProgressTypeExists) {
        $fields['payment_progress_type'] = $paymentProgressType ?? null;
    }
    if ($paymentProgressValueExists) {
        $fields['payment_progress_value'] = $paymentProgressValue !== null ? round($paymentProgressValue, 2) : null;
    }
    if ($confirmedExists) {
        $fields['confirmed'] = $confirmed ? 1 : 0;
    }
    if ($projectCodeExists) {
        $fields['project_code'] = $projectCode;
    }

    // Persist project status/cancelled only if columns exist and values provided
    if ($hasStatusColumn && $statusExists && $normalizedProjectStatus !== null) {
        $fields['status'] = $normalizedProjectStatus;
    }
    if ($hasCancelledColumn && $cancelledExists && $cancelledValue !== null) {
        $fields['cancelled'] = $cancelledValue ? 1 : 0;
        // If explicitly cancelled, default status to cancelled when applicable
        if ($hasStatusColumn && (!isset($fields['status']) || $fields['status'] === null) && $cancelledValue) {
            $fields['status'] = 'cancelled';
        }
    }

    $now = date('Y-m-d H:i:s');
    if (!$isUpdate) {
        $fields['created_at'] = $now;
    }
    $fields['updated_at'] = $now;

    return [
        [
            'fields' => $fields,
            'technicians' => $techniciansExists ? ($normalizedTechnicians ?? []) : null,
            'equipment' => $equipmentExists ? ($normalizedEquipment ?? []) : null,
            'expenses' => $expensesExists ? ($normalizedExpenses ?? []) : null,
            'payments' => $paymentsExists ? ($normalizedPayments ?? []) : null,
        ],
        $errors,
    ];
}

function insertProject(PDO $pdo, array $data): int
{
    $columns = array_keys($data);
    $placeholders = array_map(static fn($column) => ':' . $column, $columns);

    $sql = sprintf(
        'INSERT INTO projects (%s) VALUES (%s)',
        implode(', ', $columns),
        implode(', ', $placeholders)
    );

    $statement = $pdo->prepare($sql);
    $statement->execute($data);

    return (int) $pdo->lastInsertId();
}

function updateProject(PDO $pdo, int $id, array $data): void
{
    if (!$data) {
        return;
    }

    $assignments = [];
    foreach ($data as $column => $value) {
        $assignments[] = sprintf('%s = :%s', $column, $column);
    }

    $sql = sprintf('UPDATE projects SET %s WHERE id = :id', implode(', ', $assignments));

    $data['id'] = $id;
    $statement = $pdo->prepare($sql);
    $statement->execute($data);
}

function syncProjectTechnicians(PDO $pdo, int $projectId, array $technicians): void
{
    $statement = $pdo->prepare('DELETE FROM project_technicians WHERE project_id = :project_id');
    $statement->execute(['project_id' => $projectId]);

    if (!$technicians) {
        return;
    }

    $insert = $pdo->prepare('INSERT INTO project_technicians (project_id, technician_id) VALUES (:project_id, :technician_id)');
    foreach ($technicians as $technicianId) {
        $insert->execute([
            'project_id' => $projectId,
            'technician_id' => $technicianId,
        ]);
    }
}

function syncProjectEquipment(PDO $pdo, int $projectId, array $equipment): void
{
    $statement = $pdo->prepare('DELETE FROM project_equipment WHERE project_id = :project_id');
    $statement->execute(['project_id' => $projectId]);

    if (!$equipment) {
        return;
    }

    $insert = $pdo->prepare('INSERT INTO project_equipment (project_id, equipment_id, quantity) VALUES (:project_id, :equipment_id, :quantity)');
    foreach ($equipment as $item) {
        $insert->execute([
            'project_id' => $projectId,
            'equipment_id' => (int) $item['equipment_id'],
            'quantity' => (int) $item['quantity'],
        ]);
    }
}

function syncProjectExpenses(PDO $pdo, int $projectId, array $expenses): void
{
    $statement = $pdo->prepare('DELETE FROM project_expenses WHERE project_id = :project_id');
    $statement->execute(['project_id' => $projectId]);

    if (!$expenses) {
        return;
    }

    // Build robust inserter that tries (note) then (notes) then (no note) without relying on SHOW COLUMNS permissions
    $mode = null; // 'note' | 'notes' | 'none'
    $insert = null;

    $prepareForMode = static function (PDO $pdo, string $mode) {
        if ($mode === 'note') {
            return $pdo->prepare('INSERT INTO project_expenses (project_id, label, amount, sale_price, note) VALUES (:project_id, :label, :amount, :sale_price, :note)');
        }
        if ($mode === 'notes') {
            return $pdo->prepare('INSERT INTO project_expenses (project_id, label, amount, sale_price, notes) VALUES (:project_id, :label, :amount, :sale_price, :note)');
        }
        // none
        return $pdo->prepare('INSERT INTO project_expenses (project_id, label, amount, sale_price) VALUES (:project_id, :label, :amount, :sale_price)');
    };

    // Try to prepare with note then notes; if both fail, fall back to none
    foreach (['note', 'notes', 'none'] as $candidate) {
        try {
            $insert = $prepareForMode($pdo, $candidate);
            $mode = $candidate;
            break;
        } catch (\Throwable $_) {
            $insert = null;
            $mode = null;
            continue;
        }
    }

    foreach ($expenses as $expense) {
        $params = [
            'project_id' => $projectId,
            'label' => $expense['label'],
            'amount' => $expense['amount'],
            'sale_price' => $expense['sale_price'] ?? 0,
        ];
        $noteValue = $expense['note'] ?? ($expense['notes'] ?? null);

        // Attempt execution with current mode; if unknown column error occurs at runtime, fall through to next mode
        $modesToTry = $mode ? [$mode] : [];
        if (!$modesToTry) {
            $modesToTry = ['note', 'notes', 'none'];
        }

        $executed = false;
        foreach ($modesToTry as $tryMode) {
            try {
                // Re-prepare if mode differs from current prepared statement
                if ($insert === null || $tryMode !== $mode) {
                    $insert = $prepareForMode($pdo, $tryMode);
                    $mode = $tryMode;
                }
                $execParams = $params;
                if ($tryMode === 'note' || $tryMode === 'notes') {
                    $execParams['note'] = $noteValue;
                }
                $insert->execute($execParams);
                $executed = true;
                break;
            } catch (\PDOException $e) {
                $message = strtolower($e->getMessage());
                $unknownColumn = (strpos($message, "unknown column 'note'") !== false) || (strpos($message, 'unknown column \"note\"') !== false) || (strpos($message, "unknown column 'notes'") !== false) || (strpos($message, 'unknown column \"notes\"') !== false);
                if ($unknownColumn) {
                    // Try next mode
                    $insert = null;
                    $mode = null;
                    continue;
                }
                // Re-throw other DB errors
                throw $e;
            }
        }

        if (!$executed) {
            // As a last resort, insert without note
            $insert = $prepareForMode($pdo, 'none');
            $insert->execute($params);
            $mode = 'none';
        }
    }
}

function fetchProjectById(PDO $pdo, int $id): ?array
{
    $statement = $pdo->prepare(
        'SELECT p.*, c.full_name AS client_name
         FROM projects p
         INNER JOIN customers c ON c.id = p.client_id
         WHERE p.id = :id'
    );
    $statement->execute(['id' => $id]);
    $row = $statement->fetch();

    if (!$row) {
        return null;
    }

    return mapProjectRow($pdo, $row);
}

function mapProjectRow(PDO $pdo, array $row): array
{
    $projectId = (int) $row['id'];
    $payments = fetchProjectPayments($pdo, $projectId);

    return [
        'id' => $projectId,
        'project_code' => $row['project_code'],
        'title' => $row['title'],
        'type' => $row['type'],
        'client_id' => (int) $row['client_id'],
        'client_company' => $row['client_company'],
        'description' => $row['description'],
        'start_datetime' => $row['start_datetime'],
        'end_datetime' => $row['end_datetime'],
        'apply_tax' => (bool) $row['apply_tax'],
        // Optional cancellation fields (guard when columns are absent)
        'status' => $row['status'] ?? null,
        'cancelled' => isset($row['cancelled']) ? (bool) $row['cancelled'] : null,
        'payment_status' => $row['payment_status'],
        'discount' => isset($row['discount']) ? (float) $row['discount'] : 0.0,
        'discount_type' => $row['discount_type'] ?? 'percent',
        'company_share_enabled' => isset($row['company_share_enabled']) ? (bool) $row['company_share_enabled'] : false,
        'company_share_percent' => isset($row['company_share_percent']) ? (float) $row['company_share_percent'] : 0.0,
        'company_share_amount' => isset($row['company_share_amount']) ? (float) $row['company_share_amount'] : 0.0,
        'equipment_estimate' => (float) $row['equipment_estimate'],
        'expenses_total' => (float) $row['expenses_total'],
        'services_client_price' => isset($row['services_client_price']) ? (float) $row['services_client_price'] : 0.0,
        'tax_amount' => (float) $row['tax_amount'],
        'total_with_tax' => (float) $row['total_with_tax'],
        'paid_amount' => isset($row['paid_amount']) ? (float) $row['paid_amount'] : 0.0,
        'paid_percentage' => isset($row['paid_percentage']) ? (float) $row['paid_percentage'] : 0.0,
        'payment_progress_type' => $row['payment_progress_type'] ?? null,
        'payment_progress_value' => isset($row['payment_progress_value']) ? (float) $row['payment_progress_value'] : null,
        'confirmed' => (bool) $row['confirmed'],
        'created_at' => $row['created_at'],
        'updated_at' => $row['updated_at'],
        'technicians' => fetchProjectTechnicians($pdo, $projectId),
        'equipment' => fetchProjectEquipment($pdo, $projectId),
        'expenses' => fetchProjectExpenses($pdo, $projectId),
        'payment_history' => $payments,
        'paymentHistory' => $payments,
    ];
}

function fetchProjectTechnicians(PDO $pdo, int $projectId): array
{
    $statement = $pdo->prepare(
        'SELECT pt.technician_id, t.full_name
         FROM project_technicians pt
         LEFT JOIN technicians t ON t.id = pt.technician_id
         WHERE pt.project_id = :project_id'
    );
    $statement->execute(['project_id' => $projectId]);

    $technicians = [];
    while ($row = $statement->fetch()) {
        $technicians[] = [
            'id' => (int) $row['technician_id'],
            'name' => $row['full_name'],
        ];
    }

    return $technicians;
}

function fetchProjectPayments(PDO $pdo, int $projectId): array
{
    $statement = $pdo->prepare(
        'SELECT id, payment_type, value, amount, percentage, note, recorded_at
         FROM project_payments
         WHERE project_id = :project_id
         ORDER BY recorded_at ASC, id ASC'
    );
    $statement->execute(['project_id' => $projectId]);

    $payments = [];
    while ($row = $statement->fetch()) {
        $payments[] = [
            'id' => (int) $row['id'],
            'type' => $row['payment_type'],
            'value' => isset($row['value']) ? (float) $row['value'] : null,
            'amount' => isset($row['amount']) ? (float) $row['amount'] : null,
            'percentage' => isset($row['percentage']) ? (float) $row['percentage'] : null,
            'note' => $row['note'],
            'recordedAt' => $row['recorded_at'],
            'recorded_at' => $row['recorded_at'],
        ];
    }

    return $payments;
}

function syncProjectPayments(PDO $pdo, int $projectId, array $payments): void
{
    $pdo->prepare('DELETE FROM project_payments WHERE project_id = :id')->execute(['id' => $projectId]);

    if (!$payments) {
        return;
    }

    $insert = $pdo->prepare(
        'INSERT INTO project_payments (
            project_id,
            payment_type,
            value,
            amount,
            percentage,
            note,
            recorded_at
        ) VALUES (
            :project_id,
            :payment_type,
            :value,
            :amount,
            :percentage,
            :note,
            :recorded_at
        )'
    );

    foreach ($payments as $payment) {
        $insert->execute([
            'project_id' => $projectId,
            'payment_type' => $payment['payment_type'],
            'value' => $payment['value'],
            'amount' => $payment['amount'],
            'percentage' => $payment['percentage'],
            'note' => $payment['note'] ?? null,
            'recorded_at' => $payment['recorded_at'] ?? date('Y-m-d H:i:s'),
        ]);
    }
}

function normaliseProjectPaymentsPayload(mixed $payload, array &$errors): array
{
    if ($payload === null) {
        return [];
    }

    if (!is_array($payload)) {
        $errors['payments'] = 'Payments must be an array';
        return [];
    }

    $normalized = [];

    foreach ($payload as $index => $entry) {
        if (!is_array($entry)) {
            $errors[sprintf('payments.%d', $index)] = 'Payment entry must be an object';
            continue;
        }

        $typeRaw = $entry['type'] ?? $entry['payment_type'] ?? null;
        $type = $typeRaw !== null ? strtolower(trim((string) $typeRaw)) : null;

        if (!in_array($type, ['amount', 'percent'], true)) {
            $errors[sprintf('payments.%d.type', $index)] = 'Payment type must be amount or percent';
            continue;
        }

        $value = parseProjectDecimalValue($entry['value'] ?? null);
        $amount = parseProjectDecimalValue($entry['amount'] ?? null);
        $percentage = parseProjectDecimalValue($entry['percentage'] ?? null);

        if ($type === 'amount' && $amount === null && $value !== null) {
            $amount = $value;
        }

        if ($type === 'percent' && $percentage === null && $value !== null) {
            $percentage = $value;
        }

        if ($amount !== null && $amount < 0) {
            $errors[sprintf('payments.%d.amount', $index)] = 'Payment amount must be zero or greater';
            continue;
        }

        if ($percentage !== null && ($percentage < 0 || $percentage > 100)) {
            $errors[sprintf('payments.%d.percentage', $index)] = 'Payment percentage must be between 0 and 100';
            continue;
        }

        if ($amount === null && $percentage === null && $value === null) {
            $errors[sprintf('payments.%d.value', $index)] = 'Payment entry requires amount or percentage';
            continue;
        }

        $noteRaw = isset($entry['note']) ? trim((string) $entry['note']) : null;
        if ($noteRaw !== null && $noteRaw !== '' && mb_strlen($noteRaw) > 500) {
            $errors[sprintf('payments.%d.note', $index)] = 'Payment note must be 500 characters or less';
            continue;
        }
        $note = $noteRaw === '' ? null : $noteRaw;

        $recordedAtRaw = $entry['recorded_at'] ?? $entry['recordedAt'] ?? null;
        if ($recordedAtRaw) {
            $timestamp = strtotime((string) $recordedAtRaw);
            if ($timestamp === false) {
                $errors[sprintf('payments.%d.recorded_at', $index)] = 'Payment recorded_at must be a valid date/time';
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

function parseProjectDecimalValue(mixed $value): ?float
{
    if ($value === null || $value === '') {
        return null;
    }

    if (is_numeric($value)) {
        return (float) $value;
    }

    if (is_string($value)) {
        $normalized = str_replace(['%', '٬', '،', ',', ' '], '', $value);
        if ($normalized === '') {
            return null;
        }
        if (is_numeric($normalized)) {
            return (float) $normalized;
        }
    }

    return null;
}

function fetchProjectEquipment(PDO $pdo, int $projectId): array
{
    $statement = $pdo->prepare(
        'SELECT pe.id, pe.equipment_id, pe.quantity, e.barcode, e.description, e.name
         FROM project_equipment pe
         INNER JOIN equipment e ON e.id = pe.equipment_id
         WHERE pe.project_id = :project_id'
    );
    $statement->execute(['project_id' => $projectId]);

    $equipment = [];
    while ($row = $statement->fetch()) {
        $equipment[] = [
            'id' => (int) $row['id'],
            'equipment_id' => (int) $row['equipment_id'],
            'quantity' => (int) $row['quantity'],
            'barcode' => $row['barcode'],
            'description' => $row['description'] ?? $row['name'],
            'name' => $row['name'],
        ];
    }

    return $equipment;
}

function fetchProjectExpenses(PDO $pdo, int $projectId): array
{
    // Prefer selecting sale_price and note; gracefully fall back if the columns don't exist
    try {
        $statement = $pdo->prepare(
            'SELECT id, label, amount, sale_price, note
             FROM project_expenses
             WHERE project_id = :project_id'
        );
        $statement->execute(['project_id' => $projectId]);
    } catch (\PDOException $e) {
        $message = strtolower($e->getMessage());
        $hasSale = !(strpos($message, "unknown column 'sale_price'") !== false || strpos($message, 'unknown column \"sale_price\"') !== false);
        $hasNote = !(strpos($message, "unknown column 'note'") !== false || strpos($message, 'unknown column \"note\"') !== false);
        $hasNotes = projectExpensesHasColumn($pdo, 'notes');
        if (!$hasSale || !$hasNote) {
            $columns = ['id', 'label', 'amount'];
            if ($hasSale) $columns[] = 'sale_price';
            if ($hasNote) {
                $columns[] = 'note';
            } elseif ($hasNotes) {
                $columns[] = 'notes';
            }
            $sql = sprintf('SELECT %s FROM project_expenses WHERE project_id = :project_id', implode(', ', $columns));
            $statement = $pdo->prepare($sql);
            $statement->execute(['project_id' => $projectId]);
        } else {
            throw $e;
        }
    }

    $expenses = [];
    while ($row = $statement->fetch()) {
        $expenses[] = [
            'id' => (int) $row['id'],
            'label' => $row['label'],
            'amount' => (float) $row['amount'],
            'sale_price' => isset($row['sale_price']) ? (float) $row['sale_price'] : 0.0,
            // Unify possible legacy `notes` column
            'note' => $row['note'] ?? ($row['notes'] ?? null),
        ];
    }

    return $expenses;
}

function normalizePaymentStatus(?string $status): ?string
{
    if ($status === null) {
        return null;
    }

    $normalized = strtolower(trim($status));

    return match ($normalized) {
        'paid', 'مدفوع' => 'paid',
        'partial', 'partially_paid', 'partial_paid', 'مدفوع جزئياً', 'مدفوع جزئيا' => 'partial',
        'unpaid', 'غير مدفوع' => 'unpaid',
        default => null,
    };
}

/**
 * Normalize project status to one of: upcoming, ongoing, completed, cancelled
 */
function normaliseProjectStatus(?string $status): ?string
{
    if ($status === null) {
        return null;
    }

    $normalized = strtolower(trim($status));

    return match ($normalized) {
        'upcoming', 'قادم' => 'upcoming',
        'ongoing', 'in_progress', 'in-progress', 'قيد التنفيذ', 'جاري' => 'ongoing',
        'completed', 'مكتمل', 'منتهي', 'منتهية' => 'completed',
        'cancelled', 'canceled', 'ملغي', 'ملغى', 'ملغية' => 'cancelled',
        default => null,
    };
}

/**
 * Ensure projects table has columns for status/cancelled. Best-effort and cached per request.
 */
function ensureProjectCancellationColumns(PDO $pdo): void
{
    static $checked = false;
    if ($checked) {
        return;
    }

    try {
        $statusExists = false;
        $cancelledExists = false;

        try {
            $stmt = $pdo->query("SHOW COLUMNS FROM projects LIKE 'status'");
            $statusExists = (bool) ($stmt && $stmt->fetch());
        } catch (Throwable $_) { $statusExists = false; }

        try {
            $stmt2 = $pdo->query("SHOW COLUMNS FROM projects LIKE 'cancelled'");
            $cancelledExists = (bool) ($stmt2 && $stmt2->fetch());
        } catch (Throwable $_) { $cancelledExists = false; }

        if (!$statusExists) {
            try {
                $pdo->exec("ALTER TABLE projects ADD COLUMN status VARCHAR(50) NULL DEFAULT NULL AFTER end_datetime");
            } catch (Throwable $_) { /* ignore add failure */ }
        }
        if (!$cancelledExists) {
            try {
                $pdo->exec("ALTER TABLE projects ADD COLUMN cancelled TINYINT(1) NOT NULL DEFAULT 0 AFTER status");
            } catch (Throwable $_) { /* ignore add failure */ }
        }
    } catch (Throwable $e) {
        // Log and continue; cancellation linkage will still be handled at reservation level
        error_log('ensureProjectCancellationColumns failed: ' . $e->getMessage());
    } finally {
        $checked = true;
    }
}

// Check if a column exists on project_expenses table
function projectExpensesHasColumn(PDO $pdo, string $column): bool
{
    try {
        $stmt = $pdo->prepare('SHOW COLUMNS FROM project_expenses LIKE :col');
        $stmt->execute(['col' => $column]);
        return (bool) $stmt->fetchColumn();
    } catch (Throwable $_) {
        return false;
    }
}

// Ensure project_expenses has an optional notes column
function ensureProjectExpensesNotesColumn(PDO $pdo): void
{
    static $checked = false;
    if ($checked) return;
    try {
        if (!projectExpensesHasColumn($pdo, 'note')) {
            $pdo->exec("ALTER TABLE project_expenses ADD COLUMN note TEXT NULL DEFAULT NULL AFTER sale_price");
        }
    } catch (Throwable $_) {
        // best-effort only
    } finally {
        $checked = true;
    }
}

function projectExists(PDO $pdo, int $id): bool
{
    $statement = $pdo->prepare('SELECT id FROM projects WHERE id = :id');
    $statement->execute(['id' => $id]);
    return (bool) $statement->fetchColumn();
}

function projectCodeExists(PDO $pdo, string $code, ?int $excludeId = null): bool
{
    $sql = 'SELECT id FROM projects WHERE project_code = :code';
    $params = ['code' => $code];

    if ($excludeId) {
        $sql .= ' AND id <> :exclude';
        $params['exclude'] = $excludeId;
    }

    $statement = $pdo->prepare($sql);
    $statement->execute($params);
    return (bool) $statement->fetchColumn();
}

function customerExists(PDO $pdo, int $id): bool
{
    $statement = $pdo->prepare('SELECT id FROM customers WHERE id = :id');
    $statement->execute(['id' => $id]);
    return (bool) $statement->fetchColumn();
}

function technicianExists(PDO $pdo, int $id): bool
{
    $statement = $pdo->prepare('SELECT id FROM technicians WHERE id = :id');
    $statement->execute(['id' => $id]);
    return (bool) $statement->fetchColumn();
}

function equipmentExists(PDO $pdo, int $id): bool
{
    $statement = $pdo->prepare('SELECT id FROM equipment WHERE id = :id');
    $statement->execute(['id' => $id]);
    return (bool) $statement->fetchColumn();
}

function generateProjectCode(PDO $pdo): string
{
    $statement = $pdo->query(
        "SELECT project_code FROM projects WHERE project_code REGEXP '^PRJ-[0-9]+$' ORDER BY CAST(SUBSTRING(project_code, 5) AS UNSIGNED) DESC LIMIT 1"
    );

    $lastCode = $statement ? $statement->fetchColumn() : null;
    $sequence = 1;

    if ($lastCode && preg_match('/^PRJ-(\d+)$/', $lastCode, $matches)) {
        $sequence = ((int) $matches[1]) + 1;
    }

    do {
        $candidate = sprintf('PRJ-%04d', $sequence);
        $sequence++;
    } while (projectCodeExists($pdo, $candidate));

    return $candidate;
}

function isValidDateTime(string $dateTime): bool
{
    $timestamp = strtotime($dateTime);
    return $timestamp !== false;
}

function readJsonPayload(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new InvalidArgumentException('Invalid JSON payload');
    }

    return is_array($data) ? $data : [];
}
