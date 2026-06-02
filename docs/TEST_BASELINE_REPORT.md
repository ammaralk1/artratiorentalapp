# Test Baseline Report

## Phase Goal

Restore enough trust in the local test baseline to continue staged refactoring safely.

## Environment Used

- Local backend/API: Docker integration stack on `http://127.0.0.1:8080/api`
- Local database: Docker MySQL on `127.0.0.1:33306`
- Seeded credentials: `integration_admin` / `TestPassword123!`
- Verification date: `2026-03-31`

## Commands Used

### Local smoke

```bash
npm run backoffice:local:smoke
```

### Unit / jsdom suite

```bash
npm run test:reservations
```

### Integration suite

```bash
export INTEGRATION_API_BASE_URL=http://127.0.0.1:8080/api
export INTEGRATION_USERNAME=integration_admin
export INTEGRATION_PASSWORD=TestPassword123!
npm run test:integration
```

## Current Status

### Passing

- `npm run backoffice:local:smoke`
- `npm run test:integration`
  - `1` file passed
  - `6` tests passed
- `npm run test:reservations`
  - `18` files passed
  - `1` file skipped
  - `109` tests passed
  - `6` tests skipped

### Broken

- no currently failing tests in the Phase 4 baseline

### Skipped

- the integration suite is intentionally skipped during the plain `npm run test:reservations` run unless explicit integration env vars are set

### Flaky

- no confirmed flaky tests

## Fixes Implemented In This Phase

### 1. Shared API client test-harness fix

- File: `src/scripts/apiClient.js`
- Change: disabled synthetic abort-signal attachment in Node-based test runs
- Why: undici was rejecting the jsdom-side `AbortSignal`, causing false network failures and cooldown cascades

### 2. Integration schema bootstrap alignment

- Files:
  - `tests/integration/docker/init/00-base.sql`
  - `backend/sql/add_reservation_technicians_position_columns.sql`
- Change: the Docker test database now applies the reservation technician position migrations during bootstrap, and the tracked migration now uses `INT UNSIGNED` for the foreign-key column
- Why: the integration suite was failing with real `500` errors because the seeded DB schema did not match the schema the reservation API expects

### 3. Reservation edit-form test drift repair

- File: `tests/reservations/editForm.test.js`
- Change: updated mocks and expectations to match the current edit-form behavior
- Why: the suite had stale mocks for newly added exports and an outdated expectation around cached edit date ranges

## Confirmed Passing Areas

- Local auth/login smoke path
- Local summary endpoint smoke path
- Reservation integration flow:
  - invalid login rejection
  - authenticated reservation listing
  - reservation creation
  - reservation update
  - reservation delete
  - upload type rejection
- Unit coverage that is currently green:
  - language
  - theme
  - reservations state helpers
  - reservations summary
  - reservations technicians
  - reservations controller
  - reservations edit form
  - reservations renderers
  - reservations actions
  - reservations equipment
  - reservations form utils
  - calendar
  - storage
  - utils
  - maintenance/breakdown report helpers

## Controlled But Still Noisy

These are not currently failing the suite, but they reduce signal quality and should be cleaned up:

- some jsdom tests still attempt fallback network calls against `http://127.0.0.1:8000`, which produces controlled `ECONNREFUSED` warnings
- some jsdom renderer tests still hit relative `/backend/api/...` URLs, which produces controlled `Invalid URL` warnings in Node fetch
- dependency age warnings still appear from `baseline-browser-mapping` and Browserslist

## Baseline Judgment

The baseline is now trustworthy enough for Phase 5 structural work:

- the isolated local stack is bootable
- smoke verification passes
- the integration suite is green
- the unit suite is green
- remaining noise is narrow and documented

This is sufficient to continue into Phase 5, as long as the remaining noisy warnings stay tracked and do not expand.

## Recommended Next Test Work

1. Remove jsdom fallback network noise from reservation technician/detail/renderer tests by mocking API-prefetch boundaries
2. Mock or isolate relative `/backend/api/...` fetches inside renderer/detail tests
3. Refresh dependency metadata so `baseline-browser-mapping` and Browserslist warnings stop obscuring real failures
