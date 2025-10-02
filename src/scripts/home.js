import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout, getCurrentUser } from './auth.js';
import { migrateOldData } from './storage.js';
import { t } from './language.js';
import { apiRequest, ApiError } from './apiClient.js';
import { normalizeNumbers } from './utils.js';
import { updatePreferences } from './preferencesService.js';

applyStoredTheme();
migrateOldData();
checkAuth();

let cachedUsername = '';
let cachedRole = '';
let summaryState = null;
let summaryLoading = false;
let summaryErrorMessage = '';

function updateGreetingMessage() {
  const greeting = document.querySelector('[data-home-greeting]');
  if (!greeting) return;

  if (cachedUsername) {
    const template = t('home.hero.greetingUser', 'مرحباً {name}');
    greeting.textContent = template.replace('{name}', cachedUsername);
    return;
  }

  greeting.textContent = t('home.hero.title', 'مرحباً بك');
}

function updateAdminCardVisibility() {
  const isAdmin = cachedRole === 'admin';
  document.querySelectorAll('[data-admin-card]').forEach((element) => {
    if (isAdmin) {
      element.classList.remove('d-none');
    } else {
      element.classList.add('d-none');
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

function buildSummaryMetrics(summary) {
  return [
    {
      key: 'customers.total',
      label: t('home.summary.customers', 'إجمالي العملاء'),
      value: summary.customers.total,
      icon: '👥',
      accent: 'bg-primary-subtle',
      href: 'dashboard.html#customers-tab',
      dashboardTab: 'customers-tab',
    },
    {
      key: 'reservations.today',
      label: t('home.summary.reservationsToday', 'حجوزات اليوم'),
      value: summary.reservations.today,
      icon: '🛎️',
      accent: 'bg-success-subtle',
      href: 'dashboard.html#reservations-tab',
      dashboardTab: 'reservations-tab',
      dashboardSubTab: 'my-reservations-tab',
    },
    {
      key: 'reservations.upcoming',
      label: t('home.summary.reservationsUpcoming', 'حجوزات قادمة'),
      value: summary.reservations.upcoming,
      icon: '🔔',
      accent: 'bg-info-subtle',
      href: 'dashboard.html#reservations-tab',
      dashboardTab: 'reservations-tab',
      dashboardSubTab: 'calendar-tab',
    },
    {
      key: 'projects.active',
      label: t('home.summary.projectsActive', 'مشاريع نشطة'),
      value: summary.projects.active,
      icon: '🏗️',
      accent: 'bg-warning-subtle',
      href: 'projects.html#projects-section',
      projectsTab: 'projects-section',
      projectsSubTab: 'projects-list-tab',
    },
    {
      key: 'equipment.maintenance',
      label: t('home.summary.equipmentMaintenance', 'معدات قيد الصيانة'),
      value: summary.equipment.maintenance,
      icon: '🛠️',
      accent: 'bg-danger-subtle',
      href: 'dashboard.html#maintenance-tab',
      dashboardTab: 'maintenance-tab',
    },
    {
      key: 'maintenance.highPriority',
      label: t('home.summary.maintenanceHigh', 'بلاغات صيانة عاجلة'),
      value: summary.maintenance.highPriority,
      icon: '⚡',
      accent: 'bg-danger-subtle',
      href: 'dashboard.html#maintenance-tab',
      dashboardTab: 'maintenance-tab',
    },
    {
      key: 'technicians.busy',
      label: t('home.summary.techniciansBusy', 'أعضاء طاقم مشغولون'),
      value: summary.technicians.busy,
      icon: '👷',
      accent: 'bg-secondary-subtle',
      href: 'dashboard.html#technicians-tab',
      dashboardTab: 'technicians-tab',
    },
  ];
}

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
  const classes = ['card', 'home-summary-card', 'shadow-sm', 'h-100', 'text-reset', 'text-decoration-none'];
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

  return `
    <div class="col-6 col-md-4 col-xl-3 col-xxl-2">
      <a ${attrs.join(' ')} class="${classes.join(' ')}" aria-label="${label}">
        <div class="card-body d-flex flex-column align-items-center text-center gap-1 gap-md-2">
          <div class="home-summary-icon ${metric.accent ?? ''}">${metric.icon}</div>
          <span class="home-summary-label text-muted small mb-0">${metric.label}</span>
          <span class="home-summary-value fw-semibold">${value}</span>
        </div>
      </a>
    </div>
  `;
}

function renderHomeSummary() {
  const container = document.querySelector('[data-home-summary]');
  if (!container) return;

  if (summaryLoading) {
    container.innerHTML = `
      <div class="col-12 text-center text-muted" data-i18n data-i18n-key="home.summary.loading">
        ${t('home.summary.loading', '⏳ جارٍ جلب بيانات النظام...')}
      </div>
    `;
    return;
  }

  if (summaryErrorMessage) {
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning mb-0" role="alert">
          ${summaryErrorMessage}
        </div>
      </div>
    `;
    return;
  }

  if (!summaryState) {
    container.innerHTML = `
      <div class="col-12 text-center text-muted">
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
    summaryErrorMessage = '';
  } catch (error) {
    console.error('❌ [home] Failed to load summary data', error);
    summaryState = null;
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
