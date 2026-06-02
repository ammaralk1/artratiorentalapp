<?php
declare(strict_types=1);

/**
 * Resolve a backend config file for CLI-only tools.
 *
 * Supported forms:
 *   php backend/tools/migrate.php --config /safe/staging-config.php --status
 *   php backend/tools/migrate.php --config=/safe/staging-config.php --status
 *   ART_RATIO_CONFIG_PATH=/safe/staging-config.php php backend/tools/migrate.php --status
 */
function resolveCliConfigPath(array $argv, string $defaultPath): string
{
    $candidate = getenv('ART_RATIO_CONFIG_PATH') ?: $defaultPath;

    foreach ($argv as $index => $arg) {
        if ($arg === '--config' && isset($argv[$index + 1])) {
            $candidate = (string) $argv[$index + 1];
            break;
        }

        if (str_starts_with((string) $arg, '--config=')) {
            $candidate = substr((string) $arg, strlen('--config='));
            break;
        }
    }

    $path = realpath($candidate);
    if ($path === false || !is_file($path)) {
        throw new RuntimeException("Configuration file not found: {$candidate}");
    }

    return $path;
}

function loadCliConfig(array $argv, string $defaultPath): array
{
    $configPath = resolveCliConfigPath($argv, $defaultPath);
    $config = require $configPath;

    if (!is_array($config)) {
        throw new RuntimeException("Configuration file must return an array: {$configPath}");
    }

    return $config;
}

function loadCliDbSettings(array $argv, string $defaultPath): array
{
    $config = loadCliConfig($argv, $defaultPath);
    $dbSettings = $config['db'] ?? null;

    if (!is_array($dbSettings)) {
        throw new RuntimeException('Database settings are missing from the selected config file.');
    }

    return $dbSettings;
}
