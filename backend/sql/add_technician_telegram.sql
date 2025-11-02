-- Adds optional telegram_chat_id to technicians table
ALTER TABLE technicians
  ADD COLUMN telegram_chat_id VARCHAR(64) NULL AFTER phone;

-- Optional index if you plan to search/filter by this field
CREATE INDEX idx_technicians_telegram ON technicians (telegram_chat_id);

