import{s as ca,f as la,e as _t,u as ft,j as M,t as n,d as Bt,n as j,q as da,a as ua,m as pa,c as ma,i as fa,v as At,p as Oe}from"./auth.nraNoQb5.js";import{i as ha}from"./dashboardShell.Br-4FT3a.js";import{d as b,r as we,a as De,u as Fe,s as $,b as ba,f as ht,h as ya,i as va,j as o,k as P,l as ga,m as bt,n as ja,o as $t,e as rt,p as Nt,q as xa,t as Sa,v as wa,w as Ta,g as Pa,c as Aa,x as $a,y as Ht,z as Na,A as Ea,B as Ca,C as ka,D as La,E as Da,F as Fa,G as Ia,H as Ma,I as Ra,J as _a,K as Ue,L as Ba,M as qt,N as Ha,O as qa}from"./form.C4dNjtSN.js";import"./customers.Cf1Xu-I3.js";import"./state.QEOaSBGz.js";import{e as Va,r as Oa}from"./controller.K3Ru3H-v.js";import{e as Vt}from"./reservationsActions.DwYVwycF.js";import{updateProjectApi as Ot,getProjectsState as yt,isApiError as ze,buildProjectPayload as Ua,refreshProjectsFromApi as Ut,ensureProjectsLoaded as za}from"./projectsService.D_ZSNbGY.js";import{P as vt,a as gt,b as Et,c as He,s as Wa,d as ot,e as it}from"./constants.BLFGbVnJ.js";import{g as jt,f as Ka,c as qe,d as ct,e as zt,D as lt,r as Ga}from"./reservationsService.BDW4iqny.js";import{g as Ja,w as Ya}from"./uiBridge.Dv6JMAlF.js";import{c as Xa}from"./calculations.Bcbcy81a.js";import"./details.BXEr0xb3.js";import"./equipment.Bc_ULOIF.js";import"./quotePdf.C2lQPEPC.js";import"./canvasColorUtils.CviLtv6S.js";let Ct=null;function Qa(e){e&&Wt()!==e&&ft({[vt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Wt(){return _t()?.[vt]||""}function Kt(e){e&&dt()!==e&&ft({[gt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function dt(){return _t()?.[gt]||""}function Za(e){if(!e)return"";const t=e.trim();return t?Object.values(Et).includes(t)?t:Et[t]||"":""}function en(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=Za(t);if(a)return a}}catch{}return""}function Gt(e,t){!e||!b.tabPanes||!b.tabButtons||(b.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),b.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&Qa(e))}function tn(){if(!b.tabButtons||!b.tabButtons.length)return;b.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Gt(r,a),r==="projects-section"&&($.filters.search="",b.search&&(b.search.value=""),we(),De(),Fe()))}),a.dataset.tabListenerAttached="true")});const e=Wt(),t=e&&b.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function xt(e,t){!e||!b.projectSubTabButtons||!b.projectSubTabPanes||(b.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),b.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function an(){!b.projectSubTabButtons||!b.projectSubTabButtons.length||(b.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(xt(a,e),Kt(a))}),e.dataset.tabListenerAttached="true")}),nn())}function nn(){const t=en()||dt();if(!t)return;const a=b.projectSubTabButtons?.[0],s=b.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==dt()&&Kt(r),xt(r,s))}function sn(){return b.tabButtons?b.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function kt(e={}){if(e){if(b.tabButtons&&b.tabButtons.length){const a=b.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[vt];if(s&&s!==a){const r=b.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Gt(s,r)}}if(b.projectSubTabButtons&&b.projectSubTabButtons.length&&sn()){const a=b.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[gt];if(s&&s!==a){const r=b.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&xt(s,r)}}}}function rn(){Ct||(Ct=ca(e=>{kt(e)})),la().then(e=>{kt(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function ge(e){const t=$.projects.find(w=>String(w.id)===String(e));if(!t||!b.detailsBody)return;b.detailsBody.dataset.mode="view",b.detailsBody.dataset.projectId=String(t.id);const s=($.customers.length?$.customers:Bt().customers||[]).find(w=>String(w.id)===String(t.clientId)),r=Qt(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),u=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",f=c?j(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),d=s?.email??t.clientEmail??t.customerEmail??"",y=d?String(d).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),x=(t.clientCompany||s?.companyName||"").trim(),z=t.projectCode||`PRJ-${j(String(t.id))}`,N=j(z),R=ht(t.id),_=R.reduce((w,D)=>w+Zt(D),0),B=Number(_.toFixed(2)),k=R.length,{subtotal:re,applyTax:J,expensesTotal:oe}=ya(t),te=Number(t?.servicesClientPrice??t?.services_client_price??0),Te=re,Ke=J?Number(((Te+B)*He).toFixed(2)):0,Ge=Number((Te+B+Ke).toFixed(2)),Pe=va(t),be=t?.cancelled===!0||t?.status==="cancelled"||t?.status==="canceled"?"cancelled":Pe,me=n(`projects.status.${be}`,Wa[be]||be),Ae=(()=>{try{const w=t.start?new Date(t.start):null,D=t.end?new Date(t.end):w?new Date(w.getTime()+3600*1e3):null;return!w||!D||Number.isNaN(w.getTime())||Number.isNaN(D.getTime())?!1:$.projects.some(F=>{if(!F||String(F.id)===String(t.id))return!1;const H=F.start?new Date(F.start):null,I=F.end?new Date(F.end):H?new Date(H.getTime()+3600*1e3):null;if(!H||!I||Number.isNaN(H.getTime())||Number.isNaN(I.getTime()))return!1;const U=Math.max(w.getTime(),H.getTime()),de=Math.min(D.getTime(),I.getTime());return U<de})}catch{return!1}})()&&(be==="upcoming"||be==="ongoing")?"conflict":be,Je={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل",conflict:"تعارض"}[Ae]||me,ae={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed",conflict:"timeline-status-badge timeline-status-badge--conflict",cancelled:"timeline-status-badge timeline-status-badge--cancelled"}[Ae]||"timeline-status-badge timeline-status-badge--upcoming",Se=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",fe=yn(t),Me=fe.length>0,$e=Me?0:Number(t.paidAmount)||0,Ne=Me?0:Number(t.paidPercent)||0;let m=Ge,h,v,g,S,T,E,L,V,Q,G;const Z=hn(fe),Ye=n("projects.focus.confirmed","✅ مشروع مؤكد"),Ee=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(Ye)}</span>`:"";let C=[];if(k>0){const w=R.reduce((he,le)=>{const ia=Array.isArray(le.items)?le.items:[],Pt=Array.isArray(le.crewAssignments)?le.crewAssignments:[],ve=Pt.length?Pt:Array.isArray(le.technicians)?le.technicians:[],st=Ka({items:ia,technicianIds:Array.isArray(ve)&&!ve.length?ve:[],crewAssignments:Array.isArray(ve)&&ve.length&&typeof ve[0]=="object"?ve:[],discount:le.discount??0,discountType:le.discountType||"percent",applyTax:!1,start:le.start,end:le.end,companySharePercent:null});return he.equipment+=Number(st.equipmentTotal||0),he.crew+=Number(st.crewTotal||0),he.crewCost+=Number(st.crewCostTotal||0),he},{equipment:0,crew:0,crewCost:0}),D=Number(oe||0),F=Number((w.equipment+w.crew+te).toFixed(2)),H=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let U=(t?.discountType==="amount"?"amount":"percent")==="amount"?H:F*(H/100);(!Number.isFinite(U)||U<0)&&(U=0),U>F&&(U=F);const de=J===!0,ce=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",ne=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ye=ce&&ne>0?ne:0,q=Math.max(0,F-U),K=Number((q*(ye/100)).toFixed(2)),O=de?Number(((q+K)*He).toFixed(2)):0,ue=Number((q+K+O).toFixed(2)),pe=Number((ue-K-O-D-w.crewCost).toFixed(2));w.equipment>0&&C.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:P(w.equipment)}),w.crew>0&&C.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:P(w.crew)}),w.crewCost>0&&C.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:P(w.crewCost)}),D>0&&C.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:P(D)}),te>0&&C.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:P(te)}),U>0&&C.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${P(U)}`}),C.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:P(q)}),K>0&&C.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${P(K)}`}),O>0&&C.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${P(O)}`}),C.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:P(pe)}),C.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:P(ue)}),m=ue}else{const w=Number(oe||0),D=Math.max(0,Number(te)||0),F=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let I=(t?.discountType==="amount"?"amount":"percent")==="amount"?F:D*(F/100);(!Number.isFinite(I)||I<0)&&(I=0),I>D&&(I=D);const U=Math.max(0,D-I),de=J===!0,ce=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",ne=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ye=ce&&ne>0?ne:0,q=Number((U*(ye/100)).toFixed(2)),K=de?Number(((U+q)*He).toFixed(2)):0,O=Number((U+q+K).toFixed(2)),ue=Number((O-q-K-w).toFixed(2));C=[],C.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:P(D)}),I>0&&C.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${P(I)}`}),C.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:P(U)}),q>0&&C.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${P(q)}`}),K>0&&C.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${P(K)}`}),C.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:P(ue)}),C.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:P(O)}),m=O}h=qe({totalAmount:m,paidAmount:$e,paidPercent:Ne,history:fe}),v=ct({manualStatus:Se||"unpaid",paidAmount:h.paidAmount,paidPercent:h.paidPercent,totalAmount:m}),g=n(`projects.paymentStatus.${v}`,v==="paid"?"Paid":v==="partial"?"Partial":"Unpaid"),S=v==="paid"?"status-paid":v==="partial"?"status-partial":"status-unpaid",T=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,E=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,L=Math.max(0,Number((m-T).toFixed(2))),V=P(T),Q=`${j(E.toFixed(2))}%`,G=P(L);const Xe=C.map(({icon:w,label:D,value:F})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${w} ${o(D)}</span>
      <span class="summary-details-value">${o(F)}</span>
    </div>
  `).join(""),Ce=n("projects.details.labels.code","رقم المشروع"),Tt=`
    <div class="project-details-code-badge" title="${o(Ce)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Ce)}
      </span>
      <span class="project-details-code-badge__value">${o(N)}</span>
    </div>
  `,Qe=[{icon:"👤",label:n("projects.details.client","العميل"),value:u},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:f},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:y},x?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:x}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:`<span class="project-type-chip project-type-chip--${t.type||"default"}">${o(r)}</span>`},Dt("start",t.start),Dt("end",t.end)].filter(Boolean),Ze=n("projects.details.overview.heading","معلومات المشروع"),et=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(Ze)}</h6>
      <ul class="project-details-outline__list">
        ${Qe.map(({icon:w,label:D,value:F,meta:H})=>{const I=String(F??""),de=I.trim().startsWith("<")?I:o(I),ce=String(H??""),ne=ce?o(ce):"";return`
          <li>
            <span class="project-details-outline__label">${o(w)} ${o(D)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${de}</span>
              ${H?`<span class="project-details-outline__meta">${ne}</span>`:""}
            </span>
          </li>
          `}).join("")}
      </ul>
    </div>
  `,tt=k>0?n("projects.details.chips.linkedReservation","مربوط بحجز"):n("projects.details.chips.notLinkedReservation","غير مربوط بحجز"),at=k>0?"reservation-chip status-confirmed":"reservation-chip status-info",ke=[`<span class="${ae}">${o(Je)}</span>`,`<span class="${at}">${o(tt)}</span>`,`<span class="reservation-chip ${S}">${o(g)}</span>`,Ee].filter(Boolean).join("");n("projects.details.expensesTotal","تكلفة الخدمات الإنتاجية"),n("projects.details.reservationsTotal","إجمالي الحجوزات");const Re=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",P(oe)),nt=on(Array.isArray(t.expenses)?t.expenses:[]);b.detailsBody.innerHTML=`
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
          <strong>${o(P(m))}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.paid","المدفوع"))}</span>
          <strong>${o(V)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(Q)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(G)}</strong>
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
  `,dn(t);const W=b.detailsBody.querySelector("#project-details-export-btn");W&&W.addEventListener("click",async w=>{if(w.preventDefault(),W.blur(),!W.disabled){W.disabled=!0;try{await Va({project:t})}catch(D){console.error("❌ [projects/details] export project PDF failed",D),M(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{W.disabled=!1}}}),b.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(b.detailsModalEl).show()}function on(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
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
    `}const a=e.map(s=>{const r=o(s?.label||""),l=P(Number(s?.amount)||0),i=P(Number(s?.sale_price??s?.salePrice??0)),u=s?.note!=null?String(s.note):s?.notes!=null?String(s.notes):"";return`
      <tr>
        <td>${r}</td>
        <td>${o(l)}</td>
        <td>${o(i)}</td>
        <td>${o(u||"—")}</td>
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
  `}function cn({onOpenProject:e}){!b.focusCards||b.focusCards.dataset.listenerAttached==="true"||(b.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),pn(l);return}r==="view"?e?.(l):r==="highlight"&&ln(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),b.focusCards.dataset.listenerAttached="true")}function ln(e){if(!b.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=b.projectsTableBody.querySelector(t);if(!a){M(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function dn(e){if(!b.detailsBody)return;const t=b.detailsBody.querySelector('[data-action="create-reservation"]'),a=b.detailsBody.querySelector('[data-action="edit-project"]'),s=b.detailsBody.querySelector('[data-action="delete-project"]'),r=b.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(ht(e.id)||[]).some(u=>{const c=String(u?.status||u?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ المشروع مربوط بحجز مسبقاً"),t.addEventListener("click",u=>{u.preventDefault(),M(n("projects.details.reservations.createDisabledToast","⚠️ المشروع مربوط بحجز مسبقاً"))})):(t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",u=>{u.preventDefault(),Lt(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),Lt(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),Jt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await ja(e.id),!$.projects.some(c=>String(c.id)===String(e.id))&&b.detailsModalEl&&window.bootstrap?.Modal.getInstance(b.detailsModalEl)?.hide()}finally{$.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const u=Ja("showReservationDetails");if(typeof u=="function")return u(i),!0;try{const c=await Ya("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const u=i.target.closest('[data-action="view-reservation"]');if(!u)return;const c=u.dataset.index||u.dataset.reservationIndex,f=Number.parseInt(c||"-1",10);if(!Number.isInteger(f)||f<0)return;await l(f)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const u=i.target.closest('[data-action="view-reservation"]');u&&(i.preventDefault(),u.click())})}}function Jt(e){if(!e||!b.detailsBody)return;const t=$.projects.find(d=>String(d.id)===String(e.id));if(!t)return;const a=$.customers.find(d=>String(d.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const s=Array.isArray(t.expenses)?t.expenses.map((d,y)=>({id:d?.id||`expense-${t.id}-${y}-${Date.now()}`,label:d?.label||"",amount:Number(d?.amount)||0,salePrice:Number.isFinite(Number(d?.sale_price??d?.salePrice))?Number(d?.sale_price??d?.salePrice):0,note:d?.note!=null?String(d.note):d?.notes!=null?String(d.notes):""})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((d,y)=>({type:d?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(d?.amount))?Number(d.amount):null,percentage:Number.isFinite(Number(d?.percentage))?Number(d.percentage):null,value:Number.isFinite(Number(d?.value))?Number(d.value):null,note:d?.note??null,recordedAt:d?.recordedAt??d?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${y}`})):[],l=r.reduce((d,y)=>d+(Number(y?.amount)||0),0),i=r.reduce((d,y)=>d+(Number(y?.percentage)||0),0),u=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,c=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(u>0||c>0)){const d=t.updatedAt??t.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(u)&&u>0?u:null,percentage:c,value:c,note:null,recordedAt:d,key:`legacy-payment-${t.id}-percent`}]:u>0&&(r=[{type:"amount",amount:u,percentage:null,value:u,note:null,recordedAt:d,key:`legacy-payment-${t.id}-amount`}]),l=r.reduce((y,x)=>y+(Number(x?.amount)||0),0),i=r.reduce((y,x)=>y+(Number(x?.percentage)||0),0),u=0,c=0}l>0&&Math.abs(u-l)<.01&&(u=0),i>0&&Math.abs(c-i)<.01&&(c=0);const f={expenses:s,payments:r,basePaidAmount:u,basePaidPercent:c};b.detailsBody.dataset.mode="edit",b.detailsBody.innerHTML=mn(t,f),un(t,f)}function un(e,t={expenses:[]}){const a=b.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",m=>{m.preventDefault(),ge(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),u=a.querySelector("#project-edit-expense-note"),c=a.querySelector('[data-action="add-expense"]'),f=a.querySelector("#project-edit-expense-list"),d=a.querySelector('[name="project-start-date"]'),y=a.querySelector('[name="project-start-time"]'),x=a.querySelector('[name="project-end-date"]'),z=a.querySelector('[name="project-end-time"]'),N=a.querySelector('[name="project-payment-status"]'),R=a.querySelector("#project-edit-tax"),_=a.querySelector("#project-edit-company-share"),B=a.querySelector("#project-edit-discount"),k=a.querySelector("#project-edit-discount-type"),re=a.querySelector("#project-edit-payment-progress-type"),J=a.querySelector("#project-edit-payment-progress-value"),oe=a.querySelector("#project-edit-payment-add"),te=a.querySelector("#project-edit-payment-history"),Te=a.querySelector("#project-edit-payment-summary"),Ke=n("reservations.create.summary.currency","SR"),Ge=a.querySelector("#project-cancelled");let Pe=!1;(()=>{const m=(typeof window<"u"?window.flatpickr:null)||(typeof globalThis<"u"?globalThis.flatpickr:null);m&&(d&&m(d,{dateFormat:"Y-m-d",allowInput:!0}),x&&m(x,{dateFormat:"Y-m-d",allowInput:!0}),y&&m(y,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",altInput:!0,altFormat:"h:i K",time_24hr:!1,defaultHour:9,defaultMinute:0,minuteIncrement:5,disableMobile:!0,allowInput:!0,altInputClass:"flatpickr-alt-input form-control"}),z&&m(z,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",altInput:!0,altFormat:"h:i K",time_24hr:!1,defaultHour:9,defaultMinute:0,minuteIncrement:5,disableMobile:!0,allowInput:!0,altInputClass:"flatpickr-alt-input form-control"}))})();const me=m=>{if(!m||m.dataset.normalizedDigits==="true")return;const h=()=>{const v=m.value||"",g=j(v);if(g!==v){const S=m.selectionStart,T=m.selectionEnd;m.value=g;try{if(typeof S=="number"&&typeof T=="number"){const E=g.length-v.length;m.setSelectionRange(Math.max(0,S+E),Math.max(0,T+E))}}catch{}}};m.addEventListener("input",h),m.addEventListener("blur",h);try{m.setAttribute("inputmode","numeric")}catch{}m.dataset.normalizedDigits="true"};me(d),me(y),me(x),me(z),y&&y._flatpickr?.altInput&&me(y._flatpickr.altInput),z&&z._flatpickr?.altInput&&me(z._flatpickr.altInput);const xe=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),Ae=()=>{const m=Number(e.equipmentEstimate)||0,h=Array.isArray(t.expenses)?t.expenses.reduce((G,Z)=>G+(Number(Z.amount)||0),0):0,v=Array.isArray(t.expenses)?Math.max(0,Math.round(t.expenses.reduce((G,Z)=>G+Number(Z?.salePrice??0),0)*100)/100):Math.max(0,Number(e?.servicesClientPrice??0)),g=k?.value==="amount"?"amount":"percent",S=j(B?.value||"0");let T=Number.parseFloat(S);(!Number.isFinite(T)||T<0)&&(T=0);const E=R?.checked===!0,L=_?.checked===!0;let V=L?Pa(_):null;(!Number.isFinite(V)||V<=0)&&(V=L?lt:null);const Q=Aa({equipmentEstimate:m,expensesTotal:h,servicesClientPrice:v,discountValue:T,discountType:g,applyTax:E,companyShareEnabled:L,companySharePercent:V});return{equipmentEstimate:m,expensesTotal:h,discountValue:T,discountTypeValue:g,applyTax:E,companyShareEnabled:L,companySharePercent:V,servicesClientPrice:v,finance:Q}},Ie=()=>{const m=Ae(),h=xe(),g=(ht(e.id)||[]).reduce((V,Q)=>V+(Number(Q?.totalAmount)||Zt(Q)||0),0),S=Number(m.finance?.taxableAmount||0),T=m.applyTax?Number(((S+g)*He).toFixed(2)):0,E=Number((S+g+T).toFixed(2)),L=qe({totalAmount:E,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:h});return{...m,combinedTotalWithTax:E,payments:h,progress:L}},Je=()=>{te&&(te.innerHTML=bn(xe()))},ie=()=>{if(!Te)return;const{combinedTotalWithTax:m,progress:h}=Ie(),v=Number.isFinite(Number(m))?Number(m):0,g=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,S=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,T=Math.max(0,Math.round((v-g)*100)/100),E=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:P(v)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:P(g)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${j(S.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:P(T)}];Te.innerHTML=E.map(({label:L,value:V})=>`
        <div class="project-details-grid-item">
          <span>${o(L)}</span>
          <strong>${o(V)}</strong>
        </div>
      `).join("")},ae=(m="auto")=>{if(!N)return;const h=N.dataset?.userSelected==="true";if(m==="auto"&&h)return;const{finance:v,progress:g}=Ie(),S=ct({manualStatus:h?N.value:e.paymentStatus||"unpaid",paidAmount:g.paidAmount,paidPercent:g.paidPercent,totalAmount:v.totalWithTax});h||(N.value=S)},Se=()=>{Je(),ie(),ae("auto")},fe=1e-4,Me=()=>{const m=re?.value==="amount"?"amount":"percent",h=j(J?.value||"").replace("%","").trim();let v=Number.parseFloat(h);if(!Number.isFinite(v)||v<=0){M(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),J?.focus();return}const g=Ie(),S=Number.isFinite(Number(g.finance.totalWithTax))?Number(g.finance.totalWithTax):0;if(S<=0){M(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const T=Number(g.progress.paidAmount)||0,E=Number(g.progress.paidPercent)||0;let L=null,V=null;if(m==="percent"){const G=Math.max(0,100-E);if(G<=fe){M(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(v>G){v=G;const Z=j(v.toFixed(2));M(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",Z))}V=Math.round(v*100)/100,S>0&&(L=Math.round(V/100*S*100)/100)}else{const G=Math.max(0,S-T);if(G<=fe){M(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(v>G){v=G;const Z=`${j(v.toFixed(2))} ${Ke}`;M(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",Z))}L=Math.round(v*100)/100,S>0&&(V=Math.round(L/S*100*100)/100)}const Q={type:m,amount:L??null,percentage:V??null,value:m==="amount"?L:V,note:null,recordedAt:new Date().toISOString()};t.payments=[...xe(),Q],J&&(J.value=""),re&&(re.value="percent"),Se(),M(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},$e=m=>{!R||!_||Pe||(Pe=!0,m==="share"?_.checked?(R.checked||(R.checked=!0),rt(_)):R.checked&&(R.checked=!1):m==="tax"&&(R.checked?rt(_):_.checked&&(_.checked=!1)),Pe=!1)};function Ne(){f&&(f.innerHTML=Yt(t.expenses))}Ne(),Se(),B&&!B.dataset.listenerAttached&&(B.addEventListener("input",m=>{const h=m.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""),ie(),ae("auto"))}),B.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",m=>{const h=m.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""))}),i.dataset.listenerAttached="true"),k&&!k.dataset.listenerAttached&&(k.addEventListener("change",()=>{ie(),ae("auto")}),k.dataset.listenerAttached="true"),J&&!J.dataset.listenerAttached&&(J.addEventListener("input",m=>{const h=m.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""))}),J.dataset.listenerAttached="true"),N&&!N.dataset.listenerAttached&&(N.addEventListener("change",()=>{N.dataset.userSelected="true"}),N.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",m=>{const h=m.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""))}),l.dataset.listenerAttached="true"),_&&!_.dataset.listenerAttached&&(_.addEventListener("change",()=>{$e("share"),ie(),ae("auto")}),_.dataset.listenerAttached="true"),R&&!R.dataset.listenerAttached&&(R.addEventListener("change",()=>{$e("tax"),ie(),ae("auto")}),R.dataset.listenerAttached="true"),_?.checked&&rt(_),$e(_?.checked?"share":"tax"),ie(),ae("auto"),c&&c.addEventListener("click",m=>{m.preventDefault();const h=r?.value.trim()||"",v=j(l?.value||"0"),g=Number(v),S=j(i?.value||"0"),T=Number(S),E=(u?.value||"").trim();if(!h){M(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(g)||g<=0){M(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:h,amount:g,salePrice:Number.isFinite(T)&&T>0?T:0,note:E||""}),r&&(r.value=""),l&&(l.value=""),i&&(i.value=""),u&&(u.value=""),Ne(),ie(),ae("auto")}),f&&(f.addEventListener("click",m=>{const h=m.target.closest('[data-action="remove-expense"]');if(!h)return;const{id:v}=h.dataset;t.expenses=t.expenses.filter(g=>String(g.id)!==String(v)),Ne(),ie(),ae("auto")}),f.addEventListener("input",m=>{const h=m.target;if(!(h instanceof HTMLInputElement))return;const v=h.dataset.expenseId,g=h.dataset.expenseField;if(!v||!g)return;const S=t.expenses.findIndex(E=>String(E.id)===String(v));if(S===-1)return;let T=h.value;if(g==="amount"||g==="salePrice"){const E=j(T||""),L=Number.parseFloat(E);Number.isFinite(L)&&L>=0?t.expenses[S][g]=L:(T===""||E==="")&&(t.expenses[S][g]=0),ie(),ae("auto")}else(g==="label"||g==="note")&&(t.expenses[S][g]=T)})),oe&&!oe.dataset.listenerAttached&&(oe.addEventListener("click",m=>{m.preventDefault(),Me()}),oe.dataset.listenerAttached="true"),te&&!te.dataset.listenerAttached&&(te.addEventListener("click",m=>{const h=m.target.closest('[data-action="remove-payment"]');if(!h)return;const v=Number.parseInt(h.dataset.index||"-1",10);if(!Number.isInteger(v)||v<0)return;const g=xe();if(v>=g.length)return;const S=g.filter((T,E)=>E!==v);t.payments=S,Se(),M(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),te.dataset.listenerAttached="true"),a.addEventListener("submit",async m=>{if(m.preventDefault(),a.dataset.submitting==="true")return;const h=a.querySelector('[name="project-title"]'),v=a.querySelector('[name="project-type"]'),g=a.querySelector('[name="project-description"]'),S=h?.value.trim()||"",T=v?.value||"",E=j(d?.value.trim()||""),L=j(y?.value.trim()||""),V=g?.value.trim()||"",Q=(N?.value||"unpaid").toLowerCase(),G=["paid","partial"].includes(Q)?Q:"unpaid";if(!S||!T||!E){M(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),h?.focus();return}const Z=j(x?.value.trim()||""),Ye=j(z?.value.trim()||""),Ee=Nt(E,L),C=Z?Nt(Z,Ye):"",Xe=new Date(Ee),Ce=C?new Date(C):null;if(Ce&&Xe>Ce){M(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),x?.focus();return}if($.projects.findIndex(q=>String(q.id)===String(e.id))===-1){M(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const Qe=Ae(),{equipmentEstimate:Ze,servicesClientPrice:et,discountValue:tt,discountTypeValue:at,applyTax:ke,companyShareEnabled:Re,companySharePercent:nt,finance:W}=Qe,w=re?.value==="amount"?"amount":"percent",D=j(J?.value||"");let F=D?Number.parseFloat(D):null,H=[...xe()];if(Number.isFinite(F)&&F>0&&Number.isFinite(Number(W.totalWithTax))){const q=qe({totalAmount:W.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:H}),K=new Date().toISOString();if(w==="percent"){const O=Math.max(0,100-(q.paidPercent||0));if(O>fe){const ue=Math.min(F,O),pe=Math.round(ue*100)/100,he=W.totalWithTax>0?Math.round(pe/100*W.totalWithTax*100)/100:null;H=[...H,{type:"percent",amount:he,percentage:pe,value:pe,note:null,recordedAt:K}]}}else{const O=Math.max(0,W.totalWithTax-(q.paidAmount||0));if(O>fe){const ue=Math.min(F,O),pe=Math.round(ue*100)/100,he=W.totalWithTax>0?Math.round(pe/W.totalWithTax*100*100)/100:null;H=[...H,{type:"amount",amount:pe,percentage:he,value:pe,note:null,recordedAt:K}]}}H!==t.payments&&(t.payments=H,Se()),J&&(J.value=""),re&&(re.value="percent"),F=null}const I=qe({totalAmount:W.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:H}),U=N?.dataset?.userSelected==="true",de=ct({manualStatus:U?G:e.paymentStatus||G,paidAmount:I.paidAmount,paidPercent:I.paidPercent,totalAmount:W.totalWithTax}),ce=U?G:de;!U&&N&&(N.value=ce),N?.dataset&&delete N.dataset.userSelected,t.payments=H;const ne=Ua({projectCode:e.projectCode,title:S,type:T,clientId:e.clientId,clientCompany:e.clientCompany,description:V,start:Ee,end:C||null,applyTax:ke,paymentStatus:ce,equipmentEstimate:Ze,expenses:t.expenses,servicesClientPrice:et,discount:tt,discountType:at,companyShareEnabled:Re&&ke,companySharePercent:Re&&ke?nt:null,companyShareAmount:W.companyShareAmount,taxAmount:W.taxAmount,totalWithTax:W.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:xa(e),paidAmount:I.paidAmount,paidPercentage:I.paidPercent,paymentProgressType:I.paymentProgressType,paymentProgressValue:I.paymentProgressValue,payments:H}),ye=Ge?.checked===!0;ye&&(ne.status="cancelled",ne.cancelled=!0),a.dataset.submitting="true";try{const q=await Ot(e.projectId??e.id,ne),K=q?.projectId??q?.id??e.id;if(!ye)try{const O={start:Ee};C&&(O.end=C),await Sa(K,O)}catch(O){console.warn("⚠️ failed to sync linked reservations schedule",O)}if(await wa(K,ce),ye)try{await Ta(K)}catch(O){console.warn("⚠️ failed to cancel linked reservations",O)}$.projects=yt(),$.reservations=jt(),M(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),we(),De(),Fe(),ge(e.id)}catch(q){console.error("❌ [projects] Failed to update project from details view",q);const K=ze(q)?q.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");M(K,"error")}finally{delete a.dataset.submitting}})}function Lt(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description,fromProjectForm:!0,draftStorageKey:"projects:create:draft",returnUrl:`projects.html?project=${encodeURIComponent(e.id)}&linked=1#projects-section`};ft({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}b.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(b.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function pn(e){if(!e)return;const t=$.projects.find(a=>String(a.id)===String(e));if(!t){M(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){M(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Ot(t.projectId??t.id,{confirmed:!0});const a=await ba(e);$.projects=yt(),$.reservations=jt(),we(),De(),Fe(),b.detailsModalEl&&b.detailsModalEl.classList.contains("show")&&b.detailsBody?.dataset.projectId===String(e)&&ge(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),M(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=ze(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");M(s,"error")}}function mn(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=$t(e.start||""),{date:r,time:l}=$t(e.end||""),i=e.applyTax===!0||e.applyTax==="true";typeof e.paymentStatus=="string"&&e.paymentStatus.toLowerCase();const u=e.discountType==="amount"?"amount":"percent",c=j(String(e.discount??e.discountValue??0));j(String(e.servicesClientPrice??e.services_client_price??0));const f=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??lt,d=Number.parseFloat(j(String(f))),y=Number.isFinite(d)&&d>0?d:lt,x=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(d)&&d>0,z="",N=e?.cancelled===!0||e?.cancelled==="true"||String(e?.status||"").toLowerCase()==="cancelled"||String(e?.status||"").toLowerCase()==="canceled";return`
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
            <input class="form-check-input" type="checkbox" id="project-cancelled" name="project-cancelled" ${N?"checked":""}>
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
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(y))}" ${x?"checked":""}>
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
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control project-edit-input-xs" value="${o(z)}" placeholder="0" inputmode="decimal">
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
  `}function fn(e){return["commercial","coverage","photography","social"].map(a=>{const s=Qt(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(s)}</option>`}).join("")}function Yt(e=[]){const t=o(n("actions.remove","إزالة")),a=o(n("projects.expenses.table.headers.service","الخدمة")),s=o(n("projects.expenses.table.headers.cost","التكلفة (SR)")),r=o(n("projects.expenses.table.headers.sale","سعر البيع (SR)")),l=o(n("projects.expenses.table.headers.note","ملاحظات")),i=o(n("projects.expenses.table.headers.actions","الإجراءات"));if(!Array.isArray(e)||e.length===0){const y=o(n("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"));return`
      <div class="table-responsive">
        <table class="table table-sm table-hover align-middle project-services-table">
          <thead class="table-light">
            <tr>
              <th>${a}</th>
              <th>${s}</th>
              <th>${r}</th>
              <th>${l}</th>
              <th>${i}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="5" class="text-center text-muted">${y}</td></tr>
          </tbody>
        </table>
      </div>`}const u=e.map(y=>{const x=o(String(y?.id||"")),z=o(String(y?.label||"")),N=Number(y?.amount)||0,R=Number(y?.salePrice??y?.sale_price??0)||0,_=o(String((y?.note??y?.notes)||""));return`
      <tr>
        <td>
          <input type="text" class="form-control form-control-sm" value="${z}" data-expense-id="${x}" data-expense-field="label" placeholder="${o(n("projects.form.placeholders.expenseLabel","الوصف"))}">
        </td>
        <td>
          <input type="text" class="form-control form-control-sm" value="${o(String(N))}" data-expense-id="${x}" data-expense-field="amount" inputmode="decimal" placeholder="0">
        </td>
        <td>
          <input type="text" class="form-control form-control-sm" value="${o(String(R))}" data-expense-id="${x}" data-expense-field="salePrice" inputmode="decimal" placeholder="0">
        </td>
        <td>
          <input type="text" class="form-control form-control-sm" value="${_}" data-expense-id="${x}" data-expense-field="note" placeholder="${o(n("projects.form.labels.expenseNote","ملاحظات"))}">
        </td>
        <td>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${x}" aria-label="${t}">✖</button>
        </td>
      </tr>
    `}).join(""),c=e.reduce((y,x)=>y+(Number(x?.salePrice??x?.sale_price)||0),0),f=o(P(c)),d=o(n("projects.expenses.table.totalSale","مجموع سعر البيع"));return`
    <div class="table-responsive">
      <table class="table table-sm table-hover align-middle project-services-table">
        <thead class="table-light">
          <tr>
            <th>${a}</th>
            <th>${s}</th>
            <th>${r}</th>
            <th>${l}</th>
            <th>${i}</th>
          </tr>
        </thead>
        <tbody>${u}</tbody>
        <tfoot>
          <tr>
            <th colspan="2" class="text-end">${d}</th>
            <th>${f}</th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  `}function hn(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(P(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${j(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?j(bt(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(j(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function bn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(P(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${j(Number(a.percentage).toFixed(2))}%`:"—",u=a?.recordedAt?j(bt(a.recordedAt)):"—",c=a?.note?o(j(a.note)):"",f=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
      <tr>
        <td>${o(r)}</td>
        <td>${l}</td>
        <td>${i}</td>
        <td>${u}</td>
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
  `}function yn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(vn).filter(Boolean);if(a.length>0)return a;const s=Ve(e.paidPercent??e.paid_percent),r=Ve(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Xt(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function vn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=Ve(e.amount??(a==="amount"?e.value:null)),r=Ve(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,u=Xt(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:u}}function Ve(e){if(e==null||e==="")return null;const t=j(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function Xt(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Dt(e,t){if(!t)return null;const{date:a,time:s}=gn(bt(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية المشروع"):n("projects.details.labels.end","نهاية المشروع");return{icon:l,label:i,value:a,meta:s}}function gn(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function Qt(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function Zt(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(j(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=zt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(j(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function St(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function jn(){return St(ot)}function xn(){return St(it)}function Sn(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[ot,it,"linked"].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let f=!1;[ot,it,"linked"].forEach(d=>{c.has(d)&&(c.delete(d),f=!0)}),f&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),u=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",u)}catch{}}function wn(){const e=jn(),t=xn(),a=St("linked");e&&($.pendingProjectDetailId=e),t&&($.pendingProjectEditId=t,$.pendingProjectDetailId||($.pendingProjectDetailId=t)),a!=null&&String(a)!==""&&String(a)!=="0"&&String(a).toLowerCase()!=="false"&&($.pendingLinkedToast=!0),(e||t)&&Sn()}function Tn(){if(!$.pendingProjectDetailId)return;const e=$.pendingProjectDetailId,t=String(e),a=$.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;$.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(ge(s),$.pendingLinkedToast){$.pendingLinkedToast=!1;try{M(n("projects.toast.linkedReservationCreated","✅ تم ربط الحجز بالمشروع"))}catch{}}if($.pendingProjectEditId!=null){const r=String($.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&($.pendingProjectEditId=null,setTimeout(()=>Jt(a),0))}}function Pn(){document.addEventListener("DOMContentLoaded",()=>{rn(),wn(),$a(),Ht(),Na(),tn(),an(),Ea(),Ca(),ka(),La(),Da(),Fa(),Ia({onViewDetails:ge}),cn({onOpenProject:ge}),Ma(),An()}),document.addEventListener("language:changed",Ft),document.addEventListener("language:translationsReady",Ft),document.addEventListener("customers:changed",$n),document.addEventListener("technicians:updated",Nn),document.addEventListener("reservations:changed",()=>Ra(ge)),document.addEventListener(da.USER_UPDATED,()=>{we()})}async function An(){try{await Vt({suppressError:!0}),await Ut()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");M(t,"error")}finally{_a(),Ue(),Ba(),qt(),we(),Fe(),De(),Tn()}}function Ft(){Ue(),qt(),we(),Fe(),De(),Ht()}function $n(){Ha(),Ue()}function Nn(){qa(),Ue()}ua();pa();ma();Oa();Pn();document.addEventListener("DOMContentLoaded",()=>{ha(),fa()});const ut=.15,_e={},En="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let Le=0;const A={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Be=Object.freeze({projects:`
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
  `});let X=null;const ea=["upcoming","ongoing","completed"];async function Cn({forceProjects:e=!1}={}){try{await Vt({suppressError:!0}),await za({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),ze(t)&&console.warn("Projects API error:",t.message)}sa()}async function kn(){Fn(),aa(),await Ln();try{await Cn({forceProjects:!0}),oa(),Hn(),se()}finally{na()}document.addEventListener("language:changed",Vn),document.addEventListener("projects:changed",()=>{pt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{pt().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",On)}document.addEventListener("DOMContentLoaded",kn);async function Ln(){if(X)return X;if(typeof window>"u")return null;if(window.ApexCharts)return X=window.ApexCharts,X;try{await Dn(En),X=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),X=null}return X}function Dn(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function Fn(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function ta(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function aa(){Le+=1,Le===1&&ta(!0)}function na(){Le=Math.max(0,Le-1),Le===0&&ta(!1)}function sa(){const{customers:e=[]}=Bt();A.customers=Array.isArray(e)?e:[],A.reservations=jt();const t=new Map(A.customers.map(s=>[String(s.id),s])),a=yt();A.projects=Array.isArray(a)?a.map(s=>In(s,t)):[],A.totalProjects=A.projects.length}function In(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=Mn(e.id),l=r.reduce((_,B)=>_+Rn(B),0),i=_n(e),u=Number(e?.equipmentEstimate)||0,c=Number((u+i).toFixed(2)),f=e?.applyTax===!0||e?.applyTax==="true",d=f?Number((c*ut).toFixed(2)):0,y=f?Number(((c+l)*ut).toFixed(2)):0,x=Number((c+l+y).toFixed(2)),z=Bn(e),N=e.start?new Date(e.start):null,R=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:N,end:R,applyTax:f,status:z,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:d,combinedTaxAmount:y,overallTotal:x,unpaidValue:a==="paid"?0:x,reservationsCount:r.length}}function Mn(e){return Array.isArray(A.reservations)?A.reservations.filter(t=>String(t.projectId)===String(e)):[]}function Rn(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(j(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=zt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(j(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function _n(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function Bn(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function Hn(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{A.filters.search=p.search.value.trim(),se()},180)})}p.payment&&(p.payment.value=A.filters.payment,p.payment.addEventListener("change",()=>{A.filters.payment=p.payment.value||"all",se()})),p.dateRange&&(p.dateRange.addEventListener("change",qn),p.dateRange.value=A.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{A.filters.startDate=p.startDate.value,A.filters.range==="custom"&&se()}),p.endDate&&p.endDate.addEventListener("change",()=>{A.filters.endDate=p.endDate.value,A.filters.range==="custom"&&se()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(A.filters.range!=="custom"){se();return}A.filters.startDate=p.startDate?.value||"",A.filters.endDate=p.endDate?.value||"",se()})}function qn(e){const t=e.target.value;A.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),A.filters.startDate="",A.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),se())}async function pt(){aa();try{await Promise.all([Ut(),Ga()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),ze(e)&&console.warn("Projects API error:",e.message)}finally{sa(),se(),na()}}function Vn(){oa(),se()}function On(e){e.key&&!["projects","reservations","customers"].includes(e.key)||pt().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function se(){const e=Un();wt(),Kn(e),Xn(e),Qn(e),Zn(e),es(e),ts(e)}function Un(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=A.filters,i=ra(e),u=new Date,c=Number(s);let f=null;if(s==="custom"){f=r?new Date(r):null;const d=l?new Date(l):null;return A.projects.filter(y=>!It(y,t)||!Mt(y,a)||!Rt(y,i)?!1:Wn(y.start,f,d))}return s!=="all"&&Number.isFinite(c)&&(f=new Date,f.setDate(u.getDate()-c)),A.projects.filter(d=>!It(d,t)||!Mt(d,a)||!Rt(d,i)?!1:s==="all"?!0:zn(d.start,f,u))}function It(e,t){return t.includes(e.status)}function Mt(e,t){return t==="all"?!0:e.paymentStatus===t}function Rt(e,t){return t?ra([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function zn(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function Wn(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function ra(e){return e?j(String(e)).toLowerCase().trim():""}function Kn(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((i,u)=>i+u.overallTotal,0),s=e.reduce((i,u)=>i+u.unpaidValue,0),r=e.reduce((i,u)=>i+u.expensesTotal,0),l=[{icon:Be.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:mt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Be.value,label:n("projects.reports.kpi.totalValue","Total value"),value:ee(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Be.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:ee(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Be.expenses,label:n("projects.reports.kpi.expenses","تكلفة الخدمات الإنتاجية"),value:ee(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];p.kpiGrid.innerHTML=l.map(({icon:i,label:u,value:c,meta:f})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${Y(u)}</p>
        <p class="reports-kpi-value">${Y(c)}</p>
        <span class="reports-kpi-meta">${Y(f)}</span>
      </div>
    </div>
  `).join(""),Gn(e)}function Gn(e){try{const t=Jn(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:ee(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:ee(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:ee(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:ee(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:ee(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:ee(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","تكلفة الخدمات الإنتاجية","Project expenses"),value:`−${ee(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:ee(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:u})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${Y(i)}</span>
            <span class="reports-kpi-detail-value">${Y(u)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:p.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function Jn(e){const t=new Set(e.map(B=>String(B.id))),a=A.reservations.filter(B=>B.projectId!=null&&t.has(String(B.projectId)));let s=0,r=0,l=0,i=0,u=0,c=0,f=0;a.forEach(B=>{const k=Xa(B);s+=k.finalTotal||0,r+=k.equipmentTotal||0,l+=k.crewTotal||0,i+=k.crewCostTotal||0,u+=k.companyShareAmount||0,c+=k.taxAmount||0,f+=k.netProfit||0});const d=e.reduce((B,k)=>B+(Number(k.expensesTotal)||0),0),y=e.reduce((B,k)=>B+(Number(k.raw?.equipmentEstimate)||0),0),x=e.reduce((B,k)=>{const re=k.applyTax===!0,J=(Number(k.raw?.equipmentEstimate)||0)+(Number(k.expensesTotal)||0),oe=re?J*ut:0;return B+oe},0),z=s+y+x,N=r+y,R=c+x,_=f-d;return{grossRevenue:z,companyShareTotal:u,taxTotal:R,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:N,projectExpensesTotal:d,netProfit:_}}function oa(){if(!p.statusChips)return;const e=ea.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${Y(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",Yn),p.statusChips.dataset.listenerAttached="true"),wt()}function Yn(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(A.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&ea.forEach(r=>s.add(r)),A.filters.statuses=Array.from(s),wt(),se()}function wt(){if(!p.statusChips)return;const e=new Set(A.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function Xn(e){if(!X)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(f=>f.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,f)=>c+f,0)>0?s:[],u={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>je(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};We("status",t,u)}function Qn(e){if(!X)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(ns(),{month:"short",year:"numeric"});e.forEach(d=>{if(!d.start||Number.isNaN(d.start.getTime()))return;const y=`${d.start.getFullYear()}-${d.start.getMonth()+1}`,x=a.get(y)||{total:0,label:s.format(d.start)};x.total+=d.overallTotal,a.set(y,x)});const l=Array.from(a.keys()).sort((d,y)=>{const[x,z]=d.split("-").map(Number),[N,R]=y.split("-").map(Number);return x===N?z-R:x-N}).slice(-12),i=l.map(d=>a.get(d)?.label||d),u=l.map(d=>Math.round(a.get(d)?.total||0)),c=u.length?[{name:n("projects.reports.datasets.value","Total value"),data:u}]:[],f={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:d=>je(d)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:d=>je(d)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("timeline",t,f)}function Zn(e){if(!X)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((f,d)=>d.overallTotal-f.overallTotal).slice(0,6),s=a.map(f=>f.title||f.projectCode),r=a.map(f=>Math.round(f.overallTotal)),l=a.map(f=>Math.round(f.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","تكلفة الخدمات الإنتاجية"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:f=>je(f)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:f=>je(f)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("expenses",t,c)}function es(e){if(!X)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const f=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),d=a.get(f)||0;a.set(f,d+c.overallTotal)});const s=Array.from(a.entries()).sort((c,f)=>f[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],u={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>je(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>je(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};We("clients",t,u)}function We(e,t,a={}){if(!X||!t)return;if(_e[e]){try{_e[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete _e[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new X(t,s);_e[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function ts(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=as(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${Y(a.clientName)} <small class="text-muted">${Y(a.clientCompany)}</small>`:Y(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
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
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",mt(e.length)).replace("{total}",mt(A.totalProjects))}}function as(e,t){if(!e&&!t)return"—";const a=e?At(e.toISOString()):"—",s=t?At(t.toISOString()):"—";return t?`${a} → ${s}`:a}function ee(e){const t=Number(e)||0,s=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${j(r)} SR`}function mt(e){const a=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return j(new Intl.NumberFormat(a).format(e))}function je(e){const a=Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return j(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function ns(){return Oe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function Y(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
