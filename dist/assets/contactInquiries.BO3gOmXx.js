import{a as C,c as B,i as N,g as M,l as F,t as i,b as I,A as T,n as y,j as $}from"./auth.D6qGTG2k.js";import"./dashboard.DxySzp-u.js";import{i as D}from"./dashboardShell.DF2kUed9.js";C();B();D();N();const e={};let q=null,b=[],u=0,x=null,w=!1;const m={new:{badge:"badge-neutral",fallbackAr:"جديدة",fallbackEn:"New",key:"contactInquiries.status.new"},in_progress:{badge:"badge-warning",fallbackAr:"قيد المتابعة",fallbackEn:"In Progress",key:"contactInquiries.status.inProgress"},contacted:{badge:"badge-info",fallbackAr:"تم التواصل",fallbackEn:"Contacted",key:"contactInquiries.status.contacted"},won:{badge:"badge-success",fallbackAr:"تم التحويل",fallbackEn:"Won",key:"contactInquiries.status.won"},lost:{badge:"badge-error",fallbackAr:"مفقودة",fallbackEn:"Lost",key:"contactInquiries.status.lost"},closed:{badge:"badge-outline",fallbackAr:"مغلقة",fallbackEn:"Closed",key:"contactInquiries.status.closed"}};function c(a){return document.querySelector(a)}function o(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function H(a){return o(a).replace(/\n/g,"<br>")}function v(a){const t=String(a||"").trim();if(!t)return"—";const n=t.includes("T")?t:t.replace(" ","T"),s=new Date(n);if(Number.isNaN(s.getTime()))return t;try{return new Intl.DateTimeFormat(document.documentElement.lang||"ar",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(s)}catch{return t}}function j(a){const t=String(a||"").trim();return t?t.slice(0,16).replace(" ","T"):""}function U(a){const t=String(a||"").trim();if(!t)return!1;const n=new Date(t.includes("T")?t:t.replace(" ","T"));if(Number.isNaN(n.getTime()))return!1;const s=new Date;return n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()}function k(a){const t=m[String(a||"").trim()]||m.new;return i(t.key,document.documentElement.lang==="en"?t.fallbackEn:t.fallbackAr)}function P(a){const t=String(a||"new").trim();return`<span class="badge ${(m[t]||m.new).badge}">${o(k(t))}</span>`}function O(){e.logoutBtn=c("#logout-btn"),e.refreshBtn=c("#contact-inquiries-refresh"),e.statusFilter=c("#contact-status-filter"),e.searchFilter=c("#contact-search-filter"),e.tableBody=c("#contact-inquiries-body"),e.detailContent=c("#contact-inquiry-detail-content"),e.workflow=c("#contact-inquiry-workflow"),e.activityList=c("#contact-inquiry-activity-list"),e.detailStatusBadge=c("#contact-detail-status-badge"),e.statNew=c("#contact-stat-new"),e.statProgress=c("#contact-stat-progress"),e.statFollowUpToday=c("#contact-stat-followup-today"),e.statClosed=c("#contact-stat-closed")}function R(){const a=String(q?.role||"").toLowerCase(),t=a==="admin",n=t||a==="manager";document.querySelectorAll("[data-admin-card]").forEach(s=>{s.classList.toggle("hidden",!t)}),document.querySelectorAll("[data-manager-card]").forEach(s=>{s.classList.toggle("hidden",!n)})}function L(a){const t=Array.isArray(a)?a:[],n=s=>t.filter(d=>String(d?.status||"")===s).length;if(e.statNew&&(e.statNew.textContent=y(String(n("new")))),e.statProgress){const s=n("in_progress")+n("contacted");e.statProgress.textContent=y(String(s))}if(e.statFollowUpToday){const s=t.filter(d=>U(d?.follow_up_at)).length;e.statFollowUpToday.textContent=y(String(s))}if(e.statClosed){const s=n("closed")+n("won")+n("lost");e.statClosed.textContent=y(String(s))}}function _(a){if(e.tableBody){if(!Array.isArray(a)||a.length===0){e.tableBody.innerHTML=`
      <tr>
        <td colspan="8" class="text-center text-base-content/60">
          ${i("contactInquiries.table.empty","لا توجد رسائل مطابقة للفلترة الحالية.")}
        </td>
      </tr>
    `;return}e.tableBody.innerHTML=a.map(t=>{const n=Number(t.id)===Number(u)?"bg-primary/5":"",s=t.project_type||t.company_name||"—";return`
      <tr class="${n}">
        <td>${o(t.inquiry_code||"—")}</td>
        <td>
          <div class="font-semibold">${o(t.full_name||"—")}</div>
          <div class="text-xs text-base-content/60">${o(t.assigned_username||"—")}</div>
        </td>
        <td>
          <div dir="ltr">${o(t.phone||"—")}</div>
          <div class="text-xs text-base-content/60">${o(t.email||"—")}</div>
        </td>
        <td>${o(s)}</td>
        <td>${P(t.status)}</td>
        <td>${o(v(t.follow_up_at))}</td>
        <td>${o(v(t.created_at))}</td>
        <td>
          <button type="button" class="btn btn-sm btn-primary" data-contact-select="${o(t.id)}">
            ${i("actions.view","👁️ عرض")}
          </button>
        </td>
      </tr>
    `}).join(""),e.tableBody.querySelectorAll("[data-contact-select]").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-contact-select")||0);n>0&&S(n)})})}}function f(){e.detailContent&&(e.detailContent.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-6 text-center text-base-content/60">
        ${i("contactInquiries.details.empty","اختر رسالة من القائمة لبدء المتابعة.")}
      </div>
    `),e.workflow&&(e.workflow.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-6 text-center text-base-content/60">
        ${i("contactInquiries.workflow.empty","اختر رسالة أولاً لتظهر أدوات التحديث.")}
      </div>
    `),e.activityList&&(e.activityList.innerHTML=`
      <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
        ${i("contactInquiries.activity.empty","لا يوجد نشاط بعد.")}
      </div>
    `),e.detailStatusBadge&&(e.detailStatusBadge.textContent="—",e.detailStatusBadge.className="badge badge-outline")}function A(a){const t=a?.inquiry,n=Array.isArray(a?.activities)?a.activities:[];if(!t){f();return}const s=t.project_type||t.company_name||"—",d=t.notification_sent?i("common.boolean.yes","نعم"):i("common.boolean.no","لا");e.detailContent&&(e.detailContent.innerHTML=`
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl bg-base-200/50 p-4">
          <div class="text-sm text-base-content/60">${i("contactInquiries.table.customer","العميل")}</div>
          <div class="mt-2 text-lg font-semibold text-base-content">${o(t.full_name||"—")}</div>
          <div class="mt-2 text-sm text-base-content/75">${o(t.company_name||"—")}</div>
        </div>
        <div class="rounded-2xl bg-base-200/50 p-4">
          <div class="text-sm text-base-content/60">${i("contactInquiries.table.project","المشروع")}</div>
          <div class="mt-2 text-lg font-semibold text-base-content">${o(s)}</div>
          <div class="mt-2 text-sm text-base-content/75">${o(t.inquiry_code||"—")}</div>
        </div>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-base-300 p-4">
          <div class="text-sm text-base-content/60">${i("contactInquiries.table.contact","التواصل")}</div>
          <div class="mt-2 space-y-2">
            <div dir="ltr" class="font-medium text-base-content">${o(t.phone||"—")}</div>
            <div class="text-sm text-base-content/75">${o(t.email||"—")}</div>
          </div>
        </div>
        <div class="rounded-2xl border border-base-300 p-4">
          <div class="text-sm text-base-content/60">${i("contactInquiries.details.meta","بيانات إضافية")}</div>
          <div class="mt-2 space-y-2 text-sm text-base-content/75">
            <div>${i("contactInquiries.details.createdAt","تاريخ الإنشاء")}: ${o(v(t.created_at))}</div>
            <div>${i("contactInquiries.details.lastContacted","آخر تواصل")}: ${o(v(t.last_contacted_at))}</div>
            <div>${i("contactInquiries.details.emailSent","تم إرسال الإيميل")}: ${o(d)}</div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border border-base-300 p-4">
        <div class="text-sm text-base-content/60">${i("contactInquiries.details.message","الرسالة")}</div>
        <div class="mt-3 leading-8 text-base-content">${H(t.message||"—")}</div>
      </div>
    `),e.workflow&&(e.workflow.innerHTML=`
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" class="btn btn-outline btn-sm" id="contact-assign-btn">
            ${i("contactInquiries.workflow.assignToMe","تعيين لي")}
          </button>
          <button type="button" class="btn btn-outline btn-sm" id="contact-mark-contacted-btn">
            ${i("contactInquiries.workflow.markContacted","تسجيل تم التواصل")}
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <label for="contact-detail-status" class="font-medium text-base-content">${i("contactInquiries.workflow.status","الحالة")}</label>
          <select id="contact-detail-status" class="select select-bordered w-full">
            ${Object.keys(m).map(r=>`
              <option value="${o(r)}" ${r===t.status?"selected":""}>${o(k(r))}</option>
            `).join("")}
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label for="contact-detail-follow-up" class="font-medium text-base-content">${i("contactInquiries.workflow.followUpAt","موعد المتابعة القادم")}</label>
          <input id="contact-detail-follow-up" type="datetime-local" class="input input-bordered w-full" value="${o(j(t.follow_up_at))}">
        </div>
        <div class="flex flex-col gap-2">
          <label for="contact-detail-notes" class="font-medium text-base-content">${i("contactInquiries.workflow.internalNotes","ملاحظات داخلية")}</label>
          <textarea id="contact-detail-notes" class="textarea textarea-bordered min-h-36 w-full">${o(t.internal_notes||"")}</textarea>
        </div>
        <button type="button" class="btn btn-primary w-full" id="contact-save-btn">
          ${i("contactInquiries.workflow.save","حفظ التحديثات")}
        </button>
      </div>
    `,c("#contact-save-btn")?.addEventListener("click",()=>h({})),c("#contact-mark-contacted-btn")?.addEventListener("click",()=>h({markContacted:!0})),c("#contact-assign-btn")?.addEventListener("click",()=>h({assignToMe:!0}))),e.activityList&&(n.length?e.activityList.innerHTML=n.map(r=>`
        <article class="rounded-2xl border border-base-300 p-4">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <strong class="text-base-content">${o(r.username||"system")}</strong>
            <span class="text-xs text-base-content/60">${o(v(r.created_at))}</span>
          </div>
          <p class="mt-2 text-sm leading-7 text-base-content/80">${o(r.message||"")}</p>
        </article>
      `).join(""):e.activityList.innerHTML=`
        <div class="rounded-2xl border border-dashed border-base-300 p-5 text-center text-base-content/60">
          ${i("contactInquiries.activity.empty","لا يوجد نشاط بعد.")}
        </div>
      `),e.detailStatusBadge&&(e.detailStatusBadge.className=`badge ${m[t.status]?.badge||"badge-outline"}`,e.detailStatusBadge.textContent=k(t.status))}async function p({preserveSelection:a=!0}={}){if(e.tableBody){e.tableBody.innerHTML=`
    <tr>
      <td colspan="8" class="text-center text-base-content/60">
        ${i("contactInquiries.table.loading","⏳ جارٍ تحميل الرسائل...")}
      </td>
    </tr>
  `;try{const t=new URLSearchParams,n=String(e.statusFilter?.value||"").trim(),s=String(e.searchFilter?.value||"").trim();n&&t.set("status",n),s&&t.set("search",s),t.set("limit","100");const d=await I(`/contact/admin.php?${t.toString()}`);if(b=Array.isArray(d?.data)?d.data:[],L(b),_(b),!a){u=0,f();return}if(u>0&&b.some(g=>Number(g.id)===Number(u))){await S(u,{silentOnError:!0});return}b.length>0?await S(Number(b[0].id),{silentOnError:!0}):(u=0,f())}catch(t){console.error("Failed to load contact inquiries",t),L([]),e.tableBody.innerHTML=`
      <tr>
        <td colspan="8" class="text-center text-error">
          ${o(t instanceof T?t.message:i("contactInquiries.table.error","تعذر تحميل رسائل التواصل."))}
        </td>
      </tr>
    `,f()}}}async function S(a,{silentOnError:t=!1}={}){const n=Number(a||0);if(n<=0){f();return}try{const s=await I(`/contact/admin.php?id=${encodeURIComponent(n)}`);u=n,_(b),A(s?.data??null)}catch(s){console.error("Failed to load inquiry details",s),t||$(s instanceof T?s.message:i("contactInquiries.details.error","تعذر تحميل تفاصيل الرسالة."),"error")}}async function h({markContacted:a=!1,assignToMe:t=!1}={}){if(u<=0||w)return;const n=c("#contact-detail-status"),s=c("#contact-detail-follow-up"),d=c("#contact-detail-notes"),r=c("#contact-save-btn"),g={id:u,status:n?.value||"new",follow_up_at:s?.value||"",internal_notes:d?.value||""};a&&(g.mark_contacted=!0),t&&(g.assign_to_me=!0),w=!0,[r,c("#contact-mark-contacted-btn"),c("#contact-assign-btn")].forEach(l=>{l&&(l.disabled=!0)});try{const l=await I("/contact/admin.php",{method:"PATCH",body:g});A(l?.data??null),await p(),$(i("contactInquiries.workflow.saved","تم حفظ التحديثات بنجاح."),"success")}catch(l){console.error("Failed to save inquiry changes",l),$(l instanceof T?l.message:i("contactInquiries.workflow.saveError","تعذر حفظ التحديثات."),"error")}finally{w=!1,[r,c("#contact-mark-contacted-btn"),c("#contact-assign-btn")].forEach(l=>{l&&(l.disabled=!1)})}}function z(){e.logoutBtn&&!e.logoutBtn.dataset.listenerAttached&&(e.logoutBtn.addEventListener("click",()=>F()),e.logoutBtn.dataset.listenerAttached="true"),e.refreshBtn?.addEventListener("click",()=>{p({preserveSelection:!0})}),e.statusFilter?.addEventListener("change",()=>{p({preserveSelection:!1})}),e.searchFilter?.addEventListener("input",()=>{x&&clearTimeout(x),x=setTimeout(()=>{p({preserveSelection:!1})},300)})}async function E(){O(),z(),f();try{q=await M({refresh:!0})}catch{q=null}R(),await p({preserveSelection:!0})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{E().catch(a=>{console.error("Failed to bootstrap contact inquiries page",a)})},{once:!0}):E().catch(a=>{console.error("Failed to bootstrap contact inquiries page",a)});
