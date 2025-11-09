import '../../styles/templatesA4.css';
import { t } from '../language.js';
import { getProjectsState, refreshProjectsFromApi } from '../projectsService.js';
import { getReservationsState, refreshReservationsFromApi } from '../reservationsService.js';
import { getTechniciansState, refreshTechniciansFromApi } from '../techniciansService.js';
// Avoid heavy cross-imports from view.js; compute locally
function getReservationsForProjectLocal(projectId) {
  if (!projectId) return [];
  const list = getReservationsState();
  return Array.isArray(list)
    ? list.filter((r) => String(r?.projectId ?? r?.project_id ?? '') === String(projectId))
    : [];
}
import { ensureHtml2Pdf, loadExternalScript } from '../reports/external.js';
// Table interactions are handled via templates/tableInteractions.js; no direct tableTools use here
import { showTemplatesDebugOverlay } from '../templates/debug.js';
import { buildCallSheetPage as buildCallSheetPageExt, populateCrewFromReservation as populateCrewFromReservationExt, populateCrewFromReservationIfEmpty as populateCrewFromReservationIfEmptyExt } from '../templates/build/callsheet.js';
import { buildShotListPage as buildShotListPageExt } from '../templates/build/shotlist.js';
import { buildExpensesPage as buildExpensesPageExt } from '../templates/build/expenses.js';
import { el } from '../templates/core.js';
import { pageHasMeaningfulContent } from '../templates/pageUtils.js';
import { ensureAssetsReady } from '../templates/assets.js';
import { initHistory, pushHistoryDebounced, undoTemplatesChange, redoTemplatesChange, setupTemplatesHistory, pushTemplatesHistory } from '../templates/history.js';
import { ensureCellToolbar as ensureCellToolbarExt } from '../templates/toolbar.js';
import { autoPaginateTemplates as autoPaginateTemplatesExt, paginateExpDetailsTables as paginateExpDetailsTablesExt, paginateGenericTplTables as paginateGenericTplTablesExt, pruneEmptyA4Pages as pruneEmptyA4PagesExt, trimTrailingEmptyRows as trimTrailingEmptyRowsExt, shrinkSingleWordCells as shrinkSingleWordCellsExt, shrinkScheduleHeaderLabels as shrinkScheduleHeaderLabelsExt } from '../templates/pagination.js';
import { bindExpensesRowActions } from '../templates/expensesTools.js';
import { bindTableInteractions } from '../templates/tableInteractions.js';
import { snapshotShading, applyShadingSnapshot } from '../templates/shading.js';
import {
  patchHtml2CanvasColorParsing,
  sanitizeComputedColorFunctions,
  enforceLegacyColorFallback,
  scrubUnsupportedColorFunctions,
  revertStyleMutations,
  injectExportSanitizer,
  removeExportSanitizer,
} from '../canvasColorUtils.js';
import { PROJECT_TAX_RATE } from './constants.js';
import { apiRequest } from '../apiClient.js';
import { showToast } from '../utils.js';

// Templates A4 preview zoom state and controls
let TPL_PREVIEW_ZOOM = 1;
let TPL_USER_ADJUSTED_ZOOM = false;
let TPL_ZOOM_VALUE_EL = null;
let TPL_ZOOM_MODE = 'manual'; // 'manual' | 'fit'
let TPL_ZOOM_FIT_BTN = null;
let TPL_ZOOM_RESIZE_BOUND = false;
let TPL_EVENTS_BOUND = false; // avoid duplicate listeners / timers
let TPL_LISTENERS = { hostInput: null, hostMouseDown: null, hostFocusIn: null, hostFocusOut: null, projChanged: null, resChanged: null, resUpdated: null, tabClick: null };
let TPL_HOST_EL = null;
let TPL_REPOPULATE_TIMER = null;
let TPL_RESIZE_OBSERVER = null;
let TPL_TABLE_UNBIND = null;
let TPL_SUBTOTAL_TIMER = null;
let TPL_EXPENSES_UNBIND = null;

function destroyTemplatesTab() {
  try {
    const host = document.getElementById('templates-preview-host');
    if (host) {
      // click handler bound via bindExpensesRowActions; unbound below
      try { if (TPL_LISTENERS.hostInput) host.removeEventListener('input', TPL_LISTENERS.hostInput); } catch (_) {}
      try { if (TPL_TABLE_UNBIND) { TPL_TABLE_UNBIND(); TPL_TABLE_UNBIND = null; } } catch (_) {}
      try { if (TPL_LISTENERS.hostMouseDown) host.removeEventListener('mousedown', TPL_LISTENERS.hostMouseDown, true); } catch (_) {}
      try { if (TPL_LISTENERS.hostFocusIn) host.removeEventListener('focusin', TPL_LISTENERS.hostFocusIn, true); } catch (_) {}
      try { if (TPL_LISTENERS.hostFocusOut) host.removeEventListener('focusout', TPL_LISTENERS.hostFocusOut, true); } catch (_) {}
      try { if (TPL_EXPENSES_UNBIND) { TPL_EXPENSES_UNBIND(); TPL_EXPENSES_UNBIND = null; } } catch (_) {}
      // Detach toolbar selection observer if present
      try {
        const bar = document.getElementById('tpl-cell-toolbar');
        if (bar && typeof bar.__detach === 'function') { bar.__detach(); }
      } catch (_) {}
    }
    if (TPL_LISTENERS.projChanged) document.removeEventListener('projects:changed', TPL_LISTENERS.projChanged);
    if (TPL_LISTENERS.resChanged) document.removeEventListener('reservations:changed', TPL_LISTENERS.resChanged);
    if (TPL_LISTENERS.resUpdated) document.removeEventListener('reservations:updated', TPL_LISTENERS.resUpdated);
    if (TPL_LISTENERS.tabClick) {
      const templatesTabBtn = document.querySelector('[data-project-subtab-target="projects-templates-tab"]');
      if (templatesTabBtn) templatesTabBtn.removeEventListener('click', TPL_LISTENERS.tabClick);
    }
    if (TPL_REPOPULATE_TIMER) { clearTimeout(TPL_REPOPULATE_TIMER); TPL_REPOPULATE_TIMER = null; }
    if (TPL_RESIZE_OBSERVER) { try { TPL_RESIZE_OBSERVER.disconnect(); } catch (_) {} TPL_RESIZE_OBSERVER = null; }
  } finally {
    TPL_EVENTS_BOUND = false; TPL_HOST_EL = null; TPL_LISTENERS = { hostInput: null, hostMouseDown: null, hostFocusIn: null, hostFocusOut: null, projChanged: null, resChanged: null, resUpdated: null, tabClick: null };
  }
}

function notifyApiError(err, fallback = 'تعذر الاتصال بالخادم') {
  try {
    let msg = (err && err.message) ? String(err.message) : fallback;
    // Special-case common backend misconfiguration to guide the user
    try {
      const raw = (err && err.payload && err.payload.raw) ? String(err.payload.raw) : '';
      const combined = `${msg}\n${raw}`;
      if (/Missing configuration file/i.test(combined)) {
        msg = 'الخادم غير مُعد: يرجى نسخ backend/config.example.php إلى backend/config.php وتعبئة بيانات الاتصال (Database + allowed_origins) ثم إعادة المحاولة.';
      }
    } catch (_) { /* ignore */ }
    if (typeof showToast === 'function') showToast(msg, 'error', 7000);
    else alert(msg);
  } catch (_) { /* ignore */ }
}

function readTplZoomPref() {
  try { return Math.max(0.3, Math.min(2.5, Number(localStorage.getItem('templates.preview.zoom') || '1'))); } catch (_) { return 1; }
}
function writeTplZoomPref(v) { try { localStorage.setItem('templates.preview.zoom', String(v)); } catch (_) {} }
function readTplZoomModePref() { try { const m = localStorage.getItem('templates.preview.zoomMode') || 'manual'; return (m === 'fit') ? 'fit' : 'manual'; } catch(_) { return 'manual'; } }
function writeTplZoomModePref(m) { try { localStorage.setItem('templates.preview.zoomMode', (m === 'fit') ? 'fit' : 'manual'); } catch(_) {} }
function setTemplatesPreviewZoom(value, { silent = false, markManual = false } = {}) {
  TPL_PREVIEW_ZOOM = Math.min(Math.max(value, 0.25), 2.5);
  if (markManual) TPL_USER_ADJUSTED_ZOOM = true;
  applyTemplatesPreviewZoom(TPL_PREVIEW_ZOOM);
  writeTplZoomPref(TPL_PREVIEW_ZOOM);
  if (!silent && TPL_ZOOM_VALUE_EL) {
    TPL_ZOOM_VALUE_EL.textContent = `${Math.round(TPL_PREVIEW_ZOOM * 100)}%`;
  }
}
function adjustTemplatesPreviewZoom(delta) {
  // Switching to manual mode on any explicit user zoom change
  TPL_ZOOM_MODE = 'manual';
  writeTplZoomModePref(TPL_ZOOM_MODE);
  setTemplatesPreviewZoom(TPL_PREVIEW_ZOOM + delta, { markManual: true });
}
function applyTemplatesPreviewZoom(value) {
  const root = document.querySelector('#templates-preview-host > #templates-a4-root')
    || document.querySelector('#templates-preview-host #templates-a4-root');
  if (!root) return;
  try { root.style.transformOrigin = 'top center'; } catch (_) {}
  try { root.style.transform = `scale(${value})`; } catch (_) {}
}

function computeTemplatesBaseWidth() {
  try {
    const page = document.querySelector('#templates-preview-host #templates-a4-root .a4-page');
    if (page) return page.getBoundingClientRect().width || page.offsetWidth || 794;
  } catch (_) {}
  const type = document.getElementById('templates-type')?.value || 'expenses';
  return (type !== 'expenses') ? 1123 : 794;
}
function computeTemplatesAvailableWidth() {
  const host = document.getElementById('templates-preview-host');
  if (!host) return null;
  try {
    const cs = window.getComputedStyle(host);
    const pl = parseFloat(cs.paddingLeft || '0') || 0;
    const pr = parseFloat(cs.paddingRight || '0') || 0;
    return Math.max(0, host.clientWidth - pl - pr);
  } catch (_) { return host.clientWidth || null; }
}
function computeTemplatesFitZoom() {
  const base = computeTemplatesBaseWidth();
  const avail = computeTemplatesAvailableWidth();
  if (!base || !avail) return 1;
  return Math.max(0.25, Math.min(2.5, avail / base));
}
function applyTemplatesFitZoom() {
  const z = computeTemplatesFitZoom();
  setTemplatesPreviewZoom(z, { silent: false });
}
function ensureResizeBinding() {
  if (TPL_ZOOM_RESIZE_BOUND) return;
  window.addEventListener('resize', () => { if (TPL_ZOOM_MODE === 'fit') applyTemplatesFitZoom(); }, { passive: true });
  TPL_ZOOM_RESIZE_BOUND = true;
}

function ensureResizeObserver() {
  try {
    if (TPL_RESIZE_OBSERVER) return;
    const host = document.getElementById('templates-preview-host');
    if (!host || typeof ResizeObserver === 'undefined') return;
    TPL_RESIZE_OBSERVER = new ResizeObserver(() => {
      if (TPL_ZOOM_MODE === 'fit') applyTemplatesFitZoom();
    });
    TPL_RESIZE_OBSERVER.observe(host);
  } catch (_) { /* ignore */ }
}

function recomputeExpensesSubtotalsDebounced(delay = 180) {
  try { if (TPL_SUBTOTAL_TIMER) clearTimeout(TPL_SUBTOTAL_TIMER); } catch (_) {}
  TPL_SUBTOTAL_TIMER = setTimeout(() => { try { recomputeExpensesSubtotals(); } catch (_) {} }, Math.max(0, delay));
}

// Lightweight number parser for Expenses (supports Arabic/Persian digits) without mutating DOM
function parseExpensesNumber(txt, def = 0) {
  try {
    const s = String(txt || '');
    const mapped = s
      .replace(/[\u0660-\u0669]/g, (d) => '0123456789'[d.charCodeAt(0) - 0x0660])
      .replace(/[\u06F0-\u06F9]/g, (d) => '0123456789'[d.charCodeAt(0) - 0x06F0])
      .replace(/[\u066B]/g, '.')
      .replace(/[\u066C]/g, '')
      .replace(/[\u200f\u200e]/g, '')
      .replace(/[^\d.\-]/g, '');
    const n = Number(mapped);
    return Number.isFinite(n) ? n : def;
  } catch(_) { return def; }
}

// Fast path: recompute only the changed row + its subgroup + parent group + top sheet
function recomputeExpensesForCell(targetTd) {
  try {
    const td = targetTd instanceof HTMLElement ? targetTd.closest('td') : null;
    if (!td) return;
    const tr = td.closest('tr');
    const table = td.closest('table.exp-details');
    if (!tr || !table) return;
    if (tr.getAttribute('data-row') !== 'item') { recomputeExpensesSubtotalsDebounced(220); return; }
    const tds = Array.from(tr.children);
    const rate = parseExpensesNumber(tds[2]?.textContent, 0);
    const qty  = parseExpensesNumber(tds[3]?.textContent, 1);
    const days = parseExpensesNumber(tds[4]?.textContent, 1);
    const paid = parseExpensesNumber(tds[5]?.textContent, 0);
    const total = Math.round(rate * qty * days);
    if (tds[6]) { tds[6].textContent = String(total); try { tds[6].setAttribute('data-num','1'); } catch(_) {} }

    // Find subgroup bounds (header with data-subgroup + next subtotal)
    let cursor = tr.previousElementSibling; let header = null;
    while (cursor) { if (cursor.hasAttribute && cursor.hasAttribute('data-subgroup-header')) { header = cursor; break; } cursor = cursor.previousElementSibling; }
    if (!header) { recomputeExpensesSubtotalsDebounced(220); return; }
    const code = header.getAttribute('data-subgroup');
    let subtotal = 0; let count = 0; let sumCursor = header.nextElementSibling; let subtotalRow = null;
    while (sumCursor && !sumCursor.hasAttribute('data-subgroup-header')) {
      if (sumCursor.hasAttribute('data-subgroup-subtotal')) { subtotalRow = sumCursor; break; }
      if (sumCursor.getAttribute('data-row') === 'item') {
        const cells = Array.from(sumCursor.children);
        const r = parseExpensesNumber(cells[2]?.textContent, 0);
        const q = parseExpensesNumber(cells[3]?.textContent, 1);
        const d = parseExpensesNumber(cells[4]?.textContent, 1);
        const tot = Math.round(r * q * d);
        if (cells[6]) { cells[6].textContent = String(tot); try { cells[6].setAttribute('data-num','1'); } catch(_) {} }
        subtotal += tot; const hasContent = String(cells[1]?.textContent||'').trim().length || r || q; if (hasContent) count += 1;
      }
      sumCursor = sumCursor.nextElementSibling;
    }
    if (subtotalRow) {
      try { const cell = subtotalRow.querySelector('[data-subtotal]') || subtotalRow.lastElementChild; if (cell) cell.textContent = String(subtotal); } catch(_) {}
    }
    // Update top sheet for this subgroup
    try {
      const cntEl = document.querySelector(`#templates-preview-host #expenses-top-sheet [data-top-count="${CSS.escape(code)}"]`);
      const totEl = document.querySelector(`#templates-preview-host #expenses-top-sheet [data-top-total="${CSS.escape(code)}"]`);
      if (cntEl) cntEl.textContent = String(count);
      if (totEl) totEl.textContent = String(subtotal);
    } catch(_) {}
    // Update parent group totals and grand total
    try {
      const marker = document.querySelector(`#templates-preview-host tr[data-subgroup-marker="${CSS.escape(code)}"]`);
      const parent = marker?.getAttribute('data-parent-group') || null;
      if (parent) {
        const allSubs = Array.from(document.querySelectorAll(`#templates-preview-host [data-subtotal]`));
        let gsum = 0; let atls=0, prods=0, posts=0;
        allSubs.forEach((c) => { const k = c.getAttribute('data-subtotal'); const v = parseExpensesNumber(c.textContent, 0); gsum += v; const m = document.querySelector(`#templates-preview-host tr[data-subgroup-marker="${CSS.escape(k)}"]`); const p = m?.getAttribute('data-parent-group'); if (p==='atl') atls+=v; else if(p==='prod') prods+=v; else if(p==='post') posts+=v; });
        const map = { atl: atls, prod: prods, post: posts };
        Object.entries(map).forEach(([k,val])=>{ const cell=document.querySelector(`#templates-preview-host [data-top-total-group="${CSS.escape(k)}"]`); if (cell) cell.textContent=String(val); });
        const g = document.querySelector('#templates-preview-host [data-top-grand]'); if (g) g.textContent = String(gsum);
      }
    } catch(_) {}
  } catch(_) { /* fallback is full recompute via debounce */ }
}

// ===== Persist selected template type (expenses/callsheet/shotlist) =====
const TPL_TYPE_PREF_KEY = 'projects.templates.type';
function readTplPreferredType() {
  try {
    const v = String(localStorage.getItem(TPL_TYPE_PREF_KEY) || '').trim();
    if (!v) return '';
    // Only allow known values
    return (v === 'expenses' || v === 'callsheet' || v === 'shotlist') ? v : '';
  } catch (_) { return ''; }
}
function writeTplPreferredType(type) {
  try { if (type) localStorage.setItem(TPL_TYPE_PREF_KEY, String(type)); } catch (_) {}
}
function restoreTplPreferredTypeIfAny(selectEl) {
  if (!selectEl) return;
  // Prefer URL param if present, else localStorage
  let requested = '';
  try {
    const params = new URLSearchParams(window.location.search || '');
    requested = params.get('tplType') || params.get('templatesType') || '';
  } catch (_) {}
  const stored = readTplPreferredType();
  const preferred = (requested && (requested === 'expenses' || requested === 'callsheet' || requested === 'shotlist'))
    ? requested
    : stored;
  if (!preferred) return;
  const hasOption = Array.from(selectEl.options).some((o) => o.value === preferred);
  if (hasOption) {
    selectEl.value = preferred;
  }
}
function ensureTemplatesZoomUI() {
  const actionsRow = document.getElementById('templates-actions');
  if (!actionsRow || document.getElementById('tpl-zoom-controls')) return;
  const wrap = document.createElement('div');
  wrap.id = 'tpl-zoom-controls';
  wrap.className = 'tpl-zoom-controls';
  wrap.innerHTML = `
    <button type=\"button\" class=\"tpl-zoom-btn\" data-tpl-zoom-out title=\"تصغير\">−</button>
    <span class=\"tpl-zoom-value\" data-tpl-zoom-value>100%</span>
    <button type=\"button\" class=\"tpl-zoom-btn\" data-tpl-zoom-in title=\"تكبير\">+</button>
    <button type=\"button\" class=\"tpl-zoom-btn\" data-tpl-zoom-fit title=\"ملء العرض\">↔︎</button>
    <button type=\"button\" class=\"tpl-zoom-btn\" data-tpl-zoom-reset title=\"1:1\">1:1</button>
  `;
  actionsRow.appendChild(wrap);
  const outBtn = wrap.querySelector('[data-tpl-zoom-out]');
  const inBtn = wrap.querySelector('[data-tpl-zoom-in]');
  const resetBtn = wrap.querySelector('[data-tpl-zoom-reset]');
  const fitBtn = wrap.querySelector('[data-tpl-zoom-fit]');
  TPL_ZOOM_VALUE_EL = wrap.querySelector('[data-tpl-zoom-value]');
  outBtn?.addEventListener('click', () => adjustTemplatesPreviewZoom(-0.1));
  inBtn?.addEventListener('click', () => adjustTemplatesPreviewZoom(0.1));
  resetBtn?.addEventListener('click', () => { TPL_ZOOM_MODE = 'manual'; writeTplZoomModePref(TPL_ZOOM_MODE); setTemplatesPreviewZoom(1, { markManual: true }); });
  fitBtn?.addEventListener('click', () => { TPL_ZOOM_MODE = 'fit'; writeTplZoomModePref(TPL_ZOOM_MODE); applyTemplatesFitZoom(); ensureResizeBinding(); ensureResizeObserver(); });
  TPL_ZOOM_FIT_BTN = fitBtn;
  // initialize
  TPL_ZOOM_MODE = readTplZoomModePref();
  if (TPL_ZOOM_MODE === 'fit') { applyTemplatesFitZoom(); ensureResizeBinding(); ensureResizeObserver(); }
  else { setTemplatesPreviewZoom(readTplZoomPref(), { silent: false }); }
}

// Logo controls UI in the actions row (Art Ratio size + Client URL/size)
function ensureLogoControls(type = 'expenses') {
  const row = document.getElementById('templates-actions');
  if (!row) return;
  // Only show for Call Sheet. Controls go in 2nd row inside container
  const controls = document.getElementById('templates-controls');
  const existing = document.getElementById('tpl-logo-controls');
  const row2 = document.getElementById('tpl-controls-row2') || (() => {
    const r = document.createElement('div');
    r.id = 'tpl-controls-row2';
    Object.assign(r.style, { display: 'flex', flexWrap: 'wrap', gap: '8px', width: '100%', alignItems: 'center', marginTop: '6px' });
    controls?.appendChild(r);
    return r;
  })();
  if (type !== 'callsheet') { if (existing) existing.remove(); return; }
  if (existing) return;
  const box = document.createElement('div');
  box.id = 'tpl-logo-controls';
  Object.assign(box.style, { display: 'inline-flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' });
  box.innerHTML = `
    <div class="input-group" style="display:inline-flex;gap:6px;align-items:center;">
      <label class="form-label" style="margin:0 4px 0 0;">لوغو ارت ريشيو</label>
      <input type="range" id="tpl-logo1-size" min="0.3" max="3" step="0.01" title="حجم لوغو ارت ريشيو">
      <button type="button" class="btn btn-outline" id="tpl-logo1-reset" title="إعادة تموضع لوغو ارت ريشيو">↺</button>
    </div>
    <div class="input-group" style="display:inline-flex;gap:6px;align-items:center;">
      <input type="url" id="tpl-logo2-url" class="form-control" placeholder="🔗 رابط لوغو إضافي" style="min-width:220px;max-width:320px;">
      <input type="range" id="tpl-logo2-size" min="0.3" max="3" step="0.01" title="حجم لوغو العميل">
      <button type="button" class="btn btn-outline" id="tpl-logo2-apply">تطبيق</button>
      <button type="button" class="btn btn-outline" id="tpl-logo2-reset">إعادة تموضع</button>
      <button type="button" class="btn btn-outline btn-danger" id="tpl-logo2-clear">حذف</button>
    </div>
    <div class="input-group" id="tpl-font-controls" style="display:inline-flex;gap:6px;align-items:center;">
      <label class="form-label" style="margin:0 4px 0 0;">حجم الخط</label>
      <button type="button" class="btn btn-outline" id="tpl-font-down" title="تصغير الخط">A−</button>
      <button type="button" class="btn btn-outline" id="tpl-font-up" title="تكبير الخط">A+</button>
    </div>
    <div class="input-group" id="tpl-shade-controls" style="display:inline-flex;gap:6px;align-items:center;">
      <label class="form-label" style="margin:0 4px 0 0;">تظليل</label>
      <input type="color" id="tpl-shade-color" value="#fff59d" title="لون التظليل">
      <input type="range" id="tpl-shade-opacity" min="0" max="100" step="1" value="40" title="الشفافية %">
      <select id="tpl-shade-target" class="form-select" style="height:32px;">
        <option value="cell">خلية</option>
        <option value="row">صف</option>
      </select>
      <button type="button" class="btn btn-outline" id="tpl-shade-apply">تطبيق</button>
      <button type="button" class="btn btn-outline btn-danger" id="tpl-shade-clear">إزالة</button>
    </div>
    <div class="input-group" id="tpl-history-controls" style="display:inline-flex;gap:6px;align-items:center;">
      <button type="button" class="btn btn-outline" id="tpl-undo" title="تراجع">↶</button>
      <button type="button" class="btn btn-outline" id="tpl-redo" title="تقديم">↷</button>
    </div>
  `;
  row2.appendChild(box);

  // Seed values
  try {
    const st2 = readSecondaryLogoState();
    const urlEl = document.getElementById('tpl-logo2-url');
    const szEl2 = document.getElementById('tpl-logo2-size');
    if (urlEl && st2.url) urlEl.value = st2.url;
    if (szEl2) szEl2.value = String(st2.s || 1);
    const st1 = readPrimaryLogoState();
    const szEl1 = document.getElementById('tpl-logo1-size');
    if (szEl1) szEl1.value = String(st1.s || 1);
  } catch(err) { notifyApiError(err, 'تعذر حفظ القالب'); }

  // Bind actions
  document.getElementById('tpl-logo2-apply')?.addEventListener('click', () => {
    const url = document.getElementById('tpl-logo2-url')?.value?.trim() || '';
    writeSecondaryLogoState({ url });
    // Re-render preview to apply
    try { renderTemplatesPreview(); } catch(_) {}
  });
  document.getElementById('tpl-logo2-clear')?.addEventListener('click', () => {
    writeSecondaryLogoState({ url: '', w: 0, x: 0, y: 0 });
    // Update local autosave snapshot/HTML instead of wiping all data (to keep shading etc.)
    try {
      const key = getTemplatesContextKey();
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed) {
          if (parsed.snap && parsed.snap.r) { parsed.snap.r.url = ''; }
          if (parsed.html && typeof parsed.html === 'string') {
            try {
              const tmp = document.createElement('div'); tmp.innerHTML = parsed.html;
              const root = tmp.firstElementChild;
              const img = root && root.querySelector('.cs-logo--right img');
              if (img) { img.removeAttribute('src'); const wrap = img.closest('.cs-logo--right'); if (wrap) wrap.setAttribute('data-empty','1'); }
              parsed.html = root ? root.outerHTML : parsed.html;
            } catch(_) {}
          }
          localStorage.setItem(key, JSON.stringify(parsed));
        }
      }
    } catch(_) {}
    try { pushHistoryDebounced(); saveAutosaveDebounced(); } catch(_) {}
    try { renderTemplatesPreview(); } catch(_) {}
  });
  document.getElementById('tpl-logo2-reset')?.addEventListener('click', () => {
    writeSecondaryLogoState({ x: 0, y: 0 });
    try { renderTemplatesPreview(); } catch(_) {}
  });
  // History controls
  document.getElementById('tpl-undo')?.addEventListener('click', () => undoTemplatesChange());
  document.getElementById('tpl-redo')?.addEventListener('click', () => redoTemplatesChange());

  // Font size controls
  const fontDown = document.getElementById('tpl-font-down');
  const fontUp = document.getElementById('tpl-font-up');
  fontDown?.addEventListener('click', (e) => { try { adjustSelectionFont(e && e.shiftKey ? -2 : -1); } catch (_) {} });
  fontUp?.addEventListener('click', (e) => { try { adjustSelectionFont(e && e.shiftKey ? +2 : +1); } catch (_) {} });

  // Shading controls
  const shadeApply = document.getElementById('tpl-shade-apply');
  const shadeClear = document.getElementById('tpl-shade-clear');
  shadeApply?.addEventListener('click', () => { try { applyShadeFromControls(); } catch (_) {} });
  shadeClear?.addEventListener('click', () => { try { clearShadeFromControls(); } catch (_) {} });
}

// Re-bind drag and size interactions for Call Sheet logos when restoring from saved HTML
function attachCallsheetLogoBehaviors(root) {
  try {
    if (!root) return;
    const rightWrap = root.querySelector('.cs-logo--right');
    const rightImg = rightWrap?.querySelector('img');
    if (rightWrap && rightImg) {
      const readMatrix = () => {
        try {
          const s = String(rightImg.style.transform || '');
          const m = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(s);
          const sm = /scale\(([-\d.]+)\)/.exec(s);
          return { x: Number(m?.[1] || 0) || 0, y: Number(m?.[2] || 0) || 0, s: Number(sm?.[1] || 1) || 1 };
        } catch (_) { return { x: 0, y: 0, s: 1 }; }
      };
      let dragging = false; let sx = 0; let sy = 0; let ox = 0; let oy = 0;
      const onDown = (ev) => { dragging = true; const m = readMatrix(); ox = m.x; oy = m.y; sx = ev.clientX; sy = ev.clientY; try { ev.preventDefault(); } catch(_) {} };
      const onMove = (ev) => { if (!dragging) return; const dx = ev.clientX - sx; const dy = ev.clientY - sy; const nx = Math.round(ox + dx); const ny = Math.round(oy + dy); const s = Math.max(0.3, Math.min(3, Number(readSecondaryLogoState().s || 1))); rightImg.style.transform = `scale(${s}) translate(${nx}px, ${ny}px)`; };
      const onUp = () => { if (!dragging) return; dragging = false; const m = readMatrix(); writeSecondaryLogoState({ x: m.x, y: m.y }); try { pushHistoryDebounced(); saveAutosaveDebounced(); } catch(_) {} markTemplatesEditingActivity(); };
      rightImg.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerup', onUp, { passive: true });
      // Hook size slider
      const sliderR = document.getElementById('tpl-logo2-size');
      if (sliderR) {
        const apply = (s) => {
          const scale = Math.max(0.3, Math.min(3, Number(s || 1)));
          const m = readMatrix();
          try { rightImg.style.transform = `scale(${scale}) translate(${m.x}px, ${m.y}px)`; } catch(_) {}
          writeSecondaryLogoState({ s: scale });
        };
        sliderR.oninput = (e) => { try { apply(e?.target?.value); } catch(_) {} markTemplatesEditingActivity(); };
        sliderR.onchange = () => { try { pushHistoryDebounced(); saveAutosaveDebounced(); } catch(_) {} };
      }
    }
  } catch(_) {}

  try {
    const leftWrap = root.querySelector('.cs-logo--left');
    const leftImg = leftWrap?.querySelector('img');
    if (leftWrap && leftImg) {
      const readMatrix = () => {
        try {
          const s = String(leftImg.style.transform || '');
          const m = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(s);
          const sm = /scale\(([-\d.]+)\)/.exec(s);
          return { x: Number(m?.[1] || 0) || 0, y: Number(m?.[2] || 0) || 0, s: Number(sm?.[1] || 1) || 1 };
        } catch (_) { return { x: 0, y: 0, s: 1 }; }
      };
      let dragging = false; let sx = 0; let sy = 0; let ox = 0; let oy = 0;
      const onDown = (ev) => { dragging = true; const m = readMatrix(); ox = m.x; oy = m.y; sx = ev.clientX; sy = ev.clientY; try { ev.preventDefault(); } catch(_) {} };
      const onMove = (ev) => { if (!dragging) return; const dx = ev.clientX - sx; const dy = ev.clientY - sy; const nx = Math.round(ox + dx); const ny = Math.round(oy + dy); const s = Math.max(0.3, Math.min(3, Number(readPrimaryLogoState().s || 1))); leftImg.style.transform = `scale(${s}) translate(${nx}px, ${ny}px)`; };
      const onUp = () => { if (!dragging) return; dragging = false; const m = readMatrix(); writePrimaryLogoState({ x: m.x, y: m.y }); try { pushHistoryDebounced(); saveAutosaveDebounced(); } catch(_) {} markTemplatesEditingActivity(); };
      leftImg.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerup', onUp, { passive: true });
      // Hook size slider
      const sliderL = document.getElementById('tpl-logo1-size');
      if (sliderL) {
        const apply = (s) => {
          const scale = Math.max(0.3, Math.min(3, Number(s || 1)));
          const m = readMatrix();
          try { leftImg.style.transform = `scale(${scale}) translate(${m.x}px, ${m.y}px)`; } catch(_) {}
          writePrimaryLogoState({ s: scale });
        };
        sliderL.oninput = (e) => { try { apply(e?.target?.value); } catch(_) {} markTemplatesEditingActivity(); };
        sliderL.onchange = () => { try { pushHistoryDebounced(); saveAutosaveDebounced(); } catch(_) {} };
      }
    }
  } catch(_) {}
}

/* moved to ../templates/toolbar.js
// Inline toolbar near focused cell (row ops for schedule, slot ops for cast)
function ensureCellToolbar() {
  const host = document.getElementById('templates-preview-host');
  if (!host) { alert('لا يوجد محتوى للطباعة'); return; }
  const type = document.getElementById('templates-type')?.value || 'expenses';
  let bar = document.getElementById('tpl-cell-toolbar');
  if (type !== 'callsheet') { if (bar) bar.style.display = 'none'; return; }
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'tpl-cell-toolbar';
    Object.assign(bar.style, { position: 'absolute', display: 'none', zIndex: 60 });
    bar.innerHTML = `
      <div style="display:inline-flex;gap:4px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:4px;box-shadow:0 2px 8px rgba(15,23,42,0.12);">
        <button type="button" data-act="row-add" class="btn btn-outline" style="height:28px;padding:0 8px">+ صف</button>
        <button type="button" data-act="row-full" class="btn btn-outline" style="height:28px;padding:0 8px">+ صف كامل</button>
        <button type="button" data-act="row-full-del" class="btn btn-outline btn-danger" style="height:28px;padding:0 8px">× صف كامل</button>
        <button type="button" data-act="row-del" class="btn btn-outline btn-danger" style="height:28px;padding:0 8px">× صف</button>
        <button type="button" data-act="row-up" class="btn btn-outline" style="height:28px;padding:0 8px">↑</button>
        <button type="button" data-act="row-down" class="btn btn-outline" style="height:28px;padding:0 8px">↓</button>
        <span data-sep style="width:1px;background:#e5e7eb;margin:0 4px"></span>
        <button type="button" data-act="cast-add" class="btn btn-outline" style="height:28px;padding:0 8px">+ خانة</button>
        <button type="button" data-act="cast-del" class="btn btn-outline btn-danger" style="height:28px;padding:0 8px">× خانة</button>
        <button type="button" data-act="cast-add-row" class="btn btn-outline" style="height:28px;padding:0 8px">+ صف اسم/وقت</button>
        <button type="button" data-act="cast-del-row" class="btn btn-outline btn-danger" style="height:28px;padding:0 8px">× صف اسم/وقت</button>
      </div>`;
    host.appendChild(bar);
    bar.__lock = false; bar.__switchTimer = null; bar.__freezeUntil = 0;
    bar.addEventListener('pointerenter', () => { bar.__lock = true; });
    bar.addEventListener('pointerleave', () => { bar.__lock = false; });
    // Actions
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const act = btn.getAttribute('data-act');
      const cell = bar.__targetCell || null;
      if (!cell) return;
      // Support both Schedule and Crew tables for row actions
      const sched = cell.closest('table.cs-schedule') || cell.closest('table.cs-crew');
      const cast = cell.closest('table.cs-cast');
      const doRowAdd = () => {
        const tr = cell.closest('tr');
        if (!tr) return;
        const newRow = addRowBelow(tr);
        if (newRow) focusFirstEditableCell(newRow, 0);
      };
      const doRowDel = () => {
        const tr = cell.closest('tr');
        if (!tr) return;
        if (tr.classList.contains('cs-row-note') || tr.classList.contains('cs-row-strong')) return;
        deleteRow(tr);
      };
      const doRowMove = (dir) => { const tr = cell.closest('tr'); if (tr) moveRow(tr, dir); };
      const updateAfter = () => {
        try { markTemplatesEditingActivity(); pushHistoryDebounced(); saveAutosaveDebounced(); } catch(_) {}
        try { setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 30); } catch(_) {}
      };
      const doRowFull = () => {
        const table = sched || cell.closest('table');
        if (!table) return;
        const tr = cell.closest('tr');
        const tbody = tr?.parentElement;
        if (!tr || !tbody) return;
        const ncols = (() => { try { const head = table.querySelector('thead tr'); return (head && head.children && head.children.length) ? head.children.length : 12; } catch(_) { return 12; } })();
        const full = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', String(ncols));
        td.setAttribute('data-editable', 'true');
        td.setAttribute('contenteditable', 'true');
        full.appendChild(td);
        tbody.insertBefore(full, tr.nextElementSibling);
      };
      const castAddSlot = () => {
        const table = cast; if (!table) return;
        const tbody = table.tBodies && table.tBodies[0]; if (!tbody) return;
        const nameRow = tbody.children && tbody.children[1];
        const timeRow = tbody.children && tbody.children[2];
        if (!nameRow || !timeRow) return;
        const nt = document.createElement('td'); nt.setAttribute('data-editable', 'true'); nt.setAttribute('contenteditable', 'true');
        const weather = nameRow.querySelector('.cs-weather');
        if (weather) nameRow.insertBefore(nt, weather); else nameRow.appendChild(nt);
        const tt = document.createElement('td'); tt.setAttribute('data-editable', 'true'); tt.setAttribute('contenteditable', 'true');
        timeRow.appendChild(tt);
        const titleCell = tbody.querySelector('.cs-cast-title');
        if (titleCell) { titleCell.setAttribute('colspan', String(nameRow.children.length)); }
      };
      const castRemoveSlot = () => {
        const table = cast; if (!table) return;
        const tbody = table.tBodies && table.tBodies[0]; if (!tbody) return;
        const nameRow = tbody.children && tbody.children[1];
        const timeRow = tbody.children && tbody.children[2];
        if (!nameRow || !timeRow) return;
        const weather = nameRow.querySelector('.cs-weather');
        const count = nameRow.children.length - (weather ? 1 : 0);
        if (count <= 1) return;
        // remove last regular cell before weather if present, else last child
        const lastName = weather ? weather.previousElementSibling : nameRow.lastElementChild;
        if (lastName && !lastName.classList.contains('cs-weather')) nameRow.removeChild(lastName);
        const lastTime = timeRow.lastElementChild; if (lastTime) timeRow.removeChild(lastTime);
        const titleCell = tbody.querySelector('.cs-cast-title');
        if (titleCell) { titleCell.setAttribute('colspan', String(nameRow.children.length)); }
      };
      const castAddRowPair = () => {
        const table = cast; if (!table) return;
        const tbody = table.tBodies && table.tBodies[0]; if (!tbody) return;
        const firstName = tbody.children && tbody.children[1];
        const firstTime = tbody.children && tbody.children[2];
        if (!firstName || !firstTime) return;
        const weather = firstName.querySelector('.cs-weather');
        const cols = firstName.children.length - (weather ? 1 : 0);
        const nameTr = document.createElement('tr');
        const timeTr = document.createElement('tr');
        for (let i=0;i<cols;i+=1) { const td=document.createElement('td'); td.setAttribute('data-editable','true'); td.setAttribute('contenteditable','true'); nameTr.appendChild(td); }
        for (let i=0;i<cols;i+=1) { const td=document.createElement('td'); td.setAttribute('data-editable','true'); td.setAttribute('contenteditable','true'); timeTr.appendChild(td); }
        tbody.appendChild(nameTr); tbody.appendChild(timeTr);
        if (weather) { const totalRows = tbody.querySelectorAll('tr').length - 1; weather.setAttribute('rowspan', String(totalRows)); }
      };
      const castRemoveRowPair = () => {
        const table = cast; if (!table) return;
        const tbody = table.tBodies && table.tBodies[0]; if (!tbody) return;
        if (tbody.children.length <= 3) return; // title + first pair must remain
        const lastTime = tbody.lastElementChild; const lastName = lastTime?.previousElementSibling;
        if (lastName && lastTime && lastName.tagName === 'TR') { tbody.removeChild(lastTime); tbody.removeChild(lastName); }
        const firstName = tbody.children[1]; const weather = firstName?.querySelector('.cs-weather');
        if (weather) { const totalRows = tbody.querySelectorAll('tr').length - 1; weather.setAttribute('rowspan', String(totalRows)); }
      };
      if (act === 'row-add' && sched) { doRowAdd(); updateAfter(); try { setTimeout(() => paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }), 30); } catch(_) {} }
      else if (act === 'row-full' && sched) { doRowFull(); updateAfter(); try { setTimeout(() => paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }), 30); } catch(_) {} }
      else if (act === 'row-full-del' && sched) {
        const tr = cell.closest('tr');
        const headCols = (() => { try { const head = sched.querySelector('thead tr'); return (head && head.children && head.children.length) ? head.children.length : 12; } catch(_) { return 12; } })();
        const isFull = tr && tr.children && tr.children.length === 1 && Number(tr.children[0]?.getAttribute('colspan') || '1') >= headCols;
        if (isFull) { tr.parentElement?.removeChild(tr); updateAfter(); }
      }
      else if (act === 'row-del' && sched) { doRowDel(); updateAfter(); }
      else if (act === 'row-up' && sched) { doRowMove(-1); updateAfter(); try { setTimeout(() => paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }), 30); } catch(_) {} }
      else if (act === 'row-down' && sched) { doRowMove(+1); updateAfter(); try { setTimeout(() => paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }), 30); } catch(_) {} }
      else if (act === 'cast-add' && cast) { castAddSlot(); updateAfter(); }
      else if (act === 'cast-del' && cast) { castRemoveSlot(); updateAfter(); }
      else if (act === 'cast-add-row' && cast) { castAddRowPair(); updateAfter(); }
      else if (act === 'cast-del-row' && cast) { castRemoveRowPair(); updateAfter(); }
    });
  }

  const place = (cell) => {
    if (!cell) { bar.style.display = 'none'; bar.__targetCell = null; return; }
    const sched = cell.closest('table.cs-schedule') || cell.closest('table.cs-crew');
    const cast = cell.closest('table.cs-cast');
    if (!sched && !cast) { bar.style.display = 'none'; bar.__targetCell = null; return; }
    // Toggle groups
    const showRowTools = !!sched; const showCastTools = !!cast;
    Array.from(bar.querySelectorAll('[data-act^="row-"]')).forEach((b) => b.style.display = showRowTools ? 'inline-flex' : 'none');
    Array.from(bar.querySelectorAll('[data-act^="cast-"]')).forEach((b) => b.style.display = showCastTools ? 'inline-flex' : 'none');
    bar.querySelector('[data-sep]')?.setAttribute('style', `width:1px;background:#e5e7eb;margin:0 4px;display:${(showRowTools && showCastTools)?'inline-block':'none'}`);

    // Only show the "× صف كامل" button when the focused row is a full-width single cell
    try {
      const fullDelBtn = bar.querySelector('[data-act="row-full-del"]');
      if (fullDelBtn && sched) {
        const tr = cell.closest('tr');
        const head = sched.querySelector('thead tr');
        const headCols = (head && head.children && head.children.length) ? head.children.length : 12;
        const isFull = tr && tr.children && tr.children.length === 1 && Number(tr.children[0]?.getAttribute('colspan') || '1') >= headCols;
        fullDelBtn.style.display = (showRowTools && isFull) ? 'inline-flex' : 'none';
      }
    } catch(_) {}

    // Position relative to host
    const hostRect = host.getBoundingClientRect();
    const rc = cell.getBoundingClientRect();
    const top = rc.top - hostRect.top - 32; // above cell
    const left = Math.min(Math.max(0, rc.right - hostRect.left - 160), host.clientWidth - 120);
    bar.style.top = `${Math.max(0, top)}px`;
    bar.style.left = `${left}px`;
    bar.style.display = 'block';
    bar.__targetCell = cell;
    try { bar.__freezeUntil = Date.now() + 350; } catch(_) {}
  };
  const findCell = (evTarget) => { return evTarget && evTarget.closest ? evTarget.closest('td,th') : null; };
  const onHover = (e) => {
    const cell = findCell(e.target);
    if (!cell || bar.__lock) return;
    if (!bar.__targetCell) { place(cell); return; }
    if (cell === bar.__targetCell) return;
    if (Date.now() < (bar.__freezeUntil || 0)) return;
    if (bar.__switchTimer) { clearTimeout(bar.__switchTimer); bar.__switchTimer = null; }
    bar.__switchTimer = setTimeout(() => { if (!bar.__lock) place(cell); }, 160);
  };
  const onFocus = (e) => { const cell = findCell(e.target); if (cell) place(cell); };
  const onOut = (e) => { const to = e.relatedTarget; if (bar.contains(to)) return; const cell = findCell(to); if (!cell) { bar.style.display = 'none'; bar.__targetCell = null; } };
  host.removeEventListener('mousemove', onHover, true);
  host.addEventListener('mousemove', onHover, true);
  host.removeEventListener('focusin', onFocus, true);
  host.addEventListener('focusin', onFocus, true);
  host.removeEventListener('mouseleave', onOut, true);
  host.addEventListener('mouseleave', onOut, true);
  host.addEventListener('scroll', () => { if (bar.__targetCell) place(bar.__targetCell); }, { passive: true });
}
*/

// el is imported from templates/core.js

// Canvas helper: request a 2D context optimized for frequent readbacks
function getCtx2d(canvas) {
  try {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) return ctx;
  } catch (_) {}
  try { return canvas.getContext('2d'); } catch (_) { return null; }
}

// Delegate to core metaCell
// Use metaCell directly from core.js (unified)

function getSelectedProject() {
  const sel = document.getElementById('templates-project');
  const id = sel?.value || '';
  return getProjectsState().find((p) => String(p.id) === String(id)) || null;
}

function getSelectedReservations(projectId) {
  const sel = document.getElementById('templates-reservation');
  if (!sel) return [];
  const value = sel.value || '';
  const all = getReservationsForProjectLocal(projectId);
  if (!value) return all;
  const match = all.find((r) => String(r.id || r.reservationId) === String(value));
  return match ? [match] : [];
}

const COMPANY_INFO = {
  logoUrl: 'https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png',
  companyName: 'شركة فود آرت للدعاية والإعلان (شركة شخص واحد)',
  companyCR: '4030485240',
  companyLicense: '159460'
};

let TEMPLATE_LANG = (typeof localStorage !== 'undefined' && localStorage.getItem('templates.lang')) || 'en';
function setTemplateLang(lang) {
  TEMPLATE_LANG = (lang === 'ar') ? 'ar' : 'en';
  try { localStorage.setItem('templates.lang', TEMPLATE_LANG); } catch (_) {}
}
// Delegate i18n helper to core.L for consistency
// Note: TEMPLATE_LANG still controls dir/labels locally; core.L reads localStorage
// so setTemplateLang() below keeps both in sync.
// eslint-disable-next-line no-shadow
// Using L from core.js directly

// Format numbers with thousand separators and no decimals (preview + export)
function formatIntNoDecimals(value) {
  try {
    const n = Math.round(Number(value) || 0);
    const locale = (TEMPLATE_LANG === 'ar') ? 'ar-SA' : 'en-US';
    return n.toLocaleString(locale, { maximumFractionDigits: 0, minimumFractionDigits: 0, useGrouping: true });
  } catch (_) {
    const n = Math.round(Number(value) || 0);
    return String(n);
  }
}

// Removed temporary preview padding adjustment logic per request

function readHeaderFooterOptions() {
  // Simplified: always use fixed company info and no external header/footer overlay
  return {
    headerFooter: false,
    logoUrl: COMPANY_INFO.logoUrl,
    companyName: COMPANY_INFO.companyName,
    companyCR: COMPANY_INFO.companyCR,
    companyLicense: COMPANY_INFO.companyLicense
  };
}

 



 

 

// ===== Secondary logo state (persisted in localStorage) =====
function readSecondaryLogoState() {
  try {
    return {
      url: localStorage.getItem('templates.callsheet.logo2.url') || '',
      s: Number(localStorage.getItem('templates.callsheet.logo2.s') || '1') || 1,
      x: Number(localStorage.getItem('templates.callsheet.logo2.x') || '0') || 0,
      y: Number(localStorage.getItem('templates.callsheet.logo2.y') || '0') || 0,
    };
  } catch(_) { return { url: '', w: 0, x: 0, y: 0 }; }
}
function writeSecondaryLogoState(patch = {}) {
  try {
    const cur = readSecondaryLogoState();
    const nx = { ...cur, ...patch };
    if (typeof nx.url === 'string') localStorage.setItem('templates.callsheet.logo2.url', nx.url);
    if (Number.isFinite(nx.s)) localStorage.setItem('templates.callsheet.logo2.s', String(nx.s));
    if (Number.isFinite(nx.x)) localStorage.setItem('templates.callsheet.logo2.x', String(nx.x));
    if (Number.isFinite(nx.y)) localStorage.setItem('templates.callsheet.logo2.y', String(nx.y));
  } catch(_) {}
}

function enableSecondaryLogoInteractions(wrap, img) {
  if (!wrap || !img) return;
  // Drag to move (translate) within the logo cell
  let dragging = false; let sx = 0; let sy = 0; let ox = 0; let oy = 0;
  const readMatrix = () => {
    try {
      const st = getComputedStyle(img).transform;
      if (!st || st === 'none') return { x: 0, y: 0 };
      const m = new DOMMatrix(st); return { x: m.m41 || 0, y: m.m42 || 0 };
    } catch(_) { return { x: 0, y: 0 }; }
  };
  const onDown = (ev) => {
    dragging = true; wrap.setAttribute('data-empty', '0');
    const m = readMatrix(); ox = m.x; oy = m.y; sx = ev.clientX; sy = ev.clientY;
    ev.preventDefault();
  };
  const onMove = (ev) => {
    if (!dragging) return; const dx = ev.clientX - sx; const dy = ev.clientY - sy;
    const nx = Math.round(ox + dx); const ny = Math.round(oy + dy);
    const s = Math.max(0.3, Math.min(3, Number(readSecondaryLogoState().s || 1)));
    img.style.transform = `scale(${s}) translate(${nx}px, ${ny}px)`;
  };
  const onUp = () => {
    if (!dragging) return; dragging = false; const m = readMatrix(); writeSecondaryLogoState({ x: m.x, y: m.y });
    try { pushHistoryDebounced(); saveAutosaveDebounced(); } catch(_) {}
    markTemplatesEditingActivity();
  };
  img.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });

  // Listen to size slider (if present)
  try {
    const slider = document.getElementById('tpl-logo2-size');
    if (slider) {
      const apply = (v) => { const s = Math.max(0.3, Math.min(3, Number(v)||1)); const m = readMatrix(); img.style.transform = `scale(${s}) translate(${m.x}px, ${m.y}px)`; writeSecondaryLogoState({ s }); };
      slider.addEventListener('input', (e) => { apply(e.target.value); markTemplatesEditingActivity(); });
      slider.addEventListener('change', () => { try { pushHistoryDebounced(); saveAutosaveDebounced(); } catch(_) {} });
      const st = readSecondaryLogoState(); slider.value = String(st.s || 1); apply(slider.value);
    }
  } catch(_) {}
}

// ===== Primary (Art Ratio) logo: size + drag, persisted =====
function readPrimaryLogoState() {
  try {
    return {
      s: Number(localStorage.getItem('templates.callsheet.logo1.s') || '1') || 1,
      x: Number(localStorage.getItem('templates.callsheet.logo1.x') || '0') || 0,
      y: Number(localStorage.getItem('templates.callsheet.logo1.y') || '0') || 0,
    };
  } catch(_) { return { s: 1, x: 0, y: 0 }; }
}
function writePrimaryLogoState(patch = {}) {
  try {
    const cur = readPrimaryLogoState();
    const nx = { ...cur, ...patch };
    if (Number.isFinite(nx.s)) localStorage.setItem('templates.callsheet.logo1.s', String(nx.s));
    if (Number.isFinite(nx.x)) localStorage.setItem('templates.callsheet.logo1.x', String(nx.x));
    if (Number.isFinite(nx.y)) localStorage.setItem('templates.callsheet.logo1.y', String(nx.y));
  } catch(_) {}
}
function enablePrimaryLogoInteractions(wrap, img) {
  if (!wrap || !img) return;
  let dragging = false; let sx = 0; let sy = 0; let ox = 0; let oy = 0;
  const readMatrix = () => {
    try { const st = getComputedStyle(img).transform; if (!st || st === 'none') return { x: 0, y: 0 }; const m = new DOMMatrix(st); return { x: m.m41 || 0, y: m.m42 || 0 }; } catch(_) { return { x: 0, y: 0 }; }
  };
  const onDown = (ev) => { dragging = true; const m = readMatrix(); ox = m.x; oy = m.y; sx = ev.clientX; sy = ev.clientY; ev.preventDefault(); };
  const onMove = (ev) => { if (!dragging) return; const dx = ev.clientX - sx; const dy = ev.clientY - sy; const nx = Math.round(ox + dx); const ny = Math.round(oy + dy); const s = Math.max(0.3, Math.min(3, Number(readPrimaryLogoState().s || 1))); img.style.transform = `scale(${s}) translate(${nx}px, ${ny}px)`; };
  const onUp = () => {
    if (!dragging) return; dragging = false; const m = readMatrix();
    writePrimaryLogoState({ x: m.x, y: m.y });
    try { pushHistoryDebounced(); saveAutosaveDebounced(); } catch(_) {}
    markTemplatesEditingActivity();
  };
  img.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });
  // Bind size slider
  try {
    const slider = document.getElementById('tpl-logo1-size');
    if (slider) {
      const apply = (v) => { const s = Math.max(0.3, Math.min(3, Number(v)||1)); const m = readMatrix(); img.style.transform = `scale(${s}) translate(${m.x}px, ${m.y}px)`; writePrimaryLogoState({ s }); };
      slider.addEventListener('input', (e) => { apply(e.target.value); markTemplatesEditingActivity(); });
      slider.addEventListener('change', () => { try { pushHistoryDebounced(); saveAutosaveDebounced(); } catch(_) {} });
      const st = readPrimaryLogoState(); slider.value = String(st.s || 1); apply(slider.value);
    }
    document.getElementById('tpl-logo1-reset')?.addEventListener('click', () => { const s = (readPrimaryLogoState().s||1); writePrimaryLogoState({ x: 0, y: 0 }); try { img.style.transform = `scale(${s}) translate(0px, 0px)`; } catch(_) {} });
  } catch(_) {}
}

// ===== Simple undo/redo for Templates preview =====
let TPL_EDITING = false;
let TPL_EDITING_TIMER = null;
let TPL_AUTOSAVE_TIMER = null;
let TPL_REMOTE_AUTOSAVE_TIMER = null;

function markTemplatesEditingActivity() {
  TPL_EDITING = true;
  clearTimeout(TPL_EDITING_TIMER);
  // Consider user idle if no edits for 1200ms
  TPL_EDITING_TIMER = setTimeout(() => {
    TPL_EDITING = false;
    // Autosave to backend when user becomes idle — no automatic repopulate to avoid flicker
    try { autosaveToServerDebounced(); } catch(_) {}
  }, 1200);
}

// Adjust font size for current selection or current editable cell
function adjustSelectionFont(deltaPx = 0) {
  try {
    const root = document.getElementById('templates-a4-root');
    if (!root || !Number.isFinite(deltaPx) || deltaPx === 0) return;
    const sel = window.getSelection();

    // Find nearest editable container for anchor/caret
    const nearestEditable = () => {
      let node = (sel && sel.anchorNode) || document.activeElement;
      if (!node) return null;
      if (node.nodeType === 3) node = node.parentElement; // text -> element
      let el = (node instanceof Element) ? node : null;
      while (el && el !== document.body) {
        if (el.hasAttribute && el.hasAttribute('contenteditable')) return el;
        el = el.parentElement;
      }
      return null;
    };

    const target = nearestEditable();
    if (!target) return;

    // Current base size from target
    const base = Number.parseFloat(getComputedStyle(target).fontSize || '11') || 11;
    const clamp = (v) => Math.max(7, Math.min(20, v));
    const next = clamp(base + deltaPx);

    const applyToEditable = (el) => {
      try { el.style.fontSize = next + 'px'; } catch (_) {}
    };

    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      const range = sel.getRangeAt(0);
      // Ensure selection is inside the same editable container
      if (target.contains(range.commonAncestorContainer)) {
        try {
          const span = document.createElement('span');
          span.style.fontSize = next + 'px';
          const frag = range.extractContents();
          span.appendChild(frag);
          range.insertNode(span);
          // Move caret after the inserted span
          sel.removeAllRanges();
          const nr = document.createRange();
          nr.setStartAfter(span);
          nr.setEndAfter(span);
          sel.addRange(nr);
        } catch (_) {
          // Fallback to whole cell
          applyToEditable(target);
        }
      } else {
        applyToEditable(target);
      }
    } else {
      // No selection: apply to entire editable cell
      applyToEditable(target);
    }

    try { pushHistoryDebounced(); saveAutosaveDebounced(); } catch (_) {}
    markTemplatesEditingActivity();
  } catch (_) {}
}

// ===== Cell shading helpers =====
function hexToRgb(hex) {
  try {
    let h = (hex || '').trim();
    if (h.startsWith('#')) h = h.slice(1);
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const num = parseInt(h, 16);
    const r = (num >> 16) & 255; const g = (num >> 8) & 255; const b = num & 255;
    return { r, g, b };
  } catch (_) { return { r: 255, g: 255, b: 0 }; }
}
function nearestCellInCallsheet() {
  try {
    const root = document.getElementById('templates-a4-root');
    if (!root) return null;
    const sel = window.getSelection();
    let node = (sel && sel.anchorNode) || document.activeElement;
    if (!node) return null;
    if (node.nodeType === 3) node = node.parentElement;
    let el = (node instanceof Element) ? node : null;
    while (el && el !== document.body) {
      if ((el.tagName === 'TD' || el.tagName === 'TH') && root.contains(el)) return el;
      el = el.parentElement;
    }
    return null;
  } catch (_) { return null; }
}
function applyShadeToCell(cell, rgba) {
  if (!cell) return;
  try {
    cell.setAttribute('data-shaded', '1');
    cell.style.setProperty('--shade', rgba);
    cell.style.setProperty('background', 'var(--shade)', 'important');
    cell.style.setProperty('background-color', 'var(--shade)', 'important');
  } catch (_) {}
}
function clearShadeOnCell(cell) {
  if (!cell) return;
  try {
    cell.removeAttribute('data-shaded');
    cell.style.removeProperty('--shade');
    cell.style.removeProperty('background');
    cell.style.removeProperty('background-color');
  } catch (_) {}
}
function applyShadeFromControls() {
  const colorEl = document.getElementById('tpl-shade-color');
  const opacityEl = document.getElementById('tpl-shade-opacity');
  const targetEl = document.getElementById('tpl-shade-target');
  const { r, g, b } = hexToRgb(colorEl?.value || '#fff59d');
  const a = Math.max(0, Math.min(100, Number(opacityEl?.value || 40))) / 100;
  const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
  const cell = nearestCellInCallsheet();
  if (!cell) return;
  const target = (targetEl?.value || 'cell');
  if (target === 'row') {
    const tr = cell.closest('tr');
    if (!tr) { applyShadeToCell(cell, rgba); } else {
      Array.from(tr.children).forEach((c) => applyShadeToCell(c, rgba));
    }
  } else {
    applyShadeToCell(cell, rgba);
  }
  try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch (_) {}
}
function clearShadeFromControls() {
  const cell = nearestCellInCallsheet();
  if (!cell) return;
  const targetEl = document.getElementById('tpl-shade-target');
  const target = (targetEl?.value || 'cell');
  if (target === 'row') {
    const tr = cell.closest('tr');
    if (!tr) { clearShadeOnCell(cell); } else { Array.from(tr.children).forEach((c) => clearShadeOnCell(c)); }
  } else { clearShadeOnCell(cell); }
  try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch (_) {}
}

function getTemplatesContextKey() {
  try {
    const project = getSelectedProject();
    const typeSel = document.getElementById('templates-type');
    const type = typeSel ? typeSel.value : 'expenses';
    const reservationSel = document.getElementById('templates-reservation');
    const reservationId = reservationSel && reservationSel.value ? String(reservationSel.value) : 'all';
    const pid = project?.id != null ? String(project.id) : 'no-project';
    return `templates.callsheet.autosave.${pid}.${type}.${reservationId}`;
  } catch(_) { return 'templates.callsheet.autosave'; }
}

function saveTemplatesAutosaveToStorage() {
  try {
    const snap = getTemplatesSnapshot();
    if (!snap) return;
    // Also persist full HTML of the current template root so structural changes
    // (added/removed rows/cells) are preserved across refresh, especially for Call Sheet
    let html = '';
    try {
      const root = document.getElementById('templates-a4-root');
      if (root) html = root.outerHTML;
    } catch(_) {}
    const payload = { v: 1, ts: Date.now(), snap, html };
    localStorage.setItem(getTemplatesContextKey(), JSON.stringify(payload));
  } catch(_) {}
}
function saveAutosaveDebounced() {
  clearTimeout(TPL_AUTOSAVE_TIMER); TPL_AUTOSAVE_TIMER = setTimeout(saveTemplatesAutosaveToStorage, 250);
}
function restoreTemplatesAutosaveIfPresent() {
  try {
    const raw = localStorage.getItem(getTemplatesContextKey());
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const host = document.getElementById('templates-preview-host');
    // If we have a full HTML snapshot, prefer restoring it to preserve structure
    if (parsed && parsed.html && host) {
      try {
        host.innerHTML = '';
        const wrap = document.createElement('div');
        wrap.innerHTML = parsed.html;
        const root = wrap.firstElementChild;
        if (root) host.appendChild(root);
        // Re-apply transforms/shading/text if available to keep in sync with logo state
        if (parsed.snap) applyTemplatesSnapshotInPlace(parsed.snap);
        // Recreate the inline toolbar if it was cleared
        try {
          ensureCellToolbarExt({
            onAfterChange: () => {
              try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch (_) {}
              try { setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 30); } catch(_) {}
            },
          });
        } catch(_) {}
        // Re-bind logo gestures so drag/size continues to work after restore
        try { attachCallsheetLogoBehaviors(root); } catch(_) {}
        // If Crew table is missing in restored HTML (older autosave), inject it
        try { ensureCrewTableExists(); } catch(_) {}
        // Re-apply the current zoom to the new root
        try { applyTemplatesPreviewZoom(TPL_PREVIEW_ZOOM); } catch(_) {}
      } catch(_) {
        // Fallback to in-place snapshot application
        if (parsed && parsed.snap) applyTemplatesSnapshotInPlace(parsed.snap);
      }
      // Seed history with restored state so undo works from there
      try { if (parsed.snap) pushTemplatesHistory(); } catch(_) {}
      return;
    }
    // Legacy path: only edits/shading/logos snapshot available
    if (parsed && parsed.snap) {
      applyTemplatesSnapshotInPlace(parsed.snap);
      try { pushTemplatesHistory(); } catch(_) {}
    }
  } catch(_) {}
}

function getTemplatesSnapshot() {
  const root = document.getElementById('templates-a4-root');
  if (!root) return null;
  const edits = Array.from(root.querySelectorAll('[data-editable="true"]')).map((el) => el.innerHTML);
  const sh = snapshotShading(root);
  return { edits, l: readPrimaryLogoState(), r: readSecondaryLogoState(), sh };
}
function applyTemplatesSnapshotInPlace(snap) {
  if (!snap) return;
  const root = document.getElementById('templates-a4-root');
  if (!root) return;
  // Apply editable content in order
  try {
    const nodes = Array.from(root.querySelectorAll('[data-editable="true"]'));
    nodes.forEach((el, i) => { if (i < snap.edits.length) el.innerHTML = snap.edits[i]; });
  } catch(_) {}
  // Apply logo transforms directly on current DOM without re-render
  try {
    writePrimaryLogoState(snap.l || {});
    const left = root.querySelector('.cs-logo--left img');
    if (left && snap.l) {
      const s = Math.max(0.3, Math.min(3, Number(snap.l.s || 1)));
      const x = Number(snap.l.x || 0) || 0; const y = Number(snap.l.y || 0) || 0;
      left.style.transform = `scale(${s}) translate(${x}px, ${y}px)`;
    }
  } catch(_) {}
  try {
    writeSecondaryLogoState(snap.r || {});
    const right = root.querySelector('.cs-logo--right img');
    if (right && snap.r) {
      if (snap.r.url) { try { right.setAttribute('src', snap.r.url); } catch(_) {} }
      else { try { right.removeAttribute('src'); right.closest('.cs-logo--right')?.setAttribute('data-empty','1'); } catch(_) {} }
      const s2 = Math.max(0.3, Math.min(3, Number(snap.r.s || 1)));
      const x2 = Number(snap.r.x || 0) || 0; const y2 = Number(snap.r.y || 0) || 0;
      right.style.transform = `scale(${s2}) translate(${x2}px, ${y2}px)`;
    }
  } catch(_) {}
  // Apply shading marks
  try { if (snap.sh) applyShadingSnapshot(root, snap.sh); } catch(_) {}
}
function applyTemplatesSnapshot(snap) {
  if (!snap) return;
  const host = document.getElementById('templates-preview-host');
  if (!host) return;
  try {
    writePrimaryLogoState(snap.l || {});
    writeSecondaryLogoState(snap.r || {});
    // Apply content edits in order
    const root = document.getElementById('templates-a4-root');
    if (root && Array.isArray(snap.edits)) {
      const nodes = Array.from(root.querySelectorAll('[data-editable="true"]'));
      nodes.forEach((el, i) => { if (i < snap.edits.length) el.innerHTML = snap.edits[i]; });
    }
  } finally {
    // Re-render to reflect logo states
    try { renderTemplatesPreview(); } catch(_) {}
  }
}

// ===== Backend autosave (persist full HTML per project/type/reservation) =====
function readRemoteAutosaveId() {
  try {
    const key = `remoteAutosaveId:${getTemplatesContextKey()}`;
    const v = localStorage.getItem(key);
    return v ? Number(v) : null;
  } catch(_) { return null; }
}
function writeRemoteAutosaveId(id) {
  try { const key = `remoteAutosaveId:${getTemplatesContextKey()}`; if (id) localStorage.setItem(key, String(id)); } catch(_) {}
}
function sanitizeHtmlForExport(html) {
  try {
    const tmp = document.createElement('div');
    tmp.innerHTML = String(html || '');
    // Remove script tags entirely
    tmp.querySelectorAll('script').forEach((s) => s.parentElement?.removeChild(s));
    // Remove inline event handlers (on*) but keep style attributes (needed for transforms)
    Array.from(tmp.querySelectorAll('*')).forEach((el) => {
      try {
        const attrs = Array.from(el.attributes || []);
        attrs.forEach((a) => {
          if (/^on/i.test(a.name)) el.removeAttribute(a.name);
        });
      } catch (_) {}
    });
    return tmp.innerHTML;
  } catch (_) { return html; }
}
async function ensureRemoteAutosaveId() {
  let id = readRemoteAutosaveId();
  if (id) return id;
  const items = await fetchSavedTemplatesForCurrent();
  const draft = (items || []).find((it) => {
    const t = String(it?.title || '').toLowerCase();
    return t.includes('autosave') || t.includes('draft') || t.includes('مسودة');
  });
  if (draft && draft.id) { writeRemoteAutosaveId(draft.id); return draft.id; }
  // Create once
  const project = getSelectedProject();
  if (!project) return null;
  const typeSel = document.getElementById('templates-type');
  const type = typeSel ? typeSel.value : 'expenses';
  const reservationSel = document.getElementById('templates-reservation');
  const reservationId = reservationSel && reservationSel.value ? Number(reservationSel.value) : null;
  const host = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!host) return null;
  const payload = { html: sanitizeHtmlForExport(host.outerHTML) };
  try {
    await apiRequest('/project-templates/', {
      method: 'POST',
      body: {
        project_id: Number(project.id),
        reservation_id: reservationId,
        type,
        title: `Autosave - ${type}`,
        data: payload,
      },
    });
    const after = await fetchSavedTemplatesForCurrent();
    const created = (after || []).find((it) => String(it?.title || '').toLowerCase().includes(`autosave`));
    if (created && created.id) { writeRemoteAutosaveId(created.id); return created.id; }
  } catch(_) {}
  return null;
}
async function autosaveTemplateToServer() {
  const host = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!host) return;
  const id = await ensureRemoteAutosaveId();
  if (!id) return;
  const payload = { html: sanitizeHtmlForExport(host.outerHTML) };
  try { await apiRequest(`/project-templates/?id=${encodeURIComponent(id)}`, { method: 'PATCH', body: { data: payload } }); } catch(err) { notifyApiError(err, 'تعذر الحفظ التلقائي'); }
}
function autosaveToServerDebounced() {
  clearTimeout(TPL_REMOTE_AUTOSAVE_TIMER);
  TPL_REMOTE_AUTOSAVE_TIMER = setTimeout(() => { void autosaveTemplateToServer(); }, 800);
}

// Snapshot/restore shading by table,row,cell indices for Call Sheet
// History wiring provided by templates/history.js

 

function renderTemplatesPreview() {
  const host = document.getElementById('templates-preview-host');
  if (!host) return;
  const project = getSelectedProject();
  const oldRoot = host.querySelector('#templates-a4-root');
  if (!project) {
    host.innerHTML = '';
    const msg = el('div', { class: 'text-muted', text: t('projects.templates.empty', 'اختر مشروعاً لبدء إنشاء القوالب.') });
    host.appendChild(msg);
    return;
  }
  const reservations = getSelectedReservations(project.id);
  const type = document.getElementById('templates-type')?.value || 'expenses';
  const hf = readHeaderFooterOptions();
  ensureLogoControls(type);
  let pageRoot = null;
  if (type === 'callsheet') pageRoot = buildCallSheetPageExt(project, reservations, hf);
  else if (type === 'shotlist') pageRoot = buildShotListPageExt(project, reservations, hf);
  else pageRoot = buildExpensesPageExt(project, reservations, hf);
  // Diff-like replace to avoid losing event handlers on host
  const newRoot = pageRoot;
  if (oldRoot && newRoot && oldRoot.tagName === newRoot.tagName) {
    const oldPages = oldRoot.querySelector('[data-a4-pages]');
    const newPages = newRoot.querySelector('[data-a4-pages]');
    if (oldPages && newPages) {
      try { oldPages.replaceWith(newPages); } catch (_) { oldRoot.innerHTML = newRoot.innerHTML; }
    } else {
      oldRoot.innerHTML = newRoot.innerHTML;
    }
    pageRoot = oldRoot;
  } else {
    host.innerHTML = '';
    host.appendChild(newRoot);
    pageRoot = newRoot;
  }
  // Bind history listeners and seed snapshot
  try { setupTemplatesHistory(pageRoot, type); } catch(_) {}
  try {
    ensureCellToolbarExt({
      onAfterChange: () => {
        try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch (_) {}
        try { setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 30); } catch(_) {}
      },
    });
  } catch(_) {}
  // Keep schedule header tidy and centered within cells
  try { shrinkScheduleHeaderLabelsExt(); } catch(_) {}
  // Ensure Crew table exists even if an old autosave overwrote DOM
  try { if (type === 'callsheet') ensureCrewTableExists(); } catch(_) {}
  // Normalize editable cells markup for robust caret behavior: wrap inner contenteditable DIV inside TD
  try { ensureEditableWrappers(); } catch(_) {}
  // Try to restore user's autosaved draft (if any) without re-rendering
  try { if (type === 'callsheet') restoreTemplatesAutosaveIfPresent(); } catch(_) {}
  try { ensureEditableWrappers(); } catch(_) {}
  // If لا يوجد Autosave محلي (هاتف/متصفح آخر)، حاول تحميل المسودة المخزنة في الخادم تلقائياً
  try {
    if (type === 'callsheet') {
      const ls = localStorage.getItem(getTemplatesContextKey());
      if (!ls) {
        (async () => {
          try {
            const id = readRemoteAutosaveId();
            if (id) {
              await loadSnapshotById(id);
              try { ensureCellToolbarExt({ onAfterChange: () => { try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch(_) {} } }); } catch(_) {}
            } else {
              const items = await fetchSavedTemplatesForCurrent();
              const draft = (items || []).find((it) => String(it?.title || '').toLowerCase().includes('autosave') || String(it?.title || '').toLowerCase().includes('draft') || String(it?.title || '').includes('مسودة'));
              if (draft && draft.id) {
                writeRemoteAutosaveId(draft.id);
                await loadSnapshotById(draft.id);
                try { ensureCellToolbarExt({ onAfterChange: () => { try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch(_) {} } }); } catch(_) {}
              }
            }
          } catch(_) {}
        })();
      }
    }
  } catch(_) {}
  // Ensure technicians are loaded, then auto-fill crew if table is empty
  try {
    if (type === 'callsheet') {
      const selectedRes = getSelectedReservations(project.id)?.[0] || null;
      const fill = () => populateCrewFromReservationIfEmptyExt(selectedRes);
      if (!getTechniciansState()?.length) {
        refreshTechniciansFromApi().then(fill).catch(() => fill());
      } else {
        fill();
      }
    }
  } catch (_) {}
  // If crew table is still mostly empty, auto-fill from selected reservation
  try { if (type === 'callsheet') populateCrewFromReservationIfEmptyExt(getSelectedReservations(project.id)?.[0] || null); } catch(_) {}
  // Prune pages with no visible content (avoid phantom pages)
  try { Array.from(pageRoot.querySelectorAll('.a4-page')).forEach((pg) => { if (!pageHasMeaningfulContent(pg)) pg.parentElement?.removeChild(pg); }); } catch (_) {}
  try { renumberExpenseCodes(); } catch (_) {}
  // Update computed totals where applicable
  recomputeExpensesSubtotals();
  try { autoPaginateTemplatesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl }); } catch (_) {}
  try { paginateExpDetailsTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl }); } catch (_) {}
  // Prune again after pagination
  try { Array.from(pageRoot.querySelectorAll('.a4-page')).forEach((pg) => { if (!pageHasMeaningfulContent(pg)) pg.parentElement?.removeChild(pg); }); } catch (_) {}
  try { renumberExpenseCodes(); } catch (_) {}
  try { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); } catch (_) {}
  // After pagination for callsheet, re-apply only shading from autosave so page-2 retains highlights
  try {
    if (type === 'callsheet') {
      const raw = localStorage.getItem(getTemplatesContextKey());
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.snap && parsed.snap.sh) {
          const root = document.getElementById('templates-a4-root');
          if (root) applyShadingSnapshot(root, parsed.snap.sh);
        }
      }
    }
  } catch (_) {}
  try { ensurePdfTunerUI(); } catch (_) {}
  try { if (type === 'callsheet' && localStorage.getItem('templates.debugOverlay') === '1') showTemplatesDebugOverlay(pageRoot, getSelectedReservations(project.id)?.[0] || null); } catch(_) {}

  // Debug toggle utility for quiet consoles in production
  function isTemplatesDebugEnabled() {
    try {
      const params = new URLSearchParams(window.location.search || '');
      if (params.get('debugTemplates') === '1') return true;
      const ls = window.localStorage?.getItem('__DEBUG_TEMPLATES__');
      if (ls && ['1','true','on','yes'].includes(String(ls).toLowerCase())) return true;
    } catch (_) { /* ignore */ }
    return false;
  }
  // Apply saved zoom after render
  try {
    // Re-sync zoom mode from storage each render to keep it sticky
    TPL_ZOOM_MODE = readTplZoomModePref();
    if (TPL_ZOOM_MODE === 'fit') {
      applyTemplatesFitZoom();
    } else {
      const saved = readTplZoomPref();
      TPL_PREVIEW_ZOOM = saved;
      setTemplatesPreviewZoom(saved, { silent: true });
    }
    if (TPL_ZOOM_VALUE_EL) TPL_ZOOM_VALUE_EL.textContent = `${Math.round(TPL_PREVIEW_ZOOM * 100)}%`;
  } catch (_) {}
}

function ensureEditableWrappers() {
  const root = document.getElementById('templates-a4-root');
  if (!root) return;
  const tds = Array.from(root.querySelectorAll('table.exp-details td'));
  tds.forEach((td, idx) => {
    try {
      const isEditable = td.getAttribute('data-editable') === 'true' || td.getAttribute('contenteditable') === 'true';
      // Totals column: keep non-editable
      const isLast = td === td.parentElement?.lastElementChild;
      if (isLast) { td.removeAttribute('contenteditable'); td.removeAttribute('data-editable'); return; }
      if (!isEditable) return;
      // If td itself is contenteditable, move that to inner DIV once
      if (td.isContentEditable || td.getAttribute('contenteditable') === 'true') {
        td.removeAttribute('contenteditable');
      }
      const hasInner = td.querySelector('[contenteditable="true"]');
      if (!hasInner) {
        const inner = document.createElement('div');
        inner.setAttribute('contenteditable', 'true');
        inner.setAttribute('data-editable', 'true');
        inner.setAttribute('autocapitalize', 'off');
        inner.setAttribute('autocorrect', 'off');
        inner.setAttribute('autocomplete', 'off');
        inner.setAttribute('spellcheck', 'false');
        inner.textContent = td.textContent || '';
        td.textContent = '';
        td.appendChild(inner);
      }
    } catch(_) {}
  });
}

async function printTemplatesPdf() {
  const host = document.querySelector('#templates-preview-host > #templates-a4-root');
  if (!host) { alert('لا يوجد محتوى للطباعة'); return; }
  const type = document.getElementById('templates-type')?.value || 'expenses';
  // Resolve orientation per template with optional preference override
  const resolveOrientationForType = (tpl) => {
    try {
      const key = `templatesPdf.orientation.${tpl}`;
      const v = readPdfPref(key, '');
      if (v === 'portrait' || v === 'landscape') return v;
    } catch (_) {}
    const DEFAULTS = { expenses: 'portrait', callsheet: 'landscape', shotlist: 'portrait' };
    return DEFAULTS[tpl] || 'landscape';
  };
  const orientation = resolveOrientationForType(type);
  // Route through template printers
  if (type === 'callsheet') {
    try { await (await import('../templates/print.js')).printCallsheetFromHost(host); } catch (_) { alert('تعذر إنشاء PDF'); }
    return;
  } else {
    try {
      const { printGenericTemplate } = await import('../templates/print.js');
      await printGenericTemplate(host, { orientation, filename: `template-${type}.pdf` });
    } catch (_) { alert('تعذر إنشاء PDF'); }
    return;
  }
  // Use shared pageHasMeaningfulContent from templates/pageUtils.js
  // Default to strict 1:1 export so the PDF matches preview exactly (no cropping/offsets)
  const strictWysiwyg = (() => { try { return (readPdfString('templatesPdf.wysiwyg','1') ?? '1') !== '0'; } catch(_) { return true; } })();
  let html2pdf = null;
  try { html2pdf = await ensureHtml2Pdf(); } catch (_) { html2pdf = null; }

  // Dimensions for A4 at CSS 96dpi
  const A4_W_PX = landscape ? 1123 : 794;
  const A4_H_PX = landscape ? 794 : 1123;
  const A4_W_MM = landscape ? 297 : 210;
  const A4_H_MM = landscape ? 210 : 297;

  const JsPdfCtor = (window.jspdf && window.jspdf.jsPDF) || (window.jsPDF && window.jsPDF.jsPDF);
  const h2c = window.html2canvas;
  const preferFallback = (type === 'callsheet');
  if (preferFallback || !(typeof JsPdfCtor === 'function' && typeof h2c === 'function')) {
    // Fallback through html2pdf: render from an isolated "export" scope
    // to avoid preview gaps/margins pushing content down.
    const wrap = document.createElement('div');
    Object.assign(wrap.style, { position: 'fixed', top: '0', left: '-12000px', pointerEvents: 'none', zIndex: '-1', backgroundColor: '#ffffff' });
    const scope = document.createElement('div');
    scope.id = 'templates-a4-root';
    scope.setAttribute('data-render-context', 'export');
    scope.setAttribute('dir', host.getAttribute('dir') || document.documentElement.getAttribute('dir') || 'rtl');
    // Clone current preview content into the isolated export scope
    const pagesWrap = document.createElement('div');
    pagesWrap.setAttribute('data-a4-pages', '');
    const clone = host.querySelector('[data-a4-pages]')?.cloneNode(true) || host.cloneNode(true);
    pagesWrap.innerHTML = '';
    if (clone.classList && clone.hasAttribute('data-a4-pages')) {
      // If we cloned the pages container, use it directly
      scope.appendChild(clone);
    } else {
      // Otherwise append pages into a fresh container
      Array.from(host.children).forEach((c) => pagesWrap.appendChild(c.cloneNode(true)));
      scope.appendChild(pagesWrap);
    }
    wrap.appendChild(scope);
    document.body.appendChild(wrap);

    try {
      // Trim trailing blank rows in export clone to avoid blank pages
      try {
        Array.from(scope.querySelectorAll('table.cs-schedule')).forEach((t) => trimTrailingEmptyRowsExt(t, 4));
        Array.from(scope.querySelectorAll('table.cs-crew')).forEach((t) => trimTrailingEmptyRowsExt(t, 2));
      } catch (_) {}
      // Force إزالة أي حشو علوي داخل صفحات التصدير
      try { scope.querySelectorAll('.a4-inner').forEach((el) => { el.style.paddingTop = '0mm'; }); } catch(_) {}
      // تطبيق الإزاحة اليدوية في مسار html2pdf دائماً (حتى في الوضع الصارم)
      try {
        const scalePct = Number(readPdfPref('templatesPdf.scalePct', 100)) || 100;
        // Collect pages, prune blanks, and cap to first 5 for expenses
        let pages = Array.from(scope.querySelectorAll('.a4-page'));
        pages = pages.filter((pg) => pageHasMeaningfulContent(pg));
        if ((type === 'expenses') && pages.length > 5) {
          const keep = new Set(pages.slice(0, 5));
          Array.from(scope.querySelectorAll('.a4-page')).forEach((pg) => {
            if (!keep.has(pg)) { try { pg.parentElement.removeChild(pg); } catch(_) {}
            }
          });
          pages = Array.from(keep);
        } else {
          // Remove pages without meaningful content to avoid blank pages in fallback
          Array.from(scope.querySelectorAll('.a4-page')).forEach((pg) => {
            if (!pageHasMeaningfulContent(pg)) { try { pg.parentElement.removeChild(pg); } catch(_) {} }
          });
        }

        const globalAll = Number(readPdfPref('templatesPdf.globalAllYmm', 0)) || 0;
        const globalRightAll = Number(readPdfPref('templatesPdf.globalAllRightMm', 0)) || 0;
        pages.forEach((pg, idx) => {
          const rightMm = readPdfPrefForPage('templatesPdf.shiftRightMm', idx, readPdfPref('templatesPdf.shiftRightMm', 0));
          const defaultFudge = (idx === 0) ? (readPdfPref('templatesPdf.tightFudgeMm', -144.5)) : 0;
          const fudge = (readPdfPrefForPage('templatesPdf.tightFudgeMm', idx, defaultFudge) || 0);
          const s = Math.max(0.98, Math.min(1.05, scalePct / 100));
          pg.style.transformOrigin = 'top left';
          pg.style.transform = `translate(${rightMm + globalRightAll}mm, ${fudge + globalAll}mm) scale(${s})`;
        });
      } catch(_) {}
    
      // Ensure assets ready before rendering
      await ensureAssetsReady(scope);
      if (typeof html2pdf !== 'function') throw new Error('html2pdf not available');
      await html2pdf()
        .set({
          margin: 0,
          html2canvas: { scale: 2, useCORS: true, allowTaint: false, backgroundColor: '#ffffff' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: landscape ? 'landscape' : 'portrait' },
          pagebreak: { mode: ['css', 'legacy'] },
          image: { type: 'jpeg', quality: 0.98 }
        })
        .from(scope)
        .save(`template-${type}.pdf`);
    } catch (fallbackErr) {
      // آخر حل: اطبع عبر نافذة/إطار مؤقت مباشرة من DOM
      try {
        const html = `<!doctype html><html dir="${host.getAttribute('dir')||'rtl'}"><head><meta charset="utf-8"><title>Print</title><style>@page{size:A4;margin:0}html,body{margin:0;padding:0;background:#fff}#templates-a4-root{transform:none!important}</style></head><body>${scope.innerHTML}</body></html>`;
        const frame = document.createElement('iframe');
        Object.assign(frame.style, { position:'fixed', right:'0', bottom:'0', width:'1px', height:'1px', border:'0' });
        document.body.appendChild(frame);
        const doc = frame.contentWindow?.document;
        if (doc) { doc.open(); doc.write(html); doc.close(); frame.onload = () => { try { frame.contentWindow?.focus(); frame.contentWindow?.print(); } catch(_) {} setTimeout(()=>frame.remove(), 1200); }; }
      } catch(_) { alert('تعذر إنشاء PDF'); }
    } finally {
      try { wrap.parentNode?.removeChild(wrap); } catch (_) {}
    }
    return;
  }

  // Preferences for slight alignment tweaks
  const prefs = (() => {
    try {
      return {
        rightMm: readPdfPref('templatesPdf.shiftRightMm', 40),
        topMm: readPdfPref('templatesPdf.shiftTopMm', 0),
        scale: (readPdfPref('templatesPdf.scalePct', 100)) / 100,
      };
    } catch (_) { return { rightMm: 40, topMm: 0, scale: 1 }; }
  })();

  // Helper fns as used in reports exporter
  const CSS_DPI = 96; const PX_PER_MM = CSS_DPI / 25.4;
  const captureScale = Math.min(2.0, Math.max(1.6, (window.devicePixelRatio || 1) * 1.25));
  const baseOpts = { scale: captureScale, useCORS: true, allowTaint: false, backgroundColor: '#ffffff', letterRendering: false, removeContainer: false };
  const measureTopWhitespacePx = (canvas, threshold = 246) => { try { const ctx = getCtx2d(canvas); if (!ctx) return 0; const { width, height } = canvas; for (let y = 0; y < height; y += 2) { const data = ctx.getImageData(0, y, width, 1).data; let dark = 0; for (let x = 0; x < width; x += 1) { const i = x * 4; if (data[i] < threshold || data[i+1] < threshold || data[i+2] < threshold) { if (++dark > Math.max(2, Math.ceil(width*0.003))) return y; } } } return 0; } catch (_) { return 0; } };
  // Detect the first significant content row, ignoring the thin page border.
  // Scans the central 60% width and skips the first 4px rows, requiring a
  // substantial number of dark pixels so a 1px border does not trigger.
  const measureContentTopIgnoringBorderPx = (canvas, threshold = 244) => {
    try {
      const ctx = getCtx2d(canvas);
      if (!ctx) return 0;
      const { width, height } = canvas;
      const xStart = Math.floor(width * 0.2);
      const regionW = Math.max(10, Math.floor(width * 0.6));
      const minDark = Math.max(12, Math.ceil(regionW * 0.08));
      const yStart = 4; // skip possible 1px border + antialias row
      for (let y = yStart; y < height; y += 2) {
        const data = ctx.getImageData(xStart, y, regionW, 1).data;
        let darkCount = 0;
        for (let x = 0; x < regionW; x += 1) {
          const i4 = x * 4; const r = data[i4], g = data[i4 + 1], b = data[i4 + 2];
          if (r < threshold || g < threshold || b < threshold) {
            if (++darkCount >= minDark) return y;
          }
        }
      }
      return 0;
    } catch (_) { return 0; }
  };
  // Scan right region for first non-white pixels (better at detecting logo/title area)
  const measureRightRegionContentTopPx = (canvas, threshold = 244) => {
    try {
      const ctx = getCtx2d(canvas);
      if (!ctx) return 0;
      const { width, height } = canvas;
      const xStart = Math.floor(width * 0.55);
      const regionW = Math.max(10, width - xStart);
      const minDark = Math.max(3, Math.ceil(regionW * 0.015));
      for (let y = 0; y < height; y += 2) {
        const data = ctx.getImageData(xStart, y, regionW, 1).data;
        let darkCount = 0;
        for (let x = 0; x < regionW; x += 1) {
          const i4 = x * 4; const r = data[i4], g = data[i4 + 1], b = data[i4 + 2];
          if (r < threshold || g < threshold || b < threshold) { if (++darkCount >= minDark) return y; }
        }
      }
      return 0;
    } catch (_) { return 0; }
  };
  const measureBottomWhitespacePx = (canvas, threshold = 246) => { try { const ctx = getCtx2d(canvas); if (!ctx) return 0; const { width, height } = canvas; for (let y = height-1; y >= 0; y -= 2) { const data = ctx.getImageData(0, y, width, 1).data; let dark = 0; for (let x = 0; x < width; x += 1) { const i = x * 4; if (data[i] < threshold || data[i+1] < threshold || data[i+2] < threshold) { if (++dark > Math.max(2, Math.ceil(width*0.003))) return (height-1-y); } } } return 0; } catch (_) { return 0; } };
  const cropCanvasVertical = (canvas, topPx, bottomPx) => { try { const { width, height } = canvas; const cropTop = Math.max(0, Math.min(height - 1, Math.round(topPx))); const cropBottom = Math.max(0, Math.min(height - cropTop, Math.round(bottomPx))); const newH = Math.max(1, height - cropTop - cropBottom); if (cropTop === 0 && cropBottom === 0) return canvas; const out = document.createElement('canvas'); out.width = width; out.height = newH; const ctx = getCtx2d(out); if (!ctx) return canvas; ctx.drawImage(canvas, 0, -cropTop); return out; } catch (_) { return canvas; } };
  // Estimate if a canvas is nearly blank (no significant dark pixels)
  const isCanvasAlmostBlank = (canvas, threshold = 244) => {
    try {
      const ctx = getCtx2d(canvas);
      if (!ctx) return false;
      const { width, height } = canvas;
      const xStart = Math.floor(width * 0.15);
      const regionW = Math.max(10, Math.floor(width * 0.70));
      const stepY = Math.max(4, Math.floor(height / 80));
      let darkTotal = 0;
      let samples = 0;
      for (let y = 6; y < height - 6; y += stepY) {
        const data = ctx.getImageData(xStart, y, regionW, 1).data;
        samples += regionW;
        for (let x = 0; x < regionW; x += 1) {
          const i4 = x * 4; const r = data[i4], g = data[i4 + 1], b = data[i4 + 2];
          if (r < threshold || g < threshold || b < threshold) darkTotal += 1;
        }
      }
      const coverage = darkTotal / Math.max(1, samples);
      // Treat canvas as blank if very little dark coverage (≈0.6%)
      return coverage < 0.006;
    } catch (_) { return false; }
  };

  patchHtml2CanvasColorParsing();
  const doc = new JsPdfCtor({ unit: 'mm', format: 'a4', orientation: landscape ? 'landscape' : 'portrait', compress: true });
  // Ensure DOM is pruned before taking snapshots
  try {
    const domPages = Array.from(host.querySelectorAll('.a4-page'));
    domPages.forEach((pg) => { if (!pageHasMeaningfulContent(pg)) { pg.parentElement?.removeChild(pg); } });
  } catch (_) {}
  // Limit to first 5 pages for expenses PDFs
  let pages = Array.from(host.querySelectorAll('.a4-page')).filter(pageHasMeaningfulContent);
  if ((type === 'expenses') && pages.length > 5) {
    pages = pages.slice(0, 5);
  }
  let pdfPageIndex = 0;
  for (let i = 0; i < pages.length; i += 1) {
    const page = pages[i];
    const wrap = document.createElement('div');
    Object.assign(wrap.style, { position: 'fixed', top: '0', left: '-12000px', pointerEvents: 'none', zIndex: '-1', backgroundColor: '#ffffff' });
    const scope = document.createElement('div');
    scope.id = 'templates-a4-root';
    scope.setAttribute('data-render-context', 'export');
    scope.setAttribute('dir', host.getAttribute('dir') || document.documentElement.getAttribute('dir') || 'rtl');
    scope.style.width = `${A4_W_PX}px`;
    scope.style.maxWidth = `${A4_W_PX}px`;
    scope.style.minWidth = `${A4_W_PX}px`;
    scope.style.background = '#ffffff';
    const pagesWrap = document.createElement('div');
    pagesWrap.setAttribute('data-a4-pages', '');
    const clone = page.cloneNode(true);
    clone.style.width = `${A4_W_PX}px`;
    clone.style.maxWidth = `${A4_W_PX}px`;
    clone.style.minWidth = `${A4_W_PX}px`;
    clone.style.height = `${A4_H_PX}px`;
    clone.style.maxHeight = `${A4_H_PX}px`;
    clone.style.minHeight = `${A4_H_PX}px`;
    clone.style.position = 'relative';
    clone.style.background = '#ffffff';
    clone.style.overflow = 'hidden';
    // Trim trailing blanks in this page clone as well
    try {
      Array.from(clone.querySelectorAll('table.cs-schedule')).forEach((t) => trimTrailingEmptyRowsExt(t, 4));
      Array.from(clone.querySelectorAll('table.cs-crew')).forEach((t) => trimTrailingEmptyRowsExt(t, 2));
    } catch (_) {}
    // Ensure every exp-details table starts with its group title bar on this page
    try {
      const ensureGroupBarTop = (cl, origin) => {
        const tbl = cl.querySelector('table.exp-details');
        if (!tbl) return;
        const tb = tbl.tBodies && tbl.tBodies[0];
        if (!tb) return;
        const hasItems = !!tb.querySelector('tr[data-row="item"]');
        if (!hasItems) return;
        const first = tb.firstElementChild;
        const isBar = first && first.hasAttribute && first.hasAttribute('data-group-bar');
        if (isBar) return;
        let bar = cl.querySelector('tbody > tr[data-group-bar]');
        if (!bar && origin) bar = origin.querySelector('tbody > tr[data-group-bar]');
        if (bar) {
          const barClone = bar.cloneNode(true);
          tb.insertBefore(barClone, tb.firstElementChild);
        }
      };
      ensureGroupBarTop(clone, page);
    } catch (_) {}
    pagesWrap.appendChild(clone);
    scope.appendChild(pagesWrap);
    wrap.appendChild(scope);
    document.body.appendChild(wrap);

    const revert = [];
    const sanitizerHandle = injectExportSanitizer(scope);
    try { scrubUnsupportedColorFunctions(scope); sanitizeComputedColorFunctions(scope, window, revert); enforceLegacyColorFallback(scope, window, revert); } catch (_) {}

    // قياس موضع عنوان الصفحة داخل نسخة التصدير قبل الالتقاط لنهتم بألا نقتص فوقه
    const PX_PER_MM_EXPORT = 96 / 25.4;
    const mmToPx = (mm) => mm * PX_PER_MM_EXPORT * captureScale;
    let headerTopCssPx = 0; // in export clone (pre-crop, CSS px)
    try {
      const innerForHead = clone.querySelector('.a4-inner') || clone;
      const headerForHead = innerForHead.querySelector('.exp-masthead') || innerForHead.firstElementChild;
      if (headerForHead) {
        const baseRect0 = innerForHead.getBoundingClientRect();
        const hdrRect0 = headerForHead.getBoundingClientRect();
        headerTopCssPx = Math.max(0, hdrRect0.top - baseRect0.top);
      }
    } catch (_) { headerTopCssPx = 0; }

    let canvas;
    try {
      // Ensure fonts and images are fully loaded before capture for consistency
      await ensureAssetsReady(scope);
      const captureTarget = clone.querySelector('.a4-inner') || clone;
      const rect = captureTarget.getBoundingClientRect();
      canvas = await h2c(captureTarget, { ...baseOpts, scrollX: 0, scrollY: 0, windowWidth: Math.ceil(rect.width), windowHeight: Math.ceil(rect.height) });
    } finally {
      try { revertStyleMutations(revert); } catch (_) {}
      try { removeExportSanitizer(scope, sanitizerHandle); } catch (_) {}
      wrap.parentNode?.removeChild(wrap);
    }

    if (!canvas) continue;
    // Skip truly blank pages early
    if (isCanvasAlmostBlank(canvas)) { continue; }
    let cropped;
    if (strictWysiwyg) {
      // لا قص: التقط الصفحة كما هي بالحجم القياسي، ثم نقيس الفراغ العلوي ونزحزح عند الإدراج فقط
      cropped = canvas;
    } else {
      const topWhitePx = measureTopWhitespacePx(canvas, 246);
      const rightRegionTopPx = measureRightRegionContentTopPx(canvas, 244);
      const visualTopPx = measureContentTopIgnoringBorderPx(canvas, 244);
      let extraTrimMm = readPdfPrefForPage('templatesPdf.extraTrimMm', i, readPdfPref('templatesPdf.extraTrimMm', 14));
      let safeMarginMm = readPdfPrefForPage('templatesPdf.safeMarginMm', i, readPdfPref('templatesPdf.safeMarginMm', 0.5));
      extraTrimMm = Math.max(0, Math.min(40, Number(extraTrimMm) || 0));
      safeMarginMm = Math.max(0, Math.min(10, Number(safeMarginMm) || 0));
      const headerTopScaledPx = Math.max(0, headerTopCssPx * captureScale);
      const extraTrimPx = mmToPx(extraTrimMm);
      const safeMarginPx = mmToPx(safeMarginMm);
      const baseChosenTopPx = Math.max(topWhitePx, rightRegionTopPx, visualTopPx);
      const chosenTopPx = Math.min(Math.max(0, baseChosenTopPx + extraTrimPx), Math.max(0, headerTopScaledPx - safeMarginPx));
      const bottomWhitePx = measureBottomWhitespacePx(canvas, 246);
      cropped = cropCanvasVertical(canvas, chosenTopPx, bottomWhitePx);
    }
    // Guard: if cropped result is still almost blank, skip adding this page
    if (isCanvasAlmostBlank(cropped)) { continue; }

    // استخدم تحجيم 1:1 افتراضياً لضمان عدم إضافة فراغات هامشية
    let targetWmm, targetHmm, finalX;
    // Shared right-shift (applies in both strict and non-strict)
    let globalRightAll = 0;
    try { globalRightAll = Number(readPdfPref('templatesPdf.globalAllRightMm', 0)) || 0; } catch(_) { globalRightAll = 0; }
    if (strictWysiwyg) {
      // Force exact A4 dimensions for 1:1 export
      targetWmm = A4_W_MM; targetHmm = A4_H_MM;
      finalX = Number(readPdfPrefForPage('templatesPdf.shiftRightMm', i, (Number(prefs.rightMm) || 0))) || 0;
      finalX += globalRightAll;
    } else {
      const shrink = Math.max(0.98, Math.min(1, prefs.scale || 1));
      targetWmm = A4_W_MM * shrink;
      targetHmm = (cropped.height / cropped.width) * targetWmm;
      finalX = Number(readPdfPrefForPage('templatesPdf.shiftRightMm', i, (Number(prefs.rightMm) || 0))) || 0;
      finalX += globalRightAll;
    }

    // Compute placement to push content to the very top edge.
    const PX_PER_MM = 96 / 25.4;
    let previewHeaderTopCssPx = 0; // in on-screen preview page
    try {
      // Preview header position for the same logical page
      const previewInner = page.querySelector('.a4-inner') || page;
      const previewHeader = previewInner.querySelector('.exp-masthead') || previewInner.firstElementChild;
      if (previewHeader) {
        const pBase = page.getBoundingClientRect();
        const pHdr = previewHeader.getBoundingClientRect();
        previewHeaderTopCssPx = Math.max(0, pHdr.top - pBase.top);
      }
    } catch (_) { previewHeaderTopCssPx = 0; }

    // After cropping, the header moves up by `chosenTopPx` pixels.
    // Convert that in-cropped offset to mm using the final scaling.
    const mmPerPx = targetWmm / cropped.width;
    // حتى مع الوضع الصارم، قِس أقصى فراغ علوي مرئي لتثبيت المحتوى تماماً أعلى الصفحة دون قص
    let chosenTopPx = 0;
    try {
      const t1 = measureTopWhitespacePx(cropped, 246);
      const t2 = measureRightRegionContentTopPx(cropped, 244);
      const t3 = measureContentTopIgnoringBorderPx(cropped, 244);
      chosenTopPx = Math.max(t1, t2, t3);
    } catch(_) { chosenTopPx = 0; }
    const headerInCroppedMm = Math.max(0, (headerTopCssPx - chosenTopPx) * mmPerPx);
    // Tight-top mode: ارفع المحتوى ليلامس أعلى الصفحة قدر الإمكان
    // تعويض افتراضي قوي للرفع (-166mm) ويمكن تعديله من LocalStorage
    const globalTightFudgeMm = (() => { try { const v = Number(readPdfPref('templatesPdf.tightFudgeMm', -144.5)); return Number.isFinite(v) ? Math.max(-300, Math.min(300, v)) : -144.5; } catch(_) { return -144.5; } })();
    // إزاحة عامة إضافية اختيارية
    const globalYmm = (() => { try { const v = Number(readPdfPref('templatesPdf.globalYmm', 0)); return Number.isFinite(v) ? Math.max(-40, Math.min(40, v)) : 0; } catch(_) { return 0; } })();
    const globalAllYmm = (() => { try { const v = Number(readPdfPref('templatesPdf.globalAllYmm', -1)); return Number.isFinite(v) ? v : -1; } catch(_) { return -1; } })();
    // صفحات بعد الأولى: اجعل أول عنصر يلامس أعلى الصفحة بدقة
    let finalY;
    if (strictWysiwyg) {
      // ادفع الصورة للأعلى بمقدار الفراغ المقاس + السماح بتحكم يدوي لكل صفحة
      const pageFudge = Number(readPdfPrefForPage('templatesPdf.tightFudgeMm', i, (i === 0 ? globalTightFudgeMm : 0))) || 0;
      finalY = -headerInCroppedMm + pageFudge + globalYmm + (Number.isFinite(globalAllYmm) ? globalAllYmm : 0);
    } else {
      if (pdfPageIndex > 0) {
        const pageFudge = Number(readPdfPrefForPage('templatesPdf.tightFudgeMm', i, 0)) || 0;
        finalY = -headerInCroppedMm + pageFudge + globalAllYmm;
      } else {
        const pageFudge0 = Number(readPdfPrefForPage('templatesPdf.tightFudgeMm', i, globalTightFudgeMm)) || 0;
        finalY = (Number(prefs.topMm) || 0) - headerInCroppedMm + pageFudge0 + globalYmm + globalAllYmm;
      }
    }
    // Clamp just in case (واسع للسماح بضبط قوي)
    if (finalY < -220) finalY = -220;
    if (finalY > 120) finalY = 120;
    if (pdfPageIndex > 0) doc.addPage();
    const img = cropped.toDataURL('image/jpeg', 0.95);
    doc.addImage(img, 'JPEG', finalX, finalY, targetWmm, targetHmm, `page-${pdfPageIndex + 1}`, 'FAST');
    pdfPageIndex += 1;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => requestAnimationFrame(r));
  }

  if (pdfPageIndex === 0) throw new Error('PDF generation produced no pages');
  try { doc.save(`template-${type}.pdf`); } catch { doc.save('template.pdf'); }
}

function showPrintPreviewOverlay() {
  try {
    const host = document.querySelector('#templates-preview-host > #templates-a4-root');
    if (!host) { alert('لا يوجد محتوى للمعاينة'); return; }
    const overlay = document.createElement('div');
    Object.assign(overlay.style, { position:'fixed', inset:'0', background:'rgba(15,23,42,0.6)', zIndex:'9998', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' });
    const panel = document.createElement('div');
    Object.assign(panel.style, { background:'#fff', borderRadius:'12px', maxWidth:'92vw', maxHeight:'88vh', width:'min(1200px,92vw)', padding:'12px', boxShadow:'0 12px 30px rgba(0,0,0,0.25)', display:'flex', flexDirection:'column', gap:'12px' });
    const head = document.createElement('div'); head.textContent = 'معاينة الطباعة'; head.style.cssText = 'font-weight:800;font-size:16px';
    const scroller = document.createElement('div'); Object.assign(scroller.style, { overflow:'auto', flex:'1 1 auto', border:'1px solid #e5e7eb', borderRadius:'8px', padding:'10px', background:'#f8fafc' });
    const actions = document.createElement('div'); Object.assign(actions.style, { display:'flex', gap:'8px', justifyContent:'flex-start' });
    const closeBtn = document.createElement('button'); closeBtn.className = 'btn btn-outline'; closeBtn.textContent = 'إغلاق'; closeBtn.onclick = () => overlay.remove();
    const printBtn = document.createElement('button'); printBtn.className = 'btn btn-primary'; printBtn.textContent = 'طباعة الآن'; printBtn.onclick = async () => { overlay.remove(); try { await printTemplatesPdf(); } catch(_) {} };
    actions.appendChild(printBtn); actions.appendChild(closeBtn);

    // Build preview content by cloning and pruning blank pages
    const rootClone = host.cloneNode(true);
    const wrap = rootClone.querySelector('[data-a4-pages]') || rootClone;
    const pages = Array.from(wrap.querySelectorAll('.a4-page'));
    const pageHasContent = (pg) => {
      try {
        const hasTop = !!pg.querySelector('#expenses-top-sheet');
        const hasDetailsRow = !!pg.querySelector('table.exp-details tbody tr[data-row="item"]');
        const hasTplRows = !!Array.from(pg.querySelectorAll('table.tpl-table tbody tr')).find((tr) => Array.from(tr.querySelectorAll('td')).some((td)=>((td.textContent||'').trim().length>0)));
        const hasCrew = !!Array.from(pg.querySelectorAll('.callsheet-v1 table.cs-crew tbody tr')).find((tr) => Array.from(tr.querySelectorAll('td')).some((td)=>((td.textContent||'').trim().length>0)));
        const hasCallsheet = !!pg.querySelector('.callsheet-v1 .cs-header, .callsheet-v1 .cs-info td, .callsheet-v1 .cs-cast td');
        return hasTop || hasDetailsRow || hasTplRows || hasCrew || hasCallsheet;
      } catch(_) { return true; }
    };
    pages.forEach((pg) => { if (!pageHasContent(pg)) pg.parentElement?.removeChild(pg); });

    const pages2 = Array.from(wrap.querySelectorAll('.a4-page'));
    const info = document.createElement('div'); info.textContent = `عدد الصفحات: ${pages2.length}`; info.style.cssText = 'font-size:12px;color:#475569';
    const grid = document.createElement('div'); Object.assign(grid.style, { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(360px, 1fr))', gap:'14px' });
    pages2.forEach((pg) => {
      const card = document.createElement('div'); Object.assign(card.style, { background:'#fff', border:'1px solid #e5e7eb', borderRadius:'8px', padding:'6px', display:'flex', justifyContent:'center', alignItems:'center' });
      const ph = pg.cloneNode(true); Object.assign(ph.style, { transform:'scale(0.45)', transformOrigin:'top left', width: pg.clientWidth+'px', height: pg.clientHeight+'px' });
      card.appendChild(ph); grid.appendChild(card);
    });
    scroller.appendChild(info); scroller.appendChild(grid);

    panel.appendChild(head); panel.appendChild(scroller); panel.appendChild(actions);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
  } catch (_) { alert('تعذر إنشاء المعاينة'); }
}

async function fetchCrewFromReservation(force = false) {
  try {
    const host = document.getElementById('templates-a4-root');
    if (!host) { alert('لا يوجد محتوى'); return; }
    const crew = host.querySelector('.callsheet-v1 table.cs-crew');
    if (!crew) { alert('لا يوجد جدول Crew في القالب الحالي'); return; }
    const project = getSelectedProject();
    const res = project ? (getSelectedReservations(project.id)?.[0] || null) : null;
    if (!res) { alert('اختر حجزاً مرتبطاً أولاً'); return; }
    if (force) {
      populateCrewFromReservationExt(crew, res);
    } else {
      populateCrewFromReservationIfEmptyExt(res);
    }
    try { showToast('تم جلب بيانات الطاقم', 'success', 2500); } catch(_) { /* ignore */ }
  } catch (_) { alert('تعذر جلب بيانات الطاقم'); }
}

// ============== PDF Live Tuner ==============
// ============== PDF Prefs (namespaced per template type) ==============
function __pdfNsKeyBase() {
  try { const type = document.getElementById('templates-type')?.value || 'expenses'; return `templatesPdf.${type}`; } catch(_) { return 'templatesPdf.expenses'; }
}
function __pdfResolve(key) {
  const clean = String(key || '').replace(/^templatesPdf[.:]/, '');
  const base = __pdfNsKeyBase();
  return { ns: `${base}.${clean}`, legacy: `templatesPdf.${clean}` };
}
function readPdfPref(key, def) {
  try {
    const { ns, legacy } = __pdfResolve(key);
    let v = localStorage.getItem(ns);
    if (v == null) v = localStorage.getItem(legacy);
    if (v == null) return def;
    const n = Number(v);
    return Number.isFinite(n) ? n : def;
  } catch (_) { return def; }
}
function readPdfString(key, def) {
  try { const { ns, legacy } = __pdfResolve(key); const v = localStorage.getItem(ns) ?? localStorage.getItem(legacy); return (v == null) ? def : String(v); } catch(_) { return def; }
}
function writePdfPref(key, val) {
  try { const { ns } = __pdfResolve(key); localStorage.setItem(ns, String(val)); } catch (_) {}
}
// Per-page overrides helpers (namespaced)
function __pdfPageOverridesKey() { return `${__pdfNsKeyBase()}.pageOverrides`; }
function getPdfPageOverrides() {
  try { const raw = localStorage.getItem(__pdfPageOverridesKey()); return raw ? JSON.parse(raw) : {}; } catch(_) { return {}; }
}
function setPdfPageOverride(pageIndex, key, val) {
  try { const obj = getPdfPageOverrides(); const idx = String(pageIndex); obj[idx] = obj[idx] || {}; obj[idx][key] = Number(val); localStorage.setItem(__pdfPageOverridesKey(), JSON.stringify(obj)); } catch(_) {}
}
function readPdfPrefForPage(key, pageIndex, defWhenMissing) {
  try { const obj = getPdfPageOverrides(); const page = obj[String(pageIndex)]; if (page && page[key] != null && Number.isFinite(Number(page[key]))) return Number(page[key]); return readPdfPref(key, defWhenMissing); } catch(_) { return readPdfPref(key, defWhenMissing); }
}
function clearPdfPageOverrides() { try { localStorage.removeItem(__pdfPageOverridesKey()); } catch(_) {}
}

async function renderPdfLivePreview() {
  const host = document.querySelector('#templates-preview-host > #templates-a4-root');
  if (!host) return;
  const type = document.getElementById('templates-type')?.value || 'expenses';
  const landscape = type !== 'expenses';
  // Ensure preview slot indicates action
  try { const slot0 = document.getElementById('templates-pdf-live-slot'); if (slot0) { slot0.innerHTML = '<div style="padding:8px;color:#64748b">… جار إنشاء المعاينة</div>'; } } catch(_) {}
  let html2pdf;
  try { html2pdf = await ensureHtml2Pdf(); } catch(_) { html2pdf = null; }
  let h2c = window.html2canvas;
  if (typeof h2c !== 'function') {
    try { await loadExternalScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'); } catch(_) {}
    h2c = window.html2canvas;
  }
  if (typeof h2c !== 'function') {
    const slot = document.getElementById('templates-pdf-live-slot');
    if (slot) slot.innerHTML = '<div style="padding:8px;color:#ef4444">تعذر تحميل html2canvas لمعاينة PDF. تأكد من اتصال الشبكة ثم أعد المحاولة.</div>';
    return;
  }

  const A4_W_PX = landscape ? 1123 : 794;
  const A4_H_PX = landscape ? 794 : 1123;
  const A4_W_MM = landscape ? 297 : 210;
  const A4_H_MM = landscape ? 210 : 297;
  const CSS_DPI = 96; const PX_PER_MM = CSS_DPI / 25.4;

  const selVal = document.getElementById('pdftun-page')?.value;
  const pageIndex = Math.max(0, Number(selVal ?? 0) || 0);
  const pagesAll = Array.from(host.querySelectorAll('.a4-page'));
  const page = pagesAll[pageIndex] || pagesAll[0];
  if (!page) return;

  // Build isolated export scope for a single page
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'fixed', top: '0', left: '-12000px', pointerEvents: 'none', zIndex: '-1', backgroundColor: '#ffffff' });
  const scope = document.createElement('div');
  scope.id = 'templates-a4-root';
  scope.setAttribute('data-render-context', 'export');
  scope.setAttribute('dir', host.getAttribute('dir') || document.documentElement.getAttribute('dir') || 'rtl');
  const pagesWrap = document.createElement('div');
  pagesWrap.setAttribute('data-a4-pages', '');
  const clone = page.cloneNode(true);
  clone.style.width = `${A4_W_PX}px`;
  clone.style.height = `${A4_H_PX}px`;
  clone.style.background = '#ffffff';
  clone.style.overflow = 'hidden';
  // Ensure the group bar is at the very top of the table in the single-page clone
  try {
    const ensureBar = (cl, origin) => {
      const tbl = cl.querySelector('table.exp-details');
      if (!tbl) return;
      const tb = tbl.tBodies && tbl.tBodies[0];
      if (!tb) return;
      // Do not inject a bar if this page has no item rows — avoids non-blank empty pages
      const hasItems = !!tb.querySelector('tr[data-row="item"]');
      if (!hasItems) return;
      const first = tb.firstElementChild;
      if (first && first.hasAttribute && first.hasAttribute('data-group-bar')) return;
      let bar = cl.querySelector('tbody > tr[data-group-bar]');
      if (!bar && origin) bar = origin.querySelector('tbody > tr[data-group-bar]');
      if (bar) tb.insertBefore(bar.cloneNode(true), tb.firstElementChild);
    };
    ensureBar(clone, page);
  } catch (_) {}
  pagesWrap.appendChild(clone);
  scope.appendChild(pagesWrap);
  wrap.appendChild(scope);
  document.body.appendChild(wrap);

  // Helpers copied from export logic
  const captureScale = Math.min(2.0, Math.max(1.6, (window.devicePixelRatio || 1) * 1.25));
  const baseOpts = { scale: captureScale, useCORS: true, allowTaint: false, backgroundColor: '#ffffff', letterRendering: false, removeContainer: false };
  const measureTopWhitespacePx = (canvas, threshold = 246) => { try { const ctx = canvas.getContext('2d'); const { width, height } = canvas; for (let y = 0; y < height; y += 2) { const data = ctx.getImageData(0, y, width, 1).data; let dark = 0; for (let x = 0; x < width; x += 1) { const i = x * 4; if (data[i] < threshold || data[i+1] < threshold || data[i+2] < threshold) { if (++dark > Math.max(2, Math.ceil(width*0.003))) return y; } } } return 0; } catch (_) { return 0; } };
  const measureRightRegionContentTopPx = (canvas, threshold = 244) => { try { const ctx = canvas.getContext('2d'); const { width, height } = canvas; const xStart = Math.floor(width * 0.55); const regionW = Math.max(10, width - xStart); const minDark = Math.max(3, Math.ceil(regionW * 0.015)); for (let y = 0; y < height; y += 2) { const data = ctx.getImageData(xStart, y, regionW, 1).data; let darkCount = 0; for (let x = 0; x < regionW; x += 1) { const i4 = x * 4; const r = data[i4], g = data[i4 + 1], b = data[i4 + 2]; if (r < threshold || g < threshold || b < threshold) { if (++darkCount >= minDark) return y; } } } return 0; } catch (_) { return 0; } };
  const measureContentTopIgnoringBorderPx = (canvas, threshold = 244) => { try { const ctx = canvas.getContext('2d'); const { width, height } = canvas; const xStart = Math.floor(width * 0.2); const regionW = Math.max(10, Math.floor(width * 0.6)); const minDark = Math.max(12, Math.ceil(regionW * 0.08)); const yStart = 4; for (let y = yStart; y < height; y += 2) { const data = ctx.getImageData(xStart, y, regionW, 1).data; let darkCount = 0; for (let x = 0; x < regionW; x += 1) { const i4 = x * 4; const r = data[i4], g = data[i4 + 1], b = data[i4 + 2]; if (r < threshold || g < threshold || b < threshold) { if (++darkCount >= minDark) return y; } } } return 0; } catch (_) { return 0; } };
  const measureBottomWhitespacePx = (canvas, threshold = 246) => { try { const ctx = canvas.getContext('2d'); const { width, height } = canvas; for (let y = height-1; y >= 0; y -= 2) { const data = ctx.getImageData(0, y, width, 1).data; let dark = 0; for (let x = 0; x < width; x += 1) { const i = x * 4; if (data[i] < threshold || data[i+1] < threshold || data[i+2] < threshold) { if (++dark > Math.max(2, Math.ceil(width*0.003))) return (height-1-y); } } } return 0; } catch (_) { return 0; } };
  const cropCanvasVertical = (canvas, topPx, bottomPx) => { try { const { width, height } = canvas; const cropTop = Math.max(0, Math.min(height - 1, Math.round(topPx))); const cropBottom = Math.max(0, Math.min(height - cropTop, Math.round(bottomPx))); const newH = Math.max(1, height - cropTop - cropBottom); if (cropTop === 0 && cropBottom === 0) return canvas; const out = document.createElement('canvas'); out.width = width; out.height = newH; const ctx = out.getContext('2d'); ctx.drawImage(canvas, 0, -cropTop); return out; } catch (_) { return canvas; } };

  // Measure header top inside export clone (pre-capture) like print path
  let headerTopCssPx = 0;
  try {
    const inner0 = clone.querySelector('.a4-inner') || clone;
    const hdr0 = inner0.querySelector('.exp-masthead') || inner0.firstElementChild;
    if (hdr0) {
      const base0 = clone.getBoundingClientRect();
      const r0 = hdr0.getBoundingClientRect();
      headerTopCssPx = Math.max(0, r0.top - base0.top);
    }
  } catch (_) { headerTopCssPx = 0; }

  // Capture
  let canvas;
  try {
    await ensureAssetsReady(scope);
    canvas = await h2c(clone, { ...baseOpts, scrollX: 0, scrollY: 0, windowWidth: A4_W_PX, windowHeight: A4_H_PX });
  } finally {
    try { wrap.parentNode?.removeChild(wrap); } catch (_) {}
  }
  if (!canvas) return;

  // Measurements (use current prefs from localStorage)
  const topWhitePx = measureTopWhitespacePx(canvas, 246);
  const rightRegionTopPx = measureRightRegionContentTopPx(canvas, 244);
  const visualTopPx = measureContentTopIgnoringBorderPx(canvas, 244);
  const vSel = document.getElementById('pdftun-page')?.value || 'all';
  const idxSel = vSel === 'all' ? 0 : Math.max(0, Number(vSel) || 0);
  const extraTrimMm = readPdfPrefForPage('templatesPdf.extraTrimMm', idxSel, readPdfPref('templatesPdf.extraTrimMm', 14));
  const safeMarginMm = readPdfPrefForPage('templatesPdf.safeMarginMm', idxSel, readPdfPref('templatesPdf.safeMarginMm', 0.5));
  const captureHeaderTopPx = Math.max(visualTopPx, headerTopCssPx * captureScale);
  const extraTrimPx = extraTrimMm * PX_PER_MM * captureScale;
  const safeMarginPx = safeMarginMm * PX_PER_MM * captureScale;
  const baseChosenTopPx = Math.max(topWhitePx, rightRegionTopPx, visualTopPx);
  const chosenTopPx = Math.min(Math.max(0, baseChosenTopPx + extraTrimPx), Math.max(0, captureHeaderTopPx - safeMarginPx));
  const bottomWhitePx = measureBottomWhitespacePx(canvas, 246);
  const cropped = cropCanvasVertical(canvas, chosenTopPx, bottomWhitePx);

  const prefsScale = readPdfPref('templatesPdf.scalePct', 100) / 100;
  const shrink = Math.max(0.98, Math.min(1, prefsScale || 1));
  const targetWmm = A4_W_MM * shrink;
  const targetHmm = (cropped.height / cropped.width) * targetWmm;
  const rightMm = readPdfPrefForPage('templatesPdf.shiftRightMm', pageIndex, readPdfPref('templatesPdf.shiftRightMm', 40));
  const globalRightAllMm = readPdfPref('templatesPdf.globalAllRightMm', 0);
  const baselineFudge = (pageIndex === 0) ? readPdfPref('templatesPdf.tightFudgeMm', -144.5) : 0;
  const tightFudgeMm = readPdfPrefForPage('templatesPdf.tightFudgeMm', pageIndex, baselineFudge);
  const globalYmm = readPdfPref('templatesPdf.globalYmm', 0);
  const globalAllYmm = readPdfPref('templatesPdf.globalAllYmm', -1);

  // Simulated placement
  const finalXmm = rightMm + globalRightAllMm;
  const headerInCroppedMm = Math.max(0, (headerTopCssPx * captureScale - chosenTopPx)) * (targetWmm / cropped.width);
  let finalYmm = -headerInCroppedMm + tightFudgeMm + globalYmm + globalAllYmm;

  // Draw into a page-sized canvas
  const pageCanvas = document.createElement('canvas');
  pageCanvas.width = A4_W_PX;
  pageCanvas.height = A4_H_PX;
  const ctx = pageCanvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
  const drawX = Math.round(finalXmm * PX_PER_MM);
  const drawY = Math.round(finalYmm * PX_PER_MM);
  const drawW = Math.round(targetWmm * PX_PER_MM);
  const drawH = Math.round(targetHmm * PX_PER_MM);
  try { ctx.drawImage(cropped, drawX, drawY, drawW, drawH); } catch (_) {}

  const slot = document.getElementById('templates-pdf-live-slot');
  if (slot) {
    slot.innerHTML = '';
    const img = document.createElement('img');
    img.src = pageCanvas.toDataURL('image/png');
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.border = '1px solid #e5e7eb';
    slot.appendChild(img);
  }
}

function ensurePdfTunerUI() {
  const controls = document.getElementById('templates-controls');
  if (!controls || document.getElementById('templates-pdf-tuner-toggle')) return;
  const actionsRow = controls.querySelector('.ms-auto') || controls;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'templates-pdf-tuner-toggle';
  btn.className = 'btn btn-outline';
  btn.textContent = '🛠️ ضبط PDF';
  actionsRow.appendChild(btn);

  const panel = document.createElement('div');
  panel.id = 'templates-pdf-tuner';
  panel.style.display = 'none';
  panel.style.marginTop = '10px';
  panel.style.border = '1px solid #e5e7eb';
  panel.style.borderRadius = '10px';
  panel.style.padding = '10px';
  panel.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:flex-end;">
      <label style=\"display:flex; flex-direction:column; gap:4px;\">
        <span>الصفحة</span>
        <select id=\"pdftun-page\" style=\"width:110px;\"></select>
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Top Offset (All)</span>
        <input id="pdftun-globalY" type="number" step="0.5" min="-1000" max="1000" style="width:90px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Right Shift (All)</span>
        <input id="pdftun-globalX" type="number" step="0.5" min="-1000" max="1000" style="width:90px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Top Trim (mm)</span>
        <input id="pdftun-extraTrim" type="number" step="0.5" min="0" max="40" style="width:90px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Safe Margin (mm)</span>
        <input id="pdftun-safeMargin" type="number" step="0.1" min="0" max="10" style="width:90px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Top Offset (mm)</span>
        <input id="pdftun-tightFudge" type="number" step="0.5" min="-40" max="40" style="width:90px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Right Shift (mm)</span>
        <input id="pdftun-right" type="number" step="0.5" min="-40" max="40" style="width:90px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Scale (%)</span>
        <input id="pdftun-scale" type="number" step="1" min="90" max="110" style="width:90px;" />
      </label>
      <span style="flex:1 1 auto"></span>
      <button type="button" class="btn btn-outline" id="pdftun-preset">تطبيق القيم</button>
      <button type="button" class="btn btn-outline" id="pdftun-reset">الافتراضيات</button>
      <button type="button" class="btn btn-primary" id="pdftun-print">🖨️ طباعة</button>
    </div>
  `;
  controls.parentElement?.appendChild(panel);

  // Init values from current prefs
  const refreshPagesList = () => {
    const sel = panel.querySelector('#pdftun-page');
    const pages = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root .a4-page'));
    const cur = sel.value || '0';
    const opts = [];
    pages.forEach((_, idx) => { opts.push(`<option value="${idx}">الصفحة ${idx+1}</option>`); });
    if (!opts.length) {
      sel.innerHTML = '<option value="0">الصفحة 1</option>';
      setTimeout(() => { try { refreshPagesList(); } catch(_) {} }, 120);
    } else {
      sel.innerHTML = opts.join('');
    }
    if (Array.from(sel.options).some((o) => o.value === cur)) sel.value = cur; else sel.value = '0';
  };
  const loadValuesForSelected = () => {
    const sel = panel.querySelector('#pdftun-page');
    const pageIndex = Math.max(0, Number(sel.value || '0'));
    const extraTrimVal = readPdfPrefForPage('templatesPdf.extraTrimMm', pageIndex, readPdfPref('templatesPdf.extraTrimMm', 14));
    const safeMarginVal = readPdfPrefForPage('templatesPdf.safeMarginMm', pageIndex, readPdfPref('templatesPdf.safeMarginMm', 0.5));
    document.getElementById('pdftun-extraTrim').value = String(extraTrimVal);
    document.getElementById('pdftun-safeMargin').value = String(safeMarginVal);
    const defaultFudge = (pageIndex === 0 ? -144.5 : 0);
    const fudgeVal = readPdfPrefForPage('templatesPdf.tightFudgeMm', pageIndex, defaultFudge);
    const rightVal = readPdfPrefForPage('templatesPdf.shiftRightMm', pageIndex, readPdfPref('templatesPdf.shiftRightMm', 40));
    document.getElementById('pdftun-tightFudge').value = String(fudgeVal);
    document.getElementById('pdftun-right').value = String(rightVal);
    document.getElementById('pdftun-scale').value = String(readPdfPref('templatesPdf.scalePct', 100));
    try { document.getElementById('pdftun-globalY').value = String(readPdfPref('templatesPdf.globalAllYmm', -1)); } catch(_) {}
    try { document.getElementById('pdftun-globalX').value = String(readPdfPref('templatesPdf.globalAllRightMm', 0)); } catch(_) {}
  };
  const init = () => { refreshPagesList(); loadValuesForSelected(); };
  init();

  btn.addEventListener('click', () => {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display === 'block') {
      try { refreshPagesList(); loadValuesForSelected(); } catch(_) {}
      // Seed preset once if there are no overrides at all
      try {
        const ov = getPdfPageOverrides();
        if (ov && Object.keys(ov).length === 0 && !localStorage.getItem('templatesPdf.presetSeeded.v4')) {
          const pages = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root .a4-page'));
          if (pages.length) {
            const right = 61, safe = 0.5;
            const offsets = [-145, -290, -435, -580, -725];
            const trims =   [  14,   14,   14,   14,   14];
            const stepAfter = -145;
            pages.forEach((_, idx) => {
              const off = (idx < offsets.length) ? offsets[idx] : (offsets[offsets.length - 1] + stepAfter * (idx - (offsets.length - 1)));
              const trim = (idx < trims.length) ? trims[idx] : trims[trims.length - 1];
              setPdfPageOverride(idx, 'templatesPdf.shiftRightMm', right);
              setPdfPageOverride(idx, 'templatesPdf.tightFudgeMm', off);
              setPdfPageOverride(idx, 'templatesPdf.extraTrimMm', trim);
              setPdfPageOverride(idx, 'templatesPdf.safeMarginMm', safe);
            });
            localStorage.setItem('templatesPdf.presetSeeded.v4', '1');
            try { localStorage.setItem('templatesPdf.globalAllYmm', '-1'); } catch(_) {}
            loadValuesForSelected();
          }
        }
      } catch(_) {}
      try {
        if (window.__pdfTunerMO) { try { window.__pdfTunerMO.disconnect(); } catch(_) {} }
        const wrap = document.querySelector('#templates-preview-host #templates-a4-root [data-a4-pages]') || document.querySelector('#templates-preview-host #templates-a4-root');
        if (wrap) {
          const mo = new MutationObserver(() => { try { refreshPagesList(); } catch(_) {} });
          mo.observe(wrap, { childList: true, subtree: true });
          window.__pdfTunerMO = mo;
        }
      } catch(_) {}
      renderPdfLivePreview();
    } else {
      try { if (window.__pdfTunerMO) { window.__pdfTunerMO.disconnect(); window.__pdfTunerMO = null; } } catch(_) {}
    }
  });
  panel.querySelector('#pdftun-page').addEventListener('change', () => { loadValuesForSelected(); });
  const bind = (id, key, perPage = true) => {
    const input = document.getElementById(id);
    input.addEventListener('input', () => {
      const v = input.value;
      if (perPage) {
        const sel = panel.querySelector('#pdftun-page').value || '0';
        setPdfPageOverride(Number(sel), key, v);
      } else {
        writePdfPref(key, v);
      }
      // no live preview
    });
    input.addEventListener('change', () => {
      const v = input.value;
      if (perPage) {
        const sel = panel.querySelector('#pdftun-page').value || '0';
        setPdfPageOverride(Number(sel), key, v);
      } else {
        writePdfPref(key, v);
      }
      // no live preview
  });
  };
  bind('pdftun-extraTrim', 'templatesPdf.extraTrimMm', true);
  bind('pdftun-safeMargin', 'templatesPdf.safeMarginMm', true);
  bind('pdftun-tightFudge', 'templatesPdf.tightFudgeMm', true);
  bind('pdftun-right', 'templatesPdf.shiftRightMm', true);
  bind('pdftun-scale', 'templatesPdf.scalePct', false);
  bind('pdftun-globalY', 'templatesPdf.globalAllYmm', false);
  bind('pdftun-globalX', 'templatesPdf.globalAllRightMm', false);

  // Apply recommended per-page alignment from provided screenshots
  const applyPreset = () => {
    const pages = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root .a4-page'));
    const right = 61; const safe = 0.5;
    // New series from latest screenshots
    const offsets = [-145, -290, -435, -580, -725]; // pages 1..5
    const trims =   [  14,   14,   14,   14,   14]; // 14 for all
    const stepAfter = -145; // for pages >5, keep same step
    pages.forEach((_, idx) => {
      const off = (idx < offsets.length) ? offsets[idx] : (offsets[offsets.length - 1] + stepAfter * (idx - (offsets.length - 1)));
      const trim = (idx < trims.length) ? trims[idx] : trims[trims.length - 1];
      setPdfPageOverride(idx, 'templatesPdf.shiftRightMm', right);
      setPdfPageOverride(idx, 'templatesPdf.tightFudgeMm', off);
      setPdfPageOverride(idx, 'templatesPdf.extraTrimMm', trim);
      setPdfPageOverride(idx, 'templatesPdf.safeMarginMm', safe);
    });
    try { localStorage.setItem('templatesPdf.globalAllYmm', '-1'); } catch (_) {}
    loadValuesForSelected();
    // no live preview
  };
  document.getElementById('pdftun-preset').addEventListener('click', applyPreset);

  document.getElementById('pdftun-reset').addEventListener('click', () => {
    try {
      ['templatesPdf.extraTrimMm','templatesPdf.safeMarginMm','templatesPdf.tightFudgeMm','templatesPdf.shiftRightMm','templatesPdf.scalePct','templatesPdf.globalYmm','templatesPdf.globalAllYmm','templatesPdf.globalAllRightMm'].forEach((k) => localStorage.removeItem(k));
      clearPdfPageOverrides();
    } catch (_) {}
    init();
  });
  document.getElementById('pdftun-print').addEventListener('click', printTemplatesPdf);
  // Expose refreshers for external calls after pages rebuild
  try { window.__pdfTunerRefreshPages = refreshPagesList; window.__pdfTunerLoadValues = loadValuesForSelected; } catch (_) {}
}

function populateProjectSelect() {
  const sel = document.getElementById('templates-project');
  if (!sel) return;
  const opts = getProjectsState().map((p) => ({ id: p.id, title: p.title || `#${p.id}` }));
  sel.innerHTML = '<option value="">— اختر —</option>' + opts.map((o) => `<option value="${String(o.id)}">${o.title}</option>`).join('');
}

function populateReservationSelect(projectId) {
  const sel = document.getElementById('templates-reservation');
  if (!sel) return;
  const list = projectId ? getReservationsForProjectLocal(projectId) : [];
  const options = ['<option value="" selected>— بدون ربط —</option>'];
  list.forEach((r) => {
    const id = r.id ?? r.reservationId;
    const label = (r.title || '').trim() || `#${id}`;
    options.push(`<option value="${String(id)}">${label}</option>`);
  });
  sel.innerHTML = options.join('');
}

function recomputeExpensesSubtotals() {
  const multi = Array.from(document.querySelectorAll('#templates-preview-host table.exp-details'));
  const table = document.querySelector('#templates-preview-host #expenses-table');
  const tables = multi.length ? multi : (table ? [table] : []);
  if (!tables.length) return;

  // New exp-table calculation (supports multi-table)
  if (tables[0].classList.contains('exp-table')) {
    const number = (txt, def = 0) => {
      const s = String(txt || '');
      // Convert Arabic/Persian digits and separators to ASCII without mutating the DOM
      const mapped = s
        .replace(/[\u0660-\u0669]/g, (d) => '0123456789'[d.charCodeAt(0) - 0x0660]) // Arabic-Indic
        .replace(/[\u06F0-\u06F9]/g, (d) => '0123456789'[d.charCodeAt(0) - 0x06F0]) // Eastern Arabic-Indic
        .replace(/[\u066B]/g, '.') // Arabic decimal separator
        .replace(/[\u066C]/g, '')  // Arabic thousands separator
        .replace(/[\u200f\u200e]/g, '') // remove RTL/LTR marks if any
        .replace(/[^\d.\-]/g, '');
      const n = Number(mapped);
      return Number.isFinite(n) ? n : def;
    };
    const groupTotals = { atl: 0, prod: 0, post: 0 };
    let grand = 0;
    const subgroupTotals = {}; // code -> subtotal
    const subgroupCounts = {}; // code -> count of filled items

    // For each subgroup header across all tables
    const headers = tables.flatMap((t) => Array.from(t.querySelectorAll('tbody tr[data-subgroup-header]')));
    headers.forEach((hdr) => {
      const code = hdr.getAttribute('data-subgroup');
      let subtotal = 0;
      let count = 0;
      let tr = hdr.nextElementSibling;
      while (tr && !tr.hasAttribute('data-subgroup-header') && !tr.hasAttribute('data-subgroup-subtotal')) {
        if (tr.getAttribute('data-row') === 'item') {
          const tds = tr.children;
          // Revert to previous mapping while we stabilize layout:
          // rate ~ tds[2], amount ~ tds[3], x ~ tds[4], total -> tds[6]
          const rate = number(tds[2]?.textContent, 0);
          const amount = number(tds[3]?.textContent, 1);
          const x = number(tds[4]?.textContent, 1);
          const total = amount * x * rate;
          if (tds[6]) { tds[6].textContent = formatIntNoDecimals(total); try { tds[6].setAttribute('data-num','1'); } catch(_) {} }
          subtotal += total;
          const hasContent = String(tds[1]?.textContent || '').trim().length || number(tds[2]?.textContent, 0) || number(tds[3]?.textContent, 0);
          if (hasContent) count += 1;
        }
        tr = tr.nextElementSibling;
      }
      // write subgroup subtotal
      const subCell = document.querySelector(`#templates-preview-host [data-subtotal="${CSS.escape(code)}"]`);
      if (subCell) subCell.textContent = formatIntNoDecimals(subtotal);
      subgroupTotals[code] = subtotal;
      subgroupCounts[code] = count;
      grand += subtotal;
      // map to parent group
      const marker = document.querySelector(`#templates-preview-host tr[data-subgroup-marker="${CSS.escape(code)}"]`);
      const parent = marker?.getAttribute('data-parent-group') || null;
      if (parent && groupTotals[parent] != null) groupTotals[parent] += subtotal;
    });

    // group totals
    Object.entries(groupTotals).forEach(([key, val]) => {
      const cell = document.querySelector(`#templates-preview-host [data-total-group="${CSS.escape(key)}"]`);
      if (cell) cell.textContent = formatIntNoDecimals(val);
    });
    const gcell = document.querySelector('#templates-preview-host [data-grand-total]');
    if (gcell) gcell.textContent = formatIntNoDecimals(grand);

    // Update Top Sheet summary figures
    try {
      Object.entries(subgroupTotals).forEach(([code, val]) => {
        const cnt = subgroupCounts[code] || 0;
        const cntEl = document.querySelector(`#templates-preview-host #expenses-top-sheet [data-top-count="${CSS.escape(code)}"]`);
        const totEl = document.querySelector(`#templates-preview-host #expenses-top-sheet [data-top-total="${CSS.escape(code)}"]`);
        if (cntEl) cntEl.textContent = formatIntNoDecimals(cnt);
        if (totEl) totEl.textContent = formatIntNoDecimals(val);
      });
      Object.entries(groupTotals).forEach(([key, val]) => {
        const el2 = document.querySelector(`#templates-preview-host #expenses-top-sheet [data-top-total-group="${CSS.escape(key)}"]`);
        if (el2) el2.textContent = formatIntNoDecimals(val);
      });
      const g2 = document.querySelector('#templates-preview-host #expenses-top-sheet [data-top-grand]');
      if (g2) g2.textContent = formatIntNoDecimals(grand);
    } catch(_) {}

    // Summary footer
    const project = getSelectedProject();
    const currencyLabel = t('reservations.create.summary.currency', 'SR');
    const applyTax = Boolean(project?.applyTax);
    const taxAmount = applyTax ? Math.round(grand * PROJECT_TAX_RATE) : 0;
    const totalWithTax = Math.round(grand + taxAmount);
    const subEl = document.querySelector('#expenses-summary [data-summary-subtotal]');
    const taxEl = document.querySelector('#expenses-summary [data-summary-tax]');
    const totalEl = document.querySelector('#expenses-summary [data-summary-total]');
    if (subEl) subEl.textContent = `${formatIntNoDecimals(grand)} ${currencyLabel}`;
    if (taxEl) taxEl.textContent = applyTax ? `${formatIntNoDecimals(taxAmount)} ${currencyLabel}` : `0 ${currencyLabel}`;
    if (totalEl) totalEl.textContent = `${formatIntNoDecimals(totalWithTax)} ${currencyLabel}`;
    // Avoid repagination while the user is typing inside an expenses editable cell
    try {
      const ae = document.activeElement;
      const isEditing = !!(ae && (ae.getAttribute('contenteditable') === 'true' || ae.closest('[contenteditable="true"]')) && ae.closest('#templates-a4-root table.exp-details'));
      if (!isEditing) {
        requestAnimationFrame(() => { try { autoPaginateTemplatesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl }); } catch (_) {} });
      }
    } catch (_) {}
    return;
  }

  // Legacy table fallback
  let running = 0;
  let grand = 0;
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  rows.forEach((tr) => {
    if (tr.matches('[data-section-bar]')) { running = 0; return; }
    if (tr.classList.contains('tpl-subtotal-row')) {
      const cell = tr.querySelector('[data-subtotal]') || tr.children[5];
      if (cell) cell.textContent = formatIntNoDecimals(running || 0);
      return;
    }
    const qty = Number(String(tr.children[3]?.textContent || '1').replace(/[^\d.\-]/g, '')) || 1;
    const rate = Number(String(tr.children[4]?.textContent || '0').replace(/[^\d.\-]/g, '')) || 0;
    const total = qty * rate;
    if (tr.children[5]) tr.children[5].textContent = formatIntNoDecimals(total);
    running += total;
    grand += total;
  });
  const project = getSelectedProject();
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const applyTax = Boolean(project?.applyTax);
  const taxAmount = applyTax ? Math.round(grand * PROJECT_TAX_RATE) : 0;
  const totalWithTax = Math.round(grand + taxAmount);
  const subEl = document.querySelector('#expenses-summary [data-summary-subtotal]');
  const taxEl = document.querySelector('#expenses-summary [data-summary-tax]');
  const totalEl = document.querySelector('#expenses-summary [data-summary-total]');
  if (subEl) subEl.textContent = `${formatIntNoDecimals(grand)} ${currencyLabel}`;
  if (taxEl) taxEl.textContent = applyTax ? `${formatIntNoDecimals(taxAmount)} ${currencyLabel}` : `0 ${currencyLabel}`;
  if (totalEl) totalEl.textContent = `${formatIntNoDecimals(totalWithTax)} ${currencyLabel}`;
  // Avoid repagination while typing in expenses cells
  try {
    const ae = document.activeElement;
    const isEditing = !!(ae && (ae.getAttribute('contenteditable') === 'true' || ae.closest('[contenteditable="true"]')) && ae.closest('#templates-a4-root table.exp-details'));
    if (!isEditing) {
      requestAnimationFrame(() => { try { autoPaginateTemplatesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl }); } catch (_) {} });
      requestAnimationFrame(() => { try { paginateExpDetailsTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl }); } catch (_) {} });
    }
  } catch (_) {}
}

 

// bindPreviewAdjustControls removed

/* moved to ../templates/expensesTools.js
function handleTableActionClick(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.getAttribute('data-action');
  const tr = btn.closest('tr');
  const tbody = tr?.parentElement;
  if (!tr || !tbody) return;
  if (action === 'row-up' && tr.previousElementSibling && !tr.previousElementSibling.matches('[data-section-bar]')) {
    tbody.insertBefore(tr, tr.previousElementSibling);
  } else if (action === 'row-down' && tr.nextElementSibling) {
    tbody.insertBefore(tr.nextElementSibling, tr);
  } else if (action === 'row-add') {
    const clone = tr.cloneNode(true);
    clone.querySelectorAll('[contenteditable]')?.forEach((el) => { el.textContent = ''; });
    tbody.insertBefore(clone, tr.nextElementSibling);
  } else if (action === 'row-delete') {
    tbody.removeChild(tr);
  }
  try { renumberExpenseCodes(); } catch (_) {}
  recomputeExpensesSubtotals();
  try { shrinkSingleWordCellsExt(tbody); } catch (_) {}
  // Persist structure/content changes into history + autosave
  try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch (_) {}
}
*/

// nextEditableRow/ensureExtraRows/parseClipboardTable/fillRowFromArray moved to module

// Auto-generate/renumber codes within each subgroup:
// If subgroup header is e.g. 01-00, then items become 01-01, 01-02, ...
function renumberExpenseCodes() {
  const root = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!root) return;
  const tables = Array.from(root.querySelectorAll('table.exp-details'));
  if (!tables.length) return;
  const counters = new Map(); // subgroupCode -> count assigned so far

  const isHeader = (tr) => tr?.hasAttribute('data-subgroup-header');
  const isSubtotal = (tr) => tr?.hasAttribute('data-subgroup-subtotal');
  const isItem = (tr) => tr?.getAttribute('data-row') === 'item';
  const getPrefix = (subCode) => String(subCode || '').split('-')[0] || '';

  tables.forEach((table) => {
    const rows = Array.from(table.querySelectorAll('tbody > tr'));
    let activeSubCode = null;
    let prefix = '';
    let count = 0;
    rows.forEach((tr) => {
      if (isHeader(tr)) {
        activeSubCode = tr.getAttribute('data-subgroup');
        prefix = getPrefix(activeSubCode);
        count = counters.get(activeSubCode) || 0;
        return;
      }
      if (isSubtotal(tr)) {
        counters.set(activeSubCode, count);
        activeSubCode = null; prefix = ''; return;
      }
      if (isItem(tr) && prefix) {
        count += 1;
        const codeCell = tr.children[0];
        if (codeCell && codeCell.hasAttribute('contenteditable')) {
          const serial = String(count).padStart(2, '0');
          codeCell.textContent = `${prefix}-${serial}`;
        }
      }
    });
    if (activeSubCode) counters.set(activeSubCode, count);
  });
}

/* moved to ../templates/tableInteractions.js
function handleTablePaste(e) {
  const target = e.target;
  const editable = target && (target.closest('[contenteditable]'));
  const table = target && target.closest('table.tpl-table');
  if (!editable || !table) return; // allow normal paste into non-table elements

  const plain = e.clipboardData?.getData('text/plain') ?? '';
  if (!plain || (!plain.includes('\t') && !plain.includes('\n'))) return; // Single-cell paste: let default happen

  e.preventDefault();

  const rows = parseClipboardTable(plain);
  if (!rows.length) return;

  const td = target.closest('td');
  const startCol = getCellIndex(td);
  const tbody = table.tBodies?.[0] || table.querySelector('tbody');
  if (!tbody) return;

  // Find a sample editable row to clone when needed
  let sampleRow = Array.from(tbody.children).find((r) => r && !isSpecialRow(r));
  // Ensure enough rows exist from current row onward
  let currentRow = td.parentElement;
  // Count how many editable rows remain including current
  let remaining = 0; let cursor = currentRow;
  while (cursor) { if (!isSpecialRow(cursor)) remaining += 1; cursor = cursor.nextElementSibling; }
  const deficit = rows.length - remaining;
  if (deficit > 0 && sampleRow) {
    ensureExtraRows(tbody, sampleRow, deficit);
  }

  // Write values row by row
  let tr = currentRow;
  rows.forEach((arr, i) => {
    // Skip special rows
    while (tr && isSpecialRow(tr)) tr = nextEditableRow(tr);
    if (!tr) return;
    const start = i === 0 ? startCol : 0;
    const normalized = arr.map((v) => {
      const s = String(v || '');
      const mapA = { '٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9' };
      const mapB = { '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9' };
      return s.replace(/[\u0660-\u0669]/g,(d)=>mapA[d]).replace(/[\u06F0-\u06F9]/g,(d)=>mapB[d]);
    });
    fillRowFromArray(tr, start, normalized);
    tr = nextEditableRow(tr) || tr?.nextElementSibling;
  });

  // Recompute totals for expenses tables
      if (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table') {
        recomputeExpensesSubtotalsDebounced();
      }
  try { shrinkSingleWordCellsExt(table); } catch (_) {}
}
*/

 

 

// shrinkSubHeaderLabels/shrinkSingleWordCells/shrinkScheduleHeaderLabels moved to ../templates/pagination.js

// Ensure Crew Call table exists (for older autosaves that predate this table)
function ensureCrewTableExists() {
  const root = document.getElementById('templates-a4-root');
  if (!root) return;
  const callsheet = root.querySelector('.callsheet-v1');
  if (!callsheet) return;
  const existing = callsheet.querySelector('table.cs-crew');
  if (existing) return;
  // Build a fresh crew table and append after schedule
  const crew = document.createElement('table');
  crew.className = 'tpl-table cs-crew';
  crew.setAttribute('data-editable-table', 'crew');
  const cols = [30, 34, 20, 16];
  const cg = document.createElement('colgroup');
  cols.forEach((w) => { const c = document.createElement('col'); c.setAttribute('style', `width:${w}%`); cg.appendChild(c); });
  crew.appendChild(cg);
  const thead = document.createElement('thead');
  const titleRow = document.createElement('tr');
  const titleTh = document.createElement('th'); titleTh.setAttribute('colspan', String(cols.length)); titleTh.className = 'cs-crew-title'; titleTh.textContent = 'Crew Call'; titleTh.style.textAlign = 'center'; titleTh.style.display = 'flex'; titleTh.style.alignItems = 'center'; titleTh.style.justifyContent = 'center'; titleTh.style.fontSize = '14px'; titleRow.appendChild(titleTh);
  thead.appendChild(titleRow);
  const trh = document.createElement('tr');
  ['Position', 'Name', 'Phone', 'Time'].forEach((label, i) => {
    const th = document.createElement('th'); th.textContent = label; th.setAttribute('style', `width:${cols[i]}%`); th.style.textAlign = 'center'; th.style.display = 'flex'; th.style.alignItems = 'center'; th.style.justifyContent = 'center'; th.style.fontSize = '12.5px'; trh.appendChild(th);
  });
  thead.appendChild(trh);
  crew.appendChild(thead);
  const tbody = document.createElement('tbody');
  for (let i = 0; i < 10; i += 1) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td'); td1.setAttribute('data-editable','true'); td1.setAttribute('contenteditable','true'); tr.appendChild(td1);
    const td2 = document.createElement('td'); td2.setAttribute('data-editable','true'); td2.setAttribute('contenteditable','true'); tr.appendChild(td2);
    const td3 = document.createElement('td'); td3.setAttribute('data-editable','true'); td3.setAttribute('contenteditable','true'); td3.setAttribute('dir','ltr'); td3.style.direction = 'ltr'; tr.appendChild(td3);
    const td4 = document.createElement('td'); td4.setAttribute('data-editable','true'); td4.setAttribute('contenteditable','true'); tr.appendChild(td4);
    tbody.appendChild(tr);
  }
  crew.appendChild(tbody);
  // Place after schedule if present, else append at end of callsheet
  const sched = callsheet.querySelector('table.cs-schedule');
  if (sched && sched.parentElement) sched.parentElement.insertBefore(crew, sched.nextSibling);
  else callsheet.appendChild(crew);
  // Repaginate and prune empty pages so it flows correctly
  try { setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 20); } catch(_) {}
}

/* moved to ../templates/tableInteractions.js
function handleTableKeydown(e) {
  const target = e.target;
  if (!target || !target.closest('table.tpl-table')) return;
  const table = target.closest('table.tpl-table');
  const tr = target.closest('tr');
  if (!tr) return;

  // Enter -> add row below
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const newRow = addRowBelow(tr);
    if (newRow) {
      focusFirstEditableCell(newRow);
      if (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table') {
        recomputeExpensesSubtotalsDebounced();
      }
    }
    try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 30); } catch (_) {}
    return;
  }

  // Alt+ArrowUp / Alt+ArrowDown to move row
  if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
    e.preventDefault();
    moveRow(tr, e.key === 'ArrowDown' ? 1 : -1);
    if (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table') {
      recomputeExpensesSubtotalsDebounced();
    }
    try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 30); } catch (_) {}
    return;
  }

  // Delete to remove row (avoid when selection spans text)
  if ((e.key === 'Delete' || e.key === 'Backspace') && e.ctrlKey) {
    e.preventDefault();
    deleteRow(tr);
    if (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table') {
      recomputeExpensesSubtotalsDebounced();
    }
    try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 30); } catch (_) {}
  }
}
*/

async function saveTemplateSnapshot({ copy = false } = {}) {
  const project = getSelectedProject();
  if (!project) {
    alert('اختر مشروعاً أولاً');
    throw new Error('No project selected');
  }
  const typeSel = document.getElementById('templates-type');
  const type = typeSel ? typeSel.value : 'expenses';
  const reservationSel = document.getElementById('templates-reservation');
  const reservationId = reservationSel && reservationSel.value ? Number(reservationSel.value) : null;
  const root = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!root) {
    alert('لا يوجد محتوى للحفظ');
    throw new Error('No template root to save');
  }
  const payload = { html: sanitizeHtmlForExport(root.outerHTML) };
  const nameInput = document.getElementById('templates-save-title');
  const customTitle = nameInput && nameInput.value ? String(nameInput.value).trim() : '';
  await apiRequest('/project-templates/', {
    method: 'POST',
    body: {
      project_id: Number(project.id),
      reservation_id: reservationId,
      type,
      title: customTitle || `${project.title || 'Template'} - ${type}`,
      data: payload,
    },
  });
  alert('تم حفظ القالب');
  try { localStorage.removeItem(getTemplatesContextKey()); } catch(_) {}
}

async function fetchSavedTemplatesForCurrent() {
  const project = getSelectedProject();
  if (!project) return [];
  const typeSel = document.getElementById('templates-type');
  const type = typeSel ? typeSel.value : 'expenses';
  let res = null; try { res = await apiRequest(`/project-templates/?project_id=${encodeURIComponent(project.id)}&type=${encodeURIComponent(type)}`); }
  catch(err) { notifyApiError(err, 'تعذر تحميل المحفوظات'); return []; }
  // Backend responds as { ok: true, data: [...] }
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res)) return res;
  if (res && Array.isArray(res.items)) return res.items;
  return [];
}

async function populateSavedTemplates() {
  const select = document.getElementById('templates-saved');
  if (!select) return;
  const prev = select.value || '';
  const items = await fetchSavedTemplatesForCurrent();
  select.innerHTML = '<option value="">— محفوظات —</option>' + items.map((it) => `<option value="${String(it.id)}">${(it.title || `#${it.id}`)}</option>`).join('');
  // try to keep previous selection if still present
  if (prev && Array.from(select.options).some(o => o.value === String(prev))) {
    select.value = String(prev);
  }
}

async function loadSnapshotById(id) {
  if (!id) return;
  let res = null; try { res = await apiRequest(`/project-templates/?id=${encodeURIComponent(id)}`); }
  catch(err) { notifyApiError(err, 'تعذر تحميل القالب'); return; }
  const payload = (res && typeof res === 'object' && 'data' in res) ? res.data : res;
  const item = Array.isArray(payload) ? payload[0] : payload;
  const host = document.getElementById('templates-preview-host');
  if (!host || !item) return;
  host.innerHTML = '';
  try {
    const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
    if (data?.html) {
      const wrap = document.createElement('div');
      wrap.innerHTML = data.html;
      const root = wrap.firstElementChild;
      if (root) host.appendChild(root);
    }
  } catch (_) {}
}

export function initTemplatesTab() {
  // Run immediately; caller ensures DOM is ready
  const projectSel = document.getElementById('templates-project');
  const reservationSel = document.getElementById('templates-reservation');
  const typeSel = document.getElementById('templates-type');
  const refreshBtn = document.getElementById('templates-refresh');
  const printBtn = document.getElementById('templates-print');
  const saveBtn = document.getElementById('templates-save');
  const saveCopyBtn = document.getElementById('templates-save-copy');
  const savedSel = document.getElementById('templates-saved');
  const fromResBtn = document.getElementById('templates-from-res');
  const renameBtn = document.getElementById('templates-rename');
  const deleteBtn = document.getElementById('templates-delete');
  const exportBtn = document.getElementById('templates-export');
  const importBtn = document.getElementById('templates-import');
  const importFile = document.getElementById('templates-import-file');
  try { console.debug('[templatesTab] init start'); } catch(_) {}

  if (!projectSel) return;

  // Initialize history with local hooks
  try {
    initHistory({
      getSnapshot: getTemplatesSnapshot,
      applySnapshot: applyTemplatesSnapshot,
      onAutosaveDebounced: saveAutosaveDebounced,
      onMarkEditing: markTemplatesEditingActivity,
    });
  } catch (_) {}

  // Restore last-used template type before first render
  restoreTplPreferredTypeIfAny(typeSel);
  populateProjectSelect();
  populateReservationSelect(projectSel.value || '');
  renderTemplatesPreview();
  (async () => { try { await populateSavedTemplates(); } catch {} })();

  projectSel.addEventListener('change', () => {
    populateReservationSelect(projectSel.value || '');
    renderTemplatesPreview();
    (async () => { try { await populateSavedTemplates(); } catch {} })();
  });
  reservationSel?.addEventListener('change', renderTemplatesPreview);
  typeSel?.addEventListener('change', () => {
    // Persist selection and re-render
    try { writeTplPreferredType(typeSel.value); } catch (_) {}
    renderTemplatesPreview();
    try { if (window.__pdfTunerLoadValues) window.__pdfTunerLoadValues(); } catch(_) {}
  });
  refreshBtn?.addEventListener('click', renderTemplatesPreview);
  if (printBtn) {
    printBtn.addEventListener('click', async (ev) => {
      try {
        ev.preventDefault(); ev.stopPropagation();
      } catch (_) {}
      try {
        // Close actions dropdown if open to avoid overlay issues
        try {
          const actionsMenu = document.getElementById('templates-actions-menu');
          if (actionsMenu) actionsMenu.style.display = 'none';
        } catch (_) {}
        // Disable to prevent double clicks
        const originalText = printBtn.textContent;
        printBtn.disabled = true;
        printBtn.textContent = '… جاري الطباعة';
        await printTemplatesPdf();
        // Success toast
        try { showToast('تم إنشاء ملف PDF', 'success', 3500); } catch (_) {}
        printBtn.textContent = originalText;
        printBtn.disabled = false;
      } catch (error) {
        console.error('❌ [templatesTab] print failed', error);
        try { showToast('تعذر إنشاء PDF، حاول مجددًا', 'error', 6000); } catch (_) { alert('تعذر إنشاء PDF، حاول مجددًا'); }
        try { printBtn.disabled = false; } catch (_) {}
      }
    });
  }
  // Dropdown actions menu toggle
  const actionsToggle = document.getElementById('templates-actions-toggle');
  const actionsMenu = document.getElementById('templates-actions-menu');
  const actionsDD = document.getElementById('templates-actions-dd');
  if (actionsToggle && actionsMenu) {
    // Add print preview button idempotently
    try {
      if (!document.getElementById('templates-print-preview')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-outline';
        btn.id = 'templates-print-preview';
        btn.textContent = '👁️ معاينة الطباعة';
        btn.style.cssText = 'display:block;width:100%;text-align:right;margin:4px 0;';
        btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); try { showPrintPreviewOverlay(); } catch(_) {} });
        actionsMenu.insertBefore(btn, actionsMenu.firstChild);
      }
    } catch(_) {}
    try {
      if (!document.getElementById('templates-fetch-crew')) {
        const sep = document.createElement('div'); sep.style.cssText = 'height:1px;background:#e5e7eb;margin:6px 0'; actionsMenu.appendChild(sep);
        const b1 = document.createElement('button'); b1.type='button'; b1.className='btn btn-outline'; b1.id='templates-fetch-crew'; b1.textContent='👥 جلب الطاقم (إكمال الفراغات)'; b1.style.cssText='display:block;width:100%;text-align:right;margin:4px 0;';
        const b2 = document.createElement('button'); b2.type='button'; b2.className='btn btn-outline'; b2.id='templates-fetch-crew-force'; b2.textContent='👥 جلب الطاقم (إعادة تعبئة)'; b2.style.cssText='display:block;width:100%;text-align:right;margin:4px 0;';
        b1.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); try { fetchCrewFromReservation(false); } catch(_) {} });
        b2.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); try { fetchCrewFromReservation(true); } catch(_) {} });
        actionsMenu.appendChild(b1); actionsMenu.appendChild(b2);
      }
    } catch(_) {}
    const closeMenu = (ev) => {
      if (!actionsDD?.contains(ev.target)) {
        actionsMenu.style.display = 'none';
        try {
          actionsDD.classList.remove('dropdown-open');
          const card = actionsDD.closest('.reports-surface-card');
          if (card) card.classList.remove('--raise-on-top');
          if (card) card.style.zIndex = '';
        } catch (_) {}
        document.removeEventListener('click', closeMenu, true);
      }
    };
    actionsToggle.addEventListener('click', (e2) => {
      e2.preventDefault(); e2.stopPropagation();
      const isOpen = actionsMenu.style.display === 'block';
      actionsMenu.style.display = isOpen ? 'none' : 'block';
      if (!isOpen) {
        try {
          actionsDD.classList.add('dropdown-open');
          const card = actionsDD.closest('.reports-surface-card');
          if (card) { card.classList.add('--raise-on-top'); card.style.zIndex = '12'; }
        } catch (_) {}
        document.addEventListener('click', closeMenu, true);
      } else {
        try {
          actionsDD.classList.remove('dropdown-open');
          const card = actionsDD.closest('.reports-surface-card');
          if (card) card.classList.remove('--raise-on-top');
          if (card) card.style.zIndex = '';
        } catch (_) {}
      }
    });
  }
  const langBtn = document.getElementById('templates-lang-toggle');
  if (langBtn) {
    const updateBtn = () => { langBtn.textContent = TEMPLATE_LANG === 'ar' ? '🌐 AR' : '🌐 EN'; langBtn.title = `Language: ${TEMPLATE_LANG.toUpperCase()}`; };
    updateBtn();
    langBtn.addEventListener('click', () => {
      setTemplateLang(TEMPLATE_LANG === 'ar' ? 'en' : 'ar');
      updateBtn();
      renderTemplatesPreview();
    });
  }

  // Keyboard shortcut: Alt+L toggles EN/AR for templates preview
  document.addEventListener('keydown', (e) => {
    if (e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey && (e.code === 'KeyL' || e.key.toLowerCase() === 'l')) {
      e.preventDefault();
      setTemplateLang(TEMPLATE_LANG === 'ar' ? 'en' : 'ar');
      if (langBtn) { langBtn.textContent = TEMPLATE_LANG === 'ar' ? '🌐 AR' : '🌐 EN'; langBtn.title = `Language: ${TEMPLATE_LANG.toUpperCase()}`; }
      renderTemplatesPreview();
    }
  }, true);

  // Preview adjust controls removed
  saveBtn?.addEventListener('click', () => {
    saveTemplateSnapshot({ copy: false })
      .then(populateSavedTemplates)
      .catch((e) => {
        const msg = (e && (e.message || e?.payload?.error || e?.payload?.details)) || 'تعذر الحفظ';
        alert(msg);
        try { console.error('[templates/save] error', e); } catch(_) {}
      });
  });
  saveCopyBtn?.addEventListener('click', () => {
    saveTemplateSnapshot({ copy: true })
      .then(populateSavedTemplates)
      .catch((e) => {
        const msg = (e && (e.message || e?.payload?.error || e?.payload?.details)) || 'تعذر الحفظ';
        alert(msg);
        try { console.error('[templates/saveCopy] error', e); } catch(_) {}
      });
  });
  savedSel?.addEventListener('change', () => { if (savedSel.value) loadSnapshotById(savedSel.value).catch(() => {}); });
  fromResBtn?.addEventListener('click', () => {
    if (typeSel) typeSel.value = 'callsheet';
    if (reservationSel && reservationSel.options.length > 1) reservationSel.selectedIndex = 1;
    renderTemplatesPreview();
  });

  // Saved templates management
  renameBtn?.addEventListener('click', async () => {
    const id = savedSel?.value || '';
    if (!id) { alert('اختر محفوظاً أولاً'); return; }
    const currentText = savedSel.options[savedSel.selectedIndex]?.textContent || '';
    const title = prompt('اسم جديد للمحفوظ:', currentText);
    if (!title || title.trim() === currentText) return;
    try {
      // Backend expects id in query string for PATCH
      try { await apiRequest(`/project-templates/?id=${encodeURIComponent(id)}`, { method: 'PATCH', body: { title: String(title).trim() } }); }
      catch(err) { notifyApiError(err, 'تعذر إعادة التسمية'); return; }
      await populateSavedTemplates();
      // re-select same id if still present
      const opt = Array.from(savedSel.options).find(o => o.value === String(id));
      if (opt) { savedSel.value = String(id); }
    } catch (e) {
      alert('تعذر إعادة التسمية');
    }
  });

  deleteBtn?.addEventListener('click', async () => {
    const id = savedSel?.value || '';
    if (!id) { alert('اختر محفوظاً أولاً'); return; }
    const ok = confirm('هل تريد حذف هذا المحفوظ نهائياً؟');
    if (!ok) return;
    try {
      try { await apiRequest(`/project-templates/?id=${encodeURIComponent(id)}`, { method: 'DELETE' }); }
      catch(err) { notifyApiError(err, 'تعذر حذف القالب'); return; }
      await populateSavedTemplates();
      // Reload preview to reflect removal
      renderTemplatesPreview();
    } catch (e) {
      alert('تعذر الحذف');
    }
  });

  exportBtn?.addEventListener('click', async () => {
    const id = savedSel?.value || '';
    if (!id) { alert('اختر محفوظاً أولاً'); return; }
    try {
      let res = null; try { res = await apiRequest(`/project-templates/?id=${encodeURIComponent(id)}`); }
      catch(err) { notifyApiError(err, 'تعذر تحميل القالب'); return; }
      const payload = (res && typeof res === 'object' && 'data' in res) ? res.data : res;
      const item = Array.isArray(payload) ? payload[0] : payload;
      if (!item) { alert('تعذر جلب المحفوظ'); return; }
      const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
      const blob = new Blob([JSON.stringify({
        meta: { id: item.id, title: item.title, type: item.type, project_id: item.project_id },
        data
      }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeTitle = (item.title || `template-${id}`).replace(/[^\w\-\s]/g, '').trim() || `template-${id}`;
      a.download = `${safeTitle}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (_) {
      alert('تعذر التصدير');
    }
  });

  importBtn?.addEventListener('click', () => { importFile?.click(); });
  importFile?.addEventListener('change', async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const project = getSelectedProject();
      if (!project) { alert('اختر مشروعاً أولاً'); return; }
      const typeSelEl = document.getElementById('templates-type');
      const type = typeSelEl ? typeSelEl.value : (json?.meta?.type || 'expenses');
      const reservationSelEl = document.getElementById('templates-reservation');
      const reservationId = reservationSelEl?.value ? Number(reservationSelEl.value) : null;
      const payload = json?.data?.html ? json.data : { html: document.querySelector('#templates-preview-host')?.innerHTML || '' };
      try { await apiRequest('/project-templates/', {
        method: 'POST',
        body: {
          project_id: Number(project.id),
          reservation_id: reservationId,
          type,
          title: json?.meta?.title || `Imported - ${type}`,
          data: payload,
        },
      }); }
      catch(err) { notifyApiError(err, 'تعذر الاستيراد'); return; }
      await populateSavedTemplates();
      alert('تم الاستيراد بنجاح');
    } catch (err) {
      alert('تعذر الاستيراد، تأكد من صحة ملف JSON');
    } finally {
      e.target.value = '';
    }
  });

  if (!TPL_EVENTS_BOUND) {
    TPL_EVENTS_BOUND = true;
    TPL_HOST_EL = document.getElementById('templates-preview-host');
    try {
      TPL_EXPENSES_UNBIND = bindExpensesRowActions(TPL_HOST_EL, {
        onRenumber: () => { try { renumberExpenseCodes(); } catch (_) {} },
        onTotalsChange: () => { try { recomputeExpensesSubtotals(); } catch (_) {} },
        onAfterChange: () => {
          try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch (_) {}
          try { setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 30); } catch(_) {}
        },
      });
    } catch (_) {}
    // Normalize compute path only (do not mutate text) and recompute on edits
    const onHostInput = (e) => {
      const el = e.target;
      if ((el instanceof HTMLElement) && el.isContentEditable) {
        try { markTemplatesEditingActivity(); } catch(_) {}
        // تحديث سريع للصف الحالي + مجموعاته لتجربة كتابة سلسة
        try { const td = el.closest('td'); if (td && td.closest('table.exp-details')) recomputeExpensesForCell(td); } catch(_) {}
        // احتياط: أعد الحساب الكامل مؤجلًا لتوحيد الأرقام عبر الجداول
        recomputeExpensesSubtotalsDebounced(260);
      }
    };
    TPL_LISTENERS.hostInput = onHostInput;
    TPL_HOST_EL?.addEventListener('input', onHostInput);
    // Add focus styling to avoid centered-caret glitches on Safari and make caret visible
    const onFocusInCell = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      // Mark the owning TD as editing even if the contenteditable is a child DIV
      const td = t.closest && t.closest('td');
      if (td) { try { td.classList.add('editing'); } catch(_) {} }
    };
    const onFocusOutCell = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      const td = t.closest && t.closest('td');
      if (td) { try { td.classList.remove('editing'); } catch(_) {} }
    };
    TPL_HOST_EL?.addEventListener('focusin', onFocusInCell, true);
    TPL_HOST_EL?.addEventListener('focusout', onFocusOutCell, true);
    TPL_LISTENERS.hostFocusIn = onFocusInCell;
    TPL_LISTENERS.hostFocusOut = onFocusOutCell;
    // Paste/keydown interactions via shared binder
    try {
      TPL_TABLE_UNBIND = bindTableInteractions(TPL_HOST_EL, {
        onAfterChange: () => {
          try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch (_) {}
          try { setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 30); } catch(_) {}
        },
        onTotalsChange: () => recomputeExpensesSubtotalsDebounced(),
      });
    } catch (_) {}
    // Ensure clicking a contenteditable cell always focuses caret (helps on Safari/iOS)
    const onMouseDown = (e) => {
      const td = e.target && (e.target.closest('[contenteditable]'));
      if (!td) return;
      try { setTimeout(() => { if (td && td.focus) td.focus(); }, 0); } catch(_) {}
    };
    TPL_HOST_EL?.addEventListener('mousedown', onMouseDown, true);
    // Store for cleanup
    TPL_LISTENERS.hostMouseDown = onMouseDown;
    try { ensurePdfTunerUI(); } catch (_) {}

  // (Row focus highlight removed per latest request)

  // Re-populate when data loads later (debounced + queued to avoid console spam)
  let repopulating = false;
  let repopulateQueued = false;
  // moved to module scope for cleanup: TPL_REPOPULATE_TIMER
  const REPOPULATE_DEBOUNCE_MS = 420;
  let lastRepopKey = '';

  const doRepopulate = async () => {
    if (repopulating || TPL_EDITING) { repopulateQueued = true; return; }
    repopulating = true;
    try { if (isTemplatesDebugEnabled()) console.debug('[templatesTab] repopulate start'); } catch(_) {}
    const before = (projectSel?.value || '');
    try {
      if (!getProjectsState()?.length) {
        await refreshProjectsFromApi();
      }
      if (!getReservationsState()?.length) {
        await refreshReservationsFromApi();
      }
    } catch (e) { try { if (isTemplatesDebugEnabled()) console.warn('[templatesTab] fetch fallback failed', e); } catch(_) {} }

    populateProjectSelect();
    if (!projectSel.value && projectSel.options.length > 1) {
      projectSel.selectedIndex = 1;
    } else if (before) {
      projectSel.value = before;
    }
    populateReservationSelect(projectSel.value || '');
    // Skip redundant rebuilds when target key unchanged
    const typeSel = document.getElementById('templates-type');
    const type = typeSel ? typeSel.value : 'expenses';
    const repKey = `${projectSel.value || ''}|${document.getElementById('templates-reservation')?.value || ''}|${type}`;
    if (repKey !== lastRepopKey) {
      lastRepopKey = repKey;
      renderTemplatesPreview();
    }
    try { await populateSavedTemplates(); } catch {}
    try { if (isTemplatesDebugEnabled()) console.debug('[templatesTab] repopulate done'); } catch(_) {}
    repopulating = false;
    if (repopulateQueued) {
      repopulateQueued = false;
      scheduleRepopulate();
    }
  };

  function scheduleRepopulate(delay = REPOPULATE_DEBOUNCE_MS) {
    // If currently running, flag a queued run; otherwise debounce
    if (repopulating || TPL_EDITING) { repopulateQueued = true; return; }
    if (TPL_REPOPULATE_TIMER) { clearTimeout(TPL_REPOPULATE_TIMER); TPL_REPOPULATE_TIMER = null; }
    TPL_REPOPULATE_TIMER = setTimeout(() => {
      TPL_REPOPULATE_TIMER = null;
      void doRepopulate();
    }, Math.max(0, delay));
  }

    const onProj = () => scheduleRepopulate();
    const onResC = () => scheduleRepopulate();
    const onResU = () => scheduleRepopulate();
    TPL_LISTENERS.projChanged = onProj;
    TPL_LISTENERS.resChanged = onResC;
    TPL_LISTENERS.resUpdated = onResU;
    document.addEventListener('projects:changed', onProj);
    document.addEventListener('reservations:changed', onResC);
    document.addEventListener('reservations:updated', onResU);

    const templatesTabBtn = document.querySelector('[data-project-subtab-target="projects-templates-tab"]');
    const onTabClick = () => scheduleRepopulate(0);
    TPL_LISTENERS.tabClick = onTabClick;
    templatesTabBtn?.addEventListener('click', onTabClick);

    // نفّذ إعادة التعبئة مرة واحدة عند فتح التبويب لتجنب التحديثات المتكررة
    scheduleRepopulate(0);
  }
  // Bind one-time destroy on leaving Templates sub-tab or projects section
  try {
    // Any projects sub-tab button that is not templates → destroy when clicked
    Array.from(document.querySelectorAll('.sub-tab-button[data-project-subtab-target]')).forEach((btn) => {
      const target = btn.getAttribute('data-project-subtab-target') || '';
      if (target !== 'projects-templates-tab' && btn.dataset.tplDestroyBound !== '1') {
        btn.addEventListener('click', () => { try { destroyTemplatesTab(); } catch (_) {} });
        btn.dataset.tplDestroyBound = '1';
      }
    });
    // If switching main tabs away from projects, also destroy
    Array.from(document.querySelectorAll('.tab-button[data-tab-target]')).forEach((btn) => {
      const target = btn.getAttribute('data-tab-target') || '';
      if (target !== 'projects-section' && btn.dataset.tplDestroyMainBound !== '1') {
        btn.addEventListener('click', () => { try { destroyTemplatesTab(); } catch (_) {} });
        btn.dataset.tplDestroyMainBound = '1';
      }
    });
  } catch (_) {}
  // Ensure zoom controls are present once controls mount (idempotent)
  try { ensureTemplatesZoomUI(); } catch (_) {}
}

export default { initTemplatesTab, destroyTemplatesTab };
