# Phase 6 Workflow Map

## Scope
- Back-office workflow surfaces only.
- Reviewed: [src/pages/home.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/home.html), [src/pages/dashboard.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html), [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html), [src/scripts/home.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/home.js), [src/scripts/projects/app.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/projects/app.js), and related tab/filter wiring.
- Excluded: production, public template, and CSS-system redesign.

## Key Workflows
- Home orientation: operators land on the control center, see summary cards, then jump to dashboard or projects.
- Reservation operations: dashboard is the main operational workspace for creating reservations, reviewing lists, running reports, and checking the calendar.
- Project operations: projects page handles new project creation, existing-project review, project reporting, template/PDF work, and linked customer/crew master-data maintenance.
- Customer management: operators can manage customers from the dashboard and again from the projects page.
- Crew management: operators can manage technicians from the dashboard and again from the projects page.
- Equipment and maintenance: dashboard remains the main surface for equipment and maintenance operations.

## Main Entry Points
- Home cards and quick links route operators into dashboard and projects.
- Dashboard sidebar plus duplicated desktop/mobile tab bars route to customers, technicians, equipment, maintenance, reservations, and users.
- Projects page sidebar plus top tabs route between projects, customers, and technicians.
- Projects subtabs route between create, list, reports, and templates.

## Friction List
- Duplicate action surfaces: the same operator can reach similar work from home cards, home tab bars, dashboard tabs, dashboard quick links, projects sidebar links, and projects subtabs.
- Projects-page overload: one page mixes new-project entry, list/review, reports/export, template work, customer master data, and crew master data.
- Weak “next action” guidance: page titles describe the domain, but not which section should be used to create, monitor, report, or maintain related records.
- Inconsistent search/filter depth: customers have a simple search field, technicians have search plus role filter, equipment has several filters, reservations/reports have richer filter bars, and projects reports have their own filtering vocabulary.
- Dashboard vs detail-page ambiguity: customer and technician management exist on dashboard and also inside projects, but the page does not explain why both paths exist.

## Duplicated Action Surfaces
- Home: greeting CTA buttons plus desktop/mobile tab bars point to the same broad destinations.
- Dashboard: sidebar tabs plus desktop/mobile tab bars expose the same module switching.
- Projects: sidebar “reports” entry plus projects subtabs can both take the user to reporting context.
- Customers and technicians: editable management forms and searchable tables exist both inside dashboard and inside projects.

## High-ROI UX Improvement Candidates
- Add explicit orientation copy on the projects page explaining when to use Projects vs Customers vs Crew.
- Add explicit subtab guidance on the projects page explaining create vs list vs reports vs templates.
- Add lightweight section guidance on customer and technician tabs inside projects to make their role as supporting master-data sections clearer.
- In a later Phase 6 pass, review whether duplicated dashboard/home entry surfaces can be relabeled or grouped more clearly without removing paths.

## Low-Risk Cleanup Candidates
- Improve labels and helper copy before moving any controls.
- Clarify the projects page action hierarchy without altering routing or state.
- Reuse existing utility classes and translation patterns rather than introducing new components.
- Keep all existing tabs, buttons, and subtabs in place during the first UX batch.

## First Batch Recommendation
- Target [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html) and [src/scripts/translations/projects.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/translations/projects.js).
- Add bilingual orientation copy:
  - top-level guidance for Projects vs Customers vs Crew
  - subtab guidance for create/list/reports/templates
  - brief customer/crew section context hints
- Preserve all flows and controls exactly as they are.

## First Batch Implemented
- Added top-level workflow guidance on the projects page explaining the role of Projects vs Clients vs Crew.
- Added project-subtab guidance explaining create vs list vs reports vs templates without changing any buttons or routes.
- Added contextual helper text in the projects-page customer and crew sections so operators understand these are supporting record-management surfaces.
