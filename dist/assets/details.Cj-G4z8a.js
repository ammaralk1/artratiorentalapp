import{d as ut,v as ya,n as s,y as ct,t as i}from"./auth.Blg4cy91.js";import{n as W,i as G,j as Tt}from"./state.DeD1_D7X.js";import{a as ba,x as ha,A as fa,C as S,B as C,b as va,d as _a,c as $a,e as Aa,J as Sa}from"./reservationsService.CFPVY1J3.js";const Pa=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),xa=new Set(["maintenance","reserved","retired"]);function Na(e){const $=String(e??"").trim().toLowerCase();return $&&Pa.get($)||"available"}function wa(e){return e?typeof e=="object"?e:ka(e):null}function Fa(e){const $=wa(e);return $?Na($.status||$.state||$.statusLabel||$.status_label):"available"}function Ra(e){return!xa.has(Fa(e))}function La(e={}){return e.image||e.imageUrl||e.img||""}function Ma(e){if(!e)return null;const $=W(e),{equipment:j=[]}=ut();return(j||[]).find(B=>W(B?.barcode)===$)||null}function ka(e){const $=W(e);if(!$)return null;const{equipment:j=[]}=ut();return(j||[]).find(B=>W(B?.barcode)===$)||null}function P(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function dt(e){if(e==null)return"";const $=String(e).trim();return $?s($):""}function Ba(e,$,j=[],B,y=null){const{projectLinked:pt,effectiveConfirmed:mt}=ba(e,y);e.paid===!0||e.paid;const Dt=ha(e),X=e.items||[];let{groups:D}=fa(e);const qt=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(a=>a&&a.type==="package"))),It=t=>{const a=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return s(a)},yt=(t,a)=>{const l=h=>{const _=Array.isArray(h?.items)?h.items[0]:null,f=[_?.price,_?.unit_price,_?.unitPrice,h?.unitPrice,h?.totalPrice];for(const k of f){const o=C(k);if(Number.isFinite(o)&&o>0)return o}return 0},u=l(t),b=l(a);return u&&b?u<=b?t:a:u?t:a},q=[],K=new Map;D.forEach(t=>{if(!qt(t)){q.push(t);return}const a=It(t);if(!a){if(!K.has("__unknown__"))K.set("__unknown__",q.length),q.push(t);else{const l=K.get("__unknown__");q[l]=yt(q[l],t)}return}if(!K.has(a))K.set(a,q.length),q.push(t);else{const l=K.get(a);q[l]=yt(q[l],t)}}),D=q;const{technicians:bt=[]}=ut(),Ht=[].concat(Array.isArray(j)?j:[]).concat(Array.isArray(bt)?bt:[]),Y=new Map;Ht.forEach(t=>{if(!t||t.id==null)return;const a=String(t.id),l=Y.get(a)||{};Y.set(a,{...l,...t})});const U=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,a)=>{const l=t?.technicianId!=null?Y.get(String(t.technicianId)):null;let u=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!u||u.trim()==="")&&(u=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const b=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let h=u,_=b;if(!h||h.trim()==="")try{const o=G?G():[];let n=null;if(t.positionId!=null&&(n=o.find(d=>String(d.id)===String(t.positionId))||null),!n){const d=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(d&&(n=typeof Tt=="function"?Tt(d):null,!n&&o.length)){const v=String(d).trim().toLowerCase();n=o.find(N=>[N.name,N.labelAr,N.labelEn].filter(Boolean).map(p=>String(p).toLowerCase()).includes(v))||null}}n&&(h=n.labelAr||n.labelEn||n.name||"",(!_||String(_).trim()==="")&&(n.labelAr&&n.labelEn?_=h===n.labelAr?n.labelEn:n.labelAr:_=n.labelAr||n.labelEn||""))}catch{}const f=S(C(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??l?.dailyWage??l?.wage??0)),k=S(C(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${a}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:h,positionLabelAlt:_,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:f,positionClientPrice:k,technicianId:t.technicianId!=null?String(t.technicianId):l?.id!=null?String(l.id):null,technicianName:t.technicianName??t.technician_name??l?.name??null,technicianRole:t.technicianRole??l?.role??null,technicianPhone:t.technicianPhone??l?.phone??null,notes:t.notes??null}}),Et=ya(),g=va(e.start,e.end),Rt=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,ht=C(Rt),Mt=Number.isFinite(ht)?ht:0,Bt=e.discountType??e.discount_type??e.discountMode??"percent",zt=String(Bt).toLowerCase()==="amount"?"amount":"percent",ft=!!(e.applyTax??e.apply_tax??e.taxApplied),vt=C(e.cost??e.total??e.finalTotal);Number.isFinite(vt)&&S(vt);const _t=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,J=_t!=null?C(_t):Number.NaN,Vt=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(J)&&J>0)&&Number.isFinite(J)?J:0,T=_a({items:X,technicianIds:e.technicians||[],crewAssignments:U,discount:Mt,discountType:zt,applyTax:ft,start:e.start,end:e.end,companySharePercent:Vt,groupingSource:e}),Z=S(T.equipmentTotal),$t=S(T.crewTotal),jt=S(T.crewCostTotal),tt=S(T.discountAmount),Kt=S(T.subtotalAfterDiscount),et=Number.isFinite(T.companySharePercent)?T.companySharePercent:0;let at=S(T.companyShareAmount);at=et>0?S(Math.max(0,at)):0;const it=S(T.taxAmount),H=S(T.finalTotal),At=S(T.netProfit),Ut=s(String(e.reservationId??e.id??"")),Qt=e.start?s(ct(e.start)):"-",Gt=e.end?s(ct(e.end)):"-",Wt=s(String(U.length)),Jt=s(Z.toFixed(2)),Ot=s(tt.toFixed(2)),Xt=s(Kt.toFixed(2)),Yt=s(it.toFixed(2)),Zt=s((Number.isFinite(H)?H:0).toFixed(2)),te=s(String(g)),A=i("reservations.create.summary.currency","SR"),ee=i("reservations.details.labels.discount","الخصم"),ae=i("reservations.details.labels.tax","الضريبة (15%)"),ie=i("reservations.details.labels.crewTotal","إجمالي الفريق"),ne=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),se=i("reservations.details.labels.duration","عدد الأيام"),oe=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),re=i("reservations.details.labels.netProfit","💵 صافي الربح"),le=i("reservations.create.equipment.imageAlt","صورة"),z={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},ce=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),de=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");i("reservations.details.technicians.roleUnknown","غير محدد");const ue=i("reservations.details.technicians.phoneUnknown","غير متوفر");i("reservations.details.technicians.wage","{amount} {currency} / اليوم");const pe=i("reservations.list.status.confirmed","✅ مؤكد"),me=i("reservations.list.status.pending","⏳ غير مؤكد"),ye=i("reservations.list.payment.paid","💳 مدفوع"),be=i("reservations.list.payment.unpaid","💳 غير مدفوع"),he=i("reservations.list.payment.partial","💳 مدفوع جزئياً"),fe=i("reservations.list.status.completed","📁 منتهي"),ve=i("reservations.details.labels.id","🆔 رقم الحجز"),_e=i("reservations.details.section.bookingInfo","بيانات الحجز"),$e=i("reservations.details.section.paymentSummary","ملخص الدفع"),Ae=i("reservations.details.labels.finalTotal","المجموع النهائي"),Se=i("reservations.details.section.crew","😎 الفريق الفني"),Pe=i("reservations.details.crew.count","{count} عضو"),xe=i("reservations.details.section.items","📦 المعدات المرتبطة"),Ne=i("reservations.details.items.count","{count} عنصر"),we=i("reservations.details.actions.edit","✏️ تعديل"),Fe=i("reservations.details.actions.delete","🗑️ حذف"),Le=i("reservations.details.labels.customer","العميل"),ke=i("reservations.details.labels.contact","رقم التواصل"),Ce=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const ge=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Te=i("reservations.details.actions.openProject","📁 فتح المشروع"),De=i("reservations.details.labels.start","بداية الحجز"),qe=i("reservations.details.labels.end","نهاية الحجز"),Ie=i("reservations.details.labels.notes","ملاحظات"),He=i("reservations.list.noNotes","لا توجد ملاحظات"),Ee=i("reservations.details.labels.itemsCount","عدد المعدات"),Re=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),Me=i("reservations.paymentHistory.title","سجل الدفعات"),Be=i("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),ze=i("reservations.list.unknownCustomer","غير معروف"),St=!pt||!y?[]:Array.isArray(y?.paymentHistory)?y.paymentHistory:Array.isArray(y?.payment_history)?y.payment_history:Array.isArray(y?.payments)?y.payments:Array.isArray(y?.paymentLogs)?y.paymentLogs:[],Ve=Array.isArray(e?.paymentHistory)?e.paymentHistory:Array.isArray(e?.payment_history)?e.payment_history:Array.isArray(e?.paymentLogs)?e.paymentLogs:[],nt=St.length?St:Ve,je=nt.length?0:Number(e.paidAmount??e.paid_amount)||0,Ke=nt.length?0:Number(e.paidPercent??e.paid_percentage)||0,Pt=$a({totalAmount:Number.isFinite(Number(H))?Number(H):0,paidAmount:je,paidPercent:Ke,history:nt}),O=Aa({manualStatus:null,paidAmount:Pt.paidAmount,paidPercent:Pt.paidPercent,totalAmount:Number.isFinite(Number(H))?Number(H):0}),st=O==="partial",xt=O==="paid"?ye:st?he:be;function Ue(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const a=String(t).replace(/[^0-9.+-]/g,""),l=Number(a);return Number.isFinite(l)?l:Number.NaN}const ot=(t={})=>{const a=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(a)||Array.isArray(t.packageItems)&&t.packageItems.length)},Qe=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(a=>a!=null&&a!==""),Ge=(t={})=>!t||typeof t!="object"?!1:!ot(t)&&Qe(t);let rt=Array.isArray(D)&&D.length?D.length:(Array.isArray(X)?X.filter(t=>t&&typeof t=="object"&&!Ge(t)).length:0)||1;rt=Math.max(1,Math.round(rt));const We=s(String(rt)),Nt=Ne.replace("{count}",We),Je=Pe.replace("{count}",Wt),Oe=e.notes?s(e.notes):He,Xe=s($t.toFixed(2)),Ye=s(jt.toFixed(2)),Ze=s(String(et)),ta=s(at.toFixed(2)),ea=`${Ze}% (${ta} ${A})`,aa=Number.isFinite(At)?Math.max(0,At):0,ia=s(aa.toFixed(2)),E=[{icon:"💼",label:Re,value:`${Jt} ${A}`}];E.push({icon:"😎",label:ie,value:`${Xe} ${A}`});const na=i("reservations.details.labels.crewCost","تكلفة الفريق");E.push({icon:"💵",label:na,value:`${Ye} ${A}`}),tt>0&&E.push({icon:"💸",label:ee,value:`${Ot} ${A}`}),E.push({icon:"📊",label:ne,value:`${Xt} ${A}`}),ft&&it>0&&E.push({icon:"🧾",label:ae,value:`${Yt} ${A}`}),et>0&&E.push({icon:"🏦",label:oe,value:ea}),E.push({icon:"💵",label:re,value:`${ia} ${A}`}),E.push({icon:"💰",label:Ae,value:`${Zt} ${A}`});const sa=E.map(({icon:t,label:a,value:l})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${a}</span>
      <span class="summary-details-value">${l}</span>
    </div>
  `).join("");let wt="";try{const a=new URL(window.location.href).searchParams.get("debugFinance");if(a==="1"||a==="true"){const l=o=>(o?.type||"").toLowerCase()==="package"&&String(o?.pricingMode||"").toLowerCase()==="fixed"?"fixed":"daily",u=o=>{if((o?.type||"").toLowerCase()==="package")return!1;const n=Array.isArray(o?.items)?o.items:[];if(!n.length)return!1;if(n.some(p=>p?.reservation_id!=null||p?.reservationId!=null))return!0;const v=n.every(p=>p?.unit_price!=null||p?.unitPrice!=null),N=n.some(p=>p?.daily_rate!=null||p?.dailyRate!=null||p?.unit_rate!=null||p?.unitRate!=null||p?.price!=null);return v&&!N};let b=0,h=0,_=0,f=0;const k=(Array.isArray(D)?D:[]).map((o,n)=>{const d=Number.isFinite(Number(o?.quantity))?Number(o.quantity):0,v=Number.isFinite(Number(o?.unitPrice))?Number(o.unitPrice):0,N=l(o);let p=N==="fixed"?d*v:d*v*g,F="";if((o?.type||"").toLowerCase()==="package")try{const w={package_code:o?.package_code||o?.packageDisplayCode||o?.barcode||o?.packageId||o?.key,packageItems:Array.isArray(o?.packageItems)?o.packageItems:void 0},M=Number(o?.unitPrice);let c;if(Number.isFinite(M)&&M>0)c=d*M;else{const r=Sa(w,{packageQuantity:d,days:g});c=Number.isFinite(Number(r.perDayTotal))?Number(r.perDayTotal):d*v}p=c*g,b+=c,h+=p;const m=(pricing.lines||[]).map((r,x)=>`
              <tr>
                <td colspan="2"></td>
                <td>• ${P(String(r.desc||r.barcode||"item"))}</td>
                <td>${s(String(r.qtyPerPackage))} × ${s(String(d))} × ${s(String(g))}</td>
                <td>${s(String((r.unitPrice||0).toFixed?r.unitPrice.toFixed(2):r.unitPrice))}</td>
                <td>${s(String((r.perDayTotal*g).toFixed?(r.perDayTotal*g).toFixed(2):r.perDayTotal*g))}</td>
              </tr>`).join("");F=m||""}catch{}else{const w=u(o),M=w?0:d*v,c=w?d*v:M*g;_+=M,f+=c}return`
          <tr>
            <td>${n+1}</td>
            <td>${P(String(o?.description||"-"))}</td>
            <td>${N}</td>
            <td>${s(String(d))}</td>
            <td>${s(String(v.toFixed?v.toFixed(2):v))}</td>
            <td>${s(String(p.toFixed?p.toFixed(2):p))}</td>
          </tr>${F}`}).join("");wt=`
        <details class="reservation-finance-debug" style="margin-top:12px">
          <summary>Debug: تفصيل التسعير</summary>
          <div style="padding:8px 0; font-size: 12px">
            <div>الأيام: ${s(String(g))}</div>
            <div style="margin-top:6px"><strong>مجاميع سريعة:</strong></div>
            <div>من الحِزم (يومي): ${s(String(b.toFixed(2)))} ${A}</div>
            <div>من الحِزم (كامل المدة): ${s(String(h.toFixed(2)))} ${A}</div>
            <div>مفردة خارج الحِزم (يومي): ${s(String(_.toFixed(2)))} ${A}</div>
            <div>مفردة خارج الحِزم (كامل المدة): ${s(String(f.toFixed(2)))} ${A}</div>
            <div style="margin-top:4px">Equipment Total (breakdown): ${s(String(Z.toFixed(2)))} ${A}</div>
            <table class="table table-xs" style="width:100%; margin-top:8px">
              <thead>
                <tr>
                  <th>#</th><th>الوصف</th><th>النوع</th><th>الكمية</th><th>سعر الوحدة</th><th>المساهمة</th>
                </tr>
              </thead>
              <tbody>${k}</tbody>
            </table>
          </div>
        </details>`,console.debug("[finance-debug] groups",D,{rentalDays:g,equipmentTotal:Z,crewTotal:$t,discountAmount:tt,taxAmount:it})}}catch{}console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let L=[];pt&&y&&(Array.isArray(y.paymentHistory)?L=y.paymentHistory:Array.isArray(y.payment_history)?L=y.payment_history:Array.isArray(y.payments)?L=y.payments:Array.isArray(y.paymentLogs)&&(L=y.paymentLogs)),(!Array.isArray(L)||L.length===0)&&(Array.isArray(e.paymentHistory)?L=e.paymentHistory:Array.isArray(e.payment_history)?L=e.payment_history:Array.isArray(e.paymentLogs)?L=e.paymentLogs:L=[]);const Ft=Array.isArray(L)?L:[],oa=Ft.length?`<ul class="reservation-payment-history-list">${Ft.map(t=>{const a=typeof t?.type=="string"?t.type.toLowerCase():"",l=a==="amount"?i("reservations.paymentHistory.type.amount","دفعة مالية"):a==="percent"?i("reservations.paymentHistory.type.percent","دفعة نسبة"):i("reservations.paymentHistory.type.unknown","دفعة"),u=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?Number(t.percentage):Number.isFinite(Number(t?.value))&&a==="percent"?Number(t.value):null,b=u!=null&&Number.isFinite(Number(H))&&Number(H)>0?Math.round(Number(H)*(u/100)*100)/100:null,h=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?Number(t.amount):null,_=a==="percent"&&b!=null?b:h,f=_!=null?`${s(_.toFixed(2))} ${A}`:"—",k=u!=null?`${s(u.toFixed(2))}%`:"—",o=t?.recordedAt?s(ct(t.recordedAt)):"—",n=t?.note?`<div class="payment-history-note">${P(s(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${P(l)}</span>
              <span class="payment-history-entry__amount">${f}</span>
              <span class="payment-history-entry__percent">${k}</span>
              <span class="payment-history-entry__date">${o}</span>
            </div>
            ${n}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${P(Be)}</div>`,Lt=String(e?.status||e?.reservationStatus||"").toLowerCase(),kt=Lt==="cancelled"||Lt==="canceled",Ct=kt?[{text:i("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:xt,className:O==="paid"?"status-paid":st?"status-partial":"status-unpaid"}]:[{text:mt?pe:me,className:mt?"status-confirmed":"status-pending"},{text:xt,className:O==="paid"?"status-paid":st?"status-partial":"status-unpaid"}];Dt&&!kt&&Ct.push({text:fe,className:"status-completed"});const ra=Ct.map(({text:t,className:a})=>`<span class="status-chip ${a}">${t}</span>`).join(""),V=(t,a,l)=>`
    <div class="res-info-row">
      <span class="label">${t} ${a}</span>
      <span class="value">${l}</span>
    </div>
  `;let lt="";if(e.projectId){let t=P(ge);if(y){const a=y.title||i("projects.fallback.untitled","مشروع بدون اسم");t=`${P(a)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${y.id}">${P(Te)}</button>`}lt=`
      <div class="res-info-row">
        <span class="label">📁 ${Ce}</span>
        <span class="value">${t}</span>
      </div>
    `}const R=[];R.push(V("👤",Le,$?.customerName||e.customerName||ze)),R.push(V("📞",ke,$?.phone||"—")),R.push(V("🗓️",De,Qt)),R.push(V("🗓️",qe,Gt)),R.push(V("📦",Ee,Nt)),R.push(V("⏱️",se,te)),R.push(V("📝",Ie,Oe)),lt&&R.push(lt);const la=R.join(""),ca=D.length?D.map(t=>{const a=t.items[0]||{},l=La(a)||t.image,u=l?`<img src="${l}" alt="${le}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let b=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)b=[...t.packageItems];else{const c=[];t.items.forEach(m=>{Array.isArray(m?.packageItems)&&m.packageItems.length&&c.push(...m.packageItems)}),b=c}if(Array.isArray(b)&&b.length>1){const c=new Set;b=b.filter(m=>{const r=m?.normalizedBarcode&&String(m.normalizedBarcode).toLowerCase()||m?.barcode&&String(m.barcode).toLowerCase()||(m?.equipmentId!=null?`id:${m.equipmentId}`:null);return r?c.has(r)?!1:(c.add(r),!0):!0})}const h=ot(t)||t.items.some(c=>ot(c))||b.length>0,_=(c,{fallback:m=1,max:r=1e3}={})=>{const x=Ue(c);return Number.isFinite(x)&&x>0?Math.min(r,x):m};let f;if(h){const c=_(a?.qty??a?.quantity??a?.count,{fallback:NaN,max:999});Number.isFinite(c)&&c>0?f=c:f=_(t.quantity??t.count??1,{fallback:1,max:999})}else f=_(t.quantity??t.count??a?.qty??a?.quantity??a?.count??0,{fallback:1,max:9999});const k=s(String(f)),o=(c,{preferPositive:m=!1}={})=>{let r=Number.NaN;for(const x of c){const I=C(x);if(Number.isFinite(I)){if(m&&I>0)return I;Number.isFinite(r)||(r=I)}}return r};let n,d;if(h){const c=[a?.price,a?.unit_price,a?.unitPrice,t.unitPrice];if(n=o(c,{preferPositive:!0}),!Number.isFinite(n)||n<0){const r=C(t.totalPrice??a?.total??a?.total_price);Number.isFinite(r)&&f>0&&(n=r/f)}Number.isFinite(n)||(n=0);const m=[a?.total,a?.total_price,t.totalPrice];if(d=o(m),!Number.isFinite(d))d=n*f;else{const r=n*f;Number.isFinite(r)&&r>0&&Math.abs(d-r)>r*.25&&(d=r)}}else{const c=[a?.price,a?.unit_price,a?.unitPrice,t.unitPrice];if(n=o(c,{preferPositive:!0}),!Number.isFinite(n)||n<0){const m=C(t.totalPrice??a?.total??a?.total_price);Number.isFinite(m)&&f>0&&(n=m/f)}Number.isFinite(n)||(n=0),d=C(t.totalPrice??a?.total??a?.total_price),Number.isFinite(d)||(d=n*f)}n=S(n),d=S(d);const v=`${s(n.toFixed(2))} ${A}`,N=`${s(d.toFixed(2))} ${A}`,p=t.barcodes.map(c=>s(String(c||""))).filter(Boolean),F=p.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${p.map(c=>`<li>${c}</li>`).join("")}
              </ul>
            </details>`:"";let w="";if(b.length){const c=new Map,m=r=>1;if(b.forEach(r=>{if(!r)return;const x=W(r.barcode||r.normalizedBarcode||r.desc||Math.random());if(!x)return;const I=c.get(x),Q=m();if(I){I.qty=Q,I.total=Q;return}c.set(x,{desc:r.desc||r.barcode||i("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(Q,99)),total:Math.max(1,Math.min(Q,99)),barcode:r.barcode??r.normalizedBarcode??""})}),c.size){const r=Array.from(c.values()).map(x=>{const I=s(String(x.qty>0?Math.min(x.qty,99):1)),Q=P(x.desc||""),ma=x.barcode?` <span class="reservation-package-items__barcode">(${P(s(String(x.barcode)))})</span>`:"";return`<li>${Q}${ma} × ${I}</li>`}).join("");w=`
              <details class="reservation-package-items">
                <summary>${i("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${r}
                </ul>
              </details>
            `}}const M=h?`${w||""}${F||""}`:F;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${u}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${P(a.desc||a.description||a.name||t.description||"-")}</div>
                  ${M}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${P(z.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${k}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${P(z.unitPrice)}">${v}</td>
            <td class="reservation-modal-items-table__cell" data-label="${P(z.total)}">${N}</td>
          </tr>
        `}).join(""):`<tr><td colspan="4" class="text-center">${ce}</td></tr>`,da=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${z.item}</th>
            <th>${z.quantity}</th>
            <th>${z.unitPrice}</th>
            <th>${z.total}</th>
          </tr>
        </thead>
        <tbody>${ca}</tbody>
      </table>
    </div>
  `,gt=U.map((t,a)=>{const l=s(String(a+1));let u=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!u||u.trim()==="")&&(u=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!u||u.trim()==="")try{const v=typeof G=="function"?G():[],N=t.positionId?v.find(w=>String(w.id)===String(t.positionId)):null,p=!N&&t.positionKey?v.find(w=>String(w.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,F=N||p||null;F&&(u=F.labelAr||F.labelEn||F.name||u)}catch{}const b=dt(u)||i("reservations.crew.positionFallback","منصب بدون اسم"),h=dt(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),_=dt(t.technicianName)||i("technicians.picker.noTechnicianOption","— بدون تعيين —"),f=t.technicianPhone||ue,k=S(C(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0));let o=S(C(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0));if(!Number.isFinite(o)||o<=0)try{const v=G?G():[],N=t.positionId?v.find(w=>String(w.id)===String(t.positionId)):null,p=!N&&t.positionKey?v.find(w=>String(w.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,F=N||p||null;F&&Number.isFinite(Number(F.clientPrice))&&(o=S(Number(F.clientPrice)))}catch{}const n=`${s(o.toFixed(2))} ${A}`,d=k>0?`${s(k.toFixed(2))} ${A}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${l}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${_}</span>
            <small class="text-muted">🏷️ ${b}${h?` — ${h}`:""}</small>
            <small class="text-muted">💼 ${n}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${f}</div>
          ${d?`<div>💵 ${i("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${d}</div>`:""}
        </div>
      </div>
    `}).join(""),ua=Array.isArray(U)&&U.length>4,pa=U.length?ua?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${P(i("reservations.details.slider.prev","السابق"))}" title="${P(i("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${gt}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${P(i("reservations.details.slider.next","التالي"))}" title="${P(i("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${gt}</div>`:`<ul class="reservation-modal-technicians"><li>${de}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${ve}</span>
          <strong>${Ut}</strong>
        </div>
        <div class="status-chips">
          ${ra}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${_e}</h6>
          ${la}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${$e}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${sa}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Me}</h6>
              ${oa}
            </div>
            ${wt}
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Se}</span>
          <span class="count">${Je}</span>
        </div>
        ${pa}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${xe}</span>
          <span class="count">${Nt}</span>
        </div>
        ${da}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${B}">
          ${i("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${B}">${we}</button>
        ${Et?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${B}">${Fe}</button>`:""}
      </div>
    </div>
  `}export{Ma as a,Ba as b,ka as f,Fa as g,Ra as i,La as r};
