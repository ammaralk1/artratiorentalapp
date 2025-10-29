-- Adds sale_price column to project_expenses to store per-service sale price
ALTER TABLE project_expenses
  ADD COLUMN sale_price DECIMAL(12,2) NOT NULL DEFAULT 0
  AFTER amount;

