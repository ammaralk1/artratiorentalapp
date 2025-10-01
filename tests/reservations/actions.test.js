import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const actionMocks = vi.hoisted(() => ({
  loadData: vi.fn(),
  saveData: vi.fn(),
  showToast: vi.fn(),
  syncEquipmentStatuses: vi.fn(),
  syncTechniciansStatuses: vi.fn()
}));

const authMocks = vi.hoisted(() => ({
  userCanManageDestructiveActions: vi.fn(() => true),
  notifyPermissionDenied: vi.fn()
}));

vi.mock('../../src/scripts/storage.js', () => ({
  loadData: actionMocks.loadData,
  saveData: actionMocks.saveData
}));

vi.mock('../../src/scripts/utils.js', async () => {
  const actual = await vi.importActual('../../src/scripts/utils.js');
  return {
    ...actual,
    showToast: actionMocks.showToast,
    normalizeNumbers: (value) => String(value)
  };
});

vi.mock('../../src/scripts/equipment.js', () => ({
  syncEquipmentStatuses: actionMocks.syncEquipmentStatuses
}));

vi.mock('../../src/scripts/technicians.js', () => ({
  syncTechniciansStatuses: actionMocks.syncTechniciansStatuses
}));

vi.mock('../../src/scripts/language.js', () => ({
  t: vi.fn((_, fallback) => fallback ?? _)
}));

vi.mock('../../src/scripts/auth.js', () => authMocks);

import * as reservationsService from '../../src/scripts/reservationsService.js';
import { deleteReservation, confirmReservation } from '../../src/scripts/reservationsActions.js';

describe('reservationsActions module', () => {
  let deleteReservationApiSpy;
  let confirmReservationApiSpy;

  let originalRequestIdleCallback;
  let originalRequestAnimationFrame;

  beforeEach(() => {
    actionMocks.loadData.mockReset();
    actionMocks.saveData.mockReset();
    actionMocks.showToast.mockReset();
    actionMocks.syncEquipmentStatuses.mockReset();
    actionMocks.syncTechniciansStatuses.mockReset();

    reservationsService.setReservationsState([]);
    actionMocks.saveData.mockClear();

    authMocks.userCanManageDestructiveActions.mockReset();
    authMocks.userCanManageDestructiveActions.mockReturnValue(true);
    authMocks.notifyPermissionDenied.mockReset();

    deleteReservationApiSpy = vi.spyOn(reservationsService, 'deleteReservationApi').mockImplementation(async (id) => {
      const remaining = reservationsService.getReservationsState().filter((reservation) => String(reservation.id ?? reservation.reservationId) !== String(id));
      reservationsService.setReservationsState(remaining);
    });

    confirmReservationApiSpy = vi.spyOn(reservationsService, 'confirmReservationApi').mockImplementation(async (id) => {
      const current = reservationsService.getReservationsState();
      const updated = current.map((reservation) => {
        if (String(reservation.id ?? reservation.reservationId) !== String(id)) {
          return reservation;
        }
        return { ...reservation, confirmed: true, status: 'confirmed' };
      });
      reservationsService.setReservationsState(updated);
      return updated.find((reservation) => String(reservation.id ?? reservation.reservationId) === String(id)) ?? null;
    });

    if (typeof window !== 'undefined') {
      originalRequestIdleCallback = window.requestIdleCallback;
      originalRequestAnimationFrame = window.requestAnimationFrame;
      window.requestIdleCallback = (cb) => cb();
      window.requestAnimationFrame = (cb) => cb();
    }
  });

  afterEach(() => {
    deleteReservationApiSpy?.mockRestore();
    confirmReservationApiSpy?.mockRestore();
    if (typeof window !== 'undefined') {
      window.requestIdleCallback = originalRequestIdleCallback;
      window.requestAnimationFrame = originalRequestAnimationFrame;
    }
  });

  it('returns false and shows warning when deleting a missing reservation', async () => {
    actionMocks.loadData.mockReturnValue({ reservations: [] });

    const result = await deleteReservation(0);

    expect(result).toBe(false);
    expect(actionMocks.showToast).toHaveBeenCalledWith('⚠️ تعذر العثور على بيانات الحجز');
    expect(actionMocks.saveData).not.toHaveBeenCalled();
  });

  it('removes reservation, refreshes caches and triggers callbacks on delete', async () => {
    const reservations = [{ id: 'r1' }, { id: 'r2' }];
    actionMocks.loadData.mockReturnValue({ reservations });
    reservationsService.setReservationsState(reservations);
    actionMocks.saveData.mockClear();
    const afterChange = vi.fn();

    const result = await deleteReservation(0, { onAfterChange: afterChange });

    expect(result).toBe(true);
    expect(reservationsService.getReservationsState()).toEqual([expect.objectContaining({ id: 'r2' })]);
    expect(actionMocks.saveData).toHaveBeenCalledWith({ reservations: expect.arrayContaining([expect.objectContaining({ id: 'r2' })]) });
    expect(actionMocks.syncEquipmentStatuses).toHaveBeenCalledTimes(1);
    expect(actionMocks.syncTechniciansStatuses).toHaveBeenCalledTimes(1);
    expect(afterChange).toHaveBeenCalledTimes(1);
    expect(actionMocks.showToast).toHaveBeenCalledWith('🗑️ تم حذف الحجز');
  });

  it('marks reservation as confirmed and persists changes', async () => {
    const reservations = [{ id: 'r1', confirmed: false }];
    actionMocks.loadData.mockReturnValue({ reservations });
    reservationsService.setReservationsState(reservations);
    actionMocks.saveData.mockClear();
    const afterChange = vi.fn();

    const result = await confirmReservation(0, { onAfterChange: afterChange });

    expect(result).toBe(true);
    expect(reservationsService.getReservationsState()[0].confirmed).toBe(true);
    expect(actionMocks.saveData).toHaveBeenCalledWith({ reservations: reservationsService.getReservationsState() });
    expect(actionMocks.syncEquipmentStatuses).toHaveBeenCalledTimes(1);
    expect(actionMocks.syncTechniciansStatuses).toHaveBeenCalledTimes(1);
    expect(afterChange).toHaveBeenCalledTimes(1);
    expect(actionMocks.showToast).toHaveBeenCalledWith('✅ تم تأكيد الحجز');
  });

  it('shows warning when trying to confirm a missing reservation', async () => {
    actionMocks.loadData.mockReturnValue({ reservations: [] });

    const result = await confirmReservation(2);

    expect(result).toBe(false);
    expect(actionMocks.showToast).toHaveBeenCalledWith('⚠️ تعذر العثور على بيانات الحجز');
    expect(actionMocks.saveData).not.toHaveBeenCalled();
  });
});
