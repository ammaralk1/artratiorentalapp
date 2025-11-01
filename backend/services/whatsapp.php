<?php
declare(strict_types=1);

function getWhatsAppConfig(): array
{
    $config = getAppConfig('whatsapp') ?? [];

    $enabled = (bool)($config['enabled'] ?? false);
    if (!$enabled) {
        return ['enabled' => false];
    }

    $accessToken = trim((string)($config['access_token'] ?? ''));
    $phoneNumberId = trim((string)($config['phone_number_id'] ?? ''));
    $apiBase = rtrim((string)($config['api_base'] ?? 'https://graph.facebook.com/v20.0'), '/');

    if ($accessToken === '' || $phoneNumberId === '') {
        throw new RuntimeException('WhatsApp is enabled but access token or phone number id is missing.');
    }

    return [
        'enabled' => true,
        'access_token' => $accessToken,
        'phone_number_id' => $phoneNumberId,
        'api_base' => $apiBase,
    ];
}

/**
 * Send a plain text WhatsApp message via Meta Cloud API.
 * Returns true on success, false on failure.
 */
function sendWhatsAppText(string $toPhone, string $message): bool
{
    try {
        $cfg = getWhatsAppConfig();
    } catch (Throwable $e) {
        error_log('WhatsApp config error: ' . $e->getMessage());
        return false;
    }

    if (empty($cfg['enabled'])) {
        return false;
    }

    if (!extension_loaded('curl')) {
        error_log('curl extension is required for WhatsApp Cloud API.');
        return false;
    }

    $toPhone = preg_replace('/\s+/', '', $toPhone);
    if ($toPhone === '') {
        return false;
    }

    $endpoint = sprintf('%s/%s/messages', $cfg['api_base'], $cfg['phone_number_id']);
    $payload = [
        'messaging_product' => 'whatsapp',
        'to' => $toPhone,
        'type' => 'text',
        'text' => [
            'preview_url' => false,
            'body' => $message,
        ],
    ];

    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        error_log('Failed to encode WhatsApp payload.');
        return false;
    }

    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $cfg['access_token'],
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => $json,
        CURLOPT_TIMEOUT => 30,
    ]);

    $response = curl_exec($ch);
    if ($response === false) {
        error_log('WhatsApp request error: ' . curl_error($ch));
        curl_close($ch);
        return false;
    }
    $status = (int) (curl_getinfo($ch, CURLINFO_RESPONSE_CODE) ?: 0);
    curl_close($ch);

    if ($status >= 200 && $status < 300) {
        return true;
    }

    error_log(sprintf('WhatsApp responded with status %d: %s', $status, (string)$response));
    return false;
}
