<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use InvalidArgumentException;
use Throwable;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    switch ($method) {
        case 'POST':
            handleAuthLogin();
            break;
        case 'GET':
            handleAuthStatus();
            break;
        case 'DELETE':
            handleAuthLogout();
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

function handleAuthLogin(): void
{
    $payload = readJsonPayload();
    $username = trim((string) ($payload['username'] ?? ''));
    $password = (string) ($payload['password'] ?? '');

    if ($username === '' || $password === '') {
        respondError('Username and password are required', 422);
        return;
    }

    if (!verifyCredentials($username, $password)) {
        respondError('Invalid username or password', 401);
        return;
    }

    loginUser($username);

    respond([
        'ok' => true,
        'data' => getAuthenticatedUser(),
    ]);
}

function handleAuthStatus(): void
{
    if (!isAuthenticated()) {
        respondError('Unauthorized', 401);
        return;
    }

    respond([
        'ok' => true,
        'data' => getAuthenticatedUser(),
    ]);
}

function handleAuthLogout(): void
{
    logoutUser();
    respond(['ok' => true]);
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
