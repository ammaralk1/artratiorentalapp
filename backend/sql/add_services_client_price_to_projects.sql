-- Adds services_client_price to projects to capture client price for production services
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS services_client_price DECIMAL(12,2) NOT NULL DEFAULT 0
  AFTER expenses_total;
