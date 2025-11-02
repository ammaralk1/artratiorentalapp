-- Stores inbound/outbound Telegram messages for simple chat viewing
CREATE TABLE IF NOT EXISTS telegram_messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  message_id BIGINT NULL,
  chat_id VARCHAR(64) NOT NULL,
  technician_id BIGINT UNSIGNED NULL,
  direction ENUM('inbound','outbound') NOT NULL,
  text TEXT NULL,
  from_id BIGINT NULL,
  from_username VARCHAR(191) NULL,
  raw_json JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_tm_chat (chat_id),
  INDEX idx_tm_tech (technician_id),
  INDEX idx_tm_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

