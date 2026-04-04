<?php

declare(strict_types=1);

require_once __DIR__ . '/../../vendor/autoload.php';

// Global stub so Router tests work without a full bootstrap stack.
// Will be overridden if the real bootstrap is loaded.
if (!function_exists('respondError')) {
    function respondError(string $message, int $status = 400, array $extra = []): void
    {
        \ArtRatio\Tests\RouterTest::$lastError = ['message' => $message, 'status' => $status];
    }
}
