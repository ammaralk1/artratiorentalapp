import{d as yt,v as Na,n,y as pt,t as i}from"./auth.DjG6Y4HV.js";import{n as O,i as Z,j as Ht}from"./state.Cq48_FNn.js";import{a as xa,B as Pa,H as Ca,v as N,t as g,b as wa,d as ka,c as Fa,e as La,N as Et}from"./reservationsService.BZvERlIP.js";const Ta=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),ga=new Set(["maintenance","reserved","retired"]);function Da(e){const A=String(e??"").trim().toLowerCase();return A&&Ta.get(A)||"available"}function qa(e){return e?typeof e=="object"?e:Ea(e):null}function Ia(e){const A=qa(e);return A?Da(A.status||A.state||A.statusLabel||A.status_label):"available"}function Qa(e){return!ga.has(Ia(e))}function Ha(e={}){return e.image||e.imageUrl||e.img||""}function Ga(e={}){const A=[e.cost,e.unit_cost,e.unitCost,e.rental_cost,e.rentalCost,e.purchase_price,e.purchasePrice];for(const j of A){const D=Number(j);if(Number.isFinite(D))return D}return 0}function Wa(e){if(!e)return null;const A=O(e),{equipment:j=[]}=yt();return(j||[]).find(D=>O(D?.barcode)===A)||null}function Ea(e){const A=O(e);if(!A)return null;const{equipment:j=[]}=yt();return(j||[]).find(D=>O(D?.barcode)===A)||null}function x(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function mt(e){if(e==null)return"";const A=String(e).trim();return A?n(A):""}function Oa(e,A,j=[],D,f=null){const{projectLinked:bt,effectiveConfirmed:ht}=xa(e,f);e.paid===!0||e.paid;const Rt=Pa(e),tt=e.items||[];let{groups:I}=Ca(e);const Mt=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(a=>a&&a.type==="package"))),Bt=t=>{const a=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return n(a)},ft=(t,a)=>{const r=b=>{const S=Array.isArray(b?.items)?b.items[0]:null,m=[S?.price,S?.unit_price,S?.unitPrice,b?.unitPrice,b?.totalPrice];for(const L of m){const o=g(L);if(Number.isFinite(o)&&o>0)return o}return 0},p=r(t),_=r(a);return p&&_?p<=_?t:a:p?t:a},H=[],Q=new Map;I.forEach(t=>{if(!Mt(t)){H.push(t);return}const a=Bt(t);if(!a){if(!Q.has("__unknown__"))Q.set("__unknown__",H.length),H.push(t);else{const r=Q.get("__unknown__");H[r]=ft(H[r],t)}return}if(!Q.has(a))Q.set(a,H.length),H.push(t);else{const r=Q.get(a);H[r]=ft(H[r],t)}}),I=H;const{technicians:vt=[]}=yt(),zt=[].concat(Array.isArray(j)?j:[]).concat(Array.isArray(vt)?vt:[]),et=new Map;zt.forEach(t=>{if(!t||t.id==null)return;const a=String(t.id),r=et.get(a)||{};et.set(a,{...r,...t})});const G=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,a)=>{const r=t?.technicianId!=null?et.get(String(t.technicianId)):null;let p=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!p||p.trim()==="")&&(p=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const _=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let b=p,S=_;if(!b||b.trim()==="")try{const o=Z?Z():[];let s=null;if(t.positionId!=null&&(s=o.find(c=>String(c.id)===String(t.positionId))||null),!s){const c=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(c&&(s=typeof Ht=="function"?Ht(c):null,!s&&o.length)){const u=String(c).trim().toLowerCase();s=o.find(w=>[w.name,w.labelAr,w.labelEn].filter(Boolean).map(h=>String(h).toLowerCase()).includes(u))||null}}s&&(b=s.labelAr||s.labelEn||s.name||"",(!S||String(S).trim()==="")&&(s.labelAr&&s.labelEn?S=b===s.labelAr?s.labelEn:s.labelAr:S=s.labelAr||s.labelEn||""))}catch{}const m=N(g(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??r?.dailyWage??r?.wage??0)),L=N(g(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??r?.dailyTotal??r?.total??r?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${a}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:b,positionLabelAlt:S,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:m,positionClientPrice:L,technicianId:t.technicianId!=null?String(t.technicianId):r?.id!=null?String(r.id):null,technicianName:t.technicianName??t.technician_name??r?.name??null,technicianRole:t.technicianRole??r?.role??null,technicianPhone:t.technicianPhone??r?.phone??null,notes:t.notes??null}}),Vt=Na(),C=wa(e.start,e.end),jt=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,_t=g(jt),Ut=Number.isFinite(_t)?_t:0,Kt=e.discountType??e.discount_type??e.discountMode??"percent",Qt=String(Kt).toLowerCase()==="amount"?"amount":"percent",$t=!!(e.applyTax??e.apply_tax??e.taxApplied),At=g(e.cost??e.total??e.finalTotal);Number.isFinite(At)&&N(At);const St=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,J=St!=null?g(St):Number.NaN,Gt=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(J)&&J>0)&&Number.isFinite(J)?J:0,k=ka({items:tt,technicianIds:e.technicians||[],crewAssignments:G,discount:Ut,discountType:Qt,applyTax:$t,start:e.start,end:e.end,companySharePercent:Gt,groupingSource:e}),at=N(k.equipmentTotal),Wt=N(k.equipmentCostTotal),Nt=N(k.crewTotal),Ot=N(k.crewCostTotal),it=N(k.discountAmount),Jt=N(k.subtotalAfterDiscount),nt=Number.isFinite(k.companySharePercent)?k.companySharePercent:0;let st=N(k.companyShareAmount);st=nt>0?N(Math.max(0,st)):0;const ot=N(k.taxAmount),M=N(k.finalTotal),xt=N(k.netProfit),Xt=n(String(e.reservationId??e.id??"")),Yt=e.start?n(pt(e.start)):"-",Zt=e.end?n(pt(e.end)):"-",te=n(String(G.length)),ee=n(at.toFixed(2)),ae=n(Wt.toFixed(2)),ie=n(it.toFixed(2)),ne=n(Jt.toFixed(2)),se=n(ot.toFixed(2)),oe=n((Number.isFinite(M)?M:0).toFixed(2)),re=n(String(C)),v=i("reservations.create.summary.currency","SR"),le=i("reservations.details.labels.discount","الخصم"),ce=i("reservations.details.labels.tax","الضريبة (15%)"),de=i("reservations.details.labels.crewTotal","إجمالي الفريق"),ue=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),pe=i("reservations.details.labels.duration","عدد الأيام"),me=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),ye=i("reservations.details.labels.netProfit","💵 صافي الربح"),be=i("reservations.details.labels.equipmentCost","تكلفة المعدات"),he=i("reservations.create.equipment.imageAlt","صورة"),B={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),unitCost:i("reservations.equipment.table.unitCost","تكلفة الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},fe=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),ve=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");i("reservations.details.technicians.roleUnknown","غير محدد");const _e=i("reservations.details.technicians.phoneUnknown","غير متوفر");i("reservations.details.technicians.wage","{amount} {currency} / اليوم");const $e=i("reservations.list.status.confirmed","✅ مؤكد"),Ae=i("reservations.list.status.pending","⏳ غير مؤكد"),Se=i("reservations.list.payment.paid","💳 مدفوع"),Ne=i("reservations.list.payment.unpaid","💳 غير مدفوع"),xe=i("reservations.list.payment.partial","💳 مدفوع جزئياً"),Pe=i("reservations.list.status.completed","📁 مغلق"),Ce=i("reservations.details.labels.id","🆔 رقم الحجز"),we=i("reservations.details.section.bookingInfo","بيانات الحجز"),ke=i("reservations.details.section.paymentSummary","ملخص الدفع"),Fe=i("reservations.details.labels.finalTotal","المجموع النهائي"),Le=i("reservations.details.section.crew","😎 الفريق الفني"),Te=i("reservations.details.crew.count","{count} عضو"),ge=i("reservations.details.section.items","📦 المعدات المرتبطة"),De=i("reservations.details.items.count","{count} عنصر"),qe=i("reservations.details.actions.edit","✏️ تعديل"),Ie=i("reservations.details.actions.delete","🗑️ حذف"),He=i("reservations.details.labels.customer","العميل"),Ee=i("reservations.details.labels.contact","رقم التواصل"),Re=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Me=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Be=i("reservations.details.actions.openProject","📁 فتح المشروع"),ze=i("reservations.details.labels.start","بداية الحجز"),Ve=i("reservations.details.labels.end","نهاية الحجز"),je=i("reservations.details.labels.notes","ملاحظات"),Ue=i("reservations.list.noNotes","لا توجد ملاحظات"),Ke=i("reservations.details.labels.itemsCount","عدد المعدات"),Qe=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),Ge=be,We=i("reservations.paymentHistory.title","سجل الدفعات"),Oe=i("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Je=i("reservations.list.unknownCustomer","غير معروف"),Pt=!bt||!f?[]:Array.isArray(f?.paymentHistory)?f.paymentHistory:Array.isArray(f?.payment_history)?f.payment_history:Array.isArray(f?.payments)?f.payments:Array.isArray(f?.paymentLogs)?f.paymentLogs:[],Xe=Array.isArray(e?.paymentHistory)?e.paymentHistory:Array.isArray(e?.payment_history)?e.payment_history:Array.isArray(e?.paymentLogs)?e.paymentLogs:[],rt=Pt.length?Pt:Xe,Ye=rt.length?0:Number(e.paidAmount??e.paid_amount)||0,Ze=rt.length?0:Number(e.paidPercent??e.paid_percentage)||0,Ct=Fa({totalAmount:Number.isFinite(Number(M))?Number(M):0,paidAmount:Ye,paidPercent:Ze,history:rt}),X=La({manualStatus:null,paidAmount:Ct.paidAmount,paidPercent:Ct.paidPercent,totalAmount:Number.isFinite(Number(M))?Number(M):0}),lt=X==="partial",wt=X==="paid"?Se:lt?xe:Ne;function ta(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const a=String(t).replace(/[^0-9.+-]/g,""),r=Number(a);return Number.isFinite(r)?r:Number.NaN}const ct=(t={})=>{const a=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(a)||Array.isArray(t.packageItems)&&t.packageItems.length)},ea=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(a=>a!=null&&a!==""),aa=(t={})=>!t||typeof t!="object"?!1:!ct(t)&&ea(t);let dt=Array.isArray(I)&&I.length?I.length:(Array.isArray(tt)?tt.filter(t=>t&&typeof t=="object"&&!aa(t)).length:0)||1;dt=Math.max(1,Math.round(dt));const ia=n(String(dt)),kt=De.replace("{count}",ia),na=Te.replace("{count}",te),sa=e.notes?n(e.notes):Ue,oa=n(Nt.toFixed(2)),ra=n(Ot.toFixed(2)),la=n(String(nt)),ca=n(st.toFixed(2)),da=`${la}% (${ca} ${v})`,ua=Number.isFinite(xt)?Math.max(0,xt):0,pa=n(ua.toFixed(2)),E=[{icon:"💼",label:Qe,value:`${ee} ${v}`}];E.push({icon:"💸",label:Ge,value:`${ae} ${v}`}),E.push({icon:"😎",label:de,value:`${oa} ${v}`});const ma=i("reservations.details.labels.crewCost","تكلفة الفريق");E.push({icon:"💵",label:ma,value:`${ra} ${v}`}),it>0&&E.push({icon:"💸",label:le,value:`${ie} ${v}`}),E.push({icon:"📊",label:ue,value:`${ne} ${v}`}),$t&&ot>0&&E.push({icon:"🧾",label:ce,value:`${se} ${v}`}),nt>0&&E.push({icon:"🏦",label:me,value:da}),E.push({icon:"💵",label:ye,value:`${pa} ${v}`}),E.push({icon:"💰",label:Fe,value:`${oe} ${v}`});const ya=E.map(({icon:t,label:a,value:r})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${a}</span>
      <span class="summary-details-value">${r}</span>
    </div>
  `).join("");let Ft="";try{const a=new URL(window.location.href).searchParams.get("debugFinance");if(a==="1"||a==="true"){const r=o=>(o?.type||"").toLowerCase()==="package"&&String(o?.pricingMode||"").toLowerCase()==="fixed"?"fixed":"daily",p=o=>{if((o?.type||"").toLowerCase()==="package")return!1;const s=Array.isArray(o?.items)?o.items:[];if(!s.length)return!1;if(s.some(h=>h?.reservation_id!=null||h?.reservationId!=null))return!0;const u=s.every(h=>h?.unit_price!=null||h?.unitPrice!=null),w=s.some(h=>h?.daily_rate!=null||h?.dailyRate!=null||h?.unit_rate!=null||h?.unitRate!=null||h?.price!=null);return u&&!w};let _=0,b=0,S=0,m=0;const L=(Array.isArray(I)?I:[]).map((o,s)=>{const c=Number.isFinite(Number(o?.quantity))?Number(o.quantity):0,u=Number.isFinite(Number(o?.unitPrice))?Number(o.unitPrice):0,w=r(o);let h=w==="fixed"?c*u:c*u*C,R="";if((o?.type||"").toLowerCase()==="package")try{const T={package_code:o?.package_code||o?.packageDisplayCode||o?.barcode||o?.packageId||o?.key,packageItems:Array.isArray(o?.packageItems)?o.packageItems:void 0},V=Number(o?.unitPrice);let U;if(Number.isFinite(V)&&V>0)U=c*V;else{const P=Et(T,{packageQuantity:c,days:C});U=Number.isFinite(Number(P.perDayTotal))?Number(P.perDayTotal):c*u}h=U*C,_+=U,b+=h;const Y=(pricing.lines||[]).map((P,It)=>`
              <tr>
                <td colspan="2"></td>
                <td>• ${x(String(P.desc||P.barcode||"item"))}</td>
                <td>${n(String(P.qtyPerPackage))} × ${n(String(c))} × ${n(String(C))}</td>
                <td>${n(String((P.unitPrice||0).toFixed?P.unitPrice.toFixed(2):P.unitPrice))}</td>
                <td>${n(String((P.perDayTotal*C).toFixed?(P.perDayTotal*C).toFixed(2):P.perDayTotal*C))}</td>
              </tr>`).join("");R=Y||""}catch{}else{const T=p(o),V=T?0:c*u,U=T?c*u:V*C;S+=V,m+=U}return`
          <tr>
            <td>${s+1}</td>
            <td>${x(String(o?.description||"-"))}</td>
            <td>${w}</td>
            <td>${n(String(c))}</td>
            <td>${n(String(u.toFixed?u.toFixed(2):u))}</td>
            <td>${n(String(h.toFixed?h.toFixed(2):h))}</td>
          </tr>${R}`}).join("");Ft=`
        <details class="reservation-finance-debug" style="margin-top:12px">
          <summary>Debug: تفصيل التسعير</summary>
          <div style="padding:8px 0; font-size: 12px">
            <div>الأيام: ${n(String(C))}</div>
            <div style="margin-top:6px"><strong>مجاميع سريعة:</strong></div>
            <div>من الحِزم (يومي): ${n(String(_.toFixed(2)))} ${v}</div>
            <div>من الحِزم (كامل المدة): ${n(String(b.toFixed(2)))} ${v}</div>
            <div>مفردة خارج الحِزم (يومي): ${n(String(S.toFixed(2)))} ${v}</div>
            <div>مفردة خارج الحِزم (كامل المدة): ${n(String(m.toFixed(2)))} ${v}</div>
            <div style="margin-top:4px">Equipment Total (breakdown): ${n(String(at.toFixed(2)))} ${v}</div>
            <table class="table table-xs" style="width:100%; margin-top:8px">
              <thead>
                <tr>
                  <th>#</th><th>الوصف</th><th>النوع</th><th>الكمية</th><th>سعر الوحدة</th><th>المساهمة</th>
                </tr>
              </thead>
              <tbody>${L}</tbody>
            </table>
          </div>
        </details>`,console.debug("[finance-debug] groups",I,{rentalDays:C,equipmentTotal:at,crewTotal:Nt,discountAmount:it,taxAmount:ot})}}catch{}console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let F=[];bt&&f&&(Array.isArray(f.paymentHistory)?F=f.paymentHistory:Array.isArray(f.payment_history)?F=f.payment_history:Array.isArray(f.payments)?F=f.payments:Array.isArray(f.paymentLogs)&&(F=f.paymentLogs)),(!Array.isArray(F)||F.length===0)&&(Array.isArray(e.paymentHistory)?F=e.paymentHistory:Array.isArray(e.payment_history)?F=e.payment_history:Array.isArray(e.paymentLogs)?F=e.paymentLogs:F=[]);const Lt=Array.isArray(F)?F:[],ba=Lt.length?`<ul class="reservation-payment-history-list">${Lt.map(t=>{const a=typeof t?.type=="string"?t.type.toLowerCase():"",r=a==="amount"?i("reservations.paymentHistory.type.amount","دفعة مالية"):a==="percent"?i("reservations.paymentHistory.type.percent","دفعة نسبة"):i("reservations.paymentHistory.type.unknown","دفعة"),p=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?Number(t.percentage):Number.isFinite(Number(t?.value))&&a==="percent"?Number(t.value):null,_=p!=null&&Number.isFinite(Number(M))&&Number(M)>0?Math.round(Number(M)*(p/100)*100)/100:null,b=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?Number(t.amount):null,S=a==="percent"&&_!=null?_:b,m=S!=null?`${n(S.toFixed(2))} ${v}`:"—",L=p!=null?`${n(p.toFixed(2))}%`:"—",o=t?.recordedAt?n(pt(t.recordedAt)):"—",s=t?.note?`<div class="payment-history-note">${x(n(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${x(r)}</span>
              <span class="payment-history-entry__amount">${m}</span>
              <span class="payment-history-entry__percent">${L}</span>
              <span class="payment-history-entry__date">${o}</span>
            </div>
            ${s}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${x(Oe)}</div>`,Tt=String(e?.status||e?.reservationStatus||"").toLowerCase(),gt=Tt==="cancelled"||Tt==="canceled",Dt=gt?[{text:i("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:wt,className:X==="paid"?"status-paid":lt?"status-partial":"status-unpaid"}]:[{text:ht?$e:Ae,className:ht?"status-confirmed":"status-pending"},{text:wt,className:X==="paid"?"status-paid":lt?"status-partial":"status-unpaid"}];Rt&&!gt&&Dt.push({text:Pe,className:"status-completed"});const ha=Dt.map(({text:t,className:a})=>`<span class="status-chip ${a}">${t}</span>`).join(""),K=(t,a,r)=>`
    <div class="res-info-row">
      <span class="label">${t} ${a}</span>
      <span class="value">${r}</span>
    </div>
  `;let ut="";if(e.projectId){let t=x(Me);if(f){const a=f.title||i("projects.fallback.untitled","مشروع بدون اسم");t=`${x(a)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${f.id}">${x(Be)}</button>`}ut=`
      <div class="res-info-row">
        <span class="label">📁 ${Re}</span>
        <span class="value">${t}</span>
      </div>
    `}const z=[];z.push(K("👤",He,A?.customerName||e.customerName||Je)),z.push(K("📞",Ee,A?.phone||"—")),z.push(K("🗓️",ze,Yt)),z.push(K("🗓️",Ve,Zt)),z.push(K("📦",Ke,kt)),z.push(K("⏱️",pe,re)),z.push(K("📝",je,sa)),ut&&z.push(ut);const fa=z.join(""),va=I.length?I.map(t=>{const a=t.items[0]||{},r=Ha(a)||t.image,p=r?`<img src="${r}" alt="${he}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let _=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)_=[...t.packageItems];else{const l=[];t.items.forEach($=>{Array.isArray($?.packageItems)&&$.packageItems.length&&l.push(...$.packageItems)}),_=l}if(Array.isArray(_)&&_.length>1){const l=new Set;_=_.filter($=>{const d=$?.normalizedBarcode&&String($.normalizedBarcode).toLowerCase()||$?.barcode&&String($.barcode).toLowerCase()||($?.equipmentId!=null?`id:${$.equipmentId}`:null);return d?l.has(d)?!1:(l.add(d),!0):!0})}const b=ct(t)||t.items.some(l=>ct(l))||_.length>0,S=(l,{fallback:$=1,max:d=1e3}={})=>{const y=ta(l);return Number.isFinite(y)&&y>0?Math.min(d,y):$};let m;if(b){const l=S(a?.qty??a?.quantity??a?.count,{fallback:NaN,max:999});Number.isFinite(l)&&l>0?m=l:m=S(t.quantity??t.count??1,{fallback:1,max:999})}else m=S(t.quantity??t.count??a?.qty??a?.quantity??a?.count??0,{fallback:1,max:9999});const L=n(String(m)),o=(l,{preferPositive:$=!1}={})=>{let d=Number.NaN;for(const y of l){const q=g(y);if(Number.isFinite(q)){if($&&q>0)return q;Number.isFinite(d)||(d=q)}}return d};let s,c,u;if(b){const l=[a?.price,a?.unit_price,a?.unitPrice,t.unitPrice];if(s=o(l,{preferPositive:!0}),!Number.isFinite(s)||s<0){const y=g(t.totalPrice??a?.total??a?.total_price);Number.isFinite(y)&&m>0&&(s=y/m)}Number.isFinite(s)||(s=0);const $=[a?.cost,a?.unit_cost,a?.unitCost,t.unitCost];c=o($,{preferPositive:!0}),Number.isFinite(c)||(c=0);const d=[a?.total,a?.total_price,t.totalPrice];if(u=o(d),!Number.isFinite(u))u=s*m;else{const y=s*m;Number.isFinite(y)&&y>0&&Math.abs(u-y)>y*.25&&(u=y)}}else{const l=[a?.price,a?.unit_price,a?.unitPrice,t.unitPrice];if(s=o(l,{preferPositive:!0}),!Number.isFinite(s)||s<0){const d=g(t.totalPrice??a?.total??a?.total_price);Number.isFinite(d)&&m>0&&(s=d/m)}Number.isFinite(s)||(s=0);const $=[a?.cost,a?.unit_cost,a?.unitCost,t.unitCost];c=o($,{preferPositive:!0}),(!Number.isFinite(c)||c<0)&&(c=0),u=g(t.totalPrice??a?.total??a?.total_price),Number.isFinite(u)||(u=s*m)}s=N(s),c=N(c),u=N(u);const w=`${n(s.toFixed(2))} ${v}`,h=`${n(c.toFixed(2))} ${v}`;`${n(u.toFixed(2))}${v}`;const R=t.barcodes.map(l=>n(String(l||""))).filter(Boolean),T=R.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${R.map(l=>`<li>${l}</li>`).join("")}
              </ul>
            </details>`:"";let V="";if(_.length){const l=new Map,$=d=>1;if(_.forEach(d=>{if(!d)return;const y=O(d.barcode||d.normalizedBarcode||d.desc||Math.random());if(!y)return;const q=l.get(y),W=$();if(q){q.qty=W,q.total=W;return}l.set(y,{desc:d.desc||d.barcode||i("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(W,99)),total:Math.max(1,Math.min(W,99)),barcode:d.barcode??d.normalizedBarcode??""})}),l.size){const d=Array.from(l.values()).map(y=>{const q=n(String(y.qty>0?Math.min(y.qty,99):1)),W=x(y.desc||""),Sa=y.barcode?` <span class="reservation-package-items__barcode">(${x(n(String(y.barcode)))})</span>`:"";return`<li>${W}${Sa} × ${q}</li>`}).join("");V=`
              <details class="reservation-package-items">
                <summary>${i("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${d}
                </ul>
              </details>
            `}}const U=b?`${V||""}${T||""}`:T,Y=n(String(C));let P;if(b){let l=s;if(!Number.isFinite(l)||l<=0){const $={package_code:t?.package_code||t?.packageDisplayCode||t?.barcode||t?.packageId||t?.key,packageItems:Array.isArray(t?.packageItems)?t.packageItems:void 0};try{const d=Et($,{packageQuantity:Number.isFinite(m)?m:1,days:1});Number.isFinite(Number(d.perDayTotal))&&(l=Number(d.perDayTotal))}catch{}}P=N(l*C)}else P=N(s*m*C);const It=`${n(P.toFixed(2))} ${v}`;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${p}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${x(a.desc||a.description||a.name||t.description||"-")}</div>
                  ${U}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${x(B.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${L}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${x(i("reservations.details.table.headers.days","الأيام"))}">${Y}</td>
            <td class="reservation-modal-items-table__cell" data-label="${x(B.unitPrice)}">${w}</td>
            <td class="reservation-modal-items-table__cell" data-label="${x(B.unitCost)}">${h}</td>
            <td class="reservation-modal-items-table__cell" data-label="${x(B.total)}">${It}</td>
          </tr>
        `}).join(""):`<tr><td colspan="6" class="text-center">${fe}</td></tr>`,_a=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${B.item}</th>
            <th>${B.quantity}</th>
            <th>${i("reservations.details.table.headers.days","الأيام")}</th>
            <th>${B.unitPrice}</th>
            <th>${B.unitCost}</th>
            <th>${B.total}</th>
          </tr>
        </thead>
        <tbody>${va}</tbody>
      </table>
    </div>
  `,qt=G.map((t,a)=>{const r=n(String(a+1));let p=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!p||p.trim()==="")&&(p=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!p||p.trim()==="")try{const u=typeof Z=="function"?Z():[],w=t.positionId?u.find(T=>String(T.id)===String(t.positionId)):null,h=!w&&t.positionKey?u.find(T=>String(T.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,R=w||h||null;R&&(p=R.labelAr||R.labelEn||R.name||p)}catch{}const _=mt(p)||i("reservations.crew.positionFallback","منصب بدون اسم"),b=mt(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),S=mt(t.technicianName)||i("technicians.picker.noTechnicianOption","— بدون تعيين —"),m=t.technicianPhone||_e,L=N(g(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0)),o=N(g(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0)),s=`${n(o.toFixed(2))} ${v}`,c=L>0?`${n(L.toFixed(2))} ${v}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${r}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${S}</span>
            <small class="text-muted">🏷️ ${_}${b?` — ${b}`:""}</small>
            <small class="text-muted">💼 ${s}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${m}</div>
          ${c?`<div>💵 ${i("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${c}</div>`:""}
        </div>
      </div>
    `}).join(""),$a=Array.isArray(G)&&G.length>4,Aa=G.length?$a?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${x(i("reservations.details.slider.prev","السابق"))}" title="${x(i("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${qt}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${x(i("reservations.details.slider.next","التالي"))}" title="${x(i("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${qt}</div>`:`<ul class="reservation-modal-technicians"><li>${ve}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Ce}</span>
          <strong>${Xt}</strong>
        </div>
        <div class="status-chips">
          ${ha}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${we}</h6>
          ${fa}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${ke}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${ya}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${We}</h6>
              ${ba}
            </div>
            ${Ft}
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Le}</span>
          <span class="count">${na}</span>
        </div>
        ${Aa}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${ge}</span>
          <span class="count">${kt}</span>
        </div>
        ${_a}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${D}">
          ${i("reservations.details.actions.exportPdf","عرض سعر")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-checklist-btn" data-index="${D}">
          ${i("reservations.details.actions.exportChecklist","📋 لستة معدات وفنيين")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${D}">${qe}</button>
        ${Vt?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${D}">${Ie}</button>`:""}
      </div>
    </div>
  `}export{Wa as a,Ga as b,Oa as c,Ea as f,Ia as g,Qa as i,Ha as r};
