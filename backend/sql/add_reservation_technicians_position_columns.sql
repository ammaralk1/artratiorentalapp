-- Migration: Add position snapshot columns to reservation_technicians
-- Purpose: Persist crew assignments (position + pricing) per reservation

ALTER TABLE reservation_technicians
  ADD COLUMN position_id INT NULL AFTER role,
  ADD COLUMN position_key VARCHAR(255) NULL AFTER position_id,
  ADD COLUMN position_name VARCHAR(255) NULL AFTER position_key,
  ADD COLUMN position_label_ar VARCHAR(255) NULL AFTER position_name,
  ADD COLUMN position_label_en VARCHAR(255) NULL AFTER position_label_ar,
  ADD COLUMN position_cost DECIMAL(10,2) NULL DEFAULT 0 AFTER position_label_en,
  ADD COLUMN position_client_price DECIMAL(10,2) NULL DEFAULT 0 AFTER position_cost,
  ADD COLUMN assignment_id VARCHAR(64) NULL AFTER position_client_price;

ALTER TABLE reservation_technicians
  ADD INDEX idx_rt_position_id (position_id);

ALTER TABLE reservation_technicians
  ADD CONSTRAINT fk_rt_position
  FOREIGN KEY (position_id) REFERENCES technician_positions(id)
  ON DELETE SET NULL;

