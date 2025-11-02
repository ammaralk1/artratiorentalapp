-- Backfill missing columns on legacy telegram_links tables
-- Adds context + created_at if they do not already exist

ALTER TABLE telegram_links
  ADD COLUMN context VARCHAR(16) NOT NULL DEFAULT 'technician' AFTER token;

ALTER TABLE telegram_links
  ADD COLUMN created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER chat_id;

