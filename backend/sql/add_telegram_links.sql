-- Mapping tokens/phones to Telegram chat IDs for deep-link based linking
CREATE TABLE IF NOT EXISTS telegram_links (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(64) NOT NULL UNIQUE,
  context VARCHAR(16) NOT NULL DEFAULT 'technician', -- 'technician' | 'admin'
  technician_id BIGINT UNSIGNED NULL,
  phone VARCHAR(32) NULL,
  chat_id VARCHAR(64) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  used_at DATETIME NULL,
  INDEX idx_context_token (context, token),
  INDEX idx_tech (technician_id),
  INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

