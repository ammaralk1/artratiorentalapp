import{d as dt,w as da,n,v as lt,t as a}from"./auth.BFR8Y3ym.js";import{n as Q,I as U,J as Dt}from"./state.B8SZ8bSY.js";import{a as ua,i as pa,A as ma,y as A,z as k,b as ya,f as ba,J as ha}from"./reservationsService.CQ0ZWPmH.js";const va=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),fa=new Set(["maintenance","reserved","retired"]);function _a(e){const f=String(e??"").trim().toLowerCase();return f&&va.get(f)||"available"}function $a(e){return e?typeof e=="object"?e:Pa(e):null}function Aa(e){const f=$a(e);return f?_a(f.status||f.state||f.statusLabel||f.status_label):"available"}function Fa(e){return!fa.has(Aa(e))}function Sa(e={}){return e.image||e.imageUrl||e.img||""}function Ta(e){if(!e)return null;const f=Q(e),{equipment:z=[]}=dt();return(z||[]).find(R=>Q(R?.barcode)===f)||null}function Pa(e){const f=Q(e);if(!f)return null;const{equipment:z=[]}=dt();return(z||[]).find(R=>Q(R?.barcode)===f)||null}function _(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ct(e){if(e==null)return"";const f=String(e).trim();return f?n(f):""}function Da(e,f,z=[],R,S=null){const{projectLinked:G,effectiveConfirmed:ut}=ua(e,S),qt=e.paid===!0||e.paid==="paid",gt=pa(e),O=e.items||[];let{groups:T}=ma(e);const It=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(i=>i&&i.type==="package"))),Et=t=>{const i=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return n(i)},pt=(t,i)=>{const o=m=>{const y=Array.isArray(m?.items)?m.items[0]:null,u=[y?.price,y?.unit_price,y?.unitPrice,m?.unitPrice,m?.totalPrice];for(const F of u){const b=k(F);if(Number.isFinite(b)&&b>0)return b}return 0},d=o(t),r=o(i);return d&&r?d<=r?t:i:d?t:i},D=[],j=new Map;T.forEach(t=>{if(!It(t)){D.push(t);return}const i=Et(t);if(!i){if(!j.has("__unknown__"))j.set("__unknown__",D.length),D.push(t);else{const o=j.get("__unknown__");D[o]=pt(D[o],t)}return}if(!j.has(i))j.set(i,D.length),D.push(t);else{const o=j.get(i);D[o]=pt(D[o],t)}}),T=D;const{technicians:mt=[]}=dt(),Ht=[].concat(Array.isArray(z)?z:[]).concat(Array.isArray(mt)?mt:[]),X=new Map;Ht.forEach(t=>{if(!t||t.id==null)return;const i=String(t.id),o=X.get(i)||{};X.set(i,{...o,...t})});const V=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,i)=>{const o=t?.technicianId!=null?X.get(String(t.technicianId)):null;let d=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!d||d.trim()==="")&&(d=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const r=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let m=d,y=r;if(!m||m.trim()==="")try{const b=U?U():[];let s=null;if(t.positionId!=null&&(s=b.find(p=>String(p.id)===String(t.positionId))||null),!s){const p=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(p&&(s=typeof Dt=="function"?Dt(p):null,!s&&b.length)){const N=String(p).trim().toLowerCase();s=b.find(x=>[x.name,x.labelAr,x.labelEn].filter(Boolean).map($=>String($).toLowerCase()).includes(N))||null}}s&&(m=s.labelAr||s.labelEn||s.name||"",(!y||String(y).trim()==="")&&(s.labelAr&&s.labelEn?y=m===s.labelAr?s.labelEn:s.labelAr:y=s.labelAr||s.labelEn||""))}catch{}const u=A(k(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??o?.dailyWage??o?.wage??0)),F=A(k(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??o?.dailyTotal??o?.total??o?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${i}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:m,positionLabelAlt:y,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:u,positionClientPrice:F,technicianId:t.technicianId!=null?String(t.technicianId):o?.id!=null?String(o.id):null,technicianName:t.technicianName??t.technician_name??o?.name??null,technicianRole:t.technicianRole??o?.role??null,technicianPhone:t.technicianPhone??o?.phone??null,notes:t.notes??null}}),Mt=da(),I=ya(e.start,e.end),Rt=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,yt=k(Rt),Bt=Number.isFinite(yt)?yt:0,zt=e.discountType??e.discount_type??e.discountMode??"percent",jt=String(zt).toLowerCase()==="amount"?"amount":"percent",bt=G?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),ht=k(e.cost??e.total??e.finalTotal),vt=Number.isFinite(ht),Vt=vt?A(ht):0,ft=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,W=ft!=null?k(ft):Number.NaN,Kt=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(W)&&W>0)&&Number.isFinite(W)?W:0,C=ba({items:O,technicianIds:e.technicians||[],crewAssignments:V,discount:Bt,discountType:jt,applyTax:bt,start:e.start,end:e.end,companySharePercent:Kt}),Y=A(C.equipmentTotal),_t=A(C.crewTotal);A(C.crewCostTotal);const Z=A(C.discountAmount),Ut=A(C.subtotalAfterDiscount),tt=Number.isFinite(C.companySharePercent)?C.companySharePercent:0;let et=A(C.companyShareAmount);et=tt>0?A(Math.max(0,et)):0;const at=A(C.taxAmount),$t=A(C.finalTotal),At=G?$t:vt?Vt:$t,St=A(C.netProfit),Qt=n(String(e.reservationId??e.id??"")),Gt=e.start?n(lt(e.start)):"-",Wt=e.end?n(lt(e.end)):"-",Jt=n(String(V.length)),Ot=n(Y.toFixed(2)),Xt=n(Z.toFixed(2)),Yt=n(Ut.toFixed(2)),Zt=n(at.toFixed(2)),te=n((Number.isFinite(At)?At:0).toFixed(2)),ee=n(String(I)),P=a("reservations.create.summary.currency","SR"),ae=a("reservations.details.labels.discount","الخصم"),ie=a("reservations.details.labels.tax","الضريبة (15%)"),ne=a("reservations.details.labels.crewTotal","إجمالي الفريق"),se=a("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),oe=a("reservations.details.labels.duration","عدد الأيام"),re=a("reservations.details.labels.companyShare","🏦 نسبة الشركة"),le=a("reservations.details.labels.netProfit","💵 صافي الربح"),ce=a("reservations.create.equipment.imageAlt","صورة"),E={item:a("reservations.equipment.table.item","المعدة"),quantity:a("reservations.equipment.table.quantity","الكمية"),unitPrice:a("reservations.equipment.table.unitPrice","سعر الوحدة"),total:a("reservations.equipment.table.total","الإجمالي"),actions:a("reservations.equipment.table.actions","الإجراءات")},de=a("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),ue=a("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");a("reservations.details.technicians.roleUnknown","غير محدد");const pe=a("reservations.details.technicians.phoneUnknown","غير متوفر");a("reservations.details.technicians.wage","{amount} {currency} / اليوم");const me=a("reservations.list.status.confirmed","✅ مؤكد"),ye=a("reservations.list.status.pending","⏳ غير مؤكد"),be=a("reservations.list.payment.paid","💳 مدفوع"),he=a("reservations.list.payment.unpaid","💳 غير مدفوع"),ve=a("reservations.list.payment.partial","💳 مدفوع جزئياً"),fe=a("reservations.list.status.completed","📁 منتهي"),_e=a("reservations.details.labels.id","🆔 رقم الحجز"),$e=a("reservations.details.section.bookingInfo","بيانات الحجز"),Ae=a("reservations.details.section.paymentSummary","ملخص الدفع"),Se=a("reservations.details.labels.finalTotal","المجموع النهائي"),Pe=a("reservations.details.section.crew","😎 الفريق الفني"),xe=a("reservations.details.crew.count","{count} عضو"),we=a("reservations.details.section.items","📦 المعدات المرتبطة"),Ne=a("reservations.details.items.count","{count} عنصر"),Le=a("reservations.details.actions.edit","✏️ تعديل"),ke=a("reservations.details.actions.delete","🗑️ حذف"),Ce=a("reservations.details.labels.customer","العميل"),Fe=a("reservations.details.labels.contact","رقم التواصل"),Te=a("reservations.details.labels.project","📁 المشروع المرتبط");a("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const De=a("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),qe=a("reservations.details.actions.openProject","📁 فتح المشروع"),ge=a("reservations.details.labels.start","بداية الحجز"),Ie=a("reservations.details.labels.end","نهاية الحجز"),Ee=a("reservations.details.labels.notes","ملاحظات"),He=a("reservations.list.noNotes","لا توجد ملاحظات"),Me=a("reservations.details.labels.itemsCount","عدد المعدات"),Re=a("reservations.details.labels.itemsTotal","إجمالي المعدات"),Be=a("reservations.paymentHistory.title","سجل الدفعات"),ze=a("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),je=a("reservations.list.unknownCustomer","غير معروف"),it=typeof S?.paymentStatus=="string"?S.paymentStatus.toLowerCase():null,J=G&&it&&["paid","partial","unpaid"].includes(it)?it:e.paidStatus??e.paid_status??(qt?"paid":"unpaid"),nt=J==="partial",Pt=J==="paid"?be:nt?ve:he;function xt(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const i=String(t).replace(/[^0-9.+-]/g,""),o=Number(i);return Number.isFinite(o)?o:Number.NaN}const st=(t={})=>{const i=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(i)||Array.isArray(t.packageItems)&&t.packageItems.length)},Ve=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(i=>i!=null&&i!==""),Ke=(t={})=>!t||typeof t!="object"?!1:!st(t)&&Ve(t);let ot=Array.isArray(T)&&T.length?T.length:(Array.isArray(O)?O.filter(t=>t&&typeof t=="object"&&!Ke(t)).length:0)||1;ot=Math.max(1,Math.round(ot));const Ue=n(String(ot)),wt=Ne.replace("{count}",Ue),Qe=xe.replace("{count}",Jt),Ge=e.notes?n(e.notes):He,We=n(_t.toFixed(2)),Je=n(String(tt)),Oe=n(et.toFixed(2)),Xe=`${Je}% (${Oe} ${P})`,Ye=Number.isFinite(St)?Math.max(0,St):0,Ze=n(Ye.toFixed(2)),M=[{icon:"💼",label:Re,value:`${Ot} ${P}`}];M.push({icon:"😎",label:ne,value:`${We} ${P}`}),Z>0&&M.push({icon:"💸",label:ae,value:`${Xt} ${P}`}),M.push({icon:"📊",label:se,value:`${Yt} ${P}`}),bt&&at>0&&M.push({icon:"🧾",label:ie,value:`${Zt} ${P}`}),tt>0&&M.push({icon:"🏦",label:re,value:Xe}),M.push({icon:"💵",label:le,value:`${Ze} ${P}`}),M.push({icon:"💰",label:Se,value:`${te} ${P}`});const ta=M.map(({icon:t,label:i,value:o})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${i}</span>
      <span class="summary-details-value">${o}</span>
    </div>
  `).join("");let Nt="";try{const i=new URL(window.location.href).searchParams.get("debugFinance");if(i==="1"||i==="true"){const o=r=>(r?.type||"").toLowerCase()==="package"&&String(r?.pricingMode||"").toLowerCase()==="fixed"?"fixed":"daily",d=(Array.isArray(T)?T:[]).map((r,m)=>{const y=Number.isFinite(Number(r?.quantity))?Number(r.quantity):0,u=Number.isFinite(Number(r?.unitPrice))?Number(r.unitPrice):0,F=o(r),b=F==="fixed"?y*u:y*u*I;let s="";if((r?.type||"").toLowerCase()==="package")try{const p={package_code:r?.package_code||r?.packageDisplayCode||r?.barcode||r?.packageId||r?.key,packageItems:Array.isArray(r?.packageItems)?r.packageItems:void 0},x=(ha(p,{packageQuantity:y,days:I}).lines||[]).map(($,L)=>`
              <tr>
                <td colspan="2"></td>
                <td>• ${_(String($.desc||$.barcode||"item"))}</td>
                <td>${n(String($.qtyPerPackage))} × ${n(String(y))} × ${n(String(I))}</td>
                <td>${n(String(($.unitPrice||0).toFixed?$.unitPrice.toFixed(2):$.unitPrice))}</td>
                <td>${n(String(($.perDayTotal*I).toFixed?($.perDayTotal*I).toFixed(2):$.perDayTotal*I))}</td>
              </tr>`).join("");s=x||""}catch{}return`
          <tr>
            <td>${m+1}</td>
            <td>${_(String(r?.description||"-"))}</td>
            <td>${F}</td>
            <td>${n(String(y))}</td>
            <td>${n(String(u.toFixed?u.toFixed(2):u))}</td>
            <td>${n(String(b.toFixed?b.toFixed(2):b))}</td>
          </tr>${s}`}).join("");Nt=`
        <details class="reservation-finance-debug" style="margin-top:12px">
          <summary>Debug: تفصيل التسعير</summary>
          <div style="padding:8px 0; font-size: 12px">
            <div>الأيام: ${n(String(I))}</div>
            <div>Equipment Total (breakdown): ${n(String(Y.toFixed(2)))} ${P}</div>
            <table class="table table-xs" style="width:100%; margin-top:8px">
              <thead>
                <tr>
                  <th>#</th><th>الوصف</th><th>النوع</th><th>الكمية</th><th>سعر الوحدة</th><th>المساهمة</th>
                </tr>
              </thead>
              <tbody>${d}</tbody>
            </table>
          </div>
        </details>`,console.debug("[finance-debug] groups",T,{rentalDays:I,equipmentTotal:Y,crewTotal:_t,discountAmount:Z,taxAmount:at})}}catch{}console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let w=[];G&&S&&(Array.isArray(S.paymentHistory)?w=S.paymentHistory:Array.isArray(S.payment_history)?w=S.payment_history:Array.isArray(S.payments)?w=S.payments:Array.isArray(S.paymentLogs)&&(w=S.paymentLogs)),(!Array.isArray(w)||w.length===0)&&(Array.isArray(e.paymentHistory)?w=e.paymentHistory:Array.isArray(e.payment_history)?w=e.payment_history:Array.isArray(e.paymentLogs)?w=e.paymentLogs:w=[]);const Lt=Array.isArray(w)?w:[],ea=Lt.length?`<ul class="reservation-payment-history-list">${Lt.map(t=>{const i=t?.type==="amount"?a("reservations.paymentHistory.type.amount","دفعة مالية"):t?.type==="percent"?a("reservations.paymentHistory.type.percent","دفعة نسبة"):a("reservations.paymentHistory.type.unknown","دفعة"),o=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?`${n(Number(t.amount).toFixed(2))} ${P}`:"—",d=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${n(Number(t.percentage).toFixed(2))}%`:"—",r=t?.recordedAt?n(lt(t.recordedAt)):"—",m=t?.note?`<div class="payment-history-note">${_(n(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${_(i)}</span>
              <span class="payment-history-entry__amount">${o}</span>
              <span class="payment-history-entry__percent">${d}</span>
              <span class="payment-history-entry__date">${r}</span>
            </div>
            ${m}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${_(ze)}</div>`,kt=String(e?.status||e?.reservationStatus||"").toLowerCase(),Ct=kt==="cancelled"||kt==="canceled",Ft=Ct?[{text:a("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:Pt,className:J==="paid"?"status-paid":nt?"status-partial":"status-unpaid"}]:[{text:ut?me:ye,className:ut?"status-confirmed":"status-pending"},{text:Pt,className:J==="paid"?"status-paid":nt?"status-partial":"status-unpaid"}];gt&&!Ct&&Ft.push({text:fe,className:"status-completed"});const aa=Ft.map(({text:t,className:i})=>`<span class="status-chip ${i}">${t}</span>`).join(""),B=(t,i,o)=>`
    <div class="res-info-row">
      <span class="label">${t} ${i}</span>
      <span class="value">${o}</span>
    </div>
  `;let rt="";if(e.projectId){let t=_(De);if(S){const i=S.title||a("projects.fallback.untitled","مشروع بدون اسم");t=`${_(i)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${S.id}">${_(qe)}</button>`}rt=`
      <div class="res-info-row">
        <span class="label">📁 ${Te}</span>
        <span class="value">${t}</span>
      </div>
    `}const H=[];H.push(B("👤",Ce,f?.customerName||je)),H.push(B("📞",Fe,f?.phone||"—")),H.push(B("🗓️",ge,Gt)),H.push(B("🗓️",Ie,Wt)),H.push(B("📦",Me,wt)),H.push(B("⏱️",oe,ee)),H.push(B("📝",Ee,Ge)),rt&&H.push(rt);const ia=H.join(""),na=T.length?T.map(t=>{const i=t.items[0]||{},o=Sa(i)||t.image,d=o?`<img src="${o}" alt="${ce}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let r=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)r=[...t.packageItems];else{const c=[];t.items.forEach(h=>{Array.isArray(h?.packageItems)&&h.packageItems.length&&c.push(...h.packageItems)}),r=c}if(Array.isArray(r)&&r.length>1){const c=new Set;r=r.filter(h=>{const l=h?.normalizedBarcode&&String(h.normalizedBarcode).toLowerCase()||h?.barcode&&String(h.barcode).toLowerCase()||(h?.equipmentId!=null?`id:${h.equipmentId}`:null);return l?c.has(l)?!1:(c.add(l),!0):!0})}const m=st(t)||t.items.some(c=>st(c))||r.length>0,y=(c,{fallback:h=1,max:l=1e3}={})=>{const v=xt(c);return Number.isFinite(v)&&v>0?Math.min(l,v):h};let u;if(m){const c=y(i?.qty??i?.quantity??i?.count,{fallback:NaN,max:999});Number.isFinite(c)&&c>0?u=c:u=y(t.quantity??t.count??1,{fallback:1,max:999})}else u=y(t.quantity??t.count??i?.qty??i?.quantity??i?.count??0,{fallback:1,max:9999});const F=n(String(u)),b=(c,{preferPositive:h=!1}={})=>{let l=Number.NaN;for(const v of c){const g=k(v);if(Number.isFinite(g)){if(h&&g>0)return g;Number.isFinite(l)||(l=g)}}return l};let s,p;if(m){const c=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(s=b(c,{preferPositive:!0}),!Number.isFinite(s)||s<0){const l=k(t.totalPrice??i?.total??i?.total_price);Number.isFinite(l)&&u>0&&(s=l/u)}Number.isFinite(s)||(s=0);const h=[i?.total,i?.total_price,t.totalPrice];if(p=b(h),!Number.isFinite(p))p=s*u;else{const l=s*u;Number.isFinite(l)&&l>0&&Math.abs(p-l)>l*.25&&(p=l)}}else{const c=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(s=b(c,{preferPositive:!0}),!Number.isFinite(s)||s<0){const h=k(t.totalPrice??i?.total??i?.total_price);Number.isFinite(h)&&u>0&&(s=h/u)}Number.isFinite(s)||(s=0),p=k(t.totalPrice??i?.total??i?.total_price),Number.isFinite(p)||(p=s*u)}s=A(s),p=A(p);const N=`${n(s.toFixed(2))} ${P}`,x=`${n(p.toFixed(2))} ${P}`,$=t.barcodes.map(c=>n(String(c||""))).filter(Boolean),L=$.length?`<details class="reservation-item-barcodes">
              <summary>${a("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${$.map(c=>`<li>${c}</li>`).join("")}
              </ul>
            </details>`:"";let q="";if(r.length){const c=new Map,h=l=>{const v=xt(l?.qtyPerPackage??l?.perPackageQty??l?.quantityPerPackage);return Number.isFinite(v)&&v>0&&v<=99?Math.round(v):1};if(r.forEach(l=>{if(!l)return;const v=Q(l.barcode||l.normalizedBarcode||l.desc||Math.random());if(!v)return;const g=c.get(v),K=h(l);if(g){g.qty=K,g.total=K;return}c.set(v,{desc:l.desc||l.barcode||a("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(K,99)),total:Math.max(1,Math.min(K,99)),barcode:l.barcode??l.normalizedBarcode??""})}),c.size){const l=Array.from(c.values()).map(v=>{const g=n(String(v.qty>0?Math.min(v.qty,99):1)),K=_(v.desc||""),ca=v.barcode?` <span class="reservation-package-items__barcode">(${_(n(String(v.barcode)))})</span>`:"";return`<li>${K}${ca} × ${g}</li>`}).join("");q=`
              <details class="reservation-package-items">
                <summary>${a("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${l}
                </ul>
              </details>
            `}}const la=m?`${q||""}${L||""}`:L;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${d}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${_(i.desc||i.description||i.name||t.description||"-")}</div>
                  ${la}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${_(E.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${F}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${_(E.unitPrice)}">${N}</td>
            <td class="reservation-modal-items-table__cell" data-label="${_(E.total)}">${x}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${_(E.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${de}</td></tr>`,sa=`
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
        <tbody>${na}</tbody>
      </table>
    </div>
  `,Tt=V.map((t,i)=>{const o=n(String(i+1));let d=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!d||d.trim()==="")&&(d=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!d||d.trim()==="")try{const N=typeof U=="function"?U():[],x=t.positionId?N.find(q=>String(q.id)===String(t.positionId)):null,$=!x&&t.positionKey?N.find(q=>String(q.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,L=x||$||null;L&&(d=L.labelAr||L.labelEn||L.name||d)}catch{}const r=ct(d)||a("reservations.crew.positionFallback","منصب بدون اسم"),m=ct(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),y=ct(t.technicianName)||a("technicians.picker.noTechnicianOption","— بدون تعيين —"),u=t.technicianPhone||pe,F=A(k(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0));let b=A(k(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0));if(!Number.isFinite(b)||b<=0)try{const N=U?U():[],x=t.positionId?N.find(q=>String(q.id)===String(t.positionId)):null,$=!x&&t.positionKey?N.find(q=>String(q.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,L=x||$||null;L&&Number.isFinite(Number(L.clientPrice))&&(b=A(Number(L.clientPrice)))}catch{}const s=`${n(b.toFixed(2))} ${P}`,p=F>0?`${n(F.toFixed(2))} ${P}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${o}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${y}</span>
            <small class="text-muted">🏷️ ${r}${m?` — ${m}`:""}</small>
            <small class="text-muted">💼 ${s}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${u}</div>
          ${p?`<div>💵 ${a("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${p}</div>`:""}
        </div>
      </div>
    `}).join(""),oa=Array.isArray(V)&&V.length>4,ra=V.length?oa?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${_(a("reservations.details.slider.prev","السابق"))}" title="${_(a("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Tt}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${_(a("reservations.details.slider.next","التالي"))}" title="${_(a("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Tt}</div>`:`<ul class="reservation-modal-technicians"><li>${ue}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${_e}</span>
          <strong>${Qt}</strong>
        </div>
        <div class="status-chips">
          ${aa}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${$e}</h6>
          ${ia}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Ae}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${ta}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Be}</h6>
              ${ea}
            </div>
            ${Nt}
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Pe}</span>
          <span class="count">${Qe}</span>
        </div>
        ${ra}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${we}</span>
          <span class="count">${wt}</span>
        </div>
        ${sa}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${R}">
          ${a("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${R}">${Le}</button>
        ${Mt?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${R}">${ke}</button>`:""}
      </div>
    </div>
  `}export{Ta as a,Da as b,Pa as f,Aa as g,Fa as i,Sa as r};
