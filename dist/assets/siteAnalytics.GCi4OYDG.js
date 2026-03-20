import{a as A,i as L,c as $,g as w,l as _,b as P,A as f,t as i,j as C,n as v}from"./auth.Dz-Re61g.js";import"./dashboard.AidOkjMP.js";import{i as M}from"./dashboardShell.DF2kUed9.js";A();M();L();const s={};let u=null,b=30,g=null,a={pageType:"",deviceType:"",sourceType:""};function r(t){return document.querySelector(t)}function d(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function o(t){const e=Number(t);return Number.isFinite(e)?v(e%1===0?String(Math.trunc(e)):e.toFixed(2)):v("0")}function m(t){const e=String(t||"").trim();if(!e)return"—";const n=e.includes("T")?e:e.replace(" ","T"),c=new Date(n);if(Number.isNaN(c.getTime()))return e;try{return new Intl.DateTimeFormat(document.documentElement.lang||"ar",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(c)}catch{return e}}function k(t){const e=String(t||"").trim();if(!e)return"—";const n=new Date(`${e}T00:00:00`);if(Number.isNaN(n.getTime()))return e;try{return new Intl.DateTimeFormat(document.documentElement.lang||"ar",{month:"short",day:"numeric"}).format(n)}catch{return e}}function T(t){const e=String(t||"").trim();return!e||e==="/"?i("siteAnalytics.common.homepage","الصفحة الرئيسية"):e.replace(/[-_/]+/g," ").replace(/\b\w/g,n=>n.toUpperCase())}function E(t){const e=String(t||"").trim().toLowerCase();return!e||e==="(direct)"?i("siteAnalytics.sources.direct","دخول مباشر"):e==="(internal)"?i("siteAnalytics.sources.internal","تنقل داخلي"):e==="(unknown)"?i("siteAnalytics.sources.unknown","غير معروف"):t}function h(t){const e=String(t||"").trim().toLowerCase();return e==="mobile"?i("siteAnalytics.devices.mobile","جوال"):e==="tablet"?i("siteAnalytics.devices.tablet","تابلت"):i("siteAnalytics.devices.desktop","سطح المكتب")}function x(t){const e=String(t||"").trim().toLowerCase();return{index:i("siteAnalytics.pageTypes.index","الرئيسية"),contact:i("siteAnalytics.pageTypes.contact","تواصل معنا"),feedback:i("siteAnalytics.pageTypes.feedback","رأيك يهمنا"),portfolio:i("siteAnalytics.pageTypes.portfolio","الأعمال"),service:i("siteAnalytics.pageTypes.service","الخدمات"),shop:i("siteAnalytics.pageTypes.shop","المتجر"),about:i("siteAnalytics.pageTypes.about","من نحن"),blog:i("siteAnalytics.pageTypes.blog","المدونة")}[e]||T(e)}function H(t){const e=String(t||"").trim().toLowerCase();return e==="external"?i("siteAnalytics.filters.sourceExternal","خارجي"):e==="internal"?i("siteAnalytics.sources.internal","تنقل داخلي"):i("siteAnalytics.sources.direct","دخول مباشر")}function B(){s.logoutBtn=r("#logout-btn"),s.refreshBtn=r("#site-analytics-refresh"),s.rangeSelect=r("#site-analytics-range"),s.pageTypeSelect=r("#site-analytics-page-type"),s.deviceTypeSelect=r("#site-analytics-device-type"),s.sourceTypeSelect=r("#site-analytics-source-type"),s.rangeLabel=r("#site-analytics-range-label"),s.statVisitors=r("#analytics-stat-visitors"),s.statSessions=r("#analytics-stat-sessions"),s.statPageViews=r("#analytics-stat-page-views"),s.statAvgPages=r("#analytics-stat-avg-pages"),s.statContactLeads=r("#analytics-stat-contact-leads"),s.statFeedback=r("#analytics-stat-feedback"),s.topPagesBody=r("#site-analytics-top-pages-body"),s.sourcesList=r("#site-analytics-sources-list"),s.devicesGrid=r("#site-analytics-devices-grid"),s.dailyList=r("#site-analytics-daily-list")}function N(){const t=String(u?.role||"").toLowerCase(),e=t==="admin",n=e||t==="manager";document.querySelectorAll("[data-admin-card]").forEach(c=>{c.classList.toggle("hidden",!e)}),document.querySelectorAll("[data-manager-card]").forEach(c=>{c.classList.toggle("hidden",!n)})}function z(){document.body.classList.remove("auth-pending")}function D(t){const e=t||{};s.statVisitors&&(s.statVisitors.textContent=o(e.unique_visitors||0)),s.statSessions&&(s.statSessions.textContent=o(e.sessions||0)),s.statPageViews&&(s.statPageViews.textContent=o(e.page_views||0)),s.statAvgPages&&(s.statAvgPages.textContent=o(e.avg_pages_per_session||0)),s.statContactLeads&&(s.statContactLeads.textContent=e.contact_leads==null?"—":o(e.contact_leads||0)),s.statFeedback&&(s.statFeedback.textContent=e.feedback_submissions==null?"—":o(e.feedback_submissions||0))}function F(t){if(!s.rangeLabel)return;if(!t?.from||!t?.to){s.rangeLabel.textContent="";return}const e=[`${i("common.range.from","من")} ${m(t.from)} ${i("common.range.to","إلى")} ${m(t.to)}`];a.pageType&&e.push(`${i("siteAnalytics.filters.pageType","نوع الصفحة")}: ${x(a.pageType)}`),a.deviceType&&e.push(`${i("siteAnalytics.filters.device","الجهاز")}: ${h(a.deviceType)}`),a.sourceType&&e.push(`${i("siteAnalytics.filters.source","المصدر")}: ${H(a.sourceType)}`),s.rangeLabel.textContent=e.join(" • ")}function y(t,e){t&&(t.value=String(e||""))}function V(t){const e=t?.filter_options||{};if(s.pageTypeSelect){const n=Array.isArray(e.page_types)?e.page_types:[];s.pageTypeSelect.innerHTML=[`<option value="">${d(i("siteAnalytics.filters.allPageTypes","كل الصفحات"))}</option>`,...n.map(c=>`<option value="${d(c)}">${d(x(c))}</option>`)].join("")}y(s.pageTypeSelect,a.pageType),y(s.deviceTypeSelect,a.deviceType),y(s.sourceTypeSelect,a.sourceType)}function j(t){if(!s.topPagesBody)return;const e=Array.isArray(t)?t:[];if(!e.length){s.topPagesBody.innerHTML=`
      <tr>
        <td colspan="5" class="text-center text-base-content/60">${i("siteAnalytics.empty","لا توجد بيانات كافية للفترة الحالية.")}</td>
      </tr>
    `;return}s.topPagesBody.innerHTML=e.map(n=>`
    <tr>
      <td>
        <div class="font-semibold text-base-content">${d(n.page_title||T(n.page_path))}</div>
        <div class="text-xs text-base-content/60">${d(n.page_path||"/")}</div>
      </td>
      <td>${o(n.views||0)}</td>
      <td>${o(n.visitors||0)}</td>
      <td>${o(n.sessions||0)}</td>
      <td>${d(m(n.last_visited_at))}</td>
    </tr>
  `).join("")}function q(t){if(!s.sourcesList)return;const e=Array.isArray(t)?t:[];if(!e.length){s.sourcesList.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${i("siteAnalytics.empty","لا توجد بيانات كافية للفترة الحالية.")}
      </div>
    `;return}s.sourcesList.innerHTML=e.map(n=>`
    <div class="rounded-2xl border border-base-300/80 bg-base-100/60 p-4">
      <div class="flex items-center justify-between gap-3">
        <div>
          <div class="font-semibold text-base-content">${d(E(n.source))}</div>
          <div class="text-xs text-base-content/60">${d(String(n.source||"").trim()||"(direct)")}</div>
        </div>
        <div class="text-end">
          <div class="text-lg font-bold text-base-content">${o(n.views||0)}</div>
          <div class="text-xs text-base-content/60">${i("siteAnalytics.sources.viewsLabel","مشاهدات")}</div>
        </div>
      </div>
    </div>
  `).join("")}function G(t){if(!s.devicesGrid)return;const e=Array.isArray(t)?t:[];if(!e.length){s.devicesGrid.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60 sm:col-span-3">
        ${i("siteAnalytics.empty","لا توجد بيانات كافية للفترة الحالية.")}
      </div>
    `;return}s.devicesGrid.innerHTML=e.map(n=>`
    <article class="rounded-2xl border border-base-300/80 bg-base-100/60 p-4 text-center">
      <div class="text-sm text-base-content/60">${d(h(n.device_type))}</div>
      <div class="mt-2 text-2xl font-bold text-base-content">${o(n.views||0)}</div>
      <div class="mt-1 text-xs text-base-content/60">${o(n.percentage||0)}%</div>
    </article>
  `).join("")}function U(t){if(!s.dailyList)return;const e=Array.isArray(t)?t:[];if(!e.length){s.dailyList.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${i("siteAnalytics.empty","لا توجد بيانات كافية للفترة الحالية.")}
      </div>
    `;return}const n=e.reduce((c,p)=>Math.max(c,Number(p.page_views||0)),0)||1;s.dailyList.innerHTML=e.map(c=>{const p=Math.max(6,Math.round(Number(c.page_views||0)/n*100));return`
      <div class="grid gap-3 rounded-2xl border border-base-300/70 p-4 md:grid-cols-[120px_minmax(0,1fr)_120px] md:items-center">
        <div class="font-medium text-base-content">${d(k(c.date))}</div>
        <div class="h-3 overflow-hidden rounded-full bg-base-200">
          <div class="h-full rounded-full bg-primary/80" style="width:${p}%;"></div>
        </div>
        <div class="text-sm text-base-content/70">${o(c.page_views||0)} ${d(i("siteAnalytics.daily.viewsUnit","مشاهدة"))}</div>
      </div>
    `}).join("")}function R(){s.topPagesBody&&(s.topPagesBody.innerHTML=`
      <tr>
        <td colspan="5" class="text-center text-base-content/60">${i("siteAnalytics.loading","⏳ جارٍ تحميل الإحصائيات...")}</td>
      </tr>
    `),s.sourcesList&&(s.sourcesList.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${i("siteAnalytics.loading","⏳ جارٍ تحميل الإحصائيات...")}
      </div>
    `),s.devicesGrid&&(s.devicesGrid.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60 sm:col-span-3">
        ${i("siteAnalytics.loading","⏳ جارٍ تحميل الإحصائيات...")}
      </div>
    `),s.dailyList&&(s.dailyList.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${i("siteAnalytics.loading","⏳ جارٍ تحميل الإحصائيات...")}
      </div>
    `)}function S(t){g=t||null,V(t),D(t?.overview),F(t?.range),j(t?.top_pages),q(t?.top_sources),G(t?.device_breakdown),U(t?.visits_by_day)}async function l(){R();try{const t=new URLSearchParams({days:String(b)});a.pageType&&t.set("page_type",a.pageType),a.deviceType&&t.set("device_type",a.deviceType),a.sourceType&&t.set("source_type",a.sourceType);const e=await P(`/analytics/admin.php?${t.toString()}`);S(e?.data||null)}catch(t){if(console.error("❌ Failed to load site analytics",t),t instanceof f&&(t.status===401||t.status===403)){window.location.href="home.html";return}const e=t instanceof f?t.message:i("siteAnalytics.error","تعذر تحميل إحصائيات الموقع.");C(e,"error",4500),s.topPagesBody&&(s.topPagesBody.innerHTML=`
        <tr>
          <td colspan="5" class="text-center text-error">${d(i("siteAnalytics.error","تعذر تحميل إحصائيات الموقع."))}</td>
        </tr>
      `)}}function I(){s.logoutBtn&&s.logoutBtn.addEventListener("click",_),s.refreshBtn&&s.refreshBtn.addEventListener("click",()=>{l()}),s.rangeSelect&&s.rangeSelect.addEventListener("change",()=>{const t=Number.parseInt(String(s.rangeSelect.value||"30"),10);b=Number.isFinite(t)&&t>0?t:30,l()}),s.pageTypeSelect&&s.pageTypeSelect.addEventListener("change",()=>{a.pageType=String(s.pageTypeSelect.value||"").trim(),l()}),s.deviceTypeSelect&&s.deviceTypeSelect.addEventListener("change",()=>{a.deviceType=String(s.deviceTypeSelect.value||"").trim(),l()}),s.sourceTypeSelect&&s.sourceTypeSelect.addEventListener("change",()=>{a.sourceType=String(s.sourceTypeSelect.value||"").trim(),l()}),document.addEventListener("language:changed",()=>{g&&S(g)})}async function O(){B();try{u=await $();const e=await w();e&&(u=e)}catch(e){console.error("❌ Site analytics auth failed",e),window.location.href="login.html";return}const t=String(u?.role||"").toLowerCase();if(t!=="admin"&&t!=="manager"){window.location.href="home.html";return}N(),z(),I(),await l()}O();
