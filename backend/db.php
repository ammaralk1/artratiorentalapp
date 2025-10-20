<?php
use \\PDO;
use \\PDOException;
use \\RuntimeException;

function create_pdo(array $settings): PDO
{
    if (!extension_loaded('pdo_mysql')) {
        throw new RuntimeException('The pdo_mysql extension is not enabled on this server.');
    }

    $host = $settings['host'] ?? 'localhost';
    $database = $settings['name'] ?? '';
    $user = $settings['user'] ?? '';
    $password = $settings['pass'] ?? '';
    $charset = $settings['charset'] ?? 'utf8mb4';

    if ($database === '' || $user === '') {
        throw new RuntimeException('Database name and user must be provided in the configuration.');
    }

    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $host, $database, $charset);

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        return new PDO($dsn, $user, $password, $options);
    } catch (PDOException $exception) {
        throw new RuntimeException('Failed to connect to the database: ' . $exception->getMessage(), 0, $exception);
    }
}
