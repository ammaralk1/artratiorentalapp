-- Adds reservation technician notes required by crew assignment snapshots.
ALTER TABLE reservation_technicians
  ADD COLUMN IF NOT EXISTS notes TEXT NULL AFTER role;
