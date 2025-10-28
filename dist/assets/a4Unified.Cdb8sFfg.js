import{t as l,r as C,e as T,d as F,b as g}from"./calculations.Cuzjzmo7.js";import{e as D,l as P}from"./reports.CxFs0SCE.js";import"./reservationsService.DHFcI6wO.js";import"./auth.DEm-O4iH.js";import"./dashboard.B9H6mWX1.js";import"./controller.CKj9uBP3.js";/* empty css              */import"./dashboardShell.BJ8UOETr.js";import"./customers.DDv-F3VN.js";import"./maintenanceService.-sdg2Aq9.js";const A=`@page { size: A4; margin: 0; }
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
.rpt-table tr { height: 24px; }
.rpt-table tbody td { font-size: 10px; line-height: normal; height: 24px; padding: 0 !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; border: 1px solid #9ca3af; position: relative; }

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
.rpt-cell {
  display: grid;
  align-items: center;
  align-content: center;
  height: 100%;
  min-height: 24px;
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
  direction: rtl;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`,E=96,k=25.4,_=210,N=297,x=Math.round(_/k*E),y=Math.round(N/k*E);function R(t="preview"){const e=document.createElement("div");e.id="reports-a4-root",e.setAttribute("dir",document.documentElement.getAttribute("dir")||"rtl"),e.setAttribute("data-render-context",t);const o=document.createElement("style");o.textContent=String(A).trim(),e.appendChild(o);const d=document.createElement("div");return d.setAttribute("data-a4-pages",""),e.appendChild(d),e}function S(){const t=document.createElement("div");t.className="rpt-header";const e=document.createElement("h1");e.textContent=l("reservations.reports.print.title","تقرير الحجوزات","Reservations report");const o=document.createElement("p");return o.className="rpt-subtitle",o.textContent=`${T(new Date)} • ${l("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,t.appendChild(e),t.appendChild(o),t}function b(t){return Number.isFinite(Number(t))?Math.round(Number(t)*100)/100:0}function z(){const t=C.lastSnapshot?.metrics||{},e=document.createElement("div");e.className="rpt-kpis";const o=(u,m)=>{const r=document.createElement("div");return r.className="rpt-kpi",r.innerHTML=`<div class="label">${u}</div><div class="value">${m??"—"}</div>`,r},d=F(t.total||0),n=g(b(t.revenue)),a=g(b(t.netProfit)),i=g(b(t.companyShareTotal)),f=g(b(t.taxTotal)),h=g(b(t.maintenanceExpense));return e.appendChild(o(l("reservations.reports.kpi.total.label","الحجوزات","Reservations"),d)),e.appendChild(o(l("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),n)),e.appendChild(o(l("reservations.reports.kpi.net.label","صافي الربح","Net profit"),a)),e.appendChild(o(l("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),i)),e.appendChild(o(l("reservations.reports.kpi.tax.label","الضريبة","Tax"),f)),e.appendChild(o(l("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),h)),e}function M(){const t=C.lastSnapshot?.metrics||{},e=document.createElement("section"),o=document.createElement("h4");o.className="rpt-revenue__title",o.textContent=l("reservations.reports.kpi.revenue.details.title","تفاصيل الإيرادات","Revenue details");const d=document.createElement("div");d.className="rpt-revenue";const n=(i,f)=>{const h=document.createElement("div");h.className="rpt-revenue__item";const u=document.createElement("span");u.className="rpt-revenue__label",u.textContent=i;const m=document.createElement("strong");m.className="rpt-revenue__value",m.textContent=f,h.appendChild(u),h.appendChild(m),d.appendChild(h)},a=i=>g(b(i||0));return n(l("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),a(t.revenue)),n(l("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),a(t.companyShareTotal)),n(l("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),a(t.taxTotal)),n(l("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),a(t.crewTotal)),n(l("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),a(t.crewCostTotal)),Number.isFinite(Number(t.maintenanceExpense))&&n(l("reservations.reports.kpi.revenue.details.maintenance","مصاريف الصيانة","Maintenance"),a(t.maintenanceExpense)),n(l("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),a(t.netProfit)),e.appendChild(o),e.appendChild(d),e}function $(t){const e=document.createElement("table");e.className="rpt-table";const o=document.createElement("thead"),d=document.createElement("tr");t.forEach(a=>{const i=document.createElement("th");i.textContent=a,d.appendChild(i)}),o.appendChild(d);const n=document.createElement("tbody");return e.appendChild(o),e.appendChild(n),{table:e,tbody:n}}function L(t,e){const n=[];for(let a=0;a<t.length;a+=28)n.push(t.slice(a,a+28));if(n.length){const a=n[0];if(a.length>18){const i=a.splice(18);n.length>1?n[1]=i.concat(n[1]):n.push(i)}}return n}function I(t=[],{context:e="preview"}={}){const o=R(e),d=o.querySelector("[data-a4-pages]"),n=Array.isArray(t)&&t.length?t:C.lastSnapshot?.tableRows||[],a=Object.keys(n[0]||{}),i=L(n);return i.length||i.push([]),i.forEach((f,h)=>{const u=document.createElement("section");u.className=`a4-page ${h===0?"a4-page--primary":"a4-page--continuation"}`,u.style.width=`${x}px`,u.style.height=`${y}px`;const m=document.createElement("div");m.className="a4-inner",h===0&&(m.appendChild(S()),m.appendChild(z()),m.appendChild(M()));const{table:r,tbody:p}=$(a);f.forEach(s=>{const c=document.createElement("tr");a.forEach(w=>{const j=document.createElement("td"),v=document.createElement("div");v.className="rpt-cell",v.textContent=s[w]!=null?String(s[w]):"",j.appendChild(v),c.appendChild(j)}),p.appendChild(c)}),m.appendChild(r),u.appendChild(m),d.appendChild(u)}),o}async function Y(t=[],{action:e="save",strict:o=!1}={}){const d=I(t,{context:"export"}),n=document.createElement("div");Object.assign(n.style,{position:"fixed",top:0,left:0,width:0,height:0,pointerEvents:"none",zIndex:-1}),n.appendChild(d),document.body.appendChild(n);try{if(o||localStorage.getItem("reportsPdf.strict")==="on"){await new Promise(c=>setTimeout(c,0));const r=document.createElement("iframe");Object.assign(r.style,{position:"fixed",width:"1px",height:"1px",right:"0",bottom:"0",border:"0",opacity:"0",pointerEvents:"none"}),document.body.appendChild(r);const p=r.contentWindow?.document,s=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${l("reservations.reports.print.title","تقرير الحجوزات","Reservations report")}</title><style>@page{size:A4;margin:0;}html,body{margin:0;padding:0;background:#fff;direction:rtl;text-align:right;}#reports-a4-root{width:${x}px;height:auto} .a4-page{width:${x}px;height:${y}px}</style></head><body></body></html>`;try{p.open(),p.write(s),p.close()}catch{}try{const c=d.cloneNode(!0);p.body.appendChild(c),p.fonts?.ready&&await p.fonts.ready}catch{}await new Promise(c=>setTimeout(c,60));try{r.contentWindow?.focus(),r.contentWindow?.print()}catch{}setTimeout(()=>{try{r.remove()}catch{}},1500);return}try{await D()}catch{}let i=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF,f=window.html2canvas;if(typeof i!="function")try{await P("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"),i=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF}catch{}if(typeof f!="function")try{await P("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"),f=window.html2canvas}catch{}if(typeof i!="function"||typeof f!="function"){const r=typeof i=="function",p=typeof f=="function";throw new Error(`PDF dependencies not available (jsPDF: ${r}, html2canvas: ${p})`)}const h=new i({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),u=Math.min(2,Math.max(1.6,(window.devicePixelRatio||1)*1.25)),m=Array.from(d.querySelectorAll(".a4-page"));for(let r=0;r<m.length;r+=1){const p=m[r],c=(await f(p,{scale:u,scrollX:0,scrollY:0,backgroundColor:"#ffffff",useCORS:!0,allowTaint:!1,windowWidth:x,windowHeight:y,letterRendering:!0,imageTimeout:0})).toDataURL("image/jpeg",.98);r>0&&h.addPage(),h.addImage(c,"JPEG",0,0,_,N,`page-${r+1}`,"FAST"),await new Promise(w=>requestAnimationFrame(w))}if(e==="print"){const r=h.output("bloburl");await new Promise(p=>{const s=document.createElement("iframe");Object.assign(s.style,{position:"fixed",right:0,bottom:0,width:"1px",height:"1px",border:0}),s.onload=()=>{try{s.contentWindow?.focus(),s.contentWindow?.print()}catch{}setTimeout(()=>{s.remove(),p()},700)},s.src=r,document.body.appendChild(s)})}else{const r=h.output("blob"),p=URL.createObjectURL(r),s=document.createElement("a");s.href=p,s.download="reservations-report.pdf",s.rel="noopener",s.style.display="none",document.body.appendChild(s),s.click(),setTimeout(()=>{try{URL.revokeObjectURL(p),s.remove()}catch{}},1500)}}finally{n.remove()}}export{I as buildA4ReportPages,Y as exportA4ReportPdf};
