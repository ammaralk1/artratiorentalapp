import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('dashboard primitive adoption audit', () => {
  it('keeps dashboard on the in-place primitive adoption pattern for the extracted full family', () => {
    const dashboardPage = readSource('src/pages/dashboard.html');
    const equipmentPage = readSource('src/pages/equipment.html');
    const maintenancePage = readSource('src/pages/maintenance.html');

    expect(dashboardPage).toContain('class="ui-card ui-card--content glass-card subtab-scroll-card reservations-subtabs-container"');
    expect(dashboardPage).not.toContain('class="ui-card ui-card--content glass-card hidden lg:block dashboard-tabbar"');
    expect(dashboardPage).not.toContain('class="ui-card ui-card--content glass-card dashboard-tabbar p-3 lg:hidden"');
    expect(dashboardPage).toContain('href="clients.html"');
    expect(dashboardPage).toContain('href="crew.html"');
    expect(dashboardPage).toContain('href="equipment.html"');
    expect(dashboardPage).toContain('href="maintenance.html"');
    expect(equipmentPage).toContain('class="ui-button ui-button--outline btn btn-outline-primary" id="equipment-package-open-selector"');
    expect(maintenancePage).toContain('id="maintenance-equipment-barcode" class="ui-input form-control"');
    expect(dashboardPage).toContain('id="reports-range" class="ui-select form-select reports-filter-control"');
    expect(dashboardPage).toContain('class="ui-button ui-button--primary btn btn-primary btn-sm reports-action-btn" id="reports-preview-pdf"');
    expect(dashboardPage).toContain('textarea id="close-reservation-notes" class="ui-textarea form-control" rows="3"');
    expect(dashboardPage).toContain('class="ui-button ui-button--primary btn btn-primary" id="close-reservation-submit"');
  });

  it('records dashboard as the second full-family primitive adoption reference in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('`dashboard.html` now forms the second primitive-adoption baseline inside the extracted `full` family');
    expect(masterPlan).toContain('Phase 3 Dashboard Primitive Validation');
    expect(masterPlan).toContain('`dashboard.html?bypassAuth=1&fixture=dashboard`');
  });
});
