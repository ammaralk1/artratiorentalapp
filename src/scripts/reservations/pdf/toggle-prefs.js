import { QUOTE_TOGGLE_PREFS_STORAGE_KEYS, QUOTE_SEQUENCE_STORAGE_KEY } from './constants.js';
import {
  getQuoteSectionIdSet,
  getQuoteFieldIdMap,
  cloneFieldSelections,
  buildDefaultFieldSelections,
} from './config.js';

export function getTogglePrefsStorageKey(context = 'reservation') {
  return QUOTE_TOGGLE_PREFS_STORAGE_KEYS[context] || QUOTE_TOGGLE_PREFS_STORAGE_KEYS.reservation;
}

export function clearLegacyQuotePreferences() {
  try {
    // Keep user toggle preferences; only clear old local sequence persistence
    window.localStorage?.removeItem?.(QUOTE_SEQUENCE_STORAGE_KEY);
  } catch (_) { /* ignore */ }
}

export function readQuoteTogglePreferences(context = 'reservation') {
  try {
    clearLegacyQuotePreferences();
    const storageKey = getTogglePrefsStorageKey(context);
    const stored = window.localStorage?.getItem?.(storageKey);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (error) {
    console.warn('⚠️ [reservations/pdf] failed to read toggle preferences', error);
    return null;
  }
}

export function writeQuoteTogglePreferences(preferences, context = 'reservation') {
  try {
    const storageKey = getTogglePrefsStorageKey(context);
    if (!preferences) {
      window.localStorage?.removeItem?.(storageKey);
      return;
    }
    window.localStorage?.setItem?.(storageKey, JSON.stringify(preferences));
  } catch (error) {
    console.warn('⚠️ [reservations/pdf] failed to persist toggle preferences', error);
  }
}

export function collectSelectionIds(selection) {
  if (!selection) return { ids: null, emptyExplicitly: false };
  if (selection instanceof Set) {
    return { ids: Array.from(selection), emptyExplicitly: selection.size === 0 };
  }
  if (Array.isArray(selection)) {
    return { ids: selection.slice(), emptyExplicitly: selection.length === 0 };
  }
  if (typeof selection === 'object') {
    const entries = Object.entries(selection).filter(([, enabled]) => Boolean(enabled));
    return { ids: entries.map(([id]) => id), emptyExplicitly: entries.length === 0 };
  }
  return { ids: null, emptyExplicitly: false };
}

export function serializeQuoteToggleState(stateObj, context = 'reservation') {
  if (!stateObj) return null;
  const sectionIdSet = getQuoteSectionIdSet(context);
  const fieldIdMap = getQuoteFieldIdMap(context);
  const sectionIds = Array.from(stateObj.sections instanceof Set ? stateObj.sections : new Set(stateObj.sections || []))
    .filter((id) => sectionIdSet.has(id));

  const fieldsPayload = {};
  const selections = stateObj.fields || {};
  Object.entries(fieldIdMap).forEach(([sectionId, validIds]) => {
    const selection = selections[sectionId];
    if (selection == null) return;
    const { ids, emptyExplicitly } = collectSelectionIds(selection);
    if (!ids && !emptyExplicitly) return;
    const normalized = Array.isArray(ids) ? ids.filter((id) => validIds.has(id)) : [];
    if (normalized.length > 0 || emptyExplicitly) {
      fieldsPayload[sectionId] = normalized;
    }
  });

  return {
    version: 1,
    sections: sectionIds,
    fields: fieldsPayload
  };
}

export function persistQuoteTogglePreferences(stateObj) {
  if (!stateObj) return;
  const context = stateObj.context || 'reservation';
  const snapshot = serializeQuoteToggleState(stateObj, context);
  if (!snapshot) return;
  writeQuoteTogglePreferences(snapshot, context);
}

export function applyQuoteTogglePreferences(stateObj) {
  if (!stateObj) return;
  const context = stateObj.context || 'reservation';
  const preferences = readQuoteTogglePreferences(context);
  if (!preferences) return;

  const sectionIdSet = getQuoteSectionIdSet(context);
  const storedSections = Array.isArray(preferences.sections) ? preferences.sections.filter((id) => sectionIdSet.has(id)) : [];
  if (storedSections.length) {
    stateObj.sections = new Set(storedSections);
  }

  if (preferences.fields && typeof preferences.fields === 'object') {
    const nextSelections = cloneFieldSelections(stateObj.fields || buildDefaultFieldSelections(context));
    const fieldIdMap = getQuoteFieldIdMap(context);
    Object.entries(preferences.fields).forEach(([sectionId, storedIds]) => {
      const validIds = fieldIdMap[sectionId];
      if (!validIds) return;
      const normalized = Array.isArray(storedIds) ? storedIds.filter((id) => validIds.has(id)) : [];
      nextSelections[sectionId] = new Set(normalized);
    });
    stateObj.fields = nextSelections;
  }
}
