import { describe, it, expect, beforeEach, vi } from 'vitest';

const calendarMocks = vi.hoisted(() => {
  const renderMock = vi.fn();
  const destroyMock = vi.fn();
  const changeViewMock = vi.fn();
  const constructorMock = vi.fn(() => ({
    render: renderMock,
    destroy: destroyMock,
    changeView: changeViewMock,
    updateSize: vi.fn()
  }));
  return { renderMock, destroyMock, changeViewMock, constructorMock };
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

// FullCalendar is accessed as a global by the module under test.
global.FullCalendar = { Calendar: calendarMocks.constructorMock };

import { renderCalendar } from '../../src/scripts/calendar.js';
import { setReservationsState } from '../../src/scripts/reservationsService.js';

describe('calendar module', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    loadDataMock.mockReset();
    saveDataMock.mockReset();
    ensureReservationsLoadedMock.mockClear();
    calendarMocks.renderMock.mockClear();
    calendarMocks.destroyMock.mockClear();
    calendarMocks.changeViewMock.mockClear();
    calendarMocks.constructorMock.mockClear();
  });

  it('does not instantiate calendar when container element is missing', () => {
    loadDataMock.mockReturnValue({ reservations: [], customers: [] });

    renderCalendar();

    expect(calendarMocks.constructorMock).not.toHaveBeenCalled();
  });

  it('builds events with correct palette and destroys previous instance on re-render', async () => {
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

    const [, options] = calendarMocks.constructorMock.mock.calls[0];
    expect(options.events).toHaveLength(4);

    const backgrounds = options.events.map((event) => event.backgroundColor);
    expect(backgrounds).toEqual([
      'linear-gradient(135deg, #4361ee, #3a0ca3)',
      'linear-gradient(135deg, #4361ee, #3a0ca3)',
      'linear-gradient(135deg, #4361ee, #3a0ca3)',
      'linear-gradient(135deg, #4361ee, #3a0ca3)'
    ]);

    expect(options.events[0].extendedProps.customerName).toBe('عميل');
    expect(typeof options.eventContent).toBe('function');
    expect(typeof options.eventClick).toBe('function');

    expect(calendarMocks.renderMock).toHaveBeenCalledTimes(1);

    renderCalendar();

    await vi.waitFor(() => {
      expect(calendarMocks.constructorMock).toHaveBeenCalledTimes(1);
    });

    expect(calendarMocks.destroyMock).not.toHaveBeenCalled();
  });
});
