CREATE TABLE IF NOT EXISTS technician_positions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    label_ar VARCHAR(150) DEFAULT NULL,
    label_en VARCHAR(150) DEFAULT NULL,
    cost DECIMAL(10,2) NOT NULL DEFAULT 0,
    client_price DECIMAL(10,2) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY idx_technician_positions_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO technician_positions (name, label_ar, label_en, cost, client_price)
VALUES
    ('photographer', 'مصور فوتوغرافي', 'Photographer', 0, NULL),
    ('videographer', 'مصور فيديو', 'Videographer', 0, NULL),
    ('editor', 'مونتير', 'Editor', 0, NULL),
    ('director', 'مخرج', 'Director', 0, NULL),
    ('dop', 'مدير تصوير', 'Director of Photography', 0, NULL),
    ('lighting-assistant', 'مساعد إضاءة', 'Lighting Assistant', 0, NULL),
    ('camera-assistant', 'مساعد كاميرا', 'Camera Assistant', 0, NULL)
ON DUPLICATE KEY UPDATE
    label_ar = VALUES(label_ar),
    label_en = VALUES(label_en),
    cost = VALUES(cost),
    client_price = VALUES(client_price);
