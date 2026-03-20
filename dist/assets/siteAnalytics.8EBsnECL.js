import{a as L,i as S,c as $,g as w,l as _,b as P,A as f,t as i,j as C,n as v}from"./auth.CxL643bw.js";import"./dashboard.CNWOI4gS.js";import{i as M}from"./dashboardShell.DF2kUed9.js";L();M();S();const e={};let u=null,b=30,g=null,a={pageType:"",deviceType:"",sourceType:"",includeInternal:!1};function r(n){return document.querySelector(n)}function l(n){return String(n??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function o(n){const t=Number(n);return Number.isFinite(t)?v(t%1===0?String(Math.trunc(t)):t.toFixed(2)):v("0")}function m(n){const t=String(n||"").trim();if(!t)return"—";const s=t.includes("T")?t:t.replace(" ","T"),c=new Date(s);if(Number.isNaN(c.getTime()))return t;try{return new Intl.DateTimeFormat(document.documentElement.lang||"ar",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(c)}catch{return t}}function k(n){const t=String(n||"").trim();if(!t)return"—";const s=new Date(`${t}T00:00:00`);if(Number.isNaN(s.getTime()))return t;try{return new Intl.DateTimeFormat(document.documentElement.lang||"ar",{month:"short",day:"numeric"}).format(s)}catch{return t}}function h(n){const t=String(n||"").trim();return!t||t==="/"?i("siteAnalytics.common.homepage","الصفحة الرئيسية"):t.replace(/[-_/]+/g," ").replace(/\b\w/g,s=>s.toUpperCase())}function E(n){const t=String(n||"").trim().toLowerCase();return!t||t==="(direct)"?i("siteAnalytics.sources.direct","دخول مباشر"):t==="(internal)"?i("siteAnalytics.sources.internal","تنقل داخلي"):t==="(unknown)"?i("siteAnalytics.sources.unknown","غير معروف"):n}function T(n){const t=String(n||"").trim().toLowerCase();return t==="mobile"?i("siteAnalytics.devices.mobile","جوال"):t==="tablet"?i("siteAnalytics.devices.tablet","تابلت"):i("siteAnalytics.devices.desktop","سطح المكتب")}function x(n){const t=String(n||"").trim().toLowerCase();return{index:i("siteAnalytics.pageTypes.index","الرئيسية"),contact:i("siteAnalytics.pageTypes.contact","تواصل معنا"),feedback:i("siteAnalytics.pageTypes.feedback","رأيك يهمنا"),portfolio:i("siteAnalytics.pageTypes.portfolio","الأعمال"),service:i("siteAnalytics.pageTypes.service","الخدمات"),shop:i("siteAnalytics.pageTypes.shop","المتجر"),about:i("siteAnalytics.pageTypes.about","من نحن"),blog:i("siteAnalytics.pageTypes.blog","المدونة")}[t]||h(t)}function B(n){const t=String(n||"").trim().toLowerCase();return t==="external"?i("siteAnalytics.filters.sourceExternal","خارجي"):t==="internal"?i("siteAnalytics.sources.internal","تنقل داخلي"):i("siteAnalytics.sources.direct","دخول مباشر")}function H(){e.logoutBtn=r("#logout-btn"),e.refreshBtn=r("#site-analytics-refresh"),e.rangeSelect=r("#site-analytics-range"),e.pageTypeSelect=r("#site-analytics-page-type"),e.deviceTypeSelect=r("#site-analytics-device-type"),e.sourceTypeSelect=r("#site-analytics-source-type"),e.includeInternal=r("#site-analytics-include-internal"),e.rangeLabel=r("#site-analytics-range-label"),e.statVisitors=r("#analytics-stat-visitors"),e.statSessions=r("#analytics-stat-sessions"),e.statPageViews=r("#analytics-stat-page-views"),e.statAvgPages=r("#analytics-stat-avg-pages"),e.statContactLeads=r("#analytics-stat-contact-leads"),e.statFeedback=r("#analytics-stat-feedback"),e.topPagesBody=r("#site-analytics-top-pages-body"),e.sourcesList=r("#site-analytics-sources-list"),e.devicesGrid=r("#site-analytics-devices-grid"),e.dailyList=r("#site-analytics-daily-list")}function I(){const n=String(u?.role||"").toLowerCase(),t=n==="admin",s=t||n==="manager";document.querySelectorAll("[data-admin-card]").forEach(c=>{c.classList.toggle("hidden",!t)}),document.querySelectorAll("[data-manager-card]").forEach(c=>{c.classList.toggle("hidden",!s)})}function N(){document.body.classList.remove("auth-pending")}function z(n){const t=n||{};e.statVisitors&&(e.statVisitors.textContent=o(t.unique_visitors||0)),e.statSessions&&(e.statSessions.textContent=o(t.sessions||0)),e.statPageViews&&(e.statPageViews.textContent=o(t.page_views||0)),e.statAvgPages&&(e.statAvgPages.textContent=o(t.avg_pages_per_session||0)),e.statContactLeads&&(e.statContactLeads.textContent=t.contact_leads==null?"—":o(t.contact_leads||0)),e.statFeedback&&(e.statFeedback.textContent=t.feedback_submissions==null?"—":o(t.feedback_submissions||0))}function D(n){if(!e.rangeLabel)return;if(!n?.from||!n?.to){e.rangeLabel.textContent="";return}const t=[`${i("common.range.from","من")} ${m(n.from)} ${i("common.range.to","إلى")} ${m(n.to)}`];a.pageType&&t.push(`${i("siteAnalytics.filters.pageType","نوع الصفحة")}: ${x(a.pageType)}`),a.deviceType&&t.push(`${i("siteAnalytics.filters.device","الجهاز")}: ${T(a.deviceType)}`),a.sourceType&&t.push(`${i("siteAnalytics.filters.source","المصدر")}: ${B(a.sourceType)}`),a.includeInternal||t.push(i("siteAnalytics.filters.internalExcluded","تم استبعاد زيارات الفريق الداخلي")),e.rangeLabel.textContent=t.join(" • ")}function y(n,t){n&&(n.value=String(t||""))}function F(n){const t=n?.filter_options||{};if(e.pageTypeSelect){const s=Array.isArray(t.page_types)?t.page_types:[];e.pageTypeSelect.innerHTML=[`<option value="">${l(i("siteAnalytics.filters.allPageTypes","كل الصفحات"))}</option>`,...s.map(c=>`<option value="${l(c)}">${l(x(c))}</option>`)].join("")}y(e.pageTypeSelect,a.pageType),y(e.deviceTypeSelect,a.deviceType),y(e.sourceTypeSelect,a.sourceType),e.includeInternal&&(e.includeInternal.checked=!!a.includeInternal)}function V(n){if(!e.topPagesBody)return;const t=Array.isArray(n)?n:[];if(!t.length){e.topPagesBody.innerHTML=`
      <tr>
        <td colspan="5" class="text-center text-base-content/60">${i("siteAnalytics.empty","لا توجد بيانات كافية للفترة الحالية.")}</td>
      </tr>
    `;return}e.topPagesBody.innerHTML=t.map(s=>`
    <tr>
      <td>
        <div class="font-semibold text-base-content">${l(s.page_title||h(s.page_path))}</div>
        <div class="text-xs text-base-content/60">${l(s.page_path||"/")}</div>
      </td>
      <td>${o(s.views||0)}</td>
      <td>${o(s.visitors||0)}</td>
      <td>${o(s.sessions||0)}</td>
      <td>${l(m(s.last_visited_at))}</td>
    </tr>
  `).join("")}function j(n){if(!e.sourcesList)return;const t=Array.isArray(n)?n:[];if(!t.length){e.sourcesList.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${i("siteAnalytics.empty","لا توجد بيانات كافية للفترة الحالية.")}
      </div>
    `;return}e.sourcesList.innerHTML=t.map(s=>`
    <div class="rounded-2xl border border-base-300/80 bg-base-100/60 p-4">
      <div class="flex items-center justify-between gap-3">
        <div>
          <div class="font-semibold text-base-content">${l(E(s.source))}</div>
          <div class="text-xs text-base-content/60">${l(String(s.source||"").trim()||"(direct)")}</div>
        </div>
        <div class="text-end">
          <div class="text-lg font-bold text-base-content">${o(s.views||0)}</div>
          <div class="text-xs text-base-content/60">${i("siteAnalytics.sources.viewsLabel","مشاهدات")}</div>
        </div>
      </div>
    </div>
  `).join("")}function q(n){if(!e.devicesGrid)return;const t=Array.isArray(n)?n:[];if(!t.length){e.devicesGrid.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60 sm:col-span-3">
        ${i("siteAnalytics.empty","لا توجد بيانات كافية للفترة الحالية.")}
      </div>
    `;return}e.devicesGrid.innerHTML=t.map(s=>`
    <article class="rounded-2xl border border-base-300/80 bg-base-100/60 p-4 text-center">
      <div class="text-sm text-base-content/60">${l(T(s.device_type))}</div>
      <div class="mt-2 text-2xl font-bold text-base-content">${o(s.views||0)}</div>
      <div class="mt-1 text-xs text-base-content/60">${o(s.percentage||0)}%</div>
    </article>
  `).join("")}function G(n){if(!e.dailyList)return;const t=Array.isArray(n)?n:[];if(!t.length){e.dailyList.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${i("siteAnalytics.empty","لا توجد بيانات كافية للفترة الحالية.")}
      </div>
    `;return}const s=t.reduce((c,p)=>Math.max(c,Number(p.page_views||0)),0)||1;e.dailyList.innerHTML=t.map(c=>{const p=Math.max(6,Math.round(Number(c.page_views||0)/s*100));return`
      <div class="grid gap-3 rounded-2xl border border-base-300/70 p-4 md:grid-cols-[120px_minmax(0,1fr)_120px] md:items-center">
        <div class="font-medium text-base-content">${l(k(c.date))}</div>
        <div class="h-3 overflow-hidden rounded-full bg-base-200">
          <div class="h-full rounded-full bg-primary/80" style="width:${p}%;"></div>
        </div>
        <div class="text-sm text-base-content/70">${o(c.page_views||0)} ${l(i("siteAnalytics.daily.viewsUnit","مشاهدة"))}</div>
      </div>
    `}).join("")}function U(){e.topPagesBody&&(e.topPagesBody.innerHTML=`
      <tr>
        <td colspan="5" class="text-center text-base-content/60">${i("siteAnalytics.loading","⏳ جارٍ تحميل الإحصائيات...")}</td>
      </tr>
    `),e.sourcesList&&(e.sourcesList.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${i("siteAnalytics.loading","⏳ جارٍ تحميل الإحصائيات...")}
      </div>
    `),e.devicesGrid&&(e.devicesGrid.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60 sm:col-span-3">
        ${i("siteAnalytics.loading","⏳ جارٍ تحميل الإحصائيات...")}
      </div>
    `),e.dailyList&&(e.dailyList.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${i("siteAnalytics.loading","⏳ جارٍ تحميل الإحصائيات...")}
      </div>
    `)}function A(n){g=n||null,F(n),z(n?.overview),D(n?.range),V(n?.top_pages),j(n?.top_sources),q(n?.device_breakdown),G(n?.visits_by_day)}async function d(){U();try{const n=new URLSearchParams({days:String(b)});a.pageType&&n.set("page_type",a.pageType),a.deviceType&&n.set("device_type",a.deviceType),a.sourceType&&n.set("source_type",a.sourceType),a.includeInternal&&n.set("include_internal","1");const t=await P(`/analytics/admin.php?${n.toString()}`);A(t?.data||null)}catch(n){if(console.error("❌ Failed to load site analytics",n),n instanceof f&&(n.status===401||n.status===403)){window.location.href="home.html";return}const t=n instanceof f?n.message:i("siteAnalytics.error","تعذر تحميل إحصائيات الموقع.");C(t,"error",4500),e.topPagesBody&&(e.topPagesBody.innerHTML=`
        <tr>
          <td colspan="5" class="text-center text-error">${l(i("siteAnalytics.error","تعذر تحميل إحصائيات الموقع."))}</td>
        </tr>
      `)}}function R(){e.logoutBtn&&e.logoutBtn.addEventListener("click",_),e.refreshBtn&&e.refreshBtn.addEventListener("click",()=>{d()}),e.rangeSelect&&e.rangeSelect.addEventListener("change",()=>{const n=Number.parseInt(String(e.rangeSelect.value||"30"),10);b=Number.isFinite(n)&&n>0?n:30,d()}),e.pageTypeSelect&&e.pageTypeSelect.addEventListener("change",()=>{a.pageType=String(e.pageTypeSelect.value||"").trim(),d()}),e.deviceTypeSelect&&e.deviceTypeSelect.addEventListener("change",()=>{a.deviceType=String(e.deviceTypeSelect.value||"").trim(),d()}),e.sourceTypeSelect&&e.sourceTypeSelect.addEventListener("change",()=>{a.sourceType=String(e.sourceTypeSelect.value||"").trim(),d()}),e.includeInternal&&e.includeInternal.addEventListener("change",()=>{a.includeInternal=!!e.includeInternal.checked,d()}),document.addEventListener("language:changed",()=>{g&&A(g)})}async function O(){H();try{u=await $();const t=await w();t&&(u=t)}catch(t){console.error("❌ Site analytics auth failed",t),window.location.href="login.html";return}const n=String(u?.role||"").toLowerCase();if(n!=="admin"&&n!=="manager"){window.location.href="home.html";return}I(),N(),R(),await d()}O();
