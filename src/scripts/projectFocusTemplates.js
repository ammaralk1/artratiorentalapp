import { normalizeNumbers } from './utils.js';
import { t, getCurrentLanguage } from './language.js';
import {
  determineProjectStatus,
  calculateProjectExpenses,
  truncateText,
  escapeHtml,
  formatCurrencyLocalized
} from './projectsCommon.js';
import { calculateReservationTotal } from './reservationsSummary.js';
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

const statusBadgeClass = {
  upcoming: 'bg-info',
  ongoing: 'bg-warning',
  completed: 'bg-success'
};

const statusChipClassMap = {
  upcoming: 'status-pending',
  ongoing: 'status-confirmed',
  completed: 'status-completed'
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

  const paymentStatus = project?.paymentStatus === 'paid' ? 'paid' : 'unpaid';
  const paymentStatusLabel = t(
    `projects.paymentStatus.${paymentStatus}`,
    paymentStatus === 'paid' ? 'Paid' : 'Unpaid'
  );
  const paymentChipClass = paymentStatus === 'paid' ? 'status-paid' : 'status-unpaid';
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
  const categoryBadge = typeLabel
    ? `<span class="badge project-focus-card__badge ${DEFAULT_CATEGORY_CLASS}">${escapeHtml(typeLabel)}</span>`
    : '';
  const statusChip = `<span class="project-focus-card__status-chip ${statusClass}">${escapeHtml(statusLabel)}</span>`;
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
    return {
      total: acc.total + net,
      equipment: acc.equipment + equipmentCount,
      crew: acc.crew + crewCount
    };
  }, { total: 0, equipment: 0, crew: 0 });

  const reservationsTotal = Number(totals.total.toFixed(2));
  const equipmentCountTotal = totals.equipment;
  const crewAssignmentsTotal = totals.crew || crewIds.length;

  const projectTotals = resolveProjectTotals(project);
  const combinedTaxAmount = projectTotals.applyTax
    ? Number(((projectTotals.subtotal + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((projectTotals.subtotal + reservationsTotal + combinedTaxAmount).toFixed(2));

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
    companyName
      ? {
          icon: '🏢',
          label: t('projectCards.meta.company', 'شركة العميل'),
          value: companyName
        }
      : null,
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
      label: t('projectCards.stats.expensesTotal', 'إجمالي المصاريف'),
      value: formatCurrencyLocalized(projectTotals.expensesTotal)
    },
    {
      icon: '💰',
      label: t('projectCards.stats.projectSubtotal', 'التكلفة التقديرية'),
      value: formatCurrencyLocalized(projectTotals.subtotal)
    },
    {
      icon: '🧾',
      label: t('projectCards.stats.taxTotal', 'الضريبة'),
      value: formatCurrencyLocalized(combinedTaxAmount)
    },
    {
      icon: '💵',
      label: t('projectCards.stats.overallTotal', 'المجموع الكلي'),
      value: formatCurrencyLocalized(overallTotal)
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
          </li>
        `).join('')}</ul>`
    : `<div class="text-muted">${escapeHtml(t('projects.details.noItems', 'لا يوجد'))}</div>`;

  const summaryDetails = [
    { icon: '💳', label: t('projects.details.summary.paymentStatus', 'حالة الدفع'), value: paymentStatusText },
    { icon: '💼', label: t('projects.details.summary.projectSubtotal', 'إجمالي المشروع'), value: formatCurrencyLocalized(projectTotals.subtotal) },
    { icon: '💵', label: t('projectCards.stats.reservationValue', 'إجمالي الحجوزات'), value: formatCurrencyLocalized(reservationsTotal) },
    { icon: '🧮', label: t('projects.details.summary.combinedTax', 'إجمالي الضريبة الكلية (15٪)'), value: formatCurrencyLocalized(combinedTaxAmount) },
    { icon: '💰', label: t('projects.details.summary.overallTotal', 'الإجمالي الكلي'), value: formatCurrencyLocalized(overallTotal) }
  ];

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
  const countTemplate = t('projects.details.reservations.count', '{count} حجوزات');
  const countBadge = sorted.length
    ? `<span class="badge project-reservations-count">${escapeHtml(countTemplate.replace('{count}', normalizeNumbers(String(sorted.length))))}</span>`
    : '';

  const projectId = project ? getProjectIdentifier(project) : null;
  const editLabel = t('projects.details.actions.edit', '✏️ تعديل المشروع');
  const editButton = projectId
    ? `<button type="button" class="btn btn-sm btn-warning" data-action="edit-project" data-project-id="${escapeHtml(String(projectId))}">${escapeHtml(editLabel)}</button>`
    : '';
  const actionsMarkup = editButton
    ? `<div class="d-flex flex-wrap gap-2">${editButton}</div>`
    : '';

  const listMarkup = sorted.length
    ? `<div class="project-reservations-list">${sorted.map(({ reservation, index }) => buildProjectReservationCard(reservation, index, project)).join('')}</div>`
    : `<div class="alert alert-info project-reservations-empty mb-0">${escapeHtml(emptyText)}</div>`;

  return `
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex justify-content-between align-items-center gap-2 flex-wrap">
        <div class="d-flex align-items-center gap-2">
          <h6 class="mb-0">${escapeHtml(title)}</h6>
          ${countBadge}
        </div>
        ${actionsMarkup}
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
  const subtotalRaw = equipmentEstimate + expensesTotal;
  const subtotal = Number(subtotalRaw.toFixed(2));
  const applyTax = project?.applyTax === true || project?.applyTax === 'true';

  let taxAmount = applyTax ? Number(project?.taxAmount) : 0;
  if (applyTax) {
    if (!Number.isFinite(taxAmount) || taxAmount < 0) {
      taxAmount = Number((subtotal * PROJECT_TAX_RATE).toFixed(2));
    }
  } else {
    taxAmount = 0;
  }

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
    subtotal,
    applyTax,
    taxAmount,
    totalWithTax
  };
}

export function resolveReservationNetTotal(reservation) {
  if (!reservation) return 0;
  const items = Array.isArray(reservation?.items) ? reservation.items : [];
  const discountRaw = reservation?.discount ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountType = reservation?.discountType || 'percent';
  const technicianIds = Array.isArray(reservation?.technicians) ? reservation.technicians : [];

  const calculated = calculateReservationTotal(
    items,
    discountValue,
    discountType,
    false,
    technicianIds,
    { start: reservation?.start, end: reservation?.end }
  );

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation?.cost ?? reservation?.total ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
}

export function formatDateTimeLocalized(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-GB';
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
  const paymentStatus = project?.paymentStatus === 'paid' ? 'paid' : 'unpaid';
  const applyTax = project?.applyTax === true || project?.applyTax === 'true';
  const descriptionValue = project?.description || '';

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
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-primary" data-action="add-expense">${escapeHtml(t('projects.form.buttons.addExpense', '➕ إضافة مصروف'))}</button>
          </div>
          <div class="col-12">
            <div id="project-edit-expense-list" class="project-edit-expense-list">
              ${expensesListMarkup}
            </div>
          </div>
        </div>
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mt-4">
          <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
            <div>
              <label class="form-label" for="project-edit-payment-status">${escapeHtml(t('projects.form.labels.paymentStatus', 'حالة الدفع'))}</label>
              <select class="form-select" id="project-edit-payment-status" name="project-payment-status">
                <option value="unpaid" ${paymentStatus !== 'paid' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentStatus.unpaid', 'غير مدفوع'))}</option>
                <option value="paid" ${paymentStatus === 'paid' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentStatus.paid', 'مدفوع'))}</option>
              </select>
            </div>
            <div class="form-check form-switch m-0 project-edit-tax">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${applyTax ? 'checked' : ''}>
              <label class="form-check-label" for="project-edit-tax">${escapeHtml(t('projects.form.taxLabel', 'شامل الضريبة (15٪)'))}</label>
            </div>
          </div>
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
