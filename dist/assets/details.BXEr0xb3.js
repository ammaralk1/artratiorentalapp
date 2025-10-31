import{d as lt,w as da,n as l,v as st,t as i}from"./auth.nraNoQb5.js";import{n as G,I as Q,J as kt}from"./state.QEOaSBGz.js";import{a as ua,i as pa,A as ma,y as f,z as w,b as ya,f as ba}from"./reservationsService.BDW4iqny.js";const ha=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),va=new Set(["maintenance","reserved","retired"]);function fa(e){const h=String(e??"").trim().toLowerCase();return h&&ha.get(h)||"available"}function _a(e){return e?typeof e=="object"?e:Sa(e):null}function $a(e){const h=_a(e);return h?fa(h.status||h.state||h.statusLabel||h.status_label):"available"}function Ca(e){return!va.has($a(e))}function Aa(e={}){return e.image||e.imageUrl||e.img||""}function Ta(e){if(!e)return null;const h=G(e),{equipment:B=[]}=lt();return(B||[]).find(g=>G(g?.barcode)===h)||null}function Sa(e){const h=G(e);if(!h)return null;const{equipment:B=[]}=lt();return(B||[]).find(g=>G(g?.barcode)===h)||null}function $(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ot(e){if(e==null)return"";const h=String(e).trim();return h?l(h):""}function Fa(e,h,B=[],g,A=null){const{projectLinked:W,effectiveConfirmed:rt}=ua(e,A),Ct=e.paid===!0||e.paid==="paid",Tt=pa(e),U=e.items||[];let{groups:H}=ma(e);const Ft=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(a=>a&&a.type==="package"))),qt=t=>{const a=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return l(a)},ct=(t,a)=>{const n=u=>{const v=Array.isArray(u?.items)?u.items[0]:null,y=[v?.price,v?.unit_price,v?.unitPrice,u?.unitPrice,u?.totalPrice];for(const I of y){const _=w(I);if(Number.isFinite(_)&&_>0)return _}return 0},r=n(t),d=n(a);return r&&d?r<=d?t:a:r?t:a},C=[],z=new Map;H.forEach(t=>{if(!Ft(t)){C.push(t);return}const a=qt(t);if(!a){if(!z.has("__unknown__"))z.set("__unknown__",C.length),C.push(t);else{const n=z.get("__unknown__");C[n]=ct(C[n],t)}return}if(!z.has(a))z.set(a,C.length),C.push(t);else{const n=z.get(a);C[n]=ct(C[n],t)}}),H=C;const{technicians:dt=[]}=lt(),Dt=[].concat(Array.isArray(B)?B:[]).concat(Array.isArray(dt)?dt:[]),Y=new Map;Dt.forEach(t=>{if(!t||t.id==null)return;const a=String(t.id),n=Y.get(a)||{};Y.set(a,{...n,...t})});const V=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,a)=>{const n=t?.technicianId!=null?Y.get(String(t.technicianId)):null;let r=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!r||r.trim()==="")&&(r=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const d=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let u=r,v=d;if(!u||u.trim()==="")try{const _=Q?Q():[];let s=null;if(t.positionId!=null&&(s=_.find(b=>String(b.id)===String(t.positionId))||null),!s){const b=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(b&&(s=typeof kt=="function"?kt(b):null,!s&&_.length)){const x=String(b).trim().toLowerCase();s=_.find(L=>[L.name,L.labelAr,L.labelEn].filter(Boolean).map(M=>String(M).toLowerCase()).includes(x))||null}}s&&(u=s.labelAr||s.labelEn||s.name||"",(!v||String(v).trim()==="")&&(s.labelAr&&s.labelEn?v=u===s.labelAr?s.labelEn:s.labelAr:v=s.labelAr||s.labelEn||""))}catch{}const y=f(w(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??n?.dailyWage??n?.wage??0)),I=f(w(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??n?.dailyTotal??n?.total??n?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${a}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:u,positionLabelAlt:v,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:y,positionClientPrice:I,technicianId:t.technicianId!=null?String(t.technicianId):n?.id!=null?String(n.id):null,technicianName:t.technicianName??t.technician_name??n?.name??null,technicianRole:t.technicianRole??n?.role??null,technicianPhone:t.technicianPhone??n?.phone??null,notes:t.notes??null}}),Et=da(),It=ya(e.start,e.end),Mt=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,ut=w(Mt),gt=Number.isFinite(ut)?ut:0,Ht=e.discountType??e.discount_type??e.discountMode??"percent",Rt=String(Ht).toLowerCase()==="amount"?"amount":"percent",pt=W?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),mt=w(e.cost??e.total??e.finalTotal),yt=Number.isFinite(mt),Bt=yt?f(mt):0,bt=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,J=bt!=null?w(bt):Number.NaN,zt=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(J)&&J>0)&&Number.isFinite(J)?J:0,N=ba({items:U,technicianIds:e.technicians||[],crewAssignments:V,discount:gt,discountType:Rt,applyTax:pt,start:e.start,end:e.end,companySharePercent:zt}),Vt=f(N.equipmentTotal),jt=f(N.crewTotal);f(N.crewCostTotal);const ht=f(N.discountAmount),Kt=f(N.subtotalAfterDiscount),Z=Number.isFinite(N.companySharePercent)?N.companySharePercent:0;let tt=f(N.companyShareAmount);tt=Z>0?f(Math.max(0,tt)):0;const vt=f(N.taxAmount),ft=f(N.finalTotal),_t=W?ft:yt?Bt:ft,$t=f(N.netProfit),Qt=l(String(e.reservationId??e.id??"")),Ut=e.start?l(st(e.start)):"-",Gt=e.end?l(st(e.end)):"-",Wt=l(String(V.length)),Jt=l(Vt.toFixed(2)),Ot=l(ht.toFixed(2)),Xt=l(Kt.toFixed(2)),Yt=l(vt.toFixed(2)),Zt=l((Number.isFinite(_t)?_t:0).toFixed(2)),te=l(String(It)),S=i("reservations.create.summary.currency","SR"),ee=i("reservations.details.labels.discount","الخصم"),ae=i("reservations.details.labels.tax","الضريبة (15%)"),ie=i("reservations.details.labels.crewTotal","إجمالي الفريق"),ne=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),se=i("reservations.details.labels.duration","عدد الأيام"),oe=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),le=i("reservations.details.labels.netProfit","💵 صافي الربح"),re=i("reservations.create.equipment.imageAlt","صورة"),q={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},ce=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),de=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");i("reservations.details.technicians.roleUnknown","غير محدد");const ue=i("reservations.details.technicians.phoneUnknown","غير متوفر");i("reservations.details.technicians.wage","{amount} {currency} / اليوم");const pe=i("reservations.list.status.confirmed","✅ مؤكد"),me=i("reservations.list.status.pending","⏳ غير مؤكد"),ye=i("reservations.list.payment.paid","💳 مدفوع"),be=i("reservations.list.payment.unpaid","💳 غير مدفوع"),he=i("reservations.list.payment.partial","💳 مدفوع جزئياً"),ve=i("reservations.list.status.completed","📁 منتهي"),fe=i("reservations.details.labels.id","🆔 رقم الحجز"),_e=i("reservations.details.section.bookingInfo","بيانات الحجز"),$e=i("reservations.details.section.paymentSummary","ملخص الدفع"),Ae=i("reservations.details.labels.finalTotal","المجموع النهائي"),Se=i("reservations.details.section.crew","😎 الفريق الفني"),Pe=i("reservations.details.crew.count","{count} عضو"),we=i("reservations.details.section.items","📦 المعدات المرتبطة"),Ne=i("reservations.details.items.count","{count} عنصر"),xe=i("reservations.details.actions.edit","✏️ تعديل"),Le=i("reservations.details.actions.delete","🗑️ حذف"),ke=i("reservations.details.labels.customer","العميل"),Ce=i("reservations.details.labels.contact","رقم التواصل"),Te=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Fe=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),qe=i("reservations.details.actions.openProject","📁 فتح المشروع"),De=i("reservations.details.labels.start","بداية الحجز"),Ee=i("reservations.details.labels.end","نهاية الحجز"),Ie=i("reservations.details.labels.notes","ملاحظات"),Me=i("reservations.list.noNotes","لا توجد ملاحظات"),ge=i("reservations.details.labels.itemsCount","عدد المعدات"),He=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),Re=i("reservations.paymentHistory.title","سجل الدفعات"),Be=i("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),ze=i("reservations.list.unknownCustomer","غير معروف"),et=typeof A?.paymentStatus=="string"?A.paymentStatus.toLowerCase():null,O=W&&et&&["paid","partial","unpaid"].includes(et)?et:e.paidStatus??e.paid_status??(Ct?"paid":"unpaid"),at=O==="partial",At=O==="paid"?ye:at?he:be;function it(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const a=String(t).replace(/[^0-9.+-]/g,""),n=Number(a);return Number.isFinite(n)?n:Number.NaN}const X=(t={})=>{const a=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(a)||Array.isArray(t.packageItems)&&t.packageItems.length)},Ve=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(a=>a!=null&&a!==""),je=(t={})=>!t||typeof t!="object"?!1:!X(t)&&Ve(t),Ke=(t={})=>{const a=X(t),n=[{value:t.qty,key:"qty",limit:999},{value:t.quantity,key:"quantity",limit:999},{value:t.units,key:"units",limit:999},{value:t.count,key:"count",limit:50},{value:t.package_quantity,key:"package_quantity",limit:999},{value:t.packageQty,key:"packageQty",limit:999},{value:t.packageCount,key:"packageCount",limit:999}];let r=NaN;for(const d of n){if(d.value==null||d.value==="")continue;const u=typeof d.value=="string"?d.value.trim():String(d.value??"");if(d.key==="count"&&u.length>6)continue;const v=it(d.value);if(!Number.isFinite(v)||v<=0)continue;const y=Math.round(v);if(!(y>d.limit)){r=Math.max(1,y);break}}return(!Number.isFinite(r)||r<=0)&&(r=1),a?Math.max(1,Math.min(99,r)):Math.max(1,Math.min(9999,r))};let j=(Array.isArray(U)?U:[]).filter(t=>t&&typeof t=="object"&&!je(t)).reduce((t,a)=>t+Ke(a),0);(!Number.isFinite(j)||j<=0)&&(j=Array.isArray(H)&&H.length?H.length:(Array.isArray(U)?U.length:0)||1),j=Math.max(1,Math.round(j));const Qe=l(String(j)),St=Ne.replace("{count}",Qe),Ue=Pe.replace("{count}",Wt),Ge=e.notes?l(e.notes):Me,We=l(jt.toFixed(2)),Je=l(String(Z)),Oe=l(tt.toFixed(2)),Xe=`${Je}% (${Oe} ${S})`,Ye=Number.isFinite($t)?Math.max(0,$t):0,Ze=l(Ye.toFixed(2)),E=[{icon:"💼",label:He,value:`${Jt} ${S}`}];E.push({icon:"😎",label:ie,value:`${We} ${S}`}),ht>0&&E.push({icon:"💸",label:ee,value:`${Ot} ${S}`}),E.push({icon:"📊",label:ne,value:`${Xt} ${S}`}),pt&&vt>0&&E.push({icon:"🧾",label:ae,value:`${Yt} ${S}`}),Z>0&&E.push({icon:"🏦",label:oe,value:Xe}),E.push({icon:"💵",label:le,value:`${Ze} ${S}`}),E.push({icon:"💰",label:Ae,value:`${Zt} ${S}`});const ta=E.map(({icon:t,label:a,value:n})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${a}</span>
      <span class="summary-details-value">${n}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let P=[];W&&A&&(Array.isArray(A.paymentHistory)?P=A.paymentHistory:Array.isArray(A.payment_history)?P=A.payment_history:Array.isArray(A.payments)?P=A.payments:Array.isArray(A.paymentLogs)&&(P=A.paymentLogs)),(!Array.isArray(P)||P.length===0)&&(Array.isArray(e.paymentHistory)?P=e.paymentHistory:Array.isArray(e.payment_history)?P=e.payment_history:Array.isArray(e.paymentLogs)?P=e.paymentLogs:P=[]);const Pt=Array.isArray(P)?P:[],ea=Pt.length?`<ul class="reservation-payment-history-list">${Pt.map(t=>{const a=t?.type==="amount"?i("reservations.paymentHistory.type.amount","دفعة مالية"):t?.type==="percent"?i("reservations.paymentHistory.type.percent","دفعة نسبة"):i("reservations.paymentHistory.type.unknown","دفعة"),n=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?`${l(Number(t.amount).toFixed(2))} ${S}`:"—",r=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?`${l(Number(t.percentage).toFixed(2))}%`:"—",d=t?.recordedAt?l(st(t.recordedAt)):"—",u=t?.note?`<div class="payment-history-note">${$(l(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${$(a)}</span>
              <span class="payment-history-entry__amount">${n}</span>
              <span class="payment-history-entry__percent">${r}</span>
              <span class="payment-history-entry__date">${d}</span>
            </div>
            ${u}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${$(Be)}</div>`,wt=String(e?.status||e?.reservationStatus||"").toLowerCase(),Nt=wt==="cancelled"||wt==="canceled",xt=Nt?[{text:i("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:At,className:O==="paid"?"status-paid":at?"status-partial":"status-unpaid"}]:[{text:rt?pe:me,className:rt?"status-confirmed":"status-pending"},{text:At,className:O==="paid"?"status-paid":at?"status-partial":"status-unpaid"}];Tt&&!Nt&&xt.push({text:ve,className:"status-completed"});const aa=xt.map(({text:t,className:a})=>`<span class="status-chip ${a}">${t}</span>`).join(""),R=(t,a,n)=>`
    <div class="res-info-row">
      <span class="label">${t} ${a}</span>
      <span class="value">${n}</span>
    </div>
  `;let nt="";if(e.projectId){let t=$(Fe);if(A){const a=A.title||i("projects.fallback.untitled","مشروع بدون اسم");t=`${$(a)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${A.id}">${$(qe)}</button>`}nt=`
      <div class="res-info-row">
        <span class="label">📁 ${Te}</span>
        <span class="value">${t}</span>
      </div>
    `}const D=[];D.push(R("👤",ke,h?.customerName||ze)),D.push(R("📞",Ce,h?.phone||"—")),D.push(R("🗓️",De,Ut)),D.push(R("🗓️",Ee,Gt)),D.push(R("📦",ge,St)),D.push(R("⏱️",se,te)),D.push(R("📝",Ie,Ge)),nt&&D.push(nt);const ia=D.join(""),na=H.length?H.map(t=>{const a=t.items[0]||{},n=Aa(a)||t.image,r=n?`<img src="${n}" alt="${re}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let d=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)d=[...t.packageItems];else{const c=[];t.items.forEach(p=>{Array.isArray(p?.packageItems)&&p.packageItems.length&&c.push(...p.packageItems)}),d=c}if(Array.isArray(d)&&d.length>1){const c=new Set;d=d.filter(p=>{const o=p?.normalizedBarcode&&String(p.normalizedBarcode).toLowerCase()||p?.barcode&&String(p.barcode).toLowerCase()||(p?.equipmentId!=null?`id:${p.equipmentId}`:null);return o?c.has(o)?!1:(c.add(o),!0):!0})}const u=X(t)||t.items.some(c=>X(c))||d.length>0,v=(c,{fallback:p=1,max:o=1e3}={})=>{const m=it(c);return Number.isFinite(m)&&m>0?Math.min(o,m):p};let y;if(u){const c=v(a?.qty??a?.quantity??a?.count,{fallback:NaN,max:999});Number.isFinite(c)&&c>0?y=c:y=v(t.quantity??t.count??1,{fallback:1,max:999})}else y=v(t.quantity??t.count??a?.qty??a?.quantity??a?.count??0,{fallback:1,max:9999});const I=l(String(y)),_=(c,{preferPositive:p=!1}={})=>{let o=Number.NaN;for(const m of c){const F=w(m);if(Number.isFinite(F)){if(p&&F>0)return F;Number.isFinite(o)||(o=F)}}return o};let s,b;if(u){const c=[a?.price,a?.unit_price,a?.unitPrice,t.unitPrice];if(s=_(c,{preferPositive:!0}),!Number.isFinite(s)||s<0){const o=w(t.totalPrice??a?.total??a?.total_price);Number.isFinite(o)&&y>0&&(s=o/y)}Number.isFinite(s)||(s=0);const p=[a?.total,a?.total_price,t.totalPrice];if(b=_(p),!Number.isFinite(b))b=s*y;else{const o=s*y;Number.isFinite(o)&&o>0&&Math.abs(b-o)>o*.25&&(b=o)}}else{const c=[a?.price,a?.unit_price,a?.unitPrice,t.unitPrice];if(s=_(c,{preferPositive:!0}),!Number.isFinite(s)||s<0){const p=w(t.totalPrice??a?.total??a?.total_price);Number.isFinite(p)&&y>0&&(s=p/y)}Number.isFinite(s)||(s=0),b=w(t.totalPrice??a?.total??a?.total_price),Number.isFinite(b)||(b=s*y)}s=f(s),b=f(b);const x=`${l(s.toFixed(2))} ${S}`,L=`${l(b.toFixed(2))} ${S}`,M=t.barcodes.map(c=>l(String(c||""))).filter(Boolean),k=M.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${M.map(c=>`<li>${c}</li>`).join("")}
              </ul>
            </details>`:"";let T="";if(d.length){const c=new Map,p=o=>{const m=it(o?.qtyPerPackage??o?.perPackageQty??o?.quantityPerPackage);return Number.isFinite(m)&&m>0&&m<=99?Math.round(m):1};if(d.forEach(o=>{if(!o)return;const m=G(o.barcode||o.normalizedBarcode||o.desc||Math.random());if(!m)return;const F=c.get(m),K=p(o);if(F){F.qty=K,F.total=K;return}c.set(m,{desc:o.desc||o.barcode||i("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(K,99)),total:Math.max(1,Math.min(K,99)),barcode:o.barcode??o.normalizedBarcode??""})}),c.size){const o=Array.from(c.values()).map(m=>{const F=l(String(m.qty>0?Math.min(m.qty,99):1)),K=$(m.desc||""),ca=m.barcode?` <span class="reservation-package-items__barcode">(${$(l(String(m.barcode)))})</span>`:"";return`<li>${K}${ca} × ${F}</li>`}).join("");T=`
              <details class="reservation-package-items">
                <summary>${i("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${o}
                </ul>
              </details>
            `}}const ra=u?`${T||""}${k||""}`:k;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${r}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${$(a.desc||a.description||a.name||t.description||"-")}</div>
                  ${ra}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${$(q.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${I}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${$(q.unitPrice)}">${x}</td>
            <td class="reservation-modal-items-table__cell" data-label="${$(q.total)}">${L}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${$(q.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${ce}</td></tr>`,sa=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${q.item}</th>
            <th>${q.quantity}</th>
            <th>${q.unitPrice}</th>
            <th>${q.total}</th>
            <th>${q.actions}</th>
          </tr>
        </thead>
        <tbody>${na}</tbody>
      </table>
    </div>
  `,Lt=V.map((t,a)=>{const n=l(String(a+1));let r=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!r||r.trim()==="")&&(r=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!r||r.trim()==="")try{const x=typeof Q=="function"?Q():[],L=t.positionId?x.find(T=>String(T.id)===String(t.positionId)):null,M=!L&&t.positionKey?x.find(T=>String(T.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,k=L||M||null;k&&(r=k.labelAr||k.labelEn||k.name||r)}catch{}const d=ot(r)||i("reservations.crew.positionFallback","منصب بدون اسم"),u=ot(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),v=ot(t.technicianName)||i("technicians.picker.noTechnicianOption","— بدون تعيين —"),y=t.technicianPhone||ue,I=f(w(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0));let _=f(w(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0));if(!Number.isFinite(_)||_<=0)try{const x=Q?Q():[],L=t.positionId?x.find(T=>String(T.id)===String(t.positionId)):null,M=!L&&t.positionKey?x.find(T=>String(T.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,k=L||M||null;k&&Number.isFinite(Number(k.clientPrice))&&(_=f(Number(k.clientPrice)))}catch{}const s=`${l(_.toFixed(2))} ${S}`,b=I>0?`${l(I.toFixed(2))} ${S}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${n}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${v}</span>
            <small class="text-muted">🏷️ ${d}${u?` — ${u}`:""}</small>
            <small class="text-muted">💼 ${s}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${y}</div>
          ${b?`<div>💵 ${i("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${b}</div>`:""}
        </div>
      </div>
    `}).join(""),oa=Array.isArray(V)&&V.length>4,la=V.length?oa?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${$(i("reservations.details.slider.prev","السابق"))}" title="${$(i("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Lt}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${$(i("reservations.details.slider.next","التالي"))}" title="${$(i("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Lt}</div>`:`<ul class="reservation-modal-technicians"><li>${de}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${fe}</span>
          <strong>${Qt}</strong>
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
              ${ta}
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
          <span class="count">${St}</span>
        </div>
        ${sa}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${g}">
          ${i("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${g}">${xe}</button>
        ${Et?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${g}">${Le}</button>`:""}
      </div>
    </div>
  `}export{Ta as a,Fa as b,Sa as f,$a as g,Ca as i,Aa as r};
