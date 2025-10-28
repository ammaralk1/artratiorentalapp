import{t as f,r as C,e as I,d as L,b as x}from"./calculations.Cuzjzmo7.js";import{e as M,l as S}from"./reports.DUWz20Ll.js";import"./reservationsService.DHFcI6wO.js";import"./auth.DEm-O4iH.js";import"./dashboard.BdD_N8ai.js";import"./controller.CKj9uBP3.js";/* empty css              */import"./dashboardShell.BJ8UOETr.js";import"./customers.DDv-F3VN.js";import"./maintenanceService.-sdg2Aq9.js";const $=`@page { size: A4; margin: 0; }
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
.rpt-header { display: flex; flex-direction: column; gap: 6px; margin: 0 0 6mm 0; }
.rpt-header h1 { margin: 0; font-weight: 800; font-size: 18px; text-align: right; }
.rpt-subtitle { margin: 0; font-size: 12px; opacity: .9; text-align: right; }

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
`,T=96,F=25.4,A=210,D=297,P=Math.round(A/F*T),k=Math.round(D/F*T);function z(){try{return{header:localStorage.getItem("reportsPdf.hide.header")==="1",kpis:localStorage.getItem("reportsPdf.hide.kpis")==="1",revenue:localStorage.getItem("reportsPdf.hide.revenue")==="1"}}catch{return{header:!1,kpis:!1,revenue:!1}}}function H(e,t){!e||!t||(e.toggleAttribute("data-hide-header",!!t.header),e.toggleAttribute("data-hide-kpis",!!t.kpis),e.toggleAttribute("data-hide-revenue",!!t.revenue))}function O(e="preview"){const t=document.createElement("div");t.id="reports-a4-root",t.setAttribute("dir",document.documentElement.getAttribute("dir")||"rtl"),t.setAttribute("data-render-context",e);const r=document.createElement("style");r.textContent=String($).trim(),t.appendChild(r);const l=document.createElement("div");return l.setAttribute("data-a4-pages",""),t.appendChild(l),H(t,z()),t}function U(){const e=document.createElement("div");e.className="rpt-header";const t=document.createElement("h1");t.textContent=f("reservations.reports.print.title","تقرير الحجوزات","Reservations report");const r=document.createElement("p");return r.className="rpt-subtitle",r.textContent=`${I(new Date)} • ${f("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,e.appendChild(t),e.appendChild(r),e}function v(e){return Number.isFinite(Number(e))?Math.round(Number(e)*100)/100:0}function W(){const e=C.lastSnapshot?.metrics||{},t=document.createElement("div");t.className="rpt-kpis";const r=(u,g)=>{const w=document.createElement("div");return w.className="rpt-kpi",w.innerHTML=`<div class="label">${u}</div><div class="value">${g??"—"}</div>`,w},l=L(e.total||0),o=x(v(e.revenue)),i=x(v(e.netProfit)),s=x(v(e.companyShareTotal)),c=x(v(e.taxTotal)),m=x(v(e.maintenanceExpense));return t.appendChild(r(f("reservations.reports.kpi.total.label","الحجوزات","Reservations"),l)),t.appendChild(r(f("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),o)),t.appendChild(r(f("reservations.reports.kpi.net.label","صافي الربح","Net profit"),i)),t.appendChild(r(f("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),s)),t.appendChild(r(f("reservations.reports.kpi.tax.label","الضريبة","Tax"),c)),t.appendChild(r(f("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),m)),t}function G(){const e=C.lastSnapshot?.metrics||{},t=document.createElement("section");t.className="rpt-revenue-section";const r=document.createElement("h4");r.className="rpt-revenue__title",r.textContent=f("reservations.reports.kpi.revenue.details.title","تفاصيل الإيرادات","Revenue details");const l=document.createElement("div");l.className="rpt-revenue";const o=(s,c)=>{const m=document.createElement("div");m.className="rpt-revenue__item";const u=document.createElement("span");u.className="rpt-revenue__label",u.textContent=s;const g=document.createElement("strong");g.className="rpt-revenue__value",g.textContent=c,m.appendChild(u),m.appendChild(g),l.appendChild(m)},i=s=>x(v(s||0));return o(f("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),i(e.revenue)),o(f("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),i(e.companyShareTotal)),o(f("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),i(e.taxTotal)),o(f("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),i(e.crewTotal)),o(f("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),i(e.crewCostTotal)),Number.isFinite(Number(e.maintenanceExpense))&&o(f("reservations.reports.kpi.revenue.details.maintenance","مصاريف الصيانة","Maintenance"),i(e.maintenanceExpense)),o(f("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),i(e.netProfit)),t.appendChild(r),t.appendChild(l),t}function K(e){const t=document.createElement("table");t.className="rpt-table";const r=document.createElement("thead"),l=document.createElement("tr");e.forEach(i=>{const s=document.createElement("th");s.textContent=i,l.appendChild(s)}),r.appendChild(l);const o=document.createElement("tbody");return t.appendChild(r),t.appendChild(o),{table:t,tbody:o}}function V(e,t){const o=[];for(let i=0;i<e.length;i+=28)o.push(e.slice(i,i+28));if(o.length){const i=o[0];if(i.length>18){const s=i.splice(18);o.length>1?o[1]=s.concat(o[1]):o.push(s)}}return o}function R(e=[]){try{const t=new Set;return e.forEach(r=>{const l=`reportsPdf.column.${r}`,o=localStorage.getItem(l);(o==null||o==="1")&&t.add(r)}),t}catch{return new Set(e)}}function q(e,t,r){if(!r)return e;const l=r.showPaid??!0,o=r.showUnpaid??!0,i=r.showConfirmed??!0,s=r.showPending??!0,c=r.showCompleted??!0,m=t.find(p=>/الحالة|status/i.test(p))||null,u=t.find(p=>/الدفع|payment/i.test(p))||null;if(!m&&!u)return e;const g=p=>/مدفوعة|مدفوع|paid|partial/i.test(p||""),w=p=>/غير مدفوعة|غير مدفوع|unpaid/i.test(p||""),b=p=>{const n=String(p||"").toLowerCase();return/completed|منته/.test(n)?"completed":/confirmed|مؤكد/.test(n)?"confirmed":/pending|غير مؤكد|قيد التأكيد/.test(n)?"pending":"other"};return e.filter(p=>{let n=!0;if(u){const a=p[u];!l&&g(a)&&(n=!1),!o&&w(a)&&(n=!1)}if(m){const a=b(p[m]);!c&&a==="completed"&&(n=!1),!i&&a==="confirmed"&&(n=!1),!s&&a==="pending"&&(n=!1)}return n})}function N(e=[],{context:t="preview",columns:r,rowFilters:l}={}){const o=O(t),i=o.querySelector("[data-a4-pages]"),s=Array.isArray(e)&&e.length?e:C.lastSnapshot?.tableRows||[];let c=Object.keys(s[0]||{});const m=r&&r.length?new Set(r):R(c);c=c.filter(w=>m.has(w));const u=q(s,c,l),g=V(u);return g.length||g.push([]),g.forEach((w,b)=>{const p=document.createElement("section");p.className=`a4-page ${b===0?"a4-page--primary":"a4-page--continuation"}`,p.style.width=`${P}px`,p.style.height=`${k}px`;const n=document.createElement("div");n.className="a4-inner",b===0&&(n.appendChild(U()),n.appendChild(W()),n.appendChild(G()));const{table:a,tbody:d}=K(c);w.forEach(h=>{const y=document.createElement("tr");c.forEach(E=>{const _=document.createElement("td"),j=document.createElement("div");j.className="rpt-cell",j.textContent=h[E]!=null?String(h[E]):"",_.appendChild(j),y.appendChild(_)}),d.appendChild(y)}),n.appendChild(a),p.appendChild(n),i.appendChild(p)}),o}async function oe(e=[],{action:t="save",strict:r=!1}={}){const l=N(e,{context:"export"}),o=document.createElement("div");Object.assign(o.style,{position:"fixed",top:0,left:0,width:0,height:0,pointerEvents:"none",zIndex:-1}),o.appendChild(l),document.body.appendChild(o);try{if(r||localStorage.getItem("reportsPdf.strict")==="on"){await new Promise(h=>setTimeout(h,0));const n=document.createElement("iframe");Object.assign(n.style,{position:"fixed",width:"1px",height:"1px",right:"0",bottom:"0",border:"0",opacity:"0",pointerEvents:"none"}),document.body.appendChild(n);const a=n.contentWindow?.document,d=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${f("reservations.reports.print.title","تقرير الحجوزات","Reservations report")}</title><style>@page{size:A4;margin:0;}html,body{margin:0;padding:0;background:#fff;direction:rtl;text-align:right;}#reports-a4-root{width:${P}px;height:auto} .a4-page{width:${P}px;height:${k}px}</style></head><body></body></html>`;try{a.open(),a.write(d),a.close()}catch{}try{const h=l.cloneNode(!0);a.body.appendChild(h),a.fonts?.ready&&await a.fonts.ready}catch{}await new Promise(h=>setTimeout(h,60));try{n.contentWindow?.focus(),n.contentWindow?.print()}catch{}setTimeout(()=>{try{n.remove()}catch{}},1500);return}try{await M()}catch{}let s=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF,c=window.html2canvas;if(typeof s!="function")try{await S("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"),s=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF}catch{}if(typeof c!="function")try{await S("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"),c=window.html2canvas}catch{}if(typeof s!="function"||typeof c!="function"){const n=typeof s=="function",a=typeof c=="function";throw new Error(`PDF dependencies not available (jsPDF: ${n}, html2canvas: ${a})`)}const m=new s({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),u=Math.min(2,Math.max(1.6,(window.devicePixelRatio||1)*1.25)),g=(()=>{try{const n=e&&e[0]?Object.keys(e[0]):Object.keys(C.lastSnapshot?.tableRows?.[0]||{}),a=R(n);return n.filter(d=>a.has(d))}catch{return null}})(),w={showPaid:localStorage.getItem("reportsPdf.rows.paid")!=="0",showUnpaid:localStorage.getItem("reportsPdf.rows.unpaid")!=="0",showConfirmed:localStorage.getItem("reportsPdf.rows.confirmed")!=="0",showPending:localStorage.getItem("reportsPdf.rows.pending")!=="0",showCompleted:localStorage.getItem("reportsPdf.rows.completed")!=="0"},b=N(e,{context:"export",columns:g||void 0,rowFilters:w});o.innerHTML="",o.appendChild(b);const p=Array.from(b.querySelectorAll(".a4-page"));for(let n=0;n<p.length;n+=1){const a=p[n],h=(await c(a,{scale:u,scrollX:0,scrollY:0,backgroundColor:"#ffffff",useCORS:!0,allowTaint:!1,windowWidth:P,windowHeight:k,letterRendering:!0,imageTimeout:0})).toDataURL("image/jpeg",.98);n>0&&m.addPage(),m.addImage(h,"JPEG",0,0,A,D,`page-${n+1}`,"FAST"),await new Promise(y=>requestAnimationFrame(y))}if(t==="print"){const n=m.output("bloburl");await new Promise(a=>{const d=document.createElement("iframe");Object.assign(d.style,{position:"fixed",right:0,bottom:0,width:"1px",height:"1px",border:0}),d.onload=()=>{try{d.contentWindow?.focus(),d.contentWindow?.print()}catch{}setTimeout(()=>{d.remove(),a()},700)},d.src=n,document.body.appendChild(d)})}else{const n=m.output("blob"),a=URL.createObjectURL(n),d=document.createElement("a");d.href=a,d.download="reservations-report.pdf",d.rel="noopener",d.style.display="none",document.body.appendChild(d),d.click(),setTimeout(()=>{try{URL.revokeObjectURL(a),d.remove()}catch{}},1500)}}finally{o.remove()}}export{N as buildA4ReportPages,oe as exportA4ReportPdf};
