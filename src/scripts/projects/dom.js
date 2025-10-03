import { logout } from '../auth.js';
import { dom } from './state.js';

function getFlatpickrForProjects() {
  if (typeof window !== 'undefined' && typeof window.flatpickr === 'function') {
    return window.flatpickr.bind(window);
  }
  if (typeof globalThis !== 'undefined' && typeof globalThis.flatpickr === 'function') {
    return globalThis.flatpickr.bind(globalThis);
  }
  return null;
}

export function cacheDom() {
  dom.form = document.getElementById('project-form');
  dom.title = document.getElementById('project-title');
  dom.type = document.getElementById('project-type');
  dom.client = document.getElementById('project-client');
  dom.clientSuggestions = document.getElementById('project-customer-suggestions');
  dom.clientCompany = document.getElementById('project-client-company');
  dom.paymentStatus = document.getElementById('project-payment-status');
  dom.startDate = document.getElementById('project-start-date');
  dom.startTime = document.getElementById('project-start-time');
  dom.endDate = document.getElementById('project-end-date');
  dom.endTime = document.getElementById('project-end-time');
  dom.description = document.getElementById('project-description');
  dom.technicianSelect = document.getElementById('project-technician-select');
  dom.addTechnicianBtn = document.getElementById('add-technician-btn');
  dom.technicianList = document.getElementById('project-technician-list');
  dom.equipmentSelect = document.getElementById('project-equipment-select');
  dom.equipmentQty = document.getElementById('project-equipment-qty');
  dom.addEquipmentBtn = document.getElementById('add-equipment-btn');
  dom.equipmentList = document.getElementById('project-equipment-list');
  dom.expenseLabel = document.getElementById('project-expense-label');
  dom.expenseAmount = document.getElementById('project-expense-amount');
  dom.addExpenseBtn = document.getElementById('add-expense-btn');
  dom.expenseList = document.getElementById('project-expense-list');
  dom.taxCheckbox = document.getElementById('project-tax');
  dom.submitBtn = dom.form?.querySelector('[type="submit"]');
  dom.projectsTableBody = document.getElementById('project-table-body');
  dom.projectsCount = document.getElementById('projects-count');
  dom.projectsUpcoming = document.getElementById('projects-upcoming');
  dom.projectsExpenses = document.getElementById('projects-expenses');
  dom.projectsBudget = document.getElementById('projects-budget');
  dom.tableCount = document.getElementById('project-table-count');
  dom.search = document.getElementById('project-search');
  dom.detailsModalEl = document.getElementById('projectDetailsModal');
  dom.detailsBody = document.getElementById('project-details-body');
  dom.tabButtons = Array.from(document.querySelectorAll('.tab-button[data-tab-target]'));
  dom.tabPanes = Array.from(document.querySelectorAll('[data-tab-pane]'));
  dom.projectSubTabButtons = Array.from(document.querySelectorAll('.sub-tab-button[data-project-subtab-target]'));
  dom.projectSubTabPanes = Array.from(document.querySelectorAll('[data-project-subtab]'));
  dom.timeline = document.getElementById('project-timeline');
  dom.focusCards = document.getElementById('project-focus-cards');

  if (dom.detailsModalEl && !dom.detailsModalEl.dataset.projectListenerAttached) {
    dom.detailsModalEl.addEventListener('hidden.bs.modal', () => {
      if (dom.detailsBody) {
        dom.detailsBody.dataset.projectId = '';
      }
    });
    dom.detailsModalEl.dataset.projectListenerAttached = 'true';
  }
}

export function initProjectDatePickers() {
  const fp = getFlatpickrForProjects();
  if (!fp) return;

  const datePickers = [
    ['#project-start-date', { dateFormat: 'Y-m-d' }],
    ['#project-end-date', { dateFormat: 'Y-m-d' }]
  ];

  const timePickers = [
    ['#project-start-time', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      altInput: true,
      altFormat: 'h:i K',
      time_24hr: false,
      defaultHour: 9,
      defaultMinute: 0
    }],
    ['#project-end-time', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      altInput: true,
      altFormat: 'h:i K',
      time_24hr: false,
      defaultHour: 9,
      defaultMinute: 0
    }]
  ];

  [...datePickers, ...timePickers].forEach(([selector, config]) => {
    if (document.querySelector(selector)) {
      fp(selector, config);
    }
  });
}

export function clearProjectDateInputs() {
  ['startDate', 'startTime', 'endDate', 'endTime'].forEach((key) => {
    const input = dom[key];
    if (!input) return;
    if (input._flatpickr) {
      input._flatpickr.clear();
    } else {
      input.value = '';
    }
  });
}

export function bindLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
    logoutBtn.addEventListener('click', () => logout());
    logoutBtn.dataset.listenerAttached = 'true';
  }
}
