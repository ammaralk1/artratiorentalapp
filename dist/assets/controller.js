import{e as Q,t as i,n as y,h as q,z as $s,k as Fe,j as zn,o as ks,u as Cs}from"./auth.js";import{H as K,I as sn,n as ae,J as Ts,K as tt,D as oe,L as On,M as Ls,N as Hn,O as we,P as Ce,Q as ze,R as Se,S as on,T as Ds,U as Et,V as Bs,W as Vn,v as Un,X as Kn,Y as _s,s as At,i as Qn,Z as Gn,_ as js,$ as Wn,a0 as Xn,c as rn,r as Te,t as Yn,a1 as Ps,g as Zn,a2 as Ns,a3 as Fs,w as Rs,E as Ms,a4 as zs,a5 as Os,a6 as Hs,x as Vs,z as Us}from"./projectsService.js";const Ks=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Qs=new Set(["maintenance","reserved","retired"]);function Gs(e){const t=String(e??"").trim().toLowerCase();return t&&Ks.get(t)||"available"}function Ws(e){return e?typeof e=="object"?e:$t(e):null}function xe(e){const t=Ws(e);return t?Gs(t.status||t.state||t.statusLabel||t.status_label):"available"}function Jn(e){return!Qs.has(xe(e))}function Le(e={}){return e.image||e.imageUrl||e.img||""}function Xs(e){if(!e)return null;const t=K(e),{equipment:n=[]}=Q();return(n||[]).find(a=>K(a?.barcode)===t)||null}function $t(e){const t=K(e);if(!t)return null;const{equipment:n=[]}=Q();return(n||[]).find(a=>K(a?.barcode)===t)||null}let Mt=null,ea=[],zt=new Map,Ot=new Map,vt=new Map;function bt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ht(e){return y(String(e||"")).trim().toLowerCase()}function Ys(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=y(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function ta(e){const t=y(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Oe(e){switch(e){case"maintenance":return i("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return i("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return i("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return i("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function ln(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function cn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function na(e,t,{allowPartial:n=!1}={}){const a=ae(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const o=[];return e.forEach((l,r)=>{r.includes(a)&&o.push(l)}),o.length===1?o[0]:null}function Ht(e,t={}){return na(zt,e,t)}function Vt(e,t={}){return na(Ot,e,t)}function Re(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function aa(e){ea=Array.isArray(e)?[...e]:[]}function dn(){return ea}function un(e){return e&&dn().find(t=>String(t.id)===String(e))||null}function kn(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||i("projects.fallback.untitled","مشروع بدون اسم")}function nt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??oe,a=y(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:oe}function ue(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??oe,a=y(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=oe),t.dataset.companyShare=String(s),t.checked=!0}function Zs(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Cn(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Tn(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function ye({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=ln();if(!n||!a||!s)return;const o=sn()||[],l=i("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),r=i("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",l);const c=new Set;zt=new Map;const d=o.filter(f=>f&&f.id!=null).map(f=>({id:String(f.id),label:Tn(f)||r})).filter(f=>{if(!f.label)return!1;const g=ae(f.label);return!g||c.has(g)?!1:(c.add(g),zt.set(g,f),!0)}).sort((f,g)=>f.label.localeCompare(g.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(f=>`<option value="${bt(f.label)}"></option>`).join("");const u=t?"":n.value,m=e?String(e):a.value?String(a.value):"",p=m?o.find(f=>String(f.id)===m):null;if(p){const f=Tn(p)||r;a.value=String(p.id),n.value=f,n.dataset.selectedId=String(p.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function ot({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:o}=cn();if(!a||!s||!o)return;const l=Array.isArray(t)?t:dn()||[],r=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",r);const c=[...l].filter(w=>w&&w.id!=null).sort((w,h)=>String(h.createdAt||h.start||"").localeCompare(String(w.createdAt||w.start||""))),d=n?"":a.value,u=i("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;Ot=new Map;const p=c.map(w=>{const h=kn(w)||u;return{id:String(w.id),label:h}}).filter(w=>{if(!w.label)return!1;const h=ae(w.label);return!h||m.has(h)?!1:(m.add(h),Ot.set(h,w),!0)});o.innerHTML=p.map(w=>`<option value="${bt(w.label)}"></option>`).join("");const f=e?String(e):s.value?String(s.value):"",g=f?c.find(w=>String(w.id)===f):null;if(g){const w=kn(g)||u;s.value=String(g.id),a.value=w,a.dataset.selectedId=String(g.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function yt(e,t,n){const{date:a,time:s}=On(n),o=document.getElementById(e),l=document.getElementById(t);if(o){if(a)if(o._flatpickr){const r=o._flatpickr.config?.dateFormat||"Y-m-d";o._flatpickr.setDate(a,!1,r)}else o.value=a;else o._flatpickr?o._flatpickr.clear():o.value="";o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0}))}if(l){if(s)if(l._flatpickr){const r=l._flatpickr.config?.dateFormat||"H:i";l._flatpickr.setDate(s,!1,r)}else l.value=s;else l._flatpickr?l._flatpickr.clear():l.value="";l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))}}function sa(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||ot({selectedValue:a});const o=(sn()||[]).find(u=>String(u.id)===String(e.clientId)),l=o?.id!=null?String(o.id):"";ye(l?{selectedValue:l}:{selectedValue:"",resetInput:!0});const r=Cn(e,"start"),c=Cn(e,"end");r&&yt("res-start","res-start-time",r),c&&yt("res-end","res-end-time",c);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),Me(),U()}function oa({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:Q(),s=Array.isArray(a)?a:[];aa(s);const o=t!=null?String(t):n.value?String(n.value):"";ot({selectedValue:o,projectsList:s}),Me(),U()}function Me(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function mn(){const{input:e,hidden:t}=cn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),o=s?Vt(s,{allowPartial:a}):null;if(o){t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id);const l=un(o.id);l?sa(l,{skipProjectSelectUpdate:!0}):(Me(),U())}else t.value="",e.dataset.selectedId="",Me(),U()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Vt(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function pn(){const{input:e,hidden:t}=ln();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),o=s?Ht(s,{allowPartial:a}):null;o?(t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id)):(t.value="",e.dataset.selectedId=""),U()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ht(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Js(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const r=decodeURIComponent(t);n=JSON.parse(r)}catch(r){console.warn("⚠️ [reservations/createForm] Failed to decode project context",r)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),!n||!n.projectId)return;document.getElementById("res-project")&&(ot({selectedValue:String(n.projectId)}),Me());const l=un(n.projectId);if(l?sa(l,{forceNotes:!!n.forceNotes}):U(),n.start&&yt("res-start","res-start-time",n.start),n.end&&yt("res-end","res-end-time",n.end),n.customerId){const c=(sn()||[]).find(d=>String(d.id)===String(n.customerId));c?.id!=null&&ye({selectedValue:String(c.id)})}else ye({selectedValue:""})}function it(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:tt(e,n),end:tt(t,a)}}function ia(e){const t=ht(e);if(t){const r=vt.get(t);if(r)return r}const{description:n,barcode:a}=ta(e);if(a){const r=$t(a);if(r)return r}const s=ae(n||e);if(!s)return null;let o=Gn();if(!o?.length){const r=Q();o=Array.isArray(r?.equipment)?r.equipment:[],o.length&&Xn(o)}const l=o.find(r=>ae(r?.desc||r?.description||"")===s);return l||o.find(r=>ae(r?.desc||r?.description||"").includes(s))||null}function ra(e,t="equipment-description-options"){const n=ht(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(c=>ht(c.value)===n)||vt.has(n))return!0;const{description:s}=ta(e);if(!s)return!1;const o=ae(s);return o?(Gn()||[]).some(r=>ae(r?.desc||r?.description||"")===o):!1}const eo={available:0,reserved:1,maintenance:2,retired:3};function to(e){return eo[e]??5}function Ln(e){switch(e){case"available":return i("reservations.equipment.status.available","متاح");case"reserved":return i("reservations.equipment.status.reserved","محجوز");case"maintenance":return i("reservations.equipment.status.maintenance","صيانة");case"retired":return i("reservations.equipment.status.retired","خارج الخدمة");default:return i("reservations.equipment.status.unknown","الحالة غير معروفة")}}function no(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Ln(n)}`;const a=i("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Ln(n)})`}function He(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Hn(),a=Q(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],o=Array.isArray(s)?s:[];Xn(o);const l=new Map;o.forEach(d=>{const u=Ys(d),m=ht(u);if(!m||!u)return;const p=xe(d),f=to(p),g=l.get(m);if(!g){l.set(m,{normalized:m,value:u,bestItem:d,bestStatus:p,bestPriority:f,statuses:new Set([p])});return}g.statuses.add(p),f<g.bestPriority&&(g.bestItem=d,g.bestStatus=p,g.bestPriority=f,g.value=u)}),vt=new Map;const c=Array.from(l.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{vt.set(d.normalized,d.bestItem);const u=no(d),m=bt(d.value);if(u===d.value)return`<option value="${m}"></option>`;const p=bt(u);return`<option value="${m}" label="${p}"></option>`}).join("");e&&(e.innerHTML=c),t&&(t.innerHTML=c)}function ao(e,t){const n=K(e);if(!n)return!1;const{start:a,end:s}=it();if(!a||!s)return q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(we().some(d=>K(d.barcode)===n))return q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(Se(n,a,s))return q(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const l=$t(n);if(!l)return q(i("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1;const r=xe(l);if(r!=="available")return q(Oe(r)),!1;const c=ze(l);return c?(on({id:c,equipmentId:c,barcode:n,desc:l.desc,qty:1,price:l.price,image:Le(l)}),t&&(t.value=""),qe(),U(),q(i("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")),!1)}function Ut(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=ia(t);if(!n){q(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Xs(n.barcode),s=xe(a||n);if(s!=="available"){q(Oe(s));return}const o=K(n.barcode);if(!o){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const l=ze(n);if(!l){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r={id:l,equipmentId:l,barcode:o,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Le(n)},{start:c,end:d}=it();if(!c||!d){q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(we().some(p=>K(p.barcode)===o)){q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(Se(o,c,d)){q(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}on(r),qe(),U(),e.value=""}function so(){He();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ut(e))});const t=()=>{ra(e.value,"equipment-description-options")&&Ut(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function qe(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=we(),a=i("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=i("reservations.create.summary.currency","ريال"),o=i("reservations.create.equipment.imageAlt","صورة"),l=i("reservations.equipment.actions.increase","زيادة الكمية"),r=i("reservations.equipment.actions.decrease","تقليل الكمية"),c=i("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=Ce(n);t.innerHTML=d.map(u=>{const m=u.items[0]||{},p=Le(m)||u.image,f=p?`<img src="${p}" alt="${o}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',g=y(String(u.count)),w=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,h=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):w*u.count,v=`${y(w.toFixed(2))} ${s}`,S=`${y(h.toFixed(2))} ${s}`,A=u.barcodes.map(P=>y(String(P||""))).filter(Boolean),j=A.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${A.map(P=>`<li>${P}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${j}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${r}">−</button>
              <span class="reservation-qty-value">${g}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${l}">+</button>
            </div>
          </td>
          <td>${v}</td>
          <td>${S}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function oo(e){const t=we(),a=Ce(t).find(o=>o.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Ds(s),qe(),U())}function io(e){const t=we(),n=t.filter(a=>Et(a)!==e);n.length!==t.length&&(Wn(n),qe(),U())}function ro(e){const t=we(),a=Ce(t).find(m=>m.key===e);if(!a)return;const{start:s,end:o}=it();if(!s||!o){q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const l=new Set(t.map(m=>K(m.barcode))),{equipment:r=[]}=Q(),c=(r||[]).find(m=>{const p=K(m?.barcode);return!p||l.has(p)||Et({desc:m?.desc||m?.description||m?.name||"",price:Number(m?.price)||0})!==e||!Jn(m)?!1:!Se(p,s,o)});if(!c){q(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=K(c.barcode),u=ze(c);if(!u){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}on({id:u,equipmentId:u,barcode:d,desc:c.desc||c.description||c.name||a.description||"",qty:1,price:Number.isFinite(Number(c.price))?Number(c.price):a.unitPrice,image:Le(c)}),qe(),U()}function U(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(y(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),o=a?!1:s?.checked||!1,l=document.getElementById("res-payment-status")?.value||"unpaid",{start:r,end:c}=it();o&&ue();const d=nt(),u=document.getElementById("res-payment-status");Re(u,l),Ts({selectedItems:we(),discount:t,discountType:n,applyTax:o,paidStatus:l,start:r,end:c,companySharePercent:d})}function lo(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",o=>{o.target.value=y(o.target.value),U()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",U),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{n.checked&&ue(),U()}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.checked?a.dataset.companyShare||(a.dataset.companyShare=String(oe)):n?.checked&&ue(),U()}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{Re(s),U()}),s.dataset.listenerAttached="true"),Re(s)}function co(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){U();return}const o=t.dataset.syncedWithStart;(!t.value?.trim()||o!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),U()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Dn(){const{input:e,hidden:t}=ln(),{input:n,hidden:a}=cn(),{customers:s}=Q();let o=t?.value?String(t.value):"";if(!o&&e?.value){const B=Ht(e.value,{allowPartial:!0});B&&(o=String(B.id),t&&(t.value=o),e.value=B.label,e.dataset.selectedId=o)}const l=s.find(B=>String(B.id)===o);if(!l){q(i("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const r=l.id;let c=a?.value?String(a.value):"";if(!c&&n?.value){const B=Vt(n.value,{allowPartial:!0});B&&(c=String(B.id),a&&(a.value=c),n.value=B.label,n.dataset.selectedId=c)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",p=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){q(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const f=`${d}T${m}`,g=`${u}T${p}`,w=new Date(f),h=new Date(g);if(Number.isNaN(w.getTime())||Number.isNaN(h.getTime())||w>=h){q(i("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const v=Bs(),S=we();if(S.length===0&&v.length===0){q(i("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",j=parseFloat(y(document.getElementById("res-discount")?.value))||0,P=document.getElementById("res-discount-type")?.value||"percent",b=document.getElementById("res-payment-status")?.value||"unpaid",I=c?un(c):null,k=Zs(I);if(c&&!I){q(i("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const B of S){const z=xe(B.barcode);if(z!=="available"){q(Oe(z));return}}for(const B of S){const z=K(B.barcode);if(Se(z,f,g)){q(i("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const B of v)if(Vn(B,f,g)){q(i("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const H=document.getElementById("res-tax"),C=!!c?!1:H?.checked||!1,$=Un(S,j,P,C,v,{start:f,end:g});C&&ue();let T=nt();C&&(!Number.isFinite(T)||T<=0)&&(ue(),T=nt());const N=C||Number.isFinite(T)&&T>0,L=$s(),F=Kn({reservationCode:L,customerId:r,start:f,end:g,status:k?"confirmed":"pending",title:null,location:null,notes:A,projectId:c||null,totalAmount:$,discount:j,discountType:P,applyTax:C,paidStatus:b,confirmed:k,items:S.map(B=>({...B,equipmentId:B.equipmentId??B.id})),technicians:v,companySharePercent:N?T:null,companyShareEnabled:N});try{const B=await _s(F);Hn(),He(),At(),uo(),q(i("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Mt=="function"&&Mt({type:"created",reservation:B})}catch(B){console.error("❌ [reservations/createForm] Failed to create reservation",B);const z=Qn(B)?B.message:i("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");q(z,"error")}}function uo(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),ye({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),o=document.getElementById("res-project-input");s&&(s.value=""),o&&(o.value="",o.dataset.selectedId=""),ot({selectedValue:"",resetInput:!0});const l=document.getElementById("equipment-description");l&&(l.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Re(r,"unpaid")),js(),Wn([]),qe(),Me(),U()}function mo(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){oo(s);return}if(a==="increase-group"&&s){ro(s);return}if(a==="remove-group"&&s){io(s);return}}),e.dataset.listenerAttached="true")}function po(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{const s=e.value;s?.trim()&&(clearTimeout(t),t=null,ao(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim())return;const{start:o,end:l}=it();!o||!l||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function fo(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Dn()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Dn()}),t.dataset.listenerAttached="true")}function ji({onAfterSubmit:e}={}){Mt=typeof e=="function"?e:null;const{customers:t,projects:n}=Q();Ls(t||[]),ye(),pn(),aa(n||[]),oa({projectsList:n}),mn(),He(),so(),co(),lo(),mo(),po(),fo(),Js(),U(),qe()}function la(){He(),oa(),ye(),pn(),mn(),qe(),U()}if(typeof document<"u"){const e=()=>{ye(),ot({projectsList:dn()}),pn(),mn(),U()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function ca(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:ke(t),endDate:ke(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const o=new Date(n);return o.setDate(n.getDate()+6),{startDate:ke(n),endDate:ke(o)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:ke(n),endDate:ke(a)}}return e==="upcoming"?{startDate:ke(t),endDate:""}:{startDate:"",endDate:""}}function go(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let o=y(t?.value||"").trim(),l=y(n?.value||"").trim(),r=a?.value||"";if(new Set(["","today","week","month"]).has(r)||(r="",a&&(a.value=""),wt(t),wt(n),o="",l=""),!o&&!l&&r){const d=ca(r);o=d.startDate,l=d.endDate}return{searchTerm:ae(e?.value||""),startDate:o,endDate:l,status:s?.value||"",quickRange:r}}function Pi(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=y(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),s.dataset.listenerAttached="true");const o=document.getElementById("reservation-date-range");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>{vo(o.value),t()}),o.dataset.listenerAttached="true");const l=document.getElementById("reservation-status-filter");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",t),l.dataset.listenerAttached="true");const r=document.getElementById("clear-filters");r&&!r.dataset.listenerAttached&&(r.addEventListener("click",()=>{n&&(n.value=""),wt(a),wt(s),o&&(o.value=""),l&&(l.value=""),t()}),r.dataset.listenerAttached="true")}function vo(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=ca(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function ke(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function wt(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function mt(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function bo(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function ho(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=bo(n);if(a!==null)return a}return null}function Bn(e,t=0){const n=ho(e);if(n!=null)return n;const a=mt(e.createdAt??e.created_at);if(a!=null)return a;const s=mt(e.updatedAt??e.updated_at);if(s!=null)return s;const o=mt(e.start);if(o!=null)return o;const l=mt(e.end);if(l!=null)return l;const r=Number(e.id??e.reservationId);return Number.isFinite(r)?r:Number.isFinite(t)?t:0}function yo({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const o=e.map((v,S)=>({reservation:v,index:S})),l=t.searchTerm||"",r=t.searchReservationId||"",c=t.searchCustomerName||"",d=t.startDate||"",u=t.endDate||"",m=t.status||"",p=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,f=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=d?new Date(`${d}T00:00:00`):null,w=u?new Date(`${u}T23:59:59`):null,h=o.filter(({reservation:v})=>{const S=n.get(String(v.customerId)),A=s?.get?.(String(v.projectId)),j=v.start?new Date(v.start):null,P=rn(v),{effectiveConfirmed:b}=Te(v,A);if(p!=null&&String(v.customerId)!==String(p)||f!=null&&!(Array.isArray(v.technicians)?v.technicians.map(C=>String(C)):[]).includes(String(f))||m==="confirmed"&&!b||m==="pending"&&b||m==="completed"&&!P||g&&j&&j<g||w&&j&&j>w||r&&!ae([v.reservationId,v.id].filter(Boolean).map(String).join(" ")).includes(r)||c&&!ae(S?.customerName||"").includes(c))return!1;if(!l)return!0;const I=v.items?.map?.(D=>`${D.barcode} ${D.desc}`).join(" ")||"",k=(v.technicians||[]).map(D=>a.get(String(D))?.name).filter(Boolean).join(" ");return ae([v.reservationId,S?.customerName,v.notes,I,k,A?.title].filter(Boolean).join(" ")).includes(l)});return h.sort((v,S)=>{const A=Bn(v.reservation,v.index),j=Bn(S.reservation,S.index);return A!==j?j-A:S.index-v.index}),h}function wo({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=i("reservations.create.summary.currency","ريال"),o=i("reservations.list.taxIncludedShort","(شامل الضريبة)"),l=i("reservations.list.unknownCustomer","غير معروف"),r=i("reservations.list.noNotes","لا توجد ملاحظات"),c=i("reservations.list.itemsCountShort","{count} عنصر"),d=i("reservations.list.crew.separator","، "),u=i("reservations.list.status.confirmed","✅ مؤكد"),m=i("reservations.list.status.pending","⏳ غير مؤكد"),p=i("reservations.list.payment.paid","💳 مدفوع"),f=i("reservations.list.payment.unpaid","💳 غير مدفوع"),g=i("reservations.list.actions.confirm","✔️ تأكيد"),w=i("reservations.list.project.unlinked","غير مرتبط بمشروع"),h=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:i("reservations.list.labels.client","👤 العميل"),project:i("reservations.list.labels.project","📁 المشروع"),start:i("reservations.list.labels.start","🗓️ بداية الحجز"),end:i("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:i("reservations.list.labels.cost","💵 التكلفة"),equipment:i("reservations.list.labels.equipment","📦 المعدات"),crew:i("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:S,index:A})=>{const j=t.get(String(S.customerId)),P=S.projectId?a?.get?.(String(S.projectId)):null,b=rn(S),I=S.paid===!0||S.paid==="paid",{effectiveConfirmed:k,projectLinked:H}=Te(S,P),D=k?"status-confirmed":"status-pending",C=I?"status-paid":"status-unpaid";let $=`<span class="reservation-chip status-chip ${D}">${k?u:m}</span>`,T=`<span class="reservation-chip status-chip ${C}">${I?p:f}</span>`,N=I?" tile-paid":" tile-unpaid";b&&(N+=" tile-completed");let L="";b&&($=`<span class="reservation-chip status-chip status-completed">${u}</span>`,T=`<span class="reservation-chip status-chip status-completed">${I?p:f}</span>`,L=` data-completed-label="${i("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const F=!H&&!k?`<button class="tile-confirm" data-reservation-index="${A}" data-action="confirm">${g}</button>`:"",B=F?`<div class="tile-actions">${F}</div>`:"",z=S.items?.length||0,J=(S.technicians||[]).map(re=>n.get(String(re))).filter(Boolean),G=J.map(re=>re.name).join(d)||"—",te=y(String(S.reservationId??"")),Y=S.start?y(Fe(S.start)):"-",pe=S.end?y(Fe(S.end)):"-",R=y(String(S.cost??0)),W=y(String(z)),Ve=S.notes?y(S.notes):r,fe=c.replace("{count}",W),Ue=S.applyTax?`<small>${o}</small>`:"";let Ie=w;return S.projectId&&(Ie=P?.title?y(P.title):h),`
      <div class="${F?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${N}"${L} data-reservation-index="${A}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${te}</div>
          <div class="tile-badges">
            ${$}
            ${T}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${j?.customerName||l}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.project}</span>
            <span class="tile-value">${Ie}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${Y}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${pe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${R} ${s} ${Ue}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${fe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${J.length?G:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ve}</span>
          </div>
        </div>
        ${B}
      </div>
    `}).join("")}function pt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function So(e,t,n=[],a,s=null){const{projectLinked:o,effectiveConfirmed:l}=Te(e,s),r=e.paid===!0||e.paid==="paid",c=rn(e),d=e.items||[],u=Ce(d),{technicians:m=[]}=Q(),p=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(m)?m:[]),f=new Map;p.forEach(_=>{if(!_||_.id==null)return;const O=String(_.id),ee=f.get(O)||{};f.set(O,{...ee,..._})});const g=(e.technicians||[]).map(_=>f.get(String(_))).filter(Boolean),w=zn(),h=Yn(e.start,e.end),v=(_={})=>{const O=[_.dailyWage,_.daily_rate,_.dailyRate,_.wage,_.rate];for(const ee of O){if(ee==null)continue;const Pe=parseFloat(y(String(ee)));if(Number.isFinite(Pe))return Pe}return 0},A=d.reduce((_,O)=>_+(O.qty||1)*(O.price||0),0)*h,P=g.reduce((_,O)=>_+v(O),0)*h,b=A+P,I=parseFloat(e.discount)||0,k=e.discountType==="amount"?I:b*(I/100),H=Math.max(0,b-k),D=o?!1:e.applyTax,C=D?H*.15:0,$=Number(e.cost),T=Number.isFinite($),N=H+C,L=o?Math.round(N):T?$:Math.round(N),F=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,B=F!=null?parseFloat(y(String(F))):NaN;let G=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(B)&&B>0)&&Number.isFinite(B)?B:0,te=G>0?Math.max(0,(Number.isFinite(L)?L:0)*(G/100)):0;D&&G<=0&&(G=oe,te=Math.max(0,(Number.isFinite(L)?L:0)*(G/100)));const Y=y(String(e.reservationId??e.id??"")),pe=e.start?y(Fe(e.start)):"-",R=e.end?y(Fe(e.end)):"-",W=y(String(g.length)),Ve=y(A.toFixed(2)),fe=y(k.toFixed(2)),Ue=y(H.toFixed(2)),Ie=y(C.toFixed(2)),Ee=y((L??0).toFixed(2)),re=y(String(h)),Z=i("reservations.create.summary.currency","ريال"),Sn=i("reservations.details.labels.discount","الخصم"),Ct=i("reservations.details.labels.tax","الضريبة (15%)"),rt=i("reservations.details.labels.crewTotal","إجمالي الفريق"),je=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),lt=i("reservations.details.labels.duration","عدد الأيام"),Tt=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Lt=i("reservations.details.labels.netProfit","💵 صافي الربح"),ct=i("reservations.create.equipment.imageAlt","صورة"),ge={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},ve=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Dt=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),Bt=i("reservations.details.technicians.roleUnknown","غير محدد"),Ae=i("reservations.details.technicians.phoneUnknown","غير متوفر"),Ke=i("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Qe=i("reservations.list.status.confirmed","✅ مؤكد"),_t=i("reservations.list.status.pending","⏳ غير مؤكد"),jt=i("reservations.list.payment.paid","💳 مدفوع"),Pt=i("reservations.list.payment.unpaid","💳 غير مدفوع"),M=i("reservations.list.status.completed","📁 منتهي"),X=i("reservations.details.labels.id","🆔 رقم الحجز"),le=i("reservations.details.section.bookingInfo","بيانات الحجز"),Ma=i("reservations.details.section.paymentSummary","ملخص الدفع"),za=i("reservations.details.labels.finalTotal","المجموع النهائي"),Oa=i("reservations.details.section.crew","😎 الفريق الفني"),Ha=i("reservations.details.crew.count","{count} عضو"),Va=i("reservations.details.section.items","📦 المعدات المرتبطة"),Ua=i("reservations.details.items.count","{count} عنصر"),Ka=i("reservations.details.actions.edit","✏️ تعديل"),Qa=i("reservations.details.actions.delete","🗑️ حذف"),Ga=i("reservations.details.labels.customer","العميل"),Wa=i("reservations.details.labels.contact","رقم التواصل"),Xa=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Ya=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Za=i("reservations.details.actions.openProject","📁 فتح المشروع"),Ja=i("reservations.details.labels.start","بداية الحجز"),es=i("reservations.details.labels.end","نهاية الحجز"),ts=i("reservations.details.labels.notes","ملاحظات"),ns=i("reservations.list.noNotes","لا توجد ملاحظات"),as=i("reservations.details.labels.itemsCount","عدد المعدات"),ss=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),os=i("reservations.details.labels.paymentStatus","حالة الدفع"),is=i("reservations.list.unknownCustomer","غير معروف"),xn=r?jt:Pt,rs=u.reduce((_,O)=>_+(Number(O.quantity)||0),0),ls=y(String(rs)),qn=Ua.replace("{count}",ls),cs=Ha.replace("{count}",W),ds=e.notes?y(e.notes):ns,us=y(P.toFixed(2)),ms=y(String(G)),ps=y(te.toFixed(2)),fs=`${ms}% (${ps} ${Z})`,In=Math.max(0,(L??0)-C-te),gs=y(In.toFixed(2)),be=[{icon:"💳",label:os,value:xn},{icon:"📦",label:as,value:qn},{icon:"⏱️",label:lt,value:re},{icon:"💼",label:ss,value:`${Ve} ${Z}`}];be.push({icon:"😎",label:rt,value:`${us} ${Z}`}),k>0&&be.push({icon:"💸",label:Sn,value:`${fe} ${Z}`}),be.push({icon:"📊",label:je,value:`${Ue} ${Z}`}),D&&C>0&&be.push({icon:"🧾",label:Ct,value:`${Ie} ${Z}`}),G>0&&be.push({icon:"🏦",label:Tt,value:fs}),Math.abs(In-(L??0))>.009&&be.push({icon:"💵",label:Lt,value:`${gs} ${Z}`}),be.push({icon:"💰",label:za,value:`${Ee} ${Z}`});const vs=be.map(({icon:_,label:O,value:ee})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${_} ${O}</span>
      <span class="summary-details-value">${ee}</span>
    </div>
  `).join(""),En=[{text:l?Qe:_t,className:l?"status-confirmed":"status-pending"},{text:xn,className:r?"status-paid":"status-unpaid"}];c&&En.push({text:M,className:"status-completed"});const bs=En.map(({text:_,className:O})=>`<span class="status-chip ${O}">${_}</span>`).join(""),Ge=(_,O,ee)=>`
    <div class="res-info-row">
      <span class="label">${_} ${O}</span>
      <span class="value">${ee}</span>
    </div>
  `;let Nt="";if(e.projectId){let _=pt(Ya);if(s){const O=s.title||i("projects.fallback.untitled","مشروع بدون اسم");_=`${pt(O)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${pt(Za)}</button>`}Nt=`
      <div class="res-info-row">
        <span class="label">📁 ${Xa}</span>
        <span class="value">${_}</span>
      </div>
    `}const $e=[];$e.push(Ge("👤",Ga,t?.customerName||is)),$e.push(Ge("📞",Wa,t?.phone||"—")),$e.push(Ge("🗓️",Ja,pe)),$e.push(Ge("🗓️",es,R)),$e.push(Ge("📝",ts,ds)),Nt&&$e.push(Nt);const hs=$e.join(""),ys=u.length?u.map(_=>{const O=_.items[0]||{},ee=Le(O)||_.image,Pe=ee?`<img src="${ee}" alt="${ct}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',dt=Number(_.quantity)||Number(_.count)||0,ut=y(String(dt)),An=Number.isFinite(Number(_.unitPrice))?Number(_.unitPrice):0,qs=Number.isFinite(Number(_.totalPrice))?Number(_.totalPrice):An*dt,Is=`${y(An.toFixed(2))} ${Z}`,Es=`${y(qs.toFixed(2))} ${Z}`,$n=_.barcodes.map(Ft=>y(String(Ft||""))).filter(Boolean),As=$n.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${$n.map(Ft=>`<li>${Ft}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td>
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${Pe}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${pt(O.desc||O.description||O.name||_.description||"-")}</div>
                  ${As}
                </div>
              </div>
            </td>
            <td>
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${ut}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td>${Is}</td>
            <td>${Es}</td>
            <td>
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${ve}</td></tr>`,ws=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${ge.item}</th>
            <th>${ge.quantity}</th>
            <th>${ge.unitPrice}</th>
            <th>${ge.total}</th>
            <th>${ge.actions}</th>
          </tr>
        </thead>
        <tbody>${ys}</tbody>
      </table>
    </div>
  `,Ss=g.map((_,O)=>{const ee=y(String(O+1)),Pe=_.role||Bt,dt=_.phone||Ae,ut=_.wage?Ke.replace("{amount}",y(String(_.wage))).replace("{currency}",Z):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ee}</span>
          <span class="technician-name">${_.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${Pe}</div>
          <div>📞 ${dt}</div>
          ${ut?`<div>💰 ${ut}</div>`:""}
        </div>
      </div>
    `}).join(""),xs=g.length?`<div class="reservation-technicians-grid">${Ss}</div>`:`<ul class="reservation-modal-technicians"><li>${Dt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${X}</span>
          <strong>${Y}</strong>
        </div>
        <div class="status-chips">
          ${bs}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${le}</h6>
          ${hs}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${Ma}</h6>
            <div class="summary-details">
              ${vs}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Oa}</span>
          <span class="count">${cs}</span>
        </div>
        ${xs}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Va}</span>
          <span class="count">${qn}</span>
        </div>
        ${ws}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${i("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Ka}</button>
        ${w?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Qa}</button>`:""}
      </div>
    </div>
  `}const xo=`@page {
  margin: 0;
  size: A4;
}

html,
body,
.page,
.quote-wrapper {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700&display=swap');

#quotation-pdf-root {
  width: 210mm;
  min-width: 210mm;
  max-width: 210mm;
  min-height: 100%;
  box-sizing: border-box;
  font-family: 'Tajawal', sans-serif;
  color: #000000 !important;
  /* background: #ffffff !important; */
  direction: rtl;
  text-align: right;
  margin: 0 auto;
  padding: 0;
}

#quotation-pdf-root * {
  box-sizing: border-box;
  color: #000000 !important;
}

#quotation-pdf-root [style*="color"],
#quotation-pdf-root [class*="text"],
#quotation-pdf-root [class*="-text"],
#quotation-pdf-root [class*="text-"] {
  color: #000000 !important;
}

.quote-preview-pages {
  width: 210mm;
  max-width: 210mm;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
}

#quotation-pdf-root[data-quote-render-context="export"] .quote-preview-pages {
  gap: 0 !important;
  row-gap: 0 !important;
  column-gap: 0 !important;
}

[data-quote-source] {
  display: none;
}

.quote-page {
  position: relative;
  width: 210mm;
  max-width: 210mm;
  min-width: 210mm;
  height: 297mm;
  min-height: 297mm;
  max-height: 297mm;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  padding: 4mm 14mm 12mm;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  page-break-after: auto;
  break-after: auto;
  page-break-before: auto;
  break-before: auto;
  page-break-inside: avoid;
  break-inside: avoid;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;
}

#quotation-pdf-root[data-quote-render-context="export"] .quote-page {
  box-shadow: none !important;
}

#quotation-pdf-root[data-quote-render-context="export"] .quote-page + .quote-page::before {
  display: none !important;
}

.quote-page:last-of-type {
  page-break-after: auto;
  break-after: auto;
}

.quote-page--primary {
  padding-top: 6mm;
}

.quote-page--continuation {
  padding-top: 12mm;
}

.quote-page + .quote-page::before {
  content: '';
  position: absolute;
  top: -18px;
  right: 16px;
  width: calc(100% - 32px);
  height: 1px;
  background: rgba(148, 163, 184, 0.5);
}

.quote-body {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
}

.quote-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  margin: 0 auto 12px;
  padding: 0;
}

.quote-header__meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
  text-align: left;
  font-size: 0.72rem;
  color: #000000 !important;
  justify-self: start;
}

.quote-header__meta-item {
  display: flex;
  gap: 4px;
  align-items: baseline;
}

.quote-header__meta-item span {
  font-weight: 600;
  color: #000000 !important;
}

.quote-header__meta-item strong {
  font-size: 0.85rem;
  font-weight: 600;
  color: #000000 !important;
}

.quote-header__title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
  align-items: center;
  justify-self: center;
}

.quote-header__title h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.quote-company-name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #000000 !important;
}

.quote-company-cr {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: #000000 !important;
}

.quote-header__logo {
  justify-self: end;
  align-self: flex-start;
}

.quote-header__logo .quote-logo {
  width: 90px;
  height: 90px;
}

.quote-logo {
  display: block;
  object-fit: contain;
}

.quote-section h3 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 700;
  text-align: right;
  color: #000000 !important;
}

.quote-section__title {
  margin: 0 0 8px;
  font-size: 0.7rem;
  font-weight: 600;
  text-align: right;
  color: #000000 !important;
}

.quote-section--plain {
  padding-bottom: 4px;
  text-align: right;
}

.quote-section-row {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: stretch;
}

.quote-section-row .quote-section {
  flex: 1 1 0;
  min-width: 0;
}

.quote-section--customer {
  text-align: left;
  margin-left: auto;
  margin-right: 0;
  max-width: 46%;
}

.quote-section--customer .info-plain,
.quote-section--customer .info-plain__item {
  align-items: flex-start;
  text-align: left;
  justify-content: flex-start;
}

.quote-section--reservation {
  text-align: left;
  margin-right: auto;
  margin-left: 0;
  max-width: fit-content;
}


.quote-section--financial {
  width: 100%;
  margin: 0;
}

#quotation-pdf-root[data-quote-render-context] .quote-section--financial {
  max-width: 60%;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 900px) {
  #quotation-pdf-root[data-quote-render-context] .quote-section--financial {
    max-width: 100%;
  }
}


.quote-section,
.info-block,
.payment-block,
.totals-block,
.quote-notes,
.quote-approval-note,
.quote-footer,
.quote-placeholder {
  width: 100%;
  margin: 0;
  padding-top: 0;
  page-break-inside: avoid;
  break-inside: avoid;
}

.quote-section {
  margin-bottom: 12px;
}

.totals-block h3,
.payment-block h3 {
  margin: 0;
  text-align: center;
}

.quote-placeholder {
  padding: 18px 16px;
  border: 1px dashed rgba(148, 163, 184, 0.4);
  border-radius: 14px;
  font-size: 0.9rem;
  background: #ffffff;
  text-align: right;
}

.info-block,
.payment-block,
.totals-block {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.4);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  direction: ltr;
}

.payment-block {
  align-items: stretch;
  text-align: right;
  direction: rtl;
  font-family: 'Tajawal', sans-serif;
  padding: 10px 12px;
  gap: 10px;
  width: 100%;
}

.payment-rows {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;
}

.payment-row {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  direction: rtl;
  font-size: 0.68rem;
}

.payment-row__label {
  font-weight: 600;
  color: #000000 !important;
  text-align: right;
}

.payment-row__slash {
  font-weight: 600;
  color: #000000 !important;
}

.payment-row__value {
  font-weight: 700;
  color: #000000 !important;
  text-align: left;
  direction: ltr;
  white-space: nowrap;
}

.payment-block h3 {
  text-align: right;
  margin: 0;
}

.totals-block {
  font-size: 0.62rem;
  align-items: stretch;
  text-align: center;
  margin: 0 auto;
  direction: rtl;
  gap: 10px;
  font-family: 'Tajawal', sans-serif;
  padding: 12px 16px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.totals-block h3 {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  color: #000000 !important;
  margin-bottom: 4px;
  text-align: center;
  width: 100%;
}

.info-plain {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  text-align: left;
  font-size: 0.68rem;
  color: #000000 !important;
}

.info-plain__item {
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  align-items: baseline;
}

.info-plain--right {
  align-items: flex-end;
  text-align: right;
}

.info-plain--right .info-plain__item {
  justify-content: flex-end;
}

.info-plain__label {
  font-weight: 600;
  color: #000000 !important;
}

.info-plain__value {
  font-weight: 600;
  font-size: 0.8rem;
  color: #000000 !important;
}

.info-plain--dense {
  gap: 4px;
  font-size: 0.7rem;
}

.info-plain--dense .info-plain__value {
  font-size: 0.76rem;
}

.info-plain__slash {
  color: #000000 !important;
  font-weight: 400;
}

.info-block h4,
.payment-block h4,
.totals-block h4 {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
}

.info-block__rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: right;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.3);
  text-align: left;
}

.info-row span {
  font-weight: 600;
  font-size: 13px;
  color: #000000 !important;
}

.info-row strong {
  font-weight: 700;
  font-size: 13.5px;
  color: #000000 !important;
}

.info-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  text-align: left;
  width: 100%;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: right;
}

.info-item span {
  font-weight: 600;
  font-size: 13px;
  color: #000000 !important;
}

.info-item strong {
  font-weight: 700;
  font-size: 13.5px;
  color: #000000 !important;
}

.totals-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 6px;
  width: 100%;
  justify-items: center;
}

.totals-inline {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: center;
  align-items: stretch;
  gap: 8px;
  overflow: hidden;
}

.totals-inline__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 4px 10px;
  border-radius: 9px;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.3);
  white-space: nowrap;
  font-size: 0.64rem;
  font-family: 'Tajawal', sans-serif;
  flex: 0 0 auto;
}

.totals-inline__label {
  font-weight: 600;
  color: #000000 !important;
}

.totals-inline__slash {
  font-weight: 600;
  color: #000000 !important;
}

.totals-inline__value {
  font-weight: 700;
  color: #000000 !important;
}

.totals-final {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 6px;
}

.totals-item--final {
  background: rgba(59, 91, 220, 0.12);
  border-color: rgba(59, 91, 220, 0.35);
  padding: 8px 16px;
  min-width: 200px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 12px;
}

.totals-item__label {
  font-weight: 600;
  color: #000000 !important;
  font-size: 0.7rem;
}

.totals-item__slash {
  font-weight: 600;
  color: #000000 !important;
  font-size: 0.7rem;
}

.totals-item__value {
  font-weight: 700;
  color: #000000 !important;
  font-size: 0.78rem;
}

.quote-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background-color: #ffffff !important;
  direction: rtl;
  text-align: center;
  page-break-inside: auto;
}

.quote-table thead,
.quote-table tbody,
.quote-table tr,
.quote-table th,
.quote-table td {
  background-color: #ffffff !important;
  color: #000000 !important;
  direction: rtl;
  text-align: center;
}

.quote-table th {
  padding: 9px 8px;
  font-weight: 700;
}

.quote-table th,
.quote-table td {
  border: 1px solid rgba(148, 163, 184, 0.5);
  text-align: center;
}

.quote-section--table {
  display: block;
  clear: both;
  overflow: visible;
  break-inside: auto;
  page-break-inside: auto;
  page-break-after: auto;
  padding-top: 4mm;
}

.quote-section--table-fragment {
  padding-top: 4mm;
}

.quote-section--table-fragment--continued {
  padding-top: 2mm;
  margin-top: 6px;
}

.quote-section--table-fragment--continued h3 {
  margin-top: 0;
}

.quote-section--table-fragment--overflow {
  overflow: visible;
}

.quote-page .quote-section--table:first-of-type {
  padding-top: 0;
}
.quote-page .quote-section--table.quote-section--table-fragment--continued:first-of-type {
  padding-top: 2mm;
}

.quote-table {
  page-break-inside: auto;
  break-inside: auto;
  overflow: visible;
  margin-top: 2mm;
}

.quote-table thead {
  display: table-header-group;
}

.quote-table tbody {
  display: table-row-group;
}

.quote-table tr {
  page-break-inside: avoid;
  page-break-after: auto;
}

.quote-table td {
  padding: 9px 8px;
}

.quote-table .empty {
  padding: 14px;
  font-weight: 500;
  color: #000000 !important;
}

.quote-notes {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.38);
  border-radius: 12px;
  padding: 10px 12px;
  min-height: 0;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre-wrap;
  text-align: right;
}

.quote-approval-note {
  margin-top: 12px;
  font-size: 12px;
  background: rgba(234, 179, 8, 0.15);
  border-radius: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(234, 179, 8, 0.3);
  text-align: right;
}

.quote-footer {
  margin-top: 20px;
  border-top: 1px solid rgba(148, 163, 184, 0.35);
  padding-top: 10px;
  text-align: right;
}

.quote-footer h4 {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 700;
  text-align: right;
}

.quote-footer ul {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  direction: rtl;
  text-align: right;
  padding-inline-start: 0;
  padding-inline-end: 18px;
}

@media print {
  #quotation-pdf-root {
    width: 210mm;
    min-width: 210mm;
    max-width: 210mm;
    min-height: auto;
    padding: 0;
    margin: 0 auto;
  }

  .quote-preview-pages {
    gap: 0;
  }

  .quote-page {
    box-shadow: none;
  }
}
`,da="reservations.quote.sequence",ce={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},qo=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],fn=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],ua=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(y(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>x(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>x(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>x(y(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>x(y(Number(e?.price||0).toFixed(2)))}],ma=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(y(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>x(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>x(e?.role||i("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>x(e?.phone||i("reservations.details.technicians.phoneUnknown","غير متوفر"))}],pa={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"companyShare",labelKey:"reservations.details.labels.companyShare",fallback:"🏦 نسبة الشركة"},{id:"netProfit",labelKey:"reservations.details.labels.netProfit",fallback:"صافي الربح"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:ua.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:ma.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Io="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Eo="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Ao="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",$o=xo.trim(),ko=/color\([^)]*\)/gi,St=/(color\(|color-mix\()/i,Co=document.createElement("canvas"),ft=Co.getContext("2d"),fa=/^data:image\/svg\+xml/i,To=/\.svg($|[?#])/i,Ze=512,Kt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",ga=96,va=25.4,Qt=210,gt=297,Je=Math.round(Qt/va*ga),et=Math.round(gt/va*ga),Lo=2,ba=/safari/i,Do=/(iphone|ipad|ipod)/i,Bo=/(iphone|ipad|ipod)/i,_o=/(crios|fxios|edgios|opios)/i,xt="[reservations/pdf]";let V=null,E=null,ie=1,We=null,Xe=null,he=null,Ne=null;function Gt(){return!!window?.bootstrap?.Modal}function jo(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),he||(he=document.createElement("div"),he.className="modal-backdrop fade show",he.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(he)),Ne||(Ne=t=>{t.key==="Escape"&&Wt(e)},document.addEventListener("keydown",Ne));try{e.focus({preventScroll:!0})}catch{}}}function Wt(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),he&&(he.remove(),he=null),Ne&&(document.removeEventListener("keydown",Ne),Ne=null))}function Po(e){if(e){if(Gt()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}jo(e)}}function ha(){const e={};return Object.entries(pa).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function No(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Fo(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function ya(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function wa(){return Object.fromEntries(fn.map(({id:e})=>[e,!1]))}function gn(e,t){return e.sectionExpansions||(e.sectionExpansions=wa()),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Ro(e,t){return gn(e,t)?.[t]!==!1}function vn(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Mo(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Do.test(e)}function zo(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=ba.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Sa(){return Mo()&&zo()}function Oo(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"";return Bo.test(e)&&ba.test(e)&&!_o.test(e)}function Rt(e,...t){try{console.log(`${xt} ${e}`,...t)}catch{}}function Xt(e,...t){try{console.warn(`${xt} ${e}`,...t)}catch{}}function Ho(e,t,...n){try{t?console.error(`${xt} ${e}`,t,...n):console.error(`${xt} ${e}`,...n)}catch{}}function se(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Vo(e,t="لا توجد بيانات للعرض."){const n=x(i(e,t));return se(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function _n(e,t){return Array.isArray(e)&&e.length?e:[Vo(t)]}function Yt(e,t="#000"){if(!ft||!e)return t;try{return ft.fillStyle="#000",ft.fillStyle=e,ft.fillStyle||t}catch{return t}}function Uo(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=Yt(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function xa(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(ko,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Ko=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function qa(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;Ko.forEach(l=>{const r=s[l];if(r&&St.test(r)){const c=l.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),d=l==="backgroundColor"?"#ffffff":s.color||"#000000",u=Yt(r,d);a.style.setProperty(c,u,"important")}});const o=s.backgroundImage;if(o&&St.test(o)){const l=Yt(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",l,"important")}})}function Ia(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(o=>{const l=a[o];if(l&&St.test(l)){const r=o.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),c=o==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(r,c,"important")}});const s=a.backgroundImage;s&&St.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function jn(e,t=Ze){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Qo(e){if(!e)return{width:Ze,height:Ze};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?jn(t,0):0,s=n?jn(n,0):0;if(a>0&&s>0)return{width:a,height:s};const o=e.getAttribute?.("viewBox");if(o){const l=o.trim().split(/[\s,]+/).map(r=>parseFloat(r||"0"));if(l.length>=4){const[,,r,c]=l;a=a||(Number.isFinite(r)&&r>0?r:0),s=s||(Number.isFinite(c)&&c>0?c:0)}}return{width:a||Ze,height:s||Ze}}function Ea(e=""){return typeof e!="string"?!1:fa.test(e)||To.test(e)}function Go(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Wo(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=o=>{const l=o?.message||`Unable to load image from ${e}`;a(new Error(l))},s.src=e})}async function Aa(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const o=await Wo(s),l=n.createElement("canvas"),r=Math.max(t.width||o.naturalWidth||o.width||0,1),c=Math.max(t.height||o.naturalHeight||o.height||r,1);l.width=r,l.height=c;const d=l.getContext("2d");return d.clearRect(0,0,r,c),d.drawImage(o,0,0,r,c),l.toDataURL("image/png")}catch(o){return console.warn("[reservations/pdf] failed to rasterize SVG content",o),null}finally{URL.revokeObjectURL(s)}}async function Xo(e){if(!e)return null;if(fa.test(e))return Go(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Yo(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Ea(t))return!1;const n=await Xo(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Kt),!1;const a=await Aa(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Kt),!1)}async function Zo(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Qo(e),s=await Aa(n,a),l=(e.ownerDocument||document).createElement("img");l.setAttribute("src",s||Kt),l.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),l.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&l.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&l.setAttribute("style",e.getAttribute("style"));const r=e.getAttribute("width"),c=e.getAttribute("height");return r&&l.setAttribute("width",r),c&&l.setAttribute("height",c),e.parentNode?.replaceChild(l,e),!!s}async function $a(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Ea(s.getAttribute?.("src"))&&a.push(Yo(s))}),n.forEach(s=>{a.push(Zo(s))}),a.length&&await Promise.allSettled(a)}function Zt(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Ho(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const o=n||i("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى.");if(q(o),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Jt({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Xt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Xt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function bn(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",o=>n(o)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=o=>n(o),document.head.appendChild(s)})}function Pn(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Nn(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Jo(){const e=Nn();return e||(Xe||(Xe=bn(Eo).catch(t=>{throw Xe=null,t}).then(()=>{const t=Nn();if(!t)throw Xe=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Xe)}async function ei(){const e=Pn();return e||(We||(We=bn(Ao).catch(t=>{throw We=null,t}).then(()=>{const t=Pn();if(!t)throw We=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),We)}async function ti(){if(window.html2pdf||await bn(Io),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Uo()}function x(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ni(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function ai(){const e=window.localStorage?.getItem?.(da),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function si(){const t=ai()+1;return{sequence:t,quoteNumber:ni(t)}}function oi(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(da,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function ii(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function ri(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(y(String(n)));if(Number.isFinite(a))return a}return 0}function li(e){const t=At()||[],{technicians:n=[]}=Q(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(o=>{if(!o||o.id==null)return;const l=String(o.id),r=s.get(l)||{};s.set(l,{...r,...o})}),(e.technicians||[]).map(o=>s.get(String(o))).filter(Boolean)}function ci(e,t,n){const{projectLinked:a}=Te(e,n),s=Yn(e.start,e.end),r=(Array.isArray(e.items)?e.items:[]).reduce((T,N)=>T+(Number(N?.qty)||1)*(Number(N?.price)||0),0)*s,d=t.reduce((T,N)=>T+ri(N),0)*s,u=r+d,m=parseFloat(e.discount)||0,p=e.discountType==="amount"?m:u*(m/100),f=Math.max(0,u-p),g=a?!1:e.applyTax,w=g?f*.15:0,h=Number(e.cost),v=Number.isFinite(h),S=f+w,A=a?Math.round(S):v?h:Math.round(S),j=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,P=j!=null?parseFloat(y(String(j).replace("%","").trim())):NaN,b=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let k=(b!=null?b===!0||b===1||b==="1"||String(b).toLowerCase()==="true":Number.isFinite(P)&&P>0)&&Number.isFinite(P)?Number(P):0;g&&k<=0&&(k=oe);const H=k>0?Math.max(0,(A??0)*(k/100)):0,D=Math.max(0,(A??0)-w-H),C={equipmentTotal:r,crewTotal:d,discountAmount:p,taxAmount:w,finalTotal:A??0,companySharePercent:k,companyShareAmount:H,netProfit:D},$={equipmentTotal:y(r.toFixed(2)),crewTotal:y(d.toFixed(2)),discountAmount:y(p.toFixed(2)),taxAmount:y(w.toFixed(2)),finalTotal:y((A??0).toFixed(2)),companySharePercent:y(k.toFixed(2)),companyShareAmount:y(H.toFixed(2)),netProfit:y(D.toFixed(2))};return{totals:C,totalsDisplay:$,rentalDays:s}}function ka({reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:o,rentalDays:l,currencyLabel:r,sections:c,fieldSelections:d={},quoteNumber:u,quoteDate:m}){const{companySharePercent:p=0,companyShareAmount:f=0,netProfit:g=0}=s||{},w=y(String(e?.reservationId??e?.id??"")),h=e.start?y(Fe(e.start)):"-",v=e.end?y(Fe(e.end)):"-",S=t?.customerName||t?.full_name||t?.name||"-",A=t?.phone||"-",j=t?.email||"-",P=t?.company||t?.company_name||"-",b=y(A),I=n?.title||n?.name||i("reservations.details.project.none","غير مرتبط بمشروع"),k=n?.code||n?.projectCode||"",H=y(String(l)),D=e?.notes||"",C=No(d),$=(M,X)=>ya(C,M,X),T=M=>c?.has?.(M),N=`<div class="quote-placeholder">${x(i("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,L=(M,X)=>`<div class="info-plain__item">${x(M)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${x(X)}</strong></div>`,F=(M,X,{variant:le="inline"}={})=>le==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${x(M)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${x(X)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${x(M)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${x(X)}</span>
    </span>`,B=(M,X)=>`<div class="payment-row">
      <span class="payment-row__label">${x(M)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${x(X)}</span>
    </div>`,z=[];$("customerInfo","customerName")&&z.push(L(i("reservations.details.labels.customer","العميل"),S)),$("customerInfo","customerCompany")&&z.push(L(i("reservations.details.labels.company","الشركة"),P)),$("customerInfo","customerPhone")&&z.push(L(i("reservations.details.labels.phone","الهاتف"),b)),$("customerInfo","customerEmail")&&z.push(L(i("reservations.details.labels.email","البريد"),j));const J=T("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${x(i("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:N}
      </section>`:"",G=[];$("reservationInfo","reservationId")&&G.push(L(i("reservations.details.labels.reservationId","رقم الحجز"),w||"-")),$("reservationInfo","reservationStart")&&G.push(L(i("reservations.details.labels.start","بداية الحجز"),h)),$("reservationInfo","reservationEnd")&&G.push(L(i("reservations.details.labels.end","نهاية الحجز"),v)),$("reservationInfo","reservationDuration")&&G.push(L(i("reservations.details.labels.duration","عدد الأيام"),H));const te=T("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${x(i("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${G.length?`<div class="info-plain">${G.join("")}</div>`:N}
      </section>`:"",Y=[];$("projectInfo","projectTitle")&&Y.push(L(i("reservations.details.labels.project","المشروع"),I)),$("projectInfo","projectCode")&&Y.push(L(i("reservations.details.labels.code","الرمز"),k||"-"));const pe=T("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${x(i("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${Y.length?`<div class="info-plain">${Y.join("")}</div>`:N}
      </section>`:"",R=[];if($("financialSummary","equipmentTotal")&&R.push(F(i("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${o.equipmentTotal} ${r}`)),$("financialSummary","crewTotal")&&R.push(F(i("reservations.details.labels.crewTotal","إجمالي الفريق"),`${o.crewTotal} ${r}`)),$("financialSummary","discountAmount")&&R.push(F(i("reservations.details.labels.discount","الخصم"),`${o.discountAmount} ${r}`)),$("financialSummary","taxAmount")&&R.push(F(i("reservations.details.labels.tax","الضريبة"),`${o.taxAmount} ${r}`)),p>0&&$("financialSummary","companyShare")){const M=o.companySharePercent??y(p.toFixed(2)),X=o.companyShareAmount??y(f.toFixed(2)),le=`${M}% (${X} ${r})`;R.push(F(i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),le))}const W=$("financialSummary","finalTotal"),Ve=$("financialSummary","netProfit")&&Number.isFinite(g)&&Math.abs((g??0)-(s?.finalTotal??0))>.009,fe=[];W&&fe.push(F(i("reservations.details.labels.total","الإجمالي النهائي"),`${o.finalTotal} ${r}`,{variant:"final"})),Ve&&fe.push(F(i("reservations.details.labels.netProfit","💵 صافي الربح"),`${o.netProfit} ${r}`,{variant:"final"}));const Ue=fe.length?`<div class="totals-final">${fe.join("")}</div>`:"",Ie=T("financialSummary")?!R.length&&!W?`<section class="quote-section quote-section--financial">${N}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${x(i("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${R.length?`<div class="totals-inline">${R.join("")}</div>`:""}
            ${Ue}
          </div>
        </section>`:"",Ee=ua.filter(M=>$("items",M.id)),re=Ee.length>0,Z=re?Ee.map(M=>`<th>${x(M.labelKey?i(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",Ct=Array.isArray(e.items)&&e.items.length>0?e.items.map((M,X)=>`<tr>${Ee.map(le=>`<td>${le.render(M,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ee.length,1)}" class="empty">${x(i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,rt=T("items")?re?`<section class="quote-section quote-section--table">
            <h3>${x(i("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Z}</tr>
              </thead>
              <tbody>${Ct}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(i("reservations.details.items.title","المعدات"))}</h3>
            ${N}
          </section>`:"",je=ma.filter(M=>$("crew",M.id)),lt=je.length>0,Tt=lt?je.map(M=>`<th>${x(M.labelKey?i(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",Lt=a.length?a.map((M,X)=>`<tr>${je.map(le=>`<td>${le.render(M,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(je.length,1)}" class="empty">${x(i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ct=T("crew")?lt?`<section class="quote-section quote-section--table">
            <h3>${x(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Tt}</tr>
              </thead>
              <tbody>${Lt}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${N}
          </section>`:"",ge=T("notes")?`<section class="quote-section">
        <h3>${x(i("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${x(D||i("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ve=[];$("payment","beneficiary")&&ve.push(B(i("reservations.quote.labels.beneficiary","اسم المستفيد"),ce.beneficiaryName)),$("payment","bank")&&ve.push(B(i("reservations.quote.labels.bank","اسم البنك"),ce.bankName)),$("payment","account")&&ve.push(B(i("reservations.quote.labels.account","رقم الحساب"),y(ce.accountNumber))),$("payment","iban")&&ve.push(B(i("reservations.quote.labels.iban","رقم الآيبان"),y(ce.iban)));const Dt=`<section class="quote-section">
      <div class="payment-block">
        <h3>${x(i("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ve.length?ve.join(""):N}</div>
      </div>
      <p class="quote-approval-note">${x(ce.approvalNote)}</p>
    </section>`,Bt=`<footer class="quote-footer">
        <h4>${x(i("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${qo.map(M=>`<li>${x(M)}</li>`).join("")}</ul>
      </footer>`,Ae=[];J&&te?Ae.push(se(`<div class="quote-section-row">${J}${te}</div>`,{blockType:"group"})):(te&&Ae.push(se(te)),J&&Ae.push(se(J))),pe&&Ae.push(se(pe));const Ke=[];rt&&Ke.push(se(rt,{blockType:"table",extraAttributes:'data-table-id="items"'})),ct&&Ke.push(se(ct,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Qe=[];Ie&&Qe.push(se(Ie,{blockType:"summary"})),ge&&Qe.push(se(ge));const _t=[se(Dt,{blockType:"payment"}),se(Bt,{blockType:"footer"})],jt=[..._n(Ae,"reservations.quote.placeholder.page1"),...Ke,..._n(Qe,"reservations.quote.placeholder.page2"),..._t],Pt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${x(ce.logoUrl)}" alt="${x(ce.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${x(i("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${x(ce.companyName)}</p>
        <p class="quote-company-cr">${x(i("reservations.quote.labels.cr","السجل التجاري"))}: ${x(ce.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${x(u)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${x(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${$o}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Pt}
          ${jt.join("")}
        </div>
      </div>
    </div>
  `}function di(e){return!e||e.complete&&e.naturalHeight!==0?Promise.resolve():new Promise(t=>{const n=()=>t();e.addEventListener("load",n,{once:!0}),e.addEventListener("error",n,{once:!0})})}async function at(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),o=a.map(r=>di(r)),l=[s,...o].map(r=>r.catch(c=>(Xt("asset load failed",c),null)));await Promise.all(l),await new Promise(r=>n.requestAnimationFrame(()=>r()))}async function Ca(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),o=e.querySelector("[data-quote-source]"),l=o?.querySelector("[data-quote-header-template]");if(!s||!o||!l)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await $a(o),await at(o),s.innerHTML="";const r=Array.from(o.querySelectorAll(":scope > [data-quote-block]"));let c=null,d=null;const u=b=>{b.style.margin="0 auto",b.style.breakInside="avoid",b.style.pageBreakInside="avoid",b.style.pageBreakAfter="auto",b.style.breakAfter="auto"},m=()=>{const b=a.createElement("div"),I=s.childElementCount===0;if(b.className="quote-page",b.dataset.pageIndex=String(s.childElementCount),I){b.classList.add("quote-page--primary");const H=l.cloneNode(!0);H.removeAttribute("data-quote-header-template"),b.appendChild(H)}else b.classList.add("quote-page--continuation");const k=a.createElement("main");k.className="quote-body",b.appendChild(k),s.appendChild(b),u(b),c=b,d=k},p=()=>{(!c||!d||!d.isConnected)&&m()},f=()=>{if(!c||!d||d.childElementCount>0)return;const b=c;c=null,d=null,b.parentNode&&b.parentNode.removeChild(b)},g=()=>{c=null,d=null},w=()=>c?c.scrollHeight-c.clientHeight>Lo:!1,h=(b,{allowOverflow:I=!1}={})=>(p(),d.appendChild(b),w()&&!I?(d.removeChild(b),f(),!1):!0),v=b=>{const I=b.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!h(I)&&(g(),!h(I)&&h(I,{allowOverflow:!0}))},S=b=>{const I=b.querySelector("table");if(!I){v(b);return}const k=b.querySelector("h3"),H=I.querySelector("thead"),D=Array.from(I.querySelectorAll("tbody tr"));if(!D.length){v(b);return}let C=null,$=0;const T=(L=!1)=>{const F=b.cloneNode(!1);F.removeAttribute("data-quote-block"),F.removeAttribute("data-block-type"),F.removeAttribute("data-table-id"),F.classList.add("quote-section--table-fragment"),L&&F.classList.add("quote-section--table-fragment--continued");const B=k?k.cloneNode(!0):null;B&&F.appendChild(B);const z=I.cloneNode(!1);z.classList.add("quote-table--fragment"),H&&z.appendChild(H.cloneNode(!0));const J=a.createElement("tbody");return z.appendChild(J),F.appendChild(z),{section:F,body:J}},N=(L=!1)=>C||(C=T(L),h(C.section)||(g(),h(C.section)||h(C.section,{allowOverflow:!0})),C);D.forEach(L=>{N($>0);const F=L.cloneNode(!0);if(C.body.appendChild(F),w()&&(C.body.removeChild(F),C.body.childElementCount||(d.removeChild(C.section),C=null,f()),g(),C=null,N($>0),C.body.appendChild(F),w())){C.section.classList.add("quote-section--table-fragment--overflow"),$+=1;return}$+=1}),C=null};if(!r.length)return;r.forEach(b=>{b.getAttribute("data-block-type")==="table"?S(b):v(b)});const A=Array.from(s.children),j=[];A.forEach((b,I)=>{const k=b.querySelector(".quote-body");if(I!==0&&(!k||k.childElementCount===0)){b.remove();return}j.push(b)}),j.forEach((b,I)=>{const k=I===0;b.style.pageBreakAfter="auto",b.style.breakAfter="auto",b.style.pageBreakBefore=k?"auto":"always",b.style.breakBefore=k?"auto":"page",n?b.style.boxShadow="":b.style.boxShadow="none"});const P=j[j.length-1]||null;c=P,d=P?.querySelector(".quote-body")||null,await at(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function hn(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function ui(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[o,l]=await Promise.all([ei(),Jo()]),r=typeof window<"u"&&window.devicePixelRatio||1,c=vn(),d=Sa(),u=Oo();let m;u?m=1.5:d?m=Math.min(1.7,Math.max(1.2,r*1.1)):c?m=Math.min(1.8,Math.max(1.25,r*1.2)):m=Math.min(2,Math.max(1.6,r*1.4));const p=u||d?.9:c?.92:.95,f=new o({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),g={scale:m,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!0,removeContainer:!1,logging:!0};let w=0;const h=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let S=0;S<s.length;S+=1){const A=s[S];await $a(A),await at(A);const j=A.ownerDocument||document,P=j.createElement("div");Object.assign(P.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const b=A.cloneNode(!0);b.style.width=`${Je}px`,b.style.maxWidth=`${Je}px`,b.style.minWidth=`${Je}px`,b.style.height=`${et}px`,b.style.maxHeight=`${et}px`,b.style.minHeight=`${et}px`,b.style.position="relative",b.style.background="#ffffff",hn(b),P.appendChild(b),j.body.appendChild(P);let I;try{await at(b),I=await l(b,{...g,scale:m,width:Je,height:et,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(L){throw Zt(L,"pageCapture",{toastMessage:h}),L}finally{P.parentNode?.removeChild(P)}if(!I)continue;const k=I.width||1,D=(I.height||1)/k;let C=Qt,$=C*D,T=0;if($>gt){const L=gt/$;$=gt,C=C*L,T=Math.max(0,(Qt-C)/2)}const N=I.toDataURL("image/jpeg",p);w>0&&f.addPage(),f.addImage(N,"JPEG",T,0,C,$,`page-${w+1}`,"FAST"),w+=1,await new Promise(L=>window.requestAnimationFrame(L))}}catch(S){throw Jt({safariWindowRef:n,mobileWindowRef:a}),S}if(w===0)throw Jt({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(d||a&&!a.closed){const S=f.output("blob"),A=URL.createObjectURL(S);d?n&&!n.closed?(n.location.href=A,n.focus?.()):window.open(A,"_blank"):a&&!a.closed&&(a.location.href=A,a.focus?.()),setTimeout(()=>URL.revokeObjectURL(A),6e4)}else f.save(t)}function yn(){if(!E||!V)return;const{previewFrame:e}=V;if(!e)return;const t=ka({reservation:E.reservation,customer:E.customer,project:E.project,technicians:E.technicians,totals:E.totals,totalsDisplay:E.totalsDisplay,rentalDays:E.rentalDays,currencyLabel:E.currencyLabel,sections:E.sections,fieldSelections:E.fields,quoteNumber:E.quoteNumber,quoteDate:E.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(xa(s),qa(s,a),Ia(s,a));const o=n?.getElementById("quotation-pdf-root");try{o&&(await Ca(o,{context:"preview"}),hn(o))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const l=Array.from(n?.querySelectorAll?.(".quote-page")||[]),r=n?.querySelector(".quote-preview-pages"),c=Je;let d=18;if(r&&n?.defaultView){const p=n.defaultView.getComputedStyle(r),f=parseFloat(p.rowGap||p.gap||`${d}`);Number.isFinite(f)&&f>=0&&(d=f)}const u=et,m=l.length?l.length*u+Math.max(0,(l.length-1)*d):u;if(e.dataset.baseWidth=String(c),e.dataset.baseHeight=String(m),e.style.width=`${c}px`,e.style.minWidth=`${c}px`,e.style.height=`${m}px`,e.style.minHeight=`${m}px`,V?.previewFrameWrapper&&!V?.userAdjustedZoom){const p=V.previewFrameWrapper.clientWidth-24;p>0&&p<c?ie=Math.max(p/c,.3):ie=1}La(ie)},{once:!0})}function mi(e){if(!E)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?E.sections.add(n):E.sections.delete(n),Ta(),yn())}function pi(e){if(!E)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=E.fields||(E.fields=ha()),o=Fo(s,n);t.checked?o.add(a):o.delete(a),yn()}function fi(e){if(!E)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(gn(E,n),E.sectionExpansions[n]=t.open)}function Ta(){if(!V?.toggles||!E)return;const{toggles:e}=V,t=E.fields||{};gn(E);const n=fn.map(({id:a,labelKey:s,fallback:o})=>{const l=i(s,o),r=E.sections.has(a),c=pa[a]||[],d=Ro(E,a),u=c.length?`<div class="quote-toggle-sublist">
          ${c.map(m=>{const p=ya(t,a,m.id),f=r?"":"disabled",g=m.labelKey?i(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${m.id}" ${p?"checked":""} ${f}>
                <span>${x(g)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${a}" ${d?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${a}" ${r?"checked":""}>
            <span>${x(l)}</span>
          </label>
          ${c.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${u}
      </details>
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",mi)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",pi)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",fi)})}function gi(){if(V?.modal)return V;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${x(i("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${x(i("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${x(i("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${x(i("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-download]"),o=e.querySelector(".modal-header"),l=o?.querySelector(".btn-close"),r=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),c=document.createElement("div");c.className="quote-preview-header-actions",o&&o.insertBefore(c,l||null);const d=document.createElement("iframe");d.className="quote-preview-frame",d.setAttribute("title",i("reservations.quote.previewTitle","معاينة عرض السعر")),d.setAttribute("loading","lazy"),d.setAttribute("frameborder","0");const u=document.createElement("div");u.className="quote-preview-zoom-controls",u.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${x(i("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${x(i("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${x(i("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(d),n.innerHTML="";const p=document.createElement("div");p.className="quote-preview-scroll",p.appendChild(m),n.appendChild(p),c.appendChild(u),s?.addEventListener("click",async()=>{if(E){s.disabled=!0;try{await bi()}finally{s.disabled=!1}}});const f=()=>{Gt()||Wt(e)};r.forEach(v=>{v?.addEventListener("click",f)}),l&&!r.includes(l)&&l.addEventListener("click",f),e.addEventListener("click",v=>{Gt()||v.target===e&&Wt(e)}),V={modal:e,toggles:t,preview:n,previewFrameWrapper:m,zoomControls:u,zoomValue:u.querySelector("[data-zoom-value]"),previewFrame:d,meta:a,downloadBtn:s,userAdjustedZoom:!1};const g=u.querySelector("[data-zoom-out]"),w=u.querySelector("[data-zoom-in]"),h=u.querySelector("[data-zoom-reset]");return g?.addEventListener("click",()=>Fn(-.1)),w?.addEventListener("click",()=>Fn(.1)),h?.addEventListener("click",()=>qt(1,{markManual:!0})),qt(ie),V}function qt(e,{silent:t=!1,markManual:n=!1}={}){ie=Math.min(Math.max(e,.25),2.2),n&&V&&(V.userAdjustedZoom=!0),La(ie),!t&&V?.zoomValue&&(V.zoomValue.textContent=`${Math.round(ie*100)}%`)}function Fn(e){qt(ie+e,{markManual:!0})}function La(e){if(!V?.previewFrame||!V.previewFrameWrapper)return;const t=V.previewFrame,n=V.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",vn()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function vi(){if(!V?.meta||!E)return;const{meta:e}=V;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${x(i("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${x(E.quoteNumber)}</strong></div>
      <div><span>${x(i("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${x(E.quoteDateLabel)}</strong></div>
    </div>
  `}async function bi(){if(!E)return;const e=vn(),t=!e&&Sa(),n=e?window.open("","_blank"):null,a=t?window.open("data:text/html;charset=utf-8,"+encodeURIComponent(""),"_blank"):null;let s=null;const o=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await ti(),Rt("html2pdf ensured");const l=ka({reservation:E.reservation,customer:E.customer,project:E.project,technicians:E.technicians,totals:E.totals,totalsDisplay:E.totalsDisplay,rentalDays:E.rentalDays,currencyLabel:E.currencyLabel,sections:E.sections,fieldSelections:E.fields,quoteNumber:E.quoteNumber,quoteDate:E.quoteDateLabel});s=document.createElement("div"),s.innerHTML=l,Object.assign(s.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(s),xa(s),qa(s),Ia(s),Rt("export container prepared");const r=s.firstElementChild;if(r){r.setAttribute("dir","rtl"),r.style.direction="rtl",r.style.textAlign="right",r.setAttribute("data-theme","light"),r.classList.remove("dark","dark-mode"),r.style.margin="0",r.style.padding="0",r.style.width="210mm",r.style.maxWidth="210mm",r.style.marginLeft="auto",r.style.marginRight="auto",r.scrollTop=0,r.scrollLeft=0;try{await Ca(r,{context:"export"}),await at(r),hn(r),Rt("layout complete for export document")}catch(d){Zt(d,"layoutQuoteDocument",{suppressToast:!0})}}const c=`quotation-${E.quoteNumber}.pdf`;await ui(r,{filename:c,safariWindowRef:a,mobileWindowRef:n}),E.sequenceCommitted||(oi(E.quoteSequence),E.sequenceCommitted=!0)}catch(l){Jt({container:s,safariWindowRef:a,mobileWindowRef:n}),s=null,Zt(l,"exportQuoteAsPdf",{toastMessage:o})}finally{s&&s.parentNode&&s.parentNode.removeChild(s)}}function hi(){const e=gi();e?.modal&&(ie=1,V&&(V.userAdjustedZoom=!1),qt(ie,{silent:!0}),Ta(),vi(),yn(),Po(e.modal))}async function yi({reservation:e,customer:t,project:n}){if(!e){q(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=li(e),{totalsDisplay:s,totals:o,rentalDays:l}=ci(e,a,n),r=i("reservations.create.summary.currency","ريال"),{sequence:c,quoteNumber:d}=si(),u=new Date;E={reservation:e,customer:t,project:n,technicians:a,totals:o,totalsDisplay:s,rentalDays:l,currencyLabel:r,sections:new Set(fn.filter(m=>m.defaultSelected).map(m=>m.id)),sectionExpansions:wa(),fields:ha(),quoteSequence:c,quoteNumber:d,quoteDate:u,quoteDateLabel:ii(u),sequenceCommitted:!1},hi()}function wi({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=At(),{reservations:o=[],customers:l=[],technicians:r=[],projects:c=[]}=Q(),d=Array.isArray(s)?s:r||[],u=new Map((c||[]).map(h=>[String(h.id),h])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!o||o.length===0){m.innerHTML=`<p>${i("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||go(),f=new Map(l.map(h=>[String(h.id),h])),g=new Map(d.map(h=>[String(h.id),h])),w=yo({reservations:o,filters:p,customersMap:f,techniciansMap:g,projectsMap:u});if(w.length===0){m.innerHTML=`<p>${i("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${wo({entries:w,customersMap:f,techniciansMap:g,projectsMap:u})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(h=>{const v=Number(h.dataset.reservationIndex);Number.isNaN(v)||h.addEventListener("click",()=>{typeof n=="function"&&n(v)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(h=>{const v=Number(h.dataset.reservationIndex);Number.isNaN(v)||h.addEventListener("click",S=>{S.stopPropagation(),typeof a=="function"&&a(v,S)})})}function Si(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:o=[],projects:l=[]}=Q(),r=s[e];if(!r)return q(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const c=o.find(v=>String(v.id)===String(r.customerId)),d=r.projectId?l.find(v=>String(v.id)===String(r.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const v=At()||[];u.innerHTML=So(r,c,v,e,d)}const m=document.getElementById("reservationDetailsModal"),p=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},f=document.getElementById("reservation-details-edit-btn");f&&(f.onclick=()=>{p(),typeof t=="function"&&t(e,{reservation:r,customer:c,getEditContext:a})});const g=document.getElementById("reservation-details-delete-btn");g&&(g.onclick=()=>{p(),typeof n=="function"&&n(e,{reservation:r,customer:c})});const w=u?.querySelector('[data-action="open-project"]');w&&d&&w.addEventListener("click",()=>{p();const v=d?.id!=null?String(d.id):"",S=v?`projects.html?project=${encodeURIComponent(v)}`:"projects.html";window.location.href=S});const h=document.getElementById("reservation-details-export-btn");return h&&(h.onclick=async v=>{v?.preventDefault?.(),v?.stopPropagation?.(),h.blur();try{await yi({reservation:r,customer:c,project:d})}catch(S){console.error("❌ [reservations] export to PDF failed",S),q(i("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function kt(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:tt(e,n),end:tt(t,a)}}function De(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=i("reservations.create.equipment.none","لا توجد معدات"),a=i("reservations.create.summary.currency","ريال"),s=i("reservations.create.equipment.imageAlt","صورة"),o=i("reservations.equipment.actions.increase","زيادة الكمية"),l=i("reservations.equipment.actions.decrease","تقليل الكمية"),r=i("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Rn(t);return}const c=Ce(e);t.innerHTML=c.map(d=>{const u=d.items[0]||{},m=Le(u)||d.image,p=m?`<img src="${m}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',f=y(String(d.count)),g=Number.isFinite(Number(d.unitPrice))?Number(d.unitPrice):0,w=Number.isFinite(Number(d.totalPrice))?Number(d.totalPrice):g*d.count,h=`${y(g.toFixed(2))} ${a}`,v=`${y(w.toFixed(2))} ${a}`,S=d.barcodes.map(j=>y(String(j||""))).filter(Boolean),A=S.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map(j=>`<li>${j}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${A}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${l}">−</button>
              <span class="reservation-qty-value">${f}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${o}">+</button>
            </div>
          </td>
          <td>${h}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${r}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Rn(t)}function xi(e){const{index:t,items:n}=Be(),s=Ce(n).find(r=>r.key===e);if(!s)return;const o=s.itemIndices[s.itemIndices.length-1];if(o==null)return;const l=n.filter((r,c)=>c!==o);_e(t,l),De(l),me()}function qi(e){const{index:t,items:n}=Be(),a=n.filter(s=>Et(s)!==e);a.length!==n.length&&(_e(t,a),De(a),me())}function Ii(e){const{index:t,items:n}=Be(),s=Ce(n).find(h=>h.key===e);if(!s)return;const{start:o,end:l}=kt();if(!o||!l){q(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:r=[]}=Q(),c=t!=null&&r[t]||null,d=c?.id??c?.reservationId??null,u=new Set(n.map(h=>K(h.barcode))),{equipment:m=[]}=Q(),p=(m||[]).find(h=>{const v=K(h?.barcode);return!v||u.has(v)||Et({desc:h?.desc||h?.description||h?.name||"",price:Number(h?.price)||0})!==e||!Jn(h)?!1:!Se(v,o,l,d)});if(!p){q(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const f=K(p.barcode),g=ze(p);if(!g){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const w=[...n,{id:g,equipmentId:g,barcode:f,desc:p.desc||p.description||p.name||s.description||"",qty:1,price:Number.isFinite(Number(p.price))?Number(p.price):s.unitPrice,image:Le(p)}];_e(t,w),De(w),me()}function Rn(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:o}=n.dataset;if(a==="decrease-edit-group"&&s){xi(s);return}if(a==="increase-edit-group"&&s){Ii(s);return}if(a==="remove-edit-group"&&s){qi(s);return}if(a==="remove-edit-item"){const l=Number(o);Number.isNaN(l)||Ei(l)}}),e.dataset.groupListenerAttached="true")}function me(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",me),a.dataset.listenerAttached="true"),Re(a);const s=y(t?.value||"0");t&&(t.value=s);const o=parseFloat(s)||0,l=n?.value||"percent",r=!!document.getElementById("edit-res-project")?.value,c=document.getElementById("edit-res-tax"),d=r?!1:c?.checked||!1,u=a?.value||"unpaid";Re(a,u),d&&ue("edit-res-company-share");let m=nt("edit-res-company-share");d&&(!Number.isFinite(m)||m<=0)&&(ue("edit-res-company-share"),m=nt("edit-res-company-share"));const{items:p=[]}=Be(),{start:f,end:g}=kt();e.innerHTML=Ps({items:p,discount:o,discountType:l,applyTax:d,paidStatus:u,start:f,end:g,companySharePercent:m})}function Ei(e){if(e==null)return;const{index:t,items:n}=Be();if(!Array.isArray(n))return;const a=n.filter((s,o)=>o!==e);_e(t,a),De(a),me()}function Ai(e){const t=e?.value??"",n=K(t);if(!n)return;const a=$t(n);if(!a){q(i("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=xe(a);if(s!=="available"){q(Oe(s));return}const o=K(n),{index:l,items:r=[]}=Be();if(r.findIndex(h=>K(h.barcode)===o)>-1){q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=kt();if(!d||!u){q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:m=[]}=Q(),p=l!=null&&m[l]||null,f=p?.id??p?.reservationId??null;if(Se(o,d,u,f)){q(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const g=ze(a);if(!g){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const w=[...r,{id:g,equipmentId:g,barcode:o,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];_e(l,w),e&&(e.value=""),De(w),me()}function It(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=ia(t),a=K(n?.barcode||t);if(!n||!a){q(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=xe(n);if(s!=="available"){q(Oe(s));return}const{start:o,end:l}=kt();if(!o||!l){q(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:r,items:c=[]}=Be();if(c.some(w=>K(w.barcode)===a)){q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=Q(),m=r!=null&&u[r]||null,p=m?.id??m?.reservationId??null;if(Se(a,o,l,p)){q(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const f=ze(n);if(!f){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:f,equipmentId:f,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];_e(r,g),De(g),me(),e.value=""}function Da(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),It(e))});const t=()=>{ra(e.value,"edit-res-equipment-description-options")&&It(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{me()});function $i(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Ut(e);return}It(e)}}function Ni(){He(),Da()}function ki(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let st=null,de=[],en=null,ne={};function tn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),o=!!e;if(n&&(n.value=o?"true":"false"),a){const l=a.dataset.confirmLabel||"✅ تم التأكيد",r=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=o?l:r,a.dataset.state=o?"confirmed":"pending",a.classList.toggle("btn-success",o&&!t),a.classList.toggle("btn-outline-secondary",!o||t),a.disabled=t,a.setAttribute("aria-pressed",o?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function nn(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Be(){return{index:st,items:de}}function _e(e,t){st=typeof e=="number"?e:null,de=Array.isArray(t)?[...t]:[]}function Ba(){st=null,de=[],zs()}function Ci(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Ye(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ti(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),o=t?.projectId?String(t.projectId):"",l=Array.isArray(e)?[...e].sort((c,d)=>String(d.createdAt||d.start||"").localeCompare(String(c.createdAt||c.start||""))):[],r=[`<option value="">${Ye(a)}</option>`];l.forEach(c=>{r.push(`<option value="${Ye(c.id)}">${Ye(c.title||a)}</option>`)}),o&&!l.some(c=>String(c.id)===o)&&r.push(`<option value="${Ye(o)}">${Ye(s)}</option>`),n.innerHTML=r.join(""),o?n.value=o:n.value=""}function _a(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function Mn(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:o,ensureModal:l}={}){const{customers:r,projects:c}=Q(),u=Zn()?.[e];if(!u){q(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ne={...ne,reservation:u,projects:c||[]},t?.(),Ti(c||[],u);const m=u.projectId&&c?.find?.(T=>String(T.id)===String(u.projectId))||null,{effectiveConfirmed:p,projectLinked:f}=Te(u,m),g=u.items?u.items.map(T=>({...T,equipmentId:T.equipmentId??T.equipment_id??T.id,barcode:K(T?.barcode)})):[];_e(e,g);const w=i("reservations.list.unknownCustomer","غير معروف"),h=r?.find?.(T=>String(T.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const v=document.getElementById("edit-res-id");v&&(v.value=u.reservationId||u.id);const S=document.getElementById("edit-res-customer");S&&(S.value=h?.customerName||w);const A=typeof a=="function"?a(u.start):{date:"",time:""},j=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",A.date),n?.("edit-res-start-time",A.time),n?.("edit-res-end",j.date),n?.("edit-res-end-time",j.time);const P=document.getElementById("edit-res-notes");P&&(P.value=u.notes||"");const b=document.getElementById("edit-res-discount");b&&(b.value=y(u.discount??0));const I=document.getElementById("edit-res-discount-type");I&&(I.value=u.discountType||"percent");const k=u.projectId?!1:!!u.applyTax,H=document.getElementById("edit-res-tax");H&&(H.checked=k);const D=document.getElementById("edit-res-company-share");if(D){const T=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,N=T!=null?Number.parseFloat(y(String(T).replace("%","").trim())):NaN,L=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,F=L!=null?L===!0||L===1||L==="1"||String(L).toLowerCase()==="true":Number.isFinite(N)&&N>0,B=F&&Number.isFinite(N)&&N>0?N:oe,z=k||F;D.checked=z,D.dataset.companyShare=String(B)}tn(p,{disable:f});const C=document.getElementById("edit-res-paid");C&&(C.value=u.paid===!0||u.paid==="paid"?"paid":"unpaid"),Ns((u.technicians||[]).map(T=>String(T))),s?.(g),_a(),o?.();const $=document.getElementById("editReservationModal");en=Ci($,l),en?.show?.()}async function Li({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:o,handleReservationsMutation:l}={}){if(st===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const r=document.getElementById("edit-res-start")?.value?.trim(),c=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",p=y(document.getElementById("edit-res-discount")?.value||"0"),f=parseFloat(p)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent",w=nn(),h=document.getElementById("edit-res-paid")?.value||"unpaid",v=document.getElementById("edit-res-project")?.value||"",S=Fs(),A=document.getElementById("edit-res-company-share");let j=null;if(A&&A.checked){const R=A.dataset.companyShare??A.value??oe,W=Number.parseFloat(y(String(R).replace("%","").trim()));j=Number.isFinite(W)&&W>0?W:oe}const P=Number.isFinite(j)&&j>0;if(!r||!d){q(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const b=typeof e=="function"?e:(R,W)=>`${R}T${W||"00:00"}`,I=b(r,c),k=b(d,u);if(I&&k&&new Date(I)>new Date(k)){q(i("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const D=Zn()?.[st];if(!D){q(i("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(de)||de.length===0&&S.length===0){q(i("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const R of de){const W=xe(R.barcode);if(W!=="available"){q(Oe(W));return}}const C=typeof t=="function"?t:()=>!1;for(const R of de){const W=K(R.barcode);if(C(W,I,k,D.id??D.reservationId)){q(i("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const $=typeof n=="function"?n:()=>!1;for(const R of S)if($(R,I,k,D.id??D.reservationId)){q(i("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const T=document.getElementById("edit-res-tax"),N=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:Q().projects||[],L=v&&N.find(R=>String(R.id)===String(v))||null,F={...D,projectId:v?String(v):null,confirmed:w},{effectiveConfirmed:B,projectLinked:z,projectStatus:J}=Te(F,L),G=z?!1:T?.checked||!1,te=Un(de,f,g,G,S,{start:I,end:k});let Y=D.status??"pending";z?Y=L?.status??J??Y:["completed","cancelled"].includes(String(Y).toLowerCase())||(Y=w?"confirmed":"pending");const pe=Kn({reservationCode:D.reservationCode??D.reservationId??null,customerId:D.customerId,start:I,end:k,status:Y,title:D.title??null,location:D.location??null,notes:m,projectId:v?String(v):null,totalAmount:te,discount:f,discountType:g,applyTax:G,paidStatus:h,confirmed:B,items:de.map(R=>({...R,equipmentId:R.equipmentId??R.id})),technicians:S,companySharePercent:P?j:null,companyShareEnabled:P});try{const R=await Rs(D.id||D.reservationId,pe);await Ms(),q(i("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),Ba(),l?.({type:"updated",reservation:R}),s?.(),o?.(),en?.hide?.()}catch(R){console.error("❌ [reservationsEdit] Failed to update reservation",R);const W=Qn(R)?R.message:i("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");q(W,"error")}}function Fi(e={}){ne={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ne,o=document.getElementById("edit-res-discount");o&&!o.dataset.listenerAttached&&(o.addEventListener("input",()=>{o.value=y(o.value),t?.()}),o.dataset.listenerAttached="true");const l=document.getElementById("edit-res-discount-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>t?.()),l.dataset.listenerAttached="true");const r=document.getElementById("edit-res-tax");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{r.checked&&ue("edit-res-company-share"),t?.()}),r.dataset.listenerAttached="true");const c=document.getElementById("edit-res-company-share");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{c.checked?c.dataset.companyShare||(c.dataset.companyShare=String(oe)):r?.checked&&ue("edit-res-company-share"),t?.()}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-project");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{_a();const g=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:Q().projects||[],w=d.value&&g.find(j=>String(j.id)===String(d.value))||null,v={...ne?.reservation??{},projectId:d.value||null,confirmed:nn()},{effectiveConfirmed:S,projectLinked:A}=Te(v,w);tn(S,{disable:A}),t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-confirmed-btn");u&&!u.dataset.listenerAttached&&(u.addEventListener("click",()=>{if(u.disabled)return;const g=!nn();tn(g),t?.()}),u.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Li(ne).catch(g=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",g)})}),m.dataset.listenerAttached="true");const p=document.getElementById("edit-res-equipment-barcode");if(p&&!p.dataset.listenerAttached){let g=null;const w=()=>{p.value?.trim()&&(clearTimeout(g),g=null,n?.(p))};p.addEventListener("keydown",v=>{v.key==="Enter"&&(v.preventDefault(),w())});const h=()=>{if(clearTimeout(g),!p.value?.trim())return;const{start:v,end:S}=getEditReservationDateRange();!v||!S||(g=setTimeout(()=>{w()},150))};p.addEventListener("input",h),p.addEventListener("change",w),p.dataset.listenerAttached="true"}Da?.();const f=document.getElementById("editReservationModal");f&&!f.dataset.cleanupAttached&&(f.addEventListener("hidden.bs.modal",()=>{Ba(),t?.(),s?.([])}),f.dataset.cleanupAttached="true")}function Ri(){return Vs().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=Q()||{};Us(e||[]),la()})}function wn(e=null){la(),ja(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Di(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function an(){return{populateEquipmentDescriptionLists:He,setFlatpickrValue:ki,splitDateTime:On,renderEditItems:De,updateEditReservationSummary:me,addEquipmentByDescription:$i,addEquipmentToEditingReservation:Ai,addEquipmentToEditingByDescription:It,combineDateTime:tt,hasEquipmentConflict:Se,hasTechnicianConflict:Vn,renderReservations:ja,handleReservationsMutation:wn,ensureModal:Di}}function ja(e="reservations-list",t=null){wi({containerId:e,filters:t,onShowDetails:Pa,onConfirmReservation:Fa})}function Pa(e){return Si(e,{getEditContext:an,onEdit:(t,{reservation:n})=>{Ra(t,n)},onDelete:Na})}function Na(e){return zn()?window.confirm(i("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Os(e,{onAfterChange:wn}):!1:(ks(),!1)}function Fa(e){return Hs(e,{onAfterChange:wn})}function Ra(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",o)}Mn(e,an());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",o)}Mn(e,an());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const o=t.id??t.reservationId;n.set("reservationEditId",String(o));try{localStorage.setItem("pendingReservationEditId",String(o)),localStorage.removeItem("pendingReservationEditIndex")}catch(l){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",l)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(o){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",o)}}Cs({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(o=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",o)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Mi(){typeof window>"u"||(window.showReservationDetails=Pa,window.deleteReservation=Na,window.confirmReservation=Fa,window.editReservation=Ra)}export{ca as a,So as b,Mi as c,Pi as d,Fi as e,Ni as f,la as g,an as h,ji as i,U as j,wn as k,Ri as l,ja as r,Pa as s,me as u};
