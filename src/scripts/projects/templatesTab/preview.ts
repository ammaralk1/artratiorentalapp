import { pageHasMeaningfulContent } from '../../templates/pageUtils.js';
import { showTemplatesDebugOverlay } from '../../templates/debug.js';
import { templatesTabState, type TemplatesZoomMode } from './state';

type TemplateType = 'expenses' | 'callsheet' | string;

interface CompanyInfoLike {
  logoUrl: string;
}

interface ZoomValueLike {
  textContent: string | null;
}

interface TemplateAutofillApplyOptions<ProjectLike, ReservationLike> {
  root: HTMLElement;
  project: ProjectLike;
  reservations: ReservationLike[];
  type: TemplateType;
}

interface EnsureCellToolbarOptions {
  onAfterChange: () => void;
  onRenumber?: () => void;
  onTotalsChange?: () => void;
}

interface RenderTemplatesPreviewOptions<ProjectLike, ReservationLike, HeaderFooterOptions> {
  companyInfo: CompanyInfoLike;
  emptyMessage: string;
  emptyBodyMessage?: string;
  getSelectedProject: () => ProjectLike | null;
  getSelectedReservations: (projectId: unknown) => ReservationLike[];
  getTemplateType: () => TemplateType;
  readHeaderFooterOptions: (companyInfo: CompanyInfoLike) => HeaderFooterOptions;
  ensureLogoControls: (type: TemplateType) => void;
  buildCallSheetPage: (project: ProjectLike, reservations: ReservationLike[], headerFooter: HeaderFooterOptions) => HTMLElement;
  buildExpensesPage: (project: ProjectLike, reservations: ReservationLike[], headerFooter: HeaderFooterOptions) => HTMLElement;
  applyTemplateAutofill?: (options: TemplateAutofillApplyOptions<ProjectLike, ReservationLike>) => void;
  setupTemplatesHistory: (root: HTMLElement, type: TemplateType) => void;
  ensureCellToolbar: (options: EnsureCellToolbarOptions) => void;
  onToolbarAfterChange: () => void;
  shrinkScheduleHeaderLabels: () => void;
  purgeCrewCallTables: () => void;
  ensureCrewTableExists: () => void;
  ensureCrewOnSecondPage: () => void;
  unifyCrewCallTables: () => void;
  ensureSingleCrewTableStrict: () => void;
  populateCrewFromReservationIfEmpty: (reservation: ReservationLike | null) => void;
  ensureTechnicianPositionsLoaded: () => Promise<unknown> | unknown;
  getTechniciansState: () => unknown;
  refreshTechniciansFromApi: () => Promise<unknown>;
  renumberExpenseCodes: () => void;
  recomputeExpensesSubtotals: () => void;
  autoPaginateTemplates: (options: { headerFooter: false; logoUrl: string }) => void;
  paginateExpDetailsTables: (options: { headerFooter: false; logoUrl: string }) => void;
  pruneEmptyA4Pages: () => void;
  paginateGenericTplTables: (options: { headerFooter: false; logoUrl: string; isLandscape: true }) => void;
  ensurePdfTunerUI: () => void;
  readTplZoomModePref: () => TemplatesZoomMode;
  readTplZoomPref: () => number;
  applyTemplatesFitZoom: () => void;
  setTemplatesPreviewZoom: (zoom: number, options?: { silent?: boolean }) => void;
  zoomValueEl?: ZoomValueLike | null;
  isDebugOverlayEnabled?: () => boolean;
  host?: HTMLElement | null;
}

export interface LoadSnapshotByIdOptions {
  id: string | number;
  apiRequestFn: (url: string) => Promise<unknown>;
  notifyApiError: (error: unknown, fallback?: string) => void;
  companyInfo: CompanyInfoLike;
  normalizeTemplateHtmlLegacyUrls: (html: string, companyInfo: CompanyInfoLike) => string;
  fixCallsheetStructure: (root?: ParentNode | null) => void;
  unifyCrewCallTables: () => void;
  ensureSingleCrewTableStrict: () => void;
  ensureCrewOnSecondPage: () => void;
  enforceCallsheetSizing: (root?: ParentNode | null) => void;
  shrinkScheduleHeaderLabels: () => void;
  pruneEmptyA4Pages: () => void;
  attachCallsheetLogoBehaviors?: (root: HTMLElement) => void;
  ensureCellToolbar: (options: EnsureCellToolbarOptions) => void;
  onToolbarAfterChange: () => void;
  host?: HTMLElement | null;
}

function renderTemplatesPreviewEmptyState(host: HTMLElement, title: string, body: string): void {
  host.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'ui-empty-state surface-empty-state templates-preview-empty-state p-6';

  const icon = document.createElement('span');
  icon.className = 'ui-empty-state__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '📄';

  const titleEl = document.createElement('p');
  titleEl.className = 'ui-empty-state__title';
  titleEl.textContent = title;

  const bodyEl = document.createElement('p');
  bodyEl.className = 'ui-empty-state__body surface-support-text surface-support-text--compact';
  bodyEl.textContent = body;

  wrapper.append(icon, titleEl, bodyEl);
  host.appendChild(wrapper);
}

function isTemplatesDebugEnabled(): boolean {
  try {
    const params = new URLSearchParams(window.location.search || '');
    if (params.get('debugTemplates') === '1') return true;
    const ls = window.localStorage?.getItem('__DEBUG_TEMPLATES__');
    if (ls && ['1', 'true', 'on', 'yes'].includes(String(ls).toLowerCase())) return true;
  } catch {
    // ignore debug flag failures
  }
  return false;
}

function pruneMeaninglessA4Pages(root: ParentNode | null | undefined): void {
  if (!root) return;
  Array.from(root.querySelectorAll('.a4-page')).forEach((page) => {
    if (!pageHasMeaningfulContent(page)) {
      page.parentElement?.removeChild(page);
    }
  });
}

export function fixCallsheetStructure(root?: ParentNode | null): void {
  const base = root ?? document.getElementById('templates-a4-root');
  if (!base) return;

  const tables = Array.from(base.querySelectorAll('table.cs-crew, table.cs-schedule'));
  tables.forEach((table) => {
    const inner = table.closest('.a4-inner');
    if (!inner) return;
    const wrapper = table.closest('.callsheet-v1');
    if (wrapper) return;

    let host = inner.querySelector(':scope > .callsheet-v1');
    if (!host) {
      host = document.createElement('div');
      host.className = 'callsheet-v1';
      inner.insertBefore(host, table);
    }

    try {
      host.appendChild(table);
    } catch {
      // ignore DOM move failures
    }
  });
}

export function enforceCallsheetSizing(scope?: ParentNode | null): void {
  try {
    const root = scope ?? document.querySelector('#templates-preview-host #templates-a4-root');
    if (!root) return;

    try {
      fixCallsheetStructure(root);
    } catch {
      // ignore wrapper normalization failures
    }

    const crews = Array.from(root.querySelectorAll<HTMLTableElement>('table.cs-crew'));
    crews.forEach((table) => {
      try {
        table.style.setProperty('width', '90%', 'important');
        table.style.setProperty('margin-left', 'auto', 'important');
        table.style.setProperty('margin-right', 'auto', 'important');
      } catch {
        // ignore style failures
      }
    });

    const schedules = Array.from(root.querySelectorAll<HTMLTableElement>('table.cs-schedule'));
    schedules.forEach((table) => {
      try {
        table.style.setProperty('width', 'calc(82% + 120px)', 'important');
        table.style.setProperty('margin-left', '11mm', 'important');
        table.style.setProperty('margin-right', '-16mm', 'important');
        const inner = table.closest<HTMLElement>('.a4-inner');
        if (inner) {
          inner.style.setProperty('padding-left', '0mm', 'important');
          inner.style.setProperty('padding-right', '0mm', 'important');
        }
      } catch {
        // ignore style failures
      }
    });

    const schedule = schedules[0];
    const tbody = schedule?.tBodies?.[0];
    if (!schedule || !tbody) return;

    const isSpecial = (row: Element): boolean =>
      row.classList.contains('cs-row-note') || row.classList.contains('cs-row-strong');

    const rows = Array.from(tbody.children) as HTMLElement[];
    const editableRows = rows.filter((row) => !isSpecial(row));
    const header = schedule.querySelector('thead tr');
    const columnCount = header?.children?.length || 12;

    while (editableRows.length < 4) {
      const tr = document.createElement('tr');
      for (let index = 0; index < columnCount; index += 1) {
        const td = document.createElement('td');
        td.setAttribute('data-editable', 'true');
        td.setAttribute('contenteditable', 'true');
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
      editableRows.push(tr);
    }
  } catch {
    // ignore sizing failures
  }
}

export function ensureEditableWrappers(root: ParentNode | null = document.getElementById('templates-a4-root')): void {
  if (!root) return;

  const tds = Array.from(root.querySelectorAll('table.exp-details td'));
  tds.forEach((cell) => {
    try {
      const isLast = cell === cell.parentElement?.lastElementChild;
      if (isLast) {
        cell.removeAttribute('contenteditable');
        cell.removeAttribute('data-editable');
        return;
      }

      const shouldEdit =
        cell.getAttribute('data-editable') === 'true' ||
        cell.getAttribute('contenteditable') === 'true' ||
        Boolean(cell.querySelector('[contenteditable="true"]'));

      if (!shouldEdit) return;

      const inner = cell.querySelector('[contenteditable="true"]');
      if (inner) {
        cell.innerHTML = inner.innerHTML;
      }

      cell.setAttribute('data-editable', 'true');
      cell.setAttribute('contenteditable', 'true');
      cell.setAttribute('autocapitalize', 'off');
      cell.setAttribute('autocorrect', 'off');
      cell.setAttribute('autocomplete', 'off');
      cell.setAttribute('spellcheck', 'false');
    } catch {
      // ignore per-cell cleanup failures
    }
  });
}

export function renderTemplatesPreview<ProjectLike extends { id?: unknown }, ReservationLike, HeaderFooterOptions>(
  options: RenderTemplatesPreviewOptions<ProjectLike, ReservationLike, HeaderFooterOptions>,
): void {
  const host = options.host ?? document.getElementById('templates-preview-host');
  if (!host) return;

  try {
    host.style.visibility = 'hidden';
  } catch {
    // ignore style failures
  }

  const project = options.getSelectedProject();
  const oldRoot = host.querySelector('#templates-a4-root');
  if (!project) {
    renderTemplatesPreviewEmptyState(
      host,
      options.emptyMessage,
      options.emptyBodyMessage || 'اختر المشروع والحجز ونوع القالب أولاً، ثم ابدأ الحفظ أو الطباعة من نفس السطح.',
    );
    try {
      host.style.visibility = '';
    } catch {
      // ignore style failures
    }
    return;
  }

  const reservations = options.getSelectedReservations(project.id);
  const type = options.getTemplateType();
  const headerFooter = options.readHeaderFooterOptions(options.companyInfo);
  options.ensureLogoControls(type);

  let pageRoot =
    type === 'callsheet'
      ? options.buildCallSheetPage(project, reservations, headerFooter)
      : options.buildExpensesPage(project, reservations, headerFooter);

  if (oldRoot && pageRoot && oldRoot.tagName === pageRoot.tagName) {
    const oldPages = oldRoot.querySelector('[data-a4-pages]');
    const newPages = pageRoot.querySelector('[data-a4-pages]');
    if (oldPages && newPages) {
      try {
        oldPages.replaceWith(newPages);
      } catch {
        oldRoot.innerHTML = pageRoot.innerHTML;
      }
    } else {
      oldRoot.innerHTML = pageRoot.innerHTML;
    }
    pageRoot = oldRoot as HTMLElement;
  } else {
    host.innerHTML = '';
    host.appendChild(pageRoot);
  }

  try {
    options.applyTemplateAutofill?.({
      root: pageRoot,
      project,
      reservations,
      type,
    });
  } catch {
    // ignore autofill failures
  }

  try {
    enforceCallsheetSizing(pageRoot);
  } catch {
    // ignore sizing failures
  }
  try {
    options.setupTemplatesHistory(pageRoot, type);
  } catch {
    // ignore history setup failures
  }
  try {
    options.ensureCellToolbar({
      onAfterChange: options.onToolbarAfterChange,
      onRenumber: options.renumberExpenseCodes,
      onTotalsChange: options.recomputeExpensesSubtotals,
    });
  } catch {
    // ignore toolbar failures
  }
  try {
    options.shrinkScheduleHeaderLabels();
  } catch {
    // ignore label shrink failures
  }
  try {
    if (type === 'callsheet') {
      options.purgeCrewCallTables();
      options.ensureCrewTableExists();
      options.ensureCrewOnSecondPage();
      options.unifyCrewCallTables();
      options.ensureSingleCrewTableStrict();
    }
  } catch {
    // ignore crew table normalization failures
  }
  try {
    ensureEditableWrappers(pageRoot);
  } catch {
    // ignore editable wrapper failures
  }

  try {
    if (type === 'callsheet') {
      const selectedReservation = options.getSelectedReservations(project.id)?.[0] || null;
      const fill = (): void => options.populateCrewFromReservationIfEmpty(selectedReservation);

      Promise.resolve(options.ensureTechnicianPositionsLoaded())
        .catch(() => {})
        .finally(() => {
          const technicians = options.getTechniciansState();
          if (!Array.isArray(technicians) || !technicians.length) {
            options.refreshTechniciansFromApi().then(fill).catch(() => fill());
          } else {
            fill();
          }
        });
    }
  } catch {
    // ignore technician hydration failures
  }

  try {
    if (type === 'callsheet') {
      options.populateCrewFromReservationIfEmpty(options.getSelectedReservations(project.id)?.[0] || null);
    }
  } catch {
    // ignore direct crew fill failures
  }

  try {
    pruneMeaninglessA4Pages(pageRoot);
  } catch {
    // ignore empty page pruning failures
  }
  try {
    options.renumberExpenseCodes();
  } catch {
    // ignore renumber failures
  }

  options.recomputeExpensesSubtotals();

  try {
    options.autoPaginateTemplates({ headerFooter: false, logoUrl: options.companyInfo.logoUrl });
  } catch {
    // ignore pagination failures
  }
  try {
    options.paginateExpDetailsTables({ headerFooter: false, logoUrl: options.companyInfo.logoUrl });
  } catch {
    // ignore expenses pagination failures
  }
  try {
    pruneMeaninglessA4Pages(pageRoot);
  } catch {
    // ignore empty page pruning failures
  }
  try {
    if (type === 'callsheet') {
      options.ensureCrewOnSecondPage();
    }
  } catch {
    // ignore crew placement failures
  }
  try {
    if (type === 'callsheet') {
      options.purgeCrewCallTables();
      options.ensureCrewTableExists();
      options.ensureCrewOnSecondPage();
      options.unifyCrewCallTables();
      options.ensureSingleCrewTableStrict();
      enforceCallsheetSizing(pageRoot);
      options.pruneEmptyA4Pages();
    }
  } catch {
    // ignore post-pagination cleanup failures
  }
  try {
    options.renumberExpenseCodes();
  } catch {
    // ignore renumber failures
  }
  try {
    options.paginateGenericTplTables({ headerFooter: false, logoUrl: options.companyInfo.logoUrl, isLandscape: true });
  } catch {
    // ignore generic pagination failures
  }
  try {
    if (type === 'callsheet') {
      enforceCallsheetSizing(pageRoot);
    }
  } catch {
    // ignore sizing failures
  }
  try {
    options.ensurePdfTunerUI();
  } catch {
    // ignore tuner UI failures
  }
  try {
    const debugEnabled = options.isDebugOverlayEnabled ?? isTemplatesDebugEnabled;
    if (type === 'callsheet' && debugEnabled()) {
      showTemplatesDebugOverlay(pageRoot, options.getSelectedReservations(project.id)?.[0] || null);
    }
  } catch {
    // ignore debug overlay failures
  }
  try {
    if (type === 'callsheet') {
      enforceCallsheetSizing(pageRoot);
    }
  } catch {
    // ignore sizing failures
  }
  try {
    host.style.visibility = '';
  } catch {
    // ignore style failures
  }

  try {
    templatesTabState.zoomMode = options.readTplZoomModePref();
    if (templatesTabState.zoomMode === 'fit') {
      options.applyTemplatesFitZoom();
    } else {
      const saved = options.readTplZoomPref();
      templatesTabState.previewZoom = saved;
      options.setTemplatesPreviewZoom(saved, { silent: true });
    }
    if (options.zoomValueEl) {
      options.zoomValueEl.textContent = `${Math.round(templatesTabState.previewZoom * 100)}%`;
    }
  } catch {
    // ignore zoom sync failures
  }
}

export async function loadSnapshotById(options: LoadSnapshotByIdOptions): Promise<boolean> {
  if (!options.id) return false;

  const host = options.host ?? document.getElementById('templates-preview-host');
  if (!host) return false;

  try {
    host.style.visibility = 'hidden';
  } catch {
    // ignore style failures
  }

  let loaded = false;

  try {
    const response = await options.apiRequestFn(`/project-templates/?id=${encodeURIComponent(options.id)}`);
    const payload = response && typeof response === 'object' && 'data' in response ? response.data : response;
    const item = Array.isArray(payload) ? payload[0] : payload;
    if (!item) return false;

    host.innerHTML = '';

    try {
      const rawData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
      if (!rawData?.html) return false;

      const wrap = document.createElement('div');
      wrap.innerHTML = options.normalizeTemplateHtmlLegacyUrls(rawData.html, options.companyInfo);
      const root = wrap.firstElementChild;
      if (!root) return false;

      host.appendChild(root);
      loaded = true;
      try {
        options.fixCallsheetStructure(root);
      } catch {
        // ignore wrapper normalization failures
      }
      try {
        options.unifyCrewCallTables();
        options.ensureSingleCrewTableStrict();
        options.ensureCrewOnSecondPage();
      } catch {
        // ignore crew normalization failures
      }
      try {
        options.enforceCallsheetSizing(root);
      } catch {
        // ignore sizing failures
      }
      try {
        options.shrinkScheduleHeaderLabels();
      } catch {
        // ignore label shrink failures
      }
      try {
        options.pruneEmptyA4Pages();
      } catch {
        // ignore prune failures
      }
      try {
        options.attachCallsheetLogoBehaviors?.(root as HTMLElement);
      } catch {
        // ignore logo rebinding failures
      }
      try {
        options.ensureCellToolbar({
          onAfterChange: options.onToolbarAfterChange,
          onRenumber: options.renumberExpenseCodes,
          onTotalsChange: options.recomputeExpensesSubtotals,
        });
      } catch {
        // ignore toolbar failures
      }
    } catch {
      // ignore malformed snapshot payloads
    }
  } catch (error) {
    options.notifyApiError(error, 'تعذر تحميل القالب');
  } finally {
    try {
      host.style.visibility = '';
    } catch {
      // ignore style failures
    }
  }

  return loaded;
}
