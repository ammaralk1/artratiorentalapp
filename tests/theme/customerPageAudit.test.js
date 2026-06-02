import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function read(relativePath) {
  return readFileSync(resolve(process.cwd(), relativePath), 'utf8');
}

describe('customer page audit', () => {
  it('uses hidden attributes for optional hero badges and projects tab panel', () => {
    const customerPage = read('src/pages/customer.html');

    expect(customerPage).toContain('id="customer-hero-company" hidden');
    expect(customerPage).toContain('id="customer-hero-email" hidden');
    expect(customerPage).toContain('id="customer-hero-tax" hidden');
    expect(customerPage).toContain('id="customer-tab-panel-projects" data-customer-tab-panel="projects" hidden');
    expect(customerPage).not.toContain('id="customer-hero-company" class="badge badge-outline badge-lg hidden"');
    expect(customerPage).not.toContain('customer-projects-section hidden');
  });

  it('keeps customer page visibility logic on hidden attributes instead of hidden classes', () => {
    const customerPageScript = read('src/scripts/customerPage.js');

    expect(customerPageScript).toContain('element.hidden = !hasValue;');
    expect(customerPageScript).toContain('element.hidden = false;');
    expect(customerPageScript).toContain('panel.hidden = key !== tab;');
    expect(customerPageScript).not.toContain("document.getElementById('customer-edit-btn')");
    expect(customerPageScript).not.toContain("document.getElementById('customer-hero-summary')");
    expect(customerPageScript).not.toContain("panel.classList.toggle('hidden', key !== tab);");
  });

  it('keeps customer-specific hero and logout contracts explicit in app.css', () => {
    const appCss = read('src/styles/app.css');
    const customerTranslations = read('src/scripts/translations/customer.js');
    const customerPage = read('src/pages/customer.html');

    expect(customerPage).toContain('class="modal fade customer-edit-modal" id="editCustomerModal"');
    expect(customerPage).toContain('class="modal-content customer-edit-modal__content"');
    expect(customerPage).toContain('class="management-form customer-edit-form"');
    expect(customerPage).toContain('class="customer-upload-input" id="edit-document-file"');
    expect(customerPage).toContain('class="ui-button ui-button--secondary btn btn-secondary customer-upload-trigger"');
    expect(appCss).toContain('.dashboard-header-end .dashboard-header-logout-btn');
    expect(appCss).toContain('.customer-hero-meta');
    expect(appCss).toContain('flex-wrap: nowrap;');
    expect(appCss).toContain('overflow-x: auto;');
    expect(appCss).toContain('.customer-edit-modal__content {');
    expect(appCss).toContain('.customer-edit-form .customer-upload-trigger {');
    expect(appCss).toContain('.customer-edit-form .form-control::placeholder,');
    expect(appCss).toContain('.customer-hero-badge--company');
    expect(appCss).toContain('.customer-page [data-customer-tab-panel][hidden]');
    expect(appCss).toContain('.dashboard-hero-brand *');
    expect(customerTranslations).toContain("'customerDetails.title': 'بيانات العميل'");
    expect(customerTranslations).toContain("'customers.form.actions.chooseDocument': 'Choose file'");
    expect(customerTranslations).not.toContain("'customerDetails.title': '👤 بيانات العميل'");
  });

  it('renders the customer projects empty state with the shared project-grid empty copy primitive', () => {
    const customerDetailsScript = read('src/scripts/customerDetails.js');
    const coreCss = read('src/styles/core.css');
    const customerTranslations = read('src/scripts/translations/customer.js');
    const reservationRenderers = read('src/scripts/reservations/renderers.js');

    expect(customerDetailsScript).toContain('renderProjectGridEmptyCopy(emptyMessage)');
    expect(customerDetailsScript).toContain('class="linked-records-empty-copy project-card-grid__empty-line"');
    expect(customerDetailsScript).toContain("messageKey === 'customerProjects.noResults'");
    expect(customerDetailsScript).not.toContain('<div class="alert alert-info text-center mb-0">${emptyMessage}</div>');
    expect(coreCss).toContain('.project-card-grid__empty-line {');
    expect(coreCss).toContain('grid-column: 1 / -1;');
    expect(customerTranslations).toContain("'customerProjects.empty': '⚠️ No projects are linked to this client.'");
    expect(customerTranslations).toContain("'customerProjects.noResults': '🔍 No projects match the search.'");
    expect(reservationRenderers).toContain('class="linked-records-empty-copy"');
  });

  it('adopts shared detail-page primitives for stats, records, tabs, and payment rows', () => {
    const customerPage = read('src/pages/customer.html');
    const customerPageScript = read('src/scripts/customerPage.js');
    const appCss = read('src/styles/app.css');

    expect(customerPage).toContain('class="detail-stats-grid');
    expect(customerPage).toContain('class="detail-stat-card');
    expect(customerPage).toContain('class="detail-record-grid');
    expect(customerPage).toContain('class="ui-card ui-card--content glass-card dashboard-tabbar detail-tabbar"');
    expect(customerPage).toContain('class="payment-breakdown detail-payment-breakdown"');
    expect(customerPageScript).toContain('class="detail-payment-line payment-line payment-line--paid"');
    expect(customerPageScript).toContain('class="detail-payment-line-label payment-line-label"');
    expect(customerPageScript).toContain('class="detail-record-card rounded-2xl');
    expect(appCss).toContain('.details-page .detail-tabbar .tab-buttons {');
    expect(appCss).toContain('.details-page .detail-record-grid > .detail-record-card,');
    expect(appCss).toContain('.details-page .detail-payment-breakdown .detail-payment-line {');
  });

  it('syncs customer-scoped reservations and projects into shared state before tab rendering', () => {
    const customerPageScript = read('src/scripts/customerPage.js');
    const customerDetailsScript = read('src/scripts/customerDetails.js');

    expect(customerPageScript).toContain('function syncCustomerReservationsState(customerId, records)');
    expect(customerPageScript).toContain('function syncCustomerProjectsState(customerId, records)');
    expect(customerPageScript).toContain('syncCustomerReservationsState(id, records);');
    expect(customerPageScript).toContain('syncCustomerProjectsState(id, records);');
    expect(customerPageScript).toContain('return setReservationsState(merged);');
    expect(customerPageScript).toContain('return setProjectsState(merged);');
    expect(customerDetailsScript).toContain('const projects = Array.isArray(getProjectsState()) ? getProjectsState() : [];');
    expect(customerDetailsScript).toContain('const reservations = Array.isArray(getReservationsState()) ? getReservationsState() : [];');
  });
});
