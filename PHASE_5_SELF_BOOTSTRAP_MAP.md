# Phase 5 Self-Bootstrap Map

## Goal
Document target modules that self-bootstrap so ownership rules are explicit before deeper structural cleanup.

## Target Files

| File | Self-bootstrap | Imported by page owner | Double-init risk | Recommended ownership model | Notes |
| --- | --- | --- | --- | --- | --- |
| `src/scripts/main.js` | Yes | No | Medium | Transitional/legacy compatibility shim | Not referenced by active pages; previously duplicated dashboard bootstrap responsibilities. |
| `src/scripts/tabs.js` | No | Yes | Low | Page-owned init | Activated by `src/main.js`; should stay explicit. |
| `src/scripts/customers.js` | Yes, through a thin transitional wrapper | Yes | Low-Medium | Transitional with explicit init boundary | Exposes `initCustomersModule()` as the preferred startup contract, while keeping a compatibility self-boot wrapper for the current page graph and project side-loading. |
| `src/scripts/technicians.js` | Yes, through a thin transitional wrapper | Yes | Medium | Transitional with explicit init boundary | Exposes `initTechniciansModule()` as the preferred startup contract, while keeping a compatibility self-boot wrapper for current pages. |

## Directly Connected Files

| File | Self-bootstrap | Imported by page owner | Double-init risk | Recommended ownership model | Notes |
| --- | --- | --- | --- | --- | --- |
| `src/main.js` | Yes | Yes | Low | Page-owned init | Correct active dashboard owner. Uses explicit `initApp()` gate. |
| `src/scripts/projects.js` | Partial | Yes | Medium | Page-owned init | Owns projects page shell and reservation modal wiring. |
| `src/scripts/projectsReports.js` | Yes, through a thin transitional wrapper | Yes | Low-Medium | Transitional with explicit init boundary | Exposes `initProjectsReportsModule()` while the preferred startup now flows through `projects.js`. |
| `src/scripts/home.js` | Partial | Yes | Low | Standalone self-init | Single-page owner, not part of the dashboard tab bootstrap chain. |
| `src/scripts/users.js` | Partial | Yes | Low | Standalone self-init | Single-page owner with page-local bootstrap. |

## Risk Notes

- `customers.js` and `technicians.js` are not only UI modules. They also hydrate shared in-memory state and respond to global events, which makes their self-bootstrap behavior more consequential than a simple page-local script.
- `technicians.js` remains the highest-risk self-bootstrap target in this cluster because it still combines:
  - compatibility self-init
  - API fetch on boot
  - event-driven rerendering
  - technician-position subtab wiring
  - indirect dependency from reservations and project flows
- `tabs.js` itself is structurally clean. The ambiguity is around what it activates versus what feature modules initialize on their own.

## Recommended Cleanup Order

1. Resolve `src/scripts/main.js` as legacy-only and remove its duplicate bootstrap body.
2. Keep `tabs.js` page-owned through `src/main.js`.
3. Keep `customers.js` and `technicians.js` on the explicit-init compatibility pattern until projects-page side-loading is isolated.
4. Continue reducing split ownership on pages that still combine a page owner with independently self-booting feature modules.
