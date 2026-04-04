# Style Reversion Audit

## Goal
- Find why token-driven brand styling was either:
  - visible briefly and then reverted
  - or not visually applying on shared back-office surfaces

## Scope
- Back-office pages only
- Verified on isolated local runtime with real restored backup data
- `Arino - Template/` excluded
- Production untouched

## Affected Pages / Surfaces
- `home.html`
  - main tab shell in `.home-main-tabbar .tab-buttons`
  - sidebar tab stack under `.sidebar-panel--tabs`
  - workspace cards using `.box`
- `dashboard.html`
  - main dashboard tab shell in `.dashboard-tabbar`
  - active dashboard tab pill in `.dashboard-tabbar .tab-button.active`
  - sidebar tab stack under `.sidebar-panel--tabs`
  - greeting shell using `.glass-card.dashboard-greeting-panel`
- `projects.html`
  - projects top tab shell in `.dashboard-tabbar`
  - shared glass/panel shells
  - sidebar tab stack under `.sidebar-panel--tabs`

## Reproduction Notes
- The issue was reproducible in local runtime after Brand Pass 2.
- The visible symptom pattern was:
  - shared tabs could show new token-driven colors momentarily
  - later in page init they reverted toward the older blue treatment
  - some intended branded shells never visibly changed because their wrappers were still using old hard-coded gradients

## Flash/Revert vs Never-Applied Split
- Flash then revert:
  - sidebar tabs using `.sidebar-panel--tabs .tab-button`
  - dashboard / projects tab shells influenced by `.dashboard-tabbar` fallback styles
- Never visually changed as intended:
  - `.sidebar-shell`
  - `.sidebar-panel`
  - `.sidebar-link`
  - `.sidebar-stats-row`
  - `.dashboard-tabbar`
  - `.dashboard-tabbar .tab-buttons`
- Shared `.glass-card` / `.box` shells were already connected to the newer semantic shell tokens; they were not the main reversion source.

## Stylesheet Load Order Findings
- Source pages load:
  - `/src/styles/app.css`
  - `/dist/css/sidebar.css`
- Before the fix, `public/js/page-boot.js` also injected an extra `/dist/css/sidebar.css` link plus `#sidebar-inline-fallback`.
- Root-cause detail:
  - `page-boot.js` ran before the parser reached the later `<link rel="stylesheet" href="/dist/css/sidebar.css">` tag in the page head.
  - Its missing-stylesheet check therefore returned false negative and injected a duplicate sidebar stylesheet/fallback.
- Headless runtime verification before the fix showed duplicated sidebar stylesheets in `document.styleSheets`.

## Theme / Runtime Override Findings
- `src/scripts/auth.js` imported `src/scripts/ui/injectSidebarStyles.js` as a side effect.
- `injectSidebarStyles.js` auto-ran on import and appended old fallback CSS into the head after module init.
- That injected CSS included old visual rules for:
  - `.dashboard-tabbar`
  - `.dashboard-tabbar .tab-buttons`
  - sidebar shell/panel surfaces
- This was a genuine runtime override, not just static source duplication.

## Token Wiring Findings
- Brand tokens existed and were valid in `src/styles/core.css`.
- Some shared primitives were correctly wired:
  - `.glass-card`
  - `.box`
  - generic `.tab-buttons`
  - generic `.tab-button.active`
- But several page/shared wrappers still hard-coded the old palette in `src/styles/app.css` and `dist/css/sidebar.css`, especially:
  - `.sidebar-shell`
  - `.sidebar-panel`
  - `.sidebar-link`
  - `.sidebar-stats-row`
  - `.sidebar-panel--tabs .tab-button`
  - `.dashboard-tabbar`
  - `.dashboard-tabbar .tab-buttons`

## Exact Root Causes
- Root cause 1:
  - `public/js/page-boot.js` injected duplicate sidebar CSS too early, before the page's own sidebar stylesheet links were parsed.
- Root cause 2:
  - `src/scripts/auth.js` side-loaded `injectSidebarStyles.js`, which appended old fallback tab/shell styles after runtime init.
- Root cause 3:
  - Several shared shells and tab containers were still using old hard-coded visual rules in `src/styles/app.css` and `dist/css/sidebar.css`, so they were not actually connected to the new brand tokens.

## Severity
- High for ongoing UI rollout work
- Medium for runtime correctness
- It did not break business logic, but it made brand rollout visually unreliable and masked actual styling ownership

## Recommended Fix
- Remove runtime fallback injection from the normal auth/init path.
- Stop `page-boot.js` from injecting duplicate sidebar CSS before real page stylesheet links are parsed.
- Re-route remaining shared sidebar/tab shell rules through semantic token variables instead of legacy blue gradients.
- Keep fallback files, but align them to semantic tokens so they can no longer fight the primary styling layer.

## Fix Chosen
- `page-boot.js`
  - defer sidebar fallback injection until after document parse so duplicate detection becomes accurate
- `auth.js`
  - remove the `injectSidebarStyles.js` side-effect import from the normal auth path
- `app.css`
  - convert shared sidebar/tab shell wrappers to token-driven styling
- `dist/css/sidebar.css`
  - convert legacy fallback sidebar styles to the same semantic tokens
- `injectSidebarStyles.js`
  - align remaining fallback CSS with the same semantic tokens for future-safe parity
