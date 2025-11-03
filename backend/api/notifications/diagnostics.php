<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';


try {
    requireRole('admin');
    $pdo = getDatabaseConnection();

    $checks = [];

    // MySQL doesn't support bound parameters in SHOW statements reliably across versions.
    // Build safe queries using whitelisted table names and quoted LIKE patterns.
    $allowedTables = ['technicians','telegram_links','telegram_messages','notification_events'];
    $sanitizeTable = function(string $table) use ($allowedTables): ?string {
        if (in_array($table, $allowedTables, true)) return $table;
        if (preg_match('/^[a-zA-Z0-9_]+$/', $table)) return $table; // fallback safe-ish
        return null;
    };
    $hasTable = function(string $table) use ($pdo, $sanitizeTable): bool {
        try {
            $tbl = $sanitizeTable($table);
            if ($tbl === null) return false;
            $like = $pdo->quote($tbl);
            $sql = "SHOW TABLES LIKE $like";
            $s = $pdo->query($sql);
            return $s && (bool)$s->fetch();
        } catch (Throwable $_) { return false; }
    };
    $hasCol = function(string $table, string $col) use ($pdo, $sanitizeTable): bool {
        try {
            $tbl = $sanitizeTable($table);
            if ($tbl === null) return false;
            $like = $pdo->quote($col);
            $sql = "SHOW COLUMNS FROM `" . $tbl . "` LIKE $like";
            $s = $pdo->query($sql);
            return $s && (bool)$s->fetch();
        } catch (Throwable $_) { return false; }
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
    $tmOk = $hasTable('telegram_messages');
    $checks[] = [ 'name' => 'telegram_messages', 'ok' => $tmOk, 'hint' => 'Run backend/sql/add_telegram_messages.sql' ];

    // Extra diagnostics meta: DB name, user, session time_zone
    $meta = [];
    try {
        $meta['database'] = (string) ($pdo->query('SELECT DATABASE()')->fetchColumn() ?: '');
    } catch (Throwable $_) { $meta['database'] = ''; }
    try {
        $meta['db_user'] = (string) ($pdo->query('SELECT USER()')->fetchColumn() ?: '');
    } catch (Throwable $_) { $meta['db_user'] = ''; }
    try {
        $meta['db_time_zone'] = (string) ($pdo->query('SELECT @@session.time_zone')->fetchColumn() ?: '');
    } catch (Throwable $_) { $meta['db_time_zone'] = ''; }
    // Snapshot of found tables/columns
    $meta['found'] = [
        'telegram_links' => $tlOk,
        'telegram_messages' => $tmOk,
        'technicians.telegram_chat_id' => $hasCol('technicians','telegram_chat_id'),
        'notification_events' => $neOk,
    ];

    respond($checks, 200, $meta);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}
