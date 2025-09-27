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

applyStoredTheme();

function initApp() {
  checkAuth();
  setupTabs();
  initCustomers();
  initThemeToggle();
  renderEquipment();
  renderCalendar();

  initMaintenance();

  loadReservationForm();
  setupReservationEvents();

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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp, { once: true });
} else {
  initApp();
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
  const data = loadData();
  const pendingId = localStorage.getItem('pendingReservationEditId');
  const pendingIndexValue = localStorage.getItem('pendingReservationEdit');

  let targetIndex = null;

  if (pendingId !== null) {
    const reservations = data.reservations || [];
    const idx = reservations.findIndex(r => String(r.id) === pendingId || String(r.reservationId) === pendingId);
    if (idx !== -1) {
      targetIndex = idx;
    }
    localStorage.removeItem('pendingReservationEditId');
  }

  if (targetIndex === null && pendingIndexValue !== null) {
    const numericIndex = Number(pendingIndexValue);
    if (!Number.isNaN(numericIndex)) {
      targetIndex = numericIndex;
    }
    localStorage.removeItem('pendingReservationEdit');
  }

  if (targetIndex === null || Number.isNaN(targetIndex)) return;

  setTimeout(() => {
    const reservationsTabBtn = document.querySelector('[data-tab=\"reservations-tab\"]');
    reservationsTabBtn?.click();

    setTimeout(() => {
      document.querySelector('.sub-tab-button[data-sub-tab=\"create-tab\"]')?.click();

      setTimeout(() => {
        const openEditor = window.editReservation;
        if (typeof openEditor === 'function') {
          openEditor(targetIndex);
        }
      }, 150);
    }, 150);
  }, 150);
}
