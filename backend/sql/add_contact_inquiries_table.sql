CREATE TABLE IF NOT EXISTS contact_inquiries (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    inquiry_code VARCHAR(40) NOT NULL,
    full_name VARCHAR(160) NOT NULL,
    company_name VARCHAR(160) NULL,
    email VARCHAR(190) NOT NULL,
    phone VARCHAR(80) NOT NULL,
    project_type VARCHAR(160) NULL,
    message TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'new',
    internal_notes TEXT NULL,
    assigned_user_id BIGINT UNSIGNED NULL,
    assigned_username VARCHAR(120) NULL,
    follow_up_at DATETIME NULL,
    last_contacted_at DATETIME NULL,
    closed_at DATETIME NULL,
    inquiry_lang VARCHAR(5) NOT NULL DEFAULT 'ar',
    source_path VARCHAR(255) NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(500) NULL,
    notification_attempted TINYINT(1) NOT NULL DEFAULT 0,
    notification_sent TINYINT(1) NOT NULL DEFAULT 0,
    notification_provider VARCHAR(50) NULL,
    notification_recipient VARCHAR(500) NULL,
    notification_subject VARCHAR(255) NULL,
    notification_error TEXT NULL,
    notified_at DATETIME NULL,
    raw_payload JSON NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_contact_inquiries_code (inquiry_code),
    KEY idx_contact_inquiries_created_at (created_at),
    KEY idx_contact_inquiries_email (email),
    KEY idx_contact_inquiries_ip (ip_address),
    KEY idx_contact_inquiries_status (status),
    KEY idx_contact_inquiries_follow_up_at (follow_up_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_inquiry_code_counter (
    id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
    next_number INT UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_inquiry_activities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    inquiry_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NULL,
    username VARCHAR(120) NULL,
    action_type VARCHAR(40) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    KEY idx_contact_inquiry_activities_inquiry (inquiry_id),
    KEY idx_contact_inquiry_activities_created_at (created_at),
    CONSTRAINT fk_contact_inquiry_activities_inquiry
        FOREIGN KEY (inquiry_id) REFERENCES contact_inquiries(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
