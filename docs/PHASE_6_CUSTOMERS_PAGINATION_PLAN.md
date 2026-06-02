> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 6 Customers Pagination Plan

## Current Rendering Summary
- The customers module currently renders all matching customers at once into `#customers-table`.
- Search is client-side only and filters by name, phone, and company.
- The same customers module and DOM structure are reused on both [src/pages/dashboard.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html) and [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html).

## Pagination Model Choice
- Client-side pagination.
- Reason:
  - customer data is already loaded in memory
  - the current search flow is already fully local
  - this pass should improve scanability without altering the API layer

## Search Interaction
- Search remains authoritative and unchanged.
- Pagination happens after search filtering.
- Search changes should reset the current page to page 1.
- If refreshes or edits reduce the result set, the current page should clamp to the last valid page automatically.

## Recommended Page Size
- `10` customers per page.
- Reason:
  - fits a compact table better than the equipment card page size
  - reduces long-table scrolling without making page switches too frequent

## Controls Placement
- Below the customers table on both dashboard and projects.
- Controls:
  - previous
  - next
  - compact numbered page buttons
  - range summary

## Smallest Safe Implementation Scope
- Add a small pagination host below the customers table in both pages.
- Add a customer-specific pagination wrapper that reuses the same helper pattern introduced in the equipment pass.
- Keep row actions, search behavior, and table structure intact.

## Edge Cases To Preserve
- Empty results still show the current empty-state row.
- Loading and error rows remain unchanged.
- Edit, file preview, and delete actions continue to work from the visible page.
- Language changes continue to rerender labels and controls.

## Comparison With Equipment Pattern
- Same: client-side page state, compact page buttons, visible range summary, reset-to-page-1 behavior on filter changes.
- Different: customers uses a table instead of cards, has only one search input, and uses a smaller fixed page size.

## Verification Plan
- `npx vitest run tests/customers/pagination.test.js`
- `npm run backoffice:local:smoke`
- `npx vitest run tests/tabs/tabs.test.js`
- `npm run test:reservations`
- manual spot check still recommended later in a browser for pagination controls on dashboard and projects
