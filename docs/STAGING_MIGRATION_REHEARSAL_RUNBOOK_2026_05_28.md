# Staging Migration Rehearsal Runbook

Status: prepared locally. No production access and no migration run.

## Goal

Run schema comparison and migration rehearsal against a staging or backup-clone database only.

Do not use production directly. Do not use the local `backend/config.php` unless it is intentionally pointing to a disposable clone.

## Safe Config

Create a clone-specific config outside git, for example:

```bash
cp backend/config.staging.example.php /tmp/art-ratio-staging-config.php
```

Then edit `/tmp/art-ratio-staging-config.php` with staging/clone-only database credentials.

The automated rehearsal wrapper refuses unsafe config inputs before opening a database connection:

- local runtime `backend/config.php`
- `.example.php` files
- config files that still contain placeholder values
- config files that appear to target `art_ratio_production`

## Read-Only Schema Report

Automated wrapper:

```bash
npm run release:rehearsal -- --config /tmp/art-ratio-staging-config.php
```

The wrapper runs the schema report, migration status, and migration dry-run. It does not apply migrations.

Manual command:

```bash
php backend/tools/schema_report.php --config /tmp/art-ratio-staging-config.php
```

JSON output is also available:

```bash
php backend/tools/schema_report.php --config /tmp/art-ratio-staging-config.php --json
```

This reports:

- selected database name
- table count
- column/index counts per table
- whether `schema_migrations` exists
- applied migration count
- pending migration files

## Backup Dry Run

Before a release-window backup, validate the selected config and target output path:

```bash
npm run release:backup -- --config /tmp/art-ratio-production-config.php --output-dir /safe/backups --dry-run
```

When the dry-run is reviewed and the release window is approved, run the real backup:

```bash
npm run release:backup -- --config /tmp/art-ratio-production-config.php --output-dir /safe/backups --retention-days 14
```

Do not rely on the default `backend/config.php` path for release-window backups. Pass the intended config explicitly.

## Production Read-Only Window

After a fresh production backup is confirmed, production can be inspected read-only with an explicit confirmation flag:

```bash
npm run release:rehearsal -- --config /safe/production-config.php --allow-production-readonly
```

This still only runs schema report, migration status, and migration dry-run. It does not apply migrations.

The legacy password audit can also be run read-only after backup:

```bash
npm run release:legacy-password-audit -- --config /safe/production-config.php --allow-production-readonly
```

Do not use `--allow-production-readonly` before the fresh backup exists and has been checked.

For the release window, the guarded combined runner can enforce the correct order:

```bash
npm run release:production-window -- --config /safe/production-config.php --backup-dir /safe/backups --confirm-production-window
```

To validate paths first without opening a database connection:

```bash
npm run release:production-window -- --config /safe/production-config.php --backup-dir /safe/backups --dry-run
```

If the reviewed production read-only output matches the local backup clone pattern, meaning the schema exists but migration tracking is empty, baseline only the migration tracker:

```bash
npm run release:production-baseline -- --config /safe/production-config.php --backup-file /safe/backups/mysql-backup.sql.gz --confirm-production-baseline
```

Validate the baseline command first:

```bash
npm run release:production-baseline -- --config /safe/production-config.php --backup-file /safe/backups/mysql-backup.sql.gz --dry-run
```

## Migration Status

```bash
php backend/tools/migrate.php --config /tmp/art-ratio-staging-config.php --status
```

If the database already has the current schema but no `schema_migrations` records, do not run pending migrations blindly. Baseline the clone only after confirming the schema is already present:

```bash
php backend/tools/migrate.php --config /tmp/art-ratio-staging-config.php --baseline
```

## Dry Run

```bash
php backend/tools/migrate.php --config /tmp/art-ratio-staging-config.php --dry-run
```

This shows which SQL files would run without applying them.

## Rehearsal Apply

Only after the report, status, and dry-run are reviewed:

```bash
php backend/tools/migrate.php --config /tmp/art-ratio-staging-config.php
```

Then run the read-only schema report again:

```bash
php backend/tools/schema_report.php --config /tmp/art-ratio-staging-config.php
```

## Phase 4 Compatibility Patch

If the clone is known to need the historical Phase 4 repair pass, it can now be pointed at the same safe config:

```bash
php backend/tools/apply_phase4_schema_updates.php --config /tmp/art-ratio-staging-config.php
```

Do not run this on production before a clone rehearsal.

## Legacy Password Audit

Run this against the clone first to estimate impact:

```bash
npm run release:legacy-password-audit -- --config /tmp/art-ratio-staging-config.php
```

The production run belongs in the approved release-prep window after backup.

## Local Disposable Integration Rehearsal

If Docker Desktop is running, the same read-only rehearsal can be run against the deterministic local integration database:

```bash
npm run release:rehearsal -- --docker-integration
```

This starts the local integration stack and runs schema report, migration status, and dry-run inside the PHP container. It does not apply migrations.

Because the disposable integration database is created from seeded SQL rather than migration history, this Docker-only mode baselines the disposable `schema_migrations` table before the final report/dry-run. Do not treat that as permission to baseline production; staging/backup-clone baseline still requires manual schema review first.

## Acceptance

The rehearsal is acceptable when:

- schema report runs without connection/config errors
- migration status is understood
- dry-run output is reviewed
- apply step completes on the clone, if pending migrations exist
- app smoke checks pass against the clone
- no production credential, production notification target, or production storage path is used
