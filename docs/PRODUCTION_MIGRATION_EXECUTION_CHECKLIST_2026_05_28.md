# Production Migration Execution Checklist - 2026-05-28

## Current Readiness

- Local preflight: passed.
- Local backup-clone rehearsal: passed.
- Latest local clone result: schema exists, `schema_migrations` tracking needed baseline.
- Legacy password audit on local clone: no legacy hashes found.
- Production config: not available in this workspace yet.

## Required Inputs

Before executing the production window, provide:

- production config path outside git, for example `/safe/production-config.php`
- backup output directory, for example `/safe/backups`
- quiet production window
- confirmation that no one is actively editing reservations/projects during the check

Do not use `backend/config.php` for these release commands.

## Step 1 - Validate Command Paths

Run this first. It should not connect to the database or create a backup:

```bash
npm run release:production-window -- --config /safe/production-config.php --backup-dir /safe/backups --dry-run
```

Go only if:

- the config file is accepted
- the backup output path is correct
- the database name shown is the expected production database

## Step 2 - Backup + Read-Only Production Check

Run the guarded production window:

```bash
npm run release:production-window -- --config /safe/production-config.php --backup-dir /safe/backups --confirm-production-window
```

This performs:

1. database backup
2. read-only schema report
3. migration status
4. migration dry-run
5. read-only legacy password audit

It does not apply migrations.

Go only if:

- backup file is created and non-empty
- schema report completes
- migration status output is understood
- legacy password audit is clean or the affected users are known

## Step 3 - Decision

### Case A: Schema Exists, Tracking Empty

Use this if production matches the backup clone pattern:

- tables/columns already exist
- `schema_migrations` is empty or incomplete
- pending migrations are tracking-only, not truly missing schema

Then run:

```bash
npm run release:production-baseline -- --config /safe/production-config.php --backup-file /safe/backups/mysql-backup.sql.gz --dry-run
```

After reviewing the dry-run:

```bash
npm run release:production-baseline -- --config /safe/production-config.php --backup-file /safe/backups/mysql-backup.sql.gz --confirm-production-baseline
```

Then verify:

```bash
npm run release:rehearsal -- --config /safe/production-config.php --allow-production-readonly
```

Expected result:

- `0 pending`

### Case B: Schema Is Missing Real Objects

Do not baseline.

Stop and review the pending SQL files before applying anything. Apply migrations only after confirming the missing objects are expected and the backup is restorable.

## Step 4 - Post-Decision Smoke Checks

After baseline or approved migration action, verify:

- login
- dashboard/home summary
- reservations list and one reservation detail
- projects list and one project detail
- project reports
- clients autocomplete in reservation/project creation
- equipment selection by list/name/barcode
- PDF quotation preview and export

## Rollback Rule

If a critical issue appears after a production schema action:

1. stop writes
2. keep the failed-state backup
3. restore the fresh pre-window backup
4. redeploy previous known-good code if needed
5. verify login, dashboard, reservations, and projects

## Current Blocker

The next executable step is blocked until a production config outside git is available:

```bash
/safe/production-config.php
```
