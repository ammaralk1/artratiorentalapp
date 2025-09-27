import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 110));

const setupDom = () => {
  document.body.innerHTML = `
    <div class="tab-buttons">
      <button class="tab-button active" data-tab="customers-tab">Customers</button>
      <button class="tab-button" data-tab="equipment-tab">Equipment</button>
      <button class="tab-button" data-tab="reservations-tab">Reservations</button>
    </div>
    <div class="tab-content-wrapper">
      <div class="tab active" id="customers-tab"></div>
      <div class="tab" id="equipment-tab"></div>
      <div class="tab" id="reservations-tab">
        <div class="sub-tabs">
          <button class="sub-tab-button active" data-sub-tab="my-reservations-tab"></button>
          <button class="sub-tab-button" data-sub-tab="calendar-tab"></button>
          <button class="sub-tab-button" data-sub-tab="reports-tab"></button>
        </div>
        <div class="sub-tab active" id="my-reservations-tab"></div>
        <div class="sub-tab" id="calendar-tab"></div>
        <div class="sub-tab" id="reports-tab"></div>
      </div>
    </div>
  `;
  document.body.classList.add('tabs-loading');
};

const renderCustomersMock = vi.fn();
const renderEquipmentMock = vi.fn();
const renderReservationsMock = vi.fn();
const setupReservationEventsMock = vi.fn();
const renderCalendarMock = vi.fn();
const renderTechniciansMock = vi.fn();
const renderReportsMock = vi.fn();
const renderMaintenanceMock = vi.fn();

vi.mock('../../src/scripts/customers.js', () => ({ renderCustomers: renderCustomersMock }));
vi.mock('../../src/scripts/equipment.js', () => ({ renderEquipment: renderEquipmentMock }));
vi.mock('../../src/scripts/technicians.js', () => ({ renderTechnicians: renderTechniciansMock }));
vi.mock('../../src/scripts/reports.js', () => ({ renderReports: renderReportsMock }));
vi.mock('../../src/scripts/maintenance.js', () => ({ renderMaintenance: renderMaintenanceMock }));
vi.mock('../../src/scripts/reservationsUI.js', () => ({ renderReservations: renderReservationsMock, setupReservationEvents: setupReservationEventsMock }));
vi.mock('../../src/scripts/calendar.js', () => ({ renderCalendar: renderCalendarMock }));

const resetState = () => {
  vi.resetModules();
  localStorage.clear();
  setupDom();
  renderCustomersMock.mockClear();
  renderEquipmentMock.mockClear();
  renderReservationsMock.mockClear();
  setupReservationEventsMock.mockClear();
  renderCalendarMock.mockClear();
  renderTechniciansMock.mockClear();
  renderReportsMock.mockClear();
  renderMaintenanceMock.mockClear();
};

describe('tabs module', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
    document.body.className = '';
  });

  it('activates stored tab on init and renders corresponding section', async () => {
    resetState();
    localStorage.setItem('dashboard-active-tab', 'equipment-tab');
    const module = await import('../../src/scripts/tabs.js');
    module.setupTabs();

    expect(renderEquipmentMock).toHaveBeenCalled();
    expect(document.getElementById('equipment-tab').classList.contains('active')).toBe(true);
    expect(document.body.classList.contains('tabs-loading')).toBe(false);
  });

  it('clicking tab stores selection, resets sub-tab, and triggers renderer', async () => {
    resetState();
    const module = await import('../../src/scripts/tabs.js');
    module.setupTabs();

    const equipmentButton = document.querySelector('[data-tab="equipment-tab"]');
    equipmentButton.click();

    expect(localStorage.getItem('dashboard-active-tab')).toBe('equipment-tab');
    expect(localStorage.getItem('dashboard-active-sub-tab')).toBeNull();
    expect(renderEquipmentMock).toHaveBeenCalled();
    expect(document.getElementById('equipment-tab').style.display).toBe('block');
  });

  it('activates reservations sub-tabs and triggers deferred renders', async () => {
    resetState();
    const module = await import('../../src/scripts/tabs.js');
    module.setupTabs();

    const reservationsButton = document.querySelector('[data-tab="reservations-tab"]');
    reservationsButton.click();

    expect(renderReservationsMock).toHaveBeenCalledTimes(1); // from main tab
    expect(setupReservationEventsMock).toHaveBeenCalled();

    document.querySelector('.sub-tab-button[data-sub-tab="calendar-tab"]').click();
    await nextTick();
    expect(renderCalendarMock).toHaveBeenCalled();
    expect(localStorage.getItem('dashboard-active-sub-tab')).toBe('calendar-tab');

    document.querySelector('.sub-tab-button[data-sub-tab="reports-tab"]').click();
    await nextTick();
    expect(renderReportsMock).toHaveBeenCalled();
  });

  it('restores stored sub-tab when re-entering reservations', async () => {
    resetState();
    localStorage.setItem('dashboard-active-tab', 'reservations-tab');
    localStorage.setItem('dashboard-active-sub-tab', 'calendar-tab');
    const module = await import('../../src/scripts/tabs.js');
    module.setupTabs();

    expect(renderReservationsMock).toHaveBeenCalled();
    await nextTick();
    expect(renderCalendarMock).toHaveBeenCalled();
    expect(document.querySelector('.sub-tab-button[data-sub-tab="calendar-tab"]').classList.contains('active')).toBe(true);
  });
});
