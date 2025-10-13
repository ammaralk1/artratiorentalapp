import { userCanManageDestructiveActions } from '../auth.js';
import { t } from '../language.js';
import { normalizeNumbers, showToast } from '../utils.js';
import { calculateReservationTotal } from '../reservationsSummary.js';
import { state, dom } from './state.js';
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

  const sortedProjects = [...filtered]
    .sort((a, b) => new Date(b.start || 0) - new Date(a.start || 0));

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
  const startText = formatDateTime(start);
  if (!end) return startText;
  return `${startText} - ${formatDateTime(end)}`;
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
  const { subtotal: projectSubtotal, applyTax } = resolveProjectTotals(project);
  const description = (project.description || '').trim();
  const descriptionText = description
    ? truncateText(description, 110)
    : t('projects.fallback.noDescription', 'لا يوجد وصف');
  const typeLabel = getProjectTypeLabel(project.type);
  const paymentStatus = project.paymentStatus === 'paid' ? 'paid' : 'unpaid';
  const paymentStatusLabel = t(`projects.paymentStatus.${paymentStatus}`, paymentStatus === 'paid' ? 'Paid' : 'Unpaid');
  const paymentChipClass = paymentStatus === 'paid' ? 'status-paid' : 'status-unpaid';
  const cardPaymentClass = paymentStatus === 'paid' ? 'project-focus-card--paid' : 'project-focus-card--unpaid';
  const isConfirmed = project.confirmed === true || project.confirmed === 'true';
  const projectIdAttr = escapeHtml(String(project.id));
  const projectCodeValue = project.projectCode || `PRJ-${normalizeNumbers(String(project.id))}`;
  const projectCodeDisplay = normalizeNumbers(projectCodeValue);

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
  const status = determineProjectStatus(project);
  const statusLabel = t(`projects.status.${status}`, statusFallbackLabels[status] || status);
  const statusClass = statusBadgeClass[status] || 'bg-secondary';
  const title = (project.title || '').trim() || t('projects.fallback.untitled', 'Untitled project');
  const cardStateClasses = [cardPaymentClass];
  if (isConfirmed) {
    cardStateClasses.push('project-focus-card--confirmed');
  }

  const reservationsTotals = reservationsForProject.reduce((acc, reservation) => {
    const net = resolveReservationNetTotal(reservation);
    const equipmentTotal = (reservation.items || []).reduce((sum, item) => sum + (Number(item?.qty) || 1), 0);
    const crewTotal = (reservation.technicians || []).length;
    return {
      total: acc.total + net,
      equipment: acc.equipment + equipmentTotal,
      crew: acc.crew + crewTotal
    };
  }, { total: 0, equipment: 0, crew: 0 });

  const reservationsTotal = Number(reservationsTotals.total.toFixed(2));
  const equipmentCountTotal = reservationsTotals.equipment;
  const crewAssignmentsTotal = reservationsTotals.crew || crewCount;
  const combinedTaxAmount = applyTax
    ? Number(((projectSubtotal + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((projectSubtotal + reservationsTotal + combinedTaxAmount).toFixed(2));

  const projectCodeBadge = `<span class="project-code-badge project-focus-card__code">#${escapeHtml(projectCodeDisplay)}</span>`;
  const typeBadge = typeLabel
    ? `<span class="badge project-focus-card__badge bg-primary">${escapeHtml(typeLabel)}</span>`
    : '';
  const categoryMetaTag = categoryLabel
    ? `<span class="project-focus-card__meta-tag">${escapeHtml(categoryLabel)}</span>`
    : '';
  const statusChip = `<span class="project-focus-card__status-chip ${statusClass}">${escapeHtml(statusLabel)}</span>`;
  const paymentChip = `<span class="reservation-chip ${paymentChipClass} project-focus-card__payment-chip">${escapeHtml(paymentStatusLabel)}</span>`;

  const buildRow = (icon, label, value) => `
    <div class="project-focus-card__row">
      <span class="project-focus-card__row-label">
        ${icon ? `<span class="project-focus-card__row-icon">${escapeHtml(icon)}</span>` : ''}
        ${escapeHtml(label)}
      </span>
      <span class="project-focus-card__row-value">${escapeHtml(String(value))}</span>
    </div>
  `;

  const projectInfoRows = [
    { icon: '👤', label: t('projects.details.client', 'العميل'), value: clientName },
    companyName ? { icon: '🏢', label: t('projects.details.company', 'شركة العميل'), value: companyName } : null,
    { icon: '🏷️', label: t('projects.details.type', 'نوع المشروع'), value: typeLabel },
    { icon: '📅', label: t('projects.focus.summary.range', 'الفترة الزمنية'), value: combineProjectDateRange(project.start, project.end) }
  ].filter(Boolean).map(({ icon, label, value }) => buildRow(icon, label, value)).join('');

  const financialRows = [
    { icon: '💳', label: t('projectCards.stats.paymentStatus', 'حالة الدفع'), value: paymentStatusLabel },
    { icon: '💸', label: t('projectCards.stats.expensesTotal', 'إجمالي المصاريف'), value: formatCurrency(expensesTotal) },
    { icon: '🧮', label: t('projectCards.stats.totalWithTax', 'الإجمالي مع الضريبة'), value: formatCurrency(overallTotal) }
  ].map(({ icon, label, value }) => buildRow(icon, label, value)).join('');

  const reservationRows = [
    { icon: '🔗', label: t('projectCards.stats.reservationsShort', 'الحجوزات'), value: normalizeNumbers(String(reservationsCount)) },
    { icon: '📦', label: t('projectCards.stats.equipmentCount', 'عدد المعدات'), value: normalizeNumbers(String(equipmentCountTotal)) },
    { icon: '😎', label: t('projectCards.stats.crewCount', 'عدد الطاقم'), value: normalizeNumbers(String(crewAssignmentsTotal)) },
    { icon: '💵', label: t('projectCards.stats.reservationValue', 'إجمالي الحجوزات'), value: formatCurrency(reservationsTotal) }
  ].map(({ icon, label, value }) => buildRow(icon, label, value)).join('');

  const confirmationControl = isConfirmed
    ? `<span class="badge bg-success-subtle text-success fw-semibold">${escapeHtml(t('projects.focus.confirmed', '✅ مشروع مؤكد'))}</span>`
    : `<button class="btn btn-success btn-sm" data-action="confirm-project" data-id="${projectIdAttr}">${escapeHtml(t('projects.focus.actions.confirm', '✔️ تأكيد المشروع'))}</button>`;

  const highlightLabel = t('projects.focus.actions.highlight', '🔍 عرض في القائمة');
  const viewLabel = t('projects.focus.actions.view', '👁️ عرض التفاصيل');

  const statusBadge = `<span class="badge ${statusClass} text-white fw-semibold">${escapeHtml(statusLabel)}</span>`;
  const paymentBadge = `<span class="badge ${paymentChipClass === 'status-paid' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} fw-semibold">${escapeHtml(paymentStatusLabel)}</span>`;

  const projectMeta = [
    projectCodeDisplay ? `<span class="badge bg-primary-subtle text-primary fw-semibold">#${escapeHtml(projectCodeDisplay)}</span>` : '',
    categoryLabel ? `<span class="badge bg-base-200 text-base-content fw-semibold">${escapeHtml(categoryLabel)}</span>` : '',
    typeLabel ? `<span class="badge bg-base-200 text-base-content fw-semibold">${escapeHtml(typeLabel)}</span>` : ''
  ]
    .filter(Boolean)
    .join(' ');

  const infoLines = [
    clientName ? `👤 ${escapeHtml(clientName)}` : '',
    companyName ? `🏢 ${escapeHtml(companyName)}` : '',
    `📅 ${escapeHtml(combineProjectDateRange(project.start, project.end))}`,
    `😎 ${escapeHtml(t('projectCards.stats.crewCount', 'عدد الطاقم'))}: ${normalizeNumbers(String(crewAssignmentsTotal))}`,
    `🔗 ${escapeHtml(t('projectCards.stats.reservationsShort', 'الحجوزات'))}: ${normalizeNumbers(String(reservationsCount))}`
  ].filter(Boolean).map((line) => `<span>${line}</span>`).join('');

  const financialLines = [
    `💸 ${formatCurrency(expensesTotal)}`,
    `💵 ${formatCurrency(reservationsTotal)}`,
    `🧮 ${formatCurrency(overallTotal)}`
  ].map((line) => `<span>${line}</span>`).join('');

  const actions = `
    <div class="d-flex flex-wrap gap-2 mt-3">
      ${confirmationControl}
      <button class="btn btn-outline-secondary btn-sm" data-action="highlight" data-id="${projectIdAttr}">${escapeHtml(highlightLabel)}</button>
      <button class="btn btn-primary btn-sm" data-action="view" data-id="${projectIdAttr}">${escapeHtml(viewLabel)}</button>
    </div>
  `;

  return `
    <div class="project-card-grid__item">
      <div class="box h-100 project-card project-focus-card" data-project-id="${projectIdAttr}">
        <div class="d-flex justify-content-between align-items-start gap-2 mb-3">
          <div>
            <h5 class="mb-1">${escapeHtml(title)}</h5>
            <div class="d-flex flex-wrap gap-2 small text-muted">${projectMeta}</div>
          </div>
          <div class="d-flex flex-column align-items-end gap-2">
            ${statusBadge}
            ${paymentBadge}
          </div>
        </div>
        <p class="text-muted small mb-3">${escapeHtml(descriptionText)}</p>
        <div class="d-flex flex-column gap-1 text-muted small">
          ${infoLines}
        </div>
        <div class="d-flex flex-column gap-1 text-muted small mt-3">
          ${financialLines}
        </div>
        ${actions}
      </div>
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
  return state.reservations.filter((reservation) => String(reservation.projectId) === String(projectId));
}

export function resolveReservationNetTotal(reservation) {
  if (!reservation) return 0;
  const items = Array.isArray(reservation.items) ? reservation.items : [];
  const discountRaw = reservation.discount ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountType = reservation.discountType || 'percent';
  const technicianIds = Array.isArray(reservation.technicians) ? reservation.technicians : [];
  const calculated = calculateReservationTotal(
    items,
    discountValue,
    discountType,
    false,
    technicianIds,
    { start: reservation.start, end: reservation.end }
  );

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation.cost ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
}

export function buildProjectReservationCard(reservation, index, project = null) {
  if (!reservation) return '';
  const reservationId = reservation.reservationId || reservation.id || `RES-${index + 1}`;
  const status = reservation.status || reservation.state || 'pending';
  const statusLabel = t(`reservations.status.${status}`, status);
  const normalizedStatus = String(status).toLowerCase();
  const statusClassMap = {
    confirmed: 'project-reservation-card__badge--confirmed',
    pending: 'project-reservation-card__badge--pending',
    completed: 'project-reservation-card__badge--completed',
    in_progress: 'project-reservation-card__badge--info',
    ongoing: 'project-reservation-card__badge--info'
  };
  const statusClass = statusClassMap[normalizedStatus] || 'project-reservation-card__badge--info';
  const paid = reservation.paid === true || reservation.paid === 'paid' || reservation.paidStatus === 'paid';
  const paidLabel = paid ? t('reservations.details.paid', 'مدفوع') : t('reservations.details.unpaid', 'غير مدفوع');
  const paidClass = paid ? 'project-reservation-card__badge--paid' : 'project-reservation-card__badge--unpaid';
  const completed = reservation.completed === true || reservation.completed === 'true';
  const completedLabel = t('reservations.details.completed', 'مكتمل');
  const completedBadge = completed
    ? `<span class="project-reservation-card__badge project-reservation-card__badge--completed">${escapeHtml(completedLabel)}</span>`
    : '';
  const rangeLabel = combineProjectDateRange(reservation.start, reservation.end);
  const netTotal = resolveReservationNetTotal(reservation);
  const costLabel = formatCurrency(netTotal);
  const itemsLabel = t('projects.details.reservations.items', '{count} عناصر')
    .replace('{count}', normalizeNumbers(String((reservation.items || []).length)));
  const crewLabel = t('projects.details.reservations.crew', '{count} من الطاقم')
    .replace('{count}', normalizeNumbers(String((reservation.technicians || []).length)));

  const viewLabel = t('projects.details.reservations.view', '👁️ عرض الحجز');

  return `
    <article class="project-reservation-card" data-reservation-index="${index}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${escapeHtml(reservationId)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${statusClass}">${escapeHtml(statusLabel)}</span>
          <span class="project-reservation-card__badge ${paidClass}">${escapeHtml(paidLabel)}</span>
          ${completedBadge}
        </div>
      </div>
      <div class="project-reservation-card__body">
        <div class="project-reservation-card__range">${escapeHtml(rangeLabel)}</div>
        <div class="project-reservation-card__meta">
          <span>💵 ${escapeHtml(costLabel)}</span>
          <span>📦 ${escapeHtml(itemsLabel)}</span>
          <span>😎 ${escapeHtml(crewLabel)}</span>
        </div>
      </div>
      <div class="project-reservation-card__footer">
        <button class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-index="${index}" data-project-id="${project ? project.id : ''}">${escapeHtml(viewLabel)}</button>
      </div>
    </article>
  `;
}

export function buildProjectReservationsSection(project) {
  const reservations = getReservationsForProject(project.id)
    .map((reservation) => ({
      reservation,
      index: state.reservations.findIndex((entry) => entry === reservation)
    }))
    .filter(({ index }) => Number.isInteger(index) && index >= 0)
    .sort((a, b) => {
      const aStart = a.reservation.start ? new Date(a.reservation.start).getTime() : 0;
      const bStart = b.reservation.start ? new Date(b.reservation.start).getTime() : 0;
      return bStart - aStart;
    });

  const title = t('projects.details.reservations.title', 'الحجوزات المرتبطة');
  const createLabel = t('projects.details.reservations.create', '➕ إنشاء حجز مرتبط');
  const emptyText = t('projects.details.reservations.empty', 'لا توجد حجوزات مرتبطة بهذا المشروع بعد.');
  const countTemplate = t('projects.details.reservations.count', '{count} حجوزات');
  const countBadge = reservations.length
    ? `<span class="badge project-reservations-count">${escapeHtml(countTemplate.replace('{count}', normalizeNumbers(String(reservations.length))))}</span>`
    : '';
  const hasReservations = reservations.length > 0;
  const projectIdAttr = escapeHtml(String(project.id));
  const createButtonAttributes = [
    'type="button"',
    'class="btn btn-sm btn-primary"',
    'data-action="create-reservation"',
    `data-project-id="${projectIdAttr}"`
  ];
  if (hasReservations) {
    createButtonAttributes.push('disabled', 'aria-disabled="true"');
  }
  const createButton = `<button ${createButtonAttributes.join(' ')}>${escapeHtml(createLabel)}</button>`;
  const editLabel = t('projects.details.actions.edit', '✏️ تعديل المشروع');
  const editButton = `<button type="button" class="btn btn-sm btn-warning" data-action="edit-project" data-project-id="${projectIdAttr}">${escapeHtml(editLabel)}</button>`;
  const actionsMarkup = `<div class="d-flex flex-wrap gap-2">${createButton}${editButton}</div>`;

  const listMarkup = reservations.length
    ? `<div class="project-reservations-list">${reservations.map(({ reservation, index }) => buildProjectReservationCard(reservation, index, project)).join('')}</div>`
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
