import { logout, checkAuth } from './scripts/auth.js';
import { setupTabs } from './scripts/tabs.js';
import { initCustomers } from './scripts/customers.js';
import {
  uploadEquipmentFromExcel,
  renderEquipment
} from './scripts/equipment.js';
import { renderCalendar } from './scripts/calendar.js';
import {
  loadReservationForm,
  setupReservationEvents,
  renderReservations
} from './scripts/reservationsUI.js';
import { loadData } from './scripts/storage.js';
import { initMaintenance } from './scripts/maintenance.js';
import { applyStoredTheme, initThemeToggle } from './scripts/theme.js';
import { initReports } from './scripts/reports.js';
import { initDashboardMetrics } from './scripts/dashboardMetrics.js';
import { initDashboardShell } from './scripts/dashboardShell.js';
import { ensurePinegrowPreviewSetup } from './pinegrow-preview.js';

const shouldBootstrapPreview = typeof window !== 'undefined'
  && (
    window.location.protocol === 'file:'
    || /\/src\/pages\//.test(window.location.pathname || '')
    || /\\src\\pages\\/.test(window.location.pathname || '')
  );

if (shouldBootstrapPreview) {
  ensurePinegrowPreviewSetup();
  applyStoredTheme();
}

let pendingReservationEdit = null;

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
  renderCalendar();

  initMaintenance();
  initReports();

  loadReservationForm();
  setupReservationEvents();

  const excelUploadInput = document.getElementById('excel-upload');
  if (excelUploadInput) {
    excelUploadInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      await uploadEquipmentFromExcel(file);
      e.target.value = '';
    });
  }

  const excelUploadTrigger = document.getElementById('excel-upload-trigger');
  if (excelUploadTrigger && excelUploadInput) {
    excelUploadTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      excelUploadInput.click();
    });
  }

  document.getElementById('logout-btn')?.addEventListener('click', logout);

  enhanceDateTimePickers();
  handlePendingReservationEdit();
}

if (shouldBootstrapPreview) {
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
}

function enhanceDateTimePickers() {
  document.querySelectorAll('input[type="datetime-local"]').forEach(input => {
    input.addEventListener('input', () => {
      const value = input.value;
      if (!value.includes('T')) return;

      const [date, time] = value.split('T');
      const [hour] = time.split(':');

      const fixedTime = `${hour.padStart(2, '0')}:00`;
      const newValue = `${date}T${fixedTime}`;

      if (input.value !== newValue) {
        input.value = newValue;
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

  applyPendingReservationEdit();

  params.delete('reservationEditId');
  params.delete('reservationEditIndex');
  const newSearch = params.toString();
  const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${window.location.hash || ''}`;
  window.history.replaceState({}, document.title, newUrl);
}

function applyPendingReservationEdit() {
  if (!pendingReservationEdit) return;

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

  pendingReservationEdit = null;

  const event = new CustomEvent('reservation:editRequested', {
    detail: {
      reservationIndex: targetIndex,
      autoOpenEditModal: true,
    },
  });

  document.dispatchEvent(event);
}

export { enhanceDateTimePickers };
