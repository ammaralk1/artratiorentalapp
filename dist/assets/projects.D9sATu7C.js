import{v as ca,w as la,x as _t,o as ft,s as F,t as n,l as Bt,n as g,A as da,e as ua,m as pa,h as ma,i as fa,f as At,g as Oe}from"./auth.BgC08uKC.js";/* empty css              */import{i as ha}from"./dashboardShell.r9HfsZSw.js";import{d as h,r as we,a as Le,u as Fe,s as T,b as ba,f as ht,h as ya,i as va,j as o,k as S,l as ga,m as bt,n as ja,o as $t,e as rt,p as Nt,q as xa,t as Sa,v as wa,w as Ta,g as Pa,c as Aa,x as $a,y as Ht,z as Na,A as Ea,B as Ca,C as ka,D as Da,E as La,F as Fa,G as Ia,H as Ma,I as Ra,J as _a,K as Ue,L as Ba,M as qt,N as Ha,O as qa}from"./form.Brosgqhb.js";import"./customers.SzEOt_D3.js";import{g as yt,b as Va,o as He,q as ot,a as Vt,D as it,l as Oa}from"./reservationsService.CMsnwfQJ.js";import{P as vt,l as gt,n as Et,u as Ot,o as jt,p as ze,t as qe,v as Ua,x as za,i as Wa,h as Ka,w as Ga,y as ct,z as lt,e as Ut,A as zt,B as Ja,C as Ya}from"./controller.Dl7M5C4z.js";import{a as Xa}from"./calculations.ranP1Iy6.js";let Ct=null;function Qa(e){e&&Wt()!==e&&ft({[vt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Wt(){return _t()?.[vt]||""}function Kt(e){e&&dt()!==e&&ft({[gt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function dt(){return _t()?.[gt]||""}function Za(e){if(!e)return"";const t=e.trim();return t?Object.values(Et).includes(t)?t:Et[t]||"":""}function en(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Za(t);if(a)return a}}catch{}return""}function Gt(e,t){!e||!h.tabPanes||!h.tabButtons||(h.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),h.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Qa(e))}function tn(){if(!h.tabButtons||!h.tabButtons.length)return;h.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Gt(r,a),r==="projects-section"&&(T.filters.search="",h.search&&(h.search.value=""),we(),Le(),Fe()))}),a.dataset.tabListenerAttached="true")});const e=Wt(),t=e&&h.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function xt(e,t){!e||!h.projectSubTabButtons||!h.projectSubTabPanes||(h.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),h.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function an(){!h.projectSubTabButtons||!h.projectSubTabButtons.length||(h.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(xt(a,e),Kt(a))}),e.dataset.tabListenerAttached="true")}),nn())}function nn(){const t=en()||dt();if(!t)return;const a=h.projectSubTabButtons?.[0],s=h.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==dt()&&Kt(r),xt(r,s))}function sn(){return h.tabButtons?h.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function kt(e={}){if(e){if(h.tabButtons&&h.tabButtons.length){const a=h.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[vt];if(s&&s!==a){const r=h.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Gt(s,r)}}if(h.projectSubTabButtons&&h.projectSubTabButtons.length&&sn()){const a=h.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[gt];if(s&&s!==a){const r=h.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&xt(s,r)}}}}function rn(){Ct||(Ct=ca(e=>{kt(e)})),la().then(e=>{kt(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function ge(e){const t=T.projects.find(x=>String(x.id)===String(e));if(!t||!h.detailsBody)return;h.detailsBody.dataset.mode="view",h.detailsBody.dataset.projectId=String(t.id);const s=(T.customers.length?T.customers:Bt().customers||[]).find(x=>String(x.id)===String(t.clientId)),r=Qt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),d=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",f=c?g(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),u=s?.email??t.clientEmail??t.customerEmail??"",v=u?String(u).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),A=(t.clientCompany||s?.companyName||"").trim(),G=t.projectCode||`PRJ-${g(String(t.id))}`,$=g(G),B=ht(t.id),H=B.reduce((x,k)=>x+Zt(k),0),I=Number(H.toFixed(2)),C=B.length,{subtotal:se,applyTax:J,expensesTotal:re}=ya(t),te=Number(t?.servicesClientPrice??t?.services_client_price??0),Te=se,Ke=J?Number(((Te+I)*qe).toFixed(2)):0,Ge=Number((Te+I+Ke).toFixed(2)),Pe=va(t),be=t?.cancelled===!0||t?.status==="cancelled"||t?.status==="canceled"?"cancelled":Pe,me=n(`projects.status.${be}`,Ua[be]||be),Ae=(()=>{try{const x=t.start?new Date(t.start):null,k=t.end?new Date(t.end):x?new Date(x.getTime()+3600*1e3):null;return!x||!k||Number.isNaN(x.getTime())||Number.isNaN(k.getTime())?!1:T.projects.some(D=>{if(!D||String(D.id)===String(t.id))return!1;const R=D.start?new Date(D.start):null,L=D.end?new Date(D.end):R?new Date(R.getTime()+3600*1e3):null;if(!R||!L||Number.isNaN(R.getTime())||Number.isNaN(L.getTime()))return!1;const U=Math.max(x.getTime(),R.getTime()),de=Math.min(k.getTime(),L.getTime());return U<de})}catch{return!1}})()&&(be==="upcoming"||be==="ongoing")?"conflict":be,Je={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل",conflict:"تعارض"}[Ae]||me,oe={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed",conflict:"timeline-status-badge timeline-status-badge--conflict",cancelled:"timeline-status-badge timeline-status-badge--cancelled"}[Ae]||"timeline-status-badge timeline-status-badge--upcoming",Se=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",fe=yn(t),Me=fe.length>0,$e=Me?0:Number(t.paidAmount)||0,Ne=Me?0:Number(t.paidPercent)||0;let m=Ge,b,y,j,P,N,M,O,q,Q,K;const Z=hn(fe),Ye=n("projects.focus.confirmed","✅ مشروع مؤكد"),Ee=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(Ye)}</span>`:"";let E=[];if(C>0){const x=B.reduce((he,ce)=>{const ia=Array.isArray(ce.items)?ce.items:[],Pt=Array.isArray(ce.crewAssignments)?ce.crewAssignments:[],ve=Pt.length?Pt:Array.isArray(ce.technicians)?ce.technicians:[],st=Va({items:ia,technicianIds:Array.isArray(ve)&&!ve.length?ve:[],crewAssignments:Array.isArray(ve)&&ve.length&&typeof ve[0]=="object"?ve:[],discount:ce.discount??0,discountType:ce.discountType||"percent",applyTax:!1,start:ce.start,end:ce.end,companySharePercent:null});return he.equipment+=Number(st.equipmentTotal||0),he.crew+=Number(st.crewTotal||0),he.crewCost+=Number(st.crewCostTotal||0),he},{equipment:0,crew:0,crewCost:0}),k=Number(re||0),D=Number((x.equipment+x.crew+te).toFixed(2)),R=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let U=(t?.discountType==="amount"?"amount":"percent")==="amount"?R:D*(R/100);(!Number.isFinite(U)||U<0)&&(U=0),U>D&&(U=D);const de=J===!0,ie=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",ae=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ye=ie&&ae>0?ae:0,_=Math.max(0,D-U),W=Number((_*(ye/100)).toFixed(2)),V=de?Number(((_+W)*qe).toFixed(2)):0,ue=Number((_+W+V).toFixed(2)),pe=Number((ue-W-V-k-x.crewCost).toFixed(2));x.equipment>0&&E.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:S(x.equipment)}),x.crew>0&&E.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:S(x.crew)}),x.crewCost>0&&E.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:S(x.crewCost)}),k>0&&E.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:S(k)}),te>0&&E.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:S(te)}),U>0&&E.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${S(U)}`}),E.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:S(_)}),W>0&&E.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${S(W)}`}),V>0&&E.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${S(V)}`}),E.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:S(pe)}),E.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:S(ue)}),m=ue}else{const x=Number(re||0),k=Math.max(0,Number(te)||0),D=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let L=(t?.discountType==="amount"?"amount":"percent")==="amount"?D:k*(D/100);(!Number.isFinite(L)||L<0)&&(L=0),L>k&&(L=k);const U=Math.max(0,k-L),de=J===!0,ie=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",ae=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ye=ie&&ae>0?ae:0,_=Number((U*(ye/100)).toFixed(2)),W=de?Number(((U+_)*qe).toFixed(2)):0,V=Number((U+_+W).toFixed(2)),ue=Number((V-_-W-x).toFixed(2));E=[],E.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:S(k)}),L>0&&E.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${S(L)}`}),E.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:S(U)}),_>0&&E.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${S(_)}`}),W>0&&E.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${S(W)}`}),E.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:S(ue)}),E.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:S(V)}),m=V}b=He({totalAmount:m,paidAmount:$e,paidPercent:Ne,history:fe}),y=ot({manualStatus:Se||"unpaid",paidAmount:b.paidAmount,paidPercent:b.paidPercent,totalAmount:m}),j=n(`projects.paymentStatus.${y}`,y==="paid"?"Paid":y==="partial"?"Partial":"Unpaid"),P=y==="paid"?"status-paid":y==="partial"?"status-partial":"status-unpaid",N=Number.isFinite(Number(b.paidAmount))?Number(b.paidAmount):0,M=Number.isFinite(Number(b.paidPercent))?Number(b.paidPercent):0,O=Math.max(0,Number((m-N).toFixed(2))),q=S(N),Q=`${g(M.toFixed(2))}%`,K=S(O);const Xe=E.map(({icon:x,label:k,value:D})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${x} ${o(k)}</span>
      <span class="summary-details-value">${o(D)}</span>
    </div>
  `).join(""),Ce=n("projects.details.labels.code","رقم المشروع"),Tt=`
    <div class="project-details-code-badge" title="${o(Ce)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Ce)}
      </span>
      <span class="project-details-code-badge__value">${o($)}</span>
    </div>
  `,Qe=[{icon:"👤",label:n("projects.details.client","العميل"),value:d},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:f},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:v},A?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:A}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:`<span class="project-type-chip project-type-chip--${t.type||"default"}">${o(r)}</span>`},Lt("start",t.start),Lt("end",t.end)].filter(Boolean),Ze=n("projects.details.overview.heading","معلومات المشروع"),et=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Ze)}</h6>
      <ul class="project-details-outline__list">
        ${Qe.map(({icon:x,label:k,value:D,meta:R})=>{const L=String(D??""),de=L.trim().startsWith("<")?L:o(L),ie=String(R??""),ae=ie?o(ie):"";return`
          <li>
            <span class="project-details-outline__label">${o(x)} ${o(k)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${de}</span>
              ${R?`<span class="project-details-outline__meta">${ae}</span>`:""}
            </span>
          </li>
          `}).join("")}
      </ul>
    </div>
  `,tt=C>0?n("projects.details.chips.linkedReservation","مربوط بحجز"):n("projects.details.chips.notLinkedReservation","غير مربوط بحجز"),at=C>0?"reservation-chip status-confirmed":"reservation-chip status-info",ke=[`<span class="${oe}">${o(Je)}</span>`,`<span class="${at}">${o(tt)}</span>`,`<span class="reservation-chip ${P}">${o(j)}</span>`,Ee].filter(Boolean).join("");n("projects.details.expensesTotal","تكلفة الخدمات الإنتاجية"),n("projects.details.reservationsTotal","إجمالي الحجوزات");const Re=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",S(re)),nt=on(Array.isArray(t.expenses)?t.expenses:[]);h.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${ke}</div>
        </div>
        <div class="project-details-header__code">
          ${Tt}
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
      <h5>${o(Re)}</h5>
      ${nt}
    </section>
    
    <section class="project-details-section">
      <h5>${o(n("reservations.paymentHistory.title","سجل الدفعات"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.total","الإجمالي الكلي"))}</span>
          <strong>${o(S(m))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.paid","المدفوع"))}</span>
          <strong>${o(q)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(Q)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(K)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${Z}
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
  `,dn(t);const z=h.detailsBody.querySelector("#project-details-export-btn");z&&z.addEventListener("click",async x=>{if(x.preventDefault(),z.blur(),!z.disabled){z.disabled=!0;try{await za({project:t})}catch(k){console.error("❌ [projects/details] export project PDF failed",k),F(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{z.disabled=!1}}}),h.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(h.detailsModalEl).show()}function on(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
      <div class="table-responsive">
        <table class="table table-sm table-hover align-middle project-services-table">
          <thead class="table-light">
            <tr>
              <th>${o(n("projects.expenses.table.headers.service","الخدمة"))}</th>
              <th>${o(n("projects.expenses.table.headers.cost","التكلفة (SR)"))}</th>
              <th>${o(n("projects.expenses.table.headers.sale","سعر البيع (SR)"))}</th>
              <th>${o(n("projects.expenses.table.headers.note","ملاحظات"))}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="4" class="text-center text-muted">${s}</td></tr>
          </tbody>
        </table>
      </div>
    `}const a=e.map(s=>{const r=o(s?.label||""),l=S(Number(s?.amount)||0),i=S(Number(s?.sale_price??s?.salePrice??0)),d=s?.note?String(s.note):"";return`
      <tr>
        <td>${r}</td>
        <td>${o(l)}</td>
        <td>${o(i)}</td>
        <td>${o(d||"—")}</td>
      </tr>`}).join("");return`
    <div class="table-responsive">
      <table class="table table-sm table-hover align-middle project-services-table">
        <thead class="table-light">
          <tr>
            <th>${o(n("projects.expenses.table.headers.service","الخدمة"))}</th>
            <th>${o(n("projects.expenses.table.headers.cost","التكلفة (SR)"))}</th>
            <th>${o(n("projects.expenses.table.headers.sale","سعر البيع (SR)"))}</th>
            <th>${o(n("projects.expenses.table.headers.note","ملاحظات"))}</th>
          </tr>
        </thead>
        <tbody>${a}</tbody>
      </table>
    </div>
  `}function cn({onOpenProject:e}){!h.focusCards||h.focusCards.dataset.listenerAttached==="true"||(h.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),pn(l);return}r==="view"?e?.(l):r==="highlight"&&ln(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),h.focusCards.dataset.listenerAttached="true")}function ln(e){if(!h.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=h.projectsTableBody.querySelector(t);if(!a){F(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function dn(e){if(!h.detailsBody)return;const t=h.detailsBody.querySelector('[data-action="create-reservation"]'),a=h.detailsBody.querySelector('[data-action="edit-project"]'),s=h.detailsBody.querySelector('[data-action="delete-project"]'),r=h.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(ht(e.id)||[]).some(d=>{const c=String(d?.status||d?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ المشروع مربوط بحجز مسبقاً"),t.addEventListener("click",d=>{d.preventDefault(),F(n("projects.details.reservations.createDisabledToast","⚠️ المشروع مربوط بحجز مسبقاً"))})):(t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",d=>{d.preventDefault(),Dt(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),Dt(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),Jt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await ja(e.id),!T.projects.some(c=>String(c.id)===String(e.id))&&h.detailsModalEl&&window.bootstrap?.Modal.getInstance(h.detailsModalEl)?.hide()}finally{T.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const d=Ka("showReservationDetails");if(typeof d=="function")return d(i),!0;try{const c=await Ga("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const d=i.target.closest('[data-action="view-reservation"]');if(!d)return;const c=d.dataset.index||d.dataset.reservationIndex,f=Number.parseInt(c||"-1",10);if(!Number.isInteger(f)||f<0)return;await l(f)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const d=i.target.closest('[data-action="view-reservation"]');d&&(i.preventDefault(),d.click())})}}function Jt(e){if(!e||!h.detailsBody)return;const t=T.projects.find(u=>String(u.id)===String(e.id));if(!t)return;const a=T.customers.find(u=>String(u.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const s=Array.isArray(t.expenses)?t.expenses.map((u,v)=>({id:u?.id||`expense-${t.id}-${v}-${Date.now()}`,label:u?.label||"",amount:Number(u?.amount)||0,salePrice:Number.isFinite(Number(u?.sale_price??u?.salePrice))?Number(u?.sale_price??u?.salePrice):0})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((u,v)=>({type:u?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(u?.amount))?Number(u.amount):null,percentage:Number.isFinite(Number(u?.percentage))?Number(u.percentage):null,value:Number.isFinite(Number(u?.value))?Number(u.value):null,note:u?.note??null,recordedAt:u?.recordedAt??u?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${v}`})):[],l=r.reduce((u,v)=>u+(Number(v?.amount)||0),0),i=r.reduce((u,v)=>u+(Number(v?.percentage)||0),0),d=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,c=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(d>0||c>0)){const u=t.updatedAt??t.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(d)&&d>0?d:null,percentage:c,value:c,note:null,recordedAt:u,key:`legacy-payment-${t.id}-percent`}]:d>0&&(r=[{type:"amount",amount:d,percentage:null,value:d,note:null,recordedAt:u,key:`legacy-payment-${t.id}-amount`}]),l=r.reduce((v,A)=>v+(Number(A?.amount)||0),0),i=r.reduce((v,A)=>v+(Number(A?.percentage)||0),0),d=0,c=0}l>0&&Math.abs(d-l)<.01&&(d=0),i>0&&Math.abs(c-i)<.01&&(c=0);const f={expenses:s,payments:r,basePaidAmount:d,basePaidPercent:c};h.detailsBody.dataset.mode="edit",h.detailsBody.innerHTML=mn(t,f),un(t,f)}function un(e,t={expenses:[]}){const a=h.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",m=>{m.preventDefault(),ge(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),d=a.querySelector("#project-edit-expense-note"),c=a.querySelector('[data-action="add-expense"]'),f=a.querySelector("#project-edit-expense-list"),u=a.querySelector('[name="project-start-date"]'),v=a.querySelector('[name="project-start-time"]'),A=a.querySelector('[name="project-end-date"]'),G=a.querySelector('[name="project-end-time"]'),$=a.querySelector('[name="project-payment-status"]'),B=a.querySelector("#project-edit-tax"),H=a.querySelector("#project-edit-company-share"),I=a.querySelector("#project-edit-discount"),C=a.querySelector("#project-edit-discount-type"),se=a.querySelector("#project-edit-payment-progress-type"),J=a.querySelector("#project-edit-payment-progress-value"),re=a.querySelector("#project-edit-payment-add"),te=a.querySelector("#project-edit-payment-history"),Te=a.querySelector("#project-edit-payment-summary"),Ke=n("reservations.create.summary.currency","SR"),Ge=a.querySelector("#project-cancelled");let Pe=!1;(()=>{const m=(typeof window<"u"?window.flatpickr:null)||(typeof globalThis<"u"?globalThis.flatpickr:null);m&&(u&&m(u,{dateFormat:"Y-m-d",allowInput:!0}),A&&m(A,{dateFormat:"Y-m-d",allowInput:!0}),v&&m(v,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",altInput:!0,altFormat:"h:i K",time_24hr:!1,defaultHour:9,defaultMinute:0,minuteIncrement:5,disableMobile:!0,allowInput:!0,altInputClass:"flatpickr-alt-input form-control"}),G&&m(G,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",altInput:!0,altFormat:"h:i K",time_24hr:!1,defaultHour:9,defaultMinute:0,minuteIncrement:5,disableMobile:!0,allowInput:!0,altInputClass:"flatpickr-alt-input form-control"}))})();const me=m=>{if(!m||m.dataset.normalizedDigits==="true")return;const b=()=>{const y=m.value||"",j=g(y);if(j!==y){const P=m.selectionStart,N=m.selectionEnd;m.value=j;try{if(typeof P=="number"&&typeof N=="number"){const M=j.length-y.length;m.setSelectionRange(Math.max(0,P+M),Math.max(0,N+M))}}catch{}}};m.addEventListener("input",b),m.addEventListener("blur",b);try{m.setAttribute("inputmode","numeric")}catch{}m.dataset.normalizedDigits="true"};me(u),me(v),me(A),me(G),v&&v._flatpickr?.altInput&&me(v._flatpickr.altInput),G&&G._flatpickr?.altInput&&me(G._flatpickr.altInput);const xe=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),Ae=()=>{const m=Number(e.equipmentEstimate)||0,b=Array.isArray(t.expenses)?t.expenses.reduce((K,Z)=>K+(Number(Z.amount)||0),0):0,y=Array.isArray(t.expenses)?Math.max(0,Math.round(t.expenses.reduce((K,Z)=>K+Number(Z?.salePrice??0),0)*100)/100):Math.max(0,Number(e?.servicesClientPrice??0)),j=C?.value==="amount"?"amount":"percent",P=g(I?.value||"0");let N=Number.parseFloat(P);(!Number.isFinite(N)||N<0)&&(N=0);const M=B?.checked===!0,O=H?.checked===!0;let q=O?Pa(H):null;(!Number.isFinite(q)||q<=0)&&(q=O?it:null);const Q=Aa({equipmentEstimate:m,expensesTotal:b,servicesClientPrice:y,discountValue:N,discountType:j,applyTax:M,companyShareEnabled:O,companySharePercent:q});return{equipmentEstimate:m,expensesTotal:b,discountValue:N,discountTypeValue:j,applyTax:M,companyShareEnabled:O,companySharePercent:q,servicesClientPrice:y,finance:Q}},Ie=()=>{const m=Ae(),b=xe(),j=(ht(e.id)||[]).reduce((q,Q)=>q+(Number(Q?.totalAmount)||Zt(Q)||0),0),P=Number(m.finance?.taxableAmount||0),N=m.applyTax?Number(((P+j)*qe).toFixed(2)):0,M=Number((P+j+N).toFixed(2)),O=He({totalAmount:M,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:b});return{...m,combinedTotalWithTax:M,payments:b,progress:O}},Je=()=>{te&&(te.innerHTML=bn(xe()))},le=()=>{if(!Te)return;const{combinedTotalWithTax:m,progress:b}=Ie(),y=Number.isFinite(Number(m))?Number(m):0,j=Number.isFinite(Number(b.paidAmount))?Number(b.paidAmount):0,P=Number.isFinite(Number(b.paidPercent))?Number(b.paidPercent):0,N=Math.max(0,Math.round((y-j)*100)/100),M=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:S(y)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:S(j)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${g(P.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:S(N)}];Te.innerHTML=M.map(({label:O,value:q})=>`
        <div class="project-details-grid-item">
          <span>${o(O)}</span>
          <strong>${o(q)}</strong>
        </div>
      `).join("")},oe=(m="auto")=>{if(!$)return;const b=$.dataset?.userSelected==="true";if(m==="auto"&&b)return;const{finance:y,progress:j}=Ie(),P=ot({manualStatus:b?$.value:e.paymentStatus||"unpaid",paidAmount:j.paidAmount,paidPercent:j.paidPercent,totalAmount:y.totalWithTax});b||($.value=P)},Se=()=>{Je(),le(),oe("auto")},fe=1e-4,Me=()=>{const m=se?.value==="amount"?"amount":"percent",b=g(J?.value||"").replace("%","").trim();let y=Number.parseFloat(b);if(!Number.isFinite(y)||y<=0){F(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),J?.focus();return}const j=Ie(),P=Number.isFinite(Number(j.finance.totalWithTax))?Number(j.finance.totalWithTax):0;if(P<=0){F(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const N=Number(j.progress.paidAmount)||0,M=Number(j.progress.paidPercent)||0;let O=null,q=null;if(m==="percent"){const K=Math.max(0,100-M);if(K<=fe){F(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>K){y=K;const Z=g(y.toFixed(2));F(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",Z))}q=Math.round(y*100)/100,P>0&&(O=Math.round(q/100*P*100)/100)}else{const K=Math.max(0,P-N);if(K<=fe){F(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>K){y=K;const Z=`${g(y.toFixed(2))} ${Ke}`;F(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",Z))}O=Math.round(y*100)/100,P>0&&(q=Math.round(O/P*100*100)/100)}const Q={type:m,amount:O??null,percentage:q??null,value:m==="amount"?O:q,note:null,recordedAt:new Date().toISOString()};t.payments=[...xe(),Q],J&&(J.value=""),se&&(se.value="percent"),Se(),F(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},$e=m=>{!B||!H||Pe||(Pe=!0,m==="share"?H.checked?(B.checked||(B.checked=!0),rt(H)):B.checked&&(B.checked=!1):m==="tax"&&(B.checked?rt(H):H.checked&&(H.checked=!1)),Pe=!1)};function Ne(){f&&(f.innerHTML=Yt(t.expenses))}Ne(),Se(),I&&!I.dataset.listenerAttached&&(I.addEventListener("input",m=>{const b=m.target;b instanceof HTMLInputElement&&(b.value=g(b.value||""),le(),oe("auto"))}),I.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",m=>{const b=m.target;b instanceof HTMLInputElement&&(b.value=g(b.value||""))}),i.dataset.listenerAttached="true"),C&&!C.dataset.listenerAttached&&(C.addEventListener("change",()=>{le(),oe("auto")}),C.dataset.listenerAttached="true"),J&&!J.dataset.listenerAttached&&(J.addEventListener("input",m=>{const b=m.target;b instanceof HTMLInputElement&&(b.value=g(b.value||""))}),J.dataset.listenerAttached="true"),$&&!$.dataset.listenerAttached&&($.addEventListener("change",()=>{$.dataset.userSelected="true"}),$.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",m=>{const b=m.target;b instanceof HTMLInputElement&&(b.value=g(b.value||""))}),l.dataset.listenerAttached="true"),H&&!H.dataset.listenerAttached&&(H.addEventListener("change",()=>{$e("share"),le(),oe("auto")}),H.dataset.listenerAttached="true"),B&&!B.dataset.listenerAttached&&(B.addEventListener("change",()=>{$e("tax"),le(),oe("auto")}),B.dataset.listenerAttached="true"),H?.checked&&rt(H),$e(H?.checked?"share":"tax"),le(),oe("auto"),c&&c.addEventListener("click",m=>{m.preventDefault();const b=r?.value.trim()||"",y=g(l?.value||"0"),j=Number(y),P=g(i?.value||"0"),N=Number(P),M=(d?.value||"").trim();if(!b){F(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(j)||j<=0){F(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:b,amount:j,salePrice:Number.isFinite(N)&&N>0?N:0,note:M||""}),r&&(r.value=""),l&&(l.value=""),i&&(i.value=""),d&&(d.value=""),Ne(),le(),oe("auto")}),f&&f.addEventListener("click",m=>{const b=m.target.closest('[data-action="remove-expense"]');if(!b)return;const{id:y}=b.dataset;t.expenses=t.expenses.filter(j=>String(j.id)!==String(y)),Ne(),le(),oe("auto")}),re&&!re.dataset.listenerAttached&&(re.addEventListener("click",m=>{m.preventDefault(),Me()}),re.dataset.listenerAttached="true"),te&&!te.dataset.listenerAttached&&(te.addEventListener("click",m=>{const b=m.target.closest('[data-action="remove-payment"]');if(!b)return;const y=Number.parseInt(b.dataset.index||"-1",10);if(!Number.isInteger(y)||y<0)return;const j=xe();if(y>=j.length)return;const P=j.filter((N,M)=>M!==y);t.payments=P,Se(),F(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),te.dataset.listenerAttached="true"),a.addEventListener("submit",async m=>{if(m.preventDefault(),a.dataset.submitting==="true")return;const b=a.querySelector('[name="project-title"]'),y=a.querySelector('[name="project-type"]'),j=a.querySelector('[name="project-description"]'),P=b?.value.trim()||"",N=y?.value||"",M=g(u?.value.trim()||""),O=g(v?.value.trim()||""),q=j?.value.trim()||"",Q=($?.value||"unpaid").toLowerCase(),K=["paid","partial"].includes(Q)?Q:"unpaid";if(!P||!N||!M){F(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),b?.focus();return}const Z=g(A?.value.trim()||""),Ye=g(G?.value.trim()||""),Ee=Nt(M,O),E=Z?Nt(Z,Ye):"",Xe=new Date(Ee),Ce=E?new Date(E):null;if(Ce&&Xe>Ce){F(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),A?.focus();return}if(T.projects.findIndex(_=>String(_.id)===String(e.id))===-1){F(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Qe=Ae(),{equipmentEstimate:Ze,servicesClientPrice:et,discountValue:tt,discountTypeValue:at,applyTax:ke,companyShareEnabled:Re,companySharePercent:nt,finance:z}=Qe,x=se?.value==="amount"?"amount":"percent",k=g(J?.value||"");let D=k?Number.parseFloat(k):null,R=[...xe()];if(Number.isFinite(D)&&D>0&&Number.isFinite(Number(z.totalWithTax))){const _=He({totalAmount:z.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:R}),W=new Date().toISOString();if(x==="percent"){const V=Math.max(0,100-(_.paidPercent||0));if(V>fe){const ue=Math.min(D,V),pe=Math.round(ue*100)/100,he=z.totalWithTax>0?Math.round(pe/100*z.totalWithTax*100)/100:null;R=[...R,{type:"percent",amount:he,percentage:pe,value:pe,note:null,recordedAt:W}]}}else{const V=Math.max(0,z.totalWithTax-(_.paidAmount||0));if(V>fe){const ue=Math.min(D,V),pe=Math.round(ue*100)/100,he=z.totalWithTax>0?Math.round(pe/z.totalWithTax*100*100)/100:null;R=[...R,{type:"amount",amount:pe,percentage:he,value:pe,note:null,recordedAt:W}]}}R!==t.payments&&(t.payments=R,Se()),J&&(J.value=""),se&&(se.value="percent"),D=null}const L=He({totalAmount:z.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:R}),U=$?.dataset?.userSelected==="true",de=ot({manualStatus:U?K:e.paymentStatus||K,paidAmount:L.paidAmount,paidPercent:L.paidPercent,totalAmount:z.totalWithTax}),ie=U?K:de;!U&&$&&($.value=ie),$?.dataset&&delete $.dataset.userSelected,t.payments=R;const ae=Wa({projectCode:e.projectCode,title:P,type:N,clientId:e.clientId,clientCompany:e.clientCompany,description:q,start:Ee,end:E||null,applyTax:ke,paymentStatus:ie,equipmentEstimate:Ze,expenses:t.expenses,servicesClientPrice:et,discount:tt,discountType:at,companyShareEnabled:Re&&ke,companySharePercent:Re&&ke?nt:null,companyShareAmount:z.companyShareAmount,taxAmount:z.taxAmount,totalWithTax:z.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:xa(e),paidAmount:L.paidAmount,paidPercentage:L.paidPercent,paymentProgressType:L.paymentProgressType,paymentProgressValue:L.paymentProgressValue,payments:R}),ye=Ge?.checked===!0;ye&&(ae.status="cancelled",ae.cancelled=!0),a.dataset.submitting="true";try{const _=await Ot(e.projectId??e.id,ae),W=_?.projectId??_?.id??e.id;if(!ye)try{const V={start:Ee};E&&(V.end=E),await Sa(W,V)}catch(V){console.warn("⚠️ failed to sync linked reservations schedule",V)}if(await wa(W,ie),ye)try{await Ta(W)}catch(V){console.warn("⚠️ failed to cancel linked reservations",V)}T.projects=jt(),T.reservations=yt(),F(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),we(),Le(),Fe(),ge(e.id)}catch(_){console.error("❌ [projects] Failed to update project from details view",_);const W=ze(_)?_.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");F(W,"error")}finally{delete a.dataset.submitting}})}function Dt(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description,fromProjectForm:!0,draftStorageKey:"projects:create:draft",returnUrl:`projects.html?project=${encodeURIComponent(e.id)}&linked=1#projects-section`};ft({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}h.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(h.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function pn(e){if(!e)return;const t=T.projects.find(a=>String(a.id)===String(e));if(!t){F(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){F(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Ot(t.projectId??t.id,{confirmed:!0});const a=await ba(e);T.projects=jt(),T.reservations=yt(),we(),Le(),Fe(),h.detailsModalEl&&h.detailsModalEl.classList.contains("show")&&h.detailsBody?.dataset.projectId===String(e)&&ge(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),F(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=ze(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");F(s,"error")}}function mn(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=$t(e.start||""),{date:r,time:l}=$t(e.end||""),i=e.applyTax===!0||e.applyTax==="true";typeof e.paymentStatus=="string"&&e.paymentStatus.toLowerCase();const d=e.discountType==="amount"?"amount":"percent",c=g(String(e.discount??e.discountValue??0));g(String(e.servicesClientPrice??e.services_client_price??0));const f=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??it,u=Number.parseFloat(g(String(f))),v=Number.isFinite(u)&&u>0?u:it,A=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(u)&&u>0,G="",$=e?.cancelled===!0||e?.cancelled==="true"||String(e?.status||"").toLowerCase()==="cancelled"||String(e?.status||"").toLowerCase()==="canceled";return`
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
            <input class="form-check-input" type="checkbox" id="project-cancelled" name="project-cancelled" ${$?"checked":""}>
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
          <div class="project-edit-expense-label-col">
            <input type="text" class="form-control project-edit-input-wide" id="project-edit-expense-note" placeholder="${o(n("projects.form.labels.expenseNote","ملاحظات"))}">
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
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(v))}" ${A?"checked":""}>
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
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control project-edit-input-xs" value="${o(G)}" placeholder="0" inputmode="decimal">
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
              <th>${o(n("projects.expenses.table.headers.note","ملاحظات"))}</th>
              <th>${o(n("projects.expenses.table.headers.actions","الإجراءات"))}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="5" class="text-center text-muted">${i}</td></tr>
          </tbody>
        </table>
      </div>`}const t=o(n("actions.remove","إزالة")),a=e.map(i=>{const d=o(i?.label||""),c=o(S(i?.amount||0)),f=o(S(i?.salePrice||i?.sale_price||0)),u=o(String(i?.id||"")),v=o(String(i?.note||""));return`
      <tr>
        <td>${d}</td>
        <td>${c}</td>
        <td>${f}</td>
        <td>${v||"—"}</td>
        <td><button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${u}" aria-label="${t}">✖</button></td>
      </tr>`}).join(""),s=e.reduce((i,d)=>i+(Number(d?.salePrice??d?.sale_price)||0),0),r=o(S(s)),l=o(n("projects.expenses.table.totalSale","مجموع سعر البيع"));return`
    <div class="table-responsive">
      <table class="table table-sm table-hover align-middle project-services-table">
        <thead class="table-light">
          <tr>
            <th>${o(n("projects.expenses.table.headers.service","الخدمة"))}</th>
            <th>${o(n("projects.expenses.table.headers.cost","التكلفة (SR)"))}</th>
            <th>${o(n("projects.expenses.table.headers.sale","سعر البيع (SR)"))}</th>
            <th>${o(n("projects.expenses.table.headers.note","ملاحظات"))}</th>
            <th>${o(n("projects.expenses.table.headers.actions","الإجراءات"))}</th>
          </tr>
        </thead>
        <tbody>${a}</tbody>
        <tfoot>
          <tr>
            <th colspan="2" class="text-end">${l}</th>
            <th>${r}</th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>`}function hn(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(S(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${g(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?g(bt(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(g(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function bn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(S(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${g(Number(a.percentage).toFixed(2))}%`:"—",d=a?.recordedAt?g(bt(a.recordedAt)):"—",c=a?.note?o(g(a.note)):"",f=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
      <tr>
        <td>${o(r)}</td>
        <td>${l}</td>
        <td>${i}</td>
        <td>${d}</td>
        <td>${c}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${s}" aria-label="${f}">🗑️</button>
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
  `}function yn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(vn).filter(Boolean);if(a.length>0)return a;const s=Ve(e.paidPercent??e.paid_percent),r=Ve(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Xt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function vn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=Ve(e.amount??(a==="amount"?e.value:null)),r=Ve(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,d=Xt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:d}}function Ve(e){if(e==null||e==="")return null;const t=g(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Xt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Lt(e,t){if(!t)return null;const{date:a,time:s}=gn(bt(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية المشروع"):n("projects.details.labels.end","نهاية المشروع");return{icon:l,label:i,value:a,meta:s}}function gn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Qt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function Zt(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(g(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Vt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(g(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function St(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function jn(){return St(ct)}function xn(){return St(lt)}function Sn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[ct,lt,"linked"].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let f=!1;[ct,lt,"linked"].forEach(u=>{c.has(u)&&(c.delete(u),f=!0)}),f&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),d=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",d)}catch{}}function wn(){const e=jn(),t=xn(),a=St("linked");e&&(T.pendingProjectDetailId=e),t&&(T.pendingProjectEditId=t,T.pendingProjectDetailId||(T.pendingProjectDetailId=t)),a!=null&&String(a)!==""&&String(a)!=="0"&&String(a).toLowerCase()!=="false"&&(T.pendingLinkedToast=!0),(e||t)&&Sn()}function Tn(){if(!T.pendingProjectDetailId)return;const e=T.pendingProjectDetailId,t=String(e),a=T.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;T.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(ge(s),T.pendingLinkedToast){T.pendingLinkedToast=!1;try{F(n("projects.toast.linkedReservationCreated","✅ تم ربط الحجز بالمشروع"))}catch{}}if(T.pendingProjectEditId!=null){const r=String(T.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&(T.pendingProjectEditId=null,setTimeout(()=>Jt(a),0))}}function Pn(){document.addEventListener("DOMContentLoaded",()=>{rn(),wn(),$a(),Ht(),Na(),tn(),an(),Ea(),Ca(),ka(),Da(),La(),Fa(),Ia({onViewDetails:ge}),cn({onOpenProject:ge}),Ma(),An()}),document.addEventListener("language:changed",Ft),document.addEventListener("language:translationsReady",Ft),document.addEventListener("customers:changed",$n),document.addEventListener("technicians:updated",Nn),document.addEventListener("reservations:changed",()=>Ra(ge)),document.addEventListener(da.USER_UPDATED,()=>{we()})}async function An(){try{await Ut({suppressError:!0}),await zt()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");F(t,"error")}finally{_a(),Ue(),Ba(),qt(),we(),Fe(),Le(),Tn()}}function Ft(){Ue(),qt(),we(),Fe(),Le(),Ht()}function $n(){Ha(),Ue()}function Nn(){qa(),Ue()}ua();pa();ma();Ja();Pn();document.addEventListener("DOMContentLoaded",()=>{ha(),fa()});const ut=.15,_e={},En="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let De=0;const w={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Be=Object.freeze({projects:`
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
  `});let X=null;const ea=["upcoming","ongoing","completed"];async function Cn({forceProjects:e=!1}={}){try{await Ut({suppressError:!0}),await Ya({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),ze(t)&&console.warn("Projects API error:",t.message)}sa()}async function kn(){Fn(),aa(),await Dn();try{await Cn({forceProjects:!0}),oa(),Hn(),ne()}finally{na()}document.addEventListener("language:changed",Vn),document.addEventListener("projects:changed",()=>{pt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{pt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",On)}document.addEventListener("DOMContentLoaded",kn);async function Dn(){if(X)return X;if(typeof window>"u")return null;if(window.ApexCharts)return X=window.ApexCharts,X;try{await Ln(En),X=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),X=null}return X}function Ln(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function Fn(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function ta(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function aa(){De+=1,De===1&&ta(!0)}function na(){De=Math.max(0,De-1),De===0&&ta(!1)}function sa(){const{customers:e=[]}=Bt();w.customers=Array.isArray(e)?e:[],w.reservations=yt();const t=new Map(w.customers.map(s=>[String(s.id),s])),a=jt();w.projects=Array.isArray(a)?a.map(s=>In(s,t)):[],w.totalProjects=w.projects.length}function In(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=Mn(e.id),l=r.reduce((H,I)=>H+Rn(I),0),i=_n(e),d=Number(e?.equipmentEstimate)||0,c=Number((d+i).toFixed(2)),f=e?.applyTax===!0||e?.applyTax==="true",u=f?Number((c*ut).toFixed(2)):0,v=f?Number(((c+l)*ut).toFixed(2)):0,A=Number((c+l+v).toFixed(2)),G=Bn(e),$=e.start?new Date(e.start):null,B=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:$,end:B,applyTax:f,status:G,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:u,combinedTaxAmount:v,overallTotal:A,unpaidValue:a==="paid"?0:A,reservationsCount:r.length}}function Mn(e){return Array.isArray(w.reservations)?w.reservations.filter(t=>String(t.projectId)===String(e)):[]}function Rn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(g(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Vt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(g(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function _n(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function Bn(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function Hn(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{w.filters.search=p.search.value.trim(),ne()},180)})}p.payment&&(p.payment.value=w.filters.payment,p.payment.addEventListener("change",()=>{w.filters.payment=p.payment.value||"all",ne()})),p.dateRange&&(p.dateRange.addEventListener("change",qn),p.dateRange.value=w.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{w.filters.startDate=p.startDate.value,w.filters.range==="custom"&&ne()}),p.endDate&&p.endDate.addEventListener("change",()=>{w.filters.endDate=p.endDate.value,w.filters.range==="custom"&&ne()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(w.filters.range!=="custom"){ne();return}w.filters.startDate=p.startDate?.value||"",w.filters.endDate=p.endDate?.value||"",ne()})}function qn(e){const t=e.target.value;w.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),w.filters.startDate="",w.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),ne())}async function pt(){aa();try{await Promise.all([zt(),Oa()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),ze(e)&&console.warn("Projects API error:",e.message)}finally{sa(),ne(),na()}}function Vn(){oa(),ne()}function On(e){e.key&&!["projects","reservations","customers"].includes(e.key)||pt().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function ne(){const e=Un();wt(),Kn(e),Xn(e),Qn(e),Zn(e),es(e),ts(e)}function Un(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=w.filters,i=ra(e),d=new Date,c=Number(s);let f=null;if(s==="custom"){f=r?new Date(r):null;const u=l?new Date(l):null;return w.projects.filter(v=>!It(v,t)||!Mt(v,a)||!Rt(v,i)?!1:Wn(v.start,f,u))}return s!=="all"&&Number.isFinite(c)&&(f=new Date,f.setDate(d.getDate()-c)),w.projects.filter(u=>!It(u,t)||!Mt(u,a)||!Rt(u,i)?!1:s==="all"?!0:zn(u.start,f,d))}function It(e,t){return t.includes(e.status)}function Mt(e,t){return t==="all"?!0:e.paymentStatus===t}function Rt(e,t){return t?ra([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function zn(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function Wn(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function ra(e){return e?g(String(e)).toLowerCase().trim():""}function Kn(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((i,d)=>i+d.overallTotal,0),s=e.reduce((i,d)=>i+d.unpaidValue,0),r=e.reduce((i,d)=>i+d.expensesTotal,0),l=[{icon:Be.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:mt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Be.value,label:n("projects.reports.kpi.totalValue","Total value"),value:ee(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Be.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:ee(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Be.expenses,label:n("projects.reports.kpi.expenses","تكلفة الخدمات الإنتاجية"),value:ee(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];p.kpiGrid.innerHTML=l.map(({icon:i,label:d,value:c,meta:f})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${Y(d)}</p>
        <p class="reports-kpi-value">${Y(c)}</p>
        <span class="reports-kpi-meta">${Y(f)}</span>
      </div>
    </div>
  `).join(""),Gn(e)}function Gn(e){try{const t=Jn(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:ee(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:ee(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:ee(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:ee(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:ee(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:ee(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","تكلفة الخدمات الإنتاجية","Project expenses"),value:`−${ee(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:ee(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:d})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${Y(i)}</span>
            <span class="reports-kpi-detail-value">${Y(d)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:p.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function Jn(e){const t=new Set(e.map(I=>String(I.id))),a=w.reservations.filter(I=>I.projectId!=null&&t.has(String(I.projectId)));let s=0,r=0,l=0,i=0,d=0,c=0,f=0;a.forEach(I=>{const C=Xa(I);s+=C.finalTotal||0,r+=C.equipmentTotal||0,l+=C.crewTotal||0,i+=C.crewCostTotal||0,d+=C.companyShareAmount||0,c+=C.taxAmount||0,f+=C.netProfit||0});const u=e.reduce((I,C)=>I+(Number(C.expensesTotal)||0),0),v=e.reduce((I,C)=>I+(Number(C.raw?.equipmentEstimate)||0),0),A=e.reduce((I,C)=>{const se=C.applyTax===!0,J=(Number(C.raw?.equipmentEstimate)||0)+(Number(C.expensesTotal)||0),re=se?J*ut:0;return I+re},0),G=s+v+A,$=r+v,B=c+A,H=f-u;return{grossRevenue:G,companyShareTotal:d,taxTotal:B,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:$,projectExpensesTotal:u,netProfit:H}}function oa(){if(!p.statusChips)return;const e=ea.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${Y(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",Yn),p.statusChips.dataset.listenerAttached="true"),wt()}function Yn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(w.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&ea.forEach(r=>s.add(r)),w.filters.statuses=Array.from(s),wt(),ne()}function wt(){if(!p.statusChips)return;const e=new Set(w.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Xn(e){if(!X)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(f=>f.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,f)=>c+f,0)>0?s:[],d={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>je(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};We("status",t,d)}function Qn(e){if(!X)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(ns(),{month:"short",year:"numeric"});e.forEach(u=>{if(!u.start||Number.isNaN(u.start.getTime()))return;const v=`${u.start.getFullYear()}-${u.start.getMonth()+1}`,A=a.get(v)||{total:0,label:s.format(u.start)};A.total+=u.overallTotal,a.set(v,A)});const l=Array.from(a.keys()).sort((u,v)=>{const[A,G]=u.split("-").map(Number),[$,B]=v.split("-").map(Number);return A===$?G-B:A-$}).slice(-12),i=l.map(u=>a.get(u)?.label||u),d=l.map(u=>Math.round(a.get(u)?.total||0)),c=d.length?[{name:n("projects.reports.datasets.value","Total value"),data:d}]:[],f={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:u=>je(u)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:u=>je(u)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("timeline",t,f)}function Zn(e){if(!X)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((f,u)=>u.overallTotal-f.overallTotal).slice(0,6),s=a.map(f=>f.title||f.projectCode),r=a.map(f=>Math.round(f.overallTotal)),l=a.map(f=>Math.round(f.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","تكلفة الخدمات الإنتاجية"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:f=>je(f)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:f=>je(f)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("expenses",t,c)}function es(e){if(!X)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const f=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),u=a.get(f)||0;a.set(f,u+c.overallTotal)});const s=Array.from(a.entries()).sort((c,f)=>f[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],d={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>je(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>je(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("clients",t,d)}function We(e,t,a={}){if(!X||!t)return;if(_e[e]){try{_e[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete _e[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new X(t,s);_e[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function ts(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=as(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${Y(a.clientName)} <small class="text-muted">${Y(a.clientCompany)}</small>`:Y(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${Y(a.title||a.projectCode)}</span>
            <small class="text-muted">${Y(`#${a.projectCode}`)}</small>
          </div>
        </td>
        <td>${i}</td>
        <td>${Y(r)}</td>
        <td>${Y(s)}</td>
        <td>${Y(ee(a.overallTotal))}</td>
        <td>${Y(l)}</td>
      </tr>
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",mt(e.length)).replace("{total}",mt(w.totalProjects))}}function as(e,t){if(!e&&!t)return"—";const a=e?At(e.toISOString()):"—",s=t?At(t.toISOString()):"—";return t?`${a} → ${s}`:a}function ee(e){const t=Number(e)||0,s=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${g(r)} SR`}function mt(e){const a=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return g(new Intl.NumberFormat(a).format(e))}function je(e){const a=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return g(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function ns(){return Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function Y(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
