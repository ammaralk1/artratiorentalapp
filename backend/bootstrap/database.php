<?php

declare(strict_types=1);

function getDatabaseConnection(): PDO
{
    static $connection = null;

    if ($connection instanceof PDO) {
        return $connection;
    }

    $config = getAppConfig('db', null, []);
    if (!is_array($config)) {
        $config = [];
    }

    $connection = create_pdo($config);

    $appTimezone = getApplicationTimezone();

    if ($appTimezone) {
        try {
            $quotedTimezone = $connection->quote($appTimezone);
            $connection->exec("SET time_zone = $quotedTimezone");
        } catch (Throwable $timezoneError) {
            try {
                $offset = (new DateTimeImmutable('now', new DateTimeZone($appTimezone)))->format('P');
                $quotedOffset = $connection->quote($offset);
                $connection->exec("SET time_zone = $quotedOffset");
            } catch (Throwable $offsetError) {
                error_log(sprintf('Failed to apply database timezone "%s": %s', $appTimezone, $offsetError->getMessage()));
            }
        }
    }

    return $connection;
}
