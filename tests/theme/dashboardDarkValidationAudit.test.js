import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('dashboard dark validation audit', () => {
  it('records the dedicated dashboard full-family dark checklist in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('Dashboard Full-Family Dark Validation Checklist');
    expect(masterPlan).toContain('Validate first paint and post-auth reveal on `dashboard.html`');
    expect(masterPlan).toContain('Validate the maintenance surface in dark mode');
    expect(masterPlan).toContain('`#closeMaintenanceModal` and `#maintenanceReportModal`');
    expect(masterPlan).toContain('Validate the reservations reports surface separately because it is the densest dashboard area');
    expect(masterPlan).toContain('`#reports-reservations-table`');
    expect(masterPlan).toContain('Validate the reservations calendar surface in dark mode');
    expect(masterPlan).toContain('`#calendarReservationModal`');
    expect(masterPlan).toContain('Validate reservation-management modals in dark mode');
    expect(masterPlan).toContain('`#reservationDetailsModal` and `#closeReservationModal`');
    expect(masterPlan).toContain('Validate the mobile drawer-open state on narrow width');
  });

  it('keeps the migrated dashboard page aligned with the checklisted heavy surfaces', () => {
    const dashboard = readSource('src/pages/dashboard.html');
    const maintenance = readSource('src/pages/maintenance.html');

    [
      '<!-- @include "./_partials/full-manager-shell.html"',
      'data-slot="sidebarStats"',
      'data-slot="sidebarTabs"',
      'data-slot="sidebarLinks"',
      'data-slot="greetingPanel"',
      'data-slot="mainContent"',
      'data-slot="afterShell"',
      'data-tab="reservations-tab"',
      'id="sub-tab-trigger-calendar-tab"',
      'id="reports-tab"',
      'id="calendarReservationModal"',
      'id="reservationDetailsModal"',
      'id="closeReservationModal"',
      'id="reports-reservations-table"',
      'id="calendar-panel"',
      'fullcalendar@6.1.8/index.global.min.js',
      'xlsx@0.18.5/dist/xlsx.full.min.js',
    ].forEach((marker) => {
      expect(dashboard).toContain(marker);
    });

    [
      'id="maintenance-tab"',
      'id="closeMaintenanceModal"',
      'id="maintenanceReportModal"',
    ].forEach((marker) => {
      expect(maintenance).toContain(marker);
    });
  });
});
