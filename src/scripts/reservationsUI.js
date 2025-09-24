import { loadData, saveData } from './storage.js';
import { showToast, formatDateTime, normalizeNumbers } from './utils.js';
import { syncTechniciansStatuses } from './technicians.js';
import { t } from './language.js';
import {
  resolveItemImage,
  getEquipmentRecordByBarcode,
  isEquipmentInMaintenance,
  findEquipmentByBarcode
} from './reservationsEquipment.js';
import { initTechnicianSelection, reconcileTechnicianSelections } from './reservationsTechnicians.js';
import { renderEditSummary } from './reservationsSummary.js';
import {
  getReservationFilters,
  setupReservationFilters
} from './reservationsFilters.js';
import {
  filterReservationEntries,
  buildReservationTilesHtml,
  buildReservationDetailsHtml
} from './reservationsList.js';
import { normalizeText, isReservationCompleted } from './reservationsShared.js';
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
  renderDraftReservationSummary,
  findEquipmentByDescription
} from './reservations/createForm.js';

const populateEquipmentDescriptionLists = populateCreateEquipmentLists;

function addEquipmentByDescription(inputElement, mode = 'create') {
  if (!inputElement) return;

  if (mode === 'create') {
    addDraftEquipmentByDescription(inputElement);
    return;
  }

  const rawValue = inputElement.value.trim();
  if (!rawValue) return;

  const equipmentItem =
    findEquipmentByDescription(rawValue) ||
    findEquipmentByBarcode(rawValue) ||
    findEquipmentByBarcode(normalizeBarcodeValue(rawValue));
  const normalizedCode = normalizeBarcodeValue(equipmentItem?.barcode || rawValue);
  if (!equipmentItem || !normalizedCode) {
    showToast(t('reservations.toast.equipmentNameNotFound', '❌ لم يتم العثور على معدة بالاسم المدخل'));
    return;
  }

  if (isEquipmentInMaintenance(normalizedCode)) {
    showToast(t('reservations.toast.equipmentMaintenanceStrict', '⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز'));
    return;
  }

  const { start, end } = getEditReservationDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireOverallDates', '⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات'));
    return;
  }

  const { index: editingIndex, items: currentItems = [] } = getEditingState();
  const duplicate = currentItems.some((item) => normalizeBarcodeValue(item.barcode) === normalizedCode);
  if (duplicate) {
    showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
    return;
  }

  const { reservations = [] } = loadData();
  const currentReservation = editingIndex != null ? reservations[editingIndex] || null : null;
  const ignoreId = currentReservation?.id ?? currentReservation?.reservationId ?? null;

  if (hasEquipmentConflict(normalizedCode, start, end, ignoreId)) {
    showToast(t('reservations.toast.equipmentTimeConflictSimple', '⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية'));
    return;
  }

  const nextItems = [
    ...currentItems,
    {
      id: equipmentItem.id,
      barcode: normalizedCode,
      desc: equipmentItem.desc,
      qty: 1,
      price: equipmentItem.price,
      image: equipmentItem.image || equipmentItem.imageUrl || equipmentItem.img || null
    }
  ];

  setEditingState(editingIndex, nextItems);
  renderEditReservationItems(nextItems);
  updateEditReservationSummary();

  inputElement.value = '';
}

function setupEquipmentDescriptionInputs() {
  populateEquipmentDescriptionLists();

  const editInput = document.getElementById("edit-res-equipment-description");
  if (editInput && !editInput.dataset.listenerAttached) {
    editInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addEquipmentByDescription(editInput, "edit");
      }
    });
    editInput.dataset.listenerAttached = "true";
  }
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

function getEditReservationDateRange() {
  const startDate = document.getElementById('edit-res-start')?.value?.trim();
  const endDate = document.getElementById('edit-res-end')?.value?.trim();
  const startTime = document.getElementById('edit-res-start-time')?.value?.trim() || '00:00';
  const endTime = document.getElementById('edit-res-end-time')?.value?.trim() || '00:00';

  if (!startDate || !endDate) return { start: null, end: null };

  return {
    start: combineDateTime(startDate, startTime),
    end: combineDateTime(endDate, endTime)
  };
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

// إدخال المعدات بالباركود
function renderEditReservationItems(items = []) {
  const container = document.getElementById("edit-res-items");
  if (!container) return;

  const noItemsMessage = t('reservations.create.equipment.none', 'لا توجد معدات');
  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const imageAlt = t('reservations.create.equipment.imageAlt', 'صورة');

  if (!items || items.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="text-center">${noItemsMessage}</td></tr>`;
    return;
  }

  container.innerHTML = items
    .map((item, index) => {
      const image = resolveItemImage(item);
      const priceDisplay = `${normalizeNumbers(String(item.price ?? 0))} ${currencyLabel}`;
      const qtyDisplay = normalizeNumbers(String(item.qty || 1));
      const imageCell = image
        ? `<img src="${image}" alt="${imageAlt}" class="reservation-item-thumb">`
        : '-';
      return `
        <tr>
          <td>${item.barcode || '-'}</td>
          <td>${item.desc || '-'}</td>
          <td>${priceDisplay}</td>
          <td>${qtyDisplay}</td>
          <td>${imageCell}</td>
          <td><button type="button" class="btn btn-sm btn-danger" onclick="removeEditReservationItem(${index})">🗑️</button></td>
        </tr>
      `;
    })
    .join('');
}

function updateEditReservationSummary() {
  const summaryEl = document.getElementById("edit-res-summary");
  if (!summaryEl) return;

  const discountInput = document.getElementById("edit-res-discount");
  const discountTypeSelect = document.getElementById("edit-res-discount-type");
  const taxCheckbox = document.getElementById("edit-res-tax");
  const paidSelect = document.getElementById("edit-res-paid");
  if (paidSelect && !paidSelect.dataset.listenerAttached) {
    paidSelect.addEventListener("change", updateEditReservationSummary);
    paidSelect.dataset.listenerAttached = "true";
  }

  const rawDiscount = normalizeNumbers(discountInput?.value || "0");
  if (discountInput) discountInput.value = rawDiscount;

  const discount = parseFloat(rawDiscount) || 0;
  const discountType = discountTypeSelect?.value || "percent";
  const applyTax = taxCheckbox?.checked || false;
  const paidStatus = paidSelect?.value || "unpaid";

  const { items: editingItems = [] } = getEditingState();

  summaryEl.innerHTML = renderEditSummary({
    items: editingItems,
    discount,
    discountType,
    applyTax,
    paidStatus
  });
}

window.removeEditReservationItem = function(index) {
  if (index == null) return;
  const { index: editingIndex, items } = getEditingState();
  if (!Array.isArray(items)) return;

  const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
  setEditingState(editingIndex, nextItems);
  renderEditReservationItems(nextItems);
  updateEditReservationSummary();
};

function addEquipmentToEditingReservation(barcodeInput) {
  const rawCode = barcodeInput?.value ?? "";
  const code = normalizeBarcodeValue(rawCode);
  if (!code) return;

  const equipmentItem = findEquipmentByBarcode(code);
  if (!equipmentItem) {
    showToast(t('reservations.toast.barcodeNotInCatalog', '❌ الباركود غير موجود ضمن المعدات'));
    return;
  }

  if (isEquipmentInMaintenance(code)) {
    showToast(t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً'));
    return;
  }

  const normalizedCode = normalizeBarcodeValue(code);
  const { index: editingIndex, items: currentItems = [] } = getEditingState();
  const existingIndex = currentItems.findIndex(item => normalizeBarcodeValue(item.barcode) === normalizedCode);

  if (existingIndex > -1) {
    showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
    return;
  }

  const { start, end } = getEditReservationDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
    return;
  }

  const { reservations = [] } = loadData();
  const currentReservation = editingIndex != null ? reservations[editingIndex] || null : null;
  const ignoreId = currentReservation?.id ?? currentReservation?.reservationId ?? null;

  if (hasEquipmentConflict(normalizedCode, start, end, ignoreId)) {
    showToast(t('reservations.toast.equipmentTimeConflictSimple', '⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية'));
    return;
  }

  const nextItems = [
    ...currentItems,
    {
      id: equipmentItem.id,
      barcode: normalizedCode,
      desc: equipmentItem.desc,
      qty: 1,
      price: equipmentItem.price,
      image: equipmentItem.image || equipmentItem.imageUrl || equipmentItem.img || null
    }
  ];

  setEditingState(editingIndex, nextItems);

  barcodeInput.value = "";
  renderEditReservationItems(nextItems);
  updateEditReservationSummary();
}

// إرسال النموذج
function setupFormSubmit() {
  console.log("🚀 [reservationsUI.js] setupFormSubmit()");
  const form = document.getElementById("reservation-form");
  if (form && !form.dataset.listenerAttached) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handleReservationSubmit();
    });
    form.dataset.listenerAttached = "true";
  }

  const btn = document.getElementById("create-reservation-btn");
  if (btn && !btn.dataset.listenerAttached) {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      handleReservationSubmit();
    });
    btn.dataset.listenerAttached = "true";
  }
}

// إنشاء الحجز
// ✅ عرض الحجوزات المحفوظة
export function renderReservations(containerId = "reservations-list", filters = null) {
  console.log("🚀 [reservationsUI.js] renderReservations()", { containerId, filters });
  const syncedTechnicians = syncTechniciansStatuses();
  const { reservations = [], customers = [], technicians: storedTechnicians = [] } = loadData();
  const technicians = Array.isArray(syncedTechnicians) ? syncedTechnicians : (storedTechnicians || []);
  console.log("📦 reservations:", reservations);
  console.log("👤 customers:", customers);
  console.log("🛠️ technicians:", technicians);

  const container = document.getElementById(containerId);
  if (!container) {
    console.log("⚠️ reservations container not found:", containerId);
    return;
  }

  const emptyMessage = t('reservations.list.empty', '⚠️ لا توجد حجوزات بعد.');
  if (!reservations || reservations.length === 0) {
    container.innerHTML = `<p>${emptyMessage}</p>`;
    return;
  }

  const activeFilters = filters || getReservationFilters();
  console.log("🔍 activeFilters:", activeFilters);

  const customersMap = new Map(customers.map((c) => [String(c.id), c]));
  const techniciansMap = new Map(technicians.map((t) => [String(t.id), t]));

  const filteredEntries = filterReservationEntries({
    reservations,
    filters: activeFilters,
    customersMap,
    techniciansMap
  });

  const noResultsMessage = t('reservations.list.noResults', '🔍 لا توجد حجوزات مطابقة للبحث.');
  if (filteredEntries.length === 0) {
    container.innerHTML = `<p>${noResultsMessage}</p>`;
    return;
  }

  container.innerHTML = `<div class="reservations-grid">${buildReservationTilesHtml({
    entries: filteredEntries,
    customersMap,
    techniciansMap
  })}</div>`;

  container.querySelectorAll('[data-action="details"]').forEach((tile) => {
    const index = Number(tile.dataset.reservationIndex);
    tile.addEventListener('click', () => showReservationDetails(index));
  });

  container.querySelectorAll('button[data-action="confirm"]').forEach((btn) => {
    const index = Number(btn.dataset.reservationIndex);
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      window.confirmReservation(index);
    });
  });
}

export function showReservationDetails(index) {
  const { reservations = [], customers = [] } = loadData();
  const reservation = reservations[index];
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return;
  }

  const customer = customers.find(c => String(c.id) === String(reservation.customerId));
  const body = document.getElementById('reservation-details-body');
  if (body) {
    const techniciansList = syncTechniciansStatuses() || [];
    body.innerHTML = buildReservationDetailsHtml(reservation, customer, techniciansList, index);
  }

  const editBtn = document.getElementById('reservation-details-edit-btn');
  if (editBtn) {
    editBtn.onclick = () => {
      const modalEl = document.getElementById('reservationDetailsModal');
      if (modalEl && window.bootstrap?.Modal) {
        window.bootstrap.Modal.getInstance(modalEl)?.hide();
      }
      if (document.getElementById('reservation-form')) {
        editReservation(index, getReservationsEditContext());
      } else if (document.getElementById('editReservationModal')) {
        editReservation(index, getReservationsEditContext());
      } else {
        localStorage.setItem('pendingReservationEditId', String(reservation.id));
        window.location.href = 'dashboard.html#reservations';
      }
    };
  }

  const deleteBtn = document.getElementById('reservation-details-delete-btn');
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      const modalEl = document.getElementById('reservationDetailsModal');
      if (modalEl && window.bootstrap?.Modal) {
        window.bootstrap.Modal.getInstance(modalEl)?.hide();
      }
      deleteReservation(index);
    };
  }

  const modalEl = document.getElementById('reservationDetailsModal');
  if (modalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

window.showReservationDetails = showReservationDetails;



// حذف الحجز
window.deleteReservation = function(index) {
  console.log("🚀 [reservationsUI.js] deleteReservation()", index);
  if (!confirm(t('reservations.toast.deleteConfirm', '⚠️ هل أنت متأكد من حذف هذا الحجز؟'))) return;
  deleteReservationAction(index, { onAfterChange: handleReservationsMutation });
}

// تأكيد الحجز
window.confirmReservation = function(index) {
  console.log("🚀 [reservationsUI.js] confirmReservation()", index);
  confirmReservationAction(index, { onAfterChange: handleReservationsMutation });
}

// تعديل الحجز
window.editReservation = function(index) {
  console.log("🚀 [reservationsUI.js] editReservation()", index);
  editReservation(index, getReservationsEditContext());
};

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
