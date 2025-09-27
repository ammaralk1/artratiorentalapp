import { applyStoredTheme, initThemeToggle } from './theme.js';
import { migrateOldData, loadData } from './storage.js';
import { checkAuth, logout } from './auth.js';
import { showToast, normalizeNumbers, generateProjectCode } from './utils.js';
import { t, getCurrentLanguage } from './language.js';
import { isReservationCompleted, normalizeText } from './reservationsShared.js';
import { registerReservationGlobals } from './reservations/controller.js';
import { calculateReservationTotal } from './reservationsSummary.js';
import { updatePreferences } from './preferencesService.js';
import {
  ensureProjectsLoaded,
  getProjectsState,
  refreshProjectsFromApi,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
  buildProjectPayload,
  isApiError as isProjectApiError,
} from './projectsService.js';
import { ensureReservationsLoaded } from './reservationsActions.js';
import {
  getReservationsState,
  refreshReservationsFromApi,
  updateReservationApi,
  isApiError as isReservationApiError,
} from './reservationsService.js';

applyStoredTheme();
migrateOldData();
checkAuth();
registerReservationGlobals();

const state = {
  customers: [],
  technicians: [],
  equipment: [],
  reservations: [],
  projects: [],
  selectedTechnicians: [],
  selectedEquipment: [],
  expenses: [],
  filters: {
    search: ''
  },
  visibleProjects: [],
  editingProjectId: null
};

const dom = {};
const PENDING_PROJECT_DETAIL_KEY = 'pendingProjectDetailId';
const ONE_HOUR_IN_MS = 60 * 60 * 1000;
const PROJECT_TAX_RATE = 0.15;
const MAX_FOCUS_CARDS = 6;
const PROJECT_MAIN_TAB_STORAGE_KEY = 'projects.activeTab';
const PROJECT_SUB_TAB_STORAGE_KEY = 'projects.activeSubTab';
const PROJECT_SUB_TAB_ALIASES = {
  create: 'create-project-tab',
  list: 'projects-list-tab'
};

function getProjectStartTimestamp(project) {
  if (!project?.start) return Number.NaN;
  const timestamp = new Date(project.start).getTime();
  return Number.isFinite(timestamp) ? timestamp : Number.NaN;
}

function getProjectCreatedTimestamp(project) {
  if (project?.createdAt) {
    const created = new Date(project.createdAt).getTime();
    if (Number.isFinite(created)) return created;
  }
  const startTime = getProjectStartTimestamp(project);
  if (Number.isFinite(startTime)) return startTime;
  return Number.NEGATIVE_INFINITY;
}

function combineProjectDateTime(dateValue, timeValue) {
  if (!dateValue) return '';
  const normalizedTime = (timeValue && /\d{1,2}:\d{2}/.test(timeValue)) ? timeValue : '00:00';
  const [hours = '00', minutes = '00'] = normalizedTime.split(':');
  const safeHours = hours.padStart(2, '0');
  const safeMinutes = minutes.padStart(2, '0');
  return `${dateValue}T${safeHours}:${safeMinutes}`;
}

function clearProjectDateInputs() {
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

function getFlatpickrForProjects() {
  if (typeof window !== 'undefined' && typeof window.flatpickr === 'function') {
    return window.flatpickr.bind(window);
  }
  if (typeof globalThis !== 'undefined' && typeof globalThis.flatpickr === 'function') {
    return globalThis.flatpickr.bind(globalThis);
  }
  return null;
}

function initProjectDatePickers() {
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

document.addEventListener('DOMContentLoaded', () => {
  cacheDom();
  refreshProjectSubmitButton();
  initProjectDatePickers();
  initThemeToggle();
  initTabNavigation();
  initProjectSubTabs();
  bindLogout();
  bindFormEvents();
  bindExpenseEvents();
  bindSelectionEvents();
  bindSelectionRemovalEvents();
  bindTableEvents();
  bindFocusCards();
  openPendingProjectDetail();
  initializeProjectsData();
});

document.addEventListener('language:changed', () => {
  populateSelects();
  renderSelections();
  renderProjects();
  updateSummary();
  renderFocusCards();
  refreshProjectSubmitButton();
});

document.addEventListener('language:translationsReady', () => {
  populateSelects();
  renderSelections();
  renderProjects();
  updateSummary();
  renderFocusCards();
  refreshProjectSubmitButton();
});

document.addEventListener('customers:changed', handleCustomersChanged);
document.addEventListener('technicians:updated', handleTechniciansUpdated);
document.addEventListener('reservations:changed', handleReservationsChanged);

async function initializeProjectsData() {
  try {
    await ensureReservationsLoaded({ suppressError: true });
    await refreshProjectsFromApi();
  } catch (error) {
    console.error('❌ [projects] Failed to initialise projects data', error);
    if (isProjectApiError(error)) {
      showToast(error.message, 'error');
    } else {
      showToast(t('projects.toast.fetchFailed', 'تعذر تحميل بيانات المشاريع، حاول لاحقًا'), 'error');
    }
  } finally {
    loadAllData();
  }
}

function cacheDom() {
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

function persistStorageValue(key, value) {
  if (!key) return;
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    /* ignore storage errors */
  }
}

function readStorageValue(key) {
  if (!key) return '';
  try {
    return window.localStorage.getItem(key) || '';
  } catch (error) {
    return '';
  }
}

function persistActiveMainTab(tabId) {
  if (!tabId) return;
  persistStorageValue(PROJECT_MAIN_TAB_STORAGE_KEY, tabId);
}

function getStoredActiveMainTab() {
  return readStorageValue(PROJECT_MAIN_TAB_STORAGE_KEY);
}

function persistActiveSubTab(tabId) {
  if (!tabId) return;
  persistStorageValue(PROJECT_SUB_TAB_STORAGE_KEY, tabId);
}

function getStoredActiveSubTab() {
  return readStorageValue(PROJECT_SUB_TAB_STORAGE_KEY);
}

function resolveSubTabFromValue(value) {
  if (!value) return '';
  const normalized = String(value).trim();
  if (!normalized) return '';
  const aliasKey = normalized.toLowerCase();
  if (PROJECT_SUB_TAB_ALIASES[aliasKey]) {
    return PROJECT_SUB_TAB_ALIASES[aliasKey];
  }
  if (value in PROJECT_SUB_TAB_ALIASES) {
    return PROJECT_SUB_TAB_ALIASES[value];
  }
  if (!dom.projectSubTabButtons || !dom.projectSubTabButtons.length) {
    return normalized;
  }
  const exists = dom.projectSubTabButtons.some((btn) => btn.dataset.projectSubtabTarget === normalized);
  return exists ? normalized : '';
}

function getUrlRequestedSubTab() {
  if (typeof window === 'undefined') return '';
  const { hash, search } = window.location;

  if (hash) {
    const rawHash = hash.replace('#', '').trim();
    if (rawHash) {
      if (rawHash.toLowerCase().startsWith('tab=')) {
        const [, value] = rawHash.split('=');
        const resolvedFromHashParam = resolveSubTabFromValue(value);
        if (resolvedFromHashParam) return resolvedFromHashParam;
      }
      const resolvedFromHash = resolveSubTabFromValue(rawHash);
      if (resolvedFromHash) return resolvedFromHash;
    }
  }

  try {
    const params = new URLSearchParams(search || '');
    const paramValue = params.get('tab');
    if (paramValue) {
      const resolvedFromParam = resolveSubTabFromValue(paramValue);
      if (resolvedFromParam) return resolvedFromParam;
    }
  } catch (error) {
    /* ignore malformed search params */
  }

  return '';
}

function ensureProjectCodes() {
  if (!Array.isArray(state.projects) || state.projects.length === 0) return;
  let mutated = false;

  const projectsWithCodes = state.projects.map((project) => {
    if (project.projectCode) return project;
    const projectCode = generateProjectCode();
    mutated = true;
    return { ...project, projectCode };
  });

  if (!mutated) return;

  state.projects = projectsWithCodes;
}

function initTabNavigation() {
  if (!dom.tabButtons || !dom.tabButtons.length) return;

  dom.tabButtons.forEach((button) => {
    if (button.dataset.listenerAttached) return;

    button.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = button.dataset.tabTarget;
      if (!targetId) return;
      activateTab(targetId, button);
      if (targetId === 'customers-section') {
        document.dispatchEvent(new CustomEvent('customers:refreshRequested'));
      } else if (targetId === 'technicians-section') {
        document.dispatchEvent(new CustomEvent('technicians:refreshRequested'));
      }
    });

    button.dataset.listenerAttached = 'true';
  });

  const storedTabId = getStoredActiveMainTab();
  const storedButton = dom.tabButtons.find((btn) => btn.dataset.tabTarget === storedTabId);
  const defaultActiveButton = dom.tabButtons.find((btn) => btn.classList.contains('active'));
  const fallbackButton = storedButton || defaultActiveButton || dom.tabButtons[0];

  if (fallbackButton) {
    const targetId = fallbackButton.dataset.tabTarget;
    if (targetId) {
      activateTab(targetId, fallbackButton);
    }
  }
}

function activateTab(targetId, triggerButton) {
  dom.tabButtons.forEach((btn) => {
    btn.classList.toggle('active', btn === triggerButton);
  });

  if (targetId) {
    persistActiveMainTab(targetId);
  }

  if (!dom.tabPanes || !dom.tabPanes.length) return;

  dom.tabPanes.forEach((pane) => {
    const isTarget = pane.id === targetId;
    pane.classList.toggle('d-none', !isTarget);
    pane.classList.toggle('active', isTarget);
  });

  if (targetId === 'projects-section') {
    restoreProjectSubTab();
  }
}

function initProjectSubTabs() {
  if (!dom.projectSubTabButtons || !dom.projectSubTabButtons.length) return;

  dom.projectSubTabButtons.forEach((button) => {
    if (button.dataset.listenerAttached) return;

    button.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = button.dataset.projectSubtabTarget;
      if (!targetId) return;
      activateProjectSubTab(targetId, button);
    });

    button.dataset.listenerAttached = 'true';
  });
}

function getProjectTypeLabel(type) {
  if (!type) return t('projects.form.types.unknown', 'نوع غير محدد');
  const key = {
    commercial: 'projects.form.types.commercial',
    coverage: 'projects.form.types.coverage',
    photography: 'projects.form.types.photography',
    social: 'projects.form.types.social'
  }[type] || 'projects.form.types.unknown';
  return t(key, type);
}

function setProjectClientCompany(customer) {
  if (!dom.clientCompany) return;
  const company = customer?.companyName || customer?.company || '';
  dom.clientCompany.value = company;
}

function activateProjectSubTab(targetId, triggerButton) {
  dom.projectSubTabButtons.forEach((btn) => {
    btn.classList.toggle('active', btn === triggerButton);
  });

  if (!dom.projectSubTabPanes || !dom.projectSubTabPanes.length) return;

  dom.projectSubTabPanes.forEach((pane) => {
    const isTarget = pane.id === targetId;
    pane.classList.toggle('d-none', !isTarget);
    pane.classList.toggle('active', isTarget);
  });

  if (targetId) {
    persistActiveSubTab(targetId);
  }

  if (targetId === 'projects-list-tab') {
    renderProjects();
    if (dom.search) {
      window.requestAnimationFrame(() => dom.search?.focus());
    }
  } else if (targetId === 'create-project-tab') {
    renderFocusCards();
  }
}

function restoreProjectSubTab() {
  if (!dom.projectSubTabButtons || !dom.projectSubTabButtons.length) return;
  const urlRequestedSubTab = getUrlRequestedSubTab();
  const storedSubTabId = getStoredActiveSubTab();
  const preferredSubTabId = urlRequestedSubTab || storedSubTabId;

  const preferredButton = preferredSubTabId
    ? dom.projectSubTabButtons.find((btn) => btn.dataset.projectSubtabTarget === preferredSubTabId)
    : null;
  const defaultActiveButton = dom.projectSubTabButtons.find((btn) => btn.classList.contains('active'));
  const fallbackButton = preferredButton || defaultActiveButton || dom.projectSubTabButtons[0];

  if (!fallbackButton) return;
  const targetId = fallbackButton.dataset.projectSubtabTarget;
  if (targetId) {
    if (urlRequestedSubTab && urlRequestedSubTab !== storedSubTabId) {
      persistActiveSubTab(targetId);
    }
    activateProjectSubTab(targetId, fallbackButton);
  }
}

function bindLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
    logoutBtn.addEventListener('click', () => logout());
    logoutBtn.dataset.listenerAttached = 'true';
  }
}

function loadAllData() {
  const { customers, technicians, equipment } = loadData();
  state.customers = Array.isArray(customers) ? customers : [];
  state.technicians = Array.isArray(technicians) ? technicians : [];
  state.equipment = Array.isArray(equipment) ? equipment : [];
  state.reservations = getReservationsState();
  state.projects = getProjectsState();

  ensureProjectCodes();

  populateSelects();
  renderSelections();
  renderProjects();
  updateSummary();
  renderFocusCards();
}

function populateSelects() {
  refreshProjectClientField();

  if (dom.technicianSelect) {
    const previousValue = dom.technicianSelect.value;
    const defaultOption = escapeHtml(t('projects.form.selectTechnician', 'اختر عضو الطاقم'));
    dom.technicianSelect.innerHTML = `<option value="">${defaultOption}</option>` +
      state.technicians
        .map((tech) => {
          const fallbackTemplate = t('projects.fallback.technicianName', 'عضو {id}');
          const name = tech.name || fallbackTemplate.replace('{id}', normalizeNumbers(String(tech.id || '')));
          return `<option value="${tech.id}">${escapeHtml(name)}</option>`;
        })
        .join('');
    if (previousValue) {
      dom.technicianSelect.value = previousValue;
    }
  }

  if (dom.equipmentSelect) {
    const previousValue = dom.equipmentSelect.value;
    const defaultOption = escapeHtml(t('projects.form.selectEquipment', 'اختر المعدة'));
    dom.equipmentSelect.innerHTML = `<option value="">${defaultOption}</option>` +
      state.equipment
        .map((item) => {
          const name = item.desc || item.description || item.name || t('projects.fallback.unknownEquipment', 'معدة');
          return `<option value="${escapeHtml(item.barcode || '')}">${escapeHtml(name)}</option>`;
        })
        .join('');
    if (previousValue) {
      dom.equipmentSelect.value = previousValue;
    }
  }
}

function refreshProjectClientField() {
  if (!dom.client) return;
  setupProjectCustomerAutocomplete();

  const selectedId = dom.client.dataset?.customerId;
  if (selectedId) {
    const customer = state.customers.find((cust) => String(cust.id) === String(selectedId));
    if (customer) {
      setProjectClientCompany(customer);
    } else {
      dom.client.dataset.customerId = '';
      setProjectClientCompany(null);
    }
  } else {
    setProjectClientCompany(null);
  }

  if (document.activeElement === dom.client) {
    renderProjectCustomerSuggestions();
  }
}

function setupProjectCustomerAutocomplete() {
  if (!dom.client || !dom.clientSuggestions) return;
  if (dom.client.dataset.autocompleteAttached === 'true') return;

  dom.client.addEventListener('input', () => {
    dom.client.dataset.customerId = '';
    renderProjectCustomerSuggestions();
    setProjectClientCompany(null);
  });

  dom.client.addEventListener('focus', () => {
    renderProjectCustomerSuggestions();
  });

  dom.client.addEventListener('blur', () => {
    window.setTimeout(() => clearProjectCustomerSuggestions(), 150);
  });

  dom.client.dataset.autocompleteAttached = 'true';
}

function clearProjectCustomerSuggestions() {
  if (!dom.clientSuggestions) return;
  dom.clientSuggestions.style.display = 'none';
  dom.clientSuggestions.innerHTML = '';
}

function renderProjectCustomerSuggestions() {
  if (!dom.client || !dom.clientSuggestions) return;

  const options = getProjectCustomerOptions();
  const searchValue = normalizeText(dom.client.value || '');
  const matches = !searchValue
    ? options.slice(0, 10)
    : options.filter((option) => {
        const nameMatch = normalizeText(option.name).includes(searchValue);
        const companyMatch = normalizeText(option.company || '').includes(searchValue);
        return nameMatch || companyMatch;
      }).slice(0, 10);

  if (!matches.length) {
    clearProjectCustomerSuggestions();
    return;
  }

  dom.clientSuggestions.innerHTML = matches
    .map((option) => {
      const companyLine = option.company
        ? `<div class="suggestion-item__meta">${escapeHtml(option.company)}</div>`
        : '';
      return `
        <div class="suggestion-item" data-id="${escapeHtml(String(option.id))}" data-name="${escapeHtml(option.name)}" data-company="${escapeHtml(option.company || '')}">
          <div class="suggestion-item__primary">${escapeHtml(option.name)}</div>
          ${companyLine}
        </div>
      `;
    })
    .join('');
  dom.clientSuggestions.style.display = 'block';

  dom.clientSuggestions.querySelectorAll('.suggestion-item').forEach((item) => {
    item.addEventListener('mousedown', (event) => {
      event.preventDefault();
      const { id, name } = event.currentTarget.dataset;
      if (dom.client) {
        dom.client.value = name || '';
        dom.client.dataset.customerId = id || '';
      }
      const company = event.currentTarget.dataset.company || '';
      setProjectClientCompany({ companyName: company });
      clearProjectCustomerSuggestions();
    });
  });
}

function getProjectCustomerOptions() {
  if (!Array.isArray(state.customers)) return [];
  return state.customers
    .map((customer) => {
      const name = (customer.customerName || customer.name || '').trim();
      if (!name) return null;
      return {
        id: customer.id,
        name,
        company: (customer.companyName || customer.company || '').trim()
      };
    })
    .filter(Boolean);
}

function resolveProjectCustomer(inputValue, selectedId = '') {
  if (!Array.isArray(state.customers) || state.customers.length === 0) return null;

  if (selectedId) {
    const byId = state.customers.find((customer) => String(customer.id) === String(selectedId));
    if (byId) {
      return byId;
    }
  }

  const normalizedInput = normalizeText(inputValue || '');
  if (!normalizedInput) return null;

  const exactMatch = state.customers.find((customer) => normalizeText(customer.customerName || customer.name || '') === normalizedInput);
  if (exactMatch) {
    return exactMatch;
  }

  return state.customers.find((customer) => normalizeText(customer.customerName || customer.name || '').includes(normalizedInput)) || null;
}

function bindFormEvents() {
  if (dom.form && !dom.form.dataset.listenerAttached) {
    dom.form.addEventListener('submit', handleSubmitProject);
    dom.form.dataset.listenerAttached = 'true';
  }

  if (dom.form && !dom.form.dataset.resetListenerAttached) {
    dom.form.addEventListener('reset', () => {
      if (dom.client) {
        dom.client.dataset.customerId = '';
      }
      clearProjectCustomerSuggestions();
      clearProjectDateInputs();
      if (dom.type) {
        dom.type.value = '';
      }
      setProjectClientCompany(null);
      resetProjectFormState();
    });
    dom.form.dataset.resetListenerAttached = 'true';
  }

  if (dom.search && !dom.search.dataset.listenerAttached) {
    dom.search.addEventListener('input', () => {
      state.filters.search = normalizeNumbers(dom.search.value || '').trim().toLowerCase();
      renderProjects();
    });
    dom.search.dataset.listenerAttached = 'true';
  }
}

function resetProjectFormState() {
  state.selectedTechnicians = [];
  state.selectedEquipment = [];
  state.expenses = [];
  state.editingProjectId = null;
  if (dom.form) {
    delete dom.form.dataset.editingId;
    dom.form.dataset.mode = 'create';
  }
  renderSelections();
  if (dom.expenseLabel) dom.expenseLabel.value = '';
  if (dom.expenseAmount) dom.expenseAmount.value = '';
  if (dom.taxCheckbox) dom.taxCheckbox.checked = false;
  if (dom.paymentStatus) dom.paymentStatus.value = 'unpaid';
  refreshProjectSubmitButton();
}

function bindSelectionEvents() {
  if (dom.addTechnicianBtn && !dom.addTechnicianBtn.dataset.listenerAttached) {
    dom.addTechnicianBtn.addEventListener('click', handleAddTechnician);
    dom.addTechnicianBtn.dataset.listenerAttached = 'true';
  }

  if (dom.addEquipmentBtn && !dom.addEquipmentBtn.dataset.listenerAttached) {
    dom.addEquipmentBtn.addEventListener('click', handleAddEquipment);
    dom.addEquipmentBtn.dataset.listenerAttached = 'true';
  }
}

function bindSelectionRemovalEvents() {
  attachRemovalListener(dom.technicianList, (target) => {
    if (target.matches('[data-action="remove-technician"]')) {
      const id = target.dataset.id;
      state.selectedTechnicians = state.selectedTechnicians.filter((techId) => techId !== id);
      renderTechnicianChips();
    }
  });

  attachRemovalListener(dom.equipmentList, (target) => {
    if (target.matches('[data-action="remove-equipment"]')) {
      const barcode = target.dataset.id;
      state.selectedEquipment = state.selectedEquipment.filter((item) => item.barcode !== barcode);
      renderEquipmentChips();
    }
  });

  attachRemovalListener(dom.expenseList, (target) => {
    if (target.matches('[data-action="remove-expense"]')) {
      const expenseId = target.dataset.id;
      state.expenses = state.expenses.filter((item) => String(item.id) !== String(expenseId));
      renderExpenseList();
      updateSummary();
    }
  });
}

function attachRemovalListener(container, handler) {
  if (!container || container.dataset.listenerAttached) return;
  container.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    handler(target);
  });
  container.dataset.listenerAttached = 'true';
}

function bindExpenseEvents() {
  if (dom.addExpenseBtn && !dom.addExpenseBtn.dataset.listenerAttached) {
    dom.addExpenseBtn.addEventListener('click', handleAddExpense);
    dom.addExpenseBtn.dataset.listenerAttached = 'true';
  }

  if (dom.expenseAmount && !dom.expenseAmount.dataset.normalizeAttached) {
    dom.expenseAmount.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      const cursorPosition = input.selectionStart;
      const normalized = normalizeNumbers(input.value || '');
      input.value = normalized;
      if (cursorPosition != null) {
        const newPos = Math.min(normalized.length, cursorPosition);
        input.setSelectionRange(newPos, newPos);
      }
    });
    dom.expenseAmount.dataset.normalizeAttached = 'true';
  }
}

function bindTableEvents() {
  if (!dom.projectsTableBody || dom.projectsTableBody.dataset.listenerAttached) return;

  dom.projectsTableBody.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('[data-action="view-details"]')) {
      const projectId = target.dataset.id;
      openProjectDetails(projectId);
      return;
    }

    if (target.matches('[data-action="delete-project"]')) {
      const projectId = target.dataset.id;
      removeProject(projectId);
    }
  });

  dom.projectsTableBody.dataset.listenerAttached = 'true';
}

function handleCustomersChanged() {
  const { customers } = loadData();
  state.customers = Array.isArray(customers) ? customers : [];
  populateSelects();
  renderProjects();
  renderFocusCards();
}

function handleTechniciansUpdated() {
  const { technicians } = loadData();
  state.technicians = Array.isArray(technicians) ? technicians : [];
  populateSelects();
  renderProjects();
  renderFocusCards();
}

function handleReservationsChanged() {
  const { reservations } = loadData();
  state.reservations = Array.isArray(reservations) ? reservations : [];
  renderProjects();

  const isModalOpen = dom.detailsModalEl && dom.detailsModalEl.classList.contains('show');
  const currentProjectId = dom.detailsBody?.dataset.projectId;
  if (isModalOpen && currentProjectId) {
    const projectExists = state.projects.find((project) => String(project.id) === String(currentProjectId));
    if (projectExists) {
      openProjectDetails(currentProjectId);
    }
  }
}

function getReservationsForProject(projectId) {
  if (!projectId) return [];
  return state.reservations.filter((reservation) => String(reservation.projectId) === String(projectId));
}

function resolveReservationNetTotal(reservation) {
  if (!reservation) return 0;
  const items = Array.isArray(reservation.items) ? reservation.items : [];
  const discountRaw = reservation.discount ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountType = reservation.discountType || 'percent';
  const technicianIds = Array.isArray(reservation.technicians) ? reservation.technicians : [];
  const calculated = calculateReservationTotal(
    items,
    discountValue,
    discountType,
    false,
    technicianIds,
    { start: reservation.start, end: reservation.end }
  );

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation.cost ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
}

function handleAddTechnician() {
  const value = dom.technicianSelect?.value;
  if (!value) {
    showToast(t('projects.toast.selectTechnician', '⚠️ يرجى اختيار عضو الطاقم'));
    return;
  }

  if (state.selectedTechnicians.includes(value)) {
    showToast(t('projects.toast.technicianAlreadyAdded', '⚠️ العضو مضاف بالفعل'));
    return;
  }

  state.selectedTechnicians.push(value);
  renderSelections();
  showToast(t('projects.toast.technicianAdded', '✅ تمت إضافة عضو الطاقم'));
}

function handleAddEquipment() {
  const barcode = dom.equipmentSelect?.value;
  if (!barcode) {
    showToast(t('projects.toast.selectEquipment', '⚠️ يرجى اختيار المعدة'));
    return;
  }

  const qty = Math.max(1, parseInt(dom.equipmentQty?.value || '1', 10) || 1);
  const existing = state.selectedEquipment.find((item) => item.barcode === barcode);

  if (existing) {
    existing.qty += qty;
  } else {
    state.selectedEquipment.push({ barcode, qty });
  }

  renderSelections();
  showToast(t('projects.toast.equipmentAdded', '✅ تمت إضافة المعدة للمشروع'));
}

function handleAddExpense() {
  const label = (dom.expenseLabel?.value || '').trim();
  const normalizedAmount = normalizeNumbers(dom.expenseAmount?.value || '0');
  const amount = Number(normalizedAmount);

  if (!label) {
    showToast(t('projects.toast.missingExpenseLabel', '⚠️ يرجى إدخال وصف المصروف'));
    return;
  }

  if (!Number.isFinite(amount) || amount < 0) {
    showToast(t('projects.toast.invalidExpenseAmount', '⚠️ يرجى إدخال مبلغ صحيح'));
    return;
  }

  state.expenses.push({
    id: Date.now(),
    label,
    amount
  });

  if (dom.expenseLabel) dom.expenseLabel.value = '';
  if (dom.expenseAmount) dom.expenseAmount.value = normalizeNumbers(String(normalizedAmount));

  renderSelections();
  updateSummary();
}

function renderSelections() {
  renderTechnicianChips();
  renderEquipmentChips();
  renderExpenseList();
}

function renderTechnicianChips() {
  renderChipList(dom.technicianList, state.selectedTechnicians, (id) => {
    const technician = state.technicians.find((tech) => String(tech.id) === String(id));
    const fallbackTemplate = t('projects.fallback.technicianName', 'عضو {id}');
    const name = technician?.name || fallbackTemplate.replace('{id}', normalizeNumbers(String(id)));
    const role = technician?.role ? `<small class="text-muted">${escapeHtml(technician.role)}</small>` : '';
    const removeLabel = escapeHtml(t('actions.remove', 'إزالة'));
    return `
      <span class="tag-chip">
        <span>${escapeHtml(name)}</span>
        ${role}
        <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-technician" data-id="${id}" aria-label="${removeLabel}">✖</button>
      </span>
    `;
  });
}

function renderEquipmentChips() {
  renderChipList(dom.equipmentList, state.selectedEquipment, (item) => {
    const equipment = state.equipment.find((eq) => String(eq.barcode || '') === String(item.barcode));
    const name = equipment?.desc || equipment?.description || equipment?.name || item.barcode;
    const qtyLabel = t('projects.details.quantity', '{qty} قطعة').replace('{qty}', normalizeNumbers(String(item.qty || 0)));
    const removeLabel = escapeHtml(t('actions.remove', 'إزالة'));
    return `
      <span class="tag-chip">
        <span>${escapeHtml(name)}</span>
        <small class="text-muted">${escapeHtml(qtyLabel)}</small>
        <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-equipment" data-id="${escapeHtml(item.barcode)}" aria-label="${removeLabel}">✖</button>
      </span>
    `;
  });
}

function renderExpenseList() {
  if (!dom.expenseList) return;
  if (!state.expenses.length) {
    const emptyText = escapeHtml(getEmptyText(dom.expenseList));
    dom.expenseList.innerHTML = `<span class="text-muted">${emptyText}</span>`;
    return;
  }

  dom.expenseList.innerHTML = state.expenses
    .map((expense) => `
      <div class="expense-item">
        <span>${escapeHtml(expense.label)}</span>
        <span>${formatCurrency(expense.amount)}</span>
        <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${expense.id}" aria-label="${escapeHtml(t('actions.remove', 'إزالة'))}">✖</button>
      </div>
    `)
    .join('');
}

function renderChipList(container, items, templateFn) {
  if (!container) return;
  if (!items || items.length === 0) {
    const emptyText = escapeHtml(getEmptyText(container));
    container.innerHTML = `<span class="text-muted">${emptyText}</span>`;
    return;
  }

  container.innerHTML = items.map((item) => templateFn(item)).join('');
}

let isProjectSubmitInProgress = false;

async function handleSubmitProject(event) {
  event.preventDefault();
  if (isProjectSubmitInProgress) return;

  const title = dom.title?.value.trim();
  const projectType = dom.type?.value || '';
  const clientInput = dom.client?.value?.trim() || '';
  const selectedClientId = dom.client?.dataset?.customerId || '';
  const startDateValue = dom.startDate?.value?.trim() || '';
  const startTimeValue = dom.startTime?.value?.trim() || '';

  if (!title || !projectType || !startDateValue) {
    showToast(t('projects.toast.missingRequiredFields', '⚠️ يرجى تعبئة البيانات المطلوبة'));
    return;
  }

  const customer = resolveProjectCustomer(clientInput, selectedClientId);
  if (!customer) {
    showToast(t('projects.toast.customerNotFound', '⚠️ لم يتم العثور على العميل بالاسم المدخل'));
    dom.client?.focus();
    return;
  }

  const clientId = String(customer.id);
  if (dom.client) {
    dom.client.dataset.customerId = clientId;
    dom.client.value = customer.customerName || customer.name || dom.client.value;
  }
  setProjectClientCompany(customer);

  const endDateValue = dom.endDate?.value?.trim() || '';
  const endTimeValue = dom.endTime?.value?.trim() || '';

  const startIso = combineProjectDateTime(startDateValue, startTimeValue);
  const endIso = endDateValue ? combineProjectDateTime(endDateValue, endTimeValue) : '';

  const startDate = new Date(startIso);
  const endDate = endIso ? new Date(endIso) : null;
  if (endDate && startDate > endDate) {
    showToast(t('projects.toast.invalidDateRange', '⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية'));
    return;
  }

  if (dom.expenseAmount) {
    dom.expenseAmount.value = normalizeNumbers(dom.expenseAmount.value || '');
  }

  const expensesTotal = calculateExpensesTotal();
  const equipmentEstimate = calculateEquipmentEstimate();
  const applyTax = dom.taxCheckbox?.checked === true;
  const selectedPaymentStatus = dom.paymentStatus?.value || 'unpaid';
  const paymentStatus = selectedPaymentStatus === 'paid' ? 'paid' : 'unpaid';
  const subtotal = equipmentEstimate + expensesTotal;
  const taxAmount = applyTax ? Number((subtotal * PROJECT_TAX_RATE).toFixed(2)) : 0;
  const totalWithTax = Number((subtotal + taxAmount).toFixed(2));

  const { items: equipmentForApi, missing } = resolveSelectedEquipmentForApi();
  if (missing.length) {
    showToast(t('projects.toast.equipmentMissing', '⚠️ بعض المعدات المحددة غير موجودة في النظام، يرجى تحديث قائمة المعدات'), 'error');
    return;
  }

  const isEditing = Boolean(state.editingProjectId);
  const existingProject = isEditing
    ? state.projects.find((proj) => String(proj.id) === String(state.editingProjectId))
    : null;

  if (isEditing && !existingProject) {
    showToast(t('projects.toast.editMissing', '⚠️ تعذّر العثور على المشروع المطلوب تعديله'));
    return;
  }

  const companyValue = customer.companyName || customer.company || '';
  const descriptionValue = dom.description?.value.trim() || '';

  const payload = buildProjectPayload({
    projectCode: existingProject?.projectCode || (!isEditing ? generateProjectCode() : null),
    title,
    type: projectType,
    clientId,
    clientCompany: companyValue,
    description: descriptionValue,
    start: startIso,
    end: endIso || null,
    applyTax,
    paymentStatus,
    equipmentEstimate,
    expenses: state.expenses.map((expense) => ({
      id: expense.id,
      label: expense.label,
      amount: expense.amount,
    })),
    taxAmount,
    totalWithTax,
    confirmed: existingProject?.confirmed ?? false,
    technicians: state.selectedTechnicians,
    equipment: equipmentForApi,
  });

  isProjectSubmitInProgress = true;

  try {
    let projectIdentifier = existingProject?.projectId ?? existingProject?.id ?? null;

    if (isEditing) {
      const updated = await updateProjectApi(projectIdentifier ?? state.editingProjectId, payload);
      projectIdentifier = updated?.projectId ?? updated?.id ?? projectIdentifier;
      await handleProjectReservationSync(projectIdentifier, paymentStatus);
      showToast(t('projects.toast.updated', '✅ تم تحديث المشروع بنجاح'));
    } else {
      const created = await createProjectApi(payload);
      projectIdentifier = created?.projectId ?? created?.id ?? null;
      await handleProjectReservationSync(projectIdentifier, paymentStatus);
      showToast(t('projects.toast.saved', '✅ تم حفظ المشروع بنجاح'));
    }

    state.editingProjectId = null;
    dom.form.reset();
    resetProjectFormState();
    clearProjectDateInputs();
    clearProjectCustomerSuggestions();
    if (dom.client) {
      dom.client.dataset.customerId = '';
    }
    if (dom.type) {
      dom.type.value = '';
    }

    state.projects = getProjectsState();
    state.reservations = getReservationsState();
    renderProjects();
    updateSummary();
    document.dispatchEvent(new CustomEvent('projects:changed'));
  } catch (error) {
    console.error('❌ [projects] handleSubmitProject failed', error);
    const message = isProjectApiError(error)
      ? error.message
      : t('projects.toast.saveFailed', 'تعذر حفظ المشروع، حاول مرة أخرى');
    showToast(message, 'error');
  } finally {
    isProjectSubmitInProgress = false;
  }
}

function renderProjects() {
  if (!dom.projectsTableBody) return;
  const search = state.filters.search;
  const filtered = state.projects.filter((project) => {
    if (!search) return true;
    const client = state.customers.find((c) => String(c.id) === String(project.clientId));
    const haystack = normalizeNumbers([
      project.title,
      project.description,
      client?.customerName,
      project.clientCompany,
      getProjectTypeLabel(project.type),
      project.id,
      project.projectCode
    ].filter(Boolean).join(' ')).toLowerCase();
    return haystack.includes(search);
  });

  if (!filtered.length) {
    const emptyKey = state.projects.length === 0 ? 'projects.table.emptyInitial' : 'projects.table.emptyFiltered';
    const emptyFallback = state.projects.length === 0 ? 'لم يتم إنشاء مشاريع بعد.' : 'لا توجد مشاريع مطابقة.';
    const emptyText = escapeHtml(t(emptyKey, emptyFallback));
    dom.projectsTableBody.innerHTML = `<tr class="projects-table-empty-row"><td colspan="8" class="text-center text-muted">${emptyText}</td></tr>`;
    setTableCount(0);
    state.visibleProjects = [];
    renderTimeline([]);
    return;
  }

  const sortedProjects = [...filtered]
    .sort((a, b) => new Date(b.start || 0) - new Date(a.start || 0));

  state.visibleProjects = sortedProjects;
  setTableCount(sortedProjects.length);

  dom.projectsTableBody.innerHTML = sortedProjects
    .map((project) => renderProjectRow(project))
    .join('');

  renderTimeline(sortedProjects);
  renderFocusCards();
}

function renderProjectRow(project) {
  const client = state.customers.find((c) => String(c.id) === String(project.clientId));
  const clientName = client?.customerName || t('projects.fallback.unknownClient', 'عميل غير معروف');
  const companyName = (project.clientCompany || client?.companyName || '').trim();
  const crewCount = project.technicians?.length || 0;
  const equipmentCount = (project.equipment || []).reduce((sum, item) => sum + (item.qty || 0), 0);
  const { expensesTotal, totalWithTax } = resolveProjectTotals(project);
  const reservationsForProject = getReservationsForProject(project.id);
  const reservationsCount = reservationsForProject.length;
  const reservationsLabelTemplate = t('projects.table.reservationsCount', '{count} حجوزات');
  const reservationsLabel = reservationsLabelTemplate.replace('{count}', normalizeNumbers(String(reservationsCount)));
  const reservationsBadge = reservationsCount
    ? `<span class="badge rounded-pill project-reservations-chip">${escapeHtml(reservationsLabel)}</span>`
    : '';
  const typeLabel = escapeHtml(getProjectTypeLabel(project.type));
  const typeBadge = `<span class="badge project-type-badge">${typeLabel}</span>`;
  const projectCodeDisplay = project.projectCode || `PRJ-${normalizeNumbers(String(project.id))}`;
  const projectCodeBadge = `<span class="project-code-badge">#${escapeHtml(projectCodeDisplay)}</span>`;

  return `
    <tr data-project-id="${project.id}">
      <td>
        <div class="d-flex flex-column gap-1">
          <div class="fw-bold">${escapeHtml(project.title)}</div>
          <div class="d-flex flex-wrap gap-2 align-items-center project-row-meta">
            ${projectCodeBadge}
            ${typeBadge}
          </div>
        </div>
        ${reservationsBadge}
      </td>
      <td>
        ${companyName
          ? `<div class="d-flex flex-column"><span>${escapeHtml(clientName)}</span><small class="text-muted">${escapeHtml(companyName)}</small></div>`
          : escapeHtml(clientName)}
      </td>
      <td>${formatDateRange(project.start, project.end)}</td>
      <td>${normalizeNumbers(String(crewCount))}</td>
      <td>${normalizeNumbers(String(equipmentCount))}</td>
      <td>${formatCurrency(totalWithTax)}</td>
      <td>${formatCurrency(expensesTotal)}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary" data-action="view-details" data-id="${project.id}">${escapeHtml(t('actions.view', 'عرض'))}</button>
        <button class="btn btn-sm btn-outline-danger" data-action="delete-project" data-id="${project.id}">${escapeHtml(t('actions.delete', 'حذف'))}</button>
      </td>
    </tr>
  `;
}

function renderTimeline(projectsForTimeline) {
  if (!dom.timeline) return;

  const sourceProjects = Array.isArray(projectsForTimeline)
    ? projectsForTimeline
    : (state.visibleProjects.length ? state.visibleProjects : state.projects);

  const timelineProjects = sourceProjects
    .map((project) => {
      if (!project?.start) return null;
      const startDate = new Date(project.start);
      if (Number.isNaN(startDate.getTime())) return null;

      let endDate = project.end ? new Date(project.end) : new Date(startDate);
      if (Number.isNaN(endDate.getTime())) {
        endDate = new Date(startDate);
      }

      if (endDate <= startDate) {
        endDate = new Date(startDate.getTime() + ONE_HOUR_IN_MS);
      }

      return { project, startDate, endDate };
    })
    .filter(Boolean)
    .sort((a, b) => a.startDate - b.startDate);

  if (!timelineProjects.length) {
    const emptyText = escapeHtml(t('projects.timeline.empty', dom.timeline.dataset.empty || 'لا توجد مشاريع ببيانات زمنية صالحة.'));
    dom.timeline.innerHTML = `<div class="project-timeline__empty text-muted">${emptyText}</div>`;
    return;
  }

  const minStart = timelineProjects[0].startDate.getTime();
  const maxEnd = Math.max(...timelineProjects.map((item) => item.endDate.getTime()));
  let totalSpan = maxEnd - minStart;
  if (totalSpan <= 0) {
    totalSpan = ONE_HOUR_IN_MS;
  }

  const conflicts = detectTimelineConflicts(timelineProjects);
  const rangeTemplate = t('projects.timeline.range', '{start} → {end}');
  const conflictLabel = t('projects.timeline.conflict', 'Scheduling conflict');

  const itemsMarkup = timelineProjects
    .map((item) => {
      const { project, startDate, endDate } = item;
      const duration = endDate.getTime() - startDate.getTime();
      let offset = ((startDate.getTime() - minStart) / totalSpan) * 100;
      offset = Math.max(0, Math.min(offset, 100));
      let width = (duration / totalSpan) * 100;
      width = Math.max(width, 2.5);
      if (offset + width > 100) {
        width = Math.max(1.5, 100 - offset);
      }

      const status = determineProjectStatus(project);
      const statusClass = `project-timeline__item--${status}`;
      const hasConflict = conflicts.has(project.id);
      const title = (project.title || '').trim() || t('projects.fallback.untitled', 'Untitled project');
      const displayLabel = truncateText(title, 26);
      const client = state.customers.find((c) => String(c.id) === String(project.clientId));
      const clientName = client?.customerName || t('projects.fallback.unknownClient', 'Unknown client');
      const companyName = (project.clientCompany || client?.companyName || '').trim();
      const typeLabel = getProjectTypeLabel(project.type);
      const startLabel = formatDateTime(startDate.toISOString());
      const endLabel = formatDateTime(endDate.toISOString());
      const rangeLabel = rangeTemplate.replace('{start}', startLabel).replace('{end}', endLabel);
      const tooltipClient = companyName ? `${clientName} (${companyName})` : clientName;
      const tooltip = `${title} • ${typeLabel} • ${tooltipClient} | ${rangeLabel}`;
      const conflictIcon = hasConflict
        ? `<span class="project-timeline__item-conflict" title="${escapeHtml(conflictLabel)}">⚠️</span>`
        : '';

      return `
        <div class="project-timeline__item ${statusClass}${hasConflict ? ' project-timeline__item--conflict' : ''}" style="left:${offset}%;width:${width}%;" title="${escapeHtml(tooltip)}">
          <span class="project-timeline__item-label">${escapeHtml(displayLabel)}</span>
          ${conflictIcon}
        </div>
      `;
    })
    .join('');

  const scaleMarkup = `
    <div class="project-timeline__scale">
      <span>${escapeHtml(formatDateTime(new Date(minStart).toISOString()))}</span>
      <span>${escapeHtml(formatDateTime(new Date(maxEnd).toISOString()))}</span>
    </div>
  `;

  dom.timeline.innerHTML = `
    ${scaleMarkup}
    <div class="project-timeline__track">
      ${itemsMarkup}
    </div>
  `;
}

function detectTimelineConflicts(items) {
  const conflicts = new Set();
  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      const a = items[i];
      const b = items[j];
      if (a.startDate < b.endDate && b.startDate < a.endDate) {
        conflicts.add(a.project.id);
        conflicts.add(b.project.id);
      }
    }
  }
  return conflicts;
}

function renderFocusCards() {
  if (!dom.focusCards) return;

  const cards = buildFocusCards();
  if (!cards.length) {
    const emptyMessage = escapeHtml(t('projects.focus.empty', dom.focusCards.dataset.empty || 'لا توجد مشاريع لليوم أو هذا الأسبوع.'));
    dom.focusCards.innerHTML = `<div class="col-12"><div class="alert alert-info mb-0 text-center">${emptyMessage}</div></div>`;
    return;
  }

  dom.focusCards.innerHTML = cards.join('');
}

function buildFocusCards() {
  if (!Array.isArray(state.projects) || !state.projects.length) return [];

  const today = state.projects.filter(isProjectToday);
  const thisWeek = state.projects.filter((project) => !isProjectToday(project) && isProjectThisWeek(project));

  const cards = [];
  const seen = new Set();

  const addCard = (project, category) => {
    if (!project || seen.has(project.id) || cards.length >= MAX_FOCUS_CARDS) return;
    seen.add(project.id);
    cards.push(renderFocusCard(project, category));
  };

  today
    .sort((a, b) => getProjectStartTimestamp(a) - getProjectStartTimestamp(b))
    .forEach((project) => addCard(project, 'today'));

  thisWeek
    .sort((a, b) => getProjectStartTimestamp(a) - getProjectStartTimestamp(b))
    .forEach((project) => addCard(project, 'thisWeek'));

  if (cards.length < MAX_FOCUS_CARDS) {
    const now = Date.now();
    const upcomingProjects = [...state.projects]
      .filter((project) => !seen.has(project.id))
      .filter((project) => {
        const startTime = getProjectStartTimestamp(project);
        return Number.isFinite(startTime) && startTime >= now;
      })
      .sort((a, b) => getProjectStartTimestamp(a) - getProjectStartTimestamp(b));

    upcomingProjects.forEach((project) => addCard(project, 'upcoming'));
  }

  if (cards.length < MAX_FOCUS_CARDS) {
    const fallbackProjects = [...state.projects]
      .filter((project) => !seen.has(project.id))
      .sort((a, b) => getProjectCreatedTimestamp(b) - getProjectCreatedTimestamp(a));

    fallbackProjects.forEach((project) => addCard(project, 'recent'));
  }

  return cards;
}

function renderFocusCard(project, category) {
  const client = state.customers.find((c) => String(c.id) === String(project.clientId));
  const clientName = client?.customerName || t('projects.fallback.unknownClient', 'Unknown client');
  const companyName = (project.clientCompany || client?.companyName || '').trim();
  const crewCount = Array.isArray(project.technicians) ? project.technicians.length : 0;
  const reservationsForProject = getReservationsForProject(project.id);
  const reservationsCount = reservationsForProject.length;
  const expensesTotal = getProjectExpenses(project);
  const { subtotal: projectSubtotal, applyTax, totalWithTax } = resolveProjectTotals(project);
  const description = (project.description || '').trim();
  const typeLabel = getProjectTypeLabel(project.type);
  const paymentStatus = project.paymentStatus === 'paid' ? 'paid' : 'unpaid';
  const paymentStatusLabel = t(`projects.paymentStatus.${paymentStatus}`, paymentStatus === 'paid' ? 'Paid' : 'Unpaid');
  const paymentChipClass = paymentStatus === 'paid' ? 'status-paid' : 'status-unpaid';
  const cardPaymentClass = paymentStatus === 'paid' ? 'project-focus-card--paid' : 'project-focus-card--unpaid';
  const isConfirmed = project.confirmed === true || project.confirmed === 'true';
  const projectIdAttr = escapeHtml(String(project.id));
  const projectCodeValue = project.projectCode || `PRJ-${normalizeNumbers(String(project.id))}`;
  const projectCodeDisplay = normalizeNumbers(projectCodeValue);

  const categoryKeyMap = {
    today: 'projects.focus.today',
    thisWeek: 'projects.focus.thisWeek',
    upcoming: 'projects.focus.upcoming',
    recent: 'projects.focus.recent'
  };
  const categoryFallbackMap = {
    today: "Today's Projects",
    thisWeek: 'This Week',
    upcoming: 'Upcoming Projects',
    recent: 'Latest Projects'
  };
  const categoryKey = categoryKeyMap[category] || categoryKeyMap.recent;
  const categoryLabel = t(categoryKey, categoryFallbackMap[category] || categoryFallbackMap.recent);
  const status = determineProjectStatus(project);
  const statusLabel = t(`projects.status.${status}`, statusFallbackLabels[status]);
  const statusClass = statusBadgeClass[status] || 'bg-secondary';
  const title = (project.title || '').trim() || t('projects.fallback.untitled', 'Untitled project');
  const cardStateClasses = [cardPaymentClass];
  if (isConfirmed) {
    cardStateClasses.push('project-focus-card--confirmed');
  }
  const confirmLabel = t('projects.focus.actions.confirm', '✔️ تأكيد المشروع');
  const confirmedLabel = t('projects.focus.confirmed', '✅ مشروع مؤكد');

  const reservationsTotals = reservationsForProject.reduce((acc, reservation) => {
    const net = resolveReservationNetTotal(reservation);
    const equipmentTotal = (reservation.items || []).reduce((sum, item) => sum + (Number(item?.qty) || 1), 0);
    const crewTotal = (reservation.technicians || []).length;
    return {
      total: acc.total + net,
      equipment: acc.equipment + equipmentTotal,
      crew: acc.crew + crewTotal
    };
  }, { total: 0, equipment: 0, crew: 0 });

  const reservationsTotal = Number(reservationsTotals.total.toFixed(2));
  const equipmentCountTotal = reservationsTotals.equipment;
  const crewAssignmentsTotal = reservationsTotals.crew;

  const combinedTaxAmount = applyTax
    ? Number(((projectSubtotal + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((projectSubtotal + reservationsTotal + combinedTaxAmount).toFixed(2));
  const projectCodeBadge = `<span class="project-code-badge project-focus-card__code">#${escapeHtml(projectCodeDisplay)}</span>`;
  const categoryBadge = `<span class="badge project-focus-card__badge ${statusClass}">${escapeHtml(categoryLabel)}</span>`;
  const statusChip = `<span class="project-focus-card__status-chip ${statusClass}">${escapeHtml(statusLabel)}</span>`;
  const paymentChip = `<span class="reservation-chip ${paymentChipClass} project-focus-card__payment-chip">${escapeHtml(paymentStatusLabel)}</span>`;

  const reservationStats = [
    {
      icon: '📦',
      label: t('projectCards.stats.equipmentCount', 'عدد المعدات'),
      value: normalizeNumbers(String(equipmentCountTotal))
    },
    {
      icon: '😎',
      label: t('projectCards.stats.crewCount', 'عدد الطاقم'),
      value: normalizeNumbers(String(crewAssignmentsTotal))
    },
    {
      icon: '💵',
      label: t('projectCards.stats.reservationValue', 'إجمالي الحجوزات'),
      value: formatCurrency(reservationsTotal)
    }
  ];

  const paymentStats = [
    {
      icon: '💳',
      label: t('projectCards.stats.paymentStatus', 'حالة الدفع'),
      value: paymentStatusLabel
    },
    {
      icon: '💸',
      label: t('projectCards.stats.expensesTotal', 'إجمالي المصاريف'),
      value: formatCurrency(expensesTotal)
    },
    {
      icon: '💵',
      label: t('projectCards.stats.reservationTotal', 'إجمالي الحجز'),
      value: formatCurrency(reservationsTotal)
    },
    {
      icon: '🧾',
      label: t('projectCards.stats.taxTotal', 'الضريبة'),
      value: formatCurrency(combinedTaxAmount)
    },
    {
      icon: '💰',
      label: t('projectCards.stats.overallTotal', 'المجموع الكلي'),
      value: formatCurrency(overallTotal)
    }
  ];

  const descriptionText = description ? escapeHtml(truncateText(description, 110)) : escapeHtml(t('projects.fallback.noDescription', 'No description'));

  const metaRows = [
    {
      icon: '🆔',
      label: t('projectCards.meta.code', 'رقم المشروع'),
      value: `#${projectCodeDisplay}`
    },
    {
      icon: '👤',
      label: t('projectCards.meta.client', 'العميل'),
      value: clientName
    },
    companyName
      ? {
          icon: '🏢',
          label: t('projectCards.meta.company', 'شركة العميل'),
          value: companyName
        }
      : null,
    {
      icon: '🏷️',
      label: t('projectCards.meta.type', 'نوع المشروع'),
      value: typeLabel
    },
    {
      icon: '📅',
      label: t('projectCards.meta.startDate', 'تاريخ البداية'),
      value: formatDateTime(project.start)
    },
    {
      icon: '📅',
      label: t('projectCards.meta.endDate', 'تاريخ النهاية'),
      value: project.end ? formatDateTime(project.end) : '—'
    }
  ].filter(Boolean);

  const buildSection = (titleKey, fallback, rows = []) => {
    if (!rows.length) return '';
    const rowsHtml = rows
      .map(({ icon, label, value }) => {
        const iconHtml = icon ? `<span class="project-focus-card__row-icon">${escapeHtml(icon)}</span>` : '';
        return `
          <div class="project-focus-card__row">
            <span class="project-focus-card__row-label">${iconHtml}${escapeHtml(label)}</span>
            <span class="project-focus-card__row-value">${escapeHtml(value)}</span>
          </div>
        `;
      })
      .join('');
    return `
      <div class="project-focus-card__section">
        <span class="project-focus-card__section-title">${escapeHtml(t(titleKey, fallback))}</span>
        <div class="project-focus-card__section-box">
          ${rowsHtml}
        </div>
      </div>
    `;
  };

  const sectionsHtml = [
    buildSection('projectCards.groups.meta', 'بيانات المشروع', metaRows),
    buildSection('projectCards.groups.reservations', 'موجز الحجز', reservationStats),
    buildSection('projectCards.groups.payment', 'ملخص الدفع', paymentStats)
  ].join('');

  const actionsHtml = isConfirmed
    ? `<div class="project-focus-card__actions"><span class="reservation-chip status-confirmed project-focus-card__confirm-indicator">${escapeHtml(confirmedLabel)}</span></div>`
    : `<div class="project-focus-card__actions"><button type="button" class="btn btn-sm btn-success project-focus-card__confirm-btn" data-action="confirm-project" data-id="${projectIdAttr}">${escapeHtml(confirmLabel)}</button></div>`;

  const cardClassNames = ['project-focus-card', ...cardStateClasses].join(' ');

  return `
    <div class="col-12 col-md-6 col-xl-4">
      <article class="${cardClassNames}" data-project-id="${projectIdAttr}" data-category="${escapeHtml(String(category))}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${projectCodeBadge}
          ${categoryBadge}
          ${statusChip}
          ${paymentChip}
        </div>
        <h6 class="project-focus-card__title">${escapeHtml(title)}</h6>
        <p class="project-focus-card__description">${descriptionText}</p>
        <div class="project-focus-card__sections">
          ${sectionsHtml}
        </div>
        ${actionsHtml}
      </article>
    </div>
  `;
}

function buildProjectReservationCard(reservation, index) {
  const reservationId = normalizeNumbers(String(reservation.reservationId || reservation.id || '-'));
  const rangeLabel = formatDateRange(reservation.start, reservation.end);
  const netTotal = resolveReservationNetTotal(reservation);
  const costLabel = formatCurrency(netTotal);
  const itemsCount = normalizeNumbers(String((reservation.items || []).length));
  const crewCount = normalizeNumbers(String((reservation.technicians || []).length));
  const itemsLabel = t('projects.details.reservations.itemsCount', '{count} معدة').replace('{count}', itemsCount);
  const crewLabel = t('projects.details.reservations.crewCount', '{count} من الطاقم').replace('{count}', crewCount);
  const viewLabel = t('projects.details.reservations.view', 'عرض الحجز');
  const statusConfirmed = reservation.confirmed === true || reservation.confirmed === 'true';
  const statusLabel = statusConfirmed
    ? t('reservations.list.status.confirmed', '✅ مؤكد')
    : t('reservations.list.status.pending', '⏳ غير مؤكد');
  const statusClass = statusConfirmed ? 'project-reservation-card__badge--confirmed' : 'project-reservation-card__badge--pending';
  const paidLabel = reservation.paid === true || reservation.paid === 'paid'
    ? t('reservations.list.payment.paid', '💳 مدفوع')
    : t('reservations.list.payment.unpaid', '💳 غير مدفوع');
  const paidClass = reservation.paid === true || reservation.paid === 'paid'
    ? 'project-reservation-card__badge--paid'
    : 'project-reservation-card__badge--unpaid';
  const completed = isReservationCompleted(reservation);
  const completedBadge = completed
    ? `<span class="badge project-reservation-card__badge project-reservation-card__badge--completed">${escapeHtml(t('reservations.list.status.completed', '📁 منتهي'))}</span>`
    : '';

  const viewButton = Number.isInteger(index) && index >= 0
    ? `<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-index="${index}">${escapeHtml(viewLabel)}</button>`
    : '';

  return `
    <article class="project-reservation-card" data-reservation-index="${index}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${escapeHtml(reservationId)}</span>
        <div class="project-reservation-card__badges">
          <span class="badge project-reservation-card__badge ${statusClass}">${escapeHtml(statusLabel)}</span>
          <span class="badge project-reservation-card__badge ${paidClass}">${escapeHtml(paidLabel)}</span>
          ${completedBadge}
        </div>
      </div>
      <div class="project-reservation-card__body">
        <div class="project-reservation-card__range">${escapeHtml(rangeLabel)}</div>
        <div class="project-reservation-card__meta">
          <span>💵 ${escapeHtml(costLabel)}</span>
          <span>📦 ${escapeHtml(itemsLabel)}</span>
          <span>😎 ${escapeHtml(crewLabel)}</span>
        </div>
      </div>
      <div class="project-reservation-card__footer">
        ${viewButton}
      </div>
    </article>
  `;
}

function buildProjectReservationsSection(project) {
  const reservations = getReservationsForProject(project.id)
    .map((reservation) => ({
      reservation,
      index: state.reservations.findIndex((entry) => entry === reservation)
    }))
    .filter(({ index }) => Number.isInteger(index) && index >= 0)
    .sort((a, b) => {
      const aStart = a.reservation.start ? new Date(a.reservation.start).getTime() : 0;
      const bStart = b.reservation.start ? new Date(b.reservation.start).getTime() : 0;
      return bStart - aStart;
    });

  const title = t('projects.details.reservations.title', 'الحجوزات المرتبطة');
  const createLabel = t('projects.details.reservations.create', '➕ إنشاء حجز مرتبط');
  const emptyText = t('projects.details.reservations.empty', 'لا توجد حجوزات مرتبطة بهذا المشروع بعد.');
  const countTemplate = t('projects.details.reservations.count', '{count} حجوزات');
  const countBadge = reservations.length
    ? `<span class="badge project-reservations-count">${escapeHtml(countTemplate.replace('{count}', normalizeNumbers(String(reservations.length))))}</span>`
    : '';
  const hasReservations = reservations.length > 0;
  const projectIdAttr = escapeHtml(String(project.id));
  const createButtonAttributes = [
    'type="button"',
    'class="btn btn-sm btn-primary"',
    'data-action="create-reservation"',
    `data-project-id="${projectIdAttr}"`
  ];
  if (hasReservations) {
    createButtonAttributes.push('disabled', 'aria-disabled="true"');
  }
  const createButton = `<button ${createButtonAttributes.join(' ')}>${escapeHtml(createLabel)}</button>`;
  const editLabel = t('projects.details.actions.edit', '✏️ تعديل المشروع');
  const editButton = `<button type="button" class="btn btn-sm btn-warning" data-action="edit-project" data-project-id="${projectIdAttr}">${escapeHtml(editLabel)}</button>`;
  const actionsMarkup = `<div class="d-flex flex-wrap gap-2">${createButton}${editButton}</div>`;

  const listMarkup = reservations.length
    ? `<div class="project-reservations-list">${reservations.map(({ reservation, index }) => buildProjectReservationCard(reservation, index)).join('')}</div>`
    : `<div class="alert alert-info project-reservations-empty mb-0">${escapeHtml(emptyText)}</div>`;

  return `
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex justify-content-between align-items-center gap-2 flex-wrap">
        <div class="d-flex align-items-center gap-2">
          <h6 class="mb-0">${escapeHtml(title)}</h6>
          ${countBadge}
        </div>
        ${actionsMarkup}
      </div>
      ${listMarkup}
    </section>
  `;
}

function startReservationForProject(project) {
  if (!project) return;
  const context = {
    projectId: project.id,
    customerId: project.clientId || null,
    start: project.start || null,
    end: project.end || null,
    forceNotes: Boolean(project.description)
  };
  updatePreferences({
    dashboardTab: 'reservations-tab',
    dashboardSubTab: 'create-tab'
  }).catch((error) => {
    console.warn('⚠️ [projects] Failed to persist dashboard tab preference', error);
  });

  let encodedContext = '';
  try {
    encodedContext = encodeURIComponent(JSON.stringify(context));
  } catch (error) {
    console.warn('⚠️ [projects] Unable to encode reservation context', error);
  }

  if (dom.detailsModalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(dom.detailsModalEl)?.hide();
  }

  const search = encodedContext ? `?reservationProjectContext=${encodedContext}` : '';
  window.location.href = `dashboard.html${search}#reservations`;
}

function startProjectEdit(project) {
  if (!project || !dom.detailsBody) return;

  const resolved = state.projects.find((entry) => String(entry.id) === String(project.id));
  if (!resolved) return;

  const customer = state.customers.find((entry) => String(entry.id) === String(resolved.clientId));
  const clientName = customer?.customerName || customer?.name || resolved.clientName || resolved.customerName || '';
  const clientCompany = resolved.clientCompany || customer?.companyName || customer?.company || '';

  const normalizedExpenses = Array.isArray(resolved.expenses)
    ? resolved.expenses.map((expense, index) => ({
        id: expense?.id || `expense-${resolved.id}-${index}-${Date.now()}`,
        label: expense?.label || '',
        amount: Number(expense?.amount) || 0
      }))
    : [];

  const editState = {
    clientName,
    clientCompany,
    expenses: normalizedExpenses
  };

  dom.detailsBody.dataset.mode = 'edit';
  dom.detailsBody.innerHTML = buildProjectEditForm(resolved, editState);
  bindProjectEditForm(resolved, editState);
}

function bindProjectEditForm(project, editState = { expenses: [] }) {
  const form = dom.detailsBody?.querySelector('#project-details-edit-form');
  if (!form) return;

  const cancelBtn = form.querySelector('[data-action="cancel-edit"]');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      openProjectDetails(project.id);
    });
  }

  const expenseLabelInput = form.querySelector('#project-edit-expense-label');
  const expenseAmountInput = form.querySelector('#project-edit-expense-amount');
  const addExpenseBtn = form.querySelector('[data-action="add-expense"]');
  const expensesContainer = form.querySelector('#project-edit-expense-list');
  const startDateInput = form.querySelector('[name="project-start-date"]');
  const startTimeInput = form.querySelector('[name="project-start-time"]');
  const endDateInput = form.querySelector('[name="project-end-date"]');
  const endTimeInput = form.querySelector('[name="project-end-time"]');

  function renderExpenses() {
    if (!expensesContainer) return;
    expensesContainer.innerHTML = buildProjectEditExpensesMarkup(editState.expenses);
  }

  renderExpenses();

  if (addExpenseBtn) {
    addExpenseBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const label = expenseLabelInput?.value.trim() || '';
      const normalizedAmount = normalizeNumbers(expenseAmountInput?.value || '0');
      const amount = Number(normalizedAmount);

      if (!label) {
        showToast(t('projects.toast.missingExpenseLabel', '⚠️ يرجى إدخال وصف المصروف'));
        expenseLabelInput?.focus();
        return;
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        showToast(t('projects.toast.invalidExpenseAmount', '⚠️ يرجى إدخال مبلغ صحيح'));
        expenseAmountInput?.focus();
        return;
      }

      editState.expenses.push({
        id: `expense-${project.id}-${Date.now()}`,
        label,
        amount
      });

      if (expenseLabelInput) expenseLabelInput.value = '';
      if (expenseAmountInput) expenseAmountInput.value = '';
      renderExpenses();
    });
  }

  if (expensesContainer) {
    expensesContainer.addEventListener('click', (event) => {
      const removeBtn = event.target.closest('[data-action="remove-expense"]');
      if (!removeBtn) return;
      const { id } = removeBtn.dataset;
      editState.expenses = editState.expenses.filter((expense) => String(expense.id) !== String(id));
      renderExpenses();
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.submitting === 'true') return;

    const titleInput = form.querySelector('[name="project-title"]');
    const typeSelect = form.querySelector('[name="project-type"]');
    const descriptionInput = form.querySelector('[name="project-description"]');
    const paymentStatusSelect = form.querySelector('[name="project-payment-status"]');
    const taxCheckbox = form.querySelector('[name="project-apply-tax"]');

    const title = titleInput?.value.trim() || '';
    const projectType = typeSelect?.value || '';
    const startDateValue = startDateInput?.value.trim() || '';
    const startTimeValue = startTimeInput?.value.trim() || '';
    const descriptionValue = descriptionInput?.value.trim() || '';
    const paymentStatusValue = paymentStatusSelect?.value === 'paid' ? 'paid' : 'unpaid';
    const applyTax = taxCheckbox?.checked === true;

    if (!title || !projectType || !startDateValue) {
      showToast(t('projects.toast.missingRequiredFields', '⚠️ يرجى تعبئة البيانات المطلوبة'));
      titleInput?.focus();
      return;
    }

    const endDateValue = endDateInput?.value.trim() || '';
    const endTimeValue = endTimeInput?.value.trim() || '';

    const startIso = combineProjectDateTime(startDateValue, startTimeValue);
    const endIso = endDateValue ? combineProjectDateTime(endDateValue, endTimeValue) : '';

    const startDate = new Date(startIso);
    const endDate = endIso ? new Date(endIso) : null;
    if (endDate && startDate > endDate) {
      showToast(t('projects.toast.invalidDateRange', '⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية'));
      endDateInput?.focus();
      return;
    }

    const index = state.projects.findIndex((entry) => String(entry.id) === String(project.id));
    if (index === -1) {
      showToast(t('projects.toast.editMissing', '⚠️ تعذّر العثور على المشروع المطلوب تعديله'));
      return;
    }

    const equipmentEstimate = Number(project.equipmentEstimate) || 0;
    const expensesTotal = editState.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
    const subtotal = equipmentEstimate + expensesTotal;
    const taxAmount = applyTax ? Number((subtotal * PROJECT_TAX_RATE).toFixed(2)) : 0;
    const totalWithTax = applyTax ? Number((subtotal + taxAmount).toFixed(2)) : subtotal;

    const payload = buildProjectPayload({
      projectCode: project.projectCode,
      title,
      type: projectType,
      clientId: project.clientId,
      clientCompany: project.clientCompany,
      description: descriptionValue,
      start: startIso,
      end: endIso || null,
      applyTax,
      paymentStatus: paymentStatusValue,
      equipmentEstimate,
      expenses: editState.expenses,
      taxAmount,
      totalWithTax,
      confirmed: project.confirmed,
      technicians: Array.isArray(project.technicians) ? project.technicians : [],
      equipment: mapProjectEquipmentToApi(project),
    });

    form.dataset.submitting = 'true';

    try {
      const updated = await updateProjectApi(project.projectId ?? project.id, payload);
      const identifier = updated?.projectId ?? updated?.id ?? project.id;
      await handleProjectReservationSync(identifier, paymentStatusValue);
      state.projects = getProjectsState();
      state.reservations = getReservationsState();
      showToast(t('projects.toast.updated', '✅ تم تحديث المشروع بنجاح'));
      renderProjects();
      updateSummary();
      openProjectDetails(project.id);
    } catch (error) {
      console.error('❌ [projects] Failed to update project from details view', error);
      const message = isProjectApiError(error)
        ? error.message
        : t('projects.toast.updateFailed', 'تعذر تحديث المشروع، حاول مرة أخرى');
      showToast(message, 'error');
    } finally {
      delete form.dataset.submitting;
    }
  });
}

function bindProjectDetailsEvents(project) {
  if (!dom.detailsBody) return;
  const createBtn = dom.detailsBody.querySelector('[data-action="create-reservation"]');
  if (createBtn) {
    createBtn.addEventListener('click', () => startReservationForProject(project));
  }

  const editBtn = dom.detailsBody.querySelector('[data-action="edit-project"]');
  if (editBtn) {
    editBtn.addEventListener('click', () => startProjectEdit(project));
  }

  dom.detailsBody.querySelectorAll('[data-action="view-reservation"]').forEach((button) => {
    const index = Number(button.dataset.index);
    if (!Number.isInteger(index) || index < 0) return;
    button.addEventListener('click', () => {
      if (typeof window.showReservationDetails === 'function') {
        window.showReservationDetails(index);
      } else {
        window.location.href = 'dashboard.html#reservations';
      }
    });
  });
}

function openPendingProjectDetail() {
  try {
    const pendingId = localStorage.getItem(PENDING_PROJECT_DETAIL_KEY);
    if (!pendingId) return;
    localStorage.removeItem(PENDING_PROJECT_DETAIL_KEY);
    const projectExists = state.projects.find((project) => String(project.id) === String(pendingId));
    if (projectExists) {
      openProjectDetails(pendingId);
    }
  } catch (error) {
    console.warn('⚠️ [projects] Unable to open pending project detail', error);
    localStorage.removeItem(PENDING_PROJECT_DETAIL_KEY);
  }
}

function bindFocusCards() {
  if (!dom.focusCards || dom.focusCards.dataset.listenerAttached) return;

  dom.focusCards.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-action]');
    if (actionButton) {
      const { action, id } = actionButton.dataset;
      if (action === 'confirm-project') {
        event.preventDefault();
        event.stopPropagation();
        confirmProject(id);
        return;
      }
      if (action === 'view') {
        openProjectDetails(id);
      } else if (action === 'highlight') {
        focusProjectRow(id);
      }
      return;
    }

    const card = event.target.closest('.project-focus-card');
    if (card?.dataset.projectId) {
      openProjectDetails(card.dataset.projectId);
    }
  });

  dom.focusCards.dataset.listenerAttached = 'true';
}

function focusProjectRow(projectId) {
  if (!dom.projectsTableBody) return;
  const selector = `tr[data-project-id="${CSS.escape(String(projectId))}"]`;
  const row = dom.projectsTableBody.querySelector(selector);
  if (!row) {
    showToast(t('projects.focus.toastNotFound', '⚠️ تعذّر العثور على المشروع في القائمة'));
    return;
  }

  row.classList.add('project-row-highlight');
  row.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.setTimeout(() => {
    row.classList.remove('project-row-highlight');
  }, 2200);
}

async function confirmProject(projectId) {
  if (!projectId) return;
  const project = state.projects.find((entry) => String(entry.id) === String(projectId));
  if (!project) {
    showToast(t('projects.toast.editMissing', '⚠️ تعذّر العثور على المشروع المطلوب تعديله'));
    return;
  }

  if (project.confirmed === true || project.confirmed === 'true') {
    showToast(t('projects.toast.alreadyConfirmed', 'ℹ️ المشروع مؤكّد مسبقًا'));
    return;
  }

  try {
    await updateProjectApi(project.projectId ?? project.id, { confirmed: true });
    const reservationsConfirmed = await updateLinkedReservationsConfirmation(projectId);

    state.projects = getProjectsState();
    state.reservations = getReservationsState();

    renderProjects();
    renderFocusCards();
    updateSummary();

    const isModalOpen = dom.detailsModalEl && dom.detailsModalEl.classList.contains('show');
    if (isModalOpen && dom.detailsBody?.dataset.projectId === String(projectId)) {
      openProjectDetails(projectId);
    }

    document.dispatchEvent(new CustomEvent('projects:changed'));
    if (reservationsConfirmed) {
      document.dispatchEvent(new CustomEvent('reservations:changed'));
    }

    showToast(t('projects.toast.confirmed', '✅ تم تأكيد المشروع'));
  } catch (error) {
    console.error('❌ [projects] confirmProject failed', error);
    const message = isProjectApiError(error)
      ? error.message
      : t('projects.toast.updateFailed', 'تعذر تحديث المشروع، حاول مرة أخرى');
    showToast(message, 'error');
  }
}

async function updateLinkedReservationsPaymentStatus(projectId, paymentStatus) {
  if (!projectId) return false;

  const reservations = getReservationsState();
  const targets = reservations.filter((reservation) => String(reservation.projectId) === String(projectId));

  if (!targets.length) {
    return false;
  }

  const shouldBePaid = paymentStatus === 'paid';
  const desiredStatusValue = shouldBePaid ? 'paid' : 'unpaid';
  let changed = false;

  for (const reservation of targets) {
    const reservationId = reservation.id ?? reservation.reservationId;
    if (!reservationId) continue;

    const currentPaidNormalized = reservation.paid === true || reservation.paid === 'paid';
    const currentStatusValue = reservation.paidStatus || reservation.paymentStatus || (currentPaidNormalized ? 'paid' : 'unpaid');

    if (currentPaidNormalized === shouldBePaid && currentStatusValue === desiredStatusValue) {
      continue;
    }

    await updateReservationApi(reservationId, {
      paid_status: desiredStatusValue,
      paid: shouldBePaid,
    });
    changed = true;
  }

  if (changed) {
    state.reservations = getReservationsState();
  }

  return changed;
}

async function updateLinkedReservationsConfirmation(projectId) {
  if (!projectId) return false;

  const reservations = getReservationsState();
  const targets = reservations.filter((reservation) => String(reservation.projectId) === String(projectId));

  if (!targets.length) {
    return false;
  }

  let changed = false;

  for (const reservation of targets) {
    const reservationId = reservation.id ?? reservation.reservationId;
    if (!reservationId) continue;
    const alreadyConfirmed = reservation.confirmed === true || reservation.confirmed === 'true';
    if (alreadyConfirmed) {
      continue;
    }
    await updateReservationApi(reservationId, { confirmed: true });
    changed = true;
  }

  if (changed) {
    state.reservations = getReservationsState();
  }

  return changed;
}

async function handleProjectReservationSync(projectId, paymentStatus) {
  if (!projectId) return false;
  const reservationsUpdated = await updateLinkedReservationsPaymentStatus(projectId, paymentStatus);
  if (reservationsUpdated) {
    document.dispatchEvent(new CustomEvent('reservations:changed'));
  }
  return reservationsUpdated;
}

function isProjectToday(project) {
  if (!project?.start) return false;
  const start = new Date(project.start);
  if (Number.isNaN(start.getTime())) return false;
  const now = new Date();
  return start.getFullYear() === now.getFullYear() &&
    start.getMonth() === now.getMonth() &&
    start.getDate() === now.getDate();
}

function isProjectThisWeek(project) {
  if (!project?.start) return false;
  const start = new Date(project.start);
  if (Number.isNaN(start.getTime())) return false;

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? 6 : day - 1;
  startOfWeek.setDate(startOfWeek.getDate() - diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  return start >= startOfWeek && start < endOfWeek;
}

const statusFallbackLabels = {
  upcoming: 'Upcoming',
  ongoing: 'In Progress',
  completed: 'Completed'
};

const statusBadgeClass = {
  upcoming: 'bg-info',
  ongoing: 'bg-warning',
  completed: 'bg-success'
};

function determineProjectStatus(project) {
  const now = new Date();
  const start = project.start ? new Date(project.start) : null;
  const end = project.end ? new Date(project.end) : null;

  if (start && !Number.isNaN(start.getTime()) && start > now) {
    return 'upcoming';
  }

  if (end && !Number.isNaN(end.getTime()) && end < now) {
    return 'completed';
  }

  return 'ongoing';
}

function getProjectExpenses(project) {
  if (typeof project.expensesTotal === 'number') {
    return project.expensesTotal;
  }
  if (Array.isArray(project.expenses)) {
    return project.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  }
  return 0;
}

function resolveProjectTotals(project) {
  const equipmentEstimate = Number(project?.equipmentEstimate) || 0;
  const expensesTotal = getProjectExpenses(project);
  const subtotalRaw = equipmentEstimate + expensesTotal;
  const subtotal = Number(subtotalRaw.toFixed(2));
  const applyTax = project?.applyTax === true || project?.applyTax === 'true';

  let taxAmount = applyTax ? Number(project?.taxAmount) : 0;
  if (applyTax) {
    if (!Number.isFinite(taxAmount) || taxAmount < 0) {
      taxAmount = Number((subtotal * PROJECT_TAX_RATE).toFixed(2));
    }
  } else {
    taxAmount = 0;
  }

  let totalWithTax = applyTax ? Number(project?.totalWithTax) : subtotal;
  if (applyTax) {
    if (!Number.isFinite(totalWithTax) || totalWithTax <= 0) {
      totalWithTax = Number((subtotal + taxAmount).toFixed(2));
    }
  } else {
    totalWithTax = subtotal;
  }

  return {
    equipmentEstimate,
    expensesTotal,
    subtotal,
    applyTax,
    taxAmount,
    totalWithTax
  };
}

function truncateText(value, maxLength) {
  if (!value) return '';
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}…`;
}

function updateSummary() {
  const totalProjects = state.projects.length;
  const upcoming = state.projects.filter((project) => {
    const start = project.start ? new Date(project.start) : null;
    if (!start || Number.isNaN(start.getTime())) return false;
    return start > new Date();
  }).length;
  const expensesTotal = state.projects.reduce((sum, project) => sum + resolveProjectTotals(project).expensesTotal, 0);
  const budgetTotal = state.projects.reduce((sum, project) => sum + resolveProjectTotals(project).totalWithTax, 0);

  if (dom.projectsCount) dom.projectsCount.textContent = normalizeNumbers(String(totalProjects));
  if (dom.projectsUpcoming) dom.projectsUpcoming.textContent = normalizeNumbers(String(upcoming));
  if (dom.projectsExpenses) dom.projectsExpenses.textContent = formatCurrency(expensesTotal);
  if (dom.projectsBudget) dom.projectsBudget.textContent = formatCurrency(budgetTotal);
}

function calculateExpensesTotal() {
  return state.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
}

function normalizeEquipmentKey(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

function resolveSelectedEquipmentForApi() {
  if (!Array.isArray(state.selectedEquipment) || state.selectedEquipment.length === 0) {
    return { items: [], missing: [] };
  }

  const equipmentIndex = new Map(
    (state.equipment || []).map((item) => [normalizeEquipmentKey(item?.barcode), item])
  );

  const missing = [];
  const items = [];

  state.selectedEquipment.forEach((selection) => {
    const key = normalizeEquipmentKey(selection?.barcode);
    if (!key) {
      missing.push(selection?.barcode || '');
      return;
    }
    const equipmentItem = equipmentIndex.get(key);
    if (!equipmentItem || equipmentItem.id == null) {
      missing.push(selection?.barcode || key);
      return;
    }

    const quantity = Number.parseInt(String(selection?.qty ?? 0), 10);
    items.push({
      equipmentId: equipmentItem.id,
      qty: Number.isInteger(quantity) && quantity > 0 ? quantity : 1,
    });
  });

  return { items, missing };
}

function mapProjectEquipmentToApi(project) {
  if (!project || !Array.isArray(project.equipment)) return [];
  return project.equipment
    .map((item) => {
      const equipmentId = item?.equipmentId ?? item?.equipment_id ?? item?.id ?? null;
      const qty = Number.parseInt(String(item?.qty ?? item?.quantity ?? 0), 10);
      if (!equipmentId) return null;
      return {
        equipmentId,
        qty: Number.isInteger(qty) && qty > 0 ? qty : 1,
      };
    })
    .filter(Boolean);
}

function calculateEquipmentEstimate() {
  return state.selectedEquipment.reduce((sum, item) => {
    const equipment = state.equipment.find((eq) => String(eq.barcode || '') === String(item.barcode));
    const price = Number(equipment?.price || equipment?.daily_rate || equipment?.dailyRate || 0);
    return sum + price * (item.qty || 1);
  }, 0);
}

function formatDateRange(start, end) {
  if (!start) return '—';
  const startText = formatDateTime(start);
  if (!end) return startText;
  return `${startText} - ${formatDateTime(end)}`;
}

function splitDateTimeParts(value) {
  if (!value || typeof value !== 'string') {
    return { date: '', time: '' };
  }
  const [datePart = '', timePart = ''] = value.split('T');
  const time = timePart ? timePart.slice(0, 5) : '';
  return { date: datePart, time };
}

function setDateInputValue(input, value) {
  if (!input) return;
  if (input._flatpickr) {
    if (value) {
      input._flatpickr.setDate(value, true, 'Y-m-d');
    } else {
      input._flatpickr.clear();
    }
  } else {
    input.value = value || '';
  }
}

function setTimeInputValue(input, value) {
  if (!input) return;
  if (input._flatpickr) {
    if (value) {
      input._flatpickr.setDate(value, true, 'H:i');
    } else {
      input._flatpickr.clear();
    }
  } else {
    input.value = value || '';
  }
}

function buildProjectTypeOptionsMarkup(selectedType) {
  const typeKeys = ['commercial', 'coverage', 'photography', 'social'];
  const options = typeKeys.map((type) => {
    const label = escapeHtml(t(`projects.form.types.${type}`, type));
    const selected = String(type) === String(selectedType) ? ' selected' : '';
    return `<option value="${type}"${selected}>${label}</option>`;
  });

  if (selectedType && !typeKeys.includes(selectedType)) {
    const fallbackLabel = escapeHtml(getProjectTypeLabel(selectedType));
    options.push(`<option value="${escapeHtml(selectedType)}" selected>${fallbackLabel}</option>`);
  }

  const placeholder = escapeHtml(t('projects.form.placeholders.type', 'اختر نوع المشروع'));
  return `<option value="">${placeholder}</option>${options.join('')}`;
}

function buildProjectEditForm(project, editState = { clientName: '', clientCompany: '', expenses: [] }) {
  const titleLabel = t('projects.form.labels.title', 'اسم المشروع');
  const typeLabel = t('projects.form.labels.type', 'نوع المشروع');
  const paymentStatusLabel = t('projects.form.labels.paymentStatus', 'حالة الدفع');
  const descriptionLabel = t('projects.details.labels.notes', 'ملاحظات المشروع');
  const startDateLabel = t('projects.form.labels.startDate', '📅 تاريخ البداية');
  const startTimeLabel = t('projects.form.labels.startTime', '⏰ وقت البداية');
  const endDateLabel = t('projects.form.labels.endDate', '📅 تاريخ النهاية');
  const endTimeLabel = t('projects.form.labels.endTime', '⏰ وقت النهاية');
  const taxLabel = t('projects.form.taxLabel', 'شامل الضريبة (15٪)');
  const clientLabel = t('projects.form.labels.client', 'العميل');
  const clientCompanyLabel = t('projects.form.labels.clientCompany', 'شركة العميل');
  const expenseLabelLabel = t('projects.form.labels.expenseLabel', 'اسم المصروف');
  const expenseAmountLabel = t('projects.form.labels.expenseAmount', 'المبلغ (ر.س)');
  const addExpenseLabel = t('projects.form.buttons.addExpense', '➕ إضافة مصروف');
  const expensePlaceholder = t('projects.form.placeholders.expenseLabel', 'مثال: رسوم موقع التصوير');
  const heading = t('projects.details.edit.heading', 'تعديل المشروع');
  const subheading = t('projects.details.edit.subheading', 'قم بتحديث بيانات المشروع ثم احفظ التغييرات.');
  const saveLabel = t('projects.details.edit.save', '💾 حفظ التعديلات');
  const cancelLabel = t('projects.details.edit.cancel', 'إلغاء');
  const paymentStatusPaid = t('projects.form.paymentStatus.paid', 'مدفوع');
  const paymentStatusUnpaid = t('projects.form.paymentStatus.unpaid', 'غير مدفوع');
  const paymentStatus = project.paymentStatus === 'paid' ? 'paid' : 'unpaid';

  const startParts = splitDateTimeParts(project.start || '');
  const endParts = splitDateTimeParts(project.end || '');
  const descriptionValue = project.description || '';
  const applyTax = project.applyTax === true || project.applyTax === 'true';
  const clientNameValue = editState.clientName || t('projects.fallback.unknownClient', 'عميل غير معروف');
  const clientCompanyValue = editState.clientCompany || '—';
  const expensesListMarkup = buildProjectEditExpensesMarkup(editState.expenses);

  return `
    <div class="project-details-edit">
      <div class="project-details-header mb-3">
        <h5 class="fw-bold mb-1">${escapeHtml(heading)}</h5>
        <p class="text-muted small mb-0">${escapeHtml(subheading)}</p>
      </div>
      <form id="project-details-edit-form" class="project-details-edit-form">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label" for="project-edit-title">${escapeHtml(titleLabel)}</label>
            <input type="text" class="form-control" id="project-edit-title" name="project-title" value="${escapeHtml(project.title || '')}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-type">${escapeHtml(typeLabel)}</label>
            <select class="form-select" id="project-edit-type" name="project-type" required>
              ${buildProjectTypeOptionsMarkup(project.type)}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-client">${escapeHtml(clientLabel)}</label>
            <input type="text" class="form-control" id="project-edit-client" value="${escapeHtml(clientNameValue)}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-client-company">${escapeHtml(clientCompanyLabel)}</label>
            <input type="text" class="form-control" id="project-edit-client-company" value="${escapeHtml(clientCompanyValue)}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-date">${escapeHtml(startDateLabel)}</label>
            <input type="date" class="form-control" id="project-edit-start-date" name="project-start-date" value="${escapeHtml(startParts.date)}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-date">${escapeHtml(endDateLabel)}</label>
            <input type="date" class="form-control" id="project-edit-end-date" name="project-end-date" value="${escapeHtml(endParts.date)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-time">${escapeHtml(startTimeLabel)}</label>
            <input type="time" class="form-control" id="project-edit-start-time" name="project-start-time" value="${escapeHtml(startParts.time)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-time">${escapeHtml(endTimeLabel)}</label>
            <input type="time" class="form-control" id="project-edit-end-time" name="project-end-time" value="${escapeHtml(endParts.time)}">
          </div>
          <div class="col-12">
            <label class="form-label" for="project-edit-description">${escapeHtml(descriptionLabel)}</label>
            <textarea class="form-control" id="project-edit-description" name="project-description" rows="3">${escapeHtml(descriptionValue)}</textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-label">${escapeHtml(expenseLabelLabel)}</label>
            <input type="text" class="form-control" id="project-edit-expense-label" placeholder="${escapeHtml(expensePlaceholder)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-amount">${escapeHtml(expenseAmountLabel)}</label>
            <input type="text" class="form-control" id="project-edit-expense-amount" inputmode="decimal" placeholder="0">
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-primary" data-action="add-expense">${escapeHtml(addExpenseLabel)}</button>
          </div>
          <div class="col-12">
            <div id="project-edit-expense-list" class="project-edit-expense-list">
              ${expensesListMarkup}
            </div>
          </div>
        </div>
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mt-4">
          <div class="project-form-status d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 flex-grow-1">
            <div class="project-edit-payment-select">
              <label class="form-label" for="project-edit-payment-status">${escapeHtml(paymentStatusLabel)}</label>
              <select class="form-select" id="project-edit-payment-status" name="project-payment-status">
                <option value="unpaid" ${paymentStatus !== 'paid' ? 'selected' : ''}>${escapeHtml(paymentStatusUnpaid)}</option>
                <option value="paid" ${paymentStatus === 'paid' ? 'selected' : ''}>${escapeHtml(paymentStatusPaid)}</option>
              </select>
            </div>
            <div class="form-check form-switch m-0 project-edit-tax"> 
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${applyTax ? 'checked' : ''}>
              <label class="form-check-label" for="project-edit-tax">${escapeHtml(taxLabel)}</label>
            </div>
          </div>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-action="cancel-edit">${escapeHtml(cancelLabel)}</button>
            <button type="submit" class="btn btn-sm btn-primary">${escapeHtml(saveLabel)}</button>
          </div>
        </div>
      </form>
    </div>
  `;
}

function buildProjectEditExpensesMarkup(expenses = []) {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    const emptyText = escapeHtml(t('projects.selected.emptyExpenses', 'لم يتم تسجيل أي مصروف'));
    return `<div class="text-muted small" data-empty>${emptyText}</div>`;
  }

  const removeLabel = escapeHtml(t('actions.remove', 'إزالة'));
  return expenses
    .map((expense) => {
      const label = escapeHtml(expense?.label || '');
      const amount = escapeHtml(formatCurrency(expense?.amount || 0));
      const id = escapeHtml(String(expense?.id || ''));
      return `
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${label}</div>
            <div class="text-muted small">${amount}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${id}" aria-label="${removeLabel}">✖</button>
        </div>
      `;
    })
    .join('');
}

function refreshProjectSubmitButton() {
  if (!dom.submitBtn) return;
  const isEditing = Boolean(state.editingProjectId);
  const labelKey = isEditing ? 'projects.form.buttons.update' : 'projects.form.buttons.save';
  const fallback = isEditing ? '🔁 تحديث المشروع' : '🆕 إنشاء المشروع';
  dom.submitBtn.textContent = t(labelKey, fallback);
}

async function removeProject(projectId) {
  const index = state.projects.findIndex((project) => String(project.id) === String(projectId));
  if (index === -1) return;
  if (!window.confirm(t('projects.confirm.delete', 'هل أنت متأكد من حذف هذا المشروع؟'))) return;

  try {
    await deleteProjectApi(projectId);
    await refreshProjectsFromApi();
    await refreshReservationsFromApi();

    state.projects = getProjectsState();
    state.reservations = getReservationsState();

    renderProjects();
    updateSummary();
    showToast(t('projects.toast.deleted', '🗑️ تم حذف المشروع'));

    document.dispatchEvent(new CustomEvent('projects:changed'));
    document.dispatchEvent(new CustomEvent('reservations:changed'));
  } catch (error) {
    console.error('❌ [projects] removeProject failed', error);
    const message = isProjectApiError(error)
      ? error.message
      : t('projects.toast.deleteFailed', 'تعذر حذف المشروع، حاول مرة أخرى');
    showToast(message, 'error');
  }
}

function openProjectDetails(projectId) {
  const project = state.projects.find((p) => String(p.id) === String(projectId));
  if (!project || !dom.detailsBody) return;

  dom.detailsBody.dataset.mode = 'view';

  const client = state.customers.find((c) => String(c.id) === String(project.clientId));
  const typeLabel = getProjectTypeLabel(project.type);
  const descriptionRaw = project.description?.trim();
  const descriptionDisplay = descriptionRaw || t('projects.fallback.noDescription', 'لا يوجد وصف');
  const clientName = client?.customerName || t('projects.fallback.unknownClient', 'عميل غير معروف');
  const projectCompany = (project.clientCompany || client?.companyName || '').trim();
  const projectCodeValue = project.projectCode || `PRJ-${normalizeNumbers(String(project.id))}`;
  const projectCodeDisplay = normalizeNumbers(projectCodeValue);

  const reservationsForProject = getReservationsForProject(project.id);
  const reservationsTotalRaw = reservationsForProject.reduce(
    (sum, reservation) => sum + resolveReservationNetTotal(reservation),
    0
  );
  const reservationsTotal = Number(reservationsTotalRaw.toFixed(2));
  const reservationsCount = reservationsForProject.length;

  const { subtotal, taxAmount, applyTax, expensesTotal } = resolveProjectTotals(project);
  const projectTotal = subtotal;
  const combinedTaxAmount = applyTax
    ? Number(((projectTotal + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((projectTotal + reservationsTotal + combinedTaxAmount).toFixed(2));

  const status = determineProjectStatus(project);
  const statusLabel = t(`projects.status.${status}`, statusFallbackLabels[status] || status);
  const statusChipClassMap = {
    upcoming: 'status-pending',
    ongoing: 'status-confirmed',
    completed: 'status-completed'
  };
  const statusChipClass = statusChipClassMap[status] || 'status-confirmed';
  const vatChipText = applyTax
    ? t('projects.details.chips.vatOn', 'شامل الضريبة 15٪')
    : t('projects.details.chips.vatOff', 'غير شامل الضريبة');
  const vatChipClass = applyTax ? 'status-paid' : 'status-unpaid';
  const reservationsChipText = t('projects.details.chips.reservations', '{count} حجوزات')
    .replace('{count}', normalizeNumbers(String(reservationsCount)));
  const paymentStatusValue = project.paymentStatus === 'paid' ? 'paid' : 'unpaid';
  const paymentStatusText = t(`projects.paymentStatus.${paymentStatusValue}`, paymentStatusValue === 'paid' ? 'Paid' : 'Unpaid');
  const paymentStatusChipClass = paymentStatusValue === 'paid' ? 'status-paid' : 'status-unpaid';
  const confirmedChipText = t('projects.focus.confirmed', '✅ مشروع مؤكد');
  const confirmedChipHtml = project.confirmed === true || project.confirmed === 'true'
    ? `<span class="reservation-chip status-confirmed">${escapeHtml(confirmedChipText)}</span>`
    : '';

  const summaryDetails = [];
  summaryDetails.push({
    icon: '💳',
    label: t('projects.details.summary.paymentStatus', 'حالة الدفع'),
    value: paymentStatusText
  });
  summaryDetails.push({
    icon: '💼',
    label: t('projects.details.summary.projectSubtotal', 'إجمالي المشروع'),
    value: formatCurrency(projectTotal)
  });
  const reservationsValue = formatCurrency(reservationsTotal);
  summaryDetails.push({
    icon: '🔗',
    label: t('projects.details.summary.reservationsTotal', 'إجمالي المعدات / طاقم العمل'),
    value: reservationsValue
  });
  summaryDetails.push({
    icon: '🧮',
    label: t('projects.details.summary.combinedTax', 'إجمالي الضريبة الكلية (15٪)'),
    value: formatCurrency(combinedTaxAmount)
  });
  summaryDetails.push({
    icon: '💰',
    label: t('projects.details.summary.overallTotal', 'الإجمالي الكلي'),
    value: formatCurrency(overallTotal)
  });

  const summaryDetailsHtml = summaryDetails.map(({ icon, label, value }) => `
    <div class="summary-details-row">
      <span class="summary-details-label">${icon} ${escapeHtml(label)}</span>
      <span class="summary-details-value">${escapeHtml(value)}</span>
    </div>
  `).join('');

  const infoRows = [];
  infoRows.push({ icon: '🆔', label: t('projects.details.labels.code', 'رقم المشروع'), value: `#${projectCodeDisplay}` });
  infoRows.push({ icon: '👤', label: t('projects.details.client', 'العميل'), value: clientName });
  if (projectCompany) {
    infoRows.push({ icon: '🏢', label: t('projects.details.company', 'شركة العميل'), value: projectCompany });
  }
  infoRows.push({ icon: '🏷️', label: t('projects.details.type', 'نوع المشروع'), value: typeLabel });
  infoRows.push({ icon: '🗓️', label: t('projects.details.labels.start', 'تاريخ البداية'), value: formatDateTime(project.start) });
  infoRows.push({ icon: '🗓️', label: t('projects.details.labels.end', 'تاريخ النهاية'), value: project.end ? formatDateTime(project.end) : '—' });
  infoRows.push({ icon: '🔗', label: t('projects.details.labels.reservationsCount', 'عدد الحجوزات'), value: normalizeNumbers(String(reservationsCount)) });

  const renderInfoRow = (icon, label, value) => `
    <div class="res-info-row">
      <span class="label">${icon} ${escapeHtml(label)}</span>
      <span class="separator">:</span>
      <span class="value">${escapeHtml(value)}</span>
    </div>
  `;

  const infoRowsHtml = infoRows.map(({ icon, label, value }) => renderInfoRow(icon, label, value)).join('');

  const expensesTitle = t('projects.details.expenses', 'المصروفات ({amount})')
    .replace('{amount}', formatCurrency(expensesTotal));
  const expensesContent = expensesTotal > 0
    ? `<ul class="project-details-list">${(project.expenses || []).map((expense) => `
        <li>
          <span class="project-expense-label">${escapeHtml(expense.label)}</span>
          <span class="project-expense-amount">${formatCurrency(expense.amount)}</span>
        </li>
      `).join('')}</ul>`
    : `<div class="text-muted">${escapeHtml(t('projects.details.noItems', 'لا يوجد'))}</div>`;

  const reservationsSection = buildProjectReservationsSection(project);
  const projectCodeChip = `<span class="project-code-badge">#${escapeHtml(projectCodeDisplay)}</span>`;

  dom.detailsBody.dataset.projectId = String(project.id);
  dom.detailsBody.innerHTML = `
    <div class="project-details-header mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h5 class="mb-2 d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted project-details-title-label">${escapeHtml(t('projects.details.labels.projectTitle', 'اسم المشروع'))}:</span>
            <span class="fw-bold project-details-title-text">${escapeHtml(project.title)}</span>
            ${projectCodeChip}
          </h5>
        </div>
        <div class="status-chips d-flex flex-wrap gap-2">
          <span class="status-chip ${statusChipClass}">${escapeHtml(statusLabel)}</span>
          <span class="status-chip ${vatChipClass}">${escapeHtml(vatChipText)}</span>
          <span class="reservation-chip ${paymentStatusChipClass}">${escapeHtml(paymentStatusText)}</span>
          <span class="reservation-chip status-confirmed">${escapeHtml(reservationsChipText)}</span>
          ${confirmedChipHtml}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${infoRowsHtml}
    </div>
    <div class="project-details-section mb-4">
      <h6>${escapeHtml(t('projects.details.labels.notes', 'ملاحظات المشروع'))}</h6>
      <div class="project-notes">${escapeHtml(descriptionDisplay)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${escapeHtml(expensesTitle)}</h6>
      ${expensesContent}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${summaryDetailsHtml}
    </div>
    ${reservationsSection}
  `;

  bindProjectDetailsEvents(project);
  if (window.bootstrap?.Modal && dom.detailsModalEl) {
    window.bootstrap.Modal.getOrCreateInstance(dom.detailsModalEl).show();
  }
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatCurrency(value) {
  const number = Number(value) || 0;
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(number));
  const currencyLabel = lang === 'ar' ? 'ر.س' : 'SAR';
  return `${normalizeNumbers(formatted)} ${currencyLabel}`;
}

function formatDateTime(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const hours24 = date.getHours();
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  const hours = String(hours12).padStart(2, '0');
  const formatted = `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
  return normalizeNumbers(formatted);
}

function formatProjectsCount(count) {
  const lang = getCurrentLanguage();
  const normalized = normalizeNumbers(String(count));
  if (lang === 'en') {
    const suffix = count === 1 ? 'project' : 'projects';
    return `${normalized} ${suffix}`;
  }
  return `${normalized} مشروع`;
}

function setTableCount(count) {
  if (!dom.tableCount) return;
  dom.tableCount.dataset.count = String(count);
  dom.tableCount.textContent = formatProjectsCount(count);
}

function getEmptyText(container) {
  if (!container) return '';
  const key = container.dataset.emptyKey;
  const fallback = container.dataset.empty || '';
  return key ? t(key, fallback) : fallback;
}
