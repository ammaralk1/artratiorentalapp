import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('tabs detail primitive adoption audit', () => {
  it('keeps customer and technician on the in-place primitive adoption pattern for the extracted detail pages', () => {
    const customerPage = readSource('src/pages/customer.html');
    const technicianPage = readSource('src/pages/technician.html');

    expect(customerPage).toContain('class="ui-card ui-card--content glass-card primary-actions-card"');
    expect(customerPage).toContain('class="ui-button ui-button--primary btn btn-primary primary-action-btn"');
    expect(customerPage).toContain('class="ui-button ui-button--secondary btn btn-secondary primary-action-btn"');
    expect(customerPage).toContain('class="ui-input form-control w-auto flex-1 min-w-[14rem]"');
    expect(customerPage).toContain('class="ui-select form-select w-auto"');
    expect(customerPage).toContain('class="ui-textarea form-control" id="edit-notes"');
    expect(customerPage).toContain('class="ui-tab tab-button active"');
    expect(customerPage).toContain('class="ui-tabs tab-buttons tab-buttons-horizontal" role="tablist"');
    expect(customerPage).toContain('class="ui-tab tab-button tab-active"');
    expect(customerPage).toContain('data-customer-tab-panel="projects" hidden');

    expect(technicianPage).toContain('class="ui-card ui-card--content glass-card primary-actions-card"');
    expect(technicianPage).toContain('class="ui-button ui-button--outline btn btn-outline btn-primary"');
    expect(technicianPage).toContain('class="ui-button ui-button--primary btn btn-primary primary-action-btn"');
    expect(technicianPage).toContain('class="ui-button ui-button--secondary btn btn-secondary primary-action-btn"');
    expect(technicianPage).toContain('data-i18n-key="technicianDetails.primaryNav.reservations"');
    expect(technicianPage).toContain('data-i18n-key="technicianDetails.primaryNav.projects"');
    expect(technicianPage).toContain('class="ui-input form-control w-auto flex-1 min-w-[14rem]"');
    expect(technicianPage).toContain('class="ui-select form-select w-auto"');
    expect(technicianPage).toContain('class="ui-textarea form-control" rows="3"');
    expect(technicianPage).toContain('class="ui-button ui-button--danger btn btn-error" id="technician-payout-confirm-yes"');
    expect(customerPage).toContain('data-i18n-key="tabs.customers"');
    expect(technicianPage).toContain('data-i18n-key="tabs.technicians"');
    expect(technicianPage).toContain('class="ui-card ui-card--content glass-card dashboard-tabbar detail-tabbar technician-tabbar"');
    expect(technicianPage).toContain('class="ui-tabs tab-buttons tab-buttons-horizontal" role="tablist"');
    expect(technicianPage).toContain('class="ui-tab tab-button tab-active" data-technician-tab="reservations"');
    expect(technicianPage).toContain('data-technician-tab-panel="projects" hidden');
  });

  it('records the detail-page primitive adoption baseline in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('`customer.html` and `technician.html` now extend the live `ui-tabs` and `ui-tab` adoption across the full extracted `tabs` family');
    expect(masterPlan).toContain('Phase 3 Detail Tabs Secondary Primitive Adoption');
    expect(masterPlan).toContain('`projects.html` as the first extracted `full`-family target');
  });
});
