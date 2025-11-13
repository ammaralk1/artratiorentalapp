import{n as b,t,p as Te}from"./auth.DB37AgOS.js";import{c as Le,e as s,d as _e,t as ke,f}from"./state.CIl4ueyN.js";import{e as qe,f as Me,g as Se,a as Ve,i as Be,D as je,u as ze}from"./reservationsService.BCNcsI8W.js";const se=.15,He="bg-primary",Oe=2,Ce={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},Ue={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Je={upcoming:"status-pending",ongoing:"status-confirmed",completed:"status-completed"};function ue(e){if(!e)return null;const n=[e?.id,e?.reservationId,e?.reservation_id,e?.reservationID].find(r=>r!=null&&r!=="");return n!=null?String(n):null}function me(e=[]){const a=Se();return e.map(n=>{const r=n?.reservation??n;if(!r||typeof r!="object")return null;let o=Number.isInteger(n?.index)&&n.index>=0?n.index:Number.isInteger(n?.reservationIndex)&&n.reservationIndex>=0?n.reservationIndex:null;if(!Number.isInteger(o)||o<0){const i=ue(r);i&&(o=a.findIndex(d=>{const c=ue(d);return c&&c===i}))}return{reservation:r,index:Number.isInteger(o)&&o>=0?o:-1}}).filter(Boolean)}function be(e){return e?e.id!=null?String(e.id):e.projectId!=null?String(e.projectId):e.project_id!=null?String(e.project_id):null:null}function nt(e,{customer:a=null,techniciansMap:n=new Map,reservations:r=[]}={}){const i=me(r).map(({reservation:A})=>A),d=be(e),c=d?s(d):"",l=_e(e),y=t(`projects.status.${l}`,Ce[l]),h=Ue[l]||"bg-secondary",u=e?.paymentStatus==="paid"?"paid":"unpaid",x=t(`projects.paymentStatus.${u}`,u==="paid"?"Paid":"Unpaid"),S=u==="paid"?"status-paid":"status-unpaid",j=[u==="paid"?"project-focus-card--paid":"project-focus-card--unpaid"],v=e?.confirmed===!0||e?.confirmed==="true";v&&j.push("project-focus-card--confirmed");const m=e?.projectCode||(d?`PRJ-${b(d)}`:""),C=m?b(String(m).replace(/^#/,"")):"",R=C?`<span class="project-code-badge project-focus-card__code">#${s(C)}</span>`:"",T=ye(e?.type),D=T?`<span class="badge project-focus-card__badge ${He}">${s(T)}</span>`:"",P=`<span class="project-focus-card__status-chip ${h}">${s(y)}</span>`,M=`<span class="reservation-chip ${S} project-focus-card__payment-chip">${s(x)}</span>`,W=(e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"),V=(e?.description||"").trim(),Y=V?s(ke(V,110)):s(t("projects.fallback.noDescription","No description")),B=Array.isArray(e?.technicians)?e.technicians:[],I=B.map(A=>n.get(String(A))?.name).filter(Boolean),E=I.length?We(I):"",G=a?.customerName||e?.clientName||"",K=(e?.clientCompany||a?.companyName||"").trim(),L=i.reduce((A,$)=>{const Fe=fe($),he=Array.isArray($?.items)?$.items:[],Re=he.reduce((Ie,Ee)=>Ie+(Number(Ee?.qty)||0),0),De=Array.isArray($?.technicians)?$.technicians.length:0,ge=Array.isArray($?.crewAssignments)?$.crewAssignments:[],q=ge.length?ge:Array.isArray($?.technicians)?$.technicians:[],de=Me({items:he,technicianIds:Array.isArray(q)&&!q.length?q:[],crewAssignments:Array.isArray(q)&&q.length&&typeof q[0]=="object"?q:[],discount:$?.discount??0,discountType:$?.discountType||"percent",applyTax:!1,start:$?.start,end:$?.end,companySharePercent:null});return{total:A.total+Fe,equipment:A.equipment+Number(de.equipmentTotal||0),crew:A.crew+Number(de.crewTotal||0),crewCost:A.crewCost+Number(de.crewCostTotal||0),equipmentCountTotal:(A.equipmentCountTotal||0)+Re,crewCountTotal:(A.crewCountTotal||0)+De}},{total:0,equipment:0,crew:0,crewCost:0,equipmentCountTotal:0,crewCountTotal:0}),ne=Number(L.total.toFixed(2)),oe=L.equipmentCountTotal||0,g=L.crewCountTotal||B.length,X=Ne(e),re=Number(X.expensesTotal||0),p=Number((L.equipment+L.crew+re).toFixed(2)),_=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let F=(e?.discountType==="amount"?"amount":"percent")==="amount"?_:p*(_/100);(!Number.isFinite(F)||F<0)&&(F=0),F>p&&(F=p);const Q=Math.max(0,p-F),N=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",Z=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,ee=N&&Z>0?Z:0,z=Number((Q*(ee/100)).toFixed(2)),te=X.applyTax?Number(((Q+z)*se).toFixed(2)):0,ce=Number((Q+z+te).toFixed(2)),H=[C?{icon:"🆔",label:t("projectCards.meta.code","رقم المشروع"),value:`#${C}`}:null,G?{icon:"👤",label:t("projectCards.meta.client","العميل"),value:G}:null,K?{icon:"🏢",label:t("projectCards.meta.company","شركة العميل"),value:K}:null,T?{icon:"🏷️",label:t("projectCards.meta.type","نوع المشروع"),value:T}:null,E?{icon:"👥",label:t("projectCards.stats.crewLabel","عدد الطاقم"),value:E}:null,{icon:"📅",label:t("projectCards.meta.startDate","تاريخ البداية"),value:$e(e?.start)},{icon:"📅",label:t("projectCards.meta.endDate","تاريخ النهاية"),value:e?.end?$e(e.end):"—"}].filter(Boolean),k=[{icon:"📦",label:t("projectCards.stats.equipmentCount","عدد المعدات"),value:b(String(oe))},{icon:"😎",label:t("projectCards.stats.crewCount","عدد أفراد الطاقم"),value:b(String(g))},{icon:"💵",label:t("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:f(ne)}],O=[{icon:"💳",label:t("projectCards.stats.paymentStatus","حالة الدفع"),value:x},{icon:"💸",label:t("projectCards.stats.expensesTotal","خدمات إنتاجية (التكلفة)"),value:f(X.expensesTotal)},{icon:"💵",label:t("projects.details.summary.finalTotal","الإجمالي النهائي"),value:f(ce)}],ie=[pe("projectCards.groups.meta","بيانات المشروع",H),pe("projectCards.groups.reservations","موجز الحجز",k),pe("projectCards.groups.payment","ملخص الدفع",O)].filter(Boolean).join(""),le=t("projects.focus.confirmed","✅ مشروع مؤكد"),U=t("projects.focus.pending","⌛ بانتظار التأكيد"),Ae=`<div class="project-focus-card__actions"><span class="reservation-chip ${v?"status-confirmed":"status-pending"} project-focus-card__confirm-indicator">${s(v?le:U)}</span></div>`,Pe=[R,D,P,M].filter(Boolean).join(`
          `);return`
    <div class="project-card-grid__item">
      <article class="${["project-focus-card",...j].join(" ")}" data-project-id="${c}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${Pe}
        </div>
        <h6 class="project-focus-card__title">${s(W)}</h6>
        <p class="project-focus-card__description">${Y}</p>
        <div class="project-focus-card__sections">
          ${ie}
        </div>
        ${Ae}
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
  `}function We(e=[]){if(!e.length)return"";const a=e.slice(0,Oe),n=e.length-a.length,r=Te()==="ar"?"، ":", ";let o=a.join(r);return n>0&&(o+=`${r}+${b(String(n))}`),o}function ot(e,{customer:a=null,reservations:n=[]}={}){const r=me(n),o=r.map(({reservation:p})=>p),i=Ne(e),d=o.reduce((p,_)=>p+fe(_),0),c=Number(d.toFixed(2)),l=o.length,y=i.applyTax?Number(((i.subtotal+c)*se).toFixed(2)):0,h=Number((i.subtotal+c+y).toFixed(2)),u=_e(e),x=t(`projects.status.${u}`,Ce[u]),S=Je[u]||"status-confirmed",j=be(e)||"",v=e?.projectCode||(j?`PRJ-${b(j)}`:""),m=v?b(String(v).replace(/^#/,"")):"",C=m?`<span class="project-code-badge">#${s(m)}</span>`:"",R=i.applyTax,T=R?t("projects.details.chips.vatOn","شامل الضريبة 15٪"):t("projects.details.chips.vatOff","غير شامل الضريبة"),D=R?"status-paid":"status-unpaid",P=e?.paymentStatus==="paid"?"paid":"unpaid",M=t(`projects.paymentStatus.${P}`,P==="paid"?"Paid":"Unpaid"),W=P==="paid"?"status-paid":"status-unpaid",Y=t("projects.details.chips.reservations","{count} حجوزات").replace("{count}",b(String(l))),B=e?.confirmed===!0||e?.confirmed==="true"?`<span class="reservation-chip status-confirmed">${s(t("projects.focus.confirmed","✅ مشروع مؤكد"))}</span>`:"",I=a?.customerName||e?.clientName||"",E=(e?.clientCompany||a?.companyName||"").trim(),K=(e?.description||"").trim()||t("projects.fallback.noDescription","لا يوجد وصف"),L=[m?{icon:"🆔",label:t("projects.details.labels.code","رقم المشروع"),value:`#${m}`}:null,I?{icon:"👤",label:t("projects.details.client","العميل"),value:I}:null,E?{icon:"🏢",label:t("projects.details.company","شركة العميل"),value:E}:null,{icon:"🏷️",label:t("projects.details.type","نوع المشروع"),value:ye(e?.type)},{icon:"🗓️",label:t("projects.details.labels.start","تاريخ البداية"),value:ae(e?.start)},{icon:"🗓️",label:t("projects.details.labels.end","تاريخ النهاية"),value:e?.end?ae(e.end):"—"},{icon:"🔗",label:t("projects.details.labels.reservationsCount","عدد الحجوزات"),value:b(String(l))}].filter(Boolean),ne=t("projects.details.expenses","المصروفات ({amount})").replace("{amount}",f(i.expensesTotal)),oe=i.expensesTotal>0?`<ul class="project-details-list">${(e?.expenses||[]).map(p=>`
          <li>
            <span class="project-expense-label">${s(p.label??"")}</span>
            <span class="project-expense-amount">${f(p.amount)}</span>
            ${p?.note??p?.notes?`<div class="text-muted small">${s(String(p.note??p.notes))}</div>`:""}
          </li>
        `).join("")}</ul>`:`<div class="text-muted">${s(t("projects.details.noItems","لا يوجد"))}</div>`;let g=[];if(g.push({icon:"💳",label:t("projects.details.summary.paymentStatus","حالة الدفع"),value:M}),l>0){const p=o.reduce((U,ve)=>{const J=typeof computeReservationFinancials=="function"?computeReservationFinancials(ve):null;return J&&typeof J=="object"&&(U.equipment+=Number(J.equipmentTotal||0),U.crew+=Number(J.crewTotal||0),U.crewCost+=Number(J.crewCostTotal||0)),U},{equipment:0,crew:0,crewCost:0}),_=Number(i.expensesTotal||0),w=Number((p.equipment+p.crew).toFixed(2)),F=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let N=(e?.discountType==="amount"?"amount":"percent")==="amount"?F:w*(F/100);(!Number.isFinite(N)||N<0)&&(N=0),N>w&&(N=w);const Z=e?.applyTax===!0||e?.applyTax==="true",ee=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",z=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,te=Z||ee&&z>0,ce=ee&&te&&z>0?z:0,H=Math.max(0,w-N),k=Number((H*(ce/100)).toFixed(2)),O=te?Number(((H+k)*se).toFixed(2)):0,ie=Number((H-k-O-_-p.crewCost).toFixed(2)),le=Number((H+k+O).toFixed(2));p.equipment>0&&g.push({icon:"🎛️",label:t("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:f(p.equipment)}),p.crew>0&&g.push({icon:"😎",label:t("projects.details.summary.crewTotal","إجمالي الفريق"),value:f(p.crew)}),p.crewCost>0&&g.push({icon:"🧾",label:t("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:f(p.crewCost)}),_>0&&g.push({icon:"🧾",label:t("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:f(_)}),g.push({icon:"🧮",label:t("projects.details.summary.gross","الإجمالي"),value:f(w)}),N>0&&g.push({icon:"🏷️",label:t("projects.details.summary.discount","الخصم"),value:`−${f(N)}`}),k>0&&g.push({icon:"🏦",label:t("projects.details.summary.companyShare","نسبة الشركة"),value:`−${f(k)}`}),O>0&&g.push({icon:"💸",label:t("projects.details.summary.tax","الضريبة (15٪)"),value:`−${f(O)}`}),g.push({icon:"💵",label:t("projects.details.summary.netProfit","صافي الربح"),value:f(ie)}),g.push({icon:"💰",label:t("projects.details.summary.finalTotal","المجموع النهائي"),value:f(le)})}else g.push({icon:"💼",label:t("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:f(i.subtotal)}),g.push({icon:"🧮",label:t("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:f(y)}),g.push({icon:"💰",label:t("projects.details.summary.overallTotal","الإجمالي الكلي"),value:f(h)});const X=g.map(({icon:p,label:_,value:w})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${s(p)} ${s(_)}</span>
      <span class="summary-details-value">${s(w)}</span>
    </div>
  `).join(""),re=Ye({project:e,reservations:r});return`
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
          <span class="status-chip ${S}">${s(x)}</span>
          <span class="status-chip ${D}">${s(T)}</span>
          <span class="reservation-chip ${W}">${s(M)}</span>
          <span class="reservation-chip status-confirmed">${s(Y)}</span>
          ${B}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${L.map(({icon:p,label:_,value:w})=>we(p,_,w)).join("")}
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(t("projects.details.labels.notes","ملاحظات المشروع"))}</h6>
      <div class="project-notes">${s(K)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(ne)}</h6>
      ${oe}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${X}
    </div>
    ${re}
  `}function Ye({reservations:e=[],project:a=null}={}){const r=[...me(e)].sort((c,l)=>{const y=c?.reservation?.start?new Date(c.reservation.start).getTime():0;return(l?.reservation?.start?new Date(l.reservation.start).getTime():0)-y}),o=t("projects.details.reservations.title","الحجوزات المرتبطة"),i=t("projects.details.reservations.empty","لا توجد حجوزات مرتبطة بهذا المشروع بعد."),d=r.length?`<div class="project-reservations-list">${r.map(({reservation:c,index:l})=>Ge(c,l,a)).join("")}</div>`:`<div class="alert alert-info project-reservations-empty mb-0">${s(i)}</div>`;return`
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex align-items-center gap-2 flex-wrap">
        <h6 class="mb-0">${s(o)}</h6>
      </div>
      ${d}
    </section>
  `}function Ge(e,a=-1,n=null){const r=ue(e)??"-",o=b(String(r)),i=Xe(e?.start,e?.end),d=fe(e),c=f(d),l=b(String((e?.items||[]).length)),y=b(String((e?.technicians||[]).length)),h=t("projects.details.reservations.itemsCount","{count} معدة").replace("{count}",l),u=t("projects.details.reservations.crewCount","{count} من الطاقم").replace("{count}",y),{effectiveConfirmed:x}=Ve(e,n),S=x?t("reservations.list.status.confirmed","✅ مؤكد"):t("reservations.list.status.pending","⏳ غير مؤكد"),j=x?"project-reservation-card__badge--confirmed":"project-reservation-card__badge--pending",v=e?.paid===!0||e?.paid==="paid",m=v?t("reservations.list.payment.paid","💳 مدفوع"):t("reservations.list.payment.unpaid","💳 غير مدفوع"),C=v?"project-reservation-card__badge--paid":"project-reservation-card__badge--unpaid",T=Be(e)?`<span class="project-reservation-card__badge project-reservation-card__badge--completed">${s(t("reservations.list.status.completed","📁 منتهي"))}</span>`:"",D=Number.isInteger(a)&&a>=0?` data-index="${a}"`:"",P=`<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${s(String(r??""))}"${D}>${s(t("projects.details.reservations.view","عرض الحجز"))}</button>`;return`
    <article class="project-reservation-card" data-reservation-id="${s(o)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${s(o)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${j}">${s(S)}</span>
          <span class="project-reservation-card__badge ${C}">${s(m)}</span>
          ${T}
        </div>
      </div>
      <div class="project-reservation-card__range">${s(i)}</div>
      <div class="project-reservation-card__meta">
        <span>📦 ${s(h)}</span>
        <span>😎 ${s(u)}</span>
      </div>
      <div class="project-reservation-card__footer">
        <span class="text-muted">${s(t("projectCards.stats.reservationValue","إجمالي الحجوزات"))}</span>
        <span class="fw-bold">${s(c)}</span>
        ${P}
      </div>
    </article>
  `}function we(e,a,n){return`
    <div class="res-info-row">
      <span class="label">${s(e)} ${s(a)}</span>
      <span class="separator">:</span>
      <span class="value">${s(n)}</span>
    </div>
  `}function Ne(e){const a=Number(e?.equipmentEstimate)||0,n=Le(e),r=a+n,o=e?.applyTax===!0||e?.applyTax==="true",i=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?i:r*(i/100);(!Number.isFinite(c)||c<0)&&(c=0),c>r&&(c=r);const l=Math.max(0,r-c),y=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",h=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,u=o||y&&h>0,x=y&&u&&h>0?h:0,S=x>0?Number((l*(x/100)).toFixed(2)):0,j=l+S;let v=u?j*se:0;(!Number.isFinite(v)||v<0)&&(v=0),v=Number(v.toFixed(2));let m=u?Number(e?.totalWithTax):j;return u?(!Number.isFinite(m)||m<=0)&&(m=Number((j+v).toFixed(2))):m=j,{equipmentEstimate:a,expensesTotal:n,baseSubtotal:r,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:S,subtotal:j,applyTax:u,taxAmount:v,totalWithTax:m}}function fe(e){if(!e)return 0;const a=Array.isArray(e?.items)?e.items:[],n=e?.discount??0,r=Number(b(String(n)))||0,o=e?.discountType||"percent",i=Array.isArray(e?.crewAssignments)?e.crewAssignments:[],d=i.length?i:Array.isArray(e?.technicians)?e.technicians:[],c=qe(a,r,o,!1,d,{start:e?.start,end:e?.end});if(Number.isFinite(c))return c;const l=Number(b(String(e?.cost??e?.total??0)));return Number.isFinite(l)?Math.round(l):0}function $e(e){if(!e)return"—";const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const r=Te()==="ar"?"ar-SA-u-ca-gregory-nu-latn":"en-GB",o=new Intl.DateTimeFormat(r,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return b(o.format(a))}function ae(e){if(!e)return"—";const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=String(a.getDate()).padStart(2,"0"),r=String(a.getMonth()+1).padStart(2,"0"),o=String(a.getFullYear()),i=String(a.getMinutes()).padStart(2,"0"),d=a.getHours(),c=d>=12?"PM":"AM",l=d%12||12,y=String(l).padStart(2,"0"),h=`${n}/${r}/${o} ${y}:${i} ${c}`;return b(h)}function Xe(e,a){if(!e)return"—";const n=ae(e);return a?`${n} - ${ae(a)}`:n}function ye(e){if(!e)return t("projects.form.types.unknown","نوع غير محدد");const n={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return t(n,e)}function rt(e,{clientName:a="",clientCompany:n=""}={}){const r=be(e)||"",o=e?.projectCode||(r?`PRJ-${b(r)}`:""),i=o?b(String(o)):"",d=Ke(e?.type),c=xe(e?.start||""),l=xe(e?.end||""),y=typeof e?.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",h=["paid","partial"].includes(y)?y:"unpaid",u=e?.applyTax===!0||e?.applyTax==="true",x=e?.description||"",S=e?.discountType==="amount"?"amount":"percent",j=b(String(e?.discount??e?.discountValue??0)),v=e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??je,m=Number.parseFloat(b(String(v))),C=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true"||u&&Number.isFinite(m)&&m>0,R=Number.isFinite(m)&&m>0?m:je,T=e?.paymentProgressType==="amount"?"amount":e?.paymentProgressType==="percent"?"percent":e?.payment_progress_type==="amount"?"amount":(e?.payment_progress_type==="percent","percent"),D=b(String(e?.paymentProgressValue??e?.payment_progress_value??(T==="amount"?e?.paidAmount??e?.paid_amount:e?.paidPercent??e?.paid_percent)??"")),P=t("projects.details.labels.code","رقم المشروع"),M=t("projects.form.labels.client","العميل"),W=t("projects.form.labels.clientCompany","شركة العميل"),V=[i?{icon:"🆔",label:P,value:`#${i}`}:null,a?{icon:"👤",label:M,value:a}:null,n?{icon:"🏢",label:W,value:n}:null].filter(Boolean),Y=V.length?`<div class="project-details-info mb-3">
        ${V.map(({icon:I,label:E,value:G})=>we(I,E,G)).join("")}
      </div>`:"",B=Qe(Array.isArray(e?.expenses)?e.expenses:[]);return`
    <div class="project-details-edit">
      <div class="project-details-header mb-3">
        <h5 class="fw-bold mb-1">${s(t("projects.details.edit.heading","تعديل المشروع"))}</h5>
        <p class="text-muted small mb-0">${s(t("projects.details.edit.subheading","قم بتحديث بيانات المشروع ثم احفظ التغييرات."))}</p>
      </div>
      ${Y}
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
            <label class="form-label mt-2" for="project-edit-expense-note">${s(t("projects.form.labels.expenseNote","ملاحظات"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-note" placeholder="${s(t("projects.form.placeholders.expenseNote","تفاصيل إضافية"))}">
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-primary" data-action="add-expense">${s(t("projects.form.buttons.addExpense","➕ إضافة خدمة"))}</button>
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
              <option value="percent" ${S==="percent"?"selected":""}>${s(t("projects.form.discount.percent","٪ نسبة"))}</option>
              <option value="amount" ${S==="amount"?"selected":""}>${s(t("projects.form.discount.amount","💵 مبلغ"))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control" value="${s(j)}" placeholder="0" inputmode="decimal">
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
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${u?"checked":""}>
              <label class="form-check-label" for="project-edit-tax">${s(t("projects.form.taxLabel","شامل الضريبة (15٪)"))}</label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label" for="project-edit-payment-status">${s(t("projects.form.labels.paymentStatus","حالة الدفع"))}</label>
          <select class="form-select" id="project-edit-payment-status" name="project-payment-status">
            <option value="unpaid" ${h==="unpaid"?"selected":""}>${s(t("projects.form.paymentStatus.unpaid","غير مدفوع"))}</option>
            <option value="partial" ${h==="partial"?"selected":""}>${s(t("projects.form.paymentStatus.partial","مدفوع جزئياً"))}</option>
            <option value="paid" ${h==="paid"?"selected":""}>${s(t("projects.form.paymentStatus.paid","مدفوع"))}</option>
          </select>
          <label class="form-label mt-2" for="project-edit-payment-progress-value">${s(t("projects.form.paymentProgress.label","💰 الدفعة المستلمة"))}</label>
          <div class="input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select">
              <option value="amount" ${T==="amount"?"selected":""}>${s(t("projects.form.paymentProgress.amount","💵 مبلغ"))}</option>
              <option value="percent" ${T!=="amount"?"selected":""}>${s(t("projects.form.paymentProgress.percent","٪ نسبة"))}</option>
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
  `}function Ke(e){const a=["commercial","coverage","photography","social"],n=a.map(o=>{const i=s(t(`projects.form.types.${o}`,o)),d=String(o)===String(e)?" selected":"";return`<option value="${o}"${d}>${i}</option>`});if(e&&!a.includes(e)){const o=s(ye(e));n.push(`<option value="${s(String(e))}" selected>${o}</option>`)}return`<option value="">${s(t("projects.form.placeholders.type","اختر نوع المشروع"))}</option>${n.join("")}`}function Qe(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="text-muted small" data-empty>${s(t("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const a=s(t("actions.remove","إزالة"));return e.map(n=>{const r=s(n?.label||""),o=s(f(n?.amount||0)),i=s(String((n?.note??n?.notes)||"")),d=s(String(n?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${r}</div>
            <div class="text-muted small">${o}${i?" • "+i:""}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${d}" aria-label="${a}">✖</button>
        </div>
      `}).join("")}function xe(e){if(!e)return{date:"",time:""};let a=e;a.includes(" ")&&(a=a.replace(" ","T"));const[n="",r=""]=a.split("T"),o=r.match(/(\d{1,2}:\d{2})/);return{date:n?n.slice(0,10):"",time:o?o[0]:""}}function ct(e,a){if(!e)return"";const n=a&&/\d{1,2}:\d{2}/.test(a)?a:"00:00",[r="00",o="00"]=n.split(":"),i=r.padStart(2,"0"),d=o.padStart(2,"0");return`${e}T${i}:${d}`}function Ze(e){if(!e)return null;const a=e.projectId??e.project_id??e.projectID??null;return a!=null?String(a):null}async function it(e,a){if(!e)return;const r=Se().filter(c=>{const l=Ze(c);return l&&l===String(e)});if(!r.length)return;const o=a==="paid",i=o?"paid":"unpaid";let d=!1;for(const c of r){const l=c?.id??c?.reservationId??c?.reservation_id;if(!l)continue;const y=c?.paid===!0||c?.paid==="paid",h=c?.paidStatus??c?.paymentStatus??(y?"paid":"unpaid");if(!(y===o&&h===i))try{await ze(l,{paid_status:i,paid:o}),d=!0}catch(u){console.error("❌ [projectFocusTemplates] Failed to sync reservation payment status",u)}}d&&document.dispatchEvent(new CustomEvent("reservations:changed"))}export{se as P,ot as a,nt as b,rt as c,ct as d,Qe as e,fe as f,be as g,Ze as h,Ne as r,it as s};
