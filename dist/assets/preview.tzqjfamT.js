import{r as I,t as k}from"./calculations.Da10Qu6G.js";import{buildA4ReportPages as z,exportA4ReportPdf as A}from"./a4Unified.DbZJMnWJ.js";import"./reservationsService.B1hsYPEN.js";import"./auth.JZrLedpn.js";import"./reports.CGJHHufJ.js";import"./dashboard.I5Mcw0GV.js";import"./controller.BzUaX7iX.js";/* empty css              */import"./dashboardShell.BOz0qBLn.js";import"./customers.D4PMCgmj.js";import"./maintenanceService.B262iOVL.js";function L(){const n=document.createElement("div");return n.className="modal fade quote-preview-modal",n.setAttribute("tabindex","-1"),n.setAttribute("aria-hidden","true"),n.innerHTML=`
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${k("reservations.reports.preview.title","معاينة تقرير الحجوزات","Reservations Report Preview")}</h5>
          <button type="button" class="btn btn-ghost btn-sm" data-bs-dismiss="modal" aria-label="${k("actions.close","إغلاق","Close")}" title="${k("actions.close","إغلاق","Close")}"><span aria-hidden="true">✕</span></button>
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
                    <button type="button" class="btn btn-primary btn-sm" data-print-pdf>${k("reservations.reports.actions.exportPdf","📄 تصدير PDF","Export PDF")}</button>
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
          <button type="button" class="btn btn-ghost btn-sm" data-bs-dismiss="modal">${k("actions.close","إغلاق","Close")}</button>
        </div>
      </div>
    </div>
  `,n}function C(n){let a=1;const u=n.querySelector("[data-preview-frame]"),d=n.querySelector("[data-zoom-value]"),g=n.querySelector(".quote-preview-frame-wrapper"),q=navigator.userAgent||"",c=/(iphone|ipad|ipod|android)/i.test(q)||window.matchMedia&&window.matchMedia("(max-width: 640px)").matches,e=()=>{u.style.transformOrigin="top center",u.style.transform=`scale(${a})`,d.textContent=`${Math.round(a*100)}%`},s=()=>{const h=g?.clientWidth||u.parentElement?.clientWidth||794;a=Math.min(1.2,Math.max(.4,(h-24)/794)),e()};n.querySelector("[data-zoom-in]").addEventListener("click",()=>{a=Math.min(2,a+.1),e()}),n.querySelector("[data-zoom-out]").addEventListener("click",()=>{a=Math.max(.4,a-.1),e()}),n.querySelector("[data-zoom-reset]").addEventListener("click",()=>{a=1,e()}),c?(a=.4,e()):(setTimeout(s,0),window.addEventListener("resize",s))}function R(n){const a=L();document.body.appendChild(a);const u=a.querySelector("[data-preview-frame]"),d=n&&n.length?n:I.lastSnapshot.tableRows||[],g=z(d,{context:"preview"});u.appendChild(g),C(a),(function(){const e=a.querySelector("[data-toggle-menu]"),s=a.querySelector("[data-toggle-open]"),m=e?.querySelector("[data-toggle-header]"),h=e?.querySelector("[data-toggle-kpis]"),b=e?.querySelector("[data-toggle-revenue]"),v=e?.querySelector("[data-columns-wrap]"),y=e?.querySelector("[data-rows-wrap]"),M=(o,t=!0)=>{try{return localStorage.getItem(`reportsPdf.hide.${o}`)==="1"?!1:t}catch{return t}},S=(o={})=>{const t=m&&!m.checked,i=h&&!h.checked,r=b&&!b.checked;g.toggleAttribute("data-hide-header",t),g.toggleAttribute("data-hide-kpis",i),g.toggleAttribute("data-hide-revenue",r);try{localStorage.setItem("reportsPdf.hide.header",t?"1":"0"),localStorage.setItem("reportsPdf.hide.kpis",i?"1":"0"),localStorage.setItem("reportsPdf.hide.revenue",r?"1":"0")}catch{}if(o.rebuild){const l=Array.from(v?.querySelectorAll('input[type="checkbox"][data-col]')||[]).filter(f=>f.checked).map(f=>f.getAttribute("data-col")),w={showPaid:y?.querySelector("[data-filter-paid]")?.checked!==!1,showUnpaid:y?.querySelector("[data-filter-unpaid]")?.checked!==!1,showConfirmed:y?.querySelector("[data-filter-confirmed]")?.checked!==!1,showPending:y?.querySelector("[data-filter-pending]")?.checked!==!1,showCompleted:y?.querySelector("[data-filter-completed]")?.checked!==!1};try{l.forEach(p=>localStorage.setItem(`reportsPdf.column.${p}`,"1")),Array.from(v?.querySelectorAll('input[type="checkbox"][data-col]')||[]).map(p=>p.getAttribute("data-col")).forEach(p=>{l.includes(p)||localStorage.setItem(`reportsPdf.column.${p}`,"0")})}catch{}const E=z(d,{context:"preview",columns:l,rowFilters:w});u.innerHTML="",u.appendChild(E)}};if(e&&s){const o=()=>{const t=navigator.userAgent||"";if(!(/(iphone|ipad|ipod|android)/i.test(t)||window.matchMedia&&window.matchMedia("(max-width: 640px)").matches)){e.style.position="absolute",e.style.insetInlineEnd="0",e.style.left="auto",e.style.right="auto",e.style.top="36px",e.style.transform="none",e.style.zIndex="20";return}e.style.position="fixed",e.style.insetInlineEnd="auto",e.style.left="50%",e.style.right="auto",e.style.transform="translateX(-50%)",e.style.zIndex="9999";try{const r=s.getBoundingClientRect(),l=Math.max(12,Math.min(r.bottom+8,window.innerHeight-20)),w=e.style.display;e.style.display="block";const E=Math.min(e.scrollHeight,Math.min(window.innerHeight*.75,520)),p=l+E<=window.innerHeight-8?l:Math.max((window.innerHeight-E)/2,10);e.style.top=`${Math.round(p)}px`,w!=="block"&&(e.style.display=w)}catch{e.style.top="64px"}};s.addEventListener("click",()=>{const t=e.style.display==="none"||!e.style.display;e.style.display=t?"block":"none",t&&o()}),document.addEventListener("click",t=>{a.contains(t.target)&&!e.contains(t.target)&&t.target!==s&&(e.style.display="none")}),window.addEventListener("resize",()=>{e.style.display==="block"&&o()})}m&&(m.checked=M("header",!0)),h&&(h.checked=M("kpis",!0)),b&&(b.checked=M("revenue",!0));const x=(o,t)=>{const i=y?.querySelector(o);if(!i)return;const r=localStorage.getItem(`reportsPdf.rows.${t}`);r!=null&&(i.checked=r!=="0"),i.addEventListener("change",()=>{try{localStorage.setItem(`reportsPdf.rows.${t}`,i.checked?"1":"0")}catch{}})};x("[data-filter-paid]","paid"),x("[data-filter-unpaid]","unpaid"),x("[data-filter-confirmed]","confirmed"),x("[data-filter-pending]","pending"),x("[data-filter-completed]","completed"),S(),(()=>{if(!v)return;const o=Object.keys(d&&d[0]||{});v.querySelectorAll("[data-col]").forEach(t=>t.parentElement?.remove()),o.forEach(t=>{const i=document.createElement("label");i.style.cssText="display:flex;gap:6px;align-items:center;padding:2px 0;";const r=document.createElement("input");r.type="checkbox",r.setAttribute("data-col",t);try{r.checked=(localStorage.getItem(`reportsPdf.column.${t}`)??"1")==="1"}catch{r.checked=!0}i.appendChild(r);const l=document.createElement("span");l.textContent=t,i.appendChild(l),v.appendChild(i),r.addEventListener("change",()=>S({rebuild:!0}))})})(),[m,h,b].forEach(o=>o&&o.addEventListener("change",()=>S({rebuild:!0}))),y?.querySelectorAll('input[type="checkbox"]').forEach(o=>o.addEventListener("change",()=>S({rebuild:!0})));const P=()=>{const o=document.documentElement.getAttribute("data-theme")?.includes("dark")||window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;e&&(e.style.setProperty("--dropdown-bg",o?"#0b1220":"#ffffff"),e.style.setProperty("--dropdown-fg",o?"#e5e7eb":"#111111"),e.style.setProperty("--dropdown-br",o?"rgba(148,163,184,.35)":"#e5e7eb"))};P(),document.addEventListener("theme:changed",P)})();const q=a.querySelector("[data-print-pdf]");q&&q.addEventListener("click",async()=>{const c=navigator.userAgent||"";if(/(iphone|ipad|ipod)/i.test(c)||/macintosh/i.test(c)&&"ontouchend"in document){const s=window.open("","_blank");try{s&&s.document&&(s.document.write('<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>تحضير الطباعة…</title></head><body style="font-family:-apple-system,system-ui,Segoe UI,Roboto,sans-serif;padding:16px;">جاري التحضير للطباعة…</body></html>'),s.document.close())}catch{}await A(d,{action:"print",strict:!0,popupWindow:s})}else await A(d,{action:"save",strict:!1})});try{const c=new window.bootstrap.Modal(a,{backdrop:!0,keyboard:!0});a.addEventListener("hidden.bs.modal",()=>a.remove(),{once:!0}),c.show()}catch{a.style.display="block",a.setAttribute("open","true")}}const U={openReportsPdfPreview:R};export{U as default,R as openReportsPdfPreview};
