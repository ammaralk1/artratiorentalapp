import { normalizeNumbers } from '../utils.js';

export function normalizePickerText(value = '') {
  return normalizeNumbers(String(value ?? '')).trim().toLowerCase().replace(/\s+/g, ' ');
}

export function normalizePickerBarcode(value = '') {
  return normalizeNumbers(String(value ?? '')).trim();
}

function normalizePickerMoney(value) {
  const parsed = Number.parseFloat(normalizeNumbers(String(value ?? '')).replace(/,/g, '').trim());
  return Number.isFinite(parsed) && parsed >= 0 ? Math.round(parsed * 100) / 100 : 0;
}

function getEquipmentLabel(item = {}) {
  return item?.desc || item?.description || item?.name || item?.title || item?.barcode || '';
}

function getEquipmentGroupKey(item = {}) {
  const label = normalizePickerText(getEquipmentLabel(item));
  const lessor = normalizePickerText(item?.lessor ?? item?.owner ?? item?.lessorName ?? item?.ownerName ?? '');
  const price = normalizePickerMoney(item?.price ?? item?.unit_price ?? item?.unitPrice ?? 0).toFixed(2);
  const cost = normalizePickerMoney(
    item?.cost
      ?? item?.unit_cost
      ?? item?.unitCost
      ?? item?.rental_cost
      ?? item?.rentalCost
      ?? item?.purchase_price
      ?? item?.purchasePrice
      ?? 0
  ).toFixed(2);
  return `${label}::${lessor}::${price}::${cost}`;
}

function normalizeStatus(value = '') {
  const normalized = normalizePickerText(value);
  if (!normalized) return 'available';
  if (['available', 'متاح', 'جاهز', 'ready'].includes(normalized)) return 'available';
  if (['maintenance', 'صيانة', 'قيد الصيانة'].includes(normalized)) return 'maintenance';
  if (['reserved', 'محجوز'].includes(normalized)) return 'reserved';
  if (['retired', 'خارج الخدمة'].includes(normalized)) return 'retired';
  return normalized;
}

function isSelectableStatus(status) {
  return status !== 'maintenance' && status !== 'retired';
}

export function buildPickerEquipmentEntries(equipment = []) {
  const groups = new Map();

  (Array.isArray(equipment) ? equipment : []).forEach((item) => {
    const barcode = normalizePickerBarcode(item?.barcode);
    if (!barcode) return;
    const key = getEquipmentGroupKey(item) || barcode;
    const label = getEquipmentLabel(item) || barcode;
    const status = normalizeStatus(item?.status);
    const category = item?.category || item?.mainCategory || item?.type || '';
    const subCategory = item?.subCategory || item?.subcategory || item?.sub_category || '';
    const searchValue = normalizePickerText([
      label,
      barcode,
      category,
      subCategory,
      item?.alias,
      item?.lessor,
    ].filter(Boolean).join(' '));

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label,
        category,
        subCategory,
        status,
        image: item?.image || item?.imageUrl || item?.img || '',
        price: normalizePickerMoney(item?.price ?? item?.unit_price ?? item?.unitPrice ?? 0),
        cost: normalizePickerMoney(item?.cost ?? item?.unit_cost ?? item?.unitCost ?? 0),
        records: [],
        barcodes: [],
        availableBarcodes: [],
        totalCount: 0,
        availableCount: 0,
        searchValue: '',
      });
    }

    const group = groups.get(key);
    group.records.push(item);
    group.barcodes.push(barcode);
    group.totalCount += 1;
    if (isSelectableStatus(status)) {
      group.availableBarcodes.push(barcode);
      group.availableCount += 1;
    }
    if (status !== 'available' && group.status === 'available') {
      group.status = status;
    }
    group.searchValue = normalizePickerText(`${group.searchValue} ${searchValue}`);
  });

  return Array.from(groups.values()).sort((a, b) => a.label.localeCompare(b.label, 'ar', { sensitivity: 'base' }));
}

export function filterPickerEquipmentEntries(entries = [], filters = {}) {
  const query = normalizePickerText(filters.query || '');
  const category = normalizePickerText(filters.category || '');
  const status = normalizePickerText(filters.status || '');

  return (Array.isArray(entries) ? entries : []).filter((entry) => {
    if (query && !entry.searchValue.includes(query)) return false;
    if (category && normalizePickerText(entry.category) !== category && normalizePickerText(entry.subCategory) !== category) return false;
    if (status) {
      const effectiveStatus = normalizeStatus(entry.status);
      if (normalizePickerText(effectiveStatus) !== status) return false;
    }
    return true;
  });
}

export function normalizePickerQuantity(value, max = 1) {
  const safeMax = Math.max(0, Number.parseInt(String(max || 0), 10) || 0);
  if (safeMax <= 0) return 0;
  const parsed = Number.parseInt(normalizeNumbers(String(value ?? '')).trim(), 10);
  if (!Number.isInteger(parsed) || parsed <= 0) return 1;
  return Math.min(parsed, safeMax);
}

export function collectPickerBarcodes(entry = {}, quantity = 1) {
  const barcodes = Array.isArray(entry.availableBarcodes) && entry.availableBarcodes.length
    ? entry.availableBarcodes
    : (Array.isArray(entry.barcodes) ? entry.barcodes : []);
  const safeQuantity = normalizePickerQuantity(quantity, barcodes.length);
  return barcodes.slice(0, safeQuantity);
}

export function buildPickerPackagePayload(input = {}) {
  const name = String(input.name || '').trim();
  const code = String(input.code || input.package_code || '').trim();
  const items = Array.isArray(input.items) ? input.items : [];

  if (!name) return { ok: false, reason: 'name' };
  if (!code) return { ok: false, reason: 'code' };
  if (!items.length) return { ok: false, reason: 'items' };

  const normalizedItems = items
    .map((item) => {
      const equipmentId = item?.equipment_id ?? item?.equipmentId ?? item?.id ?? null;
      if (equipmentId == null || String(equipmentId).trim() === '') return null;
      const quantity = Number.parseInt(normalizeNumbers(String(item?.quantity ?? item?.qty ?? '1')), 10);
      const unitPriceRaw = normalizeNumbers(String(item?.unit_price ?? item?.unitPrice ?? item?.price ?? '')).trim();
      const unitPrice = unitPriceRaw === '' ? null : Number.parseFloat(unitPriceRaw);
      const unitCostRaw = normalizeNumbers(String(item?.unit_cost ?? item?.unitCost ?? item?.cost ?? '')).trim();
      const unitCost = unitCostRaw === '' ? null : Number.parseFloat(unitCostRaw);
      return {
        equipment_id: String(equipmentId),
        quantity: Number.isInteger(quantity) && quantity > 0 ? quantity : 1,
        unit_price: Number.isFinite(unitPrice) && unitPrice >= 0 ? unitPrice : null,
        unit_cost: Number.isFinite(unitCost) && unitCost >= 0 ? unitCost : null,
      };
    })
    .filter(Boolean);

  if (!normalizedItems.length) return { ok: false, reason: 'items' };

  const price = normalizePickerMoney(input.price);
  const cost = normalizePickerMoney(input.cost ?? input.package_cost ?? input.packageCost ?? 0);

  return {
    ok: true,
    value: {
      package_code: code,
      name,
      description: String(input.description || '').trim(),
      price,
      cost,
      package_qty: 1,
      is_active: true,
      items: normalizedItems,
    },
  };
}
