import{v as oa,w as ia,x as Ft,o as ut,s as I,t as n,l as Rt,n as x,A as ca,e as la,m as da,h as ua,i as pa,f as St,g as qe}from"./auth.CFmUxZww.js";/* empty css              */import{i as ma}from"./dashboardShell.CpG9SyUN.js";import{d as f,r as xe,a as $e,u as Ee,s as L,b as fa,f as pt,h as ha,i as ba,j as o,k as w,l as ya,m as mt,n as va,o as wt,e as tt,p as Pt,q as ga,t as ja,g as xa,c as Sa,v as wa,w as It,x as Pa,y as Ta,z as Aa,A as $a,B as Ea,C as Na,D as Ca,E as La,F as Da,G as ka,H as Fa,I as He,J as Ra,K as Mt,L as Ia,M as Ma}from"./form.DEOgcOqj.js";import"./customers.xSpaFc27.js";import{g as ft,b as _a,o as _e,q as at,a as _t,D as nt,l as Ba}from"./reservationsService.BuzBSxm1.js";import{P as ht,l as bt,n as Tt,u as Bt,o as yt,p as Ve,t as st,v as qa,x as Ha,i as Va,h as Oa,w as Ua,y as rt,z as ot,e as qt,A as Ht,B as za,C as Wa}from"./controller.Dp7EiJmF.js";import{a as Ga}from"./calculations.JNZK6KVD.js";let At=null;function Ja(e){e&&Vt()!==e&&ut({[ht]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Vt(){return Ft()?.[ht]||""}function Ot(e){e&&it()!==e&&ut({[bt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function it(){return Ft()?.[bt]||""}function Ka(e){if(!e)return"";const t=e.trim();return t?Object.values(Tt).includes(t)?t:Tt[t]||"":""}function Ya(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Ka(t);if(a)return a}}catch{}return""}function Ut(e,t){!e||!f.tabPanes||!f.tabButtons||(f.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),f.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Ja(e))}function Xa(){if(!f.tabButtons||!f.tabButtons.length)return;f.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Ut(r,a),r==="projects-section"&&(L.filters.search="",f.search&&(f.search.value=""),xe(),$e(),Ee()))}),a.dataset.tabListenerAttached="true")});const e=Vt(),t=e&&f.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function vt(e,t){!e||!f.projectSubTabButtons||!f.projectSubTabPanes||(f.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),f.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function Qa(){!f.projectSubTabButtons||!f.projectSubTabButtons.length||(f.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(vt(a,e),Ot(a))}),e.dataset.tabListenerAttached="true")}),Za())}function Za(){const t=Ya()||it();if(!t)return;const a=f.projectSubTabButtons?.[0],s=f.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==it()&&Ot(r),vt(r,s))}function en(){return f.tabButtons?f.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function $t(e={}){if(e){if(f.tabButtons&&f.tabButtons.length){const a=f.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[ht];if(s&&s!==a){const r=f.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Ut(s,r)}}if(f.projectSubTabButtons&&f.projectSubTabButtons.length&&en()){const a=f.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[bt];if(s&&s!==a){const r=f.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&vt(s,r)}}}}function tn(){At||(At=oa(e=>{$t(e)})),ia().then(e=>{$t(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function fe(e){const t=L.projects.find(T=>String(T.id)===String(e));if(!t||!f.detailsBody)return;f.detailsBody.dataset.mode="view",f.detailsBody.dataset.projectId=String(t.id);const s=(L.customers.length?L.customers:Rt().customers||[]).find(T=>String(T.id)===String(t.clientId)),r=Jt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),d=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",p=c?x(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),h=s?.email??t.clientEmail??t.customerEmail??"",E=h?String(h).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),y=(t.clientCompany||s?.companyName||"").trim(),g=t.projectCode||`PRJ-${x(String(t.id))}`,$=x(g),A=pt(t.id),K=A.reduce((T,R)=>T+Kt(R),0),N=Number(K.toFixed(2)),C=A.length,{subtotal:q,applyTax:_,expensesTotal:ee}=ha(t),te=Number(t?.servicesClientPrice??t?.services_client_price??0),be=q,Ne=_?Number(((be+N)*st).toFixed(2)):0,ye=Number((be+N+Ne).toFixed(2)),ae=ba(t),Ce=n(`projects.status.${ae}`,qa[ae]||ae),Ue={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"}[ae]||"status-confirmed",ne=_?n("projects.details.chips.vatOn","شامل الضريبة 15٪"):n("projects.details.chips.vatOff","غير شامل الضريبة"),se=_?"status-paid":"status-unpaid",ve=n("projects.details.chips.reservations","{count} حجوزات").replace("{count}",x(String(C))),ge=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",Se=mn(t),je=Se.length>0,we=je?0:Number(t.paidAmount)||0,v=je?0:Number(t.paidPercent)||0;let m=ye,b,j,S,D,M,F,k,Y,B,z;const ue=un(Se),De=n("projects.focus.confirmed","✅ مشروع مؤكد"),Pe=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(De)}</span>`:"";let H=[];if(C>0){const T=A.reduce((Re,re)=>{const ra=Array.isArray(re.items)?re.items:[],xt=Array.isArray(re.crewAssignments)?re.crewAssignments:[],me=xt.length?xt:Array.isArray(re.technicians)?re.technicians:[],et=_a({items:ra,technicianIds:Array.isArray(me)&&!me.length?me:[],crewAssignments:Array.isArray(me)&&me.length&&typeof me[0]=="object"?me:[],discount:re.discount??0,discountType:re.discountType||"percent",applyTax:!1,start:re.start,end:re.end,companySharePercent:null});return Re.equipment+=Number(et.equipmentTotal||0),Re.crew+=Number(et.crewTotal||0),Re.crewCost+=Number(et.crewCostTotal||0),Re},{equipment:0,crew:0,crewCost:0}),R=Number(ee||0),V=Number((T.equipment+T.crew+te).toFixed(2)),ie=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let X=(t?.discountType==="amount"?"amount":"percent")==="amount"?ie:V*(ie/100);(!Number.isFinite(X)||X<0)&&(X=0),X>V&&(X=V);const Qe=_===!0,W=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",ce=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,pe=W&&ce>0?ce:0,le=Math.max(0,V-X),G=Number((le*(pe/100)).toFixed(2)),de=Qe?Number(((le+G)*st).toFixed(2)):0,Ze=Number((le+G+de).toFixed(2)),sa=Number((Ze-G-de-R-T.crewCost).toFixed(2));T.equipment>0&&H.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:w(T.equipment)}),T.crew>0&&H.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:w(T.crew)}),T.crewCost>0&&H.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:w(T.crewCost)}),R>0&&H.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة خدمات الإنتاجية"),value:w(R)}),te>0&&H.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","سعر العميل للخدمات الإنتاجية"),value:w(te)}),X>0&&H.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${w(X)}`}),H.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:w(le)}),G>0&&H.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${w(G)}`}),de>0&&H.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${w(de)}`}),H.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:w(sa)}),H.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:w(Ze)}),m=Ze}else H=[{icon:"💼",label:n("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:w(be)},{icon:"🔗",label:n("projects.details.summary.reservationsTotal","إجمالي المعدات / طاقم العمل"),value:w(N)},{icon:"🧮",label:n("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:w(Ne)},{icon:"💰",label:n("projects.details.summary.overallTotal","الإجمالي الكلي"),value:w(ye)}];b=_e({totalAmount:m,paidAmount:we,paidPercent:v,history:Se}),j=at({manualStatus:ge||"unpaid",paidAmount:b.paidAmount,paidPercent:b.paidPercent,totalAmount:m}),S=n(`projects.paymentStatus.${j}`,j==="paid"?"Paid":j==="partial"?"Partial":"Unpaid"),D=j==="paid"?"status-paid":j==="partial"?"status-partial":"status-unpaid",M=Number.isFinite(Number(b.paidAmount))?Number(b.paidAmount):0,F=Number.isFinite(Number(b.paidPercent))?Number(b.paidPercent):0,k=Math.max(0,Number((m-M).toFixed(2))),Y=w(M),B=`${x(F.toFixed(2))}%`,z=w(k);const ke=H.map(({icon:T,label:R,value:V})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${T} ${o(R)}</span>
      <span class="summary-details-value">${o(V)}</span>
    </div>
  `).join(""),ze=n("projects.details.labels.code","رقم المشروع"),We=`
    <div class="project-details-code-badge" title="${o(ze)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(ze)}
      </span>
      <span class="project-details-code-badge__value">${o($)}</span>
    </div>
  `,Ge=[{icon:"👤",label:n("projects.details.client","العميل"),value:d},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:p},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:E},y?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:y}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:r},Nt("start",t.start),Nt("end",t.end)].filter(Boolean),Je=n("projects.details.overview.heading","معلومات المشروع"),Ke=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Je)}</h6>
      <ul class="project-details-outline__list">
        ${Ge.map(({icon:T,label:R,value:V,meta:ie})=>`
          <li>
            <span class="project-details-outline__label">${o(T)} ${o(R)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${o(V)}</span>
              ${ie?`<span class="project-details-outline__meta">${o(ie)}</span>`:""}
            </span>
          </li>
        `).join("")}
      </ul>
    </div>
  `,Te=[`<span class="reservation-chip ${Ue}">${o(Ce)}</span>`,`<span class="reservation-chip ${se}">${o(ne)}</span>`,`<span class="reservation-chip status-info">${o(ve)}</span>`,`<span class="reservation-chip ${D}">${o(S)}</span>`,Pe].filter(Boolean).join(""),Fe=n("projects.details.expensesTotal","إجمالي المصاريف"),Ye=n("projects.details.reservationsTotal","إجمالي الحجوزات"),U=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",w(ee)),Xe=an(Array.isArray(t.expenses)?t.expenses:[]);f.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${Te}</div>
        </div>
        <div class="project-details-header__code">
          ${We}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${Ke}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(n("projects.details.summary.title","ملخص مالي"))}</h6>
            ${ke}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.description","وصف المشروع"))}</h5>
      <p class="project-details-description">${o(i)}</p>
    </section>
    <section class="project-details-section">
      <h5>${o(U)}</h5>
      ${Xe}
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.financialBreakdown","تفاصيل مالية"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(Fe)}</span>
          <strong>${w(ee)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(Ye)}</span>
          <strong>${w(N)}</strong>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("reservations.paymentHistory.title","سجل الدفعات"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.total","الإجمالي الكلي"))}</span>
          <strong>${o(w(m))}</strong>
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
          <strong>${o(z)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${ue}
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
  `,rn(t);const oe=f.detailsBody.querySelector("#project-details-export-btn");oe&&oe.addEventListener("click",async T=>{if(T.preventDefault(),oe.blur(),!oe.disabled){oe.disabled=!0;try{await Ha({project:t})}catch(R){console.error("❌ [projects/details] export project PDF failed",R),I(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{oe.disabled=!1}}}),f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl).show()}function an(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
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
    `}const a=e.map(s=>{const r=o(s?.label||""),l=w(Number(s?.amount)||0),i=w(Number(s?.sale_price??s?.salePrice??0));return`
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
  `}function nn({onOpenProject:e}){!f.focusCards||f.focusCards.dataset.listenerAttached==="true"||(f.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),cn(l);return}r==="view"?e?.(l):r==="highlight"&&sn(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),f.focusCards.dataset.listenerAttached="true")}function sn(e){if(!f.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=f.projectsTableBody.querySelector(t);if(!a){I(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function rn(e){if(!f.detailsBody)return;const t=f.detailsBody.querySelector('[data-action="create-reservation"]'),a=f.detailsBody.querySelector('[data-action="edit-project"]'),s=f.detailsBody.querySelector('[data-action="delete-project"]'),r=f.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(pt(e.id)||[]).some(d=>{const c=String(d?.status||d?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.disabled=!0,t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ يوجد حجز مرتبط بالفعل بهذا المشروع")):(t.disabled=!1,t.classList?.remove("disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",d=>{d.preventDefault(),Et(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),Et(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),zt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await va(e.id),!L.projects.some(c=>String(c.id)===String(e.id))&&f.detailsModalEl&&window.bootstrap?.Modal.getInstance(f.detailsModalEl)?.hide()}finally{L.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const d=Oa("showReservationDetails");if(typeof d=="function")return d(i),!0;try{const c=await Ua("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const d=i.target.closest('[data-action="view-reservation"]');if(!d)return;const c=d.dataset.index||d.dataset.reservationIndex,p=Number.parseInt(c||"-1",10);if(!Number.isInteger(p)||p<0)return;await l(p)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const d=i.target.closest('[data-action="view-reservation"]');d&&(i.preventDefault(),d.click())})}}function zt(e){if(!e||!f.detailsBody)return;const t=L.projects.find(y=>String(y.id)===String(e.id));if(!t)return;const a=L.customers.find(y=>String(y.id)===String(t.clientId)),s=a?.customerName||a?.name||t.clientName||t.customerName||"",r=t.clientCompany||a?.companyName||a?.company||"",l=Array.isArray(t.expenses)?t.expenses.map((y,g)=>({id:y?.id||`expense-${t.id}-${g}-${Date.now()}`,label:y?.label||"",amount:Number(y?.amount)||0})):[];let i=Array.isArray(t.paymentHistory)?t.paymentHistory.map((y,g)=>({type:y?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(y?.amount))?Number(y.amount):null,percentage:Number.isFinite(Number(y?.percentage))?Number(y.percentage):null,value:Number.isFinite(Number(y?.value))?Number(y.value):null,note:y?.note??null,recordedAt:y?.recordedAt??y?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${g}`})):[],d=i.reduce((y,g)=>y+(Number(g?.amount)||0),0),c=i.reduce((y,g)=>y+(Number(g?.percentage)||0),0),p=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,h=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!i.length&&(p>0||h>0)){const y=t.updatedAt??t.createdAt??new Date().toISOString();h>0?i=[{type:"percent",amount:Number.isFinite(p)&&p>0?p:null,percentage:h,value:h,note:null,recordedAt:y,key:`legacy-payment-${t.id}-percent`}]:p>0&&(i=[{type:"amount",amount:p,percentage:null,value:p,note:null,recordedAt:y,key:`legacy-payment-${t.id}-amount`}]),d=i.reduce((g,$)=>g+(Number($?.amount)||0),0),c=i.reduce((g,$)=>g+(Number($?.percentage)||0),0),p=0,h=0}d>0&&Math.abs(p-d)<.01&&(p=0),c>0&&Math.abs(h-c)<.01&&(h=0);const E={clientName:s,clientCompany:r,expenses:l,payments:i,basePaidAmount:p,basePaidPercent:h};f.detailsBody.dataset.mode="edit",f.detailsBody.innerHTML=ln(t,E),on(t,E)}function on(e,t={expenses:[]}){const a=f.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",v=>{v.preventDefault(),fe(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),d=a.querySelector('[data-action="add-expense"]'),c=a.querySelector("#project-edit-expense-list"),p=a.querySelector('[name="project-start-date"]'),h=a.querySelector('[name="project-start-time"]'),E=a.querySelector('[name="project-end-date"]'),y=a.querySelector('[name="project-end-time"]'),g=a.querySelector('[name="project-payment-status"]'),$=a.querySelector("#project-edit-tax"),A=a.querySelector("#project-edit-company-share"),K=a.querySelector("#project-edit-discount"),N=a.querySelector("#project-edit-discount-type"),C=a.querySelector("#project-edit-payment-progress-type"),q=a.querySelector("#project-edit-payment-progress-value"),_=a.querySelector("#project-edit-services-client-price"),ee=a.querySelector("#project-edit-payment-add"),te=a.querySelector("#project-edit-payment-history"),be=a.querySelector("#project-edit-payment-summary"),Ne=n("reservations.create.summary.currency","SR");let ye=!1;const ae=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments);if(_&&!_.dataset.normalizeAttached&&(_.addEventListener("input",v=>{const m=v.target;if(!(m instanceof HTMLInputElement))return;const b=m.selectionStart,j=x(m.value||"");if(m.value=j,typeof b=="number")try{m.setSelectionRange(b,b)}catch{}}),_.dataset.normalizeAttached="true"),_){const v=Array.isArray(t.expenses)?t.expenses.reduce((j,S)=>j+(Number(S?.salePrice??S?.sale_price)||0),0):0,m=x(String(_.value||"")),b=Number.parseFloat(m);(!Number.isFinite(b)||b<=0)&&(_.value=x(String(Math.round(v*100)/100)))}const Ce=()=>{const v=Number(e.equipmentEstimate)||0,m=Array.isArray(t.expenses)?t.expenses.reduce((B,z)=>B+(Number(z.amount)||0),0):0,b=(()=>{const B=_?.value||(e?.servicesClientPrice??0),z=x(String(B)),ue=Number.parseFloat(z);return Number.isFinite(ue)&&ue>=0?ue:0})(),j=N?.value==="amount"?"amount":"percent",S=x(K?.value||"0");let D=Number.parseFloat(S);(!Number.isFinite(D)||D<0)&&(D=0);const M=$?.checked===!0,F=A?.checked===!0;let k=F?xa(A):null;(!Number.isFinite(k)||k<=0)&&(k=F?nt:null);const Y=Sa({equipmentEstimate:v,expensesTotal:m,servicesClientPrice:b,discountValue:D,discountType:j,applyTax:M,companyShareEnabled:F,companySharePercent:k});return{equipmentEstimate:v,expensesTotal:m,discountValue:D,discountTypeValue:j,applyTax:M,companyShareEnabled:F,companySharePercent:k,servicesClientPrice:b,finance:Y}},Le=()=>{const v=Ce(),m=ae(),j=(pt(e.id)||[]).reduce((k,Y)=>k+(Number(Y?.totalAmount)||Kt(Y)||0),0),S=Number(v.finance?.taxableAmount||0),D=v.applyTax?Number(((S+j)*st).toFixed(2)):0,M=Number((S+j+D).toFixed(2)),F=_e({totalAmount:M,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:m});return{...v,combinedTotalWithTax:M,payments:m,progress:F}},Ue=()=>{te&&(te.innerHTML=pn(ae()))},ne=()=>{if(!be)return;const{combinedTotalWithTax:v,progress:m}=Le(),b=Number.isFinite(Number(v))?Number(v):0,j=Number.isFinite(Number(m.paidAmount))?Number(m.paidAmount):0,S=Number.isFinite(Number(m.paidPercent))?Number(m.paidPercent):0,D=Math.max(0,Math.round((b-j)*100)/100),M=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:w(b)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:w(j)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${x(S.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:w(D)}];be.innerHTML=M.map(({label:F,value:k})=>`
        <div class="project-details-grid-item">
          <span>${o(F)}</span>
          <strong>${o(k)}</strong>
        </div>
      `).join("")},se=(v="auto")=>{if(!g)return;const m=g.dataset?.userSelected==="true";if(v==="auto"&&m)return;const{finance:b,progress:j}=Le(),S=at({manualStatus:m?g.value:e.paymentStatus||"unpaid",paidAmount:j.paidAmount,paidPercent:j.paidPercent,totalAmount:b.totalWithTax});m||(g.value=S)},ve=()=>{Ue(),ne(),se("auto")},ge=1e-4,Se=()=>{const v=C?.value==="amount"?"amount":"percent",m=x(q?.value||"").replace("%","").trim();let b=Number.parseFloat(m);if(!Number.isFinite(b)||b<=0){I(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),q?.focus();return}const j=Le(),S=Number.isFinite(Number(j.finance.totalWithTax))?Number(j.finance.totalWithTax):0;if(S<=0){I(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const D=Number(j.progress.paidAmount)||0,M=Number(j.progress.paidPercent)||0;let F=null,k=null;if(v==="percent"){const B=Math.max(0,100-M);if(B<=ge){I(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(b>B){b=B;const z=x(b.toFixed(2));I(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",z))}k=Math.round(b*100)/100,S>0&&(F=Math.round(k/100*S*100)/100)}else{const B=Math.max(0,S-D);if(B<=ge){I(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(b>B){b=B;const z=`${x(b.toFixed(2))} ${Ne}`;I(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",z))}F=Math.round(b*100)/100,S>0&&(k=Math.round(F/S*100*100)/100)}const Y={type:v,amount:F??null,percentage:k??null,value:v==="amount"?F:k,note:null,recordedAt:new Date().toISOString()};t.payments=[...ae(),Y],q&&(q.value=""),C&&(C.value="percent"),ve(),I(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},je=v=>{!$||!A||ye||(ye=!0,v==="share"?A.checked?($.checked||($.checked=!0),tt(A)):$.checked&&($.checked=!1):v==="tax"&&($.checked?tt(A):A.checked&&(A.checked=!1)),ye=!1)};function we(){c&&(c.innerHTML=Wt(t.expenses))}we(),ve(),K&&!K.dataset.listenerAttached&&(K.addEventListener("input",v=>{const m=v.target;m instanceof HTMLInputElement&&(m.value=x(m.value||""),ne(),se("auto"))}),K.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",v=>{const m=v.target;m instanceof HTMLInputElement&&(m.value=x(m.value||""))}),i.dataset.listenerAttached="true"),N&&!N.dataset.listenerAttached&&(N.addEventListener("change",()=>{ne(),se("auto")}),N.dataset.listenerAttached="true"),q&&!q.dataset.listenerAttached&&(q.addEventListener("input",v=>{const m=v.target;m instanceof HTMLInputElement&&(m.value=x(m.value||""))}),q.dataset.listenerAttached="true"),g&&!g.dataset.listenerAttached&&(g.addEventListener("change",()=>{g.dataset.userSelected="true"}),g.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",v=>{const m=v.target;m instanceof HTMLInputElement&&(m.value=x(m.value||""))}),l.dataset.listenerAttached="true"),A&&!A.dataset.listenerAttached&&(A.addEventListener("change",()=>{je("share"),ne(),se("auto")}),A.dataset.listenerAttached="true"),$&&!$.dataset.listenerAttached&&($.addEventListener("change",()=>{je("tax"),ne(),se("auto")}),$.dataset.listenerAttached="true"),A?.checked&&tt(A),je(A?.checked?"share":"tax"),ne(),se("auto"),d&&d.addEventListener("click",v=>{v.preventDefault();const m=r?.value.trim()||"",b=x(l?.value||"0"),j=Number(b),S=x(i?.value||"0"),D=Number(S);if(!m){I(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(j)||j<=0){I(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:m,amount:j,salePrice:Number.isFinite(D)&&D>0?D:0}),r&&(r.value=""),l&&(l.value=""),i&&(i.value="");try{const M=Array.isArray(t.expenses)?t.expenses.reduce((F,k)=>F+(Number(k?.salePrice)||0),0):0;_&&(_.value=x(String(M)))}catch{}we(),ne(),se("auto")}),c&&c.addEventListener("click",v=>{const m=v.target.closest('[data-action="remove-expense"]');if(!m)return;const{id:b}=m.dataset;t.expenses=t.expenses.filter(j=>String(j.id)!==String(b));try{const j=Array.isArray(t.expenses)?t.expenses.reduce((S,D)=>S+(Number(D?.salePrice)||0),0):0;_&&(_.value=x(String(j)))}catch{}we(),ne(),se("auto")}),ee&&!ee.dataset.listenerAttached&&(ee.addEventListener("click",v=>{v.preventDefault(),Se()}),ee.dataset.listenerAttached="true"),te&&!te.dataset.listenerAttached&&(te.addEventListener("click",v=>{const m=v.target.closest('[data-action="remove-payment"]');if(!m)return;const b=Number.parseInt(m.dataset.index||"-1",10);if(!Number.isInteger(b)||b<0)return;const j=ae();if(b>=j.length)return;const S=j.filter((D,M)=>M!==b);t.payments=S,ve(),I(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),te.dataset.listenerAttached="true"),a.addEventListener("submit",async v=>{if(v.preventDefault(),a.dataset.submitting==="true")return;const m=a.querySelector('[name="project-title"]'),b=a.querySelector('[name="project-type"]'),j=a.querySelector('[name="project-description"]'),S=m?.value.trim()||"",D=b?.value||"",M=p?.value.trim()||"",F=h?.value.trim()||"",k=j?.value.trim()||"",Y=(g?.value||"unpaid").toLowerCase(),B=["paid","partial"].includes(Y)?Y:"unpaid";if(!S||!D||!M){I(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),m?.focus();return}const z=E?.value.trim()||"",ue=y?.value.trim()||"",De=Pt(M,F),Pe=z?Pt(z,ue):"",H=new Date(De),ke=Pe?new Date(Pe):null;if(ke&&H>ke){I(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),E?.focus();return}if(L.projects.findIndex(W=>String(W.id)===String(e.id))===-1){I(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const We=Ce(),{equipmentEstimate:Ge,discountValue:Je,discountTypeValue:Ke,applyTax:Te,companyShareEnabled:Fe,companySharePercent:Ye,finance:U}=We,Xe=C?.value==="amount"?"amount":"percent",oe=x(q?.value||"");let T=oe?Number.parseFloat(oe):null,R=[...ae()];if(Number.isFinite(T)&&T>0&&Number.isFinite(Number(U.totalWithTax))){const W=_e({totalAmount:U.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:R}),ce=new Date().toISOString();if(Xe==="percent"){const pe=Math.max(0,100-(W.paidPercent||0));if(pe>ge){const le=Math.min(T,pe),G=Math.round(le*100)/100,de=U.totalWithTax>0?Math.round(G/100*U.totalWithTax*100)/100:null;R=[...R,{type:"percent",amount:de,percentage:G,value:G,note:null,recordedAt:ce}]}}else{const pe=Math.max(0,U.totalWithTax-(W.paidAmount||0));if(pe>ge){const le=Math.min(T,pe),G=Math.round(le*100)/100,de=U.totalWithTax>0?Math.round(G/U.totalWithTax*100*100)/100:null;R=[...R,{type:"amount",amount:G,percentage:de,value:G,note:null,recordedAt:ce}]}}R!==t.payments&&(t.payments=R,ve()),q&&(q.value=""),C&&(C.value="percent"),T=null}const V=_e({totalAmount:U.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:R}),ie=g?.dataset?.userSelected==="true",jt=at({manualStatus:ie?B:e.paymentStatus||B,paidAmount:V.paidAmount,paidPercent:V.paidPercent,totalAmount:U.totalWithTax}),X=ie?B:jt;!ie&&g&&(g.value=X),g?.dataset&&delete g.dataset.userSelected,t.payments=R;const Qe=Va({projectCode:e.projectCode,title:S,type:D,clientId:e.clientId,clientCompany:e.clientCompany,description:k,start:De,end:Pe||null,applyTax:Te,paymentStatus:X,equipmentEstimate:Ge,expenses:t.expenses,servicesClientPrice:context.servicesClientPrice,discount:Je,discountType:Ke,companyShareEnabled:Fe&&Te,companySharePercent:Fe&&Te?Ye:null,companyShareAmount:U.companyShareAmount,taxAmount:U.taxAmount,totalWithTax:U.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:ga(e),paidAmount:V.paidAmount,paidPercentage:V.paidPercent,paymentProgressType:V.paymentProgressType,paymentProgressValue:V.paymentProgressValue,payments:R});a.dataset.submitting="true";try{const W=await Bt(e.projectId??e.id,Qe),ce=W?.projectId??W?.id??e.id;await ja(ce,X),L.projects=yt(),L.reservations=ft(),I(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),xe(),$e(),Ee(),fe(e.id)}catch(W){console.error("❌ [projects] Failed to update project from details view",W);const ce=Ve(W)?W.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");I(ce,"error")}finally{delete a.dataset.submitting}})}function Et(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description};ut({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function cn(e){if(!e)return;const t=L.projects.find(a=>String(a.id)===String(e));if(!t){I(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){I(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Bt(t.projectId??t.id,{confirmed:!0});const a=await fa(e);L.projects=yt(),L.reservations=ft(),xe(),$e(),Ee(),f.detailsModalEl&&f.detailsModalEl.classList.contains("show")&&f.detailsBody?.dataset.projectId===String(e)&&fe(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),I(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=Ve(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");I(s,"error")}}function ln(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=wt(e.start||""),{date:r,time:l}=wt(e.end||""),i=e.applyTax===!0||e.applyTax==="true",d=typeof e.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",c=["paid","partial"].includes(d)?d:"unpaid",p=e.discountType==="amount"?"amount":"percent",h=x(String(e.discount??e.discountValue??0)),E=x(String(e.servicesClientPrice??e.services_client_price??0)),y=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??nt,g=Number.parseFloat(x(String(y))),$=Number.isFinite(g)&&g>0?g:nt,A=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(g)&&g>0;return`
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
          <input type="text" id="project-edit-services-client-price" class="form-control project-edit-input-xs" value="${o(E)}" placeholder="0" inputmode="decimal">
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
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String($))}" ${A?"checked":""}>
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
            <button type="button" class="modal-action-btn modal-action-btn--warning project-edit-add-btn" data-action="add-expense">${o(n("projects.form.buttons.addExpense","➕ إضافة خدمة"))}</button>
          </div>
        </div>
        <div id="project-edit-expense-list" class="project-edit-expense-list mt-3">
          ${Wt(t.expenses)}
        </div>
      </section>

      <div class="project-edit-actions mt-4 d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">${o(n("projects.form.buttons.update","تحديث المشروع"))}</button>
        <button type="button" class="btn btn-outline-secondary" data-action="cancel-edit">${o(n("actions.cancel","إلغاء"))}</button>
      </div>
    </form>
  `}function dn(e){return["commercial","coverage","photography","social"].map(a=>{const s=Jt(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(s)}</option>`}).join("")}function Wt(e=[]){if(!Array.isArray(e)||e.length===0){const s=o(n("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"));return`
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
      </div>`}const t=o(n("actions.remove","إزالة")),a=e.map(s=>{const r=o(s?.label||""),l=o(w(s?.amount||0)),i=o(w(s?.salePrice||s?.sale_price||0)),d=o(String(s?.id||""));return`
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
    </div>`}function un(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(w(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${x(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?x(mt(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(x(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function pn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(w(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${x(Number(a.percentage).toFixed(2))}%`:"—",d=a?.recordedAt?x(mt(a.recordedAt)):"—",c=a?.note?o(x(a.note)):"",p=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
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
  `}function mn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(fn).filter(Boolean);if(a.length>0)return a;const s=Be(e.paidPercent??e.paid_percent),r=Be(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Gt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function fn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=Be(e.amount??(a==="amount"?e.value:null)),r=Be(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,d=Gt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:d}}function Be(e){if(e==null||e==="")return null;const t=x(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Gt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Nt(e,t){if(!t)return null;const{date:a,time:s}=hn(mt(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية الحجز"):n("projects.details.labels.end","نهاية الحجز");return{icon:l,label:i,value:a,meta:s}}function hn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Jt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function Kt(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(x(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=_t(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(x(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Yt(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function bn(){return Yt(rt)}function yn(){return Yt(ot)}function vn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[rt,ot].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let p=!1;[rt,ot].forEach(h=>{c.has(h)&&(c.delete(h),p=!0)}),p&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),d=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",d)}catch{}}function gn(){const e=bn(),t=yn();e&&(L.pendingProjectDetailId=e),t&&(L.pendingProjectEditId=t,L.pendingProjectDetailId||(L.pendingProjectDetailId=t)),(e||t)&&vn()}function jn(){if(!L.pendingProjectDetailId)return;const e=L.pendingProjectDetailId,t=String(e),a=L.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;L.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(fe(s),L.pendingProjectEditId!=null){const r=String(L.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&(L.pendingProjectEditId=null,setTimeout(()=>zt(a),0))}}function xn(){document.addEventListener("DOMContentLoaded",()=>{tn(),gn(),wa(),It(),Pa(),Xa(),Qa(),Ta(),Aa(),$a(),Ea(),Na(),Ca(),La({onViewDetails:fe}),nn({onOpenProject:fe}),Da(),Sn()}),document.addEventListener("language:changed",Ct),document.addEventListener("language:translationsReady",Ct),document.addEventListener("customers:changed",wn),document.addEventListener("technicians:updated",Pn),document.addEventListener("reservations:changed",()=>ka(fe)),document.addEventListener(ca.USER_UPDATED,()=>{xe()})}async function Sn(){try{await qt({suppressError:!0}),await Ht()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");I(t,"error")}finally{Fa(),He(),Ra(),Mt(),xe(),Ee(),$e(),jn()}}function Ct(){He(),Mt(),xe(),Ee(),$e(),It()}function wn(){Ia(),He()}function Pn(){Ma(),He()}la();da();ua();za();xn();document.addEventListener("DOMContentLoaded",()=>{ma(),pa()});const ct=.15,Ie={},Tn="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let Ae=0;const P={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},u={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Me=Object.freeze({projects:`
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
  `});let J=null;const Xt=["upcoming","ongoing","completed"];async function An({forceProjects:e=!1}={}){try{await qt({suppressError:!0}),await Wa({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),Ve(t)&&console.warn("Projects API error:",t.message)}ta()}async function $n(){Cn(),Zt(),await En();try{await An({forceProjects:!0}),na(),In(),Z()}finally{ea()}document.addEventListener("language:changed",_n),document.addEventListener("projects:changed",()=>{lt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{lt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",Bn)}document.addEventListener("DOMContentLoaded",$n);async function En(){if(J)return J;if(typeof window>"u")return null;if(window.ApexCharts)return J=window.ApexCharts,J;try{await Nn(Tn),J=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),J=null}return J}function Nn(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function Cn(){u.search=document.getElementById("reports-search"),u.statusChips=document.getElementById("reports-status-chips"),u.payment=document.getElementById("reports-payment"),u.dateRange=document.getElementById("reports-date-range"),u.customRangeWrapper=document.getElementById("reports-custom-range"),u.startDate=document.getElementById("reports-start-date"),u.endDate=document.getElementById("reports-end-date"),u.refreshBtn=document.getElementById("reports-refresh"),u.kpiGrid=document.getElementById("reports-kpi-grid"),u.table=document.getElementById("reports-table"),u.tableBody=u.table?.querySelector("tbody"),u.tableMeta=document.getElementById("reports-table-meta"),u.tableEmpty=document.getElementById("reports-empty"),u.chartCards={},u.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;u.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(u.chartLoaders[t]=a)})}function Qt(e){const t=!!e;Object.entries(u.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=u.chartLoaders?.[a];r&&(r.hidden=!t)})}function Zt(){Ae+=1,Ae===1&&Qt(!0)}function ea(){Ae=Math.max(0,Ae-1),Ae===0&&Qt(!1)}function ta(){const{customers:e=[]}=Rt();P.customers=Array.isArray(e)?e:[],P.reservations=ft();const t=new Map(P.customers.map(s=>[String(s.id),s])),a=yt();P.projects=Array.isArray(a)?a.map(s=>Ln(s,t)):[],P.totalProjects=P.projects.length}function Ln(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=Dn(e.id),l=r.reduce((K,N)=>K+kn(N),0),i=Fn(e),d=Number(e?.equipmentEstimate)||0,c=Number((d+i).toFixed(2)),p=e?.applyTax===!0||e?.applyTax==="true",h=p?Number((c*ct).toFixed(2)):0,E=p?Number(((c+l)*ct).toFixed(2)):0,y=Number((c+l+E).toFixed(2)),g=Rn(e),$=e.start?new Date(e.start):null,A=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:$,end:A,applyTax:p,status:g,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:h,combinedTaxAmount:E,overallTotal:y,unpaidValue:a==="paid"?0:y,reservationsCount:r.length}}function Dn(e){return Array.isArray(P.reservations)?P.reservations.filter(t=>String(t.projectId)===String(e)):[]}function kn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(x(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=_t(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(x(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Fn(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function Rn(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function In(){if(u.search){let e;u.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{P.filters.search=u.search.value.trim(),Z()},180)})}u.payment&&(u.payment.value=P.filters.payment,u.payment.addEventListener("change",()=>{P.filters.payment=u.payment.value||"all",Z()})),u.dateRange&&(u.dateRange.addEventListener("change",Mn),u.dateRange.value=P.filters.range),u.startDate&&u.startDate.addEventListener("change",()=>{P.filters.startDate=u.startDate.value,P.filters.range==="custom"&&Z()}),u.endDate&&u.endDate.addEventListener("change",()=>{P.filters.endDate=u.endDate.value,P.filters.range==="custom"&&Z()}),u.refreshBtn&&u.refreshBtn.addEventListener("click",()=>{if(P.filters.range!=="custom"){Z();return}P.filters.startDate=u.startDate?.value||"",P.filters.endDate=u.endDate?.value||"",Z()})}function Mn(e){const t=e.target.value;P.filters.range=t,t==="custom"?u.customRangeWrapper?.classList.add("active"):(u.customRangeWrapper?.classList.remove("active"),P.filters.startDate="",P.filters.endDate="",u.startDate&&(u.startDate.value=""),u.endDate&&(u.endDate.value=""),Z())}async function lt(){Zt();try{await Promise.all([Ht(),Ba()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),Ve(e)&&console.warn("Projects API error:",e.message)}finally{ta(),Z(),ea()}}function _n(){na(),Z()}function Bn(e){e.key&&!["projects","reservations","customers"].includes(e.key)||lt().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function Z(){const e=qn();gt(),On(e),Gn(e),Jn(e),Kn(e),Yn(e),Xn(e)}function qn(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=P.filters,i=aa(e),d=new Date,c=Number(s);let p=null;if(s==="custom"){p=r?new Date(r):null;const h=l?new Date(l):null;return P.projects.filter(E=>!Lt(E,t)||!Dt(E,a)||!kt(E,i)?!1:Vn(E.start,p,h))}return s!=="all"&&Number.isFinite(c)&&(p=new Date,p.setDate(d.getDate()-c)),P.projects.filter(h=>!Lt(h,t)||!Dt(h,a)||!kt(h,i)?!1:s==="all"?!0:Hn(h.start,p,d))}function Lt(e,t){return t.includes(e.status)}function Dt(e,t){return t==="all"?!0:e.paymentStatus===t}function kt(e,t){return t?aa([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function Hn(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function Vn(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function aa(e){return e?x(String(e)).toLowerCase().trim():""}function On(e){if(!u.kpiGrid)return;const t=e.length,a=e.reduce((i,d)=>i+d.overallTotal,0),s=e.reduce((i,d)=>i+d.unpaidValue,0),r=e.reduce((i,d)=>i+d.expensesTotal,0),l=[{icon:Me.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:dt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Me.value,label:n("projects.reports.kpi.totalValue","Total value"),value:Q(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Me.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:Q(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Me.expenses,label:n("projects.reports.kpi.expenses","خدمات إنتاجية (التكلفة)"),value:Q(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];u.kpiGrid.innerHTML=l.map(({icon:i,label:d,value:c,meta:p})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${O(d)}</p>
        <p class="reports-kpi-value">${O(c)}</p>
        <span class="reports-kpi-meta">${O(p)}</span>
      </div>
    </div>
  `).join(""),Un(e)}function Un(e){try{const t=zn(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:Q(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:Q(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:Q(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:Q(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:Q(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:Q(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","مصروفات المشروع","Project expenses"),value:`−${Q(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:Q(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:d})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${O(i)}</span>
            <span class="reports-kpi-detail-value">${O(d)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:u.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function zn(e){const t=new Set(e.map(N=>String(N.id))),a=P.reservations.filter(N=>N.projectId!=null&&t.has(String(N.projectId)));let s=0,r=0,l=0,i=0,d=0,c=0,p=0;a.forEach(N=>{const C=Ga(N);s+=C.finalTotal||0,r+=C.equipmentTotal||0,l+=C.crewTotal||0,i+=C.crewCostTotal||0,d+=C.companyShareAmount||0,c+=C.taxAmount||0,p+=C.netProfit||0});const h=e.reduce((N,C)=>N+(Number(C.expensesTotal)||0),0),E=e.reduce((N,C)=>N+(Number(C.raw?.equipmentEstimate)||0),0),y=e.reduce((N,C)=>{const q=C.applyTax===!0,_=(Number(C.raw?.equipmentEstimate)||0)+(Number(C.expensesTotal)||0),ee=q?_*ct:0;return N+ee},0),g=s+E+y,$=r+E,A=c+y,K=p-h;return{grossRevenue:g,companyShareTotal:d,taxTotal:A,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:$,projectExpensesTotal:h,netProfit:K}}function na(){if(!u.statusChips)return;const e=Xt.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${O(a)}</button>`}).join("");u.statusChips.innerHTML=e,u.statusChips.dataset.listenerAttached||(u.statusChips.addEventListener("click",Wn),u.statusChips.dataset.listenerAttached="true"),gt()}function Wn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(P.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&Xt.forEach(r=>s.add(r)),P.filters.statuses=Array.from(s),gt(),Z()}function gt(){if(!u.statusChips)return;const e=new Set(P.filters.statuses);u.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Gn(e){if(!J)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(p=>p.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,p)=>c+p,0)>0?s:[],d={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>he(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};Oe("status",t,d)}function Jn(e){if(!J)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(Zn(),{month:"short",year:"numeric"});e.forEach(h=>{if(!h.start||Number.isNaN(h.start.getTime()))return;const E=`${h.start.getFullYear()}-${h.start.getMonth()+1}`,y=a.get(E)||{total:0,label:s.format(h.start)};y.total+=h.overallTotal,a.set(E,y)});const l=Array.from(a.keys()).sort((h,E)=>{const[y,g]=h.split("-").map(Number),[$,A]=E.split("-").map(Number);return y===$?g-A:y-$}).slice(-12),i=l.map(h=>a.get(h)?.label||h),d=l.map(h=>Math.round(a.get(h)?.total||0)),c=d.length?[{name:n("projects.reports.datasets.value","Total value"),data:d}]:[],p={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:h=>he(h)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:h=>he(h)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Oe("timeline",t,p)}function Kn(e){if(!J)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((p,h)=>h.overallTotal-p.overallTotal).slice(0,6),s=a.map(p=>p.title||p.projectCode),r=a.map(p=>Math.round(p.overallTotal)),l=a.map(p=>Math.round(p.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","خدمات إنتاجية (التكلفة)"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:p=>he(p)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:p=>he(p)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Oe("expenses",t,c)}function Yn(e){if(!J)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const p=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),h=a.get(p)||0;a.set(p,h+c.overallTotal)});const s=Array.from(a.entries()).sort((c,p)=>p[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],d={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>he(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>he(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Oe("clients",t,d)}function Oe(e,t,a={}){if(!J||!t)return;if(Ie[e]){try{Ie[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete Ie[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new J(t,s);Ie[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function Xn(e){if(!u.table||!u.tableBody||!u.tableEmpty)return;if(!e.length){u.table.style.display="none",u.tableEmpty.classList.add("active"),u.tableMeta&&(u.tableMeta.textContent="");return}u.table.style.display="",u.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=Qn(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${O(a.clientName)} <small class="text-muted">${O(a.clientCompany)}</small>`:O(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
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
    `}).join("");if(u.tableBody.innerHTML=t,u.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");u.tableMeta.textContent=a.replace("{count}",dt(e.length)).replace("{total}",dt(P.totalProjects))}}function Qn(e,t){if(!e&&!t)return"—";const a=e?St(e.toISOString()):"—",s=t?St(t.toISOString()):"—";return t?`${a} → ${s}`:a}function Q(e){const t=Number(e)||0,s=qe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${x(r)} SR`}function dt(e){const a=qe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return x(new Intl.NumberFormat(a).format(e))}function he(e){const a=qe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return x(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function Zn(){return qe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function O(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
