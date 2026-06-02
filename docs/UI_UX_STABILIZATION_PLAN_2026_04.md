> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# UI/UX Stabilization Plan (April 2026)

Target branch: `phase-b-tailwind-v4`

Purpose: stabilize the frontend after the Tailwind v4 / daisyUI v5 migration, remove theme and CSS drift, and close the verification gaps that currently allow visual regressions to ship without a clear detection path.

This is not another refactor track. It is a recovery and hardening pass for the UI layer.

---

## Why this plan exists

The current issues are clustered around the same root problems:

- theme boot is split across HTML defaults, `public/js/page-boot.js`, and `src/scripts/theme.js`
- dark mode selectors are inconsistent across authored CSS
- Tailwind v3 syntax is still present in the codebase and is being ignored by Tailwind v4
- design tokens are split between daisyUI theme variables and older `--bo-*` / `--clr-*` variables
- some UI still bypasses theme tokens with inline styles and hard-coded light colors
- `src/`, `public/`, and tracked `dist/` changes make root-cause analysis harder than it should be

If this is not handled as a phased stabilization effort, the team will keep fixing symptoms one page at a time.

---

## Audit Findings

### 1. Theme flash is structural

Pages still hard-code `data-theme="light"` on `<body>`, while early boot and runtime theme code can later switch it again.

Examples:

- [src/pages/dashboard.html](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/pages/dashboard.html#L36)
- [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/pages/projects.html#L23)
- [src/pages/login.html](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/pages/login.html#L23)
- [public/js/page-boot.js](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/public/js/page-boot.js#L53)
- [src/scripts/theme.js](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/scripts/theme.js#L45)

Observed risk:

- flash between light and dark before the app settles
- inconsistent theme state between `html`, `body`, and rendered components

### 2. Dark-mode selector strategy is inconsistent

Different style files are listening to different dark-mode triggers:

- only `html.dark-mode` / `body.dark-mode`
- `html.dark` / `body.dark`
- `[data-theme="dark"]`
- partial combinations of the above

This is already visible in:

- [src/styles/reports.css](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/styles/reports.css)
- [src/styles/tabs.css](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/styles/tabs.css)
- [src/styles/index.css](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/styles/index.css)
- [src/styles/forms.css](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/styles/forms.css)

Observed risk:

- a page can be in dark mode globally while a component still styles as light mode
- fixes in one file do not propagate to other surfaces

### 3. Tailwind v3 syntax still exists

The build still warns on unsupported `@screen` at-rules in Tailwind v4.

Known examples:

- [src/styles/app.css](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/styles/app.css#L4149)
- [src/styles/app.css](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/styles/app.css#L4312)
- [src/styles/app.css](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/styles/app.css#L5549)

Observed risk:

- responsive behavior is partly undefined
- build output is “successful” while some intent is dropped

### 4. Token model is split

The new theme lives in:

- [src/styles/tailwind-theme.css](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/styles/tailwind-theme.css)

But large parts of the UI still style from older variables:

- [src/styles/core.css](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/styles/core.css)
- [src/styles/tabs.css](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/styles/tabs.css)
- [src/styles/reports.css](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/styles/reports.css)

Observed risk:

- colors drift across pages and modes
- theme changes require touching multiple palettes

### 5. Hard-coded presentation still exists

Some UI still uses inline light-theme styling and direct hex values.

Known example:

- [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/pages/projects.html#L834)

Observed risk:

- dark mode breaks even when tokens are correct
- local component fixes bypass the design system

### 6. Source/public/dist drift is increasing confusion

The repo currently has frontend behavior spread across:

- `src/`
- `public/`
- tracked `dist/`

Observed risk:

- developers may fix the wrong layer
- generated output can appear as authored source
- debugging becomes slower and less reliable

### 7. Verification is still too JS-centric

Current automated coverage is good for business logic, but weak for migration-sensitive UI behavior.

Already covered well:

- theme toggle unit behavior in [tests/theme/theme.test.js](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/tests/theme/theme.test.js)
- tabs in [tests/tabs/tabs.test.js](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/tests/tabs/tabs.test.js)
- reports math/builders in [tests/reports/](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/tests/reports/) and [tests/projects/projectsReports/](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/tests/projects/projectsReports/)

Missing or weak:

- no tests for pre-paint theme boot from [public/js/page-boot.js](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/public/js/page-boot.js)
- no tests asserting pages do not hard-code incorrect initial theme defaults
- no tests for selector compatibility across `dark-mode`, `dark`, and `data-theme="dark"`
- no visual or DOM-level regression coverage for reports KPI colors, modals, header shell, or tabbars
- no dedicated stabilization suite for Tailwind-v4-sensitive UI contracts

---

## Phases

### Phase 0 — Freeze and Baseline

Goal:

- stop random UI fixes from spreading across unrelated files
- establish one working baseline and one fix branch

Work:

- freeze new UI styling work outside this stabilization track
- capture current build warnings and current known regressions
- decide source-of-truth policy for `src/`, `public/`, and `dist/`

Deliverables:

- single stabilization branch
- tracked issue list by page/area
- baseline screenshot set for main surfaces

Exit criteria:

- everyone is fixing against the same branch and same regression list

### Phase 1 — Theme Boot and Flash Elimination

Goal:

- remove light/dark flashing and inconsistent first paint

Work:

- remove hard-coded `data-theme="light"` defaults from page bodies
- define a single pre-paint theme decision path
- make [public/js/page-boot.js](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/public/js/page-boot.js) responsible only for pre-paint state
- make [src/scripts/theme.js](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/scripts/theme.js) responsible only for post-boot runtime updates
- ensure `html` and `body` always receive the same theme state

Tests to add:

- `tests/theme/pageBoot.test.js`
  - stored dark theme applies before main app code
  - stored light theme applies before main app code
  - no theme mismatch between `html` and `body`
- extend [tests/theme/theme.test.js](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/tests/theme/theme.test.js)
  - runtime theme change does not remove pre-paint classes incorrectly
  - theme change dispatch remains stable

Exit criteria:

- no visible light/dark flash on login, dashboard, projects, customer, technician
- one authoritative theme state model

### Phase 2 — Selector and Token Normalization

Goal:

- make dark mode and semantic colors behave consistently across the app

Work:

- standardize all authored CSS on one dark selector policy:
  - `html.dark-mode`
  - `body.dark-mode`
  - `html.dark`
  - `body.dark`
  - `html[data-theme="dark"]`
  - `body[data-theme="dark"]`
- make daisyUI/Tailwind theme tokens primary
- map older `--bo-*` tokens to the current theme in one place instead of per file
- remove per-surface palette drift in:
  - reports
  - tabs
  - forms
  - calendar
  - users/index legacy styles

Tests to add:

- `tests/theme/tokenMapping.test.js`
  - primary/success/warning/error token resolution in light and dark
- `tests/theme/pageThemeContracts.test.js`
  - page shells honor theme classes consistently

Exit criteria:

- the same semantic token means the same color in all major surfaces
- dark mode no longer depends on per-file selector luck

### Phase 3 — Tailwind v4 Syntax Completion

Goal:

- finish the migration instead of running with ignored CSS directives

Work:

- replace all remaining `@screen` with explicit `@media`
- remove any remaining unsupported v3-only utility assumptions
- verify entry CSS imports and cascade order
- clear the current Tailwind v4 build warnings from authored CSS

Tests to add:

- build guard in CI or local verification script:
  - fail when `@screen` remains in authored styles
  - fail when old `@tailwind` directives reappear

Suggested checks:

- `rg "@screen\\b" src/styles`
- `rg "@tailwind\\b" src/styles`

Exit criteria:

- no authored Tailwind v4 compatibility warnings remain
- responsive behavior is intentionally defined, not accidentally ignored

### Phase 4 — Component Stabilization by Surface

Goal:

- fix the visible UI/UX regressions in a controlled order

Order:

1. dashboard shell
2. reports
3. reservations modals/forms/calendar
4. projects pages
5. customer/technician/users pages
6. auth/login

For each surface:

- remove inline hard-coded presentation
- replace hard-coded light-only styles with theme-aware classes
- verify RTL and dark mode
- verify mobile and desktop layouts

Tests to add:

- reports:
  - extend [tests/reports/](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/tests/reports/)
  - add DOM-level assertions for KPI number coloring and theme re-render behavior
- reservations:
  - add modal geometry / scroll behavior tests around injected modal markup
- tabs/shell:
  - extend [tests/tabs/tabs.test.js](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/tests/tabs/tabs.test.js) for theme restore and shell visibility behavior

Exit criteria:

- each surface passes light, dark, RTL, and responsive checks before moving on

### Phase 5 — Verification Hardening

Goal:

- close the test gaps that allowed these regressions to slip through

Work:

- add a small UI stabilization test suite
- add smoke checks for:
  - theme boot
  - reports KPI color rendering
  - modal scrollability
  - tab shell visibility after boot
- decide whether to add Playwright later; not required for the first stabilization pass, but recommended after the DOM-level suite exists

Minimum verification for every stabilization PR:

```bash
npx vitest run
php vendor/bin/phpunit
npx tsc --noEmit
npm run build
```

Manual QA matrix:

- login
- dashboard
- projects
- customers
- technicians
- reservations calendar
- reservations modals
- reports
- dark mode
- RTL
- mobile layout

Exit criteria:

- the stabilization suite exists
- manual QA checklist is completed against the final branch

---

## Priority Order

Do not start with reports colors or modal polish again.

Correct order:

1. theme boot
2. selector/token normalization
3. Tailwind v4 syntax cleanup
4. component stabilization by surface
5. verification hardening

If this order is reversed, new regressions will keep reappearing.

---

## Gaps To Close

These are the explicit gaps found in the audit:

- page bodies hard-code `data-theme="light"`
- pre-paint theme logic is split between HTML, boot script, and runtime theme script
- reports CSS still contains many partial dark-selector patterns
- `@screen` remains in authored CSS
- component styling still mixes daisyUI theme tokens and old `--bo-*` palettes without a strict mapping layer
- some page UI still uses inline light-only styling
- no dedicated test coverage exists for `public/js/page-boot.js`
- no stabilization test suite exists for theme boot, report KPI presentation, or modal viewport behavior

This plan is only done when every gap above is either fixed or intentionally removed from scope with a documented reason.

---

## Recommended Next Execution

Start with Phase 1 only.

Concrete first tasks:

1. remove hard-coded `data-theme="light"` from page bodies
2. write `tests/theme/pageBoot.test.js`
3. simplify the contract between [public/js/page-boot.js](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/public/js/page-boot.js) and [src/scripts/theme.js](/Users/ammaralkhatib/Documents/Art%20Ratio%20APP%20V2/V2/src/scripts/theme.js)
4. verify no theme flash on `login`, `dashboard`, and `projects`

Only after that should any component-specific UI fixes continue.
