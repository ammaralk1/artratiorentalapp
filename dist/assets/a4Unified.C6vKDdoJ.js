import{t as f,r as P,e as L,d as I,b as x}from"./calculations.Cuzjzmo7.js";import{e as M,l as S}from"./reports.b1ZWEjru.js";import"./reservationsService.DHFcI6wO.js";import"./auth.DEm-O4iH.js";import"./dashboard.BFJMY-6u.js";import"./controller.CKj9uBP3.js";/* empty css              */import"./dashboardShell.BJ8UOETr.js";import"./customers.DDv-F3VN.js";import"./maintenanceService.-sdg2Aq9.js";const z=`@page { size: A4; margin: 0; }
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700;800&display=swap');

/* جذر وثيقة A4 للمعاينة/التصدير */
#reports-a4-root {
  color-scheme: light;
  direction: rtl;
  text-align: right;
  font-family: 'Tajawal', 'Arial', 'Tahoma', sans-serif;
  color: #000 !important;
}

/* إزالة تأثيرات الثيم والظلال كلياً داخل الجذر */
#reports-a4-root, #reports-a4-root * {
  color: #000 !important; background: #fff !important; box-shadow: none !important; filter: none !important;
  letter-spacing: normal !important; word-spacing: normal !important; font-kerning: normal !important; font-variant-ligatures: normal !important;
  -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
}

/* حاوية الصفحات */
#reports-a4-root [data-a4-pages] {
  display: flex; flex-direction: column; gap: 0; padding: 0; margin: 0; align-items: center; justify-content: flex-start;
}

/* صفحة A4 ثابتة بالبكسل، بدون أي هوامش خارجية */
.a4-page {
  position: relative;
  width: 794px; /* 210mm @ 96dpi */
  height: 1123px; /* 297mm @ 96dpi */
  overflow: hidden; background: #fff; border-radius: 0; margin: 0; padding: 0;
}

/* طبقة داخلية تمتد على كامل الصفحة وتُطبّق الحشوات بالـ mm */
.a4-inner { position: absolute; inset: 0; padding: 12mm 14mm 12mm; }
.a4-page--primary .a4-inner { padding-top: 6mm; }

/* العناوين والـ KPI */
.rpt-header { display: flex; flex-direction: column; gap: 8px; margin: 0 0 6mm 0; }
.rpt-header-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.rpt-titleblock { display: flex; flex-direction: column; gap: 4px; text-align: right; }
.rpt-header h1 { margin: 0; font-weight: 800; font-size: 18px; text-align: right; }
.rpt-subtitle { margin: 0; font-size: 12px; opacity: .9; text-align: right; }
.rpt-logo { width: 56px; height: 56px; object-fit: contain; border-radius: 12px; border: 1px solid #e5e7eb; background: #fff; }

.rpt-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 8px 0 6mm; }
.rpt-kpi { border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 10px; }
.rpt-kpi .label { font-size: 11px; opacity: .85; }
.rpt-kpi .value { font-weight: 700; font-size: 14px; }

/* الجدول */
.rpt-table { width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #9ca3af; table-layout: fixed; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
.rpt-table tbody tr:last-child td { border-bottom: 1px solid #9ca3af; }
.rpt-table td, .rpt-table th { vertical-align: middle; border-color: #9ca3af; }
/* تأكيد إغلاق الحواف الخارجية يمين/يسار وأعلى/أسفل */
.rpt-table thead tr:first-child th { border-top: 1px solid #9ca3af; }
.rpt-table thead th:first-child, .rpt-table tbody td:first-child { border-right: 1px solid #9ca3af; }
.rpt-table thead th:last-child, .rpt-table tbody td:last-child { border-left: 1px solid #9ca3af; }
.rpt-table tbody tr + tr td { border-top: 1px solid #9ca3af; }
/* تفاصيل الجسم فقط أصغر وبسطر واحد */
.rpt-table tr { height: 26px; }
.rpt-table tbody td { font-size: 10px; line-height: 1; height: 26px; padding: 0 !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; border: 1px solid #9ca3af; position: relative; }

/* تفاصيل الإيرادات داخل المعاينة */
.rpt-revenue {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 12px;
  margin: 6mm 0 6mm;
}
.rpt-revenue__item { display: flex; align-items: center; justify-content: space-between; border: 1px solid #9ca3af; border-radius: 8px; padding: 8px 10px; }
.rpt-revenue__label { font-size: 11px; opacity: .9; }
.rpt-revenue__value { font-weight: 700; font-size: 13px; }
.rpt-revenue__title { margin: 0 0 6px 0; font-size: 13px; font-weight: 800; }
.rpt-table th { background: #f3f4f6 !important; color: #000 !important; border: 1px solid #9ca3af; padding: 6px 8px; text-align: right; font-weight: 800; }
.rpt-table td { background: #ffffff !important; color: #000 !important; border: 1px solid #9ca3af; padding: 0 !important; text-align: right; height: 24px; }

/* تحسين ظهور الحدود في وضع المعاينة (قد تضيع عند التصغير) */
#reports-a4-root[data-render-context="preview"] .rpt-table { border-width: 2px; outline: 2px solid #475569; outline-offset: 0; box-shadow: inset 0 0 0 2px #475569; }
#reports-a4-root[data-render-context="preview"] .rpt-table th,
#reports-a4-root[data-render-context="preview"] .rpt-table td { border-color: #475569; border-width: 1.5px; }

/* توسيط المحتوى عمودياً داخل الخلايا بشكل صريح */
.rpt-table th, .rpt-table td { vertical-align: middle !important; }
.rpt-cell { display: flex; align-items: center; justify-content: flex-start; height: 26px; min-height: 26px; width: 100%; padding: 0 8px; box-sizing: border-box; line-height: 1; direction: rtl; word-break: keep-all; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* إخفاء العناصر حسب التفضيلات */
#reports-a4-root[data-hide-header] .rpt-header { display: none !important; }
#reports-a4-root[data-hide-kpis] .rpt-kpis { display: none !important; }
#reports-a4-root[data-hide-revenue] .rpt-revenue-section { display: none !important; }
`,T=96,A=25.4,F=210,D=297,C=Math.round(F/A*T),k=Math.round(D/A*T);function $(){try{return{header:localStorage.getItem("reportsPdf.hide.header")==="1",kpis:localStorage.getItem("reportsPdf.hide.kpis")==="1",revenue:localStorage.getItem("reportsPdf.hide.revenue")==="1"}}catch{return{header:!1,kpis:!1,revenue:!1}}}function O(e,t){!e||!t||(e.toggleAttribute("data-hide-header",!!t.header),e.toggleAttribute("data-hide-kpis",!!t.kpis),e.toggleAttribute("data-hide-revenue",!!t.revenue))}function U(e="preview"){const t=document.createElement("div");t.id="reports-a4-root",t.setAttribute("dir",document.documentElement.getAttribute("dir")||"rtl"),t.setAttribute("data-render-context",e);const o=document.createElement("style");o.textContent=String(z).trim(),t.appendChild(o);const s=document.createElement("div");return s.setAttribute("data-a4-pages",""),t.appendChild(s),O(t,$()),t}function H(){const e=document.createElement("div");e.className="rpt-header";const t=document.createElement("div");t.className="rpt-header-top";const o=document.createElement("div");o.className="rpt-titleblock";const s=document.createElement("h1");s.textContent=f("reservations.reports.print.title","تقرير الحجوزات","Reservations report");const r=document.createElement("p");r.className="rpt-subtitle",r.textContent=`${L(new Date)} • ${f("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,o.appendChild(s),o.appendChild(r);const a=document.createElement("img");return a.className="rpt-logo",a.alt="Logo",a.decoding="async",a.loading="lazy",a.src=B(),t.appendChild(o),t.appendChild(a),e.appendChild(t),e}function v(e){return Number.isFinite(Number(e))?Math.round(Number(e)*100)/100:0}function W(){const e=P.lastSnapshot?.metrics||{},t=document.createElement("div");t.className="rpt-kpis";const o=(u,g)=>{const b=document.createElement("div");return b.className="rpt-kpi",b.innerHTML=`<div class="label">${u}</div><div class="value">${g??"—"}</div>`,b},s=I(e.total||0),r=x(v(e.revenue)),a=x(v(e.netProfit)),d=x(v(e.companyShareTotal)),c=x(v(e.taxTotal)),m=x(v(e.maintenanceExpense));return t.appendChild(o(f("reservations.reports.kpi.total.label","الحجوزات","Reservations"),s)),t.appendChild(o(f("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),r)),t.appendChild(o(f("reservations.reports.kpi.net.label","صافي الربح","Net profit"),a)),t.appendChild(o(f("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),d)),t.appendChild(o(f("reservations.reports.kpi.tax.label","الضريبة","Tax"),c)),t.appendChild(o(f("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),m)),t}function G(){const e=P.lastSnapshot?.metrics||{},t=document.createElement("section");t.className="rpt-revenue-section";const o=document.createElement("h4");o.className="rpt-revenue__title",o.textContent=f("reservations.reports.kpi.revenue.details.title","تفاصيل الإيرادات","Revenue details");const s=document.createElement("div");s.className="rpt-revenue";const r=(d,c)=>{const m=document.createElement("div");m.className="rpt-revenue__item";const u=document.createElement("span");u.className="rpt-revenue__label",u.textContent=d;const g=document.createElement("strong");g.className="rpt-revenue__value",g.textContent=c,m.appendChild(u),m.appendChild(g),s.appendChild(m)},a=d=>x(v(d||0));return r(f("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),a(e.revenue)),r(f("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),a(e.companyShareTotal)),r(f("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),a(e.taxTotal)),r(f("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),a(e.crewTotal)),r(f("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),a(e.crewCostTotal)),Number.isFinite(Number(e.maintenanceExpense))&&r(f("reservations.reports.kpi.revenue.details.maintenance","مصاريف الصيانة","Maintenance"),a(e.maintenanceExpense)),r(f("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),a(e.netProfit)),t.appendChild(o),t.appendChild(s),t}function K(e){const t=document.createElement("table");t.className="rpt-table";const o=document.createElement("thead"),s=document.createElement("tr");e.forEach(a=>{const d=document.createElement("th");d.textContent=a,s.appendChild(d)}),o.appendChild(s);const r=document.createElement("tbody");return t.appendChild(o),t.appendChild(r),{table:t,tbody:r}}function V(e,t){const r=[];for(let a=0;a<e.length;a+=28)r.push(e.slice(a,a+28));if(r.length){const a=r[0];if(a.length>18){const d=a.splice(18);r.length>1?r[1]=d.concat(r[1]):r.push(d)}}return r}function R(e=[]){try{const t=new Set;return e.forEach(o=>{const s=`reportsPdf.column.${o}`,r=localStorage.getItem(s);(r==null||r==="1")&&t.add(o)}),t}catch{return new Set(e)}}function q(e,t,o){if(!o)return e;const s=o.showPaid??!0,r=o.showUnpaid??!0,a=o.showConfirmed??!0,d=o.showPending??!0,c=o.showCompleted??!0,m=t.find(p=>/الحالة|status/i.test(p))||null,u=t.find(p=>/الدفع|payment/i.test(p))||null;if(!m&&!u)return e;const g=p=>/مدفوعة|مدفوع|paid|partial/i.test(p||""),b=p=>/غير مدفوعة|غير مدفوع|unpaid/i.test(p||""),w=p=>{const n=String(p||"").toLowerCase();return/completed|منته/.test(n)?"completed":/confirmed|مؤكد/.test(n)?"confirmed":/pending|غير مؤكد|قيد التأكيد/.test(n)?"pending":"other"};return e.filter(p=>{let n=!0;if(u){const i=p[u];!s&&g(i)&&(n=!1),!r&&b(i)&&(n=!1)}if(m){const i=w(p[m]);!c&&i==="completed"&&(n=!1),!a&&i==="confirmed"&&(n=!1),!d&&i==="pending"&&(n=!1)}return n})}function N(e=[],{context:t="preview",columns:o,rowFilters:s}={}){const r=U(t),a=r.querySelector("[data-a4-pages]"),d=Array.isArray(e)&&e.length?e:P.lastSnapshot?.tableRows||[];let c=Object.keys(d[0]||{});const m=o&&o.length?new Set(o):R(c);c=c.filter(b=>m.has(b));const u=q(d,c,s),g=V(u);return g.length||g.push([]),g.forEach((b,w)=>{const p=document.createElement("section");p.className=`a4-page ${w===0?"a4-page--primary":"a4-page--continuation"}`,p.style.width=`${C}px`,p.style.height=`${k}px`;const n=document.createElement("div");n.className="a4-inner",w===0&&(n.appendChild(H()),n.appendChild(W()),n.appendChild(G()));const{table:i,tbody:l}=K(c);b.forEach(h=>{const y=document.createElement("tr");c.forEach(E=>{const _=document.createElement("td"),j=document.createElement("div");j.className="rpt-cell",j.textContent=h[E]!=null?String(h[E]):"",_.appendChild(j),y.appendChild(_)}),l.appendChild(y)}),n.appendChild(i),p.appendChild(n),a.appendChild(p)}),r}async function ie(e=[],{action:t="save",strict:o=!1}={}){const s=N(e,{context:"export"}),r=document.createElement("div");Object.assign(r.style,{position:"fixed",top:0,left:0,width:0,height:0,pointerEvents:"none",zIndex:-1}),r.appendChild(s),document.body.appendChild(r);try{if(o||localStorage.getItem("reportsPdf.strict")==="on"){await new Promise(h=>setTimeout(h,0));const n=document.createElement("iframe");Object.assign(n.style,{position:"fixed",width:"1px",height:"1px",right:"0",bottom:"0",border:"0",opacity:"0",pointerEvents:"none"}),document.body.appendChild(n);const i=n.contentWindow?.document,l=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${f("reservations.reports.print.title","تقرير الحجوزات","Reservations report")}</title><style>@page{size:A4;margin:0;}html,body{margin:0;padding:0;background:#fff;direction:rtl;text-align:right;}#reports-a4-root{width:${C}px;height:auto} .a4-page{width:${C}px;height:${k}px}</style></head><body></body></html>`;try{i.open(),i.write(l),i.close()}catch{}try{const h=s.cloneNode(!0);i.body.appendChild(h),i.fonts?.ready&&await i.fonts.ready}catch{}await new Promise(h=>setTimeout(h,60));try{n.contentWindow?.focus(),n.contentWindow?.print()}catch{}setTimeout(()=>{try{n.remove()}catch{}},1500);return}try{await M()}catch{}let d=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF,c=window.html2canvas;if(typeof d!="function")try{await S("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"),d=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF}catch{}if(typeof c!="function")try{await S("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"),c=window.html2canvas}catch{}if(typeof d!="function"||typeof c!="function"){const n=typeof d=="function",i=typeof c=="function";throw new Error(`PDF dependencies not available (jsPDF: ${n}, html2canvas: ${i})`)}const m=new d({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),u=Math.min(2,Math.max(1.6,(window.devicePixelRatio||1)*1.25)),g=(()=>{try{const n=e&&e[0]?Object.keys(e[0]):Object.keys(P.lastSnapshot?.tableRows?.[0]||{}),i=R(n);return n.filter(l=>i.has(l))}catch{return null}})(),b={showPaid:localStorage.getItem("reportsPdf.rows.paid")!=="0",showUnpaid:localStorage.getItem("reportsPdf.rows.unpaid")!=="0",showConfirmed:localStorage.getItem("reportsPdf.rows.confirmed")!=="0",showPending:localStorage.getItem("reportsPdf.rows.pending")!=="0",showCompleted:localStorage.getItem("reportsPdf.rows.completed")!=="0"},w=N(e,{context:"export",columns:g||void 0,rowFilters:b});r.innerHTML="",r.appendChild(w);const p=Array.from(w.querySelectorAll(".a4-page"));for(let n=0;n<p.length;n+=1){const i=p[n],h=(await c(i,{scale:u,scrollX:0,scrollY:0,backgroundColor:"#ffffff",useCORS:!0,allowTaint:!1,windowWidth:C,windowHeight:k,letterRendering:!0,imageTimeout:0})).toDataURL("image/jpeg",.98);n>0&&m.addPage(),m.addImage(h,"JPEG",0,0,F,D,`page-${n+1}`,"FAST"),await new Promise(y=>requestAnimationFrame(y))}if(t==="print"){const n=m.output("bloburl");await new Promise(i=>{const l=document.createElement("iframe");Object.assign(l.style,{position:"fixed",right:0,bottom:0,width:"1px",height:"1px",border:0}),l.onload=()=>{try{l.contentWindow?.focus(),l.contentWindow?.print()}catch{}setTimeout(()=>{l.remove(),i()},700)},l.src=n,document.body.appendChild(l)})}else{const n=m.output("blob"),i=URL.createObjectURL(n),l=document.createElement("a");l.href=i,l.download="reservations-report.pdf",l.rel="noopener",l.style.display="none",document.body.appendChild(l),l.click(),setTimeout(()=>{try{URL.revokeObjectURL(i),l.remove()}catch{}},1500)}}finally{r.remove()}}const X="https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png";function B(){try{const e=localStorage.getItem("reportsPdf.logoUrl");if(e&&/^https?:|^data:|^blob:/.test(e))return e}catch{}return X}export{N as buildA4ReportPages,ie as exportA4ReportPdf};
