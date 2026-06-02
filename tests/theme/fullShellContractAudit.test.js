import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('full shell contract audit', () => {
  it('keeps the shared full-family shell scaffold aligned with the locked slot contract', () => {
    const shellSource = readSource('src/pages/_partials/full-manager-shell.html');

    expect(shellSource).toContain('body class="page-shell theme-loading {{bodyClass}} auth-pending"');
    expect(shellSource).toContain('id="sidebar-backdrop"');
    expect(shellSource).toContain('id="dashboard-sidebar"');
    expect(shellSource).toContain('class="sidebar-close-btn lg:hidden"');
    expect(shellSource).toContain('sidebar-panel sidebar-panel--stats');
    expect(shellSource).toContain('sidebar-panel sidebar-panel--tabs');
    expect(shellSource).toContain('sidebar-panel sidebar-panel--links');
    expect(shellSource).toContain('dashboard-header');
    expect(shellSource).toContain('data-dashboard-greeting');
    expect(shellSource).toContain('data-greeting-toggle');
    expect(shellSource).toContain('data-greeting-panel');
    expect(shellSource).toContain('id="language-toggle"');
    expect(shellSource).toContain('data-theme-toggle');
    expect(shellSource).toContain('id="logout-btn"');

    [
      '{{slot:sidebarStats}}',
      '{{slot:sidebarTabs}}',
      '{{slot:sidebarLinks}}',
      '{{slot:greetingPanel}}',
      '{{slot:mainContent}}',
      '{{slot:afterShell}}',
      '{{slot:pageScripts}}',
    ].forEach((slot) => {
      expect(shellSource).toContain(slot);
    });
  });

  it('records the full-family shell scaffold and projects-first dark gate in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('The shared `full`-family shell scaffold now exists at `src/pages/_partials/full-manager-shell.html`');
    expect(masterPlan).toContain('The slot contract for the `full` family is now fixed as `sidebarStats`, `sidebarTabs`, `sidebarLinks`, `greetingPanel`, `mainContent`, `afterShell`, and `pageScripts`');
    expect(masterPlan).toContain('Projects Full-Family Dark Validation Checklist');
    expect(masterPlan).toContain('Validate the top-level content tabs driven by `data-tab-target` and the nested project subtabs driven by `data-project-subtab-target`.');
    expect(masterPlan).toContain('Validate all three modal surfaces in dark mode: `#projectDetailsModal`, `#reservationDetailsModal`, and `#closeProjectModal`');
    expect(masterPlan).toContain('The `full`-family scaffold now exists and `projects.html` already uses it');
    expect(masterPlan).toContain('`dashboard.html` now has a dedicated dark-validation checklist and source-level audit');
    expect(masterPlan).toContain('The first `dashboard.html` extraction pass onto `src/pages/_partials/full-manager-shell.html` is now implemented');
  });

  it('keeps the migrated projects page on the shared auth-pending reveal contract', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const projectsScript = readSource('src/scripts/projects.js');

    expect(projectsPage).toContain('<!-- @include "./_partials/full-manager-shell.html"');
    expect(projectsPage).toContain('"pageScript":"/src/scripts/projects.js"');
    expect(projectsScript).toContain("import { applyLocalDashboardFixture } from './devFixtures.js';");
    expect(projectsScript).toContain('applyLocalDashboardFixture();');
    expect(projectsScript).toContain("document.body.classList.remove('auth-pending');");
  });

  it('keeps the projects level 1 cleanup free of the removed legacy technician/equipment selector contract', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const projectsApp = readSource('src/scripts/projects/app.js');
    const projectsDom = readSource('src/scripts/projects/dom.js');
    const projectsData = readSource('src/scripts/projects/data.js');
    const projectsForm = readSource('src/scripts/projects/form.js');

    expect(projectsPage).not.toContain('id="project-technician-select"');
    expect(projectsPage).not.toContain('id="add-technician-btn"');
    expect(projectsPage).not.toContain('id="project-technician-list"');
    expect(projectsPage).not.toContain('id="project-equipment-select"');
    expect(projectsPage).not.toContain('id="project-equipment-qty"');
    expect(projectsPage).not.toContain('id="add-equipment-btn"');
    expect(projectsPage).not.toContain('id="project-equipment-list"');
    expect(projectsApp).not.toContain('bindSelectionEvents');
    expect(projectsApp).not.toContain('bindSelectionRemovalEvents');
    expect(projectsDom).not.toContain("document.getElementById('project-technician-select')");
    expect(projectsDom).not.toContain("document.getElementById('add-technician-btn')");
    expect(projectsDom).not.toContain("document.getElementById('project-technician-list')");
    expect(projectsDom).not.toContain("document.getElementById('project-equipment-select')");
    expect(projectsDom).not.toContain("document.getElementById('project-equipment-qty')");
    expect(projectsDom).not.toContain("document.getElementById('add-equipment-btn')");
    expect(projectsDom).not.toContain("document.getElementById('project-equipment-list')");
    expect(projectsData).not.toContain('dom.technicianSelect');
    expect(projectsData).not.toContain('dom.equipmentSelect');
    expect(projectsForm).not.toContain('function handleAddTechnician()');
    expect(projectsForm).not.toContain('function handleAddEquipment()');
    expect(projectsForm).not.toContain('renderTechnicianChips()');
    expect(projectsForm).not.toContain('renderEquipmentChips()');
  });

  it('keeps projects level 2 on a single shared top-level tabbar path', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const mainPaneMarker = 'data-tab-pane="projects-section"';
    const customerPaneMarker = 'data-tab-pane="customers-section"';
    const technicianPaneMarker = 'data-tab-pane="technicians-section"';

    expect(projectsPage).toContain('data-slot="sidebarTabs"');
    expect(projectsPage).toContain('class="ui-tabs ui-tabs--vertical tab-buttons tab-buttons-vertical"');
    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card subtab-scroll-card dashboard-subtabbar"');
    expect(projectsPage.split(mainPaneMarker).length - 1).toBe(1);
    expect(projectsPage.split(customerPaneMarker).length - 1).toBe(1);
    expect(projectsPage.split(technicianPaneMarker).length - 1).toBe(1);
    expect(projectsPage).not.toContain('class="ui-card ui-card--content glass-card dashboard-tabbar hidden lg:block"');
    expect(projectsPage).not.toContain('class="ui-card ui-card--content glass-card dashboard-tabbar p-3 lg:hidden"');
  });

  it('keeps projects level 3 on shared card surfaces for active create and management flows', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const projectsCommon = readSource('src/scripts/projectsCommon.js');

    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card project-form-card"');
    expect(projectsPage).toContain('class="project-create-section project-operational-booking"');
    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card customer-form-box customer-embedded-form-card management-form-box mb-4"');
    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card add-technicians-box technician-embedded-form-card management-form-box mb-4"');
    expect(projectsPage).not.toContain('class="box project-form-card"');
    expect(projectsPage).not.toContain('class="box project-linked-reservation"');
    expect(projectsPage).not.toContain('class="box customer-form-box management-form-box mb-4"');
    expect(projectsPage).not.toContain('class="box add-technicians-box management-form-box mb-4"');
    expect(projectsCommon).toContain('class="ui-card ui-card--content glass-card h-100 project-card"');
    expect(projectsCommon).not.toContain('class="box h-100 project-card"');
  });

  it('keeps the embedded projects customers section on a dedicated records shell with shared table primitives', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const customerModule = readSource('src/scripts/customers.js');
    const projectTranslations = readSource('src/scripts/translations/projects.js');
    const appStyles = readSource('src/styles/app.css');
    const formStyles = readSource('src/styles/forms.css');

    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card customer-records-card"');
    expect(projectsPage).toContain('id="customers-list-count"');
    expect(projectsPage).toContain('class="customer-records-card__toolbar"');
    expect(projectsPage).toContain('class="management-search-bar customer-records-search"');
    expect(projectsPage).toContain('id="customers-clear-search"');
    expect(projectsPage).toContain('class="customer-embedded-form-layout"');
    expect(projectsPage).toContain('class="customer-embedded-form-side-card"');
    expect(projectsPage).toContain('class="users-table-wrapper overflow-x-auto embedded-management-table-shell"');
    expect(projectsPage).toContain('class="ui-table table table-hover users-table surface-table embedded-management-table customer-table align-middle"');
    expect(projectsPage).toContain('<thead class="table-light">');
    expect(projectsPage).toContain('class="list-pagination customer-records-card__pagination"');
    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card customer-form-box customer-embedded-form-card management-form-box mb-4"');
    expect(projectsPage).toContain('class="customer-upload-input" id="customer-document"');
    expect(projectsPage).toContain('class="ui-button ui-button--secondary btn btn-secondary customer-upload-trigger"');
    expect(customerModule).toContain("document.getElementById('customers-list-count')");
    expect(customerModule).toContain("document.getElementById('customers-clear-search')");
    expect(customerModule).toContain('projects-table-empty-row');
    expect(customerModule).toContain('ui-button ui-button--primary btn btn-primary btn-sm');
    expect(customerModule).toContain('ui-button ui-button--outline btn btn-outline btn-sm');
    expect(customerModule).toContain('customers.actions.editCompact');
    expect(customerModule).toContain('customers.actions.viewDocumentCompact');
    expect(projectTranslations).toContain("'projects.customers.records.title'");
    expect(projectTranslations).toContain("'projects.customers.records.count'");
    expect(projectTranslations).toContain("'projects.customers.records.filteredCount'");
    expect(appStyles).toContain('.users-table thead th,');
    expect(appStyles).toContain('background: var(--bo-color-table-head-bg) !important;');
    expect(appStyles).not.toContain('.users-table thead tr > * {\n    background-color: transparent !important;');
    expect(appStyles).not.toContain('.customer-table thead th { padding: 0.8rem 1.05rem; }');
    expect(appStyles).not.toContain('.customer-table thead th, .customer-table tbody td { padding: 0.8rem 1.05rem !important; }');
    expect(appStyles).toContain(':is(#customers-section, #customers-tab) .customer-embedded-form-layout {');
    expect(appStyles).toContain('.customer-table thead th:nth-child(1),');
    expect(formStyles).toContain('.customer-upload-input {');
    expect(formStyles).toContain('.customer-upload-inline .customer-upload-trigger {');
    expect(formStyles).not.toContain('.customer-upload-inline .btn {');
  });

  it('keeps the embedded projects technicians section aligned to the customer benchmark shell', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const techniciansModule = readSource('src/scripts/technicians.js');
    const projectTranslations = readSource('src/scripts/translations/projects.js');
    const appStyles = readSource('src/styles/app.css');

    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card add-technicians-box technician-embedded-form-card management-form-box mb-4"');
    expect(projectsPage).toContain('class="technician-embedded-form-layout"');
    expect(projectsPage).toContain('class="technician-embedded-form-side-card"');
    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card technician-records-card"');
    expect(projectsPage).toContain('id="technicians-list-count"');
    expect(projectsPage).toContain('class="management-search-bar technician-records-search"');
    expect(projectsPage).toContain('id="technicians-clear-search"');
    expect(projectsPage).toContain('class="users-table-wrapper overflow-x-auto embedded-management-table-shell"');
    expect(projectsPage).toContain('class="ui-table table table-hover users-table surface-table embedded-management-table technician-table align-middle"');
    expect(projectsPage).toContain('<thead class="table-light">');
    expect(projectsPage).toContain('class="list-pagination technician-records-card__pagination"');
    expect(projectsPage).not.toContain('class="ui-table-shell customer-table-wrapper technician-table-wrapper table-responsive"');
    expect(projectsPage).not.toContain('class="ui-table customer-table technician-table align-middle"');
    expect(techniciansModule).toContain("document.getElementById('technicians-list-count')");
    expect(techniciansModule).toContain("document.getElementById('technicians-clear-search')");
    expect(techniciansModule).toContain('projects-table-empty-row');
    expect(techniciansModule).toContain('ui-button ui-button--primary btn btn-primary btn-sm');
    expect(techniciansModule).toContain('ui-button ui-button--outline btn btn-outline btn-sm');
    expect(techniciansModule).toContain('technicians.actions.editCompact');
    expect(techniciansModule).toContain('positions.table.actions.editCompact');
    expect(projectTranslations).toContain("'projects.technicians.records.title'");
    expect(projectTranslations).toContain("'projects.technicians.records.filteredCount'");
    expect(readSource('src/scripts/translations/dashboard.js')).toContain("'technicians.actions.editCompact'");
    expect(appStyles).toContain(':is(#technicians-section, #technicians-tab) .technician-embedded-form-layout {');
    expect(appStyles).toContain('.embedded-management-table-shell {');
    expect(appStyles).toContain('.embedded-management-table {');
    expect(appStyles).toContain(':is(#technicians-section, #technicians-tab) .technician-table thead th,');
    expect(appStyles).toContain(':is(#technicians-section, #technicians-tab) .technician-action-btn {');
  });

  it('keeps the standalone equipment page on the shared embedded-management shell path', () => {
    const equipmentPage = readSource('src/pages/equipment.html');
    const equipmentRender = readSource('src/scripts/equipment/render.js');
    const equipmentEvents = readSource('src/scripts/equipment/events.js');
    const dashboardTranslations = readSource('src/scripts/translations/dashboard.js');
    const appStyles = readSource('src/styles/app.css');
    const formStyles = readSource('src/styles/forms.css');

    expect(equipmentPage).toContain('data-i18n-key="equipment.section.support"');
    expect(equipmentPage).toContain('class="ui-card ui-card--content glass-card equipment-form-box equipment-embedded-form-card management-form-box mb-4"');
    expect(equipmentPage).toContain('class="equipment-embedded-form-layout"');
    expect(equipmentPage).toContain('class="equipment-embedded-form-side-card"');
    expect(equipmentPage).toContain('class="ui-card ui-card--content glass-card equipment-packages-box equipment-package-management-card management-form-box mb-4"');
    expect(equipmentPage).toContain('class="equipment-package-form-layout"');
    expect(equipmentPage).toContain('data-i18n-key="equipment.packages.form.sections.identity.title"');
    expect(equipmentPage).toContain('data-i18n-key="equipment.packages.form.sections.pricing.title"');
    expect(equipmentPage).toContain('class="ui-card ui-card--content glass-card equipment-packages-list-box equipment-records-card mb-4"');
    expect(equipmentPage).toContain('class="users-table-wrapper overflow-x-auto embedded-management-table-shell equipment-packages-table-wrapper"');
    expect(equipmentPage).toContain('class="ui-table table table-hover users-table surface-table embedded-management-table align-middle equipment-packages-table"');
    expect(equipmentPage).toContain('class="ui-card ui-card--content glass-card equipment-list-box equipment-records-card"');
    expect(equipmentPage).toContain('id="equipment-clear-search"');
    expect(equipmentPage).toContain('class="management-search-bar equipment-records-search"');
    expect(equipmentPage).not.toContain('equipment-filter-controls');
    expect(formStyles).not.toContain('.equipment-filter-controls.management-search-bar');
    expect(appStyles).not.toContain('equipment-filter-controls');
    expect(appStyles).not.toContain('equipment-filters');
    expect(appStyles).not.toContain('equipment-search-row');
    expect(appStyles).not.toContain('equipment-status-field');
    expect(appStyles).not.toContain('equipment-status-select');
    expect(appStyles).not.toContain('calendar-card');
    expect(appStyles).not.toContain('dashboard-hero-callout');
    expect(appStyles).not.toContain('summary-card--compact');
    expect(appStyles).not.toContain('sidebar-link-active');
    expect(appStyles).not.toContain('stats-cards');
    expect(appStyles).not.toContain('card-surface');
    expect(appStyles).not.toContain('ui-empty-state__actions');
    expect(appStyles).not.toContain('templates-toolbar-field--actions');
    expect(appStyles).not.toContain('templates-preview-shell__utilities-shell');
    expect(appStyles).not.toContain('maintenance-records-card__pagination');
    expect(appStyles).not.toContain('equipment-card__status-text');
    expect(appStyles).not.toContain('equipment-card__label--status');
    expect(appStyles).not.toContain('equipment-card__action-btn--edit');
    expect(appStyles).not.toContain('equipment-empty-state--error');
    expect(appStyles).not.toContain('equipment-card__subtitle');
    expect(equipmentPage).toContain('class="users-table-wrapper overflow-x-auto embedded-management-table-shell equipment-package-items-table-wrapper"');
    expect(equipmentPage).toContain('class="ui-table table table-hover users-table surface-table embedded-management-table align-middle equipment-package-items-table"');
    expect(equipmentPage).toContain('class="list-pagination equipment-records-card__pagination"');
    expect(equipmentPage).not.toContain('<div class="box management-form-box equipment-form-box mb-4">');
    expect(equipmentPage).not.toContain('<div class="box management-form-box equipment-packages-box mb-4">');
    expect(equipmentPage).not.toContain('<div class="box equipment-list-box">');
    expect(equipmentPage).not.toContain('<div class="ui-table-shell table-responsive">\n            <table class="ui-table table table-hover align-middle" id="equipment-packages-table">');
    expect(equipmentRender).toContain("ui-button ${isActive ? 'ui-button--primary' : 'ui-button--outline'}");
    expect(equipmentRender).toContain('class="ui-button ui-button--outline btn btn-sm btn-outline-primary"');
    expect(equipmentEvents).toContain("document.getElementById('equipment-clear-search')");
    expect(dashboardTranslations).toContain("'equipment.section.support'");
    expect(dashboardTranslations).toContain("'equipment.list.hint'");
    expect(dashboardTranslations).toContain("'equipment.packages.list.hint'");
    expect(dashboardTranslations).toContain("'equipment.packages.items.hint'");
    expect(appStyles).toContain('#equipment-tab .equipment-embedded-form-layout {');
    expect(appStyles).toContain('.equipment-records-card {');
    expect(appStyles).toContain('.equipment-records-search {');
    expect(appStyles).toContain('.embedded-management-table-shell {');
    expect(appStyles).toContain('.embedded-management-table {');
    expect(appStyles).toContain('#equipment-tab .equipment-packages-table-wrapper {');
    expect(appStyles).toContain('#equipment-tab .equipment-package-management-card .equipment-package-items-editor {');
    expect(appStyles).toContain('#equipment-tab .equipment-package-items-table thead th,');
  });

  it('keeps the standalone crew page on the shared embedded-management shell path', () => {
    const crewPage = readSource('src/pages/crew.html');
    const techniciansModule = readSource('src/scripts/technicians.js');
    const dashboardTranslations = readSource('src/scripts/translations/dashboard.js');
    const appStyles = readSource('src/styles/app.css');

    expect(crewPage).toContain('class="ui-card ui-card--content glass-card add-technicians-box technician-embedded-form-card management-form-box mb-4"');
    expect(crewPage).toContain('class="technician-embedded-form-layout"');
    expect(crewPage).toContain('class="technician-embedded-form-side-card"');
    expect(crewPage).toContain('class="ui-card ui-card--content glass-card technician-records-card"');
    expect(crewPage).toContain('id="technicians-list-count"');
    expect(crewPage).toContain('class="management-search-bar technician-records-search"');
    expect(crewPage).toContain('id="technicians-clear-search"');
    expect(crewPage).toContain('class="users-table-wrapper overflow-x-auto embedded-management-table-shell"');
    expect(crewPage).toContain('class="ui-table table table-hover users-table surface-table embedded-management-table technician-table align-middle"');
    expect(crewPage).toContain('<thead class="table-light">');
    expect(crewPage).toContain('class="list-pagination technician-records-card__pagination"');
    expect(crewPage).not.toContain('class="customer-table-wrapper technician-table-wrapper table-responsive"');
    expect(crewPage).not.toContain('class="customer-table technician-table align-middle"');
    expect(techniciansModule).toContain("document.getElementById('technicians-list-count')");
    expect(techniciansModule).toContain("document.getElementById('technicians-clear-search')");
    expect(techniciansModule).toContain('projects-table-empty-row');
    expect(dashboardTranslations).toContain("'projects.technicians.records.title'");
    expect(dashboardTranslations).toContain("'projects.technicians.records.filteredCount'");
    expect(appStyles).toContain(':is(#technicians-section, #technicians-tab) .technician-embedded-form-layout {');
    expect(appStyles).toContain('.embedded-management-table-shell {');
    expect(appStyles).toContain('.embedded-management-table {');
    expect(appStyles).toContain(':is(#technicians-section, #technicians-tab) .technician-table thead th,');
    expect(appStyles).toContain(':is(#technicians-section, #technicians-tab) .technician-action-btn {');
  });

  it('keeps the create-project financial controls on shared form primitives instead of legacy bootstrap groups', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const coreStyles = readSource('src/styles/core.css');

    expect(projectsPage).toContain('class="services-client-total-indicator"');
    expect(projectsPage).toContain('class="project-discount-group"');
    expect(projectsPage).toContain('class="project-payment-progress-group"');
    expect(projectsPage).toContain('class="ui-button ui-button--primary btn btn-primary project-payment-progress-action"');
    expect(projectsPage).toContain('id="project-payment-status" name="project-payment-status" class="ui-select form-select select select-bordered payment-status-select d-none" data-no-enhance');
    expect(projectsPage).not.toContain('class="alert alert-secondary py-2 services-client-total-indicator"');
    expect(projectsPage).not.toContain('class="input-group project-discount-group"');
    expect(projectsPage).not.toContain('class="input-group project-payment-progress-group"');
    expect(projectsPage).not.toContain('payment-add-btn');
    expect(coreStyles).toContain('.services-client-total-indicator {');
    expect(coreStyles).toContain('.project-discount-group {');
    expect(coreStyles).toContain('max-width: 100%');
    expect(coreStyles).toContain('.project-payment-progress-action {');
    expect(coreStyles).not.toContain('.payment-add-btn {');
  });

  it('keeps create-project runtime rendering aligned with the active language and single reports bootstrap path', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const projectsEntry = readSource('src/scripts/projects.js');
    const projectsApp = readSource('src/scripts/projects/app.js');
    const projectsForm = readSource('src/scripts/projects/form.js');
    const projectsQuickCustomer = readSource('src/scripts/projects/quickCustomer.js');
    const projectsData = readSource('src/scripts/projects/data.js');
    const projectsReports = readSource('src/scripts/projectsReports.js');

    expect(projectsPage).toContain('class="surface-heading-stack project-form-header"');
    expect(projectsPage).toContain('class="project-create-section"');
    expect(projectsPage).toContain('class="row g-3 mt-0 project-schedule-grid"');
    expect(projectsPage).toContain('class="project-expense-list-surface"');
    expect(projectsPage).toContain('class="project-billing-panel project-billing-panel--discount"');
    expect(projectsPage).toContain('class="project-billing-panel project-billing-panel--share"');
    expect(projectsPage).toContain('class="project-billing-panel project-billing-panel--payment"');
    expect(projectsPage).toContain('data-i18n-key="projects.form.subtitle"');
    expect(projectsPage).not.toContain('project-create-intro-card');
    expect(projectsPage).not.toContain('data-i18n-key="projects.workflow.subtabsHint"');
    expect(projectsPage).not.toContain('<script type="module" src="/src/scripts/customers.js"></script>');
    expect(projectsPage).not.toContain('<script type="module" src="/src/scripts/technicians.js"></script>');
    expect(projectsEntry).toContain("import { initProjectsPage, initProjectsPageBindings } from './projects/app.js';");
    expect(projectsQuickCustomer).toContain("} from '../quickCustomer.js';");
    expect(projectsQuickCustomer).toContain('createQuickCustomer(payload)');
    expect(projectsQuickCustomer).not.toContain("from '../customers.js'");
    expect(projectsApp).not.toContain("import('./customers.js')");
    expect(projectsApp).not.toContain("import('./technicians.js')");
    expect(projectsApp).toContain('syncCreateProjectSelectTranslations();');
    expect(projectsForm).toContain('export function syncCreateProjectSelectTranslations()');
    expect(projectsForm).toContain('renderCreateProjectPaymentHistory();');
    expect(projectsForm).toContain('renderProjectOperationalSummary();');
    expect(projectsForm).toContain('users-table-wrapper overflow-x-auto');
    expect(projectsForm).toContain('ui-table users-table surface-table');
    expect(projectsForm).toContain("amount: type === 'amount' ? value : 0");
    expect(projectsForm).toContain("percentage: type === 'percent' ? value : 0");
    expect(projectsData).not.toContain('populateCreateAssignmentSelects()');
    expect(projectsReports).not.toContain('document.addEventListener(\'DOMContentLoaded\', bootProjectsReportsModule);');
  });

  it('keeps the create-project client field on a lightweight combobox path instead of booting the customers page module', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const projectsData = readSource('src/scripts/projects/data.js');

    expect(projectsPage).toContain('id="project-client"');
    expect(projectsPage).toContain('id="project-customer-suggestions"');
    expect(projectsData).toContain("apiRequest('/customers/')");
    expect(projectsData).toContain("dom.client.setAttribute('role', 'combobox')");
    expect(projectsData).toContain("event.key === 'ArrowDown'");
    expect(projectsData).toContain("event.key === 'Enter'");
    expect(projectsData).toContain('setProjectClientCompany(customer);');
  });

  it('keeps projects-list-tab on shared filters, table, and empty-state contracts', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const projectsView = readSource('src/scripts/projects/view.js');
    const coreStyles = readSource('src/styles/core.css');
    const appStyles = readSource('src/styles/app.css');
    const translations = readSource('src/scripts/translations/projects.js');

    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card project-filters-compact"');
    expect(projectsPage).toContain('class="project-filters-grid"');
    expect(projectsPage).toContain('class="project-filters-date-range"');
    expect(projectsPage).toContain('data-i18n-key="projects.search.reset"');
    expect(projectsPage).toContain('data-i18n-key="projects.search.filters.statusAll"');
    expect(projectsPage).toContain('data-i18n-key="projects.search.filters.paymentAll"');
    expect(projectsPage).toContain('data-i18n-key="projects.search.filters.typeAll"');
    expect(projectsPage).toContain('data-i18n-key="projects.search.filters.confirmedAll"');
    expect(projectsPage).toContain('data-i18n-key="projects.search.filters.rangeAll"');
    expect(projectsPage).toContain('class="project-list-section-header mb-3"');
    expect(projectsPage).toContain('class="projects-table__header project-list-section-header mb-3"');
    expect(projectsPage).toContain('class="projects-table__count ui-badge ui-badge--soft badge-soft"');
    expect(projectsPage).toContain('class="list-pagination projects-table-pagination"');
    expect(projectsPage).toContain('class="users-table-wrapper overflow-x-auto"');
    expect(projectsPage).toContain('class="ui-table users-table surface-table table table-hover align-middle"');
    expect(projectsView).toContain('linked-records-empty-copy project-card-grid__item project-card-grid__item--full project-card-grid__empty-line');
    expect(projectsView).toContain('class="list-pagination project-focus-group__pagination"');
    expect(projectsView).toContain('class="projects-table__actions"');
    expect(projectsView).toContain('class="projects-table__amount"');
    expect(projectsView).toContain('class="projects-table__schedule"');
    expect(projectsView).toContain('class="list-pagination__summary text-muted small"');
    expect(projectsView).toContain('class="list-pagination__controls btn-group"');
    expect(projectsView).not.toContain('alert alert-info mb-0 text-center');
    expect(coreStyles).toContain('.project-list-section-header {');
    expect(coreStyles).toContain('.project-filters-grid {');
    expect(coreStyles).toContain('max-width: 34rem;');
    expect(coreStyles).toContain('.project-filters-date-range {');
    expect(coreStyles).toContain('.projects-table .users-table {');
    expect(coreStyles).toContain('table-layout: auto;');
    expect(coreStyles).toContain('.projects-table__actions {');
    expect(coreStyles).not.toContain('.projects-table table {');
    expect(coreStyles).not.toContain('.projects-table thead th {');
    expect(appStyles).toContain('.list-pagination__controls {');
    expect(appStyles).toContain('flex: 0 0 auto;');
    expect(appStyles).toContain('.list-pagination .btn {');
    expect(appStyles).toContain('border-radius: 999px;');
    expect(appStyles).toContain('.list-pagination__controls.btn-group {');
    expect(appStyles).toContain('gap: 0.5rem;');
    expect(appStyles).toContain('border-radius: 0 !important;');
    expect(appStyles).toContain('.list-pagination__controls.btn-group > .btn {');
    expect(appStyles).toContain('.list-pagination__summary {');
    expect(translations).toContain("'projects.search.reset'");
    expect(translations).toContain("'projects.search.filters.statusAll'");
    expect(translations).toContain("'projects.search.filters.paymentAll'");
    expect(translations).toContain("'projects.table.headers.actions'");
    expect(translations).toContain("'projects.table.loading'");
    expect(translations).toContain("'projects.pagination.navigation'");
    expect(translations).toContain("'projects.pagination.range'");
  });

  it('keeps projects-templates-tab on shared workspace shells instead of reports-owned layout primitives', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const appStyles = readSource('src/styles/app.css');
    const reportsStyles = readSource('src/styles/reports.css');

    expect(projectsPage).toContain('class="projects-templates-workspace"');
    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card compact-surface-panel templates-toolbar-card templates-ribbon-shell"');
    expect(projectsPage).toContain('class="templates-ribbon-shell__nav"');
    expect(projectsPage).toContain('data-templates-ribbon-tab="context"');
    expect(projectsPage).toContain('data-templates-ribbon-tab="templates"');
    expect(projectsPage).toContain('data-templates-ribbon-tab="review"');
    expect(projectsPage).toContain('data-templates-ribbon-tab="tools"');
    expect(projectsPage).toContain('data-templates-ribbon-panel="context"');
    expect(projectsPage).toContain('data-templates-ribbon-panel="templates"');
    expect(projectsPage).toContain('data-templates-ribbon-panel="review"');
    expect(projectsPage).toContain('data-templates-ribbon-panel="tools"');
    expect(projectsPage).toContain('class="templates-toolbar-actions"');
    expect(projectsPage).toContain('templates-toolbar-primary-actions--versions');
    expect(projectsPage).toContain('id="templates-review-actions"');
    expect(projectsPage).toContain('id="templates-load-last"');
    expect(projectsPage).toContain('id="templates-fetch-crew-force"');
    expect(projectsPage).toContain('class="templates-preview-shell__header"');
    expect(projectsPage).toContain('id="templates-preview-utilities-shell" hidden');
    expect(projectsPage).toContain('class="templates-toolbar-utilities templates-preview-shell__utilities"');
    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card compact-surface-panel templates-preview-shell"');
    expect(projectsPage).toContain('class="ui-empty-state surface-empty-state templates-preview-empty-state p-6"');
    expect(projectsPage).not.toContain('class="reports-wrapper reports-wrapper--projects reports-wrapper--flush-top"');
    expect(appStyles).toContain('.projects-templates-workspace {');
    expect(appStyles).toContain('.templates-ribbon-shell {');
    expect(appStyles).toContain('--templates-inline-surface:');
    expect(appStyles).toContain('.templates-ribbon-shell__nav {');
    expect(appStyles).toContain('.templates-ribbon-group__content {');
    expect(appStyles).toContain('.templates-command-grid {');
    expect(appStyles).toContain('.templates-toolbar-primary-actions {');
    expect(appStyles).toContain('.templates-preview-shell__inline-tools {');
    expect(appStyles).toContain('.templates-preview-shell__inline-tools-note {');
    expect(appStyles).toContain('.templates-preview-shell__utilities {');
    expect(appStyles).toContain('.templates-preview-shell__frame {');
    expect(reportsStyles).not.toContain('#templates-controls {');
    expect(reportsStyles).not.toContain('.templates-preview-host {');
  });

  it('keeps create-project dark controls and surfaces aligned with the shared approved-page contract', () => {
    const appStyles = readSource('src/styles/app.css');
    const formStyles = readSource('src/styles/forms.css');
    const coreStyles = readSource('src/styles/core.css');
    const projectsForm = readSource('src/scripts/projects/form.js');
    const projectDetailsDisplay = readSource('src/scripts/projects/projectDetails/display.js');
    const enhancedSelectStyles = readSource('src/styles/enhanced-select.css');
    const enhancedSelectScript = readSource('src/scripts/ui/enhancedSelect.js');

    expect(appStyles).toContain('border-color: var(--bo-color-control-border) !important;');
    expect(appStyles).toContain('border-radius: var(--bo-primitive-control-radius) !important;');
    expect(appStyles).toContain('font-size: 0.9rem;');
    expect(appStyles).toContain('font-weight: 400;');
    expect(formStyles).toContain('--project-create-surface: rgba(18, 27, 22, 0.94);');
    expect(formStyles).toContain('--project-create-surface-muted: rgba(16, 25, 21, 0.84);');
    expect(formStyles).toContain('.project-form-card,');
    expect(formStyles).toContain('.project-operational-booking__panel {');
    expect(formStyles).toContain('.project-payment-history-block,');
    expect(formStyles).toContain('.project-expense-list-surface .users-table-wrapper,');
    expect(projectsForm).toContain('class="users-table-wrapper overflow-x-auto project-services-table-wrapper"');
    expect(projectDetailsDisplay).toContain('project-services-table-wrapper project-modal-table-wrapper');
    expect(projectDetailsDisplay).toContain('class="project-services-table-shell"');
    expect(coreStyles).toContain('.project-services-table-wrapper,');
    expect(coreStyles).toContain('.project-services-table {');
    expect(formStyles).toContain('.services-client-total-indicator {');
    expect(formStyles).toContain('background-image: none;');
    expect(formStyles).toContain('box-shadow: none;');
    expect(enhancedSelectStyles).toContain('appearance: none;');
    expect(enhancedSelectStyles).toContain('border-radius: var(--bo-primitive-control-radius) !important;');
    expect(enhancedSelectStyles).toContain('.enhanced-select__trigger.is-placeholder');
    expect(enhancedSelectScript).toContain('trigger.classList.toggle("is-placeholder", isPlaceholder);');
  });

  it('keeps approved report result tables on the shared Level 2 scaffold hooks', () => {
    const dashboardPage = readSource('src/pages/dashboard.html');
    const projectReportsPage = readSource('src/pages/project-reports.html');
    const reportsStyles = readSource('src/styles/reports.css');

    expect(dashboardPage).toContain('class="reports-table-card reports-results-table-card reports-rtl-card reports-table-card--results"');
    expect(dashboardPage).toContain('class="reports-table-wrapper reports-results-table-wrapper users-table-wrapper overflow-x-auto"');
    expect(dashboardPage).toContain('class="reports-table reports-results-table ui-table table table-hover users-table surface-table"');
    expect(projectReportsPage).toContain('class="reports-table-card reports-results-table-card projects-table projects-reports-table-card glass-card ui-card ui-card--content reports-rtl-card"');
    expect(projectReportsPage).toContain('class="users-table-wrapper overflow-x-auto reports-table-wrapper reports-results-table-wrapper"');
    expect(projectReportsPage).toContain('class="ui-table users-table surface-table reports-table reports-results-table table table-hover align-middle"');
    expect(reportsStyles).toContain('.reports-results-table-wrapper {');
    expect(reportsStyles).toContain('.reports-results-table {');
    expect(reportsStyles).toContain('.reports-wrapper--projects .projects-reports-table-card .reports-results-table-wrapper {');
    expect(reportsStyles).not.toContain('.reports-wrapper--projects .projects-reports-table-card .reports-table-wrapper {');
    expect(reportsStyles).toContain('.reports-table-card--results .reports-results-table-wrapper {');
    expect(reportsStyles).not.toContain('.reports-table-card--results .reports-table-wrapper {');
    expect(reportsStyles).toContain('.reports-table-card:not(.reports-table-card--results) .reports-table-wrapper,');
    expect(reportsStyles).toContain('.reports-table-card--results .reports-results-table-wrapper {');
    expect(reportsStyles).toContain('.reports-table-card:not(.reports-table-card--results) .reports-table-wrapper,\n.reports-table-card--results .reports-results-table-wrapper {\n  overflow: auto;');
    expect(reportsStyles).toContain('@media (min-width: 1024px) {\n  .reports-table-card:not(.reports-table-card--results) .reports-table-wrapper,\n  .reports-table-card--results .reports-results-table-wrapper {\n    max-height: 60vh;');
    expect(reportsStyles).toContain('.reports-table-card:not(.reports-table-card--results) .reports-table-wrapper,\n  .reports-table-card--results .reports-results-table-wrapper { max-height: none; overflow: visible; }');
    expect(reportsStyles).toContain('.reports-table-card--results .reports-results-table-wrapper::before {');
  });

  it('keeps the migrated dashboard page on the shared auth-pending reveal contract', () => {
    const dashboardPage = readSource('src/pages/dashboard.html');
    const dashboardScript = readSource('src/main.js');

    expect(dashboardPage).toContain('<!-- @include "./_partials/full-manager-shell.html"');
    expect(dashboardPage).toContain('"pageScript":"/src/main.js"');
    expect(dashboardScript).toContain("document.body?.classList.remove('auth-pending');");
  });
});
