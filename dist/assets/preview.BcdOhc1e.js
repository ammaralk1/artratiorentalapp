import{r as l,t as n}from"./calculations.D6WxSA2O.js";import{b as c,e as p}from"./reports.CMobyclP.js";import"./reservationsService.GQI1CCTA.js";import"./auth.D8N5UUv1.js";import"./dashboard.CHRLxHJz.js";import"./controller.ncIymopL.js";/* empty css              */import"./dashboardShell.Bb8UvVrw.js";import"./customers.N766igxp.js";import"./maintenanceService.b0m77oVa.js";function u(){const e=document.createElement("div");return e.className="modal fade quote-preview-modal",e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true"),e.innerHTML=`
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${n("reservations.reports.preview.title","معاينة تقرير الحجوزات","Reservations Report Preview")}</h5>
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
                    <button type="button" class="btn btn-outline btn-sm" data-export-pdf>🖨️ ${n("reservations.reports.actions.exportPdf","تصدير PDF","Export PDF")}</button>
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
          <button type="button" class="btn" data-bs-dismiss="modal">${n("actions.close","إغلاق","Close")}</button>
        </div>
      </div>
    </div>
  `,e}function m(e){let t=1;const s=e.querySelector("[data-preview-frame]"),i=e.querySelector("[data-zoom-value]"),r=e.querySelector(".quote-preview-frame-wrapper"),o=()=>{s.style.transformOrigin="top center",s.style.transform=`scale(${t})`,i.textContent=`${Math.round(t*100)}%`},a=()=>{const d=r?.clientWidth||s.parentElement?.clientWidth||794;t=Math.min(1.2,Math.max(.4,(d-24)/794)),o()};e.querySelector("[data-zoom-in]").addEventListener("click",()=>{t=Math.min(2,t+.1),o()}),e.querySelector("[data-zoom-out]").addEventListener("click",()=>{t=Math.max(.4,t-.1),o()}),e.querySelector("[data-zoom-reset]").addEventListener("click",()=>{t=1,o()}),setTimeout(a,0),window.addEventListener("resize",a)}function v(e){const t=u();document.body.appendChild(t);const s=t.querySelector("[data-preview-frame]"),i=e&&e.length?e:l.lastSnapshot.tableRows||[],r=c(i),o=r.querySelector(".pdf");o&&(o.style.width="794px",o.style.margin="0 0 0 auto",o.style.direction="rtl"),s.appendChild(r),m(t),t.querySelector("[data-export-pdf]").addEventListener("click",async()=>{await p(i)});try{const a=new window.bootstrap.Modal(t,{backdrop:!0,keyboard:!0});t.addEventListener("hidden.bs.modal",()=>t.remove(),{once:!0}),a.show()}catch{t.style.display="block",t.setAttribute("open","true")}}const R={openReportsPdfPreview:v};export{R as default,v as openReportsPdfPreview};
