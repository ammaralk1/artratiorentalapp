> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 6 Listing Usability Audit

## Scope
- Customers
- Technicians
- Equipment
- Reservations
- Projects

## Customers
- Current behavior: full client list renders at once in a simple table with search only.
- Current pain: manageable at low volume, but long lists will force deep scrolling and make edit targets harder to revisit after filtering.
- Pagination need: yes.
- Classification: client-side pagination candidate.
- Why: data is already loaded into memory and filtered locally; the table is structurally simple.
- Page size controls: useful later, but not required in the first batch.
- Preserve exactly: search behavior and edit/delete actions.
- Implemented in Phase 6 Pass 4: client-side pagination with fixed table page size and search-aware page reset.

## Technicians
- Current behavior: full crew list renders at once with search and role filter.
- Current pain: long operational teams will create excessive scroll depth, especially when operators switch between crew records and reservations.
- Pagination need: yes.
- Classification: client-side pagination candidate.
- Why: current filtering is local and the table is still simple enough for client-side slicing.
- Page size controls: optional later; fixed page size is sufficient for a first pass.
- Preserve exactly: search, role filter, and edit/delete interactions.
- Implemented in Phase 6 Pass 5: client-side pagination with fixed table page size plus search/filter-aware page reset.

## Equipment
- Current behavior: grouped equipment cards render all filtered entries at once.
- Current pain: this is the heaviest list surface in the audited scope because cards are visually dense, grouped, and interactive.
- Pagination need: yes.
- Classification: client-side pagination candidate now; server-side pagination candidate later if inventory volume and API costs grow materially.
- Why: current list rendering is local and grouped already, so a client-side page layer is feasible; this is also the highest scroll/performance payoff.
- Page size controls: useful here because operators may prefer larger pages on desktop.
- Preserve exactly: search, category/subcategory/status filters, grouped-card behavior, and click-to-edit actions.
- Implemented in Phase 6 Pass 3: first client-side pagination batch with fixed page size and filter-aware page reset.

## Reservations
- Current behavior: already paginated client-side in the reservations list renderer.
- Current pain: filter density is high, but page depth is already controlled.
- Pagination need: no immediate new work.
- Classification: no-pagination-needed for this phase.
- Future note: server-side pagination may eventually be useful only if reservation history grows beyond comfortable client-side filtering limits.

## Projects
- Current behavior: project focus cards and project table already paginate client-side; reports table also paginates.
- Current pain: the issue is workflow overload and reporting density, not lack of page controls on the main list.
- Pagination need: no immediate new work on the primary project list.
- Classification: no-pagination-needed for this phase.
- Future note: project reports remain a server-side pagination/aggregation candidate in the heavier refactor phase, not here.

## Highest-ROI Pagination Candidate
- Equipment list.
- Reason: highest scroll cost, heaviest card rendering, and the clearest performance/scanability benefit without needing a server-side rewrite first.

## Current Implementation Status
- Equipment now has the first live client-side pagination pattern.
- Customers now have the second live client-side pagination pattern.
- Technicians now have the third live client-side pagination pattern.

## Recommended Next Pagination Order
- List-focused client-side pagination work is materially complete for the main back-office management tables.
- Reassess only later whether projects reports should move deeper into server-side paging/aggregation.
