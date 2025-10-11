import { normalizeNumbers } from './utils.js';

export function normalizeText(value = '') {
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

const GROUP_PRICE_PRECISION = 2;

function normalizePrice(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '0.00';
  return number.toFixed(GROUP_PRICE_PRECISION);
}

export function resolveReservationItemGroupKey(item = {}) {
  const description = item?.desc || item?.description || item?.name || '';
  const normalizedDescription = normalizeText(description);
  const priceKey = normalizePrice(item?.price ?? item?.unitPrice ?? item?.unit_price ?? 0);
  return `${normalizedDescription}::${priceKey}`;
}

export function groupReservationItems(items = []) {
  const map = new Map();

  items.forEach((item, index) => {
    const key = resolveReservationItemGroupKey(item);
    if (!key) return;
    if (!map.has(key)) {
      const description = item?.desc || item?.description || item?.name || '';
      const normalizedDescription = normalizeText(description);
      const unitPrice = toPriceNumber(item);
      const image = item?.image || item?.imageUrl || item?.img || '';

      map.set(key, {
        key,
        description,
        normalizedDescription,
        unitPrice,
        image,
        items: [],
        itemIndices: [],
        barcodes: [],
      });
    }

    const group = map.get(key);
    group.items.push(item);
    group.itemIndices.push(index);
    if (item?.barcode) {
      group.barcodes.push(String(item.barcode));
    }
  });

  return Array.from(map.values()).map((group) => ({
    ...group,
    count: group.items.length,
    totalPrice: group.items.reduce((sum, entry) => sum + toPriceNumber(entry), 0),
  }));
}

export function resolveEquipmentIdentifier(record = {}) {
  const candidates = [
    record?.id,
    record?.equipment_id,
    record?.equipmentId,
    record?.item_id,
    record?.itemId,
  ];

  for (const candidate of candidates) {
    if (candidate === null || candidate === undefined || candidate === '') continue;
    return String(candidate);
  }

  return null;
}

function toPriceNumber(entry = {}) {
  const value = entry?.price ?? entry?.unit_price ?? entry?.unitPrice ?? 0;
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

export function isReservationCompleted(reservation) {
  if (!reservation?.end) return false;
  const end = new Date(reservation.end);
  if (Number.isNaN(end.getTime())) return false;
  const now = new Date();
  return end < now;
}

export function normalizeProjectStatus(value = '') {
  const normalized = String(value ?? '').trim().toLowerCase();
  switch (normalized) {
    case 'confirmed':
    case 'مؤكد':
      return 'confirmed';
    case 'in_progress':
    case 'in-progress':
    case 'قيد التنفيذ':
    case 'جاري':
      return 'in_progress';
    case 'completed':
    case 'مكتمل':
      return 'completed';
    case 'cancelled':
    case 'ملغي':
      return 'cancelled';
    case 'pending':
    case 'draft':
    case 'قيد الانتظار':
    case 'بانتظار التأكيد':
    case 'معلق':
    default:
      return 'pending';
  }
}

export function resolveReservationProjectState(reservation = {}, project = null) {
  const reservationConfirmed = reservation?.confirmed === true || reservation?.confirmed === 'true';
  const projectId = reservation?.projectId ?? reservation?.project_id ?? null;
  const projectLinked = projectId != null && projectId !== '' && projectId !== 'null';
  const projectStatus = projectLinked ? normalizeProjectStatus(project?.status ?? project?.status_label ?? project?.statusLabel ?? '') : null;
  const projectConfirmed = projectLinked
    && (project?.confirmed === true || ['confirmed', 'in_progress', 'completed'].includes(projectStatus));
  const effectiveConfirmed = projectLinked ? projectConfirmed : reservationConfirmed;

  return {
    reservationConfirmed,
    projectLinked,
    projectStatus,
    projectConfirmed,
    effectiveConfirmed,
  };
}
