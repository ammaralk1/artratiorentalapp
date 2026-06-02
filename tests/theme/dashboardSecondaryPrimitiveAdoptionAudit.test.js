import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('dashboard secondary primitive adoption audit', () => {
  it('keeps dashboard on the in-place secondary primitive adoption pattern for the extracted full family', () => {
    const dashboardPage = readSource('src/pages/dashboard.html');
    const clientsPage = readSource('src/pages/clients.html');
    const crewPage = readSource('src/pages/crew.html');
    const equipmentPage = readSource('src/pages/equipment.html');
    const maintenancePage = readSource('src/pages/maintenance.html');

    expect(dashboardPage).toContain('class="ui-badge ui-badge--soft badge-soft"');
    expect(dashboardPage).toContain('class="ui-tabs ui-tabs--vertical tab-buttons tab-buttons-vertical" role="tablist"');
    expect(dashboardPage).toContain('href="clients.html"');
    expect(dashboardPage).toContain('href="crew.html"');
    expect(dashboardPage).toContain('href="equipment.html"');
    expect(dashboardPage).toContain('href="maintenance.html"');
    expect(dashboardPage).not.toContain('id="customers-tab"');
    expect(dashboardPage).not.toContain('id="technicians-tab"');
    expect(dashboardPage).not.toContain('id="equipment-tab"');
    expect(dashboardPage).not.toContain('id="maintenance-tab"');
    expect(clientsPage).toContain('class="users-table-wrapper overflow-x-auto embedded-management-table-shell"');
    expect(clientsPage).toContain('class="ui-table table table-hover users-table surface-table embedded-management-table customer-table align-middle"');
    expect(crewPage).toContain('class="ui-badge ui-badge--soft badge-soft" id="positions-count"');
    expect(crewPage).toContain('class="ui-table table table-hover users-table surface-table positions-table align-middle"');
    expect(crewPage).toContain('class="ui-tabs sub-tab-buttons tabs tabs-boxed" role="tablist" aria-orientation="horizontal"');
    expect(crewPage).toContain('class="ui-tab sub-tab-button tab tab-active tech-subtab-button"');
    expect(equipmentPage).toContain('class="users-table-wrapper overflow-x-auto embedded-management-table-shell equipment-package-items-table-wrapper"');
    expect(equipmentPage).toContain('class="ui-table table table-hover users-table surface-table embedded-management-table align-middle equipment-packages-table" id="equipment-packages-table"');
    expect(maintenancePage).toContain('class="users-table-wrapper overflow-x-auto embedded-management-table-shell maintenance-table-wrapper"');
    expect(maintenancePage).toContain('class="ui-table table table-hover users-table surface-table embedded-management-table maintenance-table align-middle"');
    expect(maintenancePage).toContain('class="ui-modal__content modal-content maintenance-close-modal"');
    expect(maintenancePage).toContain('class="ui-modal__header modal-header maintenance-close-modal__header"');
    expect(maintenancePage).toContain('class="ui-modal__footer modal-footer maintenance-close-modal__actions"');
    expect(dashboardPage).toContain('class="ui-modal__content modal-content crew-picker-modal"');
    expect(dashboardPage).toContain('class="ui-table table table-hover users-table surface-table crew-assignment-table align-middle" id="crew-assignment-table"');
    expect(dashboardPage).toContain('class="ui-modal__body modal-body customer-edit-modal__body reservation-shell-modal__body" id="reservation-details-body"');
    expect(dashboardPage).toContain('class="ui-modal__footer modal-footer customer-edit-modal__footer reservation-shell-modal__footer"');
    expect(equipmentPage).toContain('class="ui-badge ui-badge--soft badge-soft equipment-variants-count" id="equipment-variants-count"');
  });

  it('records dashboard as the second full-family reference for the shared secondary primitive bridge', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('Phase 3 Dashboard Secondary Primitive Adoption');
    expect(masterPlan).toContain('`dashboard.html` now extends the shared `Table`, `Modal`, `Tabs`, and `Badge` bridge across the full extracted `full` family');
    expect(masterPlan).toContain('full-family parity checks');
  });
});
