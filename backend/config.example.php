<?php
return [
    'app' => [
        'timezone' => 'Asia/Riyadh',
    ],
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
    'sirv' => [
        // Sirv API credentials – obtain from your Sirv dashboard
        'client_id' => 'YOUR_SIRV_CLIENT_ID',
        'client_secret' => 'YOUR_SIRV_CLIENT_SECRET',
        // Optional overrides
        'api_base' => 'https://api.sirv.com',
        'cdn_base' => 'https://your-bucket.sirv.com',
        'upload_folder' => '/art-ratio/uploads',
    ],
    'pdf' => [
        // Override Node.js binary path if "node" is not on the PATH in production
        // 'node_path' => '/usr/local/bin/node'
    ],
];
