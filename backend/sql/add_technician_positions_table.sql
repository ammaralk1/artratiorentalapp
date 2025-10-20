CREATE TABLE IF NOT EXISTS technician_positions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    cost DECIMAL(10,2) NOT NULL DEFAULT 0,
    client_price DECIMAL(10,2) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY idx_technician_positions_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO technician_positions (name, cost, client_price)
VALUES
    ('مصور فوتوغرافي', 0, NULL),
    ('مصور فيديو', 0, NULL),
    ('مونتير', 0, NULL),
    ('مخرج', 0, NULL),
    ('مدير تصوير', 0, NULL),
    ('مساعد إضاءة', 0, NULL),
    ('مساعد كاميرا', 0, NULL)
ON DUPLICATE KEY UPDATE name = VALUES(name);
