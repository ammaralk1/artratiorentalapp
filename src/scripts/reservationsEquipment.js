import { loadData } from './storage.js';
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
  return item.image || item.imageUrl || item.img || '';
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
