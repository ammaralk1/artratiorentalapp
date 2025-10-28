import{r as L,t as S}from"./calculations.Cuzjzmo7.js";import{buildA4ReportPages as z,exportA4ReportPdf as C}from"./a4Unified.BSaz4GgC.js";import"./reservationsService.DHFcI6wO.js";import"./auth.DEm-O4iH.js";import"./reports.DQtbbtUG.js";import"./dashboard.Co6bM7zB.js";import"./controller.CKj9uBP3.js";/* empty css              */import"./dashboardShell.BJ8UOETr.js";import"./customers.DDv-F3VN.js";import"./maintenanceService.-sdg2Aq9.js";function M(){const a=document.createElement("div");return a.className="modal fade quote-preview-modal",a.setAttribute("tabindex","-1"),a.setAttribute("aria-hidden","true"),a.innerHTML=`
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
  `,a}function R(a){let e=1;const i=a.querySelector("[data-preview-frame]"),s=a.querySelector("[data-zoom-value]"),u=a.querySelector(".quote-preview-frame-wrapper"),c=()=>{i.style.transformOrigin="top center",i.style.transform=`scale(${e})`,s.textContent=`${Math.round(e*100)}%`},m=()=>{const g=u?.clientWidth||i.parentElement?.clientWidth||794;e=Math.min(1.2,Math.max(.4,(g-24)/794)),c()};a.querySelector("[data-zoom-in]").addEventListener("click",()=>{e=Math.min(2,e+.1),c()}),a.querySelector("[data-zoom-out]").addEventListener("click",()=>{e=Math.max(.4,e-.1),c()}),a.querySelector("[data-zoom-reset]").addEventListener("click",()=>{e=1,c()}),setTimeout(m,0),window.addEventListener("resize",m)}function I(a){const e=M();document.body.appendChild(e);const i=e.querySelector("[data-preview-frame]"),s=a&&a.length?a:L.lastSnapshot.tableRows||[],u=z(s,{context:"preview"});i.appendChild(u),R(e),(function(){const o=e.querySelector("[data-toggle-menu]"),g=e.querySelector("[data-toggle-open]"),b=o?.querySelector("[data-toggle-header]"),y=o?.querySelector("[data-toggle-kpis]"),h=o?.querySelector("[data-toggle-revenue]"),v=o?.querySelector("[data-columns-wrap]"),p=o?.querySelector("[data-rows-wrap]"),q=(t,r=!0)=>{try{return localStorage.getItem(`reportsPdf.hide.${t}`)==="1"?!1:r}catch{return r}},k=(t={})=>{const r=b&&!b.checked,n=y&&!y.checked,l=h&&!h.checked;u.toggleAttribute("data-hide-header",r),u.toggleAttribute("data-hide-kpis",n),u.toggleAttribute("data-hide-revenue",l);try{localStorage.setItem("reportsPdf.hide.header",r?"1":"0"),localStorage.setItem("reportsPdf.hide.kpis",n?"1":"0"),localStorage.setItem("reportsPdf.hide.revenue",l?"1":"0")}catch{}if(t.rebuild){const d=Array.from(v?.querySelectorAll('input[type="checkbox"][data-col]')||[]).filter(w=>w.checked).map(w=>w.getAttribute("data-col")),P={showPaid:p?.querySelector("[data-filter-paid]")?.checked!==!1,showUnpaid:p?.querySelector("[data-filter-unpaid]")?.checked!==!1,showConfirmed:p?.querySelector("[data-filter-confirmed]")?.checked!==!1,showPending:p?.querySelector("[data-filter-pending]")?.checked!==!1,showCompleted:p?.querySelector("[data-filter-completed]")?.checked!==!1};try{d.forEach(f=>localStorage.setItem(`reportsPdf.column.${f}`,"1")),Array.from(v?.querySelectorAll('input[type="checkbox"][data-col]')||[]).map(f=>f.getAttribute("data-col")).forEach(f=>{d.includes(f)||localStorage.setItem(`reportsPdf.column.${f}`,"0")})}catch{}const A=z(s,{context:"preview",columns:d,rowFilters:P});i.innerHTML="",i.appendChild(A)}};o&&g&&(g.addEventListener("click",()=>{o.style.display=o.style.display==="none"||!o.style.display?"block":"none"}),document.addEventListener("click",t=>{e.contains(t.target)&&!o.contains(t.target)&&t.target!==g&&(o.style.display="none")})),b&&(b.checked=q("header",!0)),y&&(y.checked=q("kpis",!0)),h&&(h.checked=q("revenue",!0));const x=(t,r)=>{const n=p?.querySelector(t);if(!n)return;const l=localStorage.getItem(`reportsPdf.rows.${r}`);l!=null&&(n.checked=l!=="0"),n.addEventListener("change",()=>{try{localStorage.setItem(`reportsPdf.rows.${r}`,n.checked?"1":"0")}catch{}})};x("[data-filter-paid]","paid"),x("[data-filter-unpaid]","unpaid"),x("[data-filter-confirmed]","confirmed"),x("[data-filter-pending]","pending"),x("[data-filter-completed]","completed"),k(),(()=>{if(!v)return;const t=Object.keys(s&&s[0]||{});v.querySelectorAll("[data-col]").forEach(r=>r.parentElement?.remove()),t.forEach(r=>{const n=document.createElement("label");n.style.cssText="display:flex;gap:6px;align-items:center;padding:2px 0;";const l=document.createElement("input");l.type="checkbox",l.setAttribute("data-col",r);try{l.checked=(localStorage.getItem(`reportsPdf.column.${r}`)??"1")==="1"}catch{l.checked=!0}n.appendChild(l);const d=document.createElement("span");d.textContent=r,n.appendChild(d),v.appendChild(n),l.addEventListener("change",()=>k({rebuild:!0}))})})(),[b,y,h].forEach(t=>t&&t.addEventListener("change",()=>k({rebuild:!0}))),p?.querySelectorAll('input[type="checkbox"]').forEach(t=>t.addEventListener("change",()=>k({rebuild:!0})));const E=()=>{const t=document.documentElement.getAttribute("data-theme")?.includes("dark")||window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;o&&(o.style.setProperty("--dropdown-bg",t?"#0b1220":"#ffffff"),o.style.setProperty("--dropdown-fg",t?"#e5e7eb":"#111111"),o.style.setProperty("--dropdown-br",t?"rgba(148,163,184,.35)":"#e5e7eb"))};E(),document.addEventListener("theme:changed",E)})();const c=e.querySelector("[data-print-pdf]");c&&c.addEventListener("click",async()=>{await C(s,{action:"save",strict:!1})});try{const m=new window.bootstrap.Modal(e,{backdrop:!0,keyboard:!0});e.addEventListener("hidden.bs.modal",()=>e.remove(),{once:!0}),m.show()}catch{e.style.display="block",e.setAttribute("open","true")}}const N={openReportsPdfPreview:I};export{N as default,I as openReportsPdfPreview};
