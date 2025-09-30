import { renderReservations } from "./reservationsUI.js";
import { resolveQuickDateRange } from "./reservationsFilters.js";
import { normalizeNumbers } from "./utils.js";
import { loadData } from "./storage.js";
import { t, getCurrentLanguage } from "./language.js";
import {
  determineProjectStatus,
  calculateProjectExpenses,
  truncateText,
  escapeHtml,
  formatCurrencyLocalized
} from "./projectsCommon.js";
import { calculateReservationTotal } from "./reservationsSummary.js";
import { isReservationCompleted } from "./reservationsShared.js";

let lastCustomerFilters = {};
let customerProjectsContext = {
  initialized: false,
  currentId: null,
  modal: {
    el: null,
    body: null
  }
};

function normalizeSearchText(value = "") {
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

function applyQuickRangeToInputs(range, startInput, endInput) {
  if (!startInput || !endInput) return;
  const { startDate, endDate } = resolveQuickDateRange(range);

  if (startInput._flatpickr) {
    if (startDate) {
      startInput._flatpickr.setDate(startDate, false, "Y-m-d");
    } else {
      startInput._flatpickr.clear();
    }
  } else {
    startInput.value = startDate || "";
  }

  if (endInput._flatpickr) {
    if (endDate) {
      endInput._flatpickr.setDate(endDate, false, "Y-m-d");
    } else {
      endInput._flatpickr.clear();
    }
  } else {
    endInput.value = endDate || "";
  }
}

export function renderCustomerReservations(customerId) {
  const container = document.getElementById("customer-reservations");
  if (!container) return;

  const searchInput = document.getElementById("customer-search-reservation");
  const startInput = document.getElementById("customer-filter-start-date");
  const endInput = document.getElementById("customer-filter-end-date");
  const rangeSelect = document.getElementById("customer-reservation-date-range");
  const statusSelect = document.getElementById("customer-reservation-status-filter");
  const clearBtn = document.getElementById("customer-clear-filters");

  if (window.flatpickr) {
    if (startInput) window.flatpickr(startInput, { dateFormat: "Y-m-d" });
    if (endInput) window.flatpickr(endInput, { dateFormat: "Y-m-d" });
  }

  const collectFilters = () => {
    let startDate = normalizeNumbers(startInput?.value || "").trim();
    let endDate = normalizeNumbers(endInput?.value || "").trim();
    let quickRange = rangeSelect?.value || "";

    const allowedRanges = new Set(["", "today", "week", "month"]);
    if (!allowedRanges.has(quickRange)) {
      quickRange = "";
      if (rangeSelect) rangeSelect.value = "";
      if (startInput) {
        if (startInput._flatpickr) startInput._flatpickr.clear();
        startInput.value = "";
      }
      if (endInput) {
        if (endInput._flatpickr) endInput._flatpickr.clear();
        endInput.value = "";
      }
      startDate = "";
      endDate = "";
    }

    if (!startDate && !endDate && quickRange) {
      const { startDate: resolvedStart, endDate: resolvedEnd } = resolveQuickDateRange(quickRange);
      startDate = resolvedStart;
      endDate = resolvedEnd;
    }

    return {
      searchTerm: normalizeSearchText(searchInput?.value || ""),
      startDate,
      endDate,
      status: statusSelect?.value || "",
      quickRange,
      customerId
    };
  };

  const applyFilters = () => {
    lastCustomerFilters = collectFilters();
    renderReservations("customer-reservations", lastCustomerFilters);
  };

  if (searchInput && !searchInput.dataset.listenerAttached) {
    searchInput.addEventListener("input", () => {
      searchInput.value = normalizeNumbers(searchInput.value);
      applyFilters();
    });
    searchInput.dataset.listenerAttached = "true";
  }

  if (startInput && !startInput.dataset.listenerAttached) {
    startInput.addEventListener("change", () => {
      if (rangeSelect) rangeSelect.value = "";
      applyFilters();
    });
    startInput.dataset.listenerAttached = "true";
  }

  if (endInput && !endInput.dataset.listenerAttached) {
    endInput.addEventListener("change", () => {
      if (rangeSelect) rangeSelect.value = "";
      applyFilters();
    });
    endInput.dataset.listenerAttached = "true";
  }

  if (rangeSelect && !rangeSelect.dataset.listenerAttached) {
    rangeSelect.addEventListener("change", () => {
      applyQuickRangeToInputs(rangeSelect.value, startInput, endInput);
      applyFilters();
    });
    rangeSelect.dataset.listenerAttached = "true";
  }

  if (statusSelect && !statusSelect.dataset.listenerAttached) {
    statusSelect.addEventListener("change", applyFilters);
    statusSelect.dataset.listenerAttached = "true";
  }

  if (clearBtn && !clearBtn.dataset.listenerAttached) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (startInput) {
        if (startInput._flatpickr) startInput._flatpickr.clear();
        startInput.value = "";
      }
      if (endInput) {
        if (endInput._flatpickr) endInput._flatpickr.clear();
        endInput.value = "";
      }
      if (rangeSelect) rangeSelect.value = "";
      if (statusSelect) statusSelect.value = "";
      applyFilters();
    });
    clearBtn.dataset.listenerAttached = "true";
  }

  window.refreshCustomerReservationsViews = () => {
    renderReservations("customer-reservations", lastCustomerFilters);
  };

  applyFilters();
}

export function renderCustomerProjects(customerId) {
  customerProjectsContext.currentId = customerId;
  const { container } = getCustomerProjectsElements();
  if (!container) return;

  if (!customerProjectsContext.initialized) {
    setupCustomerProjectsUI();
    attachCustomerProjectCardEvents();
    setupCustomerProjectModal();
    document.addEventListener('projects:changed', () => {
      if (customerProjectsContext.currentId) {
        updateCustomerProjects();
      }
    });
    document.addEventListener('language:changed', () => {
      if (customerProjectsContext.currentId) {
        updateCustomerProjects();
      }
    });
    document.addEventListener('technicians:updated', () => {
      if (customerProjectsContext.currentId) {
        updateCustomerProjects();
      }
    });
    customerProjectsContext.initialized = true;
  }

  updateCustomerProjects();
}

function getCustomerProjectsElements() {
  return {
    container: document.getElementById('customer-projects'),
    searchInput: document.getElementById('customer-project-search'),
    statusSelect: document.getElementById('customer-project-status-filter'),
    clearBtn: document.getElementById('customer-projects-clear-filters')
  };
}

function setupCustomerProjectsUI() {
  const { searchInput, statusSelect, clearBtn } = getCustomerProjectsElements();

  if (searchInput && !searchInput.dataset.listenerAttached) {
    searchInput.addEventListener('input', () => {
      searchInput.value = normalizeNumbers(searchInput.value);
      updateCustomerProjects();
    });
    searchInput.dataset.listenerAttached = 'true';
  }

  if (statusSelect && !statusSelect.dataset.listenerAttached) {
    statusSelect.addEventListener('change', () => {
      updateCustomerProjects();
    });
    statusSelect.dataset.listenerAttached = 'true';
  }

  if (clearBtn && !clearBtn.dataset.listenerAttached) {
    clearBtn.addEventListener('click', () => {
      const { searchInput: sInput, statusSelect: sSelect } = getCustomerProjectsElements();
      if (sInput) sInput.value = '';
      if (sSelect) sSelect.value = '';
      updateCustomerProjects();
    });
    clearBtn.dataset.listenerAttached = 'true';
  }
}

function attachCustomerProjectCardEvents() {
  const { container } = getCustomerProjectsElements();
  if (!container || container.dataset.projectModalListenerAttached === 'true') return;
  container.addEventListener('click', handleCustomerProjectCardClick);
  container.dataset.projectModalListenerAttached = 'true';
}

function handleCustomerProjectCardClick(event) {
  const card = event.target.closest('.project-focus-card');
  if (!card) return;
  const ignored = event.target.closest('[data-ignore-project-modal]');
  if (ignored) return;
  const projectId = card.dataset.projectId ? String(card.dataset.projectId) : '';
  if (!projectId) return;
  openCustomerProjectDetails(projectId);
}

function setupCustomerProjectModal() {
  ensureProjectDetailsModal();
}

function ensureProjectDetailsModal() {
  if (customerProjectsContext.modal?.el && customerProjectsContext.modal?.body) {
    return true;
  }
  const modalEl = document.getElementById('projectDetailsModal');
  const modalBody = document.getElementById('project-details-body');
  if (!modalEl || !modalBody) {
    return false;
  }
  customerProjectsContext.modal = {
    el: modalEl,
    body: modalBody
  };
  return true;
}

function updateCustomerProjects() {
  const { container, searchInput, statusSelect } = getCustomerProjectsElements();
  if (!container || !customerProjectsContext.currentId) return;

  const searchTerm = normalizeSearchText(searchInput?.value || '');
  const statusFilter = statusSelect?.value || '';

  const {
    projects = [],
    technicians = [],
    reservations = [],
    customers = []
  } = loadData();
  const techniciansMap = new Map(
    technicians.map((tech) => [String(tech.id), tech])
  );
  const reservationsByProject = groupReservationsByProject(reservations);
  const customer = customers.find((entry) => String(entry.id) === String(customerProjectsContext.currentId)) || null;

  const relevant = projects.filter((project) => String(project.clientId) === String(customerProjectsContext.currentId));

  const filtered = relevant.filter((project) => {
    if (searchTerm) {
      const haystack = normalizeSearchText([
        project.title,
        project.description,
        project.notes
      ].filter(Boolean).join(' '));
      if (!haystack.includes(searchTerm)) return false;
    }

    if (statusFilter) {
      const projectStatus = determineProjectStatus(project);
      if (projectStatus !== statusFilter) return false;
    }

    return true;
  }).sort((a, b) => {
    const aDate = new Date(a.start || a.createdAt || 0).getTime();
    const bDate = new Date(b.start || b.createdAt || 0).getTime();
    return bDate - aDate;
  });

  if (!filtered.length) {
    const emptyMessage = t('customerProjects.empty', container.dataset.empty || 'لا توجد مشاريع مرتبطة بهذا العميل.');
    container.innerHTML = `<div class="col-12"><div class="alert alert-info text-center mb-0">${emptyMessage}</div></div>`;
    return;
  }

  container.innerHTML = filtered
    .map((project) => {
      const projectKey = getProjectIdentifier(project);
      const linkedReservations = projectKey ? reservationsByProject.get(projectKey) || [] : [];
      return buildCustomerProjectCard(project, {
        customer,
        techniciansMap,
        reservations: linkedReservations
      });
    })
    .join('');
}

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

const PROJECT_TAX_RATE = 0.15;
const DEFAULT_CATEGORY_CLASS = 'bg-primary';
const MAX_CREW_PREVIEW = 2;

function groupReservationsByProject(reservations = []) {
  const map = new Map();
  reservations.forEach((reservation) => {
    const key = reservation?.projectId ?? reservation?.project_id ?? reservation?.projectID;
    if (key == null) return;
    const mapKey = String(key);
    if (!map.has(mapKey)) {
      map.set(mapKey, []);
    }
    map.get(mapKey).push(reservation);
  });
  return map;
}

function getProjectIdentifier(project) {
  if (!project) return null;
  if (project.id != null) return String(project.id);
  if (project.projectId != null) return String(project.projectId);
  if (project.project_id != null) return String(project.project_id);
  return null;
}

function buildCustomerProjectCard(project, { customer, techniciansMap, reservations }) {
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

  const reservationsList = Array.isArray(reservations) ? reservations : [];
  const totals = reservationsList.reduce((acc, reservation) => {
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
    <div class="col-12 col-md-6 col-xl-4">
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

function openCustomerProjectDetails(projectId) {
  const normalizedId = String(projectId || '').trim();
  if (!normalizedId) return;
  if (!ensureProjectDetailsModal()) return;

  const modal = customerProjectsContext.modal;
  if (!modal?.body) return;

  const { projects = [], reservations = [], customers = [] } = loadData();
  const project = findProjectByIdentifier(projects, normalizedId);
  if (!project) return;

  if (customerProjectsContext.currentId && project.clientId != null) {
    if (String(project.clientId) !== String(customerProjectsContext.currentId)) {
      return;
    }
  }

  const customer = customers.find((entry) => String(entry.id) === String(project.clientId)) || null;
  const linkedReservations = reservations.filter((reservation) => {
    const reservationProjectId = extractReservationProjectId(reservation);
    return reservationProjectId && reservationProjectId === normalizedId;
  });

  const detailsHtml = buildCustomerProjectDetailsMarkup(project, {
    customer,
    reservations: linkedReservations
  });

  modal.body.innerHTML = detailsHtml;

  if (window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modal.el).show();
  } else {
    modal.el.classList.add('show');
    modal.el.style.display = 'block';
  }
}

function findProjectByIdentifier(projects = [], identifier) {
  const normalized = String(identifier);
  return projects.find((project) => {
    const keys = [project?.id, project?.projectId, project?.project_id];
    return keys.some((value) => value != null && String(value) === normalized);
  }) || null;
}

function extractReservationProjectId(reservation) {
  if (!reservation) return null;
  const value = reservation.projectId ?? reservation.project_id ?? reservation.projectID ?? null;
  return value != null ? String(value) : null;
}

function buildCustomerProjectDetailsMarkup(project, { customer, reservations }) {
  const projectTotals = resolveProjectTotals(project);
  const reservationsTotalRaw = reservations.reduce((sum, reservation) => sum + resolveReservationNetTotal(reservation), 0);
  const reservationsTotal = Number(reservationsTotalRaw.toFixed(2));
  const reservationsCount = reservations.length;
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

  const infoRowsHtml = [
    projectCodeDisplay ? renderProjectInfoRow('🆔', t('projects.details.labels.code', 'رقم المشروع'), `#${projectCodeDisplay}`) : '',
    customerName ? renderProjectInfoRow('👤', t('projects.details.client', 'العميل'), customerName) : '',
    companyName ? renderProjectInfoRow('🏢', t('projects.details.company', 'شركة العميل'), companyName) : '',
    renderProjectInfoRow('🏷️', t('projects.details.type', 'نوع المشروع'), getProjectTypeLabel(project?.type)),
    renderProjectInfoRow('🗓️', t('projects.details.labels.start', 'تاريخ البداية'), formatDateTimeDetailed(project?.start)),
    renderProjectInfoRow('🗓️', t('projects.details.labels.end', 'تاريخ النهاية'), project?.end ? formatDateTimeDetailed(project.end) : '—'),
    renderProjectInfoRow('🔗', t('projects.details.labels.reservationsCount', 'عدد الحجوزات'), normalizeNumbers(String(reservationsCount)))
  ].filter(Boolean).join('');

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

  const reservationsSection = buildCustomerProjectReservationsSection(reservations);

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
      ${infoRowsHtml}
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

function buildCustomerProjectReservationsSection(reservations = []) {
  const sorted = [...reservations].sort((a, b) => {
    const aStart = a?.start ? new Date(a.start).getTime() : 0;
    const bStart = b?.start ? new Date(b.start).getTime() : 0;
    return bStart - aStart;
  });

  const title = t('projects.details.reservations.title', 'الحجوزات المرتبطة');
  const emptyText = t('projects.details.reservations.empty', 'لا توجد حجوزات مرتبطة بهذا المشروع بعد.');
  const countTemplate = t('projects.details.reservations.count', '{count} حجوزات');
  const countBadge = sorted.length
    ? `<span class="badge project-reservations-count">${escapeHtml(countTemplate.replace('{count}', normalizeNumbers(String(sorted.length))))}</span>`
    : '';

  const listMarkup = sorted.length
    ? `<div class="project-reservations-list">${sorted.map((reservation) => buildCustomerReservationCard(reservation)).join('')}</div>`
    : `<div class="alert alert-info project-reservations-empty mb-0">${escapeHtml(emptyText)}</div>`;

  return `
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex justify-content-between align-items-center gap-2 flex-wrap">
        <div class="d-flex align-items-center gap-2">
          <h6 class="mb-0">${escapeHtml(title)}</h6>
          ${countBadge}
        </div>
      </div>
      ${listMarkup}
    </section>
  `;
}

function buildCustomerReservationCard(reservation) {
  const reservationIdentifier = reservation?.reservationId ?? reservation?.id ?? '-';
  const reservationId = normalizeNumbers(String(reservationIdentifier));
  const rangeLabel = formatDateRangeDetailed(reservation?.start, reservation?.end);
  const netTotal = resolveReservationNetTotal(reservation);
  const costLabel = formatCurrencyLocalized(netTotal);

  const itemsCount = normalizeNumbers(String((reservation?.items || []).length));
  const crewCountValue = normalizeNumbers(String((reservation?.technicians || []).length));
  const itemsLabel = t('projects.details.reservations.itemsCount', '{count} معدة').replace('{count}', itemsCount);
  const crewLabel = t('projects.details.reservations.crewCount', '{count} من الطاقم').replace('{count}', crewCountValue);

  const statusConfirmed = reservation?.confirmed === true || reservation?.confirmed === 'true';
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
      </div>
    </article>
  `;
}

function renderProjectInfoRow(icon, label, value) {
  return `
    <div class="res-info-row">
      <span class="label">${escapeHtml(icon)} ${escapeHtml(label)}</span>
      <span class="separator">:</span>
      <span class="value">${escapeHtml(value)}</span>
    </div>
  `;
}

function resolveProjectTotals(project) {
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

function resolveReservationNetTotal(reservation) {
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

function formatDateTimeLocalized(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA' : 'en-GB';
  const formatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  return normalizeNumbers(formatter.format(date));
}

function formatDateTimeDetailed(value) {
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

function formatDateRangeDetailed(start, end) {
  if (!start) return '—';
  const startText = formatDateTimeDetailed(start);
  if (!end) return startText;
  return `${startText} - ${formatDateTimeDetailed(end)}`;
}

function getProjectTypeLabel(type) {
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
