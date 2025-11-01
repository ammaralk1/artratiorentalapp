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
        // 'max_file_size' => 5242880, // Override max upload size (in bytes)
        // 'upload_rules' => [
        //     [
        //         'mime' => 'image/jpeg',
        //         'extensions' => ['jpg', 'jpeg'],
        //     ],
        //     [
        //         'mime' => 'application/pdf',
        //         'extensions' => ['pdf'],
        //     ],
        // ],
    ],
    'email' => [
        // Enable and configure your email provider
        'enabled' => false,
        'provider' => 'sendgrid',
        'from_email' => 'no-reply@your-domain.com',
        'from_name' => 'Art Ratio',
        'sendgrid_api_key' => 'YOUR_SENDGRID_API_KEY',
    ],
    'whatsapp' => [
        // WhatsApp Cloud API configuration
        'enabled' => false,
        'access_token' => 'YOUR_WHATSAPP_CLOUD_ACCESS_TOKEN',
        'phone_number_id' => 'YOUR_PHONE_NUMBER_ID',
        // 'api_base' => 'https://graph.facebook.com/v20.0',
    ],
    'notifications' => [
        // Optional top-level toggles (fallbacks to email.enabled/whatsapp.enabled)
        // 'email_enabled' => true,
        // 'whatsapp_enabled' => true,
        // If true, notifications go only to admins (below), not to managers
        'admin_only' => true,
        // Admin recipients
        'admin_emails' => [/* 'admin@your-domain.com' */],
        'admin_whatsapp_numbers' => [/* '+9665XXXXXXX' */],
        // Manager recipients (used only if admin_only = false)
        'manager_emails' => [/* 'ops@your-domain.com' */],
        'manager_whatsapp_numbers' => [/* '+9665YYYYYYY' */],
    ],
];
