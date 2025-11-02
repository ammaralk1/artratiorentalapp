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
        $stmt = $pdo->prepare('SELECT * FROM notification_templates WHERE active = 1 ORDER BY updated_at DESC LIMIT :lim OFFSET :off');
        $stmt->bindValue(':lim', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':off', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $items = $stmt->fetchAll();
        // Seed a default "thank you" template if table is empty
        if (!$items) {
            try {
                $seed = $pdo->prepare('INSERT INTO notification_templates (name, channel, subject, body_text, active) VALUES (:n, :c, :s, :t, 1)');
                $seed->execute([
                    'n' => 'شكر للفريق (افتراضي)',
                    'c' => 'both',
                    's' => 'شكر من إدارة آرت ريشو — {{reservation.code}}',
                    't' => "شكراً جزيلاً {{recipient.name}} على جهودك في الحجز {{reservation.code}} — {{reservation.title}} بتاريخ {{reservation.start_datetime}}.\nنقدّر عملك وتعاونك الدائم.",
                ]);
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
        $stmt = $pdo->prepare('INSERT INTO notification_templates (name, channel, subject, body_html, body_text, variables, active) VALUES (:n, :c, :sub, :html, :text, :vars, 1)');
        $stmt->execute([
            'n' => $name,
            'c' => $channel,
            'sub' => $body['subject'] ?? null,
            'html' => $body['body_html'] ?? null,
            'text' => $body['body_text'] ?? null,
            'vars' => isset($body['variables']) ? json_encode($body['variables'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null,
        ]);
        $id = (int)$pdo->lastInsertId();
        respond([ 'id' => $id ]);
        exit;
    }

    if ($method === 'PUT' || $method === 'PATCH') {
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id <= 0) { respondError('id is required', 422); exit; }
        $fields = [];
        $params = [ 'id' => $id ];
        foreach (['name','subject','body_html','body_text'] as $f) {
            if (array_key_exists($f, $body)) { $fields[] = "$f = :$f"; $params[$f] = $body[$f]; }
        }
        if (array_key_exists('channel', $body)) {
            $params['channel'] = in_array(($body['channel'] ?? 'both'), ['email','telegram','both'], true) ? (string)$body['channel'] : 'both';
            $fields[] = 'channel = :channel';
        }
        if (array_key_exists('variables', $body)) { $fields[] = 'variables = :variables'; $params['variables'] = json_encode($body['variables'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); }
        if (array_key_exists('active', $body)) { $fields[] = 'active = :active'; $params['active'] = (int)((bool)$body['active']); }
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
