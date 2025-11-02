-- Stores reusable notification templates
CREATE TABLE IF NOT EXISTS notification_templates (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  channel ENUM('email','telegram','both') NOT NULL DEFAULT 'both',
  subject VARCHAR(191) NULL,
  body_html MEDIUMTEXT NULL,
  body_text MEDIUMTEXT NULL,
  attachment_url VARCHAR(512) NULL,
  attachment_urls JSON NULL,
  variables JSON NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_template_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
