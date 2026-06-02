import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  printCallsheetFromHost,
  printGenericTemplate,
  ensureHtml2Pdf,
  loadExternalScript,
  ensureAssetsReady,
} = vi.hoisted(() => ({
  printCallsheetFromHost: vi.fn(async () => {}),
  printGenericTemplate: vi.fn(async () => {}),
  ensureHtml2Pdf: vi.fn(async () => null),
  loadExternalScript: vi.fn(async () => {}),
  ensureAssetsReady: vi.fn(async () => {}),
}));

vi.mock('../../../src/scripts/templates/print.js', () => ({
  printCallsheetFromHost,
  printGenericTemplate,
}));

vi.mock('../../../src/scripts/reports/external.js', () => ({
  ensureHtml2Pdf,
  loadExternalScript,
}));

vi.mock('../../../src/scripts/templates/assets.js', () => ({
  ensureAssetsReady,
}));

import { printTemplatesPdf, renderPdfLivePreview } from '../../../src/scripts/projects/templatesTab/pdf-runtime.ts';

describe('templatesTab/pdf-runtime', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
    vi.clearAllMocks();
    delete window.html2canvas;
  });

  it('routes callsheet printing through the callsheet printer', async () => {
    document.body.innerHTML = `
      <div id="templates-preview-host">
        <div id="templates-a4-root"><div class="a4-page">Callsheet</div></div>
      </div>
    `;

    await printTemplatesPdf({
      root: document.querySelector('#templates-preview-host > #templates-a4-root'),
      getType: () => 'callsheet',
      alertFn: vi.fn(),
    });

    expect(printCallsheetFromHost).toHaveBeenCalledTimes(1);
    expect(printGenericTemplate).not.toHaveBeenCalled();
  });

  it('routes non-callsheet printing through the generic printer with the resolved orientation', async () => {
    document.body.innerHTML = `
      <div id="templates-preview-host">
        <div id="templates-a4-root"><div class="a4-page">Expenses</div></div>
      </div>
    `;

    await printTemplatesPdf({
      root: document.querySelector('#templates-preview-host > #templates-a4-root'),
      getType: () => 'expenses',
      alertFn: vi.fn(),
    });

    expect(printGenericTemplate).toHaveBeenCalledWith(
      document.querySelector('#templates-preview-host > #templates-a4-root'),
      { orientation: 'portrait', filename: 'template-expenses.pdf' },
    );
    expect(printCallsheetFromHost).not.toHaveBeenCalled();
  });

  it('shows a preview error message when html2canvas cannot be loaded', async () => {
    document.body.innerHTML = `
      <div id="templates-preview-host">
        <div id="templates-a4-root">
          <div class="a4-page"><div class="callsheet-v1">Preview</div></div>
        </div>
      </div>
      <div id="templates-pdf-live-slot"></div>
      <select id="pdftun-page"><option value="0" selected>1</option></select>
    `;

    await renderPdfLivePreview({
      root: document.querySelector('#templates-preview-host > #templates-a4-root'),
      getType: () => 'callsheet',
      slot: document.getElementById('templates-pdf-live-slot'),
    });

    expect(loadExternalScript).toHaveBeenCalledTimes(1);
    expect(document.getElementById('templates-pdf-live-slot')?.textContent).toContain('تعذر تحميل html2canvas');
    expect(ensureAssetsReady).not.toHaveBeenCalled();
  });
});
