> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 7 Low-Risk Style Plan

## First Cleanup Batch Goal
- Reduce confirmed stylesheet duplication.
- Prepare the styling layer for later brand-identity work by introducing semantic tokens and a shared hook for the new list pagers.
- Preserve the current visual identity and behavior.

## Exact Files To Target First
- [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html)
- [src/pages/dashboard.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html)
- [src/styles/core.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css)
- [src/styles/app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)
- [src/scripts/equipment.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/equipment.js)
- [src/scripts/customers.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/customers.js)
- [src/scripts/technicians.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/technicians.js)

## What Would Change
- Remove the extra `forms.css` and `reports.css` links from `projects.html` because `app.css` already imports both files.
- Add semantic alias tokens in `core.css` for:
  - surface
  - border
  - muted text
  - accent
  - radius
  - shadow
- Add one shared `.list-pagination` primitive in `app.css` using the current visual values.
- Update equipment/customers/technicians list pagers to render through the shared pagination hook while keeping the same Bootstrap button classes and current button behavior.

## What Would Not Change
- No layout redesign.
- No replacement of Bootstrap/Tailwind usage.
- No change to reservation/report pagination systems in this first pass.
- No change to application behavior or page flow.
- No broad markup rewrite beyond adding the shared pagination hook class.

## Why This Batch Is Safe
- Duplicate import removal is confirmed, local, and low-risk.
- Semantic alias tokens can be added without replacing existing token usage.
- Shared pagination hooks target only the new list pagers already introduced in Phase 6.
- Button semantics, event wiring, filtering, and page behavior remain unchanged.

## Expected Maintainability Benefit
- One confirmed duplicate stylesheet path removed.
- Clearer separation between low-level legacy tokens and semantic UI-layer tokens.
- Equipment/customers/technicians pager styling becomes a reusable primitive instead of repeated utility-only markup.
- Later brand-application work gets a cleaner token and primitive layer without requiring a redesign now.

## Required Verification
- `npm run backoffice:local:smoke`
- `npx vitest run tests/equipment/pagination.test.js tests/customers/pagination.test.js tests/technicians/pagination.test.js`
- `npm run test:reservations`
- Manual visual spot check notes for:
  - dashboard equipment pager
  - dashboard customers pager
  - dashboard technicians pager
  - projects customers pager
  - projects technicians pager
