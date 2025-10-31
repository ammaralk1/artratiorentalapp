import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createPreferencesMock } from '../helpers/preferencesMock.js';

let preferencesMockInstance;

const ensurePreferencesMock = () => {
  if (!preferencesMockInstance) {
    preferencesMockInstance = createPreferencesMock();
  }
  return preferencesMockInstance;
};

vi.mock('../../src/scripts/preferencesService.js', () => ensurePreferencesMock().factory());

const {
  preferenceListeners,
  setMockPreferences,
  resetMockPreferences,
  getMockPreferences
} = ensurePreferencesMock();

const updatePreferencesMockAccessor = () => ensurePreferencesMock().updatePreferencesMock;

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 150));

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
        <div class="reservations-subtabs-container">
          <div class="sub-tab-buttons tabs tabs-boxed" role="tablist">
            <button type="button" class="sub-tab-button tab tab-active active" data-sub-tab="create-tab" role="tab" aria-selected="true" aria-controls="create-tab"></button>
            <button type="button" class="sub-tab-button tab" data-sub-tab="my-reservations-tab" role="tab" aria-selected="false" aria-controls="my-reservations-tab"></button>
            <button type="button" class="sub-tab-button tab" data-sub-tab="calendar-tab" role="tab" aria-selected="false" aria-controls="calendar-tab"></button>
            <button type="button" class="sub-tab-button tab" data-sub-tab="reports-tab" role="tab" aria-selected="false" aria-controls="reports-tab"></button>
          </div>
        </div>
        <div class="sub-tab active" id="create-tab"></div>
        <div class="sub-tab" id="my-reservations-tab"></div>
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
  resetMockPreferences();
  preferenceListeners.clear();
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.clear();
  }
  setupDom();
  renderCustomersMock.mockClear();
  renderEquipmentMock.mockClear();
  renderReservationsMock.mockClear();
  setupReservationEventsMock.mockClear();
  renderCalendarMock.mockClear();
  renderTechniciansMock.mockClear();
  renderReportsMock.mockClear();
  renderMaintenanceMock.mockClear();
  const updateMock = updatePreferencesMockAccessor();
  updateMock?.mockClear?.();
  setMockPreferences.mockClear();
  getMockPreferences.mockClear();
  resetMockPreferences.mockClear();
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
    setMockPreferences({ dashboardTab: 'equipment-tab' });
    const module = await import('../../src/scripts/tabs.js');
    module.setupTabs();

    await nextTick();

    expect(renderEquipmentMock).toHaveBeenCalled();
    expect(document.getElementById('equipment-tab').classList.contains('active')).toBe(true);
    expect(document.body.classList.contains('tabs-loading')).toBe(false);
  });

  it('clicking tab stores selection, resets sub-tab, and triggers renderer', async () => {
    resetState();
    const module = await import('../../src/scripts/tabs.js');
    module.setupTabs();

    await nextTick();

    const updateMock = updatePreferencesMockAccessor();
    const equipmentButton = document.querySelector('[data-tab="equipment-tab"]');
    equipmentButton.click();

    expect(updateMock).toHaveBeenCalledWith({ dashboardTab: 'equipment-tab' });
    expect(getMockPreferences()).toEqual(expect.objectContaining({ dashboardTab: 'equipment-tab', dashboardSubTab: null }));
    expect(renderEquipmentMock).toHaveBeenCalled();
    expect(document.getElementById('equipment-tab').style.display).toBe('block');
  });

  it('activates reservations sub-tabs and triggers deferred renders', async () => {
    resetState();
    const module = await import('../../src/scripts/tabs.js');
    module.setupTabs();

    await nextTick();

    const reservationsButton = document.querySelector('[data-tab="reservations-tab"]');
    reservationsButton.click();
    await nextTick();

    expect(renderReservationsMock).toHaveBeenCalled(); // loaded via lazy import
    expect(setupReservationEventsMock).toHaveBeenCalled();

    document.querySelector('.sub-tab-button[data-sub-tab="calendar-tab"]').click();
    await nextTick();
    expect(renderCalendarMock).toHaveBeenCalled();
    expect(getMockPreferences().dashboardSubTab).toBe('calendar-tab');

    document.querySelector('.sub-tab-button[data-sub-tab="reports-tab"]').click();
    await nextTick();
    expect(renderReportsMock).toHaveBeenCalled();
  });

  it('defaults to create reservation sub-tab when entering reservations without explicit preference', async () => {
    resetState();
    const module = await import('../../src/scripts/tabs.js');
    module.setupTabs();

    await nextTick();

    const updateMock = updatePreferencesMockAccessor();
    const reservationsButton = document.querySelector('[data-tab="reservations-tab"]');
    reservationsButton.click();

    await nextTick();

    const createButton = document.querySelector('.sub-tab-button[data-sub-tab="create-tab"]');
    expect(createButton).not.toBeNull();
    expect(getMockPreferences().dashboardSubTab).toBe('create-tab');
    expect(updateMock).toHaveBeenCalledWith(expect.objectContaining({ dashboardSubTab: 'create-tab' }));
  });

  it('keeps the active reservations sub-tab when theme changes', async () => {
    resetState();
    const module = await import('../../src/scripts/tabs.js');
    module.setupTabs();

    await nextTick();

    const reservationsButton = document.querySelector('[data-tab="reservations-tab"]');
    reservationsButton.click();
    await nextTick();

    document.querySelector('.sub-tab-button[data-sub-tab="calendar-tab"]').click();
    await nextTick();

    expect(document.querySelector('.sub-tab-button[data-sub-tab="calendar-tab"]').classList.contains('active')).toBe(true);

    document.dispatchEvent(new Event('theme:changed'));
    await nextTick();
    await nextTick();

    expect(document.querySelector('.sub-tab-button[data-sub-tab="calendar-tab"]').classList.contains('active')).toBe(true);
  });

  it('keeps the active reservations sub-tab when language changes', async () => {
    resetState();
    const module = await import('../../src/scripts/tabs.js');
    module.setupTabs();

    await nextTick();

    const reservationsButton = document.querySelector('[data-tab="reservations-tab"]');
    reservationsButton.click();
    await nextTick();

    document.querySelector('.sub-tab-button[data-sub-tab="reports-tab"]').click();
    await nextTick();

    expect(document.querySelector('.sub-tab-button[data-sub-tab="reports-tab"]').classList.contains('active')).toBe(true);

    document.dispatchEvent(new CustomEvent('language:changed', { detail: { language: 'en' } }));
    document.dispatchEvent(new Event('language:translationsReady'));
    await nextTick();
    await nextTick();

    expect(document.querySelector('.sub-tab-button[data-sub-tab="reports-tab"]').classList.contains('active')).toBe(true);
  });

  it('restores stored sub-tab when re-entering reservations', async () => {
    resetState();
    setMockPreferences({
      dashboardTab: 'reservations-tab',
      dashboardSubTab: 'calendar-tab'
    });
    const module = await import('../../src/scripts/tabs.js');
    module.setupTabs();

    await nextTick();

    expect(renderReservationsMock).toHaveBeenCalled();
    await nextTick();
    expect(renderCalendarMock).toHaveBeenCalled();
    expect(document.querySelector('.sub-tab-button[data-sub-tab="calendar-tab"]').classList.contains('active')).toBe(true);
  });
});
