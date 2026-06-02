# Reservations Collation Fix Report

## Goal
- Fix the `reservations` real-data runtime failure in isolated local validation.
- Restore healthy behavior for home, dashboard, and projects on restored production-like data.

## What Was Changed

### 1. Runtime query hardening
- Updated the fallback technician-position join in:
  - [backend/api/reservations/index.php](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/reservations/index.php)
- Change:
  - added explicit `COLLATE utf8mb4_unicode_ci` on the text comparison between:
    - `technician_positions.name`
    - `reservation_technicians.position_key`

### 2. Schema patch tool hardening
- Updated:
  - [backend/tools/apply_phase4_schema_updates.php](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/tools/apply_phase4_schema_updates.php)
- Changes:
  - added `columnCollation()` helper
  - made newly added snapshot text columns explicitly `utf8mb4_unicode_ci`
  - added conditional normalization for:
    - `position_key`
    - `position_name`
    - `position_label_ar`
    - `position_label_en`
  - added explicit `COLLATE utf8mb4_unicode_ci` to the reservation technician backfill join

### 3. Migration alignment
- Updated:
  - [backend/sql/add_reservation_technicians_position_columns.sql](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/sql/add_reservation_technicians_position_columns.sql)
  - [backend/sql/migrate_reservation_position_rates.sql](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/sql/migrate_reservation_position_rates.sql)
- Added:
  - [backend/sql/normalize_reservation_technician_position_collation.sql](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/sql/normalize_reservation_technician_position_collation.sql)

## Why This Fix Was Chosen
- The runtime failure was caused by a real schema/data mismatch, not by frontend logic.
- A pure local one-off SQL patch would have fixed today’s restored DB but not future restores.
- A pure query-only fix would have left the schema patch tool failing on restored data.
- This combined fix restores runtime now and makes the repair migration-ready.

## Local Validation Steps Performed
1. Ran the updated schema tool locally:
   - `docker exec art_ratio_test_php php backend/tools/apply_phase4_schema_updates.php`
2. Re-validated:
   - `GET /api/reservations/`
   - `npm run backoffice:local:smoke`
   - `npm run test:reservations`
   - Playwright runtime pass on:
     - login
     - home
     - dashboard reservations tab
     - projects

## Result
- `GET /api/reservations/` now returns `200` on restored local real data.
- Home no longer emits the earlier reservations prefetch failure.
- Dashboard reservations tab no longer emits the earlier `500` chain.
- Projects no longer enters the earlier reservations-triggered cooldown cascade.

## What Stayed Unchanged
- Production was untouched.
- `Arino - Template/` was untouched.
- No core feature was removed.
- No broad reservation workflow redesign was introduced.

## Local-Only vs Migration-Ready
- Local DB repair was applied only inside the isolated local validation environment.
- Code and SQL changes are migration-ready for future isolated restores and later controlled release planning.

## Residual Notes
- Headless-browser login still emits low-severity Credential API warnings:
  - unsupported stored credentials API in headless runtime
- Existing jsdom warning noise in reservation-related tests still remains as previously documented, but it is unrelated to the collation blocker.
