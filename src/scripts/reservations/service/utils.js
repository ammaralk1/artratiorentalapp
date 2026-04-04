import { parsePriceValue } from '../../reservationsShared.js';
import { normalizeNumbers } from '../../utils.js';
import { normalizePackageId } from '../../reservationsPackages.js';

export function sanitizePriceValue(value) {
  let result = Number(value);
  if (!Number.isFinite(result)) {
    return 0;
  }

  let iterations = 0;
  while (Math.abs(result) > 100_000 && iterations < 8) {
    result /= 10;
    iterations += 1;
  }

  return Number(result.toFixed(2));
}

export function toNumber(value) {
  const parsed = parsePriceValue(value);
  return Number.isFinite(parsed) ? Number(parsed.toFixed(2)) : 0;
}

export function toPositiveInt(value, { fallback = 1, max = 1_000_000 } = {}) {
  const parsed = parsePriceValue(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  const rounded = Math.round(parsed);
  if (rounded <= 0) {
    return fallback;
  }
  if (rounded > max) {
    return fallback;
  }
  return rounded;
}

export function normalizeStatusValue(status) {
  const normalized = String(status ?? '').trim().toLowerCase();
  switch (normalized) {
    case 'pending':
    case 'معلق':
    case 'قيد الانتظار':
      return 'pending';
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
    case 'ملغية':
    case 'ملغى':
    case 'canceled':
      return 'cancelled';
    default:
      return 'pending';
  }
}

export function normalisePaidStatus(status) {
  if (status == null) return null;
  const normalized = String(status).trim().toLowerCase();
  switch (normalized) {
    case 'paid':
    case 'مدفوع':
      return 'paid';
    case 'partial':
    case 'مدفوع جزئياً':
    case 'partial_paid':
      return 'partial';
    case 'unpaid':
    case 'غير مدفوع':
    case 'not_paid':
    default:
      return 'unpaid';
  }
}

export function normalizeReservationItemType(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const normalized = String(value).trim().toLowerCase();
  if (normalized === 'package' || normalized === 'bundle' || normalized === 'pack') {
    return 'package';
  }
  return normalized;
}

export function normalizeBarcodeValueLoose(value) {
  if (value === null || value === undefined) {
    return '';
  }
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

export function normalizePackageIdentifier(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const raw = String(value).replace(/^package::/i, '');
  return normalizePackageId(raw);
}

export function resolveEquipmentIdValue(value) {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return String(value);
}

export function debugLogPackages() {
  // Logging disabled to keep console clean in reservations tab
}
