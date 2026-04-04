# Backup Import Report

## Goal
- Restore the provided database backup into isolated local validation only.
- Confirm whether the app can run against the restored data without touching production.

## Backup File Used
- `/Users/ammaralkhatib/Downloads/mysql-backup-art_ratio_rental_app-20260331_021002.sql.gz`

## Backup Type / Format
- gzip-compressed SQL dump
- MariaDB dump format
- dump header database name:
  - `art_ratio_rental_app`

## Import Target
- Local Docker MySQL only
- Container:
  - `art_ratio_test_db`
- Database:
  - `art_ratio_test`

## Safety Controls Used
- No production host or config was touched.
- Import stayed inside the local Docker validation stack.
- A rollback dump of the pre-import local test DB was created first:
  - `/tmp/art_ratio_test_pre_realdata_import_20260401_012729.sql`

## Import Method Used
1. Dumped current isolated `art_ratio_test` for rollback.
2. Dropped and recreated `art_ratio_test` inside local Docker MySQL.
3. Stream-imported the `.sql.gz` backup into the recreated DB.
4. Attempted to run [apply_phase4_schema_updates.php](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/tools/apply_phase4_schema_updates.php).
5. Reinserted local-only validation user:
   - `integration_admin`

## Import Result
- SQL dump import:
  - Success
- Local validation user reinsertion:
  - Success after correcting the password hash insertion
- API connectivity after restore:
  - Success
- Full schema patch replay:
  - Failed on one post-import backfill step

## Failure Observed During Post-Import Schema Patch
- Failing step:
  - `reservation technician position snapshot backfill`
- Error:
  - `SQLSTATE[HY000]: General error: 1267 Illegal mix of collations (utf8mb4_unicode_ci,IMPLICIT) and (utf8mb4_general_ci,IMPLICIT) for operation '='`
- Interpretation:
  - The restored backup already contains the relevant schema additions, but the Phase 4 patch tool is not resilient to collation differences present in the real dataset.

## Sanitization / Data Risk Note
- The restored backup appears to contain real operational data and PII.
- Observed examples include:
  - names
  - phone numbers
  - email addresses
  - IP addresses
  - user-agent strings
  - detailed activity logs
- This dataset must remain local/staging only.

## Connectivity Confirmation
- `npm run backoffice:local:smoke` passed after restoring the local-only login user.
- Summary endpoint returned real-data counts:
  - customers: `31`
  - reservations: `25`
  - equipment: `315`
  - technicians: `8`
  - projects: `24`

## Success / Failure Judgment
- Import into isolated local:
  - Successful
- Post-import normalization/patching:
  - Partially failed
- Overall validation status:
  - Usable for real-data validation, but not fully clean

## What Must Be Addressed Next
- Reservations runtime failure caused by collation mismatch in the restored schema/data path.
- Phase 4 schema patch tool should be made more robust when replayed against MariaDB-origin real datasets.
