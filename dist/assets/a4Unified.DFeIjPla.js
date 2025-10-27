import{r as x,t as l,e as F}from"./calculations.Cuzjzmo7.js";import{e as k,l as b}from"./reports.Cf2AHEaF.js";import"./reservationsService.DHFcI6wO.js";import"./auth.DEm-O4iH.js";import"./dashboard.p-AoJ7Qz.js";import"./controller.CKj9uBP3.js";/* empty css              */import"./dashboardShell.BJ8UOETr.js";import"./customers.DDv-F3VN.js";import"./maintenanceService.-sdg2Aq9.js";const D=`@page { size: A4; margin: 0; }

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
.rpt-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.rpt-table th { background: #f3f4f6 !important; color: #000 !important; border: 1px solid #e5e7eb; padding: 6px 8px; text-align: right; font-weight: 800; }
.rpt-table td { background: #ffffff !important; color: #000 !important; border: 1px solid #e5e7eb; padding: 6px 8px; text-align: right; }

`,v=96,y=25.4,j=210,P=297,C=Math.round(j/y*v),E=Math.round(P/y*v);function A(e="preview"){const t=document.createElement("div");t.id="reports-a4-root",t.setAttribute("dir",document.documentElement.getAttribute("dir")||"rtl"),t.setAttribute("data-render-context",e);const o=document.createElement("style");o.textContent=String(D).trim(),t.appendChild(o);const i=document.createElement("div");return i.setAttribute("data-a4-pages",""),t.appendChild(i),t}function R(){const e=document.createElement("div");e.className="rpt-header";const t=document.createElement("h1");t.textContent=l("reservations.reports.print.title","تقرير الحجوزات","Reservations report");const o=document.createElement("p");return o.className="rpt-subtitle",o.textContent=`${F(new Date)} • ${l("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,e.appendChild(t),e.appendChild(o),e}function S(){const e=x.lastSnapshot?.metrics||{},t=document.createElement("div");t.className="rpt-kpis";const o=(n,a)=>{const r=document.createElement("div");return r.className="rpt-kpi",r.innerHTML=`<div class="label">${n}</div><div class="value">${a??"—"}</div>`,r},i=(n,a)=>{const r=e[n];return r==null||r===""?a:String(r)};return t.appendChild(o(l("reservations.reports.kpi.total.label","الحجوزات","Reservations"),i("total","0"))),t.appendChild(o(l("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),i("revenueFormatted",e.revenue))),t.appendChild(o(l("reservations.reports.kpi.net.label","صافي الربح","Net profit"),i("netProfitFormatted",e.netProfit))),t.appendChild(o(l("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),i("companyShareTotalFormatted",e.companyShareTotal))),t.appendChild(o(l("reservations.reports.kpi.tax.label","الضريبة","Tax"),i("taxTotalFormatted",e.taxTotal))),t.appendChild(o(l("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),i("maintenanceExpenseFormatted",e.maintenanceExpense))),t}function _(e){const t=document.createElement("table");t.className="rpt-table";const o=document.createElement("thead"),i=document.createElement("tr");e.forEach(a=>{const r=document.createElement("th");r.textContent=a,i.appendChild(r)}),o.appendChild(i);const n=document.createElement("tbody");return t.appendChild(o),t.appendChild(n),{table:t,tbody:n}}function T(e,t){const n=[];for(let a=0;a<e.length;a+=28)n.push(e.slice(a,a+28));if(n.length){const a=n[0];if(a.length>18){const r=a.splice(18);n.length>1?n[1]=r.concat(n[1]):n.push(r)}}return n}function M(e=[],{context:t="preview"}={}){const o=A(t),i=o.querySelector("[data-a4-pages]"),n=Array.isArray(e)&&e.length?e:x.lastSnapshot?.tableRows||[],a=Object.keys(n[0]||{}),r=T(n);return r.length||r.push([]),r.forEach((u,c)=>{const s=document.createElement("section");s.className=`a4-page ${c===0?"a4-page--primary":"a4-page--continuation"}`,s.style.width=`${C}px`,s.style.height=`${E}px`;const p=document.createElement("div");p.className="a4-inner",c===0&&(p.appendChild(R()),p.appendChild(S()));const{table:d,tbody:m}=_(a);u.forEach(f=>{const h=document.createElement("tr");a.forEach(w=>{const g=document.createElement("td");g.textContent=f[w]!=null?String(f[w]):"",h.appendChild(g)}),m.appendChild(h)}),p.appendChild(d),s.appendChild(p),i.appendChild(s)}),o}async function X(e=[],{action:t="save"}={}){const o=M(e,{context:"export"}),i=document.createElement("div");Object.assign(i.style,{position:"fixed",top:0,left:0,width:0,height:0,pointerEvents:"none",zIndex:-1}),i.appendChild(o),document.body.appendChild(i);try{try{await k()}catch{}let n=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF,a=window.html2canvas;if(typeof n!="function")try{await b("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"),n=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF}catch{}if(typeof a!="function")try{await b("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"),a=window.html2canvas}catch{}if(typeof n!="function"||typeof a!="function"){const s=typeof n=="function",p=typeof a=="function";throw new Error(`PDF dependencies not available (jsPDF: ${s}, html2canvas: ${p})`)}const r=new n({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),u=Math.min(2,Math.max(1.6,(window.devicePixelRatio||1)*1.25)),c=Array.from(o.querySelectorAll(".a4-page"));for(let s=0;s<c.length;s+=1){const p=c[s],m=(await a(p,{scale:u,scrollX:0,scrollY:0,backgroundColor:"#ffffff",useCORS:!0,allowTaint:!1,windowWidth:C,windowHeight:E})).toDataURL("image/jpeg",.98);s>0&&r.addPage(),r.addImage(m,"JPEG",0,0,j,P,`page-${s+1}`,"FAST"),await new Promise(f=>requestAnimationFrame(f))}if(t==="print"){const s=r.output("bloburl");await new Promise(p=>{const d=document.createElement("iframe");Object.assign(d.style,{position:"fixed",right:0,bottom:0,width:"1px",height:"1px",border:0}),d.onload=()=>{try{d.contentWindow?.focus(),d.contentWindow?.print()}catch{}setTimeout(()=>{d.remove(),p()},700)},d.src=s,document.body.appendChild(d)})}else{const s=r.output("blob"),p=URL.createObjectURL(s),d=document.createElement("a");d.href=p,d.download="reservations-report.pdf",d.rel="noopener",d.style.display="none",document.body.appendChild(d),d.click(),setTimeout(()=>{try{URL.revokeObjectURL(p),d.remove()}catch{}},1500)}}finally{i.remove()}}export{M as buildA4ReportPages,X as exportA4ReportPdf};
