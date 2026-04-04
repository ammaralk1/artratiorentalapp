import { normalizeNumbers } from '../utils.js';

export function formatDateDDMMYY(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

export function normalizeBarcodeValue(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

export function normalizeText(value = '') {
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

export function normalizeSearchValue(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

export function escapeHtml(value = '') {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function toSqlDatetime(dateInput = new Date()) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) return null;
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function buildEquipmentSearchValue(option = {}) {
  const desc = String(option?.desc ?? '').trim();
  const barcode = normalizeNumbers(String(option?.displayBarcode ?? option?.barcode ?? '')).trim();
  if (barcode) {
    return `${desc} | ${barcode}`;
  }
  return desc;
}

export function parseEquipmentSearchInput(value) {
  const raw = normalizeNumbers(String(value || ''));
  if (!raw.trim()) {
    return { description: '', barcode: '' };
  }
  const [first, ...rest] = raw.split('|');
  return {
    description: first.trim(),
    barcode: rest.join('|').trim(),
  };
}

export function normalizeEquipmentStatus(value) {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (!normalized) return 'available';
  if (['maintenance', 'صيانة'].includes(normalized)) return 'maintenance';
  if (['reserved', 'محجوز'].includes(normalized)) return 'reserved';
  if (['retired', 'متوقف', 'خارج الخدمة'].includes(normalized)) return 'retired';
  return 'available';
}

export function normalizeRepairCostInput(input) {
  if (!input) return;
  const originalValue = input.value;
  if (typeof originalValue !== 'string') return;
  const normalized = normalizeNumbers(originalValue).replace(/٫/g, '.').replace(/٬/g, ',');
  if (normalized !== originalValue) {
    const { selectionStart, selectionEnd } = input;
    input.value = normalized;
    if (selectionStart !== null && selectionEnd !== null) {
      try {
        input.setSelectionRange(selectionStart, selectionEnd);
      } catch {
        // ignore selection errors in unsupported browsers
      }
    }
  }
}

export function resolveRepairCostFromInput(rawValue, previousValue) {
  const trimmed = typeof rawValue === 'string' ? rawValue.trim() : '';
  const hadPrevious = Number.isFinite(previousValue);

  if (!trimmed) {
    return { provided: hadPrevious, value: null, error: null };
  }

  const normalizedDigits = normalizeNumbers(trimmed).replace(/٫/g, '.').replace(/٬/g, ',');
  const sanitized = normalizedDigits.replace(/[^0-9.,-]/g, '');
  if (!sanitized) {
    return { provided: true, value: null, error: 'invalid' };
  }

  const hasComma = sanitized.includes(',');
  const hasDot = sanitized.includes('.');
  let prepared = sanitized;
  if (hasComma && !hasDot) {
    prepared = sanitized.replace(',', '.');
  } else if (hasComma && hasDot) {
    prepared = sanitized.replace(/,/g, '');
  }

  const parsed = Number.parseFloat(prepared);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return { provided: true, value: null, error: 'invalid' };
  }

  return { provided: true, value: Math.round(parsed * 100) / 100, error: null };
}
