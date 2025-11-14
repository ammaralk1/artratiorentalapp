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
import { getSelectedCrewAssignments, getSelectedTechnicians, resetSelectedTechnicians, setSelectedTechnicians } from '../reservationsTechnicians.js';
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
  getCachedPackages,
  setCachedPackages,
  combineDateTime,
  splitDateTime,
  normalizeBarcodeValue,
  hasEquipmentConflict,
  hasTechnicianConflict,
  getTechnicianConflictingReservationCodes,
  getEquipmentBookingMode,
  setEquipmentBookingMode,
  getBlockingPackagesForEquipment,
  hasPackageConflict
} from './state.js';
import { syncEquipmentStatuses } from '../equipment.js';
import { syncTechniciansStatuses } from '../technicians.js';
import { apiRequest } from '../apiClient.js';
import {
  createReservationApi,
  buildReservationPayload,
  isApiError,
} from '../reservationsService.js';
import {
  activateEquipmentSelection,
  clearEquipmentSelection,
  EQUIPMENT_SELECTION_EVENTS,
  isEquipmentSelectionActive
} from './equipmentSelection.js';
import {
  buildPackageOptionsSnapshot,
  findPackageById,
  resolvePackageItems,
  resolvePackagePrice,
  getPackageDisplayName,
  normalizePackageId,
} from '../reservationsPackages.js';

// ===== Crew debug helpers (safe no-op by default) =====
const CREW_DEBUG_FLAG = '__DEBUG_CREW__';
function isCrewDebugEnabled() {
  try {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search || '');
      if (params.get('debugCrew') === '1') return true;
      const ls = window.localStorage?.getItem(CREW_DEBUG_FLAG);
      if (ls && ['1', 'true', 'on', 'yes'].includes(String(ls).toLowerCase())) return true;
    }
  } catch (_) { /* ignore */ }
  return false;
}
function crewDebugLog(label, data) {
  if (!isCrewDebugEnabled()) return;
  try {
    // eslint-disable-next-line no-console
    console.log(`🪵 [crew-debug:create] ${label}`, data);
  } catch (_) { /* ignore */ }
}

const DEFAULT_PROJECT_FORM_DRAFT_KEY = 'projects:create:draft';
const DEFAULT_PROJECT_FORM_RETURN_URL = 'projects.html#projects-section';

let afterSubmitCallback = null;
let cachedProjects = [];

let customerOptionMap = new Map();
let projectOptionMap = new Map();
let equipmentDescriptionOptionMap = new Map();
let isSyncingShareTaxCreate = false;
let linkedProjectReturnContext = null;
let equipmentSelectionEventsRegistered = false;
let packageOptionsCache = [];

// ===== Draft persistence (keep form on refresh) =====
const RESERVATION_FORM_DRAFT_STORAGE_KEY = 'reservations:create:draft';

function getDraftStorage() {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) return window.sessionStorage;
  } catch (_) { /* ignore */ }
  return null;
}

function collectCreateReservationDraft() {
  if (typeof document === 'undefined') return null;
  const storage = getDraftStorage();
  if (!storage) return null;

  try {
    const { input: customerInput, hidden: customerHidden } = getCustomerElements();
    const { input: projectInput, hidden: projectHidden } = getProjectElements();

    const startDate = document.getElementById('res-start')?.value || '';
    const endDate = document.getElementById('res-end')?.value || '';
    const startTime = document.getElementById('res-start-time')?.value || '';
    const endTime = document.getElementById('res-end-time')?.value || '';
    const notes = document.getElementById('res-notes')?.value || '';
    const discountRaw = document.getElementById('res-discount')?.value || '';
    const discountType = document.getElementById('res-discount-type')?.value || 'percent';
    const taxEnabled = Boolean(document.getElementById('res-tax')?.checked);
    const shareCheckbox = document.getElementById('res-company-share');
    const companyShareEnabled = Boolean(shareCheckbox?.checked);
    const companySharePercent = companyShareEnabled ? getCompanySharePercent('res-company-share') : null;
    const paymentStatus = document.getElementById('res-payment-status')?.value || 'unpaid';
    const paymentProgressType = document.getElementById('res-payment-progress-type')?.value || 'percent';
    const paymentProgressValue = document.getElementById('res-payment-progress-value')?.value || '';

    const draft = {
      startDate,
      endDate,
      startTime,
      endTime,
      customerId: customerHidden?.value || '',
      customerLabel: customerInput?.value || '',
      projectId: projectHidden?.value || '',
      projectLabel: projectInput?.value || '',
      notes,
      discount: String(discountRaw || ''),
      discountType,
      taxEnabled,
      companyShareEnabled,
      companySharePercent,
      paymentStatus,
      paymentProgressType,
      paymentProgressValue: String(paymentProgressValue || ''),
      items: getSelectedItems() || [],
      technicianIds: getSelectedTechnicians() || [],
    };
    return draft;
  } catch (_) {
    return null;
  }
}

function persistCreateReservationDraft() {
  const storage = getDraftStorage();
  if (!storage) return;
  const draft = collectCreateReservationDraft();
  if (!draft) return;
  try {
    storage.setItem(RESERVATION_FORM_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch (error) {
    console.warn('⚠️ [reservations/createForm] Unable to persist create draft', error);
  }
}

function clearCreateReservationDraft() {
  const storage = getDraftStorage();
  if (!storage) return;
  try {
    storage.removeItem(RESERVATION_FORM_DRAFT_STORAGE_KEY);
  } catch (error) {
    console.warn('⚠️ [reservations/createForm] Unable to clear create draft', error);
  }
}

function restoreCreateReservationDraft() {
  const storage = getDraftStorage();
  if (!storage) return;
  let draft = null;
  try {
    const raw = storage.getItem(RESERVATION_FORM_DRAFT_STORAGE_KEY);
    draft = raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('⚠️ [reservations/createForm] Unable to read create draft', error);
    return;
  }
  if (!draft) return;

  try {
    // Date/time
    if (draft.startDate || draft.startTime) {
      const startIso = combineDateTime(draft.startDate || '', draft.startTime || '');
      setDateTimeInputs('res-start', 'res-start-time', startIso);
    }
    if (draft.endDate || draft.endTime) {
      const endIso = combineDateTime(draft.endDate || '', draft.endTime || '');
      setDateTimeInputs('res-end', 'res-end-time', endIso);
    }

    // Customer
    if (draft.customerId) {
      ensureCustomerChoices({ selectedValue: String(draft.customerId) });
    } else if (draft.customerLabel) {
      ensureCustomerChoices({ selectedValue: '', resetInput: true });
      const { input, hidden } = getCustomerElements();
      if (input) input.value = draft.customerLabel;
      if (hidden) hidden.value = '';
    }

    // Project
    if (draft.projectId) {
      ensureProjectChoices({ selectedValue: String(draft.projectId) });
    } else if (draft.projectLabel) {
      ensureProjectChoices({ selectedValue: '', resetInput: true });
      const { input, hidden } = getProjectElements();
      if (input) input.value = draft.projectLabel;
      if (hidden) hidden.value = '';
    }

    // Notes / billing / payment
    if (document.getElementById('res-notes')) document.getElementById('res-notes').value = draft.notes || '';
    if (document.getElementById('res-discount')) document.getElementById('res-discount').value = draft.discount || '';
    if (document.getElementById('res-discount-type')) document.getElementById('res-discount-type').value = draft.discountType || 'percent';

    const taxCheckbox = document.getElementById('res-tax');
    if (taxCheckbox) taxCheckbox.checked = Boolean(draft.taxEnabled);

    const shareCheckbox = document.getElementById('res-company-share');
    if (shareCheckbox) {
      shareCheckbox.checked = Boolean(draft.companyShareEnabled);
      if (draft.companySharePercent != null) {
        shareCheckbox.dataset.companyShare = String(draft.companySharePercent);
      }
    }

    const paymentSelect = document.getElementById('res-payment-status');
    if (paymentSelect) {
      paymentSelect.value = draft.paymentStatus || paymentSelect.value || 'unpaid';
      updatePaymentStatusAppearance(paymentSelect, paymentSelect.value);
    }
    if (document.getElementById('res-payment-progress-type')) {
      document.getElementById('res-payment-progress-type').value = draft.paymentProgressType || 'percent';
    }
    if (document.getElementById('res-payment-progress-value')) {
      document.getElementById('res-payment-progress-value').value = draft.paymentProgressValue || '';
    }

    // Items
    if (Array.isArray(draft.items)) {
      setSelectedItems(draft.items);
      renderReservationItems();
    }

    // Technicians
    if (Array.isArray(draft.technicianIds) && draft.technicianIds.length) {
      try { setSelectedTechnicians(draft.technicianIds); } catch (_) { /* ignore */ }
    }

    updateCreateProjectTaxState();
    renderDraftReservationSummary();
  } catch (error) {
    console.warn('⚠️ [reservations/createForm] Failed to restore create draft', error);
  }
}

function resolvePackageInfo(normalizedId) {
  if (!normalizedId) return null;
  let packageInfo = packageOptionsCache.find((entry) => entry.id === normalizedId) || null;
  if (packageInfo) {
    return packageInfo;
  }

  const raw = findPackageById(normalizedId);
  if (!raw) return null;

  packageInfo = {
    id: normalizedId,
    name: getPackageDisplayName(raw) || normalizedId,
    price: resolvePackagePrice(raw),
    items: resolvePackageItems(raw),
    raw,
  };

  return packageInfo;
}

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

function addDraftEquipmentByBarcode(rawCode, inputElement, options = {}) {
  const { silent = false } = options;
  const normalizedCode = normalizeBarcodeValue(rawCode);
  if (!normalizedCode) {
    return { success: false, message: null };
  }

  const { start, end } = getCreateReservationDateRange();
  if (!start || !end) {
    const message = t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات');
    if (!silent) showToast(message);
    return { success: false, message };
  }

  const currentItems = getSelectedItems();
  const selectedBarcodes = collectSelectedItemBarcodes(currentItems);
  if (selectedBarcodes.has(normalizedCode)) {
    const message = t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز');
    if (!silent) showToast(message);
    return { success: false, message };
  }

  const blockingPackages = getBlockingPackagesForEquipment(normalizedCode, start, end);
  if (blockingPackages.length) {
    const names = blockingPackages.map((pkg) => pkg.name).join(', ');
    const message = t('reservations.toast.equipmentBlockedByPackage', `⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${names}`);
    if (!silent) showToast(message);
    return { success: false, message };
  }

  if (hasEquipmentConflict(normalizedCode, start, end)) {
    const base = t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية');
    if (!silent) {
      try {
        const params = new URLSearchParams({ type: 'equipment', id: normalizedCode, start, end });
        apiRequest(`/reservations/availability.php?${params.toString()}`)
          .then((res) => {
            const conflicts = Array.isArray(res?.conflicts) ? res.conflicts : [];
            const codes = Array.from(new Set(conflicts.map((c) => c?.reservation_code || (c?.reservation_id != null ? `#${c.reservation_id}` : null)).filter(Boolean)));
            const msg = codes.length ? `${base}: ${codes.join('، ')}` : base;
            showToast(msg);
          })
          .catch(() => showToast(base));
      } catch (_) {
        showToast(base);
      }
    }
    return { success: false, message: base };
  }

  const item = findEquipmentByBarcode(normalizedCode);
  if (!item) {
    const message = t('reservations.toast.barcodeNotFound', '❌ الباركود غير موجود');
    if (!silent) showToast(message);
    return { success: false, message };
  }

  const availability = getEquipmentAvailabilityStatus(item);
  if (availability === 'maintenance' || availability === 'retired') {
    const message = getEquipmentUnavailableMessage(availability);
    if (!silent) showToast(message);
    return { success: false, message };
  }

  const equipmentId = resolveEquipmentIdentifier(item);
  if (!equipmentId) {
    const message = t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف');
    if (!silent) showToast(message);
    return { success: false, message };
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
  const message = t('reservations.toast.equipmentAdded', '✅ تم إضافة المعدة بنجاح');
  if (!silent) showToast(message);
  return { success: true, message, barcode: normalizedCode };
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
  const selectedBarcodes = collectSelectedItemBarcodes(currentItems);
  if (selectedBarcodes.has(normalizedCode)) {
    showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
    return;
  }

  const blockingPackages = getBlockingPackagesForEquipment(normalizedCode, start, end);
  if (blockingPackages.length) {
    const names = blockingPackages.map((pkg) => pkg.name).join(', ');
    showToast(t('reservations.toast.equipmentBlockedByPackage', `⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${names}`));
    return;
  }

  if (hasEquipmentConflict(normalizedCode, start, end)) {
    const base = t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية');
    try {
      const params = new URLSearchParams({ type: 'equipment', id: normalizedCode, start, end });
      apiRequest(`/reservations/availability.php?${params.toString()}`)
        .then((res) => {
          const conflicts = Array.isArray(res?.conflicts) ? res.conflicts : [];
          const codes = Array.from(new Set(conflicts.map((c) => c?.reservation_code || (c?.reservation_id != null ? `#${c.reservation_id}` : null)).filter(Boolean)));
          const msg = codes.length ? `${base}: ${codes.join('، ')}` : base;
          showToast(msg);
        })
        .catch(() => showToast(base));
    } catch (_) {
      showToast(base);
    }
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
    createInput.addEventListener('focus', () => {
      populateEquipmentDescriptionLists();
      if (typeof createInput.showPicker === 'function') {
        try {
          createInput.showPicker();
        } catch (error) {
          // ignore browsers that disallow programmatic picker opening
        }
      }
    });
    createInput.addEventListener('input', tryAutoAdd);
    createInput.addEventListener('change', tryAutoAdd);
    createInput.dataset.listenerAttached = 'true';
  }
}

function applyEquipmentSelectionButtonState(button, active) {
  if (!button) return;
  const isActive = Boolean(active);
  button.dataset.selectionActive = isActive ? 'true' : 'false';
  button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  button.classList.toggle('reservation-select-equipment-btn--active', isActive);
}

function collectSelectedItemBarcodes(items = getSelectedItems()) {
  const set = new Set();
  items.forEach((item) => {
    if (!item) return;
    const primaryBarcode = normalizeBarcodeValue(item.barcode ?? item.normalizedBarcode);
    if (primaryBarcode) {
      set.add(primaryBarcode);
    }

    if (Array.isArray(item.packageItems)) {
      item.packageItems.forEach((pkgItem) => {
        const childBarcode = normalizeBarcodeValue(pkgItem?.normalizedBarcode ?? pkgItem?.barcode);
        if (childBarcode) {
          set.add(childBarcode);
        }
      });
    }
  });
  return set;
}

function setupEquipmentSelectionButton() {
  const button = document.getElementById('open-equipment-selector');
  if (!button) return;

  if (!button.dataset.listenerAttached) {
    button.addEventListener('click', () => {
      const { start, end } = getCreateReservationDateRange();
      if (!start || !end) {
        showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
        return;
      }

      activateEquipmentSelection({
        mode: 'create',
        source: 'reservation-form',
        returnTab: 'reservations-tab',
        returnSubTab: 'create-tab',
        start,
        end,
      });

      const equipmentTabButton = document.querySelector('[data-tab="equipment-tab"]');
      if (equipmentTabButton) {
        equipmentTabButton.click();
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            document.getElementById('search-equipment')?.focus();
          }, 300);
        });
      } else {
        showToast(t('reservations.toast.equipmentTabUnavailable', '⚠️ تعذر فتح تبويب المعدات حالياً'));
      }
    });
    button.dataset.listenerAttached = 'true';
  }

  if (!button.dataset.selectionObserverAttached) {
    document.addEventListener(EQUIPMENT_SELECTION_EVENTS.change, (event) => {
      applyEquipmentSelectionButtonState(button, event?.detail?.active);
    });
    button.dataset.selectionObserverAttached = 'true';
  }

  applyEquipmentSelectionButtonState(button, isEquipmentSelectionActive());
}

function handleEquipmentSelectionAdd(event) {
  if (!event || !event.detail) return;
  if (!document.getElementById('reservation-form')) return;

  const detail = event.detail;
  const selectionMode = detail.selection?.mode || detail.selection?.source || '';
  if (selectionMode === 'package-manager' || selectionMode === 'equipment-packages') {
    return;
  }
  const barcodes = Array.isArray(detail.barcodes) ? detail.barcodes : [];
  const quantityRequested = Number.isInteger(detail.quantity) && detail.quantity > 0 ? detail.quantity : 1;

  const resolvedBarcodes = barcodes.length ? barcodes : (detail.barcode ? [detail.barcode] : []);
  if (!resolvedBarcodes.length) {
    return;
  }

  let addedCount = 0;
  let lastMessage = null;

  const uniqueBarcodes = [];
  const seen = new Set();
  resolvedBarcodes.forEach((code) => {
    const normalized = normalizeBarcodeValue(code);
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      uniqueBarcodes.push(normalized);
    }
  });

  const limit = Math.min(quantityRequested, uniqueBarcodes.length);
  for (let index = 0; index < limit; index += 1) {
    const barcode = uniqueBarcodes[index];
    const result = addDraftEquipmentByBarcode(barcode, null, { silent: true });
    if (result.success) {
      addedCount += 1;
    }
    if (result.message) {
      lastMessage = result.message;
    }
  }

  if (addedCount > 0) {
    const successLabel = t('reservations.toast.equipmentAddedBulk', '✅ تم إضافة {count} معدة إلى الحجز');
    const message = successLabel.replace('{count}', normalizeNumbers(String(addedCount)));
    showToast(message);
  } else if (lastMessage) {
    showToast(lastMessage);
  }
}

function setupEquipmentSelectionIntegration() {
  setupEquipmentSelectionButton();

  if (equipmentSelectionEventsRegistered || typeof document === 'undefined') {
    return;
  }

  document.addEventListener(EQUIPMENT_SELECTION_EVENTS.requestAdd, handleEquipmentSelectionAdd);
  equipmentSelectionEventsRegistered = true;
}

function getEquipmentModeElements() {
  if (typeof document === 'undefined') {
    return {
      modeRadios: [],
      singleContainer: null,
      packageContainer: null,
      packageSelect: null,
      packageHint: null,
      packageAddButton: null,
    };
  }

  const modeRadios = Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]'));
  const singleContainer = document.querySelector('[data-equipment-mode="single"]');
  const packageContainer = document.querySelector('[data-equipment-mode="package"]');
  const packageSelect = document.getElementById('reservation-package-select');
  const packageHint = document.getElementById('reservation-package-hint');
  const packageAddButton = document.getElementById('add-reservation-package');

  return {
    modeRadios,
    singleContainer,
    packageContainer,
    packageSelect,
    packageHint,
    packageAddButton,
  };
}

function applyEquipmentModeUi(mode) {
  const normalized = mode === 'package' ? 'package' : 'single';
  const {
    singleContainer,
    packageContainer,
    packageSelect,
  } = getEquipmentModeElements();

  if (singleContainer) {
    singleContainer.hidden = normalized !== 'single';
    singleContainer.setAttribute('aria-hidden', normalized !== 'single' ? 'true' : 'false');
  }

  if (packageContainer) {
    packageContainer.hidden = normalized !== 'package';
    packageContainer.setAttribute('aria-hidden', normalized !== 'package' ? 'true' : 'false');
  }

  const barcodeInput = document.getElementById('equipment-barcode');
  const descriptionInput = document.getElementById('equipment-description');

  const shouldDisableSingleInputs = normalized === 'package';
  if (barcodeInput) {
    barcodeInput.disabled = shouldDisableSingleInputs;
  }
  if (descriptionInput) {
    descriptionInput.disabled = shouldDisableSingleInputs;
  }

  if (packageSelect) {
    packageSelect.disabled = normalized !== 'package' || packageSelect.options.length === 0;
  }

  setEquipmentBookingMode(normalized);

  if (normalized === 'package') {
    populatePackageSelect();
  }
}

function populatePackageSelect() {
  const {
    packageSelect,
    packageHint,
  } = getEquipmentModeElements();

  if (!packageSelect) {
    return;
  }

  // Future improvement: swap this synchronous snapshot with an async API fetch
  // so that recently added packages from other sessions appear without reloads.
  const snapshot = buildPackageOptionsSnapshot();
  packageOptionsCache = snapshot;
  setCachedPackages(snapshot.map((entry) => entry.raw ?? entry));

  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const placeholderOption = `<option value="" disabled selected>${t('reservations.create.packages.placeholder', 'اختر الحزمة')}</option>`;

  const optionMarkup = snapshot
    .map((entry) => {
      const price = Number.isFinite(Number(entry.price)) ? Number(entry.price) : 0;
      const priceDisplay = normalizeNumbers(price.toFixed(2));
      const label = `${entry.name} — ${priceDisplay} ${currencyLabel}`;
      return `<option value="${entry.id}">${label}</option>`;
    })
    .join('');

  packageSelect.innerHTML = `${placeholderOption}${optionMarkup}`;
  packageSelect.selectedIndex = 0;

  const hasPackages = snapshot.length > 0;
  packageSelect.disabled = !hasPackages;

  if (packageHint) {
    if (hasPackages) {
      packageHint.textContent = t('reservations.create.packages.hint', 'سيتم إضافة الحزمة مباشرة بمجرد اختيارها.');
      packageHint.dataset.state = 'ready';
    } else {
      packageHint.textContent = t('reservations.create.packages.empty', 'لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم.');
      packageHint.dataset.state = 'empty';
    }
  }

  setupPackageSelectAutoAdd();
}

function buildPackageConflictMessage(packageInfo, conflictingItems) {
  const packageName = packageInfo?.name || t('reservations.create.packages.genericName', 'الحزمة');
  const header = t('reservations.toast.packageItemsConflict', `⚠️ لا يمكن إضافة ${packageName} لأن العناصر التالية غير متاحة:`);

  const lines = conflictingItems.map(({ item, blockingPackages }) => {
    const itemLabel = item?.desc || normalizeNumbers(String(item?.barcode ?? item?.normalizedBarcode ?? '')) || t('reservations.create.packages.unnamedItem', 'عنصر بدون اسم');
    if (Array.isArray(blockingPackages) && blockingPackages.length) {
      const packagesNames = blockingPackages.map((pkg) => pkg.name).join(', ');
      return `• ${itemLabel} (${t('reservations.create.packages.blockedByPackage', 'محجوز ضمن الحزم')}: ${packagesNames})`;
    }
    return `• ${itemLabel} (${t('reservations.create.packages.blockedDirect', 'محجوز في الفترة المختارة')})`;
  });

  return [header, ...lines].join('\n');
}

export function buildReservationPackageEntry(packageId, {
  existingItems = [],
  start,
  end,
  ignoreReservationId = null,
} = {}) {
  const normalizedId = normalizePackageId(packageId);
  if (!normalizedId) {
    return {
      success: false,
      reason: 'invalid',
      message: t('reservations.toast.packageInvalid', '⚠️ يرجى اختيار حزمة صالحة أولاً'),
    };
  }

  const packageInfo = resolvePackageInfo(normalizedId);
  if (!packageInfo) {
    return {
      success: false,
      reason: 'not_found',
      message: t('reservations.toast.packageNotFound', '⚠️ تعذر العثور على بيانات الحزمة المحددة'),
    };
  }

  if (!start || !end) {
    return {
      success: false,
      reason: 'missing_dates',
      message: t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'),
    };
  }

  if (existingItems.some((entry) => entry?.type === 'package' && normalizePackageId(entry.packageId) === normalizedId)) {
    return {
      success: false,
      reason: 'duplicate',
      message: t('reservations.toast.packageDuplicate', '⚠️ هذه الحزمة مضافة بالفعل إلى الحجز'),
    };
  }

  if (hasPackageConflict(normalizedId, start, end, ignoreReservationId)) {
    const name = packageInfo.name || normalizedId;
    return {
      success: false,
      reason: 'package_conflict',
      message: t('reservations.toast.packageTimeConflict', `⚠️ الحزمة ${name} محجوزة بالفعل في الفترة المختارة`),
    };
  }

  const packageItems = Array.isArray(packageInfo.items) && packageInfo.items.length
    ? packageInfo.items
    : resolvePackageItems(packageInfo.raw ?? {});

  const selectedBarcodesSet = collectSelectedItemBarcodes(existingItems);
  const duplicateItems = [];
  const seenWithinPackage = new Set();

  packageItems.forEach((pkgItem) => {
    const normalizedBarcode = normalizeBarcodeValue(pkgItem?.normalizedBarcode ?? pkgItem?.barcode);
    if (!normalizedBarcode) {
      return;
    }

    if (seenWithinPackage.has(normalizedBarcode)) {
      duplicateItems.push({ item: pkgItem, type: 'internal' });
      return;
    }
    seenWithinPackage.add(normalizedBarcode);

    if (selectedBarcodesSet.has(normalizedBarcode)) {
      duplicateItems.push({ item: pkgItem, type: 'external' });
    }
  });

  if (duplicateItems.length) {
    const itemsList = duplicateItems
      .map(({ item }) => item?.desc || item?.description || item?.name || item?.barcode || item?.normalizedBarcode || t('equipment.packages.items.unknown', 'معدة بدون اسم'))
      .map((label) => normalizeNumbers(String(label)))
      .join(', ');

    const message = duplicateItems.some((entry) => entry.type === 'external')
      ? t('reservations.toast.packageDuplicateEquipmentExternal', '⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}').replace('{items}', itemsList)
      : t('reservations.toast.packageDuplicateEquipmentInternal', '⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}').replace('{items}', itemsList);

    return {
      success: false,
      reason: 'package_duplicate_equipment',
      message,
      duplicates: duplicateItems,
    };
  }

  const conflictingItems = [];

  packageItems.forEach((pkgItem) => {
    const normalizedBarcode = normalizeBarcodeValue(pkgItem?.normalizedBarcode ?? pkgItem?.barcode);
    if (!normalizedBarcode) {
      return;
    }

    if (hasEquipmentConflict(normalizedBarcode, start, end, ignoreReservationId)) {
      const blockingPackages = getBlockingPackagesForEquipment(normalizedBarcode, start, end, ignoreReservationId);
      conflictingItems.push({ item: pkgItem, blockingPackages });
    }
  });

  if (conflictingItems.length) {
    return {
      success: false,
      reason: 'item_conflict',
      message: buildPackageConflictMessage(packageInfo, conflictingItems),
      conflicts: conflictingItems,
    };
  }

  const packagePayload = {
    id: `package::${normalizedId}`,
    packageId: normalizedId,
    type: 'package',
    desc: packageInfo.name || `Package ${normalizedId}`,
    qty: 1,
    price: Number.isFinite(Number(packageInfo.price)) ? Number(packageInfo.price) : 0,
    barcode: packageInfo.code || packageInfo.raw?.package_code || `pkg-${normalizedId}`,
    packageItems: packageItems.map((item) => ({
      equipmentId: item?.equipmentId ?? null,
      barcode: item?.barcode ?? item?.normalizedBarcode ?? '',
      normalizedBarcode: normalizeBarcodeValue(item?.normalizedBarcode ?? item?.barcode),
      desc: item?.desc ?? '',
      qty: Number.isFinite(Number(item?.qty)) ? Number(item.qty) : 1,
      price: Number.isFinite(Number(item?.price)) ? Number(item.price) : 0,
    })),
    image: packageItems.find((item) => item?.image)?.image ?? null,
  };

  return { success: true, package: packagePayload, packageInfo };
}

function addPackageToReservation(packageId, { silent = false } = {}) {
  const normalizedId = normalizePackageId(packageId);
  if (!normalizedId) {
    if (!silent) {
      showToast(t('reservations.toast.packageInvalid', '⚠️ يرجى اختيار حزمة صالحة أولاً'));
    }
    return { success: false, reason: 'invalid' };
  }

  const { start, end } = getCreateReservationDateRange();
  const currentItems = getSelectedItems();
  const result = buildReservationPackageEntry(normalizedId, { existingItems: currentItems, start, end });

  if (!result.success) {
    if (!silent) {
      const fallbackMessages = {
        invalid: t('reservations.toast.packageInvalid', '⚠️ يرجى اختيار حزمة صالحة أولاً'),
        not_found: t('reservations.toast.packageNotFound', '⚠️ تعذر العثور على بيانات الحزمة المحددة'),
        missing_dates: t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'),
        duplicate: t('reservations.toast.packageDuplicate', '⚠️ هذه الحزمة مضافة بالفعل إلى الحجز'),
      };
      const fallback = fallbackMessages[result.reason] || t('reservations.toast.packageInvalid', '⚠️ يرجى اختيار حزمة صالحة أولاً');
      showToast(result.message || fallback);
    }
    return result;
  }

  addSelectedItem(result.package);
  renderReservationItems();
  renderDraftReservationSummary();

  if (!silent) {
    showToast(t('reservations.toast.packageAdded', '✅ تم إضافة الحزمة بنجاح'));
  }

  return { success: true, package: result.package };
}

function setupPackageSelectAutoAdd() {
  const { packageSelect } = getEquipmentModeElements();
  if (!packageSelect || packageSelect.dataset.autoAddAttached === 'true') {
    return;
  }

  packageSelect.addEventListener('change', () => {
    const selectedValue = packageSelect.value;
    if (!selectedValue) return;
    const result = addPackageToReservation(selectedValue);
    if (result?.success) {
      if (packageSelect.options.length > 0) {
        packageSelect.selectedIndex = 0;
      } else {
        packageSelect.value = '';
      }
    }
  });

  packageSelect.dataset.autoAddAttached = 'true';
}

function setupPackageAddHandler() {
  const { packageAddButton, packageSelect } = getEquipmentModeElements();
  if (!packageAddButton || packageAddButton.dataset.listenerAttached) {
    return;
  }

  packageAddButton.addEventListener('click', () => {
    const selectedValue = packageSelect?.value || '';
    if (!selectedValue) {
      showToast(t('reservations.toast.packageInvalid', '⚠️ يرجى اختيار حزمة صالحة أولاً'));
      return;
    }
    addPackageToReservation(selectedValue);
  });

  packageAddButton.dataset.listenerAttached = 'true';
}

function setupEquipmentModeControls() {
  const { modeRadios } = getEquipmentModeElements();
  if (!modeRadios.length) {
    return;
  }

  modeRadios.forEach((radio) => {
    if (radio.dataset.listenerAttached) return;
    radio.addEventListener('change', (event) => {
      if (!event.target.checked) return;
      applyEquipmentModeUi(event.target.value);
    });
    radio.dataset.listenerAttached = 'true';
  });

  setupPackageAddHandler();
  setupPackageSelectAutoAdd();

  const activeMode = getEquipmentBookingMode();
  const activeRadio = modeRadios.find((radio) => radio.value === activeMode);
  if (activeRadio) {
    activeRadio.checked = true;
  }
  applyEquipmentModeUi(activeMode);
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

      const isPackageGroup = group.items.some((item) => item?.type === 'package');

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

      let packageItemsMeta = '';
      if (isPackageGroup) {
        const aggregated = new Map();
        group.items.forEach((item) => {
          if (!Array.isArray(item?.packageItems)) return;
          item.packageItems.forEach((pkgItem) => {
            if (!pkgItem) return;
            const key = normalizeBarcodeValue(pkgItem.barcode || pkgItem.desc || Math.random());
            const existing = aggregated.get(key);
            if (existing) {
              existing.qty += Number.isFinite(Number(pkgItem.qty)) ? Number(pkgItem.qty) : 1;
              return;
            }
            aggregated.set(key, {
              desc: pkgItem.desc || pkgItem.barcode || t('reservations.create.packages.unnamedItem', 'عنصر بدون اسم'),
              qty: Number.isFinite(Number(pkgItem.qty)) ? Number(pkgItem.qty) : 1,
              barcode: pkgItem.barcode ?? pkgItem.normalizedBarcode ?? '',
            });
          });
        });

        if (aggregated.size) {
          const itemsMarkup = Array.from(aggregated.values())
            .map((pkgItem) => {
              const qtyDisplay = normalizeNumbers(String(pkgItem.qty));
              const label = pkgItem.desc || normalizeNumbers(String(pkgItem.barcode || ''));
              const barcodeLabel = pkgItem.barcode
                ? ` <span class="reservation-package-items__barcode">(${normalizeNumbers(String(pkgItem.barcode))})</span>`
                : '';
              return `<li>${label}${barcodeLabel} × ${qtyDisplay}</li>`;
            })
            .join('');

          packageItemsMeta = `
            <details class="reservation-package-items">
              <summary>${t('reservations.create.packages.itemsSummary', 'عرض محتويات الحزمة')}</summary>
              <ul class="reservation-package-items__list">
                ${itemsMarkup}
              </ul>
            </details>
          `;
        }
      }

      return `
        <tr data-group-key="${group.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${imageCell}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${group.description || '-'}</div>
                ${isPackageGroup ? `${packageItemsMeta || ''}${barcodesMeta || ''}` : barcodesMeta}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${group.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${group.key}" aria-label="${decreaseLabel}" ${isPackageGroup ? 'disabled' : ''}>−</button>
              <span class="reservation-qty-value">${quantityDisplay}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${group.key}" aria-label="${increaseLabel}" ${isPackageGroup ? 'disabled' : ''}>+</button>
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

  const crewAssignments = getSelectedCrewAssignments();

  renderDraftSummary({
    selectedItems: getSelectedItems(),
    crewAssignments,
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

  // Persist latest draft state after updating summary
  try { persistCreateReservationDraft(); } catch (_) { /* ignore */ }
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

  const crewAssignments = getSelectedCrewAssignments();
  const technicianIds = crewAssignments
    .map((assignment) => assignment.technicianId)
    .filter(Boolean);
  const draftItems = getSelectedItems();
  if (draftItems.length === 0 && crewAssignments.length === 0) {
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

  // Collect all conflicting equipment names (and barcodes) to present a clear toast
  const conflictingEquipment = [];
  for (const item of draftItems) {
    const code = normalizeBarcodeValue(item.barcode);
    if (hasEquipmentConflict(code, start, end)) {
      const label = item?.desc || item?.name || item?.barcode || t('reservations.create.packages.unnamedItem', 'معدة بدون اسم');
      conflictingEquipment.push({
        label: normalizeNumbers(String(label)),
        barcode: code,
      });
    }
  }
  if (conflictingEquipment.length) {
    const prefix = t('reservations.toast.cannotCreateEquipmentConflict', '⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية');
    // Try to fetch reservation codes causing conflicts (best-effort)
    let annotatedList = null;
    try {
      const uniqueBarcodes = Array.from(new Set(conflictingEquipment.map((e) => e.barcode).filter(Boolean)));
      const codeMap = new Map();
      await Promise.all(uniqueBarcodes.map(async (barcode) => {
        const params = new URLSearchParams({ type: 'equipment', id: barcode, start, end });
        const res = await apiRequest(`/reservations/availability.php?${params.toString()}`);
        const conflicts = Array.isArray(res?.conflicts) ? res.conflicts : [];
        const codes = Array.from(new Set(conflicts.map((c) => c?.reservation_code || (c?.reservation_id != null ? `#${c.reservation_id}` : null)).filter(Boolean)));
        codeMap.set(barcode, codes);
      }));
      annotatedList = conflictingEquipment.map(({ label, barcode }) => {
        const codes = codeMap.get(barcode) || [];
        return codes.length ? `${label} (${codes.join('، ')})` : label;
      }).join('، ');
    } catch (_) {
      // fallback to labels-only if API not available
    }
    const list = annotatedList
      || conflictingEquipment.map((e) => e.label).filter(Boolean).map(String).join('، ');
    showToast(`${prefix}: ${list}`, 'warning', 6000);
    return;
  }

  // Validate package conflicts at submit time and include blocking reservation codes
  const packageConflicts = [];
  for (const item of draftItems) {
    if (item?.type !== 'package') continue;
    const packageId = item.packageId ?? item.package_id ?? null;
    if (!packageId) continue;
    if (hasPackageConflict(packageId, start, end)) {
      const name = item.desc || item.packageName || t('reservations.create.packages.genericName', 'الحزمة');
      let codes = [];
      try {
        const params = new URLSearchParams({ type: 'package', id: String(packageId), start, end });
        const res = await apiRequest(`/reservations/availability.php?${params.toString()}`);
        const conflicts = Array.isArray(res?.conflicts) ? res.conflicts : [];
        codes = Array.from(new Set(conflicts.map((c) => c?.reservation_code || (c?.reservation_id != null ? `#${c.reservation_id}` : null)).filter(Boolean)));
      } catch (_) { /* ignore */ }
      packageConflicts.push({ label: normalizeNumbers(String(name)), codes });
    }
  }
  if (packageConflicts.length) {
    const details = packageConflicts
      .map(({ label, codes }) => (codes && codes.length ? `${label} (${codes.join('، ')})` : label))
      .join('، ');
    const msg = t('reservations.toast.packageTimeConflict', `⚠️ الحزمة محجوزة بالفعل في الفترة المختارة`);
    showToast(`${msg}: ${details}`, 'warning', 6000);
    return;
  }

  // Collect crew conflicts and annotate with reservation codes
  const crewConflicts = [];
  for (const assignment of crewAssignments) {
    if (!assignment?.technicianId) continue;
    if (!hasTechnicianConflict(assignment.technicianId, start, end)) continue;
    const label = assignment?.technicianName || assignment?.positionLabel || String(assignment.technicianId);
    let codes = [];
    try {
      codes = getTechnicianConflictingReservationCodes(assignment.technicianId, start, end, null);
    } catch (_) { /* ignore */ }
    crewConflicts.push({ label: normalizeNumbers(String(label)), codes });
  }
  if (crewConflicts.length) {
    const prefix = t('reservations.toast.cannotCreateCrewConflict', '⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة');
    const details = crewConflicts
      .map(({ label, codes }) => (codes && codes.length ? `${label} (${codes.join('، ')})` : label))
      .join('، ');
    showToast(`${prefix}: ${details}`);
    return;
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
    crewAssignments,
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

  // Normalize project payment status for linked reservations (so tags follow the project immediately)
  const projectPaidRaw = typeof selectedProject?.paymentStatus === 'string'
    ? selectedProject.paymentStatus.toLowerCase()
    : null;
  const projectPaidStatus = projectPaidRaw && ['paid', 'partial', 'unpaid'].includes(projectPaidRaw)
    ? projectPaidRaw
    : 'unpaid';

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
    paidStatus: projectLinked ? projectPaidStatus : effectivePaidStatus,
    confirmed: projectConfirmed,
    items: draftItems.map((item) => ({
      ...item,
      equipmentId: item.equipmentId ?? item.id,
    })),
    crewAssignments,
    companySharePercent: projectLinked || !companyShareEnabled ? null : companySharePercent,
    companyShareEnabled: projectLinked ? false : companyShareEnabled,
    paidAmount: projectLinked ? 0 : paymentProgress.paidAmount,
    paidPercentage: projectLinked ? 0 : paymentProgress.paidPercent,
    paymentProgressType: projectLinked ? null : paymentProgress.paymentProgressType,
    paymentProgressValue: projectLinked ? null : paymentProgress.paymentProgressValue,
    paymentHistory: projectLinked ? [] : initialPaymentHistory,
  });

  try {
    crewDebugLog('about to submit', { crewAssignments, techniciansPayload: payload?.technicians, payload });
    const createdReservation = await createReservationApi(payload);
    crewDebugLog('server response', {
      reservation: createdReservation?.id ?? createdReservation?.reservationId ?? createdReservation?.reservation_code,
      technicians: createdReservation?.technicians,
      crewAssignments: createdReservation?.crewAssignments,
      techniciansDetails: createdReservation?.techniciansDetails,
    });
    syncEquipmentStatuses();
    populateEquipmentDescriptionLists();
    syncTechniciansStatuses();
    resetForm();
    showToast(t('reservations.toast.created', '✅ تم إنشاء الحجز'));
    // بعد النجاح: الانتقال تلقائياً إلى تبويب "حجوزاتي"
    try {
      const myTabBtn = document.getElementById('sub-tab-trigger-my-reservations-tab');
      if (myTabBtn && typeof myTabBtn.click === 'function') {
        // انقر زر التبويب لضمان تفعيل جميع مستمعي الأحداث وتحديث التفضيلات
        setTimeout(() => myTabBtn.click(), 0);
      }
    } catch (_) { /* تجاهل أي أخطاء غير متوقعة */ }
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
  clearEquipmentSelection('form-reset');
  renderReservationItems();
  updateCreateProjectTaxState();
  renderDraftReservationSummary();
  clearCreateReservationDraft();
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
    if (getEquipmentBookingMode() !== 'single') {
      return;
    }
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
    if (getEquipmentBookingMode() !== 'single') {
      return;
    }
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

  const clearBtn = document.getElementById('clear-reservation-form-btn');
  if (clearBtn && !clearBtn.dataset.listenerAttached) {
    clearBtn.addEventListener('click', (event) => {
      event.preventDefault();
      resetForm();
      try { clearCreateReservationDraft(); } catch (_) { /* ignore */ }
      showToast(t('reservations.toast.formCleared', '🧹 تم مسح الحقول'));
    });
    clearBtn.dataset.listenerAttached = 'true';
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
  populatePackageSelect();
  setupEquipmentDescriptionInputs();
  setupEquipmentSelectionIntegration();
  setupEquipmentModeControls();
  setupReservationTimeSync();
  setupSummaryEvents();
  setupReservationButtons();
  setupBarcodeInput();
  setupFormSubmit();
  // Restore saved draft before applying any project context overrides
  restoreCreateReservationDraft();
  applyPendingProjectContext();
  renderDraftReservationSummary();
  renderReservationItems();
}

export function refreshCreateReservationForm() {
  populateEquipmentDescriptionLists();
  populatePackageSelect();
  populateProjectSelect();
  ensureCustomerChoices();
  setupCustomerAutocomplete();
  setupProjectSelection();
  setupEquipmentSelectionIntegration();
  setupEquipmentModeControls();
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

  document.addEventListener('equipment:changed', () => {
    populateEquipmentDescriptionLists();
  });

  document.addEventListener('packages:changed', () => {
    populatePackageSelect();
    if (getEquipmentBookingMode() === 'package') {
      applyEquipmentModeUi('package');
    }
  });
}

if (typeof window !== 'undefined') {
  window.getCompanySharePercent = getCompanySharePercent;
}

export { populateEquipmentDescriptionLists, addDraftEquipmentByDescription, renderDraftReservationSummary, renderReservationItems };
