import type { TemplatesStatusTone } from './ui-state';

interface TemplatesWorkspaceOptions<ProjectLike, ReservationLike, HeaderFooterOptions, TemplatesSnapshot> {
  companyInfo: { logoUrl: string; [key: string]: unknown };
  getContextKey: () => string;
  getSelectedProject: () => ProjectLike | null;
  getSelectedReservations: (projectId: unknown) => ReservationLike[];
  getCurrentType: () => string;
  getCurrentReservationId: () => number | null;
  getSavedSelect: () => HTMLSelectElement | null;
  getHostRoot: () => HTMLElement | null;
  getHost: () => HTMLElement | null;
  getSaveTitleInput: () => HTMLInputElement | null;
  apiRequestFn: (url: string, options?: Record<string, unknown>) => Promise<unknown>;
  notifyApiError: (error: unknown, fallback?: string) => void;
  alertFn: (message: string) => void;
  showToastFn?: (message: string, type?: string, durationMs?: number) => void;
  setStatus?: (message: string, tone?: TemplatesStatusTone) => void;
  syncSavedControlsState?: (state: { hasProject: boolean; hasItems: boolean; isLoading?: boolean }) => void;
  translate?: (key: string, fallback?: string) => string;
  savedPlaceholderLabel?: string;
  savedEmptyLabel?: string;
  emptyBodyMessage?: string;
  buildDefaultSnapshotTitle?: (options: {
    projectTitle: string;
    type: string;
    reservationId: number | null;
    copy: boolean;
  }) => string;
  normalizeTemplateHtmlLegacyUrls: (html: string, companyInfo: { logoUrl: string }) => string;
  readHeaderFooterOptions: (companyInfo: { logoUrl: string }) => HeaderFooterOptions;
  ensureLogoControls: (type?: string) => void;
  buildCallSheetPage: (project: ProjectLike, reservations: ReservationLike[], headerFooter: HeaderFooterOptions) => HTMLElement;
  buildExpensesPage: (project: ProjectLike, reservations: ReservationLike[], headerFooter: HeaderFooterOptions) => HTMLElement;
  applyTemplateAutofill?: (options: {
    root: HTMLElement;
    project: ProjectLike;
    reservations: ReservationLike[];
    type: string;
  }) => void;
  setupTemplatesHistory: (root: HTMLElement, type: string) => void;
  ensureCellToolbar: (options: {
    onAfterChange: () => void;
    onRenumber?: () => void;
    onTotalsChange?: () => void;
  }) => void;
  shrinkScheduleHeaderLabels: () => void;
  purgeCrewCallTables: () => void;
  ensureCrewTableExists: () => void;
  ensureCrewOnSecondPage: () => void;
  unifyCrewCallTables: () => void;
  ensureSingleCrewTableStrict: () => void;
  fixCallsheetStructure: (root?: ParentNode | null) => void;
  enforceCallsheetSizing: (root?: ParentNode | null) => void;
  attachCallsheetLogoBehaviors: (root: HTMLElement) => void;
  populateCrewFromReservation: (crewTable: Element, reservation: ReservationLike) => void;
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
  readTplZoomModePref: () => string;
  readTplZoomPref: () => number;
  applyTemplatesFitZoom: () => void;
  setTemplatesPreviewZoom: (zoom: number, options?: { silent?: boolean }) => void;
  zoomValueEl?: { textContent: string | null } | null;
  snapshotShading: (root: ParentNode) => unknown;
  applyShadingSnapshot: (root: ParentNode, snapshot: unknown) => void;
  readPrimaryLogoState: () => unknown;
  readSecondaryLogoState: () => unknown;
  writePrimaryLogoState: (patch: Record<string, unknown>) => void;
  writeSecondaryLogoState: (patch: Record<string, unknown>) => void;
  applyTemplatesPreviewZoom: (zoom: number) => void;
  pushTemplatesHistory: () => void;
  pushHistoryDebounced: () => void;
  markTemplatesEditingActivity: (options: { autosaveToServerDebounced: () => void }) => void;
  saveTemplatesAutosaveToStorage: (options: { getContextKey: () => string; getSnapshot: () => TemplatesSnapshot | null }) => void;
  saveAutosaveDebounced: (options: { getContextKey: () => string; getSnapshot: () => TemplatesSnapshot | null }) => void;
  restoreTemplatesAutosaveIfPresent: (options: {
    getContextKey: () => string;
    companyInfo: { logoUrl: string };
    normalizeTemplateHtmlLegacyUrls: (html: string, companyInfo: { logoUrl: string }) => string;
    ensureCellToolbar: (options: {
      onAfterChange: () => void;
      onRenumber?: () => void;
      onTotalsChange?: () => void;
    }) => void;
    onToolbarAfterChange: () => void;
    attachCallsheetLogoBehaviors: (root: HTMLElement) => void;
    unifyCrewCallTables: () => void;
    ensureSingleCrewTableStrict: () => void;
    enforceCallsheetSizing: (root?: ParentNode | null) => void;
    pruneEmptyA4Pages: () => void;
    pushTemplatesHistory: () => void;
    applyTemplatesPreviewZoom: (zoom: number) => void;
    writePrimaryLogoState: (patch: Record<string, unknown>) => void;
    writeSecondaryLogoState: (patch: Record<string, unknown>) => void;
    applyShadingSnapshot: (root: ParentNode, snapshot: unknown) => void;
  }) => void;
  getTemplatesSnapshot: (options: {
    snapshotShading: (root: ParentNode) => unknown;
    readPrimaryLogoState: () => unknown;
    readSecondaryLogoState: () => unknown;
  }) => TemplatesSnapshot | null;
  applyTemplatesSnapshotInPlace: (options: {
    snap: Partial<TemplatesSnapshot> | null | undefined;
    writePrimaryLogoState: (patch: Record<string, unknown>) => void;
    writeSecondaryLogoState: (patch: Record<string, unknown>) => void;
    applyShadingSnapshot: (root: ParentNode, snapshot: unknown) => void;
  }) => void;
  applyTemplatesSnapshot: (options: {
    snap: Partial<TemplatesSnapshot> | null | undefined;
    writePrimaryLogoState: (patch: Record<string, unknown>) => void;
    writeSecondaryLogoState: (patch: Record<string, unknown>) => void;
    renderPreview: () => void;
  }) => void;
  readRemoteAutosaveId: (contextKey: string) => number | null;
  writeRemoteAutosaveId: (contextKey: string, id: number | null) => void;
  sanitizeHtmlForExport: (html: string, companyInfo: { logoUrl: string }) => string;
  ensureRemoteAutosaveId: (options: {
    contextKey: string;
    fetchSavedTemplates: () => Promise<Array<{ id?: number | string; title?: string | null }>>;
    projectId: number;
    type: string;
    reservationId: number | null;
    hostHtml: string;
    companyInfo: { logoUrl: string };
    apiRequestFn: (url: string, options?: Record<string, unknown>) => Promise<unknown>;
  }) => Promise<number | null>;
  autosaveTemplateToServer: (options: {
    contextKey: string;
    hostHtml: string;
    companyInfo: { logoUrl: string };
    ensureId: () => Promise<number | null>;
    apiRequestFn: (url: string, options?: Record<string, unknown>) => Promise<unknown>;
    onError?: (error: unknown) => void;
  }) => Promise<void>;
  autosaveToServerDebounced: (run: () => Promise<void> | void, delay?: number) => void;
  renderTemplatesPreview: (options: {
    companyInfo: { logoUrl: string };
    emptyMessage: string;
    getSelectedProject: () => ProjectLike | null;
    getSelectedReservations: (projectId: unknown) => ReservationLike[];
    getTemplateType: () => string;
    readHeaderFooterOptions: (companyInfo: { logoUrl: string }) => HeaderFooterOptions;
    ensureLogoControls: (type?: string) => void;
    buildCallSheetPage: (project: ProjectLike, reservations: ReservationLike[], headerFooter: HeaderFooterOptions) => HTMLElement;
    buildExpensesPage: (project: ProjectLike, reservations: ReservationLike[], headerFooter: HeaderFooterOptions) => HTMLElement;
    applyTemplateAutofill?: (options: {
      root: HTMLElement;
      project: ProjectLike;
      reservations: ReservationLike[];
      type: string;
    }) => void;
    setupTemplatesHistory: (root: HTMLElement, type: string) => void;
    ensureCellToolbar: (options: {
      onAfterChange: () => void;
      onRenumber?: () => void;
      onTotalsChange?: () => void;
    }) => void;
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
    readTplZoomModePref: () => string;
    readTplZoomPref: () => number;
    applyTemplatesFitZoom: () => void;
    setTemplatesPreviewZoom: (zoom: number, options?: { silent?: boolean }) => void;
    zoomValueEl?: { textContent: string | null } | null;
  }) => void;
  fetchSavedTemplatesForProject: (options: {
    apiRequestFn: (url: string) => Promise<unknown>;
    projectId: string | number;
    type: string;
  }) => Promise<Array<{ id?: number | string; title?: string | null }>>;
  populateSavedTemplatesSelect: (
    selectEl: HTMLSelectElement,
    items: Array<{ id?: number | string; title?: string | null }>,
    fallbackItems?: Array<{ id?: number | string; title?: string | null }>,
  ) => void;
  saveTemplateSnapshotRequest: (options: {
    apiRequestFn: (url: string, options?: Record<string, unknown>) => Promise<unknown>;
    project: { id: string | number; title?: string | null };
    type: string;
    reservationId: number | null;
    rootHtml: string;
    customTitle: string;
    sanitizedHtml: string;
    contextKey: string;
    clearLocalAutosave: (contextKey: string) => void;
  }) => Promise<void>;
  loadSnapshotById: (options: {
    id: string | number;
    apiRequestFn: (url: string) => Promise<unknown>;
    notifyApiError: (error: unknown, fallback?: string) => void;
    companyInfo: { logoUrl: string };
    normalizeTemplateHtmlLegacyUrls: (html: string, companyInfo: { logoUrl: string }) => string;
    fixCallsheetStructure: (root?: ParentNode | null) => void;
    unifyCrewCallTables: () => void;
    ensureSingleCrewTableStrict: () => void;
    ensureCrewOnSecondPage: () => void;
    enforceCallsheetSizing: (root?: ParentNode | null) => void;
    shrinkScheduleHeaderLabels: () => void;
    pruneEmptyA4Pages: () => void;
    attachCallsheetLogoBehaviors?: (root: HTMLElement) => void;
    ensureCellToolbar: (options: {
      onAfterChange: () => void;
      onRenumber?: () => void;
      onTotalsChange?: () => void;
    }) => void;
    onToolbarAfterChange: () => void;
  }) => Promise<boolean>;
}

export function createTemplatesWorkspace<ProjectLike extends { id?: string | number; title?: string | null }, ReservationLike, HeaderFooterOptions, TemplatesSnapshot>(
  options: TemplatesWorkspaceOptions<ProjectLike, ReservationLike, HeaderFooterOptions, TemplatesSnapshot>,
) {
  const schedulePreviewRepaginate = (): void => {
    try {
      setTimeout(() => {
        options.paginateGenericTplTables({ headerFooter: false, logoUrl: options.companyInfo.logoUrl, isLandscape: true });
        options.pruneEmptyA4Pages();
      }, 30);
    } catch {
      // ignore repagination scheduling failures
    }
  };

  const handlePreviewMutation = (): void => {
    try {
      options.pushHistoryDebounced();
      workspace.saveAutosaveDebounced();
      workspace.markEditingActivity();
    } catch {
      // ignore mutation side-effect failures
    }
    schedulePreviewRepaginate();
  };

  const workspace = {
    handlePreviewMutation,

    markEditingActivity(): void {
      options.markTemplatesEditingActivity({
        autosaveToServerDebounced: () => {
          try {
            workspace.autosaveToServerDebounced();
          } catch {
            // ignore remote autosave scheduling failures
          }
        },
      });
    },

    saveTemplatesAutosaveToStorage(): void {
      options.saveTemplatesAutosaveToStorage({
        getContextKey: options.getContextKey,
        getSnapshot: () => workspace.getTemplatesSnapshot(),
      });
    },

    saveAutosaveDebounced(): void {
      options.saveAutosaveDebounced({
        getContextKey: options.getContextKey,
        getSnapshot: () => workspace.getTemplatesSnapshot(),
      });
    },

    restoreTemplatesAutosaveIfPresent(): void {
      options.restoreTemplatesAutosaveIfPresent({
        getContextKey: options.getContextKey,
        companyInfo: options.companyInfo,
        normalizeTemplateHtmlLegacyUrls: options.normalizeTemplateHtmlLegacyUrls,
        ensureCellToolbar: options.ensureCellToolbar,
        onToolbarAfterChange: handlePreviewMutation,
        attachCallsheetLogoBehaviors: options.attachCallsheetLogoBehaviors,
        unifyCrewCallTables: options.unifyCrewCallTables,
        ensureSingleCrewTableStrict: options.ensureSingleCrewTableStrict,
        enforceCallsheetSizing: options.enforceCallsheetSizing,
        pruneEmptyA4Pages: options.pruneEmptyA4Pages,
        pushTemplatesHistory: options.pushTemplatesHistory,
        applyTemplatesPreviewZoom: options.applyTemplatesPreviewZoom,
        writePrimaryLogoState: options.writePrimaryLogoState,
        writeSecondaryLogoState: options.writeSecondaryLogoState,
        applyShadingSnapshot: options.applyShadingSnapshot,
      });
    },

    getTemplatesSnapshot(): TemplatesSnapshot | null {
      return options.getTemplatesSnapshot({
        snapshotShading: options.snapshotShading,
        readPrimaryLogoState: options.readPrimaryLogoState,
        readSecondaryLogoState: options.readSecondaryLogoState,
      });
    },

    applyTemplatesSnapshotInPlace(snap: Partial<TemplatesSnapshot> | null | undefined): void {
      options.applyTemplatesSnapshotInPlace({
        snap,
        writePrimaryLogoState: options.writePrimaryLogoState,
        writeSecondaryLogoState: options.writeSecondaryLogoState,
        applyShadingSnapshot: options.applyShadingSnapshot,
      });
    },

    applyTemplatesSnapshot(snap: Partial<TemplatesSnapshot> | null | undefined): void {
      options.applyTemplatesSnapshot({
        snap,
        writePrimaryLogoState: options.writePrimaryLogoState,
        writeSecondaryLogoState: options.writeSecondaryLogoState,
        renderPreview: () => {
          try {
            workspace.renderTemplatesPreview();
          } catch {
            // ignore rerender failures
          }
        },
      });
    },

    readRemoteAutosaveId(): number | null {
      return options.readRemoteAutosaveId(options.getContextKey());
    },

    writeRemoteAutosaveId(id: number | null): void {
      options.writeRemoteAutosaveId(options.getContextKey(), id);
    },

    sanitizeHtmlForExport(html: string): string {
      return options.sanitizeHtmlForExport(html, options.companyInfo);
    },

    async ensureRemoteAutosaveId(): Promise<number | null> {
      const project = options.getSelectedProject();
      const host = options.getHostRoot();
      if (!project || !host) return null;

      return options.ensureRemoteAutosaveId({
        contextKey: options.getContextKey(),
        fetchSavedTemplates: () => workspace.fetchSavedTemplatesForCurrent(),
        projectId: Number(project.id),
        type: options.getCurrentType(),
        reservationId: options.getCurrentReservationId(),
        hostHtml: host.outerHTML,
        companyInfo: options.companyInfo,
        apiRequestFn: options.apiRequestFn,
      });
    },

    async autosaveTemplateToServer(): Promise<void> {
      const host = options.getHostRoot();
      if (!host) return;

      await options.autosaveTemplateToServer({
        contextKey: options.getContextKey(),
        hostHtml: host.outerHTML,
        companyInfo: options.companyInfo,
        ensureId: () => workspace.ensureRemoteAutosaveId(),
        apiRequestFn: options.apiRequestFn,
        onError: (error) => options.notifyApiError(error, 'تعذر الحفظ التلقائي'),
      });
    },

    autosaveToServerDebounced(): void {
      options.autosaveToServerDebounced(() => workspace.autosaveTemplateToServer(), 800);
    },

    renderTemplatesPreview(): void {
      options.renderTemplatesPreview({
        companyInfo: options.companyInfo,
        emptyMessage: options.translate?.('projects.templates.empty', 'اختر مشروعاً لبدء إنشاء القوالب.') || 'اختر مشروعاً لبدء إنشاء القوالب.',
        emptyBodyMessage: options.emptyBodyMessage,
        getSelectedProject: options.getSelectedProject,
        getSelectedReservations: options.getSelectedReservations,
        getTemplateType: options.getCurrentType,
        readHeaderFooterOptions: options.readHeaderFooterOptions,
        ensureLogoControls: options.ensureLogoControls,
        buildCallSheetPage: options.buildCallSheetPage,
        buildExpensesPage: options.buildExpensesPage,
        applyTemplateAutofill: options.applyTemplateAutofill,
        setupTemplatesHistory: options.setupTemplatesHistory,
        ensureCellToolbar: options.ensureCellToolbar,
        onToolbarAfterChange: handlePreviewMutation,
        shrinkScheduleHeaderLabels: options.shrinkScheduleHeaderLabels,
        purgeCrewCallTables: options.purgeCrewCallTables,
        ensureCrewTableExists: options.ensureCrewTableExists,
        ensureCrewOnSecondPage: options.ensureCrewOnSecondPage,
        unifyCrewCallTables: options.unifyCrewCallTables,
        ensureSingleCrewTableStrict: options.ensureSingleCrewTableStrict,
        populateCrewFromReservationIfEmpty: options.populateCrewFromReservationIfEmpty,
        ensureTechnicianPositionsLoaded: options.ensureTechnicianPositionsLoaded,
        getTechniciansState: options.getTechniciansState,
        refreshTechniciansFromApi: options.refreshTechniciansFromApi,
        renumberExpenseCodes: options.renumberExpenseCodes,
        recomputeExpensesSubtotals: options.recomputeExpensesSubtotals,
        autoPaginateTemplates: options.autoPaginateTemplates,
        paginateExpDetailsTables: options.paginateExpDetailsTables,
        pruneEmptyA4Pages: options.pruneEmptyA4Pages,
        paginateGenericTplTables: options.paginateGenericTplTables,
        ensurePdfTunerUI: options.ensurePdfTunerUI,
        readTplZoomModePref: options.readTplZoomModePref,
        readTplZoomPref: options.readTplZoomPref,
        applyTemplatesFitZoom: options.applyTemplatesFitZoom,
        setTemplatesPreviewZoom: options.setTemplatesPreviewZoom,
        zoomValueEl: options.zoomValueEl,
      });
    },

    async fetchCrewFromReservation(force = false): Promise<void> {
      try {
        options.setStatus?.(
          options.translate?.('projects.templates.status.fetchingCrew', 'جارٍ جلب بيانات الطاقم من الحجز…') || 'جارٍ جلب بيانات الطاقم من الحجز…',
          'neutral',
        );
        const host = options.getHostRoot();
        if (!host) {
          options.alertFn('لا يوجد محتوى');
          return;
        }

        const crew = host.querySelector('.callsheet-v1 table.cs-crew');
        if (!crew) {
          options.alertFn('لا يوجد جدول Crew في القالب الحالي');
          return;
        }

        const project = options.getSelectedProject();
        const reservation = project ? (options.getSelectedReservations(project.id)?.[0] || null) : null;
        if (!reservation) {
          options.alertFn('اختر حجزاً مرتبطاً أولاً');
          return;
        }

        if (force) {
          options.populateCrewFromReservation(crew, reservation);
        } else {
          options.populateCrewFromReservationIfEmpty(reservation);
        }

        options.showToastFn?.('تم جلب بيانات الطاقم', 'success', 2500);
        options.setStatus?.(
          options.translate?.('projects.templates.status.fetchedCrew', 'تم تحديث بيانات الطاقم داخل القالب.') || 'تم تحديث بيانات الطاقم داخل القالب.',
          'success',
        );
      } catch {
        options.setStatus?.('تعذر جلب بيانات الطاقم من الحجز.', 'error');
        options.alertFn('تعذر جلب بيانات الطاقم');
      }
    },

    async saveTemplateSnapshot({ copy = false }: { copy?: boolean } = {}): Promise<string> {
      void copy;
      const project = options.getSelectedProject();
      if (!project) {
        options.alertFn('اختر مشروعاً أولاً');
        throw new Error('No project selected');
      }

      const root = options.getHostRoot();
      if (!root) {
        options.alertFn('لا يوجد محتوى للحفظ');
        throw new Error('No template root to save');
      }

      const nameInput = options.getSaveTitleInput();
      const customTitle = nameInput?.value ? String(nameInput.value).trim() : '';

      options.setStatus?.(
        options.translate?.('projects.templates.status.saving', 'جارٍ حفظ القالب الحالي…') || 'جارٍ حفظ القالب الحالي…',
        'neutral',
      );
      const defaultTitle = options.buildDefaultSnapshotTitle?.({
        projectTitle: String(project.title || 'Template'),
        type: options.getCurrentType(),
        reservationId: options.getCurrentReservationId(),
        copy,
      }) || `${project.title || 'Template'} - ${options.getCurrentType()}`;
      const effectiveTitle = customTitle || defaultTitle;

      await options.saveTemplateSnapshotRequest({
        apiRequestFn: options.apiRequestFn,
        project: { id: project.id ?? '', title: project.title || null },
        type: options.getCurrentType(),
        reservationId: options.getCurrentReservationId(),
        rootHtml: root.outerHTML,
        customTitle: effectiveTitle,
        sanitizedHtml: workspace.sanitizeHtmlForExport(root.outerHTML),
        contextKey: options.getContextKey(),
        clearLocalAutosave: (contextKey: string) => {
          try {
            localStorage.removeItem(contextKey);
          } catch {
            // ignore storage cleanup failures
          }
        },
      });

      options.setStatus?.(
        copy
          ? options.translate?.('projects.templates.status.saved', 'تم حفظ القالب الحالي.') || 'تم حفظ القالب الحالي.'
          : options.translate?.('projects.templates.status.saved', 'تم حفظ القالب الحالي.') || 'تم حفظ القالب الحالي.',
        'success',
      );
      if (nameInput) {
        nameInput.value = effectiveTitle;
      }
      options.alertFn('تم حفظ القالب');
      return effectiveTitle;
    },

    async fetchSavedTemplatesForCurrent(): Promise<Array<{ id?: number | string; title?: string | null }>> {
      const project = options.getSelectedProject();
      if (!project) return [];

      return options.fetchSavedTemplatesForProject({
        apiRequestFn: (url: string) => options.apiRequestFn(url),
        projectId: project.id || '',
        type: options.getCurrentType(),
      });
    },

    async populateSavedTemplates(): Promise<void> {
      const select = options.getSavedSelect();
      if (!(select instanceof HTMLSelectElement)) return;

      const project = options.getSelectedProject();
      if (!project) {
        options.syncSavedControlsState?.({ hasProject: false, hasItems: false, isLoading: false });
        options.setStatus?.(
          options.translate?.('projects.templates.status.chooseProject', 'اختر مشروعاً أولاً لعرض المحفوظات وتجهيز القالب.')
            || 'اختر مشروعاً أولاً لعرض المحفوظات وتجهيز القالب.',
          'neutral',
        );
        return;
      }

      options.syncSavedControlsState?.({ hasProject: true, hasItems: false, isLoading: true });
      options.setStatus?.(
        options.translate?.('projects.templates.status.loadingSaved', 'جارٍ تحديث المحفوظات المرتبطة بهذا القالب…')
          || 'جارٍ تحديث المحفوظات المرتبطة بهذا القالب…',
        'neutral',
      );

      const before = Array.from(select.options).slice(1).map((option) => ({
        id: option.value,
        title: option.textContent,
      }));
      const items = await workspace.fetchSavedTemplatesForCurrent();
      options.populateSavedTemplatesSelect(select, items, before, {
        placeholderLabel: options.savedPlaceholderLabel,
        emptyLabel: options.savedEmptyLabel,
      });
      options.syncSavedControlsState?.({ hasProject: true, hasItems: items.length > 0, isLoading: false });
      options.setStatus?.(
        items.length
          ? options.translate?.('projects.templates.status.savedReady', 'المحفوظات جاهزة للتحميل أو الإدارة من نفس السطح.')
            || 'المحفوظات جاهزة للتحميل أو الإدارة من نفس السطح.'
          : options.translate?.('projects.templates.status.noSaved', 'لا توجد محفوظات لهذا القالب بعد. ابدأ بالحفظ من نفس السطح.')
            || 'لا توجد محفوظات لهذا القالب بعد. ابدأ بالحفظ من نفس السطح.',
        'neutral',
      );
    },

    async loadSnapshotById(id: string | number): Promise<void> {
      options.setStatus?.(
        options.translate?.('projects.templates.status.loadingTemplate', 'جارٍ تحميل المحفوظ داخل المعاينة…')
          || 'جارٍ تحميل المحفوظ داخل المعاينة…',
        'neutral',
      );
      const loaded = await options.loadSnapshotById({
        id,
        apiRequestFn: (url: string) => options.apiRequestFn(url),
        notifyApiError: options.notifyApiError,
        companyInfo: options.companyInfo,
        normalizeTemplateHtmlLegacyUrls: options.normalizeTemplateHtmlLegacyUrls,
        fixCallsheetStructure: options.fixCallsheetStructure,
        unifyCrewCallTables: options.unifyCrewCallTables,
        ensureSingleCrewTableStrict: options.ensureSingleCrewTableStrict,
        ensureCrewOnSecondPage: options.ensureCrewOnSecondPage,
        enforceCallsheetSizing: options.enforceCallsheetSizing,
        shrinkScheduleHeaderLabels: options.shrinkScheduleHeaderLabels,
        pruneEmptyA4Pages: options.pruneEmptyA4Pages,
        attachCallsheetLogoBehaviors: options.attachCallsheetLogoBehaviors,
        ensureCellToolbar: options.ensureCellToolbar,
        onToolbarAfterChange: handlePreviewMutation,
      });
      options.setStatus?.(
        loaded
          ? options.translate?.('projects.templates.status.loadedTemplate', 'تم تحميل المحفوظ داخل المعاينة.')
            || 'تم تحميل المحفوظ داخل المعاينة.'
          : 'تعذر تحميل المحفوظ داخل المعاينة.',
        loaded ? 'success' : 'error',
      );
    },
  };

  return workspace;
}
