import{r as l,t as n}from"./calculations.28JF9M5C.js";import{b as c,e as p}from"./reports.DsuwdmHc.js";import"./reservationsService.DkN3KeLm.js";import"./auth.cd8ANcEu.js";import"./dashboard.BwDNGphR.js";import"./controller.BtsD8MTy.js";/* empty css              */import"./dashboardShell.Br-txoC4.js";import"./customers.gxercBVz.js";import"./maintenanceService.BGih1fsV.js";function u(){const e=document.createElement("div");return e.className="modal fade quote-preview-modal",e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true"),e.innerHTML=`
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${n("reservations.reports.preview.title","معاينة تقرير الحجوزات","Reservations Report Preview")}</h5>
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
                    <button type="button" class="btn btn-outline btn-sm" data-export-pdf>🖨️ ${n("reservations.reports.actions.exportPdf","PDF","PDF")}</button>
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
          <button type="button" class="btn" data-bs-dismiss="modal">${n("actions.close","إغلاق","Close")}</button>
        </div>
      </div>
    </div>
  `,e}function m(e){let t=1;const s=e.querySelector("[data-preview-frame]"),r=e.querySelector("[data-zoom-value]"),i=e.querySelector(".quote-preview-frame-wrapper"),o=()=>{s.style.transformOrigin="top center",s.style.transform=`scale(${t})`,r.textContent=`${Math.round(t*100)}%`},a=()=>{const d=i?.clientWidth||s.parentElement?.clientWidth||794;t=Math.min(1.2,Math.max(.4,(d-24)/794)),o()};e.querySelector("[data-zoom-in]").addEventListener("click",()=>{t=Math.min(2,t+.1),o()}),e.querySelector("[data-zoom-out]").addEventListener("click",()=>{t=Math.max(.4,t-.1),o()}),e.querySelector("[data-zoom-reset]").addEventListener("click",()=>{t=1,o()}),setTimeout(a,0),window.addEventListener("resize",a)}function v(e){const t=u();document.body.appendChild(t);const s=t.querySelector("[data-preview-frame]"),r=e&&e.length?e:l.lastSnapshot.tableRows||[],i=c(r),o=i.querySelector(".pdf");o&&(o.style.width="794px"),s.appendChild(i),m(t),t.querySelector("[data-export-pdf]").addEventListener("click",async()=>{await p(r)});try{const a=new window.bootstrap.Modal(t,{backdrop:!0,keyboard:!0});t.addEventListener("hidden.bs.modal",()=>t.remove(),{once:!0}),a.show()}catch{t.style.display="block",t.setAttribute("open","true")}}const M={openReportsPdfPreview:v};export{M as default,v as openReportsPdfPreview};
