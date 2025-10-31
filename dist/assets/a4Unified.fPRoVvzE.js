import{r as C,t as r,e as I,d as T,b as _,p as M}from"./calculations.BlsvwTLx.js";import{e as q,l as F,a as H,b as X}from"./reports.CVzGpIVo.js";import"./reservationsService.DwVbVNH4.js";import"./auth.D09_E0J1.js";import"./dashboard.DJPWz-xp.js";import"./controller.rEbAQYht.js";/* empty css              */import"./dashboardShell.BTjbDc9Z.js";import"./customers.Cpz8J_vg.js";import"./maintenanceService.DLPgwUA9.js";const B=`@page { size: A4; margin: 0; }
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

/* قيم افتراضية على مستوى الصفحة لضمان سريانها على نسخ الالتقاط خارج الجذر */
.a4-page { --bubble-text-nudge: -6px; --bubble-text-nudge-inner: -0.2em; }
/* داخل الجذر: معاينة أخف وتصدير أقوى */
#reports-a4-root { --bubble-text-nudge: -3px; --bubble-text-nudge-inner: -0.06em; }
#reports-a4-root[data-render-context="export"] { --bubble-text-nudge: -6px; --bubble-text-nudge-inner: -0.2em; }
#reports-a4-root .totals-inline__item,
#reports-a4-root .totals-item--final,
#reports-a4-root .quote-table-subtotal__pill,
.a4-page .totals-inline__item,
.a4-page .totals-item--final,
.a4-page .quote-table-subtotal__pill {
  position: relative;
  transform: none;
}

/* نحافظ على الحشوات الافتراضية ونزيد الرفع فقط في التصدير */
#reports-a4-root[data-render-context="export"] .totals-inline__item { padding: 6px 12px !important; }
#reports-a4-root[data-render-context="export"] .totals-item--final { padding: 10px 16px !important; }
#reports-a4-root[data-render-context="export"] .quote-table-subtotal__pill { padding: 8px 14px !important; }

/* إن وُجدت نفس الفئات داخل تقارير A4، اضبط نصها داخلياً بوحدة em */
#reports-a4-root .totals-inline__label,
#reports-a4-root .totals-inline__slash,
#reports-a4-root .totals-inline__value,
#reports-a4-root .totals-item__label,
#reports-a4-root .totals-item__slash,
#reports-a4-root .totals-item__value,
#reports-a4-root .quote-table-subtotal__label,
#reports-a4-root .quote-table-subtotal__value,
.a4-page .totals-inline__label,
.a4-page .totals-inline__slash,
.a4-page .totals-inline__value,
.a4-page .totals-item__label,
.a4-page .totals-item__slash,
.a4-page .totals-item__value,
.a4-page .quote-table-subtotal__label,
.a4-page .quote-table-subtotal__value {
  display: inline-block;
  transform: translateY(var(--bubble-text-nudge-inner));
}

/* حاوية الصفحات */
#reports-a4-root [data-a4-pages] {
  display: flex; flex-direction: column; gap: 0; padding: 0; margin: 0; align-items: center; justify-content: flex-start;
}

/* فصل بصري بين الصفحات في المعاينة */
#reports-a4-root[data-render-context="preview"] [data-a4-pages] { gap: 18px; }
#reports-a4-root[data-render-context="preview"] .a4-page { margin: 0; overflow: visible; border: 1px solid #e5e7eb; }
#reports-a4-root[data-render-context="preview"] .a4-page + .a4-page::before {
  content: '';
  position: absolute;
  top: -9px;
  left: 14mm;
  right: 14mm;
  height: 1px;
  background: rgba(148, 163, 184, 0.5);
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

/* عنوان جدول تفاصيل الحجوزات */
.rpt-table-title {
  margin: 6mm 0 3mm;
  font-size: 13px;
  font-weight: 800;
}

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
#reports-a4-root[data-hide-outstanding] .rpt-outstanding-section { display: none !important; }
#reports-a4-root[data-hide-crew] .rpt-crew-section { display: none !important; }
#reports-a4-root[data-hide-forecast] .rpt-forecast-section { display: none !important; }

.rpt-outstanding-section { margin: 4mm 0 6mm; }
.rpt-outstanding__title { margin: 0 0 6px 0; font-size: 13px; font-weight: 800; }
.rpt-outstanding__table { width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #9ca3af; }
.rpt-outstanding__table th { background: #f3f4f6; border: 1px solid #9ca3af; padding: 6px 8px; text-align: right; }
.rpt-outstanding__table td { border: 1px solid #9ca3af; padding: 6px 8px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; vertical-align: middle; }

/* طاقم: جدول وقسم */
.rpt-crew-section { margin: 4mm 0 6mm; }
.rpt-crew__title { margin: 0 0 6px 0; font-size: 13px; font-weight: 800; }
.rpt-crew__table { width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #9ca3af; }
.rpt-crew__table th { background: #f3f4f6; border: 1px solid #9ca3af; padding: 6px 8px; text-align: right; }
.rpt-crew__table td { border: 1px solid #9ca3af; padding: 6px 8px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; vertical-align: middle; }

/* توقعات الدفعات */
.rpt-forecast-section { margin: 4mm 0 6mm; }
.rpt-forecast__title { margin: 0 0 6px 0; font-size: 13px; font-weight: 800; }
.rpt-forecast__table { width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #9ca3af; }
.rpt-forecast__table th { background: #f3f4f6; border: 1px solid #9ca3af; padding: 6px 8px; text-align: right; }
.rpt-forecast__table td { border: 1px solid #9ca3af; padding: 6px 8px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; vertical-align: middle; }

/* قواعد الطباعة لتفادي الصفحات الفارغة في iOS/Safari */
@media print {
  /* لا تستخدم Flex للحاوية أثناء الطباعة لتجنب حسابات الارتفاع غير الدقيقة */
  #reports-a4-root [data-a4-pages] { display: block !important; }
  /* أجبر فاصل صفحة بعد كل صفحة ما عدا الأخيرة */
  .a4-page { page-break-after: always; break-after: page; }
  .a4-page:last-child { page-break-after: auto; break-after: auto; }
  /* لا تسمح بتقسيم محتويات صفحة واحدة بين صفحتين */
  .a4-page, .a4-inner { break-inside: avoid; -webkit-column-break-inside: avoid; }
}
`,O=96,D=25.4,z=210,$=297,k=Math.round(z/D*O),N=Math.round($/D*O);function G(){try{return{header:localStorage.getItem("reportsPdf.hide.header")==="1",kpis:localStorage.getItem("reportsPdf.hide.kpis")==="1",revenue:localStorage.getItem("reportsPdf.hide.revenue")==="1",outstanding:localStorage.getItem("reportsPdf.hide.outstanding")==="1",crew:localStorage.getItem("reportsPdf.hide.crew")==="1",forecast:localStorage.getItem("reportsPdf.hide.forecast")==="1"}}catch{return{header:!1,kpis:!1,revenue:!1}}}function W(t,e){!t||!e||(t.toggleAttribute("data-hide-header",!!e.header),t.toggleAttribute("data-hide-kpis",!!e.kpis),t.toggleAttribute("data-hide-revenue",!!e.revenue),t.toggleAttribute("data-hide-outstanding",!!e.outstanding),t.toggleAttribute("data-hide-crew",!!e.crew),t.toggleAttribute("data-hide-forecast",!!e.forecast))}function J(t="preview"){const e=document.createElement("div");e.id="reports-a4-root",e.setAttribute("dir",document.documentElement.getAttribute("dir")||"rtl"),e.setAttribute("data-render-context",t);const n=document.createElement("style");n.textContent=String(B).trim(),e.appendChild(n);const s=document.createElement("div");return s.setAttribute("data-a4-pages",""),e.appendChild(s),W(e,G()),e}function K(){const t=document.createElement("div");t.className="rpt-header";const e=document.createElement("div");e.className="rpt-header-top";const n=document.createElement("div");n.className="rpt-titleblock";const s=document.createElement("h1");s.textContent=r("reservations.reports.print.title","تقرير الحجوزات","Reservations report");const i=document.createElement("p");i.className="rpt-subtitle",i.textContent=`${I(new Date)} • ${r("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,n.appendChild(s),n.appendChild(i);const p=document.createElement("img");return p.className="rpt-logo",p.alt="Logo",p.decoding="async",p.loading="lazy",p.src=U(),e.appendChild(n),e.appendChild(p),t.appendChild(e),t}function E(t){return Number.isFinite(Number(t))?Math.round(Number(t)*100)/100:0}function V(){const t=C.lastSnapshot?.metrics||{},e=document.createElement("div");e.className="rpt-kpis";const n=(l,f)=>{const u=document.createElement("div");return u.className="rpt-kpi",u.innerHTML=`<div class="label">${l}</div><div class="value">${f??"—"}</div>`,u},s=T(t.total||0),i=_(E(t.revenue)),p=_(E(t.netProfit)),m=_(E(t.companyShareTotal)),b=_(E(t.taxTotal)),o=_(E(t.maintenanceExpense));return e.appendChild(n(r("reservations.reports.kpi.total.label","الحجوزات","Reservations"),s)),e.appendChild(n(r("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),i)),e.appendChild(n(r("reservations.reports.kpi.net.label","صافي الربح","Net profit"),p)),e.appendChild(n(r("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),m)),e.appendChild(n(r("reservations.reports.kpi.tax.label","الضريبة","Tax"),b)),e.appendChild(n(r("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),o)),e}function Y(){const t=C.lastSnapshot?.metrics||{},e=document.createElement("section");e.className="rpt-revenue-section";const n=document.createElement("h4");n.className="rpt-revenue__title",n.textContent=r("reservations.reports.kpi.revenue.details.title","تفاصيل الإيرادات","Revenue details");const s=document.createElement("div");s.className="rpt-revenue";const i=(m,b)=>{const o=document.createElement("div");o.className="rpt-revenue__item";const l=document.createElement("span");l.className="rpt-revenue__label",l.textContent=m;const f=document.createElement("strong");f.className="rpt-revenue__value",f.textContent=b,o.appendChild(l),o.appendChild(f),s.appendChild(o)},p=m=>_(E(m||0));return i(r("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),p(t.revenue)),i(r("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),p(t.companyShareTotal)),i(r("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),p(t.taxTotal)),i(r("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),p(t.crewTotal)),i(r("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),p(t.crewCostTotal)),Number.isFinite(Number(t.maintenanceExpense))&&i(r("reservations.reports.kpi.revenue.details.maintenance","مصاريف الصيانة","Maintenance"),p(t.maintenanceExpense)),i(r("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),p(t.netProfit)),e.appendChild(n),e.appendChild(s),e}function Z(){const t=(C.lastSnapshot?.outstanding||[]).slice(0,6),e=document.createElement("section");e.className="rpt-outstanding-section";const n=document.createElement("h4");if(n.className="rpt-outstanding__title",n.textContent=r("reservations.reports.topOutstanding.title","أعلى المستحقات","Top outstanding"),e.appendChild(n),!t.length){const m=document.createElement("p");return m.style.fontSize="11px",m.style.opacity=".8",m.textContent=r("reservations.reports.table.emptyPeriod","لا توجد بيانات في هذه الفترة.","No data for this period."),e.appendChild(m),e}const s=document.createElement("table");s.className="rpt-outstanding__table";const i=document.createElement("thead");document.createElement("tr"),["الحجز / العميل","حالة الدفع","المستحق"].forEach((m,b)=>{const o=document.createElement("th"),l=b===0?r("reservations.reports.topOutstanding.headers.reservation","الحجز / العميل","Reservation / Customer"):b===1?r("reservations.reports.topOutstanding.headers.status","حالة الدفع","Payment status"):r("reservations.reports.topOutstanding.headers.amount","المستحق","Outstanding");o.textContent=l,i.appendChild(o)});const p=document.createElement("tbody");return t.forEach(m=>{const b=document.createElement("tr"),o=document.createElement("td");o.textContent=`#${m.code} — ${m.customer||""}`,b.appendChild(o);const l=document.createElement("td");l.textContent=M(m.paidStatus),b.appendChild(l);const f=document.createElement("td");f.textContent=_(m.outstanding),b.appendChild(f),p.appendChild(b)}),s.appendChild(i),s.appendChild(p),e.appendChild(s),e}function Q(){const t=(C.lastSnapshot?.crewWork||[]).slice(0,12),e=document.createElement("section");e.className="rpt-crew-section";const n=document.createElement("h4");if(n.className="rpt-crew__title",n.textContent=r("reservations.reports.crew.title","تقرير عمل الطاقم","Crew work report"),e.appendChild(n),!t.length){const o=document.createElement("p");return o.style.fontSize="11px",o.style.opacity=".8",o.textContent=r("reservations.reports.table.emptyPeriod","لا توجد بيانات في هذه الفترة.","No data for this period."),e.appendChild(o),e}const s=document.createElement("table");s.className="rpt-crew__table";const i=document.createElement("thead"),p=document.createElement("tr");[r("reservations.reports.crew.headers.technician","الفني","Technician"),r("reservations.reports.crew.headers.days","أيام العمل","Work days"),r("reservations.reports.crew.headers.billable","فوتر الطاقم","Crew billable"),r("reservations.reports.crew.headers.cost","تكلفة الطاقم","Crew cost"),r("reservations.reports.crew.headers.net","صافي المساهمة","Net contribution")].forEach(o=>{const l=document.createElement("th");l.textContent=o,p.appendChild(l)}),i.appendChild(p);const b=document.createElement("tbody");return t.forEach(o=>{const l=document.createElement("tr");[o.name||String(o.id||""),T(o.days||0),_(o.billable||0),_(o.cost||0),_((o.billable||0)-(o.cost||0))].forEach(u=>{const c=document.createElement("td");c.textContent=u,l.appendChild(c)}),b.appendChild(l)}),s.appendChild(i),s.appendChild(b),e.appendChild(s),e}function ee(){const t=Array.isArray(C.lastSnapshot?.paymentForecast)?C.lastSnapshot.paymentForecast.slice(0,16):[],e=document.createElement("section");e.className="rpt-forecast-section";const n=document.createElement("h4");if(n.className="rpt-forecast__title",n.textContent=r("reservations.reports.forecast.title","خريطة الدفعات القادمة","Upcoming payments"),e.appendChild(n),!t.length){const o=document.createElement("p");return o.style.fontSize="11px",o.style.opacity=".8",o.textContent=r("reservations.reports.table.emptyPeriod","لا توجد بيانات في هذه الفترة.","No data for this period."),e.appendChild(o),e}const s=document.createElement("table");s.className="rpt-forecast__table";const i=document.createElement("thead"),p=document.createElement("tr");[r("reservations.reports.forecast.headers.date","التاريخ","Date"),r("reservations.reports.forecast.headers.count","عدد الحجوزات","Count"),r("reservations.reports.forecast.headers.amount","المبلغ المتوقع","Expected amount")].forEach(o=>{const l=document.createElement("th");l.textContent=o,p.appendChild(l)}),i.appendChild(p);const b=document.createElement("tbody");return t.forEach(o=>{const l=document.createElement("tr");[o.date||"",T(o.count||0),_(o.amount||0)].forEach(u=>{const c=document.createElement("td");c.textContent=u,l.appendChild(c)}),b.appendChild(l)}),s.appendChild(i),s.appendChild(b),e.appendChild(s),e}function te(t){const e=document.createElement("table");e.className="rpt-table";const n=document.createElement("thead"),s=document.createElement("tr");t.forEach(p=>{const m=document.createElement("th");m.textContent=p,s.appendChild(m)}),n.appendChild(s);const i=document.createElement("tbody");return e.appendChild(n),e.appendChild(i),{table:e,tbody:i}}function ne(t,e,n){const s=t.querySelector("[data-a4-pages]"),i=c=>{const v=document.createElement("section");v.className=`a4-page ${c===0?"a4-page--primary":"a4-page--continuation"}`,v.style.width=`${k}px`,v.style.height=`${N}px`;const g=document.createElement("div");if(g.className="a4-inner",c===0){g.appendChild(K()),g.appendChild(V()),g.appendChild(Y()),g.appendChild(Z()),g.appendChild(ee()),g.appendChild(Q());const d=document.createElement("h4");d.className="rpt-table-title",d.textContent=r("reservations.reports.results.title","تفاصيل الحجوزات","Reservations details"),g.appendChild(d)}const{table:w,tbody:a}=te(n);return g.appendChild(w),v.appendChild(g),s.appendChild(v),{page:v,table:w,tbody:a}},p=(c,v)=>{const g=document.createElement("tr");return n.forEach(w=>{const a=document.createElement("td"),d=document.createElement("div");d.className="rpt-cell",d.textContent=v[w]!=null?String(v[w]):"",a.appendChild(d),g.appendChild(a)}),c.appendChild(g),g},m=(c,v)=>{try{const w=(c.querySelector(".a4-inner")||c).getBoundingClientRect(),a=v.lastElementChild;if(!a)return!0;const d=a.getBoundingClientRect(),h=w.bottom-1;return d.bottom<=h}catch{return!0}};let b=0,{page:o,table:l,tbody:f}=i(b),u=0;for(let c=0;c<e.length;c+=1){const v=p(f,e[c]);if(m(o,f))u+=1;else{if(v.remove(),u===0)try{l.remove();const g=o.querySelector(".rpt-table-title");({page:o,table:l,tbody:f}=i(++b)),g&&(o.querySelector(".a4-inner")||o).insertBefore(g,l),p(f,e[c]),u=1;continue}catch{}({page:o,table:l,tbody:f}=i(++b)),p(f,e[c]),u=1}}}function ae(t=""){const e=String(t||"").toLowerCase();return/الحجز|reservation/.test(e)||/العميل|customer/.test(e)||/التاريخ|date/.test(e)||/الحالة|status/.test(e)||/الدفع|payment/.test(e)||/الإجمالي|total/.test(e)}function j(t=[]){try{const e=new Set;return t.forEach(n=>{const s=`reportsPdf.column.${n}`,i=localStorage.getItem(s);i==null?ae(n)&&e.add(n):i==="1"&&e.add(n)}),e.size===0&&t.forEach(n=>e.add(n)),e}catch{return new Set(t)}}function L(t,e,n){if(!n)return t;const s=n.showPaid??!0,i=n.showPartial??!0,p=n.showUnpaid??!0,m=n.showConfirmed??!0,b=n.showPending??!0,o=n.showCompleted??!0,l=n.showCancelled??!0,f=e.find(a=>/الحالة|status/i.test(a))||null,u=e.find(a=>/الدفع|payment/i.test(a))||null;if(!f&&!u)return t;const c=a=>/جزئ|partial/i.test(String(a||"")),v=a=>/مدفوعة|مدفوع|paid/i.test(String(a||""))&&!c(a),g=a=>/غير مدفوعة|غير مدفوع|unpaid/i.test(String(a||"")),w=a=>{const d=String(a||"").toLowerCase();return/completed|منته/.test(d)?"completed":/confirmed|مؤكد/.test(d)?"confirmed":/pending|غير مؤكد|قيد التأكيد/.test(d)?"pending":/cancel|ملغ/.test(d)?"cancelled":"other"};return t.filter(a=>{let d=!0;if(u){const h=a[u];!s&&v(h)&&(d=!1),!i&&c(h)&&(d=!1),!p&&g(h)&&(d=!1)}if(f){const h=w(a[f]);!o&&h==="completed"&&(d=!1),!m&&h==="confirmed"&&(d=!1),!b&&h==="pending"&&(d=!1),!l&&h==="cancelled"&&(d=!1)}return d})}function A(t=[],{context:e="preview",columns:n,rowFilters:s}={}){const i=J(e),p=Array.isArray(t)&&t.length?t:C.lastSnapshot?.tableRows||[];let m=Object.keys(p[0]||{});const b=n&&n.length?new Set(n):j(m);m=m.filter(f=>b.has(f));const o=L(p,m,s),l=document.createElement("div");Object.assign(l.style,{position:"fixed",left:0,top:0,width:`${k}px`,height:"0",pointerEvents:"none",zIndex:-1,visibility:"hidden"}),document.body.appendChild(l),l.appendChild(i);try{ne(i,o,m)}finally{try{i.parentElement?.removeChild(i)}catch{}try{l.parentElement?.removeChild(l)}catch{}}return i}async function fe(t=[],{action:e="save",strict:n=!1,popupWindow:s=null}={}){const i={showPaid:localStorage.getItem("reportsPdf.rows.paid")!=="0",showPartial:localStorage.getItem("reportsPdf.rows.partial")!=="0",showUnpaid:localStorage.getItem("reportsPdf.rows.unpaid")!=="0",showConfirmed:localStorage.getItem("reportsPdf.rows.confirmed")!=="0",showPending:localStorage.getItem("reportsPdf.rows.pending")!=="0",showCompleted:localStorage.getItem("reportsPdf.rows.completed")!=="0",showCancelled:localStorage.getItem("reportsPdf.rows.cancelled")!=="0"},p=A(t,{context:"export",rowFilters:i}),m=document.createElement("div");Object.assign(m.style,{position:"fixed",top:0,left:0,width:0,height:0,pointerEvents:"none",zIndex:-1}),m.appendChild(p),document.body.appendChild(m);try{if(n||localStorage.getItem("reportsPdf.strict")==="on"){const a=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${r("reservations.reports.print.title","تقرير الحجوزات","Reservations report")}</title><style>@page{size:A4;margin:0;}html,body{margin:0;padding:0;background:#fff;direction:rtl;text-align:right;}#reports-a4-root{width:${k}px;height:auto} .a4-page{width:${k}px;height:${N}px} @media print { [data-a4-pages]{display:block!important}.a4-page{page-break-after:always;break-after:page}.a4-page:last-child{page-break-after:auto;break-after:auto}.a4-page,.a4-inner{break-inside:avoid;-webkit-column-break-inside:avoid} }</style></head><body></body></html>`;if(s&&typeof s.document?.open=="function"){const x=s.document;try{x.open(),x.write(a),x.close()}catch{}try{const y=p.cloneNode(!0);x.body.appendChild(y),x.fonts?.ready&&await x.fonts.ready}catch{}await new Promise(y=>setTimeout(y,60));try{s.focus(),s.print()}catch{}setTimeout(()=>{try{s.close()}catch{}},1500);return}await new Promise(x=>setTimeout(x,0));const d=document.createElement("iframe");Object.assign(d.style,{position:"fixed",width:"1px",height:"1px",right:"0",bottom:"0",border:"0",opacity:"0",pointerEvents:"none"}),document.body.appendChild(d);const h=d.contentWindow?.document;try{h.open(),h.write(a),h.close()}catch{}try{const x=p.cloneNode(!0);h.body.appendChild(x),h.fonts?.ready&&await h.fonts.ready}catch{}await new Promise(x=>setTimeout(x,60));try{d.contentWindow?.focus(),d.contentWindow?.print()}catch{}setTimeout(()=>{try{d.remove()}catch{}},1500);return}try{await q()}catch{}let o=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF,l=window.html2canvas;if(typeof o!="function")try{await F("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"),o=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF}catch{}if(typeof l!="function")try{await F("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"),l=window.html2canvas}catch{}if(typeof o!="function"||typeof l!="function"){const a=typeof o=="function",d=typeof l=="function";throw new Error(`PDF dependencies not available (jsPDF: ${a}, html2canvas: ${d})`)}const f=new o({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),u=Math.min(2,Math.max(1.6,(window.devicePixelRatio||1)*1.25)),c=(()=>{try{const a=t&&t[0]?Object.keys(t[0]):Object.keys(C.lastSnapshot?.tableRows?.[0]||{}),d=j(a);return a.filter(h=>d.has(h))}catch{return null}})(),v={showPaid:localStorage.getItem("reportsPdf.rows.paid")!=="0",showUnpaid:localStorage.getItem("reportsPdf.rows.unpaid")!=="0",showConfirmed:localStorage.getItem("reportsPdf.rows.confirmed")!=="0",showPending:localStorage.getItem("reportsPdf.rows.pending")!=="0",showCompleted:localStorage.getItem("reportsPdf.rows.completed")!=="0"},g=A(t,{context:"export",columns:c||void 0,rowFilters:v});m.innerHTML="",m.appendChild(g);const w=Array.from(g.querySelectorAll(".a4-page"));for(let a=0;a<w.length;a+=1){const d=w[a],x=(await l(d,{scale:u,scrollX:0,scrollY:0,backgroundColor:"#ffffff",useCORS:!0,allowTaint:!1,windowWidth:k,windowHeight:N,letterRendering:!0,imageTimeout:0})).toDataURL("image/jpeg",.98);a>0&&f.addPage(),f.addImage(x,"JPEG",0,0,z,$,`page-${a+1}`,"FAST"),await new Promise(y=>requestAnimationFrame(y))}if(e==="print"){const a=f.output("bloburl");await new Promise(d=>{const h=document.createElement("iframe");Object.assign(h.style,{position:"fixed",right:0,bottom:0,width:"1px",height:"1px",border:0}),h.onload=()=>{try{h.contentWindow?.focus(),h.contentWindow?.print()}catch{}setTimeout(()=>{h.remove(),d()},700)},h.src=a,document.body.appendChild(h)})}else{const a=f.output("blob"),d=URL.createObjectURL(a),h=document.createElement("a");h.href=d,h.download="reservations-report.pdf",h.rel="noopener",h.style.display="none",document.body.appendChild(h),h.click(),setTimeout(()=>{try{URL.revokeObjectURL(d),h.remove()}catch{}},1500)}}finally{m.remove()}}async function ge(t=[]){await H();const e=window.XLSX;if(!e)throw new Error("XLSX dependency not available");const n=t&&t[0]?Object.keys(t[0]):Object.keys(C.lastSnapshot?.tableRows?.[0]||{}),s=j(n),i=n.filter(d=>s.has(d)),p={showPaid:localStorage.getItem("reportsPdf.rows.paid")!=="0",showPartial:localStorage.getItem("reportsPdf.rows.partial")!=="0",showUnpaid:localStorage.getItem("reportsPdf.rows.unpaid")!=="0",showConfirmed:localStorage.getItem("reportsPdf.rows.confirmed")!=="0",showPending:localStorage.getItem("reportsPdf.rows.pending")!=="0",showCompleted:localStorage.getItem("reportsPdf.rows.completed")!=="0",showCancelled:localStorage.getItem("reportsPdf.rows.cancelled")!=="0"},m=Array.isArray(t)&&t.length?t:C.lastSnapshot?.tableRows||[],b=L(m,i,p),o=r("reservations.reports.print.title","تقرير الحجوزات","Reservations report"),l=`${I(new Date)} • ${r("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,f=C.lastSnapshot?.metrics||{},u=[];u.push([o]),u.push([l]),u.push([]),u.push([r("reservations.reports.kpi.total.label","إجمالي الحجوزات","Total"),String(f.total??0),r("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),String(f.revenue??0),r("reservations.reports.kpi.net.label","صافي الربح","Net"),String(f.netProfit??0)]),u.push([r("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),String(f.companyShareTotal??0),r("reservations.reports.kpi.tax.label","الضريبة","Tax"),String(f.taxTotal??0),r("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),String(f.maintenanceExpense??0)]),u.push([]),u.push(i),b.forEach(d=>{const h=i.map(x=>d[x]!=null?String(d[x]):"");u.push(h)});const c=e.utils.aoa_to_sheet(u);c["!merges"]||(c["!merges"]=[]);const v=Math.max(1,i.length)-1;c["!merges"].push({s:{r:0,c:0},e:{r:0,c:Math.max(3,v)}}),c["!merges"].push({s:{r:1,c:0},e:{r:1,c:Math.max(3,v)}});const g=i.map((d,h)=>{let y=(d||"").length+2;for(let P=7;P<u.length;P+=1){const S=u[P][h]||"";y=Math.max(y,String(S).length)}return{wch:Math.min(40,Math.max(10,y))}});c["!cols"]=g;const w=e.utils.book_new();e.utils.book_append_sheet(w,c,r("reservations.reports.export.sheetName","الحجوزات","Reservations"));const a=`${r("reservations.reports.export.filePrefix","تقرير-الحجوزات","reservations-report")}.xlsx`;e.writeFile(w,a)}async function be(t=[]){const e=t&&t[0]?Object.keys(t[0]):Object.keys(C.lastSnapshot?.tableRows?.[0]||{}),n=j(e),s=e.filter(g=>n.has(g)),i={showPaid:localStorage.getItem("reportsPdf.rows.paid")!=="0",showPartial:localStorage.getItem("reportsPdf.rows.partial")!=="0",showUnpaid:localStorage.getItem("reportsPdf.rows.unpaid")!=="0",showConfirmed:localStorage.getItem("reportsPdf.rows.confirmed")!=="0",showPending:localStorage.getItem("reportsPdf.rows.pending")!=="0",showCompleted:localStorage.getItem("reportsPdf.rows.completed")!=="0",showCancelled:localStorage.getItem("reportsPdf.rows.cancelled")!=="0"},p=Array.isArray(t)&&t.length?t:C.lastSnapshot?.tableRows||[],m=L(p,s,i),b=r("reservations.reports.print.title","تقرير الحجوزات","Reservations report"),o=`${I(new Date)} • ${r("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,l=C.lastSnapshot?.metrics||{},f=U(),u=g=>{const w=String(g??"");return/[",\n]/.test(w)?'"'+w.replace(/"/g,'""')+'"':w},c=[];c.push(u(b)),c.push(u(o)),c.push(`Logo,${u(f)}`),c.push(""),c.push([r("reservations.reports.kpi.total.label","إجمالي الحجوزات","Total"),l.total??0,r("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),l.revenue??0,r("reservations.reports.kpi.net.label","صافي الربح","Net"),l.netProfit??0].map(u).join(",")),c.push([r("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),l.companyShareTotal??0,r("reservations.reports.kpi.tax.label","الضريبة","Tax"),l.taxTotal??0,r("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),l.maintenanceExpense??0].map(u).join(",")),c.push(""),c.push(s.map(u).join(",")),m.forEach(g=>{const w=s.map(a=>u(g[a]!=null?g[a]:""));c.push(w.join(","))});let v=!1;try{await X();const g=window.JSZip;if(g){const w=new g,a=r("reservations.reports.export.filePrefix","تقرير-الحجوزات","reservations-report"),d=["\uFEFF"+c.slice(0,c.indexOf(s.map(u).join(","))).join(`
`)],h=["\uFEFF"+[s.map(u).join(","),...m.map(S=>s.map(R=>u(S[R]??"")).join(","))].join(`
`)];w.file(`${a}-metadata.csv`,d.join("")),w.file(`${a}.csv`,h.join(""));try{const R=await(await fetch(f,{mode:"cors"})).blob();w.file("logo.png",R)}catch{}const x=await w.generateAsync({type:"blob"}),y=URL.createObjectURL(x),P=document.createElement("a");P.href=y,P.download=`${a}.zip`,P.style.display="none",document.body.appendChild(P),P.click(),setTimeout(()=>{URL.revokeObjectURL(y),P.remove()},1500),v=!0}}catch{}if(!v){const g=new Blob(["\uFEFF"+c.join(`
`)],{type:"text/csv;charset=utf-8"}),w=URL.createObjectURL(g),a=document.createElement("a");a.href=w,a.download=`${r("reservations.reports.export.filePrefix","تقرير-الحجوزات","reservations-report")}.csv`,a.style.display="none",document.body.appendChild(a),a.click(),setTimeout(()=>{URL.revokeObjectURL(w),a.remove()},1500)}}const oe="https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png";function U(){try{const t=localStorage.getItem("reportsPdf.logoUrl");if(t&&/^https?:|^data:|^blob:/.test(t))return t}catch{}return oe}export{A as buildA4ReportPages,be as exportA4ReportCsv,ge as exportA4ReportExcel,fe as exportA4ReportPdf};
