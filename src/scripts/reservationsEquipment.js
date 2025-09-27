import { loadData } from './storage.js';
import { normalizeBarcodeValue } from './reservations/state.js';

export { normalizeBarcodeValue } from './reservations/state.js';

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

export function isEquipmentInMaintenance(barcode) {
  const record = findEquipmentByBarcode(barcode);
  return record?.status === 'صيانة';
}
