import { state } from './state.js';
import { callQuotePdfCallback } from './callbacks.js';
import { loadData } from '../../storage.js';
import { normalizeNumbers } from '../../utils.js';
import { t } from '../../language.js';
import { escapeHtml } from './utils.js';

export function normalizeLessorKey(value) {
  return normalizeNumbers(String(value ?? '')).trim().toLowerCase();
}

export function normalizeBarcodeForLookup(value) {
  if (value == null) return '';
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

export function buildChecklistEquipmentLookup() {
  const snapshot = loadData() || {};
  const equipmentList = Array.isArray(snapshot.equipment) ? snapshot.equipment : [];
  const byId = new Map();
  const byBarcode = new Map();
  equipmentList.forEach((entry) => {
    if (!entry || typeof entry !== 'object') return;
    [
      entry.id,
      entry.equipment_id,
      entry.equipmentId,
      entry.item_id,
      entry.itemId
    ].forEach((candidate) => {
      if (candidate == null || candidate === '') return;
      byId.set(String(candidate), entry);
    });
    const normalizedBarcode = normalizeBarcodeForLookup(entry.barcode);
    if (normalizedBarcode) {
      byBarcode.set(normalizedBarcode, entry);
    }
  });
  return { byId, byBarcode };
}

export function findEquipmentRecordForItem(item = {}, lookup) {
  if (!lookup) return null;
  const idCandidates = [
    item.equipmentId,
    item.equipment_id,
    item.id,
    item.itemId,
    item.item_id,
  ];
  for (const candidate of idCandidates) {
    if (candidate == null || candidate === '') continue;
    const key = String(candidate);
    if (lookup.byId.has(key)) {
      return lookup.byId.get(key);
    }
  }
  const barcodeCandidates = [
    item.barcode,
    item.normalizedBarcode,
    item.code,
  ];
  for (const candidate of barcodeCandidates) {
    const normalized = normalizeBarcodeForLookup(candidate);
    if (normalized && lookup.byBarcode.has(normalized)) {
      return lookup.byBarcode.get(normalized);
    }
  }
  return null;
}

export function resolveItemLessorLabels(item, lookup, visited = new Set()) {
  const labels = new Set();
  if (!item || typeof item !== 'object') return labels;
  const push = (label) => {
    const value = typeof label === 'string' ? label.trim() : '';
    if (value) labels.add(value);
  };
  push(item.lessor ?? item.owner ?? item.lessor_name ?? item.lessorName);

  const hasPackageChildren = Array.isArray(item.packageItems) && item.packageItems.length > 0;
  if (hasPackageChildren && !visited.has(item)) {
    visited.add(item);
    item.packageItems.forEach((pkgItem) => {
      resolveItemLessorLabels(pkgItem, lookup, visited).forEach((label) => labels.add(label));
    });
    visited.delete(item);
  }

  if (!labels.size) {
    const equipmentRecord = findEquipmentRecordForItem(item, lookup);
    if (equipmentRecord) {
      push(equipmentRecord.lessor ?? equipmentRecord.owner ?? equipmentRecord.lessor_name ?? equipmentRecord.lessorName);
    }
  }

  return labels;
}

export function itemMatchesLessorFilter(item, filterSet, lookup) {
  if (!(filterSet instanceof Set) || filterSet.size === 0) {
    return true;
  }
  const labels = resolveItemLessorLabels(item, lookup);
  if (!labels.size) {
    return false;
  }
  for (const label of labels) {
    const key = normalizeLessorKey(label);
    if (key && filterSet.has(key)) {
      return true;
    }
  }
  return false;
}

export function collectChecklistLessorOptions(reservation, lookup) {
  const items = Array.isArray(reservation?.items) ? reservation.items : [];
  const counter = new Map();
  items.forEach((item) => {
    resolveItemLessorLabels(item, lookup).forEach((label) => {
      const key = normalizeLessorKey(label);
      if (!key) return;
      if (!counter.has(key)) {
        counter.set(key, { key, label, count: 0 });
      }
      counter.get(key).count += 1;
    });
  });
  const collator = new Intl.Collator('ar', { sensitivity: 'base' });
  return Array.from(counter.values()).sort((a, b) => collator.compare(a.label, b.label));
}

export function refreshChecklistLessorOptions() {
  if (!state.activeQuoteState || state.activeQuoteState.context !== 'reservationChecklist') return;
  const lookup = buildChecklistEquipmentLookup();
  state.activeQuoteState.checklistEquipmentLookup = lookup;
  const options = collectChecklistLessorOptions(state.activeQuoteState.reservation, lookup);
  const optionKeys = new Set(options.map((opt) => opt.key));
  const filter = state.activeQuoteState.checklistLessorFilter instanceof Set
    ? state.activeQuoteState.checklistLessorFilter
    : new Set();
  Array.from(filter).forEach((key) => {
    if (!optionKeys.has(key)) {
      filter.delete(key);
    }
  });
  state.activeQuoteState.checklistLessorOptions = options;
  state.activeQuoteState.checklistLessorFilter = filter;
  callQuotePdfCallback('renderChecklistLessorFilters');
}

export function getChecklistPreviewReservation() {
  if (!state.activeQuoteState?.reservation || state.activeQuoteState.context !== 'reservationChecklist') {
    return state.activeQuoteState?.reservation || null;
  }
  const filter = state.activeQuoteState.checklistLessorFilter;
  if (!(filter instanceof Set) || filter.size === 0) {
    return state.activeQuoteState.reservation;
  }
  const lookup = state.activeQuoteState.checklistEquipmentLookup || buildChecklistEquipmentLookup();
  state.activeQuoteState.checklistEquipmentLookup = lookup;
  const items = Array.isArray(state.activeQuoteState.reservation.items) ? state.activeQuoteState.reservation.items : [];
  const filteredItems = items.filter((item) => itemMatchesLessorFilter(item, filter, lookup));
  if (filteredItems.length === items.length) {
    return state.activeQuoteState.reservation;
  }
  return {
    ...state.activeQuoteState.reservation,
    items: filteredItems,
  };
}
