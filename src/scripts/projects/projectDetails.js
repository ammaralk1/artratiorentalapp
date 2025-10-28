import { t } from '../language.js';
import { updatePreferences } from '../preferencesService.js';
import {
  buildProjectPayload,
  getProjectsState,
  isApiError as isProjectApiError,
  updateProjectApi
} from '../projectsService.js';
import { getReservationsState } from '../reservationsService.js';
import {
  getReservationUIHandler,
  waitForReservationUIHandler
} from '../reservations/uiBridge.js';
import {
  calculateReservationTotal,
  calculateDraftFinancialBreakdown,
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculatePaymentProgress,
  determinePaymentStatus,
} from '../reservationsSummary.js';
import { exportProjectPdf } from '../reservations/reservationPdf.js';
import { normalizeNumbers, showToast } from '../utils.js';
import { loadData } from '../storage.js';
import { state, dom } from './state.js';
import {
  PROJECT_TAX_RATE,
  statusFallbackLabels
} from './constants.js';
import {
  escapeHtml,
  formatCurrency,
  formatDateTime
} from './formatting.js';
import {
  combineProjectDateTime,
  setDateInputValue,
  setTimeInputValue,
  splitDateTimeParts
} from './helpers.js';
import {
  buildProjectReservationsSection,
  determineProjectStatus,
  getProjectExpenses,
  getReservationsForProject,
  renderFocusCards,
  renderProjects,
  resolveProjectTotals,
  updateSummary
} from './view.js';
import {
  mapProjectEquipmentToApi,
  calculateProjectFinancials,
  ensureProjectCompanyShareEnabled,
  getProjectCompanySharePercent,
} from './form.js';
import {
  handleProjectReservationSync,
  updateLinkedReservationsConfirmation,
  removeProject
} from './actions.js';

export function openProjectDetails(projectId) {
  const project = state.projects.find((p) => String(p.id) === String(projectId));
  if (!project || !dom.detailsBody) return;

  dom.detailsBody.dataset.mode = 'view';
  dom.detailsBody.dataset.projectId = String(project.id);

  const customersSource = state.customers.length
    ? state.customers
    : loadData().customers || [];
  const client = customersSource.find((c) => String(c.id) === String(project.clientId));
  const typeLabel = getProjectTypeLabel(project.type);
  const descriptionRaw = project.description?.trim();
  const descriptionDisplay = descriptionRaw || t('projects.fallback.noDescription', 'لا يوجد وصف');
  const clientName = client?.customerName || t('projects.fallback.unknownClient', 'عميل غير معروف');
  const clientPhoneRaw = client?.phone
    ?? client?.customerPhone
    ?? project.clientPhone
    ?? project.customerPhone
    ?? '';
  const clientPhone = clientPhoneRaw
    ? normalizeNumbers(String(clientPhoneRaw).trim())
    : t('projects.details.client.noPhone', 'لا يوجد رقم متاح');

  const clientEmailRaw = client?.email
    ?? project.clientEmail
    ?? project.customerEmail
    ?? '';
  const clientEmail = clientEmailRaw
    ? String(clientEmailRaw).trim()
    : t('projects.details.client.noEmail', 'لا يوجد بريد متاح');
  const projectCompany = (project.clientCompany || client?.companyName || '').trim();
  const projectCodeValue = project.projectCode || `PRJ-${normalizeNumbers(String(project.id))}`;
  const projectCodeDisplay = normalizeNumbers(projectCodeValue);

  const reservationsForProject = getReservationsForProject(project.id);
  const reservationsTotalRaw = reservationsForProject.reduce(
    (sum, reservation) => sum + resolveReservationNetTotal(reservation),
    0
  );
  const reservationsTotal = Number(reservationsTotalRaw.toFixed(2));
  const reservationsCount = reservationsForProject.length;

  const { subtotal, taxAmount, applyTax, expensesTotal } = resolveProjectTotals(project);
  const projectTotal = subtotal;
  const combinedTaxAmount = applyTax
    ? Number(((projectTotal + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((projectTotal + reservationsTotal + combinedTaxAmount).toFixed(2));

  const status = determineProjectStatus(project);
  const statusLabel = t(`projects.status.${status}`, statusFallbackLabels[status] || status);
  const statusChipClassMap = {
    upcoming: 'status-pending',
    ongoing: 'status-confirmed',
    completed: 'status-completed'
  };
  const statusChipClass = statusChipClassMap[status] || 'status-confirmed';
  const vatChipText = applyTax
    ? t('projects.details.chips.vatOn', 'شامل الضريبة 15٪')
    : t('projects.details.chips.vatOff', 'غير شامل الضريبة');
  const vatChipClass = applyTax ? 'status-paid' : 'status-unpaid';
  const reservationsChipText = t('projects.details.chips.reservations', '{count} حجوزات')
    .replace('{count}', normalizeNumbers(String(reservationsCount)));
  const paymentStatusRaw = typeof project.paymentStatus === 'string' ? project.paymentStatus.toLowerCase() : '';
  const paymentHistory = normalizeProjectPaymentHistoryForView(project);
  const hasPaymentHistory = paymentHistory.length > 0;
  const basePaidAmount = hasPaymentHistory ? 0 : Number(project.paidAmount) || 0;
  const basePaidPercent = hasPaymentHistory ? 0 : Number(project.paidPercent) || 0;
  // defer computing paymentProgress until after we compute finalTotal below
  let paymentTotalForProgress = overallTotal;
  let paymentProgress;
  let paymentStatusValue;
  let paymentStatusText;
  let paymentStatusChipClass;
  let paidAmountValue;
  let paidPercentValue;
  let remainingAmountValue;
  let paidAmountDisplay;
  let paidPercentDisplay;
  let remainingDisplay;
  const paymentHistoryMarkup = buildProjectPaymentHistoryMarkup(paymentHistory);
  const confirmedChipText = t('projects.focus.confirmed', '✅ مشروع مؤكد');
  const confirmedChipHtml = project.confirmed === true || project.confirmed === 'true'
    ? `<span class="reservation-chip status-confirmed">${escapeHtml(confirmedChipText)}</span>`
    : '';

  // Build detailed financial summary when there are linked reservations
  let summaryDetails = [];
  if (reservationsCount > 0) {
    // Aggregate equipment/crew totals and crew cost across reservations (before any project discount)
    const agg = reservationsForProject.reduce((acc, res) => {
      const items = Array.isArray(res.items) ? res.items : [];
      const crewAssignments = Array.isArray(res.crewAssignments) ? res.crewAssignments : [];
      const techniciansOrAssignments = crewAssignments.length
        ? crewAssignments
        : (Array.isArray(res.technicians) ? res.technicians : []);
      const breakdown = calculateDraftFinancialBreakdown({
        items,
        technicianIds: Array.isArray(techniciansOrAssignments) && !techniciansOrAssignments.length ? techniciansOrAssignments : [],
        crewAssignments: Array.isArray(techniciansOrAssignments) && techniciansOrAssignments.length && typeof techniciansOrAssignments[0] === 'object' ? techniciansOrAssignments : [],
        discount: res.discount ?? 0,
        discountType: res.discountType || 'percent',
        applyTax: false,
        start: res.start,
        end: res.end,
        companySharePercent: null,
      });
      acc.equipment += Number(breakdown.equipmentTotal || 0);
      acc.crew += Number(breakdown.crewTotal || 0);
      acc.crewCost += Number(breakdown.crewCostTotal || 0);
      return acc;
    }, { equipment: 0, crew: 0, crewCost: 0 });

    const expensesTotalNumber = Number(expensesTotal || 0);
    // إجمالي قبل الخصم = المعدات + الفريق + مصروفات المشروع
    const grossBeforeDiscount = Number((agg.equipment + agg.crew + expensesTotalNumber).toFixed(2));

    // Project-level discount applied on grossBeforeDiscount
    const discountVal = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
    const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
    let discountAmount = discountType === 'amount' ? discountVal : (grossBeforeDiscount * (discountVal / 100));
    if (!Number.isFinite(discountAmount) || discountAmount < 0) discountAmount = 0;
    if (discountAmount > grossBeforeDiscount) discountAmount = grossBeforeDiscount;

    // Company share after discount (independent from tax flag)
    const applyTaxFlag = applyTax === true; // from resolveProjectTotals(project)
    const shareEnabled = project?.companyShareEnabled === true
      || project?.companyShareEnabled === 'true'
      || project?.company_share_enabled === true
      || project?.company_share_enabled === 'true';
    const rawShare = Number.parseFloat(
      project?.companySharePercent
      ?? project?.company_share_percent
      ?? project?.companyShare
      ?? project?.company_share
      ?? 0
    ) || 0;
    const sharePercent = (shareEnabled && rawShare > 0) ? rawShare : 0;
    // الإجمالي بعد الخصم
    const baseAfterDiscount = Math.max(0, grossBeforeDiscount - discountAmount);
    const companyShareAmount = Number(((baseAfterDiscount) * (sharePercent / 100)).toFixed(2));

    // VAT after company share if enabled
    const taxAmountAfterShare = applyTaxFlag
      ? Number(((baseAfterDiscount + companyShareAmount) * PROJECT_TAX_RATE).toFixed(2))
      : 0;

    // Final total = grossBeforeDiscount - discount + share + VAT
    const finalTotal = Number((baseAfterDiscount + companyShareAmount + taxAmountAfterShare).toFixed(2));

    // Net profit should be derived from the final total (then subtract non-profit components)
    // Net profit = finalTotal - share - VAT - expenses - crew cost
    const netProfit = Number((finalTotal - companyShareAmount - taxAmountAfterShare - expensesTotalNumber - agg.crewCost).toFixed(2));

    if (agg.equipment > 0) summaryDetails.push({ icon: '🎛️', label: t('projects.details.summary.equipmentTotal', 'إجمالي المعدات'), value: formatCurrency(agg.equipment) });
    if (agg.crew > 0) summaryDetails.push({ icon: '😎', label: t('projects.details.summary.crewTotal', 'إجمالي الفريق'), value: formatCurrency(agg.crew) });
    if (agg.crewCost > 0) summaryDetails.push({ icon: '🧾', label: t('projects.details.summary.crewCostTotal', 'تكلفة الفريق'), value: formatCurrency(agg.crewCost) });
    if (expensesTotalNumber > 0) summaryDetails.push({ icon: '🧾', label: t('projects.details.summary.expensesTotal', 'مصروفات المشروع'), value: formatCurrency(expensesTotalNumber) });
    // الخصم يظهر قبل الإجمالي
    if (discountAmount > 0) summaryDetails.push({ icon: '🏷️', label: t('projects.details.summary.discount', 'الخصم'), value: `−${formatCurrency(discountAmount)}` });
    // الإجمالي بعد الخصم
    summaryDetails.push({ icon: '🧮', label: t('projects.details.summary.grossAfterDiscount', 'الإجمالي بعد الخصم'), value: formatCurrency(baseAfterDiscount) });
    if (companyShareAmount > 0) summaryDetails.push({ icon: '🏦', label: t('projects.details.summary.companyShare', 'نسبة الشركة'), value: `−${formatCurrency(companyShareAmount)}` });
    if (taxAmountAfterShare > 0) summaryDetails.push({ icon: '💸', label: t('projects.details.summary.tax', 'الضريبة (15٪)'), value: `−${formatCurrency(taxAmountAfterShare)}` });
    summaryDetails.push({ icon: '💵', label: t('projects.details.summary.netProfit', 'صافي الربح'), value: formatCurrency(netProfit) });
    summaryDetails.push({ icon: '💰', label: t('projects.details.summary.finalTotal', 'المجموع النهائي'), value: formatCurrency(finalTotal) });
    // Use the same "final total" for payment progress to avoid discrepancies
    paymentTotalForProgress = finalTotal;
  } else {
    // Fallback legacy summary when no linked reservations
    summaryDetails = [
      {
        icon: '💼',
        label: t('projects.details.summary.projectSubtotal', 'إجمالي المشروع'),
        value: formatCurrency(projectTotal)
      },
      {
        icon: '🔗',
        label: t('projects.details.summary.reservationsTotal', 'إجمالي المعدات / طاقم العمل'),
        value: formatCurrency(reservationsTotal)
      },
      {
        icon: '🧮',
        label: t('projects.details.summary.combinedTax', 'إجمالي الضريبة الكلية (15٪)'),
        value: formatCurrency(combinedTaxAmount)
      },
      {
        icon: '💰',
        label: t('projects.details.summary.overallTotal', 'الإجمالي الكلي'),
        value: formatCurrency(overallTotal)
      }
    ];
  }

  // Compute payment progress and status against the chosen total (finalTotal when available)
  paymentProgress = calculatePaymentProgress({
    totalAmount: paymentTotalForProgress,
    paidAmount: basePaidAmount,
    paidPercent: basePaidPercent,
    history: paymentHistory,
  });
  paymentStatusValue = determinePaymentStatus({
    manualStatus: paymentStatusRaw || 'unpaid',
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    totalAmount: paymentTotalForProgress,
  });
  paymentStatusText = t(
    `projects.paymentStatus.${paymentStatusValue}`,
    paymentStatusValue === 'paid' ? 'Paid' : paymentStatusValue === 'partial' ? 'Partial' : 'Unpaid'
  );
  paymentStatusChipClass = paymentStatusValue === 'paid'
    ? 'status-paid'
    : paymentStatusValue === 'partial'
      ? 'status-partial'
      : 'status-unpaid';
  paidAmountValue = Number.isFinite(Number(paymentProgress.paidAmount)) ? Number(paymentProgress.paidAmount) : 0;
  paidPercentValue = Number.isFinite(Number(paymentProgress.paidPercent)) ? Number(paymentProgress.paidPercent) : 0;
  remainingAmountValue = Math.max(0, Number((paymentTotalForProgress - paidAmountValue).toFixed(2)));
  paidAmountDisplay = formatCurrency(paidAmountValue);
  paidPercentDisplay = `${normalizeNumbers(paidPercentValue.toFixed(2))}%`;
  remainingDisplay = formatCurrency(remainingAmountValue);

  const summaryDetailsHtml = summaryDetails.map(({ icon, label, value }) => `
    <div class="summary-details-row">
      <span class="summary-details-label">${icon} ${escapeHtml(label)}</span>
      <span class="summary-details-value">${escapeHtml(value)}</span>
    </div>
  `).join('');

  const projectCodeLabel = t('projects.details.labels.code', 'رقم المشروع');
  const projectCodeBadgeHtml = `
    <div class="project-details-code-badge" title="${escapeHtml(projectCodeLabel)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${escapeHtml(projectCodeLabel)}
      </span>
      <span class="project-details-code-badge__value">${escapeHtml(projectCodeDisplay)}</span>
    </div>
  `;

  const projectInfoItems = [
    {
      icon: '👤',
      label: t('projects.details.client', 'العميل'),
      value: clientName
    },
    {
      icon: '📞',
      label: t('projects.details.labels.clientPhone', 'رقم العميل'),
      value: clientPhone
    },
    {
      icon: '✉️',
      label: t('projects.details.labels.clientEmail', 'البريد الإلكتروني'),
      value: clientEmail
    },
    projectCompany
      ? {
          icon: '🏢',
          label: t('projects.details.company', 'شركة العميل'),
          value: projectCompany
        }
      : null,
    {
      icon: '🏷️',
      label: t('projects.details.type', 'نوع المشروع'),
      value: typeLabel
    },
    resolveProjectScheduleItem('start', project.start),
    resolveProjectScheduleItem('end', project.end)
  ].filter(Boolean);

  const projectInfoTitle = t('projects.details.overview.heading', 'معلومات المشروع');

  const projectInfoOutlineHtml = `
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${escapeHtml(projectInfoTitle)}</h6>
      <ul class="project-details-outline__list">
        ${projectInfoItems.map(({ icon, label, value, meta }) => `
          <li>
            <span class="project-details-outline__label">${escapeHtml(icon)} ${escapeHtml(label)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${escapeHtml(value)}</span>
              ${meta ? `<span class="project-details-outline__meta">${escapeHtml(meta)}</span>` : ''}
            </span>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  const chips = [
    `<span class="reservation-chip ${statusChipClass}">${escapeHtml(statusLabel)}</span>`,
    `<span class="reservation-chip ${vatChipClass}">${escapeHtml(vatChipText)}</span>`,
    `<span class="reservation-chip status-info">${escapeHtml(reservationsChipText)}</span>`,
    `<span class="reservation-chip ${paymentStatusChipClass}">${escapeHtml(paymentStatusText)}</span>`,
    confirmedChipHtml
  ].filter(Boolean).join('');

  const expensesLabel = t('projects.details.expensesTotal', 'إجمالي المصاريف');
  const reservationsLabel = t('projects.details.reservationsTotal', 'إجمالي الحجوزات');

  dom.detailsBody.innerHTML = `
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${chips}</div>
        </div>
        <div class="project-details-header__code">
          ${projectCodeBadgeHtml}
          <h4 class="project-details-title">${escapeHtml(project.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${projectInfoOutlineHtml}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${escapeHtml(t('projects.details.summary.title', 'ملخص مالي'))}</h6>
            ${summaryDetailsHtml}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${escapeHtml(t('projects.details.description', 'وصف المشروع'))}</h5>
      <p class="project-details-description">${escapeHtml(descriptionDisplay)}</p>
    </section>
    <section class="project-details-section">
      <h5>${escapeHtml(t('projects.details.financialBreakdown', 'تفاصيل مالية'))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${escapeHtml(expensesLabel)}</span>
          <strong>${formatCurrency(expensesTotal)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${escapeHtml(reservationsLabel)}</span>
          <strong>${formatCurrency(reservationsTotal)}</strong>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${escapeHtml(t('reservations.paymentHistory.title', 'سجل الدفعات'))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${escapeHtml(t('projects.details.paymentOverview.total', 'الإجمالي الكلي'))}</span>
          <strong>${escapeHtml(formatCurrency(paymentTotalForProgress))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${escapeHtml(t('projects.details.paymentOverview.paid', 'المدفوع'))}</span>
          <strong>${escapeHtml(paidAmountDisplay)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${escapeHtml(t('projects.details.paymentOverview.percent', 'نسبة المدفوع'))}</span>
          <strong>${escapeHtml(paidPercentDisplay)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${escapeHtml(t('projects.details.paymentOverview.remaining', 'المتبقي'))}</span>
          <strong>${escapeHtml(remainingDisplay)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${paymentHistoryMarkup}
      </div>
    </section>
    ${buildProjectReservationsSection(project)}
    <div class="project-details-footer">
      <button type="button" class="modal-action-btn modal-action-btn--primary" data-action="create-reservation">
        ${escapeHtml(t('projects.details.reservations.create', '➕ إنشاء حجز مرتبط'))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--ghost" data-action="edit-project">
        ${escapeHtml(t('projects.details.actions.edit', '✏️ تعديل المشروع'))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--danger" data-action="delete-project">
        ${escapeHtml(t('projects.details.actions.delete', '🗑️ حذف المشروع'))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--ghost" id="project-details-export-btn">
        ${escapeHtml(t('projects.details.actions.exportPdf', '👁️ معاينة PDF'))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--ghost" data-bs-dismiss="modal">
        ${escapeHtml(t('actions.close', 'إغلاق'))}
      </button>
    </div>
  `;

  bindProjectDetailsEvents(project);

  const exportBtn = dom.detailsBody.querySelector('#project-details-export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      exportBtn.blur();
      if (exportBtn.disabled) return;
      exportBtn.disabled = true;
      try {
        await exportProjectPdf({ project });
      } catch (error) {
        console.error('❌ [projects/details] export project PDF failed', error);
        showToast(t('projects.details.exportFailed', '⚠️ تعذر تصدير المشروع إلى PDF'), 'error');
      } finally {
        exportBtn.disabled = false;
      }
    });
  }

  if (dom.detailsModalEl && window.bootstrap?.Modal) {
    const modal = window.bootstrap.Modal.getOrCreateInstance(dom.detailsModalEl);
    modal.show();
  }
}

export function bindFocusCards({ onOpenProject }) {
  if (!dom.focusCards || dom.focusCards.dataset.listenerAttached === 'true') return;

  dom.focusCards.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-action]');
    if (actionButton) {
      const { action, id } = actionButton.dataset;
      if (action === 'confirm-project') {
        event.preventDefault();
        event.stopPropagation();
        confirmProject(id);
        return;
      }
      if (action === 'view') {
        onOpenProject?.(id);
      } else if (action === 'highlight') {
        focusProjectRow(id);
      }
      return;
    }

    const card = event.target.closest('.project-focus-card');
    if (card?.dataset.projectId) {
      onOpenProject?.(card.dataset.projectId);
    }
  });

  dom.focusCards.dataset.listenerAttached = 'true';
}

export function focusProjectRow(projectId) {
  if (!dom.projectsTableBody) return;
  const selector = `tr[data-project-id="${CSS.escape(String(projectId))}"]`;
  const row = dom.projectsTableBody.querySelector(selector);
  if (!row) {
    showToast(t('projects.focus.toastNotFound', '⚠️ تعذّر العثور على المشروع في القائمة'));
    return;
  }

  row.classList.add('project-row-highlight');
  row.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.setTimeout(() => {
    row.classList.remove('project-row-highlight');
  }, 2200);
}

export function bindProjectDetailsEvents(project) {
  if (!dom.detailsBody) return;
  const createBtn = dom.detailsBody.querySelector('[data-action="create-reservation"]');
  const editBtn = dom.detailsBody.querySelector('[data-action="edit-project"]');
  const deleteBtn = dom.detailsBody.querySelector('[data-action="delete-project"]');
  const reservationContainer = dom.detailsBody.querySelector('.project-reservations-list');

  if (createBtn && project) {
    try {
      const linked = getReservationsForProject(project.id) || [];
      const hasActiveLinked = linked.some((res) => {
        const raw = String(res?.status || res?.reservationStatus || '').toLowerCase();
        return raw !== 'cancelled' && raw !== 'canceled';
      });

      if (hasActiveLinked) {
        // Disable creation when there is already an active linked reservation
        createBtn.disabled = true;
        createBtn.classList?.add('disabled');
        createBtn.setAttribute?.('aria-disabled', 'true');
        createBtn.title = t('projects.details.reservations.createDisabled', '⚠️ يوجد حجز مرتبط بالفعل بهذا المشروع');
      } else {
        createBtn.disabled = false;
        createBtn.classList?.remove('disabled');
        createBtn.removeAttribute?.('aria-disabled');
        createBtn.removeAttribute?.('title');
        createBtn.addEventListener('click', (event) => {
          event.preventDefault();
          startReservationForProject(project);
        });
      }
    } catch (_) {
      // Fallback to enabling when any error occurs
      createBtn.disabled = false;
      createBtn.classList?.remove('disabled');
      createBtn.removeAttribute?.('aria-disabled');
      createBtn.removeAttribute?.('title');
      createBtn.addEventListener('click', (event) => {
        event.preventDefault();
        startReservationForProject(project);
      });
    }
  }

  if (editBtn && project) {
    editBtn.addEventListener('click', (event) => {
      event.preventDefault();
      startProjectEdit(project);
    });
  }

  if (deleteBtn && project) {
    deleteBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      const button = event.currentTarget;
      button.disabled = true;
      try {
        await removeProject(project.id);
        const stillExists = state.projects.some((entry) => String(entry.id) === String(project.id));
        if (!stillExists && dom.detailsModalEl) {
          const instance = window.bootstrap?.Modal.getInstance(dom.detailsModalEl);
          instance?.hide();
        }
      } finally {
        const stillExists = state.projects.some((entry) => String(entry.id) === String(project.id));
        if (stillExists) {
          button.disabled = false;
        }
      }
    });
  }

  if (reservationContainer) {
    const openReservationDetails = async (index) => {
      if (!Number.isInteger(index) || index < 0) {
        return false;
      }

      const immediate = getReservationUIHandler('showReservationDetails');
      if (typeof immediate === 'function') {
        immediate(index);
        return true;
      }

      try {
        const handler = await waitForReservationUIHandler('showReservationDetails');
        if (typeof handler === 'function') {
          handler(index);
          return true;
        }
      } catch (error) {
        console.warn('⚠️ [projects/projectDetails] Unable to resolve reservation UI handler', error);
      }
      return false;
    };

    reservationContainer.addEventListener('click', async (event) => {
      const actionButton = event.target.closest('[data-action="view-reservation"]');
      if (!actionButton) return;
      const indexAttr = actionButton.dataset.index || actionButton.dataset.reservationIndex;
      const index = Number.parseInt(indexAttr || '-1', 10);
      if (!Number.isInteger(index) || index < 0) return;
      const opened = await openReservationDetails(index);
      if (!opened) {
        window.location.href = 'dashboard.html#reservations';
      }
    });

    reservationContainer.addEventListener('keydown', (event) => {
      if (!['Enter', ' '].includes(event.key)) return;
      const card = event.target.closest('[data-action="view-reservation"]');
      if (!card) return;
      event.preventDefault();
      card.click();
    });
  }
}

export function startProjectEdit(project) {
  if (!project || !dom.detailsBody) return;

  const resolved = state.projects.find((entry) => String(entry.id) === String(project.id));
  if (!resolved) return;

  const customer = state.customers.find((entry) => String(entry.id) === String(resolved.clientId));
  const clientName = customer?.customerName || customer?.name || resolved.clientName || resolved.customerName || '';
  const clientCompany = resolved.clientCompany || customer?.companyName || customer?.company || '';

  const normalizedExpenses = Array.isArray(resolved.expenses)
    ? resolved.expenses.map((expense, index) => ({
        id: expense?.id || `expense-${resolved.id}-${index}-${Date.now()}`,
        label: expense?.label || '',
        amount: Number(expense?.amount) || 0
      }))
    : [];

  let normalizedPayments = Array.isArray(resolved.paymentHistory)
    ? resolved.paymentHistory.map((entry, index) => ({
        type: entry?.type === 'percent' ? 'percent' : 'amount',
        amount: Number.isFinite(Number(entry?.amount)) ? Number(entry.amount) : null,
        percentage: Number.isFinite(Number(entry?.percentage)) ? Number(entry.percentage) : null,
        value: Number.isFinite(Number(entry?.value)) ? Number(entry.value) : null,
        note: entry?.note ?? null,
        recordedAt: entry?.recordedAt ?? entry?.recorded_at ?? new Date().toISOString(),
        key: `payment-${resolved.id}-${index}`,
      }))
    : [];

  let historyPaidAmount = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.amount) || 0), 0);
  let historyPaidPercent = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.percentage) || 0), 0);

  let basePaidAmount = Number.isFinite(Number(resolved.paidAmount)) ? Number(resolved.paidAmount) : 0;
  let basePaidPercent = Number.isFinite(Number(resolved.paidPercent)) ? Number(resolved.paidPercent) : 0;

  if (!normalizedPayments.length && (basePaidAmount > 0 || basePaidPercent > 0)) {
    const fallbackRecordedAt = resolved.updatedAt
      ?? resolved.createdAt
      ?? new Date().toISOString();

    if (basePaidPercent > 0) {
      normalizedPayments = [
        {
          type: 'percent',
          amount: Number.isFinite(basePaidAmount) && basePaidAmount > 0 ? basePaidAmount : null,
          percentage: basePaidPercent,
          value: basePaidPercent,
          note: null,
          recordedAt: fallbackRecordedAt,
          key: `legacy-payment-${resolved.id}-percent`
        }
      ];
    } else if (basePaidAmount > 0) {
      normalizedPayments = [
        {
          type: 'amount',
          amount: basePaidAmount,
          percentage: null,
          value: basePaidAmount,
          note: null,
          recordedAt: fallbackRecordedAt,
          key: `legacy-payment-${resolved.id}-amount`
        }
      ];
    }

    historyPaidAmount = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.amount) || 0), 0);
    historyPaidPercent = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.percentage) || 0), 0);
    basePaidAmount = 0;
    basePaidPercent = 0;
  }

  if (historyPaidAmount > 0 && Math.abs(basePaidAmount - historyPaidAmount) < 0.01) {
    basePaidAmount = 0;
  }
  if (historyPaidPercent > 0 && Math.abs(basePaidPercent - historyPaidPercent) < 0.01) {
    basePaidPercent = 0;
  }

  const editState = {
    clientName,
    clientCompany,
    expenses: normalizedExpenses,
    payments: normalizedPayments,
    basePaidAmount,
    basePaidPercent
  };

  dom.detailsBody.dataset.mode = 'edit';
  dom.detailsBody.innerHTML = buildProjectEditForm(resolved, editState);
  bindProjectEditForm(resolved, editState);
}

function bindProjectEditForm(project, editState = { expenses: [] }) {
  const form = dom.detailsBody?.querySelector('#project-details-edit-form');
  if (!form) return;

  const cancelBtn = form.querySelector('[data-action="cancel-edit"]');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      openProjectDetails(project.id);
    });
  }

  const expenseLabelInput = form.querySelector('#project-edit-expense-label');
  const expenseAmountInput = form.querySelector('#project-edit-expense-amount');
  const addExpenseBtn = form.querySelector('[data-action="add-expense"]');
  const expensesContainer = form.querySelector('#project-edit-expense-list');
  const startDateInput = form.querySelector('[name="project-start-date"]');
  const startTimeInput = form.querySelector('[name="project-start-time"]');
  const endDateInput = form.querySelector('[name="project-end-date"]');
  const endTimeInput = form.querySelector('[name="project-end-time"]');
  const paymentStatusSelect = form.querySelector('[name="project-payment-status"]');
  const taxCheckbox = form.querySelector('#project-edit-tax');
  const shareCheckbox = form.querySelector('#project-edit-company-share');
  const discountInput = form.querySelector('#project-edit-discount');
  const discountTypeSelect = form.querySelector('#project-edit-discount-type');
  const paymentProgressTypeSelect = form.querySelector('#project-edit-payment-progress-type');
  const paymentProgressValueInput = form.querySelector('#project-edit-payment-progress-value');
  const paymentAddButton = form.querySelector('#project-edit-payment-add');
  const paymentHistoryContainer = form.querySelector('#project-edit-payment-history');
  const paymentSummaryContainer = form.querySelector('#project-edit-payment-summary');
  const currencyLabel = t('reservations.create.summary.currency', 'SR');

  let isSyncingShareTax = false;

  const ensurePayments = () => {
    if (!Array.isArray(editState.payments)) {
      editState.payments = [];
    }
    return editState.payments;
  };

  const computeFinanceContext = () => {
    const equipmentEstimate = Number(project.equipmentEstimate) || 0;
    const expensesTotal = Array.isArray(editState.expenses)
      ? editState.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0)
      : 0;
    const discountTypeValue = discountTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const discountRaw = normalizeNumbers(discountInput?.value || '0');
    let discountValue = Number.parseFloat(discountRaw);
    if (!Number.isFinite(discountValue) || discountValue < 0) {
      discountValue = 0;
    }

    const applyTax = taxCheckbox?.checked === true;
    const companyShareEnabled = shareCheckbox?.checked === true;
    let companySharePercent = companyShareEnabled ? getProjectCompanySharePercent(shareCheckbox) : null;
    if (!Number.isFinite(companySharePercent) || companySharePercent <= 0) {
      companySharePercent = companyShareEnabled ? DEFAULT_COMPANY_SHARE_PERCENT : null;
    }

    const finance = calculateProjectFinancials({
      equipmentEstimate,
      expensesTotal,
      discountValue,
      discountType: discountTypeValue,
      applyTax,
      companyShareEnabled,
      companySharePercent,
    });

    return {
      equipmentEstimate,
      expensesTotal,
      discountValue,
      discountTypeValue,
      applyTax,
      companyShareEnabled,
      companySharePercent,
      finance,
    };
  };

  const computePaymentSnapshot = () => {
    const context = computeFinanceContext();
    const payments = ensurePayments();
    // Use combined total (project subtotal after discount/share + linked reservations + combined VAT)
    const linkedReservations = getReservationsForProject(project.id) || [];
    const reservationsTotal = linkedReservations.reduce((sum, res) => sum + (Number(res?.totalAmount) || resolveReservationNetTotal(res) || 0), 0);
    const projectTaxableBase = Number(context.finance?.taxableAmount || 0);
    const combinedTax = context.applyTax ? Number(((projectTaxableBase + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2)) : 0;
    const combinedTotalWithTax = Number((projectTaxableBase + reservationsTotal + combinedTax).toFixed(2));

    const progress = calculatePaymentProgress({
      totalAmount: combinedTotalWithTax,
      paidAmount: editState.basePaidAmount || 0,
      paidPercent: editState.basePaidPercent || 0,
      history: payments,
    });

    return {
      ...context,
      combinedTotalWithTax,
      payments,
      progress,
    };
  };

  const renderPaymentHistory = () => {
    if (!paymentHistoryContainer) return;
    paymentHistoryContainer.innerHTML = buildProjectEditPaymentHistoryMarkup(ensurePayments());
  };

  const renderPaymentSummary = () => {
    if (!paymentSummaryContainer) return;
    const { combinedTotalWithTax, progress } = computePaymentSnapshot();
    const total = Number.isFinite(Number(combinedTotalWithTax)) ? Number(combinedTotalWithTax) : 0;
    const paidAmount = Number.isFinite(Number(progress.paidAmount)) ? Number(progress.paidAmount) : 0;
    const paidPercent = Number.isFinite(Number(progress.paidPercent)) ? Number(progress.paidPercent) : 0;
    const remainingAmount = Math.max(0, Math.round((total - paidAmount) * 100) / 100);

    const summaryRows = [
      {
        label: t('projects.form.paymentSummary.total', 'الإجمالي الكلي'),
        value: formatCurrency(total),
      },
      {
        label: t('projects.form.paymentSummary.paidAmount', 'إجمالي المدفوع'),
        value: formatCurrency(paidAmount),
      },
      {
        label: t('projects.form.paymentSummary.paidPercent', 'نسبة الدفعات'),
        value: `${normalizeNumbers(paidPercent.toFixed(2))}%`,
      },
      {
        label: t('projects.form.paymentSummary.remaining', 'المتبقي'),
        value: formatCurrency(remainingAmount),
      },
    ];

    paymentSummaryContainer.innerHTML = summaryRows
      .map(({ label, value }) => `
        <div class="project-details-grid-item">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `)
      .join('');
  };

  const syncPaymentStatusValue = (trigger = 'auto') => {
    if (!paymentStatusSelect) return;
    const manualSelected = paymentStatusSelect.dataset?.userSelected === 'true';
    if (trigger === 'auto' && manualSelected) {
      return;
    }

    const { finance, progress } = computePaymentSnapshot();
    const resolvedStatus = determinePaymentStatus({
      manualStatus: manualSelected ? paymentStatusSelect.value : project.paymentStatus || 'unpaid',
      paidAmount: progress.paidAmount,
      paidPercent: progress.paidPercent,
      totalAmount: finance.totalWithTax,
    });

    if (!manualSelected) {
      paymentStatusSelect.value = resolvedStatus;
    }
  };

  const refreshPaymentUi = () => {
    renderPaymentHistory();
    renderPaymentSummary();
    syncPaymentStatusValue('auto');
  };

  const PAYMENT_TOLERANCE = 0.0001;

  const addPaymentEntry = () => {
    const type = paymentProgressTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const rawValue = normalizeNumbers(paymentProgressValueInput?.value || '').replace('%', '').trim();
    let value = Number.parseFloat(rawValue);

    if (!Number.isFinite(value) || value <= 0) {
      showToast(t('projects.toast.paymentInvalid', '⚠️ يرجى إدخال قيمة دفعة صحيحة'));
      paymentProgressValueInput?.focus();
      return;
    }

    const snapshot = computePaymentSnapshot();
    const totalAmount = Number.isFinite(Number(snapshot.finance.totalWithTax)) ? Number(snapshot.finance.totalWithTax) : 0;

    if (totalAmount <= 0) {
      showToast(t('projects.toast.paymentTotalMissing', '⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة'));
      return;
    }

    const alreadyPaidAmount = Number(snapshot.progress.paidAmount) || 0;
    const alreadyPaidPercent = Number(snapshot.progress.paidPercent) || 0;

    let amount = null;
    let percentage = null;

    if (type === 'percent') {
      const remainingPercent = Math.max(0, 100 - alreadyPaidPercent);
      if (remainingPercent <= PAYMENT_TOLERANCE) {
        showToast(t('projects.toast.paymentNoRemainingBalance', '⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة'));
        return;
      }

      if (value > remainingPercent) {
        value = remainingPercent;
        const adjustedPercent = normalizeNumbers(value.toFixed(2));
        showToast(t('projects.toast.paymentCappedPercent', 'ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%').replace('{value}', adjustedPercent));
      }

      percentage = Math.round(value * 100) / 100;
      if (totalAmount > 0) {
        amount = Math.round(((percentage / 100) * totalAmount) * 100) / 100;
      }
    } else {
      const remainingAmount = Math.max(0, totalAmount - alreadyPaidAmount);
      if (remainingAmount <= PAYMENT_TOLERANCE) {
        showToast(t('projects.toast.paymentNoRemainingBalance', '⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة'));
        return;
      }

      if (value > remainingAmount) {
        value = remainingAmount;
        const adjustedAmount = `${normalizeNumbers(value.toFixed(2))} ${currencyLabel}`;
        showToast(t('projects.toast.paymentCappedAmount', 'ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي').replace('{amount}', adjustedAmount));
      }

      amount = Math.round(value * 100) / 100;
      if (totalAmount > 0) {
        percentage = Math.round(((amount / totalAmount) * 100) * 100) / 100;
      }
    }

    const entry = {
      type,
      amount: amount != null ? amount : null,
      percentage: percentage != null ? percentage : null,
      value: type === 'amount'
        ? amount
        : percentage,
      note: null,
      recordedAt: new Date().toISOString(),
    };

    editState.payments = [...ensurePayments(), entry];
    if (paymentProgressValueInput) {
      paymentProgressValueInput.value = '';
    }
    if (paymentProgressTypeSelect) {
      paymentProgressTypeSelect.value = 'percent';
    }

    refreshPaymentUi();
    showToast(t('projects.toast.paymentAdded', '✅ تم تسجيل الدفعة'));
  };

  const syncShareAndTax = (source) => {
    if (!taxCheckbox || !shareCheckbox) return;
    if (isSyncingShareTax) return;
    isSyncingShareTax = true;

    if (source === 'share') {
      if (shareCheckbox.checked) {
        if (!taxCheckbox.checked) {
          taxCheckbox.checked = true;
        }
        ensureProjectCompanyShareEnabled(shareCheckbox);
      } else {
        if (taxCheckbox.checked) {
          taxCheckbox.checked = false;
        }
      }
    } else if (source === 'tax') {
      if (taxCheckbox.checked) {
        ensureProjectCompanyShareEnabled(shareCheckbox);
      } else if (shareCheckbox.checked) {
        shareCheckbox.checked = false;
      }
    }

    isSyncingShareTax = false;
  };

  function renderExpenses() {
    if (!expensesContainer) return;
    expensesContainer.innerHTML = buildProjectEditExpensesMarkup(editState.expenses);
  }

  renderExpenses();
  refreshPaymentUi();

  if (discountInput && !discountInput.dataset.listenerAttached) {
    discountInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    discountInput.dataset.listenerAttached = 'true';
  }

  if (discountTypeSelect && !discountTypeSelect.dataset.listenerAttached) {
    discountTypeSelect.addEventListener('change', () => {
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    discountTypeSelect.dataset.listenerAttached = 'true';
  }

  if (paymentProgressValueInput && !paymentProgressValueInput.dataset.listenerAttached) {
    paymentProgressValueInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
    });
    paymentProgressValueInput.dataset.listenerAttached = 'true';
  }

  if (paymentStatusSelect && !paymentStatusSelect.dataset.listenerAttached) {
    paymentStatusSelect.addEventListener('change', () => {
      paymentStatusSelect.dataset.userSelected = 'true';
    });
    paymentStatusSelect.dataset.listenerAttached = 'true';
  }

  if (expenseAmountInput && !expenseAmountInput.dataset.listenerAttached) {
    expenseAmountInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
    });
    expenseAmountInput.dataset.listenerAttached = 'true';
  }

  if (shareCheckbox && !shareCheckbox.dataset.listenerAttached) {
    shareCheckbox.addEventListener('change', () => {
      syncShareAndTax('share');
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    shareCheckbox.dataset.listenerAttached = 'true';
  }

  if (taxCheckbox && !taxCheckbox.dataset.listenerAttached) {
    taxCheckbox.addEventListener('change', () => {
      syncShareAndTax('tax');
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    taxCheckbox.dataset.listenerAttached = 'true';
  }

  if (shareCheckbox?.checked) {
    ensureProjectCompanyShareEnabled(shareCheckbox);
  }

  syncShareAndTax(shareCheckbox?.checked ? 'share' : 'tax');
  renderPaymentSummary();
  syncPaymentStatusValue('auto');

  if (addExpenseBtn) {
    addExpenseBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const label = expenseLabelInput?.value.trim() || '';
      const normalizedAmount = normalizeNumbers(expenseAmountInput?.value || '0');
      const amount = Number(normalizedAmount);

      if (!label) {
        showToast(t('projects.toast.missingExpenseLabel', '⚠️ يرجى إدخال وصف المصروف'));
        expenseLabelInput?.focus();
        return;
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        showToast(t('projects.toast.invalidExpenseAmount', '⚠️ يرجى إدخال مبلغ صحيح'));
        expenseAmountInput?.focus();
        return;
      }

      editState.expenses.push({
        id: `expense-${project.id}-${Date.now()}`,
        label,
        amount
      });

      if (expenseLabelInput) expenseLabelInput.value = '';
      if (expenseAmountInput) expenseAmountInput.value = '';
      renderExpenses();
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
  }

  if (expensesContainer) {
    expensesContainer.addEventListener('click', (event) => {
      const removeBtn = event.target.closest('[data-action="remove-expense"]');
      if (!removeBtn) return;
      const { id } = removeBtn.dataset;
      editState.expenses = editState.expenses.filter((expense) => String(expense.id) !== String(id));
      renderExpenses();
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
  }

  if (paymentAddButton && !paymentAddButton.dataset.listenerAttached) {
    paymentAddButton.addEventListener('click', (event) => {
      event.preventDefault();
      addPaymentEntry();
    });
    paymentAddButton.dataset.listenerAttached = 'true';
  }

  if (paymentHistoryContainer && !paymentHistoryContainer.dataset.listenerAttached) {
    paymentHistoryContainer.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action="remove-payment"]');
      if (!button) return;
      const index = Number.parseInt(button.dataset.index || '-1', 10);
      if (!Number.isInteger(index) || index < 0) return;
      const payments = ensurePayments();
      if (index >= payments.length) return;
      const next = payments.filter((_, entryIndex) => entryIndex !== index);
      editState.payments = next;
      refreshPaymentUi();
      showToast(t('projects.toast.paymentRemoved', '🗑️ تم حذف الدفعة'));
    });
    paymentHistoryContainer.dataset.listenerAttached = 'true';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.submitting === 'true') return;

    const titleInput = form.querySelector('[name="project-title"]');
    const typeSelect = form.querySelector('[name="project-type"]');
    const descriptionInput = form.querySelector('[name="project-description"]');

    const title = titleInput?.value.trim() || '';
    const projectType = typeSelect?.value || '';
    const startDateValue = startDateInput?.value.trim() || '';
    const startTimeValue = startTimeInput?.value.trim() || '';
    const descriptionValue = descriptionInput?.value.trim() || '';
    const selectedPaymentStatus = (paymentStatusSelect?.value || 'unpaid').toLowerCase();
    const normalizedPaymentStatus = ['paid', 'partial'].includes(selectedPaymentStatus)
      ? selectedPaymentStatus
      : 'unpaid';

    if (!title || !projectType || !startDateValue) {
      showToast(t('projects.toast.missingRequiredFields', '⚠️ يرجى تعبئة البيانات المطلوبة'));
      titleInput?.focus();
      return;
    }

    const endDateValue = endDateInput?.value.trim() || '';
    const endTimeValue = endTimeInput?.value.trim() || '';

    const startIso = combineProjectDateTime(startDateValue, startTimeValue);
    const endIso = endDateValue ? combineProjectDateTime(endDateValue, endTimeValue) : '';

    const startDate = new Date(startIso);
    const endDate = endIso ? new Date(endIso) : null;
    if (endDate && startDate > endDate) {
      showToast(t('projects.toast.invalidDateRange', '⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية'));
      endDateInput?.focus();
      return;
    }

    const index = state.projects.findIndex((entry) => String(entry.id) === String(project.id));
    if (index === -1) {
      showToast(t('projects.toast.editMissing', '⚠️ تعذّر العثور على المشروع المطلوب تعديله'));
      return;
    }

    const financeContext = computeFinanceContext();
    const {
      equipmentEstimate,
      expensesTotal,
      discountValue,
      discountTypeValue,
      applyTax: computedApplyTax,
      companyShareEnabled: contextShareEnabled,
      companySharePercent,
      finance,
    } = financeContext;

    const progressType = paymentProgressTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const progressRaw = normalizeNumbers(paymentProgressValueInput?.value || '');
    let progressValue = progressRaw ? Number.parseFloat(progressRaw) : null;

    let paymentHistory = [...ensurePayments()];

    if (Number.isFinite(progressValue) && progressValue > 0 && Number.isFinite(Number(finance.totalWithTax))) {
      const baseSnapshot = calculatePaymentProgress({
        totalAmount: finance.totalWithTax,
        paidAmount: editState.basePaidAmount || 0,
        paidPercent: editState.basePaidPercent || 0,
        history: paymentHistory,
      });

      const recordedAt = new Date().toISOString();

      if (progressType === 'percent') {
        const remainingPercent = Math.max(0, 100 - (baseSnapshot.paidPercent || 0));
        if (remainingPercent > PAYMENT_TOLERANCE) {
          const adjustedPercent = Math.min(progressValue, remainingPercent);
          const percentValue = Math.round(adjustedPercent * 100) / 100;
          const amountValue = finance.totalWithTax > 0
            ? Math.round(((percentValue / 100) * finance.totalWithTax) * 100) / 100
            : null;
          paymentHistory = [...paymentHistory, {
            type: 'percent',
            amount: amountValue,
            percentage: percentValue,
            value: percentValue,
            note: null,
            recordedAt,
          }];
        }
      } else {
        const remainingAmount = Math.max(0, finance.totalWithTax - (baseSnapshot.paidAmount || 0));
        if (remainingAmount > PAYMENT_TOLERANCE) {
          const adjustedAmount = Math.min(progressValue, remainingAmount);
          const amountValue = Math.round(adjustedAmount * 100) / 100;
          const percentValue = finance.totalWithTax > 0
            ? Math.round(((amountValue / finance.totalWithTax) * 100) * 100) / 100
            : null;
          paymentHistory = [...paymentHistory, {
            type: 'amount',
            amount: amountValue,
            percentage: percentValue,
            value: amountValue,
            note: null,
            recordedAt,
          }];
        }
      }

      if (paymentHistory !== editState.payments) {
        editState.payments = paymentHistory;
        refreshPaymentUi();
      }

      if (paymentProgressValueInput) {
        paymentProgressValueInput.value = '';
      }
      if (paymentProgressTypeSelect) {
        paymentProgressTypeSelect.value = 'percent';
      }

      progressValue = null;
    }

    const paymentProgress = calculatePaymentProgress({
      totalAmount: finance.totalWithTax,
      paidAmount: editState.basePaidAmount || 0,
      paidPercent: editState.basePaidPercent || 0,
      history: paymentHistory,
    });

    const manualStatusSelected = paymentStatusSelect?.dataset?.userSelected === 'true';
    const effectivePaymentStatus = determinePaymentStatus({
      manualStatus: manualStatusSelected ? normalizedPaymentStatus : project.paymentStatus || normalizedPaymentStatus,
      paidAmount: paymentProgress.paidAmount,
      paidPercent: paymentProgress.paidPercent,
      totalAmount: finance.totalWithTax,
    });
    const paymentStatusValue = manualStatusSelected ? normalizedPaymentStatus : effectivePaymentStatus;

    if (!manualStatusSelected && paymentStatusSelect) {
      paymentStatusSelect.value = paymentStatusValue;
    }
    if (paymentStatusSelect?.dataset) {
      delete paymentStatusSelect.dataset.userSelected;
    }

    editState.payments = paymentHistory;

    const payload = buildProjectPayload({
      projectCode: project.projectCode,
      title,
      type: projectType,
      clientId: project.clientId,
      clientCompany: project.clientCompany,
      description: descriptionValue,
      start: startIso,
      end: endIso || null,
      applyTax: computedApplyTax,
      paymentStatus: paymentStatusValue,
      equipmentEstimate,
      expenses: editState.expenses,
      discount: discountValue,
      discountType: discountTypeValue,
      companyShareEnabled: contextShareEnabled && computedApplyTax,
      companySharePercent: contextShareEnabled && computedApplyTax ? companySharePercent : null,
      companyShareAmount: finance.companyShareAmount,
      taxAmount: finance.taxAmount,
      totalWithTax: finance.totalWithTax,
      confirmed: project.confirmed,
      technicians: Array.isArray(project.technicians) ? project.technicians : [],
      equipment: mapProjectEquipmentToApi(project),
      paidAmount: paymentProgress.paidAmount,
      paidPercentage: paymentProgress.paidPercent,
      paymentProgressType: paymentProgress.paymentProgressType,
      paymentProgressValue: paymentProgress.paymentProgressValue,
      payments: paymentHistory,
    });

    form.dataset.submitting = 'true';

    try {
      const updated = await updateProjectApi(project.projectId ?? project.id, payload);
      const identifier = updated?.projectId ?? updated?.id ?? project.id;
      await handleProjectReservationSync(identifier, paymentStatusValue);
      state.projects = getProjectsState();
      state.reservations = getReservationsState();
      showToast(t('projects.toast.updated', '✅ تم تحديث المشروع بنجاح'));
      renderProjects();
      renderFocusCards();
      updateSummary();
      openProjectDetails(project.id);
    } catch (error) {
      console.error('❌ [projects] Failed to update project from details view', error);
      const message = isProjectApiError(error)
        ? error.message
        : t('projects.toast.updateFailed', 'تعذر تحديث المشروع، حاول مرة أخرى');
      showToast(message, 'error');
    } finally {
      delete form.dataset.submitting;
    }
  });
}

function startReservationForProject(project) {
  if (!project) return;
  const context = {
    projectId: project.id,
    customerId: project.clientId || null,
    start: project.start || null,
    end: project.end || null,
    forceNotes: Boolean(project.description)
  };
  updatePreferences({
    dashboardTab: 'reservations-tab',
    dashboardSubTab: 'create-tab'
  }).catch((error) => {
    console.warn('⚠️ [projects] Failed to persist dashboard tab preference', error);
  });

  let encodedContext = '';
  try {
    encodedContext = encodeURIComponent(JSON.stringify(context));
  } catch (error) {
    console.warn('⚠️ [projects] Unable to encode reservation context', error);
  }

  if (dom.detailsModalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(dom.detailsModalEl)?.hide();
  }

  const search = encodedContext ? `?reservationProjectContext=${encodedContext}` : '';
  window.location.href = `dashboard.html${search}#reservations`;
}

async function confirmProject(projectId) {
  if (!projectId) return;
  const project = state.projects.find((entry) => String(entry.id) === String(projectId));
  if (!project) {
    showToast(t('projects.toast.editMissing', '⚠️ تعذّر العثور على المشروع المطلوب تعديله'));
    return;
  }

  if (project.confirmed === true || project.confirmed === 'true') {
    showToast(t('projects.toast.alreadyConfirmed', 'ℹ️ المشروع مؤكّد مسبقًا'));
    return;
  }

  try {
    await updateProjectApi(project.projectId ?? project.id, { confirmed: true });
    const reservationsConfirmed = await updateLinkedReservationsConfirmation(projectId);

    state.projects = getProjectsState();
    state.reservations = getReservationsState();

    renderProjects();
    renderFocusCards();
    updateSummary();

    const isModalOpen = dom.detailsModalEl && dom.detailsModalEl.classList.contains('show');
    if (isModalOpen && dom.detailsBody?.dataset.projectId === String(projectId)) {
      openProjectDetails(projectId);
    }

    document.dispatchEvent(new CustomEvent('projects:changed'));
    if (reservationsConfirmed) {
      document.dispatchEvent(new CustomEvent('reservations:changed'));
    }

    showToast(t('projects.toast.confirmed', '✅ تم تأكيد المشروع'));
  } catch (error) {
    console.error('❌ [projects] confirmProject failed', error);
    const message = isProjectApiError(error)
      ? error.message
      : t('projects.toast.updateFailed', 'تعذر تحديث المشروع، حاول مرة أخرى');
    showToast(message, 'error');
  }
}

function buildProjectEditForm(project, editState = { clientName: '', clientCompany: '', expenses: [] }) {
  const { date: startDate, time: startTime } = splitDateTimeParts(project.start || '');
  const { date: endDate, time: endTime } = splitDateTimeParts(project.end || '');
  const applyTax = project.applyTax === true || project.applyTax === 'true';
  const paymentStatusRaw = typeof project.paymentStatus === 'string' ? project.paymentStatus.toLowerCase() : '';
  const paymentStatusValue = ['paid', 'partial'].includes(paymentStatusRaw) ? paymentStatusRaw : 'unpaid';
  const discountType = project.discountType === 'amount' ? 'amount' : 'percent';
  const discountValue = normalizeNumbers(String(project.discount ?? project.discountValue ?? 0));
  const sharePercentRaw = project.companySharePercent
    ?? project.company_share_percent
    ?? project.companyShare
    ?? project.company_share
    ?? project.companyShareAmountPercent
    ?? DEFAULT_COMPANY_SHARE_PERCENT;
  const parsedSharePercent = Number.parseFloat(normalizeNumbers(String(sharePercentRaw))); 
  const companySharePercent = Number.isFinite(parsedSharePercent) && parsedSharePercent > 0
    ? parsedSharePercent
    : DEFAULT_COMPANY_SHARE_PERCENT;
  const companyShareEnabled = project.companyShareEnabled === true
    || project.companyShareEnabled === 'true'
    || (project.company_share_enabled === true)
    || (project.company_share_enabled === 'true')
    || (applyTax && Number.isFinite(parsedSharePercent) && parsedSharePercent > 0);
  const paymentProgressType = 'percent';
  const paymentProgressValue = '';

  return `
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${escapeHtml(t('projects.form.labels.title', 'عنوان المشروع'))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${escapeHtml(project.title || '')}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${escapeHtml(t('projects.form.labels.type', 'نوع المشروع'))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${buildProjectTypeOptionsMarkup(project.type)}
          </select>
        </div>
        <div class="col-12">
          <div class="project-edit-inline-group project-edit-inline-group--dates">
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.startDate', 'تاريخ البدء'))}</label>
              <input type="date" class="form-control" name="project-start-date" value="${escapeHtml(startDate)}" required>
            </div>
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.endDate', 'تاريخ الانتهاء'))}</label>
              <input type="date" class="form-control" name="project-end-date" value="${escapeHtml(endDate)}">
            </div>
          </div>
          <div class="project-edit-inline-group project-edit-inline-group--times mt-2">
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.startTime', 'وقت البدء'))}</label>
              <input type="time" class="form-control" name="project-start-time" value="${escapeHtml(startTime)}">
            </div>
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.endTime', 'وقت الانتهاء'))}</label>
              <input type="time" class="form-control" name="project-end-time" value="${escapeHtml(endTime)}">
            </div>
          </div>
        </div>
        <div class="col-12">
          <label class="form-label">${escapeHtml(t('projects.form.labels.description', 'الوصف'))}</label>
          <textarea class="form-control project-edit-textarea" name="project-description" rows="5">${escapeHtml(project.description || '')}</textarea>
        </div>
        <div class="col-12 col-md-4 col-xl-3">
          <label class="form-label">${escapeHtml(t('projects.form.labels.paymentStatus', 'حالة الدفع'))}</label>
          <select class="form-select project-edit-select-xs" name="project-payment-status" id="project-edit-payment-status">
            <option value="unpaid" ${paymentStatusValue === 'unpaid' ? 'selected' : ''}>${escapeHtml(t('projects.paymentStatus.unpaid', 'غير مدفوع'))}</option>
            <option value="partial" ${paymentStatusValue === 'partial' ? 'selected' : ''}>${escapeHtml(t('projects.paymentStatus.partial', 'مدفوع جزئياً'))}</option>
            <option value="paid" ${paymentStatusValue === 'paid' ? 'selected' : ''}>${escapeHtml(t('projects.paymentStatus.paid', 'مدفوع'))}</option>
          </select>
        </div>
      </div>

      <div class="row g-3 align-items-start mt-1">
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label" for="project-edit-discount">${escapeHtml(t('projects.form.labels.discount', 'الخصم'))}</label>
          <div class="input-group project-edit-input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select project-edit-select-xs">
              <option value="percent" ${discountType === 'percent' ? 'selected' : ''}>${escapeHtml(t('projects.form.discount.percent', '٪ نسبة'))}</option>
              <option value="amount" ${discountType === 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.discount.amount', '💵 مبلغ'))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control project-edit-input-xs" value="${escapeHtml(discountValue)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label d-block" for="project-edit-company-share">${escapeHtml(t('projects.form.labels.companyShare', 'نسبة الشركة والضريبة'))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${escapeHtml(String(companySharePercent))}" ${companyShareEnabled ? 'checked' : ''}>
              <label class="form-check-label" for="project-edit-company-share">${escapeHtml(t('projects.form.companyShareToggle', 'إضافة نسبة الشركة (10٪)'))}</label>
            </div>
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${applyTax ? 'checked' : ''}>
              <label class="form-check-label" for="project-edit-tax">${escapeHtml(t('projects.form.taxLabel', 'شامل الضريبة (15٪)'))}</label>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label" for="project-edit-payment-progress-value">${escapeHtml(t('projects.form.paymentProgress.label', '💰 الدفعة المستلمة'))}</label>
          <div class="input-group project-edit-input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select project-edit-select-xs">
              <option value="amount" ${paymentProgressType === 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentProgress.amount', '💵 مبلغ'))}</option>
              <option value="percent" ${paymentProgressType !== 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentProgress.percent', '٪ نسبة'))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control project-edit-input-xs" value="${escapeHtml(paymentProgressValue)}" placeholder="0" inputmode="decimal">
          </div>
          <button type="button" class="modal-action-btn modal-action-btn--ghost project-edit-add-btn mt-2" id="project-edit-payment-add">${escapeHtml(t('reservations.paymentHistory.actions.add', '➕ إضافة دفعة'))}</button>
        </div>
      </div>

      <section class="project-edit-payment-history mt-4">
        <div id="project-edit-payment-summary" class="project-details-grid mb-3"></div>
        <div class="reservation-payment-history-block">
          <div class="reservation-payment-history__header">
            <h6 class="reservation-payment-history__title">${escapeHtml(t('reservations.paymentHistory.title', 'سجل الدفعات'))}</h6>
          </div>
          <div id="project-edit-payment-history" class="reservation-payment-history"></div>
        </div>
      </section>

      <section class="project-edit-expenses mt-4">
        <h6 class="mb-2">${escapeHtml(t('projects.form.labels.expenses', 'متطلبات المشروع'))}</h6>
        <div class="project-edit-expense-form">
          <div class="project-edit-expense-label-col">
            <input type="text" class="form-control project-edit-input-wide" id="project-edit-expense-label" placeholder="${escapeHtml(t('projects.form.placeholders.expenseLabel', 'وصف المتطلب'))}">
          </div>
          <div class="project-edit-expense-amount-col">
            <input type="text" class="form-control project-edit-input-xs" id="project-edit-expense-amount" placeholder="${escapeHtml(t('projects.form.placeholders.expenseAmount', 'المبلغ'))}" inputmode="decimal">
          </div>
          <div class="project-edit-expense-action-col">
            <button type="button" class="modal-action-btn modal-action-btn--warning project-edit-add-btn" data-action="add-expense">${escapeHtml(t('projects.form.buttons.addExpense', '➕ إضافة مصروف'))}</button>
          </div>
        </div>
        <div id="project-edit-expense-list" class="project-edit-expense-list mt-3">
          ${buildProjectEditExpensesMarkup(editState.expenses)}
        </div>
      </section>

      <div class="project-edit-actions mt-4 d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">${escapeHtml(t('projects.form.buttons.update', 'تحديث المشروع'))}</button>
        <button type="button" class="btn btn-outline-secondary" data-action="cancel-edit">${escapeHtml(t('actions.cancel', 'إلغاء'))}</button>
      </div>
    </form>
  `;
}

function buildProjectTypeOptionsMarkup(selectedType) {
  const typeOptions = ['commercial', 'coverage', 'photography', 'social'];
  return typeOptions
    .map((type) => {
      const label = getProjectTypeLabel(type);
      const selectedAttr = type === selectedType ? 'selected' : '';
      return `<option value="${escapeHtml(type)}" ${selectedAttr}>${escapeHtml(label)}</option>`;
    })
    .join('');
}

function buildProjectEditExpensesMarkup(expenses = []) {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    const emptyText = escapeHtml(t('projects.selected.emptyExpenses', 'لم يتم تسجيل أي مصروف'));
    return `<div class="text-muted small" data-empty>${emptyText}</div>`;
  }

  const removeLabel = escapeHtml(t('actions.remove', 'إزالة'));
  return expenses
    .map((expense) => {
      const label = escapeHtml(expense?.label || '');
      const amount = escapeHtml(formatCurrency(expense?.amount || 0));
      const id = escapeHtml(String(expense?.id || ''));
      return `
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${label}</div>
            <div class="text-muted small">${amount}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${id}" aria-label="${removeLabel}">✖</button>
        </div>
      `;
    })
    .join('');
}

function buildProjectPaymentHistoryMarkup(paymentHistory = []) {
  if (!Array.isArray(paymentHistory) || paymentHistory.length === 0) {
    const emptyText = escapeHtml(t('reservations.paymentHistory.empty', 'لا توجد دفعات مسجلة'));
    return `<div class="reservation-payment-history-empty">${emptyText}</div>`;
  }

  return `<ul class="reservation-payment-history-list">${paymentHistory.map((entry) => {
    const typeLabel = entry?.type === 'percent'
      ? t('reservations.paymentHistory.type.percent', 'دفعة نسبة')
      : entry?.type === 'amount'
        ? t('reservations.paymentHistory.type.amount', 'دفعة مالية')
        : t('reservations.paymentHistory.type.unknown', 'دفعة');
    const amountDisplay = Number.isFinite(Number(entry?.amount)) && Number(entry.amount) > 0
      ? escapeHtml(formatCurrency(Number(entry.amount)))
      : '—';
    const percentDisplay = Number.isFinite(Number(entry?.percentage)) && Number(entry.percentage) > 0
      ? `${normalizeNumbers(Number(entry.percentage).toFixed(2))}%`
      : '—';
    const dateDisplay = entry?.recordedAt
      ? normalizeNumbers(formatDateTime(entry.recordedAt))
      : '—';
    const noteHtml = entry?.note
      ? `<div class="payment-history-note">${escapeHtml(normalizeNumbers(entry.note))}</div>`
      : '';
    return `
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${escapeHtml(typeLabel)}</span>
          <span class="payment-history-entry__amount">${amountDisplay}</span>
          <span class="payment-history-entry__percent">${percentDisplay}</span>
          <span class="payment-history-entry__date">${dateDisplay}</span>
        </div>
        ${noteHtml}
      </li>
    `;
  }).join('')}</ul>`;
}

function buildProjectEditPaymentHistoryMarkup(payments = []) {
  if (!Array.isArray(payments) || payments.length === 0) {
    const emptyText = escapeHtml(t('reservations.paymentHistory.empty', 'لا توجد دفعات مسجلة'));
    return `<div class="reservation-payment-history__empty">${emptyText}</div>`;
  }

  const rows = payments.map((payment, index) => {
    const typeLabel = payment?.type === 'percent'
      ? t('reservations.paymentHistory.type.percent', 'دفعة نسبة')
      : t('reservations.paymentHistory.type.amount', 'دفعة مالية');
    const amountDisplay = Number.isFinite(Number(payment?.amount)) && Number(payment.amount) > 0
      ? escapeHtml(formatCurrency(Number(payment.amount)))
      : '—';
    const percentDisplay = Number.isFinite(Number(payment?.percentage)) && Number(payment.percentage) > 0
      ? `${normalizeNumbers(Number(payment.percentage).toFixed(2))}%`
      : '—';
    const dateDisplay = payment?.recordedAt
      ? normalizeNumbers(formatDateTime(payment.recordedAt))
      : '—';
    const noteDisplay = payment?.note ? escapeHtml(normalizeNumbers(payment.note)) : '';
    const removeLabel = escapeHtml(t('reservations.paymentHistory.actions.delete', 'حذف الدفعة'));

    return `
      <tr>
        <td>${escapeHtml(typeLabel)}</td>
        <td>${amountDisplay}</td>
        <td>${percentDisplay}</td>
        <td>${dateDisplay}</td>
        <td>${noteDisplay}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${index}" aria-label="${removeLabel}">🗑️</button>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="reservation-payment-history__table-wrapper">
      <table class="table table-sm reservation-payment-history__table">
        <thead>
          <tr>
            <th>${escapeHtml(t('reservations.paymentHistory.headers.method', 'نوع الدفعة'))}</th>
            <th>${escapeHtml(t('reservations.paymentHistory.headers.amount', 'المبلغ'))}</th>
            <th>${escapeHtml(t('reservations.paymentHistory.headers.percent', 'النسبة'))}</th>
            <th>${escapeHtml(t('reservations.paymentHistory.headers.date', 'التاريخ'))}</th>
            <th>${escapeHtml(t('reservations.paymentHistory.headers.note', 'ملاحظات'))}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function normalizeProjectPaymentHistoryForView(project = {}) {
  const rawHistory = Array.isArray(project.paymentHistory)
    ? project.paymentHistory
    : Array.isArray(project.payment_history)
      ? project.payment_history
      : [];

  const normalized = rawHistory
    .map(normalizePaymentHistoryEntryForView)
    .filter(Boolean);

  if (normalized.length > 0) {
    return normalized;
  }

  const basePercent = parsePaymentNumber(project.paidPercent ?? project.paid_percent);
  const baseAmount = parsePaymentNumber(project.paidAmount ?? project.paid_amount);
  const recordedAtRaw = project.updatedAt
    ?? project.updated_at
    ?? project.createdAt
    ?? project.created_at
    ?? null;
  const recordedAt = resolveRecordedAt(recordedAtRaw);

  if (basePercent != null && basePercent > 0) {
    return [
      {
        type: 'percent',
        amount: baseAmount != null && baseAmount > 0 ? baseAmount : null,
        percentage: basePercent,
        value: basePercent,
        note: null,
        recordedAt,
      }
    ];
  }

  if (baseAmount != null && baseAmount > 0) {
    return [
      {
        type: 'amount',
        amount: baseAmount,
        percentage: null,
        value: baseAmount,
        note: null,
        recordedAt,
      }
    ];
  }

  return [];
}

function normalizePaymentHistoryEntryForView(entry) {
  if (!entry || typeof entry !== 'object') return null;

  const typeRaw = entry.type ?? entry.payment_type ?? entry.paymentType ?? null;
  let type = typeof typeRaw === 'string' ? typeRaw.toLowerCase().trim() : null;
  if (type !== 'percent') {
    type = 'amount';
  }

  const amount = parsePaymentNumber(entry.amount ?? (type === 'amount' ? entry.value : null));
  const percentage = parsePaymentNumber(entry.percentage ?? (type === 'percent' ? entry.value : null));
  const value = type === 'percent'
    ? (percentage != null ? percentage : null)
    : (amount != null ? amount : null);
  const note = entry.note ?? entry.memo ?? null;
  const recordedAt = resolveRecordedAt(entry.recordedAt ?? entry.recorded_at ?? entry.date ?? entry.created_at ?? null);

  if (type === 'amount' && amount == null) {
    return null;
  }

  if (type === 'percent' && percentage == null) {
    return null;
  }

  return {
    type,
    amount: amount != null ? amount : null,
    percentage: percentage != null ? percentage : null,
    value,
    note: note && String(note).trim().length ? String(note).trim() : null,
    recordedAt,
  };
}

function parsePaymentNumber(value) {
  if (value == null || value === '') return null;
  const normalized = normalizeNumbers(String(value)).replace(/%/g, '').trim();
  if (!normalized) return null;
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function resolveRecordedAt(raw) {
  if (!raw) {
    return new Date().toISOString();
  }
  const candidate = new Date(raw);
  if (Number.isNaN(candidate.getTime())) {
    return new Date().toISOString();
  }
  return candidate.toISOString();
}

function resolveProjectScheduleItem(kind, value) {
  if (!value) return null;

  const { date, time } = splitDateAndTime(formatDateTime(value));
  const isStart = kind === 'start';
  const icon = isStart ? '⏱️' : '⌛';
  const label = isStart
    ? t('projects.details.labels.start', 'بداية الحجز')
    : t('projects.details.labels.end', 'نهاية الحجز');

  return {
    icon,
    label,
    value: date,
    meta: time
  };
}

function splitDateAndTime(formatted) {
  if (!formatted || formatted === '—') {
    return { date: '—', time: '' };
  }

  const parts = formatted.split(' ').filter(Boolean);
  const date = parts.shift() || '—';
  const time = parts.join(' ');
  return { date, time };
}

function getProjectTypeLabel(type) {
  if (!type) return t('projects.form.types.unknown', 'نوع غير محدد');
  const key = {
    commercial: 'projects.form.types.commercial',
    coverage: 'projects.form.types.coverage',
    photography: 'projects.form.types.photography',
    social: 'projects.form.types.social'
  }[type] || 'projects.form.types.unknown';
  return t(key, type);
}

function resolveReservationNetTotal(reservation) {
  if (!reservation) return 0;
  const items = Array.isArray(reservation.items) ? reservation.items : [];
  const discountRaw = reservation.discount ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountType = reservation.discountType || 'percent';
  const crewAssignments = Array.isArray(reservation.crewAssignments) ? reservation.crewAssignments : [];
  const techniciansOrAssignments = crewAssignments.length
    ? crewAssignments
    : (Array.isArray(reservation.technicians) ? reservation.technicians : []);
  const calculated = calculateReservationTotal(
    items,
    discountValue,
    discountType,
    false,
    techniciansOrAssignments,
    { start: reservation.start, end: reservation.end }
  );

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation.cost ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
}
