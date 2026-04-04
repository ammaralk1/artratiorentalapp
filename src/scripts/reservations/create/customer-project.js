import { showToast, normalizeNumbers } from '../../utils.js';
import { t } from '../../language.js';
import { normalizeText } from '../../reservationsShared.js';
import {
  getCachedCustomers,
  splitDateTime,
} from '../state.js';
import { loadData } from '../../storage.js';
import {
  DEFAULT_COMPANY_SHARE_PERCENT,
} from '../../reservationsSummary.js';
import { state } from './state.js';
import { persistCreateReservationDraft } from './draft.js';
import { renderDraftReservationSummary } from './packages-items.js';

export const DEFAULT_PROJECT_FORM_DRAFT_KEY = 'projects:create:draft';
export const DEFAULT_PROJECT_FORM_RETURN_URL = 'projects.html#projects-section';

export function getCustomerElements() {
  if (typeof document === 'undefined') {
    return { input: null, hidden: null, list: null };
  }
  return {
    input: document.getElementById('res-customer-input'),
    hidden: document.getElementById('res-customer'),
    list: document.getElementById('res-customer-options'),
  };
}

export function getProjectElements() {
  if (typeof document === 'undefined') {
    return { input: null, hidden: null, list: null };
  }
  return {
    input: document.getElementById('res-project-input'),
    hidden: document.getElementById('res-project'),
    list: document.getElementById('res-project-options'),
  };
}

export function isLinkedProjectSelected() {
  const { input, hidden } = getProjectElements();
  if (input?.dataset?.pendingLinked === 'true') return true;
  return Boolean(hidden?.value);
}

export function registerLinkedControlGuard(element, conditionFn) {
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

export function resolveOptionByLabel(optionMap, value, { allowPartial = false } = {}) {
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

export function resolveCustomerByLabel(value, options = {}) {
  return resolveOptionByLabel(state.customerOptionMap, value, options);
}

export function resolveProjectByLabel(value, options = {}) {
  return resolveOptionByLabel(state.projectOptionMap, value, options);
}

export function setCachedProjects(projects) {
  state.cachedProjects = Array.isArray(projects) ? [...projects] : [];
}

export function getCachedProjects() {
  return state.cachedProjects;
}

export function findProjectById(projectId) {
  if (!projectId) return null;
  return getCachedProjects().find((project) => String(project.id) === String(projectId)) || null;
}

export function getProjectDisplayName(project) {
  if (!project) return '';
  const title = typeof project.title === 'string' ? project.title.trim() : '';
  if (title) return title;
  return t('projects.fallback.untitled', 'مشروع بدون اسم');
}

export function getCustomerDisplayName(customer) {
  if (!customer) return '';

  const name = customer.customerName
    ?? customer.full_name
    ?? customer.fullName
    ?? customer.name
    ?? customer.customer_name
    ?? '';

  return typeof name === 'string' ? name.trim() : String(name || '').trim();
}

export function isProjectConfirmed(project) {
  if (!project) return false;
  if (project.confirmed === true) return true;
  const status = typeof project.status === 'string' ? project.status.toLowerCase() : '';
  return ['confirmed', 'in_progress', 'completed'].includes(status);
}

export function resolveProjectDateTime(project, key) {
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

export function syncCreateTaxAndShare(source) {
  const taxCheckbox = document.getElementById('res-tax');
  const shareCheckbox = document.getElementById('res-company-share');

  if (!taxCheckbox || !shareCheckbox) {
    return;
  }

  if (state.isSyncingShareTaxCreate) {
    renderDraftReservationSummary();
    return;
  }

  state.isSyncingShareTaxCreate = true;

  const finalize = () => {
    state.isSyncingShareTaxCreate = false;
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


export function setDateTimeInputs(dateInputId, timeInputId, isoString) {
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

// escapeHtml needed here for option label building
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function ensureCustomerChoices({ selectedValue = '', resetInput = false } = {}) {
  const { input, hidden, list } = getCustomerElements();
  if (!input || !hidden || !list) return;

  const customers = getCachedCustomers() || [];
  const placeholderLabel = t('reservations.create.placeholders.client', 'اختر عميلًا (اختياري)');
  const fallbackLabel = t('customers.fallback.unnamed', 'عميل بدون اسم');

  input.setAttribute('placeholder', placeholderLabel);

  const seenLabels = new Set();
  state.customerOptionMap = new Map();

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
      state.customerOptionMap.set(normalizedLabel, option);
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

export function ensureProjectChoices({ selectedValue = '', projectsList = null, resetInput = false } = {}) {
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
  state.projectOptionMap = new Map();

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
      state.projectOptionMap.set(normalizedLabel, option);
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

export function applyProjectContextToForm(project, { forceNotes = false, skipProjectSelectUpdate = false } = {}) {
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

export function populateProjectSelect({ projectsList = null, preselectId = null } = {}) {
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

export function updateCreateProjectTaxState() {
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

export function setupProjectSelection() {
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
    // Persist draft continuously while typing
    try { persistCreateReservationDraft(); } catch (_) { /* ignore */ }
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

export function setupCustomerAutocomplete() {
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
    // Persist draft continuously while typing
    try { persistCreateReservationDraft(); } catch (_) { /* ignore */ }
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

export function applyPendingProjectContext() {
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
    state.linkedProjectReturnContext = {
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

export function enableProjectSelection({ clearValue = false } = {}) {
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

export function disableProjectSelection(message, displayValue = '') {
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

