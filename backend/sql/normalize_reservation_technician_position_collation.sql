-- Migration: Normalize reservation technician snapshot text columns to utf8mb4_unicode_ci
-- Purpose: Keep reservation snapshot text compatible with technician_positions text columns

ALTER TABLE reservation_technicians
  MODIFY position_key VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  MODIFY position_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  MODIFY position_label_ar VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  MODIFY position_label_en VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;
