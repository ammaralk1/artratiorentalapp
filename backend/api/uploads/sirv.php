<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/sirv.php';

class UploadValidationException extends \RuntimeException
{
}

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

    try {
        $validation = validateUploadedFile($upload, $tmpPath);
    } catch (UploadValidationException $validationError) {
        $status = $validationError->getCode() ?: 400;
        respondError($validationError->getMessage(), $status);
        return;
    }

    $originalName = trim((string)($upload['name'] ?? 'document'));
    $customerId = isset($_POST['customer_id']) ? (int)$_POST['customer_id'] : null;

    $destinationPath = sirvGenerateUploadPath($originalName, $customerId);
    $uploadResponse = sirvUploadFile($tmpPath, $destinationPath, $validation['mimeType'], ['overwrite' => true]);

    $url = sirvBuildCdnUrl($destinationPath);
    $size = (int)($uploadResponse['file']['size'] ?? $validation['size']);

    respond([
        'url' => $url,
        'path' => $destinationPath,
        'fileName' => $originalName,
        'mimeType' => $validation['mimeType'],
        'size' => $size,
        'source' => 'sirv',
    ], 201);
} catch (\RuntimeException $exception) {
    respondError($exception->getMessage(), 400);
} catch (\Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}

function validateUploadedFile(array $upload, string $tmpPath): array
{
    $maxSize = getUploadMaxFileSize();
    $rules = getUploadValidationRules();

    $detectedSize = isset($upload['size']) ? (int)$upload['size'] : 0;
    if ($detectedSize <= 0) {
        $detectedSize = (int) (@filesize($tmpPath) ?: 0);
    }

    if ($detectedSize <= 0) {
        throw new UploadValidationException('الملف المرفوع فارغ أو غير صالح.');
    }

    if ($detectedSize > $maxSize) {
        $message = sprintf(
            'حجم الملف يتجاوز الحد المسموح (%s).',
            formatBytes($maxSize)
        );
        throw new UploadValidationException($message, 413);
    }

    $detectedMime = detectMimeType($tmpPath);
    if ($detectedMime === null) {
        throw new UploadValidationException('تعذر تحديد نوع الملف، يرجى المحاولة بملف مختلف.');
    }

    $originalName = trim((string)($upload['name'] ?? ''));
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

    $normalizedMime = normalizeMimeType($detectedMime);
    if ($normalizedMime === '') {
        throw new UploadValidationException('نوع الملف غير معروف.');
    }

    $matchedRule = matchUploadRule($normalizedMime, $rules);

    if ($matchedRule === null) {
        $message = sprintf(
            'نوع الملف غير مسموح. الأنواع المدعومة: %s.',
            implode(', ', getUploadAllowedDescription($rules)) ?: 'غير محدد'
        );
        throw new UploadValidationException($message, 415);
    }

    if ($matchedRule['extensions'] !== [] && $extension !== '') {
        if (!in_array($extension, $matchedRule['extensions'], true)) {
            $message = sprintf(
                'امتداد الملف "%s" غير مسموح. الامتدادات المدعومة: %s.',
                $extension,
                implode(', ', $matchedRule['extensions'])
            );
            throw new UploadValidationException($message, 415);
        }
    } elseif ($matchedRule['extensions'] !== [] && $extension === '') {
        $message = sprintf(
            'يجب أن يحتوي الملف على أحد الامتدادات التالية: %s.',
            implode(', ', $matchedRule['extensions'])
        );
        throw new UploadValidationException($message, 415);
    }

    ensureFileSignatureMatches($matchedRule['mime'], $tmpPath);

    return [
        'mimeType' => $matchedRule['mime'],
        'size' => $detectedSize,
    ];
}

function getUploadMaxFileSize(): int
{
    $configured = getAppConfig('sirv', 'max_file_size');
    if (is_numeric($configured) && (int)$configured > 0) {
        return (int) $configured;
    }

    return 5 * 1024 * 1024; // 5 MB default
}

function getUploadValidationRules(): array
{
    $defaultRules = [
        'image/jpeg' => [
            'mime' => 'image/jpeg',
            'extensions' => ['jpg', 'jpeg'],
            'aliases' => ['image/jpg', 'image/pjpeg'],
        ],
        'image/png' => [
            'mime' => 'image/png',
            'extensions' => ['png'],
            'aliases' => ['image/x-png'],
        ],
        'image/webp' => [
            'mime' => 'image/webp',
            'extensions' => ['webp'],
            'aliases' => [],
        ],
        'application/pdf' => [
            'mime' => 'application/pdf',
            'extensions' => ['pdf'],
            'aliases' => [],
        ],
    ];

    $configuredRules = getAppConfig('sirv', 'upload_rules');

    if (!is_array($configuredRules) || $configuredRules === []) {
        return $defaultRules;
    }

    $normalized = [];

    foreach ($configuredRules as $key => $rule) {
        if (is_array($rule) && isset($rule['mime'])) {
            $mime = normalizeMimeType($rule['mime']);
        } elseif (is_string($key)) {
            $mime = normalizeMimeType($key);
            $rule = is_array($rule) ? $rule : [];
        } else {
            continue;
        }

        if ($mime === '') {
            continue;
        }

        $extensions = [];
        if (isset($rule['extensions']) && is_array($rule['extensions'])) {
            foreach ($rule['extensions'] as $extension) {
                $extensionValue = strtolower(trim((string) $extension));
                if ($extensionValue !== '') {
                    $extensions[] = $extensionValue;
                }
            }
        }

        $aliases = [];
        if (isset($rule['aliases']) && is_array($rule['aliases'])) {
            foreach ($rule['aliases'] as $alias) {
                $aliasValue = normalizeMimeType($alias);
                if ($aliasValue !== '') {
                    $aliases[] = $aliasValue;
                }
            }
        }

        if ($extensions === [] && isset($defaultRules[$mime])) {
            $extensions = $defaultRules[$mime]['extensions'];
        }

        $normalized[$mime] = [
            'mime' => $mime,
            'extensions' => array_values(array_unique($extensions)),
            'aliases' => array_values(array_unique($aliases)),
        ];
    }

    return $normalized ?: $defaultRules;
}

function normalizeMimeType(mixed $value): string
{
    if (!is_string($value)) {
        return '';
    }

    $lower = strtolower(trim($value));
    if ($lower === '') {
        return '';
    }

    $parts = explode(';', $lower, 2);
    return trim($parts[0]);
}

function matchUploadRule(string $mime, array $rules): ?array
{
    if (isset($rules[$mime])) {
        return $rules[$mime];
    }

    foreach ($rules as $rule) {
        if (in_array($mime, $rule['aliases'], true)) {
            return $rule;
        }
    }

    return null;
}

function detectMimeType(string $path): ?string
{
    if ($path === '' || !is_file($path)) {
        return null;
    }

    if (function_exists('finfo_open')) {
        $resource = finfo_open(FILEINFO_MIME_TYPE);
        if ($resource) {
            $mime = finfo_file($resource, $path);
            finfo_close($resource);
            if (is_string($mime) && $mime !== '') {
                return $mime;
            }
        }
    }

    if (function_exists('mime_content_type')) {
        $mime = mime_content_type($path);
        if (is_string($mime) && $mime !== '') {
            return $mime;
        }
    }

    return null;
}

function ensureFileSignatureMatches(string $mime, string $path): void
{
    $handle = @fopen($path, 'rb');
    if (!$handle) {
        throw new UploadValidationException('تعذر قراءة الملف للتحقق من سلامته.');
    }

    $header = fread($handle, 12);
    fclose($handle);

    if ($header === false) {
        throw new UploadValidationException('تعذر قراءة الملف للتحقق من سلامته.');
    }

    switch ($mime) {
        case 'image/jpeg':
            if (strncmp($header, "\xFF\xD8", 2) !== 0) {
                throw new UploadValidationException('ملف JPEG غير صالح.');
            }
            break;
        case 'image/png':
            if (strncmp($header, "\x89PNG\r\n\x1A\n", 8) !== 0) {
                throw new UploadValidationException('ملف PNG غير صالح.');
            }
            break;
        case 'image/webp':
            if (strlen($header) < 12 || substr($header, 0, 4) !== 'RIFF' || substr($header, 8, 4) !== 'WEBP') {
                throw new UploadValidationException('ملف WEBP غير صالح.');
            }
            break;
        case 'application/pdf':
            if (strncmp($header, '%PDF-', 5) !== 0) {
                throw new UploadValidationException('ملف PDF غير صالح.');
            }
            break;
    }
}

function formatBytes(int $bytes): string
{
    if ($bytes <= 0) {
        return '0 بايت';
    }

    $units = ['بايت', 'ك.ب', 'م.ب', 'ج.ب'];
    $power = (int) floor(log($bytes, 1024));
    $power = max(0, min($power, count($units) - 1));
    $value = $bytes / pow(1024, $power);

    return sprintf('%.2f %s', $value, $units[$power]);
}

function getUploadAllowedDescription(array $rules): array
{
    $descriptions = [];

    foreach ($rules as $rule) {
        if (!empty($rule['extensions'])) {
            $descriptions[] = strtoupper(implode('/', $rule['extensions']));
        } else {
            $descriptions[] = strtoupper($rule['mime']);
        }
    }

    return array_values(array_unique($descriptions));
}
