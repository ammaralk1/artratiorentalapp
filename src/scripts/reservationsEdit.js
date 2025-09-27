import { t } from './language.js';
import { loadData } from './storage.js';
import { showToast, normalizeNumbers } from './utils.js';
import { setEditingTechnicians, resetEditingTechnicians, getEditingTechnicians } from './reservationsTechnicians.js';
import { normalizeBarcodeValue, isEquipmentInMaintenance } from './reservationsEquipment.js';
import { calculateReservationTotal } from './reservationsSummary.js';
import {
  getReservationsState,
  updateReservationApi,
  buildReservationPayload,
  refreshReservationsFromApi,
  isApiError,
} from './reservationsService.js';

let editingIndex = null;
let editingItems = [];
let modalInstance = null;
let modalEventsContext = {};

export function getEditingState() {
  return { index: editingIndex, items: editingItems };
}

export function setEditingState(index, items) {
  editingIndex = typeof index === 'number' ? index : null;
  editingItems = Array.isArray(items) ? [...items] : [];
}

export function clearEditingState() {
  editingIndex = null;
  editingItems = [];
  resetEditingTechnicians();
}

function ensureModalInstance(modalElement, factory) {
  if (!modalElement) return null;
  if (typeof factory === 'function') {
    return factory(modalElement);
  }

  if (window?.bootstrap?.Modal) {
    return window.bootstrap.Modal.getOrCreateInstance(modalElement);
  }

  if (typeof bootstrap !== 'undefined' && bootstrap?.Modal) {
    return bootstrap.Modal.getOrCreateInstance(modalElement);
  }

  return null;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function populateEditProjectSelect(projects = [], reservation = null) {
  const select = document.getElementById('edit-res-project');
  if (!select) return;

  const placeholder = t('reservations.create.placeholders.project', 'اختر مشروعاً (اختياري)');
  const orphanLabel = t('reservations.edit.project.missing', '⚠️ المشروع غير متوفر (تم حذفه)');
  const currentValue = reservation?.projectId ? String(reservation.projectId) : '';
  const sorted = Array.isArray(projects)
    ? [...projects].sort((a, b) => String(b.createdAt || b.start || '').localeCompare(String(a.createdAt || a.start || '')))
    : [];

  const options = [`<option value="">${escapeHtml(placeholder)}</option>`];

  sorted.forEach((project) => {
    options.push(`<option value="${escapeHtml(project.id)}">${escapeHtml(project.title || placeholder)}</option>`);
  });

  if (currentValue && !sorted.some((project) => String(project.id) === currentValue)) {
    options.push(`<option value="${escapeHtml(currentValue)}">${escapeHtml(orphanLabel)}</option>`);
  }

  select.innerHTML = options.join('');
  if (currentValue) {
    select.value = currentValue;
  } else {
    select.value = '';
  }
}

function updateEditProjectTaxState() {
  const projectSelect = document.getElementById('edit-res-project');
  const taxCheckbox = document.getElementById('edit-res-tax');
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

export function editReservation(index, {
  populateEquipmentDescriptionLists,
  setFlatpickrValue,
  splitDateTime,
  renderEditItems,
  updateEditReservationSummary,
  ensureModal
} = {}) {
  const { customers, projects } = loadData();
  const reservations = getReservationsState();
  const reservation = reservations?.[index];

  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return;
  }

  populateEquipmentDescriptionLists?.();
  populateEditProjectSelect(projects || [], reservation);

  const normalizedItems = reservation.items
    ? reservation.items.map(item => ({
        ...item,
        equipmentId: item.equipmentId ?? item.equipment_id ?? item.id,
        barcode: normalizeBarcodeValue(item?.barcode)
      }))
    : [];

  setEditingState(index, normalizedItems);

  const unknownCustomer = t('reservations.list.unknownCustomer', 'غير معروف');
  const customer = customers?.find?.((c) => String(c.id) === String(reservation.customerId));

  document.getElementById('edit-res-index')?.setAttribute('value', String(index));

  const idInput = document.getElementById('edit-res-id');
  if (idInput) idInput.value = reservation.reservationId || reservation.id;

  const customerInput = document.getElementById('edit-res-customer');
  if (customerInput) customerInput.value = customer?.customerName || unknownCustomer;

  const splitStart = typeof splitDateTime === 'function' ? splitDateTime(reservation.start) : { date: '', time: '' };
  const splitEnd = typeof splitDateTime === 'function' ? splitDateTime(reservation.end) : { date: '', time: '' };

  setFlatpickrValue?.('edit-res-start', splitStart.date);
  setFlatpickrValue?.('edit-res-start-time', splitStart.time);
  setFlatpickrValue?.('edit-res-end', splitEnd.date);
  setFlatpickrValue?.('edit-res-end-time', splitEnd.time);

  const notesInput = document.getElementById('edit-res-notes');
  if (notesInput) notesInput.value = reservation.notes || '';

  const discountInput = document.getElementById('edit-res-discount');
  if (discountInput) discountInput.value = normalizeNumbers(reservation.discount ?? 0);

  const discountTypeSelect = document.getElementById('edit-res-discount-type');
  if (discountTypeSelect) discountTypeSelect.value = reservation.discountType || 'percent';

  const taxCheckbox = document.getElementById('edit-res-tax');
  if (taxCheckbox) taxCheckbox.checked = reservation.projectId ? false : !!reservation.applyTax;

  const confirmedCheckbox = document.getElementById('edit-res-confirmed');
  if (confirmedCheckbox) confirmedCheckbox.checked = reservation.confirmed === true || reservation.confirmed === 'true';

  const paidSelect = document.getElementById('edit-res-paid');
  if (paidSelect) paidSelect.value = reservation.paid === true || reservation.paid === 'paid' ? 'paid' : 'unpaid';

  setEditingTechnicians((reservation.technicians || []).map((id) => String(id)));

  renderEditItems?.(normalizedItems);
  updateEditProjectTaxState();
  updateEditReservationSummary?.();

  const modalElement = document.getElementById('editReservationModal');
  modalInstance = ensureModalInstance(modalElement, ensureModal);
  modalInstance?.show?.();
}

export async function saveReservationChanges({
  combineDateTime,
  hasEquipmentConflict,
  hasTechnicianConflict,
  updateEditReservationSummary,
  renderReservations,
  populateEquipmentDescriptionLists,
  handleReservationsMutation
} = {}) {
  if (editingIndex === null) {
    console.warn('⚠️ [reservationsEdit.js] No reservation selected for editing');
    return;
  }

  const startDate = document.getElementById('edit-res-start')?.value?.trim();
  const startTime = document.getElementById('edit-res-start-time')?.value?.trim() || '00:00';
  const endDate = document.getElementById('edit-res-end')?.value?.trim();
  const endTime = document.getElementById('edit-res-end-time')?.value?.trim() || '00:00';
  const notes = document.getElementById('edit-res-notes')?.value || '';
  const discountRaw = normalizeNumbers(document.getElementById('edit-res-discount')?.value || '0');
  const discount = parseFloat(discountRaw) || 0;
  const discountType = document.getElementById('edit-res-discount-type')?.value || 'percent';
  const confirmed = document.getElementById('edit-res-confirmed')?.checked || false;
  const paidStatus = document.getElementById('edit-res-paid')?.value || 'unpaid';
  const projectIdValue = document.getElementById('edit-res-project')?.value || '';
  const technicianIds = getEditingTechnicians();

  if (!startDate || !endDate) {
    showToast(t('reservations.toast.requireDates', '⚠️ يرجى تحديد تاريخ البداية والنهاية'));
    return;
  }

  const combine = typeof combineDateTime === 'function'
    ? combineDateTime
    : (date, time) => `${date}T${time || '00:00'}`;

  const start = combine(startDate, startTime);
  const end = combine(endDate, endTime);

  if (start && end && new Date(start) > new Date(end)) {
    showToast(t('reservations.toast.invalidDateOrder', '⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية'));
    return;
  }

  const reservations = getReservationsState();
  const reservation = reservations?.[editingIndex];
  if (!reservation) {
    showToast(t('reservations.toast.reservationMissing', '⚠️ تعذر العثور على الحجز المطلوب'));
    return;
  }

  if (!Array.isArray(editingItems) || editingItems.length === 0) {
    showToast(t('reservations.toast.updateNoItems', '⚠️ لا يمكن حفظ التعديلات لعدم وجود معدات'));
    return;
  }

  for (const item of editingItems) {
    if (isEquipmentInMaintenance(item.barcode)) {
      showToast(t('reservations.toast.updateEquipmentMaintenance', '⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة'));
      return;
    }
  }

  const hasEquipmentConflictFn = typeof hasEquipmentConflict === 'function'
    ? hasEquipmentConflict
    : () => false;

  for (const item of editingItems) {
    const code = normalizeBarcodeValue(item.barcode);
    if (hasEquipmentConflictFn(code, start, end, reservation.id ?? reservation.reservationId)) {
      showToast(t('reservations.toast.updateEquipmentConflict', '⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات'));
      return;
    }
  }

  const hasTechnicianConflictFn = typeof hasTechnicianConflict === 'function'
    ? hasTechnicianConflict
    : () => false;

  for (const technicianId of technicianIds) {
    if (hasTechnicianConflictFn(technicianId, start, end, reservation.id ?? reservation.reservationId)) {
      showToast(t('reservations.toast.updateCrewConflict', '⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم'));
      return;
    }
  }

  const taxCheckbox = document.getElementById('edit-res-tax');
  const projectLinked = Boolean(projectIdValue);
  const applyTax = projectLinked ? false : (taxCheckbox?.checked || false);

  const totalAmount = calculateReservationTotal(
    editingItems,
    discount,
    discountType,
    applyTax,
    technicianIds,
    { start, end }
  );

  const payload = buildReservationPayload({
    reservationCode: reservation.reservationCode ?? reservation.reservationId ?? null,
    customerId: reservation.customerId,
    start,
    end,
    status: reservation.status ?? (confirmed ? 'confirmed' : 'pending'),
    title: reservation.title ?? null,
    location: reservation.location ?? null,
    notes,
    projectId: projectIdValue ? String(projectIdValue) : null,
    totalAmount,
    discount,
    discountType,
    applyTax,
    paidStatus,
    confirmed,
    items: editingItems.map((item) => ({
      ...item,
      equipmentId: item.equipmentId ?? item.id,
    })),
    technicians: technicianIds,
  });

  try {
    const updatedReservation = await updateReservationApi(reservation.id || reservation.reservationId, payload);
    await refreshReservationsFromApi();
    showToast(t('reservations.toast.updated', '✅ تم حفظ التعديلات على الحجز'));

    updateEditReservationSummary?.();
    clearEditingState();
    handleReservationsMutation?.({ type: 'updated', reservation: updatedReservation });
    renderReservations?.();
    populateEquipmentDescriptionLists?.();

    modalInstance?.hide?.();
  } catch (error) {
    console.error('❌ [reservationsEdit] Failed to update reservation', error);
    const message = isApiError(error)
      ? error.message
      : t('reservations.toast.updateFailed', 'تعذر تحديث بيانات الحجز');
    showToast(message, 'error');
  }
}

export function setupEditReservationModalEvents(context = {}) {
  modalEventsContext = { ...context };

  const { updateEditReservationSummary, addEquipmentToEditingReservation, addEquipmentByDescription, renderEditItems } = modalEventsContext;

  const discountInput = document.getElementById('edit-res-discount');
  if (discountInput && !discountInput.dataset.listenerAttached) {
    discountInput.addEventListener('input', () => {
      discountInput.value = normalizeNumbers(discountInput.value);
      updateEditReservationSummary?.();
    });
    discountInput.dataset.listenerAttached = 'true';
  }

  const discountTypeSelect = document.getElementById('edit-res-discount-type');
  if (discountTypeSelect && !discountTypeSelect.dataset.listenerAttached) {
    discountTypeSelect.addEventListener('change', () => updateEditReservationSummary?.());
    discountTypeSelect.dataset.listenerAttached = 'true';
  }

  const taxCheckbox = document.getElementById('edit-res-tax');
  if (taxCheckbox && !taxCheckbox.dataset.listenerAttached) {
    taxCheckbox.addEventListener('change', () => updateEditReservationSummary?.());
    taxCheckbox.dataset.listenerAttached = 'true';
  }

  const projectSelect = document.getElementById('edit-res-project');
  if (projectSelect && !projectSelect.dataset.listenerAttached) {
    projectSelect.addEventListener('change', () => {
      updateEditProjectTaxState();
      updateEditReservationSummary?.();
    });
    projectSelect.dataset.listenerAttached = 'true';
  }

  const saveBtn = document.getElementById('save-reservation-changes');
  if (saveBtn && !saveBtn.dataset.listenerAttached) {
    saveBtn.addEventListener('click', () => {
      saveReservationChanges(modalEventsContext).catch((error) => {
        console.error('❌ [reservationsEdit] saveReservationChanges failed', error);
      });
    });
    saveBtn.dataset.listenerAttached = 'true';
  }

  const barcodeInput = document.getElementById('edit-res-equipment-barcode');
  if (barcodeInput && !barcodeInput.dataset.listenerAttached) {
    barcodeInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addEquipmentToEditingReservation?.(barcodeInput);
      }
    });
    barcodeInput.dataset.listenerAttached = 'true';
  }

  const descriptionInput = document.getElementById('edit-res-equipment-description');
  if (descriptionInput && !descriptionInput.dataset.listenerAttached) {
    descriptionInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addEquipmentByDescription?.(descriptionInput, 'edit');
      }
    });
    descriptionInput.dataset.listenerAttached = 'true';
  }

  const modalElement = document.getElementById('editReservationModal');
  if (modalElement && !modalElement.dataset.cleanupAttached) {
    modalElement.addEventListener('hidden.bs.modal', () => {
      clearEditingState();
      updateEditReservationSummary?.();
      renderEditItems?.([]);
    });
    modalElement.dataset.cleanupAttached = 'true';
  }
}
