import { translate } from '../reports/formatters.js';
import reportsState from '../reports/state.js';
import { buildA4ReportPages, exportA4ReportPdf } from './presenters/a4Unified.js';

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
                  <div class="quote-preview-header-actions__right" style="display:flex; gap:8px; align-items:center;">
                    <div class="quote-preview-toggles" data-toggle-wrapper style="position:relative;">
                      <button type="button" class="quote-preview-zoom-btn" data-toggle-open title="إظهار/إخفاء أقسام">⚙️</button>
                      <div data-toggle-menu style="position:absolute; top:36px; inset-inline-end:0; background:var(--dropdown-bg,#fff); color:var(--dropdown-fg,#111); border:1px solid var(--dropdown-br,#e5e7eb); border-radius:8px; box-shadow:0 8px 24px rgba(0,0,0,.12); padding:10px 12px; min-width:240px; display:none; z-index:20;">
                        <label style="display:flex; gap:6px; align-items:center; padding:4px 2px;">
                          <input type="checkbox" data-toggle-header checked>
                          <span>إظهار العنوان (الهيدر)</span>
                        </label>
                        <label style="display:flex; gap:6px; align-items:center; padding:4px 2px;">
                          <input type="checkbox" data-toggle-kpis checked>
                          <span>إظهار البطاقات (KPIs)</span>
                        </label>
                        <label style="display:flex; gap:6px; align-items:center; padding:4px 2px;">
                          <input type="checkbox" data-toggle-revenue checked>
                          <span>إظهار تفاصيل الإيرادات</span>
                        </label>
                        <hr style="border:none;border-top:1px solid var(--dropdown-br,#e5e7eb);margin:6px 0;">
                        <div data-columns-wrap style="display:flex; flex-direction:column; gap:4px; max-height:220px; overflow:auto;">
                          <strong style="font-size:12px; opacity:.8;">الأعمدة الظاهرة</strong>
                          <!-- عموديات ديناميكية هنا -->
                        </div>
                        <hr style="border:none;border-top:1px solid var(--dropdown-br,#e5e7eb);margin:6px 0;">
                        <div data-rows-wrap style="display:flex; flex-direction:column; gap:4px;">
                          <strong style="font-size:12px; opacity:.8;">تصفية الصفوف</strong>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-paid checked><span>مدفوعة</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-unpaid checked><span>غير مدفوعة</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-confirmed checked><span>مؤكدة</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-pending checked><span>قيد التأكيد</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-completed checked><span>منتهية</span></label>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm" data-print-pdf>${translate('reservations.reports.actions.exportPdf', '📄 تصدير PDF', 'Export PDF')}</button>
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
  const pagesRoot = buildA4ReportPages(dataRows, { context: 'preview' });
  frame.appendChild(pagesRoot);

  setupZoom(modal);

  // إعداد لوحة الإخفاء/الإظهار
  (function setupToggles() {
    const menu = modal.querySelector('[data-toggle-menu]');
    const openBtn = modal.querySelector('[data-toggle-open]');
    const cbHeader = menu?.querySelector('[data-toggle-header]');
    const cbKpis = menu?.querySelector('[data-toggle-kpis]');
    const cbRevenue = menu?.querySelector('[data-toggle-revenue]');
    const columnsWrap = menu?.querySelector('[data-columns-wrap]');
    const rowsWrap = menu?.querySelector('[data-rows-wrap]');
    const getPref = (k, def=true) => {
      try { const v = localStorage.getItem(`reportsPdf.hide.${k}`); return v === '1' ? false : def; } catch (_) { return def; }
    };
    const apply = (opts = {}) => {
      const hideHeader = cbHeader && !cbHeader.checked;
      const hideKpis = cbKpis && !cbKpis.checked;
      const hideRevenue = cbRevenue && !cbRevenue.checked;
      pagesRoot.toggleAttribute('data-hide-header', hideHeader);
      pagesRoot.toggleAttribute('data-hide-kpis', hideKpis);
      pagesRoot.toggleAttribute('data-hide-revenue', hideRevenue);
      try {
        localStorage.setItem('reportsPdf.hide.header', hideHeader ? '1' : '0');
        localStorage.setItem('reportsPdf.hide.kpis', hideKpis ? '1' : '0');
        localStorage.setItem('reportsPdf.hide.revenue', hideRevenue ? '1' : '0');
      } catch (_) {}

      // إعادة بناء الصفحات عند تغيير الأعمدة/الصفوف
      if (opts.rebuild) {
        const selectedCols = Array.from(columnsWrap?.querySelectorAll('input[type="checkbox"][data-col]') || [])
          .filter((el) => el.checked)
          .map((el) => el.getAttribute('data-col'));
        const rowFilters = {
          showPaid: rowsWrap?.querySelector('[data-filter-paid]')?.checked !== false,
          showUnpaid: rowsWrap?.querySelector('[data-filter-unpaid]')?.checked !== false,
          showConfirmed: rowsWrap?.querySelector('[data-filter-confirmed]')?.checked !== false,
          showPending: rowsWrap?.querySelector('[data-filter-pending]')?.checked !== false,
          showCompleted: rowsWrap?.querySelector('[data-filter-completed]')?.checked !== false,
        };
        // حفظ الأعمدة
        try {
          selectedCols.forEach((h) => localStorage.setItem(`reportsPdf.column.${h}`, '1'));
          const allLabels = Array.from(columnsWrap?.querySelectorAll('input[type="checkbox"][data-col]') || []).map((el) => el.getAttribute('data-col'));
          allLabels.forEach((h) => { if (!selectedCols.includes(h)) localStorage.setItem(`reportsPdf.column.${h}`, '0'); });
        } catch (_) {}
        // إعادة البناء
        const newRoot = buildA4ReportPages(dataRows, { context: 'preview', columns: selectedCols, rowFilters });
        frame.innerHTML = '';
        frame.appendChild(newRoot);
      }
    };
    if (menu && openBtn) {
      openBtn.addEventListener('click', () => { menu.style.display = menu.style.display === 'none' || !menu.style.display ? 'block' : 'none'; });
      document.addEventListener('click', (e) => { if (!modal.contains(e.target)) return; if (!menu.contains(e.target) && e.target !== openBtn) { menu.style.display = 'none'; } });
    }
    // تهيئة القيم من LocalStorage
    if (cbHeader) cbHeader.checked = getPref('header', true);
    if (cbKpis) cbKpis.checked = getPref('kpis', true);
    if (cbRevenue) cbRevenue.checked = getPref('revenue', true);
    // حفظ إعدادات صفوف للـ LocalStorage عند التبديل
    const bindRowPref = (sel, key) => {
      const el = rowsWrap?.querySelector(sel);
      if (!el) return;
      // قراءة قديمة
      const v = localStorage.getItem(`reportsPdf.rows.${key}`);
      if (v != null) el.checked = v !== '0';
      el.addEventListener('change', () => {
        try { localStorage.setItem(`reportsPdf.rows.${key}`, el.checked ? '1' : '0'); } catch (_) {}
      });
    };
    bindRowPref('[data-filter-paid]', 'paid');
    bindRowPref('[data-filter-unpaid]', 'unpaid');
    bindRowPref('[data-filter-confirmed]', 'confirmed');
    bindRowPref('[data-filter-pending]', 'pending');
    bindRowPref('[data-filter-completed]', 'completed');
    // أول تطبيق
    apply();
    // تهيئة عموديات
    const buildColumns = () => {
      if (!columnsWrap) return;
      const headers = Object.keys((dataRows && dataRows[0]) || {});
      columnsWrap.querySelectorAll('[data-col]').forEach((n) => n.parentElement?.remove());
      headers.forEach((h) => {
        const label = document.createElement('label');
        label.style.cssText = 'display:flex;gap:6px;align-items:center;padding:2px 0;';
        const cb = document.createElement('input'); cb.type = 'checkbox'; cb.setAttribute('data-col', h);
        try { cb.checked = (localStorage.getItem(`reportsPdf.column.${h}`) ?? '1') === '1'; } catch (_) { cb.checked = true; }
        label.appendChild(cb);
        const span = document.createElement('span'); span.textContent = h; label.appendChild(span);
        columnsWrap.appendChild(label);
        cb.addEventListener('change', () => apply({ rebuild: true }));
      });
    };
    buildColumns();
    // مستمعي التغييرات للأقسام والثيم
    [cbHeader, cbKpis, cbRevenue].forEach((el) => el && el.addEventListener('change', () => apply({ rebuild: true })));
    rowsWrap?.querySelectorAll('input[type="checkbox"]').forEach((el) => el.addEventListener('change', () => apply({ rebuild: true })));

    // تكييف ألوان القائمة مع الداكن/الفاتح
    const updateMenuTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme')?.includes('dark')
        || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (menu) {
        menu.style.setProperty('--dropdown-bg', isDark ? '#0b1220' : '#ffffff');
        menu.style.setProperty('--dropdown-fg', isDark ? '#e5e7eb' : '#111111');
        menu.style.setProperty('--dropdown-br', isDark ? 'rgba(148,163,184,.35)' : '#e5e7eb');
      }
    };
    updateMenuTheme();
    document.addEventListener('theme:changed', updateMenuTheme);
  }());

  // Export directly (download PDF) without opening print preview
  const printBtn = modal.querySelector('[data-print-pdf]');
  if (printBtn) {
    printBtn.addEventListener('click', async () => {
      // تنزيل مباشر بدون فتح معاينة الطباعة (strict=false)
      await exportA4ReportPdf(dataRows, { action: 'save', strict: false });
    });
  }


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
