# Staging Setup

## Phase Goal

Prepare a realistic pre-production environment for the back-office app without using production data or production secrets.

## Current Status

Staging does not appear to exist in the repository today.

What is available now:

- a working local Docker-backed backend/API stack
- a stable seeded integration database path
- repo-side staging templates added in this phase

What is still missing:

- staging host or subdomain
- staging backend secret injection
- staging database
- staging storage credentials/path
- staging deployment target

## Repo-Side Staging Artifacts

- `.env.staging.example`
- `backend/config.staging.example.php`
- `backend/tools/schema_report.php`
- `scripts/run-migration-rehearsal.mjs`
- CLI `--config` support for migration and release-audit tools

These are templates only. They are not active runtime config.

## Required Staging Isolation Rules

1. Use a separate domain or subdomain from production
2. Use a separate database from production
3. Use a separate backend config from production
4. Use separate storage credentials and bucket/path from production
5. Keep email and Telegram disabled until staging verification is ready
6. Never restore production data directly into staging

## Recommended Staging Runtime Model

- Frontend: built Vite app served from a staging host
- Backend: PHP backend with staging-only `backend/config.php`
- Database: separate MySQL instance with sanitized or synthetic data
- Storage: separate bucket or staging-specific path prefix

## Seed / Sanitized Data Strategy

Preferred order:

1. synthetic seed data from the local integration dataset
2. sanitized export with sensitive personal and operational identifiers removed

Do not use:

- live production backups
- production notification recipients
- production SMTP credentials
- production Telegram bot credentials

## Verification Checklist

- schema report works against staging-only config
- migration status/dry-run works against staging-only config
- login works with staging-only users
- home summary loads from staging backend
- reservation list/create/update/delete works
- project list/create/update works
- customer/equipment/technician CRUD works
- notifications are disabled or routed to safe test targets
- uploads do not hit production storage
- no request in staging uses a production domain, DB, or credential

## Blocker

Phase 3 is prepared at the repo level but not fully complete, because there is no actual staging host or secret store configured in this repository yet.

## Next Dependency

Before Phase 3 can be marked complete, the staging target must be provisioned and connected to the repo using staging-only config and data.

Use `docs/STAGING_MIGRATION_REHEARSAL_RUNBOOK_2026_05_28.md` once a staging or backup-clone database config is available.
