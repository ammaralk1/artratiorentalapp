import { apiRequest } from '../apiClient.js';
import { t } from '../language.js';
import { loadData, saveData } from '../storage.js';
import { normalizeNumbers, showToast } from '../utils.js';
import { setCachedPackages } from '../reservations/state.js';
import {
  buildPickerEquipmentEntries,
  buildPickerPackagePayload,
  collectPickerBarcodes,
  filterPickerEquipmentEntries,
  normalizePickerQuantity,
} from './helpers.js';

const PICKER_MODAL_ID = 'equipmentPickerModal';

let activeContext = null;
let packageDraftItems = [];
let editingPackageId = null;
let packageRecords = [];
let equipmentEntries = [];

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getModalElement() {
  return document.getElementById(PICKER_MODAL_ID);
}

function getEquipmentSnapshot() {
  const { equipment = [] } = loadData() || {};
  return Array.isArray(equipment) ? equipment : [];
}

function getPackagesSnapshot() {
  const { packages = [] } = loadData() || {};
  return Array.isArray(packages) ? packages : [];
}

function normalizePackageRecord(raw = {}) {
  const id = raw.id ?? raw.packageId ?? raw.package_id ?? raw.package_code ?? raw.code ?? '';
  return {
    ...raw,
    id: id != null ? String(id) : '',
    package_code: raw.package_code ?? raw.code ?? '',
    name: raw.name ?? raw.title ?? raw.label ?? '',
    description: raw.description ?? '',
    price: Number.isFinite(Number(raw.price ?? raw.total_price ?? raw.package_price))
      ? Number(raw.price ?? raw.total_price ?? raw.package_price)
      : 0,
    cost: Number.isFinite(Number(raw.cost ?? raw.package_cost ?? raw.packageCost ?? raw.unit_cost ?? raw.unitCost))
      ? Number(raw.cost ?? raw.package_cost ?? raw.packageCost ?? raw.unit_cost ?? raw.unitCost)
      : 0,
    package_qty: Number.isFinite(Number(raw.package_qty ?? raw.packageQty)) && Number(raw.package_qty ?? raw.packageQty) > 0
      ? Number(raw.package_qty ?? raw.packageQty)
      : 1,
    items: normalizePackageItems(raw.items ?? raw.equipment_ids ?? raw.equipmentIds ?? []),
  };
}

function normalizePackageItems(items = []) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      if (item == null) return null;
      if (typeof item === 'string' || typeof item === 'number') {
        return { equipment_id: String(item), quantity: 1, unit_price: null };
      }
      const equipmentId = item.equipment_id ?? item.equipmentId ?? item.id ?? item.item_id ?? item.itemId ?? null;
      if (equipmentId == null) return null;
      const quantity = Number.parseInt(normalizeNumbers(String(item.quantity ?? item.qty ?? '1')), 10);
      const unitPrice = Number.parseFloat(normalizeNumbers(String(item.unit_price ?? item.unitPrice ?? item.price ?? '')));
      const unitCost = Number.parseFloat(normalizeNumbers(String(item.unit_cost ?? item.unitCost ?? item.cost ?? '')));
      return {
        equipment_id: String(equipmentId),
        quantity: Number.isInteger(quantity) && quantity > 0 ? quantity : 1,
        unit_price: Number.isFinite(unitPrice) && unitPrice >= 0 ? unitPrice : null,
        unit_cost: Number.isFinite(unitCost) && unitCost >= 0 ? unitCost : null,
      };
    })
    .filter(Boolean);
}

function getEquipmentByIdMap() {
  const map = new Map();
  getEquipmentSnapshot().forEach((item) => {
    const id = item?.id ?? item?.equipment_id ?? item?.equipmentId ?? null;
    if (id != null) map.set(String(id), item);
  });
  return map;
}

function getEquipmentLabel(item = {}) {
  return item?.desc || item?.description || item?.name || item?.title || item?.barcode || t('equipment.table.unknown', 'معدة بدون اسم');
}

function ensurePickerModal() {
  if (typeof document === 'undefined') return null;
  const existing = getModalElement();
  if (existing) return existing;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="modal fade equipment-picker-modal" id="${PICKER_MODAL_ID}" tabindex="-1" aria-labelledby="equipmentPickerModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h5 class="modal-title" id="equipmentPickerModalTitle">${escapeHtml(t('equipmentPicker.title', 'اختيار المعدات والحزم'))}</h5>
              <p class="equipment-picker__subtitle" id="equipment-picker-context-label"></p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="${escapeHtml(t('actions.close', 'إغلاق'))}"></button>
          </div>
          <div class="modal-body equipment-picker">
            <div class="equipment-picker__tabs" role="tablist" aria-label="${escapeHtml(t('equipmentPicker.tabs.label', 'أقسام اختيار المعدات'))}">
              <button type="button" class="equipment-picker__tab active" data-picker-tab="equipment">${escapeHtml(t('equipmentPicker.tabs.equipment', 'المعدات'))}</button>
              <button type="button" class="equipment-picker__tab" data-picker-tab="packages">${escapeHtml(t('equipmentPicker.tabs.packages', 'الحزم'))}</button>
              <button type="button" class="equipment-picker__tab" data-picker-tab="manage-packages">${escapeHtml(t('equipmentPicker.tabs.managePackages', 'إدارة الحزم'))}</button>
            </div>

            <section class="equipment-picker__panel active" data-picker-panel="equipment">
              <div class="equipment-picker__toolbar">
                <input type="search" class="ui-input form-control" id="equipment-picker-search" placeholder="${escapeHtml(t('equipmentPicker.search.placeholder', 'ابحث بالاسم أو الباركود'))}">
                <select class="ui-select form-select" id="equipment-picker-status">
                  <option value="">${escapeHtml(t('equipmentPicker.filters.allStatus', 'كل الحالات'))}</option>
                  <option value="available">${escapeHtml(t('reservations.equipment.status.available', 'متاح'))}</option>
                  <option value="reserved">${escapeHtml(t('reservations.equipment.status.reserved', 'محجوز'))}</option>
                  <option value="maintenance">${escapeHtml(t('reservations.equipment.status.maintenance', 'صيانة'))}</option>
                  <option value="retired">${escapeHtml(t('reservations.equipment.status.retired', 'خارج الخدمة'))}</option>
                </select>
              </div>
              <div class="equipment-picker__grid" id="equipment-picker-equipment-list"></div>
            </section>

            <section class="equipment-picker__panel" data-picker-panel="packages" hidden>
              <div class="equipment-picker__toolbar">
                <input type="search" class="ui-input form-control" id="equipment-picker-package-search" placeholder="${escapeHtml(t('equipmentPicker.packages.search', 'ابحث في الحزم'))}">
              </div>
              <div class="equipment-picker__package-list" id="equipment-picker-package-list"></div>
            </section>

            <section class="equipment-picker__panel" data-picker-panel="manage-packages" hidden>
              <form id="equipment-picker-package-form" class="equipment-picker__package-form">
                <input type="hidden" id="equipment-picker-package-id">
                <div class="equipment-picker__form-grid">
                  <div>
                    <label class="form-label" for="equipment-picker-package-name">${escapeHtml(t('equipment.packages.form.labels.name', 'اسم الحزمة'))}</label>
                    <input type="text" class="ui-input form-control" id="equipment-picker-package-name">
                  </div>
                  <div>
                    <label class="form-label" for="equipment-picker-package-code">${escapeHtml(t('equipment.packages.form.labels.code', 'كود الحزمة'))}</label>
                    <input type="text" class="ui-input form-control" id="equipment-picker-package-code">
                  </div>
                  <div>
                    <label class="form-label" for="equipment-picker-package-price">${escapeHtml(t('equipment.packages.form.labels.price', 'سعر الحزمة'))}</label>
                    <input type="number" min="0" step="0.01" class="ui-input form-control" id="equipment-picker-package-price">
                  </div>
                  <div>
                    <label class="form-label" for="equipment-picker-package-cost">${escapeHtml(t('equipment.packages.form.labels.cost', 'تكلفة الحزمة'))}</label>
                    <input type="number" min="0" step="0.01" class="ui-input form-control" id="equipment-picker-package-cost">
                  </div>
                </div>
                <label class="form-label" for="equipment-picker-package-description">${escapeHtml(t('equipment.packages.form.labels.description', 'الوصف'))}</label>
                <textarea class="ui-textarea form-control" id="equipment-picker-package-description" rows="2"></textarea>
                <div class="equipment-picker__package-item-row">
                  <select class="ui-select form-select" id="equipment-picker-package-item-select"></select>
                  <input type="number" min="1" step="1" class="ui-input form-control" id="equipment-picker-package-item-qty" value="1">
                  <button type="button" class="ui-button ui-button--outline btn btn-outline-secondary" id="equipment-picker-package-item-add">${escapeHtml(t('actions.add', 'إضافة'))}</button>
                </div>
                <div class="equipment-picker__draft-items" id="equipment-picker-package-draft-items"></div>
                <div class="equipment-picker__form-actions">
                  <button type="submit" class="ui-button ui-button--primary btn btn-primary" id="equipment-picker-package-submit">${escapeHtml(t('equipment.packages.form.actions.save', 'حفظ الحزمة'))}</button>
                  <button type="button" class="ui-button ui-button--outline btn btn-outline-secondary" id="equipment-picker-package-reset">${escapeHtml(t('actions.reset', 'إعادة تعيين'))}</button>
                </div>
              </form>
              <div class="equipment-picker__manage-list" id="equipment-picker-manage-package-list"></div>
            </section>
          </div>
          <div class="modal-footer">
            <button type="button" class="ui-button ui-button--outline btn btn-outline-secondary" data-bs-dismiss="modal">${escapeHtml(t('actions.done', 'تم'))}</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper.firstElementChild);
  wirePickerEvents();
  return getModalElement();
}

function setActiveTab(tabName) {
  const modal = getModalElement();
  if (!modal) return;
  modal.querySelectorAll('[data-picker-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.pickerTab === tabName);
  });
  modal.querySelectorAll('[data-picker-panel]').forEach((panel) => {
    const active = panel.dataset.pickerPanel === tabName;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
}

function renderEquipmentList() {
  const modal = getModalElement();
  const list = modal?.querySelector('#equipment-picker-equipment-list');
  if (!list) return;

  const query = modal.querySelector('#equipment-picker-search')?.value || '';
  const status = modal.querySelector('#equipment-picker-status')?.value || '';
  const filtered = filterPickerEquipmentEntries(equipmentEntries, { query, status });

  if (!filtered.length) {
    list.innerHTML = `<div class="equipment-picker__empty">${escapeHtml(t('equipmentPicker.empty.equipment', 'لا توجد معدات مطابقة.'))}</div>`;
    return;
  }

  list.innerHTML = filtered.map((entry, index) => {
    const canAdd = entry.availableCount > 0;
    const countLabel = `${normalizeNumbers(String(entry.availableCount))}/${normalizeNumbers(String(entry.totalCount))}`;
    const image = entry.image
      ? `<img src="${escapeHtml(entry.image)}" alt="${escapeHtml(entry.label)}" loading="lazy">`
      : `<div class="equipment-picker__placeholder" aria-hidden="true">▣</div>`;
    const options = Array.from({ length: Math.max(1, entry.availableCount) }, (_, optionIndex) => {
      const value = optionIndex + 1;
      return `<option value="${value}">${normalizeNumbers(String(value))}</option>`;
    }).join('');

    return `
      <article class="equipment-picker__card" data-picker-equipment-index="${index}">
        <div class="equipment-picker__media">${image}</div>
        <div class="equipment-picker__card-body">
          <h6>${escapeHtml(entry.label)}</h6>
          <p>${escapeHtml(entry.category || entry.subCategory || '')}</p>
          <span class="equipment-picker__badge">${escapeHtml(t('equipmentPicker.availableCount', 'المتاح'))}: ${countLabel}</span>
        </div>
        <div class="equipment-picker__card-actions">
          <select class="ui-select form-select form-select-sm" data-picker-quantity ${canAdd ? '' : 'disabled'}>${options}</select>
          <button type="button" class="ui-button ui-button--primary btn btn-primary btn-sm" data-picker-action="add-equipment" data-entry-key="${escapeHtml(entry.key)}" ${canAdd ? '' : 'disabled'}>
            ${escapeHtml(t('equipmentPicker.actions.addEquipment', 'إضافة'))}
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function renderPackageList() {
  const modal = getModalElement();
  const list = modal?.querySelector('#equipment-picker-package-list');
  if (!list) return;
  const query = normalizeNumbers(String(modal.querySelector('#equipment-picker-package-search')?.value || '')).trim().toLowerCase();
  const filtered = packageRecords.filter((pkg) => {
    if (!query) return true;
    return `${pkg.name} ${pkg.package_code} ${pkg.description}`.toLowerCase().includes(query);
  });

  if (!filtered.length) {
    list.innerHTML = `<div class="equipment-picker__empty">${escapeHtml(t('equipmentPicker.empty.packages', 'لا توجد حزم مطابقة.'))}</div>`;
    return;
  }

  list.innerHTML = filtered.map((pkg) => `
    <article class="equipment-picker__package-card" data-picker-package-id="${escapeHtml(pkg.id)}">
      <div>
        <h6>${escapeHtml(pkg.name || pkg.package_code)}</h6>
        <p>${escapeHtml(pkg.description || pkg.package_code || '')}</p>
        <span class="equipment-picker__badge">${escapeHtml(t('equipment.packages.form.labels.price', 'سعر الحزمة'))}: ${normalizeNumbers(String(pkg.price.toFixed(2)))} ${escapeHtml(t('reservations.create.summary.currency', 'SR'))}</span>
        <span class="equipment-picker__badge">${escapeHtml(t('equipment.packages.form.labels.cost', 'تكلفة الحزمة'))}: ${normalizeNumbers(String((pkg.cost || 0).toFixed(2)))} ${escapeHtml(t('reservations.create.summary.currency', 'SR'))}</span>
      </div>
      <button type="button" class="ui-button ui-button--primary btn btn-primary btn-sm" data-picker-action="add-package" data-package-id="${escapeHtml(pkg.id)}">
        ${escapeHtml(t('equipmentPicker.actions.addPackage', 'إضافة الحزمة'))}
      </button>
    </article>
  `).join('');
}

function renderPackageItemSelect() {
  const select = document.getElementById('equipment-picker-package-item-select');
  if (!select) return;
  const equipment = getEquipmentSnapshot()
    .filter((item) => item?.id ?? item?.equipment_id ?? item?.equipmentId)
    .sort((a, b) => getEquipmentLabel(a).localeCompare(getEquipmentLabel(b), 'ar', { sensitivity: 'base' }));
  select.innerHTML = `<option value="">${escapeHtml(t('equipmentPicker.manage.selectEquipment', 'اختر معدة'))}</option>${equipment.map((item) => {
    const id = item.id ?? item.equipment_id ?? item.equipmentId;
    const barcode = item.barcode ? ` | ${normalizeNumbers(String(item.barcode))}` : '';
    return `<option value="${escapeHtml(String(id))}">${escapeHtml(`${getEquipmentLabel(item)}${barcode}`)}</option>`;
  }).join('')}`;
}

function renderPackageDraftItems() {
  const host = document.getElementById('equipment-picker-package-draft-items');
  if (!host) return;
  const equipmentMap = getEquipmentByIdMap();
  if (!packageDraftItems.length) {
    host.innerHTML = `<div class="equipment-picker__empty">${escapeHtml(t('equipmentPicker.manage.noItems', 'لم تتم إضافة معدات للحزمة بعد.'))}</div>`;
    return;
  }
  host.innerHTML = packageDraftItems.map((item, index) => {
    const equipment = equipmentMap.get(String(item.equipment_id));
    const label = equipment ? getEquipmentLabel(equipment) : item.equipment_id;
    return `
      <div class="equipment-picker__draft-item" data-draft-index="${index}">
        <span>${escapeHtml(label)} × ${normalizeNumbers(String(item.quantity || 1))}</span>
        <button type="button" class="btn btn-sm btn-outline-danger" data-picker-action="remove-draft-item" data-index="${index}">${escapeHtml(t('actions.remove', 'إزالة'))}</button>
      </div>
    `;
  }).join('');
}

function renderManagePackageList() {
  const host = document.getElementById('equipment-picker-manage-package-list');
  if (!host) return;
  if (!packageRecords.length) {
    host.innerHTML = `<div class="equipment-picker__empty">${escapeHtml(t('equipmentPicker.empty.packages', 'لا توجد حزم مطابقة.'))}</div>`;
    return;
  }
  host.innerHTML = packageRecords.map((pkg) => `
    <div class="equipment-picker__manage-package" data-picker-package-id="${escapeHtml(pkg.id)}">
      <div>
        <strong>${escapeHtml(pkg.name || pkg.package_code)}</strong>
        <span>${escapeHtml(pkg.package_code || '')}</span>
        <small>${escapeHtml(t('equipment.packages.form.labels.price', 'سعر الحزمة'))}: ${normalizeNumbers(String(pkg.price.toFixed(2)))} | ${escapeHtml(t('equipment.packages.form.labels.cost', 'تكلفة الحزمة'))}: ${normalizeNumbers(String((pkg.cost || 0).toFixed(2)))}</small>
      </div>
      <button type="button" class="btn btn-sm btn-outline-secondary" data-picker-action="edit-package" data-package-id="${escapeHtml(pkg.id)}">${escapeHtml(t('actions.edit', 'تعديل'))}</button>
    </div>
  `).join('');
}

function renderAll() {
  equipmentEntries = buildPickerEquipmentEntries(getEquipmentSnapshot());
  packageRecords = getPackagesSnapshot().map(normalizePackageRecord);
  renderEquipmentList();
  renderPackageList();
  renderPackageItemSelect();
  renderPackageDraftItems();
  renderManagePackageList();
}

function resetPackageForm() {
  editingPackageId = null;
  packageDraftItems = [];
  const ids = {
    'equipment-picker-package-id': '',
    'equipment-picker-package-name': '',
    'equipment-picker-package-code': '',
    'equipment-picker-package-price': '',
    'equipment-picker-package-cost': '',
    'equipment-picker-package-description': '',
  };
  Object.entries(ids).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.value = value;
  });
  const submit = document.getElementById('equipment-picker-package-submit');
  if (submit) submit.textContent = t('equipment.packages.form.actions.save', 'حفظ الحزمة');
  renderPackageDraftItems();
}

function loadPackageForm(pkg) {
  editingPackageId = pkg.id;
  packageDraftItems = normalizePackageItems(pkg.items);
  const values = {
    'equipment-picker-package-id': pkg.id || '',
    'equipment-picker-package-name': pkg.name || '',
    'equipment-picker-package-code': pkg.package_code || '',
    'equipment-picker-package-price': pkg.price != null ? String(pkg.price) : '',
    'equipment-picker-package-cost': pkg.cost != null ? String(pkg.cost) : '',
    'equipment-picker-package-description': pkg.description || '',
  };
  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.value = value;
  });
  const submit = document.getElementById('equipment-picker-package-submit');
  if (submit) submit.textContent = t('equipment.packages.form.actions.update', 'تحديث الحزمة');
  renderPackageDraftItems();
  setActiveTab('manage-packages');
}

async function persistPackage(payload) {
  const request = editingPackageId
    ? apiRequest(`/packages/?id=${encodeURIComponent(editingPackageId)}`, { method: 'PATCH', body: payload })
    : apiRequest('/packages/', { method: 'POST', body: payload });
  const response = await request;
  const saved = normalizePackageRecord(response?.data ?? response ?? { ...payload, id: editingPackageId || payload.package_code });
  const next = packageRecords.filter((pkg) => pkg.id !== saved.id);
  packageRecords = [saved, ...next];
  saveData({ packages: packageRecords });
  setCachedPackages(packageRecords);
  await refreshPackagesFromApi();
  document.dispatchEvent(new CustomEvent('packages:changed', { detail: { packages: packageRecords } }));
}

async function refreshPackagesFromApi() {
  try {
    const response = await apiRequest('/packages/?all=1');
    const data = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
    packageRecords = data.map(normalizePackageRecord);
    saveData({ packages: packageRecords });
    setCachedPackages(packageRecords);
  } catch (_) {
    packageRecords = getPackagesSnapshot().map(normalizePackageRecord);
  }
}

async function handlePackageSubmit(event) {
  event.preventDefault();
  const result = buildPickerPackagePayload({
    name: document.getElementById('equipment-picker-package-name')?.value || '',
    code: document.getElementById('equipment-picker-package-code')?.value || '',
    description: document.getElementById('equipment-picker-package-description')?.value || '',
    price: document.getElementById('equipment-picker-package-price')?.value || '',
    cost: document.getElementById('equipment-picker-package-cost')?.value || '',
    items: packageDraftItems,
  });
  if (!result.ok) {
    const messages = {
      name: t('equipment.packages.validation.nameRequired', 'يرجى إدخال اسم الحزمة'),
      code: t('equipment.packages.validation.codeRequired', 'يرجى إدخال كود الحزمة'),
      items: t('equipment.packages.validation.itemsRequired', 'أضف عنصرًا واحدًا على الأقل للحزمة'),
    };
    showToast(messages[result.reason] || messages.items);
    return;
  }
  try {
    await persistPackage(result.value);
    showToast(editingPackageId
      ? t('equipment.packages.toast.updated', 'تم تحديث الحزمة بنجاح')
      : t('equipment.packages.toast.created', 'تم إنشاء الحزمة بنجاح'));
    resetPackageForm();
    renderAll();
  } catch (error) {
    console.error('[equipmentPicker] package save failed', error);
    showToast(error?.message || t('equipment.packages.toast.saveFailed', 'تعذر حفظ الحزمة'));
  }
}

function addDraftPackageItem() {
  const select = document.getElementById('equipment-picker-package-item-select');
  const qtyInput = document.getElementById('equipment-picker-package-item-qty');
  const equipmentId = select?.value || '';
  if (!equipmentId) {
    showToast(t('equipmentPicker.manage.selectEquipmentFirst', 'يرجى اختيار معدة أولاً'));
    return;
  }
  const quantity = normalizePickerQuantity(qtyInput?.value || '1', 999) || 1;
  const existing = packageDraftItems.find((item) => String(item.equipment_id) === String(equipmentId));
  if (existing) {
    existing.quantity = Number(existing.quantity || 1) + quantity;
  } else {
    const equipment = getEquipmentByIdMap().get(String(equipmentId));
    const unitPrice = Number(equipment?.price ?? equipment?.unit_price ?? equipment?.unitPrice);
    const unitCost = Number(equipment?.cost ?? equipment?.unit_cost ?? equipment?.unitCost ?? equipment?.rental_cost ?? equipment?.purchase_price);
    packageDraftItems.push({
      equipment_id: String(equipmentId),
      quantity,
      unit_price: Number.isFinite(unitPrice) && unitPrice >= 0 ? unitPrice : null,
      unit_cost: Number.isFinite(unitCost) && unitCost >= 0 ? unitCost : null,
    });
  }
  if (select) select.value = '';
  if (qtyInput) qtyInput.value = '1';
  renderPackageDraftItems();
}

function handleListClick(event) {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const addEquipmentButton = target.closest('[data-picker-action="add-equipment"]');
  if (addEquipmentButton) {
    const card = addEquipmentButton.closest('[data-picker-equipment-index]');
    const key = addEquipmentButton.dataset.entryKey || '';
    const entry = equipmentEntries.find((candidate) => candidate.key === key);
    if (!entry) return;
    const qty = normalizePickerQuantity(card?.querySelector('[data-picker-quantity]')?.value || '1', entry.availableCount);
    const barcodes = collectPickerBarcodes(entry, qty);
    activeContext?.onAddEquipment?.({ barcodes, quantity: qty, entry });
    return;
  }

  const addPackageButton = target.closest('[data-picker-action="add-package"]');
  if (addPackageButton) {
    activeContext?.onAddPackage?.(addPackageButton.dataset.packageId || '');
    return;
  }

  const editPackageButton = target.closest('[data-picker-action="edit-package"]');
  if (editPackageButton) {
    const pkg = packageRecords.find((entry) => entry.id === editPackageButton.dataset.packageId);
    if (pkg) loadPackageForm(pkg);
    return;
  }

  const removeDraftButton = target.closest('[data-picker-action="remove-draft-item"]');
  if (removeDraftButton) {
    const index = Number.parseInt(removeDraftButton.dataset.index || '-1', 10);
    if (Number.isInteger(index) && index >= 0) {
      packageDraftItems.splice(index, 1);
      renderPackageDraftItems();
    }
  }
}

function wirePickerEvents() {
  const modal = getModalElement();
  if (!modal || modal.dataset.pickerEventsAttached === 'true') return;
  modal.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const tabButton = target?.closest('[data-picker-tab]');
    if (tabButton) {
      setActiveTab(tabButton.dataset.pickerTab || 'equipment');
      return;
    }
    handleListClick(event);
  });
  modal.querySelector('#equipment-picker-search')?.addEventListener('input', renderEquipmentList);
  modal.querySelector('#equipment-picker-status')?.addEventListener('change', renderEquipmentList);
  modal.querySelector('#equipment-picker-package-search')?.addEventListener('input', renderPackageList);
  modal.querySelector('#equipment-picker-package-form')?.addEventListener('submit', handlePackageSubmit);
  modal.querySelector('#equipment-picker-package-item-add')?.addEventListener('click', addDraftPackageItem);
  modal.querySelector('#equipment-picker-package-reset')?.addEventListener('click', resetPackageForm);
  modal.dataset.pickerEventsAttached = 'true';
}

function updateContextLabel() {
  const label = document.getElementById('equipment-picker-context-label');
  if (!label) return;
  label.textContent = activeContext?.label || t('equipmentPicker.context.default', 'اختر المعدات أو الحزم ثم أكمل النموذج.');
}

function showModal(modal) {
  if (window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modal).show();
    return;
  }
  modal.classList.add('show');
  modal.style.display = 'block';
  modal.removeAttribute('aria-hidden');
}

export async function openEquipmentPicker(context = {}) {
  if (typeof document === 'undefined') return;
  activeContext = context;
  const modal = ensurePickerModal();
  if (!modal) return;
  updateContextLabel();
  resetPackageForm();
  renderAll();
  await refreshPackagesFromApi();
  renderAll();
  setActiveTab('equipment');
  showModal(modal);
  setTimeout(() => {
    document.getElementById('equipment-picker-search')?.focus();
  }, 150);
}
