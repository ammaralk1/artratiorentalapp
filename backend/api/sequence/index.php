<?php
require_once __DIR__ . '/../../bootstrap.php';

use InvalidArgumentException;
use PDO;
use Throwable;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = getDatabaseConnection();
    requireAuthenticated();

    // Ensure table exists (lightweight, safe if already created)
    ensureSequencesTable($pdo);

    $name = isset($_GET['name']) ? trim((string)$_GET['name']) : '';
    if ($name === '') {
        respondError('Sequence name is required', 422);
        return;
    }

    // Restrict to known keys for safety
    $allowed = ['quote_reservation', 'quote_project'];
    if (!in_array($name, $allowed, true)) {
        respondError('Unknown sequence name', 422);
        return;
    }

    switch ($method) {
        case 'GET':
            $current = getSequenceCurrent($pdo, $name);
            respond(['name' => $name, 'value' => $current]);
            break;
        case 'POST':
            $next = incrementSequence($pdo, $name);
            respond(['name' => $name, 'value' => $next], 201);
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

function ensureSequencesTable(PDO $pdo): void
{
    $sql = "CREATE TABLE IF NOT EXISTS app_sequences (
        name VARCHAR(64) NOT NULL PRIMARY KEY,
        value BIGINT UNSIGNED NOT NULL DEFAULT 0,
        updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
    $pdo->exec($sql);
}

function getSequenceCurrent(PDO $pdo, string $name): int
{
    $statement = $pdo->prepare('SELECT value FROM app_sequences WHERE name = :name LIMIT 1');
    $statement->execute(['name' => $name]);
    $row = $statement->fetch();
    if (!$row) {
        return 0;
    }
    return (int) $row['value'];
}

function incrementSequence(PDO $pdo, string $name): int
{
    $pdo->beginTransaction();
    try {
        $select = $pdo->prepare('SELECT value FROM app_sequences WHERE name = :name FOR UPDATE');
        $select->execute(['name' => $name]);
        $row = $select->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            // Initialise sequence
            $insert = $pdo->prepare('INSERT INTO app_sequences (name, value) VALUES (:name, 0)');
            $insert->execute(['name' => $name]);
            $current = 0;
        } else {
            $current = (int) $row['value'];
        }
        $next = $current + 1;
        $update = $pdo->prepare('UPDATE app_sequences SET value = :value WHERE name = :name');
        $update->execute(['value' => $next, 'name' => $name]);
        $pdo->commit();
        return $next;
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $e;
    }
}

