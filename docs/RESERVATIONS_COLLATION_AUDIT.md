# Reservations Collation Audit

## Failing Endpoint / Path
- Failing endpoint:
  - `GET /api/reservations/`
- Primary backend path:
  - [backend/api/reservations/index.php](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/reservations/index.php)
- Exact failing query branch:
  - [fetchReservationTechnicians()](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/reservations/index.php#L1737)

## Exact SQL / Query Cause
- The reservations API loads technician assignments for each reservation.
- In the real restored dataset, the join fallback compared:
  - `technician_positions.name`
  - `reservation_technicians.position_key`
- Original comparison:
  - `tp.name = rt.position_key`
- Real-data failure:
  - `tp.name` uses `utf8mb4_unicode_ci`
  - `rt.position_key` uses `utf8mb4_general_ci`
- Result:
  - MySQL/MariaDB throws:
    - `Illegal mix of collations (utf8mb4_unicode_ci,IMPLICIT) and (utf8mb4_general_ci,IMPLICIT) for operation '='`

## Affected Tables / Columns

### Table-level collations
- `reservation_technicians`
  - `utf8mb4_general_ci`
- `technician_positions`
  - `utf8mb4_unicode_ci`

### Column-level collations
- `reservation_technicians.position_key`
  - `utf8mb4_general_ci`
- `reservation_technicians.position_name`
  - `utf8mb4_general_ci` before fix
- `reservation_technicians.position_label_ar`
  - `utf8mb4_general_ci` before fix
- `reservation_technicians.position_label_en`
  - `utf8mb4_general_ci` before fix
- `technician_positions.name`
  - `utf8mb4_unicode_ci`
- `technician_positions.label_ar`
  - `utf8mb4_unicode_ci`
- `technician_positions.label_en`
  - `utf8mb4_unicode_ci`

## Additional Path Affected
- The same mixed-collation comparison also existed in the Phase 4 backfill tool:
  - [backend/tools/apply_phase4_schema_updates.php](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/tools/apply_phase4_schema_updates.php)
- It also existed in the SQL backfill script:
  - [backend/sql/migrate_reservation_position_rates.sql](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/sql/migrate_reservation_position_rates.sql)

## Mismatch Summary
- Root mismatch:
  - reservation technician snapshot columns inherited `general_ci`
  - technician position master data uses `unicode_ci`
- Why this happens:
  - the snapshot columns were added to a `reservation_technicians` table whose table collation was `utf8mb4_general_ci`
  - the added migration did not pin those new columns to `utf8mb4_unicode_ci`

## Recommended Fix

### Chosen fix strategy
- Combination fix:
  1. query-level explicit `COLLATE utf8mb4_unicode_ci` on the fallback text comparison
  2. schema-level normalization of reservation technician snapshot text columns to `utf8mb4_unicode_ci`
  3. update migration/tooling so future runs do not reintroduce the mismatch

### Why this is the safest fix
- Query-level `COLLATE` fixes runtime immediately, even for older restored backups.
- Schema normalization makes the data model durable rather than permanently relying on a fragile mixed-collation state.
- Updating migration/tooling makes the fix reusable for future local/staging restores without touching production directly.
