import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, getCurrentUser, logout } from './auth.js';
import { apiRequest, ApiError } from './apiClient.js';
import { showToast, normalizeNumbers } from './utils.js';
import { t } from './language.js';
import { initDashboardShell } from './dashboardShell.js';

applyStoredTheme();
initDashboardShell();
initThemeToggle();

const els = {};
let currentUser = null;
let currentDays = 30;
let currentPayload = null;
let currentFilters = {
  pageType: '',
  deviceType: '',
  sourceType: '',
};

function q(selector) {
  return document.querySelector(selector);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return normalizeNumbers('0');
  return normalizeNumbers(numeric % 1 === 0 ? String(Math.trunc(numeric)) : numeric.toFixed(2));
}

function formatDateTime(value) {
  const raw = String(value || '').trim();
  if (!raw) return '—';

  const normalized = raw.includes('T') ? raw : raw.replace(' ', 'T');
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return raw;

  try {
    return new Intl.DateTimeFormat(document.documentElement.lang || 'ar', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return raw;
  }
}

function formatDayLabel(value) {
  const raw = String(value || '').trim();
  if (!raw) return '—';
  const date = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(date.getTime())) return raw;

  try {
    return new Intl.DateTimeFormat(document.documentElement.lang || 'ar', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return raw;
  }
}

function humanizePagePath(path) {
  const raw = String(path || '').trim();
  if (!raw || raw === '/') {
    return t('siteAnalytics.common.homepage', 'الصفحة الرئيسية');
  }

  return raw.replace(/[-_/]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function humanizeSource(source) {
  const normalized = String(source || '').trim().toLowerCase();
  if (!normalized || normalized === '(direct)') {
    return t('siteAnalytics.sources.direct', 'دخول مباشر');
  }
  if (normalized === '(internal)') {
    return t('siteAnalytics.sources.internal', 'تنقل داخلي');
  }
  if (normalized === '(unknown)') {
    return t('siteAnalytics.sources.unknown', 'غير معروف');
  }
  return source;
}

function humanizeDevice(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'mobile') return t('siteAnalytics.devices.mobile', 'جوال');
  if (normalized === 'tablet') return t('siteAnalytics.devices.tablet', 'تابلت');
  return t('siteAnalytics.devices.desktop', 'سطح المكتب');
}

function humanizePageType(value) {
  const normalized = String(value || '').trim().toLowerCase();
  const labels = {
    index: t('siteAnalytics.pageTypes.index', 'الرئيسية'),
    contact: t('siteAnalytics.pageTypes.contact', 'تواصل معنا'),
    feedback: t('siteAnalytics.pageTypes.feedback', 'رأيك يهمنا'),
    portfolio: t('siteAnalytics.pageTypes.portfolio', 'الأعمال'),
    service: t('siteAnalytics.pageTypes.service', 'الخدمات'),
    shop: t('siteAnalytics.pageTypes.shop', 'المتجر'),
    about: t('siteAnalytics.pageTypes.about', 'من نحن'),
    blog: t('siteAnalytics.pageTypes.blog', 'المدونة'),
  };
  return labels[normalized] || humanizePagePath(normalized);
}

function humanizeSourceType(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'external') return t('siteAnalytics.filters.sourceExternal', 'خارجي');
  if (normalized === 'internal') return t('siteAnalytics.sources.internal', 'تنقل داخلي');
  return t('siteAnalytics.sources.direct', 'دخول مباشر');
}

function cacheElements() {
  els.logoutBtn = q('#logout-btn');
  els.refreshBtn = q('#site-analytics-refresh');
  els.rangeSelect = q('#site-analytics-range');
  els.pageTypeSelect = q('#site-analytics-page-type');
  els.deviceTypeSelect = q('#site-analytics-device-type');
  els.sourceTypeSelect = q('#site-analytics-source-type');
  els.rangeLabel = q('#site-analytics-range-label');
  els.statVisitors = q('#analytics-stat-visitors');
  els.statSessions = q('#analytics-stat-sessions');
  els.statPageViews = q('#analytics-stat-page-views');
  els.statAvgPages = q('#analytics-stat-avg-pages');
  els.statContactLeads = q('#analytics-stat-contact-leads');
  els.statFeedback = q('#analytics-stat-feedback');
  els.topPagesBody = q('#site-analytics-top-pages-body');
  els.sourcesList = q('#site-analytics-sources-list');
  els.devicesGrid = q('#site-analytics-devices-grid');
  els.dailyList = q('#site-analytics-daily-list');
}

function updateRoleVisibility() {
  const role = String(currentUser?.role || '').toLowerCase();
  const isAdmin = role === 'admin';
  const isManager = isAdmin || role === 'manager';

  document.querySelectorAll('[data-admin-card]').forEach((element) => {
    element.classList.toggle('hidden', !isAdmin);
  });
  document.querySelectorAll('[data-manager-card]').forEach((element) => {
    element.classList.toggle('hidden', !isManager);
  });
}

function revealPage() {
  document.body.classList.remove('auth-pending');
}

function renderOverview(overview) {
  const payload = overview || {};
  if (els.statVisitors) els.statVisitors.textContent = formatNumber(payload.unique_visitors || 0);
  if (els.statSessions) els.statSessions.textContent = formatNumber(payload.sessions || 0);
  if (els.statPageViews) els.statPageViews.textContent = formatNumber(payload.page_views || 0);
  if (els.statAvgPages) els.statAvgPages.textContent = formatNumber(payload.avg_pages_per_session || 0);
  if (els.statContactLeads) els.statContactLeads.textContent = payload.contact_leads == null ? '—' : formatNumber(payload.contact_leads || 0);
  if (els.statFeedback) els.statFeedback.textContent = payload.feedback_submissions == null ? '—' : formatNumber(payload.feedback_submissions || 0);
}

function renderRangeLabel(range) {
  if (!els.rangeLabel) return;
  if (!range?.from || !range?.to) {
    els.rangeLabel.textContent = '';
    return;
  }

  const parts = [
    `${t('common.range.from', 'من')} ${formatDateTime(range.from)} ${t('common.range.to', 'إلى')} ${formatDateTime(range.to)}`,
  ];
  if (currentFilters.pageType) {
    parts.push(`${t('siteAnalytics.filters.pageType', 'نوع الصفحة')}: ${humanizePageType(currentFilters.pageType)}`);
  }
  if (currentFilters.deviceType) {
    parts.push(`${t('siteAnalytics.filters.device', 'الجهاز')}: ${humanizeDevice(currentFilters.deviceType)}`);
  }
  if (currentFilters.sourceType) {
    parts.push(`${t('siteAnalytics.filters.source', 'المصدر')}: ${humanizeSourceType(currentFilters.sourceType)}`);
  }
  els.rangeLabel.textContent = parts.join(' • ');
}

function syncSelectValue(select, value) {
  if (!select) return;
  select.value = String(value || '');
}

function renderFilterOptions(payload) {
  const options = payload?.filter_options || {};
  if (els.pageTypeSelect) {
    const pageTypes = Array.isArray(options.page_types) ? options.page_types : [];
    els.pageTypeSelect.innerHTML = [
      `<option value="">${escapeHtml(t('siteAnalytics.filters.allPageTypes', 'كل الصفحات'))}</option>`,
      ...pageTypes.map((pageType) => `<option value="${escapeHtml(pageType)}">${escapeHtml(humanizePageType(pageType))}</option>`),
    ].join('');
  }

  syncSelectValue(els.pageTypeSelect, currentFilters.pageType);
  syncSelectValue(els.deviceTypeSelect, currentFilters.deviceType);
  syncSelectValue(els.sourceTypeSelect, currentFilters.sourceType);
}

function renderTopPages(rows) {
  if (!els.topPagesBody) return;
  const list = Array.isArray(rows) ? rows : [];

  if (!list.length) {
    els.topPagesBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-base-content/60">${t('siteAnalytics.empty', 'لا توجد بيانات كافية للفترة الحالية.')}</td>
      </tr>
    `;
    return;
  }

  els.topPagesBody.innerHTML = list.map((row) => `
    <tr>
      <td>
        <div class="font-semibold text-base-content">${escapeHtml(row.page_title || humanizePagePath(row.page_path))}</div>
        <div class="text-xs text-base-content/60">${escapeHtml(row.page_path || '/')}</div>
      </td>
      <td>${formatNumber(row.views || 0)}</td>
      <td>${formatNumber(row.visitors || 0)}</td>
      <td>${formatNumber(row.sessions || 0)}</td>
      <td>${escapeHtml(formatDateTime(row.last_visited_at))}</td>
    </tr>
  `).join('');
}

function renderSources(rows) {
  if (!els.sourcesList) return;
  const list = Array.isArray(rows) ? rows : [];

  if (!list.length) {
    els.sourcesList.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${t('siteAnalytics.empty', 'لا توجد بيانات كافية للفترة الحالية.')}
      </div>
    `;
    return;
  }

  els.sourcesList.innerHTML = list.map((row) => `
    <div class="rounded-2xl border border-base-300/80 bg-base-100/60 p-4">
      <div class="flex items-center justify-between gap-3">
        <div>
          <div class="font-semibold text-base-content">${escapeHtml(humanizeSource(row.source))}</div>
          <div class="text-xs text-base-content/60">${escapeHtml(String(row.source || '').trim() || '(direct)')}</div>
        </div>
        <div class="text-end">
          <div class="text-lg font-bold text-base-content">${formatNumber(row.views || 0)}</div>
          <div class="text-xs text-base-content/60">${t('siteAnalytics.sources.viewsLabel', 'مشاهدات')}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderDevices(rows) {
  if (!els.devicesGrid) return;
  const list = Array.isArray(rows) ? rows : [];

  if (!list.length) {
    els.devicesGrid.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60 sm:col-span-3">
        ${t('siteAnalytics.empty', 'لا توجد بيانات كافية للفترة الحالية.')}
      </div>
    `;
    return;
  }

  els.devicesGrid.innerHTML = list.map((row) => `
    <article class="rounded-2xl border border-base-300/80 bg-base-100/60 p-4 text-center">
      <div class="text-sm text-base-content/60">${escapeHtml(humanizeDevice(row.device_type))}</div>
      <div class="mt-2 text-2xl font-bold text-base-content">${formatNumber(row.views || 0)}</div>
      <div class="mt-1 text-xs text-base-content/60">${formatNumber(row.percentage || 0)}%</div>
    </article>
  `).join('');
}

function renderDaily(rows) {
  if (!els.dailyList) return;
  const list = Array.isArray(rows) ? rows : [];

  if (!list.length) {
    els.dailyList.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${t('siteAnalytics.empty', 'لا توجد بيانات كافية للفترة الحالية.')}
      </div>
    `;
    return;
  }

  const maxViews = list.reduce((max, row) => Math.max(max, Number(row.page_views || 0)), 0) || 1;
  els.dailyList.innerHTML = list.map((row) => {
    const width = Math.max(6, Math.round((Number(row.page_views || 0) / maxViews) * 100));
    return `
      <div class="grid gap-3 rounded-2xl border border-base-300/70 p-4 md:grid-cols-[120px_minmax(0,1fr)_120px] md:items-center">
        <div class="font-medium text-base-content">${escapeHtml(formatDayLabel(row.date))}</div>
        <div class="h-3 overflow-hidden rounded-full bg-base-200">
          <div class="h-full rounded-full bg-primary/80" style="width:${width}%;"></div>
        </div>
        <div class="text-sm text-base-content/70">${formatNumber(row.page_views || 0)} ${escapeHtml(t('siteAnalytics.daily.viewsUnit', 'مشاهدة'))}</div>
      </div>
    `;
  }).join('');
}

function renderLoadingState() {
  if (els.topPagesBody) {
    els.topPagesBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-base-content/60">${t('siteAnalytics.loading', '⏳ جارٍ تحميل الإحصائيات...')}</td>
      </tr>
    `;
  }
  if (els.sourcesList) {
    els.sourcesList.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${t('siteAnalytics.loading', '⏳ جارٍ تحميل الإحصائيات...')}
      </div>
    `;
  }
  if (els.devicesGrid) {
    els.devicesGrid.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60 sm:col-span-3">
        ${t('siteAnalytics.loading', '⏳ جارٍ تحميل الإحصائيات...')}
      </div>
    `;
  }
  if (els.dailyList) {
    els.dailyList.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${t('siteAnalytics.loading', '⏳ جارٍ تحميل الإحصائيات...')}
      </div>
    `;
  }
}

function renderPayload(payload) {
  currentPayload = payload || null;
  renderFilterOptions(payload);
  renderOverview(payload?.overview);
  renderRangeLabel(payload?.range);
  renderTopPages(payload?.top_pages);
  renderSources(payload?.top_sources);
  renderDevices(payload?.device_breakdown);
  renderDaily(payload?.visits_by_day);
}

async function loadAnalytics() {
  renderLoadingState();

  try {
    const query = new URLSearchParams({
      days: String(currentDays),
    });
    if (currentFilters.pageType) query.set('page_type', currentFilters.pageType);
    if (currentFilters.deviceType) query.set('device_type', currentFilters.deviceType);
    if (currentFilters.sourceType) query.set('source_type', currentFilters.sourceType);

    const response = await apiRequest(`/analytics/admin.php?${query.toString()}`);
    renderPayload(response?.data || null);
  } catch (error) {
    console.error('❌ Failed to load site analytics', error);
    if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
      window.location.href = 'home.html';
      return;
    }

    const message = error instanceof ApiError
      ? error.message
      : t('siteAnalytics.error', 'تعذر تحميل إحصائيات الموقع.');
    showToast(message, 'error', 4500);

    if (els.topPagesBody) {
      els.topPagesBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-error">${escapeHtml(t('siteAnalytics.error', 'تعذر تحميل إحصائيات الموقع.'))}</td>
        </tr>
      `;
    }
  }
}

function bindEvents() {
  if (els.logoutBtn) {
    els.logoutBtn.addEventListener('click', logout);
  }
  if (els.refreshBtn) {
    els.refreshBtn.addEventListener('click', () => {
      loadAnalytics();
    });
  }
  if (els.rangeSelect) {
    els.rangeSelect.addEventListener('change', () => {
      const nextValue = Number.parseInt(String(els.rangeSelect.value || '30'), 10);
      currentDays = Number.isFinite(nextValue) && nextValue > 0 ? nextValue : 30;
      loadAnalytics();
    });
  }
  if (els.pageTypeSelect) {
    els.pageTypeSelect.addEventListener('change', () => {
      currentFilters.pageType = String(els.pageTypeSelect.value || '').trim();
      loadAnalytics();
    });
  }
  if (els.deviceTypeSelect) {
    els.deviceTypeSelect.addEventListener('change', () => {
      currentFilters.deviceType = String(els.deviceTypeSelect.value || '').trim();
      loadAnalytics();
    });
  }
  if (els.sourceTypeSelect) {
    els.sourceTypeSelect.addEventListener('change', () => {
      currentFilters.sourceType = String(els.sourceTypeSelect.value || '').trim();
      loadAnalytics();
    });
  }

  document.addEventListener('language:changed', () => {
    if (currentPayload) {
      renderPayload(currentPayload);
    }
  });
}

async function bootstrap() {
  cacheElements();

  try {
    currentUser = await checkAuth();
    const hydratedUser = await getCurrentUser();
    if (hydratedUser) {
      currentUser = hydratedUser;
    }
  } catch (error) {
    console.error('❌ Site analytics auth failed', error);
    window.location.href = 'login.html';
    return;
  }

  const role = String(currentUser?.role || '').toLowerCase();
  if (role !== 'admin' && role !== 'manager') {
    window.location.href = 'home.html';
    return;
  }

  updateRoleVisibility();
  revealPage();
  bindEvents();
  await loadAnalytics();
}

bootstrap();
