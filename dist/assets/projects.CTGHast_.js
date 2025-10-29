import{v as oa,w as ia,x as Ft,o as dt,s as D,t as n,l as Mt,n as g,A as ca,e as la,m as da,h as ua,i as pa,f as Pt,g as He}from"./auth.CFmUxZww.js";/* empty css              */import{i as ma}from"./dashboardShell.CpG9SyUN.js";import{d as f,r as je,a as $e,u as Ee,s as E,b as fa,f as ut,h as ha,i as ba,j as o,k as P,l as ya,m as pt,n as va,o as wt,e as et,p as St,q as ga,t as ja,g as xa,c as Pa,v as wa,w as Rt,x as Sa,y as Ta,z as Aa,A as $a,B as Ea,C as Na,D as Ca,E as La,F as Da,G as ka,H as Fa,I as Oe,J as Ma,K as It,L as Ra,M as Ia}from"./form.DEOgcOqj.js";import"./customers.xSpaFc27.js";import{g as mt,b as _a,o as Be,q as tt,a as _t,D as at,l as Ba}from"./reservationsService.BuzBSxm1.js";import{P as ft,l as ht,n as Tt,u as Bt,o as bt,p as Ve,t as nt,v as qa,x as Ha,i as Oa,h as Va,w as Ua,y as st,z as rt,e as qt,A as Ht,B as za,C as Wa}from"./controller.Dp7EiJmF.js";import{a as Ga}from"./calculations.JNZK6KVD.js";let At=null;function Ja(e){e&&Ot()!==e&&dt({[ft]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Ot(){return Ft()?.[ft]||""}function Vt(e){e&&ot()!==e&&dt({[ht]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function ot(){return Ft()?.[ht]||""}function Ka(e){if(!e)return"";const t=e.trim();return t?Object.values(Tt).includes(t)?t:Tt[t]||"":""}function Ya(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Ka(t);if(a)return a}}catch{}return""}function Ut(e,t){!e||!f.tabPanes||!f.tabButtons||(f.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),f.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Ja(e))}function Xa(){if(!f.tabButtons||!f.tabButtons.length)return;f.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Ut(r,a),r==="projects-section"&&(E.filters.search="",f.search&&(f.search.value=""),je(),$e(),Ee()))}),a.dataset.tabListenerAttached="true")});const e=Ot(),t=e&&f.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function yt(e,t){!e||!f.projectSubTabButtons||!f.projectSubTabPanes||(f.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),f.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function Qa(){!f.projectSubTabButtons||!f.projectSubTabButtons.length||(f.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(yt(a,e),Vt(a))}),e.dataset.tabListenerAttached="true")}),Za())}function Za(){const t=Ya()||ot();if(!t)return;const a=f.projectSubTabButtons?.[0],s=f.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==ot()&&Vt(r),yt(r,s))}function en(){return f.tabButtons?f.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function $t(e={}){if(e){if(f.tabButtons&&f.tabButtons.length){const a=f.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[ft];if(s&&s!==a){const r=f.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Ut(s,r)}}if(f.projectSubTabButtons&&f.projectSubTabButtons.length&&en()){const a=f.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[ht];if(s&&s!==a){const r=f.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&yt(s,r)}}}}function tn(){At||(At=oa(e=>{$t(e)})),ia().then(e=>{$t(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function me(e){const t=E.projects.find(x=>String(x.id)===String(e));if(!t||!f.detailsBody)return;f.detailsBody.dataset.mode="view",f.detailsBody.dataset.projectId=String(t.id);const s=(E.customers.length?E.customers:Mt().customers||[]).find(x=>String(x.id)===String(t.clientId)),r=Jt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),u=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",m=c?g(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),d=s?.email??t.clientEmail??t.customerEmail??"",j=d?String(d).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),C=(t.clientCompany||s?.companyName||"").trim(),N=t.projectCode||`PRJ-${g(String(t.id))}`,M=g(N),T=ut(t.id),Q=T.reduce((x,I)=>x+Kt(I),0),A=Number(Q.toFixed(2)),$=T.length,{subtotal:q,applyTax:Z,expensesTotal:W}=ha(t),he=Number(t?.servicesClientPrice??t?.services_client_price??0),xe=q,be=Z?Number(((xe+A)*nt).toFixed(2)):0,oe=Number((xe+A+be).toFixed(2)),le=ba(t),Pe=n(`projects.status.${le}`,qa[le]||le),te={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"}[le]||"status-confirmed",ae=Z?n("projects.details.chips.vatOn","شامل الضريبة 15٪"):n("projects.details.chips.vatOff","غير شامل الضريبة"),ye=Z?"status-paid":"status-unpaid",ve=n("projects.details.chips.reservations","{count} حجوزات").replace("{count}",g(String($))),ze=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",de=mn(t),ge=de.length>0,b=ge?0:Number(t.paidAmount)||0,h=ge?0:Number(t.paidPercent)||0;let y=oe,v,S,L,_,k,F,G,R,V,Ne;const Ce=un(de),we=n("projects.focus.confirmed","✅ مشروع مؤكد"),We=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(we)}</span>`:"";let B=[];if($>0){const x=T.reduce((Re,se)=>{const ra=Array.isArray(se.items)?se.items:[],xt=Array.isArray(se.crewAssignments)?se.crewAssignments:[],pe=xt.length?xt:Array.isArray(se.technicians)?se.technicians:[],Ze=_a({items:ra,technicianIds:Array.isArray(pe)&&!pe.length?pe:[],crewAssignments:Array.isArray(pe)&&pe.length&&typeof pe[0]=="object"?pe:[],discount:se.discount??0,discountType:se.discountType||"percent",applyTax:!1,start:se.start,end:se.end,companySharePercent:null});return Re.equipment+=Number(Ze.equipmentTotal||0),Re.crew+=Number(Ze.crewTotal||0),Re.crewCost+=Number(Ze.crewCostTotal||0),Re},{equipment:0,crew:0,crewCost:0}),I=Number(W||0),K=Number((x.equipment+x.crew+he).toFixed(2)),ue=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let ne=(t?.discountType==="amount"?"amount":"percent")==="amount"?ue:K*(ue/100);(!Number.isFinite(ne)||ne<0)&&(ne=0),ne>K&&(ne=K);const U=Z===!0,ie=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",ce=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,Te=ie&&ce>0?ce:0,Y=Math.max(0,K-ne),re=Number((Y*(Te/100)).toFixed(2)),Me=U?Number(((Y+re)*nt).toFixed(2)):0,Qe=Number((Y+re+Me).toFixed(2)),sa=Number((Qe-re-Me-I-x.crewCost).toFixed(2));x.equipment>0&&B.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:P(x.equipment)}),x.crew>0&&B.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:P(x.crew)}),x.crewCost>0&&B.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:P(x.crewCost)}),I>0&&B.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة خدمات الإنتاجية"),value:P(I)}),he>0&&B.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","سعر العميل للخدمات الإنتاجية"),value:P(he)}),ne>0&&B.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${P(ne)}`}),B.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:P(Y)}),re>0&&B.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${P(re)}`}),Me>0&&B.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${P(Me)}`}),B.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:P(sa)}),B.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:P(Qe)}),y=Qe}else B=[{icon:"💼",label:n("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:P(xe)},{icon:"🔗",label:n("projects.details.summary.reservationsTotal","إجمالي المعدات / طاقم العمل"),value:P(A)},{icon:"🧮",label:n("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:P(be)},{icon:"💰",label:n("projects.details.summary.overallTotal","الإجمالي الكلي"),value:P(oe)}];v=Be({totalAmount:y,paidAmount:b,paidPercent:h,history:de}),S=tt({manualStatus:ze||"unpaid",paidAmount:v.paidAmount,paidPercent:v.paidPercent,totalAmount:y}),L=n(`projects.paymentStatus.${S}`,S==="paid"?"Paid":S==="partial"?"Partial":"Unpaid"),_=S==="paid"?"status-paid":S==="partial"?"status-partial":"status-unpaid",k=Number.isFinite(Number(v.paidAmount))?Number(v.paidAmount):0,F=Number.isFinite(Number(v.paidPercent))?Number(v.paidPercent):0,G=Math.max(0,Number((y-k).toFixed(2))),R=P(k),V=`${g(F.toFixed(2))}%`,Ne=P(G);const jt=B.map(({icon:x,label:I,value:K})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${x} ${o(I)}</span>
      <span class="summary-details-value">${o(K)}</span>
    </div>
  `).join(""),Le=n("projects.details.labels.code","رقم المشروع"),Ge=`
    <div class="project-details-code-badge" title="${o(Le)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Le)}
      </span>
      <span class="project-details-code-badge__value">${o(M)}</span>
    </div>
  `,Je=[{icon:"👤",label:n("projects.details.client","العميل"),value:u},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:m},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:j},C?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:C}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:r},Nt("start",t.start),Nt("end",t.end)].filter(Boolean),Ke=n("projects.details.overview.heading","معلومات المشروع"),Se=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Ke)}</h6>
      <ul class="project-details-outline__list">
        ${Je.map(({icon:x,label:I,value:K,meta:ue})=>`
          <li>
            <span class="project-details-outline__label">${o(x)} ${o(I)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${o(K)}</span>
              ${ue?`<span class="project-details-outline__meta">${o(ue)}</span>`:""}
            </span>
          </li>
        `).join("")}
      </ul>
    </div>
  `,De=[`<span class="reservation-chip ${te}">${o(Pe)}</span>`,`<span class="reservation-chip ${ye}">${o(ae)}</span>`,`<span class="reservation-chip status-info">${o(ve)}</span>`,`<span class="reservation-chip ${_}">${o(L)}</span>`,We].filter(Boolean).join(""),Ye=n("projects.details.expensesTotal","إجمالي المصاريف"),O=n("projects.details.reservationsTotal","إجمالي الحجوزات"),Xe=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",P(W)),ke=an(Array.isArray(t.expenses)?t.expenses:[]);f.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${De}</div>
        </div>
        <div class="project-details-header__code">
          ${Ge}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${Se}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(n("projects.details.summary.title","ملخص مالي"))}</h6>
            ${jt}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.description","وصف المشروع"))}</h5>
      <p class="project-details-description">${o(i)}</p>
    </section>
    <section class="project-details-section">
      <h5>${o(Xe)}</h5>
      ${ke}
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.financialBreakdown","تفاصيل مالية"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(Ye)}</span>
          <strong>${P(W)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(O)}</span>
          <strong>${P(A)}</strong>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("reservations.paymentHistory.title","سجل الدفعات"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.total","الإجمالي الكلي"))}</span>
          <strong>${o(P(y))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.paid","المدفوع"))}</span>
          <strong>${o(R)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(V)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(Ne)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${Ce}
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
  `,rn(t);const J=f.detailsBody.querySelector("#project-details-export-btn");J&&J.addEventListener("click",async x=>{if(x.preventDefault(),J.blur(),!J.disabled){J.disabled=!0;try{await Ha({project:t})}catch(I){console.error("❌ [projects/details] export project PDF failed",I),D(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{J.disabled=!1}}}),f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl).show()}function an(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
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
    `}const a=e.map(s=>{const r=o(s?.label||""),l=P(Number(s?.amount)||0),i=P(Number(s?.sale_price??s?.salePrice??0));return`
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
  `}function nn({onOpenProject:e}){!f.focusCards||f.focusCards.dataset.listenerAttached==="true"||(f.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),cn(l);return}r==="view"?e?.(l):r==="highlight"&&sn(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),f.focusCards.dataset.listenerAttached="true")}function sn(e){if(!f.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=f.projectsTableBody.querySelector(t);if(!a){D(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function rn(e){if(!f.detailsBody)return;const t=f.detailsBody.querySelector('[data-action="create-reservation"]'),a=f.detailsBody.querySelector('[data-action="edit-project"]'),s=f.detailsBody.querySelector('[data-action="delete-project"]'),r=f.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(ut(e.id)||[]).some(u=>{const c=String(u?.status||u?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.disabled=!0,t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ يوجد حجز مرتبط بالفعل بهذا المشروع")):(t.disabled=!1,t.classList?.remove("disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",u=>{u.preventDefault(),Et(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),Et(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),zt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await va(e.id),!E.projects.some(c=>String(c.id)===String(e.id))&&f.detailsModalEl&&window.bootstrap?.Modal.getInstance(f.detailsModalEl)?.hide()}finally{E.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const u=Va("showReservationDetails");if(typeof u=="function")return u(i),!0;try{const c=await Ua("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const u=i.target.closest('[data-action="view-reservation"]');if(!u)return;const c=u.dataset.index||u.dataset.reservationIndex,m=Number.parseInt(c||"-1",10);if(!Number.isInteger(m)||m<0)return;await l(m)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const u=i.target.closest('[data-action="view-reservation"]');u&&(i.preventDefault(),u.click())})}}function zt(e){if(!e||!f.detailsBody)return;const t=E.projects.find(d=>String(d.id)===String(e.id));if(!t)return;const a=E.customers.find(d=>String(d.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const s=Array.isArray(t.expenses)?t.expenses.map((d,j)=>({id:d?.id||`expense-${t.id}-${j}-${Date.now()}`,label:d?.label||"",amount:Number(d?.amount)||0,salePrice:Number.isFinite(Number(d?.sale_price??d?.salePrice))?Number(d?.sale_price??d?.salePrice):0})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((d,j)=>({type:d?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(d?.amount))?Number(d.amount):null,percentage:Number.isFinite(Number(d?.percentage))?Number(d.percentage):null,value:Number.isFinite(Number(d?.value))?Number(d.value):null,note:d?.note??null,recordedAt:d?.recordedAt??d?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${j}`})):[],l=r.reduce((d,j)=>d+(Number(j?.amount)||0),0),i=r.reduce((d,j)=>d+(Number(j?.percentage)||0),0),u=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,c=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(u>0||c>0)){const d=t.updatedAt??t.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(u)&&u>0?u:null,percentage:c,value:c,note:null,recordedAt:d,key:`legacy-payment-${t.id}-percent`}]:u>0&&(r=[{type:"amount",amount:u,percentage:null,value:u,note:null,recordedAt:d,key:`legacy-payment-${t.id}-amount`}]),l=r.reduce((j,C)=>j+(Number(C?.amount)||0),0),i=r.reduce((j,C)=>j+(Number(C?.percentage)||0),0),u=0,c=0}l>0&&Math.abs(u-l)<.01&&(u=0),i>0&&Math.abs(c-i)<.01&&(c=0);const m={expenses:s,payments:r,basePaidAmount:u,basePaidPercent:c};f.detailsBody.dataset.mode="edit",f.detailsBody.innerHTML=ln(t,m),on(t,m)}function on(e,t={expenses:[]}){const a=f.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",b=>{b.preventDefault(),me(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),u=a.querySelector('[data-action="add-expense"]'),c=a.querySelector("#project-edit-expense-list"),m=a.querySelector('[name="project-start-date"]'),d=a.querySelector('[name="project-start-time"]'),j=a.querySelector('[name="project-end-date"]'),C=a.querySelector('[name="project-end-time"]'),N=a.querySelector('[name="project-payment-status"]'),M=a.querySelector("#project-edit-tax"),T=a.querySelector("#project-edit-company-share"),Q=a.querySelector("#project-edit-discount"),A=a.querySelector("#project-edit-discount-type"),$=a.querySelector("#project-edit-payment-progress-type"),q=a.querySelector("#project-edit-payment-progress-value"),Z=a.querySelector("#project-edit-payment-add"),W=a.querySelector("#project-edit-payment-history"),he=a.querySelector("#project-edit-payment-summary"),xe=n("reservations.create.summary.currency","SR");let be=!1;const oe=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),le=()=>{const b=Number(e.equipmentEstimate)||0,h=Array.isArray(t.expenses)?t.expenses.reduce((R,V)=>R+(Number(V.amount)||0),0):0,y=Array.isArray(t.expenses)?Math.max(0,Math.round(t.expenses.reduce((R,V)=>R+Number(V?.salePrice??0),0)*100)/100):Math.max(0,Number(e?.servicesClientPrice??0)),v=A?.value==="amount"?"amount":"percent",S=g(Q?.value||"0");let L=Number.parseFloat(S);(!Number.isFinite(L)||L<0)&&(L=0);const _=M?.checked===!0,k=T?.checked===!0;let F=k?xa(T):null;(!Number.isFinite(F)||F<=0)&&(F=k?at:null);const G=Pa({equipmentEstimate:b,expensesTotal:h,servicesClientPrice:y,discountValue:L,discountType:v,applyTax:_,companyShareEnabled:k,companySharePercent:F});return{equipmentEstimate:b,expensesTotal:h,discountValue:L,discountTypeValue:v,applyTax:_,companyShareEnabled:k,companySharePercent:F,servicesClientPrice:y,finance:G}},Pe=()=>{const b=le(),h=oe(),v=(ut(e.id)||[]).reduce((F,G)=>F+(Number(G?.totalAmount)||Kt(G)||0),0),S=Number(b.finance?.taxableAmount||0),L=b.applyTax?Number(((S+v)*nt).toFixed(2)):0,_=Number((S+v+L).toFixed(2)),k=Be({totalAmount:_,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:h});return{...b,combinedTotalWithTax:_,payments:h,progress:k}},gt=()=>{W&&(W.innerHTML=pn(oe()))},te=()=>{if(!he)return;const{combinedTotalWithTax:b,progress:h}=Pe(),y=Number.isFinite(Number(b))?Number(b):0,v=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,S=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,L=Math.max(0,Math.round((y-v)*100)/100),_=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:P(y)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:P(v)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${g(S.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:P(L)}];he.innerHTML=_.map(({label:k,value:F})=>`
        <div class="project-details-grid-item">
          <span>${o(k)}</span>
          <strong>${o(F)}</strong>
        </div>
      `).join("")},ae=(b="auto")=>{if(!N)return;const h=N.dataset?.userSelected==="true";if(b==="auto"&&h)return;const{finance:y,progress:v}=Pe(),S=tt({manualStatus:h?N.value:e.paymentStatus||"unpaid",paidAmount:v.paidAmount,paidPercent:v.paidPercent,totalAmount:y.totalWithTax});h||(N.value=S)},ye=()=>{gt(),te(),ae("auto")},ve=1e-4,ze=()=>{const b=$?.value==="amount"?"amount":"percent",h=g(q?.value||"").replace("%","").trim();let y=Number.parseFloat(h);if(!Number.isFinite(y)||y<=0){D(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),q?.focus();return}const v=Pe(),S=Number.isFinite(Number(v.finance.totalWithTax))?Number(v.finance.totalWithTax):0;if(S<=0){D(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const L=Number(v.progress.paidAmount)||0,_=Number(v.progress.paidPercent)||0;let k=null,F=null;if(b==="percent"){const R=Math.max(0,100-_);if(R<=ve){D(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>R){y=R;const V=g(y.toFixed(2));D(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",V))}F=Math.round(y*100)/100,S>0&&(k=Math.round(F/100*S*100)/100)}else{const R=Math.max(0,S-L);if(R<=ve){D(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>R){y=R;const V=`${g(y.toFixed(2))} ${xe}`;D(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",V))}k=Math.round(y*100)/100,S>0&&(F=Math.round(k/S*100*100)/100)}const G={type:b,amount:k??null,percentage:F??null,value:b==="amount"?k:F,note:null,recordedAt:new Date().toISOString()};t.payments=[...oe(),G],q&&(q.value=""),$&&($.value="percent"),ye(),D(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},de=b=>{!M||!T||be||(be=!0,b==="share"?T.checked?(M.checked||(M.checked=!0),et(T)):M.checked&&(M.checked=!1):b==="tax"&&(M.checked?et(T):T.checked&&(T.checked=!1)),be=!1)};function ge(){c&&(c.innerHTML=Wt(t.expenses))}ge(),ye(),Q&&!Q.dataset.listenerAttached&&(Q.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=g(h.value||""),te(),ae("auto"))}),Q.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=g(h.value||""))}),i.dataset.listenerAttached="true"),A&&!A.dataset.listenerAttached&&(A.addEventListener("change",()=>{te(),ae("auto")}),A.dataset.listenerAttached="true"),q&&!q.dataset.listenerAttached&&(q.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=g(h.value||""))}),q.dataset.listenerAttached="true"),N&&!N.dataset.listenerAttached&&(N.addEventListener("change",()=>{N.dataset.userSelected="true"}),N.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=g(h.value||""))}),l.dataset.listenerAttached="true"),T&&!T.dataset.listenerAttached&&(T.addEventListener("change",()=>{de("share"),te(),ae("auto")}),T.dataset.listenerAttached="true"),M&&!M.dataset.listenerAttached&&(M.addEventListener("change",()=>{de("tax"),te(),ae("auto")}),M.dataset.listenerAttached="true"),T?.checked&&et(T),de(T?.checked?"share":"tax"),te(),ae("auto"),u&&u.addEventListener("click",b=>{b.preventDefault();const h=r?.value.trim()||"",y=g(l?.value||"0"),v=Number(y),S=g(i?.value||"0"),L=Number(S);if(!h){D(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(v)||v<=0){D(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:h,amount:v,salePrice:Number.isFinite(L)&&L>0?L:0}),r&&(r.value=""),l&&(l.value=""),i&&(i.value=""),ge(),te(),ae("auto")}),c&&c.addEventListener("click",b=>{const h=b.target.closest('[data-action="remove-expense"]');if(!h)return;const{id:y}=h.dataset;t.expenses=t.expenses.filter(v=>String(v.id)!==String(y)),ge(),te(),ae("auto")}),Z&&!Z.dataset.listenerAttached&&(Z.addEventListener("click",b=>{b.preventDefault(),ze()}),Z.dataset.listenerAttached="true"),W&&!W.dataset.listenerAttached&&(W.addEventListener("click",b=>{const h=b.target.closest('[data-action="remove-payment"]');if(!h)return;const y=Number.parseInt(h.dataset.index||"-1",10);if(!Number.isInteger(y)||y<0)return;const v=oe();if(y>=v.length)return;const S=v.filter((L,_)=>_!==y);t.payments=S,ye(),D(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),W.dataset.listenerAttached="true"),a.addEventListener("submit",async b=>{if(b.preventDefault(),a.dataset.submitting==="true")return;const h=a.querySelector('[name="project-title"]'),y=a.querySelector('[name="project-type"]'),v=a.querySelector('[name="project-description"]'),S=h?.value.trim()||"",L=y?.value||"",_=m?.value.trim()||"",k=d?.value.trim()||"",F=v?.value.trim()||"",G=(N?.value||"unpaid").toLowerCase(),R=["paid","partial"].includes(G)?G:"unpaid";if(!S||!L||!_){D(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),h?.focus();return}const V=j?.value.trim()||"",Ne=C?.value.trim()||"",Ce=St(_,k),we=V?St(V,Ne):"",We=new Date(Ce),B=we?new Date(we):null;if(B&&We>B){D(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),j?.focus();return}if(E.projects.findIndex(U=>String(U.id)===String(e.id))===-1){D(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Le=le(),{equipmentEstimate:Ge,discountValue:Je,discountTypeValue:Ke,applyTax:Se,companyShareEnabled:De,companySharePercent:Ye,finance:O}=Le,Xe=$?.value==="amount"?"amount":"percent",ke=g(q?.value||"");let J=ke?Number.parseFloat(ke):null,x=[...oe()];if(Number.isFinite(J)&&J>0&&Number.isFinite(Number(O.totalWithTax))){const U=Be({totalAmount:O.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:x}),ie=new Date().toISOString();if(Xe==="percent"){const ce=Math.max(0,100-(U.paidPercent||0));if(ce>ve){const Te=Math.min(J,ce),Y=Math.round(Te*100)/100,re=O.totalWithTax>0?Math.round(Y/100*O.totalWithTax*100)/100:null;x=[...x,{type:"percent",amount:re,percentage:Y,value:Y,note:null,recordedAt:ie}]}}else{const ce=Math.max(0,O.totalWithTax-(U.paidAmount||0));if(ce>ve){const Te=Math.min(J,ce),Y=Math.round(Te*100)/100,re=O.totalWithTax>0?Math.round(Y/O.totalWithTax*100*100)/100:null;x=[...x,{type:"amount",amount:Y,percentage:re,value:Y,note:null,recordedAt:ie}]}}x!==t.payments&&(t.payments=x,ye()),q&&(q.value=""),$&&($.value="percent"),J=null}const I=Be({totalAmount:O.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:x}),K=N?.dataset?.userSelected==="true",ue=tt({manualStatus:K?R:e.paymentStatus||R,paidAmount:I.paidAmount,paidPercent:I.paidPercent,totalAmount:O.totalWithTax}),Fe=K?R:ue;!K&&N&&(N.value=Fe),N?.dataset&&delete N.dataset.userSelected,t.payments=x;const ne=Oa({projectCode:e.projectCode,title:S,type:L,clientId:e.clientId,clientCompany:e.clientCompany,description:F,start:Ce,end:we||null,applyTax:Se,paymentStatus:Fe,equipmentEstimate:Ge,expenses:t.expenses,servicesClientPrice:context.servicesClientPrice,discount:Je,discountType:Ke,companyShareEnabled:De&&Se,companySharePercent:De&&Se?Ye:null,companyShareAmount:O.companyShareAmount,taxAmount:O.taxAmount,totalWithTax:O.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:ga(e),paidAmount:I.paidAmount,paidPercentage:I.paidPercent,paymentProgressType:I.paymentProgressType,paymentProgressValue:I.paymentProgressValue,payments:x});a.dataset.submitting="true";try{const U=await Bt(e.projectId??e.id,ne),ie=U?.projectId??U?.id??e.id;await ja(ie,Fe),E.projects=bt(),E.reservations=mt(),D(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),je(),$e(),Ee(),me(e.id)}catch(U){console.error("❌ [projects] Failed to update project from details view",U);const ie=Ve(U)?U.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");D(ie,"error")}finally{delete a.dataset.submitting}})}function Et(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description};dt({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function cn(e){if(!e)return;const t=E.projects.find(a=>String(a.id)===String(e));if(!t){D(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){D(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Bt(t.projectId??t.id,{confirmed:!0});const a=await fa(e);E.projects=bt(),E.reservations=mt(),je(),$e(),Ee(),f.detailsModalEl&&f.detailsModalEl.classList.contains("show")&&f.detailsBody?.dataset.projectId===String(e)&&me(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),D(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=Ve(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");D(s,"error")}}function ln(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=wt(e.start||""),{date:r,time:l}=wt(e.end||""),i=e.applyTax===!0||e.applyTax==="true";typeof e.paymentStatus=="string"&&e.paymentStatus.toLowerCase();const u=e.discountType==="amount"?"amount":"percent",c=g(String(e.discount??e.discountValue??0));g(String(e.servicesClientPrice??e.services_client_price??0));const m=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??at,d=Number.parseFloat(g(String(m))),j=Number.isFinite(d)&&d>0?d:at,C=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(d)&&d>0;return`
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
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(j))}" ${C?"checked":""}>
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
          ${Wt(t.expenses)}
        </div>
      </section>

      <div class="project-edit-actions mt-4 d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">${o(n("projects.form.buttons.update","تحديث المشروع"))}</button>
        <button type="button" class="btn btn-outline-secondary" data-action="cancel-edit">${o(n("actions.cancel","إلغاء"))}</button>
      </div>
    </form>
  `}function dn(e){return["commercial","coverage","photography","social"].map(a=>{const s=Jt(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(s)}</option>`}).join("")}function Wt(e=[]){if(!Array.isArray(e)||e.length===0){const i=o(n("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"));return`
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
      </div>`}const t=o(n("actions.remove","إزالة")),a=e.map(i=>{const u=o(i?.label||""),c=o(P(i?.amount||0)),m=o(P(i?.salePrice||i?.sale_price||0)),d=o(String(i?.id||""));return`
      <tr>
        <td>${u}</td>
        <td>${c}</td>
        <td>${m}</td>
        <td><button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${d}" aria-label="${t}">✖</button></td>
      </tr>`}).join(""),s=e.reduce((i,u)=>i+(Number(u?.salePrice??u?.sale_price)||0),0),r=o(P(s)),l=o(n("projects.expenses.table.totalSale","مجموع سعر البيع"));return`
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
    </div>`}function un(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(P(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${g(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?g(pt(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(g(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function pn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(P(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${g(Number(a.percentage).toFixed(2))}%`:"—",u=a?.recordedAt?g(pt(a.recordedAt)):"—",c=a?.note?o(g(a.note)):"",m=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
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
  `}function mn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(fn).filter(Boolean);if(a.length>0)return a;const s=qe(e.paidPercent??e.paid_percent),r=qe(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Gt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function fn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=qe(e.amount??(a==="amount"?e.value:null)),r=qe(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,u=Gt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:u}}function qe(e){if(e==null||e==="")return null;const t=g(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Gt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Nt(e,t){if(!t)return null;const{date:a,time:s}=hn(pt(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية الحجز"):n("projects.details.labels.end","نهاية الحجز");return{icon:l,label:i,value:a,meta:s}}function hn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Jt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function Kt(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(g(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=_t(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(g(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Yt(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function bn(){return Yt(st)}function yn(){return Yt(rt)}function vn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[st,rt].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let m=!1;[st,rt].forEach(d=>{c.has(d)&&(c.delete(d),m=!0)}),m&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),u=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",u)}catch{}}function gn(){const e=bn(),t=yn();e&&(E.pendingProjectDetailId=e),t&&(E.pendingProjectEditId=t,E.pendingProjectDetailId||(E.pendingProjectDetailId=t)),(e||t)&&vn()}function jn(){if(!E.pendingProjectDetailId)return;const e=E.pendingProjectDetailId,t=String(e),a=E.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;E.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(me(s),E.pendingProjectEditId!=null){const r=String(E.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&(E.pendingProjectEditId=null,setTimeout(()=>zt(a),0))}}function xn(){document.addEventListener("DOMContentLoaded",()=>{tn(),gn(),wa(),Rt(),Sa(),Xa(),Qa(),Ta(),Aa(),$a(),Ea(),Na(),Ca(),La({onViewDetails:me}),nn({onOpenProject:me}),Da(),Pn()}),document.addEventListener("language:changed",Ct),document.addEventListener("language:translationsReady",Ct),document.addEventListener("customers:changed",wn),document.addEventListener("technicians:updated",Sn),document.addEventListener("reservations:changed",()=>ka(me)),document.addEventListener(ca.USER_UPDATED,()=>{je()})}async function Pn(){try{await qt({suppressError:!0}),await Ht()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");D(t,"error")}finally{Fa(),Oe(),Ma(),It(),je(),Ee(),$e(),jn()}}function Ct(){Oe(),It(),je(),Ee(),$e(),Rt()}function wn(){Ra(),Oe()}function Sn(){Ia(),Oe()}la();da();ua();za();xn();document.addEventListener("DOMContentLoaded",()=>{ma(),pa()});const it=.15,Ie={},Tn="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let Ae=0;const w={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},_e=Object.freeze({projects:`
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
  `});let z=null;const Xt=["upcoming","ongoing","completed"];async function An({forceProjects:e=!1}={}){try{await qt({suppressError:!0}),await Wa({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),Ve(t)&&console.warn("Projects API error:",t.message)}ta()}async function $n(){Cn(),Zt(),await En();try{await An({forceProjects:!0}),na(),Rn(),ee()}finally{ea()}document.addEventListener("language:changed",_n),document.addEventListener("projects:changed",()=>{ct().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{ct().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",Bn)}document.addEventListener("DOMContentLoaded",$n);async function En(){if(z)return z;if(typeof window>"u")return null;if(window.ApexCharts)return z=window.ApexCharts,z;try{await Nn(Tn),z=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),z=null}return z}function Nn(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function Cn(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function Qt(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function Zt(){Ae+=1,Ae===1&&Qt(!0)}function ea(){Ae=Math.max(0,Ae-1),Ae===0&&Qt(!1)}function ta(){const{customers:e=[]}=Mt();w.customers=Array.isArray(e)?e:[],w.reservations=mt();const t=new Map(w.customers.map(s=>[String(s.id),s])),a=bt();w.projects=Array.isArray(a)?a.map(s=>Ln(s,t)):[],w.totalProjects=w.projects.length}function Ln(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=Dn(e.id),l=r.reduce((Q,A)=>Q+kn(A),0),i=Fn(e),u=Number(e?.equipmentEstimate)||0,c=Number((u+i).toFixed(2)),m=e?.applyTax===!0||e?.applyTax==="true",d=m?Number((c*it).toFixed(2)):0,j=m?Number(((c+l)*it).toFixed(2)):0,C=Number((c+l+j).toFixed(2)),N=Mn(e),M=e.start?new Date(e.start):null,T=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:M,end:T,applyTax:m,status:N,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:d,combinedTaxAmount:j,overallTotal:C,unpaidValue:a==="paid"?0:C,reservationsCount:r.length}}function Dn(e){return Array.isArray(w.reservations)?w.reservations.filter(t=>String(t.projectId)===String(e)):[]}function kn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(g(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=_t(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(g(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Fn(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function Mn(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function Rn(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{w.filters.search=p.search.value.trim(),ee()},180)})}p.payment&&(p.payment.value=w.filters.payment,p.payment.addEventListener("change",()=>{w.filters.payment=p.payment.value||"all",ee()})),p.dateRange&&(p.dateRange.addEventListener("change",In),p.dateRange.value=w.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{w.filters.startDate=p.startDate.value,w.filters.range==="custom"&&ee()}),p.endDate&&p.endDate.addEventListener("change",()=>{w.filters.endDate=p.endDate.value,w.filters.range==="custom"&&ee()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(w.filters.range!=="custom"){ee();return}w.filters.startDate=p.startDate?.value||"",w.filters.endDate=p.endDate?.value||"",ee()})}function In(e){const t=e.target.value;w.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),w.filters.startDate="",w.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),ee())}async function ct(){Zt();try{await Promise.all([Ht(),Ba()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),Ve(e)&&console.warn("Projects API error:",e.message)}finally{ta(),ee(),ea()}}function _n(){na(),ee()}function Bn(e){e.key&&!["projects","reservations","customers"].includes(e.key)||ct().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function ee(){const e=qn();vt(),Vn(e),Gn(e),Jn(e),Kn(e),Yn(e),Xn(e)}function qn(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=w.filters,i=aa(e),u=new Date,c=Number(s);let m=null;if(s==="custom"){m=r?new Date(r):null;const d=l?new Date(l):null;return w.projects.filter(j=>!Lt(j,t)||!Dt(j,a)||!kt(j,i)?!1:On(j.start,m,d))}return s!=="all"&&Number.isFinite(c)&&(m=new Date,m.setDate(u.getDate()-c)),w.projects.filter(d=>!Lt(d,t)||!Dt(d,a)||!kt(d,i)?!1:s==="all"?!0:Hn(d.start,m,u))}function Lt(e,t){return t.includes(e.status)}function Dt(e,t){return t==="all"?!0:e.paymentStatus===t}function kt(e,t){return t?aa([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function Hn(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function On(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function aa(e){return e?g(String(e)).toLowerCase().trim():""}function Vn(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((i,u)=>i+u.overallTotal,0),s=e.reduce((i,u)=>i+u.unpaidValue,0),r=e.reduce((i,u)=>i+u.expensesTotal,0),l=[{icon:_e.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:lt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:_e.value,label:n("projects.reports.kpi.totalValue","Total value"),value:X(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:_e.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:X(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:_e.expenses,label:n("projects.reports.kpi.expenses","خدمات إنتاجية (التكلفة)"),value:X(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];p.kpiGrid.innerHTML=l.map(({icon:i,label:u,value:c,meta:m})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${H(u)}</p>
        <p class="reports-kpi-value">${H(c)}</p>
        <span class="reports-kpi-meta">${H(m)}</span>
      </div>
    </div>
  `).join(""),Un(e)}function Un(e){try{const t=zn(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:X(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:X(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:X(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:X(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:X(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:X(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","مصروفات المشروع","Project expenses"),value:`−${X(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:X(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:u})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${H(i)}</span>
            <span class="reports-kpi-detail-value">${H(u)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:p.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function zn(e){const t=new Set(e.map(A=>String(A.id))),a=w.reservations.filter(A=>A.projectId!=null&&t.has(String(A.projectId)));let s=0,r=0,l=0,i=0,u=0,c=0,m=0;a.forEach(A=>{const $=Ga(A);s+=$.finalTotal||0,r+=$.equipmentTotal||0,l+=$.crewTotal||0,i+=$.crewCostTotal||0,u+=$.companyShareAmount||0,c+=$.taxAmount||0,m+=$.netProfit||0});const d=e.reduce((A,$)=>A+(Number($.expensesTotal)||0),0),j=e.reduce((A,$)=>A+(Number($.raw?.equipmentEstimate)||0),0),C=e.reduce((A,$)=>{const q=$.applyTax===!0,Z=(Number($.raw?.equipmentEstimate)||0)+(Number($.expensesTotal)||0),W=q?Z*it:0;return A+W},0),N=s+j+C,M=r+j,T=c+C,Q=m-d;return{grossRevenue:N,companyShareTotal:u,taxTotal:T,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:M,projectExpensesTotal:d,netProfit:Q}}function na(){if(!p.statusChips)return;const e=Xt.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${H(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",Wn),p.statusChips.dataset.listenerAttached="true"),vt()}function Wn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(w.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&Xt.forEach(r=>s.add(r)),w.filters.statuses=Array.from(s),vt(),ee()}function vt(){if(!p.statusChips)return;const e=new Set(w.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Gn(e){if(!z)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(m=>m.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,m)=>c+m,0)>0?s:[],u={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>fe(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};Ue("status",t,u)}function Jn(e){if(!z)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(Zn(),{month:"short",year:"numeric"});e.forEach(d=>{if(!d.start||Number.isNaN(d.start.getTime()))return;const j=`${d.start.getFullYear()}-${d.start.getMonth()+1}`,C=a.get(j)||{total:0,label:s.format(d.start)};C.total+=d.overallTotal,a.set(j,C)});const l=Array.from(a.keys()).sort((d,j)=>{const[C,N]=d.split("-").map(Number),[M,T]=j.split("-").map(Number);return C===M?N-T:C-M}).slice(-12),i=l.map(d=>a.get(d)?.label||d),u=l.map(d=>Math.round(a.get(d)?.total||0)),c=u.length?[{name:n("projects.reports.datasets.value","Total value"),data:u}]:[],m={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:d=>fe(d)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:d=>fe(d)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Ue("timeline",t,m)}function Kn(e){if(!z)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((m,d)=>d.overallTotal-m.overallTotal).slice(0,6),s=a.map(m=>m.title||m.projectCode),r=a.map(m=>Math.round(m.overallTotal)),l=a.map(m=>Math.round(m.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","خدمات إنتاجية (التكلفة)"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:m=>fe(m)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:m=>fe(m)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Ue("expenses",t,c)}function Yn(e){if(!z)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const m=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),d=a.get(m)||0;a.set(m,d+c.overallTotal)});const s=Array.from(a.entries()).sort((c,m)=>m[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],u={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>fe(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>fe(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Ue("clients",t,u)}function Ue(e,t,a={}){if(!z||!t)return;if(Ie[e]){try{Ie[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete Ie[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new z(t,s);Ie[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function Xn(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=Qn(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${H(a.clientName)} <small class="text-muted">${H(a.clientCompany)}</small>`:H(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${H(a.title||a.projectCode)}</span>
            <small class="text-muted">${H(`#${a.projectCode}`)}</small>
          </div>
        </td>
        <td>${i}</td>
        <td>${H(r)}</td>
        <td>${H(s)}</td>
        <td>${H(X(a.overallTotal))}</td>
        <td>${H(l)}</td>
      </tr>
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",lt(e.length)).replace("{total}",lt(w.totalProjects))}}function Qn(e,t){if(!e&&!t)return"—";const a=e?Pt(e.toISOString()):"—",s=t?Pt(t.toISOString()):"—";return t?`${a} → ${s}`:a}function X(e){const t=Number(e)||0,s=He()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${g(r)} SR`}function lt(e){const a=He()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return g(new Intl.NumberFormat(a).format(e))}function fe(e){const a=He()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return g(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function Zn(){return He()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function H(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
