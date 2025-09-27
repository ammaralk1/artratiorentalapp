import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout, getCurrentUser } from './auth.js';
import { migrateOldData } from './storage.js';
import { t } from './language.js';
import { apiRequest, ApiError } from './apiClient.js';
import { normalizeNumbers } from './utils.js';

applyStoredTheme();
migrateOldData();
checkAuth();

let cachedUsername = '';
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
    },
    {
      key: 'reservations.today',
      label: t('home.summary.reservationsToday', 'حجوزات اليوم'),
      value: summary.reservations.today,
      icon: '📆',
      accent: 'bg-success-subtle',
    },
    {
      key: 'reservations.upcoming',
      label: t('home.summary.reservationsUpcoming', 'حجوزات قادمة'),
      value: summary.reservations.upcoming,
      icon: '⏱️',
      accent: 'bg-info-subtle',
    },
    {
      key: 'projects.active',
      label: t('home.summary.projectsActive', 'مشاريع نشطة'),
      value: summary.projects.active,
      icon: '🏗️',
      accent: 'bg-warning-subtle',
    },
    {
      key: 'equipment.maintenance',
      label: t('home.summary.equipmentMaintenance', 'معدات قيد الصيانة'),
      value: summary.equipment.maintenance,
      icon: '🛠️',
      accent: 'bg-danger-subtle',
    },
    {
      key: 'maintenance.highPriority',
      label: t('home.summary.maintenanceHigh', 'بلاغات صيانة عاجلة'),
      value: summary.maintenance.highPriority,
      icon: '⚡',
      accent: 'bg-danger-subtle',
    },
    {
      key: 'technicians.busy',
      label: t('home.summary.techniciansBusy', 'أعضاء طاقم مشغولون'),
      value: summary.technicians.busy,
      icon: '👷',
      accent: 'bg-secondary-subtle',
    },
  ];
}

function renderSummaryCard(metric) {
  return `
    <div class="col-sm-6 col-lg-3">
      <div class="card h-100 shadow-sm home-summary-card">
        <div class="card-body d-flex flex-column gap-2">
          <div class="home-summary-icon ${metric.accent ?? ''}">${metric.icon}</div>
          <span class="text-muted small">${metric.label}</span>
          <span class="fs-4 fw-bold">${normalizeNumbers(String(metric.value ?? 0))}</span>
        </div>
      </div>
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

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
    logoutBtn.addEventListener('click', () => logout());
    logoutBtn.dataset.listenerAttached = 'true';
  }

  getCurrentUser({ refresh: true })
    .then((user) => {
      cachedUsername = user?.username || '';
      updateGreetingMessage();
    })
    .catch(() => {
      cachedUsername = '';
      updateGreetingMessage();
    });

  updateGreetingMessage();
  renderHomeSummary();
  loadHomeSummary();

  document.addEventListener('customers:changed', handleSummaryRefresh, { passive: true });
  document.addEventListener('reservations:changed', handleSummaryRefresh, { passive: true });
  document.addEventListener('equipment:changed', handleSummaryRefresh, { passive: true });
  document.addEventListener('maintenance:updated', handleSummaryRefresh, { passive: true });
  document.addEventListener('technicians:updated', handleSummaryRefresh, { passive: true });
  document.addEventListener('projects:changed', handleSummaryRefresh, { passive: true });
});

if (document.readyState !== 'loading') {
  updateGreetingMessage();
  renderHomeSummary();
}
