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
          <div class="quote-preview-layout">
            <section class="quote-preview-panel" style="flex:1;min-height:60vh;">
              <div class="quote-preview" data-preview-host>
                <div class="quote-preview-header-actions" data-preview-actions>
                  <div class="quote-preview-zoom-controls" data-zoom-controls>
                    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="−">−</button>
                    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
                    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="+">+</button>
                    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="1:1">1:1</button>
                  </div>
                  <div class="quote-preview-header-actions__right">
                    <button type="button" class="btn btn-outline btn-sm" data-export-pdf>🖨️ ${translate('reservations.reports.actions.exportPdf', 'PDF', 'PDF')}</button>
                  </div>
                </div>
                <div class="quote-preview-frame-wrapper">
                  <div class="quote-preview-scroll">
                    <div class="quote-preview-frame" data-preview-frame></div>
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
  const apply = () => {
    frame.style.transform = `scale(${zoom})`;
    zoomValue.textContent = `${Math.round(zoom * 100)}%`;
  };
  modal.querySelector('[data-zoom-in]').addEventListener('click', () => { zoom = Math.min(2, zoom + 0.1); apply(); });
  modal.querySelector('[data-zoom-out]').addEventListener('click', () => { zoom = Math.max(0.4, zoom - 0.1); apply(); });
  modal.querySelector('[data-zoom-reset]').addEventListener('click', () => { zoom = 1; apply(); });
  apply();
}

export function openReportsPdfPreview(rows) {
  const modal = createModal();
  document.body.appendChild(modal);

  const frame = modal.querySelector('[data-preview-frame]');
  const dataRows = rows && rows.length ? rows : (reportsState.lastSnapshot.tableRows || []);
  const pdfRoot = buildPdfReportElement(dataRows);
  // استخدم نسخة للمعاينة فقط
  const sheet = pdfRoot.querySelector('.pdf');
  if (sheet) sheet.style.width = '794px';
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

