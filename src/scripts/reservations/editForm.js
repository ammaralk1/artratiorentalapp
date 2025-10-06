import { loadData } from '../storage.js';
import { t } from '../language.js';
import { showToast, normalizeNumbers } from '../utils.js';
import {
  resolveItemImage,
  findEquipmentByBarcode,
  isEquipmentInMaintenance
} from '../reservationsEquipment.js';
import { renderEditSummary } from '../reservationsSummary.js';
import {
  editReservation,
  setupEditReservationModalEvents,
  getEditingState,
  setEditingState,
  clearEditingState,
  saveReservationChanges
} from '../reservationsEdit.js';
import { normalizeBarcodeValue, combineDateTime, hasEquipmentConflict, hasTechnicianConflict } from './state.js';
import { findEquipmentByDescription, hasExactEquipmentDescription, updatePaymentStatusAppearance } from './createForm.js';

export function getEditReservationDateRange() {
  const startDate = document.getElementById('edit-res-start')?.value?.trim();
  const endDate = document.getElementById('edit-res-end')?.value?.trim();
  const startTime = document.getElementById('edit-res-start-time')?.value?.trim() || '00:00';
  const endTime = document.getElementById('edit-res-end-time')?.value?.trim() || '00:00';

  if (!startDate || !endDate) return { start: null, end: null };

  return {
    start: combineDateTime(startDate, startTime),
    end: combineDateTime(endDate, endTime)
  };
}

export function renderEditReservationItems(items = []) {
  const container = document.getElementById('edit-res-items');
  if (!container) return;

  const noItemsMessage = t('reservations.create.equipment.none', 'لا توجد معدات');
  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const imageAlt = t('reservations.create.equipment.imageAlt', 'صورة');

  if (!items || items.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="text-center">${noItemsMessage}</td></tr>`;
    ensureRemoveHandler(container);
    return;
  }

  container.innerHTML = items
    .map((item, index) => {
      const image = resolveItemImage(item);
      const priceDisplay = `${normalizeNumbers(String(item.price ?? 0))} ${currencyLabel}`;
      const qtyDisplay = normalizeNumbers(String(item.qty || 1));
      const imageCell = image
        ? `<img src="${image}" alt="${imageAlt}" class="reservation-item-thumb">`
        : '-';
      return `
        <tr>
          <td>${item.barcode || '-'}</td>
          <td>${item.desc || '-'}</td>
          <td>${priceDisplay}</td>
          <td>${qtyDisplay}</td>
          <td>${imageCell}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-edit-item" data-item-index="${index}">🗑️</button></td>
        </tr>
      `;
    })
    .join('');

  ensureRemoveHandler(container);
}

function ensureRemoveHandler(container) {
  if (!container || container.dataset.removeListenerAttached) {
    return;
  }

  container.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-action="remove-edit-item"]');
    if (!trigger) {
      return;
    }

    event.preventDefault();
    const index = Number(trigger.dataset.itemIndex);
    if (!Number.isNaN(index)) {
      removeEditReservationItem(index);
    }
  });

  container.dataset.removeListenerAttached = 'true';
}

export function updateEditReservationSummary() {
  const summaryEl = document.getElementById('edit-res-summary');
  if (!summaryEl) return;

  const discountInput = document.getElementById('edit-res-discount');
  const discountTypeSelect = document.getElementById('edit-res-discount-type');
  const paidSelect = document.getElementById('edit-res-paid');
  if (paidSelect && !paidSelect.dataset.listenerAttached) {
    paidSelect.addEventListener('change', updateEditReservationSummary);
    paidSelect.dataset.listenerAttached = 'true';
  }

  updatePaymentStatusAppearance(paidSelect);

  const rawDiscount = normalizeNumbers(discountInput?.value || '0');
  if (discountInput) discountInput.value = rawDiscount;

  const discount = parseFloat(rawDiscount) || 0;
  const discountType = discountTypeSelect?.value || 'percent';
  const projectLinked = Boolean(document.getElementById('edit-res-project')?.value);
  const taxCheckbox = document.getElementById('edit-res-tax');
  const applyTax = projectLinked ? false : (taxCheckbox?.checked || false);
  const paidStatus = paidSelect?.value || 'unpaid';
  updatePaymentStatusAppearance(paidSelect, paidStatus);

  const { items: editingItems = [] } = getEditingState();
  const { start, end } = getEditReservationDateRange();

  summaryEl.innerHTML = renderEditSummary({
    items: editingItems,
    discount,
    discountType,
    applyTax,
    paidStatus,
    start,
    end
  });
}

export function removeEditReservationItem(index) {
  if (index == null) return;
  const { index: editingIndex, items } = getEditingState();
  if (!Array.isArray(items)) return;

  const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
  setEditingState(editingIndex, nextItems);
  renderEditReservationItems(nextItems);
  updateEditReservationSummary();
}

export function addEquipmentToEditingReservation(barcodeInput) {
  const rawCode = barcodeInput?.value ?? '';
  const code = normalizeBarcodeValue(rawCode);
  if (!code) return;

  const equipmentItem = findEquipmentByBarcode(code);
  if (!equipmentItem) {
    showToast(t('reservations.toast.barcodeNotInCatalog', '❌ الباركود غير موجود ضمن المعدات'));
    return;
  }

  if (isEquipmentInMaintenance(code)) {
    showToast(t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً'));
    return;
  }

  const normalizedCode = normalizeBarcodeValue(code);
  const { index: editingIndex, items: currentItems = [] } = getEditingState();
  const existingIndex = currentItems.findIndex((item) => normalizeBarcodeValue(item.barcode) === normalizedCode);

  if (existingIndex > -1) {
    showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
    return;
  }

  const { start, end } = getEditReservationDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
    return;
  }

  const { reservations = [] } = loadData();
  const currentReservation = editingIndex != null ? reservations[editingIndex] || null : null;
  const ignoreId = currentReservation?.id ?? currentReservation?.reservationId ?? null;

  if (hasEquipmentConflict(normalizedCode, start, end, ignoreId)) {
    showToast(t('reservations.toast.equipmentTimeConflictSimple', '⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية'));
    return;
  }

  const nextItems = [
    ...currentItems,
    {
      id: equipmentItem.id,
      equipmentId: equipmentItem.id,
      barcode: normalizedCode,
      desc: equipmentItem.desc,
      qty: 1,
      price: equipmentItem.price,
      image: equipmentItem.image || equipmentItem.imageUrl || equipmentItem.img || null
    }
  ];

  setEditingState(editingIndex, nextItems);

  if (barcodeInput) barcodeInput.value = '';
  renderEditReservationItems(nextItems);
  updateEditReservationSummary();
}

export function addEquipmentToEditingByDescription(inputElement) {
  if (!inputElement) return;
  const rawValue = inputElement.value.trim();
  if (!rawValue) return;

  const equipmentItem = findEquipmentByDescription(rawValue);
  const normalizedCode = normalizeBarcodeValue(equipmentItem?.barcode || rawValue);
  if (!equipmentItem || !normalizedCode) {
    showToast(t('reservations.toast.equipmentNameNotFound', '❌ لم يتم العثور على معدة بالاسم المدخل'));
    return;
  }

  if (isEquipmentInMaintenance(normalizedCode)) {
    showToast(t('reservations.toast.equipmentMaintenanceStrict', '⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز'));
    return;
  }

  const { start, end } = getEditReservationDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireOverallDates', '⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات'));
    return;
  }

  const { index: editingIndex, items: currentItems = [] } = getEditingState();
  const duplicate = currentItems.some((item) => normalizeBarcodeValue(item.barcode) === normalizedCode);
  if (duplicate) {
    showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
    return;
  }

  const { reservations = [] } = loadData();
  const currentReservation = editingIndex != null ? reservations[editingIndex] || null : null;
  const ignoreId = currentReservation?.id ?? currentReservation?.reservationId ?? null;

  if (hasEquipmentConflict(normalizedCode, start, end, ignoreId)) {
    showToast(t('reservations.toast.equipmentTimeConflictSimple', '⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية'));
    return;
  }

  const nextItems = [
    ...currentItems,
    {
      id: equipmentItem.id,
      equipmentId: equipmentItem.id,
      barcode: normalizedCode,
      desc: equipmentItem.desc,
      qty: 1,
      price: equipmentItem.price,
      image: equipmentItem.image || equipmentItem.imageUrl || equipmentItem.img || null
    }
  ];

  setEditingState(editingIndex, nextItems);
  renderEditReservationItems(nextItems);
  updateEditReservationSummary();
  inputElement.value = '';
}

export function setupEditEquipmentDescriptionInput() {
  const editInput = document.getElementById('edit-res-equipment-description');
  if (editInput && !editInput.dataset.listenerAttached) {
    editInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addEquipmentToEditingByDescription(editInput);
      }
    });
    const tryAutoAdd = () => {
      if (hasExactEquipmentDescription(editInput.value, 'edit-res-equipment-description-options')) {
        addEquipmentToEditingByDescription(editInput);
      }
    };
    editInput.addEventListener('input', tryAutoAdd);
    editInput.addEventListener('change', tryAutoAdd);
    editInput.dataset.listenerAttached = 'true';
  }
}

export function getEditContext() {
  return {
    populateEquipmentDescriptionLists,
    setFlatpickrValue,
    splitDateTime,
    renderEditItems: renderEditReservationItems,
    updateEditReservationSummary,
    addEquipmentByDescription: addEquipmentToEditingByDescription,
    addEquipmentToEditingReservation,
    combineDateTime,
    hasEquipmentConflict,
    hasTechnicianConflict,
    renderReservations,
    handleReservationsMutation,
    ensureModal: getBootstrapModalInstance
  };
}

if (typeof document !== 'undefined') {
  document.addEventListener('language:changed', () => {
    updateEditReservationSummary();
  });
}
