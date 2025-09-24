import { loadData, saveData } from '../storage.js';
import { showToast, generateReservationId, normalizeNumbers } from '../utils.js';
import { t } from '../language.js';
import { resolveItemImage, getEquipmentRecordByBarcode, isEquipmentInMaintenance, findEquipmentByBarcode } from '../reservationsEquipment.js';
import { getSelectedTechnicians, resetSelectedTechnicians } from '../reservationsTechnicians.js';
import { calculateReservationTotal, renderDraftSummary } from '../reservationsSummary.js';
import { normalizeText } from '../reservationsShared.js';
import {
  getSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setSelectedItems,
  getCachedCustomers,
  setCachedCustomers,
  getCachedEquipment,
  setCachedEquipment,
  combineDateTime,
  normalizeBarcodeValue,
  hasEquipmentConflict,
  hasTechnicianConflict
} from './state.js';
import { syncEquipmentStatuses } from '../equipment.js';
import { syncTechniciansStatuses } from '../technicians.js';

let afterSubmitCallback = null;

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

export function findEquipmentByDescription(term) {
  const normalizedTerm = normalizeText(term);
  if (!normalizedTerm) return null;
  const equipment = getCachedEquipment() || [];
  return equipment.find((item) => {
    const descriptionText = normalizeText(item?.desc || item?.description || '');
    return descriptionText.includes(normalizedTerm);
  }) || null;
}

function populateEquipmentDescriptionLists() {
  const createList = document.getElementById('equipment-description-options');
  const editList = document.getElementById('edit-res-equipment-description-options');

  const { equipment = [] } = loadData();
  const equipmentList = Array.isArray(equipment) ? equipment : [];
  setCachedEquipment(equipmentList);

  const uniqueDescriptions = Array.from(
    new Set(
      equipmentList
        .map((item) => item?.desc || item?.description || '')
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, 'ar', { sensitivity: 'base' }));

  const optionsHtml = uniqueDescriptions.map((desc) => `<option value="${desc}"></option>`).join('');

  if (createList) createList.innerHTML = optionsHtml;
  if (editList) editList.innerHTML = optionsHtml;
}

function addDraftEquipmentByDescription(inputElement) {
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
    desc: equipmentItem.desc || equipmentItem.description || equipmentItem.name || '',
    qty: 1,
    price: Number.isFinite(Number(equipmentItem.price)) ? Number(equipmentItem.price) : 0,
    image: resolveItemImage(equipmentItem)
  };

  const { start, end } = getCreateReservationDateRange();
  if (!start || !end) {
    showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
    return;
  }

  const currentItems = getSelectedItems();
  const duplicate = currentItems.some((item) => normalizeBarcodeValue(item.barcode) === normalizedCode);
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

  addSelectedItem(itemPayload);
  renderReservationItems();
  renderDraftReservationSummary();

  inputElement.value = '';
}

function setupEquipmentDescriptionInputs() {
  populateEquipmentDescriptionLists();

  const createInput = document.getElementById('equipment-description');
  if (createInput && !createInput.dataset.listenerAttached) {
    createInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addDraftEquipmentByDescription(createInput);
      }
    });
    createInput.dataset.listenerAttached = 'true';
  }
}

function renderReservationItems(containerId = 'reservation-items') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = getSelectedItems();
  const noItemsMessage = t('reservations.create.equipment.noneAdded', 'لا توجد معدات مضافة');
  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const imageAlt = t('reservations.create.equipment.imageAlt', 'صورة');

  if (items.length === 0) {
    container.innerHTML = `<tr><td colspan="5">${noItemsMessage}</td></tr>`;
    return;
  }

  container.innerHTML = items
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
          <td><button type="button" class="btn btn-sm btn-danger" data-action="remove-item" data-index="${index}">🗑️</button></td>
        </tr>
      `;
    })
    .join('');
}

function renderDraftReservationSummary() {
  const rawValue = document.getElementById('res-discount')?.value || '0';
  const discount = parseFloat(normalizeNumbers(rawValue)) || 0;

  const discountType = document.getElementById('res-discount-type')?.value || 'percent';
  const applyTax = document.getElementById('res-tax')?.checked || false;
  const paidStatus = document.getElementById('res-payment-status')?.value || 'unpaid';

  renderDraftSummary({
    selectedItems: getSelectedItems(),
    discount,
    discountType,
    applyTax,
    paidStatus
  });
}

function setupSummaryEvents() {
  const discountInput = document.getElementById('res-discount');
  if (discountInput && !discountInput.dataset.listenerAttached) {
    discountInput.addEventListener('input', (e) => {
      e.target.value = normalizeNumbers(e.target.value);
      renderDraftReservationSummary();
    });
    discountInput.dataset.listenerAttached = 'true';
  }

  const discountTypeSelect = document.getElementById('res-discount-type');
  if (discountTypeSelect && !discountTypeSelect.dataset.listenerAttached) {
    discountTypeSelect.addEventListener('change', renderDraftReservationSummary);
    discountTypeSelect.dataset.listenerAttached = 'true';
  }

  const taxCheckbox = document.getElementById('res-tax');
  if (taxCheckbox && !taxCheckbox.dataset.listenerAttached) {
    taxCheckbox.addEventListener('change', renderDraftReservationSummary);
    taxCheckbox.dataset.listenerAttached = 'true';
  }

  const paymentSelect = document.getElementById('res-payment-status');
  if (paymentSelect && !paymentSelect.dataset.listenerAttached) {
    paymentSelect.addEventListener('change', renderDraftReservationSummary);
    paymentSelect.dataset.listenerAttached = 'true';
  }
}

function handleReservationSubmit() {
  const inputValue = document.getElementById('res-customer').value.trim().toLowerCase();
  const { customers, reservations } = loadData();

  let customer = customers.find((c) => c.customerName?.trim().toLowerCase() === inputValue);

  if (!customer) {
    customer = customers.find((c) => c.customerName?.toLowerCase().includes(inputValue));
  }

  if (!customer) {
    showToast(t('reservations.toast.customerNotFound', '⚠️ لم يتم العثور على العميل بالاسم المدخل'));
    return;
  }

  const customerId = customer.id;
  const startDate = document.getElementById('res-start').value;
  const endDate = document.getElementById('res-end').value;
  const startTime = document.getElementById('res-start-time')?.value || '00:00';
  const endTime = document.getElementById('res-end-time')?.value || '00:00';

  if (!startDate || !endDate) {
    showToast(t('reservations.toast.requireDates', '⚠️ يرجى تحديد تاريخ البداية والنهاية'));
    return;
  }

  const start = `${startDate}T${startTime}`;
  const end = `${endDate}T${endTime}`;

  const startDateObj = new Date(start);
  const endDateObj = new Date(end);
  if (
    Number.isNaN(startDateObj.getTime()) ||
    Number.isNaN(endDateObj.getTime()) ||
    startDateObj >= endDateObj
  ) {
    showToast(t('reservations.toast.invalidDateRange', '⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية'));
    return;
  }

  const draftItems = getSelectedItems();
  if (draftItems.length === 0) {
    showToast(t('reservations.toast.noItems', '⚠️ لا يمكنك إنشاء حجز بدون معدات'));
    return;
  }

  const notes = document.getElementById('res-notes')?.value || '';
  const discount = parseFloat(normalizeNumbers(document.getElementById('res-discount')?.value)) || 0;
  const discountType = document.getElementById('res-discount-type')?.value || 'percent';
  const applyTax = document.getElementById('res-tax')?.checked || false;
  const paymentStatus = document.getElementById('res-payment-status')?.value || 'unpaid';

  const technicianIds = getSelectedTechnicians();

  for (const item of draftItems) {
    if (isEquipmentInMaintenance(item.barcode)) {
      showToast(t('reservations.toast.cannotCreateEquipmentMaintenance', '⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة'));
      return;
    }
  }

  for (const item of draftItems) {
    const code = normalizeBarcodeValue(item.barcode);
    if (hasEquipmentConflict(code, start, end)) {
      showToast(
        t('reservations.toast.cannotCreateEquipmentConflict', '⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية')
      );
      return;
    }
  }

  for (const technicianId of technicianIds) {
    if (hasTechnicianConflict(technicianId, start, end)) {
      showToast(
        t('reservations.toast.cannotCreateCrewConflict', '⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة')
      );
      return;
    }
  }

  const newReservation = {
    id: Date.now(),
    reservationId: generateReservationId(),
    customerId: parseInt(customerId, 10),
    start,
    end,
    items: [...draftItems],
    technicians: technicianIds,
    notes,
    discount,
    discountType,
    applyTax,
    paid: paymentStatus === 'paid',
    cost: calculateReservationTotal(draftItems, discount, discountType, applyTax),
    confirmed: false
  };

  reservations.push(newReservation);
  saveData({ reservations });
  syncEquipmentStatuses();
  populateEquipmentDescriptionLists();
  syncTechniciansStatuses();

  resetForm();
  showToast(t('reservations.toast.created', '✅ تم إنشاء الحجز'));
  if (typeof afterSubmitCallback === 'function') {
    afterSubmitCallback(newReservation);
  }
}

function resetForm() {
  document.getElementById('res-customer').value = '';
  document.getElementById('res-start').value = '';
  document.getElementById('res-start-time').value = '';
  document.getElementById('res-end').value = '';
  document.getElementById('res-end-time').value = '';
  document.getElementById('res-notes').value = '';
  document.getElementById('res-discount').value = '';
  document.getElementById('res-tax').checked = false;
  const descriptionInput = document.getElementById('equipment-description');
  if (descriptionInput) descriptionInput.value = '';
  const paymentSelect = document.getElementById('res-payment-status');
  if (paymentSelect) paymentSelect.value = 'unpaid';
  resetSelectedTechnicians();
  setSelectedItems([]);
  renderReservationItems();
  renderDraftReservationSummary();
}

function setupReservationButtons() {
  const container = document.getElementById('reservation-items');
  if (!container || container.dataset.listenerAttached) return;

  container.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action="remove-item"]');
    if (!button) return;
    const index = Number(button.dataset.index);
    removeSelectedItem(index);
    renderReservationItems();
    renderDraftReservationSummary();
  });

  container.dataset.listenerAttached = 'true';
}

function setupBarcodeInput() {
  const input = document.getElementById('equipment-barcode');
  if (!input || input.dataset.listenerAttached) return;

  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const code = normalizeBarcodeValue(input.value);
    if (!code) return;

    const { start, end } = getCreateReservationDateRange();
    if (!start || !end) {
      showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
      return;
    }

    const currentItems = getSelectedItems();
    const duplicate = currentItems.some((item) => normalizeBarcodeValue(item.barcode) === code);
    if (duplicate) {
      showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
      return;
    }

    if (hasEquipmentConflict(code, start, end)) {
      showToast(t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية'));
      return;
    }

    const { equipment } = loadData();
    const item = (equipment || []).find((eq) => normalizeBarcodeValue(eq.barcode) === code);
    if (!item) {
      showToast(t('reservations.toast.barcodeNotFound', '❌ الباركود غير موجود'));
      return;
    }

    if (isEquipmentInMaintenance(item.barcode)) {
      showToast(t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً'));
      return;
    }

    addSelectedItem({
      id: item.id,
      barcode: normalizeBarcodeValue(item.barcode),
      desc: item.desc,
      qty: 1,
      price: item.price,
      image: resolveItemImage(item)
    });

    input.value = '';
    renderReservationItems();
    renderDraftReservationSummary();
    showToast(t('reservations.toast.equipmentAdded', '✅ تم إضافة المعدة بنجاح'));
  });

  input.dataset.listenerAttached = 'true';
}

function setupFormSubmit() {
  const form = document.getElementById('reservation-form');
  if (form && !form.dataset.listenerAttached) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      handleReservationSubmit();
    });
    form.dataset.listenerAttached = 'true';
  }

  const btn = document.getElementById('create-reservation-btn');
  if (btn && !btn.dataset.listenerAttached) {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      handleReservationSubmit();
    });
    btn.dataset.listenerAttached = 'true';
  }
}

function setupCustomerAutocomplete() {
  const input = document.getElementById('res-customer');
  const suggestionsBox = document.getElementById('customer-suggestions');
  if (!input || !suggestionsBox) return;

  const renderSuggestions = (items) => {
    if (!items || items.length === 0) {
      suggestionsBox.style.display = 'none';
      suggestionsBox.innerHTML = '';
      return;
    }

    suggestionsBox.innerHTML = items
      .map((name) => `<div class="suggestion-item" data-name="${name}">${name}</div>`)
      .join('');
    suggestionsBox.style.display = 'block';

    suggestionsBox.querySelectorAll('.suggestion-item').forEach((item) => {
      item.addEventListener('mousedown', (event) => {
        event.preventDefault();
        const selectedName = event.target.getAttribute('data-name');
        input.value = selectedName;
        suggestionsBox.style.display = 'none';
      });
    });
  };

  const getUniqueNames = () => {
    const customers = getCachedCustomers() || [];
    return [...new Set(customers.map((c) => c.customerName).filter(Boolean))];
  };

  const updateSuggestions = () => {
    const value = normalizeText(input.value);
    const names = getUniqueNames();
    const matches = !value
      ? names.slice(0, 10)
      : names.filter((name) => normalizeText(name).startsWith(value)).slice(0, 10);
    renderSuggestions(matches);
  };

  input.addEventListener('input', () => {
    updateSuggestions();
  });

  input.addEventListener('focus', () => {
    updateSuggestions();
  });

  input.addEventListener('blur', () => {
    setTimeout(() => {
      suggestionsBox.style.display = 'none';
    }, 150);
  });
}

export function initCreateReservationForm({ onAfterSubmit } = {}) {
  afterSubmitCallback = typeof onAfterSubmit === 'function' ? onAfterSubmit : null;

  const { customers } = loadData();
  setCachedCustomers(customers || []);

  populateEquipmentDescriptionLists();
  setupEquipmentDescriptionInputs();
  setupSummaryEvents();
  setupReservationButtons();
  setupBarcodeInput();
  setupFormSubmit();
  setupCustomerAutocomplete();
  renderDraftReservationSummary();
  renderReservationItems();
}

export function refreshCreateReservationForm() {
  populateEquipmentDescriptionLists();
  renderReservationItems();
  renderDraftReservationSummary();
}

export { populateEquipmentDescriptionLists, addDraftEquipmentByDescription, renderDraftReservationSummary, renderReservationItems };
