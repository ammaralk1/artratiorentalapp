import { pageHasMeaningfulContent } from '../../templates/pageUtils.js';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function getBrowserStorage(): StorageLike | null {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
}

function getCurrentTemplatesType(): string {
  try {
    const select = document.getElementById('templates-type');
    return select instanceof HTMLSelectElement ? (select.value || 'expenses') : 'expenses';
  } catch {
    return 'expenses';
  }
}

export function getPdfNamespaceBase(type: string = getCurrentTemplatesType()): string {
  return `templatesPdf.${type || 'expenses'}`;
}

function resolvePdfKey(key: string, type: string = getCurrentTemplatesType()): { ns: string; legacy: string } {
  const clean = String(key || '').replace(/^templatesPdf[.:]/, '');
  const base = getPdfNamespaceBase(type);
  return { ns: `${base}.${clean}`, legacy: `templatesPdf.${clean}` };
}

export function readPdfPref(key: string, def: number | string, type: string = getCurrentTemplatesType(), storage: StorageLike | null = getBrowserStorage()): number | string {
  try {
    const { ns, legacy } = resolvePdfKey(key, type);
    let value = storage?.getItem(ns);
    if (value == null) value = storage?.getItem(legacy) ?? null;
    if (value == null) return def;
    const num = Number(value);
    return Number.isFinite(num) ? num : def;
  } catch {
    return def;
  }
}

export function readPdfString(key: string, def: string, type: string = getCurrentTemplatesType(), storage: StorageLike | null = getBrowserStorage()): string {
  try {
    const { ns, legacy } = resolvePdfKey(key, type);
    const value = storage?.getItem(ns) ?? storage?.getItem(legacy);
    return value == null ? def : String(value);
  } catch {
    return def;
  }
}

export function writePdfPref(key: string, value: string | number, type: string = getCurrentTemplatesType(), storage: StorageLike | null = getBrowserStorage()): void {
  try {
    const { ns } = resolvePdfKey(key, type);
    storage?.setItem(ns, String(value));
  } catch {
    // ignore storage failures
  }
}

function getPdfPageOverridesKey(type: string = getCurrentTemplatesType()): string {
  return `${getPdfNamespaceBase(type)}.pageOverrides`;
}

export function getPdfPageOverrides(type: string = getCurrentTemplatesType(), storage: StorageLike | null = getBrowserStorage()): Record<string, Record<string, number>> {
  try {
    const raw = storage?.getItem(getPdfPageOverridesKey(type));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setPdfPageOverride(
  pageIndex: number,
  key: string,
  value: string | number,
  type: string = getCurrentTemplatesType(),
  storage: StorageLike | null = getBrowserStorage(),
): void {
  try {
    const overrides = getPdfPageOverrides(type, storage);
    const idx = String(pageIndex);
    overrides[idx] = overrides[idx] || {};
    overrides[idx][key] = Number(value);
    storage?.setItem(getPdfPageOverridesKey(type), JSON.stringify(overrides));
  } catch {
    // ignore storage failures
  }
}

export function readPdfPrefForPage(
  key: string,
  pageIndex: number,
  defWhenMissing: number,
  type: string = getCurrentTemplatesType(),
  storage: StorageLike | null = getBrowserStorage(),
): number {
  try {
    const overrides = getPdfPageOverrides(type, storage);
    const page = overrides[String(pageIndex)];
    if (page && page[key] != null && Number.isFinite(Number(page[key]))) {
      return Number(page[key]);
    }
    const fallback = readPdfPref(key, defWhenMissing, type, storage);
    return Number.isFinite(Number(fallback)) ? Number(fallback) : defWhenMissing;
  } catch {
    return Number(readPdfPref(key, defWhenMissing, type, storage)) || defWhenMissing;
  }
}

export function clearPdfPageOverrides(type: string = getCurrentTemplatesType(), storage: StorageLike | null = getBrowserStorage()): void {
  try {
    storage?.removeItem(getPdfPageOverridesKey(type));
  } catch {
    // ignore storage failures
  }
}

export function applyPdfPreset(pageCount: number, type: string = getCurrentTemplatesType(), storage: StorageLike | null = getBrowserStorage()): void {
  const right = 61;
  const safe = 0.5;
  const offsets = [-145, -290, -435, -580, -725];
  const trims = [14, 14, 14, 14, 14];
  const stepAfter = -145;

  for (let idx = 0; idx < pageCount; idx += 1) {
    const offset = idx < offsets.length ? offsets[idx] : offsets[offsets.length - 1] + stepAfter * (idx - (offsets.length - 1));
    const trim = idx < trims.length ? trims[idx] : trims[trims.length - 1];
    setPdfPageOverride(idx, 'templatesPdf.shiftRightMm', right, type, storage);
    setPdfPageOverride(idx, 'templatesPdf.tightFudgeMm', offset, type, storage);
    setPdfPageOverride(idx, 'templatesPdf.extraTrimMm', trim, type, storage);
    setPdfPageOverride(idx, 'templatesPdf.safeMarginMm', safe, type, storage);
  }

  try {
    storage?.setItem('templatesPdf.globalAllYmm', '-1');
  } catch {
    // ignore storage failures
  }
}

export interface PdfTunerValues {
  extraTrim: number;
  safeMargin: number;
  tightFudge: number;
  rightShift: number;
  scalePct: number;
  globalAllYmm: number;
  globalAllRightMm: number;
}

export function getPdfTunerValues(pageIndex: number, type: string = getCurrentTemplatesType(), storage: StorageLike | null = getBrowserStorage()): PdfTunerValues {
  const extraTrim = readPdfPrefForPage('templatesPdf.extraTrimMm', pageIndex, Number(readPdfPref('templatesPdf.extraTrimMm', 14, type, storage)) || 14, type, storage);
  const safeMargin = readPdfPrefForPage('templatesPdf.safeMarginMm', pageIndex, Number(readPdfPref('templatesPdf.safeMarginMm', 0.5, type, storage)) || 0.5, type, storage);
  const defaultFudge = pageIndex === 0 ? -144.5 : 0;
  const tightFudge = readPdfPrefForPage('templatesPdf.tightFudgeMm', pageIndex, defaultFudge, type, storage);
  const rightShift = readPdfPrefForPage('templatesPdf.shiftRightMm', pageIndex, Number(readPdfPref('templatesPdf.shiftRightMm', 40, type, storage)) || 40, type, storage);
  const scalePct = Number(readPdfPref('templatesPdf.scalePct', 100, type, storage)) || 100;
  const globalAllYmm = Number(readPdfPref('templatesPdf.globalAllYmm', -1, type, storage)) || -1;
  const globalAllRightMm = Number(readPdfPref('templatesPdf.globalAllRightMm', 0, type, storage)) || 0;

  return {
    extraTrim,
    safeMargin,
    tightFudge,
    rightShift,
    scalePct,
    globalAllYmm,
    globalAllRightMm,
  };
}

export interface ShowPrintPreviewOverlayOptions {
  onPrint: () => Promise<void> | void;
  root?: HTMLElement | null;
}

export function showPrintPreviewOverlay(options: ShowPrintPreviewOverlayOptions): void {
  try {
    const host = options.root ?? document.querySelector<HTMLElement>('#templates-preview-host > #templates-a4-root');
    if (!host) {
      alert('لا يوجد محتوى للمعاينة');
      return;
    }

    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      background: 'rgba(15,23,42,0.6)',
      zIndex: '9998',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    });

    const panel = document.createElement('div');
    Object.assign(panel.style, {
      background: '#fff',
      borderRadius: '12px',
      maxWidth: '92vw',
      maxHeight: '88vh',
      width: 'min(1200px,92vw)',
      padding: '12px',
      boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    });

    const heading = document.createElement('div');
    heading.textContent = 'معاينة الطباعة';
    heading.style.cssText = 'font-weight:800;font-size:16px';

    const scroller = document.createElement('div');
    Object.assign(scroller.style, {
      overflow: 'auto',
      flex: '1 1 auto',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '10px',
      background: '#f8fafc',
    });

    const actions = document.createElement('div');
    Object.assign(actions.style, { display: 'flex', gap: '8px', justifyContent: 'flex-start' });

    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-outline';
    closeBtn.textContent = 'إغلاق';
    closeBtn.onclick = () => overlay.remove();

    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-primary';
    printBtn.textContent = 'طباعة الآن';
    printBtn.onclick = async () => {
      overlay.remove();
      try {
        await options.onPrint();
      } catch {
        // ignore callback failures
      }
    };
    actions.appendChild(printBtn);
    actions.appendChild(closeBtn);

    const rootClone = host.cloneNode(true) as HTMLElement;
    const wrap = rootClone.querySelector<HTMLElement>('[data-a4-pages]') || rootClone;
    const pages = Array.from(wrap.querySelectorAll('.a4-page'));
    pages.forEach((page) => {
      if (!pageHasMeaningfulContent(page)) {
        page.parentElement?.removeChild(page);
      }
    });

    const visiblePages = Array.from(wrap.querySelectorAll<HTMLElement>('.a4-page'));
    const info = document.createElement('div');
    info.textContent = `عدد الصفحات: ${visiblePages.length}`;
    info.style.cssText = 'font-size:12px;color:#475569';

    const grid = document.createElement('div');
    Object.assign(grid.style, { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '14px' });

    visiblePages.forEach((page) => {
      const card = document.createElement('div');
      Object.assign(card.style, {
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '6px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      });
      const preview = page.cloneNode(true) as HTMLElement;
      Object.assign(preview.style, {
        transform: 'scale(0.45)',
        transformOrigin: 'top left',
        width: `${page.clientWidth}px`,
        height: `${page.clientHeight}px`,
      });
      card.appendChild(preview);
      grid.appendChild(card);
    });

    scroller.appendChild(info);
    scroller.appendChild(grid);
    panel.appendChild(heading);
    panel.appendChild(scroller);
    panel.appendChild(actions);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
  } catch {
    alert('تعذر إنشاء المعاينة');
  }
}

export interface EnsurePdfTunerUIOptions {
  onPrint: () => Promise<void> | void;
  onRenderPreview: () => Promise<void> | void;
  controlsEl?: HTMLElement | null;
}

export function ensurePdfTunerUI(options: EnsurePdfTunerUIOptions): void {
  const controls = options.controlsEl ?? document.getElementById('templates-controls');
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
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>الصفحة</span>
        <select id="pdftun-page" style="width:110px;"></select>
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

  const refreshPagesList = (): void => {
    const select = panel.querySelector<HTMLSelectElement>('#pdftun-page');
    if (!select) return;

    const pages = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root .a4-page'));
    const current = select.value || '0';
    const optionsHtml = pages.map((_, idx) => `<option value="${idx}">الصفحة ${idx + 1}</option>`);
    if (!optionsHtml.length) {
      select.innerHTML = '<option value="0">الصفحة 1</option>';
      setTimeout(() => {
        try {
          refreshPagesList();
        } catch {
          // ignore delayed refresh failures
        }
      }, 120);
    } else {
      select.innerHTML = optionsHtml.join('');
    }

    if (Array.from(select.options).some((option) => option.value === current)) {
      select.value = current;
    } else {
      select.value = '0';
    }
  };

  const loadValuesForSelected = (): void => {
    const select = panel.querySelector<HTMLSelectElement>('#pdftun-page');
    const pageIndex = Math.max(0, Number(select?.value || '0'));
    const values = getPdfTunerValues(pageIndex);
    const extraTrim = document.getElementById('pdftun-extraTrim') as HTMLInputElement | null;
    const safeMargin = document.getElementById('pdftun-safeMargin') as HTMLInputElement | null;
    const tightFudge = document.getElementById('pdftun-tightFudge') as HTMLInputElement | null;
    const right = document.getElementById('pdftun-right') as HTMLInputElement | null;
    const scale = document.getElementById('pdftun-scale') as HTMLInputElement | null;
    const globalY = document.getElementById('pdftun-globalY') as HTMLInputElement | null;
    const globalX = document.getElementById('pdftun-globalX') as HTMLInputElement | null;

    if (extraTrim) extraTrim.value = String(values.extraTrim);
    if (safeMargin) safeMargin.value = String(values.safeMargin);
    if (tightFudge) tightFudge.value = String(values.tightFudge);
    if (right) right.value = String(values.rightShift);
    if (scale) scale.value = String(values.scalePct);
    if (globalY) globalY.value = String(values.globalAllYmm);
    if (globalX) globalX.value = String(values.globalAllRightMm);
  };

  const init = (): void => {
    refreshPagesList();
    loadValuesForSelected();
  };
  init();

  btn.addEventListener('click', () => {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display === 'block') {
      try {
        refreshPagesList();
        loadValuesForSelected();
      } catch {
        // ignore open refresh failures
      }

      try {
        const overrides = getPdfPageOverrides();
        const pages = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root .a4-page'));
        const storage = getBrowserStorage();
        if (overrides && Object.keys(overrides).length === 0 && !storage?.getItem('templatesPdf.presetSeeded.v4')) {
          if (pages.length) {
            applyPdfPreset(pages.length);
            try {
              storage?.setItem('templatesPdf.presetSeeded.v4', '1');
            } catch {
              // ignore storage failures
            }
            loadValuesForSelected();
          }
        }
      } catch {
        // ignore preset seeding failures
      }

      try {
        const globalWindow = window as Window & { __pdfTunerMO?: MutationObserver | null };
        if (globalWindow.__pdfTunerMO) {
          try {
            globalWindow.__pdfTunerMO.disconnect();
          } catch {
            // ignore disconnect failures
          }
        }
        const wrap = document.querySelector('#templates-preview-host #templates-a4-root [data-a4-pages]') || document.querySelector('#templates-preview-host #templates-a4-root');
        if (wrap) {
          const observer = new MutationObserver(() => {
            try {
              refreshPagesList();
            } catch {
              // ignore observer refresh failures
            }
          });
          observer.observe(wrap, { childList: true, subtree: true });
          globalWindow.__pdfTunerMO = observer;
        }
      } catch {
        // ignore observer failures
      }

      void options.onRenderPreview();
    } else {
      try {
        const globalWindow = window as Window & { __pdfTunerMO?: MutationObserver | null };
        if (globalWindow.__pdfTunerMO) {
          globalWindow.__pdfTunerMO.disconnect();
          globalWindow.__pdfTunerMO = null;
        }
      } catch {
        // ignore observer cleanup failures
      }
    }
  });

  panel.querySelector('#pdftun-page')?.addEventListener('change', () => {
    loadValuesForSelected();
  });

  const bind = (id: string, key: string, perPage = true): void => {
    const input = document.getElementById(id);
    if (!(input instanceof HTMLInputElement)) return;

    const persist = (): void => {
      const value = input.value;
      if (perPage) {
        const select = panel.querySelector<HTMLSelectElement>('#pdftun-page');
        const pageValue = select?.value || '0';
        setPdfPageOverride(Number(pageValue), key, value);
      } else {
        writePdfPref(key, value);
      }
    };

    input.addEventListener('input', persist);
    input.addEventListener('change', persist);
  };

  bind('pdftun-extraTrim', 'templatesPdf.extraTrimMm', true);
  bind('pdftun-safeMargin', 'templatesPdf.safeMarginMm', true);
  bind('pdftun-tightFudge', 'templatesPdf.tightFudgeMm', true);
  bind('pdftun-right', 'templatesPdf.shiftRightMm', true);
  bind('pdftun-scale', 'templatesPdf.scalePct', false);
  bind('pdftun-globalY', 'templatesPdf.globalAllYmm', false);
  bind('pdftun-globalX', 'templatesPdf.globalAllRightMm', false);

  const presetBtn = document.getElementById('pdftun-preset');
  presetBtn?.addEventListener('click', () => {
    const pages = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root .a4-page'));
    applyPdfPreset(pages.length);
    loadValuesForSelected();
  });

  const resetBtn = document.getElementById('pdftun-reset');
  resetBtn?.addEventListener('click', () => {
    try {
      [
        'templatesPdf.extraTrimMm',
        'templatesPdf.safeMarginMm',
        'templatesPdf.tightFudgeMm',
        'templatesPdf.shiftRightMm',
        'templatesPdf.scalePct',
        'templatesPdf.globalYmm',
        'templatesPdf.globalAllYmm',
        'templatesPdf.globalAllRightMm',
      ].forEach((key) => {
        const storage = getBrowserStorage();
        const { ns } = resolvePdfKey(key);
        storage?.removeItem(ns);
        storage?.removeItem(key);
      });
      clearPdfPageOverrides();
    } catch {
      // ignore reset failures
    }
    init();
  });

  const printBtn = document.getElementById('pdftun-print');
  printBtn?.addEventListener('click', () => {
    void options.onPrint();
  });

  try {
    const globalWindow = window as Window & {
      __pdfTunerRefreshPages?: () => void;
      __pdfTunerLoadValues?: () => void;
    };
    globalWindow.__pdfTunerRefreshPages = refreshPagesList;
    globalWindow.__pdfTunerLoadValues = loadValuesForSelected;
  } catch {
    // ignore global exposure failures
  }
}
