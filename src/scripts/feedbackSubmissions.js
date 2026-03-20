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
let listState = [];
let selectedId = 0;
let searchTimer = null;
let isSaving = false;

const STATUS_META = {
  new: { badge: 'badge-neutral', fallbackAr: 'جديد', fallbackEn: 'New', key: 'feedbackSubmissions.status.new' },
  reviewed: { badge: 'badge-info', fallbackAr: 'تمت المراجعة', fallbackEn: 'Reviewed', key: 'feedbackSubmissions.status.reviewed' },
  follow_up_needed: { badge: 'badge-warning', fallbackAr: 'يحتاج متابعة', fallbackEn: 'Follow-up Needed', key: 'feedbackSubmissions.status.followUpNeeded' },
  responded: { badge: 'badge-success', fallbackAr: 'تم الرد', fallbackEn: 'Responded', key: 'feedbackSubmissions.status.responded' },
  closed: { badge: 'badge-outline', fallbackAr: 'مغلق', fallbackEn: 'Closed', key: 'feedbackSubmissions.status.closed' },
};

const SERVICE_META = {
  production_consultancy: { ar: 'الاستشارات الإنتاجية', en: 'Production Consultancy' },
  commercial_photography: { ar: 'التصوير التجاري', en: 'Commercial Photography' },
  events_coverage: { ar: 'تغطية الفعاليات', en: 'Events Coverage' },
  social_media_content: { ar: 'محتوى السوشال ميديا', en: 'Social Media Content' },
  tv_commercial_ads: { ar: 'الإعلانات التلفزيونية والتجارية', en: 'TV & Commercial Ads' },
  equipment_rental: { ar: 'تأجير المعدات', en: 'Equipment Rental' },
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

function nl2br(value) {
  return escapeHtml(value).replace(/\n/g, '<br>');
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

function toDateTimeLocalValue(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  return raw.slice(0, 16).replace(' ', 'T');
}

function isSameDay(value) {
  const raw = String(value || '').trim();
  if (!raw) return false;
  const date = new Date(raw.includes('T') ? raw : raw.replace(' ', 'T'));
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  return date.getFullYear() === now.getFullYear()
    && date.getMonth() === now.getMonth()
    && date.getDate() === now.getDate();
}

function statusLabel(status) {
  const meta = STATUS_META[String(status || '').trim()] || STATUS_META.new;
  return t(meta.key, document.documentElement.lang === 'en' ? meta.fallbackEn : meta.fallbackAr);
}

function statusBadge(status) {
  const key = String(status || 'new').trim();
  const meta = STATUS_META[key] || STATUS_META.new;
  return `<span class="badge ${meta.badge}">${escapeHtml(statusLabel(key))}</span>`;
}

function serviceLabel(serviceType) {
  const key = String(serviceType || '').trim();
  if (!key) return '—';
  const entry = SERVICE_META[key];
  if (!entry) return key;
  return document.documentElement.lang === 'en' ? entry.en : entry.ar;
}

function recommendationLabel(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'yes') {
    return t('common.boolean.yes', 'نعم');
  }
  if (normalized === 'no') {
    return t('common.boolean.no', 'لا');
  }
  return '—';
}

function renderRating(rating, { compact = false } = {}) {
  const numeric = Math.max(0, Math.min(5, Number.parseInt(String(rating || '0'), 10) || 0));
  const stars = `${'★'.repeat(numeric)}${'☆'.repeat(5 - numeric)}`;
  if (compact) {
    return `${stars} ${normalizeNumbers(String(numeric))}/5`;
  }
  return `
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-warning text-lg" aria-hidden="true">${escapeHtml(stars)}</span>
      <span class="font-semibold text-base-content">${normalizeNumbers(String(numeric))}/5</span>
    </div>
  `;
}

function cacheElements() {
  els.logoutBtn = q('#logout-btn');
  els.refreshBtn = q('#feedback-submissions-refresh');
  els.statusFilter = q('#feedback-status-filter');
  els.ratingFilter = q('#feedback-rating-filter');
  els.searchFilter = q('#feedback-search-filter');
  els.tableBody = q('#feedback-submissions-body');
  els.detailContent = q('#feedback-detail-content');
  els.workflow = q('#feedback-workflow');
  els.activityList = q('#feedback-activity-list');
  els.detailStatusBadge = q('#feedback-detail-status-badge');
  els.statNew = q('#feedback-stat-new');
  els.statFollowUp = q('#feedback-stat-follow-up');
  els.statHighRated = q('#feedback-stat-high-rated');
  els.statResponded = q('#feedback-stat-responded');
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

function renderStats(rows) {
  const list = Array.isArray(rows) ? rows : [];
  const countByStatus = (status) => list.filter((row) => String(row?.status || '') === status).length;

  if (els.statNew) els.statNew.textContent = normalizeNumbers(String(countByStatus('new')));
  if (els.statFollowUp) els.statFollowUp.textContent = normalizeNumbers(String(countByStatus('follow_up_needed')));
  if (els.statHighRated) {
    const count = list.filter((row) => Number.parseInt(String(row?.overall_rating || '0'), 10) >= 4).length;
    els.statHighRated.textContent = normalizeNumbers(String(count));
  }
  if (els.statResponded) {
    const count = countByStatus('responded') + countByStatus('closed');
    els.statResponded.textContent = normalizeNumbers(String(count));
  }
}

function renderTable(rows) {
  if (!els.tableBody) return;

  if (!Array.isArray(rows) || rows.length === 0) {
    els.tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-base-content/60">
          ${t('feedbackSubmissions.table.empty', 'لا توجد تقييمات مطابقة للفلترة الحالية.')}
        </td>
      </tr>
    `;
    return;
  }

  els.tableBody.innerHTML = rows.map((row) => {
    const activeClass = Number(row.id) === Number(selectedId) ? 'bg-primary/5' : '';
    return `
      <tr class="${activeClass}">
        <td>${escapeHtml(row.feedback_code || '—')}</td>
        <td>
          <div class="font-semibold">${escapeHtml(row.full_name || '—')}</div>
          <div class="text-xs text-base-content/60">${escapeHtml(row.company_name || '—')}</div>
        </td>
        <td>
          <div class="font-medium text-base-content">${escapeHtml(serviceLabel(row.service_type))}</div>
          <div class="text-xs text-base-content/60">${escapeHtml(recommendationLabel(row.recommendation))}</div>
        </td>
        <td>${escapeHtml(renderRating(row.overall_rating, { compact: true }))}</td>
        <td>${statusBadge(row.status)}</td>
        <td>${escapeHtml(formatDateTime(row.follow_up_at))}</td>
        <td>${escapeHtml(formatDateTime(row.created_at))}</td>
        <td>
          <button type="button" class="btn btn-sm btn-primary" data-feedback-select="${escapeHtml(row.id)}">
            ${t('actions.view', '👁️ عرض')}
          </button>
        </td>
      </tr>
    `;
  }).join('');

  els.tableBody.querySelectorAll('[data-feedback-select]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.getAttribute('data-feedback-select') || 0);
      if (id > 0) {
        loadFeedbackDetails(id);
      }
    });
  });
}

function renderDetailPlaceholder() {
  if (els.detailContent) {
    els.detailContent.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-6 text-center text-base-content/60">
        ${t('feedbackSubmissions.details.empty', 'اختر تقييماً من القائمة لبدء المتابعة.')}
      </div>
    `;
  }
  if (els.workflow) {
    els.workflow.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-6 text-center text-base-content/60">
        ${t('feedbackSubmissions.workflow.empty', 'اختر تقييماً أولاً لتظهر أدوات التحديث.')}
      </div>
    `;
  }
  if (els.activityList) {
    els.activityList.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${t('feedbackSubmissions.activity.empty', 'لا يوجد نشاط بعد.')}
      </div>
    `;
  }
  if (els.detailStatusBadge) {
    els.detailStatusBadge.textContent = '—';
    els.detailStatusBadge.className = 'badge badge-outline';
  }
}

function renderFeedbackDetails(payload) {
  const feedback = payload?.feedback;
  const activities = Array.isArray(payload?.activities) ? payload.activities : [];

  if (!feedback) {
    renderDetailPlaceholder();
    return;
  }

  const emailStatus = String(feedback.notification_sent ?? '0') === '1'
    ? t('common.boolean.yes', 'نعم')
    : t('common.boolean.no', 'لا');

  if (els.detailContent) {
    els.detailContent.innerHTML = `
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl bg-base-200/50 p-4">
          <div class="text-sm text-base-content/60">${t('feedbackSubmissions.table.customer', 'العميل')}</div>
          <div class="mt-2 text-lg font-semibold text-base-content">${escapeHtml(feedback.full_name || '—')}</div>
          <div class="mt-2 text-sm text-base-content/75">${escapeHtml(feedback.company_name || '—')}</div>
        </div>
        <div class="rounded-2xl bg-base-200/50 p-4">
          <div class="text-sm text-base-content/60">${t('feedbackSubmissions.details.rating', 'التقييم')}</div>
          <div class="mt-2">${renderRating(feedback.overall_rating)}</div>
          <div class="mt-2 text-sm text-base-content/75">${escapeHtml(feedback.feedback_code || '—')}</div>
        </div>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-base-300 p-4">
          <div class="text-sm text-base-content/60">${t('feedbackSubmissions.table.contact', 'التواصل')}</div>
          <div class="mt-2 space-y-2">
            <div class="font-medium text-base-content">${escapeHtml(feedback.email || '—')}</div>
            <div class="text-sm text-base-content/75">${escapeHtml(serviceLabel(feedback.service_type))}</div>
          </div>
        </div>
        <div class="rounded-2xl border border-base-300 p-4">
          <div class="text-sm text-base-content/60">${t('feedbackSubmissions.details.meta', 'بيانات إضافية')}</div>
          <div class="mt-2 space-y-2 text-sm text-base-content/75">
            <div>${t('feedbackSubmissions.details.recommendation', 'التوصية')}: ${escapeHtml(recommendationLabel(feedback.recommendation))}</div>
            <div>${t('feedbackSubmissions.details.createdAt', 'تاريخ الإنشاء')}: ${escapeHtml(formatDateTime(feedback.created_at))}</div>
            <div>${t('feedbackSubmissions.details.lastResponded', 'آخر رد')}: ${escapeHtml(formatDateTime(feedback.last_responded_at))}</div>
            <div>${t('feedbackSubmissions.details.emailSent', 'تم إرسال الإيميل')}: ${escapeHtml(emailStatus)}</div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border border-base-300 p-4">
        <div class="text-sm text-base-content/60">${t('feedbackSubmissions.details.message', 'نص التقييم')}</div>
        <div class="mt-3 leading-8 text-base-content">${nl2br(feedback.feedback_message || '—')}</div>
      </div>
    `;
  }

  if (els.workflow) {
    els.workflow.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" class="btn btn-outline btn-sm" id="feedback-assign-btn">
            ${t('feedbackSubmissions.workflow.assignToMe', 'تعيين لي')}
          </button>
          <button type="button" class="btn btn-outline btn-sm" id="feedback-mark-responded-btn">
            ${t('feedbackSubmissions.workflow.markResponded', 'تسجيل تم الرد')}
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <label for="feedback-detail-status" class="font-medium text-base-content">${t('feedbackSubmissions.workflow.status', 'الحالة')}</label>
          <select id="feedback-detail-status" class="select select-bordered w-full">
            ${Object.keys(STATUS_META).map((status) => `
              <option value="${escapeHtml(status)}" ${status === feedback.status ? 'selected' : ''}>${escapeHtml(statusLabel(status))}</option>
            `).join('')}
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label for="feedback-detail-follow-up" class="font-medium text-base-content">${t('feedbackSubmissions.workflow.followUpAt', 'موعد المتابعة القادم')}</label>
          <input id="feedback-detail-follow-up" type="datetime-local" class="input input-bordered w-full" value="${escapeHtml(toDateTimeLocalValue(feedback.follow_up_at))}">
        </div>
        <div class="flex flex-col gap-2">
          <label for="feedback-detail-notes" class="font-medium text-base-content">${t('feedbackSubmissions.workflow.internalNotes', 'ملاحظات داخلية')}</label>
          <textarea id="feedback-detail-notes" class="textarea textarea-bordered min-h-36 w-full">${escapeHtml(feedback.internal_notes || '')}</textarea>
        </div>
        <button type="button" class="btn btn-primary w-full" id="feedback-save-btn">
          ${t('feedbackSubmissions.workflow.save', 'حفظ التحديثات')}
        </button>
      </div>
    `;

    q('#feedback-save-btn')?.addEventListener('click', () => saveFeedbackChanges({}));
    q('#feedback-mark-responded-btn')?.addEventListener('click', () => saveFeedbackChanges({ markResponded: true }));
    q('#feedback-assign-btn')?.addEventListener('click', () => saveFeedbackChanges({ assignToMe: true }));
  }

  if (els.activityList) {
    if (!activities.length) {
      els.activityList.innerHTML = `
        <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
          ${t('feedbackSubmissions.activity.empty', 'لا يوجد نشاط بعد.')}
        </div>
      `;
    } else {
      els.activityList.innerHTML = activities.map((item) => `
        <article class="rounded-2xl border border-base-300 p-4">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <strong class="text-base-content">${escapeHtml(item.username || 'system')}</strong>
            <span class="text-xs text-base-content/60">${escapeHtml(formatDateTime(item.created_at))}</span>
          </div>
          <p class="mt-2 text-sm leading-7 text-base-content/80">${escapeHtml(item.message || '')}</p>
        </article>
      `).join('');
    }
  }

  if (els.detailStatusBadge) {
    els.detailStatusBadge.className = `badge ${STATUS_META[feedback.status]?.badge || 'badge-outline'}`;
    els.detailStatusBadge.textContent = statusLabel(feedback.status);
  }
}

async function loadFeedbackSubmissions({ preserveSelection = true } = {}) {
  if (!els.tableBody) return;

  els.tableBody.innerHTML = `
    <tr>
      <td colspan="8" class="text-center text-base-content/60">
        ${t('feedbackSubmissions.table.loading', '⏳ جارٍ تحميل التقييمات...')}
      </td>
    </tr>
  `;

  try {
    const params = new URLSearchParams();
    const status = String(els.statusFilter?.value || '').trim();
    const rating = String(els.ratingFilter?.value || '').trim();
    const search = String(els.searchFilter?.value || '').trim();
    if (status) params.set('status', status);
    if (rating) params.set('rating', rating);
    if (search) params.set('search', search);
    params.set('limit', '100');

    const response = await apiRequest(`/feedback/admin.php?${params.toString()}`);
    listState = Array.isArray(response?.data) ? response.data : [];
    renderStats(listState);
    renderTable(listState);

    if (!preserveSelection) {
      selectedId = 0;
      renderDetailPlaceholder();
      return;
    }

    const selectedStillExists = listState.some((row) => Number(row.id) === Number(selectedId));
    if (selectedId > 0 && selectedStillExists) {
      await loadFeedbackDetails(selectedId, { silentOnError: true });
      return;
    }

    selectedId = 0;
    renderDetailPlaceholder();
  } catch (error) {
    console.error('Failed to load feedback submissions', error);
    renderStats([]);
    els.tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-error">
          ${escapeHtml(error instanceof ApiError ? error.message : t('feedbackSubmissions.table.error', 'تعذر تحميل تقييمات العملاء.'))}
        </td>
      </tr>
    `;
    renderDetailPlaceholder();
  }
}

async function loadFeedbackDetails(id, { silentOnError = false } = {}) {
  const numericId = Number(id || 0);
  if (numericId <= 0) {
    renderDetailPlaceholder();
    return;
  }

  try {
    const response = await apiRequest(`/feedback/admin.php?id=${encodeURIComponent(numericId)}`);
    selectedId = numericId;
    renderTable(listState);
    renderFeedbackDetails(response?.data ?? null);
  } catch (error) {
    console.error('Failed to load feedback details', error);
    if (!silentOnError) {
      showToast(
        error instanceof ApiError ? error.message : t('feedbackSubmissions.details.error', 'تعذر تحميل تفاصيل التقييم.'),
        'error',
      );
    }
  }
}

async function saveFeedbackChanges({ markResponded = false, assignToMe = false } = {}) {
  if (selectedId <= 0 || isSaving) return;

  const statusEl = q('#feedback-detail-status');
  const followUpEl = q('#feedback-detail-follow-up');
  const notesEl = q('#feedback-detail-notes');
  const saveBtn = q('#feedback-save-btn');

  const payload = {
    id: selectedId,
    status: statusEl?.value || 'new',
    follow_up_at: followUpEl?.value || '',
    internal_notes: notesEl?.value || '',
  };

  if (markResponded) {
    payload.mark_responded = true;
  }
  if (assignToMe) {
    payload.assign_to_me = true;
  }

  isSaving = true;
  [saveBtn, q('#feedback-mark-responded-btn'), q('#feedback-assign-btn')].forEach((element) => {
    if (element) element.disabled = true;
  });

  try {
    const response = await apiRequest('/feedback/admin.php', {
      method: 'PATCH',
      body: payload,
    });
    renderFeedbackDetails(response?.data ?? null);
    await loadFeedbackSubmissions();
    showToast(t('feedbackSubmissions.workflow.saved', 'تم حفظ التحديثات بنجاح.'), 'success');
  } catch (error) {
    console.error('Failed to save feedback changes', error);
    showToast(
      error instanceof ApiError ? error.message : t('feedbackSubmissions.workflow.saveError', 'تعذر حفظ التحديثات.'),
      'error',
    );
  } finally {
    isSaving = false;
    [saveBtn, q('#feedback-mark-responded-btn'), q('#feedback-assign-btn')].forEach((element) => {
      if (element) element.disabled = false;
    });
  }
}

function attachEvents() {
  if (els.logoutBtn && !els.logoutBtn.dataset.listenerAttached) {
    els.logoutBtn.addEventListener('click', () => logout());
    els.logoutBtn.dataset.listenerAttached = 'true';
  }

  els.refreshBtn?.addEventListener('click', () => {
    loadFeedbackSubmissions({ preserveSelection: true });
  });

  els.statusFilter?.addEventListener('change', () => {
    loadFeedbackSubmissions({ preserveSelection: false });
  });

  els.ratingFilter?.addEventListener('change', () => {
    loadFeedbackSubmissions({ preserveSelection: false });
  });

  els.searchFilter?.addEventListener('input', () => {
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      loadFeedbackSubmissions({ preserveSelection: false });
    }, 300);
  });
}

async function bootstrap() {
  cacheElements();
  attachEvents();
  renderDetailPlaceholder();

  try {
    currentUser = await checkAuth({ redirect: false });
    if (!currentUser) {
      currentUser = await getCurrentUser({ refresh: true });
    }
  } catch {
    currentUser = null;
  }

  if (!currentUser) {
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
  await loadFeedbackSubmissions({ preserveSelection: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch((error) => {
      console.error('Failed to bootstrap feedback submissions page', error);
    });
  }, { once: true });
} else {
  bootstrap().catch((error) => {
    console.error('Failed to bootstrap feedback submissions page', error);
  });
}
