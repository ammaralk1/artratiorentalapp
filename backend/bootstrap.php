<?php
declare(strict_types=1);

// Debug: log the HTTP_ORIGIN value
error_log('HTTP_ORIGIN: ' . ($_SERVER['HTTP_ORIGIN'] ?? 'none'));

// TEMP: Allow all origins for debugging
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/bootstrap/autoload.php';

try {
    $configPath = __DIR__ . '/config.php';
    $config = loadApplicationConfig($configPath);
    setApplicationConfig($config);

    $timezone = resolveApplicationTimezone($config);
    applyApplicationTimezone($timezone);

    initialiseHttpEnvironment($config);
    ensureUserPreferencesLoaded();
} catch (RuntimeException $configError) {
    respondError($configError->getMessage(), 500);
    exit;
} catch (Throwable $bootstrapError) {
    respondError('Unexpected server error', 500, [
        'details' => $bootstrapError->getMessage(),
    ]);
    exit;
}
