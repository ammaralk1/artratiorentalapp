import { loadData } from '../storage.js';
import { showToast, generateReservationId, normalizeNumbers } from '../utils.js';
import { t } from '../language.js';
import {
  resolveItemImage,
  getEquipmentRecordByBarcode,
  findEquipmentByBarcode,
  getEquipmentAvailabilityStatus,
  isEquipmentUnavailable,
  isEquipmentAvailable
} from '../reservationsEquipment.js';
import { getSelectedTechnicians, resetSelectedTechnicians } from '../reservationsTechnicians.js';
import {
  calculateReservationTotal,
  renderDraftSummary,
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculatePaymentProgress,
  determinePaymentStatus,
} from '../reservationsSummary.js';
import { normalizeText, groupReservationItems, resolveReservationItemGroupKey, resolveEquipmentIdentifier } from '../reservationsShared.js';
import {
  getSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setSelectedItems,
  getCachedCustomers,
  setCachedCustomers,
  getCachedEquipment,
  setCachedEquipment,
  combineDateTime,
  splitDateTime,
  normalizeBarcodeValue,
  hasEquipmentConflict,
  hasTechnicianConflict
} from './state.js';
import { syncEquipmentStatuses } from '../equipment.js';
import { syncTechniciansStatuses } from '../technicians.js';
import {
  createReservationApi,
  buildReservationPayload,
  isApiError,
} from '../reservationsService.js';

const DEFAULT_PROJECT_FORM_DRAFT_KEY = 'projects:create:draft';
const DEFAULT_PROJECT_FORM_RETURN_URL = 'projects.html#projects-section';

let afterSubmitCallback = null;
let cachedProjects = [];

let customerOptionMap = new Map();
let projectOptionMap = new Map();
let equipmentDescriptionOptionMap = new Map();
let isSyncingShareTaxCreate = false;
let linkedProjectReturnContext = null;

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeEquipmentSearchValue(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

function buildEquipmentSearchValue(item = {}) {
  const description = String(item?.desc || item?.description || '')?.trim();
  const barcode = normalizeNumbers(String(item?.barcode || '')).trim();
  if (barcode) {
    return `${description} | ${barcode}`;
  }
  return description;
}

function parseEquipmentSearchValue(value) {
  const raw = normalizeNumbers(String(value || ''));
  if (!raw.trim()) {
    return { description: '', barcode: '' };
  }
  const [first, ...rest] = raw.split('|');
  return {
    description: first.trim(),
    barcode: rest.join('|').trim(),
  };
}

function getPaymentProgressType(select, fallback = 'percent') {
  const value = select?.value;
  if (value === 'amount' || value === 'percent') {
    return value;
  }
  return fallback;
}

function parsePaymentProgressValue(input) {
  if (!input) return null;
  const raw = normalizeNumbers(String(input.value || '')).replace('%', '').trim();
  if (!raw) return null;
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
}

function setPaymentProgressInputValue(input, value) {
  if (!input) return;
  if (value == null || !Number.isFinite(value) || value <= 0) {
    input.value = '';
    return;
  }
  input.value = normalizeNumbers(String(value));
}

export function getEquipmentUnavailableMessage(status) {
  switch (status) {
    case 'maintenance':
      return t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً');
    case 'reserved':
      return t('reservations.toast.equipmentReserved', '⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها');
    case 'retired':
      return t('reservations.toast.equipmentRetired', '⚠️ هذه المعدة خارج الخدمة حالياً');
    default:
      return t('reservations.toast.equipmentUnavailable', '⚠️ هذه المعدة غير متاحة حالياً');
  }
}

function getCustomerElements() {
  if (typeof document === 'undefined') {
    return { input: null, hidden: null, list: null };
  }
  return {
    input: document.getElementById('res-customer-input'),
    hidden: document.getElementById('res-customer'),
    list: document.getElementById('res-customer-options'),
  };
}

function getProjectElements() {
  if (typeof document === 'undefined') {
    return { input: null, hidden: null, list: null };
  }
  return {
    input: document.getElementById('res-project-input'),
    hidden: document.getElementById('res-project'),
    list: document.getElementById('res-project-options'),
  };
}

function isLinkedProjectSelected() {
  const { input, hidden } = getProjectElements();
  if (input?.dataset?.pendingLinked === 'true') return true;
  return Boolean(hidden?.value);
}

function registerLinkedControlGuard(element, conditionFn) {
  if (!element) return;
  const targets = new Set([element]);
  const parent = element.parentElement;
  if (parent) targets.add(parent);
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) targets.add(label);
  }

  const handler = (event) => {
    if (!conditionFn()) return;
    showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.'), 'error');
  };

  targets.forEach((target) => {
    if (!target || target.dataset?.linkedGuardAttached === 'true') return;
    ['mousedown', 'touchstart', 'keydown'].forEach((evt) => {
      target.addEventListener(evt, handler, { capture: true });
    });
    target.dataset.linkedGuardAttached = 'true';
  });
}

function resolveOptionByLabel(optionMap, value, { allowPartial = false } = {}) {
  const normalized = normalizeText(value);
  if (!normalized) return null;
  const exact = optionMap.get(normalized);
  if (exact) return exact;
  if (!allowPartial) return null;
  const matches = [];
  optionMap.forEach((entry, key) => {
    if (key.includes(normalized)) {
      matches.push(entry);
    }
  });
  if (matches.length === 1) {
    return matches[0];
  }
  return null;
}

function resolveCustomerByLabel(value, options = {}) {
  return resolveOptionByLabel(customerOptionMap, value, options);
}

function resolveProjectByLabel(value, options = {}) {
  return resolveOptionByLabel(projectOptionMap, value, options);
}

export function updatePaymentStatusAppearance(select, statusValue) {
  if (!select) return;
  const value = statusValue ?? select.value;
  select.classList.remove('payment-status-select--paid', 'payment-status-select--unpaid', 'payment-status-select--partial');
  if (value === 'paid') {
    select.classList.add('payment-status-select--paid');
  } else if (value === 'partial') {
    select.classList.add('payment-status-select--partial');
  } else {
    select.classList.add('payment-status-select--unpaid');
  }
}

function setCachedProjects(projects) {
  cachedProjects = Array.isArray(projects) ? [...projects] : [];
}

function getCachedProjects() {
  return cachedProjects;
}

function findProjectById(projectId) {
  if (!projectId) return null;
  return getCachedProjects().find((project) => String(project.id) === String(projectId)) || null;
}

function getProjectDisplayName(project) {
  if (!project) return '';
  const title = typeof project.title === 'string' ? project.title.trim() : '';
  if (title) return title;
  return t('projects.fallback.untitled', 'مشروع بدون اسم');
}

export function getCompanySharePercent(elementId = 'res-company-share') {
  const shareInput = document.getElementById(elementId);
  if (!shareInput || !shareInput.checked) {
    return null;
  }

  const raw = shareInput.dataset.companyShare ?? shareInput.value ?? DEFAULT_COMPANY_SHARE_PERCENT;
  const normalized = normalizeNumbers(String(raw).replace('%', '').trim());
  const parsed = parseFloat(normalized);
  if (!Number.isFinite(parsed)) {
    return DEFAULT_COMPANY_SHARE_PERCENT;
  }
  return parsed;
}

export function ensureCompanyShareEnabled(elementId = 'res-company-share') {
  const shareInput = document.getElementById(elementId);
  if (!shareInput) return;
  let raw = shareInput.dataset.companyShare ?? shareInput.value ?? DEFAULT_COMPANY_SHARE_PERCENT;
  let normalized = normalizeNumbers(String(raw).replace('%', '').trim());
  let parsed = parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    parsed = DEFAULT_COMPANY_SHARE_PERCENT;
  }
  shareInput.dataset.companyShare = String(parsed);
  shareInput.checked = true;
}

function syncCreateTaxAndShare(source) {
  const taxCheckbox = document.getElementById('res-tax');
  const shareCheckbox = document.getElementById('res-company-share');

  if (!taxCheckbox || !shareCheckbox) {
    return;
  }

  if (isSyncingShareTaxCreate) {
    renderDraftReservationSummary();
    return;
  }

  isSyncingShareTaxCreate = true;

  const finalize = () => {
    isSyncingShareTaxCreate = false;
    renderDraftReservationSummary();
  };

  if (source === 'share') {
    if (shareCheckbox.checked) {
      if (!shareCheckbox.dataset.companyShare) {
        shareCheckbox.dataset.companyShare = String(DEFAULT_COMPANY_SHARE_PERCENT);
      }

      if (taxCheckbox.disabled) {
        shareCheckbox.checked = false;
        showToast(t('reservations.toast.companyShareRequiresTax', '⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة'));
        finalize();
        return;
      }

      if (!taxCheckbox.checked) {
        taxCheckbox.checked = true;
      }

      ensureCompanyShareEnabled();
    } else {
      if (taxCheckbox.checked && !taxCheckbox.disabled) {
        taxCheckbox.checked = false;
      }
    }
  } else if (source === 'tax') {
    if (taxCheckbox.checked) {
      ensureCompanyShareEnabled();
    } else {
      if (shareCheckbox.checked) {
        shareCheckbox.checked = false;
      }
    }
  }

  finalize();
}

function isProjectConfirmed(project) {
  if (!project) return false;
  if (project.confirmed === true) return true;
  const status = typeof project.status === 'string' ? project.status.toLowerCase() : '';
  return ['confirmed', 'in_progress', 'completed'].includes(status);
}

function resolveProjectDateTime(project, key) {
  if (!project) return '';
  if (project[key]) return project[key];
  if (project[`${key}Datetime`]) return project[`${key}Datetime`];
  if (project[`${key}datetime`]) return project[`${key}datetime`];
  if (project[`${key}_datetime`]) return project[`${key}_datetime`];

  const datePart = project[`${key}Date`] ?? project[`${key}_date`];
  const timePart = project[`${key}Time`] ?? project[`${key}_time`];
  if (datePart) {
    const normalizedTime = typeof timePart === 'string' && timePart.trim()
      ? timePart.trim()
      : '00:00';
    return `${datePart}T${normalizedTime}`;
  }

  return '';
}

function getCustomerDisplayName(customer) {
  if (!customer) return '';

  const name = customer.customerName
    ?? customer.full_name
    ?? customer.fullName
    ?? customer.name
    ?? customer.customer_name
    ?? '';

  return typeof name === 'string' ? name.trim() : String(name || '').trim();
}

function ensureCustomerChoices({ selectedValue = '', resetInput = false } = {}) {
  const { input, hidden, list } = getCustomerElements();
  if (!input || !hidden || !list) return;

  const customers = getCachedCustomers() || [];
  const placeholderLabel = t('reservations.create.placeholders.client', 'اختر عميلًا (اختياري)');
  const fallbackLabel = t('customers.fallback.unnamed', 'عميل بدون اسم');

  input.setAttribute('placeholder', placeholderLabel);

  const seenLabels = new Set();
  customerOptionMap = new Map();

  const customerOptions = customers
    .filter((customer) => customer && customer.id != null)
    .map((customer) => ({
      id: String(customer.id),
      label: getCustomerDisplayName(customer) || fallbackLabel
    }))
    .filter((option) => {
      if (!option.label) return false;
      const normalizedLabel = normalizeText(option.label);
      if (!normalizedLabel) return false;
      if (seenLabels.has(normalizedLabel)) return false;
      seenLabels.add(normalizedLabel);
      customerOptionMap.set(normalizedLabel, option);
      return true;
    })
    .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));

  list.innerHTML = customerOptions
    .map((option) => `<option value="${escapeHtml(option.label)}"></option>`)
    .join('');

  const previousInputValue = resetInput ? '' : input.value;
  const normalizedSelected = selectedValue ? String(selectedValue) : hidden.value ? String(hidden.value) : '';
  const selectedCustomer = normalizedSelected
    ? customers.find((customer) => String(customer.id) === normalizedSelected)
    : null;

  if (selectedCustomer) {
    const label = getCustomerDisplayName(selectedCustomer) || fallbackLabel;
    hidden.value = String(selectedCustomer.id);
    input.value = label;
    input.dataset.selectedId = String(selectedCustomer.id);
  } else {
    hidden.value = '';
    input.dataset.selectedId = '';
    input.value = resetInput ? '' : previousInputValue;
  }
}

function ensureProjectChoices({ selectedValue = '', projectsList = null, resetInput = false } = {}) {
  const { input, hidden, list } = getProjectElements();
  if (!input || !hidden || !list) return;

  const projectsSource = Array.isArray(projectsList) ? projectsList : (getCachedProjects() || []);
  const placeholderLabel = t('reservations.create.placeholders.project', 'اختر مشروعاً (اختياري)');

  input.setAttribute('placeholder', placeholderLabel);

  const sortedProjects = [...projectsSource]
    .filter((project) => project && project.id != null)
    .sort((a, b) => String(b.createdAt || b.start || '').localeCompare(String(a.createdAt || a.start || '')));

  const previousInputValue = resetInput ? '' : input.value;
  const fallbackLabel = t('projects.fallback.untitled', 'مشروع بدون اسم');

  const seenLabels = new Set();
  projectOptionMap = new Map();

  const projectOptions = sortedProjects
    .map((project) => {
      const label = getProjectDisplayName(project) || fallbackLabel;
      return {
        id: String(project.id),
        label,
      };
    })
    .filter((option) => {
      if (!option.label) return false;
      const normalizedLabel = normalizeText(option.label);
      if (!normalizedLabel) return false;
      if (seenLabels.has(normalizedLabel)) return false;
      seenLabels.add(normalizedLabel);
      projectOptionMap.set(normalizedLabel, option);
      return true;
    });

  list.innerHTML = projectOptions
    .map((option) => `<option value="${escapeHtml(option.label)}"></option>`)
    .join('');

  const normalizedSelected = selectedValue ? String(selectedValue) : hidden.value ? String(hidden.value) : '';
  const selectedProject = normalizedSelected
    ? sortedProjects.find((project) => String(project.id) === normalizedSelected)
    : null;

  if (selectedProject) {
    const label = getProjectDisplayName(selectedProject) || fallbackLabel;
    hidden.value = String(selectedProject.id);
    input.value = label;
    input.dataset.selectedId = String(selectedProject.id);
  } else {
    hidden.value = '';
    input.dataset.selectedId = '';
    input.value = resetInput ? '' : previousInputValue;
  }
}

function setDateTimeInputs(dateInputId, timeInputId, isoString) {
  const { date, time } = splitDateTime(isoString);
  const dateInput = document.getElementById(dateInputId);
  const timeInput = document.getElementById(timeInputId);

  if (dateInput) {
    if (date) {
      if (dateInput._flatpickr) {
        const format = dateInput._flatpickr.config?.dateFormat || 'Y-m-d';
        dateInput._flatpickr.setDate(date, false, format);
      } else {
        dateInput.value = date;
      }
    } else if (dateInput._flatpickr) {
      dateInput._flatpickr.clear();
    } else {
      dateInput.value = '';
    }
    dateInput.dispatchEvent(new Event('input', { bubbles: true }));
    dateInput.dispatchEvent(new Event('change', { bubbles: true }));
  }

  if (timeInput) {
    if (time) {
      if (timeInput._flatpickr) {
        const format = timeInput._flatpickr.config?.dateFormat || 'H:i';
        timeInput._flatpickr.setDate(time, false, format);
      } else {
        timeInput.value = time;
      }
    } else if (timeInput._flatpickr) {
      timeInput._flatpickr.clear();
    } else {
      timeInput.value = '';
    }
    timeInput.dispatchEvent(new Event('input', { bubbles: true }));
    timeInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

function applyProjectContextToForm(project, { forceNotes = false, skipProjectSelectUpdate = false } = {}) {
  if (!project) return;

  const projectIdValue = project?.id != null ? String(project.id) : '';
  if (!skipProjectSelectUpdate) {
    ensureProjectChoices({ selectedValue: projectIdValue });
  }

  const customers = getCachedCustomers() || [];
  const projectCustomer = customers.find((c) => String(c.id) === String(project.clientId));
  const customerIdValue = projectCustomer?.id != null ? String(projectCustomer.id) : '';
  if (customerIdValue) {
    ensureCustomerChoices({ selectedValue: customerIdValue });
  } else {
    ensureCustomerChoices({ selectedValue: '', resetInput: true });
  }

  const startIso = resolveProjectDateTime(project, 'start');
  const endIso = resolveProjectDateTime(project, 'end');

  if (startIso) {
    setDateTimeInputs('res-start', 'res-start-time', startIso);
  }

  if (endIso) {
    setDateTimeInputs('res-end', 'res-end-time', endIso);
  }

  const notesInput = document.getElementById('res-notes');
  if (notesInput && project.description && (forceNotes || !notesInput.value)) {
    notesInput.value = project.description;
  }

  renderDraftReservationSummary();
  updateCreateProjectTaxState();
}

function populateProjectSelect({ projectsList = null, preselectId = null } = {}) {
  const projectHidden = document.getElementById('res-project');
  if (!projectHidden) return;

  const { projects } = projectsList ? { projects: projectsList } : loadData();
  const list = Array.isArray(projects) ? projects : [];
  setCachedProjects(list);

  const previousValue = preselectId != null
    ? String(preselectId)
    : (projectHidden.value ? String(projectHidden.value) : '');

  ensureProjectChoices({ selectedValue: previousValue, projectsList: list });
  updateCreateProjectTaxState();
  renderDraftReservationSummary();
}

function updateCreateProjectTaxState() {
  const { input: projectInput, hidden: projectHidden } = getProjectElements();
  const taxCheckbox = document.getElementById('res-tax');
  const shareCheckbox = document.getElementById('res-company-share');
  const paymentSelect = document.getElementById('res-payment-status');
  const paymentProgressTypeSelect = document.getElementById('res-payment-progress-type');
  const paymentProgressValueInput = document.getElementById('res-payment-progress-value');
  const discountInput = document.getElementById('res-discount');
  const discountTypeSelect = document.getElementById('res-discount-type');

  const message = t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.');

  const pendingLinked = projectInput?.dataset?.pendingLinked === 'true';
  const projectLinked = pendingLinked || Boolean(projectHidden?.value);

  if (taxCheckbox) {
    registerLinkedControlGuard(taxCheckbox, isLinkedProjectSelected);
    if (shareCheckbox) {
      registerLinkedControlGuard(shareCheckbox, isLinkedProjectSelected);
    }
  }
  if (paymentSelect) {
    registerLinkedControlGuard(paymentSelect, isLinkedProjectSelected);
  }
  if (paymentProgressTypeSelect) {
    registerLinkedControlGuard(paymentProgressTypeSelect, isLinkedProjectSelected);
  }
  if (paymentProgressValueInput) {
    registerLinkedControlGuard(paymentProgressValueInput, isLinkedProjectSelected);
  }
  if (discountInput) {
    registerLinkedControlGuard(discountInput, isLinkedProjectSelected);
  }
  if (discountTypeSelect) {
    registerLinkedControlGuard(discountTypeSelect, isLinkedProjectSelected);
  }

  if (projectLinked) {
    if (taxCheckbox) {
      taxCheckbox.checked = false;
      taxCheckbox.disabled = true;
      taxCheckbox.classList.add('disabled', 'reservation-input-disabled');
      taxCheckbox.title = message;
    }
    if (shareCheckbox) {
      shareCheckbox.checked = false;
      shareCheckbox.disabled = true;
      shareCheckbox.classList.add('disabled', 'reservation-input-disabled');
      shareCheckbox.title = message;
    }
    if (paymentSelect) {
      paymentSelect.value = 'unpaid';
      updatePaymentStatusAppearance(paymentSelect, 'unpaid');
      paymentSelect.disabled = true;
      paymentSelect.classList.add('reservation-input-disabled');
      paymentSelect.title = message;
    }
    if (paymentProgressTypeSelect) {
      paymentProgressTypeSelect.value = paymentProgressTypeSelect.value || 'percent';
      paymentProgressTypeSelect.disabled = true;
      paymentProgressTypeSelect.classList.add('reservation-input-disabled');
      paymentProgressTypeSelect.title = message;
    }
    if (paymentProgressValueInput) {
      paymentProgressValueInput.value = '';
      paymentProgressValueInput.disabled = true;
      paymentProgressValueInput.classList.add('reservation-input-disabled');
      paymentProgressValueInput.title = message;
    }
    if (discountInput) {
      discountInput.value = '0';
      discountInput.disabled = true;
      discountInput.classList.add('reservation-input-disabled');
      discountInput.title = message;
    }
    if (discountTypeSelect) {
      discountTypeSelect.value = 'percent';
      discountTypeSelect.disabled = true;
      discountTypeSelect.classList.add('reservation-input-disabled');
      discountTypeSelect.title = message;
    }
  } else {
    if (taxCheckbox) {
      const wasDisabled = taxCheckbox.disabled;
      taxCheckbox.disabled = false;
      taxCheckbox.classList.remove('disabled', 'reservation-input-disabled');
      taxCheckbox.title = '';
      if (wasDisabled) {
        taxCheckbox.checked = false;
      }
    }
    if (shareCheckbox) {
      shareCheckbox.disabled = false;
      shareCheckbox.classList.remove('disabled', 'reservation-input-disabled');
      shareCheckbox.title = '';
    }
    if (paymentSelect) {
      paymentSelect.disabled = false;
      paymentSelect.classList.remove('reservation-input-disabled');
      paymentSelect.title = '';
    }
    if (paymentProgressTypeSelect) {
      paymentProgressTypeSelect.disabled = false;
      paymentProgressTypeSelect.classList.remove('reservation-input-disabled');
      paymentProgressTypeSelect.title = '';
    }
    if (paymentProgressValueInput) {
      paymentProgressValueInput.disabled = false;
      paymentProgressValueInput.classList.remove('reservation-input-disabled');
      paymentProgressValueInput.title = '';
    }
    if (discountInput) {
      discountInput.disabled = false;
      discountInput.classList.remove('reservation-input-disabled');
      discountInput.title = '';
    }
    if (discountTypeSelect) {
      discountTypeSelect.disabled = false;
      discountTypeSelect.classList.remove('reservation-input-disabled');
      discountTypeSelect.title = '';
    }
  }

  syncCreateTaxAndShare('tax');
  renderDraftReservationSummary();
}

function setupProjectSelection() {
  const { input, hidden } = getProjectElements();
  if (!input || !hidden || input.dataset.listenerAttached) return;

  const commitSelection = (allowPartial = false) => {
    const rawValue = input.value.trim();
    const entry = rawValue ? resolveProjectByLabel(rawValue, { allowPartial }) : null;

    if (entry) {
      hidden.value = String(entry.id);
      input.value = entry.label;
      input.dataset.selectedId = String(entry.id);
      const project = findProjectById(entry.id);
      if (project) {
        applyProjectContextToForm(project, { skipProjectSelectUpdate: true });
      } else {
        updateCreateProjectTaxState();
        renderDraftReservationSummary();
      }
    } else {
      hidden.value = '';
      input.dataset.selectedId = '';
      updateCreateProjectTaxState();
      renderDraftReservationSummary();
    }
  };

  input.addEventListener('input', () => {
    const rawValue = input.value.trim();
    const entry = rawValue ? resolveProjectByLabel(rawValue) : null;
    if (entry) {
      hidden.value = String(entry.id);
      input.dataset.selectedId = String(entry.id);
    } else if (!rawValue) {
      hidden.value = '';
      input.dataset.selectedId = '';
    }
  });

  input.addEventListener('change', () => commitSelection(true));
  input.addEventListener('blur', () => commitSelection(true));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitSelection(true);
    }
  });

  input.dataset.listenerAttached = 'true';
}

function setupCustomerAutocomplete() {
  const { input, hidden } = getCustomerElements();
  if (!input || !hidden || input.dataset.listenerAttached) return;

  const commitSelection = (allowPartial = false) => {
    const rawValue = input.value.trim();
    const entry = rawValue ? resolveCustomerByLabel(rawValue, { allowPartial }) : null;
    if (entry) {
      hidden.value = String(entry.id);
      input.value = entry.label;
      input.dataset.selectedId = String(entry.id);
    } else {
      hidden.value = '';
      input.dataset.selectedId = '';
    }
    renderDraftReservationSummary();
  };

  input.addEventListener('input', () => {
    const rawValue = input.value.trim();
    const entry = rawValue ? resolveCustomerByLabel(rawValue) : null;
    if (entry) {
      hidden.value = String(entry.id);
      input.dataset.selectedId = String(entry.id);
    } else if (!rawValue) {
      hidden.value = '';
      input.dataset.selectedId = '';
    }
  });

  input.addEventListener('change', () => commitSelection(true));
  input.addEventListener('blur', () => commitSelection(true));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitSelection(true);
    }
  });

  input.dataset.listenerAttached = 'true';
}

function applyPendingProjectContext() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('reservationProjectContext');
  if (!encoded) {
    enableProjectSelection({ clearValue: true });
    return;
  }

  let context = null;

  try {
    const decoded = decodeURIComponent(encoded);
    context = JSON.parse(decoded);
  } catch (error) {
    console.warn('⚠️ [reservations/createForm] Failed to decode project context', error);
  }

  params.delete('reservationProjectContext');
  const newSearch = params.toString();
  const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${window.location.hash || ''}`;
  window.history.replaceState({}, document.title, newUrl);

  enableProjectSelection({ clearValue: false });

  if (!context) return;

  if (context.fromProjectForm) {
    linkedProjectReturnContext = {
      draftStorageKey: context.draftStorageKey || DEFAULT_PROJECT_FORM_DRAFT_KEY,
      returnUrl: context.returnUrl || DEFAULT_PROJECT_FORM_RETURN_URL,
    };
  }

  const select = document.getElementById('res-project');

  if (context.projectId) {
    if (select) {
      ensureProjectChoices({ selectedValue: String(context.projectId) });
      updateCreateProjectTaxState();
    }
    const project = findProjectById(context.projectId);
    if (project) {
      applyProjectContextToForm(project, { forceNotes: !!context.forceNotes });
    } else {
      renderDraftReservationSummary();
    }
    enableProjectSelection();
  } else {
    if (select) {
      ensureProjectChoices({ selectedValue: '' });
    }
    const pendingLabel = context.projectTitle
      ? context.projectTitle
      : t('reservations.create.project.pendingPlaceholder', 'سيتم الربط بعد حفظ المشروع الحالي');
    disableProjectSelection(
      t('reservations.create.project.pendingTooltip', 'سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي'),
      pendingLabel
    );
  }

  if (context.start) {
    setDateTimeInputs('res-start', 'res-start-time', context.start);
  }
  if (context.end) {
    setDateTimeInputs('res-end', 'res-end-time', context.end);
  }

  const customerInput = document.getElementById('res-customer-input');
  const customerHidden = document.getElementById('res-customer');

  if (context.customerId) {
    const customers = getCachedCustomers() || [];
    const projectCustomer = customers.find((c) => String(c.id) === String(context.customerId));
    if (projectCustomer?.id != null) {
      ensureCustomerChoices({ selectedValue: String(projectCustomer.id) });
      if (customerHidden) customerHidden.value = String(projectCustomer.id);
      if (customerInput) customerInput.value = projectCustomer.customerName || projectCustomer.name || customerInput.value;
    }
  } else if (context.customerName && customerInput) {
    ensureCustomerChoices({ selectedValue: '' });
    customerInput.value = context.customerName;
    customerInput.dataset.selectedId = '';
    if (customerHidden) customerHidden.value = '';
  } else {
    ensureCustomerChoices({ selectedValue: '' });
  }

  const notesInput = document.getElementById('res-notes');
  if (notesInput && context.description && !notesInput.value) {
    notesInput.value = context.description;
  }

  renderDraftReservationSummary();
}

function getCreateReservationDateRange() {
  const startDate = document.getElementById('res-start')?.value?.trim();
  const endDate = document.getElementById('res-end')?.value?.trim();
  const startTime = document.getElementById('res-start-time')?.value?.trim() || '00:00';
  const endTime = document.getElementById('res-end-time')?.value?.trim() || '00:00';

  if (!startDate || !endDate) return { start: null, end: null };

  return {
    start: combineDateTime(startDate, startTime),
    end: combineDateTime(endDate, endTime)
  };
}

export function findEquipmentByDescription(term) {
  const normalizedSearch = normalizeEquipmentSearchValue(term);
  if (normalizedSearch) {
    const bySearchValue = equipmentDescriptionOptionMap.get(normalizedSearch);
    if (bySearchValue) return bySearchValue;
  }

  const { description, barcode } = parseEquipmentSearchValue(term);

  if (barcode) {
    const byBarcode = findEquipmentByBarcode(barcode);
    if (byBarcode) return byBarcode;
  }

  const normalizedDescription = normalizeText(description || term);
  if (!normalizedDescription) return null;

  let equipment = getCachedEquipment();
  if (!equipment?.length) {
    const snapshot = loadData();
    equipment = Array.isArray(snapshot?.equipment) ? snapshot.equipment : [];
    if (equipment.length) {
      setCachedEquipment(equipment);
    }
  }

  const exactMatch = equipment.find((item) => {
    const descriptionText = normalizeText(item?.desc || item?.description || '');
    return descriptionText === normalizedDescription;
  });
  if (exactMatch) return exactMatch;

  return equipment.find((item) => {
    const descriptionText = normalizeText(item?.desc || item?.description || '');
    return descriptionText.includes(normalizedDescription);
  }) || null;
}

export function hasExactEquipmentDescription(value, listId = 'equipment-description-options') {
  const normalizedValue = normalizeEquipmentSearchValue(value);
  if (!normalizedValue) return false;

  const list = document.getElementById(listId);
  if (list && list.options) {
    const match = Array.from(list.options).some((option) => normalizeEquipmentSearchValue(option.value) === normalizedValue);
    if (match) return true;
  }

  if (equipmentDescriptionOptionMap.has(normalizedValue)) {
    return true;
  }

  const { description } = parseEquipmentSearchValue(value);
  if (!description) return false;

  const normalizedDescription = normalizeText(description);
  if (!normalizedDescription) return false;

  const equipment = getCachedEquipment() || [];
  return equipment.some((item) => normalizeText(item?.desc || item?.description || '') === normalizedDescription);
}

const STATUS_PRIORITY = {
  available: 0,
  reserved: 1,
  maintenance: 2,
  retired: 3,
};

function getStatusPriority(status) {
  return STATUS_PRIORITY[status] ?? 5;
}

function describeEquipmentStatus(status) {
  switch (status) {
    case 'available':
      return t('reservations.equipment.status.available', 'متاح');
    case 'reserved':
      return t('reservations.equipment.status.reserved', 'محجوز');
    case 'maintenance':
      return t('reservations.equipment.status.maintenance', 'صيانة');
    case 'retired':
      return t('reservations.equipment.status.retired', 'خارج الخدمة');
    default:
      return t('reservations.equipment.status.unknown', 'الحالة غير معروفة');
  }
}

function buildEquipmentOptionLabel(entry) {
  const baseValue = entry.value;
  if (entry.bestStatus === 'available' && entry.statuses.size === 1) {
    return baseValue;
  }

  const statusToDisplay = entry.bestStatus !== 'available'
    ? entry.bestStatus
    : [...entry.statuses].find((status) => status !== 'available') || entry.bestStatus;

  if (statusToDisplay === 'available') {
    return `${baseValue} — ${describeEquipmentStatus(statusToDisplay)}`;
  }

  const unavailableLabel = t('reservations.equipment.status.unavailable', 'غير متاح');
  return `${baseValue} — ${unavailableLabel} (${describeEquipmentStatus(statusToDisplay)})`;
}

function populateEquipmentDescriptionLists() {
  const createList = document.getElementById('equipment-description-options');
  const editList = document.getElementById('edit-res-equipment-description-options');

  const syncedEquipment = syncEquipmentStatuses();
  const snapshot = loadData();
  const rawEquipment = Array.isArray(syncedEquipment) && syncedEquipment.length
    ? syncedEquipment
    : (snapshot?.equipment || []);

  const equipmentList = Array.isArray(rawEquipment) ? rawEquipment : [];
  setCachedEquipment(equipmentList);

  const entriesMap = new Map();

  equipmentList.forEach((item) => {
    const searchValue = buildEquipmentSearchValue(item);
    const normalizedValue = normalizeEquipmentSearchValue(searchValue);
    if (!normalizedValue || !searchValue) {
      return;
    }

    const status = getEquipmentAvailabilityStatus(item);
    const priority = getStatusPriority(status);
    const existing = entriesMap.get(normalizedValue);

    if (!existing) {
      entriesMap.set(normalizedValue, {
        normalized: normalizedValue,
        value: searchValue,
        bestItem: item,
        bestStatus: status,
        bestPriority: priority,
        statuses: new Set([status]),
      });
      return;
    }

    existing.statuses.add(status);
    if (priority < existing.bestPriority) {
      existing.bestItem = item;
      existing.bestStatus = status;
      existing.bestPriority = priority;
      existing.value = searchValue;
    }
  });

  equipmentDescriptionOptionMap = new Map();

  const optionEntries = Array.from(entriesMap.values())
    .sort((a, b) => a.value.localeCompare(b.value, 'ar', { sensitivity: 'base' }))
    .map((entry) => {
      equipmentDescriptionOptionMap.set(entry.normalized, entry.bestItem);
      const label = buildEquipmentOptionLabel(entry);
      const valueHtml = escapeHtml(entry.value);
      if (label === entry.value) {
        return `<option value="${valueHtml}"></option>`;
      }
      const labelHtml = escapeHtml(label);
      return `<option value="${valueHtml}" label="${labelHtml}"></option>`;
    });

  const optionsHtml = optionEntries.join('');

  if (createList) createList.innerHTML = optionsHtml;
  if (editList) editList.innerHTML = optionsHtml;
}

function addDraftEquipmentByBarcode(rawCode, inputElement) {
  const normalizedCode = normalizeBarcodeValue(rawCode);
  if (!normalizedCode) return false;

  const { start, end } = getCreateReservationDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
    return false;
  }

  const currentItems = getSelectedItems();
  if (currentItems.some((item) => normalizeBarcodeValue(item.barcode) === normalizedCode)) {
    showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
    return false;
  }

  if (hasEquipmentConflict(normalizedCode, start, end)) {
    showToast(t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية'));
    return false;
  }

  const item = findEquipmentByBarcode(normalizedCode);
  if (!item) {
    showToast(t('reservations.toast.barcodeNotFound', '❌ الباركود غير موجود'));
    return false;
  }

  const availability = getEquipmentAvailabilityStatus(item);
  if (availability === 'maintenance' || availability === 'retired') {
    showToast(getEquipmentUnavailableMessage(availability));
    return false;
  }

  const equipmentId = resolveEquipmentIdentifier(item);
  if (!equipmentId) {
    showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
    return false;
  }

  addSelectedItem({
    id: equipmentId,
    equipmentId,
    barcode: normalizedCode,
    desc: item.desc,
    qty: 1,
    price: item.price,
    image: resolveItemImage(item)
  });

  if (inputElement) inputElement.value = '';
  renderReservationItems();
  renderDraftReservationSummary();
  showToast(t('reservations.toast.equipmentAdded', '✅ تم إضافة المعدة بنجاح'));
  return true;
}

function addDraftEquipmentByDescription(inputElement) {
  if (!inputElement) return;
  const rawValue = inputElement.value.trim();
  if (!rawValue) return;

  const equipmentItem = findEquipmentByDescription(rawValue);
  if (!equipmentItem) {
    showToast(t('reservations.toast.equipmentNameNotFound', '❌ لم يتم العثور على معدة بالاسم المدخل'));
    return;
  }

  const latestRecord = getEquipmentRecordByBarcode(equipmentItem.barcode);
  const availability = getEquipmentAvailabilityStatus(latestRecord || equipmentItem);
  if (availability === 'maintenance' || availability === 'retired') {
    showToast(getEquipmentUnavailableMessage(availability));
    return;
  }

  const normalizedCode = normalizeBarcodeValue(equipmentItem.barcode);
  if (!normalizedCode) {
    showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
    return;
  }

  const equipmentId = resolveEquipmentIdentifier(equipmentItem);
  if (!equipmentId) {
    showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
    return;
  }

  const itemPayload = {
    id: equipmentId,
    equipmentId,
    barcode: normalizedCode,
    desc: equipmentItem.desc || equipmentItem.description || equipmentItem.name || '',
    qty: 1,
    price: Number.isFinite(Number(equipmentItem.price)) ? Number(equipmentItem.price) : 0,
    image: resolveItemImage(equipmentItem)
  };

  const { start, end } = getCreateReservationDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
    return;
  }

  const currentItems = getSelectedItems();
  const duplicate = currentItems.some((item) => normalizeBarcodeValue(item.barcode) === normalizedCode);
  if (duplicate) {
    showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
    return;
  }

  if (hasEquipmentConflict(normalizedCode, start, end)) {
    showToast(t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية'));
    return;
  }

  addSelectedItem(itemPayload);
  renderReservationItems();
  renderDraftReservationSummary();

  showToast(t('reservations.toast.equipmentAdded', '✅ تم إضافة المعدة بنجاح'));

  inputElement.value = '';
}

function setupEquipmentDescriptionInputs() {
  populateEquipmentDescriptionLists();

  const createInput = document.getElementById('equipment-description');
  if (createInput && !createInput.dataset.listenerAttached) {
    createInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addDraftEquipmentByDescription(createInput);
      }
    });
    const tryAutoAdd = () => {
      if (hasExactEquipmentDescription(createInput.value, 'equipment-description-options')) {
        addDraftEquipmentByDescription(createInput);
      }
    };
    createInput.addEventListener('input', tryAutoAdd);
    createInput.addEventListener('change', tryAutoAdd);
    createInput.dataset.listenerAttached = 'true';
  }
}

function renderReservationItems(containerId = 'reservation-items') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = getSelectedItems();
  const noItemsMessage = t('reservations.create.equipment.noneAdded', 'لا توجد معدات مضافة');
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const imageAlt = t('reservations.create.equipment.imageAlt', 'صورة');
  const increaseLabel = t('reservations.equipment.actions.increase', 'زيادة الكمية');
  const decreaseLabel = t('reservations.equipment.actions.decrease', 'تقليل الكمية');
  const removeLabel = t('reservations.equipment.actions.remove', 'إزالة البند');

  if (items.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="text-center">${noItemsMessage}</td></tr>`;
    return;
  }

  const groups = groupReservationItems(items);

  container.innerHTML = groups
    .map((group) => {
      const representative = group.items[0] || {};
      const imageSource = resolveItemImage(representative) || group.image;
      const imageCell = imageSource
        ? `<img src="${imageSource}" alt="${imageAlt}" class="reservation-item-thumb">`
        : '<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';
      const quantityDisplay = normalizeNumbers(String(group.count));
      const unitPriceNumber = Number.isFinite(Number(group.unitPrice)) ? Number(group.unitPrice) : 0;
      const totalPriceNumber = Number.isFinite(Number(group.totalPrice)) ? Number(group.totalPrice) : unitPriceNumber * group.count;
      const unitPriceDisplay = `${normalizeNumbers(unitPriceNumber.toFixed(2))} ${currencyLabel}`;
      const totalPriceDisplay = `${normalizeNumbers(totalPriceNumber.toFixed(2))} ${currencyLabel}`;

      const normalizedBarcodes = group.barcodes
        .map((code) => normalizeNumbers(String(code || '')))
        .filter(Boolean);
      const barcodesMeta = normalizedBarcodes.length
        ? `<details class="reservation-item-barcodes">
            <summary>${t('reservations.equipment.barcodes.summary', 'عرض الباركودات')}</summary>
            <ul class="reservation-barcode-list">
              ${normalizedBarcodes.map((code) => `<li>${code}</li>`).join('')}
            </ul>
          </details>`
        : '';

      return `
        <tr data-group-key="${group.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${imageCell}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${group.description || '-'}</div>
                ${barcodesMeta}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${group.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${group.key}" aria-label="${decreaseLabel}">−</button>
              <span class="reservation-qty-value">${quantityDisplay}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${group.key}" aria-label="${increaseLabel}">+</button>
            </div>
          </td>
          <td>${unitPriceDisplay}</td>
          <td>${totalPriceDisplay}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${group.key}" aria-label="${removeLabel}">🗑️</button>
          </td>
        </tr>
      `;
    })
    .join('');
}

function decreaseReservationGroup(groupKey) {
  const items = getSelectedItems();
  const groups = groupReservationItems(items);
  const target = groups.find((entry) => entry.key === groupKey);
  if (!target) return;

  const removeIndex = target.itemIndices[target.itemIndices.length - 1];
  if (removeIndex == null) return;

  removeSelectedItem(removeIndex);
  renderReservationItems();
  renderDraftReservationSummary();
}

function removeReservationGroup(groupKey) {
  const items = getSelectedItems();
  const filtered = items.filter((item) => resolveReservationItemGroupKey(item) !== groupKey);
  if (filtered.length === items.length) return;
  setSelectedItems(filtered);
  renderReservationItems();
  renderDraftReservationSummary();
}

function increaseReservationGroup(groupKey) {
  const items = getSelectedItems();
  const groups = groupReservationItems(items);
  const target = groups.find((entry) => entry.key === groupKey);
  if (!target) return;

  const { start, end } = getCreateReservationDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
    return;
  }

  const normalizedSelected = new Set(items.map((item) => normalizeBarcodeValue(item.barcode)));
  const { equipment = [] } = loadData();

  const candidate = (equipment || []).find((record) => {
    const barcodeNormalized = normalizeBarcodeValue(record?.barcode);
    if (!barcodeNormalized || normalizedSelected.has(barcodeNormalized)) return false;
    const candidateKey = resolveReservationItemGroupKey({
      desc: record?.desc || record?.description || record?.name || '',
      price: Number(record?.price) || 0,
    });
    if (candidateKey !== groupKey) return false;
    if (!isEquipmentAvailable(record)) return false;
    return !hasEquipmentConflict(barcodeNormalized, start, end);
  });

  if (!candidate) {
    showToast(t('reservations.toast.noAdditionalUnits', '⚠️ لا توجد وحدات إضافية متاحة حالياً'));
    return;
  }

  const normalizedCode = normalizeBarcodeValue(candidate.barcode);
  const equipmentId = resolveEquipmentIdentifier(candidate);
  if (!equipmentId) {
    showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
    return;
  }

  addSelectedItem({
    id: equipmentId,
    equipmentId,
    barcode: normalizedCode,
    desc: candidate.desc || candidate.description || candidate.name || target.description || '',
    qty: 1,
    price: Number.isFinite(Number(candidate.price)) ? Number(candidate.price) : target.unitPrice,
    image: resolveItemImage(candidate)
  });

  renderReservationItems();
  renderDraftReservationSummary();
}

function renderDraftReservationSummary() {
  const projectLinked = Boolean(document.getElementById('res-project')?.value);
  const rawValue = document.getElementById('res-discount')?.value || '0';
  const discount = projectLinked ? 0 : (parseFloat(normalizeNumbers(rawValue)) || 0);

  const discountTypeRaw = document.getElementById('res-discount-type')?.value || 'percent';
  const discountType = projectLinked ? 'percent' : discountTypeRaw;
  const taxCheckbox = document.getElementById('res-tax');
  const applyTax = projectLinked ? false : (taxCheckbox?.checked || false);
  const paymentSelect = document.getElementById('res-payment-status');
  const paidStatus = paymentSelect?.value || 'unpaid';
  const { start, end } = getCreateReservationDateRange();
  if (applyTax) {
    ensureCompanyShareEnabled();
  }
  const sharePercentForSummary = getCompanySharePercent();

  const paymentProgressTypeSelect = document.getElementById('res-payment-progress-type');
  const paymentProgressValueInput = document.getElementById('res-payment-progress-value');
  const paymentProgressType = getPaymentProgressType(paymentProgressTypeSelect);
  const paymentProgressValue = parsePaymentProgressValue(paymentProgressValueInput);

  renderDraftSummary({
    selectedItems: getSelectedItems(),
    discount,
    discountType,
    applyTax,
    paidStatus,
    paymentProgressType,
    paymentProgressValue,
    start,
    end,
    companySharePercent: sharePercentForSummary,
    paymentHistory: []
  });

  const summaryResult = renderDraftSummary.lastResult;

  if (summaryResult) {
    setPaymentProgressInputValue(paymentProgressValueInput, summaryResult.paymentProgressValue);
    if (paymentSelect) {
      paymentSelect.value = summaryResult.paymentStatus;
      updatePaymentStatusAppearance(paymentSelect, summaryResult.paymentStatus);
    }
  } else {
    updatePaymentStatusAppearance(paymentSelect, paidStatus);
  }
}

function setupSummaryEvents() {
  const discountInput = document.getElementById('res-discount');
  if (discountInput && !discountInput.dataset.listenerAttached) {
    discountInput.addEventListener('input', (e) => {
      e.target.value = normalizeNumbers(e.target.value);
      renderDraftReservationSummary();
    });
    discountInput.dataset.listenerAttached = 'true';
  }

  const discountTypeSelect = document.getElementById('res-discount-type');
  if (discountTypeSelect && !discountTypeSelect.dataset.listenerAttached) {
    discountTypeSelect.addEventListener('change', renderDraftReservationSummary);
    discountTypeSelect.dataset.listenerAttached = 'true';
  }

  const taxCheckbox = document.getElementById('res-tax');
  if (taxCheckbox && !taxCheckbox.dataset.listenerAttached) {
    taxCheckbox.addEventListener('change', () => {
      if (isLinkedProjectSelected()) {
        taxCheckbox.checked = false;
        showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.'), 'error');
        return;
      }
      syncCreateTaxAndShare('tax');
    });
    taxCheckbox.dataset.listenerAttached = 'true';
  }

  const shareCheckbox = document.getElementById('res-company-share');
  if (shareCheckbox && !shareCheckbox.dataset.listenerAttached) {
    shareCheckbox.addEventListener('change', () => {
      if (isLinkedProjectSelected()) {
        shareCheckbox.checked = false;
        showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.'), 'error');
        return;
      }
      syncCreateTaxAndShare('share');
    });
    shareCheckbox.dataset.listenerAttached = 'true';
  }

  const paymentSelect = document.getElementById('res-payment-status');
  if (paymentSelect && !paymentSelect.dataset.listenerAttached) {
    paymentSelect.addEventListener('change', () => {
      if (isLinkedProjectSelected()) {
        paymentSelect.value = 'unpaid';
        updatePaymentStatusAppearance(paymentSelect, 'unpaid');
        showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.'), 'error');
        return;
      }
      updatePaymentStatusAppearance(paymentSelect);
      renderDraftReservationSummary();
    });
    paymentSelect.dataset.listenerAttached = 'true';
  }

  const paymentProgressTypeSelect = document.getElementById('res-payment-progress-type');
  if (paymentProgressTypeSelect && !paymentProgressTypeSelect.dataset.listenerAttached) {
    if (paymentProgressTypeSelect.dataset.userSelected !== 'true') {
      paymentProgressTypeSelect.value = 'percent';
    }
    paymentProgressTypeSelect.addEventListener('change', (event) => {
      if (isLinkedProjectSelected()) {
        paymentProgressTypeSelect.value = 'percent';
        showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.'), 'error');
        return;
      }
      paymentProgressTypeSelect.dataset.userSelected = 'true';
      renderDraftReservationSummary();
    });
    paymentProgressTypeSelect.dataset.listenerAttached = 'true';
  } else if (paymentProgressTypeSelect && paymentProgressTypeSelect.dataset.userSelected !== 'true' && !paymentProgressTypeSelect.value) {
    paymentProgressTypeSelect.value = 'percent';
  }

  const paymentProgressValueInput = document.getElementById('res-payment-progress-value');
  if (paymentProgressValueInput && !paymentProgressValueInput.dataset.listenerAttached) {
    paymentProgressValueInput.addEventListener('input', (event) => {
      if (isLinkedProjectSelected()) {
        paymentProgressValueInput.value = '';
        showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.'), 'error');
        return;
      }
      event.target.value = normalizeNumbers(event.target.value);
      renderDraftReservationSummary();
    });
    paymentProgressValueInput.dataset.listenerAttached = 'true';
  }

  renderDraftReservationSummary();
}

function setupReservationTimeSync() {
  const startTimeInput = document.getElementById('res-start-time');
  const endTimeInput = document.getElementById('res-end-time');
  if (!startTimeInput || !endTimeInput || startTimeInput.dataset.timeSyncAttached) {
    return;
  }

  let suppressEndListener = false;

  const syncEndTimeWithStart = () => {
    const startValue = startTimeInput.value?.trim();
    if (!startValue) {
      renderDraftReservationSummary();
      return;
    }

    const syncState = endTimeInput.dataset.syncedWithStart;
    const shouldSync = !endTimeInput.value?.trim() || syncState !== 'false';
    if (shouldSync) {
      suppressEndListener = true;
      endTimeInput.value = startValue;
      endTimeInput.dataset.syncedWithStart = 'true';
      endTimeInput.dataset.syncedValue = startValue;
      endTimeInput.dispatchEvent(new Event('input', { bubbles: true }));
      endTimeInput.dispatchEvent(new Event('change', { bubbles: true }));
      suppressEndListener = false;
    }

    renderDraftReservationSummary();
  };

  startTimeInput.addEventListener('change', syncEndTimeWithStart);
  startTimeInput.addEventListener('input', syncEndTimeWithStart);
  startTimeInput.addEventListener('blur', syncEndTimeWithStart);

  endTimeInput.addEventListener('input', () => {
    if (suppressEndListener) return;
    if (endTimeInput.value === startTimeInput.value) {
      endTimeInput.dataset.syncedWithStart = 'true';
      endTimeInput.dataset.syncedValue = endTimeInput.value;
    } else {
      endTimeInput.dataset.syncedWithStart = 'false';
    }
  });

  if (!endTimeInput.value?.trim()) {
    syncEndTimeWithStart();
  }

  startTimeInput.dataset.timeSyncAttached = 'true';
}

async function handleReservationSubmit() {
  const { input: customerInput, hidden: customerHidden } = getCustomerElements();
  const { input: projectInput, hidden: projectHidden } = getProjectElements();
  const { customers } = loadData();

  let customerValue = customerHidden?.value ? String(customerHidden.value) : '';
  if (!customerValue && customerInput?.value) {
    const resolvedCustomer = resolveCustomerByLabel(customerInput.value, { allowPartial: true });
    if (resolvedCustomer) {
      customerValue = String(resolvedCustomer.id);
      if (customerHidden) customerHidden.value = customerValue;
      customerInput.value = resolvedCustomer.label;
      customerInput.dataset.selectedId = customerValue;
    }
  }

  const customer = customers.find((c) => String(c.id) === customerValue);

  if (!customer) {
    showToast(t('reservations.toast.customerNotFound', '⚠️ لم يتم العثور على العميل بالاسم المدخل'));
    return;
  }

  const customerId = customer.id;

  let projectIdValue = projectHidden?.value ? String(projectHidden.value) : '';
  if (!projectIdValue && projectInput?.value) {
    const resolvedProject = resolveProjectByLabel(projectInput.value, { allowPartial: true });
    if (resolvedProject) {
      projectIdValue = String(resolvedProject.id);
      if (projectHidden) projectHidden.value = projectIdValue;
      projectInput.value = resolvedProject.label;
      projectInput.dataset.selectedId = projectIdValue;
    }
  }
  const startDate = document.getElementById('res-start').value;
  const endDate = document.getElementById('res-end').value;
  const startTime = document.getElementById('res-start-time')?.value || '00:00';
  const endTime = document.getElementById('res-end-time')?.value || '00:00';

  if (!startDate || !endDate) {
    showToast(t('reservations.toast.requireDates', '⚠️ يرجى تحديد تاريخ البداية والنهاية'));
    return;
  }

  const start = `${startDate}T${startTime}`;
  const end = `${endDate}T${endTime}`;

  const startDateObj = new Date(start);
  const endDateObj = new Date(end);
  if (
    Number.isNaN(startDateObj.getTime()) ||
    Number.isNaN(endDateObj.getTime()) ||
    startDateObj >= endDateObj
  ) {
    showToast(t('reservations.toast.invalidDateRange', '⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية'));
    return;
  }

  const technicianIds = getSelectedTechnicians();
  const draftItems = getSelectedItems();
  if (draftItems.length === 0 && technicianIds.length === 0) {
    showToast(t('reservations.toast.noItems', '⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل'));
    return;
  }

  const notes = document.getElementById('res-notes')?.value || '';
  const discount = parseFloat(normalizeNumbers(document.getElementById('res-discount')?.value)) || 0;
  const discountType = document.getElementById('res-discount-type')?.value || 'percent';
  const paymentSelect = document.getElementById('res-payment-status');
  const paidStatus = paymentSelect?.value || 'unpaid';
  const paymentProgressTypeSelect = document.getElementById('res-payment-progress-type');
  const paymentProgressValueInput = document.getElementById('res-payment-progress-value');
  const paymentProgressType = getPaymentProgressType(paymentProgressTypeSelect);
  const paymentProgressValue = parsePaymentProgressValue(paymentProgressValueInput);

  const selectedProject = projectIdValue ? findProjectById(projectIdValue) : null;
  const projectConfirmed = isProjectConfirmed(selectedProject);
  if (projectIdValue && !selectedProject) {
    showToast(t('reservations.toast.projectNotFound', '⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة.'));
    return;
  }

  for (const item of draftItems) {
    const status = getEquipmentAvailabilityStatus(item.barcode);
    if (status === 'maintenance' || status === 'retired') {
      showToast(getEquipmentUnavailableMessage(status));
      return;
    }
  }

  for (const item of draftItems) {
    const code = normalizeBarcodeValue(item.barcode);
    if (hasEquipmentConflict(code, start, end)) {
      showToast(
        t('reservations.toast.cannotCreateEquipmentConflict', '⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية')
      );
      return;
    }
  }

  for (const technicianId of technicianIds) {
    if (hasTechnicianConflict(technicianId, start, end)) {
      showToast(
        t('reservations.toast.cannotCreateCrewConflict', '⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة')
      );
      return;
    }
  }

  const taxCheckbox = document.getElementById('res-tax');
  const shareCheckbox = document.getElementById('res-company-share');
  const projectLinked = Boolean(projectIdValue);
  if (projectLinked) {
    if (taxCheckbox) {
      taxCheckbox.checked = false;
      taxCheckbox.disabled = true;
      taxCheckbox.classList.add('disabled');
      taxCheckbox.title = t('reservations.toast.linkedProjectDisabled', 'لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.');
    }
    if (shareCheckbox) {
      shareCheckbox.checked = false;
      shareCheckbox.disabled = true;
      shareCheckbox.classList.add('disabled');
      shareCheckbox.title = t('reservations.toast.linkedProjectDisabled', 'لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.');
    }
    if (paymentSelect) {
      paymentSelect.value = 'unpaid';
      paymentSelect.disabled = true;
      updatePaymentStatusAppearance(paymentSelect, 'unpaid');
      paymentSelect.title = t('reservations.toast.linkedProjectDisabled', 'لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.');
    }
    if (paymentProgressTypeSelect) {
      paymentProgressTypeSelect.disabled = true;
      paymentProgressTypeSelect.classList.add('disabled');
    }
    if (paymentProgressValueInput) {
      paymentProgressValueInput.value = '';
      paymentProgressValueInput.disabled = true;
      paymentProgressValueInput.classList.add('disabled');
    }
  } else {
    if (taxCheckbox) {
      taxCheckbox.disabled = false;
      taxCheckbox.classList.remove('disabled');
      taxCheckbox.title = '';
    }
    if (shareCheckbox) {
      shareCheckbox.disabled = false;
      shareCheckbox.classList.remove('disabled');
      shareCheckbox.title = '';
    }
    if (paymentSelect) {
      paymentSelect.disabled = false;
      paymentSelect.title = '';
    }
    if (paymentProgressTypeSelect) {
      paymentProgressTypeSelect.disabled = false;
      paymentProgressTypeSelect.classList.remove('disabled');
    }
    if (paymentProgressValueInput) {
      paymentProgressValueInput.disabled = false;
      paymentProgressValueInput.classList.remove('disabled');
    }
  }

  const applyTax = projectLinked ? false : (taxCheckbox?.checked || false);

  const shareChecked = Boolean(shareCheckbox?.checked);
  if (!projectLinked && shareChecked !== applyTax) {
    showToast(t('reservations.toast.companyShareRequiresTax', '⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة'));
    return;
  }

  let companySharePercent = shareChecked ? getCompanySharePercent() : null;
  if (shareChecked && (!Number.isFinite(companySharePercent) || companySharePercent <= 0)) {
    ensureCompanyShareEnabled();
    companySharePercent = getCompanySharePercent();
  }

  const companyShareEnabled = shareChecked && applyTax && Number.isFinite(companySharePercent) && companySharePercent > 0;

  if (applyTax) {
    ensureCompanyShareEnabled();
  }

  const totalCost = calculateReservationTotal(
    draftItems,
    discount,
    discountType,
    applyTax,
    technicianIds,
    {
      start,
      end,
      companySharePercent: companyShareEnabled ? companySharePercent : 0
    }
  );

  const reservationCode = generateReservationId();

  const paymentProgress = calculatePaymentProgress({
    totalAmount: totalCost,
    progressType: paymentProgressType,
    progressValue: paymentProgressValue,
    history: [],
  });
  if (paymentProgressValueInput) {
    setPaymentProgressInputValue(paymentProgressValueInput, paymentProgress.paymentProgressValue);
  }
  const initialPaymentHistory = [];
  if (paymentProgress.paymentProgressValue != null && paymentProgress.paymentProgressValue > 0) {
    initialPaymentHistory.push({
      type: paymentProgress.paymentProgressType || paymentProgressType,
      value: paymentProgress.paymentProgressValue,
      amount: paymentProgress.paidAmount,
      percentage: paymentProgress.paidPercent,
      recordedAt: new Date().toISOString(),
    });
  }
  const effectivePaidStatus = determinePaymentStatus({
    manualStatus: paidStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    totalAmount: totalCost,
  });
  if (paymentSelect) {
    paymentSelect.value = effectivePaidStatus;
    updatePaymentStatusAppearance(paymentSelect, effectivePaidStatus);
  }

  const payload = buildReservationPayload({
    reservationCode,
    customerId: customerId,
    start,
    end,
    status: projectConfirmed ? 'confirmed' : 'pending',
    title: null,
    location: null,
    notes,
    projectId: projectIdValue || null,
    totalAmount: totalCost,
    discount: projectLinked ? 0 : discount,
    discountType: projectLinked ? 'percent' : discountType,
    applyTax,
    paidStatus: projectLinked ? 'unpaid' : effectivePaidStatus,
    confirmed: projectConfirmed,
    items: draftItems.map((item) => ({
      ...item,
      equipmentId: item.equipmentId ?? item.id,
    })),
    technicians: technicianIds,
    companySharePercent: projectLinked || !companyShareEnabled ? null : companySharePercent,
    companyShareEnabled: projectLinked ? false : companyShareEnabled,
    paidAmount: projectLinked ? 0 : paymentProgress.paidAmount,
    paidPercentage: projectLinked ? 0 : paymentProgress.paidPercent,
    paymentProgressType: projectLinked ? null : paymentProgress.paymentProgressType,
    paymentProgressValue: projectLinked ? null : paymentProgress.paymentProgressValue,
    paymentHistory: projectLinked ? [] : initialPaymentHistory,
  });

  try {
    const createdReservation = await createReservationApi(payload);
    syncEquipmentStatuses();
    populateEquipmentDescriptionLists();
    syncTechniciansStatuses();
    resetForm();
    showToast(t('reservations.toast.created', '✅ تم إنشاء الحجز'));
    if (typeof afterSubmitCallback === 'function') {
      afterSubmitCallback({ type: 'created', reservation: createdReservation });
    }
    handleLinkedProjectReturn(createdReservation);
  } catch (error) {
    console.error('❌ [reservations/createForm] Failed to create reservation', error);
    const message = isApiError(error)
      ? error.message
      : t('reservations.toast.createFailed', 'تعذر إنشاء الحجز، حاول مرة أخرى');
    showToast(message, 'error');
    if (projectLinked) {
      showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع.'), 'error');
      enableProjectSelection({ clearValue: false });
    }
  }
}

function handleLinkedProjectReturn(createdReservation) {
  if (!linkedProjectReturnContext) return;

  const {
    draftStorageKey = DEFAULT_PROJECT_FORM_DRAFT_KEY,
    returnUrl = DEFAULT_PROJECT_FORM_RETURN_URL
  } = linkedProjectReturnContext;

  const reservationId = createdReservation?.id ?? createdReservation?.reservationId ?? createdReservation?.reservation_code;

  if (reservationId != null && typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const raw = window.sessionStorage.getItem(draftStorageKey);
      const draft = raw ? JSON.parse(raw) || {} : {};
      const ids = Array.isArray(draft.linkedReservationIds) ? draft.linkedReservationIds : [];
      const idValue = String(reservationId);
      if (!ids.includes(idValue)) {
        ids.push(idValue);
      }
      draft.linkedReservationIds = ids;
      window.sessionStorage.setItem(draftStorageKey, JSON.stringify(draft));
    } catch (error) {
      console.warn('⚠️ [reservations] Unable to persist linked reservation draft state', error);
    }
  }

  linkedProjectReturnContext = null;
  if (returnUrl) {
    window.location.href = returnUrl;
  }
}

function enableProjectSelection({ clearValue = false } = {}) {
  const { input, hidden } = getProjectElements();
  if (!input) return;
  input.disabled = false;
  input.classList.remove('reservation-input-disabled');
  input.removeAttribute('aria-disabled');
  input.removeAttribute('title');
  if (clearValue) {
    input.value = '';
    input.dataset.selectedId = '';
    if (hidden) hidden.value = '';
  }
  if (input.dataset) {
    delete input.dataset.pendingLinked;
  }
  updateCreateProjectTaxState();
}

function disableProjectSelection(message, displayValue = '') {
  const { input, hidden } = getProjectElements();
  if (!input) return;
  input.disabled = true;
  input.classList.add('reservation-input-disabled');
  input.setAttribute('aria-disabled', 'true');
  if (displayValue != null) {
    input.value = displayValue;
  }
  input.dataset.selectedId = '';
  if (message) {
    input.title = message;
  }
  if (input.dataset) {
    input.dataset.pendingLinked = 'true';
  }
  if (hidden) hidden.value = '';
  updateCreateProjectTaxState();
}

function resetForm() {
  const customerHidden = document.getElementById('res-customer');
  const customerInput = document.getElementById('res-customer-input');
  if (customerHidden) customerHidden.value = '';
  if (customerInput) {
    customerInput.value = '';
    customerInput.dataset.selectedId = '';
  }
  ensureCustomerChoices({ selectedValue: '', resetInput: true });
  document.getElementById('res-start').value = '';
  document.getElementById('res-start-time').value = '';
  document.getElementById('res-end').value = '';
  document.getElementById('res-end-time').value = '';
  document.getElementById('res-notes').value = '';
  document.getElementById('res-discount').value = '';
  const projectHidden = document.getElementById('res-project');
  const projectInput = document.getElementById('res-project-input');
  if (projectHidden) projectHidden.value = '';
  if (projectInput) {
    projectInput.value = '';
    projectInput.dataset.selectedId = '';
  }
  enableProjectSelection({ clearValue: false });
  ensureProjectChoices({ selectedValue: '', resetInput: true });
  const descriptionInput = document.getElementById('equipment-description');
  if (descriptionInput) descriptionInput.value = '';
  const paymentSelect = document.getElementById('res-payment-status');
  if (paymentSelect) {
    paymentSelect.value = 'unpaid';
    updatePaymentStatusAppearance(paymentSelect, 'unpaid');
  }
  const paymentProgressTypeSelect = document.getElementById('res-payment-progress-type');
  if (paymentProgressTypeSelect) {
    paymentProgressTypeSelect.value = 'percent';
  }
  const paymentProgressValueInput = document.getElementById('res-payment-progress-value');
  if (paymentProgressValueInput) {
    paymentProgressValueInput.value = '';
  }
  resetSelectedTechnicians();
  setSelectedItems([]);
  renderReservationItems();
  updateCreateProjectTaxState();
  renderDraftReservationSummary();
}

function setupReservationButtons() {
  const container = document.getElementById('reservation-items');
  if (!container || container.dataset.listenerAttached) return;

  container.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const { action, groupKey } = button.dataset;

    if (action === 'decrease-group' && groupKey) {
      decreaseReservationGroup(groupKey);
      return;
    }

    if (action === 'increase-group' && groupKey) {
      increaseReservationGroup(groupKey);
      return;
    }

    if (action === 'remove-group' && groupKey) {
      removeReservationGroup(groupKey);
      return;
    }
  });

  container.dataset.listenerAttached = 'true';
}

function setupBarcodeInput() {
  const input = document.getElementById('equipment-barcode');
  if (!input || input.dataset.listenerAttached) return;

  let autoAddTimer = null;
  const triggerAdd = () => {
    const raw = input.value;
    if (!raw?.trim()) return;
    clearTimeout(autoAddTimer);
    autoAddTimer = null;
    addDraftEquipmentByBarcode(raw, input);
  };

  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    triggerAdd();
  });

  const scheduleAutoAdd = () => {
    clearTimeout(autoAddTimer);
    const raw = input.value;
    if (!raw?.trim()) return;
    const { start, end } = getCreateReservationDateRange();
    if (!start || !end) return;
    autoAddTimer = setTimeout(() => {
      triggerAdd();
    }, 150);
  };

  input.addEventListener('input', scheduleAutoAdd);
  input.addEventListener('change', triggerAdd);

  input.dataset.listenerAttached = 'true';
}

function setupFormSubmit() {
  const form = document.getElementById('reservation-form');
  if (form && !form.dataset.listenerAttached) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      await handleReservationSubmit();
    });
    form.dataset.listenerAttached = 'true';
  }

  const btn = document.getElementById('create-reservation-btn');
  if (btn && !btn.dataset.listenerAttached) {
    btn.addEventListener('click', async (event) => {
      event.preventDefault();
      await handleReservationSubmit();
    });
    btn.dataset.listenerAttached = 'true';
  }
}

export function initCreateReservationForm({ onAfterSubmit } = {}) {
  afterSubmitCallback = typeof onAfterSubmit === 'function' ? onAfterSubmit : null;

  const { customers, projects } = loadData();
  setCachedCustomers(customers || []);
  ensureCustomerChoices();
  setupCustomerAutocomplete();

  setCachedProjects(projects || []);
  populateProjectSelect({ projectsList: projects });
  setupProjectSelection();

  populateEquipmentDescriptionLists();
  setupEquipmentDescriptionInputs();
  setupReservationTimeSync();
  setupSummaryEvents();
  setupReservationButtons();
  setupBarcodeInput();
  setupFormSubmit();
  applyPendingProjectContext();
  renderDraftReservationSummary();
  renderReservationItems();
}

export function refreshCreateReservationForm() {
  populateEquipmentDescriptionLists();
  populateProjectSelect();
  ensureCustomerChoices();
  setupCustomerAutocomplete();
  setupProjectSelection();
  renderReservationItems();
  renderDraftReservationSummary();
}

if (typeof document !== 'undefined') {
  const handleLanguageRefresh = () => {
    ensureCustomerChoices();
    ensureProjectChoices({ projectsList: getCachedProjects() });
    setupCustomerAutocomplete();
    setupProjectSelection();
    renderDraftReservationSummary();
  };
  document.addEventListener('language:changed', handleLanguageRefresh);
  document.addEventListener('language:translationsReady', handleLanguageRefresh);
}

if (typeof window !== 'undefined') {
  window.getCompanySharePercent = getCompanySharePercent;
}

export { populateEquipmentDescriptionLists, addDraftEquipmentByDescription, renderDraftReservationSummary, renderReservationItems };
