# Safety Fixes Report

## Phase Goal

Reduce the highest-risk operational issues in the back-office app without changing core business behavior, touching production, or rewriting major features.

## Scope

- backend authorization on core write paths
- runtime schema mutation in core reservation/project request flows
- shared-state pollution in customer-scoped data flows
- dashboard/home summary trust rules
- shared API/test behavior affecting baseline trust
- local/integration bootstrap ownership for the now-explicit schema path

## What Was Already Done Before This Continuation

### 1. Core backend write permissions tightened

Updated endpoints:

- `backend/api/customers/index.php`
- `backend/api/technicians/index.php`
- `backend/api/equipment/index.php`
- `backend/api/projects/index.php`
- `backend/api/reservations/index.php`

Applied rule:

- `GET`: authenticated users
- `POST` / `PUT` / `PATCH`: `admin` or `manager`
- `DELETE`: `admin`

### 2. Home summary now trusts backend summary data on successful loads

Updated file:

- `src/scripts/home.js`

Applied rule:

- if `/summary/` succeeds, use the backend snapshot directly
- only fall back to locally merged counts when the backend summary cannot be loaded

### 3. Customer detail page no longer pollutes global reservations/projects state

Updated file:

- `src/scripts/customerPage.js`

Applied rule:

- customer-scoped reservation/project fetches stay in page-local caches
- they no longer overwrite the shared cross-page store with filtered subsets

### 4. Shared API client test-harness compatibility was repaired

Updated file:

- `src/scripts/apiClient.js`

Applied rule:

- Node/jsdom test runs no longer break on the browser-only `AbortSignal` composition path

## Completed In This Continuation

### 1. Request-time schema mutation removed from active reservation/project runtime paths

Updated files:

- `backend/api/projects/index.php`
- `backend/api/reservations/index.php`

Applied rule:

- project create/update no longer alter schema during requests
- reservation get/create/update no longer create tables or add columns during requests
- the core handlers now fail fast against missing schema instead of silently mutating the database

### 2. Explicit schema ownership moved to bootstrap/tooling

Added files:

- `backend/tools/apply_phase4_schema_updates.php`
- `backend/sql/add_reservation_payment_columns.sql`
- `backend/sql/add_reservation_packages_metadata_columns.sql`
- `backend/sql/add_reservation_technicians_notes.sql`

Updated files:

- `backend/sql/add_reservations_project_column.sql`
- `backend/sql/add_sale_price_to_project_expenses.sql`
- `backend/sql/add_services_client_price_to_projects.sql`
- `tests/integration/docker/init/00-base.sql`
- `scripts/bootstrap-integration-stack.mjs`
- `package.json`

Applied rule:

- schema drift is now handled explicitly through `php backend/tools/apply_phase4_schema_updates.php`
- clean integration bootstrap now runs that schema tool automatically after the containers start
- clean integration bootstrap now re-seeds the deterministic `integration_admin` user automatically
- raw MySQL init is kept minimal and safe on empty databases; post-start patching owns the additive schema work

### 3. Core test failures were eliminated

Updated files:

- `tests/reports/calculations.test.js`
- `tests/reports/maintenance-and-breakdowns.test.js`
- `tests/reservations/list/index.test.js`
- `tests/tabs/tabs.test.js`
- `src/scripts/reservationsService.js`

Applied rule:

- stale report expectations were aligned to current confirmed-only report logic
- stale reservation tile markup assertions were updated to current structure
- report tests now isolate language/formatter/reservation-summary dependencies cleanly
- tabs tests now mock the `initReports` export expected by the lazy loader
- reservation cache-key initialization warnings were removed

## Permission Matrix

| Entity | Read | Create | Update | Delete |
| --- | --- | --- | --- | --- |
| Customers | authenticated | admin / manager | admin / manager | admin |
| Technicians | authenticated | admin / manager | admin / manager | admin |
| Equipment | authenticated | admin / manager | admin / manager | admin |
| Projects | authenticated | admin / manager | admin / manager | admin |
| Reservations | authenticated | admin / manager | admin / manager | admin |

## Verification Performed

Verification date: `2026-03-31`

Commands:

```bash
npm run integration:up
npm run backoffice:local:schema
npm run backoffice:local:smoke
npm run test:reservations
export INTEGRATION_API_BASE_URL=http://127.0.0.1:8080/api
export INTEGRATION_USERNAME=integration_admin
export INTEGRATION_PASSWORD=TestPassword123!
npm run test:integration
```

Confirmed results:

- `npm run backoffice:local:smoke` passes
- `npm run test:reservations` passes with `18` files passed, `1` skipped, `109` tests passed, `6` skipped
- `npm run test:integration` passes with `6/6` tests green
- manager write verification still succeeds on fresh isolated stack
- technician write verification is still denied with `403 Forbidden`

Fresh authorization verification:

- `manager_test` login: `200`, customer create: `201`
- `technician_test` login: `200`, customer create: `403`

## Remaining Risks

### Controlled debt still present

- some jsdom tests still emit network-fallback warnings from reservation technician/detail helpers
- dependency freshness warnings still appear from `baseline-browser-mapping` and Browserslist data age
- several non-core / ancillary endpoints still contain runtime schema self-healing logic and are now tracked explicitly instead of being hidden

### Not changed in this phase

- production config, deployment, and production data were not touched
- `Arino - Template/` and the public website template were not touched
- no core reservation, project, crew, equipment, maintenance, reporting, or template/PDF capability was removed

## Judgment

The core Phase 4 safety batch is now in a materially safer state:

- core project/reservation hot paths no longer mutate schema at request time
- explicit schema/bootstrap ownership exists locally and in integration
- core write permissions are verified on a fresh isolated stack
- shared-state pollution already identified in customer flows is contained
- dashboard trust remains tied to backend summary data
- the previously failing unit tests are green

The remaining items are controlled debt, not silent failures.
