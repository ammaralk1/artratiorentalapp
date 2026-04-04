import { normalizeLegacyAssetUrl, normalizeTemplateHtmlLegacyUrls, type TemplatesCompanyInfo } from './context';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface SecondaryLogoState {
  url: string;
  s: number;
  x: number;
  y: number;
}

export interface PrimaryLogoState {
  s: number;
  x: number;
  y: number;
  h: boolean;
}

export interface TemplatesSelectionChangeOptions {
  pushHistoryDebounced?: () => void;
  saveAutosaveDebounced?: () => void;
  markEditing?: () => void;
}

export interface AttachCallsheetLogoBehaviorsOptions extends TemplatesSelectionChangeOptions {}

export interface EnsureLogoControlsOptions extends TemplatesSelectionChangeOptions {
  getContextKey: () => string;
  companyInfo: Pick<TemplatesCompanyInfo, 'logoUrl'>;
  renderPreview: () => void;
  undoChange: () => void;
  redoChange: () => void;
  notifyApiError?: (error: unknown, fallback?: string) => void;
}

function getBrowserStorage(): StorageLike | null {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
}

function commitSelectionChange(options: TemplatesSelectionChangeOptions = {}): void {
  try {
    options.pushHistoryDebounced?.();
    options.saveAutosaveDebounced?.();
    options.markEditing?.();
  } catch {
    // ignore selection persistence failures
  }
}

function clampLogoScale(value: unknown): number {
  return Math.max(0.3, Math.min(3, Number(value || 1) || 1));
}

function parseTransform(transform: string): { x: number; y: number; s: number } {
  try {
    const translate = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(String(transform || ''));
    const scale = /scale\(([-\d.]+)\)/.exec(String(transform || ''));
    return {
      x: Number(translate?.[1] || 0) || 0,
      y: Number(translate?.[2] || 0) || 0,
      s: clampLogoScale(scale?.[1] || 1),
    };
  } catch {
    return { x: 0, y: 0, s: 1 };
  }
}

function readComputedTranslate(img: HTMLElement): { x: number; y: number } {
  try {
    const transform = getComputedStyle(img).transform;
    if (!transform || transform === 'none') return { x: 0, y: 0 };
    const matrix = new DOMMatrix(transform);
    return { x: matrix.m41 || 0, y: matrix.m42 || 0 };
  } catch {
    return { x: 0, y: 0 };
  }
}

function getNearestEditable(): HTMLElement | null {
  try {
    const selection = window.getSelection();
    let node = selection?.anchorNode || document.activeElement;
    if (!node) return null;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
    let element = node instanceof HTMLElement ? node : null;
    while (element && element !== document.body) {
      if (element.hasAttribute('contenteditable')) return element;
      element = element.parentElement;
    }
  } catch {
    // ignore selection lookup failures
  }
  return null;
}

function nearestCellInCallsheet(): HTMLTableCellElement | null {
  try {
    const root = document.getElementById('templates-a4-root');
    if (!root) return null;
    const selection = window.getSelection();
    let node = selection?.anchorNode || document.activeElement;
    if (!node) return null;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
    let element = node instanceof HTMLElement ? node : null;
    while (element && element !== document.body) {
      if ((element.tagName === 'TD' || element.tagName === 'TH') && root.contains(element)) {
        return element as HTMLTableCellElement;
      }
      element = element.parentElement;
    }
  } catch {
    // ignore selection lookup failures
  }
  return null;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  try {
    let value = String(hex || '').trim();
    if (value.startsWith('#')) value = value.slice(1);
    if (value.length === 3) value = value.split('').map((char) => char + char).join('');
    const parsed = Number.parseInt(value, 16);
    return {
      r: (parsed >> 16) & 255,
      g: (parsed >> 8) & 255,
      b: parsed & 255,
    };
  } catch {
    return { r: 255, g: 255, b: 0 };
  }
}

function applyShadeToCell(cell: HTMLTableCellElement | null, rgba: string): void {
  if (!cell) return;
  try {
    cell.setAttribute('data-shaded', '1');
    cell.style.setProperty('--shade', rgba);
    cell.style.setProperty('background', 'var(--shade)', 'important');
    cell.style.setProperty('background-color', 'var(--shade)', 'important');
  } catch {
    // ignore style failures
  }
}

function clearShadeOnCell(cell: HTMLTableCellElement | null): void {
  if (!cell) return;
  try {
    cell.removeAttribute('data-shaded');
    cell.style.removeProperty('--shade');
    cell.style.removeProperty('background');
    cell.style.removeProperty('background-color');
  } catch {
    // ignore style failures
  }
}

function bindLogoInteractions(
  img: HTMLElement,
  sliderId: string,
  readState: () => { s: number; x: number; y: number },
  writeState: (patch: Record<string, unknown>) => void,
  options: AttachCallsheetLogoBehaviorsOptions,
): void {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;

  const readInlineMatrix = (): { x: number; y: number; s: number } => parseTransform(String(img.style.transform || ''));

  const onDown = (event: PointerEvent): void => {
    dragging = true;
    const matrix = readInlineMatrix();
    originX = matrix.x;
    originY = matrix.y;
    startX = event.clientX;
    startY = event.clientY;
    try {
      event.preventDefault();
    } catch {
      // ignore preventDefault failures
    }
  };

  const onMove = (event: PointerEvent): void => {
    if (!dragging) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    const nextX = Math.round(originX + dx);
    const nextY = Math.round(originY + dy);
    const scale = clampLogoScale(readState().s || 1);
    img.style.transform = `scale(${scale}) translate(${nextX}px, ${nextY}px)`;
  };

  const onUp = (): void => {
    if (!dragging) return;
    dragging = false;
    const matrix = readInlineMatrix();
    writeState({ x: matrix.x, y: matrix.y });
    commitSelectionChange(options);
  };

  img.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });

  const slider = document.getElementById(sliderId) as HTMLInputElement | null;
  if (!slider) return;

  const apply = (value: unknown): void => {
    const scale = clampLogoScale(value);
    const matrix = readInlineMatrix();
    try {
      img.style.transform = `scale(${scale}) translate(${matrix.x}px, ${matrix.y}px)`;
    } catch {
      // ignore transform failures
    }
    writeState({ s: scale });
  };

  slider.oninput = (event) => {
    try {
      apply((event.target as HTMLInputElement | null)?.value);
    } catch {
      // ignore slider failures
    }
    try {
      options.markEditing?.();
    } catch {
      // ignore activity marker failures
    }
  };
  slider.onchange = () => {
    try {
      options.pushHistoryDebounced?.();
      options.saveAutosaveDebounced?.();
    } catch {
      // ignore persistence failures
    }
  };
}

export function readSecondaryLogoState(storage: StorageLike | null = getBrowserStorage()): SecondaryLogoState {
  try {
    const rawUrl = storage?.getItem('templates.callsheet.logo2.url') || '';
    const normalizedUrl = normalizeLegacyAssetUrl(rawUrl);
    if (rawUrl && normalizedUrl && rawUrl !== normalizedUrl) {
      storage?.setItem('templates.callsheet.logo2.url', normalizedUrl);
    }
    return {
      url: normalizedUrl,
      s: Number(storage?.getItem('templates.callsheet.logo2.s') || '1') || 1,
      x: Number(storage?.getItem('templates.callsheet.logo2.x') || '0') || 0,
      y: Number(storage?.getItem('templates.callsheet.logo2.y') || '0') || 0,
    };
  } catch {
    return { url: '', s: 1, x: 0, y: 0 };
  }
}

export function writeSecondaryLogoState(
  patch: Partial<SecondaryLogoState> = {},
  storage: StorageLike | null = getBrowserStorage(),
): void {
  try {
    const current = readSecondaryLogoState(storage);
    const next = { ...current, ...patch };
    if (typeof next.url === 'string') storage?.setItem('templates.callsheet.logo2.url', normalizeLegacyAssetUrl(next.url));
    if (Number.isFinite(next.s)) storage?.setItem('templates.callsheet.logo2.s', String(next.s));
    if (Number.isFinite(next.x)) storage?.setItem('templates.callsheet.logo2.x', String(next.x));
    if (Number.isFinite(next.y)) storage?.setItem('templates.callsheet.logo2.y', String(next.y));
  } catch {
    // ignore storage failures
  }
}

export function readPrimaryLogoState(storage: StorageLike | null = getBrowserStorage()): PrimaryLogoState {
  try {
    return {
      s: Number(storage?.getItem('templates.callsheet.logo1.s') || '1') || 1,
      x: Number(storage?.getItem('templates.callsheet.logo1.x') || '0') || 0,
      y: Number(storage?.getItem('templates.callsheet.logo1.y') || '0') || 0,
      h: storage?.getItem('templates.callsheet.logo1.h') === '1',
    };
  } catch {
    return { s: 1, x: 0, y: 0, h: false };
  }
}

export function writePrimaryLogoState(
  patch: Partial<PrimaryLogoState> = {},
  storage: StorageLike | null = getBrowserStorage(),
): void {
  try {
    const current = readPrimaryLogoState(storage);
    const next = { ...current, ...patch };
    if (Number.isFinite(next.s)) storage?.setItem('templates.callsheet.logo1.s', String(next.s));
    if (Number.isFinite(next.x)) storage?.setItem('templates.callsheet.logo1.x', String(next.x));
    if (Number.isFinite(next.y)) storage?.setItem('templates.callsheet.logo1.y', String(next.y));
    if (typeof next.h === 'boolean') storage?.setItem('templates.callsheet.logo1.h', next.h ? '1' : '0');
  } catch {
    // ignore storage failures
  }
}

export function adjustSelectionFont(
  direction = 0,
  { times = 1, ...options }: { times?: number } & TemplatesSelectionChangeOptions = {},
): void {
  try {
    const root = document.getElementById('templates-a4-root');
    const dir = direction > 0 ? 1 : direction < 0 ? -1 : 0;
    times = Math.max(1, Math.min(5, Number(times) || 1));
    if (!root || dir === 0) return;

    const selection = window.getSelection();
    const target = getNearestEditable();
    if (!target) return;

    const computed = Number.parseFloat(getComputedStyle(target).fontSize || '11') || 11;
    const base = (() => {
      const stored = Number.parseFloat(target.dataset.fontBase || '0');
      return Number.isFinite(stored) && stored > 0 ? stored : computed;
    })();
    try {
      target.dataset.fontBase = String(base);
    } catch {
      // ignore dataset failures
    }
    const capMax = base * 5;
    const capMin = base / 5;

    const stepOnce = (): void => {
      const focusNode =
        selection && selection.rangeCount > 0 ? selection.getRangeAt(0).commonAncestorContainer : target;
      const sample =
        focusNode instanceof HTMLElement ? focusNode : (focusNode as ParentNode | null)?.parentElement || target;
      const current = Number.parseFloat(getComputedStyle(sample).fontSize || String(base)) || base;
      const next = dir > 0 ? Math.min(capMax, current * 2) : Math.max(capMin, current * 0.5);
      const applyToEditable = (element: HTMLElement): void => {
        try {
          element.style.fontSize = `${next}px`;
        } catch {
          // ignore style failures
        }
      };

      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        if (target.contains(range.commonAncestorContainer)) {
          try {
            const span = document.createElement('span');
            span.style.fontSize = `${next}px`;
            span.appendChild(range.extractContents());
            range.insertNode(span);
            selection.removeAllRanges();
            const nextRange = document.createRange();
            nextRange.selectNodeContents(span);
            selection.addRange(nextRange);
          } catch {
            applyToEditable(target);
          }
        } else {
          applyToEditable(target);
        }
      } else {
        applyToEditable(target);
      }
    };

    for (let index = 0; index < times; index += 1) {
      stepOnce();
    }

    commitSelectionChange(options);
  } catch {
    // ignore font adjustment failures
  }
}

export function toggleSelectionBold(options: TemplatesSelectionChangeOptions = {}): void {
  try {
    const root = document.getElementById('templates-a4-root');
    if (!root) return;

    const selection = window.getSelection();
    const target = getNearestEditable();
    if (!target) return;

    const weight = Number.parseInt(getComputedStyle(target).fontWeight || '400', 10);
    const nextBold = !(weight >= 600);

    const applyToEditable = (element: HTMLElement): void => {
      try {
        element.style.fontWeight = nextBold ? '700' : '400';
      } catch {
        // ignore style failures
      }
    };

    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      if (target.contains(range.commonAncestorContainer)) {
        try {
          const span = document.createElement('span');
          span.style.fontWeight = nextBold ? '700' : '400';
          span.appendChild(range.extractContents());
          range.insertNode(span);
          selection.removeAllRanges();
          const nextRange = document.createRange();
          nextRange.setStartAfter(span);
          nextRange.setEndAfter(span);
          selection.addRange(nextRange);
        } catch {
          applyToEditable(target);
        }
      } else {
        applyToEditable(target);
      }
    } else {
      applyToEditable(target);
    }

    commitSelectionChange(options);
  } catch {
    // ignore bold toggle failures
  }
}

export function applyShadeFromControls(options: TemplatesSelectionChangeOptions = {}): void {
  const colorEl = document.getElementById('tpl-shade-color') as HTMLInputElement | null;
  const opacityEl = document.getElementById('tpl-shade-opacity') as HTMLInputElement | null;
  const targetEl = document.getElementById('tpl-shade-target') as HTMLSelectElement | null;
  const { r, g, b } = hexToRgb(colorEl?.value || '#fff59d');
  const alpha = Math.max(0, Math.min(100, Number(opacityEl?.value || 40))) / 100;
  const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  const cell = nearestCellInCallsheet();
  if (!cell) return;

  if ((targetEl?.value || 'cell') === 'row') {
    const row = cell.closest('tr');
    if (row) {
      Array.from(row.children).forEach((child) => applyShadeToCell(child as HTMLTableCellElement, rgba));
    } else {
      applyShadeToCell(cell, rgba);
    }
  } else {
    applyShadeToCell(cell, rgba);
  }

  commitSelectionChange(options);
}

export function clearShadeFromControls(options: TemplatesSelectionChangeOptions = {}): void {
  const targetEl = document.getElementById('tpl-shade-target') as HTMLSelectElement | null;
  const cell = nearestCellInCallsheet();
  if (!cell) return;

  if ((targetEl?.value || 'cell') === 'row') {
    const row = cell.closest('tr');
    if (row) {
      Array.from(row.children).forEach((child) => clearShadeOnCell(child as HTMLTableCellElement));
    } else {
      clearShadeOnCell(cell);
    }
  } else {
    clearShadeOnCell(cell);
  }

  commitSelectionChange(options);
}

export function attachCallsheetLogoBehaviors(
  root: ParentNode | null,
  options: AttachCallsheetLogoBehaviorsOptions = {},
): void {
  if (!root) return;

  const rightImg = root.querySelector('.cs-logo--right img') as HTMLElement | null;
  if (rightImg) {
    bindLogoInteractions(rightImg, 'tpl-logo2-size', readSecondaryLogoState, writeSecondaryLogoState, options);
  }

  const leftImg = root.querySelector('.cs-logo--left img') as HTMLElement | null;
  if (leftImg) {
    bindLogoInteractions(leftImg, 'tpl-logo1-size', readPrimaryLogoState, writePrimaryLogoState, options);
  }
}

export function ensureLogoControls(type = 'expenses', options: EnsureLogoControlsOptions): void {
  const controls = document.getElementById('templates-controls');
  const existing = document.getElementById('tpl-logo-controls');
  const row = document.getElementById('tpl-controls-row2')
    || (() => {
      const nextRow = document.createElement('div');
      nextRow.id = 'tpl-controls-row2';
      Object.assign(nextRow.style, {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        width: '100%',
        alignItems: 'center',
        marginTop: '6px',
      });
      controls?.appendChild(nextRow);
      return nextRow;
    })();

  if (type !== 'callsheet') {
    existing?.remove();
    return;
  }

  if (existing) return;

  const box = document.createElement('div');
  box.id = 'tpl-logo-controls';
  Object.assign(box.style, { display: 'inline-flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' });
  box.innerHTML = `
    <div class="input-group" style="display:inline-flex;gap:6px;align-items:center;">
      <label class="form-label" style="margin:0 4px 0 0;">لوغو ارت ريشيو</label>
      <input type="range" id="tpl-logo1-size" min="0.3" max="3" step="0.01" title="حجم لوغو ارت ريشيو">
      <button type="button" class="btn btn-outline" id="tpl-logo1-reset" title="إعادة تموضع لوغو ارت ريشيو">↺</button>
      <label class="form-check-label" style="display:inline-flex;align-items:center;gap:6px;margin:0 0 0 8px;">
        <input type="checkbox" id="tpl-logo1-hide" class="form-check-input">
        <span>إخفاء اللوغو</span>
      </label>
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
      <button type="button" class="btn btn-outline" id="tpl-font-bold" title="تسميك الخط (Bold)"><strong>B</strong></button>
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
  row.appendChild(box);

  try {
    const secondary = readSecondaryLogoState();
    const secondaryUrl = document.getElementById('tpl-logo2-url') as HTMLInputElement | null;
    const secondarySize = document.getElementById('tpl-logo2-size') as HTMLInputElement | null;
    if (secondaryUrl && secondary.url) secondaryUrl.value = secondary.url;
    if (secondarySize) secondarySize.value = String(secondary.s || 1);

    const primary = readPrimaryLogoState();
    const primarySize = document.getElementById('tpl-logo1-size') as HTMLInputElement | null;
    const primaryHide = document.getElementById('tpl-logo1-hide') as HTMLInputElement | null;
    if (primarySize) primarySize.value = String(primary.s || 1);
    if (primaryHide) primaryHide.checked = !!primary.h;
  } catch (error) {
    options.notifyApiError?.(error, 'تعذر حفظ القالب');
  }

  document.getElementById('tpl-logo2-apply')?.addEventListener('click', () => {
    const url = (document.getElementById('tpl-logo2-url') as HTMLInputElement | null)?.value?.trim() || '';
    writeSecondaryLogoState({ url });
    options.renderPreview();
  });

  document.getElementById('tpl-logo2-clear')?.addEventListener('click', () => {
    writeSecondaryLogoState({ url: '', s: 1, x: 0, y: 0 });
    try {
      const raw = getBrowserStorage()?.getItem(options.getContextKey());
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.snap?.r) parsed.snap.r.url = '';
        if (typeof parsed?.html === 'string') {
          const tmp = document.createElement('div');
          tmp.innerHTML = normalizeTemplateHtmlLegacyUrls(parsed.html, options.companyInfo);
          const root = tmp.firstElementChild;
          const img = root?.querySelector('.cs-logo--right img');
          if (img) {
            img.removeAttribute('src');
            img.closest('.cs-logo--right')?.setAttribute('data-empty', '1');
          }
          parsed.html = root ? root.outerHTML : parsed.html;
        }
        getBrowserStorage()?.setItem(options.getContextKey(), JSON.stringify(parsed));
      }
    } catch {
      // ignore local snapshot cleanup failures
    }
    try {
      options.pushHistoryDebounced?.();
      options.saveAutosaveDebounced?.();
    } catch {
      // ignore persistence failures
    }
    options.renderPreview();
  });

  document.getElementById('tpl-logo2-reset')?.addEventListener('click', () => {
    writeSecondaryLogoState({ x: 0, y: 0 });
    options.renderPreview();
  });

  document.getElementById('tpl-logo1-hide')?.addEventListener('change', (event) => {
    writePrimaryLogoState({ h: !!(event.target as HTMLInputElement | null)?.checked });
    options.renderPreview();
  });

  document.getElementById('tpl-undo')?.addEventListener('click', () => options.undoChange());
  document.getElementById('tpl-redo')?.addEventListener('click', () => options.redoChange());

  document.getElementById('tpl-font-down')?.addEventListener('click', (event) => {
    adjustSelectionFont(-1, {
      times: event instanceof MouseEvent && event.shiftKey ? 2 : 1,
      ...options,
    });
  });
  document.getElementById('tpl-font-up')?.addEventListener('click', (event) => {
    adjustSelectionFont(1, {
      times: event instanceof MouseEvent && event.shiftKey ? 2 : 1,
      ...options,
    });
  });
  document.getElementById('tpl-font-bold')?.addEventListener('click', () => {
    toggleSelectionBold(options);
  });

  document.getElementById('tpl-shade-apply')?.addEventListener('click', () => {
    applyShadeFromControls(options);
  });
  document.getElementById('tpl-shade-clear')?.addEventListener('click', () => {
    clearShadeFromControls(options);
  });
}
