import { t } from '../../language.js';
import { normalizeNumbers, showToast } from '../../utils.js';
import { loadData } from '../../storage.js';
import { state, dom } from '../state.js';
import { PROJECT_TAX_RATE, statusFallbackLabels } from '../constants.js';
import { escapeHtml, formatCurrency } from '../formatting.js';
import {
  buildProjectReservationsSection,
  determineProjectStatus,
  getReservationsForProject,
  renderFocusCards,
  renderProjects,
  resolveProjectTotals,
  updateSummary,
} from '../view.js';
import {
  calculateDraftFinancialBreakdown,
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculatePaymentProgress,
  determinePaymentStatus,
  calculateReservationDays,
} from '../../reservationsSummary.js';
import { exportProjectPdf } from '../../reservations/reservationPdf.js';
import { getReservationUIHandler, waitForReservationUIHandler } from '../../reservations/uiBridge.js';
import { removeProject } from '../actions.js';
import { updatePreferences } from '../../preferencesService.js';
import {
  getProjectsState,
  updateProjectApi,
  isApiError as isProjectApiError,
  closeProjectApi,
} from '../../projectsService.js';
import { getReservationsState } from '../../reservationsService.js';
import { updateLinkedReservationsConfirmation, updateLinkedReservationsClosed } from '../actions.js';
import { normalizeProjectPaymentHistoryForView, buildProjectPaymentHistoryMarkup } from './payment.js';
import { resolveProjectScheduleItem, getProjectTypeLabel, resolveReservationNetTotal, buildProjectViewExpensesMarkup } from './display.js';

// ── Circular dep injection ────────────────────────────────────────────────────
// edit.js needs openProjectDetails; we break the cycle by injecting startProjectEdit
// from the entry point after both modules are loaded.

let _startProjectEdit = null;

export function setStartProjectEdit(fn) {
  _startProjectEdit = fn;
}

// ── openProjectDetails ────────────────────────────────────────────────────────

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
  const servicesClientPriceVal = Number(project?.servicesClientPrice ?? project?.services_client_price ?? 0);
  const projectTotal = subtotal;
  const combinedTaxAmount = applyTax
    ? Number(((projectTotal + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((projectTotal + reservationsTotal + combinedTaxAmount).toFixed(2));

  const statusBase = determineProjectStatus(project);
  const status = (project?.cancelled === true || project?.status === 'cancelled' || project?.status === 'canceled') ? 'cancelled' : statusBase;
  const statusLabel = t(`projects.status.${status}`, statusFallbackLabels[status] || status);
  const hasConflict = (() => {
    try {
      const startA = project.start ? new Date(project.start) : null;
      const endA = project.end ? new Date(project.end) : (startA ? new Date(startA.getTime() + 60 * 60 * 1000) : null);
      if (!startA || !endA || Number.isNaN(startA.getTime()) || Number.isNaN(endA.getTime())) return false;
      return state.projects.some((other) => {
        if (!other || String(other.id) === String(project.id)) return false;
        const startB = other.start ? new Date(other.start) : null;
        const endB = other.end ? new Date(other.end) : (startB ? new Date(startB.getTime() + 60 * 60 * 1000) : null);
        if (!startB || !endB || Number.isNaN(startB.getTime()) || Number.isNaN(endB.getTime())) return false;
        const latestStart = Math.max(startA.getTime(), startB.getTime());
        const earliestEnd = Math.min(endA.getTime(), endB.getTime());
        return latestStart < earliestEnd;
      });
    } catch (_) { return false; }
  })();
  const statusKey = (hasConflict && (status === 'upcoming' || status === 'ongoing')) ? 'conflict' : status;
  const statusTextMap = {
    upcoming: t('projects.status.upcoming', 'قادم'),
    ongoing: t('projects.status.ongoing', 'قيد التنفيذ'),
    completed: t('projects.status.completed', 'مكتمل'),
    conflict: t('projects.status.conflict', 'تعارض')
  };
  const statusDisplay = statusTextMap[statusKey] || statusLabel;
  const statusChipClassMap = {
    upcoming: 'timeline-status-badge timeline-status-badge--upcoming',
    ongoing: 'timeline-status-badge timeline-status-badge--ongoing',
    completed: 'timeline-status-badge timeline-status-badge--completed',
    conflict: 'timeline-status-badge timeline-status-badge--conflict',
    cancelled: 'timeline-status-badge timeline-status-badge--cancelled'
  };
  const statusChipClass = statusChipClassMap[statusKey] || 'timeline-status-badge timeline-status-badge--upcoming';
  const paymentStatusRaw = typeof project.paymentStatus === 'string' ? project.paymentStatus.toLowerCase() : '';
  const paymentHistory = normalizeProjectPaymentHistoryForView(project);
  const hasPaymentHistory = paymentHistory.length > 0;
  const basePaidAmount = hasPaymentHistory ? 0 : Number(project.paidAmount) || 0;
  const basePaidPercent = hasPaymentHistory ? 0 : Number(project.paidPercent) || 0;
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
  let paymentHistoryMarkup = '';
  const confirmedChipText = t('projects.focus.confirmed', '✅ مشروع مؤكد');
  const pendingChipText = t('projects.focus.pending', '⏳ غير مؤكد', 'Pending confirmation');
  const confirmedChipHtml = project.confirmed === true || project.confirmed === 'true'
    ? `<span class="reservation-chip status-confirmed">${escapeHtml(confirmedChipText)}</span>`
    : `<span class="reservation-chip status-pending">${escapeHtml(pendingChipText)}</span>`;

  let summaryDetails = [];
  if (reservationsCount > 0) {
    const agg = reservationsForProject.reduce((acc, res) => {
      const items = Array.isArray(res.items) ? res.items : [];
      const crewAssignments = Array.isArray(res.crewAssignments) ? res.crewAssignments : [];
      const techniciansOrAssignments = crewAssignments.length
        ? crewAssignments
        : (Array.isArray(res.technicians) ? res.technicians : []);
      const useAssignments = Array.isArray(techniciansOrAssignments) && techniciansOrAssignments.length && typeof techniciansOrAssignments[0] === 'object';
      const useTechnicianIds = Array.isArray(techniciansOrAssignments) && techniciansOrAssignments.length && typeof techniciansOrAssignments[0] !== 'object';
      const breakdown = calculateDraftFinancialBreakdown({
        items,
        technicianIds: useTechnicianIds ? techniciansOrAssignments : [],
        crewAssignments: useAssignments ? techniciansOrAssignments : [],
        discount: res.discount ?? 0,
        discountType: res.discountType || 'percent',
        applyTax: false,
        start: res.start,
        end: res.end,
        companySharePercent: null,
        groupingSource: res,
      });
      acc.equipment += Number(breakdown.equipmentTotal || 0);
      acc.crew += Number(breakdown.crewTotal || 0);
      acc.crewCost += Number(breakdown.crewCostTotal || 0);
      return acc;
    }, { equipment: 0, crew: 0, crewCost: 0 });

    const expensesTotalNumber = Number(expensesTotal || 0);
    const grossBeforeDiscount = Number((agg.equipment + agg.crew + servicesClientPriceVal).toFixed(2));

    const discountVal = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
    const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
    let discountAmount = discountType === 'amount' ? discountVal : (grossBeforeDiscount * (discountVal / 100));
    if (!Number.isFinite(discountAmount) || discountAmount < 0) discountAmount = 0;
    if (discountAmount > grossBeforeDiscount) discountAmount = grossBeforeDiscount;

    const applyTaxFlag = applyTax === true;
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
    // Company share applies only when VAT is enabled
    const sharePercent = (shareEnabled && applyTaxFlag && rawShare > 0) ? rawShare : 0;
    const baseAfterDiscount = Math.max(0, grossBeforeDiscount - discountAmount);
    const companyShareAmount = Number(((baseAfterDiscount) * (sharePercent / 100)).toFixed(2));

    const taxAmountAfterShare = applyTaxFlag
      ? Number(((baseAfterDiscount + companyShareAmount) * PROJECT_TAX_RATE).toFixed(2))
      : 0;

    const finalTotal = Number((baseAfterDiscount + companyShareAmount + taxAmountAfterShare).toFixed(2));
    const netProfit = Number((finalTotal - companyShareAmount - taxAmountAfterShare - expensesTotalNumber - agg.crewCost).toFixed(2));

    if (agg.equipment > 0) summaryDetails.push({ icon: '🎛️', label: t('projects.details.summary.equipmentTotal', 'إجمالي المعدات'), value: formatCurrency(agg.equipment) });
    if (agg.crew > 0) summaryDetails.push({ icon: '😎', label: t('projects.details.summary.crewTotal', 'إجمالي الفريق'), value: formatCurrency(agg.crew) });
    if (agg.crewCost > 0) summaryDetails.push({ icon: '🧾', label: t('projects.details.summary.crewCostTotal', 'تكلفة الفريق'), value: formatCurrency(agg.crewCost) });
    if (servicesClientPriceVal > 0) summaryDetails.push({ icon: '💼', label: t('projects.details.summary.servicesClientPrice', 'الخدمات الإنتاجية'), value: formatCurrency(servicesClientPriceVal) });
    if (expensesTotalNumber > 0) summaryDetails.push({ icon: '🧾', label: t('projects.details.summary.expensesTotal', 'تكلفة الخدمات الإنتاجية'), value: formatCurrency(expensesTotalNumber) });
    if (discountAmount > 0) summaryDetails.push({ icon: '🏷️', label: t('projects.details.summary.discount', 'الخصم'), value: `−${formatCurrency(discountAmount)}` });
    summaryDetails.push({ icon: '🧮', label: t('projects.details.summary.grossAfterDiscount', 'الإجمالي بعد الخصم'), value: formatCurrency(baseAfterDiscount) });
    if (companyShareAmount > 0) summaryDetails.push({ icon: '🏦', label: t('projects.details.summary.companyShare', 'نسبة الشركة'), value: `−${formatCurrency(companyShareAmount)}` });
    if (taxAmountAfterShare > 0) summaryDetails.push({ icon: '💸', label: t('projects.details.summary.tax', 'الضريبة (15٪)'), value: `−${formatCurrency(taxAmountAfterShare)}` });
    summaryDetails.push({ icon: '💵', label: t('projects.details.summary.netProfit', 'صافي الربح'), value: formatCurrency(netProfit) });
    summaryDetails.push({ icon: '💰', label: t('projects.details.summary.finalTotal', 'المجموع النهائي'), value: formatCurrency(finalTotal) });
    paymentTotalForProgress = finalTotal;
  } else {
    const expensesTotalNumber = Number(expensesTotal || 0);
    const servicesTotal = Math.max(0, Number(servicesClientPriceVal) || 0);

    const discountVal = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
    const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
    let discountAmount = discountType === 'amount' ? discountVal : (servicesTotal * (discountVal / 100));
    if (!Number.isFinite(discountAmount) || discountAmount < 0) discountAmount = 0;
    if (discountAmount > servicesTotal) discountAmount = servicesTotal;

    const baseAfterDiscount = Math.max(0, servicesTotal - discountAmount);

    const applyTaxFlag = applyTax === true;
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
    const sharePercent = (shareEnabled && applyTaxFlag && rawShare > 0) ? rawShare : 0;
    const companyShareAmount = Number(((baseAfterDiscount) * (sharePercent / 100)).toFixed(2));

    const taxAmountAfterShare = applyTaxFlag
      ? Number(((baseAfterDiscount + companyShareAmount) * PROJECT_TAX_RATE).toFixed(2))
      : 0;

    const finalTotal = Number((baseAfterDiscount + companyShareAmount + taxAmountAfterShare).toFixed(2));
    const netProfit = Number((finalTotal - companyShareAmount - taxAmountAfterShare - expensesTotalNumber).toFixed(2));

    summaryDetails = [];
    summaryDetails.push({ icon: '💼', label: t('projects.details.summary.servicesClientPrice', 'الخدمات الإنتاجية'), value: formatCurrency(servicesTotal) });
    if (discountAmount > 0) summaryDetails.push({ icon: '🏷️', label: t('projects.details.summary.discount', 'الخصم'), value: `−${formatCurrency(discountAmount)}` });
    summaryDetails.push({ icon: '🧮', label: t('projects.details.summary.grossAfterDiscount', 'الإجمالي بعد الخصم'), value: formatCurrency(baseAfterDiscount) });
    if (companyShareAmount > 0) summaryDetails.push({ icon: '🏦', label: t('projects.details.summary.companyShare', 'نسبة الشركة'), value: `−${formatCurrency(companyShareAmount)}` });
    if (taxAmountAfterShare > 0) summaryDetails.push({ icon: '💸', label: t('projects.details.summary.tax', 'الضريبة (15٪)'), value: `−${formatCurrency(taxAmountAfterShare)}` });
    summaryDetails.push({ icon: '💵', label: t('projects.details.summary.netProfit', 'صافي الربح'), value: formatCurrency(netProfit) });
    summaryDetails.push({ icon: '💰', label: t('projects.details.summary.finalTotal', 'المجموع النهائي'), value: formatCurrency(finalTotal) });

    paymentTotalForProgress = finalTotal;
  }

  paymentProgress = calculatePaymentProgress({
    totalAmount: paymentTotalForProgress,
    paidAmount: basePaidAmount,
    paidPercent: basePaidPercent,
    history: paymentHistory,
  });
  const manualStatusForDetermine = hasPaymentHistory ? 'unpaid' : (paymentStatusRaw || 'unpaid');
  paymentStatusValue = determinePaymentStatus({
    manualStatus: manualStatusForDetermine,
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

  try {
    paymentHistoryMarkup = buildProjectPaymentHistoryMarkup(paymentHistory, { total: paymentTotalForProgress });
  } catch (_) {
    paymentHistoryMarkup = buildProjectPaymentHistoryMarkup(paymentHistory, { total: overallTotal });
  }

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

  const daysCount = calculateReservationDays(project.start, project.end);
  const startScheduleItem = resolveProjectScheduleItem('start', project.start);
  const endScheduleRaw = resolveProjectScheduleItem('end', project.end);
  const endScheduleItem = endScheduleRaw
    ? { ...endScheduleRaw, meta: (endScheduleRaw.meta ? `${endScheduleRaw.meta} — ` : '') + `${t('projects.details.labels.days', 'عدد الأيام')}: ${normalizeNumbers(String(daysCount))}` }
    : null;

  const projectInfoItems = [
    { icon: '👤', label: t('projects.details.client', 'العميل'), value: clientName },
    { icon: '📞', label: t('projects.details.labels.clientPhone', 'رقم العميل'), value: clientPhone },
    { icon: '✉️', label: t('projects.details.labels.clientEmail', 'البريد الإلكتروني'), value: clientEmail },
    projectCompany ? { icon: '🏢', label: t('projects.details.company', 'شركة العميل'), value: projectCompany } : null,
    { icon: '🏷️', label: t('projects.details.type', 'نوع المشروع'), value: `<span class="project-type-chip project-type-chip--${(project.type || 'default')}">${escapeHtml(typeLabel)}</span>` },
    startScheduleItem,
    endScheduleItem
  ].filter(Boolean);

  const projectInfoTitle = t('projects.details.overview.heading', 'معلومات المشروع');

  const projectInfoOutlineHtml = `
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${escapeHtml(projectInfoTitle)}</h6>
      <ul class="project-details-outline__list">
        ${projectInfoItems.map(({ icon, label, value, meta }) => {
          const valueStr = String(value ?? '');
          const isSafeHtml = valueStr.trim().startsWith('<');
          const renderedValue = isSafeHtml ? valueStr : escapeHtml(valueStr);
          const metaStr = String(meta ?? '');
          const renderedMeta = metaStr ? escapeHtml(metaStr) : '';
          return `
          <li>
            <span class="project-details-outline__label">${escapeHtml(icon)} ${escapeHtml(label)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${renderedValue}</span>
              ${meta ? `<span class="project-details-outline__meta">${renderedMeta}</span>` : ''}
            </span>
          </li>
          `;
        }).join('')}
      </ul>
    </div>
  `;

  const linkChipText = reservationsCount > 0
    ? t('projects.details.chips.linkedReservation', 'مربوط بحجز')
    : t('projects.details.chips.notLinkedReservation', 'غير مربوط بحجز');
  const linkChipClass = reservationsCount > 0 ? 'reservation-chip status-confirmed' : 'reservation-chip status-info';

  const chips = [
    `<span class="${statusChipClass}">${escapeHtml(statusDisplay)}</span>`,
    `<span class="${linkChipClass}">${escapeHtml(linkChipText)}</span>`,
    `<span class="reservation-chip ${paymentStatusChipClass}">${escapeHtml(paymentStatusText)}</span>`,
    confirmedChipHtml
  ].filter(Boolean).join('');

  const expensesTableTitle = t('projects.details.expenses', 'خدمات إنتاجية ({amount})').replace('{amount}', formatCurrency(expensesTotal));
  const expensesTableMarkup = buildProjectViewExpensesMarkup(Array.isArray(project.expenses) ? project.expenses : []);

  const projectForReservations = { ...project, paymentStatus: paymentStatusValue };

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
            <h6>${escapeHtml(t('projects.details.summary.title', 'الملخص المالي'))}</h6>
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
      <h5>${escapeHtml(expensesTableTitle)}</h5>
      ${expensesTableMarkup}
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
    ${buildProjectReservationsSection(projectForReservations)}
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
        ${escapeHtml(t('projects.details.actions.exportPdf', 'عرض سعر'))}
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
        console.error('❌ [projects/projectDetails/view.js] export project PDF failed', error);
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

// ── bindFocusCards ────────────────────────────────────────────────────────────

export function bindFocusCards({ onOpenProject }) {
  if (!dom.focusCards || dom.focusCards.dataset.listenerAttached === 'true') return;

  dom.focusCards.addEventListener('click', async (event) => {
    const actionButton = event.target.closest('[data-action]');
    if (actionButton) {
      const { action, id } = actionButton.dataset;
      if (action === 'confirm-project') {
        event.preventDefault();
        event.stopPropagation();
        confirmProject(id);
        return;
      }
      if (action === 'close-project') {
        event.preventDefault();
        event.stopPropagation();
        try {
          const modal = document.getElementById('closeProjectModal');
          const notesArea = document.getElementById('close-project-notes');
          const submit = document.getElementById('close-project-submit');
          if (notesArea) notesArea.value = '';
          if (submit && submit.__tmpCloseProjectListener) {
            submit.removeEventListener('click', submit.__tmpCloseProjectListener);
            submit.__tmpCloseProjectListener = null;
          }
          if (submit) {
            const handler = async () => {
              const note = notesArea?.value || '';
              try {
                const updated = await closeProjectApi(id, note);
                await updateLinkedReservationsClosed(updated?.projectId ?? updated?.id ?? id);
                state.projects = getProjectsState();
                state.reservations = getReservationsState();
                renderProjects();
                renderFocusCards();
                updateSummary();
                showToast(t('projects.toast.closed', '✅ تم إغلاق المشروع'));
              } catch (e) {
                console.error('❌ [projects/projectDetails/view.js] close-project (card) failed', e);
                showToast(t('projects.toast.closeFailed', 'تعذر إغلاق المشروع'), 'error');
              } finally {
                try {
                  const inst = (window.bootstrap?.Modal || bootstrap?.Modal)?.getInstance?.(modal) || (window.bootstrap?.Modal || bootstrap?.Modal)?.getOrCreateInstance?.(modal);
                  inst?.hide?.();
                } catch (_) {}
              }
            };
            submit.__tmpCloseProjectListener = handler;
            submit.addEventListener('click', handler, { once: true });
          }
          if (modal && (window.bootstrap?.Modal || (typeof bootstrap !== 'undefined' && bootstrap?.Modal))) {
            const inst = (window.bootstrap?.Modal || bootstrap.Modal).getOrCreateInstance(modal);
            inst.show();
          }
        } catch (e) {
          console.warn('⚠️ [projects/projectDetails/view.js] unable to open close modal from card', e);
        }
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

// ── focusProjectRow ───────────────────────────────────────────────────────────

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

// ── bindProjectDetailsEvents ──────────────────────────────────────────────────

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
        createBtn.classList?.add('disabled');
        createBtn.setAttribute?.('aria-disabled', 'true');
        createBtn.title = t('projects.details.reservations.createDisabled', '⚠️ المشروع مربوط بحجز مسبقاً');
        createBtn.addEventListener('click', (event) => {
          event.preventDefault();
          showToast(t('projects.details.reservations.createDisabledToast', '⚠️ المشروع مربوط بحجز مسبقاً'));
        });
      } else {
        createBtn.disabled = false;
        createBtn.classList?.remove('disabled');
        createBtn.classList?.remove('btn-disabled');
        createBtn.removeAttribute?.('aria-disabled');
        createBtn.removeAttribute?.('title');
        createBtn.addEventListener('click', (event) => {
          event.preventDefault();
          startReservationForProject(project);
        });
      }
    } catch (_) {
      createBtn.disabled = false;
      createBtn.classList?.remove('disabled');
      createBtn.classList?.remove('btn-disabled');
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
      _startProjectEdit?.(project);
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
        console.warn('⚠️ [projects/projectDetails/view.js] Unable to resolve reservation UI handler', error);
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

// ── startReservationForProject ────────────────────────────────────────────────

function startReservationForProject(project) {
  if (!project) return;
  const context = {
    projectId: project.id,
    customerId: project.clientId || null,
    start: project.start || null,
    end: project.end || null,
    forceNotes: Boolean(project.description),
    fromProjectForm: true,
    draftStorageKey: 'projects:create:draft',
    returnUrl: `projects.html?project=${encodeURIComponent(project.id)}&linked=1#projects-section`,
  };
  updatePreferences({
    dashboardTab: 'reservations-tab',
    dashboardSubTab: 'create-tab'
  }).catch((error) => {
    console.warn('⚠️ [projects/projectDetails/view.js] Failed to persist dashboard tab preference', error);
  });

  let encodedContext = '';
  try {
    encodedContext = encodeURIComponent(JSON.stringify(context));
  } catch (error) {
    console.warn('⚠️ [projects/projectDetails/view.js] Unable to encode reservation context', error);
  }

  if (dom.detailsModalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(dom.detailsModalEl)?.hide();
  }

  const search = encodedContext ? `?reservationProjectContext=${encodedContext}` : '';
  window.location.href = `dashboard.html${search}#reservations`;
}

// ── confirmProject ────────────────────────────────────────────────────────────

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
    console.error('❌ [projects/projectDetails/view.js] confirmProject failed', error);
    const message = isProjectApiError(error)
      ? error.message
      : t('projects.toast.updateFailed', 'تعذر تحديث المشروع، حاول مرة أخرى');
    showToast(message, 'error');
  }
}
