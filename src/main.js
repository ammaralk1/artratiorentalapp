import './styles/app.css';

import { logout, checkAuth } from './scripts/auth.js';
import { setupTabs } from './scripts/tabs.js';
import { initCustomers } from './scripts/customers.js';
import {
  uploadEquipmentFromExcel,
  renderEquipment
} from './scripts/equipment.js';
import { renderCalendar } from './scripts/calendar.js';
import {
  initializeReservationUI
} from './scripts/reservationsUI.js';
import { loadData } from './scripts/storage.js';
import { initMaintenance } from './scripts/maintenance.js';
import { applyStoredTheme, initThemeToggle } from './scripts/theme.js';
import { initReports } from './scripts/reports.js';
import { initDashboardMetrics } from './scripts/dashboardMetrics.js';
import { initDashboardShell } from './scripts/dashboardShell.js';
import { initEnhancedSelects } from './scripts/ui/enhancedSelect.js';
import {
  getReservationUIHandler,
  waitForReservationUIHandler
} from './scripts/reservations/uiBridge.js';

applyStoredTheme();

let pendingReservationEdit = null;
let pendingReservationEditPromise = null;

async function initApp() {
  const user = await checkAuth();
  if (!user) {
    return;
  }
  initDashboardShell();
  setupTabs();
  initCustomers();
  initDashboardMetrics();
  initThemeToggle();
  renderEquipment();
  initEnhancedSelects();
  renderCalendar();

  initMaintenance();
  initReports();

  await initializeReservationUI();

  // ✅ رفع ملف إكسل
  const excelUploadInput = document.getElementById("excel-upload");
  if (excelUploadInput) {
    excelUploadInput.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      await uploadEquipmentFromExcel(file);
      e.target.value = "";
    });
  }

  const excelUploadTrigger = document.getElementById("excel-upload-trigger");
  if (excelUploadTrigger && excelUploadInput) {
    excelUploadTrigger.addEventListener("click", (event) => {
      event.preventDefault();
      excelUploadInput.click();
    });
  }

  // ✅ زر تسجيل الخروج
  document.getElementById("logout-btn")?.addEventListener("click", logout);

  // ✅ تحسين اختيار التاريخ والوقت
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
