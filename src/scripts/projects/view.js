import { userCanManageDestructiveActions } from '../auth.js';
import { t } from '../language.js';
import { normalizeNumbers, showToast } from '../utils.js';
import { calculateReservationTotal, calculateDraftFinancialBreakdown, calculatePaymentProgress, determinePaymentStatus } from '../reservationsSummary.js';
import { state, dom } from './state.js';
import { resolveReservationProjectState, buildReservationDisplayGroups } from '../reservationsShared.js';
import {
  MAX_FOCUS_CARDS,
  ONE_HOUR_IN_MS,
  PROJECT_TAX_RATE,
  statusBadgeClass,
  statusFallbackLabels
} from './constants.js';
import {
  escapeHtml,
  formatCurrency,
  formatDateTime,
  getEmptyText,
  setTableCount
} from './formatting.js';
import {
  combineProjectDateTime,
  getProjectCreatedTimestamp,
  getProjectStartTimestamp,
  truncateText
} from './helpers.js';

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

export function renderProjects() {
  if (!dom.projectsTableBody) return;
  const search = state.filters.search;
  const filtered = state.projects.filter((project) => {
    if (!search) return true;
    const client = state.customers.find((c) => String(c.id) === String(project.clientId));
    const haystack = normalizeNumbers([
      project.title,
      project.description,
      client?.customerName,
      project.clientCompany,
      getProjectTypeLabel(project.type),
      project.id,
      project.projectCode
    ].filter(Boolean).join(' ')).toLowerCase();
    return haystack.includes(search);
  });

  if (!filtered.length) {
    const emptyKey = state.projects.length === 0 ? 'projects.table.emptyInitial' : 'projects.table.emptyFiltered';
    const emptyFallback = state.projects.length === 0 ? 'لم يتم إنشاء مشاريع بعد.' : 'لا توجد مشاريع مطابقة.';
    const emptyText = escapeHtml(t(emptyKey, emptyFallback));
    dom.projectsTableBody.innerHTML = `<tr class="projects-table-empty-row"><td colspan="8" class="text-center text-muted">${emptyText}</td></tr>`;
    setTableCount(0);
    state.visibleProjects = [];
    renderTimeline([]);
    return;
  }

  // Sort by creation time (newest first). Fallback to start date when createdAt missing.
  const sortedProjects = [...filtered]
    .sort((a, b) => {
      const aCreated = getProjectCreatedTimestamp(a);
      const bCreated = getProjectCreatedTimestamp(b);
      if (Number.isFinite(aCreated) && Number.isFinite(bCreated) && aCreated !== bCreated) {
        return bCreated - aCreated;
      }
      const aStart = getProjectStartTimestamp(a);
      const bStart = getProjectStartTimestamp(b);
      if (Number.isFinite(aStart) && Number.isFinite(bStart)) {
        return bStart - aStart;
      }
      return 0;
    });

  state.visibleProjects = sortedProjects;
  setTableCount(sortedProjects.length);

  dom.projectsTableBody.innerHTML = sortedProjects
    .map((project) => renderProjectRow(project))
    .join('');

  renderTimeline(sortedProjects);
  renderFocusCards();
}

function renderProjectRow(project) {
  const client = state.customers.find((c) => String(c.id) === String(project.clientId));
  const clientName = client?.customerName || t('projects.fallback.unknownClient', 'عميل غير معروف');
  const companyName = (project.clientCompany || client?.companyName || '').trim();
  const crewCount = project.technicians?.length || 0;
  const equipmentCount = (project.equipment || []).reduce((sum, item) => sum + (item.qty || 0), 0);
  const { expensesTotal, totalWithTax } = resolveProjectTotals(project);
  const reservationsForProject = getReservationsForProject(project.id);
  const reservationsCount = reservationsForProject.length;
  const reservationsLabelTemplate = t('projects.table.reservationsCount', '{count} حجوزات');
  const reservationsLabel = reservationsLabelTemplate.replace('{count}', normalizeNumbers(String(reservationsCount)));
  const reservationsBadge = reservationsCount
    ? `<span class="badge rounded-pill project-reservations-chip">${escapeHtml(reservationsLabel)}</span>`
    : '';
  const typeLabel = escapeHtml(getProjectTypeLabel(project.type));
  const typeBadge = `<span class="badge project-type-badge">${typeLabel}</span>`;
  const projectCodeDisplay = project.projectCode || `PRJ-${normalizeNumbers(String(project.id))}`;
  const projectCodeBadge = `<span class="project-code-badge">#${escapeHtml(projectCodeDisplay)}</span>`;
  const canDelete = userCanManageDestructiveActions();
  const deleteButton = canDelete
    ? `<button class="btn btn-sm btn-outline-danger" data-action="delete-project" data-id="${project.id}">${escapeHtml(t('actions.delete', 'حذف'))}</button>`
    : '';

  return `
    <tr data-project-id="${project.id}">
      <td>
        <div class="d-flex flex-column gap-1">
          <div class="fw-bold">${escapeHtml(project.title)}</div>
          <div class="d-flex flex-wrap gap-2 align-items-center project-row-meta">
            ${projectCodeBadge}
            ${typeBadge}
          </div>
        </div>
        ${reservationsBadge}
      </td>
      <td>
        ${companyName
          ? `<div class="d-flex flex-column"><span>${escapeHtml(clientName)}</span><small class="text-muted">${escapeHtml(companyName)}</small></div>`
          : escapeHtml(clientName)}
      </td>
      <td>${combineProjectDateRange(project.start, project.end)}</td>
      <td>${normalizeNumbers(String(crewCount))}</td>
      <td>${normalizeNumbers(String(equipmentCount))}</td>
      <td>${formatCurrency(totalWithTax)}</td>
      <td>${formatCurrency(expensesTotal)}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary" data-action="view-details" data-id="${project.id}">${escapeHtml(t('actions.view', 'عرض'))}</button>
        ${deleteButton}
      </td>
    </tr>
  `;
}

function combineProjectDateRange(start, end) {
  if (!start) return '—';
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

  // Same-day project: show one date, then time range
  if (e.date && s.date === e.date) {
    const timeLine = (s.time && e.time) ? `من ${s.time} إلى ${e.time}` : '';
    return `
      <div class="date-range">
        <div class="date-line">${s.date}</div>
        ${timeLine ? `<div class="time-line">${timeLine}</div>` : ''}
      </div>
    `;
  }

  // Multi-day project: start date, end date, then time range
  const timeLine = (s.time && e.time) ? `من ${s.time} إلى ${e.time}` : '';
  return `
    <div class="date-range">
      <div class="date-line">${s.date}</div>
      ${e.date ? `<div class="date-line">${e.date}</div>` : ''}
      ${timeLine ? `<div class="time-line">${timeLine}</div>` : ''}
    </div>
  `;
}

// Helper for focus card: split date and time into separate rows
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

  if (e.date && s.date === e.date) {
    // same-day project
    dateHtml = `<div class=\"date-range\"><div class=\"date-line\">${s.date}</div></div>`;
    timeText = `من ${s.time || '—:—'} إلى ${e.time || '—:—'}`;
  } else {
    // multi-day project
    dateHtml = `<div class=\"date-range\">` +
      `<div class=\"date-line\">${s.date}</div>` +
      (e.date ? `<div class=\"date-line\">${e.date}</div>` : '') +
      `</div>`;
    timeText = `من ${s.time || '—:—'} إلى ${e.time || '—:—'}`;
  }

  return { dateHtml, timeText };
}

function renderTimeline(projectsForTimeline) {
  if (!dom.timeline) return;

  const sourceProjects = Array.isArray(projectsForTimeline)
    ? projectsForTimeline
    : (state.visibleProjects.length ? state.visibleProjects : state.projects);

  const timelineProjects = sourceProjects
    .map((project) => {
      if (!project?.start) return null;
      const startDate = new Date(project.start);
      if (Number.isNaN(startDate.getTime())) return null;

      let endDate = project.end ? new Date(project.end) : new Date(startDate);
      if (Number.isNaN(endDate.getTime())) {
        endDate = new Date(startDate);
      }

      if (endDate <= startDate) {
        endDate = new Date(startDate.getTime() + ONE_HOUR_IN_MS);
      }

      return { project, startDate, endDate };
    })
    .filter(Boolean)
    .sort((a, b) => a.startDate - b.startDate);

  if (!timelineProjects.length) {
    const emptyText = escapeHtml(t('projects.timeline.empty', dom.timeline.dataset.empty || 'لا توجد مشاريع ببيانات زمنية صالحة.'));
    dom.timeline.innerHTML = `<div class="project-timeline__empty text-muted">${emptyText}</div>`;
    return;
  }

  const minStart = timelineProjects[0].startDate.getTime();
  const maxEnd = Math.max(...timelineProjects.map((item) => item.endDate.getTime()));
  let totalSpan = maxEnd - minStart;
  if (totalSpan <= 0) {
    totalSpan = ONE_HOUR_IN_MS;
  }

  const conflicts = detectTimelineConflicts(timelineProjects);
  const rangeTemplate = t('projects.timeline.range', '{start} → {end}');
  const conflictLabel = t('projects.timeline.conflict', 'Scheduling conflict');

  const itemsMarkup = timelineProjects
    .map((item) => {
      const { project, startDate, endDate } = item;
      const duration = endDate.getTime() - startDate.getTime();
      let offset = ((startDate.getTime() - minStart) / totalSpan) * 100;
      offset = Math.max(0, Math.min(offset, 100));
      let width = (duration / totalSpan) * 100;
      width = Math.max(width, 2.5);
      if (offset + width > 100) {
        width = Math.max(1.5, 100 - offset);
      }

      const status = determineProjectStatus(project);
      const statusClass = `project-timeline__item--${status}`;
      const hasConflict = conflicts.has(project.id);
      const title = (project.title || '').trim() || t('projects.fallback.untitled', 'Untitled project');
      const displayLabel = truncateText(title, 26);
      const client = state.customers.find((c) => String(c.id) === String(project.clientId));
      const clientName = client?.customerName || t('projects.fallback.unknownClient', 'Unknown client');
      const companyName = (project.clientCompany || client?.companyName || '').trim();
      const typeLabel = getProjectTypeLabel(project.type);
      const startLabel = formatDateTime(startDate.toISOString());
      const endLabel = formatDateTime(endDate.toISOString());
      const rangeLabel = rangeTemplate.replace('{start}', startLabel).replace('{end}', endLabel);
      const tooltipClient = companyName ? `${clientName} (${companyName})` : clientName;
      const tooltip = `${title} • ${typeLabel} • ${tooltipClient} | ${rangeLabel}`;
      const conflictIcon = hasConflict
        ? `<span class="project-timeline__item-conflict" title="${escapeHtml(conflictLabel)}">⚠️</span>`
        : '';

      return `
        <div class="project-timeline__item ${statusClass}${hasConflict ? ' project-timeline__item--conflict' : ''}" style="left:${offset}%;width:${width}%;" title="${escapeHtml(tooltip)}">
          <span class="project-timeline__item-label">${escapeHtml(displayLabel)}</span>
          ${conflictIcon}
        </div>
      `;
    })
    .join('');

  const scaleMarkup = `
    <div class="project-timeline__scale">
      <span>${escapeHtml(formatDateTime(new Date(minStart).toISOString()))}</span>
      <span>${escapeHtml(formatDateTime(new Date(maxEnd).toISOString()))}</span>
    </div>
  `;

  dom.timeline.innerHTML = `
    ${scaleMarkup}
    <div class="project-timeline__track">
      ${itemsMarkup}
    </div>
  `;
}

function detectTimelineConflicts(items) {
  const conflicts = new Set();
  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      const a = items[i];
      const b = items[j];
      if (a.startDate < b.endDate && b.startDate < a.endDate) {
        conflicts.add(a.project.id);
        conflicts.add(b.project.id);
      }
    }
  }
  return conflicts;
}

export function renderFocusCards() {
  if (!dom.focusCards) return;

  const cards = buildFocusCards();
  if (!cards.length) {
    const emptyMessage = escapeHtml(t('projects.focus.empty', dom.focusCards.dataset.empty || 'لا توجد مشاريع لليوم أو هذا الأسبوع.'));
    dom.focusCards.innerHTML = `<div class="project-card-grid__item project-card-grid__item--full"><div class="alert alert-info mb-0 text-center">${emptyMessage}</div></div>`;
    return;
  }

  dom.focusCards.innerHTML = cards.join('');

  // Sections are always visible; no toggle required
}

function buildFocusCards() {
  if (!Array.isArray(state.projects) || !state.projects.length) return [];

  const today = state.projects.filter(isProjectToday);
  const thisWeek = state.projects.filter((project) => !isProjectToday(project) && isProjectThisWeek(project));

  const cards = [];
  const seen = new Set();

  const addCard = (project, category) => {
    if (!project || seen.has(project.id) || cards.length >= MAX_FOCUS_CARDS) return;
    seen.add(project.id);
    cards.push(renderFocusCard(project, category));
  };

  today
    .sort((a, b) => getProjectStartTimestamp(a) - getProjectStartTimestamp(b))
    .forEach((project) => addCard(project, 'today'));

  thisWeek
    .sort((a, b) => getProjectStartTimestamp(a) - getProjectStartTimestamp(b))
    .forEach((project) => addCard(project, 'thisWeek'));

  if (cards.length < MAX_FOCUS_CARDS) {
    const now = Date.now();
    const upcomingProjects = [...state.projects]
      .filter((project) => !seen.has(project.id))
      .filter((project) => {
        const startTime = getProjectStartTimestamp(project);
        return Number.isFinite(startTime) && startTime >= now;
      })
      .sort((a, b) => getProjectStartTimestamp(a) - getProjectStartTimestamp(b));

    upcomingProjects.forEach((project) => addCard(project, 'upcoming'));
  }

  // Fallback: include undated or invalid-date projects as most recent
  if (cards.length < MAX_FOCUS_CARDS) {
    const undated = [...state.projects]
      .filter((project) => !seen.has(project.id))
      .filter((project) => !Number.isFinite(getProjectStartTimestamp(project)))
      .sort((a, b) => getProjectCreatedTimestamp(b) - getProjectCreatedTimestamp(a));
    undated.forEach((project) => addCard(project, 'recent'));
  }

  // Last-resort fallback: show latest projects by start/created when nothing qualifies
  if (cards.length === 0) {
    const latest = [...state.projects]
      .sort((a, b) => getProjectCreatedTimestamp(b) - getProjectCreatedTimestamp(a))
      .slice(0, MAX_FOCUS_CARDS);
    latest.forEach((project) => addCard(project, 'recent'));
  }

  if (cards.length < MAX_FOCUS_CARDS) {
    const fallbackProjects = [...state.projects]
      .filter((project) => !seen.has(project.id))
      .sort((a, b) => getProjectCreatedTimestamp(b) - getProjectCreatedTimestamp(a));

    fallbackProjects.forEach((project) => addCard(project, 'recent'));
  }

  return cards;
}

function renderFocusCard(project, category) {
  const client = state.customers.find((c) => String(c.id) === String(project.clientId));
  const clientName = client?.customerName || t('projects.fallback.unknownClient', 'عميل غير معروف');
  const companyName = (project.clientCompany || client?.companyName || '').trim();
  const crewCount = Array.isArray(project.technicians) ? project.technicians.length : 0;
  const reservationsForProject = getReservationsForProject(project.id);
  const reservationsCount = reservationsForProject.length;
  const expensesTotal = getProjectExpenses(project);
  const servicesClientPrice = Number(project?.servicesClientPrice ?? 0);
  const { subtotal: projectSubtotal, applyTax } = resolveProjectTotals(project);
  const description = (project.description || '').trim();
  const descriptionText = description
    ? truncateText(description, 110)
    : t('projects.fallback.noDescription', 'لا يوجد وصف');
  const typeLabel = getProjectTypeLabel(project.type);
  // Derive payment status from combined total (project subtotal + linked reservations + combined VAT)
  const baseTotals = resolveProjectTotals(project) || {};
  // Use the same taxable base used in modal: (subtotalAfterDiscount + companyShareAmount)
  // In this module, resolveProjectTotals returns this base as `subtotal`.
  const projectTaxableBase = Number(baseTotals.subtotal || 0);
  const combinedReservationsTotal = (reservationsForProject || []).reduce((sum, res) => sum + (Number(res?.totalAmount) || resolveReservationNetTotal(res) || 0), 0);
  const combinedTax = baseTotals.applyTax
    ? Number(((projectTaxableBase + combinedReservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const combinedTotalWithTax = Number((projectTaxableBase + combinedReservationsTotal + combinedTax).toFixed(2));
  const projHistory = project.paymentHistory || project.payments || [];
  const projProgress = calculatePaymentProgress({
    totalAmount: combinedTotalWithTax,
    // إذا كان لدينا سجل دفعات فعلي، لا نمرّر paidAmount/paidPercent حتى لا تتكرر القيم
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
  const cardPaymentClass = paymentStatus === 'paid'
    ? 'project-focus-card--paid'
    : 'project-focus-card--unpaid';
  const isConfirmed = project.confirmed === true || project.confirmed === 'true';
  const projectIdAttr = escapeHtml(String(project.id));
  const projectCodeValue = project.projectCode || `PRJ-${normalizeNumbers(String(project.id))}`;
  const projectCodeDisplay = normalizeNumbers(projectCodeValue);

  // Optional debug hook via ?paymentDebug=1
  try {
    const url = new URL(window.location.href);
    const v = (url.searchParams.get('paymentDebug') || '').toLowerCase();
    const debug = v === '1' || v === 'true' || v === 'yes';
    if (debug) {
      // eslint-disable-next-line no-console
      console.debug('[PaymentDebug][card]', {
        projectId: project?.id,
        projectTaxableBase,
        combinedReservationsTotal,
        combinedTax,
        combinedTotalWithTax,
        paidAmount: projProgress.paidAmount,
        paidPercent: projProgress.paidPercent,
        paymentStatus,
      });
    }
  } catch (_) { /* ignore debug errors */ }

  const categoryKeyMap = {
    today: 'projects.focus.today',
    thisWeek: 'projects.focus.thisWeek',
    upcoming: 'projects.focus.upcoming',
    recent: 'projects.focus.recent'
  };
  const categoryFallbackMap = {
    today: "Today's Projects",
    thisWeek: 'This Week',
    upcoming: 'Upcoming Projects',
    recent: 'Latest Projects'
  };
  const categoryKey = categoryKeyMap[category] || categoryKeyMap.recent;
  const categoryLabel = t(categoryKey, categoryFallbackMap[category] || categoryFallbackMap.recent);
  const statusBase = determineProjectStatus(project);
  const status = (project?.cancelled === true || project?.status === 'cancelled' || project?.status === 'canceled') ? 'cancelled' : statusBase;
  const statusLabel = t(`projects.status.${status}`, statusFallbackLabels[status] || status);
  // Detect scheduling conflicts (overlap with any other project interval)
  const hasConflict = (() => {
    try {
      const startA = project.start ? new Date(project.start) : null;
      const endA = project.end ? new Date(project.end) : (startA ? new Date(startA.getTime() + ONE_HOUR_IN_MS) : null);
      if (!startA || !endA || Number.isNaN(startA.getTime()) || Number.isNaN(endA.getTime())) return false;
      return state.projects.some((other) => {
        if (!other || String(other.id) === String(project.id)) return false;
        const startB = other.start ? new Date(other.start) : null;
        const endB = other.end ? new Date(other.end) : (startB ? new Date(startB.getTime() + ONE_HOUR_IN_MS) : null);
        if (!startB || !endB || Number.isNaN(startB.getTime()) || Number.isNaN(endB.getTime())) return false;
        const latestStart = Math.max(startA.getTime(), startB.getTime());
        const earliestEnd = Math.min(endA.getTime(), endB.getTime());
        return latestStart < earliestEnd; // overlap
      });
    } catch (_) { return false; }
  })();
  // Unify visuals with timeline legend
  const statusKey = (hasConflict && (status === 'upcoming' || status === 'ongoing')) ? 'conflict' : status;
  const statusChipClass = statusKey === 'upcoming'
    ? 'timeline-status-badge timeline-status-badge--upcoming'
    : statusKey === 'ongoing'
      ? 'timeline-status-badge timeline-status-badge--ongoing'
      : statusKey === 'completed'
        ? 'timeline-status-badge timeline-status-badge--completed'
        : statusKey === 'cancelled'
          ? 'timeline-status-badge timeline-status-badge--cancelled'
          : 'timeline-status-badge timeline-status-badge--conflict';
  const title = (project.title || '').trim() || t('projects.fallback.untitled', 'Untitled project');
  const cardStateClasses = statusKey === 'cancelled' ? [] : [cardPaymentClass];
  if (statusKey === 'cancelled') {
    cardStateClasses.push('project-focus-card--cancelled');
  } else if (isConfirmed) {
    // لا نظهر حالة مؤكد إذا كان المشروع ملغياً
    cardStateClasses.push('project-focus-card--confirmed');
  }

  // Aggregate reservation totals in a tax-neutral way to avoid double counting tax
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
    const net = resolveReservationNetTotal(res);
    const equipmentCount = (() => {
      try {
        const { groups } = buildReservationDisplayGroups(res);
        return (groups || []).reduce((sum, g) => {
          const type = String(g?.type || '').toLowerCase();
          if (type === 'package') {
            const items = Array.isArray(g?.packageItems) ? g.packageItems : [];
            const uniq = new Set(items.map((it) => (it?.normalizedBarcode || it?.barcode || it?.equipmentId || '').toString()));
            return sum + uniq.size;
          }
          const c = Number.isFinite(Number(g?.count)) ? Number(g.count)
            : (Number.isFinite(Number(g?.quantity)) ? Number(g.quantity) : 1);
          return sum + (c > 0 ? c : 1);
        }, 0);
      } catch (_) {
        const items = Array.isArray(res?.items) ? res.items : [];
        return items.length || 0;
      }
    })();
    const crewCountLocal = (res.technicians || []).length;
    return {
      netTotal: acc.netTotal + net,
      equipmentMoney: acc.equipmentMoney + Number(breakdown.equipmentTotal || 0),
      crewMoney: acc.crewMoney + Number(breakdown.crewTotal || 0),
      equipmentCount: acc.equipmentCount + equipmentCount,
      crewCount: acc.crewCount + crewCountLocal,
    };
  }, { netTotal: 0, equipmentMoney: 0, crewMoney: 0, equipmentCount: 0, crewCount: 0 });

  const reservationsTotal = Number(agg.netTotal.toFixed(2));
  const equipmentCountTotal = agg.equipmentCount;
  const crewAssignmentsTotal = agg.crewCount || crewCount;
  // Compute final total using the same formula as project details/cards
  // Align with project details modal: use services client price (not expenses cost)
  const servicesNumber = Number(servicesClientPrice || 0);
  const grossBeforeDiscount = Number((agg.equipmentMoney + agg.crewMoney + servicesNumber).toFixed(2));
  const discountVal = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  let discountAmount = discountType === 'amount' ? discountVal : (grossBeforeDiscount * (discountVal / 100));
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
  // New rule: company share applies only when VAT is enabled
  const sharePercent = (shareEnabled && applyTax && rawShare > 0) ? rawShare : 0;
  const companyShareAmount = Number(((baseAfterDiscount) * (sharePercent / 100)).toFixed(2));
  const taxAmountAfterShare = applyTax
    ? Number(((baseAfterDiscount + companyShareAmount) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const finalTotal = Number((baseAfterDiscount + companyShareAmount + taxAmountAfterShare).toFixed(2));

  const projectCodeBadge = `<span class="project-code-badge project-focus-card__code">#${escapeHtml(projectCodeDisplay)}</span>`;
  // Hide top type badge; we will highlight type inside the project summary
  const typeBadge = '';
  // Remove category tag (e.g., Today's Projects) from the card header per request
  const categoryMetaTag = '';
  const statusText = t(`projects.status.${statusKey}`, statusKey);
  const statusChip = `<span class="${statusChipClass}">${escapeHtml(statusText)}</span>`;
  const paymentChip = `<span class="reservation-chip ${paymentChipClass} project-focus-card__payment-chip">${escapeHtml(paymentStatusLabel)}</span>`;

  const buildRow = (icon, label, value) => {
    const valueStr = String(value || '');
    const trimmed = valueStr.trim();
    // Allow safe HTML for internally generated markup (chips, date/time blocks)
    const isSafeHtml = trimmed.startsWith('<');
    return `
      <div class="project-focus-card__row">
        <span class="project-focus-card__row-label">
          ${icon ? `<span class="project-focus-card__row-icon">${escapeHtml(icon)}</span>` : ''}
          ${escapeHtml(label)}
        </span>
        <span class="project-focus-card__row-value">${isSafeHtml ? valueStr : escapeHtml(valueStr)}</span>
      </div>
    `;
  };

  const { dateHtml: projectDateHtml, timeText: projectTimeText } = buildProjectDateTimeRows(project.start, project.end);

  const projectInfoRows = [
    { icon: '👤', label: t('projects.details.client', 'العميل'), value: clientName },
    // Hide company on the card per request
    // companyName ? { icon: '🏢', label: t('projects.details.company', 'شركة العميل'), value: companyName } : null,
    { icon: '🏷️', label: t('projects.details.type', 'نوع المشروع'), value: `<span class=\"project-type-chip project-type-chip--${(project.type || 'default')}\">${escapeHtml(typeLabel)}</span>` },
    { icon: '📅', label: t('projects.focus.summary.range', 'الفترة الزمنية'), value: projectDateHtml },
    projectTimeText ? { icon: '⏰', label: t('projects.focus.summary.time', 'الوقت'), value: projectTimeText } : null
  ].filter(Boolean).map(({ icon, label, value }) => buildRow(icon, label, value)).join('');

  const includesTaxLabel = (sharePercent > 0 && applyTax) ? ` ${t('projects.details.chips.vatOn', '(شامل الضريبة)', 'Includes VAT')}` : '';
  const finalTotalLabel = `${t('projects.details.summary.finalTotal', 'المجموع النهائي', 'Final Total')}${includesTaxLabel}`;

  const financialRows = [
    // Hide payment status row per request
    // { icon: '💳', label: t('projectCards.stats.paymentStatus', 'حالة الدفع'), value: paymentStatusLabel },
    // Hide total expenses on the card per request
    // { icon: '💸', label: t('projectCards.stats.expensesTotal', 'خدمات إنتاجية (التكلفة)'), value: formatCurrency(expensesTotal) },
    { icon: '💼', label: t('projectCards.stats.servicesClientPrice', 'الخدمات الإنتاجية'), value: formatCurrency(servicesClientPrice) },
    { icon: '💵', label: finalTotalLabel, value: formatCurrency(finalTotal) }
  ].map(({ icon, label, value }) => buildRow(icon, label, value)).join('');

  const reservationRows = [
    { icon: '🔗', label: t('projectCards.stats.reservationsShort', 'الحجوزات'), value: normalizeNumbers(String(reservationsCount)) },
    { icon: '📦', label: t('projectCards.stats.equipmentCount', 'عدد المعدات'), value: normalizeNumbers(String(equipmentCountTotal)) },
    { icon: '😎', label: t('projectCards.stats.crewCount', 'عدد الطاقم'), value: normalizeNumbers(String(crewAssignmentsTotal)) },
    { icon: '💵', label: t('projectCards.stats.reservationValue', 'إجمالي الحجوزات'), value: formatCurrency(reservationsTotal) }
  ].map(({ icon, label, value }) => buildRow(icon, label, value)).join('');

  const confirmationControl = statusKey === 'cancelled'
    ? `<span class="reservation-chip status-cancelled project-focus-card__confirm-indicator">${escapeHtml(t('projects.focus.cancelled', 'مشروع ملغي', 'Cancelled project'))}</span>`
    : (isConfirmed
      ? `<span class="reservation-chip status-confirmed project-focus-card__confirm-indicator">${escapeHtml(t('projects.focus.confirmed', '✅ مشروع مؤكد'))}</span>`
      : `<button class="btn btn-sm btn-success project-focus-card__confirm-btn" data-action="confirm-project" data-id="${projectIdAttr}">${escapeHtml(t('projects.focus.actions.confirm', '✔️ تأكيد المشروع'))}</button>`);

  return `
    <div class="project-card-grid__item">
      <article class="project-focus-card ${cardStateClasses.filter(Boolean).join(' ')}" data-project-id="${projectIdAttr}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${projectCodeBadge}
          ${typeBadge}
          ${categoryMetaTag}
          ${statusChip}
          ${paymentChip}
        </div>
        <h6 class="project-focus-card__title">${escapeHtml(title)}</h6>
        <p class="project-focus-card__description">${escapeHtml(descriptionText)}</p>
        <div class="project-focus-card__sections">
          <div class="project-focus-card__section">
            <span class="project-focus-card__section-title">${escapeHtml(t('projects.focus.summary.project', 'ملخص المشروع'))}</span>
            <div class="project-focus-card__section-box">
              ${projectInfoRows}
            </div>
          </div>
          <!-- Show reservations above the financial summary -->
          <div class="project-focus-card__section">
            <span class="project-focus-card__section-title">${escapeHtml(t('projects.focus.summary.reservations', 'الحجوزات المرتبطة'))}</span>
            <div class="project-focus-card__section-box">
              ${reservationRows}
            </div>
          </div>
          <div class="project-focus-card__section">
            <span class="project-focus-card__section-title">${escapeHtml(t('projects.focus.summary.payment', 'الملخص المالي'))}</span>
            <div class="project-focus-card__section-box">
              ${financialRows}
            </div>
          </div>
        </div>
        <div class="project-focus-card__actions project-focus-card__actions--single">
          ${confirmationControl}
        </div>
      </article>
    </div>
  `;
}

function isProjectToday(project) {
  if (!project?.start) return false;
  const start = new Date(project.start);
  if (Number.isNaN(start.getTime())) return false;
  const now = new Date();
  return start.getFullYear() === now.getFullYear() &&
    start.getMonth() === now.getMonth() &&
    start.getDate() === now.getDate();
}

function isProjectThisWeek(project) {
  if (!project?.start) return false;
  const start = new Date(project.start);
  if (Number.isNaN(start.getTime())) return false;

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? 6 : day - 1;
  startOfWeek.setDate(startOfWeek.getDate() - diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  return start >= startOfWeek && start < endOfWeek;
}

export function determineProjectStatus(project) {
  const now = new Date();
  const start = project.start ? new Date(project.start) : null;
  const end = project.end ? new Date(project.end) : null;

  if (start && !Number.isNaN(start.getTime()) && start > now) {
    return 'upcoming';
  }

  if (end && !Number.isNaN(end.getTime()) && end < now) {
    return 'completed';
  }

  return 'ongoing';
}

export function getProjectExpenses(project) {
  if (typeof project.expensesTotal === 'number') {
    return project.expensesTotal;
  }
  if (Array.isArray(project.expenses)) {
    return project.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  }
  return 0;
}

export function resolveProjectTotals(project) {
  const equipmentEstimate = Number(project?.equipmentEstimate) || 0;
  const expensesTotal = getProjectExpenses(project);
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
  const sharePercent = (companyShareEnabled && applyTax && rawSharePercent > 0) ? rawSharePercent : 0;
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

export function updateSummary() {
  const totalProjects = state.projects.length;
  const upcoming = state.projects.filter((project) => {
    const start = project.start ? new Date(project.start) : null;
    if (!start || Number.isNaN(start.getTime())) return false;
    return start > new Date();
  }).length;
  const expensesTotal = state.projects.reduce((sum, project) => sum + resolveProjectTotals(project).expensesTotal, 0);
  const budgetTotal = state.projects.reduce((sum, project) => sum + resolveProjectTotals(project).totalWithTax, 0);

  if (dom.projectsCount) dom.projectsCount.textContent = normalizeNumbers(String(totalProjects));
  if (dom.projectsUpcoming) dom.projectsUpcoming.textContent = normalizeNumbers(String(upcoming));
  if (dom.projectsExpenses) dom.projectsExpenses.textContent = formatCurrency(expensesTotal);
  if (dom.projectsBudget) dom.projectsBudget.textContent = formatCurrency(budgetTotal);
}

export function getReservationsForProject(projectId) {
  if (!projectId) return [];
  return state.reservations.filter((reservation) => {
    const pid = reservation?.projectId ?? reservation?.project_id ?? null;
    return pid != null && String(pid) === String(projectId);
  });
}

export function resolveReservationNetTotal(reservation) {
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
    { start: reservation.start, end: reservation.end, companySharePercent: 0 }
  );

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation.cost ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
}

function computeReservationEquipmentCount(reservation) {
  try {
    const { groups } = buildReservationDisplayGroups(reservation);
    return (groups || []).reduce((sum, g) => {
      const type = String(g?.type || '').toLowerCase();
      if (type === 'package') {
        const items = Array.isArray(g?.packageItems) ? g.packageItems : [];
        const uniq = new Set(items.map((it) => (it?.normalizedBarcode || it?.barcode || it?.equipmentId || '').toString()));
        return sum + uniq.size;
      }
      const c = Number.isFinite(Number(g?.count)) ? Number(g.count)
        : (Number.isFinite(Number(g?.quantity)) ? Number(g.quantity) : 1);
      return sum + (c > 0 ? c : 1);
    }, 0);
  } catch (_) {
    const items = Array.isArray(reservation?.items) ? reservation.items : [];
    return items.length || 0;
  }
}

export function buildProjectReservationCard(reservation, index, project = null) {
  if (!reservation) return '';
  const reservationId = reservation.reservationId || reservation.id || `RES-${index + 1}`;
  const rawStatus = reservation.status || reservation.state || 'pending';
  const normalizedStatus = String(rawStatus).toLowerCase();
  // Link confirmation: if project is confirmed, reflect that on the tag regardless of stale reservation.status
  const { effectiveConfirmed } = resolveReservationProjectState(reservation, project);
  const finalStatus = effectiveConfirmed ? 'confirmed' : normalizedStatus;
  // Use the same translation keys used across reservations list to unify language/appearance
  const statusLabel = t(
    `reservations.list.status.${finalStatus}`,
    finalStatus === 'confirmed' ? '✅ مؤكد' : finalStatus === 'pending' ? '⏳ غير مؤكد' : finalStatus
  );
  const statusClassMap = {
    confirmed: 'project-reservation-card__badge--confirmed',
    pending: 'project-reservation-card__badge--pending',
    completed: 'project-reservation-card__badge--completed',
    in_progress: 'project-reservation-card__badge--info',
    ongoing: 'project-reservation-card__badge--info'
  };
  const statusClass = statusClassMap[finalStatus] || 'project-reservation-card__badge--info';
  // Link payment tag: support partial
  // When linked to a project, mirror the project's payment status on the reservation card
  const projectPaidRaw = typeof project?.paymentStatus === 'string' ? project.paymentStatus.toLowerCase() : null;
  const paidStatusRaw = projectPaidRaw && ['paid', 'partial', 'unpaid'].includes(projectPaidRaw)
    ? projectPaidRaw
    : String(
        reservation.paidStatus || reservation.paymentStatus || (reservation.paid ? 'paid' : 'unpaid')
      ).toLowerCase();
  const paidStatus = paidStatusRaw === 'paid' ? 'paid' : (paidStatusRaw === 'partial' ? 'partial' : 'unpaid');
  const paidLabel = paidStatus === 'paid'
    ? t('reservations.list.payment.paid', '💳 مدفوع')
    : paidStatus === 'partial'
      ? t('reservations.list.payment.partial', '💳 مدفوع جزئياً')
      : t('reservations.list.payment.unpaid', '💳 غير مدفوع');
  const paidClass = paidStatus === 'paid'
    ? 'project-reservation-card__badge--paid'
    : paidStatus === 'partial'
      ? 'project-reservation-card__badge--partial'
      : 'project-reservation-card__badge--unpaid';
  const completed = reservation.completed === true || reservation.completed === 'true';
  const completedLabel = t('reservations.details.completed', 'مكتمل');
  const completedBadge = completed
    ? `<span class="project-reservation-card__badge project-reservation-card__badge--completed">${escapeHtml(completedLabel)}</span>`
    : '';
  // Vertical meta: crew count, equipment count, and total only
  const netTotal = resolveReservationNetTotal(reservation);
  const costLabel = formatCurrency(netTotal);
  const equipmentCount = computeReservationEquipmentCount(reservation);
  const crewCount = (reservation.technicians || []).length;
  const crewTitle = t('projectCards.stats.crewCount', 'عدد الطاقم');
  const equipmentTitle = t('projectCards.stats.equipmentCount', 'عدد المعدات');
  const totalTitle = t('projectCards.stats.reservationTotal', 'إجمالي الحجز');

  return `
    <article class="project-reservation-card" data-action="view-reservation" data-index="${index}" data-reservation-index="${index}" data-project-id="${project ? project.id : ''}" role="button" tabindex="0">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${escapeHtml(reservationId)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${statusClass}">${escapeHtml(statusLabel)}</span>
          <span class="project-reservation-card__badge ${paidClass}">${escapeHtml(paidLabel)}</span>
          ${completedBadge}
        </div>
      </div>
      <div class="project-reservation-card__body">
        <div class="project-reservation-card__meta project-reservation-card__meta--vertical">
          <span>😎 ${escapeHtml(crewTitle)}: ${normalizeNumbers(String(crewCount))}</span>
          <span>📦 ${escapeHtml(equipmentTitle)}: ${normalizeNumbers(String(equipmentCount))}</span>
          <span>💵 ${escapeHtml(totalTitle)}: ${escapeHtml(costLabel)}</span>
        </div>
      </div>
    </article>
  `;
}

export function buildProjectReservationsSection(project) {
  const reservations = getReservationsForProject(project.id)
    .map((reservation) => {
      const rid = reservation?.id ?? reservation?.reservationId ?? reservation?.reservation_code ?? reservation?.reservation_id;
      const index = state.reservations.findIndex((entry) => {
        const cand = entry?.id ?? entry?.reservationId ?? entry?.reservation_code ?? entry?.reservation_id;
        return rid != null && cand != null && String(cand) === String(rid);
      });
      return { reservation, index };
    })
    .filter(({ index }) => Number.isInteger(index) && index >= 0)
    .sort((a, b) => {
      const aStart = a.reservation.start ? new Date(a.reservation.start).getTime() : 0;
      const bStart = b.reservation.start ? new Date(b.reservation.start).getTime() : 0;
      return bStart - aStart;
    });

  const title = t('projects.details.reservations.title', 'الحجوزات المرتبطة');
  const emptyText = t('projects.details.reservations.empty', 'لا توجد حجوزات مرتبطة بهذا المشروع بعد.');
  const listMarkup = reservations.length
    ? `<div class="project-reservations-list">${reservations.map(({ reservation, index }) => buildProjectReservationCard(reservation, index, project)).join('')}</div>`
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
