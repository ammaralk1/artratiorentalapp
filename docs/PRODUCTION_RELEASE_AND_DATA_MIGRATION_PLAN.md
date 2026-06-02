# Production Release And Data Migration Plan

Last updated: 2026-05-28

## Context

Production already exists online and has the real operational MySQL data.

The current local environment was used to implement and verify the UI redesign with copied/backup/test data. That local data is not the source of truth and must not overwrite production.

## Core Rule

Production data wins.

When the redesigned system is uploaded, deploy code and schema migrations only. Do not import the local testing database into production. Do not replace production MySQL rows with local rows.

## Release Goal

Deploy the redesigned frontend/backend safely while preserving all existing production records:

- users
- customers
- technicians
- equipment
- reservations
- projects
- payments and financial records
- uploaded document references
- notification/log records
- any other live operational tables

## Required Pre-Release Steps

1. Freeze production writes or choose a quiet release window.
2. Take a full production database backup.
   - Use an explicit config path, not the default runtime config:
     `npm run release:backup -- --config /safe/production-config.php --output-dir /safe/backups --retention-days 14`
   - Confirm the backup file exists and is non-empty before any production schema inspection.
   - The guarded release-window runner can perform the ordered backup and read-only checks:
     `npm run release:production-window -- --config /safe/production-config.php --backup-dir /safe/backups --confirm-production-window`
3. Take a production file/storage backup if uploads or documents are stored outside MySQL.
4. Export the current production code/config state or tag the current deployed commit.
5. Confirm the production PHP version, MySQL/MariaDB version, web server routing, and writable storage paths.
6. Confirm all production secrets are available outside git:
   - database credentials
   - SMTP credentials
   - Telegram credentials
   - storage credentials
   - app/session secrets

## Migration Strategy

Use schema migrations against production data. Do not restore local test data.

Recommended order:

1. Compare production schema to the expected current schema.
2. Back up production.
3. Run pending SQL migrations on a production backup or staging clone first.
4. Verify the migrated clone with smoke tests.
5. Run the same migrations on production during the release window.
6. Deploy frontend/backend code.
7. Run post-deploy verification against production.

## Local Data Policy

Local database data is disposable.

Allowed:

- use local/Docker data for testing
- use sanitized snapshots for staging rehearsal
- inspect local data shape to understand migration needs

Not allowed:

- import local test data into production
- overwrite production tables from the local database
- use local users, local IDs, or local generated records as authoritative production data

## Staging Policy

The user confirmed staging/GitHub deployment exists as a path, but it is intentionally deferred for now.

Before release, staging should be used for rehearsal if possible:

- same code branch intended for production
- production-like schema
- sanitized production copy or synthetic data
- production-equivalent PHP/MySQL versions
- isolated secrets and storage

## Post-Deploy Verification Checklist

Minimum checks after deploy:

1. Login works with production users.
2. Home/dashboard loads real production data.
3. Reservations list/search/detail/edit works.
4. Projects list/search/detail/edit works.
5. Customer and technician pages show connected reservations/projects correctly.
6. Equipment Requests page is reachable in production and can load the admin API.
7. Users/admin pages still respect roles.
8. Upload/document paths still work.
9. Emails/Telegram are either verified or intentionally disabled during the first smoke.
10. No frontend requests point to localhost, staging, or old test endpoints.

## Rollback Plan

Rollback must be ready before deployment:

1. Keep the previous deployed code package/commit available.
2. Keep the production database backup from immediately before migration.
3. If code deploy fails before schema migration: revert code only.
4. If schema migration runs and a critical issue appears: stop writes, restore DB backup, redeploy previous code, and verify login/dashboard/reservations/projects.
5. Record the failed migration step before retrying.

## Current Release Blockers

| Blocker | Status |
| --- | --- |
| Production release/rollback plan | This file now provides the first plan draft. |
| Migration rehearsal | Still needed before real production deployment. |
| Production schema comparison | Still needed against the live MySQL database. |
| Staging verification | Deferred by user for now, but recommended before release. |
| Legacy password hardening | Transition path implemented; production audit/reset still needed. |
| Ancillary runtime schema self-healing | Still open; cleanup order is documented in `docs/BACKEND_SCHEMA_HARDENING_PLAN.md`. |
| Tooling dependency audit | Completed; `npm audit` reports `0 vulnerabilities`. |
| Deployment packaging | Fixed locally; GitHub deploy installs Composer dependencies and keeps `backend/config.php` out of the plain FTP sync. First CI run should still confirm the workflow on GitHub-hosted Ubuntu. |
| Staging/clone rehearsal tooling | Prepared locally; migration tools accept `--config`, and `backend/tools/schema_report.php` provides a read-only schema/migration report for safe targets. |

## Current Implementation Note

`src/pages/equipment-requests.html` is now included in the Vite production build through `vite.config.js`, and `npm run build:assets` emits `dist/src/pages/equipment-requests.html`.

Legacy password hardening now has a safe transition path:

- `backend/tools/audit_legacy_password_hashes.php` identifies users with legacy plain/MD5-style password hashes.
- `security.allow_legacy_password_login` controls whether those legacy hashes can still authenticate.
- Keep `allow_legacy_password_login` enabled until affected production users are reset, then disable it in production config.

Tooling maintenance note:

- Browser data/dependency freshness was updated.
- `html2canvas` and `jspdf` are now explicit dependencies instead of undeclared accidental modules.
- `npm audit` reports `0 vulnerabilities`.

Deployment packaging note:

- `.github/workflows/deploy.yml` now installs backend Composer dependencies during CI before upload.
- `backend/config.php` is uploaded through the dedicated FTPS step and excluded from the plain FTP rclone sync.
- This reduces the release risk, but deployment is still not fully atomic; a staged directory/swap flow can be planned later if the hosting environment supports it.

Staging rehearsal note:

- CLI release tools can now target a staging/backup-clone config using `--config /path/to/safe-config.php` or `ART_RATIO_CONFIG_PATH`.
- `backend/tools/schema_report.php` gives a read-only schema and migration status snapshot before any migration is attempted.
- `npm run release:rehearsal -- --config /path/to/safe-config.php` runs the read-only schema report, migration status, and dry-run sequence together.
- Production read-only inspection requires the explicit `--allow-production-readonly` flag and must only be used after the fresh backup is confirmed.
- The combined `npm run release:production-window` runner performs backup first, then read-only rehearsal and legacy password audit. It never applies migrations.
- If production shows the same state as the local backup clone, where schema objects already exist but `schema_migrations` is empty, use the guarded baseline runner after reviewing the fresh backup and read-only output:
  `npm run release:production-baseline -- --config /safe/production-config.php --backup-file /safe/backups/mysql-backup.sql.gz --confirm-production-baseline`
- Do not use the baseline runner if the read-only rehearsal shows truly missing schema objects that need real SQL migrations.
- The disposable Docker integration rehearsal passed locally after baselining the seeded test schema: `31 applied`, `0 pending`, and `6 / 6` integration tests passed.
- The detailed command order is documented in `docs/STAGING_MIGRATION_REHEARSAL_RUNBOOK_2026_05_28.md`.
