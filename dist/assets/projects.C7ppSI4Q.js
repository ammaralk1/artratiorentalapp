import{v as ia,w as ca,x as It,o as ut,s as L,t as n,l as Rt,n as v,A as la,e as da,m as ua,h as pa,i as ma,f as wt,g as Ve}from"./auth.UdF5b_hJ.js";/* empty css              */import{i as fa}from"./dashboardShell.tMq52fMf.js";import{d as h,r as Te,a as Ce,u as ke,s as P,b as ha,f as pt,h as ba,i as ya,j as o,k as S,l as va,m as mt,n as ga,o as Pt,e as at,p as At,q as ja,t as xa,g as Sa,c as Ta,v as wa,w as _t,x as Pa,y as Aa,z as Na,A as $a,B as Ea,C as Ca,D as ka,E as Da,F as La,G as Fa,H as Ma,I as Oe,J as Ia,K as Bt,L as Ra,M as _a}from"./form.BhcJ_9rx.js";import"./customers.C83ruYcL.js";import{g as ft,b as Ba,o as Be,q as nt,a as Ht,D as st,l as Ha}from"./reservationsService.CKGoK7pj.js";import{P as ht,l as bt,n as Nt,u as qt,o as yt,p as Ue,t as He,v as qa,x as Va,i as Oa,h as Ua,w as za,y as rt,z as ot,e as Vt,A as Ot,B as Wa,C as Ka}from"./controller.DRBerjxY.js";import{a as Ga}from"./calculations.CKpn67lB.js";let $t=null;function Ja(e){e&&Ut()!==e&&ut({[ht]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Ut(){return It()?.[ht]||""}function zt(e){e&&it()!==e&&ut({[bt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function it(){return It()?.[bt]||""}function Ya(e){if(!e)return"";const t=e.trim();return t?Object.values(Nt).includes(t)?t:Nt[t]||"":""}function Xa(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Ya(t);if(a)return a}}catch{}return""}function Wt(e,t){!e||!h.tabPanes||!h.tabButtons||(h.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),h.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Ja(e))}function Qa(){if(!h.tabButtons||!h.tabButtons.length)return;h.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Wt(r,a),r==="projects-section"&&(P.filters.search="",h.search&&(h.search.value=""),Te(),Ce(),ke()))}),a.dataset.tabListenerAttached="true")});const e=Ut(),t=e&&h.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function vt(e,t){!e||!h.projectSubTabButtons||!h.projectSubTabPanes||(h.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),h.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function Za(){!h.projectSubTabButtons||!h.projectSubTabButtons.length||(h.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(vt(a,e),zt(a))}),e.dataset.tabListenerAttached="true")}),en())}function en(){const t=Xa()||it();if(!t)return;const a=h.projectSubTabButtons?.[0],s=h.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==it()&&zt(r),vt(r,s))}function tn(){return h.tabButtons?h.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function Et(e={}){if(e){if(h.tabButtons&&h.tabButtons.length){const a=h.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[ht];if(s&&s!==a){const r=h.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Wt(s,r)}}if(h.projectSubTabButtons&&h.projectSubTabButtons.length&&tn()){const a=h.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[bt];if(s&&s!==a){const r=h.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&vt(s,r)}}}}function an(){$t||($t=ia(e=>{Et(e)})),ca().then(e=>{Et(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function ye(e){const t=P.projects.find(x=>String(x.id)===String(e));if(!t||!h.detailsBody)return;h.detailsBody.dataset.mode="view",h.detailsBody.dataset.projectId=String(t.id);const s=(P.customers.length?P.customers:Rt().customers||[]).find(x=>String(x.id)===String(t.clientId)),r=Yt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),u=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",m=c?v(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),d=s?.email??t.clientEmail??t.customerEmail??"",j=d?String(d).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),A=(t.clientCompany||s?.companyName||"").trim(),D=t.projectCode||`PRJ-${v(String(t.id))}`,B=v(D),C=pt(t.id),ne=C.reduce((x,$)=>x+Xt($),0),F=Number(ne.toFixed(2)),E=C.length,{subtotal:K,applyTax:oe,expensesTotal:Z}=ba(t),fe=Number(t?.servicesClientPrice??t?.services_client_price??0),De=K,we=oe?Number(((De+F)*He).toFixed(2)):0,xt=Number((De+F+we).toFixed(2)),ee=ya(t),he=n(`projects.status.${ee}`,qa[ee]||ee),ge=(()=>{try{const x=t.start?new Date(t.start):null,$=t.end?new Date(t.end):x?new Date(x.getTime()+3600*1e3):null;return!x||!$||Number.isNaN(x.getTime())||Number.isNaN($.getTime())?!1:P.projects.some(w=>{if(!w||String(w.id)===String(t.id))return!1;const q=w.start?new Date(w.start):null,_=w.end?new Date(w.end):q?new Date(q.getTime()+3600*1e3):null;if(!q||!_||Number.isNaN(q.getTime())||Number.isNaN(_.getTime()))return!1;const U=Math.max(x.getTime(),q.getTime()),se=Math.min($.getTime(),_.getTime());return U<se})}catch{return!1}})()&&ee!=="completed"?"conflict":ee,ie={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل",conflict:"تعارض"}[ge]||he,je={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed",conflict:"timeline-status-badge timeline-status-badge--conflict"}[ge]||"timeline-status-badge timeline-status-badge--upcoming",xe=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",Pe=fn(t),Se=Pe.length>0,Ae=Se?0:Number(t.paidAmount)||0,f=Se?0:Number(t.paidPercent)||0;let b=xt,y,g,N,k,M,H,R,te,O,X;const Ke=pn(Pe),Le=n("projects.focus.confirmed","✅ مشروع مؤكد"),Ne=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(Le)}</span>`:"";let I=[];if(E>0){const x=C.reduce((Ie,le)=>{const oa=Array.isArray(le.items)?le.items:[],Tt=Array.isArray(le.crewAssignments)?le.crewAssignments:[],be=Tt.length?Tt:Array.isArray(le.technicians)?le.technicians:[],tt=Ba({items:oa,technicianIds:Array.isArray(be)&&!be.length?be:[],crewAssignments:Array.isArray(be)&&be.length&&typeof be[0]=="object"?be:[],discount:le.discount??0,discountType:le.discountType||"percent",applyTax:!1,start:le.start,end:le.end,companySharePercent:null});return Ie.equipment+=Number(tt.equipmentTotal||0),Ie.crew+=Number(tt.crewTotal||0),Ie.crewCost+=Number(tt.crewCostTotal||0),Ie},{equipment:0,crew:0,crewCost:0}),$=Number(Z||0),w=Number((x.equipment+x.crew+fe).toFixed(2)),q=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let U=(t?.discountType==="amount"?"amount":"percent")==="amount"?q:w*(q/100);(!Number.isFinite(U)||U<0)&&(U=0),U>w&&(U=w);const se=oe===!0,me=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",V=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ce=me&&V>0?V:0,z=Math.max(0,w-U),Y=Number((z*(ce/100)).toFixed(2)),W=se?Number(((z+Y)*He).toFixed(2)):0,ue=Number((z+Y+W).toFixed(2)),ra=Number((ue-Y-W-$-x.crewCost).toFixed(2));x.equipment>0&&I.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:S(x.equipment)}),x.crew>0&&I.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:S(x.crew)}),x.crewCost>0&&I.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:S(x.crewCost)}),$>0&&I.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:S($)}),fe>0&&I.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:S(fe)}),U>0&&I.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${S(U)}`}),I.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:S(z)}),Y>0&&I.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${S(Y)}`}),W>0&&I.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${S(W)}`}),I.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:S(ra)}),I.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:S(ue)}),b=ue}else{const x=Number(Z||0),$=Math.max(0,Number(fe)||0),w=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let _=(t?.discountType==="amount"?"amount":"percent")==="amount"?w:$*(w/100);(!Number.isFinite(_)||_<0)&&(_=0),_>$&&(_=$);const U=Math.max(0,$-_),se=oe===!0,me=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",V=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ce=me&&V>0?V:0,z=Number((U*(ce/100)).toFixed(2)),Y=se?Number(((U+z)*He).toFixed(2)):0,W=Number((U+z+Y).toFixed(2)),ue=Number((W-z-Y-x).toFixed(2));I=[],I.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:S($)}),_>0&&I.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${S(_)}`}),I.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:S(U)}),z>0&&I.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${S(z)}`}),Y>0&&I.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${S(Y)}`}),I.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:S(ue)}),I.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:S(W)}),b=W}y=Be({totalAmount:b,paidAmount:Ae,paidPercent:f,history:Pe}),g=nt({manualStatus:xe||"unpaid",paidAmount:y.paidAmount,paidPercent:y.paidPercent,totalAmount:b}),N=n(`projects.paymentStatus.${g}`,g==="paid"?"Paid":g==="partial"?"Partial":"Unpaid"),k=g==="paid"?"status-paid":g==="partial"?"status-partial":"status-unpaid",M=Number.isFinite(Number(y.paidAmount))?Number(y.paidAmount):0,H=Number.isFinite(Number(y.paidPercent))?Number(y.paidPercent):0,R=Math.max(0,Number((b-M).toFixed(2))),te=S(M),O=`${v(H.toFixed(2))}%`,X=S(R);const Fe=I.map(({icon:x,label:$,value:w})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${x} ${o($)}</span>
      <span class="summary-details-value">${o(w)}</span>
    </div>
  `).join(""),Ge=n("projects.details.labels.code","رقم المشروع"),Je=`
    <div class="project-details-code-badge" title="${o(Ge)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Ge)}
      </span>
      <span class="project-details-code-badge__value">${o(B)}</span>
    </div>
  `,Ye=[{icon:"👤",label:n("projects.details.client","العميل"),value:u},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:m},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:j},A?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:A}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:`<span class="project-type-chip project-type-chip--${t.type||"default"}">${o(r)}</span>`},kt("start",t.start),kt("end",t.end)].filter(Boolean),Xe=n("projects.details.overview.heading","معلومات المشروع"),Qe=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Xe)}</h6>
      <ul class="project-details-outline__list">
        ${Ye.map(({icon:x,label:$,value:w,meta:q})=>{const _=String(w??""),se=_.trim().startsWith("<")?_:o(_),me=String(q??""),V=me?o(me):"";return`
          <li>
            <span class="project-details-outline__label">${o(x)} ${o($)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${se}</span>
              ${q?`<span class="project-details-outline__meta">${V}</span>`:""}
            </span>
          </li>
          `}).join("")}
      </ul>
    </div>
  `,Ze=E>0?n("projects.details.chips.linkedReservation","مربوط بحجز"):n("projects.details.chips.notLinkedReservation","غير مربوط بحجز"),$e=E>0?"reservation-chip status-confirmed":"reservation-chip status-info",Me=[`<span class="${je}">${o(ie)}</span>`,`<span class="${$e}">${o(Ze)}</span>`,`<span class="reservation-chip ${k}">${o(N)}</span>`,Ne].filter(Boolean).join("");n("projects.details.expensesTotal","تكلفة الخدمات الإنتاجية"),n("projects.details.reservationsTotal","إجمالي الحجوزات");const et=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",S(Z)),J=nn(Array.isArray(t.expenses)?t.expenses:[]);h.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${Me}</div>
        </div>
        <div class="project-details-header__code">
          ${Je}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${Qe}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card project-details-outline">
            <h6>${o(n("projects.details.summary.title","الملخص المالي"))}</h6>
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
      <h5>${o(et)}</h5>
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
          <strong>${o(O)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(X)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${Ke}
      </div>
    </section>
    ${va(t)}
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
  `,on(t);const pe=h.detailsBody.querySelector("#project-details-export-btn");pe&&pe.addEventListener("click",async x=>{if(x.preventDefault(),pe.blur(),!pe.disabled){pe.disabled=!0;try{await Va({project:t})}catch($){console.error("❌ [projects/details] export project PDF failed",$),L(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{pe.disabled=!1}}}),h.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(h.detailsModalEl).show()}function nn(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
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
  `}function sn({onOpenProject:e}){!h.focusCards||h.focusCards.dataset.listenerAttached==="true"||(h.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),ln(l);return}r==="view"?e?.(l):r==="highlight"&&rn(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),h.focusCards.dataset.listenerAttached="true")}function rn(e){if(!h.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=h.projectsTableBody.querySelector(t);if(!a){L(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function on(e){if(!h.detailsBody)return;const t=h.detailsBody.querySelector('[data-action="create-reservation"]'),a=h.detailsBody.querySelector('[data-action="edit-project"]'),s=h.detailsBody.querySelector('[data-action="delete-project"]'),r=h.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(pt(e.id)||[]).some(u=>{const c=String(u?.status||u?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ المشروع مربوط بحجز مسبقاً"),t.addEventListener("click",u=>{u.preventDefault(),L(n("projects.details.reservations.createDisabledToast","⚠️ المشروع مربوط بحجز مسبقاً"))})):(t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",u=>{u.preventDefault(),Ct(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),Ct(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),Kt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await ga(e.id),!P.projects.some(c=>String(c.id)===String(e.id))&&h.detailsModalEl&&window.bootstrap?.Modal.getInstance(h.detailsModalEl)?.hide()}finally{P.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const u=Ua("showReservationDetails");if(typeof u=="function")return u(i),!0;try{const c=await za("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const u=i.target.closest('[data-action="view-reservation"]');if(!u)return;const c=u.dataset.index||u.dataset.reservationIndex,m=Number.parseInt(c||"-1",10);if(!Number.isInteger(m)||m<0)return;await l(m)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const u=i.target.closest('[data-action="view-reservation"]');u&&(i.preventDefault(),u.click())})}}function Kt(e){if(!e||!h.detailsBody)return;const t=P.projects.find(d=>String(d.id)===String(e.id));if(!t)return;const a=P.customers.find(d=>String(d.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const s=Array.isArray(t.expenses)?t.expenses.map((d,j)=>({id:d?.id||`expense-${t.id}-${j}-${Date.now()}`,label:d?.label||"",amount:Number(d?.amount)||0,salePrice:Number.isFinite(Number(d?.sale_price??d?.salePrice))?Number(d?.sale_price??d?.salePrice):0})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((d,j)=>({type:d?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(d?.amount))?Number(d.amount):null,percentage:Number.isFinite(Number(d?.percentage))?Number(d.percentage):null,value:Number.isFinite(Number(d?.value))?Number(d.value):null,note:d?.note??null,recordedAt:d?.recordedAt??d?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${j}`})):[],l=r.reduce((d,j)=>d+(Number(j?.amount)||0),0),i=r.reduce((d,j)=>d+(Number(j?.percentage)||0),0),u=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,c=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(u>0||c>0)){const d=t.updatedAt??t.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(u)&&u>0?u:null,percentage:c,value:c,note:null,recordedAt:d,key:`legacy-payment-${t.id}-percent`}]:u>0&&(r=[{type:"amount",amount:u,percentage:null,value:u,note:null,recordedAt:d,key:`legacy-payment-${t.id}-amount`}]),l=r.reduce((j,A)=>j+(Number(A?.amount)||0),0),i=r.reduce((j,A)=>j+(Number(A?.percentage)||0),0),u=0,c=0}l>0&&Math.abs(u-l)<.01&&(u=0),i>0&&Math.abs(c-i)<.01&&(c=0);const m={expenses:s,payments:r,basePaidAmount:u,basePaidPercent:c};h.detailsBody.dataset.mode="edit",h.detailsBody.innerHTML=dn(t,m),cn(t,m)}function cn(e,t={expenses:[]}){const a=h.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",f=>{f.preventDefault(),ye(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),u=a.querySelector('[data-action="add-expense"]'),c=a.querySelector("#project-edit-expense-list"),m=a.querySelector('[name="project-start-date"]'),d=a.querySelector('[name="project-start-time"]'),j=a.querySelector('[name="project-end-date"]'),A=a.querySelector('[name="project-end-time"]'),D=a.querySelector('[name="project-payment-status"]'),B=a.querySelector("#project-edit-tax"),C=a.querySelector("#project-edit-company-share"),ne=a.querySelector("#project-edit-discount"),F=a.querySelector("#project-edit-discount-type"),E=a.querySelector("#project-edit-payment-progress-type"),K=a.querySelector("#project-edit-payment-progress-value"),oe=a.querySelector("#project-edit-payment-add"),Z=a.querySelector("#project-edit-payment-history"),fe=a.querySelector("#project-edit-payment-summary"),De=n("reservations.create.summary.currency","SR");let we=!1;(()=>{const f=(typeof window<"u"?window.flatpickr:null)||(typeof globalThis<"u"?globalThis.flatpickr:null);f&&(m&&f(m,{dateFormat:"Y-m-d",allowInput:!0}),j&&f(j,{dateFormat:"Y-m-d",allowInput:!0}),d&&f(d,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",altInput:!0,altFormat:"h:i K",time_24hr:!1,defaultHour:9,defaultMinute:0,minuteIncrement:5,disableMobile:!0,allowInput:!0,altInputClass:"flatpickr-alt-input form-control"}),A&&f(A,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",altInput:!0,altFormat:"h:i K",time_24hr:!1,defaultHour:9,defaultMinute:0,minuteIncrement:5,disableMobile:!0,allowInput:!0,altInputClass:"flatpickr-alt-input form-control"}))})();const ee=f=>{if(!f||f.dataset.normalizedDigits==="true")return;const b=()=>{const y=f.value||"",g=v(y);if(g!==y){const N=f.selectionStart,k=f.selectionEnd;f.value=g;try{if(typeof N=="number"&&typeof k=="number"){const M=g.length-y.length;f.setSelectionRange(Math.max(0,N+M),Math.max(0,k+M))}}catch{}}};f.addEventListener("input",b),f.addEventListener("blur",b);try{f.setAttribute("inputmode","numeric")}catch{}f.dataset.normalizedDigits="true"};ee(m),ee(d),ee(j),ee(A),d&&d._flatpickr?.altInput&&ee(d._flatpickr.altInput),A&&A._flatpickr?.altInput&&ee(A._flatpickr.altInput);const he=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),We=()=>{const f=Number(e.equipmentEstimate)||0,b=Array.isArray(t.expenses)?t.expenses.reduce((O,X)=>O+(Number(X.amount)||0),0):0,y=Array.isArray(t.expenses)?Math.max(0,Math.round(t.expenses.reduce((O,X)=>O+Number(X?.salePrice??0),0)*100)/100):Math.max(0,Number(e?.servicesClientPrice??0)),g=F?.value==="amount"?"amount":"percent",N=v(ne?.value||"0");let k=Number.parseFloat(N);(!Number.isFinite(k)||k<0)&&(k=0);const M=B?.checked===!0,H=C?.checked===!0;let R=H?Sa(C):null;(!Number.isFinite(R)||R<=0)&&(R=H?st:null);const te=Ta({equipmentEstimate:f,expensesTotal:b,servicesClientPrice:y,discountValue:k,discountType:g,applyTax:M,companyShareEnabled:H,companySharePercent:R});return{equipmentEstimate:f,expensesTotal:b,discountValue:k,discountTypeValue:g,applyTax:M,companyShareEnabled:H,companySharePercent:R,servicesClientPrice:y,finance:te}},ge=()=>{const f=We(),b=he(),g=(pt(e.id)||[]).reduce((R,te)=>R+(Number(te?.totalAmount)||Xt(te)||0),0),N=Number(f.finance?.taxableAmount||0),k=f.applyTax?Number(((N+g)*He).toFixed(2)):0,M=Number((N+g+k).toFixed(2)),H=Be({totalAmount:M,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:b});return{...f,combinedTotalWithTax:M,payments:b,progress:H}},St=()=>{Z&&(Z.innerHTML=mn(he()))},ie=()=>{if(!fe)return;const{combinedTotalWithTax:f,progress:b}=ge(),y=Number.isFinite(Number(f))?Number(f):0,g=Number.isFinite(Number(b.paidAmount))?Number(b.paidAmount):0,N=Number.isFinite(Number(b.paidPercent))?Number(b.paidPercent):0,k=Math.max(0,Math.round((y-g)*100)/100),M=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:S(y)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:S(g)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${v(N.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:S(k)}];fe.innerHTML=M.map(({label:H,value:R})=>`
        <div class="project-details-grid-item">
          <span>${o(H)}</span>
          <strong>${o(R)}</strong>
        </div>
      `).join("")},de=(f="auto")=>{if(!D)return;const b=D.dataset?.userSelected==="true";if(f==="auto"&&b)return;const{finance:y,progress:g}=ge(),N=nt({manualStatus:b?D.value:e.paymentStatus||"unpaid",paidAmount:g.paidAmount,paidPercent:g.paidPercent,totalAmount:y.totalWithTax});b||(D.value=N)},je=()=>{St(),ie(),de("auto")},xe=1e-4,Pe=()=>{const f=E?.value==="amount"?"amount":"percent",b=v(K?.value||"").replace("%","").trim();let y=Number.parseFloat(b);if(!Number.isFinite(y)||y<=0){L(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),K?.focus();return}const g=ge(),N=Number.isFinite(Number(g.finance.totalWithTax))?Number(g.finance.totalWithTax):0;if(N<=0){L(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const k=Number(g.progress.paidAmount)||0,M=Number(g.progress.paidPercent)||0;let H=null,R=null;if(f==="percent"){const O=Math.max(0,100-M);if(O<=xe){L(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>O){y=O;const X=v(y.toFixed(2));L(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",X))}R=Math.round(y*100)/100,N>0&&(H=Math.round(R/100*N*100)/100)}else{const O=Math.max(0,N-k);if(O<=xe){L(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(y>O){y=O;const X=`${v(y.toFixed(2))} ${De}`;L(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",X))}H=Math.round(y*100)/100,N>0&&(R=Math.round(H/N*100*100)/100)}const te={type:f,amount:H??null,percentage:R??null,value:f==="amount"?H:R,note:null,recordedAt:new Date().toISOString()};t.payments=[...he(),te],K&&(K.value=""),E&&(E.value="percent"),je(),L(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},Se=f=>{!B||!C||we||(we=!0,f==="share"?C.checked?(B.checked||(B.checked=!0),at(C)):B.checked&&(B.checked=!1):f==="tax"&&(B.checked?at(C):C.checked&&(C.checked=!1)),we=!1)};function Ae(){c&&(c.innerHTML=Gt(t.expenses))}Ae(),je(),ne&&!ne.dataset.listenerAttached&&(ne.addEventListener("input",f=>{const b=f.target;b instanceof HTMLInputElement&&(b.value=v(b.value||""),ie(),de("auto"))}),ne.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",f=>{const b=f.target;b instanceof HTMLInputElement&&(b.value=v(b.value||""))}),i.dataset.listenerAttached="true"),F&&!F.dataset.listenerAttached&&(F.addEventListener("change",()=>{ie(),de("auto")}),F.dataset.listenerAttached="true"),K&&!K.dataset.listenerAttached&&(K.addEventListener("input",f=>{const b=f.target;b instanceof HTMLInputElement&&(b.value=v(b.value||""))}),K.dataset.listenerAttached="true"),D&&!D.dataset.listenerAttached&&(D.addEventListener("change",()=>{D.dataset.userSelected="true"}),D.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",f=>{const b=f.target;b instanceof HTMLInputElement&&(b.value=v(b.value||""))}),l.dataset.listenerAttached="true"),C&&!C.dataset.listenerAttached&&(C.addEventListener("change",()=>{Se("share"),ie(),de("auto")}),C.dataset.listenerAttached="true"),B&&!B.dataset.listenerAttached&&(B.addEventListener("change",()=>{Se("tax"),ie(),de("auto")}),B.dataset.listenerAttached="true"),C?.checked&&at(C),Se(C?.checked?"share":"tax"),ie(),de("auto"),u&&u.addEventListener("click",f=>{f.preventDefault();const b=r?.value.trim()||"",y=v(l?.value||"0"),g=Number(y),N=v(i?.value||"0"),k=Number(N);if(!b){L(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(g)||g<=0){L(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:b,amount:g,salePrice:Number.isFinite(k)&&k>0?k:0}),r&&(r.value=""),l&&(l.value=""),i&&(i.value=""),Ae(),ie(),de("auto")}),c&&c.addEventListener("click",f=>{const b=f.target.closest('[data-action="remove-expense"]');if(!b)return;const{id:y}=b.dataset;t.expenses=t.expenses.filter(g=>String(g.id)!==String(y)),Ae(),ie(),de("auto")}),oe&&!oe.dataset.listenerAttached&&(oe.addEventListener("click",f=>{f.preventDefault(),Pe()}),oe.dataset.listenerAttached="true"),Z&&!Z.dataset.listenerAttached&&(Z.addEventListener("click",f=>{const b=f.target.closest('[data-action="remove-payment"]');if(!b)return;const y=Number.parseInt(b.dataset.index||"-1",10);if(!Number.isInteger(y)||y<0)return;const g=he();if(y>=g.length)return;const N=g.filter((k,M)=>M!==y);t.payments=N,je(),L(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),Z.dataset.listenerAttached="true"),a.addEventListener("submit",async f=>{if(f.preventDefault(),a.dataset.submitting==="true")return;const b=a.querySelector('[name="project-title"]'),y=a.querySelector('[name="project-type"]'),g=a.querySelector('[name="project-description"]'),N=b?.value.trim()||"",k=y?.value||"",M=v(m?.value.trim()||""),H=v(d?.value.trim()||""),R=g?.value.trim()||"",te=(D?.value||"unpaid").toLowerCase(),O=["paid","partial"].includes(te)?te:"unpaid";if(!N||!k||!M){L(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),b?.focus();return}const X=v(j?.value.trim()||""),Ke=v(A?.value.trim()||""),Le=At(M,H),Ne=X?At(X,Ke):"",I=new Date(Le),Fe=Ne?new Date(Ne):null;if(Fe&&I>Fe){L(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),j?.focus();return}if(P.projects.findIndex(V=>String(V.id)===String(e.id))===-1){L(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Je=We(),{equipmentEstimate:Ye,servicesClientPrice:Xe,discountValue:Qe,discountTypeValue:Ze,applyTax:$e,companyShareEnabled:Me,companySharePercent:et,finance:J}=Je,pe=E?.value==="amount"?"amount":"percent",x=v(K?.value||"");let $=x?Number.parseFloat(x):null,w=[...he()];if(Number.isFinite($)&&$>0&&Number.isFinite(Number(J.totalWithTax))){const V=Be({totalAmount:J.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:w}),ce=new Date().toISOString();if(pe==="percent"){const z=Math.max(0,100-(V.paidPercent||0));if(z>xe){const Y=Math.min($,z),W=Math.round(Y*100)/100,ue=J.totalWithTax>0?Math.round(W/100*J.totalWithTax*100)/100:null;w=[...w,{type:"percent",amount:ue,percentage:W,value:W,note:null,recordedAt:ce}]}}else{const z=Math.max(0,J.totalWithTax-(V.paidAmount||0));if(z>xe){const Y=Math.min($,z),W=Math.round(Y*100)/100,ue=J.totalWithTax>0?Math.round(W/J.totalWithTax*100*100)/100:null;w=[...w,{type:"amount",amount:W,percentage:ue,value:W,note:null,recordedAt:ce}]}}w!==t.payments&&(t.payments=w,je()),K&&(K.value=""),E&&(E.value="percent"),$=null}const q=Be({totalAmount:J.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:w}),_=D?.dataset?.userSelected==="true",U=nt({manualStatus:_?O:e.paymentStatus||O,paidAmount:q.paidAmount,paidPercent:q.paidPercent,totalAmount:J.totalWithTax}),se=_?O:U;!_&&D&&(D.value=se),D?.dataset&&delete D.dataset.userSelected,t.payments=w;const me=Oa({projectCode:e.projectCode,title:N,type:k,clientId:e.clientId,clientCompany:e.clientCompany,description:R,start:Le,end:Ne||null,applyTax:$e,paymentStatus:se,equipmentEstimate:Ye,expenses:t.expenses,servicesClientPrice:Xe,discount:Qe,discountType:Ze,companyShareEnabled:Me&&$e,companySharePercent:Me&&$e?et:null,companyShareAmount:J.companyShareAmount,taxAmount:J.taxAmount,totalWithTax:J.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:ja(e),paidAmount:q.paidAmount,paidPercentage:q.paidPercent,paymentProgressType:q.paymentProgressType,paymentProgressValue:q.paymentProgressValue,payments:w});a.dataset.submitting="true";try{const V=await qt(e.projectId??e.id,me),ce=V?.projectId??V?.id??e.id;await xa(ce,se),P.projects=yt(),P.reservations=ft(),L(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),Te(),Ce(),ke(),ye(e.id)}catch(V){console.error("❌ [projects] Failed to update project from details view",V);const ce=Ue(V)?V.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");L(ce,"error")}finally{delete a.dataset.submitting}})}function Ct(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description,fromProjectForm:!0,draftStorageKey:"projects:create:draft",returnUrl:`projects.html?project=${encodeURIComponent(e.id)}&linked=1#projects-section`};ut({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}h.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(h.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function ln(e){if(!e)return;const t=P.projects.find(a=>String(a.id)===String(e));if(!t){L(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){L(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await qt(t.projectId??t.id,{confirmed:!0});const a=await ha(e);P.projects=yt(),P.reservations=ft(),Te(),Ce(),ke(),h.detailsModalEl&&h.detailsModalEl.classList.contains("show")&&h.detailsBody?.dataset.projectId===String(e)&&ye(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),L(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=Ue(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");L(s,"error")}}function dn(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=Pt(e.start||""),{date:r,time:l}=Pt(e.end||""),i=e.applyTax===!0||e.applyTax==="true";typeof e.paymentStatus=="string"&&e.paymentStatus.toLowerCase();const u=e.discountType==="amount"?"amount":"percent",c=v(String(e.discount??e.discountValue??0));v(String(e.servicesClientPrice??e.services_client_price??0));const m=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??st,d=Number.parseFloat(v(String(m))),j=Number.isFinite(d)&&d>0?d:st,A=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(d)&&d>0;return`
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${o(n("projects.form.labels.title","عنوان المشروع"))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${o(e.title||"")}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${o(n("projects.form.labels.type","نوع المشروع"))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${un(e.type)}
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
  `}function un(e){return["commercial","coverage","photography","social"].map(a=>{const s=Yt(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(s)}</option>`}).join("")}function Gt(e=[]){if(!Array.isArray(e)||e.length===0){const i=o(n("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"));return`
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
    </div>`}function pn(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(S(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${v(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?v(mt(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(v(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function mn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(S(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${v(Number(a.percentage).toFixed(2))}%`:"—",u=a?.recordedAt?v(mt(a.recordedAt)):"—",c=a?.note?o(v(a.note)):"",m=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
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
  `}function fn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(hn).filter(Boolean);if(a.length>0)return a;const s=qe(e.paidPercent??e.paid_percent),r=qe(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Jt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function hn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=qe(e.amount??(a==="amount"?e.value:null)),r=qe(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,u=Jt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:u}}function qe(e){if(e==null||e==="")return null;const t=v(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Jt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function kt(e,t){if(!t)return null;const{date:a,time:s}=bn(mt(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية المشروع"):n("projects.details.labels.end","نهاية المشروع");return{icon:l,label:i,value:a,meta:s}}function bn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Yt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function Xt(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(v(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=Ht(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(v(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function gt(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function yn(){return gt(rt)}function vn(){return gt(ot)}function gn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[rt,ot,"linked"].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let m=!1;[rt,ot,"linked"].forEach(d=>{c.has(d)&&(c.delete(d),m=!0)}),m&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),u=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",u)}catch{}}function jn(){const e=yn(),t=vn(),a=gt("linked");e&&(P.pendingProjectDetailId=e),t&&(P.pendingProjectEditId=t,P.pendingProjectDetailId||(P.pendingProjectDetailId=t)),a!=null&&String(a)!==""&&String(a)!=="0"&&String(a).toLowerCase()!=="false"&&(P.pendingLinkedToast=!0),(e||t)&&gn()}function xn(){if(!P.pendingProjectDetailId)return;const e=P.pendingProjectDetailId,t=String(e),a=P.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;P.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(ye(s),P.pendingLinkedToast){P.pendingLinkedToast=!1;try{L(n("projects.toast.linkedReservationCreated","✅ تم ربط الحجز بالمشروع"))}catch{}}if(P.pendingProjectEditId!=null){const r=String(P.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&(P.pendingProjectEditId=null,setTimeout(()=>Kt(a),0))}}function Sn(){document.addEventListener("DOMContentLoaded",()=>{an(),jn(),wa(),_t(),Pa(),Qa(),Za(),Aa(),Na(),$a(),Ea(),Ca(),ka(),Da({onViewDetails:ye}),sn({onOpenProject:ye}),La(),Tn()}),document.addEventListener("language:changed",Dt),document.addEventListener("language:translationsReady",Dt),document.addEventListener("customers:changed",wn),document.addEventListener("technicians:updated",Pn),document.addEventListener("reservations:changed",()=>Fa(ye)),document.addEventListener(la.USER_UPDATED,()=>{Te()})}async function Tn(){try{await Vt({suppressError:!0}),await Ot()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");L(t,"error")}finally{Ma(),Oe(),Ia(),Bt(),Te(),ke(),Ce(),xn()}}function Dt(){Oe(),Bt(),Te(),ke(),Ce(),_t()}function wn(){Ra(),Oe()}function Pn(){_a(),Oe()}da();ua();pa();Wa();Sn();document.addEventListener("DOMContentLoaded",()=>{fa(),ma()});const ct=.15,Re={},An="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let Ee=0;const T={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},_e=Object.freeze({projects:`
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
  `});let Q=null;const Qt=["upcoming","ongoing","completed"];async function Nn({forceProjects:e=!1}={}){try{await Vt({suppressError:!0}),await Ka({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),Ue(t)&&console.warn("Projects API error:",t.message)}aa()}async function $n(){kn(),ea(),await En();try{await Nn({forceProjects:!0}),sa(),Rn(),re()}finally{ta()}document.addEventListener("language:changed",Bn),document.addEventListener("projects:changed",()=>{lt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{lt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",Hn)}document.addEventListener("DOMContentLoaded",$n);async function En(){if(Q)return Q;if(typeof window>"u")return null;if(window.ApexCharts)return Q=window.ApexCharts,Q;try{await Cn(An),Q=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),Q=null}return Q}function Cn(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function kn(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function Zt(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function ea(){Ee+=1,Ee===1&&Zt(!0)}function ta(){Ee=Math.max(0,Ee-1),Ee===0&&Zt(!1)}function aa(){const{customers:e=[]}=Rt();T.customers=Array.isArray(e)?e:[],T.reservations=ft();const t=new Map(T.customers.map(s=>[String(s.id),s])),a=yt();T.projects=Array.isArray(a)?a.map(s=>Dn(s,t)):[],T.totalProjects=T.projects.length}function Dn(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=Ln(e.id),l=r.reduce((ne,F)=>ne+Fn(F),0),i=Mn(e),u=Number(e?.equipmentEstimate)||0,c=Number((u+i).toFixed(2)),m=e?.applyTax===!0||e?.applyTax==="true",d=m?Number((c*ct).toFixed(2)):0,j=m?Number(((c+l)*ct).toFixed(2)):0,A=Number((c+l+j).toFixed(2)),D=In(e),B=e.start?new Date(e.start):null,C=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:B,end:C,applyTax:m,status:D,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:d,combinedTaxAmount:j,overallTotal:A,unpaidValue:a==="paid"?0:A,reservationsCount:r.length}}function Ln(e){return Array.isArray(T.reservations)?T.reservations.filter(t=>String(t.projectId)===String(e)):[]}function Fn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(v(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=Ht(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(v(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Mn(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function In(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function Rn(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{T.filters.search=p.search.value.trim(),re()},180)})}p.payment&&(p.payment.value=T.filters.payment,p.payment.addEventListener("change",()=>{T.filters.payment=p.payment.value||"all",re()})),p.dateRange&&(p.dateRange.addEventListener("change",_n),p.dateRange.value=T.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{T.filters.startDate=p.startDate.value,T.filters.range==="custom"&&re()}),p.endDate&&p.endDate.addEventListener("change",()=>{T.filters.endDate=p.endDate.value,T.filters.range==="custom"&&re()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(T.filters.range!=="custom"){re();return}T.filters.startDate=p.startDate?.value||"",T.filters.endDate=p.endDate?.value||"",re()})}function _n(e){const t=e.target.value;T.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),T.filters.startDate="",T.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),re())}async function lt(){ea();try{await Promise.all([Ot(),Ha()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),Ue(e)&&console.warn("Projects API error:",e.message)}finally{aa(),re(),ta()}}function Bn(){sa(),re()}function Hn(e){e.key&&!["projects","reservations","customers"].includes(e.key)||lt().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function re(){const e=qn();jt(),Un(e),Gn(e),Jn(e),Yn(e),Xn(e),Qn(e)}function qn(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=T.filters,i=na(e),u=new Date,c=Number(s);let m=null;if(s==="custom"){m=r?new Date(r):null;const d=l?new Date(l):null;return T.projects.filter(j=>!Lt(j,t)||!Ft(j,a)||!Mt(j,i)?!1:On(j.start,m,d))}return s!=="all"&&Number.isFinite(c)&&(m=new Date,m.setDate(u.getDate()-c)),T.projects.filter(d=>!Lt(d,t)||!Ft(d,a)||!Mt(d,i)?!1:s==="all"?!0:Vn(d.start,m,u))}function Lt(e,t){return t.includes(e.status)}function Ft(e,t){return t==="all"?!0:e.paymentStatus===t}function Mt(e,t){return t?na([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function Vn(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function On(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function na(e){return e?v(String(e)).toLowerCase().trim():""}function Un(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((i,u)=>i+u.overallTotal,0),s=e.reduce((i,u)=>i+u.unpaidValue,0),r=e.reduce((i,u)=>i+u.expensesTotal,0),l=[{icon:_e.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:dt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:_e.value,label:n("projects.reports.kpi.totalValue","Total value"),value:ae(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:_e.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:ae(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:_e.expenses,label:n("projects.reports.kpi.expenses","تكلفة الخدمات الإنتاجية"),value:ae(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];p.kpiGrid.innerHTML=l.map(({icon:i,label:u,value:c,meta:m})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${G(u)}</p>
        <p class="reports-kpi-value">${G(c)}</p>
        <span class="reports-kpi-meta">${G(m)}</span>
      </div>
    </div>
  `).join(""),zn(e)}function zn(e){try{const t=Wn(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:ae(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:ae(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:ae(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:ae(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:ae(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:ae(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","تكلفة الخدمات الإنتاجية","Project expenses"),value:`−${ae(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:ae(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:u})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${G(i)}</span>
            <span class="reports-kpi-detail-value">${G(u)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:p.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function Wn(e){const t=new Set(e.map(F=>String(F.id))),a=T.reservations.filter(F=>F.projectId!=null&&t.has(String(F.projectId)));let s=0,r=0,l=0,i=0,u=0,c=0,m=0;a.forEach(F=>{const E=Ga(F);s+=E.finalTotal||0,r+=E.equipmentTotal||0,l+=E.crewTotal||0,i+=E.crewCostTotal||0,u+=E.companyShareAmount||0,c+=E.taxAmount||0,m+=E.netProfit||0});const d=e.reduce((F,E)=>F+(Number(E.expensesTotal)||0),0),j=e.reduce((F,E)=>F+(Number(E.raw?.equipmentEstimate)||0),0),A=e.reduce((F,E)=>{const K=E.applyTax===!0,oe=(Number(E.raw?.equipmentEstimate)||0)+(Number(E.expensesTotal)||0),Z=K?oe*ct:0;return F+Z},0),D=s+j+A,B=r+j,C=c+A,ne=m-d;return{grossRevenue:D,companyShareTotal:u,taxTotal:C,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:B,projectExpensesTotal:d,netProfit:ne}}function sa(){if(!p.statusChips)return;const e=Qt.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${G(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",Kn),p.statusChips.dataset.listenerAttached="true"),jt()}function Kn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(T.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&Qt.forEach(r=>s.add(r)),T.filters.statuses=Array.from(s),jt(),re()}function jt(){if(!p.statusChips)return;const e=new Set(T.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Gn(e){if(!Q)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(m=>m.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,m)=>c+m,0)>0?s:[],u={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>ve(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};ze("status",t,u)}function Jn(e){if(!Q)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(es(),{month:"short",year:"numeric"});e.forEach(d=>{if(!d.start||Number.isNaN(d.start.getTime()))return;const j=`${d.start.getFullYear()}-${d.start.getMonth()+1}`,A=a.get(j)||{total:0,label:s.format(d.start)};A.total+=d.overallTotal,a.set(j,A)});const l=Array.from(a.keys()).sort((d,j)=>{const[A,D]=d.split("-").map(Number),[B,C]=j.split("-").map(Number);return A===B?D-C:A-B}).slice(-12),i=l.map(d=>a.get(d)?.label||d),u=l.map(d=>Math.round(a.get(d)?.total||0)),c=u.length?[{name:n("projects.reports.datasets.value","Total value"),data:u}]:[],m={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:d=>ve(d)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:d=>ve(d)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};ze("timeline",t,m)}function Yn(e){if(!Q)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((m,d)=>d.overallTotal-m.overallTotal).slice(0,6),s=a.map(m=>m.title||m.projectCode),r=a.map(m=>Math.round(m.overallTotal)),l=a.map(m=>Math.round(m.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","تكلفة الخدمات الإنتاجية"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:m=>ve(m)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:m=>ve(m)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};ze("expenses",t,c)}function Xn(e){if(!Q)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const m=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),d=a.get(m)||0;a.set(m,d+c.overallTotal)});const s=Array.from(a.entries()).sort((c,m)=>m[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],u={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>ve(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>ve(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};ze("clients",t,u)}function ze(e,t,a={}){if(!Q||!t)return;if(Re[e]){try{Re[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete Re[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new Q(t,s);Re[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function Qn(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=Zn(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${G(a.clientName)} <small class="text-muted">${G(a.clientCompany)}</small>`:G(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
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
        <td>${G(ae(a.overallTotal))}</td>
        <td>${G(l)}</td>
      </tr>
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",dt(e.length)).replace("{total}",dt(T.totalProjects))}}function Zn(e,t){if(!e&&!t)return"—";const a=e?wt(e.toISOString()):"—",s=t?wt(t.toISOString()):"—";return t?`${a} → ${s}`:a}function ae(e){const t=Number(e)||0,s=Ve()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${v(r)} SR`}function dt(e){const a=Ve()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return v(new Intl.NumberFormat(a).format(e))}function ve(e){const a=Ve()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return v(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function es(){return Ve()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function G(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
