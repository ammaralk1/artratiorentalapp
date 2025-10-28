import{r as y,t as l,e as D,d as A,b as u}from"./calculations.Cuzjzmo7.js";import{e as N,l as v}from"./reports.C3JACcwF.js";import"./reservationsService.DHFcI6wO.js";import"./auth.DEm-O4iH.js";import"./dashboard.BPqqcM47.js";import"./controller.CKj9uBP3.js";/* empty css              */import"./dashboardShell.BJ8UOETr.js";import"./customers.DDv-F3VN.js";import"./maintenanceService.-sdg2Aq9.js";const R=`@page { size: A4; margin: 0; }

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
.rpt-table th { background: #f3f4f6 !important; color: #000 !important; border: 1px solid #e5e7eb; padding: 6px 8px; text-align: right; font-weight: 800; }
.rpt-table td { background: #ffffff !important; color: #000 !important; border: 1px solid #e5e7eb; padding: 6px 8px; text-align: right; }
`,j=96,P=25.4,C=210,E=297,F=Math.round(C/P*j),k=Math.round(E/P*j);function _(e="preview"){const t=document.createElement("div");t.id="reports-a4-root",t.setAttribute("dir",document.documentElement.getAttribute("dir")||"rtl"),t.setAttribute("data-render-context",e);const n=document.createElement("style");n.textContent=String(R).trim(),t.appendChild(n);const p=document.createElement("div");return p.setAttribute("data-a4-pages",""),t.appendChild(p),t}function S(){const e=document.createElement("div");e.className="rpt-header";const t=document.createElement("h1");t.textContent=l("reservations.reports.print.title","تقرير الحجوزات","Reservations report");const n=document.createElement("p");return n.className="rpt-subtitle",n.textContent=`${D(new Date)} • ${l("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,e.appendChild(t),e.appendChild(n),e}function h(e){return Number.isFinite(Number(e))?Math.round(Number(e)*100)/100:0}function M(){const e=y.lastSnapshot?.metrics||{},t=document.createElement("div");t.className="rpt-kpis";const n=(a,d)=>{const r=document.createElement("div");return r.className="rpt-kpi",r.innerHTML=`<div class="label">${a}</div><div class="value">${d??"—"}</div>`,r},p=A(e.total||0),o=u(h(e.revenue)),i=u(h(e.netProfit)),s=u(h(e.companyShareTotal)),m=u(h(e.taxTotal)),c=u(h(e.maintenanceExpense));return t.appendChild(n(l("reservations.reports.kpi.total.label","الحجوزات","Reservations"),p)),t.appendChild(n(l("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),o)),t.appendChild(n(l("reservations.reports.kpi.net.label","صافي الربح","Net profit"),i)),t.appendChild(n(l("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),s)),t.appendChild(n(l("reservations.reports.kpi.tax.label","الضريبة","Tax"),m)),t.appendChild(n(l("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),c)),t}function L(e){const t=document.createElement("table");t.className="rpt-table";const n=document.createElement("thead"),p=document.createElement("tr");e.forEach(i=>{const s=document.createElement("th");s.textContent=i,p.appendChild(s)}),n.appendChild(p);const o=document.createElement("tbody");return t.appendChild(n),t.appendChild(o),{table:t,tbody:o}}function T(e,t){const o=[];for(let i=0;i<e.length;i+=28)o.push(e.slice(i,i+28));if(o.length){const i=o[0];if(i.length>18){const s=i.splice(18);o.length>1?o[1]=s.concat(o[1]):o.push(s)}}return o}function $(e=[],{context:t="preview"}={}){const n=_(t),p=n.querySelector("[data-a4-pages]"),o=Array.isArray(e)&&e.length?e:y.lastSnapshot?.tableRows||[],i=Object.keys(o[0]||{}),s=T(o);return s.length||s.push([]),s.forEach((m,c)=>{const a=document.createElement("section");a.className=`a4-page ${c===0?"a4-page--primary":"a4-page--continuation"}`,a.style.width=`${F}px`,a.style.height=`${k}px`;const d=document.createElement("div");d.className="a4-inner",c===0&&(d.appendChild(S()),d.appendChild(M()));const{table:r,tbody:f}=L(i);m.forEach(b=>{const w=document.createElement("tr");i.forEach(g=>{const x=document.createElement("td");x.textContent=b[g]!=null?String(b[g]):"",w.appendChild(x)}),f.appendChild(w)}),d.appendChild(r),a.appendChild(d),p.appendChild(a)}),n}async function K(e=[],{action:t="save"}={}){const n=$(e,{context:"export"}),p=document.createElement("div");Object.assign(p.style,{position:"fixed",top:0,left:0,width:0,height:0,pointerEvents:"none",zIndex:-1}),p.appendChild(n),document.body.appendChild(p);try{try{await N()}catch{}let o=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF,i=window.html2canvas;if(typeof o!="function")try{await v("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"),o=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF}catch{}if(typeof i!="function")try{await v("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"),i=window.html2canvas}catch{}if(typeof o!="function"||typeof i!="function"){const a=typeof o=="function",d=typeof i=="function";throw new Error(`PDF dependencies not available (jsPDF: ${a}, html2canvas: ${d})`)}const s=new o({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),m=Math.min(2,Math.max(1.6,(window.devicePixelRatio||1)*1.25)),c=Array.from(n.querySelectorAll(".a4-page"));for(let a=0;a<c.length;a+=1){const d=c[a],f=(await i(d,{scale:m,scrollX:0,scrollY:0,backgroundColor:"#ffffff",useCORS:!0,allowTaint:!1,windowWidth:F,windowHeight:k})).toDataURL("image/jpeg",.98);a>0&&s.addPage(),s.addImage(f,"JPEG",0,0,C,E,`page-${a+1}`,"FAST"),await new Promise(b=>requestAnimationFrame(b))}if(t==="print"){const a=s.output("bloburl");await new Promise(d=>{const r=document.createElement("iframe");Object.assign(r.style,{position:"fixed",right:0,bottom:0,width:"1px",height:"1px",border:0}),r.onload=()=>{try{r.contentWindow?.focus(),r.contentWindow?.print()}catch{}setTimeout(()=>{r.remove(),d()},700)},r.src=a,document.body.appendChild(r)})}else{const a=s.output("blob"),d=URL.createObjectURL(a),r=document.createElement("a");r.href=d,r.download="reservations-report.pdf",r.rel="noopener",r.style.display="none",document.body.appendChild(r),r.click(),setTimeout(()=>{try{URL.revokeObjectURL(d),r.remove()}catch{}},1500)}}finally{p.remove()}}export{$ as buildA4ReportPages,K as exportA4ReportPdf};
