# Customer Header/Nav QA

## Executive Summary

This QA pass is focused on the dark customer header/navigation cluster after the olive-led visual unification in [app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css). The main verification target is not layout behavior; it is confirming that the customer-specific dark overrides now win cleanly over the injected fallback styles from [injectSidebarStyles.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/ui/injectSidebarStyles.js), especially for the mobile sidebar toggle and customer tab buttons.

Current risk level: `safe as-is`, with one later cleanup candidate in injected fallback styles if you want to reduce long-term override dependence.

## Highest-Risk Checks

1. Customer page dark header surface at [customer.html#L150](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/customer.html#L150)
   Verify the header no longer reads as a blue/navy gradient and instead matches the dark shell language used elsewhere.

2. Mobile sidebar toggle in dark mode at [customer.html#L153](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/customer.html#L153)
   This is the highest-risk injected-style conflict because [injectSidebarStyles.js#L47](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/ui/injectSidebarStyles.js#L47) through [injectSidebarStyles.js#L58](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/ui/injectSidebarStyles.js#L58) still define a blue dark fallback.

3. Customer tab buttons in dark mode at [customer.html#L350](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/customer.html#L350)
   This is the second highest-risk injected-style conflict because [injectSidebarStyles.js#L73](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/ui/injectSidebarStyles.js#L73) through [injectSidebarStyles.js#L74](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/ui/injectSidebarStyles.js#L74) still define a blue base for `.customer-primary-nav .tab-button`.

4. Active-tab handling in [customerPage.js#L308](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/customerPage.js#L308)
   Verify both `.tab-active` and `.active` produce the same visual result, since both classes are toggled at [customerPage.js#L314](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/customerPage.js#L314) and [customerPage.js#L315](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/customerPage.js#L315).

## Screen/State Checklist

### Customer Header Surface

- Open the customer page in dark mode and inspect the header wrapper at [customer.html#L150](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/customer.html#L150).
- Confirm the header surface reads as a calm shell surface, not a saturated blue gradient.
- Confirm the header border is subtle and olive/slate-compatible rather than bright indigo.
- Confirm the header shadow feels consistent with other dark shell cards and panels.
- Confirm backdrop blur still applies and the header does not look flat or washed out.

### Header Utility Buttons

- Check the mobile sidebar toggle at [customer.html#L153](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/customer.html#L153) in dark mode.
- If a ghost-style button is present in the customer header, check it alongside the mobile toggle.
- Verify default state:
  background uses the calmer tab-shell look, not the older blue/navy fallback.
- Verify hover state:
  hover uses restrained tab-hover emphasis, not a bright indigo glow.
- Verify keyboard focus:
  `:focus-visible` treatment is visible and intentional, with no double-outline or clashing fallback ring.
- Verify icon/label contrast remains clear in default and hover/focus states.

### Customer Tabs

- Inspect the customer tabbar at [customer.html#L350](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/customer.html#L350).
- Verify base tab buttons look neutral and integrated with the dark shell, not like blue pills.
- Verify hover state for both tabs:
  background should shift to the tab-hover token surface
  border emphasis should stay restrained
  there should be no heavy blue glow
- Verify focus-visible state:
  keyboard focus should match hover/active intent without clipping or double treatment.
- Verify active tab state:
  the active tab should have clear emphasis using the tokenized active background/border/shadow.
- Verify inactive tabs remain legible and clearly subordinate to the active tab.

### `.tab-active` and `.active` Coverage

- Confirm the default selected tab in markup at [customer.html#L354](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/customer.html#L354) renders correctly.
- Click between “reservations” and “projects” tabs and confirm the visual active style follows the selected tab.
- In DevTools, verify that a tab with `.tab-active` and a tab with `.active` render identically in dark mode.
- Confirm no state mismatch occurs if both classes are present on the active tab, since [customerPage.js#L314](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/customerPage.js#L314) and [customerPage.js#L315](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/customerPage.js#L315) toggle both.

### Mobile / Sidebar Checks

- On a narrow viewport, open the customer page and inspect the mobile sidebar toggle.
- Verify the button still aligns correctly in the header and does not pick up the older injected blue styling.
- Open and close the sidebar to confirm the toggle still behaves correctly and the visual state remains stable after interaction.
- Check the customer tabbar on a narrow viewport:
  wrapping, spacing, and pill sizing should remain unchanged
  only visual color treatment should differ

## Injected-Style Dependency Review

### What Is Injected

- [injectSidebarStyles.js#L47](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/ui/injectSidebarStyles.js#L47) through [injectSidebarStyles.js#L58](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/ui/injectSidebarStyles.js#L58)
  inject a blue/navy fallback for `.mobile-sidebar-toggle` and its dark hover state.
- [injectSidebarStyles.js#L73](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/ui/injectSidebarStyles.js#L73) through [injectSidebarStyles.js#L74](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/ui/injectSidebarStyles.js#L74)
  inject a blue/light base for `.customer-primary-nav .tab-button`.

### Why It Does Not Automatically Break This Batch

- The customer-specific dark overrides in [app.css#L4949](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4949) through [app.css#L4964](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4964) intentionally retheme header utility buttons inside `.customer-page .dashboard-header`.
- The customer-specific dark overrides in [app.css#L4976](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4976) through [app.css#L5033](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5033) intentionally retheme customer tabs inside both `.customer-primary-nav` and `.customer-tabbar`.
- Those selectors are more context-specific than the injected fallback and are expected to win visually.

### What To Watch For

- Any blue/navy pill background still visible on customer tabs in dark mode indicates the injected fallback is leaking through.
- Any bright indigo border or glow on the mobile toggle in dark mode indicates the injected fallback is still winning on hover/focus.
- Any difference between `.customer-primary-nav` and `.customer-tabbar` tabs indicates the override coverage is incomplete.

### Risk Summary

- `safe as-is`
  if the customer page shows olive/slate header/tabs consistently in dark mode and no fallback blue state is visible.
- `needs tiny stabilization patch`
  if hover/focus on the mobile toggle or tab buttons still shows injected blue treatment in one state only.
- `needs later injected-style cleanup`
  if the customer page is correct but the fallback file remains an ongoing source of color drift and repeated local overrides.

## Pass/Fail Criteria

### Pass

- Header surface visually matches the dark shell system.
- Mobile toggle default, hover, and focus-visible states no longer read as a blue/navy control.
- Customer tab buttons have a neutral dark base and restrained hover treatment.
- Active tab styling is consistent and obvious.
- `.tab-active` and `.active` render identically.
- Narrow/mobile view keeps the same layout and interaction behavior.
- No visible conflict appears between `app.css` customer overrides and injected fallback styles.

### Fail

- Header still looks like a separate blue/navy gradient block.
- Mobile toggle still shows injected blue dark styling in default or hover/focus.
- Customer tabs still show blue pill surfaces or inconsistent hover/active behavior.
- `.tab-active` and `.active` do not render the same.
- Mobile layout or tab wrapping regresses.
- Customer tabbar and customer primary-nav do not match visually in dark mode.
