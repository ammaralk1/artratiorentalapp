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
let previewTimer = null;

function q(sel) { return document.querySelector(sel); }

function cacheElements() {
  els.entityType = q('#notif-entity-type');
  els.search = q('#notif-search');
  els.resultsBody = q('#notif-results-body');
  els.composeSection = q('#notif-compose-section');
  els.selectedSummary = q('#notif-selected-summary');
  els.chEmail = q('#notif-channel-email');
  els.chTelegram = q('#notif-channel-telegram');
  els.toTechs = q('#notif-to-techs');
  els.toAdmins = q('#notif-to-admins');
  els.extraEmails = q('#notif-extra-emails');
  els.extraChatIds = q('#notif-extra-chatids');
  els.subject = q('#notif-subject');
  els.body = q('#notif-body');
  els.sendBtn = q('#notif-send-btn');
  els.previewBtn = q('#notif-preview-btn');
  els.previewBox = q('#notif-preview');
  els.tReminder = q('#notif-template-reminder');
  els.tNote = q('#notif-template-note');
  els.logEntity = q('#log-filter-entity');
  els.logChannel = q('#log-filter-channel');
  els.logStatus = q('#log-filter-status');
  els.logQ = q('#log-filter-q');
  els.logRefresh = q('#log-refresh-btn');
  els.logClear = q('#log-clear-btn');
  els.logBody = q('#notif-logs-body');
  els.logPagination = q('#log-pagination');
  // Telegram linking helpers
  els.tgSearch = q('#tg-tech-search');
  els.tgSearchBtn = q('#tg-tech-search-btn');
  els.tgRefreshBtn = q('#tg-tech-refresh-btn');
  els.tgBody = q('#tg-tech-body');
  // Admin Telegram helpers
  els.tgAdminGenBtn = q('#tg-admin-gen-btn');
  els.tgAdminCopyBtn = q('#tg-admin-copy-btn');
  els.tgAdminBody = q('#tg-admin-body');
  els.tgAdminLinkBox = q('#tg-admin-link-box');
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
  try {
    const path = type === 'reservation' ? '/reservations/' : '/projects/';
    const params = new URLSearchParams();
    if (query !== '') params.set('search', query);
    params.set('limit', '20');
    const res = await apiRequest(`${path}?${params.toString()}`);
    renderResults(res?.data ?? [], type);
  } catch (e) {
    console.error(e);
    els.resultsBody.innerHTML = `<tr><td colspan=\"5\" class=\"text-center text-error\">فشل تحميل القائمة</td></tr>`;
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
    // Smoothly scroll to compose section and focus body for faster workflow
    try {
      // Ensure element is visible before scrolling
      setTimeout(() => {
        els.composeSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (els.body && typeof els.body.focus === 'function') {
          els.body.focus();
        }
      }, 10);
    } catch (_) { /* ignore scroll errors */ }
    // Auto preview recipients on selection
    try { await previewTargets(); } catch (_) {}
  } catch (e) {
    console.error(e);
    showToast('⚠️ تعذر تحميل العنصر المحدد');
  }
}

function updatePreviewBoxFromResult(data, { prefix } = {}) {
  if (!els.previewBox) return;
  const html = buildPreviewHtml(data, { prefix });
  els.previewBox.innerHTML = html;
}

function buildPreviewHtml(data, { prefix } = {}) {
  const sent = data?.sent || null;
  const targets = data?.targets || {};
  const details = data?.targets_detail || {};
  let emailCount = Number(targets.email || 0);
  let tgCount = Number(targets.telegram || 0);
  const emailList = Array.isArray(details.email) ? details.email : [];
  const tgList = Array.isArray(details.telegram) ? details.telegram : [];
  if (!emailCount && emailList.length) emailCount = emailList.length;
  if (!tgCount && tgList.length) tgCount = tgList.length;

  const joinNames = (arr, limit = 10) => {
    const names = arr.map((r) => String(r.name || r.recipient || '')).filter(Boolean);
    const uniq = Array.from(new Set(names));
    if (!uniq.length) return '';
    if (uniq.length <= limit) return uniq.join('، ');
    return uniq.slice(0, limit).join('، ') + `، و+${uniq.length - limit} آخرين`;
  };

  const lines = [];
  if (emailCount) {
    const countLabel = sent && typeof sent.email === 'number' ? `${sent.email}/${emailCount}` : String(emailCount);
    const who = joinNames(emailList);
    lines.push(`إيميل: <strong>${countLabel}</strong>${who ? ` — ${who}` : ''}`);
  }
  if (tgCount) {
    const countLabel = sent && typeof sent.telegram === 'number' ? `${sent.telegram}/${tgCount}` : String(tgCount);
    const who = joinNames(tgList);
    lines.push(`تليغرام: <strong>${countLabel}</strong>${who ? ` — ${who}` : ''}`);
  }

  const header = prefix ? `<span class="text-base-content/80">${prefix}</span> — ` : '';
  const body = lines.length ? lines.join(' | ') : 'لا مستلمين مطابقين.';
  return header + body;
}

async function sendManual() {
  if (!selected) {
    showToast('اختر عنصراً أولاً');
    return;
    }
  const channels = { email: !!els.chEmail.checked, telegram: !!els.chTelegram.checked };
  if (!channels.email && !channels.telegram) {
    showToast('اختر قناة إرسال واحدة على الأقل');
    return;
  }
  const recipients = {
    technicians: !!els.toTechs.checked,
    admins: !!els.toAdmins.checked,
    additional_emails: (els.extraEmails.value || '').split(',').map(s => s.trim()).filter(Boolean),
    additional_telegram_chat_ids: (els.extraChatIds.value || '').split(',').map(s => s.trim()).filter(Boolean),
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
    // If the request didn’t throw, consider the operation successful.
    // Show a success toast including sent counts per channel.
    const data = res?.data || {};
    const sent = data?.sent || { email: 0, telegram: 0 };
    const targets = data?.targets || { email: 0, telegram: 0 };
    const details = data?.targets_detail || { email: [], telegram: [] };
    const se = Number(sent.email || 0);
    const stg = Number(sent.telegram || 0);
    let te = Number(targets.email || 0);
    let ttg = Number(targets.telegram || 0);
    // Fallback to detailed targets length if counts are missing/zero
    if (!te && Array.isArray(details.email)) te = details.email.length;
    if (!ttg && Array.isArray(details.telegram)) ttg = details.telegram.length;
    const parts = [];
    const showEmail = (te > 0 || se > 0);
    const showTelegram = (ttg > 0 || stg > 0);
    if (showEmail) {
      // If deliveries reported as zero but we have targets, show targets only to avoid confusing 0/Te
      const emailPart = se > 0 ? `إيميل: ${se}/${te}` : (te > 0 ? `إيميل: ${te}` : '');
      if (emailPart) parts.push(emailPart);
    }
    if (showTelegram) {
      const tgPart = stg > 0 ? `تليغرام: ${stg}/${ttg}` : (ttg > 0 ? `تليغرام: ${ttg}` : '');
      if (tgPart) parts.push(tgPart);
    }
    // Append a brief hint if email had targets but zero deliveries and backend exposed an error
    if (showEmail && se === 0 && te > 0 && data?.errors?.last_email_error) {
      parts.push('تحقق من إعدادات البريد');
    }
    const suffix = parts.length ? ` — ${parts.join(' | ')}` : '';
    showToast(`${t('notifications.compose.sentOk','تم إرسال الرسالة بنجاح')}${suffix}`);
    // Reflect final counts in preview box
    updatePreviewBoxFromResult(data, { prefix: 'آخر إرسال' });
    fetchLogs();
  } catch (e) {
    console.error(e);
    const msg = (e && e.message) ? String(e.message) : 'فشل الإرسال';
    showToast(msg);
  }
}

async function previewTargets() {
  if (!selected) { showToast('اختر عنصراً أولاً'); return; }
  const channels = { email: !!els.chEmail.checked, telegram: !!els.chTelegram.checked };
  if (!channels.email && !channels.telegram) { showToast('اختر قناة إرسال واحدة على الأقل'); return; }
  const recipients = {
    technicians: !!els.toTechs.checked,
    admins: !!els.toAdmins.checked,
    additional_emails: (els.extraEmails.value || '').split(',').map(s => s.trim()).filter(Boolean),
    additional_telegram_chat_ids: (els.extraChatIds.value || '').split(',').map(s => s.trim()).filter(Boolean),
  };
  try {
    const res = await apiRequest('/notifications/resolve.php', {
      method: 'POST',
      body: {
        entity_type: selected.type,
        entity_id: selected.id,
        channels,
        recipients,
      },
    });
    const data = res?.data || {};
    if (els.previewBox) {
      els.previewBox.innerHTML = buildPreviewHtml(data);
    }
    showToast('تم تحديث المعاينة');
  } catch (e) {
    console.error(e);
    showToast('فشل المعاينة');
  }
}

function attachEvents() {
  els.search.addEventListener('input', debounceSearch);
  els.entityType.addEventListener('change', () => {
    els.resultsBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">${t('notifications.table.loading','اكتب للبحث…')}</td></tr>`;
    doSearch();
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

  // Telegram linking handlers
  if (els.tgSearchBtn) els.tgSearchBtn.addEventListener('click', fetchTechs);
  if (els.tgRefreshBtn) els.tgRefreshBtn.addEventListener('click', fetchTechs);
  if (els.tgSearch) els.tgSearch.addEventListener('keydown', (e)=>{ if (e.key === 'Enter') fetchTechs(); });
  if (els.tgBody) {
    els.tgBody.addEventListener('click', async (ev) => {
      const genBtn = ev.target.closest('[data-gen-id]');
      const copyBtn = ev.target.closest('[data-copy-link]');
      const unlinkBtn = ev.target.closest('[data-unlink-id]');
      if (genBtn) {
        const id = genBtn.getAttribute('data-gen-id');
        await generateTgLink(id);
        return;
      }
      if (copyBtn) {
        const link = copyBtn.getAttribute('data-copy-link');
        if (link) {
          try { await navigator.clipboard.writeText(link); showToast('✅ تم نسخ الرابط'); }
          catch { showToast('⚠️ تعذر النسخ، انسخ يدوياً'); }
        }
        return;
      }
      if (unlinkBtn) {
        const id = unlinkBtn.getAttribute('data-unlink-id');
        await unlinkTechnician(id);
        return;
      }
    });
  }

  // Admin linking handlers
  if (els.tgAdminGenBtn) {
    els.tgAdminGenBtn.addEventListener('click', generateAdminLink);
  }
  if (els.tgAdminCopyBtn) {
    els.tgAdminCopyBtn.addEventListener('click', async () => {
      const link = els.tgAdminCopyBtn.getAttribute('data-link');
      if (!link) return;
      try { await navigator.clipboard.writeText(link); showToast('✅ تم نسخ رابط الإدمن'); }
      catch { showToast('⚠️ تعذر النسخ'); }
    });
  }
  if (els.tgAdminBody) {
    els.tgAdminBody.addEventListener('click', async (ev) => {
      const btn = ev.target.closest('[data-admin-unlink]');
      if (!btn) return;
      const cid = btn.getAttribute('data-admin-unlink');
      await unlinkAdmin(cid);
    });
  }
  if (els.previewBtn) {
    els.previewBtn.addEventListener('click', previewTargets);
  }
  // Auto-preview on channel/recipient changes
  const triggerPreview = () => {
    if (previewTimer) clearTimeout(previewTimer);
    previewTimer = setTimeout(() => { if (selected) previewTargets().catch(()=>{}); }, 250);
  };
  if (els.chEmail) els.chEmail.addEventListener('change', triggerPreview);
  if (els.chTelegram) els.chTelegram.addEventListener('change', triggerPreview);
  if (els.toTechs) els.toTechs.addEventListener('change', triggerPreview);
  if (els.toAdmins) els.toAdmins.addEventListener('change', triggerPreview);
  if (els.extraEmails) els.extraEmails.addEventListener('input', triggerPreview);
  if (els.extraChatIds) els.extraChatIds.addEventListener('input', triggerPreview);

  const triggerLogsFetch = () => {
    LOG_PAGE = 1;
    fetchLogs();
  };
  ['change', 'input'].forEach((ev) => {
    els.logEntity.addEventListener(ev, triggerLogsFetch);
    els.logChannel.addEventListener(ev, triggerLogsFetch);
    els.logStatus.addEventListener(ev, triggerLogsFetch);
    els.logQ.addEventListener(ev, () => {
      if (searchTimer) clearTimeout(searchTimer);
      searchTimer = setTimeout(() => { LOG_PAGE = 1; fetchLogs(); }, 350);
    });
  });
  els.logRefresh.addEventListener('click', fetchLogs);

  if (els.logClear) {
    els.logClear.addEventListener('click', async () => {
      const ok = window.confirm('هل تريد مسح السجل الحالي؟ سيتم حذف العناصر المطابقة للفلاتر.');
      if (!ok) return;
      try {
        const params = buildLogParams();
        await apiRequest(`/notifications/logs.php?${params.toString()}`, { method: 'DELETE' });
        showToast('تم مسح السجل');
        LOG_PAGE = 1;
        fetchLogs();
      } catch (e) {
        console.error(e);
        showToast('فشل مسح السجل');
      }
    });
  }

  if (els.logPagination) {
    els.logPagination.addEventListener('click', (ev) => {
      const btn = ev.target.closest('[data-page]');
      if (!btn) return;
      const p = Number(btn.getAttribute('data-page')) || 1;
      if (p === LOG_PAGE) return;
      LOG_PAGE = p;
      fetchLogs();
    });
  }
}

let LOG_PAGE = 1;
const LOG_LIMIT = 20;

function buildLogParams() {
  const params = new URLSearchParams();
  if (els.logEntity.value) params.set('entity_type', els.logEntity.value);
  if (els.logChannel.value) params.set('channel', els.logChannel.value);
  if (els.logStatus.value) params.set('status', els.logStatus.value);
  if ((els.logQ.value || '').trim()) params.set('q', els.logQ.value.trim());
  params.set('limit', String(LOG_LIMIT));
  params.set('page', String(LOG_PAGE));
  return params;
}

function renderPagination(meta) {
  const total = Number(meta?.total || 0);
  const pages = Number(meta?.pages || 1);
  const page = Number(meta?.page || 1);
  if (!els.logPagination) return;
  if (total <= LOG_LIMIT) { els.logPagination.innerHTML = ''; return; }

  const btn = (label, p, disabled = false, active = false) => {
    const cls = ['btn','btn-sm'];
    if (active) cls.push('btn-primary');
    else cls.push('btn-outline');
    if (disabled) cls.push('btn-disabled');
    return `<button type="button" class="${cls.join(' ')}" data-page="${p}" ${disabled ? 'disabled' : ''}>${label}</button>`;
  };

  let html = '';
  html += btn(t('notifications.logs.prev','السابق'), Math.max(1, page - 1), page <= 1);

  const maxButtons = 7;
  const makeRange = (start,end) => Array.from({length: end-start+1}, (_,i)=>start+i);
  let pagesList = [];
  if (pages <= maxButtons) {
    pagesList = makeRange(1,pages);
  } else {
    const left = Math.max(2, page - 1);
    const right = Math.min(pages - 1, page + 1);
    pagesList = [1, ...makeRange(left, right), pages];
  }
  for (const pNum of pagesList) {
    if (pNum < 1 || pNum > pages) continue;
    const active = pNum === page;
    html += btn(String(pNum), pNum, false, active);
  }

  html += btn(t('notifications.logs.next','التالي'), Math.min(pages, page + 1), page >= pages);
  els.logPagination.innerHTML = html;
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
    const recipient = row.recipient_display || `${row.recipient_type || ''}: ${row.recipient_identifier || ''}`;
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
    const params = buildLogParams();
    const res = await apiRequest(`/notifications/logs.php?${params.toString()}`);
    renderLogs(res?.data ?? []);
    renderPagination(res?.meta || {});
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
  // Load initial list so the table is not empty
  doSearch();
  fetchLogs();
  fetchTechs();
  fetchAdminLinks();
})();

async function fetchTechs() {
  if (!els.tgBody) return;
  try {
    els.tgBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">جارٍ التحميل…</td></tr>`;
    const qstr = (els.tgSearch?.value || '').trim();
    const params = new URLSearchParams();
    if (qstr) params.set('search', qstr);
    params.set('limit', '20');
    const res = await apiRequest(`/technicians/?${params.toString()}`);
    const items = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
    if (!items.length) {
      els.tgBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">لا توجد نتائج</td></tr>`;
      return;
    }
    els.tgBody.innerHTML = items.map((t) => {
      const name = t.full_name || t.name || '';
      const phone = t.phone || '';
      const linked = !!(t.telegram_chat_id || t.telegramChatId || t.has_tg_link);
      const status = linked ? '<span class="badge bg-primary-subtle">مرتبط</span>' : '<span class="badge bg-warning-subtle">غير مرتبط</span>';
      const actions = linked
        ? `<button type="button" class="btn btn-sm btn-outline btn-error" data-unlink-id="${t.id}">❌ إلغاء الربط</button>`
        : `<button type="button" class="btn btn-sm" data-gen-id="${t.id}">🔗 توليد رابط</button>`;
      return `<tr>
        <td>${name}</td>
        <td>${phone}</td>
        <td>${status}</td>
        <td>${actions}</td>
      </tr>`;
    }).join('');
  } catch (e) {
    console.error(e);
    els.tgBody.innerHTML = `<tr><td colspan="4" class="text-center text-error">فشل التحميل</td></tr>`;
  }
}

async function generateTgLink(technicianId) {
  try {
    const res = await apiRequest(`/telegram/generate-link.php?technician_id=${encodeURIComponent(technicianId)}`);
    const link = res?.data?.link || res?.link || null;
    if (!link) { showToast('⚠️ تعذر توليد الرابط'); return; }
    // Replace the action cell for this row with copy button
    const row = els.tgBody?.querySelector(`button[data-gen-id="${technicianId}"]`)?.closest('tr');
    if (row) {
      const cell = row.querySelector('td:last-child');
      if (cell) cell.innerHTML = `<button type="button" class="btn btn-sm" data-copy-link="${link}">📋 نسخ الرابط</button>`;
    }
    showToast('✅ تم توليد الرابط');
  } catch (e) {
    console.error(e);
    showToast('فشل توليد الرابط');
  }
}

async function fetchAdminLinks() {
  if (!els.tgAdminBody) return;
  try {
    els.tgAdminBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">جارٍ التحميل…</td></tr>`;
    const res = await apiRequest('/telegram/admins.php');
    const items = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
    if (!items.length) {
      els.tgAdminBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">لا توجد روابط إدمن مرتبطة حالياً</td></tr>`;
      return;
    }
    els.tgAdminBody.innerHTML = items.map((row) => {
      const id = String(row.chat_id || '');
      const used = row.last_used_at || '—';
      return `<tr>
        <td>${id}</td>
        <td>${used}</td>
        <td><button type="button" class="btn btn-sm btn-outline btn-error" data-admin-unlink="${id}">❌ إلغاء الربط</button></td>
      </tr>`;
    }).join('');
  } catch (e) {
    console.error(e);
    els.tgAdminBody.innerHTML = `<tr><td colspan="3" class="text-center text-error">فشل تحميل روابط الإدمن</td></tr>`;
  }
}

async function generateAdminLink() {
  try {
    const res = await apiRequest('/telegram/generate-link.php?context=admin');
    const link = res?.data?.link || res?.link || null;
    if (!link) { showToast('⚠️ تعذر توليد رابط الإدمن'); return; }
    if (els.tgAdminCopyBtn) {
      els.tgAdminCopyBtn.removeAttribute('disabled');
      els.tgAdminCopyBtn.setAttribute('data-link', link);
    }
    if (els.tgAdminLinkBox) {
      els.tgAdminLinkBox.classList.remove('hidden');
      els.tgAdminLinkBox.textContent = link;
    }
    showToast('✅ تم توليد رابط الإدمن');
  } catch (e) {
    console.error(e);
    showToast('فشل توليد رابط الإدمن');
  }
}

async function unlinkTechnician(technicianId) {
  if (!technicianId) return;
  const ok = window.confirm('تأكيد إلغاء الربط لهذا الفني؟');
  if (!ok) return;
  try {
    await apiRequest('/telegram/unlink.php', {
      method: 'POST',
      body: { target: 'technician', technician_id: Number(technicianId) },
    });
    showToast('تم إلغاء الربط للفني');
    fetchTechs();
  } catch (e) {
    console.error(e);
    const msg = (e && (e.payload?.error || e.message)) ? String(e.payload?.error || e.message) : 'فشل إلغاء الربط';
    showToast(msg);
  }
}

async function unlinkAdmin(chatId) {
  if (!chatId) return;
  const ok = window.confirm(`تأكيد إلغاء ربط الإدمن (${chatId})؟`);
  if (!ok) return;
  try {
    await apiRequest('/telegram/unlink.php', {
      method: 'POST',
      body: { target: 'admin', chat_id: String(chatId) },
    });
    showToast('تم إلغاء ربط الإدمن');
    fetchAdminLinks();
  } catch (e) {
    console.error(e);
    const msg = (e && (e.payload?.error || e.message)) ? String(e.payload?.error || e.message) : 'فشل إلغاء ربط الإدمن';
    showToast(msg);
  }
}
