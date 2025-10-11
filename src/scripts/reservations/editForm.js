import { loadData } from '../storage.js';
import { t } from '../language.js';
import { showToast, normalizeNumbers } from '../utils.js';
import { groupReservationItems, resolveReservationItemGroupKey, resolveEquipmentIdentifier } from '../reservationsShared.js';
import {
  resolveItemImage,
  findEquipmentByBarcode,
  isEquipmentInMaintenance
} from '../reservationsEquipment.js';
import { renderEditSummary, DEFAULT_COMPANY_SHARE_PERCENT } from '../reservationsSummary.js';
import {
  editReservation,
  setupEditReservationModalEvents,
  getEditingState,
  setEditingState,
  clearEditingState,
  saveReservationChanges
} from '../reservationsEdit.js';
import { normalizeBarcodeValue, combineDateTime, hasEquipmentConflict, hasTechnicianConflict } from './state.js';
import { findEquipmentByDescription, hasExactEquipmentDescription, updatePaymentStatusAppearance, getCompanySharePercent, ensureCompanyShareEnabled } from './createForm.js';

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
  const increaseLabel = t('reservations.equipment.actions.increase', 'زيادة الكمية');
  const decreaseLabel = t('reservations.equipment.actions.decrease', 'تقليل الكمية');
  const removeLabel = t('reservations.equipment.actions.remove', 'إزالة البند');

  if (!items || items.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="text-center">${noItemsMessage}</td></tr>`;
    ensureGroupHandler(container);
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
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${group.key}" aria-label="${decreaseLabel}">−</button>
              <span class="reservation-qty-value">${quantityDisplay}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${group.key}" aria-label="${increaseLabel}">+</button>
            </div>
          </td>
          <td>${unitPriceDisplay}</td>
          <td>${totalPriceDisplay}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${group.key}" aria-label="${removeLabel}">🗑️</button>
          </td>
        </tr>
      `;
    })
    .join('');

  ensureGroupHandler(container);
}

function decreaseEditReservationGroup(groupKey) {
  const { index: editingIndex, items } = getEditingState();
  const groups = groupReservationItems(items);
  const target = groups.find((entry) => entry.key === groupKey);
  if (!target) return;

  const removeIndex = target.itemIndices[target.itemIndices.length - 1];
  if (removeIndex == null) return;

  const nextItems = items.filter((_, idx) => idx !== removeIndex);
  setEditingState(editingIndex, nextItems);
  renderEditReservationItems(nextItems);
  updateEditReservationSummary();
}

function removeEditReservationGroup(groupKey) {
  const { index: editingIndex, items } = getEditingState();
  const filtered = items.filter((item) => resolveReservationItemGroupKey(item) !== groupKey);
  if (filtered.length === items.length) return;
  setEditingState(editingIndex, filtered);
  renderEditReservationItems(filtered);
  updateEditReservationSummary();
}

function increaseEditReservationGroup(groupKey) {
  const { index: editingIndex, items } = getEditingState();
  const groups = groupReservationItems(items);
  const target = groups.find((entry) => entry.key === groupKey);
  if (!target) return;

  const { start, end } = getEditReservationDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireOverallDates', '⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات'));
    return;
  }

  const { reservations = [] } = loadData();
  const currentReservation = editingIndex != null ? reservations[editingIndex] || null : null;
  const ignoreId = currentReservation?.id ?? currentReservation?.reservationId ?? null;

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
    if (isEquipmentInMaintenance(barcodeNormalized)) return false;
    return !hasEquipmentConflict(barcodeNormalized, start, end, ignoreId);
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
  const nextItems = [
    ...items,
    {
      id: equipmentId,
      equipmentId,
      barcode: normalizedCode,
      desc: candidate.desc || candidate.description || candidate.name || target.description || '',
      qty: 1,
      price: Number.isFinite(Number(candidate.price)) ? Number(candidate.price) : target.unitPrice,
      image: resolveItemImage(candidate)
    }
  ];

  setEditingState(editingIndex, nextItems);
  renderEditReservationItems(nextItems);
  updateEditReservationSummary();
}

function ensureGroupHandler(container) {
  if (!container || container.dataset.groupListenerAttached) {
    return;
  }

  container.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const { action, groupKey, itemIndex } = button.dataset;

    if (action === 'decrease-edit-group' && groupKey) {
      decreaseEditReservationGroup(groupKey);
      return;
    }

    if (action === 'increase-edit-group' && groupKey) {
      increaseEditReservationGroup(groupKey);
      return;
    }

    if (action === 'remove-edit-group' && groupKey) {
      removeEditReservationGroup(groupKey);
      return;
    }

    if (action === 'remove-edit-item') {
      const index = Number(itemIndex);
      if (!Number.isNaN(index)) {
        removeEditReservationItem(index);
      }
    }
  });

  container.dataset.groupListenerAttached = 'true';
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
  if (applyTax) {
    ensureCompanyShareEnabled('edit-res-company-share');
  }
  let companySharePercent = getCompanySharePercent('edit-res-company-share');
  if (applyTax && (!Number.isFinite(companySharePercent) || companySharePercent <= 0)) {
    ensureCompanyShareEnabled('edit-res-company-share');
    companySharePercent = getCompanySharePercent('edit-res-company-share');
  }

  const { items: editingItems = [] } = getEditingState();
  const { start, end } = getEditReservationDateRange();

  summaryEl.innerHTML = renderEditSummary({
    items: editingItems,
    discount,
    discountType,
    applyTax,
    paidStatus,
    start,
    end,
    companySharePercent
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

  const resolvedId = resolveEquipmentIdentifier(equipmentItem);
  if (!resolvedId) {
    showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
    return;
  }

  const nextItems = [
    ...currentItems,
    {
      id: resolvedId,
      equipmentId: resolvedId,
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

  const resolvedId = resolveEquipmentIdentifier(equipmentItem);
  if (!resolvedId) {
    showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
    return;
  }

  const nextItems = [
    ...currentItems,
    {
      id: resolvedId,
      equipmentId: resolvedId,
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
