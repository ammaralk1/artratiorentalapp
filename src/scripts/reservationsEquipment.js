import { loadData } from './storage.js';
import { normalizeNumbers } from './utils.js';

export function normalizeBarcodeValue(value) {
  return normalizeNumbers(String(value || '')).trim();
}

export function resolveItemImage(item = {}) {
  return item.image || item.imageUrl || item.img || '';
}

export function getEquipmentRecordByBarcode(barcode) {
  if (!barcode) return null;
  const normalized = normalizeBarcodeValue(barcode);
  const { equipment = [] } = loadData();
  return (equipment || []).find((item) => normalizeBarcodeValue(item?.barcode) === normalized) || null;
}

export function isEquipmentInMaintenance(barcode) {
  const record = getEquipmentRecordByBarcode(barcode);
  return record?.status === 'صيانة';
}

export function findEquipmentByBarcode(barcode) {
  const normalized = normalizeBarcodeValue(barcode);
  if (!normalized) return null;
  const { equipment = [] } = loadData();
  return (equipment || []).find((item) => normalizeBarcodeValue(item?.barcode) === normalized) || null;
}
