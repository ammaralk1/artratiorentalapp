import{v as oa,w as ia,x as Mt,o as dt,s as L,t as n,l as Rt,n as j,A as ca,e as la,m as da,h as ua,i as pa,f as Pt,g as Oe}from"./auth.CFmUxZww.js";/* empty css              */import{i as ma}from"./dashboardShell.CpG9SyUN.js";import{d as f,r as Se,a as Ne,u as Ce,s as T,b as fa,f as ut,h as ha,i as ba,j as o,k as S,l as ya,m as pt,n as va,o as wt,e as tt,p as Tt,q as ga,t as ja,g as xa,c as Sa,v as Pa,w as It,x as wa,y as Ta,z as Aa,A as $a,B as Ea,C as Na,D as Ca,E as ka,F as La,G as Da,H as Fa,I as Ue,J as Ma,K as _t,L as Ra,M as Ia}from"./form.DRYuBmS7.js";import"./customers.xSpaFc27.js";import{g as mt,b as _a,o as qe,q as at,a as Bt,D as nt,l as Ba}from"./reservationsService.BuzBSxm1.js";import{P as ft,l as ht,n as At,u as qt,o as bt,p as ze,t as He,v as qa,x as Ha,i as Va,h as Oa,w as Ua,y as st,z as rt,e as Ht,A as Vt,B as za,C as Wa}from"./controller.Dp7EiJmF.js";import{a as Ga}from"./calculations.JNZK6KVD.js";let $t=null;function Ja(e){e&&Ot()!==e&&dt({[ft]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Ot(){return Mt()?.[ft]||""}function Ut(e){e&&ot()!==e&&dt({[ht]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function ot(){return Mt()?.[ht]||""}function Ka(e){if(!e)return"";const t=e.trim();return t?Object.values(At).includes(t)?t:At[t]||"":""}function Ya(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Ka(t);if(a)return a}}catch{}return""}function zt(e,t){!e||!f.tabPanes||!f.tabButtons||(f.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),f.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Ja(e))}function Xa(){if(!f.tabButtons||!f.tabButtons.length)return;f.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(zt(r,a),r==="projects-section"&&(T.filters.search="",f.search&&(f.search.value=""),Se(),Ne(),Ce()))}),a.dataset.tabListenerAttached="true")});const e=Ot(),t=e&&f.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function yt(e,t){!e||!f.projectSubTabButtons||!f.projectSubTabPanes||(f.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),f.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function Qa(){!f.projectSubTabButtons||!f.projectSubTabButtons.length||(f.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(yt(a,e),Ut(a))}),e.dataset.tabListenerAttached="true")}),Za())}function Za(){const t=Ya()||ot();if(!t)return;const a=f.projectSubTabButtons?.[0],s=f.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==ot()&&Ut(r),yt(r,s))}function en(){return f.tabButtons?f.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function Et(e={}){if(e){if(f.tabButtons&&f.tabButtons.length){const a=f.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[ft];if(s&&s!==a){const r=f.tabButtons.find(l=>l.dataset.tabTarget===s);r&&zt(s,r)}}if(f.projectSubTabButtons&&f.projectSubTabButtons.length&&en()){const a=f.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[ht];if(s&&s!==a){const r=f.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&yt(s,r)}}}}function tn(){$t||($t=oa(e=>{Et(e)})),ia().then(e=>{Et(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function ye(e){const t=T.projects.find(g=>String(g.id)===String(e));if(!t||!f.detailsBody)return;f.detailsBody.dataset.mode="view",f.detailsBody.dataset.projectId=String(t.id);const s=(T.customers.length?T.customers:Rt().customers||[]).find(g=>String(g.id)===String(t.clientId)),r=Kt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),u=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",m=c?j(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),d=s?.email??t.clientEmail??t.customerEmail??"",x=d?String(d).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),D=(t.clientCompany||s?.companyName||"").trim(),E=t.projectCode||`PRJ-${j(String(t.id))}`,I=j(E),A=ut(t.id),ae=A.reduce((g,C)=>g+Yt(C),0),N=Number(ae.toFixed(2)),$=A.length,{subtotal:H,applyTax:Q,expensesTotal:J}=ha(t),ue=Number(t?.servicesClientPrice??t?.services_client_price??0),ke=H,Pe=Q?Number(((ke+N)*He).toFixed(2)):0,pe=Number((ke+N+Pe).toFixed(2)),me=ba(t),we=n(`projects.status.${me}`,qa[me]||me),re={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"}[me]||"status-confirmed",oe=Q?n("projects.details.chips.vatOn","شامل الضريبة 15٪"):n("projects.details.chips.vatOff","غير شامل الضريبة"),ge=Q?"status-paid":"status-unpaid",je=n("projects.details.chips.reservations","{count} حجوزات").replace("{count}",j(String($))),Ge=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",fe=mn(t),xe=fe.length>0,b=xe?0:Number(t.paidAmount)||0,h=xe?0:Number(t.paidPercent)||0;let y=pe,v,w,F,q,M,R,Z,_,K,Le;const De=un(fe),Te=n("projects.focus.confirmed","✅ مشروع مؤكد"),Je=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(Te)}</span>`:"";let k=[];if($>0){const g=A.reduce((Ie,ce)=>{const ra=Array.isArray(ce.items)?ce.items:[],St=Array.isArray(ce.crewAssignments)?ce.crewAssignments:[],be=St.length?St:Array.isArray(ce.technicians)?ce.technicians:[],et=_a({items:ra,technicianIds:Array.isArray(be)&&!be.length?be:[],crewAssignments:Array.isArray(be)&&be.length&&typeof be[0]=="object"?be:[],discount:ce.discount??0,discountType:ce.discountType||"percent",applyTax:!1,start:ce.start,end:ce.end,companySharePercent:null});return Ie.equipment+=Number(et.equipmentTotal||0),Ie.crew+=Number(et.crewTotal||0),Ie.crewCost+=Number(et.crewCostTotal||0),Ie},{equipment:0,crew:0,crewCost:0}),C=Number(J||0),V=Number((g.equipment+g.crew+ue).toFixed(2)),le=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let O=(t?.discountType==="amount"?"amount":"percent")==="amount"?le:V*(le/100);(!Number.isFinite(O)||O<0)&&(O=0),O>V&&(O=V);const U=Q===!0,ie=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",ne=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,he=ie&&ne>0?ne:0,B=Math.max(0,V-O),G=Number((B*(he/100)).toFixed(2)),de=U?Number(((B+G)*He).toFixed(2)):0,$e=Number((B+G+de).toFixed(2)),sa=Number(($e-G-de-C-g.crewCost).toFixed(2));g.equipment>0&&k.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:S(g.equipment)}),g.crew>0&&k.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:S(g.crew)}),g.crewCost>0&&k.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:S(g.crewCost)}),C>0&&k.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة خدمات الإنتاجية"),value:S(C)}),ue>0&&k.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","سعر العميل للخدمات الإنتاجية"),value:S(ue)}),O>0&&k.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${S(O)}`}),k.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:S(B)}),G>0&&k.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${S(G)}`}),de>0&&k.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${S(de)}`}),k.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:S(sa)}),k.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:S($e)}),y=$e}else{const g=Number(J||0),C=Math.max(0,Number(ue)||0),V=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let Y=(t?.discountType==="amount"?"amount":"percent")==="amount"?V:C*(V/100);(!Number.isFinite(Y)||Y<0)&&(Y=0),Y>C&&(Y=C);const O=Math.max(0,C-Y),U=Q===!0,ie=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",ne=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,he=ie&&ne>0?ne:0,B=Number((O*(he/100)).toFixed(2)),G=U?Number(((O+B)*He).toFixed(2)):0,de=Number((O+B+G).toFixed(2)),$e=Number((de-B-G-g).toFixed(2));k=[],k.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","سعر العميل للخدمات الإنتاجية"),value:S(C)}),Y>0&&k.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${S(Y)}`}),k.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:S(O)}),B>0&&k.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${S(B)}`}),G>0&&k.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${S(G)}`}),k.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:S($e)}),k.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:S(de)}),y=de}v=qe({totalAmount:y,paidAmount:b,paidPercent:h,history:fe}),w=at({manualStatus:Ge||"unpaid",paidAmount:v.paidAmount,paidPercent:v.paidPercent,totalAmount:y}),F=n(`projects.paymentStatus.${w}`,w==="paid"?"Paid":w==="partial"?"Partial":"Unpaid"),q=w==="paid"?"status-paid":w==="partial"?"status-partial":"status-unpaid",M=Number.isFinite(Number(v.paidAmount))?Number(v.paidAmount):0,R=Number.isFinite(Number(v.paidPercent))?Number(v.paidPercent):0,Z=Math.max(0,Number((y-M).toFixed(2))),_=S(M),K=`${j(R.toFixed(2))}%`,Le=S(Z);const xt=k.map(({icon:g,label:C,value:V})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${g} ${o(C)}</span>
      <span class="summary-details-value">${o(V)}</span>
    </div>
  `).join(""),Fe=n("projects.details.labels.code","رقم المشروع"),Ke=`
    <div class="project-details-code-badge" title="${o(Fe)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Fe)}
      </span>
      <span class="project-details-code-badge__value">${o(I)}</span>
    </div>
  `,Ye=[{icon:"👤",label:n("projects.details.client","العميل"),value:u},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:m},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:x},D?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:D}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:r},Ct("start",t.start),Ct("end",t.end)].filter(Boolean),Xe=n("projects.details.overview.heading","معلومات المشروع"),Ae=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Xe)}</h6>
      <ul class="project-details-outline__list">
        ${Ye.map(({icon:g,label:C,value:V,meta:le})=>`
          <li>
            <span class="project-details-outline__label">${o(g)} ${o(C)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${o(V)}</span>
              ${le?`<span class="project-details-outline__meta">${o(le)}</span>`:""}
            </span>
          </li>
        `).join("")}
      </ul>
    </div>
  `,Me=[`<span class="reservation-chip ${re}">${o(we)}</span>`,`<span class="reservation-chip ${ge}">${o(oe)}</span>`,`<span class="reservation-chip status-info">${o(je)}</span>`,`<span class="reservation-chip ${q}">${o(F)}</span>`,Je].filter(Boolean).join(""),Qe=n("projects.details.expensesTotal","إجمالي المصاريف"),W=n("projects.details.reservationsTotal","إجمالي الحجوزات"),Ze=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",S(J)),Re=an(Array.isArray(t.expenses)?t.expenses:[]);f.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${Me}</div>
        </div>
        <div class="project-details-header__code">
          ${Ke}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${Ae}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(n("projects.details.summary.title","ملخص مالي"))}</h6>
            ${xt}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.description","وصف المشروع"))}</h5>
      <p class="project-details-description">${o(i)}</p>
    </section>
    <section class="project-details-section">
      <h5>${o(Ze)}</h5>
      ${Re}
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.financialBreakdown","تفاصيل مالية"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(Qe)}</span>
          <strong>${S(J)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(W)}</span>
          <strong>${S(N)}</strong>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("reservations.paymentHistory.title","سجل الدفعات"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.total","الإجمالي الكلي"))}</span>
          <strong>${o(S(y))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.paid","المدفوع"))}</span>
          <strong>${o(_)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(K)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(Le)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${De}
      </div>
    </section>
    ${ya(t)}
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
  `,rn(t);const ee=f.detailsBody.querySelector("#project-details-export-btn");ee&&ee.addEventListener("click",async g=>{if(g.preventDefault(),ee.blur(),!ee.disabled){ee.disabled=!0;try{await Ha({project:t})}catch(C){console.error("❌ [projects/details] export project PDF failed",C),L(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{ee.disabled=!1}}}),f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl).show()}function an(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
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
    `}const a=e.map(s=>{const r=o(s?.label||""),l=S(Number(s?.amount)||0),i=S(Number(s?.sale_price??s?.salePrice??0));return`
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
  `}function nn({onOpenProject:e}){!f.focusCards||f.focusCards.dataset.listenerAttached==="true"||(f.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),cn(l);return}r==="view"?e?.(l):r==="highlight"&&sn(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),f.focusCards.dataset.listenerAttached="true")}function sn(e){if(!f.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=f.projectsTableBody.querySelector(t);if(!a){L(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function rn(e){if(!f.detailsBody)return;const t=f.detailsBody.querySelector('[data-action="create-reservation"]'),a=f.detailsBody.querySelector('[data-action="edit-project"]'),s=f.detailsBody.querySelector('[data-action="delete-project"]'),r=f.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(ut(e.id)||[]).some(u=>{const c=String(u?.status||u?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.disabled=!0,t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ يوجد حجز مرتبط بالفعل بهذا المشروع")):(t.disabled=!1,t.classList?.remove("disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",u=>{u.preventDefault(),Nt(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),Nt(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),Wt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await va(e.id),!T.projects.some(c=>String(c.id)===String(e.id))&&f.detailsModalEl&&window.bootstrap?.Modal.getInstance(f.detailsModalEl)?.hide()}finally{T.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const u=Oa("showReservationDetails");if(typeof u=="function")return u(i),!0;try{const c=await Ua("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const u=i.target.closest('[data-action="view-reservation"]');if(!u)return;const c=u.dataset.index||u.dataset.reservationIndex,m=Number.parseInt(c||"-1",10);if(!Number.isInteger(m)||m<0)return;await l(m)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const u=i.target.closest('[data-action="view-reservation"]');u&&(i.preventDefault(),u.click())})}}function Wt(e){if(!e||!f.detailsBody)return;const t=T.projects.find(d=>String(d.id)===String(e.id));if(!t)return;const a=T.customers.find(d=>String(d.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const s=Array.isArray(t.expenses)?t.expenses.map((d,x)=>({id:d?.id||`expense-${t.id}-${x}-${Date.now()}`,label:d?.label||"",amount:Number(d?.amount)||0,salePrice:Number.isFinite(Number(d?.sale_price??d?.salePrice))?Number(d?.sale_price??d?.salePrice):0})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((d,x)=>({type:d?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(d?.amount))?Number(d.amount):null,percentage:Number.isFinite(Number(d?.percentage))?Number(d.percentage):null,value:Number.isFinite(Number(d?.value))?Number(d.value):null,note:d?.note??null,recordedAt:d?.recordedAt??d?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${x}`})):[],l=r.reduce((d,x)=>d+(Number(x?.amount)||0),0),i=r.reduce((d,x)=>d+(Number(x?.percentage)||0),0),u=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,c=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(u>0||c>0)){const d=t.updatedAt??t.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(u)&&u>0?u:null,percentage:c,value:c,note:null,recordedAt:d,key:`legacy-payment-${t.id}-percent`}]:u>0&&(r=[{type:"amount",amount:u,percentage:null,value:u,note:null,recordedAt:d,key:`legacy-payment-${t.id}-amount`}]),l=r.reduce((x,D)=>x+(Number(D?.amount)||0),0),i=r.reduce((x,D)=>x+(Number(D?.percentage)||0),0),u=0,c=0}l>0&&Math.abs(u-l)<.01&&(u=0),i>0&&Math.abs(c-i)<.01&&(c=0);const m={expenses:s,payments:r,basePaidAmount:u,basePaidPercent:c};f.detailsBody.dataset.mode="edit",f.detailsBody.innerHTML=ln(t,m),on(t,m)}function on(e,t={expenses:[]}){const a=f.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",b=>{b.preventDefault(),ye(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),u=a.querySelector('[data-action="add-expense"]'),c=a.querySelector("#project-edit-expense-list"),m=a.querySelector('[name="project-start-date"]'),d=a.querySelector('[name="project-start-time"]'),x=a.querySelector('[name="project-end-date"]'),D=a.querySelector('[name="project-end-time"]'),E=a.querySelector('[name="project-payment-status"]'),I=a.querySelector("#project-edit-tax"),A=a.querySelector("#project-edit-company-share"),ae=a.querySelector("#project-edit-discount"),N=a.querySelector("#project-edit-discount-type"),$=a.querySelector("#project-edit-payment-progress-type"),H=a.querySelector("#project-edit-payment-progress-value"),Q=a.querySelector("#project-edit-payment-add"),J=a.querySelector("#project-edit-payment-history"),ue=a.querySelector("#project-edit-payment-summary"),ke=n("reservations.create.summary.currency","SR");let Pe=!1;const pe=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),me=()=>{const b=Number(e.equipmentEstimate)||0,h=Array.isArray(t.expenses)?t.expenses.reduce((_,K)=>_+(Number(K.amount)||0),0):0,y=Array.isArray(t.expenses)?Math.max(0,Math.round(t.expenses.reduce((_,K)=>_+Number(K?.salePrice??0),0)*100)/100):Math.max(0,Number(e?.servicesClientPrice??0)),v=N?.value==="amount"?"amount":"percent",w=j(ae?.value||"0");let F=Number.parseFloat(w);(!Number.isFinite(F)||F<0)&&(F=0);const q=I?.checked===!0,M=A?.checked===!0;let R=M?xa(A):null;(!Number.isFinite(R)||R<=0)&&(R=M?nt:null);const Z=Sa({equipmentEstimate:b,expensesTotal:h,servicesClientPrice:y,discountValue:F,discountType:v,applyTax:q,companyShareEnabled:M,companySharePercent:R});return{equipmentEstimate:b,expensesTotal:h,discountValue:F,discountTypeValue:v,applyTax:q,companyShareEnabled:M,companySharePercent:R,servicesClientPrice:y,finance:Z}},we=()=>{const b=me(),h=pe(),v=(ut(e.id)||[]).reduce((R,Z)=>R+(Number(Z?.totalAmount)||Yt(Z)||0),0),w=Number(b.finance?.taxableAmount||0),F=b.applyTax?Number(((w+v)*He).toFixed(2)):0,q=Number((w+v+F).toFixed(2)),M=qe({totalAmount:q,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:h});return{...b,combinedTotalWithTax:q,payments:h,progress:M}},jt=()=>{J&&(J.innerHTML=pn(pe()))},re=()=>{if(!ue)return;const{combinedTotalWithTax:b,progress:h}=we(),y=Number.isFinite(Number(b))?Number(b):0,v=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,w=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,F=Math.max(0,Math.round((y-v)*100)/100),q=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:S(y)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:S(v)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${j(w.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:S(F)}];ue.innerHTML=q.map(({label:M,value:R})=>`
        <div class="project-details-grid-item">
          <span>${o(M)}</span>
          <strong>${o(R)}</strong>
        </div>
      `).join("")},oe=(b="auto")=>{if(!E)return;const h=E.dataset?.userSelected==="true";if(b==="auto"&&h)return;const{finance:y,progress:v}=we(),w=at({manualStatus:h?E.value:e.paymentStatus||"unpaid",paidAmount:v.paidAmount,paidPercent:v.paidPercent,totalAmount:y.totalWithTax});h||(E.value=w)},ge=()=>{jt(),re(),oe("auto")},je=1e-4,Ge=()=>{const b=$?.value==="amount"?"amount":"percent",h=j(H?.value||"").replace("%","").trim();let y=Number.parseFloat(h);if(!Number.isFinite(y)||y<=0){L(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),H?.focus();return}const v=we(),w=Number.isFinite(Number(v.finance.totalWithTax))?Number(v.finance.totalWithTax):0;if(w<=0){L(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const F=Number(v.progress.paidAmount)||0,q=Number(v.progress.paidPercent)||0;let M=null,R=null;if(b==="percent"){const _=Math.max(0,100-q);if(_<=je){L(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>_){y=_;const K=j(y.toFixed(2));L(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",K))}R=Math.round(y*100)/100,w>0&&(M=Math.round(R/100*w*100)/100)}else{const _=Math.max(0,w-F);if(_<=je){L(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>_){y=_;const K=`${j(y.toFixed(2))} ${ke}`;L(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",K))}M=Math.round(y*100)/100,w>0&&(R=Math.round(M/w*100*100)/100)}const Z={type:b,amount:M??null,percentage:R??null,value:b==="amount"?M:R,note:null,recordedAt:new Date().toISOString()};t.payments=[...pe(),Z],H&&(H.value=""),$&&($.value="percent"),ge(),L(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},fe=b=>{!I||!A||Pe||(Pe=!0,b==="share"?A.checked?(I.checked||(I.checked=!0),tt(A)):I.checked&&(I.checked=!1):b==="tax"&&(I.checked?tt(A):A.checked&&(A.checked=!1)),Pe=!1)};function xe(){c&&(c.innerHTML=Gt(t.expenses))}xe(),ge(),ae&&!ae.dataset.listenerAttached&&(ae.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""),re(),oe("auto"))}),ae.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""))}),i.dataset.listenerAttached="true"),N&&!N.dataset.listenerAttached&&(N.addEventListener("change",()=>{re(),oe("auto")}),N.dataset.listenerAttached="true"),H&&!H.dataset.listenerAttached&&(H.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""))}),H.dataset.listenerAttached="true"),E&&!E.dataset.listenerAttached&&(E.addEventListener("change",()=>{E.dataset.userSelected="true"}),E.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""))}),l.dataset.listenerAttached="true"),A&&!A.dataset.listenerAttached&&(A.addEventListener("change",()=>{fe("share"),re(),oe("auto")}),A.dataset.listenerAttached="true"),I&&!I.dataset.listenerAttached&&(I.addEventListener("change",()=>{fe("tax"),re(),oe("auto")}),I.dataset.listenerAttached="true"),A?.checked&&tt(A),fe(A?.checked?"share":"tax"),re(),oe("auto"),u&&u.addEventListener("click",b=>{b.preventDefault();const h=r?.value.trim()||"",y=j(l?.value||"0"),v=Number(y),w=j(i?.value||"0"),F=Number(w);if(!h){L(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(v)||v<=0){L(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:h,amount:v,salePrice:Number.isFinite(F)&&F>0?F:0}),r&&(r.value=""),l&&(l.value=""),i&&(i.value=""),xe(),re(),oe("auto")}),c&&c.addEventListener("click",b=>{const h=b.target.closest('[data-action="remove-expense"]');if(!h)return;const{id:y}=h.dataset;t.expenses=t.expenses.filter(v=>String(v.id)!==String(y)),xe(),re(),oe("auto")}),Q&&!Q.dataset.listenerAttached&&(Q.addEventListener("click",b=>{b.preventDefault(),Ge()}),Q.dataset.listenerAttached="true"),J&&!J.dataset.listenerAttached&&(J.addEventListener("click",b=>{const h=b.target.closest('[data-action="remove-payment"]');if(!h)return;const y=Number.parseInt(h.dataset.index||"-1",10);if(!Number.isInteger(y)||y<0)return;const v=pe();if(y>=v.length)return;const w=v.filter((F,q)=>q!==y);t.payments=w,ge(),L(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),J.dataset.listenerAttached="true"),a.addEventListener("submit",async b=>{if(b.preventDefault(),a.dataset.submitting==="true")return;const h=a.querySelector('[name="project-title"]'),y=a.querySelector('[name="project-type"]'),v=a.querySelector('[name="project-description"]'),w=h?.value.trim()||"",F=y?.value||"",q=m?.value.trim()||"",M=d?.value.trim()||"",R=v?.value.trim()||"",Z=(E?.value||"unpaid").toLowerCase(),_=["paid","partial"].includes(Z)?Z:"unpaid";if(!w||!F||!q){L(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),h?.focus();return}const K=x?.value.trim()||"",Le=D?.value.trim()||"",De=Tt(q,M),Te=K?Tt(K,Le):"",Je=new Date(De),k=Te?new Date(Te):null;if(k&&Je>k){L(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),x?.focus();return}if(T.projects.findIndex(U=>String(U.id)===String(e.id))===-1){L(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Fe=me(),{equipmentEstimate:Ke,discountValue:Ye,discountTypeValue:Xe,applyTax:Ae,companyShareEnabled:Me,companySharePercent:Qe,finance:W}=Fe,Ze=$?.value==="amount"?"amount":"percent",Re=j(H?.value||"");let ee=Re?Number.parseFloat(Re):null,g=[...pe()];if(Number.isFinite(ee)&&ee>0&&Number.isFinite(Number(W.totalWithTax))){const U=qe({totalAmount:W.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:g}),ie=new Date().toISOString();if(Ze==="percent"){const ne=Math.max(0,100-(U.paidPercent||0));if(ne>je){const he=Math.min(ee,ne),B=Math.round(he*100)/100,G=W.totalWithTax>0?Math.round(B/100*W.totalWithTax*100)/100:null;g=[...g,{type:"percent",amount:G,percentage:B,value:B,note:null,recordedAt:ie}]}}else{const ne=Math.max(0,W.totalWithTax-(U.paidAmount||0));if(ne>je){const he=Math.min(ee,ne),B=Math.round(he*100)/100,G=W.totalWithTax>0?Math.round(B/W.totalWithTax*100*100)/100:null;g=[...g,{type:"amount",amount:B,percentage:G,value:B,note:null,recordedAt:ie}]}}g!==t.payments&&(t.payments=g,ge()),H&&(H.value=""),$&&($.value="percent"),ee=null}const C=qe({totalAmount:W.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:g}),V=E?.dataset?.userSelected==="true",le=at({manualStatus:V?_:e.paymentStatus||_,paidAmount:C.paidAmount,paidPercent:C.paidPercent,totalAmount:W.totalWithTax}),Y=V?_:le;!V&&E&&(E.value=Y),E?.dataset&&delete E.dataset.userSelected,t.payments=g;const O=Va({projectCode:e.projectCode,title:w,type:F,clientId:e.clientId,clientCompany:e.clientCompany,description:R,start:De,end:Te||null,applyTax:Ae,paymentStatus:Y,equipmentEstimate:Ke,expenses:t.expenses,servicesClientPrice:context.servicesClientPrice,discount:Ye,discountType:Xe,companyShareEnabled:Me&&Ae,companySharePercent:Me&&Ae?Qe:null,companyShareAmount:W.companyShareAmount,taxAmount:W.taxAmount,totalWithTax:W.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:ga(e),paidAmount:C.paidAmount,paidPercentage:C.paidPercent,paymentProgressType:C.paymentProgressType,paymentProgressValue:C.paymentProgressValue,payments:g});a.dataset.submitting="true";try{const U=await qt(e.projectId??e.id,O),ie=U?.projectId??U?.id??e.id;await ja(ie,Y),T.projects=bt(),T.reservations=mt(),L(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),Se(),Ne(),Ce(),ye(e.id)}catch(U){console.error("❌ [projects] Failed to update project from details view",U);const ie=ze(U)?U.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");L(ie,"error")}finally{delete a.dataset.submitting}})}function Nt(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description,fromProjectForm:!0,draftStorageKey:"projects:create:draft",returnUrl:`projects.html?project=${encodeURIComponent(e.id)}&linked=1#projects-section`};dt({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function cn(e){if(!e)return;const t=T.projects.find(a=>String(a.id)===String(e));if(!t){L(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){L(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await qt(t.projectId??t.id,{confirmed:!0});const a=await fa(e);T.projects=bt(),T.reservations=mt(),Se(),Ne(),Ce(),f.detailsModalEl&&f.detailsModalEl.classList.contains("show")&&f.detailsBody?.dataset.projectId===String(e)&&ye(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),L(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=ze(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");L(s,"error")}}function ln(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=wt(e.start||""),{date:r,time:l}=wt(e.end||""),i=e.applyTax===!0||e.applyTax==="true";typeof e.paymentStatus=="string"&&e.paymentStatus.toLowerCase();const u=e.discountType==="amount"?"amount":"percent",c=j(String(e.discount??e.discountValue??0));j(String(e.servicesClientPrice??e.services_client_price??0));const m=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??nt,d=Number.parseFloat(j(String(m))),x=Number.isFinite(d)&&d>0?d:nt,D=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(d)&&d>0;return`
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${o(n("projects.form.labels.title","عنوان المشروع"))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${o(e.title||"")}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${o(n("projects.form.labels.type","نوع المشروع"))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${dn(e.type)}
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
          ${Gt(t.expenses)}
        </div>
      </section>

      <!-- Services block placed directly under project description -->
      

      <div class="row g-3 align-items-start mt-1">
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label" for="project-edit-discount">${o(n("projects.form.labels.discount","الخصم"))}</label>
          <div class="input-group project-edit-input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select project-edit-select-xs">
              <option value="percent" ${u==="percent"?"selected":""}>${o(n("projects.form.discount.percent","٪ نسبة"))}</option>
              <option value="amount" ${u==="amount"?"selected":""}>${o(n("projects.form.discount.amount","💵 مبلغ"))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control project-edit-input-xs" value="${o(c)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label d-block" for="project-edit-company-share">${o(n("projects.form.labels.companyShare","نسبة الشركة والضريبة"))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(x))}" ${D?"checked":""}>
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
  `}function dn(e){return["commercial","coverage","photography","social"].map(a=>{const s=Kt(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(s)}</option>`}).join("")}function Gt(e=[]){if(!Array.isArray(e)||e.length===0){const i=o(n("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"));return`
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
      </div>`}const t=o(n("actions.remove","إزالة")),a=e.map(i=>{const u=o(i?.label||""),c=o(S(i?.amount||0)),m=o(S(i?.salePrice||i?.sale_price||0)),d=o(String(i?.id||""));return`
      <tr>
        <td>${u}</td>
        <td>${c}</td>
        <td>${m}</td>
        <td><button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${d}" aria-label="${t}">✖</button></td>
      </tr>`}).join(""),s=e.reduce((i,u)=>i+(Number(u?.salePrice??u?.sale_price)||0),0),r=o(S(s)),l=o(n("projects.expenses.table.totalSale","مجموع سعر البيع"));return`
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
    </div>`}function un(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(S(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${j(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?j(pt(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(j(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function pn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(S(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${j(Number(a.percentage).toFixed(2))}%`:"—",u=a?.recordedAt?j(pt(a.recordedAt)):"—",c=a?.note?o(j(a.note)):"",m=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
      <tr>
        <td>${o(r)}</td>
        <td>${l}</td>
        <td>${i}</td>
        <td>${u}</td>
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
  `}function mn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(fn).filter(Boolean);if(a.length>0)return a;const s=Ve(e.paidPercent??e.paid_percent),r=Ve(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Jt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function fn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=Ve(e.amount??(a==="amount"?e.value:null)),r=Ve(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,u=Jt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:u}}function Ve(e){if(e==null||e==="")return null;const t=j(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Jt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Ct(e,t){if(!t)return null;const{date:a,time:s}=hn(pt(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية الحجز"):n("projects.details.labels.end","نهاية الحجز");return{icon:l,label:i,value:a,meta:s}}function hn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Kt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function Yt(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(j(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=Bt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(j(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function vt(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function bn(){return vt(st)}function yn(){return vt(rt)}function vn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[st,rt,"linked"].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let m=!1;[st,rt,"linked"].forEach(d=>{c.has(d)&&(c.delete(d),m=!0)}),m&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),u=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",u)}catch{}}function gn(){const e=bn(),t=yn(),a=vt("linked");e&&(T.pendingProjectDetailId=e),t&&(T.pendingProjectEditId=t,T.pendingProjectDetailId||(T.pendingProjectDetailId=t)),a!=null&&String(a)!==""&&String(a)!=="0"&&String(a).toLowerCase()!=="false"&&(T.pendingLinkedToast=!0),(e||t)&&vn()}function jn(){if(!T.pendingProjectDetailId)return;const e=T.pendingProjectDetailId,t=String(e),a=T.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;T.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(ye(s),T.pendingLinkedToast){T.pendingLinkedToast=!1;try{L(n("projects.toast.linkedReservationCreated","✅ تم ربط الحجز بالمشروع"))}catch{}}if(T.pendingProjectEditId!=null){const r=String(T.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&(T.pendingProjectEditId=null,setTimeout(()=>Wt(a),0))}}function xn(){document.addEventListener("DOMContentLoaded",()=>{tn(),gn(),Pa(),It(),wa(),Xa(),Qa(),Ta(),Aa(),$a(),Ea(),Na(),Ca(),ka({onViewDetails:ye}),nn({onOpenProject:ye}),La(),Sn()}),document.addEventListener("language:changed",kt),document.addEventListener("language:translationsReady",kt),document.addEventListener("customers:changed",Pn),document.addEventListener("technicians:updated",wn),document.addEventListener("reservations:changed",()=>Da(ye)),document.addEventListener(ca.USER_UPDATED,()=>{Se()})}async function Sn(){try{await Ht({suppressError:!0}),await Vt()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");L(t,"error")}finally{Fa(),Ue(),Ma(),_t(),Se(),Ce(),Ne(),jn()}}function kt(){Ue(),_t(),Se(),Ce(),Ne(),It()}function Pn(){Ra(),Ue()}function wn(){Ia(),Ue()}la();da();ua();za();xn();document.addEventListener("DOMContentLoaded",()=>{ma(),pa()});const it=.15,_e={},Tn="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let Ee=0;const P={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Be=Object.freeze({projects:`
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
  `});let X=null;const Xt=["upcoming","ongoing","completed"];async function An({forceProjects:e=!1}={}){try{await Ht({suppressError:!0}),await Wa({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),ze(t)&&console.warn("Projects API error:",t.message)}ta()}async function $n(){Cn(),Zt(),await En();try{await An({forceProjects:!0}),na(),Rn(),se()}finally{ea()}document.addEventListener("language:changed",_n),document.addEventListener("projects:changed",()=>{ct().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{ct().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",Bn)}document.addEventListener("DOMContentLoaded",$n);async function En(){if(X)return X;if(typeof window>"u")return null;if(window.ApexCharts)return X=window.ApexCharts,X;try{await Nn(Tn),X=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),X=null}return X}function Nn(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function Cn(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function Qt(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function Zt(){Ee+=1,Ee===1&&Qt(!0)}function ea(){Ee=Math.max(0,Ee-1),Ee===0&&Qt(!1)}function ta(){const{customers:e=[]}=Rt();P.customers=Array.isArray(e)?e:[],P.reservations=mt();const t=new Map(P.customers.map(s=>[String(s.id),s])),a=bt();P.projects=Array.isArray(a)?a.map(s=>kn(s,t)):[],P.totalProjects=P.projects.length}function kn(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=Ln(e.id),l=r.reduce((ae,N)=>ae+Dn(N),0),i=Fn(e),u=Number(e?.equipmentEstimate)||0,c=Number((u+i).toFixed(2)),m=e?.applyTax===!0||e?.applyTax==="true",d=m?Number((c*it).toFixed(2)):0,x=m?Number(((c+l)*it).toFixed(2)):0,D=Number((c+l+x).toFixed(2)),E=Mn(e),I=e.start?new Date(e.start):null,A=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:I,end:A,applyTax:m,status:E,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:d,combinedTaxAmount:x,overallTotal:D,unpaidValue:a==="paid"?0:D,reservationsCount:r.length}}function Ln(e){return Array.isArray(P.reservations)?P.reservations.filter(t=>String(t.projectId)===String(e)):[]}function Dn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(j(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=Bt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(j(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Fn(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function Mn(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function Rn(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{P.filters.search=p.search.value.trim(),se()},180)})}p.payment&&(p.payment.value=P.filters.payment,p.payment.addEventListener("change",()=>{P.filters.payment=p.payment.value||"all",se()})),p.dateRange&&(p.dateRange.addEventListener("change",In),p.dateRange.value=P.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{P.filters.startDate=p.startDate.value,P.filters.range==="custom"&&se()}),p.endDate&&p.endDate.addEventListener("change",()=>{P.filters.endDate=p.endDate.value,P.filters.range==="custom"&&se()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(P.filters.range!=="custom"){se();return}P.filters.startDate=p.startDate?.value||"",P.filters.endDate=p.endDate?.value||"",se()})}function In(e){const t=e.target.value;P.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),P.filters.startDate="",P.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),se())}async function ct(){Zt();try{await Promise.all([Vt(),Ba()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),ze(e)&&console.warn("Projects API error:",e.message)}finally{ta(),se(),ea()}}function _n(){na(),se()}function Bn(e){e.key&&!["projects","reservations","customers"].includes(e.key)||ct().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function se(){const e=qn();gt(),On(e),Gn(e),Jn(e),Kn(e),Yn(e),Xn(e)}function qn(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=P.filters,i=aa(e),u=new Date,c=Number(s);let m=null;if(s==="custom"){m=r?new Date(r):null;const d=l?new Date(l):null;return P.projects.filter(x=>!Lt(x,t)||!Dt(x,a)||!Ft(x,i)?!1:Vn(x.start,m,d))}return s!=="all"&&Number.isFinite(c)&&(m=new Date,m.setDate(u.getDate()-c)),P.projects.filter(d=>!Lt(d,t)||!Dt(d,a)||!Ft(d,i)?!1:s==="all"?!0:Hn(d.start,m,u))}function Lt(e,t){return t.includes(e.status)}function Dt(e,t){return t==="all"?!0:e.paymentStatus===t}function Ft(e,t){return t?aa([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function Hn(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function Vn(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function aa(e){return e?j(String(e)).toLowerCase().trim():""}function On(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((i,u)=>i+u.overallTotal,0),s=e.reduce((i,u)=>i+u.unpaidValue,0),r=e.reduce((i,u)=>i+u.expensesTotal,0),l=[{icon:Be.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:lt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Be.value,label:n("projects.reports.kpi.totalValue","Total value"),value:te(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Be.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:te(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Be.expenses,label:n("projects.reports.kpi.expenses","خدمات إنتاجية (التكلفة)"),value:te(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];p.kpiGrid.innerHTML=l.map(({icon:i,label:u,value:c,meta:m})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${z(u)}</p>
        <p class="reports-kpi-value">${z(c)}</p>
        <span class="reports-kpi-meta">${z(m)}</span>
      </div>
    </div>
  `).join(""),Un(e)}function Un(e){try{const t=zn(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:te(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:te(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:te(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:te(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:te(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:te(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","مصروفات المشروع","Project expenses"),value:`−${te(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:te(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:u})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${z(i)}</span>
            <span class="reports-kpi-detail-value">${z(u)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:p.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function zn(e){const t=new Set(e.map(N=>String(N.id))),a=P.reservations.filter(N=>N.projectId!=null&&t.has(String(N.projectId)));let s=0,r=0,l=0,i=0,u=0,c=0,m=0;a.forEach(N=>{const $=Ga(N);s+=$.finalTotal||0,r+=$.equipmentTotal||0,l+=$.crewTotal||0,i+=$.crewCostTotal||0,u+=$.companyShareAmount||0,c+=$.taxAmount||0,m+=$.netProfit||0});const d=e.reduce((N,$)=>N+(Number($.expensesTotal)||0),0),x=e.reduce((N,$)=>N+(Number($.raw?.equipmentEstimate)||0),0),D=e.reduce((N,$)=>{const H=$.applyTax===!0,Q=(Number($.raw?.equipmentEstimate)||0)+(Number($.expensesTotal)||0),J=H?Q*it:0;return N+J},0),E=s+x+D,I=r+x,A=c+D,ae=m-d;return{grossRevenue:E,companyShareTotal:u,taxTotal:A,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:I,projectExpensesTotal:d,netProfit:ae}}function na(){if(!p.statusChips)return;const e=Xt.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${z(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",Wn),p.statusChips.dataset.listenerAttached="true"),gt()}function Wn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(P.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&Xt.forEach(r=>s.add(r)),P.filters.statuses=Array.from(s),gt(),se()}function gt(){if(!p.statusChips)return;const e=new Set(P.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Gn(e){if(!X)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(m=>m.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,m)=>c+m,0)>0?s:[],u={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>ve(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};We("status",t,u)}function Jn(e){if(!X)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(Zn(),{month:"short",year:"numeric"});e.forEach(d=>{if(!d.start||Number.isNaN(d.start.getTime()))return;const x=`${d.start.getFullYear()}-${d.start.getMonth()+1}`,D=a.get(x)||{total:0,label:s.format(d.start)};D.total+=d.overallTotal,a.set(x,D)});const l=Array.from(a.keys()).sort((d,x)=>{const[D,E]=d.split("-").map(Number),[I,A]=x.split("-").map(Number);return D===I?E-A:D-I}).slice(-12),i=l.map(d=>a.get(d)?.label||d),u=l.map(d=>Math.round(a.get(d)?.total||0)),c=u.length?[{name:n("projects.reports.datasets.value","Total value"),data:u}]:[],m={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:d=>ve(d)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:d=>ve(d)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("timeline",t,m)}function Kn(e){if(!X)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((m,d)=>d.overallTotal-m.overallTotal).slice(0,6),s=a.map(m=>m.title||m.projectCode),r=a.map(m=>Math.round(m.overallTotal)),l=a.map(m=>Math.round(m.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","خدمات إنتاجية (التكلفة)"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:m=>ve(m)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:m=>ve(m)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("expenses",t,c)}function Yn(e){if(!X)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const m=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),d=a.get(m)||0;a.set(m,d+c.overallTotal)});const s=Array.from(a.entries()).sort((c,m)=>m[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],u={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>ve(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>ve(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("clients",t,u)}function We(e,t,a={}){if(!X||!t)return;if(_e[e]){try{_e[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete _e[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new X(t,s);_e[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function Xn(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=Qn(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${z(a.clientName)} <small class="text-muted">${z(a.clientCompany)}</small>`:z(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${z(a.title||a.projectCode)}</span>
            <small class="text-muted">${z(`#${a.projectCode}`)}</small>
          </div>
        </td>
        <td>${i}</td>
        <td>${z(r)}</td>
        <td>${z(s)}</td>
        <td>${z(te(a.overallTotal))}</td>
        <td>${z(l)}</td>
      </tr>
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",lt(e.length)).replace("{total}",lt(P.totalProjects))}}function Qn(e,t){if(!e&&!t)return"—";const a=e?Pt(e.toISOString()):"—",s=t?Pt(t.toISOString()):"—";return t?`${a} → ${s}`:a}function te(e){const t=Number(e)||0,s=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${j(r)} SR`}function lt(e){const a=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return j(new Intl.NumberFormat(a).format(e))}function ve(e){const a=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return j(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function Zn(){return Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function z(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
