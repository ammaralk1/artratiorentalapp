> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Reports Panel QA

## Executive Summary

This QA pass is focused on the reservations performance reports filter/export panel in [dashboard.html#L1405](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1405) after the visual hierarchy and dark-theme consistency pass in [reports.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css). The main goals are to confirm that the panel now reads as one coherent reporting surface in dark mode, that spacing/grouping feels intentional in RTL and narrow layouts, and that shared reports selectors have not caused visible spillover into other reports screens.

Current recommendation: `safe as-is`, with one shared-selector sanity check on the projects reports screen because `projects.html` also uses `.reports-header-card` and `.reports-custom-range`.

## Highest-Risk Checks

1. Reservations reports header/filter surface at [dashboard.html#L1407](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1407)
   Verify the outer header card and the inner filters surface now read as one olive/slate reporting form instead of a green shell containing a detached blue inner panel.

2. Quick chips and active filters rows at [dashboard.html#L1476](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1476) and [dashboard.html#L1477](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1477)
   These were visually detached before and now depend on shared grouping styles in [reports.css#L852](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L852) and [reports.css#L1931](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1931).

3. Presets row and export footer at [dashboard.html#L1478](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1478) through [dashboard.html#L1494](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1494)
   Highest risk for action hierarchy and layout balance.

4. Shared-selector spillover on projects reports at [projects.html#L593](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html#L593)
   This is the only obvious neighboring screen reusing part of the same reports panel language.

## Screen/State Checklist

### Header / Filter Surface

- Open the reservations performance reports screen at [dashboard.html#L1405](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1405) in dark mode.
- Verify the header lead block at [reports.css#L1403](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1403) looks like a calm shell inset, not a detached glossy card.
- Verify the filter surface at [reports.css#L381](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L381) visually belongs to the same card as the title area.
- Confirm borders, shadows, and surface contrast feel olive/slate-led rather than blue/navy-led.
- Confirm the icon/title/hint hierarchy still reads clearly and nothing feels flattened.

### Filter Row Grouping and Spacing

- Check the primary four-filter grid at [dashboard.html#L1422](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1422).
- Verify all four primary filters feel evenly grouped with consistent spacing and width.
- Confirm labels sit close enough to controls to read as single field units.
- Confirm there is no awkward dead space between the top filter row and the search/custom range rows.
- Confirm the panel does not look over-compressed or crowded after the spacing tightening.

### Search / Date / Custom Range

- Check the search row at [dashboard.html#L1460](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1460).
- Verify the search field spans cleanly and aligns with the panel width.
- Set the period filter to `custom` and check the custom date row at [dashboard.html#L1466](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1466).
- Verify the custom range row feels intentionally grouped and not like a floating extra block.
- Focus the search input and both custom date inputs.
- Confirm focus rings are visible, restrained, and consistent with the olive/slate control system.

### Quick Chips and Active Filters

- Trigger quick chips via the reports filters so content appears in [dashboard.html#L1477](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1477).
- Verify the quick chips row now reads as a grouped reporting utility strip rather than loose floating pills.
- Check default chip, hover chip, and active chip states.
- Confirm active chips feel intentionally emphasized and not overly blue.
- Trigger active filters so chips appear in [dashboard.html#L1476](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1476).
- Verify active filter chips visually harmonize with quick chips without becoming hard to distinguish from them.
- Confirm the inline style on `#reports-quick-chips` in [dashboard.html#L1477](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1477) is not creating odd spacing or top-margin conflicts after the CSS update.

### Preset Actions and Export Footer Hierarchy

- Check the presets row at [dashboard.html#L1478](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1478).
- Verify the template select and preset buttons feel like one grouped utility row.
- Confirm preset buttons now look secondary and supportive, not louder than the report form.
- Hover and focus each preset button and verify the hover treatment is restrained and consistent.
- Check the export footer at [dashboard.html#L1491](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1491).
- Verify the export button reads as the primary action and is clearly anchored to the bottom of the form.
- Confirm there is no awkward empty gap between the presets row and the export footer.

### RTL Checks

- Verify the entire panel on the Arabic/RTL path.
- Confirm labels, field alignment, and row grouping still feel intentional in RTL.
- Confirm the search field, preset row, and export footer do not feel left-biased after spacing changes.
- Confirm chips and active filters wrap naturally in RTL and do not look misordered.

### Narrow / Mobile Checks

- Test at tablet width first, then narrow mobile width.
- Confirm the top four filters wrap cleanly from four columns to two columns to one column.
- Confirm search, custom range, presets, and export footer still stack cleanly.
- Confirm the export button becomes full-width on small screens where intended.
- Confirm the grouped surfaces around custom range, active filters, quick chips, and presets do not create cramped vertical rhythm on small screens.

## Spillover / Shared-Selector Review

### Shared selectors touched by this batch

- [reports.css#L171](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L171)
  `.reports-header-card`
- [reports.css#L481](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L481)
  `.reports-custom-range`
- [reports.css#L526](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L526)
  `.reports-presets-controls`
- [reports.css#L548](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L548)
  `.reports-presets-actions`
- [reports.css#L889](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L889)
  `.reports-action-btn`

### Known reuse to sanity-check

- Projects reports screen at [projects.html#L593](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html#L593)
  This screen also uses `.reports-surface-card` and `.reports-header-card`.
- Projects reports custom range at [projects.html#L633](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html#L633)
  This reuses `.reports-custom-range`.

### What to verify on the projects reports screen

- Open the projects reports screen and inspect its header card.
- Confirm the header still looks intentional and not over-padded or oddly inset after the shared header-card changes.
- Trigger the custom range there and verify it still looks like an intentional grouped row.
- If the projects screen does not use presets or export footer controls with these classes, no extra action is needed for those selectors.

### Risk classification

- `safe as-is`
  if the reservations panel is cohesive in dark/RTL/mobile states and the projects reports screen still looks correct.
- `needs tiny stabilization patch`
  if only one shared selector, likely `.reports-header-card` or `.reports-custom-range`, looks slightly off on the projects reports screen.
- `needs later reports-subsystem follow-up`
  if multiple reports screens reveal that these selectors should have been split into reservations-specific and shared reports variants.

## Pass/Fail Criteria

### Pass

- Reservations reports header and inner filter area read as one coherent olive/slate reporting surface.
- Filter rows feel evenly grouped with cleaner spacing and less dead space.
- Search and custom-range sections feel attached to the same form.
- Quick chips and active filters feel grouped and visually related without overpowering the form.
- Preset buttons feel secondary and the export action feels primary.
- RTL layout remains clean and intentional.
- Mobile stacking remains usable and visually ordered.
- No visible regression appears on the projects reports screen where shared selectors are reused.

### Fail

- The reservations reports panel still looks like mixed themes stitched together.
- Any row feels detached, over-compressed, or visually unbalanced after the spacing changes.
- Quick chips or active filters look like floating leftovers rather than grouped controls.
- Preset actions compete visually with the export action or feel disconnected from the select.
- RTL alignment feels off.
- Mobile stacking creates cramped grouped boxes or awkward whitespace.
- Projects reports header/custom range shows obvious spillover regression from the shared selector changes.
