import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const normalizeNumbersMock = vi.fn();
const showToastMock = vi.fn();
const tMock = vi.fn();
const getCurrentLanguageMock = vi.fn();
const syncTechniciansStatusesMock = vi.fn();
const loadDataMock = vi.fn();
const hasTechnicianConflictMock = vi.fn();
const ensureTechnicianPositionsLoadedMock = vi.fn();
const getTechnicianPositionsCacheMock = vi.fn();
const findPositionByNameMock = vi.fn();

vi.mock('../../src/scripts/utils.js', () => ({
  normalizeNumbers: normalizeNumbersMock,
  showToast: showToastMock
}));
vi.mock('../../src/scripts/language.js', () => ({
  t: tMock,
  getCurrentLanguage: getCurrentLanguageMock,
}));
vi.mock('../../src/scripts/technicians.js', () => ({ syncTechniciansStatuses: syncTechniciansStatusesMock }));
vi.mock('../../src/scripts/storage.js', () => ({ loadData: loadDataMock }));
vi.mock('../../src/scripts/reservations/state.js', () => ({
  combineDateTime: (date, time) => `${date}T${time}`,
  hasTechnicianConflict: hasTechnicianConflictMock
}));
vi.mock('../../src/scripts/technicianPositions.js', () => ({
  ensureTechnicianPositionsLoaded: ensureTechnicianPositionsLoadedMock,
  getTechnicianPositionsCache: getTechnicianPositionsCacheMock,
  findPositionByName: findPositionByNameMock,
}));

const buildDom = () => {
  document.body.innerHTML = `
    <button id="open-technician-picker"></button>
    <button id="open-edit-technician-picker"></button>
    <input id="crew-position-search" />
    <div id="crew-position-list"></div>
    <button id="apply-technician-selection"></button>
    <div id="technician-picker-selection-info"></div>
    <div id="selectTechniciansModal"></div>
    <table id="crew-assignment-table"><tbody></tbody></table>
    <div id="selected-technicians-list"></div>
    <div id="edit-selected-technicians-list"></div>
    <input id="res-start" value="2024-07-01" />
    <input id="res-end" value="2024-07-02" />
    <input id="res-start-time" value="08:00" />
    <input id="res-end-time" value="17:00" />
    <input id="edit-res-start" value="2024-07-03" />
    <input id="edit-res-end" value="2024-07-04" />
    <input id="edit-res-start-time" value="09:00" />
    <input id="edit-res-end-time" value="18:00" />
    <input id="edit-res-index" value="0" />
  `;
};

beforeEach(() => {
  vi.resetModules();
  buildDom();
  normalizeNumbersMock.mockReset().mockImplementation((value) => String(value));
  showToastMock.mockReset();
  tMock.mockReset().mockImplementation((key, fallback) => fallback ?? key);
  getCurrentLanguageMock.mockReset().mockReturnValue('ar');
  syncTechniciansStatusesMock.mockReset().mockReturnValue([]);
  loadDataMock.mockReset().mockReturnValue({ technicians: [], reservations: [{ id: 'R0' }] });
  hasTechnicianConflictMock.mockReset().mockReturnValue(false);
  ensureTechnicianPositionsLoadedMock.mockReset().mockResolvedValue();
  getTechnicianPositionsCacheMock.mockReset().mockReturnValue([]);
  findPositionByNameMock.mockReset().mockReturnValue(null);
  global.CSS = { escape: (value) => String(value) };
  window.bootstrap = {
    Modal: {
      getOrCreateInstance: vi.fn(() => ({ show: vi.fn(), hide: vi.fn() }))
    }
  };
});

afterEach(() => {
  document.body.innerHTML = '';
  delete window.bootstrap;
  delete global.CSS;
});

describe('reservationsTechnicians', () => {
  it('setSelectedTechnicians renders chips and fires callback', async () => {
    const techniciansModule = await import('../../src/scripts/reservationsTechnicians.js');
    const draftSpy = vi.fn();
    const editSpy = vi.fn();

    techniciansModule.initTechnicianSelection({ onDraftChange: draftSpy, onEditChange: editSpy });
    techniciansModule.setCachedTechnicians([
      { id: 't1', name: 'Alice', dailyWage: 120 },
      { id: 't2', name: 'Bob', dailyWage: 0 }
    ]);

    techniciansModule.setSelectedTechnicians(['t1', 't2']);

    expect(draftSpy).toHaveBeenCalled();
    expect(editSpy).not.toHaveBeenCalled();
    const chips = document.getElementById('selected-technicians-list').textContent;
    expect(chips).toContain('Alice');
    expect(chips).toContain('Bob');
  });

  it('setEditingTechnicians updates edit list and callback', async () => {
    const techniciansModule = await import('../../src/scripts/reservationsTechnicians.js');
    const draftSpy = vi.fn();
    const editSpy = vi.fn();
    techniciansModule.setCachedTechnicians([{ id: 't3', name: 'Charlie' }]);
    techniciansModule.initTechnicianSelection({ onDraftChange: draftSpy, onEditChange: editSpy });

    techniciansModule.setEditingTechnicians(['t3']);

    expect(editSpy).toHaveBeenCalled();
    const editList = document.getElementById('edit-selected-technicians-list').textContent;
    expect(editList).toContain('Charlie');
  });

  it('reconcileTechnicianSelections prunes removed technicians and refreshes table', async () => {
    const techniciansModule = await import('../../src/scripts/reservationsTechnicians.js');
    const draftSpy = vi.fn();
    const editSpy = vi.fn();
    techniciansModule.initTechnicianSelection({ onDraftChange: draftSpy, onEditChange: editSpy });
    techniciansModule.setCachedTechnicians([
      { id: 'keep', name: 'Keeper' },
      { id: 'drop', name: 'Dropper' }
    ]);
    techniciansModule.setSelectedTechnicians(['keep', 'drop']);
    techniciansModule.setEditingTechnicians(['drop']);

    const tableBody = document.querySelector('#crew-assignment-table tbody');
    tableBody.innerHTML = '<tr><td>placeholder</td></tr>';

    techniciansModule.reconcileTechnicianSelections([{ id: 'keep', name: 'Keeper' }]);

    expect(document.getElementById('selected-technicians-list').textContent).toContain('Keeper');
    expect(document.getElementById('selected-technicians-list').textContent).not.toContain('Dropper');
    expect(document.getElementById('edit-selected-technicians-list').textContent).not.toContain('Dropper');
    expect(draftSpy).toHaveBeenCalledTimes(1);
    expect(editSpy).toHaveBeenCalledTimes(1);
  });

  it('applyTechnicianSelection prevents conflicting technicians and updates selection', async () => {
    const techniciansModule = await import('../../src/scripts/reservationsTechnicians.js');
    techniciansModule.setCachedTechnicians([
      { id: 'ok', name: 'Tech OK', dailyWage: 80 },
      { id: 'conflict', name: 'Tech Conflict', dailyWage: 90 }
    ]);
    techniciansModule.initTechnicianSelection();
    techniciansModule.setSelectedTechnicians(['ok', 'conflict']);

    hasTechnicianConflictMock.mockImplementation((id) => id === 'conflict');

    const applyBtn = document.getElementById('apply-technician-selection');
    applyBtn.click();

    expect(showToastMock).toHaveBeenCalledWith(expect.stringContaining('Tech Conflict'));
    expect(techniciansModule.getSelectedTechnicians()).toEqual(['ok']);

    showToastMock.mockClear();
    techniciansModule.setSelectedTechnicians(['ok', 'conflict']);
    hasTechnicianConflictMock.mockReturnValue(false);
    applyBtn.click();
    expect(techniciansModule.getSelectedTechnicians()).toEqual(['ok', 'conflict']);
    expect(showToastMock).toHaveBeenLastCalledWith(expect.stringContaining('✅'), 'success');
  });

  it('applyTechnicianSelection in edit mode ignores current reservation and hides modal', async () => {
    const techniciansModule = await import('../../src/scripts/reservationsTechnicians.js');
    techniciansModule.setCachedTechnicians([{ id: 'editTech', name: 'Editor' }]);
    techniciansModule.initTechnicianSelection();
    techniciansModule.setEditingTechnicians(['editTech']);

    const hideFn = vi.fn();
    const originalGetOrCreate = window.bootstrap.Modal.getOrCreateInstance;
    window.bootstrap.Modal.getOrCreateInstance = vi.fn(() => ({ show: vi.fn(), hide: hideFn }));
    hasTechnicianConflictMock.mockReturnValue(true);

    // simulate edit context
    document.getElementById('open-edit-technician-picker').click();
    const applyBtn = document.getElementById('apply-technician-selection');

    hasTechnicianConflictMock.mockReturnValue(true);
    applyBtn.dispatchEvent(new Event('click'));
    expect(showToastMock).toHaveBeenCalled();
    expect(techniciansModule.getEditingTechnicians()).toEqual([]);

    showToastMock.mockClear();
    hasTechnicianConflictMock.mockReturnValue(false);
    techniciansModule.setEditingTechnicians(['editTech']);
    applyBtn.dispatchEvent(new Event('click'));
    expect(hideFn).toHaveBeenCalled();
    expect(techniciansModule.getEditingTechnicians()).toEqual(['editTech']);

    window.bootstrap.Modal.getOrCreateInstance = originalGetOrCreate;
  });

  it('renders assignment dropdown with selected technicians and disables duplicates', async () => {
    const techniciansModule = await import('../../src/scripts/reservationsTechnicians.js');
    techniciansModule.setCachedTechnicians([
      { id: 't1', name: 'Alpha', dailyWage: 100, role: 'Lead' },
      { id: 't2', name: 'Beta', daily_rate: 150, role: 'Support' }
    ]);
    techniciansModule.initTechnicianSelection();
    techniciansModule.setSelectedTechnicians(['t1', 't2']);

    document.getElementById('open-technician-picker').click();
    await Promise.resolve();
    const selects = Array.from(document.querySelectorAll('.crew-assignment-select'));

    expect(selects).toHaveLength(2);
    expect(selects[0].value).toBe('t1');
    expect(selects[1].value).toBe('t2');

    const conflictingOption = Array.from(selects[0].options).find((option) => option.value === 't2');
    expect(conflictingOption?.disabled).toBe(true);

    const priceText = document.querySelector('#crew-assignment-table tbody').textContent;
    expect(priceText).toContain('SR');
  });
});
