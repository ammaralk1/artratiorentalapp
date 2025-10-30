import{v as ca,w as la,x as _t,o as mt,s as L,t as n,l as Bt,n as v,A as da,e as ua,m as pa,h as ma,i as fa,f as At,g as Oe}from"./auth.BgC08uKC.js";/* empty css              */import{i as ha}from"./dashboardShell.r9HfsZSw.js";import{d as h,r as Te,a as De,u as Le,s as P,b as ba,f as ft,h as ya,i as va,j as o,k as S,l as ga,m as ht,n as ja,o as $t,e as st,p as Nt,q as xa,t as Sa,v as wa,w as Ta,g as Pa,c as Aa,x as $a,y as Ht,z as Na,A as Ea,B as Ca,C as ka,D as Da,E as La,F as Fa,G as Ma,H as Ia,I as Ra,J as _a,K as Ue,L as Ba,M as qt,N as Ha,O as qa}from"./form.lHBLLSxA.js";import"./customers.SzEOt_D3.js";import{g as bt,b as Va,o as He,q as rt,a as Vt,D as ot,l as Oa}from"./reservationsService.CMsnwfQJ.js";import{P as yt,l as vt,n as Et,u as Ot,o as gt,p as ze,t as qe,v as Ua,x as za,i as Wa,h as Ka,w as Ga,y as it,z as ct,e as Ut,A as zt,B as Ja,C as Ya}from"./controller.BM0snczu.js";import{a as Xa}from"./calculations.ranP1Iy6.js";let Ct=null;function Qa(e){e&&Wt()!==e&&mt({[yt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Wt(){return _t()?.[yt]||""}function Kt(e){e&&lt()!==e&&mt({[vt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function lt(){return _t()?.[vt]||""}function Za(e){if(!e)return"";const t=e.trim();return t?Object.values(Et).includes(t)?t:Et[t]||"":""}function en(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Za(t);if(a)return a}}catch{}return""}function Gt(e,t){!e||!h.tabPanes||!h.tabButtons||(h.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),h.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Qa(e))}function tn(){if(!h.tabButtons||!h.tabButtons.length)return;h.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Gt(r,a),r==="projects-section"&&(P.filters.search="",h.search&&(h.search.value=""),Te(),De(),Le()))}),a.dataset.tabListenerAttached="true")});const e=Wt(),t=e&&h.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function jt(e,t){!e||!h.projectSubTabButtons||!h.projectSubTabPanes||(h.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),h.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function an(){!h.projectSubTabButtons||!h.projectSubTabButtons.length||(h.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(jt(a,e),Kt(a))}),e.dataset.tabListenerAttached="true")}),nn())}function nn(){const t=en()||lt();if(!t)return;const a=h.projectSubTabButtons?.[0],s=h.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==lt()&&Kt(r),jt(r,s))}function sn(){return h.tabButtons?h.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function kt(e={}){if(e){if(h.tabButtons&&h.tabButtons.length){const a=h.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[yt];if(s&&s!==a){const r=h.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Gt(s,r)}}if(h.projectSubTabButtons&&h.projectSubTabButtons.length&&sn()){const a=h.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[vt];if(s&&s!==a){const r=h.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&jt(s,r)}}}}function rn(){Ct||(Ct=ca(e=>{kt(e)})),la().then(e=>{kt(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function ve(e){const t=P.projects.find(x=>String(x.id)===String(e));if(!t||!h.detailsBody)return;h.detailsBody.dataset.mode="view",h.detailsBody.dataset.projectId=String(t.id);const s=(P.customers.length?P.customers:Bt().customers||[]).find(x=>String(x.id)===String(t.clientId)),r=Qt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),u=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",m=c?v(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),d=s?.email??t.clientEmail??t.customerEmail??"",j=d?String(d).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),A=(t.clientCompany||s?.companyName||"").trim(),C=t.projectCode||`PRJ-${v(String(t.id))}`,I=v(C),k=ft(t.id),se=k.reduce((x,N)=>x+Zt(N),0),F=Number(se.toFixed(2)),E=k.length,{subtotal:W,applyTax:ce,expensesTotal:ee}=ya(t),fe=Number(t?.servicesClientPrice??t?.services_client_price??0),Fe=W,Ke=ce?Number(((Fe+F)*qe).toFixed(2)):0,Pe=Number((Fe+F+Ke).toFixed(2)),wt=va(t),Y=t?.cancelled===!0||t?.status==="cancelled"||t?.status==="canceled"?"cancelled":wt,he=n(`projects.status.${Y}`,Ua[Y]||Y),je=(()=>{try{const x=t.start?new Date(t.start):null,N=t.end?new Date(t.end):x?new Date(x.getTime()+3600*1e3):null;return!x||!N||Number.isNaN(x.getTime())||Number.isNaN(N.getTime())?!1:P.projects.some(T=>{if(!T||String(T.id)===String(t.id))return!1;const V=T.start?new Date(T.start):null,H=T.end?new Date(T.end):V?new Date(V.getTime()+3600*1e3):null;if(!V||!H||Number.isNaN(V.getTime())||Number.isNaN(H.getTime()))return!1;const z=Math.max(x.getTime(),V.getTime()),re=Math.min(N.getTime(),H.getTime());return z<re})}catch{return!1}})()&&(Y==="upcoming"||Y==="ongoing")?"conflict":Y,le={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل",conflict:"تعارض"}[je]||he,xe={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed",conflict:"timeline-status-badge timeline-status-badge--conflict",cancelled:"timeline-status-badge timeline-status-badge--cancelled"}[je]||"timeline-status-badge timeline-status-badge--upcoming",Se=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",Ae=yn(t),we=Ae.length>0,$e=we?0:Number(t.paidAmount)||0,f=we?0:Number(t.paidPercent)||0;let b=Pe,y,g,$,D,R,q,B,te,U,X;const Je=hn(Ae),Ne=n("projects.focus.confirmed","✅ مشروع مؤكد"),be=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(Ne)}</span>`:"";let _=[];if(E>0){const x=k.reduce((Re,ue)=>{const ia=Array.isArray(ue.items)?ue.items:[],Pt=Array.isArray(ue.crewAssignments)?ue.crewAssignments:[],ye=Pt.length?Pt:Array.isArray(ue.technicians)?ue.technicians:[],nt=Va({items:ia,technicianIds:Array.isArray(ye)&&!ye.length?ye:[],crewAssignments:Array.isArray(ye)&&ye.length&&typeof ye[0]=="object"?ye:[],discount:ue.discount??0,discountType:ue.discountType||"percent",applyTax:!1,start:ue.start,end:ue.end,companySharePercent:null});return Re.equipment+=Number(nt.equipmentTotal||0),Re.crew+=Number(nt.crewTotal||0),Re.crewCost+=Number(nt.crewCostTotal||0),Re},{equipment:0,crew:0,crewCost:0}),N=Number(ee||0),T=Number((x.equipment+x.crew+fe).toFixed(2)),V=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let z=(t?.discountType==="amount"?"amount":"percent")==="amount"?V:T*(V/100);(!Number.isFinite(z)||z<0)&&(z=0),z>T&&(z=T);const re=ce===!0,de=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",oe=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,K=de&&oe>0?oe:0,O=Math.max(0,T-z),M=Number((O*(K/100)).toFixed(2)),ae=re?Number(((O+M)*qe).toFixed(2)):0,Q=Number((O+M+ae).toFixed(2)),Ce=Number((Q-M-ae-N-x.crewCost).toFixed(2));x.equipment>0&&_.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:S(x.equipment)}),x.crew>0&&_.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:S(x.crew)}),x.crewCost>0&&_.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:S(x.crewCost)}),N>0&&_.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:S(N)}),fe>0&&_.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:S(fe)}),z>0&&_.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${S(z)}`}),_.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:S(O)}),M>0&&_.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${S(M)}`}),ae>0&&_.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${S(ae)}`}),_.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:S(Ce)}),_.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:S(Q)}),b=Q}else{const x=Number(ee||0),N=Math.max(0,Number(fe)||0),T=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let H=(t?.discountType==="amount"?"amount":"percent")==="amount"?T:N*(T/100);(!Number.isFinite(H)||H<0)&&(H=0),H>N&&(H=N);const z=Math.max(0,N-H),re=ce===!0,de=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",oe=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,K=de&&oe>0?oe:0,O=Number((z*(K/100)).toFixed(2)),M=re?Number(((z+O)*qe).toFixed(2)):0,ae=Number((z+O+M).toFixed(2)),Q=Number((ae-O-M-x).toFixed(2));_=[],_.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:S(N)}),H>0&&_.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${S(H)}`}),_.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:S(z)}),O>0&&_.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${S(O)}`}),M>0&&_.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${S(M)}`}),_.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:S(Q)}),_.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:S(ae)}),b=ae}y=He({totalAmount:b,paidAmount:$e,paidPercent:f,history:Ae}),g=rt({manualStatus:Se||"unpaid",paidAmount:y.paidAmount,paidPercent:y.paidPercent,totalAmount:b}),$=n(`projects.paymentStatus.${g}`,g==="paid"?"Paid":g==="partial"?"Partial":"Unpaid"),D=g==="paid"?"status-paid":g==="partial"?"status-partial":"status-unpaid",R=Number.isFinite(Number(y.paidAmount))?Number(y.paidAmount):0,q=Number.isFinite(Number(y.paidPercent))?Number(y.paidPercent):0,B=Math.max(0,Number((b-R).toFixed(2))),te=S(R),U=`${v(q.toFixed(2))}%`,X=S(B);const Me=_.map(({icon:x,label:N,value:T})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${x} ${o(N)}</span>
      <span class="summary-details-value">${o(T)}</span>
    </div>
  `).join(""),Ye=n("projects.details.labels.code","رقم المشروع"),Xe=`
    <div class="project-details-code-badge" title="${o(Ye)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Ye)}
      </span>
      <span class="project-details-code-badge__value">${o(I)}</span>
    </div>
  `,Qe=[{icon:"👤",label:n("projects.details.client","العميل"),value:u},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:m},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:j},A?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:A}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:`<span class="project-type-chip project-type-chip--${t.type||"default"}">${o(r)}</span>`},Lt("start",t.start),Lt("end",t.end)].filter(Boolean),Ze=n("projects.details.overview.heading","معلومات المشروع"),et=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Ze)}</h6>
      <ul class="project-details-outline__list">
        ${Qe.map(({icon:x,label:N,value:T,meta:V})=>{const H=String(T??""),re=H.trim().startsWith("<")?H:o(H),de=String(V??""),oe=de?o(de):"";return`
          <li>
            <span class="project-details-outline__label">${o(x)} ${o(N)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${re}</span>
              ${V?`<span class="project-details-outline__meta">${oe}</span>`:""}
            </span>
          </li>
          `}).join("")}
      </ul>
    </div>
  `,tt=E>0?n("projects.details.chips.linkedReservation","مربوط بحجز"):n("projects.details.chips.notLinkedReservation","غير مربوط بحجز"),Ee=E>0?"reservation-chip status-confirmed":"reservation-chip status-info",Ie=[`<span class="${xe}">${o(le)}</span>`,`<span class="${Ee}">${o(tt)}</span>`,`<span class="reservation-chip ${D}">${o($)}</span>`,be].filter(Boolean).join("");n("projects.details.expensesTotal","تكلفة الخدمات الإنتاجية"),n("projects.details.reservationsTotal","إجمالي الحجوزات");const at=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",S(ee)),J=on(Array.isArray(t.expenses)?t.expenses:[]);h.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${Ie}</div>
        </div>
        <div class="project-details-header__code">
          ${Xe}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${et}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(n("projects.details.summary.title","الملخص المالي"))}</h6>
            ${Me}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.description","وصف المشروع"))}</h5>
      <p class="project-details-description">${o(i)}</p>
    </section>
    <section class="project-details-section">
      <h5>${o(at)}</h5>
      ${J}
    </section>
    
    <section class="project-details-section">
      <h5>${o(n("reservations.paymentHistory.title","سجل الدفعات"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.total","الإجمالي الكلي"))}</span>
          <strong>${o(S(b))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.paid","المدفوع"))}</span>
          <strong>${o(te)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(U)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(X)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${Je}
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
  `,dn(t);const me=h.detailsBody.querySelector("#project-details-export-btn");me&&me.addEventListener("click",async x=>{if(x.preventDefault(),me.blur(),!me.disabled){me.disabled=!0;try{await za({project:t})}catch(N){console.error("❌ [projects/details] export project PDF failed",N),L(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{me.disabled=!1}}}),h.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(h.detailsModalEl).show()}function on(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
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
  `}function cn({onOpenProject:e}){!h.focusCards||h.focusCards.dataset.listenerAttached==="true"||(h.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),pn(l);return}r==="view"?e?.(l):r==="highlight"&&ln(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),h.focusCards.dataset.listenerAttached="true")}function ln(e){if(!h.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=h.projectsTableBody.querySelector(t);if(!a){L(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function dn(e){if(!h.detailsBody)return;const t=h.detailsBody.querySelector('[data-action="create-reservation"]'),a=h.detailsBody.querySelector('[data-action="edit-project"]'),s=h.detailsBody.querySelector('[data-action="delete-project"]'),r=h.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(ft(e.id)||[]).some(u=>{const c=String(u?.status||u?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ المشروع مربوط بحجز مسبقاً"),t.addEventListener("click",u=>{u.preventDefault(),L(n("projects.details.reservations.createDisabledToast","⚠️ المشروع مربوط بحجز مسبقاً"))})):(t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",u=>{u.preventDefault(),Dt(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),Dt(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),Jt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await ja(e.id),!P.projects.some(c=>String(c.id)===String(e.id))&&h.detailsModalEl&&window.bootstrap?.Modal.getInstance(h.detailsModalEl)?.hide()}finally{P.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const u=Ka("showReservationDetails");if(typeof u=="function")return u(i),!0;try{const c=await Ga("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const u=i.target.closest('[data-action="view-reservation"]');if(!u)return;const c=u.dataset.index||u.dataset.reservationIndex,m=Number.parseInt(c||"-1",10);if(!Number.isInteger(m)||m<0)return;await l(m)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const u=i.target.closest('[data-action="view-reservation"]');u&&(i.preventDefault(),u.click())})}}function Jt(e){if(!e||!h.detailsBody)return;const t=P.projects.find(d=>String(d.id)===String(e.id));if(!t)return;const a=P.customers.find(d=>String(d.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const s=Array.isArray(t.expenses)?t.expenses.map((d,j)=>({id:d?.id||`expense-${t.id}-${j}-${Date.now()}`,label:d?.label||"",amount:Number(d?.amount)||0,salePrice:Number.isFinite(Number(d?.sale_price??d?.salePrice))?Number(d?.sale_price??d?.salePrice):0})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((d,j)=>({type:d?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(d?.amount))?Number(d.amount):null,percentage:Number.isFinite(Number(d?.percentage))?Number(d.percentage):null,value:Number.isFinite(Number(d?.value))?Number(d.value):null,note:d?.note??null,recordedAt:d?.recordedAt??d?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${j}`})):[],l=r.reduce((d,j)=>d+(Number(j?.amount)||0),0),i=r.reduce((d,j)=>d+(Number(j?.percentage)||0),0),u=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,c=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(u>0||c>0)){const d=t.updatedAt??t.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(u)&&u>0?u:null,percentage:c,value:c,note:null,recordedAt:d,key:`legacy-payment-${t.id}-percent`}]:u>0&&(r=[{type:"amount",amount:u,percentage:null,value:u,note:null,recordedAt:d,key:`legacy-payment-${t.id}-amount`}]),l=r.reduce((j,A)=>j+(Number(A?.amount)||0),0),i=r.reduce((j,A)=>j+(Number(A?.percentage)||0),0),u=0,c=0}l>0&&Math.abs(u-l)<.01&&(u=0),i>0&&Math.abs(c-i)<.01&&(c=0);const m={expenses:s,payments:r,basePaidAmount:u,basePaidPercent:c};h.detailsBody.dataset.mode="edit",h.detailsBody.innerHTML=mn(t,m),un(t,m)}function un(e,t={expenses:[]}){const a=h.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",f=>{f.preventDefault(),ve(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),u=a.querySelector('[data-action="add-expense"]'),c=a.querySelector("#project-edit-expense-list"),m=a.querySelector('[name="project-start-date"]'),d=a.querySelector('[name="project-start-time"]'),j=a.querySelector('[name="project-end-date"]'),A=a.querySelector('[name="project-end-time"]'),C=a.querySelector('[name="project-payment-status"]'),I=a.querySelector("#project-edit-tax"),k=a.querySelector("#project-edit-company-share"),se=a.querySelector("#project-edit-discount"),F=a.querySelector("#project-edit-discount-type"),E=a.querySelector("#project-edit-payment-progress-type"),W=a.querySelector("#project-edit-payment-progress-value"),ce=a.querySelector("#project-edit-payment-add"),ee=a.querySelector("#project-edit-payment-history"),fe=a.querySelector("#project-edit-payment-summary"),Fe=n("reservations.create.summary.currency","SR"),Ke=a.querySelector("#project-cancelled");let Pe=!1;(()=>{const f=(typeof window<"u"?window.flatpickr:null)||(typeof globalThis<"u"?globalThis.flatpickr:null);f&&(m&&f(m,{dateFormat:"Y-m-d",allowInput:!0}),j&&f(j,{dateFormat:"Y-m-d",allowInput:!0}),d&&f(d,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",altInput:!0,altFormat:"h:i K",time_24hr:!1,defaultHour:9,defaultMinute:0,minuteIncrement:5,disableMobile:!0,allowInput:!0,altInputClass:"flatpickr-alt-input form-control"}),A&&f(A,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",altInput:!0,altFormat:"h:i K",time_24hr:!1,defaultHour:9,defaultMinute:0,minuteIncrement:5,disableMobile:!0,allowInput:!0,altInputClass:"flatpickr-alt-input form-control"}))})();const Y=f=>{if(!f||f.dataset.normalizedDigits==="true")return;const b=()=>{const y=f.value||"",g=v(y);if(g!==y){const $=f.selectionStart,D=f.selectionEnd;f.value=g;try{if(typeof $=="number"&&typeof D=="number"){const R=g.length-y.length;f.setSelectionRange(Math.max(0,$+R),Math.max(0,D+R))}}catch{}}};f.addEventListener("input",b),f.addEventListener("blur",b);try{f.setAttribute("inputmode","numeric")}catch{}f.dataset.normalizedDigits="true"};Y(m),Y(d),Y(j),Y(A),d&&d._flatpickr?.altInput&&Y(d._flatpickr.altInput),A&&A._flatpickr?.altInput&&Y(A._flatpickr.altInput);const he=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),Ge=()=>{const f=Number(e.equipmentEstimate)||0,b=Array.isArray(t.expenses)?t.expenses.reduce((U,X)=>U+(Number(X.amount)||0),0):0,y=Array.isArray(t.expenses)?Math.max(0,Math.round(t.expenses.reduce((U,X)=>U+Number(X?.salePrice??0),0)*100)/100):Math.max(0,Number(e?.servicesClientPrice??0)),g=F?.value==="amount"?"amount":"percent",$=v(se?.value||"0");let D=Number.parseFloat($);(!Number.isFinite(D)||D<0)&&(D=0);const R=I?.checked===!0,q=k?.checked===!0;let B=q?Pa(k):null;(!Number.isFinite(B)||B<=0)&&(B=q?ot:null);const te=Aa({equipmentEstimate:f,expensesTotal:b,servicesClientPrice:y,discountValue:D,discountType:g,applyTax:R,companyShareEnabled:q,companySharePercent:B});return{equipmentEstimate:f,expensesTotal:b,discountValue:D,discountTypeValue:g,applyTax:R,companyShareEnabled:q,companySharePercent:B,servicesClientPrice:y,finance:te}},je=()=>{const f=Ge(),b=he(),g=(ft(e.id)||[]).reduce((B,te)=>B+(Number(te?.totalAmount)||Zt(te)||0),0),$=Number(f.finance?.taxableAmount||0),D=f.applyTax?Number((($+g)*qe).toFixed(2)):0,R=Number(($+g+D).toFixed(2)),q=He({totalAmount:R,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:b});return{...f,combinedTotalWithTax:R,payments:b,progress:q}},Tt=()=>{ee&&(ee.innerHTML=bn(he()))},le=()=>{if(!fe)return;const{combinedTotalWithTax:f,progress:b}=je(),y=Number.isFinite(Number(f))?Number(f):0,g=Number.isFinite(Number(b.paidAmount))?Number(b.paidAmount):0,$=Number.isFinite(Number(b.paidPercent))?Number(b.paidPercent):0,D=Math.max(0,Math.round((y-g)*100)/100),R=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:S(y)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:S(g)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${v($.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:S(D)}];fe.innerHTML=R.map(({label:q,value:B})=>`
        <div class="project-details-grid-item">
          <span>${o(q)}</span>
          <strong>${o(B)}</strong>
        </div>
      `).join("")},pe=(f="auto")=>{if(!C)return;const b=C.dataset?.userSelected==="true";if(f==="auto"&&b)return;const{finance:y,progress:g}=je(),$=rt({manualStatus:b?C.value:e.paymentStatus||"unpaid",paidAmount:g.paidAmount,paidPercent:g.paidPercent,totalAmount:y.totalWithTax});b||(C.value=$)},xe=()=>{Tt(),le(),pe("auto")},Se=1e-4,Ae=()=>{const f=E?.value==="amount"?"amount":"percent",b=v(W?.value||"").replace("%","").trim();let y=Number.parseFloat(b);if(!Number.isFinite(y)||y<=0){L(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),W?.focus();return}const g=je(),$=Number.isFinite(Number(g.finance.totalWithTax))?Number(g.finance.totalWithTax):0;if($<=0){L(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const D=Number(g.progress.paidAmount)||0,R=Number(g.progress.paidPercent)||0;let q=null,B=null;if(f==="percent"){const U=Math.max(0,100-R);if(U<=Se){L(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>U){y=U;const X=v(y.toFixed(2));L(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",X))}B=Math.round(y*100)/100,$>0&&(q=Math.round(B/100*$*100)/100)}else{const U=Math.max(0,$-D);if(U<=Se){L(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>U){y=U;const X=`${v(y.toFixed(2))} ${Fe}`;L(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",X))}q=Math.round(y*100)/100,$>0&&(B=Math.round(q/$*100*100)/100)}const te={type:f,amount:q??null,percentage:B??null,value:f==="amount"?q:B,note:null,recordedAt:new Date().toISOString()};t.payments=[...he(),te],W&&(W.value=""),E&&(E.value="percent"),xe(),L(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},we=f=>{!I||!k||Pe||(Pe=!0,f==="share"?k.checked?(I.checked||(I.checked=!0),st(k)):I.checked&&(I.checked=!1):f==="tax"&&(I.checked?st(k):k.checked&&(k.checked=!1)),Pe=!1)};function $e(){c&&(c.innerHTML=Yt(t.expenses))}$e(),xe(),se&&!se.dataset.listenerAttached&&(se.addEventListener("input",f=>{const b=f.target;b instanceof HTMLInputElement&&(b.value=v(b.value||""),le(),pe("auto"))}),se.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",f=>{const b=f.target;b instanceof HTMLInputElement&&(b.value=v(b.value||""))}),i.dataset.listenerAttached="true"),F&&!F.dataset.listenerAttached&&(F.addEventListener("change",()=>{le(),pe("auto")}),F.dataset.listenerAttached="true"),W&&!W.dataset.listenerAttached&&(W.addEventListener("input",f=>{const b=f.target;b instanceof HTMLInputElement&&(b.value=v(b.value||""))}),W.dataset.listenerAttached="true"),C&&!C.dataset.listenerAttached&&(C.addEventListener("change",()=>{C.dataset.userSelected="true"}),C.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",f=>{const b=f.target;b instanceof HTMLInputElement&&(b.value=v(b.value||""))}),l.dataset.listenerAttached="true"),k&&!k.dataset.listenerAttached&&(k.addEventListener("change",()=>{we("share"),le(),pe("auto")}),k.dataset.listenerAttached="true"),I&&!I.dataset.listenerAttached&&(I.addEventListener("change",()=>{we("tax"),le(),pe("auto")}),I.dataset.listenerAttached="true"),k?.checked&&st(k),we(k?.checked?"share":"tax"),le(),pe("auto"),u&&u.addEventListener("click",f=>{f.preventDefault();const b=r?.value.trim()||"",y=v(l?.value||"0"),g=Number(y),$=v(i?.value||"0"),D=Number($);if(!b){L(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(g)||g<=0){L(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:b,amount:g,salePrice:Number.isFinite(D)&&D>0?D:0}),r&&(r.value=""),l&&(l.value=""),i&&(i.value=""),$e(),le(),pe("auto")}),c&&c.addEventListener("click",f=>{const b=f.target.closest('[data-action="remove-expense"]');if(!b)return;const{id:y}=b.dataset;t.expenses=t.expenses.filter(g=>String(g.id)!==String(y)),$e(),le(),pe("auto")}),ce&&!ce.dataset.listenerAttached&&(ce.addEventListener("click",f=>{f.preventDefault(),Ae()}),ce.dataset.listenerAttached="true"),ee&&!ee.dataset.listenerAttached&&(ee.addEventListener("click",f=>{const b=f.target.closest('[data-action="remove-payment"]');if(!b)return;const y=Number.parseInt(b.dataset.index||"-1",10);if(!Number.isInteger(y)||y<0)return;const g=he();if(y>=g.length)return;const $=g.filter((D,R)=>R!==y);t.payments=$,xe(),L(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),ee.dataset.listenerAttached="true"),a.addEventListener("submit",async f=>{if(f.preventDefault(),a.dataset.submitting==="true")return;const b=a.querySelector('[name="project-title"]'),y=a.querySelector('[name="project-type"]'),g=a.querySelector('[name="project-description"]'),$=b?.value.trim()||"",D=y?.value||"",R=v(m?.value.trim()||""),q=v(d?.value.trim()||""),B=g?.value.trim()||"",te=(C?.value||"unpaid").toLowerCase(),U=["paid","partial"].includes(te)?te:"unpaid";if(!$||!D||!R){L(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),b?.focus();return}const X=v(j?.value.trim()||""),Je=v(A?.value.trim()||""),Ne=Nt(R,q),be=X?Nt(X,Je):"",_=new Date(Ne),Me=be?new Date(be):null;if(Me&&_>Me){L(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),j?.focus();return}if(P.projects.findIndex(K=>String(K.id)===String(e.id))===-1){L(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Xe=Ge(),{equipmentEstimate:Qe,servicesClientPrice:Ze,discountValue:et,discountTypeValue:tt,applyTax:Ee,companyShareEnabled:Ie,companySharePercent:at,finance:J}=Xe,me=E?.value==="amount"?"amount":"percent",x=v(W?.value||"");let N=x?Number.parseFloat(x):null,T=[...he()];if(Number.isFinite(N)&&N>0&&Number.isFinite(Number(J.totalWithTax))){const K=He({totalAmount:J.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:T}),O=new Date().toISOString();if(me==="percent"){const M=Math.max(0,100-(K.paidPercent||0));if(M>Se){const ae=Math.min(N,M),Q=Math.round(ae*100)/100,Ce=J.totalWithTax>0?Math.round(Q/100*J.totalWithTax*100)/100:null;T=[...T,{type:"percent",amount:Ce,percentage:Q,value:Q,note:null,recordedAt:O}]}}else{const M=Math.max(0,J.totalWithTax-(K.paidAmount||0));if(M>Se){const ae=Math.min(N,M),Q=Math.round(ae*100)/100,Ce=J.totalWithTax>0?Math.round(Q/J.totalWithTax*100*100)/100:null;T=[...T,{type:"amount",amount:Q,percentage:Ce,value:Q,note:null,recordedAt:O}]}}T!==t.payments&&(t.payments=T,xe()),W&&(W.value=""),E&&(E.value="percent"),N=null}const V=He({totalAmount:J.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:T}),H=C?.dataset?.userSelected==="true",z=rt({manualStatus:H?U:e.paymentStatus||U,paidAmount:V.paidAmount,paidPercent:V.paidPercent,totalAmount:J.totalWithTax}),re=H?U:z;!H&&C&&(C.value=re),C?.dataset&&delete C.dataset.userSelected,t.payments=T;const de=Wa({projectCode:e.projectCode,title:$,type:D,clientId:e.clientId,clientCompany:e.clientCompany,description:B,start:Ne,end:be||null,applyTax:Ee,paymentStatus:re,equipmentEstimate:Qe,expenses:t.expenses,servicesClientPrice:Ze,discount:et,discountType:tt,companyShareEnabled:Ie&&Ee,companySharePercent:Ie&&Ee?at:null,companyShareAmount:J.companyShareAmount,taxAmount:J.taxAmount,totalWithTax:J.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:xa(e),paidAmount:V.paidAmount,paidPercentage:V.paidPercent,paymentProgressType:V.paymentProgressType,paymentProgressValue:V.paymentProgressValue,payments:T}),oe=Ke?.checked===!0;oe&&(de.status="cancelled",de.cancelled=!0),a.dataset.submitting="true";try{const K=await Ot(e.projectId??e.id,de),O=K?.projectId??K?.id??e.id;if(!oe)try{const M={start:Ne};be&&(M.end=be),await Sa(O,M)}catch(M){console.warn("⚠️ failed to sync linked reservations schedule",M)}if(await wa(O,re),oe)try{await Ta(O)}catch(M){console.warn("⚠️ failed to cancel linked reservations",M)}P.projects=gt(),P.reservations=bt(),L(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),Te(),De(),Le(),ve(e.id)}catch(K){console.error("❌ [projects] Failed to update project from details view",K);const O=ze(K)?K.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");L(O,"error")}finally{delete a.dataset.submitting}})}function Dt(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description,fromProjectForm:!0,draftStorageKey:"projects:create:draft",returnUrl:`projects.html?project=${encodeURIComponent(e.id)}&linked=1#projects-section`};mt({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}h.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(h.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function pn(e){if(!e)return;const t=P.projects.find(a=>String(a.id)===String(e));if(!t){L(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){L(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Ot(t.projectId??t.id,{confirmed:!0});const a=await ba(e);P.projects=gt(),P.reservations=bt(),Te(),De(),Le(),h.detailsModalEl&&h.detailsModalEl.classList.contains("show")&&h.detailsBody?.dataset.projectId===String(e)&&ve(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),L(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=ze(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");L(s,"error")}}function mn(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=$t(e.start||""),{date:r,time:l}=$t(e.end||""),i=e.applyTax===!0||e.applyTax==="true";typeof e.paymentStatus=="string"&&e.paymentStatus.toLowerCase();const u=e.discountType==="amount"?"amount":"percent",c=v(String(e.discount??e.discountValue??0));v(String(e.servicesClientPrice??e.services_client_price??0));const m=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??ot,d=Number.parseFloat(v(String(m))),j=Number.isFinite(d)&&d>0?d:ot,A=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(d)&&d>0,C="",I=e?.cancelled===!0||e?.cancelled==="true"||String(e?.status||"").toLowerCase()==="cancelled"||String(e?.status||"").toLowerCase()==="canceled";return`
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${o(n("projects.form.labels.title","عنوان المشروع"))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${o(e.title||"")}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${o(n("projects.form.labels.type","نوع المشروع"))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${fn(e.type)}
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
        <div class="col-12">
          <div class="form-check mt-2">
            <input class="form-check-input" type="checkbox" id="project-cancelled" name="project-cancelled" ${I?"checked":""}>
            <label class="form-check-label" for="project-cancelled">${o(n("projects.form.labels.cancelled","إلغاء المشروع"))}</label>
          </div>
          <div class="form-text">${o(n("projects.form.hints.cancelled","سيتم وسم المشروع كملغي وتحديث حالة جميع الحجوزات المرتبطة إلى ملغي."))}</div>
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
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(j))}" ${A?"checked":""}>
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
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control project-edit-input-xs" value="${o(C)}" placeholder="0" inputmode="decimal">
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
  `}function fn(e){return["commercial","coverage","photography","social"].map(a=>{const s=Qt(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(s)}</option>`}).join("")}function Yt(e=[]){if(!Array.isArray(e)||e.length===0){const i=o(n("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"));return`
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
    </div>`}function hn(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(S(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${v(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?v(ht(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(v(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function bn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(S(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${v(Number(a.percentage).toFixed(2))}%`:"—",u=a?.recordedAt?v(ht(a.recordedAt)):"—",c=a?.note?o(v(a.note)):"",m=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
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
  `}function yn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(vn).filter(Boolean);if(a.length>0)return a;const s=Ve(e.paidPercent??e.paid_percent),r=Ve(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Xt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function vn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=Ve(e.amount??(a==="amount"?e.value:null)),r=Ve(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,u=Xt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:u}}function Ve(e){if(e==null||e==="")return null;const t=v(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Xt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Lt(e,t){if(!t)return null;const{date:a,time:s}=gn(ht(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية المشروع"):n("projects.details.labels.end","نهاية المشروع");return{icon:l,label:i,value:a,meta:s}}function gn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Qt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function Zt(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(v(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=Vt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(v(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function xt(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function jn(){return xt(it)}function xn(){return xt(ct)}function Sn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[it,ct,"linked"].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let m=!1;[it,ct,"linked"].forEach(d=>{c.has(d)&&(c.delete(d),m=!0)}),m&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),u=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",u)}catch{}}function wn(){const e=jn(),t=xn(),a=xt("linked");e&&(P.pendingProjectDetailId=e),t&&(P.pendingProjectEditId=t,P.pendingProjectDetailId||(P.pendingProjectDetailId=t)),a!=null&&String(a)!==""&&String(a)!=="0"&&String(a).toLowerCase()!=="false"&&(P.pendingLinkedToast=!0),(e||t)&&Sn()}function Tn(){if(!P.pendingProjectDetailId)return;const e=P.pendingProjectDetailId,t=String(e),a=P.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;P.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(ve(s),P.pendingLinkedToast){P.pendingLinkedToast=!1;try{L(n("projects.toast.linkedReservationCreated","✅ تم ربط الحجز بالمشروع"))}catch{}}if(P.pendingProjectEditId!=null){const r=String(P.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&(P.pendingProjectEditId=null,setTimeout(()=>Jt(a),0))}}function Pn(){document.addEventListener("DOMContentLoaded",()=>{rn(),wn(),$a(),Ht(),Na(),tn(),an(),Ea(),Ca(),ka(),Da(),La(),Fa(),Ma({onViewDetails:ve}),cn({onOpenProject:ve}),Ia(),An()}),document.addEventListener("language:changed",Ft),document.addEventListener("language:translationsReady",Ft),document.addEventListener("customers:changed",$n),document.addEventListener("technicians:updated",Nn),document.addEventListener("reservations:changed",()=>Ra(ve)),document.addEventListener(da.USER_UPDATED,()=>{Te()})}async function An(){try{await Ut({suppressError:!0}),await zt()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");L(t,"error")}finally{_a(),Ue(),Ba(),qt(),Te(),Le(),De(),Tn()}}function Ft(){Ue(),qt(),Te(),Le(),De(),Ht()}function $n(){Ha(),Ue()}function Nn(){qa(),Ue()}ua();pa();ma();Ja();Pn();document.addEventListener("DOMContentLoaded",()=>{ha(),fa()});const dt=.15,_e={},En="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let ke=0;const w={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Be=Object.freeze({projects:`
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
  `});let Z=null;const ea=["upcoming","ongoing","completed"];async function Cn({forceProjects:e=!1}={}){try{await Ut({suppressError:!0}),await Ya({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),ze(t)&&console.warn("Projects API error:",t.message)}sa()}async function kn(){Fn(),aa(),await Dn();try{await Cn({forceProjects:!0}),oa(),Hn(),ie()}finally{na()}document.addEventListener("language:changed",Vn),document.addEventListener("projects:changed",()=>{ut().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{ut().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",On)}document.addEventListener("DOMContentLoaded",kn);async function Dn(){if(Z)return Z;if(typeof window>"u")return null;if(window.ApexCharts)return Z=window.ApexCharts,Z;try{await Ln(En),Z=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),Z=null}return Z}function Ln(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function Fn(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function ta(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function aa(){ke+=1,ke===1&&ta(!0)}function na(){ke=Math.max(0,ke-1),ke===0&&ta(!1)}function sa(){const{customers:e=[]}=Bt();w.customers=Array.isArray(e)?e:[],w.reservations=bt();const t=new Map(w.customers.map(s=>[String(s.id),s])),a=gt();w.projects=Array.isArray(a)?a.map(s=>Mn(s,t)):[],w.totalProjects=w.projects.length}function Mn(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=In(e.id),l=r.reduce((se,F)=>se+Rn(F),0),i=_n(e),u=Number(e?.equipmentEstimate)||0,c=Number((u+i).toFixed(2)),m=e?.applyTax===!0||e?.applyTax==="true",d=m?Number((c*dt).toFixed(2)):0,j=m?Number(((c+l)*dt).toFixed(2)):0,A=Number((c+l+j).toFixed(2)),C=Bn(e),I=e.start?new Date(e.start):null,k=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:I,end:k,applyTax:m,status:C,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:d,combinedTaxAmount:j,overallTotal:A,unpaidValue:a==="paid"?0:A,reservationsCount:r.length}}function In(e){return Array.isArray(w.reservations)?w.reservations.filter(t=>String(t.projectId)===String(e)):[]}function Rn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(v(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=Vt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(v(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function _n(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function Bn(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function Hn(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{w.filters.search=p.search.value.trim(),ie()},180)})}p.payment&&(p.payment.value=w.filters.payment,p.payment.addEventListener("change",()=>{w.filters.payment=p.payment.value||"all",ie()})),p.dateRange&&(p.dateRange.addEventListener("change",qn),p.dateRange.value=w.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{w.filters.startDate=p.startDate.value,w.filters.range==="custom"&&ie()}),p.endDate&&p.endDate.addEventListener("change",()=>{w.filters.endDate=p.endDate.value,w.filters.range==="custom"&&ie()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(w.filters.range!=="custom"){ie();return}w.filters.startDate=p.startDate?.value||"",w.filters.endDate=p.endDate?.value||"",ie()})}function qn(e){const t=e.target.value;w.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),w.filters.startDate="",w.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),ie())}async function ut(){aa();try{await Promise.all([zt(),Oa()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),ze(e)&&console.warn("Projects API error:",e.message)}finally{sa(),ie(),na()}}function Vn(){oa(),ie()}function On(e){e.key&&!["projects","reservations","customers"].includes(e.key)||ut().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function ie(){const e=Un();St(),Kn(e),Xn(e),Qn(e),Zn(e),es(e),ts(e)}function Un(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=w.filters,i=ra(e),u=new Date,c=Number(s);let m=null;if(s==="custom"){m=r?new Date(r):null;const d=l?new Date(l):null;return w.projects.filter(j=>!Mt(j,t)||!It(j,a)||!Rt(j,i)?!1:Wn(j.start,m,d))}return s!=="all"&&Number.isFinite(c)&&(m=new Date,m.setDate(u.getDate()-c)),w.projects.filter(d=>!Mt(d,t)||!It(d,a)||!Rt(d,i)?!1:s==="all"?!0:zn(d.start,m,u))}function Mt(e,t){return t.includes(e.status)}function It(e,t){return t==="all"?!0:e.paymentStatus===t}function Rt(e,t){return t?ra([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function zn(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function Wn(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function ra(e){return e?v(String(e)).toLowerCase().trim():""}function Kn(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((i,u)=>i+u.overallTotal,0),s=e.reduce((i,u)=>i+u.unpaidValue,0),r=e.reduce((i,u)=>i+u.expensesTotal,0),l=[{icon:Be.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:pt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Be.value,label:n("projects.reports.kpi.totalValue","Total value"),value:ne(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Be.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:ne(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Be.expenses,label:n("projects.reports.kpi.expenses","تكلفة الخدمات الإنتاجية"),value:ne(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];p.kpiGrid.innerHTML=l.map(({icon:i,label:u,value:c,meta:m})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${G(u)}</p>
        <p class="reports-kpi-value">${G(c)}</p>
        <span class="reports-kpi-meta">${G(m)}</span>
      </div>
    </div>
  `).join(""),Gn(e)}function Gn(e){try{const t=Jn(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:ne(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:ne(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:ne(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:ne(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:ne(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:ne(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","تكلفة الخدمات الإنتاجية","Project expenses"),value:`−${ne(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:ne(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:u})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${G(i)}</span>
            <span class="reports-kpi-detail-value">${G(u)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:p.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function Jn(e){const t=new Set(e.map(F=>String(F.id))),a=w.reservations.filter(F=>F.projectId!=null&&t.has(String(F.projectId)));let s=0,r=0,l=0,i=0,u=0,c=0,m=0;a.forEach(F=>{const E=Xa(F);s+=E.finalTotal||0,r+=E.equipmentTotal||0,l+=E.crewTotal||0,i+=E.crewCostTotal||0,u+=E.companyShareAmount||0,c+=E.taxAmount||0,m+=E.netProfit||0});const d=e.reduce((F,E)=>F+(Number(E.expensesTotal)||0),0),j=e.reduce((F,E)=>F+(Number(E.raw?.equipmentEstimate)||0),0),A=e.reduce((F,E)=>{const W=E.applyTax===!0,ce=(Number(E.raw?.equipmentEstimate)||0)+(Number(E.expensesTotal)||0),ee=W?ce*dt:0;return F+ee},0),C=s+j+A,I=r+j,k=c+A,se=m-d;return{grossRevenue:C,companyShareTotal:u,taxTotal:k,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:I,projectExpensesTotal:d,netProfit:se}}function oa(){if(!p.statusChips)return;const e=ea.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${G(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",Yn),p.statusChips.dataset.listenerAttached="true"),St()}function Yn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(w.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&ea.forEach(r=>s.add(r)),w.filters.statuses=Array.from(s),St(),ie()}function St(){if(!p.statusChips)return;const e=new Set(w.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Xn(e){if(!Z)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(m=>m.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,m)=>c+m,0)>0?s:[],u={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>ge(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};We("status",t,u)}function Qn(e){if(!Z)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(ns(),{month:"short",year:"numeric"});e.forEach(d=>{if(!d.start||Number.isNaN(d.start.getTime()))return;const j=`${d.start.getFullYear()}-${d.start.getMonth()+1}`,A=a.get(j)||{total:0,label:s.format(d.start)};A.total+=d.overallTotal,a.set(j,A)});const l=Array.from(a.keys()).sort((d,j)=>{const[A,C]=d.split("-").map(Number),[I,k]=j.split("-").map(Number);return A===I?C-k:A-I}).slice(-12),i=l.map(d=>a.get(d)?.label||d),u=l.map(d=>Math.round(a.get(d)?.total||0)),c=u.length?[{name:n("projects.reports.datasets.value","Total value"),data:u}]:[],m={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:d=>ge(d)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:d=>ge(d)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("timeline",t,m)}function Zn(e){if(!Z)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((m,d)=>d.overallTotal-m.overallTotal).slice(0,6),s=a.map(m=>m.title||m.projectCode),r=a.map(m=>Math.round(m.overallTotal)),l=a.map(m=>Math.round(m.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","تكلفة الخدمات الإنتاجية"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:m=>ge(m)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:m=>ge(m)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("expenses",t,c)}function es(e){if(!Z)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const m=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),d=a.get(m)||0;a.set(m,d+c.overallTotal)});const s=Array.from(a.entries()).sort((c,m)=>m[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],u={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>ge(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>ge(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("clients",t,u)}function We(e,t,a={}){if(!Z||!t)return;if(_e[e]){try{_e[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete _e[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new Z(t,s);_e[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function ts(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=as(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${G(a.clientName)} <small class="text-muted">${G(a.clientCompany)}</small>`:G(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${G(a.title||a.projectCode)}</span>
            <small class="text-muted">${G(`#${a.projectCode}`)}</small>
          </div>
        </td>
        <td>${i}</td>
        <td>${G(r)}</td>
        <td>${G(s)}</td>
        <td>${G(ne(a.overallTotal))}</td>
        <td>${G(l)}</td>
      </tr>
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",pt(e.length)).replace("{total}",pt(w.totalProjects))}}function as(e,t){if(!e&&!t)return"—";const a=e?At(e.toISOString()):"—",s=t?At(t.toISOString()):"—";return t?`${a} → ${s}`:a}function ne(e){const t=Number(e)||0,s=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${v(r)} SR`}function pt(e){const a=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return v(new Intl.NumberFormat(a).format(e))}function ge(e){const a=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return v(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function ns(){return Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function G(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
