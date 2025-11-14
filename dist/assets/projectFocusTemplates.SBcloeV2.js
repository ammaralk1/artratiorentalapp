import{n as b,t,p as Se}from"./auth.B4XUmSYg.js";import{c as He,e as a,d as _e,t as ze,f as m}from"./state.DnWIUPO4.js";import{e as Ce,c as Oe,d as Ue,g as we,a as We,i as Je,D as $e,u as Ye}from"./reservationsService.DZ-N01gk.js";const G=.15,Ge="bg-primary",Xe=2,Ne={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},Ke={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Qe={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"};function me(e){if(!e)return null;const n=[e?.id,e?.reservationId,e?.reservation_id,e?.reservationID].find(r=>r!=null&&r!=="");return n!=null?String(n):null}function fe(e=[]){const s=we();return e.map(n=>{const r=n?.reservation??n;if(!r||typeof r!="object")return null;let o=Number.isInteger(n?.index)&&n.index>=0?n.index:Number.isInteger(n?.reservationIndex)&&n.reservationIndex>=0?n.reservationIndex:null;if(!Number.isInteger(o)||o<0){const i=me(r);i&&(o=s.findIndex(l=>{const c=me(l);return c&&c===i}))}return{reservation:r,index:Number.isInteger(o)&&o>=0?o:-1}}).filter(Boolean)}function ye(e){return e?e.id!=null?String(e.id):e.projectId!=null?String(e.projectId):e.project_id!=null?String(e.project_id):null:null}function ut(e,{customer:s=null,techniciansMap:n=new Map,reservations:r=[]}={}){const i=fe(r).map(({reservation:w})=>w),l=ye(e),c=l?a(l):"",d=_e(e),f=t(`projects.status.${d}`,Ne[d]),v=Ke[d]||"bg-secondary",y=be(e)||{},T=Number(y.subtotal||0),S=(i||[]).reduce((w,$)=>w+se($),0),x=y.applyTax?Number(((T+S)*G).toFixed(2)):0,h=Number((T+S+x).toFixed(2)),u=Array.isArray(e?.paymentHistory)?e.paymentHistory:Array.isArray(e?.payments)?e.payments:[],F=Oe({totalAmount:h,paidAmount:u.length?0:e.paidAmount,paidPercent:u.length?0:e.paidPercent,history:u}),_=Ue({manualStatus:null,paidAmount:F.paidAmount,paidPercent:F.paidPercent,totalAmount:h}),A=t(`projects.paymentStatus.${_}`,_==="paid"?"Paid":_==="partial"?"Partially Paid":"Unpaid"),k=_==="paid"?"status-paid":_==="partial"?"status-partial":"status-unpaid",P=[_==="paid"?"project-focus-card--paid":"project-focus-card--unpaid"],R=e?.confirmed===!0||e?.confirmed==="true";R&&P.push("project-focus-card--confirmed");const z=e?.projectCode||(l?`PRJ-${b(l)}`:""),D=z?b(String(z).replace(/^#/,"")):"",Y=D?`<span class="project-code-badge project-focus-card__code">#${a(D)}</span>`:"",I=ve(e?.type),O=I?`<span class="badge project-focus-card__badge ${Ge}">${a(I)}</span>`:"",U=`<span class="project-focus-card__status-chip ${v}">${a(f)}</span>`,X=`<span class="reservation-chip ${k} project-focus-card__payment-chip">${a(A)}</span>`,oe=(e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"),K=(e?.description||"").trim(),re=K?a(ze(K,110)):a(t("projects.fallback.noDescription","No description")),Q=Array.isArray(e?.technicians)?e.technicians:[],g=Q.map(w=>n.get(String(w))?.name).filter(Boolean),Z=g.length?Ze(g):"",ee=s?.customerName||e?.clientName||"",p=(e?.clientCompany||s?.companyName||"").trim(),j=i.reduce((w,$)=>{const ke=se($),ge=Array.isArray($?.items)?$.items:[],qe=ge.reduce((Ve,Be)=>Ve+(Number(Be?.qty)||0),0),Me=Array.isArray($?.technicians)?$.technicians.length:0,je=Array.isArray($?.crewAssignments)?$.crewAssignments:[],H=je.length?je:Array.isArray($?.technicians)?$.technicians:[],pe=Ce({items:ge,technicianIds:Array.isArray(H)&&!H.length?H:[],crewAssignments:Array.isArray(H)&&H.length&&typeof H[0]=="object"?H:[],discount:$?.discount??0,discountType:$?.discountType||"percent",applyTax:!1,start:$?.start,end:$?.end,companySharePercent:null});return{total:w.total+ke,equipment:w.equipment+Number(pe.equipmentTotal||0),crew:w.crew+Number(pe.crewTotal||0),crewCost:w.crewCost+Number(pe.crewCostTotal||0),equipmentCountTotal:(w.equipmentCountTotal||0)+qe,crewCountTotal:(w.crewCountTotal||0)+Me}},{total:0,equipment:0,crew:0,crewCost:0,equipmentCountTotal:0,crewCountTotal:0}),N=Number(j.total.toFixed(2)),te=j.equipmentCountTotal||0,he=j.crewCountTotal||Q.length,C=be(e),ce=Number(C.expensesTotal||0),q=Number((j.equipment+j.crew+ce).toFixed(2)),W=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let L=(e?.discountType==="amount"?"amount":"percent")==="amount"?W:q*(W/100);(!Number.isFinite(L)||L<0)&&(L=0),L>q&&(L=q);const E=Math.max(0,q-L),M=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",V=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,le=M&&V>0?V:0,ae=Number((E*(le/100)).toFixed(2)),J=C.applyTax?Number(((E+ae)*G).toFixed(2)):0,de=Number((E+ae+J).toFixed(2)),B=[D?{icon:"🆔",label:t("projectCards.meta.code","رقم المشروع"),value:`#${D}`}:null,ee?{icon:"👤",label:t("projectCards.meta.client","العميل"),value:ee}:null,p?{icon:"🏢",label:t("projectCards.meta.company","شركة العميل"),value:p}:null,I?{icon:"🏷️",label:t("projectCards.meta.type","نوع المشروع"),value:I}:null,Z?{icon:"👥",label:t("projectCards.stats.crewLabel","عدد الطاقم"),value:Z}:null,{icon:"📅",label:t("projectCards.meta.startDate","تاريخ البداية"),value:xe(e?.start)},{icon:"📅",label:t("projectCards.meta.endDate","تاريخ النهاية"),value:e?.end?xe(e.end):"—"}].filter(Boolean),Pe=[{icon:"📦",label:t("projectCards.stats.equipmentCount","عدد المعدات"),value:b(String(te))},{icon:"😎",label:t("projectCards.stats.crewCount","عدد أفراد الطاقم"),value:b(String(he))},{icon:"💵",label:t("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:m(N)}],Fe=[{icon:"💳",label:t("projectCards.stats.paymentStatus","حالة الدفع"),value:A},{icon:"💸",label:t("projectCards.stats.expensesTotal","خدمات إنتاجية (التكلفة)"),value:m(C.expensesTotal)},{icon:"💵",label:t("projects.details.summary.finalTotal","الإجمالي النهائي"),value:m(de)}],Re=[ue("projectCards.groups.meta","بيانات المشروع",B),ue("projectCards.groups.reservations","موجز الحجز",Pe),ue("projectCards.groups.payment","ملخص الدفع",Fe)].filter(Boolean).join(""),De=t("projects.focus.confirmed","✅ مشروع مؤكد"),Ie=t("projects.focus.pending","⌛ بانتظار التأكيد"),Le=`<div class="project-focus-card__actions"><span class="reservation-chip ${R?"status-confirmed":"status-pending"} project-focus-card__confirm-indicator">${a(R?De:Ie)}</span></div>`,Ee=[Y,O,U,X].filter(Boolean).join(`
          `);return`
    <div class="project-card-grid__item">
      <article class="${["project-focus-card",...P].join(" ")}" data-project-id="${c}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${Ee}
        </div>
        <h6 class="project-focus-card__title">${a(oe)}</h6>
        <p class="project-focus-card__description">${re}</p>
        <div class="project-focus-card__sections">
          ${Re}
        </div>
        ${Le}
      </article>
    </div>
  `}function ue(e,s,n=[]){if(!n.length)return"";const r=n.map(({icon:o,label:i,value:l})=>`
        <div class="project-focus-card__row">
          <span class="project-focus-card__row-label">${o?`<span class="project-focus-card__row-icon">${a(o)}</span>`:""}${a(i)}</span>
          <span class="project-focus-card__row-value">${a(String(l))}</span>
        </div>
      `).join("");return`
    <div class="project-focus-card__section">
      <span class="project-focus-card__section-title">${a(t(e,s))}</span>
      <div class="project-focus-card__section-box">
        ${r}
      </div>
    </div>
  `}function Ze(e=[]){if(!e.length)return"";const s=e.slice(0,Xe),n=e.length-s.length,r=Se()==="ar"?"، ":", ";let o=s.join(r);return n>0&&(o+=`${r}+${b(String(n))}`),o}function mt(e,{customer:s=null,reservations:n=[]}={}){const r=fe(n),o=r.map(({reservation:p})=>p),i=be(e),l=o.reduce((p,j)=>p+se(j),0),c=Number(l.toFixed(2)),d=o.length,f=i.applyTax?Number(((i.subtotal+c)*G).toFixed(2)):0,v=Number((i.subtotal+c+f).toFixed(2)),y=_e(e),T=t(`projects.status.${y}`,Ne[y]),S=Qe[y]||"status-confirmed",x=ye(e)||"",h=e?.projectCode||(x?`PRJ-${b(x)}`:""),u=h?b(String(h).replace(/^#/,"")):"",F=u?`<span class="project-code-badge">#${a(u)}</span>`:"",_=i.applyTax,A=_?t("projects.details.chips.vatOn","شامل الضريبة 15٪"):t("projects.details.chips.vatOff","غير شامل الضريبة"),k=_?"status-paid":"status-unpaid",P=e?.paymentStatus==="paid"?"paid":"unpaid",R=t(`projects.paymentStatus.${P}`,P==="paid"?"Paid":"Unpaid"),z=P==="paid"?"status-paid":"status-unpaid",Y=t("projects.details.chips.reservations","{count} حجوزات").replace("{count}",b(String(d))),I=e?.confirmed===!0||e?.confirmed==="true"?`<span class="reservation-chip status-confirmed">${a(t("projects.focus.confirmed","✅ مشروع مؤكد"))}</span>`:"",O=s?.customerName||e?.clientName||"",U=(e?.clientCompany||s?.companyName||"").trim(),oe=(e?.description||"").trim()||t("projects.fallback.noDescription","لا يوجد وصف"),K=[u?{icon:"🆔",label:t("projects.details.labels.code","رقم المشروع"),value:`#${u}`}:null,O?{icon:"👤",label:t("projects.details.client","العميل"),value:O}:null,U?{icon:"🏢",label:t("projects.details.company","شركة العميل"),value:U}:null,{icon:"🏷️",label:t("projects.details.type","نوع المشروع"),value:ve(e?.type)},{icon:"🗓️",label:t("projects.details.labels.start","تاريخ البداية"),value:ne(e?.start)},{icon:"🗓️",label:t("projects.details.labels.end","تاريخ النهاية"),value:e?.end?ne(e.end):"—"},{icon:"🔗",label:t("projects.details.labels.reservationsCount","عدد الحجوزات"),value:b(String(d))}].filter(Boolean),re=t("projects.details.expenses","المصروفات ({amount})").replace("{amount}",m(i.expensesTotal)),Q=i.expensesTotal>0?`<ul class="project-details-list">${(e?.expenses||[]).map(p=>`
          <li>
            <span class="project-expense-label">${a(p.label??"")}</span>
            <span class="project-expense-amount">${m(p.amount)}</span>
            ${p?.note??p?.notes?`<div class="text-muted small">${a(String(p.note??p.notes))}</div>`:""}
          </li>
        `).join("")}</ul>`:`<div class="text-muted">${a(t("projects.details.noItems","لا يوجد"))}</div>`;let g=[];if(g.push({icon:"💳",label:t("projects.details.summary.paymentStatus","حالة الدفع"),value:R}),d>0){const p=o.reduce((J,de)=>{const B=typeof computeReservationFinancials=="function"?computeReservationFinancials(de):null;return B&&typeof B=="object"&&(J.equipment+=Number(B.equipmentTotal||0),J.crew+=Number(B.crewTotal||0),J.crewCost+=Number(B.crewCostTotal||0)),J},{equipment:0,crew:0,crewCost:0}),j=Number(i.expensesTotal||0),N=Number((p.equipment+p.crew).toFixed(2)),te=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let C=(e?.discountType==="amount"?"amount":"percent")==="amount"?te:N*(te/100);(!Number.isFinite(C)||C<0)&&(C=0),C>N&&(C=N);const ce=e?.applyTax===!0||e?.applyTax==="true",q=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",W=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,ie=ce||q&&W>0,L=q&&ie&&W>0?W:0,E=Math.max(0,N-C),M=Number((E*(L/100)).toFixed(2)),V=ie?Number(((E+M)*G).toFixed(2)):0,le=Number((E-M-V-j-p.crewCost).toFixed(2)),ae=Number((E+M+V).toFixed(2));p.equipment>0&&g.push({icon:"🎛️",label:t("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:m(p.equipment)}),p.crew>0&&g.push({icon:"😎",label:t("projects.details.summary.crewTotal","إجمالي الفريق"),value:m(p.crew)}),p.crewCost>0&&g.push({icon:"🧾",label:t("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:m(p.crewCost)}),j>0&&g.push({icon:"🧾",label:t("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:m(j)}),g.push({icon:"🧮",label:t("projects.details.summary.gross","الإجمالي"),value:m(N)}),C>0&&g.push({icon:"🏷️",label:t("projects.details.summary.discount","الخصم"),value:`−${m(C)}`}),M>0&&g.push({icon:"🏦",label:t("projects.details.summary.companyShare","نسبة الشركة"),value:`−${m(M)}`}),V>0&&g.push({icon:"💸",label:t("projects.details.summary.tax","الضريبة (15٪)"),value:`−${m(V)}`}),g.push({icon:"💵",label:t("projects.details.summary.netProfit","صافي الربح"),value:m(le)}),g.push({icon:"💰",label:t("projects.details.summary.finalTotal","المجموع النهائي"),value:m(ae)})}else g.push({icon:"💼",label:t("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:m(i.subtotal)}),g.push({icon:"🧮",label:t("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:m(f)}),g.push({icon:"💰",label:t("projects.details.summary.overallTotal","الإجمالي الكلي"),value:m(v)});const Z=g.map(({icon:p,label:j,value:N})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${a(p)} ${a(j)}</span>
      <span class="summary-details-value">${a(N)}</span>
    </div>
  `).join(""),ee=et({project:e,reservations:r});return`
    <div class="project-details-header mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h5 class="mb-2 d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted project-details-title-label">${a(t("projects.details.labels.projectTitle","اسم المشروع"))}:</span>
            <span class="fw-bold project-details-title-text">${a((e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"))}</span>
            ${F}
          </h5>
        </div>
        <div class="status-chips d-flex flex-wrap gap-2">
          <span class="status-chip ${S}">${a(T)}</span>
          <span class="status-chip ${k}">${a(A)}</span>
          <span class="reservation-chip ${z}">${a(R)}</span>
          <span class="reservation-chip status-confirmed">${a(Y)}</span>
          ${I}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${K.map(({icon:p,label:j,value:N})=>Ae(p,j,N)).join("")}
    </div>
    <div class="project-details-section mb-4">
      <h6>${a(t("projects.details.labels.notes","ملاحظات المشروع"))}</h6>
      <div class="project-notes">${a(oe)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${a(re)}</h6>
      ${Q}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${Z}
    </div>
    ${ee}
  `}function et({reservations:e=[],project:s=null}={}){const r=[...fe(e)].sort((c,d)=>{const f=c?.reservation?.start?new Date(c.reservation.start).getTime():0;return(d?.reservation?.start?new Date(d.reservation.start).getTime():0)-f}),o=t("projects.details.reservations.title","الحجوزات المرتبطة"),i=t("projects.details.reservations.empty","لا توجد حجوزات مرتبطة بهذا المشروع بعد."),l=r.length?`<div class="project-reservations-list">${r.map(({reservation:c,index:d})=>tt(c,d,s)).join("")}</div>`:`<div class="alert alert-info project-reservations-empty mb-0">${a(i)}</div>`;return`
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex align-items-center gap-2 flex-wrap">
        <h6 class="mb-0">${a(o)}</h6>
      </div>
      ${l}
    </section>
  `}function tt(e,s=-1,n=null){const r=me(e)??"-",o=b(String(r)),i=at(e?.start,e?.end),l=se(e),c=m(l),d=b(String((e?.items||[]).length)),f=b(String((e?.technicians||[]).length)),v=t("projects.details.reservations.itemsCount","{count} معدة").replace("{count}",d),y=t("projects.details.reservations.crewCount","{count} من الطاقم").replace("{count}",f),{effectiveConfirmed:T}=We(e,n),S=T?t("reservations.list.status.confirmed","✅ مؤكد"):t("reservations.list.status.pending","⏳ غير مؤكد"),x=T?"project-reservation-card__badge--confirmed":"project-reservation-card__badge--pending",h=e?.paid===!0||e?.paid==="paid",u=h?t("reservations.list.payment.paid","💳 مدفوع"):t("reservations.list.payment.unpaid","💳 غير مدفوع"),F=h?"project-reservation-card__badge--paid":"project-reservation-card__badge--unpaid",A=Je(e)?`<span class="project-reservation-card__badge project-reservation-card__badge--completed">${a(t("reservations.list.status.completed","📁 منتهي"))}</span>`:"",k=Number.isInteger(s)&&s>=0?` data-index="${s}"`:"",P=`<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${a(String(r??""))}"${k}>${a(t("projects.details.reservations.view","عرض الحجز"))}</button>`;return`
    <article class="project-reservation-card" data-reservation-id="${a(o)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${a(o)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${x}">${a(S)}</span>
          <span class="project-reservation-card__badge ${F}">${a(u)}</span>
          ${A}
        </div>
      </div>
      <div class="project-reservation-card__range">${a(i)}</div>
      <div class="project-reservation-card__meta">
        <span>📦 ${a(v)}</span>
        <span>😎 ${a(y)}</span>
      </div>
      <div class="project-reservation-card__footer">
        <span class="text-muted">${a(t("projectCards.stats.reservationValue","إجمالي الحجوزات"))}</span>
        <span class="fw-bold">${a(c)}</span>
        ${P}
      </div>
    </article>
  `}function Ae(e,s,n){return`
    <div class="res-info-row">
      <span class="label">${a(e)} ${a(s)}</span>
      <span class="separator">:</span>
      <span class="value">${a(n)}</span>
    </div>
  `}function be(e){const s=Number(e?.equipmentEstimate)||0,n=He(e),r=s+n,o=e?.applyTax===!0||e?.applyTax==="true",i=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?i:r*(i/100);(!Number.isFinite(c)||c<0)&&(c=0),c>r&&(c=r);const d=Math.max(0,r-c),f=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",v=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,y=o||f&&v>0,T=f&&y&&v>0?v:0,S=T>0?Number((d*(T/100)).toFixed(2)):0,x=d+S;let h=y?x*G:0;(!Number.isFinite(h)||h<0)&&(h=0),h=Number(h.toFixed(2));let u=y?Number(e?.totalWithTax):x;return y?(!Number.isFinite(u)||u<=0)&&(u=Number((x+h).toFixed(2))):u=x,{equipmentEstimate:s,expensesTotal:n,baseSubtotal:r,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:S,subtotal:x,applyTax:y,taxAmount:h,totalWithTax:u}}function se(e){if(!e)return 0;const s=Array.isArray(e?.items)?e.items:[],n=e?.discount??e?.discountValue??0,r=Number(b(String(n)))||0,o=e?.discountType??e?.discount_type??"percent",i=String(o).toLowerCase()==="amount"?"amount":"percent",l=Array.isArray(e?.crewAssignments)?e.crewAssignments:[],c=l.length?l:Array.isArray(e?.technicians)?e.technicians:[],d=Ce({items:s,technicianIds:Array.isArray(c)&&!c.length?c:[],crewAssignments:Array.isArray(c)&&c.length&&typeof c[0]=="object"?c:[],discount:r,discountType:i,applyTax:!1,start:e?.start,end:e?.end,companySharePercent:0,groupingSource:e});return Number.isFinite(Number(d?.finalTotal))?Number(d.finalTotal):0}function xe(e){if(!e)return"—";const s=new Date(e);if(Number.isNaN(s.getTime()))return"—";const r=Se()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-GB",o=new Intl.DateTimeFormat(r,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return b(o.format(s))}function ne(e){if(!e)return"—";const s=new Date(e);if(Number.isNaN(s.getTime()))return"—";const n=String(s.getDate()).padStart(2,"0"),r=String(s.getMonth()+1).padStart(2,"0"),o=String(s.getFullYear()),i=String(s.getMinutes()).padStart(2,"0"),l=s.getHours(),c=l>=12?"PM":"AM",d=l%12||12,f=String(d).padStart(2,"0"),v=`${n}/${r}/${o} ${f}:${i} ${c}`;return b(v)}function at(e,s){if(!e)return"—";const n=ne(e);return s?`${n} - ${ne(s)}`:n}function ve(e){if(!e)return t("projects.form.types.unknown","نوع غير محدد");const n={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return t(n,e)}function bt(e,{clientName:s="",clientCompany:n=""}={}){const r=ye(e)||"",o=e?.projectCode||(r?`PRJ-${b(r)}`:""),i=o?b(String(o)):"",l=st(e?.type),c=Te(e?.start||""),d=Te(e?.end||""),f=typeof e?.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",v=["paid","partial"].includes(f)?f:"unpaid",y=e?.applyTax===!0||e?.applyTax==="true",T=e?.description||"",S=e?.discountType==="amount"?"amount":"percent",x=b(String(e?.discount??e?.discountValue??0)),h=e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??$e,u=Number.parseFloat(b(String(h))),F=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true"||y&&Number.isFinite(u)&&u>0,_=Number.isFinite(u)&&u>0?u:$e,A=e?.paymentProgressType==="amount"?"amount":e?.paymentProgressType==="percent"?"percent":e?.payment_progress_type==="amount"?"amount":(e?.payment_progress_type==="percent","percent"),k=b(String(e?.paymentProgressValue??e?.payment_progress_value??(A==="amount"?e?.paidAmount??e?.paid_amount:e?.paidPercent??e?.paid_percent)??"")),P=t("projects.details.labels.code","رقم المشروع"),R=t("projects.form.labels.client","العميل"),z=t("projects.form.labels.clientCompany","شركة العميل"),D=[i?{icon:"🆔",label:P,value:`#${i}`}:null,s?{icon:"👤",label:R,value:s}:null,n?{icon:"🏢",label:z,value:n}:null].filter(Boolean),Y=D.length?`<div class="project-details-info mb-3">
        ${D.map(({icon:O,label:U,value:X})=>Ae(O,U,X)).join("")}
      </div>`:"",I=nt(Array.isArray(e?.expenses)?e.expenses:[]);return`
    <div class="project-details-edit">
      <div class="project-details-header mb-3">
        <h5 class="fw-bold mb-1">${a(t("projects.details.edit.heading","تعديل المشروع"))}</h5>
        <p class="text-muted small mb-0">${a(t("projects.details.edit.subheading","قم بتحديث بيانات المشروع ثم احفظ التغييرات."))}</p>
      </div>
      ${Y}
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
            <input type="date" class="form-control" id="project-edit-start-date" name="project-start-date" value="${a(c.date)}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-time">${a(t("projects.form.labels.startTime","⏰ وقت البداية"))}</label>
            <input type="time" class="form-control" id="project-edit-start-time" name="project-start-time" value="${a(c.time)}">
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
            <textarea class="form-control" id="project-edit-description" name="project-description" rows="3">${a(T)}</textarea>
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
              ${I}
            </div>
          </div>
        </div>
        <div class="row g-3 align-items-start mt-3">
          <div class="col-md-4">
            <label class="form-label" for="project-edit-discount">${a(t("projects.form.labels.discount","الخصم"))}</label>
          <div class="input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select">
              <option value="percent" ${S==="percent"?"selected":""}>${a(t("projects.form.discount.percent","٪ نسبة"))}</option>
              <option value="amount" ${S==="amount"?"selected":""}>${a(t("projects.form.discount.amount","💵 مبلغ"))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control" value="${a(x)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label d-block" for="project-edit-company-share">${a(t("projects.form.labels.companyShare","نسبة الشركة والضريبة"))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${a(String(_))}" ${F?"checked":""}>
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
              <option value="amount" ${A==="amount"?"selected":""}>${a(t("projects.form.paymentProgress.amount","💵 مبلغ"))}</option>
              <option value="percent" ${A!=="amount"?"selected":""}>${a(t("projects.form.paymentProgress.percent","٪ نسبة"))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control" value="${a(k)}" placeholder="0" inputmode="decimal">
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
  `}function st(e){const s=["commercial","coverage","photography","social"],n=s.map(o=>{const i=a(t(`projects.form.types.${o}`,o)),l=String(o)===String(e)?" selected":"";return`<option value="${o}"${l}>${i}</option>`});if(e&&!s.includes(e)){const o=a(ve(e));n.push(`<option value="${a(String(e))}" selected>${o}</option>`)}return`<option value="">${a(t("projects.form.placeholders.type","اختر نوع المشروع"))}</option>${n.join("")}`}function nt(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="text-muted small" data-empty>${a(t("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const s=a(t("actions.remove","إزالة"));return e.map(n=>{const r=a(n?.label||""),o=a(m(n?.amount||0)),i=a(String((n?.note??n?.notes)||"")),l=a(String(n?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${r}</div>
            <div class="text-muted small">${o}${i?" • "+i:""}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${l}" aria-label="${s}">✖</button>
        </div>
      `}).join("")}function Te(e){if(!e)return{date:"",time:""};let s=e;s.includes(" ")&&(s=s.replace(" ","T"));const[n="",r=""]=s.split("T"),o=r.match(/(\d{1,2}:\d{2})/);return{date:n?n.slice(0,10):"",time:o?o[0]:""}}function ft(e,s){if(!e)return"";const n=s&&/\d{1,2}:\d{2}/.test(s)?s:"00:00",[r="00",o="00"]=n.split(":"),i=r.padStart(2,"0"),l=o.padStart(2,"0");return`${e}T${i}:${l}`}function ot(e){if(!e)return null;const s=e.projectId??e.project_id??e.projectID??null;return s!=null?String(s):null}async function yt(e,s){if(!e)return;const r=we().filter(c=>{const d=ot(c);return d&&d===String(e)});if(!r.length)return;const o=s==="paid",i=o?"paid":"unpaid";let l=!1;for(const c of r){const d=c?.id??c?.reservationId??c?.reservation_id;if(!d)continue;const f=c?.paid===!0||c?.paid==="paid",v=c?.paidStatus??c?.paymentStatus??(f?"paid":"unpaid");if(!(f===o&&v===i))try{await Ye(d,{paid_status:i,paid:o}),l=!0}catch(y){console.error("❌ [projectFocusTemplates] Failed to sync reservation payment status",y)}}l&&document.dispatchEvent(new CustomEvent("reservations:changed"))}export{G as P,mt as a,ut as b,bt as c,ft as d,nt as e,se as f,ye as g,ot as h,be as r,yt as s};
