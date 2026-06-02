# Phase 4 Exit Report

## Phase 4 Goal

Finish the operational safety batch so the back-office app is safer to evolve before structural refactoring begins.

## Scope Worked On

- project and reservation request handlers
- explicit local/integration schema/bootstrap ownership
- core authorization re-verification
- remaining unit/integration failures and warning reduction
- formal debt classification for what remains outside the core safety batch

## Files Changed In This Continuation

- `backend/api/projects/index.php`
- `backend/api/reservations/index.php`
- `backend/tools/apply_phase4_schema_updates.php`
- `backend/sql/add_reservation_payment_columns.sql`
- `backend/sql/add_reservation_packages_metadata_columns.sql`
- `backend/sql/add_reservation_technicians_notes.sql`
- `backend/sql/add_reservations_project_column.sql`
- `backend/sql/add_sale_price_to_project_expenses.sql`
- `backend/sql/add_services_client_price_to_projects.sql`
- `tests/integration/docker/init/00-base.sql`
- `scripts/bootstrap-integration-stack.mjs`
- `package.json`
- `src/scripts/reservationsService.js`
- `tests/reports/calculations.test.js`
- `tests/reports/maintenance-and-breakdowns.test.js`
- `tests/reservations/list/index.test.js`
- `tests/tabs/tabs.test.js`
- `SAFETY_FIXES_REPORT.md`
- `TEST_BASELINE_REPORT.md`
- `CONTROLLED_DEBT_REGISTER.md`
- `PHASE_5_PROPOSAL.md`

## Issues Fixed

### 1. Runtime schema mutation removed from core reservation/project request paths

- requests no longer alter schema inside `projects` and `reservations`
- the supported schema is now asserted explicitly instead of repaired implicitly

### 2. Explicit schema/bootstrap ownership established

- added `backend/tools/apply_phase4_schema_updates.php`
- added deterministic integration bootstrap via `scripts/bootstrap-integration-stack.mjs`
- `integration:up` now brings the stack up, applies schema patching, and re-seeds the integration admin automatically

### 3. Core test baseline repaired

- previously failing reservation/report tests are now green
- current baseline:
  - `npm run backoffice:local:smoke` green
  - `npm run test:reservations` green
  - `npm run test:integration` green

### 4. Authorization hardening re-verified on fresh isolated stack

- manager write path verified as allowed
- technician write path verified as denied with `403`

## Issues Intentionally Deferred

- ancillary runtime schema self-healing in non-core/shared endpoints
- jsdom warning cleanup for reservation technician/detail/render test fallback paths
- dependency-freshness warning cleanup

These are tracked in `CONTROLLED_DEBT_REGISTER.md`.

## Current Risk Level

- core operational safety risk: reduced from medium-high to medium
- test trust risk: reduced to low-medium
- remaining backend schema-drift risk: medium, but now isolated and visible instead of being hidden by request-time auto-healing

## What Did Not Change

- production was not touched
- the public website template under `Arino - Template/` was not touched
- no core feature was removed
- no live deployment or production migration was performed

## Go / No-Go For Phase 5

**Go**, with controlled debt noted.

Reasons:

- core reservation/project hot paths now meet the Phase 4 safety intent
- the fresh isolated stack can be bootstrapped and verified repeatably
- all previously failing tests in the tracked Phase 4 baseline are green
- remaining debt is documented and does not block structural stabilization

## Phase 4 Completion Judgment

Phase 4 is **complete for the core back-office safety batch**, with explicit controlled exceptions recorded for ancillary endpoints and residual test-output noise.
