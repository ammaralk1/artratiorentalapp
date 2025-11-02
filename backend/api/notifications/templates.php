<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/templates.php';

use PDO;
use Throwable;

try {
    requireRole('admin');
    $pdo = getDatabaseConnection();
    ensureTemplatesTable($pdo);
    // Helper: check if a column exists to build SQL dynamically for older schemas
    $hasCol = function(string $col) use ($pdo): bool {
        try { $s = $pdo->prepare('SHOW COLUMNS FROM notification_templates LIKE :c'); $s->execute(['c' => $col]); return (bool)$s->fetch(); } catch (Throwable $_) { return false; }
    };

    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($method === 'GET') {
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id > 0) {
            $s = $pdo->prepare('SELECT * FROM notification_templates WHERE id = :id LIMIT 1');
            $s->execute(['id' => $id]);
            $row = $s->fetch();
            if (!$row) { respondError('Template not found', 404); exit; }
            respond($row);
            exit;
        }
        $limit = isset($_GET['limit']) ? max(1, min(200, (int)$_GET['limit'])) : 50;
        $offset = isset($_GET['offset']) ? max(0, (int)$_GET['offset']) : 0;
        $hasActive = $hasCol('active');
        $hasUpdated = $hasCol('updated_at');
        $orderCol = $hasUpdated ? 'updated_at' : 'id';
        $where = $hasActive ? 'WHERE active = 1 ' : '';
        $stmt = $pdo->prepare("SELECT * FROM notification_templates {$where}ORDER BY {$orderCol} DESC LIMIT :lim OFFSET :off");
        $stmt->bindValue(':lim', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':off', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $items = $stmt->fetchAll();
        // Seed a default "thank you" template if table is empty
        if (!$items) {
            try {
                $cols = ['name'];
                $vals = [':n'];
                $params = [ 'n' => 'شكر للفريق (افتراضي)' ];
                if ($hasCol('channel')) { $cols[] = 'channel'; $vals[] = ':c'; $params['c'] = 'both'; }
                if ($hasCol('subject')) { $cols[] = 'subject'; $vals[] = ':s'; $params['s'] = 'شكر من إدارة آرت ريشو — {{reservation.code}}'; }
                if ($hasCol('body_text')) { $cols[] = 'body_text'; $vals[] = ':t'; $params['t'] = "شكراً جزيلاً {{recipient.name}} على جهودك في الحجز {{reservation.code}} — {{reservation.title}} بتاريخ {{reservation.start_datetime}}.\nنقدّر عملك وتعاونك الدائم."; }
                if ($hasCol('active')) { $cols[] = 'active'; $vals[] = '1'; }
                $sql = 'INSERT INTO notification_templates (' . implode(',', $cols) . ') VALUES (' . implode(',', $vals) . ')';
                $seed = $pdo->prepare($sql);
                $seed->execute($params);
                // re-fetch
                $stmt->execute();
                $items = $stmt->fetchAll();
            } catch (Throwable $_) {}
        }
        respond($items, 200, [ 'limit' => $limit, 'offset' => $offset, 'count' => count($items) ]);
        exit;
    }

    $raw = file_get_contents('php://input') ?: '';
    $body = $raw !== '' ? (json_decode($raw, true) ?: []) : [];

    if ($method === 'POST') {
        $name = trim((string)($body['name'] ?? ''));
        if ($name === '') { respondError('name is required', 422); exit; }
        $channel = in_array(($body['channel'] ?? 'both'), ['email','telegram','both'], true) ? (string)$body['channel'] : 'both';
        $cols = ['name'];
        $vals = [':n'];
        $params = [ 'n' => $name ];
        if ($hasCol('channel')) { $cols[] = 'channel'; $vals[] = ':c'; $params['c'] = $channel; }
        if ($hasCol('subject')) { $cols[] = 'subject'; $vals[] = ':sub'; $params['sub'] = $body['subject'] ?? null; }
        if ($hasCol('body_html')) { $cols[] = 'body_html'; $vals[] = ':html'; $params['html'] = $body['body_html'] ?? null; }
        if ($hasCol('body_text')) { $cols[] = 'body_text'; $vals[] = ':text'; $params['text'] = $body['body_text'] ?? null; }
        if ($hasCol('attachment_url')) { $cols[] = 'attachment_url'; $vals[] = ':att'; $params['att'] = $body['attachment_url'] ?? null; }
        if ($hasCol('attachment_urls')) { $cols[] = 'attachment_urls'; $vals[] = ':atts'; $params['atts'] = isset($body['attachment_urls']) ? json_encode($body['attachment_urls'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null; }
        if ($hasCol('variables')) { $cols[] = 'variables'; $vals[] = ':vars'; $params['vars'] = isset($body['variables']) ? json_encode($body['variables'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null; }
        if ($hasCol('active')) { $cols[] = 'active'; $vals[] = '1'; }
        $sql = 'INSERT INTO notification_templates (' . implode(',', $cols) . ') VALUES (' . implode(',', $vals) . ')';
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $id = (int)$pdo->lastInsertId();
        respond([ 'id' => $id ]);
        exit;
    }

    if ($method === 'PUT' || $method === 'PATCH') {
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id <= 0) { respondError('id is required', 422); exit; }
        $fields = [];
        $params = [ 'id' => $id ];
        foreach (['name','subject','body_html','body_text','attachment_url'] as $f) {
            if (array_key_exists($f, $body)) { $fields[] = "$f = :$f"; $params[$f] = $body[$f]; }
        }
        if (array_key_exists('attachment_urls', $body) && $hasCol('attachment_urls')) { $fields[] = 'attachment_urls = :attachment_urls'; $params['attachment_urls'] = json_encode($body['attachment_urls'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); }
        if (array_key_exists('channel', $body) && $hasCol('channel')) {
            $params['channel'] = in_array(($body['channel'] ?? 'both'), ['email','telegram','both'], true) ? (string)$body['channel'] : 'both';
            $fields[] = 'channel = :channel';
        }
        if (array_key_exists('variables', $body) && $hasCol('variables')) { $fields[] = 'variables = :variables'; $params['variables'] = json_encode($body['variables'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); }
        if (array_key_exists('active', $body) && $hasCol('active')) { $fields[] = 'active = :active'; $params['active'] = (int)((bool)$body['active']); }
        if (!$fields) { respondError('No fields provided', 422); exit; }
        $sql = 'UPDATE notification_templates SET ' . implode(', ', $fields) . ' WHERE id = :id';
        $s = $pdo->prepare($sql);
        $s->execute($params);
        respond([ 'updated' => (int)$s->rowCount() ]);
        exit;
    }

    if ($method === 'DELETE') {
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id <= 0) { respondError('id is required', 422); exit; }
        $s = $pdo->prepare('DELETE FROM notification_templates WHERE id = :id');
        $s->execute(['id' => $id]);
        respond([ 'deleted' => (int)$s->rowCount() ]);
        exit;
    }

    respondError('Method not allowed', 405);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}
