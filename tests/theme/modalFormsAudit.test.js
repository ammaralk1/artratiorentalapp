import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function read(relativePath) {
  return readFileSync(resolve(process.cwd(), relativePath), 'utf8');
}

describe('modal and forms surface audit', () => {
  it('keeps projects templates markup free of targeted inline presentation styles', () => {
    const projectsPage = read('src/pages/projects.html');

    expect(projectsPage).not.toContain('id="templates-save-title" class="form-control" placeholder="اسم النسخة" style=');
    expect(projectsPage).not.toContain('id="templates-actions-menu" class="shadow-sm" style=');
    expect(projectsPage).not.toContain('id="templates-preview-host" style=');
    expect(projectsPage).toContain('class="projects-templates-workspace"');
    expect(projectsPage).toContain('class="templates-ribbon-shell__nav"');
    expect(projectsPage).toContain('class="ui-input form-control templates-save-title"');
    expect(projectsPage).toContain('templates-toolbar-primary-actions--versions');
    expect(projectsPage).toContain('class="templates-ribbon-group templates-ribbon-group--library"');
    expect(projectsPage).toContain('class="templates-ribbon-group templates-ribbon-group--alignment"');
    expect(projectsPage).toContain('id="templates-print-preview"');
    expect(projectsPage).toContain('id="templates-fetch-crew"');
    expect(projectsPage).toContain('class="templates-preview-shell__header"');
    expect(projectsPage).toContain('id="templates-preview-utilities-shell" hidden');
    expect(projectsPage).toContain('class="templates-preview-host"');
  });

  it('keeps dashboard modal markup free of targeted inline layout styles', () => {
    const dashboardPage = read('src/pages/dashboard.html');

    expect(dashboardPage).toContain('id="equipment-back-to-top" class="back-to-top-btn"');
    expect(dashboardPage).toContain('id="reports-table-skeleton" aria-hidden="true" hidden');
    expect(dashboardPage).toContain('class="equipment-details-header__badges"');
    expect(dashboardPage).toContain('class="technician-picker-col-index"');
    expect(dashboardPage).toContain('class="technician-picker-col-actions"');
    expect(dashboardPage).not.toContain('equipment-back-to-top" class="back-to-top-btn" type="button" aria-label="العودة إلى أعلى الصفحة" title="⬆️ للأعلى" data-i18n data-i18n-aria-label-key="equipment.backToTop.ariaLabel" data-i18n-title-key="equipment.backToTop.title" style=');
    expect(dashboardPage).not.toContain('id="reports-table-skeleton" aria-hidden="true" style=');
    expect(dashboardPage).not.toContain('class="equipment-details-header__badges" style=');
    expect(dashboardPage).not.toContain('<th style="width:40px;">#</th>');
    expect(dashboardPage).not.toContain('style="width:48px;"');
  });

  it('keeps shared reservation and close modals on the modal-close button contract', () => {
    const dashboardPage = read('src/pages/dashboard.html');
    const projectsPage = read('src/pages/projects.html');
    const customerPage = read('src/pages/customer.html');
    const technicianPage = read('src/pages/technician.html');

    expect(projectsPage).toContain('class="btn modal-close-btn" data-bs-dismiss="modal" data-i18n data-i18n-key="actions.close">إغلاق</button>');
    expect(projectsPage).toContain('class="ui-button ui-button--outline btn btn-outline" id="close-project-cancel"');
    expect(customerPage).toContain('class="btn modal-close-btn" data-bs-dismiss="modal" data-i18n data-i18n-key="actions.close">إغلاق</button>');
    expect(technicianPage).toContain('class="btn modal-close-btn" data-bs-dismiss="modal" data-i18n data-i18n-key="actions.close">إغلاق</button>');
    expect(dashboardPage).toContain('class="btn modal-close-btn" id="close-reservation-cancel"');
    expect(projectsPage).not.toContain('class="btn btn-secondary" data-bs-dismiss="modal" data-i18n data-i18n-key="actions.close">إغلاق</button>');
    expect(customerPage).not.toContain('class="btn btn-secondary" data-bs-dismiss="modal" data-i18n data-i18n-key="actions.close">إغلاق</button>');
    expect(technicianPage).not.toContain('class="btn btn-secondary" data-bs-dismiss="modal" data-i18n data-i18n-key="actions.close">إغلاق</button>');
  });

  it('keeps reservation details modals on the shared reservation shell contract across locked pages', () => {
    const dashboardPage = read('src/pages/dashboard.html');
    const projectsPage = read('src/pages/projects.html');
    const customerPage = read('src/pages/customer.html');
    const technicianPage = read('src/pages/technician.html');
    const runtimeModals = read('src/scripts/reservations/modals.js');

    for (const source of [dashboardPage, projectsPage, customerPage, technicianPage, runtimeModals]) {
      expect(source).toContain('class="modal fade customer-edit-modal reservation-shell-modal" id="reservationDetailsModal"');
      expect(source).toContain('class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable customer-edit-modal__dialog reservation-shell-modal__dialog"');
      expect(source).toContain('class="ui-modal__content modal-content customer-edit-modal__content reservation-shell-modal__content"');
      expect(source).toContain('class="ui-modal__body modal-body customer-edit-modal__body reservation-shell-modal__body" id="reservation-details-body"');
      expect(source).toContain('class="ui-modal__footer modal-footer customer-edit-modal__footer reservation-shell-modal__footer"');
    }
  });

  it('keeps reservation modal item tables on the shared reservation modal table contract', () => {
    const dashboardPage = read('src/pages/dashboard.html');
    const reservationDetails = read('src/scripts/reservations/list/details.js');
    const runtimeModals = read('src/scripts/reservations/modals.js');
    const reservationStyles = read('src/styles/reservations.css');

    expect(reservationDetails).toContain('class="table-responsive reservation-modal-table-shell reservation-modal-items-wrapper"');
    expect(reservationDetails).toContain('class="table table-sm table-hover align-middle reservation-modal-table reservation-modal-items-table"');

    for (const source of [dashboardPage, runtimeModals]) {
      expect(source).toContain('class="table-responsive reservation-modal-table-shell reservation-edit-items-wrapper users-table-wrapper overflow-x-auto"');
      expect(source).toContain('class="table table-sm table-hover align-middle reservation-modal-table reservation-items-table"');
    }

    expect(reservationStyles).toContain('.reservation-modal-table-shell {');
    expect(reservationStyles).toContain('.reservation-modal-table {');
    expect(reservationStyles).not.toContain('.reservation-modal-items-wrapper.table-responsive,\n.reservation-modal-items-wrapper .table-responsive,\n#editReservationModal .table-responsive');
  });

  it('keeps reservation and project payment-history tables on the shared payment-history table contract', () => {
    const reservationEditForm = read('src/scripts/reservations/editForm.js');
    const projectForm = read('src/scripts/projects/form.js');
    const projectPayment = read('src/scripts/projects/projectDetails/payment.js');
    const reservationStyles = read('src/styles/reservations.css');

    expect(reservationEditForm).toContain('class="reservation-payment-history-table-shell"');
    expect(reservationEditForm).toContain('class="table table-sm reservation-payment-history-table"');
    expect(projectForm).toContain('class="reservation-payment-history-table-shell"');
    expect(projectForm).toContain('class="table table-sm reservation-payment-history-table"');
    expect(projectPayment).toContain('project-modal-table-wrapper reservation-payment-history-table-shell');
    expect(projectPayment).toContain('align-middle reservation-payment-history-table');
    for (const source of [reservationEditForm, projectForm, projectPayment]) {
      expect(source).not.toContain('reservation-payment-history__table-wrapper');
      expect(source).not.toContain('reservation-payment-history-table-wrapper');
      expect(source).not.toContain('reservation-payment-history__table ');
      expect(source).not.toContain('reservation-payment-history__table--readonly');
    }
    expect(reservationStyles).toContain('.reservation-payment-history-table-shell {');
    expect(reservationStyles).toContain('.reservation-payment-history-table {');
  });

  it('keeps crew picker assignment tables on the shared crew table contract', () => {
    const dashboardPage = read('src/pages/dashboard.html');
    const runtimeModals = read('src/scripts/reservations/modals.js');
    const tabsStyles = read('src/styles/tabs.css');

    for (const source of [dashboardPage, runtimeModals]) {
      expect(source).toContain('class="users-table-wrapper overflow-x-auto crew-assignment-table-shell"');
      expect(source).toContain('class="ui-table table table-hover users-table surface-table crew-assignment-table align-middle" id="crew-assignment-table"');
      expect(source).not.toContain('crew-assignment-table-wrapper');
      expect(source).not.toContain('crew-picker-table-wrapper');
    }

    expect(tabsStyles).toContain('.crew-assignment-table-shell {');
    expect(tabsStyles).toContain('.crew-assignment-table-shell .crew-assignment-table {');
  });

  it('keeps the templates actions renderer free of targeted cssText injection', () => {
    const templatesTab = read('src/scripts/projects/templatesTab.js');
    const templatesLifecycle = read('src/scripts/projects/templatesTab/lifecycle.ts');
    const templatesPdf = read('src/scripts/projects/templatesTab/pdf.ts');
    const appCss = read('src/styles/app.css');
    const templatesCss = read('src/styles/templatesA4.css');
    const tabsCss = read('src/styles/tabs.css');

    expect(templatesTab).not.toContain("style.cssText = 'display:block;width:100%;text-align:right;margin:4px 0;'");
    expect(templatesTab).not.toContain("sep.style.cssText = 'height:1px;background:#e5e7eb;margin:6px 0'");
    expect(templatesLifecycle).toContain('createTemplatesMenuButton');
    expect(templatesPdf).not.toContain('style="display:flex; flex-wrap:wrap; gap:8px; align-items:flex-end;"');
    expect(templatesPdf).not.toContain("panel.style.display = 'none'");
    expect(templatesPdf).toContain("panel.className = 'templates-pdf-tuner';");
    expect(templatesLifecycle).toContain("ui-button ui-button--outline btn btn-outline templates-actions-menu__button");
    expect(appCss).toContain('.templates-actions-menu__button {');
    expect(appCss).toContain('.templates-preview-host {');
    expect(appCss).toContain('.tpl-zoom-controls {');
    expect(appCss).toContain('.templates-pdf-tuner {');
    expect(templatesCss).not.toContain('.tpl-zoom-controls {');
    expect(tabsCss).toContain('.technician-picker-col-index');
    expect(appCss).toContain('.equipment-details-header__badges');
  });
});
