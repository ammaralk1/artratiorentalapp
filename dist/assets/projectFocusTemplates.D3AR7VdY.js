import{n as f,t,p as Se}from"./auth.EkPXpg4F.js";import{c as ke,e as a,d as _e,t as qe,f as v}from"./state.DofjCv9v.js";import{e as Te,g as we,a as Me,i as Ve,D as je,u as Be}from"./reservationsService.Duv4RsUS.js";const ae=.15,ze="bg-primary",He=2,Ce={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},Oe={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Ue={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"};function ue(e){if(!e)return null;const n=[e?.id,e?.reservationId,e?.reservation_id,e?.reservationID].find(r=>r!=null&&r!=="");return n!=null?String(n):null}function me(e=[]){const s=we();return e.map(n=>{const r=n?.reservation??n;if(!r||typeof r!="object")return null;let o=Number.isInteger(n?.index)&&n.index>=0?n.index:Number.isInteger(n?.reservationIndex)&&n.reservationIndex>=0?n.reservationIndex:null;if(!Number.isInteger(o)||o<0){const i=ue(r);i&&(o=s.findIndex(p=>{const c=ue(p);return c&&c===i}))}return{reservation:r,index:Number.isInteger(o)&&o>=0?o:-1}}).filter(Boolean)}function be(e){return e?e.id!=null?String(e.id):e.projectId!=null?String(e.projectId):e.project_id!=null?String(e.project_id):null:null}function st(e,{customer:s=null,techniciansMap:n=new Map,reservations:r=[]}={}){const i=me(r).map(({reservation:A})=>A),p=be(e),c=p?a(p):"",l=_e(e),m=t(`projects.status.${l}`,Ce[l]),y=Oe[l]||"bg-secondary",u=e?.paymentStatus==="paid"?"paid":"unpaid",$=t(`projects.paymentStatus.${u}`,u==="paid"?"Paid":"Unpaid"),x=u==="paid"?"status-paid":"status-unpaid",j=[u==="paid"?"project-focus-card--paid":"project-focus-card--unpaid"],h=e?.confirmed===!0||e?.confirmed==="true";h&&j.push("project-focus-card--confirmed");const b=e?.projectCode||(p?`PRJ-${f(p)}`:""),w=b?f(String(b).replace(/^#/,"")):"",R=w?`<span class="project-code-badge project-focus-card__code">#${a(w)}</span>`:"",_=ye(e?.type),D=_?`<span class="badge project-focus-card__badge ${ze}">${a(_)}</span>`:"",P=`<span class="project-focus-card__status-chip ${y}">${a(m)}</span>`,M=`<span class="reservation-chip ${x} project-focus-card__payment-chip">${a($)}</span>`,W=(e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"),V=(e?.description||"").trim(),Y=V?a(qe(V,110)):a(t("projects.fallback.noDescription","No description")),B=Array.isArray(e?.technicians)?e.technicians:[],E=B.map(A=>n.get(String(A))?.name).filter(Boolean),I=E.length?Je(E):"",G=s?.customerName||e?.clientName||"",K=(e?.clientCompany||s?.companyName||"").trim(),L=i.reduce((A,S)=>{const Re=fe(S),he=Array.isArray(S?.items)?S.items:[],De=he.reduce((Ie,Le)=>Ie+(Number(Le?.qty)||0),0),Ee=Array.isArray(S?.technicians)?S.technicians.length:0,ge=Array.isArray(S?.crewAssignments)?S.crewAssignments:[],q=ge.length?ge:Array.isArray(S?.technicians)?S.technicians:[],pe=Te({items:he,technicianIds:Array.isArray(q)&&!q.length?q:[],crewAssignments:Array.isArray(q)&&q.length&&typeof q[0]=="object"?q:[],discount:S?.discount??0,discountType:S?.discountType||"percent",applyTax:!1,start:S?.start,end:S?.end,companySharePercent:null});return{total:A.total+Re,equipment:A.equipment+Number(pe.equipmentTotal||0),crew:A.crew+Number(pe.crewTotal||0),crewCost:A.crewCost+Number(pe.crewCostTotal||0),equipmentCountTotal:(A.equipmentCountTotal||0)+De,crewCountTotal:(A.crewCountTotal||0)+Ee}},{total:0,equipment:0,crew:0,crewCost:0,equipmentCountTotal:0,crewCountTotal:0}),ne=Number(L.total.toFixed(2)),oe=L.equipmentCountTotal||0,g=L.crewCountTotal||B.length,X=Ae(e),re=Number(X.expensesTotal||0),d=Number((L.equipment+L.crew+re).toFixed(2)),T=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let F=(e?.discountType==="amount"?"amount":"percent")==="amount"?T:d*(T/100);(!Number.isFinite(F)||F<0)&&(F=0),F>d&&(F=d);const Q=Math.max(0,d-F),N=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",Z=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,ee=N&&Z>0?Z:0,z=Number((Q*(ee/100)).toFixed(2)),te=X.applyTax?Number(((Q+z)*ae).toFixed(2)):0,ce=Number((Q+z+te).toFixed(2)),H=[w?{icon:"🆔",label:t("projectCards.meta.code","رقم المشروع"),value:`#${w}`}:null,G?{icon:"👤",label:t("projectCards.meta.client","العميل"),value:G}:null,K?{icon:"🏢",label:t("projectCards.meta.company","شركة العميل"),value:K}:null,_?{icon:"🏷️",label:t("projectCards.meta.type","نوع المشروع"),value:_}:null,I?{icon:"👥",label:t("projectCards.stats.crewLabel","عدد الطاقم"),value:I}:null,{icon:"📅",label:t("projectCards.meta.startDate","تاريخ البداية"),value:$e(e?.start)},{icon:"📅",label:t("projectCards.meta.endDate","تاريخ النهاية"),value:e?.end?$e(e.end):"—"}].filter(Boolean),k=[{icon:"📦",label:t("projectCards.stats.equipmentCount","عدد المعدات"),value:f(String(oe))},{icon:"😎",label:t("projectCards.stats.crewCount","عدد أفراد الطاقم"),value:f(String(g))},{icon:"💵",label:t("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:v(ne)}],O=[{icon:"💳",label:t("projectCards.stats.paymentStatus","حالة الدفع"),value:$},{icon:"💸",label:t("projectCards.stats.expensesTotal","خدمات إنتاجية (التكلفة)"),value:v(X.expensesTotal)},{icon:"💵",label:t("projects.details.summary.finalTotal","الإجمالي النهائي"),value:v(ce)}],ie=[de("projectCards.groups.meta","بيانات المشروع",H),de("projectCards.groups.reservations","موجز الحجز",k),de("projectCards.groups.payment","ملخص الدفع",O)].filter(Boolean).join(""),le=t("projects.focus.confirmed","✅ مشروع مؤكد"),U=t("projects.focus.pending","⌛ بانتظار التأكيد"),Pe=`<div class="project-focus-card__actions"><span class="reservation-chip ${h?"status-confirmed":"status-pending"} project-focus-card__confirm-indicator">${a(h?le:U)}</span></div>`,Fe=[R,D,P,M].filter(Boolean).join(`
          `);return`
    <div class="project-card-grid__item">
      <article class="${["project-focus-card",...j].join(" ")}" data-project-id="${c}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${Fe}
        </div>
        <h6 class="project-focus-card__title">${a(W)}</h6>
        <p class="project-focus-card__description">${Y}</p>
        <div class="project-focus-card__sections">
          ${ie}
        </div>
        ${Pe}
      </article>
    </div>
  `}function de(e,s,n=[]){if(!n.length)return"";const r=n.map(({icon:o,label:i,value:p})=>`
        <div class="project-focus-card__row">
          <span class="project-focus-card__row-label">${o?`<span class="project-focus-card__row-icon">${a(o)}</span>`:""}${a(i)}</span>
          <span class="project-focus-card__row-value">${a(String(p))}</span>
        </div>
      `).join("");return`
    <div class="project-focus-card__section">
      <span class="project-focus-card__section-title">${a(t(e,s))}</span>
      <div class="project-focus-card__section-box">
        ${r}
      </div>
    </div>
  `}function Je(e=[]){if(!e.length)return"";const s=e.slice(0,He),n=e.length-s.length,r=Se()==="ar"?"، ":", ";let o=s.join(r);return n>0&&(o+=`${r}+${f(String(n))}`),o}function nt(e,{customer:s=null,reservations:n=[]}={}){const r=me(n),o=r.map(({reservation:d})=>d),i=Ae(e),p=o.reduce((d,T)=>d+fe(T),0),c=Number(p.toFixed(2)),l=o.length,m=i.applyTax?Number(((i.subtotal+c)*ae).toFixed(2)):0,y=Number((i.subtotal+c+m).toFixed(2)),u=_e(e),$=t(`projects.status.${u}`,Ce[u]),x=Ue[u]||"status-confirmed",j=be(e)||"",h=e?.projectCode||(j?`PRJ-${f(j)}`:""),b=h?f(String(h).replace(/^#/,"")):"",w=b?`<span class="project-code-badge">#${a(b)}</span>`:"",R=i.applyTax,_=R?t("projects.details.chips.vatOn","شامل الضريبة 15٪"):t("projects.details.chips.vatOff","غير شامل الضريبة"),D=R?"status-paid":"status-unpaid",P=e?.paymentStatus==="paid"?"paid":"unpaid",M=t(`projects.paymentStatus.${P}`,P==="paid"?"Paid":"Unpaid"),W=P==="paid"?"status-paid":"status-unpaid",Y=t("projects.details.chips.reservations","{count} حجوزات").replace("{count}",f(String(l))),B=e?.confirmed===!0||e?.confirmed==="true"?`<span class="reservation-chip status-confirmed">${a(t("projects.focus.confirmed","✅ مشروع مؤكد"))}</span>`:"",E=s?.customerName||e?.clientName||"",I=(e?.clientCompany||s?.companyName||"").trim(),K=(e?.description||"").trim()||t("projects.fallback.noDescription","لا يوجد وصف"),L=[b?{icon:"🆔",label:t("projects.details.labels.code","رقم المشروع"),value:`#${b}`}:null,E?{icon:"👤",label:t("projects.details.client","العميل"),value:E}:null,I?{icon:"🏢",label:t("projects.details.company","شركة العميل"),value:I}:null,{icon:"🏷️",label:t("projects.details.type","نوع المشروع"),value:ye(e?.type)},{icon:"🗓️",label:t("projects.details.labels.start","تاريخ البداية"),value:se(e?.start)},{icon:"🗓️",label:t("projects.details.labels.end","تاريخ النهاية"),value:e?.end?se(e.end):"—"},{icon:"🔗",label:t("projects.details.labels.reservationsCount","عدد الحجوزات"),value:f(String(l))}].filter(Boolean),ne=t("projects.details.expenses","المصروفات ({amount})").replace("{amount}",v(i.expensesTotal)),oe=i.expensesTotal>0?`<ul class="project-details-list">${(e?.expenses||[]).map(d=>`
          <li>
            <span class="project-expense-label">${a(d.label??"")}</span>
            <span class="project-expense-amount">${v(d.amount)}</span>
            ${d?.note??d?.notes?`<div class="text-muted small">${a(String(d.note??d.notes))}</div>`:""}
          </li>
        `).join("")}</ul>`:`<div class="text-muted">${a(t("projects.details.noItems","لا يوجد"))}</div>`;let g=[];if(g.push({icon:"💳",label:t("projects.details.summary.paymentStatus","حالة الدفع"),value:M}),l>0){const d=o.reduce((U,ve)=>{const J=typeof computeReservationFinancials=="function"?computeReservationFinancials(ve):null;return J&&typeof J=="object"&&(U.equipment+=Number(J.equipmentTotal||0),U.crew+=Number(J.crewTotal||0),U.crewCost+=Number(J.crewCostTotal||0)),U},{equipment:0,crew:0,crewCost:0}),T=Number(i.expensesTotal||0),C=Number((d.equipment+d.crew).toFixed(2)),F=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let N=(e?.discountType==="amount"?"amount":"percent")==="amount"?F:C*(F/100);(!Number.isFinite(N)||N<0)&&(N=0),N>C&&(N=C);const Z=e?.applyTax===!0||e?.applyTax==="true",ee=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",z=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,te=Z||ee&&z>0,ce=ee&&te&&z>0?z:0,H=Math.max(0,C-N),k=Number((H*(ce/100)).toFixed(2)),O=te?Number(((H+k)*ae).toFixed(2)):0,ie=Number((H-k-O-T-d.crewCost).toFixed(2)),le=Number((H+k+O).toFixed(2));d.equipment>0&&g.push({icon:"🎛️",label:t("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:v(d.equipment)}),d.crew>0&&g.push({icon:"😎",label:t("projects.details.summary.crewTotal","إجمالي الفريق"),value:v(d.crew)}),d.crewCost>0&&g.push({icon:"🧾",label:t("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:v(d.crewCost)}),T>0&&g.push({icon:"🧾",label:t("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:v(T)}),g.push({icon:"🧮",label:t("projects.details.summary.gross","الإجمالي"),value:v(C)}),N>0&&g.push({icon:"🏷️",label:t("projects.details.summary.discount","الخصم"),value:`−${v(N)}`}),k>0&&g.push({icon:"🏦",label:t("projects.details.summary.companyShare","نسبة الشركة"),value:`−${v(k)}`}),O>0&&g.push({icon:"💸",label:t("projects.details.summary.tax","الضريبة (15٪)"),value:`−${v(O)}`}),g.push({icon:"💵",label:t("projects.details.summary.netProfit","صافي الربح"),value:v(ie)}),g.push({icon:"💰",label:t("projects.details.summary.finalTotal","المجموع النهائي"),value:v(le)})}else g.push({icon:"💼",label:t("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:v(i.subtotal)}),g.push({icon:"🧮",label:t("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:v(m)}),g.push({icon:"💰",label:t("projects.details.summary.overallTotal","الإجمالي الكلي"),value:v(y)});const X=g.map(({icon:d,label:T,value:C})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${a(d)} ${a(T)}</span>
      <span class="summary-details-value">${a(C)}</span>
    </div>
  `).join(""),re=We({project:e,reservations:r});return`
    <div class="project-details-header mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h5 class="mb-2 d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted project-details-title-label">${a(t("projects.details.labels.projectTitle","اسم المشروع"))}:</span>
            <span class="fw-bold project-details-title-text">${a((e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"))}</span>
            ${w}
          </h5>
        </div>
        <div class="status-chips d-flex flex-wrap gap-2">
          <span class="status-chip ${x}">${a($)}</span>
          <span class="status-chip ${D}">${a(_)}</span>
          <span class="reservation-chip ${W}">${a(M)}</span>
          <span class="reservation-chip status-confirmed">${a(Y)}</span>
          ${B}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${L.map(({icon:d,label:T,value:C})=>Ne(d,T,C)).join("")}
    </div>
    <div class="project-details-section mb-4">
      <h6>${a(t("projects.details.labels.notes","ملاحظات المشروع"))}</h6>
      <div class="project-notes">${a(K)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${a(ne)}</h6>
      ${oe}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${X}
    </div>
    ${re}
  `}function We({reservations:e=[],project:s=null}={}){const r=[...me(e)].sort((c,l)=>{const m=c?.reservation?.start?new Date(c.reservation.start).getTime():0;return(l?.reservation?.start?new Date(l.reservation.start).getTime():0)-m}),o=t("projects.details.reservations.title","الحجوزات المرتبطة"),i=t("projects.details.reservations.empty","لا توجد حجوزات مرتبطة بهذا المشروع بعد."),p=r.length?`<div class="project-reservations-list">${r.map(({reservation:c,index:l})=>Ye(c,l,s)).join("")}</div>`:`<div class="alert alert-info project-reservations-empty mb-0">${a(i)}</div>`;return`
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex align-items-center gap-2 flex-wrap">
        <h6 class="mb-0">${a(o)}</h6>
      </div>
      ${p}
    </section>
  `}function Ye(e,s=-1,n=null){const r=ue(e)??"-",o=f(String(r)),i=Ge(e?.start,e?.end),p=fe(e),c=v(p),l=f(String((e?.items||[]).length)),m=f(String((e?.technicians||[]).length)),y=t("projects.details.reservations.itemsCount","{count} معدة").replace("{count}",l),u=t("projects.details.reservations.crewCount","{count} من الطاقم").replace("{count}",m),{effectiveConfirmed:$}=Me(e,n),x=$?t("reservations.list.status.confirmed","✅ مؤكد"):t("reservations.list.status.pending","⏳ غير مؤكد"),j=$?"project-reservation-card__badge--confirmed":"project-reservation-card__badge--pending",h=e?.paid===!0||e?.paid==="paid",b=h?t("reservations.list.payment.paid","💳 مدفوع"):t("reservations.list.payment.unpaid","💳 غير مدفوع"),w=h?"project-reservation-card__badge--paid":"project-reservation-card__badge--unpaid",_=Ve(e)?`<span class="project-reservation-card__badge project-reservation-card__badge--completed">${a(t("reservations.list.status.completed","📁 منتهي"))}</span>`:"",D=Number.isInteger(s)&&s>=0?` data-index="${s}"`:"",P=`<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${a(String(r??""))}"${D}>${a(t("projects.details.reservations.view","عرض الحجز"))}</button>`;return`
    <article class="project-reservation-card" data-reservation-id="${a(o)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${a(o)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${j}">${a(x)}</span>
          <span class="project-reservation-card__badge ${w}">${a(b)}</span>
          ${_}
        </div>
      </div>
      <div class="project-reservation-card__range">${a(i)}</div>
      <div class="project-reservation-card__meta">
        <span>📦 ${a(y)}</span>
        <span>😎 ${a(u)}</span>
      </div>
      <div class="project-reservation-card__footer">
        <span class="text-muted">${a(t("projectCards.stats.reservationValue","إجمالي الحجوزات"))}</span>
        <span class="fw-bold">${a(c)}</span>
        ${P}
      </div>
    </article>
  `}function Ne(e,s,n){return`
    <div class="res-info-row">
      <span class="label">${a(e)} ${a(s)}</span>
      <span class="separator">:</span>
      <span class="value">${a(n)}</span>
    </div>
  `}function Ae(e){const s=Number(e?.equipmentEstimate)||0,n=ke(e),r=s+n,o=e?.applyTax===!0||e?.applyTax==="true",i=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?i:r*(i/100);(!Number.isFinite(c)||c<0)&&(c=0),c>r&&(c=r);const l=Math.max(0,r-c),m=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",y=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,u=o||m&&y>0,$=m&&u&&y>0?y:0,x=$>0?Number((l*($/100)).toFixed(2)):0,j=l+x;let h=u?j*ae:0;(!Number.isFinite(h)||h<0)&&(h=0),h=Number(h.toFixed(2));let b=u?Number(e?.totalWithTax):j;return u?(!Number.isFinite(b)||b<=0)&&(b=Number((j+h).toFixed(2))):b=j,{equipmentEstimate:s,expensesTotal:n,baseSubtotal:r,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:x,subtotal:j,applyTax:u,taxAmount:h,totalWithTax:b}}function fe(e){if(!e)return 0;const s=Array.isArray(e?.items)?e.items:[],n=e?.discount??e?.discountValue??0,r=Number(f(String(n)))||0,o=e?.discountType??e?.discount_type??"percent",i=String(o).toLowerCase()==="amount"?"amount":"percent",p=!!(e?.applyTax??e?.apply_tax??e?.taxApplied),c=Array.isArray(e?.crewAssignments)?e.crewAssignments:[],l=c.length?c:Array.isArray(e?.technicians)?e.technicians:[],m=e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??null,y=e?.companyShareEnabled??e?.company_share_enabled??e?.companyShareApplied??null,u=Number.parseFloat(f(String(m??""))),$=(y===!0||Number.isFinite(u)&&u>0)&&Number.isFinite(u)?u:0,x=Te({items:s,technicianIds:Array.isArray(l)&&!l.length?l:[],crewAssignments:Array.isArray(l)&&l.length&&typeof l[0]=="object"?l:[],discount:r,discountType:i,applyTax:p,start:e?.start,end:e?.end,companySharePercent:$,groupingSource:e});return Number.isFinite(Number(x?.finalTotal))?Number(x.finalTotal):0}function $e(e){if(!e)return"—";const s=new Date(e);if(Number.isNaN(s.getTime()))return"—";const r=Se()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-GB",o=new Intl.DateTimeFormat(r,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return f(o.format(s))}function se(e){if(!e)return"—";const s=new Date(e);if(Number.isNaN(s.getTime()))return"—";const n=String(s.getDate()).padStart(2,"0"),r=String(s.getMonth()+1).padStart(2,"0"),o=String(s.getFullYear()),i=String(s.getMinutes()).padStart(2,"0"),p=s.getHours(),c=p>=12?"PM":"AM",l=p%12||12,m=String(l).padStart(2,"0"),y=`${n}/${r}/${o} ${m}:${i} ${c}`;return f(y)}function Ge(e,s){if(!e)return"—";const n=se(e);return s?`${n} - ${se(s)}`:n}function ye(e){if(!e)return t("projects.form.types.unknown","نوع غير محدد");const n={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return t(n,e)}function ot(e,{clientName:s="",clientCompany:n=""}={}){const r=be(e)||"",o=e?.projectCode||(r?`PRJ-${f(r)}`:""),i=o?f(String(o)):"",p=Xe(e?.type),c=xe(e?.start||""),l=xe(e?.end||""),m=typeof e?.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",y=["paid","partial"].includes(m)?m:"unpaid",u=e?.applyTax===!0||e?.applyTax==="true",$=e?.description||"",x=e?.discountType==="amount"?"amount":"percent",j=f(String(e?.discount??e?.discountValue??0)),h=e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??je,b=Number.parseFloat(f(String(h))),w=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true"||u&&Number.isFinite(b)&&b>0,R=Number.isFinite(b)&&b>0?b:je,_=e?.paymentProgressType==="amount"?"amount":e?.paymentProgressType==="percent"?"percent":e?.payment_progress_type==="amount"?"amount":(e?.payment_progress_type==="percent","percent"),D=f(String(e?.paymentProgressValue??e?.payment_progress_value??(_==="amount"?e?.paidAmount??e?.paid_amount:e?.paidPercent??e?.paid_percent)??"")),P=t("projects.details.labels.code","رقم المشروع"),M=t("projects.form.labels.client","العميل"),W=t("projects.form.labels.clientCompany","شركة العميل"),V=[i?{icon:"🆔",label:P,value:`#${i}`}:null,s?{icon:"👤",label:M,value:s}:null,n?{icon:"🏢",label:W,value:n}:null].filter(Boolean),Y=V.length?`<div class="project-details-info mb-3">
        ${V.map(({icon:E,label:I,value:G})=>Ne(E,I,G)).join("")}
      </div>`:"",B=Ke(Array.isArray(e?.expenses)?e.expenses:[]);return`
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
              ${p}
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
            <input type="date" class="form-control" id="project-edit-end-date" name="project-end-date" value="${a(l.date)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-time">${a(t("projects.form.labels.endTime","⏰ وقت النهاية"))}</label>
            <input type="time" class="form-control" id="project-edit-end-time" name="project-end-time" value="${a(l.time)}">
          </div>
          <div class="col-12">
            <label class="form-label" for="project-edit-description">${a(t("projects.details.labels.notes","ملاحظات المشروع"))}</label>
            <textarea class="form-control" id="project-edit-description" name="project-description" rows="3">${a($)}</textarea>
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
              ${B}
            </div>
          </div>
        </div>
        <div class="row g-3 align-items-start mt-3">
          <div class="col-md-4">
            <label class="form-label" for="project-edit-discount">${a(t("projects.form.labels.discount","الخصم"))}</label>
          <div class="input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select">
              <option value="percent" ${x==="percent"?"selected":""}>${a(t("projects.form.discount.percent","٪ نسبة"))}</option>
              <option value="amount" ${x==="amount"?"selected":""}>${a(t("projects.form.discount.amount","💵 مبلغ"))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control" value="${a(j)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label d-block" for="project-edit-company-share">${a(t("projects.form.labels.companyShare","نسبة الشركة والضريبة"))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${a(String(R))}" ${w?"checked":""}>
              <label class="form-check-label" for="project-edit-company-share">${a(t("projects.form.companyShareToggle","إضافة نسبة الشركة (10٪)"))}</label>
            </div>
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${u?"checked":""}>
              <label class="form-check-label" for="project-edit-tax">${a(t("projects.form.taxLabel","شامل الضريبة (15٪)"))}</label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label" for="project-edit-payment-status">${a(t("projects.form.labels.paymentStatus","حالة الدفع"))}</label>
          <select class="form-select" id="project-edit-payment-status" name="project-payment-status">
            <option value="unpaid" ${y==="unpaid"?"selected":""}>${a(t("projects.form.paymentStatus.unpaid","غير مدفوع"))}</option>
            <option value="partial" ${y==="partial"?"selected":""}>${a(t("projects.form.paymentStatus.partial","مدفوع جزئياً"))}</option>
            <option value="paid" ${y==="paid"?"selected":""}>${a(t("projects.form.paymentStatus.paid","مدفوع"))}</option>
          </select>
          <label class="form-label mt-2" for="project-edit-payment-progress-value">${a(t("projects.form.paymentProgress.label","💰 الدفعة المستلمة"))}</label>
          <div class="input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select">
              <option value="amount" ${_==="amount"?"selected":""}>${a(t("projects.form.paymentProgress.amount","💵 مبلغ"))}</option>
              <option value="percent" ${_!=="amount"?"selected":""}>${a(t("projects.form.paymentProgress.percent","٪ نسبة"))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control" value="${a(D)}" placeholder="0" inputmode="decimal">
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
  `}function Xe(e){const s=["commercial","coverage","photography","social"],n=s.map(o=>{const i=a(t(`projects.form.types.${o}`,o)),p=String(o)===String(e)?" selected":"";return`<option value="${o}"${p}>${i}</option>`});if(e&&!s.includes(e)){const o=a(ye(e));n.push(`<option value="${a(String(e))}" selected>${o}</option>`)}return`<option value="">${a(t("projects.form.placeholders.type","اختر نوع المشروع"))}</option>${n.join("")}`}function Ke(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="text-muted small" data-empty>${a(t("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const s=a(t("actions.remove","إزالة"));return e.map(n=>{const r=a(n?.label||""),o=a(v(n?.amount||0)),i=a(String((n?.note??n?.notes)||"")),p=a(String(n?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${r}</div>
            <div class="text-muted small">${o}${i?" • "+i:""}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${p}" aria-label="${s}">✖</button>
        </div>
      `}).join("")}function xe(e){if(!e)return{date:"",time:""};let s=e;s.includes(" ")&&(s=s.replace(" ","T"));const[n="",r=""]=s.split("T"),o=r.match(/(\d{1,2}:\d{2})/);return{date:n?n.slice(0,10):"",time:o?o[0]:""}}function rt(e,s){if(!e)return"";const n=s&&/\d{1,2}:\d{2}/.test(s)?s:"00:00",[r="00",o="00"]=n.split(":"),i=r.padStart(2,"0"),p=o.padStart(2,"0");return`${e}T${i}:${p}`}function Qe(e){if(!e)return null;const s=e.projectId??e.project_id??e.projectID??null;return s!=null?String(s):null}async function ct(e,s){if(!e)return;const r=we().filter(c=>{const l=Qe(c);return l&&l===String(e)});if(!r.length)return;const o=s==="paid",i=o?"paid":"unpaid";let p=!1;for(const c of r){const l=c?.id??c?.reservationId??c?.reservation_id;if(!l)continue;const m=c?.paid===!0||c?.paid==="paid",y=c?.paidStatus??c?.paymentStatus??(m?"paid":"unpaid");if(!(m===o&&y===i))try{await Be(l,{paid_status:i,paid:o}),p=!0}catch(u){console.error("❌ [projectFocusTemplates] Failed to sync reservation payment status",u)}}p&&document.dispatchEvent(new CustomEvent("reservations:changed"))}export{ae as P,nt as a,st as b,ot as c,rt as d,Ke as e,fe as f,be as g,Qe as h,Ae as r,ct as s};
