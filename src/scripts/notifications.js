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
let CHAT_LIVE = false;
let CHAT_POLL_TIMER = null;
let CHAT_LAST_ID = 0;
let CHAT_POLLING = false;
let CHAT_SSE = null;
let CHAT_SSE_DISABLED = false; // set true to force polling fallback

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
  els.templateSelect = q('#notif-template');
  els.subject = q('#notif-subject');
  els.body = q('#notif-body');
  els.sendBtn = q('#notif-send-btn');
  els.previewBtn = q('#notif-preview-btn');
  els.retryLastBtn = q('#notif-retry-last');
  els.previewBox = q('#notif-preview');
  els.tReminder = q('#notif-template-reminder');
  els.tNote = q('#notif-template-note');
  els.logEntity = q('#log-filter-entity');
  els.logChannel = q('#log-filter-channel');
  els.logStatus = q('#log-filter-status');
  els.logBatch = q('#log-filter-batch');
  els.logQ = q('#log-filter-q');
  els.logRefresh = q('#log-refresh-btn');
  els.logClear = q('#log-clear-btn');
  els.logBody = q('#notif-logs-body');
  els.logPagination = q('#log-pagination');
  els.logFailedSummary = q('#notif-logs-failed-summary');
  // Diagnostics
  els.diagRefresh = q('#notif-diag-refresh');
  els.diagBody = q('#notif-diag-body');
  // Templates manager elements
  els.tplRefresh = q('#tpl-refresh');
  els.tplNew = q('#tpl-new');
  els.tplVars = q('#tpl-vars');
  els.tplVarsBox = q('#tpl-vars-box');
  els.tplTable = q('#tpl-table');
  els.tplBody = q('#tpl-body');
  els.tplForm = q('#tpl-form');
  els.tplId = q('#tpl-id');
  els.tplName = q('#tpl-name');
  els.tplChannel = q('#tpl-channel');
  els.tplAttachment = q('#tpl-attachment');
  els.tplAttachments = q('#tpl-attachments');
  els.tplSubject = q('#tpl-subject');
  els.tplText = q('#tpl-text');
  els.tplHtml = q('#tpl-html');
  els.tplSave = q('#tpl-save');
  els.tplCancel = q('#tpl-cancel');
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
  // Webhook elements
  els.tgWebhookRefresh = q('#tg-webhook-refresh');
  els.tgWebhookSet = q('#tg-webhook-set');
  els.tgWebhookInfo = q('#tg-webhook-info');
  // Chat elements
  els.tgChatSearch = q('#tg-chat-tech-search');
  els.tgChatPick = q('#tg-chat-pick-btn');
  els.tgChatRefresh = q('#tg-chat-refresh-btn');
  els.tgChatSelected = q('#tg-chat-selected');
  els.tgChatMessages = q('#tg-chat-messages');
  els.tgChatInput = q('#tg-chat-input');
  els.tgChatSend = q('#tg-chat-send');
  els.tgChatSendPhoto = q('#tg-chat-send-photo');
  els.tgChatSendPhotos = q('#tg-chat-send-photos');
  els.tgChatLive = q('#tg-chat-live');
  els.tgLiveStatus = q('#tg-live-status');
  els.tgChatLastSeen = q('#tg-chat-last-seen');
  els.tgChatList = q('#tg-chat-list');
  els.tgChatListRefresh = q('#tg-chat-list-refresh');
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
  try { updateChannelCountsFromPreview(data); } catch (_) {}
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

function updateChannelCountsFromPreview(data) {
  const targets = data?.targets || {};
  const details = data?.targets_detail || {};
  let emailCount = Number(targets.email || 0);
  let tgCount = Number(targets.telegram || 0);
  if (!emailCount && Array.isArray(details.email)) emailCount = details.email.length;
  if (!tgCount && Array.isArray(details.telegram)) tgCount = details.telegram.length;
  const setLabelCount = (checkboxEl, baseLabel, count) => {
    if (!checkboxEl) return;
    const span = checkboxEl.parentElement?.querySelector('span');
    if (span) span.textContent = count ? `${baseLabel} (${count})` : baseLabel;
  };
  setLabelCount(els.chEmail, 'إيميل', emailCount);
  setLabelCount(els.chTelegram, 'تليغرام', tgCount);
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
      timeout: 30000,
      body: {
        entity_type: selected.type,
        entity_id: selected.id,
        template_id: (els.templateSelect && els.templateSelect.value) ? Number(els.templateSelect.value) : undefined,
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
    // Enable retry button if any failed
    try {
      const totalTargets = (Number(targets.email || 0) + Number(targets.telegram || 0));
      const totalSent = (Number(sent.email || 0) + Number(sent.telegram || 0));
      const hasFailures = totalTargets > totalSent;
      if (els.retryLastBtn) {
        const bid = res?.data?.batch_id || data?.batch_id;
        if (hasFailures && bid) {
          els.retryLastBtn.hidden = false;
          els.retryLastBtn.setAttribute('data-batch', String(bid));
        } else {
          els.retryLastBtn.hidden = true;
          els.retryLastBtn.removeAttribute('data-batch');
        }
      }
    } catch (_) {}
    fetchLogs();
  } catch (e) {
    console.error(e);
    if (e?.name === 'AbortError') {
      showToast('⏱️ انتهى وقت الطلب، حاول مرة أخرى.');
      return;
    }
    const msg = (e && e.message) ? String(e.message) : 'فشل الإرسال';
    showToast(msg);
  }
}

async function retryLastBatch() {
  const bid = els.retryLastBtn?.getAttribute('data-batch') || '';
  if (!bid) { showToast('لا توجد دفعة لإعادة المحاولة'); return; }
  try {
    const res = await apiRequest('/notifications/retry.php', { method: 'POST', timeout: 30000, body: { batch_id: bid } });
    const sent = Number(res?.data?.sent || 0);
    showToast(`تمت إعادة المحاولة — أُرسلت: ${sent}`);
    fetchLogs();
  } catch (e) {
    console.error(e);
    const msg = (e && (e.payload?.error || e.message)) ? String(e.payload?.error || e.message) : 'فشل إعادة المحاولة';
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
      timeout: 20000,
      body: {
        entity_type: selected.type,
        entity_id: selected.id,
        channels,
        recipients,
        template_id: (els.templateSelect && els.templateSelect.value) ? Number(els.templateSelect.value) : undefined,
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
  // Webhook handlers
  if (els.tgWebhookRefresh) els.tgWebhookRefresh.addEventListener('click', fetchWebhookInfo);
  if (els.tgWebhookSet) els.tgWebhookSet.addEventListener('click', setWebhook);
  if (els.previewBtn) {
    els.previewBtn.addEventListener('click', previewTargets);
  }
  if (els.templateSelect) {
    els.templateSelect.addEventListener('change', onTemplateChange);
  }
  if (els.retryLastBtn) {
    els.retryLastBtn.addEventListener('click', retryLastBatch);
  }
  // Chat handlers
  if (els.tgChatPick) els.tgChatPick.addEventListener('click', chatPickTechnician);
  if (els.tgChatRefresh) els.tgChatRefresh.addEventListener('click', chatRefresh);
  if (els.tgChatSend) els.tgChatSend.addEventListener('click', chatSend);
  if (els.tgChatSendPhoto) els.tgChatSendPhoto.addEventListener('click', chatSendPhoto);
  if (els.tgChatSendPhotos) els.tgChatSendPhotos.addEventListener('click', chatSendPhotos);
  if (els.tgChatSearch) els.tgChatSearch.addEventListener('keydown', (e) => { if (e.key === 'Enter') chatPickTechnician(); });
  if (els.tgChatListRefresh) els.tgChatListRefresh.addEventListener('click', fetchChatList);
  if (els.tgChatList) {
    els.tgChatList.addEventListener('click', (ev) => {
      const li = ev.target.closest('li[data-tech-id]');
      if (!li) return;
      const tid = Number(li.getAttribute('data-tech-id')) || 0;
      const name = li.getAttribute('data-tech-name') || '';
      if (tid) { CHAT_SELECTED_TECH = { id: tid, name }; if (els.tgChatSelected) els.tgChatSelected.textContent = `المحدد: ${name}`; chatRefresh(); }
    });
  }
  if (els.tgChatInput) {
    let typingTimer = null;
    els.tgChatInput.addEventListener('input', () => {
      if (!CHAT_SELECTED_TECH) return;
      if (typingTimer) return; // throttle ~4s
      typingTimer = setTimeout(() => { typingTimer = null; }, 4000);
      apiRequest('/telegram/messages.php', { method: 'POST', body: { action: 'typing', technician_id: CHAT_SELECTED_TECH.id } }).catch(()=>{});
    });
  }
  if (els.tgChatLive) els.tgChatLive.addEventListener('change', () => {
    CHAT_LIVE = !!els.tgChatLive.checked;
    if (CHAT_LIVE) { chatStartLive(); } else { chatStopLive(); }
  });
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
    els.logBatch.addEventListener(ev, () => {
      if (searchTimer) clearTimeout(searchTimer);
      searchTimer = setTimeout(() => { LOG_PAGE = 1; fetchLogs(); }, 350);
    });
    els.logQ.addEventListener(ev, () => {
      if (searchTimer) clearTimeout(searchTimer);
      searchTimer = setTimeout(() => { LOG_PAGE = 1; fetchLogs(); }, 350);
    });
  });
  els.logRefresh.addEventListener('click', fetchLogs);

  // Templates manager
  if (els.tplRefresh) els.tplRefresh.addEventListener('click', loadTemplatesManager);
  if (els.tplNew) els.tplNew.addEventListener('click', () => openTemplateForm());
  if (els.tplVars) els.tplVars.addEventListener('click', () => { if (els.tplVarsBox) els.tplVarsBox.classList.toggle('hidden'); });
  if (els.tplSave) els.tplSave.addEventListener('click', saveTemplate);
  if (els.tplCancel) els.tplCancel.addEventListener('click', () => closeTemplateForm());
  // Diagnostics refresh
  if (els.diagRefresh) els.diagRefresh.addEventListener('click', fetchDiagnostics);
  if (els.tplBody) {
    // Persistent delegation for edit/delete buttons inside the table
    els.tplBody.addEventListener('click', async (ev) => {
      const editBtn = ev.target.closest('[data-edit-id]');
      const delBtn = ev.target.closest('[data-delete-id]');
      try {
        if (editBtn) {
          const id = Number(editBtn.getAttribute('data-edit-id')) || 0;
          if (!id) return;
          const res = await apiRequest(`/notifications/templates.php?id=${encodeURIComponent(id)}`);
          const tpl = res?.data || res || null;
          if (!tpl) return;
          openTemplateForm(tpl);
          return;
        }
        if (delBtn) {
          const id = Number(delBtn.getAttribute('data-delete-id')) || 0;
          if (!id) return;
          const ok = window.confirm('تأكيد حذف القالب؟');
          if (!ok) return;
          await apiRequest(`/notifications/templates.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
          showToast('تم حذف القالب');
          await loadTemplatesManager();
          await fetchTemplates();
          return;
        }
      } catch (e) {
        console.error(e);
        showToast('فشل تنفيذ العملية على القالب');
      }
    });
  }

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
  // Support optional batch_id from URL hash e.g., #batch=abc
  try {
    const h = new URLSearchParams((location.hash || '').replace(/^#/, ''));
    const b = h.get('batch');
    const bInput = (els.logBatch?.value || '').trim();
    if (bInput) params.set('batch_id', bInput);
    else if (b) params.set('batch_id', b);
  } catch (_) {}
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
    els.logBody.innerHTML = `<tr><td colspan="8" class="text-center text-muted">${t('notifications.logs.empty','لا توجد سجلات حالياً.')}</td></tr>`;
    return;
  }

  els.logBody.innerHTML = items.map((row) => {
    const time = row.created_at || '—';
    const event = formatEventLabel(row.event_type || '');
    const entity = `${row.entity_type || ''} #${row.entity_id || ''}`;
    const recipient = row.recipient_display || `${row.recipient_type || ''}: ${row.recipient_identifier || ''}`;
    const rname = row.recipient_name || '';
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
        <td>${rname || '—'}</td>
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
    els.logBody.innerHTML = `<tr><td colspan="8" class="text-center text-muted">${t('notifications.logs.loading','⏳ جارٍ التحميل…')}</td></tr>`;
    const params = buildLogParams();
    const res = await apiRequest(`/notifications/logs.php?${params.toString()}`);
    const items = Array.isArray(res?.data) ? res.data : [];
    renderLogs(items);
    updateFailedSummary(items);
    renderPagination(res?.meta || {});
  } catch (e) {
    console.error(e);
    // Keep colspan in sync with the logs table (8 columns)
    els.logBody.innerHTML = `<tr><td colspan="8" class="text-center text-error">فشل تحميل السجل</td></tr>`;
  }
}

function updateFailedSummary(items) {
  if (!els.logFailedSummary) return;
  try {
    const failed = (Array.isArray(items) ? items : []).filter((r) => (r?.status || '') === 'failed');
    if (!failed.length) {
      els.logFailedSummary.classList.add('hidden');
      els.logFailedSummary.textContent = '';
      return;
    }
    const names = failed.map((r) => String(r.recipient_display || `${r.recipient_type || ''}: ${r.recipient_identifier || ''}`)).filter(Boolean);
    const uniq = Array.from(new Set(names));
    const show = uniq.length <= 10 ? uniq.join('، ') : uniq.slice(0, 10).join('، ') + `، و+${uniq.length - 10} آخرين`;
    els.logFailedSummary.textContent = `فاشلة: ${failed.length} — ${show}`;
    els.logFailedSummary.classList.remove('hidden');
  } catch (err) {
    // best-effort; do not break logs
    els.logFailedSummary.classList.add('hidden');
  }
}

async function fetchTemplates() {
  if (!els.templateSelect) return;
  try {
    const res = await apiRequest('/notifications/templates.php?limit=100');
    const items = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
    const opts = ['<option value="">— بدون قالب —</option>'].concat(
      items.map((t)=> `<option value="${t.id}">${(t.name || '').toString()} (${t.channel})</option>`)
    );
    els.templateSelect.innerHTML = opts.join('');
  } catch (e) {
    console.error(e);
  }
}

async function onTemplateChange() {
  const tid = els.templateSelect?.value || '';
  if (!tid) return;
  try {
    const res = await apiRequest(`/notifications/templates.php?id=${encodeURIComponent(tid)}`);
    const tpl = res?.data || res || null;
    if (!tpl) return;
    if (tpl.subject && els.subject) els.subject.value = String(tpl.subject);
    const txt = tpl.body_text || (tpl.body_html ? String(tpl.body_html).replace(/<[^>]+>/g,'') : '');
    if (txt && els.body) els.body.value = txt;
    showToast('تم تطبيق القالب');
  } catch (e) {
    console.error(e);
  }
}

async function fetchWebhookInfo() {
  try {
    if (els.tgWebhookInfo) els.tgWebhookInfo.textContent = 'جارٍ التحميل…';
    const res = await apiRequest('/telegram/webhook-manage.php');
    const info = res?.data || res || {};
    const url = info.url || '—';
    const has = info.has_custom_certificate ? 'yes' : 'no';
    const pending = info.pending_update_count != null ? String(info.pending_update_count) : '—';
    const lastErr = info.last_error_message ? `خطأ: ${info.last_error_message}` : '';
    const lastDate = info.last_error_date ? new Date(info.last_error_date * 1000).toLocaleString() : '';
    const arr = [`URL: ${url}`, `Pending: ${pending}`, `Cert: ${has}`];
    if (lastErr) arr.push(lastErr);
    if (lastDate) arr.push(`وقت الخطأ: ${lastDate}`);
    if (els.tgWebhookInfo) els.tgWebhookInfo.textContent = arr.join(' | ');
  } catch (e) {
    console.error(e);
    if (els.tgWebhookInfo) els.tgWebhookInfo.textContent = 'فشل قراءة الحالة';
  }
}

async function setWebhook() {
  try {
    const res = await apiRequest('/telegram/webhook-manage.php', { method: 'POST', body: {} });
    if ((res?.ok === true) || (res?.data?.ok === true)) {
      showToast('تم ضبط Webhook');
    } else {
      showToast('تعذر ضبط Webhook');
    }
  } catch (e) {
    console.error(e);
    showToast('فشل ضبط Webhook');
  } finally {
    fetchWebhookInfo();
  }
}

async function fetchDiagnostics() {
  if (!els.diagBody) return;
  try {
    els.diagBody.innerHTML = '<tr><td colspan="3" class="text-center text-muted">جارٍ الفحص…</td></tr>';
    const res = await apiRequest('/notifications/diagnostics.php');
    const items = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
    if (!items.length) { els.diagBody.innerHTML = '<tr><td colspan="3" class="text-center text-muted">—</td></tr>'; return; }
    els.diagBody.innerHTML = items.map((c) => {
      const ok = !!c.ok;
      const badge = ok ? '<span class="badge bg-primary-subtle">OK</span>' : '<span class="badge bg-danger-subtle">مفقود</span>';
      const hint = c.hint || '';
      return `<tr><td>${c.name}</td><td>${badge}</td><td>${hint}</td></tr>`;
    }).join('');
  } catch (e) {
    console.error(e);
    els.diagBody.innerHTML = '<tr><td colspan="3" class="text-center text-error">فشل الفحص</td></tr>';
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
  fetchWebhookInfo();
  fetchDiagnostics();
  fetchTemplates();
  loadTemplatesManager();
  fetchChatList();
})();

async function loadTemplatesManager() {
  if (!els.tplBody) return;
  try {
    els.tplBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">جارٍ التحميل…</td></tr>';
    const res = await apiRequest('/notifications/templates.php?limit=100');
    const items = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
    if (!items.length) {
      els.tplBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">لا توجد قوالب</td></tr>';
      return;
    }
    els.tplBody.innerHTML = items.map((t) => {
      const id = Number(t.id || 0);
      const name = (t.name || '').toString();
      const chan = (t.channel || '').toString();
      const updated = (t.updated_at || '').toString() || '—';
      return `<tr>
        <td>${name}</td>
        <td>${chan}</td>
        <td>${updated}</td>
        <td>
          <button type="button" class="btn btn-sm" data-edit-id="${id}">تعديل</button>
          <button type="button" class="btn btn-sm btn-outline btn-error" data-delete-id="${id}">حذف</button>
        </td>
      </tr>`;
    }).join('');
  } catch (e) {
    console.error(e);
    els.tplBody.innerHTML = '<tr><td colspan="4" class="text-center text-error">فشل تحميل القوالب</td></tr>';
  }
}

function openTemplateForm(tpl = null) {
  if (!els.tplForm) return;
  els.tplForm.hidden = false;
  // Fill or clear fields
  const set = (el, val) => { if (el) el.value = val != null ? String(val) : ''; };
  set(els.tplId, tpl?.id || '');
  set(els.tplName, tpl?.name || '');
  if (els.tplChannel) els.tplChannel.value = tpl?.channel || 'both';
  set(els.tplAttachment, tpl?.attachment_url || '');
  const atts = Array.isArray(tpl?.attachment_urls) ? tpl.attachment_urls : [];
  set(els.tplAttachments, atts.length ? atts.join('\n') : '');
  set(els.tplSubject, tpl?.subject || '');
  set(els.tplText, tpl?.body_text || '');
  set(els.tplHtml, tpl?.body_html || '');
  try { els.tplName?.focus(); } catch (_) {}
}

function closeTemplateForm() {
  if (!els.tplForm) return;
  els.tplForm.hidden = true;
  ['tplId','tplName','tplAttachment','tplAttachments','tplSubject','tplText','tplHtml'].forEach((k) => {
    if (els[k]) els[k].value = '';
  });
  if (els.tplChannel) els.tplChannel.value = 'both';
}

async function saveTemplate() {
  if (!els.tplName || !els.tplChannel) return;
  const id = Number(els.tplId?.value || '') || 0;
  const name = (els.tplName.value || '').trim();
  const channel = (els.tplChannel.value || 'both');
  const subject = (els.tplSubject?.value || '').trim();
  const body_text = (els.tplText?.value || '').trim();
  const body_html = (els.tplHtml?.value || '').trim();
  const attachment_url = (els.tplAttachment?.value || '').trim() || null;
  const attachment_urls = (els.tplAttachments?.value || '').split('\n').map(s => s.trim()).filter(Boolean);
  if (!name) { showToast('اكتب اسم القالب'); return; }
  try {
    if (id > 0) {
      await apiRequest(`/notifications/templates.php?id=${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: { name, channel, subject, body_text, body_html, attachment_url, attachment_urls },
      });
      showToast('تم تحديث القالب');
    } else {
      await apiRequest('/notifications/templates.php', {
        method: 'POST',
        body: { name, channel, subject, body_text, body_html, attachment_url, attachment_urls },
      });
      showToast('تم إنشاء القالب');
    }
    closeTemplateForm();
    await loadTemplatesManager();
    await fetchTemplates();
  } catch (e) {
    console.error(e);
    const msg = (e && (e.payload?.error || e.message)) ? String(e.payload?.error || e.message) : 'فشل حفظ القالب';
    showToast(msg);
  }
}

let CHAT_SELECTED_TECH = null; // { id, name, chat_id? }

async function chatPickTechnician() {
  const qstr = (els.tgChatSearch?.value || '').trim();
  if (!qstr) { showToast('اكتب اسم/جوال الفني للبحث'); return; }
  try {
    const params = new URLSearchParams();
    params.set('search', qstr);
    params.set('limit', '5');
    const res = await apiRequest(`/technicians/?${params.toString()}`);
    const items = Array.isArray(res?.data) ? res.data : [];
    if (!items.length) { showToast('لا نتائج'); return; }
    const t = items[0];
    CHAT_SELECTED_TECH = { id: t.id, name: t.full_name || t.name || String(t.id) };
    if (els.tgChatSelected) els.tgChatSelected.textContent = `المحدد: ${CHAT_SELECTED_TECH.name}`;
    await chatRefresh();
  } catch (e) {
    console.error('[chatPickTechnician] primary lookup failed', e);
    // Fallback: try without search then filter locally (handles transient 500 or collation quirks)
    try {
      const res2 = await apiRequest('/technicians/?limit=20');
      const all = Array.isArray(res2?.data) ? res2.data : [];
      const norm = (s) => String(s || '').toLowerCase();
      const digits = (s) => String(s || '').replace(/[^0-9]/g, '');
      const qn = norm(qstr);
      const qd = digits(qstr);
      const match = all.find(t =>
        norm(t.full_name || t.name).includes(qn) || (qd && digits(t.phone || '').includes(qd))
      );
      if (match) {
        CHAT_SELECTED_TECH = { id: match.id, name: match.full_name || match.name || String(match.id) };
        if (els.tgChatSelected) els.tgChatSelected.textContent = `المحدد: ${CHAT_SELECTED_TECH.name}`;
        await chatRefresh();
        return;
      }
      const msg = (e && (e.payload?.error || e.message)) ? String(e.payload?.error || e.message) : 'لا نتائج';
      showToast(`فشل اختيار الفني — ${msg}`);
    } catch (e2) {
      console.error('[chatPickTechnician] fallback lookup failed', e2);
      const msg = (e2 && (e2.payload?.error || e2.message)) ? String(e2.payload?.error || e2.message) : 'فشل اختيار الفني';
      showToast(msg);
    }
  }
}

async function chatRefresh() {
  if (!CHAT_SELECTED_TECH) { showToast('اختر فنياً أولاً'); return; }
  try {
    if (els.tgChatMessages) els.tgChatMessages.innerHTML = '<div class="text-center text-muted">جارٍ التحميل…</div>';
    const params = new URLSearchParams();
    params.set('technician_id', String(CHAT_SELECTED_TECH.id));
    params.set('limit', '100');
    const res = await apiRequest(`/telegram/messages.php?${params.toString()}`);
    const items = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
    if (!items.length) {
      els.tgChatMessages.innerHTML = '<div class="text-center text-muted">لا توجد رسائل</div>';
      return;
    }
    const html = items.map(buildChatBubble).join('');
    els.tgChatMessages.innerHTML = html;
    els.tgChatMessages.scrollTop = els.tgChatMessages.scrollHeight;
    CHAT_LAST_ID = Number(items[items.length - 1]?.id || 0);
    if (CHAT_LIVE && !CHAT_POLL_TIMER) chatStartLive();
    // Mark as read up to latest and refresh chat list badges
    try { await markChatRead(CHAT_SELECTED_TECH.id, CHAT_LAST_ID); fetchChatList(); } catch (_) {}
    try { updateLastSeenLabelFromListCache(); } catch (_) {}
  } catch (e) {
    console.error(e);
    els.tgChatMessages.innerHTML = '<div class="text-center text-error">فشل تحميل المحادثة</div>';
  }
}

function updateLastSeenLabelFromListCache() {
  try {
    const items = window.__CHAT_LIST_CACHE__ || [];
    if (!CHAT_SELECTED_TECH || !els.tgChatLastSeen) return;
    const found = items.find((c) => Number(c.technician_id || 0) === Number(CHAT_SELECTED_TECH.id));
    els.tgChatLastSeen.textContent = found && found.last_seen_at ? String(found.last_seen_at) : '—';
  } catch (_) {}
}

function buildChatBubble(m) {
  const isOut = (m.direction === 'outbound');
  const who = isOut ? 'أنا' : (m.technician_name || 'فني');
  const side = isOut ? 'justify-end' : 'justify-start';
  const bubble = isOut ? 'bg-primary text-primary-content' : 'bg-base-200';
  const time = m.created_at || '';
  const txt = (m.text || '').replace(/</g,'&lt;');
  const imgs = [];
  try {
    const media = m.media_json || null;
    const photos = Array.isArray(media?.photos) ? media.photos : [];
    photos.forEach((p) => {
      const src = /^https?:\/\//i.test(String(p)) ? String(p) : `/backend/api/telegram/file.php?file_id=${encodeURIComponent(String(p))}`;
      imgs.push(`<img src="${src}" class="rounded mt-2 max-w-[240px] max-h-[240px]" loading="lazy">`);
    });
  } catch (_) {}
  const mediaHtml = imgs.length ? imgs.join('') : '';
  return `<div class="flex ${side}"><div class="rounded-xl px-3 py-2 m-1 max-w-[80%] ${bubble}"><div class="text-xs opacity-70">${who} • ${time}</div><div>${txt}</div>${mediaHtml}</div></div>`;
}

function chatStartLive() {
  chatStopLive();
  if (!CHAT_SELECTED_TECH) return;
  CHAT_LIVE = true;
  if (els.tgChatLive) els.tgChatLive.checked = true;
  // Try SSE first if supported and not disabled
  if (typeof EventSource !== 'undefined' && !CHAT_SSE_DISABLED) {
    try { if (els.tgLiveStatus) els.tgLiveStatus.textContent = 'Connecting…'; chatOpenSSE(); return; } catch (_) { /* fallback to polling */ }
  }
  CHAT_POLL_TIMER = setInterval(() => chatFetchNew().catch(()=>{}), 3000);
  if (els.tgLiveStatus) els.tgLiveStatus.textContent = 'Polling';
}

function chatStopLive() {
  CHAT_LIVE = false;
  if (els.tgChatLive) els.tgChatLive.checked = false;
  if (CHAT_POLL_TIMER) { clearInterval(CHAT_POLL_TIMER); CHAT_POLL_TIMER = null; }
  CHAT_POLLING = false;
  if (CHAT_SSE) {
    try { CHAT_SSE.close(); } catch (_) {}
    CHAT_SSE = null;
  }
  if (els.tgLiveStatus) els.tgLiveStatus.textContent = 'متوقف';
}

async function chatFetchNew() {
  if (!CHAT_SELECTED_TECH) return;
  if (CHAT_POLLING) return;
  CHAT_POLLING = true;
  try {
    const params = new URLSearchParams();
    params.set('technician_id', String(CHAT_SELECTED_TECH.id));
    if (CHAT_LAST_ID > 0) params.set('since_id', String(CHAT_LAST_ID));
    params.set('limit', '100');
    const res = await apiRequest(`/telegram/messages.php?${params.toString()}`);
    const items = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
    if (items.length) {
      const frag = document.createDocumentFragment();
      items.forEach((m) => {
        CHAT_LAST_ID = Math.max(CHAT_LAST_ID, Number(m.id || 0));
        const div = document.createElement('div');
        div.innerHTML = buildChatBubble(m);
        frag.appendChild(div.firstChild);
      });
      els.tgChatMessages.appendChild(frag);
      els.tgChatMessages.scrollTop = els.tgChatMessages.scrollHeight;
    }
    try { await markChatRead(CHAT_SELECTED_TECH.id, CHAT_LAST_ID); fetchChatList(); } catch (_) {}
  } catch (e) {
    // Silent on polling errors to avoid spamming UI
  } finally {
    CHAT_POLLING = false;
  }
}

function chatOpenSSE() {
  if (!CHAT_SELECTED_TECH) return;
  const tid = String(CHAT_SELECTED_TECH.id);
  const since = CHAT_LAST_ID > 0 ? `&since_id=${encodeURIComponent(String(CHAT_LAST_ID))}` : '';
  const url = `/backend/api/telegram/stream.php?technician_id=${encodeURIComponent(tid)}${since}&timeout=25`;
  try { if (CHAT_SSE) { CHAT_SSE.close(); CHAT_SSE = null; } } catch (_) {}
  CHAT_SSE = new EventSource(url, { withCredentials: true });
  CHAT_SSE.onopen = () => { if (els.tgLiveStatus) els.tgLiveStatus.textContent = 'SSE'; };
  CHAT_SSE.addEventListener('message', async (ev) => {
    try {
      const data = ev.data ? JSON.parse(ev.data) : [];
      if (Array.isArray(data) && data.length) {
        const frag = document.createDocumentFragment();
        data.forEach((m) => {
          CHAT_LAST_ID = Math.max(CHAT_LAST_ID, Number(m.id || 0));
          const div = document.createElement('div');
          div.innerHTML = buildChatBubble(m);
          frag.appendChild(div.firstChild);
        });
        if (els.tgChatMessages) {
          els.tgChatMessages.appendChild(frag);
          els.tgChatMessages.scrollTop = els.tgChatMessages.scrollHeight;
        }
        try { await markChatRead(CHAT_SELECTED_TECH.id, CHAT_LAST_ID); fetchChatList(); } catch (_) {}
      }
    } catch (_) {}
  });
  CHAT_SSE.addEventListener('done', () => {
    // server closed window; reopen with updated since_id
    try { CHAT_SSE.close(); } catch (_) {}
    CHAT_SSE = null;
    if (CHAT_LIVE) {
      setTimeout(() => {
        if (CHAT_LIVE && !CHAT_SSE_DISABLED) {
          try { chatOpenSSE(); return; } catch (_) {}
        }
        // fallback to polling
        if (CHAT_LIVE && !CHAT_POLL_TIMER) {
          CHAT_POLL_TIMER = setInterval(() => chatFetchNew().catch(()=>{}), 3000);
        }
      }, 200);
    }
  });
  CHAT_SSE.onerror = () => {
    // disable SSE for this session and fallback to polling
    try { CHAT_SSE.close(); } catch (_) {}
    CHAT_SSE = null;
    CHAT_SSE_DISABLED = true;
    if (CHAT_LIVE && !CHAT_POLL_TIMER) {
      CHAT_POLL_TIMER = setInterval(() => chatFetchNew().catch(()=>{}), 3000);
    }
    if (els.tgLiveStatus) els.tgLiveStatus.textContent = 'Polling';
  };
}

async function fetchChatList() {
  if (!els.tgChatList) return;
  try {
    els.tgChatList.innerHTML = '<li class="px-3 py-1 text-center text-muted">جارٍ التحميل…</li>';
    const res = await apiRequest('/telegram/messages.php?list=recent');
    const items = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
    if (!items.length) { els.tgChatList.innerHTML = '<li class="px-3 py-1 text-center text-muted">لا محادثات</li>'; return; }
    window.__CHAT_LIST_CACHE__ = items;
    els.tgChatList.innerHTML = items.map((c) => {
      const name = c.technician_name || c.chat_id || 'دردشة';
      const unread = Number(c.unread || 0);
      const badge = unread ? `<span class="badge badge-primary badge-sm ms-2">${unread}</span>` : '';
      return `<li class="px-3 py-2 cursor-pointer hover:bg-base-300" data-tech-id="${c.technician_id || ''}" data-tech-name="${name}">${name}${badge}<div class="text-xs opacity-70 truncate">${(c.last_text || '').toString()}</div></li>`;
    }).join('');
    updateLastSeenLabelFromListCache();
  } catch (e) {
    console.error(e);
    els.tgChatList.innerHTML = '<li class="px-3 py-1 text-center text-error">فشل تحميل القائمة</li>';
  }
}

async function markChatRead(technicianId, lastId) {
  try {
    await apiRequest('/telegram/messages.php', { method: 'POST', body: { action: 'mark_read', technician_id: Number(technicianId), last_seen_id: Number(lastId) } });
  } catch (_) {}
}

async function chatSend() {
  if (!CHAT_SELECTED_TECH) { showToast('اختر فنياً أولاً'); return; }
  const text = (els.tgChatInput?.value || '').trim();
  if (!text) { showToast('اكتب رسالة'); return; }
  try {
    await apiRequest('/telegram/messages.php', { method: 'POST', body: { technician_id: CHAT_SELECTED_TECH.id, text } });
    if (els.tgChatInput) els.tgChatInput.value = '';
    await chatRefresh();
  } catch (e) {
    console.error(e);
    const msg = (e && (e.payload?.error || e.message)) ? String(e.payload?.error || e.message) : 'فشل الإرسال';
    showToast(msg);
  }
}

async function chatSendPhoto() {
  if (!CHAT_SELECTED_TECH) { showToast('اختر فنياً أولاً'); return; }
  const url = window.prompt('ضع رابط الصورة (https://...)');
  if (!url) return;
  const caption = (els.tgChatInput?.value || '').trim();
  try {
    await apiRequest('/telegram/messages.php', { method: 'POST', body: { technician_id: CHAT_SELECTED_TECH.id, photo_url: url, text: caption || undefined } });
    if (els.tgChatInput) els.tgChatInput.value = '';
    await chatFetchNew();
  } catch (e) {
    console.error(e);
    showToast('فشل إرسال الصورة');
  }
}

async function chatSendPhotos() {
  if (!CHAT_SELECTED_TECH) { showToast('اختر فنياً أولاً'); return; }
  const input = window.prompt('ضع روابط الصور كل رابط بسطر (أو مفصولة بفواصل)');
  if (!input) return;
  const arr = input.split(/\n|,/).map(s => s.trim()).filter(Boolean);
  if (!arr.length) return;
  try {
    await apiRequest('/telegram/messages.php', { method: 'POST', body: { technician_id: CHAT_SELECTED_TECH.id, photo_urls: arr } });
    await chatFetchNew();
  } catch (e) {
    console.error(e);
    showToast('فشل إرسال الصور');
  }
}

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
