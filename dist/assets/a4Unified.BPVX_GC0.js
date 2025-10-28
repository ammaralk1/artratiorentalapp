import{r as w,t as l,e as F,d as D,b as u}from"./calculations.Cuzjzmo7.js";import{e as N,l as y}from"./reports.CSBev2d0.js";import"./reservationsService.DHFcI6wO.js";import"./auth.DEm-O4iH.js";import"./dashboard.D2Jrz0k0.js";import"./controller.CKj9uBP3.js";/* empty css              */import"./dashboardShell.BJ8UOETr.js";import"./customers.DDv-F3VN.js";import"./maintenanceService.-sdg2Aq9.js";const A=`@page { size: A4; margin: 0; }

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
.rpt-table { width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #e5e7eb; table-layout: fixed; }
.rpt-table tbody tr:last-child td { border-bottom: 1px solid #e5e7eb; }
.rpt-table td, .rpt-table th { vertical-align: middle; }
/* تفاصيل الجسم فقط أصغر وبسطر واحد */
.rpt-table tbody td { font-size: 10px; line-height: 1.35; padding: 4px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* تفاصيل الإيرادات داخل المعاينة */
.rpt-revenue {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 12px;
  margin: 6mm 0 6mm;
}
.rpt-revenue__item { display: flex; align-items: center; justify-content: space-between; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 10px; }
.rpt-revenue__label { font-size: 11px; opacity: .9; }
.rpt-revenue__value { font-weight: 700; font-size: 13px; }
.rpt-revenue__title { margin: 0 0 6px 0; font-size: 13px; font-weight: 800; }
.rpt-table th { background: #f3f4f6 !important; color: #000 !important; border: 1px solid #e5e7eb; padding: 6px 8px; text-align: right; font-weight: 800; }
.rpt-table td { background: #ffffff !important; color: #000 !important; border: 1px solid #e5e7eb; padding: 6px 8px; text-align: right; }
`,C=96,j=25.4,P=210,E=297,k=Math.round(P/j*C),_=Math.round(E/j*C);function R(e="preview"){const t=document.createElement("div");t.id="reports-a4-root",t.setAttribute("dir",document.documentElement.getAttribute("dir")||"rtl"),t.setAttribute("data-render-context",e);const o=document.createElement("style");o.textContent=String(A).trim(),t.appendChild(o);const d=document.createElement("div");return d.setAttribute("data-a4-pages",""),t.appendChild(d),t}function S(){const e=document.createElement("div");e.className="rpt-header";const t=document.createElement("h1");t.textContent=l("reservations.reports.print.title","تقرير الحجوزات","Reservations report");const o=document.createElement("p");return o.className="rpt-subtitle",o.textContent=`${F(new Date)} • ${l("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,e.appendChild(t),e.appendChild(o),e}function f(e){return Number.isFinite(Number(e))?Math.round(Number(e)*100)/100:0}function T(){const e=w.lastSnapshot?.metrics||{},t=document.createElement("div");t.className="rpt-kpis";const o=(a,s)=>{const i=document.createElement("div");return i.className="rpt-kpi",i.innerHTML=`<div class="label">${a}</div><div class="value">${s??"—"}</div>`,i},d=D(e.total||0),n=u(f(e.revenue)),r=u(f(e.netProfit)),p=u(f(e.companyShareTotal)),m=u(f(e.taxTotal)),c=u(f(e.maintenanceExpense));return t.appendChild(o(l("reservations.reports.kpi.total.label","الحجوزات","Reservations"),d)),t.appendChild(o(l("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),n)),t.appendChild(o(l("reservations.reports.kpi.net.label","صافي الربح","Net profit"),r)),t.appendChild(o(l("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),p)),t.appendChild(o(l("reservations.reports.kpi.tax.label","الضريبة","Tax"),m)),t.appendChild(o(l("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),c)),t}function M(){const e=w.lastSnapshot?.metrics||{},t=document.createElement("section"),o=document.createElement("h4");o.className="rpt-revenue__title",o.textContent=l("reservations.reports.kpi.revenue.details.title","تفاصيل الإيرادات","Revenue details");const d=document.createElement("div");d.className="rpt-revenue";const n=(p,m)=>{const c=document.createElement("div");c.className="rpt-revenue__item";const a=document.createElement("span");a.className="rpt-revenue__label",a.textContent=p;const s=document.createElement("strong");s.className="rpt-revenue__value",s.textContent=m,c.appendChild(a),c.appendChild(s),d.appendChild(c)},r=p=>u(f(p||0));return n(l("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),r(e.revenue)),n(l("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),r(e.companyShareTotal)),n(l("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),r(e.taxTotal)),n(l("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),r(e.crewTotal)),n(l("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),r(e.crewCostTotal)),Number.isFinite(Number(e.maintenanceExpense))&&n(l("reservations.reports.kpi.revenue.details.maintenance","مصاريف الصيانة","Maintenance"),r(e.maintenanceExpense)),n(l("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),r(e.netProfit)),t.appendChild(o),t.appendChild(d),t}function L(e){const t=document.createElement("table");t.className="rpt-table";const o=document.createElement("thead"),d=document.createElement("tr");e.forEach(r=>{const p=document.createElement("th");p.textContent=r,d.appendChild(p)}),o.appendChild(d);const n=document.createElement("tbody");return t.appendChild(o),t.appendChild(n),{table:t,tbody:n}}function z(e,t){const n=[];for(let r=0;r<e.length;r+=28)n.push(e.slice(r,r+28));if(n.length){const r=n[0];if(r.length>18){const p=r.splice(18);n.length>1?n[1]=p.concat(n[1]):n.push(p)}}return n}function $(e=[],{context:t="preview"}={}){const o=R(t),d=o.querySelector("[data-a4-pages]"),n=Array.isArray(e)&&e.length?e:w.lastSnapshot?.tableRows||[],r=Object.keys(n[0]||{}),p=z(n);return p.length||p.push([]),p.forEach((m,c)=>{const a=document.createElement("section");a.className=`a4-page ${c===0?"a4-page--primary":"a4-page--continuation"}`,a.style.width=`${k}px`,a.style.height=`${_}px`;const s=document.createElement("div");s.className="a4-inner",c===0&&(s.appendChild(S()),s.appendChild(T()),s.appendChild(M()));const{table:i,tbody:h}=L(r);m.forEach(b=>{const g=document.createElement("tr");r.forEach(v=>{const x=document.createElement("td");x.textContent=b[v]!=null?String(b[v]):"",g.appendChild(x)}),h.appendChild(g)}),s.appendChild(i),a.appendChild(s),d.appendChild(a)}),o}async function Y(e=[],{action:t="save"}={}){const o=$(e,{context:"export"}),d=document.createElement("div");Object.assign(d.style,{position:"fixed",top:0,left:0,width:0,height:0,pointerEvents:"none",zIndex:-1}),d.appendChild(o),document.body.appendChild(d);try{try{await N()}catch{}let n=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF,r=window.html2canvas;if(typeof n!="function")try{await y("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"),n=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF}catch{}if(typeof r!="function")try{await y("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"),r=window.html2canvas}catch{}if(typeof n!="function"||typeof r!="function"){const a=typeof n=="function",s=typeof r=="function";throw new Error(`PDF dependencies not available (jsPDF: ${a}, html2canvas: ${s})`)}const p=new n({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),m=Math.min(2,Math.max(1.6,(window.devicePixelRatio||1)*1.25)),c=Array.from(o.querySelectorAll(".a4-page"));for(let a=0;a<c.length;a+=1){const s=c[a],h=(await r(s,{scale:m,scrollX:0,scrollY:0,backgroundColor:"#ffffff",useCORS:!0,allowTaint:!1,windowWidth:k,windowHeight:_})).toDataURL("image/jpeg",.98);a>0&&p.addPage(),p.addImage(h,"JPEG",0,0,P,E,`page-${a+1}`,"FAST"),await new Promise(b=>requestAnimationFrame(b))}if(t==="print"){const a=p.output("bloburl");await new Promise(s=>{const i=document.createElement("iframe");Object.assign(i.style,{position:"fixed",right:0,bottom:0,width:"1px",height:"1px",border:0}),i.onload=()=>{try{i.contentWindow?.focus(),i.contentWindow?.print()}catch{}setTimeout(()=>{i.remove(),s()},700)},i.src=a,document.body.appendChild(i)})}else{const a=p.output("blob"),s=URL.createObjectURL(a),i=document.createElement("a");i.href=s,i.download="reservations-report.pdf",i.rel="noopener",i.style.display="none",document.body.appendChild(i),i.click(),setTimeout(()=>{try{URL.revokeObjectURL(s),i.remove()}catch{}},1500)}}finally{d.remove()}}export{$ as buildA4ReportPages,Y as exportA4ReportPdf};
