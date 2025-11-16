import{d as mt,v as fa,n as s,y as ut,t as a}from"./auth.3yXlKH4-.js";import{n as O,i as W,j as qt}from"./state.Dzk_x-65.js";import{a as va,z as _a,C as $a,F as A,E as g,b as Aa,d as Sa,c as Na,e as xa,L as It}from"./reservationsService.2yZn26uw.js";const Pa=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),wa=new Set(["maintenance","reserved","retired"]);function ka(e){const S=String(e??"").trim().toLowerCase();return S&&Pa.get(S)||"available"}function Fa(e){return e?typeof e=="object"?e:ga(e):null}function La(e){const S=Fa(e);return S?ka(S.status||S.state||S.statusLabel||S.status_label):"available"}function Ba(e){return!wa.has(La(e))}function Ca(e={}){return e.image||e.imageUrl||e.img||""}function za(e){if(!e)return null;const S=O(e),{equipment:K=[]}=mt();return(K||[]).find(B=>O(B?.barcode)===S)||null}function ga(e){const S=O(e);if(!S)return null;const{equipment:K=[]}=mt();return(K||[]).find(B=>O(B?.barcode)===S)||null}function N(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function pt(e){if(e==null)return"";const S=String(e).trim();return S?s(S):""}function Va(e,S,K=[],B,h=null){const{projectLinked:yt,effectiveConfirmed:bt}=va(e,h);e.paid===!0||e.paid;const Ht=_a(e),Z=e.items||[];let{groups:D}=$a(e);const Et=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(i=>i&&i.type==="package"))),Rt=t=>{const i=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return s(i)},ht=(t,i)=>{const l=b=>{const _=Array.isArray(b?.items)?b.items[0]:null,m=[_?.price,_?.unit_price,_?.unitPrice,b?.unitPrice,b?.totalPrice];for(const C of m){const r=g(C);if(Number.isFinite(r)&&r>0)return r}return 0},u=l(t),f=l(i);return u&&f?u<=f?t:i:u?t:i},q=[],U=new Map;D.forEach(t=>{if(!Et(t)){q.push(t);return}const i=Rt(t);if(!i){if(!U.has("__unknown__"))U.set("__unknown__",q.length),q.push(t);else{const l=U.get("__unknown__");q[l]=ht(q[l],t)}return}if(!U.has(i))U.set(i,q.length),q.push(t);else{const l=U.get(i);q[l]=ht(q[l],t)}}),D=q;const{technicians:ft=[]}=mt(),Mt=[].concat(Array.isArray(K)?K:[]).concat(Array.isArray(ft)?ft:[]),tt=new Map;Mt.forEach(t=>{if(!t||t.id==null)return;const i=String(t.id),l=tt.get(i)||{};tt.set(i,{...l,...t})});const Q=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,i)=>{const l=t?.technicianId!=null?tt.get(String(t.technicianId)):null;let u=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!u||u.trim()==="")&&(u=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const f=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let b=u,_=f;if(!b||b.trim()==="")try{const r=W?W():[];let n=null;if(t.positionId!=null&&(n=r.find(d=>String(d.id)===String(t.positionId))||null),!n){const d=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(d&&(n=typeof qt=="function"?qt(d):null,!n&&r.length)){const v=String(d).trim().toLowerCase();n=r.find(x=>[x.name,x.labelAr,x.labelEn].filter(Boolean).map(p=>String(p).toLowerCase()).includes(v))||null}}n&&(b=n.labelAr||n.labelEn||n.name||"",(!_||String(_).trim()==="")&&(n.labelAr&&n.labelEn?_=b===n.labelAr?n.labelEn:n.labelAr:_=n.labelAr||n.labelEn||""))}catch{}const m=A(g(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??l?.dailyWage??l?.wage??0)),C=A(g(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${i}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:b,positionLabelAlt:_,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:m,positionClientPrice:C,technicianId:t.technicianId!=null?String(t.technicianId):l?.id!=null?String(l.id):null,technicianName:t.technicianName??t.technician_name??l?.name??null,technicianRole:t.technicianRole??l?.role??null,technicianPhone:t.technicianPhone??l?.phone??null,notes:t.notes??null}}),Bt=fa(),k=Aa(e.start,e.end),zt=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,vt=g(zt),Vt=Number.isFinite(vt)?vt:0,jt=e.discountType??e.discount_type??e.discountMode??"percent",Kt=String(jt).toLowerCase()==="amount"?"amount":"percent",_t=!!(e.applyTax??e.apply_tax??e.taxApplied),$t=g(e.cost??e.total??e.finalTotal);Number.isFinite($t)&&A($t);const At=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,J=At!=null?g(At):Number.NaN,Ut=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(J)&&J>0)&&Number.isFinite(J)?J:0,T=Sa({items:Z,technicianIds:e.technicians||[],crewAssignments:Q,discount:Vt,discountType:Kt,applyTax:_t,start:e.start,end:e.end,companySharePercent:Ut,groupingSource:e}),et=A(T.equipmentTotal),St=A(T.crewTotal),Qt=A(T.crewCostTotal),at=A(T.discountAmount),Gt=A(T.subtotalAfterDiscount),it=Number.isFinite(T.companySharePercent)?T.companySharePercent:0;let nt=A(T.companyShareAmount);nt=it>0?A(Math.max(0,nt)):0;const st=A(T.taxAmount),E=A(T.finalTotal),Nt=A(T.netProfit),Wt=s(String(e.reservationId??e.id??"")),Ot=e.start?s(ut(e.start)):"-",Jt=e.end?s(ut(e.end)):"-",Xt=s(String(Q.length)),Yt=s(et.toFixed(2)),Zt=s(at.toFixed(2)),te=s(Gt.toFixed(2)),ee=s(st.toFixed(2)),ae=s((Number.isFinite(E)?E:0).toFixed(2)),ie=s(String(k)),$=a("reservations.create.summary.currency","SR"),ne=a("reservations.details.labels.discount","الخصم"),se=a("reservations.details.labels.tax","الضريبة (15%)"),oe=a("reservations.details.labels.crewTotal","إجمالي الفريق"),re=a("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),le=a("reservations.details.labels.duration","عدد الأيام"),ce=a("reservations.details.labels.companyShare","🏦 نسبة الشركة"),de=a("reservations.details.labels.netProfit","💵 صافي الربح"),ue=a("reservations.create.equipment.imageAlt","صورة"),V={item:a("reservations.equipment.table.item","المعدة"),quantity:a("reservations.equipment.table.quantity","الكمية"),unitPrice:a("reservations.equipment.table.unitPrice","سعر الوحدة"),total:a("reservations.equipment.table.total","الإجمالي"),actions:a("reservations.equipment.table.actions","الإجراءات")},pe=a("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),me=a("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");a("reservations.details.technicians.roleUnknown","غير محدد");const ye=a("reservations.details.technicians.phoneUnknown","غير متوفر");a("reservations.details.technicians.wage","{amount} {currency} / اليوم");const be=a("reservations.list.status.confirmed","✅ مؤكد"),he=a("reservations.list.status.pending","⏳ غير مؤكد"),fe=a("reservations.list.payment.paid","💳 مدفوع"),ve=a("reservations.list.payment.unpaid","💳 غير مدفوع"),_e=a("reservations.list.payment.partial","💳 مدفوع جزئياً"),$e=a("reservations.list.status.completed","📁 مغلق"),Ae=a("reservations.details.labels.id","🆔 رقم الحجز"),Se=a("reservations.details.section.bookingInfo","بيانات الحجز"),Ne=a("reservations.details.section.paymentSummary","ملخص الدفع"),xe=a("reservations.details.labels.finalTotal","المجموع النهائي"),Pe=a("reservations.details.section.crew","😎 الفريق الفني"),we=a("reservations.details.crew.count","{count} عضو"),ke=a("reservations.details.section.items","📦 المعدات المرتبطة"),Fe=a("reservations.details.items.count","{count} عنصر"),Le=a("reservations.details.actions.edit","✏️ تعديل"),Ce=a("reservations.details.actions.delete","🗑️ حذف"),ge=a("reservations.details.labels.customer","العميل"),Te=a("reservations.details.labels.contact","رقم التواصل"),De=a("reservations.details.labels.project","📁 المشروع المرتبط");a("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const qe=a("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Ie=a("reservations.details.actions.openProject","📁 فتح المشروع"),He=a("reservations.details.labels.start","بداية الحجز"),Ee=a("reservations.details.labels.end","نهاية الحجز"),Re=a("reservations.details.labels.notes","ملاحظات"),Me=a("reservations.list.noNotes","لا توجد ملاحظات"),Be=a("reservations.details.labels.itemsCount","عدد المعدات"),ze=a("reservations.details.labels.itemsTotal","إجمالي المعدات"),Ve=a("reservations.paymentHistory.title","سجل الدفعات"),je=a("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Ke=a("reservations.list.unknownCustomer","غير معروف"),xt=!yt||!h?[]:Array.isArray(h?.paymentHistory)?h.paymentHistory:Array.isArray(h?.payment_history)?h.payment_history:Array.isArray(h?.payments)?h.payments:Array.isArray(h?.paymentLogs)?h.paymentLogs:[],Ue=Array.isArray(e?.paymentHistory)?e.paymentHistory:Array.isArray(e?.payment_history)?e.payment_history:Array.isArray(e?.paymentLogs)?e.paymentLogs:[],ot=xt.length?xt:Ue,Qe=ot.length?0:Number(e.paidAmount??e.paid_amount)||0,Ge=ot.length?0:Number(e.paidPercent??e.paid_percentage)||0,Pt=Na({totalAmount:Number.isFinite(Number(E))?Number(E):0,paidAmount:Qe,paidPercent:Ge,history:ot}),X=xa({manualStatus:null,paidAmount:Pt.paidAmount,paidPercent:Pt.paidPercent,totalAmount:Number.isFinite(Number(E))?Number(E):0}),rt=X==="partial",wt=X==="paid"?fe:rt?_e:ve;function We(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const i=String(t).replace(/[^0-9.+-]/g,""),l=Number(i);return Number.isFinite(l)?l:Number.NaN}const lt=(t={})=>{const i=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(i)||Array.isArray(t.packageItems)&&t.packageItems.length)},Oe=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(i=>i!=null&&i!==""),Je=(t={})=>!t||typeof t!="object"?!1:!lt(t)&&Oe(t);let ct=Array.isArray(D)&&D.length?D.length:(Array.isArray(Z)?Z.filter(t=>t&&typeof t=="object"&&!Je(t)).length:0)||1;ct=Math.max(1,Math.round(ct));const Xe=s(String(ct)),kt=Fe.replace("{count}",Xe),Ye=we.replace("{count}",Xt),Ze=e.notes?s(e.notes):Me,ta=s(St.toFixed(2)),ea=s(Qt.toFixed(2)),aa=s(String(it)),ia=s(nt.toFixed(2)),na=`${aa}% (${ia} ${$})`,sa=Number.isFinite(Nt)?Math.max(0,Nt):0,oa=s(sa.toFixed(2)),R=[{icon:"💼",label:ze,value:`${Yt} ${$}`}];R.push({icon:"😎",label:oe,value:`${ta} ${$}`});const ra=a("reservations.details.labels.crewCost","تكلفة الفريق");R.push({icon:"💵",label:ra,value:`${ea} ${$}`}),at>0&&R.push({icon:"💸",label:ne,value:`${Zt} ${$}`}),R.push({icon:"📊",label:re,value:`${te} ${$}`}),_t&&st>0&&R.push({icon:"🧾",label:se,value:`${ee} ${$}`}),it>0&&R.push({icon:"🏦",label:ce,value:na}),R.push({icon:"💵",label:de,value:`${oa} ${$}`}),R.push({icon:"💰",label:xe,value:`${ae} ${$}`});const la=R.map(({icon:t,label:i,value:l})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${i}</span>
      <span class="summary-details-value">${l}</span>
    </div>
  `).join("");let Ft="";try{const i=new URL(window.location.href).searchParams.get("debugFinance");if(i==="1"||i==="true"){const l=r=>(r?.type||"").toLowerCase()==="package"&&String(r?.pricingMode||"").toLowerCase()==="fixed"?"fixed":"daily",u=r=>{if((r?.type||"").toLowerCase()==="package")return!1;const n=Array.isArray(r?.items)?r.items:[];if(!n.length)return!1;if(n.some(p=>p?.reservation_id!=null||p?.reservationId!=null))return!0;const v=n.every(p=>p?.unit_price!=null||p?.unitPrice!=null),x=n.some(p=>p?.daily_rate!=null||p?.dailyRate!=null||p?.unit_rate!=null||p?.unitRate!=null||p?.price!=null);return v&&!x};let f=0,b=0,_=0,m=0;const C=(Array.isArray(D)?D:[]).map((r,n)=>{const d=Number.isFinite(Number(r?.quantity))?Number(r.quantity):0,v=Number.isFinite(Number(r?.unitPrice))?Number(r.unitPrice):0,x=l(r);let p=x==="fixed"?d*v:d*v*k,F="";if((r?.type||"").toLowerCase()==="package")try{const w={package_code:r?.package_code||r?.packageDisplayCode||r?.barcode||r?.packageId||r?.key,packageItems:Array.isArray(r?.packageItems)?r.packageItems:void 0},z=Number(r?.unitPrice);let I;if(Number.isFinite(z)&&z>0)I=d*z;else{const o=It(w,{packageQuantity:d,days:k});I=Number.isFinite(Number(o.perDayTotal))?Number(o.perDayTotal):d*v}p=I*k,f+=I,b+=p;const Y=(pricing.lines||[]).map((o,y)=>`
              <tr>
                <td colspan="2"></td>
                <td>• ${N(String(o.desc||o.barcode||"item"))}</td>
                <td>${s(String(o.qtyPerPackage))} × ${s(String(d))} × ${s(String(k))}</td>
                <td>${s(String((o.unitPrice||0).toFixed?o.unitPrice.toFixed(2):o.unitPrice))}</td>
                <td>${s(String((o.perDayTotal*k).toFixed?(o.perDayTotal*k).toFixed(2):o.perDayTotal*k))}</td>
              </tr>`).join("");F=Y||""}catch{}else{const w=u(r),z=w?0:d*v,I=w?d*v:z*k;_+=z,m+=I}return`
          <tr>
            <td>${n+1}</td>
            <td>${N(String(r?.description||"-"))}</td>
            <td>${x}</td>
            <td>${s(String(d))}</td>
            <td>${s(String(v.toFixed?v.toFixed(2):v))}</td>
            <td>${s(String(p.toFixed?p.toFixed(2):p))}</td>
          </tr>${F}`}).join("");Ft=`
        <details class="reservation-finance-debug" style="margin-top:12px">
          <summary>Debug: تفصيل التسعير</summary>
          <div style="padding:8px 0; font-size: 12px">
            <div>الأيام: ${s(String(k))}</div>
            <div style="margin-top:6px"><strong>مجاميع سريعة:</strong></div>
            <div>من الحِزم (يومي): ${s(String(f.toFixed(2)))} ${$}</div>
            <div>من الحِزم (كامل المدة): ${s(String(b.toFixed(2)))} ${$}</div>
            <div>مفردة خارج الحِزم (يومي): ${s(String(_.toFixed(2)))} ${$}</div>
            <div>مفردة خارج الحِزم (كامل المدة): ${s(String(m.toFixed(2)))} ${$}</div>
            <div style="margin-top:4px">Equipment Total (breakdown): ${s(String(et.toFixed(2)))} ${$}</div>
            <table class="table table-xs" style="width:100%; margin-top:8px">
              <thead>
                <tr>
                  <th>#</th><th>الوصف</th><th>النوع</th><th>الكمية</th><th>سعر الوحدة</th><th>المساهمة</th>
                </tr>
              </thead>
              <tbody>${C}</tbody>
            </table>
          </div>
        </details>`,console.debug("[finance-debug] groups",D,{rentalDays:k,equipmentTotal:et,crewTotal:St,discountAmount:at,taxAmount:st})}}catch{}console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let L=[];yt&&h&&(Array.isArray(h.paymentHistory)?L=h.paymentHistory:Array.isArray(h.payment_history)?L=h.payment_history:Array.isArray(h.payments)?L=h.payments:Array.isArray(h.paymentLogs)&&(L=h.paymentLogs)),(!Array.isArray(L)||L.length===0)&&(Array.isArray(e.paymentHistory)?L=e.paymentHistory:Array.isArray(e.payment_history)?L=e.payment_history:Array.isArray(e.paymentLogs)?L=e.paymentLogs:L=[]);const Lt=Array.isArray(L)?L:[],ca=Lt.length?`<ul class="reservation-payment-history-list">${Lt.map(t=>{const i=typeof t?.type=="string"?t.type.toLowerCase():"",l=i==="amount"?a("reservations.paymentHistory.type.amount","دفعة مالية"):i==="percent"?a("reservations.paymentHistory.type.percent","دفعة نسبة"):a("reservations.paymentHistory.type.unknown","دفعة"),u=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?Number(t.percentage):Number.isFinite(Number(t?.value))&&i==="percent"?Number(t.value):null,f=u!=null&&Number.isFinite(Number(E))&&Number(E)>0?Math.round(Number(E)*(u/100)*100)/100:null,b=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?Number(t.amount):null,_=i==="percent"&&f!=null?f:b,m=_!=null?`${s(_.toFixed(2))} ${$}`:"—",C=u!=null?`${s(u.toFixed(2))}%`:"—",r=t?.recordedAt?s(ut(t.recordedAt)):"—",n=t?.note?`<div class="payment-history-note">${N(s(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${N(l)}</span>
              <span class="payment-history-entry__amount">${m}</span>
              <span class="payment-history-entry__percent">${C}</span>
              <span class="payment-history-entry__date">${r}</span>
            </div>
            ${n}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${N(je)}</div>`,Ct=String(e?.status||e?.reservationStatus||"").toLowerCase(),gt=Ct==="cancelled"||Ct==="canceled",Tt=gt?[{text:a("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:wt,className:X==="paid"?"status-paid":rt?"status-partial":"status-unpaid"}]:[{text:bt?be:he,className:bt?"status-confirmed":"status-pending"},{text:wt,className:X==="paid"?"status-paid":rt?"status-partial":"status-unpaid"}];Ht&&!gt&&Tt.push({text:$e,className:"status-completed"});const da=Tt.map(({text:t,className:i})=>`<span class="status-chip ${i}">${t}</span>`).join(""),j=(t,i,l)=>`
    <div class="res-info-row">
      <span class="label">${t} ${i}</span>
      <span class="value">${l}</span>
    </div>
  `;let dt="";if(e.projectId){let t=N(qe);if(h){const i=h.title||a("projects.fallback.untitled","مشروع بدون اسم");t=`${N(i)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${h.id}">${N(Ie)}</button>`}dt=`
      <div class="res-info-row">
        <span class="label">📁 ${De}</span>
        <span class="value">${t}</span>
      </div>
    `}const M=[];M.push(j("👤",ge,S?.customerName||e.customerName||Ke)),M.push(j("📞",Te,S?.phone||"—")),M.push(j("🗓️",He,Ot)),M.push(j("🗓️",Ee,Jt)),M.push(j("📦",Be,kt)),M.push(j("⏱️",le,ie)),M.push(j("📝",Re,Ze)),dt&&M.push(dt);const ua=M.join(""),pa=D.length?D.map(t=>{const i=t.items[0]||{},l=Ca(i)||t.image,u=l?`<img src="${l}" alt="${ue}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let f=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)f=[...t.packageItems];else{const o=[];t.items.forEach(y=>{Array.isArray(y?.packageItems)&&y.packageItems.length&&o.push(...y.packageItems)}),f=o}if(Array.isArray(f)&&f.length>1){const o=new Set;f=f.filter(y=>{const c=y?.normalizedBarcode&&String(y.normalizedBarcode).toLowerCase()||y?.barcode&&String(y.barcode).toLowerCase()||(y?.equipmentId!=null?`id:${y.equipmentId}`:null);return c?o.has(c)?!1:(o.add(c),!0):!0})}const b=lt(t)||t.items.some(o=>lt(o))||f.length>0,_=(o,{fallback:y=1,max:c=1e3}={})=>{const P=We(o);return Number.isFinite(P)&&P>0?Math.min(c,P):y};let m;if(b){const o=_(i?.qty??i?.quantity??i?.count,{fallback:NaN,max:999});Number.isFinite(o)&&o>0?m=o:m=_(t.quantity??t.count??1,{fallback:1,max:999})}else m=_(t.quantity??t.count??i?.qty??i?.quantity??i?.count??0,{fallback:1,max:9999});const C=s(String(m)),r=(o,{preferPositive:y=!1}={})=>{let c=Number.NaN;for(const P of o){const H=g(P);if(Number.isFinite(H)){if(y&&H>0)return H;Number.isFinite(c)||(c=H)}}return c};let n,d;if(b){const o=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(n=r(o,{preferPositive:!0}),!Number.isFinite(n)||n<0){const c=g(t.totalPrice??i?.total??i?.total_price);Number.isFinite(c)&&m>0&&(n=c/m)}Number.isFinite(n)||(n=0);const y=[i?.total,i?.total_price,t.totalPrice];if(d=r(y),!Number.isFinite(d))d=n*m;else{const c=n*m;Number.isFinite(c)&&c>0&&Math.abs(d-c)>c*.25&&(d=c)}}else{const o=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(n=r(o,{preferPositive:!0}),!Number.isFinite(n)||n<0){const y=g(t.totalPrice??i?.total??i?.total_price);Number.isFinite(y)&&m>0&&(n=y/m)}Number.isFinite(n)||(n=0),d=g(t.totalPrice??i?.total??i?.total_price),Number.isFinite(d)||(d=n*m)}n=A(n),d=A(d);const v=`${s(n.toFixed(2))} ${$}`;`${s(d.toFixed(2))}${$}`;const x=t.barcodes.map(o=>s(String(o||""))).filter(Boolean),p=x.length?`<details class="reservation-item-barcodes">
              <summary>${a("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${x.map(o=>`<li>${o}</li>`).join("")}
              </ul>
            </details>`:"";let F="";if(f.length){const o=new Map,y=c=>1;if(f.forEach(c=>{if(!c)return;const P=O(c.barcode||c.normalizedBarcode||c.desc||Math.random());if(!P)return;const H=o.get(P),G=y();if(H){H.qty=G,H.total=G;return}o.set(P,{desc:c.desc||c.barcode||a("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(G,99)),total:Math.max(1,Math.min(G,99)),barcode:c.barcode??c.normalizedBarcode??""})}),o.size){const c=Array.from(o.values()).map(P=>{const H=s(String(P.qty>0?Math.min(P.qty,99):1)),G=N(P.desc||""),ha=P.barcode?` <span class="reservation-package-items__barcode">(${N(s(String(P.barcode)))})</span>`:"";return`<li>${G}${ha} × ${H}</li>`}).join("");F=`
              <details class="reservation-package-items">
                <summary>${a("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${c}
                </ul>
              </details>
            `}}const w=b?`${F||""}${p||""}`:p,z=s(String(k));let I;if(b){let o=n;if(!Number.isFinite(o)||o<=0){const y={package_code:t?.package_code||t?.packageDisplayCode||t?.barcode||t?.packageId||t?.key,packageItems:Array.isArray(t?.packageItems)?t.packageItems:void 0};try{const c=It(y,{packageQuantity:Number.isFinite(m)?m:1,days:1});Number.isFinite(Number(c.perDayTotal))&&(o=Number(c.perDayTotal))}catch{}}I=A(o*k)}else I=A(n*m*k);const Y=`${s(I.toFixed(2))} ${$}`;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${u}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${N(i.desc||i.description||i.name||t.description||"-")}</div>
                  ${w}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${N(V.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${C}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${N(a("reservations.details.table.headers.days","الأيام"))}">${z}</td>
            <td class="reservation-modal-items-table__cell" data-label="${N(V.unitPrice)}">${v}</td>
            <td class="reservation-modal-items-table__cell" data-label="${N(V.total)}">${Y}</td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${pe}</td></tr>`,ma=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${V.item}</th>
            <th>${V.quantity}</th>
            <th>${a("reservations.details.table.headers.days","الأيام")}</th>
            <th>${V.unitPrice}</th>
            <th>${V.total}</th>
          </tr>
        </thead>
        <tbody>${pa}</tbody>
      </table>
    </div>
  `,Dt=Q.map((t,i)=>{const l=s(String(i+1));let u=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!u||u.trim()==="")&&(u=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!u||u.trim()==="")try{const v=typeof W=="function"?W():[],x=t.positionId?v.find(w=>String(w.id)===String(t.positionId)):null,p=!x&&t.positionKey?v.find(w=>String(w.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,F=x||p||null;F&&(u=F.labelAr||F.labelEn||F.name||u)}catch{}const f=pt(u)||a("reservations.crew.positionFallback","منصب بدون اسم"),b=pt(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),_=pt(t.technicianName)||a("technicians.picker.noTechnicianOption","— بدون تعيين —"),m=t.technicianPhone||ye,C=A(g(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0));let r=A(g(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0));if(!Number.isFinite(r)||r<=0)try{const v=W?W():[],x=t.positionId?v.find(w=>String(w.id)===String(t.positionId)):null,p=!x&&t.positionKey?v.find(w=>String(w.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,F=x||p||null;F&&Number.isFinite(Number(F.clientPrice))&&(r=A(Number(F.clientPrice)))}catch{}const n=`${s(r.toFixed(2))} ${$}`,d=C>0?`${s(C.toFixed(2))} ${$}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${l}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${_}</span>
            <small class="text-muted">🏷️ ${f}${b?` — ${b}`:""}</small>
            <small class="text-muted">💼 ${n}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${m}</div>
          ${d?`<div>💵 ${a("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${d}</div>`:""}
        </div>
      </div>
    `}).join(""),ya=Array.isArray(Q)&&Q.length>4,ba=Q.length?ya?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${N(a("reservations.details.slider.prev","السابق"))}" title="${N(a("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Dt}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${N(a("reservations.details.slider.next","التالي"))}" title="${N(a("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Dt}</div>`:`<ul class="reservation-modal-technicians"><li>${me}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Ae}</span>
          <strong>${Wt}</strong>
        </div>
        <div class="status-chips">
          ${da}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Se}</h6>
          ${ua}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Ne}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${la}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Ve}</h6>
              ${ca}
            </div>
            ${Ft}
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Pe}</span>
          <span class="count">${Ye}</span>
        </div>
        ${ba}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${ke}</span>
          <span class="count">${kt}</span>
        </div>
        ${ma}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${B}">
          ${a("reservations.details.actions.exportPdf","عرض سعر")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-checklist-btn" data-index="${B}">
          ${a("reservations.details.actions.exportChecklist","📋 لستة معدات وفنيين")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${B}">${Le}</button>
        ${Bt?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${B}">${Ce}</button>`:""}
      </div>
    </div>
  `}export{za as a,Va as b,ga as f,La as g,Ba as i,Ca as r};
