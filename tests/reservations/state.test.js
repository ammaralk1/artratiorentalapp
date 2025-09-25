import { describe, it, expect, beforeEach, vi } from 'vitest';

const storageState = {
  reservations: []
};

vi.mock('../../src/scripts/storage.js', () => ({
  loadData: () => storageState
}));

import {
  combineDateTime,
  hasEquipmentConflict,
  hasTechnicianConflict
} from '../../src/scripts/reservations/state.js';

function iso(date, time) {
  return `${date}T${time}`;
}

describe('reservations/state', () => {
  beforeEach(() => {
    storageState.reservations = [];
  });

  it('combineDateTime returns ISO-like string even when time empty', () => {
    expect(combineDateTime('2024-05-10', '')).toBe('2024-05-10T00:00');
    expect(combineDateTime('2024-05-10', '14:30')).toBe('2024-05-10T14:30');
  });

  it('detects equipment conflicts within overlapping ranges', () => {
    storageState.reservations = [
      {
        id: 'RSV-100',
        start: iso('2024-05-10', '09:00'),
        end: iso('2024-05-10', '12:00'),
        items: [{ barcode: 'cam-123' }]
      }
    ];

    expect(
      hasEquipmentConflict('CAM-123', iso('2024-05-10', '08:00'), iso('2024-05-10', '10:00'))
    ).toBe(true);

    expect(
      hasEquipmentConflict('cam-123', iso('2024-05-10', '12:00'), iso('2024-05-10', '14:00'))
    ).toBe(false);

    expect(
      hasEquipmentConflict('cam-123', iso('2024-05-10', '08:00'), iso('2024-05-10', '10:00'), 'RSV-100')
    ).toBe(false);
  });

  it('detects technician conflicts within overlapping ranges', () => {
    storageState.reservations = [
      {
        id: 'RSV-200',
        start: iso('2024-06-01', '10:00'),
        end: iso('2024-06-01', '13:00'),
        technicians: ['tech-1'],
        items: []
      }
    ];

    expect(
      hasTechnicianConflict('tech-1', iso('2024-06-01', '11:00'), iso('2024-06-01', '12:00'))
    ).toBe(true);

    expect(
      hasTechnicianConflict('tech-1', iso('2024-06-01', '13:00'), iso('2024-06-01', '15:00'))
    ).toBe(false);

    expect(
      hasTechnicianConflict('tech-1', iso('2024-06-01', '11:00'), iso('2024-06-01', '12:00'), 'RSV-200')
    ).toBe(false);
  });
});
