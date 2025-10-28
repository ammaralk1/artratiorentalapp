import{r as h,t as b}from"./calculations.Cuzjzmo7.js";import{buildA4ReportPages as f,exportA4ReportPdf as x}from"./a4Unified.BxqV7lD_.js";import"./reservationsService.DHFcI6wO.js";import"./auth.DEm-O4iH.js";import"./reports.KJJ9U07g.js";import"./dashboard.C-KjStso.js";import"./controller.CKj9uBP3.js";/* empty css              */import"./dashboardShell.BJ8UOETr.js";import"./customers.DDv-F3VN.js";import"./maintenanceService.-sdg2Aq9.js";function w(){const t=document.createElement("div");return t.className="modal fade quote-preview-modal",t.setAttribute("tabindex","-1"),t.setAttribute("aria-hidden","true"),t.innerHTML=`
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${b("reservations.reports.preview.title","معاينة تقرير الحجوزات","Reservations Report Preview")}</h5>
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
                      <div data-toggle-menu style="position:absolute; top:36px; inset-inline-end:0; background:#fff; color:#111; border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 8px 24px rgba(0,0,0,.12); padding:8px 10px; min-width:210px; display:none; z-index:20;">
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
                      </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm" data-print-pdf>${b("reservations.reports.actions.exportPdf","📄 تصدير PDF","Export PDF")}</button>
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
          <button type="button" class="btn" data-bs-dismiss="modal">${b("actions.close","إغلاق","Close")}</button>
        </div>
      </div>
    </div>
  `,t}function k(t){let e=1;const d=t.querySelector("[data-preview-frame]"),v=t.querySelector("[data-zoom-value]"),s=t.querySelector(".quote-preview-frame-wrapper"),i=()=>{d.style.transformOrigin="top center",d.style.transform=`scale(${e})`,v.textContent=`${Math.round(e*100)}%`},r=()=>{const l=s?.clientWidth||d.parentElement?.clientWidth||794;e=Math.min(1.2,Math.max(.4,(l-24)/794)),i()};t.querySelector("[data-zoom-in]").addEventListener("click",()=>{e=Math.min(2,e+.1),i()}),t.querySelector("[data-zoom-out]").addEventListener("click",()=>{e=Math.max(.4,e-.1),i()}),t.querySelector("[data-zoom-reset]").addEventListener("click",()=>{e=1,i()}),setTimeout(r,0),window.addEventListener("resize",r)}function q(t){const e=w();document.body.appendChild(e);const d=e.querySelector("[data-preview-frame]"),v=t&&t.length?t:h.lastSnapshot.tableRows||[],s=f(v,{context:"preview"});d.appendChild(s),k(e),(function(){const o=e.querySelector("[data-toggle-menu]"),l=e.querySelector("[data-toggle-open]"),n=o?.querySelector("[data-toggle-header]"),c=o?.querySelector("[data-toggle-kpis]"),p=o?.querySelector("[data-toggle-revenue]"),g=(a,u=!0)=>{try{return localStorage.getItem(`reportsPdf.hide.${a}`)==="1"?!1:u}catch{return u}},y=()=>{const a=n&&!n.checked,u=c&&!c.checked,m=p&&!p.checked;s.toggleAttribute("data-hide-header",a),s.toggleAttribute("data-hide-kpis",u),s.toggleAttribute("data-hide-revenue",m);try{localStorage.setItem("reportsPdf.hide.header",a?"1":"0"),localStorage.setItem("reportsPdf.hide.kpis",u?"1":"0"),localStorage.setItem("reportsPdf.hide.revenue",m?"1":"0")}catch{}};o&&l&&(l.addEventListener("click",()=>{o.style.display=o.style.display==="none"||!o.style.display?"block":"none"}),document.addEventListener("click",a=>{e.contains(a.target)&&!o.contains(a.target)&&a.target!==l&&(o.style.display="none")})),n&&(n.checked=g("header",!0)),c&&(c.checked=g("kpis",!0)),p&&(p.checked=g("revenue",!0)),y(),[n,c,p].forEach(a=>a&&a.addEventListener("change",y))})();const i=e.querySelector("[data-print-pdf]");i&&i.addEventListener("click",async()=>{await x(v,{action:"save",strict:!1})});try{const r=new window.bootstrap.Modal(e,{backdrop:!0,keyboard:!0});e.addEventListener("hidden.bs.modal",()=>e.remove(),{once:!0}),r.show()}catch{e.style.display="block",e.setAttribute("open","true")}}const _={openReportsPdfPreview:q};export{_ as default,q as openReportsPdfPreview};
