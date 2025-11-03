<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/telegram.php';

use Throwable;

try {
    requireRole('admin');
    $fileId = isset($_GET['file_id']) ? trim((string)$_GET['file_id']) : '';
    if ($fileId === '') { respondError('file_id is required', 422); exit; }
    $cfg = getTelegramConfig();
    if (empty($cfg['enabled'])) { respondError('Telegram disabled', 503); exit; }
    if (!extension_loaded('curl')) { respondError('curl required', 503); exit; }

    // Get file path
    $getUrl = sprintf('%s/bot%s/getFile?file_id=%s', $cfg['api_base'], $cfg['bot_token'], urlencode($fileId));
    $ch = curl_init($getUrl);
    curl_setopt_array($ch, [ CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 20 ]);
    $resp = curl_exec($ch);
    if ($resp === false) { curl_close($ch); respondError('Failed to fetch file info', 502); exit; }
    curl_close($ch);
    $data = json_decode((string)$resp, true);
    $filePath = is_array($data) ? (string)($data['result']['file_path'] ?? '') : '';
    if ($filePath === '') { respondError('file not found', 404); exit; }

    $fileUrl = sprintf('%s/file/bot%s/%s', $cfg['api_base'], $cfg['bot_token'], $filePath);
    // Proxy the file to the client
    $hc = curl_init($fileUrl);
    curl_setopt_array($hc, [ CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true, CURLOPT_TIMEOUT => 30, CURLOPT_HEADER => true ]);
    $raw = curl_exec($hc);
    if ($raw === false) { $err = curl_error($hc); curl_close($hc); respondError('Fetch error: ' . $err, 502); exit; }
    $status = (int)(curl_getinfo($hc, CURLINFO_RESPONSE_CODE) ?: 0);
    $headerSize = (int)(curl_getinfo($hc, CURLINFO_HEADER_SIZE) ?: 0);
    $headers = substr((string)$raw, 0, $headerSize);
    $body = substr((string)$raw, $headerSize);
    curl_close($hc);

    if ($status < 200 || $status >= 300) { respondError('Fetch failed', 502); exit; }

    // Try to forward content-type
    if (!headers_sent()) {
      if (preg_match('/^content-type:\s*([^\r\n]+)/im', $headers, $m)) {
        header('Content-Type: ' . trim($m[1]));
      } else {
        header('Content-Type: application/octet-stream');
      }
      header('Cache-Control: private, max-age=3600');
    }
    echo $body;
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}

