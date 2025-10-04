import { loadData } from './storage.js';
import { showToast, formatDateTime, normalizeNumbers } from './utils.js';
import { refreshEquipmentFromApi, renderEquipment } from './equipment.js';
import { t } from './language.js';
import { userCanManageDestructiveActions, notifyPermissionDenied, AUTH_EVENTS } from './auth.js';
import {
  getMaintenanceState,
  refreshMaintenanceFromApi,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
  buildMaintenancePayload,
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
  equipmentBarcode: ''
};
let closeTicketModal = null;
let closeTicketReportInput = null;
let closeTicketSubmitButton = null;
let closeTicketDetailsContainer = null;

async function loadMaintenanceFromApi({ showToastOnError = true } = {}) {
  if (maintenanceLoading) return;

  maintenanceLoading = true;
  maintenanceErrorMessage = '';
  renderMaintenance();

  try {
    await refreshMaintenanceFromApi();
    maintenanceHasLoaded = true;
  } catch (error) {
    maintenanceHasLoaded = maintenanceTickets.length > 0;
    console.error('❌ [maintenance] Failed to load maintenance tickets', error);
    maintenanceErrorMessage = isMaintenanceApiError(error)
      ? error.message
      : t('maintenance.toast.fetchFailed', 'تعذر تحميل بيانات الصيانة. حاول تحديث الصفحة.');
    if (showToastOnError) {
      showToast(maintenanceErrorMessage, 'error');
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

function getEquipmentOptions() {
  const { equipment = [] } = loadData();
  const fallbackName = t('maintenance.table.noName', 'بدون اسم');
  equipmentOptions = (equipment || []).map((item) => ({
    barcode: normalizeBarcodeValue(item?.barcode),
    desc: item?.desc || item?.description || item?.name || fallbackName,
    status: item?.status || 'متاح',
    price: Number(item?.price) || 0,
    category: item?.category || ''
  }));

  equipmentOptions.sort((a, b) => a.desc.localeCompare(b.desc, 'ar', { sensitivity: 'base' }));
  return equipmentOptions;
}

function getOpenTicketsSet() {
  return new Set(loadTickets()
    .filter((ticket) => ticket.status === 'open')
    .map((ticket) => normalizeBarcodeValue(ticket.equipmentBarcode)));
}

function findEquipmentOptionByBarcode(barcode) {
  const normalized = normalizeBarcodeValue(barcode);
  if (!normalized) return null;
  const options = equipmentOptions.length ? equipmentOptions : getEquipmentOptions();
  return options.find((option) => option.barcode === normalized) || null;
}

function findEquipmentOptionByDescription(term) {
  const normalized = normalizeText(term);
  if (!normalized) return null;
  const options = equipmentOptions.length ? equipmentOptions : getEquipmentOptions();
  return options.find((option) => normalizeText(option.desc).includes(normalized)) || null;
}

function isOptionBlocked(option) {
  if (!option) return true;
  const openSet = getOpenTicketsSet();
  return option.status === 'صيانة' || openSet.has(option.barcode);
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
  info.innerHTML = `
    <strong>${option.desc}</strong><br>
    <span class="text-muted">${barcodeLabel}: ${option.barcode || notAvailable}</span>
  `;
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
  if (barcodeInput) barcodeInput.value = option.barcode;
  if (searchInput) searchInput.value = option.desc;
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
  const openSet = getOpenTicketsSet();

  if (datalist) {
    const blockedSuffix = t('maintenance.form.blockedSuffix', '(صيانة)');
    datalist.innerHTML = options
      .map((option) => {
        const blocked = option.status === 'صيانة' || openSet.has(option.barcode);
        const label = blocked ? `${option.desc} ${blockedSuffix}` : option.desc;
        const value = option.desc.replace(/"/g, '&quot;');
        const labelAttr = label.replace(/"/g, '&quot;');
        return `<option value="${value}" label="${labelAttr}"></option>`;
      })
      .join('');
  }

  const hidden = document.getElementById('maintenance-selected-barcode');
  if (hidden && hidden.value) {
    const current = findEquipmentOptionByBarcode(hidden.value);
    if (!current || isOptionBlocked(current)) {
      clearSelectedEquipment({ keepInputs: true, silent: true });
      if (current && isOptionBlocked(current)) {
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
    equipmentBarcode: ''
  };

  if (closeTicketReportInput) {
    closeTicketReportInput.value = '';
  }

  if (closeTicketDetailsContainer) {
    closeTicketDetailsContainer.innerHTML = '';
  }

  setCloseModalLoading(false);
}

function setCloseModalLoading(isLoading) {
  if (!closeTicketSubmitButton) return;
  const savingLabel = t('maintenance.closeModal.saving', '⏳ جاري الإغلاق...');
  const confirmLabel = t('maintenance.closeModal.confirm', '✅ إغلاق التذكرة');

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

function openCloseTicketModal(id) {
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

  closeTicketState = {
    id: ticket.id,
    equipmentDesc: ticket.equipmentDesc || '',
    equipmentBarcode: ticket.equipmentBarcode || ''
  };

  if (closeTicketReportInput) {
    closeTicketReportInput.value = ticket.resolutionReport || '';
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

  setCloseModalLoading(true);

  const result = await performTicketClosure(closeTicketState.id, report);
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
  const openHtml = t('maintenance.stats.open', '{count} قيد الصيانة').replace('{count}', `<strong>${formatCount(open)}</strong>`);
  const closedHtml = t('maintenance.stats.closed', '{count} مغلقة').replace('{count}', `<strong>${formatCount(closed)}</strong>`);
  const totalHtml = t('maintenance.stats.total', '{count} إجمالي التذاكر').replace('{count}', `<strong>${formatCount(total)}</strong>`);

  container.innerHTML = `
    <span class="maintenance-stat">${openHtml}</span>
    <span class="maintenance-stat">${closedHtml}</span>
    <span class="maintenance-stat">${totalHtml}</span>
  `;
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
      const statusOpen = t('maintenance.status.open', 'قيد الصيانة');
      const statusClosed = t('maintenance.status.closed', 'مغلقة');
      const statusBadge = ticket.status === 'open'
        ? `<span class="maintenance-status-badge maintenance-status-label maintenance-status-label--open">${statusOpen}</span>`
        : `<span class="maintenance-status-badge maintenance-status-label maintenance-status-label--closed">${statusClosed}</span>`;
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
      const createdDisplay = ticket.createdAt ? normalizeNumbers(formatDateTime(ticket.createdAt)) : '—';

      return `
        <tr class="${rowStatusClass}">
          <td>
            <strong>${ticket.equipmentDesc}</strong><br>
            <small class="text-muted">${barcodeDisplay}</small>
          </td>
          <td class="maintenance-issue-text">${issueDisplay}</td>
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

async function performTicketClosure(id, report) {
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

  const resolvedAt = toSqlDatetime(new Date()) || new Date().toISOString();

  try {
    await updateMaintenanceRequest(id, {
      equipment_id: ticket.equipmentId,
      technician_id: ticket.technicianId ?? null,
      priority: ticket.priority ?? 'medium',
      status: 'completed',
      notes: ticket.issue ?? '',
      reported_at: ticket.reportedAt ?? null,
      scheduled_at: ticket.scheduledAt ?? null,
      resolution_report: trimmedReport,
      resolved_at: resolvedAt,
    });
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

  const equipmentLabel = t('maintenance.report.equipment', 'المعدة');
  const barcodeLabel = t('maintenance.report.barcode', 'الباركود');
  const issueLabel = t('maintenance.report.issue', 'الوصف');
  const createdLabel = t('maintenance.report.createdAt', 'تاريخ الإنشاء');
  const closedLabel = t('maintenance.report.closedAt', 'تاريخ الإغلاق');
  const summaryLabel = t('maintenance.report.summary', 'التقرير');
  const notAvailable = t('maintenance.report.notAvailable', 'غير متوفر');
  const none = t('maintenance.report.none', '—');

  const details = [
    `${equipmentLabel}: ${ticket.equipmentDesc}`,
    `${barcodeLabel}: ${ticket.equipmentBarcode ? normalizeNumbers(ticket.equipmentBarcode) : notAvailable}`,
    `${issueLabel}: ${ticket.issue ? normalizeNumbers(ticket.issue) : none}`,
    `${createdLabel}: ${ticket.createdAt ? normalizeNumbers(formatDateTime(ticket.createdAt)) : none}`,
    `${closedLabel}: ${ticket.resolvedAt ? normalizeNumbers(formatDateTime(ticket.resolvedAt)) : none}`,
    `${summaryLabel}: ${ticket.resolutionReport ? normalizeNumbers(ticket.resolutionReport) : none}`
  ].join('\n');

  alert(details);
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
        status: selectedOption.status || 'متاح'
      };
    }

    if (!equipmentItem || equipmentItem.id == null) {
      showToast(t('maintenance.toast.selectedNotFound', '❌ لم يتم العثور على المعدة المختارة'));
      clearSelectedEquipment();
      return;
    }

    if (equipmentItem.status === 'صيانة') {
      showToast(t('maintenance.toast.equipmentAlreadyMaintenance', '⚠️ هذه المعدة بالفعل في حالة صيانة'));
      return;
    }

    const openTickets = loadTickets().filter((ticket) => ticket.status === 'open');
    const duplicate = openTickets.some((ticket) => normalizeBarcodeValue(ticket.equipmentBarcode) === equipmentCode);
    if (duplicate) {
      showToast(t('maintenance.toast.ticketExists', '⚠️ توجد تذكرة صيانة مفتوحة لهذه المعدة'));
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

function filterTicketsByStatus(status) {
  const tickets = loadTickets();
  if (status === 'all') return tickets;
  return tickets.filter((ticket) => ticket.status === status);
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

  const tickets = filterTicketsByStatus(status);
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
