> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 5 Bootstrap Cleanup Plan

## Goal
Reduce ambiguity in the back-office boot/init layer with the smallest safe cleanup batch, while preserving current runtime behavior.

## First Cleanup Batch

### Target
- `src/pages/dashboard.html`

### Exact change
- remove direct module tags for:
  - `/src/scripts/customers.js`
  - `/src/scripts/technicians.js`

### Why this is safe
- `src/main.js` already statically imports `customers.js`
- `src/main.js` already imports `tabs.js`
- `src/scripts/tabs.js` already statically imports `technicians.js`
- ES module ownership for dashboard behavior therefore already exists without the extra top-level HTML tags
- this change reduces bootstrap ambiguity without changing state ownership, tab logic, or UI structure

### Expected benefit
- one clearer bootstrap owner for the dashboard page: `src/main.js`
- lower risk of future duplicate side effects when dashboard boot code is refactored
- less confusion when tracing dashboard initialization during future Phase 5 work

### Risk level
- Low

### What this batch does not touch
- `src/scripts/main.js`
- projects page split ownership
- customer/technician module internals
- reservations UI/state behavior
- navigation or styling

## Next Cleanup Candidates After Batch 1

1. Confirm `src/scripts/main.js` is fully orphaned, then archive or remove it in a dedicated follow-up batch.
2. Separate project page ownership from project reports ownership so `projects.html` has a clearer single-page boot contract.
3. Convert self-boot feature modules toward explicit `init*` exports only after page owners are stable.

## Required Checks After Batch 1

1. `npm run backoffice:local:smoke`
2. `npx vitest run tests/tabs/tabs.test.js`
3. `npm run test:reservations`
4. manual dashboard login/open sanity check against the local isolated stack

## Rollback
- restore the two removed module tags in `src/pages/dashboard.html`

## Acceptance Criteria
- dashboard loads through `src/main.js` with unchanged visible behavior
- dashboard tabs still initialize and switch correctly
- customer and technician tabs still render once opened
- local smoke remains green
- relevant tests remain green
- no public/template files are touched
