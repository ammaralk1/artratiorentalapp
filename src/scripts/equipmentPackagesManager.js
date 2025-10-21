import { loadData, saveData } from './storage.js';
import { apiRequest } from './apiClient.js';
import { showToast, normalizeNumbers } from './utils.js';
import { t } from './language.js';
import {
  setCachedPackages,
  normalizeBarcodeValue,
} from './reservations/state.js';
import {
  activateEquipmentSelection,
  clearEquipmentSelection,
  EQUIPMENT_SELECTION_EVENTS,
} from './reservations/equipmentSelection.js';
import { resolvePackageItems } from './reservationsPackages.js';

let packagesState = [];
let packageItemsDraft = [];
let editingPackageId = null;
let selectionDraft = [];
let selectionActive = false;
let eventsRegistered = false;

const elements = {};

function cacheElements() {
  elements.form = document.getElementById('equipment-package-form');
  elements.hiddenId = document.getElementById('equipment-package-id');
  elements.nameInput = document.getElementById('equipment-package-name');
  elements.codeInput = document.getElementById('equipment-package-code');
  elements.priceInput = document.getElementById('equipment-package-price');
  elements.descriptionInput = document.getElementById('equipment-package-description');
  elements.openSelector = document.getElementById('equipment-package-open-selector');
  elements.selectionWrapper = document.getElementById('equipment-package-selection-active');
  elements.selectionCounter = document.getElementById('equipment-package-selection-counter');
  elements.applySelection = document.getElementById('equipment-package-apply-selection');
  elements.cancelSelection = document.getElementById('equipment-package-cancel-selection');
  elements.itemsTableBody = document.querySelector('#equipment-package-items-table tbody');
  elements.itemsEmptyMessage = document.getElementById('equipment-package-items-empty');
  elements.resetButton = document.getElementById('equipment-package-reset');
  elements.submitButton = document.getElementById('equipment-package-submit');
  elements.tableBody = document.getElementById('equipment-packages-table-body');
  elements.emptyRow = document.getElementById('equipment-packages-empty-row');
  elements.countBadge = document.getElementById('equipment-packages-count');
}

function getEquipmentSnapshot() {
  const { equipment = [] } = loadData() || {};
  return Array.isArray(equipment) ? equipment : [];
}

function buildEquipmentIndexById() {
  const index = new Map();
  getEquipmentSnapshot().forEach((item) => {
    const id = item?.id ?? item?.equipment_id ?? item?.equipmentId ?? null;
    if (id == null) return;
    index.set(String(id), item);
  });
  return index;
}

function buildEquipmentIndexByBarcode() {
  const index = new Map();
  getEquipmentSnapshot().forEach((item) => {
    const barcode = normalizeBarcodeValue(item?.barcode);
    if (barcode && !index.has(barcode)) {
      index.set(barcode, item);
    }
  });
  return index;
}

function setPackagesState(list, { persist = false } = {}) {
  packagesState = Array.isArray(list) ? list.map(mapPackageRecord) : [];
  renderPackagesTable();
  if (persist) {
    saveData({ packages: packagesState });
    setCachedPackages(packagesState);
    document.dispatchEvent(new CustomEvent('packages:changed', {
      detail: { packages: packagesState },
    }));
  }
}

function mapPackageRecord(raw = {}) {
  const items = normalizePackageItems(raw.items ?? raw.equipment_ids ?? raw.equipmentIds ?? []);
  return {
    id: raw.id != null ? String(raw.id) : '',
    package_code: raw.package_code ?? raw.code ?? raw.slug ?? '',
    slug: raw.slug ?? null,
    name: raw.name ?? raw.title ?? raw.label ?? '',
    description: raw.description ?? '',
    price: normalizePrice(raw.price ?? raw.total_price ?? raw.package_price ?? 0),
    is_active: normalizeBoolean(raw.is_active ?? raw.active ?? true),
    items,
    created_at: raw.created_at ?? null,
    updated_at: raw.updated_at ?? null,
  };
}

function normalizePackageItems(items) {
  if (!Array.isArray(items)) {
    items = [];
  }

  return items
    .map((item) => {
      if (item == null) return null;
      if (typeof item === 'number' || typeof item === 'string') {
        const equipmentId = String(item).trim();
        if (!equipmentId) return null;
        return {
          equipment_id: equipmentId,
          quantity: 1,
          unit_price: null,
        };
      }

      if (typeof item === 'object') {
        const equipmentId = item.equipment_id ?? item.equipmentId ?? item.id ?? item.item_id ?? item.itemId ?? null;
        if (equipmentId == null) return null;
        const quantity = Number.isFinite(Number(item.quantity ?? item.qty)) ? Number(item.quantity ?? item.qty) : 1;
        const unitPrice = Number.isFinite(Number(item.unit_price ?? item.price)) ? Number(item.unit_price ?? item.price) : null;
        return {
          equipment_id: String(equipmentId),
          quantity: quantity > 0 ? quantity : 1,
          unit_price: unitPrice,
        };
      }

      return null;
    })
    .filter(Boolean);
}

function normalizePrice(value) {
  const numeric = Number.parseFloat(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.round(numeric * 100) / 100;
}

function normalizeBoolean(value) {
  if (value === true || value === false) return value;
  if (value == null) return true;
  const normalized = String(value).trim().toLowerCase();
  return !(normalized === '0' || normalized === 'false' || normalized === 'no');
}

function renderDraftItems() {
  if (!elements.itemsTableBody || !elements.itemsEmptyMessage) return;
  if (packageItemsDraft.length === 0) {
    elements.itemsTableBody.innerHTML = '';
    elements.itemsEmptyMessage.hidden = false;
    return;
  }

  const equipmentIndex = buildEquipmentIndexById();

  const rows = packageItemsDraft.map((item, index) => {
    const equipment = equipmentIndex.get(String(item.equipment_id));
    const name = equipment?.desc || equipment?.name || t('equipment.packages.items.unknown', 'معدة بدون اسم');
    const barcode = equipment?.barcode ? normalizeNumbers(String(equipment.barcode)) : '';
    const quantity = normalizeNumbers(String(item.quantity ?? 1));
    const description = barcode ? `${name} — ${barcode}` : name;
    return `
      <tr data-package-item-index="${index}">
        <td>${description}</td>
        <td>${quantity}</td>
        <td>
          <button type="button" class="btn btn-outline-danger btn-sm" data-action="remove-item" data-index="${index}">🗑️</button>
        </td>
      </tr>
    `;
  });

  elements.itemsTableBody.innerHTML = rows.join('');
  elements.itemsEmptyMessage.hidden = true;
}

function renderPackagesTable() {
  if (!elements.tableBody || !elements.emptyRow) return;

  if (!packagesState.length) {
    elements.tableBody.innerHTML = '';
    elements.tableBody.appendChild(elements.emptyRow);
    elements.emptyRow.hidden = false;
    if (elements.countBadge) {
      elements.countBadge.textContent = '0';
    }
    return;
  }

  const equipmentIndex = buildEquipmentIndexById();

  const rows = packagesState.map((pkg) => {
    const resolvedItems = resolvePackageItems({ ...pkg, items: pkg.items });
    const displayItems = resolvedItems.map((item) => {
      const equipment = equipmentIndex.get(String(item.equipmentId ?? item.equipment_id));
      const name = equipment?.desc || equipment?.name || item.desc || t('equipment.packages.items.unknown', 'معدة بدون اسم');
      const qty = normalizeNumbers(String(item.qty ?? item.quantity ?? 1));
      const barcode = item.barcode || equipment?.barcode;
      const barcodePart = barcode ? ` (${normalizeNumbers(String(barcode))})` : '';
      return `<li>${name}${barcodePart} × ${qty}</li>`;
    });

    const itemCount = resolvedItems.reduce((sum, item) => sum + (Number(item.qty ?? item.quantity ?? 1) || 0), 0);
    const priceDisplay = `${normalizeNumbers(pkg.price.toFixed(2))} ${t('reservations.create.summary.currency', 'SR')}`;

    return `
      <tr data-package-id="${pkg.id}">
        <td>${pkg.name || '—'}</td>
        <td>${pkg.package_code || '—'}</td>
        <td>${priceDisplay}</td>
        <td>
          <details>
            <summary>${normalizeNumbers(String(itemCount || 0))}</summary>
            <ul class="equipment-package-items-summary">${displayItems.join('')}</ul>
          </details>
        </td>
        <td>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-primary" data-action="edit-package" data-id="${pkg.id}">✏️</button>
            <button type="button" class="btn btn-sm btn-outline-danger" data-action="delete-package" data-id="${pkg.id}">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  });

  elements.tableBody.innerHTML = rows.join('');
  elements.emptyRow.hidden = true;
  if (elements.countBadge) {
    elements.countBadge.textContent = normalizeNumbers(String(packagesState.length));
  }
}

function resetPackageForm() {
  editingPackageId = null;
  packageItemsDraft = [];
  selectionDraft = [];
  if (elements.hiddenId) elements.hiddenId.value = '';
  if (elements.nameInput) elements.nameInput.value = '';
  if (elements.codeInput) elements.codeInput.value = '';
  if (elements.priceInput) elements.priceInput.value = '';
  if (elements.descriptionInput) elements.descriptionInput.value = '';
  if (elements.submitButton) {
    elements.submitButton.textContent = t('equipment.packages.form.actions.save', '💾 حفظ الحزمة');
  }
  renderDraftItems();
  updateSelectionUi(false);
}

function loadPackageIntoForm(pkg) {
  editingPackageId = pkg.id || null;
  packageItemsDraft = pkg.items.map((item) => ({ ...item }));
  selectionDraft = [];
  if (elements.hiddenId) elements.hiddenId.value = editingPackageId || '';
  if (elements.nameInput) elements.nameInput.value = pkg.name || '';
  if (elements.codeInput) elements.codeInput.value = pkg.package_code || '';
  if (elements.priceInput) elements.priceInput.value = pkg.price != null ? String(pkg.price) : '';
  if (elements.descriptionInput) elements.descriptionInput.value = pkg.description || '';
  if (elements.submitButton) {
    elements.submitButton.textContent = t('equipment.packages.form.actions.update', '💾 تحديث الحزمة');
  }
  renderDraftItems();
  updateSelectionUi(false);
}

function updateSelectionUi(forceActive = selectionActive) {
  selectionActive = forceActive;
  if (elements.selectionWrapper) {
    if (selectionActive) {
      elements.selectionWrapper.hidden = false;
    } else {
      elements.selectionWrapper.hidden = true;
    }
  }
  if (elements.openSelector) {
    elements.openSelector.disabled = selectionActive;
  }
  if (elements.applySelection) {
    elements.applySelection.disabled = !selectionActive || selectionDraft.length === 0;
  }
  if (elements.cancelSelection) {
    elements.cancelSelection.disabled = !selectionActive;
  }
  updateSelectionCounter();
}

function updateSelectionCounter() {
  if (!elements.selectionCounter) return;
  if (!selectionActive) {
    elements.selectionCounter.textContent = t('equipment.packages.selection.counter', 'لم يتم اختيار عناصر بعد.');
    if (elements.applySelection) {
      elements.applySelection.disabled = true;
    }
    return;
  }

  const total = selectionDraft.reduce((sum, entry) => sum + (Number(entry.quantity) || 0), 0);
  if (total > 0) {
    const countText = normalizeNumbers(String(total));
    elements.selectionCounter.textContent = t('equipment.packages.selection.counterWithValue', 'تم اختيار {count} عنصر/عناصر')
      .replace('{count}', countText);
    if (elements.applySelection) {
      elements.applySelection.disabled = false;
    }
  } else {
    elements.selectionCounter.textContent = t('equipment.packages.selection.waiting', 'اختر المعدات من القائمة ثم اضغط "إضافة العناصر للحزمة"');
    if (elements.applySelection) {
      elements.applySelection.disabled = true;
    }
  }
}

function handleSelectionChange(event) {
  const detail = event?.detail || {};
  const active = Boolean(detail.active);
  const selection = detail.selection || detail.previous || {};
  const mode = selection?.mode || selection?.source || '';

  if (mode !== 'package-manager' && mode !== 'equipment-packages') {
    if (!active && selectionActive) {
      selectionDraft = [];
      updateSelectionUi(false);
    }
    return;
  }

  if (active) {
    selectionDraft = [];
    updateSelectionUi(true);
    return;
  }

  const reason = detail.reason || 'manual';
  if (reason !== 'package-commit') {
    selectionDraft = [];
  }
  updateSelectionUi(false);
  if (reason === 'package-commit' || reason === 'package-cancel' || reason === 'package-finish-button') {
    focusPackageForm();
  }
}

function handleSelectionAdd(event) {
  const detail = event?.detail;
  if (!detail) return;
  const selection = detail.selection || {};
  const mode = selection?.mode || selection?.source || '';
  if (mode !== 'package-manager' && mode !== 'equipment-packages') {
    return;
  }

  const barcodes = Array.isArray(detail.barcodes) ? detail.barcodes : [];
  const quantityRequested = Number.isInteger(detail.quantity) && detail.quantity > 0 ? detail.quantity : 1;
  const resolved = barcodes.length ? barcodes : (detail.barcode ? [detail.barcode] : []);
  if (!resolved.length) return;

  const barcodeIndex = buildEquipmentIndexByBarcode();
  const unique = [];
  const seen = new Set();
  resolved.forEach((code) => {
    const normalized = normalizeBarcodeValue(code);
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      unique.push(normalized);
    }
  });

  const limit = Math.min(unique.length, quantityRequested);
  let added = 0;
  for (let i = 0; i < limit; i += 1) {
    const code = unique[i];
    const equipment = barcodeIndex.get(code);
    if (!equipment) {
      continue;
    }
    const equipmentId = equipment?.id ?? equipment?.equipment_id ?? equipment?.equipmentId ?? null;
    if (equipmentId == null) {
      continue;
    }
    const existing = selectionDraft.find((entry) => entry.equipment_id === String(equipmentId));
    if (existing) {
      existing.quantity += 1;
    } else {
      selectionDraft.push({
        equipment_id: String(equipmentId),
        quantity: 1,
        unit_price: Number.isFinite(Number(equipment?.price)) ? Number(equipment.price) : null,
      });
    }
    added += 1;
  }

  if (added > 0) {
    updateSelectionCounter();
  } else {
    showToast(t('equipment.packages.selection.noMatch', '⚠️ تعذر ربط المعدات المختارة بالحزم، تحقق من بيانات المعدات'), 4000);
  }
}

function applySelectionDraft() {
  if (!selectionDraft.length) {
    showToast(t('equipment.packages.selection.empty', '⚠️ لم يتم اختيار أي معدات بعد'));
    return;
  }

  selectionDraft.forEach((entry) => {
    const existing = packageItemsDraft.find((item) => item.equipment_id === entry.equipment_id);
    if (existing) {
      existing.quantity += entry.quantity;
    } else {
      packageItemsDraft.push({
        equipment_id: entry.equipment_id,
        quantity: entry.quantity,
        unit_price: entry.unit_price ?? null,
      });
    }
  });

  renderDraftItems();
  showToast(t('equipment.packages.selection.applied', '✅ تمت إضافة المعدات المحددة إلى الحزمة'));
  selectionDraft = [];
  updateSelectionUi(false);
  clearEquipmentSelection('package-commit');
  focusPackageForm();
}

function cancelSelectionDraft() {
  selectionDraft = [];
  updateSelectionUi(false);
  clearEquipmentSelection('package-cancel');
  focusPackageForm();
}

function focusPackageForm() {
  if (elements.form) {
    elements.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      elements.nameInput?.focus();
    }, 200);
  }
}

function buildPackagePayload() {
  const name = elements.nameInput?.value.trim();
  const code = elements.codeInput?.value.trim();
  const description = elements.descriptionInput?.value.trim() ?? '';
  const priceValue = elements.priceInput?.value ?? '';
  const price = Number.parseFloat(normalizeNumbers(priceValue));

  if (!name) {
    showToast(t('equipment.packages.validation.nameRequired', '⚠️ يرجى إدخال اسم الحزمة'));
    return null;
  }

  if (!code) {
    showToast(t('equipment.packages.validation.codeRequired', '⚠️ يرجى إدخال كود الحزمة'));
    return null;
  }

  if (!packageItemsDraft.length) {
    showToast(t('equipment.packages.validation.itemsRequired', '⚠️ أضف عنصرًا واحدًا على الأقل للحزمة'));
    return null;
  }

  const normalizedItems = packageItemsDraft.map((item) => ({
    equipment_id: item.equipment_id,
    quantity: Number.isFinite(Number(item.quantity)) ? Number(item.quantity) : 1,
    unit_price: item.unit_price != null && Number.isFinite(Number(item.unit_price)) ? Number(item.unit_price) : null,
  }));

  return {
    package_code: code,
    name,
    description,
    price: Number.isFinite(price) ? price : 0,
    is_active: true,
    items: normalizedItems,
  };
}

async function handlePackageSubmit(event) {
  event.preventDefault();
  if (!elements.form) return;

  const payload = buildPackagePayload();
  if (!payload) return;

  try {
    let response;
    if (editingPackageId) {
      response = await apiRequest(`/packages/?id=${encodeURIComponent(editingPackageId)}`, {
        method: 'PATCH',
        body: payload,
      });
      showToast(t('equipment.packages.toast.updated', '✅ تم تحديث الحزمة بنجاح'));
    } else {
      response = await apiRequest('/packages/', {
        method: 'POST',
        body: payload,
      });
      showToast(t('equipment.packages.toast.created', '✅ تم إنشاء الحزمة بنجاح'));
    }

    const created = mapPackageRecord(response?.data ?? response);
    const existingIndex = packagesState.findIndex((pkg) => pkg.id === created.id);
    if (existingIndex >= 0) {
      packagesState.splice(existingIndex, 1, created);
    } else {
      packagesState = [created, ...packagesState];
    }
    setPackagesState(packagesState, { persist: true });
    resetPackageForm();
  } catch (error) {
    console.error('[equipmentPackagesManager] handlePackageSubmit error', error);
    const message = error?.message || t('equipment.packages.toast.saveFailed', '❌ تعذر حفظ الحزمة');
    showToast(message, 4000);
  }
}

function handleItemsTableClick(event) {
  const button = event.target.closest('[data-action="remove-item"]');
  if (!button) return;
  const index = Number(button.dataset.index);
  if (Number.isNaN(index)) return;
  packageItemsDraft = packageItemsDraft.filter((_, idx) => idx !== index);
  renderDraftItems();
}

async function handlePackagesTableClick(event) {
  const editButton = event.target.closest('[data-action="edit-package"]');
  if (editButton) {
    const id = editButton.dataset.id;
    if (!id) return;
    const pkg = packagesState.find((entry) => entry.id === id);
    if (!pkg) return;
    loadPackageIntoForm(pkg);
    return;
  }

  const deleteButton = event.target.closest('[data-action="delete-package"]');
  if (deleteButton) {
    const id = deleteButton.dataset.id;
    if (!id) return;
    const confirmed = window.confirm(t('equipment.packages.confirm.delete', 'هل أنت متأكد من حذف الحزمة؟'));
    if (!confirmed) return;

    try {
      await apiRequest(`/packages/?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      packagesState = packagesState.filter((pkg) => pkg.id !== id);
      setPackagesState(packagesState, { persist: true });
      showToast(t('equipment.packages.toast.deleted', '🗑️ تم حذف الحزمة بنجاح'));
    } catch (error) {
      console.error('[equipmentPackagesManager] delete package error', error);
      showToast(t('equipment.packages.toast.deleteFailed', '❌ تعذر حذف الحزمة'), 4000);
    }
  }
}

async function refreshPackagesFromApi() {
  try {
    const response = await apiRequest('/packages/?all=1');
    const data = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
    setPackagesState(data, { persist: true });
  } catch (error) {
    console.warn('[equipmentPackagesManager] Failed to fetch packages from API, falling back to cache', error);
    const { packages = [] } = loadData() || {};
    setPackagesState(packages, { persist: false });
  }
}

function hydrateFromStore() {
  const { packages = [] } = loadData() || {};
  if (Array.isArray(packages) && packages.length) {
    setPackagesState(packages, { persist: false });
  } else {
    setPackagesState([], { persist: false });
  }
  renderDraftItems();
  updateSelectionUi(false);
}

function startSelection() {
  if (selectionActive) {
    updateSelectionUi(true);
    return;
  }

  selectionDraft = [];
  updateSelectionUi(true);
  activateEquipmentSelection({
    mode: 'package-manager',
    source: 'equipment-packages',
    activatedAt: Date.now(),
  });

  const equipmentTabButton = document.querySelector('[data-tab="equipment-tab"]');
  if (equipmentTabButton) {
    equipmentTabButton.click();
  }

  window.requestAnimationFrame(() => {
    setTimeout(() => {
      document.getElementById('search-equipment')?.focus();
      const list = document.getElementById('equipment-list');
      if (list) {
        list.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  });
}

function wireEvents() {
  if (!elements.form) return;
  elements.form.addEventListener('submit', handlePackageSubmit);
  elements.itemsTableBody?.addEventListener('click', handleItemsTableClick);
  elements.resetButton?.addEventListener('click', () => {
    resetPackageForm();
  });
  elements.tableBody?.addEventListener('click', handlePackagesTableClick);

  elements.openSelector?.addEventListener('click', (event) => {
    event.preventDefault();
    startSelection();
  });

  elements.applySelection?.addEventListener('click', (event) => {
    event.preventDefault();
    applySelectionDraft();
  });

  elements.cancelSelection?.addEventListener('click', (event) => {
    event.preventDefault();
    cancelSelectionDraft();
  });

  if (!eventsRegistered) {
    document.addEventListener(EQUIPMENT_SELECTION_EVENTS.change, handleSelectionChange);
    document.addEventListener(EQUIPMENT_SELECTION_EVENTS.requestAdd, handleSelectionAdd);
    eventsRegistered = true;
  }
}

export function initEquipmentPackages() {
  if (typeof document === 'undefined') return;
  cacheElements();
  if (!elements.form) return;
  hydrateFromStore();
  wireEvents();
  refreshPackagesFromApi();
}
