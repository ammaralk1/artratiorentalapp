# Phase 5 Proposal

## Phase 5 Goal

Reduce architecture risk and clarify ownership without changing product behavior or removing operational capability.

## Recommended First Structural Targets

### 1. Page bootstrap ownership and duplicate entrypoint cleanup

Primary targets:

- `src/main.js`
- `src/scripts/main.js`
- `src/scripts/tabs.js`
- `src/pages/dashboard.html`
- `src/pages/projects.html`
- any page still loading overlapping direct script tags plus page entry bootstraps

Why first:

- this is the highest-ROI way to reduce hidden side effects and unpredictable startup behavior
- it lowers risk for every later state/UX/styling change

What it risks breaking:

- tab initialization timing
- lazy-loaded module rendering
- page-specific event binding

Required guards:

- `npm run test:reservations`
- `npm run backoffice:local:smoke`
- dashboard/manual navigation smoke in the isolated stack

### 2. Frontend state ownership and global-store boundary cleanup

Primary targets:

- `src/scripts/storage.js`
- `src/scripts/reservationsService.js`
- `src/scripts/projectsService.js`
- customer/technician/detail pages that still mix page-local state with shared caches

Why second:

- Phase 4 already proved that scoped-page writes can pollute shared state
- clarifying cache ownership reduces stale data bugs and makes tests less fragile

What it risks breaking:

- list/detail synchronization
- optimistic UI updates
- cross-tab refresh behavior

Required guards:

- reservation/service unit suites
- project/reservation manual CRUD verification in local Docker
- dashboard summary regression check

### 3. Shared shell and navigation duplication reduction

Primary targets:

- repeated sidebar/header markup across internal HTML pages
- duplicated dashboard tab bars and navigation surfaces

Why third:

- reduces copy drift
- makes UX cleanup and styling cleanup safer later

What it risks breaking:

- page navigation affordances
- active-tab persistence
- layout consistency across desktop/mobile

Required guards:

- `tests/tabs/tabs.test.js`
- local navigation smoke across home, dashboard, projects, users, and detail pages

## What Must Not Change During Phase 5

- no production deployment
- no public website/template edits
- no feature removal
- no workflow simplification that strips operational capability
- no broad styling redesign

## Preservation Rules For Phase 5

- preserve current page behavior first
- refactor ownership, not business intent
- keep one clear bootstrap owner per page
- keep one clear cache/data owner per domain flow
- move duplicated shell/navigation into shared structures only when behavior is proven unchanged

## Proposed Execution Order

1. bootstrap ownership map and duplicate entrypoint removal
2. shared-state ownership boundaries
3. shell/navigation deduplication

## Phase 5 Entry Checks

Run before and after each target:

```bash
npm run backoffice:local:smoke
npm run test:reservations
export INTEGRATION_API_BASE_URL=http://127.0.0.1:8080/api
export INTEGRATION_USERNAME=integration_admin
export INTEGRATION_PASSWORD=TestPassword123!
npm run test:integration
```

## Recommended First Target

Start with **page bootstrap ownership on dashboard/projects/reservations**.

This is the safest first move because it reduces duplicated initialization paths without forcing immediate data-model or UX changes, and it creates cleaner boundaries for the state-ownership work that should follow.
