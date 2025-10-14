import{d as W,t as i,n as y,h as S,z as Bs,k as Re,j as Un,o as Ls,u as Ds}from"./auth.js";import{n as K,l as ln,o as js,p as tt,D as me,q as Kn,t as _s,v as xe,w as Se,x as dn,y as Ps,z as Ns,A as Qn,h as Gn,B as Wn,C as Fs,s as Et,i as Xn,E as Yn,F as Rs,G as Zn,H as Jn,f as ea,I as Ms,g as ta,J as zs,K as Os,u as Hs,a as Vs,L as Us,k as Ks}from"./reservationsService.js";import{n as ae,s as na,p as Te,q as Oe,t as kt,i as un,r as Be,v as Qs,w as Gs,g as Ws}from"./projectsService.js";const Xs=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Ys=new Set(["maintenance","reserved","retired"]);function Zs(e){const t=String(e??"").trim().toLowerCase();return t&&Xs.get(t)||"available"}function Js(e){return e?typeof e=="object"?e:At(e):null}function qe(e){const t=Js(e);return t?Zs(t.status||t.state||t.statusLabel||t.status_label):"available"}function aa(e){return!Ys.has(qe(e))}function Le(e={}){return e.image||e.imageUrl||e.img||""}function eo(e){if(!e)return null;const t=K(e),{equipment:n=[]}=W();return(n||[]).find(a=>K(a?.barcode)===t)||null}function At(e){const t=K(e);if(!t)return null;const{equipment:n=[]}=W();return(n||[]).find(a=>K(a?.barcode)===t)||null}let Ot=null,sa=[],Ht=new Map,Vt=new Map,ht=new Map,Rt=!1;function bt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function vt(e){return y(String(e||"")).trim().toLowerCase()}function to(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=y(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function oa(e){const t=y(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function He(e){switch(e){case"maintenance":return i("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return i("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return i("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return i("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function mn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function pn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function ia(e,t,{allowPartial:n=!1}={}){const a=ae(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const o=[];return e.forEach((c,r)=>{r.includes(a)&&o.push(c)}),o.length===1?o[0]:null}function Ut(e,t={}){return ia(Ht,e,t)}function Kt(e,t={}){return ia(Vt,e,t)}function Me(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function ra(e){sa=Array.isArray(e)?[...e]:[]}function fn(){return sa}function gn(e){return e&&fn().find(t=>String(t.id)===String(e))||null}function Ln(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||i("projects.fallback.untitled","مشروع بدون اسم")}function nt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??me,a=y(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:me}function ie(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??me,a=y(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=me),t.dataset.companyShare=String(s),t.checked=!0}function Qt(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Rt){Q();return}Rt=!0;const a=()=>{Rt=!1,Q()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(me)),t.disabled){n.checked=!1,S(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),ie()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ie():n.checked&&(n.checked=!1));a()}function no(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Dn(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function jn(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function we({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=mn();if(!n||!a||!s)return;const o=ln()||[],c=i("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),r=i("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",c);const l=new Set;Ht=new Map;const d=o.filter(g=>g&&g.id!=null).map(g=>({id:String(g.id),label:jn(g)||r})).filter(g=>{if(!g.label)return!1;const h=ae(g.label);return!h||l.has(h)?!1:(l.add(h),Ht.set(h,g),!0)}).sort((g,h)=>g.label.localeCompare(h.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(g=>`<option value="${bt(g.label)}"></option>`).join("");const u=t?"":n.value,m=e?String(e):a.value?String(a.value):"",p=m?o.find(g=>String(g.id)===m):null;if(p){const g=jn(p)||r;a.value=String(p.id),n.value=g,n.dataset.selectedId=String(p.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function ot({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:o}=pn();if(!a||!s||!o)return;const c=Array.isArray(t)?t:fn()||[],r=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",r);const l=[...c].filter(w=>w&&w.id!=null).sort((w,v)=>String(v.createdAt||v.start||"").localeCompare(String(w.createdAt||w.start||""))),d=n?"":a.value,u=i("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;Vt=new Map;const p=l.map(w=>{const v=Ln(w)||u;return{id:String(w.id),label:v}}).filter(w=>{if(!w.label)return!1;const v=ae(w.label);return!v||m.has(v)?!1:(m.add(v),Vt.set(v,w),!0)});o.innerHTML=p.map(w=>`<option value="${bt(w.label)}"></option>`).join("");const g=e?String(e):s.value?String(s.value):"",h=g?l.find(w=>String(w.id)===g):null;if(h){const w=Ln(h)||u;s.value=String(h.id),a.value=w,a.dataset.selectedId=String(h.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function yt(e,t,n){const{date:a,time:s}=Kn(n),o=document.getElementById(e),c=document.getElementById(t);if(o){if(a)if(o._flatpickr){const r=o._flatpickr.config?.dateFormat||"Y-m-d";o._flatpickr.setDate(a,!1,r)}else o.value=a;else o._flatpickr?o._flatpickr.clear():o.value="";o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0}))}if(c){if(s)if(c._flatpickr){const r=c._flatpickr.config?.dateFormat||"H:i";c._flatpickr.setDate(s,!1,r)}else c.value=s;else c._flatpickr?c._flatpickr.clear():c.value="";c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))}}function ca(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||ot({selectedValue:a});const o=(ln()||[]).find(u=>String(u.id)===String(e.clientId)),c=o?.id!=null?String(o.id):"";we(c?{selectedValue:c}:{selectedValue:"",resetInput:!0});const r=Dn(e,"start"),l=Dn(e,"end");r&&yt("res-start","res-start-time",r),l&&yt("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),ze(),Q()}function la({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:W(),s=Array.isArray(a)?a:[];ra(s);const o=t!=null?String(t):n.value?String(n.value):"";ot({selectedValue:o,projectsList:s}),ze(),Q()}function ze(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled"));else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1),n&&(n.disabled=!1,n.classList.remove("disabled"))}Qt("tax")}function hn(){const{input:e,hidden:t}=pn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),o=s?Kt(s,{allowPartial:a}):null;if(o){t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id);const c=gn(o.id);c?ca(c,{skipProjectSelectUpdate:!0}):(ze(),Q())}else t.value="",e.dataset.selectedId="",ze(),Q()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Kt(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function bn(){const{input:e,hidden:t}=mn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),o=s?Ut(s,{allowPartial:a}):null;o?(t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id)):(t.value="",e.dataset.selectedId=""),Q()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ut(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ao(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const r=decodeURIComponent(t);n=JSON.parse(r)}catch(r){console.warn("⚠️ [reservations/createForm] Failed to decode project context",r)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),!n||!n.projectId)return;document.getElementById("res-project")&&(ot({selectedValue:String(n.projectId)}),ze());const c=gn(n.projectId);if(c?ca(c,{forceNotes:!!n.forceNotes}):Q(),n.start&&yt("res-start","res-start-time",n.start),n.end&&yt("res-end","res-end-time",n.end),n.customerId){const l=(ln()||[]).find(d=>String(d.id)===String(n.customerId));l?.id!=null&&we({selectedValue:String(l.id)})}else we({selectedValue:""})}function it(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:tt(e,n),end:tt(t,a)}}function da(e){const t=vt(e);if(t){const r=ht.get(t);if(r)return r}const{description:n,barcode:a}=oa(e);if(a){const r=At(a);if(r)return r}const s=ae(n||e);if(!s)return null;let o=Yn();if(!o?.length){const r=W();o=Array.isArray(r?.equipment)?r.equipment:[],o.length&&Jn(o)}const c=o.find(r=>ae(r?.desc||r?.description||"")===s);return c||o.find(r=>ae(r?.desc||r?.description||"").includes(s))||null}function ua(e,t="equipment-description-options"){const n=vt(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>vt(l.value)===n)||ht.has(n))return!0;const{description:s}=oa(e);if(!s)return!1;const o=ae(s);return o?(Yn()||[]).some(r=>ae(r?.desc||r?.description||"")===o):!1}const so={available:0,reserved:1,maintenance:2,retired:3};function oo(e){return so[e]??5}function _n(e){switch(e){case"available":return i("reservations.equipment.status.available","متاح");case"reserved":return i("reservations.equipment.status.reserved","محجوز");case"maintenance":return i("reservations.equipment.status.maintenance","صيانة");case"retired":return i("reservations.equipment.status.retired","خارج الخدمة");default:return i("reservations.equipment.status.unknown","الحالة غير معروفة")}}function io(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${_n(n)}`;const a=i("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${_n(n)})`}function Ve(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=na(),a=W(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],o=Array.isArray(s)?s:[];Jn(o);const c=new Map;o.forEach(d=>{const u=to(d),m=vt(u);if(!m||!u)return;const p=qe(d),g=oo(p),h=c.get(m);if(!h){c.set(m,{normalized:m,value:u,bestItem:d,bestStatus:p,bestPriority:g,statuses:new Set([p])});return}h.statuses.add(p),g<h.bestPriority&&(h.bestItem=d,h.bestStatus=p,h.bestPriority=g,h.value=u)}),ht=new Map;const l=Array.from(c.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{ht.set(d.normalized,d.bestItem);const u=io(d),m=bt(d.value);if(u===d.value)return`<option value="${m}"></option>`;const p=bt(u);return`<option value="${m}" label="${p}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function ro(e,t){const n=K(e);if(!n)return!1;const{start:a,end:s}=it();if(!a||!s)return S(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(xe().some(d=>K(d.barcode)===n))return S(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(Se(n,a,s))return S(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const c=At(n);if(!c)return S(i("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1;const r=qe(c);if(r!=="available")return S(He(r)),!1;const l=Oe(c);return l?(dn({id:l,equipmentId:l,barcode:n,desc:c.desc,qty:1,price:c.price,image:Le(c)}),t&&(t.value=""),Ie(),Q(),S(i("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(S(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")),!1)}function Gt(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=da(t);if(!n){S(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=eo(n.barcode),s=qe(a||n);if(s!=="available"){S(He(s));return}const o=K(n.barcode);if(!o){S(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c=Oe(n);if(!c){S(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r={id:c,equipmentId:c,barcode:o,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Le(n)},{start:l,end:d}=it();if(!l||!d){S(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(xe().some(p=>K(p.barcode)===o)){S(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(Se(o,l,d)){S(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}dn(r),Ie(),Q(),e.value=""}function co(){Ve();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Gt(e))});const t=()=>{ua(e.value,"equipment-description-options")&&Gt(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Ie(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=xe(),a=i("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=i("reservations.create.summary.currency","SR"),o=i("reservations.create.equipment.imageAlt","صورة"),c=i("reservations.equipment.actions.increase","زيادة الكمية"),r=i("reservations.equipment.actions.decrease","تقليل الكمية"),l=i("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=Te(n);t.innerHTML=d.map(u=>{const m=u.items[0]||{},p=Le(m)||u.image,g=p?`<img src="${p}" alt="${o}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',h=y(String(u.count)),w=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):w*u.count,x=`${y(w.toFixed(2))} ${s}`,f=`${y(v.toFixed(2))} ${s}`,$=u.barcodes.map(T=>y(String(T||""))).filter(Boolean),_=$.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${$.map(T=>`<li>${T}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${g}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${_}
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
      `}).join("")}function lo(e){const t=xe(),a=Te(t).find(o=>o.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Ps(s),Ie(),Q())}function uo(e){const t=xe(),n=t.filter(a=>kt(a)!==e);n.length!==t.length&&(Zn(n),Ie(),Q())}function mo(e){const t=xe(),a=Te(t).find(m=>m.key===e);if(!a)return;const{start:s,end:o}=it();if(!s||!o){S(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const c=new Set(t.map(m=>K(m.barcode))),{equipment:r=[]}=W(),l=(r||[]).find(m=>{const p=K(m?.barcode);return!p||c.has(p)||kt({desc:m?.desc||m?.description||m?.name||"",price:Number(m?.price)||0})!==e||!aa(m)?!1:!Se(p,s,o)});if(!l){S(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=K(l.barcode),u=Oe(l);if(!u){S(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}dn({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:Le(l)}),Ie(),Q()}function Q(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(y(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),o=a?!1:s?.checked||!1,c=document.getElementById("res-payment-status")?.value||"unpaid",{start:r,end:l}=it();o&&ie();const d=nt(),u=document.getElementById("res-payment-status");Me(u,c),js({selectedItems:xe(),discount:t,discountType:n,applyTax:o,paidStatus:c,start:r,end:l,companySharePercent:d})}function po(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",o=>{o.target.value=y(o.target.value),Q()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",Q),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{Qt("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{Qt("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{Me(s),Q()}),s.dataset.listenerAttached="true"),Me(s)}function fo(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){Q();return}const o=t.dataset.syncedWithStart;(!t.value?.trim()||o!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),Q()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Pn(){const{input:e,hidden:t}=mn(),{input:n,hidden:a}=pn(),{customers:s}=W();let o=t?.value?String(t.value):"";if(!o&&e?.value){const j=Ut(e.value,{allowPartial:!0});j&&(o=String(j.id),t&&(t.value=o),e.value=j.label,e.dataset.selectedId=o)}const c=s.find(j=>String(j.id)===o);if(!c){S(i("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const r=c.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const j=Kt(n.value,{allowPartial:!0});j&&(l=String(j.id),a&&(a.value=l),n.value=j.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",p=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){S(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const g=`${d}T${m}`,h=`${u}T${p}`,w=new Date(g),v=new Date(h);if(Number.isNaN(w.getTime())||Number.isNaN(v.getTime())||w>=v){S(i("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const x=Ns(),f=xe();if(f.length===0&&x.length===0){S(i("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const $=document.getElementById("res-notes")?.value||"",_=parseFloat(y(document.getElementById("res-discount")?.value))||0,T=document.getElementById("res-discount-type")?.value||"percent",b=document.getElementById("res-payment-status")?.value||"unpaid",k=l?gn(l):null,P=no(k);if(l&&!k){S(i("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const j of f){const M=qe(j.barcode);if(M!=="available"){S(He(M));return}}for(const j of f){const M=K(j.barcode);if(Se(M,g,h)){S(i("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const j of x)if(Qn(j,g,h)){S(i("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const N=document.getElementById("res-tax"),V=document.getElementById("res-company-share"),A=!!l,q=A?!1:N?.checked||!1,L=Gn(f,_,T,q,x,{start:g,end:h});q&&ie();const D=!!V?.checked;if(!A&&D!==q){S(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let E=D?nt():null;D&&(!Number.isFinite(E)||E<=0)&&(ie(),E=nt());const F=D&&q&&Number.isFinite(E)&&E>0,G=Bs(),z=Wn({reservationCode:G,customerId:r,start:g,end:h,status:P?"confirmed":"pending",title:null,location:null,notes:$,projectId:l||null,totalAmount:L,discount:_,discountType:T,applyTax:q,paidStatus:b,confirmed:P,items:f.map(j=>({...j,equipmentId:j.equipmentId??j.id})),technicians:x,companySharePercent:F?E:null,companyShareEnabled:F});try{const j=await Fs(z);na(),Ve(),Et(),go(),S(i("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ot=="function"&&Ot({type:"created",reservation:j})}catch(j){console.error("❌ [reservations/createForm] Failed to create reservation",j);const M=Xn(j)?j.message:i("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");S(M,"error")}}function go(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),we({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),o=document.getElementById("res-project-input");s&&(s.value=""),o&&(o.value="",o.dataset.selectedId=""),ot({selectedValue:"",resetInput:!0});const c=document.getElementById("equipment-description");c&&(c.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Me(r,"unpaid")),Rs(),Zn([]),Ie(),ze(),Q()}function ho(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){lo(s);return}if(a==="increase-group"&&s){mo(s);return}if(a==="remove-group"&&s){uo(s);return}}),e.dataset.listenerAttached="true")}function bo(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{const s=e.value;s?.trim()&&(clearTimeout(t),t=null,ro(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim())return;const{start:o,end:c}=it();!o||!c||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function vo(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Pn()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Pn()}),t.dataset.listenerAttached="true")}function Mi({onAfterSubmit:e}={}){Ot=typeof e=="function"?e:null;const{customers:t,projects:n}=W();_s(t||[]),we(),bn(),ra(n||[]),la({projectsList:n}),hn(),Ve(),co(),fo(),po(),ho(),bo(),vo(),ao(),Q(),Ie()}function ma(){Ve(),la(),we(),bn(),hn(),Ie(),Q()}if(typeof document<"u"){const e=()=>{we(),ot({projectsList:fn()}),bn(),hn(),Q()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function pa(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Ce(t),endDate:Ce(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const o=new Date(n);return o.setDate(n.getDate()+6),{startDate:Ce(n),endDate:Ce(o)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Ce(n),endDate:Ce(a)}}return e==="upcoming"?{startDate:Ce(t),endDate:""}:{startDate:"",endDate:""}}function yo(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let o=y(t?.value||"").trim(),c=y(n?.value||"").trim(),r=a?.value||"";if(new Set(["","today","week","month"]).has(r)||(r="",a&&(a.value=""),wt(t),wt(n),o="",c=""),!o&&!c&&r){const d=pa(r);o=d.startDate,c=d.endDate}return{searchTerm:ae(e?.value||""),startDate:o,endDate:c,status:s?.value||"",quickRange:r}}function zi(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=y(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const o=document.getElementById("reservation-date-range");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>{wo(o.value),t()}),o.dataset.listenerAttached="true");const c=document.getElementById("reservation-status-filter");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",t),c.dataset.listenerAttached="true");const r=document.getElementById("clear-filters");r&&!r.dataset.listenerAttached&&(r.addEventListener("click",()=>{n&&(n.value=""),wt(a),wt(s),o&&(o.value=""),c&&(c.value=""),t()}),r.dataset.listenerAttached="true")}function wo(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=pa(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Ce(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function wt(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function mt(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function xo(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function So(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=xo(n);if(a!==null)return a}return null}function Nn(e,t=0){const n=So(e);if(n!=null)return n;const a=mt(e.createdAt??e.created_at);if(a!=null)return a;const s=mt(e.updatedAt??e.updated_at);if(s!=null)return s;const o=mt(e.start);if(o!=null)return o;const c=mt(e.end);if(c!=null)return c;const r=Number(e.id??e.reservationId);return Number.isFinite(r)?r:Number.isFinite(t)?t:0}function qo({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const o=e.map((f,$)=>({reservation:f,index:$})),c=t.searchTerm||"",r=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",m=t.endDate||"",p=t.status||"",g=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,h=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,w=u?new Date(`${u}T00:00:00`):null,v=m?new Date(`${m}T23:59:59`):null,x=o.filter(({reservation:f})=>{const $=n.get(String(f.customerId)),_=s?.get?.(String(f.projectId)),T=f.start?new Date(f.start):null,b=un(f),{effectiveConfirmed:k}=Be(f,_);if(g!=null&&String(f.customerId)!==String(g)||h!=null&&!(Array.isArray(f.technicians)?f.technicians.map(q=>String(q)):[]).includes(String(h))||p==="confirmed"&&!k||p==="pending"&&k||p==="completed"&&!b||w&&T&&T<w||v&&T&&T>v)return!1;if(r){const A=[f.reservationId,f.id,f.reservation_id,f.reservationCode,f.reservation_code,f.code,f.reference,f.referenceNumber,f.reference_number],q=ae(A.filter(D=>D!=null&&D!=="").map(String).join(" ")).replace(/\s+/g,""),L=r.replace(/\s+/g,"");if(!q.includes(L))return!1}if(l&&!ae($?.customerName||"").includes(l))return!1;if(d){const A=[f.projectId,f.project_id,f.projectID,_?.id,_?.projectCode,_?.project_code],q=ae(A.filter(D=>D!=null&&D!=="").map(String).join(" ")).replace(/\s+/g,""),L=d.replace(/\s+/g,"");if(!q.includes(L))return!1}if(!c)return!0;const P=f.items?.map?.(A=>`${A.barcode} ${A.desc}`).join(" ")||"",N=(f.technicians||[]).map(A=>a.get(String(A))?.name).filter(Boolean).join(" ");return ae([f.reservationId,$?.customerName,f.notes,P,N,_?.title].filter(Boolean).join(" ")).includes(c)});return x.sort((f,$)=>{const _=Nn(f.reservation,f.index),T=Nn($.reservation,$.index);return _!==T?T-_:$.index-f.index}),x}function Io({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=i("reservations.create.summary.currency","SR"),o=i("reservations.list.taxIncludedShort","(شامل الضريبة)"),c=i("reservations.list.unknownCustomer","غير معروف"),r=i("reservations.list.noNotes","لا توجد ملاحظات"),l=i("reservations.list.itemsCountShort","{count} عنصر"),d=i("reservations.list.crew.separator","، "),u=i("reservations.list.status.confirmed","✅ مؤكد"),m=i("reservations.list.status.pending","⏳ غير مؤكد"),p=i("reservations.list.payment.paid","💳 مدفوع"),g=i("reservations.list.payment.unpaid","💳 غير مدفوع"),h=i("reservations.list.actions.confirm","✔️ تأكيد"),w=i("reservations.list.project.unlinked","غير مرتبط بمشروع"),v=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),x={client:i("reservations.list.labels.client","👤 العميل"),project:i("reservations.list.labels.project","📁 المشروع"),start:i("reservations.list.labels.start","🗓️ بداية الحجز"),end:i("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:i("reservations.list.labels.cost","💵 التكلفة"),equipment:i("reservations.list.labels.equipment","📦 المعدات"),crew:i("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:f,index:$})=>{const _=t.get(String(f.customerId)),T=f.projectId?a?.get?.(String(f.projectId)):null,b=un(f),k=f.paid===!0||f.paid==="paid",{effectiveConfirmed:P,projectLinked:N}=Be(f,T),V=P?"status-confirmed":"status-pending",A=k?"status-paid":"status-unpaid";let q=`<span class="reservation-chip status-chip ${V}">${P?u:m}</span>`,L=`<span class="reservation-chip status-chip ${A}">${k?p:g}</span>`,D=k?" tile-paid":" tile-unpaid";b&&(D+=" tile-completed");let E="";b&&(q=`<span class="reservation-chip status-chip status-completed">${u}</span>`,L=`<span class="reservation-chip status-chip status-completed">${k?p:g}</span>`,E=` data-completed-label="${i("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const F=!N&&!P?`<button class="tile-confirm" data-reservation-index="${$}" data-action="confirm">${h}</button>`:"",G=F?`<div class="tile-actions">${F}</div>`:"",z=f.items?.length||0,j=(f.technicians||[]).map(ce=>n.get(String(ce))).filter(Boolean),M=j.map(ce=>ce.name).join(d)||"—",ee=y(String(f.reservationId??"")),se=f.start?y(Re(f.start)):"-",fe=f.end?y(Re(f.end)):"-",X=y(String(f.cost??0)),ge=y(String(z)),H=f.notes?y(f.notes):r,Y=l.replace("{count}",ge),Ue=f.applyTax?`<small>${o}</small>`:"";let Ee=w;return f.projectId&&(Ee=T?.title?y(T.title):v),`
      <div class="${F?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${D}"${E} data-reservation-index="${$}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ee}</div>
          <div class="tile-badges">
            ${q}
            ${L}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${x.client}</span>
            <span class="tile-value">${_?.customerName||c}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.project}</span>
            <span class="tile-value">${Ee}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.start}</span>
            <span class="tile-value tile-inline">${se}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.end}</span>
            <span class="tile-value tile-inline">${fe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.cost}</span>
            <span class="tile-value">${X} ${s} ${Ue}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.equipment}</span>
            <span class="tile-value">${Y}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.crew}</span>
            <span class="tile-value">${j.length?M:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${H}</span>
          </div>
        </div>
        ${G}
      </div>
    `}).join("")}function pt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Eo(e,t,n=[],a,s=null){const{projectLinked:o,effectiveConfirmed:c}=Be(e,s),r=e.paid===!0||e.paid==="paid",l=un(e),d=e.items||[],u=Te(d),{technicians:m=[]}=W(),p=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(m)?m:[]),g=new Map;p.forEach(B=>{if(!B||B.id==null)return;const O=String(B.id),te=g.get(O)||{};g.set(O,{...te,...B})});const h=(e.technicians||[]).map(B=>g.get(String(B))).filter(Boolean),w=Un(),v=ea(e.start,e.end),x=(B={})=>{const O=[B.dailyWage,B.daily_rate,B.dailyRate,B.wage,B.rate];for(const te of O){if(te==null)continue;const Ne=parseFloat(y(String(te)));if(Number.isFinite(Ne))return Ne}return 0},$=d.reduce((B,O)=>B+(O.qty||1)*(O.price||0),0)*v,T=h.reduce((B,O)=>B+x(O),0)*v,b=$+T,k=parseFloat(e.discount)||0,P=e.discountType==="amount"?k:b*(k/100),N=Math.max(0,b-P),V=o?!1:e.applyTax,A=V?N*.15:0,q=Number(e.cost),L=Number.isFinite(q),D=N+A,E=o?Math.round(D):L?q:Math.round(D),F=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,G=F!=null?parseFloat(y(String(F))):NaN;let M=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(G)&&G>0)&&Number.isFinite(G)?G:0,ee=M>0?Math.max(0,(Number.isFinite(E)?E:0)*(M/100)):0;V&&M<=0&&(M=me,ee=Math.max(0,(Number.isFinite(E)?E:0)*(M/100)));const se=y(String(e.reservationId??e.id??"")),fe=e.start?y(Re(e.start)):"-",X=e.end?y(Re(e.end)):"-",ge=y(String(h.length)),H=y($.toFixed(2)),Y=y(P.toFixed(2)),Ue=y(N.toFixed(2)),Ee=y(A.toFixed(2)),ke=y((E??0).toFixed(2)),ce=y(String(v)),J=i("reservations.create.summary.currency","SR"),En=i("reservations.details.labels.discount","الخصم"),Ct=i("reservations.details.labels.tax","الضريبة (15%)"),rt=i("reservations.details.labels.crewTotal","إجمالي الفريق"),Pe=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ct=i("reservations.details.labels.duration","عدد الأيام"),Tt=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Bt=i("reservations.details.labels.netProfit","💵 صافي الربح"),lt=i("reservations.create.equipment.imageAlt","صورة"),he={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},be=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Lt=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),Dt=i("reservations.details.technicians.roleUnknown","غير محدد"),Ae=i("reservations.details.technicians.phoneUnknown","غير متوفر"),Ke=i("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Qe=i("reservations.list.status.confirmed","✅ مؤكد"),jt=i("reservations.list.status.pending","⏳ غير مؤكد"),_t=i("reservations.list.payment.paid","💳 مدفوع"),Pt=i("reservations.list.payment.unpaid","💳 غير مدفوع"),R=i("reservations.list.status.completed","📁 منتهي"),Z=i("reservations.details.labels.id","🆔 رقم الحجز"),le=i("reservations.details.section.bookingInfo","بيانات الحجز"),Va=i("reservations.details.section.paymentSummary","ملخص الدفع"),Ua=i("reservations.details.labels.finalTotal","المجموع النهائي"),Ka=i("reservations.details.section.crew","😎 الفريق الفني"),Qa=i("reservations.details.crew.count","{count} عضو"),Ga=i("reservations.details.section.items","📦 المعدات المرتبطة"),Wa=i("reservations.details.items.count","{count} عنصر"),Xa=i("reservations.details.actions.edit","✏️ تعديل"),Ya=i("reservations.details.actions.delete","🗑️ حذف"),Za=i("reservations.details.labels.customer","العميل"),Ja=i("reservations.details.labels.contact","رقم التواصل"),es=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const ts=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),ns=i("reservations.details.actions.openProject","📁 فتح المشروع"),as=i("reservations.details.labels.start","بداية الحجز"),ss=i("reservations.details.labels.end","نهاية الحجز"),os=i("reservations.details.labels.notes","ملاحظات"),is=i("reservations.list.noNotes","لا توجد ملاحظات"),rs=i("reservations.details.labels.itemsCount","عدد المعدات"),cs=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),ls=i("reservations.details.labels.paymentStatus","حالة الدفع"),ds=i("reservations.list.unknownCustomer","غير معروف"),kn=r?_t:Pt,us=u.reduce((B,O)=>B+(Number(O.quantity)||0),0),ms=y(String(us)),An=Wa.replace("{count}",ms),ps=Qa.replace("{count}",ge),fs=e.notes?y(e.notes):is,gs=y(T.toFixed(2)),hs=y(String(M)),bs=y(ee.toFixed(2)),vs=`${hs}% (${bs} ${J})`,$n=Math.max(0,(E??0)-A-ee-T),ys=y($n.toFixed(2)),ve=[{icon:"💳",label:ls,value:kn},{icon:"📦",label:rs,value:An},{icon:"⏱️",label:ct,value:ce},{icon:"💼",label:cs,value:`${H} ${J}`}];ve.push({icon:"😎",label:rt,value:`${gs} ${J}`}),P>0&&ve.push({icon:"💸",label:En,value:`${Y} ${J}`}),ve.push({icon:"📊",label:Pe,value:`${Ue} ${J}`}),V&&A>0&&ve.push({icon:"🧾",label:Ct,value:`${Ee} ${J}`}),M>0&&ve.push({icon:"🏦",label:Tt,value:vs}),Math.abs($n-(E??0))>.009&&ve.push({icon:"💵",label:Bt,value:`${ys} ${J}`}),ve.push({icon:"💰",label:Ua,value:`${ke} ${J}`});const ws=ve.map(({icon:B,label:O,value:te})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${B} ${O}</span>
      <span class="summary-details-value">${te}</span>
    </div>
  `).join(""),Cn=[{text:c?Qe:jt,className:c?"status-confirmed":"status-pending"},{text:kn,className:r?"status-paid":"status-unpaid"}];l&&Cn.push({text:R,className:"status-completed"});const xs=Cn.map(({text:B,className:O})=>`<span class="status-chip ${O}">${B}</span>`).join(""),Ge=(B,O,te)=>`
    <div class="res-info-row">
      <span class="label">${B} ${O}</span>
      <span class="value">${te}</span>
    </div>
  `;let Nt="";if(e.projectId){let B=pt(ts);if(s){const O=s.title||i("projects.fallback.untitled","مشروع بدون اسم");B=`${pt(O)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${pt(ns)}</button>`}Nt=`
      <div class="res-info-row">
        <span class="label">📁 ${es}</span>
        <span class="value">${B}</span>
      </div>
    `}const $e=[];$e.push(Ge("👤",Za,t?.customerName||ds)),$e.push(Ge("📞",Ja,t?.phone||"—")),$e.push(Ge("🗓️",as,fe)),$e.push(Ge("🗓️",ss,X)),$e.push(Ge("📝",os,fs)),Nt&&$e.push(Nt);const Ss=$e.join(""),qs=u.length?u.map(B=>{const O=B.items[0]||{},te=Le(O)||B.image,Ne=te?`<img src="${te}" alt="${lt}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',dt=Number(B.quantity)||Number(B.count)||0,ut=y(String(dt)),Tn=Number.isFinite(Number(B.unitPrice))?Number(B.unitPrice):0,As=Number.isFinite(Number(B.totalPrice))?Number(B.totalPrice):Tn*dt,$s=`${y(Tn.toFixed(2))} ${J}`,Cs=`${y(As.toFixed(2))} ${J}`,Bn=B.barcodes.map(Ft=>y(String(Ft||""))).filter(Boolean),Ts=Bn.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Bn.map(Ft=>`<li>${Ft}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td>
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${Ne}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${pt(O.desc||O.description||O.name||B.description||"-")}</div>
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
        `}).join(""):`<tr><td colspan="5" class="text-center">${be}</td></tr>`,Is=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${he.item}</th>
            <th>${he.quantity}</th>
            <th>${he.unitPrice}</th>
            <th>${he.total}</th>
            <th>${he.actions}</th>
          </tr>
        </thead>
        <tbody>${qs}</tbody>
      </table>
    </div>
  `,Es=h.map((B,O)=>{const te=y(String(O+1)),Ne=B.role||Dt,dt=B.phone||Ae,ut=B.wage?Ke.replace("{amount}",y(String(B.wage))).replace("{currency}",J):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${te}</span>
          <span class="technician-name">${B.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${Ne}</div>
          <div>📞 ${dt}</div>
          ${ut?`<div>💰 ${ut}</div>`:""}
        </div>
      </div>
    `}).join(""),ks=h.length?`<div class="reservation-technicians-grid">${Es}</div>`:`<ul class="reservation-modal-technicians"><li>${Lt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Z}</span>
          <strong>${se}</strong>
        </div>
        <div class="status-chips">
          ${xs}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${le}</h6>
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
`,fa="reservations.quote.sequence",de={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Ao=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],vn=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],ga=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>I(y(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>I(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>I(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>I(y(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>I(y(Number(e?.price||0).toFixed(2)))}],ha=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>I(y(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>I(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>I(e?.role||i("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>I(e?.phone||i("reservations.details.technicians.phoneUnknown","غير متوفر"))}],ba={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"companyShare",labelKey:"reservations.details.labels.companyShare",fallback:"🏦 نسبة الشركة"},{id:"netProfit",labelKey:"reservations.details.labels.netProfit",fallback:"صافي الربح"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:ga.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:ha.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},$o="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Co="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",To="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Bo=ko.trim(),Lo=/color\([^)]*\)/gi,xt=/(color\(|color-mix\()/i,Do=document.createElement("canvas"),ft=Do.getContext("2d"),va=/^data:image\/svg\+xml/i,jo=/\.svg($|[?#])/i,Ze=512,Wt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",ya=96,wa=25.4,Xt=210,gt=297,Je=Math.round(Xt/wa*ya),et=Math.round(gt/wa*ya),_o=2,xa=/safari/i,Po=/(iphone|ipad|ipod)/i,No=/(iphone|ipad|ipod)/i,Fo=/(crios|fxios|edgios|opios)/i,St="[reservations/pdf]";let U=null,C=null,re=1,We=null,Xe=null,ye=null,Fe=null;function Yt(){return!!window?.bootstrap?.Modal}function Ro(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),ye||(ye=document.createElement("div"),ye.className="modal-backdrop fade show",ye.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(ye)),Fe||(Fe=t=>{t.key==="Escape"&&Zt(e)},document.addEventListener("keydown",Fe));try{e.focus({preventScroll:!0})}catch{}}}function Zt(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),ye&&(ye.remove(),ye=null),Fe&&(document.removeEventListener("keydown",Fe),Fe=null))}function Mo(e){if(e){if(Yt()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Ro(e)}}function Sa(){const e={};return Object.entries(ba).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function zo(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Oo(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function qa(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Ia(){return Object.fromEntries(vn.map(({id:e})=>[e,!1]))}function yn(e,t){return e.sectionExpansions||(e.sectionExpansions=Ia()),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Ho(e,t){return yn(e,t)?.[t]!==!1}function wn(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Vo(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Po.test(e)}function Uo(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=xa.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Ea(){return Vo()&&Uo()}function Ko(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"";return No.test(e)&&xa.test(e)&&!Fo.test(e)}function Mt(e,...t){try{console.log(`${St} ${e}`,...t)}catch{}}function Jt(e,...t){try{console.warn(`${St} ${e}`,...t)}catch{}}function Qo(e,t,...n){try{t?console.error(`${St} ${e}`,t,...n):console.error(`${St} ${e}`,...n)}catch{}}function oe(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Go(e,t="لا توجد بيانات للعرض."){const n=I(i(e,t));return oe(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Fn(e,t){return Array.isArray(e)&&e.length?e:[Go(t)]}function en(e,t="#000"){if(!ft||!e)return t;try{return ft.fillStyle="#000",ft.fillStyle=e,ft.fillStyle||t}catch{return t}}function Wo(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=en(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function ka(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Lo,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Xo=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function Aa(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;Xo.forEach(c=>{const r=s[c];if(r&&xt.test(r)){const l=c.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),d=c==="backgroundColor"?"#ffffff":s.color||"#000000",u=en(r,d);a.style.setProperty(l,u,"important")}});const o=s.backgroundImage;if(o&&xt.test(o)){const c=en(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",c,"important")}})}function $a(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(o=>{const c=a[o];if(c&&xt.test(c)){const r=o.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),l=o==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(r,l,"important")}});const s=a.backgroundImage;s&&xt.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function Rn(e,t=Ze){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Yo(e){if(!e)return{width:Ze,height:Ze};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Rn(t,0):0,s=n?Rn(n,0):0;if(a>0&&s>0)return{width:a,height:s};const o=e.getAttribute?.("viewBox");if(o){const c=o.trim().split(/[\s,]+/).map(r=>parseFloat(r||"0"));if(c.length>=4){const[,,r,l]=c;a=a||(Number.isFinite(r)&&r>0?r:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Ze,height:s||Ze}}function Ca(e=""){return typeof e!="string"?!1:va.test(e)||jo.test(e)}function Zo(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Jo(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=o=>{const c=o?.message||`Unable to load image from ${e}`;a(new Error(c))},s.src=e})}async function Ta(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const o=await Jo(s),c=n.createElement("canvas"),r=Math.max(t.width||o.naturalWidth||o.width||0,1),l=Math.max(t.height||o.naturalHeight||o.height||r,1);c.width=r,c.height=l;const d=c.getContext("2d");return d.clearRect(0,0,r,l),d.drawImage(o,0,0,r,l),c.toDataURL("image/png")}catch(o){return console.warn("[reservations/pdf] failed to rasterize SVG content",o),null}finally{URL.revokeObjectURL(s)}}async function ei(e){if(!e)return null;if(va.test(e))return Zo(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function ti(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Ca(t))return!1;const n=await ei(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Wt),!1;const a=await Ta(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Wt),!1)}async function ni(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Yo(e),s=await Ta(n,a),c=(e.ownerDocument||document).createElement("img");c.setAttribute("src",s||Wt),c.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),c.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&c.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&c.setAttribute("style",e.getAttribute("style"));const r=e.getAttribute("width"),l=e.getAttribute("height");return r&&c.setAttribute("width",r),l&&c.setAttribute("height",l),e.parentNode?.replaceChild(c,e),!!s}async function Ba(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Ca(s.getAttribute?.("src"))&&a.push(ti(s))}),n.forEach(s=>{a.push(ni(s))}),a.length&&await Promise.allSettled(a)}function tn(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Qo(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const o=n||i("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى.");if(S(o),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function nn({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Jt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Jt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function xn(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",o=>n(o)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=o=>n(o),document.head.appendChild(s)})}function Mn(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function zn(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function ai(){const e=zn();return e||(Xe||(Xe=xn(Co).catch(t=>{throw Xe=null,t}).then(()=>{const t=zn();if(!t)throw Xe=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Xe)}async function si(){const e=Mn();return e||(We||(We=xn(To).catch(t=>{throw We=null,t}).then(()=>{const t=Mn();if(!t)throw We=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),We)}async function oi(){if(window.html2pdf||await xn($o),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Wo()}function I(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ii(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function ri(){const e=window.localStorage?.getItem?.(fa),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ci(){const t=ri()+1;return{sequence:t,quoteNumber:ii(t)}}function li(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(fa,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function di(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function ui(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(y(String(n)));if(Number.isFinite(a))return a}return 0}function mi(e){const t=Et()||[],{technicians:n=[]}=W(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(o=>{if(!o||o.id==null)return;const c=String(o.id),r=s.get(c)||{};s.set(c,{...r,...o})}),(e.technicians||[]).map(o=>s.get(String(o))).filter(Boolean)}function pi(e,t,n){const{projectLinked:a}=Be(e,n),s=ea(e.start,e.end),r=(Array.isArray(e.items)?e.items:[]).reduce((D,E)=>D+(Number(E?.qty)||1)*(Number(E?.price)||0),0)*s,d=t.reduce((D,E)=>D+ui(E),0)*s,u=r+d,m=parseFloat(e.discount)||0,p=e.discountType==="amount"?m:u*(m/100),g=Math.max(0,u-p),h=a?!1:e.applyTax,w=h?g*.15:0,v=Number(e.cost),x=Number.isFinite(v),f=g+w,$=a?Math.round(f):x?v:Math.round(f),_=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,T=_!=null?parseFloat(y(String(_).replace("%","").trim())):NaN,b=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let P=(b!=null?b===!0||b===1||b==="1"||String(b).toLowerCase()==="true":Number.isFinite(T)&&T>0)&&Number.isFinite(T)?Number(T):0;h&&P<=0&&(P=me);const N=P>0?Math.max(0,($??0)*(P/100)):0,V=Number.isFinite(q?.crewTotal)?q.crewTotal:0,A=Math.max(0,($??0)-w-N-V),q={equipmentTotal:r,crewTotal:d,discountAmount:p,taxAmount:w,finalTotal:$??0,companySharePercent:P,companyShareAmount:N,netProfit:A},L={equipmentTotal:y(r.toFixed(2)),crewTotal:y(d.toFixed(2)),discountAmount:y(p.toFixed(2)),taxAmount:y(w.toFixed(2)),finalTotal:y(($??0).toFixed(2)),companySharePercent:y(P.toFixed(2)),companyShareAmount:y(N.toFixed(2)),netProfit:y(A.toFixed(2))};return{totals:q,totalsDisplay:L,rentalDays:s}}function La({reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:o,rentalDays:c,currencyLabel:r,sections:l,fieldSelections:d={},quoteNumber:u,quoteDate:m}){const{companySharePercent:p=0,companyShareAmount:g=0,netProfit:h=0}=s||{},w=y(String(e?.reservationId??e?.id??"")),v=e.start?y(Re(e.start)):"-",x=e.end?y(Re(e.end)):"-",f=t?.customerName||t?.full_name||t?.name||"-",$=t?.phone||"-",_=t?.email||"-",T=t?.company||t?.company_name||"-",b=y($),k=n?.title||n?.name||i("reservations.details.project.none","غير مرتبط بمشروع"),P=n?.code||n?.projectCode||"",N=y(String(c)),V=e?.notes||"",A=zo(d),q=(R,Z)=>qa(A,R,Z),L=R=>l?.has?.(R),D=`<div class="quote-placeholder">${I(i("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,E=(R,Z)=>`<div class="info-plain__item">${I(R)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${I(Z)}</strong></div>`,F=(R,Z,{variant:le="inline"}={})=>le==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${I(R)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${I(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${I(R)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${I(Z)}</span>
    </span>`,G=(R,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${I(R)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${I(Z)}</span>
    </div>`,z=[];q("customerInfo","customerName")&&z.push(E(i("reservations.details.labels.customer","العميل"),f)),q("customerInfo","customerCompany")&&z.push(E(i("reservations.details.labels.company","الشركة"),T)),q("customerInfo","customerPhone")&&z.push(E(i("reservations.details.labels.phone","الهاتف"),b)),q("customerInfo","customerEmail")&&z.push(E(i("reservations.details.labels.email","البريد"),_));const j=L("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${I(i("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:D}
      </section>`:"",M=[];q("reservationInfo","reservationId")&&M.push(E(i("reservations.details.labels.reservationId","رقم الحجز"),w||"-")),q("reservationInfo","reservationStart")&&M.push(E(i("reservations.details.labels.start","بداية الحجز"),v)),q("reservationInfo","reservationEnd")&&M.push(E(i("reservations.details.labels.end","نهاية الحجز"),x)),q("reservationInfo","reservationDuration")&&M.push(E(i("reservations.details.labels.duration","عدد الأيام"),N));const ee=L("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${I(i("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:D}
      </section>`:"",se=[];q("projectInfo","projectTitle")&&se.push(E(i("reservations.details.labels.project","المشروع"),k)),q("projectInfo","projectCode")&&se.push(E(i("reservations.details.labels.code","الرمز"),P||"-"));const fe=L("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${I(i("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${se.length?`<div class="info-plain">${se.join("")}</div>`:D}
      </section>`:"",X=[];if(q("financialSummary","equipmentTotal")&&X.push(F(i("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${o.equipmentTotal} ${r}`)),q("financialSummary","crewTotal")&&X.push(F(i("reservations.details.labels.crewTotal","إجمالي الفريق"),`${o.crewTotal} ${r}`)),q("financialSummary","discountAmount")&&X.push(F(i("reservations.details.labels.discount","الخصم"),`${o.discountAmount} ${r}`)),q("financialSummary","taxAmount")&&X.push(F(i("reservations.details.labels.tax","الضريبة"),`${o.taxAmount} ${r}`)),p>0&&q("financialSummary","companyShare")){const R=o.companySharePercent??y(p.toFixed(2)),Z=o.companyShareAmount??y(g.toFixed(2)),le=`${R}% (${Z} ${r})`;X.push(F(i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),le))}const ge=q("financialSummary","finalTotal"),H=q("financialSummary","netProfit")&&Number.isFinite(h)&&Math.abs((h??0)-(s?.finalTotal??0))>.009,Y=[];ge&&Y.push(F(i("reservations.details.labels.total","الإجمالي النهائي"),`${o.finalTotal} ${r}`,{variant:"final"})),H&&Y.push(F(i("reservations.details.labels.netProfit","💵 صافي الربح"),`${o.netProfit} ${r}`,{variant:"final"}));const Ue=Y.length?`<div class="totals-final">${Y.join("")}</div>`:"",Ee=L("financialSummary")?!X.length&&!ge?`<section class="quote-section quote-section--financial">${D}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${I(i("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${X.length?`<div class="totals-inline">${X.join("")}</div>`:""}
            ${Ue}
          </div>
        </section>`:"",ke=ga.filter(R=>q("items",R.id)),ce=ke.length>0,J=ce?ke.map(R=>`<th>${I(R.labelKey?i(R.labelKey,R.fallback):R.fallback)}</th>`).join(""):"",Ct=Array.isArray(e.items)&&e.items.length>0?e.items.map((R,Z)=>`<tr>${ke.map(le=>`<td>${le.render(R,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ke.length,1)}" class="empty">${I(i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,rt=L("items")?ce?`<section class="quote-section quote-section--table">
            <h3>${I(i("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${J}</tr>
              </thead>
              <tbody>${Ct}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${I(i("reservations.details.items.title","المعدات"))}</h3>
            ${D}
          </section>`:"",Pe=ha.filter(R=>q("crew",R.id)),ct=Pe.length>0,Tt=ct?Pe.map(R=>`<th>${I(R.labelKey?i(R.labelKey,R.fallback):R.fallback)}</th>`).join(""):"",Bt=a.length?a.map((R,Z)=>`<tr>${Pe.map(le=>`<td>${le.render(R,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Pe.length,1)}" class="empty">${I(i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,lt=L("crew")?ct?`<section class="quote-section quote-section--table">
            <h3>${I(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Tt}</tr>
              </thead>
              <tbody>${Bt}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${I(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${D}
          </section>`:"",he=L("notes")?`<section class="quote-section">
        <h3>${I(i("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${I(V||i("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",be=[];q("payment","beneficiary")&&be.push(G(i("reservations.quote.labels.beneficiary","اسم المستفيد"),de.beneficiaryName)),q("payment","bank")&&be.push(G(i("reservations.quote.labels.bank","اسم البنك"),de.bankName)),q("payment","account")&&be.push(G(i("reservations.quote.labels.account","رقم الحساب"),y(de.accountNumber))),q("payment","iban")&&be.push(G(i("reservations.quote.labels.iban","رقم الآيبان"),y(de.iban)));const Lt=`<section class="quote-section">
      <div class="payment-block">
        <h3>${I(i("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${be.length?be.join(""):D}</div>
      </div>
      <p class="quote-approval-note">${I(de.approvalNote)}</p>
    </section>`,Dt=`<footer class="quote-footer">
        <h4>${I(i("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Ao.map(R=>`<li>${I(R)}</li>`).join("")}</ul>
      </footer>`,Ae=[];j&&ee?Ae.push(oe(`<div class="quote-section-row">${j}${ee}</div>`,{blockType:"group"})):(ee&&Ae.push(oe(ee)),j&&Ae.push(oe(j))),fe&&Ae.push(oe(fe));const Ke=[];rt&&Ke.push(oe(rt,{blockType:"table",extraAttributes:'data-table-id="items"'})),lt&&Ke.push(oe(lt,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Qe=[];Ee&&Qe.push(oe(Ee,{blockType:"summary"})),he&&Qe.push(oe(he));const jt=[oe(Lt,{blockType:"payment"}),oe(Dt,{blockType:"footer"})],_t=[...Fn(Ae,"reservations.quote.placeholder.page1"),...Ke,...Fn(Qe,"reservations.quote.placeholder.page2"),...jt],Pt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${I(de.logoUrl)}" alt="${I(de.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${I(i("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${I(de.companyName)}</p>
        <p class="quote-company-cr">${I(i("reservations.quote.labels.cr","السجل التجاري"))}: ${I(de.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${I(u)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${I(m)}</strong>
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
  `}function fi(e){return!e||e.complete&&e.naturalHeight!==0?Promise.resolve():new Promise(t=>{const n=()=>t();e.addEventListener("load",n,{once:!0}),e.addEventListener("error",n,{once:!0})})}async function at(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),o=a.map(r=>fi(r)),c=[s,...o].map(r=>r.catch(l=>(Jt("asset load failed",l),null)));await Promise.all(c),await new Promise(r=>n.requestAnimationFrame(()=>r()))}async function Da(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),o=e.querySelector("[data-quote-source]"),c=o?.querySelector("[data-quote-header-template]");if(!s||!o||!c)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Ba(o),await at(o),s.innerHTML="";const r=Array.from(o.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=b=>{b.style.margin="0 auto",b.style.breakInside="avoid",b.style.pageBreakInside="avoid",b.style.pageBreakAfter="auto",b.style.breakAfter="auto"},m=()=>{const b=a.createElement("div"),k=s.childElementCount===0;if(b.className="quote-page",b.dataset.pageIndex=String(s.childElementCount),k){b.classList.add("quote-page--primary");const N=c.cloneNode(!0);N.removeAttribute("data-quote-header-template"),b.appendChild(N)}else b.classList.add("quote-page--continuation");const P=a.createElement("main");P.className="quote-body",b.appendChild(P),s.appendChild(b),u(b),l=b,d=P},p=()=>{(!l||!d||!d.isConnected)&&m()},g=()=>{if(!l||!d||d.childElementCount>0)return;const b=l;l=null,d=null,b.parentNode&&b.parentNode.removeChild(b)},h=()=>{l=null,d=null},w=()=>l?l.scrollHeight-l.clientHeight>_o:!1,v=(b,{allowOverflow:k=!1}={})=>(p(),d.appendChild(b),w()&&!k?(d.removeChild(b),g(),!1):!0),x=b=>{const k=b.cloneNode(!0);k.removeAttribute?.("data-quote-block"),k.removeAttribute?.("data-block-type"),k.removeAttribute?.("data-table-id"),!v(k)&&(h(),!v(k)&&v(k,{allowOverflow:!0}))},f=b=>{const k=b.querySelector("table");if(!k){x(b);return}const P=b.querySelector("h3"),N=k.querySelector("thead"),V=Array.from(k.querySelectorAll("tbody tr"));if(!V.length){x(b);return}let A=null,q=0;const L=(E=!1)=>{const F=b.cloneNode(!1);F.removeAttribute("data-quote-block"),F.removeAttribute("data-block-type"),F.removeAttribute("data-table-id"),F.classList.add("quote-section--table-fragment"),E&&F.classList.add("quote-section--table-fragment--continued");const G=P?P.cloneNode(!0):null;G&&F.appendChild(G);const z=k.cloneNode(!1);z.classList.add("quote-table--fragment"),N&&z.appendChild(N.cloneNode(!0));const j=a.createElement("tbody");return z.appendChild(j),F.appendChild(z),{section:F,body:j}},D=(E=!1)=>A||(A=L(E),v(A.section)||(h(),v(A.section)||v(A.section,{allowOverflow:!0})),A);V.forEach(E=>{D(q>0);const F=E.cloneNode(!0);if(A.body.appendChild(F),w()&&(A.body.removeChild(F),A.body.childElementCount||(d.removeChild(A.section),A=null,g()),h(),A=null,D(q>0),A.body.appendChild(F),w())){A.section.classList.add("quote-section--table-fragment--overflow"),q+=1;return}q+=1}),A=null};if(!r.length)return;r.forEach(b=>{b.getAttribute("data-block-type")==="table"?f(b):x(b)});const $=Array.from(s.children),_=[];$.forEach((b,k)=>{const P=b.querySelector(".quote-body");if(k!==0&&(!P||P.childElementCount===0)){b.remove();return}_.push(b)}),_.forEach((b,k)=>{const P=k===0;b.style.pageBreakAfter="auto",b.style.breakAfter="auto",b.style.pageBreakBefore=P?"auto":"always",b.style.breakBefore=P?"auto":"page",n?b.style.boxShadow="":b.style.boxShadow="none"});const T=_[_.length-1]||null;l=T,d=T?.querySelector(".quote-body")||null,await at(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Sn(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function gi(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[o,c]=await Promise.all([si(),ai()]),r=typeof window<"u"&&window.devicePixelRatio||1,l=wn(),d=Ea(),u=Ko();let m;u?m=1.5:d?m=Math.min(1.7,Math.max(1.2,r*1.1)):l?m=Math.min(1.8,Math.max(1.25,r*1.2)):m=Math.min(2,Math.max(1.6,r*1.4));const p=u||d?.9:l?.92:.95,g=new o({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),h={scale:m,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!0,removeContainer:!1,logging:!0};let w=0;const v=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let f=0;f<s.length;f+=1){const $=s[f];await Ba($),await at($);const _=$.ownerDocument||document,T=_.createElement("div");Object.assign(T.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const b=$.cloneNode(!0);b.style.width=`${Je}px`,b.style.maxWidth=`${Je}px`,b.style.minWidth=`${Je}px`,b.style.height=`${et}px`,b.style.maxHeight=`${et}px`,b.style.minHeight=`${et}px`,b.style.position="relative",b.style.background="#ffffff",Sn(b),T.appendChild(b),_.body.appendChild(T);let k;try{await at(b),k=await c(b,{...h,scale:m,width:Je,height:et,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(E){throw tn(E,"pageCapture",{toastMessage:v}),E}finally{T.parentNode?.removeChild(T)}if(!k)continue;const P=k.width||1,V=(k.height||1)/P;let A=Xt,q=A*V,L=0;if(q>gt){const E=gt/q;q=gt,A=A*E,L=Math.max(0,(Xt-A)/2)}const D=k.toDataURL("image/jpeg",p);w>0&&g.addPage(),g.addImage(D,"JPEG",L,0,A,q,`page-${w+1}`,"FAST"),w+=1,await new Promise(E=>window.requestAnimationFrame(E))}}catch(f){throw nn({safariWindowRef:n,mobileWindowRef:a}),f}if(w===0)throw nn({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(d||a&&!a.closed){const f=g.output("blob"),$=URL.createObjectURL(f);d?n&&!n.closed?(n.location.href=$,n.focus?.()):window.open($,"_blank"):a&&!a.closed&&(a.location.href=$,a.focus?.()),setTimeout(()=>URL.revokeObjectURL($),6e4)}else g.save(t)}function qn(){if(!C||!U)return;const{previewFrame:e}=U;if(!e)return;const t=La({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(ka(s),Aa(s,a),$a(s,a));const o=n?.getElementById("quotation-pdf-root");try{o&&(await Da(o,{context:"preview"}),Sn(o))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const c=Array.from(n?.querySelectorAll?.(".quote-page")||[]),r=n?.querySelector(".quote-preview-pages"),l=Je;let d=18;if(r&&n?.defaultView){const p=n.defaultView.getComputedStyle(r),g=parseFloat(p.rowGap||p.gap||`${d}`);Number.isFinite(g)&&g>=0&&(d=g)}const u=et,m=c.length?c.length*u+Math.max(0,(c.length-1)*d):u;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(m),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${m}px`,e.style.minHeight=`${m}px`,U?.previewFrameWrapper&&!U?.userAdjustedZoom){const p=U.previewFrameWrapper.clientWidth-24;p>0&&p<l?re=Math.max(p/l,.3):re=1}_a(re)},{once:!0})}function hi(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?C.sections.add(n):C.sections.delete(n),ja(),qn())}function bi(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=C.fields||(C.fields=Sa()),o=Oo(s,n);t.checked?o.add(a):o.delete(a),qn()}function vi(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(yn(C,n),C.sectionExpansions[n]=t.open)}function ja(){if(!U?.toggles||!C)return;const{toggles:e}=U,t=C.fields||{};yn(C);const n=vn.map(({id:a,labelKey:s,fallback:o})=>{const c=i(s,o),r=C.sections.has(a),l=ba[a]||[],d=Ho(C,a),u=l.length?`<div class="quote-toggle-sublist">
          ${l.map(m=>{const p=qa(t,a,m.id),g=r?"":"disabled",h=m.labelKey?i(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${m.id}" ${p?"checked":""} ${g}>
                <span>${I(h)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${a}" ${d?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${a}" ${r?"checked":""}>
            <span>${I(c)}</span>
          </label>
          ${l.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${u}
      </details>
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",hi)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",bi)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",vi)})}function yi(){if(U?.modal)return U;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${I(i("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${I(i("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${I(i("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${I(i("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-download]"),o=e.querySelector(".modal-header"),c=o?.querySelector(".btn-close"),r=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),l=document.createElement("div");l.className="quote-preview-header-actions",o&&o.insertBefore(l,c||null);const d=document.createElement("iframe");d.className="quote-preview-frame",d.setAttribute("title",i("reservations.quote.previewTitle","معاينة عرض السعر")),d.setAttribute("loading","lazy"),d.setAttribute("frameborder","0");const u=document.createElement("div");u.className="quote-preview-zoom-controls",u.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${I(i("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${I(i("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${I(i("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(d),n.innerHTML="";const p=document.createElement("div");p.className="quote-preview-scroll",p.appendChild(m),n.appendChild(p),l.appendChild(u),s?.addEventListener("click",async()=>{if(C){s.disabled=!0;try{await xi()}finally{s.disabled=!1}}});const g=()=>{Yt()||Zt(e)};r.forEach(x=>{x?.addEventListener("click",g)}),c&&!r.includes(c)&&c.addEventListener("click",g),e.addEventListener("click",x=>{Yt()||x.target===e&&Zt(e)}),U={modal:e,toggles:t,preview:n,previewFrameWrapper:m,zoomControls:u,zoomValue:u.querySelector("[data-zoom-value]"),previewFrame:d,meta:a,downloadBtn:s,userAdjustedZoom:!1};const h=u.querySelector("[data-zoom-out]"),w=u.querySelector("[data-zoom-in]"),v=u.querySelector("[data-zoom-reset]");return h?.addEventListener("click",()=>On(-.1)),w?.addEventListener("click",()=>On(.1)),v?.addEventListener("click",()=>qt(1,{markManual:!0})),qt(re),U}function qt(e,{silent:t=!1,markManual:n=!1}={}){re=Math.min(Math.max(e,.25),2.2),n&&U&&(U.userAdjustedZoom=!0),_a(re),!t&&U?.zoomValue&&(U.zoomValue.textContent=`${Math.round(re*100)}%`)}function On(e){qt(re+e,{markManual:!0})}function _a(e){if(!U?.previewFrame||!U.previewFrameWrapper)return;const t=U.previewFrame,n=U.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",wn()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function wi(){if(!U?.meta||!C)return;const{meta:e}=U;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${I(i("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${I(C.quoteNumber)}</strong></div>
      <div><span>${I(i("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${I(C.quoteDateLabel)}</strong></div>
    </div>
  `}async function xi(){if(!C)return;const e=wn(),t=!e&&Ea(),n=e?window.open("","_blank"):null,a=t?window.open("data:text/html;charset=utf-8,"+encodeURIComponent(""),"_blank"):null;let s=null;const o=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await oi(),Mt("html2pdf ensured");const c=La({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel});s=document.createElement("div"),s.innerHTML=c,Object.assign(s.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(s),ka(s),Aa(s),$a(s),Mt("export container prepared");const r=s.firstElementChild;if(r){r.setAttribute("dir","rtl"),r.style.direction="rtl",r.style.textAlign="right",r.setAttribute("data-theme","light"),r.classList.remove("dark","dark-mode"),r.style.margin="0",r.style.padding="0",r.style.width="210mm",r.style.maxWidth="210mm",r.style.marginLeft="auto",r.style.marginRight="auto",r.scrollTop=0,r.scrollLeft=0;try{await Da(r,{context:"export"}),await at(r),Sn(r),Mt("layout complete for export document")}catch(d){tn(d,"layoutQuoteDocument",{suppressToast:!0})}}const l=`quotation-${C.quoteNumber}.pdf`;await gi(r,{filename:l,safariWindowRef:a,mobileWindowRef:n}),C.sequenceCommitted||(li(C.quoteSequence),C.sequenceCommitted=!0)}catch(c){nn({container:s,safariWindowRef:a,mobileWindowRef:n}),s=null,tn(c,"exportQuoteAsPdf",{toastMessage:o})}finally{s&&s.parentNode&&s.parentNode.removeChild(s)}}function Si(){const e=yi();e?.modal&&(re=1,U&&(U.userAdjustedZoom=!1),qt(re,{silent:!0}),ja(),wi(),qn(),Mo(e.modal))}async function qi({reservation:e,customer:t,project:n}){if(!e){S(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=mi(e),{totalsDisplay:s,totals:o,rentalDays:c}=pi(e,a,n),r=i("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=ci(),u=new Date;C={reservation:e,customer:t,project:n,technicians:a,totals:o,totalsDisplay:s,rentalDays:c,currencyLabel:r,sections:new Set(vn.filter(m=>m.defaultSelected).map(m=>m.id)),sectionExpansions:Ia(),fields:Sa(),quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:di(u),sequenceCommitted:!1},Si()}function Ii({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=Et(),{reservations:o=[],customers:c=[],technicians:r=[],projects:l=[]}=W(),d=Array.isArray(s)?s:r||[],u=new Map((l||[]).map(v=>[String(v.id),v])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!o||o.length===0){m.innerHTML=`<p>${i("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||yo(),g=new Map(c.map(v=>[String(v.id),v])),h=new Map(d.map(v=>[String(v.id),v])),w=qo({reservations:o,filters:p,customersMap:g,techniciansMap:h,projectsMap:u});if(w.length===0){m.innerHTML=`<p>${i("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${Io({entries:w,customersMap:g,techniciansMap:h,projectsMap:u})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(v=>{const x=Number(v.dataset.reservationIndex);Number.isNaN(x)||v.addEventListener("click",()=>{typeof n=="function"&&n(x)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(v=>{const x=Number(v.dataset.reservationIndex);Number.isNaN(x)||v.addEventListener("click",f=>{f.stopPropagation(),typeof a=="function"&&a(x,f)})})}function Ei(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:o=[],projects:c=[]}=W(),r=s[e];if(!r)return S(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=o.find(x=>String(x.id)===String(r.customerId)),d=r.projectId?c.find(x=>String(x.id)===String(r.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const x=Et()||[];u.innerHTML=Eo(r,l,x,e,d)}const m=document.getElementById("reservationDetailsModal"),p=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},g=document.getElementById("reservation-details-edit-btn");g&&(g.onclick=()=>{p(),typeof t=="function"&&t(e,{reservation:r,customer:l,getEditContext:a})});const h=document.getElementById("reservation-details-delete-btn");h&&(h.onclick=()=>{p(),typeof n=="function"&&n(e,{reservation:r,customer:l})});const w=u?.querySelector('[data-action="open-project"]');w&&d&&w.addEventListener("click",()=>{p();const x=d?.id!=null?String(d.id):"",f=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=f});const v=document.getElementById("reservation-details-export-btn");return v&&(v.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),v.blur();try{await qi({reservation:r,customer:l,project:d})}catch(f){console.error("❌ [reservations] export to PDF failed",f),S(i("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function $t(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:tt(e,n),end:tt(t,a)}}function De(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=i("reservations.create.equipment.none","لا توجد معدات"),a=i("reservations.create.summary.currency","SR"),s=i("reservations.create.equipment.imageAlt","صورة"),o=i("reservations.equipment.actions.increase","زيادة الكمية"),c=i("reservations.equipment.actions.decrease","تقليل الكمية"),r=i("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Hn(t);return}const l=Te(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},m=Le(u)||d.image,p=m?`<img src="${m}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',g=y(String(d.count)),h=Number.isFinite(Number(d.unitPrice))?Number(d.unitPrice):0,w=Number.isFinite(Number(d.totalPrice))?Number(d.totalPrice):h*d.count,v=`${y(h.toFixed(2))} ${a}`,x=`${y(w.toFixed(2))} ${a}`,f=d.barcodes.map(_=>y(String(_||""))).filter(Boolean),$=f.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${f.map(_=>`<li>${_}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${$}
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
      `}).join(""),Hn(t)}function ki(e){const{index:t,items:n}=je(),s=Te(n).find(r=>r.key===e);if(!s)return;const o=s.itemIndices[s.itemIndices.length-1];if(o==null)return;const c=n.filter((r,l)=>l!==o);_e(t,c),De(c),pe()}function Ai(e){const{index:t,items:n}=je(),a=n.filter(s=>kt(s)!==e);a.length!==n.length&&(_e(t,a),De(a),pe())}function $i(e){const{index:t,items:n}=je(),s=Te(n).find(v=>v.key===e);if(!s)return;const{start:o,end:c}=$t();if(!o||!c){S(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:r=[]}=W(),l=t!=null&&r[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(v=>K(v.barcode))),{equipment:m=[]}=W(),p=(m||[]).find(v=>{const x=K(v?.barcode);return!x||u.has(x)||kt({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!aa(v)?!1:!Se(x,o,c,d)});if(!p){S(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const g=K(p.barcode),h=Oe(p);if(!h){S(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const w=[...n,{id:h,equipmentId:h,barcode:g,desc:p.desc||p.description||p.name||s.description||"",qty:1,price:Number.isFinite(Number(p.price))?Number(p.price):s.unitPrice,image:Le(p)}];_e(t,w),De(w),pe()}function Hn(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:o}=n.dataset;if(a==="decrease-edit-group"&&s){ki(s);return}if(a==="increase-edit-group"&&s){$i(s);return}if(a==="remove-edit-group"&&s){Ai(s);return}if(a==="remove-edit-item"){const c=Number(o);Number.isNaN(c)||Ci(c)}}),e.dataset.groupListenerAttached="true")}function pe(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",pe),a.dataset.listenerAttached="true"),Me(a);const s=y(t?.value||"0");t&&(t.value=s);const o=parseFloat(s)||0,c=n?.value||"percent",r=!!document.getElementById("edit-res-project")?.value,l=document.getElementById("edit-res-tax"),d=r?!1:l?.checked||!1,u=a?.value||"unpaid";Me(a,u),d&&ie("edit-res-company-share");let m=nt("edit-res-company-share");d&&(!Number.isFinite(m)||m<=0)&&(ie("edit-res-company-share"),m=nt("edit-res-company-share"));const{items:p=[]}=je(),{start:g,end:h}=$t();e.innerHTML=Ms({items:p,discount:o,discountType:c,applyTax:d,paidStatus:u,start:g,end:h,companySharePercent:m})}function Ci(e){if(e==null)return;const{index:t,items:n}=je();if(!Array.isArray(n))return;const a=n.filter((s,o)=>o!==e);_e(t,a),De(a),pe()}function Ti(e){const t=e?.value??"",n=K(t);if(!n)return;const a=At(n);if(!a){S(i("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=qe(a);if(s!=="available"){S(He(s));return}const o=K(n),{index:c,items:r=[]}=je();if(r.findIndex(v=>K(v.barcode)===o)>-1){S(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=$t();if(!d||!u){S(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:m=[]}=W(),p=c!=null&&m[c]||null,g=p?.id??p?.reservationId??null;if(Se(o,d,u,g)){S(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const h=Oe(a);if(!h){S(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const w=[...r,{id:h,equipmentId:h,barcode:o,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];_e(c,w),e&&(e.value=""),De(w),pe()}function It(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=da(t),a=K(n?.barcode||t);if(!n||!a){S(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=qe(n);if(s!=="available"){S(He(s));return}const{start:o,end:c}=$t();if(!o||!c){S(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:r,items:l=[]}=je();if(l.some(w=>K(w.barcode)===a)){S(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=W(),m=r!=null&&u[r]||null,p=m?.id??m?.reservationId??null;if(Se(a,o,c,p)){S(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const g=Oe(n);if(!g){S(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const h=[...l,{id:g,equipmentId:g,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];_e(r,h),De(h),pe(),e.value=""}function Pa(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),It(e))});const t=()=>{ua(e.value,"edit-res-equipment-description-options")&&It(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{pe()});function Bi(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Gt(e);return}It(e)}}function Oi(){Ve(),Pa()}function Li(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let st=null,ue=[],an=null,ne={},zt=!1;function sn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),o=!!e;if(n&&(n.value=o?"true":"false"),a){const c=a.dataset.confirmLabel||"✅ تم التأكيد",r=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=o?c:r,a.dataset.state=o?"confirmed":"pending",a.classList.toggle("btn-success",o&&!t),a.classList.toggle("btn-outline-secondary",!o||t),a.disabled=t,a.setAttribute("aria-pressed",o?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function on(){return document.getElementById("edit-res-confirmed")?.value==="true"}function je(){return{index:st,items:ue}}function _e(e,t){st=typeof e=="number"?e:null,ue=Array.isArray(t)?[...t]:[]}function Na(){st=null,ue=[],Us()}function Di(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Ye(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ji(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),o=t?.projectId?String(t.projectId):"",c=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],r=[`<option value="">${Ye(a)}</option>`];c.forEach(l=>{r.push(`<option value="${Ye(l.id)}">${Ye(l.title||a)}</option>`)}),o&&!c.some(l=>String(l.id)===o)&&r.push(`<option value="${Ye(o)}">${Ye(s)}</option>`),n.innerHTML=r.join(""),o?n.value=o:n.value=""}function Fa(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&n.checked&&(n.checked=!1),n&&(n.disabled=!0,n.classList.add("disabled"));else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1),n&&(n.disabled=!1,n.classList.remove("disabled"))}rn("tax")}function rn(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const o=ne?.updateEditReservationSummary;typeof o=="function"&&o()};if(zt){a();return}zt=!0;const s=()=>{zt=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(me)),t.disabled){n.checked=!1,S(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),ie("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ie("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function Vn(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:o,ensureModal:c}={}){const{customers:r,projects:l}=W(),u=ta()?.[e];if(!u){S(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ne={...ne,reservation:u,projects:l||[]},t?.(),ji(l||[],u);const m=u.projectId&&l?.find?.(L=>String(L.id)===String(u.projectId))||null,{effectiveConfirmed:p,projectLinked:g}=Be(u,m),h=u.items?u.items.map(L=>({...L,equipmentId:L.equipmentId??L.equipment_id??L.id,barcode:K(L?.barcode)})):[];_e(e,h);const w=i("reservations.list.unknownCustomer","غير معروف"),v=r?.find?.(L=>String(L.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const f=document.getElementById("edit-res-customer");f&&(f.value=v?.customerName||w);const $=typeof a=="function"?a(u.start):{date:"",time:""},_=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",$.date),n?.("edit-res-start-time",$.time),n?.("edit-res-end",_.date),n?.("edit-res-end-time",_.time);const T=document.getElementById("edit-res-notes");T&&(T.value=u.notes||"");const b=document.getElementById("edit-res-discount");b&&(b.value=y(u.discount??0));const k=document.getElementById("edit-res-discount-type");k&&(k.value=u.discountType||"percent");const P=u.projectId?!1:!!u.applyTax,N=document.getElementById("edit-res-tax");N&&(N.checked=P);const V=document.getElementById("edit-res-company-share");if(V){const L=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,D=L!=null?Number.parseFloat(y(String(L).replace("%","").trim())):NaN,E=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,F=E!=null?E===!0||E===1||E==="1"||String(E).toLowerCase()==="true":Number.isFinite(D)&&D>0,G=F&&Number.isFinite(D)&&D>0?D:me,z=P||F;V.checked=z,V.dataset.companyShare=String(G)}sn(p,{disable:g});const A=document.getElementById("edit-res-paid");A&&(A.value=u.paid===!0||u.paid==="paid"?"paid":"unpaid"),zs((u.technicians||[]).map(L=>String(L))),s?.(h),Fa(),o?.();const q=document.getElementById("editReservationModal");an=Di(q,c),an?.show?.()}async function _i({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:o,handleReservationsMutation:c}={}){if(st===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const r=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",p=y(document.getElementById("edit-res-discount")?.value||"0"),g=parseFloat(p)||0,h=document.getElementById("edit-res-discount-type")?.value||"percent",w=on(),v=document.getElementById("edit-res-paid")?.value||"unpaid",x=document.getElementById("edit-res-project")?.value||"",f=Os(),$=document.getElementById("edit-res-company-share"),_=document.getElementById("edit-res-tax");if(!r||!d){S(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const T=typeof e=="function"?e:(H,Y)=>`${H}T${Y||"00:00"}`,b=T(r,l),k=T(d,u);if(b&&k&&new Date(b)>new Date(k)){S(i("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const N=ta()?.[st];if(!N){S(i("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ue)||ue.length===0&&f.length===0){S(i("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const H of ue){const Y=qe(H.barcode);if(Y!=="available"){S(He(Y));return}}const V=typeof t=="function"?t:()=>!1;for(const H of ue){const Y=K(H.barcode);if(V(Y,b,k,N.id??N.reservationId)){S(i("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const A=typeof n=="function"?n:()=>!1;for(const H of f)if(A(H,b,k,N.id??N.reservationId)){S(i("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const q=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:W().projects||[],L=x&&q.find(H=>String(H.id)===String(x))||null,D={...N,projectId:x?String(x):null,confirmed:w},{effectiveConfirmed:E,projectLinked:F,projectStatus:G}=Be(D,L);let z=!!$?.checked,j=!!_?.checked;if(F&&(z&&($.checked=!1,z=!1),j=!1),!F&&z!==j){S(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}j&&(ie("edit-res-company-share"),z=!!$?.checked);let M=z?getCompanySharePercent("edit-res-company-share"):null;z&&(!Number.isFinite(M)||M<=0)&&(ie("edit-res-company-share"),M=getCompanySharePercent("edit-res-company-share"));const ee=z&&j&&Number.isFinite(M)&&M>0,se=F?!1:j,fe=Gn(ue,g,h,se,f,{start:b,end:k});let X=N.status??"pending";F?X=L?.status??G??X:["completed","cancelled"].includes(String(X).toLowerCase())||(X=w?"confirmed":"pending");const ge=Wn({reservationCode:N.reservationCode??N.reservationId??null,customerId:N.customerId,start:b,end:k,status:X,title:N.title??null,location:N.location??null,notes:m,projectId:x?String(x):null,totalAmount:fe,discount:g,discountType:h,applyTax:se,paidStatus:v,confirmed:E,items:ue.map(H=>({...H,equipmentId:H.equipmentId??H.id})),technicians:f,companySharePercent:ee?M:null,companyShareEnabled:ee});try{const H=await Hs(N.id||N.reservationId,ge);await Vs(),S(i("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),Na(),c?.({type:"updated",reservation:H}),s?.(),o?.(),an?.hide?.()}catch(H){console.error("❌ [reservationsEdit] Failed to update reservation",H);const Y=Xn(H)?H.message:i("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");S(Y,"error")}}function Hi(e={}){ne={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ne,o=document.getElementById("edit-res-discount");o&&!o.dataset.listenerAttached&&(o.addEventListener("input",()=>{o.value=y(o.value),t?.()}),o.dataset.listenerAttached="true");const c=document.getElementById("edit-res-discount-type");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>t?.()),c.dataset.listenerAttached="true");const r=document.getElementById("edit-res-tax");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{rn("tax")}),r.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{rn("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-project");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{Fa();const h=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:W().projects||[],w=d.value&&h.find(_=>String(_.id)===String(d.value))||null,x={...ne?.reservation??{},projectId:d.value||null,confirmed:on()},{effectiveConfirmed:f,projectLinked:$}=Be(x,w);sn(f,{disable:$}),t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-confirmed-btn");u&&!u.dataset.listenerAttached&&(u.addEventListener("click",()=>{if(u.disabled)return;const h=!on();sn(h),t?.()}),u.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{_i(ne).catch(h=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",h)})}),m.dataset.listenerAttached="true");const p=document.getElementById("edit-res-equipment-barcode");if(p&&!p.dataset.listenerAttached){let h=null;const w=()=>{p.value?.trim()&&(clearTimeout(h),h=null,n?.(p))};p.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),w())});const v=()=>{if(clearTimeout(h),!p.value?.trim())return;const{start:x,end:f}=getEditReservationDateRange();!x||!f||(h=setTimeout(()=>{w()},150))};p.addEventListener("input",v),p.addEventListener("change",w),p.dataset.listenerAttached="true"}Pa?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{Na(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}function Vi(){return Ws().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=W()||{};Ks(e||[]),ma()})}function In(e=null){ma(),Ra(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Pi(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function cn(){return{populateEquipmentDescriptionLists:Ve,setFlatpickrValue:Li,splitDateTime:Kn,renderEditItems:De,updateEditReservationSummary:pe,addEquipmentByDescription:Bi,addEquipmentToEditingReservation:Ti,addEquipmentToEditingByDescription:It,combineDateTime:tt,hasEquipmentConflict:Se,hasTechnicianConflict:Qn,renderReservations:Ra,handleReservationsMutation:In,ensureModal:Pi}}function Ra(e="reservations-list",t=null){Ii({containerId:e,filters:t,onShowDetails:Ma,onConfirmReservation:Oa})}function Ma(e){return Ei(e,{getEditContext:cn,onEdit:(t,{reservation:n})=>{Ha(t,n)},onDelete:za})}function za(e){return Un()?window.confirm(i("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Qs(e,{onAfterChange:In}):!1:(Ls(),!1)}function Oa(e){return Gs(e,{onAfterChange:In})}function Ha(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",o)}Vn(e,cn());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",o)}Vn(e,cn());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const o=t.id??t.reservationId;n.set("reservationEditId",String(o));try{localStorage.setItem("pendingReservationEditId",String(o)),localStorage.removeItem("pendingReservationEditIndex")}catch(c){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",c)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(o){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",o)}}Ds({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(o=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",o)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Ui(){typeof window>"u"||(window.showReservationDetails=Ma,window.deleteReservation=za,window.confirmReservation=Oa,window.editReservation=Ha)}export{pa as a,Eo as b,Ui as c,zi as d,Hi as e,Oi as f,ma as g,cn as h,Mi as i,Q as j,In as k,Vi as l,Ra as r,Ma as s,pe as u};
