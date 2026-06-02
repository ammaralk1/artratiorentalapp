import '../styles/app.css';
import '../styles/record-management.css';
import '../styles/feedback-submissions.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, getCurrentUser, logout } from './auth.js';
import { apiRequest, ApiError } from './apiClient.js';
import { showToast, normalizeNumbers } from './utils.js';
import { t } from './language.js';
import { initDashboardShell } from './dashboardShell.js';
import { getEquipmentPaginationState, buildEquipmentPageNumbers } from './equipmentPagination.js';
import { jumpPaginationSectionToStart, settlePaginationSectionToStart } from './ui/paginationViewport.js';

applyStoredTheme();
initDashboardShell();
initThemeToggle();

const els = {};
let currentUser = null;
let listState = [];
let selectedId = 0;
let searchTimer = null;
let isSaving = false;
const feedbackPagination = { page: 1, pageSize: 10 };
const TABLE_COLSPAN = 8;
const DEFAULT_STATUS_CHIP_CLASS = 'status-chip status-completed';
const DEFAULT_STATUS_BADGE_CLASS = `feedback-submissions-status-badge ${DEFAULT_STATUS_CHIP_CLASS}`;

const DETAIL_CARD_CLASS = 'feedback-submissions-detail-card ui-card ui-card--content p-4';
const EMPTY_STATE_CLASS = 'feedback-submissions-empty-state ui-empty-state surface-empty-state';
const PRIMARY_BUTTON_SM_CLASS = 'ui-button ui-button--primary btn btn-primary btn-sm';
const PRIMARY_BUTTON_CLASS = 'ui-button ui-button--primary btn btn-primary';
const OUTLINE_BUTTON_SM_CLASS = 'ui-button ui-button--outline btn btn-outline btn-sm';
const SELECT_CLASS = 'ui-select select select-bordered w-full';
const INPUT_CLASS = 'ui-input input input-bordered w-full';
const TEXTAREA_CLASS = 'ui-textarea textarea textarea-bordered min-h-36 w-full';

const STATUS_META = {
  new: { badge: 'status-chip status-confirmed', fallbackAr: 'جديد', fallbackEn: 'New', key: 'feedbackSubmissions.status.new' },
  reviewed: { badge: 'status-chip status-info', fallbackAr: 'تمت المراجعة', fallbackEn: 'Reviewed', key: 'feedbackSubmissions.status.reviewed' },
  follow_up_needed: { badge: 'status-chip status-pending', fallbackAr: 'يحتاج متابعة', fallbackEn: 'Follow-up Needed', key: 'feedbackSubmissions.status.followUpNeeded' },
  responded: { badge: 'status-chip status-confirmed', fallbackAr: 'تم الرد', fallbackEn: 'Responded', key: 'feedbackSubmissions.status.responded' },
  closed: { badge: 'status-chip status-completed', fallbackAr: 'مغلق', fallbackEn: 'Closed', key: 'feedbackSubmissions.status.closed' },
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

function statusLabel(status) {
  const meta = STATUS_META[String(status || '').trim()] || STATUS_META.new;
  return t(meta.key, document.documentElement.lang === 'en' ? meta.fallbackEn : meta.fallbackAr);
}

function statusBadge(status) {
  const key = String(status || 'new').trim();
  const meta = STATUS_META[key] || STATUS_META.new;
  return `<span class="feedback-submissions-status-chip ${meta.badge}">${escapeHtml(statusLabel(key))}</span>`;
}

function formatCellStack(primary, secondary = '') {
  return `
    <div class="feedback-submissions-table-stack">
      <div class="feedback-submissions-table-primary">${escapeHtml(primary || '—')}</div>
      ${secondary ? `<div class="feedback-submissions-table-secondary">${escapeHtml(secondary)}</div>` : ''}
    </div>
  `;
}

function renderTableRating(rating) {
  const numeric = Math.max(0, Math.min(5, Number.parseInt(String(rating || '0'), 10) || 0));
  const stars = `${'★'.repeat(numeric)}${'☆'.repeat(5 - numeric)}`;

  return `
    <div class="feedback-submissions-rating-stack">
      <div class="feedback-submissions-rating-value">${normalizeNumbers(String(numeric))}/5</div>
      <div class="feedback-submissions-rating-stars" aria-hidden="true">${escapeHtml(stars)}</div>
    </div>
  `;
}

function emptyStateMarkup(message, paddingClass = 'p-6') {
  return `<div class="${EMPTY_STATE_CLASS} ${paddingClass}">${message}</div>`;
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

function renderRating(rating) {
  const numeric = Math.max(0, Math.min(5, Number.parseInt(String(rating || '0'), 10) || 0));
  const stars = `${'★'.repeat(numeric)}${'☆'.repeat(5 - numeric)}`;
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
  els.pagination = q('#feedback-submissions-pagination');
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

  const list = Array.isArray(rows) ? rows : [];
  const paginationState = getEquipmentPaginationState({
    totalItems: list.length,
    page: feedbackPagination.page,
    pageSize: feedbackPagination.pageSize,
  });
  feedbackPagination.page = paginationState.currentPage;

  if (list.length === 0) {
    els.tableBody.innerHTML = `
      <tr>
        <td colspan="${TABLE_COLSPAN}" class="text-center text-base-content/60">
          ${t('feedbackSubmissions.table.empty', 'لا توجد تقييمات مطابقة للفلترة الحالية.')}
        </td>
      </tr>
    `;
    renderPagination(0);
    return;
  }

  const visibleRows = list.slice(paginationState.startIndex, paginationState.endIndex);

  els.tableBody.innerHTML = visibleRows.map((row) => {
    const activeClass = Number(row.id) === Number(selectedId) ? 'feedback-submissions-row-selected' : '';
    return `
      <tr class="${activeClass}">
        <td>${formatCellStack(row.feedback_code || '—')}</td>
        <td>
          ${formatCellStack(row.full_name || '—', row.company_name || '—')}
        </td>
        <td>
          ${formatCellStack(serviceLabel(row.service_type), recommendationLabel(row.recommendation))}
        </td>
        <td>${renderTableRating(row.overall_rating)}</td>
        <td>${statusBadge(row.status)}</td>
        <td>${formatCellStack(formatDateTime(row.follow_up_at))}</td>
        <td>${formatCellStack(formatDateTime(row.created_at))}</td>
        <td>
          <button type="button" class="${PRIMARY_BUTTON_SM_CLASS} feedback-submissions-table-action" data-feedback-select="${escapeHtml(row.id)}">
            ${t('actions.view', '👁️ عرض')}
          </button>
        </td>
      </tr>
    `;
  }).join('');

  renderPagination(list.length);

  els.tableBody.querySelectorAll('[data-feedback-select]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.getAttribute('data-feedback-select') || 0);
      if (id > 0) {
        loadFeedbackDetails(id);
      }
    });
  });
}

function syncPaginationToSelection(rows) {
  if (!Array.isArray(rows) || rows.length === 0 || selectedId <= 0) return;

  const selectedIndex = rows.findIndex((row) => Number(row?.id) === Number(selectedId));
  if (selectedIndex < 0) return;

  feedbackPagination.page = Math.floor(selectedIndex / feedbackPagination.pageSize) + 1;
}

function renderPagination(totalItems) {
  const host = els.pagination;
  if (!host) return;

  const paginationState = getEquipmentPaginationState({
    totalItems,
    page: feedbackPagination.page,
    pageSize: feedbackPagination.pageSize,
  });
  feedbackPagination.page = paginationState.currentPage;

  if (totalItems <= 0 || paginationState.totalPages <= 1) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }

  const navLabel = t('feedbackSubmissions.pagination.navigation', 'التنقل بين صفحات التقييمات');
  const prevLabel = t('feedbackSubmissions.pagination.prev', 'السابق');
  const nextLabel = t('feedbackSubmissions.pagination.next', 'التالي');
  const pageLabelTemplate = t('feedbackSubmissions.pagination.page', 'صفحة {page}');
  const rangeTemplate = t('feedbackSubmissions.pagination.range', '{from}-{to} من {total}');
  const rangeText = rangeTemplate
    .replace('{from}', normalizeNumbers(String(paginationState.rangeStart)))
    .replace('{to}', normalizeNumbers(String(paginationState.rangeEnd)))
    .replace('{total}', normalizeNumbers(String(totalItems)));
  const pageNumbers = buildEquipmentPageNumbers(paginationState.currentPage, paginationState.totalPages);

  const buttonsHtml = pageNumbers.map((page) => {
    const isActive = page === paginationState.currentPage;
    const pageLabel = pageLabelTemplate.replace('{page}', normalizeNumbers(String(page)));
    return `<button type="button" class="btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}" data-feedback-page="${page}" aria-label="${escapeHtml(pageLabel)}" ${isActive ? 'aria-current="page"' : ''}>${normalizeNumbers(String(page))}</button>`;
  }).join('');

  host.hidden = false;
  host.innerHTML = `
    <div class="list-pagination__summary text-muted small">${escapeHtml(rangeText)}</div>
    <div class="list-pagination__controls btn-group" role="group" aria-label="${escapeHtml(navLabel)}">
      <button type="button" class="btn btn-sm btn-outline-primary" data-feedback-page="${paginationState.currentPage - 1}" ${paginationState.currentPage <= 1 ? 'disabled' : ''} aria-label="${escapeHtml(prevLabel)}">‹</button>
      ${buttonsHtml}
      <button type="button" class="btn btn-sm btn-outline-primary" data-feedback-page="${paginationState.currentPage + 1}" ${paginationState.currentPage >= paginationState.totalPages ? 'disabled' : ''} aria-label="${escapeHtml(nextLabel)}">›</button>
    </div>
  `;

  host.querySelectorAll('[data-feedback-page]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextPage = Number.parseInt(button.getAttribute('data-feedback-page') || '', 10);
      if (!Number.isFinite(nextPage)) return;
      jumpPaginationSectionToStart(host);
      feedbackPagination.page = nextPage;
      renderTable(listState);
      settlePaginationSectionToStart(host);
    });
  });
}

function renderDetailPlaceholder() {
  if (els.detailContent) {
    els.detailContent.innerHTML = emptyStateMarkup(
      t('feedbackSubmissions.details.empty', 'اختر تقييماً من القائمة لبدء المتابعة.'),
      'p-6',
    );
  }
  if (els.workflow) {
    els.workflow.innerHTML = emptyStateMarkup(
      t('feedbackSubmissions.workflow.empty', 'اختر تقييماً أولاً لتظهر أدوات التحديث.'),
      'p-6',
    );
  }
  if (els.activityList) {
    els.activityList.innerHTML = emptyStateMarkup(
      t('feedbackSubmissions.activity.empty', 'لا يوجد نشاط بعد.'),
      'p-5',
    );
  }
  if (els.detailStatusBadge) {
    els.detailStatusBadge.textContent = '—';
    els.detailStatusBadge.className = DEFAULT_STATUS_BADGE_CLASS;
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
        <div class="${DETAIL_CARD_CLASS}">
          <div class="feedback-submissions-detail-label">${t('feedbackSubmissions.table.customer', 'العميل')}</div>
          <div class="feedback-submissions-detail-value">${escapeHtml(feedback.full_name || '—')}</div>
          <div class="feedback-submissions-detail-meta">${escapeHtml(feedback.company_name || '—')}</div>
        </div>
        <div class="${DETAIL_CARD_CLASS}">
          <div class="feedback-submissions-detail-label">${t('feedbackSubmissions.details.rating', 'التقييم')}</div>
          <div class="feedback-submissions-rating-block">${renderRating(feedback.overall_rating)}</div>
          <div class="feedback-submissions-detail-meta">${escapeHtml(feedback.feedback_code || '—')}</div>
        </div>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="${DETAIL_CARD_CLASS}">
          <div class="feedback-submissions-detail-label">${t('feedbackSubmissions.table.contact', 'التواصل')}</div>
          <div class="feedback-submissions-detail-value" dir="ltr">${escapeHtml(feedback.email || '—')}</div>
          <div class="feedback-submissions-detail-meta">${escapeHtml(serviceLabel(feedback.service_type))}</div>
        </div>
        <div class="${DETAIL_CARD_CLASS}">
          <div class="feedback-submissions-detail-label">${t('feedbackSubmissions.details.meta', 'بيانات إضافية')}</div>
          <div class="feedback-submissions-detail-list">
            <div><span>${t('feedbackSubmissions.details.recommendation', 'التوصية')}</span><strong>${escapeHtml(recommendationLabel(feedback.recommendation))}</strong></div>
            <div><span>${t('feedbackSubmissions.details.createdAt', 'تاريخ الإنشاء')}</span><strong>${escapeHtml(formatDateTime(feedback.created_at))}</strong></div>
            <div><span>${t('feedbackSubmissions.details.lastResponded', 'آخر رد')}</span><strong>${escapeHtml(formatDateTime(feedback.last_responded_at))}</strong></div>
            <div><span>${t('feedbackSubmissions.details.emailSent', 'تم إرسال الإيميل')}</span><strong>${escapeHtml(emailStatus)}</strong></div>
          </div>
        </div>
      </div>
      <div class="${DETAIL_CARD_CLASS} space-y-3">
        <div class="feedback-submissions-detail-label">${t('feedbackSubmissions.details.message', 'نص التقييم')}</div>
        <div class="feedback-submissions-message-body">${nl2br(feedback.feedback_message || '—')}</div>
      </div>
    `;
  }

  if (els.workflow) {
    els.workflow.innerHTML = `
      <div class="space-y-4 feedback-submissions-workflow-stack">
        <div class="flex flex-wrap items-center gap-2 feedback-submissions-workflow-actions">
          <button type="button" class="${OUTLINE_BUTTON_SM_CLASS}" id="feedback-assign-btn">
            ${t('feedbackSubmissions.workflow.assignToMe', 'تعيين لي')}
          </button>
          <button type="button" class="${OUTLINE_BUTTON_SM_CLASS}" id="feedback-mark-responded-btn">
            ${t('feedbackSubmissions.workflow.markResponded', 'تسجيل تم الرد')}
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <label for="feedback-detail-status" class="font-medium text-base-content">${t('feedbackSubmissions.workflow.status', 'الحالة')}</label>
          <select id="feedback-detail-status" class="${SELECT_CLASS}">
            ${Object.keys(STATUS_META).map((status) => `
              <option value="${escapeHtml(status)}" ${status === feedback.status ? 'selected' : ''}>${escapeHtml(statusLabel(status))}</option>
            `).join('')}
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label for="feedback-detail-follow-up" class="font-medium text-base-content">${t('feedbackSubmissions.workflow.followUpAt', 'موعد المتابعة القادم')}</label>
          <input id="feedback-detail-follow-up" type="datetime-local" class="${INPUT_CLASS}" value="${escapeHtml(toDateTimeLocalValue(feedback.follow_up_at))}">
        </div>
        <div class="flex flex-col gap-2">
          <label for="feedback-detail-notes" class="font-medium text-base-content">${t('feedbackSubmissions.workflow.internalNotes', 'ملاحظات داخلية')}</label>
          <textarea id="feedback-detail-notes" class="${TEXTAREA_CLASS}">${escapeHtml(feedback.internal_notes || '')}</textarea>
        </div>
        <button type="button" class="${PRIMARY_BUTTON_CLASS} w-full" id="feedback-save-btn">
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
      els.activityList.innerHTML = emptyStateMarkup(
        t('feedbackSubmissions.activity.empty', 'لا يوجد نشاط بعد.'),
        'p-5',
      );
    } else {
      els.activityList.innerHTML = activities.map((item) => `
        <article class="${DETAIL_CARD_CLASS} feedback-submissions-activity-card space-y-2">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <strong class="feedback-submissions-activity-user">${escapeHtml(item.username || 'system')}</strong>
            <span class="feedback-submissions-activity-time">${escapeHtml(formatDateTime(item.created_at))}</span>
          </div>
          <p class="feedback-submissions-activity-message">${escapeHtml(item.message || '')}</p>
        </article>
      `).join('');
    }
  }

  if (els.detailStatusBadge) {
    els.detailStatusBadge.className = `feedback-submissions-status-badge ${STATUS_META[feedback.status]?.badge || DEFAULT_STATUS_CHIP_CLASS}`;
    els.detailStatusBadge.textContent = statusLabel(feedback.status);
  }
}

async function loadFeedbackSubmissions({ preserveSelection = true } = {}) {
  if (!els.tableBody) return;

  els.tableBody.innerHTML = `
    <tr>
      <td colspan="${TABLE_COLSPAN}" class="text-center text-base-content/60">
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

    if (!preserveSelection) {
      feedbackPagination.page = 1;
      selectedId = 0;
      renderTable(listState);
      renderDetailPlaceholder();
      return;
    }

    const selectedStillExists = listState.some((row) => Number(row.id) === Number(selectedId));
    if (selectedId > 0 && selectedStillExists) {
      syncPaginationToSelection(listState);
      renderTable(listState);
      await loadFeedbackDetails(selectedId, { silentOnError: true });
      return;
    }

    if (listState.length > 0) {
      renderTable(listState);
      await loadFeedbackDetails(Number(listState[0].id), { silentOnError: true });
      return;
    }

    selectedId = 0;
    feedbackPagination.page = 1;
    renderTable(listState);
    renderDetailPlaceholder();
  } catch (error) {
    console.error('Failed to load feedback submissions', error);
    renderStats([]);
    els.tableBody.innerHTML = `
      <tr>
        <td colspan="${TABLE_COLSPAN}" class="text-center text-error">
          ${escapeHtml(error instanceof ApiError ? error.message : t('feedbackSubmissions.table.error', 'تعذر تحميل تقييمات العملاء.'))}
        </td>
      </tr>
    `;
    if (els.pagination) {
      els.pagination.hidden = true;
      els.pagination.innerHTML = '';
    }
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
