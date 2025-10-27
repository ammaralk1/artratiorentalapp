import{r as n,t as i}from"./calculations.CyxiFYsX.js";import{b as l,e as c}from"./reports.DGdVA_kp.js";import"./reservationsService.BLsfbDMx.js";import"./auth.iwMzhNuX.js";import"./dashboard.C7l62ehi.js";import"./controller.C4-gll4v.js";/* empty css              */import"./dashboardShell.LnKpP1zQ.js";import"./customers.BOIYlDUN.js";import"./maintenanceService.aKjbu1H1.js";function p(){const e=document.createElement("div");return e.className="modal fade quote-preview-modal",e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true"),e.innerHTML=`
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${i("reservations.reports.preview.title","معاينة تقرير الحجوزات","Reservations Report Preview")}</h5>
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
                    <button type="button" class="btn btn-outline btn-sm" data-export-pdf>🖨️ ${i("reservations.reports.actions.exportPdf","PDF","PDF")}</button>
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
          <button type="button" class="btn" data-bs-dismiss="modal">${i("actions.close","إغلاق","Close")}</button>
        </div>
      </div>
    </div>
  `,e}function u(e){let t=1;const s=e.querySelector("[data-preview-frame]"),a=e.querySelector("[data-zoom-value]"),o=()=>{s.style.transform=`scale(${t})`,a.textContent=`${Math.round(t*100)}%`};e.querySelector("[data-zoom-in]").addEventListener("click",()=>{t=Math.min(2,t+.1),o()}),e.querySelector("[data-zoom-out]").addEventListener("click",()=>{t=Math.max(.4,t-.1),o()}),e.querySelector("[data-zoom-reset]").addEventListener("click",()=>{t=1,o()}),o()}function v(e){const t=p();document.body.appendChild(t);const s=t.querySelector("[data-preview-frame]"),a=e&&e.length?e:n.lastSnapshot.tableRows||[],o=l(a),d=o.querySelector(".pdf");d&&(d.style.width="794px"),s.appendChild(o),u(t),t.querySelector("[data-export-pdf]").addEventListener("click",async()=>{await c(a)});try{const r=new window.bootstrap.Modal(t,{backdrop:!0,keyboard:!0});t.addEventListener("hidden.bs.modal",()=>t.remove(),{once:!0}),r.show()}catch{t.style.display="block",t.setAttribute("open","true")}}const R={openReportsPdfPreview:v};export{R as default,v as openReportsPdfPreview};
