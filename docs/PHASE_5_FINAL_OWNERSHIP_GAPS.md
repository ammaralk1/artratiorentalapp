> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 5 Final Ownership Gaps

## Current Gap Summary

The remaining projects-page ownership ambiguity is small but real:
- `src/scripts/projects.js` is the preferred page bootstrap owner
- `src/scripts/projects/app.js` is not directly loaded by HTML, but it still contained its own internal `DOMContentLoaded` bootstrap decision
- `src/pages/projects.html` still side-loads `customers.js` and `technicians.js` to hydrate shared store data needed by project flows

## Remaining Ambiguity List

### `src/scripts/projects/app.js`
- role before this pass:
  - subordinate feature module
  - but still contained its own DOM-ready bootstrap logic
- ambiguity:
  - startup responsibility was split between the page owner and a subordinate module

### `customers.js` / `technicians.js` side-loading in `projects.html`
- role:
  - compatibility hydration dependencies for the current shared-store model
- ambiguity:
  - they look like optional page scripts, but project selects and linked project/customer/technician flows still rely on shared store snapshots populated by those modules

## Dependency Explanation

### Why `projects/app.js` matters
- it owns the main projects UI wiring, including:
  - DOM cache
  - project tab setup
  - form wiring
  - linked reservation handling
  - data load and render boot
- because `projects.js` is the preferred page owner, the DOM-ready decision should also live there

### Why `customers.js` and `technicians.js` are still loaded by `projects.html`
- `projects/data.js` and `projects/form.js` read `loadData()` snapshots from the shared in-memory store
- current project startup assumes customer and technician data are already hydrated into that store
- removing those side-loaders now would drift into shared-state ownership refactoring, which is outside the safe scope of this pass

## Recommended Smallest Safe Cleanup

1. Move the final DOM-ready bootstrap responsibility for the main projects UI into `src/scripts/projects.js`.
2. Keep `src/scripts/projects/app.js` as a subordinate explicit init module with no internal `DOMContentLoaded` ownership.
3. Leave `customers.js` and `technicians.js` side-loading in place for now, but explicitly classify them as controlled structural debt tied to shared-store hydration.

## Controlled Structural Debt

### `projects.html` customer/technician side-loaders
- status: intentional temporary compatibility dependency
- reason it remains:
  - current shared-store hydration path still depends on those modules
- why not remove now:
  - safe removal requires a broader data-ownership refactor for project startup
- follow-up phase:
  - later structural/data-flow cleanup, not this final Phase 5 closure pass
