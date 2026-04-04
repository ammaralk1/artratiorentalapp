<?php

declare(strict_types=1);

$bootstrapFiles = [
    __DIR__ . '/polyfills.php',
    __DIR__ . '/config.php',
    __DIR__ . '/database.php',
    __DIR__ . '/preferences.php',
    __DIR__ . '/translation.php',
    __DIR__ . '/response.php',
    __DIR__ . '/auth.php',
    __DIR__ . '/ratelimit.php',
    __DIR__ . '/environment.php',
];

foreach ($bootstrapFiles as $file) {
    require_once $file;
}

require_once __DIR__ . '/../Router.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';
