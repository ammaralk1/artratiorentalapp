-- Adds a readable technician_name column to telegram_links for quick inspection
ALTER TABLE telegram_links
  ADD COLUMN technician_name VARCHAR(191) NULL AFTER technician_id;

