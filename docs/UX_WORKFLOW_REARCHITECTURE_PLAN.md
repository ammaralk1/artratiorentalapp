# UX Workflow Re-Architecture Plan

Last updated: 2026-05-28
Status: Active, partially implemented

## Current Status Update - 2026-05-28

This roadmap is no longer only proposed. Several workflow batches have been implemented locally and visually approved. The Projects workspace cleanup decision is now closed, Clients/Crew extraction is implemented, Equipment/Maintenance extraction is validated locally, and the Operations route rename is implemented locally.

Completed and approved locally:
- Login simplification and Home/Start cleanup.
- Booking management cleanup: creation merged into the booking list, active/archive sections, mobile improvements, quick client creation, equipment selection method cleanup, calendar/report relocation decisions, and notification trigger changes.
- Project creation/edit workflow cleanup: creation merged into project list, active/new/archive layout, quick client creation, direct equipment/package/crew assignment inside projects, position-first crew assignment, project summary card, project edit modal equipment/crew editing, package pricing/quantity fixes, availability/quantity blocking alignment, English/Arabic UI cleanup, and mobile edit-modal overflow fixes.
- Project-linked reservations now behave as read-only from the reservations side; edits are owned by the project workflow.
- Local old project package-child duplication was repaired with `backend/tools/repair_project_reservation_packages.php --apply`.
- Project Reports have been moved out of `projects.html` into Admin Tools as `src/pages/project-reports.html`, preserving the project report calculations, filters, export path, and report visual shell.
- Templates are intentionally staying inside Projects because they are project document/user tools tied to project deliverables, not system administration.
- Clients and Crew now live on standalone management pages: `src/pages/clients.html` and `src/pages/crew.html`.
- Equipment and Maintenance now live on standalone management pages: `src/pages/equipment.html` and `src/pages/maintenance.html`.
- Operations now has the canonical route `src/pages/operations.html`; `src/pages/dashboard.html` is retained only as a temporary compatibility alias that redirects legacy visits to Operations.
- Internal reservation-operation links now point to `operations.html`, while old resource hashes such as `dashboard.html#customers-tab`, `dashboard.html#technicians-tab`, `dashboard.html#equipment-tab`, and `dashboard.html#maintenance-tab` remain compatibility redirects.

Closed on `projects.html`:
- Project Reports no longer remain as a top-level project workspace tab.
- Templates remain in Projects by product decision because they generate and manage project documents.
- Project top-level navigation is now focused on My Projects and Templates.

Still open after Batch 6:
- Batch 7 is deferred as a later enhancement. It should start only if production usage shows slow workflow loads, repeated availability/conflict round trips, or a clear need for backend aggregate endpoints.
- Production/release readiness remains tracked outside this roadmap.

## Purpose

The current application is visually stabilized, but the product workflow still feels circular because core resources are exposed in several places as repeated tabs. The biggest issue is that `dashboard.html` is named and presented as a dashboard while it actually behaves as an operations workspace for reservations, customers, equipment, maintenance, technicians, calendar, and reports.

This plan defines the target information architecture before backend migration or production release work continues.

## Audit Findings

### 1. `dashboard.html` is not a dashboard

Current role:
- Customers
- Equipment
- Maintenance
- Technicians
- Reservations
- Reservation calendar
- Reservation reports

Target role:
- Operations / Reservations workspace only.

Reason:
The page is the operational booking center. Calling it "dashboard" makes users expect summary/status first, while the real job is reservation execution.

### 2. `home.html` is a launcher, not the main dashboard

Current role:
- Workspace selection
- Summary cards
- Links into reservation, project, analytics, messages, feedback, users, and equipment request surfaces

Target role:
- Start / Command Center.

Reason:
This page should answer "What do I need to do next?" rather than duplicate every workspace tab.

### 3. Resource tabs are repeated across pages

Repeated navigation exists across:
- `home.html`
- `dashboard.html`
- `projects.html`
- `customer.html`
- `technician.html`
- `notifications.html`
- shared shell partials

Examples:
- Clients/customers now link to `clients.html`; old `dashboard.html#customers-tab` requests are compatibility-redirected.
- Technicians now link to `crew.html`; old `dashboard.html#technicians-tab` requests are compatibility-redirected.
- Equipment and Maintenance now link to `equipment.html` and `maintenance.html`; old dashboard resource hashes are compatibility-redirected.
- Projects link back to `operations.html#reservations-tab`.
- Reservation edit and linked project flows route through `operations.html`.

Impact:
Users can reach the same object through multiple mental models: as a dashboard tab, project helper tab, detail page, or sidebar link.

### 4. Projects are mostly correct but overloaded

Current role:
- Project creation
- Project list
- Reports
- Templates
- Customer records
- Technician records
- Linked reservation handoff

Target role:
- Projects workspace only.

Customers and technicians should be lookup/selection support inside projects, not full top-level project tabs.

### 5. Detail pages are useful but framed like dashboard tabs

Current:
- `customer.html`
- `technician.html`

Target:
- Client profile
- Crew member profile

These should be profile/detail pages with contextual actions:
- View reservations
- View projects
- Create reservation for this client
- Assign crew member

They should not look like mini dashboard tab hubs.

### 6. Backend API is not the first problem

The backend endpoints are already mostly resource-oriented:
- customers
- technicians
- equipment
- maintenance
- reservations
- projects
- equipment requests
- analytics
- users

The current pain is front-end workflow composition and naming. Backend API changes should come later only where a workflow needs an orchestration endpoint.

## Target Product Map

### Primary Navigation

1. Start
2. Operations
3. Projects
4. Clients
5. Crew
6. Equipment
7. Maintenance
8. Requests
9. Admin

### Start

Route now:
- `home.html`

Future visible name:
- Start
- Arabic: `مركز العمل` or `الرئيسية`

Purpose:
- Show the next important actions and high-level status.

Primary actions:
- New reservation
- New project
- Review today's schedule
- Review incoming equipment requests
- Open messages/feedback
- Open admin tools

This page should not contain the full operational tab list.

### Operations

Route now:
- `dashboard.html`

Future visible name:
- Operations
- Arabic: `إدارة العمليات`

Possible future route:
- `operations.html`

Purpose:
- Own the reservation execution workflow.

Sections:
- New reservation
- Reservations list
- Calendar
- Reservation reports

Allowed contextual links:
- Open client profile
- Open crew profile
- Open linked project
- Open equipment item

Not primary tabs long term:
- Customers
- Technicians
- Equipment
- Maintenance

### Projects

Route now:
- `projects.html`

Visible name:
- Projects
- Arabic: `إدارة المشاريع`

Purpose:
- Own project planning, financial tracking, linked reservations, and project execution.

Sections:
- New project
- Active projects
- Archive
- Templates for project deliverable documents and project-specific saved versions

Moved out of top-level Projects navigation:
- Project reports

Project reports destination:
- Admin Tools reporting area at `src/pages/project-reports.html`, because report visibility is expected to become admin-only and should not sit beside day-to-day project creation/list work.

Remove as top-level project tabs:
- Customers
- Technicians

Replace them with:
- Client lookup
- Crew lookup
- Quick create client
- Quick create crew member
- Links to full Clients/Crew workspaces

### Clients

Route now:
- `clients.html`
- `customer.html?id=...`

Future route:
- `clients.html`
- `client.html?id=...`

Purpose:
- Own client records and client history.

Sections:
- Client list
- Client profile
- Reservations for client
- Projects for client
- Contact/commercial details

### Crew

Route now:
- `crew.html`
- `technician.html?id=...`

Future route:
- `crew.html`
- `crew-member.html?id=...`

Purpose:
- Own crew records, positions, workload, reservation assignments, and project assignments.

Sections:
- Crew list
- Positions
- Crew profile
- Availability/workload
- Reservation/project history

### Equipment

Route now:
- `equipment.html`

Purpose:
- Own equipment inventory and availability.

Sections:
- Inventory
- Availability
- Categories/packages
- Equipment history

### Maintenance

Route now:
- `maintenance.html`

Purpose:
- Own maintenance tickets and asset health.

Sections:
- Open maintenance
- Urgent maintenance
- Completed maintenance
- Equipment maintenance history

### Requests

Route now:
- `equipment-requests.html`
- `contact-inquiries.html`
- `feedback-submissions.html`

Future visible group:
- Requests / Inbox
- Arabic: `الطلبات الواردة`

Purpose:
- Own inbound public/customer communication.

Sections:
- Equipment requests
- Contact messages
- Feedback

### Admin

Current routes:
- `users.html`
- `notifications.html`
- `site-analytics.html`

Purpose:
- Own admin-only system controls and monitoring.

Sections:
- Users
- Notifications
- Site analytics
- System settings later if needed

## Target User Flows

### New Reservation

1. Start or Operations
2. Create reservation
3. Select or create client
4. Select date/time
5. Select equipment
6. Assign crew
7. Price/quote/payment
8. Save reservation
9. Open confirmation, quote, calendar, or linked project

### New Project

1. Start or Projects
2. Create project
3. Select or create client
4. Add project basics and financial details
5. Save project
6. Optionally create linked reservation
7. Complete operational details in Operations
8. Return to project details

### Incoming Equipment Request

1. Requests
2. Review request details
3. Mark item availability
4. Message client
5. Confirm/cancel request
6. Optionally convert to reservation or project later

### Client Lookup

1. Clients
2. Search client
3. Open profile
4. Review reservations/projects
5. Start a contextual action

### Crew Assignment

1. Crew or Operations
2. Review crew availability/history
3. Assign to reservation/project
4. Confirm workload impact

## Implementation Strategy

### Batch 0: Naming and Navigation Contract

Goal:
Make the mental model correct without physically moving large modules yet.

Changes:
- Rename visible "Dashboard" labels to "Operations".
- Rename home branding to "Start" or "Command Center".
- Keep `dashboard.html` route temporarily for compatibility.
- Add a central navigation map used by shell partials and home links.
- Update tests that assert visible labels only after visual approval.

Risk:
Low. Mostly copy/navigation changes.

### Batch 1: Home Becomes Start

Goal:
Remove duplicated dashboard-style tabs from `home.html`.

Changes:
- Show action cards by workflow, not resource tabs.
- Keep summary cards.
- Keep manager/admin cards, grouped under Requests and Admin.
- Link primary actions to specific workflow entry points.

Risk:
Low to medium. Visual review needed.

### Batch 2: Operations Cleanup

Goal:
Make `dashboard.html` feel like reservation operations.

Changes:
- Reframe page header, sidebar labels, and workspace hints.
- Make Reservations the primary/default workflow.
- Demote customers, technicians, equipment, and maintenance into resource shortcuts until extracted.
- Preserve old hashes for compatibility.

Risk:
Medium because tab preference and deep-link behavior currently depend on `dashboardTab`.

### Batch 3: Project Workspace Cleanup

Goal:
Remove customer/technician/report duplication from project navigation and keep Projects focused on project execution.

Changes:
- Keep project creation and list/archive as the primary workspace.
- Keep direct client/crew/equipment/package selection inside the project form/edit modal.
- Keep project-linked reservations visible but read-only outside the project edit workflow.
- Remove the project reports tab from the project workspace and move it to the approved management/admin reporting location. Completed on 2026-05-22 as `src/pages/project-reports.html`.
- Replace project-level customer/technician tabs with lookup panels, quick-create modals, or links.
- Keep Templates in Projects as project deliverable/user tools, not Admin Tools.

Risk:
Medium. Must preserve project creation and linked reservation flows.

Current status:
- Closed for the project workspace cleanup scope. Project creation/edit and linked-reservation behavior are approved locally, Project Reports have moved to Admin Tools, Templates stay in Projects, and the remaining project top-level navigation is My Projects plus Templates.
- Batch 4 initial extraction is implemented locally: Clients and Crew now have standalone management pages, Operations links to those pages, and legacy dashboard hash routes redirect for compatibility.

### Batch 4: Extract Clients and Crew

Goal:
Move resource management out of Operations.

Changes:
- Created `clients.html` from the existing customers tab.
- Created `crew.html` from the existing technicians tab.
- Kept `customer.html` and `technician.html` as profile pages initially.
- Added compatibility redirects from old dashboard hashes.

Risk:
Reduced after extraction. Remaining risk is visual/functional QA for client and crew standalone pages and any hidden links still pointing at old dashboard hash routes.

### Batch 5: Extract Equipment and Maintenance

Goal:
Move asset management out of Operations.

Changes:
- Created `equipment.html`.
- Created `maintenance.html`.
- Preserved the existing equipment and maintenance surfaces on standalone routes; explicit cross-page maintenance-history linking remains a follow-up if needed.
- Kept compatibility from old dashboard hashes.

Risk:
Closed for the extraction scope after local validation. Remaining equipment availability behavior is normal runtime business logic, not a route extraction blocker.

### Batch 6: Route Rename and Compatibility

Goal:
Make routes match the final product language.

Changes:
- Added `operations.html` as the canonical reservation operations route.
- Kept `dashboard.html` as a redirect/alias until production is stable.
- Added route compatibility tests.
- Updated internal links to use `operations.html`.

Risk:
Implemented locally. Remaining risk is only final visual/user acceptance before removing the legacy dashboard alias in a later release.

### Batch 7: Workflow API Enhancements

Status:
Deferred as a later enhancement.

Goal:
Add backend support only where UX needs fewer round trips.

Possible additions:
- Reservation workflow summary endpoint.
- Project linked-reservation orchestration endpoint.
- Client profile aggregate endpoint.
- Crew workload aggregate endpoint.
- Equipment availability aggregate endpoint.

Risk:
Medium. Do not start until there is a real performance or consistency need from production/staging usage.

## Recommended Next Step

Treat the product workflow re-architecture roadmap as complete for the current release scope, with Batch 7 parked as optional future API optimization.

1. Keep `operations.html` as the canonical route for reservation operations.
2. Keep `dashboard.html` as a temporary compatibility alias until production has been stable.
3. Move to the next active roadmap: production/release readiness and data migration preparation.

Do not reopen the approved project creation/edit workflow unless a regression appears.
