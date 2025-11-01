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
    showToast(t('notifications.compose.sentOk','تم إرسال الرسالة بنجاح'));
  } catch (e) {
    console.error(e);
    showToast('فشل الإرسال');
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
})();
