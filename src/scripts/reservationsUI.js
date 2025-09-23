import { loadData, saveData } from './storage.js';
import { showToast, generateReservationId, formatDateTime, normalizeNumbers } from './utils.js';
import { syncEquipmentStatuses } from './equipment.js';
import { syncTechniciansStatuses } from './technicians.js';
import { t } from './language.js';
import {
  normalizeBarcodeValue,
  resolveItemImage,
  getEquipmentRecordByBarcode,
  isEquipmentInMaintenance,
  findEquipmentByBarcode
} from './reservationsEquipment.js';
import {
  initTechnicianSelection,
  getSelectedTechnicians,
  resetSelectedTechnicians,
  reconcileTechnicianSelections
} from './reservationsTechnicians.js';
import {
  calculateReservationTotal,
  renderDraftSummary,
  renderEditSummary
} from './reservationsSummary.js';
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

let selectedItems = [];
let cachedCustomers = [];
let cachedEquipment = [];

function populateEquipmentDescriptionLists() {
  const createList = document.getElementById("equipment-description-options");
  const editList = document.getElementById("edit-res-equipment-description-options");

  const { equipment = [] } = loadData();
  cachedEquipment = Array.isArray(equipment) ? equipment : [];

  const uniqueDescriptions = Array.from(
    new Set(
      cachedEquipment
        .map((item) => item?.desc || item?.description || "")
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, "ar", { sensitivity: "base" }));

  const optionsHtml = uniqueDescriptions.map((desc) => `<option value="${desc}"></option>`).join("");

  if (createList) createList.innerHTML = optionsHtml;
  if (editList) editList.innerHTML = optionsHtml;
}

function findEquipmentByDescription(term) {
  const normalizedTerm = normalizeText(term);
  if (!normalizedTerm) return null;

  return (cachedEquipment || []).find((item) => {
    const descriptionText = normalizeText(item?.desc || item?.description || "");
    return descriptionText.includes(normalizedTerm);
  }) || null;
}

function addEquipmentByDescription(inputElement, mode = "create") {
  if (!inputElement) return;
  const rawValue = inputElement.value.trim();
  if (!rawValue) return;

  const equipmentItem = findEquipmentByDescription(rawValue);
  if (!equipmentItem) {
    showToast(t('reservations.toast.equipmentNameNotFound', '❌ لم يتم العثور على معدة بالاسم المدخل'));
    return;
  }

  const latestRecord = getEquipmentRecordByBarcode(equipmentItem.barcode);
  if (latestRecord?.status === 'صيانة') {
    showToast(t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً'));
    return;
  }

  const normalizedCode = normalizeBarcodeValue(equipmentItem.barcode);
  if (!normalizedCode) {
    showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
    return;
  }

  const itemPayload = {
    id: equipmentItem.id,
    barcode: normalizedCode,
    desc: equipmentItem.desc || equipmentItem.description || equipmentItem.name || "",
    qty: 1,
    price: Number.isFinite(Number(equipmentItem.price)) ? Number(equipmentItem.price) : 0,
    image: resolveItemImage(equipmentItem)
  };

  if (mode === "create") {
    const { start, end } = getCreateReservationDateRange();
    if (!start || !end) {
      showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
      return;
    }

    const duplicate = selectedItems.some((item) => normalizeBarcodeValue(item.barcode) === normalizedCode);
    if (duplicate) {
      showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
      return;
    }

    if (hasEquipmentConflict(normalizedCode, start, end)) {
      showToast(t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية'));
      return;
    }

    if (isEquipmentInMaintenance(normalizedCode)) {
      showToast(t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً'));
      return;
    }

    selectedItems.push(itemPayload);
    renderReservationItems();
    renderDraftReservationSummary();
  } else {
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

    const nextItems = [...currentItems, itemPayload];
    setEditingState(editingIndex, nextItems);
    renderEditReservationItems(nextItems);
    updateEditReservationSummary();
  }

  inputElement.value = "";
}

function setupEquipmentDescriptionInputs() {
  populateEquipmentDescriptionLists();

  const createInput = document.getElementById("equipment-description");
  if (createInput && !createInput.dataset.listenerAttached) {
    createInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addEquipmentByDescription(createInput, "create");
      }
    });
    createInput.dataset.listenerAttached = "true";
  }

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

function splitDateTime(value) {
  if (!value) return { date: "", time: "" };
  const [date = "", time = ""] = value.split("T");
  const trimmedTime = time ? time.slice(0, 5) : "";
  return { date, time: trimmedTime };
}

function combineDateTime(date, time) {
  if (!date) return "";
  const safeTime = time && time.length ? time : "00:00";
  return `${date}T${safeTime}`;
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

function getCreateReservationDateRange() {
  const startDate = document.getElementById('res-start')?.value?.trim();
  const endDate = document.getElementById('res-end')?.value?.trim();
  const startTime = document.getElementById('res-start-time')?.value?.trim() || '00:00';
  const endTime = document.getElementById('res-end-time')?.value?.trim() || '00:00';

  if (!startDate || !endDate) return { start: null, end: null };

  return {
    start: combineDateTime(startDate, startTime),
    end: combineDateTime(endDate, endTime)
  };
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

function hasEquipmentConflict(barcode, startIso, endIso, ignoreReservationId = null) {
  if (!barcode || !startIso || !endIso) return false;

  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;

  const { reservations = [] } = loadData();
  const normalizedCode = normalizeBarcodeValue(barcode);

  return reservations.some(reservation => {
    if (!reservation || !reservation.items || reservation.items.length === 0) return false;

    if (ignoreReservationId && (String(reservation.id) === String(ignoreReservationId) || String(reservation.reservationId) === String(ignoreReservationId))) {
      return false;
    }

    if (!reservation.start || !reservation.end) return false;

    const resStart = new Date(reservation.start);
    const resEnd = new Date(reservation.end);
    if (Number.isNaN(resStart.getTime()) || Number.isNaN(resEnd.getTime())) return false;

    const overlaps = resStart < end && resEnd > start;
    if (!overlaps) return false;

    return reservation.items.some(item => normalizeBarcodeValue(item?.barcode) === normalizedCode);
  });
}

function hasTechnicianConflict(technicianId, startIso, endIso, ignoreReservationId = null) {
  if (!technicianId || !startIso || !endIso) return false;

  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;

  const { reservations = [] } = loadData();
  const normalizedId = String(technicianId);

  return reservations.some((reservation) => {
    if (!reservation?.start || !reservation?.end) return false;

    if (ignoreReservationId && (String(reservation.id) === String(ignoreReservationId) || String(reservation.reservationId) === String(ignoreReservationId))) {
      return false;
    }

    const resStart = new Date(reservation.start);
    const resEnd = new Date(reservation.end);
    if (Number.isNaN(resStart.getTime()) || Number.isNaN(resEnd.getTime())) return false;

    const overlaps = resStart < end && resEnd > start;
    if (!overlaps) return false;

    const assigned = Array.isArray(reservation.technicians) ? reservation.technicians : [];
    return assigned.some((assignedId) => String(assignedId) === normalizedId);
  });
}

// تحميل العملاء في القائمة
export function loadReservationForm() {
  console.log("🚀 [reservationsUI.js] loadReservationForm()");
  const { customers, technicians, equipment } = loadData();
  console.log("👤 customers:", customers);
  console.log("🛠️ technicians:", technicians);
  console.log("📦 equipment:", equipment);

  cachedCustomers = customers || [];
  cachedEquipment = equipment || [];

  populateEquipmentDescriptionLists();
  reconcileTechnicianSelections(technicians || []);

  renderDraftReservationSummary();
}

// إعداد الأحداث للنموذج
function handleReservationsMutation() {
  populateEquipmentDescriptionLists();
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
  setupBarcodeInput();
  setupFormSubmit();
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
function setupBarcodeInput() {
  console.log("🚀 [reservationsUI.js] setupBarcodeInput()");
  const input = document.getElementById("equipment-barcode");
  if (!input || input.dataset.listenerAttached) return;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const code = normalizeBarcodeValue(input.value);
      console.log("🔍 Scanned barcode:", code);

      if (!code) return;

      const { start, end } = getCreateReservationDateRange();
      if (!start || !end) {
        showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
        return;
      }

      const duplicate = selectedItems.some(item => normalizeBarcodeValue(item.barcode) === code);
      if (duplicate) {
        showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
        return;
      }

      if (hasEquipmentConflict(code, start, end)) {
        showToast(t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية'));
        return;
      }

      const { equipment } = loadData();
      console.log("📦 equipment list:", equipment);

      const item = (equipment || []).find(eq => normalizeBarcodeValue(eq.barcode) === code);

      if (!item) {
        showToast(t('reservations.toast.barcodeNotFound', '❌ الباركود غير موجود'));
        return;
      }

      if (isEquipmentInMaintenance(item.barcode)) {
        showToast(t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً'));
        return;
      }

      selectedItems.push({
        id: item.id,
        barcode: normalizeBarcodeValue(item.barcode),
        desc: item.desc,
        qty: 1,
        price: item.price,
        image: resolveItemImage(item)
      });

      console.log("✅ Added item:", item);
      console.log("📦 selectedItems:", selectedItems);

      showToast(t('reservations.toast.equipmentAdded', '✅ تم إضافة المعدة بنجاح'));

      input.value = '';
      renderReservationItems();
      renderDraftReservationSummary();
    }
  });

  input.dataset.listenerAttached = "true";
}

// ✅ عرض المعدات المختارة داخل النموذج
export function renderReservationItems(containerId = "reservation-items") {
  console.log("🚀 [reservationsUI.js] renderReservationItems()");
  const container = document.getElementById(containerId);
  if (!container) {
    console.log("⚠️ container not found:", containerId);
    return;
  }

  console.log("📦 selectedItems:", selectedItems);

  const noItemsMessage = t('reservations.create.equipment.noneAdded', 'لا توجد معدات مضافة');
  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const imageAlt = t('reservations.create.equipment.imageAlt', 'صورة');

  if (selectedItems.length === 0) {
    container.innerHTML = `<tr><td colspan="5">${noItemsMessage}</td></tr>`;
    return;
  }

  container.innerHTML = selectedItems
    .map((item, index) => {
      const image = resolveItemImage(item);
      const priceDisplay = `${normalizeNumbers(String(item.price ?? 0))} ${currencyLabel}`;
      const imageCell = image
        ? `<img src="${image}" alt="${imageAlt}" class="reservation-item-thumb">`
        : '-';
      return `
        <tr>
          <td>${item.barcode || '-'}</td>
          <td>${item.desc}</td>
          <td>${priceDisplay}</td>
          <td>${imageCell}</td>
          <td><button type="button" class="btn btn-sm btn-danger" onclick="removeReservationItem(${index})">🗑️</button></td>
        </tr>
      `;
    })
    .join('');
}

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

window.removeReservationItem = function(index) {
  console.log("🚀 [reservationsUI.js] removeReservationItem()", index);
  selectedItems.splice(index, 1);
  console.log("📦 updated selectedItems:", selectedItems);
  renderReservationItems();
  renderDraftReservationSummary();
}

// ✅ ملخص الحجز
function renderDraftReservationSummary() {
  console.log("🚀 [reservationsUI.js] renderDraftReservationSummary()");
  const rawValue = document.getElementById("res-discount")?.value || "0";
  const discount = parseFloat(normalizeNumbers(rawValue)) || 0;

  const discountType = document.getElementById("res-discount-type")?.value || "percent";
  const applyTax = document.getElementById("res-tax")?.checked || false;
  const paidStatus = document.getElementById("res-payment-status")?.value || "unpaid";

  renderDraftSummary({
    selectedItems,
    discount,
    discountType,
    applyTax,
    paidStatus
  });
}

// إعداد الأحداث الخاصة بالخصم والضريبة
function setupSummaryEvents() {
  console.log("🚀 [reservationsUI.js] setupSummaryEvents()");
  const discountInput = document.getElementById("res-discount");
  if (discountInput) {
    discountInput.addEventListener("input", (e) => {
      e.target.value = normalizeNumbers(e.target.value);
      renderDraftReservationSummary();
    });
  }

  const discountTypeSelect = document.getElementById("res-discount-type");
  if (discountTypeSelect) {
    discountTypeSelect.addEventListener("change", renderDraftReservationSummary);
  }

  const taxCheckbox = document.getElementById("res-tax");
  if (taxCheckbox) {
    taxCheckbox.addEventListener("change", renderDraftReservationSummary);
  }

  const paymentSelect = document.getElementById("res-payment-status");
  if (paymentSelect) {
    paymentSelect.addEventListener("change", renderDraftReservationSummary);
  }
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
function handleReservationSubmit() {
  console.log("🚀 [reservationsUI.js] handleReservationSubmit()");
  const inputValue = document.getElementById("res-customer").value.trim().toLowerCase();
  const { customers, reservations } = loadData();

  console.log("👤 inputValue:", inputValue);
  console.log("📦 customers:", customers);
  console.log("📦 existing reservations:", reservations);

  let customer = customers.find(c =>
    c.customerName?.trim().toLowerCase() === inputValue
  );

  if (!customer) {
    customer = customers.find(c =>
      c.customerName?.toLowerCase().includes(inputValue)
    );
  }

  if (!customer) {
    showToast(t('reservations.toast.customerNotFound', '⚠️ لم يتم العثور على العميل بالاسم المدخل'));
    return;
  }

  const customerId = customer.id;
  const startDate = document.getElementById("res-start").value;
  const endDate = document.getElementById("res-end").value;
  const startTime = document.getElementById("res-start-time")?.value || "00:00";
  const endTime = document.getElementById("res-end-time")?.value || "00:00";

  const start = startDate + "T" + startTime;
  const end = endDate + "T" + endTime;

  if (!startDate || !endDate) {
    showToast(t('reservations.toast.requireDates', '⚠️ يرجى تحديد تاريخ البداية والنهاية'));
    return;
  }

  const startDateObj = new Date(start);
  const endDateObj = new Date(end);
  if (Number.isNaN(startDateObj.getTime()) || Number.isNaN(endDateObj.getTime()) || startDateObj >= endDateObj) {
    showToast(t('reservations.toast.invalidDateRange', '⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية'));
    return;
  }

  const notes = document.getElementById("res-notes")?.value || "";
  const discount = parseFloat(normalizeNumbers(document.getElementById("res-discount")?.value)) || 0;
  const discountType = document.getElementById("res-discount-type")?.value || "percent";
  const applyTax = document.getElementById("res-tax")?.checked || false;
  const paymentStatus = document.getElementById("res-payment-status")?.value || "unpaid";

  console.log("🆕 newReservation data:", { customerId, start, end, selectedItems, notes });

  if (!customerId || !startDate || !endDate) {
    showToast(t('reservations.toast.missingFields', '⚠️ تأكد من تعبئة جميع الحقول'));
    return;
  }

  if (selectedItems.length === 0) {
    showToast(t('reservations.toast.noItems', '⚠️ لا يمكنك إنشاء حجز بدون معدات'));
    return;
  }

  const technicianIds = getSelectedTechnicians();

  for (const item of selectedItems) {
    if (isEquipmentInMaintenance(item.barcode)) {
      showToast(t('reservations.toast.cannotCreateEquipmentMaintenance', '⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة'));
      return;
    }
  }

  for (const item of selectedItems) {
    const code = normalizeBarcodeValue(item.barcode);
    if (hasEquipmentConflict(code, start, end)) {
      showToast(t('reservations.toast.cannotCreateEquipmentConflict', '⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية'));
      return;
    }
  }

  for (const technicianId of technicianIds) {
    if (hasTechnicianConflict(technicianId, start, end)) {
      showToast(t('reservations.toast.cannotCreateCrewConflict', '⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة'));
      return;
    }
  }

  const newReservation = {
    id: Date.now(),
    reservationId: generateReservationId(),
    customerId: parseInt(customerId),
    start,
    end,
    items: [...selectedItems],
    technicians: technicianIds,
    notes,
    discount,
    discountType,
    applyTax,
    paid: paymentStatus === "paid",
    cost: calculateReservationTotal(selectedItems, discount, discountType, applyTax),
    confirmed: false
  };

  console.log("💾 Saving newReservation:", newReservation);

  reservations.push(newReservation);
  saveData({ reservations });
  syncEquipmentStatuses();
  populateEquipmentDescriptionLists();
  syncTechniciansStatuses();

  resetForm();
  showToast(t('reservations.toast.created', '✅ تم إنشاء الحجز'));
  renderReservations();
}

// إعادة تعيين النموذج
function resetForm() {
  console.log("🚀 [reservationsUI.js] resetForm()");
  document.getElementById("res-customer").value = "";
  document.getElementById("res-start").value = "";
  document.getElementById("res-start-time").value = "";
  document.getElementById("res-end").value = "";
  document.getElementById("res-end-time").value = "";
  document.getElementById("res-notes").value = "";
  document.getElementById("res-discount").value = "";
  document.getElementById("res-tax").checked = false;
  const descriptionInput = document.getElementById("equipment-description");
  if (descriptionInput) descriptionInput.value = "";
  const paymentSelect = document.getElementById("res-payment-status");
  if (paymentSelect) paymentSelect.value = "unpaid";
  resetSelectedTechnicians();
  selectedItems = [];
  renderReservationItems();
  renderDraftReservationSummary();
}

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

// إكمال العملاء تلقائي
function setupCustomerAutocomplete() {
  console.log("🚀 [reservationsUI.js] setupCustomerAutocomplete()");
  const input = document.getElementById("res-customer");
  const suggestionsBox = document.getElementById("customer-suggestions");
  if (!input || !suggestionsBox) return;

  const renderSuggestions = (items) => {
    if (!items || items.length === 0) {
      suggestionsBox.style.display = "none";
      suggestionsBox.innerHTML = "";
      return;
    }

    suggestionsBox.innerHTML = items.map(name => `<div class="suggestion-item" data-name="${name}">${name}</div>`).join('');
    suggestionsBox.style.display = "block";

    suggestionsBox.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('mousedown', (event) => {
        event.preventDefault();
        const selectedName = event.target.getAttribute('data-name');
        input.value = selectedName;
        suggestionsBox.style.display = "none";
      });
    });
  };

  const getUniqueNames = () => [...new Set(cachedCustomers.map(c => c.customerName).filter(Boolean))];

  const updateSuggestions = () => {
    const value = normalizeText(input.value);
    const names = getUniqueNames();
    const matches = !value
      ? names.slice(0, 10)
      : names.filter(name => normalizeText(name).startsWith(value)).slice(0, 10);
    renderSuggestions(matches);
  };

  input.addEventListener("input", () => {
    updateSuggestions();
  });

  input.addEventListener("focus", () => {
    updateSuggestions();
  });

  input.addEventListener("blur", () => {
    setTimeout(() => {
      suggestionsBox.style.display = "none";
    }, 150);
  });
}

// ✅ تشغيل عند التحميل
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 [reservationsUI.js] DOMContentLoaded");
  renderReservationItems();
  renderDraftReservationSummary();
  setupCustomerAutocomplete();
  setupReservationEvents();
  setupSummaryEvents();
  initializeReservationPickers();
});

document.addEventListener("technicians:updated", () => {
  const { technicians = [] } = loadData();
  reconcileTechnicianSelections(technicians);
  renderDraftReservationSummary();
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
