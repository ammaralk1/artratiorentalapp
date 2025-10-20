<?php

declare(strict_types=1);

function loadApplicationConfig(string $configPath): array
{
    if (!is_file($configPath)) {
        throw new RuntimeException('Missing configuration file. Copy backend/config.example.php to backend/config.php and fill in your credentials.');
    }

    $config = require $configPath;

    if (!is_array($config)) {
        throw new RuntimeException('Configuration file must return an array.');
    }

    return $config;
}

function setApplicationConfig(array $config): void
{
    $GLOBALS['app_config'] = $config;
}

function getAppConfig(?string $section = null, ?string $key = null, mixed $default = null): mixed
{
    $config = $GLOBALS['app_config'] ?? [];

    if ($section === null) {
        return $config;
    }

    if (!array_key_exists($section, $config)) {
        return $default;
    }

    $sectionConfig = $config[$section];

    if ($key === null) {
        return $sectionConfig;
    }

    return $sectionConfig[$key] ?? $default;
}

function resolveApplicationTimezone(array $config, string $fallback = 'Asia/Riyadh'): string
{
    $candidateTimezone = $config['app']['timezone'] ?? $fallback;
    $candidateTimezone = (string) $candidateTimezone;

    try {
        $timezoneObject = new DateTimeZone($candidateTimezone);
        return $timezoneObject->getName();
    } catch (Throwable $timezoneError) {
        error_log(sprintf('Invalid timezone "%s" supplied. Falling back to UTC. Error: %s', $candidateTimezone, $timezoneError->getMessage()));
        return 'UTC';
    }
}

function applyApplicationTimezone(string $timezone): void
{
    date_default_timezone_set($timezone);
    $GLOBALS['app_timezone'] = $timezone;
}

function getApplicationTimezone(): ?string
{
    return $GLOBALS['app_timezone'] ?? null;
}
