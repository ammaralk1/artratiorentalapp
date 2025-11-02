<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/telegram.php';

use Throwable;

try {
    requireRole('admin');

    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($method === 'GET') {
        $info = telegramGetWebhookInfo();
        respond($info ?: []);
        exit;
    }
    if ($method === 'POST') {
        $raw = file_get_contents('php://input') ?: '';
        $payload = $raw !== '' ? (json_decode($raw, true) ?: []) : [];
        $url = trim((string)($payload['url'] ?? ''));
        if ($url === '') {
            // Default to this installation URL
            $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
            $host = $_SERVER['HTTP_HOST'] ?? ($_SERVER['SERVER_NAME'] ?? '');
            $url = $scheme . '://' . $host . '/backend/api/telegram/webhook.php';
        }
        $res = telegramSetWebhook($url);
        respond($res ?: ['ok' => false]);
        exit;
    }
    respondError('Method not allowed', 405);
} catch (Throwable $e) {
    respondError('Unexpected server error', 500, [ 'details' => $e->getMessage() ]);
}

