import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

const loadDataMock = vi.fn();
const normalizeNumbersMock = vi.fn();

vi.mock('../../src/scripts/storage.js', () => ({ loadData: loadDataMock }));
vi.mock('../../src/scripts/utils.js', () => ({ normalizeNumbers: normalizeNumbersMock }));

beforeEach(() => {
  vi.resetModules();
  loadDataMock.mockReset().mockReturnValue({ reservations: [] });
  normalizeNumbersMock.mockReset().mockImplementation((value) => String(value));
});

afterEach(() => {
  document.body.innerHTML = '';
  delete window.bootstrap;
});

describe('reservations/state helpers', () => {
  it('splitDateTime and combineDateTime handle edge cases', async () => {
    const { splitDateTime, combineDateTime } = await import('../../src/scripts/reservations/state.js');
    expect(splitDateTime('2024-01-01T08:30:45')).toEqual({ date: '2024-01-01', time: '08:30' });
    expect(splitDateTime(null)).toEqual({ date: '', time: '' });
    expect(combineDateTime('2024-01-01', '09:15')).toBe('2024-01-01T09:15');
    expect(combineDateTime('2024-01-01', '')).toBe('2024-01-01T00:00');
    expect(combineDateTime('', '10:00')).toBe('');
  });

  it('normalizeBarcodeValue applies numeric normalization and trimming', async () => {
    const { normalizeBarcodeValue } = await import('../../src/scripts/reservations/state.js');
    expect(normalizeBarcodeValue('  AbC123 ')).toBe('abc123');
    expect(normalizeNumbersMock).toHaveBeenCalled();
  });

  it('hasEquipmentConflict detects overlaps excluding ignored reservation', async () => {
    const { hasEquipmentConflict } = await import('../../src/scripts/reservations/state.js');
    loadDataMock.mockReturnValue({
      reservations: [
        {
          id: 'R1',
          start: '2024-05-01T10:00:00Z',
          end: '2024-05-02T10:00:00Z',
          items: [{ barcode: 'EQ1' }]
        },
        {
          id: 'R2',
          start: '2024-05-03T10:00:00Z',
          end: '2024-05-04T10:00:00Z',
          items: [{ barcode: 'EQ2' }]
        }
      ]
    });

    expect(hasEquipmentConflict('EQ1', '2024-05-01T12:00:00Z', '2024-05-01T13:00:00Z')).toBe(true);
    expect(hasEquipmentConflict('EQ2', '2024-05-01T12:00:00Z', '2024-05-01T13:00:00Z')).toBe(false);
    expect(hasEquipmentConflict('EQ1', '2024-05-03T12:00:00Z', '2024-05-03T13:00:00Z')).toBe(false);
    expect(hasEquipmentConflict('EQ1', '2024-05-01T12:00:00Z', '2024-05-01T13:00:00Z', 'R1')).toBe(false);
  });

  it('hasTechnicianConflict respects overlapping schedules', async () => {
    const { hasTechnicianConflict } = await import('../../src/scripts/reservations/state.js');
    loadDataMock.mockReturnValue({
      reservations: [
        {
          reservationId: '10',
          start: '2024-06-01T09:00:00Z',
          end: '2024-06-01T18:00:00Z',
          technicians: ['tech1', 'tech2']
        }
      ]
    });

    expect(hasTechnicianConflict('tech1', '2024-06-01T08:00:00Z', '2024-06-01T10:00:00Z')).toBe(true);
    expect(hasTechnicianConflict('tech3', '2024-06-01T08:00:00Z', '2024-06-01T10:00:00Z')).toBe(false);
    expect(hasTechnicianConflict('tech1', '2024-06-01T19:00:00Z', '2024-06-01T20:00:00Z')).toBe(false);
    expect(hasTechnicianConflict('tech1', '2024-06-01T08:00:00Z', '2024-06-01T10:00:00Z', '10')).toBe(false);
  });

  it('selection and cache setters manage state safely', async () => {
    const {
      setSelectedItems,
      getSelectedItems,
      addSelectedItem,
      removeSelectedItem,
      setCachedCustomers,
      setCachedEquipment,
      getCachedCustomers,
      getCachedEquipment,
      resetCachedData,
      resetState
    } = await import('../../src/scripts/reservations/state.js');

    setSelectedItems([{ id: 1 }]);
    addSelectedItem({ id: 2 });
    expect(getSelectedItems()).toEqual([{ id: 1 }, { id: 2 }]);
    removeSelectedItem(0);
    expect(getSelectedItems()).toEqual([{ id: 2 }]);

    setCachedCustomers([{ id: 'c1' }]);
    setCachedEquipment([{ id: 'e1' }]);
    expect(getCachedCustomers()).toEqual([{ id: 'c1' }]);
    expect(getCachedEquipment()).toEqual([{ id: 'e1' }]);

    resetCachedData();
    expect(getCachedCustomers()).toEqual([]);
    expect(getCachedEquipment()).toEqual([]);

    resetState();
    expect(getSelectedItems()).toEqual([]);
  });
});
