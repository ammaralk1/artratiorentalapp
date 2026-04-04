-- Adds reservation payment progress columns used by the back-office reservation flow.
ALTER TABLE reservations
  ADD COLUMN IF NOT EXISTS paid_amount DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER paid_status,
  ADD COLUMN IF NOT EXISTS paid_percentage DECIMAL(8,2) NOT NULL DEFAULT 0 AFTER paid_amount,
  ADD COLUMN IF NOT EXISTS payment_progress_type VARCHAR(20) DEFAULT NULL AFTER paid_percentage,
  ADD COLUMN IF NOT EXISTS payment_progress_value DECIMAL(12,2) DEFAULT NULL AFTER payment_progress_type;
