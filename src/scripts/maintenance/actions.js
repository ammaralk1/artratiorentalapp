import { showToast } from '../utils.js';
import { t } from '../language.js';
import { userCanManageDestructiveActions, notifyPermissionDenied } from '../auth.js';
import { createMaintenanceRequest, deleteMaintenanceRequest, buildMaintenancePayload, isApiError as isMaintenanceApiError } from '../maintenanceService.js';
import { loadData } from '../storage.js';
import { state, loadTickets, getTicketById } from './state.js';
import { normalizeBarcodeValue, normalizeEquipmentStatus } from './utils.js';
import { loadMaintenanceFromApi } from './api.js';
import {
  getOpenTicketCount,
  findEquipmentOptionByBarcode,
  selectEquipmentByBarcode,
  selectEquipmentByDescription,
  clearSelectedEquipment,
  populateEquipmentInputs,
  refreshEquipmentData,
} from './equipment-selector.js';
import { renderMaintenance } from './render.js';
import { openCloseTicketModal, ensureCloseTicketModalElements, resetCloseTicketModal } from './close-modal.js';
import { viewTicketReport, ensureReportModalElements, resetReportModalContent } from './report-modal.js';

export function handleTableActions(event) {
  if (!state.hasLoaded || state.loading) {
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

export async function deleteTicket(id) {
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

export async function handleFormSubmit(event) {
  event.preventDefault();

  try {
    const barcodeInput = document.getElementById('maintenance-equipment-barcode');
    const searchInput = document.getElementById('maintenance-equipment-search');
    const hidden = document.getElementById('maintenance-selected-barcode');
    const issueInput = document.getElementById('maintenance-issue');
    const prioritySelect = document.getElementById('maintenance-priority');

    let selectedOption = state.currentSelection;
    let equipmentCode = normalizeBarcodeValue(hidden?.value);

    if (!selectedOption && equipmentCode) {
      selectedOption = findEquipmentOptionByBarcode(equipmentCode);
    }

    if (!selectedOption && barcodeInput?.value) {
      if (selectEquipmentByBarcode(barcodeInput.value, { showFeedback: true })) {
        selectedOption = state.currentSelection;
        equipmentCode = normalizeBarcodeValue(selectedOption?.barcode);
      }
    }

    if (!selectedOption && searchInput?.value) {
      if (selectEquipmentByDescription(searchInput.value, { showFeedback: true })) {
        selectedOption = state.currentSelection;
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

export function initMaintenance() {
  loadTickets();
  populateEquipmentInputs();
  state.hasLoaded = state.tickets.length > 0;
  state.loading = false;
  renderMaintenance();
  loadMaintenanceFromApi({ showToastOnError: false });

  if (ensureCloseTicketModalElements()) {
    resetCloseTicketModal();
  }

  if (ensureReportModalElements()) {
    resetReportModalContent();
  }

  state.initialized = true;

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
    statusFilter.addEventListener('change', () => renderMaintenance());
    statusFilter.dataset.listenerAttached = 'true';
  }

  const priorityFilter = document.getElementById('maintenance-priority-filter');
  if (priorityFilter && !priorityFilter.dataset.listenerAttached) {
    priorityFilter.addEventListener('change', () => renderMaintenance());
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
