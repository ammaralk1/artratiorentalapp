# Claude Takeover Audit

## Understanding of Current Project State

This is a serious internal back-office operational application for a production/rental company.
It handles: dashboard, projects, reservations, customers, technicians/crew, equipment, maintenance,
reports, and internal admin pages.

The app has been through multiple staged improvement phases (Phases 4–7 plus brand application passes).
Each phase was deliberately narrow-scope and non-destructive. Production has not been touched.
Real local backup data has been restored into an isolated environment for runtime verification.

---

## What Has Already Been Done

### Environment and Safety
- Isolated local workflow established
- Production untouched throughout all passes
- Staging prep created
- Tests and smoke flow stabilized against real local backup data

### Runtime / Data Fixes
- Real backup safely restored into isolated local environment only
- Reservations endpoint blocker found and fixed (`GET /api/reservations/` returns 200)
- Smoke/tests/runtime validation on real local backup data are green

### Structural Stabilization (Phase 5)
- Bootstrap ownership clarified and legacy overlapping paths reduced
- `src/scripts/main.js` reduced to a compatibility shim
- `technicians.js` and `customers.js` use explicit init boundaries with compatibility wrappers
- Projects page ownership clarified

### Workflow / UX Refinement (Phase 6)
- Client-side pagination added for equipment, customers, and technicians
- Tests and smoke remained green throughout

### Styling System Foundation (Phase 7)
- Shared style ownership clarified
- Duplicate stylesheet loading reduced
- Semantic back-office tokens introduced in `src/styles/core.css` (`--bo-*` namespace)
- Shared primitives introduced for pagination, support text, management surfaces, empty states, heading stacks

### Brand Application Work
- **Pass 1**: Art Ratio brand tokens applied to shared primitives (management surfaces, pagination, empty states)
- **Pass 2**: Shared shell/card wrappers and tab containers moved onto brand-facing shell/tab tokens
- **Corrective Alignment Pass**: Rebalanced shared shell and tab tokens after visual review showed residual old-blue dominance in shells, active/hover tab states, sidebar chrome, and page background
  - Shell, page background, tab shell, active/hover states all re-tokenized
  - Fallback sidebar CSS and `injectSidebarStyles.js` aligned
  - Old blue no longer dominates the navigation/tab/shell layer
- **Content Surface Pass**: Inner content surfaces (summary cards, table wrappers, form controls, selects, enhanced selects) moved onto content/table/control semantic tokens

---

## Current Stage

**Corrective Brand / Core Content Surface Alignment — Pass 2**

The shell/navigation/tab outer layer is now visually aligned with the Art Ratio brand system.
The main remaining problem is that certain deeper/inner content surfaces still carry old-blue styling
from the original template, creating a visible split between the newly aligned outer shell and
older blue inner content.

---

## Current Visual Problem

**Pattern**: brand-aligned outer shell + older blue inner specialized content

The outer navigation layer (tabs, sidebar, shell wrappers, summary cards, management tables) was addressed
in the previous content-surface pass. However, the following inner content layers still read as old-blue:

### Highest-impact remaining mismatches (confirmed by source analysis):

**`src/styles/tabs.css`**
- `reservations-subtabs-container`, `tech-subtabs-container`, `dashboard-subtabbar` sub-tab INACTIVE state:
  - border still `rgba(76, 110, 245, 0.22)` — electric blue family
  - background still `rgba(236, 242, 255, 0.9)` — blue-tinted
  - box-shadow still `rgba(76, 110, 245, 0.14)` — blue glow
- Sub-tab ACTIVE state — most visible regression:
  - `background: linear-gradient(140deg, rgba(76, 110, 245, 0.82), rgba(93, 139, 255, 0.78))` — full electric blue gradient
  - This directly contradicts the brand-aligned main tab active state which uses deep green/slate
- `.positions-list-box .table-responsive` — old blue tinted wrapper
- `.positions-table thead th` — old blue-family gradient header
- `.positions-table tbody tr:hover` — old blue hover
- `.crew-position-add-btn` hover/focus/active — old blue shadow glows
- Scrollbar thumbs — `rgba(76, 110, 245, 0.25/0.35)`
- `.sub-tab-button:not(.tab)` — blue-tinted background and border
- `.sub-tab-button.active:not(.tab)` — `var(--clr-primary)` which is still `#4c6ef5` blue

**`src/styles/forms.css`**
- `.management-form-box` — border `rgba(76, 110, 245, 0.12)`, dark-mode: `rgba(59, 130, 246, 0.18)` border and `rgba(24, 33, 59, 0.92)` blue-navy background
- `.management-form-icon` — blue gradient background on both light and dark modes
- `.suggestion-item:hover` — `rgba(76, 110, 245, 0.18)` background
- `.management-search-bar .form-control:focus` and `#customers-tab #search-customer-input:focus` — blue focus ring
- `management-form-grid textarea` — blue border, blue-tinted background, blue placeholder, blue focus

**`src/styles/maintenance.css`**
- `.maintenance-form-grid .maintenance-priority-field #maintenance-priority:focus` — blue focus
- `.maintenance-status-filter .form-select:focus` — blue focus
- `.maintenance-issue-textarea` — blue border, blue-tinted gradient background, blue placeholder, blue focus
- `.maintenance-form-grid #maintenance-equipment-search:focus` — blue focus
- `.maintenance-suggestions` dropdown — blue border
- `.maintenance-selected-item` — `rgba(76, 110, 245, 0.08)` blue background
- `.maintenance-summary__item` selected state — blue background
- `.maintenance-breakdown-box` — blue tinted background/border
- `.maintenance-tag-chip` — blue tinted

**`src/styles/app.css`**
- `.projects-table thead th` — `rgba(76, 110, 245, 0.06)` background, `rgba(76, 110, 245, 0.15)` border
- `.projects-table tbody tr:hover` — `rgba(76, 110, 245, 0.08)`
- `.project-focus-card` border — `rgba(76, 110, 245, 0.1)`
- `.equipment-details-field` borders — old blue
- `.technician-badge` — entirely old blue (`rgba(76, 110, 245, 0.82)`)
- `.customer-page .customer-primary-nav .tab-button:hover` — old blue box-shadow
- `.btn-close:hover` / `.modal-close-btn:hover` — old blue border/color/outline

---

## Next Safest Shared-Surface Targets

**Batch 1 — highest visual impact, shared across multiple pages:**
1. `tabs.css` sub-tab active/inactive states and positions table (affects dashboard, projects, reservations, technicians)
2. `forms.css` management-form-box, icon, and focus states (affects dashboard, customer, technician, projects)
3. `maintenance.css` focus states and issue textarea (affects maintenance tab on multiple pages)

**Batch 2 — moderate impact, more specialized:**
4. `app.css` projects-table, project-focus-card, technician-badge, btn-close, equipment-details-field

**Deferred:**
- Calendar toolbar active state (specialized component, business-semantic coloring)
- `index.css` users-page table and logs (less frequently loaded path, lower priority)
- Status color systems for badges (operational semantics, not cosmetic alignment)
- Print/export stylesheets

---

## Implementation Constraints

- Use semantic tokens (`--bo-color-*`) throughout
- Do NOT broadly redesign layouts
- Do NOT change workflows
- Do NOT introduce page-by-page ad hoc recolor
- Do NOT regress the fixed sidebar/theme behavior
- Preserve operational status colors (success/warning/danger badges)
