import '../styles/app.css';
import { applyStoredTheme } from './theme.js';
import { initDashboardShell } from './dashboardShell.js';
import { apiRequest } from './apiClient.js';
import { checkAuth, getCurrentUser } from './auth.js';
import { showToast } from './utils.js';
import { t } from './language.js';

applyStoredTheme();
initDashboardShell();

const els = {};
let selected = null; // {type, id, summary}
let searchTimer = null;

function q(sel) { return document.querySelector(sel); }

function cacheElements() {
  els.entityType = q('#notif-entity-type');
  els.search = q('#notif-search');
  els.resultsBody = q('#notif-results-body');
  els.composeSection = q('#notif-compose-section');
  els.selectedSummary = q('#notif-selected-summary');
  els.chEmail = q('#notif-channel-email');
  els.chWhatsapp = q('#notif-channel-whatsapp');
  els.toTechs = q('#notif-to-techs');
  els.toAdmins = q('#notif-to-admins');
  els.extraEmails = q('#notif-extra-emails');
  els.extraPhones = q('#notif-extra-phones');
  els.subject = q('#notif-subject');
  els.body = q('#notif-body');
  els.sendBtn = q('#notif-send-btn');
  els.tReminder = q('#notif-template-reminder');
  els.tNote = q('#notif-template-note');
  els.logEntity = q('#log-filter-entity');
  els.logChannel = q('#log-filter-channel');
  els.logStatus = q('#log-filter-status');
  els.logQ = q('#log-filter-q');
  els.logRefresh = q('#log-refresh-btn');
  els.logBody = q('#notif-logs-body');
}

function formatWhen(item, type) {
  const start = item.start_datetime || item.startDate || '';
  const end = item.end_datetime || item.endDate || '';
  if (start && end && start !== end) return `${start} — ${end}`;
  return start || end || '';
}

function renderResults(items, type) {
  if (!Array.isArray(items) || items.length === 0) {
    els.resultsBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">${t('notifications.table.loading','لا نتائج')}</td></tr>`;
    return;
  }

  els.resultsBody.innerHTML = items.map((row) => {
    const code = type === 'reservation' ? (row.reservation_code || '') : (row.project_code || '');
    const title = row.title || '';
    const when = formatWhen(row, type);
    const customer = type === 'reservation' ? (row.customer_name || '') : (row.client_name || '');
    return `
      <tr>
        <td>${code || '—'}</td>
        <td>${title || '—'}</td>
        <td>${when || '—'}</td>
        <td>${customer || '—'}</td>
        <td><button type="button" class="btn btn-sm btn-primary" data-select-id="${row.id}" data-select-type="${type}">${t('notifications.table.select','اختيار')}</button></td>
      </tr>
    `;
  }).join('');
}

async function doSearch() {
  const type = els.entityType.value;
  const query = (els.search.value || '').trim();
  if (query === '') {
    els.resultsBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">${t('notifications.table.loading','اكتب للبحث…')}</td></tr>`;
    return;
  }
  try {
    const path = type === 'reservation' ? '/reservations/' : '/projects/';
    const res = await apiRequest(`${path}?search=${encodeURIComponent(query)}&limit=10`);
    renderResults(res?.data ?? [], type);
  } catch (e) {
    console.error(e);
    els.resultsBody.innerHTML = `<tr><td colspan="5" class="text-center text-error">فشل البحث</td></tr>`;
  }
}

function debounceSearch() {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(doSearch, 350);
}

function summarizeSelection(type, item) {
  const code = type === 'reservation' ? (item.reservation_code || '') : (item.project_code || '');
  const title = item.title || (code || type);
  const when = formatWhen(item, type);
  const loc = item.location || '';
  const who = type === 'reservation' ? (item.customer_name || '') : (item.client_name || '');
  return [
    code ? `الكود: ${code}` : '',
    `العنوان: ${title}`,
    when ? `الوقت: ${when}` : '',
    loc ? `الموقع: ${loc}` : '',
    who ? `العميل: ${who}` : '',
  ].filter(Boolean).join(' | ');
}

async function handleSelect(id, type) {
  try {
    const path = type === 'reservation' ? '/reservations/' : '/projects/';
    const res = await apiRequest(`${path}?id=${encodeURIComponent(id)}`);
    const item = res?.data;
    if (!item) throw new Error('Not found');
    selected = { type, id: Number(item.id), summary: summarizeSelection(type, item) };
    els.selectedSummary.textContent = selected.summary;
    els.composeSection.hidden = false;
  } catch (e) {
    console.error(e);
    showToast('⚠️ تعذر تحميل العنصر المحدد');
  }
}

async function sendManual() {
  if (!selected) {
    showToast('اختر عنصراً أولاً');
    return;
    }
  const channels = { email: !!els.chEmail.checked, whatsapp: !!els.chWhatsapp.checked };
  if (!channels.email && !channels.whatsapp) {
    showToast('اختر قناة إرسال واحدة على الأقل');
    return;
  }
  const recipients = {
    technicians: !!els.toTechs.checked,
    admins: !!els.toAdmins.checked,
    additional_emails: (els.extraEmails.value || '').split(',').map(s => s.trim()).filter(Boolean),
    additional_phones: (els.extraPhones.value || '').split(',').map(s => s.trim()).filter(Boolean),
  };
  const message = {
    subject: (els.subject.value || 'تنبيه إداري').trim(),
    text: (els.body.value || '').trim(),
  };
  if (!message.text) {
    showToast('اكتب نص الرسالة');
    return;
  }
  try {
    const res = await apiRequest('/notifications/send.php', {
      method: 'POST',
      body: {
        entity_type: selected.type,
        entity_id: selected.id,
        channels,
        recipients,
        message,
      },
    });
    const sent = res?.data?.sent || { email: 0, whatsapp: 0 };
    const total = Number(sent.email || 0) + Number(sent.whatsapp || 0);
    if (total > 0) {
      showToast(t('notifications.compose.sentOk','تم إرسال الرسالة بنجاح'));
    } else {
      showToast('لم يتم إرسال أي رسالة. تحقق من المستلمين والقنوات.');
    }
    fetchLogs();
  } catch (e) {
    console.error(e);
    const msg = (e && e.message) ? String(e.message) : 'فشل الإرسال';
    showToast(msg);
  }
}

function attachEvents() {
  els.search.addEventListener('input', debounceSearch);
  els.entityType.addEventListener('change', () => {
    els.resultsBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">${t('notifications.table.loading','اكتب للبحث…')}</td></tr>`;
    if (els.search.value) doSearch();
  });

  els.resultsBody.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-select-id]');
    if (!btn) return;
    handleSelect(btn.getAttribute('data-select-id'), btn.getAttribute('data-select-type'));
  });

  els.tReminder.addEventListener('click', () => {
    const base = 'تذكير بالحجز/المشروع:\nيرجى الاطلاع واتخاذ اللازم.';
    els.body.value = base;
  });
  els.tNote.addEventListener('click', () => {
    const base = 'ملاحظة إدارية:\nيرجى متابعة الإجراء المطلوب.';
    els.body.value = base;
  });
  els.sendBtn.addEventListener('click', sendManual);

  const triggerLogsFetch = () => {
    fetchLogs();
  };
  ['change', 'input'].forEach((ev) => {
    els.logEntity.addEventListener(ev, triggerLogsFetch);
    els.logChannel.addEventListener(ev, triggerLogsFetch);
    els.logStatus.addEventListener(ev, triggerLogsFetch);
    els.logQ.addEventListener(ev, () => {
      if (searchTimer) clearTimeout(searchTimer);
      searchTimer = setTimeout(fetchLogs, 350);
    });
  });
  els.logRefresh.addEventListener('click', fetchLogs);
}

function formatEventLabel(ev) {
  const map = {
    reservation_created: 'إنشاء حجز',
    reservation_reminder_24h: 'تذكير 24 ساعة',
    reservation_reminder_1h: 'تذكير ساعة',
    reservation_technician_assigned: 'تعيين فني (حجز)',
    reservation_status_changed: 'تغيير حالة حجز',
    project_created: 'إنشاء مشروع',
    project_technician_assigned: 'تعيين فني (مشروع)',
    manual_notification: 'إرسال يدوي',
  };
  return map[ev] || ev;
}

function renderLogs(items) {
  if (!Array.isArray(items) || items.length === 0) {
    els.logBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">${t('notifications.logs.empty','لا توجد سجلات حالياً.')}</td></tr>`;
    return;
  }

  els.logBody.innerHTML = items.map((row) => {
    const time = row.created_at || '—';
    const event = formatEventLabel(row.event_type || '');
    const entity = `${row.entity_type || ''} #${row.entity_id || ''}`;
    const recipient = `${row.recipient_type || ''}: ${row.recipient_identifier || ''}`;
    const channel = row.channel || '';
    const status = row.status || '';
    const error = (row.error || '').toString().slice(0, 140);
    const statusBadge = status === 'sent'
      ? '<span class="badge bg-primary-subtle">مرسلة</span>'
      : '<span class="badge bg-danger-subtle">فاشلة</span>';
    return `
      <tr>
        <td>${time}</td>
        <td>${event}</td>
        <td>${entity}</td>
        <td>${recipient}</td>
        <td>${channel}</td>
        <td>${statusBadge}</td>
        <td title="${error}">${error}</td>
      </tr>
    `;
  }).join('');
}

async function fetchLogs() {
  try {
    els.logBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">${t('notifications.logs.loading','⏳ جارٍ التحميل…')}</td></tr>`;
    const params = new URLSearchParams();
    if (els.logEntity.value) params.set('entity_type', els.logEntity.value);
    if (els.logChannel.value) params.set('channel', els.logChannel.value);
    if (els.logStatus.value) params.set('status', els.logStatus.value);
    if ((els.logQ.value || '').trim()) params.set('q', els.logQ.value.trim());
    params.set('limit', '50');
    const res = await apiRequest(`/notifications/logs.php?${params.toString()}`);
    renderLogs(res?.data ?? []);
  } catch (e) {
    console.error(e);
    els.logBody.innerHTML = `<tr><td colspan="7" class="text-center text-error">فشل تحميل السجل</td></tr>`;
  }
}

(async function init() {
  await checkAuth();
  const me = await getCurrentUser();
  if (!me || me.role !== 'admin') {
    showToast('هذه الصفحة للمسؤولين فقط');
    window.location.href = 'home.html';
    return;
  }
  cacheElements();
  attachEvents();
  fetchLogs();
})();
