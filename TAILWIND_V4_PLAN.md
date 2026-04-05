# Tailwind v4 Plan

Target branch: new Phase B branch after `phase-0-environment-control`

Repo reality check date: 2026-04-05

## Goal

Upgrade the app from the current Tailwind v3-style setup to a Tailwind v4-compatible setup that works cleanly with `daisyui@^5.1.26`, without mixing this work into another large frontend refactor.

This pass should also absorb the remaining chart/UI color literals so Phase B can close instead of leaving styling debt behind.

## Current Repo State

Dependencies today:

- `tailwindcss@^3.4.14`
- `daisyui@^5.1.26`
- `postcss@^8.5.6`

Current wiring:

- `src/styles/app.css` uses `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`
- `src/styles/auth.css` also uses the old `@tailwind` directives
- `tailwind.config.js` still defines theme tokens, `container`, and daisyUI theme config
- `postcss.config.js` still registers `tailwindcss`
- Vite is already the primary build tool in `vite.config.js`

Repo-specific migration pressure points already found:

- v4 no longer auto-detects `tailwind.config.js`; if we keep it temporarily, CSS must load it explicitly with `@config`
- daisyUI v5 now expects `@plugin "daisyui"` and custom themes in CSS via `@plugin "daisyui/theme"`
- this repo uses utilities called out in the v4 upgrade guide as changed or renamed:
  - `shadow-sm`
  - `backdrop-blur-sm`
  - `outline-none`
  - `focus:ring`
  - `container`
  - old opacity utilities like `border-opacity-*`, `bg-opacity-*`, `text-opacity-*`
- hard-coded chart colors still exist in `src/scripts/projectsReports/charts.ts`

## Recommended Migration Strategy

### Step 1 — Upgrade on a dedicated branch

- create a new branch for Phase B only
- do not combine with more JS refactors
- keep regression scope focused on CSS/build/theme behavior

### Step 2 — Prefer the Vite plugin path

Because this repo already uses Vite, prefer Tailwind's v4 Vite integration instead of the PostCSS-only path.

Target dependency shape:

- `tailwindcss@^4`
- `@tailwindcss/vite`
- keep `daisyui`
- `autoprefixer` should no longer be required for Tailwind itself

Expected Vite change:

- add `@tailwindcss/vite` to `vite.config.js`
- remove Tailwind from `postcss.config.js`

Fallback:

- if Vite plugin adoption creates an unexpected issue, use `@tailwindcss/postcss` instead of the old `tailwindcss` PostCSS plugin

### Step 3 — Convert CSS entry files to v4 syntax

Main CSS entry files to change:

- `src/styles/app.css`
- `src/styles/auth.css`

Minimum required changes:

- replace old `@tailwind ...` directives with `@import "tailwindcss";`
- temporarily load legacy JS config with `@config "../../tailwind.config.js";` until theme/config fully moves to CSS
- add `@plugin "daisyui"` in CSS

Possible end state choices:

1. Incremental migration:
   - keep `tailwind.config.js` for one pass using `@config`
   - move daisyUI theme definitions into CSS first
2. Full CSS-first migration:
   - move theme tokens and `container` utility into CSS now
   - reduce `tailwind.config.js` to zero or remove it

Recommendation:

- use the incremental path first
- keep the diff smaller
- only move the daisyUI theme layer to CSS in this phase

### Step 4 — Migrate daisyUI configuration into CSS

Current daisyUI config lives in `tailwind.config.js`.

It should move into CSS using:

- `@plugin "daisyui" { ... }`
- `@plugin "daisyui/theme" { ... }`

Repo-specific requirement:

- preserve the existing `light` and `ar_dark` theme intent
- preserve RTL behavior expectations
- preserve the current semantic color names already used in templates and pages:
  - `primary`
  - `secondary`
  - `accent`
  - `neutral`
  - `base-*`

### Step 5 — Handle v4 utility compatibility

Audit and update the utilities already found in this repo:

- `shadow-sm` → likely `shadow-xs` where the old visual weight must be preserved
- `backdrop-blur-sm` → likely `backdrop-blur-xs` where the old visual weight must be preserved
- `outline-none` → `outline-hidden`
- bare `ring` / `focus:ring` → explicit `ring-3` and explicit ring color where old defaults were assumed
- `container` customization must move out of JS config if the old centered/padded behavior is still needed
- old opacity utilities:
  - `bg-opacity-*`
  - `text-opacity-*`
  - `border-opacity-*`
  - `divide-opacity-*`
  - `placeholder-opacity-*`

Special attention:

- `src/styles/auth.css` currently uses `border-opacity-60`, `bg-opacity-70`, and `text-opacity-80`
- `src/pages/users.html` currently uses `outline-none`
- `src/styles/app.css` currently uses `focus:ring` patterns and multiple `shadow-sm` / `backdrop-blur-sm` utilities

### Step 6 — Rebuild container behavior explicitly

The current JS config still customizes `container`:

- `center: true`
- `padding: '1.25rem'`

Tailwind v4 no longer uses those old config options for `container`.

If existing layout depends on them, recreate container behavior in CSS with a dedicated utility.

### Step 7 — Close the remaining color debt in the same pass

Replace remaining hard-coded chart colors in:

- `src/scripts/projectsReports/charts.ts`

Target:

- use theme-aware values or shared design tokens instead of literal blues/pinks/yellows where possible

## Suggested Execution Order

1. Create the Phase B branch
2. Upgrade dependencies
3. Wire Tailwind v4 into Vite
4. Convert `app.css` and `auth.css` to `@import "tailwindcss"`
5. Add temporary `@config` loading
6. Move daisyUI plugin/theme setup into CSS
7. Fix known v4 utility breakpoints
8. Replace remaining chart color literals
9. Run build/tests
10. Do a manual UI regression pass

## Regression Checklist

Check these areas manually after the migration:

- login page
- dashboard shell/header/sidebar
- projects reports charts and filters
- reservations calendar and filters
- templates preview pages
- customer page
- technician page
- dark theme
- RTL layout

## Verification

Run at minimum:

```bash
npx vitest run
php vendor/bin/phpunit
npx tsc --noEmit
npm run build
```

## References

Official sources used for this plan:

- Tailwind v4 upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- Tailwind functions/directives reference: https://tailwindcss.com/docs/functions-and-directives
- Tailwind v4 PostCSS install: https://tailwindcss.com/docs/installation/using-postcss
- Tailwind v4 announcement and Vite plugin guidance: https://tailwindcss.com/blog/tailwindcss-v4
- daisyUI install docs: https://daisyui.com/docs/install/
- daisyUI themes docs: https://daisyui.com/docs/themes/
