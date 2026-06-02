# Staging Clone Rehearsal Report - 2026-05-28

## Scope

Local backup-clone rehearsal only. No production database connection was opened, and `backend/config.php` was not used.

## Source Backup

- `backups/mysql/mysql-backup-art_ratio_rental_app-20260528_020000.sql.gz`

## Clone Target

- Docker container: `art_ratio_rehearsal_db`
- Database: `art_ratio_rehearsal`
- Local-only temporary config: `/tmp/art-ratio-rehearsal-config.php`

The temporary config used local Docker credentials only, with email and Telegram disabled.

## Rehearsal Result

Initial schema report found:

- Tables: `44`
- `schema_migrations`: present
- Applied migrations: `0`
- Pending migrations: `31`

The clone already contained the current schema objects, but the migration tracking table had no applied records. The clone was baselined locally:

- Baselined migrations: `31`
- Pending after baseline: `0`
- Final dry-run: `Nothing to run - all migrations are applied.`

## Legacy Password Audit

Command:

```bash
npm run release:legacy-password-audit -- --config /tmp/art-ratio-rehearsal-config.php
```

Result:

- No legacy password hashes found.

## Conclusion

The latest local backup clone is schema-compatible with the migration tracker after baseline. The production release plan should treat this as evidence that production may need a migration baseline rather than blind migration execution, but production must still be checked directly during an approved release window after a fresh backup.

## Cleanup

The local clone container and temporary config should be removed after the run because the backup contains operational data.
