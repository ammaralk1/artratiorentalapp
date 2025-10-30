-- Adds an optional note column to project_expenses for per-expense comments
ALTER TABLE project_expenses
  ADD COLUMN IF NOT EXISTS note TEXT NULL DEFAULT NULL AFTER sale_price;

