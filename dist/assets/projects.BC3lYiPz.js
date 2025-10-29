import{v as la,w as da,x as _t,o as ft,s as D,t as n,l as Bt,n as v,A as ua,e as pa,m as ma,h as fa,i as ha,f as At,g as We}from"./auth.9QCddEPx.js";/* empty css              */import{i as ba}from"./dashboardShell.DhnOkuz-.js";import{d as f,r as Se,a as De,u as Le,s as P,b as ya,f as ht,h as va,i as ga,j as o,k as x,l as ja,m as bt,n as xa,o as $t,e as rt,p as Nt,q as Sa,t as Ta,g as wa,c as Pa,v as Aa,w as qt,x as $a,y as Na,z as Ea,A as Ca,B as ka,C as Da,D as La,E as Fa,F as Ma,G as Ra,H as Ia,I as Ge,J as _a,K as Ht,L as Ba,M as qa}from"./form.C3Ju_ggi.js";import"./customers.Ci7j_Lu-.js";import{g as yt,b as Ha,o as Oe,q as ot,a as Vt,D as it,l as Va}from"./reservationsService.BFxEMAfg.js";import{P as vt,l as gt,n as Et,u as Ot,o as jt,p as Ke,t as Ue,v as Oa,x as Ua,i as za,h as Wa,w as Ga,y as ct,z as lt,e as Ut,A as zt,B as Ka,C as Ja}from"./controller.C_Stwz-r.js";import{a as Ya}from"./calculations.CI7kYldy.js";let Ct=null;function Xa(e){e&&Wt()!==e&&ft({[vt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Wt(){return _t()?.[vt]||""}function Gt(e){e&&dt()!==e&&ft({[gt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function dt(){return _t()?.[gt]||""}function Qa(e){if(!e)return"";const t=e.trim();return t?Object.values(Et).includes(t)?t:Et[t]||"":""}function Za(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Qa(t);if(a)return a}}catch{}return""}function Kt(e,t){!e||!f.tabPanes||!f.tabButtons||(f.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),f.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Xa(e))}function en(){if(!f.tabButtons||!f.tabButtons.length)return;f.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Kt(r,a),r==="projects-section"&&(P.filters.search="",f.search&&(f.search.value=""),Se(),De(),Le()))}),a.dataset.tabListenerAttached="true")});const e=Wt(),t=e&&f.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function xt(e,t){!e||!f.projectSubTabButtons||!f.projectSubTabPanes||(f.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),f.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function tn(){!f.projectSubTabButtons||!f.projectSubTabButtons.length||(f.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(xt(a,e),Gt(a))}),e.dataset.tabListenerAttached="true")}),an())}function an(){const t=Za()||dt();if(!t)return;const a=f.projectSubTabButtons?.[0],s=f.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==dt()&&Gt(r),xt(r,s))}function nn(){return f.tabButtons?f.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function kt(e={}){if(e){if(f.tabButtons&&f.tabButtons.length){const a=f.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[vt];if(s&&s!==a){const r=f.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Kt(s,r)}}if(f.projectSubTabButtons&&f.projectSubTabButtons.length&&nn()){const a=f.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[gt];if(s&&s!==a){const r=f.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&xt(s,r)}}}}function sn(){Ct||(Ct=la(e=>{kt(e)})),da().then(e=>{kt(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function ge(e){const t=P.projects.find(y=>String(y.id)===String(e));if(!t||!f.detailsBody)return;f.detailsBody.dataset.mode="view",f.detailsBody.dataset.projectId=String(t.id);const s=(P.customers.length?P.customers:Bt().customers||[]).find(y=>String(y.id)===String(t.clientId)),r=Qt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),d=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",m=c?v(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),u=s?.email??t.clientEmail??t.customerEmail??"",g=u?String(u).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),F=(t.clientCompany||s?.companyName||"").trim(),C=t.projectCode||`PRJ-${v(String(t.id))}`,B=v(C),N=ht(t.id),te=N.reduce((y,L)=>y+Zt(L),0),k=Number(te.toFixed(2)),A=N.length,{subtotal:O,applyTax:ae,expensesTotal:G}=va(t),pe=Number(t?.servicesClientPrice??t?.services_client_price??0),Fe=O,Te=ae?Number(((Fe+k)*Ue).toFixed(2)):0,me=Number((Fe+k+Te).toFixed(2)),de=ga(t),we=n(`projects.status.${de}`,Oa[de]||de),ne=(()=>{try{const y=t.start?new Date(t.start):null,L=t.end?new Date(t.end):y?new Date(y.getTime()+3600*1e3):null;return!y||!L||Number.isNaN(y.getTime())||Number.isNaN(L.getTime())?!1:P.projects.some(R=>{if(!R||String(R.id)===String(t.id))return!1;const W=R.start?new Date(R.start):null,E=R.end?new Date(R.end):W?new Date(W.getTime()+3600*1e3):null;if(!W||!E||Number.isNaN(W.getTime())||Number.isNaN(E.getTime()))return!1;const I=Math.max(y.getTime(),W.getTime()),se=Math.min(L.getTime(),E.getTime());return I<se})}catch{return!1}})()&&de!=="completed"?"conflict":de,xe={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل",conflict:"تعارض"}[ne]||we,Ye={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed",conflict:"timeline-status-badge timeline-status-badge--conflict"}[ne]||"timeline-status-badge timeline-status-badge--upcoming";ae?n("projects.details.chips.vatOn","شامل الضريبة 15٪"):n("projects.details.chips.vatOff","غير شامل الضريبة"),n("projects.details.chips.reservations","{count} حجوزات").replace("{count}",v(String(A)));const Ae=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",fe=bn(t),b=fe.length>0,h=b?0:Number(t.paidAmount)||0,S=b?0:Number(t.paidPercent)||0;let j=me,T,$,V,q,M,Q,H,K,Me,$e;const Ne=fn(fe),Xe=n("projects.focus.confirmed","✅ مشروع مؤكد"),Re=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(Xe)}</span>`:"";let _=[];if(A>0){const y=N.reduce((qe,ce)=>{const ca=Array.isArray(ce.items)?ce.items:[],Pt=Array.isArray(ce.crewAssignments)?ce.crewAssignments:[],ve=Pt.length?Pt:Array.isArray(ce.technicians)?ce.technicians:[],st=Ha({items:ca,technicianIds:Array.isArray(ve)&&!ve.length?ve:[],crewAssignments:Array.isArray(ve)&&ve.length&&typeof ve[0]=="object"?ve:[],discount:ce.discount??0,discountType:ce.discountType||"percent",applyTax:!1,start:ce.start,end:ce.end,companySharePercent:null});return qe.equipment+=Number(st.equipmentTotal||0),qe.crew+=Number(st.crewTotal||0),qe.crewCost+=Number(st.crewCostTotal||0),qe},{equipment:0,crew:0,crewCost:0}),L=Number(G||0),R=Number((y.equipment+y.crew+pe).toFixed(2)),W=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let I=(t?.discountType==="amount"?"amount":"percent")==="amount"?W:R*(W/100);(!Number.isFinite(I)||I<0)&&(I=0),I>R&&(I=R);const se=ae===!0,be=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",Y=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ye=be&&Y>0?Y:0,oe=Math.max(0,R-I),ie=Number((oe*(ye/100)).toFixed(2)),ue=se?Number(((oe+ie)*Ue).toFixed(2)):0,Ce=Number((oe+ie+ue).toFixed(2)),ia=Number((Ce-ie-ue-L-y.crewCost).toFixed(2));y.equipment>0&&_.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:x(y.equipment)}),y.crew>0&&_.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:x(y.crew)}),y.crewCost>0&&_.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:x(y.crewCost)}),L>0&&_.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:x(L)}),pe>0&&_.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:x(pe)}),I>0&&_.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${x(I)}`}),_.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:x(oe)}),ie>0&&_.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${x(ie)}`}),ue>0&&_.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${x(ue)}`}),_.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:x(ia)}),_.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:x(Ce)}),j=Ce}else{const y=Number(G||0),L=Math.max(0,Number(pe)||0),R=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let E=(t?.discountType==="amount"?"amount":"percent")==="amount"?R:L*(R/100);(!Number.isFinite(E)||E<0)&&(E=0),E>L&&(E=L);const I=Math.max(0,L-E),se=ae===!0,be=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",Y=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ye=be&&Y>0?Y:0,oe=Number((I*(ye/100)).toFixed(2)),ie=se?Number(((I+oe)*Ue).toFixed(2)):0,ue=Number((I+oe+ie).toFixed(2)),Ce=Number((ue-oe-ie-y).toFixed(2));_=[],_.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:x(L)}),E>0&&_.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${x(E)}`}),_.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:x(I)}),oe>0&&_.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${x(oe)}`}),ie>0&&_.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${x(ie)}`}),_.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:x(Ce)}),_.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:x(ue)}),j=ue}T=Oe({totalAmount:j,paidAmount:h,paidPercent:S,history:fe}),$=ot({manualStatus:Ae||"unpaid",paidAmount:T.paidAmount,paidPercent:T.paidPercent,totalAmount:j}),V=n(`projects.paymentStatus.${$}`,$==="paid"?"Paid":$==="partial"?"Partial":"Unpaid"),q=$==="paid"?"status-paid":$==="partial"?"status-partial":"status-unpaid",M=Number.isFinite(Number(T.paidAmount))?Number(T.paidAmount):0,Q=Number.isFinite(Number(T.paidPercent))?Number(T.paidPercent):0,H=Math.max(0,Number((j-M).toFixed(2))),K=x(M),Me=`${v(Q.toFixed(2))}%`,$e=x(H);const Qe=_.map(({icon:y,label:L,value:R})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${y} ${o(L)}</span>
      <span class="summary-details-value">${o(R)}</span>
    </div>
  `).join(""),Ie=n("projects.details.labels.code","رقم المشروع"),Ze=`
    <div class="project-details-code-badge" title="${o(Ie)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Ie)}
      </span>
      <span class="project-details-code-badge__value">${o(B)}</span>
    </div>
  `,et=[{icon:"👤",label:n("projects.details.client","العميل"),value:d},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:m},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:g},F?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:F}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:r},Lt("start",t.start),Lt("end",t.end)].filter(Boolean),tt=n("projects.details.overview.heading","معلومات المشروع"),Ee=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(tt)}</h6>
      <ul class="project-details-outline__list">
        ${et.map(({icon:y,label:L,value:R,meta:W})=>`
          <li>
            <span class="project-details-outline__label">${o(y)} ${o(L)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${o(R)}</span>
              ${W?`<span class="project-details-outline__meta">${o(W)}</span>`:""}
            </span>
          </li>
        `).join("")}
      </ul>
    </div>
  `,_e=A>0?n("projects.details.chips.linkedReservation","مربوط بحجز"):n("projects.details.chips.notLinkedReservation","غير مربوط بحجز"),at=A>0?"reservation-chip status-confirmed":"reservation-chip status-info",z=[`<span class="${Ye}">${o(xe)}</span>`,`<span class="${at}">${o(_e)}</span>`,`<span class="reservation-chip ${q}">${o(V)}</span>`,Re].filter(Boolean).join(""),nt=n("projects.details.expensesTotal","تكلفة الخدمات الإنتاجية"),Be=n("projects.details.reservationsTotal","إجمالي الحجوزات"),he=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",x(G)),Z=rn(Array.isArray(t.expenses)?t.expenses:[]);f.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${z}</div>
        </div>
        <div class="project-details-header__code">
          ${Ze}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${Ee}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(n("projects.details.summary.title","الملخص المالي"))}</h6>
            ${Qe}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.description","وصف المشروع"))}</h5>
      <p class="project-details-description">${o(i)}</p>
    </section>
    <section class="project-details-section">
      <h5>${o(he)}</h5>
      ${Z}
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.financialBreakdown","تفاصيل مالية"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(nt)}</span>
          <strong>${x(G)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(Be)}</span>
          <strong>${x(k)}</strong>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("reservations.paymentHistory.title","سجل الدفعات"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.total","الإجمالي الكلي"))}</span>
          <strong>${o(x(j))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.paid","المدفوع"))}</span>
          <strong>${o(K)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(Me)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o($e)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${Ne}
      </div>
    </section>
    ${ja(t)}
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
  `,ln(t);const J=f.detailsBody.querySelector("#project-details-export-btn");J&&J.addEventListener("click",async y=>{if(y.preventDefault(),J.blur(),!J.disabled){J.disabled=!0;try{await Ua({project:t})}catch(L){console.error("❌ [projects/details] export project PDF failed",L),D(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{J.disabled=!1}}}),f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl).show()}function rn(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
      <div class="table-responsive">
        <table class="table table-sm table-hover align-middle project-services-table">
          <thead class="table-light">
            <tr>
              <th>${o(n("projects.expenses.table.headers.service","الخدمة"))}</th>
              <th>${o(n("projects.expenses.table.headers.cost","التكلفة (SR)"))}</th>
              <th>${o(n("projects.expenses.table.headers.sale","سعر البيع (SR)"))}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="3" class="text-center text-muted">${s}</td></tr>
          </tbody>
        </table>
      </div>
    `}const a=e.map(s=>{const r=o(s?.label||""),l=x(Number(s?.amount)||0),i=x(Number(s?.sale_price??s?.salePrice??0));return`
      <tr>
        <td>${r}</td>
        <td>${o(l)}</td>
        <td>${o(i)}</td>
      </tr>`}).join("");return`
    <div class="table-responsive">
      <table class="table table-sm table-hover align-middle project-services-table">
        <thead class="table-light">
          <tr>
            <th>${o(n("projects.expenses.table.headers.service","الخدمة"))}</th>
            <th>${o(n("projects.expenses.table.headers.cost","التكلفة (SR)"))}</th>
            <th>${o(n("projects.expenses.table.headers.sale","سعر البيع (SR)"))}</th>
          </tr>
        </thead>
        <tbody>${a}</tbody>
      </table>
    </div>
  `}function on({onOpenProject:e}){!f.focusCards||f.focusCards.dataset.listenerAttached==="true"||(f.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),un(l);return}r==="view"?e?.(l):r==="highlight"&&cn(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),f.focusCards.dataset.listenerAttached="true")}function cn(e){if(!f.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=f.projectsTableBody.querySelector(t);if(!a){D(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function ln(e){if(!f.detailsBody)return;const t=f.detailsBody.querySelector('[data-action="create-reservation"]'),a=f.detailsBody.querySelector('[data-action="edit-project"]'),s=f.detailsBody.querySelector('[data-action="delete-project"]'),r=f.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(ht(e.id)||[]).some(d=>{const c=String(d?.status||d?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ المشروع مربوط بحجز مسبقاً"),t.addEventListener("click",d=>{d.preventDefault(),D(n("projects.details.reservations.createDisabledToast","⚠️ المشروع مربوط بحجز مسبقاً"))})):(t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",d=>{d.preventDefault(),Dt(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),Dt(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),Jt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await xa(e.id),!P.projects.some(c=>String(c.id)===String(e.id))&&f.detailsModalEl&&window.bootstrap?.Modal.getInstance(f.detailsModalEl)?.hide()}finally{P.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const d=Wa("showReservationDetails");if(typeof d=="function")return d(i),!0;try{const c=await Ga("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const d=i.target.closest('[data-action="view-reservation"]');if(!d)return;const c=d.dataset.index||d.dataset.reservationIndex,m=Number.parseInt(c||"-1",10);if(!Number.isInteger(m)||m<0)return;await l(m)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const d=i.target.closest('[data-action="view-reservation"]');d&&(i.preventDefault(),d.click())})}}function Jt(e){if(!e||!f.detailsBody)return;const t=P.projects.find(u=>String(u.id)===String(e.id));if(!t)return;const a=P.customers.find(u=>String(u.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const s=Array.isArray(t.expenses)?t.expenses.map((u,g)=>({id:u?.id||`expense-${t.id}-${g}-${Date.now()}`,label:u?.label||"",amount:Number(u?.amount)||0,salePrice:Number.isFinite(Number(u?.sale_price??u?.salePrice))?Number(u?.sale_price??u?.salePrice):0})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((u,g)=>({type:u?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(u?.amount))?Number(u.amount):null,percentage:Number.isFinite(Number(u?.percentage))?Number(u.percentage):null,value:Number.isFinite(Number(u?.value))?Number(u.value):null,note:u?.note??null,recordedAt:u?.recordedAt??u?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${g}`})):[],l=r.reduce((u,g)=>u+(Number(g?.amount)||0),0),i=r.reduce((u,g)=>u+(Number(g?.percentage)||0),0),d=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,c=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(d>0||c>0)){const u=t.updatedAt??t.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(d)&&d>0?d:null,percentage:c,value:c,note:null,recordedAt:u,key:`legacy-payment-${t.id}-percent`}]:d>0&&(r=[{type:"amount",amount:d,percentage:null,value:d,note:null,recordedAt:u,key:`legacy-payment-${t.id}-amount`}]),l=r.reduce((g,F)=>g+(Number(F?.amount)||0),0),i=r.reduce((g,F)=>g+(Number(F?.percentage)||0),0),d=0,c=0}l>0&&Math.abs(d-l)<.01&&(d=0),i>0&&Math.abs(c-i)<.01&&(c=0);const m={expenses:s,payments:r,basePaidAmount:d,basePaidPercent:c};f.detailsBody.dataset.mode="edit",f.detailsBody.innerHTML=pn(t,m),dn(t,m)}function dn(e,t={expenses:[]}){const a=f.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",b=>{b.preventDefault(),ge(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),d=a.querySelector('[data-action="add-expense"]'),c=a.querySelector("#project-edit-expense-list"),m=a.querySelector('[name="project-start-date"]'),u=a.querySelector('[name="project-start-time"]'),g=a.querySelector('[name="project-end-date"]'),F=a.querySelector('[name="project-end-time"]'),C=a.querySelector('[name="project-payment-status"]'),B=a.querySelector("#project-edit-tax"),N=a.querySelector("#project-edit-company-share"),te=a.querySelector("#project-edit-discount"),k=a.querySelector("#project-edit-discount-type"),A=a.querySelector("#project-edit-payment-progress-type"),O=a.querySelector("#project-edit-payment-progress-value"),ae=a.querySelector("#project-edit-payment-add"),G=a.querySelector("#project-edit-payment-history"),pe=a.querySelector("#project-edit-payment-summary"),Fe=n("reservations.create.summary.currency","SR");let Te=!1;const me=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),de=()=>{const b=Number(e.equipmentEstimate)||0,h=Array.isArray(t.expenses)?t.expenses.reduce((H,K)=>H+(Number(K.amount)||0),0):0,S=Array.isArray(t.expenses)?Math.max(0,Math.round(t.expenses.reduce((H,K)=>H+Number(K?.salePrice??0),0)*100)/100):Math.max(0,Number(e?.servicesClientPrice??0)),j=k?.value==="amount"?"amount":"percent",T=v(te?.value||"0");let $=Number.parseFloat(T);(!Number.isFinite($)||$<0)&&($=0);const V=B?.checked===!0,q=N?.checked===!0;let M=q?wa(N):null;(!Number.isFinite(M)||M<=0)&&(M=q?it:null);const Q=Pa({equipmentEstimate:b,expensesTotal:h,servicesClientPrice:S,discountValue:$,discountType:j,applyTax:V,companyShareEnabled:q,companySharePercent:M});return{equipmentEstimate:b,expensesTotal:h,discountValue:$,discountTypeValue:j,applyTax:V,companyShareEnabled:q,companySharePercent:M,servicesClientPrice:S,finance:Q}},we=()=>{const b=de(),h=me(),j=(ht(e.id)||[]).reduce((M,Q)=>M+(Number(Q?.totalAmount)||Zt(Q)||0),0),T=Number(b.finance?.taxableAmount||0),$=b.applyTax?Number(((T+j)*Ue).toFixed(2)):0,V=Number((T+j+$).toFixed(2)),q=Oe({totalAmount:V,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:h});return{...b,combinedTotalWithTax:V,payments:h,progress:q}},wt=()=>{G&&(G.innerHTML=hn(me()))},ne=()=>{if(!pe)return;const{combinedTotalWithTax:b,progress:h}=we(),S=Number.isFinite(Number(b))?Number(b):0,j=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,T=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,$=Math.max(0,Math.round((S-j)*100)/100),V=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:x(S)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:x(j)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${v(T.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:x($)}];pe.innerHTML=V.map(({label:q,value:M})=>`
        <div class="project-details-grid-item">
          <span>${o(q)}</span>
          <strong>${o(M)}</strong>
        </div>
      `).join("")},le=(b="auto")=>{if(!C)return;const h=C.dataset?.userSelected==="true";if(b==="auto"&&h)return;const{finance:S,progress:j}=we(),T=ot({manualStatus:h?C.value:e.paymentStatus||"unpaid",paidAmount:j.paidAmount,paidPercent:j.paidPercent,totalAmount:S.totalWithTax});h||(C.value=T)},xe=()=>{wt(),ne(),le("auto")},Pe=1e-4,Ye=()=>{const b=A?.value==="amount"?"amount":"percent",h=v(O?.value||"").replace("%","").trim();let S=Number.parseFloat(h);if(!Number.isFinite(S)||S<=0){D(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),O?.focus();return}const j=we(),T=Number.isFinite(Number(j.finance.totalWithTax))?Number(j.finance.totalWithTax):0;if(T<=0){D(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const $=Number(j.progress.paidAmount)||0,V=Number(j.progress.paidPercent)||0;let q=null,M=null;if(b==="percent"){const H=Math.max(0,100-V);if(H<=Pe){D(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(S>H){S=H;const K=v(S.toFixed(2));D(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",K))}M=Math.round(S*100)/100,T>0&&(q=Math.round(M/100*T*100)/100)}else{const H=Math.max(0,T-$);if(H<=Pe){D(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(S>H){S=H;const K=`${v(S.toFixed(2))} ${Fe}`;D(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",K))}q=Math.round(S*100)/100,T>0&&(M=Math.round(q/T*100*100)/100)}const Q={type:b,amount:q??null,percentage:M??null,value:b==="amount"?q:M,note:null,recordedAt:new Date().toISOString()};t.payments=[...me(),Q],O&&(O.value=""),A&&(A.value="percent"),xe(),D(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},Ae=b=>{!B||!N||Te||(Te=!0,b==="share"?N.checked?(B.checked||(B.checked=!0),rt(N)):B.checked&&(B.checked=!1):b==="tax"&&(B.checked?rt(N):N.checked&&(N.checked=!1)),Te=!1)};function fe(){c&&(c.innerHTML=Yt(t.expenses))}fe(),xe(),te&&!te.dataset.listenerAttached&&(te.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=v(h.value||""),ne(),le("auto"))}),te.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=v(h.value||""))}),i.dataset.listenerAttached="true"),k&&!k.dataset.listenerAttached&&(k.addEventListener("change",()=>{ne(),le("auto")}),k.dataset.listenerAttached="true"),O&&!O.dataset.listenerAttached&&(O.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=v(h.value||""))}),O.dataset.listenerAttached="true"),C&&!C.dataset.listenerAttached&&(C.addEventListener("change",()=>{C.dataset.userSelected="true"}),C.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=v(h.value||""))}),l.dataset.listenerAttached="true"),N&&!N.dataset.listenerAttached&&(N.addEventListener("change",()=>{Ae("share"),ne(),le("auto")}),N.dataset.listenerAttached="true"),B&&!B.dataset.listenerAttached&&(B.addEventListener("change",()=>{Ae("tax"),ne(),le("auto")}),B.dataset.listenerAttached="true"),N?.checked&&rt(N),Ae(N?.checked?"share":"tax"),ne(),le("auto"),d&&d.addEventListener("click",b=>{b.preventDefault();const h=r?.value.trim()||"",S=v(l?.value||"0"),j=Number(S),T=v(i?.value||"0"),$=Number(T);if(!h){D(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(j)||j<=0){D(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:h,amount:j,salePrice:Number.isFinite($)&&$>0?$:0}),r&&(r.value=""),l&&(l.value=""),i&&(i.value=""),fe(),ne(),le("auto")}),c&&c.addEventListener("click",b=>{const h=b.target.closest('[data-action="remove-expense"]');if(!h)return;const{id:S}=h.dataset;t.expenses=t.expenses.filter(j=>String(j.id)!==String(S)),fe(),ne(),le("auto")}),ae&&!ae.dataset.listenerAttached&&(ae.addEventListener("click",b=>{b.preventDefault(),Ye()}),ae.dataset.listenerAttached="true"),G&&!G.dataset.listenerAttached&&(G.addEventListener("click",b=>{const h=b.target.closest('[data-action="remove-payment"]');if(!h)return;const S=Number.parseInt(h.dataset.index||"-1",10);if(!Number.isInteger(S)||S<0)return;const j=me();if(S>=j.length)return;const T=j.filter(($,V)=>V!==S);t.payments=T,xe(),D(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),G.dataset.listenerAttached="true"),a.addEventListener("submit",async b=>{if(b.preventDefault(),a.dataset.submitting==="true")return;const h=a.querySelector('[name="project-title"]'),S=a.querySelector('[name="project-type"]'),j=a.querySelector('[name="project-description"]'),T=h?.value.trim()||"",$=S?.value||"",V=m?.value.trim()||"",q=u?.value.trim()||"",M=j?.value.trim()||"",Q=(C?.value||"unpaid").toLowerCase(),H=["paid","partial"].includes(Q)?Q:"unpaid";if(!T||!$||!V){D(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),h?.focus();return}const K=g?.value.trim()||"",Me=F?.value.trim()||"",$e=Nt(V,q),Ne=K?Nt(K,Me):"",Xe=new Date($e),Re=Ne?new Date(Ne):null;if(Re&&Xe>Re){D(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),g?.focus();return}if(P.projects.findIndex(E=>String(E.id)===String(e.id))===-1){D(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Qe=de(),{equipmentEstimate:Ie,servicesClientPrice:Ze,discountValue:et,discountTypeValue:tt,applyTax:Ee,companyShareEnabled:_e,companySharePercent:at,finance:z}=Qe,nt=A?.value==="amount"?"amount":"percent",Be=v(O?.value||"");let he=Be?Number.parseFloat(Be):null,Z=[...me()];if(Number.isFinite(he)&&he>0&&Number.isFinite(Number(z.totalWithTax))){const E=Oe({totalAmount:z.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:Z}),I=new Date().toISOString();if(nt==="percent"){const se=Math.max(0,100-(E.paidPercent||0));if(se>Pe){const be=Math.min(he,se),Y=Math.round(be*100)/100,ye=z.totalWithTax>0?Math.round(Y/100*z.totalWithTax*100)/100:null;Z=[...Z,{type:"percent",amount:ye,percentage:Y,value:Y,note:null,recordedAt:I}]}}else{const se=Math.max(0,z.totalWithTax-(E.paidAmount||0));if(se>Pe){const be=Math.min(he,se),Y=Math.round(be*100)/100,ye=z.totalWithTax>0?Math.round(Y/z.totalWithTax*100*100)/100:null;Z=[...Z,{type:"amount",amount:Y,percentage:ye,value:Y,note:null,recordedAt:I}]}}Z!==t.payments&&(t.payments=Z,xe()),O&&(O.value=""),A&&(A.value="percent"),he=null}const J=Oe({totalAmount:z.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:Z}),y=C?.dataset?.userSelected==="true",L=ot({manualStatus:y?H:e.paymentStatus||H,paidAmount:J.paidAmount,paidPercent:J.paidPercent,totalAmount:z.totalWithTax}),R=y?H:L;!y&&C&&(C.value=R),C?.dataset&&delete C.dataset.userSelected,t.payments=Z;const W=za({projectCode:e.projectCode,title:T,type:$,clientId:e.clientId,clientCompany:e.clientCompany,description:M,start:$e,end:Ne||null,applyTax:Ee,paymentStatus:R,equipmentEstimate:Ie,expenses:t.expenses,servicesClientPrice:Ze,discount:et,discountType:tt,companyShareEnabled:_e&&Ee,companySharePercent:_e&&Ee?at:null,companyShareAmount:z.companyShareAmount,taxAmount:z.taxAmount,totalWithTax:z.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:Sa(e),paidAmount:J.paidAmount,paidPercentage:J.paidPercent,paymentProgressType:J.paymentProgressType,paymentProgressValue:J.paymentProgressValue,payments:Z});a.dataset.submitting="true";try{const E=await Ot(e.projectId??e.id,W),I=E?.projectId??E?.id??e.id;await Ta(I,R),P.projects=jt(),P.reservations=yt(),D(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),Se(),De(),Le(),ge(e.id)}catch(E){console.error("❌ [projects] Failed to update project from details view",E);const I=Ke(E)?E.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");D(I,"error")}finally{delete a.dataset.submitting}})}function Dt(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description,fromProjectForm:!0,draftStorageKey:"projects:create:draft",returnUrl:`projects.html?project=${encodeURIComponent(e.id)}&linked=1#projects-section`};ft({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function un(e){if(!e)return;const t=P.projects.find(a=>String(a.id)===String(e));if(!t){D(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){D(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Ot(t.projectId??t.id,{confirmed:!0});const a=await ya(e);P.projects=jt(),P.reservations=yt(),Se(),De(),Le(),f.detailsModalEl&&f.detailsModalEl.classList.contains("show")&&f.detailsBody?.dataset.projectId===String(e)&&ge(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),D(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=Ke(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");D(s,"error")}}function pn(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=$t(e.start||""),{date:r,time:l}=$t(e.end||""),i=e.applyTax===!0||e.applyTax==="true";typeof e.paymentStatus=="string"&&e.paymentStatus.toLowerCase();const d=e.discountType==="amount"?"amount":"percent",c=v(String(e.discount??e.discountValue??0));v(String(e.servicesClientPrice??e.services_client_price??0));const m=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??it,u=Number.parseFloat(v(String(m))),g=Number.isFinite(u)&&u>0?u:it,F=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(u)&&u>0;return`
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${o(n("projects.form.labels.title","عنوان المشروع"))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${o(e.title||"")}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${o(n("projects.form.labels.type","نوع المشروع"))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${mn(e.type)}
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
        <!-- Payment status select removed: status is inferred automatically from payments -->
      </div>

      <!-- Services block placed directly under project description -->
      <section class="project-edit-expenses mt-4">
        <h6 class="mb-2">${o(n("projects.form.labels.expenseLabel","خدمات إنتاجية"))}</h6>
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
            <button type="button" class="modal-action-btn modal-action-btn--warning project-edit-add-btn" data-action="add-expense">${o(n("projects.form.buttons.addExpense","➕ إضافة خدمة"))}</button>
          </div>
        </div>
        <div id="project-edit-expense-list" class="project-edit-expense-list mt-3">
          ${Yt(t.expenses)}
        </div>
      </section>

      <!-- Services block placed directly under project description -->
      

      <div class="row g-3 align-items-start mt-1">
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label" for="project-edit-discount">${o(n("projects.form.labels.discount","الخصم"))}</label>
          <div class="input-group project-edit-input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select project-edit-select-xs">
              <option value="percent" ${d==="percent"?"selected":""}>${o(n("projects.form.discount.percent","٪ نسبة"))}</option>
              <option value="amount" ${d==="amount"?"selected":""}>${o(n("projects.form.discount.amount","💵 مبلغ"))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control project-edit-input-xs" value="${o(c)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label d-block" for="project-edit-company-share">${o(n("projects.form.labels.companyShare","نسبة الشركة والضريبة"))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(g))}" ${F?"checked":""}>
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


      <div class="project-edit-actions mt-4 d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">${o(n("projects.form.buttons.update","تحديث المشروع"))}</button>
        <button type="button" class="btn btn-outline-secondary" data-action="cancel-edit">${o(n("actions.cancel","إلغاء"))}</button>
      </div>
    </form>
  `}function mn(e){return["commercial","coverage","photography","social"].map(a=>{const s=Qt(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(s)}</option>`}).join("")}function Yt(e=[]){if(!Array.isArray(e)||e.length===0){const i=o(n("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"));return`
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
            <tr><td colspan="4" class="text-center text-muted">${i}</td></tr>
          </tbody>
        </table>
      </div>`}const t=o(n("actions.remove","إزالة")),a=e.map(i=>{const d=o(i?.label||""),c=o(x(i?.amount||0)),m=o(x(i?.salePrice||i?.sale_price||0)),u=o(String(i?.id||""));return`
      <tr>
        <td>${d}</td>
        <td>${c}</td>
        <td>${m}</td>
        <td><button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${u}" aria-label="${t}">✖</button></td>
      </tr>`}).join(""),s=e.reduce((i,d)=>i+(Number(d?.salePrice??d?.sale_price)||0),0),r=o(x(s)),l=o(n("projects.expenses.table.totalSale","مجموع سعر البيع"));return`
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
        <tfoot>
          <tr>
            <th colspan="2" class="text-end">${l}</th>
            <th>${r}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>`}function fn(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(x(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${v(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?v(bt(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(v(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function hn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(x(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${v(Number(a.percentage).toFixed(2))}%`:"—",d=a?.recordedAt?v(bt(a.recordedAt)):"—",c=a?.note?o(v(a.note)):"",m=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
      <tr>
        <td>${o(r)}</td>
        <td>${l}</td>
        <td>${i}</td>
        <td>${d}</td>
        <td>${c}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${s}" aria-label="${m}">🗑️</button>
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
  `}function bn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(yn).filter(Boolean);if(a.length>0)return a;const s=ze(e.paidPercent??e.paid_percent),r=ze(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Xt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function yn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=ze(e.amount??(a==="amount"?e.value:null)),r=ze(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,d=Xt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:d}}function ze(e){if(e==null||e==="")return null;const t=v(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Xt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Lt(e,t){if(!t)return null;const{date:a,time:s}=vn(bt(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية الحجز"):n("projects.details.labels.end","نهاية الحجز");return{icon:l,label:i,value:a,meta:s}}function vn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Qt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function Zt(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(v(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Vt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(v(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function St(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function gn(){return St(ct)}function jn(){return St(lt)}function xn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[ct,lt,"linked"].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let m=!1;[ct,lt,"linked"].forEach(u=>{c.has(u)&&(c.delete(u),m=!0)}),m&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),d=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",d)}catch{}}function Sn(){const e=gn(),t=jn(),a=St("linked");e&&(P.pendingProjectDetailId=e),t&&(P.pendingProjectEditId=t,P.pendingProjectDetailId||(P.pendingProjectDetailId=t)),a!=null&&String(a)!==""&&String(a)!=="0"&&String(a).toLowerCase()!=="false"&&(P.pendingLinkedToast=!0),(e||t)&&xn()}function Tn(){if(!P.pendingProjectDetailId)return;const e=P.pendingProjectDetailId,t=String(e),a=P.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;P.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(ge(s),P.pendingLinkedToast){P.pendingLinkedToast=!1;try{D(n("projects.toast.linkedReservationCreated","✅ تم ربط الحجز بالمشروع"))}catch{}}if(P.pendingProjectEditId!=null){const r=String(P.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&(P.pendingProjectEditId=null,setTimeout(()=>Jt(a),0))}}function wn(){document.addEventListener("DOMContentLoaded",()=>{sn(),Sn(),Aa(),qt(),$a(),en(),tn(),Na(),Ea(),Ca(),ka(),Da(),La(),Fa({onViewDetails:ge}),on({onOpenProject:ge}),Ma(),Pn()}),document.addEventListener("language:changed",Ft),document.addEventListener("language:translationsReady",Ft),document.addEventListener("customers:changed",An),document.addEventListener("technicians:updated",$n),document.addEventListener("reservations:changed",()=>Ra(ge)),document.addEventListener(ua.USER_UPDATED,()=>{Se()})}async function Pn(){try{await Ut({suppressError:!0}),await zt()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");D(t,"error")}finally{Ia(),Ge(),_a(),Ht(),Se(),Le(),De(),Tn()}}function Ft(){Ge(),Ht(),Se(),Le(),De(),qt()}function An(){Ba(),Ge()}function $n(){qa(),Ge()}pa();ma();fa();Ka();wn();document.addEventListener("DOMContentLoaded",()=>{ba(),ha()});const ut=.15,He={},Nn="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let ke=0;const w={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Ve=Object.freeze({projects:`
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
  `});let X=null;const ea=["upcoming","ongoing","completed"];async function En({forceProjects:e=!1}={}){try{await Ut({suppressError:!0}),await Ja({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),Ke(t)&&console.warn("Projects API error:",t.message)}sa()}async function Cn(){Ln(),aa(),await kn();try{await En({forceProjects:!0}),oa(),Bn(),re()}finally{na()}document.addEventListener("language:changed",Hn),document.addEventListener("projects:changed",()=>{pt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{pt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",Vn)}document.addEventListener("DOMContentLoaded",Cn);async function kn(){if(X)return X;if(typeof window>"u")return null;if(window.ApexCharts)return X=window.ApexCharts,X;try{await Dn(Nn),X=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),X=null}return X}function Dn(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function Ln(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function ta(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function aa(){ke+=1,ke===1&&ta(!0)}function na(){ke=Math.max(0,ke-1),ke===0&&ta(!1)}function sa(){const{customers:e=[]}=Bt();w.customers=Array.isArray(e)?e:[],w.reservations=yt();const t=new Map(w.customers.map(s=>[String(s.id),s])),a=jt();w.projects=Array.isArray(a)?a.map(s=>Fn(s,t)):[],w.totalProjects=w.projects.length}function Fn(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=Mn(e.id),l=r.reduce((te,k)=>te+Rn(k),0),i=In(e),d=Number(e?.equipmentEstimate)||0,c=Number((d+i).toFixed(2)),m=e?.applyTax===!0||e?.applyTax==="true",u=m?Number((c*ut).toFixed(2)):0,g=m?Number(((c+l)*ut).toFixed(2)):0,F=Number((c+l+g).toFixed(2)),C=_n(e),B=e.start?new Date(e.start):null,N=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:B,end:N,applyTax:m,status:C,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:u,combinedTaxAmount:g,overallTotal:F,unpaidValue:a==="paid"?0:F,reservationsCount:r.length}}function Mn(e){return Array.isArray(w.reservations)?w.reservations.filter(t=>String(t.projectId)===String(e)):[]}function Rn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(v(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Vt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(v(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function In(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function _n(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function Bn(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{w.filters.search=p.search.value.trim(),re()},180)})}p.payment&&(p.payment.value=w.filters.payment,p.payment.addEventListener("change",()=>{w.filters.payment=p.payment.value||"all",re()})),p.dateRange&&(p.dateRange.addEventListener("change",qn),p.dateRange.value=w.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{w.filters.startDate=p.startDate.value,w.filters.range==="custom"&&re()}),p.endDate&&p.endDate.addEventListener("change",()=>{w.filters.endDate=p.endDate.value,w.filters.range==="custom"&&re()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(w.filters.range!=="custom"){re();return}w.filters.startDate=p.startDate?.value||"",w.filters.endDate=p.endDate?.value||"",re()})}function qn(e){const t=e.target.value;w.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),w.filters.startDate="",w.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),re())}async function pt(){aa();try{await Promise.all([zt(),Va()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),Ke(e)&&console.warn("Projects API error:",e.message)}finally{sa(),re(),na()}}function Hn(){oa(),re()}function Vn(e){e.key&&!["projects","reservations","customers"].includes(e.key)||pt().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function re(){const e=On();Tt(),Wn(e),Yn(e),Xn(e),Qn(e),Zn(e),es(e)}function On(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=w.filters,i=ra(e),d=new Date,c=Number(s);let m=null;if(s==="custom"){m=r?new Date(r):null;const u=l?new Date(l):null;return w.projects.filter(g=>!Mt(g,t)||!Rt(g,a)||!It(g,i)?!1:zn(g.start,m,u))}return s!=="all"&&Number.isFinite(c)&&(m=new Date,m.setDate(d.getDate()-c)),w.projects.filter(u=>!Mt(u,t)||!Rt(u,a)||!It(u,i)?!1:s==="all"?!0:Un(u.start,m,d))}function Mt(e,t){return t.includes(e.status)}function Rt(e,t){return t==="all"?!0:e.paymentStatus===t}function It(e,t){return t?ra([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function Un(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function zn(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function ra(e){return e?v(String(e)).toLowerCase().trim():""}function Wn(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((i,d)=>i+d.overallTotal,0),s=e.reduce((i,d)=>i+d.unpaidValue,0),r=e.reduce((i,d)=>i+d.expensesTotal,0),l=[{icon:Ve.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:mt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Ve.value,label:n("projects.reports.kpi.totalValue","Total value"),value:ee(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Ve.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:ee(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Ve.expenses,label:n("projects.reports.kpi.expenses","تكلفة الخدمات الإنتاجية"),value:ee(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];p.kpiGrid.innerHTML=l.map(({icon:i,label:d,value:c,meta:m})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${U(d)}</p>
        <p class="reports-kpi-value">${U(c)}</p>
        <span class="reports-kpi-meta">${U(m)}</span>
      </div>
    </div>
  `).join(""),Gn(e)}function Gn(e){try{const t=Kn(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:ee(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:ee(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:ee(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:ee(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:ee(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:ee(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","تكلفة الخدمات الإنتاجية","Project expenses"),value:`−${ee(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:ee(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:d})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${U(i)}</span>
            <span class="reports-kpi-detail-value">${U(d)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:p.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function Kn(e){const t=new Set(e.map(k=>String(k.id))),a=w.reservations.filter(k=>k.projectId!=null&&t.has(String(k.projectId)));let s=0,r=0,l=0,i=0,d=0,c=0,m=0;a.forEach(k=>{const A=Ya(k);s+=A.finalTotal||0,r+=A.equipmentTotal||0,l+=A.crewTotal||0,i+=A.crewCostTotal||0,d+=A.companyShareAmount||0,c+=A.taxAmount||0,m+=A.netProfit||0});const u=e.reduce((k,A)=>k+(Number(A.expensesTotal)||0),0),g=e.reduce((k,A)=>k+(Number(A.raw?.equipmentEstimate)||0),0),F=e.reduce((k,A)=>{const O=A.applyTax===!0,ae=(Number(A.raw?.equipmentEstimate)||0)+(Number(A.expensesTotal)||0),G=O?ae*ut:0;return k+G},0),C=s+g+F,B=r+g,N=c+F,te=m-u;return{grossRevenue:C,companyShareTotal:d,taxTotal:N,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:B,projectExpensesTotal:u,netProfit:te}}function oa(){if(!p.statusChips)return;const e=ea.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${U(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",Jn),p.statusChips.dataset.listenerAttached="true"),Tt()}function Jn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(w.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&ea.forEach(r=>s.add(r)),w.filters.statuses=Array.from(s),Tt(),re()}function Tt(){if(!p.statusChips)return;const e=new Set(w.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Yn(e){if(!X)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(m=>m.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,m)=>c+m,0)>0?s:[],d={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>je(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};Je("status",t,d)}function Xn(e){if(!X)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(as(),{month:"short",year:"numeric"});e.forEach(u=>{if(!u.start||Number.isNaN(u.start.getTime()))return;const g=`${u.start.getFullYear()}-${u.start.getMonth()+1}`,F=a.get(g)||{total:0,label:s.format(u.start)};F.total+=u.overallTotal,a.set(g,F)});const l=Array.from(a.keys()).sort((u,g)=>{const[F,C]=u.split("-").map(Number),[B,N]=g.split("-").map(Number);return F===B?C-N:F-B}).slice(-12),i=l.map(u=>a.get(u)?.label||u),d=l.map(u=>Math.round(a.get(u)?.total||0)),c=d.length?[{name:n("projects.reports.datasets.value","Total value"),data:d}]:[],m={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:u=>je(u)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:u=>je(u)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("timeline",t,m)}function Qn(e){if(!X)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((m,u)=>u.overallTotal-m.overallTotal).slice(0,6),s=a.map(m=>m.title||m.projectCode),r=a.map(m=>Math.round(m.overallTotal)),l=a.map(m=>Math.round(m.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","تكلفة الخدمات الإنتاجية"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:m=>je(m)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:m=>je(m)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("expenses",t,c)}function Zn(e){if(!X)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const m=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),u=a.get(m)||0;a.set(m,u+c.overallTotal)});const s=Array.from(a.entries()).sort((c,m)=>m[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],d={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>je(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>je(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("clients",t,d)}function Je(e,t,a={}){if(!X||!t)return;if(He[e]){try{He[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete He[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new X(t,s);He[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function es(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=ts(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${U(a.clientName)} <small class="text-muted">${U(a.clientCompany)}</small>`:U(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${U(a.title||a.projectCode)}</span>
            <small class="text-muted">${U(`#${a.projectCode}`)}</small>
          </div>
        </td>
        <td>${i}</td>
        <td>${U(r)}</td>
        <td>${U(s)}</td>
        <td>${U(ee(a.overallTotal))}</td>
        <td>${U(l)}</td>
      </tr>
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",mt(e.length)).replace("{total}",mt(w.totalProjects))}}function ts(e,t){if(!e&&!t)return"—";const a=e?At(e.toISOString()):"—",s=t?At(t.toISOString()):"—";return t?`${a} → ${s}`:a}function ee(e){const t=Number(e)||0,s=We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${v(r)} SR`}function mt(e){const a=We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return v(new Intl.NumberFormat(a).format(e))}function je(e){const a=We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return v(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function as(){return We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function U(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
