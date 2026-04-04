import { templatesTabState, type TemplatesZoomMode } from './state';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function getBrowserStorage(): StorageLike | null {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
}

function getPreviewRoot(): HTMLElement | null {
  const directChild = document.querySelector('#templates-preview-host > #templates-a4-root');
  if (directChild instanceof HTMLElement) return directChild;

  const nested = document.querySelector('#templates-preview-host #templates-a4-root');
  return nested instanceof HTMLElement ? nested : null;
}

function getTemplatesTypeValue(): string {
  const typeSelect = document.getElementById('templates-type');
  return typeSelect instanceof HTMLSelectElement ? (typeSelect.value || 'expenses') : 'expenses';
}

export function clampTemplatesZoom(value: number): number {
  return Math.min(Math.max(value, 0.25), 2.5);
}

export function normalizeTemplatesZoomMode(value: string | null | undefined): TemplatesZoomMode {
  return value === 'fit' ? 'fit' : 'manual';
}

export function readTplZoomPref(storage: StorageLike | null = getBrowserStorage()): number {
  try {
    const parsed = Number(storage?.getItem('templates.preview.zoom') || '1');
    return clampTemplatesZoom(Number.isFinite(parsed) ? parsed : 1);
  } catch {
    return 1;
  }
}

export function writeTplZoomPref(value: number, storage: StorageLike | null = getBrowserStorage()): void {
  try {
    storage?.setItem('templates.preview.zoom', String(clampTemplatesZoom(value)));
  } catch {
    // ignore storage failures
  }
}

export function readTplZoomModePref(storage: StorageLike | null = getBrowserStorage()): TemplatesZoomMode {
  try {
    return normalizeTemplatesZoomMode(storage?.getItem('templates.preview.zoomMode') || 'manual');
  } catch {
    return 'manual';
  }
}

export function writeTplZoomModePref(mode: TemplatesZoomMode, storage: StorageLike | null = getBrowserStorage()): void {
  try {
    storage?.setItem('templates.preview.zoomMode', normalizeTemplatesZoomMode(mode));
  } catch {
    // ignore storage failures
  }
}

export function applyTemplatesPreviewZoom(value: number, root: HTMLElement | null = getPreviewRoot()): void {
  if (!root) return;

  try {
    root.style.transformOrigin = 'top center';
  } catch {
    // ignore style failures
  }

  try {
    root.style.transform = `scale(${value})`;
  } catch {
    // ignore style failures
  }
}

export function setTemplatesPreviewZoom(
  value: number,
  options: { silent?: boolean; markManual?: boolean } = {},
): void {
  templatesTabState.previewZoom = clampTemplatesZoom(value);
  if (options.markManual) {
    templatesTabState.userAdjustedZoom = true;
  }

  applyTemplatesPreviewZoom(templatesTabState.previewZoom);
  writeTplZoomPref(templatesTabState.previewZoom);

  if (!options.silent && templatesTabState.zoomValueEl) {
    templatesTabState.zoomValueEl.textContent = `${Math.round(templatesTabState.previewZoom * 100)}%`;
  }
}

export function adjustTemplatesPreviewZoom(delta: number): void {
  templatesTabState.zoomMode = 'manual';
  writeTplZoomModePref(templatesTabState.zoomMode);
  setTemplatesPreviewZoom(templatesTabState.previewZoom + delta, { markManual: true });
}

function computeTemplatesBaseWidth(): number {
  try {
    const page = document.querySelector('#templates-preview-host #templates-a4-root .a4-page');
    if (page instanceof HTMLElement) {
      return page.getBoundingClientRect().width || page.offsetWidth || 794;
    }
  } catch {
    // ignore DOM read failures
  }

  return getTemplatesTypeValue() !== 'expenses' ? 1123 : 794;
}

function computeTemplatesAvailableWidth(): number | null {
  const host = document.getElementById('templates-preview-host');
  if (!(host instanceof HTMLElement)) return null;

  try {
    const styles = window.getComputedStyle(host);
    const paddingLeft = parseFloat(styles.paddingLeft || '0') || 0;
    const paddingRight = parseFloat(styles.paddingRight || '0') || 0;
    return Math.max(0, host.clientWidth - paddingLeft - paddingRight);
  } catch {
    return host.clientWidth || null;
  }
}

export function computeTemplatesFitZoom(baseWidth: number, availableWidth: number | null): number {
  if (!baseWidth || !availableWidth) return 1;
  return clampTemplatesZoom(availableWidth / baseWidth);
}

export function applyTemplatesFitZoom(): void {
  const zoom = computeTemplatesFitZoom(computeTemplatesBaseWidth(), computeTemplatesAvailableWidth());
  setTemplatesPreviewZoom(zoom);
}

export function ensureResizeBinding(): void {
  if (templatesTabState.zoomResizeBound) return;

  window.addEventListener('resize', () => {
    if (templatesTabState.zoomMode === 'fit') {
      applyTemplatesFitZoom();
    }
  }, { passive: true });

  templatesTabState.zoomResizeBound = true;
}

export function ensureResizeObserver(): void {
  try {
    if (templatesTabState.resizeObserver || typeof ResizeObserver === 'undefined') return;

    const host = document.getElementById('templates-preview-host');
    if (!(host instanceof HTMLElement)) return;

    templatesTabState.resizeObserver = new ResizeObserver(() => {
      if (templatesTabState.zoomMode === 'fit') {
        applyTemplatesFitZoom();
      }
    });
    templatesTabState.resizeObserver.observe(host);
  } catch {
    // ignore observer failures
  }
}

export function ensureTemplatesZoomUI(): void {
  const actionsRow = document.getElementById('templates-actions');
  if (!(actionsRow instanceof HTMLElement) || document.getElementById('tpl-zoom-controls')) return;

  const wrap = document.createElement('div');
  wrap.id = 'tpl-zoom-controls';
  wrap.className = 'tpl-zoom-controls';
  wrap.innerHTML = `
    <button type="button" class="tpl-zoom-btn" data-tpl-zoom-out title="تصغير">−</button>
    <span class="tpl-zoom-value" data-tpl-zoom-value>100%</span>
    <button type="button" class="tpl-zoom-btn" data-tpl-zoom-in title="تكبير">+</button>
    <button type="button" class="tpl-zoom-btn" data-tpl-zoom-fit title="ملء العرض">↔︎</button>
    <button type="button" class="tpl-zoom-btn" data-tpl-zoom-reset title="1:1">1:1</button>
  `;
  actionsRow.appendChild(wrap);

  const outBtn = wrap.querySelector('[data-tpl-zoom-out]');
  const inBtn = wrap.querySelector('[data-tpl-zoom-in]');
  const resetBtn = wrap.querySelector('[data-tpl-zoom-reset]');
  const fitBtn = wrap.querySelector('[data-tpl-zoom-fit]');
  const valueEl = wrap.querySelector('[data-tpl-zoom-value]');

  templatesTabState.zoomValueEl = valueEl instanceof HTMLElement ? valueEl : null;
  templatesTabState.zoomFitBtn = fitBtn instanceof HTMLElement ? fitBtn : null;

  outBtn?.addEventListener('click', () => adjustTemplatesPreviewZoom(-0.1));
  inBtn?.addEventListener('click', () => adjustTemplatesPreviewZoom(0.1));
  resetBtn?.addEventListener('click', () => {
    templatesTabState.zoomMode = 'manual';
    writeTplZoomModePref(templatesTabState.zoomMode);
    setTemplatesPreviewZoom(1, { markManual: true });
  });
  fitBtn?.addEventListener('click', () => {
    templatesTabState.zoomMode = 'fit';
    writeTplZoomModePref(templatesTabState.zoomMode);
    applyTemplatesFitZoom();
    ensureResizeBinding();
    ensureResizeObserver();
  });

  templatesTabState.zoomMode = readTplZoomModePref();
  if (templatesTabState.zoomMode === 'fit') {
    applyTemplatesFitZoom();
    ensureResizeBinding();
    ensureResizeObserver();
  } else {
    setTemplatesPreviewZoom(readTplZoomPref());
  }
}
