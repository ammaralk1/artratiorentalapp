const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./a4Unified.DJIMoDI5.js","./calculations.Cuzjzmo7.js","./reservationsService.DHFcI6wO.js","./auth.DEm-O4iH.js","./auth.BYuXtjTf.css","./reports.Cbjcru3U.js","./dashboard.DW-jEbIu.js","./controller.CKj9uBP3.js","./dashboardShell.BJ8UOETr.js","./customers.DDv-F3VN.js","./index.CUo9sM62.css","./maintenanceService.-sdg2Aq9.js"])))=>i.map(i=>d[i]);
import{_ as L}from"./dashboard.DW-jEbIu.js";import{r as _,t as S}from"./calculations.Cuzjzmo7.js";import{buildA4ReportPages as A,exportA4ReportPdf as R}from"./a4Unified.DJIMoDI5.js";import"./controller.CKj9uBP3.js";import"./auth.DEm-O4iH.js";import"./reservationsService.DHFcI6wO.js";/* empty css              */import"./dashboardShell.BJ8UOETr.js";import"./customers.DDv-F3VN.js";import"./reports.Cbjcru3U.js";import"./maintenanceService.-sdg2Aq9.js";function I(){const o=document.createElement("div");return o.className="modal fade quote-preview-modal",o.setAttribute("tabindex","-1"),o.setAttribute("aria-hidden","true"),o.innerHTML=`
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${S("reservations.reports.preview.title","معاينة تقرير الحجوزات","Reservations Report Preview")}</h5>
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
                    <button type="button" class="btn btn-primary btn-sm" data-print-pdf>${S("reservations.reports.actions.exportPdf","📄 تصدير PDF","Export PDF")}</button>
                    <button type="button" class="btn btn-outline btn-sm" data-export-csv title="CSV">${S("reservations.reports.actions.exportCsv","🧾 CSV","CSV")}</button>
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
          <button type="button" class="btn" data-bs-dismiss="modal">${S("actions.close","إغلاق","Close")}</button>
        </div>
      </div>
    </div>
  `,o}function M(o){let e=1;const d=o.querySelector("[data-preview-frame]"),l=o.querySelector("[data-zoom-value]"),u=o.querySelector(".quote-preview-frame-wrapper"),c=()=>{d.style.transformOrigin="top center",d.style.transform=`scale(${e})`,l.textContent=`${Math.round(e*100)}%`},y=()=>{const a=u?.clientWidth||d.parentElement?.clientWidth||794;e=Math.min(1.2,Math.max(.4,(a-24)/794)),c()};o.querySelector("[data-zoom-in]").addEventListener("click",()=>{e=Math.min(2,e+.1),c()}),o.querySelector("[data-zoom-out]").addEventListener("click",()=>{e=Math.max(.4,e-.1),c()}),o.querySelector("[data-zoom-reset]").addEventListener("click",()=>{e=1,c()}),setTimeout(y,0),window.addEventListener("resize",y)}function $(o){const e=I();document.body.appendChild(e);const d=e.querySelector("[data-preview-frame]"),l=o&&o.length?o:_.lastSnapshot.tableRows||[],u=A(l,{context:"preview"});d.appendChild(u),M(e),(function(){const a=e.querySelector("[data-toggle-menu]"),k=e.querySelector("[data-toggle-open]"),f=a?.querySelector("[data-toggle-header]"),g=a?.querySelector("[data-toggle-kpis]"),h=a?.querySelector("[data-toggle-revenue]"),v=a?.querySelector("[data-columns-wrap]"),p=a?.querySelector("[data-rows-wrap]"),E=(t,r=!0)=>{try{return localStorage.getItem(`reportsPdf.hide.${t}`)==="1"?!1:r}catch{return r}},q=(t={})=>{const r=f&&!f.checked,n=g&&!g.checked,i=h&&!h.checked;u.toggleAttribute("data-hide-header",r),u.toggleAttribute("data-hide-kpis",n),u.toggleAttribute("data-hide-revenue",i);try{localStorage.setItem("reportsPdf.hide.header",r?"1":"0"),localStorage.setItem("reportsPdf.hide.kpis",n?"1":"0"),localStorage.setItem("reportsPdf.hide.revenue",i?"1":"0")}catch{}if(t.rebuild){const s=Array.from(v?.querySelectorAll('input[type="checkbox"][data-col]')||[]).filter(w=>w.checked).map(w=>w.getAttribute("data-col")),z={showPaid:p?.querySelector("[data-filter-paid]")?.checked!==!1,showUnpaid:p?.querySelector("[data-filter-unpaid]")?.checked!==!1,showConfirmed:p?.querySelector("[data-filter-confirmed]")?.checked!==!1,showPending:p?.querySelector("[data-filter-pending]")?.checked!==!1,showCompleted:p?.querySelector("[data-filter-completed]")?.checked!==!1};try{s.forEach(b=>localStorage.setItem(`reportsPdf.column.${b}`,"1")),Array.from(v?.querySelectorAll('input[type="checkbox"][data-col]')||[]).map(b=>b.getAttribute("data-col")).forEach(b=>{s.includes(b)||localStorage.setItem(`reportsPdf.column.${b}`,"0")})}catch{}const C=A(l,{context:"preview",columns:s,rowFilters:z});d.innerHTML="",d.appendChild(C)}};a&&k&&(k.addEventListener("click",()=>{a.style.display=a.style.display==="none"||!a.style.display?"block":"none"}),document.addEventListener("click",t=>{e.contains(t.target)&&!a.contains(t.target)&&t.target!==k&&(a.style.display="none")})),f&&(f.checked=E("header",!0)),g&&(g.checked=E("kpis",!0)),h&&(h.checked=E("revenue",!0));const x=(t,r)=>{const n=p?.querySelector(t);if(!n)return;const i=localStorage.getItem(`reportsPdf.rows.${r}`);i!=null&&(n.checked=i!=="0"),n.addEventListener("change",()=>{try{localStorage.setItem(`reportsPdf.rows.${r}`,n.checked?"1":"0")}catch{}})};x("[data-filter-paid]","paid"),x("[data-filter-unpaid]","unpaid"),x("[data-filter-confirmed]","confirmed"),x("[data-filter-pending]","pending"),x("[data-filter-completed]","completed"),q(),(()=>{if(!v)return;const t=Object.keys(l&&l[0]||{});v.querySelectorAll("[data-col]").forEach(r=>r.parentElement?.remove()),t.forEach(r=>{const n=document.createElement("label");n.style.cssText="display:flex;gap:6px;align-items:center;padding:2px 0;";const i=document.createElement("input");i.type="checkbox",i.setAttribute("data-col",r);try{i.checked=(localStorage.getItem(`reportsPdf.column.${r}`)??"1")==="1"}catch{i.checked=!0}n.appendChild(i);const s=document.createElement("span");s.textContent=r,n.appendChild(s),v.appendChild(n),i.addEventListener("change",()=>q({rebuild:!0}))})})(),[f,g,h].forEach(t=>t&&t.addEventListener("change",()=>q({rebuild:!0}))),p?.querySelectorAll('input[type="checkbox"]').forEach(t=>t.addEventListener("change",()=>q({rebuild:!0})));const P=()=>{const t=document.documentElement.getAttribute("data-theme")?.includes("dark")||window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;a&&(a.style.setProperty("--dropdown-bg",t?"#0b1220":"#ffffff"),a.style.setProperty("--dropdown-fg",t?"#e5e7eb":"#111111"),a.style.setProperty("--dropdown-br",t?"rgba(148,163,184,.35)":"#e5e7eb"))};P(),document.addEventListener("theme:changed",P)})();const c=e.querySelector("[data-print-pdf]");c&&c.addEventListener("click",async()=>{await R(l,{action:"save",strict:!1})});const y=e.querySelector("[data-export-csv]");y&&y.addEventListener("click",async()=>{const{exportA4ReportCsv:m}=await L(async()=>{const{exportA4ReportCsv:a}=await import("./a4Unified.DJIMoDI5.js");return{exportA4ReportCsv:a}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]),import.meta.url);await m(l)});try{const m=new window.bootstrap.Modal(e,{backdrop:!0,keyboard:!0});e.addEventListener("hidden.bs.modal",()=>e.remove(),{once:!0}),m.show()}catch{e.style.display="block",e.setAttribute("open","true")}}const U={openReportsPdfPreview:$};export{U as default,$ as openReportsPdfPreview};
