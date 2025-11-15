import { loadData } from '../storage.js';
import { t } from '../language.js';
import { showToast, normalizeNumbers, formatDateTime } from '../utils.js';
import { apiRequest } from '../apiClient.js';
import { groupReservationItems, resolveReservationItemGroupKey, resolveEquipmentIdentifier, sanitizePriceValue, parsePriceValue, buildReservationDisplayGroups } from '../reservationsShared.js';
import {
  resolveItemImage,
  findEquipmentByBarcode,
  getEquipmentAvailabilityStatus,
  isEquipmentUnavailable,
  isEquipmentAvailable
} from '../reservationsEquipment.js';
import { renderEditSummary, DEFAULT_COMPANY_SHARE_PERCENT, calculateReservationDays } from '../reservationsSummary.js';
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
import { normalizeBarcodeValue, combineDateTime, hasEquipmentConflict, hasTechnicianConflict, hasPackageConflict } from './state.js';
import { normalizePackageId } from '../reservationsPackages.js';
import {
  findEquipmentByDescription,
  hasExactEquipmentDescription,
  updatePaymentStatusAppearance,
  getCompanySharePercent,
  ensureCompanyShareEnabled,
  getEquipmentUnavailableMessage,
  buildReservationPackageEntry
} from './createForm.js';

import { buildPackageOptionsSnapshot } from '../reservationsPackages.js';

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

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getEditPackageElements() {
  if (typeof document === 'undefined') {
    return {
      container: null,
      select: null,
      hint: null,
      addButton: null,
    };
  }

  return {
    container: document.querySelector('.reservation-equipment-inputs--package'),
    select: document.getElementById('edit-res-package-select'),
    hint: document.getElementById('edit-res-package-hint'),
    addButton: document.getElementById('edit-add-reservation-package'),
  };
}

function populateEditPackageSelect() {
  const { container, select, hint, addButton } = getEditPackageElements();
  if (!select) return;

  const previousValue = select.value;
  const snapshot = buildPackageOptionsSnapshot();

  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const placeholderOption = `<option value="" disabled selected>${t('reservations.edit.packages.placeholder', 'اختر الحزمة')}</option>`;
  const optionMarkup = snapshot
    .map((entry) => {
      const price = Number.isFinite(Number(entry.price)) ? Number(entry.price) : 0;
      const priceDisplay = normalizeNumbers(price.toFixed(2));
      const label = `${entry.name} — ${priceDisplay} ${currencyLabel}`;
      return `<option value="${escapeHtml(entry.id)}">${escapeHtml(label)}</option>`;
    })
    .join('');

  select.innerHTML = `${placeholderOption}${optionMarkup}`;

  const hasPackages = snapshot.length > 0;
  select.disabled = !hasPackages;

  if (addButton) {
    addButton.disabled = !hasPackages;
  }

  if (container) {
    container.hidden = !hasPackages;
    container.setAttribute('aria-hidden', hasPackages ? 'false' : 'true');
  }

  if (hint) {
    if (hasPackages) {
      hint.textContent = t('reservations.edit.packages.hint', 'حدد الحزمة ثم اضغط على الزر لإضافتها للحجز.');
      hint.dataset.state = 'ready';
    } else {
      hint.textContent = t('reservations.create.packages.empty', 'لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم.');
      hint.dataset.state = 'empty';
    }
  }

  if (hasPackages && previousValue && snapshot.some((entry) => entry.id === previousValue)) {
    select.value = previousValue;
  } else {
    select.selectedIndex = 0;
  }
}

function addPackageToEditingReservationList(packageId, { silent = false } = {}) {
  const normalizedId = String(packageId ?? '').trim();
  if (!normalizedId) {
    if (!silent) {
      showToast(t('reservations.toast.packageInvalid', '⚠️ يرجى اختيار حزمة صالحة أولاً'));
    }
    return { success: false, reason: 'invalid' };
  }

  const { index: editingIndex, items: currentItems = [] } = getEditingState();
  const { start, end } = getEditReservationDateRange();
  const { reservations = [] } = loadData();
  const currentReservation = editingIndex != null ? reservations[editingIndex] || null : null;
  const ignoreId = currentReservation?.id ?? currentReservation?.reservationId ?? null;

  const result = buildReservationPackageEntry(normalizedId, {
    existingItems: currentItems,
    start,
    end,
    ignoreReservationId: ignoreId,
  });

  if (!result.success) {
    if (!silent) {
      showToast(result.message || t('reservations.toast.packageInvalid', '⚠️ يرجى اختيار حزمة صالحة أولاً'));
    }
    return result;
  }

  const nextItems = [...currentItems, result.package];
  setEditingState(editingIndex, nextItems);
  renderEditReservationItems(nextItems);
  updateEditReservationSummary();
  if (!silent) {
    showToast(t('reservations.toast.packageAdded', '✅ تم إضافة الحزمة بنجاح'));
  }
  return result;
}

function handleEditPackageAdd() {
  const { select } = getEditPackageElements();
  if (!select) return;
  const selectedValue = select.value || '';
  const result = addPackageToEditingReservationList(selectedValue);
  if (result?.success && select) {
    select.value = '';
    select.selectedIndex = 0;
  }
}

function setupEditPackageControls() {
  const { addButton, select } = getEditPackageElements();
  // Rebuild options and hint on language change so placeholders translate
  if (select && !select.dataset.langRefreshAttached) {
    document.addEventListener('language:changed', populateEditPackageSelect);
    document.addEventListener('language:translationsReady', populateEditPackageSelect);
    select.dataset.langRefreshAttached = 'true';
  }

  if (addButton && !addButton.dataset.listenerAttached) {
    addButton.addEventListener('click', () => {
      handleEditPackageAdd();
    });
    addButton.dataset.listenerAttached = 'true';
  }

  if (select && !select.dataset.listenerAttached) {
    select.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleEditPackageAdd();
      }
    });
    select.dataset.listenerAttached = 'true';
  }

  populateEditPackageSelect();
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
    container.innerHTML = `<tr><td colspan="6" class="text-center">${noItemsMessage}</td></tr>`;
    ensureGroupHandler(container);
    return;
  }

  // Use the same display grouping used in details/quotes so that
  // packages render as single rows and their child items are not
  // duplicated with inflated quantities (e.g. days multipliers).
  const { groups: displayGroups } = buildReservationDisplayGroups({ items });

  container.innerHTML = displayGroups
    .map((group) => {
      const representative = group.items[0] || {};
      const imageSource = resolveItemImage(representative) || group.image;
      const imageCell = imageSource
        ? `<img src="${imageSource}" alt="${imageAlt}" class="reservation-item-thumb">`
        : '<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';
      const isPackageGroup = String(group?.type || '').toLowerCase() === 'package'
        || group.items.some((item) => item?.type === 'package');
      const quantityDisplay = normalizeNumbers(String(group.count));
      const parsedUnitPrice = parsePriceValue(group.unitPrice);
      const unitPriceNumber = Number.isFinite(parsedUnitPrice) ? sanitizePriceValue(parsedUnitPrice) : 0;
      const groupDays = (() => {
        try {
          const { start, end } = getEditReservationDateRange();
          const d = (typeof calculateReservationDays === 'function') ? calculateReservationDays(start, end) : 1;
          return Number.isFinite(d) && d > 0 ? d : 1;
        } catch (_) { return 1; }
      })();
      const parsedTotalPrice = parsePriceValue(group.totalPrice);
      const totalPriceRaw = Number.isFinite(parsedTotalPrice)
        ? parsedTotalPrice
        : unitPriceNumber * (Number.isFinite(group.count) ? group.count : 1) * groupDays;
      const totalPriceNumber = sanitizePriceValue(totalPriceRaw);
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

      let packageItemsMeta = '';
      if (isPackageGroup) {
        const aggregated = new Map();
        const resolvePackageItemQty = (value) => {
          const parsed = Number.parseFloat(normalizeNumbers(String(value ?? '')).replace(/[^0-9.]/g, ''));
          if (!Number.isFinite(parsed) || parsed <= 0) {
            return 1;
          }
          if (parsed > 99) {
            return 1;
          }
          return Math.round(parsed);
        };
        const packageItemsSource = [];
        if (Array.isArray(group.packageItems) && group.packageItems.length) {
          packageItemsSource.push(...group.packageItems);
        }
        group.items.forEach((item) => {
          if (!Array.isArray(item?.packageItems)) return;
          packageItemsSource.push(...item.packageItems);
        });

        packageItemsSource.forEach((pkgItem) => {
          if (!pkgItem) return;
          const key = normalizeBarcodeValue(pkgItem.barcode || pkgItem.normalizedBarcode || pkgItem.desc || Math.random());
          if (!key) return;
          const existing = aggregated.get(key);
          const directQty = resolvePackageItemQty(pkgItem.qtyPerPackage ?? pkgItem.perPackageQty ?? pkgItem.quantityPerPackage ?? pkgItem.qty ?? pkgItem.quantity ?? 1);
          const clampedQty = Math.max(1, Math.min(directQty, 99));
          if (existing) {
            existing.qty = clampedQty;
            return;
          }
          aggregated.set(key, {
            desc: pkgItem.desc || pkgItem.barcode || t('reservations.create.packages.unnamedItem', 'عنصر بدون اسم'),
            qty: clampedQty,
            barcode: pkgItem.barcode ?? pkgItem.normalizedBarcode ?? ''
          });
        });

        if (aggregated.size) {
          const itemsMarkup = Array.from(aggregated.values())
            .map((pkgItem) => {
              const qtyDisplay = normalizeNumbers(String(pkgItem.qty > 0 ? Math.min(pkgItem.qty, 99) : 1));
              const label = escapeHtml(pkgItem.desc || '');
              const barcodeLabel = pkgItem.barcode
                ? ` <span class="reservation-package-items__barcode">(${escapeHtml(normalizeNumbers(String(pkgItem.barcode)))})</span>`
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

      const quantityControlClass = isPackageGroup
        ? 'reservation-quantity-control reservation-quantity-control--static'
        : 'reservation-quantity-control';
      const disableQuantityAttr = isPackageGroup ? ' disabled aria-disabled="true" tabindex="-1"' : '';

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
            <div class="${quantityControlClass}" data-group-key="${group.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${group.key}" aria-label="${decreaseLabel}"${disableQuantityAttr}>−</button>
              <span class="reservation-qty-value">${quantityDisplay}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${group.key}" aria-label="${increaseLabel}"${disableQuantityAttr}>+</button>
            </div>
          </td>
          <td><span class="reservation-days-value">${normalizeNumbers(String(groupDays))}</span></td>
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
  
  // When linked to a project, show the project's payment history in read-only mode
  let payments = getEditingPayments();
  const projectId = document.getElementById('edit-res-project')?.value || '';
  if (projectId) {
    try {
      const projects = (loadData()?.projects) || [];
      const project = projects.find((p) => String(p.id) === String(projectId));
      const projectHistory = Array.isArray(project?.paymentHistory)
        ? project.paymentHistory
        : (Array.isArray(project?.payment_history)
            ? project.payment_history
            : (Array.isArray(project?.payments)
                ? project.payments
                : (Array.isArray(project?.paymentLogs) ? project.paymentLogs : [])));
      if (Array.isArray(projectHistory) && projectHistory.length) {
        payments = projectHistory;
      }
    } catch (_) { /* noop */ }
  }
  if (!Array.isArray(payments) || payments.length === 0) {
    container.innerHTML = `<div class="reservation-payment-history__empty">${t('reservations.paymentHistory.empty', 'لا توجد دفعات مسجلة')}</div>`;
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
  if (isEditLinkedProject()) {
    showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.'), 'error');
    return;
  }
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
    addButton.addEventListener('click', (event) => {
      if (isEditLinkedProject()) {
        event.preventDefault();
        showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.'), 'error');
        return;
      }
      handleAddPaymentHistoryEntry();
    });
    addButton.dataset.listenerAttached = 'true';
  }

  const historyContainer = document.getElementById('edit-res-payment-history');
  if (historyContainer && !historyContainer.dataset.listenerAttached) {
    historyContainer.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action="remove-payment"]');
      if (!button) return;
      if (isEditLinkedProject()) {
        event.preventDefault();
        showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.'), 'error');
        return;
      }
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
  const { groups } = buildReservationDisplayGroups({ items });
  const target = groups.find((entry) => entry.key === groupKey);
  if (!target) return;
  if (target.items.some((item) => item?.type === 'package')) {
    return;
  }

  // Locate last matching raw item index for this group
  let removeIndex = -1;
  for (let i = items.length - 1; i >= 0; i -= 1) {
    const it = items[i];
    if (resolveReservationItemGroupKey(it) === groupKey && it?.type !== 'package') {
      removeIndex = i;
      break;
    }
  }
  if (removeIndex < 0) return;

  const nextItems = items.filter((_, idx) => idx !== removeIndex);
  setEditingState(editingIndex, nextItems);
  renderEditReservationItems(nextItems);
  updateEditReservationSummary();
}

function removeEditReservationGroup(groupKey) {
  const { index: editingIndex, items } = getEditingState();
  const { groups } = buildReservationDisplayGroups({ items });
  const target = groups.find((entry) => entry.key === groupKey);
  if (!target) return;

  let nextItems = items.filter((item) => resolveReservationItemGroupKey(item) !== groupKey);

  // If the removed group is a package, also purge any stray equipment
  // items that belong to this package (by barcode or equipment id)
  const isPackageGroup = target.items.some((it) => it && it.type === 'package');
  if (isPackageGroup) {
    // Remove the package line itself by matching package id/code
    const normalizedTargetId = normalizePackageId(
      target.packageId
        ?? (target.items.find((it) => it?.type === 'package')?.packageId)
        ?? ''
    );
    const normalizedTargetBarcode = normalizeBarcodeValue(
      target.package_code
        ?? target.packageDisplayCode
        ?? target.barcode
        ?? ''
    );

    nextItems = nextItems.filter((it) => {
      if (!it || typeof it !== 'object') return true;
      if (it.type !== 'package') return true;
      const itPkgId = normalizePackageId(it.packageId ?? it.package_id ?? it.id ?? '');
      const itBarcode = normalizeBarcodeValue(it.barcode ?? it.package_code ?? '');
      if (normalizedTargetId && itPkgId === normalizedTargetId) return false;
      if (normalizedTargetBarcode && itBarcode && itBarcode === normalizedTargetBarcode) return false;
      return true;
    });

    const pkgBarcodes = new Set();
    const pkgEquipmentIds = new Set();
    target.items.forEach((it) => {
      const list = Array.isArray(it?.packageItems) ? it.packageItems : [];
      list.forEach((pkgItem) => {
        const bc = normalizeBarcodeValue(pkgItem?.barcode || pkgItem?.normalizedBarcode || '');
        if (bc) pkgBarcodes.add(bc);
        const eqId = pkgItem?.equipmentId ?? pkgItem?.equipment_id ?? null;
        if (eqId != null) pkgEquipmentIds.add(String(eqId));
      });
    });

    if (pkgBarcodes.size || pkgEquipmentIds.size) {
      nextItems = nextItems.filter((it) => {
        const bc = normalizeBarcodeValue(it?.barcode || '');
        const eqId = it?.equipmentId ?? it?.id ?? null;
        if (bc && pkgBarcodes.has(bc)) return false;
        if (eqId != null && pkgEquipmentIds.has(String(eqId))) return false;
        return true;
      });
    }
  }

  if (nextItems.length === items.length) return;
  setEditingState(editingIndex, nextItems);
  renderEditReservationItems(nextItems);
  updateEditReservationSummary();
}

function increaseEditReservationGroup(groupKey) {
  const { index: editingIndex, items } = getEditingState();
  const { groups } = buildReservationDisplayGroups({ items });
  const target = groups.find((entry) => entry.key === groupKey);
  if (!target) return;
  if (target.items.some((item) => item?.type === 'package')) {
    return;
  }

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

// days column reflects reservation duration only; no manual controls

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

function isEditLinkedProject() {
  return Boolean(document.getElementById('edit-res-project')?.value);
}

function registerEditLinkedGuard(element) {
  if (!element || element.dataset?.linkedGuardAttached === 'true') return;
  const related = new Set([element]);
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) related.add(label);
  }
  if (element.parentElement) {
    related.add(element.parentElement);
  }

  const handler = (event) => {
    if (!isEditLinkedProject()) return;
    showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.'), 'error');
    event.stopPropagation();
    event.preventDefault();
  };

  related.forEach((target) => {
    if (!target || target.dataset?.linkedGuardAttached === 'true') return;
    ['mousedown', 'touchstart', 'keydown'].forEach((evt) => target.addEventListener(evt, handler, { capture: true }));
    target.dataset.linkedGuardAttached = 'true';
  });
}

function setEditLinkedReservationControlState(projectLinked) {
  const message = t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.');
  const taxCheckbox = document.getElementById('edit-res-tax');
  const shareCheckbox = document.getElementById('edit-res-company-share');
  const paidSelect = document.getElementById('edit-res-paid');
  const paymentProgressTypeSelect = document.getElementById('edit-res-payment-progress-type');
  const paymentProgressValueInput = document.getElementById('edit-res-payment-progress-value');
  const paymentAddButton = document.getElementById('edit-res-payment-add');
  const historyContainer = document.getElementById('edit-res-payment-history');

  [taxCheckbox, shareCheckbox, paidSelect, paymentProgressTypeSelect, paymentProgressValueInput, paymentAddButton, historyContainer]
    .forEach(registerEditLinkedGuard);

  if (projectLinked) {
    if (taxCheckbox) {
      taxCheckbox.checked = false;
      taxCheckbox.disabled = true;
      taxCheckbox.classList.add('reservation-input-disabled');
      taxCheckbox.title = message;
    }
    if (shareCheckbox) {
      shareCheckbox.checked = false;
      shareCheckbox.disabled = true;
      shareCheckbox.classList.add('reservation-input-disabled');
      shareCheckbox.title = message;
    }
    if (paidSelect) {
      // Reflect the linked project's current payment status on the disabled selector for clarity
      const projectId = document.getElementById('edit-res-project')?.value || '';
      let normalized = 'unpaid';
      if (projectId) {
        try {
          const projects = (loadData()?.projects) || [];
          const project = projects.find((p) => String(p.id) === String(projectId));
          const raw = typeof project?.paymentStatus === 'string' ? project.paymentStatus.toLowerCase() : null;
          if (raw && ['paid', 'partial', 'unpaid'].includes(raw)) normalized = raw;
        } catch (_) { /* noop */ }
      }
      paidSelect.value = normalized;
      paidSelect.disabled = true;
      paidSelect.classList.add('reservation-input-disabled');
      paidSelect.title = message;
      if (paidSelect.dataset) delete paidSelect.dataset.userSelected;
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
    if (paymentAddButton) {
      paymentAddButton.disabled = true;
      paymentAddButton.classList.add('reservation-input-disabled');
      paymentAddButton.title = message;
    }
    if (historyContainer) {
      historyContainer.dataset.linkedDisabled = 'true';
    }
  } else {
    if (taxCheckbox) {
      taxCheckbox.disabled = false;
      taxCheckbox.classList.remove('reservation-input-disabled');
      taxCheckbox.title = '';
    }
    if (shareCheckbox) {
      shareCheckbox.disabled = false;
      shareCheckbox.classList.remove('reservation-input-disabled');
      shareCheckbox.title = '';
    }
    if (paidSelect) {
      paidSelect.disabled = false;
      paidSelect.classList.remove('reservation-input-disabled');
      paidSelect.title = '';
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
    if (paymentAddButton) {
      paymentAddButton.disabled = false;
      paymentAddButton.classList.remove('reservation-input-disabled');
      paymentAddButton.title = '';
    }
    if (historyContainer) {
      historyContainer.dataset.linkedDisabled = 'false';
    }
  }
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
  const projectLinked = isEditLinkedProject();
  setEditLinkedReservationControlState(projectLinked);
  const taxCheckbox = document.getElementById('edit-res-tax');
  const applyTax = projectLinked ? false : (taxCheckbox?.checked || false);
  const manualPaymentOverride = !projectLinked && paidSelect?.dataset?.userSelected === 'true';
  let paidStatus = 'unpaid';
  if (projectLinked) {
    const projectId = document.getElementById('edit-res-project')?.value || '';
    if (projectId) {
      try {
        const projects = (loadData()?.projects) || [];
        const project = projects.find((p) => String(p.id) === String(projectId));
        const raw = typeof project?.paymentStatus === 'string' ? project.paymentStatus.toLowerCase() : null;
        if (raw && ['paid', 'partial', 'unpaid'].includes(raw)) {
          paidStatus = raw;
        }
      } catch (_) { /* noop */ }
    }
  } else {
    paidStatus = manualPaymentOverride ? (paidSelect?.value || 'unpaid') : 'unpaid';
  }

  let companySharePercent = null;
  if (!projectLinked && applyTax) {
    ensureCompanyShareEnabled('edit-res-company-share');
    companySharePercent = getCompanySharePercent('edit-res-company-share');
    if (!Number.isFinite(companySharePercent) || companySharePercent <= 0) {
      ensureCompanyShareEnabled('edit-res-company-share');
      companySharePercent = getCompanySharePercent('edit-res-company-share');
    }
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

export async function addEquipmentToEditingReservation(barcodeInput) {
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
    try {
      const params = new URLSearchParams({ type: 'equipment', id: normalizedCode, start, end });
      if (ignoreId != null) params.set('ignore', String(ignoreId));
      const res = await apiRequest(`/reservations/availability.php?${params.toString()}`);
      const conflicts = Array.isArray(res?.conflicts) ? res.conflicts : [];
      const codes = Array.from(new Set(conflicts.map((c) => c?.reservation_code || (c?.reservation_id != null ? `#${c.reservation_id}` : null)).filter(Boolean)));
      const suffix = codes.length ? `: ${codes.join('، ')}` : '';
      showToast(t('reservations.toast.equipmentTimeConflictSimple', '⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية') + suffix, 'warning', 6000);
    } catch (_) {
      showToast(t('reservations.toast.equipmentTimeConflictSimple', '⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية'), 'warning', 6000);
    }
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

export async function addEquipmentToEditingByDescription(inputElement) {
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
    try {
      const params = new URLSearchParams({ type: 'equipment', id: normalizedCode, start, end });
      if (ignoreId != null) params.set('ignore', String(ignoreId));
      const res = await apiRequest(`/reservations/availability.php?${params.toString()}`);
      const conflicts = Array.isArray(res?.conflicts) ? res.conflicts : [];
      const codes = Array.from(new Set(conflicts.map((c) => c?.reservation_code || (c?.reservation_id != null ? `#${c.reservation_id}` : null)).filter(Boolean)));
      const suffix = codes.length ? `: ${codes.join('، ')}` : '';
      showToast(t('reservations.toast.equipmentTimeConflictSimple', '⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية') + suffix, 'warning', 6000);
    } catch (_) {
      showToast(t('reservations.toast.equipmentTimeConflictSimple', '⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية'), 'warning', 6000);
    }
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
    editInput.addEventListener('focus', () => {
      populateEquipmentDescriptionLists();
      if (typeof editInput.showPicker === 'function') {
        try {
          editInput.showPicker();
        } catch (error) {
          // ignore browsers that disallow programmatic picker opening
        }
      }
    });
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
    hasPackageConflict,
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

  const initEditPackages = () => {
    setupEditPackageControls();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEditPackages, { once: true });
  } else {
    initEditPackages();
  }

  document.addEventListener('packages:changed', () => {
    populateEditPackageSelect();
  });
}

if (typeof window !== 'undefined') {
  window.getEditReservationDateRange = getEditReservationDateRange;
  window.renderEditPaymentHistory = renderEditPaymentHistory;
}
