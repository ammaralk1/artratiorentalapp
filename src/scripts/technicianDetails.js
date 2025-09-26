import { renderReservations } from "./reservationsUI.js";
import { resolveQuickDateRange } from "./reservationsFilters.js";
import { normalizeNumbers } from "./utils.js";
import { loadData } from "./storage.js";
import { t, getCurrentLanguage } from "./language.js";

let lastTechnicianFilters = {};
let technicianProjectsContext = {
  initialized: false,
  currentId: null
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

export function renderTechnicianReservations(technicianId) {
  const container = document.getElementById("technician-reservations");
  if (!container) return;

  const searchInput = document.getElementById("technician-search-reservation");
  const startInput = document.getElementById("technician-filter-start-date");
  const endInput = document.getElementById("technician-filter-end-date");
  const rangeSelect = document.getElementById("technician-reservation-date-range");
  const statusSelect = document.getElementById("technician-reservation-status-filter");
  const clearBtn = document.getElementById("technician-clear-filters");

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

    const rawSearch = searchInput?.value || "";
    const normalizedSearch = normalizeSearchText(rawSearch);

    return {
      searchTerm: normalizedSearch,
      searchReservationId: normalizedSearch,
      searchCustomerName: normalizedSearch,
      startDate,
      endDate,
      status: statusSelect?.value || "",
      quickRange,
      technicianId
    };
  };

  const applyFilters = () => {
    lastTechnicianFilters = collectFilters();
    renderReservations("technician-reservations", lastTechnicianFilters);
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

  window.refreshTechnicianReservationsViews = () => {
    renderReservations("technician-reservations", lastTechnicianFilters);
  };

  applyFilters();
}

export function renderTechnicianProjects(technicianId) {
  technicianProjectsContext.currentId = technicianId;
  const { container } = getTechnicianProjectsElements();
  if (!container) return;

  if (!technicianProjectsContext.initialized) {
    setupTechnicianProjectsUI();
    document.addEventListener('projects:changed', () => {
      if (technicianProjectsContext.currentId) {
        updateTechnicianProjects();
      }
    });
    document.addEventListener('language:changed', () => {
      if (technicianProjectsContext.currentId) {
        updateTechnicianProjects();
      }
    });
    document.addEventListener('customers:changed', () => {
      if (technicianProjectsContext.currentId) {
        updateTechnicianProjects();
      }
    });
    document.addEventListener('technicians:updated', () => {
      if (technicianProjectsContext.currentId) {
        updateTechnicianProjects();
      }
    });
    technicianProjectsContext.initialized = true;
  }

  updateTechnicianProjects();
}

function getTechnicianProjectsElements() {
  return {
    container: document.getElementById('technician-projects'),
    searchInput: document.getElementById('technician-project-search'),
    statusSelect: document.getElementById('technician-project-status-filter'),
    clearBtn: document.getElementById('technician-projects-clear-filters')
  };
}

function setupTechnicianProjectsUI() {
  const { searchInput, statusSelect, clearBtn } = getTechnicianProjectsElements();

  if (searchInput && !searchInput.dataset.listenerAttached) {
    searchInput.addEventListener('input', () => {
      searchInput.value = normalizeNumbers(searchInput.value);
      updateTechnicianProjects();
    });
    searchInput.dataset.listenerAttached = 'true';
  }

  if (statusSelect && !statusSelect.dataset.listenerAttached) {
    statusSelect.addEventListener('change', () => {
      updateTechnicianProjects();
    });
    statusSelect.dataset.listenerAttached = 'true';
  }

  if (clearBtn && !clearBtn.dataset.listenerAttached) {
    clearBtn.addEventListener('click', () => {
      const { searchInput: sInput, statusSelect: sSelect } = getTechnicianProjectsElements();
      if (sInput) sInput.value = '';
      if (sSelect) sSelect.value = '';
      updateTechnicianProjects();
    });
    clearBtn.dataset.listenerAttached = 'true';
  }
}

function updateTechnicianProjects() {
  const { container, searchInput, statusSelect } = getTechnicianProjectsElements();
  if (!container || !technicianProjectsContext.currentId) return;

  const searchTerm = normalizeSearchText(searchInput?.value || '');
  const statusFilter = statusSelect?.value || '';

  const { projects = [], customers = [], technicians = [] } = loadData();
  const customerMap = new Map(customers.map((customer) => [String(customer.id), customer]));
  const techniciansMap = new Map(technicians.map((tech) => [String(tech.id), tech]));

  const normalizedId = String(technicianProjectsContext.currentId);
  const relevant = projects.filter((project) => Array.isArray(project.technicians) && project.technicians.some((id) => String(id) === normalizedId));

  const filtered = relevant.filter((project) => {
    if (searchTerm) {
      const clientName = customerMap.get(String(project.clientId))?.customerName || '';
      const haystack = normalizeSearchText([
        project.title,
        project.description,
        clientName
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
    const emptyMessage = t('technicianProjects.empty', container.dataset.empty || 'لا توجد مشاريع مرتبطة بهذا العضو.');
    container.innerHTML = `<div class="col-12"><div class="alert alert-info text-center mb-0">${emptyMessage}</div></div>`;
    return;
  }

  container.innerHTML = filtered.map((project) => buildTechnicianProjectCard(project, customerMap, techniciansMap)).join('');
}

function buildTechnicianProjectCard(project, customerMap, techniciansMap) {
  const status = determineProjectStatus(project);
  const statusLabel = t(`projects.status.${status}`, statusLabelsFallback[status]);
  const statusClass = statusBadgeClass[status] || 'bg-secondary';

  const description = (project.description || '').trim();
  const descriptionText = description ? escapeHtml(truncateText(description, 140)) : escapeHtml(t('projects.fallback.noDescription', 'No description'));
  const projectTitle = (project.title || '').trim() || t('projects.fallback.untitled', 'Untitled project');

  const crewIds = Array.isArray(project.technicians) ? project.technicians : [];
  const crewCount = crewIds.length;
  const crewLabel = t('projectCards.stats.crew', '👥 Crew members: {count}').replace('{count}', normalizeNumbers(String(crewCount)));

  const crewNames = crewIds
    .map((id) => techniciansMap.get(String(id))?.name)
    .filter(Boolean);
  let crewPreview = '';
  if (crewNames.length) {
    const maxPreview = 2;
    const previewNames = crewNames.slice(0, maxPreview);
    const extraCount = crewNames.length - previewNames.length;
    const separator = getCurrentLanguage() === 'ar' ? '، ' : ', ';
    const namesText = previewNames.join(separator);
    crewPreview = `${escapeHtml(namesText)}${extraCount > 0 ? escapeHtml(` +${normalizeNumbers(String(extraCount))}`) : ''}`;
  }

  const clientName = customerMap.get(String(project.clientId))?.customerName || t('projects.fallback.unknownClient', 'Unknown client');
  const clientLabel = t('projectCards.stats.client', '👤 Client: {name}').replace('{name}', clientName);

  const expensesTotal = calculateProjectExpenses(project);
  const budgetTotal = (Number(project.equipmentEstimate) || 0) + expensesTotal;
  const budgetLabel = t('projectCards.stats.budget', '💰 Estimated budget: {amount}').replace('{amount}', formatCurrencyLocalized(budgetTotal));
  const expensesLabel = expensesTotal > 0
    ? t('projectCards.stats.expenses', '💸 Expenses: {amount}').replace('{amount}', formatCurrencyLocalized(expensesTotal))
    : '';

  return `
    <div class="col-12 col-md-6 col-xl-4">
      <div class="box h-100 project-card">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 class="mb-1">${escapeHtml(projectTitle)}</h5>
            <span class="text-muted small">${escapeHtml(formatProjectDateRange(project.start, project.end))}</span>
          </div>
          <span class="badge ${statusClass} text-white">${escapeHtml(statusLabel)}</span>
        </div>
        <p class="text-muted small mb-3">${descriptionText}</p>
        <div class="d-flex flex-column gap-1 small text-muted">
          <span>${escapeHtml(clientLabel)}</span>
          <span>${escapeHtml(crewLabel)}</span>
          ${crewPreview ? `<span>👥 ${crewPreview}</span>` : ''}
          <span>${escapeHtml(budgetLabel)}</span>
          ${expensesLabel ? `<span>${escapeHtml(expensesLabel)}</span>` : ''}
        </div>
      </div>
    </div>
  `;
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

function determineProjectStatus(project) {
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

function formatProjectDateRange(start, end) {
  if (!start) return '—';
  const startText = formatDateTimeLocalized(start);
  if (!end) return startText;
  return `${startText} - ${formatDateTimeLocalized(end)}`;
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

function formatCurrencyLocalized(value) {
  const number = Number(value) || 0;
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(number));
  const currencyLabel = lang === 'ar' ? 'ر.س' : 'SAR';
  return `${normalizeNumbers(formatted)} ${currencyLabel}`;
}

function calculateProjectExpenses(project) {
  if (typeof project.expensesTotal === 'number') {
    return project.expensesTotal;
  }
  if (Array.isArray(project.expenses)) {
    return project.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  }
  return 0;
}

function truncateText(value, maxLength) {
  if (!value) return '';
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}…`;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
