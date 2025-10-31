import{d as dt,w as da,n as o,v as rt,t as a}from"./auth.BFR8Y3ym.js";import{n as U,I as K,J as kt}from"./state.CnYEfqeH.js";import{a as ua,i as pa,A as ma,y as _,z as w,b as ba,f as ya}from"./reservationsService.Djfji_-g.js";const ha=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),va=new Set(["maintenance","reserved","retired"]);function fa(e){const v=String(e??"").trim().toLowerCase();return v&&ha.get(v)||"available"}function _a(e){return e?typeof e=="object"?e:Sa(e):null}function $a(e){const v=_a(e);return v?fa(v.status||v.state||v.statusLabel||v.status_label):"available"}function Fa(e){return!va.has($a(e))}function Aa(e={}){return e.image||e.imageUrl||e.img||""}function Ta(e){if(!e)return null;const v=U(e),{equipment:B=[]}=dt();return(B||[]).find(M=>U(M?.barcode)===v)||null}function Sa(e){const v=U(e);if(!v)return null;const{equipment:B=[]}=dt();return(B||[]).find(M=>U(M?.barcode)===v)||null}function $(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ct(e){if(e==null)return"";const v=String(e).trim();return v?o(v):""}function ka(e,v,B=[],M,A=null){const{projectLinked:Q,effectiveConfirmed:ut}=ua(e,A),qt=e.paid===!0||e.paid==="paid",Dt=pa(e),O=e.items||[];let{groups:T}=ma(e);const It=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(i=>i&&i.type==="package"))),Et=t=>{const i=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return o(i)},pt=(t,i)=>{const n=p=>{const f=Array.isArray(p?.items)?p.items[0]:null,u=[f?.price,f?.unit_price,f?.unitPrice,p?.unitPrice,p?.totalPrice];for(const N of u){const m=w(N);if(Number.isFinite(m)&&m>0)return m}return 0},d=n(t),c=n(i);return d&&c?d<=c?t:i:d?t:i},k=[],z=new Map;T.forEach(t=>{if(!It(t)){k.push(t);return}const i=Et(t);if(!i){if(!z.has("__unknown__"))z.set("__unknown__",k.length),k.push(t);else{const n=z.get("__unknown__");k[n]=pt(k[n],t)}return}if(!z.has(i))z.set(i,k.length),k.push(t);else{const n=z.get(i);k[n]=pt(k[n],t)}}),T=k;const{technicians:mt=[]}=dt(),gt=[].concat(Array.isArray(B)?B:[]).concat(Array.isArray(mt)?mt:[]),X=new Map;gt.forEach(t=>{if(!t||t.id==null)return;const i=String(t.id),n=X.get(i)||{};X.set(i,{...n,...t})});const j=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,i)=>{const n=t?.technicianId!=null?X.get(String(t.technicianId)):null;let d=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!d||d.trim()==="")&&(d=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const c=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let p=d,f=c;if(!p||p.trim()==="")try{const m=K?K():[];let s=null;if(t.positionId!=null&&(s=m.find(h=>String(h.id)===String(t.positionId))||null),!s){const h=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(h&&(s=typeof kt=="function"?kt(h):null,!s&&m.length)){const L=String(h).trim().toLowerCase();s=m.find(C=>[C.name,C.labelAr,C.labelEn].filter(Boolean).map(H=>String(H).toLowerCase()).includes(L))||null}}s&&(p=s.labelAr||s.labelEn||s.name||"",(!f||String(f).trim()==="")&&(s.labelAr&&s.labelEn?f=p===s.labelAr?s.labelEn:s.labelAr:f=s.labelAr||s.labelEn||""))}catch{}const u=_(w(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??n?.dailyWage??n?.wage??0)),N=_(w(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??n?.dailyTotal??n?.total??n?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${i}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:p,positionLabelAlt:f,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:u,positionClientPrice:N,technicianId:t.technicianId!=null?String(t.technicianId):n?.id!=null?String(n.id):null,technicianName:t.technicianName??t.technician_name??n?.name??null,technicianRole:t.technicianRole??n?.role??null,technicianPhone:t.technicianPhone??n?.phone??null,notes:t.notes??null}}),Ht=da(),G=ba(e.start,e.end),Mt=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,bt=w(Mt),Rt=Number.isFinite(bt)?bt:0,Bt=e.discountType??e.discount_type??e.discountMode??"percent",zt=String(Bt).toLowerCase()==="amount"?"amount":"percent",yt=Q?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),ht=w(e.cost??e.total??e.finalTotal),vt=Number.isFinite(ht),jt=vt?_(ht):0,ft=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,W=ft!=null?w(ft):Number.NaN,Vt=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(W)&&W>0)&&Number.isFinite(W)?W:0,P=ya({items:O,technicianIds:e.technicians||[],crewAssignments:j,discount:Rt,discountType:zt,applyTax:yt,start:e.start,end:e.end,companySharePercent:Vt}),Y=_(P.equipmentTotal),_t=_(P.crewTotal);_(P.crewCostTotal);const Z=_(P.discountAmount),Kt=_(P.subtotalAfterDiscount),tt=Number.isFinite(P.companySharePercent)?P.companySharePercent:0;let et=_(P.companyShareAmount);et=tt>0?_(Math.max(0,et)):0;const at=_(P.taxAmount),$t=_(P.finalTotal),At=Q?$t:vt?jt:$t,St=_(P.netProfit),Ut=o(String(e.reservationId??e.id??"")),Qt=e.start?o(rt(e.start)):"-",Gt=e.end?o(rt(e.end)):"-",Wt=o(String(j.length)),Jt=o(Y.toFixed(2)),Ot=o(Z.toFixed(2)),Xt=o(Kt.toFixed(2)),Yt=o(at.toFixed(2)),Zt=o((Number.isFinite(At)?At:0).toFixed(2)),te=o(String(G)),S=a("reservations.create.summary.currency","SR"),ee=a("reservations.details.labels.discount","الخصم"),ae=a("reservations.details.labels.tax","الضريبة (15%)"),ie=a("reservations.details.labels.crewTotal","إجمالي الفريق"),ne=a("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),se=a("reservations.details.labels.duration","عدد الأيام"),oe=a("reservations.details.labels.companyShare","🏦 نسبة الشركة"),le=a("reservations.details.labels.netProfit","💵 صافي الربح"),re=a("reservations.create.equipment.imageAlt","صورة"),I={item:a("reservations.equipment.table.item","المعدة"),quantity:a("reservations.equipment.table.quantity","الكمية"),unitPrice:a("reservations.equipment.table.unitPrice","سعر الوحدة"),total:a("reservations.equipment.table.total","الإجمالي"),actions:a("reservations.equipment.table.actions","الإجراءات")},ce=a("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),de=a("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");a("reservations.details.technicians.roleUnknown","غير محدد");const ue=a("reservations.details.technicians.phoneUnknown","غير متوفر");a("reservations.details.technicians.wage","{amount} {currency} / اليوم");const pe=a("reservations.list.status.confirmed","✅ مؤكد"),me=a("reservations.list.status.pending","⏳ غير مؤكد"),be=a("reservations.list.payment.paid","💳 مدفوع"),ye=a("reservations.list.payment.unpaid","💳 غير مدفوع"),he=a("reservations.list.payment.partial","💳 مدفوع جزئياً"),ve=a("reservations.list.status.completed","📁 منتهي"),fe=a("reservations.details.labels.id","🆔 رقم الحجز"),_e=a("reservations.details.section.bookingInfo","بيانات الحجز"),$e=a("reservations.details.section.paymentSummary","ملخص الدفع"),Ae=a("reservations.details.labels.finalTotal","المجموع النهائي"),Se=a("reservations.details.section.crew","😎 الفريق الفني"),xe=a("reservations.details.crew.count","{count} عضو"),we=a("reservations.details.section.items","📦 المعدات المرتبطة"),Pe=a("reservations.details.items.count","{count} عنصر"),Ne=a("reservations.details.actions.edit","✏️ تعديل"),Le=a("reservations.details.actions.delete","🗑️ حذف"),Ce=a("reservations.details.labels.customer","العميل"),Fe=a("reservations.details.labels.contact","رقم التواصل"),Te=a("reservations.details.labels.project","📁 المشروع المرتبط");a("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const ke=a("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),qe=a("reservations.details.actions.openProject","📁 فتح المشروع"),De=a("reservations.details.labels.start","بداية الحجز"),Ie=a("reservations.details.labels.end","نهاية الحجز"),Ee=a("reservations.details.labels.notes","ملاحظات"),ge=a("reservations.list.noNotes","لا توجد ملاحظات"),He=a("reservations.details.labels.itemsCount","عدد المعدات"),Me=a("reservations.details.labels.itemsTotal","إجمالي المعدات"),Re=a("reservations.paymentHistory.title","سجل الدفعات"),Be=a("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),ze=a("reservations.list.unknownCustomer","غير معروف"),it=typeof A?.paymentStatus=="string"?A.paymentStatus.toLowerCase():null,J=Q&&it&&["paid","partial","unpaid"].includes(it)?it:e.paidStatus??e.paid_status??(qt?"paid":"unpaid"),nt=J==="partial",xt=J==="paid"?be:nt?he:ye;function wt(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const i=String(t).replace(/[^0-9.+-]/g,""),n=Number(i);return Number.isFinite(n)?n:Number.NaN}const st=(t={})=>{const i=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(i)||Array.isArray(t.packageItems)&&t.packageItems.length)},je=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(i=>i!=null&&i!==""),Ve=(t={})=>!t||typeof t!="object"?!1:!st(t)&&je(t);let ot=Array.isArray(T)&&T.length?T.length:(Array.isArray(O)?O.filter(t=>t&&typeof t=="object"&&!Ve(t)).length:0)||1;ot=Math.max(1,Math.round(ot));const Ke=o(String(ot)),Pt=Pe.replace("{count}",Ke),Ue=xe.replace("{count}",Wt),Qe=e.notes?o(e.notes):ge,Ge=o(_t.toFixed(2)),We=o(String(tt)),Je=o(et.toFixed(2)),Oe=`${We}% (${Je} ${S})`,Xe=Number.isFinite(St)?Math.max(0,St):0,Ye=o(Xe.toFixed(2)),g=[{icon:"💼",label:Me,value:`${Jt} ${S}`}];g.push({icon:"😎",label:ie,value:`${Ge} ${S}`}),Z>0&&g.push({icon:"💸",label:ee,value:`${Ot} ${S}`}),g.push({icon:"📊",label:ne,value:`${Xt} ${S}`}),yt&&at>0&&g.push({icon:"🧾",label:ae,value:`${Yt} ${S}`}),tt>0&&g.push({icon:"🏦",label:oe,value:Oe}),g.push({icon:"💵",label:le,value:`${Ye} ${S}`}),g.push({icon:"💰",label:Ae,value:`${Zt} ${S}`});const Ze=g.map(({icon:t,label:i,value:n})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${i}</span>
      <span class="summary-details-value">${n}</span>
    </div>
  `).join("");let ta="";try{const i=new URL(window.location.href).searchParams.get("debugFinance");if(i==="1"||i==="true"){const n=c=>(c?.type||"").toLowerCase()==="package"?"fixed":"daily",d=(Array.isArray(T)?T:[]).map((c,p)=>{const f=Number.isFinite(Number(c?.quantity))?Number(c.quantity):0,u=Number.isFinite(Number(c?.unitPrice))?Number(c.unitPrice):0,N=n(c),m=N==="fixed"?f*u:f*u*G;return`
          <tr>
            <td>${p+1}</td>
            <td>${$(String(c?.description||"-"))}</td>
            <td>${N}</td>
            <td>${o(String(f))}</td>
            <td>${o(String(u.toFixed?u.toFixed(2):u))}</td>
            <td>${o(String(m.toFixed?m.toFixed(2):m))}</td>
          </tr>`}).join("");ta=`
        <details class="reservation-finance-debug" style="margin-top:12px">
          <summary>Debug: تفصيل التسعير</summary>
          <div style="padding:8px 0; font-size: 12px">
            <div>الأيام: ${o(String(G))}</div>
            <div>Equipment Total (breakdown): ${o(String(Y.toFixed(2)))} ${S}</div>
            <table class="table table-xs" style="width:100%; margin-top:8px">
              <thead>
                <tr>
                  <th>#</th><th>الوصف</th><th>النوع</th><th>الكمية</th><th>سعر الوحدة</th><th>المساهمة</th>
                </tr>
              </thead>
              <tbody>${d}</tbody>
            </table>
          </div>
        </details>`,console.debug("[finance-debug] groups",T,{rentalDays:G,equipmentTotal:Y,crewTotal:_t,discountAmount:Z,taxAmount:at})}}catch{}console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let x=[];Q&&A&&(Array.isArray(A.paymentHistory)?x=A.paymentHistory:Array.isArray(A.payment_history)?x=A.payment_history:Array.isArray(A.payments)?x=A.payments:Array.isArray(A.paymentLogs)&&(x=A.paymentLogs)),(!Array.isArray(x)||x.length===0)&&(Array.isArray(e.paymentHistory)?x=e.paymentHistory:Array.isArray(e.payment_history)?x=e.payment_history:Array.isArray(e.paymentLogs)?x=e.paymentLogs:x=[]);const Nt=Array.isArray(x)?x:[],ea=Nt.length?`<ul class="reservation-payment-history-list">${Nt.map(t=>{const i=t?.type==="amount"?a("reservations.paymentHistory.type.amount","دفعة مالية"):t?.type==="percent"?a("reservations.paymentHistory.type.percent","دفعة نسبة"):a("reservations.paymentHistory.type.unknown","دفعة"),n=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?`${o(Number(t.amount).toFixed(2))} ${S}`:"—",d=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${o(Number(t.percentage).toFixed(2))}%`:"—",c=t?.recordedAt?o(rt(t.recordedAt)):"—",p=t?.note?`<div class="payment-history-note">${$(o(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${$(i)}</span>
              <span class="payment-history-entry__amount">${n}</span>
              <span class="payment-history-entry__percent">${d}</span>
              <span class="payment-history-entry__date">${c}</span>
            </div>
            ${p}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${$(Be)}</div>`,Lt=String(e?.status||e?.reservationStatus||"").toLowerCase(),Ct=Lt==="cancelled"||Lt==="canceled",Ft=Ct?[{text:a("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:xt,className:J==="paid"?"status-paid":nt?"status-partial":"status-unpaid"}]:[{text:ut?pe:me,className:ut?"status-confirmed":"status-pending"},{text:xt,className:J==="paid"?"status-paid":nt?"status-partial":"status-unpaid"}];Dt&&!Ct&&Ft.push({text:ve,className:"status-completed"});const aa=Ft.map(({text:t,className:i})=>`<span class="status-chip ${i}">${t}</span>`).join(""),R=(t,i,n)=>`
    <div class="res-info-row">
      <span class="label">${t} ${i}</span>
      <span class="value">${n}</span>
    </div>
  `;let lt="";if(e.projectId){let t=$(ke);if(A){const i=A.title||a("projects.fallback.untitled","مشروع بدون اسم");t=`${$(i)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${A.id}">${$(qe)}</button>`}lt=`
      <div class="res-info-row">
        <span class="label">📁 ${Te}</span>
        <span class="value">${t}</span>
      </div>
    `}const E=[];E.push(R("👤",Ce,v?.customerName||ze)),E.push(R("📞",Fe,v?.phone||"—")),E.push(R("🗓️",De,Qt)),E.push(R("🗓️",Ie,Gt)),E.push(R("📦",He,Pt)),E.push(R("⏱️",se,te)),E.push(R("📝",Ee,Qe)),lt&&E.push(lt);const ia=E.join(""),na=T.length?T.map(t=>{const i=t.items[0]||{},n=Aa(i)||t.image,d=n?`<img src="${n}" alt="${re}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let c=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)c=[...t.packageItems];else{const r=[];t.items.forEach(b=>{Array.isArray(b?.packageItems)&&b.packageItems.length&&r.push(...b.packageItems)}),c=r}if(Array.isArray(c)&&c.length>1){const r=new Set;c=c.filter(b=>{const l=b?.normalizedBarcode&&String(b.normalizedBarcode).toLowerCase()||b?.barcode&&String(b.barcode).toLowerCase()||(b?.equipmentId!=null?`id:${b.equipmentId}`:null);return l?r.has(l)?!1:(r.add(l),!0):!0})}const p=st(t)||t.items.some(r=>st(r))||c.length>0,f=(r,{fallback:b=1,max:l=1e3}={})=>{const y=wt(r);return Number.isFinite(y)&&y>0?Math.min(l,y):b};let u;if(p){const r=f(i?.qty??i?.quantity??i?.count,{fallback:NaN,max:999});Number.isFinite(r)&&r>0?u=r:u=f(t.quantity??t.count??1,{fallback:1,max:999})}else u=f(t.quantity??t.count??i?.qty??i?.quantity??i?.count??0,{fallback:1,max:9999});const N=o(String(u)),m=(r,{preferPositive:b=!1}={})=>{let l=Number.NaN;for(const y of r){const D=w(y);if(Number.isFinite(D)){if(b&&D>0)return D;Number.isFinite(l)||(l=D)}}return l};let s,h;if(p){const r=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(s=m(r,{preferPositive:!0}),!Number.isFinite(s)||s<0){const l=w(t.totalPrice??i?.total??i?.total_price);Number.isFinite(l)&&u>0&&(s=l/u)}Number.isFinite(s)||(s=0);const b=[i?.total,i?.total_price,t.totalPrice];if(h=m(b),!Number.isFinite(h))h=s*u;else{const l=s*u;Number.isFinite(l)&&l>0&&Math.abs(h-l)>l*.25&&(h=l)}}else{const r=[i?.price,i?.unit_price,i?.unitPrice,t.unitPrice];if(s=m(r,{preferPositive:!0}),!Number.isFinite(s)||s<0){const b=w(t.totalPrice??i?.total??i?.total_price);Number.isFinite(b)&&u>0&&(s=b/u)}Number.isFinite(s)||(s=0),h=w(t.totalPrice??i?.total??i?.total_price),Number.isFinite(h)||(h=s*u)}s=_(s),h=_(h);const L=`${o(s.toFixed(2))} ${S}`,C=`${o(h.toFixed(2))} ${S}`,H=t.barcodes.map(r=>o(String(r||""))).filter(Boolean),F=H.length?`<details class="reservation-item-barcodes">
              <summary>${a("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${H.map(r=>`<li>${r}</li>`).join("")}
              </ul>
            </details>`:"";let q="";if(c.length){const r=new Map,b=l=>{const y=wt(l?.qtyPerPackage??l?.perPackageQty??l?.quantityPerPackage);return Number.isFinite(y)&&y>0&&y<=99?Math.round(y):1};if(c.forEach(l=>{if(!l)return;const y=U(l.barcode||l.normalizedBarcode||l.desc||Math.random());if(!y)return;const D=r.get(y),V=b(l);if(D){D.qty=V,D.total=V;return}r.set(y,{desc:l.desc||l.barcode||a("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(V,99)),total:Math.max(1,Math.min(V,99)),barcode:l.barcode??l.normalizedBarcode??""})}),r.size){const l=Array.from(r.values()).map(y=>{const D=o(String(y.qty>0?Math.min(y.qty,99):1)),V=$(y.desc||""),ca=y.barcode?` <span class="reservation-package-items__barcode">(${$(o(String(y.barcode)))})</span>`:"";return`<li>${V}${ca} × ${D}</li>`}).join("");q=`
              <details class="reservation-package-items">
                <summary>${a("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${l}
                </ul>
              </details>
            `}}const ra=p?`${q||""}${F||""}`:F;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${d}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${$(i.desc||i.description||i.name||t.description||"-")}</div>
                  ${ra}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${$(I.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${N}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${$(I.unitPrice)}">${L}</td>
            <td class="reservation-modal-items-table__cell" data-label="${$(I.total)}">${C}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${$(I.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${ce}</td></tr>`,sa=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${I.item}</th>
            <th>${I.quantity}</th>
            <th>${I.unitPrice}</th>
            <th>${I.total}</th>
            <th>${I.actions}</th>
          </tr>
        </thead>
        <tbody>${na}</tbody>
      </table>
    </div>
  `,Tt=j.map((t,i)=>{const n=o(String(i+1));let d=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!d||d.trim()==="")&&(d=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!d||d.trim()==="")try{const L=typeof K=="function"?K():[],C=t.positionId?L.find(q=>String(q.id)===String(t.positionId)):null,H=!C&&t.positionKey?L.find(q=>String(q.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,F=C||H||null;F&&(d=F.labelAr||F.labelEn||F.name||d)}catch{}const c=ct(d)||a("reservations.crew.positionFallback","منصب بدون اسم"),p=ct(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),f=ct(t.technicianName)||a("technicians.picker.noTechnicianOption","— بدون تعيين —"),u=t.technicianPhone||ue,N=_(w(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0));let m=_(w(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0));if(!Number.isFinite(m)||m<=0)try{const L=K?K():[],C=t.positionId?L.find(q=>String(q.id)===String(t.positionId)):null,H=!C&&t.positionKey?L.find(q=>String(q.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,F=C||H||null;F&&Number.isFinite(Number(F.clientPrice))&&(m=_(Number(F.clientPrice)))}catch{}const s=`${o(m.toFixed(2))} ${S}`,h=N>0?`${o(N.toFixed(2))} ${S}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${n}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${f}</span>
            <small class="text-muted">🏷️ ${c}${p?` — ${p}`:""}</small>
            <small class="text-muted">💼 ${s}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${u}</div>
          ${h?`<div>💵 ${a("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${h}</div>`:""}
        </div>
      </div>
    `}).join(""),oa=Array.isArray(j)&&j.length>4,la=j.length?oa?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${$(a("reservations.details.slider.prev","السابق"))}" title="${$(a("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Tt}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${$(a("reservations.details.slider.next","التالي"))}" title="${$(a("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Tt}</div>`:`<ul class="reservation-modal-technicians"><li>${de}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${fe}</span>
          <strong>${Ut}</strong>
        </div>
        <div class="status-chips">
          ${aa}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${_e}</h6>
          ${ia}
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
              <h6 class="history-heading">${Re}</h6>
              ${ea}
            </div>
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
          <span>${we}</span>
          <span class="count">${Pt}</span>
        </div>
        ${sa}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${M}">
          ${a("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${M}">${Ne}</button>
        ${Ht?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${M}">${Le}</button>`:""}
      </div>
    </div>
  `}export{Ta as a,ka as b,Sa as f,$a as g,Fa as i,Aa as r};
