-- Adds optional status/cancelled fields to projects (idempotent if applied once)
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS status VARCHAR(50) NULL DEFAULT NULL AFTER end_datetime,
  ADD COLUMN IF NOT EXISTS cancelled TINYINT(1) NOT NULL DEFAULT 0 AFTER status;

