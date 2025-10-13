import{t as e,n as p,d as st}from"./auth.js";import{c as $t,e as s,d as at,t as yt,f as j}from"./projectsCommon.js";import{g as nt,v as xt,r as ht,c as Ct,w as _t}from"./projectsService.js";const X=.15,St="bg-primary",Tt=2,ot={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},wt={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Nt={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"};function G(t){if(!t)return null;const n=[t?.id,t?.reservationId,t?.reservation_id,t?.reservationID].find(r=>r!=null&&r!=="");return n!=null?String(n):null}function Y(t=[]){const a=nt();return t.map(n=>{const r=n?.reservation??n;if(!r||typeof r!="object")return null;let o=Number.isInteger(n?.index)&&n.index>=0?n.index:Number.isInteger(n?.reservationIndex)&&n.reservationIndex>=0?n.reservationIndex:null;if(!Number.isInteger(o)||o<0){const i=G(r);i&&(o=a.findIndex(l=>{const c=G(l);return c&&c===i}))}return{reservation:r,index:Number.isInteger(o)&&o>=0?o:-1}}).filter(Boolean)}function z(t){return t?t.id!=null?String(t.id):t.projectId!=null?String(t.projectId):t.project_id!=null?String(t.project_id):null:null}function Vt(t,{customer:a=null,techniciansMap:n=new Map,reservations:r=[]}={}){const i=Y(r).map(({reservation:P})=>P),l=z(t),c=l?s(l):"",d=at(t),u=e(`projects.status.${d}`,ot[d]),b=wt[d]||"bg-secondary",m=t?.paymentStatus==="paid"?"paid":"unpaid",x=e(`projects.paymentStatus.${m}`,m==="paid"?"Paid":"Unpaid"),g=m==="paid"?"status-paid":"status-unpaid",f=[m==="paid"?"project-focus-card--paid":"project-focus-card--unpaid"],v=t?.confirmed===!0||t?.confirmed==="true";v&&f.push("project-focus-card--confirmed");const $=t?.projectCode||(l?`PRJ-${p(l)}`:""),h=$?p(String($).replace(/^#/,"")):"",_=h?`<span class="project-code-badge project-focus-card__code">#${s(h)}</span>`:"",C=Q(t?.type),S=C?`<span class="badge project-focus-card__badge ${St}">${s(C)}</span>`:"",T=`<span class="project-focus-card__status-chip ${b}">${s(u)}</span>`,F=`<span class="reservation-chip ${g} project-focus-card__payment-chip">${s(x)}</span>`,H=(t?.title||"").trim()||e("projects.fallback.untitled","Untitled project"),V=(t?.description||"").trim(),O=V?s(yt(V,110)):s(e("projects.fallback.noDescription","No description")),M=Array.isArray(t?.technicians)?t.technicians:[],I=M.map(P=>n.get(String(P))?.name).filter(Boolean),R=I.length?Pt(I):"",U=a?.customerName||t?.clientName||"",B=(t?.clientCompany||a?.companyName||"").trim(),A=i.reduce((P,k)=>{const bt=K(k),ft=(Array.isArray(k?.items)?k.items:[]).reduce((jt,gt)=>jt+(Number(gt?.qty)||0),0),vt=Array.isArray(k?.technicians)?k.technicians.length:0;return{total:P.total+bt,equipment:P.equipment+ft,crew:P.crew+vt}},{total:0,equipment:0,crew:0}),L=Number(A.total.toFixed(2)),J=A.equipment,Z=A.crew||M.length,w=it(t),E=w.applyTax?Number(((w.subtotal+L)*X).toFixed(2)):0,y=Number((w.subtotal+L+E).toFixed(2)),N=[h?{icon:"🆔",label:e("projectCards.meta.code","رقم المشروع"),value:`#${h}`}:null,U?{icon:"👤",label:e("projectCards.meta.client","العميل"),value:U}:null,B?{icon:"🏢",label:e("projectCards.meta.company","شركة العميل"),value:B}:null,C?{icon:"🏷️",label:e("projectCards.meta.type","نوع المشروع"),value:C}:null,R?{icon:"👥",label:e("projectCards.stats.crewLabel","عدد الطاقم"),value:R}:null,{icon:"📅",label:e("projectCards.meta.startDate","تاريخ البداية"),value:tt(t?.start)},{icon:"📅",label:e("projectCards.meta.endDate","تاريخ النهاية"),value:t?.end?tt(t.end):"—"}].filter(Boolean),D=[{icon:"📦",label:e("projectCards.stats.equipmentCount","عدد المعدات"),value:p(String(J))},{icon:"😎",label:e("projectCards.stats.crewCount","عدد أفراد الطاقم"),value:p(String(Z))},{icon:"💵",label:e("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:j(L)}],ct=[{icon:"💳",label:e("projectCards.stats.paymentStatus","حالة الدفع"),value:x},{icon:"💸",label:e("projectCards.stats.expensesTotal","إجمالي المصاريف"),value:j(w.expensesTotal)},{icon:"💰",label:e("projectCards.stats.projectSubtotal","التكلفة التقديرية"),value:j(w.subtotal)},{icon:"🧾",label:e("projectCards.stats.taxTotal","الضريبة"),value:j(E)},{icon:"💵",label:e("projectCards.stats.overallTotal","المجموع الكلي"),value:j(y)}],lt=[W("projectCards.groups.meta","بيانات المشروع",N),W("projectCards.groups.reservations","موجز الحجز",D),W("projectCards.groups.payment","ملخص الدفع",ct)].filter(Boolean).join(""),dt=e("projects.focus.confirmed","✅ مشروع مؤكد"),pt=e("projects.focus.pending","⌛ بانتظار التأكيد"),ut=`<div class="project-focus-card__actions"><span class="reservation-chip ${v?"status-confirmed":"status-pending"} project-focus-card__confirm-indicator">${s(v?dt:pt)}</span></div>`,mt=[_,S,T,F].filter(Boolean).join(`
          `);return`
    <div class="project-card-grid__item">
      <article class="${["project-focus-card",...f].join(" ")}" data-project-id="${c}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${mt}
        </div>
        <h6 class="project-focus-card__title">${s(H)}</h6>
        <p class="project-focus-card__description">${O}</p>
        <div class="project-focus-card__sections">
          ${lt}
        </div>
        ${ut}
      </article>
    </div>
  `}function W(t,a,n=[]){if(!n.length)return"";const r=n.map(({icon:o,label:i,value:l})=>`
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
  `}function Pt(t=[]){if(!t.length)return"";const a=t.slice(0,Tt),n=t.length-a.length,r=st()==="ar"?"، ":", ";let o=a.join(r);return n>0&&(o+=`${r}+${p(String(n))}`),o}function Ot(t,{customer:a=null,reservations:n=[]}={}){const r=Y(n),o=r.map(({reservation:y})=>y),i=it(t),l=o.reduce((y,N)=>y+K(N),0),c=Number(l.toFixed(2)),d=o.length,u=i.applyTax?Number(((i.subtotal+c)*X).toFixed(2)):0,b=Number((i.subtotal+c+u).toFixed(2)),m=at(t),x=e(`projects.status.${m}`,ot[m]),g=Nt[m]||"status-confirmed",f=z(t)||"",v=t?.projectCode||(f?`PRJ-${p(f)}`:""),$=v?p(String(v).replace(/^#/,"")):"",h=$?`<span class="project-code-badge">#${s($)}</span>`:"",_=i.applyTax,C=_?e("projects.details.chips.vatOn","شامل الضريبة 15٪"):e("projects.details.chips.vatOff","غير شامل الضريبة"),S=_?"status-paid":"status-unpaid",T=t?.paymentStatus==="paid"?"paid":"unpaid",F=e(`projects.paymentStatus.${T}`,T==="paid"?"Paid":"Unpaid"),H=T==="paid"?"status-paid":"status-unpaid",O=e("projects.details.chips.reservations","{count} حجوزات").replace("{count}",p(String(d))),M=t?.confirmed===!0||t?.confirmed==="true"?`<span class="reservation-chip status-confirmed">${s(e("projects.focus.confirmed","✅ مشروع مؤكد"))}</span>`:"",I=a?.customerName||t?.clientName||"",R=(t?.clientCompany||a?.companyName||"").trim(),B=(t?.description||"").trim()||e("projects.fallback.noDescription","لا يوجد وصف"),A=[$?{icon:"🆔",label:e("projects.details.labels.code","رقم المشروع"),value:`#${$}`}:null,I?{icon:"👤",label:e("projects.details.client","العميل"),value:I}:null,R?{icon:"🏢",label:e("projects.details.company","شركة العميل"),value:R}:null,{icon:"🏷️",label:e("projects.details.type","نوع المشروع"),value:Q(t?.type)},{icon:"🗓️",label:e("projects.details.labels.start","تاريخ البداية"),value:q(t?.start)},{icon:"🗓️",label:e("projects.details.labels.end","تاريخ النهاية"),value:t?.end?q(t.end):"—"},{icon:"🔗",label:e("projects.details.labels.reservationsCount","عدد الحجوزات"),value:p(String(d))}].filter(Boolean),L=e("projects.details.expenses","المصروفات ({amount})").replace("{amount}",j(i.expensesTotal)),J=i.expensesTotal>0?`<ul class="project-details-list">${(t?.expenses||[]).map(y=>`
          <li>
            <span class="project-expense-label">${s(y.label??"")}</span>
            <span class="project-expense-amount">${j(y.amount)}</span>
          </li>
        `).join("")}</ul>`:`<div class="text-muted">${s(e("projects.details.noItems","لا يوجد"))}</div>`,w=[{icon:"💳",label:e("projects.details.summary.paymentStatus","حالة الدفع"),value:F},{icon:"💼",label:e("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:j(i.subtotal)},{icon:"💵",label:e("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:j(c)},{icon:"🧮",label:e("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:j(u)},{icon:"💰",label:e("projects.details.summary.overallTotal","الإجمالي الكلي"),value:j(b)}].map(({icon:y,label:N,value:D})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${s(y)} ${s(N)}</span>
      <span class="summary-details-value">${s(D)}</span>
    </div>
  `).join(""),E=It({project:t,reservations:r});return`
    <div class="project-details-header mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h5 class="mb-2 d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted project-details-title-label">${s(e("projects.details.labels.projectTitle","اسم المشروع"))}:</span>
            <span class="fw-bold project-details-title-text">${s((t?.title||"").trim()||e("projects.fallback.untitled","Untitled project"))}</span>
            ${h}
          </h5>
        </div>
        <div class="status-chips d-flex flex-wrap gap-2">
          <span class="status-chip ${g}">${s(x)}</span>
          <span class="status-chip ${S}">${s(C)}</span>
          <span class="reservation-chip ${H}">${s(F)}</span>
          <span class="reservation-chip status-confirmed">${s(O)}</span>
          ${M}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${A.map(({icon:y,label:N,value:D})=>rt(y,N,D)).join("")}
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(e("projects.details.labels.notes","ملاحظات المشروع"))}</h6>
      <div class="project-notes">${s(B)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(L)}</h6>
      ${J}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${w}
    </div>
    ${E}
  `}function It({reservations:t=[],project:a=null}={}){const r=[...Y(t)].sort((g,f)=>{const v=g?.reservation?.start?new Date(g.reservation.start).getTime():0;return(f?.reservation?.start?new Date(f.reservation.start).getTime():0)-v}),o=e("projects.details.reservations.title","الحجوزات المرتبطة"),i=e("projects.details.reservations.empty","لا توجد حجوزات مرتبطة بهذا المشروع بعد."),l=e("projects.details.reservations.count","{count} حجوزات"),c=r.length?`<span class="badge project-reservations-count">${s(l.replace("{count}",p(String(r.length))))}</span>`:"",d=a?z(a):null,u=e("projects.details.actions.edit","✏️ تعديل المشروع"),b=d?`<button type="button" class="btn btn-sm btn-warning" data-action="edit-project" data-project-id="${s(String(d))}">${s(u)}</button>`:"",m=b?`<div class="d-flex flex-wrap gap-2">${b}</div>`:"",x=r.length?`<div class="project-reservations-list">${r.map(({reservation:g,index:f})=>Rt(g,f,a)).join("")}</div>`:`<div class="alert alert-info project-reservations-empty mb-0">${s(i)}</div>`;return`
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex justify-content-between align-items-center gap-2 flex-wrap">
        <div class="d-flex align-items-center gap-2">
          <h6 class="mb-0">${s(o)}</h6>
          ${c}
        </div>
        ${m}
      </div>
      ${x}
    </section>
  `}function Rt(t,a=-1,n=null){const r=G(t)??"-",o=p(String(r)),i=At(t?.start,t?.end),l=K(t),c=j(l),d=p(String((t?.items||[]).length)),u=p(String((t?.technicians||[]).length)),b=e("projects.details.reservations.itemsCount","{count} معدة").replace("{count}",d),m=e("projects.details.reservations.crewCount","{count} من الطاقم").replace("{count}",u),{effectiveConfirmed:x}=ht(t,n),g=x?e("reservations.list.status.confirmed","✅ مؤكد"):e("reservations.list.status.pending","⏳ غير مؤكد"),f=x?"project-reservation-card__badge--confirmed":"project-reservation-card__badge--pending",v=t?.paid===!0||t?.paid==="paid",$=v?e("reservations.list.payment.paid","💳 مدفوع"):e("reservations.list.payment.unpaid","💳 غير مدفوع"),h=v?"project-reservation-card__badge--paid":"project-reservation-card__badge--unpaid",C=Ct(t)?`<span class="project-reservation-card__badge project-reservation-card__badge--completed">${s(e("reservations.list.status.completed","📁 منتهي"))}</span>`:"",S=Number.isInteger(a)&&a>=0?` data-index="${a}"`:"",T=`<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${s(String(r??""))}"${S}>${s(e("projects.details.reservations.view","عرض الحجز"))}</button>`;return`
    <article class="project-reservation-card" data-reservation-id="${s(o)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${s(o)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${f}">${s(g)}</span>
          <span class="project-reservation-card__badge ${h}">${s($)}</span>
          ${C}
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
        ${T}
      </div>
    </article>
  `}function rt(t,a,n){return`
    <div class="res-info-row">
      <span class="label">${s(t)} ${s(a)}</span>
      <span class="separator">:</span>
      <span class="value">${s(n)}</span>
    </div>
  `}function it(t){const a=Number(t?.equipmentEstimate)||0,n=$t(t),r=a+n,o=Number(r.toFixed(2)),i=t?.applyTax===!0||t?.applyTax==="true";let l=i?Number(t?.taxAmount):0;i?(!Number.isFinite(l)||l<0)&&(l=Number((o*X).toFixed(2))):l=0;let c=i?Number(t?.totalWithTax):o;return i?(!Number.isFinite(c)||c<=0)&&(c=Number((o+l).toFixed(2))):c=o,{equipmentEstimate:a,expensesTotal:n,subtotal:o,applyTax:i,taxAmount:l,totalWithTax:c}}function K(t){if(!t)return 0;const a=Array.isArray(t?.items)?t.items:[],n=t?.discount??0,r=Number(p(String(n)))||0,o=t?.discountType||"percent",i=Array.isArray(t?.technicians)?t.technicians:[],l=xt(a,r,o,!1,i,{start:t?.start,end:t?.end});if(Number.isFinite(l))return l;const c=Number(p(String(t?.cost??t?.total??0)));return Number.isFinite(c)?Math.round(c):0}function tt(t){if(!t)return"—";const a=new Date(t);if(Number.isNaN(a.getTime()))return"—";const r=st()==="ar"?"ar-SA-u-ca-gregory":"en-GB",o=new Intl.DateTimeFormat(r,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return p(o.format(a))}function q(t){if(!t)return"—";const a=new Date(t);if(Number.isNaN(a.getTime()))return"—";const n=String(a.getDate()).padStart(2,"0"),r=String(a.getMonth()+1).padStart(2,"0"),o=String(a.getFullYear()),i=String(a.getMinutes()).padStart(2,"0"),l=a.getHours(),c=l>=12?"PM":"AM",d=l%12||12,u=String(d).padStart(2,"0"),b=`${n}/${r}/${o} ${u}:${i} ${c}`;return p(b)}function At(t,a){if(!t)return"—";const n=q(t);return a?`${n} - ${q(a)}`:n}function Q(t){if(!t)return e("projects.form.types.unknown","نوع غير محدد");const n={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[t]||"projects.form.types.unknown";return e(n,t)}function Ut(t,{clientName:a="",clientCompany:n=""}={}){const r=z(t)||"",o=t?.projectCode||(r?`PRJ-${p(r)}`:""),i=o?p(String(o)):"",l=Lt(t?.type),c=et(t?.start||""),d=et(t?.end||""),u=t?.paymentStatus==="paid"?"paid":"unpaid",b=t?.applyTax===!0||t?.applyTax==="true",m=t?.description||"",x=e("projects.details.labels.code","رقم المشروع"),g=e("projects.form.labels.client","العميل"),f=e("projects.form.labels.clientCompany","شركة العميل"),v=[i?{icon:"🆔",label:x,value:`#${i}`}:null,a?{icon:"👤",label:g,value:a}:null,n?{icon:"🏢",label:f,value:n}:null].filter(Boolean),$=v.length?`<div class="project-details-info mb-3">
        ${v.map(({icon:_,label:C,value:S})=>rt(_,C,S)).join("")}
      </div>`:"",h=Dt(Array.isArray(t?.expenses)?t.expenses:[]);return`
    <div class="project-details-edit">
      <div class="project-details-header mb-3">
        <h5 class="fw-bold mb-1">${s(e("projects.details.edit.heading","تعديل المشروع"))}</h5>
        <p class="text-muted small mb-0">${s(e("projects.details.edit.subheading","قم بتحديث بيانات المشروع ثم احفظ التغييرات."))}</p>
      </div>
      ${$}
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
            <textarea class="form-control" id="project-edit-description" name="project-description" rows="3">${s(m)}</textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-label">${s(e("projects.form.labels.expenseLabel","اسم المصروف"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-label" placeholder="${s(e("projects.form.placeholders.expenseLabel","مثال: رسوم موقع التصوير"))}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-amount">${s(e("projects.form.labels.expenseAmount","المبلغ (ر.س)"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-amount" inputmode="decimal" placeholder="0">
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-primary" data-action="add-expense">${s(e("projects.form.buttons.addExpense","➕ إضافة مصروف"))}</button>
          </div>
          <div class="col-12">
            <div id="project-edit-expense-list" class="project-edit-expense-list">
              ${h}
            </div>
          </div>
        </div>
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mt-4">
          <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
            <div>
              <label class="form-label" for="project-edit-payment-status">${s(e("projects.form.labels.paymentStatus","حالة الدفع"))}</label>
              <select class="form-select" id="project-edit-payment-status" name="project-payment-status">
                <option value="unpaid" ${u!=="paid"?"selected":""}>${s(e("projects.form.paymentStatus.unpaid","غير مدفوع"))}</option>
                <option value="paid" ${u==="paid"?"selected":""}>${s(e("projects.form.paymentStatus.paid","مدفوع"))}</option>
              </select>
            </div>
            <div class="form-check form-switch m-0 project-edit-tax">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${b?"checked":""}>
              <label class="form-check-label" for="project-edit-tax">${s(e("projects.form.taxLabel","شامل الضريبة (15٪)"))}</label>
            </div>
          </div>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-action="cancel-edit">${s(e("projects.details.edit.cancel","إلغاء"))}</button>
            <button type="submit" class="btn btn-sm btn-primary">${s(e("projects.details.edit.save","💾 حفظ التعديلات"))}</button>
          </div>
        </div>
      </form>
    </div>
  `}function Lt(t){const a=["commercial","coverage","photography","social"],n=a.map(o=>{const i=s(e(`projects.form.types.${o}`,o)),l=String(o)===String(t)?" selected":"";return`<option value="${o}"${l}>${i}</option>`});if(t&&!a.includes(t)){const o=s(Q(t));n.push(`<option value="${s(String(t))}" selected>${o}</option>`)}return`<option value="">${s(e("projects.form.placeholders.type","اختر نوع المشروع"))}</option>${n.join("")}`}function Dt(t=[]){if(!Array.isArray(t)||t.length===0)return`<div class="text-muted small" data-empty>${s(e("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const a=s(e("actions.remove","إزالة"));return t.map(n=>{const r=s(n?.label||""),o=s(j(n?.amount||0)),i=s(String(n?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${r}</div>
            <div class="text-muted small">${o}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${i}" aria-label="${a}">✖</button>
        </div>
      `}).join("")}function et(t){if(!t)return{date:"",time:""};let a=t;a.includes(" ")&&(a=a.replace(" ","T"));const[n="",r=""]=a.split("T"),o=r.match(/(\d{1,2}:\d{2})/);return{date:n?n.slice(0,10):"",time:o?o[0]:""}}function Jt(t,a){if(!t)return"";const n=a&&/\d{1,2}:\d{2}/.test(a)?a:"00:00",[r="00",o="00"]=n.split(":"),i=r.padStart(2,"0"),l=o.padStart(2,"0");return`${t}T${i}:${l}`}function kt(t){if(!t)return null;const a=t.projectId??t.project_id??t.projectID??null;return a!=null?String(a):null}async function Wt(t,a){if(!t)return;const r=nt().filter(c=>{const d=kt(c);return d&&d===String(t)});if(!r.length)return;const o=a==="paid",i=o?"paid":"unpaid";let l=!1;for(const c of r){const d=c?.id??c?.reservationId??c?.reservation_id;if(!d)continue;const u=c?.paid===!0||c?.paid==="paid",b=c?.paidStatus??c?.paymentStatus??(u?"paid":"unpaid");if(!(u===o&&b===i))try{await _t(d,{paid_status:i,paid:o}),l=!0}catch(m){console.error("❌ [projectFocusTemplates] Failed to sync reservation payment status",m)}}l&&document.dispatchEvent(new CustomEvent("reservations:changed"))}export{X as P,Ot as a,Vt as b,Ut as c,Jt as d,kt as e,Dt as f,z as g,it as r,Wt as s};
