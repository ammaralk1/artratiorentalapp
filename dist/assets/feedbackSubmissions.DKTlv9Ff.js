import{a as R,i as H,c as U,g as q,l as D,t as n,b as _,A as E,n as u,j as h}from"./auth.CxL643bw.js";import"./dashboard.CNWOI4gS.js";import{i as I}from"./dashboardShell.DF2kUed9.js";R();I();H();const t={};let b=null,k=[],c=0,y=null,S=!1;const g={new:{badge:"badge-neutral",fallbackAr:"جديد",fallbackEn:"New",key:"feedbackSubmissions.status.new"},reviewed:{badge:"badge-info",fallbackAr:"تمت المراجعة",fallbackEn:"Reviewed",key:"feedbackSubmissions.status.reviewed"},follow_up_needed:{badge:"badge-warning",fallbackAr:"يحتاج متابعة",fallbackEn:"Follow-up Needed",key:"feedbackSubmissions.status.followUpNeeded"},responded:{badge:"badge-success",fallbackAr:"تم الرد",fallbackEn:"Responded",key:"feedbackSubmissions.status.responded"},closed:{badge:"badge-outline",fallbackAr:"مغلق",fallbackEn:"Closed",key:"feedbackSubmissions.status.closed"}},j={production_consultancy:{ar:"الاستشارات الإنتاجية",en:"Production Consultancy"},commercial_photography:{ar:"التصوير التجاري",en:"Commercial Photography"},events_coverage:{ar:"تغطية الفعاليات",en:"Events Coverage"},social_media_content:{ar:"محتوى السوشال ميديا",en:"Social Media Content"},tv_commercial_ads:{ar:"الإعلانات التلفزيونية والتجارية",en:"TV & Commercial Ads"},equipment_rental:{ar:"تأجير المعدات",en:"Equipment Rental"}};function o(a){return document.querySelector(a)}function i(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function P(a){return i(a).replace(/\n/g,"<br>")}function x(a){const e=String(a||"").trim();if(!e)return"—";const s=e.includes("T")?e:e.replace(" ","T"),r=new Date(s);if(Number.isNaN(r.getTime()))return e;try{return new Intl.DateTimeFormat(document.documentElement.lang||"ar",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(r)}catch{return e}}function V(a){const e=String(a||"").trim();return e?e.slice(0,16).replace(" ","T"):""}function $(a){const e=g[String(a||"").trim()]||g.new;return n(e.key,document.documentElement.lang==="en"?e.fallbackEn:e.fallbackAr)}function z(a){const e=String(a||"new").trim();return`<span class="badge ${(g[e]||g.new).badge}">${i($(e))}</span>`}function A(a){const e=String(a||"").trim();if(!e)return"—";const s=j[e];return s?document.documentElement.lang==="en"?s.en:s.ar:e}function C(a){const e=String(a||"").trim().toLowerCase();return e==="yes"?n("common.boolean.yes","نعم"):e==="no"?n("common.boolean.no","لا"):"—"}function B(a,{compact:e=!1}={}){const s=Math.max(0,Math.min(5,Number.parseInt(String(a||"0"),10)||0)),r=`${"★".repeat(s)}${"☆".repeat(5-s)}`;return e?`${r} ${u(String(s))}/5`:`
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-warning text-lg" aria-hidden="true">${i(r)}</span>
      <span class="font-semibold text-base-content">${u(String(s))}/5</span>
    </div>
  `}function O(){t.logoutBtn=o("#logout-btn"),t.refreshBtn=o("#feedback-submissions-refresh"),t.statusFilter=o("#feedback-status-filter"),t.ratingFilter=o("#feedback-rating-filter"),t.searchFilter=o("#feedback-search-filter"),t.tableBody=o("#feedback-submissions-body"),t.detailContent=o("#feedback-detail-content"),t.workflow=o("#feedback-workflow"),t.activityList=o("#feedback-activity-list"),t.detailStatusBadge=o("#feedback-detail-status-badge"),t.statNew=o("#feedback-stat-new"),t.statFollowUp=o("#feedback-stat-follow-up"),t.statHighRated=o("#feedback-stat-high-rated"),t.statResponded=o("#feedback-stat-responded")}function G(){const a=String(b?.role||"").toLowerCase(),e=a==="admin",s=e||a==="manager";document.querySelectorAll("[data-admin-card]").forEach(r=>{r.classList.toggle("hidden",!e)}),document.querySelectorAll("[data-manager-card]").forEach(r=>{r.classList.toggle("hidden",!s)})}function J(){document.body.classList.remove("auth-pending")}function L(a){const e=Array.isArray(a)?a:[],s=r=>e.filter(d=>String(d?.status||"")===r).length;if(t.statNew&&(t.statNew.textContent=u(String(s("new")))),t.statFollowUp&&(t.statFollowUp.textContent=u(String(s("follow_up_needed")))),t.statHighRated){const r=e.filter(d=>Number.parseInt(String(d?.overall_rating||"0"),10)>=4).length;t.statHighRated.textContent=u(String(r))}if(t.statResponded){const r=s("responded")+s("closed");t.statResponded.textContent=u(String(r))}}function F(a){if(t.tableBody){if(!Array.isArray(a)||a.length===0){t.tableBody.innerHTML=`
      <tr>
        <td colspan="8" class="text-center text-base-content/60">
          ${n("feedbackSubmissions.table.empty","لا توجد تقييمات مطابقة للفلترة الحالية.")}
        </td>
      </tr>
    `;return}t.tableBody.innerHTML=a.map(e=>`
      <tr class="${Number(e.id)===Number(c)?"bg-primary/5":""}">
        <td>${i(e.feedback_code||"—")}</td>
        <td>
          <div class="font-semibold">${i(e.full_name||"—")}</div>
          <div class="text-xs text-base-content/60">${i(e.company_name||"—")}</div>
        </td>
        <td>
          <div class="font-medium text-base-content">${i(A(e.service_type))}</div>
          <div class="text-xs text-base-content/60">${i(C(e.recommendation))}</div>
        </td>
        <td>${i(B(e.overall_rating,{compact:!0}))}</td>
        <td>${z(e.status)}</td>
        <td>${i(x(e.follow_up_at))}</td>
        <td>${i(x(e.created_at))}</td>
        <td>
          <button type="button" class="btn btn-sm btn-primary" data-feedback-select="${i(e.id)}">
            ${n("actions.view","👁️ عرض")}
          </button>
        </td>
      </tr>
    `).join(""),t.tableBody.querySelectorAll("[data-feedback-select]").forEach(e=>{e.addEventListener("click",()=>{const s=Number(e.getAttribute("data-feedback-select")||0);s>0&&M(s)})})}}function m(){t.detailContent&&(t.detailContent.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-6 text-center text-base-content/60">
        ${n("feedbackSubmissions.details.empty","اختر تقييماً من القائمة لبدء المتابعة.")}
      </div>
    `),t.workflow&&(t.workflow.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-6 text-center text-base-content/60">
        ${n("feedbackSubmissions.workflow.empty","اختر تقييماً أولاً لتظهر أدوات التحديث.")}
      </div>
    `),t.activityList&&(t.activityList.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${n("feedbackSubmissions.activity.empty","لا يوجد نشاط بعد.")}
      </div>
    `),t.detailStatusBadge&&(t.detailStatusBadge.textContent="—",t.detailStatusBadge.className="badge badge-outline")}function N(a){const e=a?.feedback,s=Array.isArray(a?.activities)?a.activities:[];if(!e){m();return}const r=String(e.notification_sent??"0")==="1"?n("common.boolean.yes","نعم"):n("common.boolean.no","لا");t.detailContent&&(t.detailContent.innerHTML=`
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl bg-base-200/50 p-4">
          <div class="text-sm text-base-content/60">${n("feedbackSubmissions.table.customer","العميل")}</div>
          <div class="mt-2 text-lg font-semibold text-base-content">${i(e.full_name||"—")}</div>
          <div class="mt-2 text-sm text-base-content/75">${i(e.company_name||"—")}</div>
        </div>
        <div class="rounded-2xl bg-base-200/50 p-4">
          <div class="text-sm text-base-content/60">${n("feedbackSubmissions.details.rating","التقييم")}</div>
          <div class="mt-2">${B(e.overall_rating)}</div>
          <div class="mt-2 text-sm text-base-content/75">${i(e.feedback_code||"—")}</div>
        </div>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-base-300 p-4">
          <div class="text-sm text-base-content/60">${n("feedbackSubmissions.table.contact","التواصل")}</div>
          <div class="mt-2 space-y-2">
            <div class="font-medium text-base-content">${i(e.email||"—")}</div>
            <div class="text-sm text-base-content/75">${i(A(e.service_type))}</div>
          </div>
        </div>
        <div class="rounded-2xl border border-base-300 p-4">
          <div class="text-sm text-base-content/60">${n("feedbackSubmissions.details.meta","بيانات إضافية")}</div>
          <div class="mt-2 space-y-2 text-sm text-base-content/75">
            <div>${n("feedbackSubmissions.details.recommendation","التوصية")}: ${i(C(e.recommendation))}</div>
            <div>${n("feedbackSubmissions.details.createdAt","تاريخ الإنشاء")}: ${i(x(e.created_at))}</div>
            <div>${n("feedbackSubmissions.details.lastResponded","آخر رد")}: ${i(x(e.last_responded_at))}</div>
            <div>${n("feedbackSubmissions.details.emailSent","تم إرسال الإيميل")}: ${i(r)}</div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border border-base-300 p-4">
        <div class="text-sm text-base-content/60">${n("feedbackSubmissions.details.message","نص التقييم")}</div>
        <div class="mt-3 leading-8 text-base-content">${P(e.feedback_message||"—")}</div>
      </div>
    `),t.workflow&&(t.workflow.innerHTML=`
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" class="btn btn-outline btn-sm" id="feedback-assign-btn">
            ${n("feedbackSubmissions.workflow.assignToMe","تعيين لي")}
          </button>
          <button type="button" class="btn btn-outline btn-sm" id="feedback-mark-responded-btn">
            ${n("feedbackSubmissions.workflow.markResponded","تسجيل تم الرد")}
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <label for="feedback-detail-status" class="font-medium text-base-content">${n("feedbackSubmissions.workflow.status","الحالة")}</label>
          <select id="feedback-detail-status" class="select select-bordered w-full">
            ${Object.keys(g).map(d=>`
              <option value="${i(d)}" ${d===e.status?"selected":""}>${i($(d))}</option>
            `).join("")}
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label for="feedback-detail-follow-up" class="font-medium text-base-content">${n("feedbackSubmissions.workflow.followUpAt","موعد المتابعة القادم")}</label>
          <input id="feedback-detail-follow-up" type="datetime-local" class="input input-bordered w-full" value="${i(V(e.follow_up_at))}">
        </div>
        <div class="flex flex-col gap-2">
          <label for="feedback-detail-notes" class="font-medium text-base-content">${n("feedbackSubmissions.workflow.internalNotes","ملاحظات داخلية")}</label>
          <textarea id="feedback-detail-notes" class="textarea textarea-bordered min-h-36 w-full">${i(e.internal_notes||"")}</textarea>
        </div>
        <button type="button" class="btn btn-primary w-full" id="feedback-save-btn">
          ${n("feedbackSubmissions.workflow.save","حفظ التحديثات")}
        </button>
      </div>
    `,o("#feedback-save-btn")?.addEventListener("click",()=>w({})),o("#feedback-mark-responded-btn")?.addEventListener("click",()=>w({markResponded:!0})),o("#feedback-assign-btn")?.addEventListener("click",()=>w({assignToMe:!0}))),t.activityList&&(s.length?t.activityList.innerHTML=s.map(d=>`
        <article class="rounded-2xl border border-base-300 p-4">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <strong class="text-base-content">${i(d.username||"system")}</strong>
            <span class="text-xs text-base-content/60">${i(x(d.created_at))}</span>
          </div>
          <p class="mt-2 text-sm leading-7 text-base-content/80">${i(d.message||"")}</p>
        </article>
      `).join(""):t.activityList.innerHTML=`
        <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
          ${n("feedbackSubmissions.activity.empty","لا يوجد نشاط بعد.")}
        </div>
      `),t.detailStatusBadge&&(t.detailStatusBadge.className=`badge ${g[e.status]?.badge||"badge-outline"}`,t.detailStatusBadge.textContent=$(e.status))}async function f({preserveSelection:a=!0}={}){if(t.tableBody){t.tableBody.innerHTML=`
    <tr>
      <td colspan="8" class="text-center text-base-content/60">
        ${n("feedbackSubmissions.table.loading","⏳ جارٍ تحميل التقييمات...")}
      </td>
    </tr>
  `;try{const e=new URLSearchParams,s=String(t.statusFilter?.value||"").trim(),r=String(t.ratingFilter?.value||"").trim(),d=String(t.searchFilter?.value||"").trim();s&&e.set("status",s),r&&e.set("rating",r),d&&e.set("search",d),e.set("limit","100");const p=await _(`/feedback/admin.php?${e.toString()}`);if(k=Array.isArray(p?.data)?p.data:[],L(k),F(k),!a){c=0,m();return}const v=k.some(l=>Number(l.id)===Number(c));if(c>0&&v){await M(c,{silentOnError:!0});return}c=0,m()}catch(e){console.error("Failed to load feedback submissions",e),L([]),t.tableBody.innerHTML=`
      <tr>
        <td colspan="8" class="text-center text-error">
          ${i(e instanceof E?e.message:n("feedbackSubmissions.table.error","تعذر تحميل تقييمات العملاء."))}
        </td>
      </tr>
    `,m()}}}async function M(a,{silentOnError:e=!1}={}){const s=Number(a||0);if(s<=0){m();return}try{const r=await _(`/feedback/admin.php?id=${encodeURIComponent(s)}`);c=s,F(k),N(r?.data??null)}catch(r){console.error("Failed to load feedback details",r),e||h(r instanceof E?r.message:n("feedbackSubmissions.details.error","تعذر تحميل تفاصيل التقييم."),"error")}}async function w({markResponded:a=!1,assignToMe:e=!1}={}){if(c<=0||S)return;const s=o("#feedback-detail-status"),r=o("#feedback-detail-follow-up"),d=o("#feedback-detail-notes"),p=o("#feedback-save-btn"),v={id:c,status:s?.value||"new",follow_up_at:r?.value||"",internal_notes:d?.value||""};a&&(v.mark_responded=!0),e&&(v.assign_to_me=!0),S=!0,[p,o("#feedback-mark-responded-btn"),o("#feedback-assign-btn")].forEach(l=>{l&&(l.disabled=!0)});try{const l=await _("/feedback/admin.php",{method:"PATCH",body:v});N(l?.data??null),await f(),h(n("feedbackSubmissions.workflow.saved","تم حفظ التحديثات بنجاح."),"success")}catch(l){console.error("Failed to save feedback changes",l),h(l instanceof E?l.message:n("feedbackSubmissions.workflow.saveError","تعذر حفظ التحديثات."),"error")}finally{S=!1,[p,o("#feedback-mark-responded-btn"),o("#feedback-assign-btn")].forEach(l=>{l&&(l.disabled=!1)})}}function K(){t.logoutBtn&&!t.logoutBtn.dataset.listenerAttached&&(t.logoutBtn.addEventListener("click",()=>D()),t.logoutBtn.dataset.listenerAttached="true"),t.refreshBtn?.addEventListener("click",()=>{f({preserveSelection:!0})}),t.statusFilter?.addEventListener("change",()=>{f({preserveSelection:!1})}),t.ratingFilter?.addEventListener("change",()=>{f({preserveSelection:!1})}),t.searchFilter?.addEventListener("input",()=>{y&&clearTimeout(y),y=setTimeout(()=>{f({preserveSelection:!1})},300)})}async function T(){O(),K(),m();try{b=await U({redirect:!1}),b||(b=await q({refresh:!0}))}catch{b=null}if(!b){window.location.href="login.html";return}const a=String(b?.role||"").toLowerCase();if(a!=="admin"&&a!=="manager"){window.location.href="home.html";return}G(),J(),await f({preserveSelection:!0})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{T().catch(a=>{console.error("Failed to bootstrap feedback submissions page",a)})},{once:!0}):T().catch(a=>{console.error("Failed to bootstrap feedback submissions page",a)});
