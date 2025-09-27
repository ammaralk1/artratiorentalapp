<?php
return [
    'db' => [
        'host' => 'localhost',
        'name' => 'YOUR_DATABASE_NAME',
        'user' => 'YOUR_DATABASE_USER',
        'pass' => 'YOUR_DATABASE_PASSWORD',
        'charset' => 'utf8mb4',
    ],
    'security' => [
        'allowed_origins' => [
            'http://localhost:5173',
            'https://your-production-domain.com'
        ],
        'session_name' => 'art_ratio_session',
    ],
    'auth' => [
        // SHA-256 hashes for the allowed username and password.
        'username_hash' => '4183ac4c8fe6969855d033d804ab4f4e8f2c095a06edb1a903626c6d468d9094',
        'password_hash' => '306c7a94b7ba9d5e467d6bf75bb631ff88a44f7c1ae613717643ccee353ed6d1',
    ],
];
