import { loadData } from './storage.js';
import { normalizeNumbers } from './utils.js';
import { syncTechniciansStatuses } from './technicians.js';
import { t } from './language.js';
import { initTechnicianSelection, reconcileTechnicianSelections } from './reservationsTechnicians.js';
import { renderEditSummary } from './reservationsSummary.js';
import {
  getReservationFilters,
  setupReservationFilters
} from './reservationsFilters.js';
import {
  confirmReservation as confirmReservationAction,
  deleteReservation as deleteReservationAction
} from './reservationsActions.js';
import {
  editReservation,
  setupEditReservationModalEvents,
  getEditingState,
  setEditingState
} from './reservationsEdit.js';
import {
  splitDateTime,
  combineDateTime,
  normalizeBarcodeValue,
  hasEquipmentConflict,
  hasTechnicianConflict
} from './reservations/state.js';
import {
  initCreateReservationForm,
  refreshCreateReservationForm,
  populateEquipmentDescriptionLists as populateCreateEquipmentLists,
  addDraftEquipmentByDescription,
  renderDraftReservationSummary
} from './reservations/createForm.js';
import {
  renderReservationsList,
  renderReservationDetails
} from './reservations/renderers.js';
import {
  getEditReservationDateRange,
  renderEditReservationItems,
  updateEditReservationSummary,
  addEquipmentToEditingReservation,
  addEquipmentToEditingByDescription,
  setupEditEquipmentDescriptionInput,
  removeEditReservationItem
} from './reservations/editForm.js';

const populateEquipmentDescriptionLists = populateCreateEquipmentLists;

function addEquipmentByDescription(inputElement, mode = 'create') {
  if (!inputElement) return;
  if (mode === 'create') {
    addDraftEquipmentByDescription(inputElement);
    return;
  }
  addEquipmentToEditingByDescription(inputElement);
}

function setupEquipmentDescriptionInputs() {
  populateEquipmentDescriptionLists();
  setupEditEquipmentDescriptionInput();
}

function setFlatpickrValue(elementId, value) {
  const element = document.getElementById(elementId);
  if (!element) return;
  if (element._flatpickr) {
    if (value) {
      element._flatpickr.setDate(value, false, element._flatpickr.config?.dateFormat || "Y-m-d");
    } else {
      element._flatpickr.clear();
    }
  } else {
    element.value = value || "";
  }
}

// تحميل العملاء في القائمة
export function loadReservationForm() {
  console.log("🚀 [reservationsUI.js] loadReservationForm()");
  const { technicians } = loadData();
  console.log("🛠️ technicians:", technicians);
  reconcileTechnicianSelections(technicians || []);
  refreshCreateReservationForm();
}

// إعداد الأحداث للنموذج
function handleReservationsMutation() {
  refreshCreateReservationForm();
  renderReservations();
  if (typeof window.refreshCustomerReservationsViews === 'function') {
    window.refreshCustomerReservationsViews();
  }
  if (typeof window.refreshTechnicianReservationsViews === 'function') {
    window.refreshTechnicianReservationsViews();
  }
}

function getBootstrapModalInstance(modalElement) {
  if (!modalElement) return null;
  if (window?.bootstrap?.Modal) {
    return window.bootstrap.Modal.getOrCreateInstance(modalElement);
  }
  if (typeof bootstrap !== 'undefined' && bootstrap?.Modal) {
    return bootstrap.Modal.getOrCreateInstance(modalElement);
  }
  return null;
}

function getReservationsEditContext() {
  return {
    populateEquipmentDescriptionLists,
    setFlatpickrValue,
    splitDateTime,
    renderEditItems: renderEditReservationItems,
    updateEditReservationSummary,
    addEquipmentByDescription,
    addEquipmentToEditingReservation,
    combineDateTime,
    hasEquipmentConflict,
    hasTechnicianConflict,
    renderReservations,
    handleReservationsMutation,
    ensureModal: getBootstrapModalInstance
  };
}

export function setupReservationEvents() {
  console.log("🚀 [reservationsUI.js] setupReservationEvents()");
  enhanceTimeInputs();
  setupReservationFilters(() => renderReservations());
  setupEditReservationModalEvents(getReservationsEditContext());
  initTechnicianSelection({
    onDraftChange: renderDraftReservationSummary,
    onEditChange: updateEditReservationSummary
  });
  loadReservationForm();
  setupEquipmentDescriptionInputs();
}

// إرسال النموذج
// إنشاء الحجز
// ✅ عرض الحجوزات المحفوظة
export function renderReservations(containerId = 'reservations-list', filters = null) {
  renderReservationsList({
    containerId,
    filters,
    onShowDetails: showReservationDetails,
    onConfirmReservation: confirmReservation
  });
}

export function showReservationDetails(index) {
  renderReservationDetails(index, {
    getEditContext: getReservationsEditContext,
    onEdit: (reservationIndex, { reservation }) => {
      openReservationEditor(reservationIndex, reservation);
    },
    onDelete: deleteReservation
  });
}

window.showReservationDetails = showReservationDetails;



function deleteReservation(index) {
  console.log("🚀 [reservationsUI.js] deleteReservation()", index);
  if (!confirm(t('reservations.toast.deleteConfirm', '⚠️ هل أنت متأكد من حذف هذا الحجز؟'))) return;
  deleteReservationAction(index, { onAfterChange: handleReservationsMutation });
}

function confirmReservation(index) {
  console.log("🚀 [reservationsUI.js] confirmReservation()", index);
  confirmReservationAction(index, { onAfterChange: handleReservationsMutation });
}

function openReservationEditor(index, reservation = null) {
  console.log('🚀 [reservationsUI.js] editReservation()', index);

  if (document.getElementById('reservation-form')) {
    editReservation(index, getReservationsEditContext());
    return;
  }

  if (document.getElementById('editReservationModal')) {
    editReservation(index, getReservationsEditContext());
    return;
  }

  if (reservation?.id || reservation?.reservationId) {
    const fallbackId = reservation.id ?? reservation.reservationId;
    localStorage.setItem('pendingReservationEditId', String(fallbackId));
  } else {
    localStorage.setItem('pendingReservationEditId', String(index));
  }

  window.location.href = 'dashboard.html#reservations';
}

window.deleteReservation = deleteReservation;
window.confirmReservation = confirmReservation;
window.editReservation = openReservationEditor;

window.removeEditReservationItem = removeEditReservationItem;

// تحسين مدخلات الوقت
function enhanceTimeInputs() {
  console.log("🚀 [reservationsUI.js] enhanceTimeInputs()");
  const timeInputs = document.querySelectorAll('input[type="time"]');
  timeInputs.forEach(input => {
    input.setAttribute("step", "3600");
    input.addEventListener("change", () => {
      if (!input.value) return;
      const [hour] = input.value.split(":");
      input.value = hour.padStart(2, "0") + ":00";
    });
  });
}

// ✅ تشغيل عند التحميل
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 [reservationsUI.js] DOMContentLoaded');
  initCreateReservationForm({ onAfterSubmit: handleReservationsMutation });
  setupReservationEvents();
  initializeReservationPickers();
});

document.addEventListener('technicians:updated', () => {
  const { technicians = [] } = loadData();
  reconcileTechnicianSelections(technicians);
  refreshCreateReservationForm();
  updateEditReservationSummary();
});

function getFlatpickrInstance() {
  if (typeof window !== "undefined" && typeof window.flatpickr === "function") {
    return window.flatpickr.bind(window);
  }

  if (typeof globalThis !== "undefined" && typeof globalThis.flatpickr === "function") {
    return globalThis.flatpickr.bind(globalThis);
  }

  console.log("⚠️ Flatpickr غير متاح - سيتم تخطي تهيئة عناصر التاريخ");
  return null;
}

function initializeReservationPickers() {
  const fp = getFlatpickrInstance();
  if (!fp) return;

  const datePickers = [
    ["#res-start", { dateFormat: "Y-m-d" }],
    ["#res-end", { dateFormat: "Y-m-d" }],
    ["#filter-start-date", { dateFormat: "Y-m-d" }],
    ["#filter-end-date", { dateFormat: "Y-m-d" }],
    ["#edit-res-start", { dateFormat: "Y-m-d" }],
    ["#edit-res-end", { dateFormat: "Y-m-d" }]
  ];

  const timePickers = [
    ["#res-start-time", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      altInput: true,
      altFormat: "h:i K",
      time_24hr: false,
      defaultHour: 9,
      defaultMinute: 0
    }],
    ["#res-end-time", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      altInput: true,
      altFormat: "h:i K",
      time_24hr: false,
      defaultHour: 10,
      defaultMinute: 0
    }],
    ["#edit-res-start-time", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      altInput: true,
      altFormat: "h:i K",
      time_24hr: false,
      defaultHour: 9,
      defaultMinute: 0
    }],
    ["#edit-res-end-time", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      altInput: true,
      altFormat: "h:i K",
      time_24hr: false,
      defaultHour: 10,
      defaultMinute: 0
    }]
  ];

  [...datePickers, ...timePickers].forEach(([selector, config]) => {
    if (document.querySelector(selector)) {
      fp(selector, config);
    }
  });
}
