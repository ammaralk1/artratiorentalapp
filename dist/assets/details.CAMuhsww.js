import{d as dt,v as da,n,y as lt,t as a}from"./auth.EkPXpg4F.js";import{n as G,i as Q,j as Ft}from"./state.DofjCv9v.js";import{a as ua,i as pa,h as ma,z as A,A as C,b as ya,f as ba,J as ha}from"./reservationsService.B7Ff-z7Z.js";const va=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),fa=new Set(["maintenance","reserved","retired"]);function _a(e){const f=String(e??"").trim().toLowerCase();return f&&va.get(f)||"available"}function $a(e){return e?typeof e=="object"?e:xa(e):null}function Sa(e){const f=$a(e);return f?_a(f.status||f.state||f.statusLabel||f.status_label):"available"}function Da(e){return!fa.has(Sa(e))}function Aa(e={}){return e.image||e.imageUrl||e.img||""}function ga(e){if(!e)return null;const f=G(e),{equipment:z=[]}=dt();return(z||[]).find(B=>G(B?.barcode)===f)||null}function xa(e){const f=G(e);if(!f)return null;const{equipment:z=[]}=dt();return(z||[]).find(B=>G(B?.barcode)===f)||null}function $(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ct(e){if(e==null)return"";const f=String(e).trim();return f?n(f):""}function qa(e,f,z=[],B,N=null){const{projectLinked:ut,effectiveConfirmed:pt}=ua(e,N),Tt=e.paid===!0||e.paid==="paid",Dt=pa(e),O=e.items||[];let{groups:D}=ma(e);const gt=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(i=>i&&i.type==="package"))),qt=t=>{const i=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return n(i)},mt=(t,i)=>{const l=y=>{const S=Array.isArray(y?.items)?y.items[0]:null,v=[S?.price,S?.unit_price,S?.unitPrice,y?.unitPrice,y?.totalPrice];for(const q of v){const r=C(q);if(Number.isFinite(r)&&r>0)return r}return 0},m=l(t),h=l(i);return m&&h?m<=h?t:i:m?t:i},g=[],V=new Map;D.forEach(t=>{if(!gt(t)){g.push(t);return}const i=qt(t);if(!i){if(!V.has("__unknown__"))V.set("__unknown__",g.length),g.push(t);else{const l=V.get("__unknown__");g[l]=mt(g[l],t)}return}if(!V.has(i))V.set(i,g.length),g.push(t);else{const l=V.get(i);g[l]=mt(g[l],t)}}),D=g;const{technicians:yt=[]}=dt(),It=[].concat(Array.isArray(z)?z:[]).concat(Array.isArray(yt)?yt:[]),X=new Map;It.forEach(t=>{if(!t||t.id==null)return;const i=String(t.id),l=X.get(i)||{};X.set(i,{...l,...t})});const K=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,i)=>{const l=t?.technicianId!=null?X.get(String(t.technicianId)):null;let m=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!m||m.trim()==="")&&(m=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const h=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let y=m,S=h;if(!y||y.trim()==="")try{const r=Q?Q():[];let s=null;if(t.positionId!=null&&(s=r.find(d=>String(d.id)===String(t.positionId))||null),!s){const d=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(d&&(s=typeof Ft=="function"?Ft(d):null,!s&&r.length)){const b=String(d).trim().toLowerCase();s=r.find(P=>[P.name,P.labelAr,P.labelEn].filter(Boolean).map(u=>String(u).toLowerCase()).includes(b))||null}}s&&(y=s.labelAr||s.labelEn||s.name||"",(!S||String(S).trim()==="")&&(s.labelAr&&s.labelEn?S=y===s.labelAr?s.labelEn:s.labelAr:S=s.labelAr||s.labelEn||""))}catch{}const v=A(C(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??l?.dailyWage??l?.wage??0)),q=A(C(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${i}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:y,positionLabelAlt:S,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:v,positionClientPrice:q,technicianId:t.technicianId!=null?String(t.technicianId):l?.id!=null?String(l.id):null,technicianName:t.technicianName??t.technician_name??l?.name??null,technicianRole:t.technicianRole??l?.role??null,technicianPhone:t.technicianPhone??l?.phone??null,notes:t.notes??null}}),Et=da(),F=ya(e.start,e.end),Rt=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,bt=C(Rt),Ht=Number.isFinite(bt)?bt:0,Mt=e.discountType??e.discount_type??e.discountMode??"percent",Bt=String(Mt).toLowerCase()==="amount"?"amount":"percent",ht=!!(e.applyTax??e.apply_tax??e.taxApplied),vt=C(e.cost??e.total??e.finalTotal);Number.isFinite(vt)&&A(vt);const ft=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,W=ft!=null?C(ft):Number.NaN,jt=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(W)&&W>0)&&Number.isFinite(W)?W:0,T=ba({items:O,technicianIds:e.technicians||[],crewAssignments:K,discount:Ht,discountType:Bt,applyTax:ht,start:e.start,end:e.end,companySharePercent:jt,groupingSource:e}),Y=A(T.equipmentTotal),_t=A(T.crewTotal),zt=A(T.crewCostTotal),Z=A(T.discountAmount),Vt=A(T.subtotalAfterDiscount),tt=Number.isFinite(T.companySharePercent)?T.companySharePercent:0;let et=A(T.companyShareAmount);et=tt>0?A(Math.max(0,et)):0;const at=A(T.taxAmount),$t=A(T.finalTotal),St=A(T.netProfit),Kt=n(String(e.reservationId??e.id??"")),Ut=e.start?n(lt(e.start)):"-",Qt=e.end?n(lt(e.end)):"-",Gt=n(String(K.length)),Wt=n(Y.toFixed(2)),Jt=n(Z.toFixed(2)),Ot=n(Vt.toFixed(2)),Xt=n(at.toFixed(2)),Yt=n((Number.isFinite($t)?$t:0).toFixed(2)),Zt=n(String(F)),_=a("reservations.create.summary.currency","SR"),te=a("reservations.details.labels.discount","الخصم"),ee=a("reservations.details.labels.tax","الضريبة (15%)"),ae=a("reservations.details.labels.crewTotal","إجمالي الفريق"),ie=a("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ne=a("reservations.details.labels.duration","عدد الأيام"),se=a("reservations.details.labels.companyShare","🏦 نسبة الشركة"),oe=a("reservations.details.labels.netProfit","💵 صافي الربح"),re=a("reservations.create.equipment.imageAlt","صورة"),E={item:a("reservations.equipment.table.item","المعدة"),quantity:a("reservations.equipment.table.quantity","الكمية"),unitPrice:a("reservations.equipment.table.unitPrice","سعر الوحدة"),total:a("reservations.equipment.table.total","الإجمالي"),actions:a("reservations.equipment.table.actions","الإجراءات")},le=a("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),ce=a("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");a("reservations.details.technicians.roleUnknown","غير محدد");const de=a("reservations.details.technicians.phoneUnknown","غير متوفر");a("reservations.details.technicians.wage","{amount} {currency} / اليوم");const ue=a("reservations.list.status.confirmed","✅ مؤكد"),pe=a("reservations.list.status.pending","⏳ غير مؤكد"),me=a("reservations.list.payment.paid","💳 مدفوع"),ye=a("reservations.list.payment.unpaid","💳 غير مدفوع"),be=a("reservations.list.payment.partial","💳 مدفوع جزئياً"),he=a("reservations.list.status.completed","📁 منتهي"),ve=a("reservations.details.labels.id","🆔 رقم الحجز"),fe=a("reservations.details.section.bookingInfo","بيانات الحجز"),_e=a("reservations.details.section.paymentSummary","ملخص الدفع"),$e=a("reservations.details.labels.finalTotal","المجموع النهائي"),Se=a("reservations.details.section.crew","😎 الفريق الفني"),Ae=a("reservations.details.crew.count","{count} عضو"),xe=a("reservations.details.section.items","📦 المعدات المرتبطة"),Pe=a("reservations.details.items.count","{count} عنصر"),we=a("reservations.details.actions.edit","✏️ تعديل"),Ne=a("reservations.details.actions.delete","🗑️ حذف"),Le=a("reservations.details.labels.customer","العميل"),ke=a("reservations.details.labels.contact","رقم التواصل"),Ce=a("reservations.details.labels.project","📁 المشروع المرتبط");a("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Fe=a("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Te=a("reservations.details.actions.openProject","📁 فتح المشروع"),De=a("reservations.details.labels.start","بداية الحجز"),ge=a("reservations.details.labels.end","نهاية الحجز"),qe=a("reservations.details.labels.notes","ملاحظات"),Ie=a("reservations.list.noNotes","لا توجد ملاحظات"),Ee=a("reservations.details.labels.itemsCount","عدد المعدات"),Re=a("reservations.details.labels.itemsTotal","إجمالي المعدات"),He=a("reservations.paymentHistory.title","سجل الدفعات"),Me=a("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Be=a("reservations.list.unknownCustomer","غير معروف"),it=typeof N?.paymentStatus=="string"?N.paymentStatus.toLowerCase():null,J=ut&&it&&["paid","partial","unpaid"].includes(it)?it:e.paidStatus??e.paid_status??(Tt?"paid":"unpaid"),nt=J==="partial",At=J==="paid"?me:nt?be:ye;function je(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const i=String(t).replace(/[^0-9.+-]/g,""),l=Number(i);return Number.isFinite(l)?l:Number.NaN}const st=(t={})=>{const i=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(i)||Array.isArray(t.packageItems)&&t.packageItems.length)},ze=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(i=>i!=null&&i!==""),Ve=(t={})=>!t||typeof t!="object"?!1:!st(t)&&ze(t);let ot=Array.isArray(D)&&D.length?D.length:(Array.isArray(O)?O.filter(t=>t&&typeof t=="object"&&!Ve(t)).length:0)||1;ot=Math.max(1,Math.round(ot));const Ke=n(String(ot)),xt=Pe.replace("{count}",Ke),Ue=Ae.replace("{count}",Gt),Qe=e.notes?n(e.notes):Ie,Ge=n(_t.toFixed(2)),We=n(zt.toFixed(2)),Je=n(String(tt)),Oe=n(et.toFixed(2)),Xe=`${Je}% (${Oe} ${_})`,Ye=Number.isFinite(St)?Math.max(0,St):0,Ze=n(Ye.toFixed(2)),R=[{icon:"💼",label:Re,value:`${Wt} ${_}`}];R.push({icon:"😎",label:ae,value:`${Ge} ${_}`});const ta=a("reservations.details.labels.crewCost","تكلفة الفريق");R.push({icon:"💵",label:ta,value:`${We} ${_}`}),Z>0&&R.push({icon:"💸",label:te,value:`${Jt} ${_}`}),R.push({icon:"📊",label:ie,value:`${Ot} ${_}`}),ht&&at>0&&R.push({icon:"🧾",label:ee,value:`${Xt} ${_}`}),tt>0&&R.push({icon:"🏦",label:se,value:Xe}),R.push({icon:"💵",label:oe,value:`${Ze} ${_}`}),R.push({icon:"💰",label:$e,value:`${Yt} ${_}`});const ea=R.map(({icon:t,label:i,value:l})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${i}</span>
      <span class="summary-details-value">${l}</span>
    </div>
  `).join("");let Pt="";try{const i=new URL(window.location.href).searchParams.get("debugFinance");if(i==="1"||i==="true"){const l=r=>(r?.type||"").toLowerCase()==="package"&&String(r?.pricingMode||"").toLowerCase()==="fixed"?"fixed":"daily",m=r=>{if((r?.type||"").toLowerCase()==="package")return!1;const s=Array.isArray(r?.items)?r.items:[];if(!s.length)return!1;if(s.some(u=>u?.reservation_id!=null||u?.reservationId!=null))return!0;const b=s.every(u=>u?.unit_price!=null||u?.unitPrice!=null),P=s.some(u=>u?.daily_rate!=null||u?.dailyRate!=null||u?.unit_rate!=null||u?.unitRate!=null||u?.price!=null);return b&&!P};let h=0,y=0,S=0,v=0;const q=(Array.isArray(D)?D:[]).map((r,s)=>{const d=Number.isFinite(Number(r?.quantity))?Number(r.quantity):0,b=Number.isFinite(Number(r?.unitPrice))?Number(r.unitPrice):0,P=l(r);let u=P==="fixed"?d*b:d*b*F,L="";if((r?.type||"").toLowerCase()==="package")try{const w={package_code:r?.package_code||r?.packageDisplayCode||r?.barcode||r?.packageId||r?.key,packageItems:Array.isArray(r?.packageItems)?r.packageItems:void 0},M=Number(r?.unitPrice);let c;if(Number.isFinite(M)&&M>0)c=d*M;else{const o=ha(w,{packageQuantity:d,days:F});c=Number.isFinite(Number(o.perDayTotal))?Number(o.perDayTotal):d*b}u=c*F,h+=c,y+=u;const p=(pricing.lines||[]).map((o,x)=>`
              <tr>
                <td colspan="2"></td>
                <td>• ${$(String(o.desc||o.barcode||"item"))}</td>
                <td>${n(String(o.qtyPerPackage))} × ${n(String(d))} × ${n(String(F))}</td>
                <td>${n(String((o.unitPrice||0).toFixed?o.unitPrice.toFixed(2):o.unitPrice))}</td>
                <td>${n(String((o.perDayTotal*F).toFixed?(o.perDayTotal*F).toFixed(2):o.perDayTotal*F))}</td>
              </tr>`).join("");L=p||""}catch{}else{const w=m(r),M=w?0:d*b,c=w?d*b:M*F;S+=M,v+=c}return`
          <tr>
            <td>${s+1}</td>
            <td>${$(String(r?.description||"-"))}</td>
            <td>${P}</td>
            <td>${n(String(d))}</td>
            <td>${n(String(b.toFixed?b.toFixed(2):b))}</td>
            <td>${n(String(u.toFixed?u.toFixed(2):u))}</td>
          </tr>${L}`}).join("");Pt=`
        <details class="reservation-finance-debug" style="margin-top:12px">
          <summary>Debug: تفصيل التسعير</summary>
          <div style="padding:8px 0; font-size: 12px">
            <div>الأيام: ${n(String(F))}</div>
            <div style="margin-top:6px"><strong>مجاميع سريعة:</strong></div>
            <div>من الحِزم (يومي): ${n(String(h.toFixed(2)))} ${_}</div>
            <div>من الحِزم (كامل المدة): ${n(String(y.toFixed(2)))} ${_}</div>
            <div>مفردة خارج الحِزم (يومي): ${n(String(S.toFixed(2)))} ${_}</div>
            <div>مفردة خارج الحِزم (كامل المدة): ${n(String(v.toFixed(2)))} ${_}</div>
            <div style="margin-top:4px">Equipment Total (breakdown): ${n(String(Y.toFixed(2)))} ${_}</div>
            <table class="table table-xs" style="width:100%; margin-top:8px">
              <thead>
                <tr>
                  <th>#</th><th>الوصف</th><th>النوع</th><th>الكمية</th><th>سعر الوحدة</th><th>المساهمة</th>
                </tr>
              </thead>
              <tbody>${q}</tbody>
            </table>
          </div>
        </details>`,console.debug("[finance-debug] groups",D,{rentalDays:F,equipmentTotal:Y,crewTotal:_t,discountAmount:Z,taxAmount:at})}}catch{}console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let k=[];ut&&N&&(Array.isArray(N.paymentHistory)?k=N.paymentHistory:Array.isArray(N.payment_history)?k=N.payment_history:Array.isArray(N.payments)?k=N.payments:Array.isArray(N.paymentLogs)&&(k=N.paymentLogs)),(!Array.isArray(k)||k.length===0)&&(Array.isArray(e.paymentHistory)?k=e.paymentHistory:Array.isArray(e.payment_history)?k=e.payment_history:Array.isArray(e.paymentLogs)?k=e.paymentLogs:k=[]);const wt=Array.isArray(k)?k:[],aa=wt.length?`<ul class="reservation-payment-history-list">${wt.map(t=>{const i=t?.type==="amount"?a("reservations.paymentHistory.type.amount","دفعة مالية"):t?.type==="percent"?a("reservations.paymentHistory.type.percent","دفعة نسبة"):a("reservations.paymentHistory.type.unknown","دفعة"),l=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?`${n(Number(t.amount).toFixed(2))} ${_}`:"—",m=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${n(Number(t.percentage).toFixed(2))}%`:"—",h=t?.recordedAt?n(lt(t.recordedAt)):"—",y=t?.note?`<div class="payment-history-note">${$(n(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${$(i)}</span>
              <span class="payment-history-entry__amount">${l}</span>
              <span class="payment-history-entry__percent">${m}</span>
              <span class="payment-history-entry__date">${h}</span>
            </div>
            ${y}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${$(Me)}</div>`,Nt=String(e?.status||e?.reservationStatus||"").toLowerCase(),Lt=Nt==="cancelled"||Nt==="canceled",kt=Lt?[{text:a("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:At,className:J==="paid"?"status-paid":nt?"status-partial":"status-unpaid"}]:[{text:pt?ue:pe,className:pt?"status-confirmed":"status-pending"},{text:At,className:J==="paid"?"status-paid":nt?"status-partial":"status-unpaid"}];Dt&&!Lt&&kt.push({text:he,className:"status-completed"});const ia=kt.map(({text:t,className:i})=>`<span class="status-chip ${i}">${t}</span>`).join(""),j=(t,i,l)=>`
    <div class="res-info-row">
      <span class="label">${t} ${i}</span>
      <span class="value">${l}</span>
    </div>
  `;let rt="";if(e.projectId){let t=$(Fe);if(N){const i=N.title||a("projects.fallback.untitled","مشروع بدون اسم");t=`${$(i)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${N.id}">${$(Te)}</button>`}rt=`
      <div class="res-info-row">
        <span class="label">📁 ${Ce}</span>
        <span class="value">${t}</span>
      </div>
    `}const H=[];H.push(j("👤",Le,f?.customerName||e.customerName||Be)),H.push(j("📞",ke,f?.phone||"—")),H.push(j("🗓️",De,Ut)),H.push(j("🗓️",ge,Qt)),H.push(j("📦",Ee,xt)),H.push(j("⏱️",ne,Zt)),H.push(j("📝",qe,Qe)),rt&&H.push(rt);const na=H.join(""),sa=D.length?D.map(t=>{const i=t.items[0]||{},l=Aa(i)||t.image,m=l?`<img src="${l}" alt="${re}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let h=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)h=[...t.packageItems];else{const c=[];t.items.forEach(p=>{Array.isArray(p?.packageItems)&&p.packageItems.length&&c.push(...p.packageItems)}),h=c}if(Array.isArray(h)&&h.length>1){const c=new Set;h=h.filter(p=>{const o=p?.normalizedBarcode&&String(p.normalizedBarcode).toLowerCase()||p?.barcode&&String(p.barcode).toLowerCase()||(p?.equipmentId!=null?`id:${p.equipmentId}`:null);return o?c.has(o)?!1:(c.add(o),!0):!0})}const y=st(t)||t.items.some(c=>st(c))||h.length>0,S=(c,{fallback:p=1,max:o=1e3}={})=>{const x=je(c);return Number.isFinite(x)&&x>0?Math.min(o,x):p};let v;if(y){const c=S(i?.qty??i?.quantity??i?.count,{fallback:NaN,max:999});Number.isFinite(c)&&c>0?v=c:v=S(t.quantity??t.count??1,{fallback:1,max:999})}else v=S(t.quantity??t.count??i?.qty??i?.quantity??i?.count??0,{fallback:1,max:9999});const q=n(String(v)),r=(c,{preferPositive:p=!1}={})=>{let o=Number.NaN;for(const x of c){const I=C(x);if(Number.isFinite(I)){if(p&&I>0)return I;Number.isFinite(o)||(o=I)}}return o};let s,d;if(y){const c=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(s=r(c,{preferPositive:!0}),!Number.isFinite(s)||s<0){const o=C(t.totalPrice??i?.total??i?.total_price);Number.isFinite(o)&&v>0&&(s=o/v)}Number.isFinite(s)||(s=0);const p=[i?.total,i?.total_price,t.totalPrice];if(d=r(p),!Number.isFinite(d))d=s*v;else{const o=s*v;Number.isFinite(o)&&o>0&&Math.abs(d-o)>o*.25&&(d=o)}}else{const c=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(s=r(c,{preferPositive:!0}),!Number.isFinite(s)||s<0){const p=C(t.totalPrice??i?.total??i?.total_price);Number.isFinite(p)&&v>0&&(s=p/v)}Number.isFinite(s)||(s=0),d=C(t.totalPrice??i?.total??i?.total_price),Number.isFinite(d)||(d=s*v)}s=A(s),d=A(d);const b=`${n(s.toFixed(2))} ${_}`,P=`${n(d.toFixed(2))} ${_}`,u=t.barcodes.map(c=>n(String(c||""))).filter(Boolean),L=u.length?`<details class="reservation-item-barcodes">
              <summary>${a("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${u.map(c=>`<li>${c}</li>`).join("")}
              </ul>
            </details>`:"";let w="";if(h.length){const c=new Map,p=o=>1;if(h.forEach(o=>{if(!o)return;const x=G(o.barcode||o.normalizedBarcode||o.desc||Math.random());if(!x)return;const I=c.get(x),U=p();if(I){I.qty=U,I.total=U;return}c.set(x,{desc:o.desc||o.barcode||a("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(U,99)),total:Math.max(1,Math.min(U,99)),barcode:o.barcode??o.normalizedBarcode??""})}),c.size){const o=Array.from(c.values()).map(x=>{const I=n(String(x.qty>0?Math.min(x.qty,99):1)),U=$(x.desc||""),ca=x.barcode?` <span class="reservation-package-items__barcode">(${$(n(String(x.barcode)))})</span>`:"";return`<li>${U}${ca} × ${I}</li>`}).join("");w=`
              <details class="reservation-package-items">
                <summary>${a("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${o}
                </ul>
              </details>
            `}}const M=y?`${w||""}${L||""}`:L;return`
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
            <td class="reservation-modal-items-table__cell" data-label="${$(E.total)}">${P}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${$(E.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${le}</td></tr>`,oa=`
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
        <tbody>${sa}</tbody>
      </table>
    </div>
  `,Ct=K.map((t,i)=>{const l=n(String(i+1));let m=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!m||m.trim()==="")&&(m=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!m||m.trim()==="")try{const b=typeof Q=="function"?Q():[],P=t.positionId?b.find(w=>String(w.id)===String(t.positionId)):null,u=!P&&t.positionKey?b.find(w=>String(w.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,L=P||u||null;L&&(m=L.labelAr||L.labelEn||L.name||m)}catch{}const h=ct(m)||a("reservations.crew.positionFallback","منصب بدون اسم"),y=ct(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),S=ct(t.technicianName)||a("technicians.picker.noTechnicianOption","— بدون تعيين —"),v=t.technicianPhone||de,q=A(C(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0));let r=A(C(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0));if(!Number.isFinite(r)||r<=0)try{const b=Q?Q():[],P=t.positionId?b.find(w=>String(w.id)===String(t.positionId)):null,u=!P&&t.positionKey?b.find(w=>String(w.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,L=P||u||null;L&&Number.isFinite(Number(L.clientPrice))&&(r=A(Number(L.clientPrice)))}catch{}const s=`${n(r.toFixed(2))} ${_}`,d=q>0?`${n(q.toFixed(2))} ${_}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${l}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${S}</span>
            <small class="text-muted">🏷️ ${h}${y?` — ${y}`:""}</small>
            <small class="text-muted">💼 ${s}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${v}</div>
          ${d?`<div>💵 ${a("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${d}</div>`:""}
        </div>
      </div>
    `}).join(""),ra=Array.isArray(K)&&K.length>4,la=K.length?ra?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${$(a("reservations.details.slider.prev","السابق"))}" title="${$(a("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Ct}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${$(a("reservations.details.slider.next","التالي"))}" title="${$(a("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Ct}</div>`:`<ul class="reservation-modal-technicians"><li>${ce}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${ve}</span>
          <strong>${Kt}</strong>
        </div>
        <div class="status-chips">
          ${ia}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${fe}</h6>
          ${na}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${_e}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${ea}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${He}</h6>
              ${aa}
            </div>
            ${Pt}
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Se}</span>
          <span class="count">${Ue}</span>
        </div>
        ${la}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${xe}</span>
          <span class="count">${xt}</span>
        </div>
        ${oa}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${B}">
          ${a("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${B}">${we}</button>
        ${Et?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${B}">${Ne}</button>`:""}
      </div>
    </div>
  `}export{ga as a,qa as b,xa as f,Sa as g,Da as i,Aa as r};
