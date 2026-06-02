import { normalizeNumbers } from './utils.js';
import { t, getCurrentLanguage } from './language.js';
import {
  determineProjectStatus,
  calculateProjectExpenses,
  truncateText,
  escapeHtml,
  formatCurrencyLocalized
} from './projectsCommon.js';
import {
  calculateReservationTotal,
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculateDraftFinancialBreakdown,
  calculatePaymentProgress,
  determinePaymentStatus
} from './reservationsSummary.js';
import { formatDateTime } from './projects/formatting.js';
import { FOCUS_CARDS_PER_PAGE } from './projects/constants.js';
import { buildProjectsPageWindow, resolveProjectOverheadSettings } from './projects/helpers.js';
import { calculateProjectLineFinancials } from './projects/financials.js';
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

// Also expose a chip class map for places that still expect `statusChipClassMap`
// (e.g., details markup). Keep it aligned with Projects page timeline styles.
const statusChipClassMap = {
  upcoming: 'timeline-status-badge timeline-status-badge--upcoming',
  ongoing: 'timeline-status-badge timeline-status-badge--ongoing',
  completed: 'timeline-status-badge timeline-status-badge--completed',
  conflict: 'timeline-status-badge timeline-status-badge--conflict',
  cancelled: 'timeline-status-badge timeline-status-badge--cancelled'
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

// Match Projects page date/time presentation for cards
function buildProjectDateTimeRows(start, end) {
  if (!start) return { dateHtml: '—', timeText: '' };
  const startStr = formatDateTime(start);
  const endStr = end ? formatDateTime(end) : '';

  const split = (val) => {
    const parts = String(val).split(' ').filter(Boolean);
    const date = parts.shift() || '';
    const time = parts.join(' ');
    return { date, time };
  };

  const s = split(startStr);
  const e = endStr ? split(endStr) : { date: '', time: '' };
  let dateHtml = '';
  let timeText = '';

  const fromLabel = t('common.range.from', 'من');
  const toLabel = t('common.range.to', 'إلى');

  if (e.date && s.date === e.date) {
    // same-day project
    dateHtml = `<div class=\"date-range\"><div class=\"date-line\">${s.date}</div></div>`;
    timeText = `${fromLabel} ${s.time || '—:—'} ${toLabel} ${e.time || '—:—'}`;
  } else {
    // multi-day project
    dateHtml = `<div class=\"date-range\">` +
      `<div class=\"date-line\">${s.date}</div>` +
      (e.date ? `<div class=\"date-line\">${e.date}</div>` : '') +
      `</div>`;
    timeText = `${fromLabel} ${s.time || '—:—'} ${toLabel} ${e.time || '—:—'}`;
  }

  return { dateHtml, timeText };
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
  const reservationsCount = reservationList.length;
  const projectId = getProjectIdentifier(project);
  const projectIdAttr = projectId ? escapeHtml(projectId) : '';
  const lifecycle = resolveProjectFocusLifecycle(project);
  const status = lifecycle.status;
  const statusKey = lifecycle.statusKey;
  const statusClass = statusKey === 'upcoming'
    ? 'timeline-status-badge timeline-status-badge--upcoming'
    : statusKey === 'ongoing'
      ? 'timeline-status-badge timeline-status-badge--ongoing'
      : statusKey === 'completed'
        ? 'timeline-status-badge timeline-status-badge--completed'
        : statusKey === 'cancelled'
          ? 'timeline-status-badge timeline-status-badge--cancelled'
          : 'timeline-status-badge timeline-status-badge--conflict';
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
  const paymentStatusLabel = paymentStatus === 'paid'
    ? t('reservations.list.payment.paid', '💳 مدفوع')
    : paymentStatus === 'partial'
      ? t('reservations.list.payment.partial', '💳 مدفوع جزئياً')
      : t('reservations.list.payment.unpaid', '💳 غير مدفوع');
  const paymentChipBaseClass = paymentStatus === 'paid'
    ? 'status-paid'
    : paymentStatus === 'partial'
      ? 'status-partial'
      : 'status-unpaid';
  const isCompleted = statusKey === 'completed';
  const paymentChipClass = paymentChipBaseClass;
  const lifecycleCardClass = statusKey === 'cancelled'
    ? 'project-focus-card--cancelled'
    : statusKey === 'completed'
      ? 'project-focus-card--completed'
      : statusKey === 'ongoing'
        ? 'project-focus-card--ongoing'
        : statusKey === 'conflict'
          ? 'project-focus-card--conflict'
          : 'project-focus-card--upcoming';
  const cardStateClasses = [lifecycleCardClass];

  const confirmed = project?.confirmed === true || project?.confirmed === 'true';
  if (confirmed && statusKey !== 'cancelled' && statusKey !== 'completed') {
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
  const statusText = statusKey === 'upcoming'
    ? t('projects.focus.status.active', 'نشط')
    : statusKey === 'ongoing'
      ? t('projects.focus.status.running', 'جاري')
      : statusKey === 'completed'
        ? t('projects.focus.status.closed', 'مغلق')
        : t(`projects.status.${statusKey}`, statusLabelsFallback[statusKey] || statusKey);
  const statusChip = `<span class="${statusClass}">${escapeHtml(statusText)}</span>`;
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
  const servicesClientPrice = Number(project?.servicesClientPrice ?? 0);
  const discountValueRaw = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  const { sharePercent, enabled: companyShareEnabled } = resolveProjectOverheadSettings(project, { applyTaxRaw: projectTotals.applyTax });
  const clientAmounts = calculateProjectLineFinancials({
    equipmentRevenue: totals.equipment,
    crewRevenue: totals.crew,
    servicesRevenue: servicesClientPrice,
    discountValue: discountValueRaw,
    discountType,
    applyTax: projectTotals.applyTax,
    companyShareEnabled,
    companySharePercent: sharePercent,
  });
  const discountAmount = clientAmounts.discountAmount;
  const baseAfterDiscount = clientAmounts.subtotalAfterDiscount;
  const companyShareAmount = clientAmounts.companyShareAmount;
  const taxAmountAfterShare = clientAmounts.taxAmount;
  const finalTotal = clientAmounts.totalWithTax;

  const { dateHtml: projectDateHtml, timeText: projectTimeText } = buildProjectDateTimeRows(project?.start, project?.end);
  const metaRows = [
    customerName ? { icon: '👤', label: t('projects.details.client', 'العميل'), value: customerName } : null,
    // Company row hidden to match Projects page card
    typeLabel ? { icon: '🏷️', label: t('projects.details.type', 'نوع المشروع'), value: `<span class=\"project-type-chip project-type-chip--${getProjectTypeClass(project.type)}\">${escapeHtml(typeLabel)}</span>` } : null,
    { icon: '📅', label: t('projects.focus.summary.range', 'الفترة الزمنية'), value: projectDateHtml },
    projectTimeText ? { icon: '⏰', label: t('projects.focus.summary.time', 'الوقت'), value: projectTimeText } : null
  ].filter(Boolean);

  const reservationStats = [
    { icon: '🔗', label: t('projectCards.stats.reservationsShort', 'الحجوزات'), value: normalizeNumbers(String(reservationsCount)) },
    { icon: '📦', label: t('projectCards.stats.equipmentCount', 'عدد المعدات'), value: normalizeNumbers(String(equipmentCountTotal)) },
    { icon: '😎', label: t('projectCards.stats.crewCount', 'عدد أفراد الطاقم'), value: normalizeNumbers(String(crewAssignmentsTotal)) },
    { icon: '💵', label: t('projectCards.stats.reservationValue', 'إجمالي الحجوزات'), value: formatCurrencyLocalized(reservationsTotal) }
  ];

  const includesTaxLabel = (sharePercent > 0 && projectTotals.applyTax) ? ` ${t('projects.details.chips.vatOn', '(شامل الضريبة)', 'Includes VAT')}` : '';
  const finalTotalLabel = `${t('projects.details.summary.finalTotal', 'المجموع النهائي', 'Final Total')}${includesTaxLabel}`;
  const financialRowsHtml = [
    { icon: '💼', label: t('projectCards.stats.servicesClientPrice', 'الخدمات الإنتاجية'), value: formatCurrencyLocalized(servicesClientPrice) },
    { icon: '💵', label: finalTotalLabel, value: formatCurrencyLocalized(finalTotal) }
  ]
    .map(({ icon, label, value }) => buildProjectRow(icon, label, value))
    .join('');

  const reservationsRowsHtml = [
    { icon: '🔗', label: t('projectCards.stats.reservationsShort', 'الحجوزات'), value: normalizeNumbers(String(reservationsCount)) },
    { icon: '📦', label: t('projectCards.stats.equipmentCount', 'عدد المعدات'), value: normalizeNumbers(String(equipmentCountTotal)) },
    { icon: '😎', label: t('projectCards.stats.crewCount', 'عدد الطاقم'), value: normalizeNumbers(String(crewAssignmentsTotal)) },
    { icon: '💵', label: t('projectCards.stats.reservationValue', 'إجمالي الحجوزات'), value: formatCurrencyLocalized(reservationsTotal) }
  ]
    .map(({ icon, label, value }) => buildProjectRow(icon, label, value))
    .join('');

  const sectionsHtml = [
    buildFocusSection('projects.focus.summary.project', 'ملخص المشروع', metaRows),
    buildFocusSectionHtml('projects.focus.summary.reservations', 'الحجوزات المرتبطة', reservationsRowsHtml),
    buildFocusSectionHtml('projects.focus.summary.payment', 'الملخص المالي', financialRowsHtml)
  ].filter(Boolean).join('');

  let confirmationControl = '';
  if (statusKey === 'cancelled') {
    confirmationControl = `<span class="reservation-chip status-cancelled project-focus-card__confirm-indicator">${escapeHtml(t('projects.focus.cancelled', 'مشروع ملغي', 'Cancelled project'))}</span>`;
  } else if (!confirmed) {
    confirmationControl = `<button class=\"btn btn-sm btn-success project-focus-card__confirm-btn\" data-action=\"confirm-project\" data-id=\"${projectIdAttr}\">${escapeHtml(t('projects.focus.actions.confirm', '✔️ تأكيد المشروع'))}</button>`;
  } else if (statusKey !== 'completed') {
    confirmationControl = `<button class=\"btn btn-sm btn-warning project-focus-card__confirm-btn\" data-action=\"close-project\" data-id=\"${projectIdAttr}\">${escapeHtml(t('projects.actions.close', '🔒 إغلاق المشروع'))}</button>`;
  } else {
    confirmationControl = `<span class=\"reservation-chip status-completed project-focus-card__confirm-indicator\">${escapeHtml(t('projects.tag.closed', 'مغلق'))}</span>`;
  }
  const actionsHtml = `<div class="project-focus-card__actions project-focus-card__actions--single">${confirmationControl}</div>`;

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

function getProjectOrderValue(project) {
  const candidates = [project?.start, project?.end, project?.createdAt, project?.created_at, project?.updatedAt, project?.updated_at];
  for (const value of candidates) {
    if (!value) continue;
    const timestamp = new Date(value).getTime();
    if (Number.isFinite(timestamp)) return timestamp;
  }
  const numericId = Number(project?.id ?? project?.projectId ?? project?.project_id ?? 0);
  return Number.isFinite(numericId) ? numericId : 0;
}

function stripReservationTagDecorators(value) {
  return String(value || '')
    .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F\u200D#*0-9]+\s*/gu, '')
    .trim();
}

function resolveProjectFocusLifecycle(project) {
  const statusBase = determineProjectStatus(project);
  const status = (project?.cancelled === true || project?.status === 'cancelled' || project?.status === 'canceled')
    ? 'cancelled'
    : statusBase;
  const statusKey = status;
  const group = (statusKey === 'completed' || statusKey === 'cancelled') ? 'archive' : 'live';
  return { status, statusKey, group };
}

function sortProjectsForFocusGroup(projects, groupKey) {
  const priorityMap = groupKey === 'archive'
    ? { completed: 0, cancelled: 1 }
    : { ongoing: 0, conflict: 1, upcoming: 2 };

  return [...projects].sort((left, right) => {
    const leftLifecycle = resolveProjectFocusLifecycle(left);
    const rightLifecycle = resolveProjectFocusLifecycle(right);
    const leftPriority = priorityMap[leftLifecycle.statusKey] ?? 99;
    const rightPriority = priorityMap[rightLifecycle.statusKey] ?? 99;
    if (leftPriority !== rightPriority) return leftPriority - rightPriority;
    return getProjectOrderValue(right) - getProjectOrderValue(left);
  });
}

function getProjectTypeClass(type) {
  const normalizedType = String(type || '').trim().toLowerCase();
  return ['commercial', 'coverage', 'photography', 'social', 'event', 'conference'].includes(normalizedType)
    ? normalizedType
    : 'default';
}

function ensureProjectFocusGroupPagination(paginationState, sectionKey) {
  if (!paginationState[sectionKey]) {
    paginationState[sectionKey] = {
      page: 1,
      pageSize: FOCUS_CARDS_PER_PAGE,
      totalPages: 1,
    };
  }
  if (!paginationState[sectionKey].pageSize || paginationState[sectionKey].pageSize <= 0) {
    paginationState[sectionKey].pageSize = FOCUS_CARDS_PER_PAGE;
  }
  return paginationState[sectionKey];
}

function buildProjectFocusGroupSections(projects) {
  const groups = {
    live: [],
    archive: [],
  };

  projects.forEach((project) => {
    const lifecycle = resolveProjectFocusLifecycle(project);
    groups[lifecycle.group].push(project);
  });

  return [
    {
      key: 'live',
      title: t('projects.focus.sections.liveTitle', '⚡ مراجعة سريعة للمشاريع الحية'),
      hint: t('projects.focus.sections.liveHint', 'يعرض المشاريع الجارية والنشطة لتبدأ بالمهم أولاً.'),
      empty: t('projects.focus.sections.emptyLive', 'لا توجد مشاريع جارية أو نشطة ضمن النتائج الحالية.'),
      projects: sortProjectsForFocusGroup(groups.live, 'live'),
    },
    {
      key: 'archive',
      title: t('projects.focus.sections.archiveTitle', '🗂️ الأرشيف'),
      hint: t('projects.focus.sections.archiveHint', 'يعرض المشاريع المغلقة والملغاة بشكل منفصل للمراجعة الهادئة.'),
      empty: t('projects.focus.sections.emptyArchive', 'لا توجد مشاريع مغلقة أو ملغاة ضمن النتائج الحالية.'),
      projects: sortProjectsForFocusGroup(groups.archive, 'archive'),
    }
  ];
}

function renderProjectFocusGroupPagination({ sectionKey, totalItems, totalPages, currentPage, pageSize }) {
  if (totalPages <= 1) return '';

  const navLabel = t('projects.pagination.navigation', 'Projects pagination');
  const prevLabel = t('projects.pagination.prev', 'Previous page');
  const nextLabel = t('projects.pagination.next', 'Next page');
  const pageLabelTemplate = t('projects.pagination.page', 'Page {page}');
  const rangeTemplate = t('projects.pagination.range', 'Showing {from}-{to} of {total}');
  const rangeStart = totalItems === 0 ? 0 : ((currentPage - 1) * pageSize) + 1;
  const rangeEnd = totalItems === 0 ? 0 : Math.min(totalItems, currentPage * pageSize);
  const rangeText = rangeTemplate
    .replace('{from}', normalizeNumbers(String(rangeStart)))
    .replace('{to}', normalizeNumbers(String(rangeEnd)))
    .replace('{total}', normalizeNumbers(String(totalItems)));

  const buttonsHtml = buildProjectsPageWindow(currentPage, totalPages)
    .filter((page) => page >= 1 && page <= totalPages)
    .map((page) => {
      const active = page === currentPage;
      const pageLabel = pageLabelTemplate.replace('{page}', normalizeNumbers(String(page)));
      return `<button type="button" class="btn btn-sm ${active ? 'btn-primary' : 'btn-outline-primary'}" data-focus-section="${escapeHtml(sectionKey)}" data-focus-section-page="${page}" aria-label="${escapeHtml(pageLabel)}" ${active ? 'aria-current="page"' : ''}>${normalizeNumbers(String(page))}</button>`;
    })
    .join('');

  return `
    <div class="list-pagination project-focus-group__pagination" data-focus-section-pagination="${escapeHtml(sectionKey)}">
      <div class="list-pagination__summary text-muted small">${escapeHtml(rangeText)}</div>
      <div class="list-pagination__controls btn-group" role="group" aria-label="${escapeHtml(navLabel)}">
        <button type="button" class="btn btn-sm btn-outline-primary" data-focus-section="${escapeHtml(sectionKey)}" data-focus-section-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="${escapeHtml(prevLabel)}">‹</button>
        ${buttonsHtml}
        <button type="button" class="btn btn-sm btn-outline-primary" data-focus-section="${escapeHtml(sectionKey)}" data-focus-section-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''} aria-label="${escapeHtml(nextLabel)}">›</button>
      </div>
    </div>
  `;
}

export function buildProjectFocusGroups(projects, { paginationState = {}, renderCard } = {}) {
  const cardRenderer = typeof renderCard === 'function' ? renderCard : (project) => buildProjectFocusCard(project);
  return buildProjectFocusGroupSections(projects).map((section) => {
    const pagination = ensureProjectFocusGroupPagination(paginationState, section.key);
    const pageSize = Number.isFinite(pagination.pageSize) ? pagination.pageSize : FOCUS_CARDS_PER_PAGE;
    const totalItems = section.projects.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const currentPage = Math.min(Math.max(1, pagination.page || 1), totalPages);
    pagination.page = currentPage;
    pagination.totalPages = totalPages;
    const pagedProjects = section.projects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return `
      <section class="project-focus-group project-focus-group--${escapeHtml(section.key)}">
        <header class="project-focus-group__header">
          <div class="project-focus-group__title-wrap">
            <h6 class="project-focus-group__title">${escapeHtml(section.title)}</h6>
            <p class="project-focus-group__hint">${escapeHtml(section.hint)}</p>
          </div>
          <span class="ui-badge ui-badge--soft badge-soft project-focus-group__count">${normalizeNumbers(String(totalItems))}</span>
        </header>
        ${
          pagedProjects.length
            ? `<div class="project-card-grid project-focus-group__grid">${pagedProjects.map((project) => cardRenderer(project)).join('')}</div>`
            : `<p class="linked-records-empty-copy project-card-grid__item project-card-grid__item--full project-card-grid__empty-line project-focus-group__empty">${escapeHtml(section.empty)}</p>`
        }
        ${renderProjectFocusGroupPagination({
          sectionKey: section.key,
          totalItems,
          totalPages,
          currentPage,
          pageSize
        })}
      </section>
    `;
  }).join('');
}

export function handleProjectFocusGroupPaginationClick(event, { paginationState = {}, onChange } = {}) {
  const target = event?.target instanceof HTMLElement
    ? event.target.closest('button[data-focus-section-page]')
    : null;
  if (!target || target.disabled) return false;

  const sectionKey = target.dataset.focusSection;
  const page = Number.parseInt(target.dataset.focusSectionPage || '0', 10);
  if (!sectionKey || !Number.isInteger(page) || page < 1) return false;

  const sectionPagination = ensureProjectFocusGroupPagination(paginationState, sectionKey);
  if (page > sectionPagination.totalPages || page === sectionPagination.page) return true;

  sectionPagination.page = page;
  if (typeof onChange === 'function') {
    onChange({ sectionKey, page, target });
  }
  return true;
}

function buildProjectRow(icon, label, value) {
  const iconHtml = icon ? `<span class="project-focus-card__row-icon">${escapeHtml(icon)}</span>` : '';
  const valueStr = String(value ?? '');
  const trimmed = valueStr.trim();
  const isSafeHtml = trimmed.startsWith('<');
  const renderedValue = isSafeHtml ? valueStr : escapeHtml(valueStr);
  return `
    <div class="project-focus-card__row">
      <span class="project-focus-card__row-label">${iconHtml}${escapeHtml(label)}</span>
      <span class="project-focus-card__row-value">${renderedValue}</span>
    </div>
  `;
}

function buildFocusSection(titleKey, fallback, rows = []) {
  if (!rows.length) return '';
  const rowsHtml = rows
    .map(({ icon, label, value }) => buildProjectRow(icon, label, value))
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

function buildFocusSectionHtml(titleKey, fallback, innerHtml) {
  if (!innerHtml) return '';
  return `
    <div class="project-focus-card__section">
      <span class="project-focus-card__section-title">${escapeHtml(t(titleKey, fallback))}</span>
      <div class="project-focus-card__section-box">
        ${innerHtml}
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
    { icon: '🗓️', label: t('projects.details.labels.end', 'تاريخ النهاية'), value: project?.end ? formatDateTimeDetailed(project.end) : t('common.placeholder.empty', '—') },
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
    // Project discount on gross
    const discountVal = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
    const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';

    const applyTaxRaw = project?.applyTax === true || project?.applyTax === 'true';
    const { applyTax, sharePercent, enabled: companyShareEnabled } = resolveProjectOverheadSettings(project, { applyTaxRaw });
    const clientAmounts = calculateProjectLineFinancials({
      equipmentRevenue: agg.equipment,
      crewRevenue: agg.crew,
      discountValue: discountVal,
      discountType,
      applyTax,
      companyShareEnabled,
      companySharePercent: sharePercent,
      crewCost: agg.crewCost,
      servicesCost: expensesTotal,
    });
    const discountAmount = clientAmounts.discountAmount;
    const baseAfterDiscount = clientAmounts.subtotalAfterDiscount;
    const companyShareAmount = clientAmounts.companyShareAmount;

    // VAT after operating overhead
    const taxAmount = clientAmounts.taxAmount;

    // Net profit excludes VAT and treats operating overhead as an internal expense.
    const netProfit = clientAmounts.marginBeforeTax;

    const finalTotal = clientAmounts.totalWithTax;

    if (agg.equipment > 0) summaryDetails.push({ icon: '🎛️', label: t('projects.details.summary.equipmentTotal', 'إجمالي المعدات'), value: formatCurrencyLocalized(agg.equipment) });
    if (agg.crew > 0) summaryDetails.push({ icon: '😎', label: t('projects.details.summary.crewTotal', 'إجمالي الفريق'), value: formatCurrencyLocalized(agg.crew) });
    if (agg.crewCost > 0) summaryDetails.push({ icon: '🧾', label: t('projects.details.summary.crewCostTotal', 'تكلفة الفريق'), value: formatCurrencyLocalized(agg.crewCost) });
    if (expensesTotal > 0) summaryDetails.push({ icon: '🧾', label: t('projects.details.summary.expensesTotal', 'تكلفة الخدمات الإنتاجية'), value: formatCurrencyLocalized(expensesTotal) });
    summaryDetails.push({ icon: '🧮', label: t('projects.details.summary.gross', 'الإجمالي'), value: formatCurrencyLocalized(gross) });
    if (discountAmount > 0) summaryDetails.push({ icon: '🏷️', label: t('projects.details.summary.discount', 'الخصم'), value: `−${formatCurrencyLocalized(discountAmount)}` });
    if (companyShareAmount > 0) summaryDetails.push({ icon: '🏦', label: t('projects.details.summary.companyShare', 'المصاريف التشغيلية'), value: `−${formatCurrencyLocalized(companyShareAmount)}` });
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

  const rawStatus = String(reservation?.status || reservation?.reservationStatus || reservation?.state || '').trim().toLowerCase();
  const cancelled = reservation?.cancelled === true
    || reservation?.cancelled === 'true'
    || rawStatus === 'cancelled'
    || rawStatus === 'canceled'
    || rawStatus === 'ملغي'
    || rawStatus === 'ملغى';
  const completed = !cancelled && isReservationCompleted(reservation);
  const { effectiveConfirmed: statusConfirmed } = resolveReservationProjectState(reservation, project);
  const statusKey = cancelled
    ? 'cancelled'
    : completed
      ? 'completed'
      : statusConfirmed
        ? 'confirmed'
        : 'pending';
  const statusLabel = statusKey === 'cancelled'
    ? stripReservationTagDecorators(t('reservations.list.lifecycle.cancelled', 'ملغي'))
    : statusKey === 'completed'
      ? stripReservationTagDecorators(t('reservations.list.lifecycle.closed', 'مغلق'))
      : statusKey === 'confirmed'
        ? t('reservations.list.status.confirmed', '✅ مؤكد')
        : t('reservations.list.status.pending', '⏳ غير مؤكد');
  const statusClass = `reservation-chip status-${statusKey} project-reservation-card__badge--${statusKey}`;

  const paid = reservation?.paid === true || reservation?.paid === 'paid';
  const paidLabel = paid
    ? t('reservations.list.payment.paid', '💳 مدفوع')
    : t('reservations.list.payment.unpaid', '💳 غير مدفوع');
  const paidClass = paid
    ? 'reservation-chip status-paid project-reservation-card__badge--paid'
    : 'reservation-chip status-unpaid project-reservation-card__badge--unpaid';

  const indexAttr = Number.isInteger(index) && index >= 0 ? ` data-index="${index}"` : '';
  const viewButton = `<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${escapeHtml(String(reservationIdentifier ?? ''))}"${indexAttr}>${escapeHtml(t('projects.details.reservations.view', 'عرض الحجز'))}</button>`;

  return `
    <article class="project-reservation-card" data-reservation-id="${escapeHtml(reservationId)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${escapeHtml(reservationId)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${statusClass}">${escapeHtml(statusLabel)}</span>
          <span class="project-reservation-card__badge ${paidClass}">${escapeHtml(paidLabel)}</span>
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
  const servicesClientPrice = Number(project?.servicesClientPrice ?? project?.services_client_price ?? 0) || 0;
  const applyTaxRaw = project?.applyTax === true || project?.applyTax === 'true';

  const discountValue = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  const { applyTax, sharePercent, enabled: companyShareEnabled } = resolveProjectOverheadSettings(project, { applyTaxRaw });
  const clientAmounts = calculateProjectLineFinancials({
    equipmentRevenue: equipmentEstimate,
    servicesRevenue: servicesClientPrice,
    servicesCost: expensesTotal,
    discountValue,
    discountType,
    applyTax,
    companyShareEnabled,
    companySharePercent: sharePercent,
  });
  const discountAmount = clientAmounts.discountAmount;
  const subtotalAfterDiscount = clientAmounts.subtotalAfterDiscount;
  const companyShareAmount = clientAmounts.companyShareAmount;

  const subtotal = clientAmounts.taxableAmount;

  return {
    equipmentEstimate,
    expensesTotal,
    baseSubtotal: clientAmounts.baseSubtotal,
    discountAmount,
    subtotalAfterDiscount,
    companyShareAmount,
    subtotal,
    applyTax,
    taxAmount: clientAmounts.taxAmount,
    totalWithTax: clientAmounts.totalWithTax,
    marginBeforeTax: clientAmounts.marginBeforeTax,
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

  // Net total for project-linked display should exclude VAT and operating overhead
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
    social: 'projects.form.types.social',
    event: 'projects.form.types.event',
    conference: 'projects.form.types.conference'
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
  const companyShareEnabled = resolveProjectOverheadSettings(project, { applyTaxRaw: applyTax }).enabled
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
          <label class="form-label d-block" for="project-edit-company-share">${escapeHtml(t('projects.form.labels.companyShare', 'المصاريف التشغيلية والضريبة'))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${escapeHtml(String(companySharePercent))}" ${companyShareEnabled ? 'checked' : ''}>
              <label class="form-check-label" for="project-edit-company-share">${escapeHtml(t('projects.form.companyShareToggle', 'إضافة مصاريف تشغيلية (10٪)'))}</label>
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
