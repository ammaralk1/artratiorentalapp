import{n as m,t,p as Ue}from"./auth.B4XUmSYg.js";import{c as We,e as s,d as Ce,t as Je,f as y}from"./state.DnWIUPO4.js";import{e as we,c as Xe,d as Ye,g as Pe,a as Ke,i as Ge,D as xe,u as Qe}from"./reservationsService.DZ-N01gk.js";import{f as Te}from"./view.Dbljb8vp.js";const Q=.15,Ze=2,Ne={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},et={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed"},tt={upcoming:"timeline-status-badge timeline-status-badge--upcoming",ongoing:"timeline-status-badge timeline-status-badge--ongoing",completed:"timeline-status-badge timeline-status-badge--completed",conflict:"timeline-status-badge timeline-status-badge--conflict",cancelled:"timeline-status-badge timeline-status-badge--cancelled"};function be(e){if(!e)return null;const n=[e?.id,e?.reservationId,e?.reservation_id,e?.reservationID].find(i=>i!=null&&i!=="");return n!=null?String(n):null}function st(e,a){if(!e)return{dateHtml:"—",timeText:""};const n=Te(e),i=a?Te(a):"",o=u=>{const b=String(u).split(" ").filter(Boolean),v=b.shift()||"",T=b.join(" ");return{date:v,time:T}},c=o(n),l=i?o(i):{date:"",time:""};let r="",d="";return l.date&&c.date===l.date?(r=`<div class="date-range"><div class="date-line">${c.date}</div></div>`,d=`من ${c.time||"—:—"} إلى ${l.time||"—:—"}`):(r=`<div class="date-range"><div class="date-line">${c.date}</div>`+(l.date?`<div class="date-line">${l.date}</div>`:"")+"</div>",d=`من ${c.time||"—:—"} إلى ${l.time||"—:—"}`),{dateHtml:r,timeText:d}}function ve(e=[]){const a=Pe();return e.map(n=>{const i=n?.reservation??n;if(!i||typeof i!="object")return null;let o=Number.isInteger(n?.index)&&n.index>=0?n.index:Number.isInteger(n?.reservationIndex)&&n.reservationIndex>=0?n.reservationIndex:null;if(!Number.isInteger(o)||o<0){const c=be(i);c&&(o=a.findIndex(l=>{const r=be(l);return r&&r===c}))}return{reservation:i,index:Number.isInteger(o)&&o>=0?o:-1}}).filter(Boolean)}function ge(e){return e?e.id!=null?String(e.id):e.projectId!=null?String(e.projectId):e.project_id!=null?String(e.project_id):null:null}function gt(e,{customer:a=null,techniciansMap:n=new Map,reservations:i=[]}={}){const c=ve(i).map(({reservation:$})=>$),l=c.length,r=ge(e),d=r?s(r):"",u=Ce(e),b=t(`projects.status.${u}`,Ne[u]),v=et[u]||"bg-secondary",T=ye(e)||{},_=Number(T.subtotal||0),x=(c||[]).reduce(($,g)=>$+oe(g),0),j=T.applyTax?Number(((_+x)*Q).toFixed(2)):0,f=Number((_+x+j).toFixed(2)),N=Array.isArray(e?.paymentHistory)?e.paymentHistory:Array.isArray(e?.payments)?e.payments:[],F=Xe({totalAmount:f,paidAmount:N.length?0:e.paidAmount,paidPercent:N.length?0:e.paidPercent,history:N}),S=Ye({manualStatus:null,paidAmount:F.paidAmount,paidPercent:F.paidPercent,totalAmount:f}),L=t(`projects.paymentStatus.${S}`,S==="paid"?"Paid":S==="partial"?"Partially Paid":"Unpaid"),A=S==="paid"?"status-paid":S==="partial"?"status-partial":"status-unpaid",E=[S==="paid"?"project-focus-card--paid":"project-focus-card--unpaid"],q=e?.confirmed===!0||e?.confirmed==="true";q&&E.push("project-focus-card--confirmed");const B=e?.projectCode||(r?`PRJ-${m(r)}`:""),I=B?m(String(B).replace(/^#/,"")):"",J=I?`<span class="project-code-badge project-focus-card__code">#${s(I)}</span>`:"",V=he(e?.type),z="",Z=`<span class="${v}">${s(b)}</span>`,ie=`<span class="reservation-chip ${A} project-focus-card__payment-chip">${s(L)}</span>`,ce=(e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"),ee=(e?.description||"").trim(),le=ee?s(Je(ee,110)):s(t("projects.fallback.noDescription","No description")),h=Array.isArray(e?.technicians)?e.technicians:[],te=h.map($=>n.get(String($))?.name).filter(Boolean);te.length&&nt(te);const se=a?.customerName||e?.clientName||"";(e?.clientCompany||a?.companyName||"").trim();const p=c.reduce(($,g)=>{const G=oe(g),je=Array.isArray(g?.items)?g.items:[],Me=je.reduce((ze,Oe)=>ze+(Number(Oe?.qty)||0),0),Be=Array.isArray(g?.technicians)?g.technicians.length:0,$e=Array.isArray(g?.crewAssignments)?g.crewAssignments:[],M=$e.length?$e:Array.isArray(g?.technicians)?g.technicians:[],me=we({items:je,technicianIds:Array.isArray(M)&&!M.length?M:[],crewAssignments:Array.isArray(M)&&M.length&&typeof M[0]=="object"?M:[],discount:g?.discount??0,discountType:g?.discountType||"percent",applyTax:!1,start:g?.start,end:g?.end,companySharePercent:null});return{total:$.total+G,equipment:$.equipment+Number(me.equipmentTotal||0),crew:$.crew+Number(me.crewTotal||0),crewCost:$.crewCost+Number(me.crewCostTotal||0),equipmentCountTotal:($.equipmentCountTotal||0)+Me,crewCountTotal:($.crewCountTotal||0)+Be}},{total:0,equipment:0,crew:0,crewCost:0,equipmentCountTotal:0,crewCountTotal:0}),C=Number(p.total.toFixed(2)),w=p.equipmentCountTotal||0,X=p.crewCountTotal||h.length,de=ye(e),P=Number(e?.servicesClientPrice??0),O=Number((p.equipment+p.crew+P).toFixed(2)),Y=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let R=(e?.discountType==="amount"?"amount":"percent")==="amount"?Y:O*(Y/100);(!Number.isFinite(R)||R<0)&&(R=0),R>O&&(R=O);const K=Math.max(0,O-R),U=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",D=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,H=U&&D>0?D:0,ne=Number((K*(H/100)).toFixed(2)),pe=de.applyTax?Number(((K+ne)*Q).toFixed(2)):0,W=Number((K+ne+pe).toFixed(2)),{dateHtml:ue,timeText:k}=st(e?.start,e?.end),Re=[I?{icon:"🆔",label:t("projectCards.meta.code","رقم المشروع"),value:`#${I}`}:null,se?{icon:"👤",label:t("projectCards.meta.client","العميل"),value:se}:null,V?{icon:"🏷️",label:t("projects.details.type","نوع المشروع"),value:`<span class="project-type-chip project-type-chip--${e.type||"default"}">${s(V)}</span>`}:null,{icon:"📅",label:t("projects.focus.summary.range","الفترة الزمنية"),value:ue},k?{icon:"⏰",label:t("projects.focus.summary.time","الوقت"),value:k}:null].filter(Boolean);t("projectCards.stats.reservationsShort","الحجوزات"),m(String(l)),t("projectCards.stats.equipmentCount","عدد المعدات"),m(String(w)),t("projectCards.stats.crewCount","عدد أفراد الطاقم"),m(String(X)),t("projectCards.stats.reservationValue","إجمالي الحجوزات"),y(C);const Fe=H>0&&de.applyTax?` ${t("projects.details.chips.vatOn","(شامل الضريبة)")}`:"",Ie=`${t("projects.details.summary.finalTotal","المجموع النهائي")}${Fe}`,De=[{icon:"💼",label:t("projectCards.stats.servicesClientPrice","الخدمات الإنتاجية"),value:y(P)},{icon:"💵",label:Ie,value:y(W)}].map(({icon:$,label:g,value:G})=>fe($,g,G)).join(""),ke=[{icon:"🔗",label:t("projectCards.stats.reservationsShort","الحجوزات"),value:m(String(l))},{icon:"📦",label:t("projectCards.stats.equipmentCount","عدد المعدات"),value:m(String(w))},{icon:"😎",label:t("projectCards.stats.crewCount","عدد الطاقم"),value:m(String(X))},{icon:"💵",label:t("projectCards.stats.reservationValue","إجمالي الحجوزات"),value:y(C)}].map(({icon:$,label:g,value:G})=>fe($,g,G)).join(""),Le=[at("projects.focus.summary.project","ملخص المشروع",Re),Se("projects.focus.summary.reservations","الحجوزات المرتبطة",ke),Se("projects.focus.summary.payment","الملخص المالي",De)].filter(Boolean).join(""),Ee=t("projects.focus.confirmed","✅ مشروع مؤكد"),qe=t("projects.focus.pending","⌛ بانتظار التأكيد"),Ve=`<div class="project-focus-card__actions"><span class="reservation-chip ${q?"status-confirmed":"status-pending"} project-focus-card__confirm-indicator">${s(q?Ee:qe)}</span></div>`,He=[J,z,Z,ie].filter(Boolean).join(`
          `);return`
    <div class="project-card-grid__item">
      <article class="${["project-focus-card",...E].join(" ")}" data-project-id="${d}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${He}
        </div>
        <h6 class="project-focus-card__title">${s(ce)}</h6>
        <p class="project-focus-card__description">${le}</p>
        <div class="project-focus-card__sections">
          ${Le}
        </div>
        ${Ve}
      </article>
    </div>
  `}function fe(e,a,n){const i=e?`<span class="project-focus-card__row-icon">${s(e)}</span>`:"",o=String(n??""),r=o.trim().startsWith("<")?o:s(o);return`
    <div class="project-focus-card__row">
      <span class="project-focus-card__row-label">${i}${s(a)}</span>
      <span class="project-focus-card__row-value">${r}</span>
    </div>
  `}function at(e,a,n=[]){if(!n.length)return"";const i=n.map(({icon:o,label:c,value:l})=>fe(o,c,l)).join("");return`
    <div class="project-focus-card__section">
      <span class="project-focus-card__section-title">${s(t(e,a))}</span>
      <div class="project-focus-card__section-box">
        ${i}
      </div>
    </div>
  `}function Se(e,a,n){return n?`
    <div class="project-focus-card__section">
      <span class="project-focus-card__section-title">${s(t(e,a))}</span>
      <div class="project-focus-card__section-box">
        ${n}
      </div>
    </div>
  `:""}function nt(e=[]){if(!e.length)return"";const a=e.slice(0,Ze),n=e.length-a.length,i=Ue()==="ar"?"، ":", ";let o=a.join(i);return n>0&&(o+=`${i}+${m(String(n))}`),o}function ht(e,{customer:a=null,reservations:n=[]}={}){const i=ve(n),o=i.map(({reservation:p})=>p),c=ye(e),l=o.reduce((p,C)=>p+oe(C),0),r=Number(l.toFixed(2)),d=o.length,u=c.applyTax?Number(((c.subtotal+r)*Q).toFixed(2)):0,b=Number((c.subtotal+r+u).toFixed(2)),v=Ce(e),T=t(`projects.status.${v}`,Ne[v]),_=tt[v]||"status-confirmed",x=ge(e)||"",j=e?.projectCode||(x?`PRJ-${m(x)}`:""),f=j?m(String(j).replace(/^#/,"")):"",N=f?`<span class="project-code-badge">#${s(f)}</span>`:"",F=c.applyTax,S=F?t("projects.details.chips.vatOn","شامل الضريبة 15٪"):t("projects.details.chips.vatOff","غير شامل الضريبة"),L=F?"status-paid":"status-unpaid",A=e?.paymentStatus==="paid"?"paid":"unpaid",E=t(`projects.paymentStatus.${A}`,A==="paid"?"Paid":"Unpaid"),q=A==="paid"?"status-paid":"status-unpaid",I=t("projects.details.chips.reservations","{count} حجوزات").replace("{count}",m(String(d))),J=e?.confirmed===!0||e?.confirmed==="true"?`<span class="reservation-chip status-confirmed">${s(t("projects.focus.confirmed","✅ مشروع مؤكد"))}</span>`:"",V=a?.customerName||e?.clientName||"",z=(e?.clientCompany||a?.companyName||"").trim(),ie=(e?.description||"").trim()||t("projects.fallback.noDescription","لا يوجد وصف"),ce=[f?{icon:"🆔",label:t("projects.details.labels.code","رقم المشروع"),value:`#${f}`}:null,V?{icon:"👤",label:t("projects.details.client","العميل"),value:V}:null,z?{icon:"🏢",label:t("projects.details.company","شركة العميل"),value:z}:null,{icon:"🏷️",label:t("projects.details.type","نوع المشروع"),value:he(e?.type)},{icon:"🗓️",label:t("projects.details.labels.start","تاريخ البداية"),value:re(e?.start)},{icon:"🗓️",label:t("projects.details.labels.end","تاريخ النهاية"),value:e?.end?re(e.end):"—"},{icon:"🔗",label:t("projects.details.labels.reservationsCount","عدد الحجوزات"),value:m(String(d))}].filter(Boolean),ee=t("projects.details.expenses","المصروفات ({amount})").replace("{amount}",y(c.expensesTotal)),le=c.expensesTotal>0?`<ul class="project-details-list">${(e?.expenses||[]).map(p=>`
          <li>
            <span class="project-expense-label">${s(p.label??"")}</span>
            <span class="project-expense-amount">${y(p.amount)}</span>
            ${p?.note??p?.notes?`<div class="text-muted small">${s(String(p.note??p.notes))}</div>`:""}
          </li>
        `).join("")}</ul>`:`<div class="text-muted">${s(t("projects.details.noItems","لا يوجد"))}</div>`;let h=[];if(h.push({icon:"💳",label:t("projects.details.summary.paymentStatus","حالة الدفع"),value:E}),d>0){const p=o.reduce((W,ue)=>{const k=typeof computeReservationFinancials=="function"?computeReservationFinancials(ue):null;return k&&typeof k=="object"&&(W.equipment+=Number(k.equipmentTotal||0),W.crew+=Number(k.crewTotal||0),W.crewCost+=Number(k.crewCostTotal||0)),W},{equipment:0,crew:0,crewCost:0}),C=Number(c.expensesTotal||0),w=Number((p.equipment+p.crew).toFixed(2)),X=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let P=(e?.discountType==="amount"?"amount":"percent")==="amount"?X:w*(X/100);(!Number.isFinite(P)||P<0)&&(P=0),P>w&&(P=w);const O=e?.applyTax===!0||e?.applyTax==="true",Y=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",ae=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,R=O||Y&&ae>0,K=Y&&R&&ae>0?ae:0,U=Math.max(0,w-P),D=Number((U*(K/100)).toFixed(2)),H=R?Number(((U+D)*Q).toFixed(2)):0,ne=Number((U-D-H-C-p.crewCost).toFixed(2)),pe=Number((U+D+H).toFixed(2));p.equipment>0&&h.push({icon:"🎛️",label:t("projects.details.summary.equipmentTotal","إجمالي المعدات"),value:y(p.equipment)}),p.crew>0&&h.push({icon:"😎",label:t("projects.details.summary.crewTotal","إجمالي الفريق"),value:y(p.crew)}),p.crewCost>0&&h.push({icon:"🧾",label:t("projects.details.summary.crewCostTotal","تكلفة الفريق"),value:y(p.crewCost)}),C>0&&h.push({icon:"🧾",label:t("projects.details.summary.expensesTotal","تكلفة الخدمات الإنتاجية"),value:y(C)}),h.push({icon:"🧮",label:t("projects.details.summary.gross","الإجمالي"),value:y(w)}),P>0&&h.push({icon:"🏷️",label:t("projects.details.summary.discount","الخصم"),value:`−${y(P)}`}),D>0&&h.push({icon:"🏦",label:t("projects.details.summary.companyShare","نسبة الشركة"),value:`−${y(D)}`}),H>0&&h.push({icon:"💸",label:t("projects.details.summary.tax","الضريبة (15٪)"),value:`−${y(H)}`}),h.push({icon:"💵",label:t("projects.details.summary.netProfit","صافي الربح"),value:y(ne)}),h.push({icon:"💰",label:t("projects.details.summary.finalTotal","المجموع النهائي"),value:y(pe)})}else h.push({icon:"💼",label:t("projects.details.summary.projectSubtotal","إجمالي المشروع"),value:y(c.subtotal)}),h.push({icon:"🧮",label:t("projects.details.summary.combinedTax","إجمالي الضريبة الكلية (15٪)"),value:y(u)}),h.push({icon:"💰",label:t("projects.details.summary.overallTotal","الإجمالي الكلي"),value:y(b)});const te=h.map(({icon:p,label:C,value:w})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${s(p)} ${s(C)}</span>
      <span class="summary-details-value">${s(w)}</span>
    </div>
  `).join(""),se=ot({project:e,reservations:i});return`
    <div class="project-details-header mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h5 class="mb-2 d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted project-details-title-label">${s(t("projects.details.labels.projectTitle","اسم المشروع"))}:</span>
            <span class="fw-bold project-details-title-text">${s((e?.title||"").trim()||t("projects.fallback.untitled","Untitled project"))}</span>
            ${N}
          </h5>
        </div>
        <div class="status-chips d-flex flex-wrap gap-2">
          <span class="status-chip ${_}">${s(T)}</span>
          <span class="status-chip ${L}">${s(S)}</span>
          <span class="reservation-chip ${q}">${s(E)}</span>
          <span class="reservation-chip status-confirmed">${s(I)}</span>
          ${J}
        </div>
      </div>
    </div>
    <div class="project-details-info mb-4">
      ${ce.map(({icon:p,label:C,value:w})=>Ae(p,C,w)).join("")}
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(t("projects.details.labels.notes","ملاحظات المشروع"))}</h6>
      <div class="project-notes">${s(ie)}</div>
    </div>
    <div class="project-details-section mb-4">
      <h6>${s(ee)}</h6>
      ${le}
    </div>
    <div class="project-details-summary summary-details mb-4">
      ${te}
    </div>
    ${se}
  `}function ot({reservations:e=[],project:a=null}={}){const i=[...ve(e)].sort((r,d)=>{const u=r?.reservation?.start?new Date(r.reservation.start).getTime():0;return(d?.reservation?.start?new Date(d.reservation.start).getTime():0)-u}),o=t("projects.details.reservations.title","الحجوزات المرتبطة"),c=t("projects.details.reservations.empty","لا توجد حجوزات مرتبطة بهذا المشروع بعد."),l=i.length?`<div class="project-reservations-list">${i.map(({reservation:r,index:d})=>rt(r,d,a)).join("")}</div>`:`<div class="alert alert-info project-reservations-empty mb-0">${s(c)}</div>`;return`
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex align-items-center gap-2 flex-wrap">
        <h6 class="mb-0">${s(o)}</h6>
      </div>
      ${l}
    </section>
  `}function rt(e,a=-1,n=null){const i=be(e)??"-",o=m(String(i)),c=it(e?.start,e?.end),l=oe(e),r=y(l),d=m(String((e?.items||[]).length)),u=m(String((e?.technicians||[]).length)),b=t("projects.details.reservations.itemsCount","{count} معدة").replace("{count}",d),v=t("projects.details.reservations.crewCount","{count} من الطاقم").replace("{count}",u),{effectiveConfirmed:T}=Ke(e,n),_=T?t("reservations.list.status.confirmed","✅ مؤكد"):t("reservations.list.status.pending","⏳ غير مؤكد"),x=T?"project-reservation-card__badge--confirmed":"project-reservation-card__badge--pending",j=e?.paid===!0||e?.paid==="paid",f=j?t("reservations.list.payment.paid","💳 مدفوع"):t("reservations.list.payment.unpaid","💳 غير مدفوع"),N=j?"project-reservation-card__badge--paid":"project-reservation-card__badge--unpaid",S=Ge(e)?`<span class="project-reservation-card__badge project-reservation-card__badge--completed">${s(t("reservations.list.status.completed","📁 منتهي"))}</span>`:"",L=Number.isInteger(a)&&a>=0?` data-index="${a}"`:"",A=`<button type="button" class="btn btn-sm btn-outline-primary" data-action="view-reservation" data-ignore-project-modal="true" data-reservation-id="${s(String(i??""))}"${L}>${s(t("projects.details.reservations.view","عرض الحجز"))}</button>`;return`
    <article class="project-reservation-card" data-reservation-id="${s(o)}">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${s(o)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${x}">${s(_)}</span>
          <span class="project-reservation-card__badge ${N}">${s(f)}</span>
          ${S}
        </div>
      </div>
      <div class="project-reservation-card__range">${s(c)}</div>
      <div class="project-reservation-card__meta">
        <span>📦 ${s(b)}</span>
        <span>😎 ${s(v)}</span>
      </div>
      <div class="project-reservation-card__footer">
        <span class="text-muted">${s(t("projectCards.stats.reservationValue","إجمالي الحجوزات"))}</span>
        <span class="fw-bold">${s(r)}</span>
        ${A}
      </div>
    </article>
  `}function Ae(e,a,n){return`
    <div class="res-info-row">
      <span class="label">${s(e)} ${s(a)}</span>
      <span class="separator">:</span>
      <span class="value">${s(n)}</span>
    </div>
  `}function ye(e){const a=Number(e?.equipmentEstimate)||0,n=We(e),i=a+n,o=e?.applyTax===!0||e?.applyTax==="true",c=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let r=(e?.discountType==="amount"?"amount":"percent")==="amount"?c:i*(c/100);(!Number.isFinite(r)||r<0)&&(r=0),r>i&&(r=i);const d=Math.max(0,i-r),u=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",b=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,v=o||u&&b>0,T=u&&v&&b>0?b:0,_=T>0?Number((d*(T/100)).toFixed(2)):0,x=d+_;let j=v?x*Q:0;(!Number.isFinite(j)||j<0)&&(j=0),j=Number(j.toFixed(2));let f=v?Number(e?.totalWithTax):x;return v?(!Number.isFinite(f)||f<=0)&&(f=Number((x+j).toFixed(2))):f=x,{equipmentEstimate:a,expensesTotal:n,baseSubtotal:i,discountAmount:r,subtotalAfterDiscount:d,companyShareAmount:_,subtotal:x,applyTax:v,taxAmount:j,totalWithTax:f}}function oe(e){if(!e)return 0;const a=Array.isArray(e?.items)?e.items:[],n=e?.discount??e?.discountValue??0,i=Number(m(String(n)))||0,o=e?.discountType??e?.discount_type??"percent",c=String(o).toLowerCase()==="amount"?"amount":"percent",l=Array.isArray(e?.crewAssignments)?e.crewAssignments:[],r=l.length?l:Array.isArray(e?.technicians)?e.technicians:[],d=we({items:a,technicianIds:Array.isArray(r)&&!r.length?r:[],crewAssignments:Array.isArray(r)&&r.length&&typeof r[0]=="object"?r:[],discount:i,discountType:c,applyTax:!1,start:e?.start,end:e?.end,companySharePercent:0,groupingSource:e});return Number.isFinite(Number(d?.finalTotal))?Number(d.finalTotal):0}function re(e){if(!e)return"—";const a=new Date(e);if(Number.isNaN(a.getTime()))return"—";const n=String(a.getDate()).padStart(2,"0"),i=String(a.getMonth()+1).padStart(2,"0"),o=String(a.getFullYear()),c=String(a.getMinutes()).padStart(2,"0"),l=a.getHours(),r=l>=12?"PM":"AM",d=l%12||12,u=String(d).padStart(2,"0"),b=`${n}/${i}/${o} ${u}:${c} ${r}`;return m(b)}function it(e,a){if(!e)return"—";const n=re(e);return a?`${n} - ${re(a)}`:n}function he(e){if(!e)return t("projects.form.types.unknown","نوع غير محدد");const n={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return t(n,e)}function jt(e,{clientName:a="",clientCompany:n=""}={}){const i=ge(e)||"",o=e?.projectCode||(i?`PRJ-${m(i)}`:""),c=o?m(String(o)):"",l=ct(e?.type),r=_e(e?.start||""),d=_e(e?.end||""),u=typeof e?.paymentStatus=="string"?e.paymentStatus.toLowerCase():"",b=["paid","partial"].includes(u)?u:"unpaid",v=e?.applyTax===!0||e?.applyTax==="true",T=e?.description||"",_=e?.discountType==="amount"?"amount":"percent",x=m(String(e?.discount??e?.discountValue??0)),j=e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??xe,f=Number.parseFloat(m(String(j))),N=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true"||v&&Number.isFinite(f)&&f>0,F=Number.isFinite(f)&&f>0?f:xe,S=e?.paymentProgressType==="amount"?"amount":e?.paymentProgressType==="percent"?"percent":e?.payment_progress_type==="amount"?"amount":(e?.payment_progress_type==="percent","percent"),L=m(String(e?.paymentProgressValue??e?.payment_progress_value??(S==="amount"?e?.paidAmount??e?.paid_amount:e?.paidPercent??e?.paid_percent)??"")),A=t("projects.details.labels.code","رقم المشروع"),E=t("projects.form.labels.client","العميل"),q=t("projects.form.labels.clientCompany","شركة العميل"),B=[c?{icon:"🆔",label:A,value:`#${c}`}:null,a?{icon:"👤",label:E,value:a}:null,n?{icon:"🏢",label:q,value:n}:null].filter(Boolean),I=B.length?`<div class="project-details-info mb-3">
        ${B.map(({icon:V,label:z,value:Z})=>Ae(V,z,Z)).join("")}
      </div>`:"",J=lt(Array.isArray(e?.expenses)?e.expenses:[]);return`
    <div class="project-details-edit">
      <div class="project-details-header mb-3">
        <h5 class="fw-bold mb-1">${s(t("projects.details.edit.heading","تعديل المشروع"))}</h5>
        <p class="text-muted small mb-0">${s(t("projects.details.edit.subheading","قم بتحديث بيانات المشروع ثم احفظ التغييرات."))}</p>
      </div>
      ${I}
      <form id="project-details-edit-form" class="project-details-edit-form">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label" for="project-edit-title">${s(t("projects.form.labels.title","اسم المشروع"))}</label>
            <input type="text" class="form-control" id="project-edit-title" name="project-title" value="${s(e?.title||"")}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-type">${s(t("projects.form.labels.type","نوع المشروع"))}</label>
            <select class="form-select" id="project-edit-type" name="project-type" required>
              ${l}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-date">${s(t("projects.form.labels.startDate","📅 تاريخ البداية"))}</label>
            <input type="date" class="form-control" id="project-edit-start-date" name="project-start-date" value="${s(r.date)}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-start-time">${s(t("projects.form.labels.startTime","⏰ وقت البداية"))}</label>
            <input type="time" class="form-control" id="project-edit-start-time" name="project-start-time" value="${s(r.time)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-date">${s(t("projects.form.labels.endDate","📅 تاريخ النهاية"))}</label>
            <input type="date" class="form-control" id="project-edit-end-date" name="project-end-date" value="${s(d.date)}">
          </div>
          <div class="col-md-6">
            <label class="form-label" for="project-edit-end-time">${s(t("projects.form.labels.endTime","⏰ وقت النهاية"))}</label>
            <input type="time" class="form-control" id="project-edit-end-time" name="project-end-time" value="${s(d.time)}">
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
            <label class="form-label mt-2" for="project-edit-expense-note">${s(t("projects.form.labels.expenseNote","ملاحظات"))}</label>
            <input type="text" class="form-control" id="project-edit-expense-note" placeholder="${s(t("projects.form.placeholders.expenseNote","تفاصيل إضافية"))}">
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-primary" data-action="add-expense">${s(t("projects.form.buttons.addExpense","➕ إضافة خدمة"))}</button>
          </div>
          <div class="col-12">
            <div id="project-edit-expense-list" class="project-edit-expense-list">
              ${J}
            </div>
          </div>
        </div>
        <div class="row g-3 align-items-start mt-3">
          <div class="col-md-4">
            <label class="form-label" for="project-edit-discount">${s(t("projects.form.labels.discount","الخصم"))}</label>
          <div class="input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select">
              <option value="percent" ${_==="percent"?"selected":""}>${s(t("projects.form.discount.percent","٪ نسبة"))}</option>
              <option value="amount" ${_==="amount"?"selected":""}>${s(t("projects.form.discount.amount","💵 مبلغ"))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control" value="${s(x)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label d-block" for="project-edit-company-share">${s(t("projects.form.labels.companyShare","نسبة الشركة والضريبة"))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${s(String(F))}" ${N?"checked":""}>
              <label class="form-check-label" for="project-edit-company-share">${s(t("projects.form.companyShareToggle","إضافة نسبة الشركة (10٪)"))}</label>
            </div>
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${v?"checked":""}>
              <label class="form-check-label" for="project-edit-tax">${s(t("projects.form.taxLabel","شامل الضريبة (15٪)"))}</label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label" for="project-edit-payment-status">${s(t("projects.form.labels.paymentStatus","حالة الدفع"))}</label>
          <select class="form-select" id="project-edit-payment-status" name="project-payment-status">
            <option value="unpaid" ${b==="unpaid"?"selected":""}>${s(t("projects.form.paymentStatus.unpaid","غير مدفوع"))}</option>
            <option value="partial" ${b==="partial"?"selected":""}>${s(t("projects.form.paymentStatus.partial","مدفوع جزئياً"))}</option>
            <option value="paid" ${b==="paid"?"selected":""}>${s(t("projects.form.paymentStatus.paid","مدفوع"))}</option>
          </select>
          <label class="form-label mt-2" for="project-edit-payment-progress-value">${s(t("projects.form.paymentProgress.label","💰 الدفعة المستلمة"))}</label>
          <div class="input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select">
              <option value="amount" ${S==="amount"?"selected":""}>${s(t("projects.form.paymentProgress.amount","💵 مبلغ"))}</option>
              <option value="percent" ${S!=="amount"?"selected":""}>${s(t("projects.form.paymentProgress.percent","٪ نسبة"))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control" value="${s(L)}" placeholder="0" inputmode="decimal">
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
  `}function ct(e){const a=["commercial","coverage","photography","social"],n=a.map(o=>{const c=s(t(`projects.form.types.${o}`,o)),l=String(o)===String(e)?" selected":"";return`<option value="${o}"${l}>${c}</option>`});if(e&&!a.includes(e)){const o=s(he(e));n.push(`<option value="${s(String(e))}" selected>${o}</option>`)}return`<option value="">${s(t("projects.form.placeholders.type","اختر نوع المشروع"))}</option>${n.join("")}`}function lt(e=[]){if(!Array.isArray(e)||e.length===0)return`<div class="text-muted small" data-empty>${s(t("projects.selected.emptyExpenses","لم يتم تسجيل أي مصروف"))}</div>`;const a=s(t("actions.remove","إزالة"));return e.map(n=>{const i=s(n?.label||""),o=s(y(n?.amount||0)),c=s(String((n?.note??n?.notes)||"")),l=s(String(n?.id||""));return`
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${i}</div>
            <div class="text-muted small">${o}${c?" • "+c:""}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${l}" aria-label="${a}">✖</button>
        </div>
      `}).join("")}function _e(e){if(!e)return{date:"",time:""};let a=e;a.includes(" ")&&(a=a.replace(" ","T"));const[n="",i=""]=a.split("T"),o=i.match(/(\d{1,2}:\d{2})/);return{date:n?n.slice(0,10):"",time:o?o[0]:""}}function $t(e,a){if(!e)return"";const n=a&&/\d{1,2}:\d{2}/.test(a)?a:"00:00",[i="00",o="00"]=n.split(":"),c=i.padStart(2,"0"),l=o.padStart(2,"0");return`${e}T${c}:${l}`}function dt(e){if(!e)return null;const a=e.projectId??e.project_id??e.projectID??null;return a!=null?String(a):null}async function xt(e,a){if(!e)return;const i=Pe().filter(r=>{const d=dt(r);return d&&d===String(e)});if(!i.length)return;const o=a==="paid",c=o?"paid":"unpaid";let l=!1;for(const r of i){const d=r?.id??r?.reservationId??r?.reservation_id;if(!d)continue;const u=r?.paid===!0||r?.paid==="paid",b=r?.paidStatus??r?.paymentStatus??(u?"paid":"unpaid");if(!(u===o&&b===c))try{await Qe(d,{paid_status:c,paid:o}),l=!0}catch(v){console.error("❌ [projectFocusTemplates] Failed to sync reservation payment status",v)}}l&&document.dispatchEvent(new CustomEvent("reservations:changed"))}export{Q as P,ht as a,gt as b,jt as c,$t as d,lt as e,oe as f,ge as g,dt as h,ye as r,xt as s};
