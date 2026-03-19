-- Equipment cart + request tables for public website equipment flow.

CREATE TABLE IF NOT EXISTS equipment_cart_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_token VARCHAR(128) NOT NULL,
    item_key CHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    image_url TEXT NULL,
    category VARCHAR(190) NULL,
    subcategory VARCHAR(190) NULL,
    qty INT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_equipment_cart_session_item (session_token, item_key),
    KEY idx_equipment_cart_session_updated (session_token, updated_at),
    KEY idx_equipment_cart_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS equipment_requests (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    request_code VARCHAR(40) NOT NULL,
    session_token VARCHAR(128) NOT NULL,
    customer_name VARCHAR(160) NOT NULL,
    customer_email VARCHAR(190) NOT NULL,
    customer_phone VARCHAR(80) NOT NULL,
    notes TEXT NULL,
    status ENUM('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
    total_items INT UNSIGNED NOT NULL DEFAULT 0,
    request_lang VARCHAR(5) NOT NULL DEFAULT 'ar',
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(500) NULL,
    raw_payload JSON NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_equipment_requests_code (request_code),
    KEY idx_equipment_requests_created_at (created_at),
    KEY idx_equipment_requests_status (status),
    KEY idx_equipment_requests_ip (ip_address),
    KEY idx_equipment_requests_session (session_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS equipment_request_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT UNSIGNED NOT NULL,
    item_key CHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    image_url TEXT NULL,
    category VARCHAR(190) NULL,
    subcategory VARCHAR(190) NULL,
    qty INT UNSIGNED NOT NULL DEFAULT 1,
    item_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    item_status_note VARCHAR(500) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    KEY idx_equipment_request_items_request (request_id),
    CONSTRAINT fk_equipment_request_items_request
      FOREIGN KEY (request_id) REFERENCES equipment_requests(id)
      ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS equipment_request_code_counter (
    id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
    next_number INT UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS equipment_request_messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT UNSIGNED NOT NULL,
    sender_user_id BIGINT UNSIGNED NULL,
    channel ENUM('email','system') NOT NULL DEFAULT 'email',
    subject VARCHAR(255) NULL,
    message TEXT NOT NULL,
    recipient VARCHAR(190) NULL,
    delivery_status ENUM('sent','failed','pending') NOT NULL DEFAULT 'pending',
    provider VARCHAR(50) NULL,
    error_message VARCHAR(500) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    KEY idx_equipment_request_messages_request (request_id),
    KEY idx_equipment_request_messages_created (created_at),
    CONSTRAINT fk_equipment_request_messages_request
      FOREIGN KEY (request_id) REFERENCES equipment_requests(id)
      ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
