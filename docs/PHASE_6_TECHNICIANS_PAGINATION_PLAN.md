> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 6 Technicians Pagination Plan

## Current Rendering Summary
- The technicians module currently renders all matching crew rows at once into `#technicians-table`.
- Filtering is fully client-side:
  - free-text search
  - role filter
- The technicians listing appears on both [src/pages/dashboard.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html) and [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html).

## Pagination Model Choice
- Client-side pagination.
- Reason:
  - technician data is already loaded in memory
  - search and role filtering are already local
  - this pass should improve scanability without changing the API layer

## Search / Filter Interaction
- Search and role filter remain authoritative and unchanged.
- Pagination happens after search and role filtering.
- Search changes should reset the current page to page 1.
- Role-filter changes should also reset the current page to page 1.
- If refreshes or edits reduce the result set, the current page should clamp to the last valid page automatically.

## Recommended Page Size
- `10` technicians per page.
- Reason:
  - matches the customer table pattern closely
  - keeps the table compact without forcing frequent paging

## Controls Placement
- Below the technicians table on both dashboard and projects.
- Controls:
  - previous
  - next
  - compact numbered page buttons
  - range summary

## Smallest Safe Implementation Scope
- Add a pagination host below the technicians table in both pages.
- Add a technician-specific pagination wrapper that reuses the same helper pattern from equipment/customers.
- Keep row actions, search, role filtering, and table structure intact.

## Edge Cases To Preserve
- Empty results still show the current empty-state row.
- Loading and error rows remain unchanged.
- Edit and delete actions continue to work from the visible page.
- Role filter options continue to populate from the loaded technicians data.
- Language changes continue to rerender labels and controls.

## Comparison With Equipment / Customers
- Same as equipment/customers:
  - client-side page state
  - compact page buttons
  - range summary
  - reset-to-page-1 when the result signature changes
- Closer to customers than equipment because it is a simple table, not a card grid.
- Different from customers only in that role filtering is part of the result signature.

## Verification Plan
- `npx vitest run tests/technicians/pagination.test.js`
- `npm run backoffice:local:smoke`
- `npx vitest run tests/tabs/tabs.test.js`
- `npm run test:reservations`
- manual browser spot check still recommended later for dashboard/projects technician tables
