import { t } from '../language.js';
import { loadData } from '../storage.js';
import { normalizeNumbers, showToast } from '../utils.js';
import {
  ensureEquipmentCatalogLoaded,
  resolveEquipmentCost,
  resolveItemImage,
  getEquipmentAvailabilityStatus,
} from '../reservationsEquipment.js';
import { resolveEquipmentIdentifier } from '../reservationsShared.js';
import {
  buildPackageOptionsSnapshot,
  findPackageById,
  getPackageDisplayName,
  normalizePackageId,
  resolvePackageItems,
  resolvePackagePrice,
} from '../reservationsPackages.js';
import {
  combineDateTime,
  getEquipmentConflictingReservationCodes,
  hasPackageConflict,
  normalizeBarcodeValue,
} from '../reservations/state.js';
import { openEquipmentPicker } from '../equipmentPicker/modal.js';
import { state, dom } from './state.js';
import { formatCurrency, escapeHtml } from './formatting.js';

function normalizeEquipmentSearchValue(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

function normalizeProjectEquipmentGroupText(value) {
  return normalizeNumbers(String(value ?? '')).trim().toLowerCase().replace(/\s+/g, ' ');
}

function normalizeProjectEquipmentGroupMoney(value) {
  const parsed = Number.parseFloat(normalizeNumbers(String(value ?? '')).replace(/,/g, '').trim());
  return Number.isFinite(parsed) && parsed >= 0 ? parsed.toFixed(2) : '0.00';
}

function resolveProjectEquipmentGroupKey(item = {}) {
  const description = normalizeProjectEquipmentGroupText(item?.desc || item?.description || item?.name || item?.title || '');
  if (!description) return '';
  const lessor = normalizeProjectEquipmentGroupText(item?.lessor ?? item?.owner ?? item?.lessorName ?? item?.ownerName ?? '');
  const unitPrice = normalizeProjectEquipmentGroupMoney(item?.price ?? item?.unit_price ?? item?.unitPrice ?? 0);
  const unitCost = normalizeProjectEquipmentGroupMoney(
    item?.cost
      ?? item?.unit_cost
      ?? item?.unitCost
      ?? item?.rental_cost
      ?? item?.rentalCost
      ?? item?.purchase_price
      ?? item?.purchasePrice
      ?? 0
  );
  return `${description}::${lessor}::${unitPrice}::${unitCost}`;
}

function getProjectEquipmentCatalog() {
  const snapshot = loadData();
  const catalog = Array.isArray(state.equipment) && state.equipment.length
    ? state.equipment
    : (Array.isArray(snapshot?.equipment) ? snapshot.equipment : []);
  state.equipment = catalog;
  return catalog;
}

function getProjectDateRange() {
  const startDate = dom.startDate?.value?.trim();
  const endDate = dom.endDate?.value?.trim();
  const startTime = dom.startTime?.value?.trim() || '00:00';
  const endTime = dom.endTime?.value?.trim() || '00:00';

  if (!startDate || !endDate) {
    return { start: null, end: null };
  }

  return {
    start: combineDateTime(startDate, startTime),
    end: combineDateTime(endDate, endTime),
  };
}

function buildEquipmentSearchValue(item = {}) {
  const description = String(item?.desc || item?.description || item?.name || '')?.trim();
  const barcode = normalizeNumbers(String(item?.barcode || '')).trim();
  return barcode ? `${description} | ${barcode}` : description;
}

function getEquipmentLabel(item = {}) {
  return item?.desc || item?.description || item?.name || item?.barcode || t('equipment.table.unknown', 'معدة بدون اسم');
}

function findProjectEquipmentByBarcode(rawCode) {
  const normalizedCode = normalizeBarcodeValue(rawCode);
  if (!normalizedCode) return null;
  return getProjectEquipmentCatalog().find((item) => normalizeBarcodeValue(item?.barcode) === normalizedCode) || null;
}

function findProjectEquipmentByDescription(rawValue) {
  const normalizedValue = normalizeEquipmentSearchValue(rawValue);
  if (!normalizedValue) return null;

  const [descriptionPart, barcodePart = ''] = normalizeNumbers(String(rawValue || '')).split('|').map((part) => part.trim());
  if (barcodePart) {
    const byBarcode = findProjectEquipmentByBarcode(barcodePart);
    if (byBarcode) return byBarcode;
  }

  const catalog = getProjectEquipmentCatalog();
  return catalog.find((item) => normalizeEquipmentSearchValue(buildEquipmentSearchValue(item)) === normalizedValue)
    || catalog.find((item) => normalizeEquipmentSearchValue(getEquipmentLabel(item)).includes(normalizeEquipmentSearchValue(descriptionPart || rawValue)))
    || null;
}

function buildProjectEquipmentEntry(item) {
  const equipmentId = resolveEquipmentIdentifier(item);
  const barcode = normalizeBarcodeValue(item?.barcode);
  if (!equipmentId || !barcode) return null;
  return {
    id: equipmentId,
    equipmentId,
    barcode,
    desc: getEquipmentLabel(item),
    qty: 1,
    price: Number.isFinite(Number(item?.price)) ? Number(item.price) : 0,
    cost: resolveEquipmentCost(item),
    status: item?.status ?? '',
    image: resolveItemImage(item),
  };
}

function getSelectedBarcodeSet() {
  const selected = new Set();
  (state.selectedEquipment || []).forEach((item) => {
    const barcode = normalizeBarcodeValue(item?.barcode);
    if (barcode && item?.type !== 'package') selected.add(barcode);
    if (Array.isArray(item?.packageItems)) {
      item.packageItems.forEach((pkgItem) => {
        const childBarcode = normalizeBarcodeValue(pkgItem?.normalizedBarcode ?? pkgItem?.barcode);
        if (childBarcode) selected.add(childBarcode);
      });
    }
  });
  return selected;
}

function parsePositiveProjectInteger(value, fallback = 1) {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function resolveProjectEquipmentStockQuantity(item = {}) {
  return parsePositiveProjectInteger(
    item?.quantity
      ?? item?.qty
      ?? item?.stockQuantity
      ?? item?.stock_quantity
      ?? item?.availableQuantity
      ?? item?.available_quantity,
    1
  );
}

function getProjectEquipmentCatalogItemBySelection(item = {}) {
  const equipmentId = resolveEquipmentIdentifier(item);
  const barcode = normalizeBarcodeValue(item?.barcode);
  return getProjectEquipmentCatalog().find((record) => {
    const recordId = resolveEquipmentIdentifier(record);
    const recordBarcode = normalizeBarcodeValue(record?.barcode);
    return (equipmentId && recordId === equipmentId) || (barcode && recordBarcode === barcode);
  }) || null;
}

function getProjectEquipmentCatalogGroup(item = {}) {
  const catalogItem = getProjectEquipmentCatalogItemBySelection(item) || item;
  const groupKey = resolveProjectEquipmentGroupKey(catalogItem);
  if (!groupKey) return catalogItem ? [catalogItem] : [];
  return getProjectEquipmentCatalog().filter((record) => resolveProjectEquipmentGroupKey(record) === groupKey);
}

function parseProjectDateFlexible(value) {
  if (!value && value !== 0) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  const normalized = raw.includes(' ') && !raw.includes('T') ? raw.replace(' ', 'T') : raw;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getProjectReservationCollections(reservation = {}) {
  return ['items', 'equipment', 'packages', 'packageItems', 'package_items', 'reservedItems', 'reserved_items']
    .flatMap((key) => (Array.isArray(reservation?.[key]) ? reservation[key] : []));
}

function getReservationQuantityForEquipmentGroup(reservation = {}, groupKey = '') {
  if (!groupKey) return 0;
  let total = 0;
  const visit = (entry) => {
    if (!entry || typeof entry !== 'object') return;
    const catalogItem = getProjectEquipmentCatalogItemBySelection({
      id: entry?.equipmentId ?? entry?.equipment_id ?? entry?.id ?? null,
      equipmentId: entry?.equipmentId ?? entry?.equipment_id ?? null,
      equipment_id: entry?.equipment_id ?? entry?.equipmentId ?? null,
      barcode: entry?.barcode ?? entry?.equipmentBarcode ?? entry?.code ?? '',
    }) || entry;
    if (resolveProjectEquipmentGroupKey(catalogItem) === groupKey) {
      total += parsePositiveProjectInteger(entry?.qty ?? entry?.quantity ?? entry?.count, 1);
    }
    ['packageItems', 'package_items', 'items', 'equipment', 'bundleItems', 'bundle_items'].forEach((key) => {
      if (Array.isArray(entry?.[key])) entry[key].forEach(visit);
    });
  };

  getProjectReservationCollections(reservation).forEach(visit);
  return total;
}

function getReservedProjectEquipmentGroupQuantity(groupKey, startIso, endIso) {
  if (!groupKey || !startIso || !endIso) return 0;
  const start = parseProjectDateFlexible(startIso);
  const end = parseProjectDateFlexible(endIso);
  if (!start || !end || start >= end) return 0;

  const snapshot = loadData() || {};
  const reservations = Array.isArray(snapshot.reservations) ? snapshot.reservations : [];
  return reservations.reduce((sum, reservation) => {
    const status = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
    if (status === 'cancelled' || status === 'canceled') return sum;
    const reservationStart = parseProjectDateFlexible(reservation?.start ?? reservation?.start_datetime);
    const reservationEnd = parseProjectDateFlexible(reservation?.end ?? reservation?.end_datetime ?? reservation?.start ?? reservation?.start_datetime);
    if (!reservationStart || !reservationEnd || !(reservationStart < end && reservationEnd > start)) return sum;
    return sum + getReservationQuantityForEquipmentGroup(reservation, groupKey);
  }, 0);
}

function getProjectEquipmentAvailableQuantity(item = {}) {
  const group = getProjectEquipmentCatalogGroup(item);
  const stockQuantity = group.reduce((sum, record) => {
    const availability = getEquipmentAvailabilityStatus(record);
    if (availability === 'maintenance' || availability === 'retired') return sum;
    return sum + resolveProjectEquipmentStockQuantity(record);
  }, 0);
  const { start, end } = getProjectDateRange();
  const catalogItem = getProjectEquipmentCatalogItemBySelection(item) || item;
  const reservedQuantity = getReservedProjectEquipmentGroupQuantity(resolveProjectEquipmentGroupKey(catalogItem), start, end);
  return Math.max(0, stockQuantity - reservedQuantity);
}

function getProjectEquipmentBlockingStatus(item = {}) {
  const catalogItem = getProjectEquipmentCatalogItemBySelection(item) || item;
  const status = getEquipmentAvailabilityStatus(catalogItem);
  return status === 'maintenance' || status === 'retired' ? status : '';
}

function getProjectEquipmentStatusMessage(item = {}) {
  const status = getProjectEquipmentBlockingStatus(item);
  if (!status) return '';
  const label = getEquipmentLabel(getProjectEquipmentCatalogItemBySelection(item) || item);
  const message = status === 'maintenance'
    ? t('reservations.toast.equipmentMaintenanceNamed', '⚠️ {item} قيد الصيانة ولا يمكن إضافتها حالياً')
    : t('reservations.toast.equipmentRetiredNamed', '⚠️ {item} خارج الخدمة حالياً');
  return message.replace('{item}', label);
}

function parseProjectMoneyValue(value) {
  const normalized = normalizeNumbers(String(value ?? '')).replace(/,/g, '').trim();
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function resolvePackageInfo(packageId) {
  const normalizedId = normalizePackageId(packageId);
  if (!normalizedId) return null;
  const raw = findPackageById(normalizedId);
  if (!raw) return null;
  return {
    id: normalizedId,
    name: getPackageDisplayName(raw) || normalizedId,
    code: raw?.package_code ?? raw?.code ?? normalizedId,
    price: resolvePackagePrice(raw),
    items: resolvePackageItems(raw),
    raw,
  };
}

function buildProjectPackageEntry(packageId) {
  const packageInfo = resolvePackageInfo(packageId);
  if (!packageInfo) return null;
  const packageItems = Array.isArray(packageInfo.items) ? packageInfo.items : [];
  return {
    id: `package::${packageInfo.id}`,
    type: 'package',
    packageId: packageInfo.id,
    package_id: packageInfo.id,
    package_code: packageInfo.code,
    barcode: packageInfo.code,
    desc: packageInfo.name,
    qty: 1,
    price: Number.isFinite(Number(packageInfo.price)) ? Number(packageInfo.price) : 0,
    cost: Number.isFinite(Number(packageInfo.raw?.cost ?? packageInfo.raw?.unit_cost)) ? Number(packageInfo.raw?.cost ?? packageInfo.raw?.unit_cost) : 0,
    image: packageItems.find((item) => item?.image)?.image ?? null,
    packageItems: packageItems.map((item) => ({
      equipmentId: item?.equipmentId ?? item?.equipment_id ?? null,
      barcode: item?.barcode ?? item?.normalizedBarcode ?? '',
      normalizedBarcode: normalizeBarcodeValue(item?.normalizedBarcode ?? item?.barcode),
      desc: item?.desc ?? item?.description ?? item?.name ?? '',
      qty: 1,
      quantity: 1,
      qtyPerPackage: 1,
      price: Number.isFinite(Number(item?.price ?? item?.unit_price)) ? Number(item?.price ?? item?.unit_price) : 0,
      cost: Number.isFinite(Number(item?.cost ?? item?.unit_cost)) ? Number(item?.cost ?? item?.unit_cost) : 0,
      image: item?.image ?? null,
    })),
  };
}

function getEquipmentConflictMessage(barcode) {
  const { start, end } = getProjectDateRange();
  const fallback = t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية');
  try {
    const codes = getEquipmentConflictingReservationCodes([barcode], start, end);
    if (codes.length === 1) {
      return t('reservations.toast.equipmentConflictSingle', '⚠️ هذه المعدة محجوزة مسبقاً في حجز رقم {code}')
        .replace('{code}', normalizeNumbers(String(codes[0])));
    }
    if (codes.length > 1) {
      return t('reservations.toast.equipmentConflictMultiple', '⚠️ هذه المعدة محجوزة مسبقاً في حجوزات أرقام: {codes}')
        .replace('{codes}', codes.map((code) => normalizeNumbers(String(code))).join('، '));
    }
  } catch (_) {
    // fall through to fallback
  }
  return fallback;
}

export function validateSelectedProjectEquipmentAvailability() {
  const { start, end } = getProjectDateRange();
  if (!start || !end) {
    return { ok: true };
  }

  const selectedItems = Array.isArray(state.selectedEquipment) ? state.selectedEquipment : [];
  for (const item of selectedItems) {
    if (item?.type === 'package') {
      const packageItems = Array.isArray(item.packageItems) ? item.packageItems : [];
      const unavailable = packageItems.find((pkgItem) => getProjectEquipmentBlockingStatus(pkgItem));
      if (unavailable) {
        const packageName = item.desc || item.package_code || item.barcode || t('reservations.create.packages.packageLabel', 'الحزمة');
        return {
          ok: false,
          message: t('reservations.toast.packageItemsConflict', '⚠️ لا يمكن إضافة {name} لأن بعض عناصرها غير متاحة:')
            .replace('{name}', packageName)
            + `\n• ${getProjectEquipmentStatusMessage(unavailable).replace(/^⚠️\s*/, '')}`,
        };
      }

      const conflicted = packageItems.find((pkgItem) => {
        const barcode = normalizeBarcodeValue(pkgItem?.normalizedBarcode ?? pkgItem?.barcode);
        return barcode && getProjectEquipmentAvailableQuantity({ ...pkgItem, barcode }) < 1;
      });
      if (conflicted) {
        const packageName = item.desc || item.package_code || item.barcode || t('reservations.create.packages.packageLabel', 'الحزمة');
        const itemName = conflicted.desc || conflicted.barcode || t('reservations.create.packages.unnamedItem', 'عنصر بدون اسم');
        return {
          ok: false,
          message: t('reservations.toast.packageItemsConflict', '⚠️ لا يمكن إضافة {name} لأن بعض عناصرها غير متاحة:')
            .replace('{name}', packageName)
            + `\n• ${itemName}`,
        };
      }
      continue;
    }

    const statusMessage = getProjectEquipmentStatusMessage(item);
    if (statusMessage) {
      return {
        ok: false,
        message: statusMessage,
      };
    }

    const barcode = normalizeBarcodeValue(item?.barcode);
    if (barcode && getProjectEquipmentAvailableQuantity(item) < 1) {
      return {
        ok: false,
        message: getEquipmentConflictMessage(barcode),
      };
    }
  }

  return { ok: true };
}

function addProjectEquipmentRecord(item, inputElement = null) {
  const payload = buildProjectEquipmentEntry(item);
  if (!payload) {
    showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
    return false;
  }

  const { start, end } = getProjectDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
    return false;
  }

  const availability = getEquipmentAvailabilityStatus(item);
  if (availability === 'maintenance' || availability === 'retired') {
    showToast(getProjectEquipmentStatusMessage(item) || (availability === 'maintenance'
      ? t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً')
      : t('reservations.toast.equipmentRetired', '⚠️ هذه المعدة خارج الخدمة حالياً')));
    return false;
  }

  if (getSelectedBarcodeSet().has(payload.barcode)) {
    showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
    return false;
  }

  if (getProjectEquipmentAvailableQuantity(payload) < 1) {
    showToast(getEquipmentConflictMessage(payload.barcode), 'warning', 6000);
    return false;
  }

  state.selectedEquipment.push(payload);
  if (inputElement) inputElement.value = '';
  renderProjectEquipmentSelection();
  showToast(t('reservations.toast.equipmentAdded', '✅ تم إضافة المعدة بنجاح'));
  return true;
}

export function addProjectPackageRecord(packageId) {
  const payload = buildProjectPackageEntry(packageId);
  if (!payload) {
    showToast(t('reservations.toast.packageNotFound', '⚠️ تعذر العثور على بيانات الحزمة المحددة'));
    return false;
  }

  const { start, end } = getProjectDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
    return false;
  }

  const normalizedPackageId = normalizePackageId(payload.packageId);
  if ((state.selectedEquipment || []).some((item) => item?.type === 'package' && normalizePackageId(item.packageId) === normalizedPackageId)) {
    showToast(t('reservations.toast.packageDuplicate', '⚠️ هذه الحزمة مضافة بالفعل إلى الحجز'));
    return false;
  }

  if (hasPackageConflict(normalizedPackageId, start, end)) {
    showToast(t('reservations.toast.packageTimeConflict', `⚠️ الحزمة ${payload.desc} محجوزة بالفعل في الفترة المختارة`), 'warning', 6000);
    return false;
  }

  const selected = getSelectedBarcodeSet();
  const duplicate = payload.packageItems.find((item) => selected.has(normalizeBarcodeValue(item?.normalizedBarcode ?? item?.barcode)));
  if (duplicate) {
    showToast(t('reservations.toast.packageDuplicateEquipmentExternal', '⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}')
      .replace('{items}', duplicate.desc || duplicate.barcode || ''));
    return false;
  }

  const unavailable = payload.packageItems.find((item) => getProjectEquipmentBlockingStatus(item));
  if (unavailable) {
    showToast(t('reservations.toast.packageItemsConflict', '⚠️ لا يمكن إضافة {name} لأن بعض عناصرها غير متاحة:')
      .replace('{name}', payload.desc)
      + `\n• ${getProjectEquipmentStatusMessage(unavailable).replace(/^⚠️\s*/, '')}`, 'warning', 6000);
    return false;
  }

  const conflicted = payload.packageItems.find((item) => {
    const barcode = normalizeBarcodeValue(item?.normalizedBarcode ?? item?.barcode);
    return barcode && getProjectEquipmentAvailableQuantity({ ...item, barcode }) < 1;
  });
  if (conflicted) {
    showToast(t('reservations.toast.packageItemsConflict', `⚠️ لا يمكن إضافة ${payload.desc} لأن بعض عناصرها غير متاحة:`)
      + `\n• ${conflicted.desc || conflicted.barcode || ''}`, 'warning', 6000);
    return false;
  }

  state.selectedEquipment.push(payload);
  renderProjectEquipmentSelection();
  showToast(t('reservations.toast.packageAdded', '✅ تم إضافة الحزمة بنجاح'));
  return true;
}

export function addProjectEquipmentByBarcode(rawCode, inputElement = null) {
  const item = findProjectEquipmentByBarcode(rawCode);
  if (!item) {
    showToast(t('reservations.toast.barcodeNotFound', '❌ الباركود غير موجود'));
    return false;
  }
  return addProjectEquipmentRecord(item, inputElement);
}

export function addProjectEquipmentByDescription(inputElement) {
  if (!inputElement?.value?.trim()) return false;
  const item = findProjectEquipmentByDescription(inputElement.value);
  if (!item) {
    showToast(t('reservations.toast.equipmentNameNotFound', '❌ لم يتم العثور على معدة بالاسم المدخل'));
    return false;
  }
  return addProjectEquipmentRecord(item, inputElement);
}

function getEquipmentSuggestions(query) {
  const normalizedQuery = normalizeEquipmentSearchValue(query);
  if (!normalizedQuery) return [];
  const selected = getSelectedBarcodeSet();
  return getProjectEquipmentCatalog()
    .map((item) => ({
      item,
      value: buildEquipmentSearchValue(item),
      label: buildEquipmentSearchValue(item),
      barcode: normalizeBarcodeValue(item?.barcode),
    }))
    .filter((entry) => entry.value && !selected.has(entry.barcode))
    .filter((entry) => normalizeEquipmentSearchValue(entry.value).includes(normalizedQuery))
    .slice(0, 12);
}

function closeSuggestions() {
  if (!dom.projectEquipmentSuggestions) return;
  dom.projectEquipmentSuggestions.hidden = true;
  dom.projectEquipmentSuggestions.innerHTML = '';
  dom.projectEquipmentSuggestions.dataset.activeIndex = '-1';
}

function renderSuggestions(query) {
  const menu = dom.projectEquipmentSuggestions;
  if (!menu) return;
  const suggestions = getEquipmentSuggestions(query);
  if (!suggestions.length) {
    closeSuggestions();
    return;
  }
  menu.innerHTML = suggestions.map((entry, index) => `
    <button type="button" class="reservation-equipment-suggestion" data-index="${index}" role="option">
      ${escapeHtml(entry.label)}
    </button>
  `).join('');
  menu.hidden = false;
  menu.dataset.activeIndex = '-1';
}

function applyEquipmentMethod(method = 'barcode') {
  const normalized = ['barcode', 'autocomplete', 'list'].includes(method) ? method : 'barcode';
  if (dom.projectEquipmentMethodSelect && dom.projectEquipmentMethodSelect.value !== normalized) {
    dom.projectEquipmentMethodSelect.value = normalized;
  }
  (dom.projectEquipmentMethodPanels || []).forEach((panel) => {
    const active = panel.dataset.projectEquipmentMethod === normalized;
    panel.hidden = !active;
    panel.setAttribute('aria-hidden', active ? 'false' : 'true');
  });
  if (normalized !== 'autocomplete') closeSuggestions();
}

function populateProjectEquipmentListSelect() {
  const select = dom.projectEquipmentListSelect;
  if (!select) return;
  const selected = getSelectedBarcodeSet();
  const options = getProjectEquipmentCatalog()
    .filter((item) => normalizeBarcodeValue(item?.barcode))
    .filter((item) => !selected.has(normalizeBarcodeValue(item?.barcode)))
    .sort((a, b) => getEquipmentLabel(a).localeCompare(getEquipmentLabel(b), 'ar', { sensitivity: 'base' }))
    .map((item) => {
      const barcode = normalizeBarcodeValue(item?.barcode);
      const label = `${getEquipmentLabel(item)} | ${normalizeNumbers(String(item?.barcode || ''))}`;
      return `<option value="${escapeHtml(barcode)}">${escapeHtml(label)}</option>`;
    })
    .join('');
  select.innerHTML = `<option value="">${escapeHtml(t('projects.form.operationalBooking.equipmentListPlaceholder', 'اختر من قائمة المعدات'))}</option>${options}`;
}

function populateProjectPackageSelect() {
  const select = dom.projectEquipmentPackageSelect || document.getElementById('project-equipment-package-select');
  if (!select) return;
  const snapshot = buildPackageOptionsSnapshot();
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const options = snapshot.map((entry) => {
    const price = Number.isFinite(Number(entry.price)) ? Number(entry.price) : 0;
    const label = `${entry.name} — ${normalizeNumbers(price.toFixed(2))} ${currencyLabel}`;
    return `<option value="${escapeHtml(entry.id)}">${escapeHtml(label)}</option>`;
  }).join('');
  select.innerHTML = `<option value="">${escapeHtml(t('reservations.create.packages.placeholder', 'اختر الحزمة'))}</option>${options}`;
  select.disabled = snapshot.length === 0;
  const hint = dom.projectEquipmentPackageHint || document.getElementById('project-equipment-package-hint');
  if (hint) {
    hint.textContent = snapshot.length
      ? t('projects.form.operationalBooking.packageHint', 'اختيار الحزمة يضيفها مباشرة بنفس قواعد التوفر والتعارضات.')
      : t('reservations.create.packages.empty', 'لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم.');
    hint.dataset.state = snapshot.length ? 'ready' : 'empty';
  }
}

function renderPackageItemsMeta(item) {
  if (!Array.isArray(item?.packageItems) || item.packageItems.length === 0) return '';
  const itemsMarkup = item.packageItems.map((pkgItem) => {
    const qty = Number.isFinite(Number(pkgItem?.qtyPerPackage ?? pkgItem?.qty)) ? Number(pkgItem?.qtyPerPackage ?? pkgItem.qty) : 1;
    const label = pkgItem?.desc || pkgItem?.barcode || t('reservations.create.packages.unnamedItem', 'عنصر بدون اسم');
    const barcode = pkgItem?.barcode ? ` <span class="reservation-package-items__barcode">(${escapeHtml(normalizeNumbers(String(pkgItem.barcode)))})</span>` : '';
    return `<li>${escapeHtml(label)}${barcode} × ${escapeHtml(normalizeNumbers(String(qty)))}</li>`;
  }).join('');
  return `
    <details class="reservation-package-items project-package-items">
      <summary>${escapeHtml(t('reservations.create.packages.itemsSummary', 'عرض محتويات الحزمة'))}</summary>
      <ul class="reservation-package-items__list">${itemsMarkup}</ul>
    </details>
  `;
}

function updateProjectEquipmentQuantity(index, delta) {
  const item = state.selectedEquipment[index];
  if (!item || item.type === 'package') return;
  const current = Number.parseInt(String(item.qty ?? 1), 10);
  const next = Math.max(1, (Number.isInteger(current) && current > 0 ? current : 1) + delta);
  if (delta > 0) {
    const availableQuantity = getProjectEquipmentAvailableQuantity(item);
    if (next > availableQuantity) {
      showToast(t('reservations.toast.noAdditionalUnits', '⚠️ لا توجد وحدات إضافية متاحة حالياً'));
      return;
    }
  }
  item.qty = next;
  renderProjectEquipmentSelection();
}

function updateProjectEquipmentMoney(index, field, rawValue) {
  const item = state.selectedEquipment[index];
  if (!item) return;
  const value = parseProjectMoneyValue(rawValue);
  item[field] = value;
  if (field === 'price') item.unit_price = value;
  if (field === 'cost') {
    item.unit_cost = value;
    item.rental_cost = value;
    item.purchase_price = value;
    item.internal_cost = value;
    item.equipment_cost = value;
  }
  renderProjectEquipmentSelection();
}

export function renderProjectEquipmentSelection() {
  const tbody = dom.projectEquipmentSelectedBody || document.getElementById('project-equipment-selected-body');
  const items = Array.isArray(state.selectedEquipment) ? state.selectedEquipment : [];

  if (tbody) {
    if (!items.length) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center">${escapeHtml(t('projects.form.operationalBooking.equipmentEmpty', 'لم تتم إضافة معدات بعد.'))}</td></tr>`;
    } else {
      tbody.innerHTML = items.map((item, index) => {
        const qty = Number.parseInt(String(item.qty ?? 1), 10);
        const safeQty = Number.isInteger(qty) && qty > 0 ? qty : 1;
        const price = parseProjectMoneyValue(item.price ?? item.unit_price);
        const cost = parseProjectMoneyValue(item.cost ?? item.unit_cost);
        const isPackage = item?.type === 'package';
        const total = safeQty * price;
        return `
          <tr data-project-equipment-index="${index}">
            <td>
              <div class="project-equipment-selected-photo">
                ${item.image
                  ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.desc || item.barcode || '')}" loading="lazy">`
                  : `<span aria-hidden="true">${isPackage ? '📦' : '▣'}</span>`}
              </div>
            </td>
            <td>
              <div class="project-equipment-selected-item">
                <strong>${escapeHtml(item.desc || item.barcode || '')}</strong>
                <span>${escapeHtml(normalizeNumbers(String(item.barcode || item.package_code || '')))}</span>
                ${isPackage ? renderPackageItemsMeta(item) : ''}
              </div>
            </td>
            <td>
              <div class="reservation-quantity-control project-equipment-quantity-control">
                <button type="button" class="reservation-qty-btn project-equipment-qty" data-action="decrease" data-project-equipment-index="${index}" aria-label="${escapeHtml(t('reservations.equipment.actions.decrease', 'تقليل الكمية'))}" ${isPackage ? 'disabled' : ''}>−</button>
                <span class="reservation-qty-value">${escapeHtml(normalizeNumbers(String(safeQty)))}</span>
                <button type="button" class="reservation-qty-btn project-equipment-qty" data-action="increase" data-project-equipment-index="${index}" aria-label="${escapeHtml(t('reservations.equipment.actions.increase', 'زيادة الكمية'))}" ${isPackage ? 'disabled' : ''}>+</button>
              </div>
            </td>
            <td>
              <input type="number" class="form-control form-control-sm project-equipment-money-input" data-field="price" data-project-equipment-index="${index}" min="0" step="0.01" value="${escapeHtml(normalizeNumbers(String(price)))}" aria-label="${escapeHtml(t('reservations.equipment.table.unitPrice', 'سعر الوحدة'))}">
            </td>
            <td>
              <input type="number" class="form-control form-control-sm project-equipment-money-input" data-field="cost" data-project-equipment-index="${index}" min="0" step="0.01" value="${escapeHtml(normalizeNumbers(String(cost)))}" aria-label="${escapeHtml(t('reservations.equipment.table.unitCost', 'تكلفة الوحدة'))}">
            </td>
            <td>${escapeHtml(formatCurrency(total))}</td>
            <td>
              <button type="button" class="reservation-remove-button project-equipment-remove" data-project-equipment-index="${index}" aria-label="${escapeHtml(t('actions.remove', 'إزالة'))}">🗑️</button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  const countTarget = dom.operationalEquipmentCount || document.getElementById('project-operational-equipment-count');
  const summary = dom.operationalEquipmentSummary || document.getElementById('project-operational-equipment-summary');
  const totalQty = items.reduce((sum, item) => sum + (Number(item?.qty) || 1), 0);
  if (summary) {
    summary.dataset.state = totalQty ? 'filled' : 'empty';
    summary.hidden = totalQty > 0;
  }
  if (countTarget) {
    countTarget.textContent = totalQty
      ? t('projects.form.operationalBooking.equipmentCount', 'معدات محددة: {count}').replace('{count}', normalizeNumbers(String(totalQty)))
      : t('projects.form.operationalBooking.equipmentEmpty', 'لم تتم إضافة معدات بعد.');
  }

  populateProjectEquipmentListSelect();
  populateProjectPackageSelect();
  try {
    document.dispatchEvent(new CustomEvent('projects:form-summary:update'));
  } catch (_) {
    // non-fatal outside the browser runtime
  }
}

export function setupProjectEquipmentControls() {
  populateProjectEquipmentListSelect();
  populateProjectPackageSelect();
  renderProjectEquipmentSelection();
  applyEquipmentMethod(dom.projectEquipmentMethodSelect?.value || 'barcode');

  if (!Array.isArray(state.equipment) || state.equipment.length === 0) {
    ensureEquipmentCatalogLoaded().then((equipment) => {
      if (Array.isArray(equipment) && equipment.length) {
        state.equipment = equipment;
        renderProjectEquipmentSelection();
      }
    }).catch((error) => {
      console.warn('⚠️ [projects] Failed to refresh equipment controls', error);
    });
  }

  if (dom.projectEquipmentMethodSelect && dom.projectEquipmentMethodSelect.dataset.listenerAttached !== 'true') {
    dom.projectEquipmentMethodSelect.addEventListener('change', (event) => {
      applyEquipmentMethod(event.target.value);
    });
    dom.projectEquipmentMethodSelect.dataset.listenerAttached = 'true';
  }

  if (dom.projectEquipmentPickerButton && dom.projectEquipmentPickerButton.dataset.listenerAttached !== 'true') {
    dom.projectEquipmentPickerButton.addEventListener('click', (event) => {
      event.preventDefault();
      openEquipmentPicker({
        source: 'project-create',
        label: t('equipmentPicker.context.projectCreate', 'اختيار معدات وحزم لمشروع جديد'),
        onAddEquipment: ({ barcodes = [], quantity = 1 } = {}) => {
          const limit = Math.min(Number.isInteger(quantity) && quantity > 0 ? quantity : 1, barcodes.length);
          for (let index = 0; index < limit; index += 1) {
            addProjectEquipmentByBarcode(barcodes[index]);
          }
        },
        onAddPackage: (packageId) => addProjectPackageRecord(packageId),
      });
    });
    dom.projectEquipmentPickerButton.dataset.listenerAttached = 'true';
  }

  if (dom.projectEquipmentBarcode && dom.projectEquipmentBarcode.dataset.listenerAttached !== 'true') {
    let autoAddTimer = null;
    const triggerAdd = () => {
      const raw = dom.projectEquipmentBarcode?.value || '';
      if (!raw.trim()) return;
      window.clearTimeout(autoAddTimer);
      autoAddTimer = null;
      addProjectEquipmentByBarcode(raw, dom.projectEquipmentBarcode);
    };
    const scheduleAutoAdd = () => {
      window.clearTimeout(autoAddTimer);
      const raw = dom.projectEquipmentBarcode?.value || '';
      if (!raw.trim()) return;
      const { start, end } = getProjectDateRange();
      if (!start || !end) return;
      autoAddTimer = window.setTimeout(triggerAdd, 150);
    };

    dom.projectEquipmentBarcode.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      triggerAdd();
    });
    dom.projectEquipmentBarcode.addEventListener('input', scheduleAutoAdd);
    dom.projectEquipmentBarcode.addEventListener('change', triggerAdd);
    dom.projectEquipmentBarcode.dataset.listenerAttached = 'true';
  }

  if (dom.projectEquipmentDescription && dom.projectEquipmentDescription.dataset.listenerAttached !== 'true') {
    dom.projectEquipmentDescription.addEventListener('input', () => renderSuggestions(dom.projectEquipmentDescription.value));
    dom.projectEquipmentDescription.addEventListener('focus', () => renderSuggestions(dom.projectEquipmentDescription.value));
    dom.projectEquipmentDescription.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      addProjectEquipmentByDescription(dom.projectEquipmentDescription);
      closeSuggestions();
    });
    dom.projectEquipmentDescription.addEventListener('blur', () => {
      window.setTimeout(closeSuggestions, 120);
    });
    dom.projectEquipmentDescription.dataset.listenerAttached = 'true';
  }

  if (dom.projectEquipmentSuggestions && dom.projectEquipmentSuggestions.dataset.listenerAttached !== 'true') {
    dom.projectEquipmentSuggestions.addEventListener('pointerdown', (event) => {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest('.reservation-equipment-suggestion');
      if (!button) return;
      event.preventDefault();
      const suggestions = getEquipmentSuggestions(dom.projectEquipmentDescription?.value || '');
      const entry = suggestions[Number.parseInt(button.dataset.index || '-1', 10)];
      if (!entry) return;
      if (dom.projectEquipmentDescription) {
        dom.projectEquipmentDescription.value = entry.value;
      }
      addProjectEquipmentRecord(entry.item, dom.projectEquipmentDescription);
      closeSuggestions();
    });
    dom.projectEquipmentSuggestions.dataset.listenerAttached = 'true';
  }

  if (dom.projectEquipmentListSelect && dom.projectEquipmentListSelect.dataset.listenerAttached !== 'true') {
    dom.projectEquipmentListSelect.addEventListener('change', () => {
      if (!dom.projectEquipmentListSelect.value) return;
      const item = findProjectEquipmentByBarcode(dom.projectEquipmentListSelect.value);
      if (item) {
        addProjectEquipmentRecord(item);
      }
      dom.projectEquipmentListSelect.value = '';
    });
    dom.projectEquipmentListSelect.dataset.listenerAttached = 'true';
  }

  if (dom.projectEquipmentPackageSelect && dom.projectEquipmentPackageSelect.dataset.listenerAttached !== 'true') {
    dom.projectEquipmentPackageSelect.addEventListener('change', () => {
      const selectedValue = dom.projectEquipmentPackageSelect?.value || '';
      if (!selectedValue) return;
      if (addProjectPackageRecord(selectedValue)) {
        dom.projectEquipmentPackageSelect.value = '';
      }
    });
    dom.projectEquipmentPackageSelect.dataset.listenerAttached = 'true';
  }

  if (dom.projectEquipmentSelectedBody && dom.projectEquipmentSelectedBody.dataset.listenerAttached !== 'true') {
    dom.projectEquipmentSelectedBody.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return;
      const qtyButton = event.target.closest('.project-equipment-qty[data-project-equipment-index]');
      if (qtyButton) {
        const index = Number.parseInt(qtyButton.dataset.projectEquipmentIndex || '-1', 10);
        if (!Number.isInteger(index) || index < 0) return;
        updateProjectEquipmentQuantity(index, qtyButton.dataset.action === 'increase' ? 1 : -1);
        return;
      }
      const button = event.target.closest('.project-equipment-remove[data-project-equipment-index]');
      if (!button) return;
      const index = Number.parseInt(button.dataset.projectEquipmentIndex || '-1', 10);
      if (!Number.isInteger(index) || index < 0) return;
      state.selectedEquipment.splice(index, 1);
      renderProjectEquipmentSelection();
    });
    dom.projectEquipmentSelectedBody.addEventListener('change', (event) => {
      if (!(event.target instanceof Element)) return;
      const input = event.target.closest('.project-equipment-money-input[data-project-equipment-index]');
      if (!input) return;
      const index = Number.parseInt(input.dataset.projectEquipmentIndex || '-1', 10);
      if (!Number.isInteger(index) || index < 0) return;
      updateProjectEquipmentMoney(index, input.dataset.field === 'cost' ? 'cost' : 'price', input.value);
    });
    dom.projectEquipmentSelectedBody.dataset.listenerAttached = 'true';
  }
}
