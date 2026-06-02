> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Brand Alignment Pass Report

## Goal
- Rebalance the back-office brand rollout so shared tabs, cards, panels, and wrapper surfaces feel like one Art Ratio system instead of old-blue chrome with green accents added on top.

## What Changed
- `src/styles/core.css`
  - rebalanced shared semantic tokens for:
    - page background
    - shell surfaces
    - shell borders and shadows
    - tab shell backgrounds
    - tab hover states
    - tab active states
- `src/styles/app.css`
  - moved remaining shared old-blue rules onto the semantic token family for:
    - `sidebar-link-active`
    - `dashboard-greeting-panel`
    - `dashboard-greeting-toggle`
    - dashboard greeting stat borders
    - dark-mode tab and sidebar icon accents
    - `sidebar-brand-logo`
    - `tab-scroll-btn`
    - `badge-soft`
    - shared scrollbar thumb colors
- `dist/css/sidebar.css`
  - aligned fallback sidebar scrollbars and tab icon accents with the new semantic family
- `src/scripts/ui/injectSidebarStyles.js`
  - aligned fallback active-link and dark sidebar-link visuals with the same token-driven tab/shell language

## Why This Fix Was Chosen
- The problem was not missing brand color in isolated places; it was imbalance between new tokenized shells and old shared blue states that still won visually.
- Rebalancing the token layer and the remaining shared selectors corrects the visual system at the right ownership level.
- This avoids ad hoc page-by-page recolor work and preserves the staged rollout model.

## What Visual Problems It Solved
- Shared tab bars now read as one family:
  - shell
  - inactive state
  - hover state
  - active state
- Shared shell surfaces now carry the brand more directly through:
  - page background
  - wrapper gradients
  - borders
  - shadows
- The UI now relies less on bright/electric blue and more on:
  - deep green
  - muted green
  - slate-steel balancing tones

## What Remained Unchanged
- No workflows changed.
- No markup structure was broadly rewritten.
- No public website/template files changed.
- No production config or production data changed.
- Core features and operator flows stayed intact.

## Runtime / Verification
- `npm run backoffice:local:smoke`
  - passed on isolated real local backup data
- `npx vitest run tests/tabs/tabs.test.js`
  - passed
- `npm run test:reservations`
  - passed
- Headless browser runtime verification was executed on:
  - `login.html`
  - `home.html`
  - `dashboard.html`
  - `projects.html`
- Manual human browser verification was not executed in this terminal pass.

## Headless Visual Check Summary
- `home`
  - tab shell now resolves to the rebalanced green/slate shell gradient
  - welcome card and generic `.box` shell now resolve to the shared shell gradient instead of the older blue-biased surface
- `dashboard`
  - tab shell stays on the rebalanced shell gradient
  - active tab stays on the deep green to steel-slate active gradient
  - greeting panel now resolves to the same shared shell family as other panels
- `projects`
  - tab shell and active state match the dashboard family
  - shell surfaces resolve to the shared shell gradient
- Refresh persistence
  - the rebalanced tab and shell styles remained stable after reload on `dashboard`

## Balance Judgment
- The UI is now materially more brand-aligned than before this pass.
- Blue is no longer the dominant visual language on the shared shell and tab system.
- The current result is balanced enough to continue with the next brand pass, provided the next pass stays token-driven and shared-surface-first.
