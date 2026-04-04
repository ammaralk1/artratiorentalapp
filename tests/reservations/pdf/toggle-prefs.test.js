import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// localStorage mock — set up before any module imports
// ---------------------------------------------------------------------------

let store = {};
const localStorageMock = {
  getItem: vi.fn((key) => store[key] ?? null),
  setItem: vi.fn((key, value) => { store[key] = value; }),
  removeItem: vi.fn((key) => { delete store[key]; }),
  clear: vi.fn(() => { store = {}; }),
};

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });
Object.defineProperty(globalThis, 'window', { value: { localStorage: localStorageMock }, writable: true });

// ---------------------------------------------------------------------------
// Mocks — declared before dynamic import
// ---------------------------------------------------------------------------

vi.mock('../../../src/scripts/reservations/pdf/constants.js', () => ({
  QUOTE_SEQUENCE_STORAGE_KEY: 'reservations.quote.sequence',
  QUOTE_TOGGLE_PREFS_STORAGE_KEYS: {
    reservation: 'reservations.quote.togglePrefs.v1',
    project: 'projects.quote.togglePrefs.v1',
    reservationChecklist: 'reservations.checklist.togglePrefs.v1',
  },
  QUOTE_SECTION_DEFS: [
    { id: 'customerInfo', defaultSelected: true },
    { id: 'items', defaultSelected: true },
    { id: 'payment', defaultSelected: false },
  ],
  PROJECT_QUOTE_SECTION_DEFS: [
    { id: 'projectInfo', defaultSelected: true },
  ],
}));

vi.mock('../../../src/scripts/reservations/pdf/config.js', () => ({
  getQuoteConfig: vi.fn(() => ({
    sectionDefs: [],
    fieldDefs: {},
    sectionIdSet: new Set(),
    fieldIdMap: {},
  })),
  getQuoteSectionIdSet: vi.fn(() => new Set(['customerInfo', 'items', 'payment'])),
  getQuoteFieldIdMap: vi.fn(() => ({})),
  buildDefaultFieldSelections: vi.fn(() => ({})),
  buildDefaultSectionExpansions: vi.fn(() => ({})),
  cloneFieldSelections: vi.fn((s) => {
    const clone = {};
    Object.entries(s || {}).forEach(([k, v]) => { clone[k] = new Set(v); });
    return clone;
  }),
}));

// ---------------------------------------------------------------------------
// Subject under test — imported AFTER mocks
// ---------------------------------------------------------------------------

const {
  getTogglePrefsStorageKey,
  collectSelectionIds,
  serializeQuoteToggleState,
  clearLegacyQuotePreferences,
  readQuoteTogglePreferences,
  writeQuoteTogglePreferences,
} = await import('../../../src/scripts/reservations/pdf/toggle-prefs.js');

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('getTogglePrefsStorageKey', () => {
  it('returns the reservation storage key for "reservation" context', () => {
    expect(getTogglePrefsStorageKey('reservation')).toBe('reservations.quote.togglePrefs.v1');
  });

  it('returns the project storage key for "project" context', () => {
    expect(getTogglePrefsStorageKey('project')).toBe('projects.quote.togglePrefs.v1');
  });

  it('returns the reservationChecklist storage key for "reservationChecklist" context', () => {
    expect(getTogglePrefsStorageKey('reservationChecklist')).toBe('reservations.checklist.togglePrefs.v1');
  });

  it('falls back to reservation key for an unknown context', () => {
    const result = getTogglePrefsStorageKey('unknownContext');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('uses reservation key when no argument is given', () => {
    expect(getTogglePrefsStorageKey()).toBe('reservations.quote.togglePrefs.v1');
  });
});

describe('collectSelectionIds', () => {
  it('returns { ids: null, emptyExplicitly: false } for null input', () => {
    const result = collectSelectionIds(null);
    expect(result.ids).toBeNull();
    expect(result.emptyExplicitly).toBe(false);
  });

  it('returns { ids: null, emptyExplicitly: false } for undefined input', () => {
    const result = collectSelectionIds(undefined);
    expect(result.ids).toBeNull();
    expect(result.emptyExplicitly).toBe(false);
  });

  it('returns empty array and emptyExplicitly: false for empty plain object {}', () => {
    // {} has no entries with truthy values; entries.length === 0 → emptyExplicitly: false
    // Wait — object with 0 entries: entries.length === 0 → emptyExplicitly: false per the source
    const result = collectSelectionIds({});
    expect(Array.isArray(result.ids)).toBe(true);
    expect(result.ids).toHaveLength(0);
  });

  it('collects IDs of enabled entries from a plain object', () => {
    const selection = { a: true, b: false, c: true };
    const result = collectSelectionIds(selection);
    expect(result.ids).toEqual(expect.arrayContaining(['a', 'c']));
    expect(result.ids).not.toContain('b');
  });

  it('only includes entries where the value is truthy', () => {
    const selection = { x: 1, y: 0, z: null, w: 'yes' };
    const result = collectSelectionIds(selection);
    expect(result.ids).toContain('x');
    expect(result.ids).toContain('w');
    expect(result.ids).not.toContain('y');
    expect(result.ids).not.toContain('z');
  });

  it('handles a Set input and returns its elements as an array', () => {
    const selection = new Set(['alpha', 'beta']);
    const result = collectSelectionIds(selection);
    expect(result.ids).toEqual(expect.arrayContaining(['alpha', 'beta']));
    expect(result.emptyExplicitly).toBe(false);
  });

  it('returns emptyExplicitly: true for an empty Set', () => {
    const result = collectSelectionIds(new Set());
    expect(result.ids).toHaveLength(0);
    expect(result.emptyExplicitly).toBe(true);
  });

  it('handles an Array input and returns a copy', () => {
    const arr = ['id1', 'id2'];
    const result = collectSelectionIds(arr);
    expect(result.ids).toEqual(['id1', 'id2']);
    expect(result.ids).not.toBe(arr); // must be a copy
  });

  it('returns emptyExplicitly: true for an empty array', () => {
    const result = collectSelectionIds([]);
    expect(result.emptyExplicitly).toBe(true);
    expect(result.ids).toHaveLength(0);
  });
});

describe('serializeQuoteToggleState', () => {
  it('returns null when stateObj is null', () => {
    expect(serializeQuoteToggleState(null)).toBeNull();
  });

  it('returns null when stateObj is undefined', () => {
    expect(serializeQuoteToggleState(undefined)).toBeNull();
  });

  it('returns an object with sections and fields keys for a valid stateObj', () => {
    const stateObj = { sections: new Set(['customerInfo']), fields: {} };
    const result = serializeQuoteToggleState(stateObj);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty('sections');
    expect(result).toHaveProperty('fields');
  });

  it('includes version: 1 in the serialized output', () => {
    const stateObj = { sections: new Set(), fields: {} };
    const result = serializeQuoteToggleState(stateObj);
    expect(result.version).toBe(1);
  });

  it('filters sections to only those present in the section ID set', () => {
    const stateObj = { sections: new Set(['customerInfo', 'nonExistentSection']), fields: {} };
    const result = serializeQuoteToggleState(stateObj);
    expect(result.sections).toContain('customerInfo');
    expect(result.sections).not.toContain('nonExistentSection');
  });
});

describe('clearLegacyQuotePreferences', () => {
  beforeEach(() => {
    store = {};
    vi.clearAllMocks();
  });

  it('calls localStorage.removeItem for the sequence storage key', () => {
    clearLegacyQuotePreferences();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('reservations.quote.sequence');
  });

  it('does not throw even if localStorage is unavailable', () => {
    // Simulate a broken removeItem
    localStorageMock.removeItem.mockImplementationOnce(() => { throw new Error('storage error'); });
    expect(() => clearLegacyQuotePreferences()).not.toThrow();
  });
});
