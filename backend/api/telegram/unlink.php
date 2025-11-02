<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/telegram.php';

use InvalidArgumentException;
use PDO;
use Throwable;

function readJsonBody(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false) return [];
    $raw = trim($raw);
    if ($raw === '') return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

try {
    requireRole('admin');
    $pdo = getDatabaseConnection();

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        respondError('Method not allowed', 405);
        exit;
    }

    $payload = readJsonBody();
    $target = strtolower(trim((string)($payload['target'] ?? $payload['type'] ?? '')));
    if ($target !== 'technician' && $target !== 'admin') {
        throw new InvalidArgumentException('Invalid target');
    }

    $result = [
        'target' => $target,
        'updated' => 0,
        'links_cleared' => 0,
        'deleted' => 0,
    ];

    // Check if telegram_links table/columns exist
    $hasLinksTable = false;
    $hasContextCol = false;
    $hasPhoneCol = false;
    $hasUsedAtCol = false;
    try {
        $chk = $pdo->query("SHOW TABLES LIKE 'telegram_links'");
        $hasLinksTable = $chk && $chk->fetch() ? true : false;
        if ($hasLinksTable) {
            $c1 = $pdo->query("SHOW COLUMNS FROM telegram_links LIKE 'context'");
            $hasContextCol = $c1 && $c1->fetch() ? true : false;
            $c2 = $pdo->query("SHOW COLUMNS FROM telegram_links LIKE 'phone'");
            $hasPhoneCol = $c2 && $c2->fetch() ? true : false;
            $c3 = $pdo->query("SHOW COLUMNS FROM telegram_links LIKE 'used_at'");
            $hasUsedAtCol = $c3 && $c3->fetch() ? true : false;
        }
    } catch (Throwable $_) { $hasLinksTable = false; }
    // Check technicians table has telegram_chat_id column (migration may be pending)
    $hasTechChatCol = false;
    try {
        $cT = $pdo->query("SHOW COLUMNS FROM technicians LIKE 'telegram_chat_id'");
        $hasTechChatCol = $cT && $cT->fetch() ? true : false;
    } catch (Throwable $_) { $hasTechChatCol = false; }

    if ($target === 'technician') {
        $technicianId = isset($payload['technician_id']) ? (int)$payload['technician_id'] : 0;
        $chatId = trim((string)($payload['chat_id'] ?? ''));
        if ($technicianId <= 0 && $chatId === '') {
            throw new InvalidArgumentException('Provide technician_id or chat_id');
        }

        // Resolve technician by chat_id if needed
        if ($technicianId <= 0 && $chatId !== '') {
            $s = $pdo->prepare('SELECT id FROM technicians WHERE telegram_chat_id = :cid LIMIT 1');
            $s->execute(['cid' => $chatId]);
            $technicianId = (int) ($s->fetchColumn() ?: 0);
        }
        if ($technicianId <= 0) {
            throw new InvalidArgumentException('Technician not found');
        }

        // Get phone for phone-based link cleanup
        $digits = '';
        try {
            $s = $pdo->prepare('SELECT phone FROM technicians WHERE id = :id LIMIT 1');
            $s->execute(['id' => $technicianId]);
            $ph = (string)($s->fetchColumn() ?: '');
            $digits = $ph !== '' ? telegramNormalizePhone($ph) : '';
        } catch (Throwable $_) {}

        // Clear technician chat id if column exists
        if ($hasTechChatCol) {
            $stmt = $pdo->prepare('UPDATE technicians SET telegram_chat_id = NULL WHERE id = :id');
            $stmt->execute(['id' => $technicianId]);
            $result['updated'] = (int)$stmt->rowCount();
        } else {
            $result['updated'] = 0;
        }

        // Clear related link rows so UI does not consider them linked anymore
        if ($hasLinksTable) {
            // Build dynamic UPDATE based on available columns (context/phone/used_at)
            $params = ['tid' => $technicianId];
            $idConds = ['technician_id = :tid'];
            if ($digits !== '' && $hasPhoneCol) {
                $idConds[] = 'phone = :p';
                $params['p'] = $digits;
            }
            $set = ['chat_id = NULL'];
            if ($hasUsedAtCol) { $set[] = 'used_at = NULL'; }
            $idWhere = count($idConds) > 1 ? ('(' . implode(' OR ', $idConds) . ')') : $idConds[0];
            if ($hasContextCol) {
                $sql = 'UPDATE telegram_links SET ' . implode(', ', $set) . ' WHERE context = \'technician\' AND ' . $idWhere;
            } else {
                $sql = 'UPDATE telegram_links SET ' . implode(', ', $set) . ' WHERE ' . $idWhere;
            }
            $q = $pdo->prepare($sql);
            $q->execute($params);
            $result['links_cleared'] = (int)$q->rowCount();
        }

        logActivity($pdo, 'TELEGRAM_TECH_UNLINK', [ 'technician_id' => $technicianId ]);
        respond($result);
        exit;
    }

    if ($target === 'admin') {
        $chatId = trim((string)($payload['chat_id'] ?? ''));
        if ($chatId === '') {
            throw new InvalidArgumentException('chat_id is required for admin unlink');
        }
        if ($hasLinksTable) {
            if (!$hasContextCol) {
                // On legacy tables we cannot safely distinguish admin vs technician
                respondError('Legacy telegram_links schema missing context column. Please run migrations.', 422);
                exit;
            }
            // Remove admin chat_id entries only
            $d = $pdo->prepare("DELETE FROM telegram_links WHERE context = 'admin' AND chat_id = :cid");
            $d->execute(['cid' => $chatId]);
            $result['deleted'] = (int)$d->rowCount();
        }
        logActivity($pdo, 'TELEGRAM_ADMIN_UNLINK', [ 'chat_id' => $chatId ]);
        respond($result);
        exit;
    }

    respondError('Invalid request', 400);
} catch (InvalidArgumentException $e) {
    respondError($e->getMessage(), 422);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}
