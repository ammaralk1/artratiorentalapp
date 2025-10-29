import{v as ca,w as la,x as It,o as pt,s as L,t as n,l as _t,n as y,A as da,e as ua,m as pa,h as ma,i as fa,f as Tt,g as ze}from"./auth.Crwq7jwZ.js";/* empty css              */import{i as ha}from"./dashboardShell.wAzGnSmG.js";import{d as f,r as Se,a as ke,u as Le,s as T,b as ba,f as mt,h as ya,i as va,j as o,k as g,l as ga,m as ft,n as ja,o as At,e as nt,p as $t,q as xa,t as Sa,g as Pa,c as wa,v as Ta,w as Bt,x as Aa,y as $a,z as Ea,A as Na,B as Ca,C as ka,D as La,E as Da,F as Fa,G as Ma,H as Ra,I as We,J as Ia,K as qt,L as _a,M as Ba}from"./form.BL7IVTPF.js";import"./customers.BJJ2eJLV.js";import{g as ht,b as qa,o as Ve,q as st,a as Ht,D as rt,l as Ha}from"./reservationsService.DPXCayBt.js";import{P as bt,l as yt,n as Et,u as Vt,o as vt,p as Ge,t as Oe,v as Va,x as Oa,i as Ua,h as za,w as Wa,y as ot,z as it,e as Ot,A as Ut,B as Ga,C as Ja}from"./controller.COYIZv_h.js";import{a as Ka}from"./calculations.Cl9W5AM7.js";let Nt=null;function Ya(e){e&&zt()!==e&&pt({[bt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function zt(){return It()?.[bt]||""}function Wt(e){e&&ct()!==e&&pt({[yt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function ct(){return It()?.[yt]||""}function Xa(e){if(!e)return"";const t=e.trim();return t?Object.values(Et).includes(t)?t:Et[t]||"":""}function Qa(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Xa(t);if(a)return a}}catch{}return""}function Gt(e,t){!e||!f.tabPanes||!f.tabButtons||(f.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),f.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Ya(e))}function Za(){if(!f.tabButtons||!f.tabButtons.length)return;f.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Gt(r,a),r==="projects-section"&&(T.filters.search="",f.search&&(f.search.value=""),Se(),ke(),Le()))}),a.dataset.tabListenerAttached="true")});const e=zt(),t=e&&f.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function gt(e,t){!e||!f.projectSubTabButtons||!f.projectSubTabPanes||(f.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),f.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function en(){!f.projectSubTabButtons||!f.projectSubTabButtons.length||(f.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(gt(a,e),Wt(a))}),e.dataset.tabListenerAttached="true")}),tn())}function tn(){const t=Qa()||ct();if(!t)return;const a=f.projectSubTabButtons?.[0],s=f.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==ct()&&Wt(r),gt(r,s))}function an(){return f.tabButtons?f.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function Ct(e={}){if(e){if(f.tabButtons&&f.tabButtons.length){const a=f.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[bt];if(s&&s!==a){const r=f.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Gt(s,r)}}if(f.projectSubTabButtons&&f.projectSubTabButtons.length&&an()){const a=f.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[yt];if(s&&s!==a){const r=f.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&gt(s,r)}}}}function nn(){Nt||(Nt=ca(e=>{Ct(e)})),la().then(e=>{Ct(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function ye(e){const t=T.projects.find(x=>String(x.id)===String(e));if(!t||!f.detailsBody)return;f.detailsBody.dataset.mode="view",f.detailsBody.dataset.projectId=String(t.id);const s=(T.customers.length?T.customers:_t().customers||[]).find(x=>String(x.id)===String(t.clientId)),r=Xt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),d=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",m=c?y(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),u=s?.email??t.clientEmail??t.customerEmail??"",v=u?String(u).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),D=(t.clientCompany||s?.companyName||"").trim(),C=t.projectCode||`PRJ-${y(String(t.id))}`,_=y(C),$=mt(t.id),Z=$.reduce((x,I)=>x+Qt(I),0),k=Number(Z.toFixed(2)),E=$.length,{subtotal:V,applyTax:X,expensesTotal:W}=ya(t),me=Number(t?.servicesClientPrice??t?.services_client_price??0),De=V,Pe=X?Number(((De+k)*Oe).toFixed(2)):0,fe=Number((De+k+Pe).toFixed(2)),ue=va(t),we=n(`projects.status.${ue}`,Va[ue]||ue),ne={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل",conflict:"تعارض"}[ue]||we,ge={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed"}[ue]||"status-confirmed",je=X?n("projects.details.chips.vatOn","شامل الضريبة 15٪"):n("projects.details.chips.vatOff","غير شامل الضريبة"),Ke=X?"status-paid":"status-unpaid",Te=n("projects.details.chips.reservations","{count} حجوزات").replace("{count}",y(String(E))),Ae=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",b=hn(t),h=b.length>0,j=h?0:Number(t.paidAmount)||0,P=h?0:Number(t.paidPercent)||0;let w=fe,A,M,B,R,G,q,J,Fe,$e,xe;const Ye=mn(b),Me=n("projects.focus.confirmed","✅ مشروع مؤكد"),Pt=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(Me)}</span>`:"";let F=[];if(E>0){const x=$.reduce((Be,ie)=>{const ia=Array.isArray(ie.items)?ie.items:[],wt=Array.isArray(ie.crewAssignments)?ie.crewAssignments:[],be=wt.length?wt:Array.isArray(ie.technicians)?ie.technicians:[],at=qa({items:ia,technicianIds:Array.isArray(be)&&!be.length?be:[],crewAssignments:Array.isArray(be)&&be.length&&typeof be[0]=="object"?be:[],discount:ie.discount??0,discountType:ie.discountType||"percent",applyTax:!1,start:ie.start,end:ie.end,companySharePercent:null});return Be.equipment+=Number(at.equipmentTotal||0),Be.crew+=Number(at.crewTotal||0),Be.crewCost+=Number(at.crewCostTotal||0),Be},{equipment:0,crew:0,crewCost:0}),I=Number(W||0),K=Number((x.equipment+x.crew+me).toFixed(2)),se=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let N=(t?.discountType==="amount"?"amount":"percent")==="amount"?se:K*(se/100);(!Number.isFinite(N)||N<0)&&(N=0),N>K&&(N=K);const re=X===!0,le=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",de=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,te=le&&de>0?de:0,z=Math.max(0,K-N),oe=Number((z*(te/100)).toFixed(2)),pe=re?Number(((z+oe)*Oe).toFixed(2)):0,Ne=Number((z+oe+pe).toFixed(2)),oa=Number((Ne-oe-pe-I-x.crewCost).toFixed(2));x.equipment>0&&F.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:g(x.equipment)}),x.crew>0&&F.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:g(x.crew)}),x.crewCost>0&&F.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:g(x.crewCost)}),I>0&&F.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:g(I)}),me>0&&F.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:g(me)}),N>0&&F.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${g(N)}`}),F.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:g(z)}),oe>0&&F.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${g(oe)}`}),pe>0&&F.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${g(pe)}`}),F.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:g(oa)}),F.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:g(Ne)}),w=Ne}else{const x=Number(W||0),I=Math.max(0,Number(me)||0),K=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let ee=(t?.discountType==="amount"?"amount":"percent")==="amount"?K:I*(K/100);(!Number.isFinite(ee)||ee<0)&&(ee=0),ee>I&&(ee=I);const N=Math.max(0,I-ee),re=X===!0,le=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",de=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,te=le&&de>0?de:0,z=Number((N*(te/100)).toFixed(2)),oe=re?Number(((N+z)*Oe).toFixed(2)):0,pe=Number((N+z+oe).toFixed(2)),Ne=Number((pe-z-oe-x).toFixed(2));F=[],F.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:g(I)}),ee>0&&F.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${g(ee)}`}),F.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:g(N)}),z>0&&F.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${g(z)}`}),oe>0&&F.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${g(oe)}`}),F.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:g(Ne)}),F.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:g(pe)}),w=pe}A=Ve({totalAmount:w,paidAmount:j,paidPercent:P,history:b}),M=st({manualStatus:Ae||"unpaid",paidAmount:A.paidAmount,paidPercent:A.paidPercent,totalAmount:w}),B=n(`projects.paymentStatus.${M}`,M==="paid"?"Paid":M==="partial"?"Partial":"Unpaid"),R=M==="paid"?"status-paid":M==="partial"?"status-partial":"status-unpaid",G=Number.isFinite(Number(A.paidAmount))?Number(A.paidAmount):0,q=Number.isFinite(Number(A.paidPercent))?Number(A.paidPercent):0,J=Math.max(0,Number((w-G).toFixed(2))),Fe=g(G),$e=`${y(q.toFixed(2))}%`,xe=g(J);const Xe=F.map(({icon:x,label:I,value:K})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${x} ${o(I)}</span>
      <span class="summary-details-value">${o(K)}</span>
    </div>
  `).join(""),Re=n("projects.details.labels.code","رقم المشروع"),Qe=`
    <div class="project-details-code-badge" title="${o(Re)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Re)}
      </span>
      <span class="project-details-code-badge__value">${o(_)}</span>
    </div>
  `,Ze=[{icon:"👤",label:n("projects.details.client","العميل"),value:d},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:m},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:v},D?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:D}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:r},Lt("start",t.start),Lt("end",t.end)].filter(Boolean),Ee=n("projects.details.overview.heading","معلومات المشروع"),Ie=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Ee)}</h6>
      <ul class="project-details-outline__list">
        ${Ze.map(({icon:x,label:I,value:K,meta:se})=>`
          <li>
            <span class="project-details-outline__label">${o(x)} ${o(I)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${o(K)}</span>
              ${se?`<span class="project-details-outline__meta">${o(se)}</span>`:""}
            </span>
          </li>
        `).join("")}
      </ul>
    </div>
  `,et=[`<span class="${ge}">${o(ne)}</span>`,`<span class="reservation-chip ${Ke}">${o(je)}</span>`,`<span class="reservation-chip status-info">${o(Te)}</span>`,`<span class="reservation-chip ${R}">${o(B)}</span>`,Pt].filter(Boolean).join(""),U=n("projects.details.expensesTotal","تكلفة الخدمات الإنتاجية"),tt=n("projects.details.reservationsTotal","إجمالي الحجوزات"),_e=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",g(W)),he=sn(Array.isArray(t.expenses)?t.expenses:[]);f.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${et}</div>
        </div>
        <div class="project-details-header__code">
          ${Qe}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${Ie}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(n("projects.details.summary.title","الملخص المالي"))}</h6>
            ${Xe}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.description","وصف المشروع"))}</h5>
      <p class="project-details-description">${o(i)}</p>
    </section>
    <section class="project-details-section">
      <h5>${o(_e)}</h5>
      ${he}
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.financialBreakdown","تفاصيل مالية"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(U)}</span>
          <strong>${g(W)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(tt)}</span>
          <strong>${g(k)}</strong>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("reservations.paymentHistory.title","سجل الدفعات"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.total","الإجمالي الكلي"))}</span>
          <strong>${o(g(w))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.paid","المدفوع"))}</span>
          <strong>${o(Fe)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o($e)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(xe)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${Ye}
      </div>
    </section>
    ${ga(t)}
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
  `,cn(t);const H=f.detailsBody.querySelector("#project-details-export-btn");H&&H.addEventListener("click",async x=>{if(x.preventDefault(),H.blur(),!H.disabled){H.disabled=!0;try{await Oa({project:t})}catch(I){console.error("❌ [projects/details] export project PDF failed",I),L(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{H.disabled=!1}}}),f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl).show()}function sn(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
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
    `}const a=e.map(s=>{const r=o(s?.label||""),l=g(Number(s?.amount)||0),i=g(Number(s?.sale_price??s?.salePrice??0));return`
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
  `}function rn({onOpenProject:e}){!f.focusCards||f.focusCards.dataset.listenerAttached==="true"||(f.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),dn(l);return}r==="view"?e?.(l):r==="highlight"&&on(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),f.focusCards.dataset.listenerAttached="true")}function on(e){if(!f.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=f.projectsTableBody.querySelector(t);if(!a){L(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function cn(e){if(!f.detailsBody)return;const t=f.detailsBody.querySelector('[data-action="create-reservation"]'),a=f.detailsBody.querySelector('[data-action="edit-project"]'),s=f.detailsBody.querySelector('[data-action="delete-project"]'),r=f.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(mt(e.id)||[]).some(d=>{const c=String(d?.status||d?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ المشروع مربوط بحجز مسبقاً"),t.addEventListener("click",d=>{d.preventDefault(),L(n("projects.details.reservations.createDisabledToast","⚠️ المشروع مربوط بحجز مسبقاً"))})):(t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",d=>{d.preventDefault(),kt(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),kt(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),Jt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await ja(e.id),!T.projects.some(c=>String(c.id)===String(e.id))&&f.detailsModalEl&&window.bootstrap?.Modal.getInstance(f.detailsModalEl)?.hide()}finally{T.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const d=za("showReservationDetails");if(typeof d=="function")return d(i),!0;try{const c=await Wa("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const d=i.target.closest('[data-action="view-reservation"]');if(!d)return;const c=d.dataset.index||d.dataset.reservationIndex,m=Number.parseInt(c||"-1",10);if(!Number.isInteger(m)||m<0)return;await l(m)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const d=i.target.closest('[data-action="view-reservation"]');d&&(i.preventDefault(),d.click())})}}function Jt(e){if(!e||!f.detailsBody)return;const t=T.projects.find(u=>String(u.id)===String(e.id));if(!t)return;const a=T.customers.find(u=>String(u.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const s=Array.isArray(t.expenses)?t.expenses.map((u,v)=>({id:u?.id||`expense-${t.id}-${v}-${Date.now()}`,label:u?.label||"",amount:Number(u?.amount)||0,salePrice:Number.isFinite(Number(u?.sale_price??u?.salePrice))?Number(u?.sale_price??u?.salePrice):0})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((u,v)=>({type:u?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(u?.amount))?Number(u.amount):null,percentage:Number.isFinite(Number(u?.percentage))?Number(u.percentage):null,value:Number.isFinite(Number(u?.value))?Number(u.value):null,note:u?.note??null,recordedAt:u?.recordedAt??u?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${v}`})):[],l=r.reduce((u,v)=>u+(Number(v?.amount)||0),0),i=r.reduce((u,v)=>u+(Number(v?.percentage)||0),0),d=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,c=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(d>0||c>0)){const u=t.updatedAt??t.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(d)&&d>0?d:null,percentage:c,value:c,note:null,recordedAt:u,key:`legacy-payment-${t.id}-percent`}]:d>0&&(r=[{type:"amount",amount:d,percentage:null,value:d,note:null,recordedAt:u,key:`legacy-payment-${t.id}-amount`}]),l=r.reduce((v,D)=>v+(Number(D?.amount)||0),0),i=r.reduce((v,D)=>v+(Number(D?.percentage)||0),0),d=0,c=0}l>0&&Math.abs(d-l)<.01&&(d=0),i>0&&Math.abs(c-i)<.01&&(c=0);const m={expenses:s,payments:r,basePaidAmount:d,basePaidPercent:c};f.detailsBody.dataset.mode="edit",f.detailsBody.innerHTML=un(t,m),ln(t,m)}function ln(e,t={expenses:[]}){const a=f.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",b=>{b.preventDefault(),ye(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),d=a.querySelector('[data-action="add-expense"]'),c=a.querySelector("#project-edit-expense-list"),m=a.querySelector('[name="project-start-date"]'),u=a.querySelector('[name="project-start-time"]'),v=a.querySelector('[name="project-end-date"]'),D=a.querySelector('[name="project-end-time"]'),C=a.querySelector('[name="project-payment-status"]'),_=a.querySelector("#project-edit-tax"),$=a.querySelector("#project-edit-company-share"),Z=a.querySelector("#project-edit-discount"),k=a.querySelector("#project-edit-discount-type"),E=a.querySelector("#project-edit-payment-progress-type"),V=a.querySelector("#project-edit-payment-progress-value"),X=a.querySelector("#project-edit-payment-add"),W=a.querySelector("#project-edit-payment-history"),me=a.querySelector("#project-edit-payment-summary"),De=n("reservations.create.summary.currency","SR");let Pe=!1;const fe=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),ue=()=>{const b=Number(e.equipmentEstimate)||0,h=Array.isArray(t.expenses)?t.expenses.reduce((q,J)=>q+(Number(J.amount)||0),0):0,j=Array.isArray(t.expenses)?Math.max(0,Math.round(t.expenses.reduce((q,J)=>q+Number(J?.salePrice??0),0)*100)/100):Math.max(0,Number(e?.servicesClientPrice??0)),P=k?.value==="amount"?"amount":"percent",w=y(Z?.value||"0");let A=Number.parseFloat(w);(!Number.isFinite(A)||A<0)&&(A=0);const M=_?.checked===!0,B=$?.checked===!0;let R=B?Pa($):null;(!Number.isFinite(R)||R<=0)&&(R=B?rt:null);const G=wa({equipmentEstimate:b,expensesTotal:h,servicesClientPrice:j,discountValue:A,discountType:P,applyTax:M,companyShareEnabled:B,companySharePercent:R});return{equipmentEstimate:b,expensesTotal:h,discountValue:A,discountTypeValue:P,applyTax:M,companyShareEnabled:B,companySharePercent:R,servicesClientPrice:j,finance:G}},we=()=>{const b=ue(),h=fe(),P=(mt(e.id)||[]).reduce((R,G)=>R+(Number(G?.totalAmount)||Qt(G)||0),0),w=Number(b.finance?.taxableAmount||0),A=b.applyTax?Number(((w+P)*Oe).toFixed(2)):0,M=Number((w+P+A).toFixed(2)),B=Ve({totalAmount:M,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:h});return{...b,combinedTotalWithTax:M,payments:h,progress:B}},St=()=>{W&&(W.innerHTML=fn(fe()))},ne=()=>{if(!me)return;const{combinedTotalWithTax:b,progress:h}=we(),j=Number.isFinite(Number(b))?Number(b):0,P=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,w=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,A=Math.max(0,Math.round((j-P)*100)/100),M=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:g(j)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:g(P)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${y(w.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:g(A)}];me.innerHTML=M.map(({label:B,value:R})=>`
        <div class="project-details-grid-item">
          <span>${o(B)}</span>
          <strong>${o(R)}</strong>
        </div>
      `).join("")},ce=(b="auto")=>{if(!C)return;const h=C.dataset?.userSelected==="true";if(b==="auto"&&h)return;const{finance:j,progress:P}=we(),w=st({manualStatus:h?C.value:e.paymentStatus||"unpaid",paidAmount:P.paidAmount,paidPercent:P.paidPercent,totalAmount:j.totalWithTax});h||(C.value=w)},ge=()=>{St(),ne(),ce("auto")},je=1e-4,Ke=()=>{const b=E?.value==="amount"?"amount":"percent",h=y(V?.value||"").replace("%","").trim();let j=Number.parseFloat(h);if(!Number.isFinite(j)||j<=0){L(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),V?.focus();return}const P=we(),w=Number.isFinite(Number(P.finance.totalWithTax))?Number(P.finance.totalWithTax):0;if(w<=0){L(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const A=Number(P.progress.paidAmount)||0,M=Number(P.progress.paidPercent)||0;let B=null,R=null;if(b==="percent"){const q=Math.max(0,100-M);if(q<=je){L(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(j>q){j=q;const J=y(j.toFixed(2));L(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",J))}R=Math.round(j*100)/100,w>0&&(B=Math.round(R/100*w*100)/100)}else{const q=Math.max(0,w-A);if(q<=je){L(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(j>q){j=q;const J=`${y(j.toFixed(2))} ${De}`;L(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",J))}B=Math.round(j*100)/100,w>0&&(R=Math.round(B/w*100*100)/100)}const G={type:b,amount:B??null,percentage:R??null,value:b==="amount"?B:R,note:null,recordedAt:new Date().toISOString()};t.payments=[...fe(),G],V&&(V.value=""),E&&(E.value="percent"),ge(),L(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},Te=b=>{!_||!$||Pe||(Pe=!0,b==="share"?$.checked?(_.checked||(_.checked=!0),nt($)):_.checked&&(_.checked=!1):b==="tax"&&(_.checked?nt($):$.checked&&($.checked=!1)),Pe=!1)};function Ae(){c&&(c.innerHTML=Kt(t.expenses))}Ae(),ge(),Z&&!Z.dataset.listenerAttached&&(Z.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=y(h.value||""),ne(),ce("auto"))}),Z.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=y(h.value||""))}),i.dataset.listenerAttached="true"),k&&!k.dataset.listenerAttached&&(k.addEventListener("change",()=>{ne(),ce("auto")}),k.dataset.listenerAttached="true"),V&&!V.dataset.listenerAttached&&(V.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=y(h.value||""))}),V.dataset.listenerAttached="true"),C&&!C.dataset.listenerAttached&&(C.addEventListener("change",()=>{C.dataset.userSelected="true"}),C.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=y(h.value||""))}),l.dataset.listenerAttached="true"),$&&!$.dataset.listenerAttached&&($.addEventListener("change",()=>{Te("share"),ne(),ce("auto")}),$.dataset.listenerAttached="true"),_&&!_.dataset.listenerAttached&&(_.addEventListener("change",()=>{Te("tax"),ne(),ce("auto")}),_.dataset.listenerAttached="true"),$?.checked&&nt($),Te($?.checked?"share":"tax"),ne(),ce("auto"),d&&d.addEventListener("click",b=>{b.preventDefault();const h=r?.value.trim()||"",j=y(l?.value||"0"),P=Number(j),w=y(i?.value||"0"),A=Number(w);if(!h){L(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(P)||P<=0){L(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:h,amount:P,salePrice:Number.isFinite(A)&&A>0?A:0}),r&&(r.value=""),l&&(l.value=""),i&&(i.value=""),Ae(),ne(),ce("auto")}),c&&c.addEventListener("click",b=>{const h=b.target.closest('[data-action="remove-expense"]');if(!h)return;const{id:j}=h.dataset;t.expenses=t.expenses.filter(P=>String(P.id)!==String(j)),Ae(),ne(),ce("auto")}),X&&!X.dataset.listenerAttached&&(X.addEventListener("click",b=>{b.preventDefault(),Ke()}),X.dataset.listenerAttached="true"),W&&!W.dataset.listenerAttached&&(W.addEventListener("click",b=>{const h=b.target.closest('[data-action="remove-payment"]');if(!h)return;const j=Number.parseInt(h.dataset.index||"-1",10);if(!Number.isInteger(j)||j<0)return;const P=fe();if(j>=P.length)return;const w=P.filter((A,M)=>M!==j);t.payments=w,ge(),L(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),W.dataset.listenerAttached="true"),a.addEventListener("submit",async b=>{if(b.preventDefault(),a.dataset.submitting==="true")return;const h=a.querySelector('[name="project-title"]'),j=a.querySelector('[name="project-type"]'),P=a.querySelector('[name="project-description"]'),w=h?.value.trim()||"",A=j?.value||"",M=m?.value.trim()||"",B=u?.value.trim()||"",R=P?.value.trim()||"",G=(C?.value||"unpaid").toLowerCase(),q=["paid","partial"].includes(G)?G:"unpaid";if(!w||!A||!M){L(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),h?.focus();return}const J=v?.value.trim()||"",Fe=D?.value.trim()||"",$e=$t(M,B),xe=J?$t(J,Fe):"",Ye=new Date($e),Me=xe?new Date(xe):null;if(Me&&Ye>Me){L(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),v?.focus();return}if(T.projects.findIndex(N=>String(N.id)===String(e.id))===-1){L(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const F=ue(),{equipmentEstimate:Xe,servicesClientPrice:Re,discountValue:Qe,discountTypeValue:Ze,applyTax:Ee,companyShareEnabled:Ie,companySharePercent:et,finance:U}=F,tt=E?.value==="amount"?"amount":"percent",_e=y(V?.value||"");let he=_e?Number.parseFloat(_e):null,H=[...fe()];if(Number.isFinite(he)&&he>0&&Number.isFinite(Number(U.totalWithTax))){const N=Ve({totalAmount:U.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:H}),re=new Date().toISOString();if(tt==="percent"){const le=Math.max(0,100-(N.paidPercent||0));if(le>je){const de=Math.min(he,le),te=Math.round(de*100)/100,z=U.totalWithTax>0?Math.round(te/100*U.totalWithTax*100)/100:null;H=[...H,{type:"percent",amount:z,percentage:te,value:te,note:null,recordedAt:re}]}}else{const le=Math.max(0,U.totalWithTax-(N.paidAmount||0));if(le>je){const de=Math.min(he,le),te=Math.round(de*100)/100,z=U.totalWithTax>0?Math.round(te/U.totalWithTax*100*100)/100:null;H=[...H,{type:"amount",amount:te,percentage:z,value:te,note:null,recordedAt:re}]}}H!==t.payments&&(t.payments=H,ge()),V&&(V.value=""),E&&(E.value="percent"),he=null}const x=Ve({totalAmount:U.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:H}),I=C?.dataset?.userSelected==="true",K=st({manualStatus:I?q:e.paymentStatus||q,paidAmount:x.paidAmount,paidPercent:x.paidPercent,totalAmount:U.totalWithTax}),se=I?q:K;!I&&C&&(C.value=se),C?.dataset&&delete C.dataset.userSelected,t.payments=H;const ee=Ua({projectCode:e.projectCode,title:w,type:A,clientId:e.clientId,clientCompany:e.clientCompany,description:R,start:$e,end:xe||null,applyTax:Ee,paymentStatus:se,equipmentEstimate:Xe,expenses:t.expenses,servicesClientPrice:Re,discount:Qe,discountType:Ze,companyShareEnabled:Ie&&Ee,companySharePercent:Ie&&Ee?et:null,companyShareAmount:U.companyShareAmount,taxAmount:U.taxAmount,totalWithTax:U.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:xa(e),paidAmount:x.paidAmount,paidPercentage:x.paidPercent,paymentProgressType:x.paymentProgressType,paymentProgressValue:x.paymentProgressValue,payments:H});a.dataset.submitting="true";try{const N=await Vt(e.projectId??e.id,ee),re=N?.projectId??N?.id??e.id;await Sa(re,se),T.projects=vt(),T.reservations=ht(),L(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),Se(),ke(),Le(),ye(e.id)}catch(N){console.error("❌ [projects] Failed to update project from details view",N);const re=Ge(N)?N.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");L(re,"error")}finally{delete a.dataset.submitting}})}function kt(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description,fromProjectForm:!0,draftStorageKey:"projects:create:draft",returnUrl:`projects.html?project=${encodeURIComponent(e.id)}&linked=1#projects-section`};pt({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function dn(e){if(!e)return;const t=T.projects.find(a=>String(a.id)===String(e));if(!t){L(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){L(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Vt(t.projectId??t.id,{confirmed:!0});const a=await ba(e);T.projects=vt(),T.reservations=ht(),Se(),ke(),Le(),f.detailsModalEl&&f.detailsModalEl.classList.contains("show")&&f.detailsBody?.dataset.projectId===String(e)&&ye(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),L(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=Ge(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");L(s,"error")}}function un(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=At(e.start||""),{date:r,time:l}=At(e.end||""),i=e.applyTax===!0||e.applyTax==="true";typeof e.paymentStatus=="string"&&e.paymentStatus.toLowerCase();const d=e.discountType==="amount"?"amount":"percent",c=y(String(e.discount??e.discountValue??0));y(String(e.servicesClientPrice??e.services_client_price??0));const m=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??rt,u=Number.parseFloat(y(String(m))),v=Number.isFinite(u)&&u>0?u:rt,D=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(u)&&u>0;return`
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${o(n("projects.form.labels.title","عنوان المشروع"))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${o(e.title||"")}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${o(n("projects.form.labels.type","نوع المشروع"))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${pn(e.type)}
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
          ${Kt(t.expenses)}
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
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(v))}" ${D?"checked":""}>
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
  `}function pn(e){return["commercial","coverage","photography","social"].map(a=>{const s=Xt(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(s)}</option>`}).join("")}function Kt(e=[]){if(!Array.isArray(e)||e.length===0){const i=o(n("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"));return`
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
      </div>`}const t=o(n("actions.remove","إزالة")),a=e.map(i=>{const d=o(i?.label||""),c=o(g(i?.amount||0)),m=o(g(i?.salePrice||i?.sale_price||0)),u=o(String(i?.id||""));return`
      <tr>
        <td>${d}</td>
        <td>${c}</td>
        <td>${m}</td>
        <td><button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${u}" aria-label="${t}">✖</button></td>
      </tr>`}).join(""),s=e.reduce((i,d)=>i+(Number(d?.salePrice??d?.sale_price)||0),0),r=o(g(s)),l=o(n("projects.expenses.table.totalSale","مجموع سعر البيع"));return`
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
    </div>`}function mn(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(g(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${y(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?y(ft(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(y(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function fn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(g(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${y(Number(a.percentage).toFixed(2))}%`:"—",d=a?.recordedAt?y(ft(a.recordedAt)):"—",c=a?.note?o(y(a.note)):"",m=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
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
  `}function hn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(bn).filter(Boolean);if(a.length>0)return a;const s=Ue(e.paidPercent??e.paid_percent),r=Ue(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Yt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function bn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=Ue(e.amount??(a==="amount"?e.value:null)),r=Ue(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,d=Yt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:d}}function Ue(e){if(e==null||e==="")return null;const t=y(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Yt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Lt(e,t){if(!t)return null;const{date:a,time:s}=yn(ft(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية الحجز"):n("projects.details.labels.end","نهاية الحجز");return{icon:l,label:i,value:a,meta:s}}function yn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Xt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function Qt(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(y(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Ht(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(y(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function jt(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function vn(){return jt(ot)}function gn(){return jt(it)}function jn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[ot,it,"linked"].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let m=!1;[ot,it,"linked"].forEach(u=>{c.has(u)&&(c.delete(u),m=!0)}),m&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),d=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",d)}catch{}}function xn(){const e=vn(),t=gn(),a=jt("linked");e&&(T.pendingProjectDetailId=e),t&&(T.pendingProjectEditId=t,T.pendingProjectDetailId||(T.pendingProjectDetailId=t)),a!=null&&String(a)!==""&&String(a)!=="0"&&String(a).toLowerCase()!=="false"&&(T.pendingLinkedToast=!0),(e||t)&&jn()}function Sn(){if(!T.pendingProjectDetailId)return;const e=T.pendingProjectDetailId,t=String(e),a=T.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;T.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(ye(s),T.pendingLinkedToast){T.pendingLinkedToast=!1;try{L(n("projects.toast.linkedReservationCreated","✅ تم ربط الحجز بالمشروع"))}catch{}}if(T.pendingProjectEditId!=null){const r=String(T.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&(T.pendingProjectEditId=null,setTimeout(()=>Jt(a),0))}}function Pn(){document.addEventListener("DOMContentLoaded",()=>{nn(),xn(),Ta(),Bt(),Aa(),Za(),en(),$a(),Ea(),Na(),Ca(),ka(),La(),Da({onViewDetails:ye}),rn({onOpenProject:ye}),Fa(),wn()}),document.addEventListener("language:changed",Dt),document.addEventListener("language:translationsReady",Dt),document.addEventListener("customers:changed",Tn),document.addEventListener("technicians:updated",An),document.addEventListener("reservations:changed",()=>Ma(ye)),document.addEventListener(da.USER_UPDATED,()=>{Se()})}async function wn(){try{await Ot({suppressError:!0}),await Ut()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");L(t,"error")}finally{Ra(),We(),Ia(),qt(),Se(),Le(),ke(),Sn()}}function Dt(){We(),qt(),Se(),Le(),ke(),Bt()}function Tn(){_a(),We()}function An(){Ba(),We()}ua();pa();ma();Ga();Pn();document.addEventListener("DOMContentLoaded",()=>{ha(),fa()});const lt=.15,qe={},$n="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let Ce=0;const S={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},He=Object.freeze({projects:`
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
  `});let Y=null;const Zt=["upcoming","ongoing","completed"];async function En({forceProjects:e=!1}={}){try{await Ot({suppressError:!0}),await Ja({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),Ge(t)&&console.warn("Projects API error:",t.message)}na()}async function Nn(){Ln(),ta(),await Cn();try{await En({forceProjects:!0}),ra(),_n(),ae()}finally{aa()}document.addEventListener("language:changed",qn),document.addEventListener("projects:changed",()=>{dt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{dt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",Hn)}document.addEventListener("DOMContentLoaded",Nn);async function Cn(){if(Y)return Y;if(typeof window>"u")return null;if(window.ApexCharts)return Y=window.ApexCharts,Y;try{await kn($n),Y=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),Y=null}return Y}function kn(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function Ln(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function ea(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function ta(){Ce+=1,Ce===1&&ea(!0)}function aa(){Ce=Math.max(0,Ce-1),Ce===0&&ea(!1)}function na(){const{customers:e=[]}=_t();S.customers=Array.isArray(e)?e:[],S.reservations=ht();const t=new Map(S.customers.map(s=>[String(s.id),s])),a=vt();S.projects=Array.isArray(a)?a.map(s=>Dn(s,t)):[],S.totalProjects=S.projects.length}function Dn(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=Fn(e.id),l=r.reduce((Z,k)=>Z+Mn(k),0),i=Rn(e),d=Number(e?.equipmentEstimate)||0,c=Number((d+i).toFixed(2)),m=e?.applyTax===!0||e?.applyTax==="true",u=m?Number((c*lt).toFixed(2)):0,v=m?Number(((c+l)*lt).toFixed(2)):0,D=Number((c+l+v).toFixed(2)),C=In(e),_=e.start?new Date(e.start):null,$=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:_,end:$,applyTax:m,status:C,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:u,combinedTaxAmount:v,overallTotal:D,unpaidValue:a==="paid"?0:D,reservationsCount:r.length}}function Fn(e){return Array.isArray(S.reservations)?S.reservations.filter(t=>String(t.projectId)===String(e)):[]}function Mn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(y(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Ht(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(y(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Rn(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function In(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function _n(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{S.filters.search=p.search.value.trim(),ae()},180)})}p.payment&&(p.payment.value=S.filters.payment,p.payment.addEventListener("change",()=>{S.filters.payment=p.payment.value||"all",ae()})),p.dateRange&&(p.dateRange.addEventListener("change",Bn),p.dateRange.value=S.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{S.filters.startDate=p.startDate.value,S.filters.range==="custom"&&ae()}),p.endDate&&p.endDate.addEventListener("change",()=>{S.filters.endDate=p.endDate.value,S.filters.range==="custom"&&ae()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(S.filters.range!=="custom"){ae();return}S.filters.startDate=p.startDate?.value||"",S.filters.endDate=p.endDate?.value||"",ae()})}function Bn(e){const t=e.target.value;S.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),S.filters.startDate="",S.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),ae())}async function dt(){ta();try{await Promise.all([Ut(),Ha()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),Ge(e)&&console.warn("Projects API error:",e.message)}finally{na(),ae(),aa()}}function qn(){ra(),ae()}function Hn(e){e.key&&!["projects","reservations","customers"].includes(e.key)||dt().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function ae(){const e=Vn();xt(),zn(e),Kn(e),Yn(e),Xn(e),Qn(e),Zn(e)}function Vn(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=S.filters,i=sa(e),d=new Date,c=Number(s);let m=null;if(s==="custom"){m=r?new Date(r):null;const u=l?new Date(l):null;return S.projects.filter(v=>!Ft(v,t)||!Mt(v,a)||!Rt(v,i)?!1:Un(v.start,m,u))}return s!=="all"&&Number.isFinite(c)&&(m=new Date,m.setDate(d.getDate()-c)),S.projects.filter(u=>!Ft(u,t)||!Mt(u,a)||!Rt(u,i)?!1:s==="all"?!0:On(u.start,m,d))}function Ft(e,t){return t.includes(e.status)}function Mt(e,t){return t==="all"?!0:e.paymentStatus===t}function Rt(e,t){return t?sa([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function On(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function Un(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function sa(e){return e?y(String(e)).toLowerCase().trim():""}function zn(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((i,d)=>i+d.overallTotal,0),s=e.reduce((i,d)=>i+d.unpaidValue,0),r=e.reduce((i,d)=>i+d.expensesTotal,0),l=[{icon:He.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:ut(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:He.value,label:n("projects.reports.kpi.totalValue","Total value"),value:Q(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:He.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:Q(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:He.expenses,label:n("projects.reports.kpi.expenses","تكلفة الخدمات الإنتاجية"),value:Q(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];p.kpiGrid.innerHTML=l.map(({icon:i,label:d,value:c,meta:m})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${O(d)}</p>
        <p class="reports-kpi-value">${O(c)}</p>
        <span class="reports-kpi-meta">${O(m)}</span>
      </div>
    </div>
  `).join(""),Wn(e)}function Wn(e){try{const t=Gn(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:Q(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:Q(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:Q(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:Q(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:Q(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:Q(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","تكلفة الخدمات الإنتاجية","Project expenses"),value:`−${Q(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:Q(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:d})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${O(i)}</span>
            <span class="reports-kpi-detail-value">${O(d)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:p.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function Gn(e){const t=new Set(e.map(k=>String(k.id))),a=S.reservations.filter(k=>k.projectId!=null&&t.has(String(k.projectId)));let s=0,r=0,l=0,i=0,d=0,c=0,m=0;a.forEach(k=>{const E=Ka(k);s+=E.finalTotal||0,r+=E.equipmentTotal||0,l+=E.crewTotal||0,i+=E.crewCostTotal||0,d+=E.companyShareAmount||0,c+=E.taxAmount||0,m+=E.netProfit||0});const u=e.reduce((k,E)=>k+(Number(E.expensesTotal)||0),0),v=e.reduce((k,E)=>k+(Number(E.raw?.equipmentEstimate)||0),0),D=e.reduce((k,E)=>{const V=E.applyTax===!0,X=(Number(E.raw?.equipmentEstimate)||0)+(Number(E.expensesTotal)||0),W=V?X*lt:0;return k+W},0),C=s+v+D,_=r+v,$=c+D,Z=m-u;return{grossRevenue:C,companyShareTotal:d,taxTotal:$,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:_,projectExpensesTotal:u,netProfit:Z}}function ra(){if(!p.statusChips)return;const e=Zt.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${O(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",Jn),p.statusChips.dataset.listenerAttached="true"),xt()}function Jn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(S.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&Zt.forEach(r=>s.add(r)),S.filters.statuses=Array.from(s),xt(),ae()}function xt(){if(!p.statusChips)return;const e=new Set(S.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Kn(e){if(!Y)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(m=>m.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,m)=>c+m,0)>0?s:[],d={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>ve(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};Je("status",t,d)}function Yn(e){if(!Y)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(ts(),{month:"short",year:"numeric"});e.forEach(u=>{if(!u.start||Number.isNaN(u.start.getTime()))return;const v=`${u.start.getFullYear()}-${u.start.getMonth()+1}`,D=a.get(v)||{total:0,label:s.format(u.start)};D.total+=u.overallTotal,a.set(v,D)});const l=Array.from(a.keys()).sort((u,v)=>{const[D,C]=u.split("-").map(Number),[_,$]=v.split("-").map(Number);return D===_?C-$:D-_}).slice(-12),i=l.map(u=>a.get(u)?.label||u),d=l.map(u=>Math.round(a.get(u)?.total||0)),c=d.length?[{name:n("projects.reports.datasets.value","Total value"),data:d}]:[],m={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:u=>ve(u)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:u=>ve(u)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("timeline",t,m)}function Xn(e){if(!Y)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((m,u)=>u.overallTotal-m.overallTotal).slice(0,6),s=a.map(m=>m.title||m.projectCode),r=a.map(m=>Math.round(m.overallTotal)),l=a.map(m=>Math.round(m.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","تكلفة الخدمات الإنتاجية"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:m=>ve(m)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:m=>ve(m)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("expenses",t,c)}function Qn(e){if(!Y)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const m=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),u=a.get(m)||0;a.set(m,u+c.overallTotal)});const s=Array.from(a.entries()).sort((c,m)=>m[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],d={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>ve(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>ve(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("clients",t,d)}function Je(e,t,a={}){if(!Y||!t)return;if(qe[e]){try{qe[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete qe[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new Y(t,s);qe[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function Zn(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=es(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${O(a.clientName)} <small class="text-muted">${O(a.clientCompany)}</small>`:O(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${O(a.title||a.projectCode)}</span>
            <small class="text-muted">${O(`#${a.projectCode}`)}</small>
          </div>
        </td>
        <td>${i}</td>
        <td>${O(r)}</td>
        <td>${O(s)}</td>
        <td>${O(Q(a.overallTotal))}</td>
        <td>${O(l)}</td>
      </tr>
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",ut(e.length)).replace("{total}",ut(S.totalProjects))}}function es(e,t){if(!e&&!t)return"—";const a=e?Tt(e.toISOString()):"—",s=t?Tt(t.toISOString()):"—";return t?`${a} → ${s}`:a}function Q(e){const t=Number(e)||0,s=ze()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${y(r)} SR`}function ut(e){const a=ze()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return y(new Intl.NumberFormat(a).format(e))}function ve(e){const a=ze()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return y(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function ts(){return ze()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function O(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
