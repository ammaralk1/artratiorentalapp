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

    // Check if telegram_links table exists once
    $hasLinksTable = false;
    try {
        $chk = $pdo->query("SHOW TABLES LIKE 'telegram_links'");
        $hasLinksTable = $chk && $chk->fetch() ? true : false;
    } catch (Throwable $_) { $hasLinksTable = false; }

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

        // Clear technician chat id
        $stmt = $pdo->prepare('UPDATE technicians SET telegram_chat_id = NULL WHERE id = :id');
        $stmt->execute(['id' => $technicianId]);
        $result['updated'] = (int)$stmt->rowCount();

        // Clear related link rows so UI does not consider them linked anymore
        if ($hasLinksTable) {
            // Use OR technician_id match OR phone match; only for technician context
            $params = ['tid' => $technicianId];
            $extra = '';
            if ($digits !== '') { $extra = ' OR phone = :p'; $params['p'] = $digits; }
            $q = $pdo->prepare("UPDATE telegram_links SET chat_id = NULL, used_at = NULL WHERE context = 'technician' AND (technician_id = :tid$extra)");
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
            // Remove admin chat_id entries
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

