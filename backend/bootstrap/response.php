<?php

declare(strict_types=1);

function respond(mixed $data = null, int $status = 200, ?array $meta = null): void
{
    $payload = [
        'ok' => true,
        'data' => $data,
    ];

    if ($meta !== null && $meta !== []) {
        $payload['meta'] = $meta;
    }

    sendResponse($payload, $status);
}

function respondError(string $message, int $status = 400, array $extra = []): void
{
    $payload = [
        'ok' => false,
        'error' => translateMessage($message),
    ];

    $code = $extra['code'] ?? $status;
    if ($code !== null) {
        $payload['code'] = (int) $code;
    }

    if (isset($extra['errors']) && is_array($extra['errors'])) {
        $payload['errors'] = translateErrorMessages($extra['errors']);
        unset($extra['errors']);
    }

    foreach ($extra as $key => $value) {
        if ($key === 'code') {
            continue;
        }

        if (is_string($value)) {
            $payload[$key] = translateMessage($value);
            continue;
        }

        if (is_array($value) && $key === 'meta') {
            $payload[$key] = $value;
            continue;
        }

        $payload[$key] = $value;
    }

    sendResponse($payload, $status);
}

function sendResponse(array $payload, int $status): void
{
    http_response_code($status);
    if (!headers_sent()) {
        header('Content-Type: application/json; charset=utf-8');
    }
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
