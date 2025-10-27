import { translate } from '../reports/formatters.js';
import reportsState from '../reports/state.js';
import { buildPdfReportElement, exportAsPdf } from './presenters/exporters.js';

function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal fade quote-preview-modal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${translate('reservations.reports.preview.title', 'معاينة تقرير الحجوزات', 'Reservations Report Preview')}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout" style="display:block;grid-template-columns:1fr;">
            <section class="quote-preview-panel" style="flex:1;min-height:70vh;padding:18px;">
              <div class="quote-preview" data-preview-host>
                <div class="quote-preview-header-actions" data-preview-actions style="display:flex;align-items:center;justify-content:center;gap:12px;">
                  <div class="quote-preview-zoom-controls" data-zoom-controls style="display:flex;align-items:center;gap:6px;">
                    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="−">−</button>
                    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
                    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="+">+</button>
                    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="1:1">1:1</button>
                  </div>
                  <div class="quote-preview-header-actions__right" style="display:flex; gap:8px;">
                    <button type="button" class="btn btn-outline btn-sm" data-export-pdf>🖨️ ${translate('reservations.reports.actions.exportPdf', 'تصدير PDF', 'Export PDF')}</button>
                  </div>
                </div>
                <div class="quote-preview-frame-wrapper" style="display:flex;justify-content:center;align-items:flex-start;">
                  <div class="quote-preview-scroll" style="overflow:auto;max-height:65vh;display:flex;justify-content:center;width:100%;">
                    <div class="quote-preview-frame" data-preview-frame style="background:#fff;border-radius:12px;box-shadow:0 0 0 1px rgba(148,163,184,.25);"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" data-bs-dismiss="modal">${translate('actions.close', 'إغلاق', 'Close')}</button>
        </div>
      </div>
    </div>
  `;
  return modal;
}

function setupZoom(modal) {
  let zoom = 1;
  const frame = modal.querySelector('[data-preview-frame]');
  const zoomValue = modal.querySelector('[data-zoom-value]');
  const wrapper = modal.querySelector('.quote-preview-frame-wrapper');
  const apply = () => {
    frame.style.transformOrigin = 'top center';
    frame.style.transform = `scale(${zoom})`;
    zoomValue.textContent = `${Math.round(zoom * 100)}%`;
  };
  const fitToWidth = () => {
    const targetWidth = 794; // A4 px in our template
    const available = wrapper?.clientWidth || frame.parentElement?.clientWidth || targetWidth;
    const nextZoom = Math.min(1.2, Math.max(0.4, (available - 24) / targetWidth));
    zoom = nextZoom;
    apply();
  };
  modal.querySelector('[data-zoom-in]').addEventListener('click', () => { zoom = Math.min(2, zoom + 0.1); apply(); });
  modal.querySelector('[data-zoom-out]').addEventListener('click', () => { zoom = Math.max(0.4, zoom - 0.1); apply(); });
  modal.querySelector('[data-zoom-reset]').addEventListener('click', () => { zoom = 1; apply(); });
  // initial fit
  setTimeout(fitToWidth, 0);
  window.addEventListener('resize', fitToWidth);
}

export function openReportsPdfPreview(rows) {
  const modal = createModal();
  document.body.appendChild(modal);

  const frame = modal.querySelector('[data-preview-frame]');
  const dataRows = rows && rows.length ? rows : (reportsState.lastSnapshot.tableRows || []);
  const pdfRoot = buildPdfReportElement(dataRows);
  // استخدم نسخة للمعاينة فقط
  const sheet = pdfRoot.querySelector('.pdf');
  if (sheet) {
    sheet.style.width = '794px';
    // align preview page to the right inside modal so right edge isn't clipped
    sheet.style.margin = '0 0 0 auto';
    sheet.style.direction = 'rtl';
  }
  frame.appendChild(pdfRoot);

  setupZoom(modal);

  modal.querySelector('[data-export-pdf]').addEventListener('click', async () => {
    const exportRows = dataRows;
    await exportAsPdf(exportRows);
  });

  // Bootstrap modal API (if available) or fallback
  try {
    const modalInstance = new window.bootstrap.Modal(modal, { backdrop: true, keyboard: true });
    modal.addEventListener('hidden.bs.modal', () => modal.remove(), { once: true });
    modalInstance.show();
  } catch (_) {
    modal.style.display = 'block';
    modal.setAttribute('open', 'true');
  }
}

export default {
  openReportsPdfPreview,
};
