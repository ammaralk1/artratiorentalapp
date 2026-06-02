import './styles/app.css';

import { logout, checkAuth } from './scripts/auth.js';
import { setupTabs } from './scripts/tabs.js';
import { loadData } from './scripts/storage.js';
// Lazy: calendar/reservations/maintenance now load per-tab in tabs.js
import { applyStoredTheme, initThemeToggle } from './scripts/theme.js';
import { initDashboardShell } from './scripts/dashboardShell.js';
import { initEnhancedSelects } from './scripts/ui/enhancedSelect.js';
import { initModalA11yFocusGuards } from './scripts/ui/modalAccessibility.js';
import { applyLocalDashboardFixture, isLocalDashboardFixtureEnabled } from './scripts/devFixtures.js';
import {
  getReservationUIHandler,
  waitForReservationUIHandler
} from './scripts/reservations/uiBridge.js';

applyStoredTheme();
const dashboardFixtureActive = applyLocalDashboardFixture();

let pendingReservationEdit = null;
let pendingReservationEditPromise = null;
let dashboardMetricsLoadPromise = null;

function redirectLegacyOperationsRoute() {
  const hash = window.location.hash || '';
  const target = hash === '#customers-tab'
    ? 'clients.html'
    : hash === '#technicians-tab'
      ? 'crew.html'
      : hash === '#equipment-tab'
        ? 'equipment.html'
        : hash === '#maintenance-tab'
          ? 'maintenance.html'
      : '';
  if (target) {
    window.location.replace(`${target}${window.location.search || ''}`);
    return true;
  }

  const pageName = String(window.location.pathname || '').split('/').pop();
  if (pageName === 'dashboard.html') {
    const operationsHash = hash === '#reservations' || hash === '#reservations-tab' ? '' : hash;
    window.location.replace(`operations.html${window.location.search || ''}${operationsHash}`);
    return true;
  }

  return false;
}

function revealDashboardPage() {
  document.body?.classList.remove('auth-pending');
}

// Early restore for reservation draft so fields persist across refresh
function earlyRestoreReservationDraft() {
  try {
    const key = 'reservations:create:draft';
    const read = () => {
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          const raw = window.sessionStorage.getItem(key);
          if (raw) return JSON.parse(raw);
        }
      } catch (_) { /* ignore */ }
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const raw = window.localStorage.getItem(key);
          if (raw) return JSON.parse(raw);
        }
      } catch (_) { /* ignore */ }
      return null;
    };

    const draft = read();
    if (!draft) return;

    const setIfEmpty = (id, value) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (typeof value !== 'string') return;
      if (!el.value) el.value = value;
    };

    setIfEmpty('res-start', draft.startDate || '');
    setIfEmpty('res-end', draft.endDate || '');
    setIfEmpty('res-start-time', draft.startTime || '');
    setIfEmpty('res-end-time', draft.endTime || '');

    // Customer label and hidden id
    try {
      const customerInput = document.getElementById('res-customer-input');
      const customerHidden = document.getElementById('res-customer');
      if (customerInput && typeof draft.customerLabel === 'string' && !customerInput.value) {
        customerInput.value = draft.customerLabel;
      }
      if (customerHidden && typeof draft.customerId === 'string' && !customerHidden.value) {
        customerHidden.value = draft.customerId;
      }
    } catch (_) { /* ignore */ }
  } catch (_) { /* ignore */ }
}

function loadDashboardMetricsModule() {
  if (!dashboardMetricsLoadPromise) {
    dashboardMetricsLoadPromise = import('./scripts/dashboardMetrics.js')
      .then((module) => {
        try {
          if (typeof module.initDashboardMetrics === 'function') {
            module.initDashboardMetrics();
          }
        } catch (error) {
          console.error('❌ Failed to initialise dashboard metrics', error);
        }
        return module;
      })
      .catch((error) => {
        console.error('❌ Failed to load dashboard metrics module', error);
        dashboardMetricsLoadPromise = null;
        throw error;
      });
  }
  return dashboardMetricsLoadPromise;
}

function scheduleDashboardMetricsInit() {
  const load = () => {
    void loadDashboardMetricsModule();
  };

  if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => {
      load();
    }, { timeout: 1500 });
  } else {
    setTimeout(load, 0);
  }
}

function scheduleDashboardDataPrefetch() {
  if (dashboardFixtureActive || isLocalDashboardFixtureEnabled()) {
    return;
  }

  const kickoff = async () => {
    try {
      const tasks = [];
      tasks.push(import('./scripts/projectsService.js').then((m) => m.refreshProjectsFromApi().catch(() => {})).catch(() => {}));
      tasks.push(import('./scripts/reservationsService.js').then((m) => m.refreshReservationsFromApi().catch(() => {})).catch(() => {}));
      tasks.push(import('./scripts/techniciansService.js').then((m) => m.refreshTechniciansFromApi().catch(() => {})).catch(() => {}));
      tasks.push(import('./scripts/maintenanceService.js').then((m) => m.refreshMaintenanceFromApi().catch(() => {})).catch(() => {}));
      tasks.push(import('./scripts/equipment.js').then((m) => m.refreshEquipmentFromApi({ showToastOnError: false }).catch(() => {})).catch(() => {}));
      // Ensure packages snapshot is available early for PDF and UI grouping
      tasks.push(import('./scripts/equipmentPackagesManager.js').then((m) => m.refreshPackagesFromApi().catch(() => {})).catch(() => {}));
      // Prefetch reservations UI module in idle time to reduce first-click latency
      tasks.push(import('./scripts/reservationsUI.js').catch(() => {}));
      await Promise.allSettled(tasks);
    } catch (_) {
      // ignore background prefetch errors
    }
  };

  if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => { kickoff(); }, { timeout: 2500 });
  } else {
    setTimeout(kickoff, 500);
  }
}

async function initApp() {
  if (redirectLegacyOperationsRoute()) {
    return;
  }
  const user = await checkAuth();
  if (!user) {
    return;
  }
  initDashboardShell();
  // Restore reservation draft very early so fields are visible even before module init
  try { earlyRestoreReservationDraft(); } catch (_) {}
  setupTabs();
  initThemeToggle();
  initEnhancedSelects();
  // Ensure closing any modal won't leave focus on a hidden (aria-hidden) ancestor
  try { initModalA11yFocusGuards(); } catch (_) {}
  // Calendar, Maintenance, and Reservations UI initialise lazily upon tab activation

  scheduleDashboardMetricsInit();
  scheduleDashboardDataPrefetch();

  // ✅ زر تسجيل الخروج
  document.getElementById("logout-btn")?.addEventListener("click", logout);

  // ✅ تحسين اختيار التاريخ والوقت
  revealDashboardPage();
  enhanceDateTimePickers();
  handlePendingReservationEdit();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initApp().catch((error) => {
      console.error('❌ Failed to initialise app', error);
    });
  }, { once: true });
} else {
  initApp().catch((error) => {
    console.error('❌ Failed to initialise app', error);
  });
}

// ✅ ضبط دقيقة 00 وسلوك blur بعد اختيار الوقت
function enhanceDateTimePickers() {
  document.querySelectorAll('input[type="datetime-local"]').forEach(input => {
    input.addEventListener("input", () => {
      const value = input.value;
      if (!value.includes("T")) return;

      const [date, time] = value.split("T");
      const [hour] = time.split(":");

      const fixedTime = `${hour.padStart(2, "0")}:00`;
      const newValue = `${date}T${fixedTime}`;

      if (input.value !== newValue) {
        input.value = newValue;

        // Blur بعد التأخير القصير
        setTimeout(() => input.blur(), 150);
      }
    });
  });
}

function handlePendingReservationEdit() {
  const params = new URLSearchParams(window.location.search);
  const pendingId = params.get('reservationEditId');
  const pendingIndexValue = params.get('reservationEditIndex');

  if (!pendingId && !pendingIndexValue) {
    return;
  }

  pendingReservationEdit = {
    reservationId: pendingId,
    reservationIndex: pendingIndexValue != null ? Number(pendingIndexValue) : null,
  };

  void applyPendingReservationEdit();

  params.delete('reservationEditId');
  params.delete('reservationEditIndex');
  const newSearch = params.toString();
  const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${window.location.hash || ''}`;
  window.history.replaceState({}, document.title, newUrl);
}

function isDashboardTabActive(tabId) {
  const tabPanel = document.getElementById(tabId);
  return Boolean(tabPanel?.classList.contains('active') && tabPanel?.style.display !== 'none');
}

function waitForDashboardTab(tabId) {
  return new Promise((resolve) => {
    if (isDashboardTabActive(tabId)) {
      resolve();
      return;
    }

    const handleTabChange = (event) => {
      if (event?.detail?.tabId === tabId) {
        document.removeEventListener('dashboard:tabChanged', handleTabChange);
        resolve();
      }
    };

    document.addEventListener('dashboard:tabChanged', handleTabChange);

    const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
    tabButton?.click();
  });
}

function isReservationSubTabActive(subTabId) {
  const button = document.querySelector(`#reservations-tab .sub-tab-button[data-sub-tab="${subTabId}"]`);
  const panel = document.getElementById(subTabId);
  return Boolean(
    button?.classList.contains('active')
    && panel?.classList.contains('active')
    && panel?.getAttribute('aria-hidden') === 'false'
  );
}

function waitForReservationSubTab(subTabId) {
  return new Promise((resolve) => {
    if (isReservationSubTabActive(subTabId)) {
      resolve();
      return;
    }

    const handleSubTabChange = (event) => {
      if (event?.detail?.subTabId === subTabId) {
        document.removeEventListener('reservations:subTabChanged', handleSubTabChange);
        resolve();
      }
    };

    document.addEventListener('reservations:subTabChanged', handleSubTabChange);

    const subTabButton = document.querySelector(`#reservations-tab .sub-tab-button[data-sub-tab="${subTabId}"]`);
    subTabButton?.click();
  });
}

async function waitForReservationEditorReady() {
  const directHandler = getReservationUIHandler('openReservationEditor');
  if (typeof directHandler === 'function') {
    return directHandler;
  }

  const handler = await waitForReservationUIHandler('openReservationEditor');
  if (typeof handler === 'function') {
    return handler;
  }

  throw new Error('Reservation editor handler is unavailable');
}

async function applyPendingReservationEdit() {
  if (!pendingReservationEdit) return;
  if (pendingReservationEditPromise) return pendingReservationEditPromise;

  const task = (async () => {
    const data = loadData();
    const reservations = data.reservations || [];

    let targetIndex = null;

    if (pendingReservationEdit.reservationId) {
      const idx = reservations.findIndex((reservation) =>
        String(reservation?.id) === pendingReservationEdit.reservationId
        || String(reservation?.reservationId) === pendingReservationEdit.reservationId
      );
      if (idx !== -1) {
        targetIndex = idx;
      }
    }

    if (targetIndex === null && typeof pendingReservationEdit.reservationIndex === 'number' && !Number.isNaN(pendingReservationEdit.reservationIndex)) {
      if (pendingReservationEdit.reservationIndex >= 0 && pendingReservationEdit.reservationIndex < reservations.length) {
        targetIndex = pendingReservationEdit.reservationIndex;
      }
    }

    if (targetIndex === null) {
      return;
    }

    const subTabId = 'my-reservations-tab';
    const tabId = 'reservations-tab';

    const pendingContext = pendingReservationEdit;
    pendingReservationEdit = null;

    try {
      await waitForDashboardTab(tabId);
      await waitForReservationSubTab(subTabId);
      const openEditor = await waitForReservationEditorReady();
      if (typeof openEditor === 'function') {
        openEditor(targetIndex);
      } else {
        console.warn('⚠️ Pending reservation edit skipped: editor is not available');
        pendingReservationEdit = pendingContext;
      }
    } catch (error) {
      console.error('❌ Failed to open pending reservation editor', error);
      pendingReservationEdit = pendingContext;
    }
  })();

  pendingReservationEditPromise = task;

  try {
    await task;
  } finally {
    pendingReservationEditPromise = null;
  }
}

document.addEventListener('reservations:changed', () => {
  if (pendingReservationEdit) {
    void applyPendingReservationEdit();
  }
});
