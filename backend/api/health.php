<?php
require_once __DIR__ . '/../bootstrap.php';

requireAuthenticated();

try {
    $pdo = getDatabaseConnection();
    $statement = $pdo->query('SELECT 1');
    $statement->fetch();

    respond([
        'status' => 'healthy',
        'timestamp' => (new DateTimeImmutable())->format(DateTimeInterface::ATOM),
    ]);
} catch (Throwable $exception) {
    error_log('API error: ' . $exception->getMessage());
    respondError('Database connection failed', 500);
}
