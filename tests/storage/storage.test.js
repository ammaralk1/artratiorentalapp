import { describe, it, expect, beforeEach } from 'vitest';

import { loadData, saveData, migrateOldData, __resetLegacyMigrationForTests } from '../../src/scripts/storage.js';

function resetMemoryStore() {
  if (typeof window !== 'undefined') {
    delete window.__APP_DATA_STORE__;
    delete window.__LEGACY_DATA__;
  } else {
    delete globalThis.__APP_DATA_STORE__;
  }
}

describe('storage module', () => {
  beforeEach(() => {
    resetMemoryStore();
    __resetLegacyMigrationForTests();
  });

  it('loadData returns empty arrays when storage is empty', () => {
    const data = loadData();

    expect(data).toEqual({
      customers: [],
      reservations: [],
      equipment: [],
      technicians: [],
      maintenance: [],
      projects: []
    });
  });

  it('loadData returns previously saved data', () => {
    saveData({
      customers: [{ id: 1 }],
      reservations: [{ id: 2 }],
      equipment: [{ id: 3 }],
      technicians: [{ id: 4 }],
      maintenance: [{ id: 5 }],
      projects: [{ id: 6 }]
    });

    const data = loadData();

    expect(data.customers).toEqual([{ id: 1 }]);
    expect(data.reservations).toEqual([{ id: 2 }]);
    expect(data.equipment).toEqual([{ id: 3 }]);
    expect(data.technicians).toEqual([{ id: 4 }]);
    expect(data.maintenance).toEqual([{ id: 5 }]);
    expect(data.projects).toEqual([{ id: 6 }]);
  });

  it('saveData ignores undefined or null lists', () => {
    saveData({
      customers: [{ id: 'c1' }],
      reservations: [{ id: 'r1' }],
      equipment: null,
      technicians: undefined,
      maintenance: [{ id: 'm1' }],
      projects: [{ id: 'p1' }]
    });

    const data = loadData();

    expect(data.customers).toEqual([{ id: 'c1' }]);
    expect(data.reservations).toEqual([{ id: 'r1' }]);
    expect(data.maintenance).toEqual([{ id: 'm1' }]);
    expect(data.projects).toEqual([{ id: 'p1' }]);
    expect(data.equipment).toEqual([]);
    expect(data.technicians).toEqual([]);
  });

  it('migrateOldData copies legacy payload into memory store once', () => {
    const legacyPayload = {
      customers: [{ legacy: true }],
      reservations: [{ legacy: true }],
      equipment: [{ legacy: true }],
      technicians: [{ legacy: true }],
      maintenance: [{ legacy: true }],
      projects: [{ legacy: true }]
    };

    migrateOldData(legacyPayload);

    const data = loadData();
    expect(data.customers).toEqual([{ legacy: true }]);
    expect(data.reservations).toEqual([{ legacy: true }]);
    expect(data.equipment).toEqual([{ legacy: true }]);
    expect(data.technicians).toEqual([{ legacy: true }]);
    expect(data.maintenance).toEqual([{ legacy: true }]);
    expect(data.projects).toEqual([{ legacy: true }]);

    // Subsequent calls do nothing
    saveData({ customers: [{ legacy: false }] });
    migrateOldData(legacyPayload);
    expect(loadData().customers).toEqual([{ legacy: false }]);
  });

  it('migrateOldData reads from window.__LEGACY_DATA__ when available', () => {
    if (typeof window === 'undefined') return;
    window.__LEGACY_DATA__ = {
      customers: [{ id: 'fromWindow' }],
      reservations: [{ id: 'fromWindow' }]
    };

    migrateOldData();

    const data = loadData();
    expect(data.customers).toEqual([{ id: 'fromWindow' }]);
    expect(data.reservations).toEqual([{ id: 'fromWindow' }]);
    expect(window.__LEGACY_DATA__).toBeUndefined();
  });
});
