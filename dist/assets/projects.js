import{r as Wt,q as Jt,p as St,u as Ze,h as T,t as s,d as Pt,n as v,f as Kt,a as Gt,m as Yt,c as Xt,i as Qt,k as lt,e as Ne}from"./auth.js";/* empty css     */import{i as Zt}from"./dashboardShell.js";import{d as m,r as ue,a as ge,u as ve,s as x,b as ea,f as ta,h as aa,i as na,j as L,k as o,l as sa,m as et,n as ra,o as dt,e as ze,p as ut,q as oa,t as ia,g as ca,c as la,v as da,w as xt,x as ua,y as pa,z as ma,A as fa,B as ha,C as ya,D as ba,E as ga,F as va,G as ja,H as Sa,I as Ce,J as Pa,K as wt,L as xa,M as wa}from"./form.js";import"./customers.js";import{g as tt,j as Te,k as We,w as At,D as Je,a as Aa}from"./reservationsService.js";import{P as at,D as nt,F as pt,z as Tt,G as st,H as De,I as Ta,J as $a,K as Ea,y as Na,v as Ca,w as Da,L as Ke,M as Ge,e as $t,N as Et,b as La,a as ka}from"./controller.js";let mt=null;function Ma(e){e&&Nt()!==e&&Ze({[at]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Nt(){return St()?.[at]||""}function Ct(e){e&&Ye()!==e&&Ze({[nt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function Ye(){return St()?.[nt]||""}function Ia(e){if(!e)return"";const t=e.trim();return t?Object.values(pt).includes(t)?t:pt[t]||"":""}function Fa(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Ia(t);if(a)return a}}catch{}return""}function Dt(e,t){!e||!m.tabPanes||!m.tabButtons||(m.tabButtons.forEach(a=>{const n=a===t;a.classList.toggle("active",n),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",n)}),m.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Ma(e))}function Ra(){if(!m.tabButtons||!m.tabButtons.length)return;m.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",n=>{n.preventDefault();const r=a.dataset.tabTarget;r&&(Dt(r,a),r==="projects-section"&&(x.filters.search="",m.search&&(m.search.value=""),ue(),ge(),ve()))}),a.dataset.tabListenerAttached="true")});const e=Nt(),t=e&&m.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function rt(e,t){!e||!m.projectSubTabButtons||!m.projectSubTabPanes||(m.projectSubTabButtons.forEach(a=>{const n=a===t;a.classList.toggle("active",n),a.classList.contains("tab")&&a.classList.toggle("tab-active",n)}),m.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function Ba(){!m.projectSubTabButtons||!m.projectSubTabButtons.length||(m.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(rt(a,e),Ct(a))}),e.dataset.tabListenerAttached="true")}),_a())}function _a(){const t=Fa()||Ye();if(!t)return;const a=m.projectSubTabButtons?.[0],n=m.projectSubTabButtons?.find(c=>c.dataset.projectSubtabTarget===t)||a,r=n?.dataset.projectSubtabTarget;r&&(t!==Ye()&&Ct(r),rt(r,n))}function Ha(){return m.tabButtons?m.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function ft(e={}){if(e){if(m.tabButtons&&m.tabButtons.length){const a=m.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",n=e[at];if(n&&n!==a){const r=m.tabButtons.find(c=>c.dataset.tabTarget===n);r&&Dt(n,r)}}if(m.projectSubTabButtons&&m.projectSubTabButtons.length&&Ha()){const a=m.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",n=e[nt];if(n&&n!==a){const r=m.projectSubTabButtons.find(c=>c.dataset.projectSubtabTarget===n);r&&rt(n,r)}}}}function qa(){mt||(mt=Wt(e=>{ft(e)})),Jt().then(e=>{ft(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function ae(e){const t=x.projects.find(M=>String(M.id)===String(e));if(!t||!m.detailsBody)return;m.detailsBody.dataset.mode="view",m.detailsBody.dataset.projectId=String(t.id);const n=(x.customers.length?x.customers:Pt().customers||[]).find(M=>String(M.id)===String(t.clientId)),r=It(t.type),l=t.description?.trim()||s("projects.fallback.noDescription","لا يوجد وصف"),p=n?.customerName||s("projects.fallback.unknownClient","عميل غير معروف"),i=n?.phone??n?.customerPhone??t.clientPhone??t.customerPhone??"",f=i?v(String(i).trim()):s("projects.details.client.noPhone","لا يوجد رقم متاح"),d=n?.email??t.clientEmail??t.customerEmail??"",j=d?String(d).trim():s("projects.details.client.noEmail","لا يوجد بريد متاح"),b=(t.clientCompany||n?.companyName||"").trim(),$=t.projectCode||`PRJ-${v(String(t.id))}`,w=v($),I=ta(t.id),G=I.reduce((M,K)=>M+tn(K),0),F=Number(G.toFixed(2)),R=I.length,{subtotal:se,applyTax:z,expensesTotal:je}=aa(t),pe=se,re=z?Number(((pe+F)*Ta).toFixed(2)):0,O=Number((pe+F+re).toFixed(2)),Z=na(t),me=s(`projects.status.${Z}`,$a[Z]||Z),W={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"}[Z]||"status-confirmed",J=z?s("projects.details.chips.vatOn","شامل الضريبة 15٪"):s("projects.details.chips.vatOff","غير شامل الضريبة"),oe=z?"status-paid":"status-unpaid",ie=s("projects.details.chips.reservations","{count} حجوزات").replace("{count}",v(String(R))),ke=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",ee=Qa(t),ce=ee.length>0,g=ce?0:Number(t.paidAmount)||0,h=ce?0:Number(t.paidPercent)||0,y=Te({totalAmount:O,paidAmount:g,paidPercent:h,history:ee}),S=We({manualStatus:ke||"unpaid",paidAmount:y.paidAmount,paidPercent:y.paidPercent,totalAmount:O}),A=s(`projects.paymentStatus.${S}`,S==="paid"?"Paid":S==="partial"?"Partial":"Unpaid"),q=S==="paid"?"status-paid":S==="partial"?"status-partial":"status-unpaid",C=Number.isFinite(Number(y.paidAmount))?Number(y.paidAmount):0,N=Number.isFinite(Number(y.paidPercent))?Number(y.paidPercent):0,k=Math.max(0,Number((O-C).toFixed(2))),Y=L(C),D=`${v(N.toFixed(2))}%`,X=L(k),Me=Ya(ee),Se=s("projects.focus.confirmed","✅ مشروع مؤكد"),fe=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(Se)}</span>`:"",Pe=[{icon:"💼",label:s("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:L(pe)},{icon:"🔗",label:s("projects.details.summary.reservationsTotal","إجمالي المعدات / طاقم العمل"),value:L(F)},{icon:"🧮",label:s("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:L(re)},{icon:"💰",label:s("projects.details.summary.overallTotal","الإجمالي الكلي"),value:L(O)},{icon:"💳",label:s("projects.details.summary.paidAmount","إجمالي المدفوع"),value:Y},{icon:"📊",label:s("projects.details.summary.paidPercent","نسبة المدفوع"),value:D},{icon:"💸",label:s("projects.details.summary.remainingAmount","المتبقي للدفع"),value:X}].map(({icon:M,label:K,value:Q})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${M} ${o(K)}</span>
      <span class="summary-details-value">${o(Q)}</span>
    </div>
  `).join(""),Ie=s("projects.details.labels.code","رقم المشروع"),Fe=`
    <div class="project-details-code-badge" title="${o(Ie)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Ie)}
      </span>
      <span class="project-details-code-badge__value">${o(w)}</span>
    </div>
  `,Re=[{icon:"👤",label:s("projects.details.client","العميل"),value:p},{icon:"📞",label:s("projects.details.labels.clientPhone","رقم العميل"),value:f},{icon:"✉️",label:s("projects.details.labels.clientEmail","البريد الإلكتروني"),value:j},b?{icon:"🏢",label:s("projects.details.company","شركة العميل"),value:b}:null,{icon:"🏷️",label:s("projects.details.type","نوع المشروع"),value:r},ht("start",t.start),ht("end",t.end)].filter(Boolean),Be=s("projects.details.overview.heading","معلومات المشروع"),_e=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Be)}</h6>
      <ul class="project-details-outline__list">
        ${Re.map(({icon:M,label:K,value:Q,meta:B})=>`
          <li>
            <span class="project-details-outline__label">${o(M)} ${o(K)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${o(Q)}</span>
              ${B?`<span class="project-details-outline__meta">${o(B)}</span>`:""}
            </span>
          </li>
        `).join("")}
      </ul>
    </div>
  `,he=[`<span class="reservation-chip ${W}">${o(me)}</span>`,`<span class="reservation-chip ${oe}">${o(J)}</span>`,`<span class="reservation-chip status-info">${o(ie)}</span>`,`<span class="reservation-chip ${q}">${o(A)}</span>`,fe].filter(Boolean).join(""),xe=s("projects.details.expensesTotal","إجمالي المصاريف"),He=s("projects.details.reservationsTotal","إجمالي الحجوزات");m.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${he}</div>
        </div>
        <div class="project-details-header__code">
          ${Fe}
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
            ${Pe}
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
          <span>${o(xe)}</span>
          <strong>${L(je)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(He)}</span>
          <strong>${L(F)}</strong>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(s("reservations.paymentHistory.title","سجل الدفعات"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(s("projects.details.paymentOverview.total","الإجمالي الكلي"))}</span>
          <strong>${o(L(O))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(s("projects.details.paymentOverview.paid","المدفوع"))}</span>
          <strong>${o(Y)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(s("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(D)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(s("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(X)}</strong>
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
  `,Ua(t);const E=m.detailsBody.querySelector("#project-details-export-btn");E&&E.addEventListener("click",async M=>{if(M.preventDefault(),E.blur(),!E.disabled){E.disabled=!0;try{await Ea({project:t})}catch(K){console.error("❌ [projects/details] export project PDF failed",K),T(s("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{E.disabled=!1}}}),m.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m.detailsModalEl).show()}function Oa({onOpenProject:e}){!m.focusCards||m.focusCards.dataset.listenerAttached==="true"||(m.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:c}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),Ja(c);return}r==="view"?e?.(c):r==="highlight"&&Va(c);return}const n=t.target.closest(".project-focus-card");n?.dataset.projectId&&e?.(n.dataset.projectId)}),m.focusCards.dataset.listenerAttached="true")}function Va(e){if(!m.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=m.projectsTableBody.querySelector(t);if(!a){T(s("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function Ua(e){if(!m.detailsBody)return;const t=m.detailsBody.querySelector('[data-action="create-reservation"]'),a=m.detailsBody.querySelector('[data-action="edit-project"]'),n=m.detailsBody.querySelector('[data-action="delete-project"]'),r=m.detailsBody.querySelector(".project-reservations-list");if(t&&e&&t.addEventListener("click",c=>{c.preventDefault(),Wa(e)}),a&&e&&a.addEventListener("click",c=>{c.preventDefault(),Lt(e)}),n&&e&&n.addEventListener("click",async c=>{c.preventDefault();const l=c.currentTarget;l.disabled=!0;try{await ra(e.id),!x.projects.some(i=>String(i.id)===String(e.id))&&m.detailsModalEl&&window.bootstrap?.Modal.getInstance(m.detailsModalEl)?.hide()}finally{x.projects.some(i=>String(i.id)===String(e.id))&&(l.disabled=!1)}}),r){const c=async l=>{if(!Number.isInteger(l)||l<0)return!1;const p=Ca("showReservationDetails");if(typeof p=="function")return p(l),!0;try{const i=await Da("showReservationDetails");if(typeof i=="function")return i(l),!0}catch(i){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",i)}return!1};r.addEventListener("click",async l=>{const p=l.target.closest('[data-action="view-reservation"]');if(!p)return;const i=p.dataset.index||p.dataset.reservationIndex,f=Number.parseInt(i||"-1",10);if(!Number.isInteger(f)||f<0)return;await c(f)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",l=>{if(!["Enter"," "].includes(l.key))return;const p=l.target.closest('[data-action="view-reservation"]');p&&(l.preventDefault(),p.click())})}}function Lt(e){if(!e||!m.detailsBody)return;const t=x.projects.find(d=>String(d.id)===String(e.id));if(!t)return;const a=x.customers.find(d=>String(d.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const n=Array.isArray(t.expenses)?t.expenses.map((d,j)=>({id:d?.id||`expense-${t.id}-${j}-${Date.now()}`,label:d?.label||"",amount:Number(d?.amount)||0})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((d,j)=>({type:d?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(d?.amount))?Number(d.amount):null,percentage:Number.isFinite(Number(d?.percentage))?Number(d.percentage):null,value:Number.isFinite(Number(d?.value))?Number(d.value):null,note:d?.note??null,recordedAt:d?.recordedAt??d?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${j}`})):[],c=r.reduce((d,j)=>d+(Number(j?.amount)||0),0),l=r.reduce((d,j)=>d+(Number(j?.percentage)||0),0),p=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,i=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(p>0||i>0)){const d=t.updatedAt??t.createdAt??new Date().toISOString();i>0?r=[{type:"percent",amount:Number.isFinite(p)&&p>0?p:null,percentage:i,value:i,note:null,recordedAt:d,key:`legacy-payment-${t.id}-percent`}]:p>0&&(r=[{type:"amount",amount:p,percentage:null,value:p,note:null,recordedAt:d,key:`legacy-payment-${t.id}-amount`}]),c=r.reduce((j,b)=>j+(Number(b?.amount)||0),0),l=r.reduce((j,b)=>j+(Number(b?.percentage)||0),0),p=0,i=0}c>0&&Math.abs(p-c)<.01&&(p=0),l>0&&Math.abs(i-l)<.01&&(i=0);const f={expenses:n,payments:r,basePaidAmount:p,basePaidPercent:i};m.detailsBody.dataset.mode="edit",m.detailsBody.innerHTML=Ka(t,f),za(t,f)}function za(e,t={expenses:[]}){const a=m.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const n=a.querySelector('[data-action="cancel-edit"]');n&&n.addEventListener("click",g=>{g.preventDefault(),ae(e.id)});const r=a.querySelector("#project-edit-expense-label"),c=a.querySelector("#project-edit-expense-amount"),l=a.querySelector('[data-action="add-expense"]'),p=a.querySelector("#project-edit-expense-list"),i=a.querySelector('[name="project-start-date"]'),f=a.querySelector('[name="project-start-time"]'),d=a.querySelector('[name="project-end-date"]'),j=a.querySelector('[name="project-end-time"]'),b=a.querySelector('[name="project-payment-status"]'),$=a.querySelector("#project-edit-tax"),w=a.querySelector("#project-edit-company-share"),I=a.querySelector("#project-edit-discount"),G=a.querySelector("#project-edit-discount-type"),F=a.querySelector("#project-edit-payment-progress-type"),R=a.querySelector("#project-edit-payment-progress-value"),se=a.querySelector("#project-edit-payment-add"),z=a.querySelector("#project-edit-payment-history"),je=a.querySelector("#project-edit-payment-summary"),pe=s("reservations.create.summary.currency","SR");let re=!1;const O=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),Z=()=>{const g=Number(e.equipmentEstimate)||0,h=Array.isArray(t.expenses)?t.expenses.reduce((Y,D)=>Y+(Number(D.amount)||0),0):0,y=G?.value==="amount"?"amount":"percent",S=v(I?.value||"0");let A=Number.parseFloat(S);(!Number.isFinite(A)||A<0)&&(A=0);const q=$?.checked===!0,C=w?.checked===!0;let N=C?ca(w):null;(!Number.isFinite(N)||N<=0)&&(N=C?Je:null);const k=la({equipmentEstimate:g,expensesTotal:h,discountValue:A,discountType:y,applyTax:q,companyShareEnabled:C,companySharePercent:N});return{equipmentEstimate:g,expensesTotal:h,discountValue:A,discountTypeValue:y,applyTax:q,companyShareEnabled:C,companySharePercent:N,finance:k}},me=()=>{const g=Z(),h=O(),y=Te({totalAmount:g.finance.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:h});return{...g,payments:h,progress:y}},it=()=>{z&&(z.innerHTML=Xa(O()))},W=()=>{if(!je)return;const{finance:g,progress:h}=me(),y=Number.isFinite(Number(g.totalWithTax))?Number(g.totalWithTax):0,S=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,A=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,q=Math.max(0,Math.round((y-S)*100)/100),C=[{label:s("projects.form.paymentSummary.total","الإجمالي الكلي"),value:L(y)},{label:s("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:L(S)},{label:s("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${v(A.toFixed(2))}%`},{label:s("projects.form.paymentSummary.remaining","المتبقي"),value:L(q)}];je.innerHTML=C.map(({label:N,value:k})=>`
        <div class="project-details-grid-item">
          <span>${o(N)}</span>
          <strong>${o(k)}</strong>
        </div>
      `).join("")},J=(g="auto")=>{if(!b)return;const h=b.dataset?.userSelected==="true";if(g==="auto"&&h)return;const{finance:y,progress:S}=me(),A=We({manualStatus:h?b.value:e.paymentStatus||"unpaid",paidAmount:S.paidAmount,paidPercent:S.paidPercent,totalAmount:y.totalWithTax});h||(b.value=A)},oe=()=>{it(),W(),J("auto")},ie=1e-4,ke=()=>{const g=F?.value==="amount"?"amount":"percent",h=v(R?.value||"").replace("%","").trim();let y=Number.parseFloat(h);if(!Number.isFinite(y)||y<=0){T(s("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),R?.focus();return}const S=me(),A=Number.isFinite(Number(S.finance.totalWithTax))?Number(S.finance.totalWithTax):0;if(A<=0){T(s("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const q=Number(S.progress.paidAmount)||0,C=Number(S.progress.paidPercent)||0;let N=null,k=null;if(g==="percent"){const D=Math.max(0,100-C);if(D<=ie){T(s("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>D){y=D;const X=v(y.toFixed(2));T(s("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",X))}k=Math.round(y*100)/100,A>0&&(N=Math.round(k/100*A*100)/100)}else{const D=Math.max(0,A-q);if(D<=ie){T(s("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>D){y=D;const X=`${v(y.toFixed(2))} ${pe}`;T(s("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",X))}N=Math.round(y*100)/100,A>0&&(k=Math.round(N/A*100*100)/100)}const Y={type:g,amount:N??null,percentage:k??null,value:g==="amount"?N:k,note:null,recordedAt:new Date().toISOString()};t.payments=[...O(),Y],R&&(R.value=""),F&&(F.value="percent"),oe(),T(s("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},ee=g=>{!$||!w||re||(re=!0,g==="share"?w.checked?($.checked||($.checked=!0),ze(w)):$.checked&&($.checked=!1):g==="tax"&&($.checked?ze(w):w.checked&&(w.checked=!1)),re=!1)};function ce(){p&&(p.innerHTML=kt(t.expenses))}ce(),oe(),I&&!I.dataset.listenerAttached&&(I.addEventListener("input",g=>{const h=g.target;h instanceof HTMLInputElement&&(h.value=v(h.value||""),W(),J("auto"))}),I.dataset.listenerAttached="true"),G&&!G.dataset.listenerAttached&&(G.addEventListener("change",()=>{W(),J("auto")}),G.dataset.listenerAttached="true"),R&&!R.dataset.listenerAttached&&(R.addEventListener("input",g=>{const h=g.target;h instanceof HTMLInputElement&&(h.value=v(h.value||""))}),R.dataset.listenerAttached="true"),b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{b.dataset.userSelected="true"}),b.dataset.listenerAttached="true"),c&&!c.dataset.listenerAttached&&(c.addEventListener("input",g=>{const h=g.target;h instanceof HTMLInputElement&&(h.value=v(h.value||""))}),c.dataset.listenerAttached="true"),w&&!w.dataset.listenerAttached&&(w.addEventListener("change",()=>{ee("share"),W(),J("auto")}),w.dataset.listenerAttached="true"),$&&!$.dataset.listenerAttached&&($.addEventListener("change",()=>{ee("tax"),W(),J("auto")}),$.dataset.listenerAttached="true"),w?.checked&&ze(w),ee(w?.checked?"share":"tax"),W(),J("auto"),l&&l.addEventListener("click",g=>{g.preventDefault();const h=r?.value.trim()||"",y=v(c?.value||"0"),S=Number(y);if(!h){T(s("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(S)||S<=0){T(s("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),c?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:h,amount:S}),r&&(r.value=""),c&&(c.value=""),ce(),W(),J("auto")}),p&&p.addEventListener("click",g=>{const h=g.target.closest('[data-action="remove-expense"]');if(!h)return;const{id:y}=h.dataset;t.expenses=t.expenses.filter(S=>String(S.id)!==String(y)),ce(),W(),J("auto")}),se&&!se.dataset.listenerAttached&&(se.addEventListener("click",g=>{g.preventDefault(),ke()}),se.dataset.listenerAttached="true"),z&&!z.dataset.listenerAttached&&(z.addEventListener("click",g=>{const h=g.target.closest('[data-action="remove-payment"]');if(!h)return;const y=Number.parseInt(h.dataset.index||"-1",10);if(!Number.isInteger(y)||y<0)return;const S=O();if(y>=S.length)return;const A=S.filter((q,C)=>C!==y);t.payments=A,oe(),T(s("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),z.dataset.listenerAttached="true"),a.addEventListener("submit",async g=>{if(g.preventDefault(),a.dataset.submitting==="true")return;const h=a.querySelector('[name="project-title"]'),y=a.querySelector('[name="project-type"]'),S=a.querySelector('[name="project-description"]'),A=h?.value.trim()||"",q=y?.value||"",C=i?.value.trim()||"",N=f?.value.trim()||"",k=S?.value.trim()||"",Y=(b?.value||"unpaid").toLowerCase(),D=["paid","partial"].includes(Y)?Y:"unpaid";if(!A||!q||!C){T(s("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),h?.focus();return}const X=d?.value.trim()||"",Me=j?.value.trim()||"",Se=ut(C,N),fe=X?ut(X,Me):"",ct=new Date(Se),Pe=fe?new Date(fe):null;if(Pe&&ct>Pe){T(s("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),d?.focus();return}if(x.projects.findIndex(V=>String(V.id)===String(e.id))===-1){T(s("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Fe=Z(),{equipmentEstimate:Re,discountValue:Be,discountTypeValue:_e,applyTax:he,companyShareEnabled:xe,companySharePercent:He,finance:E}=Fe,M=F?.value==="amount"?"amount":"percent",K=v(R?.value||"");let Q=K?Number.parseFloat(K):null,B=[...O()];if(Number.isFinite(Q)&&Q>0&&Number.isFinite(Number(E.totalWithTax))){const V=Te({totalAmount:E.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:B}),de=new Date().toISOString();if(M==="percent"){const ye=Math.max(0,100-(V.paidPercent||0));if(ye>ie){const Ve=Math.min(Q,ye),te=Math.round(Ve*100)/100,Ue=E.totalWithTax>0?Math.round(te/100*E.totalWithTax*100)/100:null;B=[...B,{type:"percent",amount:Ue,percentage:te,value:te,note:null,recordedAt:de}]}}else{const ye=Math.max(0,E.totalWithTax-(V.paidAmount||0));if(ye>ie){const Ve=Math.min(Q,ye),te=Math.round(Ve*100)/100,Ue=E.totalWithTax>0?Math.round(te/E.totalWithTax*100*100)/100:null;B=[...B,{type:"amount",amount:te,percentage:Ue,value:te,note:null,recordedAt:de}]}}B!==t.payments&&(t.payments=B,oe()),R&&(R.value=""),F&&(F.value="percent"),Q=null}const le=Te({totalAmount:E.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:B}),qe=b?.dataset?.userSelected==="true",Ut=We({manualStatus:qe?D:e.paymentStatus||D,paidAmount:le.paidAmount,paidPercent:le.paidPercent,totalAmount:E.totalWithTax}),Oe=qe?D:Ut;!qe&&b&&(b.value=Oe),b?.dataset&&delete b.dataset.userSelected,t.payments=B;const zt=Na({projectCode:e.projectCode,title:A,type:q,clientId:e.clientId,clientCompany:e.clientCompany,description:k,start:Se,end:fe||null,applyTax:he,paymentStatus:Oe,equipmentEstimate:Re,expenses:t.expenses,discount:Be,discountType:_e,companyShareEnabled:xe&&he,companySharePercent:xe&&he?He:null,companyShareAmount:E.companyShareAmount,taxAmount:E.taxAmount,totalWithTax:E.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:oa(e),paidAmount:le.paidAmount,paidPercentage:le.paidPercent,paymentProgressType:le.paymentProgressType,paymentProgressValue:le.paymentProgressValue,payments:B});a.dataset.submitting="true";try{const V=await Tt(e.projectId??e.id,zt),de=V?.projectId??V?.id??e.id;await ia(de,Oe),x.projects=st(),x.reservations=tt(),T(s("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),ue(),ge(),ve(),ae(e.id)}catch(V){console.error("❌ [projects] Failed to update project from details view",V);const de=De(V)?V.message:s("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");T(de,"error")}finally{delete a.dataset.submitting}})}function Wa(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description};Ze({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}m.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m.detailsModalEl)?.hide();const n=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${n}#reservations`}async function Ja(e){if(!e)return;const t=x.projects.find(a=>String(a.id)===String(e));if(!t){T(s("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){T(s("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Tt(t.projectId??t.id,{confirmed:!0});const a=await ea(e);x.projects=st(),x.reservations=tt(),ue(),ge(),ve(),m.detailsModalEl&&m.detailsModalEl.classList.contains("show")&&m.detailsBody?.dataset.projectId===String(e)&&ae(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),T(s("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const n=De(a)?a.message:s("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");T(n,"error")}}function Ka(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:n}=dt(e.start||""),{date:r,time:c}=dt(e.end||""),l=e.applyTax===!0||e.applyTax==="true",p=typeof e.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",i=["paid","partial"].includes(p)?p:"unpaid",f=e.discountType==="amount"?"amount":"percent",d=v(String(e.discount??e.discountValue??0)),j=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??Je,b=Number.parseFloat(v(String(j))),$=Number.isFinite(b)&&b>0?b:Je,w=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||l&&Number.isFinite(b)&&b>0;return`
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${o(s("projects.form.labels.title","عنوان المشروع"))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${o(e.title||"")}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${o(s("projects.form.labels.type","نوع المشروع"))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${Ga(e.type)}
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
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control project-edit-input-xs" value="${o(d)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label d-block" for="project-edit-company-share">${o(s("projects.form.labels.companyShare","نسبة الشركة والضريبة"))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String($))}" ${w?"checked":""}>
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
  `}function Ga(e){return["commercial","coverage","photography","social"].map(a=>{const n=It(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(n)}</option>`}).join("")}function kt(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="text-muted small" data-empty>${o(s("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const t=o(s("actions.remove","إزالة"));return e.map(a=>{const n=o(a?.label||""),r=o(L(a?.amount||0)),c=o(String(a?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${n}</div>
            <div class="text-muted small">${r}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${c}" aria-label="${t}">✖</button>
        </div>
      `}).join("")}function Ya(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(s("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?s("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?s("reservations.paymentHistory.type.amount","دفعة مالية"):s("reservations.paymentHistory.type.unknown","دفعة"),n=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(L(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${v(Number(t.percentage).toFixed(2))}%`:"—",c=t?.recordedAt?v(et(t.recordedAt)):"—",l=t?.note?`<div class="payment-history-note">${o(v(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${n}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${c}</span>
        </div>
        ${l}
      </li>
    `}).join("")}</ul>`}function Xa(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(s("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,n)=>{const r=a?.type==="percent"?s("reservations.paymentHistory.type.percent","دفعة نسبة"):s("reservations.paymentHistory.type.amount","دفعة مالية"),c=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(L(Number(a.amount))):"—",l=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${v(Number(a.percentage).toFixed(2))}%`:"—",p=a?.recordedAt?v(et(a.recordedAt)):"—",i=a?.note?o(v(a.note)):"",f=o(s("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
      <tr>
        <td>${o(r)}</td>
        <td>${c}</td>
        <td>${l}</td>
        <td>${p}</td>
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
  `}function Qa(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Za).filter(Boolean);if(a.length>0)return a;const n=Ee(e.paidPercent??e.paid_percent),r=Ee(e.paidAmount??e.paid_amount),c=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,l=Mt(c);return n!=null&&n>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:n,value:n,note:null,recordedAt:l}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:l}]:[]}function Za(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const n=Ee(e.amount??(a==="amount"?e.value:null)),r=Ee(e.percentage??(a==="percent"?e.value:null)),c=a==="percent"?r??null:n??null,l=e.note??e.memo??null,p=Mt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&n==null||a==="percent"&&r==null?null:{type:a,amount:n??null,percentage:r??null,value:c,note:l&&String(l).trim().length?String(l).trim():null,recordedAt:p}}function Ee(e){if(e==null||e==="")return null;const t=v(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Mt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function ht(e,t){if(!t)return null;const{date:a,time:n}=en(et(t)),r=e==="start",c=r?"⏱️":"⌛",l=r?s("projects.details.labels.start","بداية الحجز"):s("projects.details.labels.end","نهاية الحجز");return{icon:c,label:l,value:a,meta:n}}function en(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",n=t.join(" ");return{date:a,time:n}}function It(e){if(!e)return s("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return s(t,e)}function tn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,n=Number(v(String(a)))||0,r=e.discountType||"percent",c=Array.isArray(e.crewAssignments)?e.crewAssignments:[],l=c.length?c:Array.isArray(e.technicians)?e.technicians:[],p=At(t,n,r,!1,l,{start:e.start,end:e.end});if(Number.isFinite(p))return p;const i=Number(v(String(e.cost??0)));return Number.isFinite(i)?Math.round(i):0}function Ft(e){if(typeof window>"u")return null;try{const n=new URLSearchParams(window.location.search||"").get(e);if(n)return n}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const n=new URLSearchParams(t).get(e);if(n)return n}catch{}return null}function an(){return Ft(Ke)}function nn(){return Ft(Ge)}function sn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[Ke,Ge].forEach(i=>{e.has(i)&&(e.delete(i),a=!0)});let n=t,r=!1;if(t)try{const i=new URLSearchParams(t);let f=!1;[Ke,Ge].forEach(d=>{i.has(d)&&(i.delete(d),f=!0)}),f&&(n=i.toString(),r=!0)}catch{}if(!a&&!r)return;const c=window.location.pathname,l=e.toString(),p=`${c}${l?`?${l}`:""}${n?`#${n}`:""}`;window.history.replaceState({},"",p)}catch{}}function rn(){const e=an(),t=nn();e&&(x.pendingProjectDetailId=e),t&&(x.pendingProjectEditId=t,x.pendingProjectDetailId||(x.pendingProjectDetailId=t)),(e||t)&&sn()}function on(){if(!x.pendingProjectDetailId)return;const e=x.pendingProjectDetailId,t=String(e),a=x.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(l=>l!=null&&String(l)===t));if(!a)return;x.pendingProjectDetailId=null;const n=a?.id??a?.projectId??a?.project_id??t;if(ae(n),x.pendingProjectEditId!=null){const r=String(x.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(l=>l!=null&&String(l)===r)&&(x.pendingProjectEditId=null,setTimeout(()=>Lt(a),0))}}function cn(){document.addEventListener("DOMContentLoaded",()=>{qa(),rn(),da(),xt(),ua(),Ra(),Ba(),pa(),ma(),fa(),ha(),ya(),ba(),ga({onViewDetails:ae}),Oa({onOpenProject:ae}),va(),ln()}),document.addEventListener("language:changed",yt),document.addEventListener("language:translationsReady",yt),document.addEventListener("customers:changed",dn),document.addEventListener("technicians:updated",un),document.addEventListener("reservations:changed",()=>ja(ae)),document.addEventListener(Kt.USER_UPDATED,()=>{ue()})}async function ln(){try{await $t({suppressError:!0}),await Et()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||s("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");T(t,"error")}finally{Sa(),Ce(),Pa(),wt(),ue(),ve(),ge(),on()}}function yt(){Ce(),wt(),ue(),ve(),ge(),xt()}function dn(){xa(),Ce()}function un(){wa(),Ce()}Gt();Yt();Xt();La();cn();document.addEventListener("DOMContentLoaded",()=>{Zt(),Qt()});const bt=.15,we={},pn="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let be=0;const P={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},u={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Ae=Object.freeze({projects:`
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
  `});let H=null;const Rt=["upcoming","ongoing","completed"];async function mn({forceProjects:e=!1}={}){try{await $t({suppressError:!0}),await ka({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),De(t)&&console.warn("Projects API error:",t.message)}qt()}async function fn(){bn(),_t(),await hn();try{await mn({forceProjects:!0}),Vt(),xn(),U()}finally{Ht()}document.addEventListener("language:changed",An),document.addEventListener("projects:changed",()=>{Xe().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{Xe().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",Tn)}document.addEventListener("DOMContentLoaded",fn);async function hn(){if(H)return H;if(typeof window>"u")return null;if(window.ApexCharts)return H=window.ApexCharts,H;try{await yn(pn),H=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),H=null}return H}function yn(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const n=document.querySelector(`script[src="${e}"]`);if(n){if(n.dataset.loaded==="true"){t();return}n.addEventListener("load",t,{once:!0}),n.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function bn(){u.search=document.getElementById("reports-search"),u.statusChips=document.getElementById("reports-status-chips"),u.payment=document.getElementById("reports-payment"),u.dateRange=document.getElementById("reports-date-range"),u.customRangeWrapper=document.getElementById("reports-custom-range"),u.startDate=document.getElementById("reports-start-date"),u.endDate=document.getElementById("reports-end-date"),u.refreshBtn=document.getElementById("reports-refresh"),u.kpiGrid=document.getElementById("reports-kpi-grid"),u.table=document.getElementById("reports-table"),u.tableBody=u.table?.querySelector("tbody"),u.tableMeta=document.getElementById("reports-table-meta"),u.tableEmpty=document.getElementById("reports-empty"),u.chartCards={},u.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;u.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(u.chartLoaders[t]=a)})}function Bt(e){const t=!!e;Object.entries(u.chartCards||{}).forEach(([a,n])=>{if(!n)return;n.classList.toggle("is-loading",t),n.setAttribute("aria-busy",t?"true":"false");const r=u.chartLoaders?.[a];r&&(r.hidden=!t)})}function _t(){be+=1,be===1&&Bt(!0)}function Ht(){be=Math.max(0,be-1),be===0&&Bt(!1)}function qt(){const{customers:e=[]}=Pt();P.customers=Array.isArray(e)?e:[],P.reservations=tt();const t=new Map(P.customers.map(n=>[String(n.id),n])),a=st();P.projects=Array.isArray(a)?a.map(n=>gn(n,t)):[],P.totalProjects=P.projects.length}function gn(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",n=t.get(String(e.clientId)),r=vn(e.id),c=r.reduce((G,F)=>G+jn(F),0),l=Sn(e),p=Number(e?.equipmentEstimate)||0,i=Number((p+l).toFixed(2)),f=e?.applyTax===!0||e?.applyTax==="true",d=f?Number((i*bt).toFixed(2)):0,j=f?Number(((i+c)*bt).toFixed(2)):0,b=Number((i+c+j).toFixed(2)),$=Pn(e),w=e.start?new Date(e.start):null,I=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:n?.customerName||n?.name||"",clientCompany:e.clientCompany||n?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:w,end:I,applyTax:f,status:$,reservationsTotal:Number(c.toFixed(2)),expensesTotal:l,subtotal:i,taxAmount:d,combinedTaxAmount:j,overallTotal:b,unpaidValue:a==="paid"?0:b,reservationsCount:r.length}}function vn(e){return Array.isArray(P.reservations)?P.reservations.filter(t=>String(t.projectId)===String(e)):[]}function jn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,n=Number(v(String(a)))||0,r=e.discountType||"percent",c=Array.isArray(e.crewAssignments)?e.crewAssignments:[],l=c.length?c:Array.isArray(e.technicians)?e.technicians:[],p=At(t,n,r,!1,l,{start:e.start,end:e.end});if(Number.isFinite(p))return p;const i=Number(v(String(e.cost??0)));return Number.isFinite(i)?Math.round(i):0}function Sn(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function Pn(e){const t=new Date,a=e.start?new Date(e.start):null,n=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":n&&!Number.isNaN(n.getTime())&&n<t?"completed":"ongoing"}function xn(){if(u.search){let e;u.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{P.filters.search=u.search.value.trim(),U()},180)})}u.payment&&(u.payment.value=P.filters.payment,u.payment.addEventListener("change",()=>{P.filters.payment=u.payment.value||"all",U()})),u.dateRange&&(u.dateRange.addEventListener("change",wn),u.dateRange.value=P.filters.range),u.startDate&&u.startDate.addEventListener("change",()=>{P.filters.startDate=u.startDate.value,P.filters.range==="custom"&&U()}),u.endDate&&u.endDate.addEventListener("change",()=>{P.filters.endDate=u.endDate.value,P.filters.range==="custom"&&U()}),u.refreshBtn&&u.refreshBtn.addEventListener("click",()=>{if(P.filters.range!=="custom"){U();return}P.filters.startDate=u.startDate?.value||"",P.filters.endDate=u.endDate?.value||"",U()})}function wn(e){const t=e.target.value;P.filters.range=t,t==="custom"?u.customRangeWrapper?.classList.add("active"):(u.customRangeWrapper?.classList.remove("active"),P.filters.startDate="",P.filters.endDate="",u.startDate&&(u.startDate.value=""),u.endDate&&(u.endDate.value=""),U())}async function Xe(){_t();try{await Promise.all([Et(),Aa()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),De(e)&&console.warn("Projects API error:",e.message)}finally{qt(),U(),Ht()}}function An(){Vt(),U()}function Tn(e){e.key&&!["projects","reservations","customers"].includes(e.key)||Xe().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function U(){const e=$n();ot(),Cn(e),Ln(e),kn(e),Mn(e),In(e),Fn(e)}function $n(){const{search:e,statuses:t,payment:a,range:n,startDate:r,endDate:c}=P.filters,l=Ot(e),p=new Date,i=Number(n);let f=null;if(n==="custom"){f=r?new Date(r):null;const d=c?new Date(c):null;return P.projects.filter(j=>!gt(j,t)||!vt(j,a)||!jt(j,l)?!1:Nn(j.start,f,d))}return n!=="all"&&Number.isFinite(i)&&(f=new Date,f.setDate(p.getDate()-i)),P.projects.filter(d=>!gt(d,t)||!vt(d,a)||!jt(d,l)?!1:n==="all"?!0:En(d.start,f,p))}function gt(e,t){return t.includes(e.status)}function vt(e,t){return t==="all"?!0:e.paymentStatus===t}function jt(e,t){return t?Ot([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function En(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function Nn(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const n=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&n<t.getTime()||a&&!Number.isNaN(a.getTime())&&n>a.getTime())}function Ot(e){return e?v(String(e)).toLowerCase().trim():""}function Cn(e){if(!u.kpiGrid)return;const t=e.length,a=e.reduce((l,p)=>l+p.overallTotal,0),n=e.reduce((l,p)=>l+p.unpaidValue,0),r=e.reduce((l,p)=>l+p.expensesTotal,0),c=[{icon:Ae.projects,label:s("projects.reports.kpi.totalProjects","Total projects"),value:Qe(t),meta:s("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Ae.value,label:s("projects.reports.kpi.totalValue","Total value"),value:$e(a),meta:s("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Ae.outstanding,label:s("projects.reports.kpi.unpaidValue","Outstanding value"),value:$e(n),meta:s("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Ae.expenses,label:s("projects.reports.kpi.expenses","Total expenses"),value:$e(r),meta:s("projects.reports.kpi.expensesMeta","Expenses for included projects")}];u.kpiGrid.innerHTML=c.map(({icon:l,label:p,value:i,meta:f})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${l}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${_(p)}</p>
        <p class="reports-kpi-value">${_(i)}</p>
        <span class="reports-kpi-meta">${_(f)}</span>
      </div>
    </div>
  `).join("")}function Vt(){if(!u.statusChips)return;const e=Rt.map(t=>{const a=s(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${_(a)}</button>`}).join("");u.statusChips.innerHTML=e,u.statusChips.dataset.listenerAttached||(u.statusChips.addEventListener("click",Dn),u.statusChips.dataset.listenerAttached="true"),ot()}function Dn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const n=new Set(P.filters.statuses);n.has(a)?n.delete(a):n.add(a),n.size===0&&Rt.forEach(r=>n.add(r)),P.filters.statuses=Array.from(n),ot(),U()}function ot(){if(!u.statusChips)return;const e=new Set(P.filters.statuses);u.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Ln(e){if(!H)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],n=a.map(i=>e.filter(f=>f.status===i).length),r=a.map(i=>s(`projects.status.${i}`,i)),l=n.reduce((i,f)=>i+f,0)>0?n:[],p={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:l,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:i=>Number.isFinite(i)?`${Math.round(i)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:i=>ne(i)}},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};Le("status",t,p)}function kn(e){if(!H)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,n=new Intl.DateTimeFormat(Bn(),{month:"short",year:"numeric"});e.forEach(d=>{if(!d.start||Number.isNaN(d.start.getTime()))return;const j=`${d.start.getFullYear()}-${d.start.getMonth()+1}`,b=a.get(j)||{total:0,label:n.format(d.start)};b.total+=d.overallTotal,a.set(j,b)});const c=Array.from(a.keys()).sort((d,j)=>{const[b,$]=d.split("-").map(Number),[w,I]=j.split("-").map(Number);return b===w?$-I:b-w}).slice(-12),l=c.map(d=>a.get(d)?.label||d),p=c.map(d=>Math.round(a.get(d)?.total||0)),i=p.length?[{name:s("projects.reports.datasets.value","Total value"),data:p}]:[],f={chart:{type:"area",height:320,toolbar:{show:!1}},series:i,xaxis:{categories:l,labels:{rotate:-35}},yaxis:{labels:{formatter:d=>ne(d)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:d=>ne(d)}},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")}};Le("timeline",t,f)}function Mn(e){if(!H)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((f,d)=>d.overallTotal-f.overallTotal).slice(0,6),n=a.map(f=>f.title||f.projectCode),r=a.map(f=>Math.round(f.overallTotal)),c=a.map(f=>Math.round(f.expensesTotal)),l=n.length?[{name:s("projects.reports.datasets.value","Total value"),data:r},{name:s("projects.reports.datasets.expenses","Expenses"),data:c}]:[],i={chart:{type:"bar",height:Math.max(320,n.length*60||0),toolbar:{show:!1}},series:l,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:n,labels:{formatter:f=>ne(f)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:f=>ne(f)}},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")}};Le("expenses",t,i)}function In(e){if(!H)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(i=>{const f=i.clientName||i.clientCompany||s("projects.fallback.unknownClient","Unknown client"),d=a.get(f)||0;a.set(f,d+i.overallTotal)});const n=Array.from(a.entries()).sort((i,f)=>f[1]-i[1]).slice(0,6),r=n.map(([i])=>i),c=n.map(([,i])=>Math.round(i)),l=c.length?[{name:s("projects.reports.datasets.value","Total value"),data:c}]:[],p={chart:{type:"bar",height:320,toolbar:{show:!1}},series:l,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:i=>ne(i)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:i=>ne(i)}},legend:{show:!1},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")}};Le("clients",t,p)}function Le(e,t,a={}){if(!H||!t)return;if(we[e]){try{we[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete we[e]}t.innerHTML="";const n={...a};Array.isArray(n.series)||(n.series=[]);try{const r=new H(t,n);we[e]=r,r.render().catch(c=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,c)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function Fn(e){if(!u.table||!u.tableBody||!u.tableEmpty)return;if(!e.length){u.table.style.display="none",u.tableEmpty.classList.add("active"),u.tableMeta&&(u.tableMeta.textContent="");return}u.table.style.display="",u.tableEmpty.classList.remove("active");const t=e.map(a=>{const n=Rn(a.start,a.end),r=s(`projects.status.${a.status}`,a.status),c=s(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),l=a.clientCompany?`${_(a.clientName)} <small class="text-muted">${_(a.clientCompany)}</small>`:_(a.clientName||s("projects.fallback.unknownClient","Unknown client"));return`
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${_(a.title||a.projectCode)}</span>
            <small class="text-muted">${_(`#${a.projectCode}`)}</small>
          </div>
        </td>
        <td>${l}</td>
        <td>${_(r)}</td>
        <td>${_(n)}</td>
        <td>${_($e(a.overallTotal))}</td>
        <td>${_(c)}</td>
      </tr>
    `}).join("");if(u.tableBody.innerHTML=t,u.tableMeta){const a=s("projects.reports.table.meta","Showing {count} of {total} projects");u.tableMeta.textContent=a.replace("{count}",Qe(e.length)).replace("{total}",Qe(P.totalProjects))}}function Rn(e,t){if(!e&&!t)return"—";const a=e?lt(e.toISOString()):"—",n=t?lt(t.toISOString()):"—";return t?`${a} → ${n}`:a}function $e(e){const t=Number(e)||0,n=Ne()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(n,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${v(r)} SR`}function Qe(e){const a=Ne()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return v(new Intl.NumberFormat(a).format(e))}function ne(e){const a=Ne()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return v(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function Bn(){return Ne()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function _(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
