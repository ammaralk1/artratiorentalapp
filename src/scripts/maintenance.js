import { loadData } from './storage.js';
import { showToast, formatDateTime, normalizeNumbers } from './utils.js';

function formatDateDDMMYY(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}
import { refreshEquipmentFromApi, renderEquipment } from './equipment.js';
import { normalizeAssetUrl } from './reservationsEquipment.js';
import { t } from './language.js';
import { userCanManageDestructiveActions, notifyPermissionDenied, AUTH_EVENTS } from './auth.js';
import {
  getMaintenanceState,
  refreshMaintenanceFromApi,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
  buildMaintenancePayload,
  categorizeMaintenanceStatus,
  isApiError as isMaintenanceApiError,
} from './maintenanceService.js';

let maintenanceTickets = getMaintenanceState();
let maintenanceInitialized = false;
let equipmentOptions = [];
let currentSelection = null;
let maintenanceLoading = false;
let maintenanceErrorMessage = '';
let maintenanceHasLoaded = maintenanceTickets.length > 0;
let closeTicketState = {
  id: null,
  equipmentDesc: '',
  equipmentBarcode: '',
  repairCost: null,
  resolvedAt: null,
  mode: 'close'
};
let closeTicketModal = null;
let closeTicketReportInput = null;
let closeTicketCostInput = null;
let closeTicketSubmitButton = null;
let closeTicketDetailsContainer = null;
let reportModal = null;
let reportModalContent = null;
let reportModalEditButton = null;
let reportModalLastTicketId = null;

async function loadMaintenanceFromApi({ showToastOnError = true } = {}) {
  if (maintenanceLoading) return;

  maintenanceLoading = true;
  maintenanceErrorMessage = '';
  renderMaintenance();

  try {
    await refreshMaintenanceFromApi();
    maintenanceHasLoaded = true;
  } catch (error) {
    // Suppress noisy errors during logout/unauthorized state
    if (error && typeof error === 'object' && Number(error.status) === 401) {
      maintenanceHasLoaded = maintenanceTickets.length > 0;
      maintenanceErrorMessage = '';
    } else {
      maintenanceHasLoaded = maintenanceTickets.length > 0;
      console.error('❌ [maintenance] Failed to load maintenance tickets', error);
      maintenanceErrorMessage = isMaintenanceApiError(error)
        ? error.message
        : t('maintenance.toast.fetchFailed', 'تعذر تحميل بيانات الصيانة. حاول تحديث الصفحة.');
      if (showToastOnError) {
        showToast(maintenanceErrorMessage, 'error');
      }
    }
  } finally {
    maintenanceLoading = false;
    maintenanceTickets = getMaintenanceState();
    renderMaintenance();
  }
}

function getDefaultSelectionText() {
  return t('maintenance.form.selectedInfo', 'لم يتم اختيار معدة بعد.');
}

function normalizeBarcodeValue(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

function normalizeText(value = '') {
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

function buildEquipmentSearchValue(option = {}) {
  const desc = String(option?.desc ?? '').trim();
  const barcode = normalizeNumbers(String(option?.displayBarcode ?? option?.barcode ?? '')).trim();
  if (barcode) {
    return `${desc} | ${barcode}`;
  }
  return desc;
}

function parseEquipmentSearchInput(value) {
  const raw = normalizeNumbers(String(value || ''));
  if (!raw.trim()) {
    return { description: '', barcode: '' };
  }
  const [first, ...rest] = raw.split('|');
  return {
    description: first.trim(),
    barcode: rest.join('|').trim(),
  };
}

function normalizeSearchValue(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

function escapeHtml(value = '') {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toSqlDatetime(dateInput = new Date()) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) return null;
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function loadTickets() {
  maintenanceTickets = getMaintenanceState();
  return maintenanceTickets;
}

function getTicketById(id) {
  const tickets = loadTickets();
  return tickets.find((item) => Number(item.id) === Number(id)) || null;
}

function normalizeEquipmentStatus(value) {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (!normalized) return 'available';
  if (['maintenance', 'صيانة'].includes(normalized)) return 'maintenance';
  if (['reserved', 'محجوز'].includes(normalized)) return 'reserved';
  if (['retired', 'متوقف', 'خارج الخدمة'].includes(normalized)) return 'retired';
  return 'available';
}

function getEquipmentOptions() {
  const { equipment = [] } = loadData();
  const fallbackName = t('maintenance.table.noName', 'بدون اسم');
  equipmentOptions = (equipment || []).map((item) => {
    const rawBarcode = String(item?.barcode ?? '').trim();
    const normalizedBarcode = normalizeBarcodeValue(rawBarcode);
    const quantityValue = Number.parseInt(item?.qty ?? item?.quantity ?? 0, 10);
    const safeQuantity = Number.isFinite(quantityValue) ? Math.max(quantityValue, 0) : 1;
    const imageUrl = normalizeAssetUrl(item?.image || item?.imageUrl || item?.image_url || '');
    const statusLabel = item?.status || 'متاح';
    const description = item?.desc || item?.description || item?.name || fallbackName;
    const searchValue = buildEquipmentSearchValue({
      desc: description,
      displayBarcode: rawBarcode,
      barcode: normalizedBarcode,
    });
    return {
      id: item?.id ?? item?.equipment_id ?? item?.equipmentId ?? null,
      barcode: normalizedBarcode,
      displayBarcode: rawBarcode,
      desc: description,
      status: statusLabel,
      statusNormalized: normalizeEquipmentStatus(statusLabel),
      price: Number(item?.price || item?.unit_price) || 0,
      category: item?.category || '',
      quantity: safeQuantity,
      image: imageUrl,
      searchValue,
      searchValueNormalized: normalizeSearchValue(searchValue),
      descriptionNormalized: normalizeText(description),
    };
  });

  equipmentOptions.sort((a, b) => a.desc.localeCompare(b.desc, 'ar', { sensitivity: 'base' }));
  return equipmentOptions;
}

function getOpenTicketsSummary() {
  const set = new Set();
  const map = new Map();

  loadTickets()
    .filter((ticket) => ticket.status === 'open')
    .forEach((ticket) => {
      const normalized = normalizeBarcodeValue(ticket.equipmentBarcode);
      if (!normalized) return;
      set.add(normalized);
      map.set(normalized, (map.get(normalized) || 0) + 1);
    });

  return { set, map };
}

function getOpenTicketCount(barcode) {
  const normalized = normalizeBarcodeValue(barcode);
  if (!normalized) return 0;
  const { map } = getOpenTicketsSummary();
  return map.get(normalized) || 0;
}

function findEquipmentOptionByBarcode(barcode) {
  const normalized = normalizeBarcodeValue(barcode);
  if (!normalized) return null;
  const options = equipmentOptions.length ? equipmentOptions : getEquipmentOptions();
  return options.find((option) => option.barcode === normalized) || null;
}

function findEquipmentOptionByDescription(term) {
  const options = equipmentOptions.length ? equipmentOptions : getEquipmentOptions();
  if (!options.length) return null;

  const normalizedSearch = normalizeSearchValue(term);
  if (normalizedSearch) {
    const exactSearchMatch = options.find((option) => option.searchValueNormalized === normalizedSearch);
    if (exactSearchMatch) return exactSearchMatch;
  }

  const { description, barcode } = parseEquipmentSearchInput(term);

  if (barcode) {
    const normalizedBarcode = normalizeBarcodeValue(barcode);
    if (normalizedBarcode) {
      const barcodeMatch = options.find((option) => option.barcode === normalizedBarcode);
      if (barcodeMatch) return barcodeMatch;
    }
  }

  const normalizedDescription = normalizeText(description || term);
  if (!normalizedDescription) return null;

  const exactDescription = options.find((option) => option.descriptionNormalized === normalizedDescription);
  if (exactDescription) return exactDescription;

  return options.find((option) => option.descriptionNormalized.includes(normalizedDescription)) || null;
}

function isOptionBlocked(option, openCountsMap = null) {
  if (!option) return true;

  const normalizedBarcode = option.barcode;
  const quantity = Number.isFinite(option.quantity) ? option.quantity : 0;
  const countsMap = openCountsMap || getOpenTicketsSummary().map;
  const openCount = countsMap.get(normalizedBarcode) || 0;

  if (quantity <= 0) {
    return true;
  }

  if (quantity === 1) {
    return option.statusNormalized === 'maintenance' || openCount >= 1;
  }

  return openCount >= quantity;
}

function clearSelectedEquipment({ keepInputs = false, silent = false } = {}) {
  const hidden = document.getElementById('maintenance-selected-barcode');
  const barcodeInput = document.getElementById('maintenance-equipment-barcode');
  const searchInput = document.getElementById('maintenance-equipment-search');
  const info = document.getElementById('maintenance-selected-info');

  if (hidden) hidden.value = '';
  if (!keepInputs) {
    if (barcodeInput) barcodeInput.value = '';
    if (searchInput) searchInput.value = '';
  }

  if (info) {
    info.textContent = getDefaultSelectionText();
    info.classList.remove('maintenance-selected-info--has-selection');
  }

  if (!silent) {
    // no toast by default here; callers can handle
  }

  currentSelection = null;
}

function updateSelectedInfo(option) {
  const info = document.getElementById('maintenance-selected-info');
  if (!info) return;
  const barcodeLabel = t('maintenance.info.barcodeLabel', 'باركود');
  const notAvailable = t('maintenance.report.notAvailable', 'غير متوفر');
  const unitsLabel = t('maintenance.info.unitsAvailable', 'الوحدات المتاحة الآن');
  const categoryLabel = t('maintenance.info.categoryLabel', 'القسم');
  const displayBarcode = option.displayBarcode || option.barcode || notAvailable;
  const normalizedBarcode = option.barcode;
  const totalQuantity = Number.isFinite(option.quantity) ? option.quantity : 0;
  const openCount = getOpenTicketCount(normalizedBarcode);
  const availableQuantity = Math.max(totalQuantity - openCount, 0);
  const categoryLine = option.category ? `
    <div class="maintenance-selected-info__meta">${categoryLabel}: <strong>${escapeHtml(option.category)}</strong></div>
  ` : '';
  const quantityLine = totalQuantity > 0 ? `
    <div class="maintenance-selected-info__meta">
      ${unitsLabel}: <strong>${availableQuantity}</strong> / ${totalQuantity}
    </div>
  ` : '';
  const imageMarkup = option.image
    ? `<img class="maintenance-selected-info__image" src="${escapeHtml(option.image)}" alt="${escapeHtml(option.desc)}">`
    : `<div class="maintenance-selected-info__placeholder" aria-hidden="true">🎥</div>`;

  info.innerHTML = `
    <div class="maintenance-selected-info__media">${imageMarkup}</div>
    <div class="maintenance-selected-info__body">
      <div class="maintenance-selected-info__name">${escapeHtml(option.desc)}</div>
      <div class="maintenance-selected-info__meta">${barcodeLabel}: <strong>${escapeHtml(displayBarcode)}</strong></div>
      ${quantityLine}
      ${categoryLine}
    </div>
  `;
  info.classList.add('maintenance-selected-info--has-selection');
}

function selectEquipment(option, { silent = false } = {}) {
  if (!option) return false;
  if (isOptionBlocked(option)) {
    if (!silent) {
      showToast(t('maintenance.toast.equipmentBlocked', '⚠️ هذه المعدة قيد الصيانة ولا يمكن اختيارها حالياً'));
    }
    return false;
  }

  const hidden = document.getElementById('maintenance-selected-barcode');
  const barcodeInput = document.getElementById('maintenance-equipment-barcode');
  const searchInput = document.getElementById('maintenance-equipment-search');

  if (hidden) hidden.value = option.barcode;
  if (barcodeInput) barcodeInput.value = option.displayBarcode || option.barcode;
  if (searchInput) searchInput.value = option.searchValue || option.desc;
  updateSelectedInfo(option);
  currentSelection = option;
  return true;
}

function selectEquipmentByBarcode(value, { showFeedback = true } = {}) {
  const option = findEquipmentOptionByBarcode(value);
  if (!option) {
    if (showFeedback) showToast(t('maintenance.toast.equipmentNotFoundBarcode', '❌ لم يتم العثور على معدة بهذا الباركود'));
    return false;
  }
  return selectEquipment(option, { silent: !showFeedback });
}

function selectEquipmentByDescription(value, { showFeedback = true } = {}) {
  const option = findEquipmentOptionByDescription(value);
  if (!option) {
    if (showFeedback) showToast(t('maintenance.toast.equipmentNotFoundName', '❌ لم يتم العثور على معدة بالاسم المدخل'));
    return false;
  }
  return selectEquipment(option, { silent: !showFeedback });
}

function populateEquipmentInputs() {
  const datalist = document.getElementById('maintenance-equipment-options');
  const barcodeInput = document.getElementById('maintenance-equipment-barcode');
  const searchInput = document.getElementById('maintenance-equipment-search');

  const options = getEquipmentOptions();
  const { map: openCounts } = getOpenTicketsSummary();

  if (datalist) {
    datalist.innerHTML = options
      .map((option) => {
        const valueAttr = escapeHtml(option.searchValue || option.desc);
        return `<option value="${valueAttr}"></option>`;
      })
      .join('');
  }

  const hidden = document.getElementById('maintenance-selected-barcode');
  if (hidden && hidden.value) {
    const current = findEquipmentOptionByBarcode(hidden.value);
    if (!current || isOptionBlocked(current, openCounts)) {
      clearSelectedEquipment({ keepInputs: true, silent: true });
      if (current && isOptionBlocked(current, openCounts)) {
        showToast(t('maintenance.toast.equipmentBecameBlocked', '⚠️ هذه المعدة أصبحت قيد الصيانة ولا يمكن اختيارها'));
      }
    } else {
      selectEquipment(current, { silent: true });
    }
  } else {
    clearSelectedEquipment({ keepInputs: true, silent: true });
  }

  if (barcodeInput && !barcodeInput.dataset.listenerAttached) {
    barcodeInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (!selectEquipmentByBarcode(barcodeInput.value)) {
          clearSelectedEquipment({ keepInputs: true, silent: true });
        }
      }
    });
    barcodeInput.dataset.listenerAttached = 'true';
  }

  if (searchInput && !searchInput.dataset.listenerAttached) {
    const handleSelection = () => {
      if (!searchInput.value) {
        clearSelectedEquipment({ keepInputs: true, silent: true });
        return;
      }
      if (!selectEquipmentByDescription(searchInput.value)) {
        clearSelectedEquipment({ keepInputs: true, silent: true });
      }
    };

    searchInput.addEventListener('change', handleSelection);
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSelection();
      }
    });
    searchInput.dataset.listenerAttached = 'true';
  }
}

async function refreshEquipmentData() {
  try {
    await refreshEquipmentFromApi({ showToastOnError: false });
  } catch (error) {
    console.error('❌ [maintenance] refreshEquipmentData failed', error);
  } finally {
    renderEquipment();
    populateEquipmentInputs();
  }
}

function ensureCloseTicketModalElements() {
  const modalEl = document.getElementById('closeMaintenanceModal');
  if (!modalEl) return false;

  const bootstrapLib = (typeof window !== 'undefined' ? window.bootstrap : undefined) ?? globalThis?.bootstrap;
  if (!bootstrapLib?.Modal) {
    return false;
  }

  closeTicketModal = bootstrapLib.Modal.getOrCreateInstance(modalEl);

  if (!closeTicketReportInput) {
    closeTicketReportInput = modalEl.querySelector('#maintenance-close-report');
  }
  if (!closeTicketCostInput) {
    closeTicketCostInput = modalEl.querySelector('#maintenance-close-cost');
  }
  if (closeTicketCostInput && closeTicketCostInput.dataset.normalizeAttached !== 'true') {
    closeTicketCostInput.addEventListener('input', (event) => {
      normalizeRepairCostInput(event.currentTarget);
      event.currentTarget?.classList.remove('is-invalid');
    });
    closeTicketCostInput.dataset.normalizeAttached = 'true';
  }
  if (!closeTicketSubmitButton) {
    closeTicketSubmitButton = modalEl.querySelector('#maintenance-close-submit');
  }
  if (!closeTicketDetailsContainer) {
    closeTicketDetailsContainer = modalEl.querySelector('#maintenance-close-modal-details');
  }

  const form = modalEl.querySelector('#maintenance-close-form');
  if (form && !form.dataset.listenerAttached) {
    form.addEventListener('submit', handleCloseTicketFormSubmit);
    form.dataset.listenerAttached = 'true';
  }

  if (!modalEl.dataset.listenerAttached) {
    modalEl.addEventListener('hidden.bs.modal', resetCloseTicketModal);
    modalEl.dataset.listenerAttached = 'true';
  }

  return true;
}

function resetCloseTicketModal() {
  closeTicketState = {
    id: null,
    equipmentDesc: '',
    equipmentBarcode: '',
    repairCost: null,
    resolvedAt: null,
    mode: 'close'
  };

  if (closeTicketReportInput) {
    closeTicketReportInput.value = '';
    closeTicketReportInput.classList.remove('is-invalid');
  }

  if (closeTicketCostInput) {
    closeTicketCostInput.value = '';
    closeTicketCostInput.classList.remove('is-invalid');
  }

  if (closeTicketDetailsContainer) {
    closeTicketDetailsContainer.innerHTML = '';
  }

  setCloseModalLoading(false);

  const modalEl = document.getElementById('closeMaintenanceModal');
  if (modalEl) {
    const titleEl = modalEl.querySelector('#maintenance-close-modal-title');
    const subtitleEl = modalEl.querySelector('.maintenance-close-modal__subtitle');
    if (titleEl) {
      titleEl.textContent = t('maintenance.closeModal.title', '🔧 إغلاق تذكرة الصيانة');
    }
    if (subtitleEl) {
      subtitleEl.textContent = t('maintenance.closeModal.subtitle', 'يرجى كتابة تقرير الإصلاح قبل إغلاق هذه التذكرة.');
    }
    if (closeTicketSubmitButton) {
      closeTicketSubmitButton.textContent = t('maintenance.closeModal.confirm', 'إغلاق التذكرة');
    }
  }
}

function ensureReportModalElements() {
  const modalEl = document.getElementById('maintenanceReportModal');
  if (!modalEl) return false;

  const bootstrapLib = (typeof window !== 'undefined' ? window.bootstrap : undefined) ?? globalThis?.bootstrap;
  if (!bootstrapLib?.Modal) {
    return false;
  }

  reportModal = bootstrapLib.Modal.getOrCreateInstance(modalEl);
  if (!reportModalContent) {
    reportModalContent = modalEl.querySelector('#maintenance-report-modal-content');
  }
  if (!reportModalEditButton) {
    reportModalEditButton = modalEl.querySelector('#maintenance-report-edit');
  }

  if (!modalEl.dataset.listenerAttached) {
    modalEl.addEventListener('hidden.bs.modal', resetReportModalContent);
    modalEl.dataset.listenerAttached = 'true';
  }

  if (reportModalEditButton && reportModalEditButton.dataset.listenerAttached !== 'true') {
    reportModalEditButton.addEventListener('click', handleReportModalEditButtonClick);
    reportModalEditButton.dataset.listenerAttached = 'true';
  }

  return true;
}

function resetReportModalContent() {
  if (reportModalContent) {
    reportModalContent.innerHTML = '';
  }
  if (reportModalEditButton) {
    reportModalEditButton.hidden = true;
    reportModalEditButton.disabled = false;
    delete reportModalEditButton.dataset.id;
  }
  reportModalLastTicketId = null;
}

function setCloseModalLoading(isLoading) {
  if (!closeTicketSubmitButton) return;
  const isEditMode = closeTicketState.mode === 'edit';
  const savingLabel = isEditMode
    ? t('maintenance.closeModal.editSaving', '⏳ جاري الحفظ...')
    : t('maintenance.closeModal.saving', '⏳ جاري الإغلاق...');
  const confirmLabel = isEditMode
    ? t('maintenance.closeModal.editConfirm', 'حفظ التعديلات')
    : t('maintenance.closeModal.confirm', 'إغلاق التذكرة');

  if (isLoading) {
    closeTicketSubmitButton.disabled = true;
    closeTicketSubmitButton.dataset.loading = 'true';
    closeTicketSubmitButton.textContent = savingLabel;
  } else {
    closeTicketSubmitButton.disabled = false;
    closeTicketSubmitButton.removeAttribute('data-loading');
    closeTicketSubmitButton.textContent = confirmLabel;
  }
}

function normalizeRepairCostInput(input) {
  if (!input) return;
  const originalValue = input.value;
  if (typeof originalValue !== 'string') return;
  const normalized = normalizeNumbers(originalValue).replace(/٫/g, '.').replace(/٬/g, ',');
  if (normalized !== originalValue) {
    const { selectionStart, selectionEnd } = input;
    input.value = normalized;
    if (selectionStart !== null && selectionEnd !== null) {
      try {
        input.setSelectionRange(selectionStart, selectionEnd);
      } catch (error) {
        // ignore selection errors in unsupported browsers
      }
    }
  }
}

function resolveRepairCostFromInput(rawValue, previousValue) {
  const trimmed = typeof rawValue === 'string' ? rawValue.trim() : '';
  const hadPrevious = Number.isFinite(previousValue);

  if (!trimmed) {
    return {
      provided: hadPrevious,
      value: null,
      error: null,
    };
  }

  const normalizedDigits = normalizeNumbers(trimmed).replace(/٫/g, '.').replace(/٬/g, ',');
  const sanitized = normalizedDigits.replace(/[^0-9.,-]/g, '');
  if (!sanitized) {
    return {
      provided: true,
      value: null,
      error: 'invalid',
    };
  }

  const hasComma = sanitized.includes(',');
  const hasDot = sanitized.includes('.');
  let prepared = sanitized;
  if (hasComma && !hasDot) {
    prepared = sanitized.replace(',', '.');
  } else if (hasComma && hasDot) {
    prepared = sanitized.replace(/,/g, '');
  }

  const parsed = Number.parseFloat(prepared);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return {
      provided: true,
      value: null,
      error: 'invalid',
    };
  }

  return {
    provided: true,
    value: Math.round(parsed * 100) / 100,
    error: null,
  };
}

function openCloseTicketModal(id, { mode = 'close' } = {}) {
  const ticket = getTicketById(id);
  if (!ticket) {
    showToast(t('maintenance.toast.ticketNotFound', '⚠️ تعذر العثور على تذكرة الصيانة'));
    return;
  }

  if (!ensureCloseTicketModalElements()) {
    const report = prompt(t('maintenance.prompt.closeReport', 'أدخل تقرير الإصلاح / الإجراءات المتخذة:'));
    if (report === null) return;
    const trimmed = report.trim();
    if (!trimmed) {
      showToast(t('maintenance.toast.reportRequired', '⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق'), 'error');
      return;
    }
    void performTicketClosure(id, trimmed);
    return;
  }

  const repairCostNumber = ticket.repairCost != null && ticket.repairCost !== ''
    ? Number.parseFloat(normalizeNumbers(String(ticket.repairCost)))
    : null;
  const normalizedRepairCost = Number.isFinite(repairCostNumber)
    ? Math.round(repairCostNumber * 100) / 100
    : null;

  const normalizedMode = mode === 'edit' ? 'edit' : 'close';

  closeTicketState = {
    id: ticket.id,
    equipmentDesc: ticket.equipmentDesc || '',
    equipmentBarcode: ticket.equipmentBarcode || '',
    repairCost: normalizedRepairCost,
    resolvedAt: ticket.resolvedAt || null,
    mode: normalizedMode
  };

  if (closeTicketReportInput) {
    closeTicketReportInput.value = ticket.resolutionReport || '';
    closeTicketReportInput.classList.remove('is-invalid');
  }

  if (closeTicketCostInput) {
    if (normalizedRepairCost !== null) {
      closeTicketCostInput.value = normalizeNumbers(normalizedRepairCost.toFixed(2));
    } else {
      closeTicketCostInput.value = '';
    }
    closeTicketCostInput.classList.remove('is-invalid');
  }

  if (closeTicketDetailsContainer) {
    const barcodeLabel = t('maintenance.report.barcode', 'الباركود');
    const notAvailable = t('maintenance.report.notAvailable', 'غير متوفر');
    const equipmentText = closeTicketState.equipmentDesc || notAvailable;
    const barcodeText = closeTicketState.equipmentBarcode
      ? normalizeNumbers(closeTicketState.equipmentBarcode)
      : notAvailable;
    closeTicketDetailsContainer.innerHTML = `
      <div class="maintenance-close-modal__ticket-card" role="group" aria-labelledby="maintenance-close-ticket-title">
        <div class="maintenance-close-modal__ticket-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 2h6"></path>
            <path d="M10 4h4"></path>
            <path d="M8 4h-2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"></path>
            <path d="M9 12l2 2 4-4"></path>
          </svg>
        </div>
        <div class="maintenance-close-modal__ticket-info">
          <div id="maintenance-close-ticket-title" class="maintenance-close-modal__ticket-title">${equipmentText}</div>
          <div class="maintenance-close-modal__ticket-meta">${barcodeLabel}: <span>${barcodeText}</span></div>
        </div>
      </div>
    `;
  }

  setCloseModalLoading(false);
  const isEditMode = normalizedMode === 'edit';
  if (closeTicketSubmitButton) {
    closeTicketSubmitButton.textContent = isEditMode
      ? t('maintenance.closeModal.editConfirm', 'حفظ التعديلات')
      : t('maintenance.closeModal.confirm', 'إغلاق التذكرة');
  }

  const modalEl = document.getElementById('closeMaintenanceModal');
  if (modalEl) {
    const titleEl = modalEl.querySelector('#maintenance-close-modal-title');
    const subtitleEl = modalEl.querySelector('.maintenance-close-modal__subtitle');
    if (titleEl) {
      titleEl.textContent = isEditMode
        ? t('maintenance.closeModal.editTitle', '✏️ تعديل بيانات الإغلاق')
        : t('maintenance.closeModal.title', '🔧 إغلاق تذكرة الصيانة');
    }
    if (subtitleEl) {
      subtitleEl.textContent = isEditMode
        ? t('maintenance.closeModal.editSubtitle', 'يمكنك تحديث تقرير الإصلاح وتكلفته.')
        : t('maintenance.closeModal.subtitle', 'يرجى كتابة تقرير الإصلاح قبل إغلاق هذه التذكرة.');
    }
  }

  closeTicketModal?.show();

  setTimeout(() => {
    closeTicketReportInput?.focus();
    closeTicketReportInput?.setSelectionRange(closeTicketReportInput.value.length, closeTicketReportInput.value.length);
  }, 150);
}

async function handleCloseTicketFormSubmit(event) {
  event?.preventDefault();

  if (!closeTicketState.id) {
    showToast(t('maintenance.toast.ticketNotFound', '⚠️ تعذر العثور على تذكرة الصيانة'));
    return;
  }

  if (!closeTicketReportInput) {
    return;
  }

  const report = closeTicketReportInput.value.trim();
  if (!report) {
    showToast(t('maintenance.toast.reportRequired', '⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق'), 'error');
    closeTicketReportInput.focus();
    return;
  }

  if (closeTicketCostInput) {
    closeTicketCostInput.classList.remove('is-invalid');
  }

  const costResolution = closeTicketCostInput
    ? resolveRepairCostFromInput(closeTicketCostInput.value, closeTicketState.repairCost)
    : { provided: false, value: null, error: null };

  if (costResolution.error) {
    showToast(t('maintenance.toast.invalidRepairCost', '⚠️ يرجى إدخال قيمة رقمية صحيحة لتكلفة الإصلاح'), 'error');
    closeTicketCostInput?.classList.add('is-invalid');
    closeTicketCostInput?.focus();
    return;
  }

  setCloseModalLoading(true);

  const result = await performTicketClosure(closeTicketState.id, report, {
    repairCost: costResolution.value,
    repairCostProvided: costResolution.provided,
    mode: closeTicketState.mode,
    resolvedAt: closeTicketState.resolvedAt,
  });
  if (result.success) {
    closeTicketModal?.hide();
  } else {
    setCloseModalLoading(false);
  }
}

function renderStats(tickets) {
  const container = document.getElementById('maintenance-stats');
  if (!container) return;

  const total = tickets.length;
  const open = tickets.filter((ticket) => ticket.status === 'open').length;
  const closed = total - open;
  const formatCount = (value) => normalizeNumbers(String(value));
  const summaryTitle = t('maintenance.stats.summaryTitle', 'ملخص الصيانة');
  const openLabel = t('maintenance.filters.status.open', 'قيد الصيانة');
  const closedLabel = t('maintenance.filters.status.closed', 'مغلقة');
  const totalLabel = t('maintenance.stats.totalLabel', 'إجمالي التذاكر');

  const buildItem = (value, label, modifier) => `
    <div class="maintenance-summary__item maintenance-summary__item--${modifier}">
      <span class="maintenance-summary__value">${formatCount(value)}</span>
      <span class="maintenance-summary__label">${label}</span>
    </div>
  `;

  container.innerHTML = `
    <section class="maintenance-summary" aria-labelledby="maintenance-summary-title">
      <header class="maintenance-summary__header">
        <span class="maintenance-summary__icon" aria-hidden="true">🛠️</span>
        <h4 id="maintenance-summary-title" class="maintenance-summary__title">${summaryTitle}</h4>
      </header>
      <div class="maintenance-summary__items">
        ${buildItem(open, openLabel, 'open')}
        ${buildItem(closed, closedLabel, 'closed')}
        ${buildItem(total, totalLabel, 'total')}
      </div>
    </section>
  `;
}


function buildMaintenanceStatusTag(ticket) {
  const rawStatus = String(ticket?.statusRaw ?? ticket?.status ?? 'open');
  const statusSlug = rawStatus
    .toLowerCase()
    .replace(/[^a-z0-9_\-\s]/g, '')
    .replace(/[\s]+/g, '_')
    || 'open';

  const category = categorizeMaintenanceStatus(statusSlug) || 'open';

  const statusMap = {
    open: { key: 'maintenance.status.open', fallback: 'قيد الصيانة', className: 'maintenance-status-tag--open' },
    in_progress: { key: 'maintenance.status.inProgress', fallback: 'قيد التنفيذ', className: 'maintenance-status-tag--in-progress' },
    completed: { key: 'maintenance.status.completed', fallback: 'مكتملة', className: 'maintenance-status-tag--completed' },
    cancelled: { key: 'maintenance.status.cancelled', fallback: 'ملغاة', className: 'maintenance-status-tag--cancelled' },
  };

  const config = statusMap[category] ?? statusMap.open;
  const fallbackLabel = config ? t(config.key, config.fallback) : t('maintenance.status.open', 'قيد الصيانة');
  const label = (ticket?.statusLabel && String(ticket.statusLabel).trim())
    ? String(ticket.statusLabel).trim()
    : fallbackLabel;

  const classes = ['maintenance-status-badge', 'maintenance-status-tag'];
  if (config?.className) {
    classes.push(config.className);
  }
  classes.push(`maintenance-status-tag--${category}`);
  classes.push(`maintenance-status-tag--${statusSlug}`);

  return `<span class="${classes.filter(Boolean).join(' ')}">${label}</span>`;
}

function renderTable(tickets) {
  const tbody = document.getElementById('maintenance-table-body');
  const emptyState = document.getElementById('maintenance-empty-state');
  if (!tbody) return;

  if (!tickets || tickets.length === 0) {
    const emptyTitle = t('maintenance.empty.title', 'لا توجد تذاكر صيانة');
    const emptySubtitle = t('maintenance.empty.subtitle', 'عند إنشاء تذكرة جديدة ستظهر في هذه القائمة.');
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="maintenance-empty-row">
          <div class="maintenance-empty-icon">✅</div>
          <h5>${emptyTitle}</h5>
          <p>${emptySubtitle}</p>
        </td>
      </tr>
    `;
    if (emptyState) emptyState.classList.add('active');
    return;
  }

  if (emptyState) emptyState.classList.remove('active');

  tbody.innerHTML = tickets
    .map((ticket) => {
      const statusBadge = buildMaintenanceStatusTag(ticket);
      const rowStatusClass = ticket.status === 'open'
        ? 'maintenance-row maintenance-row--open'
        : 'maintenance-row maintenance-row--closed';

      const priorityBadge = (() => {
        const high = t('maintenance.priority.high', 'مرتفعة');
        const medium = t('maintenance.priority.medium', 'متوسطة');
        const low = t('maintenance.priority.low', 'منخفضة');
        switch (ticket.priority) {
          case 'high':
            return `<span class="maintenance-priority-badge maintenance-priority-badge--high">${high}</span>`;
          case 'low':
            return `<span class="maintenance-priority-badge maintenance-priority-badge--low">${low}</span>`;
          default:
            return `<span class="maintenance-priority-badge maintenance-priority-badge--medium">${medium}</span>`;
        }
      })();

      const actionButtons = [];
      const closeLabel = t('maintenance.actions.close', '🔧 إغلاق بعد الإصلاح');
      const viewLabel = t('maintenance.actions.view', '👁️ عرض التقرير');
      const deleteLabel = t('maintenance.actions.delete', '🗑️ حذف التذكرة');
      if (ticket.status === 'open') {
        actionButtons.push(`<button type="button" class="maintenance-action-btn" data-action="close" data-id="${ticket.id}">${closeLabel}</button>`);
      } else {
        actionButtons.push(`<button type="button" class="maintenance-action-btn" data-action="view" data-id="${ticket.id}">${viewLabel}</button>`);
      }
      if (userCanManageDestructiveActions()) {
        actionButtons.push(`<button type="button" class="maintenance-action-btn maintenance-action-btn--delete" data-action="delete" data-id="${ticket.id}">${deleteLabel}</button>`);
      }

      const actions = actionButtons.join('');
      const noBarcode = t('maintenance.table.noBarcode', 'بدون باركود');
      const issuePlaceholder = t('maintenance.report.none', '—');
      const barcodeDisplay = ticket.equipmentBarcode ? normalizeNumbers(ticket.equipmentBarcode) : noBarcode;
      const issueDisplay = ticket.issue ? normalizeNumbers(ticket.issue) : issuePlaceholder;
      const repairCostValueRaw = ticket.repairCost != null ? Number.parseFloat(normalizeNumbers(String(ticket.repairCost))) : null;
      const repairCostLine = ticket.status === 'closed' && Number.isFinite(repairCostValueRaw)
        ? `<div class="maintenance-repair-cost">${escapeHtml(t('maintenance.table.repairCost', '💰 تكلفة الإصلاح: {amount}').replace('{amount}', normalizeNumbers(repairCostValueRaw.toFixed(2))))}</div>`
        : '';
      const createdDisplay = ticket.createdAt
        ? normalizeNumbers(formatDateDDMMYY(ticket.createdAt) || formatDateTime(ticket.createdAt))
        : t('common.placeholder.empty', '—');

      return `
        <tr class="${rowStatusClass}">
          <td>
            <strong>${ticket.equipmentDesc}</strong><br>
            <small class="text-muted">${barcodeDisplay}</small>
          </td>
          <td class="maintenance-issue-text">${issueDisplay}${repairCostLine}</td>
          <td>${priorityBadge}</td>
          <td>${createdDisplay}</td>
          <td>${statusBadge}</td>
          <td class="table-actions-cell">
            <div class="table-action-buttons">
              ${actions}
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

function handleTableActions(event) {
  if (!maintenanceHasLoaded || maintenanceLoading) {
    showToast(t('maintenance.toast.loading', '⏳ يتم تحديث بيانات الصيانة، يرجى الانتظار لحظة...'));
    return;
  }

  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const action = button.getAttribute('data-action');
  const id = Number(button.getAttribute('data-id'));
  if (!id) return;

  if (action === 'close') {
    openCloseTicketModal(id);
  } else if (action === 'view') {
    viewTicketReport(id);
  } else if (action === 'delete') {
    if (!userCanManageDestructiveActions()) {
      notifyPermissionDenied();
      return;
    }
    deleteTicket(id).catch((error) => {
      console.error('❌ [maintenance] deleteTicket failed', error);
    });
  }
}

async function performTicketClosure(id, report, options = {}) {
  const ticket = getTicketById(id);
  if (!ticket) {
    showToast(t('maintenance.toast.ticketNotFound', '⚠️ تعذر العثور على تذكرة الصيانة'));
    return { success: false };
  }

  const trimmedReport = (report ?? '').trim();
  if (!trimmedReport) {
    showToast(t('maintenance.toast.reportRequired', '⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق'), 'error');
    return { success: false };
  }

  const resolvedAt = options?.mode === 'edit' && options?.resolvedAt
    ? options.resolvedAt
    : (toSqlDatetime(new Date()) || new Date().toISOString());

  const payload = {
    equipment_id: ticket.equipmentId,
    technician_id: ticket.technicianId ?? null,
    priority: ticket.priority ?? 'medium',
    status: 'completed',
    notes: ticket.issue ?? '',
    reported_at: ticket.reportedAt ?? null,
    scheduled_at: ticket.scheduledAt ?? null,
    resolution_report: trimmedReport,
    resolved_at: resolvedAt,
  };

  if (options?.repairCostProvided) {
    payload.repair_cost = options.repairCost != null
      ? Math.round(options.repairCost * 100) / 100
      : null;
  }

  try {
    await updateMaintenanceRequest(id, payload);
    await loadMaintenanceFromApi({ showToastOnError: false });
    const statusFilterEl = document.getElementById('maintenance-status-filter');
    if (statusFilterEl && statusFilterEl.value === 'open') {
      statusFilterEl.value = 'all';
    }
    await refreshEquipmentData();
    renderMaintenance();
    showToast(t('maintenance.toast.ticketClosed', '✅ تم إغلاق تذكرة الصيانة وإعادة المعدة إلى الحالة المتاحة'));
    return { success: true };
  } catch (error) {
    console.error('❌ [maintenance] closeTicket failed', error);
    if (isMaintenanceApiError(error) && error.status === 404) {
      await loadMaintenanceFromApi({ showToastOnError: false });
      await refreshEquipmentData();
      renderMaintenance();
      showToast(t('maintenance.toast.ticketAlreadyClosed', '✅ تم تحديث التذاكر، ويبدو أن هذه التذكرة مغلقة مسبقاً'), 'info');
      return { success: true };
    }
    const message = isMaintenanceApiError(error)
      ? error.message
      : t('maintenance.toast.updateError', '⚠️ تعذر إغلاق تذكرة الصيانة. حاول مرة أخرى');
    showToast(message, 'error');
    return { success: false, error };
  }
}

function viewTicketReport(id) {
  const tickets = loadTickets();
  const ticket = tickets.find((t) => Number(t.id) === Number(id));
  if (!ticket) return;

  reportModalLastTicketId = ticket.id;

  if (!ensureReportModalElements()) {
    const equipmentLabelFallback = t('maintenance.report.equipment', 'المعدة');
    const barcodeLabelFallback = t('maintenance.report.barcode', 'الباركود');
    const issueLabelFallback = t('maintenance.report.issue', 'الوصف');
    const createdLabelFallback = t('maintenance.report.createdAt', 'تاريخ الإنشاء');
    const closedLabelFallback = t('maintenance.report.closedAt', 'تاريخ الإغلاق');
    const summaryLabelFallback = t('maintenance.report.summary', 'التقرير');
    const repairCostLabelFallback = t('maintenance.report.repairCost', 'تكلفة الإصلاح');
    const currencyFallback = t('maintenance.report.currencyLabel', 'ريال');
    const repairCostNumberFallback = Number.parseFloat(normalizeNumbers(String(ticket.repairCost ?? '')));
    const repairCostDisplayFallback = Number.isFinite(repairCostNumberFallback)
      ? `${normalizeNumbers(repairCostNumberFallback.toFixed(2))} ${currencyFallback}`
      : noneFallback;
    const notAvailableFallback = t('maintenance.report.notAvailable', 'غير متوفر');
    const noneFallback = t('maintenance.report.none', '—');

    const fallbackDetails = [
      `${equipmentLabelFallback}: ${ticket.equipmentDesc}`,
      `${barcodeLabelFallback}: ${ticket.equipmentBarcode ? normalizeNumbers(ticket.equipmentBarcode) : notAvailableFallback}`,
      `${issueLabelFallback}: ${ticket.issue ? normalizeNumbers(ticket.issue) : noneFallback}`,
      `${createdLabelFallback}: ${ticket.createdAt ? normalizeNumbers(formatDateDDMMYY(ticket.createdAt) || formatDateTime(ticket.createdAt)) : noneFallback}`,
      `${closedLabelFallback}: ${ticket.resolvedAt ? normalizeNumbers(formatDateTime(ticket.resolvedAt)) : noneFallback}`,
      `${repairCostLabelFallback}: ${repairCostDisplayFallback}`,
      `${summaryLabelFallback}: ${ticket.resolutionReport ? normalizeNumbers(ticket.resolutionReport) : noneFallback}`
    ].join('\n');

    alert(fallbackDetails);
    return;
  }

  const equipmentLabel = t('maintenance.report.equipment', 'المعدة');
  const barcodeLabel = t('maintenance.report.barcode', 'الباركود');
  const issueLabel = t('maintenance.report.issue', 'الوصف');
  const createdLabel = t('maintenance.report.createdAt', 'تاريخ الإنشاء');
  const closedLabel = t('maintenance.report.closedAt', 'تاريخ الإغلاق');
  const repairCostLabel = t('maintenance.report.repairCost', 'تكلفة الإصلاح');
  const summaryLabel = t('maintenance.report.summary', 'التقرير');
  const notAvailable = t('maintenance.report.notAvailable', 'غير متوفر');
  const none = t('maintenance.report.none', '—');

  const formatValue = (value, fallback = none) => {
    if (!value) {
      return `<span class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(fallback)}</span>`;
    }
    return `<span class="maintenance-report-modal__value">${escapeHtml(normalizeNumbers(String(value)))}</span>`;
  };

  const repairCostNumber = Number.parseFloat(normalizeNumbers(String(ticket.repairCost ?? '')));
  const repairCostDisplay = Number.isFinite(repairCostNumber)
    ? normalizeNumbers(repairCostNumber.toFixed(2))
    : null;

  const currencyLabel = t('maintenance.report.currencyLabel', 'ريال');

  const formattedFields = [
    {
      label: equipmentLabel,
      value: `<span class="maintenance-report-modal__value">${escapeHtml(ticket.equipmentDesc || none)}</span>`
    },
    {
      label: barcodeLabel,
      value: ticket.equipmentBarcode
        ? `<span class="maintenance-report-modal__value">${escapeHtml(normalizeNumbers(ticket.equipmentBarcode))}</span>`
        : `<span class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(notAvailable)}</span>`
    },
    {
      label: issueLabel,
      value: ticket.issue
        ? `<span class="maintenance-report-modal__value">${escapeHtml(normalizeNumbers(ticket.issue))}</span>`
        : `<span class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(none)}</span>`
    },
    {
      label: createdLabel,
      value: ticket.createdAt
        ? `<span class="maintenance-report-modal__value">${escapeHtml(normalizeNumbers(formatDateDDMMYY(ticket.createdAt) || formatDateTime(ticket.createdAt)))}</span>`
        : `<span class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(none)}</span>`
    },
    {
      label: closedLabel,
      value: ticket.resolvedAt
        ? `<span class="maintenance-report-modal__value">${escapeHtml(normalizeNumbers(formatDateTime(ticket.resolvedAt)))}</span>`
        : `<span class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(none)}</span>`
    },
    {
      label: repairCostLabel,
      value: repairCostDisplay
        ? `<span class="maintenance-report-modal__value">${escapeHtml(repairCostDisplay)} ${escapeHtml(currencyLabel)}</span>`
        : `<span class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(none)}</span>`
    }
  ];

  const summaryText = ticket.resolutionReport ? normalizeNumbers(ticket.resolutionReport) : '';
  const summaryHtml = summaryText
    ? `<p>${escapeHtml(summaryText).replace(/\r?\n/g, '<br>')}</p>`
    : `<p class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(none)}</p>`;

  const itemsHtml = formattedFields
    .map((item) => `
      <div class="maintenance-report-modal__item">
        <span class="maintenance-report-modal__label">${escapeHtml(item.label)}</span>
        ${item.value}
      </div>
    `)
    .join('');

  const summarySection = `
    <div class="maintenance-report-modal__summary">
      <h6>${escapeHtml(summaryLabel)}</h6>
      ${summaryHtml}
    </div>
  `;

  if (reportModalContent) {
    reportModalContent.innerHTML = `
      <div class="maintenance-report-modal__details">
        <div class="maintenance-report-modal__grid">
          ${itemsHtml}
        </div>
        ${summarySection}
      </div>
    `;
  }

  if (reportModalEditButton) {
    const canEdit = userCanManageDestructiveActions() && ticket.status === 'closed';
    reportModalEditButton.hidden = !canEdit;
    reportModalEditButton.disabled = !canEdit;
    reportModalEditButton.textContent = t('maintenance.actions.editClosed', '✏️ تعديل بيانات الإغلاق');
    if (canEdit) {
      reportModalEditButton.dataset.id = String(ticket.id);
    } else {
      delete reportModalEditButton.dataset.id;
    }
  }

  reportModal?.show();
}

function handleReportModalEditButtonClick() {
  if (!reportModalEditButton) return;
  const id = Number(reportModalEditButton.dataset.id);
  if (!id) {
    reportModal?.hide();
    return;
  }
  if (!userCanManageDestructiveActions()) {
    reportModal?.hide();
    notifyPermissionDenied();
    return;
  }
  reportModal?.hide();
  setTimeout(() => {
    openCloseTicketModal(id, { mode: 'edit' });
  }, 220);
}

async function deleteTicket(id) {
  if (!userCanManageDestructiveActions()) {
    notifyPermissionDenied();
    return;
  }
  const tickets = loadTickets();
  const ticket = tickets.find((item) => Number(item.id) === Number(id));
  if (!ticket) {
    showToast(t('maintenance.toast.ticketNotFound', '⚠️ تعذر العثور على تذكرة الصيانة'));
    return;
  }

  if (!confirm(t('maintenance.toast.ticketDeleteConfirm', '⚠️ هل أنت متأكد من حذف تذكرة الصيانة؟'))) return;

  try {
    await deleteMaintenanceRequest(id);
    await loadMaintenanceFromApi({ showToastOnError: false });
    await refreshEquipmentData();
    showToast(t('maintenance.toast.ticketDeleted', '🗑️ تم حذف تذكرة الصيانة'));
  } catch (error) {
    console.error('❌ [maintenance] deleteTicket failed', error);
    const message = isMaintenanceApiError(error)
      ? error.message
      : t('maintenance.toast.deleteError', '⚠️ تعذر حذف تذكرة الصيانة. حاول مرة أخرى');
    showToast(message, 'error');
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  try {
    const barcodeInput = document.getElementById('maintenance-equipment-barcode');
    const searchInput = document.getElementById('maintenance-equipment-search');
    const hidden = document.getElementById('maintenance-selected-barcode');
    const issueInput = document.getElementById('maintenance-issue');
    const prioritySelect = document.getElementById('maintenance-priority');

    let selectedOption = currentSelection;
    let equipmentCode = normalizeBarcodeValue(hidden?.value);

    if (!selectedOption && equipmentCode) {
      selectedOption = findEquipmentOptionByBarcode(equipmentCode);
    }

    if (!selectedOption && barcodeInput?.value) {
      if (selectEquipmentByBarcode(barcodeInput.value, { showFeedback: true })) {
        selectedOption = currentSelection;
        equipmentCode = normalizeBarcodeValue(selectedOption?.barcode);
      }
    }

    if (!selectedOption && searchInput?.value) {
      if (selectEquipmentByDescription(searchInput.value, { showFeedback: true })) {
        selectedOption = currentSelection;
        equipmentCode = normalizeBarcodeValue(selectedOption?.barcode);
      }
    }

    if (!selectedOption || !equipmentCode) {
      showToast(t('maintenance.toast.selectEquipment', '⚠️ يرجى اختيار المعدة'));
      return;
    }

    const { equipment = [] } = loadData();
    let equipmentItem = (equipment || []).find((item) => normalizeBarcodeValue(item?.barcode) === equipmentCode);

    if (!equipmentItem && selectedOption) {
      equipmentItem = {
        id: selectedOption.id,
        barcode: selectedOption.barcode,
        desc: selectedOption.desc,
        name: selectedOption.desc,
        status: selectedOption.status || 'متاح',
        quantity: selectedOption.quantity,
        qty: selectedOption.quantity,
      };
    }

    if (!equipmentItem || equipmentItem.id == null) {
      showToast(t('maintenance.toast.selectedNotFound', '❌ لم يتم العثور على المعدة المختارة'));
      clearSelectedEquipment();
      return;
    }

    const totalQuantityRaw = Number.parseInt(equipmentItem.qty ?? equipmentItem.quantity ?? selectedOption?.quantity ?? 1, 10);
    const totalQuantity = Number.isFinite(totalQuantityRaw) && totalQuantityRaw > 0 ? totalQuantityRaw : 1;
    const openCount = getOpenTicketCount(equipmentCode);
    const normalizedStatus = normalizeEquipmentStatus(equipmentItem.status || selectedOption?.status);
    if (normalizedStatus === 'maintenance' && totalQuantity <= 1) {
      showToast(t('maintenance.toast.equipmentAlreadyMaintenance', '⚠️ هذه المعدة بالفعل في حالة صيانة'));
      return;
    }
    if (openCount >= totalQuantity) {
      showToast(t('maintenance.toast.noUnitsAvailable', '⚠️ لا توجد وحدات متاحة للصيانة لهذه المعدة حالياً'));
      return;
    }

    const payload = buildMaintenancePayload({
      equipmentId: equipmentItem.id,
      technicianId: null,
      issue: issueInput?.value.trim() || '',
      priority: prioritySelect?.value || 'medium',
      status: 'open',
      scheduledAt: null,
      resolutionReport: null,
    });

    await createMaintenanceRequest(payload);
    await loadMaintenanceFromApi({ showToastOnError: false });
    await refreshEquipmentData();
    showToast(t('maintenance.toast.ticketCreated', '🛠️ تم إنشاء تذكرة الصيانة وإيقاف المعدة'));

    clearSelectedEquipment();
    if (issueInput) issueInput.value = '';
    if (prioritySelect) prioritySelect.value = 'medium';

    const statusFilterEl = document.getElementById('maintenance-status-filter');
    if (statusFilterEl) statusFilterEl.value = 'all';
  } catch (error) {
    console.error('❌ [maintenance] Failed to create ticket', error);
    const message = isMaintenanceApiError(error)
      ? error.message
      : t('maintenance.toast.submitError', '⚠️ تعذر إنشاء تذكرة الصيانة. يرجى المحاولة مجدداً.');
    showToast(message, 'error');
  }
}

function filterTickets({ status = 'all', query = '', priority = 'all' } = {}) {
  const tickets = loadTickets();
  let result = tickets;

  if (status !== 'all') {
    result = result.filter((ticket) => ticket.status === status);
  }

  if (priority !== 'all') {
    result = result.filter((ticket) => String(ticket.priority || 'medium') === priority);
  }

  const q = normalizeSearchValue(query || '');
  if (q) {
    result = result.filter((ticket) => {
      const name = normalizeText(ticket.equipmentDesc || '');
      const barcode = normalizeSearchValue(ticket.equipmentBarcode || '');
      return name.includes(q) || barcode.includes(q);
    });
  }

  return result;
}

export function renderMaintenance() {
  const allTickets = loadTickets();
  populateEquipmentInputs();

  renderStats(allTickets);

  const statusFilter = document.getElementById('maintenance-status-filter');
  if (statusFilter && !statusFilter.value) {
    statusFilter.value = 'all';
  }
  const status = statusFilter?.value || 'all';
  const searchEl = document.getElementById('maintenance-search');
  const query = searchEl?.value || '';
  const priorityEl = document.getElementById('maintenance-priority-filter');
  const priority = priorityEl?.value || 'all';

  const tbody = document.getElementById('maintenance-table-body');
  const emptyState = document.getElementById('maintenance-empty-state');
  if (!tbody) return;

  if (maintenanceLoading && !maintenanceHasLoaded) {
    const loadingMessage = t('maintenance.table.loading', 'جاري التحميل...');
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">${loadingMessage}</td></tr>`;
    if (emptyState) emptyState.classList.remove('active');
    return;
  }

  if (maintenanceErrorMessage && !maintenanceHasLoaded) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">${maintenanceErrorMessage}</td></tr>`;
    if (emptyState) emptyState.classList.remove('active');
    return;
  }

  const tickets = filterTickets({ status, query, priority });
  renderTable(tickets);
}

export function initMaintenance() {
  loadTickets();
  populateEquipmentInputs();
  maintenanceHasLoaded = maintenanceTickets.length > 0;
  maintenanceLoading = false;
  renderMaintenance();
  loadMaintenanceFromApi({ showToastOnError: false });

  if (ensureCloseTicketModalElements()) {
    resetCloseTicketModal();
  }

  if (ensureReportModalElements()) {
    resetReportModalContent();
  }

  maintenanceInitialized = true;

  const form = document.getElementById('maintenance-form');
  if (form && !form.dataset.listenerAttached) {
    form.addEventListener('submit', (event) => {
      handleFormSubmit(event).catch((error) => {
        console.error('❌ [maintenance] submit handler failed', error);
      });
    });
    form.dataset.listenerAttached = 'true';
  }

  const statusFilter = document.getElementById('maintenance-status-filter');
  if (statusFilter && !statusFilter.dataset.listenerAttached) {
    statusFilter.addEventListener('change', () => {
      renderMaintenance();
    });
    statusFilter.dataset.listenerAttached = 'true';
  }

  const priorityFilter = document.getElementById('maintenance-priority-filter');
  if (priorityFilter && !priorityFilter.dataset.listenerAttached) {
    priorityFilter.addEventListener('change', () => {
      renderMaintenance();
    });
    priorityFilter.dataset.listenerAttached = 'true';
  }

  const searchInput = document.getElementById('maintenance-search');
  if (searchInput && !searchInput.dataset.listenerAttached) {
    const onInput = () => renderMaintenance();
    searchInput.addEventListener('input', onInput);
    searchInput.addEventListener('change', onInput);
    searchInput.dataset.listenerAttached = 'true';
  }

  const table = document.querySelector('.maintenance-table');
  if (table && !table.dataset.listenerAttached) {
    table.addEventListener('click', handleTableActions);
    table.dataset.listenerAttached = 'true';
  }
}

loadTickets();

document.addEventListener('language:changed', () => {
  const hidden = document.getElementById('maintenance-selected-barcode');
  const info = document.getElementById('maintenance-selected-info');
  if (hidden?.value) {
    const option = findEquipmentOptionByBarcode(hidden.value);
    if (option) {
      updateSelectedInfo(option);
    } else if (info) {
      info.textContent = getDefaultSelectionText();
    }
  } else if (info) {
    info.textContent = getDefaultSelectionText();
  }
  renderMaintenance();
  setCloseModalLoading(false);
});

document.addEventListener(AUTH_EVENTS.USER_UPDATED, () => {
  renderMaintenance();
});

window.addEventListener('maintenance:updated', () => {
  maintenanceTickets = getMaintenanceState();
  renderMaintenance();
});
