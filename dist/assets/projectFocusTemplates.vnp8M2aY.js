import{t,n as m,g as ve}from"./auth.ClhmxLhf.js";import{c as Se,e as s,d as ye,t as Ce,f as u,g as ge,a as Te,r as we,i as Ne,D as me,u as Pe}from"./reservationsService.BFFIn89o.js";const Q=.15,Ae="bg-primary",Re=2,je={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},Fe={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},De={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"};function re(e){if(!e)return null;const n=[e?.id,e?.reservationId,e?.reservation_id,e?.reservationID].find(r=>r!=null&&r!=="");return n!=null?String(n):null}function ce(e=[]){const a=ge();return e.map(n=>{const r=n?.reservation??n;if(!r||typeof r!="object")return null;let o=Number.isInteger(n?.index)&&n.index>=0?n.index:Number.isInteger(n?.reservationIndex)&&n.reservationIndex>=0?n.reservationIndex:null;if(!Number.isInteger(o)||o<0){const i=re(r);i&&(o=a.findIndex(d=>{const c=re(d);return c&&c===i}))}return{reservation:r,index:Number.isInteger(o)&&o>=0?o:-1}}).filter(Boolean)}function ie(e){return e?e.id!=null?String(e.id):e.projectId!=null?String(e.projectId):e.project_id!=null?String(e.project_id):null:null}function He(e,{customer:a=null,techniciansMap:n=new Map,reservations:r=[]}={}){const i=ce(r).map(({reservation:S})=>S),d=ie(e),c=d?s(d):"",l=ye(e),b=t(`projects.status.${l}`,je[l]),v=Fe[l]||"bg-secondary",f=e?.paymentStatus==="paid"?"paid":"unpaid",x=t(`projects.paymentStatus.${f}`,f==="paid"?"Paid":"Unpaid"),$=f==="paid"?"status-paid":"status-unpaid",y=[f==="paid"?"project-focus-card--paid":"project-focus-card--unpaid"],g=e?.confirmed===!0||e?.confirmed==="true";g&&y.push("project-focus-card--confirmed");const h=e?.projectCode||(d?`PRJ-${m(d)}`:""),w=h?m(String(h).replace(/^#/,"")):"",A=w?`<span class="project-code-badge project-focus-card__code">#${s(w)}</span>`:"",_=de(e?.type),R=_?`<span class="badge project-focus-card__badge ${Ae}">${s(_)}</span>`:"",P=`<span class="project-focus-card__status-chip ${v}">${s(b)}</span>`,k=`<span class="reservation-chip ${$} project-focus-card__payment-chip">${s(x)}</span>`,z=(e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"),M=(e?.description||"").trim(),H=M?s(Ce(M,110)):s(t("projects.fallback.noDescription","No description")),q=Array.isArray(e?.technicians)?e.technicians:[],F=q.map(S=>n.get(String(S))?.name).filter(Boolean),D=F.length?Ie(F):"",O=a?.customerName||e?.clientName||"",Y=(e?.clientCompany||a?.companyName||"").trim(),U=i.reduce((S,L)=>{const ae=le(L),ne=(Array.isArray(L?.items)?L.items:[]).reduce((xe,_e)=>xe+(Number(_e?.qty)||0),0),E=Array.isArray(L?.technicians)?L.technicians.length:0;return{total:S.total+ae,equipment:S.equipment+ne,crew:S.crew+E}},{total:0,equipment:0,crew:0}),J=Number(U.total.toFixed(2)),ee=U.equipment,j=U.crew||q.length,I=$e(e),G=I.applyTax?Number(((I.subtotal+J)*Q).toFixed(2)):0,p=Number((I.subtotal+J+G).toFixed(2)),C=[w?{icon:"🆔",label:t("projectCards.meta.code","رقم المشروع"),value:`#${w}`}:null,O?{icon:"👤",label:t("projectCards.meta.client","العميل"),value:O}:null,Y?{icon:"🏢",label:t("projectCards.meta.company","شركة العميل"),value:Y}:null,_?{icon:"🏷️",label:t("projectCards.meta.type","نوع المشروع"),value:_}:null,D?{icon:"👥",label:t("projectCards.stats.crewLabel","عدد الطاقم"),value:D}:null,{icon:"📅",label:t("projectCards.meta.startDate","تاريخ البداية"),value:be(e?.start)},{icon:"📅",label:t("projectCards.meta.endDate","تاريخ النهاية"),value:e?.end?be(e.end):"—"}].filter(Boolean),T=[{icon:"📦",label:t("projectCards.stats.equipmentCount","عدد المعدات"),value:m(String(ee))},{icon:"😎",label:t("projectCards.stats.crewCount","عدد أفراد الطاقم"),value:m(String(j))},{icon:"💵",label:t("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:u(J)}],X=[{icon:"💳",label:t("projectCards.stats.paymentStatus","حالة الدفع"),value:x},{icon:"💸",label:t("projectCards.stats.expensesTotal","إجمالي المصاريف"),value:u(I.expensesTotal)},{icon:"💰",label:t("projectCards.stats.projectSubtotal","التكلفة التقديرية"),value:u(I.subtotal)},{icon:"🧾",label:t("projectCards.stats.taxTotal","الضريبة"),value:u(G)},{icon:"💵",label:t("projectCards.stats.overallTotal","المجموع الكلي"),value:u(p)}],pe=[oe("projectCards.groups.meta","بيانات المشروع",C),oe("projectCards.groups.reservations","موجز الحجز",T),oe("projectCards.groups.payment","ملخص الدفع",X)].filter(Boolean).join(""),N=t("projects.focus.confirmed","✅ مشروع مؤكد"),K=t("projects.focus.pending","⌛ بانتظار التأكيد"),se=`<div class="project-focus-card__actions"><span class="reservation-chip ${g?"status-confirmed":"status-pending"} project-focus-card__confirm-indicator">${s(g?N:K)}</span></div>`,V=[A,R,P,k].filter(Boolean).join(`
          `);return`
    <div class="project-card-grid__item">
      <article class="${["project-focus-card",...y].join(" ")}" data-project-id="${c}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${V}
        </div>
        <h6 class="project-focus-card__title">${s(z)}</h6>
        <p class="project-focus-card__description">${H}</p>
        <div class="project-focus-card__sections">
          ${pe}
        </div>
        ${se}
      </article>
    </div>
  `}function oe(e,a,n=[]){if(!n.length)return"";const r=n.map(({icon:o,label:i,value:d})=>`
        <div class="project-focus-card__row">
          <span class="project-focus-card__row-label">${o?`<span class="project-focus-card__row-icon">${s(o)}</span>`:""}${s(i)}</span>
          <span class="project-focus-card__row-value">${s(String(d))}</span>
        </div>
      `).join("");return`
    <div class="project-focus-card__section">
      <span class="project-focus-card__section-title">${s(t(e,a))}</span>
      <div class="project-focus-card__section-box">
        ${r}
      </div>
    </div>
  `}function Ie(e=[]){if(!e.length)return"";const a=e.slice(0,Re),n=e.length-a.length,r=ve()==="ar"?"، ":", ";let o=a.join(r);return n>0&&(o+=`${r}+${m(String(n))}`),o}function Oe(e,{customer:a=null,reservations:n=[]}={}){const r=ce(n),o=r.map(({reservation:p})=>p),i=$e(e),d=o.reduce((p,C)=>p+le(C),0),c=Number(d.toFixed(2)),l=o.length,b=i.applyTax?Number(((i.subtotal+c)*Q).toFixed(2)):0,v=Number((i.subtotal+c+b).toFixed(2)),f=ye(e),x=t(`projects.status.${f}`,je[f]),$=De[f]||"status-confirmed",y=ie(e)||"",g=e?.projectCode||(y?`PRJ-${m(y)}`:""),h=g?m(String(g).replace(/^#/,"")):"",w=h?`<span class="project-code-badge">#${s(h)}</span>`:"",A=i.applyTax,_=A?t("projects.details.chips.vatOn","شامل الضريبة 15٪"):t("projects.details.chips.vatOff","غير شامل الضريبة"),R=A?"status-paid":"status-unpaid",P=e?.paymentStatus==="paid"?"paid":"unpaid",k=t(`projects.paymentStatus.${P}`,P==="paid"?"Paid":"Unpaid"),z=P==="paid"?"status-paid":"status-unpaid",H=t("projects.details.chips.reservations","{count} حجوزات").replace("{count}",m(String(l))),q=e?.confirmed===!0||e?.confirmed==="true"?`<span class="reservation-chip status-confirmed">${s(t("projects.focus.confirmed","✅ مشروع مؤكد"))}</span>`:"",F=a?.customerName||e?.clientName||"",D=(e?.clientCompany||a?.companyName||"").trim(),Y=(e?.description||"").trim()||t("projects.fallback.noDescription","لا يوجد وصف"),U=[h?{icon:"🆔",label:t("projects.details.labels.code","رقم المشروع"),value:`#${h}`}:null,F?{icon:"👤",label:t("projects.details.client","العميل"),value:F}:null,D?{icon:"🏢",label:t("projects.details.company","شركة العميل"),value:D}:null,{icon:"🏷️",label:t("projects.details.type","نوع المشروع"),value:de(e?.type)},{icon:"🗓️",label:t("projects.details.labels.start","تاريخ البداية"),value:Z(e?.start)},{icon:"🗓️",label:t("projects.details.labels.end","تاريخ النهاية"),value:e?.end?Z(e.end):"—"},{icon:"🔗",label:t("projects.details.labels.reservationsCount","عدد الحجوزات"),value:m(String(l))}].filter(Boolean),J=t("projects.details.expenses","المصروفات ({amount})").replace("{amount}",u(i.expensesTotal)),ee=i.expensesTotal>0?`<ul class="project-details-list">${(e?.expenses||[]).map(p=>`
          <li>
            <span class="project-expense-label">${s(p.label??"")}</span>
            <span class="project-expense-amount">${u(p.amount)}</span>
          </li>
        `).join("")}</ul>`:`<div class="text-muted">${s(t("projects.details.noItems","لا يوجد"))}</div>`;let j=[];if(j.push({icon:"💳",label:t("projects.details.summary.paymentStatus","حالة الدفع"),value:k}),l>0){const p=o.reduce((W,ne)=>{const E=typeof computeReservationFinancials=="function"?computeReservationFinancials(ne):null;return E&&typeof E=="object"&&(W.equipment+=Number(E.equipmentTotal||0),W.crew+=Number(E.crewTotal||0),W.crewCost+=Number(E.crewCostTotal||0)),W},{equipment:0,crew:0,crewCost:0}),C=Number(i.expensesTotal||0),T=Number((p.equipment+p.crew).toFixed(2)),X=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let N=(e?.discountType==="amount"?"amount":"percent")==="amount"?X:T*(X/100);(!Number.isFinite(N)||N<0)&&(N=0),N>T&&(N=T);const K=e?.applyTax===!0||e?.applyTax==="true",ue=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",te=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,se=ue&&K&&te>0?te:0,V=Math.max(0,T-N),B=Number((V*(se/100)).toFixed(2)),S=K?Number(((V+B)*Q).toFixed(2)):0,L=Number((V-B-S-C-p.crewCost).toFixed(2)),ae=Number((V+B+S).toFixed(2));p.equipment>0&&j.push({icon:"🎛️",label:t("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:u(p.equipment)}),p.crew>0&&j.push({icon:"😎",label:t("projects.details.summary.crewTotal","إجمالي الفريق"),value:u(p.crew)}),p.crewCost>0&&j.push({icon:"🧾",label:t("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:u(p.crewCost)}),C>0&&j.push({icon:"🧾",label:t("projects.details.summary.expensesTotal","مصروفات المشروع"),value:u(C)}),j.push({icon:"🧮",label:t("projects.details.summary.gross","الإجمالي"),value:u(T)}),N>0&&j.push({icon:"🏷️",label:t("projects.details.summary.discount","الخصم"),value:`−${u(N)}`}),B>0&&j.push({icon:"🏦",label:t("projects.details.summary.companyShare","نسبة الشركة"),value:`−${u(B)}`}),S>0&&j.push({icon:"💸",label:t("projects.details.summary.tax","الضريبة (15٪)"),value:`−${u(S)}`}),j.push({icon:"💵",label:t("projects.details.summary.netProfit","صافي الربح"),value:u(L)}),j.push({icon:"💰",label:t("projects.details.summary.finalTotal","المجموع النهائي"),value:u(ae)})}else j.push({icon:"💼",label:t("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:u(i.subtotal)}),j.push({icon:"🧮",label:t("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:u(b)}),j.push({icon:"💰",label:t("projects.details.summary.overallTotal","الإجمالي الكلي"),value:u(v)});const I=j.map(({icon:p,label:C,value:T})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${s(p)} ${s(C)}</span>
      <span class="summary-details-value">${s(T)}</span>
    </div>
  `).join(""),G=Le({project:e,reservations:r});return`
    <div class="project-details-header mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h5 class="mb-2 d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted project-details-title-label">${s(t("projects.details.labels.projectTitle","اسم المشروع"))}:</span>
            <span class="fw-bold project-details-title-text">${s((e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"))}</span>
            ${w}
          </h5>
        </div>
        <div class="status-chips d-flex flex-wrap gap-2">
          <span class="status-chip ${$}">${s(x)}</span>
          <span class="status-chip ${R}">${s(_)}</span>
          <span class="reservation-chip ${z}">${s(k)}</span>
          <span class="reservation-chip status-confirmed">${s(H)}</span>
          ${q}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${U.map(({icon:p,label:C,value:T})=>he(p,C,T)).join("")}
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(t("projects.details.labels.notes","ملاحظات المشروع"))}</h6>
      <div class="project-notes">${s(Y)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(J)}</h6>
      ${ee}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${I}
    </div>
    ${G}
  `}function Le({reservations:e=[],project:a=null}={}){const r=[...ce(e)].sort((c,l)=>{const b=c?.reservation?.start?new Date(c.reservation.start).getTime():0;return(l?.reservation?.start?new Date(l.reservation.start).getTime():0)-b}),o=t("projects.details.reservations.title","الحجوزات المرتبطة"),i=t("projects.details.reservations.empty","لا توجد حجوزات مرتبطة بهذا المشروع بعد."),d=r.length?`<div class="project-reservations-list">${r.map(({reservation:c,index:l})=>Ee(c,l,a)).join("")}</div>`:`<div class="alert alert-info project-reservations-empty mb-0">${s(i)}</div>`;return`
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex align-items-center gap-2 flex-wrap">
        <h6 class="mb-0">${s(o)}</h6>
      </div>
      ${d}
    </section>
  `}function Ee(e,a=-1,n=null){const r=re(e)??"-",o=m(String(r)),i=ke(e?.start,e?.end),d=le(e),c=u(d),l=m(String((e?.items||[]).length)),b=m(String((e?.technicians||[]).length)),v=t("projects.details.reservations.itemsCount","{count} معدة").replace("{count}",l),f=t("projects.details.reservations.crewCount","{count} من الطاقم").replace("{count}",b),{effectiveConfirmed:x}=we(e,n),$=x?t("reservations.list.status.confirmed","✅ مؤكد"):t("reservations.list.status.pending","⏳ غير مؤكد"),y=x?"project-reservation-card__badge--confirmed":"project-reservation-card__badge--pending",g=e?.paid===!0||e?.paid==="paid",h=g?t("reservations.list.payment.paid","💳 مدفوع"):t("reservations.list.payment.unpaid","💳 غير مدفوع"),w=g?"project-reservation-card__badge--paid":"project-reservation-card__badge--unpaid",_=Ne(e)?`<span class="project-reservation-card__badge project-reservation-card__badge--completed">${s(t("reservations.list.status.completed","📁 منتهي"))}</span>`:"",R=Number.isInteger(a)&&a>=0?` data-index="${a}"`:"",P=`<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${s(String(r??""))}"${R}>${s(t("projects.details.reservations.view","عرض الحجز"))}</button>`;return`
    <article class="project-reservation-card" data-reservation-id="${s(o)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${s(o)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${y}">${s($)}</span>
          <span class="project-reservation-card__badge ${w}">${s(h)}</span>
          ${_}
        </div>
      </div>
      <div class="project-reservation-card__range">${s(i)}</div>
      <div class="project-reservation-card__meta">
        <span>📦 ${s(v)}</span>
        <span>😎 ${s(f)}</span>
      </div>
      <div class="project-reservation-card__footer">
        <span class="text-muted">${s(t("projectCards.stats.reservationValue","إجمالي الحجوزات"))}</span>
        <span class="fw-bold">${s(c)}</span>
        ${P}
      </div>
    </article>
  `}function he(e,a,n){return`
    <div class="res-info-row">
      <span class="label">${s(e)} ${s(a)}</span>
      <span class="separator">:</span>
      <span class="value">${s(n)}</span>
    </div>
  `}function $e(e){const a=Number(e?.equipmentEstimate)||0,n=Se(e),r=a+n,o=e?.applyTax===!0||e?.applyTax==="true",i=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?i:r*(i/100);(!Number.isFinite(c)||c<0)&&(c=0),c>r&&(c=r);const l=Math.max(0,r-c),b=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",v=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,f=b&&o&&v>0?v:0,x=f>0?Number((l*(f/100)).toFixed(2)):0,$=l+x;let y=o?$*Q:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let g=o?Number(e?.totalWithTax):$;return o?(!Number.isFinite(g)||g<=0)&&(g=Number(($+y).toFixed(2))):g=$,{equipmentEstimate:a,expensesTotal:n,baseSubtotal:r,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:x,subtotal:$,applyTax:o,taxAmount:y,totalWithTax:g}}function le(e){if(!e)return 0;const a=Array.isArray(e?.items)?e.items:[],n=e?.discount??0,r=Number(m(String(n)))||0,o=e?.discountType||"percent",i=Array.isArray(e?.crewAssignments)?e.crewAssignments:[],d=i.length?i:Array.isArray(e?.technicians)?e.technicians:[],c=Te(a,r,o,!1,d,{start:e?.start,end:e?.end});if(Number.isFinite(c))return c;const l=Number(m(String(e?.cost??e?.total??0)));return Number.isFinite(l)?Math.round(l):0}function be(e){if(!e)return"—";const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const r=ve()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-GB",o=new Intl.DateTimeFormat(r,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return m(o.format(a))}function Z(e){if(!e)return"—";const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=String(a.getDate()).padStart(2,"0"),r=String(a.getMonth()+1).padStart(2,"0"),o=String(a.getFullYear()),i=String(a.getMinutes()).padStart(2,"0"),d=a.getHours(),c=d>=12?"PM":"AM",l=d%12||12,b=String(l).padStart(2,"0"),v=`${n}/${r}/${o} ${b}:${i} ${c}`;return m(v)}function ke(e,a){if(!e)return"—";const n=Z(e);return a?`${n} - ${Z(a)}`:n}function de(e){if(!e)return t("projects.form.types.unknown","نوع غير محدد");const n={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return t(n,e)}function Ue(e,{clientName:a="",clientCompany:n=""}={}){const r=ie(e)||"",o=e?.projectCode||(r?`PRJ-${m(r)}`:""),i=o?m(String(o)):"",d=Me(e?.type),c=fe(e?.start||""),l=fe(e?.end||""),b=typeof e?.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",v=["paid","partial"].includes(b)?b:"unpaid",f=e?.applyTax===!0||e?.applyTax==="true",x=e?.description||"",$=e?.discountType==="amount"?"amount":"percent",y=m(String(e?.discount??e?.discountValue??0)),g=e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??me,h=Number.parseFloat(m(String(g))),w=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true"||f&&Number.isFinite(h)&&h>0,A=Number.isFinite(h)&&h>0?h:me,_=e?.paymentProgressType==="amount"?"amount":e?.paymentProgressType==="percent"?"percent":e?.payment_progress_type==="amount"?"amount":(e?.payment_progress_type==="percent","percent"),R=m(String(e?.paymentProgressValue??e?.payment_progress_value??(_==="amount"?e?.paidAmount??e?.paid_amount:e?.paidPercent??e?.paid_percent)??"")),P=t("projects.details.labels.code","رقم المشروع"),k=t("projects.form.labels.client","العميل"),z=t("projects.form.labels.clientCompany","شركة العميل"),M=[i?{icon:"🆔",label:P,value:`#${i}`}:null,a?{icon:"👤",label:k,value:a}:null,n?{icon:"🏢",label:z,value:n}:null].filter(Boolean),H=M.length?`<div class="project-details-info mb-3">
        ${M.map(({icon:F,label:D,value:O})=>he(F,D,O)).join("")}
      </div>`:"",q=qe(Array.isArray(e?.expenses)?e.expenses:[]);return`
    <div class="project-details-edit">
      <div class="project-details-header mb-3">
        <h5 class="fw-bold mb-1">${s(t("projects.details.edit.heading","تعديل المشروع"))}</h5>
        <p class="text-muted small mb-0">${s(t("projects.details.edit.subheading","قم بتحديث بيانات المشروع ثم احفظ التغييرات."))}</p>
      </div>
      ${H}
      <form id="project-details-edit-form" class="project-details-edit-form">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label" for="project-edit-title">${s(t("projects.form.labels.title","اسم المشروع"))}</label>
            <input type="text" class="form-control" id="project-edit-title" name="project-title" value="${s(e?.title||"")}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-type">${s(t("projects.form.labels.type","نوع المشروع"))}</label>
            <select class="form-select" id="project-edit-type" name="project-type" required>
              ${d}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-date">${s(t("projects.form.labels.startDate","📅 تاريخ البداية"))}</label>
            <input type="date" class="form-control" id="project-edit-start-date" name="project-start-date" value="${s(c.date)}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-time">${s(t("projects.form.labels.startTime","⏰ وقت البداية"))}</label>
            <input type="time" class="form-control" id="project-edit-start-time" name="project-start-time" value="${s(c.time)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-date">${s(t("projects.form.labels.endDate","📅 تاريخ النهاية"))}</label>
            <input type="date" class="form-control" id="project-edit-end-date" name="project-end-date" value="${s(l.date)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-time">${s(t("projects.form.labels.endTime","⏰ وقت النهاية"))}</label>
            <input type="time" class="form-control" id="project-edit-end-time" name="project-end-time" value="${s(l.time)}">
          </div>
          <div class="col-12">
            <label class="form-label" for="project-edit-description">${s(t("projects.details.labels.notes","ملاحظات المشروع"))}</label>
            <textarea class="form-control" id="project-edit-description" name="project-description" rows="3">${s(x)}</textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-label">${s(t("projects.form.labels.expenseLabel","اسم المصروف"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-label" placeholder="${s(t("projects.form.placeholders.expenseLabel","مثال: رسوم موقع التصوير"))}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-amount">${s(t("projects.form.labels.expenseAmount","المبلغ (SR)"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-amount" inputmode="decimal" placeholder="0">
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-primary" data-action="add-expense">${s(t("projects.form.buttons.addExpense","➕ إضافة مصروف"))}</button>
          </div>
          <div class="col-12">
            <div id="project-edit-expense-list" class="project-edit-expense-list">
              ${q}
            </div>
          </div>
        </div>
        <div class="row g-3 align-items-start mt-3">
          <div class="col-md-4">
            <label class="form-label" for="project-edit-discount">${s(t("projects.form.labels.discount","الخصم"))}</label>
          <div class="input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select">
              <option value="percent" ${$==="percent"?"selected":""}>${s(t("projects.form.discount.percent","٪ نسبة"))}</option>
              <option value="amount" ${$==="amount"?"selected":""}>${s(t("projects.form.discount.amount","💵 مبلغ"))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control" value="${s(y)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label d-block" for="project-edit-company-share">${s(t("projects.form.labels.companyShare","نسبة الشركة والضريبة"))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${s(String(A))}" ${w?"checked":""}>
              <label class="form-check-label" for="project-edit-company-share">${s(t("projects.form.companyShareToggle","إضافة نسبة الشركة (10٪)"))}</label>
            </div>
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${f?"checked":""}>
              <label class="form-check-label" for="project-edit-tax">${s(t("projects.form.taxLabel","شامل الضريبة (15٪)"))}</label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label" for="project-edit-payment-status">${s(t("projects.form.labels.paymentStatus","حالة الدفع"))}</label>
          <select class="form-select" id="project-edit-payment-status" name="project-payment-status">
            <option value="unpaid" ${v==="unpaid"?"selected":""}>${s(t("projects.form.paymentStatus.unpaid","غير مدفوع"))}</option>
            <option value="partial" ${v==="partial"?"selected":""}>${s(t("projects.form.paymentStatus.partial","مدفوع جزئياً"))}</option>
            <option value="paid" ${v==="paid"?"selected":""}>${s(t("projects.form.paymentStatus.paid","مدفوع"))}</option>
          </select>
          <label class="form-label mt-2" for="project-edit-payment-progress-value">${s(t("projects.form.paymentProgress.label","💰 الدفعة المستلمة"))}</label>
          <div class="input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select">
              <option value="amount" ${_==="amount"?"selected":""}>${s(t("projects.form.paymentProgress.amount","💵 مبلغ"))}</option>
              <option value="percent" ${_!=="amount"?"selected":""}>${s(t("projects.form.paymentProgress.percent","٪ نسبة"))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control" value="${s(R)}" placeholder="0" inputmode="decimal">
          </div>
          <small class="text-muted">${s(t("projects.form.paymentProgress.hint","أدخل المبلغ أو النسبة التي تم استلامها من قيمة المشروع"))}</small>
        </div>
      </div>

        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mt-4">
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-action="cancel-edit">${s(t("projects.details.edit.cancel","إلغاء"))}</button>
            <button type="submit" class="btn btn-sm btn-primary">${s(t("projects.details.edit.save","💾 حفظ التعديلات"))}</button>
          </div>
        </div>
      </form>
    </div>
  `}function Me(e){const a=["commercial","coverage","photography","social"],n=a.map(o=>{const i=s(t(`projects.form.types.${o}`,o)),d=String(o)===String(e)?" selected":"";return`<option value="${o}"${d}>${i}</option>`});if(e&&!a.includes(e)){const o=s(de(e));n.push(`<option value="${s(String(e))}" selected>${o}</option>`)}return`<option value="">${s(t("projects.form.placeholders.type","اختر نوع المشروع"))}</option>${n.join("")}`}function qe(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="text-muted small" data-empty>${s(t("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const a=s(t("actions.remove","إزالة"));return e.map(n=>{const r=s(n?.label||""),o=s(u(n?.amount||0)),i=s(String(n?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${r}</div>
            <div class="text-muted small">${o}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${i}" aria-label="${a}">✖</button>
        </div>
      `}).join("")}function fe(e){if(!e)return{date:"",time:""};let a=e;a.includes(" ")&&(a=a.replace(" ","T"));const[n="",r=""]=a.split("T"),o=r.match(/(\d{1,2}:\d{2})/);return{date:n?n.slice(0,10):"",time:o?o[0]:""}}function Je(e,a){if(!e)return"";const n=a&&/\d{1,2}:\d{2}/.test(a)?a:"00:00",[r="00",o="00"]=n.split(":"),i=r.padStart(2,"0"),d=o.padStart(2,"0");return`${e}T${i}:${d}`}function Ve(e){if(!e)return null;const a=e.projectId??e.project_id??e.projectID??null;return a!=null?String(a):null}async function We(e,a){if(!e)return;const r=ge().filter(c=>{const l=Ve(c);return l&&l===String(e)});if(!r.length)return;const o=a==="paid",i=o?"paid":"unpaid";let d=!1;for(const c of r){const l=c?.id??c?.reservationId??c?.reservation_id;if(!l)continue;const b=c?.paid===!0||c?.paid==="paid",v=c?.paidStatus??c?.paymentStatus??(b?"paid":"unpaid");if(!(b===o&&v===i))try{await Pe(l,{paid_status:i,paid:o}),d=!0}catch(f){console.error("❌ [projectFocusTemplates] Failed to sync reservation payment status",f)}}d&&document.dispatchEvent(new CustomEvent("reservations:changed"))}export{Oe as a,He as b,Ue as c,Je as d,qe as e,Ve as f,ie as g,$e as r,We as s};
