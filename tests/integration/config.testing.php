<?php
return [
    'app' => [
        'timezone' => 'Asia/Riyadh',
    ],
    'db' => [
        'host' => 'db',
        'name' => 'art_ratio_test',
        'user' => 'art_ratio',
        'pass' => 'testpassword',
        'charset' => 'utf8mb4',
    ],
    'security' => [
        'allowed_origins' => [
            'http://127.0.0.1:8080',
            'http://localhost:8080'
        ],
        'session_name' => 'art_ratio_session_test',
        'enforce_https' => false,
    ],
    'sirv' => [
        'client_id' => 'TEST_CLIENT_ID',
        'client_secret' => 'TEST_CLIENT_SECRET',
        'api_base' => 'https://api.sirv.com',
        'cdn_base' => 'https://example.sirv.com',
        'upload_folder' => '/art-ratio/uploads-test',
        'max_file_size' => 5 * 1024 * 1024,
    ],
];
