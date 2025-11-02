<?php
declare(strict_types=1);

// Lightweight last-error storage for telegram provider
function telegramSetLastError(string $message): void
{
    $GLOBALS['telegram_last_error'] = $message;
}

function telegramGetLastError(): ?string
{
    $err = $GLOBALS['telegram_last_error'] ?? null;
    return is_string($err) && $err !== '' ? $err : null;
}

function getTelegramConfig(): array
{
    $config = getAppConfig('telegram') ?? [];

    $enabled = (bool)($config['enabled'] ?? false);
    if (!$enabled) {
        return ['enabled' => false];
    }

    $botToken = trim((string)($config['bot_token'] ?? ''));
    $apiBase = rtrim((string)($config['api_base'] ?? 'https://api.telegram.org'), '/');

    if ($botToken === '') {
        throw new RuntimeException('Telegram is enabled but bot token is missing.');
    }

    return [
        'enabled' => true,
        'bot_token' => $botToken,
        'api_base' => $apiBase,
    ];
}

/**
 * Send a plain text Telegram message via Bot API.
 * Returns true on success, false on failure.
 */
function sendTelegramText(string $chatId, string $message): bool
{
    try {
        $cfg = getTelegramConfig();
    } catch (Throwable $e) {
        error_log('Telegram config error: ' . $e->getMessage());
        telegramSetLastError('Telegram config error: ' . $e->getMessage());
        return false;
    }

    if (empty($cfg['enabled'])) {
        telegramSetLastError('Telegram disabled by configuration');
        return false;
    }

    if (!extension_loaded('curl')) {
        telegramSetLastError('curl extension is required for Telegram Bot API');
        error_log('curl extension is required for Telegram Bot API.');
        return false;
    }

    $chatId = trim($chatId);
    if ($chatId === '') {
        telegramSetLastError('Invalid chat id');
        return false;
    }

    $endpoint = sprintf('%s/bot%s/sendMessage', $cfg['api_base'], $cfg['bot_token']);
    $payload = [
        'chat_id' => $chatId,
        'text' => $message,
        'disable_web_page_preview' => true,
    ];

    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        CURLOPT_TIMEOUT => 30,
    ]);

    $response = curl_exec($ch);
    if ($response === false) {
        $err = curl_error($ch);
        curl_close($ch);
        telegramSetLastError('Telegram request error: ' . $err);
        error_log('Telegram request error: ' . $err);
        return false;
    }
    $status = (int) (curl_getinfo($ch, CURLINFO_RESPONSE_CODE) ?: 0);
    curl_close($ch);

    $ok = false;
    $decoded = null;
    try { $decoded = json_decode((string)$response, true); } catch (Throwable $_) { $decoded = null; }
    if ($status >= 200 && $status < 300) {
        $ok = (bool)($decoded['ok'] ?? true);
    }

    if (!$ok) {
        $desc = is_array($decoded) ? (string)($decoded['description'] ?? '') : '';
        $msg = sprintf('Telegram responded with status %d%s', $status, $desc !== '' ? (': ' . $desc) : '');
        telegramSetLastError($msg);
        error_log($msg);
        return false;
    }

    return true;
}

/**
 * Returns Bot info (getMe) including username. Cached per request.
 */
function telegramGetMe(): ?array
{
    static $cached = null;
    if ($cached !== null) { return $cached; }
    try {
        $cfg = getTelegramConfig();
    } catch (Throwable $e) { return null; }

    if (empty($cfg['enabled'])) { return null; }
    if (!extension_loaded('curl')) { return null; }

    $url = sprintf('%s/bot%s/getMe', $cfg['api_base'], $cfg['bot_token']);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    if ($response === false) { return null; }
    $data = json_decode((string)$response, true);
    if (!is_array($data) || empty($data['ok'])) { return null; }
    $cached = (array)($data['result'] ?? []);
    return $cached;
}

/**
 * Normalize phone to digits-only E.164-like (without leading '+').
 * Removes spaces, dashes, parentheses; strips leading '+' or '00'.
 */
function telegramNormalizePhone(string $phone): string
{
    $normalized = trim($phone);
    // remove common separators
    $normalized = preg_replace('/[\s\-()]+/', '', $normalized) ?? '';
    if (str_starts_with($normalized, '+')) {
        $normalized = substr($normalized, 1);
    }
    if (str_starts_with($normalized, '00')) {
        $normalized = substr($normalized, 2);
    }
    // keep digits only
    $normalized = preg_replace('/[^0-9]/', '', $normalized) ?? '';
    return $normalized;
}
