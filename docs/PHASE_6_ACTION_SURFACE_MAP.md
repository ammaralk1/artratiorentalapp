> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 6 Action Surface Map

## Major Tasks And Primary Pages
- System orientation and role-based routing: `home.html` is the primary page.
- Daily reservations work: `dashboard.html` is the primary page.
- Reservation calendar and reservation reports: `dashboard.html` is the primary page.
- Equipment inventory and maintenance: `dashboard.html` is the primary page.
- Customer master-data maintenance: `dashboard.html` is the primary page; `projects.html` is secondary/supporting.
- Technician master-data maintenance: `dashboard.html` is the primary page; `projects.html` is secondary/supporting.
- Project creation, project review, project reports, and template/PDF flows: `projects.html` is the primary page.
- Users/admin utilities, notifications, analytics, inquiries, and feedback: dedicated pages linked from `home.html`.

## Duplicated Entry Points
- Home exposes dashboard and projects through the greeting dropdown buttons and again through the main tabbar.
- Dashboard exposes project work through quick links and the add-project CTA, while the projects page separately acts as the full project workspace.
- Customer and technician management appear both on the dashboard and on the projects page.
- Project reports are reachable from the projects page subtabs and also from dashboard quick links.

## Primary Vs Secondary Surfaces
- Home should act as a workspace chooser, not as an operational workspace.
- Dashboard should be treated as the daily operations hub for reservations, equipment, maintenance, customers, and crew.
- Projects should be treated as the dedicated workspace for project planning, linked records, reports, and templates.
- Customers and technicians inside projects should remain supporting surfaces for project-linked record prep, not the default place for broad back-office maintenance.

## Ambiguity Summary
- Without helper text, operators must infer the difference between dashboard and projects from titles alone.
- Customers and technicians look like duplicate full management screens rather than primary/secondary surfaces.
- Home routes to the same broad destinations in multiple ways without explaining which workspace is best for which job.

## Low-Risk Cleanup Opportunities
- Clarify home as a workspace chooser with explicit dashboard/projects role descriptions.
- Clarify dashboard as the daily operations workspace and point project-specific planning/reporting work to the projects page.
- Preserve all existing links while making primary vs secondary surfaces more explicit in copy.

## Pass 2 Implemented Direction
- Home now explains the role of the dashboard versus the projects workspace.
- Dashboard now explains that it is the primary daily-operations surface, with the projects page reserved for planning, reports, and templates.
