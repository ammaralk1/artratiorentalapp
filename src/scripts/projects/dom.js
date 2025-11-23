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
  dom.expenseNote = document.getElementById('project-expense-note');
  dom.addExpenseBtn = document.getElementById('add-expense-btn');
  dom.expenseList = document.getElementById('project-expense-list');
  dom.servicesClientTotalIndicator = document.getElementById('project-services-client-total-indicator');
  dom.servicesClientTotalValue = document.getElementById('project-services-client-total-value');
  dom.discountType = document.getElementById('project-discount-type');
  dom.discountValue = document.getElementById('project-discount');
  dom.servicesClientPrice = document.getElementById('project-services-client-price');
  dom.paymentAddButton = document.getElementById('project-payment-add');
  dom.paymentHistory = document.getElementById('project-payment-history');
  dom.companyShare = document.getElementById('project-company-share');
  dom.paymentProgressType = document.getElementById('project-payment-progress-type');
  dom.paymentProgressValue = document.getElementById('project-payment-progress-value');
  dom.taxCheckbox = document.getElementById('project-tax');
  dom.linkedReservationBtn = document.getElementById('project-linked-reservation-btn');
  dom.submitBtn = dom.form?.querySelector('[type="submit"]');
  dom.projectsTableBody = document.getElementById('project-table-body');
  dom.projectsCount = document.getElementById('projects-count');
  dom.projectsUpcoming = document.getElementById('projects-upcoming');
  dom.projectsExpenses = document.getElementById('projects-expenses');
  dom.projectsBudget = document.getElementById('projects-budget');
  dom.tableCount = document.getElementById('project-table-count');
  dom.search = document.getElementById('project-search');
  dom.filterStatus = document.getElementById('project-filter-status');
  dom.filterPayment = document.getElementById('project-filter-payment');
  dom.filterType = document.getElementById('project-filter-type');
  dom.filterConfirmed = document.getElementById('project-filter-confirmed');
  dom.filterRange = document.getElementById('project-filter-range');
  dom.filterStart = document.getElementById('project-filter-start-date');
  dom.filterEnd = document.getElementById('project-filter-end-date');
  dom.filterReset = document.getElementById('project-filter-reset');
  dom.detailsModalEl = document.getElementById('projectDetailsModal');
  dom.detailsBody = document.getElementById('project-details-body');
  dom.tabButtons = Array.from(document.querySelectorAll('.tab-button[data-tab-target]'));
  dom.tabPanes = Array.from(document.querySelectorAll('[data-tab-pane]'));
  dom.projectSubTabButtons = Array.from(document.querySelectorAll('.sub-tab-button[data-project-subtab-target]'));
  dom.projectSubTabPanes = Array.from(document.querySelectorAll('[data-project-subtab]'));
  dom.timeline = document.getElementById('project-timeline');
  dom.focusCards = document.getElementById('project-focus-cards');
  dom.focusPagination = document.getElementById('project-focus-pagination');

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

  // Disable native browser suggestions/autocomplete on date/time inputs
  ['#project-start-date', '#project-end-date', '#project-start-time', '#project-end-time'].forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) {
      try { el.setAttribute('autocomplete', 'off'); } catch (_) {}
      try { el.setAttribute('autocapitalize', 'off'); } catch (_) {}
      try { el.setAttribute('autocorrect', 'off'); } catch (_) {}
      try { el.setAttribute('spellcheck', 'false'); } catch (_) {}
    }
  });

  const datePickers = [
    ['#project-start-date', { dateFormat: 'Y-m-d', allowInput: true }],
    ['#project-end-date', { dateFormat: 'Y-m-d', allowInput: true }]
  ];

  const filterDatePickers = [
    ['#project-filter-start-date', {
      dateFormat: 'Y-m-d',
      allowInput: true,
      altInput: true,
      altFormat: 'd/m/Y',
      disableMobile: true
    }],
    ['#project-filter-end-date', {
      dateFormat: 'Y-m-d',
      allowInput: true,
      altInput: true,
      altFormat: 'd/m/Y',
      disableMobile: true
    }]
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
      defaultMinute: 0,
      minuteIncrement: 5,
      disableMobile: true,
      allowInput: true,
      altInputClass: 'flatpickr-alt-input form-control'
    }],
    ['#project-end-time', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      altInput: true,
      altFormat: 'h:i K',
      time_24hr: false,
      defaultHour: 9,
      defaultMinute: 0,
      minuteIncrement: 5,
      disableMobile: true,
      allowInput: true,
      altInputClass: 'flatpickr-alt-input form-control'
    }]
  ];

  [...datePickers, ...timePickers].forEach(([selector, config]) => {
    const el = document.querySelector(selector);
    if (el) {
      fp(el, config);
    }
  });

  filterDatePickers.forEach(([selector, config]) => {
    const el = document.querySelector(selector);
    if (el) {
      fp(el, config);
    }
  });

  // Normalize Arabic/Persian numerals to English as user types (including altInput)
  const normalizeNumbers = (str) => {
    if (str === null || str === undefined) return '';
    const arabic = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    const persian = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    const english = ['0','1','2','3','4','5','6','7','8','9'];
    return String(str).split('').map((ch) => {
      const ai = arabic.indexOf(ch);
      if (ai > -1) return english[ai];
      const pi = persian.indexOf(ch);
      if (pi > -1) return english[pi];
      return ch;
    }).join('');
  };

  const attachNumericNormalization = (inputEl) => {
    if (!inputEl || inputEl.dataset.normalizedDigits === 'true') return;
    const handler = () => {
      const prev = inputEl.value || '';
      const normalized = normalizeNumbers(prev);
      if (normalized !== prev) {
        const start = inputEl.selectionStart;
        const end = inputEl.selectionEnd;
        inputEl.value = normalized;
        try {
          if (typeof start === 'number' && typeof end === 'number') {
            const delta = normalized.length - prev.length;
            inputEl.setSelectionRange(Math.max(0, start + delta), Math.max(0, end + delta));
          }
        } catch (_) {}
      }
    };
    inputEl.addEventListener('input', handler);
    inputEl.addEventListener('blur', handler);
    try { inputEl.setAttribute('inputmode', 'numeric'); } catch (_) {}
    inputEl.dataset.normalizedDigits = 'true';
  };

  // Base inputs
  attachNumericNormalization(dom.startDate);
  attachNumericNormalization(dom.endDate);
  attachNumericNormalization(dom.startTime);
  attachNumericNormalization(dom.endTime);
  // Flatpickr alt inputs (time)
  if (dom.startTime && dom.startTime._flatpickr?.altInput) {
    attachNumericNormalization(dom.startTime._flatpickr.altInput);
  }
  if (dom.endTime && dom.endTime._flatpickr?.altInput) {
    attachNumericNormalization(dom.endTime._flatpickr.altInput);
  }

  // Commit typed time on blur: if user clicks outside, persist the typed value
  const commitTimeOnBlur = (inputEl) => {
    if (!inputEl) return;
    const inst = inputEl._flatpickr;
    const commit = () => {
      try {
        if (!inst) return;
        const srcAlt = inst.altInput && typeof inst.altInput.value === 'string' ? inst.altInput.value.trim() : '';
        const srcBase = typeof inputEl.value === 'string' ? inputEl.value.trim() : '';
        const src = srcAlt || srcBase;
        if (!src) return;
        // Parse using the appropriate format then set to ensure base value updates
        const fmt = srcAlt ? inst.config.altFormat : inst.config.dateFormat;
        const dateObj = inst.parseDate(src, fmt) || inst.parseDate(src);
        if (dateObj) {
          inst.setDate(dateObj, true);
        }
      } catch (_) { /* noop */ }
    };
    // Blur on base and alt inputs
    inputEl.addEventListener('blur', commit);
    if (inst?.altInput) {
      inst.altInput.addEventListener('blur', commit);
    }
  };

  commitTimeOnBlur(dom.startTime);
  commitTimeOnBlur(dom.endTime);
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
