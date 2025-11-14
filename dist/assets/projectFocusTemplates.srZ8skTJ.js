import{n as b,t,p as Se}from"./auth.B4XUmSYg.js";import{c as Be,e as a,d as _e,t as He,f as m}from"./state.DnWIUPO4.js";import{e as we,c as ze,d as Oe,g as Ce,a as Ue,i as We,D as $e,u as Je}from"./reservationsService.DZ-N01gk.js";const G=.15,Xe=2,Ne={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},Ye={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed"};function be(e){if(!e)return null;const n=[e?.id,e?.reservationId,e?.reservation_id,e?.reservationID].find(r=>r!=null&&r!=="");return n!=null?String(n):null}function ye(e=[]){const s=Ce();return e.map(n=>{const r=n?.reservation??n;if(!r||typeof r!="object")return null;let o=Number.isInteger(n?.index)&&n.index>=0?n.index:Number.isInteger(n?.reservationIndex)&&n.reservationIndex>=0?n.reservationIndex:null;if(!Number.isInteger(o)||o<0){const c=be(r);c&&(o=s.findIndex(l=>{const i=be(l);return i&&i===c}))}return{reservation:r,index:Number.isInteger(o)&&o>=0?o:-1}}).filter(Boolean)}function ve(e){return e?e.id!=null?String(e.id):e.projectId!=null?String(e.projectId):e.project_id!=null?String(e.project_id):null:null}function lt(e,{customer:s=null,techniciansMap:n=new Map,reservations:r=[]}={}){const c=ye(r).map(({reservation:_})=>_),l=ve(e),i=l?a(l):"",d=_e(e),f=t(`projects.status.${d}`,Ne[d]),v=Ye[d]||"bg-secondary",y=fe(e)||{},x=Number(y.subtotal||0),T=(c||[]).reduce((_,j)=>_+re(j),0),$=y.applyTax?Number(((x+T)*G).toFixed(2)):0,h=Number((x+T+$).toFixed(2)),u=Array.isArray(e?.paymentHistory)?e.paymentHistory:Array.isArray(e?.payments)?e.payments:[],R=ze({totalAmount:h,paidAmount:u.length?0:e.paidAmount,paidPercent:u.length?0:e.paidPercent,history:u}),S=Oe({manualStatus:null,paidAmount:R.paidAmount,paidPercent:R.paidPercent,totalAmount:h}),N=t(`projects.paymentStatus.${S}`,S==="paid"?"Paid":S==="partial"?"Partially Paid":"Unpaid"),L=S==="paid"?"status-paid":S==="partial"?"status-partial":"status-unpaid",A=[S==="paid"?"project-focus-card--paid":"project-focus-card--unpaid"],D=e?.confirmed===!0||e?.confirmed==="true";D&&A.push("project-focus-card--confirmed");const M=e?.projectCode||(l?`PRJ-${b(l)}`:""),I=M?b(String(M).replace(/^#/,"")):"",J=I?`<span class="project-code-badge project-focus-card__code">#${a(I)}</span>`:"",V=he(e?.type),B="",H=`<span class="${v}">${a(f)}</span>`,K=`<span class="reservation-chip ${L} project-focus-card__payment-chip">${a(N)}</span>`,ce=(e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"),Q=(e?.description||"").trim(),le=Q?a(He(Q,110)):a(t("projects.fallback.noDescription","No description")),Z=Array.isArray(e?.technicians)?e.technicians:[],g=Z.map(_=>n.get(String(_))?.name).filter(Boolean),ee=g.length?Ge(g):"",te=s?.customerName||e?.clientName||"";(e?.clientCompany||s?.companyName||"").trim();const p=c.reduce((_,j)=>{const Le=re(j),ge=Array.isArray(j?.items)?j.items:[],Ee=ge.reduce((Me,Ve)=>Me+(Number(Ve?.qty)||0),0),qe=Array.isArray(j?.technicians)?j.technicians.length:0,je=Array.isArray(j?.crewAssignments)?j.crewAssignments:[],q=je.length?je:Array.isArray(j?.technicians)?j.technicians:[],ue=we({items:ge,technicianIds:Array.isArray(q)&&!q.length?q:[],crewAssignments:Array.isArray(q)&&q.length&&typeof q[0]=="object"?q:[],discount:j?.discount??0,discountType:j?.discountType||"percent",applyTax:!1,start:j?.start,end:j?.end,companySharePercent:null});return{total:_.total+Le,equipment:_.equipment+Number(ue.equipmentTotal||0),crew:_.crew+Number(ue.crewTotal||0),crewCost:_.crewCost+Number(ue.crewCostTotal||0),equipmentCountTotal:(_.equipmentCountTotal||0)+Ee,crewCountTotal:(_.crewCountTotal||0)+qe}},{total:0,equipment:0,crew:0,crewCost:0,equipmentCountTotal:0,crewCountTotal:0}),w=Number(p.total.toFixed(2)),C=p.equipmentCountTotal||0,ae=p.crewCountTotal||Z.length,se=fe(e),P=Number(se.expensesTotal||0),z=Number((p.equipment+p.crew+P).toFixed(2)),X=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let F=(e?.discountType==="amount"?"amount":"percent")==="amount"?X:z*(X/100);(!Number.isFinite(F)||F<0)&&(F=0),F>z&&(F=z);const Y=Math.max(0,z-F),O=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",k=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,U=O&&k>0?k:0,oe=Number((Y*(U/100)).toFixed(2)),de=se.applyTax?Number(((Y+oe)*G).toFixed(2)):0,W=Number((Y+oe+de).toFixed(2)),pe=[I?{icon:"🆔",label:t("projectCards.meta.code","رقم المشروع"),value:`#${I}`}:null,te?{icon:"👤",label:t("projectCards.meta.client","العميل"),value:te}:null,V?{icon:"🏷️",label:t("projectCards.meta.type","نوع المشروع"),value:V}:null,ee?{icon:"👥",label:t("projectCards.stats.crewLabel","عدد الطاقم"),value:ee}:null,{icon:"📅",label:t("projectCards.meta.startDate","تاريخ البداية"),value:xe(e?.start)},{icon:"📅",label:t("projectCards.meta.endDate","تاريخ النهاية"),value:e?.end?xe(e.end):"—"}].filter(Boolean),E=[{icon:"📦",label:t("projectCards.stats.equipmentCount","عدد المعدات"),value:b(String(C))},{icon:"😎",label:t("projectCards.stats.crewCount","عدد أفراد الطاقم"),value:b(String(ae))},{icon:"💵",label:t("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:m(w)}],Pe=[{icon:"💳",label:t("projectCards.stats.paymentStatus","حالة الدفع"),value:N},{icon:"💸",label:t("projectCards.stats.expensesTotal","خدمات إنتاجية (التكلفة)"),value:m(se.expensesTotal)},{icon:"💵",label:t("projects.details.summary.finalTotal","الإجمالي النهائي"),value:m(W)}],Fe=[me("projectCards.groups.meta","بيانات المشروع",pe),me("projectCards.groups.reservations","موجز الحجز",E),me("projectCards.groups.payment","ملخص الدفع",Pe)].filter(Boolean).join(""),Re=t("projects.focus.confirmed","✅ مشروع مؤكد"),De=t("projects.focus.pending","⌛ بانتظار التأكيد"),Ie=`<div class="project-focus-card__actions"><span class="reservation-chip ${D?"status-confirmed":"status-pending"} project-focus-card__confirm-indicator">${a(D?Re:De)}</span></div>`,ke=[J,B,H,K].filter(Boolean).join(`
          `);return`
    <div class="project-card-grid__item">
      <article class="${["project-focus-card",...A].join(" ")}" data-project-id="${i}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${ke}
        </div>
        <h6 class="project-focus-card__title">${a(ce)}</h6>
        <p class="project-focus-card__description">${le}</p>
        <div class="project-focus-card__sections">
          ${Fe}
        </div>
        ${Ie}
      </article>
    </div>
  `}function me(e,s,n=[]){if(!n.length)return"";const r=n.map(({icon:o,label:c,value:l})=>`
        <div class="project-focus-card__row">
          <span class="project-focus-card__row-label">${o?`<span class="project-focus-card__row-icon">${a(o)}</span>`:""}${a(c)}</span>
          <span class="project-focus-card__row-value">${a(String(l))}</span>
        </div>
      `).join("");return`
    <div class="project-focus-card__section">
      <span class="project-focus-card__section-title">${a(t(e,s))}</span>
      <div class="project-focus-card__section-box">
        ${r}
      </div>
    </div>
  `}function Ge(e=[]){if(!e.length)return"";const s=e.slice(0,Xe),n=e.length-s.length,r=Se()==="ar"?"، ":", ";let o=s.join(r);return n>0&&(o+=`${r}+${b(String(n))}`),o}function dt(e,{customer:s=null,reservations:n=[]}={}){const r=ye(n),o=r.map(({reservation:p})=>p),c=fe(e),l=o.reduce((p,w)=>p+re(w),0),i=Number(l.toFixed(2)),d=o.length,f=c.applyTax?Number(((c.subtotal+i)*G).toFixed(2)):0,v=Number((c.subtotal+i+f).toFixed(2)),y=_e(e),x=t(`projects.status.${y}`,Ne[y]),T=statusChipClassMap[y]||"status-confirmed",$=ve(e)||"",h=e?.projectCode||($?`PRJ-${b($)}`:""),u=h?b(String(h).replace(/^#/,"")):"",R=u?`<span class="project-code-badge">#${a(u)}</span>`:"",S=c.applyTax,N=S?t("projects.details.chips.vatOn","شامل الضريبة 15٪"):t("projects.details.chips.vatOff","غير شامل الضريبة"),L=S?"status-paid":"status-unpaid",A=e?.paymentStatus==="paid"?"paid":"unpaid",D=t(`projects.paymentStatus.${A}`,A==="paid"?"Paid":"Unpaid"),M=A==="paid"?"status-paid":"status-unpaid",J=t("projects.details.chips.reservations","{count} حجوزات").replace("{count}",b(String(d))),V=e?.confirmed===!0||e?.confirmed==="true"?`<span class="reservation-chip status-confirmed">${a(t("projects.focus.confirmed","✅ مشروع مؤكد"))}</span>`:"",B=s?.customerName||e?.clientName||"",H=(e?.clientCompany||s?.companyName||"").trim(),ce=(e?.description||"").trim()||t("projects.fallback.noDescription","لا يوجد وصف"),Q=[u?{icon:"🆔",label:t("projects.details.labels.code","رقم المشروع"),value:`#${u}`}:null,B?{icon:"👤",label:t("projects.details.client","العميل"),value:B}:null,H?{icon:"🏢",label:t("projects.details.company","شركة العميل"),value:H}:null,{icon:"🏷️",label:t("projects.details.type","نوع المشروع"),value:he(e?.type)},{icon:"🗓️",label:t("projects.details.labels.start","تاريخ البداية"),value:ie(e?.start)},{icon:"🗓️",label:t("projects.details.labels.end","تاريخ النهاية"),value:e?.end?ie(e.end):"—"},{icon:"🔗",label:t("projects.details.labels.reservationsCount","عدد الحجوزات"),value:b(String(d))}].filter(Boolean),le=t("projects.details.expenses","المصروفات ({amount})").replace("{amount}",m(c.expensesTotal)),Z=c.expensesTotal>0?`<ul class="project-details-list">${(e?.expenses||[]).map(p=>`
          <li>
            <span class="project-expense-label">${a(p.label??"")}</span>
            <span class="project-expense-amount">${m(p.amount)}</span>
            ${p?.note??p?.notes?`<div class="text-muted small">${a(String(p.note??p.notes))}</div>`:""}
          </li>
        `).join("")}</ul>`:`<div class="text-muted">${a(t("projects.details.noItems","لا يوجد"))}</div>`;let g=[];if(g.push({icon:"💳",label:t("projects.details.summary.paymentStatus","حالة الدفع"),value:D}),d>0){const p=o.reduce((W,pe)=>{const E=typeof computeReservationFinancials=="function"?computeReservationFinancials(pe):null;return E&&typeof E=="object"&&(W.equipment+=Number(E.equipmentTotal||0),W.crew+=Number(E.crewTotal||0),W.crewCost+=Number(E.crewCostTotal||0)),W},{equipment:0,crew:0,crewCost:0}),w=Number(c.expensesTotal||0),C=Number((p.equipment+p.crew).toFixed(2)),ae=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let P=(e?.discountType==="amount"?"amount":"percent")==="amount"?ae:C*(ae/100);(!Number.isFinite(P)||P<0)&&(P=0),P>C&&(P=C);const z=e?.applyTax===!0||e?.applyTax==="true",X=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",ne=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,F=z||X&&ne>0,Y=X&&F&&ne>0?ne:0,O=Math.max(0,C-P),k=Number((O*(Y/100)).toFixed(2)),U=F?Number(((O+k)*G).toFixed(2)):0,oe=Number((O-k-U-w-p.crewCost).toFixed(2)),de=Number((O+k+U).toFixed(2));p.equipment>0&&g.push({icon:"🎛️",label:t("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:m(p.equipment)}),p.crew>0&&g.push({icon:"😎",label:t("projects.details.summary.crewTotal","إجمالي الفريق"),value:m(p.crew)}),p.crewCost>0&&g.push({icon:"🧾",label:t("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:m(p.crewCost)}),w>0&&g.push({icon:"🧾",label:t("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:m(w)}),g.push({icon:"🧮",label:t("projects.details.summary.gross","الإجمالي"),value:m(C)}),P>0&&g.push({icon:"🏷️",label:t("projects.details.summary.discount","الخصم"),value:`−${m(P)}`}),k>0&&g.push({icon:"🏦",label:t("projects.details.summary.companyShare","نسبة الشركة"),value:`−${m(k)}`}),U>0&&g.push({icon:"💸",label:t("projects.details.summary.tax","الضريبة (15٪)"),value:`−${m(U)}`}),g.push({icon:"💵",label:t("projects.details.summary.netProfit","صافي الربح"),value:m(oe)}),g.push({icon:"💰",label:t("projects.details.summary.finalTotal","المجموع النهائي"),value:m(de)})}else g.push({icon:"💼",label:t("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:m(c.subtotal)}),g.push({icon:"🧮",label:t("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:m(f)}),g.push({icon:"💰",label:t("projects.details.summary.overallTotal","الإجمالي الكلي"),value:m(v)});const ee=g.map(({icon:p,label:w,value:C})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${a(p)} ${a(w)}</span>
      <span class="summary-details-value">${a(C)}</span>
    </div>
  `).join(""),te=Ke({project:e,reservations:r});return`
    <div class="project-details-header mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h5 class="mb-2 d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted project-details-title-label">${a(t("projects.details.labels.projectTitle","اسم المشروع"))}:</span>
            <span class="fw-bold project-details-title-text">${a((e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"))}</span>
            ${R}
          </h5>
        </div>
        <div class="status-chips d-flex flex-wrap gap-2">
          <span class="status-chip ${T}">${a(x)}</span>
          <span class="status-chip ${L}">${a(N)}</span>
          <span class="reservation-chip ${M}">${a(D)}</span>
          <span class="reservation-chip status-confirmed">${a(J)}</span>
          ${V}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${Q.map(({icon:p,label:w,value:C})=>Ae(p,w,C)).join("")}
    </div>
    <div class="project-details-section mb-4">
      <h6>${a(t("projects.details.labels.notes","ملاحظات المشروع"))}</h6>
      <div class="project-notes">${a(ce)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${a(le)}</h6>
      ${Z}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${ee}
    </div>
    ${te}
  `}function Ke({reservations:e=[],project:s=null}={}){const r=[...ye(e)].sort((i,d)=>{const f=i?.reservation?.start?new Date(i.reservation.start).getTime():0;return(d?.reservation?.start?new Date(d.reservation.start).getTime():0)-f}),o=t("projects.details.reservations.title","الحجوزات المرتبطة"),c=t("projects.details.reservations.empty","لا توجد حجوزات مرتبطة بهذا المشروع بعد."),l=r.length?`<div class="project-reservations-list">${r.map(({reservation:i,index:d})=>Qe(i,d,s)).join("")}</div>`:`<div class="alert alert-info project-reservations-empty mb-0">${a(c)}</div>`;return`
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex align-items-center gap-2 flex-wrap">
        <h6 class="mb-0">${a(o)}</h6>
      </div>
      ${l}
    </section>
  `}function Qe(e,s=-1,n=null){const r=be(e)??"-",o=b(String(r)),c=Ze(e?.start,e?.end),l=re(e),i=m(l),d=b(String((e?.items||[]).length)),f=b(String((e?.technicians||[]).length)),v=t("projects.details.reservations.itemsCount","{count} معدة").replace("{count}",d),y=t("projects.details.reservations.crewCount","{count} من الطاقم").replace("{count}",f),{effectiveConfirmed:x}=Ue(e,n),T=x?t("reservations.list.status.confirmed","✅ مؤكد"):t("reservations.list.status.pending","⏳ غير مؤكد"),$=x?"project-reservation-card__badge--confirmed":"project-reservation-card__badge--pending",h=e?.paid===!0||e?.paid==="paid",u=h?t("reservations.list.payment.paid","💳 مدفوع"):t("reservations.list.payment.unpaid","💳 غير مدفوع"),R=h?"project-reservation-card__badge--paid":"project-reservation-card__badge--unpaid",N=We(e)?`<span class="project-reservation-card__badge project-reservation-card__badge--completed">${a(t("reservations.list.status.completed","📁 منتهي"))}</span>`:"",L=Number.isInteger(s)&&s>=0?` data-index="${s}"`:"",A=`<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${a(String(r??""))}"${L}>${a(t("projects.details.reservations.view","عرض الحجز"))}</button>`;return`
    <article class="project-reservation-card" data-reservation-id="${a(o)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${a(o)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${$}">${a(T)}</span>
          <span class="project-reservation-card__badge ${R}">${a(u)}</span>
          ${N}
        </div>
      </div>
      <div class="project-reservation-card__range">${a(c)}</div>
      <div class="project-reservation-card__meta">
        <span>📦 ${a(v)}</span>
        <span>😎 ${a(y)}</span>
      </div>
      <div class="project-reservation-card__footer">
        <span class="text-muted">${a(t("projectCards.stats.reservationValue","إجمالي الحجوزات"))}</span>
        <span class="fw-bold">${a(i)}</span>
        ${A}
      </div>
    </article>
  `}function Ae(e,s,n){return`
    <div class="res-info-row">
      <span class="label">${a(e)} ${a(s)}</span>
      <span class="separator">:</span>
      <span class="value">${a(n)}</span>
    </div>
  `}function fe(e){const s=Number(e?.equipmentEstimate)||0,n=Be(e),r=s+n,o=e?.applyTax===!0||e?.applyTax==="true",c=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let i=(e?.discountType==="amount"?"amount":"percent")==="amount"?c:r*(c/100);(!Number.isFinite(i)||i<0)&&(i=0),i>r&&(i=r);const d=Math.max(0,r-i),f=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",v=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,y=o||f&&v>0,x=f&&y&&v>0?v:0,T=x>0?Number((d*(x/100)).toFixed(2)):0,$=d+T;let h=y?$*G:0;(!Number.isFinite(h)||h<0)&&(h=0),h=Number(h.toFixed(2));let u=y?Number(e?.totalWithTax):$;return y?(!Number.isFinite(u)||u<=0)&&(u=Number(($+h).toFixed(2))):u=$,{equipmentEstimate:s,expensesTotal:n,baseSubtotal:r,discountAmount:i,subtotalAfterDiscount:d,companyShareAmount:T,subtotal:$,applyTax:y,taxAmount:h,totalWithTax:u}}function re(e){if(!e)return 0;const s=Array.isArray(e?.items)?e.items:[],n=e?.discount??e?.discountValue??0,r=Number(b(String(n)))||0,o=e?.discountType??e?.discount_type??"percent",c=String(o).toLowerCase()==="amount"?"amount":"percent",l=Array.isArray(e?.crewAssignments)?e.crewAssignments:[],i=l.length?l:Array.isArray(e?.technicians)?e.technicians:[],d=we({items:s,technicianIds:Array.isArray(i)&&!i.length?i:[],crewAssignments:Array.isArray(i)&&i.length&&typeof i[0]=="object"?i:[],discount:r,discountType:c,applyTax:!1,start:e?.start,end:e?.end,companySharePercent:0,groupingSource:e});return Number.isFinite(Number(d?.finalTotal))?Number(d.finalTotal):0}function xe(e){if(!e)return"—";const s=new Date(e);if(Number.isNaN(s.getTime()))return"—";const r=Se()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-GB",o=new Intl.DateTimeFormat(r,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return b(o.format(s))}function ie(e){if(!e)return"—";const s=new Date(e);if(Number.isNaN(s.getTime()))return"—";const n=String(s.getDate()).padStart(2,"0"),r=String(s.getMonth()+1).padStart(2,"0"),o=String(s.getFullYear()),c=String(s.getMinutes()).padStart(2,"0"),l=s.getHours(),i=l>=12?"PM":"AM",d=l%12||12,f=String(d).padStart(2,"0"),v=`${n}/${r}/${o} ${f}:${c} ${i}`;return b(v)}function Ze(e,s){if(!e)return"—";const n=ie(e);return s?`${n} - ${ie(s)}`:n}function he(e){if(!e)return t("projects.form.types.unknown","نوع غير محدد");const n={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return t(n,e)}function pt(e,{clientName:s="",clientCompany:n=""}={}){const r=ve(e)||"",o=e?.projectCode||(r?`PRJ-${b(r)}`:""),c=o?b(String(o)):"",l=et(e?.type),i=Te(e?.start||""),d=Te(e?.end||""),f=typeof e?.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",v=["paid","partial"].includes(f)?f:"unpaid",y=e?.applyTax===!0||e?.applyTax==="true",x=e?.description||"",T=e?.discountType==="amount"?"amount":"percent",$=b(String(e?.discount??e?.discountValue??0)),h=e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??$e,u=Number.parseFloat(b(String(h))),R=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true"||y&&Number.isFinite(u)&&u>0,S=Number.isFinite(u)&&u>0?u:$e,N=e?.paymentProgressType==="amount"?"amount":e?.paymentProgressType==="percent"?"percent":e?.payment_progress_type==="amount"?"amount":(e?.payment_progress_type==="percent","percent"),L=b(String(e?.paymentProgressValue??e?.payment_progress_value??(N==="amount"?e?.paidAmount??e?.paid_amount:e?.paidPercent??e?.paid_percent)??"")),A=t("projects.details.labels.code","رقم المشروع"),D=t("projects.form.labels.client","العميل"),M=t("projects.form.labels.clientCompany","شركة العميل"),I=[c?{icon:"🆔",label:A,value:`#${c}`}:null,s?{icon:"👤",label:D,value:s}:null,n?{icon:"🏢",label:M,value:n}:null].filter(Boolean),J=I.length?`<div class="project-details-info mb-3">
        ${I.map(({icon:B,label:H,value:K})=>Ae(B,H,K)).join("")}
      </div>`:"",V=tt(Array.isArray(e?.expenses)?e.expenses:[]);return`
    <div class="project-details-edit">
      <div class="project-details-header mb-3">
        <h5 class="fw-bold mb-1">${a(t("projects.details.edit.heading","تعديل المشروع"))}</h5>
        <p class="text-muted small mb-0">${a(t("projects.details.edit.subheading","قم بتحديث بيانات المشروع ثم احفظ التغييرات."))}</p>
      </div>
      ${J}
      <form id="project-details-edit-form" class="project-details-edit-form">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label" for="project-edit-title">${a(t("projects.form.labels.title","اسم المشروع"))}</label>
            <input type="text" class="form-control" id="project-edit-title" name="project-title" value="${a(e?.title||"")}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-type">${a(t("projects.form.labels.type","نوع المشروع"))}</label>
            <select class="form-select" id="project-edit-type" name="project-type" required>
              ${l}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-date">${a(t("projects.form.labels.startDate","📅 تاريخ البداية"))}</label>
            <input type="date" class="form-control" id="project-edit-start-date" name="project-start-date" value="${a(i.date)}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-time">${a(t("projects.form.labels.startTime","⏰ وقت البداية"))}</label>
            <input type="time" class="form-control" id="project-edit-start-time" name="project-start-time" value="${a(i.time)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-date">${a(t("projects.form.labels.endDate","📅 تاريخ النهاية"))}</label>
            <input type="date" class="form-control" id="project-edit-end-date" name="project-end-date" value="${a(d.date)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-time">${a(t("projects.form.labels.endTime","⏰ وقت النهاية"))}</label>
            <input type="time" class="form-control" id="project-edit-end-time" name="project-end-time" value="${a(d.time)}">
          </div>
          <div class="col-12">
            <label class="form-label" for="project-edit-description">${a(t("projects.details.labels.notes","ملاحظات المشروع"))}</label>
            <textarea class="form-control" id="project-edit-description" name="project-description" rows="3">${a(x)}</textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-label">${a(t("projects.form.labels.expenseLabel","اسم المصروف"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-label" placeholder="${a(t("projects.form.placeholders.expenseLabel","مثال: رسوم موقع التصوير"))}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-expense-amount">${a(t("projects.form.labels.expenseAmount","المبلغ (SR)"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-amount" inputmode="decimal" placeholder="0">
            <label class="form-label mt-2" for="project-edit-expense-note">${a(t("projects.form.labels.expenseNote","ملاحظات"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-note" placeholder="${a(t("projects.form.placeholders.expenseNote","تفاصيل إضافية"))}">
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-primary" data-action="add-expense">${a(t("projects.form.buttons.addExpense","➕ إضافة خدمة"))}</button>
          </div>
          <div class="col-12">
            <div id="project-edit-expense-list" class="project-edit-expense-list">
              ${V}
            </div>
          </div>
        </div>
        <div class="row g-3 align-items-start mt-3">
          <div class="col-md-4">
            <label class="form-label" for="project-edit-discount">${a(t("projects.form.labels.discount","الخصم"))}</label>
          <div class="input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select">
              <option value="percent" ${T==="percent"?"selected":""}>${a(t("projects.form.discount.percent","٪ نسبة"))}</option>
              <option value="amount" ${T==="amount"?"selected":""}>${a(t("projects.form.discount.amount","💵 مبلغ"))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control" value="${a($)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label d-block" for="project-edit-company-share">${a(t("projects.form.labels.companyShare","نسبة الشركة والضريبة"))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${a(String(S))}" ${R?"checked":""}>
              <label class="form-check-label" for="project-edit-company-share">${a(t("projects.form.companyShareToggle","إضافة نسبة الشركة (10٪)"))}</label>
            </div>
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${y?"checked":""}>
              <label class="form-check-label" for="project-edit-tax">${a(t("projects.form.taxLabel","شامل الضريبة (15٪)"))}</label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label" for="project-edit-payment-status">${a(t("projects.form.labels.paymentStatus","حالة الدفع"))}</label>
          <select class="form-select" id="project-edit-payment-status" name="project-payment-status">
            <option value="unpaid" ${v==="unpaid"?"selected":""}>${a(t("projects.form.paymentStatus.unpaid","غير مدفوع"))}</option>
            <option value="partial" ${v==="partial"?"selected":""}>${a(t("projects.form.paymentStatus.partial","مدفوع جزئياً"))}</option>
            <option value="paid" ${v==="paid"?"selected":""}>${a(t("projects.form.paymentStatus.paid","مدفوع"))}</option>
          </select>
          <label class="form-label mt-2" for="project-edit-payment-progress-value">${a(t("projects.form.paymentProgress.label","💰 الدفعة المستلمة"))}</label>
          <div class="input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select">
              <option value="amount" ${N==="amount"?"selected":""}>${a(t("projects.form.paymentProgress.amount","💵 مبلغ"))}</option>
              <option value="percent" ${N!=="amount"?"selected":""}>${a(t("projects.form.paymentProgress.percent","٪ نسبة"))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control" value="${a(L)}" placeholder="0" inputmode="decimal">
          </div>
          <small class="text-muted">${a(t("projects.form.paymentProgress.hint","أدخل المبلغ أو النسبة التي تم استلامها من قيمة المشروع"))}</small>
        </div>
      </div>

        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mt-4">
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-action="cancel-edit">${a(t("projects.details.edit.cancel","إلغاء"))}</button>
            <button type="submit" class="btn btn-sm btn-primary">${a(t("projects.details.edit.save","💾 حفظ التعديلات"))}</button>
          </div>
        </div>
      </form>
    </div>
  `}function et(e){const s=["commercial","coverage","photography","social"],n=s.map(o=>{const c=a(t(`projects.form.types.${o}`,o)),l=String(o)===String(e)?" selected":"";return`<option value="${o}"${l}>${c}</option>`});if(e&&!s.includes(e)){const o=a(he(e));n.push(`<option value="${a(String(e))}" selected>${o}</option>`)}return`<option value="">${a(t("projects.form.placeholders.type","اختر نوع المشروع"))}</option>${n.join("")}`}function tt(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="text-muted small" data-empty>${a(t("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const s=a(t("actions.remove","إزالة"));return e.map(n=>{const r=a(n?.label||""),o=a(m(n?.amount||0)),c=a(String((n?.note??n?.notes)||"")),l=a(String(n?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${r}</div>
            <div class="text-muted small">${o}${c?" • "+c:""}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${l}" aria-label="${s}">✖</button>
        </div>
      `}).join("")}function Te(e){if(!e)return{date:"",time:""};let s=e;s.includes(" ")&&(s=s.replace(" ","T"));const[n="",r=""]=s.split("T"),o=r.match(/(\d{1,2}:\d{2})/);return{date:n?n.slice(0,10):"",time:o?o[0]:""}}function ut(e,s){if(!e)return"";const n=s&&/\d{1,2}:\d{2}/.test(s)?s:"00:00",[r="00",o="00"]=n.split(":"),c=r.padStart(2,"0"),l=o.padStart(2,"0");return`${e}T${c}:${l}`}function at(e){if(!e)return null;const s=e.projectId??e.project_id??e.projectID??null;return s!=null?String(s):null}async function mt(e,s){if(!e)return;const r=Ce().filter(i=>{const d=at(i);return d&&d===String(e)});if(!r.length)return;const o=s==="paid",c=o?"paid":"unpaid";let l=!1;for(const i of r){const d=i?.id??i?.reservationId??i?.reservation_id;if(!d)continue;const f=i?.paid===!0||i?.paid==="paid",v=i?.paidStatus??i?.paymentStatus??(f?"paid":"unpaid");if(!(f===o&&v===c))try{await Je(d,{paid_status:c,paid:o}),l=!0}catch(y){console.error("❌ [projectFocusTemplates] Failed to sync reservation payment status",y)}}l&&document.dispatchEvent(new CustomEvent("reservations:changed"))}export{G as P,dt as a,lt as b,pt as c,ut as d,tt as e,re as f,ve as g,at as h,fe as r,mt as s};
