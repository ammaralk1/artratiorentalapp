import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout, getCurrentUser } from './auth.js';
import { migrateOldData, loadData } from './storage.js';
import { t } from './language.js';
import { apiRequest, ApiError } from './apiClient.js';
import { normalizeNumbers } from './utils.js';
import { updatePreferences } from './preferencesService.js';
import { initDashboardShell } from './dashboardShell.js';
import { syncTechniciansStatuses } from './technicians.js';
import { determineProjectStatus } from './projectsCommon.js';

applyStoredTheme();
checkAuth();
initDashboardShell();
initThemeToggle();
migrateOldData();

let cachedUsername = '';
let cachedRole = '';
let summaryState = null;
let summaryLoading = false;
let summaryErrorMessage = '';

function updateGreetingMessage() {
  const greetingElements = document.querySelectorAll('[data-home-greeting]');
  if (!greetingElements.length) return;

  const defaultMessage = t('home.hero.title', 'مرحباً بك');
  const personalisedMessage = cachedUsername
    ? t('home.hero.greetingUser', 'مرحباً {name}').replace('{name}', cachedUsername)
    : defaultMessage;

  greetingElements.forEach((element) => {
    element.textContent = personalisedMessage;
  });
}

function updateAdminCardVisibility() {
  const isAdmin = cachedRole === 'admin';
  document.querySelectorAll('[data-admin-card]').forEach((element) => {
    if (isAdmin) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  });
}

function normalizeSummaryResponse(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const toInt = (value) => {
    const parsed = Number.parseInt(String(value ?? '0'), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  return {
    customers: {
      total: toInt(raw?.customers?.total),
    },
    reservations: {
      total: toInt(raw?.reservations?.total),
      today: toInt(raw?.reservations?.today),
      upcoming: toInt(raw?.reservations?.upcoming),
    },
    equipment: {
      total: toInt(raw?.equipment?.total),
      maintenance: toInt(raw?.equipment?.maintenance),
    },
    technicians: {
      total: toInt(raw?.technicians?.total),
      busy: toInt(raw?.technicians?.busy),
    },
    projects: {
      total: toInt(raw?.projects?.total),
      active: toInt(raw?.projects?.active),
    },
    maintenance: {
      open: toInt(raw?.maintenance?.open),
      highPriority: toInt(raw?.maintenance?.highPriority),
    },
  };
}

function createEmptySummarySnapshot() {
  return {
    customers: { total: 0 },
    reservations: { total: 0, today: 0, upcoming: 0 },
    equipment: { total: 0, maintenance: 0 },
    technicians: { total: 0, busy: 0 },
    projects: { total: 0, active: 0 },
    maintenance: { open: 0, highPriority: 0 }
  };
}

function toValidDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function mergeSummaryWithLocalData(summary) {
  const snapshot = loadData();
  const result = summary ? { ...summary } : createEmptySummarySnapshot();

  const customers = Array.isArray(snapshot.customers) ? snapshot.customers : [];
  const reservations = Array.isArray(snapshot.reservations) ? snapshot.reservations : [];
  const equipment = Array.isArray(snapshot.equipment) ? snapshot.equipment : [];
  const maintenanceEntries = Array.isArray(snapshot.maintenance) ? snapshot.maintenance : [];
  const projects = Array.isArray(snapshot.projects) ? snapshot.projects : [];

  if (customers.length) {
    result.customers = { ...result.customers, total: customers.length };
  }

  if (equipment.length) {
    const maintenanceEquipment = equipment.filter((item) => {
      const status = String(item?.status || item?.state || '').toLowerCase();
      return status.includes('maintenance') || status.includes('repair');
    }).length;
    result.equipment = {
      ...result.equipment,
      total: equipment.length,
      maintenance: maintenanceEquipment
    };
  }

  if (projects.length) {
    const activeProjects = projects.filter((project) => determineProjectStatus(project) === 'ongoing').length;
    result.projects = {
      ...result.projects,
      total: Math.max(result.projects?.total ?? 0, projects.length),
      active: Math.max(result.projects?.active ?? 0, activeProjects)
    };
  }

  if (maintenanceEntries.length) {
    const openCount = maintenanceEntries.filter((entry) => {
      const status = String(entry?.status || entry?.state || '').toLowerCase();
      return !status || ['open', 'pending', 'in-progress', 'progress', 'scheduled'].includes(status);
    }).length;
    const highPriorityCount = maintenanceEntries.filter((entry) => {
      const priority = String(entry?.priority || entry?.severity || '').toLowerCase();
      return ['high', 'urgent', 'critical'].includes(priority);
    }).length;
    result.maintenance = {
      ...result.maintenance,
      open: Math.max(result.maintenance?.open ?? 0, openCount),
      highPriority: Math.max(result.maintenance?.highPriority ?? 0, highPriorityCount)
    };
  }

  if (reservations.length) {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const isCancelled = (reservation) => {
      const status = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
      return ['cancelled', 'canceled'].includes(status);
    };

    const combineDateAndTime = (datePart, timePart) => {
      const date = String(datePart || '').trim();
      const time = String(timePart || '').trim();
      if (!date && !time) return null;
      if (date && time) {
        return `${date}T${time}`;
      }
      if (date) return `${date}T00:00:00`;
      return null;
    };

    const normalizeDateValue = (value) => {
      if (!value) return null;
      if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
      let normalized = String(value).trim();
      if (!normalized) return null;
      if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
        normalized = `${normalized}T00:00:00`;
      } else if (normalized.includes(' ')) {
        normalized = normalized.replace(' ', 'T');
      }
      const parsed = new Date(normalized);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    };

    const resolveStartDate = (reservation) => {
      const candidates = [
        reservation?.start,
        reservation?.startDatetime,
        reservation?.start_datetime,
        reservation?.start_date,
        reservation?.startDate,
        combineDateAndTime(reservation?.startDate, reservation?.startTime),
        combineDateAndTime(reservation?.start_date, reservation?.start_time)
      ];
      for (const candidate of candidates) {
        const date = normalizeDateValue(candidate);
        if (date) return date;
      }
      return null;
    };

    const resolveEndDate = (reservation) => {
      const candidates = [
        reservation?.end,
        reservation?.endDatetime,
        reservation?.end_datetime,
        reservation?.end_date,
        reservation?.endDate,
        combineDateAndTime(reservation?.endDate, reservation?.endTime),
        combineDateAndTime(reservation?.end_date, reservation?.end_time)
      ];
      for (const candidate of candidates) {
        const date = normalizeDateValue(candidate);
        if (date) return date;
      }
      return null;
    };

    const todayCount = reservations.filter((reservation) => {
      if (isCancelled(reservation)) return false;
      const start = resolveStartDate(reservation);
      if (!start) return false;
      return start >= startOfDay && start < endOfDay;
    }).length;

    const upcomingCount = reservations.filter((reservation) => {
      if (isCancelled(reservation)) return false;
      const start = resolveStartDate(reservation);
      if (!start) return false;
      return start >= now;
    }).length;

    const busyTechnicianIds = new Set();
    reservations.forEach((reservation) => {
      if (isCancelled(reservation)) return;
      const start = resolveStartDate(reservation);
      const end = resolveEndDate(reservation) || start;
      if (!start || !end) return;
      if (start > now || end <= now) return;
      const assigned = Array.isArray(reservation.technicians) ? reservation.technicians : [];
      assigned.forEach((id) => {
        if (id != null) {
          busyTechnicianIds.add(String(id));
        }
      });
    });

    result.reservations = {
      ...result.reservations,
      total: Math.max(result.reservations?.total ?? 0, reservations.length),
      today: Math.max(result.reservations?.today ?? 0, todayCount),
      upcoming: Math.max(result.reservations?.upcoming ?? 0, upcomingCount)
    };

    result.technicians = {
      ...result.technicians,
      busy: Math.max(result.technicians?.busy ?? 0, busyTechnicianIds.size)
    };
  }

  const syncedTechnicians = syncTechniciansStatuses() || snapshot.technicians || [];
  const technicians = Array.isArray(syncedTechnicians) ? syncedTechnicians : [];
  if (technicians.length) {
    const busyCount = technicians.filter((tech) => {
      const status = String(tech?.status || tech?.baseStatus || '').toLowerCase();
      return status === 'busy';
    }).length;
    result.technicians = {
      ...result.technicians,
      total: Math.max(result.technicians?.total ?? 0, technicians.length),
      busy: Math.max(result.technicians?.busy ?? 0, busyCount)
    };
  }

  return result;
}

function buildSummaryMetrics(summary) {
  return [
    {
      key: 'customers.total',
      label: t('home.summary.customers', 'إجمالي العملاء'),
      value: summary.customers.total,
      icon: '👥',
      accent: 'primary',
      href: 'dashboard.html#customers-tab',
      dashboardTab: 'customers-tab',
    },
    {
      key: 'reservations.today',
      label: t('home.summary.reservationsToday', 'حجوزات اليوم'),
      value: summary.reservations.today,
      icon: '🛎️',
      accent: 'success',
      href: 'dashboard.html#reservations-tab',
      dashboardTab: 'reservations-tab',
      dashboardSubTab: 'my-reservations-tab',
    },
    {
      key: 'reservations.upcoming',
      label: t('home.summary.reservationsUpcoming', 'حجوزات قادمة'),
      value: summary.reservations.upcoming,
      icon: '🔔',
      accent: 'info',
      href: 'dashboard.html#reservations-tab',
      dashboardTab: 'reservations-tab',
      dashboardSubTab: 'calendar-tab',
    },
    {
      key: 'projects.active',
      label: t('home.summary.projectsActive', 'مشاريع نشطة'),
      value: summary.projects.active,
      icon: '🏗️',
      accent: 'warning',
      href: 'projects.html#projects-section',
      projectsTab: 'projects-section',
      projectsSubTab: 'projects-list-tab',
    },
    {
      key: 'equipment.maintenance',
      label: t('home.summary.equipmentMaintenance', 'معدات قيد الصيانة'),
      value: summary.equipment.maintenance,
      icon: '🛠️',
      accent: 'error',
      href: 'dashboard.html#maintenance-tab',
      dashboardTab: 'maintenance-tab',
    },
    {
      key: 'maintenance.highPriority',
      label: t('home.summary.maintenanceHigh', 'بلاغات صيانة عاجلة'),
      value: summary.maintenance.highPriority,
      icon: '⚡',
      accent: 'error',
      href: 'dashboard.html#maintenance-tab',
      dashboardTab: 'maintenance-tab',
    },
    {
      key: 'technicians.busy',
      label: t('home.summary.techniciansBusy', 'أعضاء طاقم مشغولون'),
      value: summary.technicians.busy,
      icon: '👷',
      accent: 'secondary',
      href: 'dashboard.html#technicians-tab',
      dashboardTab: 'technicians-tab',
    },
  ];
}

const summaryAccentClassMap = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  info: 'bg-info/10 text-info',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
  secondary: 'bg-secondary/10 text-secondary'
};

function persistNavigationPreference(patch) {
  if (typeof updatePreferences !== 'function') return;

  const allowedKeys = ['dashboardTab', 'dashboardSubTab', 'projectsTab', 'projectsSubTab'];
  const payload = {};
  allowedKeys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(patch, key)) {
      payload[key] = patch[key] ?? null;
    }
  });

  if (Object.keys(payload).length === 0) return;

  try {
    const maybePromise = updatePreferences(payload);
    if (maybePromise && typeof maybePromise.catch === 'function') {
      maybePromise.catch((error) => {
        console.warn('⚠️ [home] Failed to persist navigation preference', error);
      });
    }
  } catch (error) {
    console.warn('⚠️ [home] Failed to persist navigation preference', error);
  }
}

function attachSummaryCardListeners(container) {
  container.querySelectorAll('[data-summary-card]').forEach((card) => {
    if (card.dataset.listenerAttached) return;

    card.addEventListener('click', () => {
      const patch = {};
      if (card.dataset.dashboardTab !== undefined) {
        patch.dashboardTab = card.dataset.dashboardTab || null;
      }
      if (card.dataset.dashboardSubtab !== undefined) {
        patch.dashboardSubTab = card.dataset.dashboardSubtab || null;
      }
      if (card.dataset.projectsTab !== undefined) {
        patch.projectsTab = card.dataset.projectsTab || null;
      }
      if (card.dataset.projectsSubtab !== undefined) {
        patch.projectsSubTab = card.dataset.projectsSubtab || null;
      }

      if (Object.keys(patch).length > 0) {
        persistNavigationPreference(patch);
      }
    });

    card.dataset.listenerAttached = 'true';
  });
}

function renderSummaryCard(metric) {
  const classes = [
    'glass-card',
    'summary-card',
    'flex',
    'flex-col',
    'items-center',
    'gap-2',
    'p-5',
    'text-center',
    'transition',
    'duration-200',
    'hover:-translate-y-1',
    'focus-visible:outline',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'focus-visible:outline-primary'
  ];
  const attrs = ['data-summary-card'];
  const escapeAttr = (value) => String(value ?? '').replace(/"/g, '&quot;');

  if (metric.href) {
    attrs.push(`href="${escapeAttr(metric.href)}"`);
  }

  if (metric.dashboardTab !== undefined) {
    attrs.push(`data-dashboard-tab="${escapeAttr(metric.dashboardTab ?? '')}"`);
  }

  if (metric.dashboardSubTab !== undefined) {
    attrs.push(`data-dashboard-subtab="${escapeAttr(metric.dashboardSubTab ?? '')}"`);
  }

  if (metric.projectsTab !== undefined) {
    attrs.push(`data-projects-tab="${escapeAttr(metric.projectsTab ?? '')}"`);
  }

  if (metric.projectsSubTab !== undefined) {
    attrs.push(`data-projects-subtab="${escapeAttr(metric.projectsSubTab ?? '')}"`);
  }

  const value = normalizeNumbers(String(metric.value ?? 0));
  const label = escapeAttr(metric.label);
  const accentClass = summaryAccentClassMap[metric.accent] || summaryAccentClassMap.primary;

  return `
    <a ${attrs.join(' ')} class="${classes.join(' ')}" aria-label="${label}">
      <span class="summary-card__icon flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${accentClass}">${metric.icon}</span>
      <span class="summary-card__label text-sm font-medium text-base-content/70">${metric.label}</span>
      <span class="summary-card__value text-3xl font-bold text-base-content">${value}</span>
    </a>
  `;
}

function renderHomeSummary() {
  const container = document.querySelector('[data-home-summary]');
  if (!container) return;

  if (summaryLoading) {
    container.innerHTML = `
      <div class="w-full text-center text-base-content/60" data-i18n data-i18n-key="home.summary.loading">
        ${t('home.summary.loading', '⏳ جارٍ جلب بيانات النظام...')}
      </div>
    `;
    return;
  }

  if (summaryErrorMessage) {
    container.innerHTML = `
      <div class="alert alert-warning" role="alert">
        ${summaryErrorMessage}
      </div>
    `;
    return;
  }

  if (!summaryState) {
    container.innerHTML = `
      <div class="w-full text-center text-base-content/60">
        ${t('home.summary.empty', 'لا تتوفر بيانات بعد. ابدأ بإضافة سجلات.')} 
      </div>
    `;
    return;
  }

  const metrics = buildSummaryMetrics(summaryState);
  container.innerHTML = metrics.map(renderSummaryCard).join('');
  attachSummaryCardListeners(container);
}

async function loadHomeSummary({ silent = false } = {}) {
  if (summaryLoading) return;
  summaryLoading = true;

  if (!silent) {
    renderHomeSummary();
  }

  try {
    const response = await apiRequest('/summary/');
    summaryState = normalizeSummaryResponse(response?.data ?? null);
    summaryState = mergeSummaryWithLocalData(summaryState);
    summaryErrorMessage = '';
  } catch (error) {
    console.error('❌ [home] Failed to load summary data', error);
    summaryState = mergeSummaryWithLocalData(null);
    summaryErrorMessage = error instanceof ApiError
      ? error.message
      : t('home.summary.error', 'تعذر تحميل بيانات النظام، حاول لاحقاً');
  } finally {
    summaryLoading = false;
    renderHomeSummary();
  }
}

function handleSummaryRefresh() {
  loadHomeSummary({ silent: true }).catch((error) => {
    console.error('❌ [home] Summary refresh failed', error);
  });
}

const refreshSummaryBtn = document.getElementById('home-refresh-summary');
if (refreshSummaryBtn && !refreshSummaryBtn.dataset.listenerAttached) {
  refreshSummaryBtn.addEventListener('click', () => {
    handleSummaryRefresh();
  });
  refreshSummaryBtn.dataset.listenerAttached = 'true';
}

document.addEventListener('language:translationsReady', () => {
  updateGreetingMessage();
  renderHomeSummary();
});

document.addEventListener('language:changed', () => {
  updateGreetingMessage();
  renderHomeSummary();
});

function bootstrapHome() {
  initThemeToggle();

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
    logoutBtn.addEventListener('click', () => logout());
    logoutBtn.dataset.listenerAttached = 'true';
  }

  getCurrentUser({ refresh: true })
    .then((user) => {
      cachedUsername = user?.username || '';
      cachedRole = (user?.role || '').toLowerCase();
      updateGreetingMessage();
      updateAdminCardVisibility();
    })
    .catch(() => {
      cachedUsername = '';
      cachedRole = '';
      updateGreetingMessage();
      updateAdminCardVisibility();
    });

  updateGreetingMessage();
  updateAdminCardVisibility();
  renderHomeSummary();
  loadHomeSummary();

  document.addEventListener('customers:changed', handleSummaryRefresh, { passive: true });
  document.addEventListener('reservations:changed', handleSummaryRefresh, { passive: true });
  document.addEventListener('equipment:changed', handleSummaryRefresh, { passive: true });
  document.addEventListener('maintenance:updated', handleSummaryRefresh, { passive: true });
  document.addEventListener('technicians:updated', handleSummaryRefresh, { passive: true });
  document.addEventListener('projects:changed', handleSummaryRefresh, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrapHome();
  }, { once: true });
} else {
  bootstrapHome();
}
