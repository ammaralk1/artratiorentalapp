import { showToast, normalizeNumbers } from '../../utils.js';
import { t } from '../../language.js';
import { normalizeText, resolveEquipmentIdentifier } from '../../reservationsShared.js';
import {
  resolveItemImage,
  getEquipmentRecordByBarcode,
  findEquipmentByBarcode,
  getEquipmentAvailabilityStatus,
  resolveEquipmentCost,
} from '../../reservationsEquipment.js';
import {
  getSelectedItems,
  addSelectedItem,
  getCachedEquipment,
  setCachedEquipment,
  normalizeBarcodeValue,
  hasEquipmentConflict,
  getEquipmentBookingMode,
  setEquipmentBookingMode,
  getBlockingPackagesForEquipment,
  getEquipmentConflictingReservationCodes,
  combineDateTime,
} from '../state.js';
import { loadData } from '../../storage.js';
import { syncEquipmentStatuses } from '../../equipment.js';
import { apiRequest } from '../../apiClient.js';
import {
  activateEquipmentSelection,
  EQUIPMENT_SELECTION_EVENTS,
  isEquipmentSelectionActive,
  updateEquipmentSelectionContext,
} from '../equipmentSelection.js';
import { state } from './state.js';
import { renderReservationItems, renderDraftReservationSummary, populatePackageSelect, setupPackageAddHandler, setupPackageSelectAutoAdd } from './packages-items.js';

export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function normalizeEquipmentSearchValue(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

export function buildEquipmentSearchValue(item = {}) {
  const description = String(item?.desc || item?.description || '')?.trim();
  const barcode = normalizeNumbers(String(item?.barcode || '')).trim();
  if (barcode) {
    return `${description} | ${barcode}`;
  }
  return description;
}

export function parseEquipmentSearchValue(value) {
  const raw = normalizeNumbers(String(value || ''));
  if (!raw.trim()) {
    return { description: '', barcode: '' };
  }
  const [first, ...rest] = raw.split('|');
  return {
    description: first.trim(),
    barcode: rest.join('|').trim(),
  };
}

export function getPaymentProgressType(select, fallback = 'percent') {
  const value = select?.value;
  if (value === 'amount' || value === 'percent') {
    return value;
  }
  return fallback;
}

export function parsePaymentProgressValue(input) {
  if (!input) return null;
  const raw = normalizeNumbers(String(input.value || '')).replace('%', '').trim();
  if (!raw) return null;
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
}

export function setPaymentProgressInputValue(input, value) {
  if (!input) return;
  if (value == null || !Number.isFinite(value) || value <= 0) {
    input.value = '';
    return;
  }
  input.value = normalizeNumbers(String(value));
}

export function buildEquipmentConflictToastMessage(conflictCodes = [], fallbackMessage) {
  const codes = Array.isArray(conflictCodes)
    ? conflictCodes
        .map((code) => normalizeNumbers(String(code ?? '')).trim())
        .filter(Boolean)
    : [];

  if (!codes.length) {
    return fallbackMessage || t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية');
  }

  if (codes.length === 1) {
    return t('reservations.toast.equipmentConflictSingle', '⚠️ هذه المعدة محجوزة مسبقاً في حجز رقم {code}')
      .replace('{code}', codes[0]);
  }

  const list = codes.join('، ');
  return t('reservations.toast.equipmentConflictMultiple', '⚠️ هذه المعدة محجوزة مسبقاً في حجوزات أرقام: {codes}')
    .replace('{codes}', list);
}

export function getEquipmentUnavailableMessage(status) {
  switch (status) {
    case 'maintenance':
      return t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً');
    case 'reserved':
      return t('reservations.toast.equipmentReserved', '⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها');
    case 'retired':
      return t('reservations.toast.equipmentRetired', '⚠️ هذه المعدة خارج الخدمة حالياً');
    default:
      return t('reservations.toast.equipmentUnavailable', '⚠️ هذه المعدة غير متاحة حالياً');
  }
}

export function parsePriceValueLocal(value) {
  const normalized = normalizeNumbers(String(value ?? '')).replace(/[^0-9.,-]/g, '').replace(/,/g, '.');
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : NaN;
}

export function sanitizePrice(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return 0;
  return Number(num.toFixed(2));
}

export const STATUS_PRIORITY = {
  available: 0,
  reserved: 1,
  maintenance: 2,
  retired: 3,
};

export function getStatusPriority(status) {
  return STATUS_PRIORITY[status] ?? 5;
}

export function describeEquipmentStatus(status) {
  switch (status) {
    case 'available':
      return t('reservations.equipment.status.available', 'متاح');
    case 'reserved':
      return t('reservations.equipment.status.reserved', 'محجوز');
    case 'maintenance':
      return t('reservations.equipment.status.maintenance', 'صيانة');
    case 'retired':
      return t('reservations.equipment.status.retired', 'خارج الخدمة');
    default:
      return t('reservations.equipment.status.unknown', 'الحالة غير معروفة');
  }
}

export function buildEquipmentOptionLabel(entry) {
  const baseValue = entry.value;
  if (entry.bestStatus === 'available' && entry.statuses.size === 1) {
    return baseValue;
  }

  const statusToDisplay = entry.bestStatus !== 'available'
    ? entry.bestStatus
    : [...entry.statuses].find((status) => status !== 'available') || entry.bestStatus;

  if (statusToDisplay === 'available') {
    return `${baseValue} — ${describeEquipmentStatus(statusToDisplay)}`;
  }

  const unavailableLabel = t('reservations.equipment.status.unavailable', 'غير متاح');
  return `${baseValue} — ${unavailableLabel} (${describeEquipmentStatus(statusToDisplay)})`;
}

export function populateEquipmentDescriptionLists() {
  const createList = document.getElementById('equipment-description-options');
  const editList = document.getElementById('edit-res-equipment-description-options');

  const syncedEquipment = syncEquipmentStatuses();
  const snapshot = loadData();
  const rawEquipment = Array.isArray(syncedEquipment) && syncedEquipment.length
    ? syncedEquipment
    : (snapshot?.equipment || []);

  const equipmentList = Array.isArray(rawEquipment) ? rawEquipment : [];
  setCachedEquipment(equipmentList);

  const entriesMap = new Map();

  equipmentList.forEach((item) => {
    const searchValue = buildEquipmentSearchValue(item);
    const normalizedValue = normalizeEquipmentSearchValue(searchValue);
    if (!normalizedValue || !searchValue) {
      return;
    }

    const status = getEquipmentAvailabilityStatus(item);
    const priority = getStatusPriority(status);
    const existing = entriesMap.get(normalizedValue);

    if (!existing) {
      entriesMap.set(normalizedValue, {
        normalized: normalizedValue,
        value: searchValue,
        bestItem: item,
        bestStatus: status,
        bestPriority: priority,
        statuses: new Set([status]),
      });
      return;
    }

    existing.statuses.add(status);
    if (priority < existing.bestPriority) {
      existing.bestItem = item;
      existing.bestStatus = status;
      existing.bestPriority = priority;
      existing.value = searchValue;
    }
  });

  state.equipmentDescriptionOptionMap = new Map();

  const optionEntries = Array.from(entriesMap.values())
    .sort((a, b) => a.value.localeCompare(b.value, 'ar', { sensitivity: 'base' }))
    .map((entry) => {
      state.equipmentDescriptionOptionMap.set(entry.normalized, entry.bestItem);
      const label = buildEquipmentOptionLabel(entry);
      const valueHtml = escapeHtml(entry.value);
      if (label === entry.value) {
        return `<option value="${valueHtml}"></option>`;
      }
      const labelHtml = escapeHtml(label);
      return `<option value="${valueHtml}" label="${labelHtml}"></option>`;
    });

  const optionsHtml = optionEntries.join('');

  if (createList) createList.innerHTML = optionsHtml;
  if (editList) editList.innerHTML = optionsHtml;
}

export function findEquipmentByDescription(term) {
  const normalizedSearch = normalizeEquipmentSearchValue(term);
  if (normalizedSearch) {
    const bySearchValue = state.equipmentDescriptionOptionMap.get(normalizedSearch);
    if (bySearchValue) return bySearchValue;
  }

  const { description, barcode } = parseEquipmentSearchValue(term);

  if (barcode) {
    const byBarcode = findEquipmentByBarcode(barcode);
    if (byBarcode) return byBarcode;
  }

  const normalizedDescription = normalizeText(description || term);
  if (!normalizedDescription) return null;

  let equipment = getCachedEquipment();
  if (!equipment?.length) {
    const snapshot = loadData();
    equipment = Array.isArray(snapshot?.equipment) ? snapshot.equipment : [];
    if (equipment.length) {
      setCachedEquipment(equipment);
    }
  }

  const exactMatch = equipment.find((item) => {
    const descriptionText = normalizeText(item?.desc || item?.description || '');
    return descriptionText === normalizedDescription;
  });
  if (exactMatch) return exactMatch;

  return equipment.find((item) => {
    const descriptionText = normalizeText(item?.desc || item?.description || '');
    return descriptionText.includes(normalizedDescription);
  }) || null;
}

export function hasExactEquipmentDescription(value, listId = 'equipment-description-options') {
  const normalizedValue = normalizeEquipmentSearchValue(value);
  if (!normalizedValue) return false;

  const list = document.getElementById(listId);
  if (list && list.options) {
    const match = Array.from(list.options).some((option) => normalizeEquipmentSearchValue(option.value) === normalizedValue);
    if (match) return true;
  }

  if (state.equipmentDescriptionOptionMap.has(normalizedValue)) {
    return true;
  }

  const { description } = parseEquipmentSearchValue(value);
  if (!description) return false;

  const normalizedDescription = normalizeText(description);
  if (!normalizedDescription) return false;

  const equipment = getCachedEquipment() || [];
  return equipment.some((item) => normalizeText(item?.desc || item?.description || '') === normalizedDescription);
}

export function getCreateReservationDateRange() {
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

export function refreshActiveEquipmentSelectionRange() {
  if (!isEquipmentSelectionActive()) return;
  const { start, end } = getCreateReservationDateRange();
  if (!start || !end) return;
  updateEquipmentSelectionContext({ start, end });
}

export function collectSelectedItemBarcodes(items = getSelectedItems()) {
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

export function addDraftEquipmentByBarcode(rawCode, inputElement, options = {}) {
  const { silent = false } = options;
  const normalizedCode = normalizeBarcodeValue(rawCode);
  if (!normalizedCode) {
    return { success: false, message: null };
  }

  const { start, end } = getCreateReservationDateRange();
  if (!start || !end) {
    const message = t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات');
    if (!silent) showToast(message);
    return { success: false, message };
  }

  const currentItems = getSelectedItems();
  const selectedBarcodes = collectSelectedItemBarcodes(currentItems);
  if (selectedBarcodes.has(normalizedCode)) {
    const message = t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز');
    if (!silent) showToast(message);
    return { success: false, message };
  }

  const blockingPackages = getBlockingPackagesForEquipment(normalizedCode, start, end);
  if (blockingPackages.length) {
    const names = blockingPackages.map((pkg) => pkg.name).join(', ');
    const message = t('reservations.toast.equipmentBlockedByPackage', `⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${names}`);
    if (!silent) showToast(message);
    return { success: false, message };
  }

  if (hasEquipmentConflict(normalizedCode, start, end)) {
    const base = t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية');
    const localCodes = getEquipmentConflictingReservationCodes([normalizedCode], start, end);
    const message = buildEquipmentConflictToastMessage(localCodes, base);
    if (!silent) {
      if (localCodes.length) {
        showToast(message);
      } else {
        try {
          const params = new URLSearchParams({ type: 'equipment', id: normalizedCode, start, end });
          apiRequest(`/reservations/availability.php?${params.toString()}`)
            .then((res) => {
              const conflicts = Array.isArray(res?.conflicts) ? res.conflicts : [];
              const remoteCodes = Array.from(new Set(conflicts.map((c) => c?.reservation_code || (c?.reservation_id != null ? `#${c.reservation_id}` : null)).filter(Boolean)));
              const apiMessage = buildEquipmentConflictToastMessage(remoteCodes, base);
              showToast(apiMessage);
            })
            .catch(() => showToast(message));
        } catch (_) {
          showToast(message);
        }
      }
    }
    return { success: false, message };
  }

  const item = findEquipmentByBarcode(normalizedCode);
  if (!item) {
    const message = t('reservations.toast.barcodeNotFound', '❌ الباركود غير موجود');
    if (!silent) showToast(message);
    return { success: false, message };
  }

  const availability = getEquipmentAvailabilityStatus(item);
  if (availability === 'maintenance' || availability === 'retired') {
    const message = getEquipmentUnavailableMessage(availability);
    if (!silent) showToast(message);
    return { success: false, message };
  }

  const equipmentId = resolveEquipmentIdentifier(item);
  if (!equipmentId) {
    const message = t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف');
    if (!silent) showToast(message);
    return { success: false, message };
  }

  addSelectedItem({
    id: equipmentId,
    equipmentId,
    barcode: normalizedCode,
    desc: item.desc,
    qty: 1,
    price: item.price,
    cost: resolveEquipmentCost(item),
    image: resolveItemImage(item)
  });

  if (inputElement) inputElement.value = '';
  renderReservationItems();
  renderDraftReservationSummary();
  const message = t('reservations.toast.equipmentAdded', '✅ تم إضافة المعدة بنجاح');
  if (!silent) showToast(message);
  return { success: true, message, barcode: normalizedCode };
}

export function addDraftEquipmentByDescription(inputElement) {
  if (!inputElement) return;
  const rawValue = inputElement.value.trim();
  if (!rawValue) return;

  const equipmentItem = findEquipmentByDescription(rawValue);
  if (!equipmentItem) {
    showToast(t('reservations.toast.equipmentNameNotFound', '❌ لم يتم العثور على معدة بالاسم المدخل'));
    return;
  }

  const latestRecord = getEquipmentRecordByBarcode(equipmentItem.barcode);
  const availability = getEquipmentAvailabilityStatus(latestRecord || equipmentItem);
  if (availability === 'maintenance' || availability === 'retired') {
    showToast(getEquipmentUnavailableMessage(availability));
    return;
  }

  const normalizedCode = normalizeBarcodeValue(equipmentItem.barcode);
  if (!normalizedCode) {
    showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
    return;
  }

  const equipmentId = resolveEquipmentIdentifier(equipmentItem);
  if (!equipmentId) {
    showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
    return;
  }

  const itemPayload = {
    id: equipmentId,
    equipmentId,
    barcode: normalizedCode,
    desc: equipmentItem.desc || equipmentItem.description || equipmentItem.name || '',
    qty: 1,
    price: Number.isFinite(Number(equipmentItem.price)) ? Number(equipmentItem.price) : 0,
    cost: resolveEquipmentCost(equipmentItem),
    image: resolveItemImage(equipmentItem)
  };

  const { start, end } = getCreateReservationDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
    return;
  }

  const currentItems = getSelectedItems();
  const selectedBarcodes = collectSelectedItemBarcodes(currentItems);
  if (selectedBarcodes.has(normalizedCode)) {
    showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
    return;
  }

  const blockingPackages = getBlockingPackagesForEquipment(normalizedCode, start, end);
  if (blockingPackages.length) {
    const names = blockingPackages.map((pkg) => pkg.name).join(', ');
    showToast(t('reservations.toast.equipmentBlockedByPackage', `⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${names}`));
    return;
  }

  if (hasEquipmentConflict(normalizedCode, start, end)) {
    const base = t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية');
    const localCodes = getEquipmentConflictingReservationCodes([normalizedCode], start, end);
    const message = buildEquipmentConflictToastMessage(localCodes, base);
    if (localCodes.length) {
      showToast(message);
    } else {
      try {
        const params = new URLSearchParams({ type: 'equipment', id: normalizedCode, start, end });
        apiRequest(`/reservations/availability.php?${params.toString()}`)
          .then((res) => {
            const conflicts = Array.isArray(res?.conflicts) ? res.conflicts : [];
            const remoteCodes = Array.from(new Set(conflicts.map((c) => c?.reservation_code || (c?.reservation_id != null ? `#${c.reservation_id}` : null)).filter(Boolean)));
            const apiMessage = buildEquipmentConflictToastMessage(remoteCodes, base);
            showToast(apiMessage);
          })
          .catch(() => showToast(message));
      } catch (_) {
        showToast(message);
      }
    }
    return;
  }

  addSelectedItem(itemPayload);
  renderReservationItems();
  renderDraftReservationSummary();

  showToast(t('reservations.toast.equipmentAdded', '✅ تم إضافة المعدة بنجاح'));

  inputElement.value = '';
}

export function setupEquipmentDescriptionInputs() {
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
    createInput.addEventListener('focus', () => {
      populateEquipmentDescriptionLists();
      if (typeof createInput.showPicker === 'function') {
        try {
          createInput.showPicker();
        } catch (error) {
          // ignore browsers that disallow programmatic picker opening
        }
      }
    });
    createInput.addEventListener('input', tryAutoAdd);
    createInput.addEventListener('change', tryAutoAdd);
    createInput.dataset.listenerAttached = 'true';
  }
}

export function applyEquipmentSelectionButtonState(button, active) {
  if (!button) return;
  const isActive = Boolean(active);
  button.dataset.selectionActive = isActive ? 'true' : 'false';
  button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  button.classList.toggle('reservation-select-equipment-btn--active', isActive);
}

export function getEquipmentModeElements() {
  if (typeof document === 'undefined') {
    return {
      modeRadios: [],
      singleContainer: null,
      packageContainer: null,
      packageSelect: null,
      packageHint: null,
      packageAddButton: null,
    };
  }

  const modeRadios = Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]'));
  const singleContainer = document.querySelector('[data-equipment-mode="single"]');
  const packageContainer = document.querySelector('[data-equipment-mode="package"]');
  const packageSelect = document.getElementById('reservation-package-select');
  const packageHint = document.getElementById('reservation-package-hint');
  const packageAddButton = document.getElementById('add-reservation-package');

  return {
    modeRadios,
    singleContainer,
    packageContainer,
    packageSelect,
    packageHint,
    packageAddButton,
  };
}

export function applyEquipmentModeUi(mode) {
  const normalized = mode === 'package' ? 'package' : 'single';
  const {
    singleContainer,
    packageContainer,
    packageSelect,
  } = getEquipmentModeElements();

  if (singleContainer) {
    singleContainer.hidden = normalized !== 'single';
    singleContainer.setAttribute('aria-hidden', normalized !== 'single' ? 'true' : 'false');
  }

  if (packageContainer) {
    packageContainer.hidden = normalized !== 'package';
    packageContainer.setAttribute('aria-hidden', normalized !== 'package' ? 'true' : 'false');
  }

  const barcodeInput = document.getElementById('equipment-barcode');
  const descriptionInput = document.getElementById('equipment-description');

  const shouldDisableSingleInputs = normalized === 'package';
  if (barcodeInput) {
    barcodeInput.disabled = shouldDisableSingleInputs;
  }
  if (descriptionInput) {
    descriptionInput.disabled = shouldDisableSingleInputs;
  }

  if (packageSelect) {
    packageSelect.disabled = normalized !== 'package' || packageSelect.options.length === 0;
  }

  setEquipmentBookingMode(normalized);

  if (normalized === 'package') {
    populatePackageSelect();
  }
}

function handleEquipmentSelectionAdd(event) {
  if (!event || !event.detail) return;
  if (!document.getElementById('reservation-form')) return;

  const detail = event.detail;
  const selectionMode = detail.selection?.mode || detail.selection?.source || '';
  if (selectionMode === 'package-manager' || selectionMode === 'equipment-packages') {
    return;
  }

  const barcodes = Array.isArray(detail.barcodes) ? detail.barcodes : [];
  const quantityRequested = Number.isInteger(detail.quantity) && detail.quantity > 0 ? detail.quantity : 1;

  const resolvedBarcodes = barcodes.length ? barcodes : (detail.barcode ? [detail.barcode] : []);
  if (!resolvedBarcodes.length) {
    return;
  }

  let addedCount = 0;
  let lastMessage = null;

  const uniqueBarcodes = [];
  const seen = new Set();
  resolvedBarcodes.forEach((code) => {
    const normalized = normalizeBarcodeValue(code);
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      uniqueBarcodes.push(normalized);
    }
  });

  const limit = Math.min(quantityRequested, uniqueBarcodes.length);
  for (let index = 0; index < limit; index += 1) {
    const barcode = uniqueBarcodes[index];
    const result = addDraftEquipmentByBarcode(barcode, null, { silent: true });
    if (result.success) {
      addedCount += 1;
    }
    if (result.message) {
      lastMessage = result.message;
    }
  }

  if (addedCount > 0) {
    const successLabel = t('reservations.toast.equipmentAddedBulk', '✅ تم إضافة {count} معدة إلى الحجز');
    const message = successLabel.replace('{count}', normalizeNumbers(String(addedCount)));
    showToast(message);
  } else if (lastMessage) {
    showToast(lastMessage);
  }
}

function setupEquipmentSelectionButton() {
  const button = document.getElementById('open-equipment-selector');
  if (!button) return;

  if (!button.dataset.listenerAttached) {
    button.addEventListener('click', () => {
      const { start, end } = getCreateReservationDateRange();
      if (!start || !end) {
        showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
        return;
      }

      activateEquipmentSelection({
        mode: 'create',
        source: 'reservation-form',
        returnTab: 'reservations-tab',
        returnSubTab: 'create-tab',
        start,
        end,
      });

      const equipmentTabButton = document.querySelector('[data-tab="equipment-tab"]');
      if (equipmentTabButton) {
        equipmentTabButton.click();
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            document.getElementById('search-equipment')?.focus();
          }, 300);
        });
      } else {
        showToast(t('reservations.toast.equipmentTabUnavailable', '⚠️ تعذر فتح تبويب المعدات حالياً'));
      }
    });
    button.dataset.listenerAttached = 'true';
  }

  if (!button.dataset.selectionObserverAttached) {
    document.addEventListener(EQUIPMENT_SELECTION_EVENTS.change, (event) => {
      applyEquipmentSelectionButtonState(button, event?.detail?.active);
    });
    button.dataset.selectionObserverAttached = 'true';
  }

  applyEquipmentSelectionButtonState(button, isEquipmentSelectionActive());
}

export function setupEquipmentSelectionIntegration() {
  setupEquipmentSelectionButton();

  if (state.equipmentSelectionEventsRegistered || typeof document === 'undefined') {
    return;
  }

  document.addEventListener(EQUIPMENT_SELECTION_EVENTS.requestAdd, handleEquipmentSelectionAdd);
  state.equipmentSelectionEventsRegistered = true;
}

export function setupEquipmentModeControls() {
  const { modeRadios } = getEquipmentModeElements();
  if (!modeRadios.length) {
    return;
  }

  modeRadios.forEach((radio) => {
    if (radio.dataset.listenerAttached) return;
    radio.addEventListener('change', (event) => {
      if (!event.target.checked) return;
      applyEquipmentModeUi(event.target.value);
    });
    radio.dataset.listenerAttached = 'true';
  });

  setupPackageAddHandler();
  setupPackageSelectAutoAdd();

  const activeMode = getEquipmentBookingMode();
  const activeRadio = modeRadios.find((radio) => radio.value === activeMode);
  if (activeRadio) {
    activeRadio.checked = true;
  }
  applyEquipmentModeUi(activeMode);
}
