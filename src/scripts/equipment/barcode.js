import { normalizeNumbers } from '../utils.js';
import { getAllEquipment } from './state.js';
import { normalizeDescriptionValue } from './normalize.js';

export function attachEnglishDigitNormalizer(input) {
  if (!input || input.dataset.englishDigitsAttached) return;

  input.addEventListener('input', () => {
    const { selectionStart, selectionEnd, value } = input;
    const normalized = normalizeNumbers(value);
    if (normalized === value) return;

    input.value = normalized;

    if (selectionStart != null && selectionEnd != null) {
      const lengthDelta = normalized.length - value.length;
      input.setSelectionRange(selectionStart + lengthDelta, selectionEnd + lengthDelta);
    }
  });

  input.dataset.englishDigitsAttached = 'true';
}

export function generateUniqueEquipmentBarcode() {
  const existing = new Set(
    getAllEquipment().map((item) => normalizeNumbers(String(item.barcode || '')).trim())
  );

  const makeCandidate = () => {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.floor(Math.random() * 0xFFFF).toString(36).toUpperCase().padStart(3, '0');
    return `EQ-${ts}${rand}`;
  };

  let candidate = '';
  for (let i = 0; i < 10; i++) {
    candidate = makeCandidate();
    if (!existing.has(candidate)) return candidate;
  }
  return candidate || makeCandidate();
}

export function resolveComparableBarcode(item) {
  if (!item) return '';
  const primary = normalizeNumbers(String(item.barcode ?? '')).trim();
  if (primary) return primary;

  if (Array.isArray(item.variants)) {
    for (const variant of item.variants) {
      const variantCode = normalizeNumbers(String(variant?.barcode ?? '')).trim();
      if (variantCode) return variantCode;
    }
  }

  return '';
}

export function compareEquipmentItemsByBarcode(a, b) {
  const codeA = resolveComparableBarcode(a);
  const codeB = resolveComparableBarcode(b);

  if (!codeA && !codeB) return 0;
  if (!codeA) return 1;
  if (!codeB) return -1;

  const numericPattern = /^[0-9]+$/;
  const isANumeric = numericPattern.test(codeA);
  const isBNumeric = numericPattern.test(codeB);

  if (isANumeric && isBNumeric) {
    if (codeA.length !== codeB.length) return codeA.length - codeB.length;
    const cmp = codeA.localeCompare(codeB, 'ar', { numeric: true, sensitivity: 'base' });
    if (cmp !== 0) return cmp;
  } else if (isANumeric !== isBNumeric) {
    return isANumeric ? -1 : 1;
  } else {
    const cmp = codeA.localeCompare(codeB, 'ar', { numeric: true, sensitivity: 'base' });
    if (cmp !== 0) return cmp;
  }

  const descA = normalizeDescriptionValue(a?.desc || a?.description || a?.name || '');
  const descB = normalizeDescriptionValue(b?.desc || b?.description || b?.name || '');
  return descA.localeCompare(descB, 'ar', { sensitivity: 'base' });
}
