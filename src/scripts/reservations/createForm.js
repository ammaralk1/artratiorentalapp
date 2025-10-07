import { loadData } from '../storage.js';
import { showToast, generateReservationId, normalizeNumbers } from '../utils.js';
import { t } from '../language.js';
import { resolveItemImage, getEquipmentRecordByBarcode, isEquipmentInMaintenance, findEquipmentByBarcode } from '../reservationsEquipment.js';
import { getSelectedTechnicians, resetSelectedTechnicians } from '../reservationsTechnicians.js';
import { calculateReservationTotal, renderDraftSummary, DEFAULT_COMPANY_SHARE_PERCENT } from '../reservationsSummary.js';
import { normalizeText } from '../reservationsShared.js';
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
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import {
  createReservationApi,
  buildReservationPayload,
  isApiError,
} from '../reservationsService.js';

let afterSubmitCallback = null;
let cachedProjects = [];

let customerChoices = null;
let projectChoices = null;

function applyChoicesDarkTheme(instance) {
  if (!instance) return;
  instance.containerOuter?.element?.classList.add('choices--reservation-dark');
  instance.containerInner?.element?.classList.add('choices__inner--reservation-dark');
  instance.dropdown?.element?.classList.add('choices__list--dropdown-reservation-dark');
  instance.input?.element?.classList.add('choices__input--reservation-dark');
}

function applyDarkModeToChoices() {
  document.querySelectorAll('.choices').forEach((choice) => {
    const inner = choice.querySelector('.choices__inner');
    const dropdown = choice.querySelector('.choices__list--dropdown');
    if (inner) {
      inner.style.backgroundColor = '#111827';
      inner.style.color = '#f9fafb';
      inner.style.border = '1px solid #374151';
    }
    if (dropdown) {
      dropdown.style.backgroundColor = '#1f2937';
      dropdown.style.color = '#f9fafb';
      dropdown.style.border = '1px solid #374151';
    }
  });
}

export function updatePaymentStatusAppearance(select, statusValue) {
  if (!select) return;
  const value = statusValue ?? select.value;
  select.classList.remove('payment-status-select--paid', 'payment-status-select--unpaid');
  if (value === 'paid') {
    select.classList.add('payment-status-select--paid');
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

function getCompanySharePercent() {
  const shareInput = document.getElementById('res-company-share');
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

function ensureCustomerChoices({ selectedValue = '' } = {}) {
  const select = document.getElementById('res-customer');
  if (!select) return;

  const customers = getCachedCustomers() || [];
  const placeholderLabel = t('reservations.create.placeholders.client', 'اختر عميلًا (اختياري)');
  const normalizedSelected = selectedValue ? String(selectedValue) : '';

  if (customerChoices) {
    customerChoices.config.placeholderValue = placeholderLabel;
    customerChoices.config.searchPlaceholderValue = placeholderLabel;
    customerChoices.config.loadingText = t('common.loading', 'جاري التحميل...');
    customerChoices.config.noResultsText = t('common.noResults', 'لا توجد نتائج');
    customerChoices.config.noChoicesText = t('common.noChoices', 'لا توجد عناصر متاحة');
  }

  const seen = new Set();
  const choicesItems = customers
    .filter((customer) => customer && customer.id != null)
    .map((customer) => ({
      value: String(customer.id),
      label: getCustomerDisplayName(customer) || t('customers.fallback.unnamed', 'عميل بدون اسم')
    }))
    .filter((choice) => {
      if (!choice.label) return false;
      if (seen.has(choice.value)) return false;
      seen.add(choice.value);
      return true;
    })
    .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));

  if (!customerChoices) {
    select.innerHTML = '';
    customerChoices = new Choices(select, {
      searchEnabled: true,
      searchChoices: true,
      shouldSort: false,
      itemSelectText: '',
      allowHTML: false,
      placeholder: true,
      placeholderValue: placeholderLabel,
      searchPlaceholderValue: placeholderLabel,
      loadingText: t('common.loading', 'جاري التحميل...'),
      noResultsText: t('common.noResults', 'لا توجد نتائج'),
      noChoicesText: t('common.noChoices', 'لا توجد عناصر متاحة'),
    });
    applyChoicesDarkTheme(customerChoices);
    select.addEventListener('change', () => {
      renderDraftReservationSummary();
    });
  } else {
    applyChoicesDarkTheme(customerChoices);
  }
  applyDarkModeToChoices();

  customerChoices.clearChoices();
  customerChoices.setChoices(
    choicesItems.map((choice) => ({
      value: choice.value,
      label: choice.label,
      selected: normalizedSelected && choice.value === normalizedSelected
    })),
    'value',
    'label',
    true
  );

  if (normalizedSelected && choicesItems.some((choice) => choice.value === normalizedSelected)) {
    customerChoices.setChoiceByValue(normalizedSelected);
  } else {
    customerChoices.removeActiveItems(true);
    select.value = '';
  }
}

function ensureProjectChoices({ selectedValue = '', projectsList = null } = {}) {
  const select = document.getElementById('res-project');
  if (!select) return;

  const list = Array.isArray(projectsList) ? projectsList : (getCachedProjects() || []);
  const placeholderLabel = t('reservations.create.placeholders.project', 'اختر مشروعاً (اختياري)');
  const normalizedSelected = selectedValue ? String(selectedValue) : '';

  if (projectChoices) {
    projectChoices.config.placeholderValue = placeholderLabel;
    projectChoices.config.searchPlaceholderValue = placeholderLabel;
    projectChoices.config.loadingText = t('common.loading', 'جاري التحميل...');
    projectChoices.config.noResultsText = t('common.noResults', 'لا توجد نتائج');
    projectChoices.config.noChoicesText = t('common.noChoices', 'لا توجد عناصر متاحة');
  }

  const sortedProjects = [...list]
    .filter((project) => project && project.id != null)
    .sort((a, b) => String(b.createdAt || b.start || '').localeCompare(String(a.createdAt || a.start || '')));

  if (!projectChoices) {
    select.innerHTML = '';
    projectChoices = new Choices(select, {
      searchEnabled: true,
      searchChoices: true,
      shouldSort: false,
      itemSelectText: '',
      allowHTML: false,
      placeholder: true,
      placeholderValue: placeholderLabel,
      searchPlaceholderValue: placeholderLabel,
      loadingText: t('common.loading', 'جاري التحميل...'),
      noResultsText: t('common.noResults', 'لا توجد نتائج'),
      noChoicesText: t('common.noChoices', 'لا توجد عناصر متاحة'),
    });
    applyChoicesDarkTheme(projectChoices);

    select.addEventListener('change', () => {
      const projectId = select.value;
      const project = projectId ? findProjectById(projectId) : null;
      if (project) {
        applyProjectContextToForm(project, { skipProjectSelectUpdate: true });
      } else {
        updateCreateProjectTaxState();
        renderDraftReservationSummary();
      }
    });
  } else {
    applyChoicesDarkTheme(projectChoices);
  }
  applyDarkModeToChoices();

  projectChoices.clearChoices();
  projectChoices.setChoices(
    sortedProjects.map((project) => ({
      value: String(project.id),
      label: getProjectDisplayName(project),
      selected: normalizedSelected && String(project.id) === normalizedSelected
    })),
    'value',
    'label',
    true
  );

  if (normalizedSelected && sortedProjects.some((project) => String(project.id) === normalizedSelected)) {
    projectChoices.setChoiceByValue(normalizedSelected);
  } else {
    projectChoices.removeActiveItems(true);
    select.value = '';
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
    if (customerChoices) {
      customerChoices.setChoiceByValue(customerIdValue);
    } else {
      const customerSelect = document.getElementById('res-customer');
      if (customerSelect) customerSelect.value = customerIdValue;
    }
  } else {
    ensureCustomerChoices({ selectedValue: '' });
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

  updateCreateProjectTaxState();
  renderDraftReservationSummary();
}

function populateProjectSelect({ projectsList = null, preselectId = null } = {}) {
  const select = document.getElementById('res-project');
  if (!select) return;

  const { projects } = projectsList ? { projects: projectsList } : loadData();
  const list = Array.isArray(projects) ? projects : [];
  setCachedProjects(list);

  const previousValue = preselectId != null
    ? String(preselectId)
    : (projectChoices ? projectChoices.getValue(true) : select.value);

  ensureProjectChoices({ selectedValue: previousValue, projectsList: list });
  updateCreateProjectTaxState();
  renderDraftReservationSummary();
}

function updateCreateProjectTaxState() {
  const projectSelect = document.getElementById('res-project');
  const taxCheckbox = document.getElementById('res-tax');
  if (!taxCheckbox) return;

  const isLinked = Boolean(projectSelect?.value);
  if (isLinked) {
    taxCheckbox.checked = false;
    taxCheckbox.disabled = true;
    taxCheckbox.classList.add('disabled');
  } else {
    const wasDisabled = taxCheckbox.disabled;
    taxCheckbox.disabled = false;
    taxCheckbox.classList.remove('disabled');
    if (wasDisabled) {
      taxCheckbox.checked = false;
    }
  }
}

function setupProjectSelection() {
  const select = document.getElementById('res-project');
  if (!select || select.dataset.listenerAttached) return;
  select.addEventListener('change', () => {
    const projectId = select.value;
    const project = projectId ? findProjectById(projectId) : null;
    if (project) {
      applyProjectContextToForm(project, { skipProjectSelectUpdate: true });
    } else {
      updateCreateProjectTaxState();
      renderDraftReservationSummary();
    }
  });
  select.dataset.listenerAttached = 'true';
}

function applyPendingProjectContext() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('reservationProjectContext');
  if (!encoded) {
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

  if (!context || !context.projectId) return;

  const select = document.getElementById('res-project');
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
  if (context.start) {
    setDateTimeInputs('res-start', 'res-start-time', context.start);
  }
  if (context.end) {
    setDateTimeInputs('res-end', 'res-end-time', context.end);
  }
  if (context.customerId) {
    const customers = getCachedCustomers() || [];
    const projectCustomer = customers.find((c) => String(c.id) === String(context.customerId));
    if (projectCustomer?.id != null) {
      ensureCustomerChoices({ selectedValue: String(projectCustomer.id) });
    }
  } else {
    ensureCustomerChoices({ selectedValue: '' });
  }
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
  const normalizedTerm = normalizeText(term);
  if (!normalizedTerm) return null;
  const equipment = getCachedEquipment() || [];

  const exactMatch = equipment.find((item) => {
    const descriptionText = normalizeText(item?.desc || item?.description || '');
    return descriptionText === normalizedTerm;
  });
  if (exactMatch) return exactMatch;

  return equipment.find((item) => {
    const descriptionText = normalizeText(item?.desc || item?.description || '');
    return descriptionText.includes(normalizedTerm);
  }) || null;
}

export function hasExactEquipmentDescription(value, listId = 'equipment-description-options') {
  const normalizedValue = normalizeText(value);
  if (!normalizedValue) return false;

  const list = document.getElementById(listId);
  if (list && list.options) {
    const match = Array.from(list.options).some((option) => normalizeText(option.value) === normalizedValue);
    if (match) return true;
  }

  const equipment = getCachedEquipment() || [];
  return equipment.some((item) => normalizeText(item?.desc || item?.description || '') === normalizedValue);
}

function populateEquipmentDescriptionLists() {
  const createList = document.getElementById('equipment-description-options');
  const editList = document.getElementById('edit-res-equipment-description-options');

  const { equipment = [] } = loadData();
  const equipmentList = Array.isArray(equipment) ? equipment : [];
  setCachedEquipment(equipmentList);

  const uniqueDescriptions = Array.from(
    new Set(
      equipmentList
        .map((item) => item?.desc || item?.description || '')
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, 'ar', { sensitivity: 'base' }));

  const optionsHtml = uniqueDescriptions.map((desc) => `<option value="${desc}"></option>`).join('');

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

  if (isEquipmentInMaintenance(item.barcode)) {
    showToast(t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً'));
    return false;
  }

  addSelectedItem({
    id: item.id,
    equipmentId: item.id,
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
  if (latestRecord?.status === 'صيانة') {
    showToast(t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً'));
    return;
  }

  const normalizedCode = normalizeBarcodeValue(equipmentItem.barcode);
  if (!normalizedCode) {
    showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
    return;
  }

  const itemPayload = {
    id: equipmentItem.id,
    equipmentId: equipmentItem.id,
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

  if (isEquipmentInMaintenance(normalizedCode)) {
    showToast(t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً'));
    return;
  }

  addSelectedItem(itemPayload);
  renderReservationItems();
  renderDraftReservationSummary();

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
  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const imageAlt = t('reservations.create.equipment.imageAlt', 'صورة');

  if (items.length === 0) {
    container.innerHTML = `<tr><td colspan="5">${noItemsMessage}</td></tr>`;
    return;
  }

  container.innerHTML = items
    .map((item, index) => {
      const image = resolveItemImage(item);
      const priceDisplay = `${normalizeNumbers(String(item.price ?? 0))} ${currencyLabel}`;
      const imageCell = image
        ? `<img src="${image}" alt="${imageAlt}" class="reservation-item-thumb">`
        : '-';
      return `
        <tr>
          <td>${item.barcode || '-'}</td>
          <td>${item.desc}</td>
          <td>${priceDisplay}</td>
          <td>${imageCell}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-item" data-index="${index}">🗑️</button></td>
        </tr>
      `;
    })
    .join('');
}

function renderDraftReservationSummary() {
  const rawValue = document.getElementById('res-discount')?.value || '0';
  const discount = parseFloat(normalizeNumbers(rawValue)) || 0;

  const discountType = document.getElementById('res-discount-type')?.value || 'percent';
  const projectLinked = Boolean(document.getElementById('res-project')?.value);
  const taxCheckbox = document.getElementById('res-tax');
  const applyTax = projectLinked ? false : (taxCheckbox?.checked || false);
  const paidStatus = document.getElementById('res-payment-status')?.value || 'unpaid';
  const { start, end } = getCreateReservationDateRange();
  const companySharePercent = getCompanySharePercent();

  const paymentSelect = document.getElementById('res-payment-status');
  updatePaymentStatusAppearance(paymentSelect, paidStatus);

  renderDraftSummary({
    selectedItems: getSelectedItems(),
    discount,
    discountType,
    applyTax,
    paidStatus,
    start,
    end,
    companySharePercent
  });
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
    taxCheckbox.addEventListener('change', renderDraftReservationSummary);
    taxCheckbox.dataset.listenerAttached = 'true';
  }

  const shareCheckbox = document.getElementById('res-company-share');
  if (shareCheckbox && !shareCheckbox.dataset.listenerAttached) {
    shareCheckbox.addEventListener('change', renderDraftReservationSummary);
    shareCheckbox.dataset.listenerAttached = 'true';
  }

  const paymentSelect = document.getElementById('res-payment-status');
  if (paymentSelect && !paymentSelect.dataset.listenerAttached) {
    paymentSelect.addEventListener('change', () => {
      updatePaymentStatusAppearance(paymentSelect);
      renderDraftReservationSummary();
    });
    paymentSelect.dataset.listenerAttached = 'true';
  }

  updatePaymentStatusAppearance(paymentSelect);
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
  const customerSelect = document.getElementById('res-customer');
  const projectSelect = document.getElementById('res-project');
  const customerValue = customerSelect?.value ? String(customerSelect.value) : '';
  const projectIdValue = projectSelect?.value ? String(projectSelect.value) : '';
  const { customers } = loadData();

  const customer = customers.find((c) => String(c.id) === customerValue);

  if (!customer) {
    showToast(t('reservations.toast.customerNotFound', '⚠️ لم يتم العثور على العميل بالاسم المدخل'));
    return;
  }

  const customerId = customer.id;
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
  const paidStatus = document.getElementById('res-payment-status')?.value || 'unpaid';

  const selectedProject = projectIdValue ? findProjectById(projectIdValue) : null;
  const projectConfirmed = isProjectConfirmed(selectedProject);
  if (projectIdValue && !selectedProject) {
    showToast(t('reservations.toast.projectNotFound', '⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة.'));
    return;
  }

  for (const item of draftItems) {
    if (isEquipmentInMaintenance(item.barcode)) {
      showToast(t('reservations.toast.cannotCreateEquipmentMaintenance', '⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة'));
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
  const projectLinked = Boolean(projectIdValue);
  const applyTax = projectLinked ? false : (taxCheckbox?.checked || false);

  const totalCost = calculateReservationTotal(
    draftItems,
    discount,
    discountType,
    applyTax,
    technicianIds,
    { start, end }
  );

  const reservationCode = generateReservationId();

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
    discount,
    discountType,
    applyTax,
    paidStatus,
    confirmed: projectConfirmed,
    items: draftItems.map((item) => ({
      ...item,
      equipmentId: item.equipmentId ?? item.id,
    })),
    technicians: technicianIds,
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
  } catch (error) {
    console.error('❌ [reservations/createForm] Failed to create reservation', error);
    const message = isApiError(error)
      ? error.message
      : t('reservations.toast.createFailed', 'تعذر إنشاء الحجز، حاول مرة أخرى');
    showToast(message, 'error');
  }
}

function resetForm() {
  const customerSelect = document.getElementById('res-customer');
  if (customerChoices) {
    customerChoices.removeActiveItems();
  } else if (customerSelect) {
    customerSelect.value = '';
  }
  document.getElementById('res-start').value = '';
  document.getElementById('res-start-time').value = '';
  document.getElementById('res-end').value = '';
  document.getElementById('res-end-time').value = '';
  document.getElementById('res-notes').value = '';
  document.getElementById('res-discount').value = '';
  const taxCheckbox = document.getElementById('res-tax');
  if (taxCheckbox) {
    taxCheckbox.checked = false;
    taxCheckbox.disabled = false;
    taxCheckbox.classList.remove('disabled');
  }
  const shareCheckbox = document.getElementById('res-company-share');
  if (shareCheckbox) {
    shareCheckbox.checked = false;
  }
  const projectSelect = document.getElementById('res-project');
  if (projectChoices) {
    projectChoices.removeActiveItems();
  } else if (projectSelect) {
    projectSelect.value = '';
  }
  const descriptionInput = document.getElementById('equipment-description');
  if (descriptionInput) descriptionInput.value = '';
  const paymentSelect = document.getElementById('res-payment-status');
  if (paymentSelect) {
    paymentSelect.value = 'unpaid';
    updatePaymentStatusAppearance(paymentSelect, 'unpaid');
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
    const button = event.target.closest('button[data-action="remove-item"]');
    if (!button) return;
    const index = Number(button.dataset.index);
    removeSelectedItem(index);
    renderReservationItems();
    renderDraftReservationSummary();
  });

  container.dataset.listenerAttached = 'true';
}

function setupBarcodeInput() {
  const input = document.getElementById('equipment-barcode');
  if (!input || input.dataset.listenerAttached) return;

  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    addDraftEquipmentByBarcode(input.value, input);
  });

  let autoAddTimer = null;
  const scheduleAutoAdd = () => {
    clearTimeout(autoAddTimer);
    const raw = input.value;
    if (!raw?.trim()) return;
    const { start, end } = getCreateReservationDateRange();
    if (!start || !end) return;
    autoAddTimer = setTimeout(() => {
      addDraftEquipmentByBarcode(raw, input);
    }, 150);
  };

  input.addEventListener('input', scheduleAutoAdd);
  input.addEventListener('change', () => addDraftEquipmentByBarcode(input.value, input));

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
  renderReservationItems();
  renderDraftReservationSummary();
}

if (typeof document !== 'undefined') {
  const handleLanguageRefresh = () => {
    ensureCustomerChoices();
    populateProjectSelect();
    renderDraftReservationSummary();
  };
  document.addEventListener('language:changed', handleLanguageRefresh);
  document.addEventListener('language:translationsReady', handleLanguageRefresh);
}

export { populateEquipmentDescriptionLists, addDraftEquipmentByDescription, renderDraftReservationSummary, renderReservationItems };


if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    applyDarkModeToChoices();
    setTimeout(applyDarkModeToChoices, 300);
  });
}
