import{d as ut,v as da,n as s,y as ct,t as i}from"./auth.B4XUmSYg.js";import{n as W,i as Q,j as Ct}from"./state.DnWIUPO4.js";import{a as ua,i as pa,A as ma,y as S,z as C,b as ya,e as ba,J as ha}from"./reservationsService.DZ-N01gk.js";const va=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),fa=new Set(["maintenance","reserved","retired"]);function _a(e){const _=String(e??"").trim().toLowerCase();return _&&va.get(_)||"available"}function $a(e){return e?typeof e=="object"?e:xa(e):null}function Aa(e){const _=$a(e);return _?_a(_.status||_.state||_.statusLabel||_.status_label):"available"}function Da(e){return!fa.has(Aa(e))}function Sa(e={}){return e.image||e.imageUrl||e.img||""}function ga(e){if(!e)return null;const _=W(e),{equipment:z=[]}=ut();return(z||[]).find(B=>W(B?.barcode)===_)||null}function xa(e){const _=W(e);if(!_)return null;const{equipment:z=[]}=ut();return(z||[]).find(B=>W(B?.barcode)===_)||null}function A(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function dt(e){if(e==null)return"";const _=String(e).trim();return _?s(_):""}function qa(e,_,z=[],B,N=null){const{projectLinked:pt,effectiveConfirmed:mt}=ua(e,N),Tt=e.paid===!0||e.paid==="paid",Dt=pa(e),X=e.items||[];let{groups:g}=ma(e);const gt=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(a=>a&&a.type==="package"))),qt=t=>{const a=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return s(a)},yt=(t,a)=>{const l=b=>{const f=Array.isArray(b?.items)?b.items[0]:null,h=[f?.price,f?.unit_price,f?.unitPrice,b?.unitPrice,b?.totalPrice];for(const F of h){const o=C(F);if(Number.isFinite(o)&&o>0)return o}return 0},u=l(t),y=l(a);return u&&y?u<=y?t:a:u?t:a},q=[],V=new Map;g.forEach(t=>{if(!gt(t)){q.push(t);return}const a=qt(t);if(!a){if(!V.has("__unknown__"))V.set("__unknown__",q.length),q.push(t);else{const l=V.get("__unknown__");q[l]=yt(q[l],t)}return}if(!V.has(a))V.set(a,q.length),q.push(t);else{const l=V.get(a);q[l]=yt(q[l],t)}}),g=q;const{technicians:bt=[]}=ut(),It=[].concat(Array.isArray(z)?z:[]).concat(Array.isArray(bt)?bt:[]),Y=new Map;It.forEach(t=>{if(!t||t.id==null)return;const a=String(t.id),l=Y.get(a)||{};Y.set(a,{...l,...t})});const K=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,a)=>{const l=t?.technicianId!=null?Y.get(String(t.technicianId)):null;let u=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!u||u.trim()==="")&&(u=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const y=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let b=u,f=y;if(!b||b.trim()==="")try{const o=Q?Q():[];let n=null;if(t.positionId!=null&&(n=o.find(d=>String(d.id)===String(t.positionId))||null),!n){const d=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(d&&(n=typeof Ct=="function"?Ct(d):null,!n&&o.length)){const v=String(d).trim().toLowerCase();n=o.find(w=>[w.name,w.labelAr,w.labelEn].filter(Boolean).map(p=>String(p).toLowerCase()).includes(v))||null}}n&&(b=n.labelAr||n.labelEn||n.name||"",(!f||String(f).trim()==="")&&(n.labelAr&&n.labelEn?f=b===n.labelAr?n.labelEn:n.labelAr:f=n.labelAr||n.labelEn||""))}catch{}const h=S(C(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??l?.dailyWage??l?.wage??0)),F=S(C(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${a}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:b,positionLabelAlt:f,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:h,positionClientPrice:F,technicianId:t.technicianId!=null?String(t.technicianId):l?.id!=null?String(l.id):null,technicianName:t.technicianName??t.technician_name??l?.name??null,technicianRole:t.technicianRole??l?.role??null,technicianPhone:t.technicianPhone??l?.phone??null,notes:t.notes??null}}),Et=da(),T=ya(e.start,e.end),Rt=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,ht=C(Rt),Ht=Number.isFinite(ht)?ht:0,Mt=e.discountType??e.discount_type??e.discountMode??"percent",Bt=String(Mt).toLowerCase()==="amount"?"amount":"percent",vt=!!(e.applyTax??e.apply_tax??e.taxApplied),ft=C(e.cost??e.total??e.finalTotal);Number.isFinite(ft)&&S(ft);const _t=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,J=_t!=null?C(_t):Number.NaN,jt=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(J)&&J>0)&&Number.isFinite(J)?J:0,D=ba({items:X,technicianIds:e.technicians||[],crewAssignments:K,discount:Ht,discountType:Bt,applyTax:vt,start:e.start,end:e.end,companySharePercent:jt,groupingSource:e}),Z=S(D.equipmentTotal),$t=S(D.crewTotal),zt=S(D.crewCostTotal),tt=S(D.discountAmount),Vt=S(D.subtotalAfterDiscount),et=Number.isFinite(D.companySharePercent)?D.companySharePercent:0;let at=S(D.companyShareAmount);at=et>0?S(Math.max(0,at)):0;const it=S(D.taxAmount),G=S(D.finalTotal),At=S(D.netProfit),Kt=s(String(e.reservationId??e.id??"")),Ut=e.start?s(ct(e.start)):"-",Qt=e.end?s(ct(e.end)):"-",Gt=s(String(K.length)),Wt=s(Z.toFixed(2)),Jt=s(tt.toFixed(2)),Ot=s(Vt.toFixed(2)),Xt=s(it.toFixed(2)),Yt=s((Number.isFinite(G)?G:0).toFixed(2)),Zt=s(String(T)),$=i("reservations.create.summary.currency","SR"),te=i("reservations.details.labels.discount","الخصم"),ee=i("reservations.details.labels.tax","الضريبة (15%)"),ae=i("reservations.details.labels.crewTotal","إجمالي الفريق"),ie=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ne=i("reservations.details.labels.duration","عدد الأيام"),se=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),oe=i("reservations.details.labels.netProfit","💵 صافي الربح"),re=i("reservations.create.equipment.imageAlt","صورة"),E={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},le=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),ce=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");i("reservations.details.technicians.roleUnknown","غير محدد");const de=i("reservations.details.technicians.phoneUnknown","غير متوفر");i("reservations.details.technicians.wage","{amount} {currency} / اليوم");const ue=i("reservations.list.status.confirmed","✅ مؤكد"),pe=i("reservations.list.status.pending","⏳ غير مؤكد"),me=i("reservations.list.payment.paid","💳 مدفوع"),ye=i("reservations.list.payment.unpaid","💳 غير مدفوع"),be=i("reservations.list.payment.partial","💳 مدفوع جزئياً"),he=i("reservations.list.status.completed","📁 منتهي"),ve=i("reservations.details.labels.id","🆔 رقم الحجز"),fe=i("reservations.details.section.bookingInfo","بيانات الحجز"),_e=i("reservations.details.section.paymentSummary","ملخص الدفع"),$e=i("reservations.details.labels.finalTotal","المجموع النهائي"),Ae=i("reservations.details.section.crew","😎 الفريق الفني"),Se=i("reservations.details.crew.count","{count} عضو"),xe=i("reservations.details.section.items","📦 المعدات المرتبطة"),we=i("reservations.details.items.count","{count} عنصر"),Pe=i("reservations.details.actions.edit","✏️ تعديل"),Ne=i("reservations.details.actions.delete","🗑️ حذف"),Le=i("reservations.details.labels.customer","العميل"),ke=i("reservations.details.labels.contact","رقم التواصل"),Fe=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Ce=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Te=i("reservations.details.actions.openProject","📁 فتح المشروع"),De=i("reservations.details.labels.start","بداية الحجز"),ge=i("reservations.details.labels.end","نهاية الحجز"),qe=i("reservations.details.labels.notes","ملاحظات"),Ie=i("reservations.list.noNotes","لا توجد ملاحظات"),Ee=i("reservations.details.labels.itemsCount","عدد المعدات"),Re=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),He=i("reservations.paymentHistory.title","سجل الدفعات"),Me=i("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Be=i("reservations.list.unknownCustomer","غير معروف"),nt=typeof N?.paymentStatus=="string"?N.paymentStatus.toLowerCase():null,O=pt&&nt&&["paid","partial","unpaid"].includes(nt)?nt:e.paidStatus??e.paid_status??(Tt?"paid":"unpaid"),st=O==="partial",St=O==="paid"?me:st?be:ye;function je(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const a=String(t).replace(/[^0-9.+-]/g,""),l=Number(a);return Number.isFinite(l)?l:Number.NaN}const ot=(t={})=>{const a=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(a)||Array.isArray(t.packageItems)&&t.packageItems.length)},ze=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(a=>a!=null&&a!==""),Ve=(t={})=>!t||typeof t!="object"?!1:!ot(t)&&ze(t);let rt=Array.isArray(g)&&g.length?g.length:(Array.isArray(X)?X.filter(t=>t&&typeof t=="object"&&!Ve(t)).length:0)||1;rt=Math.max(1,Math.round(rt));const Ke=s(String(rt)),xt=we.replace("{count}",Ke),Ue=Se.replace("{count}",Gt),Qe=e.notes?s(e.notes):Ie,Ge=s($t.toFixed(2)),We=s(zt.toFixed(2)),Je=s(String(et)),Oe=s(at.toFixed(2)),Xe=`${Je}% (${Oe} ${$})`,Ye=Number.isFinite(At)?Math.max(0,At):0,Ze=s(Ye.toFixed(2)),R=[{icon:"💼",label:Re,value:`${Wt} ${$}`}];R.push({icon:"😎",label:ae,value:`${Ge} ${$}`});const ta=i("reservations.details.labels.crewCost","تكلفة الفريق");R.push({icon:"💵",label:ta,value:`${We} ${$}`}),tt>0&&R.push({icon:"💸",label:te,value:`${Jt} ${$}`}),R.push({icon:"📊",label:ie,value:`${Ot} ${$}`}),vt&&it>0&&R.push({icon:"🧾",label:ee,value:`${Xt} ${$}`}),et>0&&R.push({icon:"🏦",label:se,value:Xe}),R.push({icon:"💵",label:oe,value:`${Ze} ${$}`}),R.push({icon:"💰",label:$e,value:`${Yt} ${$}`});const ea=R.map(({icon:t,label:a,value:l})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${a}</span>
      <span class="summary-details-value">${l}</span>
    </div>
  `).join("");let wt="";try{const a=new URL(window.location.href).searchParams.get("debugFinance");if(a==="1"||a==="true"){const l=o=>(o?.type||"").toLowerCase()==="package"&&String(o?.pricingMode||"").toLowerCase()==="fixed"?"fixed":"daily",u=o=>{if((o?.type||"").toLowerCase()==="package")return!1;const n=Array.isArray(o?.items)?o.items:[];if(!n.length)return!1;if(n.some(p=>p?.reservation_id!=null||p?.reservationId!=null))return!0;const v=n.every(p=>p?.unit_price!=null||p?.unitPrice!=null),w=n.some(p=>p?.daily_rate!=null||p?.dailyRate!=null||p?.unit_rate!=null||p?.unitRate!=null||p?.price!=null);return v&&!w};let y=0,b=0,f=0,h=0;const F=(Array.isArray(g)?g:[]).map((o,n)=>{const d=Number.isFinite(Number(o?.quantity))?Number(o.quantity):0,v=Number.isFinite(Number(o?.unitPrice))?Number(o.unitPrice):0,w=l(o);let p=w==="fixed"?d*v:d*v*T,L="";if((o?.type||"").toLowerCase()==="package")try{const P={package_code:o?.package_code||o?.packageDisplayCode||o?.barcode||o?.packageId||o?.key,packageItems:Array.isArray(o?.packageItems)?o.packageItems:void 0},M=Number(o?.unitPrice);let c;if(Number.isFinite(M)&&M>0)c=d*M;else{const r=ha(P,{packageQuantity:d,days:T});c=Number.isFinite(Number(r.perDayTotal))?Number(r.perDayTotal):d*v}p=c*T,y+=c,b+=p;const m=(pricing.lines||[]).map((r,x)=>`
              <tr>
                <td colspan="2"></td>
                <td>• ${A(String(r.desc||r.barcode||"item"))}</td>
                <td>${s(String(r.qtyPerPackage))} × ${s(String(d))} × ${s(String(T))}</td>
                <td>${s(String((r.unitPrice||0).toFixed?r.unitPrice.toFixed(2):r.unitPrice))}</td>
                <td>${s(String((r.perDayTotal*T).toFixed?(r.perDayTotal*T).toFixed(2):r.perDayTotal*T))}</td>
              </tr>`).join("");L=m||""}catch{}else{const P=u(o),M=P?0:d*v,c=P?d*v:M*T;f+=M,h+=c}return`
          <tr>
            <td>${n+1}</td>
            <td>${A(String(o?.description||"-"))}</td>
            <td>${w}</td>
            <td>${s(String(d))}</td>
            <td>${s(String(v.toFixed?v.toFixed(2):v))}</td>
            <td>${s(String(p.toFixed?p.toFixed(2):p))}</td>
          </tr>${L}`}).join("");wt=`
        <details class="reservation-finance-debug" style="margin-top:12px">
          <summary>Debug: تفصيل التسعير</summary>
          <div style="padding:8px 0; font-size: 12px">
            <div>الأيام: ${s(String(T))}</div>
            <div style="margin-top:6px"><strong>مجاميع سريعة:</strong></div>
            <div>من الحِزم (يومي): ${s(String(y.toFixed(2)))} ${$}</div>
            <div>من الحِزم (كامل المدة): ${s(String(b.toFixed(2)))} ${$}</div>
            <div>مفردة خارج الحِزم (يومي): ${s(String(f.toFixed(2)))} ${$}</div>
            <div>مفردة خارج الحِزم (كامل المدة): ${s(String(h.toFixed(2)))} ${$}</div>
            <div style="margin-top:4px">Equipment Total (breakdown): ${s(String(Z.toFixed(2)))} ${$}</div>
            <table class="table table-xs" style="width:100%; margin-top:8px">
              <thead>
                <tr>
                  <th>#</th><th>الوصف</th><th>النوع</th><th>الكمية</th><th>سعر الوحدة</th><th>المساهمة</th>
                </tr>
              </thead>
              <tbody>${F}</tbody>
            </table>
          </div>
        </details>`,console.debug("[finance-debug] groups",g,{rentalDays:T,equipmentTotal:Z,crewTotal:$t,discountAmount:tt,taxAmount:it})}}catch{}console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let k=[];pt&&N&&(Array.isArray(N.paymentHistory)?k=N.paymentHistory:Array.isArray(N.payment_history)?k=N.payment_history:Array.isArray(N.payments)?k=N.payments:Array.isArray(N.paymentLogs)&&(k=N.paymentLogs)),(!Array.isArray(k)||k.length===0)&&(Array.isArray(e.paymentHistory)?k=e.paymentHistory:Array.isArray(e.payment_history)?k=e.payment_history:Array.isArray(e.paymentLogs)?k=e.paymentLogs:k=[]);const Pt=Array.isArray(k)?k:[],aa=Pt.length?`<ul class="reservation-payment-history-list">${Pt.map(t=>{const a=typeof t?.type=="string"?t.type.toLowerCase():"",l=a==="amount"?i("reservations.paymentHistory.type.amount","دفعة مالية"):a==="percent"?i("reservations.paymentHistory.type.percent","دفعة نسبة"):i("reservations.paymentHistory.type.unknown","دفعة"),u=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?Number(t.percentage):Number.isFinite(Number(t?.value))&&a==="percent"?Number(t.value):null,y=u!=null&&Number.isFinite(Number(G))&&Number(G)>0?Math.round(Number(G)*(u/100)*100)/100:null,b=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?Number(t.amount):null,f=a==="percent"&&y!=null?y:b,h=f!=null?`${s(f.toFixed(2))} ${$}`:"—",F=u!=null?`${s(u.toFixed(2))}%`:"—",o=t?.recordedAt?s(ct(t.recordedAt)):"—",n=t?.note?`<div class="payment-history-note">${A(s(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${A(l)}</span>
              <span class="payment-history-entry__amount">${h}</span>
              <span class="payment-history-entry__percent">${F}</span>
              <span class="payment-history-entry__date">${o}</span>
            </div>
            ${n}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${A(Me)}</div>`,Nt=String(e?.status||e?.reservationStatus||"").toLowerCase(),Lt=Nt==="cancelled"||Nt==="canceled",kt=Lt?[{text:i("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:St,className:O==="paid"?"status-paid":st?"status-partial":"status-unpaid"}]:[{text:mt?ue:pe,className:mt?"status-confirmed":"status-pending"},{text:St,className:O==="paid"?"status-paid":st?"status-partial":"status-unpaid"}];Dt&&!Lt&&kt.push({text:he,className:"status-completed"});const ia=kt.map(({text:t,className:a})=>`<span class="status-chip ${a}">${t}</span>`).join(""),j=(t,a,l)=>`
    <div class="res-info-row">
      <span class="label">${t} ${a}</span>
      <span class="value">${l}</span>
    </div>
  `;let lt="";if(e.projectId){let t=A(Ce);if(N){const a=N.title||i("projects.fallback.untitled","مشروع بدون اسم");t=`${A(a)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${N.id}">${A(Te)}</button>`}lt=`
      <div class="res-info-row">
        <span class="label">📁 ${Fe}</span>
        <span class="value">${t}</span>
      </div>
    `}const H=[];H.push(j("👤",Le,_?.customerName||e.customerName||Be)),H.push(j("📞",ke,_?.phone||"—")),H.push(j("🗓️",De,Ut)),H.push(j("🗓️",ge,Qt)),H.push(j("📦",Ee,xt)),H.push(j("⏱️",ne,Zt)),H.push(j("📝",qe,Qe)),lt&&H.push(lt);const na=H.join(""),sa=g.length?g.map(t=>{const a=t.items[0]||{},l=Sa(a)||t.image,u=l?`<img src="${l}" alt="${re}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let y=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)y=[...t.packageItems];else{const c=[];t.items.forEach(m=>{Array.isArray(m?.packageItems)&&m.packageItems.length&&c.push(...m.packageItems)}),y=c}if(Array.isArray(y)&&y.length>1){const c=new Set;y=y.filter(m=>{const r=m?.normalizedBarcode&&String(m.normalizedBarcode).toLowerCase()||m?.barcode&&String(m.barcode).toLowerCase()||(m?.equipmentId!=null?`id:${m.equipmentId}`:null);return r?c.has(r)?!1:(c.add(r),!0):!0})}const b=ot(t)||t.items.some(c=>ot(c))||y.length>0,f=(c,{fallback:m=1,max:r=1e3}={})=>{const x=je(c);return Number.isFinite(x)&&x>0?Math.min(r,x):m};let h;if(b){const c=f(a?.qty??a?.quantity??a?.count,{fallback:NaN,max:999});Number.isFinite(c)&&c>0?h=c:h=f(t.quantity??t.count??1,{fallback:1,max:999})}else h=f(t.quantity??t.count??a?.qty??a?.quantity??a?.count??0,{fallback:1,max:9999});const F=s(String(h)),o=(c,{preferPositive:m=!1}={})=>{let r=Number.NaN;for(const x of c){const I=C(x);if(Number.isFinite(I)){if(m&&I>0)return I;Number.isFinite(r)||(r=I)}}return r};let n,d;if(b){const c=[a?.price,a?.unit_price,a?.unitPrice,t.unitPrice];if(n=o(c,{preferPositive:!0}),!Number.isFinite(n)||n<0){const r=C(t.totalPrice??a?.total??a?.total_price);Number.isFinite(r)&&h>0&&(n=r/h)}Number.isFinite(n)||(n=0);const m=[a?.total,a?.total_price,t.totalPrice];if(d=o(m),!Number.isFinite(d))d=n*h;else{const r=n*h;Number.isFinite(r)&&r>0&&Math.abs(d-r)>r*.25&&(d=r)}}else{const c=[a?.price,a?.unit_price,a?.unitPrice,t.unitPrice];if(n=o(c,{preferPositive:!0}),!Number.isFinite(n)||n<0){const m=C(t.totalPrice??a?.total??a?.total_price);Number.isFinite(m)&&h>0&&(n=m/h)}Number.isFinite(n)||(n=0),d=C(t.totalPrice??a?.total??a?.total_price),Number.isFinite(d)||(d=n*h)}n=S(n),d=S(d);const v=`${s(n.toFixed(2))} ${$}`,w=`${s(d.toFixed(2))} ${$}`,p=t.barcodes.map(c=>s(String(c||""))).filter(Boolean),L=p.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${p.map(c=>`<li>${c}</li>`).join("")}
              </ul>
            </details>`:"";let P="";if(y.length){const c=new Map,m=r=>1;if(y.forEach(r=>{if(!r)return;const x=W(r.barcode||r.normalizedBarcode||r.desc||Math.random());if(!x)return;const I=c.get(x),U=m();if(I){I.qty=U,I.total=U;return}c.set(x,{desc:r.desc||r.barcode||i("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(U,99)),total:Math.max(1,Math.min(U,99)),barcode:r.barcode??r.normalizedBarcode??""})}),c.size){const r=Array.from(c.values()).map(x=>{const I=s(String(x.qty>0?Math.min(x.qty,99):1)),U=A(x.desc||""),ca=x.barcode?` <span class="reservation-package-items__barcode">(${A(s(String(x.barcode)))})</span>`:"";return`<li>${U}${ca} × ${I}</li>`}).join("");P=`
              <details class="reservation-package-items">
                <summary>${i("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${r}
                </ul>
              </details>
            `}}const M=b?`${P||""}${L||""}`:L;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${u}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${A(a.desc||a.description||a.name||t.description||"-")}</div>
                  ${M}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${A(E.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${F}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${A(E.unitPrice)}">${v}</td>
            <td class="reservation-modal-items-table__cell" data-label="${A(E.total)}">${w}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${A(E.actions)}">
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
  `,Ft=K.map((t,a)=>{const l=s(String(a+1));let u=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!u||u.trim()==="")&&(u=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!u||u.trim()==="")try{const v=typeof Q=="function"?Q():[],w=t.positionId?v.find(P=>String(P.id)===String(t.positionId)):null,p=!w&&t.positionKey?v.find(P=>String(P.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,L=w||p||null;L&&(u=L.labelAr||L.labelEn||L.name||u)}catch{}const y=dt(u)||i("reservations.crew.positionFallback","منصب بدون اسم"),b=dt(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),f=dt(t.technicianName)||i("technicians.picker.noTechnicianOption","— بدون تعيين —"),h=t.technicianPhone||de,F=S(C(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0));let o=S(C(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0));if(!Number.isFinite(o)||o<=0)try{const v=Q?Q():[],w=t.positionId?v.find(P=>String(P.id)===String(t.positionId)):null,p=!w&&t.positionKey?v.find(P=>String(P.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,L=w||p||null;L&&Number.isFinite(Number(L.clientPrice))&&(o=S(Number(L.clientPrice)))}catch{}const n=`${s(o.toFixed(2))} ${$}`,d=F>0?`${s(F.toFixed(2))} ${$}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${l}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${f}</span>
            <small class="text-muted">🏷️ ${y}${b?` — ${b}`:""}</small>
            <small class="text-muted">💼 ${n}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${h}</div>
          ${d?`<div>💵 ${i("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${d}</div>`:""}
        </div>
      </div>
    `}).join(""),ra=Array.isArray(K)&&K.length>4,la=K.length?ra?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${A(i("reservations.details.slider.prev","السابق"))}" title="${A(i("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Ft}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${A(i("reservations.details.slider.next","التالي"))}" title="${A(i("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Ft}</div>`:`<ul class="reservation-modal-technicians"><li>${ce}</li></ul>`;return`
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
            ${wt}
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Ae}</span>
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
          ${i("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${B}">${Pe}</button>
        ${Et?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${B}">${Ne}</button>`:""}
      </div>
    </div>
  `}export{ga as a,qa as b,xa as f,Aa as g,Da as i,Sa as r};
