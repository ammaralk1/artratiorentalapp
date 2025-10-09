<?php

require_once __DIR__ . '/../../bootstrap.php';

use InvalidArgumentException;
use RuntimeException;
use Throwable;

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respondError('Method not allowed', 405);
    exit;
}

try {
    requireAuthenticated();

    $payload = readJsonPayload();

    $html = (string) ($payload['html'] ?? '');
    $filename = (string) ($payload['filename'] ?? 'quotation.pdf');
    $browser = normalizeBrowser($payload['browser'] ?? 'chromium');
    $baseUrl = isset($payload['baseUrl']) ? (string) $payload['baseUrl'] : null;

    if (trim($html) === '') {
        throw new InvalidArgumentException('Missing HTML payload for PDF export.');
    }

    $safeFilename = normaliseFilename($filename);

    [$htmlPath, $pdfPath] = createWorkingFiles($html);

    $command = buildCommand($htmlPath, $pdfPath, $browser, $baseUrl);

    exec($command, $output, $exitCode);

    if ($exitCode !== 0 || !file_exists($pdfPath)) {
        throw new RuntimeException('Playwright PDF generation failed: ' . implode(PHP_EOL, $output));
    }

    $pdfContent = file_get_contents($pdfPath);
    if ($pdfContent === false) {
        throw new RuntimeException('Generated PDF could not be read from disk.');
    }

    header_remove('Content-Type');
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . $safeFilename . '"');
    header('Content-Length: ' . strlen($pdfContent));
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');

    echo $pdfContent;
} catch (InvalidArgumentException $exception) {
    respondError($exception->getMessage(), 422);
} catch (Throwable $exception) {
    respondError('Failed to generate PDF', 500, [
        'details' => $exception->getMessage(),
    ]);
} finally {
    cleanupTemporaryFiles($htmlPath ?? null, $pdfPath ?? null);
}

function readJsonPayload(): array
{
    $raw = file_get_contents('php://input');

    if ($raw === false) {
        throw new RuntimeException('Unable to read request body');
    }

    $raw = trim($raw);

    if ($raw === '') {
        return [];
    }

    $data = json_decode($raw, true);

    if (!is_array($data)) {
        throw new InvalidArgumentException('Invalid JSON payload');
    }

    return $data;
}

function normaliseFilename(string $candidate): string
{
    $candidate = trim($candidate);
    if ($candidate === '') {
        $candidate = 'quotation.pdf';
    }

    $candidate = basename($candidate);

    if (!str_ends_with(strtolower($candidate), '.pdf')) {
        $candidate .= '.pdf';
    }

    return preg_replace('/[^A-Za-z0-9._-]+/', '_', $candidate);
}

function createWorkingFiles(string $html): array
{
    $tempDirectory = sys_get_temp_dir();

    $htmlPath = tempnam($tempDirectory, 'quote-html-');
    if ($htmlPath === false) {
        throw new RuntimeException('Unable to allocate temporary file for HTML.');
    }

    if (file_put_contents($htmlPath, $html) === false) {
        throw new RuntimeException('Failed to store HTML payload on disk.');
    }

    $pdfPath = tempnam($tempDirectory, 'quote-pdf-');
    if ($pdfPath === false) {
        throw new RuntimeException('Unable to allocate target PDF file.');
    }

    // Playwright expects the output path to not exist beforehand.
    unlink($pdfPath);

    return [$htmlPath, $pdfPath];
}

function normalizeBrowser(string $candidate): string
{
    $candidate = strtolower(trim((string) $candidate));
    $supported = ['chromium', 'webkit'];

    return in_array($candidate, $supported, true) ? $candidate : 'chromium';
}

function buildCommand(string $htmlPath, string $pdfPath, string $browser, ?string $baseUrl): string
{
    $nodeBinary = getenv('NODE_BINARY') ?: 'node';
    $scriptPath = realpath(__DIR__ . '/../../services/pdf/renderQuotePdf.js');

    if (!$scriptPath) {
        throw new RuntimeException('Playwright renderer script is missing.');
    }

    $parts = [
        escapeshellcmd($nodeBinary),
        escapeshellarg($scriptPath),
        '--input=' . escapeshellarg($htmlPath),
        '--output=' . escapeshellarg($pdfPath),
        '--browser=' . escapeshellarg(normalizeBrowser($browser)),
    ];

    if ($baseUrl) {
        $parts[] = '--base-url=' . escapeshellarg($baseUrl);
    }

    return implode(' ', $parts) . ' 2>&1';
}

function cleanupTemporaryFiles(?string $htmlPath, ?string $pdfPath): void
{
    foreach ([$htmlPath, $pdfPath] as $path) {
        if ($path && file_exists($path)) {
            @unlink($path);
        }
    }
}
