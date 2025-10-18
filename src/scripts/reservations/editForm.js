import { loadData } from '../storage.js';
import { t } from '../language.js';
import { showToast, normalizeNumbers, formatDateTime } from '../utils.js';
import { groupReservationItems, resolveReservationItemGroupKey, resolveEquipmentIdentifier } from '../reservationsShared.js';
import {
  resolveItemImage,
  findEquipmentByBarcode,
  getEquipmentAvailabilityStatus,
  isEquipmentUnavailable,
  isEquipmentAvailable
} from '../reservationsEquipment.js';
import { renderEditSummary, DEFAULT_COMPANY_SHARE_PERCENT } from '../reservationsSummary.js';
import {
  editReservation,
  setupEditReservationModalEvents,
  getEditingState,
  setEditingState,
  clearEditingState,
  saveReservationChanges,
  getEditingPayments,
  addEditingPayment,
  removeEditingPayment,
  setEditingPayments,
  getEditPaymentProgressType,
  parseEditPaymentProgressValue,
} from '../reservationsEdit.js';
import { normalizeBarcodeValue, combineDateTime, hasEquipmentConflict, hasTechnicianConflict } from './state.js';
import {
  findEquipmentByDescription,
  hasExactEquipmentDescription,
  updatePaymentStatusAppearance,
  getCompanySharePercent,
  ensureCompanyShareEnabled,
  getEquipmentUnavailableMessage
} from './createForm.js';

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
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
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

function formatPaymentTypeLabel(type) {
  switch (type) {
    case 'amount':
      return t('reservations.paymentHistory.type.amount', '💵 دفعة مالية');
    case 'percent':
      return t('reservations.paymentHistory.type.percent', '٪ دفعة نسبة');
    default:
      return t('reservations.paymentHistory.type.unknown', 'دفعة');
  }
}

function renderEditPaymentHistory() {
  const container = document.getElementById('edit-res-payment-history');
  if (!container) return;

  const payments = getEditingPayments();
  if (!Array.isArray(payments) || payments.length === 0) {
    container.innerHTML = `<div class="reservation-payment-history__empty">${t('reservations.paymentHistory.empty', 'لا توجد دفعات مسجلة لهذا الحجز')}</div>`;
    setupPaymentHistoryEvents();
    return;
  }

  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const rows = payments.map((payment, index) => {
    const amountDisplay = Number.isFinite(Number(payment?.amount)) && Number(payment.amount) > 0
      ? `${normalizeNumbers(Number(payment.amount).toFixed(2))} ${currencyLabel}`
      : '—';
    const percentDisplay = Number.isFinite(Number(payment?.percentage)) && Number(payment.percentage) > 0
      ? `${normalizeNumbers(Number(payment.percentage).toFixed(2))}%`
      : '—';
    const recordedAt = payment?.recordedAt ? normalizeNumbers(formatDateTime(payment.recordedAt)) : '—';
    const typeLabel = formatPaymentTypeLabel(payment?.type);
    const noteDisplay = payment?.note ? normalizeNumbers(payment.note) : '';

    return `
      <tr>
        <td>${typeLabel}</td>
        <td>${amountDisplay}</td>
        <td>${percentDisplay}</td>
        <td>${recordedAt}</td>
        <td>${noteDisplay}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${index}" aria-label="${t('reservations.paymentHistory.actions.delete', 'حذف الدفعة')}">🗑️</button>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <div class="reservation-payment-history__table-wrapper">
      <table class="table table-sm reservation-payment-history__table">
        <thead>
          <tr>
            <th>${t('reservations.paymentHistory.headers.method', 'نوع الدفعة')}</th>
            <th>${t('reservations.paymentHistory.headers.amount', 'المبلغ')}</th>
            <th>${t('reservations.paymentHistory.headers.percent', 'النسبة')}</th>
            <th>${t('reservations.paymentHistory.headers.date', 'التاريخ')}</th>
            <th>${t('reservations.paymentHistory.headers.note', 'ملاحظات')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  setupPaymentHistoryEvents();
}

function handleAddPaymentHistoryEntry() {
  const typeSelect = document.getElementById('edit-res-payment-progress-type');
  const valueInput = document.getElementById('edit-res-payment-progress-value');
  const type = getEditPaymentProgressType(typeSelect);
  let value = parseEditPaymentProgressValue(valueInput);
  if (!Number.isFinite(value) || value <= 0) {
    showToast(t('reservations.toast.paymentInvalid', '⚠️ يرجى إدخال قيمة دفعة صحيحة'));
    return;
  }

  const summarySnapshot = renderEditSummary.lastResult;
  const total = Number(summarySnapshot?.total) || 0;
  const alreadyPaidPercent = Number(summarySnapshot?.paidPercent) || 0;
  const alreadyPaidAmount = Number(summarySnapshot?.paidAmount) || 0;
  const currencyLabel = t('reservations.create.summary.currency', 'SR');

  let amount = null;
  let percentage = null;

  if (type === 'percent') {
    const remainingPercent = Math.max(0, 100 - alreadyPaidPercent);
    if (remainingPercent <= 0.0001) {
      showToast(t('reservations.toast.paymentNoRemainingBalance', '⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة'));
      return;
    }

    const cappedPercent = Math.min(value, remainingPercent);
    if (cappedPercent !== value) {
      const formattedPercent = normalizeNumbers(cappedPercent.toFixed(2));
      showToast(
        t('reservations.toast.paymentCappedPercent', 'ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%').replace('{value}', formattedPercent)
      );
      value = cappedPercent;
    }

    percentage = Number(value.toFixed(2));
    if (total > 0) {
      amount = (value / 100) * total;
    }
  } else {
    const remainingAmount = Math.max(0, total - alreadyPaidAmount);
    if (remainingAmount <= 0.0001) {
      showToast(t('reservations.toast.paymentNoRemainingBalance', '⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة'));
      return;
    }

    const cappedAmount = Math.min(value, remainingAmount);
    if (cappedAmount !== value) {
      const formattedAmount = `${normalizeNumbers(cappedAmount.toFixed(2))} ${currencyLabel}`;
      showToast(
        t('reservations.toast.paymentCappedAmount', 'ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي').replace('{amount}', formattedAmount)
      );
      value = cappedAmount;
    }

    amount = Number(value.toFixed(2));
    if (total > 0) {
      percentage = (amount / total) * 100;
    }
  }

  if (amount != null) {
    amount = Number(amount.toFixed(2));
  }
  if (percentage != null) {
    percentage = Number(percentage.toFixed(2));
  }

  const entry = {
    type,
    value,
    amount,
    percentage,
    recordedAt: new Date().toISOString(),
  };

  addEditingPayment(entry);
  setEditingPayments(getEditingPayments());
  renderEditPaymentHistory();
  updateEditReservationSummary();

  if (valueInput) {
    valueInput.value = '';
  }

  if (typeSelect) {
    typeSelect.value = 'percent';
    if (typeSelect.dataset) {
      delete typeSelect.dataset.userSelected;
    }
  }

  showToast(t('reservations.toast.paymentAdded', '✅ تم تسجيل الدفعة'));
}

function setupPaymentHistoryEvents() {
  const addButton = document.getElementById('edit-res-payment-add');
  if (addButton && !addButton.dataset.listenerAttached) {
    addButton.addEventListener('click', handleAddPaymentHistoryEntry);
    addButton.dataset.listenerAttached = 'true';
  }

  const historyContainer = document.getElementById('edit-res-payment-history');
  if (historyContainer && !historyContainer.dataset.listenerAttached) {
    historyContainer.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action="remove-payment"]');
      if (!button) return;
      const index = Number(button.dataset.index);
      if (Number.isNaN(index)) return;
      removeEditingPayment(index);
      setEditingPayments(getEditingPayments());
      renderEditPaymentHistory();
      updateEditReservationSummary();
      showToast(t('reservations.toast.paymentRemoved', '🗑️ تم حذف الدفعة'));
    });
    historyContainer.dataset.listenerAttached = 'true';
  }
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
    if (!isEquipmentAvailable(record)) return false;
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

  renderEditPaymentHistory();

  const discountInput = document.getElementById('edit-res-discount');
  const discountTypeSelect = document.getElementById('edit-res-discount-type');
  const paidSelect = document.getElementById('edit-res-paid');
  if (paidSelect && !paidSelect.dataset.listenerAttached) {
    paidSelect.addEventListener('change', () => {
      if (paidSelect.dataset) {
        paidSelect.dataset.userSelected = 'true';
      }
      updatePaymentStatusAppearance(paidSelect);
      updateEditReservationSummary();
    });
    paidSelect.dataset.listenerAttached = 'true';
  }

  const rawDiscount = normalizeNumbers(discountInput?.value || '0');
  if (discountInput) discountInput.value = rawDiscount;

  const discount = parseFloat(rawDiscount) || 0;
  const discountType = discountTypeSelect?.value || 'percent';
  const projectLinked = Boolean(document.getElementById('edit-res-project')?.value);
  const taxCheckbox = document.getElementById('edit-res-tax');
  const applyTax = projectLinked ? false : (taxCheckbox?.checked || false);
  const manualPaymentOverride = paidSelect?.dataset?.userSelected === 'true';
  const paidStatus = manualPaymentOverride ? (paidSelect?.value || 'unpaid') : 'unpaid';
  if (applyTax) {
    ensureCompanyShareEnabled('edit-res-company-share');
  }
  let companySharePercent = getCompanySharePercent('edit-res-company-share');
  if (applyTax && (!Number.isFinite(companySharePercent) || companySharePercent <= 0)) {
    ensureCompanyShareEnabled('edit-res-company-share');
    companySharePercent = getCompanySharePercent('edit-res-company-share');
  }

  const { items: editingItems = [], payments: editingPayments = [] } = getEditingState();
  const { start, end } = getEditReservationDateRange();

  const html = renderEditSummary({
    items: editingItems,
    discount,
    discountType,
    applyTax,
    paidStatus,
    start,
    end,
    companySharePercent,
    paymentHistory: editingPayments,
  });

  summaryEl.innerHTML = html;

  const summaryResult = renderEditSummary.lastResult;

  if (summaryResult && paidSelect) {
    const calculatedStatus = summaryResult.paymentStatus;
    if (!manualPaymentOverride) {
      if (paidSelect.value !== calculatedStatus) {
        paidSelect.value = calculatedStatus;
      }
      if (paidSelect.dataset) {
        delete paidSelect.dataset.userSelected;
      }
      updatePaymentStatusAppearance(paidSelect, calculatedStatus);
    } else {
      updatePaymentStatusAppearance(paidSelect, paidSelect.value);
    }
  } else if (paidSelect) {
    updatePaymentStatusAppearance(paidSelect, paidSelect.value);
  }
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

  const availability = getEquipmentAvailabilityStatus(equipmentItem);
  if (availability === 'maintenance' || availability === 'retired') {
    showToast(getEquipmentUnavailableMessage(availability));
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

  const availability = getEquipmentAvailabilityStatus(equipmentItem);
  if (availability === 'maintenance' || availability === 'retired') {
    showToast(getEquipmentUnavailableMessage(availability));
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

if (typeof window !== 'undefined') {
  window.getEditReservationDateRange = getEditReservationDateRange;
  window.renderEditPaymentHistory = renderEditPaymentHistory;
}
