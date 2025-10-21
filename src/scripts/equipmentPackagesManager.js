import { loadData, saveData } from './storage.js';
import { apiRequest } from './apiClient.js';
import { showToast, normalizeNumbers } from './utils.js';
import { t } from './language.js';
import { setCachedPackages } from './reservations/state.js';
import { resolvePackageItems } from './reservationsPackages.js';

let packagesState = [];
let packageItemsDraft = [];
let editingPackageId = null;
let elements = {};

function cacheElements() {
  elements = {
    form: document.getElementById('equipment-package-form'),
    hiddenId: document.getElementById('equipment-package-id'),
    nameInput: document.getElementById('equipment-package-name'),
    codeInput: document.getElementById('equipment-package-code'),
    priceInput: document.getElementById('equipment-package-price'),
    descriptionInput: document.getElementById('equipment-package-description'),
    equipmentSelect: document.getElementById('equipment-package-item-select'),
    quantityInput: document.getElementById('equipment-package-item-qty'),
    addItemButton: document.getElementById('equipment-package-add-item'),
    itemsTableBody: document.querySelector('#equipment-package-items-table tbody'),
    itemsEmptyMessage: document.getElementById('equipment-package-items-empty'),
    resetButton: document.getElementById('equipment-package-reset'),
    submitButton: document.getElementById('equipment-package-submit'),
    tableBody: document.getElementById('equipment-packages-table-body'),
    emptyRow: document.getElementById('equipment-packages-empty-row'),
    countBadge: document.getElementById('equipment-packages-count'),
  };
}

function getEquipmentSnapshot() {
  const { equipment = [] } = loadData() || {};
  if (!Array.isArray(equipment)) return [];
  return equipment;
}

function refreshEquipmentOptions() {
  if (!elements.equipmentSelect) return;
  const equipmentList = getEquipmentSnapshot();
  const selectedValue = elements.equipmentSelect.value;
  const options = ['<option value="" disabled data-i18n data-i18n-key="equipment.packages.items.placeholders.equipment">اختر المعدة</option>'];

  equipmentList
    .slice()
    .sort((a, b) => {
      const nameA = String(a?.desc || a?.name || '').toLowerCase();
      const nameB = String(b?.desc || b?.name || '').toLowerCase();
      return nameA.localeCompare(nameB, 'ar', { sensitivity: 'base' });
    })
    .forEach((item) => {
      const id = item?.id ?? item?.equipment_id ?? item?.equipmentId ?? null;
      if (id == null) {
        return;
      }
      const value = String(id);
      const label = `${item.desc || item.name || value}${item.barcode ? ` — ${normalizeNumbers(String(item.barcode))}` : ''}`;
      options.push(`<option value="${value}">${label}</option>`);
    });

  elements.equipmentSelect.innerHTML = options.join('');
  if (selectedValue && Array.from(elements.equipmentSelect.options).some((opt) => opt.value === selectedValue)) {
    elements.equipmentSelect.value = selectedValue;
  } else {
    elements.equipmentSelect.value = '';
  }
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

  const equipmentIndex = new Map();
  getEquipmentSnapshot().forEach((item) => {
    const id = item?.id ?? item?.equipment_id;
    if (id == null) return;
    equipmentIndex.set(String(id), item);
  });

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

  const equipmentIndex = new Map();
  getEquipmentSnapshot().forEach((item) => {
    const id = item?.id ?? item?.equipment_id;
    if (id == null) return;
    equipmentIndex.set(String(id), item);
  });

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
  if (elements.hiddenId) elements.hiddenId.value = '';
  if (elements.nameInput) elements.nameInput.value = '';
  if (elements.codeInput) elements.codeInput.value = '';
  if (elements.priceInput) elements.priceInput.value = '';
  if (elements.descriptionInput) elements.descriptionInput.value = '';
  if (elements.equipmentSelect) elements.equipmentSelect.value = '';
  if (elements.quantityInput) elements.quantityInput.value = '1';
  if (elements.submitButton) {
    elements.submitButton.textContent = t('equipment.packages.form.actions.save', '💾 حفظ الحزمة');
  }
  renderDraftItems();
}

function loadPackageIntoForm(pkg) {
  editingPackageId = pkg.id || null;
  packageItemsDraft = pkg.items.map((item) => ({ ...item }));
  if (elements.hiddenId) elements.hiddenId.value = editingPackageId || '';
  if (elements.nameInput) elements.nameInput.value = pkg.name || '';
  if (elements.codeInput) elements.codeInput.value = pkg.package_code || '';
  if (elements.priceInput) elements.priceInput.value = pkg.price != null ? String(pkg.price) : '';
  if (elements.descriptionInput) elements.descriptionInput.value = pkg.description || '';
  if (elements.submitButton) {
    elements.submitButton.textContent = t('equipment.packages.form.actions.update', '💾 تحديث الحزمة');
  }
  renderDraftItems();
}

function handleAddItemClick(event) {
  event.preventDefault();
  if (!elements.equipmentSelect || !elements.quantityInput) return;
  const equipmentId = elements.equipmentSelect.value;
  if (!equipmentId) {
    showToast(t('equipment.packages.items.validation.selectEquipment', '⚠️ يرجى اختيار المعدة أولاً'), 3500);
    return;
  }
  const quantityValue = Number.parseInt(elements.quantityInput.value, 10);
  const quantity = Number.isFinite(quantityValue) && quantityValue > 0 ? quantityValue : 1;

  const existing = packageItemsDraft.find((item) => String(item.equipment_id) === String(equipmentId));
  if (existing) {
    existing.quantity += quantity;
  } else {
    packageItemsDraft.push({
      equipment_id: String(equipmentId),
      quantity,
      unit_price: null,
    });
  }

  renderDraftItems();
  elements.quantityInput.value = '1';
}

function handleItemsTableClick(event) {
  const button = event.target.closest('[data-action="remove-item"]');
  if (!button) return;
  const index = Number(button.dataset.index);
  if (Number.isNaN(index)) return;
  packageItemsDraft = packageItemsDraft.filter((_, idx) => idx !== index);
  renderDraftItems();
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
}

function wireEvents() {
  if (!elements.form) return;
  elements.form.addEventListener('submit', handlePackageSubmit);
  elements.addItemButton?.addEventListener('click', handleAddItemClick);
  elements.itemsTableBody?.addEventListener('click', handleItemsTableClick);
  elements.resetButton?.addEventListener('click', () => {
    resetPackageForm();
  });
  elements.tableBody?.addEventListener('click', handlePackagesTableClick);

  document.addEventListener('equipment:changed', () => {
    refreshEquipmentOptions();
  });
}

export function initEquipmentPackages() {
  if (typeof document === 'undefined') return;
  cacheElements();
  if (!elements.form) return;
  refreshEquipmentOptions();
  hydrateFromStore();
  wireEvents();
  refreshPackagesFromApi();
}
