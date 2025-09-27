import { loadData } from '../storage.js';
import { showToast, generateReservationId, normalizeNumbers } from '../utils.js';
import { t } from '../language.js';
import { resolveItemImage, getEquipmentRecordByBarcode, isEquipmentInMaintenance, findEquipmentByBarcode } from '../reservationsEquipment.js';
import { getSelectedTechnicians, resetSelectedTechnicians } from '../reservationsTechnicians.js';
import { calculateReservationTotal, renderDraftSummary } from '../reservationsSummary.js';
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
import {
  createReservationApi,
  buildReservationPayload,
  isApiError,
} from '../reservationsService.js';

let afterSubmitCallback = null;
let cachedProjects = [];

const PENDING_RESERVATION_PROJECT_KEY = 'pendingReservationProjectContext';

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

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function setDateTimeInputs(dateInputId, timeInputId, isoString) {
  if (!isoString) return;
  const { date, time } = splitDateTime(isoString);
  const dateInput = document.getElementById(dateInputId);
  const timeInput = document.getElementById(timeInputId);
  if (dateInput && date) {
    dateInput.value = date;
    dateInput.dispatchEvent(new Event('input'));
    dateInput.dispatchEvent(new Event('change'));
  }
  if (timeInput && time) {
    timeInput.value = time;
    timeInput.dispatchEvent(new Event('input'));
    timeInput.dispatchEvent(new Event('change'));
  }
}

function applyProjectContextToForm(project, { forceNotes = false } = {}) {
  if (!project) return;

  const customers = getCachedCustomers() || [];
  const projectCustomer = customers.find((c) => String(c.id) === String(project.clientId));
  const customerInput = document.getElementById('res-customer');
  if (customerInput && projectCustomer?.customerName) {
    customerInput.value = projectCustomer.customerName;
  }

  if (project.start) {
    setDateTimeInputs('res-start', 'res-start-time', project.start);
  }

  if (project.end) {
    setDateTimeInputs('res-end', 'res-end-time', project.end);
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

  const previousValue = preselectId != null ? String(preselectId) : select.value;
  const placeholderLabel = t('reservations.create.placeholders.project', 'اختر مشروعاً (اختياري)');

  const sortedProjects = [...list].sort((a, b) => String(b.createdAt || b.start || '').localeCompare(String(a.createdAt || a.start || '')));

  const optionsHtml = [`<option value="">${escapeHtml(placeholderLabel)}</option>`]
    .concat(
      sortedProjects
        .map((project) => `<option value="${escapeHtml(project.id)}">${escapeHtml(project.title || placeholderLabel)}</option>`)
    )
    .join('');

  select.innerHTML = optionsHtml;
  if (previousValue && list.some((proj) => String(proj.id) === previousValue)) {
    select.value = previousValue;
  } else if (preselectId != null) {
    select.value = String(preselectId);
  } else {
    select.value = '';
  }

  updateCreateProjectTaxState();
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
    const project = findProjectById(select.value);
    if (project) {
      applyProjectContextToForm(project);
    } else {
      updateCreateProjectTaxState();
      renderDraftReservationSummary();
    }
  });
  select.dataset.listenerAttached = 'true';
}

function applyPendingProjectContext() {
  try {
    const stored = localStorage.getItem(PENDING_RESERVATION_PROJECT_KEY);
    if (!stored) return;
    const context = JSON.parse(stored);
    localStorage.removeItem(PENDING_RESERVATION_PROJECT_KEY);
    if (!context || !context.projectId) return;
    const select = document.getElementById('res-project');
    if (select) {
      select.value = String(context.projectId);
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
      if (projectCustomer?.customerName) {
        const customerInput = document.getElementById('res-customer');
        if (customerInput) customerInput.value = projectCustomer.customerName;
      }
    }
  } catch (error) {
    console.warn('⚠️ [reservations/createForm] Failed to apply pending project context', error);
    localStorage.removeItem(PENDING_RESERVATION_PROJECT_KEY);
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
  return equipment.find((item) => {
    const descriptionText = normalizeText(item?.desc || item?.description || '');
    return descriptionText.includes(normalizedTerm);
  }) || null;
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
          <td><button type="button" class="btn btn-sm btn-danger" data-action="remove-item" data-index="${index}">🗑️</button></td>
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

  renderDraftSummary({
    selectedItems: getSelectedItems(),
    discount,
    discountType,
    applyTax,
    paidStatus,
    start,
    end
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

  const paymentSelect = document.getElementById('res-payment-status');
  if (paymentSelect && !paymentSelect.dataset.listenerAttached) {
    paymentSelect.addEventListener('change', renderDraftReservationSummary);
    paymentSelect.dataset.listenerAttached = 'true';
  }
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
  const inputValue = document.getElementById('res-customer').value.trim().toLowerCase();
  const projectSelect = document.getElementById('res-project');
  const projectIdValue = projectSelect?.value ? String(projectSelect.value) : '';
  const { customers } = loadData();

  let customer = customers.find((c) => c.customerName?.trim().toLowerCase() === inputValue);

  if (!customer) {
    customer = customers.find((c) => c.customerName?.toLowerCase().includes(inputValue));
  }

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

  const draftItems = getSelectedItems();
  if (draftItems.length === 0) {
    showToast(t('reservations.toast.noItems', '⚠️ لا يمكنك إنشاء حجز بدون معدات'));
    return;
  }

  const notes = document.getElementById('res-notes')?.value || '';
  const discount = parseFloat(normalizeNumbers(document.getElementById('res-discount')?.value)) || 0;
  const discountType = document.getElementById('res-discount-type')?.value || 'percent';
  const paidStatus = document.getElementById('res-payment-status')?.value || 'unpaid';

  const technicianIds = getSelectedTechnicians();

  const selectedProject = projectIdValue ? findProjectById(projectIdValue) : null;
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
    status: 'pending',
    title: null,
    location: null,
    notes,
    projectId: projectIdValue || null,
    totalAmount: totalCost,
    discount,
    discountType,
    applyTax,
    paidStatus,
    confirmed: false,
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
  document.getElementById('res-customer').value = '';
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
  const projectSelect = document.getElementById('res-project');
  if (projectSelect) projectSelect.value = '';
  const descriptionInput = document.getElementById('equipment-description');
  if (descriptionInput) descriptionInput.value = '';
  const paymentSelect = document.getElementById('res-payment-status');
  if (paymentSelect) paymentSelect.value = 'unpaid';
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
    const code = normalizeBarcodeValue(input.value);
    if (!code) return;

    const { start, end } = getCreateReservationDateRange();
    if (!start || !end) {
      showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
      return;
    }

    const currentItems = getSelectedItems();
    const duplicate = currentItems.some((item) => normalizeBarcodeValue(item.barcode) === code);
    if (duplicate) {
      showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
      return;
    }

    if (hasEquipmentConflict(code, start, end)) {
      showToast(t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية'));
      return;
    }

    const { equipment } = loadData();
    const item = (equipment || []).find((eq) => normalizeBarcodeValue(eq.barcode) === code);
    if (!item) {
      showToast(t('reservations.toast.barcodeNotFound', '❌ الباركود غير موجود'));
      return;
    }

    if (isEquipmentInMaintenance(item.barcode)) {
      showToast(t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً'));
      return;
    }

    addSelectedItem({
      id: item.id,
      equipmentId: item.id,
      barcode: normalizeBarcodeValue(item.barcode),
      desc: item.desc,
      qty: 1,
      price: item.price,
      image: resolveItemImage(item)
    });

    input.value = '';
    renderReservationItems();
    renderDraftReservationSummary();
    showToast(t('reservations.toast.equipmentAdded', '✅ تم إضافة المعدة بنجاح'));
  });

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

function setupCustomerAutocomplete() {
  const input = document.getElementById('res-customer');
  const suggestionsBox = document.getElementById('customer-suggestions');
  if (!input || !suggestionsBox) return;

  const renderSuggestions = (items) => {
    if (!items || items.length === 0) {
      suggestionsBox.style.display = 'none';
      suggestionsBox.innerHTML = '';
      return;
    }

    suggestionsBox.innerHTML = items
      .map((name) => `<div class="suggestion-item" data-name="${name}">${name}</div>`)
      .join('');
    suggestionsBox.style.display = 'block';

    suggestionsBox.querySelectorAll('.suggestion-item').forEach((item) => {
      item.addEventListener('mousedown', (event) => {
        event.preventDefault();
        const selectedName = event.target.getAttribute('data-name');
        input.value = selectedName;
        suggestionsBox.style.display = 'none';
      });
    });
  };

  const getUniqueNames = () => {
    const customers = getCachedCustomers() || [];
    return [...new Set(customers.map((c) => c.customerName).filter(Boolean))];
  };

  const updateSuggestions = () => {
    const value = normalizeText(input.value);
    const names = getUniqueNames();
    const matches = !value
      ? names.slice(0, 10)
      : names.filter((name) => normalizeText(name).startsWith(value)).slice(0, 10);
    renderSuggestions(matches);
  };

  input.addEventListener('input', () => {
    updateSuggestions();
  });

  input.addEventListener('focus', () => {
    updateSuggestions();
  });

  input.addEventListener('blur', () => {
    setTimeout(() => {
      suggestionsBox.style.display = 'none';
    }, 150);
  });
}

export function initCreateReservationForm({ onAfterSubmit } = {}) {
  afterSubmitCallback = typeof onAfterSubmit === 'function' ? onAfterSubmit : null;

  const { customers, projects } = loadData();
  setCachedCustomers(customers || []);
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
  setupCustomerAutocomplete();
  applyPendingProjectContext();
  renderDraftReservationSummary();
  renderReservationItems();
}

export function refreshCreateReservationForm() {
  populateEquipmentDescriptionLists();
  populateProjectSelect();
  renderReservationItems();
  renderDraftReservationSummary();
}

if (typeof document !== 'undefined') {
  const refreshProjectOptions = () => populateProjectSelect();
  document.addEventListener('language:changed', refreshProjectOptions);
  document.addEventListener('language:translationsReady', refreshProjectOptions, { once: false });
}

export { populateEquipmentDescriptionLists, addDraftEquipmentByDescription, renderDraftReservationSummary, renderReservationItems };
