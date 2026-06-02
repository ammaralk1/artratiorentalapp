> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 5 Projects Ownership Map

## Goal
Document how the projects page initializes today, where ownership is split, and the smallest safe cleanup path for clarifying startup responsibility without changing behavior.

## Current Init Chain

1. `src/pages/projects.html` loads:
   - translation modules
   - `customers.js`
   - `technicians.js`
   - `projects.js`
2. `src/scripts/projects.js`:
   - applies theme
   - migrates legacy store data
   - checks auth
   - registers reservation globals
   - initializes reservation modal events
   - initializes dashboard shell/theme toggle, main projects UI, and reports on `DOMContentLoaded`
3. `src/scripts/projects/app.js` is invoked by `projects.js` as a subordinate explicit init module for the main projects UI.
4. `src/scripts/projectsReports.js` now exposes an explicit init boundary and is bootstrapped through `projects.js`, while retaining a compatibility self-boot wrapper.

## Ownership Split Map

### `src/scripts/projects.js`
- effective page bootstrap coordinator
- owns shell/theme/auth/reservation-modal bootstrap
- owns the DOM-ready bootstrap decision for the page
- delegates main projects UI to `projects/app.js`
- delegates reports startup to `projectsReports.js`

### `src/scripts/projects/app.js`
- owns main projects page UI wiring
- initializes project tabs, forms, details, and data load paths
- no longer owns a separate internal `DOMContentLoaded` bootstrap path

### `src/scripts/projectsReports.js`
- owns reports tab DOM cache, filters, charts, export, and report data refresh logic
- now exposes `initProjectsReportsModule()` and is preferably started by the page bootstrap owner

### `src/pages/projects.html`
- directly side-loads `customers.js` and `technicians.js`
- no longer loads `projectsReports.js` directly
- still side-loads `customers.js` and `technicians.js` as compatibility hydration dependencies

## Side Effects List

- `projects.js`
  - theme/auth/bootstrap side effects
  - reservation modal setup
- `projects/app.js`
  - projects form/details/tab wiring
  - project data and reservation data refresh
- `projectsReports.js`
  - reports filter wiring
  - chart library loading
  - report data loading and export wiring
  - listens to `projects:changed`, `reservations:changed`, and `storage`

## Dependency List

### Direct module dependencies
- `projects.js` depends on:
  - `projects/app.js`
  - reservation modal/controller helpers
  - dashboard shell/theme/auth/bootstrap helpers
- `projectsReports.js` depends on:
  - storage
  - language
  - API utilities
  - reports/excel helpers
  - projects/reservations service/state helpers

### Cross-module assumptions
- customer and technician side-loaders are still used to populate shared store data for project flows
- reports and main projects UI share the same page DOM and shared underlying data sources, but startup ownership is now coordinated through `projects.js`

## Ambiguity Summary

- risk level: Medium
- confirmed ambiguity before this pass:
  - `projects.js` looked like the page owner, but `projectsReports.js` also self-started independently from HTML
  - `projects.html` directly loaded the reports bootstrap instead of letting the page owner coordinate it
  - ownership between page bootstrap and report bootstrap was implicit rather than explicit
- remaining controlled debt:
  - `customers.js` and `technicians.js` remain direct side-loads in `projects.html` because project startup still depends on shared-store hydration from those modules

## Recommended Smallest Safe Cleanup Strategy

1. Keep `projects.js` as the preferred page bootstrap owner.
2. Keep `projects/app.js` subordinate and explicit, with no separate DOM-ready ownership.
3. Keep `projectsReports.js` explicit and page-owned, with only a compatibility wrapper remaining.
4. Leave `customers.js` and `technicians.js` side-loaders in place until shared-store hydration is reworked in a later phase.
