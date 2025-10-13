import{t as s,n as p,d as et}from"./auth.js";import{e,d as st,t as bt,f as b,c as ft}from"./projectsCommon.js";import{g as at,t as vt,r as jt,c as gt,v as $t}from"./projectsService.js";const G=.15,xt="bg-primary",yt=2,nt={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},ht={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Ct={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"};function W(t){if(!t)return null;const n=[t?.id,t?.reservationId,t?.reservation_id,t?.reservationID].find(i=>i!=null&&i!=="");return n!=null?String(n):null}function X(t=[]){const a=at();return t.map(n=>{const i=n?.reservation??n;if(!i||typeof i!="object")return null;let o=Number.isInteger(n?.index)&&n.index>=0?n.index:Number.isInteger(n?.reservationIndex)&&n.reservationIndex>=0?n.reservationIndex:null;if(!Number.isInteger(o)||o<0){const r=W(i);r&&(o=a.findIndex(l=>{const c=W(l);return c&&c===r}))}return{reservation:i,index:Number.isInteger(o)&&o>=0?o:-1}}).filter(Boolean)}function V(t){return t?t.id!=null?String(t.id):t.projectId!=null?String(t.projectId):t.project_id!=null?String(t.project_id):null:null}function kt(t,{customer:a=null,techniciansMap:n=new Map,reservations:i=[]}={}){const r=X(i).map(({reservation:C})=>C),l=V(t),c=l?e(l):"",d=st(t),u=s(`projects.status.${d}`,nt[d]),f=ht[d]||"bg-secondary",v=t?.paymentStatus==="paid"?"paid":"unpaid",y=s(`projects.paymentStatus.${v}`,v==="paid"?"Paid":"Unpaid"),$=v==="paid"?"status-paid":"status-unpaid",j=t?.confirmed===!0||t?.confirmed==="true",x=t?.projectCode||(l?`PRJ-${p(l)}`:""),m=x?p(String(x).replace(/^#/,"")):"";m&&`${e(m)}`;const g=K(t?.type);g&&`${xt}${e(g)}`,`${f}${e(u)}`,`${$}${e(y)}`;const _=(t?.title||"").trim()||s("projects.fallback.untitled","Untitled project"),w=(t?.description||"").trim(),N=w?e(bt(w,110)):e(s("projects.fallback.noDescription","No description")),S=Array.isArray(t?.technicians)?t.technicians:[],A=S.map(C=>n.get(String(C))?.name).filter(Boolean),I=A.length?wt(A):"",D=a?.customerName||t?.clientName||"",R=(t?.clientCompany||a?.companyName||"").trim(),k=r.reduce((C,M)=>{const lt=Y(M),dt=(Array.isArray(M?.items)?M.items:[]).reduce((ut,mt)=>ut+(Number(mt?.qty)||0),0),pt=Array.isArray(M?.technicians)?M.technicians.length:0;return{total:C.total+lt,equipment:C.equipment+dt,crew:C.crew+pt}},{total:0,equipment:0,crew:0}),P=Number(k.total.toFixed(2)),B=k.equipment,O=k.crew||S.length,T=it(t),E=T.applyTax?Number(((T.subtotal+P)*G).toFixed(2)):0,q=Number((T.subtotal+P+E).toFixed(2));[m?{icon:"🆔",label:s("projectCards.meta.code","رقم المشروع"),value:`#${m}`}:null,D?{icon:"👤",label:s("projectCards.meta.client","العميل"),value:D}:null,R?{icon:"🏢",label:s("projectCards.meta.company","شركة العميل"),value:R}:null,g?{icon:"🏷️",label:s("projectCards.meta.type","نوع المشروع"),value:g}:null,I?{icon:"👥",label:s("projectCards.stats.crewLabel","عدد الطاقم"),value:I}:null,{icon:"📅",label:s("projectCards.meta.startDate","تاريخ البداية"),value:Z(t?.start)},{icon:"📅",label:s("projectCards.meta.endDate","تاريخ النهاية"),value:t?.end?Z(t.end):"—"}].filter(Boolean),s("projectCards.stats.equipmentCount","عدد المعدات"),p(String(B)),s("projectCards.stats.crewCount","عدد أفراد الطاقم"),p(String(O)),s("projectCards.stats.reservationValue","إجمالي الحجوزات"),b(P),s("projectCards.stats.paymentStatus","حالة الدفع"),s("projectCards.stats.expensesTotal","إجمالي المصاريف"),b(T.expensesTotal),s("projectCards.stats.projectSubtotal","التكلفة التقديرية"),b(T.subtotal),s("projectCards.stats.taxTotal","الضريبة"),b(E),s("projectCards.stats.overallTotal","المجموع الكلي"),b(q);const U=[D?`👤 ${e(D)}`:"",R?`🏢 ${e(R)}`:"",g?`🏷️ ${e(g)}`:"",`📅 ${e(rt(t?.start,t?.end))}`,I?`😎 ${e(s("projectCards.stats.crewLabel","عدد الطاقم"))}: ${e(I)}`:`😎 ${e(s("projectCards.stats.crewLabel","عدد الطاقم"))}: ${p(String(O))}`,`🔗 ${e(s("projectCards.stats.reservationsShort","الحجوزات"))}: ${p(String(r.length))}`].filter(Boolean).map(C=>`<span>${C}</span>`).join(""),Q=[`💸 ${b(T.expensesTotal)}`,`💵 ${b(P)}`,`🧮 ${b(q)}`].map(C=>`<span>${C}</span>`).join(""),H=`<span class="badge ${f} text-white fw-semibold">${e(u)}</span>`,J=`<span class="badge ${$==="status-paid"?"bg-success-subtle text-success":"bg-warning-subtle text-warning"} fw-semibold">${e(y)}</span>`,h=[m?`<span class="badge bg-primary-subtle text-primary fw-semibold">#${e(m)}</span>`:"",g?`<span class="badge bg-base-200 text-base-content fw-semibold">${e(g)}</span>`:""].filter(Boolean).join(" "),L=s("projects.focus.confirmed","✅ مشروع مؤكد"),F=s("projects.focus.pending","⌛ بانتظار التأكيد"),ct=j?`<span class="badge bg-success-subtle text-success fw-semibold">${e(j?L:F)}</span>`:`<button class="btn btn-success btn-sm" data-action="confirm-project" data-id="${c}">${e(s("projects.focus.actions.confirm","✔️ تأكيد المشروع"))}</button>`;return`
    <div class="project-card-grid__item">
      <div class="box h-100 project-card project-focus-card" data-project-id="${c}">
        <div class="d-flex justify-content-between align-items-start gap-2 mb-3">
          <div>
            <h6 class="mb-1">${e(_)}</h6>
            <div class="d-flex flex-wrap gap-2 small text-muted">${h}</div>
          </div>
          <div class="d-flex flex-column align-items-end gap-2">
            ${H}
            ${J}
          </div>
        </div>
        <p class="text-muted small mb-3">${N}</p>
        <div class="d-flex flex-column gap-1 text-muted small">
          ${U}
        </div>
        <div class="d-flex flex-column gap-1 text-muted small mt-3">
          ${Q}
        </div>
        <div class="d-flex flex-wrap gap-2 mt-3">
          ${ct}
        </div>
      </div>
    </div>
  `}function wt(t=[]){if(!t.length)return"";const a=t.slice(0,yt),n=t.length-a.length,i=et()==="ar"?"، ":", ";let o=a.join(i);return n>0&&(o+=`${i}+${p(String(n))}`),o}function Ft(t,{customer:a=null,reservations:n=[]}={}){const i=X(n),o=i.map(({reservation:h})=>h),r=it(t),l=o.reduce((h,L)=>h+Y(L),0),c=Number(l.toFixed(2)),d=o.length,u=r.applyTax?Number(((r.subtotal+c)*G).toFixed(2)):0,f=Number((r.subtotal+c+u).toFixed(2)),v=st(t),y=s(`projects.status.${v}`,nt[v]),$=Ct[v]||"status-confirmed",j=V(t)||"",x=t?.projectCode||(j?`PRJ-${p(j)}`:""),m=x?p(String(x).replace(/^#/,"")):"",g=m?`<span class="project-code-badge">#${e(m)}</span>`:"",_=r.applyTax,w=_?s("projects.details.chips.vatOn","شامل الضريبة 15٪"):s("projects.details.chips.vatOff","غير شامل الضريبة"),N=_?"status-paid":"status-unpaid",S=t?.paymentStatus==="paid"?"paid":"unpaid",A=s(`projects.paymentStatus.${S}`,S==="paid"?"Paid":"Unpaid"),I=S==="paid"?"status-paid":"status-unpaid",R=s("projects.details.chips.reservations","{count} حجوزات").replace("{count}",p(String(d))),k=t?.confirmed===!0||t?.confirmed==="true"?`<span class="reservation-chip status-confirmed">${e(s("projects.focus.confirmed","✅ مشروع مؤكد"))}</span>`:"",P=a?.customerName||t?.clientName||"",B=(t?.clientCompany||a?.companyName||"").trim(),T=(t?.description||"").trim()||s("projects.fallback.noDescription","لا يوجد وصف"),E=[m?{icon:"🆔",label:s("projects.details.labels.code","رقم المشروع"),value:`#${m}`}:null,P?{icon:"👤",label:s("projects.details.client","العميل"),value:P}:null,B?{icon:"🏢",label:s("projects.details.company","شركة العميل"),value:B}:null,{icon:"🏷️",label:s("projects.details.type","نوع المشروع"),value:K(t?.type)},{icon:"🗓️",label:s("projects.details.labels.start","تاريخ البداية"),value:z(t?.start)},{icon:"🗓️",label:s("projects.details.labels.end","تاريخ النهاية"),value:t?.end?z(t.end):"—"},{icon:"🔗",label:s("projects.details.labels.reservationsCount","عدد الحجوزات"),value:p(String(d))}].filter(Boolean),q=s("projects.details.expenses","المصروفات ({amount})").replace("{amount}",b(r.expensesTotal)),U=r.expensesTotal>0?`<ul class="project-details-list">${(t?.expenses||[]).map(h=>`
          <li>
            <span class="project-expense-label">${e(h.label??"")}</span>
            <span class="project-expense-amount">${b(h.amount)}</span>
          </li>
        `).join("")}</ul>`:`<div class="text-muted">${e(s("projects.details.noItems","لا يوجد"))}</div>`,H=[{icon:"💳",label:s("projects.details.summary.paymentStatus","حالة الدفع"),value:A},{icon:"💼",label:s("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:b(r.subtotal)},{icon:"💵",label:s("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:b(c)},{icon:"🧮",label:s("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:b(u)},{icon:"💰",label:s("projects.details.summary.overallTotal","الإجمالي الكلي"),value:b(f)}].map(({icon:h,label:L,value:F})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${e(h)} ${e(L)}</span>
      <span class="summary-details-value">${e(F)}</span>
    </div>
  `).join(""),J=St({project:t,reservations:i});return`
    <div class="project-details-header mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h5 class="mb-2 d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted project-details-title-label">${e(s("projects.details.labels.projectTitle","اسم المشروع"))}:</span>
            <span class="fw-bold project-details-title-text">${e((t?.title||"").trim()||s("projects.fallback.untitled","Untitled project"))}</span>
            ${g}
          </h5>
        </div>
        <div class="status-chips d-flex flex-wrap gap-2">
          <span class="status-chip ${$}">${e(y)}</span>
          <span class="status-chip ${N}">${e(w)}</span>
          <span class="reservation-chip ${I}">${e(A)}</span>
          <span class="reservation-chip status-confirmed">${e(R)}</span>
          ${k}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${E.map(({icon:h,label:L,value:F})=>ot(h,L,F)).join("")}
    </div>
    <div class="project-details-section mb-4">
      <h6>${e(s("projects.details.labels.notes","ملاحظات المشروع"))}</h6>
      <div class="project-notes">${e(T)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${e(q)}</h6>
      ${U}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${H}
    </div>
    ${J}
  `}function St({reservations:t=[],project:a=null}={}){const i=[...X(t)].sort(($,j)=>{const x=$?.reservation?.start?new Date($.reservation.start).getTime():0;return(j?.reservation?.start?new Date(j.reservation.start).getTime():0)-x}),o=s("projects.details.reservations.title","الحجوزات المرتبطة"),r=s("projects.details.reservations.empty","لا توجد حجوزات مرتبطة بهذا المشروع بعد."),l=s("projects.details.reservations.count","{count} حجوزات"),c=i.length?`<span class="badge project-reservations-count">${e(l.replace("{count}",p(String(i.length))))}</span>`:"",d=a?V(a):null,u=s("projects.details.actions.edit","✏️ تعديل المشروع"),f=d?`<button type="button" class="btn btn-sm btn-warning" data-action="edit-project" data-project-id="${e(String(d))}">${e(u)}</button>`:"",v=f?`<div class="d-flex flex-wrap gap-2">${f}</div>`:"",y=i.length?`<div class="project-reservations-list">${i.map(({reservation:$,index:j})=>Tt($,j,a)).join("")}</div>`:`<div class="alert alert-info project-reservations-empty mb-0">${e(r)}</div>`;return`
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex justify-content-between align-items-center gap-2 flex-wrap">
        <div class="d-flex align-items-center gap-2">
          <h6 class="mb-0">${e(o)}</h6>
          ${c}
        </div>
        ${v}
      </div>
      ${y}
    </section>
  `}function Tt(t,a=-1,n=null){const i=W(t)??"-",o=p(String(i)),r=rt(t?.start,t?.end),l=Y(t),c=b(l),d=p(String((t?.items||[]).length)),u=p(String((t?.technicians||[]).length)),f=s("projects.details.reservations.itemsCount","{count} معدة").replace("{count}",d),v=s("projects.details.reservations.crewCount","{count} من الطاقم").replace("{count}",u),{effectiveConfirmed:y}=jt(t,n),$=y?s("reservations.list.status.confirmed","✅ مؤكد"):s("reservations.list.status.pending","⏳ غير مؤكد"),j=y?"project-reservation-card__badge--confirmed":"project-reservation-card__badge--pending",x=t?.paid===!0||t?.paid==="paid",m=x?s("reservations.list.payment.paid","💳 مدفوع"):s("reservations.list.payment.unpaid","💳 غير مدفوع"),g=x?"project-reservation-card__badge--paid":"project-reservation-card__badge--unpaid",w=gt(t)?`<span class="project-reservation-card__badge project-reservation-card__badge--completed">${e(s("reservations.list.status.completed","📁 منتهي"))}</span>`:"",N=Number.isInteger(a)&&a>=0?` data-index="${a}"`:"",S=`<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${e(String(i??""))}"${N}>${e(s("projects.details.reservations.view","عرض الحجز"))}</button>`;return`
    <article class="project-reservation-card" data-reservation-id="${e(o)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${e(o)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${j}">${e($)}</span>
          <span class="project-reservation-card__badge ${g}">${e(m)}</span>
          ${w}
        </div>
      </div>
      <div class="project-reservation-card__range">${e(r)}</div>
      <div class="project-reservation-card__meta">
        <span>📦 ${e(f)}</span>
        <span>😎 ${e(v)}</span>
      </div>
      <div class="project-reservation-card__footer">
        <span class="text-muted">${e(s("projectCards.stats.reservationValue","إجمالي الحجوزات"))}</span>
        <span class="fw-bold">${e(c)}</span>
        ${S}
      </div>
    </article>
  `}function ot(t,a,n){return`
    <div class="res-info-row">
      <span class="label">${e(t)} ${e(a)}</span>
      <span class="separator">:</span>
      <span class="value">${e(n)}</span>
    </div>
  `}function it(t){const a=Number(t?.equipmentEstimate)||0,n=ft(t),i=a+n,o=Number(i.toFixed(2)),r=t?.applyTax===!0||t?.applyTax==="true";let l=r?Number(t?.taxAmount):0;r?(!Number.isFinite(l)||l<0)&&(l=Number((o*G).toFixed(2))):l=0;let c=r?Number(t?.totalWithTax):o;return r?(!Number.isFinite(c)||c<=0)&&(c=Number((o+l).toFixed(2))):c=o,{equipmentEstimate:a,expensesTotal:n,subtotal:o,applyTax:r,taxAmount:l,totalWithTax:c}}function Y(t){if(!t)return 0;const a=Array.isArray(t?.items)?t.items:[],n=t?.discount??0,i=Number(p(String(n)))||0,o=t?.discountType||"percent",r=Array.isArray(t?.technicians)?t.technicians:[],l=vt(a,i,o,!1,r,{start:t?.start,end:t?.end});if(Number.isFinite(l))return l;const c=Number(p(String(t?.cost??t?.total??0)));return Number.isFinite(c)?Math.round(c):0}function Z(t){if(!t)return"—";const a=new Date(t);if(Number.isNaN(a.getTime()))return"—";const i=et()==="ar"?"ar-SA":"en-GB",o=new Intl.DateTimeFormat(i,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return p(o.format(a))}function z(t){if(!t)return"—";const a=new Date(t);if(Number.isNaN(a.getTime()))return"—";const n=String(a.getDate()).padStart(2,"0"),i=String(a.getMonth()+1).padStart(2,"0"),o=String(a.getFullYear()),r=String(a.getMinutes()).padStart(2,"0"),l=a.getHours(),c=l>=12?"PM":"AM",d=l%12||12,u=String(d).padStart(2,"0"),f=`${n}/${i}/${o} ${u}:${r} ${c}`;return p(f)}function rt(t,a){if(!t)return"—";const n=z(t);return a?`${n} - ${z(a)}`:n}function K(t){if(!t)return s("projects.form.types.unknown","نوع غير محدد");const n={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[t]||"projects.form.types.unknown";return s(n,t)}function Mt(t,{clientName:a="",clientCompany:n=""}={}){const i=V(t)||"",o=t?.projectCode||(i?`PRJ-${p(i)}`:""),r=o?p(String(o)):"",l=_t(t?.type),c=tt(t?.start||""),d=tt(t?.end||""),u=t?.paymentStatus==="paid"?"paid":"unpaid",f=t?.applyTax===!0||t?.applyTax==="true",v=t?.description||"",y=s("projects.details.labels.code","رقم المشروع"),$=s("projects.form.labels.client","العميل"),j=s("projects.form.labels.clientCompany","شركة العميل"),x=[r?{icon:"🆔",label:y,value:`#${r}`}:null,a?{icon:"👤",label:$,value:a}:null,n?{icon:"🏢",label:j,value:n}:null].filter(Boolean),m=x.length?`<div class="project-details-info mb-3">
        ${x.map(({icon:_,label:w,value:N})=>ot(_,w,N)).join("")}
      </div>`:"",g=Nt(Array.isArray(t?.expenses)?t.expenses:[]);return`
    <div class="project-details-edit">
      <div class="project-details-header mb-3">
        <h5 class="fw-bold mb-1">${e(s("projects.details.edit.heading","تعديل المشروع"))}</h5>
        <p class="text-muted small mb-0">${e(s("projects.details.edit.subheading","قم بتحديث بيانات المشروع ثم احفظ التغييرات."))}</p>
      </div>
      ${m}
      <form id="project-details-edit-form" class="project-details-edit-form">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label" for="project-edit-title">${e(s("projects.form.labels.title","اسم المشروع"))}</label>
            <input type="text" class="form-control" id="project-edit-title" name="project-title" value="${e(t?.title||"")}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-type">${e(s("projects.form.labels.type","نوع المشروع"))}</label>
            <select class="form-select" id="project-edit-type" name="project-type" required>
              ${l}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-date">${e(s("projects.form.labels.startDate","📅 تاريخ البداية"))}</label>
            <input type="date" class="form-control" id="project-edit-start-date" name="project-start-date" value="${e(c.date)}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-time">${e(s("projects.form.labels.startTime","⏰ وقت البداية"))}</label>
            <input type="time" class="form-control" id="project-edit-start-time" name="project-start-time" value="${e(c.time)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-date">${e(s("projects.form.labels.endDate","📅 تاريخ النهاية"))}</label>
            <input type="date" class="form-control" id="project-edit-end-date" name="project-end-date" value="${e(d.date)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-time">${e(s("projects.form.labels.endTime","⏰ وقت النهاية"))}</label>
            <input type="time" class="form-control" id="project-edit-end-time" name="project-end-time" value="${e(d.time)}">
          </div>
          <div class="col-12">
            <label class="form-label" for="project-edit-description">${e(s("projects.details.labels.notes","ملاحظات المشروع"))}</label>
            <textarea class="form-control" id="project-edit-description" name="project-description" rows="3">${e(v)}</textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-label">${e(s("projects.form.labels.expenseLabel","اسم المصروف"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-label" placeholder="${e(s("projects.form.placeholders.expenseLabel","مثال: رسوم موقع التصوير"))}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-amount">${e(s("projects.form.labels.expenseAmount","المبلغ (ر.س)"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-amount" inputmode="decimal" placeholder="0">
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-primary" data-action="add-expense">${e(s("projects.form.buttons.addExpense","➕ إضافة مصروف"))}</button>
          </div>
          <div class="col-12">
            <div id="project-edit-expense-list" class="project-edit-expense-list">
              ${g}
            </div>
          </div>
        </div>
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mt-4">
          <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
            <div>
              <label class="form-label" for="project-edit-payment-status">${e(s("projects.form.labels.paymentStatus","حالة الدفع"))}</label>
              <select class="form-select" id="project-edit-payment-status" name="project-payment-status">
                <option value="unpaid" ${u!=="paid"?"selected":""}>${e(s("projects.form.paymentStatus.unpaid","غير مدفوع"))}</option>
                <option value="paid" ${u==="paid"?"selected":""}>${e(s("projects.form.paymentStatus.paid","مدفوع"))}</option>
              </select>
            </div>
            <div class="form-check form-switch m-0 project-edit-tax">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${f?"checked":""}>
              <label class="form-check-label" for="project-edit-tax">${e(s("projects.form.taxLabel","شامل الضريبة (15٪)"))}</label>
            </div>
          </div>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-action="cancel-edit">${e(s("projects.details.edit.cancel","إلغاء"))}</button>
            <button type="submit" class="btn btn-sm btn-primary">${e(s("projects.details.edit.save","💾 حفظ التعديلات"))}</button>
          </div>
        </div>
      </form>
    </div>
  `}function _t(t){const a=["commercial","coverage","photography","social"],n=a.map(o=>{const r=e(s(`projects.form.types.${o}`,o)),l=String(o)===String(t)?" selected":"";return`<option value="${o}"${l}>${r}</option>`});if(t&&!a.includes(t)){const o=e(K(t));n.push(`<option value="${e(String(t))}" selected>${o}</option>`)}return`<option value="">${e(s("projects.form.placeholders.type","اختر نوع المشروع"))}</option>${n.join("")}`}function Nt(t=[]){if(!Array.isArray(t)||t.length===0)return`<div class="text-muted small" data-empty>${e(s("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const a=e(s("actions.remove","إزالة"));return t.map(n=>{const i=e(n?.label||""),o=e(b(n?.amount||0)),r=e(String(n?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${i}</div>
            <div class="text-muted small">${o}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${r}" aria-label="${a}">✖</button>
        </div>
      `}).join("")}function tt(t){if(!t)return{date:"",time:""};let a=t;a.includes(" ")&&(a=a.replace(" ","T"));const[n="",i=""]=a.split("T"),o=i.match(/(\d{1,2}:\d{2})/);return{date:n?n.slice(0,10):"",time:o?o[0]:""}}function Bt(t,a){if(!t)return"";const n=a&&/\d{1,2}:\d{2}/.test(a)?a:"00:00",[i="00",o="00"]=n.split(":"),r=i.padStart(2,"0"),l=o.padStart(2,"0");return`${t}T${r}:${l}`}function Pt(t){if(!t)return null;const a=t.projectId??t.project_id??t.projectID??null;return a!=null?String(a):null}async function Et(t,a){if(!t)return;const i=at().filter(c=>{const d=Pt(c);return d&&d===String(t)});if(!i.length)return;const o=a==="paid",r=o?"paid":"unpaid";let l=!1;for(const c of i){const d=c?.id??c?.reservationId??c?.reservation_id;if(!d)continue;const u=c?.paid===!0||c?.paid==="paid",f=c?.paidStatus??c?.paymentStatus??(u?"paid":"unpaid");if(!(u===o&&f===r))try{await $t(d,{paid_status:r,paid:o}),l=!0}catch(v){console.error("❌ [projectFocusTemplates] Failed to sync reservation payment status",v)}}l&&document.dispatchEvent(new CustomEvent("reservations:changed"))}export{G as P,Ft as a,kt as b,Mt as c,Bt as d,Pt as e,Nt as f,V as g,Et as s};
