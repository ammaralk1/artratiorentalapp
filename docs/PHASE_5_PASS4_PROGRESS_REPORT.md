> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 5 Pass 4 Progress Report

## Goal
Clarify ownership and initialization for `src/scripts/customers.js` without changing user-facing behavior.

## Files Changed
- `src/scripts/customers.js`
- `PHASE_5_CUSTOMERS_OWNERSHIP_MAP.md`
- `PHASE_5_SELF_BOOTSTRAP_MAP.md`

## What Changed

### `src/scripts/customers.js`
- introduced an explicit `initCustomersModule()` startup boundary
- routed the existing exported `initCustomers()` helper through that explicit boundary
- moved the old implicit self-boot path behind a thin `bootCustomersModule()` compatibility wrapper
- added idempotent listener guards for form, cancel, table, and search wiring so repeat init calls are structurally safer

## What Stayed The Same
- the module still self-boots for compatibility with the current page graph
- dashboard customer-tab behavior was not intentionally changed
- projects page side-loading behavior was not intentionally changed
- customer data still loads during normal boot
- customer create/update/delete behavior was not changed
- no UX redesign was introduced
- no shared-state rewrite was attempted
- no production or public-template scope was touched

## Ambiguity Reduced
- before this pass, `customers.js` had an exported `initCustomers()` function that did not actually own startup behavior
- the real startup path lived implicitly inside the module’s `DOMContentLoaded` handler
- after this pass, the preferred startup contract is explicit via `initCustomersModule()`, while the self-boot path is clearly transitional compatibility behavior

## Verification Run

### Local/runtime
- `npm run backoffice:local:smoke`
  - passed

### Targeted tests
- `npx vitest run tests/tabs/tabs.test.js`
  - passed: `1` file, `7` tests

### Regression coverage on connected flows
- `npm run test:reservations`
  - passed: `18` files passed, `1` skipped file, `109` tests passed, `6` skipped tests

## Remaining Risks
- `customers.js` is still transitional because it is both:
  - imported by page owners/feature owners
  - self-booted for compatibility
- projects page still imports `customers.js` directly as a side-loader
- shared data ownership between dashboard/projects/customer details is unchanged
- the module still mixes shared data loading and page-local UI wiring, even though the startup contract is clearer now

## Reusable Init Pattern Assessment

- yes, the technicians/customers pattern is now strong enough to serve as a reusable Phase 5 stabilization pattern
- the pattern is:
  1. add an explicit `init*Module()` boundary
  2. preserve the old page graph with a thin compatibility self-boot wrapper
  3. make repeated setup idempotent
  4. keep behavior stable while documenting the preferred ownership path
- this pattern is appropriate for modules that:
  - currently self-bootstrap
  - are also imported by page owners or feature owners
  - can be made idempotent without broad internal rewrites
- it should not be forced onto modules with fundamentally different ownership needs, but it is now a valid default for the next structural cleanup target

## Stability Judgment
- Pass 4 is successful
- customers initialization ownership is clearer than before
- self-bootstrap ambiguity is reduced
- behavior remained unchanged under current verification coverage
