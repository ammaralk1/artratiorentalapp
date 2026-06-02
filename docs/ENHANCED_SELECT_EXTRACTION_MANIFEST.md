> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Enhanced Select Extraction Manifest

Scope:
- `src/styles/app.css`
- `src/styles/reservations.css`
- `src/scripts/ui/enhancedSelect.js`
- `src/main.js`
- active runtime usage in dashboard, reservations, customer, and technician flows

Out of scope:
- broad cleanup
- generic control refactor
- design restyling
- semantic/status work
- export/template CSS

## Executive Summary

This manifest is implementation-ready for a future low-risk extraction of pure enhanced-select component rules into `src/styles/enhanced-select.css`.

The safe move set is now explicit:

- move only pure `.enhanced-select*` component selectors from `src/styles/app.css`
- keep all equipment and reservations contextual selectors local
- preserve base-before-dark ordering inside the future component stylesheet
- import the future stylesheet from `src/styles/app.css` with the existing import group, before app-local rules continue

No broader refactor is needed for the extraction batch itself.

## Exact Move List

Move these selectors into `src/styles/enhanced-select.css` unchanged.

### Base component block

From `src/styles/app.css`:

- [app.css#L3807](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3807)
  `.enhanced-select`
- [app.css#L3814](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3814)
  `.enhanced-select__native`
- [app.css#L3818](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3818)
  `.enhanced-select__trigger`
- [app.css#L3908](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3908)
  `.enhanced-select__trigger:disabled`
- [app.css#L3909](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3909)
  `.enhanced-select--disabled .enhanced-select__trigger`
- [app.css#L3916](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3916)
  `.enhanced-select__trigger:hover`
- [app.css#L3917](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3917)
  `.enhanced-select__trigger:focus-visible`
- [app.css#L3918](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3918)
  `.enhanced-select[data-open='true'] .enhanced-select__trigger`
- [app.css#L3925](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3925)
  `.enhanced-select__trigger:focus-visible`
- [app.css#L3930](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3930)
  `.enhanced-select__trigger::after`
- [app.css#L3944](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3944)
  `.enhanced-select[data-open='true'] .enhanced-select__trigger::after`
- [app.css#L3948](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3948)
  `.enhanced-select__menu`
- [app.css#L3969](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3969)
  `.enhanced-select[data-open='true'] .enhanced-select__menu`
- [app.css#L3975](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3975)
  `.enhanced-select__option`
- [app.css#L3986](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3986)
  `.enhanced-select__option + .enhanced-select__option`
- [app.css#L3990](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3990)
  `.enhanced-select__option:hover`
- [app.css#L3991](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3991)
  `.enhanced-select__option:focus`
- [app.css#L3996](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3996)
  `.enhanced-select__option[aria-selected='true']`
- [app.css#L4001](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4001)
  `.enhanced-select__option[aria-disabled='true']`
- [app.css#L4006](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4006)
  `:where(html[dir='rtl']) .enhanced-select__trigger`
- [app.css#L4011](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4011)
  `:where(html[dir='rtl']) .enhanced-select__trigger::after`

### Dark component block

From `src/styles/app.css`:

- [app.css#L4949](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4949)
  `:where(html.dark, body.dark) .enhanced-select__trigger`
- [app.css#L4956](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4956)
  `:where(html.dark, body.dark) .enhanced-select__trigger::after`
- [app.css#L4960](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4960)
  `:where(html.dark, body.dark) .enhanced-select__trigger:hover`
- [app.css#L4961](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4961)
  `:where(html.dark, body.dark) .enhanced-select__trigger:focus-visible`
- [app.css#L4962](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4962)
  `:where(html.dark, body.dark) .enhanced-select[data-open='true'] .enhanced-select__trigger`
- [app.css#L4969](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4969)
  `:where(html.dark, body.dark) .enhanced-select__trigger:focus-visible`
- [app.css#L4973](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4973)
  `:where(html.dark, body.dark) .enhanced-select__menu`
- [app.css#L4979](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4979)
  `:where(html.dark, body.dark) .enhanced-select__option`
- [app.css#L4983](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4983)
  `:where(html.dark, body.dark) .enhanced-select__option:hover`
- [app.css#L4984](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4984)
  `:where(html.dark, body.dark) .enhanced-select__option:focus`
- [app.css#L4990](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4990)
  `:where(html.dark, body.dark) .enhanced-select__option[aria-selected='true']`

## Exact Stay List By File

### Stay in `src/styles/app.css`

Equipment contextual selectors:

- [app.css#L2015](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2015)
  `.equipment-filter-controls .enhanced-select`
- [app.css#L2016](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2016)
  `.equipment-filter-controls .enhanced-select__trigger`
- [app.css#L2082](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2082)
  `.equipment-filters .enhanced-select`
- [app.css#L2094](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2094)
  `.equipment-filters .enhanced-select__trigger`
- [app.css#L3501](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3501)
  `.equipment-filter-controls .enhanced-select`
- [app.css#L3502](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3502)
  `.equipment-filter-controls .enhanced-select__trigger`
- [app.css#L3509](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3509)
  `.equipment-filters .enhanced-select`
- [app.css#L3517](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3517)
  `.equipment-filters .enhanced-select__trigger`
- [app.css#L3528](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3528)
  `.equipment-filters .equipment-filter-controls .enhanced-select__trigger`
- [app.css#L4070](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4070)
  `.equipment-filters .enhanced-select__trigger::after`
- [app.css#L4075](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4075)
  `:where(html[dir='rtl']) .equipment-filters .enhanced-select__trigger`
- [app.css#L4079](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4079)
  `:where(html[dir='rtl']) .equipment-filters .enhanced-select__trigger::after`

Reason:
- these encode equipment filter-row spacing, fixed widths, mobile stretch, local trigger sizing, and local arrow positioning
- they are page/layout contract, not component defaults

### Stay in `src/styles/reservations.css`

Reservations contextual selectors:

- [reservations.css#L80](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L80)
  `.reservations-filters-bar .enhanced-select`
- [reservations.css#L81](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L81)
  `.reservations-filters-bar .enhanced-select__trigger`
- [reservations.css#L159](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L159)
  `:where(html.dark, body.dark) .reservations-filters-bar .enhanced-select`
- [reservations.css#L160](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L160)
  `:where(html.dark, body.dark) .reservations-filters-bar .enhanced-select__trigger`
- [reservations.css#L180](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L180)
  `.reservations-filters-bar .enhanced-select`
- [reservations.css#L181](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L181)
  `.reservations-filters-bar .enhanced-select__trigger`

Reason:
- these encode reservations filter-bar matched-control styling, shared radius/min-height, shared shadow/background language, and mobile full-width behavior

## Required Import Order

Future stylesheet:
- `src/styles/enhanced-select.css`

Required import slot in `src/styles/app.css`:
- add `@import './enhanced-select.css';`
- place it after [app.css#L8](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L8)
  `@import './forms.css';`
- and before [app.css#L10](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L10)
  `@tailwind base;`

Why:
- keeps all stylesheet imports grouped at the top
- ensures the extracted component stylesheet loads before later app-local contextual selectors
- preserves the current architecture where app-local equipment overrides still come later in `app.css`
- reservations contextual selectors are already more specific, so they remain able to override by context even though they are imported earlier

Internal order required inside `src/styles/enhanced-select.css`:

1. base component block
2. RTL component block
3. dark component block

This preserves the existing base-before-dark cascade and keeps state selectors grouped with the component.

## Grouping Constraints

These selectors should only move if grouped together with their related state selectors:

- `.enhanced-select__trigger`
  Must move together with:
  `.enhanced-select__trigger:disabled`
  `.enhanced-select--disabled .enhanced-select__trigger`
  `.enhanced-select__trigger:hover`
  `.enhanced-select__trigger:focus-visible`
  `.enhanced-select[data-open='true'] .enhanced-select__trigger`
  `.enhanced-select__trigger::after`
  `.enhanced-select[data-open='true'] .enhanced-select__trigger::after`
  dark trigger/arrow/open/focus selectors

- `.enhanced-select__menu`
  Must move together with:
  `.enhanced-select[data-open='true'] .enhanced-select__menu`
  dark menu selector

- `.enhanced-select__option`
  Must move together with:
  `.enhanced-select__option + .enhanced-select__option`
  `.enhanced-select__option:hover`
  `.enhanced-select__option:focus`
  `.enhanced-select__option[aria-selected='true']`
  `.enhanced-select__option[aria-disabled='true']`
  dark option selectors

- RTL trigger rules
  Must move together with the base trigger/arrow rules so directional behavior does not split across files.

JS-state selectors confirmed safe to move unchanged:

- `.enhanced-select--disabled .enhanced-select__trigger`
- `.enhanced-select[data-open='true'] .enhanced-select__trigger`
- `.enhanced-select[data-open='true'] .enhanced-select__trigger::after`
- `.enhanced-select[data-open='true'] .enhanced-select__menu`
- `.enhanced-select__option[aria-selected='true']`
- `.enhanced-select__option[aria-disabled='true']`

Dark selectors confirmed safe to move unchanged:

- all selectors in the dark block at [app.css#L4949](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4949) through [app.css#L4993](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4993)

## QA Checklist For Extraction

- Equipment filters on dashboard:
  check status/category/sub enhanced-select width, spacing, mobile stretch, and arrow placement
- Reservations filters on dashboard:
  check date-range/status enhanced-select shape, width, matched-control appearance, and mobile full-width behavior
- Customer filters:
  check reservation/project filter selects still render correctly under generic component ownership
- Technician filters:
  check reservation/project filter selects still render correctly under generic component ownership
- Dark mode:
  check trigger, menu, option hover, selected option, disabled state, and focus-visible outline
- RTL:
  check trigger text alignment and arrow placement in both generic and equipment contexts
- Open state:
  check menu opening, arrow rotation, and selected option highlight

## Go / No-Go Recommendation

- Go for a future extraction batch

Conditions:
- move only the selectors in the exact move list
- leave all contextual equipment/reservations selectors in place
- keep the future import position and internal base-before-dark ordering exactly as specified

This is low-blast-radius enough to implement directly from this manifest.
