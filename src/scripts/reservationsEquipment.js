import { apiRequest } from './apiClient.js';
import { isLocalDashboardFixtureEnabled } from './fixtureRuntime.js';
import { loadData, saveData } from './storage.js';
import { normalizeNumbers } from './utils.js';
import { normalizeBarcodeValue } from './reservations/state.js';

export { normalizeBarcodeValue } from './reservations/state.js';

const STATUS_ALIASES = new Map([
  ['available', 'available'],
  ['متاح', 'available'],
  ['متوفر', 'available'],
  ['جاهز', 'available'],
  ['ready', 'available'],
  ['reserved', 'reserved'],
  ['محجوز', 'reserved'],
  ['محجوزة', 'reserved'],
  ['maintenance', 'maintenance'],
  ['صيانة', 'maintenance'],
  ['under_maintenance', 'maintenance'],
  ['retired', 'retired'],
  ['متوقف', 'retired'],
  ['خارج الخدمة', 'retired'],
]);

const UNAVAILABLE_STATUSES = new Set(['maintenance', 'reserved', 'retired']);
const LEGACY_SIRV_BASE = 'https://art-ratio.sirv.com';
const CLOUDFLARE_ASSETS_BASE = 'https://assets.art-ratio.com';

let equipmentCatalogRequest = null;

function normalizeEquipmentStatus(status) {
  const normalized = String(status ?? '')
    .trim()
    .toLowerCase();
  if (!normalized) return 'available';
  return STATUS_ALIASES.get(normalized) || 'available';
}

function resolveEquipmentRecord(input) {
  if (!input) return null;
  if (typeof input === 'object') {
    return input;
  }
  return findEquipmentByBarcode(input);
}

export function getEquipmentAvailabilityStatus(input) {
  const record = resolveEquipmentRecord(input);
  if (!record) return 'available';
  return normalizeEquipmentStatus(record.status || record.state || record.statusLabel || record.status_label);
}

export function isEquipmentAvailable(input) {
  return !UNAVAILABLE_STATUSES.has(getEquipmentAvailabilityStatus(input));
}

export function isEquipmentReserved(input) {
  return getEquipmentAvailabilityStatus(input) === 'reserved';
}

export function isEquipmentInMaintenance(input) {
  return getEquipmentAvailabilityStatus(input) === 'maintenance';
}

export function isEquipmentUnavailable(input) {
  return UNAVAILABLE_STATUSES.has(getEquipmentAvailabilityStatus(input));
}

export function resolveItemImage(item = {}) {
  const raw = item.image || item.imageUrl || item.image_url || item.img || '';
  return normalizeAssetUrl(raw);
}

export function normalizeAssetUrl(value = '') {
  const url = String(value || '').trim();
  if (!url) return '';
  if (url.startsWith(LEGACY_SIRV_BASE)) {
    return `${CLOUDFLARE_ASSETS_BASE}${url.slice(LEGACY_SIRV_BASE.length)}`;
  }
  return url;
}

export function resolveEquipmentPrice(item = {}) {
  const candidates = [item.price, item.daily_rate, item.dailyRate, item.rate];
  for (const value of candidates) {
    const number = Number(value);
    if (Number.isFinite(number)) {
      return number;
    }
  }
  return 0;
}

export function resolveEquipmentCost(item = {}) {
  const candidates = [
    item.cost,
    item.unit_cost,
    item.unitCost,
    item.rental_cost,
    item.rentalCost,
    item.purchase_price,
    item.purchasePrice,
  ];
  for (const value of candidates) {
    const number = Number(value);
    if (Number.isFinite(number)) {
      return number;
    }
  }
  return 0;
}

function parseEquipmentNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(String(value ?? '').replace(/,/g, '').trim());
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeEquipmentApiStatus(value) {
  return normalizeEquipmentStatus(value);
}

function mapEquipmentApiRecord(raw = {}) {
  const description = raw.description ?? raw.desc ?? raw.name ?? raw.item_name ?? '';
  const cost = parseEquipmentNumber(
    raw.unit_cost
      ?? raw.unitCost
      ?? raw.cost
      ?? raw.rental_cost
      ?? raw.rentalCost
      ?? raw.purchase_price
      ?? raw.purchasePrice,
    0,
  );
  const imageUrl = normalizeAssetUrl(raw.image_url ?? raw.imageUrl ?? raw.image ?? raw.img ?? '');
  return {
    ...raw,
    id: raw.id ?? raw.equipment_id ?? raw.equipmentId ?? raw.item_id ?? raw.itemId ?? '',
    desc: description,
    description,
    name: raw.name ?? raw.item_name ?? description,
    barcode: normalizeNumbers(String(raw.barcode ?? '')).trim(),
    qty: Number.parseInt(String(raw.quantity ?? raw.qty ?? 0), 10) || 0,
    quantity: Number.parseInt(String(raw.quantity ?? raw.qty ?? 0), 10) || 0,
    price: parseEquipmentNumber(raw.unit_price ?? raw.price ?? raw.daily_rate ?? raw.dailyRate ?? raw.rate, 0),
    cost,
    unit_cost: cost,
    rental_cost: cost,
    purchase_price: cost,
    image: imageUrl,
    imageUrl,
    image_url: imageUrl,
    lessor: raw.lessor ?? raw.owner ?? raw.lessor_name ?? raw.lessorName ?? raw.owner_name ?? raw.ownerName ?? '',
    status: normalizeEquipmentApiStatus(raw.status ?? raw.state ?? raw.status_label ?? raw.statusLabel ?? 'available'),
  };
}

function extractEquipmentPayload(response) {
  const payload = response?.data ?? response;
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.records)) return payload.records;
  return [];
}

export async function ensureEquipmentCatalogLoaded({ force = false } = {}) {
  const snapshot = loadData();
  if (!force && Array.isArray(snapshot?.equipment) && snapshot.equipment.length > 0) {
    return snapshot.equipment;
  }

  if (isLocalDashboardFixtureEnabled()) {
    return Array.isArray(snapshot?.equipment) ? snapshot.equipment : [];
  }

  if (!equipmentCatalogRequest) {
    equipmentCatalogRequest = apiRequest('/equipment/?all=1')
      .then((response) => {
        const equipment = extractEquipmentPayload(response).map(mapEquipmentApiRecord);
        saveData({ equipment });
        if (typeof document !== 'undefined') {
          document.dispatchEvent(new CustomEvent('equipment:changed', { detail: { equipment } }));
        }
        return equipment;
      })
      .catch((error) => {
        console.warn('⚠️ [equipment] Failed to load equipment catalog', error);
        return Array.isArray(loadData()?.equipment) ? loadData().equipment : [];
      })
      .finally(() => {
        equipmentCatalogRequest = null;
      });
  }

  return equipmentCatalogRequest;
}

export function getEquipmentRecordByBarcode(barcode) {
  if (!barcode) return null;
  const normalized = normalizeBarcodeValue(barcode);
  const { equipment = [] } = loadData();
  return (equipment || []).find((item) => normalizeBarcodeValue(item?.barcode) === normalized) || null;
}

export function findEquipmentByBarcode(barcode) {
  const normalized = normalizeBarcodeValue(barcode);
  if (!normalized) return null;
  const { equipment = [] } = loadData();
  return (equipment || []).find((item) => normalizeBarcodeValue(item?.barcode) === normalized) || null;
}
