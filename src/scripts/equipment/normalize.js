import { normalizeNumbers } from '../utils.js';
import { t } from '../language.js';
import { ApiError } from '../apiClient.js';
import { normalizeAssetUrl } from '../reservationsEquipment.js';

// ── Pure helpers ──────────────────────────────────────────────────────────────

export function hasValue(value) {
  return value !== null && value !== undefined && value !== '';
}

export function parseInteger(value) {
  const num = Number.parseInt(value, 10);
  return Number.isFinite(num) && num >= 0 ? num : 0;
}

export function parseFloatSafe(value) {
  const num = Number.parseFloat(value);
  if (!Number.isFinite(num)) return 0;
  return Math.round(num * 100) / 100;
}

export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Status normalization ──────────────────────────────────────────────────────

export function normalizeStatusValue(value) {
  const normalized = String(value ?? '').trim().toLowerCase();
  switch (normalized) {
    case 'available':
    case 'متاح':
    case 'متوفر':
      return 'available';
    case 'reserved':
    case 'محجوز':
    case 'مؤجرة':
    case 'rented':
      return 'reserved';
    case 'maintenance':
    case 'صيانة':
      return 'maintenance';
    case 'retired':
    case 'متوقف':
    case 'خارج الخدمة':
      return 'retired';
    default:
      return 'available';
  }
}

export function statusToFormValue(value) {
  switch (normalizeStatusValue(value)) {
    case 'available':  return 'متاح';
    case 'reserved':   return 'محجوز';
    case 'maintenance':return 'صيانة';
    case 'retired':    return 'متوقف';
    default:           return 'متاح';
  }
}

export function statusToApi(value) {
  return normalizeStatusValue(value);
}

// ── Text normalization ────────────────────────────────────────────────────────

export function normalizeDescriptionValue(value) {
  return String(value ?? '').trim().toLowerCase();
}

export function normalizeLessorValue(value) {
  return String(value ?? '').trim().toLowerCase();
}

// ── Asset URL ─────────────────────────────────────────────────────────────────

export function getEquipmentImage(item) {
  return normalizeAssetUrl(item?.image || item?.imageUrl || item?.image_url || item?.img || '');
}

// ── Data mapping (pure: no state imports) ────────────────────────────────────

export function toInternalEquipment(raw = {}) {
  const idValue = raw.id ?? raw.equipment_id ?? raw.equipmentId ?? raw.item_id ?? raw.itemId ?? null;
  const description = raw.description ?? raw.desc ?? raw.name ?? '';
  const category = raw.category ?? '';
  const sub = raw.subcategory ?? raw.sub ?? '';
  const qty = parseInteger(raw.quantity ?? raw.qty ?? 0);
  const price = parseFloatSafe(raw.unit_price ?? raw.price ?? 0);
  const cost = parseFloatSafe(
    raw.unit_cost
      ?? raw.unitCost
      ?? raw.cost
      ?? raw.rental_cost
      ?? raw.rentalCost
      ?? raw.purchase_price
      ?? raw.purchasePrice
      ?? 0
  );
  const barcode = normalizeNumbers(String(raw.barcode ?? '').trim());
  const status = normalizeStatusValue(raw.status ?? raw.state ?? raw.status_label ?? raw.statusLabel ?? 'available');
  const imageUrl = normalizeAssetUrl(raw.image_url ?? raw.imageUrl ?? raw.image ?? '');
  const name = raw.name ?? raw.item_name ?? description;
  const lessor =
    raw.lessor ?? raw.owner ?? raw.lessor_name ?? raw.lessorName ?? raw.owner_name ?? raw.ownerName ?? '';

  return {
    id: hasValue(idValue) ? String(idValue) : '',
    category,
    sub,
    desc: description,
    name,
    qty,
    price,
    cost,
    barcode,
    status,
    image: imageUrl,
    imageUrl,
    lessor,
    created_at: raw.created_at ?? null,
    updated_at: raw.updated_at ?? null,
  };
}

export function mapLegacyEquipment(raw = {}) {
  return toInternalEquipment({
    ...raw,
    subcategory: raw.subcategory ?? raw.sub ?? '',
    description: raw.description ?? raw.desc ?? raw.name ?? '',
    quantity: raw.quantity ?? raw.qty ?? 0,
    unit_price: raw.unit_price ?? raw.price ?? 0,
    image_url: raw.image_url ?? raw.imageUrl ?? raw.image ?? '',
  });
}

// ── Payload builder ───────────────────────────────────────────────────────────

export function buildEquipmentPayload({
  category = '',
  subcategory = '',
  description = '',
  quantity = 0,
  unit_price = 0,
  unit_cost = 0,
  barcode = '',
  status = 'متاح',
  image_url = '',
  lessor = '',
} = {}) {
  const cleanedBarcode = normalizeNumbers(String(barcode || '')).trim();
  const normalizedStatus = statusToApi(status);

  return {
    category: category?.trim() || null,
    subcategory: subcategory?.trim() || null,
    name: description?.trim() || null,
    description: description?.trim() || null,
    quantity: parseInteger(quantity),
    unit_price: parseFloatSafe(unit_price),
    unit_cost: parseFloatSafe(unit_cost),
    cost: parseFloatSafe(unit_cost),
    purchase_price: parseFloatSafe(unit_cost),
    rental_cost: parseFloatSafe(unit_cost),
    barcode: cleanedBarcode,
    status: normalizedStatus,
    image_url: image_url?.trim() || null,
    lessor: (typeof lessor === 'string' ? lessor.trim() : '') || null,
  };
}

// ── API error ─────────────────────────────────────────────────────────────────

export function resolveApiErrorMessage(error, key, fallback) {
  if (error instanceof ApiError) {
    const errors = error.payload?.errors;
    if (errors && typeof errors === 'object') {
      const first = Object.values(errors)[0];
      if (Array.isArray(first)) return first[0];
      if (typeof first === 'string') return first;
    }
    if (error.message) return error.message;
  }
  return t(key, fallback);
}

// ── Status badge renderer ─────────────────────────────────────────────────────

export function renderStatus(status) {
  const value = normalizeStatusValue(status);
  const statusConfig = {
    available: {
      label: t('equipment.form.options.available', '✅ متاح'),
      className: 'equipment-status-badge equipment-status-badge--available',
    },
    reserved: {
      label: t('equipment.form.options.booked', '📌 محجوز'),
      className: 'equipment-status-badge equipment-status-badge--reserved',
    },
    maintenance: {
      label: t('equipment.form.options.maintenance', '🛠️ صيانة'),
      className: 'equipment-status-badge equipment-status-badge--maintenance',
    },
    retired: {
      label: t('equipment.form.options.retired', '📦 خارج الخدمة'),
      className: 'equipment-status-badge equipment-status-badge--retired',
    },
  };

  const { label, className } = statusConfig[value] || {
    label: status || '-',
    className: 'equipment-status-badge equipment-status-badge--default',
  };

  return `<span class="${className}">${label}</span>`;
}
