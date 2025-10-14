import{d as Q,t as i,n as y,h as q,z as Bs,k as Fe,j as Un,o as Ls,u as Ds}from"./auth.js";import{n as U,l as ln,o as js,p as tt,D as oe,q as Kn,t as _s,v as we,w as xe,x as dn,y as Ps,z as Ns,A as Qn,h as Gn,B as Wn,C as Fs,s as Et,i as Xn,E as Yn,F as Rs,G as Zn,H as Jn,f as ea,I as Ms,g as ta,J as zs,K as Os,u as Hs,a as Vs,L as Us,k as Ks}from"./reservationsService.js";import{n as ne,s as na,p as Ce,q as ze,t as kt,i as un,r as Te,v as Qs,w as Gs,g as Ws}from"./projectsService.js";const Xs=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Ys=new Set(["maintenance","reserved","retired"]);function Zs(e){const t=String(e??"").trim().toLowerCase();return t&&Xs.get(t)||"available"}function Js(e){return e?typeof e=="object"?e:At(e):null}function Se(e){const t=Js(e);return t?Zs(t.status||t.state||t.statusLabel||t.status_label):"available"}function aa(e){return!Ys.has(Se(e))}function Be(e={}){return e.image||e.imageUrl||e.img||""}function eo(e){if(!e)return null;const t=U(e),{equipment:n=[]}=Q();return(n||[]).find(a=>U(a?.barcode)===t)||null}function At(e){const t=U(e);if(!t)return null;const{equipment:n=[]}=Q();return(n||[]).find(a=>U(a?.barcode)===t)||null}let Ot=null,sa=[],Ht=new Map,Vt=new Map,ht=new Map,Rt=!1;function bt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function vt(e){return y(String(e||"")).trim().toLowerCase()}function to(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=y(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function oa(e){const t=y(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Oe(e){switch(e){case"maintenance":return i("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return i("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return i("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return i("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function mn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function pn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function ia(e,t,{allowPartial:n=!1}={}){const a=ne(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const o=[];return e.forEach((c,r)=>{r.includes(a)&&o.push(c)}),o.length===1?o[0]:null}function Ut(e,t={}){return ia(Ht,e,t)}function Kt(e,t={}){return ia(Vt,e,t)}function Re(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function ra(e){sa=Array.isArray(e)?[...e]:[]}function fn(){return sa}function gn(e){return e&&fn().find(t=>String(t.id)===String(e))||null}function Ln(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||i("projects.fallback.untitled","مشروع بدون اسم")}function nt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??oe,a=y(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:oe}function ue(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??oe,a=y(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=oe),t.dataset.companyShare=String(s),t.checked=!0}function Qt(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Rt){K();return}Rt=!0;const a=()=>{Rt=!1,K()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(oe)),t.disabled){n.checked=!1,q(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),ue()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ue():n.checked&&(n.checked=!1));a()}function no(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Dn(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function jn(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function ye({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=mn();if(!n||!a||!s)return;const o=ln()||[],c=i("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),r=i("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",c);const l=new Set;Ht=new Map;const d=o.filter(g=>g&&g.id!=null).map(g=>({id:String(g.id),label:jn(g)||r})).filter(g=>{if(!g.label)return!1;const h=ne(g.label);return!h||l.has(h)?!1:(l.add(h),Ht.set(h,g),!0)}).sort((g,h)=>g.label.localeCompare(h.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(g=>`<option value="${bt(g.label)}"></option>`).join("");const u=t?"":n.value,m=e?String(e):a.value?String(a.value):"",p=m?o.find(g=>String(g.id)===m):null;if(p){const g=jn(p)||r;a.value=String(p.id),n.value=g,n.dataset.selectedId=String(p.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function ot({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:o}=pn();if(!a||!s||!o)return;const c=Array.isArray(t)?t:fn()||[],r=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",r);const l=[...c].filter(w=>w&&w.id!=null).sort((w,v)=>String(v.createdAt||v.start||"").localeCompare(String(w.createdAt||w.start||""))),d=n?"":a.value,u=i("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;Vt=new Map;const p=l.map(w=>{const v=Ln(w)||u;return{id:String(w.id),label:v}}).filter(w=>{if(!w.label)return!1;const v=ne(w.label);return!v||m.has(v)?!1:(m.add(v),Vt.set(v,w),!0)});o.innerHTML=p.map(w=>`<option value="${bt(w.label)}"></option>`).join("");const g=e?String(e):s.value?String(s.value):"",h=g?l.find(w=>String(w.id)===g):null;if(h){const w=Ln(h)||u;s.value=String(h.id),a.value=w,a.dataset.selectedId=String(h.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function yt(e,t,n){const{date:a,time:s}=Kn(n),o=document.getElementById(e),c=document.getElementById(t);if(o){if(a)if(o._flatpickr){const r=o._flatpickr.config?.dateFormat||"Y-m-d";o._flatpickr.setDate(a,!1,r)}else o.value=a;else o._flatpickr?o._flatpickr.clear():o.value="";o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0}))}if(c){if(s)if(c._flatpickr){const r=c._flatpickr.config?.dateFormat||"H:i";c._flatpickr.setDate(s,!1,r)}else c.value=s;else c._flatpickr?c._flatpickr.clear():c.value="";c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))}}function ca(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||ot({selectedValue:a});const o=(ln()||[]).find(u=>String(u.id)===String(e.clientId)),c=o?.id!=null?String(o.id):"";ye(c?{selectedValue:c}:{selectedValue:"",resetInput:!0});const r=Dn(e,"start"),l=Dn(e,"end");r&&yt("res-start","res-start-time",r),l&&yt("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),Me(),K()}function la({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:Q(),s=Array.isArray(a)?a:[];ra(s);const o=t!=null?String(t):n.value?String(n.value):"";ot({selectedValue:o,projectsList:s}),Me(),K()}function Me(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&n.checked&&(n.checked=!1);else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1)}Qt("tax")}function hn(){const{input:e,hidden:t}=pn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),o=s?Kt(s,{allowPartial:a}):null;if(o){t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id);const c=gn(o.id);c?ca(c,{skipProjectSelectUpdate:!0}):(Me(),K())}else t.value="",e.dataset.selectedId="",Me(),K()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Kt(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function bn(){const{input:e,hidden:t}=mn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),o=s?Ut(s,{allowPartial:a}):null;o?(t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id)):(t.value="",e.dataset.selectedId=""),K()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ut(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ao(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const r=decodeURIComponent(t);n=JSON.parse(r)}catch(r){console.warn("⚠️ [reservations/createForm] Failed to decode project context",r)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),!n||!n.projectId)return;document.getElementById("res-project")&&(ot({selectedValue:String(n.projectId)}),Me());const c=gn(n.projectId);if(c?ca(c,{forceNotes:!!n.forceNotes}):K(),n.start&&yt("res-start","res-start-time",n.start),n.end&&yt("res-end","res-end-time",n.end),n.customerId){const l=(ln()||[]).find(d=>String(d.id)===String(n.customerId));l?.id!=null&&ye({selectedValue:String(l.id)})}else ye({selectedValue:""})}function it(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:tt(e,n),end:tt(t,a)}}function da(e){const t=vt(e);if(t){const r=ht.get(t);if(r)return r}const{description:n,barcode:a}=oa(e);if(a){const r=At(a);if(r)return r}const s=ne(n||e);if(!s)return null;let o=Yn();if(!o?.length){const r=Q();o=Array.isArray(r?.equipment)?r.equipment:[],o.length&&Jn(o)}const c=o.find(r=>ne(r?.desc||r?.description||"")===s);return c||o.find(r=>ne(r?.desc||r?.description||"").includes(s))||null}function ua(e,t="equipment-description-options"){const n=vt(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>vt(l.value)===n)||ht.has(n))return!0;const{description:s}=oa(e);if(!s)return!1;const o=ne(s);return o?(Yn()||[]).some(r=>ne(r?.desc||r?.description||"")===o):!1}const so={available:0,reserved:1,maintenance:2,retired:3};function oo(e){return so[e]??5}function _n(e){switch(e){case"available":return i("reservations.equipment.status.available","متاح");case"reserved":return i("reservations.equipment.status.reserved","محجوز");case"maintenance":return i("reservations.equipment.status.maintenance","صيانة");case"retired":return i("reservations.equipment.status.retired","خارج الخدمة");default:return i("reservations.equipment.status.unknown","الحالة غير معروفة")}}function io(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${_n(n)}`;const a=i("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${_n(n)})`}function He(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=na(),a=Q(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],o=Array.isArray(s)?s:[];Jn(o);const c=new Map;o.forEach(d=>{const u=to(d),m=vt(u);if(!m||!u)return;const p=Se(d),g=oo(p),h=c.get(m);if(!h){c.set(m,{normalized:m,value:u,bestItem:d,bestStatus:p,bestPriority:g,statuses:new Set([p])});return}h.statuses.add(p),g<h.bestPriority&&(h.bestItem=d,h.bestStatus=p,h.bestPriority=g,h.value=u)}),ht=new Map;const l=Array.from(c.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{ht.set(d.normalized,d.bestItem);const u=io(d),m=bt(d.value);if(u===d.value)return`<option value="${m}"></option>`;const p=bt(u);return`<option value="${m}" label="${p}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function ro(e,t){const n=U(e);if(!n)return!1;const{start:a,end:s}=it();if(!a||!s)return q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(we().some(d=>U(d.barcode)===n))return q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(xe(n,a,s))return q(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const c=At(n);if(!c)return q(i("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1;const r=Se(c);if(r!=="available")return q(Oe(r)),!1;const l=ze(c);return l?(dn({id:l,equipmentId:l,barcode:n,desc:c.desc,qty:1,price:c.price,image:Be(c)}),t&&(t.value=""),qe(),K(),q(i("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")),!1)}function Gt(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=da(t);if(!n){q(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=eo(n.barcode),s=Se(a||n);if(s!=="available"){q(Oe(s));return}const o=U(n.barcode);if(!o){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c=ze(n);if(!c){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r={id:c,equipmentId:c,barcode:o,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Be(n)},{start:l,end:d}=it();if(!l||!d){q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(we().some(p=>U(p.barcode)===o)){q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(xe(o,l,d)){q(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}dn(r),qe(),K(),e.value=""}function co(){He();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Gt(e))});const t=()=>{ua(e.value,"equipment-description-options")&&Gt(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function qe(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=we(),a=i("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=i("reservations.create.summary.currency","SR"),o=i("reservations.create.equipment.imageAlt","صورة"),c=i("reservations.equipment.actions.increase","زيادة الكمية"),r=i("reservations.equipment.actions.decrease","تقليل الكمية"),l=i("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=Ce(n);t.innerHTML=d.map(u=>{const m=u.items[0]||{},p=Be(m)||u.image,g=p?`<img src="${p}" alt="${o}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',h=y(String(u.count)),w=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):w*u.count,x=`${y(w.toFixed(2))} ${s}`,f=`${y(v.toFixed(2))} ${s}`,A=u.barcodes.map(_=>y(String(_||""))).filter(Boolean),j=A.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${A.map(_=>`<li>${_}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${g}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${j}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${r}">−</button>
              <span class="reservation-qty-value">${h}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${c}">+</button>
            </div>
          </td>
          <td>${x}</td>
          <td>${f}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function lo(e){const t=we(),a=Ce(t).find(o=>o.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Ps(s),qe(),K())}function uo(e){const t=we(),n=t.filter(a=>kt(a)!==e);n.length!==t.length&&(Zn(n),qe(),K())}function mo(e){const t=we(),a=Ce(t).find(m=>m.key===e);if(!a)return;const{start:s,end:o}=it();if(!s||!o){q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const c=new Set(t.map(m=>U(m.barcode))),{equipment:r=[]}=Q(),l=(r||[]).find(m=>{const p=U(m?.barcode);return!p||c.has(p)||kt({desc:m?.desc||m?.description||m?.name||"",price:Number(m?.price)||0})!==e||!aa(m)?!1:!xe(p,s,o)});if(!l){q(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=U(l.barcode),u=ze(l);if(!u){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}dn({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:Be(l)}),qe(),K()}function K(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(y(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),o=a?!1:s?.checked||!1,c=document.getElementById("res-payment-status")?.value||"unpaid",{start:r,end:l}=it();o&&ue();const d=nt(),u=document.getElementById("res-payment-status");Re(u,c),js({selectedItems:we(),discount:t,discountType:n,applyTax:o,paidStatus:c,start:r,end:l,companySharePercent:d})}function po(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",o=>{o.target.value=y(o.target.value),K()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",K),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{Qt("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{Qt("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{Re(s),K()}),s.dataset.listenerAttached="true"),Re(s)}function fo(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){K();return}const o=t.dataset.syncedWithStart;(!t.value?.trim()||o!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),K()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Pn(){const{input:e,hidden:t}=mn(),{input:n,hidden:a}=pn(),{customers:s}=Q();let o=t?.value?String(t.value):"";if(!o&&e?.value){const L=Ut(e.value,{allowPartial:!0});L&&(o=String(L.id),t&&(t.value=o),e.value=L.label,e.dataset.selectedId=o)}const c=s.find(L=>String(L.id)===o);if(!c){q(i("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const r=c.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const L=Kt(n.value,{allowPartial:!0});L&&(l=String(L.id),a&&(a.value=l),n.value=L.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",p=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){q(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const g=`${d}T${m}`,h=`${u}T${p}`,w=new Date(g),v=new Date(h);if(Number.isNaN(w.getTime())||Number.isNaN(v.getTime())||w>=v){q(i("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const x=Ns(),f=we();if(f.length===0&&x.length===0){q(i("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",j=parseFloat(y(document.getElementById("res-discount")?.value))||0,_=document.getElementById("res-discount-type")?.value||"percent",b=document.getElementById("res-payment-status")?.value||"unpaid",E=l?gn(l):null,T=no(E);if(l&&!E){q(i("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const L of f){const O=Se(L.barcode);if(O!=="available"){q(Oe(O));return}}for(const L of f){const O=U(L.barcode);if(xe(O,g,h)){q(i("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const L of x)if(Qn(L,g,h)){q(i("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const z=document.getElementById("res-tax"),I=!!l?!1:z?.checked||!1,k=Gn(f,j,_,I,x,{start:g,end:h});I&&ue();let $=nt();I&&(!Number.isFinite($)||$<=0)&&(ue(),$=nt());const P=I||Number.isFinite($)&&$>0,B=Bs(),F=Wn({reservationCode:B,customerId:r,start:g,end:h,status:T?"confirmed":"pending",title:null,location:null,notes:A,projectId:l||null,totalAmount:k,discount:j,discountType:_,applyTax:I,paidStatus:b,confirmed:T,items:f.map(L=>({...L,equipmentId:L.equipmentId??L.id})),technicians:x,companySharePercent:P?$:null,companyShareEnabled:P});try{const L=await Fs(F);na(),He(),Et(),go(),q(i("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ot=="function"&&Ot({type:"created",reservation:L})}catch(L){console.error("❌ [reservations/createForm] Failed to create reservation",L);const O=Xn(L)?L.message:i("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");q(O,"error")}}function go(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),ye({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),o=document.getElementById("res-project-input");s&&(s.value=""),o&&(o.value="",o.dataset.selectedId=""),ot({selectedValue:"",resetInput:!0});const c=document.getElementById("equipment-description");c&&(c.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Re(r,"unpaid")),Rs(),Zn([]),qe(),Me(),K()}function ho(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){lo(s);return}if(a==="increase-group"&&s){mo(s);return}if(a==="remove-group"&&s){uo(s);return}}),e.dataset.listenerAttached="true")}function bo(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{const s=e.value;s?.trim()&&(clearTimeout(t),t=null,ro(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim())return;const{start:o,end:c}=it();!o||!c||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function vo(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Pn()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Pn()}),t.dataset.listenerAttached="true")}function Mi({onAfterSubmit:e}={}){Ot=typeof e=="function"?e:null;const{customers:t,projects:n}=Q();_s(t||[]),ye(),bn(),ra(n||[]),la({projectsList:n}),hn(),He(),co(),fo(),po(),ho(),bo(),vo(),ao(),K(),qe()}function ma(){He(),la(),ye(),bn(),hn(),qe(),K()}if(typeof document<"u"){const e=()=>{ye(),ot({projectsList:fn()}),bn(),hn(),K()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function pa(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:$e(t),endDate:$e(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const o=new Date(n);return o.setDate(n.getDate()+6),{startDate:$e(n),endDate:$e(o)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:$e(n),endDate:$e(a)}}return e==="upcoming"?{startDate:$e(t),endDate:""}:{startDate:"",endDate:""}}function yo(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let o=y(t?.value||"").trim(),c=y(n?.value||"").trim(),r=a?.value||"";if(new Set(["","today","week","month"]).has(r)||(r="",a&&(a.value=""),wt(t),wt(n),o="",c=""),!o&&!c&&r){const d=pa(r);o=d.startDate,c=d.endDate}return{searchTerm:ne(e?.value||""),startDate:o,endDate:c,status:s?.value||"",quickRange:r}}function zi(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=y(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const o=document.getElementById("reservation-date-range");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>{wo(o.value),t()}),o.dataset.listenerAttached="true");const c=document.getElementById("reservation-status-filter");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",t),c.dataset.listenerAttached="true");const r=document.getElementById("clear-filters");r&&!r.dataset.listenerAttached&&(r.addEventListener("click",()=>{n&&(n.value=""),wt(a),wt(s),o&&(o.value=""),c&&(c.value=""),t()}),r.dataset.listenerAttached="true")}function wo(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=pa(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function $e(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function wt(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function mt(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function xo(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function So(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=xo(n);if(a!==null)return a}return null}function Nn(e,t=0){const n=So(e);if(n!=null)return n;const a=mt(e.createdAt??e.created_at);if(a!=null)return a;const s=mt(e.updatedAt??e.updated_at);if(s!=null)return s;const o=mt(e.start);if(o!=null)return o;const c=mt(e.end);if(c!=null)return c;const r=Number(e.id??e.reservationId);return Number.isFinite(r)?r:Number.isFinite(t)?t:0}function qo({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const o=e.map((f,A)=>({reservation:f,index:A})),c=t.searchTerm||"",r=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",m=t.endDate||"",p=t.status||"",g=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,h=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,w=u?new Date(`${u}T00:00:00`):null,v=m?new Date(`${m}T23:59:59`):null,x=o.filter(({reservation:f})=>{const A=n.get(String(f.customerId)),j=s?.get?.(String(f.projectId)),_=f.start?new Date(f.start):null,b=un(f),{effectiveConfirmed:E}=Te(f,j);if(g!=null&&String(f.customerId)!==String(g)||h!=null&&!(Array.isArray(f.technicians)?f.technicians.map(k=>String(k)):[]).includes(String(h))||p==="confirmed"&&!E||p==="pending"&&E||p==="completed"&&!b||w&&_&&_<w||v&&_&&_>v)return!1;if(r){const I=[f.reservationId,f.id,f.reservation_id,f.reservationCode,f.reservation_code,f.code,f.reference,f.referenceNumber,f.reference_number],k=ne(I.filter(P=>P!=null&&P!=="").map(String).join(" ")).replace(/\s+/g,""),$=r.replace(/\s+/g,"");if(!k.includes($))return!1}if(l&&!ne(A?.customerName||"").includes(l))return!1;if(d){const I=[f.projectId,f.project_id,f.projectID,j?.id,j?.projectCode,j?.project_code],k=ne(I.filter(P=>P!=null&&P!=="").map(String).join(" ")).replace(/\s+/g,""),$=d.replace(/\s+/g,"");if(!k.includes($))return!1}if(!c)return!0;const T=f.items?.map?.(I=>`${I.barcode} ${I.desc}`).join(" ")||"",z=(f.technicians||[]).map(I=>a.get(String(I))?.name).filter(Boolean).join(" ");return ne([f.reservationId,A?.customerName,f.notes,T,z,j?.title].filter(Boolean).join(" ")).includes(c)});return x.sort((f,A)=>{const j=Nn(f.reservation,f.index),_=Nn(A.reservation,A.index);return j!==_?_-j:A.index-f.index}),x}function Io({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=i("reservations.create.summary.currency","SR"),o=i("reservations.list.taxIncludedShort","(شامل الضريبة)"),c=i("reservations.list.unknownCustomer","غير معروف"),r=i("reservations.list.noNotes","لا توجد ملاحظات"),l=i("reservations.list.itemsCountShort","{count} عنصر"),d=i("reservations.list.crew.separator","، "),u=i("reservations.list.status.confirmed","✅ مؤكد"),m=i("reservations.list.status.pending","⏳ غير مؤكد"),p=i("reservations.list.payment.paid","💳 مدفوع"),g=i("reservations.list.payment.unpaid","💳 غير مدفوع"),h=i("reservations.list.actions.confirm","✔️ تأكيد"),w=i("reservations.list.project.unlinked","غير مرتبط بمشروع"),v=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),x={client:i("reservations.list.labels.client","👤 العميل"),project:i("reservations.list.labels.project","📁 المشروع"),start:i("reservations.list.labels.start","🗓️ بداية الحجز"),end:i("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:i("reservations.list.labels.cost","💵 التكلفة"),equipment:i("reservations.list.labels.equipment","📦 المعدات"),crew:i("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:f,index:A})=>{const j=t.get(String(f.customerId)),_=f.projectId?a?.get?.(String(f.projectId)):null,b=un(f),E=f.paid===!0||f.paid==="paid",{effectiveConfirmed:T,projectLinked:z}=Te(f,_),N=T?"status-confirmed":"status-pending",I=E?"status-paid":"status-unpaid";let k=`<span class="reservation-chip status-chip ${N}">${T?u:m}</span>`,$=`<span class="reservation-chip status-chip ${I}">${E?p:g}</span>`,P=E?" tile-paid":" tile-unpaid";b&&(P+=" tile-completed");let B="";b&&(k=`<span class="reservation-chip status-chip status-completed">${u}</span>`,$=`<span class="reservation-chip status-chip status-completed">${E?p:g}</span>`,B=` data-completed-label="${i("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const F=!z&&!T?`<button class="tile-confirm" data-reservation-index="${A}" data-action="confirm">${h}</button>`:"",L=F?`<div class="tile-actions">${F}</div>`:"",O=f.items?.length||0,J=(f.technicians||[]).map(re=>n.get(String(re))).filter(Boolean),G=J.map(re=>re.name).join(d)||"—",ae=y(String(f.reservationId??"")),Y=f.start?y(Fe(f.start)):"-",pe=f.end?y(Fe(f.end)):"-",R=y(String(f.cost??0)),W=y(String(O)),Ve=f.notes?y(f.notes):r,fe=l.replace("{count}",W),Ue=f.applyTax?`<small>${o}</small>`:"";let Ie=w;return f.projectId&&(Ie=_?.title?y(_.title):v),`
      <div class="${F?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${P}"${B} data-reservation-index="${A}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ae}</div>
          <div class="tile-badges">
            ${k}
            ${$}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${x.client}</span>
            <span class="tile-value">${j?.customerName||c}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.project}</span>
            <span class="tile-value">${Ie}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.start}</span>
            <span class="tile-value tile-inline">${Y}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.end}</span>
            <span class="tile-value tile-inline">${pe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.cost}</span>
            <span class="tile-value">${R} ${s} ${Ue}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.equipment}</span>
            <span class="tile-value">${fe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.crew}</span>
            <span class="tile-value">${J.length?G:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ve}</span>
          </div>
        </div>
        ${L}
      </div>
    `}).join("")}function pt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Eo(e,t,n=[],a,s=null){const{projectLinked:o,effectiveConfirmed:c}=Te(e,s),r=e.paid===!0||e.paid==="paid",l=un(e),d=e.items||[],u=Ce(d),{technicians:m=[]}=Q(),p=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(m)?m:[]),g=new Map;p.forEach(D=>{if(!D||D.id==null)return;const H=String(D.id),ee=g.get(H)||{};g.set(H,{...ee,...D})});const h=(e.technicians||[]).map(D=>g.get(String(D))).filter(Boolean),w=Un(),v=ea(e.start,e.end),x=(D={})=>{const H=[D.dailyWage,D.daily_rate,D.dailyRate,D.wage,D.rate];for(const ee of H){if(ee==null)continue;const Pe=parseFloat(y(String(ee)));if(Number.isFinite(Pe))return Pe}return 0},A=d.reduce((D,H)=>D+(H.qty||1)*(H.price||0),0)*v,_=h.reduce((D,H)=>D+x(H),0)*v,b=A+_,E=parseFloat(e.discount)||0,T=e.discountType==="amount"?E:b*(E/100),z=Math.max(0,b-T),N=o?!1:e.applyTax,I=N?z*.15:0,k=Number(e.cost),$=Number.isFinite(k),P=z+I,B=o?Math.round(P):$?k:Math.round(P),F=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,L=F!=null?parseFloat(y(String(F))):NaN;let G=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(L)&&L>0)&&Number.isFinite(L)?L:0,ae=G>0?Math.max(0,(Number.isFinite(B)?B:0)*(G/100)):0;N&&G<=0&&(G=oe,ae=Math.max(0,(Number.isFinite(B)?B:0)*(G/100)));const Y=y(String(e.reservationId??e.id??"")),pe=e.start?y(Fe(e.start)):"-",R=e.end?y(Fe(e.end)):"-",W=y(String(h.length)),Ve=y(A.toFixed(2)),fe=y(T.toFixed(2)),Ue=y(z.toFixed(2)),Ie=y(I.toFixed(2)),Ee=y((B??0).toFixed(2)),re=y(String(v)),Z=i("reservations.create.summary.currency","SR"),En=i("reservations.details.labels.discount","الخصم"),Ct=i("reservations.details.labels.tax","الضريبة (15%)"),rt=i("reservations.details.labels.crewTotal","إجمالي الفريق"),_e=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ct=i("reservations.details.labels.duration","عدد الأيام"),Tt=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Bt=i("reservations.details.labels.netProfit","💵 صافي الربح"),lt=i("reservations.create.equipment.imageAlt","صورة"),ge={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},he=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Lt=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),Dt=i("reservations.details.technicians.roleUnknown","غير محدد"),ke=i("reservations.details.technicians.phoneUnknown","غير متوفر"),Ke=i("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Qe=i("reservations.list.status.confirmed","✅ مؤكد"),jt=i("reservations.list.status.pending","⏳ غير مؤكد"),_t=i("reservations.list.payment.paid","💳 مدفوع"),Pt=i("reservations.list.payment.unpaid","💳 غير مدفوع"),M=i("reservations.list.status.completed","📁 منتهي"),X=i("reservations.details.labels.id","🆔 رقم الحجز"),ce=i("reservations.details.section.bookingInfo","بيانات الحجز"),Va=i("reservations.details.section.paymentSummary","ملخص الدفع"),Ua=i("reservations.details.labels.finalTotal","المجموع النهائي"),Ka=i("reservations.details.section.crew","😎 الفريق الفني"),Qa=i("reservations.details.crew.count","{count} عضو"),Ga=i("reservations.details.section.items","📦 المعدات المرتبطة"),Wa=i("reservations.details.items.count","{count} عنصر"),Xa=i("reservations.details.actions.edit","✏️ تعديل"),Ya=i("reservations.details.actions.delete","🗑️ حذف"),Za=i("reservations.details.labels.customer","العميل"),Ja=i("reservations.details.labels.contact","رقم التواصل"),es=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const ts=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),ns=i("reservations.details.actions.openProject","📁 فتح المشروع"),as=i("reservations.details.labels.start","بداية الحجز"),ss=i("reservations.details.labels.end","نهاية الحجز"),os=i("reservations.details.labels.notes","ملاحظات"),is=i("reservations.list.noNotes","لا توجد ملاحظات"),rs=i("reservations.details.labels.itemsCount","عدد المعدات"),cs=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),ls=i("reservations.details.labels.paymentStatus","حالة الدفع"),ds=i("reservations.list.unknownCustomer","غير معروف"),kn=r?_t:Pt,us=u.reduce((D,H)=>D+(Number(H.quantity)||0),0),ms=y(String(us)),An=Wa.replace("{count}",ms),ps=Qa.replace("{count}",W),fs=e.notes?y(e.notes):is,gs=y(_.toFixed(2)),hs=y(String(G)),bs=y(ae.toFixed(2)),vs=`${hs}% (${bs} ${Z})`,$n=Math.max(0,(B??0)-I-ae),ys=y($n.toFixed(2)),be=[{icon:"💳",label:ls,value:kn},{icon:"📦",label:rs,value:An},{icon:"⏱️",label:ct,value:re},{icon:"💼",label:cs,value:`${Ve} ${Z}`}];be.push({icon:"😎",label:rt,value:`${gs} ${Z}`}),T>0&&be.push({icon:"💸",label:En,value:`${fe} ${Z}`}),be.push({icon:"📊",label:_e,value:`${Ue} ${Z}`}),N&&I>0&&be.push({icon:"🧾",label:Ct,value:`${Ie} ${Z}`}),G>0&&be.push({icon:"🏦",label:Tt,value:vs}),Math.abs($n-(B??0))>.009&&be.push({icon:"💵",label:Bt,value:`${ys} ${Z}`}),be.push({icon:"💰",label:Ua,value:`${Ee} ${Z}`});const ws=be.map(({icon:D,label:H,value:ee})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${D} ${H}</span>
      <span class="summary-details-value">${ee}</span>
    </div>
  `).join(""),Cn=[{text:c?Qe:jt,className:c?"status-confirmed":"status-pending"},{text:kn,className:r?"status-paid":"status-unpaid"}];l&&Cn.push({text:M,className:"status-completed"});const xs=Cn.map(({text:D,className:H})=>`<span class="status-chip ${H}">${D}</span>`).join(""),Ge=(D,H,ee)=>`
    <div class="res-info-row">
      <span class="label">${D} ${H}</span>
      <span class="value">${ee}</span>
    </div>
  `;let Nt="";if(e.projectId){let D=pt(ts);if(s){const H=s.title||i("projects.fallback.untitled","مشروع بدون اسم");D=`${pt(H)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${pt(ns)}</button>`}Nt=`
      <div class="res-info-row">
        <span class="label">📁 ${es}</span>
        <span class="value">${D}</span>
      </div>
    `}const Ae=[];Ae.push(Ge("👤",Za,t?.customerName||ds)),Ae.push(Ge("📞",Ja,t?.phone||"—")),Ae.push(Ge("🗓️",as,pe)),Ae.push(Ge("🗓️",ss,R)),Ae.push(Ge("📝",os,fs)),Nt&&Ae.push(Nt);const Ss=Ae.join(""),qs=u.length?u.map(D=>{const H=D.items[0]||{},ee=Be(H)||D.image,Pe=ee?`<img src="${ee}" alt="${lt}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',dt=Number(D.quantity)||Number(D.count)||0,ut=y(String(dt)),Tn=Number.isFinite(Number(D.unitPrice))?Number(D.unitPrice):0,As=Number.isFinite(Number(D.totalPrice))?Number(D.totalPrice):Tn*dt,$s=`${y(Tn.toFixed(2))} ${Z}`,Cs=`${y(As.toFixed(2))} ${Z}`,Bn=D.barcodes.map(Ft=>y(String(Ft||""))).filter(Boolean),Ts=Bn.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Bn.map(Ft=>`<li>${Ft}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td>
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${Pe}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${pt(H.desc||H.description||H.name||D.description||"-")}</div>
                  ${Ts}
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
            <td>${$s}</td>
            <td>${Cs}</td>
            <td>
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${he}</td></tr>`,Is=`
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
        <tbody>${qs}</tbody>
      </table>
    </div>
  `,Es=h.map((D,H)=>{const ee=y(String(H+1)),Pe=D.role||Dt,dt=D.phone||ke,ut=D.wage?Ke.replace("{amount}",y(String(D.wage))).replace("{currency}",Z):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ee}</span>
          <span class="technician-name">${D.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${Pe}</div>
          <div>📞 ${dt}</div>
          ${ut?`<div>💰 ${ut}</div>`:""}
        </div>
      </div>
    `}).join(""),ks=h.length?`<div class="reservation-technicians-grid">${Es}</div>`:`<ul class="reservation-modal-technicians"><li>${Lt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${X}</span>
          <strong>${Y}</strong>
        </div>
        <div class="status-chips">
          ${xs}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${ce}</h6>
          ${Ss}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${Va}</h6>
            <div class="summary-details">
              ${ws}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Ka}</span>
          <span class="count">${ps}</span>
        </div>
        ${ks}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Ga}</span>
          <span class="count">${An}</span>
        </div>
        ${Is}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${i("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Xa}</button>
        ${w?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Ya}</button>`:""}
      </div>
    </div>
  `}const ko=`@page {
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
`,fa="reservations.quote.sequence",le={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Ao=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],vn=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],ga=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(y(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>S(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>S(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>S(y(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>S(y(Number(e?.price||0).toFixed(2)))}],ha=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(y(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>S(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>S(e?.role||i("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>S(e?.phone||i("reservations.details.technicians.phoneUnknown","غير متوفر"))}],ba={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"companyShare",labelKey:"reservations.details.labels.companyShare",fallback:"🏦 نسبة الشركة"},{id:"netProfit",labelKey:"reservations.details.labels.netProfit",fallback:"صافي الربح"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:ga.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:ha.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},$o="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Co="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",To="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Bo=ko.trim(),Lo=/color\([^)]*\)/gi,xt=/(color\(|color-mix\()/i,Do=document.createElement("canvas"),ft=Do.getContext("2d"),va=/^data:image\/svg\+xml/i,jo=/\.svg($|[?#])/i,Ze=512,Wt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",ya=96,wa=25.4,Xt=210,gt=297,Je=Math.round(Xt/wa*ya),et=Math.round(gt/wa*ya),_o=2,xa=/safari/i,Po=/(iphone|ipad|ipod)/i,No=/(iphone|ipad|ipod)/i,Fo=/(crios|fxios|edgios|opios)/i,St="[reservations/pdf]";let V=null,C=null,ie=1,We=null,Xe=null,ve=null,Ne=null;function Yt(){return!!window?.bootstrap?.Modal}function Ro(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),ve||(ve=document.createElement("div"),ve.className="modal-backdrop fade show",ve.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(ve)),Ne||(Ne=t=>{t.key==="Escape"&&Zt(e)},document.addEventListener("keydown",Ne));try{e.focus({preventScroll:!0})}catch{}}}function Zt(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),ve&&(ve.remove(),ve=null),Ne&&(document.removeEventListener("keydown",Ne),Ne=null))}function Mo(e){if(e){if(Yt()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Ro(e)}}function Sa(){const e={};return Object.entries(ba).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function zo(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Oo(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function qa(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Ia(){return Object.fromEntries(vn.map(({id:e})=>[e,!1]))}function yn(e,t){return e.sectionExpansions||(e.sectionExpansions=Ia()),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Ho(e,t){return yn(e,t)?.[t]!==!1}function wn(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Vo(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Po.test(e)}function Uo(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=xa.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Ea(){return Vo()&&Uo()}function Ko(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"";return No.test(e)&&xa.test(e)&&!Fo.test(e)}function Mt(e,...t){try{console.log(`${St} ${e}`,...t)}catch{}}function Jt(e,...t){try{console.warn(`${St} ${e}`,...t)}catch{}}function Qo(e,t,...n){try{t?console.error(`${St} ${e}`,t,...n):console.error(`${St} ${e}`,...n)}catch{}}function se(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Go(e,t="لا توجد بيانات للعرض."){const n=S(i(e,t));return se(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Fn(e,t){return Array.isArray(e)&&e.length?e:[Go(t)]}function en(e,t="#000"){if(!ft||!e)return t;try{return ft.fillStyle="#000",ft.fillStyle=e,ft.fillStyle||t}catch{return t}}function Wo(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=en(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function ka(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Lo,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Xo=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function Aa(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;Xo.forEach(c=>{const r=s[c];if(r&&xt.test(r)){const l=c.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),d=c==="backgroundColor"?"#ffffff":s.color||"#000000",u=en(r,d);a.style.setProperty(l,u,"important")}});const o=s.backgroundImage;if(o&&xt.test(o)){const c=en(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",c,"important")}})}function $a(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(o=>{const c=a[o];if(c&&xt.test(c)){const r=o.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),l=o==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(r,l,"important")}});const s=a.backgroundImage;s&&xt.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function Rn(e,t=Ze){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Yo(e){if(!e)return{width:Ze,height:Ze};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Rn(t,0):0,s=n?Rn(n,0):0;if(a>0&&s>0)return{width:a,height:s};const o=e.getAttribute?.("viewBox");if(o){const c=o.trim().split(/[\s,]+/).map(r=>parseFloat(r||"0"));if(c.length>=4){const[,,r,l]=c;a=a||(Number.isFinite(r)&&r>0?r:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Ze,height:s||Ze}}function Ca(e=""){return typeof e!="string"?!1:va.test(e)||jo.test(e)}function Zo(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Jo(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=o=>{const c=o?.message||`Unable to load image from ${e}`;a(new Error(c))},s.src=e})}async function Ta(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const o=await Jo(s),c=n.createElement("canvas"),r=Math.max(t.width||o.naturalWidth||o.width||0,1),l=Math.max(t.height||o.naturalHeight||o.height||r,1);c.width=r,c.height=l;const d=c.getContext("2d");return d.clearRect(0,0,r,l),d.drawImage(o,0,0,r,l),c.toDataURL("image/png")}catch(o){return console.warn("[reservations/pdf] failed to rasterize SVG content",o),null}finally{URL.revokeObjectURL(s)}}async function ei(e){if(!e)return null;if(va.test(e))return Zo(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function ti(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Ca(t))return!1;const n=await ei(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Wt),!1;const a=await Ta(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Wt),!1)}async function ni(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Yo(e),s=await Ta(n,a),c=(e.ownerDocument||document).createElement("img");c.setAttribute("src",s||Wt),c.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),c.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&c.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&c.setAttribute("style",e.getAttribute("style"));const r=e.getAttribute("width"),l=e.getAttribute("height");return r&&c.setAttribute("width",r),l&&c.setAttribute("height",l),e.parentNode?.replaceChild(c,e),!!s}async function Ba(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Ca(s.getAttribute?.("src"))&&a.push(ti(s))}),n.forEach(s=>{a.push(ni(s))}),a.length&&await Promise.allSettled(a)}function tn(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Qo(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const o=n||i("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى.");if(q(o),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function nn({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Jt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Jt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function xn(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",o=>n(o)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=o=>n(o),document.head.appendChild(s)})}function Mn(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function zn(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function ai(){const e=zn();return e||(Xe||(Xe=xn(Co).catch(t=>{throw Xe=null,t}).then(()=>{const t=zn();if(!t)throw Xe=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Xe)}async function si(){const e=Mn();return e||(We||(We=xn(To).catch(t=>{throw We=null,t}).then(()=>{const t=Mn();if(!t)throw We=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),We)}async function oi(){if(window.html2pdf||await xn($o),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Wo()}function S(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ii(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function ri(){const e=window.localStorage?.getItem?.(fa),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ci(){const t=ri()+1;return{sequence:t,quoteNumber:ii(t)}}function li(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(fa,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function di(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function ui(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(y(String(n)));if(Number.isFinite(a))return a}return 0}function mi(e){const t=Et()||[],{technicians:n=[]}=Q(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(o=>{if(!o||o.id==null)return;const c=String(o.id),r=s.get(c)||{};s.set(c,{...r,...o})}),(e.technicians||[]).map(o=>s.get(String(o))).filter(Boolean)}function pi(e,t,n){const{projectLinked:a}=Te(e,n),s=ea(e.start,e.end),r=(Array.isArray(e.items)?e.items:[]).reduce(($,P)=>$+(Number(P?.qty)||1)*(Number(P?.price)||0),0)*s,d=t.reduce(($,P)=>$+ui(P),0)*s,u=r+d,m=parseFloat(e.discount)||0,p=e.discountType==="amount"?m:u*(m/100),g=Math.max(0,u-p),h=a?!1:e.applyTax,w=h?g*.15:0,v=Number(e.cost),x=Number.isFinite(v),f=g+w,A=a?Math.round(f):x?v:Math.round(f),j=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,_=j!=null?parseFloat(y(String(j).replace("%","").trim())):NaN,b=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let T=(b!=null?b===!0||b===1||b==="1"||String(b).toLowerCase()==="true":Number.isFinite(_)&&_>0)&&Number.isFinite(_)?Number(_):0;h&&T<=0&&(T=oe);const z=T>0?Math.max(0,(A??0)*(T/100)):0,N=Math.max(0,(A??0)-w-z),I={equipmentTotal:r,crewTotal:d,discountAmount:p,taxAmount:w,finalTotal:A??0,companySharePercent:T,companyShareAmount:z,netProfit:N},k={equipmentTotal:y(r.toFixed(2)),crewTotal:y(d.toFixed(2)),discountAmount:y(p.toFixed(2)),taxAmount:y(w.toFixed(2)),finalTotal:y((A??0).toFixed(2)),companySharePercent:y(T.toFixed(2)),companyShareAmount:y(z.toFixed(2)),netProfit:y(N.toFixed(2))};return{totals:I,totalsDisplay:k,rentalDays:s}}function La({reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:o,rentalDays:c,currencyLabel:r,sections:l,fieldSelections:d={},quoteNumber:u,quoteDate:m}){const{companySharePercent:p=0,companyShareAmount:g=0,netProfit:h=0}=s||{},w=y(String(e?.reservationId??e?.id??"")),v=e.start?y(Fe(e.start)):"-",x=e.end?y(Fe(e.end)):"-",f=t?.customerName||t?.full_name||t?.name||"-",A=t?.phone||"-",j=t?.email||"-",_=t?.company||t?.company_name||"-",b=y(A),E=n?.title||n?.name||i("reservations.details.project.none","غير مرتبط بمشروع"),T=n?.code||n?.projectCode||"",z=y(String(c)),N=e?.notes||"",I=zo(d),k=(M,X)=>qa(I,M,X),$=M=>l?.has?.(M),P=`<div class="quote-placeholder">${S(i("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,B=(M,X)=>`<div class="info-plain__item">${S(M)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${S(X)}</strong></div>`,F=(M,X,{variant:ce="inline"}={})=>ce==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(M)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(X)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(M)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(X)}</span>
    </span>`,L=(M,X)=>`<div class="payment-row">
      <span class="payment-row__label">${S(M)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(X)}</span>
    </div>`,O=[];k("customerInfo","customerName")&&O.push(B(i("reservations.details.labels.customer","العميل"),f)),k("customerInfo","customerCompany")&&O.push(B(i("reservations.details.labels.company","الشركة"),_)),k("customerInfo","customerPhone")&&O.push(B(i("reservations.details.labels.phone","الهاتف"),b)),k("customerInfo","customerEmail")&&O.push(B(i("reservations.details.labels.email","البريد"),j));const J=$("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(i("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${O.length?`<div class="info-plain">${O.join("")}</div>`:P}
      </section>`:"",G=[];k("reservationInfo","reservationId")&&G.push(B(i("reservations.details.labels.reservationId","رقم الحجز"),w||"-")),k("reservationInfo","reservationStart")&&G.push(B(i("reservations.details.labels.start","بداية الحجز"),v)),k("reservationInfo","reservationEnd")&&G.push(B(i("reservations.details.labels.end","نهاية الحجز"),x)),k("reservationInfo","reservationDuration")&&G.push(B(i("reservations.details.labels.duration","عدد الأيام"),z));const ae=$("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${S(i("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${G.length?`<div class="info-plain">${G.join("")}</div>`:P}
      </section>`:"",Y=[];k("projectInfo","projectTitle")&&Y.push(B(i("reservations.details.labels.project","المشروع"),E)),k("projectInfo","projectCode")&&Y.push(B(i("reservations.details.labels.code","الرمز"),T||"-"));const pe=$("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${S(i("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${Y.length?`<div class="info-plain">${Y.join("")}</div>`:P}
      </section>`:"",R=[];if(k("financialSummary","equipmentTotal")&&R.push(F(i("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${o.equipmentTotal} ${r}`)),k("financialSummary","crewTotal")&&R.push(F(i("reservations.details.labels.crewTotal","إجمالي الفريق"),`${o.crewTotal} ${r}`)),k("financialSummary","discountAmount")&&R.push(F(i("reservations.details.labels.discount","الخصم"),`${o.discountAmount} ${r}`)),k("financialSummary","taxAmount")&&R.push(F(i("reservations.details.labels.tax","الضريبة"),`${o.taxAmount} ${r}`)),p>0&&k("financialSummary","companyShare")){const M=o.companySharePercent??y(p.toFixed(2)),X=o.companyShareAmount??y(g.toFixed(2)),ce=`${M}% (${X} ${r})`;R.push(F(i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),ce))}const W=k("financialSummary","finalTotal"),Ve=k("financialSummary","netProfit")&&Number.isFinite(h)&&Math.abs((h??0)-(s?.finalTotal??0))>.009,fe=[];W&&fe.push(F(i("reservations.details.labels.total","الإجمالي النهائي"),`${o.finalTotal} ${r}`,{variant:"final"})),Ve&&fe.push(F(i("reservations.details.labels.netProfit","💵 صافي الربح"),`${o.netProfit} ${r}`,{variant:"final"}));const Ue=fe.length?`<div class="totals-final">${fe.join("")}</div>`:"",Ie=$("financialSummary")?!R.length&&!W?`<section class="quote-section quote-section--financial">${P}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(i("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${R.length?`<div class="totals-inline">${R.join("")}</div>`:""}
            ${Ue}
          </div>
        </section>`:"",Ee=ga.filter(M=>k("items",M.id)),re=Ee.length>0,Z=re?Ee.map(M=>`<th>${S(M.labelKey?i(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",Ct=Array.isArray(e.items)&&e.items.length>0?e.items.map((M,X)=>`<tr>${Ee.map(ce=>`<td>${ce.render(M,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ee.length,1)}" class="empty">${S(i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,rt=$("items")?re?`<section class="quote-section quote-section--table">
            <h3>${S(i("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Z}</tr>
              </thead>
              <tbody>${Ct}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(i("reservations.details.items.title","المعدات"))}</h3>
            ${P}
          </section>`:"",_e=ha.filter(M=>k("crew",M.id)),ct=_e.length>0,Tt=ct?_e.map(M=>`<th>${S(M.labelKey?i(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",Bt=a.length?a.map((M,X)=>`<tr>${_e.map(ce=>`<td>${ce.render(M,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(_e.length,1)}" class="empty">${S(i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,lt=$("crew")?ct?`<section class="quote-section quote-section--table">
            <h3>${S(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Tt}</tr>
              </thead>
              <tbody>${Bt}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${P}
          </section>`:"",ge=$("notes")?`<section class="quote-section">
        <h3>${S(i("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${S(N||i("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",he=[];k("payment","beneficiary")&&he.push(L(i("reservations.quote.labels.beneficiary","اسم المستفيد"),le.beneficiaryName)),k("payment","bank")&&he.push(L(i("reservations.quote.labels.bank","اسم البنك"),le.bankName)),k("payment","account")&&he.push(L(i("reservations.quote.labels.account","رقم الحساب"),y(le.accountNumber))),k("payment","iban")&&he.push(L(i("reservations.quote.labels.iban","رقم الآيبان"),y(le.iban)));const Lt=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(i("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${he.length?he.join(""):P}</div>
      </div>
      <p class="quote-approval-note">${S(le.approvalNote)}</p>
    </section>`,Dt=`<footer class="quote-footer">
        <h4>${S(i("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Ao.map(M=>`<li>${S(M)}</li>`).join("")}</ul>
      </footer>`,ke=[];J&&ae?ke.push(se(`<div class="quote-section-row">${J}${ae}</div>`,{blockType:"group"})):(ae&&ke.push(se(ae)),J&&ke.push(se(J))),pe&&ke.push(se(pe));const Ke=[];rt&&Ke.push(se(rt,{blockType:"table",extraAttributes:'data-table-id="items"'})),lt&&Ke.push(se(lt,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Qe=[];Ie&&Qe.push(se(Ie,{blockType:"summary"})),ge&&Qe.push(se(ge));const jt=[se(Lt,{blockType:"payment"}),se(Dt,{blockType:"footer"})],_t=[...Fn(ke,"reservations.quote.placeholder.page1"),...Ke,...Fn(Qe,"reservations.quote.placeholder.page2"),...jt],Pt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${S(le.logoUrl)}" alt="${S(le.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${S(i("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${S(le.companyName)}</p>
        <p class="quote-company-cr">${S(i("reservations.quote.labels.cr","السجل التجاري"))}: ${S(le.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${S(u)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${S(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Bo}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Pt}
          ${_t.join("")}
        </div>
      </div>
    </div>
  `}function fi(e){return!e||e.complete&&e.naturalHeight!==0?Promise.resolve():new Promise(t=>{const n=()=>t();e.addEventListener("load",n,{once:!0}),e.addEventListener("error",n,{once:!0})})}async function at(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),o=a.map(r=>fi(r)),c=[s,...o].map(r=>r.catch(l=>(Jt("asset load failed",l),null)));await Promise.all(c),await new Promise(r=>n.requestAnimationFrame(()=>r()))}async function Da(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),o=e.querySelector("[data-quote-source]"),c=o?.querySelector("[data-quote-header-template]");if(!s||!o||!c)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Ba(o),await at(o),s.innerHTML="";const r=Array.from(o.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=b=>{b.style.margin="0 auto",b.style.breakInside="avoid",b.style.pageBreakInside="avoid",b.style.pageBreakAfter="auto",b.style.breakAfter="auto"},m=()=>{const b=a.createElement("div"),E=s.childElementCount===0;if(b.className="quote-page",b.dataset.pageIndex=String(s.childElementCount),E){b.classList.add("quote-page--primary");const z=c.cloneNode(!0);z.removeAttribute("data-quote-header-template"),b.appendChild(z)}else b.classList.add("quote-page--continuation");const T=a.createElement("main");T.className="quote-body",b.appendChild(T),s.appendChild(b),u(b),l=b,d=T},p=()=>{(!l||!d||!d.isConnected)&&m()},g=()=>{if(!l||!d||d.childElementCount>0)return;const b=l;l=null,d=null,b.parentNode&&b.parentNode.removeChild(b)},h=()=>{l=null,d=null},w=()=>l?l.scrollHeight-l.clientHeight>_o:!1,v=(b,{allowOverflow:E=!1}={})=>(p(),d.appendChild(b),w()&&!E?(d.removeChild(b),g(),!1):!0),x=b=>{const E=b.cloneNode(!0);E.removeAttribute?.("data-quote-block"),E.removeAttribute?.("data-block-type"),E.removeAttribute?.("data-table-id"),!v(E)&&(h(),!v(E)&&v(E,{allowOverflow:!0}))},f=b=>{const E=b.querySelector("table");if(!E){x(b);return}const T=b.querySelector("h3"),z=E.querySelector("thead"),N=Array.from(E.querySelectorAll("tbody tr"));if(!N.length){x(b);return}let I=null,k=0;const $=(B=!1)=>{const F=b.cloneNode(!1);F.removeAttribute("data-quote-block"),F.removeAttribute("data-block-type"),F.removeAttribute("data-table-id"),F.classList.add("quote-section--table-fragment"),B&&F.classList.add("quote-section--table-fragment--continued");const L=T?T.cloneNode(!0):null;L&&F.appendChild(L);const O=E.cloneNode(!1);O.classList.add("quote-table--fragment"),z&&O.appendChild(z.cloneNode(!0));const J=a.createElement("tbody");return O.appendChild(J),F.appendChild(O),{section:F,body:J}},P=(B=!1)=>I||(I=$(B),v(I.section)||(h(),v(I.section)||v(I.section,{allowOverflow:!0})),I);N.forEach(B=>{P(k>0);const F=B.cloneNode(!0);if(I.body.appendChild(F),w()&&(I.body.removeChild(F),I.body.childElementCount||(d.removeChild(I.section),I=null,g()),h(),I=null,P(k>0),I.body.appendChild(F),w())){I.section.classList.add("quote-section--table-fragment--overflow"),k+=1;return}k+=1}),I=null};if(!r.length)return;r.forEach(b=>{b.getAttribute("data-block-type")==="table"?f(b):x(b)});const A=Array.from(s.children),j=[];A.forEach((b,E)=>{const T=b.querySelector(".quote-body");if(E!==0&&(!T||T.childElementCount===0)){b.remove();return}j.push(b)}),j.forEach((b,E)=>{const T=E===0;b.style.pageBreakAfter="auto",b.style.breakAfter="auto",b.style.pageBreakBefore=T?"auto":"always",b.style.breakBefore=T?"auto":"page",n?b.style.boxShadow="":b.style.boxShadow="none"});const _=j[j.length-1]||null;l=_,d=_?.querySelector(".quote-body")||null,await at(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Sn(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function gi(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[o,c]=await Promise.all([si(),ai()]),r=typeof window<"u"&&window.devicePixelRatio||1,l=wn(),d=Ea(),u=Ko();let m;u?m=1.5:d?m=Math.min(1.7,Math.max(1.2,r*1.1)):l?m=Math.min(1.8,Math.max(1.25,r*1.2)):m=Math.min(2,Math.max(1.6,r*1.4));const p=u||d?.9:l?.92:.95,g=new o({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),h={scale:m,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!0,removeContainer:!1,logging:!0};let w=0;const v=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let f=0;f<s.length;f+=1){const A=s[f];await Ba(A),await at(A);const j=A.ownerDocument||document,_=j.createElement("div");Object.assign(_.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const b=A.cloneNode(!0);b.style.width=`${Je}px`,b.style.maxWidth=`${Je}px`,b.style.minWidth=`${Je}px`,b.style.height=`${et}px`,b.style.maxHeight=`${et}px`,b.style.minHeight=`${et}px`,b.style.position="relative",b.style.background="#ffffff",Sn(b),_.appendChild(b),j.body.appendChild(_);let E;try{await at(b),E=await c(b,{...h,scale:m,width:Je,height:et,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(B){throw tn(B,"pageCapture",{toastMessage:v}),B}finally{_.parentNode?.removeChild(_)}if(!E)continue;const T=E.width||1,N=(E.height||1)/T;let I=Xt,k=I*N,$=0;if(k>gt){const B=gt/k;k=gt,I=I*B,$=Math.max(0,(Xt-I)/2)}const P=E.toDataURL("image/jpeg",p);w>0&&g.addPage(),g.addImage(P,"JPEG",$,0,I,k,`page-${w+1}`,"FAST"),w+=1,await new Promise(B=>window.requestAnimationFrame(B))}}catch(f){throw nn({safariWindowRef:n,mobileWindowRef:a}),f}if(w===0)throw nn({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(d||a&&!a.closed){const f=g.output("blob"),A=URL.createObjectURL(f);d?n&&!n.closed?(n.location.href=A,n.focus?.()):window.open(A,"_blank"):a&&!a.closed&&(a.location.href=A,a.focus?.()),setTimeout(()=>URL.revokeObjectURL(A),6e4)}else g.save(t)}function qn(){if(!C||!V)return;const{previewFrame:e}=V;if(!e)return;const t=La({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(ka(s),Aa(s,a),$a(s,a));const o=n?.getElementById("quotation-pdf-root");try{o&&(await Da(o,{context:"preview"}),Sn(o))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const c=Array.from(n?.querySelectorAll?.(".quote-page")||[]),r=n?.querySelector(".quote-preview-pages"),l=Je;let d=18;if(r&&n?.defaultView){const p=n.defaultView.getComputedStyle(r),g=parseFloat(p.rowGap||p.gap||`${d}`);Number.isFinite(g)&&g>=0&&(d=g)}const u=et,m=c.length?c.length*u+Math.max(0,(c.length-1)*d):u;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(m),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${m}px`,e.style.minHeight=`${m}px`,V?.previewFrameWrapper&&!V?.userAdjustedZoom){const p=V.previewFrameWrapper.clientWidth-24;p>0&&p<l?ie=Math.max(p/l,.3):ie=1}_a(ie)},{once:!0})}function hi(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?C.sections.add(n):C.sections.delete(n),ja(),qn())}function bi(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=C.fields||(C.fields=Sa()),o=Oo(s,n);t.checked?o.add(a):o.delete(a),qn()}function vi(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(yn(C,n),C.sectionExpansions[n]=t.open)}function ja(){if(!V?.toggles||!C)return;const{toggles:e}=V,t=C.fields||{};yn(C);const n=vn.map(({id:a,labelKey:s,fallback:o})=>{const c=i(s,o),r=C.sections.has(a),l=ba[a]||[],d=Ho(C,a),u=l.length?`<div class="quote-toggle-sublist">
          ${l.map(m=>{const p=qa(t,a,m.id),g=r?"":"disabled",h=m.labelKey?i(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${m.id}" ${p?"checked":""} ${g}>
                <span>${S(h)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${a}" ${d?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${a}" ${r?"checked":""}>
            <span>${S(c)}</span>
          </label>
          ${l.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${u}
      </details>
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",hi)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",bi)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",vi)})}function yi(){if(V?.modal)return V;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${S(i("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${S(i("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${S(i("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${S(i("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-download]"),o=e.querySelector(".modal-header"),c=o?.querySelector(".btn-close"),r=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),l=document.createElement("div");l.className="quote-preview-header-actions",o&&o.insertBefore(l,c||null);const d=document.createElement("iframe");d.className="quote-preview-frame",d.setAttribute("title",i("reservations.quote.previewTitle","معاينة عرض السعر")),d.setAttribute("loading","lazy"),d.setAttribute("frameborder","0");const u=document.createElement("div");u.className="quote-preview-zoom-controls",u.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${S(i("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${S(i("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${S(i("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(d),n.innerHTML="";const p=document.createElement("div");p.className="quote-preview-scroll",p.appendChild(m),n.appendChild(p),l.appendChild(u),s?.addEventListener("click",async()=>{if(C){s.disabled=!0;try{await xi()}finally{s.disabled=!1}}});const g=()=>{Yt()||Zt(e)};r.forEach(x=>{x?.addEventListener("click",g)}),c&&!r.includes(c)&&c.addEventListener("click",g),e.addEventListener("click",x=>{Yt()||x.target===e&&Zt(e)}),V={modal:e,toggles:t,preview:n,previewFrameWrapper:m,zoomControls:u,zoomValue:u.querySelector("[data-zoom-value]"),previewFrame:d,meta:a,downloadBtn:s,userAdjustedZoom:!1};const h=u.querySelector("[data-zoom-out]"),w=u.querySelector("[data-zoom-in]"),v=u.querySelector("[data-zoom-reset]");return h?.addEventListener("click",()=>On(-.1)),w?.addEventListener("click",()=>On(.1)),v?.addEventListener("click",()=>qt(1,{markManual:!0})),qt(ie),V}function qt(e,{silent:t=!1,markManual:n=!1}={}){ie=Math.min(Math.max(e,.25),2.2),n&&V&&(V.userAdjustedZoom=!0),_a(ie),!t&&V?.zoomValue&&(V.zoomValue.textContent=`${Math.round(ie*100)}%`)}function On(e){qt(ie+e,{markManual:!0})}function _a(e){if(!V?.previewFrame||!V.previewFrameWrapper)return;const t=V.previewFrame,n=V.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",wn()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function wi(){if(!V?.meta||!C)return;const{meta:e}=V;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${S(i("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${S(C.quoteNumber)}</strong></div>
      <div><span>${S(i("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${S(C.quoteDateLabel)}</strong></div>
    </div>
  `}async function xi(){if(!C)return;const e=wn(),t=!e&&Ea(),n=e?window.open("","_blank"):null,a=t?window.open("data:text/html;charset=utf-8,"+encodeURIComponent(""),"_blank"):null;let s=null;const o=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await oi(),Mt("html2pdf ensured");const c=La({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel});s=document.createElement("div"),s.innerHTML=c,Object.assign(s.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(s),ka(s),Aa(s),$a(s),Mt("export container prepared");const r=s.firstElementChild;if(r){r.setAttribute("dir","rtl"),r.style.direction="rtl",r.style.textAlign="right",r.setAttribute("data-theme","light"),r.classList.remove("dark","dark-mode"),r.style.margin="0",r.style.padding="0",r.style.width="210mm",r.style.maxWidth="210mm",r.style.marginLeft="auto",r.style.marginRight="auto",r.scrollTop=0,r.scrollLeft=0;try{await Da(r,{context:"export"}),await at(r),Sn(r),Mt("layout complete for export document")}catch(d){tn(d,"layoutQuoteDocument",{suppressToast:!0})}}const l=`quotation-${C.quoteNumber}.pdf`;await gi(r,{filename:l,safariWindowRef:a,mobileWindowRef:n}),C.sequenceCommitted||(li(C.quoteSequence),C.sequenceCommitted=!0)}catch(c){nn({container:s,safariWindowRef:a,mobileWindowRef:n}),s=null,tn(c,"exportQuoteAsPdf",{toastMessage:o})}finally{s&&s.parentNode&&s.parentNode.removeChild(s)}}function Si(){const e=yi();e?.modal&&(ie=1,V&&(V.userAdjustedZoom=!1),qt(ie,{silent:!0}),ja(),wi(),qn(),Mo(e.modal))}async function qi({reservation:e,customer:t,project:n}){if(!e){q(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=mi(e),{totalsDisplay:s,totals:o,rentalDays:c}=pi(e,a,n),r=i("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=ci(),u=new Date;C={reservation:e,customer:t,project:n,technicians:a,totals:o,totalsDisplay:s,rentalDays:c,currencyLabel:r,sections:new Set(vn.filter(m=>m.defaultSelected).map(m=>m.id)),sectionExpansions:Ia(),fields:Sa(),quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:di(u),sequenceCommitted:!1},Si()}function Ii({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=Et(),{reservations:o=[],customers:c=[],technicians:r=[],projects:l=[]}=Q(),d=Array.isArray(s)?s:r||[],u=new Map((l||[]).map(v=>[String(v.id),v])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!o||o.length===0){m.innerHTML=`<p>${i("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||yo(),g=new Map(c.map(v=>[String(v.id),v])),h=new Map(d.map(v=>[String(v.id),v])),w=qo({reservations:o,filters:p,customersMap:g,techniciansMap:h,projectsMap:u});if(w.length===0){m.innerHTML=`<p>${i("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${Io({entries:w,customersMap:g,techniciansMap:h,projectsMap:u})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(v=>{const x=Number(v.dataset.reservationIndex);Number.isNaN(x)||v.addEventListener("click",()=>{typeof n=="function"&&n(x)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(v=>{const x=Number(v.dataset.reservationIndex);Number.isNaN(x)||v.addEventListener("click",f=>{f.stopPropagation(),typeof a=="function"&&a(x,f)})})}function Ei(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:o=[],projects:c=[]}=Q(),r=s[e];if(!r)return q(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=o.find(x=>String(x.id)===String(r.customerId)),d=r.projectId?c.find(x=>String(x.id)===String(r.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const x=Et()||[];u.innerHTML=Eo(r,l,x,e,d)}const m=document.getElementById("reservationDetailsModal"),p=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},g=document.getElementById("reservation-details-edit-btn");g&&(g.onclick=()=>{p(),typeof t=="function"&&t(e,{reservation:r,customer:l,getEditContext:a})});const h=document.getElementById("reservation-details-delete-btn");h&&(h.onclick=()=>{p(),typeof n=="function"&&n(e,{reservation:r,customer:l})});const w=u?.querySelector('[data-action="open-project"]');w&&d&&w.addEventListener("click",()=>{p();const x=d?.id!=null?String(d.id):"",f=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=f});const v=document.getElementById("reservation-details-export-btn");return v&&(v.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),v.blur();try{await qi({reservation:r,customer:l,project:d})}catch(f){console.error("❌ [reservations] export to PDF failed",f),q(i("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function $t(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:tt(e,n),end:tt(t,a)}}function Le(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=i("reservations.create.equipment.none","لا توجد معدات"),a=i("reservations.create.summary.currency","SR"),s=i("reservations.create.equipment.imageAlt","صورة"),o=i("reservations.equipment.actions.increase","زيادة الكمية"),c=i("reservations.equipment.actions.decrease","تقليل الكمية"),r=i("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Hn(t);return}const l=Ce(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},m=Be(u)||d.image,p=m?`<img src="${m}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',g=y(String(d.count)),h=Number.isFinite(Number(d.unitPrice))?Number(d.unitPrice):0,w=Number.isFinite(Number(d.totalPrice))?Number(d.totalPrice):h*d.count,v=`${y(h.toFixed(2))} ${a}`,x=`${y(w.toFixed(2))} ${a}`,f=d.barcodes.map(j=>y(String(j||""))).filter(Boolean),A=f.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${f.map(j=>`<li>${j}</li>`).join("")}
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
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${c}">−</button>
              <span class="reservation-qty-value">${g}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${o}">+</button>
            </div>
          </td>
          <td>${v}</td>
          <td>${x}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${r}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Hn(t)}function ki(e){const{index:t,items:n}=De(),s=Ce(n).find(r=>r.key===e);if(!s)return;const o=s.itemIndices[s.itemIndices.length-1];if(o==null)return;const c=n.filter((r,l)=>l!==o);je(t,c),Le(c),me()}function Ai(e){const{index:t,items:n}=De(),a=n.filter(s=>kt(s)!==e);a.length!==n.length&&(je(t,a),Le(a),me())}function $i(e){const{index:t,items:n}=De(),s=Ce(n).find(v=>v.key===e);if(!s)return;const{start:o,end:c}=$t();if(!o||!c){q(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:r=[]}=Q(),l=t!=null&&r[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(v=>U(v.barcode))),{equipment:m=[]}=Q(),p=(m||[]).find(v=>{const x=U(v?.barcode);return!x||u.has(x)||kt({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!aa(v)?!1:!xe(x,o,c,d)});if(!p){q(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const g=U(p.barcode),h=ze(p);if(!h){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const w=[...n,{id:h,equipmentId:h,barcode:g,desc:p.desc||p.description||p.name||s.description||"",qty:1,price:Number.isFinite(Number(p.price))?Number(p.price):s.unitPrice,image:Be(p)}];je(t,w),Le(w),me()}function Hn(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:o}=n.dataset;if(a==="decrease-edit-group"&&s){ki(s);return}if(a==="increase-edit-group"&&s){$i(s);return}if(a==="remove-edit-group"&&s){Ai(s);return}if(a==="remove-edit-item"){const c=Number(o);Number.isNaN(c)||Ci(c)}}),e.dataset.groupListenerAttached="true")}function me(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",me),a.dataset.listenerAttached="true"),Re(a);const s=y(t?.value||"0");t&&(t.value=s);const o=parseFloat(s)||0,c=n?.value||"percent",r=!!document.getElementById("edit-res-project")?.value,l=document.getElementById("edit-res-tax"),d=r?!1:l?.checked||!1,u=a?.value||"unpaid";Re(a,u),d&&ue("edit-res-company-share");let m=nt("edit-res-company-share");d&&(!Number.isFinite(m)||m<=0)&&(ue("edit-res-company-share"),m=nt("edit-res-company-share"));const{items:p=[]}=De(),{start:g,end:h}=$t();e.innerHTML=Ms({items:p,discount:o,discountType:c,applyTax:d,paidStatus:u,start:g,end:h,companySharePercent:m})}function Ci(e){if(e==null)return;const{index:t,items:n}=De();if(!Array.isArray(n))return;const a=n.filter((s,o)=>o!==e);je(t,a),Le(a),me()}function Ti(e){const t=e?.value??"",n=U(t);if(!n)return;const a=At(n);if(!a){q(i("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Se(a);if(s!=="available"){q(Oe(s));return}const o=U(n),{index:c,items:r=[]}=De();if(r.findIndex(v=>U(v.barcode)===o)>-1){q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=$t();if(!d||!u){q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:m=[]}=Q(),p=c!=null&&m[c]||null,g=p?.id??p?.reservationId??null;if(xe(o,d,u,g)){q(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const h=ze(a);if(!h){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const w=[...r,{id:h,equipmentId:h,barcode:o,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];je(c,w),e&&(e.value=""),Le(w),me()}function It(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=da(t),a=U(n?.barcode||t);if(!n||!a){q(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Se(n);if(s!=="available"){q(Oe(s));return}const{start:o,end:c}=$t();if(!o||!c){q(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:r,items:l=[]}=De();if(l.some(w=>U(w.barcode)===a)){q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=Q(),m=r!=null&&u[r]||null,p=m?.id??m?.reservationId??null;if(xe(a,o,c,p)){q(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const g=ze(n);if(!g){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const h=[...l,{id:g,equipmentId:g,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];je(r,h),Le(h),me(),e.value=""}function Pa(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),It(e))});const t=()=>{ua(e.value,"edit-res-equipment-description-options")&&It(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{me()});function Bi(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Gt(e);return}It(e)}}function Oi(){He(),Pa()}function Li(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let st=null,de=[],an=null,te={},zt=!1;function sn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),o=!!e;if(n&&(n.value=o?"true":"false"),a){const c=a.dataset.confirmLabel||"✅ تم التأكيد",r=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=o?c:r,a.dataset.state=o?"confirmed":"pending",a.classList.toggle("btn-success",o&&!t),a.classList.toggle("btn-outline-secondary",!o||t),a.disabled=t,a.setAttribute("aria-pressed",o?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function on(){return document.getElementById("edit-res-confirmed")?.value==="true"}function De(){return{index:st,items:de}}function je(e,t){st=typeof e=="number"?e:null,de=Array.isArray(t)?[...t]:[]}function Na(){st=null,de=[],Us()}function Di(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Ye(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ji(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),o=t?.projectId?String(t.projectId):"",c=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],r=[`<option value="">${Ye(a)}</option>`];c.forEach(l=>{r.push(`<option value="${Ye(l.id)}">${Ye(l.title||a)}</option>`)}),o&&!c.some(l=>String(l.id)===o)&&r.push(`<option value="${Ye(o)}">${Ye(s)}</option>`),n.innerHTML=r.join(""),o?n.value=o:n.value=""}function Fa(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&n.checked&&(n.checked=!1);else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1)}rn("tax")}function rn(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const o=te?.updateEditReservationSummary;typeof o=="function"&&o()};if(zt){a();return}zt=!0;const s=()=>{zt=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(oe)),t.disabled){n.checked=!1,q(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),ue("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ue("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function Vn(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:o,ensureModal:c}={}){const{customers:r,projects:l}=Q(),u=ta()?.[e];if(!u){q(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}te={...te,reservation:u,projects:l||[]},t?.(),ji(l||[],u);const m=u.projectId&&l?.find?.($=>String($.id)===String(u.projectId))||null,{effectiveConfirmed:p,projectLinked:g}=Te(u,m),h=u.items?u.items.map($=>({...$,equipmentId:$.equipmentId??$.equipment_id??$.id,barcode:U($?.barcode)})):[];je(e,h);const w=i("reservations.list.unknownCustomer","غير معروف"),v=r?.find?.($=>String($.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const f=document.getElementById("edit-res-customer");f&&(f.value=v?.customerName||w);const A=typeof a=="function"?a(u.start):{date:"",time:""},j=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",A.date),n?.("edit-res-start-time",A.time),n?.("edit-res-end",j.date),n?.("edit-res-end-time",j.time);const _=document.getElementById("edit-res-notes");_&&(_.value=u.notes||"");const b=document.getElementById("edit-res-discount");b&&(b.value=y(u.discount??0));const E=document.getElementById("edit-res-discount-type");E&&(E.value=u.discountType||"percent");const T=u.projectId?!1:!!u.applyTax,z=document.getElementById("edit-res-tax");z&&(z.checked=T);const N=document.getElementById("edit-res-company-share");if(N){const $=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,P=$!=null?Number.parseFloat(y(String($).replace("%","").trim())):NaN,B=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,F=B!=null?B===!0||B===1||B==="1"||String(B).toLowerCase()==="true":Number.isFinite(P)&&P>0,L=F&&Number.isFinite(P)&&P>0?P:oe,O=T||F;N.checked=O,N.dataset.companyShare=String(L)}sn(p,{disable:g});const I=document.getElementById("edit-res-paid");I&&(I.value=u.paid===!0||u.paid==="paid"?"paid":"unpaid"),zs((u.technicians||[]).map($=>String($))),s?.(h),Fa(),o?.();const k=document.getElementById("editReservationModal");an=Di(k,c),an?.show?.()}async function _i({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:o,handleReservationsMutation:c}={}){if(st===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const r=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",p=y(document.getElementById("edit-res-discount")?.value||"0"),g=parseFloat(p)||0,h=document.getElementById("edit-res-discount-type")?.value||"percent",w=on(),v=document.getElementById("edit-res-paid")?.value||"unpaid",x=document.getElementById("edit-res-project")?.value||"",f=Os(),A=document.getElementById("edit-res-company-share");let j=null;if(A&&A.checked){const R=A.dataset.companyShare??A.value??oe,W=Number.parseFloat(y(String(R).replace("%","").trim()));j=Number.isFinite(W)&&W>0?W:oe}const _=Number.isFinite(j)&&j>0;if(!r||!d){q(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const b=typeof e=="function"?e:(R,W)=>`${R}T${W||"00:00"}`,E=b(r,l),T=b(d,u);if(E&&T&&new Date(E)>new Date(T)){q(i("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const N=ta()?.[st];if(!N){q(i("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(de)||de.length===0&&f.length===0){q(i("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const R of de){const W=Se(R.barcode);if(W!=="available"){q(Oe(W));return}}const I=typeof t=="function"?t:()=>!1;for(const R of de){const W=U(R.barcode);if(I(W,E,T,N.id??N.reservationId)){q(i("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const k=typeof n=="function"?n:()=>!1;for(const R of f)if(k(R,E,T,N.id??N.reservationId)){q(i("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const $=document.getElementById("edit-res-tax"),P=Array.isArray(te.projects)&&te.projects.length?te.projects:Q().projects||[],B=x&&P.find(R=>String(R.id)===String(x))||null,F={...N,projectId:x?String(x):null,confirmed:w},{effectiveConfirmed:L,projectLinked:O,projectStatus:J}=Te(F,B),G=O?!1:$?.checked||!1,ae=Gn(de,g,h,G,f,{start:E,end:T});let Y=N.status??"pending";O?Y=B?.status??J??Y:["completed","cancelled"].includes(String(Y).toLowerCase())||(Y=w?"confirmed":"pending");const pe=Wn({reservationCode:N.reservationCode??N.reservationId??null,customerId:N.customerId,start:E,end:T,status:Y,title:N.title??null,location:N.location??null,notes:m,projectId:x?String(x):null,totalAmount:ae,discount:g,discountType:h,applyTax:G,paidStatus:v,confirmed:L,items:de.map(R=>({...R,equipmentId:R.equipmentId??R.id})),technicians:f,companySharePercent:_?j:null,companyShareEnabled:_});try{const R=await Hs(N.id||N.reservationId,pe);await Vs(),q(i("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),Na(),c?.({type:"updated",reservation:R}),s?.(),o?.(),an?.hide?.()}catch(R){console.error("❌ [reservationsEdit] Failed to update reservation",R);const W=Xn(R)?R.message:i("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");q(W,"error")}}function Hi(e={}){te={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=te,o=document.getElementById("edit-res-discount");o&&!o.dataset.listenerAttached&&(o.addEventListener("input",()=>{o.value=y(o.value),t?.()}),o.dataset.listenerAttached="true");const c=document.getElementById("edit-res-discount-type");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>t?.()),c.dataset.listenerAttached="true");const r=document.getElementById("edit-res-tax");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{rn("tax")}),r.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{rn("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-project");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{Fa();const h=Array.isArray(te.projects)&&te.projects.length?te.projects:Q().projects||[],w=d.value&&h.find(j=>String(j.id)===String(d.value))||null,x={...te?.reservation??{},projectId:d.value||null,confirmed:on()},{effectiveConfirmed:f,projectLinked:A}=Te(x,w);sn(f,{disable:A}),t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-confirmed-btn");u&&!u.dataset.listenerAttached&&(u.addEventListener("click",()=>{if(u.disabled)return;const h=!on();sn(h),t?.()}),u.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{_i(te).catch(h=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",h)})}),m.dataset.listenerAttached="true");const p=document.getElementById("edit-res-equipment-barcode");if(p&&!p.dataset.listenerAttached){let h=null;const w=()=>{p.value?.trim()&&(clearTimeout(h),h=null,n?.(p))};p.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),w())});const v=()=>{if(clearTimeout(h),!p.value?.trim())return;const{start:x,end:f}=getEditReservationDateRange();!x||!f||(h=setTimeout(()=>{w()},150))};p.addEventListener("input",v),p.addEventListener("change",w),p.dataset.listenerAttached="true"}Pa?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{Na(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}function Vi(){return Ws().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=Q()||{};Ks(e||[]),ma()})}function In(e=null){ma(),Ra(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Pi(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function cn(){return{populateEquipmentDescriptionLists:He,setFlatpickrValue:Li,splitDateTime:Kn,renderEditItems:Le,updateEditReservationSummary:me,addEquipmentByDescription:Bi,addEquipmentToEditingReservation:Ti,addEquipmentToEditingByDescription:It,combineDateTime:tt,hasEquipmentConflict:xe,hasTechnicianConflict:Qn,renderReservations:Ra,handleReservationsMutation:In,ensureModal:Pi}}function Ra(e="reservations-list",t=null){Ii({containerId:e,filters:t,onShowDetails:Ma,onConfirmReservation:Oa})}function Ma(e){return Ei(e,{getEditContext:cn,onEdit:(t,{reservation:n})=>{Ha(t,n)},onDelete:za})}function za(e){return Un()?window.confirm(i("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Qs(e,{onAfterChange:In}):!1:(Ls(),!1)}function Oa(e){return Gs(e,{onAfterChange:In})}function Ha(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",o)}Vn(e,cn());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",o)}Vn(e,cn());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const o=t.id??t.reservationId;n.set("reservationEditId",String(o));try{localStorage.setItem("pendingReservationEditId",String(o)),localStorage.removeItem("pendingReservationEditIndex")}catch(c){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",c)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(o){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",o)}}Ds({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(o=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",o)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Ui(){typeof window>"u"||(window.showReservationDetails=Ma,window.deleteReservation=za,window.confirmReservation=Oa,window.editReservation=Ha)}export{pa as a,Eo as b,Ui as c,zi as d,Hi as e,Oi as f,ma as g,cn as h,Mi as i,K as j,In as k,Vi as l,Ra as r,Ma as s,me as u};
