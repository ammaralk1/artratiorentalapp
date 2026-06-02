> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Enhanced Select Post-Extraction QA

Scope:
- `src/styles/app.css`
- `src/styles/enhanced-select.css`
- `src/styles/reservations.css`
- `src/scripts/ui/enhancedSelect.js`
- active runtime flows using enhanced-select-backed `select.form-select`

Purpose:
- verify that extracting pure enhanced-select component rules into `src/styles/enhanced-select.css` caused no visual or interaction regressions
- verify that equipment and reservations contextual overrides still win where intended

## Executive Summary

The highest-risk areas are the flows that rely on contextual overrides rather than the extracted component baseline:

1. equipment filters on dashboard
2. reservations filters on dashboard

The lower-risk validation targets are:

3. customer filters
4. technician filters

Those lower-risk screens matter because they should now validate that the extracted component stylesheet works correctly without dedicated local enhanced-select overrides.

## Highest-Risk Areas

### 1. Dashboard equipment filters

Location:
- [dashboard.html#L894](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L894)

Why highest risk:
- equipment uses the strongest local layout contract
- fixed desktop width, mobile stretch, local trigger height, and equipment-specific arrow/RTL handling all remain in `app.css`

### 2. Dashboard reservations filters

Location:
- [dashboard.html#L1383](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1383)

Why high risk:
- reservations uses local wrapper + trigger harmonization with adjacent filter controls
- local width, shared radius/min-height, dark contextual styling, and mobile full-width behavior remain in `reservations.css`

### 3. Customer filters

Location:
- [customer.html#L374](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/customer.html#L374)

Why medium risk:
- no local enhanced-select-specific CSS
- should now prove the extracted component baseline is sufficient in a generic filters-bar

### 4. Technician filters

Location:
- [technician.html#L315](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/technician.html#L315)

Why medium risk:
- same reason as customer filters
- good validation for generic extracted behavior across a second page context

## Screen-By-Screen Checklist

### Equipment filters

Screen:
- dashboard equipment tab

Controls:
- status filter
- category filter
- subcategory filter

Check:
- enhanced-select trigger renders with expected desktop width
- trigger height matches equipment row rhythm
- zero-margin alignment inside `.equipment-filter-controls`
- menu opens under the correct trigger
- arrow stays correctly aligned in LTR
- filter row still spaces evenly with sibling controls
- when options are repopulated, trigger label updates correctly
- category/sub/status refresh still works after dynamic option updates

### Reservations filters

Screen:
- dashboard reservations tab

Controls:
- date-range filter
- status filter

Check:
- trigger shape matches adjacent reservation filter inputs
- trigger width/min-width matches local reservations filter-bar behavior
- shared background/border/shadow language still matches sibling controls
- menu opens in correct position without clipping
- dark contextual reservations overrides still apply
- filter bar still wraps correctly at smaller widths

### Customer filters

Screen:
- customer page reservations and projects sections

Controls:
- reservation date-range filter
- reservation status filter
- project date-range filter
- project status filter

Check:
- extracted component baseline renders correctly with no local enhanced-select CSS
- trigger width remains appropriate for `w-auto`
- menu opens in correct place
- selected option styling and dark mode still look correct

### Technician filters

Screen:
- technician page reservations and projects sections

Controls:
- reservation date-range filter
- reservation status filter
- project date-range filter
- project status filter

Check:
- extracted component baseline renders correctly with no local enhanced-select CSS
- trigger width remains appropriate for `w-auto`
- menu opens in correct place
- selected option styling and dark mode still look correct

## State-By-State Checklist

### Default

Check:
- trigger background, border, text color, and shadow
- trigger min-height and padding
- menu hidden by default
- arrow icon visible and centered

### Hover

Check:
- trigger hover background and border change
- option hover background and text contrast

### Focus-visible

Check:
- keyboard tab to trigger
- focus ring appears
- focus outline offset remains correct
- no double outline or clipped outline

### Open

Check:
- click or keyboard-open the trigger
- menu becomes visible with correct position
- arrow rotates
- menu is layered above surrounding content

### Selected option

Check:
- currently selected option is highlighted
- after choosing a new option, trigger label updates
- newly selected option gets selected styling on reopen

### Disabled

Check:
- any disabled enhanced select, if available in current flows, shows reduced opacity and blocked interaction
- disabled trigger should not open menu

### Dark mode

Check:
- trigger background/border/text still use dark component styling from `enhanced-select.css`
- menu and selected option colors still match pre-extraction appearance
- reservations dark contextual override still wins where intended

### RTL

Check:
- trigger text alignment flips correctly
- arrow moves to the correct side
- equipment-specific RTL arrow adjustment still wins over generic RTL rule

## Mobile / RTL / Dark Checks

### Mobile / narrow widths

Equipment:
- trigger stretches full width on mobile
- height compresses to the shorter mobile rhythm
- stacked controls do not inherit stale desktop flex-basis

Reservations:
- filter-bar enhanced selects stretch to full width on mobile
- wrapper and trigger still match sibling filter inputs

Customer / technician:
- generic filters do not overflow narrow containers
- menu still opens on-screen

### Dark mode

Check in all four flows:
- trigger colors
- menu shell
- option hover
- selected option state
- focus-visible outline

### RTL

Check in equipment and one generic flow:
- arrow placement
- text alignment
- menu anchoring feels correct

## Pass / Fail Criteria

### Pass

- extracted component screens match prior behavior
- local equipment and reservations overrides still visibly win where intended
- customer and technician filters work correctly with component baseline only
- no broken menu positioning, arrow alignment, width regression, or state regression is found

### Fail

Any of the following is a fail:

- equipment filter triggers lose fixed desktop width or mobile stretch behavior
- reservations filter triggers no longer match adjacent filter inputs
- menu opens in the wrong position or clips
- arrow alignment breaks in LTR or RTL
- dark mode loses trigger/menu/selected-option styling
- keyboard focus-visible ring disappears or looks clipped
- selected option no longer updates trigger label correctly

## Risk-Based Test Order

1. Dashboard equipment filters
2. Dashboard reservations filters
3. Customer filters
4. Technician filters
5. Repeat one equipment flow and one reservations flow in dark mode
6. Repeat one equipment flow in RTL
7. Repeat one narrow/mobile-width check for equipment and reservations
