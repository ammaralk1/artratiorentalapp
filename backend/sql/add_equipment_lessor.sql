-- Migration: Add lessor column to equipment
-- Adds a nullable lessor (renter) name for each equipment item

ALTER TABLE equipment
  ADD COLUMN lessor VARCHAR(255) NULL AFTER image_url;

