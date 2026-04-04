import '../../styles/templatesA4.css';
import { t } from '../language.js';
import { getProjectsState, refreshProjectsFromApi } from '../projectsService.js';
import { getReservationsState, refreshReservationsFromApi } from '../reservationsService.js';
import { getTechniciansState, refreshTechniciansFromApi } from '../techniciansService.js';
import { ensureTechnicianPositionsLoaded } from '../technicianPositions.js';
import { ensureHtml2Pdf, loadExternalScript } from '../reports/external.js';
import { ensureXlsxStyled, exportCallsheetToExcel } from '../templates/excelExport.js';
// Table interactions are handled via templates/tableInteractions.js; no direct tableTools use here
import { buildCallSheetPage as buildCallSheetPageExt, populateCrewFromReservation as populateCrewFromReservationExt, populateCrewFromReservationIfEmpty as populateCrewFromReservationIfEmptyExt } from '../templates/build/callsheet.js';
import { buildExpensesPage as buildExpensesPageExt } from '../templates/build/expenses.js';
import { pageHasMeaningfulContent } from '../templates/pageUtils.js';
import { ensureAssetsReady } from '../templates/assets.js';
import { initHistory, pushHistoryDebounced, undoTemplatesChange, redoTemplatesChange, setupTemplatesHistory, pushTemplatesHistory } from '../templates/history.js';
import { ensureCellToolbar as ensureCellToolbarExt } from '../templates/toolbar.js';
import { autoPaginateTemplates as autoPaginateTemplatesExt, paginateExpDetailsTables as paginateExpDetailsTablesExt, paginateGenericTplTables as paginateGenericTplTablesExt, pruneEmptyA4Pages as pruneEmptyA4PagesExt, trimTrailingEmptyRows as trimTrailingEmptyRowsExt, shrinkSingleWordCells as shrinkSingleWordCellsExt, shrinkScheduleHeaderLabels as shrinkScheduleHeaderLabelsExt } from '../templates/pagination.js';
import { bindExpensesRowActions } from '../templates/expensesTools.js';
import { bindTableInteractions } from '../templates/tableInteractions.js';
import quoteLogoUrl from '../../assets/AR-Logo-v3.5-curved-WH.png?url';
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
import { templatesTabState } from './templatesTab/state';
import {
  formatIntNoDecimals,
  getReservationsForProject,
  getSelectedProject,
  getSelectedReservations,
  getTemplateLang,
  getTemplatesContextKey,
  normalizeLegacyAssetUrl,
  normalizeTemplateHtmlLegacyUrls,
  readHeaderFooterOptions,
  restoreTplPreferredTypeIfAny,
  setTemplateLang,
  writeTplPreferredType,
} from './templatesTab/context';
import {
  autosaveTemplateToServer as autosaveTemplateToServerExt,
  autosaveToServerDebounced as autosaveToServerDebouncedExt,
  ensureRemoteAutosaveId as ensureRemoteAutosaveIdExt,
  readRemoteAutosaveId as readRemoteAutosaveIdExt,
  sanitizeHtmlForExport as sanitizeHtmlForExportExt,
  writeRemoteAutosaveId as writeRemoteAutosaveIdExt,
} from './templatesTab/autosave';
import {
  fetchSavedTemplatesForProject as fetchSavedTemplatesForProjectExt,
  populateSavedTemplatesSelect as populateSavedTemplatesSelectExt,
  saveTemplateSnapshotRequest as saveTemplateSnapshotRequestExt,
} from './templatesTab/saved-templates';
import {
  buildTemplateExportFilename,
  createTemplateExportBlob,
  findDraftTemplate,
  resolveImportedTemplateRequest,
} from './templatesTab/io';
import {
  createTemplatesCompositionHandlers,
  createTemplatesFocusHandlers,
  createTemplatesHostInputHandler,
  createTemplatesMouseDownHandler,
  createTemplatesRepopulateController,
  populateProjectSelectOptions,
  populateReservationSelectOptions,
} from './templatesTab/controller';
import {
  ensureCrewOnSecondPage as ensureCrewOnSecondPageExt,
  ensureCrewTableExists as ensureCrewTableExistsExt,
  ensureSingleCrewTableStrict as ensureSingleCrewTableStrictExt,
  purgeCrewCallTables as purgeCrewCallTablesExt,
  unifyCrewCallTables as unifyCrewCallTablesExt,
} from './templatesTab/crew';
import {
  recomputeExpensesSubtotals as recomputeExpensesSubtotalsExt,
  renumberExpenseCodes as renumberExpenseCodesExt,
} from './templatesTab/expenses';
import {
  attachCallsheetLogoBehaviors as attachCallsheetLogoBehaviorsExt,
  ensureLogoControls as ensureLogoControlsExt,
  readPrimaryLogoState,
  readSecondaryLogoState,
  writePrimaryLogoState,
  writeSecondaryLogoState,
} from './templatesTab/formatting';
import {
  clearPdfPageOverrides,
  ensurePdfTunerUI as ensurePdfTunerUIExt,
  getPdfPageOverrides,
  readPdfPref,
  readPdfPrefForPage,
  readPdfString,
  setPdfPageOverride,
  showPrintPreviewOverlay as showPrintPreviewOverlayExt,
  writePdfPref,
} from './templatesTab/pdf';
import {
  enforceCallsheetSizing as enforceCallsheetSizingExt,
  fixCallsheetStructure as fixCallsheetStructureExt,
  loadSnapshotById as loadSnapshotByIdExt,
  renderTemplatesPreview as renderTemplatesPreviewExt,
} from './templatesTab/preview';
import {
  applyTemplatesSnapshot as applyTemplatesSnapshotExt,
  applyTemplatesSnapshotInPlace as applyTemplatesSnapshotInPlaceExt,
  getTemplatesSnapshot as getTemplatesSnapshotExt,
  markTemplatesEditingActivity as markTemplatesEditingActivityExt,
  restoreTemplatesAutosaveIfPresent as restoreTemplatesAutosaveIfPresentExt,
  saveAutosaveDebounced as saveAutosaveDebouncedExt,
  saveTemplatesAutosaveToStorage as saveTemplatesAutosaveToStorageExt,
} from './templatesTab/snapshot';
import {
  adjustTemplatesPreviewZoom,
  applyTemplatesFitZoom,
  applyTemplatesPreviewZoom,
  ensureResizeBinding,
  ensureResizeObserver,
  ensureTemplatesZoomUI,
  readTplZoomModePref,
  readTplZoomPref,
  setTemplatesPreviewZoom,
  writeTplZoomModePref,
} from './templatesTab/zoom';

// Templates A4 preview zoom state and controls
let TPL_EVENTS_BOUND = false; // avoid duplicate listeners / timers
let TPL_LISTENERS = { hostInput: null, hostMouseDown: null, hostFocusIn: null, hostFocusOut: null, hostCompStart: null, hostCompEnd: null, projChanged: null, resChanged: null, resUpdated: null, tabClick: null };
let TPL_HOST_EL = null;
let TPL_REPOPULATE_TIMER = null;
let TPL_TABLE_UNBIND = null;
let TPL_SUBTOTAL_TIMER = null;
let TPL_EXPENSES_UNBIND = null;
let TPL_IS_COMPOSING = false;
let TPL_INPUT_TIMER = null;
let TPL_ENFORCE_TIMER = null; // debounce schedule sizing enforcement during typing

// Enforce sizing for Call Sheet tables regardless of CSS precedence/caching
function enforceCallsheetSizing(scope) {
  enforceCallsheetSizingExt(scope);
}
// Expose a global hook for toolbar actions to call after row changes
try { window.__enforceCallsheetSizing = enforceCallsheetSizing; } catch(_) {}

// If cs-crew or cs-schedule are orphaned (not under .callsheet-v1), wrap them correctly
function fixCallsheetStructure(root) {
  fixCallsheetStructureExt(root);
}

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
      try { if (TPL_LISTENERS.hostCompStart) host.removeEventListener('compositionstart', TPL_LISTENERS.hostCompStart, true); } catch (_) {}
      try { if (TPL_LISTENERS.hostCompEnd) host.removeEventListener('compositionend', TPL_LISTENERS.hostCompEnd, true); } catch (_) {}
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
    if (templatesTabState.resizeObserver) { try { templatesTabState.resizeObserver.disconnect(); } catch (_) {} templatesTabState.resizeObserver = null; }
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

function ensureLogoControls(type = 'expenses') {
  ensureLogoControlsExt(type, {
    getContextKey: getTemplatesContextKey,
    companyInfo: COMPANY_INFO,
    renderPreview: () => { try { renderTemplatesPreview(); } catch(_) {} },
    undoChange: () => { try { undoTemplatesChange(); } catch(_) {} },
    redoChange: () => { try { redoTemplatesChange(); } catch(_) {} },
    notifyApiError,
    pushHistoryDebounced: () => { try { pushHistoryDebounced(); } catch(_) {} },
    saveAutosaveDebounced: () => { try { saveAutosaveDebounced(); } catch(_) {} },
    markEditing: () => { try { markTemplatesEditingActivity(); } catch(_) {} },
  });
}

function attachCallsheetLogoBehaviors(root) {
  attachCallsheetLogoBehaviorsExt(root, {
    pushHistoryDebounced: () => { try { pushHistoryDebounced(); } catch(_) {} },
    saveAutosaveDebounced: () => { try { saveAutosaveDebounced(); } catch(_) {} },
    markEditing: () => { try { markTemplatesEditingActivity(); } catch(_) {} },
  });
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

const COMPANY_INFO = {
  logoUrl: quoteLogoUrl,
  companyName: 'شركة فود آرت للدعاية والإعلان (شركة شخص واحد)',
  companyCR: '4030485240',
  companyLicense: '159460'
};
// Removed temporary preview padding adjustment logic per request

 



 

 

function markTemplatesEditingActivity() {
  markTemplatesEditingActivityExt({
    autosaveToServerDebounced: () => {
      try { autosaveToServerDebounced(); } catch(_) {}
    },
  });
}

function saveTemplatesAutosaveToStorage() {
  saveTemplatesAutosaveToStorageExt({
    getContextKey: getTemplatesContextKey,
    getSnapshot: getTemplatesSnapshot,
  });
}
function saveAutosaveDebounced() {
  saveAutosaveDebouncedExt({
    getContextKey: getTemplatesContextKey,
    getSnapshot: getTemplatesSnapshot,
  });
}
function restoreTemplatesAutosaveIfPresent() {
  restoreTemplatesAutosaveIfPresentExt({
    getContextKey: getTemplatesContextKey,
    companyInfo: COMPANY_INFO,
    normalizeTemplateHtmlLegacyUrls,
    ensureCellToolbar: ensureCellToolbarExt,
    onToolbarAfterChange: () => {
      try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch (_) {}
      try { setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 30); } catch(_) {}
    },
    attachCallsheetLogoBehaviors,
    unifyCrewCallTables,
    ensureSingleCrewTableStrict,
    enforceCallsheetSizing,
    pruneEmptyA4Pages: pruneEmptyA4PagesExt,
    pushTemplatesHistory: () => { try { pushTemplatesHistory(); } catch(_) {} },
    applyTemplatesPreviewZoom,
    writePrimaryLogoState,
    writeSecondaryLogoState,
    applyShadingSnapshot,
  });
}

function getTemplatesSnapshot() {
  return getTemplatesSnapshotExt({
    snapshotShading,
    readPrimaryLogoState,
    readSecondaryLogoState,
  });
}
function applyTemplatesSnapshotInPlace(snap) {
  applyTemplatesSnapshotInPlaceExt({
    snap,
    writePrimaryLogoState,
    writeSecondaryLogoState,
    applyShadingSnapshot,
  });
}
function applyTemplatesSnapshot(snap) {
  applyTemplatesSnapshotExt({
    snap,
    writePrimaryLogoState,
    writeSecondaryLogoState,
    renderPreview: () => { try { renderTemplatesPreview(); } catch(_) {} },
  });
}

// ===== Backend autosave (persist full HTML per project/type/reservation) =====
function readRemoteAutosaveId() {
  return readRemoteAutosaveIdExt(getTemplatesContextKey());
}
function writeRemoteAutosaveId(id) {
  writeRemoteAutosaveIdExt(getTemplatesContextKey(), id);
}
function sanitizeHtmlForExport(html) {
  return sanitizeHtmlForExportExt(html, COMPANY_INFO);
}
async function ensureRemoteAutosaveId() {
  const project = getSelectedProject();
  if (!project) return null;
  const typeSel = document.getElementById('templates-type');
  const type = typeSel ? typeSel.value : 'expenses';
  const reservationSel = document.getElementById('templates-reservation');
  const reservationId = reservationSel && reservationSel.value ? Number(reservationSel.value) : null;
  const host = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!host) return null;
  return ensureRemoteAutosaveIdExt({
    contextKey: getTemplatesContextKey(),
    fetchSavedTemplates: fetchSavedTemplatesForCurrent,
    projectId: Number(project.id),
    type,
    reservationId,
    hostHtml: host.outerHTML,
    companyInfo: COMPANY_INFO,
    apiRequestFn: apiRequest,
  });
}
async function autosaveTemplateToServer() {
  const host = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!host) return;
  return autosaveTemplateToServerExt({
    contextKey: getTemplatesContextKey(),
    hostHtml: host.outerHTML,
    companyInfo: COMPANY_INFO,
    ensureId: ensureRemoteAutosaveId,
    apiRequestFn: apiRequest,
    onError: (err) => notifyApiError(err, 'تعذر الحفظ التلقائي'),
  });
}
function autosaveToServerDebounced() {
  autosaveToServerDebouncedExt(() => autosaveTemplateToServer(), 800);
}

// Snapshot/restore shading by table,row,cell indices for Call Sheet
// History wiring provided by templates/history.js

 

function renderTemplatesPreview() {
  renderTemplatesPreviewExt({
    companyInfo: COMPANY_INFO,
    emptyMessage: t('projects.templates.empty', 'اختر مشروعاً لبدء إنشاء القوالب.'),
    getSelectedProject,
    getSelectedReservations,
    getTemplateType: () => document.getElementById('templates-type')?.value || 'expenses',
    readHeaderFooterOptions,
    ensureLogoControls,
    buildCallSheetPage: buildCallSheetPageExt,
    buildExpensesPage: buildExpensesPageExt,
    setupTemplatesHistory,
    ensureCellToolbar: ensureCellToolbarExt,
    onToolbarAfterChange: () => {
      try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch (_) {}
      try { setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 30); } catch(_) {}
    },
    shrinkScheduleHeaderLabels: shrinkScheduleHeaderLabelsExt,
    purgeCrewCallTables,
    ensureCrewTableExists,
    ensureCrewOnSecondPage,
    unifyCrewCallTables,
    ensureSingleCrewTableStrict,
    populateCrewFromReservationIfEmpty: populateCrewFromReservationIfEmptyExt,
    ensureTechnicianPositionsLoaded,
    getTechniciansState,
    refreshTechniciansFromApi,
    renumberExpenseCodes,
    recomputeExpensesSubtotals,
    autoPaginateTemplates: autoPaginateTemplatesExt,
    paginateExpDetailsTables: paginateExpDetailsTablesExt,
    pruneEmptyA4Pages: pruneEmptyA4PagesExt,
    paginateGenericTplTables: paginateGenericTplTablesExt,
    ensurePdfTunerUI,
    readTplZoomModePref,
    readTplZoomPref,
    applyTemplatesFitZoom,
    setTemplatesPreviewZoom,
    zoomValueEl: templatesTabState.zoomValueEl,
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
    const DEFAULTS = { expenses: 'portrait', callsheet: 'landscape' };
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
  showPrintPreviewOverlayExt({
    onPrint: () => printTemplatesPdf(),
  });
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
  ensurePdfTunerUIExt({
    onPrint: () => printTemplatesPdf(),
    onRenderPreview: () => renderPdfLivePreview(),
  });
}

function populateProjectSelect() {
  const sel = document.getElementById('templates-project');
  if (!(sel instanceof HTMLSelectElement)) return;
  populateProjectSelectOptions(sel, getProjectsState());
}

function populateReservationSelect(projectId) {
  const sel = document.getElementById('templates-reservation');
  if (!(sel instanceof HTMLSelectElement)) return;
  populateReservationSelectOptions(sel, projectId ? getReservationsForProject(projectId) : []);
}

function recomputeExpensesSubtotals() {
  recomputeExpensesSubtotalsExt({
    formatIntNoDecimals,
    getSelectedProject,
    projectTaxRate: PROJECT_TAX_RATE,
    translate: t,
    autoPaginateTemplates: () => autoPaginateTemplatesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl }),
    paginateExpDetailsTables: () => paginateExpDetailsTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl }),
  });
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
  renumberExpenseCodesExt();
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
  ensureCrewTableExistsExt({
    onAfterCreate: () => {
      try { setTimeout(() => { paginateGenericTplTablesExt({ headerFooter: false, logoUrl: COMPANY_INFO.logoUrl, isLandscape: true }); pruneEmptyA4PagesExt(); }, 20); } catch(_) {}
    },
  });
}

// Forcefully remove all Crew Call tables and rebuild the standard 4-column grid
function purgeCrewCallTables() {
  purgeCrewCallTablesExt();
}

// Ensure Crew table lives on the second page, separate from schedule
function ensureCrewOnSecondPage() {
  ensureCrewOnSecondPageExt();
}

// Keep one Crew Call table only: move filled rows from duplicates to the primary and remove the rest.
function unifyCrewCallTables() {
  unifyCrewCallTablesExt();
}

// Strict single-crew enforcement: detect any crew-like tables (Arabic/English),
// keep one canonical table (prefer cs-crew on page 2), merge rows from other
// standard cs-crew tables, and remove the rest.
function ensureSingleCrewTableStrict() {
  ensureSingleCrewTableStrictExt();
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
  const nameInput = document.getElementById('templates-save-title');
  const customTitle = nameInput && nameInput.value ? String(nameInput.value).trim() : '';
  await saveTemplateSnapshotRequestExt({
    apiRequestFn: apiRequest,
    project,
    type,
    reservationId,
    rootHtml: root.outerHTML,
    customTitle,
    sanitizedHtml: sanitizeHtmlForExport(root.outerHTML),
    contextKey: getTemplatesContextKey(),
    clearLocalAutosave: (contextKey) => {
      try { localStorage.removeItem(contextKey); } catch (_) {}
    },
  });
  alert('تم حفظ القالب');
}

async function fetchSavedTemplatesForCurrent() {
  const project = getSelectedProject();
  if (!project) return [];
  const typeSel = document.getElementById('templates-type');
  const type = typeSel ? typeSel.value : 'expenses';
  return fetchSavedTemplatesForProjectExt({
    apiRequestFn: apiRequest,
    projectId: project.id,
    type,
  });
}

async function populateSavedTemplates() {
  const select = document.getElementById('templates-saved');
  if (!select) return;
  const before = Array.from(select.options).slice(1).map((o) => ({ id: o.value, title: o.textContent }));
  const items = await fetchSavedTemplatesForCurrent();
  populateSavedTemplatesSelectExt(select, items, before);
}

async function loadSnapshotById(id) {
  await loadSnapshotByIdExt({
    id,
    apiRequestFn: apiRequest,
    notifyApiError,
    companyInfo: COMPANY_INFO,
    normalizeTemplateHtmlLegacyUrls,
    fixCallsheetStructure,
    unifyCrewCallTables,
    ensureSingleCrewTableStrict,
    ensureCrewOnSecondPage,
    enforceCallsheetSizing,
    shrinkScheduleHeaderLabels: shrinkScheduleHeaderLabelsExt,
    pruneEmptyA4Pages: pruneEmptyA4PagesExt,
    attachCallsheetLogoBehaviors,
    ensureCellToolbar: ensureCellToolbarExt,
    onToolbarAfterChange: () => {
      try { pushHistoryDebounced(); saveAutosaveDebounced(); markTemplatesEditingActivity(); } catch(_) {}
    },
  });
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
  const exportExcelBtn = document.getElementById('templates-export-excel');
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
    // Add "new blank template" action
    try {
      if (!document.getElementById('templates-new')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-outline';
        btn.id = 'templates-new';
        btn.textContent = '🆕 قالب جديد (فارغ)';
        btn.style.cssText = 'display:block;width:100%;text-align:right;margin:4px 0;';
        btn.addEventListener('click', (e) => {
          e.preventDefault(); e.stopPropagation();
          try {
            const key = getTemplatesContextKey();
            localStorage.removeItem(key);
            const ridKey = `remoteAutosaveId:${key}`;
            localStorage.removeItem(ridKey);
          } catch(_) {}
          try { showToast('تم إنشاء قالب فارغ', 'success', 2000); } catch(_) {}
          try { renderTemplatesPreview(); } catch(_) {}
        });
        actionsMenu.insertBefore(btn, actionsMenu.firstChild);
      }
    } catch(_) {}
    // Add "load last draft" action
    try {
      if (!document.getElementById('templates-load-last')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-outline';
        btn.id = 'templates-load-last';
        btn.textContent = '📥 تحميل آخر مسودة';
        btn.style.cssText = 'display:block;width:100%;text-align:right;margin:4px 0;';
        btn.addEventListener('click', async (e) => {
          e.preventDefault(); e.stopPropagation();
          try {
            const id = readRemoteAutosaveId();
            if (id) {
              await loadSnapshotById(id);
            } else {
              const items = await fetchSavedTemplatesForCurrent();
              const draft = findDraftTemplate(items || []);
              if (draft && draft.id) await loadSnapshotById(draft.id);
            }
            try { showToast('تم تحميل المسودة', 'success', 2000); } catch(_) {}
          } catch(_) {
            try { showToast('تعذر تحميل المسودة', 'error', 2500); } catch(_) {}
          }
        });
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
    const updateBtn = () => { langBtn.textContent = getTemplateLang() === 'ar' ? '🌐 AR' : '🌐 EN'; langBtn.title = `Language: ${getTemplateLang().toUpperCase()}`; };
    updateBtn();
    langBtn.addEventListener('click', () => {
      setTemplateLang(getTemplateLang() === 'ar' ? 'en' : 'ar');
      updateBtn();
      renderTemplatesPreview();
    });
  }

  // Keyboard shortcut: Alt+L toggles EN/AR for templates preview
  document.addEventListener('keydown', (e) => {
    if (e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey && (e.code === 'KeyL' || e.key.toLowerCase() === 'l')) {
      e.preventDefault();
      setTemplateLang(getTemplateLang() === 'ar' ? 'en' : 'ar');
      if (langBtn) { langBtn.textContent = getTemplateLang() === 'ar' ? '🌐 AR' : '🌐 EN'; langBtn.title = `Language: ${getTemplateLang().toUpperCase()}`; }
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
      const blob = createTemplateExportBlob(item);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = buildTemplateExportFilename(item, id);
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (_) {
      alert('تعذر التصدير');
    }
  });

  // Export call sheet to Excel with styles (xlsx-js-style)
  exportExcelBtn?.addEventListener('click', async (e) => {
    e?.preventDefault?.(); e?.stopPropagation?.();
    try {
      const type = document.getElementById('templates-type')?.value || 'expenses';
      if (type !== 'callsheet') { alert('التصدير إلى Excel متاح في الكول شيت فقط'); return; }
      const root = document.querySelector('#templates-preview-host #templates-a4-root');
      if (!root) { alert('لا توجد معاينة للكول شيت'); return; }
      // Ensure library then export
      await ensureXlsxStyled();
      await exportCallsheetToExcel(root);
    } catch (err) {
      console.error('[templates/export-excel] failed', err);
      alert('تعذر التصدير إلى Excel');
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
      const payload = resolveImportedTemplateRequest({
        json,
        project,
        type,
        reservationId,
        fallbackHtml: document.querySelector('#templates-preview-host')?.innerHTML || '',
      });
      try { await apiRequest('/project-templates/', {
        method: 'POST',
        body: payload,
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
    const onHostInput = createTemplatesHostInputHandler({
      timers: {
        get inputTimer() { return TPL_INPUT_TIMER; },
        set inputTimer(value) { TPL_INPUT_TIMER = value; },
        get enforceTimer() { return TPL_ENFORCE_TIMER; },
        set enforceTimer(value) { TPL_ENFORCE_TIMER = value; },
      },
      isComposing: () => TPL_IS_COMPOSING,
      markEditing: () => { markTemplatesEditingActivity(); },
      recomputeSubtotalsDebounced: (delay) => recomputeExpensesSubtotalsDebounced(delay),
      enforceCallsheetSizing: () => {
        try { if (typeof window.__enforceCallsheetSizing === 'function') window.__enforceCallsheetSizing(); } catch(_) {}
      },
    });
    TPL_LISTENERS.hostInput = onHostInput;
    TPL_HOST_EL?.addEventListener('input', onHostInput);
    const { onCompositionStart: onCompStart, onCompositionEnd: onCompEnd } = createTemplatesCompositionHandlers({
      setComposing: (value) => { TPL_IS_COMPOSING = value; },
      handleInput: onHostInput,
      enforceCallsheetSizing: () => {
        try { if (typeof window.__enforceCallsheetSizing === 'function') window.__enforceCallsheetSizing(); } catch(_) {}
      },
    });
    TPL_LISTENERS.hostCompStart = onCompStart;
    TPL_LISTENERS.hostCompEnd = onCompEnd;
    TPL_HOST_EL?.addEventListener('compositionstart', onCompStart, true);
    TPL_HOST_EL?.addEventListener('compositionend', onCompEnd, true);
    const { onFocusIn: onFocusInCell, onFocusOut: onFocusOutCell } = createTemplatesFocusHandlers({
      recomputeSubtotalsDebounced: (delay) => recomputeExpensesSubtotalsDebounced(delay),
      enforceCallsheetSizing: () => {
        try { if (typeof window.__enforceCallsheetSizing === 'function') window.__enforceCallsheetSizing(); } catch(_) {}
      },
    });
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
    const onMouseDown = createTemplatesMouseDownHandler();
    TPL_HOST_EL?.addEventListener('mousedown', onMouseDown, true);
    // Store for cleanup
    TPL_LISTENERS.hostMouseDown = onMouseDown;
    try { ensurePdfTunerUI(); } catch (_) {}

  // (Row focus highlight removed per latest request)

  const { scheduleRepopulate } = createTemplatesRepopulateController({
    timerRef: {
      get current() { return TPL_REPOPULATE_TIMER; },
      set current(value) { TPL_REPOPULATE_TIMER = value; },
    },
    projectSelect: projectSel,
    getReservationValue: () => document.getElementById('templates-reservation')?.value || '',
    getType: () => document.getElementById('templates-type')?.value || 'expenses',
    isEditing: () => templatesTabState.editing,
    refreshProjectsIfNeeded: async () => {
      if (!getProjectsState()?.length) await refreshProjectsFromApi();
    },
    refreshReservationsIfNeeded: async () => {
      if (!getReservationsState()?.length) await refreshReservationsFromApi();
    },
    populateProjectSelect: () => populateProjectSelect(),
    populateReservationSelect: (projectId) => populateReservationSelect(projectId),
    renderPreview: () => renderTemplatesPreview(),
    populateSavedTemplates: () => populateSavedTemplates(),
    isDebugEnabled: () => isTemplatesDebugEnabled(),
  });

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
