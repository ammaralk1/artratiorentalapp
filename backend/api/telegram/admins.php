<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use Throwable;

try {
    requireRole('admin');
    $pdo = getDatabaseConnection();

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
        respondError('Method not allowed', 405);
        exit;
    }

    // Ensure table exists
    $chk = $pdo->query("SHOW TABLES LIKE 'telegram_links'");
    if (!$chk || !$chk->fetch()) {
        respond([]);
        exit;
    }

    $stmt = $pdo->query("SELECT DISTINCT chat_id, MAX(used_at) AS last_used_at FROM telegram_links WHERE context = 'admin' AND chat_id IS NOT NULL AND used_at IS NOT NULL GROUP BY chat_id ORDER BY last_used_at DESC, chat_id ASC");
    $items = [];
    while ($row = $stmt->fetch()) {
        $items[] = [
            'chat_id' => (string)($row['chat_id'] ?? ''),
            'last_used_at' => $row['last_used_at'] ?? null,
        ];
    }

    respond($items);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}

