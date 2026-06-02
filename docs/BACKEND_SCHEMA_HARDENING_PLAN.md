# Backend Schema Hardening Plan

Last updated: 2026-05-13

## Goal

Remove request-time schema mutation from backend APIs before production release.

Current risk: several ancillary APIs still run `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE`, or `CREATE INDEX` during normal requests. That protects local/dev bootstrapping, but production should use explicit migrations instead.

## Rule

Production request handlers should read/write application data only. Schema changes must run through migration scripts or a controlled deployment step.

## Batch Order

### Batch 1 - Public/Inbound Request Surfaces

Highest priority because these can be hit by external users or public forms.

- `backend/api/contact/index.php`
- `backend/api/contact/admin.php`
- `backend/api/feedback/index.php`
- `backend/api/feedback/admin.php`
- `backend/api/equipment-requests/index.php`
- `backend/api/equipment-requests/admin.php`
- `backend/api/equipment-cart/index.php`
- `backend/api/blog-comments/index.php`

Target:

- Move table/column/index DDL into migrations.
- Leave runtime handlers with clear failure messages if schema is missing.

### Batch 2 - Messaging / Notifications / Telegram

- `backend/services/notifications.php`
- `backend/services/templates.php`
- `backend/api/notifications/*.php`
- `backend/api/telegram/*.php`

Target:

- Move notification/template/telegram table and column creation into migrations.
- Keep diagnostics endpoints read-only for schema state.

### Batch 3 - Internal Utility Tables

- `backend/api/analytics/index.php`
- `backend/api/analytics/admin.php`
- `backend/api/packages/index.php`
- `backend/api/project-templates/index.php`
- `backend/api/sequence/index.php`
- `backend/bootstrap/auth.php`
- `backend/bootstrap/preferences.php`
- `backend/bootstrap/ratelimit.php`

Target:

- Decide which bootstrap tables are acceptable to auto-create in local/dev only.
- For production, require migrations before deploy.

## Verification Per Batch

1. Add/confirm SQL migration coverage.
2. Run PHP syntax checks on touched files.
3. Run related API/integration tests where available.
4. Run `npm run build:assets` if frontend API contracts or pages are touched.
5. Re-run a local smoke only against migrated schema, not auto-created schema.

## Current Status

Open. This is the next backend cleanup area after the already completed equipment build-entry, production release/data plan, password hardening transition path, and dependency audit cleanup.
