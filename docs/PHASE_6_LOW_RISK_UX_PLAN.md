> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 6 Low-Risk UX Plan

## First Batch Target
- Primary page: [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html)
- Supporting translations: [src/scripts/translations/projects.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/translations/projects.js)

## What Will Change
- Add a short orientation hint below the main projects page heading to explain the purpose of the top-level tabs.
- Add a short workflow hint below the project subtabs to explain which subtab is used for create, list, reports, and templates.
- Add short context hints to the customer and technician sections inside the projects page so operators understand these are supporting master-data workflows for projects and reservations.

## What Will Not Change
- No tabs or buttons will be removed.
- No routing or startup behavior will change.
- No shared state or data flow will be refactored.
- No CSS-system cleanup or visual redesign will be introduced.
- No reporting logic or reservation logic will be altered.

## Why This Batch Is Safe
- It only adjusts explanatory copy in an existing page.
- It uses the existing translation system and existing spacing/text utility classes.
- It reduces ambiguity without changing the actual paths operators use today.
- It can be verified with current smoke and test coverage because no business logic changes are involved.

## Expected Operator Benefit
- Faster recognition of where to create work versus where to maintain supporting records.
- Less hesitation on the projects page when deciding between subtabs.
- Better understanding of why customer and crew management appear inside the projects workspace.

## Verification Required
- `npm run backoffice:local:smoke`
- `npx vitest run tests/tabs/tabs.test.js`
- `npm run test:reservations`
- Manual local workflow spot check:
  - open projects page
  - confirm all existing tabs/subtabs remain present
  - confirm helper text appears in both the projects and supporting sections
