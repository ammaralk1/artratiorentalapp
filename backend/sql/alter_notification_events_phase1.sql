-- Phase 1: Extend notification_events schema and add indexes
-- Note: run each statement manually if your MySQL variant doesn't support IF EXISTS/IF NOT EXISTS.

-- Drop legacy unique index if it exists (from early versions)
-- ALTERs may fail if index doesn't exist; that's acceptable in manual runs.
DROP INDEX uq_event ON notification_events;

-- Add new columns for extended tracking (ignore errors if columns already exist)
ALTER TABLE notification_events
  ADD COLUMN batch_id VARCHAR(64) NULL,
  ADD COLUMN attempt INT UNSIGNED NOT NULL DEFAULT 1,
  ADD COLUMN sent_at DATETIME NULL,
  ADD COLUMN provider_status_code VARCHAR(32) NULL,
  ADD COLUMN provider_message_id VARCHAR(64) NULL,
  ADD COLUMN provider_error TEXT NULL,
  ADD COLUMN meta_json JSON NULL,
  ADD COLUMN scheduled_at DATETIME NULL;

-- Indexes for common query patterns
CREATE INDEX idx_notification_created_at ON notification_events (created_at);
CREATE INDEX idx_notification_event ON notification_events (event_type);
CREATE INDEX idx_notification_entity ON notification_events (entity_type, entity_id);
CREATE INDEX idx_notification_status ON notification_events (status);
CREATE INDEX idx_notification_channel ON notification_events (channel);
CREATE INDEX idx_notification_recipient ON notification_events (recipient_identifier(64));

