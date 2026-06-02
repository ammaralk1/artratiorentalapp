import '../../styles/templatesA4.css';
import { t } from '../language.js';
import { getProjectsState, refreshProjectsFromApi } from '../projectsService.js';
import { fetchReservationWithDetails, getReservationsState, refreshReservationsFromApi } from '../reservationsService.js';
import { getTechniciansState, refreshTechniciansFromApi } from '../techniciansService.js';
import { ensureTechnicianPositionsLoaded } from '../technicianPositions.js';
import { ensureXlsxStyled, exportCallsheetToExcel } from '../templates/excelExport.js';
// Table interactions are handled via templates/tableInteractions.js; no direct tableTools use here
import { buildCallSheetPage as buildCallSheetPageExt, populateCrewFromReservation as populateCrewFromReservationExt, populateCrewFromReservationIfEmpty as populateCrewFromReservationIfEmptyExt } from '../templates/build/callsheet.js';
import { buildExpensesPage as buildExpensesPageExt } from '../templates/build/expenses.js';
import { initHistory, pushHistoryDebounced, undoTemplatesChange, redoTemplatesChange, setupTemplatesHistory, pushTemplatesHistory } from '../templates/history.js';
import { ensureCellToolbar as ensureCellToolbarExt } from '../templates/toolbar.js';
import { autoPaginateTemplates as autoPaginateTemplatesExt, paginateExpDetailsTables as paginateExpDetailsTablesExt, paginateGenericTplTables as paginateGenericTplTablesExt, pruneEmptyA4Pages as pruneEmptyA4PagesExt, shrinkScheduleHeaderLabels as shrinkScheduleHeaderLabelsExt } from '../templates/pagination.js';
import { bindExpensesRowActions } from '../templates/expensesTools.js';
import { bindTableInteractions } from '../templates/tableInteractions.js';
import quoteLogoUrl from '../../assets/AR-Logo-v3.5-curved-WH.png?url';
import { snapshotShading, applyShadingSnapshot } from '../templates/shading.js';
import { PROJECT_TAX_RATE } from './constants.js';
import { apiRequest } from '../apiClient.js';
import { showToast } from '../utils.js';
import { resetTemplatesRuntimeState, setTemplatesHydratedReservation, templatesTabState } from './templatesTab/state';
import {
  formatIntNoDecimals,
  getReservationsForProject,
  getSelectedProject,
  getSelectedReservations,
  getTemplateLang,
  getTemplatesContextKey,
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
  deleteSavedTemplateSelection,
  exportSavedTemplateSelection,
  importSavedTemplateFile,
  renameSavedTemplateSelection,
  fetchSavedTemplatesForProject as fetchSavedTemplatesForProjectExt,
  populateSavedTemplatesSelect as populateSavedTemplatesSelectExt,
  saveTemplateSnapshotRequest as saveTemplateSnapshotRequestExt,
} from './templatesTab/saved-templates';
import { createProjectTemplatesFixtureApi } from './templatesTab/fixture-api';
import {
  findDraftTemplate,
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
  bindTemplatesDestroyOnTabExit,
  bindTemplatesHostInteractions,
  bindTemplatesPrimaryActions,
  bindTemplatesRepopulationEvents,
  destroyTemplatesHostLifecycle,
  setupTemplatesActionsMenu,
  setupTemplatesLanguageToggle,
} from './templatesTab/lifecycle';
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
  ensurePdfTunerUI as ensurePdfTunerUIExt,
  showPrintPreviewOverlay as showPrintPreviewOverlayExt,
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
  applyCallsheetAutofill,
  applyExpensesAutofill,
  buildCallsheetAutofillData,
  buildExpensesAutofillData,
  buildTemplateSourceBundle,
} from './templatesTab/autofill';
import {
  confirmTemplatesManualEditStart,
  markTemplatesManualEdit,
} from './templatesTab/edit-guard';
import {
  applyTemplatesFitZoom,
  applyTemplatesPreviewZoom,
  ensureTemplatesZoomUI,
  readTplZoomModePref,
  readTplZoomPref,
  setTemplatesPreviewZoom,
} from './templatesTab/zoom';
import {
  bindTemplatesInteractiveRuntime,
  bindTemplatesSavedTemplateControls,
  bindTemplatesToolbarControls,
  setupTemplatesRibbon,
  syncTemplatesContext,
} from './templatesTab/init';
import { printTemplatesPdf as printTemplatesPdfExt, renderPdfLivePreview as renderPdfLivePreviewExt } from './templatesTab/pdf-runtime';
import { createTemplatesWorkspace } from './templatesTab/workspace';
import {
  resolveTemplatesSavedPresentation,
  resolveTemplatesSaveTitlePresentation,
  setTemplatesButtonBusy,
  setTemplatesWorkspaceStatus,
  syncTemplatesSavedControlsState,
} from './templatesTab/ui-state';

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
    destroyTemplatesHostLifecycle({
      host: document.getElementById('templates-preview-host'),
      listeners: templatesTabState.listeners,
      tableUnbind: templatesTabState.tableUnbind,
      expensesUnbind: templatesTabState.expensesUnbind,
      templatesTabButton: document.querySelector('[data-project-subtab-target="projects-templates-tab"]'),
      repopulateTimer: templatesTabState.repopulateTimer,
      clearRepopulateTimer: (timer) => {
        clearTimeout(timer);
        templatesTabState.repopulateTimer = null;
      },
      resizeObserver: templatesTabState.resizeObserver,
      toolbar: document.getElementById('tpl-cell-toolbar'),
      documentTarget: document,
      resetState: () => {
        templatesTabState.resizeObserver = null;
        resetTemplatesRuntimeState();
      },
    });
  } finally {
    resetTemplatesRuntimeState();
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
  try { if (templatesTabState.subtotalTimer) clearTimeout(templatesTabState.subtotalTimer); } catch (_) {}
  templatesTabState.subtotalTimer = setTimeout(() => { try { recomputeExpensesSubtotals(); } catch (_) {} }, Math.max(0, delay));
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

function collectExpenseGroupTotalsFromDom() {
  const totals = {};
  const markers = Array.from(document.querySelectorAll('#templates-preview-host tr[data-subgroup-marker]'));
  markers.forEach((marker) => {
    const key = String(marker.getAttribute('data-parent-group') || '').trim();
    if (key && !(key in totals)) {
      totals[key] = 0;
    }
  });
  return totals;
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
        let gsum = 0;
        const map = collectExpenseGroupTotalsFromDom();
        allSubs.forEach((c) => {
          const k = c.getAttribute('data-subtotal');
          const v = parseExpensesNumber(c.textContent, 0);
          gsum += v;
          const m = document.querySelector(`#templates-preview-host tr[data-subgroup-marker="${CSS.escape(k)}"]`);
          const p = String(m?.getAttribute('data-parent-group') || '').trim();
          if (p) {
            map[p] = (map[p] || 0) + v;
          }
        });
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
    renderPreview: () => { try { templatesWorkspace.renderTemplatesPreview(); } catch(_) {} },
    undoChange: () => { try { undoTemplatesChange(); } catch(_) {} },
    redoChange: () => { try { redoTemplatesChange(); } catch(_) {} },
    notifyApiError,
    pushHistoryDebounced: () => { try { pushHistoryDebounced(); } catch(_) {} },
    saveAutosaveDebounced: () => { try { templatesWorkspace.saveAutosaveDebounced(); } catch(_) {} },
    markEditing: () => { try { templatesWorkspace.markEditingActivity(); } catch(_) {} },
  });
}

function attachCallsheetLogoBehaviors(root) {
  attachCallsheetLogoBehaviorsExt(root, {
    pushHistoryDebounced: () => { try { pushHistoryDebounced(); } catch(_) {} },
    saveAutosaveDebounced: () => { try { templatesWorkspace.saveAutosaveDebounced(); } catch(_) {} },
    markEditing: () => { try { templatesWorkspace.markEditingActivity(); } catch(_) {} },
  });
}

const COMPANY_INFO = {
  logoUrl: quoteLogoUrl,
  companyName: 'شركة فود آرت للدعاية والإعلان (شركة شخص واحد)',
  companyCR: '4030485240',
  companyLicense: '159460'
};
const templatesApiRequest = createProjectTemplatesFixtureApi(apiRequest);
const templatesReservationHydrationState = {
  reservationId: null,
  inFlight: null,
};

function getTemplatesStatusElement() {
  return document.getElementById('templates-workspace-status');
}

function setTemplatesStatusMessage(key, fallback, tone = 'neutral') {
  setTemplatesWorkspaceStatus(getTemplatesStatusElement(), t(key, fallback), tone);
}

function getTemplatesSelectedReservation() {
  const project = getSelectedProject();
  if (!project) return null;
  return getSelectedReservations(project.id)?.[0] || null;
}

function reservationHasTemplateAutofillData(reservation) {
  if (!reservation || typeof reservation !== 'object') return false;
  const assignments = Array.isArray(reservation.crewAssignments) && reservation.crewAssignments.length
    ? reservation.crewAssignments
    : (Array.isArray(reservation.techniciansDetails) ? reservation.techniciansDetails : []);
  if (!assignments.length) return false;

  return assignments.some((assignment) => {
    const position = String(
      assignment?.positionLabel
      || assignment?.positionLabelAr
      || assignment?.positionLabelEn
      || assignment?.positionName
      || assignment?.position_name
      || assignment?.position_label_ar
      || assignment?.position_label_en
      || assignment?.technicianRole
      || assignment?.role
      || '',
    ).trim();
    return position.length > 0;
  });
}

async function ensureTemplatesSelectedReservationHydrated() {
  const reservation = getTemplatesSelectedReservation();
  const reservationId = reservation?.id ?? reservation?.reservationId ?? null;
  if (!reservationId) return false;
  if (reservationHasTemplateAutofillData(reservation)) return false;

  const normalizedId = String(reservationId);
  if (templatesReservationHydrationState.inFlight && templatesReservationHydrationState.reservationId === normalizedId) {
    return templatesReservationHydrationState.inFlight;
  }

  const run = (async () => {
    try {
      const hydrated = await fetchReservationWithDetails(reservationId);
      setTemplatesHydratedReservation(hydrated);
      return reservationHasTemplateAutofillData(hydrated);
    } catch {
      return false;
    } finally {
      templatesReservationHydrationState.inFlight = null;
      templatesReservationHydrationState.reservationId = null;
    }
  })();

  templatesReservationHydrationState.reservationId = normalizedId;
  templatesReservationHydrationState.inFlight = run;
  return run;
}

function renderTemplatesPreviewWithHydration() {
  templatesWorkspace.renderTemplatesPreview();
  void ensureTemplatesSelectedReservationHydrated().then((hydrated) => {
    if (!hydrated) return;
    try {
      templatesWorkspace.renderTemplatesPreview();
    } catch (_) {}
  });
}

function applyTemplatesDeterministicAutofill({ root, project, reservations, type }) {
  if (!(root instanceof HTMLElement) || !project) return;

  templatesTabState.manualEditConfirmed = false;
  templatesTabState.hasManualEdits = false;

  const bundle = buildTemplateSourceBundle({
    project,
    reservations,
  });

  if (type === 'callsheet') {
    applyCallsheetAutofill(root, buildCallsheetAutofillData(bundle));
    return;
  }

  applyExpensesAutofill(root, buildExpensesAutofillData(bundle));
}

function syncTemplatesSavedUiState({ hasProject, hasItems, isLoading = false } = {}) {
  const savedSelect = document.getElementById('templates-saved');
  const meta = document.getElementById('templates-saved-meta');
  const field = savedSelect instanceof HTMLElement ? savedSelect.closest('.templates-toolbar-field--saved') : null;
  const selectedLabel =
    savedSelect instanceof HTMLSelectElement && savedSelect.value
      ? String(savedSelect.options[savedSelect.selectedIndex]?.textContent || '').trim()
      : '';
  syncTemplatesSavedControlsState({
    selectEl: savedSelect,
    hasProject: Boolean(hasProject),
    hasItems: Boolean(hasItems),
    isLoading,
    chooseProjectLabel: t('projects.templates.saved.chooseProject', '— اختر مشروعاً أولاً —'),
    emptyLabel: t('projects.templates.saved.empty', '— لا توجد محفوظات بعد —'),
    loadingLabel: t('projects.templates.saved.loading', '— جارٍ تحديث المحفوظات —'),
    selectionButtons: [
      document.getElementById('templates-rename'),
      document.getElementById('templates-delete'),
      document.getElementById('templates-export'),
      document.getElementById('templates-export-excel'),
    ],
    projectButtons: [
      document.getElementById('templates-import'),
    ],
  });

  const presentation = resolveTemplatesSavedPresentation({
    hasProject: Boolean(hasProject),
    hasItems: Boolean(hasItems),
    isLoading,
    selectedLabel,
  });
  if (field instanceof HTMLElement) {
    field.dataset.templatesSavedMode = presentation.mode;
  }
  if (meta instanceof HTMLElement) {
    meta.textContent = t(presentation.helperKey, presentation.helperFallback);
  }
}

function buildTemplatesDefaultSnapshotTitle({ projectTitle, type, reservationId, copy = false }) {
  const normalizedProjectTitle = String(projectTitle || '').trim() || 'Template';
  const typeMap = {
    expenses: t('projects.templates.naming.typeShort.expenses', 'Expenses Sheet'),
    callsheet: t('projects.templates.naming.typeShort.callsheet', 'Call Sheet'),
    shotlist: t('projects.templates.naming.typeShort.shotlist', 'Shot List'),
  };
  const typeLabel = typeMap[type] || type;
  const reservationPart = reservationId ? ` #${reservationId}` : '';
  const copySuffix = copy ? ` - ${t('projects.templates.naming.copySuffix', 'Copy')}` : '';
  return `${normalizedProjectTitle} - ${typeLabel}${reservationPart}${copySuffix}`;
}

function syncTemplatesSaveTitleField({ preferSelected = false, clearIfNoProject = false } = {}) {
  const input = document.getElementById('templates-save-title');
  const savedSelect = document.getElementById('templates-saved');
  const meta = document.getElementById('templates-save-title-meta');
  const field = input instanceof HTMLElement ? input.closest('.templates-toolbar-field--save-title') : null;
  if (!(input instanceof HTMLInputElement)) return;

  const project = getSelectedProject();
  const reservationValue = document.getElementById('templates-reservation')?.value;
  const reservationId = reservationValue ? Number(reservationValue) : null;
  const type = document.getElementById('templates-type')?.value || 'expenses';
  const selectedLabel =
    savedSelect instanceof HTMLSelectElement && savedSelect.value
      ? String(savedSelect.options[savedSelect.selectedIndex]?.textContent || '').trim()
      : '';
  const defaultTitle = project
    ? buildTemplatesDefaultSnapshotTitle({
        projectTitle: String(project.title || 'Template'),
        type,
        reservationId,
        copy: false,
      })
    : t('projects.templates.placeholders.saveTitle', 'اسم النسخة');
  const previousAutoValue = String(input.dataset.tplAutoValue || '').trim();
  const currentValue = String(input.value || '').trim();
  const presentation = resolveTemplatesSaveTitlePresentation({
    hasProject: Boolean(project),
    selectedLabel,
    currentValue,
    previousAutoValue,
    defaultTitle,
  });
  const { mode, suggestedTitle, userHasCustomValue } = presentation;
  const metaKeyMap = {
    'choose-project': 'projects.templates.naming.meta.chooseProject',
    auto: 'projects.templates.naming.meta.auto',
    selected: 'projects.templates.naming.meta.selected',
    custom: 'projects.templates.naming.meta.custom',
  };
  const metaFallbackMap = {
    'choose-project': 'اختر مشروعًا أولًا حتى يقترح النظام اسم النسخة ويربطها بالمحفوظات.',
    auto: 'سيُستخدم اسم تلقائي واضح بحسب المشروع ونوع القالب والحجز عند الحاجة.',
    selected: 'الحقل مرتبط الآن بالمحفوظ المختار، ويمكنك تعديل الاسم قبل الحفظ إذا أردت.',
    custom: 'سيُستخدم هذا الاسم المخصص في الحفظ التالي بدل الاسم التلقائي.',
  };

  input.placeholder = suggestedTitle || defaultTitle;
  if (field instanceof HTMLElement) {
    field.dataset.templatesSaveMode = mode;
  }
  if (meta instanceof HTMLElement) {
    meta.textContent = t(metaKeyMap[mode], metaFallbackMap[mode]);
  }

  if (preferSelected && selectedLabel) {
    input.value = selectedLabel;
    input.dataset.tplAutoValue = selectedLabel;
    return;
  }

  if (clearIfNoProject && !project && !selectedLabel) {
    if (!userHasCustomValue) {
      input.value = '';
      input.dataset.tplAutoValue = '';
    }
    return;
  }

  if (suggestedTitle && !userHasCustomValue) {
    input.value = suggestedTitle;
    input.dataset.tplAutoValue = suggestedTitle;
    return;
  }

  if (!suggestedTitle && !currentValue) {
    input.dataset.tplAutoValue = '';
    return;
  }

  input.dataset.tplAutoValue = suggestedTitle;
}

function selectTemplatesSavedOptionByLabel(savedTitle) {
  const savedSelect = document.getElementById('templates-saved');
  if (!(savedSelect instanceof HTMLSelectElement) || !savedTitle) return false;

  const normalizedTitle = String(savedTitle).trim();
  if (!normalizedTitle) return false;

  const options = Array.from(savedSelect.options);
  const exactMatch = [...options].reverse().find((option) => String(option.textContent || '').trim() === normalizedTitle);
  if (!exactMatch || !exactMatch.value) return false;

  savedSelect.value = exactMatch.value;
  return true;
}

function selectTemplatesSavedOptionByValue(savedId) {
  const savedSelect = document.getElementById('templates-saved');
  if (!(savedSelect instanceof HTMLSelectElement) || savedId == null) return false;

  const normalizedId = String(savedId).trim();
  if (!normalizedId) return false;
  const match = Array.from(savedSelect.options).find((option) => option.value === normalizedId);
  if (!match) return false;

  savedSelect.value = normalizedId;
  return true;
}
// Removed temporary preview padding adjustment logic per request
const templatesWorkspace = createTemplatesWorkspace({
  companyInfo: COMPANY_INFO,
  getContextKey: getTemplatesContextKey,
  getSelectedProject,
  getSelectedReservations,
  getCurrentType: () => document.getElementById('templates-type')?.value || 'expenses',
  getCurrentReservationId: () => {
    const value = document.getElementById('templates-reservation')?.value;
    return value ? Number(value) : null;
  },
  getSavedSelect: () => document.getElementById('templates-saved'),
  getHostRoot: () => document.querySelector('#templates-preview-host #templates-a4-root'),
  getHost: () => document.getElementById('templates-preview-host'),
  getSaveTitleInput: () => document.getElementById('templates-save-title'),
  apiRequestFn: templatesApiRequest,
  notifyApiError,
  alertFn: (message) => alert(message),
  showToastFn: showToast,
  setStatus: (message, tone) => setTemplatesWorkspaceStatus(getTemplatesStatusElement(), message, tone),
  syncSavedControlsState: syncTemplatesSavedUiState,
  translate: (key, fallback) => t(key, fallback),
  savedPlaceholderLabel: t('projects.templates.saved.placeholder', '— محفوظات —'),
  savedEmptyLabel: t('projects.templates.saved.empty', '— لا توجد محفوظات بعد —'),
  emptyBodyMessage: t(
    'projects.templates.controls.subtitle',
    'اختر المشروع والحجز ونوع القالب أولاً، ثم استخدم المحفوظات والإجراءات من نفس السطح.',
  ),
  buildDefaultSnapshotTitle: buildTemplatesDefaultSnapshotTitle,
  normalizeTemplateHtmlLegacyUrls,
  readHeaderFooterOptions,
  ensureLogoControls,
  buildCallSheetPage: buildCallSheetPageExt,
  buildExpensesPage: buildExpensesPageExt,
  applyTemplateAutofill: applyTemplatesDeterministicAutofill,
  setupTemplatesHistory,
  ensureCellToolbar: ensureCellToolbarExt,
  shrinkScheduleHeaderLabels: shrinkScheduleHeaderLabelsExt,
  purgeCrewCallTables,
  ensureCrewTableExists,
  ensureCrewOnSecondPage,
  unifyCrewCallTables,
  ensureSingleCrewTableStrict,
  fixCallsheetStructure,
  enforceCallsheetSizing,
  attachCallsheetLogoBehaviors,
  populateCrewFromReservation: populateCrewFromReservationExt,
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
  snapshotShading,
  applyShadingSnapshot,
  readPrimaryLogoState,
  readSecondaryLogoState,
  writePrimaryLogoState,
  writeSecondaryLogoState,
  applyTemplatesPreviewZoom,
  pushTemplatesHistory: () => { try { pushTemplatesHistory(); } catch(_) {} },
  pushHistoryDebounced: () => { try { pushHistoryDebounced(); } catch(_) {} },
  markTemplatesEditingActivity: markTemplatesEditingActivityExt,
  saveTemplatesAutosaveToStorage: saveTemplatesAutosaveToStorageExt,
  saveAutosaveDebounced: saveAutosaveDebouncedExt,
  restoreTemplatesAutosaveIfPresent: restoreTemplatesAutosaveIfPresentExt,
  getTemplatesSnapshot: getTemplatesSnapshotExt,
  applyTemplatesSnapshotInPlace: applyTemplatesSnapshotInPlaceExt,
  applyTemplatesSnapshot: applyTemplatesSnapshotExt,
  readRemoteAutosaveId: readRemoteAutosaveIdExt,
  writeRemoteAutosaveId: writeRemoteAutosaveIdExt,
  sanitizeHtmlForExport: sanitizeHtmlForExportExt,
  ensureRemoteAutosaveId: ensureRemoteAutosaveIdExt,
  autosaveTemplateToServer: autosaveTemplateToServerExt,
  autosaveToServerDebounced: autosaveToServerDebouncedExt,
  renderTemplatesPreview: (options) => renderTemplatesPreviewExt({
    ...options,
    emptyMessage: t('projects.templates.empty', options.emptyMessage),
    emptyBodyMessage: t(
      'projects.templates.controls.subtitle',
      options.emptyBodyMessage || 'اختر المشروع والحجز ونوع القالب أولاً، ثم استخدم المحفوظات والإجراءات من نفس السطح.',
    ),
  }),
  fetchSavedTemplatesForProject: fetchSavedTemplatesForProjectExt,
  populateSavedTemplatesSelect: populateSavedTemplatesSelectExt,
  saveTemplateSnapshotRequest: saveTemplateSnapshotRequestExt,
  loadSnapshotById: loadSnapshotByIdExt,
});

async function printTemplatesPdf() {
  await printTemplatesPdfExt({
    root: document.querySelector('#templates-preview-host > #templates-a4-root'),
    getType: () => document.getElementById('templates-type')?.value || 'expenses',
    alertFn: (message) => alert(message),
  });
}

function showPrintPreviewOverlay() {
  showPrintPreviewOverlayExt({
    onPrint: () => printTemplatesPdf(),
  });
}

// ============== PDF Live Tuner ==============

async function renderPdfLivePreview() {
  await renderPdfLivePreviewExt({
    root: document.querySelector('#templates-preview-host > #templates-a4-root'),
    getType: () => document.getElementById('templates-type')?.value || 'expenses',
    slot: document.getElementById('templates-pdf-live-slot'),
  });
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

// Auto-generate/renumber codes within each subgroup:
// If subgroup header is e.g. 01-00, then items become 01-01, 01-02, ...
function renumberExpenseCodes() {
  renumberExpenseCodesExt();
}

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

export function initTemplatesTab() {
  // Run immediately; caller ensures DOM is ready
  const projectSel = document.getElementById('templates-project');
  const reservationSel = document.getElementById('templates-reservation');
  const typeSel = document.getElementById('templates-type');
  const refreshBtn = document.getElementById('templates-refresh');
  const printBtn = document.getElementById('templates-print');
  const printPreviewBtn = document.getElementById('templates-print-preview');
  const saveBtn = document.getElementById('templates-save');
  const saveCopyBtn = document.getElementById('templates-save-copy');
  const savedSel = document.getElementById('templates-saved');
  const fromResBtn = document.getElementById('templates-from-res');
  const newBlankBtn = document.getElementById('templates-new');
  const loadLastDraftBtn = document.getElementById('templates-load-last');
  const fetchCrewBtn = document.getElementById('templates-fetch-crew');
  const fetchCrewForceBtn = document.getElementById('templates-fetch-crew-force');
  const saveTitleInput = document.getElementById('templates-save-title');
  const renameBtn = document.getElementById('templates-rename');
  const deleteBtn = document.getElementById('templates-delete');
  const exportBtn = document.getElementById('templates-export');
  const exportExcelBtn = document.getElementById('templates-export-excel');
  const importBtn = document.getElementById('templates-import');
  const importFile = document.getElementById('templates-import-file');
  const statusEl = getTemplatesStatusElement();
  try { console.debug('[templatesTab] init start'); } catch(_) {}

  if (!projectSel) return;

  setupTemplatesRibbon({
    root: document.getElementById('templates-controls'),
    defaultPanel: 'context',
  });

  setTemplatesWorkspaceStatus(
    statusEl,
    t('projects.templates.status.idle', 'اختر مشروعاً لتجهيز المعاينة والمحفوظات.'),
    'neutral',
  );
  syncTemplatesSaveTitleField({ clearIfNoProject: true });

  const restoreSavedWorkspaceStatus = () => {
    const hasProject = Boolean(getSelectedProject());
    const hasItems = savedSel instanceof HTMLSelectElement ? savedSel.options.length > 1 : false;
    if (!hasProject) {
      setTemplatesStatusMessage(
        'projects.templates.status.chooseProject',
        'اختر مشروعاً أولاً لعرض المحفوظات وتجهيز القالب.',
        'neutral',
      );
      return;
    }
    if (!hasItems) {
      setTemplatesStatusMessage(
        'projects.templates.status.noSaved',
        'لا توجد محفوظات لهذا القالب بعد. ابدأ بالحفظ من نفس السطح.',
        'neutral',
      );
      return;
    }
    setTemplatesStatusMessage(
      'projects.templates.status.savedReady',
      'المحفوظات جاهزة للتحميل أو الإدارة من نفس السطح.',
      'neutral',
    );
  };

  // Initialize history with local hooks
  try {
    initHistory({
      getSnapshot: () => templatesWorkspace.getTemplatesSnapshot(),
      applySnapshot: (snap) => templatesWorkspace.applyTemplatesSnapshot(snap),
      onAutosaveDebounced: () => templatesWorkspace.saveAutosaveDebounced(),
      onMarkEditing: () => templatesWorkspace.markEditingActivity(),
    });
  } catch (_) {}

  const actionsToggle = document.getElementById('templates-actions-toggle');
  const actionsMenu = document.getElementById('templates-actions-menu');
  const actionsDD = document.getElementById('templates-actions-dd');
  const langBtn = document.getElementById('templates-lang-toggle');

  syncTemplatesContext({
    projectSelect: projectSel,
    reservationSelect: reservationSel,
    typeSelect: typeSel,
    refreshButton: refreshBtn,
    restorePreferredType: restoreTplPreferredTypeIfAny,
    populateProjectSelect,
    populateReservationSelect,
    renderPreview: () => {
      renderTemplatesPreviewWithHydration();
      syncTemplatesSaveTitleField({ clearIfNoProject: true });
    },
    populateSavedTemplates: () => templatesWorkspace.populateSavedTemplates(),
    writePreferredType: writeTplPreferredType,
    onTypeChangeAfterRender: () => {
      try { if (window.__pdfTunerLoadValues) window.__pdfTunerLoadValues(); } catch(_) {}
    },
  });

  bindTemplatesToolbarControls({
    printButton: printBtn,
    printPreviewButton: printPreviewBtn,
    newBlankButton: newBlankBtn,
    loadLastDraftButton: loadLastDraftBtn,
    fetchCrewButton: fetchCrewBtn,
    fetchCrewForceButton: fetchCrewForceBtn,
    actionsToggle,
    actionsMenu,
    actionsDropdown: actionsDD,
    languageButton: langBtn,
    getLang: () => getTemplateLang(),
    setLang: (nextLang) => setTemplateLang(nextLang),
    renderPreview: () => renderTemplatesPreviewWithHydration(),
    printTemplate: async () => {
      setTemplatesStatusMessage('projects.templates.status.printing', 'جارٍ إنشاء ملف PDF…', 'neutral');
      try {
        await printTemplatesPdf();
        setTemplatesStatusMessage('projects.templates.status.printed', 'تم إنشاء ملف PDF.', 'success');
      } catch (error) {
        setTemplatesWorkspaceStatus(statusEl, 'تعذر إنشاء ملف PDF، حاول مجددًا.', 'error');
        throw error;
      }
    },
    showPrintPreview: () => { try { showPrintPreviewOverlay(); } catch (_) {} },
    createBlankTemplate: () => {
      try {
        const key = getTemplatesContextKey();
        localStorage.removeItem(key);
        localStorage.removeItem(`remoteAutosaveId:${key}`);
      } catch (_) {}
      try { showToast('تم إنشاء قالب فارغ', 'success', 2000); } catch (_) {}
      try { renderTemplatesPreviewWithHydration(); } catch (_) {}
      syncTemplatesSaveTitleField({ clearIfNoProject: true });
      setTemplatesStatusMessage('projects.templates.status.blank', 'تم فتح قالب فارغ جديد.', 'success');
    },
    loadLastDraft: async () => {
      try {
        let loadedId = null;
        const id = templatesWorkspace.readRemoteAutosaveId();
        if (id) {
          loadedId = id;
          await templatesWorkspace.loadSnapshotById(id);
        } else {
          const items = await templatesWorkspace.fetchSavedTemplatesForCurrent();
          const draft = findDraftTemplate(items || []);
          if (draft && draft.id) {
            loadedId = draft.id;
            await templatesWorkspace.loadSnapshotById(draft.id);
          }
        }
        selectTemplatesSavedOptionByValue(loadedId);
        try { showToast('تم تحميل المسودة', 'success', 2000); } catch (_) {}
        syncTemplatesSaveTitleField({ preferSelected: true });
        setTemplatesStatusMessage('projects.templates.status.draftLoaded', 'تم تحميل آخر مسودة محفوظة.', 'success');
      } catch (_) {
        try { showToast('تعذر تحميل المسودة', 'error', 2500); } catch (_) {}
        setTemplatesStatusMessage('projects.templates.status.draftFailed', 'تعذر تحميل آخر مسودة.', 'error');
      }
    },
    fetchCrew: async (force) => {
      try { await templatesWorkspace.fetchCrewFromReservation(force); } catch (_) {}
    },
    setupActionsMenu: setupTemplatesActionsMenu,
    setupLanguageToggle: setupTemplatesLanguageToggle,
    showToast,
    alertFn: (message) => alert(message),
    errorLogger: (label, error) => {
      try { console.error(label, error); } catch (_) {}
    },
    closeActionsMenu: () => {
      try {
        if (actionsMenu) actionsMenu.style.display = 'none';
      } catch (_) {}
    },
  });

  bindTemplatesPrimaryActions({
    saveButton: saveBtn,
    saveCopyButton: saveCopyBtn,
    savedSelect: savedSel,
    typeSelect: typeSel,
    reservationSelect: reservationSel,
    fromReservationButton: fromResBtn,
    onSave: async (copy) => {
      const targetButton = copy ? saveCopyBtn : saveBtn;
      setTemplatesButtonBusy(
        targetButton,
        true,
        copy ? t('projects.templates.actions.saveCopy', '📎 حفظ كنسخة') : t('projects.templates.actions.save', '💾 حفظ'),
      );
      try {
        const savedTitle = await templatesWorkspace.saveTemplateSnapshot({ copy });
        syncTemplatesSaveTitleField();
        return savedTitle;
      } catch (error) {
        setTemplatesWorkspaceStatus(statusEl, 'تعذر حفظ القالب الحالي، حاول مجددًا.', 'error');
        throw error;
      } finally {
        setTemplatesButtonBusy(targetButton, false);
      }
    },
    populateSavedTemplates: () => templatesWorkspace.populateSavedTemplates(),
    onAfterSave: (savedTitle) => {
      selectTemplatesSavedOptionByLabel(savedTitle);
      syncTemplatesSavedUiState({
        hasProject: Boolean(getSelectedProject()),
        hasItems: savedSel instanceof HTMLSelectElement ? savedSel.options.length > 1 : false,
      });
      syncTemplatesSaveTitleField({ preferSelected: true, clearIfNoProject: true });
    },
    onLoadSnapshot: async (id) => {
      await templatesWorkspace.loadSnapshotById(id);
      syncTemplatesSaveTitleField({ preferSelected: true });
    },
    renderPreview: () => {
      renderTemplatesPreviewWithHydration();
      syncTemplatesSaveTitleField({ clearIfNoProject: true });
    },
    alertFn: (message) => alert(message),
    errorLogger: (label, error) => {
      try { console.error(label, error); } catch (_) {}
    },
  });

  bindTemplatesSavedTemplateControls({
    renameButton: renameBtn,
    deleteButton: deleteBtn,
    exportButton: exportBtn,
    exportExcelButton: exportExcelBtn,
    importButton: importBtn,
    importFileInput: importFile,
    renameAction: async () => {
      setTemplatesButtonBusy(renameBtn, true, t('projects.templates.actions.rename', '✏️ إعادة تسمية'));
      setTemplatesStatusMessage('projects.templates.status.renaming', 'جارٍ تحديث اسم المحفوظ…', 'neutral');
      try {
        const renamed = await renameSavedTemplateSelection({
          savedSelect: savedSel,
          apiRequestFn: templatesApiRequest,
          populateSavedTemplates: () => templatesWorkspace.populateSavedTemplates(),
          notifyApiError,
          alertFn: (message) => alert(message),
        });
        if (renamed) {
          syncTemplatesSaveTitleField({ preferSelected: true });
          setTemplatesStatusMessage('projects.templates.status.renamed', 'تم تحديث اسم المحفوظ.', 'success');
        } else {
          restoreSavedWorkspaceStatus();
        }
      } finally {
        setTemplatesButtonBusy(renameBtn, false);
        syncTemplatesSavedUiState({
          hasProject: Boolean(getSelectedProject()),
          hasItems: savedSel instanceof HTMLSelectElement ? savedSel.options.length > 1 : false,
        });
      }
    },
    deleteAction: async () => {
      setTemplatesButtonBusy(deleteBtn, true, t('projects.templates.actions.delete', '🗑️ حذف'));
      setTemplatesStatusMessage('projects.templates.status.deleting', 'جارٍ حذف المحفوظ…', 'warning');
      try {
        const deleted = await deleteSavedTemplateSelection({
          savedSelect: savedSel,
          apiRequestFn: templatesApiRequest,
          populateSavedTemplates: () => templatesWorkspace.populateSavedTemplates(),
          renderPreview: () => renderTemplatesPreviewWithHydration(),
          notifyApiError,
          alertFn: (message) => alert(message),
          confirmFn: (message) => confirm(message),
        });
        if (deleted) {
          syncTemplatesSaveTitleField({ clearIfNoProject: true });
          setTemplatesStatusMessage('projects.templates.status.deleted', 'تم حذف المحفوظ المحدد.', 'success');
        } else {
          restoreSavedWorkspaceStatus();
        }
      } finally {
        setTemplatesButtonBusy(deleteBtn, false);
        syncTemplatesSavedUiState({
          hasProject: Boolean(getSelectedProject()),
          hasItems: savedSel instanceof HTMLSelectElement ? savedSel.options.length > 1 : false,
        });
      }
    },
    exportAction: async () => {
      setTemplatesButtonBusy(exportBtn, true, t('projects.templates.actions.export', '⬇️ تصدير'));
      setTemplatesStatusMessage('projects.templates.status.exporting', 'جارٍ تجهيز ملف التصدير…', 'neutral');
      try {
        const exported = await exportSavedTemplateSelection({
          savedSelect: savedSel,
          apiRequestFn: templatesApiRequest,
          notifyApiError,
          alertFn: (message) => alert(message),
        });
        if (exported) {
          setTemplatesStatusMessage('projects.templates.status.exported', 'تم تجهيز ملف التصدير.', 'success');
        } else {
          restoreSavedWorkspaceStatus();
        }
      } finally {
        setTemplatesButtonBusy(exportBtn, false);
        syncTemplatesSavedUiState({
          hasProject: Boolean(getSelectedProject()),
          hasItems: savedSel instanceof HTMLSelectElement ? savedSel.options.length > 1 : false,
        });
      }
    },
    exportExcelAction: async () => {
      const type = document.getElementById('templates-type')?.value || 'expenses';
      if (type !== 'callsheet') { alert('التصدير إلى Excel متاح في الكول شيت فقط'); return; }
      const root = document.querySelector('#templates-preview-host #templates-a4-root');
      if (!root) { alert('لا توجد معاينة للكول شيت'); return; }
      await ensureXlsxStyled();
      await exportCallsheetToExcel(root);
    },
    importAction: async (file) => {
      setTemplatesButtonBusy(importBtn, true, t('projects.templates.actions.import', '⬆️ استيراد'));
      setTemplatesStatusMessage('projects.templates.status.importing', 'جارٍ استيراد المحفوظ…', 'neutral');
      try {
        const importedTitle = await importSavedTemplateFile({
          file,
          apiRequestFn: templatesApiRequest,
          getSelectedProject: () => getSelectedProject(),
          getCurrentType: () => document.getElementById('templates-type')?.value || 'expenses',
          getReservationId: () => {
            const value = document.getElementById('templates-reservation')?.value;
            return value ? Number(value) : null;
          },
          getFallbackHtml: () => document.querySelector('#templates-preview-host')?.innerHTML || '',
          populateSavedTemplates: () => templatesWorkspace.populateSavedTemplates(),
          notifyApiError,
          alertFn: (message) => alert(message),
        });
        if (importedTitle) {
          selectTemplatesSavedOptionByLabel(importedTitle);
          syncTemplatesSaveTitleField({ preferSelected: true, clearIfNoProject: true });
          setTemplatesStatusMessage('projects.templates.status.imported', 'تم استيراد المحفوظ وتحديث القائمة.', 'success');
        } else {
          restoreSavedWorkspaceStatus();
        }
      } finally {
        setTemplatesButtonBusy(importBtn, false);
        syncTemplatesSavedUiState({
          hasProject: Boolean(getSelectedProject()),
          hasItems: savedSel instanceof HTMLSelectElement ? savedSel.options.length > 1 : false,
        });
      }
    },
    errorLogger: (label, error) => {
      try { console.error(label, error); } catch (_) {}
    },
  });

  if (savedSel instanceof HTMLSelectElement && savedSel.dataset.tplSavedUiBound !== '1') {
    savedSel.addEventListener('change', () => {
      syncTemplatesSavedUiState({
        hasProject: Boolean(getSelectedProject()),
        hasItems: savedSel.options.length > 1,
      });
      syncTemplatesSaveTitleField({ preferSelected: true, clearIfNoProject: true });
      if (!savedSel.value) {
        restoreSavedWorkspaceStatus();
      }
    });
    savedSel.dataset.tplSavedUiBound = '1';
  }

  syncTemplatesSavedUiState({
    hasProject: Boolean(getSelectedProject()),
    hasItems: savedSel instanceof HTMLSelectElement ? savedSel.options.length > 1 : false,
  });

  if (saveTitleInput instanceof HTMLInputElement && saveTitleInput.dataset.tplNameUiBound !== '1') {
    const syncNameUi = () => syncTemplatesSaveTitleField({ clearIfNoProject: true });
    saveTitleInput.addEventListener('input', syncNameUi);
    saveTitleInput.addEventListener('change', syncNameUi);
    saveTitleInput.dataset.tplNameUiBound = '1';
  }

  bindTemplatesInteractiveRuntime({
    runtimeState: templatesTabState,
    projectSelect: projectSel,
    templatesTabButton: document.querySelector('[data-project-subtab-target="projects-templates-tab"]'),
    documentTarget: document,
    bindHostInteractions: bindTemplatesHostInteractions,
    bindExpensesRowActionsFn: bindExpensesRowActions,
    bindTableInteractionsFn: bindTableInteractions,
    ensurePdfTunerUI: () => { ensurePdfTunerUI(); },
    createHostInputHandler: createTemplatesHostInputHandler,
    createCompositionHandlers: createTemplatesCompositionHandlers,
    createFocusHandlers: createTemplatesFocusHandlers,
    createMouseDownHandler: createTemplatesMouseDownHandler,
    markEditing: () => { templatesWorkspace.markEditingActivity(); },
    recomputeSubtotalsDebounced: (delay) => recomputeExpensesSubtotalsDebounced(delay),
    recomputeExpensesSubtotals: () => { try { recomputeExpensesSubtotals(); } catch (_) {} },
    renumberExpenseCodes: () => { try { renumberExpenseCodes(); } catch (_) {} },
    handlePreviewMutation: () => { templatesWorkspace.handlePreviewMutation(); },
    enforceCallsheetSizing: () => {
      try { if (typeof window.__enforceCallsheetSizing === 'function') window.__enforceCallsheetSizing(); } catch(_) {}
    },
    createRepopulateController: createTemplatesRepopulateController,
    bindRepopulationEvents: bindTemplatesRepopulationEvents,
    getReservationValue: () => document.getElementById('templates-reservation')?.value || '',
    getType: () => document.getElementById('templates-type')?.value || 'expenses',
    refreshProjectsIfNeeded: async () => {
      if (!getProjectsState()?.length) await refreshProjectsFromApi();
    },
    refreshReservationsIfNeeded: async () => {
      if (!getReservationsState()?.length) await refreshReservationsFromApi();
    },
    populateProjectSelect: () => populateProjectSelect(),
    populateReservationSelect: (projectId) => populateReservationSelect(projectId),
    renderPreview: () => renderTemplatesPreviewWithHydration(),
    populateSavedTemplates: () => templatesWorkspace.populateSavedTemplates(),
    isDebugEnabled: () => isTemplatesDebugEnabled(),
    onBeforeEditableFocus: (target) => confirmTemplatesManualEditStart({
      target,
      state: templatesTabState,
      confirmFn: (message) => confirm(message),
      message: t(
        'projects.templates.autofill.confirmManualEdit',
        'سيحوّل هذا التعديل الحقل من تعبئة تلقائية إلى تعديل يدوي. هل تريد المتابعة؟',
      ),
      setStatus: (message, tone) => setTemplatesWorkspaceStatus(getTemplatesStatusElement(), message, tone),
    }),
    onEditableInput: (target) => {
      markTemplatesManualEdit({
        target,
        state: templatesTabState,
      });
    },
  });
  // Bind one-time destroy on leaving Templates sub-tab or projects section
  try {
    bindTemplatesDestroyOnTabExit({
      destroy: () => { try { destroyTemplatesTab(); } catch (_) {} },
      documentTarget: document,
    });
  } catch (_) {}
  // Ensure zoom controls are present once controls mount (idempotent)
  try { ensureTemplatesZoomUI(); } catch (_) {}
}

export default { initTemplatesTab, destroyTemplatesTab };
