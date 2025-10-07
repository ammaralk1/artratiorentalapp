<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/sirv.php';

use RuntimeException;
use Throwable;

try {
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        respondError('Method not allowed', 405);
        return;
    }

    requireAuthenticated();

    if (!isset($_FILES['file']) || !is_array($_FILES['file'])) {
        respondError('No file provided', 400);
        return;
    }

    $upload = $_FILES['file'];

    if (($upload['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
        respondError('File upload failed', 400, ['code' => $upload['error'] ?? null]);
        return;
    }

    $tmpPath = $upload['tmp_name'] ?? '';
    if (!is_uploaded_file($tmpPath)) {
        respondError('No uploaded file found on server', 400);
        return;
    }

    $originalName = trim((string)($upload['name'] ?? 'document'));
    $mimeType = trim((string)($upload['type'] ?? 'application/octet-stream'));
    $customerId = isset($_POST['customer_id']) ? (int)$_POST['customer_id'] : null;

    $destinationPath = sirvGenerateUploadPath($originalName, $customerId);
    $uploadResponse = sirvUploadFile($tmpPath, $destinationPath, $mimeType, ['overwrite' => true]);

    $url = sirvBuildCdnUrl($destinationPath);
    $size = (int)($uploadResponse['file']['size'] ?? $upload['size'] ?? 0);

    respond([
        'url' => $url,
        'path' => $destinationPath,
        'fileName' => $originalName,
        'mimeType' => $mimeType,
        'size' => $size,
        'source' => 'sirv',
    ], 201);
} catch (RuntimeException $exception) {
    respondError($exception->getMessage(), 400);
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}
