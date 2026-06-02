import { normalizeNumbers, formatDateTime } from '../utils.js';
import { t } from '../language.js';
import { userCanManageDestructiveActions, notifyPermissionDenied } from '../auth.js';
import { state, loadTickets } from './state.js';
import { formatDateDDMMYY, escapeHtml } from './utils.js';
import { openCloseTicketModal } from './close-modal.js';

export function resetReportModalContent() {
  if (state.reportModalContent) {
    state.reportModalContent.innerHTML = '';
  }
  if (state.reportModalEditButton) {
    state.reportModalEditButton.hidden = true;
    state.reportModalEditButton.disabled = false;
    delete state.reportModalEditButton.dataset.id;
  }
  state.reportModalLastTicketId = null;
}

export function ensureReportModalElements() {
  const modalEl = document.getElementById('maintenanceReportModal');
  if (!modalEl) return false;

  const bootstrapLib = (typeof window !== 'undefined' ? window.bootstrap : undefined) ?? globalThis?.bootstrap;
  if (!bootstrapLib?.Modal) return false;

  state.reportModal = bootstrapLib.Modal.getOrCreateInstance(modalEl);
  if (!state.reportModalContent) {
    state.reportModalContent = modalEl.querySelector('#maintenance-report-modal-content');
  }
  if (!state.reportModalEditButton) {
    state.reportModalEditButton = modalEl.querySelector('#maintenance-report-edit');
  }

  if (!modalEl.dataset.listenerAttached) {
    modalEl.addEventListener('show.bs.modal', () => {
      document.body.classList.add('maintenance-modal-open');
    });
    modalEl.addEventListener('hidden.bs.modal', resetReportModalContent);
    modalEl.addEventListener('hidden.bs.modal', () => {
      const closeModal = document.getElementById('closeMaintenanceModal');
      const isCloseOpen = closeModal?.classList.contains('show');
      if (!isCloseOpen) {
        document.body.classList.remove('maintenance-modal-open');
      }
    });
    modalEl.dataset.listenerAttached = 'true';
  }

  if (state.reportModalEditButton && state.reportModalEditButton.dataset.listenerAttached !== 'true') {
    state.reportModalEditButton.addEventListener('click', handleReportModalEditButtonClick);
    state.reportModalEditButton.dataset.listenerAttached = 'true';
  }

  return true;
}

function handleReportModalEditButtonClick() {
  if (!state.reportModalEditButton) return;
  const id = Number(state.reportModalEditButton.dataset.id);
  if (!id) {
    state.reportModal?.hide();
    return;
  }
  if (!userCanManageDestructiveActions()) {
    state.reportModal?.hide();
    notifyPermissionDenied();
    return;
  }
  state.reportModal?.hide();
  setTimeout(() => {
    openCloseTicketModal(id, { mode: 'edit' });
  }, 220);
}

export function viewTicketReport(id) {
  const tickets = loadTickets();
  const ticket = tickets.find((t) => Number(t.id) === Number(id));
  if (!ticket) return;

  state.reportModalLastTicketId = ticket.id;

  if (!ensureReportModalElements()) {
    const none = t('maintenance.report.none', '—');
    const notAvailable = t('maintenance.report.notAvailable', 'غير متوفر');
    const repairCostNumberFallback = Number.parseFloat(normalizeNumbers(String(ticket.repairCost ?? '')));
    const currencyFallback = t('maintenance.report.currencyLabel', 'ريال');
    const repairCostDisplayFallback = Number.isFinite(repairCostNumberFallback)
      ? `${normalizeNumbers(repairCostNumberFallback.toFixed(2))} ${currencyFallback}`
      : none;

    const fallbackDetails = [
      `${t('maintenance.report.equipment', 'المعدة')}: ${ticket.equipmentDesc}`,
      `${t('maintenance.report.barcode', 'الباركود')}: ${ticket.equipmentBarcode ? normalizeNumbers(ticket.equipmentBarcode) : notAvailable}`,
      `${t('maintenance.report.issue', 'الوصف')}: ${ticket.issue ? normalizeNumbers(ticket.issue) : none}`,
      `${t('maintenance.report.createdAt', 'تاريخ الإنشاء')}: ${ticket.createdAt ? normalizeNumbers(formatDateDDMMYY(ticket.createdAt) || formatDateTime(ticket.createdAt)) : none}`,
      `${t('maintenance.report.closedAt', 'تاريخ الإغلاق')}: ${ticket.resolvedAt ? normalizeNumbers(formatDateTime(ticket.resolvedAt)) : none}`,
      `${t('maintenance.report.repairCost', 'تكلفة الإصلاح')}: ${repairCostDisplayFallback}`,
      `${t('maintenance.report.summary', 'التقرير')}: ${ticket.resolutionReport ? normalizeNumbers(ticket.resolutionReport) : none}`,
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
  const currencyLabel = t('maintenance.report.currencyLabel', 'ريال');

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

  const formattedFields = [
    {
      label: equipmentLabel,
      value: `<span class="maintenance-report-modal__value">${escapeHtml(ticket.equipmentDesc || none)}</span>`,
    },
    {
      label: barcodeLabel,
      value: ticket.equipmentBarcode
        ? `<span class="maintenance-report-modal__value">${escapeHtml(normalizeNumbers(ticket.equipmentBarcode))}</span>`
        : `<span class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(notAvailable)}</span>`,
    },
    {
      label: issueLabel,
      value: ticket.issue
        ? `<span class="maintenance-report-modal__value">${escapeHtml(normalizeNumbers(ticket.issue))}</span>`
        : `<span class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(none)}</span>`,
    },
    {
      label: createdLabel,
      value: ticket.createdAt
        ? `<span class="maintenance-report-modal__value">${escapeHtml(normalizeNumbers(formatDateDDMMYY(ticket.createdAt) || formatDateTime(ticket.createdAt)))}</span>`
        : `<span class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(none)}</span>`,
    },
    {
      label: closedLabel,
      value: ticket.resolvedAt
        ? `<span class="maintenance-report-modal__value">${escapeHtml(normalizeNumbers(formatDateTime(ticket.resolvedAt)))}</span>`
        : `<span class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(none)}</span>`,
    },
    {
      label: repairCostLabel,
      value: repairCostDisplay
        ? `<span class="maintenance-report-modal__value">${escapeHtml(repairCostDisplay)} ${escapeHtml(currencyLabel)}</span>`
        : `<span class="maintenance-report-modal__value maintenance-report-modal__value--muted">${escapeHtml(none)}</span>`,
    },
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

  if (state.reportModalContent) {
    state.reportModalContent.innerHTML = `
      <div class="maintenance-report-modal__details">
        <div class="maintenance-report-modal__grid">
          ${itemsHtml}
        </div>
        ${summarySection}
      </div>
    `;
  }

  if (state.reportModalEditButton) {
    const canEdit = userCanManageDestructiveActions() && ticket.status === 'closed';
    state.reportModalEditButton.hidden = !canEdit;
    state.reportModalEditButton.disabled = !canEdit;
    state.reportModalEditButton.textContent = t('maintenance.actions.editClosed', '✏️ تعديل بيانات الإغلاق');
    if (canEdit) {
      state.reportModalEditButton.dataset.id = String(ticket.id);
    } else {
      delete state.reportModalEditButton.dataset.id;
    }
  }

  state.reportModal?.show();
}
