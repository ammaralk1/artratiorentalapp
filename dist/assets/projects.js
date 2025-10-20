import{r as We,q as Je,p as Se,u as Zt,h as A,t as s,d as Pe,n as v,f as Ke,a as Ge,m as Ye,c as Xe,i as Qe,k as le,e as Nt}from"./auth.js";/* empty css     */import{i as Ze}from"./dashboardShell.js";import{d as m,r as ut,a as gt,u as vt,s as x,b as ta,f as ea,h as aa,i as na,j as L,k as o,l as sa,m as te,n as ra,o as de,e as zt,p as ue,q as oa,t as ia,g as ca,c as la,v as da,w as xe,x as ua,y as pa,z as ma,A as fa,B as ha,C as ya,D as ba,E as ga,F as va,G as ja,H as Sa,I as Ct,J as Pa,K as we,L as xa,M as wa}from"./form.js";import"./customers.js";import{g as ee,f as At,h as Wt,p as Te,D as Jt,a as Ta}from"./reservationsService.js";import{P as ae,B as ne,C as pe,j as Ae,D as se,E as Dt,F as Aa,G as $a,H as Ea,h as Na,I as Kt,J as Gt,e as $e,K as Ee,o as Ca,k as Da}from"./controller.js";let me=null;function La(t){t&&Ne()!==t&&Zt({[ae]:t}).catch(e=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",e)})}function Ne(){return Se()?.[ae]||""}function Ce(t){t&&Yt()!==t&&Zt({[ne]:t}).catch(e=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",e)})}function Yt(){return Se()?.[ne]||""}function ka(t){if(!t)return"";const e=t.trim();return e?Object.values(pe).includes(e)?e:pe[e]||"":""}function Ma(){if(typeof window>"u")return"";try{const e=new URLSearchParams(window.location.search||"").get("subTab");if(e){const a=ka(e);if(a)return a}}catch{}return""}function De(t,e){!t||!m.tabPanes||!m.tabButtons||(m.tabButtons.forEach(a=>{const n=a===e;a.classList.toggle("active",n),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",n)}),m.tabPanes.forEach(a=>{a.dataset.tabPane===t?a.classList.remove("d-none"):a.classList.add("d-none")}),e&&La(t))}function Ia(){if(!m.tabButtons||!m.tabButtons.length)return;m.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",n=>{n.preventDefault();const r=a.dataset.tabTarget;r&&(De(r,a),r==="projects-section"&&(x.filters.search="",m.search&&(m.search.value=""),ut(),gt(),vt()))}),a.dataset.tabListenerAttached="true")});const t=Ne(),e=t&&m.tabButtons.find(a=>a.dataset.tabTarget===t);e&&e.click()}function re(t,e){!t||!m.projectSubTabButtons||!m.projectSubTabPanes||(m.projectSubTabButtons.forEach(a=>{const n=a===e;a.classList.toggle("active",n),a.classList.contains("tab")&&a.classList.toggle("tab-active",n)}),m.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===t?a.classList.remove("d-none"):a.classList.add("d-none")}))}function Fa(){!m.projectSubTabButtons||!m.projectSubTabButtons.length||(m.projectSubTabButtons.forEach(t=>{t.dataset.tabListenerAttached!=="true"&&(t.addEventListener("click",e=>{e.preventDefault();const a=t.dataset.projectSubtabTarget;a&&(re(a,t),Ce(a))}),t.dataset.tabListenerAttached="true")}),Ba())}function Ba(){const e=Ma()||Yt();if(!e)return;const a=m.projectSubTabButtons?.[0],n=m.projectSubTabButtons?.find(i=>i.dataset.projectSubtabTarget===e)||a,r=n?.dataset.projectSubtabTarget;r&&(e!==Yt()&&Ce(r),re(r,n))}function Ra(){return m.tabButtons?m.tabButtons.find(e=>e.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function fe(t={}){if(t){if(m.tabButtons&&m.tabButtons.length){const a=m.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",n=t[ae];if(n&&n!==a){const r=m.tabButtons.find(i=>i.dataset.tabTarget===n);r&&De(n,r)}}if(m.projectSubTabButtons&&m.projectSubTabButtons.length&&Ra()){const a=m.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",n=t[ne];if(n&&n!==a){const r=m.projectSubTabButtons.find(i=>i.dataset.projectSubtabTarget===n);r&&re(n,r)}}}}function _a(){me||(me=We(t=>{fe(t)})),Je().then(t=>{fe(t)}).catch(t=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",t)})}function at(t){const e=x.projects.find(M=>String(M.id)===String(t));if(!e||!m.detailsBody)return;m.detailsBody.dataset.mode="view",m.detailsBody.dataset.projectId=String(e.id);const n=(x.customers.length?x.customers:Pe().customers||[]).find(M=>String(M.id)===String(e.clientId)),r=Ie(e.type),l=e.description?.trim()||s("projects.fallback.noDescription","لا يوجد وصف"),p=n?.customerName||s("projects.fallback.unknownClient","عميل غير معروف"),c=n?.phone??n?.customerPhone??e.clientPhone??e.customerPhone??"",f=c?v(String(c).trim()):s("projects.details.client.noPhone","لا يوجد رقم متاح"),d=n?.email??e.clientEmail??e.customerEmail??"",j=d?String(d).trim():s("projects.details.client.noEmail","لا يوجد بريد متاح"),b=(e.clientCompany||n?.companyName||"").trim(),$=e.projectCode||`PRJ-${v(String(e.id))}`,w=v($),I=ea(e.id),G=I.reduce((M,K)=>M+Za(K),0),F=Number(G.toFixed(2)),B=I.length,{subtotal:st,applyTax:z,expensesTotal:jt}=aa(e),pt=st,rt=z?Number(((pt+F)*Aa).toFixed(2)):0,O=Number((pt+F+rt).toFixed(2)),Z=na(e),mt=s(`projects.status.${Z}`,$a[Z]||Z),W={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"}[Z]||"status-confirmed",J=z?s("projects.details.chips.vatOn","شامل الضريبة 15٪"):s("projects.details.chips.vatOff","غير شامل الضريبة"),ot=z?"status-paid":"status-unpaid",it=s("projects.details.chips.reservations","{count} حجوزات").replace("{count}",v(String(B))),kt=typeof e.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",tt=Ya(e),ct=tt.length>0,g=ct?0:Number(e.paidAmount)||0,h=ct?0:Number(e.paidPercent)||0,y=At({totalAmount:O,paidAmount:g,paidPercent:h,history:tt}),S=Wt({manualStatus:kt||"unpaid",paidAmount:y.paidAmount,paidPercent:y.paidPercent,totalAmount:O}),T=s(`projects.paymentStatus.${S}`,S==="paid"?"Paid":S==="partial"?"Partial":"Unpaid"),q=S==="paid"?"status-paid":S==="partial"?"status-partial":"status-unpaid",C=Number.isFinite(Number(y.paidAmount))?Number(y.paidAmount):0,N=Number.isFinite(Number(y.paidPercent))?Number(y.paidPercent):0,k=Math.max(0,Number((O-C).toFixed(2))),Y=L(C),D=`${v(N.toFixed(2))}%`,X=L(k),Mt=Ka(tt),St=s("projects.focus.confirmed","✅ مشروع مؤكد"),ft=e.confirmed===!0||e.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(St)}</span>`:"",Pt=[{icon:"💼",label:s("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:L(pt)},{icon:"🔗",label:s("projects.details.summary.reservationsTotal","إجمالي المعدات / طاقم العمل"),value:L(F)},{icon:"🧮",label:s("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:L(rt)},{icon:"💰",label:s("projects.details.summary.overallTotal","الإجمالي الكلي"),value:L(O)},{icon:"💳",label:s("projects.details.summary.paidAmount","إجمالي المدفوع"),value:Y},{icon:"📊",label:s("projects.details.summary.paidPercent","نسبة المدفوع"),value:D},{icon:"💸",label:s("projects.details.summary.remainingAmount","المتبقي للدفع"),value:X}].map(({icon:M,label:K,value:Q})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${M} ${o(K)}</span>
      <span class="summary-details-value">${o(Q)}</span>
    </div>
  `).join(""),It=s("projects.details.labels.code","رقم المشروع"),Ft=`
    <div class="project-details-code-badge" title="${o(It)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(It)}
      </span>
      <span class="project-details-code-badge__value">${o(w)}</span>
    </div>
  `,Bt=[{icon:"👤",label:s("projects.details.client","العميل"),value:p},{icon:"📞",label:s("projects.details.labels.clientPhone","رقم العميل"),value:f},{icon:"✉️",label:s("projects.details.labels.clientEmail","البريد الإلكتروني"),value:j},b?{icon:"🏢",label:s("projects.details.company","شركة العميل"),value:b}:null,{icon:"🏷️",label:s("projects.details.type","نوع المشروع"),value:r},he("start",e.start),he("end",e.end)].filter(Boolean),Rt=s("projects.details.overview.heading","معلومات المشروع"),_t=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Rt)}</h6>
      <ul class="project-details-outline__list">
        ${Bt.map(({icon:M,label:K,value:Q,meta:R})=>`
          <li>
            <span class="project-details-outline__label">${o(M)} ${o(K)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${o(Q)}</span>
              ${R?`<span class="project-details-outline__meta">${o(R)}</span>`:""}
            </span>
          </li>
        `).join("")}
      </ul>
    </div>
  `,ht=[`<span class="reservation-chip ${W}">${o(mt)}</span>`,`<span class="reservation-chip ${ot}">${o(J)}</span>`,`<span class="reservation-chip status-info">${o(it)}</span>`,`<span class="reservation-chip ${q}">${o(T)}</span>`,ft].filter(Boolean).join(""),xt=s("projects.details.expensesTotal","إجمالي المصاريف"),Ht=s("projects.details.reservationsTotal","إجمالي الحجوزات");m.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${ht}</div>
        </div>
        <div class="project-details-header__code">
          ${Ft}
          <h4 class="project-details-title">${o(e.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${_t}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(s("projects.details.summary.title","ملخص مالي"))}</h6>
            ${Pt}
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
          <span>${o(xt)}</span>
          <strong>${L(jt)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(Ht)}</span>
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
        ${Mt}
      </div>
    </section>
    ${sa(e)}
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
  `,Oa(e);const E=m.detailsBody.querySelector("#project-details-export-btn");E&&E.addEventListener("click",async M=>{if(M.preventDefault(),E.blur(),!E.disabled){E.disabled=!0;try{await Ea({project:e})}catch(K){console.error("❌ [projects/details] export project PDF failed",K),A(s("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{E.disabled=!1}}}),m.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m.detailsModalEl).show()}function Ha({onOpenProject:t}){!m.focusCards||m.focusCards.dataset.listenerAttached==="true"||(m.focusCards.addEventListener("click",e=>{const a=e.target.closest("[data-action]");if(a){const{action:r,id:i}=a.dataset;if(r==="confirm-project"){e.preventDefault(),e.stopPropagation(),za(i);return}r==="view"?t?.(i):r==="highlight"&&qa(i);return}const n=e.target.closest(".project-focus-card");n?.dataset.projectId&&t?.(n.dataset.projectId)}),m.focusCards.dataset.listenerAttached="true")}function qa(t){if(!m.projectsTableBody)return;const e=`tr[data-project-id="${CSS.escape(String(t))}"]`,a=m.projectsTableBody.querySelector(e);if(!a){A(s("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function Oa(t){if(!m.detailsBody)return;const e=m.detailsBody.querySelector('[data-action="create-reservation"]'),a=m.detailsBody.querySelector('[data-action="edit-project"]'),n=m.detailsBody.querySelector('[data-action="delete-project"]'),r=m.detailsBody.querySelector(".project-reservations-list");e&&t&&e.addEventListener("click",i=>{i.preventDefault(),Ua(t)}),a&&t&&a.addEventListener("click",i=>{i.preventDefault(),Le(t)}),n&&t&&n.addEventListener("click",async i=>{i.preventDefault();const l=i.currentTarget;l.disabled=!0;try{await ra(t.id),!x.projects.some(c=>String(c.id)===String(t.id))&&m.detailsModalEl&&window.bootstrap?.Modal.getInstance(m.detailsModalEl)?.hide()}finally{x.projects.some(c=>String(c.id)===String(t.id))&&(l.disabled=!1)}}),r&&(r.addEventListener("click",i=>{const l=i.target.closest('[data-action="view-reservation"]');if(!l)return;const p=l.dataset.index||l.dataset.reservationIndex,c=Number.parseInt(p||"-1",10);!Number.isInteger(c)||c<0||(typeof window.showReservationDetails=="function"?window.showReservationDetails(c):window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const l=i.target.closest('[data-action="view-reservation"]');l&&(i.preventDefault(),l.click())}))}function Le(t){if(!t||!m.detailsBody)return;const e=x.projects.find(d=>String(d.id)===String(t.id));if(!e)return;const a=x.customers.find(d=>String(d.id)===String(e.clientId));a?.customerName||a?.name||e.clientName||e.customerName,e.clientCompany||a?.companyName||a?.company;const n=Array.isArray(e.expenses)?e.expenses.map((d,j)=>({id:d?.id||`expense-${e.id}-${j}-${Date.now()}`,label:d?.label||"",amount:Number(d?.amount)||0})):[];let r=Array.isArray(e.paymentHistory)?e.paymentHistory.map((d,j)=>({type:d?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(d?.amount))?Number(d.amount):null,percentage:Number.isFinite(Number(d?.percentage))?Number(d.percentage):null,value:Number.isFinite(Number(d?.value))?Number(d.value):null,note:d?.note??null,recordedAt:d?.recordedAt??d?.recorded_at??new Date().toISOString(),key:`payment-${e.id}-${j}`})):[],i=r.reduce((d,j)=>d+(Number(j?.amount)||0),0),l=r.reduce((d,j)=>d+(Number(j?.percentage)||0),0),p=Number.isFinite(Number(e.paidAmount))?Number(e.paidAmount):0,c=Number.isFinite(Number(e.paidPercent))?Number(e.paidPercent):0;if(!r.length&&(p>0||c>0)){const d=e.updatedAt??e.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(p)&&p>0?p:null,percentage:c,value:c,note:null,recordedAt:d,key:`legacy-payment-${e.id}-percent`}]:p>0&&(r=[{type:"amount",amount:p,percentage:null,value:p,note:null,recordedAt:d,key:`legacy-payment-${e.id}-amount`}]),i=r.reduce((j,b)=>j+(Number(b?.amount)||0),0),l=r.reduce((j,b)=>j+(Number(b?.percentage)||0),0),p=0,c=0}i>0&&Math.abs(p-i)<.01&&(p=0),l>0&&Math.abs(c-l)<.01&&(c=0);const f={expenses:n,payments:r,basePaidAmount:p,basePaidPercent:c};m.detailsBody.dataset.mode="edit",m.detailsBody.innerHTML=Wa(e,f),Va(e,f)}function Va(t,e={expenses:[]}){const a=m.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const n=a.querySelector('[data-action="cancel-edit"]');n&&n.addEventListener("click",g=>{g.preventDefault(),at(t.id)});const r=a.querySelector("#project-edit-expense-label"),i=a.querySelector("#project-edit-expense-amount"),l=a.querySelector('[data-action="add-expense"]'),p=a.querySelector("#project-edit-expense-list"),c=a.querySelector('[name="project-start-date"]'),f=a.querySelector('[name="project-start-time"]'),d=a.querySelector('[name="project-end-date"]'),j=a.querySelector('[name="project-end-time"]'),b=a.querySelector('[name="project-payment-status"]'),$=a.querySelector("#project-edit-tax"),w=a.querySelector("#project-edit-company-share"),I=a.querySelector("#project-edit-discount"),G=a.querySelector("#project-edit-discount-type"),F=a.querySelector("#project-edit-payment-progress-type"),B=a.querySelector("#project-edit-payment-progress-value"),st=a.querySelector("#project-edit-payment-add"),z=a.querySelector("#project-edit-payment-history"),jt=a.querySelector("#project-edit-payment-summary"),pt=s("reservations.create.summary.currency","SR");let rt=!1;const O=()=>(Array.isArray(e.payments)||(e.payments=[]),e.payments),Z=()=>{const g=Number(t.equipmentEstimate)||0,h=Array.isArray(e.expenses)?e.expenses.reduce((Y,D)=>Y+(Number(D.amount)||0),0):0,y=G?.value==="amount"?"amount":"percent",S=v(I?.value||"0");let T=Number.parseFloat(S);(!Number.isFinite(T)||T<0)&&(T=0);const q=$?.checked===!0,C=w?.checked===!0;let N=C?ca(w):null;(!Number.isFinite(N)||N<=0)&&(N=C?Jt:null);const k=la({equipmentEstimate:g,expensesTotal:h,discountValue:T,discountType:y,applyTax:q,companyShareEnabled:C,companySharePercent:N});return{equipmentEstimate:g,expensesTotal:h,discountValue:T,discountTypeValue:y,applyTax:q,companyShareEnabled:C,companySharePercent:N,finance:k}},mt=()=>{const g=Z(),h=O(),y=At({totalAmount:g.finance.totalWithTax,paidAmount:e.basePaidAmount||0,paidPercent:e.basePaidPercent||0,history:h});return{...g,payments:h,progress:y}},ie=()=>{z&&(z.innerHTML=Ga(O()))},W=()=>{if(!jt)return;const{finance:g,progress:h}=mt(),y=Number.isFinite(Number(g.totalWithTax))?Number(g.totalWithTax):0,S=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,T=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,q=Math.max(0,Math.round((y-S)*100)/100),C=[{label:s("projects.form.paymentSummary.total","الإجمالي الكلي"),value:L(y)},{label:s("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:L(S)},{label:s("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${v(T.toFixed(2))}%`},{label:s("projects.form.paymentSummary.remaining","المتبقي"),value:L(q)}];jt.innerHTML=C.map(({label:N,value:k})=>`
        <div class="project-details-grid-item">
          <span>${o(N)}</span>
          <strong>${o(k)}</strong>
        </div>
      `).join("")},J=(g="auto")=>{if(!b)return;const h=b.dataset?.userSelected==="true";if(g==="auto"&&h)return;const{finance:y,progress:S}=mt(),T=Wt({manualStatus:h?b.value:t.paymentStatus||"unpaid",paidAmount:S.paidAmount,paidPercent:S.paidPercent,totalAmount:y.totalWithTax});h||(b.value=T)},ot=()=>{ie(),W(),J("auto")},it=1e-4,kt=()=>{const g=F?.value==="amount"?"amount":"percent",h=v(B?.value||"").replace("%","").trim();let y=Number.parseFloat(h);if(!Number.isFinite(y)||y<=0){A(s("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),B?.focus();return}const S=mt(),T=Number.isFinite(Number(S.finance.totalWithTax))?Number(S.finance.totalWithTax):0;if(T<=0){A(s("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const q=Number(S.progress.paidAmount)||0,C=Number(S.progress.paidPercent)||0;let N=null,k=null;if(g==="percent"){const D=Math.max(0,100-C);if(D<=it){A(s("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>D){y=D;const X=v(y.toFixed(2));A(s("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",X))}k=Math.round(y*100)/100,T>0&&(N=Math.round(k/100*T*100)/100)}else{const D=Math.max(0,T-q);if(D<=it){A(s("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>D){y=D;const X=`${v(y.toFixed(2))} ${pt}`;A(s("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",X))}N=Math.round(y*100)/100,T>0&&(k=Math.round(N/T*100*100)/100)}const Y={type:g,amount:N??null,percentage:k??null,value:g==="amount"?N:k,note:null,recordedAt:new Date().toISOString()};e.payments=[...O(),Y],B&&(B.value=""),F&&(F.value="percent"),ot(),A(s("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},tt=g=>{!$||!w||rt||(rt=!0,g==="share"?w.checked?($.checked||($.checked=!0),zt(w)):$.checked&&($.checked=!1):g==="tax"&&($.checked?zt(w):w.checked&&(w.checked=!1)),rt=!1)};function ct(){p&&(p.innerHTML=ke(e.expenses))}ct(),ot(),I&&!I.dataset.listenerAttached&&(I.addEventListener("input",g=>{const h=g.target;h instanceof HTMLInputElement&&(h.value=v(h.value||""),W(),J("auto"))}),I.dataset.listenerAttached="true"),G&&!G.dataset.listenerAttached&&(G.addEventListener("change",()=>{W(),J("auto")}),G.dataset.listenerAttached="true"),B&&!B.dataset.listenerAttached&&(B.addEventListener("input",g=>{const h=g.target;h instanceof HTMLInputElement&&(h.value=v(h.value||""))}),B.dataset.listenerAttached="true"),b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{b.dataset.userSelected="true"}),b.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",g=>{const h=g.target;h instanceof HTMLInputElement&&(h.value=v(h.value||""))}),i.dataset.listenerAttached="true"),w&&!w.dataset.listenerAttached&&(w.addEventListener("change",()=>{tt("share"),W(),J("auto")}),w.dataset.listenerAttached="true"),$&&!$.dataset.listenerAttached&&($.addEventListener("change",()=>{tt("tax"),W(),J("auto")}),$.dataset.listenerAttached="true"),w?.checked&&zt(w),tt(w?.checked?"share":"tax"),W(),J("auto"),l&&l.addEventListener("click",g=>{g.preventDefault();const h=r?.value.trim()||"",y=v(i?.value||"0"),S=Number(y);if(!h){A(s("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(S)||S<=0){A(s("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),i?.focus();return}e.expenses.push({id:`expense-${t.id}-${Date.now()}`,label:h,amount:S}),r&&(r.value=""),i&&(i.value=""),ct(),W(),J("auto")}),p&&p.addEventListener("click",g=>{const h=g.target.closest('[data-action="remove-expense"]');if(!h)return;const{id:y}=h.dataset;e.expenses=e.expenses.filter(S=>String(S.id)!==String(y)),ct(),W(),J("auto")}),st&&!st.dataset.listenerAttached&&(st.addEventListener("click",g=>{g.preventDefault(),kt()}),st.dataset.listenerAttached="true"),z&&!z.dataset.listenerAttached&&(z.addEventListener("click",g=>{const h=g.target.closest('[data-action="remove-payment"]');if(!h)return;const y=Number.parseInt(h.dataset.index||"-1",10);if(!Number.isInteger(y)||y<0)return;const S=O();if(y>=S.length)return;const T=S.filter((q,C)=>C!==y);e.payments=T,ot(),A(s("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),z.dataset.listenerAttached="true"),a.addEventListener("submit",async g=>{if(g.preventDefault(),a.dataset.submitting==="true")return;const h=a.querySelector('[name="project-title"]'),y=a.querySelector('[name="project-type"]'),S=a.querySelector('[name="project-description"]'),T=h?.value.trim()||"",q=y?.value||"",C=c?.value.trim()||"",N=f?.value.trim()||"",k=S?.value.trim()||"",Y=(b?.value||"unpaid").toLowerCase(),D=["paid","partial"].includes(Y)?Y:"unpaid";if(!T||!q||!C){A(s("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),h?.focus();return}const X=d?.value.trim()||"",Mt=j?.value.trim()||"",St=ue(C,N),ft=X?ue(X,Mt):"",ce=new Date(St),Pt=ft?new Date(ft):null;if(Pt&&ce>Pt){A(s("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),d?.focus();return}if(x.projects.findIndex(V=>String(V.id)===String(t.id))===-1){A(s("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Ft=Z(),{equipmentEstimate:Bt,discountValue:Rt,discountTypeValue:_t,applyTax:ht,companyShareEnabled:xt,companySharePercent:Ht,finance:E}=Ft,M=F?.value==="amount"?"amount":"percent",K=v(B?.value||"");let Q=K?Number.parseFloat(K):null,R=[...O()];if(Number.isFinite(Q)&&Q>0&&Number.isFinite(Number(E.totalWithTax))){const V=At({totalAmount:E.totalWithTax,paidAmount:e.basePaidAmount||0,paidPercent:e.basePaidPercent||0,history:R}),dt=new Date().toISOString();if(M==="percent"){const yt=Math.max(0,100-(V.paidPercent||0));if(yt>it){const Vt=Math.min(Q,yt),et=Math.round(Vt*100)/100,Ut=E.totalWithTax>0?Math.round(et/100*E.totalWithTax*100)/100:null;R=[...R,{type:"percent",amount:Ut,percentage:et,value:et,note:null,recordedAt:dt}]}}else{const yt=Math.max(0,E.totalWithTax-(V.paidAmount||0));if(yt>it){const Vt=Math.min(Q,yt),et=Math.round(Vt*100)/100,Ut=E.totalWithTax>0?Math.round(et/E.totalWithTax*100*100)/100:null;R=[...R,{type:"amount",amount:et,percentage:Ut,value:et,note:null,recordedAt:dt}]}}R!==e.payments&&(e.payments=R,ot()),B&&(B.value=""),F&&(F.value="percent"),Q=null}const lt=At({totalAmount:E.totalWithTax,paidAmount:e.basePaidAmount||0,paidPercent:e.basePaidPercent||0,history:R}),qt=b?.dataset?.userSelected==="true",Ue=Wt({manualStatus:qt?D:t.paymentStatus||D,paidAmount:lt.paidAmount,paidPercent:lt.paidPercent,totalAmount:E.totalWithTax}),Ot=qt?D:Ue;!qt&&b&&(b.value=Ot),b?.dataset&&delete b.dataset.userSelected,e.payments=R;const ze=Na({projectCode:t.projectCode,title:T,type:q,clientId:t.clientId,clientCompany:t.clientCompany,description:k,start:St,end:ft||null,applyTax:ht,paymentStatus:Ot,equipmentEstimate:Bt,expenses:e.expenses,discount:Rt,discountType:_t,companyShareEnabled:xt&&ht,companySharePercent:xt&&ht?Ht:null,companyShareAmount:E.companyShareAmount,taxAmount:E.taxAmount,totalWithTax:E.totalWithTax,confirmed:t.confirmed,technicians:Array.isArray(t.technicians)?t.technicians:[],equipment:oa(t),paidAmount:lt.paidAmount,paidPercentage:lt.paidPercent,paymentProgressType:lt.paymentProgressType,paymentProgressValue:lt.paymentProgressValue,payments:R});a.dataset.submitting="true";try{const V=await Ae(t.projectId??t.id,ze),dt=V?.projectId??V?.id??t.id;await ia(dt,Ot),x.projects=se(),x.reservations=ee(),A(s("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),ut(),gt(),vt(),at(t.id)}catch(V){console.error("❌ [projects] Failed to update project from details view",V);const dt=Dt(V)?V.message:s("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");A(dt,"error")}finally{delete a.dataset.submitting}})}function Ua(t){if(!t)return;const e={projectId:t.id,customerId:t.clientId||null,start:t.start||null,end:t.end||null,forceNotes:!!t.description};Zt({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(e))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}m.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m.detailsModalEl)?.hide();const n=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${n}#reservations`}async function za(t){if(!t)return;const e=x.projects.find(a=>String(a.id)===String(t));if(!e){A(s("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(e.confirmed===!0||e.confirmed==="true"){A(s("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Ae(e.projectId??e.id,{confirmed:!0});const a=await ta(t);x.projects=se(),x.reservations=ee(),ut(),gt(),vt(),m.detailsModalEl&&m.detailsModalEl.classList.contains("show")&&m.detailsBody?.dataset.projectId===String(t)&&at(t),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),A(s("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const n=Dt(a)?a.message:s("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");A(n,"error")}}function Wa(t,e={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:n}=de(t.start||""),{date:r,time:i}=de(t.end||""),l=t.applyTax===!0||t.applyTax==="true",p=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",c=["paid","partial"].includes(p)?p:"unpaid",f=t.discountType==="amount"?"amount":"percent",d=v(String(t.discount??t.discountValue??0)),j=t.companySharePercent??t.company_share_percent??t.companyShare??t.company_share??t.companyShareAmountPercent??Jt,b=Number.parseFloat(v(String(j))),$=Number.isFinite(b)&&b>0?b:Jt,w=t.companyShareEnabled===!0||t.companyShareEnabled==="true"||t.company_share_enabled===!0||t.company_share_enabled==="true"||l&&Number.isFinite(b)&&b>0;return`
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${o(s("projects.form.labels.title","عنوان المشروع"))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${o(t.title||"")}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${o(s("projects.form.labels.type","نوع المشروع"))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${Ja(t.type)}
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
              <input type="time" class="form-control" name="project-end-time" value="${o(i)}">
            </div>
          </div>
        </div>
        <div class="col-12">
          <label class="form-label">${o(s("projects.form.labels.description","الوصف"))}</label>
          <textarea class="form-control project-edit-textarea" name="project-description" rows="5">${o(t.description||"")}</textarea>
        </div>
        <div class="col-12 col-md-4 col-xl-3">
          <label class="form-label">${o(s("projects.form.labels.paymentStatus","حالة الدفع"))}</label>
          <select class="form-select project-edit-select-xs" name="project-payment-status" id="project-edit-payment-status">
            <option value="unpaid" ${c==="unpaid"?"selected":""}>${o(s("projects.paymentStatus.unpaid","غير مدفوع"))}</option>
            <option value="partial" ${c==="partial"?"selected":""}>${o(s("projects.paymentStatus.partial","مدفوع جزئياً"))}</option>
            <option value="paid" ${c==="paid"?"selected":""}>${o(s("projects.paymentStatus.paid","مدفوع"))}</option>
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
          ${ke(e.expenses)}
        </div>
      </section>

      <div class="project-edit-actions mt-4 d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">${o(s("projects.form.buttons.update","تحديث المشروع"))}</button>
        <button type="button" class="btn btn-outline-secondary" data-action="cancel-edit">${o(s("actions.cancel","إلغاء"))}</button>
      </div>
    </form>
  `}function Ja(t){return["commercial","coverage","photography","social"].map(a=>{const n=Ie(a),r=a===t?"selected":"";return`<option value="${o(a)}" ${r}>${o(n)}</option>`}).join("")}function ke(t=[]){if(!Array.isArray(t)||t.length===0)return`<div class="text-muted small" data-empty>${o(s("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const e=o(s("actions.remove","إزالة"));return t.map(a=>{const n=o(a?.label||""),r=o(L(a?.amount||0)),i=o(String(a?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${n}</div>
            <div class="text-muted small">${r}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${i}" aria-label="${e}">✖</button>
        </div>
      `}).join("")}function Ka(t=[]){return!Array.isArray(t)||t.length===0?`<div class="reservation-payment-history-empty">${o(s("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${t.map(e=>{const a=e?.type==="percent"?s("reservations.paymentHistory.type.percent","دفعة نسبة"):e?.type==="amount"?s("reservations.paymentHistory.type.amount","دفعة مالية"):s("reservations.paymentHistory.type.unknown","دفعة"),n=Number.isFinite(Number(e?.amount))&&Number(e.amount)>0?o(L(Number(e.amount))):"—",r=Number.isFinite(Number(e?.percentage))&&Number(e.percentage)>0?`${v(Number(e.percentage).toFixed(2))}%`:"—",i=e?.recordedAt?v(te(e.recordedAt)):"—",l=e?.note?`<div class="payment-history-note">${o(v(e.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${n}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${i}</span>
        </div>
        ${l}
      </li>
    `}).join("")}</ul>`}function Ga(t=[]){if(!Array.isArray(t)||t.length===0)return`<div class="reservation-payment-history__empty">${o(s("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const e=t.map((a,n)=>{const r=a?.type==="percent"?s("reservations.paymentHistory.type.percent","دفعة نسبة"):s("reservations.paymentHistory.type.amount","دفعة مالية"),i=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(L(Number(a.amount))):"—",l=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${v(Number(a.percentage).toFixed(2))}%`:"—",p=a?.recordedAt?v(te(a.recordedAt)):"—",c=a?.note?o(v(a.note)):"",f=o(s("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
      <tr>
        <td>${o(r)}</td>
        <td>${i}</td>
        <td>${l}</td>
        <td>${p}</td>
        <td>${c}</td>
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
        <tbody>${e}</tbody>
      </table>
    </div>
  `}function Ya(t={}){const a=(Array.isArray(t.paymentHistory)?t.paymentHistory:Array.isArray(t.payment_history)?t.payment_history:[]).map(Xa).filter(Boolean);if(a.length>0)return a;const n=Et(t.paidPercent??t.paid_percent),r=Et(t.paidAmount??t.paid_amount),i=t.updatedAt??t.updated_at??t.createdAt??t.created_at??null,l=Me(i);return n!=null&&n>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:n,value:n,note:null,recordedAt:l}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:l}]:[]}function Xa(t){if(!t||typeof t!="object")return null;const e=t.type??t.payment_type??t.paymentType??null;let a=typeof e=="string"?e.toLowerCase().trim():null;a!=="percent"&&(a="amount");const n=Et(t.amount??(a==="amount"?t.value:null)),r=Et(t.percentage??(a==="percent"?t.value:null)),i=a==="percent"?r??null:n??null,l=t.note??t.memo??null,p=Me(t.recordedAt??t.recorded_at??t.date??t.created_at??null);return a==="amount"&&n==null||a==="percent"&&r==null?null:{type:a,amount:n??null,percentage:r??null,value:i,note:l&&String(l).trim().length?String(l).trim():null,recordedAt:p}}function Et(t){if(t==null||t==="")return null;const e=v(String(t)).replace(/%/g,"").trim();if(!e)return null;const a=Number.parseFloat(e);return Number.isFinite(a)?a:null}function Me(t){if(!t)return new Date().toISOString();const e=new Date(t);return Number.isNaN(e.getTime())?new Date().toISOString():e.toISOString()}function he(t,e){if(!e)return null;const{date:a,time:n}=Qa(te(e)),r=t==="start",i=r?"⏱️":"⌛",l=r?s("projects.details.labels.start","بداية الحجز"):s("projects.details.labels.end","نهاية الحجز");return{icon:i,label:l,value:a,meta:n}}function Qa(t){if(!t||t==="—")return{date:"—",time:""};const e=t.split(" ").filter(Boolean),a=e.shift()||"—",n=e.join(" ");return{date:a,time:n}}function Ie(t){if(!t)return s("projects.form.types.unknown","نوع غير محدد");const e={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[t]||"projects.form.types.unknown";return s(e,t)}function Za(t){if(!t)return 0;const e=Array.isArray(t.items)?t.items:[],a=t.discount??0,n=Number(v(String(a)))||0,r=t.discountType||"percent",i=Array.isArray(t.technicians)?t.technicians:[],l=Te(e,n,r,!1,i,{start:t.start,end:t.end});if(Number.isFinite(l))return l;const p=Number(v(String(t.cost??0)));return Number.isFinite(p)?Math.round(p):0}function Fe(t){if(typeof window>"u")return null;try{const n=new URLSearchParams(window.location.search||"").get(t);if(n)return n}catch{}const e=window.location.hash?window.location.hash.replace(/^#/,""):"";if(e&&e.includes(`${t}=`))try{const n=new URLSearchParams(e).get(t);if(n)return n}catch{}return null}function tn(){return Fe(Kt)}function en(){return Fe(Gt)}function an(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const t=new URLSearchParams(window.location.search||""),e=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[Kt,Gt].forEach(c=>{t.has(c)&&(t.delete(c),a=!0)});let n=e,r=!1;if(e)try{const c=new URLSearchParams(e);let f=!1;[Kt,Gt].forEach(d=>{c.has(d)&&(c.delete(d),f=!0)}),f&&(n=c.toString(),r=!0)}catch{}if(!a&&!r)return;const i=window.location.pathname,l=t.toString(),p=`${i}${l?`?${l}`:""}${n?`#${n}`:""}`;window.history.replaceState({},"",p)}catch{}}function nn(){const t=tn(),e=en();t&&(x.pendingProjectDetailId=t),e&&(x.pendingProjectEditId=e,x.pendingProjectDetailId||(x.pendingProjectDetailId=e)),(t||e)&&an()}function sn(){if(!x.pendingProjectDetailId)return;const t=x.pendingProjectDetailId,e=String(t),a=x.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(l=>l!=null&&String(l)===e));if(!a)return;x.pendingProjectDetailId=null;const n=a?.id??a?.projectId??a?.project_id??e;if(at(n),x.pendingProjectEditId!=null){const r=String(x.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(l=>l!=null&&String(l)===r)&&(x.pendingProjectEditId=null,setTimeout(()=>Le(a),0))}}function rn(){document.addEventListener("DOMContentLoaded",()=>{_a(),nn(),da(),xe(),ua(),Ia(),Fa(),pa(),ma(),fa(),ha(),ya(),ba(),ga({onViewDetails:at}),Ha({onOpenProject:at}),va(),on()}),document.addEventListener("language:changed",ye),document.addEventListener("language:translationsReady",ye),document.addEventListener("customers:changed",cn),document.addEventListener("technicians:updated",ln),document.addEventListener("reservations:changed",()=>ja(at)),document.addEventListener(Ke.USER_UPDATED,()=>{ut()})}async function on(){try{await $e({suppressError:!0}),await Ee()}catch(t){console.error("❌ [projects] Failed to initialise projects data",t);const e=t?.message||s("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");A(e,"error")}finally{Sa(),Ct(),Pa(),we(),ut(),vt(),gt(),sn()}}function ye(){Ct(),we(),ut(),vt(),gt(),xe()}function cn(){xa(),Ct()}function ln(){wa(),Ct()}Ge();Ye();Xe();Ca();rn();document.addEventListener("DOMContentLoaded",()=>{Ze(),Qe()});const be=.15,wt={},dn="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let bt=0;const P={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},u={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Tt=Object.freeze({projects:`
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
  `});let H=null;const Be=["upcoming","ongoing","completed"];async function un({forceProjects:t=!1}={}){try{await $e({suppressError:!0}),await Da({force:t})}catch(e){console.error("❌ [projectsReports] Failed to load initial data",e),Dt(e)&&console.warn("Projects API error:",e.message)}qe()}async function pn(){hn(),_e(),await mn();try{await un({forceProjects:!0}),Ve(),Sn(),U()}finally{He()}document.addEventListener("language:changed",xn),document.addEventListener("projects:changed",()=>{Xt().catch(t=>{console.error("❌ [projectsReports] Failed to refresh after projects change",t)})}),document.addEventListener("reservations:changed",()=>{Xt().catch(t=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",t)})}),window.addEventListener("storage",wn)}document.addEventListener("DOMContentLoaded",pn);async function mn(){if(H)return H;if(typeof window>"u")return null;if(window.ApexCharts)return H=window.ApexCharts,H;try{await fn(dn),H=window.ApexCharts||null}catch(t){console.warn("ApexCharts failed to load",t),H=null}return H}function fn(t){return new Promise((e,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const n=document.querySelector(`script[src="${t}"]`);if(n){if(n.dataset.loaded==="true"){e();return}n.addEventListener("load",e,{once:!0}),n.addEventListener("error",()=>a(new Error(`Failed to load script ${t}`)),{once:!0});return}const r=document.createElement("script");r.src=t,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",e()},r.onerror=()=>a(new Error(`Failed to load script ${t}`)),document.head.appendChild(r)})}function hn(){u.search=document.getElementById("reports-search"),u.statusChips=document.getElementById("reports-status-chips"),u.payment=document.getElementById("reports-payment"),u.dateRange=document.getElementById("reports-date-range"),u.customRangeWrapper=document.getElementById("reports-custom-range"),u.startDate=document.getElementById("reports-start-date"),u.endDate=document.getElementById("reports-end-date"),u.refreshBtn=document.getElementById("reports-refresh"),u.kpiGrid=document.getElementById("reports-kpi-grid"),u.table=document.getElementById("reports-table"),u.tableBody=u.table?.querySelector("tbody"),u.tableMeta=document.getElementById("reports-table-meta"),u.tableEmpty=document.getElementById("reports-empty"),u.chartCards={},u.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(t=>{const e=t.dataset.chartCard;if(!e)return;u.chartCards[e]=t;const a=t.querySelector("[data-chart-loading]");a&&(u.chartLoaders[e]=a)})}function Re(t){const e=!!t;Object.entries(u.chartCards||{}).forEach(([a,n])=>{if(!n)return;n.classList.toggle("is-loading",e),n.setAttribute("aria-busy",e?"true":"false");const r=u.chartLoaders?.[a];r&&(r.hidden=!e)})}function _e(){bt+=1,bt===1&&Re(!0)}function He(){bt=Math.max(0,bt-1),bt===0&&Re(!1)}function qe(){const{customers:t=[]}=Pe();P.customers=Array.isArray(t)?t:[],P.reservations=ee();const e=new Map(P.customers.map(n=>[String(n.id),n])),a=se();P.projects=Array.isArray(a)?a.map(n=>yn(n,e)):[],P.totalProjects=P.projects.length}function yn(t,e){const a=t.paymentStatus==="paid"?"paid":"unpaid",n=e.get(String(t.clientId)),r=bn(t.id),i=r.reduce((G,F)=>G+gn(F),0),l=vn(t),p=Number(t?.equipmentEstimate)||0,c=Number((p+l).toFixed(2)),f=t?.applyTax===!0||t?.applyTax==="true",d=f?Number((c*be).toFixed(2)):0,j=f?Number(((c+i)*be).toFixed(2)):0,b=Number((c+i+j).toFixed(2)),$=jn(t),w=t.start?new Date(t.start):null,I=t.end?new Date(t.end):null;return{raw:t,id:t.id,projectCode:t.projectCode||t.id,title:(t.title||"").trim(),clientId:t.clientId,clientName:n?.customerName||n?.name||"",clientCompany:t.clientCompany||n?.companyName||"",type:t.type||t.projectType||"",description:t.description||"",paymentStatus:a,confirmed:t.confirmed===!0||t.confirmed==="true",start:w,end:I,applyTax:f,status:$,reservationsTotal:Number(i.toFixed(2)),expensesTotal:l,subtotal:c,taxAmount:d,combinedTaxAmount:j,overallTotal:b,unpaidValue:a==="paid"?0:b,reservationsCount:r.length}}function bn(t){return Array.isArray(P.reservations)?P.reservations.filter(e=>String(e.projectId)===String(t)):[]}function gn(t){if(!t)return 0;const e=Array.isArray(t.items)?t.items:[],a=t.discount??0,n=Number(v(String(a)))||0,r=t.discountType||"percent",i=Array.isArray(t.technicians)?t.technicians:[],l=Te(e,n,r,!1,i,{start:t.start,end:t.end});if(Number.isFinite(l))return l;const p=Number(v(String(t.cost??0)));return Number.isFinite(p)?Math.round(p):0}function vn(t){return typeof t.expensesTotal=="number"?Number(t.expensesTotal)||0:Array.isArray(t.expenses)?t.expenses.reduce((e,a)=>e+(Number(a.amount)||0),0):0}function jn(t){const e=new Date,a=t.start?new Date(t.start):null,n=t.end?new Date(t.end):null;return a&&!Number.isNaN(a.getTime())&&a>e?"upcoming":n&&!Number.isNaN(n.getTime())&&n<e?"completed":"ongoing"}function Sn(){if(u.search){let t;u.search.addEventListener("input",()=>{clearTimeout(t),t=setTimeout(()=>{P.filters.search=u.search.value.trim(),U()},180)})}u.payment&&(u.payment.value=P.filters.payment,u.payment.addEventListener("change",()=>{P.filters.payment=u.payment.value||"all",U()})),u.dateRange&&(u.dateRange.addEventListener("change",Pn),u.dateRange.value=P.filters.range),u.startDate&&u.startDate.addEventListener("change",()=>{P.filters.startDate=u.startDate.value,P.filters.range==="custom"&&U()}),u.endDate&&u.endDate.addEventListener("change",()=>{P.filters.endDate=u.endDate.value,P.filters.range==="custom"&&U()}),u.refreshBtn&&u.refreshBtn.addEventListener("click",()=>{if(P.filters.range!=="custom"){U();return}P.filters.startDate=u.startDate?.value||"",P.filters.endDate=u.endDate?.value||"",U()})}function Pn(t){const e=t.target.value;P.filters.range=e,e==="custom"?u.customRangeWrapper?.classList.add("active"):(u.customRangeWrapper?.classList.remove("active"),P.filters.startDate="",P.filters.endDate="",u.startDate&&(u.startDate.value=""),u.endDate&&(u.endDate.value=""),U())}async function Xt(){_e();try{await Promise.all([Ee(),Ta()])}catch(t){console.error("❌ [projectsReports] Data mutation refresh failed",t),Dt(t)&&console.warn("Projects API error:",t.message)}finally{qe(),U(),He()}}function xn(){Ve(),U()}function wn(t){t.key&&!["projects","reservations","customers"].includes(t.key)||Xt().catch(e=>{console.error("❌ [projectsReports] Storage sync failed",e)})}function U(){const t=Tn();oe(),En(t),Cn(t),Dn(t),Ln(t),kn(t),Mn(t)}function Tn(){const{search:t,statuses:e,payment:a,range:n,startDate:r,endDate:i}=P.filters,l=Oe(t),p=new Date,c=Number(n);let f=null;if(n==="custom"){f=r?new Date(r):null;const d=i?new Date(i):null;return P.projects.filter(j=>!ge(j,e)||!ve(j,a)||!je(j,l)?!1:$n(j.start,f,d))}return n!=="all"&&Number.isFinite(c)&&(f=new Date,f.setDate(p.getDate()-c)),P.projects.filter(d=>!ge(d,e)||!ve(d,a)||!je(d,l)?!1:n==="all"?!0:An(d.start,f,p))}function ge(t,e){return e.includes(t.status)}function ve(t,e){return e==="all"?!0:t.paymentStatus===e}function je(t,e){return e?Oe([t.title,t.projectCode,t.clientName,t.clientCompany,t.type,t.description].filter(Boolean).join(" ")).includes(e):!0}function An(t,e,a){return!t||!(t instanceof Date)||Number.isNaN(t.getTime())?!1:e?t>=e&&t<=a:!0}function $n(t,e,a){if(!e&&!a)return!0;if(!t||Number.isNaN(t.getTime()))return!1;const n=t.getTime();return!(e&&!Number.isNaN(e.getTime())&&n<e.getTime()||a&&!Number.isNaN(a.getTime())&&n>a.getTime())}function Oe(t){return t?v(String(t)).toLowerCase().trim():""}function En(t){if(!u.kpiGrid)return;const e=t.length,a=t.reduce((l,p)=>l+p.overallTotal,0),n=t.reduce((l,p)=>l+p.unpaidValue,0),r=t.reduce((l,p)=>l+p.expensesTotal,0),i=[{icon:Tt.projects,label:s("projects.reports.kpi.totalProjects","Total projects"),value:Qt(e),meta:s("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Tt.value,label:s("projects.reports.kpi.totalValue","Total value"),value:$t(a),meta:s("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Tt.outstanding,label:s("projects.reports.kpi.unpaidValue","Outstanding value"),value:$t(n),meta:s("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Tt.expenses,label:s("projects.reports.kpi.expenses","Total expenses"),value:$t(r),meta:s("projects.reports.kpi.expensesMeta","Expenses for included projects")}];u.kpiGrid.innerHTML=i.map(({icon:l,label:p,value:c,meta:f})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${l}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${_(p)}</p>
        <p class="reports-kpi-value">${_(c)}</p>
        <span class="reports-kpi-meta">${_(f)}</span>
      </div>
    </div>
  `).join("")}function Ve(){if(!u.statusChips)return;const t=Be.map(e=>{const a=s(`projects.status.${e}`,e);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${e}">${_(a)}</button>`}).join("");u.statusChips.innerHTML=t,u.statusChips.dataset.listenerAttached||(u.statusChips.addEventListener("click",Nn),u.statusChips.dataset.listenerAttached="true"),oe()}function Nn(t){const e=t.target.closest("[data-status]");if(!e)return;const a=e.dataset.status;if(!a)return;const n=new Set(P.filters.statuses);n.has(a)?n.delete(a):n.add(a),n.size===0&&Be.forEach(r=>n.add(r)),P.filters.statuses=Array.from(n),oe(),U()}function oe(){if(!u.statusChips)return;const t=new Set(P.filters.statuses);u.statusChips.querySelectorAll("[data-status]").forEach(e=>{e.classList.toggle("is-active",t.has(e.dataset.status))})}function Cn(t){if(!H)return;const e=document.getElementById("reports-status-chart");if(!e)return;const a=["upcoming","ongoing","completed"],n=a.map(c=>t.filter(f=>f.status===c).length),r=a.map(c=>s(`projects.status.${c}`,c)),l=n.reduce((c,f)=>c+f,0)>0?n:[],p={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:l,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>nt(c)}},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};Lt("status",e,p)}function Dn(t){if(!H)return;const e=document.getElementById("reports-timeline-chart");if(!e)return;const a=new Map,n=new Intl.DateTimeFormat(Fn(),{month:"short",year:"numeric"});t.forEach(d=>{if(!d.start||Number.isNaN(d.start.getTime()))return;const j=`${d.start.getFullYear()}-${d.start.getMonth()+1}`,b=a.get(j)||{total:0,label:n.format(d.start)};b.total+=d.overallTotal,a.set(j,b)});const i=Array.from(a.keys()).sort((d,j)=>{const[b,$]=d.split("-").map(Number),[w,I]=j.split("-").map(Number);return b===w?$-I:b-w}).slice(-12),l=i.map(d=>a.get(d)?.label||d),p=i.map(d=>Math.round(a.get(d)?.total||0)),c=p.length?[{name:s("projects.reports.datasets.value","Total value"),data:p}]:[],f={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:l,labels:{rotate:-35}},yaxis:{labels:{formatter:d=>nt(d)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:d=>nt(d)}},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")}};Lt("timeline",e,f)}function Ln(t){if(!H)return;const e=document.getElementById("reports-expense-chart");if(!e)return;const a=[...t].sort((f,d)=>d.overallTotal-f.overallTotal).slice(0,6),n=a.map(f=>f.title||f.projectCode),r=a.map(f=>Math.round(f.overallTotal)),i=a.map(f=>Math.round(f.expensesTotal)),l=n.length?[{name:s("projects.reports.datasets.value","Total value"),data:r},{name:s("projects.reports.datasets.expenses","Expenses"),data:i}]:[],c={chart:{type:"bar",height:Math.max(320,n.length*60||0),toolbar:{show:!1}},series:l,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:n,labels:{formatter:f=>nt(f)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:f=>nt(f)}},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")}};Lt("expenses",e,c)}function kn(t){if(!H)return;const e=document.getElementById("reports-clients-chart");if(!e)return;const a=new Map;t.forEach(c=>{const f=c.clientName||c.clientCompany||s("projects.fallback.unknownClient","Unknown client"),d=a.get(f)||0;a.set(f,d+c.overallTotal)});const n=Array.from(a.entries()).sort((c,f)=>f[1]-c[1]).slice(0,6),r=n.map(([c])=>c),i=n.map(([,c])=>Math.round(c)),l=i.length?[{name:s("projects.reports.datasets.value","Total value"),data:i}]:[],p={chart:{type:"bar",height:320,toolbar:{show:!1}},series:l,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>nt(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>nt(c)}},legend:{show:!1},noData:{text:s("projects.reports.noData","لا توجد بيانات متاحة")}};Lt("clients",e,p)}function Lt(t,e,a={}){if(!H||!e)return;if(wt[t]){try{wt[t].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${t} chart`,r)}delete wt[t]}e.innerHTML="";const n={...a};Array.isArray(n.series)||(n.series=[]);try{const r=new H(e,n);wt[t]=r,r.render().catch(i=>{console.error(`❌ [projectsReports] Failed to render ${t} chart`,i)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${t} chart`,r)}}function Mn(t){if(!u.table||!u.tableBody||!u.tableEmpty)return;if(!t.length){u.table.style.display="none",u.tableEmpty.classList.add("active"),u.tableMeta&&(u.tableMeta.textContent="");return}u.table.style.display="",u.tableEmpty.classList.remove("active");const e=t.map(a=>{const n=In(a.start,a.end),r=s(`projects.status.${a.status}`,a.status),i=s(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),l=a.clientCompany?`${_(a.clientName)} <small class="text-muted">${_(a.clientCompany)}</small>`:_(a.clientName||s("projects.fallback.unknownClient","Unknown client"));return`
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
        <td>${_($t(a.overallTotal))}</td>
        <td>${_(i)}</td>
      </tr>
    `}).join("");if(u.tableBody.innerHTML=e,u.tableMeta){const a=s("projects.reports.table.meta","Showing {count} of {total} projects");u.tableMeta.textContent=a.replace("{count}",Qt(t.length)).replace("{total}",Qt(P.totalProjects))}}function In(t,e){if(!t&&!e)return"—";const a=t?le(t.toISOString()):"—",n=e?le(e.toISOString()):"—";return e?`${a} → ${n}`:a}function $t(t){const e=Number(t)||0,n=Nt()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(n,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(e));return`${v(r)} SR`}function Qt(t){const a=Nt()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return v(new Intl.NumberFormat(a).format(t))}function nt(t){const a=Nt()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return v(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(t))}function Fn(){return Nt()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function _(t=""){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
