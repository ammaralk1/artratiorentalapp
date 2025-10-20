import { normalizeNumbers } from '../utils.js';

export const EQUIPMENT_SELECTION_EVENTS = Object.freeze({
  change: 'reservationEquipmentSelection:change',
  requestAdd: 'reservationEquipmentSelection:requestAdd',
});

let activeSelection = null;

function dispatchSelectionEvent(eventName, detail = {}) {
  if (typeof document === 'undefined') return;
  document.dispatchEvent(new CustomEvent(eventName, { detail }));
}

function applyBodyState(active, mode) {
  if (typeof document === 'undefined') return;
  const { body } = document;
  if (!body) return;
  if (active) {
    body.classList.add('equipment-selection-active');
    if (mode) {
      body.dataset.equipmentSelectionMode = mode;
    }
  } else {
    body.classList.remove('equipment-selection-active');
    if (body.dataset) {
      delete body.dataset.equipmentSelectionMode;
    }
  }
}

function sanitizeSelectionContext(context = {}) {
  const normalized = { ...context };
  if (normalized.barcode) {
    normalized.barcode = normalizeNumbers(String(normalized.barcode || '').trim());
  }
  if (normalized.start && typeof normalized.start !== 'string') {
    normalized.start = String(normalized.start);
  }
  if (normalized.end && typeof normalized.end !== 'string') {
    normalized.end = String(normalized.end);
  }
  return normalized;
}

export function activateEquipmentSelection(context = {}) {
  const sanitized = sanitizeSelectionContext({
    ...context,
    activatedAt: Date.now(),
  });

  activeSelection = sanitized;
  applyBodyState(true, sanitized.mode || 'create');
  dispatchSelectionEvent(EQUIPMENT_SELECTION_EVENTS.change, {
    active: true,
    selection: { ...sanitized },
  });
  return sanitized;
}

export function clearEquipmentSelection(reason = 'manual') {
  if (!activeSelection) return;
  const previous = activeSelection;
  activeSelection = null;
  applyBodyState(false);
  dispatchSelectionEvent(EQUIPMENT_SELECTION_EVENTS.change, {
    active: false,
    previous,
    reason,
  });
}

export function isEquipmentSelectionActive() {
  return Boolean(activeSelection);
}

export function getActiveEquipmentSelection() {
  return activeSelection ? { ...activeSelection } : null;
}

export function requestAddEquipmentToSelection(barcode) {
  if (!activeSelection) {
    return false;
  }
  const normalized = normalizeNumbers(String(barcode ?? '').trim());
  if (!normalized) {
    return false;
  }
  dispatchSelectionEvent(EQUIPMENT_SELECTION_EVENTS.requestAdd, {
    barcode: normalized,
    selection: { ...activeSelection },
  });
  return true;
}

if (typeof document !== 'undefined') {
  document.addEventListener('dashboard:tabChanged', (event) => {
    const target = event?.detail?.tabId;
    if (!target || target === 'equipment-tab') {
      return;
    }
    clearEquipmentSelection('tab-changed');
  });
}
