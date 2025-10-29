import{v as da,w as ua,x as Bt,o as ft,s as F,t as n,l as qt,n as y,A as pa,e as ma,m as fa,h as ha,i as ba,f as $t,g as Ge}from"./auth.9QCddEPx.js";/* empty css              */import{i as ya}from"./dashboardShell.DhnOkuz-.js";import{d as f,r as Se,a as Le,u as Fe,s as w,b as va,f as ht,h as ga,i as ja,j as o,k as j,l as xa,m as bt,n as Sa,o as Nt,e as rt,p as Et,q as Ta,t as wa,g as Pa,c as Aa,v as $a,w as Ht,x as Na,y as Ea,z as Ca,A as Da,B as ka,C as La,D as Fa,E as Ma,F as Ra,G as Ia,H as _a,I as Ke,J as Ba,K as Vt,L as qa,M as Ha}from"./form.B665m4IW.js";import"./customers.Ci7j_Lu-.js";import{g as yt,b as Va,o as Ue,q as ot,a as Ot,D as it,l as Oa}from"./reservationsService.BFxEMAfg.js";import{P as vt,l as gt,n as Ct,u as Ut,o as jt,p as Je,t as ze,v as Ua,x as za,i as Wa,h as Ga,w as Ka,y as ct,z as lt,e as zt,A as Wt,B as Ja,C as Ya}from"./controller.C_Stwz-r.js";import{a as Xa}from"./calculations.CI7kYldy.js";let Dt=null;function Qa(e){e&&Gt()!==e&&ft({[vt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Gt(){return Bt()?.[vt]||""}function Kt(e){e&&dt()!==e&&ft({[gt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function dt(){return Bt()?.[gt]||""}function Za(e){if(!e)return"";const t=e.trim();return t?Object.values(Ct).includes(t)?t:Ct[t]||"":""}function en(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Za(t);if(a)return a}}catch{}return""}function Jt(e,t){!e||!f.tabPanes||!f.tabButtons||(f.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),f.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Qa(e))}function tn(){if(!f.tabButtons||!f.tabButtons.length)return;f.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Jt(r,a),r==="projects-section"&&(w.filters.search="",f.search&&(f.search.value=""),Se(),Le(),Fe()))}),a.dataset.tabListenerAttached="true")});const e=Gt(),t=e&&f.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function xt(e,t){!e||!f.projectSubTabButtons||!f.projectSubTabPanes||(f.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),f.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function an(){!f.projectSubTabButtons||!f.projectSubTabButtons.length||(f.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(xt(a,e),Kt(a))}),e.dataset.tabListenerAttached="true")}),nn())}function nn(){const t=en()||dt();if(!t)return;const a=f.projectSubTabButtons?.[0],s=f.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==dt()&&Kt(r),xt(r,s))}function sn(){return f.tabButtons?f.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function kt(e={}){if(e){if(f.tabButtons&&f.tabButtons.length){const a=f.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[vt];if(s&&s!==a){const r=f.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Jt(s,r)}}if(f.projectSubTabButtons&&f.projectSubTabButtons.length&&sn()){const a=f.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[gt];if(s&&s!==a){const r=f.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&xt(s,r)}}}}function rn(){Dt||(Dt=da(e=>{kt(e)})),ua().then(e=>{kt(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function ve(e){const t=w.projects.find(x=>String(x.id)===String(e));if(!t||!f.detailsBody)return;f.detailsBody.dataset.mode="view",f.detailsBody.dataset.projectId=String(t.id);const s=(w.customers.length?w.customers:qt().customers||[]).find(x=>String(x.id)===String(t.clientId)),r=Zt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),d=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",m=c?y(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),u=s?.email??t.clientEmail??t.customerEmail??"",v=u?String(u).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),M=(t.clientCompany||s?.companyName||"").trim(),C=t.projectCode||`PRJ-${y(String(t.id))}`,q=y(C),P=ht(t.id),ee=P.reduce((x,E)=>x+ea(E),0),D=Number(ee.toFixed(2)),A=P.length,{subtotal:U,applyTax:Y,expensesTotal:K}=ga(t),fe=Number(t?.servicesClientPrice??t?.services_client_price??0),Me=U,Te=Y?Number(((Me+D)*ze).toFixed(2)):0,he=Number((Me+D+Te).toFixed(2)),ue=ja(t),we=n(`projects.status.${ue}`,Ua[ue]||ue),te=(()=>{try{const x=t.start?new Date(t.start):null,E=t.end?new Date(t.end):x?new Date(x.getTime()+3600*1e3):null;return!x||!E||Number.isNaN(x.getTime())||Number.isNaN(E.getTime())?!1:w.projects.some(H=>{if(!H||String(H.id)===String(t.id))return!1;const L=H.start?new Date(H.start):null,V=H.end?new Date(H.end):L?new Date(L.getTime()+3600*1e3):null;if(!L||!V||Number.isNaN(L.getTime())||Number.isNaN(V.getTime()))return!1;const B=Math.max(x.getTime(),L.getTime()),le=Math.min(E.getTime(),V.getTime());return B<le})}catch{return!1}})()&&ue!=="completed"?"conflict":ue,je={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل",conflict:"تعارض"}[te]||we,Xe={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed",conflict:"timeline-status-badge timeline-status-badge--conflict"}[te]||"timeline-status-badge timeline-status-badge--upcoming",Ae=Y?n("projects.details.chips.vatOn","شامل الضريبة 15٪"):n("projects.details.chips.vatOff","غير شامل الضريبة"),$e=Y?"status-paid":"status-unpaid",b=n("projects.details.chips.reservations","{count} حجوزات").replace("{count}",y(String(A))),h=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",g=yn(t),S=g.length>0,k=S?0:Number(t.paidAmount)||0,I=S?0:Number(t.paidPercent)||0;let _=he,$,N,X,O,W,Re,Ne,xe,Ie,Ee;const Pt=hn(g),Qe=n("projects.focus.confirmed","✅ مشروع مؤكد"),Ze=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(Qe)}</span>`:"";let R=[];if(A>0){const x=P.reduce((He,ie)=>{const la=Array.isArray(ie.items)?ie.items:[],At=Array.isArray(ie.crewAssignments)?ie.crewAssignments:[],ye=At.length?At:Array.isArray(ie.technicians)?ie.technicians:[],st=Va({items:la,technicianIds:Array.isArray(ye)&&!ye.length?ye:[],crewAssignments:Array.isArray(ye)&&ye.length&&typeof ye[0]=="object"?ye:[],discount:ie.discount??0,discountType:ie.discountType||"percent",applyTax:!1,start:ie.start,end:ie.end,companySharePercent:null});return He.equipment+=Number(st.equipmentTotal||0),He.crew+=Number(st.crewTotal||0),He.crewCost+=Number(st.crewCostTotal||0),He},{equipment:0,crew:0,crewCost:0}),E=Number(K||0),H=Number((x.equipment+x.crew+fe).toFixed(2)),L=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let B=(t?.discountType==="amount"?"amount":"percent")==="amount"?L:H*(L/100);(!Number.isFinite(B)||B<0)&&(B=0),B>H&&(B=H);const le=Y===!0,ae=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",de=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,nt=ae&&de>0?de:0,re=Math.max(0,H-B),oe=Number((re*(nt/100)).toFixed(2)),me=le?Number(((re+oe)*ze).toFixed(2)):0,De=Number((re+oe+me).toFixed(2)),ca=Number((De-oe-me-E-x.crewCost).toFixed(2));x.equipment>0&&R.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:j(x.equipment)}),x.crew>0&&R.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:j(x.crew)}),x.crewCost>0&&R.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:j(x.crewCost)}),E>0&&R.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:j(E)}),fe>0&&R.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:j(fe)}),B>0&&R.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${j(B)}`}),R.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:j(re)}),oe>0&&R.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${j(oe)}`}),me>0&&R.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${j(me)}`}),R.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:j(ca)}),R.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:j(De)}),_=De}else{const x=Number(K||0),E=Math.max(0,Number(fe)||0),H=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let V=(t?.discountType==="amount"?"amount":"percent")==="amount"?H:E*(H/100);(!Number.isFinite(V)||V<0)&&(V=0),V>E&&(V=E);const B=Math.max(0,E-V),le=Y===!0,ae=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",de=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,nt=ae&&de>0?de:0,re=Number((B*(nt/100)).toFixed(2)),oe=le?Number(((B+re)*ze).toFixed(2)):0,me=Number((B+re+oe).toFixed(2)),De=Number((me-re-oe-x).toFixed(2));R=[],R.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:j(E)}),V>0&&R.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${j(V)}`}),R.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:j(B)}),re>0&&R.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${j(re)}`}),oe>0&&R.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${j(oe)}`}),R.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:j(De)}),R.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:j(me)}),_=me}$=Ue({totalAmount:_,paidAmount:k,paidPercent:I,history:g}),N=ot({manualStatus:h||"unpaid",paidAmount:$.paidAmount,paidPercent:$.paidPercent,totalAmount:_}),X=n(`projects.paymentStatus.${N}`,N==="paid"?"Paid":N==="partial"?"Partial":"Unpaid"),O=N==="paid"?"status-paid":N==="partial"?"status-partial":"status-unpaid",W=Number.isFinite(Number($.paidAmount))?Number($.paidAmount):0,Re=Number.isFinite(Number($.paidPercent))?Number($.paidPercent):0,Ne=Math.max(0,Number((_-W).toFixed(2))),xe=j(W),Ie=`${y(Re.toFixed(2))}%`,Ee=j(Ne);const et=R.map(({icon:x,label:E,value:H})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${x} ${o(E)}</span>
      <span class="summary-details-value">${o(H)}</span>
    </div>
  `).join(""),_e=n("projects.details.labels.code","رقم المشروع"),Ce=`
    <div class="project-details-code-badge" title="${o(_e)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(_e)}
      </span>
      <span class="project-details-code-badge__value">${o(q)}</span>
    </div>
  `,Be=[{icon:"👤",label:n("projects.details.client","العميل"),value:d},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:m},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:v},M?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:M}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:r},Ft("start",t.start),Ft("end",t.end)].filter(Boolean),tt=n("projects.details.overview.heading","معلومات المشروع"),G=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(tt)}</h6>
      <ul class="project-details-outline__list">
        ${Be.map(({icon:x,label:E,value:H,meta:L})=>`
          <li>
            <span class="project-details-outline__label">${o(x)} ${o(E)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${o(H)}</span>
              ${L?`<span class="project-details-outline__meta">${o(L)}</span>`:""}
            </span>
          </li>
        `).join("")}
      </ul>
    </div>
  `,at=[`<span class="${Xe}">${o(je)}</span>`,`<span class="reservation-chip ${$e}">${o(Ae)}</span>`,`<span class="reservation-chip status-info">${o(b)}</span>`,`<span class="reservation-chip ${O}">${o(X)}</span>`,Ze].filter(Boolean).join(""),qe=n("projects.details.expensesTotal","تكلفة الخدمات الإنتاجية"),be=n("projects.details.reservationsTotal","إجمالي الحجوزات"),Q=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",j(K)),pe=on(Array.isArray(t.expenses)?t.expenses:[]);f.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${at}</div>
        </div>
        <div class="project-details-header__code">
          ${Ce}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${G}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(n("projects.details.summary.title","الملخص المالي"))}</h6>
            ${et}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.description","وصف المشروع"))}</h5>
      <p class="project-details-description">${o(i)}</p>
    </section>
    <section class="project-details-section">
      <h5>${o(Q)}</h5>
      ${pe}
    </section>
    <section class="project-details-section">
      <h5>${o(n("projects.details.financialBreakdown","تفاصيل مالية"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(qe)}</span>
          <strong>${j(K)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(be)}</span>
          <strong>${j(D)}</strong>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${o(n("reservations.paymentHistory.title","سجل الدفعات"))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.total","الإجمالي الكلي"))}</span>
          <strong>${o(j(_))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.paid","المدفوع"))}</span>
          <strong>${o(xe)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(Ie)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(Ee)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${Pt}
      </div>
    </section>
    ${xa(t)}
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
  `,dn(t);const se=f.detailsBody.querySelector("#project-details-export-btn");se&&se.addEventListener("click",async x=>{if(x.preventDefault(),se.blur(),!se.disabled){se.disabled=!0;try{await za({project:t})}catch(E){console.error("❌ [projects/details] export project PDF failed",E),F(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{se.disabled=!1}}}),f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl).show()}function on(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
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
    `}const a=e.map(s=>{const r=o(s?.label||""),l=j(Number(s?.amount)||0),i=j(Number(s?.sale_price??s?.salePrice??0));return`
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
  `}function cn({onOpenProject:e}){!f.focusCards||f.focusCards.dataset.listenerAttached==="true"||(f.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),pn(l);return}r==="view"?e?.(l):r==="highlight"&&ln(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),f.focusCards.dataset.listenerAttached="true")}function ln(e){if(!f.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=f.projectsTableBody.querySelector(t);if(!a){F(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function dn(e){if(!f.detailsBody)return;const t=f.detailsBody.querySelector('[data-action="create-reservation"]'),a=f.detailsBody.querySelector('[data-action="edit-project"]'),s=f.detailsBody.querySelector('[data-action="delete-project"]'),r=f.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(ht(e.id)||[]).some(d=>{const c=String(d?.status||d?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ المشروع مربوط بحجز مسبقاً"),t.addEventListener("click",d=>{d.preventDefault(),F(n("projects.details.reservations.createDisabledToast","⚠️ المشروع مربوط بحجز مسبقاً"))})):(t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",d=>{d.preventDefault(),Lt(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),Lt(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),Yt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await Sa(e.id),!w.projects.some(c=>String(c.id)===String(e.id))&&f.detailsModalEl&&window.bootstrap?.Modal.getInstance(f.detailsModalEl)?.hide()}finally{w.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const d=Ga("showReservationDetails");if(typeof d=="function")return d(i),!0;try{const c=await Ka("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const d=i.target.closest('[data-action="view-reservation"]');if(!d)return;const c=d.dataset.index||d.dataset.reservationIndex,m=Number.parseInt(c||"-1",10);if(!Number.isInteger(m)||m<0)return;await l(m)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const d=i.target.closest('[data-action="view-reservation"]');d&&(i.preventDefault(),d.click())})}}function Yt(e){if(!e||!f.detailsBody)return;const t=w.projects.find(u=>String(u.id)===String(e.id));if(!t)return;const a=w.customers.find(u=>String(u.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const s=Array.isArray(t.expenses)?t.expenses.map((u,v)=>({id:u?.id||`expense-${t.id}-${v}-${Date.now()}`,label:u?.label||"",amount:Number(u?.amount)||0,salePrice:Number.isFinite(Number(u?.sale_price??u?.salePrice))?Number(u?.sale_price??u?.salePrice):0})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((u,v)=>({type:u?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(u?.amount))?Number(u.amount):null,percentage:Number.isFinite(Number(u?.percentage))?Number(u.percentage):null,value:Number.isFinite(Number(u?.value))?Number(u.value):null,note:u?.note??null,recordedAt:u?.recordedAt??u?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${v}`})):[],l=r.reduce((u,v)=>u+(Number(v?.amount)||0),0),i=r.reduce((u,v)=>u+(Number(v?.percentage)||0),0),d=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,c=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(d>0||c>0)){const u=t.updatedAt??t.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(d)&&d>0?d:null,percentage:c,value:c,note:null,recordedAt:u,key:`legacy-payment-${t.id}-percent`}]:d>0&&(r=[{type:"amount",amount:d,percentage:null,value:d,note:null,recordedAt:u,key:`legacy-payment-${t.id}-amount`}]),l=r.reduce((v,M)=>v+(Number(M?.amount)||0),0),i=r.reduce((v,M)=>v+(Number(M?.percentage)||0),0),d=0,c=0}l>0&&Math.abs(d-l)<.01&&(d=0),i>0&&Math.abs(c-i)<.01&&(c=0);const m={expenses:s,payments:r,basePaidAmount:d,basePaidPercent:c};f.detailsBody.dataset.mode="edit",f.detailsBody.innerHTML=mn(t,m),un(t,m)}function un(e,t={expenses:[]}){const a=f.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",b=>{b.preventDefault(),ve(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),d=a.querySelector('[data-action="add-expense"]'),c=a.querySelector("#project-edit-expense-list"),m=a.querySelector('[name="project-start-date"]'),u=a.querySelector('[name="project-start-time"]'),v=a.querySelector('[name="project-end-date"]'),M=a.querySelector('[name="project-end-time"]'),C=a.querySelector('[name="project-payment-status"]'),q=a.querySelector("#project-edit-tax"),P=a.querySelector("#project-edit-company-share"),ee=a.querySelector("#project-edit-discount"),D=a.querySelector("#project-edit-discount-type"),A=a.querySelector("#project-edit-payment-progress-type"),U=a.querySelector("#project-edit-payment-progress-value"),Y=a.querySelector("#project-edit-payment-add"),K=a.querySelector("#project-edit-payment-history"),fe=a.querySelector("#project-edit-payment-summary"),Me=n("reservations.create.summary.currency","SR");let Te=!1;const he=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),ue=()=>{const b=Number(e.equipmentEstimate)||0,h=Array.isArray(t.expenses)?t.expenses.reduce((O,W)=>O+(Number(W.amount)||0),0):0,g=Array.isArray(t.expenses)?Math.max(0,Math.round(t.expenses.reduce((O,W)=>O+Number(W?.salePrice??0),0)*100)/100):Math.max(0,Number(e?.servicesClientPrice??0)),S=D?.value==="amount"?"amount":"percent",k=y(ee?.value||"0");let I=Number.parseFloat(k);(!Number.isFinite(I)||I<0)&&(I=0);const _=q?.checked===!0,$=P?.checked===!0;let N=$?Pa(P):null;(!Number.isFinite(N)||N<=0)&&(N=$?it:null);const X=Aa({equipmentEstimate:b,expensesTotal:h,servicesClientPrice:g,discountValue:I,discountType:S,applyTax:_,companyShareEnabled:$,companySharePercent:N});return{equipmentEstimate:b,expensesTotal:h,discountValue:I,discountTypeValue:S,applyTax:_,companyShareEnabled:$,companySharePercent:N,servicesClientPrice:g,finance:X}},we=()=>{const b=ue(),h=he(),S=(ht(e.id)||[]).reduce((N,X)=>N+(Number(X?.totalAmount)||ea(X)||0),0),k=Number(b.finance?.taxableAmount||0),I=b.applyTax?Number(((k+S)*ze).toFixed(2)):0,_=Number((k+S+I).toFixed(2)),$=Ue({totalAmount:_,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:h});return{...b,combinedTotalWithTax:_,payments:h,progress:$}},wt=()=>{K&&(K.innerHTML=bn(he()))},te=()=>{if(!fe)return;const{combinedTotalWithTax:b,progress:h}=we(),g=Number.isFinite(Number(b))?Number(b):0,S=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,k=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,I=Math.max(0,Math.round((g-S)*100)/100),_=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:j(g)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:j(S)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${y(k.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:j(I)}];fe.innerHTML=_.map(({label:$,value:N})=>`
        <div class="project-details-grid-item">
          <span>${o($)}</span>
          <strong>${o(N)}</strong>
        </div>
      `).join("")},ce=(b="auto")=>{if(!C)return;const h=C.dataset?.userSelected==="true";if(b==="auto"&&h)return;const{finance:g,progress:S}=we(),k=ot({manualStatus:h?C.value:e.paymentStatus||"unpaid",paidAmount:S.paidAmount,paidPercent:S.paidPercent,totalAmount:g.totalWithTax});h||(C.value=k)},je=()=>{wt(),te(),ce("auto")},Pe=1e-4,Xe=()=>{const b=A?.value==="amount"?"amount":"percent",h=y(U?.value||"").replace("%","").trim();let g=Number.parseFloat(h);if(!Number.isFinite(g)||g<=0){F(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),U?.focus();return}const S=we(),k=Number.isFinite(Number(S.finance.totalWithTax))?Number(S.finance.totalWithTax):0;if(k<=0){F(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const I=Number(S.progress.paidAmount)||0,_=Number(S.progress.paidPercent)||0;let $=null,N=null;if(b==="percent"){const O=Math.max(0,100-_);if(O<=Pe){F(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(g>O){g=O;const W=y(g.toFixed(2));F(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",W))}N=Math.round(g*100)/100,k>0&&($=Math.round(N/100*k*100)/100)}else{const O=Math.max(0,k-I);if(O<=Pe){F(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(g>O){g=O;const W=`${y(g.toFixed(2))} ${Me}`;F(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",W))}$=Math.round(g*100)/100,k>0&&(N=Math.round($/k*100*100)/100)}const X={type:b,amount:$??null,percentage:N??null,value:b==="amount"?$:N,note:null,recordedAt:new Date().toISOString()};t.payments=[...he(),X],U&&(U.value=""),A&&(A.value="percent"),je(),F(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},Ae=b=>{!q||!P||Te||(Te=!0,b==="share"?P.checked?(q.checked||(q.checked=!0),rt(P)):q.checked&&(q.checked=!1):b==="tax"&&(q.checked?rt(P):P.checked&&(P.checked=!1)),Te=!1)};function $e(){c&&(c.innerHTML=Xt(t.expenses))}$e(),je(),ee&&!ee.dataset.listenerAttached&&(ee.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=y(h.value||""),te(),ce("auto"))}),ee.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=y(h.value||""))}),i.dataset.listenerAttached="true"),D&&!D.dataset.listenerAttached&&(D.addEventListener("change",()=>{te(),ce("auto")}),D.dataset.listenerAttached="true"),U&&!U.dataset.listenerAttached&&(U.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=y(h.value||""))}),U.dataset.listenerAttached="true"),C&&!C.dataset.listenerAttached&&(C.addEventListener("change",()=>{C.dataset.userSelected="true"}),C.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",b=>{const h=b.target;h instanceof HTMLInputElement&&(h.value=y(h.value||""))}),l.dataset.listenerAttached="true"),P&&!P.dataset.listenerAttached&&(P.addEventListener("change",()=>{Ae("share"),te(),ce("auto")}),P.dataset.listenerAttached="true"),q&&!q.dataset.listenerAttached&&(q.addEventListener("change",()=>{Ae("tax"),te(),ce("auto")}),q.dataset.listenerAttached="true"),P?.checked&&rt(P),Ae(P?.checked?"share":"tax"),te(),ce("auto"),d&&d.addEventListener("click",b=>{b.preventDefault();const h=r?.value.trim()||"",g=y(l?.value||"0"),S=Number(g),k=y(i?.value||"0"),I=Number(k);if(!h){F(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(S)||S<=0){F(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:h,amount:S,salePrice:Number.isFinite(I)&&I>0?I:0}),r&&(r.value=""),l&&(l.value=""),i&&(i.value=""),$e(),te(),ce("auto")}),c&&c.addEventListener("click",b=>{const h=b.target.closest('[data-action="remove-expense"]');if(!h)return;const{id:g}=h.dataset;t.expenses=t.expenses.filter(S=>String(S.id)!==String(g)),$e(),te(),ce("auto")}),Y&&!Y.dataset.listenerAttached&&(Y.addEventListener("click",b=>{b.preventDefault(),Xe()}),Y.dataset.listenerAttached="true"),K&&!K.dataset.listenerAttached&&(K.addEventListener("click",b=>{const h=b.target.closest('[data-action="remove-payment"]');if(!h)return;const g=Number.parseInt(h.dataset.index||"-1",10);if(!Number.isInteger(g)||g<0)return;const S=he();if(g>=S.length)return;const k=S.filter((I,_)=>_!==g);t.payments=k,je(),F(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),K.dataset.listenerAttached="true"),a.addEventListener("submit",async b=>{if(b.preventDefault(),a.dataset.submitting==="true")return;const h=a.querySelector('[name="project-title"]'),g=a.querySelector('[name="project-type"]'),S=a.querySelector('[name="project-description"]'),k=h?.value.trim()||"",I=g?.value||"",_=m?.value.trim()||"",$=u?.value.trim()||"",N=S?.value.trim()||"",X=(C?.value||"unpaid").toLowerCase(),O=["paid","partial"].includes(X)?X:"unpaid";if(!k||!I||!_){F(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),h?.focus();return}const W=v?.value.trim()||"",Re=M?.value.trim()||"",Ne=Et(_,$),xe=W?Et(W,Re):"",Ie=new Date(Ne),Ee=xe?new Date(xe):null;if(Ee&&Ie>Ee){F(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),v?.focus();return}if(w.projects.findIndex(L=>String(L.id)===String(e.id))===-1){F(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Qe=ue(),{equipmentEstimate:Ze,servicesClientPrice:R,discountValue:et,discountTypeValue:_e,applyTax:Ce,companyShareEnabled:Be,companySharePercent:tt,finance:G}=Qe,at=A?.value==="amount"?"amount":"percent",qe=y(U?.value||"");let be=qe?Number.parseFloat(qe):null,Q=[...he()];if(Number.isFinite(be)&&be>0&&Number.isFinite(Number(G.totalWithTax))){const L=Ue({totalAmount:G.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:Q}),V=new Date().toISOString();if(at==="percent"){const B=Math.max(0,100-(L.paidPercent||0));if(B>Pe){const le=Math.min(be,B),ae=Math.round(le*100)/100,de=G.totalWithTax>0?Math.round(ae/100*G.totalWithTax*100)/100:null;Q=[...Q,{type:"percent",amount:de,percentage:ae,value:ae,note:null,recordedAt:V}]}}else{const B=Math.max(0,G.totalWithTax-(L.paidAmount||0));if(B>Pe){const le=Math.min(be,B),ae=Math.round(le*100)/100,de=G.totalWithTax>0?Math.round(ae/G.totalWithTax*100*100)/100:null;Q=[...Q,{type:"amount",amount:ae,percentage:de,value:ae,note:null,recordedAt:V}]}}Q!==t.payments&&(t.payments=Q,je()),U&&(U.value=""),A&&(A.value="percent"),be=null}const pe=Ue({totalAmount:G.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:Q}),se=C?.dataset?.userSelected==="true",x=ot({manualStatus:se?O:e.paymentStatus||O,paidAmount:pe.paidAmount,paidPercent:pe.paidPercent,totalAmount:G.totalWithTax}),E=se?O:x;!se&&C&&(C.value=E),C?.dataset&&delete C.dataset.userSelected,t.payments=Q;const H=Wa({projectCode:e.projectCode,title:k,type:I,clientId:e.clientId,clientCompany:e.clientCompany,description:N,start:Ne,end:xe||null,applyTax:Ce,paymentStatus:E,equipmentEstimate:Ze,expenses:t.expenses,servicesClientPrice:R,discount:et,discountType:_e,companyShareEnabled:Be&&Ce,companySharePercent:Be&&Ce?tt:null,companyShareAmount:G.companyShareAmount,taxAmount:G.taxAmount,totalWithTax:G.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:Ta(e),paidAmount:pe.paidAmount,paidPercentage:pe.paidPercent,paymentProgressType:pe.paymentProgressType,paymentProgressValue:pe.paymentProgressValue,payments:Q});a.dataset.submitting="true";try{const L=await Ut(e.projectId??e.id,H),V=L?.projectId??L?.id??e.id;await wa(V,E),w.projects=jt(),w.reservations=yt(),F(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),Se(),Le(),Fe(),ve(e.id)}catch(L){console.error("❌ [projects] Failed to update project from details view",L);const V=Je(L)?L.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");F(V,"error")}finally{delete a.dataset.submitting}})}function Lt(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description,fromProjectForm:!0,draftStorageKey:"projects:create:draft",returnUrl:`projects.html?project=${encodeURIComponent(e.id)}&linked=1#projects-section`};ft({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}f.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function pn(e){if(!e)return;const t=w.projects.find(a=>String(a.id)===String(e));if(!t){F(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){F(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Ut(t.projectId??t.id,{confirmed:!0});const a=await va(e);w.projects=jt(),w.reservations=yt(),Se(),Le(),Fe(),f.detailsModalEl&&f.detailsModalEl.classList.contains("show")&&f.detailsBody?.dataset.projectId===String(e)&&ve(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),F(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=Je(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");F(s,"error")}}function mn(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=Nt(e.start||""),{date:r,time:l}=Nt(e.end||""),i=e.applyTax===!0||e.applyTax==="true";typeof e.paymentStatus=="string"&&e.paymentStatus.toLowerCase();const d=e.discountType==="amount"?"amount":"percent",c=y(String(e.discount??e.discountValue??0));y(String(e.servicesClientPrice??e.services_client_price??0));const m=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??it,u=Number.parseFloat(y(String(m))),v=Number.isFinite(u)&&u>0?u:it,M=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(u)&&u>0;return`
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
          ${Xt(t.expenses)}
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
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(v))}" ${M?"checked":""}>
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
  `}function fn(e){return["commercial","coverage","photography","social"].map(a=>{const s=Zt(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(s)}</option>`}).join("")}function Xt(e=[]){if(!Array.isArray(e)||e.length===0){const i=o(n("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"));return`
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
      </div>`}const t=o(n("actions.remove","إزالة")),a=e.map(i=>{const d=o(i?.label||""),c=o(j(i?.amount||0)),m=o(j(i?.salePrice||i?.sale_price||0)),u=o(String(i?.id||""));return`
      <tr>
        <td>${d}</td>
        <td>${c}</td>
        <td>${m}</td>
        <td><button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${u}" aria-label="${t}">✖</button></td>
      </tr>`}).join(""),s=e.reduce((i,d)=>i+(Number(d?.salePrice??d?.sale_price)||0),0),r=o(j(s)),l=o(n("projects.expenses.table.totalSale","مجموع سعر البيع"));return`
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
    </div>`}function hn(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(j(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${y(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?y(bt(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(y(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function bn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(j(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${y(Number(a.percentage).toFixed(2))}%`:"—",d=a?.recordedAt?y(bt(a.recordedAt)):"—",c=a?.note?o(y(a.note)):"",m=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
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
  `}function yn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(vn).filter(Boolean);if(a.length>0)return a;const s=We(e.paidPercent??e.paid_percent),r=We(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Qt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function vn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=We(e.amount??(a==="amount"?e.value:null)),r=We(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,d=Qt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:d}}function We(e){if(e==null||e==="")return null;const t=y(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Qt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Ft(e,t){if(!t)return null;const{date:a,time:s}=gn(bt(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية الحجز"):n("projects.details.labels.end","نهاية الحجز");return{icon:l,label:i,value:a,meta:s}}function gn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Zt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function ea(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(y(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Ot(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(y(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function St(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function jn(){return St(ct)}function xn(){return St(lt)}function Sn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[ct,lt,"linked"].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let m=!1;[ct,lt,"linked"].forEach(u=>{c.has(u)&&(c.delete(u),m=!0)}),m&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),d=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",d)}catch{}}function Tn(){const e=jn(),t=xn(),a=St("linked");e&&(w.pendingProjectDetailId=e),t&&(w.pendingProjectEditId=t,w.pendingProjectDetailId||(w.pendingProjectDetailId=t)),a!=null&&String(a)!==""&&String(a)!=="0"&&String(a).toLowerCase()!=="false"&&(w.pendingLinkedToast=!0),(e||t)&&Sn()}function wn(){if(!w.pendingProjectDetailId)return;const e=w.pendingProjectDetailId,t=String(e),a=w.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;w.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(ve(s),w.pendingLinkedToast){w.pendingLinkedToast=!1;try{F(n("projects.toast.linkedReservationCreated","✅ تم ربط الحجز بالمشروع"))}catch{}}if(w.pendingProjectEditId!=null){const r=String(w.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&(w.pendingProjectEditId=null,setTimeout(()=>Yt(a),0))}}function Pn(){document.addEventListener("DOMContentLoaded",()=>{rn(),Tn(),$a(),Ht(),Na(),tn(),an(),Ea(),Ca(),Da(),ka(),La(),Fa(),Ma({onViewDetails:ve}),cn({onOpenProject:ve}),Ra(),An()}),document.addEventListener("language:changed",Mt),document.addEventListener("language:translationsReady",Mt),document.addEventListener("customers:changed",$n),document.addEventListener("technicians:updated",Nn),document.addEventListener("reservations:changed",()=>Ia(ve)),document.addEventListener(pa.USER_UPDATED,()=>{Se()})}async function An(){try{await zt({suppressError:!0}),await Wt()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");F(t,"error")}finally{_a(),Ke(),Ba(),Vt(),Se(),Fe(),Le(),wn()}}function Mt(){Ke(),Vt(),Se(),Fe(),Le(),Ht()}function $n(){qa(),Ke()}function Nn(){Ha(),Ke()}ma();fa();ha();Ja();Pn();document.addEventListener("DOMContentLoaded",()=>{ya(),ba()});const ut=.15,Ve={},En="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let ke=0;const T={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Oe=Object.freeze({projects:`
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
  `});let J=null;const ta=["upcoming","ongoing","completed"];async function Cn({forceProjects:e=!1}={}){try{await zt({suppressError:!0}),await Ya({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),Je(t)&&console.warn("Projects API error:",t.message)}ra()}async function Dn(){Fn(),na(),await kn();try{await Cn({forceProjects:!0}),ia(),qn(),ne()}finally{sa()}document.addEventListener("language:changed",Vn),document.addEventListener("projects:changed",()=>{pt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{pt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",On)}document.addEventListener("DOMContentLoaded",Dn);async function kn(){if(J)return J;if(typeof window>"u")return null;if(window.ApexCharts)return J=window.ApexCharts,J;try{await Ln(En),J=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),J=null}return J}function Ln(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function Fn(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function aa(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function na(){ke+=1,ke===1&&aa(!0)}function sa(){ke=Math.max(0,ke-1),ke===0&&aa(!1)}function ra(){const{customers:e=[]}=qt();T.customers=Array.isArray(e)?e:[],T.reservations=yt();const t=new Map(T.customers.map(s=>[String(s.id),s])),a=jt();T.projects=Array.isArray(a)?a.map(s=>Mn(s,t)):[],T.totalProjects=T.projects.length}function Mn(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=Rn(e.id),l=r.reduce((ee,D)=>ee+In(D),0),i=_n(e),d=Number(e?.equipmentEstimate)||0,c=Number((d+i).toFixed(2)),m=e?.applyTax===!0||e?.applyTax==="true",u=m?Number((c*ut).toFixed(2)):0,v=m?Number(((c+l)*ut).toFixed(2)):0,M=Number((c+l+v).toFixed(2)),C=Bn(e),q=e.start?new Date(e.start):null,P=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:q,end:P,applyTax:m,status:C,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:u,combinedTaxAmount:v,overallTotal:M,unpaidValue:a==="paid"?0:M,reservationsCount:r.length}}function Rn(e){return Array.isArray(T.reservations)?T.reservations.filter(t=>String(t.projectId)===String(e)):[]}function In(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(y(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],d=Ot(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(d))return d;const c=Number(y(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function _n(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function Bn(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function qn(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{T.filters.search=p.search.value.trim(),ne()},180)})}p.payment&&(p.payment.value=T.filters.payment,p.payment.addEventListener("change",()=>{T.filters.payment=p.payment.value||"all",ne()})),p.dateRange&&(p.dateRange.addEventListener("change",Hn),p.dateRange.value=T.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{T.filters.startDate=p.startDate.value,T.filters.range==="custom"&&ne()}),p.endDate&&p.endDate.addEventListener("change",()=>{T.filters.endDate=p.endDate.value,T.filters.range==="custom"&&ne()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(T.filters.range!=="custom"){ne();return}T.filters.startDate=p.startDate?.value||"",T.filters.endDate=p.endDate?.value||"",ne()})}function Hn(e){const t=e.target.value;T.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),T.filters.startDate="",T.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),ne())}async function pt(){na();try{await Promise.all([Wt(),Oa()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),Je(e)&&console.warn("Projects API error:",e.message)}finally{ra(),ne(),sa()}}function Vn(){ia(),ne()}function On(e){e.key&&!["projects","reservations","customers"].includes(e.key)||pt().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function ne(){const e=Un();Tt(),Gn(e),Xn(e),Qn(e),Zn(e),es(e),ts(e)}function Un(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=T.filters,i=oa(e),d=new Date,c=Number(s);let m=null;if(s==="custom"){m=r?new Date(r):null;const u=l?new Date(l):null;return T.projects.filter(v=>!Rt(v,t)||!It(v,a)||!_t(v,i)?!1:Wn(v.start,m,u))}return s!=="all"&&Number.isFinite(c)&&(m=new Date,m.setDate(d.getDate()-c)),T.projects.filter(u=>!Rt(u,t)||!It(u,a)||!_t(u,i)?!1:s==="all"?!0:zn(u.start,m,d))}function Rt(e,t){return t.includes(e.status)}function It(e,t){return t==="all"?!0:e.paymentStatus===t}function _t(e,t){return t?oa([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function zn(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function Wn(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function oa(e){return e?y(String(e)).toLowerCase().trim():""}function Gn(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((i,d)=>i+d.overallTotal,0),s=e.reduce((i,d)=>i+d.unpaidValue,0),r=e.reduce((i,d)=>i+d.expensesTotal,0),l=[{icon:Oe.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:mt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Oe.value,label:n("projects.reports.kpi.totalValue","Total value"),value:Z(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Oe.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:Z(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Oe.expenses,label:n("projects.reports.kpi.expenses","تكلفة الخدمات الإنتاجية"),value:Z(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];p.kpiGrid.innerHTML=l.map(({icon:i,label:d,value:c,meta:m})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${z(d)}</p>
        <p class="reports-kpi-value">${z(c)}</p>
        <span class="reports-kpi-meta">${z(m)}</span>
      </div>
    </div>
  `).join(""),Kn(e)}function Kn(e){try{const t=Jn(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:Z(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:Z(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:Z(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:Z(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:Z(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:Z(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","تكلفة الخدمات الإنتاجية","Project expenses"),value:`−${Z(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:Z(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:d})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${z(i)}</span>
            <span class="reports-kpi-detail-value">${z(d)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:p.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function Jn(e){const t=new Set(e.map(D=>String(D.id))),a=T.reservations.filter(D=>D.projectId!=null&&t.has(String(D.projectId)));let s=0,r=0,l=0,i=0,d=0,c=0,m=0;a.forEach(D=>{const A=Xa(D);s+=A.finalTotal||0,r+=A.equipmentTotal||0,l+=A.crewTotal||0,i+=A.crewCostTotal||0,d+=A.companyShareAmount||0,c+=A.taxAmount||0,m+=A.netProfit||0});const u=e.reduce((D,A)=>D+(Number(A.expensesTotal)||0),0),v=e.reduce((D,A)=>D+(Number(A.raw?.equipmentEstimate)||0),0),M=e.reduce((D,A)=>{const U=A.applyTax===!0,Y=(Number(A.raw?.equipmentEstimate)||0)+(Number(A.expensesTotal)||0),K=U?Y*ut:0;return D+K},0),C=s+v+M,q=r+v,P=c+M,ee=m-u;return{grossRevenue:C,companyShareTotal:d,taxTotal:P,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:q,projectExpensesTotal:u,netProfit:ee}}function ia(){if(!p.statusChips)return;const e=ta.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${z(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",Yn),p.statusChips.dataset.listenerAttached="true"),Tt()}function Yn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(T.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&ta.forEach(r=>s.add(r)),T.filters.statuses=Array.from(s),Tt(),ne()}function Tt(){if(!p.statusChips)return;const e=new Set(T.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Xn(e){if(!J)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(m=>m.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,m)=>c+m,0)>0?s:[],d={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>ge(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};Ye("status",t,d)}function Qn(e){if(!J)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(ns(),{month:"short",year:"numeric"});e.forEach(u=>{if(!u.start||Number.isNaN(u.start.getTime()))return;const v=`${u.start.getFullYear()}-${u.start.getMonth()+1}`,M=a.get(v)||{total:0,label:s.format(u.start)};M.total+=u.overallTotal,a.set(v,M)});const l=Array.from(a.keys()).sort((u,v)=>{const[M,C]=u.split("-").map(Number),[q,P]=v.split("-").map(Number);return M===q?C-P:M-q}).slice(-12),i=l.map(u=>a.get(u)?.label||u),d=l.map(u=>Math.round(a.get(u)?.total||0)),c=d.length?[{name:n("projects.reports.datasets.value","Total value"),data:d}]:[],m={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:u=>ge(u)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:u=>ge(u)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Ye("timeline",t,m)}function Zn(e){if(!J)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((m,u)=>u.overallTotal-m.overallTotal).slice(0,6),s=a.map(m=>m.title||m.projectCode),r=a.map(m=>Math.round(m.overallTotal)),l=a.map(m=>Math.round(m.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","تكلفة الخدمات الإنتاجية"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:m=>ge(m)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:m=>ge(m)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Ye("expenses",t,c)}function es(e){if(!J)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const m=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),u=a.get(m)||0;a.set(m,u+c.overallTotal)});const s=Array.from(a.entries()).sort((c,m)=>m[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],d={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>ge(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>ge(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Ye("clients",t,d)}function Ye(e,t,a={}){if(!J||!t)return;if(Ve[e]){try{Ve[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete Ve[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new J(t,s);Ve[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function ts(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=as(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${z(a.clientName)} <small class="text-muted">${z(a.clientCompany)}</small>`:z(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
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
        <td>${z(Z(a.overallTotal))}</td>
        <td>${z(l)}</td>
      </tr>
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",mt(e.length)).replace("{total}",mt(T.totalProjects))}}function as(e,t){if(!e&&!t)return"—";const a=e?$t(e.toISOString()):"—",s=t?$t(t.toISOString()):"—";return t?`${a} → ${s}`:a}function Z(e){const t=Number(e)||0,s=Ge()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${y(r)} SR`}function mt(e){const a=Ge()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return y(new Intl.NumberFormat(a).format(e))}function ge(e){const a=Ge()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return y(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function ns(){return Ge()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function z(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
