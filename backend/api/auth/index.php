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

    $usernameError = validateLoginUsername($username);
    if ($usernameError !== null) {
        respondError($usernameError, 422);
        return;
    }

    $passwordError = validateLoginPassword($password);
    if ($passwordError !== null) {
        respondError($passwordError, 422);
        return;
    }

    $pdo = getDatabaseConnection();
    $ipAddress = getClientIpAddress();
    $normalizedUsername = trim($username);

    if (isLoginRateLimited($pdo, $normalizedUsername, $ipAddress)) {
        respondError('Too many login attempts. Try again later.', 429);
        return;
    }

    $user = verifyCredentials($username, $password, $pdo);

    $loginSuccessful = $user !== null;
    recordLoginAttempt($pdo, $normalizedUsername, $ipAddress, $loginSuccessful);

    if (!$loginSuccessful) {
        respondError('Invalid username or password', 401);
        return;
    }

    loginUser($user);

    respond(getAuthenticatedUser());
}

function handleAuthStatus(): void
{
    if (!isAuthenticated()) {
        respondError('Unauthorized', 401);
        return;
    }

    respond(getAuthenticatedUser());
}

function handleAuthLogout(): void
{
    logoutUser();
    respond(null);
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
