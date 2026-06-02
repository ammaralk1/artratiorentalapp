import { showToast, normalizeNumbers } from '../../utils.js';
import { t } from '../../language.js';
import {
  groupReservationItems,
  resolveReservationItemGroupKey,
  parsePriceValue,
  sanitizePriceValue,
} from '../../reservationsShared.js';
import {
  getSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setSelectedItems,
  getCachedPackages,
  setCachedPackages,
  normalizeBarcodeValue,
  hasEquipmentConflict,
  hasPackageConflict,
  getBlockingPackagesForEquipment,
  getEquipmentBookingMode,
} from '../state.js';
import { getSelectedCrewAssignments } from '../../reservationsTechnicians.js';
import {
  calculateReservationTotal,
  renderDraftSummary,
  calculatePaymentProgress,
  determinePaymentStatus,
  calculateReservationDays,
} from '../../reservationsSummary.js';
import {
  buildPackageOptionsSnapshot,
  findPackageById,
  resolvePackageItems,
  resolvePackagePrice,
  getPackageDisplayName,
  normalizePackageId,
} from '../../reservationsPackages.js';
import { resolveItemImage, getEquipmentAvailabilityStatus } from '../../reservationsEquipment.js';
import { resolveEquipmentIdentifier } from '../../reservationsShared.js';
import { loadData } from '../../storage.js';
import { state } from './state.js';
import { persistCreateReservationDraft } from './draft.js';
import {
  isLinkedProjectSelected,
  getCompanySharePercent,
  ensureCompanyShareEnabled,
  updatePaymentStatusAppearance,
  syncCreateTaxAndShare,
  updateCreateProjectTaxState,
} from './customer-project.js';
import {
  getCreateReservationDateRange,
  parsePriceValueLocal,
  sanitizePrice,
  getPaymentProgressType,
  parsePaymentProgressValue,
  setPaymentProgressInputValue,
  getEquipmentModeElements,
  refreshActiveEquipmentSelectionRange,
} from './equipment.js';

function resolvePackageInfo(normalizedId) {
  if (!normalizedId) return null;
  let packageInfo = state.packageOptionsCache.find((entry) => entry.id === normalizedId) || null;
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
    // نعامل الحزمة كبند واحد: التكلفة تأتي من الحزمة نفسها فقط (لا نحسبها من عناصرها)
    cost: Number.isFinite(Number(packageInfo.cost)) ? Number(packageInfo.cost) : 0,
    barcode: packageInfo.code || packageInfo.raw?.package_code || `pkg-${normalizedId}`,
    packageItems: packageItems.map((item) => ({
      equipmentId: item?.equipmentId ?? null,
      barcode: item?.barcode ?? item?.normalizedBarcode ?? '',
      normalizedBarcode: normalizeBarcodeValue(item?.normalizedBarcode ?? item?.barcode),
      desc: item?.desc ?? '',
      qty: Number.isFinite(Number(item?.qty)) ? Number(item.qty) : 1,
      price: Number.isFinite(Number(item?.price)) ? Number(item.price) : 0,
      // لا نستخدم تكلفة عناصر الحزمة في التسعير/التخزين بعد الآن
      cost: 0,
    })),
    image: packageItems.find((item) => item?.image)?.image ?? null,
  };

  return { success: true, package: packagePayload, packageInfo };
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

export function setupPackageSelectAutoAdd() {
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

export function setupPackageAddHandler() {
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

export function populatePackageSelect() {
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
  state.packageOptionsCache = snapshot;
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

export function buildPackageIdentityKeyFromGroup(group = {}) {
  const candidates = [
    group.packageId,
    group.package_id,
    group.packageCode,
    group.package_code,
    group.packageDisplayCode,
    group.barcode,
    group.key,
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const normalized = normalizePackageId(candidate);
    if (normalized) return normalized;
    const normalizedNumbers = normalizeNumbers(String(candidate)).trim().toLowerCase();
    if (normalizedNumbers) return normalizedNumbers;
  }
  return null;
}

export function buildPackageIdentityKeyFromItem(item = {}) {
  if (!item || typeof item !== 'object') return null;
  const normalized = normalizePackageId(
    item.packageId
      ?? item.package_id
      ?? item.package_code
      ?? item.packageCode
      ?? item.barcode
      ?? item.id
      ?? null
  );
  if (normalized) return normalized;
  const candidate = item.package_code ?? item.packageCode ?? item.barcode ?? null;
  if (!candidate) return null;
  return normalizeNumbers(String(candidate)).trim().toLowerCase();
}

export function renderReservationItems(containerId = 'reservation-items') {
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
    container.innerHTML = `<tr><td colspan="7" class="text-center">${noItemsMessage}</td></tr>`;
    try { persistCreateReservationDraft(); } catch (_) { /* non-fatal */ }
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
      const groupDays = (() => {
        try {
          const { start, end } = getCreateReservationDateRange();
          const d = calculateReservationDays(start, end);
          return Number.isFinite(d) && d > 0 ? d : 1;
        } catch (_) { return 1; }
      })();
      const daysDisplay = normalizeNumbers(String(groupDays));
      const totalPriceNumber = unitPriceNumber * group.count * groupDays;
      const unitPriceDisplay = `
        <input
          type="number"
          class="form-control form-control-sm reservation-unit-price-input"
          data-group-key="${group.key}"
          min="0"
          step="0.01"
          value="${normalizeNumbers(String(unitPriceNumber))}"
          aria-label="${t('reservations.equipment.table.unitPrice', 'سعر الوحدة')}"
        >
      `;
      const totalPriceDisplay = `${normalizeNumbers(totalPriceNumber.toFixed(2))} ${currencyLabel}`;
      const unitCostNumber = Number.isFinite(Number(group.unitCost)) ? Number(group.unitCost) : 0;

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

      const packageItemIndex = (() => {
        if (!isPackageGroup) return null;
        for (let i = 0; i < items.length; i += 1) {
          const entry = items[i];
          if (!entry || String(entry.type || '').toLowerCase() !== 'package') continue;
          if (resolveReservationItemGroupKey(entry) === group.key) {
            return i;
          }
        }
        return null;
      })();
      const packageIdentity = isPackageGroup ? buildPackageIdentityKeyFromGroup(group) : null;
      const packageIdentityAttr = packageIdentity ? `data-package-identity="${packageIdentity}"` : '';
      const packageIndexAttr = packageItemIndex != null && Number.isInteger(packageItemIndex)
        ? `data-package-index="${packageItemIndex}"`
        : '';
      const unitCostInput = `
        <input
          type="number"
          class="form-control form-control-sm reservation-unit-cost-input"
          data-group-key="${group.key}"
          ${packageIdentityAttr}
          ${packageIndexAttr}
          min="0"
          step="0.01"
          value="${normalizeNumbers(String(unitCostNumber))}"
          aria-label="${t('reservations.equipment.table.unitCost', 'تكلفة الوحدة')}"
        >
      `;

      return `
        <tr data-group-key="${group.key}">
          <td>
            <div class="reservation-item-info reservation-item-info--static">
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
          <td><span class="reservation-days-value">${daysDisplay}</span></td>
          <td>${unitPriceDisplay}</td>
          <td>${unitCostInput}</td>
          <td>${totalPriceDisplay}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${group.key}" aria-label="${removeLabel}">🗑️</button>
          </td>
        </tr>
      `;
    })
    .join('');

  try { persistCreateReservationDraft(); } catch (_) { /* non-fatal */ }
}

export function decreaseReservationGroup(groupKey) {
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

export function removeReservationGroup(groupKey) {
  const items = getSelectedItems();
  const filtered = items.filter((item) => resolveReservationItemGroupKey(item) !== groupKey);
  if (filtered.length === items.length) return;
  setSelectedItems(filtered);
  renderReservationItems();
  renderDraftReservationSummary();
}

export function updateDraftReservationGroupPrice(groupKey, rawValue) {
  const parsed = parsePriceValueLocal(rawValue);
  const unitPrice = Number.isFinite(parsed) && parsed >= 0 ? sanitizePrice(parsed) : 0;
  const items = getSelectedItems();
  const groups = groupReservationItems(items);
  const target = groups.find((entry) => entry.key === groupKey);
  if (!target || !Array.isArray(target.itemIndices)) return;

  const nextItems = [...items];
  target.itemIndices.forEach((idx) => {
    if (nextItems[idx]) {
      nextItems[idx] = { ...nextItems[idx], price: unitPrice, unit_price: unitPrice };
    }
  });
  setSelectedItems(nextItems);
  renderReservationItems();
  renderDraftReservationSummary();
}

export function updateDraftReservationGroupCost(groupKey, rawValue) {
  const parsed = parsePriceValueLocal(rawValue);
  const unitCost = Number.isFinite(parsed) && parsed >= 0 ? sanitizePrice(parsed) : 0;
  const items = getSelectedItems();
  const groups = groupReservationItems(items);
  const target = groups.find((entry) => entry.key === groupKey);
  if (!target || !Array.isArray(target.itemIndices)) return;

  const nextItems = [...items];
  target.itemIndices.forEach((idx) => {
    if (nextItems[idx]) {
      const item = {
        ...nextItems[idx],
        cost: unitCost,
        unit_cost: unitCost,
        rental_cost: unitCost,
        purchase_price: unitCost,
        internal_cost: unitCost,
        equipment_cost: unitCost,
      };
      nextItems[idx] = item;
    }
  });
  setSelectedItems(nextItems);
  renderReservationItems();
  renderDraftReservationSummary();
}

export function increaseReservationGroup(groupKey) {
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
    const availability = getEquipmentAvailabilityStatus(record);
    if (availability === 'maintenance' || availability === 'retired') return false;
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
    cost: Number.isFinite(Number(candidate.cost)) ? Number(candidate.cost) : Number.isFinite(Number(candidate.unit_cost)) ? Number(candidate.unit_cost) : Number(target.unitCost) || 0,
    image: resolveItemImage(candidate)
  });

  renderReservationItems();
  renderDraftReservationSummary();
}

export function renderDraftReservationSummary() {
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

export function setupSummaryEvents() {
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

export function setupReservationTimeSync() {
  const startTimeInput = document.getElementById('res-start-time');
  const endTimeInput = document.getElementById('res-end-time');
  if (!startTimeInput || !endTimeInput || startTimeInput.dataset.timeSyncAttached) {
    return;
  }

  // Also persist on date changes so drafts survive refresh even if user didn't blur
  try {
    const startDateInput = document.getElementById('res-start');
    const endDateInput = document.getElementById('res-end');
    if (startDateInput && !startDateInput.dataset.persistAttached) {
      const persist = () => { try { persistCreateReservationDraft(); } catch (_) {} };
      const rerender = () => {
        try { renderReservationItems(); renderDraftReservationSummary(); } catch (_) {}
        refreshActiveEquipmentSelectionRange();
      };
      startDateInput.addEventListener('input', persist);
      startDateInput.addEventListener('change', persist);
      startDateInput.addEventListener('input', rerender);
      startDateInput.addEventListener('change', rerender);
      startDateInput.dataset.persistAttached = 'true';
    }
    if (endDateInput && !endDateInput.dataset.persistAttached) {
      const persist = () => { try { persistCreateReservationDraft(); } catch (_) {} };
      const rerender = () => {
        try { renderReservationItems(); renderDraftReservationSummary(); } catch (_) {}
        refreshActiveEquipmentSelectionRange();
      };
      endDateInput.addEventListener('input', persist);
      endDateInput.addEventListener('change', persist);
      endDateInput.addEventListener('input', rerender);
      endDateInput.addEventListener('change', rerender);
      endDateInput.dataset.persistAttached = 'true';
    }
  } catch (_) { /* non-fatal */ }

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
    try { renderReservationItems(); } catch (_) {}
    refreshActiveEquipmentSelectionRange();
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
    try { persistCreateReservationDraft(); } catch (_) { /* ignore */ }
    try { renderReservationItems(); renderDraftReservationSummary(); } catch (_) {}
    refreshActiveEquipmentSelectionRange();
  });

  // Persist when time fields change explicitly
  const persistTime = () => {
    try { persistCreateReservationDraft(); } catch (_) {}
    refreshActiveEquipmentSelectionRange();
  };
  startTimeInput.addEventListener('input', persistTime);
  startTimeInput.addEventListener('change', persistTime);
  endTimeInput.addEventListener('change', persistTime);

  if (!endTimeInput.value?.trim()) {
    syncEndTimeWithStart();
  }

  startTimeInput.dataset.timeSyncAttached = 'true';
}
