import{d as ut,w as ma,n as s,v as ct,t as a}from"./auth.BFR8Y3ym.js";import{n as G,I as Q,J as gt}from"./state.uepyuVVl.js";import{a as ya,i as ba,A as ha,y as x,z as F,b as va,f as fa,J as _a}from"./reservationsService.BV-Ogqe7.js";const $a=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Aa=new Set(["maintenance","reserved","retired"]);function Sa(e){const _=String(e??"").trim().toLowerCase();return _&&$a.get(_)||"available"}function xa(e){return e?typeof e=="object"?e:Na(e):null}function Pa(e){const _=xa(e);return _?Sa(_.status||_.state||_.statusLabel||_.status_label):"available"}function ga(e){return!Aa.has(Pa(e))}function wa(e={}){return e.image||e.imageUrl||e.img||""}function qa(e){if(!e)return null;const _=G(e),{equipment:j=[]}=ut();return(j||[]).find(B=>G(B?.barcode)===_)||null}function Na(e){const _=G(e);if(!_)return null;const{equipment:j=[]}=ut();return(j||[]).find(B=>G(B?.barcode)===_)||null}function A(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function dt(e){if(e==null)return"";const _=String(e).trim();return _?s(_):""}function Ia(e,_,j=[],B,N=null){const{projectLinked:W,effectiveConfirmed:pt}=ya(e,N),qt=e.paid===!0||e.paid==="paid",It=ba(e),X=e.items||[];let{groups:D}=ha(e);const Et=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(i=>i&&i.type==="package"))),Rt=t=>{const i=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return s(i)},mt=(t,i)=>{const l=y=>{const S=Array.isArray(y?.items)?y.items[0]:null,f=[S?.price,S?.unit_price,S?.unitPrice,y?.unitPrice,y?.totalPrice];for(const q of f){const r=F(q);if(Number.isFinite(r)&&r>0)return r}return 0},m=l(t),v=l(i);return m&&v?m<=v?t:i:m?t:i},g=[],V=new Map;D.forEach(t=>{if(!Et(t)){g.push(t);return}const i=Rt(t);if(!i){if(!V.has("__unknown__"))V.set("__unknown__",g.length),g.push(t);else{const l=V.get("__unknown__");g[l]=mt(g[l],t)}return}if(!V.has(i))V.set(i,g.length),g.push(t);else{const l=V.get(i);g[l]=mt(g[l],t)}}),D=g;const{technicians:yt=[]}=ut(),Ht=[].concat(Array.isArray(j)?j:[]).concat(Array.isArray(yt)?yt:[]),Y=new Map;Ht.forEach(t=>{if(!t||t.id==null)return;const i=String(t.id),l=Y.get(i)||{};Y.set(i,{...l,...t})});const K=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,i)=>{const l=t?.technicianId!=null?Y.get(String(t.technicianId)):null;let m=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!m||m.trim()==="")&&(m=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const v=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let y=m,S=v;if(!y||y.trim()==="")try{const r=Q?Q():[];let o=null;if(t.positionId!=null&&(o=r.find(d=>String(d.id)===String(t.positionId))||null),!o){const d=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(d&&(o=typeof gt=="function"?gt(d):null,!o&&r.length)){const b=String(d).trim().toLowerCase();o=r.find(P=>[P.name,P.labelAr,P.labelEn].filter(Boolean).map(u=>String(u).toLowerCase()).includes(b))||null}}o&&(y=o.labelAr||o.labelEn||o.name||"",(!S||String(S).trim()==="")&&(o.labelAr&&o.labelEn?S=y===o.labelAr?o.labelEn:o.labelAr:S=o.labelAr||o.labelEn||""))}catch{}const f=x(F(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??l?.dailyWage??l?.wage??0)),q=x(F(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${i}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:y,positionLabelAlt:S,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:f,positionClientPrice:q,technicianId:t.technicianId!=null?String(t.technicianId):l?.id!=null?String(l.id):null,technicianName:t.technicianName??t.technician_name??l?.name??null,technicianRole:t.technicianRole??l?.role??null,technicianPhone:t.technicianPhone??l?.phone??null,notes:t.notes??null}}),Mt=ma(),C=va(e.start,e.end),Bt=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,bt=F(Bt),zt=Number.isFinite(bt)?bt:0,jt=e.discountType??e.discount_type??e.discountMode??"percent",Vt=String(jt).toLowerCase()==="amount"?"amount":"percent",ht=W?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),vt=F(e.cost??e.total??e.finalTotal),ft=Number.isFinite(vt),Kt=ft?x(vt):0,_t=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,J=_t!=null?F(_t):Number.NaN,Ut=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(J)&&J>0)&&Number.isFinite(J)?J:0,T=fa({items:X,technicianIds:e.technicians||[],crewAssignments:K,discount:zt,discountType:Vt,applyTax:ht,start:e.start,end:e.end,companySharePercent:Ut,groupingSource:e}),Z=x(T.equipmentTotal),$t=x(T.crewTotal),Qt=x(T.crewCostTotal),tt=x(T.discountAmount),Gt=x(T.subtotalAfterDiscount),et=Number.isFinite(T.companySharePercent)?T.companySharePercent:0;let at=x(T.companyShareAmount);at=et>0?x(Math.max(0,at)):0;const it=x(T.taxAmount),At=x(T.finalTotal),St=W?At:ft?Kt:At,xt=x(T.netProfit),Wt=s(String(e.reservationId??e.id??"")),Jt=e.start?s(ct(e.start)):"-",Ot=e.end?s(ct(e.end)):"-",Xt=s(String(K.length)),Yt=s(Z.toFixed(2)),Zt=s(tt.toFixed(2)),te=s(Gt.toFixed(2)),ee=s(it.toFixed(2)),ae=s((Number.isFinite(St)?St:0).toFixed(2)),ie=s(String(C)),$=a("reservations.create.summary.currency","SR"),ne=a("reservations.details.labels.discount","الخصم"),se=a("reservations.details.labels.tax","الضريبة (15%)"),oe=a("reservations.details.labels.crewTotal","إجمالي الفريق"),re=a("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),le=a("reservations.details.labels.duration","عدد الأيام"),ce=a("reservations.details.labels.companyShare","🏦 نسبة الشركة"),de=a("reservations.details.labels.netProfit","💵 صافي الربح"),ue=a("reservations.create.equipment.imageAlt","صورة"),E={item:a("reservations.equipment.table.item","المعدة"),quantity:a("reservations.equipment.table.quantity","الكمية"),unitPrice:a("reservations.equipment.table.unitPrice","سعر الوحدة"),total:a("reservations.equipment.table.total","الإجمالي"),actions:a("reservations.equipment.table.actions","الإجراءات")},pe=a("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),me=a("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");a("reservations.details.technicians.roleUnknown","غير محدد");const ye=a("reservations.details.technicians.phoneUnknown","غير متوفر");a("reservations.details.technicians.wage","{amount} {currency} / اليوم");const be=a("reservations.list.status.confirmed","✅ مؤكد"),he=a("reservations.list.status.pending","⏳ غير مؤكد"),ve=a("reservations.list.payment.paid","💳 مدفوع"),fe=a("reservations.list.payment.unpaid","💳 غير مدفوع"),_e=a("reservations.list.payment.partial","💳 مدفوع جزئياً"),$e=a("reservations.list.status.completed","📁 منتهي"),Ae=a("reservations.details.labels.id","🆔 رقم الحجز"),Se=a("reservations.details.section.bookingInfo","بيانات الحجز"),xe=a("reservations.details.section.paymentSummary","ملخص الدفع"),Pe=a("reservations.details.labels.finalTotal","المجموع النهائي"),we=a("reservations.details.section.crew","😎 الفريق الفني"),Ne=a("reservations.details.crew.count","{count} عضو"),Le=a("reservations.details.section.items","📦 المعدات المرتبطة"),ke=a("reservations.details.items.count","{count} عنصر"),Fe=a("reservations.details.actions.edit","✏️ تعديل"),Ce=a("reservations.details.actions.delete","🗑️ حذف"),Te=a("reservations.details.labels.customer","العميل"),De=a("reservations.details.labels.contact","رقم التواصل"),ge=a("reservations.details.labels.project","📁 المشروع المرتبط");a("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const qe=a("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Ie=a("reservations.details.actions.openProject","📁 فتح المشروع"),Ee=a("reservations.details.labels.start","بداية الحجز"),Re=a("reservations.details.labels.end","نهاية الحجز"),He=a("reservations.details.labels.notes","ملاحظات"),Me=a("reservations.list.noNotes","لا توجد ملاحظات"),Be=a("reservations.details.labels.itemsCount","عدد المعدات"),ze=a("reservations.details.labels.itemsTotal","إجمالي المعدات"),je=a("reservations.paymentHistory.title","سجل الدفعات"),Ve=a("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Ke=a("reservations.list.unknownCustomer","غير معروف"),nt=typeof N?.paymentStatus=="string"?N.paymentStatus.toLowerCase():null,O=W&&nt&&["paid","partial","unpaid"].includes(nt)?nt:e.paidStatus??e.paid_status??(qt?"paid":"unpaid"),st=O==="partial",Pt=O==="paid"?ve:st?_e:fe;function wt(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const i=String(t).replace(/[^0-9.+-]/g,""),l=Number(i);return Number.isFinite(l)?l:Number.NaN}const ot=(t={})=>{const i=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(i)||Array.isArray(t.packageItems)&&t.packageItems.length)},Ue=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(i=>i!=null&&i!==""),Qe=(t={})=>!t||typeof t!="object"?!1:!ot(t)&&Ue(t);let rt=Array.isArray(D)&&D.length?D.length:(Array.isArray(X)?X.filter(t=>t&&typeof t=="object"&&!Qe(t)).length:0)||1;rt=Math.max(1,Math.round(rt));const Ge=s(String(rt)),Nt=ke.replace("{count}",Ge),We=Ne.replace("{count}",Xt),Je=e.notes?s(e.notes):Me,Oe=s($t.toFixed(2)),Xe=s(Qt.toFixed(2)),Ye=s(String(et)),Ze=s(at.toFixed(2)),ta=`${Ye}% (${Ze} ${$})`,ea=Number.isFinite(xt)?Math.max(0,xt):0,aa=s(ea.toFixed(2)),R=[{icon:"💼",label:ze,value:`${Yt} ${$}`}];R.push({icon:"😎",label:oe,value:`${Oe} ${$}`});const ia=a("reservations.details.labels.crewCost","تكلفة الفريق");R.push({icon:"💵",label:ia,value:`${Xe} ${$}`}),tt>0&&R.push({icon:"💸",label:ne,value:`${Zt} ${$}`}),R.push({icon:"📊",label:re,value:`${te} ${$}`}),ht&&it>0&&R.push({icon:"🧾",label:se,value:`${ee} ${$}`}),et>0&&R.push({icon:"🏦",label:ce,value:ta}),R.push({icon:"💵",label:de,value:`${aa} ${$}`}),R.push({icon:"💰",label:Pe,value:`${ae} ${$}`});const na=R.map(({icon:t,label:i,value:l})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${i}</span>
      <span class="summary-details-value">${l}</span>
    </div>
  `).join("");let Lt="";try{const i=new URL(window.location.href).searchParams.get("debugFinance");if(i==="1"||i==="true"){const l=r=>(r?.type||"").toLowerCase()==="package"&&String(r?.pricingMode||"").toLowerCase()==="fixed"?"fixed":"daily",m=r=>{if((r?.type||"").toLowerCase()==="package")return!1;const o=Array.isArray(r?.items)?r.items:[];if(!o.length)return!1;if(o.some(u=>u?.reservation_id!=null||u?.reservationId!=null))return!0;const b=o.every(u=>u?.unit_price!=null||u?.unitPrice!=null),P=o.some(u=>u?.daily_rate!=null||u?.dailyRate!=null||u?.unit_rate!=null||u?.unitRate!=null||u?.price!=null);return b&&!P};let v=0,y=0,S=0,f=0;const q=(Array.isArray(D)?D:[]).map((r,o)=>{const d=Number.isFinite(Number(r?.quantity))?Number(r.quantity):0,b=Number.isFinite(Number(r?.unitPrice))?Number(r.unitPrice):0,P=l(r);let u=P==="fixed"?d*b:d*b*C,L="";if((r?.type||"").toLowerCase()==="package")try{const w={package_code:r?.package_code||r?.packageDisplayCode||r?.barcode||r?.packageId||r?.key,packageItems:Array.isArray(r?.packageItems)?r.packageItems:void 0},M=Number(r?.unitPrice);let c;if(Number.isFinite(M)&&M>0)c=d*M;else{const n=_a(w,{packageQuantity:d,days:C});c=Number.isFinite(Number(n.perDayTotal))?Number(n.perDayTotal):d*b}u=c*C,v+=c,y+=u;const p=(pricing.lines||[]).map((n,h)=>`
              <tr>
                <td colspan="2"></td>
                <td>• ${A(String(n.desc||n.barcode||"item"))}</td>
                <td>${s(String(n.qtyPerPackage))} × ${s(String(d))} × ${s(String(C))}</td>
                <td>${s(String((n.unitPrice||0).toFixed?n.unitPrice.toFixed(2):n.unitPrice))}</td>
                <td>${s(String((n.perDayTotal*C).toFixed?(n.perDayTotal*C).toFixed(2):n.perDayTotal*C))}</td>
              </tr>`).join("");L=p||""}catch{}else{const w=m(r),M=w?0:d*b,c=w?d*b:M*C;S+=M,f+=c}return`
          <tr>
            <td>${o+1}</td>
            <td>${A(String(r?.description||"-"))}</td>
            <td>${P}</td>
            <td>${s(String(d))}</td>
            <td>${s(String(b.toFixed?b.toFixed(2):b))}</td>
            <td>${s(String(u.toFixed?u.toFixed(2):u))}</td>
          </tr>${L}`}).join("");Lt=`
        <details class="reservation-finance-debug" style="margin-top:12px">
          <summary>Debug: تفصيل التسعير</summary>
          <div style="padding:8px 0; font-size: 12px">
            <div>الأيام: ${s(String(C))}</div>
            <div style="margin-top:6px"><strong>مجاميع سريعة:</strong></div>
            <div>من الحِزم (يومي): ${s(String(v.toFixed(2)))} ${$}</div>
            <div>من الحِزم (كامل المدة): ${s(String(y.toFixed(2)))} ${$}</div>
            <div>مفردة خارج الحِزم (يومي): ${s(String(S.toFixed(2)))} ${$}</div>
            <div>مفردة خارج الحِزم (كامل المدة): ${s(String(f.toFixed(2)))} ${$}</div>
            <div style="margin-top:4px">Equipment Total (breakdown): ${s(String(Z.toFixed(2)))} ${$}</div>
            <table class="table table-xs" style="width:100%; margin-top:8px">
              <thead>
                <tr>
                  <th>#</th><th>الوصف</th><th>النوع</th><th>الكمية</th><th>سعر الوحدة</th><th>المساهمة</th>
                </tr>
              </thead>
              <tbody>${q}</tbody>
            </table>
          </div>
        </details>`,console.debug("[finance-debug] groups",D,{rentalDays:C,equipmentTotal:Z,crewTotal:$t,discountAmount:tt,taxAmount:it})}}catch{}console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let k=[];W&&N&&(Array.isArray(N.paymentHistory)?k=N.paymentHistory:Array.isArray(N.payment_history)?k=N.payment_history:Array.isArray(N.payments)?k=N.payments:Array.isArray(N.paymentLogs)&&(k=N.paymentLogs)),(!Array.isArray(k)||k.length===0)&&(Array.isArray(e.paymentHistory)?k=e.paymentHistory:Array.isArray(e.payment_history)?k=e.payment_history:Array.isArray(e.paymentLogs)?k=e.paymentLogs:k=[]);const kt=Array.isArray(k)?k:[],sa=kt.length?`<ul class="reservation-payment-history-list">${kt.map(t=>{const i=t?.type==="amount"?a("reservations.paymentHistory.type.amount","دفعة مالية"):t?.type==="percent"?a("reservations.paymentHistory.type.percent","دفعة نسبة"):a("reservations.paymentHistory.type.unknown","دفعة"),l=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?`${s(Number(t.amount).toFixed(2))} ${$}`:"—",m=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${s(Number(t.percentage).toFixed(2))}%`:"—",v=t?.recordedAt?s(ct(t.recordedAt)):"—",y=t?.note?`<div class="payment-history-note">${A(s(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${A(i)}</span>
              <span class="payment-history-entry__amount">${l}</span>
              <span class="payment-history-entry__percent">${m}</span>
              <span class="payment-history-entry__date">${v}</span>
            </div>
            ${y}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${A(Ve)}</div>`,Ft=String(e?.status||e?.reservationStatus||"").toLowerCase(),Ct=Ft==="cancelled"||Ft==="canceled",Tt=Ct?[{text:a("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:Pt,className:O==="paid"?"status-paid":st?"status-partial":"status-unpaid"}]:[{text:pt?be:he,className:pt?"status-confirmed":"status-pending"},{text:Pt,className:O==="paid"?"status-paid":st?"status-partial":"status-unpaid"}];It&&!Ct&&Tt.push({text:$e,className:"status-completed"});const oa=Tt.map(({text:t,className:i})=>`<span class="status-chip ${i}">${t}</span>`).join(""),z=(t,i,l)=>`
    <div class="res-info-row">
      <span class="label">${t} ${i}</span>
      <span class="value">${l}</span>
    </div>
  `;let lt="";if(e.projectId){let t=A(qe);if(N){const i=N.title||a("projects.fallback.untitled","مشروع بدون اسم");t=`${A(i)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${N.id}">${A(Ie)}</button>`}lt=`
      <div class="res-info-row">
        <span class="label">📁 ${ge}</span>
        <span class="value">${t}</span>
      </div>
    `}const H=[];H.push(z("👤",Te,_?.customerName||Ke)),H.push(z("📞",De,_?.phone||"—")),H.push(z("🗓️",Ee,Jt)),H.push(z("🗓️",Re,Ot)),H.push(z("📦",Be,Nt)),H.push(z("⏱️",le,ie)),H.push(z("📝",He,Je)),lt&&H.push(lt);const ra=H.join(""),la=D.length?D.map(t=>{const i=t.items[0]||{},l=wa(i)||t.image,m=l?`<img src="${l}" alt="${ue}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let v=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)v=[...t.packageItems];else{const c=[];t.items.forEach(p=>{Array.isArray(p?.packageItems)&&p.packageItems.length&&c.push(...p.packageItems)}),v=c}if(Array.isArray(v)&&v.length>1){const c=new Set;v=v.filter(p=>{const n=p?.normalizedBarcode&&String(p.normalizedBarcode).toLowerCase()||p?.barcode&&String(p.barcode).toLowerCase()||(p?.equipmentId!=null?`id:${p.equipmentId}`:null);return n?c.has(n)?!1:(c.add(n),!0):!0})}const y=ot(t)||t.items.some(c=>ot(c))||v.length>0,S=(c,{fallback:p=1,max:n=1e3}={})=>{const h=wt(c);return Number.isFinite(h)&&h>0?Math.min(n,h):p};let f;if(y){const c=S(i?.qty??i?.quantity??i?.count,{fallback:NaN,max:999});Number.isFinite(c)&&c>0?f=c:f=S(t.quantity??t.count??1,{fallback:1,max:999})}else f=S(t.quantity??t.count??i?.qty??i?.quantity??i?.count??0,{fallback:1,max:9999});const q=s(String(f)),r=(c,{preferPositive:p=!1}={})=>{let n=Number.NaN;for(const h of c){const I=F(h);if(Number.isFinite(I)){if(p&&I>0)return I;Number.isFinite(n)||(n=I)}}return n};let o,d;if(y){const c=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(o=r(c,{preferPositive:!0}),!Number.isFinite(o)||o<0){const n=F(t.totalPrice??i?.total??i?.total_price);Number.isFinite(n)&&f>0&&(o=n/f)}Number.isFinite(o)||(o=0);const p=[i?.total,i?.total_price,t.totalPrice];if(d=r(p),!Number.isFinite(d))d=o*f;else{const n=o*f;Number.isFinite(n)&&n>0&&Math.abs(d-n)>n*.25&&(d=n)}}else{const c=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(o=r(c,{preferPositive:!0}),!Number.isFinite(o)||o<0){const p=F(t.totalPrice??i?.total??i?.total_price);Number.isFinite(p)&&f>0&&(o=p/f)}Number.isFinite(o)||(o=0),d=F(t.totalPrice??i?.total??i?.total_price),Number.isFinite(d)||(d=o*f)}o=x(o),d=x(d);const b=`${s(o.toFixed(2))} ${$}`,P=`${s(d.toFixed(2))} ${$}`,u=t.barcodes.map(c=>s(String(c||""))).filter(Boolean),L=u.length?`<details class="reservation-item-barcodes">
              <summary>${a("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${u.map(c=>`<li>${c}</li>`).join("")}
              </ul>
            </details>`:"";let w="";if(v.length){const c=new Map,p=n=>{const h=wt(n?.qtyPerPackage??n?.perPackageQty??n?.quantityPerPackage);return Number.isFinite(h)&&h>0&&h<=99?Math.round(h):1};if(v.forEach(n=>{if(!n)return;const h=G(n.barcode||n.normalizedBarcode||n.desc||Math.random());if(!h)return;const I=c.get(h),U=p(n);if(I){I.qty=U,I.total=U;return}c.set(h,{desc:n.desc||n.barcode||a("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(U,99)),total:Math.max(1,Math.min(U,99)),barcode:n.barcode??n.normalizedBarcode??""})}),c.size){const n=Array.from(c.values()).map(h=>{const I=s(String(h.qty>0?Math.min(h.qty,99):1)),U=A(h.desc||""),pa=h.barcode?` <span class="reservation-package-items__barcode">(${A(s(String(h.barcode)))})</span>`:"";return`<li>${U}${pa} × ${I}</li>`}).join("");w=`
              <details class="reservation-package-items">
                <summary>${a("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${n}
                </ul>
              </details>
            `}}const M=y?`${w||""}${L||""}`:L;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${m}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${A(i.desc||i.description||i.name||t.description||"-")}</div>
                  ${M}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${A(E.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${q}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${A(E.unitPrice)}">${b}</td>
            <td class="reservation-modal-items-table__cell" data-label="${A(E.total)}">${P}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${A(E.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${pe}</td></tr>`,ca=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${E.item}</th>
            <th>${E.quantity}</th>
            <th>${E.unitPrice}</th>
            <th>${E.total}</th>
            <th>${E.actions}</th>
          </tr>
        </thead>
        <tbody>${la}</tbody>
      </table>
    </div>
  `,Dt=K.map((t,i)=>{const l=s(String(i+1));let m=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!m||m.trim()==="")&&(m=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!m||m.trim()==="")try{const b=typeof Q=="function"?Q():[],P=t.positionId?b.find(w=>String(w.id)===String(t.positionId)):null,u=!P&&t.positionKey?b.find(w=>String(w.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,L=P||u||null;L&&(m=L.labelAr||L.labelEn||L.name||m)}catch{}const v=dt(m)||a("reservations.crew.positionFallback","منصب بدون اسم"),y=dt(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),S=dt(t.technicianName)||a("technicians.picker.noTechnicianOption","— بدون تعيين —"),f=t.technicianPhone||ye,q=x(F(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0));let r=x(F(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0));if(!Number.isFinite(r)||r<=0)try{const b=Q?Q():[],P=t.positionId?b.find(w=>String(w.id)===String(t.positionId)):null,u=!P&&t.positionKey?b.find(w=>String(w.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,L=P||u||null;L&&Number.isFinite(Number(L.clientPrice))&&(r=x(Number(L.clientPrice)))}catch{}const o=`${s(r.toFixed(2))} ${$}`,d=q>0?`${s(q.toFixed(2))} ${$}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${l}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${S}</span>
            <small class="text-muted">🏷️ ${v}${y?` — ${y}`:""}</small>
            <small class="text-muted">💼 ${o}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${f}</div>
          ${d?`<div>💵 ${a("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${d}</div>`:""}
        </div>
      </div>
    `}).join(""),da=Array.isArray(K)&&K.length>4,ua=K.length?da?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${A(a("reservations.details.slider.prev","السابق"))}" title="${A(a("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Dt}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${A(a("reservations.details.slider.next","التالي"))}" title="${A(a("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Dt}</div>`:`<ul class="reservation-modal-technicians"><li>${me}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Ae}</span>
          <strong>${Wt}</strong>
        </div>
        <div class="status-chips">
          ${oa}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Se}</h6>
          ${ra}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${xe}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${na}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${je}</h6>
              ${sa}
            </div>
            ${Lt}
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${we}</span>
          <span class="count">${We}</span>
        </div>
        ${ua}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Le}</span>
          <span class="count">${Nt}</span>
        </div>
        ${ca}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${B}">
          ${a("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${B}">${Fe}</button>
        ${Mt?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${B}">${Ce}</button>`:""}
      </div>
    </div>
  `}export{qa as a,Ia as b,Na as f,Pa as g,ga as i,wa as r};
