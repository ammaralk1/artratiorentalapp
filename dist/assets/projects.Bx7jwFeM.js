import{v as sa,w as ra,x as kt,o as ut,s as R,t as n,l as Ft,n as x,A as oa,e as ia,m as ca,h as la,i as da,f as xt,g as Oe}from"./auth.CBX0gqkT.js";/* empty css              */import{i as ua}from"./dashboardShell.J-clzlTe.js";import{d as m,r as je,a as Ee,u as Ne,s as C,b as pa,f as pt,h as ma,i as fa,j as o,k as T,l as ha,m as mt,n as ba,o as St,e as tt,p as wt,q as ya,t as va,g as ga,c as ja,v as xa,w as Rt,x as Sa,y as wa,z as Pa,A as Ta,B as Aa,C as $a,D as Ea,E as Na,F as Ca,G as La,H as Da,I as Ve,J as ka,K as It,L as Fa,M as Ra}from"./form.C2C5B0jk.js";import"./customers.DT7ECCXd.js";import{g as ft,b as Ia,o as qe,q as at,a as Mt,D as nt,l as Ma}from"./reservationsService.DIbccY-o.js";import{P as ht,l as bt,n as Pt,u as Bt,o as yt,p as Ue,t as st,v as Ba,x as _a,i as qa,h as Ha,w as Oa,y as rt,z as ot,e as _t,A as qt,B as Va,C as Ua}from"./controller.O1O3rRl6.js";import{a as za}from"./calculations.C5KjGIAw.js";let Tt=null;function Wa(e){e&&Ht()!==e&&ut({[ht]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Ht(){return kt()?.[ht]||""}function Ot(e){e&&it()!==e&&ut({[bt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function it(){return kt()?.[bt]||""}function Ga(e){if(!e)return"";const t=e.trim();return t?Object.values(Pt).includes(t)?t:Pt[t]||"":""}function Ja(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Ga(t);if(a)return a}}catch{}return""}function Vt(e,t){!e||!m.tabPanes||!m.tabButtons||(m.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),m.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Wa(e))}function Ka(){if(!m.tabButtons||!m.tabButtons.length)return;m.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Vt(r,a),r==="projects-section"&&(C.filters.search="",m.search&&(m.search.value=""),je(),Ee(),Ne()))}),a.dataset.tabListenerAttached="true")});const e=Ht(),t=e&&m.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function vt(e,t){!e||!m.projectSubTabButtons||!m.projectSubTabPanes||(m.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),m.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function Ya(){!m.projectSubTabButtons||!m.projectSubTabButtons.length||(m.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(vt(a,e),Ot(a))}),e.dataset.tabListenerAttached="true")}),Xa())}function Xa(){const t=Ja()||it();if(!t)return;const a=m.projectSubTabButtons?.[0],s=m.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==it()&&Ot(r),vt(r,s))}function Qa(){return m.tabButtons?m.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function At(e={}){if(e){if(m.tabButtons&&m.tabButtons.length){const a=m.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[ht];if(s&&s!==a){const r=m.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Vt(s,r)}}if(m.projectSubTabButtons&&m.projectSubTabButtons.length&&Qa()){const a=m.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[bt];if(s&&s!==a){const r=m.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&vt(s,r)}}}}function Za(){Tt||(Tt=sa(e=>{At(e)})),ra().then(e=>{At(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function me(e){const t=C.projects.find(D=>String(D.id)===String(e));if(!t||!m.detailsBody)return;m.detailsBody.dataset.mode="view",m.detailsBody.dataset.projectId=String(t.id);const s=(C.customers.length?C.customers:Ft().customers||[]).find(D=>String(D.id)===String(t.clientId)),r=Gt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),d=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",p=c?x(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),h=s?.email??t.clientEmail??t.customerEmail??"",$=h?String(h).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),b=(t.clientCompany||s?.companyName||"").trim(),g=t.projectCode||`PRJ-${x(String(t.id))}`,A=x(g),P=pt(t.id),K=P.reduce((D,U)=>D+Jt(U),0),E=Number(K.toFixed(2)),N=P.length,{subtotal:H,applyTax:_,expensesTotal:ce}=ma(t),ne=Number(t?.servicesClientPrice??t?.services_client_price??0),he=H,Ce=_?Number(((he+E)*st).toFixed(2)):0,be=Number((he+E+Ce).toFixed(2)),se=fa(t),Le=n(`projects.status.${se}`,Ba[se]||se),We={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"}[se]||"status-confirmed",re=_?n("projects.details.chips.vatOn","شامل الضريبة 15٪"):n("projects.details.chips.vatOff","غير شامل الضريبة"),oe=_?"status-paid":"status-unpaid",ye=n("projects.details.chips.reservations","{count} حجوزات").replace("{count}",x(String(N))),ve=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",xe=dn(t),ge=xe.length>0,Se=ge?0:Number(t.paidAmount)||0,y=ge?0:Number(t.paidPercent)||0;let f=be,v,j,w,L,I,F,k,Y,B,W;const de=cn(xe),ke=n("projects.focus.confirmed","✅ مشروع مؤكد"),we=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(ke)}</span>`:"";let O=[];if(N>0){const D=P.reduce((Me,ie)=>{const na=Array.isArray(ie.items)?ie.items:[],jt=Array.isArray(ie.crewAssignments)?ie.crewAssignments:[],pe=jt.length?jt:Array.isArray(ie.technicians)?ie.technicians:[],et=Ia({items:na,technicianIds:Array.isArray(pe)&&!pe.length?pe:[],crewAssignments:Array.isArray(pe)&&pe.length&&typeof pe[0]=="object"?pe:[],discount:ie.discount??0,discountType:ie.discountType||"percent",applyTax:!1,start:ie.start,end:ie.end,companySharePercent:null});return Me.equipment+=Number(et.equipmentTotal||0),Me.crew+=Number(et.crewTotal||0),Me.crewCost+=Number(et.crewCostTotal||0),Me},{equipment:0,crew:0,crewCost:0}),U=Number(ce||0),z=Number((D.equipment+D.crew+ne).toFixed(2)),q=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let X=(t?.discountType==="amount"?"amount":"percent")==="amount"?q:z*(q/100);(!Number.isFinite(X)||X<0)&&(X=0),X>z&&(X=z);const Ze=_===!0,Te=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",Ie=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,G=Te&&Ie>0?Ie:0,Z=Math.max(0,z-X),ee=Number((Z*(G/100)).toFixed(2)),le=Ze?Number(((Z+ee)*st).toFixed(2)):0,te=Number((Z+ee+le).toFixed(2)),Ae=Number((te-ee-le-U-D.crewCost).toFixed(2));D.equipment>0&&O.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:T(D.equipment)}),D.crew>0&&O.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:T(D.crew)}),D.crewCost>0&&O.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:T(D.crewCost)}),U>0&&O.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة خدمات الإنتاجية"),value:T(U)}),ne>0&&O.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","سعر العميل للخدمات الإنتاجية"),value:T(ne)}),X>0&&O.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${T(X)}`}),O.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:T(Z)}),ee>0&&O.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${T(ee)}`}),le>0&&O.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${T(le)}`}),O.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:T(Ae)}),O.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:T(te)}),f=te}else O=[{icon:"💼",label:n("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:T(he)},{icon:"🔗",label:n("projects.details.summary.reservationsTotal","إجمالي المعدات / طاقم العمل"),value:T(E)},{icon:"🧮",label:n("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:T(Ce)},{icon:"💰",label:n("projects.details.summary.overallTotal","الإجمالي الكلي"),value:T(be)}];v=qe({totalAmount:f,paidAmount:Se,paidPercent:y,history:xe}),j=at({manualStatus:ve||"unpaid",paidAmount:v.paidAmount,paidPercent:v.paidPercent,totalAmount:f}),w=n(`projects.paymentStatus.${j}`,j==="paid"?"Paid":j==="partial"?"Partial":"Unpaid"),L=j==="paid"?"status-paid":j==="partial"?"status-partial":"status-unpaid",I=Number.isFinite(Number(v.paidAmount))?Number(v.paidAmount):0,F=Number.isFinite(Number(v.paidPercent))?Number(v.paidPercent):0,k=Math.max(0,Number((f-I).toFixed(2))),Y=T(I),B=`${x(F.toFixed(2))}%`,W=T(k);const Fe=O.map(({icon:D,label:U,value:z})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${D} ${o(U)}</span>
      <span class="summary-details-value">${o(z)}</span>
    </div>
  `).join(""),Ge=n("projects.details.labels.code","رقم المشروع"),Je=`
    <div class="project-details-code-badge" title="${o(Ge)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Ge)}
      </span>
      <span class="project-details-code-badge__value">${o(A)}</span>
    </div>
  `,Ke=[{icon:"👤",label:n("projects.details.client","العميل"),value:d},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:p},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:$},b?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:b}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:r},Et("start",t.start),Et("end",t.end)].filter(Boolean),Ye=n("projects.details.overview.heading","معلومات المشروع"),Xe=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Ye)}</h6>
      <ul class="project-details-outline__list">
        ${Ke.map(({icon:D,label:U,value:z,meta:q})=>`
          <li>
            <span class="project-details-outline__label">${o(D)} ${o(U)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${o(z)}</span>
              ${q?`<span class="project-details-outline__meta">${o(q)}</span>`:""}
            </span>
          </li>
        `).join("")}
      </ul>
    </div>
  `,Pe=[`<span class="reservation-chip ${We}">${o(Le)}</span>`,`<span class="reservation-chip ${oe}">${o(re)}</span>`,`<span class="reservation-chip status-info">${o(ye)}</span>`,`<span class="reservation-chip ${L}">${o(w)}</span>`,we].filter(Boolean).join(""),Re=n("projects.details.expensesTotal","إجمالي المصاريف"),Qe=n("projects.details.reservationsTotal","إجمالي الحجوزات");m.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${Pe}</div>
        </div>
        <div class="project-details-header__code">
          ${Je}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${Xe}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(n("projects.details.summary.title","ملخص مالي"))}</h6>
            ${Fe}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.description","وصف المشروع"))}</h5>
      <p class="project-details-description">${o(i)}</p>
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.financialBreakdown","تفاصيل مالية"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(Re)}</span>
          <strong>${T(ce)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(Qe)}</span>
          <strong>${T(E)}</strong>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("reservations.paymentHistory.title","سجل الدفعات"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.total","الإجمالي الكلي"))}</span>
          <strong>${o(T(f))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.paid","المدفوع"))}</span>
          <strong>${o(Y)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(B)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(W)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${de}
      </div>
    </section>
    ${ha(t)}
    <div class="project-details-footer">
      <button type="button" class="modal-action-btn modal-action-btn--primary" data-action="create-reservation">
        ${o(n("projects.details.reservations.create","➕ إنشاء حجز مرتبط"))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--ghost" data-action="edit-project">
        ${o(n("projects.details.actions.edit","✏️ تعديل المشروع"))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--danger" data-action="delete-project">
        ${o(n("projects.details.actions.delete","🗑️ حذف المشروع"))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--ghost" id="project-details-export-btn">
        ${o(n("projects.details.actions.exportPdf","👁️ معاينة PDF"))}
      </button>
      <button type="button" class="modal-action-btn modal-action-btn--ghost" data-bs-dismiss="modal">
        ${o(n("actions.close","إغلاق"))}
      </button>
    </div>
  `,an(t);const M=m.detailsBody.querySelector("#project-details-export-btn");M&&M.addEventListener("click",async D=>{if(D.preventDefault(),M.blur(),!M.disabled){M.disabled=!0;try{await _a({project:t})}catch(U){console.error("❌ [projects/details] export project PDF failed",U),R(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{M.disabled=!1}}}),m.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m.detailsModalEl).show()}function en({onOpenProject:e}){!m.focusCards||m.focusCards.dataset.listenerAttached==="true"||(m.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),sn(l);return}r==="view"?e?.(l):r==="highlight"&&tn(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),m.focusCards.dataset.listenerAttached="true")}function tn(e){if(!m.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=m.projectsTableBody.querySelector(t);if(!a){R(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function an(e){if(!m.detailsBody)return;const t=m.detailsBody.querySelector('[data-action="create-reservation"]'),a=m.detailsBody.querySelector('[data-action="edit-project"]'),s=m.detailsBody.querySelector('[data-action="delete-project"]'),r=m.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(pt(e.id)||[]).some(d=>{const c=String(d?.status||d?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.disabled=!0,t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ يوجد حجز مرتبط بالفعل بهذا المشروع")):(t.disabled=!1,t.classList?.remove("disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",d=>{d.preventDefault(),$t(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),$t(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),Ut(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await ba(e.id),!C.projects.some(c=>String(c.id)===String(e.id))&&m.detailsModalEl&&window.bootstrap?.Modal.getInstance(m.detailsModalEl)?.hide()}finally{C.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const d=Ha("showReservationDetails");if(typeof d=="function")return d(i),!0;try{const c=await Oa("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const d=i.target.closest('[data-action="view-reservation"]');if(!d)return;const c=d.dataset.index||d.dataset.reservationIndex,p=Number.parseInt(c||"-1",10);if(!Number.isInteger(p)||p<0)return;await l(p)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const d=i.target.closest('[data-action="view-reservation"]');d&&(i.preventDefault(),d.click())})}}function Ut(e){if(!e||!m.detailsBody)return;const t=C.projects.find(b=>String(b.id)===String(e.id));if(!t)return;const a=C.customers.find(b=>String(b.id)===String(t.clientId)),s=a?.customerName||a?.name||t.clientName||t.customerName||"",r=t.clientCompany||a?.companyName||a?.company||"",l=Array.isArray(t.expenses)?t.expenses.map((b,g)=>({id:b?.id||`expense-${t.id}-${g}-${Date.now()}`,label:b?.label||"",amount:Number(b?.amount)||0})):[];let i=Array.isArray(t.paymentHistory)?t.paymentHistory.map((b,g)=>({type:b?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(b?.amount))?Number(b.amount):null,percentage:Number.isFinite(Number(b?.percentage))?Number(b.percentage):null,value:Number.isFinite(Number(b?.value))?Number(b.value):null,note:b?.note??null,recordedAt:b?.recordedAt??b?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${g}`})):[],d=i.reduce((b,g)=>b+(Number(g?.amount)||0),0),c=i.reduce((b,g)=>b+(Number(g?.percentage)||0),0),p=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,h=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!i.length&&(p>0||h>0)){const b=t.updatedAt??t.createdAt??new Date().toISOString();h>0?i=[{type:"percent",amount:Number.isFinite(p)&&p>0?p:null,percentage:h,value:h,note:null,recordedAt:b,key:`legacy-payment-${t.id}-percent`}]:p>0&&(i=[{type:"amount",amount:p,percentage:null,value:p,note:null,recordedAt:b,key:`legacy-payment-${t.id}-amount`}]),d=i.reduce((g,A)=>g+(Number(A?.amount)||0),0),c=i.reduce((g,A)=>g+(Number(A?.percentage)||0),0),p=0,h=0}d>0&&Math.abs(p-d)<.01&&(p=0),c>0&&Math.abs(h-c)<.01&&(h=0);const $={clientName:s,clientCompany:r,expenses:l,payments:i,basePaidAmount:p,basePaidPercent:h};m.detailsBody.dataset.mode="edit",m.detailsBody.innerHTML=rn(t,$),nn(t,$)}function nn(e,t={expenses:[]}){const a=m.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",y=>{y.preventDefault(),me(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),d=a.querySelector('[data-action="add-expense"]'),c=a.querySelector("#project-edit-expense-list"),p=a.querySelector('[name="project-start-date"]'),h=a.querySelector('[name="project-start-time"]'),$=a.querySelector('[name="project-end-date"]'),b=a.querySelector('[name="project-end-time"]'),g=a.querySelector('[name="project-payment-status"]'),A=a.querySelector("#project-edit-tax"),P=a.querySelector("#project-edit-company-share"),K=a.querySelector("#project-edit-discount"),E=a.querySelector("#project-edit-discount-type"),N=a.querySelector("#project-edit-payment-progress-type"),H=a.querySelector("#project-edit-payment-progress-value"),_=a.querySelector("#project-edit-services-client-price"),ce=a.querySelector("#project-edit-payment-add"),ne=a.querySelector("#project-edit-payment-history"),he=a.querySelector("#project-edit-payment-summary"),Ce=n("reservations.create.summary.currency","SR");let be=!1;const se=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments);_&&!_.dataset.normalizeAttached&&(_.addEventListener("input",y=>{const f=y.target;if(!(f instanceof HTMLInputElement))return;const v=f.selectionStart,j=x(f.value||"");if(f.value=j,typeof v=="number")try{f.setSelectionRange(v,v)}catch{}}),_.dataset.normalizeAttached="true");const Le=()=>{const y=Number(e.equipmentEstimate)||0,f=Array.isArray(t.expenses)?t.expenses.reduce((B,W)=>B+(Number(W.amount)||0),0):0,v=(()=>{const B=_?.value||(e?.servicesClientPrice??0),W=x(String(B)),de=Number.parseFloat(W);return Number.isFinite(de)&&de>=0?de:0})(),j=E?.value==="amount"?"amount":"percent",w=x(K?.value||"0");let L=Number.parseFloat(w);(!Number.isFinite(L)||L<0)&&(L=0);const I=A?.checked===!0,F=P?.checked===!0;let k=F?ga(P):null;(!Number.isFinite(k)||k<=0)&&(k=F?nt:null);const Y=ja({equipmentEstimate:y,expensesTotal:f,servicesClientPrice:v,discountValue:L,discountType:j,applyTax:I,companyShareEnabled:F,companySharePercent:k});return{equipmentEstimate:y,expensesTotal:f,discountValue:L,discountTypeValue:j,applyTax:I,companyShareEnabled:F,companySharePercent:k,servicesClientPrice:v,finance:Y}},De=()=>{const y=Le(),f=se(),j=(pt(e.id)||[]).reduce((k,Y)=>k+(Number(Y?.totalAmount)||Jt(Y)||0),0),w=Number(y.finance?.taxableAmount||0),L=y.applyTax?Number(((w+j)*st).toFixed(2)):0,I=Number((w+j+L).toFixed(2)),F=qe({totalAmount:I,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:f});return{...y,combinedTotalWithTax:I,payments:f,progress:F}},We=()=>{ne&&(ne.innerHTML=ln(se()))},re=()=>{if(!he)return;const{combinedTotalWithTax:y,progress:f}=De(),v=Number.isFinite(Number(y))?Number(y):0,j=Number.isFinite(Number(f.paidAmount))?Number(f.paidAmount):0,w=Number.isFinite(Number(f.paidPercent))?Number(f.paidPercent):0,L=Math.max(0,Math.round((v-j)*100)/100),I=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:T(v)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:T(j)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${x(w.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:T(L)}];he.innerHTML=I.map(({label:F,value:k})=>`
        <div class="project-details-grid-item">
          <span>${o(F)}</span>
          <strong>${o(k)}</strong>
        </div>
      `).join("")},oe=(y="auto")=>{if(!g)return;const f=g.dataset?.userSelected==="true";if(y==="auto"&&f)return;const{finance:v,progress:j}=De(),w=at({manualStatus:f?g.value:e.paymentStatus||"unpaid",paidAmount:j.paidAmount,paidPercent:j.paidPercent,totalAmount:v.totalWithTax});f||(g.value=w)},ye=()=>{We(),re(),oe("auto")},ve=1e-4,xe=()=>{const y=N?.value==="amount"?"amount":"percent",f=x(H?.value||"").replace("%","").trim();let v=Number.parseFloat(f);if(!Number.isFinite(v)||v<=0){R(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),H?.focus();return}const j=De(),w=Number.isFinite(Number(j.finance.totalWithTax))?Number(j.finance.totalWithTax):0;if(w<=0){R(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const L=Number(j.progress.paidAmount)||0,I=Number(j.progress.paidPercent)||0;let F=null,k=null;if(y==="percent"){const B=Math.max(0,100-I);if(B<=ve){R(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(v>B){v=B;const W=x(v.toFixed(2));R(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",W))}k=Math.round(v*100)/100,w>0&&(F=Math.round(k/100*w*100)/100)}else{const B=Math.max(0,w-L);if(B<=ve){R(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(v>B){v=B;const W=`${x(v.toFixed(2))} ${Ce}`;R(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",W))}F=Math.round(v*100)/100,w>0&&(k=Math.round(F/w*100*100)/100)}const Y={type:y,amount:F??null,percentage:k??null,value:y==="amount"?F:k,note:null,recordedAt:new Date().toISOString()};t.payments=[...se(),Y],H&&(H.value=""),N&&(N.value="percent"),ye(),R(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},ge=y=>{!A||!P||be||(be=!0,y==="share"?P.checked?(A.checked||(A.checked=!0),tt(P)):A.checked&&(A.checked=!1):y==="tax"&&(A.checked?tt(P):P.checked&&(P.checked=!1)),be=!1)};function Se(){c&&(c.innerHTML=zt(t.expenses))}Se(),ye(),K&&!K.dataset.listenerAttached&&(K.addEventListener("input",y=>{const f=y.target;f instanceof HTMLInputElement&&(f.value=x(f.value||""),re(),oe("auto"))}),K.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",y=>{const f=y.target;f instanceof HTMLInputElement&&(f.value=x(f.value||""))}),i.dataset.listenerAttached="true"),E&&!E.dataset.listenerAttached&&(E.addEventListener("change",()=>{re(),oe("auto")}),E.dataset.listenerAttached="true"),H&&!H.dataset.listenerAttached&&(H.addEventListener("input",y=>{const f=y.target;f instanceof HTMLInputElement&&(f.value=x(f.value||""))}),H.dataset.listenerAttached="true"),g&&!g.dataset.listenerAttached&&(g.addEventListener("change",()=>{g.dataset.userSelected="true"}),g.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",y=>{const f=y.target;f instanceof HTMLInputElement&&(f.value=x(f.value||""))}),l.dataset.listenerAttached="true"),P&&!P.dataset.listenerAttached&&(P.addEventListener("change",()=>{ge("share"),re(),oe("auto")}),P.dataset.listenerAttached="true"),A&&!A.dataset.listenerAttached&&(A.addEventListener("change",()=>{ge("tax"),re(),oe("auto")}),A.dataset.listenerAttached="true"),P?.checked&&tt(P),ge(P?.checked?"share":"tax"),re(),oe("auto"),d&&d.addEventListener("click",y=>{y.preventDefault();const f=r?.value.trim()||"",v=x(l?.value||"0"),j=Number(v),w=x(i?.value||"0"),L=Number(w);if(!f){R(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(j)||j<=0){R(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:f,amount:j,salePrice:Number.isFinite(L)&&L>0?L:0}),r&&(r.value=""),l&&(l.value=""),i&&(i.value="");try{const I=Array.isArray(t.expenses)?t.expenses.reduce((F,k)=>F+(Number(k?.salePrice)||0),0):0;_&&(_.value=x(String(I)))}catch{}Se(),re(),oe("auto")}),c&&c.addEventListener("click",y=>{const f=y.target.closest('[data-action="remove-expense"]');if(!f)return;const{id:v}=f.dataset;t.expenses=t.expenses.filter(j=>String(j.id)!==String(v));try{const j=Array.isArray(t.expenses)?t.expenses.reduce((w,L)=>w+(Number(L?.salePrice)||0),0):0;_&&(_.value=x(String(j)))}catch{}Se(),re(),oe("auto")}),ce&&!ce.dataset.listenerAttached&&(ce.addEventListener("click",y=>{y.preventDefault(),xe()}),ce.dataset.listenerAttached="true"),ne&&!ne.dataset.listenerAttached&&(ne.addEventListener("click",y=>{const f=y.target.closest('[data-action="remove-payment"]');if(!f)return;const v=Number.parseInt(f.dataset.index||"-1",10);if(!Number.isInteger(v)||v<0)return;const j=se();if(v>=j.length)return;const w=j.filter((L,I)=>I!==v);t.payments=w,ye(),R(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),ne.dataset.listenerAttached="true"),a.addEventListener("submit",async y=>{if(y.preventDefault(),a.dataset.submitting==="true")return;const f=a.querySelector('[name="project-title"]'),v=a.querySelector('[name="project-type"]'),j=a.querySelector('[name="project-description"]'),w=f?.value.trim()||"",L=v?.value||"",I=p?.value.trim()||"",F=h?.value.trim()||"",k=j?.value.trim()||"",Y=(g?.value||"unpaid").toLowerCase(),B=["paid","partial"].includes(Y)?Y:"unpaid";if(!w||!L||!I){R(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),f?.focus();return}const W=$?.value.trim()||"",de=b?.value.trim()||"",ke=wt(I,F),we=W?wt(W,de):"",O=new Date(ke),Fe=we?new Date(we):null;if(Fe&&O>Fe){R(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),$?.focus();return}if(C.projects.findIndex(G=>String(G.id)===String(e.id))===-1){R(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Je=Le(),{equipmentEstimate:Ke,discountValue:Ye,discountTypeValue:Xe,applyTax:Pe,companyShareEnabled:Re,companySharePercent:Qe,finance:M}=Je,D=N?.value==="amount"?"amount":"percent",U=x(H?.value||"");let z=U?Number.parseFloat(U):null,q=[...se()];if(Number.isFinite(z)&&z>0&&Number.isFinite(Number(M.totalWithTax))){const G=qe({totalAmount:M.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:q}),Z=new Date().toISOString();if(D==="percent"){const ee=Math.max(0,100-(G.paidPercent||0));if(ee>ve){const le=Math.min(z,ee),te=Math.round(le*100)/100,Ae=M.totalWithTax>0?Math.round(te/100*M.totalWithTax*100)/100:null;q=[...q,{type:"percent",amount:Ae,percentage:te,value:te,note:null,recordedAt:Z}]}}else{const ee=Math.max(0,M.totalWithTax-(G.paidAmount||0));if(ee>ve){const le=Math.min(z,ee),te=Math.round(le*100)/100,Ae=M.totalWithTax>0?Math.round(te/M.totalWithTax*100*100)/100:null;q=[...q,{type:"amount",amount:te,percentage:Ae,value:te,note:null,recordedAt:Z}]}}q!==t.payments&&(t.payments=q,ye()),H&&(H.value=""),N&&(N.value="percent"),z=null}const ue=qe({totalAmount:M.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:q}),X=g?.dataset?.userSelected==="true",Ze=at({manualStatus:X?B:e.paymentStatus||B,paidAmount:ue.paidAmount,paidPercent:ue.paidPercent,totalAmount:M.totalWithTax}),Te=X?B:Ze;!X&&g&&(g.value=Te),g?.dataset&&delete g.dataset.userSelected,t.payments=q;const Ie=qa({projectCode:e.projectCode,title:w,type:L,clientId:e.clientId,clientCompany:e.clientCompany,description:k,start:ke,end:we||null,applyTax:Pe,paymentStatus:Te,equipmentEstimate:Ke,expenses:t.expenses,servicesClientPrice:context.servicesClientPrice,discount:Ye,discountType:Xe,companyShareEnabled:Re&&Pe,companySharePercent:Re&&Pe?Qe:null,companyShareAmount:M.companyShareAmount,taxAmount:M.taxAmount,totalWithTax:M.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:ya(e),paidAmount:ue.paidAmount,paidPercentage:ue.paidPercent,paymentProgressType:ue.paymentProgressType,paymentProgressValue:ue.paymentProgressValue,payments:q});a.dataset.submitting="true";try{const G=await Bt(e.projectId??e.id,Ie),Z=G?.projectId??G?.id??e.id;await va(Z,Te),C.projects=yt(),C.reservations=ft(),R(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),je(),Ee(),Ne(),me(e.id)}catch(G){console.error("❌ [projects] Failed to update project from details view",G);const Z=Ue(G)?G.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");R(Z,"error")}finally{delete a.dataset.submitting}})}function $t(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description};ut({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}m.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function sn(e){if(!e)return;const t=C.projects.find(a=>String(a.id)===String(e));if(!t){R(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){R(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Bt(t.projectId??t.id,{confirmed:!0});const a=await pa(e);C.projects=yt(),C.reservations=ft(),je(),Ee(),Ne(),m.detailsModalEl&&m.detailsModalEl.classList.contains("show")&&m.detailsBody?.dataset.projectId===String(e)&&me(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),R(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=Ue(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");R(s,"error")}}function rn(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=St(e.start||""),{date:r,time:l}=St(e.end||""),i=e.applyTax===!0||e.applyTax==="true",d=typeof e.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",c=["paid","partial"].includes(d)?d:"unpaid",p=e.discountType==="amount"?"amount":"percent",h=x(String(e.discount??e.discountValue??0)),$=x(String(e.servicesClientPrice??e.services_client_price??0)),b=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??nt,g=Number.parseFloat(x(String(b))),A=Number.isFinite(g)&&g>0?g:nt,P=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(g)&&g>0;return`
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${o(n("projects.form.labels.title","عنوان المشروع"))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${o(e.title||"")}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${o(n("projects.form.labels.type","نوع المشروع"))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${on(e.type)}
          </select>
        </div>
        <div class="col-12">
          <div class="project-edit-inline-group project-edit-inline-group--dates">
            <div class="project-edit-inline-field">
              <label class="form-label">${o(n("projects.form.labels.startDate","تاريخ البدء"))}</label>
              <input type="date" class="form-control" name="project-start-date" value="${o(a)}" required>
            </div>
            <div class="project-edit-inline-field">
              <label class="form-label">${o(n("projects.form.labels.endDate","تاريخ الانتهاء"))}</label>
              <input type="date" class="form-control" name="project-end-date" value="${o(r)}">
            </div>
          </div>
          <div class="project-edit-inline-group project-edit-inline-group--times mt-2">
            <div class="project-edit-inline-field">
              <label class="form-label">${o(n("projects.form.labels.startTime","وقت البدء"))}</label>
              <input type="time" class="form-control" name="project-start-time" value="${o(s)}">
            </div>
            <div class="project-edit-inline-field">
              <label class="form-label">${o(n("projects.form.labels.endTime","وقت الانتهاء"))}</label>
              <input type="time" class="form-control" name="project-end-time" value="${o(l)}">
            </div>
          </div>
        </div>
        <div class="col-12">
          <label class="form-label">${o(n("projects.form.labels.description","الوصف"))}</label>
          <textarea class="form-control project-edit-textarea" name="project-description" rows="5">${o(e.description||"")}</textarea>
        </div>
        <div class="col-12 col-md-4 col-xl-3">
          <label class="form-label">${o(n("projects.form.labels.paymentStatus","حالة الدفع"))}</label>
          <select class="form-select project-edit-select-xs" name="project-payment-status" id="project-edit-payment-status">
            <option value="unpaid" ${c==="unpaid"?"selected":""}>${o(n("projects.paymentStatus.unpaid","غير مدفوع"))}</option>
            <option value="partial" ${c==="partial"?"selected":""}>${o(n("projects.paymentStatus.partial","مدفوع جزئياً"))}</option>
            <option value="paid" ${c==="paid"?"selected":""}>${o(n("projects.paymentStatus.paid","مدفوع"))}</option>
          </select>
        </div>
      </div>

      <div class="row g-3 align-items-start mt-1">
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label" for="project-edit-services-client-price">${o(n("projects.details.edit.servicesClientPrice","سعر البيع (SR)"))}</label>
          <input type="text" id="project-edit-services-client-price" class="form-control project-edit-input-xs" value="${o($)}" placeholder="0" inputmode="decimal">
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label" for="project-edit-discount">${o(n("projects.form.labels.discount","الخصم"))}</label>
          <div class="input-group project-edit-input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select project-edit-select-xs">
              <option value="percent" ${p==="percent"?"selected":""}>${o(n("projects.form.discount.percent","٪ نسبة"))}</option>
              <option value="amount" ${p==="amount"?"selected":""}>${o(n("projects.form.discount.amount","💵 مبلغ"))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control project-edit-input-xs" value="${o(h)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label d-block" for="project-edit-company-share">${o(n("projects.form.labels.companyShare","نسبة الشركة والضريبة"))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(A))}" ${P?"checked":""}>
              <label class="form-check-label" for="project-edit-company-share">${o(n("projects.form.companyShareToggle","إضافة نسبة الشركة (10٪)"))}</label>
            </div>
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${i?"checked":""}>
              <label class="form-check-label" for="project-edit-tax">${o(n("projects.form.taxLabel","شامل الضريبة (15٪)"))}</label>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label" for="project-edit-payment-progress-value">${o(n("projects.form.paymentProgress.label","💰 الدفعة المستلمة"))}</label>
          <div class="input-group project-edit-input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select project-edit-select-xs">
              <option value="amount" >${o(n("projects.form.paymentProgress.amount","💵 مبلغ"))}</option>
              <option value="percent" selected>${o(n("projects.form.paymentProgress.percent","٪ نسبة"))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control project-edit-input-xs" value="${o("")}" placeholder="0" inputmode="decimal">
          </div>
          <button type="button" class="modal-action-btn modal-action-btn--ghost project-edit-add-btn mt-2" id="project-edit-payment-add">${o(n("reservations.paymentHistory.actions.add","➕ إضافة دفعة"))}</button>
        </div>
      </div>

      <section class="project-edit-payment-history mt-4">
        <div id="project-edit-payment-summary" class="project-details-grid mb-3"></div>
        <div class="reservation-payment-history-block">
          <div class="reservation-payment-history__header">
            <h6 class="reservation-payment-history__title">${o(n("reservations.paymentHistory.title","سجل الدفعات"))}</h6>
          </div>
          <div id="project-edit-payment-history" class="reservation-payment-history"></div>
        </div>
      </section>

      <section class="project-edit-expenses mt-4">
        <h6 class="mb-2">${o(n("projects.form.labels.expenses","متطلبات المشروع"))}</h6>
        <div class="project-edit-expense-form">
          <div class="project-edit-expense-label-col">
            <input type="text" class="form-control project-edit-input-wide" id="project-edit-expense-label" placeholder="${o(n("projects.form.placeholders.expenseLabel","وصف المتطلب"))}">
          </div>
          <div class="project-edit-expense-amount-col">
            <input type="text" class="form-control project-edit-input-xs" id="project-edit-expense-amount" placeholder="${o(n("projects.form.placeholders.expenseAmount","المبلغ"))}" inputmode="decimal">
          </div>
          <div class="project-edit-expense-amount-col">
            <input type="text" class="form-control project-edit-input-xs" id="project-edit-expense-sale" placeholder="${o(n("projects.form.labels.salePrice","سعر البيع"))}" inputmode="decimal">
          </div>
          <div class="project-edit-expense-action-col">
            <button type="button" class="modal-action-btn modal-action-btn--warning project-edit-add-btn" data-action="add-expense">${o(n("projects.form.buttons.addExpense","➕ إضافة مصروف"))}</button>
          </div>
        </div>
        <div id="project-edit-expense-list" class="project-edit-expense-list mt-3">
          ${zt(t.expenses)}
        </div>
      </section>

      <div class="project-edit-actions mt-4 d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">${o(n("projects.form.buttons.update","تحديث المشروع"))}</button>
        <button type="button" class="btn btn-outline-secondary" data-action="cancel-edit">${o(n("actions.cancel","إلغاء"))}</button>
      </div>
    </form>
  `}function on(e){return["commercial","coverage","photography","social"].map(a=>{const s=Gt(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(s)}</option>`}).join("")}function zt(e=[]){if(!Array.isArray(e)||e.length===0){const s=o(n("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"));return`
      <div class="table-responsive">
        <table class="table table-sm table-hover align-middle project-services-table">
          <thead class="table-light">
            <tr>
              <th>${o(n("projects.expenses.table.headers.service","الخدمة"))}</th>
              <th>${o(n("projects.expenses.table.headers.cost","التكلفة (SR)"))}</th>
              <th>${o(n("projects.expenses.table.headers.sale","سعر البيع (SR)"))}</th>
              <th>${o(n("projects.expenses.table.headers.actions","الإجراءات"))}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="4" class="text-center text-muted">${s}</td></tr>
          </tbody>
        </table>
      </div>`}const t=o(n("actions.remove","إزالة")),a=e.map(s=>{const r=o(s?.label||""),l=o(T(s?.amount||0)),i=o(T(s?.salePrice||s?.sale_price||0)),d=o(String(s?.id||""));return`
      <tr>
        <td>${r}</td>
        <td>${l}</td>
        <td>${i}</td>
        <td><button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${d}" aria-label="${t}">✖</button></td>
      </tr>`}).join("");return`
    <div class="table-responsive">
      <table class="table table-sm table-hover align-middle project-services-table">
        <thead class="table-light">
          <tr>
            <th>${o(n("projects.expenses.table.headers.service","الخدمة"))}</th>
            <th>${o(n("projects.expenses.table.headers.cost","التكلفة (SR)"))}</th>
            <th>${o(n("projects.expenses.table.headers.sale","سعر البيع (SR)"))}</th>
            <th>${o(n("projects.expenses.table.headers.actions","الإجراءات"))}</th>
          </tr>
        </thead>
        <tbody>${a}</tbody>
      </table>
    </div>`}function cn(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(T(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${x(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?x(mt(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(x(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function ln(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(T(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${x(Number(a.percentage).toFixed(2))}%`:"—",d=a?.recordedAt?x(mt(a.recordedAt)):"—",c=a?.note?o(x(a.note)):"",p=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
      <tr>
        <td>${o(r)}</td>
        <td>${l}</td>
        <td>${i}</td>
        <td>${d}</td>
        <td>${c}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${s}" aria-label="${p}">🗑️</button>
        </td>
      </tr>
    `}).join("");return`
    <div class="reservation-payment-history__table-wrapper">
      <table class="table table-sm reservation-payment-history__table">
        <thead>
          <tr>
            <th>${o(n("reservations.paymentHistory.headers.method","نوع الدفعة"))}</th>
            <th>${o(n("reservations.paymentHistory.headers.amount","المبلغ"))}</th>
            <th>${o(n("reservations.paymentHistory.headers.percent","النسبة"))}</th>
            <th>${o(n("reservations.paymentHistory.headers.date","التاريخ"))}</th>
            <th>${o(n("reservations.paymentHistory.headers.note","ملاحظات"))}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${t}</tbody>
      </table>
    </div>
  `}function dn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(un).filter(Boolean);if(a.length>0)return a;const s=He(e.paidPercent??e.paid_percent),r=He(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Wt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function un(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=He(e.amount??(a==="amount"?e.value:null)),r=He(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,d=Wt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:d}}function He(e){if(e==null||e==="")return null;const t=x(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Wt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Et(e,t){if(!t)return null;const{date:a,time:s}=pn(mt(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية الحجز"):n("projects.details.labels.end","نهاية الحجز");return{icon:l,label:i,value:a,meta:s}}function pn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Gt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function Jt(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(x(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Mt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(x(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Kt(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function mn(){return Kt(rt)}function fn(){return Kt(ot)}function hn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[rt,ot].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let p=!1;[rt,ot].forEach(h=>{c.has(h)&&(c.delete(h),p=!0)}),p&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),d=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",d)}catch{}}function bn(){const e=mn(),t=fn();e&&(C.pendingProjectDetailId=e),t&&(C.pendingProjectEditId=t,C.pendingProjectDetailId||(C.pendingProjectDetailId=t)),(e||t)&&hn()}function yn(){if(!C.pendingProjectDetailId)return;const e=C.pendingProjectDetailId,t=String(e),a=C.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;C.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(me(s),C.pendingProjectEditId!=null){const r=String(C.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&(C.pendingProjectEditId=null,setTimeout(()=>Ut(a),0))}}function vn(){document.addEventListener("DOMContentLoaded",()=>{Za(),bn(),xa(),Rt(),Sa(),Ka(),Ya(),wa(),Pa(),Ta(),Aa(),$a(),Ea(),Na({onViewDetails:me}),en({onOpenProject:me}),Ca(),gn()}),document.addEventListener("language:changed",Nt),document.addEventListener("language:translationsReady",Nt),document.addEventListener("customers:changed",jn),document.addEventListener("technicians:updated",xn),document.addEventListener("reservations:changed",()=>La(me)),document.addEventListener(oa.USER_UPDATED,()=>{je()})}async function gn(){try{await _t({suppressError:!0}),await qt()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");R(t,"error")}finally{Da(),Ve(),ka(),It(),je(),Ne(),Ee(),yn()}}function Nt(){Ve(),It(),je(),Ne(),Ee(),Rt()}function jn(){Fa(),Ve()}function xn(){Ra(),Ve()}ia();ca();la();Va();vn();document.addEventListener("DOMContentLoaded",()=>{ua(),da()});const ct=.15,Be={},Sn="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let $e=0;const S={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},u={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},_e=Object.freeze({projects:`
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
  `});let J=null;const Yt=["upcoming","ongoing","completed"];async function wn({forceProjects:e=!1}={}){try{await _t({suppressError:!0}),await Ua({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),Ue(t)&&console.warn("Projects API error:",t.message)}ea()}async function Pn(){$n(),Qt(),await Tn();try{await wn({forceProjects:!0}),aa(),kn(),ae()}finally{Zt()}document.addEventListener("language:changed",Rn),document.addEventListener("projects:changed",()=>{lt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{lt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",In)}document.addEventListener("DOMContentLoaded",Pn);async function Tn(){if(J)return J;if(typeof window>"u")return null;if(window.ApexCharts)return J=window.ApexCharts,J;try{await An(Sn),J=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),J=null}return J}function An(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function $n(){u.search=document.getElementById("reports-search"),u.statusChips=document.getElementById("reports-status-chips"),u.payment=document.getElementById("reports-payment"),u.dateRange=document.getElementById("reports-date-range"),u.customRangeWrapper=document.getElementById("reports-custom-range"),u.startDate=document.getElementById("reports-start-date"),u.endDate=document.getElementById("reports-end-date"),u.refreshBtn=document.getElementById("reports-refresh"),u.kpiGrid=document.getElementById("reports-kpi-grid"),u.table=document.getElementById("reports-table"),u.tableBody=u.table?.querySelector("tbody"),u.tableMeta=document.getElementById("reports-table-meta"),u.tableEmpty=document.getElementById("reports-empty"),u.chartCards={},u.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;u.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(u.chartLoaders[t]=a)})}function Xt(e){const t=!!e;Object.entries(u.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=u.chartLoaders?.[a];r&&(r.hidden=!t)})}function Qt(){$e+=1,$e===1&&Xt(!0)}function Zt(){$e=Math.max(0,$e-1),$e===0&&Xt(!1)}function ea(){const{customers:e=[]}=Ft();S.customers=Array.isArray(e)?e:[],S.reservations=ft();const t=new Map(S.customers.map(s=>[String(s.id),s])),a=yt();S.projects=Array.isArray(a)?a.map(s=>En(s,t)):[],S.totalProjects=S.projects.length}function En(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=Nn(e.id),l=r.reduce((K,E)=>K+Cn(E),0),i=Ln(e),d=Number(e?.equipmentEstimate)||0,c=Number((d+i).toFixed(2)),p=e?.applyTax===!0||e?.applyTax==="true",h=p?Number((c*ct).toFixed(2)):0,$=p?Number(((c+l)*ct).toFixed(2)):0,b=Number((c+l+$).toFixed(2)),g=Dn(e),A=e.start?new Date(e.start):null,P=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:A,end:P,applyTax:p,status:g,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:h,combinedTaxAmount:$,overallTotal:b,unpaidValue:a==="paid"?0:b,reservationsCount:r.length}}function Nn(e){return Array.isArray(S.reservations)?S.reservations.filter(t=>String(t.projectId)===String(e)):[]}function Cn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(x(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Mt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(x(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Ln(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function Dn(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function kn(){if(u.search){let e;u.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{S.filters.search=u.search.value.trim(),ae()},180)})}u.payment&&(u.payment.value=S.filters.payment,u.payment.addEventListener("change",()=>{S.filters.payment=u.payment.value||"all",ae()})),u.dateRange&&(u.dateRange.addEventListener("change",Fn),u.dateRange.value=S.filters.range),u.startDate&&u.startDate.addEventListener("change",()=>{S.filters.startDate=u.startDate.value,S.filters.range==="custom"&&ae()}),u.endDate&&u.endDate.addEventListener("change",()=>{S.filters.endDate=u.endDate.value,S.filters.range==="custom"&&ae()}),u.refreshBtn&&u.refreshBtn.addEventListener("click",()=>{if(S.filters.range!=="custom"){ae();return}S.filters.startDate=u.startDate?.value||"",S.filters.endDate=u.endDate?.value||"",ae()})}function Fn(e){const t=e.target.value;S.filters.range=t,t==="custom"?u.customRangeWrapper?.classList.add("active"):(u.customRangeWrapper?.classList.remove("active"),S.filters.startDate="",S.filters.endDate="",u.startDate&&(u.startDate.value=""),u.endDate&&(u.endDate.value=""),ae())}async function lt(){Qt();try{await Promise.all([qt(),Ma()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),Ue(e)&&console.warn("Projects API error:",e.message)}finally{ea(),ae(),Zt()}}function Rn(){aa(),ae()}function In(e){e.key&&!["projects","reservations","customers"].includes(e.key)||lt().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function ae(){const e=Mn();gt(),qn(e),Un(e),zn(e),Wn(e),Gn(e),Jn(e)}function Mn(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=S.filters,i=ta(e),d=new Date,c=Number(s);let p=null;if(s==="custom"){p=r?new Date(r):null;const h=l?new Date(l):null;return S.projects.filter($=>!Ct($,t)||!Lt($,a)||!Dt($,i)?!1:_n($.start,p,h))}return s!=="all"&&Number.isFinite(c)&&(p=new Date,p.setDate(d.getDate()-c)),S.projects.filter(h=>!Ct(h,t)||!Lt(h,a)||!Dt(h,i)?!1:s==="all"?!0:Bn(h.start,p,d))}function Ct(e,t){return t.includes(e.status)}function Lt(e,t){return t==="all"?!0:e.paymentStatus===t}function Dt(e,t){return t?ta([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function Bn(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function _n(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function ta(e){return e?x(String(e)).toLowerCase().trim():""}function qn(e){if(!u.kpiGrid)return;const t=e.length,a=e.reduce((i,d)=>i+d.overallTotal,0),s=e.reduce((i,d)=>i+d.unpaidValue,0),r=e.reduce((i,d)=>i+d.expensesTotal,0),l=[{icon:_e.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:dt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:_e.value,label:n("projects.reports.kpi.totalValue","Total value"),value:Q(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:_e.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:Q(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:_e.expenses,label:n("projects.reports.kpi.expenses","خدمات إنتاجية (التكلفة)"),value:Q(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];u.kpiGrid.innerHTML=l.map(({icon:i,label:d,value:c,meta:p})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${V(d)}</p>
        <p class="reports-kpi-value">${V(c)}</p>
        <span class="reports-kpi-meta">${V(p)}</span>
      </div>
    </div>
  `).join(""),Hn(e)}function Hn(e){try{const t=On(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:Q(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:Q(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:Q(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:Q(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:Q(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:Q(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","مصروفات المشروع","Project expenses"),value:`−${Q(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:Q(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:d})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${V(i)}</span>
            <span class="reports-kpi-detail-value">${V(d)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:u.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function On(e){const t=new Set(e.map(E=>String(E.id))),a=S.reservations.filter(E=>E.projectId!=null&&t.has(String(E.projectId)));let s=0,r=0,l=0,i=0,d=0,c=0,p=0;a.forEach(E=>{const N=za(E);s+=N.finalTotal||0,r+=N.equipmentTotal||0,l+=N.crewTotal||0,i+=N.crewCostTotal||0,d+=N.companyShareAmount||0,c+=N.taxAmount||0,p+=N.netProfit||0});const h=e.reduce((E,N)=>E+(Number(N.expensesTotal)||0),0),$=e.reduce((E,N)=>E+(Number(N.raw?.equipmentEstimate)||0),0),b=e.reduce((E,N)=>{const H=N.applyTax===!0,_=(Number(N.raw?.equipmentEstimate)||0)+(Number(N.expensesTotal)||0),ce=H?_*ct:0;return E+ce},0),g=s+$+b,A=r+$,P=c+b,K=p-h;return{grossRevenue:g,companyShareTotal:d,taxTotal:P,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:A,projectExpensesTotal:h,netProfit:K}}function aa(){if(!u.statusChips)return;const e=Yt.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${V(a)}</button>`}).join("");u.statusChips.innerHTML=e,u.statusChips.dataset.listenerAttached||(u.statusChips.addEventListener("click",Vn),u.statusChips.dataset.listenerAttached="true"),gt()}function Vn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(S.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&Yt.forEach(r=>s.add(r)),S.filters.statuses=Array.from(s),gt(),ae()}function gt(){if(!u.statusChips)return;const e=new Set(S.filters.statuses);u.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Un(e){if(!J)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(p=>p.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,p)=>c+p,0)>0?s:[],d={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>fe(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};ze("status",t,d)}function zn(e){if(!J)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(Yn(),{month:"short",year:"numeric"});e.forEach(h=>{if(!h.start||Number.isNaN(h.start.getTime()))return;const $=`${h.start.getFullYear()}-${h.start.getMonth()+1}`,b=a.get($)||{total:0,label:s.format(h.start)};b.total+=h.overallTotal,a.set($,b)});const l=Array.from(a.keys()).sort((h,$)=>{const[b,g]=h.split("-").map(Number),[A,P]=$.split("-").map(Number);return b===A?g-P:b-A}).slice(-12),i=l.map(h=>a.get(h)?.label||h),d=l.map(h=>Math.round(a.get(h)?.total||0)),c=d.length?[{name:n("projects.reports.datasets.value","Total value"),data:d}]:[],p={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:h=>fe(h)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:h=>fe(h)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};ze("timeline",t,p)}function Wn(e){if(!J)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((p,h)=>h.overallTotal-p.overallTotal).slice(0,6),s=a.map(p=>p.title||p.projectCode),r=a.map(p=>Math.round(p.overallTotal)),l=a.map(p=>Math.round(p.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","خدمات إنتاجية (التكلفة)"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:p=>fe(p)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:p=>fe(p)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};ze("expenses",t,c)}function Gn(e){if(!J)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const p=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),h=a.get(p)||0;a.set(p,h+c.overallTotal)});const s=Array.from(a.entries()).sort((c,p)=>p[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],d={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>fe(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>fe(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};ze("clients",t,d)}function ze(e,t,a={}){if(!J||!t)return;if(Be[e]){try{Be[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete Be[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new J(t,s);Be[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function Jn(e){if(!u.table||!u.tableBody||!u.tableEmpty)return;if(!e.length){u.table.style.display="none",u.tableEmpty.classList.add("active"),u.tableMeta&&(u.tableMeta.textContent="");return}u.table.style.display="",u.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=Kn(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${V(a.clientName)} <small class="text-muted">${V(a.clientCompany)}</small>`:V(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${V(a.title||a.projectCode)}</span>
            <small class="text-muted">${V(`#${a.projectCode}`)}</small>
          </div>
        </td>
        <td>${i}</td>
        <td>${V(r)}</td>
        <td>${V(s)}</td>
        <td>${V(Q(a.overallTotal))}</td>
        <td>${V(l)}</td>
      </tr>
    `}).join("");if(u.tableBody.innerHTML=t,u.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");u.tableMeta.textContent=a.replace("{count}",dt(e.length)).replace("{total}",dt(S.totalProjects))}}function Kn(e,t){if(!e&&!t)return"—";const a=e?xt(e.toISOString()):"—",s=t?xt(t.toISOString()):"—";return t?`${a} → ${s}`:a}function Q(e){const t=Number(e)||0,s=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${x(r)} SR`}function dt(e){const a=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return x(new Intl.NumberFormat(a).format(e))}function fe(e){const a=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return x(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function Yn(){return Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function V(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
