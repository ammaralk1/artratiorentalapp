import{v as la,w as da,x as _t,o as ft,s as L,t as n,l as Bt,n as g,A as ua,e as pa,m as ma,h as fa,i as ha,f as At,g as We}from"./auth.D9iQr7TS.js";/* empty css              */import{i as ba}from"./dashboardShell.BnOPGN2x.js";import{d as f,r as Se,a as Ee,u as Ce,s as P,b as ya,f as ht,h as va,i as ga,j as o,k as S,l as ja,m as bt,n as xa,o as $t,e as rt,p as Nt,q as Sa,t as Ta,g as wa,c as Pa,v as Aa,w as qt,x as $a,y as Na,z as Ea,A as Ca,B as ka,C as Da,D as La,E as Fa,F as Ma,G as Ra,H as Ia,I as Ge,J as _a,K as Ht,L as Ba,M as qa}from"./form.BXegXNhF.js";import"./customers.DdK3-bvN.js";import{g as yt,b as Ha,o as Oe,q as ot,a as Vt,D as it,l as Va}from"./reservationsService.cbvx-9hp.js";import{P as vt,l as gt,n as Et,u as Ot,o as jt,p as Ke,t as Ue,v as Oa,x as Ua,i as za,h as Wa,w as Ga,y as ct,z as lt,e as Ut,A as zt,B as Ka,C as Ja}from"./controller.DmOvCIO9.js";import{a as Ya}from"./calculations.DcWKoq9W.js";let Ct=null;function Xa(e){e&&Wt()!==e&&ft({[vt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Wt(){return _t()?.[vt]||""}function Gt(e){e&&dt()!==e&&ft({[gt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function dt(){return _t()?.[gt]||""}function Qa(e){if(!e)return"";const t=e.trim();return t?Object.values(Et).includes(t)?t:Et[t]||"":""}function Za(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Qa(t);if(a)return a}}catch{}return""}function Kt(e,t){!e||!f.tabPanes||!f.tabButtons||(f.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),f.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Xa(e))}function en(){if(!f.tabButtons||!f.tabButtons.length)return;f.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Kt(r,a),r==="projects-section"&&(P.filters.search="",f.search&&(f.search.value=""),Se(),Ee(),Ce()))}),a.dataset.tabListenerAttached="true")});const e=Wt(),t=e&&f.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function xt(e,t){!e||!f.projectSubTabButtons||!f.projectSubTabPanes||(f.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),f.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function tn(){!f.projectSubTabButtons||!f.projectSubTabButtons.length||(f.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(xt(a,e),Gt(a))}),e.dataset.tabListenerAttached="true")}),an())}function an(){const t=Za()||dt();if(!t)return;const a=f.projectSubTabButtons?.[0],s=f.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==dt()&&Gt(r),xt(r,s))}function nn(){return f.tabButtons?f.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function kt(e={}){if(e){if(f.tabButtons&&f.tabButtons.length){const a=f.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[vt];if(s&&s!==a){const r=f.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Kt(s,r)}}if(f.projectSubTabButtons&&f.projectSubTabButtons.length&&nn()){const a=f.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[gt];if(s&&s!==a){const r=f.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&xt(s,r)}}}}function sn(){Ct||(Ct=la(e=>{kt(e)})),da().then(e=>{kt(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function ye(e){const t=P.projects.find(j=>String(j.id)===String(e));if(!t||!f.detailsBody)return;f.detailsBody.dataset.mode="view",f.detailsBody.dataset.projectId=String(t.id);const s=(P.customers.length?P.customers:Bt().customers||[]).find(j=>String(j.id)===String(t.clientId)),r=Qt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),d=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",m=c?g(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),u=s?.email??t.clientEmail??t.customerEmail??"",x=u?String(u).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),F=(t.clientCompany||s?.companyName||"").trim(),k=t.projectCode||`PRJ-${g(String(t.id))}`,B=g(k),N=ht(t.id),te=N.reduce((j,C)=>j+Zt(C),0),D=Number(te.toFixed(2)),$=N.length,{subtotal:U,applyTax:re,expensesTotal:J}=va(t),me=Number(t?.servicesClientPrice??t?.services_client_price??0),ke=U,Te=re?Number(((ke+D)*Ue).toFixed(2)):0,ge=Number((ke+D+Te).toFixed(2)),ae=ga(t),De=n(`projects.status.${ae}`,Oa[ae]||ae),Fe=(()=>{try{const j=t.start?new Date(t.start):null,C=t.end?new Date(t.end):j?new Date(j.getTime()+3600*1e3):null;return!j||!C||Number.isNaN(j.getTime())||Number.isNaN(C.getTime())?!1:P.projects.some(q=>{if(!q||String(q.id)===String(t.id))return!1;const O=q.start?new Date(q.start):null,z=q.end?new Date(q.end):O?new Date(O.getTime()+3600*1e3):null;if(!O||!z||Number.isNaN(O.getTime())||Number.isNaN(z.getTime()))return!1;const A=Math.max(j.getTime(),O.getTime()),Z=Math.min(C.getTime(),z.getTime());return A<Z})}catch{return!1}})()&&ae!=="completed"?"conflict":ae,oe={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل",conflict:"تعارض"}[Fe]||De,je={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed",conflict:"timeline-status-badge timeline-status-badge--conflict"}[Fe]||"timeline-status-badge timeline-status-badge--upcoming",Ye=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",fe=bn(t),xe=fe.length>0,h=xe?0:Number(t.paidAmount)||0,b=xe?0:Number(t.paidPercent)||0;let y=ge,v,T,E,R,I,_,Q,H,Y,Me;const Re=fn(fe),Pe=n("projects.focus.confirmed","✅ مشروع مؤكد"),Xe=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(Pe)}</span>`:"";let M=[];if($>0){const j=N.reduce((qe,ce)=>{const ca=Array.isArray(ce.items)?ce.items:[],Pt=Array.isArray(ce.crewAssignments)?ce.crewAssignments:[],be=Pt.length?Pt:Array.isArray(ce.technicians)?ce.technicians:[],st=Ha({items:ca,technicianIds:Array.isArray(be)&&!be.length?be:[],crewAssignments:Array.isArray(be)&&be.length&&typeof be[0]=="object"?be:[],discount:ce.discount??0,discountType:ce.discountType||"percent",applyTax:!1,start:ce.start,end:ce.end,companySharePercent:null});return qe.equipment+=Number(st.equipmentTotal||0),qe.crew+=Number(st.crewTotal||0),qe.crewCost+=Number(st.crewCostTotal||0),qe},{equipment:0,crew:0,crewCost:0}),C=Number(J||0),q=Number((j.equipment+j.crew+me).toFixed(2)),O=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let A=(t?.discountType==="amount"?"amount":"percent")==="amount"?O:q*(O/100);(!Number.isFinite(A)||A<0)&&(A=0),A>q&&(A=q);const Z=re===!0,de=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",ue=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ne=de&&ue>0?ue:0,K=Math.max(0,q-A),ie=Number((K*(ne/100)).toFixed(2)),pe=Z?Number(((K+ie)*Ue).toFixed(2)):0,$e=Number((K+ie+pe).toFixed(2)),ia=Number(($e-ie-pe-C-j.crewCost).toFixed(2));j.equipment>0&&M.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:S(j.equipment)}),j.crew>0&&M.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:S(j.crew)}),j.crewCost>0&&M.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:S(j.crewCost)}),C>0&&M.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:S(C)}),me>0&&M.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:S(me)}),A>0&&M.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${S(A)}`}),M.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:S(K)}),ie>0&&M.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${S(ie)}`}),pe>0&&M.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${S(pe)}`}),M.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:S(ia)}),M.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:S($e)}),y=$e}else{const j=Number(J||0),C=Math.max(0,Number(me)||0),q=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let z=(t?.discountType==="amount"?"amount":"percent")==="amount"?q:C*(q/100);(!Number.isFinite(z)||z<0)&&(z=0),z>C&&(z=C);const A=Math.max(0,C-z),Z=re===!0,de=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",ue=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ne=de&&ue>0?ue:0,K=Number((A*(ne/100)).toFixed(2)),ie=Z?Number(((A+K)*Ue).toFixed(2)):0,pe=Number((A+K+ie).toFixed(2)),$e=Number((pe-K-ie-j).toFixed(2));M=[],M.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:S(C)}),z>0&&M.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${S(z)}`}),M.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:S(A)}),K>0&&M.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${S(K)}`}),ie>0&&M.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${S(ie)}`}),M.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:S($e)}),M.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:S(pe)}),y=pe}v=Oe({totalAmount:y,paidAmount:h,paidPercent:b,history:fe}),T=ot({manualStatus:Ye||"unpaid",paidAmount:v.paidAmount,paidPercent:v.paidPercent,totalAmount:y}),E=n(`projects.paymentStatus.${T}`,T==="paid"?"Paid":T==="partial"?"Partial":"Unpaid"),R=T==="paid"?"status-paid":T==="partial"?"status-partial":"status-unpaid",I=Number.isFinite(Number(v.paidAmount))?Number(v.paidAmount):0,_=Number.isFinite(Number(v.paidPercent))?Number(v.paidPercent):0,Q=Math.max(0,Number((y-I).toFixed(2))),H=S(I),Y=`${g(_.toFixed(2))}%`,Me=S(Q);const wt=M.map(({icon:j,label:C,value:q})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${j} ${o(C)}</span>
      <span class="summary-details-value">${o(q)}</span>
    </div>
  `).join(""),Ie=n("projects.details.labels.code","رقم المشروع"),Qe=`
    <div class="project-details-code-badge" title="${o(Ie)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Ie)}
      </span>
      <span class="project-details-code-badge__value">${o(B)}</span>
    </div>
  `,Ze=[{icon:"👤",label:n("projects.details.client","العميل"),value:d},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:m},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:x},F?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:F}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:`<span class="project-type-chip project-type-chip--${t.type||"default"}">${o(r)}</span>`},Lt("start",t.start),Lt("end",t.end)].filter(Boolean),et=n("projects.details.overview.heading","معلومات المشروع"),tt=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(et)}</h6>
      <ul class="project-details-outline__list">
        ${Ze.map(({icon:j,label:C,value:q,meta:O})=>`
          <li>
            <span class="project-details-outline__label">${o(j)} ${o(C)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${o(q)}</span>
              ${O?`<span class="project-details-outline__meta">${o(O)}</span>`:""}
            </span>
          </li>
        `).join("")}
      </ul>
    </div>
  `,Ae=$>0?n("projects.details.chips.linkedReservation","مربوط بحجز"):n("projects.details.chips.notLinkedReservation","غير مربوط بحجز"),_e=$>0?"reservation-chip status-confirmed":"reservation-chip status-info",at=[`<span class="${je}">${o(oe)}</span>`,`<span class="${_e}">${o(Ae)}</span>`,`<span class="reservation-chip ${R}">${o(E)}</span>`,Xe].filter(Boolean).join(""),G=n("projects.details.expensesTotal","تكلفة الخدمات الإنتاجية"),nt=n("projects.details.reservationsTotal","إجمالي الحجوزات"),Be=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",S(J)),he=rn(Array.isArray(t.expenses)?t.expenses:[]);f.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${at}</div>
        </div>
        <div class="project-details-header__code">
          ${Qe}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${tt}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(n("projects.details.summary.title","الملخص المالي"))}</h6>
            ${wt}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.description","وصف المشروع"))}</h5>
      <p class="project-details-description">${o(i)}</p>
    </section>
    <section class="project-details-section">
      <h5>${o(Be)}</h5>
      ${he}
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.financialBreakdown","تفاصيل مالية"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(G)}</span>
          <strong>${S(J)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(nt)}</span>
          <strong>${S(D)}</strong>
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
          <strong>${o(H)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(Y)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(Me)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${Re}
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
  `,ln(t);const V=f.detailsBody.querySelector("#project-details-export-btn");V&&V.addEventListener("click",async j=>{if(j.preventDefault(),V.blur(),!V.disabled){V.disabled=!0;try{await Ua({project:t})}catch(C){console.error("❌ [projects/details] export project PDF failed",C),L(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{V.disabled=!1}}}),f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl).show()}function rn(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
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
  `}function on({onOpenProject:e}){!f.focusCards||f.focusCards.dataset.listenerAttached==="true"||(f.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),un(l);return}r==="view"?e?.(l):r==="highlight"&&cn(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),f.focusCards.dataset.listenerAttached="true")}function cn(e){if(!f.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=f.projectsTableBody.querySelector(t);if(!a){L(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function ln(e){if(!f.detailsBody)return;const t=f.detailsBody.querySelector('[data-action="create-reservation"]'),a=f.detailsBody.querySelector('[data-action="edit-project"]'),s=f.detailsBody.querySelector('[data-action="delete-project"]'),r=f.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(ht(e.id)||[]).some(d=>{const c=String(d?.status||d?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ المشروع مربوط بحجز مسبقاً"),t.addEventListener("click",d=>{d.preventDefault(),L(n("projects.details.reservations.createDisabledToast","⚠️ المشروع مربوط بحجز مسبقاً"))})):(t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",d=>{d.preventDefault(),Dt(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),Dt(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),Jt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await xa(e.id),!P.projects.some(c=>String(c.id)===String(e.id))&&f.detailsModalEl&&window.bootstrap?.Modal.getInstance(f.detailsModalEl)?.hide()}finally{P.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const d=Wa("showReservationDetails");if(typeof d=="function")return d(i),!0;try{const c=await Ga("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const d=i.target.closest('[data-action="view-reservation"]');if(!d)return;const c=d.dataset.index||d.dataset.reservationIndex,m=Number.parseInt(c||"-1",10);if(!Number.isInteger(m)||m<0)return;await l(m)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const d=i.target.closest('[data-action="view-reservation"]');d&&(i.preventDefault(),d.click())})}}function Jt(e){if(!e||!f.detailsBody)return;const t=P.projects.find(u=>String(u.id)===String(e.id));if(!t)return;const a=P.customers.find(u=>String(u.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const s=Array.isArray(t.expenses)?t.expenses.map((u,x)=>({id:u?.id||`expense-${t.id}-${x}-${Date.now()}`,label:u?.label||"",amount:Number(u?.amount)||0,salePrice:Number.isFinite(Number(u?.sale_price??u?.salePrice))?Number(u?.sale_price??u?.salePrice):0})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((u,x)=>({type:u?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(u?.amount))?Number(u.amount):null,percentage:Number.isFinite(Number(u?.percentage))?Number(u.percentage):null,value:Number.isFinite(Number(u?.value))?Number(u.value):null,note:u?.note??null,recordedAt:u?.recordedAt??u?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${x}`})):[],l=r.reduce((u,x)=>u+(Number(x?.amount)||0),0),i=r.reduce((u,x)=>u+(Number(x?.percentage)||0),0),d=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,c=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(d>0||c>0)){const u=t.updatedAt??t.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(d)&&d>0?d:null,percentage:c,value:c,note:null,recordedAt:u,key:`legacy-payment-${t.id}-percent`}]:d>0&&(r=[{type:"amount",amount:d,percentage:null,value:d,note:null,recordedAt:u,key:`legacy-payment-${t.id}-amount`}]),l=r.reduce((x,F)=>x+(Number(F?.amount)||0),0),i=r.reduce((x,F)=>x+(Number(F?.percentage)||0),0),d=0,c=0}l>0&&Math.abs(d-l)<.01&&(d=0),i>0&&Math.abs(c-i)<.01&&(c=0);const m={expenses:s,payments:r,basePaidAmount:d,basePaidPercent:c};f.detailsBody.dataset.mode="edit",f.detailsBody.innerHTML=pn(t,m),dn(t,m)}function dn(e,t={expenses:[]}){const a=f.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",h=>{h.preventDefault(),ye(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),d=a.querySelector('[data-action="add-expense"]'),c=a.querySelector("#project-edit-expense-list"),m=a.querySelector('[name="project-start-date"]'),u=a.querySelector('[name="project-start-time"]'),x=a.querySelector('[name="project-end-date"]'),F=a.querySelector('[name="project-end-time"]'),k=a.querySelector('[name="project-payment-status"]'),B=a.querySelector("#project-edit-tax"),N=a.querySelector("#project-edit-company-share"),te=a.querySelector("#project-edit-discount"),D=a.querySelector("#project-edit-discount-type"),$=a.querySelector("#project-edit-payment-progress-type"),U=a.querySelector("#project-edit-payment-progress-value"),re=a.querySelector("#project-edit-payment-add"),J=a.querySelector("#project-edit-payment-history"),me=a.querySelector("#project-edit-payment-summary"),ke=n("reservations.create.summary.currency","SR");let Te=!1;const ge=h=>{if(!h||h.dataset.normalizedDigits==="true")return;const b=()=>{const y=h.value||"",v=g(y);if(v!==y){const T=h.selectionStart,E=h.selectionEnd;h.value=v;try{if(typeof T=="number"&&typeof E=="number"){const R=v.length-y.length;h.setSelectionRange(Math.max(0,T+R),Math.max(0,E+R))}}catch{}}};h.addEventListener("input",b),h.addEventListener("blur",b);try{h.setAttribute("inputmode","numeric")}catch{}h.dataset.normalizedDigits="true"};ge(m),ge(u),ge(x),ge(F);const ae=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),De=()=>{const h=Number(e.equipmentEstimate)||0,b=Array.isArray(t.expenses)?t.expenses.reduce((H,Y)=>H+(Number(Y.amount)||0),0):0,y=Array.isArray(t.expenses)?Math.max(0,Math.round(t.expenses.reduce((H,Y)=>H+Number(Y?.salePrice??0),0)*100)/100):Math.max(0,Number(e?.servicesClientPrice??0)),v=D?.value==="amount"?"amount":"percent",T=g(te?.value||"0");let E=Number.parseFloat(T);(!Number.isFinite(E)||E<0)&&(E=0);const R=B?.checked===!0,I=N?.checked===!0;let _=I?wa(N):null;(!Number.isFinite(_)||_<=0)&&(_=I?it:null);const Q=Pa({equipmentEstimate:h,expensesTotal:b,servicesClientPrice:y,discountValue:E,discountType:v,applyTax:R,companyShareEnabled:I,companySharePercent:_});return{equipmentEstimate:h,expensesTotal:b,discountValue:E,discountTypeValue:v,applyTax:R,companyShareEnabled:I,companySharePercent:_,servicesClientPrice:y,finance:Q}},Le=()=>{const h=De(),b=ae(),v=(ht(e.id)||[]).reduce((_,Q)=>_+(Number(Q?.totalAmount)||Zt(Q)||0),0),T=Number(h.finance?.taxableAmount||0),E=h.applyTax?Number(((T+v)*Ue).toFixed(2)):0,R=Number((T+v+E).toFixed(2)),I=Oe({totalAmount:R,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:b});return{...h,combinedTotalWithTax:R,payments:b,progress:I}},Fe=()=>{J&&(J.innerHTML=hn(ae()))},le=()=>{if(!me)return;const{combinedTotalWithTax:h,progress:b}=Le(),y=Number.isFinite(Number(h))?Number(h):0,v=Number.isFinite(Number(b.paidAmount))?Number(b.paidAmount):0,T=Number.isFinite(Number(b.paidPercent))?Number(b.paidPercent):0,E=Math.max(0,Math.round((y-v)*100)/100),R=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:S(y)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:S(v)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${g(T.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:S(E)}];me.innerHTML=R.map(({label:I,value:_})=>`
        <div class="project-details-grid-item">
          <span>${o(I)}</span>
          <strong>${o(_)}</strong>
        </div>
      `).join("")},oe=(h="auto")=>{if(!k)return;const b=k.dataset?.userSelected==="true";if(h==="auto"&&b)return;const{finance:y,progress:v}=Le(),T=ot({manualStatus:b?k.value:e.paymentStatus||"unpaid",paidAmount:v.paidAmount,paidPercent:v.paidPercent,totalAmount:y.totalWithTax});b||(k.value=T)},we=()=>{Fe(),le(),oe("auto")},je=1e-4,Ye=()=>{const h=$?.value==="amount"?"amount":"percent",b=g(U?.value||"").replace("%","").trim();let y=Number.parseFloat(b);if(!Number.isFinite(y)||y<=0){L(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),U?.focus();return}const v=Le(),T=Number.isFinite(Number(v.finance.totalWithTax))?Number(v.finance.totalWithTax):0;if(T<=0){L(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const E=Number(v.progress.paidAmount)||0,R=Number(v.progress.paidPercent)||0;let I=null,_=null;if(h==="percent"){const H=Math.max(0,100-R);if(H<=je){L(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>H){y=H;const Y=g(y.toFixed(2));L(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",Y))}_=Math.round(y*100)/100,T>0&&(I=Math.round(_/100*T*100)/100)}else{const H=Math.max(0,T-E);if(H<=je){L(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>H){y=H;const Y=`${g(y.toFixed(2))} ${ke}`;L(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",Y))}I=Math.round(y*100)/100,T>0&&(_=Math.round(I/T*100*100)/100)}const Q={type:h,amount:I??null,percentage:_??null,value:h==="amount"?I:_,note:null,recordedAt:new Date().toISOString()};t.payments=[...ae(),Q],U&&(U.value=""),$&&($.value="percent"),we(),L(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},fe=h=>{!B||!N||Te||(Te=!0,h==="share"?N.checked?(B.checked||(B.checked=!0),rt(N)):B.checked&&(B.checked=!1):h==="tax"&&(B.checked?rt(N):N.checked&&(N.checked=!1)),Te=!1)};function xe(){c&&(c.innerHTML=Yt(t.expenses))}xe(),we(),te&&!te.dataset.listenerAttached&&(te.addEventListener("input",h=>{const b=h.target;b instanceof HTMLInputElement&&(b.value=g(b.value||""),le(),oe("auto"))}),te.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",h=>{const b=h.target;b instanceof HTMLInputElement&&(b.value=g(b.value||""))}),i.dataset.listenerAttached="true"),D&&!D.dataset.listenerAttached&&(D.addEventListener("change",()=>{le(),oe("auto")}),D.dataset.listenerAttached="true"),U&&!U.dataset.listenerAttached&&(U.addEventListener("input",h=>{const b=h.target;b instanceof HTMLInputElement&&(b.value=g(b.value||""))}),U.dataset.listenerAttached="true"),k&&!k.dataset.listenerAttached&&(k.addEventListener("change",()=>{k.dataset.userSelected="true"}),k.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",h=>{const b=h.target;b instanceof HTMLInputElement&&(b.value=g(b.value||""))}),l.dataset.listenerAttached="true"),N&&!N.dataset.listenerAttached&&(N.addEventListener("change",()=>{fe("share"),le(),oe("auto")}),N.dataset.listenerAttached="true"),B&&!B.dataset.listenerAttached&&(B.addEventListener("change",()=>{fe("tax"),le(),oe("auto")}),B.dataset.listenerAttached="true"),N?.checked&&rt(N),fe(N?.checked?"share":"tax"),le(),oe("auto"),d&&d.addEventListener("click",h=>{h.preventDefault();const b=r?.value.trim()||"",y=g(l?.value||"0"),v=Number(y),T=g(i?.value||"0"),E=Number(T);if(!b){L(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(v)||v<=0){L(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:b,amount:v,salePrice:Number.isFinite(E)&&E>0?E:0}),r&&(r.value=""),l&&(l.value=""),i&&(i.value=""),xe(),le(),oe("auto")}),c&&c.addEventListener("click",h=>{const b=h.target.closest('[data-action="remove-expense"]');if(!b)return;const{id:y}=b.dataset;t.expenses=t.expenses.filter(v=>String(v.id)!==String(y)),xe(),le(),oe("auto")}),re&&!re.dataset.listenerAttached&&(re.addEventListener("click",h=>{h.preventDefault(),Ye()}),re.dataset.listenerAttached="true"),J&&!J.dataset.listenerAttached&&(J.addEventListener("click",h=>{const b=h.target.closest('[data-action="remove-payment"]');if(!b)return;const y=Number.parseInt(b.dataset.index||"-1",10);if(!Number.isInteger(y)||y<0)return;const v=ae();if(y>=v.length)return;const T=v.filter((E,R)=>R!==y);t.payments=T,we(),L(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),J.dataset.listenerAttached="true"),a.addEventListener("submit",async h=>{if(h.preventDefault(),a.dataset.submitting==="true")return;const b=a.querySelector('[name="project-title"]'),y=a.querySelector('[name="project-type"]'),v=a.querySelector('[name="project-description"]'),T=b?.value.trim()||"",E=y?.value||"",R=g(m?.value.trim()||""),I=g(u?.value.trim()||""),_=v?.value.trim()||"",Q=(k?.value||"unpaid").toLowerCase(),H=["paid","partial"].includes(Q)?Q:"unpaid";if(!T||!E||!R){L(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),b?.focus();return}const Y=g(x?.value.trim()||""),Me=g(F?.value.trim()||""),Re=Nt(R,I),Pe=Y?Nt(Y,Me):"",Xe=new Date(Re),M=Pe?new Date(Pe):null;if(M&&Xe>M){L(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),x?.focus();return}if(P.projects.findIndex(A=>String(A.id)===String(e.id))===-1){L(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Ie=De(),{equipmentEstimate:Qe,servicesClientPrice:Ze,discountValue:et,discountTypeValue:tt,applyTax:Ae,companyShareEnabled:_e,companySharePercent:at,finance:G}=Ie,nt=$?.value==="amount"?"amount":"percent",Be=g(U?.value||"");let he=Be?Number.parseFloat(Be):null,V=[...ae()];if(Number.isFinite(he)&&he>0&&Number.isFinite(Number(G.totalWithTax))){const A=Oe({totalAmount:G.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:V}),Z=new Date().toISOString();if(nt==="percent"){const de=Math.max(0,100-(A.paidPercent||0));if(de>je){const ue=Math.min(he,de),ne=Math.round(ue*100)/100,K=G.totalWithTax>0?Math.round(ne/100*G.totalWithTax*100)/100:null;V=[...V,{type:"percent",amount:K,percentage:ne,value:ne,note:null,recordedAt:Z}]}}else{const de=Math.max(0,G.totalWithTax-(A.paidAmount||0));if(de>je){const ue=Math.min(he,de),ne=Math.round(ue*100)/100,K=G.totalWithTax>0?Math.round(ne/G.totalWithTax*100*100)/100:null;V=[...V,{type:"amount",amount:ne,percentage:K,value:ne,note:null,recordedAt:Z}]}}V!==t.payments&&(t.payments=V,we()),U&&(U.value=""),$&&($.value="percent"),he=null}const j=Oe({totalAmount:G.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:V}),C=k?.dataset?.userSelected==="true",q=ot({manualStatus:C?H:e.paymentStatus||H,paidAmount:j.paidAmount,paidPercent:j.paidPercent,totalAmount:G.totalWithTax}),O=C?H:q;!C&&k&&(k.value=O),k?.dataset&&delete k.dataset.userSelected,t.payments=V;const z=za({projectCode:e.projectCode,title:T,type:E,clientId:e.clientId,clientCompany:e.clientCompany,description:_,start:Re,end:Pe||null,applyTax:Ae,paymentStatus:O,equipmentEstimate:Qe,expenses:t.expenses,servicesClientPrice:Ze,discount:et,discountType:tt,companyShareEnabled:_e&&Ae,companySharePercent:_e&&Ae?at:null,companyShareAmount:G.companyShareAmount,taxAmount:G.taxAmount,totalWithTax:G.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:Sa(e),paidAmount:j.paidAmount,paidPercentage:j.paidPercent,paymentProgressType:j.paymentProgressType,paymentProgressValue:j.paymentProgressValue,payments:V});a.dataset.submitting="true";try{const A=await Ot(e.projectId??e.id,z),Z=A?.projectId??A?.id??e.id;await Ta(Z,O),P.projects=jt(),P.reservations=yt(),L(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),Se(),Ee(),Ce(),ye(e.id)}catch(A){console.error("❌ [projects] Failed to update project from details view",A);const Z=Ke(A)?A.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");L(Z,"error")}finally{delete a.dataset.submitting}})}function Dt(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description,fromProjectForm:!0,draftStorageKey:"projects:create:draft",returnUrl:`projects.html?project=${encodeURIComponent(e.id)}&linked=1#projects-section`};ft({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function un(e){if(!e)return;const t=P.projects.find(a=>String(a.id)===String(e));if(!t){L(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){L(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Ot(t.projectId??t.id,{confirmed:!0});const a=await ya(e);P.projects=jt(),P.reservations=yt(),Se(),Ee(),Ce(),f.detailsModalEl&&f.detailsModalEl.classList.contains("show")&&f.detailsBody?.dataset.projectId===String(e)&&ye(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),L(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=Ke(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");L(s,"error")}}function pn(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=$t(e.start||""),{date:r,time:l}=$t(e.end||""),i=e.applyTax===!0||e.applyTax==="true";typeof e.paymentStatus=="string"&&e.paymentStatus.toLowerCase();const d=e.discountType==="amount"?"amount":"percent",c=g(String(e.discount??e.discountValue??0));g(String(e.servicesClientPrice??e.services_client_price??0));const m=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??it,u=Number.parseFloat(g(String(m))),x=Number.isFinite(u)&&u>0?u:it,F=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(u)&&u>0;return`
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
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(x))}" ${F?"checked":""}>
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
      </div>`}const t=o(n("actions.remove","إزالة")),a=e.map(i=>{const d=o(i?.label||""),c=o(S(i?.amount||0)),m=o(S(i?.salePrice||i?.sale_price||0)),u=o(String(i?.id||""));return`
      <tr>
        <td>${d}</td>
        <td>${c}</td>
        <td>${m}</td>
        <td><button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${u}" aria-label="${t}">✖</button></td>
      </tr>`}).join(""),s=e.reduce((i,d)=>i+(Number(d?.salePrice??d?.sale_price)||0),0),r=o(S(s)),l=o(n("projects.expenses.table.totalSale","مجموع سعر البيع"));return`
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
    </div>`}function fn(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(S(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${g(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?g(bt(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(g(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function hn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(S(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${g(Number(a.percentage).toFixed(2))}%`:"—",d=a?.recordedAt?g(bt(a.recordedAt)):"—",c=a?.note?o(g(a.note)):"",m=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
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
  `}function bn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(yn).filter(Boolean);if(a.length>0)return a;const s=ze(e.paidPercent??e.paid_percent),r=ze(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Xt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function yn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=ze(e.amount??(a==="amount"?e.value:null)),r=ze(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,d=Xt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:d}}function ze(e){if(e==null||e==="")return null;const t=g(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Xt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Lt(e,t){if(!t)return null;const{date:a,time:s}=vn(bt(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية المشروع"):n("projects.details.labels.end","نهاية المشروع");return{icon:l,label:i,value:a,meta:s}}function vn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Qt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function Zt(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(g(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Vt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(g(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function St(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function gn(){return St(ct)}function jn(){return St(lt)}function xn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[ct,lt,"linked"].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let m=!1;[ct,lt,"linked"].forEach(u=>{c.has(u)&&(c.delete(u),m=!0)}),m&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),d=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",d)}catch{}}function Sn(){const e=gn(),t=jn(),a=St("linked");e&&(P.pendingProjectDetailId=e),t&&(P.pendingProjectEditId=t,P.pendingProjectDetailId||(P.pendingProjectDetailId=t)),a!=null&&String(a)!==""&&String(a)!=="0"&&String(a).toLowerCase()!=="false"&&(P.pendingLinkedToast=!0),(e||t)&&xn()}function Tn(){if(!P.pendingProjectDetailId)return;const e=P.pendingProjectDetailId,t=String(e),a=P.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;P.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(ye(s),P.pendingLinkedToast){P.pendingLinkedToast=!1;try{L(n("projects.toast.linkedReservationCreated","✅ تم ربط الحجز بالمشروع"))}catch{}}if(P.pendingProjectEditId!=null){const r=String(P.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&(P.pendingProjectEditId=null,setTimeout(()=>Jt(a),0))}}function wn(){document.addEventListener("DOMContentLoaded",()=>{sn(),Sn(),Aa(),qt(),$a(),en(),tn(),Na(),Ea(),Ca(),ka(),Da(),La(),Fa({onViewDetails:ye}),on({onOpenProject:ye}),Ma(),Pn()}),document.addEventListener("language:changed",Ft),document.addEventListener("language:translationsReady",Ft),document.addEventListener("customers:changed",An),document.addEventListener("technicians:updated",$n),document.addEventListener("reservations:changed",()=>Ra(ye)),document.addEventListener(ua.USER_UPDATED,()=>{Se()})}async function Pn(){try{await Ut({suppressError:!0}),await zt()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");L(t,"error")}finally{Ia(),Ge(),_a(),Ht(),Se(),Ce(),Ee(),Tn()}}function Ft(){Ge(),Ht(),Se(),Ce(),Ee(),qt()}function An(){Ba(),Ge()}function $n(){qa(),Ge()}pa();ma();fa();Ka();wn();document.addEventListener("DOMContentLoaded",()=>{ba(),ha()});const ut=.15,He={},Nn="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let Ne=0;const w={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Ve=Object.freeze({projects:`
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
  `});let X=null;const ea=["upcoming","ongoing","completed"];async function En({forceProjects:e=!1}={}){try{await Ut({suppressError:!0}),await Ja({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),Ke(t)&&console.warn("Projects API error:",t.message)}sa()}async function Cn(){Ln(),aa(),await kn();try{await En({forceProjects:!0}),oa(),Bn(),se()}finally{na()}document.addEventListener("language:changed",Hn),document.addEventListener("projects:changed",()=>{pt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{pt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",Vn)}document.addEventListener("DOMContentLoaded",Cn);async function kn(){if(X)return X;if(typeof window>"u")return null;if(window.ApexCharts)return X=window.ApexCharts,X;try{await Dn(Nn),X=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),X=null}return X}function Dn(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function Ln(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function ta(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function aa(){Ne+=1,Ne===1&&ta(!0)}function na(){Ne=Math.max(0,Ne-1),Ne===0&&ta(!1)}function sa(){const{customers:e=[]}=Bt();w.customers=Array.isArray(e)?e:[],w.reservations=yt();const t=new Map(w.customers.map(s=>[String(s.id),s])),a=jt();w.projects=Array.isArray(a)?a.map(s=>Fn(s,t)):[],w.totalProjects=w.projects.length}function Fn(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=Mn(e.id),l=r.reduce((te,D)=>te+Rn(D),0),i=In(e),d=Number(e?.equipmentEstimate)||0,c=Number((d+i).toFixed(2)),m=e?.applyTax===!0||e?.applyTax==="true",u=m?Number((c*ut).toFixed(2)):0,x=m?Number(((c+l)*ut).toFixed(2)):0,F=Number((c+l+x).toFixed(2)),k=_n(e),B=e.start?new Date(e.start):null,N=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:B,end:N,applyTax:m,status:k,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:u,combinedTaxAmount:x,overallTotal:F,unpaidValue:a==="paid"?0:F,reservationsCount:r.length}}function Mn(e){return Array.isArray(w.reservations)?w.reservations.filter(t=>String(t.projectId)===String(e)):[]}function Rn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(g(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Vt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(g(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function In(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function _n(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function Bn(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{w.filters.search=p.search.value.trim(),se()},180)})}p.payment&&(p.payment.value=w.filters.payment,p.payment.addEventListener("change",()=>{w.filters.payment=p.payment.value||"all",se()})),p.dateRange&&(p.dateRange.addEventListener("change",qn),p.dateRange.value=w.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{w.filters.startDate=p.startDate.value,w.filters.range==="custom"&&se()}),p.endDate&&p.endDate.addEventListener("change",()=>{w.filters.endDate=p.endDate.value,w.filters.range==="custom"&&se()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(w.filters.range!=="custom"){se();return}w.filters.startDate=p.startDate?.value||"",w.filters.endDate=p.endDate?.value||"",se()})}function qn(e){const t=e.target.value;w.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),w.filters.startDate="",w.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),se())}async function pt(){aa();try{await Promise.all([zt(),Va()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),Ke(e)&&console.warn("Projects API error:",e.message)}finally{sa(),se(),na()}}function Hn(){oa(),se()}function Vn(e){e.key&&!["projects","reservations","customers"].includes(e.key)||pt().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function se(){const e=On();Tt(),Wn(e),Yn(e),Xn(e),Qn(e),Zn(e),es(e)}function On(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=w.filters,i=ra(e),d=new Date,c=Number(s);let m=null;if(s==="custom"){m=r?new Date(r):null;const u=l?new Date(l):null;return w.projects.filter(x=>!Mt(x,t)||!Rt(x,a)||!It(x,i)?!1:zn(x.start,m,u))}return s!=="all"&&Number.isFinite(c)&&(m=new Date,m.setDate(d.getDate()-c)),w.projects.filter(u=>!Mt(u,t)||!Rt(u,a)||!It(u,i)?!1:s==="all"?!0:Un(u.start,m,d))}function Mt(e,t){return t.includes(e.status)}function Rt(e,t){return t==="all"?!0:e.paymentStatus===t}function It(e,t){return t?ra([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function Un(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function zn(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function ra(e){return e?g(String(e)).toLowerCase().trim():""}function Wn(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((i,d)=>i+d.overallTotal,0),s=e.reduce((i,d)=>i+d.unpaidValue,0),r=e.reduce((i,d)=>i+d.expensesTotal,0),l=[{icon:Ve.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:mt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Ve.value,label:n("projects.reports.kpi.totalValue","Total value"),value:ee(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Ve.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:ee(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Ve.expenses,label:n("projects.reports.kpi.expenses","تكلفة الخدمات الإنتاجية"),value:ee(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];p.kpiGrid.innerHTML=l.map(({icon:i,label:d,value:c,meta:m})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${W(d)}</p>
        <p class="reports-kpi-value">${W(c)}</p>
        <span class="reports-kpi-meta">${W(m)}</span>
      </div>
    </div>
  `).join(""),Gn(e)}function Gn(e){try{const t=Kn(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:ee(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:ee(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:ee(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:ee(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:ee(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:ee(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","تكلفة الخدمات الإنتاجية","Project expenses"),value:`−${ee(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:ee(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:d})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${W(i)}</span>
            <span class="reports-kpi-detail-value">${W(d)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:p.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function Kn(e){const t=new Set(e.map(D=>String(D.id))),a=w.reservations.filter(D=>D.projectId!=null&&t.has(String(D.projectId)));let s=0,r=0,l=0,i=0,d=0,c=0,m=0;a.forEach(D=>{const $=Ya(D);s+=$.finalTotal||0,r+=$.equipmentTotal||0,l+=$.crewTotal||0,i+=$.crewCostTotal||0,d+=$.companyShareAmount||0,c+=$.taxAmount||0,m+=$.netProfit||0});const u=e.reduce((D,$)=>D+(Number($.expensesTotal)||0),0),x=e.reduce((D,$)=>D+(Number($.raw?.equipmentEstimate)||0),0),F=e.reduce((D,$)=>{const U=$.applyTax===!0,re=(Number($.raw?.equipmentEstimate)||0)+(Number($.expensesTotal)||0),J=U?re*ut:0;return D+J},0),k=s+x+F,B=r+x,N=c+F,te=m-u;return{grossRevenue:k,companyShareTotal:d,taxTotal:N,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:B,projectExpensesTotal:u,netProfit:te}}function oa(){if(!p.statusChips)return;const e=ea.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${W(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",Jn),p.statusChips.dataset.listenerAttached="true"),Tt()}function Jn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(w.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&ea.forEach(r=>s.add(r)),w.filters.statuses=Array.from(s),Tt(),se()}function Tt(){if(!p.statusChips)return;const e=new Set(w.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Yn(e){if(!X)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(m=>m.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,m)=>c+m,0)>0?s:[],d={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>ve(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};Je("status",t,d)}function Xn(e){if(!X)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(as(),{month:"short",year:"numeric"});e.forEach(u=>{if(!u.start||Number.isNaN(u.start.getTime()))return;const x=`${u.start.getFullYear()}-${u.start.getMonth()+1}`,F=a.get(x)||{total:0,label:s.format(u.start)};F.total+=u.overallTotal,a.set(x,F)});const l=Array.from(a.keys()).sort((u,x)=>{const[F,k]=u.split("-").map(Number),[B,N]=x.split("-").map(Number);return F===B?k-N:F-B}).slice(-12),i=l.map(u=>a.get(u)?.label||u),d=l.map(u=>Math.round(a.get(u)?.total||0)),c=d.length?[{name:n("projects.reports.datasets.value","Total value"),data:d}]:[],m={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:u=>ve(u)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:u=>ve(u)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("timeline",t,m)}function Qn(e){if(!X)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((m,u)=>u.overallTotal-m.overallTotal).slice(0,6),s=a.map(m=>m.title||m.projectCode),r=a.map(m=>Math.round(m.overallTotal)),l=a.map(m=>Math.round(m.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","تكلفة الخدمات الإنتاجية"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:m=>ve(m)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:m=>ve(m)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("expenses",t,c)}function Zn(e){if(!X)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const m=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),u=a.get(m)||0;a.set(m,u+c.overallTotal)});const s=Array.from(a.entries()).sort((c,m)=>m[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],d={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>ve(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>ve(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("clients",t,d)}function Je(e,t,a={}){if(!X||!t)return;if(He[e]){try{He[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete He[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new X(t,s);He[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function es(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=ts(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${W(a.clientName)} <small class="text-muted">${W(a.clientCompany)}</small>`:W(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${W(a.title||a.projectCode)}</span>
            <small class="text-muted">${W(`#${a.projectCode}`)}</small>
          </div>
        </td>
        <td>${i}</td>
        <td>${W(r)}</td>
        <td>${W(s)}</td>
        <td>${W(ee(a.overallTotal))}</td>
        <td>${W(l)}</td>
      </tr>
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",mt(e.length)).replace("{total}",mt(w.totalProjects))}}function ts(e,t){if(!e&&!t)return"—";const a=e?At(e.toISOString()):"—",s=t?At(t.toISOString()):"—";return t?`${a} → ${s}`:a}function ee(e){const t=Number(e)||0,s=We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${g(r)} SR`}function mt(e){const a=We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return g(new Intl.NumberFormat(a).format(e))}function ve(e){const a=We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return g(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function as(){return We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function W(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
