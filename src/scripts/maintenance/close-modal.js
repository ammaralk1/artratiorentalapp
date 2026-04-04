import { showToast } from '../utils.js';
import { t } from '../language.js';
import { updateMaintenanceRequest, isApiError as isMaintenanceApiError } from '../maintenanceService.js';
import { state, getTicketById } from './state.js';
import {
  normalizeRepairCostInput,
  resolveRepairCostFromInput,
  toSqlDatetime,
  escapeHtml,
} from './utils.js';
import { loadMaintenanceFromApi } from './api.js';
import { refreshEquipmentData } from './equipment-selector.js';
import { renderMaintenance } from './render.js';
import { normalizeNumbers } from '../utils.js';

export function setCloseModalLoading(isLoading) {
  if (!state.closeTicketSubmitButton) return;
  const isEditMode = state.closeTicket.mode === 'edit';
  const savingLabel = isEditMode
    ? t('maintenance.closeModal.editSaving', '⏳ جاري الحفظ...')
    : t('maintenance.closeModal.saving', '⏳ جاري الإغلاق...');
  const confirmLabel = isEditMode
    ? t('maintenance.closeModal.editConfirm', 'حفظ التعديلات')
    : t('maintenance.closeModal.confirm', 'إغلاق التذكرة');

  if (isLoading) {
    state.closeTicketSubmitButton.disabled = true;
    state.closeTicketSubmitButton.dataset.loading = 'true';
    state.closeTicketSubmitButton.textContent = savingLabel;
  } else {
    state.closeTicketSubmitButton.disabled = false;
    state.closeTicketSubmitButton.removeAttribute('data-loading');
    state.closeTicketSubmitButton.textContent = confirmLabel;
  }
}

export function resetCloseTicketModal() {
  state.closeTicket = {
    id: null,
    equipmentDesc: '',
    equipmentBarcode: '',
    repairCost: null,
    resolvedAt: null,
    mode: 'close',
  };

  if (state.closeTicketReportInput) {
    state.closeTicketReportInput.value = '';
    state.closeTicketReportInput.classList.remove('is-invalid');
  }

  if (state.closeTicketCostInput) {
    state.closeTicketCostInput.value = '';
    state.closeTicketCostInput.classList.remove('is-invalid');
  }

  if (state.closeTicketDetailsContainer) {
    state.closeTicketDetailsContainer.innerHTML = '';
  }

  setCloseModalLoading(false);

  const modalEl = document.getElementById('closeMaintenanceModal');
  if (modalEl) {
    const titleEl = modalEl.querySelector('#maintenance-close-modal-title');
    const subtitleEl = modalEl.querySelector('.maintenance-close-modal__subtitle');
    if (titleEl) titleEl.textContent = t('maintenance.closeModal.title', '🔧 إغلاق تذكرة الصيانة');
    if (subtitleEl) subtitleEl.textContent = t('maintenance.closeModal.subtitle', 'يرجى كتابة تقرير الإصلاح قبل إغلاق هذه التذكرة.');
    if (state.closeTicketSubmitButton) {
      state.closeTicketSubmitButton.textContent = t('maintenance.closeModal.confirm', 'إغلاق التذكرة');
    }
  }
}

export function ensureCloseTicketModalElements() {
  const modalEl = document.getElementById('closeMaintenanceModal');
  if (!modalEl) return false;

  const bootstrapLib = (typeof window !== 'undefined' ? window.bootstrap : undefined) ?? globalThis?.bootstrap;
  if (!bootstrapLib?.Modal) return false;

  state.closeTicketModal = bootstrapLib.Modal.getOrCreateInstance(modalEl);

  if (!state.closeTicketReportInput) {
    state.closeTicketReportInput = modalEl.querySelector('#maintenance-close-report');
  }
  if (!state.closeTicketCostInput) {
    state.closeTicketCostInput = modalEl.querySelector('#maintenance-close-cost');
  }
  if (state.closeTicketCostInput && state.closeTicketCostInput.dataset.normalizeAttached !== 'true') {
    state.closeTicketCostInput.addEventListener('input', (event) => {
      normalizeRepairCostInput(event.currentTarget);
      event.currentTarget?.classList.remove('is-invalid');
    });
    state.closeTicketCostInput.dataset.normalizeAttached = 'true';
  }
  if (!state.closeTicketSubmitButton) {
    state.closeTicketSubmitButton = modalEl.querySelector('#maintenance-close-submit');
  }
  if (!state.closeTicketDetailsContainer) {
    state.closeTicketDetailsContainer = modalEl.querySelector('#maintenance-close-modal-details');
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

export async function handleCloseTicketFormSubmit(event) {
  event?.preventDefault();

  if (!state.closeTicket.id) {
    showToast(t('maintenance.toast.ticketNotFound', '⚠️ تعذر العثور على تذكرة الصيانة'));
    return;
  }

  if (!state.closeTicketReportInput) return;

  const report = state.closeTicketReportInput.value.trim();
  if (!report) {
    showToast(t('maintenance.toast.reportRequired', '⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق'), 'error');
    state.closeTicketReportInput.focus();
    return;
  }

  if (state.closeTicketCostInput) {
    state.closeTicketCostInput.classList.remove('is-invalid');
  }

  const costResolution = state.closeTicketCostInput
    ? resolveRepairCostFromInput(state.closeTicketCostInput.value, state.closeTicket.repairCost)
    : { provided: false, value: null, error: null };

  if (costResolution.error) {
    showToast(t('maintenance.toast.invalidRepairCost', '⚠️ يرجى إدخال قيمة رقمية صحيحة لتكلفة الإصلاح'), 'error');
    state.closeTicketCostInput?.classList.add('is-invalid');
    state.closeTicketCostInput?.focus();
    return;
  }

  setCloseModalLoading(true);

  const result = await performTicketClosure(state.closeTicket.id, report, {
    repairCost: costResolution.value,
    repairCostProvided: costResolution.provided,
    mode: state.closeTicket.mode,
    resolvedAt: state.closeTicket.resolvedAt,
  });
  if (result.success) {
    state.closeTicketModal?.hide();
  } else {
    setCloseModalLoading(false);
  }
}

export function openCloseTicketModal(id, { mode = 'close' } = {}) {
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

  state.closeTicket = {
    id: ticket.id,
    equipmentDesc: ticket.equipmentDesc || '',
    equipmentBarcode: ticket.equipmentBarcode || '',
    repairCost: normalizedRepairCost,
    resolvedAt: ticket.resolvedAt || null,
    mode: normalizedMode,
  };

  if (state.closeTicketReportInput) {
    state.closeTicketReportInput.value = ticket.resolutionReport || '';
    state.closeTicketReportInput.classList.remove('is-invalid');
  }

  if (state.closeTicketCostInput) {
    if (normalizedRepairCost !== null) {
      state.closeTicketCostInput.value = normalizeNumbers(normalizedRepairCost.toFixed(2));
    } else {
      state.closeTicketCostInput.value = '';
    }
    state.closeTicketCostInput.classList.remove('is-invalid');
  }

  if (state.closeTicketDetailsContainer) {
    const barcodeLabel = t('maintenance.report.barcode', 'الباركود');
    const notAvailable = t('maintenance.report.notAvailable', 'غير متوفر');
    const equipmentText = state.closeTicket.equipmentDesc || notAvailable;
    const barcodeText = state.closeTicket.equipmentBarcode
      ? normalizeNumbers(state.closeTicket.equipmentBarcode)
      : notAvailable;
    state.closeTicketDetailsContainer.innerHTML = `
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
  if (state.closeTicketSubmitButton) {
    state.closeTicketSubmitButton.textContent = isEditMode
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

  state.closeTicketModal?.show();

  setTimeout(() => {
    state.closeTicketReportInput?.focus();
    state.closeTicketReportInput?.setSelectionRange(
      state.closeTicketReportInput.value.length,
      state.closeTicketReportInput.value.length,
    );
  }, 150);
}
