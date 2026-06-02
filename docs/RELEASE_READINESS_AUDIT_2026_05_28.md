# Release Readiness Audit - 2026-05-28

Status: audit plus targeted local release-packaging fixes. No production access, no migration run.

## Scope

This audit starts the production release readiness procedure after closing the current product workflow roadmap scope. It checks local repository readiness, deployment risk, migration tooling, and production-safety boundaries without touching production data or production services.

## Safety Boundaries Confirmed

- Current branch is not `main`: `phase-b-tailwind-v4`.
- `backend/config.php` exists locally but is ignored by git. It was not opened during this audit.
- `.env.local` exists locally and is ignored by git. It was not opened during this audit.
- `.env` is tracked but currently empty locally.
- Production remains locked by `PRODUCTION_LOCK.md`.
- The safe local backend path remains Docker integration stack on `127.0.0.1:8080`, not the local on-disk `backend/config.php`.

## Commands Run

- `npm audit --audit-level=high`
- `npm audit fix --package-lock-only`
- `npm ci`
- `npx vitest run tests/theme/operationsRouteAudit.test.js tests/reservations/controller.test.js tests/reservations/pdf/v2.test.js tests/projects/projectCreateSummary.test.js tests/projects/viewFinancials.test.js tests/projects/viewSummary.test.js`
- `npm run build`
- `ruby -e "require 'yaml'; YAML.load_file('.github/workflows/deploy.yml')"`
- `php -l backend/tools/migrate.php`
- `php -l backend/tools/apply_phase4_schema_updates.php`
- `php -l backend/tools/audit_legacy_password_hashes.php`
- `php -l backend/config.example.php`
- `php -l backend/config.staging.example.php`
- Repository/document scans with `rg`, `ls`, `git branch`, and `git ls-files`

Not run:

- `php backend/tools/migrate.php`
- `php backend/tools/apply_phase4_schema_updates.php`
- `php backend/tools/audit_legacy_password_hashes.php`
- `php backend/tools/schema_report.php`

Reason: those tools connect to a database. Without a reviewed staging/clone `--config`, they may use `backend/config.php`, which may point to a real database and must not be used during a safe local audit.

## Findings

### 1. Deployment Workflow Can Break PHP Backend Autoload

Severity: high release blocker.

Status: fixed locally in `.github/workflows/deploy.yml`.

`.github/workflows/deploy.yml` runs:

- `npm ci`
- `npm run build`
- `rclone sync ./ site:/`

It does not run `composer install`. The repo has `composer.json` and `composer.lock`, and backend code uses Composer autoload when available:

- `backend/bootstrap.php` loads `vendor/autoload.php` if present.
- API files instantiate namespaced classes such as `ArtRatio\Repositories\ProjectRepository`.

However, `vendor/` is not tracked by git. A clean GitHub Actions checkout will not contain `vendor/`. Because `rclone sync` syncs the repo to production, a clean deploy can omit or remove `vendor/`, causing backend class-loading failures.

Implemented fix:

- Added `shivammathur/setup-php@v2` with PHP `8.1` and Composer v2.
- Added `composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction --no-progress`.
- The deployment sync can now include the generated `vendor/` directory from CI.

Remaining check:

- The first CI run should confirm Composer install succeeds on GitHub-hosted Ubuntu with the current `composer.lock`.

### 2. Deploy Sync Uploads Code Before Backend Config

Severity: medium release risk.

Status: reduced locally in `.github/workflows/deploy.yml`.

The workflow syncs the project first, then creates and uploads `backend/config.php` from the GitHub secret. If sync deletes or replaces production files before config upload succeeds, there is a short failure window where backend config may be missing or stale.

Implemented fix:

- `backend/config.php` is decoded before deployment.
- `backend/config.php` is uploaded through the dedicated FTPS step.
- `rclone sync` now excludes `/backend/config.php`, avoiding secret transfer over the existing plain FTP rclone configuration and avoiding accidental deletion through sync filters.

Remaining risk:

- Deployment is still not atomic. A true zero-downtime release would need a staged directory and swap if the hosting environment supports it.

### 3. `npm audit` Is No Longer Clean

Severity: medium/low, should fix before release.

Status: fixed locally.

`npm audit --audit-level=high` returned a moderate vulnerability:

- Package: `ws`
- Path: `jsdom -> ws@8.18.3`
- Advisory: uninitialized memory disclosure
- Fix available through `npm audit fix`

This contradicts the older release-plan note saying `npm audit` reports `0 vulnerabilities`.

Implemented fix:

- Ran `npm audit fix --package-lock-only`.
- Ran `npm ci`; it completed with `found 0 vulnerabilities`.
- Ran `npm audit --audit-level=high`; it completed with `found 0 vulnerabilities`.
- Ran focused Vitest coverage and full build successfully.

### 4. Composer Is Not Installed In The Local Shell

Severity: local tooling gap.

`composer validate --no-check-publish` could not run because `composer` is not available in the current shell.

Recommended fix before release:

- Install Composer locally or run Composer validation inside a PHP/Composer container.
- Add Composer validation to CI if PHP release readiness becomes active.

### 5. Runtime Schema Mutation Still Exists Outside Core Flows

Severity: medium, already documented.

Runtime DDL still exists in secondary endpoints/services such as:

- analytics
- contact
- feedback
- equipment requests/cart
- project templates
- packages
- sequence
- blog comments
- telegram/notifications
- preferences/login attempts/rate limit support

Core reservation/project paths use explicit schema checks for important write paths, but the repo is not fully schema-mutation-free.

Recommended fix before full production hardening:

- Continue from `docs/BACKEND_SCHEMA_HARDENING_PLAN.md`.
- Move secondary endpoint DDL into explicit migrations.
- Leave runtime handlers with clear failure messages if schema is missing.

### 6. Migration Tooling Exists But Needs A Safe Rehearsal Target

Severity: release prerequisite.

There are 31 SQL files under `backend/sql/`, plus:

- `backend/tools/migrate.php`
- `backend/tools/apply_phase4_schema_updates.php`

The migration runner supports:

- `--status`
- `--baseline`
- `--dry-run`
- safety guard for empty `schema_migrations`

But it reads `backend/config.php`, so it must only be run against a known staging/backup/local integration config.

Recommended next step:

- Prepare a staging or backup clone config.
- Run migration status only against that clone first.
- Do not run migration status against unknown local `backend/config.php`.

### 7. Legacy Password Transition Is Implemented But Not Closed

Severity: release prerequisite.

The audit tool exists:

- `backend/tools/audit_legacy_password_hashes.php`

The config flag exists:

- `security.allow_legacy_password_login`

Production still needs:

- run the audit against production during the approved release-prep window
- reset affected users
- then disable legacy login in production config

Do not disable legacy login before identifying affected accounts.

## Recommended Immediate Order

1. Create or identify a staging/backup clone target.
2. Run schema comparison/migration status only against that safe target.
3. Rehearse migrations on the clone.
4. Run post-rehearsal smoke checks for login, Operations, Projects, Clients/Crew, Equipment, Reports, and PDF generation.
5. Run the first GitHub deploy workflow only when the release branch/target is intentional and production timing is approved.
6. Only after rehearsal passes, plan the production release window.

## Current Decision

Do not start migration yet.

The targeted release-readiness fix pass for deployment packaging and dependency audit cleanup has been completed locally. The active follow-up is staging/backup-clone schema comparison.

Update after targeted fixes:

- Deployment packaging and dependency audit cleanup are now implemented locally.
- Staging/backup-clone rehearsal tooling is now implemented locally.
- CLI release tools can use `--config /path/to/staging-config.php` or `ART_RATIO_CONFIG_PATH`.
- `backend/tools/schema_report.php` provides read-only schema and migration status reporting for safe targets.
- A local Docker integration rehearsal was run successfully on the disposable `art_ratio_test` database:
  - schema report completed
  - migration status completed
  - migration dry-run completed
  - existing seeded schema was baselined in the disposable DB
  - post-baseline report showed `31 applied` and `0 pending`
  - integration smoke passed with `6 / 6` tests
- The next active task is to provide a safe staging/backup-clone config and run the same documented rehearsal sequence in `docs/STAGING_MIGRATION_REHEARSAL_RUNBOOK_2026_05_28.md`.
