import{r as C,t as S}from"./calculations.Da10Qu6G.js";import{buildA4ReportPages as z,exportA4ReportPdf as A}from"./a4Unified.DkY9kBWR.js";import"./reservationsService.B1hsYPEN.js";import"./auth.JZrLedpn.js";import"./reports.CAVwtSYf.js";import"./dashboard.DWruDQ9R.js";import"./controller.BzUaX7iX.js";/* empty css              */import"./dashboardShell.BOz0qBLn.js";import"./customers.D4PMCgmj.js";import"./maintenanceService.B262iOVL.js";function I(){const o=document.createElement("div");return o.className="modal fade quote-preview-modal",o.setAttribute("tabindex","-1"),o.setAttribute("aria-hidden","true"),o.innerHTML=`
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
                      <div data-toggle-menu style="position:absolute; top:36px; inset-inline-end:0; background:var(--dropdown-bg,#fff); color:var(--dropdown-fg,#111); border:1px solid var(--dropdown-br,#e5e7eb); border-radius:8px; box-shadow:0 8px 24px rgba(0,0,0,.12); padding:10px 12px; min-width:240px; width:min(92vw, 360px); max-height:min(70vh, 480px); overflow:auto; -webkit-overflow-scrolling:touch; overscroll-behavior:contain; touch-action:pan-y; display:none; z-index:20;">
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
                        <div data-columns-wrap style="display:flex; flex-direction:column; gap:4px;">
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
  `,o}function R(o){let e=1;const p=o.querySelector("[data-preview-frame]"),s=o.querySelector("[data-zoom-value]"),y=o.querySelector(".quote-preview-frame-wrapper"),u=()=>{p.style.transformOrigin="top center",p.style.transform=`scale(${e})`,s.textContent=`${Math.round(e*100)}%`},d=()=>{const l=y?.clientWidth||p.parentElement?.clientWidth||794;e=Math.min(1.2,Math.max(.4,(l-24)/794)),u()};o.querySelector("[data-zoom-in]").addEventListener("click",()=>{e=Math.min(2,e+.1),u()}),o.querySelector("[data-zoom-out]").addEventListener("click",()=>{e=Math.max(.4,e-.1),u()}),o.querySelector("[data-zoom-reset]").addEventListener("click",()=>{e=1,u()}),setTimeout(d,0),window.addEventListener("resize",d)}function M(o){const e=I();document.body.appendChild(e);const p=e.querySelector("[data-preview-frame]"),s=o&&o.length?o:C.lastSnapshot.tableRows||[],y=z(s,{context:"preview"});p.appendChild(y),R(e),(function(){const a=e.querySelector("[data-toggle-menu]"),l=e.querySelector("[data-toggle-open]"),m=a?.querySelector("[data-toggle-header]"),b=a?.querySelector("[data-toggle-kpis]"),g=a?.querySelector("[data-toggle-revenue]"),v=a?.querySelector("[data-columns-wrap]"),h=a?.querySelector("[data-rows-wrap]"),q=(t,r=!0)=>{try{return localStorage.getItem(`reportsPdf.hide.${t}`)==="1"?!1:r}catch{return r}},k=(t={})=>{const r=m&&!m.checked,n=b&&!b.checked,i=g&&!g.checked;y.toggleAttribute("data-hide-header",r),y.toggleAttribute("data-hide-kpis",n),y.toggleAttribute("data-hide-revenue",i);try{localStorage.setItem("reportsPdf.hide.header",r?"1":"0"),localStorage.setItem("reportsPdf.hide.kpis",n?"1":"0"),localStorage.setItem("reportsPdf.hide.revenue",i?"1":"0")}catch{}if(t.rebuild){const c=Array.from(v?.querySelectorAll('input[type="checkbox"][data-col]')||[]).filter(w=>w.checked).map(w=>w.getAttribute("data-col")),P={showPaid:h?.querySelector("[data-filter-paid]")?.checked!==!1,showUnpaid:h?.querySelector("[data-filter-unpaid]")?.checked!==!1,showConfirmed:h?.querySelector("[data-filter-confirmed]")?.checked!==!1,showPending:h?.querySelector("[data-filter-pending]")?.checked!==!1,showCompleted:h?.querySelector("[data-filter-completed]")?.checked!==!1};try{c.forEach(f=>localStorage.setItem(`reportsPdf.column.${f}`,"1")),Array.from(v?.querySelectorAll('input[type="checkbox"][data-col]')||[]).map(f=>f.getAttribute("data-col")).forEach(f=>{c.includes(f)||localStorage.setItem(`reportsPdf.column.${f}`,"0")})}catch{}const L=z(s,{context:"preview",columns:c,rowFilters:P});p.innerHTML="",p.appendChild(L)}};a&&l&&(l.addEventListener("click",()=>{a.style.display=a.style.display==="none"||!a.style.display?"block":"none"}),document.addEventListener("click",t=>{e.contains(t.target)&&!a.contains(t.target)&&t.target!==l&&(a.style.display="none")})),m&&(m.checked=q("header",!0)),b&&(b.checked=q("kpis",!0)),g&&(g.checked=q("revenue",!0));const x=(t,r)=>{const n=h?.querySelector(t);if(!n)return;const i=localStorage.getItem(`reportsPdf.rows.${r}`);i!=null&&(n.checked=i!=="0"),n.addEventListener("change",()=>{try{localStorage.setItem(`reportsPdf.rows.${r}`,n.checked?"1":"0")}catch{}})};x("[data-filter-paid]","paid"),x("[data-filter-unpaid]","unpaid"),x("[data-filter-confirmed]","confirmed"),x("[data-filter-pending]","pending"),x("[data-filter-completed]","completed"),k(),(()=>{if(!v)return;const t=Object.keys(s&&s[0]||{});v.querySelectorAll("[data-col]").forEach(r=>r.parentElement?.remove()),t.forEach(r=>{const n=document.createElement("label");n.style.cssText="display:flex;gap:6px;align-items:center;padding:2px 0;";const i=document.createElement("input");i.type="checkbox",i.setAttribute("data-col",r);try{i.checked=(localStorage.getItem(`reportsPdf.column.${r}`)??"1")==="1"}catch{i.checked=!0}n.appendChild(i);const c=document.createElement("span");c.textContent=r,n.appendChild(c),v.appendChild(n),i.addEventListener("change",()=>k({rebuild:!0}))})})(),[m,b,g].forEach(t=>t&&t.addEventListener("change",()=>k({rebuild:!0}))),h?.querySelectorAll('input[type="checkbox"]').forEach(t=>t.addEventListener("change",()=>k({rebuild:!0})));const E=()=>{const t=document.documentElement.getAttribute("data-theme")?.includes("dark")||window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;a&&(a.style.setProperty("--dropdown-bg",t?"#0b1220":"#ffffff"),a.style.setProperty("--dropdown-fg",t?"#e5e7eb":"#111111"),a.style.setProperty("--dropdown-br",t?"rgba(148,163,184,.35)":"#e5e7eb"))};E(),document.addEventListener("theme:changed",E)})();const u=e.querySelector("[data-print-pdf]");u&&u.addEventListener("click",async()=>{const d=navigator.userAgent||"";if(/(iphone|ipad|ipod)/i.test(d)||/macintosh/i.test(d)&&"ontouchend"in document){const l=window.open("","_blank");try{l&&l.document&&(l.document.write('<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>تحضير الطباعة…</title></head><body style="font-family:-apple-system,system-ui,Segoe UI,Roboto,sans-serif;padding:16px;">جاري التحضير للطباعة…</body></html>'),l.document.close())}catch{}await A(s,{action:"print",strict:!0,popupWindow:l})}else await A(s,{action:"save",strict:!1})});try{const d=new window.bootstrap.Modal(e,{backdrop:!0,keyboard:!0});e.addEventListener("hidden.bs.modal",()=>e.remove(),{once:!0}),d.show()}catch{e.style.display="block",e.setAttribute("open","true")}}const U={openReportsPdfPreview:M};export{U as default,M as openReportsPdfPreview};
