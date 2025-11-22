import{r as T,t as L}from"./calculations.DLKEbUWg.js";import{buildA4ReportPages as $,exportA4ReportPdf as _}from"./a4Unified.Begv-TpT.js";import"./reservationsService.xTOvDkMk.js";import"./auth.CfSWwk88.js";import"./state.r7LAfWRX.js";function H(){const l=document.createElement("div");return l.className="modal fade quote-preview-modal",l.setAttribute("tabindex","-1"),l.setAttribute("aria-hidden","true"),l.innerHTML=`
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${L("reservations.reports.preview.title","معاينة تقرير الحجوزات","Reservations Report Preview")}</h5>
          <button type="button" class="btn btn-ghost btn-sm" data-bs-dismiss="modal" aria-label="${L("actions.close","إغلاق","Close")}" title="${L("actions.close","إغلاق","Close")}"><span aria-hidden="true">✕</span></button>
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
                          <input type="checkbox" data-toggle-forecast checked>
                          <span>إظهار توقعات الدفعات</span>
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
                      <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-completed checked><span>مغلقة</span></label>
                          <label style="display:flex; gap:6px; align-items:center; padding:2px 0;"><input type="checkbox" data-filter-cancelled checked><span>ملغاة</span></label>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm" data-print-pdf>${L("reservations.reports.actions.exportPdf","📄 تصدير PDF","Export PDF")}</button>
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
          <button type="button" class="btn btn-ghost btn-sm" data-bs-dismiss="modal">${L("actions.close","إغلاق","Close")}</button>
        </div>
      </div>
    </div>
  `,l}function W(l){let r=1;const b=l.querySelector("[data-preview-frame]"),m=l.querySelector("[data-zoom-value]"),u=l.querySelector(".quote-preview-frame-wrapper"),C=navigator.userAgent||"",f=/(iphone|ipad|ipod|android)/i.test(C)||window.matchMedia&&window.matchMedia("(max-width: 640px)").matches,e=()=>{b.style.transformOrigin="top center",b.style.transform=`scale(${r})`,m.textContent=`${Math.round(r*100)}%`},d=()=>{const v=u?.clientWidth||b.parentElement?.clientWidth||794;r=Math.min(1.2,Math.max(.4,(v-24)/794)),e()};l.querySelector("[data-zoom-in]").addEventListener("click",()=>{r=Math.min(2,r+.1),e()}),l.querySelector("[data-zoom-out]").addEventListener("click",()=>{r=Math.max(.4,r-.1),e()}),l.querySelector("[data-zoom-reset]").addEventListener("click",()=>{r=1,e()}),f?(r=.4,e()):(setTimeout(d,0),window.addEventListener("resize",d))}function D(l){const r=H();document.body.appendChild(r);const b=r.querySelector("[data-preview-frame]"),m=l&&l.length?l:T.lastSnapshot.tableRows||[],u=$(m,{context:"preview"});b.appendChild(u),W(r),(function(){const e=r.querySelector("[data-toggle-menu]"),d=r.querySelector("[data-toggle-open]"),x=e?.querySelector("[data-toggle-header]"),v=e?.querySelector("[data-toggle-kpis]"),S=e?.querySelector("[data-toggle-revenue]"),E=e?.querySelector("[data-toggle-outstanding]"),A=e?.querySelector("[data-toggle-crew]"),P=e?.querySelector("[data-toggle-forecast]"),g=e?.querySelector("[data-columns-wrap]"),h=e?.querySelector("[data-rows-wrap]"),q=(i,n=!0)=>{try{return localStorage.getItem(`reportsPdf.hide.${i}`)==="1"?!1:n}catch{return n}},M=(i={})=>{const n=x&&!x.checked,t=v&&!v.checked,o=S&&!S.checked,s=E&&!E.checked,c=A&&!A.checked,a=P&&!P.checked;u.toggleAttribute("data-hide-header",n),u.toggleAttribute("data-hide-kpis",t),u.toggleAttribute("data-hide-revenue",o),u.toggleAttribute("data-hide-outstanding",s),u.toggleAttribute("data-hide-crew",c),u.toggleAttribute("data-hide-forecast",a);try{localStorage.setItem("reportsPdf.hide.header",n?"1":"0"),localStorage.setItem("reportsPdf.hide.kpis",t?"1":"0"),localStorage.setItem("reportsPdf.hide.revenue",o?"1":"0"),localStorage.setItem("reportsPdf.hide.outstanding",s?"1":"0"),localStorage.setItem("reportsPdf.hide.crew",c?"1":"0"),localStorage.setItem("reportsPdf.hide.forecast",a?"1":"0")}catch{}if(i.rebuild){const p=Array.from(g?.querySelectorAll('input[type="checkbox"][data-col]')||[]).filter(I=>I.checked).map(I=>I.getAttribute("data-col")),k={showPaid:h?.querySelector("[data-filter-paid]")?.checked!==!1,showPartial:h?.querySelector("[data-filter-partial]")?.checked!==!1,showUnpaid:h?.querySelector("[data-filter-unpaid]")?.checked!==!1,showConfirmed:h?.querySelector("[data-filter-confirmed]")?.checked!==!1,showPending:h?.querySelector("[data-filter-pending]")?.checked!==!1,showCompleted:h?.querySelector("[data-filter-completed]")?.checked!==!1,showCancelled:h?.querySelector("[data-filter-cancelled]")?.checked!==!1};try{p.forEach(y=>localStorage.setItem(`reportsPdf.column.${y}`,"1")),Array.from(g?.querySelectorAll('input[type="checkbox"][data-col]')||[]).map(y=>y.getAttribute("data-col")).forEach(y=>{p.includes(y)||localStorage.setItem(`reportsPdf.column.${y}`,"0")});const O=Array.from(g?.querySelectorAll("[data-drag-col]")||[]).map(y=>y.getAttribute("data-drag-col"));localStorage.setItem("reportsPdf.columns.order",JSON.stringify(O))}catch{}const z=$(m,{context:"preview",columns:p,rowFilters:k});b.innerHTML="",b.appendChild(z)}};if(e&&d){const i=()=>{const n=navigator.userAgent||"";if(!(/(iphone|ipad|ipod|android)/i.test(n)||window.matchMedia&&window.matchMedia("(max-width: 640px)").matches)){e.style.position="absolute",e.style.insetInlineEnd="0",e.style.left="auto",e.style.right="auto",e.style.top="36px",e.style.transform="none",e.style.zIndex="20";return}e.style.position="fixed",e.style.insetInlineEnd="auto",e.style.left="50%",e.style.right="auto",e.style.transform="translateX(-50%)",e.style.zIndex="9999";try{const o=d.getBoundingClientRect(),s=Math.max(12,Math.min(o.bottom+8,window.innerHeight-20)),c=e.style.display;e.style.display="block";const a=Math.min(e.scrollHeight,Math.min(window.innerHeight*.75,520)),k=s+a<=window.innerHeight-8?s:Math.max((window.innerHeight-a)/2,10);e.style.top=`${Math.round(k)}px`,c!=="block"&&(e.style.display=c)}catch{e.style.top="64px"}};d.addEventListener("click",()=>{const n=e.style.display==="none"||!e.style.display;e.style.display=n?"block":"none",n&&i()}),document.addEventListener("click",n=>{r.contains(n.target)&&!e.contains(n.target)&&n.target!==d&&(e.style.display="none")}),window.addEventListener("resize",()=>{e.style.display==="block"&&i()})}x&&(x.checked=q("header",!0)),v&&(v.checked=q("kpis",!0)),S&&(S.checked=q("revenue",!0)),E&&(E.checked=q("outstanding",!0)),A&&(A.checked=q("crew",!0)),P&&(P.checked=q("forecast",!0));const w=(i,n)=>{const t=h?.querySelector(i);if(!t)return;const o=localStorage.getItem(`reportsPdf.rows.${n}`);o!=null&&(t.checked=o!=="0"),t.addEventListener("change",()=>{try{localStorage.setItem(`reportsPdf.rows.${n}`,t.checked?"1":"0")}catch{}})};w("[data-filter-paid]","paid"),w("[data-filter-unpaid]","unpaid"),w("[data-filter-partial]","partial"),w("[data-filter-confirmed]","confirmed"),w("[data-filter-pending]","pending"),w("[data-filter-completed]","completed"),w("[data-filter-cancelled]","cancelled"),M(),(()=>{if(!g)return;let n=Object.keys(m&&m[0]||{}).slice();try{const t=JSON.parse(localStorage.getItem("reportsPdf.columns.order")||"[]");Array.isArray(t)&&t.length&&n.sort((o,s)=>{const c=t.indexOf(o),a=t.indexOf(s);return c===-1&&a===-1?0:c===-1?1:a===-1?-1:c-a})}catch{}g.querySelectorAll("[data-col]").forEach(t=>t.parentElement?.remove()),n.forEach(t=>{const o=document.createElement("label");o.style.cssText="display:flex;gap:6px;align-items:center;padding:2px 0;",o.setAttribute("data-drag-col",t),o.draggable=!0;const s=document.createElement("input");s.type="checkbox",s.setAttribute("data-col",t);try{const a=localStorage.getItem(`reportsPdf.column.${t}`);a==null?s.checked=/(الحجز|reservation|العميل|customer|التاريخ|date|الحالة|status|الدفع|payment|الإجمالي|total)/i.test(t):s.checked=a==="1"}catch{s.checked=!0}o.appendChild(s);const c=document.createElement("span");c.textContent=t,o.appendChild(c),g.appendChild(o),s.addEventListener("change",()=>M({rebuild:!0})),o.addEventListener("dragstart",a=>{a.dataTransfer?.setData("text/plain",t),o.classList.add("dragging")}),o.addEventListener("dragend",()=>{o.classList.remove("dragging");try{const a=Array.from(g.querySelectorAll("[data-drag-col]")).map(p=>p.getAttribute("data-drag-col"));localStorage.setItem("reportsPdf.columns.order",JSON.stringify(a))}catch{}M({rebuild:!0})}),o.addEventListener("dragover",a=>{a.preventDefault()}),o.addEventListener("drop",a=>{a.preventDefault();const p=a.dataTransfer?.getData("text/plain"),k=a.currentTarget;if(!p||!k)return;const z=g.querySelector(`[data-drag-col="${CSS.escape(p)}"]`);!z||z===k||g.insertBefore(z,k)})})})(),[x,v,S,E,A,P].forEach(i=>i&&i.addEventListener("change",()=>M({rebuild:!0}))),h?.querySelectorAll('input[type="checkbox"]').forEach(i=>i.addEventListener("change",()=>M({rebuild:!0})));const R=()=>{const i=document.documentElement.getAttribute("data-theme")?.includes("dark")||window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;e&&(e.style.setProperty("--dropdown-bg",i?"#0b1220":"#ffffff"),e.style.setProperty("--dropdown-fg",i?"#e5e7eb":"#111111"),e.style.setProperty("--dropdown-br",i?"rgba(148,163,184,.35)":"#e5e7eb"))};R(),document.addEventListener("theme:changed",R)})();const C=r.querySelector("[data-print-pdf]");C&&C.addEventListener("click",async()=>{const f=navigator.userAgent||"";if(/(iphone|ipad|ipod)/i.test(f)||/macintosh/i.test(f)&&"ontouchend"in document){const d=window.open("","_blank");try{d&&d.document&&(d.document.write('<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>تحضير الطباعة…</title></head><body style="font-family:-apple-system,system-ui,Segoe UI,Roboto,sans-serif;padding:16px;">جاري التحضير للطباعة…</body></html>'),d.document.close())}catch{}await _(m,{action:"print",strict:!0,popupWindow:d})}else await _(m,{action:"save",strict:!1})});try{const f=new window.bootstrap.Modal(r,{backdrop:!0,keyboard:!0});r.addEventListener("hidden.bs.modal",()=>r.remove(),{once:!0}),f.show()}catch{r.style.display="block",r.setAttribute("open","true")}}const Z={openReportsPdfPreview:D};export{Z as default,D as openReportsPdfPreview};
