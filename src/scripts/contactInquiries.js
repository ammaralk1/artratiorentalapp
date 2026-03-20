import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, getCurrentUser, logout } from './auth.js';
import { apiRequest, ApiError } from './apiClient.js';
import { showToast } from './utils.js';
import { t } from './language.js';
import { initDashboardShell } from './dashboardShell.js';
import { normalizeNumbers } from './utils.js';

applyStoredTheme();
checkAuth();
initDashboardShell();
initThemeToggle();

const els = {};
let currentUser = null;
let listState = [];
let selectedId = 0;
let searchTimer = null;
let isSaving = false;

const STATUS_META = {
  new: { badge: 'badge-neutral', fallbackAr: 'جديدة', fallbackEn: 'New', key: 'contactInquiries.status.new' },
  in_progress: { badge: 'badge-warning', fallbackAr: 'قيد المتابعة', fallbackEn: 'In Progress', key: 'contactInquiries.status.inProgress' },
  contacted: { badge: 'badge-info', fallbackAr: 'تم التواصل', fallbackEn: 'Contacted', key: 'contactInquiries.status.contacted' },
  won: { badge: 'badge-success', fallbackAr: 'تم التحويل', fallbackEn: 'Won', key: 'contactInquiries.status.won' },
  lost: { badge: 'badge-error', fallbackAr: 'مفقودة', fallbackEn: 'Lost', key: 'contactInquiries.status.lost' },
  closed: { badge: 'badge-outline', fallbackAr: 'مغلقة', fallbackEn: 'Closed', key: 'contactInquiries.status.closed' },
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

function cacheElements() {
  els.logoutBtn = q('#logout-btn');
  els.refreshBtn = q('#contact-inquiries-refresh');
  els.statusFilter = q('#contact-status-filter');
  els.searchFilter = q('#contact-search-filter');
  els.tableBody = q('#contact-inquiries-body');
  els.detailContent = q('#contact-inquiry-detail-content');
  els.workflow = q('#contact-inquiry-workflow');
  els.activityList = q('#contact-inquiry-activity-list');
  els.detailStatusBadge = q('#contact-detail-status-badge');
  els.statNew = q('#contact-stat-new');
  els.statProgress = q('#contact-stat-progress');
  els.statFollowUpToday = q('#contact-stat-followup-today');
  els.statClosed = q('#contact-stat-closed');
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
  if (els.statProgress) {
    const count = countByStatus('in_progress') + countByStatus('contacted');
    els.statProgress.textContent = normalizeNumbers(String(count));
  }
  if (els.statFollowUpToday) {
    const count = list.filter((row) => isSameDay(row?.follow_up_at)).length;
    els.statFollowUpToday.textContent = normalizeNumbers(String(count));
  }
  if (els.statClosed) {
    const count = countByStatus('closed') + countByStatus('won') + countByStatus('lost');
    els.statClosed.textContent = normalizeNumbers(String(count));
  }
}

function renderTable(rows) {
  if (!els.tableBody) return;

  if (!Array.isArray(rows) || rows.length === 0) {
    els.tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-base-content/60">
          ${t('contactInquiries.table.empty', 'لا توجد رسائل مطابقة للفلترة الحالية.')}
        </td>
      </tr>
    `;
    return;
  }

  els.tableBody.innerHTML = rows.map((row) => {
    const activeClass = Number(row.id) === Number(selectedId) ? 'bg-primary/5' : '';
    const project = row.project_type || row.company_name || '—';
    return `
      <tr class="${activeClass}">
        <td>${escapeHtml(row.inquiry_code || '—')}</td>
        <td>
          <div class="font-semibold">${escapeHtml(row.full_name || '—')}</div>
          <div class="text-xs text-base-content/60">${escapeHtml(row.assigned_username || '—')}</div>
        </td>
        <td>
          <div dir="ltr">${escapeHtml(row.phone || '—')}</div>
          <div class="text-xs text-base-content/60">${escapeHtml(row.email || '—')}</div>
        </td>
        <td>${escapeHtml(project)}</td>
        <td>${statusBadge(row.status)}</td>
        <td>${escapeHtml(formatDateTime(row.follow_up_at))}</td>
        <td>${escapeHtml(formatDateTime(row.created_at))}</td>
        <td>
          <button type="button" class="btn btn-sm btn-primary" data-contact-select="${escapeHtml(row.id)}">
            ${t('actions.view', '👁️ عرض')}
          </button>
        </td>
      </tr>
    `;
  }).join('');

  els.tableBody.querySelectorAll('[data-contact-select]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.getAttribute('data-contact-select') || 0);
      if (id > 0) {
        loadInquiryDetails(id);
      }
    });
  });
}

function renderDetailPlaceholder() {
  if (els.detailContent) {
    els.detailContent.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-6 text-center text-base-content/60">
        ${t('contactInquiries.details.empty', 'اختر رسالة من القائمة لبدء المتابعة.')}
      </div>
    `;
  }
  if (els.workflow) {
    els.workflow.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-6 text-center text-base-content/60">
        ${t('contactInquiries.workflow.empty', 'اختر رسالة أولاً لتظهر أدوات التحديث.')}
      </div>
    `;
  }
  if (els.activityList) {
    els.activityList.innerHTML = `
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${t('contactInquiries.activity.empty', 'لا يوجد نشاط بعد.')}
      </div>
    `;
  }
  if (els.detailStatusBadge) {
    els.detailStatusBadge.textContent = '—';
    els.detailStatusBadge.className = 'badge badge-outline';
  }
}

function renderInquiryDetails(payload) {
  const inquiry = payload?.inquiry;
  const activities = Array.isArray(payload?.activities) ? payload.activities : [];

  if (!inquiry) {
    renderDetailPlaceholder();
    return;
  }

  const project = inquiry.project_type || inquiry.company_name || '—';
  const emailStatus = inquiry.notification_sent
    ? t('common.boolean.yes', 'نعم')
    : t('common.boolean.no', 'لا');

  if (els.detailContent) {
    els.detailContent.innerHTML = `
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl bg-base-200/50 p-4">
          <div class="text-sm text-base-content/60">${t('contactInquiries.table.customer', 'العميل')}</div>
          <div class="mt-2 text-lg font-semibold text-base-content">${escapeHtml(inquiry.full_name || '—')}</div>
          <div class="mt-2 text-sm text-base-content/75">${escapeHtml(inquiry.company_name || '—')}</div>
        </div>
        <div class="rounded-2xl bg-base-200/50 p-4">
          <div class="text-sm text-base-content/60">${t('contactInquiries.table.project', 'المشروع')}</div>
          <div class="mt-2 text-lg font-semibold text-base-content">${escapeHtml(project)}</div>
          <div class="mt-2 text-sm text-base-content/75">${escapeHtml(inquiry.inquiry_code || '—')}</div>
        </div>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-base-300 p-4">
          <div class="text-sm text-base-content/60">${t('contactInquiries.table.contact', 'التواصل')}</div>
          <div class="mt-2 space-y-2">
            <div dir="ltr" class="font-medium text-base-content">${escapeHtml(inquiry.phone || '—')}</div>
            <div class="text-sm text-base-content/75">${escapeHtml(inquiry.email || '—')}</div>
          </div>
        </div>
        <div class="rounded-2xl border border-base-300 p-4">
          <div class="text-sm text-base-content/60">${t('contactInquiries.details.meta', 'بيانات إضافية')}</div>
          <div class="mt-2 space-y-2 text-sm text-base-content/75">
            <div>${t('contactInquiries.details.createdAt', 'تاريخ الإنشاء')}: ${escapeHtml(formatDateTime(inquiry.created_at))}</div>
            <div>${t('contactInquiries.details.lastContacted', 'آخر تواصل')}: ${escapeHtml(formatDateTime(inquiry.last_contacted_at))}</div>
            <div>${t('contactInquiries.details.emailSent', 'تم إرسال الإيميل')}: ${escapeHtml(emailStatus)}</div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border border-base-300 p-4">
        <div class="text-sm text-base-content/60">${t('contactInquiries.details.message', 'الرسالة')}</div>
        <div class="mt-3 leading-8 text-base-content">${nl2br(inquiry.message || '—')}</div>
      </div>
    `;
  }

  if (els.workflow) {
    els.workflow.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" class="btn btn-outline btn-sm" id="contact-assign-btn">
            ${t('contactInquiries.workflow.assignToMe', 'تعيين لي')}
          </button>
          <button type="button" class="btn btn-outline btn-sm" id="contact-mark-contacted-btn">
            ${t('contactInquiries.workflow.markContacted', 'تسجيل تم التواصل')}
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <label for="contact-detail-status" class="font-medium text-base-content">${t('contactInquiries.workflow.status', 'الحالة')}</label>
          <select id="contact-detail-status" class="select select-bordered w-full">
            ${Object.keys(STATUS_META).map((status) => `
              <option value="${escapeHtml(status)}" ${status === inquiry.status ? 'selected' : ''}>${escapeHtml(statusLabel(status))}</option>
            `).join('')}
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label for="contact-detail-follow-up" class="font-medium text-base-content">${t('contactInquiries.workflow.followUpAt', 'موعد المتابعة القادم')}</label>
          <input id="contact-detail-follow-up" type="datetime-local" class="input input-bordered w-full" value="${escapeHtml(toDateTimeLocalValue(inquiry.follow_up_at))}">
        </div>
        <div class="flex flex-col gap-2">
          <label for="contact-detail-notes" class="font-medium text-base-content">${t('contactInquiries.workflow.internalNotes', 'ملاحظات داخلية')}</label>
          <textarea id="contact-detail-notes" class="textarea textarea-bordered min-h-36 w-full">${escapeHtml(inquiry.internal_notes || '')}</textarea>
        </div>
        <button type="button" class="btn btn-primary w-full" id="contact-save-btn">
          ${t('contactInquiries.workflow.save', 'حفظ التحديثات')}
        </button>
      </div>
    `;

    q('#contact-save-btn')?.addEventListener('click', () => saveInquiryChanges({}));
    q('#contact-mark-contacted-btn')?.addEventListener('click', () => saveInquiryChanges({ markContacted: true }));
    q('#contact-assign-btn')?.addEventListener('click', () => saveInquiryChanges({ assignToMe: true }));
  }

  if (els.activityList) {
    if (!activities.length) {
      els.activityList.innerHTML = `
        <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
          ${t('contactInquiries.activity.empty', 'لا يوجد نشاط بعد.')}
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
    els.detailStatusBadge.className = `badge ${STATUS_META[inquiry.status]?.badge || 'badge-outline'}`;
    els.detailStatusBadge.textContent = statusLabel(inquiry.status);
  }
}

async function loadInquiries({ preserveSelection = true } = {}) {
  if (!els.tableBody) return;

  els.tableBody.innerHTML = `
    <tr>
      <td colspan="8" class="text-center text-base-content/60">
        ${t('contactInquiries.table.loading', '⏳ جارٍ تحميل الرسائل...')}
      </td>
    </tr>
  `;

  try {
    const params = new URLSearchParams();
    const status = String(els.statusFilter?.value || '').trim();
    const search = String(els.searchFilter?.value || '').trim();
    if (status) params.set('status', status);
    if (search) params.set('search', search);
    params.set('limit', '100');

    const response = await apiRequest(`/contact/admin.php?${params.toString()}`);
    listState = Array.isArray(response?.data) ? response.data : [];
    renderStats(listState);
    renderTable(listState);

    if (!preserveSelection) {
      selectedId = 0;
      renderDetailPlaceholder();
      return;
    }

    if (selectedId > 0) {
      const exists = listState.some((row) => Number(row.id) === Number(selectedId));
      if (exists) {
        await loadInquiryDetails(selectedId, { silentOnError: true });
        return;
      }
    }

    if (listState.length > 0) {
      await loadInquiryDetails(Number(listState[0].id), { silentOnError: true });
    } else {
      selectedId = 0;
      renderDetailPlaceholder();
    }
  } catch (error) {
    console.error('Failed to load contact inquiries', error);
    renderStats([]);
    els.tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-error">
          ${escapeHtml(error instanceof ApiError ? error.message : t('contactInquiries.table.error', 'تعذر تحميل رسائل التواصل.'))}
        </td>
      </tr>
    `;
    renderDetailPlaceholder();
  }
}

async function loadInquiryDetails(id, { silentOnError = false } = {}) {
  const numericId = Number(id || 0);
  if (numericId <= 0) {
    renderDetailPlaceholder();
    return;
  }

  try {
    const response = await apiRequest(`/contact/admin.php?id=${encodeURIComponent(numericId)}`);
    selectedId = numericId;
    renderTable(listState);
    renderInquiryDetails(response?.data ?? null);
  } catch (error) {
    console.error('Failed to load inquiry details', error);
    if (!silentOnError) {
      showToast(
        error instanceof ApiError ? error.message : t('contactInquiries.details.error', 'تعذر تحميل تفاصيل الرسالة.'),
        'error',
      );
    }
  }
}

async function saveInquiryChanges({ markContacted = false, assignToMe = false } = {}) {
  if (selectedId <= 0 || isSaving) return;

  const statusEl = q('#contact-detail-status');
  const followUpEl = q('#contact-detail-follow-up');
  const notesEl = q('#contact-detail-notes');
  const saveBtn = q('#contact-save-btn');

  const payload = {
    id: selectedId,
    status: statusEl?.value || 'new',
    follow_up_at: followUpEl?.value || '',
    internal_notes: notesEl?.value || '',
  };

  if (markContacted) {
    payload.mark_contacted = true;
  }
  if (assignToMe) {
    payload.assign_to_me = true;
  }

  isSaving = true;
  [saveBtn, q('#contact-mark-contacted-btn'), q('#contact-assign-btn')].forEach((element) => {
    if (element) element.disabled = true;
  });

  try {
    const response = await apiRequest('/contact/admin.php', {
      method: 'PATCH',
      body: payload,
    });
    renderInquiryDetails(response?.data ?? null);
    await loadInquiries();
    showToast(t('contactInquiries.workflow.saved', 'تم حفظ التحديثات بنجاح.'), 'success');
  } catch (error) {
    console.error('Failed to save inquiry changes', error);
    showToast(
      error instanceof ApiError ? error.message : t('contactInquiries.workflow.saveError', 'تعذر حفظ التحديثات.'),
      'error',
    );
  } finally {
    isSaving = false;
    [saveBtn, q('#contact-mark-contacted-btn'), q('#contact-assign-btn')].forEach((element) => {
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
    loadInquiries({ preserveSelection: true });
  });

  els.statusFilter?.addEventListener('change', () => {
    loadInquiries({ preserveSelection: false });
  });

  els.searchFilter?.addEventListener('input', () => {
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      loadInquiries({ preserveSelection: false });
    }, 300);
  });
}

async function bootstrap() {
  cacheElements();
  attachEvents();
  renderDetailPlaceholder();

  try {
    currentUser = await getCurrentUser({ refresh: true });
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
  await loadInquiries({ preserveSelection: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch((error) => {
      console.error('Failed to bootstrap contact inquiries page', error);
    });
  }, { once: true });
} else {
  bootstrap().catch((error) => {
    console.error('Failed to bootstrap contact inquiries page', error);
  });
}
