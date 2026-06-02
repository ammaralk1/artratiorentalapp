import { templatesTabState } from './state';
import type { PrimaryLogoState, SecondaryLogoState } from './formatting';
import type { TemplatesCompanyInfo } from './context';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface TemplatesSnapshot {
  edits: string[];
  l: PrimaryLogoState;
  r: SecondaryLogoState;
  sh: unknown;
}

export interface TemplatesAutosavePayload {
  v: number;
  ts: number;
  snap: TemplatesSnapshot;
  html: string;
}

export interface MarkTemplatesEditingActivityOptions {
  autosaveToServerDebounced: () => void;
  idleDelay?: number;
}

export interface SaveTemplatesAutosaveToStorageOptions {
  getContextKey: () => string;
  getSnapshot: () => TemplatesSnapshot | null;
  root?: HTMLElement | null;
  storage?: StorageLike | null;
}

export interface SaveAutosaveDebouncedOptions extends SaveTemplatesAutosaveToStorageOptions {
  delay?: number;
}

export interface GetTemplatesSnapshotOptions {
  root?: ParentNode | null;
  snapshotShading: (root: ParentNode) => unknown;
  readPrimaryLogoState: () => PrimaryLogoState;
  readSecondaryLogoState: () => SecondaryLogoState;
}

export interface ApplyTemplatesSnapshotInPlaceOptions {
  snap: Partial<TemplatesSnapshot> | null | undefined;
  root?: ParentNode | null;
  writePrimaryLogoState: (patch: Partial<PrimaryLogoState>) => void;
  writeSecondaryLogoState: (patch: Partial<SecondaryLogoState>) => void;
  applyShadingSnapshot: (root: ParentNode, snapshot: unknown) => void;
}

export interface ApplyTemplatesSnapshotOptions {
  snap: Partial<TemplatesSnapshot> | null | undefined;
  writePrimaryLogoState: (patch: Partial<PrimaryLogoState>) => void;
  writeSecondaryLogoState: (patch: Partial<SecondaryLogoState>) => void;
  renderPreview: () => void;
  root?: ParentNode | null;
}

export interface RestoreTemplatesAutosaveIfPresentOptions extends Omit<ApplyTemplatesSnapshotInPlaceOptions, 'snap'> {
  getContextKey: () => string;
  companyInfo: Pick<TemplatesCompanyInfo, 'logoUrl'>;
  normalizeTemplateHtmlLegacyUrls: (html: string, companyInfo: Pick<TemplatesCompanyInfo, 'logoUrl'>) => string;
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
  host?: HTMLElement | null;
  storage?: StorageLike | null;
}

function getBrowserStorage(): StorageLike | null {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
}

export function markTemplatesEditingActivity(options: MarkTemplatesEditingActivityOptions): void {
  templatesTabState.editing = true;
  clearTimeout(templatesTabState.editingTimer ?? undefined);
  templatesTabState.editingTimer = setTimeout(() => {
    templatesTabState.editing = false;
    try {
      options.autosaveToServerDebounced();
    } catch {
      // ignore remote autosave failures
    }
  }, options.idleDelay ?? 1200);
}

export function getTemplatesSnapshot(options: GetTemplatesSnapshotOptions): TemplatesSnapshot | null {
  const root = options.root ?? document.getElementById('templates-a4-root');
  if (!root) return null;
  return {
    edits: Array.from(root.querySelectorAll('[data-editable="true"]')).map((el) => el.innerHTML),
    l: options.readPrimaryLogoState(),
    r: options.readSecondaryLogoState(),
    sh: options.snapshotShading(root),
  };
}

export function saveTemplatesAutosaveToStorage(options: SaveTemplatesAutosaveToStorageOptions): void {
  try {
    const snap = options.getSnapshot();
    if (!snap) return;
    const root = options.root ?? document.getElementById('templates-a4-root');
    const payload: TemplatesAutosavePayload = {
      v: 1,
      ts: Date.now(),
      snap,
      html: root instanceof HTMLElement ? root.outerHTML : '',
    };
    (options.storage ?? getBrowserStorage())?.setItem(options.getContextKey(), JSON.stringify(payload));
  } catch {
    // ignore local autosave failures
  }
}

export function saveAutosaveDebounced(options: SaveAutosaveDebouncedOptions): void {
  clearTimeout(templatesTabState.autosaveTimer ?? undefined);
  templatesTabState.autosaveTimer = setTimeout(() => {
    saveTemplatesAutosaveToStorage(options);
  }, options.delay ?? 250);
}

export function applyTemplatesSnapshotInPlace(options: ApplyTemplatesSnapshotInPlaceOptions): void {
  if (!options.snap) return;

  const root = options.root ?? document.getElementById('templates-a4-root');
  if (!root) return;

  try {
    const nodes = Array.from(root.querySelectorAll('[data-editable="true"]'));
    nodes.forEach((el, index) => {
      if (Array.isArray(options.snap?.edits) && index < options.snap.edits.length) {
        el.innerHTML = options.snap.edits[index];
      }
    });
  } catch {
    // ignore editable restore failures
  }

  try {
    options.writePrimaryLogoState(options.snap.l || {});
    const left = root.querySelector('.cs-logo--left img') as HTMLElement | null;
    if (left && options.snap.l) {
      const scale = Math.max(0.3, Math.min(3, Number(options.snap.l.s || 1)));
      const x = Number(options.snap.l.x || 0) || 0;
      const y = Number(options.snap.l.y || 0) || 0;
      left.style.transform = `scale(${scale}) translate(${x}px, ${y}px)`;
    }
  } catch {
    // ignore primary logo restore failures
  }

  try {
    options.writeSecondaryLogoState(options.snap.r || {});
    const right = root.querySelector('.cs-logo--right img') as HTMLElement | null;
    if (right && options.snap.r) {
      if (options.snap.r.url) {
        right.setAttribute('src', options.snap.r.url);
      } else {
        right.removeAttribute('src');
        right.closest('.cs-logo--right')?.setAttribute('data-empty', '1');
      }
      const scale = Math.max(0.3, Math.min(3, Number(options.snap.r.s || 1)));
      const x = Number(options.snap.r.x || 0) || 0;
      const y = Number(options.snap.r.y || 0) || 0;
      right.style.transform = `scale(${scale}) translate(${x}px, ${y}px)`;
    }
  } catch {
    // ignore secondary logo restore failures
  }

  try {
    if (options.snap.sh) {
      options.applyShadingSnapshot(root, options.snap.sh);
    }
  } catch {
    // ignore shading restore failures
  }
}

export function applyTemplatesSnapshot(options: ApplyTemplatesSnapshotOptions): void {
  if (!options.snap) return;
  const snap = options.snap;

  try {
    options.writePrimaryLogoState(snap.l || {});
    options.writeSecondaryLogoState(snap.r || {});
    const root = options.root ?? document.getElementById('templates-a4-root');
    const edits = Array.isArray(snap.edits) ? snap.edits : [];
    if (root && edits.length) {
      const nodes = Array.from(root.querySelectorAll('[data-editable="true"]'));
      nodes.forEach((el, index) => {
        if (index < edits.length) {
          el.innerHTML = edits[index];
        }
      });
    }
  } finally {
    try {
      options.renderPreview();
    } catch {
      // ignore rerender failures
    }
  }
}

export function restoreTemplatesAutosaveIfPresent(options: RestoreTemplatesAutosaveIfPresentOptions): void {
  try {
    const raw = (options.storage ?? getBrowserStorage())?.getItem(options.getContextKey());
    if (!raw) return;

    const parsed = JSON.parse(raw) as Partial<TemplatesAutosavePayload> | null;
    const host = options.host ?? document.getElementById('templates-preview-host');

    if (parsed?.html && host) {
      try {
        host.innerHTML = '';
        const wrap = document.createElement('div');
        wrap.innerHTML = options.normalizeTemplateHtmlLegacyUrls(parsed.html, options.companyInfo);
        const root = wrap.firstElementChild as HTMLElement | null;
        if (root) {
          host.appendChild(root);
          root.setAttribute('data-restored-autosave', '1');
        }

        if (parsed.snap) {
          applyTemplatesSnapshotInPlace({
            snap: parsed.snap,
            root: host.querySelector('#templates-a4-root'),
            writePrimaryLogoState: options.writePrimaryLogoState,
            writeSecondaryLogoState: options.writeSecondaryLogoState,
            applyShadingSnapshot: options.applyShadingSnapshot,
          });
        }

        options.ensureCellToolbar({ onAfterChange: options.onToolbarAfterChange });

        const restoredRoot = host.querySelector('#templates-a4-root') as HTMLElement | null;
        if (restoredRoot) {
          options.attachCallsheetLogoBehaviors(restoredRoot);
        }
        options.unifyCrewCallTables();
        options.ensureSingleCrewTableStrict();
        options.enforceCallsheetSizing(restoredRoot);
        options.pruneEmptyA4Pages();
        options.applyTemplatesPreviewZoom(templatesTabState.previewZoom);
      } catch {
        if (parsed?.snap) {
          applyTemplatesSnapshotInPlace({
            snap: parsed.snap,
            root: options.root,
            writePrimaryLogoState: options.writePrimaryLogoState,
            writeSecondaryLogoState: options.writeSecondaryLogoState,
            applyShadingSnapshot: options.applyShadingSnapshot,
          });
        }
      }

      if (parsed?.snap) {
        options.pushTemplatesHistory();
      }
      return;
    }

    if (parsed?.snap) {
      applyTemplatesSnapshotInPlace({
        snap: parsed.snap,
        root: options.root,
        writePrimaryLogoState: options.writePrimaryLogoState,
        writeSecondaryLogoState: options.writeSecondaryLogoState,
        applyShadingSnapshot: options.applyShadingSnapshot,
      });
      const root = document.getElementById('templates-a4-root');
      root?.setAttribute('data-restored-autosave', '1');
      options.pushTemplatesHistory();
    }
  } catch {
    // ignore autosave restore failures
  }
}
