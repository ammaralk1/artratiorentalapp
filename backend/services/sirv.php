<?php

declare(strict_types=1);

function getStorageUploadOption(string $key, mixed $default = null): mixed
{
    $storageValue = getAppConfig('storage', $key);
    if ($storageValue !== null) {
        return $storageValue;
    }

    $legacySirvValue = getAppConfig('sirv', $key);
    if ($legacySirvValue !== null) {
        return $legacySirvValue;
    }

    return $default;
}

function isCloudflareR2Configured(): bool
{
    $cfg = getAppConfig('storage', 'cloudflare_r2');
    if (!is_array($cfg)) {
        return false;
    }

    $enabled = isset($cfg['enabled']) ? (bool) $cfg['enabled'] : false;
    if (!$enabled) {
        return false;
    }

    $required = [
        'account_id',
        'access_key_id',
        'secret_access_key',
        'bucket',
        'public_base_url',
    ];

    foreach ($required as $key) {
        $value = trim((string)($cfg[$key] ?? ''));
        if ($value === '') {
            return false;
        }
    }

    return true;
}

function getActiveStorageProvider(): string
{
    return isCloudflareR2Configured() ? 'cloudflare_r2' : 'sirv';
}

function getActiveUploadSource(): string
{
    return getActiveStorageProvider() === 'cloudflare_r2' ? 'cloudflare' : 'sirv';
}

function getCloudflareR2Config(): array
{
    $config = getAppConfig('storage', 'cloudflare_r2');
    if (!is_array($config) || !(bool)($config['enabled'] ?? false)) {
        throw new RuntimeException('Cloudflare R2 configuration is not enabled.');
    }

    $accountId = trim((string)($config['account_id'] ?? ''));
    $accessKeyId = trim((string)($config['access_key_id'] ?? ''));
    $secretAccessKey = trim((string)($config['secret_access_key'] ?? ''));
    $bucket = trim((string)($config['bucket'] ?? ''));
    $publicBaseUrl = rtrim(trim((string)($config['public_base_url'] ?? '')), '/');

    if ($accountId === '' || $accessKeyId === '' || $secretAccessKey === '' || $bucket === '' || $publicBaseUrl === '') {
        throw new RuntimeException('Cloudflare R2 credentials are not fully configured.');
    }

    $endpoint = trim((string)($config['endpoint'] ?? ''));
    if ($endpoint === '') {
        $endpoint = sprintf('https://%s.r2.cloudflarestorage.com', $accountId);
    }
    $endpoint = rtrim($endpoint, '/');

    $uploadFolder = (string)($config['upload_folder'] ?? '/');
    $region = trim((string)($config['region'] ?? 'auto'));
    if ($region === '') {
        $region = 'auto';
    }

    return [
        'account_id' => $accountId,
        'access_key_id' => $accessKeyId,
        'secret_access_key' => $secretAccessKey,
        'bucket' => $bucket,
        'public_base_url' => $publicBaseUrl,
        'endpoint' => $endpoint,
        'upload_folder' => $uploadFolder,
        'region' => $region,
    ];
}

function cloudflareEncodePath(string $path): string
{
    $segments = array_filter(explode('/', ltrim($path, '/')), static fn($part) => $part !== '');
    return implode('/', array_map(static fn($part) => rawurlencode($part), $segments));
}

function cloudflareR2UploadFile(string $filePath, string $destinationPath, string $mimeType = 'application/octet-stream'): array
{
    if (!is_file($filePath)) {
        throw new RuntimeException('Temporary upload file not found.');
    }

    if (!extension_loaded('curl')) {
        throw new RuntimeException('The curl extension is required for Cloudflare R2 integration.');
    }

    $cfg = getCloudflareR2Config();
    $bucket = $cfg['bucket'];
    $objectKey = ltrim($destinationPath, '/');

    if ($objectKey === '') {
        throw new RuntimeException('Invalid destination path for Cloudflare R2 upload.');
    }

    $payload = file_get_contents($filePath);
    if ($payload === false) {
        throw new RuntimeException('Failed to read temporary upload file.');
    }

    $payloadHash = hash('sha256', $payload);
    $amzDate = gmdate('Ymd\THis\Z');
    $dateStamp = gmdate('Ymd');
    $region = $cfg['region'];
    $service = 's3';
    $host = (string) parse_url($cfg['endpoint'], PHP_URL_HOST);

    if ($host === '') {
        throw new RuntimeException('Invalid Cloudflare R2 endpoint host.');
    }

    $canonicalUri = '/' . cloudflareEncodePath($bucket) . '/' . cloudflareEncodePath($objectKey);
    $canonicalHeaders = "host:{$host}\n" . "x-amz-content-sha256:{$payloadHash}\n" . "x-amz-date:{$amzDate}\n";
    $signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    $canonicalRequest = "PUT\n{$canonicalUri}\n\n{$canonicalHeaders}\n{$signedHeaders}\n{$payloadHash}";

    $algorithm = 'AWS4-HMAC-SHA256';
    $credentialScope = "{$dateStamp}/{$region}/{$service}/aws4_request";
    $stringToSign = $algorithm . "\n" . $amzDate . "\n" . $credentialScope . "\n" . hash('sha256', $canonicalRequest);

    $kDate = hash_hmac('sha256', $dateStamp, 'AWS4' . $cfg['secret_access_key'], true);
    $kRegion = hash_hmac('sha256', $region, $kDate, true);
    $kService = hash_hmac('sha256', $service, $kRegion, true);
    $kSigning = hash_hmac('sha256', 'aws4_request', $kService, true);
    $signature = hash_hmac('sha256', $stringToSign, $kSigning);

    $authorization = $algorithm
        . ' Credential=' . $cfg['access_key_id'] . '/' . $credentialScope
        . ', SignedHeaders=' . $signedHeaders
        . ', Signature=' . $signature;

    $url = $cfg['endpoint'] . $canonicalUri;
    $headers = [
        'Authorization: ' . $authorization,
        'x-amz-content-sha256: ' . $payloadHash,
        'x-amz-date: ' . $amzDate,
        'Content-Type: ' . ($mimeType !== '' ? $mimeType : 'application/octet-stream'),
        'Content-Length: ' . strlen($payload),
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => 'PUT',
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 120,
    ]);

    $responseBody = curl_exec($ch);
    if ($responseBody === false) {
        $error = curl_error($ch);
        curl_close($ch);
        throw new RuntimeException('Failed to upload file to Cloudflare R2: ' . $error);
    }

    $statusCode = curl_getinfo($ch, CURLINFO_RESPONSE_CODE) ?: 0;
    curl_close($ch);

    if (!in_array($statusCode, [200, 201], true)) {
        $message = sprintf(
            'Cloudflare R2 upload failed (status %d).',
            $statusCode
        );
        if (trim((string) $responseBody) !== '') {
            $message .= ' Response: ' . trim((string) $responseBody);
        }
        throw new RuntimeException($message);
    }

    return [
        'file' => [
            'size' => filesize($filePath) ?: 0,
        ],
        'provider' => 'cloudflare_r2',
    ];
}

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

        if (isset($data['message']) && is_string($data['message'])) {
            $message .= ' - ' . $data['message'];
        }

        if (isset($data['details']) && !is_string($data['details'])) {
            $details = json_encode($data['details'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            if ($details !== false) {
                $message .= ' :: ' . $details;
            }
        }

        error_log('Sirv token error: ' . json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

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
    if (getActiveStorageProvider() === 'cloudflare_r2') {
        return cloudflareR2UploadFile($filePath, $destinationPath, $mimeType);
    }

    if (!is_file($filePath)) {
        throw new RuntimeException('Temporary upload file not found.');
    }

    $config = getSirvConfig();
    $token = sirvGetToken();

    $normalized = '/' . ltrim($destinationPath, '/');

    $query = http_build_query([
        'filename' => $normalized,
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

    $decoded = json_decode($responseBody, true);

    if (is_array($decoded)) {
        $data = $decoded;
    } elseif ($statusCode >= 200 && $statusCode < 300 && trim((string) $responseBody) === '') {
        // Sirv sometimes returns an empty body on success; fabricate minimal payload.
        $data = [
            'file' => [
                'size' => filesize($filePath),
            ],
        ];
    } else {
        error_log(sprintf('Sirv upload unexpected response (status %d): %s', $statusCode, $responseBody));
        throw new RuntimeException('Unexpected response from Sirv upload endpoint.');
    }

    if ($statusCode >= 400) {
        $message = $data['message'] ?? $data['error'] ?? 'Sirv upload failed';

        if (!empty($data['error_description'])) {
            $message .= ' - ' . $data['error_description'];
        }

        if (isset($data['details']) && !is_string($data['details'])) {
            $encodedDetails = json_encode($data['details'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            if ($encodedDetails !== false) {
                $message .= ' :: ' . $encodedDetails;
            }
        }

        error_log('Sirv upload error: ' . json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        throw new RuntimeException($message);
    }

    return $data;
}

function sirvBuildCdnUrl(string $path): string
{
    if (getActiveStorageProvider() === 'cloudflare_r2') {
        $cfg = getCloudflareR2Config();
        return $cfg['public_base_url'] . '/' . ltrim($path, '/');
    }

    $config = getSirvConfig();
    $cdnBase = $config['cdn_base'];

    if ($cdnBase === '') {
        throw new RuntimeException('Sirv CDN base URL is not configured.');
    }

    return rtrim($cdnBase, '/') . '/' . ltrim($path, '/');
}

function sirvGenerateUploadPath(string $fileName, ?int $customerId = null): string
{
    $provider = getActiveStorageProvider();
    $config = $provider === 'cloudflare_r2' ? getCloudflareR2Config() : getSirvConfig();
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
