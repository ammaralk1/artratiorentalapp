<?php
require_once __DIR__ . '/../bootstrap.php';

try {
    $pdo = getDatabaseConnection();
    $statement = $pdo->query('SELECT 1');
    $statement->fetch();

    respond([
        'status' => 'healthy',
        'timestamp' => (new DateTimeImmutable())->format(DateTimeInterface::ATOM),
    ]);
} catch (Throwable $exception) {
    respondError('Database connection failed', 500, [
        'details' => $exception->getMessage(),
    ]);
}
