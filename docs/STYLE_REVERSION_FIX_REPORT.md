> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Style Reversion Fix Report

## Goal
- Resolve the visual style reversion / non-application bug before continuing brand rollout.

## What Changed
- `public/js/page-boot.js`
  - changed sidebar fallback injection timing to run after document parse instead of immediately in the early head script
- `src/scripts/auth.js`
  - removed the `injectSidebarStyles.js` side-effect import from the normal auth path
- `src/styles/app.css`
  - converted shared sidebar and tab-shell surfaces from hard-coded blue gradients to semantic token-driven styling
- `dist/css/sidebar.css`
  - converted legacy fallback sidebar/tab shell visuals to semantic token-driven styling
- `src/scripts/ui/injectSidebarStyles.js`
  - aligned the remaining fallback sidebar/dashboard-tabbar styles to semantic tokens

## Files Changed
- `public/js/page-boot.js`
- `src/scripts/auth.js`
- `src/styles/app.css`
- `dist/css/sidebar.css`
- `src/scripts/ui/injectSidebarStyles.js`

## Why This Fix Was Chosen
- It addresses the real ownership and load-order problem instead of suppressing symptoms with `!important`.
- It preserves the staged rollout model:
  - shared semantic tokens remain the source of truth
  - fallback layers remain available
  - fallback layers no longer carry a divergent visual language
- It avoids broad markup rewrites or behavioral changes.

## What Remained Unchanged
- No workflow logic changed.
- No routing changed.
- No public website/template code changed.
- No production configuration changed.
- No feature was removed.

## Runtime / Visual Validation
- Real local restored backup data remained active as the validation checkpoint.
- Headless browser verification was executed on:
  - `login.html`
  - `home.html`
  - `dashboard.html`
  - `projects.html`
- Manual human browser verification was not executed in this terminal pass.

## Post-Fix Findings
- Sidebar stylesheet duplication from `page-boot.js` no longer appears on pages that already include `/dist/css/sidebar.css`.
- The normal auth path no longer injects late legacy inline styles from `injectSidebarStyles.js`.
- Shared tab shells now keep the token-driven green brand treatment after refresh.
- Shared shell surfaces now visibly use the semantic shell tokens where intended:
  - `.dashboard-tabbar`
  - `.sidebar-shell`
  - `.sidebar-panel`
  - `.sidebar-link`
  - `.sidebar-stats-row`
  - `.sidebar-panel--tabs .tab-button`
  - `.glass-card`
  - `.box`

## Computed-Style Verification Summary
- `home`
  - `.home-main-tabbar .tab-buttons` stayed token-driven and stable from early sample to late sample to reload
  - `.home-welcome-card` and `.box` stayed on the token-driven shell gradient after reload
- `dashboard`
  - `.dashboard-tabbar .tab-buttons` stayed token-driven and stable
  - `.dashboard-tabbar .tab-button.active` remained on the branded green active gradient after reload
  - `.dashboard-greeting-panel` stayed on the shell token gradient after reload
- `projects`
  - `.dashboard-tabbar .tab-buttons` stayed token-driven and stable
  - `.dashboard-tabbar .tab-button.active` stayed on the branded green active gradient after reload

## Remaining Runtime Notes
- Headless login still logs the previously known low-severity Credential API warnings.
- Reservation test output still contains the previously known jsdom/network warning noise around `127.0.0.1:8000`.
- No new runtime failures or failed API requests were introduced by this fix.

## Verification Run
- `npm run backoffice:local:smoke`
  - passed on restored real local data
- `npx vitest run tests/tabs/tabs.test.js`
  - passed
- `npm run test:reservations`
  - passed
- Headless browser runtime check against real local backup data
  - passed for `home`, `dashboard`, and `projects`

## Resolution Judgment
- The visual reversion / non-application issue is resolved for the investigated shared surfaces.
- The new token-driven styling now persists after refresh for the affected tab/shell surfaces.
- Brand Application Pass 3 can resume, but it should continue using the semantic token/shared primitive path rather than reintroducing page-local fallback visuals.
