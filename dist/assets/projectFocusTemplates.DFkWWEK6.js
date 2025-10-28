import{n as u,t,g as xe}from"./auth.rcYOHg7k.js";import{c as Ee,a as Le,e as s,d as Te,t as ke,b as qe,f as m,g as _e,r as Me,i as Ve,D as ge,u as Be}from"./reservationsService.DMFWHr0A.js";const ee=.15,ze="bg-primary",He=2,Se={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},Oe={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Ue={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"};function ue(e){if(!e)return null;const n=[e?.id,e?.reservationId,e?.reservation_id,e?.reservationID].find(r=>r!=null&&r!=="");return n!=null?String(n):null}function me(e=[]){const a=_e();return e.map(n=>{const r=n?.reservation??n;if(!r||typeof r!="object")return null;let o=Number.isInteger(n?.index)&&n.index>=0?n.index:Number.isInteger(n?.reservationIndex)&&n.reservationIndex>=0?n.reservationIndex:null;if(!Number.isInteger(o)||o<0){const i=ue(r);i&&(o=a.findIndex(d=>{const c=ue(d);return c&&c===i}))}return{reservation:r,index:Number.isInteger(o)&&o>=0?o:-1}}).filter(Boolean)}function be(e){return e?e.id!=null?String(e.id):e.projectId!=null?String(e.projectId):e.project_id!=null?String(e.project_id):null:null}function at(e,{customer:a=null,techniciansMap:n=new Map,reservations:r=[]}={}){const i=me(r).map(({reservation:A})=>A),d=be(e),c=d?s(d):"",l=Te(e),b=t(`projects.status.${l}`,Se[l]),v=Oe[l]||"bg-secondary",f=e?.paymentStatus==="paid"?"paid":"unpaid",T=t(`projects.paymentStatus.${f}`,f==="paid"?"Paid":"Unpaid"),$=f==="paid"?"status-paid":"status-unpaid",y=[f==="paid"?"project-focus-card--paid":"project-focus-card--unpaid"],h=e?.confirmed===!0||e?.confirmed==="true";h&&y.push("project-focus-card--confirmed");const j=e?.projectCode||(d?`PRJ-${u(d)}`:""),C=j?u(String(j).replace(/^#/,"")):"",R=C?`<span class="project-code-badge project-focus-card__code">#${s(C)}</span>`:"",_=ve(e?.type),D=_?`<span class="badge project-focus-card__badge ${ze}">${s(_)}</span>`:"",P=`<span class="project-focus-card__status-chip ${v}">${s(b)}</span>`,M=`<span class="reservation-chip ${$} project-focus-card__payment-chip">${s(T)}</span>`,J=(e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"),V=(e?.description||"").trim(),W=V?s(ke(V,110)):s(t("projects.fallback.noDescription","No description")),B=Array.isArray(e?.technicians)?e.technicians:[],I=B.map(A=>n.get(String(A))?.name).filter(Boolean),E=I.length?Je(I):"",Y=a?.customerName||e?.clientName||"",Q=(e?.clientCompany||a?.companyName||"").trim(),L=i.reduce((A,x)=>{const Pe=fe(x),ye=Array.isArray(x?.items)?x.items:[],Fe=ye.reduce((De,Ie)=>De+(Number(Ie?.qty)||0),0),Re=Array.isArray(x?.technicians)?x.technicians.length:0,he=Array.isArray(x?.crewAssignments)?x.crewAssignments:[],q=he.length?he:Array.isArray(x?.technicians)?x.technicians:[],de=qe({items:ye,technicianIds:Array.isArray(q)&&!q.length?q:[],crewAssignments:Array.isArray(q)&&q.length&&typeof q[0]=="object"?q:[],discount:x?.discount??0,discountType:x?.discountType||"percent",applyTax:!1,start:x?.start,end:x?.end,companySharePercent:null});return{total:A.total+Pe,equipment:A.equipment+Number(de.equipmentTotal||0),crew:A.crew+Number(de.crewTotal||0),crewCost:A.crewCost+Number(de.crewCostTotal||0),equipmentCountTotal:(A.equipmentCountTotal||0)+Fe,crewCountTotal:(A.crewCountTotal||0)+Re}},{total:0,equipment:0,crew:0,crewCost:0,equipmentCountTotal:0,crewCountTotal:0}),se=Number(L.total.toFixed(2)),ae=L.equipmentCountTotal||0,g=L.crewCountTotal||B.length,G=we(e),ne=Number(G.expensesTotal||0),p=Number((L.equipment+L.crew+ne).toFixed(2)),S=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let F=(e?.discountType==="amount"?"amount":"percent")==="amount"?S:p*(S/100);(!Number.isFinite(F)||F<0)&&(F=0),F>p&&(F=p);const Z=Math.max(0,p-F),N=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",X=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,oe=N&&X>0?X:0,K=Number((Z*(oe/100)).toFixed(2)),re=G.applyTax?Number(((Z+K)*ee).toFixed(2)):0,z=Number((Z+K+re).toFixed(2)),k=[C?{icon:"🆔",label:t("projectCards.meta.code","رقم المشروع"),value:`#${C}`}:null,Y?{icon:"👤",label:t("projectCards.meta.client","العميل"),value:Y}:null,Q?{icon:"🏢",label:t("projectCards.meta.company","شركة العميل"),value:Q}:null,_?{icon:"🏷️",label:t("projectCards.meta.type","نوع المشروع"),value:_}:null,E?{icon:"👥",label:t("projectCards.stats.crewLabel","عدد الطاقم"),value:E}:null,{icon:"📅",label:t("projectCards.meta.startDate","تاريخ البداية"),value:je(e?.start)},{icon:"📅",label:t("projectCards.meta.endDate","تاريخ النهاية"),value:e?.end?je(e.end):"—"}].filter(Boolean),H=[{icon:"📦",label:t("projectCards.stats.equipmentCount","عدد المعدات"),value:u(String(ae))},{icon:"😎",label:t("projectCards.stats.crewCount","عدد أفراد الطاقم"),value:u(String(g))},{icon:"💵",label:t("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:m(se)}],ce=[{icon:"💳",label:t("projectCards.stats.paymentStatus","حالة الدفع"),value:T},{icon:"💸",label:t("projectCards.stats.expensesTotal","إجمالي المصاريف"),value:m(G.expensesTotal)},{icon:"💵",label:t("projects.details.summary.finalTotal","الإجمالي النهائي"),value:m(z)}],ie=[pe("projectCards.groups.meta","بيانات المشروع",k),pe("projectCards.groups.reservations","موجز الحجز",H),pe("projectCards.groups.payment","ملخص الدفع",ce)].filter(Boolean).join(""),O=t("projects.focus.confirmed","✅ مشروع مؤكد"),le=t("projects.focus.pending","⌛ بانتظار التأكيد"),Ne=`<div class="project-focus-card__actions"><span class="reservation-chip ${h?"status-confirmed":"status-pending"} project-focus-card__confirm-indicator">${s(h?O:le)}</span></div>`,Ae=[R,D,P,M].filter(Boolean).join(`
          `);return`
    <div class="project-card-grid__item">
      <article class="${["project-focus-card",...y].join(" ")}" data-project-id="${c}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${Ae}
        </div>
        <h6 class="project-focus-card__title">${s(J)}</h6>
        <p class="project-focus-card__description">${W}</p>
        <div class="project-focus-card__sections">
          ${ie}
        </div>
        ${Ne}
      </article>
    </div>
  `}function pe(e,a,n=[]){if(!n.length)return"";const r=n.map(({icon:o,label:i,value:d})=>`
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
  `}function Je(e=[]){if(!e.length)return"";const a=e.slice(0,He),n=e.length-a.length,r=xe()==="ar"?"، ":", ";let o=a.join(r);return n>0&&(o+=`${r}+${u(String(n))}`),o}function nt(e,{customer:a=null,reservations:n=[]}={}){const r=me(n),o=r.map(({reservation:p})=>p),i=we(e),d=o.reduce((p,S)=>p+fe(S),0),c=Number(d.toFixed(2)),l=o.length,b=i.applyTax?Number(((i.subtotal+c)*ee).toFixed(2)):0,v=Number((i.subtotal+c+b).toFixed(2)),f=Te(e),T=t(`projects.status.${f}`,Se[f]),$=Ue[f]||"status-confirmed",y=be(e)||"",h=e?.projectCode||(y?`PRJ-${u(y)}`:""),j=h?u(String(h).replace(/^#/,"")):"",C=j?`<span class="project-code-badge">#${s(j)}</span>`:"",R=i.applyTax,_=R?t("projects.details.chips.vatOn","شامل الضريبة 15٪"):t("projects.details.chips.vatOff","غير شامل الضريبة"),D=R?"status-paid":"status-unpaid",P=e?.paymentStatus==="paid"?"paid":"unpaid",M=t(`projects.paymentStatus.${P}`,P==="paid"?"Paid":"Unpaid"),J=P==="paid"?"status-paid":"status-unpaid",W=t("projects.details.chips.reservations","{count} حجوزات").replace("{count}",u(String(l))),B=e?.confirmed===!0||e?.confirmed==="true"?`<span class="reservation-chip status-confirmed">${s(t("projects.focus.confirmed","✅ مشروع مؤكد"))}</span>`:"",I=a?.customerName||e?.clientName||"",E=(e?.clientCompany||a?.companyName||"").trim(),Q=(e?.description||"").trim()||t("projects.fallback.noDescription","لا يوجد وصف"),L=[j?{icon:"🆔",label:t("projects.details.labels.code","رقم المشروع"),value:`#${j}`}:null,I?{icon:"👤",label:t("projects.details.client","العميل"),value:I}:null,E?{icon:"🏢",label:t("projects.details.company","شركة العميل"),value:E}:null,{icon:"🏷️",label:t("projects.details.type","نوع المشروع"),value:ve(e?.type)},{icon:"🗓️",label:t("projects.details.labels.start","تاريخ البداية"),value:te(e?.start)},{icon:"🗓️",label:t("projects.details.labels.end","تاريخ النهاية"),value:e?.end?te(e.end):"—"},{icon:"🔗",label:t("projects.details.labels.reservationsCount","عدد الحجوزات"),value:u(String(l))}].filter(Boolean),se=t("projects.details.expenses","المصروفات ({amount})").replace("{amount}",m(i.expensesTotal)),ae=i.expensesTotal>0?`<ul class="project-details-list">${(e?.expenses||[]).map(p=>`
          <li>
            <span class="project-expense-label">${s(p.label??"")}</span>
            <span class="project-expense-amount">${m(p.amount)}</span>
          </li>
        `).join("")}</ul>`:`<div class="text-muted">${s(t("projects.details.noItems","لا يوجد"))}</div>`;let g=[];if(g.push({icon:"💳",label:t("projects.details.summary.paymentStatus","حالة الدفع"),value:M}),l>0){const p=o.reduce((O,le)=>{const U=typeof computeReservationFinancials=="function"?computeReservationFinancials(le):null;return U&&typeof U=="object"&&(O.equipment+=Number(U.equipmentTotal||0),O.crew+=Number(U.crewTotal||0),O.crewCost+=Number(U.crewCostTotal||0)),O},{equipment:0,crew:0,crewCost:0}),S=Number(i.expensesTotal||0),w=Number((p.equipment+p.crew).toFixed(2)),F=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let N=(e?.discountType==="amount"?"amount":"percent")==="amount"?F:w*(F/100);(!Number.isFinite(N)||N<0)&&(N=0),N>w&&(N=w);const X=e?.applyTax===!0||e?.applyTax==="true",oe=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",K=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,re=oe&&X&&K>0?K:0,z=Math.max(0,w-N),k=Number((z*(re/100)).toFixed(2)),H=X?Number(((z+k)*ee).toFixed(2)):0,ce=Number((z-k-H-S-p.crewCost).toFixed(2)),ie=Number((z+k+H).toFixed(2));p.equipment>0&&g.push({icon:"🎛️",label:t("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:m(p.equipment)}),p.crew>0&&g.push({icon:"😎",label:t("projects.details.summary.crewTotal","إجمالي الفريق"),value:m(p.crew)}),p.crewCost>0&&g.push({icon:"🧾",label:t("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:m(p.crewCost)}),S>0&&g.push({icon:"🧾",label:t("projects.details.summary.expensesTotal","مصروفات المشروع"),value:m(S)}),g.push({icon:"🧮",label:t("projects.details.summary.gross","الإجمالي"),value:m(w)}),N>0&&g.push({icon:"🏷️",label:t("projects.details.summary.discount","الخصم"),value:`−${m(N)}`}),k>0&&g.push({icon:"🏦",label:t("projects.details.summary.companyShare","نسبة الشركة"),value:`−${m(k)}`}),H>0&&g.push({icon:"💸",label:t("projects.details.summary.tax","الضريبة (15٪)"),value:`−${m(H)}`}),g.push({icon:"💵",label:t("projects.details.summary.netProfit","صافي الربح"),value:m(ce)}),g.push({icon:"💰",label:t("projects.details.summary.finalTotal","المجموع النهائي"),value:m(ie)})}else g.push({icon:"💼",label:t("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:m(i.subtotal)}),g.push({icon:"🧮",label:t("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:m(b)}),g.push({icon:"💰",label:t("projects.details.summary.overallTotal","الإجمالي الكلي"),value:m(v)});const G=g.map(({icon:p,label:S,value:w})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${s(p)} ${s(S)}</span>
      <span class="summary-details-value">${s(w)}</span>
    </div>
  `).join(""),ne=We({project:e,reservations:r});return`
    <div class="project-details-header mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h5 class="mb-2 d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted project-details-title-label">${s(t("projects.details.labels.projectTitle","اسم المشروع"))}:</span>
            <span class="fw-bold project-details-title-text">${s((e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"))}</span>
            ${C}
          </h5>
        </div>
        <div class="status-chips d-flex flex-wrap gap-2">
          <span class="status-chip ${$}">${s(T)}</span>
          <span class="status-chip ${D}">${s(_)}</span>
          <span class="reservation-chip ${J}">${s(M)}</span>
          <span class="reservation-chip status-confirmed">${s(W)}</span>
          ${B}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${L.map(({icon:p,label:S,value:w})=>Ce(p,S,w)).join("")}
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(t("projects.details.labels.notes","ملاحظات المشروع"))}</h6>
      <div class="project-notes">${s(Q)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(se)}</h6>
      ${ae}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${G}
    </div>
    ${ne}
  `}function We({reservations:e=[],project:a=null}={}){const r=[...me(e)].sort((c,l)=>{const b=c?.reservation?.start?new Date(c.reservation.start).getTime():0;return(l?.reservation?.start?new Date(l.reservation.start).getTime():0)-b}),o=t("projects.details.reservations.title","الحجوزات المرتبطة"),i=t("projects.details.reservations.empty","لا توجد حجوزات مرتبطة بهذا المشروع بعد."),d=r.length?`<div class="project-reservations-list">${r.map(({reservation:c,index:l})=>Ye(c,l,a)).join("")}</div>`:`<div class="alert alert-info project-reservations-empty mb-0">${s(i)}</div>`;return`
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex align-items-center gap-2 flex-wrap">
        <h6 class="mb-0">${s(o)}</h6>
      </div>
      ${d}
    </section>
  `}function Ye(e,a=-1,n=null){const r=ue(e)??"-",o=u(String(r)),i=Ge(e?.start,e?.end),d=fe(e),c=m(d),l=u(String((e?.items||[]).length)),b=u(String((e?.technicians||[]).length)),v=t("projects.details.reservations.itemsCount","{count} معدة").replace("{count}",l),f=t("projects.details.reservations.crewCount","{count} من الطاقم").replace("{count}",b),{effectiveConfirmed:T}=Me(e,n),$=T?t("reservations.list.status.confirmed","✅ مؤكد"):t("reservations.list.status.pending","⏳ غير مؤكد"),y=T?"project-reservation-card__badge--confirmed":"project-reservation-card__badge--pending",h=e?.paid===!0||e?.paid==="paid",j=h?t("reservations.list.payment.paid","💳 مدفوع"):t("reservations.list.payment.unpaid","💳 غير مدفوع"),C=h?"project-reservation-card__badge--paid":"project-reservation-card__badge--unpaid",_=Ve(e)?`<span class="project-reservation-card__badge project-reservation-card__badge--completed">${s(t("reservations.list.status.completed","📁 منتهي"))}</span>`:"",D=Number.isInteger(a)&&a>=0?` data-index="${a}"`:"",P=`<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${s(String(r??""))}"${D}>${s(t("projects.details.reservations.view","عرض الحجز"))}</button>`;return`
    <article class="project-reservation-card" data-reservation-id="${s(o)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${s(o)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${y}">${s($)}</span>
          <span class="project-reservation-card__badge ${C}">${s(j)}</span>
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
  `}function Ce(e,a,n){return`
    <div class="res-info-row">
      <span class="label">${s(e)} ${s(a)}</span>
      <span class="separator">:</span>
      <span class="value">${s(n)}</span>
    </div>
  `}function we(e){const a=Number(e?.equipmentEstimate)||0,n=Ee(e),r=a+n,o=e?.applyTax===!0||e?.applyTax==="true",i=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?i:r*(i/100);(!Number.isFinite(c)||c<0)&&(c=0),c>r&&(c=r);const l=Math.max(0,r-c),b=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",v=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,f=b&&o&&v>0?v:0,T=f>0?Number((l*(f/100)).toFixed(2)):0,$=l+T;let y=o?$*ee:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let h=o?Number(e?.totalWithTax):$;return o?(!Number.isFinite(h)||h<=0)&&(h=Number(($+y).toFixed(2))):h=$,{equipmentEstimate:a,expensesTotal:n,baseSubtotal:r,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:T,subtotal:$,applyTax:o,taxAmount:y,totalWithTax:h}}function fe(e){if(!e)return 0;const a=Array.isArray(e?.items)?e.items:[],n=e?.discount??0,r=Number(u(String(n)))||0,o=e?.discountType||"percent",i=Array.isArray(e?.crewAssignments)?e.crewAssignments:[],d=i.length?i:Array.isArray(e?.technicians)?e.technicians:[],c=Le(a,r,o,!1,d,{start:e?.start,end:e?.end});if(Number.isFinite(c))return c;const l=Number(u(String(e?.cost??e?.total??0)));return Number.isFinite(l)?Math.round(l):0}function je(e){if(!e)return"—";const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const r=xe()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-GB",o=new Intl.DateTimeFormat(r,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return u(o.format(a))}function te(e){if(!e)return"—";const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=String(a.getDate()).padStart(2,"0"),r=String(a.getMonth()+1).padStart(2,"0"),o=String(a.getFullYear()),i=String(a.getMinutes()).padStart(2,"0"),d=a.getHours(),c=d>=12?"PM":"AM",l=d%12||12,b=String(l).padStart(2,"0"),v=`${n}/${r}/${o} ${b}:${i} ${c}`;return u(v)}function Ge(e,a){if(!e)return"—";const n=te(e);return a?`${n} - ${te(a)}`:n}function ve(e){if(!e)return t("projects.form.types.unknown","نوع غير محدد");const n={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return t(n,e)}function ot(e,{clientName:a="",clientCompany:n=""}={}){const r=be(e)||"",o=e?.projectCode||(r?`PRJ-${u(r)}`:""),i=o?u(String(o)):"",d=Xe(e?.type),c=$e(e?.start||""),l=$e(e?.end||""),b=typeof e?.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",v=["paid","partial"].includes(b)?b:"unpaid",f=e?.applyTax===!0||e?.applyTax==="true",T=e?.description||"",$=e?.discountType==="amount"?"amount":"percent",y=u(String(e?.discount??e?.discountValue??0)),h=e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??ge,j=Number.parseFloat(u(String(h))),C=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true"||f&&Number.isFinite(j)&&j>0,R=Number.isFinite(j)&&j>0?j:ge,_=e?.paymentProgressType==="amount"?"amount":e?.paymentProgressType==="percent"?"percent":e?.payment_progress_type==="amount"?"amount":(e?.payment_progress_type==="percent","percent"),D=u(String(e?.paymentProgressValue??e?.payment_progress_value??(_==="amount"?e?.paidAmount??e?.paid_amount:e?.paidPercent??e?.paid_percent)??"")),P=t("projects.details.labels.code","رقم المشروع"),M=t("projects.form.labels.client","العميل"),J=t("projects.form.labels.clientCompany","شركة العميل"),V=[i?{icon:"🆔",label:P,value:`#${i}`}:null,a?{icon:"👤",label:M,value:a}:null,n?{icon:"🏢",label:J,value:n}:null].filter(Boolean),W=V.length?`<div class="project-details-info mb-3">
        ${V.map(({icon:I,label:E,value:Y})=>Ce(I,E,Y)).join("")}
      </div>`:"",B=Ke(Array.isArray(e?.expenses)?e.expenses:[]);return`
    <div class="project-details-edit">
      <div class="project-details-header mb-3">
        <h5 class="fw-bold mb-1">${s(t("projects.details.edit.heading","تعديل المشروع"))}</h5>
        <p class="text-muted small mb-0">${s(t("projects.details.edit.subheading","قم بتحديث بيانات المشروع ثم احفظ التغييرات."))}</p>
      </div>
      ${W}
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
            <textarea class="form-control" id="project-edit-description" name="project-description" rows="3">${s(T)}</textarea>
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
              ${B}
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
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${s(String(R))}" ${C?"checked":""}>
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
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control" value="${s(D)}" placeholder="0" inputmode="decimal">
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
  `}function Xe(e){const a=["commercial","coverage","photography","social"],n=a.map(o=>{const i=s(t(`projects.form.types.${o}`,o)),d=String(o)===String(e)?" selected":"";return`<option value="${o}"${d}>${i}</option>`});if(e&&!a.includes(e)){const o=s(ve(e));n.push(`<option value="${s(String(e))}" selected>${o}</option>`)}return`<option value="">${s(t("projects.form.placeholders.type","اختر نوع المشروع"))}</option>${n.join("")}`}function Ke(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="text-muted small" data-empty>${s(t("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const a=s(t("actions.remove","إزالة"));return e.map(n=>{const r=s(n?.label||""),o=s(m(n?.amount||0)),i=s(String(n?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${r}</div>
            <div class="text-muted small">${o}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${i}" aria-label="${a}">✖</button>
        </div>
      `}).join("")}function $e(e){if(!e)return{date:"",time:""};let a=e;a.includes(" ")&&(a=a.replace(" ","T"));const[n="",r=""]=a.split("T"),o=r.match(/(\d{1,2}:\d{2})/);return{date:n?n.slice(0,10):"",time:o?o[0]:""}}function rt(e,a){if(!e)return"";const n=a&&/\d{1,2}:\d{2}/.test(a)?a:"00:00",[r="00",o="00"]=n.split(":"),i=r.padStart(2,"0"),d=o.padStart(2,"0");return`${e}T${i}:${d}`}function Qe(e){if(!e)return null;const a=e.projectId??e.project_id??e.projectID??null;return a!=null?String(a):null}async function ct(e,a){if(!e)return;const r=_e().filter(c=>{const l=Qe(c);return l&&l===String(e)});if(!r.length)return;const o=a==="paid",i=o?"paid":"unpaid";let d=!1;for(const c of r){const l=c?.id??c?.reservationId??c?.reservation_id;if(!l)continue;const b=c?.paid===!0||c?.paid==="paid",v=c?.paidStatus??c?.paymentStatus??(b?"paid":"unpaid");if(!(b===o&&v===i))try{await Be(l,{paid_status:i,paid:o}),d=!0}catch(f){console.error("❌ [projectFocusTemplates] Failed to sync reservation payment status",f)}}d&&document.dispatchEvent(new CustomEvent("reservations:changed"))}export{ee as P,nt as a,at as b,ot as c,rt as d,Ke as e,fe as f,be as g,Qe as h,we as r,ct as s};
