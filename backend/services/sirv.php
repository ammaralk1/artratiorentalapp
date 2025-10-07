<?php

declare(strict_types=1);

use RuntimeException;

function getSirvConfig(): array
{
    $config = getAppConfig('sirv');

    if (!is_array($config)) {
        throw new RuntimeException('Sirv configuration is not defined.');
    }

    $clientId = trim((string)($config['client_id'] ?? ''));
    $clientSecret = trim((string)($config['client_secret'] ?? ''));

    if ($clientId === '' || $clientSecret === '') {
        throw new RuntimeException('Sirv client credentials are not configured.');
    }

    $apiBase = rtrim((string)($config['api_base'] ?? 'https://api.sirv.com'), '/');
    $cdnBase = rtrim((string)($config['cdn_base'] ?? ''), '/');
    $uploadFolder = (string)($config['upload_folder'] ?? '/');

    return [
        'client_id' => $clientId,
        'client_secret' => $clientSecret,
        'api_base' => $apiBase,
        'cdn_base' => $cdnBase,
        'upload_folder' => $uploadFolder,
    ];
}

function sirvGetToken(): string
{
    static $cache = null;

    $now = time();
    if ($cache && !empty($cache['token']) && ($cache['expires_at'] ?? 0) > ($now + 30)) {
        return $cache['token'];
    }

    if (!extension_loaded('curl')) {
        throw new RuntimeException('The curl extension is required for Sirv integration.');
    }

    $config = getSirvConfig();
    $url = $config['api_base'] . '/v2/token';

    $payload = json_encode([
        'clientId' => $config['client_id'],
        'clientSecret' => $config['client_secret'],
        'grant_type' => 'client_credentials',
    ], JSON_UNESCAPED_SLASHES);

    if ($payload === false) {
        throw new RuntimeException('Failed to encode Sirv token request payload.');
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Accept: application/json',
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_TIMEOUT => 30,
    ]);

    $responseBody = curl_exec($ch);
    if ($responseBody === false) {
        $error = curl_error($ch);
        curl_close($ch);
        throw new RuntimeException('Failed to contact Sirv token endpoint: ' . $error);
    }

    $statusCode = curl_getinfo($ch, CURLINFO_RESPONSE_CODE) ?: 0;
    curl_close($ch);

    $data = json_decode($responseBody, true);
    if (!is_array($data)) {
        throw new RuntimeException('Unexpected response from Sirv token endpoint.');
    }

    if ($statusCode >= 400 || empty($data['token'])) {
        $message = $data['error_description'] ?? $data['error'] ?? 'Failed to obtain Sirv access token';
        throw new RuntimeException($message);
    }

    $token = (string)$data['token'];
    $expiresIn = isset($data['expires_in']) ? (int)$data['expires_in'] : 3600;

    $cache = [
        'token' => $token,
        'expires_at' => $now + max(60, $expiresIn),
    ];

    return $token;
}

function sirvUploadFile(string $filePath, string $destinationPath, string $mimeType = 'application/octet-stream', array $options = []): array
{
    if (!is_file($filePath)) {
        throw new RuntimeException('Temporary upload file not found.');
    }

    $config = getSirvConfig();
    $token = sirvGetToken();

    $normalized = '/' . ltrim($destinationPath, '/');
    $overwrite = !empty($options['overwrite']);

    $query = http_build_query([
        'filename' => $normalized,
        'overwrite' => $overwrite ? 'true' : 'false',
    ]);

    $url = $config['api_base'] . '/v2/files/upload?' . $query;

    $file = new CURLFile($filePath, $mimeType ?: 'application/octet-stream', basename($normalized));

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $token,
            'Accept: application/json',
        ],
        CURLOPT_POSTFIELDS => [
            'file' => $file,
        ],
        CURLOPT_TIMEOUT => 120,
    ]);

    $responseBody = curl_exec($ch);
    if ($responseBody === false) {
        $error = curl_error($ch);
        curl_close($ch);
        throw new RuntimeException('Failed to upload file to Sirv: ' . $error);
    }

    $statusCode = curl_getinfo($ch, CURLINFO_RESPONSE_CODE) ?: 0;
    curl_close($ch);

    $data = json_decode($responseBody, true);
    if (!is_array($data)) {
        throw new RuntimeException('Unexpected response from Sirv upload endpoint.');
    }

    if ($statusCode >= 400) {
        $message = $data['message'] ?? $data['error'] ?? 'Sirv upload failed';
        throw new RuntimeException($message);
    }

    return $data;
}

function sirvBuildCdnUrl(string $path): string
{
    $config = getSirvConfig();
    $cdnBase = $config['cdn_base'];

    if ($cdnBase === '') {
        throw new RuntimeException('Sirv CDN base URL is not configured.');
    }

    return rtrim($cdnBase, '/') . '/' . ltrim($path, '/');
}

function sirvGenerateUploadPath(string $fileName, ?int $customerId = null): string
{
    $config = getSirvConfig();
    $folder = trim($config['upload_folder'], '/');
    $segments = [];

    if ($folder !== '') {
        $segments[] = $folder;
    }

    if ($customerId !== null && $customerId > 0) {
        $segments[] = 'customers/' . $customerId;
    }

    $segments[] = date('Y/m');

    $safeBase = preg_replace('/[^a-z0-9-_]+/i', '-', pathinfo($fileName, PATHINFO_FILENAME));
    $safeBase = $safeBase ? trim($safeBase, '-') : 'document';

    $extension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    if ($extension && !preg_match('/^[a-z0-9]+$/', $extension)) {
        $extension = '';
    }

    $segments[] = sprintf('%s_%s', $safeBase, bin2hex(random_bytes(6)));

    $path = implode('/', array_map(static fn($segment) => trim($segment, '/'), $segments));

    if ($extension) {
        $path .= '.' . $extension;
    }

    return '/' . $path;
}
