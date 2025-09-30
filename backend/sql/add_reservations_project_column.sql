-- Add project_id column to reservations table (if not already present)
ALTER TABLE reservations
  ADD COLUMN project_id BIGINT UNSIGNED NULL DEFAULT NULL AFTER total_amount;

CREATE INDEX idx_reservations_project_id ON reservations (project_id);
