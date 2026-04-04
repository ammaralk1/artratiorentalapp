import { loadData } from '../storage.js';
import { showToast } from '../utils.js';
import { t } from '../language.js';
import { refreshEquipmentFromApi, renderEquipment } from '../equipment.js';
import { normalizeAssetUrl } from '../reservationsEquipment.js';
import { state } from './state.js';
import {
  normalizeBarcodeValue,
  normalizeText,
  normalizeSearchValue,
  buildEquipmentSearchValue,
  parseEquipmentSearchInput,
  normalizeEquipmentStatus,
  escapeHtml,
} from './utils.js';

export function getDefaultSelectionText() {
  return t('maintenance.form.selectedInfo', 'لم يتم اختيار معدة بعد.');
}

export function getEquipmentOptions() {
  const { equipment = [] } = loadData();
  const fallbackName = t('maintenance.table.noName', 'بدون اسم');
  state.equipmentOptions = (equipment || []).map((item) => {
    const rawBarcode = String(item?.barcode ?? '').trim();
    const normalizedBarcode = normalizeBarcodeValue(rawBarcode);
    const quantityValue = Number.parseInt(item?.qty ?? item?.quantity ?? 0, 10);
    const safeQuantity = Number.isFinite(quantityValue) ? Math.max(quantityValue, 0) : 1;
    const imageUrl = normalizeAssetUrl(item?.image || item?.imageUrl || item?.image_url || '');
    const statusLabel = item?.status || 'متاح';
    const description = item?.desc || item?.description || item?.name || fallbackName;
    const searchValue = buildEquipmentSearchValue({
      desc: description,
      displayBarcode: rawBarcode,
      barcode: normalizedBarcode,
    });
    return {
      id: item?.id ?? item?.equipment_id ?? item?.equipmentId ?? null,
      barcode: normalizedBarcode,
      displayBarcode: rawBarcode,
      desc: description,
      status: statusLabel,
      statusNormalized: normalizeEquipmentStatus(statusLabel),
      price: Number(item?.price || item?.unit_price) || 0,
      category: item?.category || '',
      quantity: safeQuantity,
      image: imageUrl,
      searchValue,
      searchValueNormalized: normalizeSearchValue(searchValue),
      descriptionNormalized: normalizeText(description),
    };
  });

  state.equipmentOptions.sort((a, b) => a.desc.localeCompare(b.desc, 'ar', { sensitivity: 'base' }));
  return state.equipmentOptions;
}

export function getOpenTicketsSummary() {
  const set = new Set();
  const map = new Map();

  state.tickets
    .filter((ticket) => ticket.status === 'open')
    .forEach((ticket) => {
      const normalized = normalizeBarcodeValue(ticket.equipmentBarcode);
      if (!normalized) return;
      set.add(normalized);
      map.set(normalized, (map.get(normalized) || 0) + 1);
    });

  return { set, map };
}

export function getOpenTicketCount(barcode) {
  const normalized = normalizeBarcodeValue(barcode);
  if (!normalized) return 0;
  const { map } = getOpenTicketsSummary();
  return map.get(normalized) || 0;
}

export function findEquipmentOptionByBarcode(barcode) {
  const normalized = normalizeBarcodeValue(barcode);
  if (!normalized) return null;
  const options = state.equipmentOptions.length ? state.equipmentOptions : getEquipmentOptions();
  return options.find((option) => option.barcode === normalized) || null;
}

export function findEquipmentOptionByDescription(term) {
  const options = state.equipmentOptions.length ? state.equipmentOptions : getEquipmentOptions();
  if (!options.length) return null;

  const normalizedSearch = normalizeSearchValue(term);
  if (normalizedSearch) {
    const exactSearchMatch = options.find((option) => option.searchValueNormalized === normalizedSearch);
    if (exactSearchMatch) return exactSearchMatch;
  }

  const { description, barcode } = parseEquipmentSearchInput(term);

  if (barcode) {
    const normalizedBarcode = normalizeBarcodeValue(barcode);
    if (normalizedBarcode) {
      const barcodeMatch = options.find((option) => option.barcode === normalizedBarcode);
      if (barcodeMatch) return barcodeMatch;
    }
  }

  const normalizedDescription = normalizeText(description || term);
  if (!normalizedDescription) return null;

  const exactDescription = options.find((option) => option.descriptionNormalized === normalizedDescription);
  if (exactDescription) return exactDescription;

  return options.find((option) => option.descriptionNormalized.includes(normalizedDescription)) || null;
}

export function isOptionBlocked(option, openCountsMap = null) {
  if (!option) return true;

  const normalizedBarcode = option.barcode;
  const quantity = Number.isFinite(option.quantity) ? option.quantity : 0;
  const countsMap = openCountsMap || getOpenTicketsSummary().map;
  const openCount = countsMap.get(normalizedBarcode) || 0;

  if (quantity <= 0) return true;
  if (quantity === 1) return option.statusNormalized === 'maintenance' || openCount >= 1;
  return openCount >= quantity;
}

export function clearSelectedEquipment({ keepInputs = false } = {}) {
  const hidden = document.getElementById('maintenance-selected-barcode');
  const barcodeInput = document.getElementById('maintenance-equipment-barcode');
  const searchInput = document.getElementById('maintenance-equipment-search');
  const info = document.getElementById('maintenance-selected-info');

  if (hidden) hidden.value = '';
  if (!keepInputs) {
    if (barcodeInput) barcodeInput.value = '';
    if (searchInput) searchInput.value = '';
  }

  if (info) {
    info.textContent = getDefaultSelectionText();
    info.classList.remove('maintenance-selected-info--has-selection');
  }

  state.currentSelection = null;
}

export function updateSelectedInfo(option) {
  const info = document.getElementById('maintenance-selected-info');
  if (!info) return;
  const barcodeLabel = t('maintenance.info.barcodeLabel', 'باركود');
  const notAvailable = t('maintenance.report.notAvailable', 'غير متوفر');
  const unitsLabel = t('maintenance.info.unitsAvailable', 'الوحدات المتاحة الآن');
  const categoryLabel = t('maintenance.info.categoryLabel', 'القسم');
  const displayBarcode = option.displayBarcode || option.barcode || notAvailable;
  const normalizedBarcode = option.barcode;
  const totalQuantity = Number.isFinite(option.quantity) ? option.quantity : 0;
  const openCount = getOpenTicketCount(normalizedBarcode);
  const availableQuantity = Math.max(totalQuantity - openCount, 0);
  const categoryLine = option.category ? `
    <div class="maintenance-selected-info__meta">${categoryLabel}: <strong>${escapeHtml(option.category)}</strong></div>
  ` : '';
  const quantityLine = totalQuantity > 0 ? `
    <div class="maintenance-selected-info__meta">
      ${unitsLabel}: <strong>${availableQuantity}</strong> / ${totalQuantity}
    </div>
  ` : '';
  const imageMarkup = option.image
    ? `<img class="maintenance-selected-info__image" src="${escapeHtml(option.image)}" alt="${escapeHtml(option.desc)}">`
    : `<div class="maintenance-selected-info__placeholder" aria-hidden="true">🎥</div>`;

  info.innerHTML = `
    <div class="maintenance-selected-info__media">${imageMarkup}</div>
    <div class="maintenance-selected-info__body">
      <div class="maintenance-selected-info__name">${escapeHtml(option.desc)}</div>
      <div class="maintenance-selected-info__meta">${barcodeLabel}: <strong>${escapeHtml(displayBarcode)}</strong></div>
      ${quantityLine}
      ${categoryLine}
    </div>
  `;
  info.classList.add('maintenance-selected-info--has-selection');
}

export function selectEquipment(option, { silent = false } = {}) {
  if (!option) return false;
  if (isOptionBlocked(option)) {
    if (!silent) {
      showToast(t('maintenance.toast.equipmentBlocked', '⚠️ هذه المعدة قيد الصيانة ولا يمكن اختيارها حالياً'));
    }
    return false;
  }

  const hidden = document.getElementById('maintenance-selected-barcode');
  const barcodeInput = document.getElementById('maintenance-equipment-barcode');
  const searchInput = document.getElementById('maintenance-equipment-search');

  if (hidden) hidden.value = option.barcode;
  if (barcodeInput) barcodeInput.value = option.displayBarcode || option.barcode;
  if (searchInput) searchInput.value = option.searchValue || option.desc;
  updateSelectedInfo(option);
  state.currentSelection = option;
  return true;
}

export function selectEquipmentByBarcode(value, { showFeedback = true } = {}) {
  const option = findEquipmentOptionByBarcode(value);
  if (!option) {
    if (showFeedback) showToast(t('maintenance.toast.equipmentNotFoundBarcode', '❌ لم يتم العثور على معدة بهذا الباركود'));
    return false;
  }
  return selectEquipment(option, { silent: !showFeedback });
}

export function selectEquipmentByDescription(value, { showFeedback = true } = {}) {
  const option = findEquipmentOptionByDescription(value);
  if (!option) {
    if (showFeedback) showToast(t('maintenance.toast.equipmentNotFoundName', '❌ لم يتم العثور على معدة بالاسم المدخل'));
    return false;
  }
  return selectEquipment(option, { silent: !showFeedback });
}

export function populateEquipmentInputs() {
  const datalist = document.getElementById('maintenance-equipment-options');
  const barcodeInput = document.getElementById('maintenance-equipment-barcode');
  const searchInput = document.getElementById('maintenance-equipment-search');

  const options = getEquipmentOptions();
  const { map: openCounts } = getOpenTicketsSummary();

  if (datalist) {
    datalist.innerHTML = options
      .map((option) => {
        const valueAttr = escapeHtml(option.searchValue || option.desc);
        return `<option value="${valueAttr}"></option>`;
      })
      .join('');
  }

  const hidden = document.getElementById('maintenance-selected-barcode');
  if (hidden && hidden.value) {
    const current = findEquipmentOptionByBarcode(hidden.value);
    if (!current || isOptionBlocked(current, openCounts)) {
      clearSelectedEquipment({ keepInputs: true });
      if (current && isOptionBlocked(current, openCounts)) {
        showToast(t('maintenance.toast.equipmentBecameBlocked', '⚠️ هذه المعدة أصبحت قيد الصيانة ولا يمكن اختيارها'));
      }
    } else {
      selectEquipment(current, { silent: true });
    }
  } else {
    clearSelectedEquipment({ keepInputs: true });
  }

  if (barcodeInput && !barcodeInput.dataset.listenerAttached) {
    barcodeInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (!selectEquipmentByBarcode(barcodeInput.value)) {
          clearSelectedEquipment({ keepInputs: true });
        }
      }
    });
    barcodeInput.dataset.listenerAttached = 'true';
  }

  if (searchInput && !searchInput.dataset.listenerAttached) {
    const handleSelection = () => {
      if (!searchInput.value) {
        clearSelectedEquipment({ keepInputs: true });
        return;
      }
      if (!selectEquipmentByDescription(searchInput.value)) {
        clearSelectedEquipment({ keepInputs: true });
      }
    };

    searchInput.addEventListener('change', handleSelection);
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSelection();
      }
    });
    searchInput.dataset.listenerAttached = 'true';
  }
}

export async function refreshEquipmentData() {
  try {
    await refreshEquipmentFromApi({ showToastOnError: false });
  } catch (error) {
    console.error('❌ [maintenance] refreshEquipmentData failed', error);
  } finally {
    renderEquipment();
    populateEquipmentInputs();
  }
}
