-- Adds optional per-service day count for project production services.
ALTER TABLE project_expenses
  ADD COLUMN IF NOT EXISTS service_days INT UNSIGNED NOT NULL DEFAULT 1
  AFTER sale_price;
