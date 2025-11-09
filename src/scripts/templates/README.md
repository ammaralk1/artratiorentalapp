# Templates Modules

This folder contains modular pieces used to render and print project templates.

- build/
  - `callsheet.js` — Builds the Call Sheet page (header/logos, info grids, schedule, Crew table) and provides helpers to populate crew from a reservation.
  - `shotlist.js` — Builds the Shot List page.
  - `expenses.js` — Builds the Expenses pages (top sheet + details groups).
- `core.js` — Shared helpers: `el()` DOM helper, `buildRoot()` page container, `L()` language helper, and `metaCell()`.
- `tableTools.js` — Inline table editing helpers (add/move/delete rows, focus management).
- `assets.js` — Preload/cache images and wait for fonts.
- `print.js` — Stable printing for Call Sheet (html2pdf first, then iframe fallback) with blank-page pruning.
- `debug.js` — Optional overlay to inspect available reservation keys. Enable with `localStorage.setItem('templates.debugOverlay','1')`.

## Add a new template
1. Create a file under `build/<name>.js` that exports `build<Name>Page(project, reservations, opts)`.
2. Re-export or import it in `src/scripts/projects/templatesTab.js` and route by `#templates-type`.
3. Reuse `core.el` + `core.buildRoot` for consistent structure.
4. If you need table editing, import from `tableTools.js`.
5. If the template prints with html2pdf, consider a dedicated `print<Name>.js` for special cases.

## Printing
- The app tries `/vendor/html2pdf.bundle.min.js` first, then CDN. Place the local bundle to avoid CDN issues.
- The Call Sheet printer removes blank pages and has iframe fallback.

## Notes
- Keep builders pure and deterministic. Heavy DOM mutations (pagination, autosave) remain in `templatesTab.js`.
- Prefer small, focused modules. Avoid re-creating listeners; most listeners are bound once in `templatesTab.js`.

