const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./reports.DIP6tOKm.js","./dashboard.DZX-a1Xo.js","./controller.CKj9uBP3.js","./auth.DEm-O4iH.js","./auth.BYuXtjTf.css","./reservationsService.DHFcI6wO.js","./dashboardShell.BJ8UOETr.js","./customers.DDv-F3VN.js","./index.CUo9sM62.css","./calculations.Cuzjzmo7.js","./maintenanceService.-sdg2Aq9.js"])))=>i.map(i=>d[i]);
import{_ as k}from"./dashboard.DZX-a1Xo.js";import{r as x,t as l,e as A}from"./calculations.Cuzjzmo7.js";import"./controller.CKj9uBP3.js";import"./auth.DEm-O4iH.js";import"./reservationsService.DHFcI6wO.js";/* empty css              */import"./dashboardShell.BJ8UOETr.js";import"./customers.DDv-F3VN.js";const _=`@page { size: A4; margin: 0; }

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

`,w=96,v=25.4,y=210,C=297,E=Math.round(y/v*w),P=Math.round(C/v*w);function R(e="preview"){const t=document.createElement("div");t.id="reports-a4-root",t.setAttribute("dir",document.documentElement.getAttribute("dir")||"rtl"),t.setAttribute("data-render-context",e);const n=document.createElement("style");n.textContent=String(_).trim(),t.appendChild(n);const a=document.createElement("div");return a.setAttribute("data-a4-pages",""),t.appendChild(a),t}function F(){const e=document.createElement("div");e.className="rpt-header";const t=document.createElement("h1");t.textContent=l("reservations.reports.print.title","تقرير الحجوزات","Reservations report");const n=document.createElement("p");return n.className="rpt-subtitle",n.textContent=`${A(new Date)} • ${l("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,e.appendChild(t),e.appendChild(n),e}function S(){const e=x.lastSnapshot?.metrics||{},t=document.createElement("div");t.className="rpt-kpis";const n=(r,i)=>{const o=document.createElement("div");return o.className="rpt-kpi",o.innerHTML=`<div class="label">${r}</div><div class="value">${i??"—"}</div>`,o},a=(r,i)=>{const o=e[r];return o==null||o===""?i:String(o)};return t.appendChild(n(l("reservations.reports.kpi.total.label","الحجوزات","Reservations"),a("total","0"))),t.appendChild(n(l("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),a("revenueFormatted",e.revenue))),t.appendChild(n(l("reservations.reports.kpi.net.label","صافي الربح","Net profit"),a("netProfitFormatted",e.netProfit))),t.appendChild(n(l("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),a("companyShareTotalFormatted",e.companyShareTotal))),t.appendChild(n(l("reservations.reports.kpi.tax.label","الضريبة","Tax"),a("taxTotalFormatted",e.taxTotal))),t.appendChild(n(l("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),a("maintenanceExpenseFormatted",e.maintenanceExpense))),t}function j(e){const t=document.createElement("table");t.className="rpt-table";const n=document.createElement("thead"),a=document.createElement("tr");e.forEach(i=>{const o=document.createElement("th");o.textContent=i,a.appendChild(o)}),n.appendChild(a);const r=document.createElement("tbody");return t.appendChild(n),t.appendChild(r),{table:t,tbody:r}}function T(e,t){const r=[];for(let i=0;i<e.length;i+=28)r.push(e.slice(i,i+28));if(r.length){const i=r[0];if(i.length>18){const o=i.splice(18);r.length>1?r[1]=o.concat(r[1]):r.push(o)}}return r}function M(e=[],{context:t="preview"}={}){const n=R(t),a=n.querySelector("[data-a4-pages]"),r=Array.isArray(e)&&e.length?e:x.lastSnapshot?.tableRows||[],i=Object.keys(r[0]||{}),o=T(r);return o.length||o.push([]),o.forEach((u,c)=>{const p=document.createElement("section");p.className=`a4-page ${c===0?"a4-page--primary":"a4-page--continuation"}`,p.style.width=`${E}px`,p.style.height=`${P}px`;const d=document.createElement("div");d.className="a4-inner",c===0&&(d.appendChild(F()),d.appendChild(S()));const{table:s,tbody:m}=j(i);u.forEach(h=>{const f=document.createElement("tr");i.forEach(g=>{const b=document.createElement("td");b.textContent=h[g]!=null?String(h[g]):"",f.appendChild(b)}),m.appendChild(f)}),d.appendChild(s),p.appendChild(d),a.appendChild(p)}),n}async function U(e=[],{action:t="save"}={}){const n=M(e,{context:"export"}),a=document.createElement("div");Object.assign(a.style,{position:"fixed",top:0,left:0,width:0,height:0,pointerEvents:"none",zIndex:-1}),a.appendChild(n),document.body.appendChild(a);try{window.html2pdf||await(await k(()=>import("./reports.DIP6tOKm.js").then(d=>d.a),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]),import.meta.url)).ensureHtml2Pdf();const r=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF,i=window.html2canvas;if(typeof r!="function"||typeof i!="function")throw new Error("PDF dependencies not available");const o=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),u=Math.min(2,Math.max(1.6,(window.devicePixelRatio||1)*1.25)),c=Array.from(n.querySelectorAll(".a4-page"));for(let p=0;p<c.length;p+=1){const d=c[p],m=(await i(d,{scale:u,scrollX:0,scrollY:0,backgroundColor:"#ffffff",useCORS:!0,allowTaint:!1,windowWidth:E,windowHeight:P})).toDataURL("image/jpeg",.98);p>0&&o.addPage(),o.addImage(m,"JPEG",0,0,y,C,`page-${p+1}`,"FAST"),await new Promise(h=>requestAnimationFrame(h))}if(t==="print"){const p=o.output("bloburl");await new Promise(d=>{const s=document.createElement("iframe");Object.assign(s.style,{position:"fixed",right:0,bottom:0,width:"1px",height:"1px",border:0}),s.onload=()=>{try{s.contentWindow?.focus(),s.contentWindow?.print()}catch{}setTimeout(()=>{s.remove(),d()},700)},s.src=p,document.body.appendChild(s)})}else{const p=o.output("blob"),d=URL.createObjectURL(p),s=document.createElement("a");s.href=d,s.download="reservations-report.pdf",s.rel="noopener",s.style.display="none",document.body.appendChild(s),s.click(),setTimeout(()=>{try{URL.revokeObjectURL(d),s.remove()}catch{}},1500)}}finally{a.remove()}}export{M as buildA4ReportPages,U as exportA4ReportPdf};
