import{t as e,n as p,e as at}from"./auth.js";import{q as $t,t as s,d as nt,u as ht,k as g,g as ot,v as xt,D as tt,w as _t}from"./reservationsService.js";import{m as St,F as Ct}from"./controller.js";const Y=.15,Tt="bg-primary",wt=2,rt={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},Pt={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Nt={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"};function W(t){if(!t)return null;const n=[t?.id,t?.reservationId,t?.reservation_id,t?.reservationID].find(r=>r!=null&&r!=="");return n!=null?String(n):null}function G(t=[]){const a=ot();return t.map(n=>{const r=n?.reservation??n;if(!r||typeof r!="object")return null;let o=Number.isInteger(n?.index)&&n.index>=0?n.index:Number.isInteger(n?.reservationIndex)&&n.reservationIndex>=0?n.reservationIndex:null;if(!Number.isInteger(o)||o<0){const i=W(r);i&&(o=a.findIndex(l=>{const c=W(l);return c&&c===i}))}return{reservation:r,index:Number.isInteger(o)&&o>=0?o:-1}}).filter(Boolean)}function X(t){return t?t.id!=null?String(t.id):t.projectId!=null?String(t.projectId):t.project_id!=null?String(t.project_id):null:null}function Ot(t,{customer:a=null,techniciansMap:n=new Map,reservations:r=[]}={}){const i=G(r).map(({reservation:R})=>R),l=X(t),c=l?s(l):"",d=nt(t),u=e(`projects.status.${d}`,rt[d]),b=Pt[d]||"bg-secondary",m=t?.paymentStatus==="paid"?"paid":"unpaid",$=e(`projects.paymentStatus.${m}`,m==="paid"?"Paid":"Unpaid"),j=m==="paid"?"status-paid":"status-unpaid",f=[m==="paid"?"project-focus-card--paid":"project-focus-card--unpaid"],v=t?.confirmed===!0||t?.confirmed==="true";v&&f.push("project-focus-card--confirmed");const y=t?.projectCode||(l?`PRJ-${p(l)}`:""),_=y?p(String(y).replace(/^#/,"")):"",C=_?`<span class="project-code-badge project-focus-card__code">#${s(_)}</span>`:"",h=Q(t?.type),T=h?`<span class="badge project-focus-card__badge ${Tt}">${s(h)}</span>`:"",S=`<span class="project-focus-card__status-chip ${b}">${s(u)}</span>`,I=`<span class="reservation-chip ${j} project-focus-card__payment-chip">${s($)}</span>`,k=(t?.title||"").trim()||e("projects.fallback.untitled","Untitled project"),D=(t?.description||"").trim(),F=D?s(ht(D,110)):s(e("projects.fallback.noDescription","No description")),L=Array.isArray(t?.technicians)?t.technicians:[],w=L.map(R=>n.get(String(R))?.name).filter(Boolean),P=w.length?At(w):"",E=a?.customerName||t?.clientName||"",z=(t?.clientCompany||a?.companyName||"").trim(),M=i.reduce((R,q)=>{const ft=K(q),vt=(Array.isArray(q?.items)?q.items:[]).reduce((jt,gt)=>jt+(Number(gt?.qty)||0),0),yt=Array.isArray(q?.technicians)?q.technicians.length:0;return{total:R.total+ft,equipment:R.equipment+vt,crew:R.crew+yt}},{total:0,equipment:0,crew:0}),V=Number(M.total.toFixed(2)),U=M.equipment,Z=M.crew||L.length,N=it(t),H=N.applyTax?Number(((N.subtotal+V)*Y).toFixed(2)):0,x=Number((N.subtotal+V+H).toFixed(2)),A=[_?{icon:"🆔",label:e("projectCards.meta.code","رقم المشروع"),value:`#${_}`}:null,E?{icon:"👤",label:e("projectCards.meta.client","العميل"),value:E}:null,z?{icon:"🏢",label:e("projectCards.meta.company","شركة العميل"),value:z}:null,h?{icon:"🏷️",label:e("projectCards.meta.type","نوع المشروع"),value:h}:null,P?{icon:"👥",label:e("projectCards.stats.crewLabel","عدد الطاقم"),value:P}:null,{icon:"📅",label:e("projectCards.meta.startDate","تاريخ البداية"),value:et(t?.start)},{icon:"📅",label:e("projectCards.meta.endDate","تاريخ النهاية"),value:t?.end?et(t.end):"—"}].filter(Boolean),B=[{icon:"📦",label:e("projectCards.stats.equipmentCount","عدد المعدات"),value:p(String(U))},{icon:"😎",label:e("projectCards.stats.crewCount","عدد أفراد الطاقم"),value:p(String(Z))},{icon:"💵",label:e("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:g(V)}],lt=[{icon:"💳",label:e("projectCards.stats.paymentStatus","حالة الدفع"),value:$},{icon:"💸",label:e("projectCards.stats.expensesTotal","إجمالي المصاريف"),value:g(N.expensesTotal)},{icon:"💰",label:e("projectCards.stats.projectSubtotal","التكلفة التقديرية"),value:g(N.subtotal)},{icon:"🧾",label:e("projectCards.stats.taxTotal","الضريبة"),value:g(H)},{icon:"💵",label:e("projectCards.stats.overallTotal","المجموع الكلي"),value:g(x)}],dt=[J("projectCards.groups.meta","بيانات المشروع",A),J("projectCards.groups.reservations","موجز الحجز",B),J("projectCards.groups.payment","ملخص الدفع",lt)].filter(Boolean).join(""),pt=e("projects.focus.confirmed","✅ مشروع مؤكد"),ut=e("projects.focus.pending","⌛ بانتظار التأكيد"),mt=`<div class="project-focus-card__actions"><span class="reservation-chip ${v?"status-confirmed":"status-pending"} project-focus-card__confirm-indicator">${s(v?pt:ut)}</span></div>`,bt=[C,T,S,I].filter(Boolean).join(`
          `);return`
    <div class="project-card-grid__item">
      <article class="${["project-focus-card",...f].join(" ")}" data-project-id="${c}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${bt}
        </div>
        <h6 class="project-focus-card__title">${s(k)}</h6>
        <p class="project-focus-card__description">${F}</p>
        <div class="project-focus-card__sections">
          ${dt}
        </div>
        ${mt}
      </article>
    </div>
  `}function J(t,a,n=[]){if(!n.length)return"";const r=n.map(({icon:o,label:i,value:l})=>`
        <div class="project-focus-card__row">
          <span class="project-focus-card__row-label">${o?`<span class="project-focus-card__row-icon">${s(o)}</span>`:""}${s(i)}</span>
          <span class="project-focus-card__row-value">${s(String(l))}</span>
        </div>
      `).join("");return`
    <div class="project-focus-card__section">
      <span class="project-focus-card__section-title">${s(e(t,a))}</span>
      <div class="project-focus-card__section-box">
        ${r}
      </div>
    </div>
  `}function At(t=[]){if(!t.length)return"";const a=t.slice(0,wt),n=t.length-a.length,r=at()==="ar"?"، ":", ";let o=a.join(r);return n>0&&(o+=`${r}+${p(String(n))}`),o}function Ut(t,{customer:a=null,reservations:n=[]}={}){const r=G(n),o=r.map(({reservation:x})=>x),i=it(t),l=o.reduce((x,A)=>x+K(A),0),c=Number(l.toFixed(2)),d=o.length,u=i.applyTax?Number(((i.subtotal+c)*Y).toFixed(2)):0,b=Number((i.subtotal+c+u).toFixed(2)),m=nt(t),$=e(`projects.status.${m}`,rt[m]),j=Nt[m]||"status-confirmed",f=X(t)||"",v=t?.projectCode||(f?`PRJ-${p(f)}`:""),y=v?p(String(v).replace(/^#/,"")):"",_=y?`<span class="project-code-badge">#${s(y)}</span>`:"",C=i.applyTax,h=C?e("projects.details.chips.vatOn","شامل الضريبة 15٪"):e("projects.details.chips.vatOff","غير شامل الضريبة"),T=C?"status-paid":"status-unpaid",S=t?.paymentStatus==="paid"?"paid":"unpaid",I=e(`projects.paymentStatus.${S}`,S==="paid"?"Paid":"Unpaid"),k=S==="paid"?"status-paid":"status-unpaid",F=e("projects.details.chips.reservations","{count} حجوزات").replace("{count}",p(String(d))),L=t?.confirmed===!0||t?.confirmed==="true"?`<span class="reservation-chip status-confirmed">${s(e("projects.focus.confirmed","✅ مشروع مؤكد"))}</span>`:"",w=a?.customerName||t?.clientName||"",P=(t?.clientCompany||a?.companyName||"").trim(),z=(t?.description||"").trim()||e("projects.fallback.noDescription","لا يوجد وصف"),M=[y?{icon:"🆔",label:e("projects.details.labels.code","رقم المشروع"),value:`#${y}`}:null,w?{icon:"👤",label:e("projects.details.client","العميل"),value:w}:null,P?{icon:"🏢",label:e("projects.details.company","شركة العميل"),value:P}:null,{icon:"🏷️",label:e("projects.details.type","نوع المشروع"),value:Q(t?.type)},{icon:"🗓️",label:e("projects.details.labels.start","تاريخ البداية"),value:O(t?.start)},{icon:"🗓️",label:e("projects.details.labels.end","تاريخ النهاية"),value:t?.end?O(t.end):"—"},{icon:"🔗",label:e("projects.details.labels.reservationsCount","عدد الحجوزات"),value:p(String(d))}].filter(Boolean),V=e("projects.details.expenses","المصروفات ({amount})").replace("{amount}",g(i.expensesTotal)),U=i.expensesTotal>0?`<ul class="project-details-list">${(t?.expenses||[]).map(x=>`
          <li>
            <span class="project-expense-label">${s(x.label??"")}</span>
            <span class="project-expense-amount">${g(x.amount)}</span>
          </li>
        `).join("")}</ul>`:`<div class="text-muted">${s(e("projects.details.noItems","لا يوجد"))}</div>`,N=[{icon:"💳",label:e("projects.details.summary.paymentStatus","حالة الدفع"),value:I},{icon:"💼",label:e("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:g(i.subtotal)},{icon:"💵",label:e("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:g(c)},{icon:"🧮",label:e("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:g(u)},{icon:"💰",label:e("projects.details.summary.overallTotal","الإجمالي الكلي"),value:g(b)}].map(({icon:x,label:A,value:B})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${s(x)} ${s(A)}</span>
      <span class="summary-details-value">${s(B)}</span>
    </div>
  `).join(""),H=Rt({project:t,reservations:r});return`
    <div class="project-details-header mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h5 class="mb-2 d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted project-details-title-label">${s(e("projects.details.labels.projectTitle","اسم المشروع"))}:</span>
            <span class="fw-bold project-details-title-text">${s((t?.title||"").trim()||e("projects.fallback.untitled","Untitled project"))}</span>
            ${_}
          </h5>
        </div>
        <div class="status-chips d-flex flex-wrap gap-2">
          <span class="status-chip ${j}">${s($)}</span>
          <span class="status-chip ${T}">${s(h)}</span>
          <span class="reservation-chip ${k}">${s(I)}</span>
          <span class="reservation-chip status-confirmed">${s(F)}</span>
          ${L}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${M.map(({icon:x,label:A,value:B})=>ct(x,A,B)).join("")}
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(e("projects.details.labels.notes","ملاحظات المشروع"))}</h6>
      <div class="project-notes">${s(z)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(V)}</h6>
      ${U}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${N}
    </div>
    ${H}
  `}function Rt({reservations:t=[],project:a=null}={}){const r=[...G(t)].sort((c,d)=>{const u=c?.reservation?.start?new Date(c.reservation.start).getTime():0;return(d?.reservation?.start?new Date(d.reservation.start).getTime():0)-u}),o=e("projects.details.reservations.title","الحجوزات المرتبطة"),i=e("projects.details.reservations.empty","لا توجد حجوزات مرتبطة بهذا المشروع بعد."),l=r.length?`<div class="project-reservations-list">${r.map(({reservation:c,index:d})=>It(c,d,a)).join("")}</div>`:`<div class="alert alert-info project-reservations-empty mb-0">${s(i)}</div>`;return`
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex align-items-center gap-2 flex-wrap">
        <h6 class="mb-0">${s(o)}</h6>
      </div>
      ${l}
    </section>
  `}function It(t,a=-1,n=null){const r=W(t)??"-",o=p(String(r)),i=Dt(t?.start,t?.end),l=K(t),c=g(l),d=p(String((t?.items||[]).length)),u=p(String((t?.technicians||[]).length)),b=e("projects.details.reservations.itemsCount","{count} معدة").replace("{count}",d),m=e("projects.details.reservations.crewCount","{count} من الطاقم").replace("{count}",u),{effectiveConfirmed:$}=St(t,n),j=$?e("reservations.list.status.confirmed","✅ مؤكد"):e("reservations.list.status.pending","⏳ غير مؤكد"),f=$?"project-reservation-card__badge--confirmed":"project-reservation-card__badge--pending",v=t?.paid===!0||t?.paid==="paid",y=v?e("reservations.list.payment.paid","💳 مدفوع"):e("reservations.list.payment.unpaid","💳 غير مدفوع"),_=v?"project-reservation-card__badge--paid":"project-reservation-card__badge--unpaid",h=Ct(t)?`<span class="project-reservation-card__badge project-reservation-card__badge--completed">${s(e("reservations.list.status.completed","📁 منتهي"))}</span>`:"",T=Number.isInteger(a)&&a>=0?` data-index="${a}"`:"",S=`<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${s(String(r??""))}"${T}>${s(e("projects.details.reservations.view","عرض الحجز"))}</button>`;return`
    <article class="project-reservation-card" data-reservation-id="${s(o)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${s(o)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${f}">${s(j)}</span>
          <span class="project-reservation-card__badge ${_}">${s(y)}</span>
          ${h}
        </div>
      </div>
      <div class="project-reservation-card__range">${s(i)}</div>
      <div class="project-reservation-card__meta">
        <span>📦 ${s(b)}</span>
        <span>😎 ${s(m)}</span>
      </div>
      <div class="project-reservation-card__footer">
        <span class="text-muted">${s(e("projectCards.stats.reservationValue","إجمالي الحجوزات"))}</span>
        <span class="fw-bold">${s(c)}</span>
        ${S}
      </div>
    </article>
  `}function ct(t,a,n){return`
    <div class="res-info-row">
      <span class="label">${s(t)} ${s(a)}</span>
      <span class="separator">:</span>
      <span class="value">${s(n)}</span>
    </div>
  `}function it(t){const a=Number(t?.equipmentEstimate)||0,n=$t(t),r=a+n,o=t?.applyTax===!0||t?.applyTax==="true",i=Number.parseFloat(t?.discount??t?.discountValue??0)||0;let c=(t?.discountType==="amount"?"amount":"percent")==="amount"?i:r*(i/100);(!Number.isFinite(c)||c<0)&&(c=0),c>r&&(c=r);const d=Math.max(0,r-c),u=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true",b=Number.parseFloat(t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??0)||0,m=u&&o&&b>0?b:0,$=m>0?Number((d*(m/100)).toFixed(2)):0,j=d+$;let f=o?j*Y:0;(!Number.isFinite(f)||f<0)&&(f=0),f=Number(f.toFixed(2));let v=o?Number(t?.totalWithTax):j;return o?(!Number.isFinite(v)||v<=0)&&(v=Number((j+f).toFixed(2))):v=j,{equipmentEstimate:a,expensesTotal:n,baseSubtotal:r,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:$,subtotal:j,applyTax:o,taxAmount:f,totalWithTax:v}}function K(t){if(!t)return 0;const a=Array.isArray(t?.items)?t.items:[],n=t?.discount??0,r=Number(p(String(n)))||0,o=t?.discountType||"percent",i=Array.isArray(t?.technicians)?t.technicians:[],l=xt(a,r,o,!1,i,{start:t?.start,end:t?.end});if(Number.isFinite(l))return l;const c=Number(p(String(t?.cost??t?.total??0)));return Number.isFinite(c)?Math.round(c):0}function et(t){if(!t)return"—";const a=new Date(t);if(Number.isNaN(a.getTime()))return"—";const r=at()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-GB",o=new Intl.DateTimeFormat(r,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return p(o.format(a))}function O(t){if(!t)return"—";const a=new Date(t);if(Number.isNaN(a.getTime()))return"—";const n=String(a.getDate()).padStart(2,"0"),r=String(a.getMonth()+1).padStart(2,"0"),o=String(a.getFullYear()),i=String(a.getMinutes()).padStart(2,"0"),l=a.getHours(),c=l>=12?"PM":"AM",d=l%12||12,u=String(d).padStart(2,"0"),b=`${n}/${r}/${o} ${u}:${i} ${c}`;return p(b)}function Dt(t,a){if(!t)return"—";const n=O(t);return a?`${n} - ${O(a)}`:n}function Q(t){if(!t)return e("projects.form.types.unknown","نوع غير محدد");const n={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[t]||"projects.form.types.unknown";return e(n,t)}function Jt(t,{clientName:a="",clientCompany:n=""}={}){const r=X(t)||"",o=t?.projectCode||(r?`PRJ-${p(r)}`:""),i=o?p(String(o)):"",l=Lt(t?.type),c=st(t?.start||""),d=st(t?.end||""),u=typeof t?.paymentStatus=="string"?t.paymentStatus.toLowerCase():"",b=["paid","partial"].includes(u)?u:"unpaid",m=t?.applyTax===!0||t?.applyTax==="true",$=t?.description||"",j=t?.discountType==="amount"?"amount":"percent",f=p(String(t?.discount??t?.discountValue??0)),v=t?.companySharePercent??t?.company_share_percent??t?.companyShare??t?.company_share??tt,y=Number.parseFloat(p(String(v))),_=t?.companyShareEnabled===!0||t?.companyShareEnabled==="true"||t?.company_share_enabled===!0||t?.company_share_enabled==="true"||m&&Number.isFinite(y)&&y>0,C=Number.isFinite(y)&&y>0?y:tt,h=t?.paymentProgressType==="amount"?"amount":t?.paymentProgressType==="percent"?"percent":t?.payment_progress_type==="amount"?"amount":(t?.payment_progress_type==="percent","percent"),T=p(String(t?.paymentProgressValue??t?.payment_progress_value??(h==="amount"?t?.paidAmount??t?.paid_amount:t?.paidPercent??t?.paid_percent)??"")),S=e("projects.details.labels.code","رقم المشروع"),I=e("projects.form.labels.client","العميل"),k=e("projects.form.labels.clientCompany","شركة العميل"),D=[i?{icon:"🆔",label:S,value:`#${i}`}:null,a?{icon:"👤",label:I,value:a}:null,n?{icon:"🏢",label:k,value:n}:null].filter(Boolean),F=D.length?`<div class="project-details-info mb-3">
        ${D.map(({icon:w,label:P,value:E})=>ct(w,P,E)).join("")}
      </div>`:"",L=kt(Array.isArray(t?.expenses)?t.expenses:[]);return`
    <div class="project-details-edit">
      <div class="project-details-header mb-3">
        <h5 class="fw-bold mb-1">${s(e("projects.details.edit.heading","تعديل المشروع"))}</h5>
        <p class="text-muted small mb-0">${s(e("projects.details.edit.subheading","قم بتحديث بيانات المشروع ثم احفظ التغييرات."))}</p>
      </div>
      ${F}
      <form id="project-details-edit-form" class="project-details-edit-form">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label" for="project-edit-title">${s(e("projects.form.labels.title","اسم المشروع"))}</label>
            <input type="text" class="form-control" id="project-edit-title" name="project-title" value="${s(t?.title||"")}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-type">${s(e("projects.form.labels.type","نوع المشروع"))}</label>
            <select class="form-select" id="project-edit-type" name="project-type" required>
              ${l}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-date">${s(e("projects.form.labels.startDate","📅 تاريخ البداية"))}</label>
            <input type="date" class="form-control" id="project-edit-start-date" name="project-start-date" value="${s(c.date)}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-time">${s(e("projects.form.labels.startTime","⏰ وقت البداية"))}</label>
            <input type="time" class="form-control" id="project-edit-start-time" name="project-start-time" value="${s(c.time)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-date">${s(e("projects.form.labels.endDate","📅 تاريخ النهاية"))}</label>
            <input type="date" class="form-control" id="project-edit-end-date" name="project-end-date" value="${s(d.date)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-time">${s(e("projects.form.labels.endTime","⏰ وقت النهاية"))}</label>
            <input type="time" class="form-control" id="project-edit-end-time" name="project-end-time" value="${s(d.time)}">
          </div>
          <div class="col-12">
            <label class="form-label" for="project-edit-description">${s(e("projects.details.labels.notes","ملاحظات المشروع"))}</label>
            <textarea class="form-control" id="project-edit-description" name="project-description" rows="3">${s($)}</textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-label">${s(e("projects.form.labels.expenseLabel","اسم المصروف"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-label" placeholder="${s(e("projects.form.placeholders.expenseLabel","مثال: رسوم موقع التصوير"))}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-amount">${s(e("projects.form.labels.expenseAmount","المبلغ (SR)"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-amount" inputmode="decimal" placeholder="0">
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-primary" data-action="add-expense">${s(e("projects.form.buttons.addExpense","➕ إضافة مصروف"))}</button>
          </div>
          <div class="col-12">
            <div id="project-edit-expense-list" class="project-edit-expense-list">
              ${L}
            </div>
          </div>
        </div>
        <div class="row g-3 align-items-start mt-3">
          <div class="col-md-4">
            <label class="form-label" for="project-edit-discount">${s(e("projects.form.labels.discount","الخصم"))}</label>
          <div class="input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select">
              <option value="percent" ${j==="percent"?"selected":""}>${s(e("projects.form.discount.percent","٪ نسبة"))}</option>
              <option value="amount" ${j==="amount"?"selected":""}>${s(e("projects.form.discount.amount","💵 مبلغ"))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control" value="${s(f)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label d-block" for="project-edit-company-share">${s(e("projects.form.labels.companyShare","نسبة الشركة والضريبة"))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${s(String(C))}" ${_?"checked":""}>
              <label class="form-check-label" for="project-edit-company-share">${s(e("projects.form.companyShareToggle","إضافة نسبة الشركة (10٪)"))}</label>
            </div>
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${m?"checked":""}>
              <label class="form-check-label" for="project-edit-tax">${s(e("projects.form.taxLabel","شامل الضريبة (15٪)"))}</label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label" for="project-edit-payment-status">${s(e("projects.form.labels.paymentStatus","حالة الدفع"))}</label>
          <select class="form-select" id="project-edit-payment-status" name="project-payment-status">
            <option value="unpaid" ${b==="unpaid"?"selected":""}>${s(e("projects.form.paymentStatus.unpaid","غير مدفوع"))}</option>
            <option value="partial" ${b==="partial"?"selected":""}>${s(e("projects.form.paymentStatus.partial","مدفوع جزئياً"))}</option>
            <option value="paid" ${b==="paid"?"selected":""}>${s(e("projects.form.paymentStatus.paid","مدفوع"))}</option>
          </select>
          <label class="form-label mt-2" for="project-edit-payment-progress-value">${s(e("projects.form.paymentProgress.label","💰 الدفعة المستلمة"))}</label>
          <div class="input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select">
              <option value="amount" ${h==="amount"?"selected":""}>${s(e("projects.form.paymentProgress.amount","💵 مبلغ"))}</option>
              <option value="percent" ${h!=="amount"?"selected":""}>${s(e("projects.form.paymentProgress.percent","٪ نسبة"))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control" value="${s(T)}" placeholder="0" inputmode="decimal">
          </div>
          <small class="text-muted">${s(e("projects.form.paymentProgress.hint","أدخل المبلغ أو النسبة التي تم استلامها من قيمة المشروع"))}</small>
        </div>
      </div>

        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mt-4">
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-action="cancel-edit">${s(e("projects.details.edit.cancel","إلغاء"))}</button>
            <button type="submit" class="btn btn-sm btn-primary">${s(e("projects.details.edit.save","💾 حفظ التعديلات"))}</button>
          </div>
        </div>
      </form>
    </div>
  `}function Lt(t){const a=["commercial","coverage","photography","social"],n=a.map(o=>{const i=s(e(`projects.form.types.${o}`,o)),l=String(o)===String(t)?" selected":"";return`<option value="${o}"${l}>${i}</option>`});if(t&&!a.includes(t)){const o=s(Q(t));n.push(`<option value="${s(String(t))}" selected>${o}</option>`)}return`<option value="">${s(e("projects.form.placeholders.type","اختر نوع المشروع"))}</option>${n.join("")}`}function kt(t=[]){if(!Array.isArray(t)||t.length===0)return`<div class="text-muted small" data-empty>${s(e("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const a=s(e("actions.remove","إزالة"));return t.map(n=>{const r=s(n?.label||""),o=s(g(n?.amount||0)),i=s(String(n?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${r}</div>
            <div class="text-muted small">${o}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${i}" aria-label="${a}">✖</button>
        </div>
      `}).join("")}function st(t){if(!t)return{date:"",time:""};let a=t;a.includes(" ")&&(a=a.replace(" ","T"));const[n="",r=""]=a.split("T"),o=r.match(/(\d{1,2}:\d{2})/);return{date:n?n.slice(0,10):"",time:o?o[0]:""}}function Wt(t,a){if(!t)return"";const n=a&&/\d{1,2}:\d{2}/.test(a)?a:"00:00",[r="00",o="00"]=n.split(":"),i=r.padStart(2,"0"),l=o.padStart(2,"0");return`${t}T${i}:${l}`}function Ft(t){if(!t)return null;const a=t.projectId??t.project_id??t.projectID??null;return a!=null?String(a):null}async function Yt(t,a){if(!t)return;const r=ot().filter(c=>{const d=Ft(c);return d&&d===String(t)});if(!r.length)return;const o=a==="paid",i=o?"paid":"unpaid";let l=!1;for(const c of r){const d=c?.id??c?.reservationId??c?.reservation_id;if(!d)continue;const u=c?.paid===!0||c?.paid==="paid",b=c?.paidStatus??c?.paymentStatus??(u?"paid":"unpaid");if(!(u===o&&b===i))try{await _t(d,{paid_status:i,paid:o}),l=!0}catch(m){console.error("❌ [projectFocusTemplates] Failed to sync reservation payment status",m)}}l&&document.dispatchEvent(new CustomEvent("reservations:changed"))}export{Ut as a,Ot as b,Jt as c,Wt as d,kt as e,Ft as f,X as g,it as r,Yt as s};
