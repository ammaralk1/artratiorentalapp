import{v as Wt,w as Gt,x as St,o as et,s as $,t as s,l as xt,n as j,A as Jt,e as Kt,m as Yt,h as Xt,i as Qt,f as dt,g as Ne}from"./auth.CqiyQgTP.js";/* empty css              */import{i as Zt}from"./dashboardShell.DoHAApXs.js";import{d as m,r as me,a as je,u as Se,s as A,b as ea,f as ta,h as aa,i as na,j as I,k as o,l as sa,m as tt,n as ra,o as ut,e as ze,p as pt,q as oa,t as ia,g as ca,c as la,v as da,w as wt,x as ua,y as pa,z as ma,A as fa,B as ha,C as ya,D as ba,E as va,F as ga,G as ja,H as Sa,I as Ce,J as xa,K as Pt,L as wa,M as Pa}from"./form.DAGYVrCf.js";import"./customers.D1kYGtzG.js";import{g as at,o as Ee,q as We,a as Tt,D as Ge,k as Ta}from"./reservationsService.DLocEoFG.js";import{P as nt,i as st,j as mt,u as At,k as rt,l as De,n as Aa,o as Ea,p as $a,f as Na,g as Ca,w as Da,q as Je,t as Ke,e as Et,v as $t,x as La,y as ka}from"./controller.BqYoWrbk.js";import{c as Ma}from"./calculations.D5uXAua8.js";let ft=null;function Ia(e){e&&Nt()!==e&&et({[nt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Nt(){return St()?.[nt]||""}function Ct(e){e&&Ye()!==e&&et({[st]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function Ye(){return St()?.[st]||""}function Ra(e){if(!e)return"";const t=e.trim();return t?Object.values(mt).includes(t)?t:mt[t]||"":""}function Fa(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Ra(t);if(a)return a}}catch{}return""}function Dt(e,t){!e||!m.tabPanes||!m.tabButtons||(m.tabButtons.forEach(a=>{const n=a===t;a.classList.toggle("active",n),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",n)}),m.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Ia(e))}function Ba(){if(!m.tabButtons||!m.tabButtons.length)return;m.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",n=>{n.preventDefault();const r=a.dataset.tabTarget;r&&(Dt(r,a),r==="projects-section"&&(A.filters.search="",m.search&&(m.search.value=""),me(),je(),Se()))}),a.dataset.tabListenerAttached="true")});const e=Nt(),t=e&&m.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function ot(e,t){!e||!m.projectSubTabButtons||!m.projectSubTabPanes||(m.projectSubTabButtons.forEach(a=>{const n=a===t;a.classList.toggle("active",n),a.classList.contains("tab")&&a.classList.toggle("tab-active",n)}),m.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function _a(){!m.projectSubTabButtons||!m.projectSubTabButtons.length||(m.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(ot(a,e),Ct(a))}),e.dataset.tabListenerAttached="true")}),Ha())}function Ha(){const t=Fa()||Ye();if(!t)return;const a=m.projectSubTabButtons?.[0],n=m.projectSubTabButtons?.find(c=>c.dataset.projectSubtabTarget===t)||a,r=n?.dataset.projectSubtabTarget;r&&(t!==Ye()&&Ct(r),ot(r,n))}function qa(){return m.tabButtons?m.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function ht(e={}){if(e){if(m.tabButtons&&m.tabButtons.length){const a=m.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",n=e[nt];if(n&&n!==a){const r=m.tabButtons.find(c=>c.dataset.tabTarget===n);r&&Dt(n,r)}}if(m.projectSubTabButtons&&m.projectSubTabButtons.length&&qa()){const a=m.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",n=e[st];if(n&&n!==a){const r=m.projectSubTabButtons.find(c=>c.dataset.projectSubtabTarget===n);r&&ot(n,r)}}}}function Oa(){ft||(ft=Wt(e=>{ht(e)})),Gt().then(e=>{ht(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function se(e){const t=A.projects.find(B=>String(B.id)===String(e));if(!t||!m.detailsBody)return;m.detailsBody.dataset.mode="view",m.detailsBody.dataset.projectId=String(t.id);const n=(A.customers.length?A.customers:xt().customers||[]).find(B=>String(B.id)===String(t.clientId)),r=It(t.type),l=t.description?.trim()||s("projects.fallback.noDescription","لا يوجد وصف"),d=n?.customerName||s("projects.fallback.unknownClient","عميل غير معروف"),i=n?.phone??n?.customerPhone??t.clientPhone??t.customerPhone??"",f=i?j(String(i).trim()):s("projects.details.client.noPhone","لا يوجد رقم متاح"),u=n?.email??t.clientEmail??t.customerEmail??"",g=u?String(u).trim():s("projects.details.client.noEmail","لا يوجد بريد متاح"),y=(t.clientCompany||n?.companyName||"").trim(),N=t.projectCode||`PRJ-${j(String(t.id))}`,P=j(N),M=ta(t.id),U=M.reduce((B,Y)=>B+an(Y),0),T=Number(U.toFixed(2)),x=M.length,{subtotal:ee,applyTax:q,expensesTotal:oe}=aa(t),fe=ee,ie=q?Number(((fe+T)*Aa).toFixed(2)):0,z=Number((fe+T+ie).toFixed(2)),te=na(t),he=s(`projects.status.${te}`,Ea[te]||te),J={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"}[te]||"status-confirmed",K=q?s("projects.details.chips.vatOn","شامل الضريبة 15٪"):s("projects.details.chips.vatOff","غير شامل الضريبة"),ce=q?"status-paid":"status-unpaid",le=s("projects.details.chips.reservations","{count} حجوزات").replace("{count}",j(String(x))),ke=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",ae=Za(t),de=ae.length>0,v=de?0:Number(t.paidAmount)||0,h=de?0:Number(t.paidPercent)||0,b=Ee({totalAmount:z,paidAmount:v,paidPercent:h,history:ae}),w=We({manualStatus:ke||"unpaid",paidAmount:b.paidAmount,paidPercent:b.paidPercent,totalAmount:z}),E=s(`projects.paymentStatus.${w}`,w==="paid"?"Paid":w==="partial"?"Partial":"Unpaid"),O=w==="paid"?"status-paid":w==="partial"?"status-partial":"status-unpaid",L=Number.isFinite(Number(b.paidAmount))?Number(b.paidAmount):0,D=Number.isFinite(Number(b.paidPercent))?Number(b.paidPercent):0,F=Math.max(0,Number((z-L).toFixed(2))),X=I(L),k=`${j(D.toFixed(2))}%`,Q=I(F),Me=Xa(ae),xe=s("projects.focus.confirmed","✅ مشروع مؤكد"),ye=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(xe)}</span>`:"",we=[{icon:"💼",label:s("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:I(fe)},{icon:"🔗",label:s("projects.details.summary.reservationsTotal","إجمالي المعدات / طاقم العمل"),value:I(T)},{icon:"🧮",label:s("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:I(ie)},{icon:"💰",label:s("projects.details.summary.overallTotal","الإجمالي الكلي"),value:I(z)},{icon:"💳",label:s("projects.details.summary.paidAmount","إجمالي المدفوع"),value:X},{icon:"📊",label:s("projects.details.summary.paidPercent","نسبة المدفوع"),value:k},{icon:"💸",label:s("projects.details.summary.remainingAmount","المتبقي للدفع"),value:Q}].map(({icon:B,label:Y,value:Z})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${B} ${o(Y)}</span>
      <span class="summary-details-value">${o(Z)}</span>
    </div>
  `).join(""),Ie=s("projects.details.labels.code","رقم المشروع"),Re=`
    <div class="project-details-code-badge" title="${o(Ie)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Ie)}
      </span>
      <span class="project-details-code-badge__value">${o(P)}</span>
    </div>
  `,Fe=[{icon:"👤",label:s("projects.details.client","العميل"),value:d},{icon:"📞",label:s("projects.details.labels.clientPhone","رقم العميل"),value:f},{icon:"✉️",label:s("projects.details.labels.clientEmail","البريد الإلكتروني"),value:g},y?{icon:"🏢",label:s("projects.details.company","شركة العميل"),value:y}:null,{icon:"🏷️",label:s("projects.details.type","نوع المشروع"),value:r},yt("start",t.start),yt("end",t.end)].filter(Boolean),Be=s("projects.details.overview.heading","معلومات المشروع"),_e=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Be)}</h6>
      <ul class="project-details-outline__list">
        ${Fe.map(({icon:B,label:Y,value:Z,meta:_})=>`
          <li>
            <span class="project-details-outline__label">${o(B)} ${o(Y)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${o(Z)}</span>
              ${_?`<span class="project-details-outline__meta">${o(_)}</span>`:""}
            </span>
          </li>
        `).join("")}
      </ul>
    </div>
  `,be=[`<span class="reservation-chip ${J}">${o(he)}</span>`,`<span class="reservation-chip ${ce}">${o(K)}</span>`,`<span class="reservation-chip status-info">${o(le)}</span>`,`<span class="reservation-chip ${O}">${o(E)}</span>`,ye].filter(Boolean).join(""),Pe=s("projects.details.expensesTotal","إجمالي المصاريف"),He=s("projects.details.reservationsTotal","إجمالي الحجوزات");m.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${be}</div>
        </div>
        <div class="project-details-header__code">
          ${Re}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${_e}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(s("projects.details.summary.title","ملخص مالي"))}</h6>
            ${we}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(s("projects.details.description","وصف المشروع"))}</h5>
      <p class="project-details-description">${o(l)}</p>
    </section>
    <section class="project-details-section">
      <h5>${o(s("projects.details.financialBreakdown","تفاصيل مالية"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(Pe)}</span>
          <strong>${I(oe)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(He)}</span>
          <strong>${I(T)}</strong>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(s("reservations.paymentHistory.title","سجل الدفعات"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(s("projects.details.paymentOverview.total","الإجمالي الكلي"))}</span>
          <strong>${o(I(z))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(s("projects.details.paymentOverview.paid","المدفوع"))}</span>
          <strong>${o(X)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(s("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(k)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(s("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(Q)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${Me}
      </div>
    </section>
    ${sa(t)}
    <div class="project-details-footer">
      <button type="button" class="modal-action-btn modal-action-btn--primary" data-action="create-reservation">
        ${o(s("projects.details.reservations.create","➕ إنشاء حجز مرتبط"))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--ghost" data-action="edit-project">
        ${o(s("projects.details.actions.edit","✏️ تعديل المشروع"))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--danger" data-action="delete-project">
        ${o(s("projects.details.actions.delete","🗑️ حذف المشروع"))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--ghost" id="project-details-export-btn">
        ${o(s("projects.details.actions.exportPdf","👁️ معاينة PDF"))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--ghost" data-bs-dismiss="modal">
        ${o(s("actions.close","إغلاق"))}
      </button>
    </div>
  `,za(t);const C=m.detailsBody.querySelector("#project-details-export-btn");C&&C.addEventListener("click",async B=>{if(B.preventDefault(),C.blur(),!C.disabled){C.disabled=!0;try{await $a({project:t})}catch(Y){console.error("❌ [projects/details] export project PDF failed",Y),$(s("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{C.disabled=!1}}}),m.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m.detailsModalEl).show()}function Va({onOpenProject:e}){!m.focusCards||m.focusCards.dataset.listenerAttached==="true"||(m.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:c}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),Ja(c);return}r==="view"?e?.(c):r==="highlight"&&Ua(c);return}const n=t.target.closest(".project-focus-card");n?.dataset.projectId&&e?.(n.dataset.projectId)}),m.focusCards.dataset.listenerAttached="true")}function Ua(e){if(!m.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=m.projectsTableBody.querySelector(t);if(!a){$(s("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function za(e){if(!m.detailsBody)return;const t=m.detailsBody.querySelector('[data-action="create-reservation"]'),a=m.detailsBody.querySelector('[data-action="edit-project"]'),n=m.detailsBody.querySelector('[data-action="delete-project"]'),r=m.detailsBody.querySelector(".project-reservations-list");if(t&&e&&t.addEventListener("click",c=>{c.preventDefault(),Ga(e)}),a&&e&&a.addEventListener("click",c=>{c.preventDefault(),Lt(e)}),n&&e&&n.addEventListener("click",async c=>{c.preventDefault();const l=c.currentTarget;l.disabled=!0;try{await ra(e.id),!A.projects.some(i=>String(i.id)===String(e.id))&&m.detailsModalEl&&window.bootstrap?.Modal.getInstance(m.detailsModalEl)?.hide()}finally{A.projects.some(i=>String(i.id)===String(e.id))&&(l.disabled=!1)}}),r){const c=async l=>{if(!Number.isInteger(l)||l<0)return!1;const d=Ca("showReservationDetails");if(typeof d=="function")return d(l),!0;try{const i=await Da("showReservationDetails");if(typeof i=="function")return i(l),!0}catch(i){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",i)}return!1};r.addEventListener("click",async l=>{const d=l.target.closest('[data-action="view-reservation"]');if(!d)return;const i=d.dataset.index||d.dataset.reservationIndex,f=Number.parseInt(i||"-1",10);if(!Number.isInteger(f)||f<0)return;await c(f)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",l=>{if(!["Enter"," "].includes(l.key))return;const d=l.target.closest('[data-action="view-reservation"]');d&&(l.preventDefault(),d.click())})}}function Lt(e){if(!e||!m.detailsBody)return;const t=A.projects.find(u=>String(u.id)===String(e.id));if(!t)return;const a=A.customers.find(u=>String(u.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const n=Array.isArray(t.expenses)?t.expenses.map((u,g)=>({id:u?.id||`expense-${t.id}-${g}-${Date.now()}`,label:u?.label||"",amount:Number(u?.amount)||0})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((u,g)=>({type:u?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(u?.amount))?Number(u.amount):null,percentage:Number.isFinite(Number(u?.percentage))?Number(u.percentage):null,value:Number.isFinite(Number(u?.value))?Number(u.value):null,note:u?.note??null,recordedAt:u?.recordedAt??u?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${g}`})):[],c=r.reduce((u,g)=>u+(Number(g?.amount)||0),0),l=r.reduce((u,g)=>u+(Number(g?.percentage)||0),0),d=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,i=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(d>0||i>0)){const u=t.updatedAt??t.createdAt??new Date().toISOString();i>0?r=[{type:"percent",amount:Number.isFinite(d)&&d>0?d:null,percentage:i,value:i,note:null,recordedAt:u,key:`legacy-payment-${t.id}-percent`}]:d>0&&(r=[{type:"amount",amount:d,percentage:null,value:d,note:null,recordedAt:u,key:`legacy-payment-${t.id}-amount`}]),c=r.reduce((g,y)=>g+(Number(y?.amount)||0),0),l=r.reduce((g,y)=>g+(Number(y?.percentage)||0),0),d=0,i=0}c>0&&Math.abs(d-c)<.01&&(d=0),l>0&&Math.abs(i-l)<.01&&(i=0);const f={expenses:n,payments:r,basePaidAmount:d,basePaidPercent:i};m.detailsBody.dataset.mode="edit",m.detailsBody.innerHTML=Ka(t,f),Wa(t,f)}function Wa(e,t={expenses:[]}){const a=m.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const n=a.querySelector('[data-action="cancel-edit"]');n&&n.addEventListener("click",v=>{v.preventDefault(),se(e.id)});const r=a.querySelector("#project-edit-expense-label"),c=a.querySelector("#project-edit-expense-amount"),l=a.querySelector('[data-action="add-expense"]'),d=a.querySelector("#project-edit-expense-list"),i=a.querySelector('[name="project-start-date"]'),f=a.querySelector('[name="project-start-time"]'),u=a.querySelector('[name="project-end-date"]'),g=a.querySelector('[name="project-end-time"]'),y=a.querySelector('[name="project-payment-status"]'),N=a.querySelector("#project-edit-tax"),P=a.querySelector("#project-edit-company-share"),M=a.querySelector("#project-edit-discount"),U=a.querySelector("#project-edit-discount-type"),T=a.querySelector("#project-edit-payment-progress-type"),x=a.querySelector("#project-edit-payment-progress-value"),ee=a.querySelector("#project-edit-payment-add"),q=a.querySelector("#project-edit-payment-history"),oe=a.querySelector("#project-edit-payment-summary"),fe=s("reservations.create.summary.currency","SR");let ie=!1;const z=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),te=()=>{const v=Number(e.equipmentEstimate)||0,h=Array.isArray(t.expenses)?t.expenses.reduce((X,k)=>X+(Number(k.amount)||0),0):0,b=U?.value==="amount"?"amount":"percent",w=j(M?.value||"0");let E=Number.parseFloat(w);(!Number.isFinite(E)||E<0)&&(E=0);const O=N?.checked===!0,L=P?.checked===!0;let D=L?ca(P):null;(!Number.isFinite(D)||D<=0)&&(D=L?Ge:null);const F=la({equipmentEstimate:v,expensesTotal:h,discountValue:E,discountType:b,applyTax:O,companyShareEnabled:L,companySharePercent:D});return{equipmentEstimate:v,expensesTotal:h,discountValue:E,discountTypeValue:b,applyTax:O,companyShareEnabled:L,companySharePercent:D,finance:F}},he=()=>{const v=te(),h=z(),b=Ee({totalAmount:v.finance.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:h});return{...v,payments:h,progress:b}},ct=()=>{q&&(q.innerHTML=Qa(z()))},J=()=>{if(!oe)return;const{finance:v,progress:h}=he(),b=Number.isFinite(Number(v.totalWithTax))?Number(v.totalWithTax):0,w=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,E=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,O=Math.max(0,Math.round((b-w)*100)/100),L=[{label:s("projects.form.paymentSummary.total","الإجمالي الكلي"),value:I(b)},{label:s("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:I(w)},{label:s("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${j(E.toFixed(2))}%`},{label:s("projects.form.paymentSummary.remaining","المتبقي"),value:I(O)}];oe.innerHTML=L.map(({label:D,value:F})=>`
        <div class="project-details-grid-item">
          <span>${o(D)}</span>
          <strong>${o(F)}</strong>
        </div>
      `).join("")},K=(v="auto")=>{if(!y)return;const h=y.dataset?.userSelected==="true";if(v==="auto"&&h)return;const{finance:b,progress:w}=he(),E=We({manualStatus:h?y.value:e.paymentStatus||"unpaid",paidAmount:w.paidAmount,paidPercent:w.paidPercent,totalAmount:b.totalWithTax});h||(y.value=E)},ce=()=>{ct(),J(),K("auto")},le=1e-4,ke=()=>{const v=T?.value==="amount"?"amount":"percent",h=j(x?.value||"").replace("%","").trim();let b=Number.parseFloat(h);if(!Number.isFinite(b)||b<=0){$(s("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),x?.focus();return}const w=he(),E=Number.isFinite(Number(w.finance.totalWithTax))?Number(w.finance.totalWithTax):0;if(E<=0){$(s("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const O=Number(w.progress.paidAmount)||0,L=Number(w.progress.paidPercent)||0;let D=null,F=null;if(v==="percent"){const k=Math.max(0,100-L);if(k<=le){$(s("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(b>k){b=k;const Q=j(b.toFixed(2));$(s("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",Q))}F=Math.round(b*100)/100,E>0&&(D=Math.round(F/100*E*100)/100)}else{const k=Math.max(0,E-O);if(k<=le){$(s("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(b>k){b=k;const Q=`${j(b.toFixed(2))} ${fe}`;$(s("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",Q))}D=Math.round(b*100)/100,E>0&&(F=Math.round(D/E*100*100)/100)}const X={type:v,amount:D??null,percentage:F??null,value:v==="amount"?D:F,note:null,recordedAt:new Date().toISOString()};t.payments=[...z(),X],x&&(x.value=""),T&&(T.value="percent"),ce(),$(s("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},ae=v=>{!N||!P||ie||(ie=!0,v==="share"?P.checked?(N.checked||(N.checked=!0),ze(P)):N.checked&&(N.checked=!1):v==="tax"&&(N.checked?ze(P):P.checked&&(P.checked=!1)),ie=!1)};function de(){d&&(d.innerHTML=kt(t.expenses))}de(),ce(),M&&!M.dataset.listenerAttached&&(M.addEventListener("input",v=>{const h=v.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""),J(),K("auto"))}),M.dataset.listenerAttached="true"),U&&!U.dataset.listenerAttached&&(U.addEventListener("change",()=>{J(),K("auto")}),U.dataset.listenerAttached="true"),x&&!x.dataset.listenerAttached&&(x.addEventListener("input",v=>{const h=v.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""))}),x.dataset.listenerAttached="true"),y&&!y.dataset.listenerAttached&&(y.addEventListener("change",()=>{y.dataset.userSelected="true"}),y.dataset.listenerAttached="true"),c&&!c.dataset.listenerAttached&&(c.addEventListener("input",v=>{const h=v.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""))}),c.dataset.listenerAttached="true"),P&&!P.dataset.listenerAttached&&(P.addEventListener("change",()=>{ae("share"),J(),K("auto")}),P.dataset.listenerAttached="true"),N&&!N.dataset.listenerAttached&&(N.addEventListener("change",()=>{ae("tax"),J(),K("auto")}),N.dataset.listenerAttached="true"),P?.checked&&ze(P),ae(P?.checked?"share":"tax"),J(),K("auto"),l&&l.addEventListener("click",v=>{v.preventDefault();const h=r?.value.trim()||"",b=j(c?.value||"0"),w=Number(b);if(!h){$(s("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(w)||w<=0){$(s("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),c?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:h,amount:w}),r&&(r.value=""),c&&(c.value=""),de(),J(),K("auto")}),d&&d.addEventListener("click",v=>{const h=v.target.closest('[data-action="remove-expense"]');if(!h)return;const{id:b}=h.dataset;t.expenses=t.expenses.filter(w=>String(w.id)!==String(b)),de(),J(),K("auto")}),ee&&!ee.dataset.listenerAttached&&(ee.addEventListener("click",v=>{v.preventDefault(),ke()}),ee.dataset.listenerAttached="true"),q&&!q.dataset.listenerAttached&&(q.addEventListener("click",v=>{const h=v.target.closest('[data-action="remove-payment"]');if(!h)return;const b=Number.parseInt(h.dataset.index||"-1",10);if(!Number.isInteger(b)||b<0)return;const w=z();if(b>=w.length)return;const E=w.filter((O,L)=>L!==b);t.payments=E,ce(),$(s("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),q.dataset.listenerAttached="true"),a.addEventListener("submit",async v=>{if(v.preventDefault(),a.dataset.submitting==="true")return;const h=a.querySelector('[name="project-title"]'),b=a.querySelector('[name="project-type"]'),w=a.querySelector('[name="project-description"]'),E=h?.value.trim()||"",O=b?.value||"",L=i?.value.trim()||"",D=f?.value.trim()||"",F=w?.value.trim()||"",X=(y?.value||"unpaid").toLowerCase(),k=["paid","partial"].includes(X)?X:"unpaid";if(!E||!O||!L){$(s("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),h?.focus();return}const Q=u?.value.trim()||"",Me=g?.value.trim()||"",xe=pt(L,D),ye=Q?pt(Q,Me):"",lt=new Date(xe),we=ye?new Date(ye):null;if(we&&lt>we){$(s("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),u?.focus();return}if(A.projects.findIndex(W=>String(W.id)===String(e.id))===-1){$(s("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Re=te(),{equipmentEstimate:Fe,discountValue:Be,discountTypeValue:_e,applyTax:be,companyShareEnabled:Pe,companySharePercent:He,finance:C}=Re,B=T?.value==="amount"?"amount":"percent",Y=j(x?.value||"");let Z=Y?Number.parseFloat(Y):null,_=[...z()];if(Number.isFinite(Z)&&Z>0&&Number.isFinite(Number(C.totalWithTax))){const W=Ee({totalAmount:C.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:_}),pe=new Date().toISOString();if(B==="percent"){const ve=Math.max(0,100-(W.paidPercent||0));if(ve>le){const Ve=Math.min(Z,ve),ne=Math.round(Ve*100)/100,Ue=C.totalWithTax>0?Math.round(ne/100*C.totalWithTax*100)/100:null;_=[..._,{type:"percent",amount:Ue,percentage:ne,value:ne,note:null,recordedAt:pe}]}}else{const ve=Math.max(0,C.totalWithTax-(W.paidAmount||0));if(ve>le){const Ve=Math.min(Z,ve),ne=Math.round(Ve*100)/100,Ue=C.totalWithTax>0?Math.round(ne/C.totalWithTax*100*100)/100:null;_=[..._,{type:"amount",amount:ne,percentage:Ue,value:ne,note:null,recordedAt:pe}]}}_!==t.payments&&(t.payments=_,ce()),x&&(x.value=""),T&&(T.value="percent"),Z=null}const ue=Ee({totalAmount:C.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:_}),qe=y?.dataset?.userSelected==="true",Ut=We({manualStatus:qe?k:e.paymentStatus||k,paidAmount:ue.paidAmount,paidPercent:ue.paidPercent,totalAmount:C.totalWithTax}),Oe=qe?k:Ut;!qe&&y&&(y.value=Oe),y?.dataset&&delete y.dataset.userSelected,t.payments=_;const zt=Na({projectCode:e.projectCode,title:E,type:O,clientId:e.clientId,clientCompany:e.clientCompany,description:F,start:xe,end:ye||null,applyTax:be,paymentStatus:Oe,equipmentEstimate:Fe,expenses:t.expenses,discount:Be,discountType:_e,companyShareEnabled:Pe&&be,companySharePercent:Pe&&be?He:null,companyShareAmount:C.companyShareAmount,taxAmount:C.taxAmount,totalWithTax:C.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:oa(e),paidAmount:ue.paidAmount,paidPercentage:ue.paidPercent,paymentProgressType:ue.paymentProgressType,paymentProgressValue:ue.paymentProgressValue,payments:_});a.dataset.submitting="true";try{const W=await At(e.projectId??e.id,zt),pe=W?.projectId??W?.id??e.id;await ia(pe,Oe),A.projects=rt(),A.reservations=at(),$(s("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),me(),je(),Se(),se(e.id)}catch(W){console.error("❌ [projects] Failed to update project from details view",W);const pe=De(W)?W.message:s("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");$(pe,"error")}finally{delete a.dataset.submitting}})}function Ga(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description};et({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}m.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m.detailsModalEl)?.hide();const n=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${n}#reservations`}async function Ja(e){if(!e)return;const t=A.projects.find(a=>String(a.id)===String(e));if(!t){$(s("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){$(s("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await At(t.projectId??t.id,{confirmed:!0});const a=await ea(e);A.projects=rt(),A.reservations=at(),me(),je(),Se(),m.detailsModalEl&&m.detailsModalEl.classList.contains("show")&&m.detailsBody?.dataset.projectId===String(e)&&se(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),$(s("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const n=De(a)?a.message:s("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");$(n,"error")}}function Ka(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:n}=ut(e.start||""),{date:r,time:c}=ut(e.end||""),l=e.applyTax===!0||e.applyTax==="true",d=typeof e.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",i=["paid","partial"].includes(d)?d:"unpaid",f=e.discountType==="amount"?"amount":"percent",u=j(String(e.discount??e.discountValue??0)),g=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??Ge,y=Number.parseFloat(j(String(g))),N=Number.isFinite(y)&&y>0?y:Ge,P=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||l&&Number.isFinite(y)&&y>0;return`
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${o(s("projects.form.labels.title","عنوان المشروع"))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${o(e.title||"")}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${o(s("projects.form.labels.type","نوع المشروع"))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${Ya(e.type)}
          </select>
        </div>
        <div class="col-12">
          <div class="project-edit-inline-group project-edit-inline-group--dates">
            <div class="project-edit-inline-field">
              <label class="form-label">${o(s("projects.form.labels.startDate","تاريخ البدء"))}</label>
              <input type="date" class="form-control" name="project-start-date" value="${o(a)}" required>
            </div>
            <div class="project-edit-inline-field">
              <label class="form-label">${o(s("projects.form.labels.endDate","تاريخ الانتهاء"))}</label>
              <input type="date" class="form-control" name="project-end-date" value="${o(r)}">
            </div>
          </div>
          <div class="project-edit-inline-group project-edit-inline-group--times mt-2">
            <div class="project-edit-inline-field">
              <label class="form-label">${o(s("projects.form.labels.startTime","وقت البدء"))}</label>
              <input type="time" class="form-control" name="project-start-time" value="${o(n)}">
            </div>
            <div class="project-edit-inline-field">
              <label class="form-label">${o(s("projects.form.labels.endTime","وقت الانتهاء"))}</label>
              <input type="time" class="form-control" name="project-end-time" value="${o(c)}">
            </div>
          </div>
        </div>
        <div class="col-12">
          <label class="form-label">${o(s("projects.form.labels.description","الوصف"))}</label>
          <textarea class="form-control project-edit-textarea" name="project-description" rows="5">${o(e.description||"")}</textarea>
        </div>
        <div class="col-12 col-md-4 col-xl-3">
          <label class="form-label">${o(s("projects.form.labels.paymentStatus","حالة الدفع"))}</label>
          <select class="form-select project-edit-select-xs" name="project-payment-status" id="project-edit-payment-status">
            <option value="unpaid" ${i==="unpaid"?"selected":""}>${o(s("projects.paymentStatus.unpaid","غير مدفوع"))}</option>
            <option value="partial" ${i==="partial"?"selected":""}>${o(s("projects.paymentStatus.partial","مدفوع جزئياً"))}</option>
            <option value="paid" ${i==="paid"?"selected":""}>${o(s("projects.paymentStatus.paid","مدفوع"))}</option>
          </select>
        </div>
      </div>

      <div class="row g-3 align-items-start mt-1">
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label" for="project-edit-discount">${o(s("projects.form.labels.discount","الخصم"))}</label>
          <div class="input-group project-edit-input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select project-edit-select-xs">
              <option value="percent" ${f==="percent"?"selected":""}>${o(s("projects.form.discount.percent","٪ نسبة"))}</option>
              <option value="amount" ${f==="amount"?"selected":""}>${o(s("projects.form.discount.amount","💵 مبلغ"))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control project-edit-input-xs" value="${o(u)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label d-block" for="project-edit-company-share">${o(s("projects.form.labels.companyShare","نسبة الشركة والضريبة"))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(N))}" ${P?"checked":""}>
              <label class="form-check-label" for="project-edit-company-share">${o(s("projects.form.companyShareToggle","إضافة نسبة الشركة (10٪)"))}</label>
            </div>
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${l?"checked":""}>
              <label class="form-check-label" for="project-edit-tax">${o(s("projects.form.taxLabel","شامل الضريبة (15٪)"))}</label>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label" for="project-edit-payment-progress-value">${o(s("projects.form.paymentProgress.label","💰 الدفعة المستلمة"))}</label>
          <div class="input-group project-edit-input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select project-edit-select-xs">
              <option value="amount" >${o(s("projects.form.paymentProgress.amount","💵 مبلغ"))}</option>
              <option value="percent" selected>${o(s("projects.form.paymentProgress.percent","٪ نسبة"))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control project-edit-input-xs" value="${o("")}" placeholder="0" inputmode="decimal">
          </div>
          <button type="button" class="modal-action-btn modal-action-btn--ghost project-edit-add-btn mt-2" id="project-edit-payment-add">${o(s("reservations.paymentHistory.actions.add","➕ إضافة دفعة"))}</button>
        </div>
      </div>

      <section class="project-edit-payment-history mt-4">
        <div id="project-edit-payment-summary" class="project-details-grid mb-3"></div>
        <div class="reservation-payment-history-block">
          <div class="reservation-payment-history__header">
            <h6 class="reservation-payment-history__title">${o(s("reservations.paymentHistory.title","سجل الدفعات"))}</h6>
          </div>
          <div id="project-edit-payment-history" class="reservation-payment-history"></div>
        </div>
      </section>

      <section class="project-edit-expenses mt-4">
        <h6 class="mb-2">${o(s("projects.form.labels.expenses","متطلبات المشروع"))}</h6>
        <div class="project-edit-expense-form">
          <div class="project-edit-expense-label-col">
            <input type="text" class="form-control project-edit-input-wide" id="project-edit-expense-label" placeholder="${o(s("projects.form.placeholders.expenseLabel","وصف المتطلب"))}">
          </div>
          <div class="project-edit-expense-amount-col">
            <input type="text" class="form-control project-edit-input-xs" id="project-edit-expense-amount" placeholder="${o(s("projects.form.placeholders.expenseAmount","المبلغ"))}" inputmode="decimal">
          </div>
          <div class="project-edit-expense-action-col">
            <button type="button" class="modal-action-btn modal-action-btn--warning project-edit-add-btn" data-action="add-expense">${o(s("projects.form.buttons.addExpense","➕ إضافة مصروف"))}</button>
          </div>
        </div>
        <div id="project-edit-expense-list" class="project-edit-expense-list mt-3">
          ${kt(t.expenses)}
        </div>
      </section>

      <div class="project-edit-actions mt-4 d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">${o(s("projects.form.buttons.update","تحديث المشروع"))}</button>
        <button type="button" class="btn btn-outline-secondary" data-action="cancel-edit">${o(s("actions.cancel","إلغاء"))}</button>
      </div>
    </form>
  `}function Ya(e){return["commercial","coverage","photography","social"].map(a=>{const n=It(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(n)}</option>`}).join("")}function kt(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="text-muted small" data-empty>${o(s("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const t=o(s("actions.remove","إزالة"));return e.map(a=>{const n=o(a?.label||""),r=o(I(a?.amount||0)),c=o(String(a?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${n}</div>
            <div class="text-muted small">${r}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${c}" aria-label="${t}">✖</button>
        </div>
      `}).join("")}function Xa(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(s("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?s("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?s("reservations.paymentHistory.type.amount","دفعة مالية"):s("reservations.paymentHistory.type.unknown","دفعة"),n=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(I(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${j(Number(t.percentage).toFixed(2))}%`:"—",c=t?.recordedAt?j(tt(t.recordedAt)):"—",l=t?.note?`<div class="payment-history-note">${o(j(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${n}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${c}</span>
        </div>
        ${l}
      </li>
    `}).join("")}</ul>`}function Qa(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(s("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,n)=>{const r=a?.type==="percent"?s("reservations.paymentHistory.type.percent","دفعة نسبة"):s("reservations.paymentHistory.type.amount","دفعة مالية"),c=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(I(Number(a.amount))):"—",l=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${j(Number(a.percentage).toFixed(2))}%`:"—",d=a?.recordedAt?j(tt(a.recordedAt)):"—",i=a?.note?o(j(a.note)):"",f=o(s("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
      <tr>
        <td>${o(r)}</td>
        <td>${c}</td>
        <td>${l}</td>
        <td>${d}</td>
        <td>${i}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${n}" aria-label="${f}">🗑️</button>
        </td>
      </tr>
    `}).join("");return`
    <div class="reservation-payment-history__table-wrapper">
      <table class="table table-sm reservation-payment-history__table">
        <thead>
          <tr>
            <th>${o(s("reservations.paymentHistory.headers.method","نوع الدفعة"))}</th>
            <th>${o(s("reservations.paymentHistory.headers.amount","المبلغ"))}</th>
            <th>${o(s("reservations.paymentHistory.headers.percent","النسبة"))}</th>
            <th>${o(s("reservations.paymentHistory.headers.date","التاريخ"))}</th>
            <th>${o(s("reservations.paymentHistory.headers.note","ملاحظات"))}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${t}</tbody>
      </table>
    </div>
  `}function Za(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(en).filter(Boolean);if(a.length>0)return a;const n=$e(e.paidPercent??e.paid_percent),r=$e(e.paidAmount??e.paid_amount),c=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,l=Mt(c);return n!=null&&n>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:n,value:n,note:null,recordedAt:l}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:l}]:[]}function en(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const n=$e(e.amount??(a==="amount"?e.value:null)),r=$e(e.percentage??(a==="percent"?e.value:null)),c=a==="percent"?r??null:n??null,l=e.note??e.memo??null,d=Mt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&n==null||a==="percent"&&r==null?null:{type:a,amount:n??null,percentage:r??null,value:c,note:l&&String(l).trim().length?String(l).trim():null,recordedAt:d}}function $e(e){if(e==null||e==="")return null;const t=j(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Mt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function yt(e,t){if(!t)return null;const{date:a,time:n}=tn(tt(t)),r=e==="start",c=r?"⏱️":"⌛",l=r?s("projects.details.labels.start","بداية الحجز"):s("projects.details.labels.end","نهاية الحجز");return{icon:c,label:l,value:a,meta:n}}function tn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",n=t.join(" ");return{date:a,time:n}}function It(e){if(!e)return s("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return s(t,e)}function an(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,n=Number(j(String(a)))||0,r=e.discountType||"percent",c=Array.isArray(e.crewAssignments)?e.crewAssignments:[],l=c.length?c:Array.isArray(e.technicians)?e.technicians:[],d=Tt(t,n,r,!1,l,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const i=Number(j(String(e.cost??0)));return Number.isFinite(i)?Math.round(i):0}function Rt(e){if(typeof window>"u")return null;try{const n=new URLSearchParams(window.location.search||"").get(e);if(n)return n}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const n=new URLSearchParams(t).get(e);if(n)return n}catch{}return null}function nn(){return Rt(Je)}function sn(){return Rt(Ke)}function rn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[Je,Ke].forEach(i=>{e.has(i)&&(e.delete(i),a=!0)});let n=t,r=!1;if(t)try{const i=new URLSearchParams(t);let f=!1;[Je,Ke].forEach(u=>{i.has(u)&&(i.delete(u),f=!0)}),f&&(n=i.toString(),r=!0)}catch{}if(!a&&!r)return;const c=window.location.pathname,l=e.toString(),d=`${c}${l?`?${l}`:""}${n?`#${n}`:""}`;window.history.replaceState({},"",d)}catch{}}function on(){const e=nn(),t=sn();e&&(A.pendingProjectDetailId=e),t&&(A.pendingProjectEditId=t,A.pendingProjectDetailId||(A.pendingProjectDetailId=t)),(e||t)&&rn()}function cn(){if(!A.pendingProjectDetailId)return;const e=A.pendingProjectDetailId,t=String(e),a=A.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(l=>l!=null&&String(l)===t));if(!a)return;A.pendingProjectDetailId=null;const n=a?.id??a?.projectId??a?.project_id??t;if(se(n),A.pendingProjectEditId!=null){const r=String(A.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(l=>l!=null&&String(l)===r)&&(A.pendingProjectEditId=null,setTimeout(()=>Lt(a),0))}}function ln(){document.addEventListener("DOMContentLoaded",()=>{Oa(),on(),da(),wt(),ua(),Ba(),_a(),pa(),ma(),fa(),ha(),ya(),ba(),va({onViewDetails:se}),Va({onOpenProject:se}),ga(),dn()}),document.addEventListener("language:changed",bt),document.addEventListener("language:translationsReady",bt),document.addEventListener("customers:changed",un),document.addEventListener("technicians:updated",pn),document.addEventListener("reservations:changed",()=>ja(se)),document.addEventListener(Jt.USER_UPDATED,()=>{me()})}async function dn(){try{await Et({suppressError:!0}),await $t()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||s("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");$(t,"error")}finally{Sa(),Ce(),xa(),Pt(),me(),Se(),je(),cn()}}function bt(){Ce(),Pt(),me(),Se(),je(),wt()}function un(){wa(),Ce()}function pn(){Pa(),Ce()}Kt();Yt();Xt();La();ln();document.addEventListener("DOMContentLoaded",()=>{Zt(),Qt()});const Xe=.15,Te={},mn="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let ge=0;const S={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Ae=Object.freeze({projects:`
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 4h6v8h-6z"></path>
      <path d="M14 4h6v5h-6z"></path>
      <path d="M4 16h6v4h-6z"></path>
      <path d="M14 11h6v9h-6z"></path>
    </svg>
  `,value:`
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 8c-4.418 0 -8 1.79 -8 4s3.582 4 8 4s8 -1.79 8 -4s-3.582 -4 -8 -4"></path>
      <path d="M12 8v8"></path>
      <path d="M8 12h8"></path>
    </svg>
  `,outstanding:`
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M7 18v-11a2 2 0 0 1 4 0v11"></path>
      <path d="M7 8h4"></path>
      <path d="M15 18v-7a2 2 0 0 1 4 0v7"></path>
      <path d="M15 13h4"></path>
    </svg>
  `,expenses:`
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 12l3 3l3 -3"></path>
      <path d="M6 6v9"></path>
      <path d="M13 6h5"></path>
      <path d="M15.5 6v12"></path>
      <path d="M21 18h-5"></path>
    </svg>
  `});let H=null;const Ft=["upcoming","ongoing","completed"];async function fn({forceProjects:e=!1}={}){try{await Et({suppressError:!0}),await ka({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),De(t)&&console.warn("Projects API error:",t.message)}qt()}async function hn(){vn(),_t(),await yn();try{await fn({forceProjects:!0}),Vt(),Pn(),G()}finally{Ht()}document.addEventListener("language:changed",An),document.addEventListener("projects:changed",()=>{Qe().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{Qe().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",En)}document.addEventListener("DOMContentLoaded",hn);async function yn(){if(H)return H;if(typeof window>"u")return null;if(window.ApexCharts)return H=window.ApexCharts,H;try{await bn(mn),H=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),H=null}return H}function bn(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const n=document.querySelector(`script[src="${e}"]`);if(n){if(n.dataset.loaded==="true"){t();return}n.addEventListener("load",t,{once:!0}),n.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function vn(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function Bt(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,n])=>{if(!n)return;n.classList.toggle("is-loading",t),n.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function _t(){ge+=1,ge===1&&Bt(!0)}function Ht(){ge=Math.max(0,ge-1),ge===0&&Bt(!1)}function qt(){const{customers:e=[]}=xt();S.customers=Array.isArray(e)?e:[],S.reservations=at();const t=new Map(S.customers.map(n=>[String(n.id),n])),a=rt();S.projects=Array.isArray(a)?a.map(n=>gn(n,t)):[],S.totalProjects=S.projects.length}function gn(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",n=t.get(String(e.clientId)),r=jn(e.id),c=r.reduce((U,T)=>U+Sn(T),0),l=xn(e),d=Number(e?.equipmentEstimate)||0,i=Number((d+l).toFixed(2)),f=e?.applyTax===!0||e?.applyTax==="true",u=f?Number((i*Xe).toFixed(2)):0,g=f?Number(((i+c)*Xe).toFixed(2)):0,y=Number((i+c+g).toFixed(2)),N=wn(e),P=e.start?new Date(e.start):null,M=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:n?.customerName||n?.name||"",clientCompany:e.clientCompany||n?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:P,end:M,applyTax:f,status:N,reservationsTotal:Number(c.toFixed(2)),expensesTotal:l,subtotal:i,taxAmount:u,combinedTaxAmount:g,overallTotal:y,unpaidValue:a==="paid"?0:y,reservationsCount:r.length}}function jn(e){return Array.isArray(S.reservations)?S.reservations.filter(t=>String(t.projectId)===String(e)):[]}function Sn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,n=Number(j(String(a)))||0,r=e.discountType||"percent",c=Array.isArray(e.crewAssignments)?e.crewAssignments:[],l=c.length?c:Array.isArray(e.technicians)?e.technicians:[],d=Tt(t,n,r,!1,l,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const i=Number(j(String(e.cost??0)));return Number.isFinite(i)?Math.round(i):0}function xn(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function wn(e){const t=new Date,a=e.start?new Date(e.start):null,n=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":n&&!Number.isNaN(n.getTime())&&n<t?"completed":"ongoing"}function Pn(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{S.filters.search=p.search.value.trim(),G()},180)})}p.payment&&(p.payment.value=S.filters.payment,p.payment.addEventListener("change",()=>{S.filters.payment=p.payment.value||"all",G()})),p.dateRange&&(p.dateRange.addEventListener("change",Tn),p.dateRange.value=S.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{S.filters.startDate=p.startDate.value,S.filters.range==="custom"&&G()}),p.endDate&&p.endDate.addEventListener("change",()=>{S.filters.endDate=p.endDate.value,S.filters.range==="custom"&&G()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(S.filters.range!=="custom"){G();return}S.filters.startDate=p.startDate?.value||"",S.filters.endDate=p.endDate?.value||"",G()})}function Tn(e){const t=e.target.value;S.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),S.filters.startDate="",S.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),G())}async function Qe(){_t();try{await Promise.all([$t(),Ta()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),De(e)&&console.warn("Projects API error:",e.message)}finally{qt(),G(),Ht()}}function An(){Vt(),G()}function En(e){e.key&&!["projects","reservations","customers"].includes(e.key)||Qe().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function G(){const e=$n();it(),Dn(e),In(e),Rn(e),Fn(e),Bn(e),_n(e)}function $n(){const{search:e,statuses:t,payment:a,range:n,startDate:r,endDate:c}=S.filters,l=Ot(e),d=new Date,i=Number(n);let f=null;if(n==="custom"){f=r?new Date(r):null;const u=c?new Date(c):null;return S.projects.filter(g=>!vt(g,t)||!gt(g,a)||!jt(g,l)?!1:Cn(g.start,f,u))}return n!=="all"&&Number.isFinite(i)&&(f=new Date,f.setDate(d.getDate()-i)),S.projects.filter(u=>!vt(u,t)||!gt(u,a)||!jt(u,l)?!1:n==="all"?!0:Nn(u.start,f,d))}function vt(e,t){return t.includes(e.status)}function gt(e,t){return t==="all"?!0:e.paymentStatus===t}function jt(e,t){return t?Ot([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function Nn(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function Cn(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const n=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&n<t.getTime()||a&&!Number.isNaN(a.getTime())&&n>a.getTime())}function Ot(e){return e?j(String(e)).toLowerCase().trim():""}function Dn(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((l,d)=>l+d.overallTotal,0),n=e.reduce((l,d)=>l+d.unpaidValue,0),r=e.reduce((l,d)=>l+d.expensesTotal,0),c=[{icon:Ae.projects,label:s("projects.reports.kpi.totalProjects","Total projects"),value:Ze(t),meta:s("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Ae.value,label:s("projects.reports.kpi.totalValue","Total value"),value:V(a),meta:s("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Ae.outstanding,label:s("projects.reports.kpi.unpaidValue","Outstanding value"),value:V(n),meta:s("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Ae.expenses,label:s("projects.reports.kpi.expenses","Total expenses"),value:V(r),meta:s("projects.reports.kpi.expensesMeta","Expenses for included projects")}];p.kpiGrid.innerHTML=c.map(({icon:l,label:d,value:i,meta:f})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${l}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${R(d)}</p>
        <p class="reports-kpi-value">${R(i)}</p>
        <span class="reports-kpi-meta">${R(f)}</span>
      </div>
    </div>
  `).join(""),Ln(e)}function Ln(e){try{const t=kn(e),a="projects-revenue-breakdown";let n=document.getElementById(a);const r=[{label:s("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:V(t.grossRevenue)},{label:s("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:V(t.companyShareTotal)},{label:s("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:V(t.taxTotal)},{label:s("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:V(t.crewTotal)},{label:s("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:V(t.crewCostTotal)},{label:s("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:V(t.equipmentTotalCombined)},{label:s("projects.reports.kpi.revenue.details.projectExpenses","مصروفات المشروع","Project expenses"),value:`−${V(t.projectExpensesTotal)}`},{label:s("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:V(t.netProfit)}],c=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:l,value:d})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${R(l)}</span>
            <span class="reports-kpi-detail-value">${R(d)}</span>
          </div>
        `).join("")}
      </div>
    `;n?n.outerHTML=c:p.kpiGrid.insertAdjacentHTML("afterend",c)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function kn(e){const t=new Set(e.map(T=>String(T.id))),a=S.reservations.filter(T=>T.projectId!=null&&t.has(String(T.projectId)));let n=0,r=0,c=0,l=0,d=0,i=0,f=0;a.forEach(T=>{const x=Ma(T);n+=x.finalTotal||0,r+=x.equipmentTotal||0,c+=x.crewTotal||0,l+=x.crewCostTotal||0,d+=x.companyShareAmount||0,i+=x.taxAmount||0,f+=x.netProfit||0});const u=e.reduce((T,x)=>T+(Number(x.expensesTotal)||0),0),g=e.reduce((T,x)=>T+(Number(x.raw?.equipmentEstimate)||0),0),y=e.reduce((T,x)=>{const ee=x.applyTax===!0,q=(Number(x.raw?.equipmentEstimate)||0)+(Number(x.expensesTotal)||0),oe=ee?q*Xe:0;return T+oe},0),N=n+g+y,P=r+g,M=i+y,U=f-u;return{grossRevenue:N,companyShareTotal:d,taxTotal:M,crewTotal:c,crewCostTotal:l,equipmentTotalCombined:P,projectExpensesTotal:u,netProfit:U}}function Vt(){if(!p.statusChips)return;const e=Ft.map(t=>{const a=s(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${R(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",Mn),p.statusChips.dataset.listenerAttached="true"),it()}function Mn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const n=new Set(S.filters.statuses);n.has(a)?n.delete(a):n.add(a),n.size===0&&Ft.forEach(r=>n.add(r)),S.filters.statuses=Array.from(n),it(),G()}function it(){if(!p.statusChips)return;const e=new Set(S.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function In(e){if(!H)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],n=a.map(i=>e.filter(f=>f.status===i).length),r=a.map(i=>s(`projects.status.${i}`,i)),l=n.reduce((i,f)=>i+f,0)>0?n:[],d={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:l,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:i=>Number.isFinite(i)?`${Math.round(i)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:i=>re(i)}},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};Le("status",t,d)}function Rn(e){if(!H)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,n=new Intl.DateTimeFormat(qn(),{month:"short",year:"numeric"});e.forEach(u=>{if(!u.start||Number.isNaN(u.start.getTime()))return;const g=`${u.start.getFullYear()}-${u.start.getMonth()+1}`,y=a.get(g)||{total:0,label:n.format(u.start)};y.total+=u.overallTotal,a.set(g,y)});const c=Array.from(a.keys()).sort((u,g)=>{const[y,N]=u.split("-").map(Number),[P,M]=g.split("-").map(Number);return y===P?N-M:y-P}).slice(-12),l=c.map(u=>a.get(u)?.label||u),d=c.map(u=>Math.round(a.get(u)?.total||0)),i=d.length?[{name:s("projects.reports.datasets.value","Total value"),data:d}]:[],f={chart:{type:"area",height:320,toolbar:{show:!1}},series:i,xaxis:{categories:l,labels:{rotate:-35}},yaxis:{labels:{formatter:u=>re(u)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:u=>re(u)}},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")}};Le("timeline",t,f)}function Fn(e){if(!H)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((f,u)=>u.overallTotal-f.overallTotal).slice(0,6),n=a.map(f=>f.title||f.projectCode),r=a.map(f=>Math.round(f.overallTotal)),c=a.map(f=>Math.round(f.expensesTotal)),l=n.length?[{name:s("projects.reports.datasets.value","Total value"),data:r},{name:s("projects.reports.datasets.expenses","Expenses"),data:c}]:[],i={chart:{type:"bar",height:Math.max(320,n.length*60||0),toolbar:{show:!1}},series:l,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:n,labels:{formatter:f=>re(f)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:f=>re(f)}},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")}};Le("expenses",t,i)}function Bn(e){if(!H)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(i=>{const f=i.clientName||i.clientCompany||s("projects.fallback.unknownClient","Unknown client"),u=a.get(f)||0;a.set(f,u+i.overallTotal)});const n=Array.from(a.entries()).sort((i,f)=>f[1]-i[1]).slice(0,6),r=n.map(([i])=>i),c=n.map(([,i])=>Math.round(i)),l=c.length?[{name:s("projects.reports.datasets.value","Total value"),data:c}]:[],d={chart:{type:"bar",height:320,toolbar:{show:!1}},series:l,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:i=>re(i)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:i=>re(i)}},legend:{show:!1},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")}};Le("clients",t,d)}function Le(e,t,a={}){if(!H||!t)return;if(Te[e]){try{Te[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete Te[e]}t.innerHTML="";const n={...a};Array.isArray(n.series)||(n.series=[]);try{const r=new H(t,n);Te[e]=r,r.render().catch(c=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,c)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function _n(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const n=Hn(a.start,a.end),r=s(`projects.status.${a.status}`,a.status),c=s(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),l=a.clientCompany?`${R(a.clientName)} <small class="text-muted">${R(a.clientCompany)}</small>`:R(a.clientName||s("projects.fallback.unknownClient","Unknown client"));return`
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${R(a.title||a.projectCode)}</span>
            <small class="text-muted">${R(`#${a.projectCode}`)}</small>
          </div>
        </td>
        <td>${l}</td>
        <td>${R(r)}</td>
        <td>${R(n)}</td>
        <td>${R(V(a.overallTotal))}</td>
        <td>${R(c)}</td>
      </tr>
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=s("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",Ze(e.length)).replace("{total}",Ze(S.totalProjects))}}function Hn(e,t){if(!e&&!t)return"—";const a=e?dt(e.toISOString()):"—",n=t?dt(t.toISOString()):"—";return t?`${a} → ${n}`:a}function V(e){const t=Number(e)||0,n=Ne()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(n,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${j(r)} SR`}function Ze(e){const a=Ne()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return j(new Intl.NumberFormat(a).format(e))}function re(e){const a=Ne()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return j(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function qn(){return Ne()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function R(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
