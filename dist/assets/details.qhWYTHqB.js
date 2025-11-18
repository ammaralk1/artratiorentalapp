import{d as yt,v as Na,n,y as pt,t as i}from"./auth.BLFzWQsL.js";import{n as J,i as O,j as Et}from"./state.DZCwr8Fl.js";import{a as xa,z as Pa,C as Ca,F as A,E as D,b as wa,d as Fa,c as ka,e as La,L as Ht}from"./reservationsService.BDS0dDsH.js";const Ta=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),ga=new Set(["maintenance","reserved","retired"]);function Da(e){const S=String(e??"").trim().toLowerCase();return S&&Ta.get(S)||"available"}function qa(e){return e?typeof e=="object"?e:Ha(e):null}function Ia(e){const S=qa(e);return S?Da(S.status||S.state||S.statusLabel||S.status_label):"available"}function Qa(e){return!ga.has(Ia(e))}function Ea(e={}){return e.image||e.imageUrl||e.img||""}function Ga(e={}){const S=[e.cost,e.unit_cost,e.unitCost,e.rental_cost,e.rentalCost,e.purchase_price,e.purchasePrice];for(const j of S){const q=Number(j);if(Number.isFinite(q))return q}return 0}function Wa(e){if(!e)return null;const S=J(e),{equipment:j=[]}=yt();return(j||[]).find(q=>J(q?.barcode)===S)||null}function Ha(e){const S=J(e);if(!S)return null;const{equipment:j=[]}=yt();return(j||[]).find(q=>J(q?.barcode)===S)||null}function x(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function mt(e){if(e==null)return"";const S=String(e).trim();return S?n(S):""}function Oa(e,S,j=[],q,f=null){const{projectLinked:bt,effectiveConfirmed:ht}=xa(e,f);e.paid===!0||e.paid;const Rt=Pa(e),tt=e.items||[];let{groups:E}=Ca(e);const Mt=t=>!!(t&&typeof t=="object"&&(t.type==="package"||Array.isArray(t.packageItems)&&t.packageItems.length||Array.isArray(t.items)&&t.items.some(a=>a&&a.type==="package"))),Bt=t=>{const a=(t?.package_code??t?.packageDisplayCode??t?.barcode??t?.description??(Array.isArray(t?.items)&&t.items[0]?.barcode)??"").toString().trim().toLowerCase();return n(a)},ft=(t,a)=>{const r=h=>{const N=Array.isArray(h?.items)?h.items[0]:null,m=[N?.price,N?.unit_price,N?.unitPrice,h?.unitPrice,h?.totalPrice];for(const g of m){const o=D(g);if(Number.isFinite(o)&&o>0)return o}return 0},p=r(t),_=r(a);return p&&_?p<=_?t:a:p?t:a},H=[],Q=new Map;E.forEach(t=>{if(!Mt(t)){H.push(t);return}const a=Bt(t);if(!a){if(!Q.has("__unknown__"))Q.set("__unknown__",H.length),H.push(t);else{const r=Q.get("__unknown__");H[r]=ft(H[r],t)}return}if(!Q.has(a))Q.set(a,H.length),H.push(t);else{const r=Q.get(a);H[r]=ft(H[r],t)}}),E=H;const{technicians:vt=[]}=yt(),zt=[].concat(Array.isArray(j)?j:[]).concat(Array.isArray(vt)?vt:[]),et=new Map;zt.forEach(t=>{if(!t||t.id==null)return;const a=String(t.id),r=et.get(a)||{};et.set(a,{...r,...t})});const G=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(t=>({technicianId:t}))).map((t,a)=>{const r=t?.technicianId!=null?et.get(String(t.technicianId)):null;let p=t.positionLabel??t.position_name??t.position_label??t.role??t.position??"";(!p||p.trim()==="")&&(p=t.positionLabelAr??t.position_label_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_name_en??"");const _=t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??"";let h=p,N=_;if(!h||h.trim()==="")try{const o=O?O():[];let s=null;if(t.positionId!=null&&(s=o.find(d=>String(d.id)===String(t.positionId))||null),!s){const d=t.positionKey??t.position_key??t.positionName??t.position_name??t.position??"";if(d&&(s=typeof Et=="function"?Et(d):null,!s&&o.length)){const c=String(d).trim().toLowerCase();s=o.find(P=>[P.name,P.labelAr,P.labelEn].filter(Boolean).map(y=>String(y).toLowerCase()).includes(c))||null}}s&&(h=s.labelAr||s.labelEn||s.name||"",(!N||String(N).trim()==="")&&(s.labelAr&&s.labelEn?N=h===s.labelAr?s.labelEn:s.labelAr:N=s.labelAr||s.labelEn||""))}catch{}const m=A(D(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??r?.dailyWage??r?.wage??0)),g=A(D(t.positionClientPrice??t.position_client_price??t.client_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??r?.dailyTotal??r?.total??r?.total_wage??0));return{assignmentId:t.assignmentId??t.assignment_id??`crew-${a}`,positionId:t.positionId??t.position_id??null,positionKey:t.positionKey??t.position_key??t.positionName??t.position_name??t.position??null,positionLabel:h,positionLabelAlt:N,positionLabelAr:t.positionLabelAr??t.position_label_ar??null,positionLabelEn:t.positionLabelEn??t.position_label_en??null,positionCost:m,positionClientPrice:g,technicianId:t.technicianId!=null?String(t.technicianId):r?.id!=null?String(r.id):null,technicianName:t.technicianName??t.technician_name??r?.name??null,technicianRole:t.technicianRole??r?.role??null,technicianPhone:t.technicianPhone??r?.phone??null,notes:t.notes??null}}),Vt=Na(),F=wa(e.start,e.end),jt=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,_t=D(jt),Kt=Number.isFinite(_t)?_t:0,Ut=e.discountType??e.discount_type??e.discountMode??"percent",Qt=String(Ut).toLowerCase()==="amount"?"amount":"percent",$t=!!(e.applyTax??e.apply_tax??e.taxApplied),At=D(e.cost??e.total??e.finalTotal);Number.isFinite(At)&&A(At);const St=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,X=St!=null?D(St):Number.NaN,Gt=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(X)&&X>0)&&Number.isFinite(X)?X:0,L=Fa({items:tt,technicianIds:e.technicians||[],crewAssignments:G,discount:Kt,discountType:Qt,applyTax:$t,start:e.start,end:e.end,companySharePercent:Gt,groupingSource:e}),at=A(L.equipmentTotal),Wt=A(L.equipmentCostTotal),Nt=A(L.crewTotal),Ot=A(L.crewCostTotal),it=A(L.discountAmount),Jt=A(L.subtotalAfterDiscount),nt=Number.isFinite(L.companySharePercent)?L.companySharePercent:0;let st=A(L.companyShareAmount);st=nt>0?A(Math.max(0,st)):0;const ot=A(L.taxAmount),M=A(L.finalTotal),xt=A(L.netProfit),Xt=n(String(e.reservationId??e.id??"")),Yt=e.start?n(pt(e.start)):"-",Zt=e.end?n(pt(e.end)):"-",te=n(String(G.length)),ee=n(at.toFixed(2)),ae=n(Wt.toFixed(2)),ie=n(it.toFixed(2)),ne=n(Jt.toFixed(2)),se=n(ot.toFixed(2)),oe=n((Number.isFinite(M)?M:0).toFixed(2)),re=n(String(F)),v=i("reservations.create.summary.currency","SR"),le=i("reservations.details.labels.discount","الخصم"),ce=i("reservations.details.labels.tax","الضريبة (15%)"),de=i("reservations.details.labels.crewTotal","إجمالي الفريق"),ue=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),pe=i("reservations.details.labels.duration","عدد الأيام"),me=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),ye=i("reservations.details.labels.netProfit","💵 صافي الربح"),be=i("reservations.details.labels.equipmentCost","تكلفة المعدات"),he=i("reservations.create.equipment.imageAlt","صورة"),B={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),unitCost:i("reservations.equipment.table.unitCost","تكلفة الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},fe=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),ve=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");i("reservations.details.technicians.roleUnknown","غير محدد");const _e=i("reservations.details.technicians.phoneUnknown","غير متوفر");i("reservations.details.technicians.wage","{amount} {currency} / اليوم");const $e=i("reservations.list.status.confirmed","✅ مؤكد"),Ae=i("reservations.list.status.pending","⏳ غير مؤكد"),Se=i("reservations.list.payment.paid","💳 مدفوع"),Ne=i("reservations.list.payment.unpaid","💳 غير مدفوع"),xe=i("reservations.list.payment.partial","💳 مدفوع جزئياً"),Pe=i("reservations.list.status.completed","📁 مغلق"),Ce=i("reservations.details.labels.id","🆔 رقم الحجز"),we=i("reservations.details.section.bookingInfo","بيانات الحجز"),Fe=i("reservations.details.section.paymentSummary","ملخص الدفع"),ke=i("reservations.details.labels.finalTotal","المجموع النهائي"),Le=i("reservations.details.section.crew","😎 الفريق الفني"),Te=i("reservations.details.crew.count","{count} عضو"),ge=i("reservations.details.section.items","📦 المعدات المرتبطة"),De=i("reservations.details.items.count","{count} عنصر"),qe=i("reservations.details.actions.edit","✏️ تعديل"),Ie=i("reservations.details.actions.delete","🗑️ حذف"),Ee=i("reservations.details.labels.customer","العميل"),He=i("reservations.details.labels.contact","رقم التواصل"),Re=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Me=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Be=i("reservations.details.actions.openProject","📁 فتح المشروع"),ze=i("reservations.details.labels.start","بداية الحجز"),Ve=i("reservations.details.labels.end","نهاية الحجز"),je=i("reservations.details.labels.notes","ملاحظات"),Ke=i("reservations.list.noNotes","لا توجد ملاحظات"),Ue=i("reservations.details.labels.itemsCount","عدد المعدات"),Qe=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),Ge=be,We=i("reservations.paymentHistory.title","سجل الدفعات"),Oe=i("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Je=i("reservations.list.unknownCustomer","غير معروف"),Pt=!bt||!f?[]:Array.isArray(f?.paymentHistory)?f.paymentHistory:Array.isArray(f?.payment_history)?f.payment_history:Array.isArray(f?.payments)?f.payments:Array.isArray(f?.paymentLogs)?f.paymentLogs:[],Xe=Array.isArray(e?.paymentHistory)?e.paymentHistory:Array.isArray(e?.payment_history)?e.payment_history:Array.isArray(e?.paymentLogs)?e.paymentLogs:[],rt=Pt.length?Pt:Xe,Ye=rt.length?0:Number(e.paidAmount??e.paid_amount)||0,Ze=rt.length?0:Number(e.paidPercent??e.paid_percentage)||0,Ct=ka({totalAmount:Number.isFinite(Number(M))?Number(M):0,paidAmount:Ye,paidPercent:Ze,history:rt}),Y=La({manualStatus:null,paidAmount:Ct.paidAmount,paidPercent:Ct.paidPercent,totalAmount:Number.isFinite(Number(M))?Number(M):0}),lt=Y==="partial",wt=Y==="paid"?Se:lt?xe:Ne;function ta(t){if(t==null)return Number.NaN;if(typeof t=="number")return Number.isFinite(t)?t:Number.NaN;const a=String(t).replace(/[^0-9.+-]/g,""),r=Number(a);return Number.isFinite(r)?r:Number.NaN}const ct=(t={})=>{const a=String(t.type??t.kind??t.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(a)||Array.isArray(t.packageItems)&&t.packageItems.length)},ea=(t={})=>[t.packageId,t.package_id,t.packageCode,t.package_code,t.bundleId,t.bundle_id].some(a=>a!=null&&a!==""),aa=(t={})=>!t||typeof t!="object"?!1:!ct(t)&&ea(t);let dt=Array.isArray(E)&&E.length?E.length:(Array.isArray(tt)?tt.filter(t=>t&&typeof t=="object"&&!aa(t)).length:0)||1;dt=Math.max(1,Math.round(dt));const ia=n(String(dt)),Ft=De.replace("{count}",ia),na=Te.replace("{count}",te),sa=e.notes?n(e.notes):Ke,oa=n(Nt.toFixed(2)),ra=n(Ot.toFixed(2)),la=n(String(nt)),ca=n(st.toFixed(2)),da=`${la}% (${ca} ${v})`,ua=Number.isFinite(xt)?Math.max(0,xt):0,pa=n(ua.toFixed(2)),R=[{icon:"💼",label:Qe,value:`${ee} ${v}`}];R.push({icon:"💸",label:Ge,value:`${ae} ${v}`}),R.push({icon:"😎",label:de,value:`${oa} ${v}`});const ma=i("reservations.details.labels.crewCost","تكلفة الفريق");R.push({icon:"💵",label:ma,value:`${ra} ${v}`}),it>0&&R.push({icon:"💸",label:le,value:`${ie} ${v}`}),R.push({icon:"📊",label:ue,value:`${ne} ${v}`}),$t&&ot>0&&R.push({icon:"🧾",label:ce,value:`${se} ${v}`}),nt>0&&R.push({icon:"🏦",label:me,value:da}),R.push({icon:"💵",label:ye,value:`${pa} ${v}`}),R.push({icon:"💰",label:ke,value:`${oe} ${v}`});const ya=R.map(({icon:t,label:a,value:r})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${t} ${a}</span>
      <span class="summary-details-value">${r}</span>
    </div>
  `).join("");let kt="";try{const a=new URL(window.location.href).searchParams.get("debugFinance");if(a==="1"||a==="true"){const r=o=>(o?.type||"").toLowerCase()==="package"&&String(o?.pricingMode||"").toLowerCase()==="fixed"?"fixed":"daily",p=o=>{if((o?.type||"").toLowerCase()==="package")return!1;const s=Array.isArray(o?.items)?o.items:[];if(!s.length)return!1;if(s.some(y=>y?.reservation_id!=null||y?.reservationId!=null))return!0;const c=s.every(y=>y?.unit_price!=null||y?.unitPrice!=null),P=s.some(y=>y?.daily_rate!=null||y?.dailyRate!=null||y?.unit_rate!=null||y?.unitRate!=null||y?.price!=null);return c&&!P};let _=0,h=0,N=0,m=0;const g=(Array.isArray(E)?E:[]).map((o,s)=>{const d=Number.isFinite(Number(o?.quantity))?Number(o.quantity):0,c=Number.isFinite(Number(o?.unitPrice))?Number(o.unitPrice):0,P=r(o);let y=P==="fixed"?d*c:d*c*F,k="";if((o?.type||"").toLowerCase()==="package")try{const C={package_code:o?.package_code||o?.packageDisplayCode||o?.barcode||o?.packageId||o?.key,packageItems:Array.isArray(o?.packageItems)?o.packageItems:void 0},V=Number(o?.unitPrice);let K;if(Number.isFinite(V)&&V>0)K=d*V;else{const w=Ht(C,{packageQuantity:d,days:F});K=Number.isFinite(Number(w.perDayTotal))?Number(w.perDayTotal):d*c}y=K*F,_+=K,h+=y;const Z=(pricing.lines||[]).map((w,It)=>`
              <tr>
                <td colspan="2"></td>
                <td>• ${x(String(w.desc||w.barcode||"item"))}</td>
                <td>${n(String(w.qtyPerPackage))} × ${n(String(d))} × ${n(String(F))}</td>
                <td>${n(String((w.unitPrice||0).toFixed?w.unitPrice.toFixed(2):w.unitPrice))}</td>
                <td>${n(String((w.perDayTotal*F).toFixed?(w.perDayTotal*F).toFixed(2):w.perDayTotal*F))}</td>
              </tr>`).join("");k=Z||""}catch{}else{const C=p(o),V=C?0:d*c,K=C?d*c:V*F;N+=V,m+=K}return`
          <tr>
            <td>${s+1}</td>
            <td>${x(String(o?.description||"-"))}</td>
            <td>${P}</td>
            <td>${n(String(d))}</td>
            <td>${n(String(c.toFixed?c.toFixed(2):c))}</td>
            <td>${n(String(y.toFixed?y.toFixed(2):y))}</td>
          </tr>${k}`}).join("");kt=`
        <details class="reservation-finance-debug" style="margin-top:12px">
          <summary>Debug: تفصيل التسعير</summary>
          <div style="padding:8px 0; font-size: 12px">
            <div>الأيام: ${n(String(F))}</div>
            <div style="margin-top:6px"><strong>مجاميع سريعة:</strong></div>
            <div>من الحِزم (يومي): ${n(String(_.toFixed(2)))} ${v}</div>
            <div>من الحِزم (كامل المدة): ${n(String(h.toFixed(2)))} ${v}</div>
            <div>مفردة خارج الحِزم (يومي): ${n(String(N.toFixed(2)))} ${v}</div>
            <div>مفردة خارج الحِزم (كامل المدة): ${n(String(m.toFixed(2)))} ${v}</div>
            <div style="margin-top:4px">Equipment Total (breakdown): ${n(String(at.toFixed(2)))} ${v}</div>
            <table class="table table-xs" style="width:100%; margin-top:8px">
              <thead>
                <tr>
                  <th>#</th><th>الوصف</th><th>النوع</th><th>الكمية</th><th>سعر الوحدة</th><th>المساهمة</th>
                </tr>
              </thead>
              <tbody>${g}</tbody>
            </table>
          </div>
        </details>`,console.debug("[finance-debug] groups",E,{rentalDays:F,equipmentTotal:at,crewTotal:Nt,discountAmount:it,taxAmount:ot})}}catch{}console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let T=[];bt&&f&&(Array.isArray(f.paymentHistory)?T=f.paymentHistory:Array.isArray(f.payment_history)?T=f.payment_history:Array.isArray(f.payments)?T=f.payments:Array.isArray(f.paymentLogs)&&(T=f.paymentLogs)),(!Array.isArray(T)||T.length===0)&&(Array.isArray(e.paymentHistory)?T=e.paymentHistory:Array.isArray(e.payment_history)?T=e.payment_history:Array.isArray(e.paymentLogs)?T=e.paymentLogs:T=[]);const Lt=Array.isArray(T)?T:[],ba=Lt.length?`<ul class="reservation-payment-history-list">${Lt.map(t=>{const a=typeof t?.type=="string"?t.type.toLowerCase():"",r=a==="amount"?i("reservations.paymentHistory.type.amount","دفعة مالية"):a==="percent"?i("reservations.paymentHistory.type.percent","دفعة نسبة"):i("reservations.paymentHistory.type.unknown","دفعة"),p=Number.isFinite(Number(t?.percentage))&&Number(t.percentage)>0?Number(t.percentage):Number.isFinite(Number(t?.value))&&a==="percent"?Number(t.value):null,_=p!=null&&Number.isFinite(Number(M))&&Number(M)>0?Math.round(Number(M)*(p/100)*100)/100:null,h=Number.isFinite(Number(t?.amount))&&Number(t.amount)>0?Number(t.amount):null,N=a==="percent"&&_!=null?_:h,m=N!=null?`${n(N.toFixed(2))} ${v}`:"—",g=p!=null?`${n(p.toFixed(2))}%`:"—",o=t?.recordedAt?n(pt(t.recordedAt)):"—",s=t?.note?`<div class="payment-history-note">${x(n(t.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${x(r)}</span>
              <span class="payment-history-entry__amount">${m}</span>
              <span class="payment-history-entry__percent">${g}</span>
              <span class="payment-history-entry__date">${o}</span>
            </div>
            ${s}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${x(Oe)}</div>`,Tt=String(e?.status||e?.reservationStatus||"").toLowerCase(),gt=Tt==="cancelled"||Tt==="canceled",Dt=gt?[{text:i("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:wt,className:Y==="paid"?"status-paid":lt?"status-partial":"status-unpaid"}]:[{text:ht?$e:Ae,className:ht?"status-confirmed":"status-pending"},{text:wt,className:Y==="paid"?"status-paid":lt?"status-partial":"status-unpaid"}];Rt&&!gt&&Dt.push({text:Pe,className:"status-completed"});const ha=Dt.map(({text:t,className:a})=>`<span class="status-chip ${a}">${t}</span>`).join(""),U=(t,a,r)=>`
    <div class="res-info-row">
      <span class="label">${t} ${a}</span>
      <span class="value">${r}</span>
    </div>
  `;let ut="";if(e.projectId){let t=x(Me);if(f){const a=f.title||i("projects.fallback.untitled","مشروع بدون اسم");t=`${x(a)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${f.id}">${x(Be)}</button>`}ut=`
      <div class="res-info-row">
        <span class="label">📁 ${Re}</span>
        <span class="value">${t}</span>
      </div>
    `}const z=[];z.push(U("👤",Ee,S?.customerName||e.customerName||Je)),z.push(U("📞",He,S?.phone||"—")),z.push(U("🗓️",ze,Yt)),z.push(U("🗓️",Ve,Zt)),z.push(U("📦",Ue,Ft)),z.push(U("⏱️",pe,re)),z.push(U("📝",je,sa)),ut&&z.push(ut);const fa=z.join(""),va=E.length?E.map(t=>{const a=t.items[0]||{},r=Ea(a)||t.image,p=r?`<img src="${r}" alt="${he}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let _=[];if(Array.isArray(t.packageItems)&&t.packageItems.length)_=[...t.packageItems];else{const l=[];t.items.forEach($=>{Array.isArray($?.packageItems)&&$.packageItems.length&&l.push(...$.packageItems)}),_=l}if(Array.isArray(_)&&_.length>1){const l=new Set;_=_.filter($=>{const u=$?.normalizedBarcode&&String($.normalizedBarcode).toLowerCase()||$?.barcode&&String($.barcode).toLowerCase()||($?.equipmentId!=null?`id:${$.equipmentId}`:null);return u?l.has(u)?!1:(l.add(u),!0):!0})}const h=ct(t)||t.items.some(l=>ct(l))||_.length>0,N=(l,{fallback:$=1,max:u=1e3}={})=>{const b=ta(l);return Number.isFinite(b)&&b>0?Math.min(u,b):$};let m;if(h){const l=N(a?.qty??a?.quantity??a?.count,{fallback:NaN,max:999});Number.isFinite(l)&&l>0?m=l:m=N(t.quantity??t.count??1,{fallback:1,max:999})}else m=N(t.quantity??t.count??a?.qty??a?.quantity??a?.count??0,{fallback:1,max:9999});const g=n(String(m)),o=(l,{preferPositive:$=!1}={})=>{let u=Number.NaN;for(const b of l){const I=D(b);if(Number.isFinite(I)){if($&&I>0)return I;Number.isFinite(u)||(u=I)}}return u};let s,d,c;if(h){const l=[a?.price,a?.unit_price,a?.unitPrice,t.unitPrice];if(s=o(l,{preferPositive:!0}),!Number.isFinite(s)||s<0){const b=D(t.totalPrice??a?.total??a?.total_price);Number.isFinite(b)&&m>0&&(s=b/m)}Number.isFinite(s)||(s=0);const $=[a?.cost,a?.unit_cost,a?.unitCost,t.unitCost];d=o($,{preferPositive:!0}),Number.isFinite(d)||(d=0);const u=[a?.total,a?.total_price,t.totalPrice];if(c=o(u),!Number.isFinite(c))c=s*m;else{const b=s*m;Number.isFinite(b)&&b>0&&Math.abs(c-b)>b*.25&&(c=b)}}else{const l=[a?.price,a?.unit_price,a?.unitPrice,t.unitPrice];if(s=o(l,{preferPositive:!0}),!Number.isFinite(s)||s<0){const u=D(t.totalPrice??a?.total??a?.total_price);Number.isFinite(u)&&m>0&&(s=u/m)}Number.isFinite(s)||(s=0);const $=[a?.cost,a?.unit_cost,a?.unitCost,t.unitCost];d=o($,{preferPositive:!0}),(!Number.isFinite(d)||d<0)&&(d=0),c=D(t.totalPrice??a?.total??a?.total_price),Number.isFinite(c)||(c=s*m)}s=A(s),d=A(d),c=A(c);const P=`${n(s.toFixed(2))} ${v}`,y=`${n(d.toFixed(2))} ${v}`;`${n(c.toFixed(2))}${v}`;const k=t.barcodes.map(l=>n(String(l||""))).filter(Boolean),C=k.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${k.map(l=>`<li>${l}</li>`).join("")}
              </ul>
            </details>`:"";let V="";if(_.length){const l=new Map,$=u=>1;if(_.forEach(u=>{if(!u)return;const b=J(u.barcode||u.normalizedBarcode||u.desc||Math.random());if(!b)return;const I=l.get(b),W=$();if(I){I.qty=W,I.total=W;return}l.set(b,{desc:u.desc||u.barcode||i("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(W,99)),total:Math.max(1,Math.min(W,99)),barcode:u.barcode??u.normalizedBarcode??""})}),l.size){const u=Array.from(l.values()).map(b=>{const I=n(String(b.qty>0?Math.min(b.qty,99):1)),W=x(b.desc||""),Sa=b.barcode?` <span class="reservation-package-items__barcode">(${x(n(String(b.barcode)))})</span>`:"";return`<li>${W}${Sa} × ${I}</li>`}).join("");V=`
              <details class="reservation-package-items">
                <summary>${i("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${u}
                </ul>
              </details>
            `}}const K=h?`${V||""}${C||""}`:C,Z=n(String(F));let w;if(h){let l=s;if(!Number.isFinite(l)||l<=0){const $={package_code:t?.package_code||t?.packageDisplayCode||t?.barcode||t?.packageId||t?.key,packageItems:Array.isArray(t?.packageItems)?t.packageItems:void 0};try{const u=Ht($,{packageQuantity:Number.isFinite(m)?m:1,days:1});Number.isFinite(Number(u.perDayTotal))&&(l=Number(u.perDayTotal))}catch{}}w=A(l*F)}else w=A(s*m*F);const It=`${n(w.toFixed(2))} ${v}`;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${p}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${x(a.desc||a.description||a.name||t.description||"-")}</div>
                  ${K}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${x(B.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${g}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${x(i("reservations.details.table.headers.days","الأيام"))}">${Z}</td>
            <td class="reservation-modal-items-table__cell" data-label="${x(B.unitPrice)}">${P}</td>
            <td class="reservation-modal-items-table__cell" data-label="${x(B.unitCost)}">${y}</td>
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
  `,qt=G.map((t,a)=>{const r=n(String(a+1));let p=t.positionLabel??t.position_name??t.position_label??t.position_title??t.role??t.position??null;if((!p||p.trim()==="")&&(p=t.positionLabelAr??t.position_label_ar??t.position_title_ar??t.positionLabelEn??t.position_label_en??t.position_name_ar??t.position_title_en??t.position_name_en??null),!p||p.trim()==="")try{const c=typeof O=="function"?O():[],P=t.positionId?c.find(C=>String(C.id)===String(t.positionId)):null,y=!P&&t.positionKey?c.find(C=>String(C.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,k=P||y||null;k&&(p=k.labelAr||k.labelEn||k.name||p)}catch{}const _=mt(p)||i("reservations.crew.positionFallback","منصب بدون اسم"),h=mt(t.positionLabelAlt??t.position_label_alt??t.positionLabelEn??t.position_label_en??t.positionLabelAr??t.position_label_ar??t.position_name_en??t.position_name_ar??""),N=mt(t.technicianName)||i("technicians.picker.noTechnicianOption","— بدون تعيين —"),m=t.technicianPhone||_e,g=A(D(t.positionCost??t.position_cost??t.cost??t.daily_wage??t.dailyWage??t.internal_cost??0));let o=A(D(t.positionClientPrice??t.position_client_price??t.client_price??t.customer_price??t.position_price??t.clientPrice??t.daily_total??t.dailyTotal??t.total??0));if(!Number.isFinite(o)||o<=0)try{const c=O?O():[],P=t.positionId?c.find(C=>String(C.id)===String(t.positionId)):null,y=!P&&t.positionKey?c.find(C=>String(C.name).toLowerCase()===String(t.positionKey).toLowerCase()):null,k=P||y||null;k&&Number.isFinite(Number(k.clientPrice))&&(o=A(Number(k.clientPrice)))}catch{}const s=`${n(o.toFixed(2))} ${v}`,d=g>0?`${n(g.toFixed(2))} ${v}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${r}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${N}</span>
            <small class="text-muted">🏷️ ${_}${h?` — ${h}`:""}</small>
            <small class="text-muted">💼 ${s}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${m}</div>
          ${d?`<div>💵 ${i("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${d}</div>`:""}
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
          <h6 class="summary-heading">${Fe}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${ya}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${We}</h6>
              ${ba}
            </div>
            ${kt}
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
          <span class="count">${Ft}</span>
        </div>
        ${_a}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${q}">
          ${i("reservations.details.actions.exportPdf","عرض سعر")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-checklist-btn" data-index="${q}">
          ${i("reservations.details.actions.exportChecklist","📋 لستة معدات وفنيين")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${q}">${qe}</button>
        ${Vt?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${q}">${Ie}</button>`:""}
      </div>
    </div>
  `}export{Wa as a,Ga as b,Oa as c,Ha as f,Ia as g,Qa as i,Ea as r};
