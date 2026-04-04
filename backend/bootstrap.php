<?php
declare(strict_types=1);

// Composer autoloader — makes repository classes available throughout the app
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require_once __DIR__ . '/../vendor/autoload.php';
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
    error_log('API error: ' . $bootstrapError->getMessage());
    respondError('Unexpected server error', 500);
    exit;
}
