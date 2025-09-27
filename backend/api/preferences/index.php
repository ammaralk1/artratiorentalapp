<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use InvalidArgumentException;
use Throwable;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    requireAuthenticated();

    switch ($method) {
        case 'GET':
            handlePreferencesGet();
            break;
        case 'POST':
        case 'PUT':
        case 'PATCH':
            handlePreferencesUpdate();
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

function handlePreferencesGet(): void
{
    respond([
        'ok' => true,
        'data' => getUserPreferences(),
    ]);
}

function handlePreferencesUpdate(): void
{
    $payload = readJsonPayload();

    $changes = [];

    if (array_key_exists('language', $payload)) {
        $changes['language'] = (string) $payload['language'];
    }

    if (array_key_exists('theme', $payload)) {
        $changes['theme'] = (string) $payload['theme'];
    }

    if (!$changes) {
        respondError('No preference fields provided', 422);
        return;
    }

    $preferences = updateUserPreferences($changes);

    respond([
        'ok' => true,
        'data' => $preferences,
    ]);
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
