<?php
return [
    'app' => [
        'timezone' => 'Asia/Riyadh',
    ],
    'db' => [
        'host' => 'STAGING_DB_HOST',
        'name' => 'art_ratio_staging',
        'user' => 'STAGING_DB_USER',
        'pass' => 'STAGING_DB_PASSWORD',
        'charset' => 'utf8mb4',
    ],
    'security' => [
        'allowed_origins' => [
            'https://staging.example.com',
        ],
        'session_name' => 'art_ratio_session_staging',
        'enforce_https' => true,
    ],
    'storage' => [
        'max_file_size' => 5242880,
        'cloudflare_r2' => [
            'enabled' => false,
            'account_id' => 'STAGING_CLOUDFLARE_ACCOUNT_ID',
            'access_key_id' => 'STAGING_R2_ACCESS_KEY_ID',
            'secret_access_key' => 'STAGING_R2_SECRET_ACCESS_KEY',
            'bucket' => 'art-ratio-staging',
            'public_base_url' => 'https://assets-staging.example.com',
            'upload_folder' => '/art-ratio-staging/uploads',
            'region' => 'auto',
        ],
    ],
    'sirv' => [
        'client_id' => 'STAGING_SIRV_CLIENT_ID',
        'client_secret' => 'STAGING_SIRV_CLIENT_SECRET',
        'api_base' => 'https://api.sirv.com',
        'cdn_base' => 'https://staging.example.sirv.com',
        'upload_folder' => '/art-ratio-staging/uploads',
    ],
    'email' => [
        'enabled' => false,
        'provider' => 'smtp',
        'from_email' => 'no-reply@staging.example.com',
        'from_name' => 'Art Ratio Staging',
        'smtp_host' => 'smtp.staging.example.com',
        'smtp_port' => 465,
        'smtp_secure' => 'ssl',
        'smtp_user' => 'no-reply@staging.example.com',
        'smtp_pass' => 'STAGING_SMTP_PASSWORD',
    ],
    'contact' => [
        'notification_emails' => ['staging@example.com'],
    ],
    'feedback' => [
        'notification_emails' => ['staging@example.com'],
    ],
    'telegram' => [
        'enabled' => false,
        'bot_token' => 'STAGING_TELEGRAM_BOT_TOKEN',
    ],
    'notifications' => [
        'admin_receive_all' => true,
        'admin_only' => true,
        'admin_emails' => ['staging@example.com'],
        'admin_telegram_chat_ids' => [],
        'manager_emails' => [],
        'manager_telegram_chat_ids' => [],
    ],
];
