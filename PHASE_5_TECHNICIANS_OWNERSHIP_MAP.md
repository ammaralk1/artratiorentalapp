# Phase 5 Technicians Ownership Map

## Goal
Document how `src/scripts/technicians.js` initializes, what it depends on, and the smallest safe cleanup path for clarifying ownership without changing behavior.

## Current Init Chain

1. `src/scripts/technicians.js` is imported by:
   - `src/scripts/tabs.js` for dashboard technician-tab rendering
   - `src/pages/projects.html` as a direct module side-loader
   - multiple reservation/report/detail modules for helper access such as `syncTechniciansStatuses()` and `getTechnicianById()`
2. On module evaluation, it restores the technician subtab preference from local storage.
3. It registers global event listeners for reservation updates, technician updates, language changes, auth changes, and technician-position updates.
4. It now exposes an explicit `initTechniciansModule()` boundary.
5. It still self-boots through a thin `bootTechniciansModule()` wrapper on `DOMContentLoaded` for compatibility with the current page graph.

## Side Effects List

- binds technician form, filters, table actions, modal save, positions form, and positions table listeners
- activates technician subtabs
- loads technician positions and updates the related UI
- fetches technicians from the API during boot
- rerenders the table on reservation-driven busy-status changes
- stores the active technician subtab in local storage

## Dependency List

### Direct imports
- `storage.js`
- `utils.js`
- `language.js`
- `auth.js`
- `techniciansService.js`
- `projectsCommon.js`
- `technicianPositions.js`

### Cross-flow coupling
- reservations:
  - `syncTechniciansStatuses()` derives busy/available state from reservations in the shared store
  - listens to `reservations:changed` and `reservations:updated`
- projects:
  - `projects.html` imports `technicians.js` directly so technician data is available to project flows
- dashboard tabs:
  - `tabs.js` calls `renderTechnicians()` when the technicians tab is activated

## DOM Assumptions

Potentially present elements:
- `#technician-form`
- `#technicians-table`
- `#search-technician-input`
- `#technician-role-filter`
- `#save-technician-changes`
- `#position-form`
- `#position-cancel-btn`
- `#positions-table`
- `[data-tech-tabs]`
- edit modal fields
- role summary fields

The module tolerates missing elements, but it still owns shared startup work even when only part of the DOM exists.

## Risk Summary

- risk level: Medium-High
- confirmed ambiguity before this pass:
  - imported by page owners and feature owners, while also self-booting
  - `renderTechnicians()` implicitly performed setup work, not just rendering
  - startup wiring and data fetch ownership were mixed together
- reduced in this pass:
  - explicit init boundary now exists
  - self-boot is now a thin transitional wrapper rather than the only startup contract

## Recommended Smallest Safe Cleanup Strategy

1. Keep the current compatibility self-boot wrapper for now.
2. Use `initTechniciansModule()` as the documented preferred startup entry.
3. Leave shared-state ownership and project-page side-loading unchanged in this pass.
4. In a later pass, move dashboard/project ownership toward explicit page-owned calls and reduce direct side-loader imports.
