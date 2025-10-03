import { t } from '../language.js';
import { loadData } from '../storage.js';
import { generateProjectCode, normalizeNumbers } from '../utils.js';
import { normalizeText } from '../reservationsShared.js';
import { getProjectsState } from '../projectsService.js';
import { getReservationsState } from '../reservationsService.js';
import { dom, state } from './state.js';
import { escapeHtml } from './formatting.js';

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
  state.customers = Array.isArray(customers) ? customers : [];
  state.technicians = Array.isArray(technicians) ? technicians : [];
  state.equipment = Array.isArray(equipment) ? equipment : [];
  state.reservations = getReservationsState();
  state.projects = getProjectsState();

  ensureProjectCodes();
}

export function populateSelects() {
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
    renderProjectCustomerSuggestions();
  }
}

export function setupProjectCustomerAutocomplete() {
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

export function clearProjectCustomerSuggestions() {
  if (!dom.clientSuggestions) return;
  dom.clientSuggestions.style.display = 'none';
  dom.clientSuggestions.innerHTML = '';
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

export function getProjectCustomerOptions() {
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

  const exactMatch = state.customers.find((customer) => normalizeText(customer.customerName || customer.name || '') === normalizedInput);
  if (exactMatch) {
    return exactMatch;
  }

  return state.customers.find((customer) => normalizeText(customer.customerName || customer.name || '').includes(normalizedInput)) || null;
}
