<?php

declare(strict_types=1);

function isSecureRequest(): bool
{
    if (!empty($_SERVER['HTTPS']) && strtolower((string) $_SERVER['HTTPS']) !== 'off') {
        return true;
    }

    if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https') {
        return true;
    }

    return false;
}

function initialiseHttpEnvironment(array $config): void
{
    header('Content-Type: application/json; charset=utf-8');

    $allowedOrigins = array_map(static fn($origin) => trim(strtolower((string) $origin)), $config['security']['allowed_origins'] ?? []);
    $enforceHttps = !empty($config['security']['enforce_https']);
    $sessionName = $config['security']['session_name'] ?? 'art_ratio_session';

    if ($enforceHttps && !isSecureRequest()) {
        respondError('HTTPS is required', 403);
        exit;
    }

    $cookieParams = [
        'lifetime' => 0,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
    ];

    if (isSecureRequest()) {
        $cookieParams['secure'] = true;
        header('Strict-Transport-Security: max-age=63072000; includeSubDomains; preload');
    }

    if (PHP_SESSION_ACTIVE !== session_status()) {
        session_name($sessionName);
        session_set_cookie_params($cookieParams);
        session_start();
    }

    handleCors($allowedOrigins);
}

function handleCors(array $allowedOrigins): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $normalizedOrigin = strtolower($origin);
    $originAllowed = false;

    if ($origin) {
        if (!$allowedOrigins) {
            respondError('Origin not allowed', 403);
            exit;
        }

        if (!in_array($normalizedOrigin, $allowedOrigins, true)) {
            respondError('Origin not allowed', 403);
            exit;
        }

        $originAllowed = true;
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        if ($origin && !$originAllowed) {
            respondError('Origin not allowed', 403);
            exit;
        }
        http_response_code(204);
        exit;
    }
}
