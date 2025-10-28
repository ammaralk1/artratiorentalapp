import{r as C,t as k}from"./calculations.DoCr-nKe.js";import{buildA4ReportPages as z,exportA4ReportPdf as A}from"./a4Unified.Bpd8VRo5.js";import"./reservationsService.CvB8O3yO.js";import"./auth.Cojl8C1z.js";import"./reports.IBnPCwHn.js";import"./dashboard.B7GhTIDQ.js";import"./controller.DcQpxKgZ.js";/* empty css              */import"./dashboardShell.O60astIp.js";import"./customers.CsW77HM0.js";import"./maintenanceService.BAkRLVo-.js";function I(){const n=document.createElement("div");return n.className="modal fade quote-preview-modal",n.setAttribute("tabindex","-1"),n.setAttribute("aria-hidden","true"),n.innerHTML=`
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
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-partial checked><span>مدفوعة جزئياً</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-unpaid checked><span>غير مدفوعة</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-confirmed checked><span>مؤكدة</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-pending checked><span>قيد التأكيد</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-completed checked><span>منتهية</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-cancelled checked><span>ملغاة</span></label>
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
  `,n}function L(n){let a=1;const h=n.querySelector("[data-preview-frame]"),c=n.querySelector("[data-zoom-value]"),b=n.querySelector(".quote-preview-frame-wrapper"),q=navigator.userAgent||"",p=/(iphone|ipad|ipod|android)/i.test(q)||window.matchMedia&&window.matchMedia("(max-width: 640px)").matches,e=()=>{h.style.transformOrigin="top center",h.style.transform=`scale(${a})`,c.textContent=`${Math.round(a*100)}%`},r=()=>{const f=b?.clientWidth||h.parentElement?.clientWidth||794;a=Math.min(1.2,Math.max(.4,(f-24)/794)),e()};n.querySelector("[data-zoom-in]").addEventListener("click",()=>{a=Math.min(2,a+.1),e()}),n.querySelector("[data-zoom-out]").addEventListener("click",()=>{a=Math.max(.4,a-.1),e()}),n.querySelector("[data-zoom-reset]").addEventListener("click",()=>{a=1,e()}),p?(a=.4,e()):(setTimeout(r,0),window.addEventListener("resize",r))}function R(n){const a=I();document.body.appendChild(a);const h=a.querySelector("[data-preview-frame]"),c=n&&n.length?n:C.lastSnapshot.tableRows||[],b=z(c,{context:"preview"});h.appendChild(b),L(a),(function(){const e=a.querySelector("[data-toggle-menu]"),r=a.querySelector("[data-toggle-open]"),y=e?.querySelector("[data-toggle-header]"),f=e?.querySelector("[data-toggle-kpis]"),v=e?.querySelector("[data-toggle-revenue]"),w=e?.querySelector("[data-columns-wrap]"),d=e?.querySelector("[data-rows-wrap]"),P=(o,t=!0)=>{try{return localStorage.getItem(`reportsPdf.hide.${o}`)==="1"?!1:t}catch{return t}},S=(o={})=>{const t=y&&!y.checked,l=f&&!f.checked,i=v&&!v.checked;b.toggleAttribute("data-hide-header",t),b.toggleAttribute("data-hide-kpis",l),b.toggleAttribute("data-hide-revenue",i);try{localStorage.setItem("reportsPdf.hide.header",t?"1":"0"),localStorage.setItem("reportsPdf.hide.kpis",l?"1":"0"),localStorage.setItem("reportsPdf.hide.revenue",i?"1":"0")}catch{}if(o.rebuild){const s=Array.from(w?.querySelectorAll('input[type="checkbox"][data-col]')||[]).filter(x=>x.checked).map(x=>x.getAttribute("data-col")),u={showPaid:d?.querySelector("[data-filter-paid]")?.checked!==!1,showPartial:d?.querySelector("[data-filter-partial]")?.checked!==!1,showUnpaid:d?.querySelector("[data-filter-unpaid]")?.checked!==!1,showConfirmed:d?.querySelector("[data-filter-confirmed]")?.checked!==!1,showPending:d?.querySelector("[data-filter-pending]")?.checked!==!1,showCompleted:d?.querySelector("[data-filter-completed]")?.checked!==!1,showCancelled:d?.querySelector("[data-filter-cancelled]")?.checked!==!1};try{s.forEach(m=>localStorage.setItem(`reportsPdf.column.${m}`,"1")),Array.from(w?.querySelectorAll('input[type="checkbox"][data-col]')||[]).map(m=>m.getAttribute("data-col")).forEach(m=>{s.includes(m)||localStorage.setItem(`reportsPdf.column.${m}`,"0")})}catch{}const E=z(c,{context:"preview",columns:s,rowFilters:u});h.innerHTML="",h.appendChild(E)}};if(e&&r){const o=()=>{const t=navigator.userAgent||"";if(!(/(iphone|ipad|ipod|android)/i.test(t)||window.matchMedia&&window.matchMedia("(max-width: 640px)").matches)){e.style.position="absolute",e.style.insetInlineEnd="0",e.style.left="auto",e.style.right="auto",e.style.top="36px",e.style.transform="none",e.style.zIndex="20";return}e.style.position="fixed",e.style.insetInlineEnd="auto",e.style.left="50%",e.style.right="auto",e.style.transform="translateX(-50%)",e.style.zIndex="9999";try{const i=r.getBoundingClientRect(),s=Math.max(12,Math.min(i.bottom+8,window.innerHeight-20)),u=e.style.display;e.style.display="block";const E=Math.min(e.scrollHeight,Math.min(window.innerHeight*.75,520)),m=s+E<=window.innerHeight-8?s:Math.max((window.innerHeight-E)/2,10);e.style.top=`${Math.round(m)}px`,u!=="block"&&(e.style.display=u)}catch{e.style.top="64px"}};r.addEventListener("click",()=>{const t=e.style.display==="none"||!e.style.display;e.style.display=t?"block":"none",t&&o()}),document.addEventListener("click",t=>{a.contains(t.target)&&!e.contains(t.target)&&t.target!==r&&(e.style.display="none")}),window.addEventListener("resize",()=>{e.style.display==="block"&&o()})}y&&(y.checked=P("header",!0)),f&&(f.checked=P("kpis",!0)),v&&(v.checked=P("revenue",!0));const g=(o,t)=>{const l=d?.querySelector(o);if(!l)return;const i=localStorage.getItem(`reportsPdf.rows.${t}`);i!=null&&(l.checked=i!=="0"),l.addEventListener("change",()=>{try{localStorage.setItem(`reportsPdf.rows.${t}`,l.checked?"1":"0")}catch{}})};g("[data-filter-paid]","paid"),g("[data-filter-unpaid]","unpaid"),g("[data-filter-partial]","partial"),g("[data-filter-confirmed]","confirmed"),g("[data-filter-pending]","pending"),g("[data-filter-completed]","completed"),g("[data-filter-cancelled]","cancelled"),S(),(()=>{if(!w)return;const o=Object.keys(c&&c[0]||{});w.querySelectorAll("[data-col]").forEach(t=>t.parentElement?.remove()),o.forEach(t=>{const l=document.createElement("label");l.style.cssText="display:flex;gap:6px;align-items:center;padding:2px 0;";const i=document.createElement("input");i.type="checkbox",i.setAttribute("data-col",t);try{const u=localStorage.getItem(`reportsPdf.column.${t}`);u==null?i.checked=/(الحجز|reservation|العميل|customer|التاريخ|date|الحالة|status|الدفع|payment|الإجمالي|total)/i.test(t):i.checked=u==="1"}catch{i.checked=!0}l.appendChild(i);const s=document.createElement("span");s.textContent=t,l.appendChild(s),w.appendChild(l),i.addEventListener("change",()=>S({rebuild:!0}))})})(),[y,f,v].forEach(o=>o&&o.addEventListener("change",()=>S({rebuild:!0}))),d?.querySelectorAll('input[type="checkbox"]').forEach(o=>o.addEventListener("change",()=>S({rebuild:!0})));const M=()=>{const o=document.documentElement.getAttribute("data-theme")?.includes("dark")||window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;e&&(e.style.setProperty("--dropdown-bg",o?"#0b1220":"#ffffff"),e.style.setProperty("--dropdown-fg",o?"#e5e7eb":"#111111"),e.style.setProperty("--dropdown-br",o?"rgba(148,163,184,.35)":"#e5e7eb"))};M(),document.addEventListener("theme:changed",M)})();const q=a.querySelector("[data-print-pdf]");q&&q.addEventListener("click",async()=>{const p=navigator.userAgent||"";if(/(iphone|ipad|ipod)/i.test(p)||/macintosh/i.test(p)&&"ontouchend"in document){const r=window.open("","_blank");try{r&&r.document&&(r.document.write('<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>تحضير الطباعة…</title></head><body style="font-family:-apple-system,system-ui,Segoe UI,Roboto,sans-serif;padding:16px;">جاري التحضير للطباعة…</body></html>'),r.document.close())}catch{}await A(c,{action:"print",strict:!0,popupWindow:r})}else await A(c,{action:"save",strict:!1})});try{const p=new window.bootstrap.Modal(a,{backdrop:!0,keyboard:!0});a.addEventListener("hidden.bs.modal",()=>a.remove(),{once:!0}),p.show()}catch{a.style.display="block",a.setAttribute("open","true")}}const U={openReportsPdfPreview:R};export{U as default,R as openReportsPdfPreview};
