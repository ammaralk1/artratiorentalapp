import { describe, it, expect, beforeEach, vi } from 'vitest';

const actionMocks = vi.hoisted(() => ({
  loadData: vi.fn(),
  saveData: vi.fn(),
  showToast: vi.fn(),
  syncEquipmentStatuses: vi.fn(),
  syncTechniciansStatuses: vi.fn()
}));

vi.mock('../../src/scripts/storage.js', () => ({
  loadData: actionMocks.loadData,
  saveData: actionMocks.saveData
}));

vi.mock('../../src/scripts/utils.js', () => ({
  showToast: actionMocks.showToast
}));

vi.mock('../../src/scripts/equipment.js', () => ({
  syncEquipmentStatuses: actionMocks.syncEquipmentStatuses
}));

vi.mock('../../src/scripts/technicians.js', () => ({
  syncTechniciansStatuses: actionMocks.syncTechniciansStatuses
}));

vi.mock('../../src/scripts/language.js', () => ({
  t: vi.fn((_, fallback) => fallback ?? _)
}));

import { deleteReservation, confirmReservation } from '../../src/scripts/reservationsActions.js';

describe('reservationsActions module', () => {
  beforeEach(() => {
    actionMocks.loadData.mockReset();
    actionMocks.saveData.mockReset();
    actionMocks.showToast.mockReset();
    actionMocks.syncEquipmentStatuses.mockReset();
    actionMocks.syncTechniciansStatuses.mockReset();
  });

  it('returns false and shows warning when deleting a missing reservation', () => {
    actionMocks.loadData.mockReturnValue({ reservations: [] });

    const result = deleteReservation(0);

    expect(result).toBe(false);
    expect(actionMocks.showToast).toHaveBeenCalledWith('⚠️ تعذر العثور على بيانات الحجز');
    expect(actionMocks.saveData).not.toHaveBeenCalled();
  });

  it('removes reservation, refreshes caches and triggers callbacks on delete', () => {
    const reservations = [{ id: 'r1' }, { id: 'r2' }];
    actionMocks.loadData.mockReturnValue({ reservations });
    const afterChange = vi.fn();

    const result = deleteReservation(0, { onAfterChange: afterChange });

    expect(result).toBe(true);
    expect(reservations).toEqual([{ id: 'r2' }]);
    expect(actionMocks.saveData).toHaveBeenCalledWith({ reservations: [{ id: 'r2' }] });
    expect(actionMocks.syncEquipmentStatuses).toHaveBeenCalledTimes(1);
    expect(actionMocks.syncTechniciansStatuses).toHaveBeenCalledTimes(1);
    expect(afterChange).toHaveBeenCalledTimes(1);
    expect(actionMocks.showToast).toHaveBeenCalledWith('🗑️ تم حذف الحجز');
  });

  it('marks reservation as confirmed and persists changes', () => {
    const reservations = [{ id: 'r1', confirmed: false }];
    actionMocks.loadData.mockReturnValue({ reservations });
    const afterChange = vi.fn();

    const result = confirmReservation(0, { onAfterChange: afterChange });

    expect(result).toBe(true);
    expect(reservations[0].confirmed).toBe(true);
    expect(actionMocks.saveData).toHaveBeenCalledWith({ reservations });
    expect(actionMocks.syncEquipmentStatuses).toHaveBeenCalledTimes(1);
    expect(actionMocks.syncTechniciansStatuses).toHaveBeenCalledTimes(1);
    expect(afterChange).toHaveBeenCalledTimes(1);
    expect(actionMocks.showToast).toHaveBeenCalledWith('✅ تم تأكيد الحجز');
  });

  it('shows warning when trying to confirm a missing reservation', () => {
    actionMocks.loadData.mockReturnValue({ reservations: [] });

    const result = confirmReservation(2);

    expect(result).toBe(false);
    expect(actionMocks.showToast).toHaveBeenCalledWith('⚠️ تعذر العثور على بيانات الحجز');
    expect(actionMocks.saveData).not.toHaveBeenCalled();
  });
});
