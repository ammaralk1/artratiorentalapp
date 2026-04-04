import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Mocks — declared before any dynamic import
// ---------------------------------------------------------------------------

// config.js imports from constants.js which has Vite-specific asset imports
// (CSS ?raw, PNG ?url, TTF ?url). We mock the whole constants module.
vi.mock('../../../src/scripts/reservations/pdf/constants.js', () => ({
  QUOTE_SECTION_DEFS: [
    { id: 'customerInfo', labelKey: 'k1', fallback: 'Customer', defaultSelected: true },
    { id: 'items', labelKey: 'k2', fallback: 'Items', defaultSelected: true },
    { id: 'payment', labelKey: 'k3', fallback: 'Payment', defaultSelected: false },
  ],
  PROJECT_QUOTE_SECTION_DEFS: [
    { id: 'projectInfo', labelKey: 'k4', fallback: 'Project', defaultSelected: true },
    { id: 'financialSummary', labelKey: 'k5', fallback: 'Financial', defaultSelected: true },
  ],
  QUOTE_FIELD_DEFS: undefined,
  PROJECT_QUOTE_FIELD_DEFS: undefined,
}));

vi.mock('../../../src/scripts/language.js', () => ({
  t: vi.fn((key, fallback) => fallback ?? key),
  getCurrentLanguage: vi.fn(() => 'ar'),
}));

// config.js also imports from ../../utils.js (the shared utils, not the pdf one)
vi.mock('../../../src/scripts/utils.js', () => ({
  normalizeNumbers: vi.fn((v) => String(v)),
  formatDateTime: vi.fn((v) => String(v)),
}));

vi.mock('../../../src/scripts/reservations/pdf/financial.js', () => ({
  formatMoney: vi.fn((v) => String(v)),
  formatCurrencyValue: vi.fn((v) => String(v)),
}));

vi.mock('../../../src/scripts/reservations/pdf/utils.js', () => ({
  escapeHtml: vi.fn((v) => String(v ?? '')),
  normalizePackageNameForMatch: vi.fn((v) => String(v ?? '')),
}));

vi.mock('../../../src/scripts/reservations/pdf/state.js', () => ({
  state: { activeQuoteState: null },
}));

vi.mock('../../../src/scripts/reservations/pdf/assets.js', () => ({
  waitForImage: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Subject under test — imported AFTER mocks
// ---------------------------------------------------------------------------

const {
  getQuoteConfig,
  getQuoteSectionDefs,
  getQuoteFieldDefs,
  getQuoteSectionIdSet,
  getQuoteFieldIdMap,
  buildDefaultFieldSelections,
  cloneFieldSelections,
  getFieldSelectionSet,
  isFieldEnabledInSelections,
  buildDefaultSectionExpansions,
  isSectionExpanded,
  ensureSectionExpansionState,
  getQuoteStatusMessage,
  QUOTE_CONFIG_CACHE,
} = await import('../../../src/scripts/reservations/pdf/config.js');

// ---------------------------------------------------------------------------
// Clear the config cache before each test so results are not shared
// ---------------------------------------------------------------------------

beforeEach(() => {
  QUOTE_CONFIG_CACHE.clear();
});

// ---------------------------------------------------------------------------
// getQuoteSectionDefs
// ---------------------------------------------------------------------------

describe('getQuoteSectionDefs', () => {
  it('returns an array for the reservation context', () => {
    const defs = getQuoteSectionDefs('reservation');
    expect(Array.isArray(defs)).toBe(true);
  });

  it('returns a different array for the project context', () => {
    const reservationDefs = getQuoteSectionDefs('reservation');
    QUOTE_CONFIG_CACHE.clear();
    const projectDefs = getQuoteSectionDefs('project');
    // Both are arrays but they must differ (different section IDs)
    expect(Array.isArray(projectDefs)).toBe(true);
    expect(reservationDefs).not.toEqual(projectDefs);
  });

  it('returns section definitions that each have an id property', () => {
    const defs = getQuoteSectionDefs('reservation');
    defs.forEach((def) => expect(def).toHaveProperty('id'));
  });

  it('returns checklist-specific sections for reservationChecklist context', () => {
    const defs = getQuoteSectionDefs('reservationChecklist');
    const ids = defs.map((d) => d.id);
    expect(ids).toContain('customerInfo');
    expect(ids).toContain('items');
  });
});

// ---------------------------------------------------------------------------
// getQuoteFieldDefs
// ---------------------------------------------------------------------------

describe('getQuoteFieldDefs', () => {
  it('returns an object for the reservation context', () => {
    const defs = getQuoteFieldDefs('reservation');
    expect(defs !== null && typeof defs === 'object').toBe(true);
  });

  it('field defs object has at least one section key for reservation', () => {
    const defs = getQuoteFieldDefs('reservation');
    expect(Object.keys(defs).length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// getQuoteSectionIdSet
// ---------------------------------------------------------------------------

describe('getQuoteSectionIdSet', () => {
  it('returns a Set for the reservation context', () => {
    const result = getQuoteSectionIdSet('reservation');
    expect(result instanceof Set).toBe(true);
  });

  it('contains customerInfo in the reservation section ID set', () => {
    const result = getQuoteSectionIdSet('reservation');
    expect(result.has('customerInfo')).toBe(true);
  });

  it('contains items in the reservation section ID set', () => {
    const result = getQuoteSectionIdSet('reservation');
    expect(result.has('items')).toBe(true);
  });

  it('contains payment in the reservation section ID set', () => {
    const result = getQuoteSectionIdSet('reservation');
    expect(result.has('payment')).toBe(true);
  });

  it('returns a Set for the project context', () => {
    const result = getQuoteSectionIdSet('project');
    expect(result instanceof Set).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// buildDefaultFieldSelections
// ---------------------------------------------------------------------------

describe('buildDefaultFieldSelections', () => {
  it('returns a plain object for the reservation context', () => {
    const result = buildDefaultFieldSelections('reservation');
    expect(result !== null && typeof result === 'object' && !Array.isArray(result)).toBe(true);
  });

  it('each section key maps to a Set', () => {
    const result = buildDefaultFieldSelections('reservation');
    Object.values(result).forEach((v) => {
      expect(v instanceof Set).toBe(true);
    });
  });
});

// ---------------------------------------------------------------------------
// cloneFieldSelections
// ---------------------------------------------------------------------------

describe('cloneFieldSelections', () => {
  it('returns an empty object when given an empty object', () => {
    expect(cloneFieldSelections({})).toEqual({});
  });

  it('returns a new object (not the same reference)', () => {
    const original = { customerInfo: new Set(['name']) };
    const clone = cloneFieldSelections(original);
    expect(clone).not.toBe(original);
  });

  it('each section in the clone is a new Set (not same reference)', () => {
    const original = { customerInfo: new Set(['name', 'phone']) };
    const clone = cloneFieldSelections(original);
    expect(clone.customerInfo).not.toBe(original.customerInfo);
    expect(clone.customerInfo instanceof Set).toBe(true);
  });

  it('preserves the elements of each section set', () => {
    const original = { items: new Set(['code', 'price', 'quantity']) };
    const clone = cloneFieldSelections(original);
    expect(clone.items.has('code')).toBe(true);
    expect(clone.items.has('price')).toBe(true);
    expect(clone.items.has('quantity')).toBe(true);
  });

  it('returns a Set even when the source value is an empty Set', () => {
    const original = { crew: new Set() };
    const clone = cloneFieldSelections(original);
    expect(clone.crew instanceof Set).toBe(true);
    expect(clone.crew.size).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// getFieldSelectionSet
// ---------------------------------------------------------------------------

describe('getFieldSelectionSet', () => {
  it('returns undefined when sectionId is falsy', () => {
    expect(getFieldSelectionSet({}, '')).toBeUndefined();
  });

  it('creates and returns an empty Set for an unknown sectionId', () => {
    const selections = {};
    const result = getFieldSelectionSet(selections, 'unknownSection');
    expect(result instanceof Set).toBe(true);
    expect(result.size).toBe(0);
  });

  it('returns the existing Set when the section is already present', () => {
    const existingSet = new Set(['fieldA']);
    const selections = { mySection: existingSet };
    const result = getFieldSelectionSet(selections, 'mySection');
    expect(result).toBe(existingSet);
  });
});

// ---------------------------------------------------------------------------
// isFieldEnabledInSelections
// ---------------------------------------------------------------------------

describe('isFieldEnabledInSelections', () => {
  it('returns true when the section has no entry (defaults to enabled)', () => {
    expect(isFieldEnabledInSelections({}, 'items', 'price')).toBe(true);
  });

  it('returns false when the section Set does not contain the field', () => {
    const selections = { items: new Set(['code']) };
    expect(isFieldEnabledInSelections(selections, 'items', 'price')).toBe(false);
  });

  it('returns true when the section Set contains the field', () => {
    const selections = { items: new Set(['price', 'code']) };
    expect(isFieldEnabledInSelections(selections, 'items', 'price')).toBe(true);
  });

  it('returns true when selections is an empty object (missing section = enabled)', () => {
    expect(isFieldEnabledInSelections({}, 'crew', 'rowNumber')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// buildDefaultSectionExpansions
// ---------------------------------------------------------------------------

describe('buildDefaultSectionExpansions', () => {
  it('returns a plain object', () => {
    const result = buildDefaultSectionExpansions('reservation');
    expect(result !== null && typeof result === 'object').toBe(true);
  });

  it('all expansion values are false by default', () => {
    const result = buildDefaultSectionExpansions('reservation');
    Object.values(result).forEach((v) => expect(v).toBe(false));
  });

  it('has keys matching the section IDs for the given context', () => {
    const result = buildDefaultSectionExpansions('reservation');
    const defs = getQuoteSectionDefs('reservation');
    defs.forEach(({ id }) => expect(result).toHaveProperty(id));
  });
});

// ---------------------------------------------------------------------------
// isSectionExpanded
// ---------------------------------------------------------------------------

describe('isSectionExpanded', () => {
  it('returns false for a section that has no expansion entry (defaults to false)', () => {
    const stateObj = { sectionExpansions: {}, context: 'reservation' };
    // ensureSectionExpansionState will set missing section to false
    expect(isSectionExpanded(stateObj, 'items')).toBe(false);
  });

  it('returns true when the section expansion is explicitly set to true', () => {
    const stateObj = {
      sectionExpansions: { customerInfo: true },
      context: 'reservation',
    };
    expect(isSectionExpanded(stateObj, 'customerInfo')).toBe(true);
  });

  it('returns false when the section expansion is explicitly set to false', () => {
    const stateObj = {
      sectionExpansions: { customerInfo: false },
      context: 'reservation',
    };
    expect(isSectionExpanded(stateObj, 'customerInfo')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// ensureSectionExpansionState
// ---------------------------------------------------------------------------

describe('ensureSectionExpansionState', () => {
  it('creates sectionExpansions on stateObj if it does not exist', () => {
    const stateObj = { context: 'reservation' };
    ensureSectionExpansionState(stateObj, 'items');
    expect(stateObj.sectionExpansions).toBeDefined();
  });

  it('adds section to existing sectionExpansions with a false value if missing', () => {
    const stateObj = { sectionExpansions: {}, context: 'reservation' };
    ensureSectionExpansionState(stateObj, 'payment');
    expect(stateObj.sectionExpansions.payment).toBe(false);
  });

  it('does not overwrite an existing boolean expansion value', () => {
    const stateObj = { sectionExpansions: { customerInfo: true }, context: 'reservation' };
    ensureSectionExpansionState(stateObj, 'customerInfo');
    expect(stateObj.sectionExpansions.customerInfo).toBe(true);
  });

  it('returns the sectionExpansions object', () => {
    const stateObj = { context: 'reservation' };
    const result = ensureSectionExpansionState(stateObj, 'items');
    expect(result).toBe(stateObj.sectionExpansions);
  });
});

// ---------------------------------------------------------------------------
// getQuoteStatusMessage
// ---------------------------------------------------------------------------

describe('getQuoteStatusMessage', () => {
  it('returns a string for the "export" type', () => {
    const msg = getQuoteStatusMessage('export');
    expect(typeof msg).toBe('string');
    expect(msg.length).toBeGreaterThan(0);
  });

  it('returns a string for the "render" type', () => {
    const msg = getQuoteStatusMessage('render');
    expect(typeof msg).toBe('string');
    expect(msg.length).toBeGreaterThan(0);
  });

  it('returns a string for an unknown type (falls through to default)', () => {
    const msg = getQuoteStatusMessage('unknown');
    expect(typeof msg).toBe('string');
    expect(msg.length).toBeGreaterThan(0);
  });

  it('returns different strings for "export" vs "render"', () => {
    expect(getQuoteStatusMessage('export')).not.toBe(getQuoteStatusMessage('render'));
  });
});

// ---------------------------------------------------------------------------
// getQuoteConfig (cache behaviour)
// ---------------------------------------------------------------------------

describe('getQuoteConfig', () => {
  it('returns the same object on repeated calls (cache hit)', () => {
    const first = getQuoteConfig('reservation');
    const second = getQuoteConfig('reservation');
    expect(first).toBe(second);
  });

  it('returns config with sectionDefs, fieldDefs, sectionIdSet, fieldIdMap', () => {
    const config = getQuoteConfig('reservation');
    expect(config).toHaveProperty('sectionDefs');
    expect(config).toHaveProperty('fieldDefs');
    expect(config).toHaveProperty('sectionIdSet');
    expect(config).toHaveProperty('fieldIdMap');
  });

  it('sectionIdSet is a Set', () => {
    const config = getQuoteConfig('reservation');
    expect(config.sectionIdSet instanceof Set).toBe(true);
  });

  it('fieldIdMap values are Sets', () => {
    const config = getQuoteConfig('reservation');
    Object.values(config.fieldIdMap).forEach((v) => {
      expect(v instanceof Set).toBe(true);
    });
  });
});
