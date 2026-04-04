-- Add project_id column to reservations table (idempotent local/staging bootstrap)
ALTER TABLE reservations
  ADD COLUMN IF NOT EXISTS project_id BIGINT UNSIGNED NULL DEFAULT NULL AFTER total_amount;
