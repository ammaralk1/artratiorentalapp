import{d as ut,w as ma,n,v as ct,t as a}from"./auth.CoLto2Rb.js";import{n as G,I as Q,J as Dt}from"./state.BoE9tT9W.js";import{a as ya,i as ba,h as ha,z as S,A as C,b as va,f as fa,J as _a}from"./reservationsService.DUKQdfBZ.js";const $a=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Aa=new Set(["maintenance","reserved","retired"]);function Sa(e){const f=String(e??"").trim().toLowerCase();return f&&$a.get(f)||"available"}function xa(e){return e?typeof e=="object"?e:Na(e):null}function wa(e){const f=xa(e);return f?Sa(f.status||f.state||f.statusLabel||f.status_label):"available"}function ga(e){return!Aa.has(wa(e))}function Pa(e={}){return e.image||e.imageUrl||e.img||""}function qa(e){if(!e)return null;const f=G(e),{equipment:j=[]}=ut();return(j||[]).find(B=>G(B?.barcode)===f)||null}function Na(e){const f=G(e);if(!f)return null;const{equipment:j=[]}=ut();return(j||[]).find(B=>G(B?.barcode)===f)||null}function $(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function dt(e){if(e==null)return"";const f=String(e).trim();return f?n(f):""}function Ia(e,f,j=[],B,N=null){const{projectLinked:W,effectiveConfirmed:pt}=ya(e,N),gt=e.paid===!0||e.paid==="paid",qt=ba(e),X=e.items||[];let{groups:D}=ha(e);const It=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(i=>i&&i.type==="package"))),Et=t=>{const i=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return n(i)},mt=(t,i)=>{const l=y=>{const A=Array.isArray(y?.items)?y.items[0]:null,v=[A?.price,A?.unit_price,A?.unitPrice,y?.unitPrice,y?.totalPrice];for(const q of v){const r=C(q);if(Number.isFinite(r)&&r>0)return r}return 0},m=l(t),h=l(i);return m&&h?m<=h?t:i:m?t:i},g=[],V=new Map;D.forEach(t=>{if(!It(t)){g.push(t);return}const i=Et(t);if(!i){if(!V.has("__unknown__"))V.set("__unknown__",g.length),g.push(t);else{const l=V.get("__unknown__");g[l]=mt(g[l],t)}return}if(!V.has(i))V.set(i,g.length),g.push(t);else{const l=V.get(i);g[l]=mt(g[l],t)}}),D=g;const{technicians:yt=[]}=ut(),Rt=[].concat(Array.isArray(j)?j:[]).concat(Array.isArray(yt)?yt:[]),Y=new Map;Rt.forEach(t=>{if(!t||t.id==null)return;const i=String(t.id),l=Y.get(i)||{};Y.set(i,{...l,...t})});const K=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,i)=>{const l=t?.technicianId!=null?Y.get(String(t.technicianId)):null;let m=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!m||m.trim()==="")&&(m=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const h=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let y=m,A=h;if(!y||y.trim()==="")try{const r=Q?Q():[];let s=null;if(t.positionId!=null&&(s=r.find(d=>String(d.id)===String(t.positionId))||null),!s){const d=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(d&&(s=typeof Dt=="function"?Dt(d):null,!s&&r.length)){const b=String(d).trim().toLowerCase();s=r.find(w=>[w.name,w.labelAr,w.labelEn].filter(Boolean).map(u=>String(u).toLowerCase()).includes(b))||null}}s&&(y=s.labelAr||s.labelEn||s.name||"",(!A||String(A).trim()==="")&&(s.labelAr&&s.labelEn?A=y===s.labelAr?s.labelEn:s.labelAr:A=s.labelAr||s.labelEn||""))}catch{}const v=S(C(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??l?.dailyWage??l?.wage??0)),q=S(C(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${i}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:y,positionLabelAlt:A,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:v,positionClientPrice:q,technicianId:t.technicianId!=null?String(t.technicianId):l?.id!=null?String(l.id):null,technicianName:t.technicianName??t.technician_name??l?.name??null,technicianRole:t.technicianRole??l?.role??null,technicianPhone:t.technicianPhone??l?.phone??null,notes:t.notes??null}}),Ht=ma(),F=va(e.start,e.end),Mt=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,bt=C(Mt),Bt=Number.isFinite(bt)?bt:0,zt=e.discountType??e.discount_type??e.discountMode??"percent",jt=String(zt).toLowerCase()==="amount"?"amount":"percent",ht=W?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),vt=C(e.cost??e.total??e.finalTotal),ft=Number.isFinite(vt),Vt=ft?S(vt):0,_t=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,J=_t!=null?C(_t):Number.NaN,Kt=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(J)&&J>0)&&Number.isFinite(J)?J:0,T=fa({items:X,technicianIds:e.technicians||[],crewAssignments:K,discount:Bt,discountType:jt,applyTax:ht,start:e.start,end:e.end,companySharePercent:Kt,groupingSource:e}),Z=S(T.equipmentTotal),$t=S(T.crewTotal),Ut=S(T.crewCostTotal),tt=S(T.discountAmount),Qt=S(T.subtotalAfterDiscount),et=Number.isFinite(T.companySharePercent)?T.companySharePercent:0;let at=S(T.companyShareAmount);at=et>0?S(Math.max(0,at)):0;const it=S(T.taxAmount),At=S(T.finalTotal),St=W?At:ft?Vt:At,xt=S(T.netProfit),Gt=n(String(e.reservationId??e.id??"")),Wt=e.start?n(ct(e.start)):"-",Jt=e.end?n(ct(e.end)):"-",Ot=n(String(K.length)),Xt=n(Z.toFixed(2)),Yt=n(tt.toFixed(2)),Zt=n(Qt.toFixed(2)),te=n(it.toFixed(2)),ee=n((Number.isFinite(St)?St:0).toFixed(2)),ae=n(String(F)),_=a("reservations.create.summary.currency","SR"),ie=a("reservations.details.labels.discount","الخصم"),ne=a("reservations.details.labels.tax","الضريبة (15%)"),se=a("reservations.details.labels.crewTotal","إجمالي الفريق"),oe=a("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),re=a("reservations.details.labels.duration","عدد الأيام"),le=a("reservations.details.labels.companyShare","🏦 نسبة الشركة"),ce=a("reservations.details.labels.netProfit","💵 صافي الربح"),de=a("reservations.create.equipment.imageAlt","صورة"),E={item:a("reservations.equipment.table.item","المعدة"),quantity:a("reservations.equipment.table.quantity","الكمية"),unitPrice:a("reservations.equipment.table.unitPrice","سعر الوحدة"),total:a("reservations.equipment.table.total","الإجمالي"),actions:a("reservations.equipment.table.actions","الإجراءات")},ue=a("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),pe=a("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");a("reservations.details.technicians.roleUnknown","غير محدد");const me=a("reservations.details.technicians.phoneUnknown","غير متوفر");a("reservations.details.technicians.wage","{amount} {currency} / اليوم");const ye=a("reservations.list.status.confirmed","✅ مؤكد"),be=a("reservations.list.status.pending","⏳ غير مؤكد"),he=a("reservations.list.payment.paid","💳 مدفوع"),ve=a("reservations.list.payment.unpaid","💳 غير مدفوع"),fe=a("reservations.list.payment.partial","💳 مدفوع جزئياً"),_e=a("reservations.list.status.completed","📁 منتهي"),$e=a("reservations.details.labels.id","🆔 رقم الحجز"),Ae=a("reservations.details.section.bookingInfo","بيانات الحجز"),Se=a("reservations.details.section.paymentSummary","ملخص الدفع"),xe=a("reservations.details.labels.finalTotal","المجموع النهائي"),we=a("reservations.details.section.crew","😎 الفريق الفني"),Pe=a("reservations.details.crew.count","{count} عضو"),Ne=a("reservations.details.section.items","📦 المعدات المرتبطة"),Le=a("reservations.details.items.count","{count} عنصر"),ke=a("reservations.details.actions.edit","✏️ تعديل"),Ce=a("reservations.details.actions.delete","🗑️ حذف"),Fe=a("reservations.details.labels.customer","العميل"),Te=a("reservations.details.labels.contact","رقم التواصل"),De=a("reservations.details.labels.project","📁 المشروع المرتبط");a("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const ge=a("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),qe=a("reservations.details.actions.openProject","📁 فتح المشروع"),Ie=a("reservations.details.labels.start","بداية الحجز"),Ee=a("reservations.details.labels.end","نهاية الحجز"),Re=a("reservations.details.labels.notes","ملاحظات"),He=a("reservations.list.noNotes","لا توجد ملاحظات"),Me=a("reservations.details.labels.itemsCount","عدد المعدات"),Be=a("reservations.details.labels.itemsTotal","إجمالي المعدات"),ze=a("reservations.paymentHistory.title","سجل الدفعات"),je=a("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Ve=a("reservations.list.unknownCustomer","غير معروف"),nt=typeof N?.paymentStatus=="string"?N.paymentStatus.toLowerCase():null,O=W&&nt&&["paid","partial","unpaid"].includes(nt)?nt:e.paidStatus??e.paid_status??(gt?"paid":"unpaid"),st=O==="partial",wt=O==="paid"?he:st?fe:ve;function Ke(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const i=String(t).replace(/[^0-9.+-]/g,""),l=Number(i);return Number.isFinite(l)?l:Number.NaN}const ot=(t={})=>{const i=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(i)||Array.isArray(t.packageItems)&&t.packageItems.length)},Ue=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(i=>i!=null&&i!==""),Qe=(t={})=>!t||typeof t!="object"?!1:!ot(t)&&Ue(t);let rt=Array.isArray(D)&&D.length?D.length:(Array.isArray(X)?X.filter(t=>t&&typeof t=="object"&&!Qe(t)).length:0)||1;rt=Math.max(1,Math.round(rt));const Ge=n(String(rt)),Pt=Le.replace("{count}",Ge),We=Pe.replace("{count}",Ot),Je=e.notes?n(e.notes):He,Oe=n($t.toFixed(2)),Xe=n(Ut.toFixed(2)),Ye=n(String(et)),Ze=n(at.toFixed(2)),ta=`${Ye}% (${Ze} ${_})`,ea=Number.isFinite(xt)?Math.max(0,xt):0,aa=n(ea.toFixed(2)),R=[{icon:"💼",label:Be,value:`${Xt} ${_}`}];R.push({icon:"😎",label:se,value:`${Oe} ${_}`});const ia=a("reservations.details.labels.crewCost","تكلفة الفريق");R.push({icon:"💵",label:ia,value:`${Xe} ${_}`}),tt>0&&R.push({icon:"💸",label:ie,value:`${Yt} ${_}`}),R.push({icon:"📊",label:oe,value:`${Zt} ${_}`}),ht&&it>0&&R.push({icon:"🧾",label:ne,value:`${te} ${_}`}),et>0&&R.push({icon:"🏦",label:le,value:ta}),R.push({icon:"💵",label:ce,value:`${aa} ${_}`}),R.push({icon:"💰",label:xe,value:`${ee} ${_}`});const na=R.map(({icon:t,label:i,value:l})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${i}</span>
      <span class="summary-details-value">${l}</span>
    </div>
  `).join("");let Nt="";try{const i=new URL(window.location.href).searchParams.get("debugFinance");if(i==="1"||i==="true"){const l=r=>(r?.type||"").toLowerCase()==="package"&&String(r?.pricingMode||"").toLowerCase()==="fixed"?"fixed":"daily",m=r=>{if((r?.type||"").toLowerCase()==="package")return!1;const s=Array.isArray(r?.items)?r.items:[];if(!s.length)return!1;if(s.some(u=>u?.reservation_id!=null||u?.reservationId!=null))return!0;const b=s.every(u=>u?.unit_price!=null||u?.unitPrice!=null),w=s.some(u=>u?.daily_rate!=null||u?.dailyRate!=null||u?.unit_rate!=null||u?.unitRate!=null||u?.price!=null);return b&&!w};let h=0,y=0,A=0,v=0;const q=(Array.isArray(D)?D:[]).map((r,s)=>{const d=Number.isFinite(Number(r?.quantity))?Number(r.quantity):0,b=Number.isFinite(Number(r?.unitPrice))?Number(r.unitPrice):0,w=l(r);let u=w==="fixed"?d*b:d*b*F,L="";if((r?.type||"").toLowerCase()==="package")try{const P={package_code:r?.package_code||r?.packageDisplayCode||r?.barcode||r?.packageId||r?.key,packageItems:Array.isArray(r?.packageItems)?r.packageItems:void 0},M=Number(r?.unitPrice);let c;if(Number.isFinite(M)&&M>0)c=d*M;else{const o=_a(P,{packageQuantity:d,days:F});c=Number.isFinite(Number(o.perDayTotal))?Number(o.perDayTotal):d*b}u=c*F,h+=c,y+=u;const p=(pricing.lines||[]).map((o,x)=>`
              <tr>
                <td colspan="2"></td>
                <td>• ${$(String(o.desc||o.barcode||"item"))}</td>
                <td>${n(String(o.qtyPerPackage))} × ${n(String(d))} × ${n(String(F))}</td>
                <td>${n(String((o.unitPrice||0).toFixed?o.unitPrice.toFixed(2):o.unitPrice))}</td>
                <td>${n(String((o.perDayTotal*F).toFixed?(o.perDayTotal*F).toFixed(2):o.perDayTotal*F))}</td>
              </tr>`).join("");L=p||""}catch{}else{const P=m(r),M=P?0:d*b,c=P?d*b:M*F;A+=M,v+=c}return`
          <tr>
            <td>${s+1}</td>
            <td>${$(String(r?.description||"-"))}</td>
            <td>${w}</td>
            <td>${n(String(d))}</td>
            <td>${n(String(b.toFixed?b.toFixed(2):b))}</td>
            <td>${n(String(u.toFixed?u.toFixed(2):u))}</td>
          </tr>${L}`}).join("");Nt=`
        <details class="reservation-finance-debug" style="margin-top:12px">
          <summary>Debug: تفصيل التسعير</summary>
          <div style="padding:8px 0; font-size: 12px">
            <div>الأيام: ${n(String(F))}</div>
            <div style="margin-top:6px"><strong>مجاميع سريعة:</strong></div>
            <div>من الحِزم (يومي): ${n(String(h.toFixed(2)))} ${_}</div>
            <div>من الحِزم (كامل المدة): ${n(String(y.toFixed(2)))} ${_}</div>
            <div>مفردة خارج الحِزم (يومي): ${n(String(A.toFixed(2)))} ${_}</div>
            <div>مفردة خارج الحِزم (كامل المدة): ${n(String(v.toFixed(2)))} ${_}</div>
            <div style="margin-top:4px">Equipment Total (breakdown): ${n(String(Z.toFixed(2)))} ${_}</div>
            <table class="table table-xs" style="width:100%; margin-top:8px">
              <thead>
                <tr>
                  <th>#</th><th>الوصف</th><th>النوع</th><th>الكمية</th><th>سعر الوحدة</th><th>المساهمة</th>
                </tr>
              </thead>
              <tbody>${q}</tbody>
            </table>
          </div>
        </details>`,console.debug("[finance-debug] groups",D,{rentalDays:F,equipmentTotal:Z,crewTotal:$t,discountAmount:tt,taxAmount:it})}}catch{}console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let k=[];W&&N&&(Array.isArray(N.paymentHistory)?k=N.paymentHistory:Array.isArray(N.payment_history)?k=N.payment_history:Array.isArray(N.payments)?k=N.payments:Array.isArray(N.paymentLogs)&&(k=N.paymentLogs)),(!Array.isArray(k)||k.length===0)&&(Array.isArray(e.paymentHistory)?k=e.paymentHistory:Array.isArray(e.payment_history)?k=e.payment_history:Array.isArray(e.paymentLogs)?k=e.paymentLogs:k=[]);const Lt=Array.isArray(k)?k:[],sa=Lt.length?`<ul class="reservation-payment-history-list">${Lt.map(t=>{const i=t?.type==="amount"?a("reservations.paymentHistory.type.amount","دفعة مالية"):t?.type==="percent"?a("reservations.paymentHistory.type.percent","دفعة نسبة"):a("reservations.paymentHistory.type.unknown","دفعة"),l=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?`${n(Number(t.amount).toFixed(2))} ${_}`:"—",m=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${n(Number(t.percentage).toFixed(2))}%`:"—",h=t?.recordedAt?n(ct(t.recordedAt)):"—",y=t?.note?`<div class="payment-history-note">${$(n(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${$(i)}</span>
              <span class="payment-history-entry__amount">${l}</span>
              <span class="payment-history-entry__percent">${m}</span>
              <span class="payment-history-entry__date">${h}</span>
            </div>
            ${y}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${$(je)}</div>`,kt=String(e?.status||e?.reservationStatus||"").toLowerCase(),Ct=kt==="cancelled"||kt==="canceled",Ft=Ct?[{text:a("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:wt,className:O==="paid"?"status-paid":st?"status-partial":"status-unpaid"}]:[{text:pt?ye:be,className:pt?"status-confirmed":"status-pending"},{text:wt,className:O==="paid"?"status-paid":st?"status-partial":"status-unpaid"}];qt&&!Ct&&Ft.push({text:_e,className:"status-completed"});const oa=Ft.map(({text:t,className:i})=>`<span class="status-chip ${i}">${t}</span>`).join(""),z=(t,i,l)=>`
    <div class="res-info-row">
      <span class="label">${t} ${i}</span>
      <span class="value">${l}</span>
    </div>
  `;let lt="";if(e.projectId){let t=$(ge);if(N){const i=N.title||a("projects.fallback.untitled","مشروع بدون اسم");t=`${$(i)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${N.id}">${$(qe)}</button>`}lt=`
      <div class="res-info-row">
        <span class="label">📁 ${De}</span>
        <span class="value">${t}</span>
      </div>
    `}const H=[];H.push(z("👤",Fe,f?.customerName||Ve)),H.push(z("📞",Te,f?.phone||"—")),H.push(z("🗓️",Ie,Wt)),H.push(z("🗓️",Ee,Jt)),H.push(z("📦",Me,Pt)),H.push(z("⏱️",re,ae)),H.push(z("📝",Re,Je)),lt&&H.push(lt);const ra=H.join(""),la=D.length?D.map(t=>{const i=t.items[0]||{},l=Pa(i)||t.image,m=l?`<img src="${l}" alt="${de}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let h=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)h=[...t.packageItems];else{const c=[];t.items.forEach(p=>{Array.isArray(p?.packageItems)&&p.packageItems.length&&c.push(...p.packageItems)}),h=c}if(Array.isArray(h)&&h.length>1){const c=new Set;h=h.filter(p=>{const o=p?.normalizedBarcode&&String(p.normalizedBarcode).toLowerCase()||p?.barcode&&String(p.barcode).toLowerCase()||(p?.equipmentId!=null?`id:${p.equipmentId}`:null);return o?c.has(o)?!1:(c.add(o),!0):!0})}const y=ot(t)||t.items.some(c=>ot(c))||h.length>0,A=(c,{fallback:p=1,max:o=1e3}={})=>{const x=Ke(c);return Number.isFinite(x)&&x>0?Math.min(o,x):p};let v;if(y){const c=A(i?.qty??i?.quantity??i?.count,{fallback:NaN,max:999});Number.isFinite(c)&&c>0?v=c:v=A(t.quantity??t.count??1,{fallback:1,max:999})}else v=A(t.quantity??t.count??i?.qty??i?.quantity??i?.count??0,{fallback:1,max:9999});const q=n(String(v)),r=(c,{preferPositive:p=!1}={})=>{let o=Number.NaN;for(const x of c){const I=C(x);if(Number.isFinite(I)){if(p&&I>0)return I;Number.isFinite(o)||(o=I)}}return o};let s,d;if(y){const c=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(s=r(c,{preferPositive:!0}),!Number.isFinite(s)||s<0){const o=C(t.totalPrice??i?.total??i?.total_price);Number.isFinite(o)&&v>0&&(s=o/v)}Number.isFinite(s)||(s=0);const p=[i?.total,i?.total_price,t.totalPrice];if(d=r(p),!Number.isFinite(d))d=s*v;else{const o=s*v;Number.isFinite(o)&&o>0&&Math.abs(d-o)>o*.25&&(d=o)}}else{const c=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(s=r(c,{preferPositive:!0}),!Number.isFinite(s)||s<0){const p=C(t.totalPrice??i?.total??i?.total_price);Number.isFinite(p)&&v>0&&(s=p/v)}Number.isFinite(s)||(s=0),d=C(t.totalPrice??i?.total??i?.total_price),Number.isFinite(d)||(d=s*v)}s=S(s),d=S(d);const b=`${n(s.toFixed(2))} ${_}`,w=`${n(d.toFixed(2))} ${_}`,u=t.barcodes.map(c=>n(String(c||""))).filter(Boolean),L=u.length?`<details class="reservation-item-barcodes">
              <summary>${a("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${u.map(c=>`<li>${c}</li>`).join("")}
              </ul>
            </details>`:"";let P="";if(h.length){const c=new Map,p=o=>1;if(h.forEach(o=>{if(!o)return;const x=G(o.barcode||o.normalizedBarcode||o.desc||Math.random());if(!x)return;const I=c.get(x),U=p();if(I){I.qty=U,I.total=U;return}c.set(x,{desc:o.desc||o.barcode||a("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(U,99)),total:Math.max(1,Math.min(U,99)),barcode:o.barcode??o.normalizedBarcode??""})}),c.size){const o=Array.from(c.values()).map(x=>{const I=n(String(x.qty>0?Math.min(x.qty,99):1)),U=$(x.desc||""),pa=x.barcode?` <span class="reservation-package-items__barcode">(${$(n(String(x.barcode)))})</span>`:"";return`<li>${U}${pa} × ${I}</li>`}).join("");P=`
              <details class="reservation-package-items">
                <summary>${a("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${o}
                </ul>
              </details>
            `}}const M=y?`${P||""}${L||""}`:L;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${m}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${$(i.desc||i.description||i.name||t.description||"-")}</div>
                  ${M}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${$(E.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${q}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${$(E.unitPrice)}">${b}</td>
            <td class="reservation-modal-items-table__cell" data-label="${$(E.total)}">${w}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${$(E.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${ue}</td></tr>`,ca=`
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
  `,Tt=K.map((t,i)=>{const l=n(String(i+1));let m=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!m||m.trim()==="")&&(m=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!m||m.trim()==="")try{const b=typeof Q=="function"?Q():[],w=t.positionId?b.find(P=>String(P.id)===String(t.positionId)):null,u=!w&&t.positionKey?b.find(P=>String(P.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,L=w||u||null;L&&(m=L.labelAr||L.labelEn||L.name||m)}catch{}const h=dt(m)||a("reservations.crew.positionFallback","منصب بدون اسم"),y=dt(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),A=dt(t.technicianName)||a("technicians.picker.noTechnicianOption","— بدون تعيين —"),v=t.technicianPhone||me,q=S(C(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0));let r=S(C(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0));if(!Number.isFinite(r)||r<=0)try{const b=Q?Q():[],w=t.positionId?b.find(P=>String(P.id)===String(t.positionId)):null,u=!w&&t.positionKey?b.find(P=>String(P.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,L=w||u||null;L&&Number.isFinite(Number(L.clientPrice))&&(r=S(Number(L.clientPrice)))}catch{}const s=`${n(r.toFixed(2))} ${_}`,d=q>0?`${n(q.toFixed(2))} ${_}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${l}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${A}</span>
            <small class="text-muted">🏷️ ${h}${y?` — ${y}`:""}</small>
            <small class="text-muted">💼 ${s}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${v}</div>
          ${d?`<div>💵 ${a("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${d}</div>`:""}
        </div>
      </div>
    `}).join(""),da=Array.isArray(K)&&K.length>4,ua=K.length?da?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${$(a("reservations.details.slider.prev","السابق"))}" title="${$(a("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Tt}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${$(a("reservations.details.slider.next","التالي"))}" title="${$(a("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Tt}</div>`:`<ul class="reservation-modal-technicians"><li>${pe}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${$e}</span>
          <strong>${Gt}</strong>
        </div>
        <div class="status-chips">
          ${oa}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Ae}</h6>
          ${ra}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Se}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${na}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${ze}</h6>
              ${sa}
            </div>
            ${Nt}
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
          <span>${Ne}</span>
          <span class="count">${Pt}</span>
        </div>
        ${ca}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${B}">
          ${a("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${B}">${ke}</button>
        ${Ht?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${B}">${Ce}</button>`:""}
      </div>
    </div>
  `}export{qa as a,Ia as b,Na as f,wa as g,ga as i,Pa as r};
