# Backup Import Plan

## Goal
- Restore the provided backend database backup into an isolated local validation environment only.
- Avoid any production connection, production configuration, or production data mutation.

## Backup Under Review
- File:
  - `/Users/ammaralkhatib/Downloads/mysql-backup-art_ratio_rental_app-20260331_021002.sql.gz`
- Detected type:
  - gzip-compressed SQL dump
- Source format:
  - MariaDB dump 10.19 / MariaDB 10.6.x style SQL export
- Dump target database in header:
  - `art_ratio_rental_app`

## Safe Import Environment
- Target environment:
  - local Docker integration MySQL only
- Current isolated DB host:
  - `127.0.0.1:33306`
- Current isolated DB name:
  - `art_ratio_test`
- Current isolated DB user:
  - `art_ratio`

## Why This Is Safe
- The dump does not include:
  - `CREATE DATABASE`
  - `DROP DATABASE`
  - `USE ...`
  - `DEFINER=...`
- That means it can be imported into an existing isolated database without inheriting production schema ownership or trying to switch DBs.
- The import will remain completely local inside the Docker MySQL container.

## Risks
- The dump appears to contain real operational data and PII:
  - names
  - phone numbers
  - emails
  - IP addresses
  - user agents
  - activity logs
- The dump may contain production-like volume and edge cases that differ from the current seeded test data.
- The dump was produced by MariaDB and will be imported into MySQL 8, which is usually compatible for basic table/data dumps but still requires validation.
- Importing into `art_ratio_test` would overwrite the seeded validation dataset unless a rollback copy is taken first.

## Chosen Import Method
1. Keep the current Docker integration stack isolated and running locally.
2. Create a rollback SQL dump of the current `art_ratio_test` database before any restore.
3. Drop and recreate the local `art_ratio_test` database inside the isolated MySQL container.
4. Stream-import the provided `.sql.gz` backup into the recreated local DB.
5. Re-run the local schema patch tool:
   - `backend/tools/apply_phase4_schema_updates.php`
6. Reinsert the deterministic local-only validation user:
   - `integration_admin`
   - this is required so the restored local environment remains accessible for validation without relying on unknown production passwords
7. Verify DB connectivity and API access against the restored data.
8. Run real-data validation against the app.

## Why This Method Was Chosen
- It keeps the application pointing at the same isolated stack it already uses.
- It avoids patching the app toward another environment or any production-like host.
- It preserves a rollback path for the seeded dataset.
- It supports full UI/runtime validation against real restored data.

## Rollback Plan
- If the import fails or validation needs the seeded test data back:
  1. drop and recreate `art_ratio_test`
  2. restore the pre-import rollback SQL dump taken from the isolated local DB
  3. rerun `backend/tools/apply_phase4_schema_updates.php`
  4. rerun the integration admin seed

## Sanitization Note
- No sanitization is planned inside this pass because the task is validation, not dataset transformation.
- The restored data must stay in isolated local/staging only and must not be exposed outside the validation environment.

## Success Criteria
- The dump imports into isolated local MySQL successfully.
- The PHP API can connect to the restored database.
- The app can authenticate locally with the validation-only user.
- Real-data validation can be executed without touching production.
