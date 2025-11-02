<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use PDO;
use Throwable;

try {
    requireRole('admin');
    $pdo = getDatabaseConnection();

    $checks = [];

    $hasTable = function(string $table) use ($pdo): bool {
        try { $s = $pdo->prepare("SHOW TABLES LIKE :t"); $s->execute(['t' => $table]); return (bool)$s->fetch(); } catch (Throwable $_) { return false; }
    };
    $hasCol = function(string $table, string $col) use ($pdo): bool {
        try { $s = $pdo->prepare("SHOW COLUMNS FROM `$table` LIKE :c"); $s->execute(['c' => $col]); return (bool)$s->fetch(); } catch (Throwable $_) { return false; }
    };

    // technicians.telegram_chat_id
    $checks[] = [
        'name' => 'technicians.telegram_chat_id',
        'ok' => $hasCol('technicians', 'telegram_chat_id'),
        'hint' => 'Run backend/sql/add_technician_telegram.sql'
    ];

    // telegram_links and critical columns
    $tlOk = $hasTable('telegram_links');
    $tlCols = ['token','context','technician_id','technician_name','phone','chat_id','created_at','used_at'];
    $checks[] = [ 'name' => 'telegram_links', 'ok' => $tlOk, 'hint' => 'Run backend/sql/add_telegram_links.sql' ];
    foreach ($tlCols as $c) {
        $checks[] = [ 'name' => "telegram_links.$c", 'ok' => $tlOk && $hasCol('telegram_links',$c), 'hint' => 'Run migrations in backend/sql' ];
    }

    // notification_events standard + extensions
    $neOk = $hasTable('notification_events');
    $checks[] = [ 'name' => 'notification_events', 'ok' => $neOk, 'hint' => 'Created on demand' ];
    foreach (['batch_id','provider_message_id','provider_status_code','provider_error','meta_json','sent_at'] as $c) {
        $checks[] = [ 'name' => "notification_events.$c", 'ok' => $neOk && $hasCol('notification_events',$c), 'hint' => 'Auto-added by ensureNotificationEventsTable' ];
    }

    // telegram_messages (chat)
    $checks[] = [ 'name' => 'telegram_messages', 'ok' => $hasTable('telegram_messages'), 'hint' => 'Run backend/sql/add_telegram_messages.sql' ];

    respond($checks);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}

