import { describe, it, expect, beforeEach } from 'vitest';

import { loadData, saveData, migrateOldData } from '../../src/scripts/storage.js';

describe('storage module', () => {
  beforeEach(() => {
    localStorage.clear();
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

  it('loadData parses persisted lists from storage', () => {
    localStorage.setItem('customersList', JSON.stringify([{ id: 1 }]));
    localStorage.setItem('reservationsList', JSON.stringify([{ id: 2 }]));
    localStorage.setItem('equipmentList', JSON.stringify([{ id: 3 }]));
    localStorage.setItem('techniciansList', JSON.stringify([{ id: 4 }]));
    localStorage.setItem('maintenanceList', JSON.stringify([{ id: 5 }]));
    localStorage.setItem('projectsList', JSON.stringify([{ id: 6 }]));

    const data = loadData();

    expect(data.customers).toEqual([{ id: 1 }]);
    expect(data.reservations).toEqual([{ id: 2 }]);
    expect(data.equipment).toEqual([{ id: 3 }]);
    expect(data.technicians).toEqual([{ id: 4 }]);
    expect(data.maintenance).toEqual([{ id: 5 }]);
    expect(data.projects).toEqual([{ id: 6 }]);
  });

  it('saveData persists only provided lists', () => {
    saveData({
      customers: [{ id: 'c1' }],
      reservations: [{ id: 'r1' }],
      equipment: null,
      technicians: undefined,
      maintenance: [{ id: 'm1' }],
      projects: [{ id: 'p1' }]
    });

    expect(localStorage.getItem('customersList')).toBe(JSON.stringify([{ id: 'c1' }]));
    expect(localStorage.getItem('reservationsList')).toBe(JSON.stringify([{ id: 'r1' }]));
    expect(localStorage.getItem('maintenanceList')).toBe(JSON.stringify([{ id: 'm1' }]));
    expect(localStorage.getItem('projectsList')).toBe(JSON.stringify([{ id: 'p1' }]));
    expect(localStorage.getItem('equipmentList')).toBeNull();
    expect(localStorage.getItem('techniciansList')).toBeNull();
  });

  it('migrateOldData copies legacy keys and initializes missing projects', () => {
    localStorage.setItem('customers', JSON.stringify([{ legacy: true }]));
    localStorage.setItem('reservations', JSON.stringify([{ legacy: true }]));
    localStorage.setItem('equipment', JSON.stringify([{ legacy: true }]));
    localStorage.setItem('technicians', JSON.stringify([{ legacy: true }]));

    migrateOldData();

    expect(localStorage.getItem('customersList')).toBe(JSON.stringify([{ legacy: true }]));
    expect(localStorage.getItem('reservationsList')).toBe(JSON.stringify([{ legacy: true }]));
    expect(localStorage.getItem('equipmentList')).toBe(JSON.stringify([{ legacy: true }]));
    expect(localStorage.getItem('techniciansList')).toBe(JSON.stringify([{ legacy: true }]));
    expect(localStorage.getItem('projectsList')).toBe('[]');
  });

  it('migrateOldData does not overwrite existing new keys', () => {
    localStorage.setItem('customers', 'legacy');
    localStorage.setItem('customersList', JSON.stringify([{ fresh: true }]));

    migrateOldData();

    expect(localStorage.getItem('customersList')).toBe(JSON.stringify([{ fresh: true }]));
  });
});
