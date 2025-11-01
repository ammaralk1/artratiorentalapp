import{s as fa,f as ha,e as qt,u as yt,j as F,t as n,d as Vt,n as j,q as ba,a as ya,m as va,c as ga,i as ja,v as Et,p as We}from"./auth.CoLto2Rb.js";import"./dashboard.BMo7hxbF.js";import{d as b,r as we,a as Fe,u as Ie,s as $,b as xa,f as vt,h as Sa,i as wa,j as o,k as P,l as Ta,m as gt,n as Pa,o as Ct,e as ct,p as kt,q as Aa,t as $a,v as Na,w as Ea,g as Ca,c as ka,x as La,y as Ot,z as Da,A as Fa,B as Ia,C as Ma,D as Ra,E as _a,F as Ba,G as Ha,H as qa,I as Va,J as Oa,K as Ke,L as Ua,M as Ut,N as za,O as Wa}from"./form.DlkD03ID.js";import"./customers.ChbEplVW.js";import"./state.BoE9tT9W.js";import{e as Ka,r as Ga}from"./controller.CqVfYEGW.js";import{i as Ja}from"./dashboardShell.DF2kUed9.js";import{e as zt}from"./reservationsActions.D55uOsd1.js";import{updateProjectApi as Wt,getProjectsState as jt,isApiError as Ge,buildProjectPayload as Ya,refreshProjectsFromApi as Kt,ensureProjectsLoaded as Xa}from"./projectsService.CstCTiNt.js";import{P as xt,a as St,b as Lt,c as Oe,s as Qa,d as lt,e as dt}from"./constants.DEr_pIIy.js";import{g as wt,f as Za,c as Ue,d as ut,b as en,e as Gt,D as pt,r as tn}from"./reservationsService.DUKQdfBZ.js";import{g as an,w as nn}from"./uiBridge.Dv6JMAlF.js";import{c as sn}from"./calculations.Bjy_BFQE.js";import"./details.CBXuqg4d.js";import"./equipment.BWhnBXCT.js";import"./quotePdf.C2lQPEPC.js";import"./canvasColorUtils.CviLtv6S.js";let Dt=null;function rn(e){e&&Jt()!==e&&yt({[xt]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects main tab preference",t)})}function Jt(){return qt()?.[xt]||""}function Yt(e){e&&mt()!==e&&yt({[St]:e}).catch(t=>{console.warn("⚠️ [projects] Failed to persist projects sub-tab preference",t)})}function mt(){return qt()?.[St]||""}function on(e){if(!e)return"";const t=e.trim();return t?Object.values(Lt).includes(t)?t:Lt[t]||"":""}function cn(){if(typeof window>"u")return"";try{const t=new URLSearchParams(window.location.search||"").get("subTab");if(t){const a=on(t);if(a)return a}}catch{}return""}function Xt(e,t){!e||!b.tabPanes||!b.tabButtons||(b.tabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab-button")&&a.classList.toggle("tab-active",s)}),b.tabPanes.forEach(a=>{a.dataset.tabPane===e?a.classList.remove("d-none"):a.classList.add("d-none")}),t&&rn(e))}function ln(){if(!b.tabButtons||!b.tabButtons.length)return;b.tabButtons.forEach(a=>{a.dataset.tabListenerAttached!=="true"&&(a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.tabTarget;r&&(Xt(r,a),r==="projects-section"&&($.filters.search="",b.search&&(b.search.value=""),we(),Fe(),Ie()))}),a.dataset.tabListenerAttached="true")});const e=Jt(),t=e&&b.tabButtons.find(a=>a.dataset.tabTarget===e);t&&t.click()}function Tt(e,t){!e||!b.projectSubTabButtons||!b.projectSubTabPanes||(b.projectSubTabButtons.forEach(a=>{const s=a===t;a.classList.toggle("active",s),a.classList.contains("tab")&&a.classList.toggle("tab-active",s)}),b.projectSubTabPanes.forEach(a=>{a.dataset.projectSubtab===e?a.classList.remove("d-none"):a.classList.add("d-none")}))}function dn(){!b.projectSubTabButtons||!b.projectSubTabButtons.length||(b.projectSubTabButtons.forEach(e=>{e.dataset.tabListenerAttached!=="true"&&(e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.projectSubtabTarget;a&&(Tt(a,e),Yt(a))}),e.dataset.tabListenerAttached="true")}),un())}function un(){const t=cn()||mt();if(!t)return;const a=b.projectSubTabButtons?.[0],s=b.projectSubTabButtons?.find(l=>l.dataset.projectSubtabTarget===t)||a,r=s?.dataset.projectSubtabTarget;r&&(t!==mt()&&Yt(r),Tt(r,s))}function pn(){return b.tabButtons?b.tabButtons.find(t=>t.classList.contains("active"))?.dataset.tabTarget==="projects-section":!1}function Ft(e={}){if(e){if(b.tabButtons&&b.tabButtons.length){const a=b.tabButtons.find(r=>r.classList.contains("active"))?.dataset.tabTarget||"",s=e[xt];if(s&&s!==a){const r=b.tabButtons.find(l=>l.dataset.tabTarget===s);r&&Xt(s,r)}}if(b.projectSubTabButtons&&b.projectSubTabButtons.length&&pn()){const a=b.projectSubTabButtons.find(r=>r.classList.contains("active"))?.dataset.projectSubtabTarget||"",s=e[St];if(s&&s!==a){const r=b.projectSubTabButtons.find(l=>l.dataset.projectSubtabTarget===s);r&&Tt(s,r)}}}}function mn(){Dt||(Dt=fa(e=>{Ft(e)})),ha().then(e=>{Ft(e)}).catch(e=>{console.warn("⚠️ [projects] Failed to synchronise project preferences",e)})}function ve(e){const t=$.projects.find(x=>String(x.id)===String(e));if(!t||!b.detailsBody)return;b.detailsBody.dataset.mode="view",b.detailsBody.dataset.projectId=String(t.id);const s=($.customers.length?$.customers:Vt().customers||[]).find(x=>String(x.id)===String(t.clientId)),r=ta(t.type),i=t.description?.trim()||n("projects.fallback.noDescription","لا يوجد وصف"),u=s?.customerName||n("projects.fallback.unknownClient","عميل غير معروف"),c=s?.phone??s?.customerPhone??t.clientPhone??t.customerPhone??"",f=c?j(String(c).trim()):n("projects.details.client.noPhone","لا يوجد رقم متاح"),d=s?.email??t.clientEmail??t.customerEmail??"",y=d?String(d).trim():n("projects.details.client.noEmail","لا يوجد بريد متاح"),S=(t.clientCompany||s?.companyName||"").trim(),O=t.projectCode||`PRJ-${j(String(t.id))}`,N=j(O),I=vt(t.id),M=I.reduce((x,L)=>x+aa(L),0),R=Number(M.toFixed(2)),k=I.length,{subtotal:ce,applyTax:K,expensesTotal:le}=Sa(t),se=Number(t?.servicesClientPrice??t?.services_client_price??0),Te=ce,Ye=K?Number(((Te+R)*Oe).toFixed(2)):0,Xe=Number((Te+R+Ye).toFixed(2)),Pe=wa(t),he=t?.cancelled===!0||t?.status==="cancelled"||t?.status==="canceled"?"cancelled":Pe,ue=n(`projects.status.${he}`,Qa[he]||he),Ae=(()=>{try{const x=t.start?new Date(t.start):null,L=t.end?new Date(t.end):x?new Date(x.getTime()+3600*1e3):null;return!x||!L||Number.isNaN(x.getTime())||Number.isNaN(L.getTime())?!1:$.projects.some(H=>{if(!H||String(H.id)===String(t.id))return!1;const J=H.start?new Date(H.start):null,B=H.end?new Date(H.end):J?new Date(J.getTime()+3600*1e3):null;if(!J||!B||Number.isNaN(J.getTime())||Number.isNaN(B.getTime()))return!1;const q=Math.max(x.getTime(),J.getTime()),U=Math.min(L.getTime(),B.getTime());return q<U})}catch{return!1}})()&&(he==="upcoming"||he==="ongoing")?"conflict":he,Qe={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل",conflict:"تعارض"}[Ae]||ue,re={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed",conflict:"timeline-status-badge timeline-status-badge--conflict",cancelled:"timeline-status-badge timeline-status-badge--cancelled"}[Ae]||"timeline-status-badge timeline-status-badge--upcoming",xe=typeof t.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",pe=Tn(t),Re=pe.length>0,$e=Re?0:Number(t.paidAmount)||0,Ne=Re?0:Number(t.paidPercent)||0;let m=Xe,h,v,g,w,T,E,D,_,te,z;const ae=Sn(pe),Ze=n("projects.focus.confirmed","✅ مشروع مؤكد"),Ee=t.confirmed===!0||t.confirmed==="true"?`<span class="reservation-chip status-confirmed">${o(Ze)}</span>`:"";let C=[];if(k>0){const x=I.reduce((He,oe)=>{const ua=Array.isArray(oe.items)?oe.items:[],Nt=Array.isArray(oe.crewAssignments)?oe.crewAssignments:[],fe=Nt.length?Nt:Array.isArray(oe.technicians)?oe.technicians:[],pa=Array.isArray(fe)&&fe.length&&typeof fe[0]=="object",ma=Array.isArray(fe)&&fe.length&&typeof fe[0]!="object",it=Za({items:ua,technicianIds:ma?fe:[],crewAssignments:pa?fe:[],discount:oe.discount??0,discountType:oe.discountType||"percent",applyTax:!1,start:oe.start,end:oe.end,companySharePercent:null,groupingSource:oe});return He.equipment+=Number(it.equipmentTotal||0),He.crew+=Number(it.crewTotal||0),He.crewCost+=Number(it.crewCostTotal||0),He},{equipment:0,crew:0,crewCost:0}),L=Number(le||0),H=Number((x.equipment+x.crew+se).toFixed(2)),J=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let q=(t?.discountType==="amount"?"amount":"percent")==="amount"?J:H*(J/100);(!Number.isFinite(q)||q<0)&&(q=0),q>H&&(q=H);const U=K===!0,Y=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",V=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ye=Y&&V>0?V:0,W=Math.max(0,H-q),Z=Number((W*(ye/100)).toFixed(2)),me=U?Number(((W+Z)*Oe).toFixed(2)):0,Le=Number((W+Z+me).toFixed(2)),da=Number((Le-Z-me-L-x.crewCost).toFixed(2));x.equipment>0&&C.push({icon:"🎛️",label:n("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:P(x.equipment)}),x.crew>0&&C.push({icon:"😎",label:n("projects.details.summary.crewTotal","إجمالي الفريق"),value:P(x.crew)}),x.crewCost>0&&C.push({icon:"🧾",label:n("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:P(x.crewCost)}),se>0&&C.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:P(se)}),L>0&&C.push({icon:"🧾",label:n("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:P(L)}),q>0&&C.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${P(q)}`}),C.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:P(W)}),Z>0&&C.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${P(Z)}`}),me>0&&C.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${P(me)}`}),C.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:P(da)}),C.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:P(Le)}),m=Le}else{const x=Number(le||0),L=Math.max(0,Number(se)||0),H=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let B=(t?.discountType==="amount"?"amount":"percent")==="amount"?H:L*(H/100);(!Number.isFinite(B)||B<0)&&(B=0),B>L&&(B=L);const q=Math.max(0,L-B),U=K===!0,Y=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",V=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,ye=Y&&V>0?V:0,W=Number((q*(ye/100)).toFixed(2)),Z=U?Number(((q+W)*Oe).toFixed(2)):0,me=Number((q+W+Z).toFixed(2)),Le=Number((me-W-Z-x).toFixed(2));C=[],C.push({icon:"💼",label:n("projects.details.summary.servicesClientPrice","الخدمات الإنتاجية"),value:P(L)}),B>0&&C.push({icon:"🏷️",label:n("projects.details.summary.discount","الخصم"),value:`−${P(B)}`}),C.push({icon:"🧮",label:n("projects.details.summary.grossAfterDiscount","الإجمالي بعد الخصم"),value:P(q)}),W>0&&C.push({icon:"🏦",label:n("projects.details.summary.companyShare","نسبة الشركة"),value:`−${P(W)}`}),Z>0&&C.push({icon:"💸",label:n("projects.details.summary.tax","الضريبة (15٪)"),value:`−${P(Z)}`}),C.push({icon:"💵",label:n("projects.details.summary.netProfit","صافي الربح"),value:P(Le)}),C.push({icon:"💰",label:n("projects.details.summary.finalTotal","المجموع النهائي"),value:P(me)}),m=me}h=Ue({totalAmount:m,paidAmount:$e,paidPercent:Ne,history:pe}),v=ut({manualStatus:xe||"unpaid",paidAmount:h.paidAmount,paidPercent:h.paidPercent,totalAmount:m}),g=n(`projects.paymentStatus.${v}`,v==="paid"?"Paid":v==="partial"?"Partial":"Unpaid"),w=v==="paid"?"status-paid":v==="partial"?"status-partial":"status-unpaid",T=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,E=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,D=Math.max(0,Number((m-T).toFixed(2))),_=P(T),te=`${j(E.toFixed(2))}%`,z=P(D);const et=C.map(({icon:x,label:L,value:H})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${x} ${o(L)}</span>
      <span class="summary-details-value">${o(H)}</span>
    </div>
  `).join(""),Ce=n("projects.details.labels.code","رقم المشروع"),$t=`
    <div class="project-details-code-badge" title="${o(Ce)}">
      <span class="project-details-code-badge__label">
        <span class="project-details-code-badge__icon" aria-hidden="true">🗂️</span>
        ${o(Ce)}
      </span>
      <span class="project-details-code-badge__value">${o(N)}</span>
    </div>
  `,tt=en(t.start,t.end),at=Mt("start",t.start),Se=Mt("end",t.end),nt=Se?{...Se,meta:(Se.meta?`${Se.meta} — `:"")+`${n("projects.details.labels.days","عدد الأيام")}: ${j(String(tt))}`}:null,st=[{icon:"👤",label:n("projects.details.client","العميل"),value:u},{icon:"📞",label:n("projects.details.labels.clientPhone","رقم العميل"),value:f},{icon:"✉️",label:n("projects.details.labels.clientEmail","البريد الإلكتروني"),value:y},S?{icon:"🏢",label:n("projects.details.company","شركة العميل"),value:S}:null,{icon:"🏷️",label:n("projects.details.type","نوع المشروع"),value:`<span class="project-type-chip project-type-chip--${t.type||"default"}">${o(r)}</span>`},at,nt].filter(Boolean),ke=n("projects.details.overview.heading","معلومات المشروع"),_e=`
    <div class="project-details-outline">
      <h6 class="project-details-outline__title">${o(ke)}</h6>
      <ul class="project-details-outline__list">
        ${st.map(({icon:x,label:L,value:H,meta:J})=>{const B=String(H??""),U=B.trim().startsWith("<")?B:o(B),Y=String(J??""),V=Y?o(Y):"";return`
          <li>
            <span class="project-details-outline__label">${o(x)} ${o(L)}</span>
            <span class="project-details-outline__value-group">
              <span class="project-details-outline__value">${U}</span>
              ${J?`<span class="project-details-outline__meta">${V}</span>`:""}
            </span>
          </li>
          `}).join("")}
      </ul>
    </div>
  `,rt=k>0?n("projects.details.chips.linkedReservation","مربوط بحجز"):n("projects.details.chips.notLinkedReservation","غير مربوط بحجز"),Q=k>0?"reservation-chip status-confirmed":"reservation-chip status-info",ot=[`<span class="${re}">${o(Qe)}</span>`,`<span class="${Q}">${o(rt)}</span>`,`<span class="reservation-chip ${w}">${o(g)}</span>`,Ee].filter(Boolean).join("");n("projects.details.expensesTotal","تكلفة الخدمات الإنتاجية"),n("projects.details.reservationsTotal","إجمالي الحجوزات");const Be=n("projects.details.expenses","خدمات إنتاجية ({amount})").replace("{amount}",P(le)),be=fn(Array.isArray(t.expenses)?t.expenses:[]);b.detailsBody.innerHTML=`
    <section class="project-details-primary">
      <header class="project-details-header">
        <div class="project-details-header__info">
          <div class="project-details-chips">${ot}</div>
        </div>
        <div class="project-details-header__code">
          ${$t}
          <h4 class="project-details-title">${o(t.title)}</h4>
        </div>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${_e}
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
      <h5>${o(Be)}</h5>
      ${be}
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
          <strong>${o(_)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.percent","نسبة المدفوع"))}</span>
          <strong>${o(te)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${o(n("projects.details.paymentOverview.remaining","المتبقي"))}</span>
          <strong>${o(z)}</strong>
        </div>
      </div>
      <div class="reservation-payment-history-modal mt-3">
        ${ae}
      </div>
    </section>
    ${Ta(t)}
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
  `,yn(t);const G=b.detailsBody.querySelector("#project-details-export-btn");G&&G.addEventListener("click",async x=>{if(x.preventDefault(),G.blur(),!G.disabled){G.disabled=!0;try{await Ka({project:t})}catch(L){console.error("❌ [projects/details] export project PDF failed",L),F(n("projects.details.exportFailed","⚠️ تعذر تصدير المشروع إلى PDF"),"error")}finally{G.disabled=!1}}}),b.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(b.detailsModalEl).show()}function fn(e=[]){if(!(Array.isArray(e)&&e.length>0)){const s=o(n("projects.expenses.table.empty","ستظهر المصاريف المسجلة هنا فور إضافتها."));return`
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
  `}function hn({onOpenProject:e}){!b.focusCards||b.focusCards.dataset.listenerAttached==="true"||(b.focusCards.addEventListener("click",t=>{const a=t.target.closest("[data-action]");if(a){const{action:r,id:l}=a.dataset;if(r==="confirm-project"){t.preventDefault(),t.stopPropagation(),gn(l);return}r==="view"?e?.(l):r==="highlight"&&bn(l);return}const s=t.target.closest(".project-focus-card");s?.dataset.projectId&&e?.(s.dataset.projectId)}),b.focusCards.dataset.listenerAttached="true")}function bn(e){if(!b.projectsTableBody)return;const t=`tr[data-project-id="${CSS.escape(String(e))}"]`,a=b.projectsTableBody.querySelector(t);if(!a){F(n("projects.focus.toastNotFound","⚠️ تعذّر العثور على المشروع في القائمة"));return}a.classList.add("project-row-highlight"),a.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{a.classList.remove("project-row-highlight")},2200)}function yn(e){if(!b.detailsBody)return;const t=b.detailsBody.querySelector('[data-action="create-reservation"]'),a=b.detailsBody.querySelector('[data-action="edit-project"]'),s=b.detailsBody.querySelector('[data-action="delete-project"]'),r=b.detailsBody.querySelector(".project-reservations-list");if(t&&e)try{(vt(e.id)||[]).some(u=>{const c=String(u?.status||u?.reservationStatus||"").toLowerCase();return c!=="cancelled"&&c!=="canceled"})?(t.classList?.add("disabled"),t.setAttribute?.("aria-disabled","true"),t.title=n("projects.details.reservations.createDisabled","⚠️ المشروع مربوط بحجز مسبقاً"),t.addEventListener("click",u=>{u.preventDefault(),F(n("projects.details.reservations.createDisabledToast","⚠️ المشروع مربوط بحجز مسبقاً"))})):(t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",u=>{u.preventDefault(),It(e)}))}catch{t.disabled=!1,t.classList?.remove("disabled"),t.classList?.remove("btn-disabled"),t.removeAttribute?.("aria-disabled"),t.removeAttribute?.("title"),t.addEventListener("click",i=>{i.preventDefault(),It(e)})}if(a&&e&&a.addEventListener("click",l=>{l.preventDefault(),Qt(e)}),s&&e&&s.addEventListener("click",async l=>{l.preventDefault();const i=l.currentTarget;i.disabled=!0;try{await Pa(e.id),!$.projects.some(c=>String(c.id)===String(e.id))&&b.detailsModalEl&&window.bootstrap?.Modal.getInstance(b.detailsModalEl)?.hide()}finally{$.projects.some(c=>String(c.id)===String(e.id))&&(i.disabled=!1)}}),r){const l=async i=>{if(!Number.isInteger(i)||i<0)return!1;const u=an("showReservationDetails");if(typeof u=="function")return u(i),!0;try{const c=await nn("showReservationDetails");if(typeof c=="function")return c(i),!0}catch(c){console.warn("⚠️ [projects/projectDetails] Unable to resolve reservation UI handler",c)}return!1};r.addEventListener("click",async i=>{const u=i.target.closest('[data-action="view-reservation"]');if(!u)return;const c=u.dataset.index||u.dataset.reservationIndex,f=Number.parseInt(c||"-1",10);if(!Number.isInteger(f)||f<0)return;await l(f)||(window.location.href="dashboard.html#reservations")}),r.addEventListener("keydown",i=>{if(!["Enter"," "].includes(i.key))return;const u=i.target.closest('[data-action="view-reservation"]');u&&(i.preventDefault(),u.click())})}}function Qt(e){if(!e||!b.detailsBody)return;const t=$.projects.find(d=>String(d.id)===String(e.id));if(!t)return;const a=$.customers.find(d=>String(d.id)===String(t.clientId));a?.customerName||a?.name||t.clientName||t.customerName,t.clientCompany||a?.companyName||a?.company;const s=Array.isArray(t.expenses)?t.expenses.map((d,y)=>({id:d?.id||`expense-${t.id}-${y}-${Date.now()}`,label:d?.label||"",amount:Number(d?.amount)||0,salePrice:Number.isFinite(Number(d?.sale_price??d?.salePrice))?Number(d?.sale_price??d?.salePrice):0,note:d?.note!=null?String(d.note):d?.notes!=null?String(d.notes):""})):[];let r=Array.isArray(t.paymentHistory)?t.paymentHistory.map((d,y)=>({type:d?.type==="percent"?"percent":"amount",amount:Number.isFinite(Number(d?.amount))?Number(d.amount):null,percentage:Number.isFinite(Number(d?.percentage))?Number(d.percentage):null,value:Number.isFinite(Number(d?.value))?Number(d.value):null,note:d?.note??null,recordedAt:d?.recordedAt??d?.recorded_at??new Date().toISOString(),key:`payment-${t.id}-${y}`})):[],l=r.reduce((d,y)=>d+(Number(y?.amount)||0),0),i=r.reduce((d,y)=>d+(Number(y?.percentage)||0),0),u=Number.isFinite(Number(t.paidAmount))?Number(t.paidAmount):0,c=Number.isFinite(Number(t.paidPercent))?Number(t.paidPercent):0;if(!r.length&&(u>0||c>0)){const d=t.updatedAt??t.createdAt??new Date().toISOString();c>0?r=[{type:"percent",amount:Number.isFinite(u)&&u>0?u:null,percentage:c,value:c,note:null,recordedAt:d,key:`legacy-payment-${t.id}-percent`}]:u>0&&(r=[{type:"amount",amount:u,percentage:null,value:u,note:null,recordedAt:d,key:`legacy-payment-${t.id}-amount`}]),l=r.reduce((y,S)=>y+(Number(S?.amount)||0),0),i=r.reduce((y,S)=>y+(Number(S?.percentage)||0),0),u=0,c=0}l>0&&Math.abs(u-l)<.01&&(u=0),i>0&&Math.abs(c-i)<.01&&(c=0);const f={expenses:s,payments:r,basePaidAmount:u,basePaidPercent:c};b.detailsBody.dataset.mode="edit",b.detailsBody.innerHTML=jn(t,f),vn(t,f)}function vn(e,t={expenses:[]}){const a=b.detailsBody?.querySelector("#project-details-edit-form");if(!a)return;const s=a.querySelector('[data-action="cancel-edit"]');s&&s.addEventListener("click",m=>{m.preventDefault(),ve(e.id)});const r=a.querySelector("#project-edit-expense-label"),l=a.querySelector("#project-edit-expense-amount"),i=a.querySelector("#project-edit-expense-sale"),u=a.querySelector("#project-edit-expense-note"),c=a.querySelector('[data-action="add-expense"]'),f=a.querySelector("#project-edit-expense-list"),d=a.querySelector('[name="project-start-date"]'),y=a.querySelector('[name="project-start-time"]'),S=a.querySelector('[name="project-end-date"]'),O=a.querySelector('[name="project-end-time"]'),N=a.querySelector('[name="project-payment-status"]'),I=a.querySelector("#project-edit-tax"),M=a.querySelector("#project-edit-company-share"),R=a.querySelector("#project-edit-discount"),k=a.querySelector("#project-edit-discount-type"),ce=a.querySelector("#project-edit-payment-progress-type"),K=a.querySelector("#project-edit-payment-progress-value"),le=a.querySelector("#project-edit-payment-add"),se=a.querySelector("#project-edit-payment-history"),Te=a.querySelector("#project-edit-payment-summary"),Ye=n("reservations.create.summary.currency","SR"),Xe=a.querySelector("#project-cancelled");let Pe=!1;(()=>{const m=(typeof window<"u"?window.flatpickr:null)||(typeof globalThis<"u"?globalThis.flatpickr:null);m&&(d&&m(d,{dateFormat:"Y-m-d",allowInput:!0}),S&&m(S,{dateFormat:"Y-m-d",allowInput:!0}),y&&m(y,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",altInput:!0,altFormat:"h:i K",time_24hr:!1,defaultHour:9,defaultMinute:0,minuteIncrement:5,disableMobile:!0,allowInput:!0,altInputClass:"flatpickr-alt-input form-control"}),O&&m(O,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",altInput:!0,altFormat:"h:i K",time_24hr:!1,defaultHour:9,defaultMinute:0,minuteIncrement:5,disableMobile:!0,allowInput:!0,altInputClass:"flatpickr-alt-input form-control"}))})();const ue=m=>{if(!m||m.dataset.normalizedDigits==="true")return;const h=()=>{const v=m.value||"",g=j(v);if(g!==v){const w=m.selectionStart,T=m.selectionEnd;m.value=g;try{if(typeof w=="number"&&typeof T=="number"){const E=g.length-v.length;m.setSelectionRange(Math.max(0,w+E),Math.max(0,T+E))}}catch{}}};m.addEventListener("input",h),m.addEventListener("blur",h);try{m.setAttribute("inputmode","numeric")}catch{}m.dataset.normalizedDigits="true"};ue(d),ue(y),ue(S),ue(O),y&&y._flatpickr?.altInput&&ue(y._flatpickr.altInput),O&&O._flatpickr?.altInput&&ue(O._flatpickr.altInput);const je=()=>(Array.isArray(t.payments)||(t.payments=[]),t.payments),Ae=()=>{const m=Number(e.equipmentEstimate)||0,h=Array.isArray(t.expenses)?t.expenses.reduce((z,ae)=>z+(Number(ae.amount)||0),0):0,v=Array.isArray(t.expenses)?Math.max(0,Math.round(t.expenses.reduce((z,ae)=>z+Number(ae?.salePrice??0),0)*100)/100):Math.max(0,Number(e?.servicesClientPrice??0)),g=k?.value==="amount"?"amount":"percent",w=j(R?.value||"0");let T=Number.parseFloat(w);(!Number.isFinite(T)||T<0)&&(T=0);const E=I?.checked===!0,D=M?.checked===!0;let _=D?Ca(M):null;(!Number.isFinite(_)||_<=0)&&(_=D?pt:null);const te=ka({equipmentEstimate:m,expensesTotal:h,servicesClientPrice:v,discountValue:T,discountType:g,applyTax:E,companyShareEnabled:D,companySharePercent:_});return{equipmentEstimate:m,expensesTotal:h,discountValue:T,discountTypeValue:g,applyTax:E,companyShareEnabled:D,companySharePercent:_,servicesClientPrice:v,finance:te}},Me=()=>{const m=Ae(),h=je(),g=(vt(e.id)||[]).reduce((_,te)=>_+(Number(te?.totalAmount)||aa(te)||0),0),w=Number(m.finance?.taxableAmount||0),T=m.applyTax?Number(((w+g)*Oe).toFixed(2)):0,E=Number((w+g+T).toFixed(2)),D=Ue({totalAmount:E,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:h});return{...m,combinedTotalWithTax:E,payments:h,progress:D}},Qe=()=>{se&&(se.innerHTML=wn(je()))},de=()=>{if(!Te)return;const{combinedTotalWithTax:m,progress:h}=Me(),v=Number.isFinite(Number(m))?Number(m):0,g=Number.isFinite(Number(h.paidAmount))?Number(h.paidAmount):0,w=Number.isFinite(Number(h.paidPercent))?Number(h.paidPercent):0,T=Math.max(0,Math.round((v-g)*100)/100),E=[{label:n("projects.form.paymentSummary.total","الإجمالي الكلي"),value:P(v)},{label:n("projects.form.paymentSummary.paidAmount","إجمالي المدفوع"),value:P(g)},{label:n("projects.form.paymentSummary.paidPercent","نسبة الدفعات"),value:`${j(w.toFixed(2))}%`},{label:n("projects.form.paymentSummary.remaining","المتبقي"),value:P(T)}];Te.innerHTML=E.map(({label:D,value:_})=>`
        <div class="project-details-grid-item">
          <span>${o(D)}</span>
          <strong>${o(_)}</strong>
        </div>
      `).join("")},re=(m="auto")=>{if(!N)return;const h=N.dataset?.userSelected==="true";if(m==="auto"&&h)return;const{finance:v,progress:g}=Me(),w=ut({manualStatus:h?N.value:e.paymentStatus||"unpaid",paidAmount:g.paidAmount,paidPercent:g.paidPercent,totalAmount:v.totalWithTax});h||(N.value=w)},xe=()=>{Qe(),de(),re("auto")},pe=1e-4,Re=()=>{const m=ce?.value==="amount"?"amount":"percent",h=j(K?.value||"").replace("%","").trim();let v=Number.parseFloat(h);if(!Number.isFinite(v)||v<=0){F(n("projects.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة")),K?.focus();return}const g=Me(),w=Number.isFinite(Number(g.finance.totalWithTax))?Number(g.finance.totalWithTax):0;if(w<=0){F(n("projects.toast.paymentTotalMissing","⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة"));return}const T=Number(g.progress.paidAmount)||0,E=Number(g.progress.paidPercent)||0;let D=null,_=null;if(m==="percent"){const z=Math.max(0,100-E);if(z<=pe){F(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(v>z){v=z;const ae=j(v.toFixed(2));F(n("projects.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",ae))}_=Math.round(v*100)/100,w>0&&(D=Math.round(_/100*w*100)/100)}else{const z=Math.max(0,w-T);if(z<=pe){F(n("projects.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة"));return}if(v>z){v=z;const ae=`${j(v.toFixed(2))} ${Ye}`;F(n("projects.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",ae))}D=Math.round(v*100)/100,w>0&&(_=Math.round(D/w*100*100)/100)}const te={type:m,amount:D??null,percentage:_??null,value:m==="amount"?D:_,note:null,recordedAt:new Date().toISOString()};t.payments=[...je(),te],K&&(K.value=""),ce&&(ce.value="percent"),xe(),F(n("projects.toast.paymentAdded","✅ تم تسجيل الدفعة"))},$e=m=>{!I||!M||Pe||(Pe=!0,m==="share"?M.checked?(I.checked||(I.checked=!0),ct(M)):I.checked&&(I.checked=!1):m==="tax"&&(I.checked?ct(M):M.checked&&(M.checked=!1)),Pe=!1)};function Ne(){f&&(f.innerHTML=Zt(t.expenses))}Ne(),xe(),R&&!R.dataset.listenerAttached&&(R.addEventListener("input",m=>{const h=m.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""),de(),re("auto"))}),R.dataset.listenerAttached="true"),i&&!i.dataset.listenerAttached&&(i.addEventListener("input",m=>{const h=m.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""))}),i.dataset.listenerAttached="true"),k&&!k.dataset.listenerAttached&&(k.addEventListener("change",()=>{de(),re("auto")}),k.dataset.listenerAttached="true"),K&&!K.dataset.listenerAttached&&(K.addEventListener("input",m=>{const h=m.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""))}),K.dataset.listenerAttached="true"),N&&!N.dataset.listenerAttached&&(N.addEventListener("change",()=>{N.dataset.userSelected="true"}),N.dataset.listenerAttached="true"),l&&!l.dataset.listenerAttached&&(l.addEventListener("input",m=>{const h=m.target;h instanceof HTMLInputElement&&(h.value=j(h.value||""))}),l.dataset.listenerAttached="true"),M&&!M.dataset.listenerAttached&&(M.addEventListener("change",()=>{$e("share"),de(),re("auto")}),M.dataset.listenerAttached="true"),I&&!I.dataset.listenerAttached&&(I.addEventListener("change",()=>{$e("tax"),de(),re("auto")}),I.dataset.listenerAttached="true"),M?.checked&&ct(M),$e(M?.checked?"share":"tax"),de(),re("auto"),c&&c.addEventListener("click",m=>{m.preventDefault();const h=r?.value.trim()||"",v=j(l?.value||"0"),g=Number(v),w=j(i?.value||"0"),T=Number(w),E=(u?.value||"").trim();if(!h){F(n("projects.toast.missingExpenseLabel","⚠️ يرجى إدخال وصف المصروف")),r?.focus();return}if(!Number.isFinite(g)||g<=0){F(n("projects.toast.invalidExpenseAmount","⚠️ يرجى إدخال مبلغ صحيح")),l?.focus();return}t.expenses.push({id:`expense-${e.id}-${Date.now()}`,label:h,amount:g,salePrice:Number.isFinite(T)&&T>0?T:0,note:E||""}),r&&(r.value=""),l&&(l.value=""),i&&(i.value=""),u&&(u.value=""),Ne(),de(),re("auto")}),f&&(f.addEventListener("click",m=>{const h=m.target.closest('[data-action="remove-expense"]');if(!h)return;const{id:v}=h.dataset;t.expenses=t.expenses.filter(g=>String(g.id)!==String(v)),Ne(),de(),re("auto")}),f.addEventListener("input",m=>{const h=m.target;if(!(h instanceof HTMLInputElement))return;const v=h.dataset.expenseId,g=h.dataset.expenseField;if(!v||!g)return;const w=t.expenses.findIndex(E=>String(E.id)===String(v));if(w===-1)return;let T=h.value;if(g==="amount"||g==="salePrice"){const E=j(T||""),D=Number.parseFloat(E);Number.isFinite(D)&&D>=0?t.expenses[w][g]=D:(T===""||E==="")&&(t.expenses[w][g]=0),de(),re("auto")}else(g==="label"||g==="note")&&(t.expenses[w][g]=T)})),le&&!le.dataset.listenerAttached&&(le.addEventListener("click",m=>{m.preventDefault(),Re()}),le.dataset.listenerAttached="true"),se&&!se.dataset.listenerAttached&&(se.addEventListener("click",m=>{const h=m.target.closest('[data-action="remove-payment"]');if(!h)return;const v=Number.parseInt(h.dataset.index||"-1",10);if(!Number.isInteger(v)||v<0)return;const g=je();if(v>=g.length)return;const w=g.filter((T,E)=>E!==v);t.payments=w,xe(),F(n("projects.toast.paymentRemoved","🗑️ تم حذف الدفعة"))}),se.dataset.listenerAttached="true"),a.addEventListener("submit",async m=>{if(m.preventDefault(),a.dataset.submitting==="true")return;const h=a.querySelector('[name="project-title"]'),v=a.querySelector('[name="project-type"]'),g=a.querySelector('[name="project-description"]'),w=h?.value.trim()||"",T=v?.value||"",E=j(d?.value.trim()||""),D=j(y?.value.trim()||""),_=g?.value.trim()||"",te=(N?.value||"unpaid").toLowerCase(),z=["paid","partial"].includes(te)?te:"unpaid";if(!w||!T||!E){F(n("projects.toast.missingRequiredFields","⚠️ يرجى تعبئة البيانات المطلوبة")),h?.focus();return}const ae=j(S?.value.trim()||""),Ze=j(O?.value.trim()||""),Ee=kt(E,D),C=ae?kt(ae,Ze):"",et=new Date(Ee),Ce=C?new Date(C):null;if(Ce&&et>Ce){F(n("projects.toast.invalidDateRange","⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية")),S?.focus();return}if($.projects.findIndex(U=>String(U.id)===String(e.id))===-1){F(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}const tt=Ae(),{equipmentEstimate:at,servicesClientPrice:Se,discountValue:nt,discountTypeValue:st,applyTax:ke,companyShareEnabled:_e,companySharePercent:rt,finance:Q}=tt,ot=ce?.value==="amount"?"amount":"percent",Be=j(K?.value||"");let be=Be?Number.parseFloat(Be):null,G=[...je()];if(Number.isFinite(be)&&be>0&&Number.isFinite(Number(Q.totalWithTax))){const U=Ue({totalAmount:Q.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:G}),Y=new Date().toISOString();if(ot==="percent"){const V=Math.max(0,100-(U.paidPercent||0));if(V>pe){const ye=Math.min(be,V),W=Math.round(ye*100)/100,Z=Q.totalWithTax>0?Math.round(W/100*Q.totalWithTax*100)/100:null;G=[...G,{type:"percent",amount:Z,percentage:W,value:W,note:null,recordedAt:Y}]}}else{const V=Math.max(0,Q.totalWithTax-(U.paidAmount||0));if(V>pe){const ye=Math.min(be,V),W=Math.round(ye*100)/100,Z=Q.totalWithTax>0?Math.round(W/Q.totalWithTax*100*100)/100:null;G=[...G,{type:"amount",amount:W,percentage:Z,value:W,note:null,recordedAt:Y}]}}G!==t.payments&&(t.payments=G,xe()),K&&(K.value=""),ce&&(ce.value="percent"),be=null}const x=Ue({totalAmount:Q.totalWithTax,paidAmount:t.basePaidAmount||0,paidPercent:t.basePaidPercent||0,history:G}),L=N?.dataset?.userSelected==="true",H=ut({manualStatus:L?z:e.paymentStatus||z,paidAmount:x.paidAmount,paidPercent:x.paidPercent,totalAmount:Q.totalWithTax}),J=L?z:H;!L&&N&&(N.value=J),N?.dataset&&delete N.dataset.userSelected,t.payments=G;const B=Ya({projectCode:e.projectCode,title:w,type:T,clientId:e.clientId,clientCompany:e.clientCompany,description:_,start:Ee,end:C||null,applyTax:ke,paymentStatus:J,equipmentEstimate:at,expenses:t.expenses,servicesClientPrice:Se,discount:nt,discountType:st,companyShareEnabled:_e&&ke,companySharePercent:_e&&ke?rt:null,companyShareAmount:Q.companyShareAmount,taxAmount:Q.taxAmount,totalWithTax:Q.totalWithTax,confirmed:e.confirmed,technicians:Array.isArray(e.technicians)?e.technicians:[],equipment:Aa(e),paidAmount:x.paidAmount,paidPercentage:x.paidPercent,paymentProgressType:x.paymentProgressType,paymentProgressValue:x.paymentProgressValue,payments:G}),q=Xe?.checked===!0;q&&(B.status="cancelled",B.cancelled=!0),a.dataset.submitting="true";try{const U=await Wt(e.projectId??e.id,B),Y=U?.projectId??U?.id??e.id;if(!q)try{const V={start:Ee};C&&(V.end=C),await $a(Y,V)}catch(V){console.warn("⚠️ failed to sync linked reservations schedule",V)}if(await Na(Y,J),q)try{await Ea(Y)}catch(V){console.warn("⚠️ failed to cancel linked reservations",V)}$.projects=jt(),$.reservations=wt(),F(n("projects.toast.updated","✅ تم تحديث المشروع بنجاح")),we(),Fe(),Ie(),ve(e.id)}catch(U){console.error("❌ [projects] Failed to update project from details view",U);const Y=Ge(U)?U.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");F(Y,"error")}finally{delete a.dataset.submitting}})}function It(e){if(!e)return;const t={projectId:e.id,customerId:e.clientId||null,start:e.start||null,end:e.end||null,forceNotes:!!e.description,fromProjectForm:!0,draftStorageKey:"projects:create:draft",returnUrl:`projects.html?project=${encodeURIComponent(e.id)}&linked=1#projects-section`};yt({dashboardTab:"reservations-tab",dashboardSubTab:"create-tab"}).catch(r=>{console.warn("⚠️ [projects] Failed to persist dashboard tab preference",r)});let a="";try{a=encodeURIComponent(JSON.stringify(t))}catch(r){console.warn("⚠️ [projects] Unable to encode reservation context",r)}b.detailsModalEl&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(b.detailsModalEl)?.hide();const s=a?`?reservationProjectContext=${a}`:"";window.location.href=`dashboard.html${s}#reservations`}async function gn(e){if(!e)return;const t=$.projects.find(a=>String(a.id)===String(e));if(!t){F(n("projects.toast.editMissing","⚠️ تعذّر العثور على المشروع المطلوب تعديله"));return}if(t.confirmed===!0||t.confirmed==="true"){F(n("projects.toast.alreadyConfirmed","ℹ️ المشروع مؤكّد مسبقًا"));return}try{await Wt(t.projectId??t.id,{confirmed:!0});const a=await xa(e);$.projects=jt(),$.reservations=wt(),we(),Fe(),Ie(),b.detailsModalEl&&b.detailsModalEl.classList.contains("show")&&b.detailsBody?.dataset.projectId===String(e)&&ve(e),document.dispatchEvent(new CustomEvent("projects:changed")),a&&document.dispatchEvent(new CustomEvent("reservations:changed")),F(n("projects.toast.confirmed","✅ تم تأكيد المشروع"))}catch(a){console.error("❌ [projects] confirmProject failed",a);const s=Ge(a)?a.message:n("projects.toast.updateFailed","تعذر تحديث المشروع، حاول مرة أخرى");F(s,"error")}}function jn(e,t={clientName:"",clientCompany:"",expenses:[]}){const{date:a,time:s}=Ct(e.start||""),{date:r,time:l}=Ct(e.end||""),i=e.applyTax===!0||e.applyTax==="true";typeof e.paymentStatus=="string"&&e.paymentStatus.toLowerCase();const u=e.discountType==="amount"?"amount":"percent",c=j(String(e.discount??e.discountValue??0));j(String(e.servicesClientPrice??e.services_client_price??0));const f=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??e.companyShareAmountPercent??pt,d=Number.parseFloat(j(String(f))),y=Number.isFinite(d)&&d>0?d:pt,S=e.companyShareEnabled===!0||e.companyShareEnabled==="true"||e.company_share_enabled===!0||e.company_share_enabled==="true"||i&&Number.isFinite(d)&&d>0,O="",N=e?.cancelled===!0||e?.cancelled==="true"||String(e?.status||"").toLowerCase()==="cancelled"||String(e?.status||"").toLowerCase()==="canceled";return`
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${o(n("projects.form.labels.title","عنوان المشروع"))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${o(e.title||"")}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${o(n("projects.form.labels.type","نوع المشروع"))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${xn(e.type)}
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
          ${Zt(t.expenses)}
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
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${o(String(y))}" ${S?"checked":""}>
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
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control project-edit-input-xs" value="${o(O)}" placeholder="0" inputmode="decimal">
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
  `}function xn(e){return["commercial","coverage","photography","social"].map(a=>{const s=ta(a),r=a===e?"selected":"";return`<option value="${o(a)}" ${r}>${o(s)}</option>`}).join("")}function Zt(e=[]){const t=o(n("actions.remove","إزالة")),a=o(n("projects.expenses.table.headers.service","الخدمة")),s=o(n("projects.expenses.table.headers.cost","التكلفة (SR)")),r=o(n("projects.expenses.table.headers.sale","سعر البيع (SR)")),l=o(n("projects.expenses.table.headers.note","ملاحظات")),i=o(n("projects.expenses.table.headers.actions","الإجراءات"));if(!Array.isArray(e)||e.length===0){const y=o(n("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"));return`
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
      </div>`}const u=e.map(y=>{const S=o(String(y?.id||"")),O=o(String(y?.label||"")),N=Number(y?.amount)||0,I=Number(y?.salePrice??y?.sale_price??0)||0,M=o(String((y?.note??y?.notes)||""));return`
      <tr>
        <td>
          <input type="text" class="form-control form-control-sm" value="${O}" data-expense-id="${S}" data-expense-field="label" placeholder="${o(n("projects.form.placeholders.expenseLabel","الوصف"))}">
        </td>
        <td>
          <input type="text" class="form-control form-control-sm" value="${o(String(N))}" data-expense-id="${S}" data-expense-field="amount" inputmode="decimal" placeholder="0">
        </td>
        <td>
          <input type="text" class="form-control form-control-sm" value="${o(String(I))}" data-expense-id="${S}" data-expense-field="salePrice" inputmode="decimal" placeholder="0">
        </td>
        <td>
          <input type="text" class="form-control form-control-sm" value="${M}" data-expense-id="${S}" data-expense-field="note" placeholder="${o(n("projects.form.labels.expenseNote","ملاحظات"))}">
        </td>
        <td>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${S}" aria-label="${t}">✖</button>
        </td>
      </tr>
    `}).join(""),c=e.reduce((y,S)=>y+(Number(S?.salePrice??S?.sale_price)||0),0),f=o(P(c)),d=o(n("projects.expenses.table.totalSale","مجموع سعر البيع"));return`
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
  `}function Sn(e=[]){return!Array.isArray(e)||e.length===0?`<div class="reservation-payment-history-empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`:`<ul class="reservation-payment-history-list">${e.map(t=>{const a=t?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):t?.type==="amount"?n("reservations.paymentHistory.type.amount","دفعة مالية"):n("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?o(P(Number(t.amount))):"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${j(Number(t.percentage).toFixed(2))}%`:"—",l=t?.recordedAt?j(gt(t.recordedAt)):"—",i=t?.note?`<div class="payment-history-note">${o(j(t.note))}</div>`:"";return`
      <li>
        <div class="payment-history-entry">
          <span class="payment-history-entry__type">${o(a)}</span>
          <span class="payment-history-entry__amount">${s}</span>
          <span class="payment-history-entry__percent">${r}</span>
          <span class="payment-history-entry__date">${l}</span>
        </div>
        ${i}
      </li>
    `}).join("")}</ul>`}function wn(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="reservation-payment-history__empty">${o(n("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"))}</div>`;const t=e.map((a,s)=>{const r=a?.type==="percent"?n("reservations.paymentHistory.type.percent","دفعة نسبة"):n("reservations.paymentHistory.type.amount","دفعة مالية"),l=Number.isFinite(Number(a?.amount))&&Number(a.amount)>0?o(P(Number(a.amount))):"—",i=Number.isFinite(Number(a?.percentage))&&Number(a.percentage)>0?`${j(Number(a.percentage).toFixed(2))}%`:"—",u=a?.recordedAt?j(gt(a.recordedAt)):"—",c=a?.note?o(j(a.note)):"",f=o(n("reservations.paymentHistory.actions.delete","حذف الدفعة"));return`
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
  `}function Tn(e={}){const a=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Pn).filter(Boolean);if(a.length>0)return a;const s=ze(e.paidPercent??e.paid_percent),r=ze(e.paidAmount??e.paid_amount),l=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=ea(l);return s!=null&&s>0?[{type:"percent",amount:r!=null&&r>0?r:null,percentage:s,value:s,note:null,recordedAt:i}]:r!=null&&r>0?[{type:"amount",amount:r,percentage:null,value:r,note:null,recordedAt:i}]:[]}function Pn(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let a=typeof t=="string"?t.toLowerCase().trim():null;a!=="percent"&&(a="amount");const s=ze(e.amount??(a==="amount"?e.value:null)),r=ze(e.percentage??(a==="percent"?e.value:null)),l=a==="percent"?r??null:s??null,i=e.note??e.memo??null,u=ea(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return a==="amount"&&s==null||a==="percent"&&r==null?null:{type:a,amount:s??null,percentage:r??null,value:l,note:i&&String(i).trim().length?String(i).trim():null,recordedAt:u}}function ze(e){if(e==null||e==="")return null;const t=j(String(e)).replace(/%/g,"").trim();if(!t)return null;const a=Number.parseFloat(t);return Number.isFinite(a)?a:null}function ea(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Mt(e,t){if(!t)return null;const{date:a,time:s}=An(gt(t)),r=e==="start",l=r?"⏱️":"⌛",i=r?n("projects.details.labels.start","بداية المشروع"):n("projects.details.labels.end","نهاية المشروع");return{icon:l,label:i,value:a,meta:s}}function An(e){if(!e||e==="—")return{date:"—",time:""};const t=e.split(" ").filter(Boolean),a=t.shift()||"—",s=t.join(" ");return{date:a,time:s}}function ta(e){if(!e)return n("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return n(t,e)}function aa(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(j(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=Gt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(j(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Pt(e){if(typeof window>"u")return null;try{const s=new URLSearchParams(window.location.search||"").get(e);if(s)return s}catch{}const t=window.location.hash?window.location.hash.replace(/^#/,""):"";if(t&&t.includes(`${e}=`))try{const s=new URLSearchParams(t).get(e);if(s)return s}catch{}return null}function $n(){return Pt(lt)}function Nn(){return Pt(dt)}function En(){if(!(typeof window>"u"||typeof window.history?.replaceState!="function"))try{const e=new URLSearchParams(window.location.search||""),t=window.location.hash?window.location.hash.replace(/^#/,""):"";let a=!1;[lt,dt,"linked"].forEach(c=>{e.has(c)&&(e.delete(c),a=!0)});let s=t,r=!1;if(t)try{const c=new URLSearchParams(t);let f=!1;[lt,dt,"linked"].forEach(d=>{c.has(d)&&(c.delete(d),f=!0)}),f&&(s=c.toString(),r=!0)}catch{}if(!a&&!r)return;const l=window.location.pathname,i=e.toString(),u=`${l}${i?`?${i}`:""}${s?`#${s}`:""}`;window.history.replaceState({},"",u)}catch{}}function Cn(){const e=$n(),t=Nn(),a=Pt("linked");e&&($.pendingProjectDetailId=e),t&&($.pendingProjectEditId=t,$.pendingProjectDetailId||($.pendingProjectDetailId=t)),a!=null&&String(a)!==""&&String(a)!=="0"&&String(a).toLowerCase()!=="false"&&($.pendingLinkedToast=!0),(e||t)&&En()}function kn(){if(!$.pendingProjectDetailId)return;const e=$.pendingProjectDetailId,t=String(e),a=$.projects.find(r=>[r?.id,r?.projectId,r?.project_id].some(i=>i!=null&&String(i)===t));if(!a)return;$.pendingProjectDetailId=null;const s=a?.id??a?.projectId??a?.project_id??t;if(ve(s),$.pendingLinkedToast){$.pendingLinkedToast=!1;try{F(n("projects.toast.linkedReservationCreated","✅ تم ربط الحجز بالمشروع"))}catch{}}if($.pendingProjectEditId!=null){const r=String($.pendingProjectEditId);[a.id,a.projectId,a.project_id].some(i=>i!=null&&String(i)===r)&&($.pendingProjectEditId=null,setTimeout(()=>Qt(a),0))}}function Ln(){document.addEventListener("DOMContentLoaded",()=>{mn(),Cn(),La(),Ot(),Da(),ln(),dn(),Fa(),Ia(),Ma(),Ra(),_a(),Ba(),Ha({onViewDetails:ve}),hn({onOpenProject:ve}),qa(),Dn()}),document.addEventListener("language:changed",Rt),document.addEventListener("language:translationsReady",Rt),document.addEventListener("customers:changed",Fn),document.addEventListener("technicians:updated",In),document.addEventListener("reservations:changed",()=>Va(ve)),document.addEventListener(ba.USER_UPDATED,()=>{we()})}async function Dn(){try{await zt({suppressError:!0}),await Kt()}catch(e){console.error("❌ [projects] Failed to initialise projects data",e);const t=e?.message||n("projects.toast.fetchFailed","تعذر تحميل بيانات المشاريع، حاول لاحقًا");F(t,"error")}finally{Oa(),Ke(),Ua(),Ut(),we(),Ie(),Fe(),kn()}}function Rt(){Ke(),Ut(),we(),Ie(),Fe(),Ot()}function Fn(){za(),Ke()}function In(){Wa(),Ke()}ya();va();ga();Ga();Ln();document.addEventListener("DOMContentLoaded",()=>{Ja(),ja()});const ft=.15,qe={},Mn="https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js";let De=0;const A={projects:[],customers:[],reservations:[],totalProjects:0,filters:{search:"",statuses:["upcoming","ongoing","completed"],payment:"all",range:"all",startDate:"",endDate:""}},p={search:null,payment:null,dateRange:null,customRangeWrapper:null,startDate:null,endDate:null,refreshBtn:null,kpiGrid:null,statusChips:null,table:null,tableBody:null,tableMeta:null,tableEmpty:null,chartCards:{},chartLoaders:{}},Ve=Object.freeze({projects:`
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
  `});let ee=null;const na=["upcoming","ongoing","completed"];async function Rn({forceProjects:e=!1}={}){try{await zt({suppressError:!0}),await Xa({force:e})}catch(t){console.error("❌ [projectsReports] Failed to load initial data",t),Ge(t)&&console.warn("Projects API error:",t.message)}ia()}async function _n(){qn(),ra(),await Bn();try{await Rn({forceProjects:!0}),la(),Kn(),ie()}finally{oa()}document.addEventListener("language:changed",Jn),document.addEventListener("projects:changed",()=>{ht().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after projects change",e)})}),document.addEventListener("reservations:changed",()=>{ht().catch(e=>{console.error("❌ [projectsReports] Failed to refresh after reservations change",e)})}),window.addEventListener("storage",Yn)}document.addEventListener("DOMContentLoaded",_n);async function Bn(){if(ee)return ee;if(typeof window>"u")return null;if(window.ApexCharts)return ee=window.ApexCharts,ee;try{await Hn(Mn),ee=window.ApexCharts||null}catch(e){console.warn("ApexCharts failed to load",e),ee=null}return ee}function Hn(e){return new Promise((t,a)=>{if(typeof document>"u"){a(new Error("Document is not available to load scripts."));return}const s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded==="true"){t();return}s.addEventListener("load",t,{once:!0}),s.addEventListener("error",()=>a(new Error(`Failed to load script ${e}`)),{once:!0});return}const r=document.createElement("script");r.src=e,r.async=!0,r.dataset.loaded="false",r.onload=()=>{r.dataset.loaded="true",t()},r.onerror=()=>a(new Error(`Failed to load script ${e}`)),document.head.appendChild(r)})}function qn(){p.search=document.getElementById("reports-search"),p.statusChips=document.getElementById("reports-status-chips"),p.payment=document.getElementById("reports-payment"),p.dateRange=document.getElementById("reports-date-range"),p.customRangeWrapper=document.getElementById("reports-custom-range"),p.startDate=document.getElementById("reports-start-date"),p.endDate=document.getElementById("reports-end-date"),p.refreshBtn=document.getElementById("reports-refresh"),p.kpiGrid=document.getElementById("reports-kpi-grid"),p.table=document.getElementById("reports-table"),p.tableBody=p.table?.querySelector("tbody"),p.tableMeta=document.getElementById("reports-table-meta"),p.tableEmpty=document.getElementById("reports-empty"),p.chartCards={},p.chartLoaders={},document.querySelectorAll("[data-chart-card]").forEach(e=>{const t=e.dataset.chartCard;if(!t)return;p.chartCards[t]=e;const a=e.querySelector("[data-chart-loading]");a&&(p.chartLoaders[t]=a)})}function sa(e){const t=!!e;Object.entries(p.chartCards||{}).forEach(([a,s])=>{if(!s)return;s.classList.toggle("is-loading",t),s.setAttribute("aria-busy",t?"true":"false");const r=p.chartLoaders?.[a];r&&(r.hidden=!t)})}function ra(){De+=1,De===1&&sa(!0)}function oa(){De=Math.max(0,De-1),De===0&&sa(!1)}function ia(){const{customers:e=[]}=Vt();A.customers=Array.isArray(e)?e:[],A.reservations=wt();const t=new Map(A.customers.map(s=>[String(s.id),s])),a=jt();A.projects=Array.isArray(a)?a.map(s=>Vn(s,t)):[],A.totalProjects=A.projects.length}function Vn(e,t){const a=e.paymentStatus==="paid"?"paid":"unpaid",s=t.get(String(e.clientId)),r=On(e.id),l=r.reduce((M,R)=>M+Un(R),0),i=zn(e),u=Number(e?.equipmentEstimate)||0,c=Number((u+i).toFixed(2)),f=e?.applyTax===!0||e?.applyTax==="true",d=f?Number((c*ft).toFixed(2)):0,y=f?Number(((c+l)*ft).toFixed(2)):0,S=Number((c+l+y).toFixed(2)),O=Wn(e),N=e.start?new Date(e.start):null,I=e.end?new Date(e.end):null;return{raw:e,id:e.id,projectCode:e.projectCode||e.id,title:(e.title||"").trim(),clientId:e.clientId,clientName:s?.customerName||s?.name||"",clientCompany:e.clientCompany||s?.companyName||"",type:e.type||e.projectType||"",description:e.description||"",paymentStatus:a,confirmed:e.confirmed===!0||e.confirmed==="true",start:N,end:I,applyTax:f,status:O,reservationsTotal:Number(l.toFixed(2)),expensesTotal:i,subtotal:c,taxAmount:d,combinedTaxAmount:y,overallTotal:S,unpaidValue:a==="paid"?0:S,reservationsCount:r.length}}function On(e){return Array.isArray(A.reservations)?A.reservations.filter(t=>String(t.projectId)===String(e)):[]}function Un(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],a=e.discount??0,s=Number(j(String(a)))||0,r=e.discountType||"percent",l=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e.technicians)?e.technicians:[],u=Gt(t,s,r,!1,i,{start:e.start,end:e.end});if(Number.isFinite(u))return u;const c=Number(j(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function zn(e){return typeof e.expensesTotal=="number"?Number(e.expensesTotal)||0:Array.isArray(e.expenses)?e.expenses.reduce((t,a)=>t+(Number(a.amount)||0),0):0}function Wn(e){const t=new Date,a=e.start?new Date(e.start):null,s=e.end?new Date(e.end):null;return a&&!Number.isNaN(a.getTime())&&a>t?"upcoming":s&&!Number.isNaN(s.getTime())&&s<t?"completed":"ongoing"}function Kn(){if(p.search){let e;p.search.addEventListener("input",()=>{clearTimeout(e),e=setTimeout(()=>{A.filters.search=p.search.value.trim(),ie()},180)})}p.payment&&(p.payment.value=A.filters.payment,p.payment.addEventListener("change",()=>{A.filters.payment=p.payment.value||"all",ie()})),p.dateRange&&(p.dateRange.addEventListener("change",Gn),p.dateRange.value=A.filters.range),p.startDate&&p.startDate.addEventListener("change",()=>{A.filters.startDate=p.startDate.value,A.filters.range==="custom"&&ie()}),p.endDate&&p.endDate.addEventListener("change",()=>{A.filters.endDate=p.endDate.value,A.filters.range==="custom"&&ie()}),p.refreshBtn&&p.refreshBtn.addEventListener("click",()=>{if(A.filters.range!=="custom"){ie();return}A.filters.startDate=p.startDate?.value||"",A.filters.endDate=p.endDate?.value||"",ie()})}function Gn(e){const t=e.target.value;A.filters.range=t,t==="custom"?p.customRangeWrapper?.classList.add("active"):(p.customRangeWrapper?.classList.remove("active"),A.filters.startDate="",A.filters.endDate="",p.startDate&&(p.startDate.value=""),p.endDate&&(p.endDate.value=""),ie())}async function ht(){ra();try{await Promise.all([Kt(),tn()])}catch(e){console.error("❌ [projectsReports] Data mutation refresh failed",e),Ge(e)&&console.warn("Projects API error:",e.message)}finally{ia(),ie(),oa()}}function Jn(){la(),ie()}function Yn(e){e.key&&!["projects","reservations","customers"].includes(e.key)||ht().catch(t=>{console.error("❌ [projectsReports] Storage sync failed",t)})}function ie(){const e=Xn();At(),es(e),ss(e),rs(e),os(e),is(e),cs(e)}function Xn(){const{search:e,statuses:t,payment:a,range:s,startDate:r,endDate:l}=A.filters,i=ca(e),u=new Date,c=Number(s);let f=null;if(s==="custom"){f=r?new Date(r):null;const d=l?new Date(l):null;return A.projects.filter(y=>!_t(y,t)||!Bt(y,a)||!Ht(y,i)?!1:Zn(y.start,f,d))}return s!=="all"&&Number.isFinite(c)&&(f=new Date,f.setDate(u.getDate()-c)),A.projects.filter(d=>!_t(d,t)||!Bt(d,a)||!Ht(d,i)?!1:s==="all"?!0:Qn(d.start,f,u))}function _t(e,t){return t.includes(e.status)}function Bt(e,t){return t==="all"?!0:e.paymentStatus===t}function Ht(e,t){return t?ca([e.title,e.projectCode,e.clientName,e.clientCompany,e.type,e.description].filter(Boolean).join(" ")).includes(t):!0}function Qn(e,t,a){return!e||!(e instanceof Date)||Number.isNaN(e.getTime())?!1:t?e>=t&&e<=a:!0}function Zn(e,t,a){if(!t&&!a)return!0;if(!e||Number.isNaN(e.getTime()))return!1;const s=e.getTime();return!(t&&!Number.isNaN(t.getTime())&&s<t.getTime()||a&&!Number.isNaN(a.getTime())&&s>a.getTime())}function ca(e){return e?j(String(e)).toLowerCase().trim():""}function es(e){if(!p.kpiGrid)return;const t=e.length,a=e.reduce((i,u)=>i+u.overallTotal,0),s=e.reduce((i,u)=>i+u.unpaidValue,0),r=e.reduce((i,u)=>i+u.expensesTotal,0),l=[{icon:Ve.projects,label:n("projects.reports.kpi.totalProjects","Total projects"),value:bt(t),meta:n("projects.reports.kpi.totalProjectsMeta","After applying the current filters")},{icon:Ve.value,label:n("projects.reports.kpi.totalValue","Total value"),value:ne(a),meta:n("projects.reports.kpi.totalValueMeta","Includes projects and linked reservations")},{icon:Ve.outstanding,label:n("projects.reports.kpi.unpaidValue","Outstanding value"),value:ne(s),meta:n("projects.reports.kpi.unpaidValueMeta","Projects not fully paid yet")},{icon:Ve.expenses,label:n("projects.reports.kpi.expenses","تكلفة الخدمات الإنتاجية"),value:ne(r),meta:n("projects.reports.kpi.expensesMeta","تكلفة الخدمات الإنتاجية للمشاريع المحددة")}];p.kpiGrid.innerHTML=l.map(({icon:i,label:u,value:c,meta:f})=>`
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${i}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${X(u)}</p>
        <p class="reports-kpi-value">${X(c)}</p>
        <span class="reports-kpi-meta">${X(f)}</span>
      </div>
    </div>
  `).join(""),ts(e)}function ts(e){try{const t=as(e),a="projects-revenue-breakdown";let s=document.getElementById(a);const r=[{label:n("reservations.reports.kpi.revenue.details.gross","الإيراد الكلي","Gross revenue"),value:ne(t.grossRevenue)},{label:n("reservations.reports.kpi.revenue.details.share","نسبة الشركة","Company share"),value:ne(t.companyShareTotal)},{label:n("reservations.reports.kpi.revenue.details.tax","الضريبة","Tax"),value:ne(t.taxTotal)},{label:n("reservations.reports.kpi.revenue.details.crewGross","إجمالي الطاقم","Crew total"),value:ne(t.crewTotal)},{label:n("reservations.reports.kpi.revenue.details.crew","تكلفة الطاقم","Crew cost"),value:ne(t.crewCostTotal)},{label:n("reservations.reports.kpi.revenue.details.equipment","إجمالي المعدات","Equipment total"),value:ne(t.equipmentTotalCombined)},{label:n("projects.reports.kpi.revenue.details.projectExpenses","تكلفة الخدمات الإنتاجية","Project expenses"),value:`−${ne(t.projectExpensesTotal)}`},{label:n("reservations.reports.kpi.revenue.details.net","صافي الربح","Net profit"),value:ne(t.netProfit)}],l=`
      <div id="${a}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${r.map(({label:i,value:u})=>`
          <div class="reports-kpi-detail-row d-flex justify-content-between">
            <span class="reports-kpi-detail-label">${X(i)}</span>
            <span class="reports-kpi-detail-value">${X(u)}</span>
          </div>
        `).join("")}
      </div>
    `;s?s.outerHTML=l:p.kpiGrid.insertAdjacentHTML("afterend",l)}catch(t){console.warn("[projectsReports] Failed to render revenue breakdown",t)}}function as(e){const t=new Set(e.map(R=>String(R.id))),a=A.reservations.filter(R=>R.projectId!=null&&t.has(String(R.projectId)));let s=0,r=0,l=0,i=0,u=0,c=0,f=0;a.forEach(R=>{const k=sn(R);s+=k.finalTotal||0,r+=k.equipmentTotal||0,l+=k.crewTotal||0,i+=k.crewCostTotal||0,u+=k.companyShareAmount||0,c+=k.taxAmount||0,f+=k.netProfit||0});const d=e.reduce((R,k)=>R+(Number(k.expensesTotal)||0),0),y=e.reduce((R,k)=>R+(Number(k.raw?.equipmentEstimate)||0),0),S=e.reduce((R,k)=>{const ce=k.applyTax===!0,K=(Number(k.raw?.equipmentEstimate)||0)+(Number(k.expensesTotal)||0),le=ce?K*ft:0;return R+le},0),O=s+y+S,N=r+y,I=c+S,M=f-d;return{grossRevenue:O,companyShareTotal:u,taxTotal:I,crewTotal:l,crewCostTotal:i,equipmentTotalCombined:N,projectExpensesTotal:d,netProfit:M}}function la(){if(!p.statusChips)return;const e=na.map(t=>{const a=n(`projects.status.${t}`,t);return`<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${t}">${X(a)}</button>`}).join("");p.statusChips.innerHTML=e,p.statusChips.dataset.listenerAttached||(p.statusChips.addEventListener("click",ns),p.statusChips.dataset.listenerAttached="true"),At()}function ns(e){const t=e.target.closest("[data-status]");if(!t)return;const a=t.dataset.status;if(!a)return;const s=new Set(A.filters.statuses);s.has(a)?s.delete(a):s.add(a),s.size===0&&na.forEach(r=>s.add(r)),A.filters.statuses=Array.from(s),At(),ie()}function At(){if(!p.statusChips)return;const e=new Set(A.filters.statuses);p.statusChips.querySelectorAll("[data-status]").forEach(t=>{t.classList.toggle("is-active",e.has(t.dataset.status))})}function ss(e){if(!ee)return;const t=document.getElementById("reports-status-chart");if(!t)return;const a=["upcoming","ongoing","completed"],s=a.map(c=>e.filter(f=>f.status===c).length),r=a.map(c=>n(`projects.status.${c}`,c)),i=s.reduce((c,f)=>c+f,0)>0?s:[],u={chart:{type:"donut",height:320,toolbar:{show:!1}},labels:r,series:i,colors:["#3b82f6","#fbbf24","#22c55e"],dataLabels:{formatter:c=>Number.isFinite(c)?`${Math.round(c)}%`:"0%"},legend:{position:"bottom",fontSize:"13px"},stroke:{width:0},tooltip:{y:{formatter:c=>ge(c)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")},responsive:[{breakpoint:1024,options:{chart:{height:280}}}]};Je("status",t,u)}function rs(e){if(!ee)return;const t=document.getElementById("reports-timeline-chart");if(!t)return;const a=new Map,s=new Intl.DateTimeFormat(ds(),{month:"short",year:"numeric"});e.forEach(d=>{if(!d.start||Number.isNaN(d.start.getTime()))return;const y=`${d.start.getFullYear()}-${d.start.getMonth()+1}`,S=a.get(y)||{total:0,label:s.format(d.start)};S.total+=d.overallTotal,a.set(y,S)});const l=Array.from(a.keys()).sort((d,y)=>{const[S,O]=d.split("-").map(Number),[N,I]=y.split("-").map(Number);return S===N?O-I:S-N}).slice(-12),i=l.map(d=>a.get(d)?.label||d),u=l.map(d=>Math.round(a.get(d)?.total||0)),c=u.length?[{name:n("projects.reports.datasets.value","Total value"),data:u}]:[],f={chart:{type:"area",height:320,toolbar:{show:!1}},series:c,xaxis:{categories:i,labels:{rotate:-35}},yaxis:{labels:{formatter:d=>ge(d)}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},fill:{type:"gradient",gradient:{shadeIntensity:.35,opacityFrom:.5,opacityTo:.05}},markers:{size:4},colors:["#4c6ef5"],tooltip:{y:{formatter:d=>ge(d)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("timeline",t,f)}function os(e){if(!ee)return;const t=document.getElementById("reports-expense-chart");if(!t)return;const a=[...e].sort((f,d)=>d.overallTotal-f.overallTotal).slice(0,6),s=a.map(f=>f.title||f.projectCode),r=a.map(f=>Math.round(f.overallTotal)),l=a.map(f=>Math.round(f.expensesTotal)),i=s.length?[{name:n("projects.reports.datasets.value","Total value"),data:r},{name:n("projects.reports.datasets.expenses","تكلفة الخدمات الإنتاجية"),data:l}]:[],c={chart:{type:"bar",height:Math.max(320,s.length*60||0),toolbar:{show:!1}},series:i,plotOptions:{bar:{horizontal:!0,barHeight:"55%",borderRadius:8}},xaxis:{categories:s,labels:{formatter:f=>ge(f)}},dataLabels:{enabled:!1},legend:{position:"bottom",fontSize:"13px"},colors:["#4c6ef5","#f472b6"],tooltip:{y:{formatter:f=>ge(f)}},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("expenses",t,c)}function is(e){if(!ee)return;const t=document.getElementById("reports-clients-chart");if(!t)return;const a=new Map;e.forEach(c=>{const f=c.clientName||c.clientCompany||n("projects.fallback.unknownClient","Unknown client"),d=a.get(f)||0;a.set(f,d+c.overallTotal)});const s=Array.from(a.entries()).sort((c,f)=>f[1]-c[1]).slice(0,6),r=s.map(([c])=>c),l=s.map(([,c])=>Math.round(c)),i=l.length?[{name:n("projects.reports.datasets.value","Total value"),data:l}]:[],u={chart:{type:"bar",height:320,toolbar:{show:!1}},series:i,plotOptions:{bar:{borderRadius:6,columnWidth:"60%"}},xaxis:{categories:r,labels:{rotate:-35}},yaxis:{labels:{formatter:c=>ge(c)}},dataLabels:{enabled:!1},colors:["#3b82f6"],tooltip:{y:{formatter:c=>ge(c)}},legend:{show:!1},noData:{text:n("projects.reports.noData","لا توجد بيانات متاحة")}};Je("clients",t,u)}function Je(e,t,a={}){if(!ee||!t)return;if(qe[e]){try{qe[e].destroy()}catch(r){console.warn(`⚠️ [projectsReports] Failed to destroy ${e} chart`,r)}delete qe[e]}t.innerHTML="";const s={...a};Array.isArray(s.series)||(s.series=[]);try{const r=new ee(t,s);qe[e]=r,r.render().catch(l=>{console.error(`❌ [projectsReports] Failed to render ${e} chart`,l)})}catch(r){console.error(`❌ [projectsReports] Failed to render ${e} chart`,r)}}function cs(e){if(!p.table||!p.tableBody||!p.tableEmpty)return;if(!e.length){p.table.style.display="none",p.tableEmpty.classList.add("active"),p.tableMeta&&(p.tableMeta.textContent="");return}p.table.style.display="",p.tableEmpty.classList.remove("active");const t=e.map(a=>{const s=ls(a.start,a.end),r=n(`projects.status.${a.status}`,a.status),l=n(`projects.paymentStatus.${a.paymentStatus}`,a.paymentStatus),i=a.clientCompany?`${X(a.clientName)} <small class="text-muted">${X(a.clientCompany)}</small>`:X(a.clientName||n("projects.fallback.unknownClient","Unknown client"));return`
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${X(a.title||a.projectCode)}</span>
            <small class="text-muted">${X(`#${a.projectCode}`)}</small>
          </div>
        </td>
        <td>${i}</td>
        <td>${X(r)}</td>
        <td>${X(s)}</td>
        <td>${X(ne(a.overallTotal))}</td>
        <td>${X(l)}</td>
      </tr>
    `}).join("");if(p.tableBody.innerHTML=t,p.tableMeta){const a=n("projects.reports.table.meta","Showing {count} of {total} projects");p.tableMeta.textContent=a.replace("{count}",bt(e.length)).replace("{total}",bt(A.totalProjects))}}function ls(e,t){if(!e&&!t)return"—";const a=e?Et(e.toISOString()):"—",s=t?Et(t.toISOString()):"—";return t?`${a} → ${s}`:a}function ne(e){const t=Number(e)||0,s=We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US",r=new Intl.NumberFormat(s,{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(t));return`${j(r)} SR`}function bt(e){const a=We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return j(new Intl.NumberFormat(a).format(e))}function ge(e){const a=We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US";return j(new Intl.NumberFormat(a,{notation:"compact",compactDisplay:"short"}).format(e))}function ds(){return We()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-US"}function X(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
