import { describe, it, expect, beforeEach, vi } from 'vitest';

const calendarMocks = vi.hoisted(() => {
  const renderMock = vi.fn();
  const destroyMock = vi.fn();
  const constructorMock = vi.fn(() => ({
    render: renderMock,
    destroy: destroyMock
  }));
  return { renderMock, destroyMock, constructorMock };
});

const loadDataMock = vi.hoisted(() => vi.fn());

vi.mock('../../src/scripts/storage.js', () => ({
  loadData: loadDataMock
}));

vi.mock('../../src/scripts/language.js', () => ({
  t: vi.fn((_, fallback) => fallback ?? _),
  getCurrentLanguage: vi.fn(() => 'ar')
}));

vi.mock('../../src/scripts/technicians.js', () => ({
  syncTechniciansStatuses: vi.fn(() => [])
}));

vi.mock('../../src/scripts/utils.js', () => ({
  formatDateTime: vi.fn((value) => `formatted-${value}`),
  normalizeNumbers: (value) => String(value)
}));

// FullCalendar is accessed as a global by the module under test.
global.FullCalendar = { Calendar: calendarMocks.constructorMock };

import { renderCalendar } from '../../src/scripts/calendar.js';

describe('calendar module', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    loadDataMock.mockReset();
    calendarMocks.renderMock.mockClear();
    calendarMocks.destroyMock.mockClear();
    calendarMocks.constructorMock.mockClear();
  });

  it('does not instantiate calendar when container element is missing', () => {
    loadDataMock.mockReturnValue({ reservations: [], customers: [] });

    renderCalendar();

    expect(calendarMocks.constructorMock).not.toHaveBeenCalled();
  });

  it('builds events with correct palette and destroys previous instance on re-render', () => {
    document.body.innerHTML = '<div id="calendar"></div>';

    const reservations = [
      { id: 'r-green', customerId: '1', start: '2099-01-01T08:00:00Z', end: '2099-01-01T10:00:00Z', paid: 'paid', confirmed: 'true' },
      { id: 'r-red', customerId: '1', start: '2099-01-02T08:00:00Z', end: '2099-01-02T10:00:00Z', paid: false, confirmed: 'true' },
      { id: 'r-yellow', customerId: '1', start: '2099-01-03T08:00:00Z', end: '2099-01-03T10:00:00Z', paid: 'paid', confirmed: false },
      { id: 'r-gray', customerId: '1', start: '1999-01-01T08:00:00Z', end: '1999-01-01T10:00:00Z', paid: 'paid', confirmed: 'true' }
    ];

    loadDataMock.mockReturnValue({
      reservations,
      customers: [{ id: '1', customerName: 'عميل' }]
    });

    const addEventSpy = vi.spyOn(document, 'addEventListener');

    renderCalendar();

    expect(calendarMocks.constructorMock).toHaveBeenCalledTimes(1);
    const [, options] = calendarMocks.constructorMock.mock.calls[0];
    expect(options.events).toHaveLength(4);

    const backgrounds = options.events.map((event) => event.backgroundColor);
    expect(backgrounds).toEqual([
      '#198754',
      '#dc3545',
      '#ffc107',
      '#6c757d'
    ]);

    expect(options.events[0].extendedProps.customerName).toBe('عميل');
    expect(typeof options.eventContent).toBe('function');
    expect(typeof options.eventClick).toBe('function');

    expect(calendarMocks.renderMock).toHaveBeenCalledTimes(1);
    expect(addEventSpy).toHaveBeenCalledWith('language:changed', expect.any(Function));

    renderCalendar();

    expect(calendarMocks.destroyMock).toHaveBeenCalledTimes(1);
    expect(calendarMocks.constructorMock).toHaveBeenCalledTimes(2);
    expect(addEventSpy).toHaveBeenCalledTimes(1);

    addEventSpy.mockRestore();
  });
});
