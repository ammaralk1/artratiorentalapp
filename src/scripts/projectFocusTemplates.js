import { normalizeNumbers } from './utils.js';
import { t, getCurrentLanguage } from './language.js';
import {
  determineProjectStatus,
  calculateProjectExpenses,
  truncateText,
  escapeHtml,
  formatCurrencyLocalized
} from './projectsCommon.js';
import { calculateReservationTotal, DEFAULT_COMPANY_SHARE_PERCENT, calculateDraftFinancialBreakdown, calculatePaymentProgress, determinePaymentStatus } from './reservationsSummary.js';
import { isReservationCompleted, resolveReservationProjectState } from './reservationsShared.js';
import { getReservationsState, updateReservationApi } from './reservationsService.js';

export const PROJECT_TAX_RATE = 0.15;
const DEFAULT_CATEGORY_CLASS = 'bg-primary';
const MAX_CREW_PREVIEW = 2;

const statusLabelsFallback = {
  upcoming: 'Upcoming',
  ongoing: 'In Progress',
  completed: 'Completed'
};

// Use the same timeline-style badge classes as Projects page
const statusBadgeClass = {
  upcoming: 'timeline-status-badge timeline-status-badge--upcoming',
  ongoing: 'timeline-status-badge timeline-status-badge--ongoing',
  completed: 'timeline-status-badge timeline-status-badge--completed'
};

function getReservationIdentifier(reservation) {
  if (!reservation) return null;
  const candidates = [
    reservation?.id,
    reservation?.reservationId,
    reservation?.reservation_id,
    reservation?.reservationID
  ];
  const identifier = candidates.find((value) => value != null && value !== '');
  return identifier != null ? String(identifier) : null;
}

function normalizeProjectReservations(reservations = []) {
  const stateReservations = getReservationsState();

  return reservations
    .map((entry) => {
      const reservation = entry?.reservation ?? entry;
      if (!reservation || typeof reservation !== 'object') {
        return null;
      }

      let index = Number.isInteger(entry?.index) && entry.index >= 0
        ? entry.index
        : Number.isInteger(entry?.reservationIndex) && entry.reservationIndex >= 0
          ? entry.reservationIndex
          : null;

      if (!Number.isInteger(index) || index < 0) {
        const identifier = getReservationIdentifier(reservation);
        if (identifier) {
          index = stateReservations.findIndex((candidate) => {
            const candidateIdentifier = getReservationIdentifier(candidate);
            return candidateIdentifier && candidateIdentifier === identifier;
          });
        }
      }

      return {
        reservation,
        index: Number.isInteger(index) && index >= 0 ? index : -1
      };
    })
    .filter(Boolean);
}

export function getProjectIdentifier(project) {
  if (!project) return null;
  if (project.id != null) return String(project.id);
  if (project.projectId != null) return String(project.projectId);
  if (project.project_id != null) return String(project.project_id);
  return null;
}

export function buildProjectFocusCard(project, {
  customer = null,
  techniciansMap = new Map(),
  reservations = []
} = {}) {
  const normalizedReservations = normalizeProjectReservations(reservations);
  const reservationList = normalizedReservations.map(({ reservation }) => reservation);
  const projectId = getProjectIdentifier(project);
  const projectIdAttr = projectId ? escapeHtml(projectId) : '';
  const status = determineProjectStatus(project);
  const statusLabel = t(`projects.status.${status}`, statusLabelsFallback[status]);
  const statusClass = statusBadgeClass[status] || 'bg-secondary';
  // Derive payment status exactly like Projects page cards
  const baseTotals = resolveProjectTotals(project) || {};
  const projectTaxableBase = Number(baseTotals.subtotal || 0);
  const combinedReservationsTotal = (reservationList || []).reduce((sum, res) => sum + resolveReservationNetTotal(res), 0);
  const combinedTax = baseTotals.applyTax
    ? Number(((projectTaxableBase + combinedReservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const combinedTotalWithTax = Number((projectTaxableBase + combinedReservationsTotal + combinedTax).toFixed(2));
  const projHistory = Array.isArray(project?.paymentHistory)
    ? project.paymentHistory
    : (Array.isArray(project?.payments) ? project.payments : []);
  const projProgress = calculatePaymentProgress({
    totalAmount: combinedTotalWithTax,
    paidAmount: projHistory.length ? 0 : project.paidAmount,
    paidPercent: projHistory.length ? 0 : project.paidPercent,
    history: projHistory,
  });
  const paymentStatus = determinePaymentStatus({
    manualStatus: null,
    paidAmount: projProgress.paidAmount,
    paidPercent: projProgress.paidPercent,
    totalAmount: combinedTotalWithTax,
  });
  const paymentStatusLabel = t(
    `projects.paymentStatus.${paymentStatus}`,
    paymentStatus === 'paid' ? 'Paid' : paymentStatus === 'partial' ? 'Partially Paid' : 'Unpaid'
  );
  const paymentChipClass = paymentStatus === 'paid'
    ? 'status-paid'
    : paymentStatus === 'partial'
      ? 'status-partial'
      : 'status-unpaid';
  const cardStateClasses = [paymentStatus === 'paid' ? 'project-focus-card--paid' : 'project-focus-card--unpaid'];

  const confirmed = project?.confirmed === true || project?.confirmed === 'true';
  if (confirmed) {
    cardStateClasses.push('project-focus-card--confirmed');
  }

  const projectCodeValue = project?.projectCode || (projectId ? `PRJ-${normalizeNumbers(projectId)}` : '');
  const projectCodeDisplay = projectCodeValue ? normalizeNumbers(String(projectCodeValue).replace(/^#/, '')) : '';
  const projectCodeBadge = projectCodeDisplay
    ? `<span class="project-code-badge project-focus-card__code">#${escapeHtml(projectCodeDisplay)}</span>`
    : '';

  const typeLabel = getProjectTypeLabel(project?.type);
  // Hide category/type badge on top to match Projects page; type will be shown in rows
  const categoryBadge = '';
  const statusChip = `<span class="${statusClass}">${escapeHtml(statusLabel)}</span>`;
  const paymentChip = `<span class="reservation-chip ${paymentChipClass} project-focus-card__payment-chip">${escapeHtml(paymentStatusLabel)}</span>`;

  const title = (project?.title || '').trim() || t('projects.fallback.untitled', 'Untitled project');
  const description = (project?.description || '').trim();
  const descriptionText = description
    ? escapeHtml(truncateText(description, 110))
    : escapeHtml(t('projects.fallback.noDescription', 'No description'));

  const crewIds = Array.isArray(project?.technicians) ? project.technicians : [];
  const crewNames = crewIds
    .map((id) => techniciansMap.get(String(id))?.name)
    .filter(Boolean);
  const crewPreview = crewNames.length ? buildCrewPreview(crewNames) : '';

  const customerName = customer?.customerName || project?.clientName || '';
  const companyName = (project?.clientCompany || customer?.companyName || '').trim();

  const totals = reservationList.reduce((acc, reservation) => {
    const net = resolveReservationNetTotal(reservation);
    const items = Array.isArray(reservation?.items) ? reservation.items : [];
    const equipmentCount = items.reduce((sum, item) => sum + (Number(item?.qty) || 0), 0);
    const crewCount = Array.isArray(reservation?.technicians) ? reservation.technicians.length : 0;
    // Draft breakdown (without tax) to match finalTotal logic used in details view
    const crewAssignments = Array.isArray(reservation?.crewAssignments) ? reservation.crewAssignments : [];
    const techniciansOrAssignments = crewAssignments.length
      ? crewAssignments
      : (Array.isArray(reservation?.technicians) ? reservation.technicians : []);
    const breakdown = calculateDraftFinancialBreakdown({
      items,
      technicianIds: Array.isArray(techniciansOrAssignments) && !techniciansOrAssignments.length ? techniciansOrAssignments : [],
      crewAssignments: Array.isArray(techniciansOrAssignments) && techniciansOrAssignments.length && typeof techniciansOrAssignments[0] === 'object' ? techniciansOrAssignments : [],
      discount: reservation?.discount ?? 0,
      discountType: reservation?.discountType || 'percent',
      applyTax: false,
      start: reservation?.start,
      end: reservation?.end,
      companySharePercent: null,
    });

    return {
      total: acc.total + net,
      equipment: acc.equipment + Number(breakdown.equipmentTotal || 0),
      crew: acc.crew + Number(breakdown.crewTotal || 0),
      crewCost: acc.crewCost + Number(breakdown.crewCostTotal || 0),
      equipmentCountTotal: (acc.equipmentCountTotal || 0) + equipmentCount,
      crewCountTotal: (acc.crewCountTotal || 0) + crewCount,
    };
  }, { total: 0, equipment: 0, crew: 0, crewCost: 0, equipmentCountTotal: 0, crewCountTotal: 0 });

  const reservationsTotal = Number(totals.total.toFixed(2));
  const equipmentCountTotal = totals.equipmentCountTotal || 0;
  const crewAssignmentsTotal = totals.crewCountTotal || crewIds.length;

  const projectTotals = resolveProjectTotals(project);
  // Compute final total (same logic as details):
  const expensesTotalNumber = Number(projectTotals.expensesTotal || 0);
  const grossBeforeDiscount = Number((totals.equipment + totals.crew + expensesTotalNumber).toFixed(2));
  const discountValueRaw = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  let discountAmount = discountType === 'amount' ? discountValueRaw : (grossBeforeDiscount * (discountValueRaw / 100));
  if (!Number.isFinite(discountAmount) || discountAmount < 0) discountAmount = 0;
  if (discountAmount > grossBeforeDiscount) discountAmount = grossBeforeDiscount;
  const baseAfterDiscount = Math.max(0, grossBeforeDiscount - discountAmount);

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
  const companyShareAmount = Number(((baseAfterDiscount) * (sharePercent / 100)).toFixed(2));
  const taxAmountAfterShare = projectTotals.applyTax
    ? Number(((baseAfterDiscount + companyShareAmount) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const finalTotal = Number((baseAfterDiscount + companyShareAmount + taxAmountAfterShare).toFixed(2));

  const metaRows = [
    projectCodeDisplay
      ? {
          icon: '🆔',
          label: t('projectCards.meta.code', 'رقم المشروع'),
          value: `#${projectCodeDisplay}`
        }
      : null,
    customerName
      ? {
          icon: '👤',
          label: t('projectCards.meta.client', 'العميل'),
          value: customerName
        }
      : null,
    // Company row hidden to match Projects page card
    typeLabel
      ? {
          icon: '🏷️',
          label: t('projectCards.meta.type', 'نوع المشروع'),
          value: typeLabel
        }
      : null,
    crewPreview
      ? {
          icon: '👥',
          label: t('projectCards.stats.crewLabel', 'عدد الطاقم'),
          value: crewPreview
        }
      : null,
    {
      icon: '📅',
      label: t('projectCards.meta.startDate', 'تاريخ البداية'),
      value: formatDateTimeLocalized(project?.start)
    },
    {
      icon: '📅',
      label: t('projectCards.meta.endDate', 'تاريخ النهاية'),
      value: project?.end ? formatDateTimeLocalized(project.end) : '—'
    }
  ].filter(Boolean);

  const reservationStats = [
    {
      icon: '📦',
      label: t('projectCards.stats.equipmentCount', 'عدد المعدات'),
      value: normalizeNumbers(String(equipmentCountTotal))
    },
    {
      icon: '😎',
      label: t('projectCards.stats.crewCount', 'عدد أفراد الطاقم'),
      value: normalizeNumbers(String(crewAssignmentsTotal))
    },
    {
      icon: '💵',
      label: t('projectCards.stats.reservationValue', 'إجمالي الحجوزات'),
      value: formatCurrencyLocalized(reservationsTotal)
    }
  ];

  const paymentStats = [
    {
      icon: '💳',
      label: t('projectCards.stats.paymentStatus', 'حالة الدفع'),
      value: paymentStatusLabel
    },
    {
      icon: '💸',
      label: t('projectCards.stats.expensesTotal', 'خدمات إنتاجية (التكلفة)'),
      value: formatCurrencyLocalized(projectTotals.expensesTotal)
    },
    {
      icon: '💵',
      label: t('projects.details.summary.finalTotal', 'الإجمالي النهائي', 'Final Total'),
      value: formatCurrencyLocalized(finalTotal)
    }
  ];

  const sectionsHtml = [
    buildCardSection('projectCards.groups.meta', 'بيانات المشروع', metaRows),
    buildCardSection('projectCards.groups.reservations', 'موجز الحجز', reservationStats),
    buildCardSection('projectCards.groups.payment', 'ملخص الدفع', paymentStats)
  ].filter(Boolean).join('');

  const confirmedLabel = t('projects.focus.confirmed', '✅ مشروع مؤكد');
  const pendingLabel = t('projects.focus.pending', '⌛ بانتظار التأكيد');
  const confirmChipClass = confirmed ? 'status-confirmed' : 'status-pending';
  const confirmText = confirmed ? confirmedLabel : pendingLabel;
  const actionsHtml = `<div class="project-focus-card__actions"><span class="reservation-chip ${confirmChipClass} project-focus-card__confirm-indicator">${escapeHtml(confirmText)}</span></div>`;

  const topBadges = [projectCodeBadge, categoryBadge, statusChip, paymentChip]
    .filter(Boolean)
    .join('\n          ');
  const cardClassNames = ['project-focus-card', ...cardStateClasses].join(' ');

  return `
    <div class="project-card-grid__item">
      <article class="${cardClassNames}" data-project-id="${projectIdAttr}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${topBadges}
        </div>
        <h6 class="project-focus-card__title">${escapeHtml(title)}</h6>
        <p class="project-focus-card__description">${descriptionText}</p>
        <div class="project-focus-card__sections">
          ${sectionsHtml}
        </div>
        ${actionsHtml}
      </article>
    </div>
  `;
}

function buildCardSection(titleKey, fallback, rows = []) {
  if (!rows.length) return '';
  const rowsHtml = rows
    .map(({ icon, label, value }) => {
      const iconHtml = icon ? `<span class="project-focus-card__row-icon">${escapeHtml(icon)}</span>` : '';
      return `
        <div class="project-focus-card__row">
          <span class="project-focus-card__row-label">${iconHtml}${escapeHtml(label)}</span>
          <span class="project-focus-card__row-value">${escapeHtml(String(value))}</span>
        </div>
      `;
    })
    .join('');

  return `
    <div class="project-focus-card__section">
      <span class="project-focus-card__section-title">${escapeHtml(t(titleKey, fallback))}</span>
      <div class="project-focus-card__section-box">
        ${rowsHtml}
      </div>
    </div>
  `;
}

function buildCrewPreview(names = []) {
  if (!names.length) return '';
  const previewNames = names.slice(0, MAX_CREW_PREVIEW);
  const extraCount = names.length - previewNames.length;
  const separator = getCurrentLanguage() === 'ar' ? '، ' : ', ';
  let text = previewNames.join(separator);
  if (extraCount > 0) {
    text += `${separator}+${normalizeNumbers(String(extraCount))}`;
  }
  return text;
}

export function buildProjectDetailsMarkup(project, { customer = null, reservations = [] } = {}) {
  const normalizedReservations = normalizeProjectReservations(reservations);
  const reservationList = normalizedReservations.map(({ reservation }) => reservation);
  const projectTotals = resolveProjectTotals(project);
  const reservationsTotalRaw = reservationList.reduce((sum, reservation) => sum + resolveReservationNetTotal(reservation), 0);
  const reservationsTotal = Number(reservationsTotalRaw.toFixed(2));
  const reservationsCount = reservationList.length;
  const combinedTaxAmount = projectTotals.applyTax
    ? Number(((projectTotals.subtotal + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((projectTotals.subtotal + reservationsTotal + combinedTaxAmount).toFixed(2));

  const status = determineProjectStatus(project);
  const statusLabel = t(`projects.status.${status}`, statusLabelsFallback[status]);
  const statusChipClass = statusChipClassMap[status] || 'status-confirmed';

  const projectIdentifier = getProjectIdentifier(project) || '';
  const projectCodeValue = project?.projectCode || (projectIdentifier ? `PRJ-${normalizeNumbers(projectIdentifier)}` : '');
  const projectCodeDisplay = projectCodeValue
    ? normalizeNumbers(String(projectCodeValue).replace(/^#/, ''))
    : '';
  const projectCodeChip = projectCodeDisplay
    ? `<span class="project-code-badge">#${escapeHtml(projectCodeDisplay)}</span>`
    : '';

  const applyTax = projectTotals.applyTax;
  const vatChipText = applyTax
    ? t('projects.details.chips.vatOn', 'شامل الضريبة 15٪')
    : t('projects.details.chips.vatOff', 'غير شامل الضريبة');
  const vatChipClass = applyTax ? 'status-paid' : 'status-unpaid';

  const paymentStatusValue = project?.paymentStatus === 'paid' ? 'paid' : 'unpaid';
  const paymentStatusText = t(
    `projects.paymentStatus.${paymentStatusValue}`,
    paymentStatusValue === 'paid' ? 'Paid' : 'Unpaid'
  );
  const paymentStatusChipClass = paymentStatusValue === 'paid' ? 'status-paid' : 'status-unpaid';

  const reservationsChipTemplate = t('projects.details.chips.reservations', '{count} حجوزات');
  const reservationsChipText = reservationsChipTemplate.replace(
    '{count}',
    normalizeNumbers(String(reservationsCount))
  );

  const confirmedChipHtml = project?.confirmed === true || project?.confirmed === 'true'
    ? `<span class="reservation-chip status-confirmed">${escapeHtml(t('projects.focus.confirmed', '✅ مشروع مؤكد'))}</span>`
    : '';

  const customerName = customer?.customerName || project?.clientName || '';
  const companyName = (project?.clientCompany || customer?.companyName || '').trim();
  const descriptionRaw = (project?.description || '').trim();
  const descriptionDisplay = descriptionRaw || t('projects.fallback.noDescription', 'لا يوجد وصف');

  const infoRows = [
    projectCodeDisplay ? { icon: '🆔', label: t('projects.details.labels.code', 'رقم المشروع'), value: `#${projectCodeDisplay}` } : null,
    customerName ? { icon: '👤', label: t('projects.details.client', 'العميل'), value: customerName } : null,
    companyName ? { icon: '🏢', label: t('projects.details.company', 'شركة العميل'), value: companyName } : null,
    { icon: '🏷️', label: t('projects.details.type', 'نوع المشروع'), value: getProjectTypeLabel(project?.type) },
    { icon: '🗓️', label: t('projects.details.labels.start', 'تاريخ البداية'), value: formatDateTimeDetailed(project?.start) },
    { icon: '🗓️', label: t('projects.details.labels.end', 'تاريخ النهاية'), value: project?.end ? formatDateTimeDetailed(project.end) : '—' },
    { icon: '🔗', label: t('projects.details.labels.reservationsCount', 'عدد الحجوزات'), value: normalizeNumbers(String(reservationsCount)) }
  ].filter(Boolean);

  const expensesTitle = t('projects.details.expenses', 'المصروفات ({amount})')
    .replace('{amount}', formatCurrencyLocalized(projectTotals.expensesTotal));
  const expensesContent = projectTotals.expensesTotal > 0
    ? `<ul class="project-details-list">${(project?.expenses || []).map((expense) => `
          <li>
            <span class="project-expense-label">${escapeHtml(expense.label ?? '')}</span>
            <span class="project-expense-amount">${formatCurrencyLocalized(expense.amount)}</span>
            ${((expense?.note ?? expense?.notes) ? `<div class=\"text-muted small\">${escapeHtml(String(expense.note ?? expense.notes))}</div>` : '')}
          </li>
        `).join('')}</ul>`
    : `<div class="text-muted">${escapeHtml(t('projects.details.noItems', 'لا يوجد'))}</div>`;

  // Build financial summary for the modal
  let summaryDetails = [];
  summaryDetails.push({ icon: '💳', label: t('projects.details.summary.paymentStatus', 'حالة الدفع'), value: paymentStatusText });

  if (reservationsCount > 0) {
    // Aggregate reservation financials
    const agg = reservationList.reduce((acc, res) => {
      const f = (typeof computeReservationFinancials === 'function') ? computeReservationFinancials(res) : null;
      if (f && typeof f === 'object') {
        acc.equipment += Number(f.equipmentTotal || 0);
        acc.crew += Number(f.crewTotal || 0);
        acc.crewCost += Number(f.crewCostTotal || 0);
      }
      return acc;
    }, { equipment: 0, crew: 0, crewCost: 0 });

    const expensesTotal = Number(projectTotals.expensesTotal || 0);
    const gross = Number((agg.equipment + agg.crew).toFixed(2));

    // Project discount on gross
    const discountVal = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
    const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
    let discountAmount = discountType === 'amount' ? discountVal : (gross * (discountVal / 100));
    if (!Number.isFinite(discountAmount) || discountAmount < 0) discountAmount = 0;
    if (discountAmount > gross) discountAmount = gross;

    // Company share after discount (coupled with VAT)
    const applyTaxRaw = project?.applyTax === true || project?.applyTax === 'true';
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
    const applyTax = applyTaxRaw || (shareEnabled && rawShare > 0);
    const sharePercent = (shareEnabled && applyTax && rawShare > 0) ? rawShare : 0;
    const baseAfterDiscount = Math.max(0, gross - discountAmount);
    const companyShareAmount = Number(((baseAfterDiscount) * (sharePercent / 100)).toFixed(2));

    // VAT after company share
    const taxAmount = applyTax ? Number(((baseAfterDiscount + companyShareAmount) * PROJECT_TAX_RATE).toFixed(2)) : 0;

    // Net profit = gross - discount - share - VAT - expenses - crew cost
    const netProfit = Number((baseAfterDiscount - companyShareAmount - taxAmount - expensesTotal - agg.crewCost).toFixed(2));

    // Final total = gross - discount + share + VAT
    const finalTotal = Number((baseAfterDiscount + companyShareAmount + taxAmount).toFixed(2));

    if (agg.equipment > 0) summaryDetails.push({ icon: '🎛️', label: t('projects.details.summary.equipmentTotal', 'إجمالي المعدات'), value: formatCurrencyLocalized(agg.equipment) });
    if (agg.crew > 0) summaryDetails.push({ icon: '😎', label: t('projects.details.summary.crewTotal', 'إجمالي الفريق'), value: formatCurrencyLocalized(agg.crew) });
    if (agg.crewCost > 0) summaryDetails.push({ icon: '🧾', label: t('projects.details.summary.crewCostTotal', 'تكلفة الفريق'), value: formatCurrencyLocalized(agg.crewCost) });
    if (expensesTotal > 0) summaryDetails.push({ icon: '🧾', label: t('projects.details.summary.expensesTotal', 'تكلفة الخدمات الإنتاجية'), value: formatCurrencyLocalized(expensesTotal) });
    summaryDetails.push({ icon: '🧮', label: t('projects.details.summary.gross', 'الإجمالي'), value: formatCurrencyLocalized(gross) });
    if (discountAmount > 0) summaryDetails.push({ icon: '🏷️', label: t('projects.details.summary.discount', 'الخصم'), value: `−${formatCurrencyLocalized(discountAmount)}` });
    if (companyShareAmount > 0) summaryDetails.push({ icon: '🏦', label: t('projects.details.summary.companyShare', 'نسبة الشركة'), value: `−${formatCurrencyLocalized(companyShareAmount)}` });
    if (taxAmount > 0) summaryDetails.push({ icon: '💸', label: t('projects.details.summary.tax', 'الضريبة (15٪)'), value: `−${formatCurrencyLocalized(taxAmount)}` });
    summaryDetails.push({ icon: '💵', label: t('projects.details.summary.netProfit', 'صافي الربح'), value: formatCurrencyLocalized(netProfit) });
    summaryDetails.push({ icon: '💰', label: t('projects.details.summary.finalTotal', 'المجموع النهائي'), value: formatCurrencyLocalized(finalTotal) });
  } else {
    // Fallback: show existing simple summary when there are no reservations
    summaryDetails.push({ icon: '💼', label: t('projects.details.summary.projectSubtotal', 'إجمالي المشروع'), value: formatCurrencyLocalized(projectTotals.subtotal) });
    summaryDetails.push({ icon: '🧮', label: t('projects.details.summary.combinedTax', 'إجمالي الضريبة الكلية (15٪)'), value: formatCurrencyLocalized(combinedTaxAmount) });
    summaryDetails.push({ icon: '💰', label: t('projects.details.summary.overallTotal', 'الإجمالي الكلي'), value: formatCurrencyLocalized(overallTotal) });
  }

  const summaryDetailsHtml = summaryDetails.map(({ icon, label, value }) => `
    <div class="summary-details-row">
      <span class="summary-details-label">${escapeHtml(icon)} ${escapeHtml(label)}</span>
      <span class="summary-details-value">${escapeHtml(value)}</span>
    </div>
  `).join('');

  const reservationsSection = buildProjectReservationsSection({
    project,
    reservations: normalizedReservations
  });

  return `
    <div class="project-details-header mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h5 class="mb-2 d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted project-details-title-label">${escapeHtml(t('projects.details.labels.projectTitle', 'اسم المشروع'))}:</span>
            <span class="fw-bold project-details-title-text">${escapeHtml((project?.title || '').trim() || t('projects.fallback.untitled', 'Untitled project'))}</span>
            ${projectCodeChip}
          </h5>
        </div>
        <div class="status-chips d-flex flex-wrap gap-2">
          <span class="status-chip ${statusChipClass}">${escapeHtml(statusLabel)}</span>
          <span class="status-chip ${vatChipClass}">${escapeHtml(vatChipText)}</span>
          <span class="reservation-chip ${paymentStatusChipClass}">${escapeHtml(paymentStatusText)}</span>
          <span class="reservation-chip status-confirmed">${escapeHtml(reservationsChipText)}</span>
          ${confirmedChipHtml}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${infoRows.map(({ icon, label, value }) => renderProjectInfoRow(icon, label, value)).join('')}
    </div>
    <div class="project-details-section mb-4">
      <h6>${escapeHtml(t('projects.details.labels.notes', 'ملاحظات المشروع'))}</h6>
      <div class="project-notes">${escapeHtml(descriptionDisplay)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${escapeHtml(expensesTitle)}</h6>
      ${expensesContent}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${summaryDetailsHtml}
    </div>
    ${reservationsSection}
  `;
}

export function buildProjectReservationsSection({ reservations = [], project = null } = {}) {
  const normalized = normalizeProjectReservations(reservations);
  const sorted = [...normalized].sort((a, b) => {
    const aStart = a?.reservation?.start ? new Date(a.reservation.start).getTime() : 0;
    const bStart = b?.reservation?.start ? new Date(b.reservation.start).getTime() : 0;
    return bStart - aStart;
  });

  const title = t('projects.details.reservations.title', 'الحجوزات المرتبطة');
  const emptyText = t('projects.details.reservations.empty', 'لا توجد حجوزات مرتبطة بهذا المشروع بعد.');
  const listMarkup = sorted.length
    ? `<div class="project-reservations-list">${sorted.map(({ reservation, index }) => buildProjectReservationCard(reservation, index, project)).join('')}</div>`
    : `<div class="alert alert-info project-reservations-empty mb-0">${escapeHtml(emptyText)}</div>`;

  return `
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex align-items-center gap-2 flex-wrap">
        <h6 class="mb-0">${escapeHtml(title)}</h6>
      </div>
      ${listMarkup}
    </section>
  `;
}



export function buildProjectReservationCard(reservation, index = -1, project = null) {
  const reservationIdentifier = getReservationIdentifier(reservation) ?? '-';
  const reservationId = normalizeNumbers(String(reservationIdentifier));
  const rangeLabel = formatDateRangeDetailed(reservation?.start, reservation?.end);
  const netTotal = resolveReservationNetTotal(reservation);
  const costLabel = formatCurrencyLocalized(netTotal);

  const itemsCount = normalizeNumbers(String((reservation?.items || []).length));
  const crewCountValue = normalizeNumbers(String((reservation?.technicians || []).length));
  const itemsLabel = t('projects.details.reservations.itemsCount', '{count} معدة').replace('{count}', itemsCount);
  const crewLabel = t('projects.details.reservations.crewCount', '{count} من الطاقم').replace('{count}', crewCountValue);

  const { effectiveConfirmed: statusConfirmed } = resolveReservationProjectState(reservation, project);
  const statusLabel = statusConfirmed
    ? t('reservations.list.status.confirmed', '✅ مؤكد')
    : t('reservations.list.status.pending', '⏳ غير مؤكد');
  const statusClass = statusConfirmed
    ? 'project-reservation-card__badge--confirmed'
    : 'project-reservation-card__badge--pending';

  const paid = reservation?.paid === true || reservation?.paid === 'paid';
  const paidLabel = paid
    ? t('reservations.list.payment.paid', '💳 مدفوع')
    : t('reservations.list.payment.unpaid', '💳 غير مدفوع');
  const paidClass = paid
    ? 'project-reservation-card__badge--paid'
    : 'project-reservation-card__badge--unpaid';

  const completed = isReservationCompleted(reservation);
  const completedBadge = completed
    ? `<span class="project-reservation-card__badge project-reservation-card__badge--completed">${escapeHtml(t('reservations.list.status.completed', '📁 منتهي'))}</span>`
    : '';

  const indexAttr = Number.isInteger(index) && index >= 0 ? ` data-index="${index}"` : '';
  const viewButton = `<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${escapeHtml(String(reservationIdentifier ?? ''))}"${indexAttr}>${escapeHtml(t('projects.details.reservations.view', 'عرض الحجز'))}</button>`;

  return `
    <article class="project-reservation-card" data-reservation-id="${escapeHtml(reservationId)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${escapeHtml(reservationId)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${statusClass}">${escapeHtml(statusLabel)}</span>
          <span class="project-reservation-card__badge ${paidClass}">${escapeHtml(paidLabel)}</span>
          ${completedBadge}
        </div>
      </div>
      <div class="project-reservation-card__range">${escapeHtml(rangeLabel)}</div>
      <div class="project-reservation-card__meta">
        <span>📦 ${escapeHtml(itemsLabel)}</span>
        <span>😎 ${escapeHtml(crewLabel)}</span>
      </div>
      <div class="project-reservation-card__footer">
        <span class="text-muted">${escapeHtml(t('projectCards.stats.reservationValue', 'إجمالي الحجوزات'))}</span>
        <span class="fw-bold">${escapeHtml(costLabel)}</span>
        ${viewButton}
      </div>
    </article>
  `;
}

export function renderProjectInfoRow(icon, label, value) {
  return `
    <div class="res-info-row">
      <span class="label">${escapeHtml(icon)} ${escapeHtml(label)}</span>
      <span class="separator">:</span>
      <span class="value">${escapeHtml(value)}</span>
    </div>
  `;
}

export function resolveProjectTotals(project) {
  const equipmentEstimate = Number(project?.equipmentEstimate) || 0;
  const expensesTotal = calculateProjectExpenses(project);
  const baseSubtotal = equipmentEstimate + expensesTotal;
  const applyTaxRaw = project?.applyTax === true || project?.applyTax === 'true';

  const discountValue = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  let discountAmount = discountType === 'amount'
    ? discountValue
    : baseSubtotal * (discountValue / 100);
  if (!Number.isFinite(discountAmount) || discountAmount < 0) {
    discountAmount = 0;
  }
  if (discountAmount > baseSubtotal) {
    discountAmount = baseSubtotal;
  }

  const subtotalAfterDiscount = Math.max(0, baseSubtotal - discountAmount);

  const companyShareEnabled = project?.companyShareEnabled === true
    || project?.companyShareEnabled === 'true'
    || project?.company_share_enabled === true
    || project?.company_share_enabled === 'true';
  const rawSharePercent = Number.parseFloat(
    project?.companySharePercent
      ?? project?.company_share_percent
      ?? project?.companyShare
      ?? project?.company_share
      ?? 0
  ) || 0;
  // Couple VAT/share: if share is set, VAT is effectively ON
  const applyTax = applyTaxRaw || (companyShareEnabled && rawSharePercent > 0);
  const sharePercent = companyShareEnabled && applyTax && rawSharePercent > 0 ? rawSharePercent : 0;
  const companyShareAmount = sharePercent > 0
    ? Number((subtotalAfterDiscount * (sharePercent / 100)).toFixed(2))
    : 0;

  const subtotal = subtotalAfterDiscount + companyShareAmount;

  let taxAmount = applyTax ? subtotal * PROJECT_TAX_RATE : 0;
  if (!Number.isFinite(taxAmount) || taxAmount < 0) {
    taxAmount = 0;
  }
  taxAmount = Number(taxAmount.toFixed(2));

  let totalWithTax = applyTax ? Number(project?.totalWithTax) : subtotal;
  if (applyTax) {
    if (!Number.isFinite(totalWithTax) || totalWithTax <= 0) {
      totalWithTax = Number((subtotal + taxAmount).toFixed(2));
    }
  } else {
    totalWithTax = subtotal;
  }

  return {
    equipmentEstimate,
    expensesTotal,
    baseSubtotal,
    discountAmount,
    subtotalAfterDiscount,
    companyShareAmount,
    subtotal,
    applyTax,
    taxAmount,
    totalWithTax
  };
}

export function resolveReservationNetTotal(reservation) {
  if (!reservation) return 0;
  const items = Array.isArray(reservation?.items) ? reservation.items : [];
  const discountRaw = reservation?.discount ?? reservation?.discountValue ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountTypeRaw = reservation?.discountType ?? reservation?.discount_type ?? 'percent';
  const discountType = String(discountTypeRaw).toLowerCase() === 'amount' ? 'amount' : 'percent';
  const crewAssignments = Array.isArray(reservation?.crewAssignments) ? reservation.crewAssignments : [];
  const technicians = crewAssignments.length
    ? crewAssignments
    : (Array.isArray(reservation?.technicians) ? reservation.technicians : []);

  // Net total for project-linked display should exclude VAT and company share
  const breakdown = calculateDraftFinancialBreakdown({
    items,
    technicianIds: Array.isArray(technicians) && !technicians.length ? technicians : [],
    crewAssignments: Array.isArray(technicians) && technicians.length && typeof technicians[0] === 'object' ? technicians : [],
    discount: discountValue,
    discountType,
    applyTax: false,
    start: reservation?.start,
    end: reservation?.end,
    companySharePercent: 0,
    groupingSource: reservation,
  });

  return Number.isFinite(Number(breakdown?.finalTotal)) ? Number(breakdown.finalTotal) : 0;
}

export function formatDateTimeLocalized(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-GB';
  const formatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  return normalizeNumbers(formatter.format(date));
}

export function formatDateTimeDetailed(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const hours24 = date.getHours();
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  const hours = String(hours12).padStart(2, '0');
  const formatted = `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
  return normalizeNumbers(formatted);
}

export function formatDateRangeDetailed(start, end) {
  if (!start) return '—';
  const startText = formatDateTimeDetailed(start);
  if (!end) return startText;
  return `${startText} - ${formatDateTimeDetailed(end)}`;
}

export function getProjectTypeLabel(type) {
  if (!type) return t('projects.form.types.unknown', 'نوع غير محدد');
  const keyMap = {
    commercial: 'projects.form.types.commercial',
    coverage: 'projects.form.types.coverage',
    photography: 'projects.form.types.photography',
    social: 'projects.form.types.social'
  };
  const key = keyMap[type] || 'projects.form.types.unknown';
  return t(key, type);
}

export function buildProjectEditMarkup(project, { clientName = '', clientCompany = '' } = {}) {
  const projectIdentifier = getProjectIdentifier(project) || '';
  const projectCodeValue = project?.projectCode || (projectIdentifier ? `PRJ-${normalizeNumbers(projectIdentifier)}` : '');
  const projectCodeDisplay = projectCodeValue ? normalizeNumbers(String(projectCodeValue)) : '';

  const typeOptions = buildProjectTypeOptions(project?.type);
  const startParts = splitDateTimeParts(project?.start || '');
  const endParts = splitDateTimeParts(project?.end || '');
  const paymentStatusRaw = typeof project?.paymentStatus === 'string' ? project.paymentStatus.toLowerCase() : '';
  const paymentStatus = ['paid', 'partial'].includes(paymentStatusRaw) ? paymentStatusRaw : 'unpaid';
  const applyTax = project?.applyTax === true || project?.applyTax === 'true';
  const descriptionValue = project?.description || '';
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  const discountValue = normalizeNumbers(String(project?.discount ?? project?.discountValue ?? 0));
  const rawSharePercent = project?.companySharePercent
    ?? project?.company_share_percent
    ?? project?.companyShare
    ?? project?.company_share
    ?? DEFAULT_COMPANY_SHARE_PERCENT;
  const sharePercentParsed = Number.parseFloat(normalizeNumbers(String(rawSharePercent)));
  const companyShareEnabled = project?.companyShareEnabled === true
    || project?.companyShareEnabled === 'true'
    || project?.company_share_enabled === true
    || project?.company_share_enabled === 'true'
    || (applyTax && Number.isFinite(sharePercentParsed) && sharePercentParsed > 0);
  const companySharePercent = Number.isFinite(sharePercentParsed) && sharePercentParsed > 0
    ? sharePercentParsed
    : DEFAULT_COMPANY_SHARE_PERCENT;
  const paymentProgressType = project?.paymentProgressType === 'amount'
    ? 'amount'
    : project?.paymentProgressType === 'percent'
      ? 'percent'
      : project?.payment_progress_type === 'amount'
        ? 'amount'
        : project?.payment_progress_type === 'percent'
          ? 'percent'
          : 'percent';
  const paymentProgressValue = normalizeNumbers(
    String(
      project?.paymentProgressValue
      ?? project?.payment_progress_value
      ?? (paymentProgressType === 'amount'
        ? project?.paidAmount ?? project?.paid_amount
        : project?.paidPercent ?? project?.paid_percent)
      ?? ''
    )
  );

  const projectCodeLabel = t('projects.details.labels.code', 'رقم المشروع');
  const clientLabel = t('projects.form.labels.client', 'العميل');
  const clientCompanyLabel = t('projects.form.labels.clientCompany', 'شركة العميل');

  const projectFacts = [
    projectCodeDisplay
      ? {
          icon: '🆔',
          label: projectCodeLabel,
          value: `#${projectCodeDisplay}`
        }
      : null,
    clientName
      ? {
          icon: '👤',
          label: clientLabel,
          value: clientName
        }
      : null,
    clientCompany
      ? {
          icon: '🏢',
          label: clientCompanyLabel,
          value: clientCompany
        }
      : null
  ].filter(Boolean);

  const factsMarkup = projectFacts.length
    ? `<div class="project-details-info mb-3">
        ${projectFacts.map(({ icon, label, value }) => renderProjectInfoRow(icon, label, value)).join('')}
      </div>`
    : '';

  const expensesListMarkup = buildProjectEditExpensesMarkup(Array.isArray(project?.expenses) ? project.expenses : []);

  return `
    <div class="project-details-edit">
      <div class="project-details-header mb-3">
        <h5 class="fw-bold mb-1">${escapeHtml(t('projects.details.edit.heading', 'تعديل المشروع'))}</h5>
        <p class="text-muted small mb-0">${escapeHtml(t('projects.details.edit.subheading', 'قم بتحديث بيانات المشروع ثم احفظ التغييرات.'))}</p>
      </div>
      ${factsMarkup}
      <form id="project-details-edit-form" class="project-details-edit-form">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label" for="project-edit-title">${escapeHtml(t('projects.form.labels.title', 'اسم المشروع'))}</label>
            <input type="text" class="form-control" id="project-edit-title" name="project-title" value="${escapeHtml(project?.title || '')}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-type">${escapeHtml(t('projects.form.labels.type', 'نوع المشروع'))}</label>
            <select class="form-select" id="project-edit-type" name="project-type" required>
              ${typeOptions}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-date">${escapeHtml(t('projects.form.labels.startDate', '📅 تاريخ البداية'))}</label>
            <input type="date" class="form-control" id="project-edit-start-date" name="project-start-date" value="${escapeHtml(startParts.date)}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-time">${escapeHtml(t('projects.form.labels.startTime', '⏰ وقت البداية'))}</label>
            <input type="time" class="form-control" id="project-edit-start-time" name="project-start-time" value="${escapeHtml(startParts.time)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-date">${escapeHtml(t('projects.form.labels.endDate', '📅 تاريخ النهاية'))}</label>
            <input type="date" class="form-control" id="project-edit-end-date" name="project-end-date" value="${escapeHtml(endParts.date)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-time">${escapeHtml(t('projects.form.labels.endTime', '⏰ وقت النهاية'))}</label>
            <input type="time" class="form-control" id="project-edit-end-time" name="project-end-time" value="${escapeHtml(endParts.time)}">
          </div>
          <div class="col-12">
            <label class="form-label" for="project-edit-description">${escapeHtml(t('projects.details.labels.notes', 'ملاحظات المشروع'))}</label>
            <textarea class="form-control" id="project-edit-description" name="project-description" rows="3">${escapeHtml(descriptionValue)}</textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-label">${escapeHtml(t('projects.form.labels.expenseLabel', 'اسم المصروف'))}</label>
            <input type="text" class="form-control" id="project-edit-expense-label" placeholder="${escapeHtml(t('projects.form.placeholders.expenseLabel', 'مثال: رسوم موقع التصوير'))}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-amount">${escapeHtml(t('projects.form.labels.expenseAmount', 'المبلغ (SR)'))}</label>
            <input type="text" class="form-control" id="project-edit-expense-amount" inputmode="decimal" placeholder="0">
            <label class="form-label mt-2" for="project-edit-expense-note">${escapeHtml(t('projects.form.labels.expenseNote', 'ملاحظات'))}</label>
            <input type="text" class="form-control" id="project-edit-expense-note" placeholder="${escapeHtml(t('projects.form.placeholders.expenseNote', 'تفاصيل إضافية'))}">
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-primary" data-action="add-expense">${escapeHtml(t('projects.form.buttons.addExpense', '➕ إضافة خدمة'))}</button>
          </div>
          <div class="col-12">
            <div id="project-edit-expense-list" class="project-edit-expense-list">
              ${expensesListMarkup}
            </div>
          </div>
        </div>
        <div class="row g-3 align-items-start mt-3">
          <div class="col-md-4">
            <label class="form-label" for="project-edit-discount">${escapeHtml(t('projects.form.labels.discount', 'الخصم'))}</label>
          <div class="input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select">
              <option value="percent" ${discountType === 'percent' ? 'selected' : ''}>${escapeHtml(t('projects.form.discount.percent', '٪ نسبة'))}</option>
              <option value="amount" ${discountType === 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.discount.amount', '💵 مبلغ'))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control" value="${escapeHtml(discountValue)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-md-4">
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
        <div class="col-md-4">
          <label class="form-label" for="project-edit-payment-status">${escapeHtml(t('projects.form.labels.paymentStatus', 'حالة الدفع'))}</label>
          <select class="form-select" id="project-edit-payment-status" name="project-payment-status">
            <option value="unpaid" ${paymentStatus === 'unpaid' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentStatus.unpaid', 'غير مدفوع'))}</option>
            <option value="partial" ${paymentStatus === 'partial' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentStatus.partial', 'مدفوع جزئياً'))}</option>
            <option value="paid" ${paymentStatus === 'paid' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentStatus.paid', 'مدفوع'))}</option>
          </select>
          <label class="form-label mt-2" for="project-edit-payment-progress-value">${escapeHtml(t('projects.form.paymentProgress.label', '💰 الدفعة المستلمة'))}</label>
          <div class="input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select">
              <option value="amount" ${paymentProgressType === 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentProgress.amount', '💵 مبلغ'))}</option>
              <option value="percent" ${paymentProgressType !== 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentProgress.percent', '٪ نسبة'))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control" value="${escapeHtml(paymentProgressValue)}" placeholder="0" inputmode="decimal">
          </div>
          <small class="text-muted">${escapeHtml(t('projects.form.paymentProgress.hint', 'أدخل المبلغ أو النسبة التي تم استلامها من قيمة المشروع'))}</small>
        </div>
      </div>

        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mt-4">
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-action="cancel-edit">${escapeHtml(t('projects.details.edit.cancel', 'إلغاء'))}</button>
            <button type="submit" class="btn btn-sm btn-primary">${escapeHtml(t('projects.details.edit.save', '💾 حفظ التعديلات'))}</button>
          </div>
        </div>
      </form>
    </div>
  `;
}

function buildProjectTypeOptions(selectedType) {
  const typeKeys = ['commercial', 'coverage', 'photography', 'social'];
  const options = typeKeys.map((type) => {
    const label = escapeHtml(t(`projects.form.types.${type}`, type));
    const selected = String(type) === String(selectedType) ? ' selected' : '';
    return `<option value="${type}"${selected}>${label}</option>`;
  });

  if (selectedType && !typeKeys.includes(selectedType)) {
    const fallbackLabel = escapeHtml(getProjectTypeLabel(selectedType));
    options.push(`<option value="${escapeHtml(String(selectedType))}" selected>${fallbackLabel}</option>`);
  }

  const placeholder = escapeHtml(t('projects.form.placeholders.type', 'اختر نوع المشروع'));
  return `<option value="">${placeholder}</option>${options.join('')}`;
}

export function buildProjectEditExpensesMarkup(expenses = []) {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    const emptyText = escapeHtml(t('projects.selected.emptyExpenses', 'لم يتم تسجيل أي مصروف'));
    return `<div class="text-muted small" data-empty>${emptyText}</div>`;
  }

  const removeLabel = escapeHtml(t('actions.remove', 'إزالة'));
  return expenses
    .map((expense) => {
      const label = escapeHtml(expense?.label || '');
      const amount = escapeHtml(formatCurrencyLocalized(expense?.amount || 0));
      const note = escapeHtml(String((expense?.note ?? expense?.notes) || ''));
      const id = escapeHtml(String(expense?.id || ''));
      return `
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${label}</div>
            <div class="text-muted small">${amount}${note ? ' • ' + note : ''}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${id}" aria-label="${removeLabel}">✖</button>
        </div>
      `;
    })
    .join('');
}

export function splitDateTimeParts(value) {
  if (!value) {
    return { date: '', time: '' };
  }

  let normalized = value;
  if (normalized.includes(' ')) {
    normalized = normalized.replace(' ', 'T');
  }

  const [datePart = '', timePartRaw = ''] = normalized.split('T');
  const timeMatch = timePartRaw.match(/(\d{1,2}:\d{2})/);
  return {
    date: datePart ? datePart.slice(0, 10) : '',
    time: timeMatch ? timeMatch[0] : ''
  };
}

export function combineDateAndTime(dateValue, timeValue) {
  if (!dateValue) return '';
  const normalizedTime = timeValue && /\d{1,2}:\d{2}/.test(timeValue) ? timeValue : '00:00';
  const [hours = '00', minutes = '00'] = normalizedTime.split(':');
  const safeHours = hours.padStart(2, '0');
  const safeMinutes = minutes.padStart(2, '0');
  return `${dateValue}T${safeHours}:${safeMinutes}`;
}

export function extractReservationProjectId(reservation) {
  if (!reservation) return null;
  const value = reservation.projectId ?? reservation.project_id ?? reservation.projectID ?? null;
  return value != null ? String(value) : null;
}

export async function syncProjectReservationsPayment(projectId, paymentStatus) {
  if (!projectId) return;
  const reservations = getReservationsState();
  const targets = reservations.filter((reservation) => {
    const reservationProjectId = extractReservationProjectId(reservation);
    return reservationProjectId && reservationProjectId === String(projectId);
  });

  if (!targets.length) {
    return;
  }

  const shouldBePaid = paymentStatus === 'paid';
  const desiredStatusValue = shouldBePaid ? 'paid' : 'unpaid';
  let changed = false;

  for (const reservation of targets) {
    const reservationId = reservation?.id ?? reservation?.reservationId ?? reservation?.reservation_id;
    if (!reservationId) continue;

    const currentPaidNormalized = reservation?.paid === true || reservation?.paid === 'paid';
    const currentStatusValue = reservation?.paidStatus ?? reservation?.paymentStatus ?? (currentPaidNormalized ? 'paid' : 'unpaid');

    if (currentPaidNormalized === shouldBePaid && currentStatusValue === desiredStatusValue) {
      continue;
    }

    try {
      await updateReservationApi(reservationId, {
        paid_status: desiredStatusValue,
        paid: shouldBePaid
      });
      changed = true;
    } catch (error) {
      console.error('❌ [projectFocusTemplates] Failed to sync reservation payment status', error);
    }
  }

  if (changed) {
    document.dispatchEvent(new CustomEvent('reservations:changed'));
  }
}
