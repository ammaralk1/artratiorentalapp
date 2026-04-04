import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  clearPdfPageOverrides,
  ensurePdfTunerUI,
  readPdfPref,
  readPdfPrefForPage,
  setPdfPageOverride,
  showPrintPreviewOverlay,
  writePdfPref,
} from '../../../src/scripts/projects/templatesTab/pdf.ts';

describe('templatesTab/pdf', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  it('stores namespaced PDF prefs by template type', () => {
    document.body.innerHTML = `
      <select id="templates-type">
        <option value="callsheet" selected>callsheet</option>
      </select>
    `;

    writePdfPref('templatesPdf.scalePct', 105);
    expect(localStorage.getItem('templatesPdf.callsheet.scalePct')).toBe('105');
    expect(readPdfPref('templatesPdf.scalePct', 100)).toBe(105);

    const select = document.getElementById('templates-type');
    if (select instanceof HTMLSelectElement) select.value = 'expenses';
    writePdfPref('templatesPdf.scalePct', 98);

    expect(localStorage.getItem('templatesPdf.expenses.scalePct')).toBe('98');
    expect(readPdfPref('templatesPdf.scalePct', 100)).toBe(98);
  });

  it('reads, overrides, and clears per-page PDF prefs', () => {
    document.body.innerHTML = `
      <select id="templates-type">
        <option value="callsheet" selected>callsheet</option>
      </select>
    `;

    writePdfPref('templatesPdf.shiftRightMm', 40);
    setPdfPageOverride(2, 'templatesPdf.shiftRightMm', 61);

    expect(readPdfPrefForPage('templatesPdf.shiftRightMm', 0, 10)).toBe(40);
    expect(readPdfPrefForPage('templatesPdf.shiftRightMm', 2, 10)).toBe(61);

    clearPdfPageOverrides();
    expect(readPdfPrefForPage('templatesPdf.shiftRightMm', 2, 10)).toBe(40);
  });

  it('creates the PDF tuner UI and persists edited values', async () => {
    document.body.innerHTML = `
      <select id="templates-type">
        <option value="callsheet" selected>callsheet</option>
      </select>
      <div id="templates-shell">
        <div id="templates-controls"><div class="ms-auto"></div></div>
      </div>
      <div id="templates-preview-host">
        <div id="templates-a4-root">
          <div data-a4-pages>
            <div class="a4-page"><div class="callsheet-v1"><div class="cs-header">Page 1</div></div></div>
          </div>
        </div>
      </div>
    `;

    const onRenderPreview = vi.fn(async () => {});
    const onPrint = vi.fn(async () => {});

    ensurePdfTunerUI({ onRenderPreview, onPrint });
    ensurePdfTunerUI({ onRenderPreview, onPrint });

    expect(document.querySelectorAll('#templates-pdf-tuner-toggle')).toHaveLength(1);

    const toggle = document.getElementById('templates-pdf-tuner-toggle');
    toggle?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onRenderPreview).toHaveBeenCalledTimes(1);
    expect(document.getElementById('templates-pdf-tuner')?.style.display).toBe('block');

    const scale = document.getElementById('pdftun-scale');
    if (!(scale instanceof HTMLInputElement)) throw new Error('missing scale input');
    scale.value = '107';
    scale.dispatchEvent(new Event('input', { bubbles: true }));

    expect(localStorage.getItem('templatesPdf.callsheet.scalePct')).toBe('107');

    const printBtn = document.getElementById('pdftun-print');
    printBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onPrint).toHaveBeenCalledTimes(1);
  });

  it('shows print preview for meaningful pages only and forwards print action', async () => {
    document.body.innerHTML = `
      <div id="templates-preview-host">
        <div id="templates-a4-root">
          <div data-a4-pages>
            <div class="a4-page"><div class="callsheet-v1"><div class="cs-header">Visible</div></div></div>
            <div class="a4-page"><div> </div></div>
          </div>
        </div>
      </div>
    `;

    const onPrint = vi.fn(async () => {});
    showPrintPreviewOverlay({ onPrint });

    expect(document.body.textContent).toContain('عدد الصفحات: 1');

    const printBtn = Array.from(document.querySelectorAll('button')).find((button) => button.textContent === 'طباعة الآن');
    printBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onPrint).toHaveBeenCalledTimes(1);
  });
});
