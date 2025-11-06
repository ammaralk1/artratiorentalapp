<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use PDO;
use Throwable;

define('API_INCLUDE_MODE', true);

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = getDatabaseConnection();
    requireAuthenticated();
    ensureProjectTemplatesTable($pdo);

    switch ($method) {
        case 'GET':
            handleGet($pdo);
            break;
        case 'POST':
            handlePost($pdo);
            break;
        case 'PUT':
        case 'PATCH':
            handlePatch($pdo);
            break;
        case 'DELETE':
            handleDelete($pdo);
            break;
        default:
            respondError('Method not allowed', 405);
    }
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, ['details' => $e->getMessage()]);
}

function ensureProjectTemplatesTable(PDO $pdo): void {
    $pdo->exec('CREATE TABLE IF NOT EXISTS project_templates (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        project_id BIGINT UNSIGNED NOT NULL,
        reservation_id BIGINT UNSIGNED NULL,
        type VARCHAR(32) NOT NULL,
        title VARCHAR(191) NULL,
        data MEDIUMTEXT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        KEY idx_project (project_id),
        KEY idx_reservation (reservation_id),
        KEY idx_type (type)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
}

function handleGet(PDO $pdo): void {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    if ($id > 0) {
        $s = $pdo->prepare('SELECT * FROM project_templates WHERE id = :id LIMIT 1');
        $s->execute(['id' => $id]);
        $row = $s->fetch(PDO::FETCH_ASSOC);
        if (!$row) { respondError('Template not found', 404); return; }
        respond(mapTemplateRow($row));
        return;
    }
    $where = [];
    $params = [];
    if (!empty($_GET['project_id'])) { $where[] = 'project_id = :pid'; $params['pid'] = (int)$_GET['project_id']; }
    if (!empty($_GET['type'])) { $where[] = 'type = :type'; $params['type'] = substr((string)$_GET['type'], 0, 32); }
    $sql = 'SELECT * FROM project_templates' . ($where ? (' WHERE ' . implode(' AND ', $where)) : '') . ' ORDER BY id DESC LIMIT 100';
    $s = $pdo->prepare($sql);
    $s->execute($params);
    $items = [];
    while ($row = $s->fetch(PDO::FETCH_ASSOC)) { $items[] = mapTemplateRow($row); }
    respond($items);
}

function handlePost(PDO $pdo): void {
    $payload = readJsonPayload();
    $projectId = (int)($payload['project_id'] ?? 0);
    $reservationId = isset($payload['reservation_id']) ? (int)$payload['reservation_id'] : null;
    $type = substr(trim((string)($payload['type'] ?? '')), 0, 32);
    $title = substr(trim((string)($payload['title'] ?? '')), 0, 191);
    $data = $payload['data'] ?? null;
    if ($projectId <= 0 || $type === '') { respondError('Missing project_id or type', 422); return; }
    $json = is_string($data) ? $data : json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $s = $pdo->prepare('INSERT INTO project_templates (project_id, reservation_id, type, title, data) VALUES (:p, :r, :t, :title, :data)');
    $s->execute(['p' => $projectId, 'r' => $reservationId, 't' => $type, 'title' => $title, 'data' => $json]);
    $id = (int)$pdo->lastInsertId();
    $row = fetchById($pdo, $id);
    respond($row, 201);
}

function handlePatch(PDO $pdo): void {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    if ($id <= 0) { respondError('Invalid id', 400); return; }
    $payload = readJsonPayload();
    $title = isset($payload['title']) ? substr(trim((string)$payload['title']), 0, 191) : null;
    $data = array_key_exists('data', $payload) ? $payload['data'] : null;
    $sets = [];
    $params = ['id' => $id];
    if ($title !== null) { $sets[] = 'title = :title'; $params['title'] = $title; }
    if ($data !== null) { $sets[] = 'data = :data'; $params['data'] = is_string($data) ? $data : json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); }
    if (!$sets) { respondError('No changes', 422); return; }
    $sql = 'UPDATE project_templates SET ' . implode(', ', $sets) . ' WHERE id = :id';
    $s = $pdo->prepare($sql);
    $s->execute($params);
    $row = fetchById($pdo, $id);
    respond($row);
}

function handleDelete(PDO $pdo): void {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    if ($id <= 0) { respondError('Invalid id', 400); return; }
    $s = $pdo->prepare('DELETE FROM project_templates WHERE id = :id');
    $s->execute(['id' => $id]);
    respond(['ok' => true]);
}

function fetchById(PDO $pdo, int $id) {
    $s = $pdo->prepare('SELECT * FROM project_templates WHERE id = :id LIMIT 1');
    $s->execute(['id' => $id]);
    $row = $s->fetch(PDO::FETCH_ASSOC);
    return mapTemplateRow($row ?: []);
}

function mapTemplateRow(array $row): array {
    return [
        'id' => (int)($row['id'] ?? 0),
        'project_id' => (int)($row['project_id'] ?? 0),
        'reservation_id' => isset($row['reservation_id']) ? (int)$row['reservation_id'] : null,
        'type' => (string)($row['type'] ?? ''),
        'title' => (string)($row['title'] ?? ''),
        'data' => $row['data'] ?? null,
        'created_at' => (string)($row['created_at'] ?? ''),
        'updated_at' => (string)($row['updated_at'] ?? ''),
    ];
}

/**
 * Read and parse JSON request payload into an associative array.
 * Mirrors helper used by other endpoints (projects, equipment, etc.).
 */
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
