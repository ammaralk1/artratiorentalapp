import{d as ot,w as ca,n as l,v as nt,t as a}from"./auth.nraNoQb5.js";import{n as U,I as K,J as Ct}from"./state.QEOaSBGz.js";import{a as da,i as ua,A as pa,y as h,z as w,b as ma,f as ba}from"./reservationsService.BDW4iqny.js";const ya=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),ha=new Set(["maintenance","reserved","retired"]);function va(e){const m=String(e??"").trim().toLowerCase();return m&&ya.get(m)||"available"}function fa(e){return e?typeof e=="object"?e:Aa(e):null}function _a(e){const m=fa(e);return m?va(m.status||m.state||m.statusLabel||m.status_label):"available"}function Ca(e){return!ha.has(_a(e))}function $a(e={}){return e.image||e.imageUrl||e.img||""}function Ta(e){if(!e)return null;const m=U(e),{equipment:g=[]}=ot();return(g||[]).find(M=>U(M?.barcode)===m)||null}function Aa(e){const m=U(e);if(!m)return null;const{equipment:g=[]}=ot();return(g||[]).find(M=>U(M?.barcode)===m)||null}function _(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function st(e){if(e==null)return"";const m=String(e).trim();return m?l(m):""}function ka(e,m,g=[],M,$=null){const{projectLinked:Q,effectiveConfirmed:lt}=da(e,$),Tt=e.paid===!0||e.paid==="paid",kt=ua(e),J=e.items||[];let{groups:R}=pa(e);const Ft=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(i=>i&&i.type==="package"))),Dt=t=>{const i=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return l(i)},rt=(t,i)=>{const s=b=>{const A=Array.isArray(b?.items)?b.items[0]:null,v=[A?.price,A?.unit_price,A?.unitPrice,b?.unitPrice,b?.totalPrice];for(const E of v){const f=w(E);if(Number.isFinite(f)&&f>0)return f}return 0},c=s(t),y=s(i);return c&&y?c<=y?t:i:c?t:i},T=[],z=new Map;R.forEach(t=>{if(!Ft(t)){T.push(t);return}const i=Dt(t);if(!i){if(!z.has("__unknown__"))z.set("__unknown__",T.length),T.push(t);else{const s=z.get("__unknown__");T[s]=rt(T[s],t)}return}if(!z.has(i))z.set(i,T.length),T.push(t);else{const s=z.get(i);T[s]=rt(T[s],t)}}),R=T;const{technicians:ct=[]}=ot(),qt=[].concat(Array.isArray(g)?g:[]).concat(Array.isArray(ct)?ct:[]),O=new Map;qt.forEach(t=>{if(!t||t.id==null)return;const i=String(t.id),s=O.get(i)||{};O.set(i,{...s,...t})});const V=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,i)=>{const s=t?.technicianId!=null?O.get(String(t.technicianId)):null;let c=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!c||c.trim()==="")&&(c=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const y=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let b=c,A=y;if(!b||b.trim()==="")try{const f=K?K():[];let n=null;if(t.positionId!=null&&(n=f.find(p=>String(p.id)===String(t.positionId))||null),!n){const p=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(p&&(n=typeof Ct=="function"?Ct(p):null,!n&&f.length)){const N=String(p).trim().toLowerCase();n=f.find(L=>[L.name,L.labelAr,L.labelEn].filter(Boolean).map(H=>String(H).toLowerCase()).includes(N))||null}}n&&(b=n.labelAr||n.labelEn||n.name||"",(!A||String(A).trim()==="")&&(n.labelAr&&n.labelEn?A=b===n.labelAr?n.labelEn:n.labelAr:A=n.labelAr||n.labelEn||""))}catch{}const v=h(w(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??s?.dailyWage??s?.wage??0)),E=h(w(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??s?.dailyTotal??s?.total??s?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${i}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:b,positionLabelAlt:A,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:v,positionClientPrice:E,technicianId:t.technicianId!=null?String(t.technicianId):s?.id!=null?String(s.id):null,technicianName:t.technicianName??t.technician_name??s?.name??null,technicianRole:t.technicianRole??s?.role??null,technicianPhone:t.technicianPhone??s?.phone??null,notes:t.notes??null}}),It=ca(),Et=ma(e.start,e.end),Ht=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,dt=w(Ht),Mt=Number.isFinite(dt)?dt:0,Rt=e.discountType??e.discount_type??e.discountMode??"percent",Bt=String(Rt).toLowerCase()==="amount"?"amount":"percent",ut=Q?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),pt=w(e.cost??e.total??e.finalTotal),mt=Number.isFinite(pt),gt=mt?h(pt):0,bt=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,G=bt!=null?w(bt):Number.NaN,zt=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(G)&&G>0)&&Number.isFinite(G)?G:0,x=ba({items:J,technicianIds:e.technicians||[],crewAssignments:V,discount:Mt,discountType:Bt,applyTax:ut,start:e.start,end:e.end,companySharePercent:zt}),Vt=h(x.equipmentTotal),jt=h(x.crewTotal);h(x.crewCostTotal);const yt=h(x.discountAmount),Kt=h(x.subtotalAfterDiscount),X=Number.isFinite(x.companySharePercent)?x.companySharePercent:0;let Y=h(x.companyShareAmount);Y=X>0?h(Math.max(0,Y)):0;const ht=h(x.taxAmount),vt=h(x.finalTotal),ft=Q?vt:mt?gt:vt,_t=h(x.netProfit),Ut=l(String(e.reservationId??e.id??"")),Qt=e.start?l(nt(e.start)):"-",Gt=e.end?l(nt(e.end)):"-",Wt=l(String(V.length)),Jt=l(Vt.toFixed(2)),Ot=l(yt.toFixed(2)),Xt=l(Kt.toFixed(2)),Yt=l(ht.toFixed(2)),Zt=l((Number.isFinite(ft)?ft:0).toFixed(2)),te=l(String(Et)),S=a("reservations.create.summary.currency","SR"),ee=a("reservations.details.labels.discount","الخصم"),ae=a("reservations.details.labels.tax","الضريبة (15%)"),ie=a("reservations.details.labels.crewTotal","إجمالي الفريق"),ne=a("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),se=a("reservations.details.labels.duration","عدد الأيام"),oe=a("reservations.details.labels.companyShare","🏦 نسبة الشركة"),le=a("reservations.details.labels.netProfit","💵 صافي الربح"),re=a("reservations.create.equipment.imageAlt","صورة"),D={item:a("reservations.equipment.table.item","المعدة"),quantity:a("reservations.equipment.table.quantity","الكمية"),unitPrice:a("reservations.equipment.table.unitPrice","سعر الوحدة"),total:a("reservations.equipment.table.total","الإجمالي"),actions:a("reservations.equipment.table.actions","الإجراءات")},ce=a("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),de=a("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");a("reservations.details.technicians.roleUnknown","غير محدد");const ue=a("reservations.details.technicians.phoneUnknown","غير متوفر");a("reservations.details.technicians.wage","{amount} {currency} / اليوم");const pe=a("reservations.list.status.confirmed","✅ مؤكد"),me=a("reservations.list.status.pending","⏳ غير مؤكد"),be=a("reservations.list.payment.paid","💳 مدفوع"),ye=a("reservations.list.payment.unpaid","💳 غير مدفوع"),he=a("reservations.list.payment.partial","💳 مدفوع جزئياً"),ve=a("reservations.list.status.completed","📁 منتهي"),fe=a("reservations.details.labels.id","🆔 رقم الحجز"),_e=a("reservations.details.section.bookingInfo","بيانات الحجز"),$e=a("reservations.details.section.paymentSummary","ملخص الدفع"),Ae=a("reservations.details.labels.finalTotal","المجموع النهائي"),Se=a("reservations.details.section.crew","😎 الفريق الفني"),Pe=a("reservations.details.crew.count","{count} عضو"),we=a("reservations.details.section.items","📦 المعدات المرتبطة"),xe=a("reservations.details.items.count","{count} عنصر"),Ne=a("reservations.details.actions.edit","✏️ تعديل"),Le=a("reservations.details.actions.delete","🗑️ حذف"),Ce=a("reservations.details.labels.customer","العميل"),Te=a("reservations.details.labels.contact","رقم التواصل"),ke=a("reservations.details.labels.project","📁 المشروع المرتبط");a("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Fe=a("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),De=a("reservations.details.actions.openProject","📁 فتح المشروع"),qe=a("reservations.details.labels.start","بداية الحجز"),Ie=a("reservations.details.labels.end","نهاية الحجز"),Ee=a("reservations.details.labels.notes","ملاحظات"),He=a("reservations.list.noNotes","لا توجد ملاحظات"),Me=a("reservations.details.labels.itemsCount","عدد المعدات"),Re=a("reservations.details.labels.itemsTotal","إجمالي المعدات"),Be=a("reservations.paymentHistory.title","سجل الدفعات"),ge=a("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),ze=a("reservations.list.unknownCustomer","غير معروف"),Z=typeof $?.paymentStatus=="string"?$.paymentStatus.toLowerCase():null,W=Q&&Z&&["paid","partial","unpaid"].includes(Z)?Z:e.paidStatus??e.paid_status??(Tt?"paid":"unpaid"),tt=W==="partial",$t=W==="paid"?be:tt?he:ye;function At(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const i=String(t).replace(/[^0-9.+-]/g,""),s=Number(i);return Number.isFinite(s)?s:Number.NaN}const et=(t={})=>{const i=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(i)||Array.isArray(t.packageItems)&&t.packageItems.length)},Ve=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(i=>i!=null&&i!==""),je=(t={})=>!t||typeof t!="object"?!1:!et(t)&&Ve(t);let at=Array.isArray(R)&&R.length?R.length:(Array.isArray(J)?J.filter(t=>t&&typeof t=="object"&&!je(t)).length:0)||1;at=Math.max(1,Math.round(at));const Ke=l(String(at)),St=xe.replace("{count}",Ke),Ue=Pe.replace("{count}",Wt),Qe=e.notes?l(e.notes):He,Ge=l(jt.toFixed(2)),We=l(String(X)),Je=l(Y.toFixed(2)),Oe=`${We}% (${Je} ${S})`,Xe=Number.isFinite(_t)?Math.max(0,_t):0,Ye=l(Xe.toFixed(2)),I=[{icon:"💼",label:Re,value:`${Jt} ${S}`}];I.push({icon:"😎",label:ie,value:`${Ge} ${S}`}),yt>0&&I.push({icon:"💸",label:ee,value:`${Ot} ${S}`}),I.push({icon:"📊",label:ne,value:`${Xt} ${S}`}),ut&&ht>0&&I.push({icon:"🧾",label:ae,value:`${Yt} ${S}`}),X>0&&I.push({icon:"🏦",label:oe,value:Oe}),I.push({icon:"💵",label:le,value:`${Ye} ${S}`}),I.push({icon:"💰",label:Ae,value:`${Zt} ${S}`});const Ze=I.map(({icon:t,label:i,value:s})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${i}</span>
      <span class="summary-details-value">${s}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let P=[];Q&&$&&(Array.isArray($.paymentHistory)?P=$.paymentHistory:Array.isArray($.payment_history)?P=$.payment_history:Array.isArray($.payments)?P=$.payments:Array.isArray($.paymentLogs)&&(P=$.paymentLogs)),(!Array.isArray(P)||P.length===0)&&(Array.isArray(e.paymentHistory)?P=e.paymentHistory:Array.isArray(e.payment_history)?P=e.payment_history:Array.isArray(e.paymentLogs)?P=e.paymentLogs:P=[]);const Pt=Array.isArray(P)?P:[],ta=Pt.length?`<ul class="reservation-payment-history-list">${Pt.map(t=>{const i=t?.type==="amount"?a("reservations.paymentHistory.type.amount","دفعة مالية"):t?.type==="percent"?a("reservations.paymentHistory.type.percent","دفعة نسبة"):a("reservations.paymentHistory.type.unknown","دفعة"),s=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?`${l(Number(t.amount).toFixed(2))} ${S}`:"—",c=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${l(Number(t.percentage).toFixed(2))}%`:"—",y=t?.recordedAt?l(nt(t.recordedAt)):"—",b=t?.note?`<div class="payment-history-note">${_(l(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${_(i)}</span>
              <span class="payment-history-entry__amount">${s}</span>
              <span class="payment-history-entry__percent">${c}</span>
              <span class="payment-history-entry__date">${y}</span>
            </div>
            ${b}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${_(ge)}</div>`,wt=String(e?.status||e?.reservationStatus||"").toLowerCase(),xt=wt==="cancelled"||wt==="canceled",Nt=xt?[{text:a("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:$t,className:W==="paid"?"status-paid":tt?"status-partial":"status-unpaid"}]:[{text:lt?pe:me,className:lt?"status-confirmed":"status-pending"},{text:$t,className:W==="paid"?"status-paid":tt?"status-partial":"status-unpaid"}];kt&&!xt&&Nt.push({text:ve,className:"status-completed"});const ea=Nt.map(({text:t,className:i})=>`<span class="status-chip ${i}">${t}</span>`).join(""),B=(t,i,s)=>`
    <div class="res-info-row">
      <span class="label">${t} ${i}</span>
      <span class="value">${s}</span>
    </div>
  `;let it="";if(e.projectId){let t=_(Fe);if($){const i=$.title||a("projects.fallback.untitled","مشروع بدون اسم");t=`${_(i)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${$.id}">${_(De)}</button>`}it=`
      <div class="res-info-row">
        <span class="label">📁 ${ke}</span>
        <span class="value">${t}</span>
      </div>
    `}const q=[];q.push(B("👤",Ce,m?.customerName||ze)),q.push(B("📞",Te,m?.phone||"—")),q.push(B("🗓️",qe,Qt)),q.push(B("🗓️",Ie,Gt)),q.push(B("📦",Me,St)),q.push(B("⏱️",se,te)),q.push(B("📝",Ee,Qe)),it&&q.push(it);const aa=q.join(""),ia=R.length?R.map(t=>{const i=t.items[0]||{},s=$a(i)||t.image,c=s?`<img src="${s}" alt="${re}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let y=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)y=[...t.packageItems];else{const r=[];t.items.forEach(d=>{Array.isArray(d?.packageItems)&&d.packageItems.length&&r.push(...d.packageItems)}),y=r}if(Array.isArray(y)&&y.length>1){const r=new Set;y=y.filter(d=>{const o=d?.normalizedBarcode&&String(d.normalizedBarcode).toLowerCase()||d?.barcode&&String(d.barcode).toLowerCase()||(d?.equipmentId!=null?`id:${d.equipmentId}`:null);return o?r.has(o)?!1:(r.add(o),!0):!0})}const b=et(t)||t.items.some(r=>et(r))||y.length>0,A=(r,{fallback:d=1,max:o=1e3}={})=>{const u=At(r);return Number.isFinite(u)&&u>0?Math.min(o,u):d};let v;if(b){const r=A(i?.qty??i?.quantity??i?.count,{fallback:NaN,max:999});Number.isFinite(r)&&r>0?v=r:v=A(t.quantity??t.count??1,{fallback:1,max:999})}else v=A(t.quantity??t.count??i?.qty??i?.quantity??i?.count??0,{fallback:1,max:9999});const E=l(String(v)),f=(r,{preferPositive:d=!1}={})=>{let o=Number.NaN;for(const u of r){const F=w(u);if(Number.isFinite(F)){if(d&&F>0)return F;Number.isFinite(o)||(o=F)}}return o};let n,p;if(b){const r=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(n=f(r,{preferPositive:!0}),!Number.isFinite(n)||n<0){const o=w(t.totalPrice??i?.total??i?.total_price);Number.isFinite(o)&&v>0&&(n=o/v)}Number.isFinite(n)||(n=0);const d=[i?.total,i?.total_price,t.totalPrice];if(p=f(d),!Number.isFinite(p))p=n*v;else{const o=n*v;Number.isFinite(o)&&o>0&&Math.abs(p-o)>o*.25&&(p=o)}}else{const r=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(n=f(r,{preferPositive:!0}),!Number.isFinite(n)||n<0){const d=w(t.totalPrice??i?.total??i?.total_price);Number.isFinite(d)&&v>0&&(n=d/v)}Number.isFinite(n)||(n=0),p=w(t.totalPrice??i?.total??i?.total_price),Number.isFinite(p)||(p=n*v)}n=h(n),p=h(p);const N=`${l(n.toFixed(2))} ${S}`,L=`${l(p.toFixed(2))} ${S}`,H=t.barcodes.map(r=>l(String(r||""))).filter(Boolean),C=H.length?`<details class="reservation-item-barcodes">
              <summary>${a("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${H.map(r=>`<li>${r}</li>`).join("")}
              </ul>
            </details>`:"";let k="";if(y.length){const r=new Map,d=o=>{const u=At(o?.qtyPerPackage??o?.perPackageQty??o?.quantityPerPackage);return Number.isFinite(u)&&u>0&&u<=99?Math.round(u):1};if(y.forEach(o=>{if(!o)return;const u=U(o.barcode||o.normalizedBarcode||o.desc||Math.random());if(!u)return;const F=r.get(u),j=d(o);if(F){F.qty=j,F.total=j;return}r.set(u,{desc:o.desc||o.barcode||a("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(j,99)),total:Math.max(1,Math.min(j,99)),barcode:o.barcode??o.normalizedBarcode??""})}),r.size){const o=Array.from(r.values()).map(u=>{const F=l(String(u.qty>0?Math.min(u.qty,99):1)),j=_(u.desc||""),ra=u.barcode?` <span class="reservation-package-items__barcode">(${_(l(String(u.barcode)))})</span>`:"";return`<li>${j}${ra} × ${F}</li>`}).join("");k=`
              <details class="reservation-package-items">
                <summary>${a("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${o}
                </ul>
              </details>
            `}}const la=b?`${k||""}${C||""}`:C;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${c}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${_(i.desc||i.description||i.name||t.description||"-")}</div>
                  ${la}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${_(D.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${E}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${_(D.unitPrice)}">${N}</td>
            <td class="reservation-modal-items-table__cell" data-label="${_(D.total)}">${L}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${_(D.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${ce}</td></tr>`,na=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${D.item}</th>
            <th>${D.quantity}</th>
            <th>${D.unitPrice}</th>
            <th>${D.total}</th>
            <th>${D.actions}</th>
          </tr>
        </thead>
        <tbody>${ia}</tbody>
      </table>
    </div>
  `,Lt=V.map((t,i)=>{const s=l(String(i+1));let c=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!c||c.trim()==="")&&(c=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!c||c.trim()==="")try{const N=typeof K=="function"?K():[],L=t.positionId?N.find(k=>String(k.id)===String(t.positionId)):null,H=!L&&t.positionKey?N.find(k=>String(k.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,C=L||H||null;C&&(c=C.labelAr||C.labelEn||C.name||c)}catch{}const y=st(c)||a("reservations.crew.positionFallback","منصب بدون اسم"),b=st(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),A=st(t.technicianName)||a("technicians.picker.noTechnicianOption","— بدون تعيين —"),v=t.technicianPhone||ue,E=h(w(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0));let f=h(w(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0));if(!Number.isFinite(f)||f<=0)try{const N=K?K():[],L=t.positionId?N.find(k=>String(k.id)===String(t.positionId)):null,H=!L&&t.positionKey?N.find(k=>String(k.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,C=L||H||null;C&&Number.isFinite(Number(C.clientPrice))&&(f=h(Number(C.clientPrice)))}catch{}const n=`${l(f.toFixed(2))} ${S}`,p=E>0?`${l(E.toFixed(2))} ${S}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${s}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${A}</span>
            <small class="text-muted">🏷️ ${y}${b?` — ${b}`:""}</small>
            <small class="text-muted">💼 ${n}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${v}</div>
          ${p?`<div>💵 ${a("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${p}</div>`:""}
        </div>
      </div>
    `}).join(""),sa=Array.isArray(V)&&V.length>4,oa=V.length?sa?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${_(a("reservations.details.slider.prev","السابق"))}" title="${_(a("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Lt}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${_(a("reservations.details.slider.next","التالي"))}" title="${_(a("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Lt}</div>`:`<ul class="reservation-modal-technicians"><li>${de}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${fe}</span>
          <strong>${Ut}</strong>
        </div>
        <div class="status-chips">
          ${ea}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${_e}</h6>
          ${aa}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${$e}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Ze}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Be}</h6>
              ${ta}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Se}</span>
          <span class="count">${Ue}</span>
        </div>
        ${oa}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${we}</span>
          <span class="count">${St}</span>
        </div>
        ${na}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${M}">
          ${a("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${M}">${Ne}</button>
        ${It?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${M}">${Le}</button>`:""}
      </div>
    </div>
  `}export{Ta as a,ka as b,Aa as f,_a as g,Ca as i,$a as r};
