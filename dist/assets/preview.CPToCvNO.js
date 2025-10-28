import{r as $,t as P}from"./calculations.qQuOMLyl.js";import{buildA4ReportPages as L,exportA4ReportPdf as R}from"./a4Unified.NTpYy5az.js";import"./reservationsService.Ci1ZAohu.js";import"./auth.D3LS69gm.js";import"./reports.DZTsnGOs.js";import"./dashboard.DZCmM9Dx.js";import"./controller.CsVADLwI.js";/* empty css              */import"./dashboardShell.BnUpQXaw.js";import"./customers.C1SKeFzI.js";import"./maintenanceService.C2aETs40.js";function _(){const n=document.createElement("div");return n.className="modal fade quote-preview-modal",n.setAttribute("tabindex","-1"),n.setAttribute("aria-hidden","true"),n.innerHTML=`
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${P("reservations.reports.preview.title","معاينة تقرير الحجوزات","Reservations Report Preview")}</h5>
          <button type="button" class="btn btn-ghost btn-sm" data-bs-dismiss="modal" aria-label="${P("actions.close","إغلاق","Close")}" title="${P("actions.close","إغلاق","Close")}"><span aria-hidden="true">✕</span></button>
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
                        <label style="display:flex; gap:6px; align-items:center; padding:4px 2px;">
                          <input type="checkbox" data-toggle-outstanding checked>
                          <span>إظهار أعلى المستحقات</span>
                        </label>
                        <label style="display:flex; gap:6px; align-items:center; padding:4px 2px;">
                          <input type="checkbox" data-toggle-crew checked>
                          <span>إظهار تقرير عمل الطاقم</span>
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
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-partial checked><span>مدفوعة جزئياً</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-unpaid checked><span>غير مدفوعة</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-confirmed checked><span>مؤكدة</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-pending checked><span>قيد التأكيد</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-completed checked><span>منتهية</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-cancelled checked><span>ملغاة</span></label>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm" data-print-pdf>${P("reservations.reports.actions.exportPdf","📄 تصدير PDF","Export PDF")}</button>
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
          <button type="button" class="btn btn-ghost btn-sm" data-bs-dismiss="modal">${P("actions.close","إغلاق","Close")}</button>
        </div>
      </div>
    </div>
  `,n}function H(n){let a=1;const h=n.querySelector("[data-preview-frame]"),p=n.querySelector("[data-zoom-value]"),u=n.querySelector(".quote-preview-frame-wrapper"),M=navigator.userAgent||"",m=/(iphone|ipad|ipod|android)/i.test(M)||window.matchMedia&&window.matchMedia("(max-width: 640px)").matches,e=()=>{h.style.transformOrigin="top center",h.style.transform=`scale(${a})`,p.textContent=`${Math.round(a*100)}%`},r=()=>{const y=u?.clientWidth||h.parentElement?.clientWidth||794;a=Math.min(1.2,Math.max(.4,(y-24)/794)),e()};n.querySelector("[data-zoom-in]").addEventListener("click",()=>{a=Math.min(2,a+.1),e()}),n.querySelector("[data-zoom-out]").addEventListener("click",()=>{a=Math.max(.4,a-.1),e()}),n.querySelector("[data-zoom-reset]").addEventListener("click",()=>{a=1,e()}),m?(a=.4,e()):(setTimeout(r,0),window.addEventListener("resize",r))}function W(n){const a=_();document.body.appendChild(a);const h=a.querySelector("[data-preview-frame]"),p=n&&n.length?n:$.lastSnapshot.tableRows||[],u=L(p,{context:"preview"});h.appendChild(u),H(a),(function(){const e=a.querySelector("[data-toggle-menu]"),r=a.querySelector("[data-toggle-open]"),g=e?.querySelector("[data-toggle-header]"),y=e?.querySelector("[data-toggle-kpis]"),x=e?.querySelector("[data-toggle-revenue]"),w=e?.querySelector("[data-toggle-outstanding]"),k=e?.querySelector("[data-toggle-crew]"),q=e?.querySelector("[data-columns-wrap]"),s=e?.querySelector("[data-rows-wrap]"),S=(o,t=!0)=>{try{return localStorage.getItem(`reportsPdf.hide.${o}`)==="1"?!1:t}catch{return t}},z=(o={})=>{const t=g&&!g.checked,l=y&&!y.checked,i=x&&!x.checked,d=w&&!w.checked,c=k&&!k.checked;u.toggleAttribute("data-hide-header",t),u.toggleAttribute("data-hide-kpis",l),u.toggleAttribute("data-hide-revenue",i),u.toggleAttribute("data-hide-outstanding",d),u.toggleAttribute("data-hide-crew",c);try{localStorage.setItem("reportsPdf.hide.header",t?"1":"0"),localStorage.setItem("reportsPdf.hide.kpis",l?"1":"0"),localStorage.setItem("reportsPdf.hide.revenue",i?"1":"0"),localStorage.setItem("reportsPdf.hide.outstanding",d?"1":"0"),localStorage.setItem("reportsPdf.hide.crew",c?"1":"0")}catch{}if(o.rebuild){const b=Array.from(q?.querySelectorAll('input[type="checkbox"][data-col]')||[]).filter(E=>E.checked).map(E=>E.getAttribute("data-col")),I={showPaid:s?.querySelector("[data-filter-paid]")?.checked!==!1,showPartial:s?.querySelector("[data-filter-partial]")?.checked!==!1,showUnpaid:s?.querySelector("[data-filter-unpaid]")?.checked!==!1,showConfirmed:s?.querySelector("[data-filter-confirmed]")?.checked!==!1,showPending:s?.querySelector("[data-filter-pending]")?.checked!==!1,showCompleted:s?.querySelector("[data-filter-completed]")?.checked!==!1,showCancelled:s?.querySelector("[data-filter-cancelled]")?.checked!==!1};try{b.forEach(v=>localStorage.setItem(`reportsPdf.column.${v}`,"1")),Array.from(q?.querySelectorAll('input[type="checkbox"][data-col]')||[]).map(v=>v.getAttribute("data-col")).forEach(v=>{b.includes(v)||localStorage.setItem(`reportsPdf.column.${v}`,"0")})}catch{}const A=L(p,{context:"preview",columns:b,rowFilters:I});h.innerHTML="",h.appendChild(A)}};if(e&&r){const o=()=>{const t=navigator.userAgent||"";if(!(/(iphone|ipad|ipod|android)/i.test(t)||window.matchMedia&&window.matchMedia("(max-width: 640px)").matches)){e.style.position="absolute",e.style.insetInlineEnd="0",e.style.left="auto",e.style.right="auto",e.style.top="36px",e.style.transform="none",e.style.zIndex="20";return}e.style.position="fixed",e.style.insetInlineEnd="auto",e.style.left="50%",e.style.right="auto",e.style.transform="translateX(-50%)",e.style.zIndex="9999";try{const i=r.getBoundingClientRect(),d=Math.max(12,Math.min(i.bottom+8,window.innerHeight-20)),c=e.style.display;e.style.display="block";const b=Math.min(e.scrollHeight,Math.min(window.innerHeight*.75,520)),A=d+b<=window.innerHeight-8?d:Math.max((window.innerHeight-b)/2,10);e.style.top=`${Math.round(A)}px`,c!=="block"&&(e.style.display=c)}catch{e.style.top="64px"}};r.addEventListener("click",()=>{const t=e.style.display==="none"||!e.style.display;e.style.display=t?"block":"none",t&&o()}),document.addEventListener("click",t=>{a.contains(t.target)&&!e.contains(t.target)&&t.target!==r&&(e.style.display="none")}),window.addEventListener("resize",()=>{e.style.display==="block"&&o()})}g&&(g.checked=S("header",!0)),y&&(y.checked=S("kpis",!0)),x&&(x.checked=S("revenue",!0)),w&&(w.checked=S("outstanding",!0)),k&&(k.checked=S("crew",!0));const f=(o,t)=>{const l=s?.querySelector(o);if(!l)return;const i=localStorage.getItem(`reportsPdf.rows.${t}`);i!=null&&(l.checked=i!=="0"),l.addEventListener("change",()=>{try{localStorage.setItem(`reportsPdf.rows.${t}`,l.checked?"1":"0")}catch{}})};f("[data-filter-paid]","paid"),f("[data-filter-unpaid]","unpaid"),f("[data-filter-partial]","partial"),f("[data-filter-confirmed]","confirmed"),f("[data-filter-pending]","pending"),f("[data-filter-completed]","completed"),f("[data-filter-cancelled]","cancelled"),z(),(()=>{if(!q)return;const o=Object.keys(p&&p[0]||{});q.querySelectorAll("[data-col]").forEach(t=>t.parentElement?.remove()),o.forEach(t=>{const l=document.createElement("label");l.style.cssText="display:flex;gap:6px;align-items:center;padding:2px 0;";const i=document.createElement("input");i.type="checkbox",i.setAttribute("data-col",t);try{const c=localStorage.getItem(`reportsPdf.column.${t}`);c==null?i.checked=/(الحجز|reservation|العميل|customer|التاريخ|date|الحالة|status|الدفع|payment|الإجمالي|total)/i.test(t):i.checked=c==="1"}catch{i.checked=!0}l.appendChild(i);const d=document.createElement("span");d.textContent=t,l.appendChild(d),q.appendChild(l),i.addEventListener("change",()=>z({rebuild:!0}))})})(),[g,y,x,w,k].forEach(o=>o&&o.addEventListener("change",()=>z({rebuild:!0}))),s?.querySelectorAll('input[type="checkbox"]').forEach(o=>o.addEventListener("change",()=>z({rebuild:!0})));const C=()=>{const o=document.documentElement.getAttribute("data-theme")?.includes("dark")||window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;e&&(e.style.setProperty("--dropdown-bg",o?"#0b1220":"#ffffff"),e.style.setProperty("--dropdown-fg",o?"#e5e7eb":"#111111"),e.style.setProperty("--dropdown-br",o?"rgba(148,163,184,.35)":"#e5e7eb"))};C(),document.addEventListener("theme:changed",C)})();const M=a.querySelector("[data-print-pdf]");M&&M.addEventListener("click",async()=>{const m=navigator.userAgent||"";if(/(iphone|ipad|ipod)/i.test(m)||/macintosh/i.test(m)&&"ontouchend"in document){const r=window.open("","_blank");try{r&&r.document&&(r.document.write('<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>تحضير الطباعة…</title></head><body style="font-family:-apple-system,system-ui,Segoe UI,Roboto,sans-serif;padding:16px;">جاري التحضير للطباعة…</body></html>'),r.document.close())}catch{}await R(p,{action:"print",strict:!0,popupWindow:r})}else await R(p,{action:"save",strict:!1})});try{const m=new window.bootstrap.Modal(a,{backdrop:!0,keyboard:!0});a.addEventListener("hidden.bs.modal",()=>a.remove(),{once:!0}),m.show()}catch{a.style.display="block",a.setAttribute("open","true")}}const G={openReportsPdfPreview:W};export{G as default,W as openReportsPdfPreview};
