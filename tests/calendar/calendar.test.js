import { describe, it, expect, beforeEach, vi } from 'vitest';

const calendarMocks = vi.hoisted(() => {
  const destroyMock = vi.fn();
  const changeViewMock = vi.fn();
  const onMock = vi.fn();
  const createSchedulesMock = vi.fn();
  const createEventsMock = undefined; // prefer createSchedules path
  const constructorMock = vi.fn(() => ({
    destroy: destroyMock,
    changeView: changeViewMock,
    on: onMock,
    createSchedules: createSchedulesMock,
    createEvents: createEventsMock,
  }));
  return { destroyMock, changeViewMock, onMock, createSchedulesMock, constructorMock };
});

const loadDataMock = vi.hoisted(() => vi.fn());
const ensureReservationsLoadedMock = vi.hoisted(() => vi.fn().mockResolvedValue([]));

const saveDataMock = vi.hoisted(() => vi.fn());

vi.mock('../../src/scripts/storage.js', () => ({
  loadData: loadDataMock,
  saveData: saveDataMock
}));

vi.mock('../../src/scripts/language.js', () => ({
  t: vi.fn((_, fallback) => fallback ?? _),
  getCurrentLanguage: vi.fn(() => 'ar')
}));

vi.mock('../../src/scripts/technicians.js', () => ({
  syncTechniciansStatuses: vi.fn(() => [])
}));

vi.mock('../../src/scripts/reservationsActions.js', () => ({
  ensureReservationsLoaded: ensureReservationsLoadedMock,
  resetReservationsFetchState: vi.fn()
}));

vi.mock('../../src/scripts/utils.js', () => ({
  formatDateTime: vi.fn((value) => `formatted-${value}`),
  normalizeNumbers: (value) => String(value)
}));

// TUI Calendar is accessed via window.toastui.Calendar by the module
global.window = global.window || {};
global.window.toastui = { Calendar: calendarMocks.constructorMock };

import { renderCalendar } from '../../src/scripts/calendar.js';
import { setReservationsState } from '../../src/scripts/reservationsService.js';

describe('calendar module', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    loadDataMock.mockReset();
    saveDataMock.mockReset();
    ensureReservationsLoadedMock.mockClear();
    calendarMocks.destroyMock.mockClear();
    calendarMocks.changeViewMock.mockClear();
    calendarMocks.onMock.mockClear();
    calendarMocks.createSchedulesMock.mockClear();
    calendarMocks.constructorMock.mockClear();
  });

  it('does not instantiate calendar when container element is missing', () => {
    loadDataMock.mockReturnValue({ reservations: [], customers: [] });

    renderCalendar();

    expect(calendarMocks.constructorMock).not.toHaveBeenCalled();
  });

  it('creates schedules and destroys previous instance on re-render', async () => {
    document.body.innerHTML = '<div id="calendar"></div>';

    const reservations = [
      { id: 'r-green', customerId: '1', customerName: 'عميل', start: '2099-01-01T08:00:00Z', end: '2099-01-01T10:00:00Z', paid: 'paid', confirmed: 'true' },
      { id: 'r-red', customerId: '1', customerName: 'عميل', start: '2099-01-02T08:00:00Z', end: '2099-01-02T10:00:00Z', paid: false, confirmed: 'true' },
      { id: 'r-yellow', customerId: '1', customerName: 'عميل', start: '2099-01-03T08:00:00Z', end: '2099-01-03T10:00:00Z', paid: 'paid', confirmed: false },
      { id: 'r-gray', customerId: '1', customerName: 'عميل', start: '1999-01-01T08:00:00Z', end: '1999-01-01T10:00:00Z', paid: 'paid', confirmed: 'true' }
    ];

    loadDataMock.mockReturnValue({
      reservations,
      customers: [{ id: '1', customerName: 'عميل' }]
    });
    ensureReservationsLoadedMock.mockResolvedValue(reservations);
    setReservationsState(reservations);

    renderCalendar();

    await vi.waitFor(() => {
      expect(calendarMocks.constructorMock).toHaveBeenCalledTimes(1);
    });

    // Schedules should be created once with the reservations mapped
    expect(calendarMocks.createSchedulesMock).toHaveBeenCalledTimes(1);
    const schedulesArg = calendarMocks.createSchedulesMock.mock.calls[0][0];
    expect(Array.isArray(schedulesArg)).toBe(true);
    expect(schedulesArg).toHaveLength(4);
    expect(schedulesArg[0].raw.customerName).toBe('عميل');

    renderCalendar();

    await vi.waitFor(() => {
      // Re-render should recreate TUI calendar instance
      expect(calendarMocks.constructorMock).toHaveBeenCalledTimes(2);
    });

    // Previous instance destroyed
    expect(calendarMocks.destroyMock).toHaveBeenCalled();
  });
});
