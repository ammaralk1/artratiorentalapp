import { loadData, saveData } from '../storage.js';
import { apiRequest } from '../apiClient.js';
import { generateProjectCode } from '../utils.js';
import { normalizeText } from '../reservationsShared.js';
import { getProjectsState } from '../projectsService.js';
import { getReservationsState } from '../reservationsService.js';
import { isLocalBypassAuthEnabled } from '../fixtureRuntime.js';
import { dom, state } from './state.js';

let projectCustomerAutocompleteInitialised = false;
let projectCustomerActiveIndex = -1;
let projectCustomerVisibleMatches = [];
let projectCustomersRequest = null;
let projectCustomersLoadedFromApi = false;

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function mapProjectCustomerRecord(rawCustomer = {}) {
  if (!rawCustomer || typeof rawCustomer !== 'object') {
    return null;
  }

  const idValue = rawCustomer.id ?? rawCustomer.customerId ?? rawCustomer.reservationId ?? rawCustomer.customerID;
  const rawName = rawCustomer.full_name ?? rawCustomer.customerName ?? rawCustomer.name ?? '';
  const name = typeof rawName === 'string' ? rawName.trim() : String(rawName || '').trim();
  if (!name) return null;

  const rawCompany = rawCustomer.company ?? rawCustomer.companyName ?? '';
  const company = typeof rawCompany === 'string' ? rawCompany.trim() : String(rawCompany || '').trim();

  return {
    ...rawCustomer,
    id: idValue !== undefined && idValue !== null ? String(idValue) : '',
    full_name: name,
    customerName: name,
    name,
    company,
    companyName: company,
  };
}

function syncProjectCustomerComboboxState({ expanded = false, activeId = '' } = {}) {
  if (!dom.client || !dom.clientSuggestions) return;

  dom.client.setAttribute('role', 'combobox');
  dom.client.setAttribute('aria-autocomplete', 'list');
  dom.client.setAttribute('aria-haspopup', 'listbox');
  dom.client.setAttribute('aria-controls', dom.clientSuggestions.id);
  dom.client.setAttribute('aria-expanded', expanded ? 'true' : 'false');

  if (activeId) {
    dom.client.setAttribute('aria-activedescendant', activeId);
  } else {
    dom.client.removeAttribute('aria-activedescendant');
  }
}

function resetProjectCustomerHighlight() {
  projectCustomerActiveIndex = -1;
  syncProjectCustomerComboboxState({
    expanded: dom.clientSuggestions?.classList.contains('is-visible') === true,
  });
}

function getProjectCustomerDisplayName(customer) {
  return String(customer?.customerName || customer?.full_name || customer?.name || '').trim();
}

function chooseProjectCustomer(customer) {
  if (!customer || !dom.client) return;

  dom.client.value = getProjectCustomerDisplayName(customer);
  dom.client.dataset.customerId = String(customer.id || '');
  setProjectClientCompany(customer);
  clearProjectCustomerSuggestions();
}

async function ensureProjectCustomersLoaded() {
  if (Array.isArray(state.customers) && state.customers.length > 0) {
    return state.customers;
  }

  const snapshot = loadData();
  if (Array.isArray(snapshot?.customers) && snapshot.customers.length > 0) {
    state.customers = snapshot.customers.map(mapProjectCustomerRecord).filter(Boolean);
    return state.customers;
  }

  if (isLocalBypassAuthEnabled() || projectCustomersLoadedFromApi) {
    return state.customers;
  }

  if (projectCustomersRequest) {
    return projectCustomersRequest;
  }

  projectCustomersRequest = apiRequest('/customers/')
    .then((response) => {
      const records = Array.isArray(response?.data)
        ? response.data.map(mapProjectCustomerRecord).filter(Boolean)
        : [];
      state.customers = records;
      saveData({ customers: records });
      projectCustomersLoadedFromApi = true;
      return records;
    })
    .catch((error) => {
      console.error('❌ [projects] Failed to load customers for create-project combobox', error);
      return state.customers;
    })
    .finally(() => {
      projectCustomersRequest = null;
    });

  return projectCustomersRequest;
}

function setActiveProjectCustomerSuggestion(index) {
  if (!dom.clientSuggestions) return;

  const items = Array.from(dom.clientSuggestions.querySelectorAll('.suggestion-item'));
  if (!items.length) {
    resetProjectCustomerHighlight();
    return;
  }

  const safeIndex = Math.max(0, Math.min(index, items.length - 1));
  projectCustomerActiveIndex = safeIndex;

  items.forEach((item, itemIndex) => {
    const isActive = itemIndex === safeIndex;
    item.classList.toggle('is-active', isActive);
    item.setAttribute('aria-selected', isActive ? 'true' : 'false');
    if (isActive) {
      syncProjectCustomerComboboxState({ expanded: true, activeId: item.id });
      item.scrollIntoView({ block: 'nearest' });
    }
  });
}

export function ensureProjectCodes() {
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

export function loadAllData() {
  const { customers, technicians, equipment } = loadData();
  state.customers = Array.isArray(customers) ? customers.map(mapProjectCustomerRecord).filter(Boolean) : [];
  state.technicians = Array.isArray(technicians) ? technicians : [];
  state.equipment = Array.isArray(equipment) ? equipment : [];
  state.reservations = getReservationsState();
  state.projects = getProjectsState();

  ensureProjectCodes();
}

export function populateSelects() {
  refreshProjectClientField();
}

export function setProjectClientCompany(customer) {
  if (!dom.clientCompany) return;
  const company = customer?.companyName || customer?.company || '';
  dom.clientCompany.value = company;
}

export function refreshProjectClientField() {
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
    void ensureProjectCustomersLoaded().then(() => {
      renderProjectCustomerSuggestions();
    });
  }
}

export function setupProjectCustomerAutocomplete() {
  if (!dom.client || !dom.clientSuggestions || projectCustomerAutocompleteInitialised) return;

  dom.clientSuggestions.setAttribute('role', 'listbox');
  syncProjectCustomerComboboxState({ expanded: false });

  dom.client.addEventListener('input', () => {
    dom.client.dataset.customerId = '';
    setProjectClientCompany(null);
    void ensureProjectCustomersLoaded().then(() => {
      renderProjectCustomerSuggestions();
    });
  });

  dom.client.addEventListener('keydown', (event) => {
    const isOpen = dom.clientSuggestions.classList.contains('is-visible');

    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && !isOpen) {
      event.preventDefault();
      void ensureProjectCustomersLoaded().then(() => {
        renderProjectCustomerSuggestions();
        setActiveProjectCustomerSuggestion(0);
      });
      return;
    }

    if (!isOpen) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!projectCustomerVisibleMatches.length) return;
      const nextIndex = projectCustomerActiveIndex < projectCustomerVisibleMatches.length - 1
        ? projectCustomerActiveIndex + 1
        : 0;
      setActiveProjectCustomerSuggestion(nextIndex);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!projectCustomerVisibleMatches.length) return;
      const nextIndex = projectCustomerActiveIndex > 0
        ? projectCustomerActiveIndex - 1
        : projectCustomerVisibleMatches.length - 1;
      setActiveProjectCustomerSuggestion(nextIndex);
      return;
    }

    if (event.key === 'Enter') {
      if (!projectCustomerVisibleMatches.length) return;
      event.preventDefault();
      const targetIndex = projectCustomerActiveIndex >= 0 ? projectCustomerActiveIndex : 0;
      chooseProjectCustomer(projectCustomerVisibleMatches[targetIndex]);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      clearProjectCustomerSuggestions();
    }
  });

  dom.client.addEventListener('focus', () => {
    void ensureProjectCustomersLoaded().then(() => {
      renderProjectCustomerSuggestions();
    });
  });

  dom.client.addEventListener('blur', () => {
    window.setTimeout(() => clearProjectCustomerSuggestions(), 150);
  });

  projectCustomerAutocompleteInitialised = true;
}

export function clearProjectCustomerSuggestions() {
  if (!dom.clientSuggestions) return;
  projectCustomerVisibleMatches = [];
  resetProjectCustomerHighlight();
  dom.clientSuggestions.classList.remove('is-visible');
  dom.clientSuggestions.hidden = true;
  dom.clientSuggestions.innerHTML = '';
  syncProjectCustomerComboboxState({ expanded: false });
}

export function renderProjectCustomerSuggestions() {
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

  projectCustomerVisibleMatches = matches;
  resetProjectCustomerHighlight();

  dom.clientSuggestions.innerHTML = matches
    .map((option, index) => {
      const companyLine = option.company
        ? `<div class="suggestion-item__meta">${escapeHtml(option.company)}</div>`
        : '';
      const optionId = `project-customer-option-${escapeHtml(String(option.id || index))}`;
      return `
        <div
          class="suggestion-item"
          id="${optionId}"
          role="option"
          aria-selected="false"
          data-index="${index}"
          data-id="${escapeHtml(String(option.id))}"
        >
          <div class="suggestion-item__primary">${escapeHtml(option.name)}</div>
          ${companyLine}
        </div>
      `;
    })
    .join('');

  dom.clientSuggestions.hidden = false;
  dom.clientSuggestions.classList.add('is-visible');
  dom.clientSuggestions.scrollTop = 0;
  syncProjectCustomerComboboxState({ expanded: true });

  dom.clientSuggestions.querySelectorAll('.suggestion-item').forEach((item) => {
    item.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      const index = Number.parseInt(item.dataset.index || '', 10);
      if (!Number.isFinite(index)) return;
      chooseProjectCustomer(matches[index]);
    });

    item.addEventListener('mouseenter', () => {
      const index = Number.parseInt(item.dataset.index || '', 10);
      if (Number.isFinite(index)) {
        setActiveProjectCustomerSuggestion(index);
      }
    });
  });
}

export function getProjectCustomerOptions() {
  if (!Array.isArray(state.customers)) return [];

  return state.customers
    .map((customer) => {
      const name = getProjectCustomerDisplayName(customer);
      if (!name) return null;
      return {
        id: customer.id,
        name,
        company: String(customer.companyName || customer.company || '').trim(),
      };
    })
    .filter(Boolean);
}

export function resolveProjectCustomer(inputValue, selectedId = '') {
  if (!Array.isArray(state.customers) || state.customers.length === 0) return null;

  if (selectedId) {
    const byId = state.customers.find((customer) => String(customer.id) === String(selectedId));
    if (byId) {
      return byId;
    }
  }

  const normalizedInput = normalizeText(inputValue || '');
  if (!normalizedInput) return null;

  const exactMatch = state.customers.find((customer) => normalizeText(getProjectCustomerDisplayName(customer)) === normalizedInput);
  if (exactMatch) {
    return exactMatch;
  }

  return state.customers.find((customer) => normalizeText(getProjectCustomerDisplayName(customer)).includes(normalizedInput)) || null;
}
