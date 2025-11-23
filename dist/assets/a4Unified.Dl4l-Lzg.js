import{r as _,t as s,e as q,l as A,k as I,g as L,h as C,p as H,a as X,K as G}from"./calculations.8elUez8P.js";import"./reservationsService.WomhPM7H.js";import"./auth.Dj0aj3LA.js";import"./state.BaAA-ODE.js";const B=`@page { size: A4; margin: 0; }
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
.a4-page { --bubble-text-nudge: -8px; --bubble-text-nudge-inner: -0.28em; }
/* داخل الجذر: معاينة أخف وتصدير أقوى */
#reports-a4-root { --bubble-text-nudge: -3px; --bubble-text-nudge-inner: -0.06em; }
#reports-a4-root[data-render-context="export"] { --bubble-text-nudge: -8px; --bubble-text-nudge-inner: -0.28em; }
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
`,D=96,z=25.4,$=210,U=297,j=Math.round($/z*D),T=Math.round(U/z*D);function S(t){try{return t&&String(t).replace(/(\d{1,3}(?:,\d{3})*)\.00(?=\s*SR\b)/g,"$1")}catch{return t}}function W(){try{return{header:localStorage.getItem("reportsPdf.hide.header")==="1",kpis:localStorage.getItem("reportsPdf.hide.kpis")==="1",revenue:localStorage.getItem("reportsPdf.hide.revenue")==="1",outstanding:localStorage.getItem("reportsPdf.hide.outstanding")==="1",crew:localStorage.getItem("reportsPdf.hide.crew")==="1",forecast:localStorage.getItem("reportsPdf.hide.forecast")==="1"}}catch{return{header:!1,kpis:!1,revenue:!1}}}function J(t,e){!t||!e||(t.toggleAttribute("data-hide-header",!!e.header),t.toggleAttribute("data-hide-kpis",!!e.kpis),t.toggleAttribute("data-hide-revenue",!!e.revenue),t.toggleAttribute("data-hide-outstanding",!!e.outstanding),t.toggleAttribute("data-hide-crew",!!e.crew),t.toggleAttribute("data-hide-forecast",!!e.forecast))}function K(t="preview"){const e=document.createElement("div");e.id="reports-a4-root",e.setAttribute("dir",document.documentElement.getAttribute("dir")||"rtl"),e.setAttribute("data-render-context",t);const n=document.createElement("style");n.textContent=String(B).trim(),e.appendChild(n);const o=document.createElement("div");return o.setAttribute("data-a4-pages",""),e.appendChild(o),J(e,W()),e}function V(){const t=document.createElement("div");t.className="rpt-header";const e=document.createElement("div");e.className="rpt-header-top";const n=document.createElement("div");n.className="rpt-titleblock";const o=document.createElement("h1");o.textContent=s("reservations.reports.print.title","تقرير الحجوزات","Reservations report");const d=document.createElement("p");d.className="rpt-subtitle",d.textContent=`${I(new Date)} • ${s("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,n.appendChild(o),n.appendChild(d);const m=document.createElement("img");return m.className="rpt-logo",m.alt="Logo",m.decoding="async",m.loading="lazy",m.src=M(),e.appendChild(n),e.appendChild(m),t.appendChild(e),t}function E(t){return Number.isFinite(Number(t))?Math.round(Number(t)*100)/100:0}function Z({context:t="preview"}={}){const e=_.lastSnapshot?.metrics||{},n=document.createElement("div");n.className="rpt-kpis";const o=(i,g)=>{const v=document.createElement("div");return v.className="rpt-kpi",v.innerHTML=`<div class="label">${i}</div><div class="value">${g??s("common.placeholder.empty","—","—")}</div>`,v},d=L(e.total||0),m=C(E(e.revenue)),h=C(E(e.netProfit)),w=C(E(e.companyShareTotal)),u=C(E(e.taxTotal)),a=C(E(e.maintenanceExpense)),p=i=>t==="export"?S(i):i;return n.appendChild(o(s("reservations.reports.kpi.total.label","الحجوزات","Reservations"),d)),n.appendChild(o(s("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),p(m))),n.appendChild(o(s("reservations.reports.kpi.net.label","صافي الربح","Net profit"),p(h))),n.appendChild(o(s("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),p(w))),n.appendChild(o(s("reservations.reports.kpi.tax.label","الضريبة","Tax"),p(u))),n.appendChild(o(s("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),p(a))),n}function Y({context:t="preview"}={}){const e=_.lastSnapshot?.metrics||{},n=document.createElement("section");n.className="rpt-revenue-section";const o=document.createElement("h4");o.className="rpt-revenue__title",o.textContent=s("reservations.reports.kpi.revenue.details.title","تفاصيل الإيرادات","Revenue details");const d=document.createElement("div");d.className="rpt-revenue";const m=(w,u)=>{const a=document.createElement("div");a.className="rpt-revenue__item";const p=document.createElement("span");p.className="rpt-revenue__label",p.textContent=w;const i=document.createElement("strong");i.className="rpt-revenue__value",i.textContent=t==="export"?S(u):u,a.appendChild(p),a.appendChild(i),d.appendChild(a)},h=w=>C(E(w||0));return m(s("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),h(e.revenue)),m(s("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),h(e.companyShareTotal)),m(s("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),h(e.taxTotal)),m(s("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),h(e.crewTotal)),m(s("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),h(e.crewCostTotal)),m(s("reservations.reports.kpi.revenue.details.equipmentGross","إجمالي المعدات","Equipment total"),h(e.equipmentTotal)),m(s("reservations.reports.kpi.revenue.details.equipment","تكلفة المعدات","Equipment cost"),h(e.equipmentCostTotal)),Number.isFinite(Number(e.maintenanceExpense))&&m(s("reservations.reports.kpi.revenue.details.maintenance","مصاريف الصيانة","Maintenance"),h(e.maintenanceExpense)),m(s("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),h(e.netProfit)),n.appendChild(o),n.appendChild(d),n}function Q({context:t="preview"}={}){const e=(_.lastSnapshot?.outstanding||[]).slice(0,6),n=document.createElement("section");n.className="rpt-outstanding-section";const o=document.createElement("h4");if(o.className="rpt-outstanding__title",o.textContent=s("reservations.reports.topOutstanding.title","أعلى المستحقات","Top outstanding"),n.appendChild(o),!e.length){const w=document.createElement("p");return w.style.fontSize="11px",w.style.opacity=".8",w.textContent=s("reservations.reports.table.emptyPeriod","لا توجد بيانات في هذه الفترة.","No data for this period."),n.appendChild(w),n}const d=document.createElement("table");d.className="rpt-outstanding__table";const m=document.createElement("thead");document.createElement("tr"),["الحجز / العميل","حالة الدفع","المستحق"].forEach((w,u)=>{const a=document.createElement("th"),p=u===0?s("reservations.reports.topOutstanding.headers.reservation","الحجز / العميل","Reservation / Customer"):u===1?s("reservations.reports.topOutstanding.headers.status","حالة الدفع","Payment status"):s("reservations.reports.topOutstanding.headers.amount","المستحق","Outstanding");a.textContent=p,m.appendChild(a)});const h=document.createElement("tbody");return e.forEach(w=>{const u=document.createElement("tr"),a=document.createElement("td");a.textContent=`#${w.code} — ${w.customer||""}`,u.appendChild(a);const p=document.createElement("td");p.textContent=H(w.paidStatus),u.appendChild(p);const i=document.createElement("td");i.textContent=t==="export"?S(C(w.outstanding)):C(w.outstanding),u.appendChild(i),h.appendChild(u)}),d.appendChild(m),d.appendChild(h),n.appendChild(d),n}function ee({context:t="preview"}={}){const e=(_.lastSnapshot?.crewWork||[]).slice(0,12),n=document.createElement("section");n.className="rpt-crew-section";const o=document.createElement("h4");if(o.className="rpt-crew__title",o.textContent=s("reservations.reports.crew.title","تقرير عمل الطاقم","Crew work report"),n.appendChild(o),!e.length){const a=document.createElement("p");return a.style.fontSize="11px",a.style.opacity=".8",a.textContent=s("reservations.reports.table.emptyPeriod","لا توجد بيانات في هذه الفترة.","No data for this period."),n.appendChild(a),n}const d=document.createElement("table");d.className="rpt-crew__table";const m=document.createElement("thead"),h=document.createElement("tr");[s("reservations.reports.crew.headers.technician","الفني","Technician"),s("reservations.reports.crew.headers.days","أيام العمل","Work days"),s("reservations.reports.crew.headers.billable","فوتر الطاقم","Crew billable"),s("reservations.reports.crew.headers.cost","تكلفة الطاقم","Crew cost"),s("reservations.reports.crew.headers.net","صافي المساهمة","Net contribution")].forEach(a=>{const p=document.createElement("th");p.textContent=a,h.appendChild(p)}),m.appendChild(h);const u=document.createElement("tbody");return e.forEach(a=>{const p=document.createElement("tr");[a.name||String(a.id||""),L(a.days||0),t==="export"?S(C(a.billable||0)):C(a.billable||0),t==="export"?S(C(a.cost||0)):C(a.cost||0),t==="export"?S(C((a.billable||0)-(a.cost||0))):C((a.billable||0)-(a.cost||0))].forEach(g=>{const v=document.createElement("td");v.textContent=g,p.appendChild(v)}),u.appendChild(p)}),d.appendChild(m),d.appendChild(u),n.appendChild(d),n}function te(){const t=Array.isArray(_.lastSnapshot?.paymentForecast)?_.lastSnapshot.paymentForecast.slice(0,16):[],e=document.createElement("section");e.className="rpt-forecast-section";const n=document.createElement("h4");if(n.className="rpt-forecast__title",n.textContent=s("reservations.reports.forecast.title","خريطة الدفعات القادمة","Upcoming payments"),e.appendChild(n),!t.length){const u=document.createElement("p");return u.style.fontSize="11px",u.style.opacity=".8",u.textContent=s("reservations.reports.table.emptyPeriod","لا توجد بيانات في هذه الفترة.","No data for this period."),e.appendChild(u),e}const o=document.createElement("table");o.className="rpt-forecast__table";const d=document.createElement("thead"),m=document.createElement("tr");[s("reservations.reports.forecast.headers.date","التاريخ","Date"),s("reservations.reports.forecast.headers.count","عدد الحجوزات","Count"),s("reservations.reports.forecast.headers.amount","المبلغ المتوقع","Expected amount")].forEach(u=>{const a=document.createElement("th");a.textContent=u,m.appendChild(a)}),d.appendChild(m);const w=document.createElement("tbody");return t.forEach(u=>{const a=document.createElement("tr");[u.date||"",L(u.count||0),C(u.amount||0)].forEach(i=>{const g=document.createElement("td");g.textContent=i,a.appendChild(g)}),w.appendChild(a)}),o.appendChild(d),o.appendChild(w),e.appendChild(o),e}function ne(t){const e=document.createElement("table");e.className="rpt-table";const n=document.createElement("thead"),o=document.createElement("tr");t.forEach(m=>{const h=document.createElement("th");h.textContent=m,o.appendChild(h)}),n.appendChild(o);const d=document.createElement("tbody");return e.appendChild(n),e.appendChild(d),{table:e,tbody:d}}function ae(t,e,n,{context:o="preview"}={}){const d=t.querySelector("[data-a4-pages]"),m=v=>{const b=document.createElement("section");b.className=`a4-page ${v===0?"a4-page--primary":"a4-page--continuation"}`,b.style.width=`${j}px`,b.style.height=`${T}px`;const f=document.createElement("div");if(f.className="a4-inner",v===0){f.appendChild(V()),f.appendChild(Z({context:o})),f.appendChild(Y({context:o})),f.appendChild(Q({context:o})),f.appendChild(te()),f.appendChild(ee({context:o}));const l=document.createElement("h4");l.className="rpt-table-title",l.textContent=s("reservations.reports.results.title","تفاصيل الحجوزات","Reservations details"),f.appendChild(l)}const{table:r,tbody:c}=ne(n);return f.appendChild(r),b.appendChild(f),d.appendChild(b),{page:b,table:r,tbody:c}},h=(v,b)=>{const f=document.createElement("tr");return n.forEach(r=>{const c=document.createElement("td"),l=document.createElement("div");l.className="rpt-cell";let x=b[r]!=null?String(b[r]):"";o==="export"&&(x=x.replace(/(\d{1,3}(?:,\d{3})*)\.00(?=\s*SR\b)/g,"$1")),l.textContent=x,c.appendChild(l),f.appendChild(c)}),v.appendChild(f),f},w=(v,b)=>{try{const r=(v.querySelector(".a4-inner")||v).getBoundingClientRect(),c=b.lastElementChild;if(!c)return!0;const l=c.getBoundingClientRect(),x=r.bottom-1;return l.bottom<=x}catch{return!0}};let u=0,{page:a,table:p,tbody:i}=m(u),g=0;for(let v=0;v<e.length;v+=1){const b=h(i,e[v]);if(w(a,i))g+=1;else{if(b.remove(),g===0)try{p.remove();const f=a.querySelector(".rpt-table-title");({page:a,table:p,tbody:i}=m(++u)),f&&(a.querySelector(".a4-inner")||a).insertBefore(f,p),h(i,e[v]),g=1;continue}catch{}({page:a,table:p,tbody:i}=m(++u)),h(i,e[v]),g=1}}}function re(t=""){const e=String(t||"").toLowerCase();return/الحجز|reservation/.test(e)||/العميل|customer/.test(e)||/التاريخ|date/.test(e)||/الحالة|status/.test(e)||/الدفع|payment/.test(e)||/الإجمالي|total/.test(e)}function R(t=[]){try{const e=new Set;return t.forEach(n=>{const o=`reportsPdf.column.${n}`,d=localStorage.getItem(o);d==null?re(n)&&e.add(n):d==="1"&&e.add(n)}),e.size===0&&t.forEach(n=>e.add(n)),e}catch{return new Set(t)}}function F(t,e,n){if(!n)return t;const o=n.showPaid??!0,d=n.showPartial??!0,m=n.showUnpaid??!0,h=n.showConfirmed??!0,w=n.showPending??!0,u=n.showCompleted??!0,a=n.showCancelled??!0,p=e.find(r=>/الحالة|status/i.test(r))||null,i=e.find(r=>/الدفع|payment/i.test(r))||null;if(!p&&!i)return t;const g=r=>/جزئ|partial/i.test(String(r||"")),v=r=>/مدفوعة|مدفوع|paid/i.test(String(r||""))&&!g(r),b=r=>/غير مدفوعة|غير مدفوع|unpaid/i.test(String(r||"")),f=r=>{const c=String(r||"").toLowerCase();return/completed|منته/.test(c)?"completed":/confirmed|مؤكد/.test(c)?"confirmed":/pending|غير مؤكد|قيد التأكيد/.test(c)?"pending":/cancel|ملغ/.test(c)?"cancelled":"other"};return t.filter(r=>{let c=!0;if(i){const l=r[i];!o&&v(l)&&(c=!1),!d&&g(l)&&(c=!1),!m&&b(l)&&(c=!1)}if(p){const l=f(r[p]);!u&&l==="completed"&&(c=!1),!h&&l==="confirmed"&&(c=!1),!w&&l==="pending"&&(c=!1),!a&&l==="cancelled"&&(c=!1)}return c})}function O(t=[],{context:e="preview",columns:n,rowFilters:o}={}){const d=K(e),m=Array.isArray(t)&&t.length?t:_.lastSnapshot?.tableRows||[];let h=Object.keys(m[0]||{});const w=n&&n.length?new Set(n):R(h);h=h.filter(p=>w.has(p));const u=F(m,h,o),a=document.createElement("div");Object.assign(a.style,{position:"fixed",left:0,top:0,width:`${j}px`,height:"0",pointerEvents:"none",zIndex:-1,visibility:"hidden"}),document.body.appendChild(a),a.appendChild(d);try{ae(d,u,h,{context:e})}finally{try{d.parentElement?.removeChild(d)}catch{}try{a.parentElement?.removeChild(a)}catch{}}return d}async function de(t=[],{action:e="save",strict:n=!1,popupWindow:o=null}={}){const d={showPaid:localStorage.getItem("reportsPdf.rows.paid")!=="0",showPartial:localStorage.getItem("reportsPdf.rows.partial")!=="0",showUnpaid:localStorage.getItem("reportsPdf.rows.unpaid")!=="0",showConfirmed:localStorage.getItem("reportsPdf.rows.confirmed")!=="0",showPending:localStorage.getItem("reportsPdf.rows.pending")!=="0",showCompleted:localStorage.getItem("reportsPdf.rows.completed")!=="0",showCancelled:localStorage.getItem("reportsPdf.rows.cancelled")!=="0"},m=O(t,{context:"export",rowFilters:d}),h=document.createElement("div");Object.assign(h.style,{position:"fixed",top:0,left:0,width:0,height:0,pointerEvents:"none",zIndex:-1}),h.appendChild(m),document.body.appendChild(h);try{if(n||localStorage.getItem("reportsPdf.strict")==="on"){const r=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${s("reservations.reports.print.title","تقرير الحجوزات","Reservations report")}</title><style>@page{size:A4;margin:0;}html,body{margin:0;padding:0;background:#fff;direction:rtl;text-align:right;}#reports-a4-root{width:${j}px;height:auto} .a4-page{width:${j}px;height:${T}px} @media print { [data-a4-pages]{display:block!important}.a4-page{page-break-after:always;break-after:page}.a4-page:last-child{page-break-after:auto;break-after:auto}.a4-page,.a4-inner{break-inside:avoid;-webkit-column-break-inside:avoid} }</style></head><body></body></html>`;if(o&&typeof o.document?.open=="function"){const x=o.document;try{x.open(),x.write(r),x.close()}catch{}try{const y=m.cloneNode(!0);x.body.appendChild(y),x.fonts?.ready&&await x.fonts.ready}catch{}await new Promise(y=>setTimeout(y,60));try{o.focus(),o.print()}catch{}setTimeout(()=>{try{o.close()}catch{}},1500);return}await new Promise(x=>setTimeout(x,0));const c=document.createElement("iframe");Object.assign(c.style,{position:"fixed",width:"1px",height:"1px",right:"0",bottom:"0",border:"0",opacity:"0",pointerEvents:"none"}),document.body.appendChild(c);const l=c.contentWindow?.document;try{l.open(),l.write(r),l.close()}catch{}try{const x=m.cloneNode(!0);l.body.appendChild(x),l.fonts?.ready&&await l.fonts.ready}catch{}await new Promise(x=>setTimeout(x,60));try{c.contentWindow?.focus(),c.contentWindow?.print()}catch{}setTimeout(()=>{try{c.remove()}catch{}},1500);return}try{await q()}catch{}let u=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF,a=window.html2canvas;if(typeof u!="function")try{await A("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"),u=window.jspdf&&window.jspdf.jsPDF||window.jsPDF&&window.jsPDF.jsPDF||window.jsPDF&&window.jsPDF.default&&window.jsPDF.default.jsPDF||window.jspdf&&window.jspdf.default&&window.jspdf.default.jsPDF}catch{}if(typeof a!="function")try{await A("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"),a=window.html2canvas}catch{}if(typeof u!="function"||typeof a!="function"){const r=typeof u=="function",c=typeof a=="function";throw new Error(`PDF dependencies not available (jsPDF: ${r}, html2canvas: ${c})`)}const p=new u({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),i=Math.min(2,Math.max(1.6,(window.devicePixelRatio||1)*1.25)),g=(()=>{try{const r=t&&t[0]?Object.keys(t[0]):Object.keys(_.lastSnapshot?.tableRows?.[0]||{}),c=R(r);return r.filter(l=>c.has(l))}catch{return null}})(),v={showPaid:localStorage.getItem("reportsPdf.rows.paid")!=="0",showUnpaid:localStorage.getItem("reportsPdf.rows.unpaid")!=="0",showConfirmed:localStorage.getItem("reportsPdf.rows.confirmed")!=="0",showPending:localStorage.getItem("reportsPdf.rows.pending")!=="0",showCompleted:localStorage.getItem("reportsPdf.rows.completed")!=="0"},b=O(t,{context:"export",columns:g||void 0,rowFilters:v});h.innerHTML="",h.appendChild(b);const f=Array.from(b.querySelectorAll(".a4-page"));for(let r=0;r<f.length;r+=1){const c=f[r],x=(await a(c,{scale:i,scrollX:0,scrollY:0,backgroundColor:"#ffffff",useCORS:!0,allowTaint:!1,windowWidth:j,windowHeight:T,letterRendering:!0,imageTimeout:0})).toDataURL("image/jpeg",.98);r>0&&p.addPage(),p.addImage(x,"JPEG",0,0,$,U,`page-${r+1}`,"FAST"),await new Promise(y=>requestAnimationFrame(y))}if(e==="print"){const r=p.output("bloburl");await new Promise(c=>{const l=document.createElement("iframe");Object.assign(l.style,{position:"fixed",right:0,bottom:0,width:"1px",height:"1px",border:0}),l.onload=()=>{try{l.contentWindow?.focus(),l.contentWindow?.print()}catch{}setTimeout(()=>{l.remove(),c()},700)},l.src=r,document.body.appendChild(l)})}else{const r=p.output("blob"),c=URL.createObjectURL(r),l=document.createElement("a");l.href=c,l.download="reservations-report.pdf",l.rel="noopener",l.style.display="none",document.body.appendChild(l),l.click(),setTimeout(()=>{try{URL.revokeObjectURL(c),l.remove()}catch{}},1500)}}finally{h.remove()}}async function ce(t=[]){await X();const e=window.XLSX;if(!e)throw new Error("XLSX dependency not available");const n=t&&t[0]?Object.keys(t[0]):Object.keys(_.lastSnapshot?.tableRows?.[0]||{}),o=R(n),d=n.filter(c=>o.has(c)),m={showPaid:localStorage.getItem("reportsPdf.rows.paid")!=="0",showPartial:localStorage.getItem("reportsPdf.rows.partial")!=="0",showUnpaid:localStorage.getItem("reportsPdf.rows.unpaid")!=="0",showConfirmed:localStorage.getItem("reportsPdf.rows.confirmed")!=="0",showPending:localStorage.getItem("reportsPdf.rows.pending")!=="0",showCompleted:localStorage.getItem("reportsPdf.rows.completed")!=="0",showCancelled:localStorage.getItem("reportsPdf.rows.cancelled")!=="0"},h=Array.isArray(t)&&t.length?t:_.lastSnapshot?.tableRows||[],w=F(h,d,m),u=s("reservations.reports.print.title","تقرير الحجوزات","Reservations report"),a=`${I(new Date)} • ${s("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,p=_.lastSnapshot?.metrics||{},i=[];i.push([u]),i.push([a]),i.push([]),i.push([s("reservations.reports.kpi.total.label","إجمالي الحجوزات","Total"),String(p.total??0),s("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),String(p.revenue??0),s("reservations.reports.kpi.net.label","صافي الربح","Net"),String(p.netProfit??0)]),i.push([s("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),String(p.companyShareTotal??0),s("reservations.reports.kpi.tax.label","الضريبة","Tax"),String(p.taxTotal??0),s("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),String(p.maintenanceExpense??0)]),i.push([]),i.push(d),w.forEach(c=>{const l=d.map(x=>c[x]!=null?String(c[x]):"");i.push(l)});const g=e.utils.aoa_to_sheet(i);g["!merges"]||(g["!merges"]=[]);const v=Math.max(1,d.length)-1;g["!merges"].push({s:{r:0,c:0},e:{r:0,c:Math.max(3,v)}}),g["!merges"].push({s:{r:1,c:0},e:{r:1,c:Math.max(3,v)}});const b=d.map((c,l)=>{let y=(c||"").length+2;for(let P=7;P<i.length;P+=1){const k=i[P][l]||"";y=Math.max(y,String(k).length)}return{wch:Math.min(40,Math.max(10,y))}});g["!cols"]=b;const f=e.utils.book_new();e.utils.book_append_sheet(f,g,s("reservations.reports.export.sheetName","الحجوزات","Reservations"));const r=`${s("reservations.reports.export.filePrefix","تقرير-الحجوزات","reservations-report")}.xlsx`;e.writeFile(f,r)}async function me(t=[]){const e=t&&t[0]?Object.keys(t[0]):Object.keys(_.lastSnapshot?.tableRows?.[0]||{}),n=R(e),o=e.filter(b=>n.has(b)),d={showPaid:localStorage.getItem("reportsPdf.rows.paid")!=="0",showPartial:localStorage.getItem("reportsPdf.rows.partial")!=="0",showUnpaid:localStorage.getItem("reportsPdf.rows.unpaid")!=="0",showConfirmed:localStorage.getItem("reportsPdf.rows.confirmed")!=="0",showPending:localStorage.getItem("reportsPdf.rows.pending")!=="0",showCompleted:localStorage.getItem("reportsPdf.rows.completed")!=="0",showCancelled:localStorage.getItem("reportsPdf.rows.cancelled")!=="0"},m=Array.isArray(t)&&t.length?t:_.lastSnapshot?.tableRows||[],h=F(m,o,d),w=s("reservations.reports.print.title","تقرير الحجوزات","Reservations report"),u=`${I(new Date)} • ${s("reservations.reports.print.generated","تاريخ التوليد","Generated on")}`,a=_.lastSnapshot?.metrics||{},p=M(),i=b=>{const f=String(b??"");return/[",\n]/.test(f)?'"'+f.replace(/"/g,'""')+'"':f},g=[];g.push(i(w)),g.push(i(u)),g.push(`Logo,${i(p)}`),g.push(""),g.push([s("reservations.reports.kpi.total.label","إجمالي الحجوزات","Total"),a.total??0,s("reservations.reports.kpi.revenue.label","الإيرادات","Revenue"),a.revenue??0,s("reservations.reports.kpi.net.label","صافي الربح","Net"),a.netProfit??0].map(i).join(",")),g.push([s("reservations.reports.kpi.share.label","نسبة الشركة","Company share"),a.companyShareTotal??0,s("reservations.reports.kpi.tax.label","الضريبة","Tax"),a.taxTotal??0,s("reservations.reports.kpi.maintenance.label","مصاريف الصيانة","Maintenance"),a.maintenanceExpense??0].map(i).join(",")),g.push(""),g.push(o.map(i).join(",")),h.forEach(b=>{const f=o.map(r=>i(b[r]!=null?b[r]:""));g.push(f.join(","))});let v=!1;try{await G();const b=window.JSZip;if(b){const f=new b,r=s("reservations.reports.export.filePrefix","تقرير-الحجوزات","reservations-report"),c=["\uFEFF"+g.slice(0,g.indexOf(o.map(i).join(","))).join(`
`)],l=["\uFEFF"+[o.map(i).join(","),...h.map(k=>o.map(N=>i(k[N]??"")).join(","))].join(`
`)];f.file(`${r}-metadata.csv`,c.join("")),f.file(`${r}.csv`,l.join(""));try{const N=await(await fetch(p,{mode:"cors"})).blob();f.file("logo.png",N)}catch{}const x=await f.generateAsync({type:"blob"}),y=URL.createObjectURL(x),P=document.createElement("a");P.href=y,P.download=`${r}.zip`,P.style.display="none",document.body.appendChild(P),P.click(),setTimeout(()=>{URL.revokeObjectURL(y),P.remove()},1500),v=!0}}catch{}if(!v){const b=new Blob(["\uFEFF"+g.join(`
`)],{type:"text/csv;charset=utf-8"}),f=URL.createObjectURL(b),r=document.createElement("a");r.href=f,r.download=`${s("reservations.reports.export.filePrefix","تقرير-الحجوزات","reservations-report")}.csv`,r.style.display="none",document.body.appendChild(r),r.click(),setTimeout(()=>{URL.revokeObjectURL(f),r.remove()},1500)}}const oe="https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png";function M(){try{const t=localStorage.getItem("reportsPdf.logoUrl");if(t&&/^https?:|^data:|^blob:/.test(t))return t}catch{}return oe}export{O as buildA4ReportPages,me as exportA4ReportCsv,ce as exportA4ReportExcel,de as exportA4ReportPdf};
