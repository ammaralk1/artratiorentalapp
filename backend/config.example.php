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
        // SMTP-only configuration
        'enabled' => false,
        'provider' => 'smtp',
        'from_email' => 'no-reply@your-domain.com',
        'from_name' => 'Art Ratio',
        'smtp_host' => 'mail.your-domain.com',
        'smtp_port' => 465,
        'smtp_secure' => 'ssl', // 'ssl' or 'tls'
        'smtp_user' => 'no-reply@your-domain.com',
        'smtp_pass' => 'YOUR_SMTP_PASSWORD',
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
        // Admin receives all technician-like messages too
        'admin_receive_all' => true,
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
