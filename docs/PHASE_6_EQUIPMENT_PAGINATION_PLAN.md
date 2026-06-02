> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 6 Equipment Pagination Plan

## Current Rendering Summary
- The equipment tab currently renders all grouped equipment cards at once from [src/scripts/equipment.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/equipment.js).
- Search and filters are applied client-side, then the full filtered result set is rendered into `#equipment-list`.
- The list is card-based and interactive: each card opens editing, and reservation-selection mode adds extra selection controls.

## Pagination Model Choice
- Client-side pagination.
- Reason:
  - equipment data is already loaded locally for this page
  - filters/search already run client-side
  - this pass is meant to improve scanability without changing the data layer

## Filter/Search Interaction
- Search and filters remain authoritative and unchanged.
- Pagination happens after filtering.
- Any search/filter change should reset the visible page to page 1.
- If edits, deletes, or refreshes reduce the result count, the current page should clamp to the last valid page automatically.

## Recommended Page Size
- `12` grouped equipment cards per page.
- Reason:
  - small enough to reduce card overload
  - large enough to avoid excessive paging on medium datasets
  - avoids adding a page-size selector in the first pass

## Pagination Controls Placement
- Below the equipment card grid.
- Controls:
  - previous
  - next
  - compact numbered page buttons
  - range summary for the currently visible slice

## Smallest Safe Implementation Scope
- Add a lightweight client-side pagination helper.
- Add a pagination host below the equipment list in [src/pages/dashboard.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html).
- Keep existing card rendering and click behavior intact.
- Do not add server-side paging or change filter semantics.

## Edge Cases To Preserve
- Empty filtered results still show the current empty state.
- Reservation-selection mode still works on visible cards.
- Editing/deleting an item still refreshes the list correctly.
- Search and filters continue to work exactly as before.
- Language changes continue to rerender labels and controls.

## Verification Plan
- `npm run backoffice:local:smoke`
- targeted pagination helper test
- `npx vitest run tests/tabs/tabs.test.js`
- `npm run test:reservations`
- manual local review:
  - equipment list shows page controls only when needed
  - filtering resets to page 1
  - clicking a card on the current page still opens editing
