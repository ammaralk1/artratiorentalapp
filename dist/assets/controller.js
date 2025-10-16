import{d as X,n as q,t as i,h as k,z as ao,k as Ue,j as ea,B as ta,o as so,u as oo}from"./auth.js";import{n as G,D as ve,l as bn,o as io,p as it,q as na,t as ro,v as Ee,w as Ae,x as vn,y as lo,z as co,A as aa,h as sa,B as oa,C as uo,s as _t,i as ia,E as ra,F as mo,G as la,H as ca,f as da,I as po,g as ua,J as fo,K as go,u as ho,a as bo,L as vo,k as yo}from"./reservationsService.js";import{n as oe,s as ma,p as je,q as Ge,t as Bt,i as yn,r as Pe,v as wo,w as xo,g as So}from"./projectsService.js";const qo=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Io=new Set(["maintenance","reserved","retired"]);function Eo(e){const t=String(e??"").trim().toLowerCase();return t&&qo.get(t)||"available"}function Ao(e){return e?typeof e=="object"?e:jt(e):null}function ke(e){const t=Ao(e);return t?Eo(t.status||t.state||t.statusLabel||t.status_label):"available"}function pa(e){return!Io.has(ke(e))}function Re(e={}){return e.image||e.imageUrl||e.img||""}function ko(e){if(!e)return null;const t=G(e),{equipment:n=[]}=X();return(n||[]).find(a=>G(a?.barcode)===t)||null}function jt(e){const t=G(e);if(!t)return null;const{equipment:n=[]}=X();return(n||[]).find(a=>G(a?.barcode)===t)||null}let Wt=null,fa=[],Xt=new Map,Yt=new Map,It=new Map,Qt=!1;function Et(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function At(e){return q(String(e||"")).trim().toLowerCase()}function $o(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=q(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function ga(e){const t=q(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function We(e){switch(e){case"maintenance":return i("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return i("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return i("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return i("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function wn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function xn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function ha(e,t,{allowPartial:n=!1}={}){const a=oe(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const o=[];return e.forEach((r,l)=>{l.includes(a)&&o.push(r)}),o.length===1?o[0]:null}function Jt(e,t={}){return ha(Xt,e,t)}function Zt(e,t={}){return ha(Yt,e,t)}function Ve(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function ba(e){fa=Array.isArray(e)?[...e]:[]}function Sn(){return fa}function qn(e){return e&&Sn().find(t=>String(t.id)===String(e))||null}function Mn(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||i("projects.fallback.untitled","مشروع بدون اسم")}function Qe(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??ve,a=q(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:ve}function de(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??ve,a=q(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=ve),t.dataset.companyShare=String(s),t.checked=!0}function en(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Qt){W();return}Qt=!0;const a=()=>{Qt=!1,W()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(ve)),t.disabled){n.checked=!1,k(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),de()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?de():n.checked&&(n.checked=!1));a()}function Co(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function zn(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function On(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Ie({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=wn();if(!n||!a||!s)return;const o=bn()||[],r=i("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),l=i("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",r);const c=new Set;Xt=new Map;const d=o.filter(g=>g&&g.id!=null).map(g=>({id:String(g.id),label:On(g)||l})).filter(g=>{if(!g.label)return!1;const h=oe(g.label);return!h||c.has(h)?!1:(c.add(h),Xt.set(h,g),!0)}).sort((g,h)=>g.label.localeCompare(h.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(g=>`<option value="${Et(g.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",f=p?o.find(g=>String(g.id)===p):null;if(f){const g=On(f)||l;a.value=String(f.id),n.value=g,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function ct({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:o}=xn();if(!a||!s||!o)return;const r=Array.isArray(t)?t:Sn()||[],l=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",l);const c=[...r].filter(b=>b&&b.id!=null).sort((b,S)=>String(S.createdAt||S.start||"").localeCompare(String(b.createdAt||b.start||""))),d=n?"":a.value,u=i("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;Yt=new Map;const f=c.map(b=>{const S=Mn(b)||u;return{id:String(b.id),label:S}}).filter(b=>{if(!b.label)return!1;const S=oe(b.label);return!S||p.has(S)?!1:(p.add(S),Yt.set(S,b),!0)});o.innerHTML=f.map(b=>`<option value="${Et(b.label)}"></option>`).join("");const g=e?String(e):s.value?String(s.value):"",h=g?c.find(b=>String(b.id)===g):null;if(h){const b=Mn(h)||u;s.value=String(h.id),a.value=b,a.dataset.selectedId=String(h.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function kt(e,t,n){const{date:a,time:s}=na(n),o=document.getElementById(e),r=document.getElementById(t);if(o){if(a)if(o._flatpickr){const l=o._flatpickr.config?.dateFormat||"Y-m-d";o._flatpickr.setDate(a,!1,l)}else o.value=a;else o._flatpickr?o._flatpickr.clear():o.value="";o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0}))}if(r){if(s)if(r._flatpickr){const l=r._flatpickr.config?.dateFormat||"H:i";r._flatpickr.setDate(s,!1,l)}else r.value=s;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}}function va(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||ct({selectedValue:a});const o=(bn()||[]).find(u=>String(u.id)===String(e.clientId)),r=o?.id!=null?String(o.id):"";Ie(r?{selectedValue:r}:{selectedValue:"",resetInput:!0});const l=zn(e,"start"),c=zn(e,"end");l&&kt("res-start","res-start-time",l),c&&kt("res-end","res-end-time",c);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),Ke(),W()}function ya({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:X(),s=Array.isArray(a)?a:[];ba(s);const o=t!=null?String(t):n.value?String(n.value):"";ct({selectedValue:o,projectsList:s}),Ke(),W()}function Ke(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled"));else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1),n&&(n.disabled=!1,n.classList.remove("disabled"))}en("tax")}function In(){const{input:e,hidden:t}=xn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),o=s?Zt(s,{allowPartial:a}):null;if(o){t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id);const r=qn(o.id);r?va(r,{skipProjectSelectUpdate:!0}):(Ke(),W())}else t.value="",e.dataset.selectedId="",Ke(),W()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Zt(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function En(){const{input:e,hidden:t}=wn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),o=s?Jt(s,{allowPartial:a}):null;o?(t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id)):(t.value="",e.dataset.selectedId=""),W()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Jt(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function To(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),!n||!n.projectId)return;document.getElementById("res-project")&&(ct({selectedValue:String(n.projectId)}),Ke());const r=qn(n.projectId);if(r?va(r,{forceNotes:!!n.forceNotes}):W(),n.start&&kt("res-start","res-start-time",n.start),n.end&&kt("res-end","res-end-time",n.end),n.customerId){const c=(bn()||[]).find(d=>String(d.id)===String(n.customerId));c?.id!=null&&Ie({selectedValue:String(c.id)})}else Ie({selectedValue:""})}function dt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:it(e,n),end:it(t,a)}}function wa(e){const t=At(e);if(t){const l=It.get(t);if(l)return l}const{description:n,barcode:a}=ga(e);if(a){const l=jt(a);if(l)return l}const s=oe(n||e);if(!s)return null;let o=ra();if(!o?.length){const l=X();o=Array.isArray(l?.equipment)?l.equipment:[],o.length&&ca(o)}const r=o.find(l=>oe(l?.desc||l?.description||"")===s);return r||o.find(l=>oe(l?.desc||l?.description||"").includes(s))||null}function xa(e,t="equipment-description-options"){const n=At(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(c=>At(c.value)===n)||It.has(n))return!0;const{description:s}=ga(e);if(!s)return!1;const o=oe(s);return o?(ra()||[]).some(l=>oe(l?.desc||l?.description||"")===o):!1}const Lo={available:0,reserved:1,maintenance:2,retired:3};function Do(e){return Lo[e]??5}function Hn(e){switch(e){case"available":return i("reservations.equipment.status.available","متاح");case"reserved":return i("reservations.equipment.status.reserved","محجوز");case"maintenance":return i("reservations.equipment.status.maintenance","صيانة");case"retired":return i("reservations.equipment.status.retired","خارج الخدمة");default:return i("reservations.equipment.status.unknown","الحالة غير معروفة")}}function _o(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Hn(n)}`;const a=i("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Hn(n)})`}function Xe(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=ma(),a=X(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],o=Array.isArray(s)?s:[];ca(o);const r=new Map;o.forEach(d=>{const u=$o(d),p=At(u);if(!p||!u)return;const f=ke(d),g=Do(f),h=r.get(p);if(!h){r.set(p,{normalized:p,value:u,bestItem:d,bestStatus:f,bestPriority:g,statuses:new Set([f])});return}h.statuses.add(f),g<h.bestPriority&&(h.bestItem=d,h.bestStatus=f,h.bestPriority=g,h.value=u)}),It=new Map;const c=Array.from(r.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{It.set(d.normalized,d.bestItem);const u=_o(d),p=Et(d.value);if(u===d.value)return`<option value="${p}"></option>`;const f=Et(u);return`<option value="${p}" label="${f}"></option>`}).join("");e&&(e.innerHTML=c),t&&(t.innerHTML=c)}function Bo(e,t){const n=G(e);if(!n)return!1;const{start:a,end:s}=dt();if(!a||!s)return k(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(Ee().some(d=>G(d.barcode)===n))return k(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(Ae(n,a,s))return k(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const r=jt(n);if(!r)return k(i("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1;const l=ke(r);if(l!=="available")return k(We(l)),!1;const c=Ge(r);return c?(vn({id:c,equipmentId:c,barcode:n,desc:r.desc,qty:1,price:r.price,image:Re(r)}),t&&(t.value=""),$e(),W(),k(i("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(k(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")),!1)}function tn(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=wa(t);if(!n){k(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=ko(n.barcode),s=ke(a||n);if(s!=="available"){k(We(s));return}const o=G(n.barcode);if(!o){k(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r=Ge(n);if(!r){k(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const l={id:r,equipmentId:r,barcode:o,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Re(n)},{start:c,end:d}=dt();if(!c||!d){k(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(Ee().some(f=>G(f.barcode)===o)){k(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(Ae(o,c,d)){k(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}vn(l),$e(),W(),e.value=""}function jo(){Xe();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),tn(e))});const t=()=>{xa(e.value,"equipment-description-options")&&tn(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function $e(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Ee(),a=i("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=i("reservations.create.summary.currency","SR"),o=i("reservations.create.equipment.imageAlt","صورة"),r=i("reservations.equipment.actions.increase","زيادة الكمية"),l=i("reservations.equipment.actions.decrease","تقليل الكمية"),c=i("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=je(n);t.innerHTML=d.map(u=>{const p=u.items[0]||{},f=Re(p)||u.image,g=f?`<img src="${f}" alt="${o}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',h=q(String(u.count)),b=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,S=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):b*u.count,x=`${q(b.toFixed(2))} ${s}`,m=`${q(S.toFixed(2))} ${s}`,R=u.barcodes.map(F=>q(String(F||""))).filter(Boolean),L=R.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${R.map(F=>`<li>${F}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${g}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${L}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${l}">−</button>
              <span class="reservation-qty-value">${h}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${r}">+</button>
            </div>
          </td>
          <td>${x}</td>
          <td>${m}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Po(e){const t=Ee(),a=je(t).find(o=>o.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(lo(s),$e(),W())}function Ro(e){const t=Ee(),n=t.filter(a=>Bt(a)!==e);n.length!==t.length&&(la(n),$e(),W())}function No(e){const t=Ee(),a=je(t).find(p=>p.key===e);if(!a)return;const{start:s,end:o}=dt();if(!s||!o){k(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const r=new Set(t.map(p=>G(p.barcode))),{equipment:l=[]}=X(),c=(l||[]).find(p=>{const f=G(p?.barcode);return!f||r.has(f)||Bt({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!pa(p)?!1:!Ae(f,s,o)});if(!c){k(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=G(c.barcode),u=Ge(c);if(!u){k(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}vn({id:u,equipmentId:u,barcode:d,desc:c.desc||c.description||c.name||a.description||"",qty:1,price:Number.isFinite(Number(c.price))?Number(c.price):a.unitPrice,image:Re(c)}),$e(),W()}function W(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(q(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),o=a?!1:s?.checked||!1,r=document.getElementById("res-payment-status")?.value||"unpaid",{start:l,end:c}=dt();o&&de();const d=Qe(),u=document.getElementById("res-payment-status");Ve(u,r),io({selectedItems:Ee(),discount:t,discountType:n,applyTax:o,paidStatus:r,start:l,end:c,companySharePercent:d})}function Fo(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",o=>{o.target.value=q(o.target.value),W()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",W),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{en("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{en("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{Ve(s),W()}),s.dataset.listenerAttached="true"),Ve(s)}function Mo(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){W();return}const o=t.dataset.syncedWithStart;(!t.value?.trim()||o!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),W()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Un(){const{input:e,hidden:t}=wn(),{input:n,hidden:a}=xn(),{customers:s}=X();let o=t?.value?String(t.value):"";if(!o&&e?.value){const w=Jt(e.value,{allowPartial:!0});w&&(o=String(w.id),t&&(t.value=o),e.value=w.label,e.dataset.selectedId=o)}const r=s.find(w=>String(w.id)===o);if(!r){k(i("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const l=r.id;let c=a?.value?String(a.value):"";if(!c&&n?.value){const w=Zt(n.value,{allowPartial:!0});w&&(c=String(w.id),a&&(a.value=c),n.value=w.label,n.dataset.selectedId=c)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){k(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const g=`${d}T${p}`,h=`${u}T${f}`,b=new Date(g),S=new Date(h);if(Number.isNaN(b.getTime())||Number.isNaN(S.getTime())||b>=S){k(i("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const x=co(),m=Ee();if(m.length===0&&x.length===0){k(i("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const R=document.getElementById("res-notes")?.value||"",L=parseFloat(q(document.getElementById("res-discount")?.value))||0,F=document.getElementById("res-discount-type")?.value||"percent",y=document.getElementById("res-payment-status")?.value||"unpaid",I=c?qn(c):null,_=Co(I);if(c&&!I){k(i("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const w of m){const P=ke(w.barcode);if(P!=="available"){k(We(P));return}}for(const w of m){const P=G(w.barcode);if(Ae(P,g,h)){k(i("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const w of x)if(aa(w,g,h)){k(i("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const $=document.getElementById("res-tax"),N=document.getElementById("res-company-share"),v=!!c,j=v?!1:$?.checked||!1,B=!!N?.checked;if(!v&&B!==j){k(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let D=B?Qe():null;B&&(!Number.isFinite(D)||D<=0)&&(de(),D=Qe());const z=B&&j&&Number.isFinite(D)&&D>0;j&&de();const M=sa(m,L,F,j,x,{start:g,end:h,companySharePercent:z?D:0}),O=ao(),K=oa({reservationCode:O,customerId:l,start:g,end:h,status:_?"confirmed":"pending",title:null,location:null,notes:R,projectId:c||null,totalAmount:M,discount:L,discountType:F,applyTax:j,paidStatus:y,confirmed:_,items:m.map(w=>({...w,equipmentId:w.equipmentId??w.id})),technicians:x,companySharePercent:z?D:null,companyShareEnabled:z});try{const w=await uo(K);ma(),Xe(),_t(),zo(),k(i("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Wt=="function"&&Wt({type:"created",reservation:w})}catch(w){console.error("❌ [reservations/createForm] Failed to create reservation",w);const P=ia(w)?w.message:i("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");k(P,"error")}}function zo(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Ie({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),o=document.getElementById("res-project-input");s&&(s.value=""),o&&(o.value="",o.dataset.selectedId=""),ct({selectedValue:"",resetInput:!0});const r=document.getElementById("equipment-description");r&&(r.value="");const l=document.getElementById("res-payment-status");l&&(l.value="unpaid",Ve(l,"unpaid")),mo(),la([]),$e(),Ke(),W()}function Oo(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Po(s);return}if(a==="increase-group"&&s){No(s);return}if(a==="remove-group"&&s){Ro(s);return}}),e.dataset.listenerAttached="true")}function Ho(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Bo(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim())return;const{start:o,end:r}=dt();!o||!r||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Uo(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Un()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Un()}),t.dataset.listenerAttached="true")}function xr({onAfterSubmit:e}={}){Wt=typeof e=="function"?e:null;const{customers:t,projects:n}=X();ro(t||[]),Ie(),En(),ba(n||[]),ya({projectsList:n}),In(),Xe(),jo(),Mo(),Fo(),Oo(),Ho(),Uo(),To(),W(),$e()}function Sa(){Xe(),ya(),Ie(),En(),In(),$e(),W()}if(typeof document<"u"){const e=()=>{Ie(),ct({projectsList:Sn()}),En(),In(),W()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}typeof window<"u"&&(window.getCompanySharePercent=Qe);function qa(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:_e(t),endDate:_e(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const o=new Date(n);return o.setDate(n.getDate()+6),{startDate:_e(n),endDate:_e(o)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:_e(n),endDate:_e(a)}}return e==="upcoming"?{startDate:_e(t),endDate:""}:{startDate:"",endDate:""}}function Vo(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let o=q(t?.value||"").trim(),r=q(n?.value||"").trim(),l=a?.value||"";if(new Set(["","today","week","month"]).has(l)||(l="",a&&(a.value=""),$t(t),$t(n),o="",r=""),!o&&!r&&l){const d=qa(l);o=d.startDate,r=d.endDate}return{searchTerm:oe(e?.value||""),startDate:o,endDate:r,status:s?.value||"",quickRange:l}}function Sr(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=q(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),s.dataset.listenerAttached="true");const o=document.getElementById("reservation-date-range");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>{Qo(o.value),t()}),o.dataset.listenerAttached="true");const r=document.getElementById("reservation-status-filter");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",t),r.dataset.listenerAttached="true");const l=document.getElementById("clear-filters");l&&!l.dataset.listenerAttached&&(l.addEventListener("click",()=>{n&&(n.value=""),$t(a),$t(s),o&&(o.value=""),r&&(r.value=""),t()}),l.dataset.listenerAttached="true")}function Qo(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=qa(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function _e(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function $t(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function yt(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Ko(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Go(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Ko(n);if(a!==null)return a}return null}function Vn(e,t=0){const n=Go(e);if(n!=null)return n;const a=yt(e.createdAt??e.created_at);if(a!=null)return a;const s=yt(e.updatedAt??e.updated_at);if(s!=null)return s;const o=yt(e.start);if(o!=null)return o;const r=yt(e.end);if(r!=null)return r;const l=Number(e.id??e.reservationId);return Number.isFinite(l)?l:Number.isFinite(t)?t:0}function Wo({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const o=e.map((m,R)=>({reservation:m,index:R})),r=t.searchTerm||"",l=t.searchReservationId||"",c=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",f=t.status||"",g=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,h=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,b=u?new Date(`${u}T00:00:00`):null,S=p?new Date(`${p}T23:59:59`):null,x=o.filter(({reservation:m})=>{const R=n.get(String(m.customerId)),L=s?.get?.(String(m.projectId)),F=m.start?new Date(m.start):null,y=yn(m),{effectiveConfirmed:I}=Pe(m,L);if(g!=null&&String(m.customerId)!==String(g)||h!=null&&!(Array.isArray(m.technicians)?m.technicians.map(j=>String(j)):[]).includes(String(h))||f==="confirmed"&&!I||f==="pending"&&I||f==="completed"&&!y||b&&F&&F<b||S&&F&&F>S)return!1;if(l){const v=[m.reservationId,m.id,m.reservation_id,m.reservationCode,m.reservation_code,m.code,m.reference,m.referenceNumber,m.reference_number],j=oe(v.filter(D=>D!=null&&D!=="").map(String).join(" ")).replace(/\s+/g,""),B=l.replace(/\s+/g,"");if(!j.includes(B))return!1}if(c&&!oe(R?.customerName||"").includes(c))return!1;if(d){const v=[m.projectId,m.project_id,m.projectID,L?.id,L?.projectCode,L?.project_code],j=oe(v.filter(D=>D!=null&&D!=="").map(String).join(" ")).replace(/\s+/g,""),B=d.replace(/\s+/g,"");if(!j.includes(B))return!1}if(!r)return!0;const _=m.items?.map?.(v=>`${v.barcode} ${v.desc}`).join(" ")||"",$=(m.technicians||[]).map(v=>a.get(String(v))?.name).filter(Boolean).join(" ");return oe([m.reservationId,R?.customerName,m.notes,_,$,L?.title].filter(Boolean).join(" ")).includes(r)});return x.sort((m,R)=>{const L=Vn(m.reservation,m.index),F=Vn(R.reservation,R.index);return L!==F?F-L:R.index-m.index}),x}function Xo({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=i("reservations.create.summary.currency","SR"),o=i("reservations.list.taxIncludedShort","(شامل الضريبة)"),r=i("reservations.list.unknownCustomer","غير معروف"),l=i("reservations.list.noNotes","لا توجد ملاحظات"),c=i("reservations.list.itemsCountShort","{count} عنصر"),d=i("reservations.list.crew.separator","، "),u=i("reservations.list.status.confirmed","✅ مؤكد"),p=i("reservations.list.status.pending","⏳ غير مؤكد"),f=i("reservations.list.payment.paid","💳 مدفوع"),g=i("reservations.list.payment.unpaid","💳 غير مدفوع"),h=i("reservations.list.actions.confirm","✔️ تأكيد"),b=i("reservations.list.project.unlinked","غير مرتبط بمشروع"),S=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),x={client:i("reservations.list.labels.client","👤 العميل"),project:i("reservations.list.labels.project","📁 المشروع"),start:i("reservations.list.labels.start","🗓️ بداية الحجز"),end:i("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:i("reservations.list.labels.cost","💵 التكلفة"),equipment:i("reservations.list.labels.equipment","📦 المعدات"),crew:i("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:m,index:R})=>{const L=t.get(String(m.customerId)),F=m.projectId?a?.get?.(String(m.projectId)):null,y=yn(m),I=m.paid===!0||m.paid==="paid",{effectiveConfirmed:_,projectLinked:$}=Pe(m,F),N=_?"status-confirmed":"status-pending",v=I?"status-paid":"status-unpaid";let j=`<span class="reservation-chip status-chip ${N}">${_?u:p}</span>`,B=`<span class="reservation-chip status-chip ${v}">${I?f:g}</span>`,D=I?" tile-paid":" tile-unpaid";y&&(D+=" tile-completed");let z="";y&&(j=`<span class="reservation-chip status-chip status-completed">${u}</span>`,B=`<span class="reservation-chip status-chip status-completed">${I?f:g}</span>`,z=` data-completed-label="${i("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const M=!$&&!_?`<button class="tile-confirm" data-reservation-index="${R}" data-action="confirm">${h}</button>`:"",O=M?`<div class="tile-actions">${M}</div>`:"",K=m.items?.length||0,w=(m.technicians||[]).map(Ce=>n.get(String(Ce))).filter(Boolean),P=w.map(Ce=>Ce.name).join(d)||"—",H=q(String(m.reservationId??"")),Y=m.start?q(Ue(m.start)):"-",Z=m.end?q(Ue(m.end)):"-",ie=q(String(m.cost??0)),J=q(String(K)),ue=m.notes?q(m.notes):l,V=c.replace("{count}",J),ee=m.applyTax?`<small>${o}</small>`:"";let pe=b;return m.projectId&&(pe=F?.title?q(F.title):S),`
      <div class="${M?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${D}"${z} data-reservation-index="${R}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${H}</div>
          <div class="tile-badges">
            ${j}
            ${B}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${x.client}</span>
            <span class="tile-value">${L?.customerName||r}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.project}</span>
            <span class="tile-value">${pe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.start}</span>
            <span class="tile-value tile-inline">${Y}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.end}</span>
            <span class="tile-value tile-inline">${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.cost}</span>
            <span class="tile-value">${ie} ${s} ${ee}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.equipment}</span>
            <span class="tile-value">${V}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.crew}</span>
            <span class="tile-value">${w.length?P:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${ue}</span>
          </div>
        </div>
        ${O}
      </div>
    `}).join("")}function Se(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Yo(e,t,n=[],a,s=null){const{projectLinked:o,effectiveConfirmed:r}=Pe(e,s),l=e.paid===!0||e.paid==="paid",c=yn(e),d=e.items||[],u=je(d),{technicians:p=[]}=X(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(p)?p:[]),g=new Map;f.forEach(T=>{if(!T||T.id==null)return;const Q=String(T.id),te=g.get(Q)||{};g.set(Q,{...te,...T})});const h=(e.technicians||[]).map(T=>g.get(String(T))).filter(Boolean),b=ea(),S=da(e.start,e.end),x=(T={})=>{const Q=[T.dailyWage,T.daily_rate,T.dailyRate,T.wage,T.rate];for(const te of Q){if(te==null)continue;const fe=parseFloat(q(String(te)));if(Number.isFinite(fe))return fe}return 0},m=(T={})=>{const Q=[T.dailyTotal,T.daily_total,T.totalRate,T.total,T.total_wage];for(const te of Q){if(te==null)continue;const fe=parseFloat(q(String(te)));if(Number.isFinite(fe))return fe}return x(T)},L=d.reduce((T,Q)=>T+(Q.qty||1)*(Q.price||0),0)*S,F=h.reduce((T,Q)=>T+x(Q),0),y=h.reduce((T,Q)=>T+m(Q),0),I=F*S,_=y*S,$=L+_,N=parseFloat(e.discount)||0,v=e.discountType==="amount"?N:$*(N/100),j=Math.max(0,$-v),B=o?!1:e.applyTax,D=Number(e.cost),z=Number.isFinite(D),M=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,O=M!=null?parseFloat(q(String(M))):NaN;let P=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(O)&&O>0)&&Number.isFinite(O)?O:0;B&&P<=0&&(P=ve);let H=P>0?Math.max(0,j*(P/100)):0;const Y=j+H,Z=B?Y*.15:0,ie=Number.isFinite(Z)&&Z>0?Number(Z.toFixed(2)):0,J=Y+ie,ue=Number.isFinite(J)?Number(J.toFixed(2)):0,V=o?ue:z?D:ue;P>0&&(H=Number(Math.max(0,j*(P/100)).toFixed(2)));const ee=q(String(e.reservationId??e.id??"")),pe=e.start?q(Ue(e.start)):"-",mt=e.end?q(Ue(e.end)):"-",Ce=q(String(h.length)),pt=q(L.toFixed(2)),ft=q(v.toFixed(2)),Oe=q(j.toFixed(2)),gt=q(ie.toFixed(2)),Nt=q((Number.isFinite(V)?V:0).toFixed(2)),Ft=q(String(S)),ne=i("reservations.create.summary.currency","SR"),ht=i("reservations.details.labels.discount","الخصم"),we=i("reservations.details.labels.tax","الضريبة (15%)"),Mt=i("reservations.details.labels.crewTotal","إجمالي الفريق"),zt=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),Te=i("reservations.details.labels.duration","عدد الأيام"),Ye=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Je=i("reservations.details.labels.netProfit","💵 صافي الربح"),Ot=i("reservations.create.equipment.imageAlt","صورة"),re={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},Ht=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),U=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),ae=i("reservations.details.technicians.roleUnknown","غير محدد"),Le=i("reservations.details.technicians.phoneUnknown","غير متوفر"),rs=i("reservations.details.technicians.wage","{amount} {currency} / اليوم"),ls=i("reservations.list.status.confirmed","✅ مؤكد"),cs=i("reservations.list.status.pending","⏳ غير مؤكد"),ds=i("reservations.list.payment.paid","💳 مدفوع"),us=i("reservations.list.payment.unpaid","💳 غير مدفوع"),ms=i("reservations.list.status.completed","📁 منتهي"),ps=i("reservations.details.labels.id","🆔 رقم الحجز"),fs=i("reservations.details.section.bookingInfo","بيانات الحجز"),gs=i("reservations.details.section.paymentSummary","ملخص الدفع"),hs=i("reservations.details.labels.finalTotal","المجموع النهائي"),bs=i("reservations.details.section.crew","😎 الفريق الفني"),vs=i("reservations.details.crew.count","{count} عضو"),ys=i("reservations.details.section.items","📦 المعدات المرتبطة"),ws=i("reservations.details.items.count","{count} عنصر"),xs=i("reservations.details.actions.edit","✏️ تعديل"),Ss=i("reservations.details.actions.delete","🗑️ حذف"),qs=i("reservations.details.labels.customer","العميل"),Is=i("reservations.details.labels.contact","رقم التواصل"),Es=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const As=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),ks=i("reservations.details.actions.openProject","📁 فتح المشروع"),$s=i("reservations.details.labels.start","بداية الحجز"),Cs=i("reservations.details.labels.end","نهاية الحجز"),Ts=i("reservations.details.labels.notes","ملاحظات"),Ls=i("reservations.list.noNotes","لا توجد ملاحظات"),Ds=i("reservations.details.labels.itemsCount","عدد المعدات"),_s=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),Bs=i("reservations.details.labels.paymentStatus","حالة الدفع"),js=i("reservations.list.unknownCustomer","غير معروف"),Bn=l?ds:us,Ps=u.reduce((T,Q)=>T+(Number(Q.quantity)||0),0),Rs=q(String(Ps)),jn=ws.replace("{count}",Rs),Ns=vs.replace("{count}",Ce),Fs=e.notes?q(e.notes):Ls,Ms=q(_.toFixed(2)),zs=q(String(P)),Os=q(H.toFixed(2)),Hs=`${zs}% (${Os} ${ne})`,Us=Math.max(0,L+_-v),Pn=Math.max(0,Us-I),Vs=q(Pn.toFixed(2)),xe=[{icon:"💳",label:Bs,value:Bn},{icon:"📦",label:Ds,value:jn},{icon:"⏱️",label:Te,value:Ft},{icon:"💼",label:_s,value:`${pt} ${ne}`}];xe.push({icon:"😎",label:Mt,value:`${Ms} ${ne}`}),v>0&&xe.push({icon:"💸",label:ht,value:`${ft} ${ne}`}),xe.push({icon:"📊",label:zt,value:`${Oe} ${ne}`}),B&&ie>0&&xe.push({icon:"🧾",label:we,value:`${gt} ${ne}`}),P>0&&xe.push({icon:"🏦",label:Ye,value:Hs}),Math.abs(Pn-(V??0))>.009&&xe.push({icon:"💵",label:Je,value:`${Vs} ${ne}`}),xe.push({icon:"💰",label:hs,value:`${Nt} ${ne}`});const Qs=xe.map(({icon:T,label:Q,value:te})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${T} ${Q}</span>
      <span class="summary-details-value">${te}</span>
    </div>
  `).join(""),Rn=[{text:r?ls:cs,className:r?"status-confirmed":"status-pending"},{text:Bn,className:l?"status-paid":"status-unpaid"}];c&&Rn.push({text:ms,className:"status-completed"});const Ks=Rn.map(({text:T,className:Q})=>`<span class="status-chip ${Q}">${T}</span>`).join(""),Ze=(T,Q,te)=>`
    <div class="res-info-row">
      <span class="label">${T} ${Q}</span>
      <span class="value">${te}</span>
    </div>
  `;let Ut="";if(e.projectId){let T=Se(As);if(s){const Q=s.title||i("projects.fallback.untitled","مشروع بدون اسم");T=`${Se(Q)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Se(ks)}</button>`}Ut=`
      <div class="res-info-row">
        <span class="label">📁 ${Es}</span>
        <span class="value">${T}</span>
      </div>
    `}const De=[];De.push(Ze("👤",qs,t?.customerName||js)),De.push(Ze("📞",Is,t?.phone||"—")),De.push(Ze("🗓️",$s,pe)),De.push(Ze("🗓️",Cs,mt)),De.push(Ze("📝",Ts,Fs)),Ut&&De.push(Ut);const Gs=De.join(""),Ws=u.length?u.map(T=>{const Q=T.items[0]||{},te=Re(Q)||T.image,fe=te?`<img src="${te}" alt="${Ot}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',bt=Number(T.quantity)||Number(T.count)||0,vt=q(String(bt)),Nn=Number.isFinite(Number(T.unitPrice))?Number(T.unitPrice):0,Zs=Number.isFinite(Number(T.totalPrice))?Number(T.totalPrice):Nn*bt,eo=`${q(Nn.toFixed(2))} ${ne}`,to=`${q(Zs.toFixed(2))} ${ne}`,Fn=T.barcodes.map(Vt=>q(String(Vt||""))).filter(Boolean),no=Fn.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Fn.map(Vt=>`<li>${Vt}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${fe}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Se(Q.desc||Q.description||Q.name||T.description||"-")}</div>
                  ${no}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Se(re.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${vt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Se(re.unitPrice)}">${eo}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Se(re.total)}">${to}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Se(re.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Ht}</td></tr>`,Xs=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${re.item}</th>
            <th>${re.quantity}</th>
            <th>${re.unitPrice}</th>
            <th>${re.total}</th>
            <th>${re.actions}</th>
          </tr>
        </thead>
        <tbody>${Ws}</tbody>
      </table>
    </div>
  `,Ys=h.map((T,Q)=>{const te=q(String(Q+1)),fe=T.role||ae,bt=T.phone||Le,vt=T.wage?rs.replace("{amount}",q(String(T.wage))).replace("{currency}",ne):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${te}</span>
          <span class="technician-name">${T.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${fe}</div>
          <div>📞 ${bt}</div>
          ${vt?`<div>💰 ${vt}</div>`:""}
        </div>
      </div>
    `}).join(""),Js=h.length?`<div class="reservation-technicians-grid">${Ys}</div>`:`<ul class="reservation-modal-technicians"><li>${U}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${ps}</span>
          <strong>${ee}</strong>
        </div>
        <div class="status-chips">
          ${Ks}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${fs}</h6>
          ${Gs}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${gs}</h6>
            <div class="summary-details">
              ${Qs}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${bs}</span>
          <span class="count">${Ns}</span>
        </div>
        ${Js}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${ys}</span>
          <span class="count">${jn}</span>
        </div>
        ${Xs}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${i("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${xs}</button>
        ${b?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Ss}</button>`:""}
      </div>
    </div>
  `}const Jo=`@page {
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
  font-family: 'Tajawal', 'Arial', 'Tahoma', sans-serif;
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
  #quotation-pdf-root[data-quote-render-context="preview"] .quote-section--financial {
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
  table-layout: fixed;
  font-size: 12px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background-color: #ffffff !important;
  direction: rtl;
  text-align: center;
  page-break-inside: auto;
  word-break: break-word;
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
  padding: 9px 6px;
}

.quote-table tbody tr:last-child td {
  border-bottom: 1.5px solid rgba(148, 163, 184, 0.7);
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
  font-family: 'Tajawal', 'Arial', 'Tahoma', sans-serif;
  font-size: 13px;
  line-height: 1.85;
  letter-spacing: normal;
  white-space: pre-wrap;
  word-break: normal;
  overflow-wrap: anywhere;
  line-break: normal;
  unicode-bidi: plaintext;
  font-feature-settings: 'liga' 1, 'rlig' 1;
  font-kerning: normal;
  text-align: right;
}

.quote-notes img[data-quote-note-image] {
  width: 100%;
  height: auto;
  display: block;
  border-radius: inherit;
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
`,Ia="reservations.quote.sequence",nn="reservations.quote.togglePrefs.v1",Ea="https://help.artratio.sa/guide/quote-preview",ge={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Zo=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],ce=[...Zo];function an(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...ce]}function ei(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=an(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=an(t.value);if(a.length)return a}const n=ce.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...ce]}const Pt=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Aa=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(q(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>E(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>E(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>E(q(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>E(q(Number(e?.price||0).toFixed(2)))}],ka=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(q(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>E(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>E(e?.role||i("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>E(e?.phone||i("reservations.details.technicians.phoneUnknown","غير متوفر"))}],An={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Aa.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:ka.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},$a=new Set(Pt.map(({id:e})=>e)),Ca=Object.fromEntries(Object.entries(An).map(([e,t=[]])=>[e,new Set(t.map(n=>n.id))]));function Ta(e){switch(e){case"export":return i("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return i("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const ti="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",ni="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",ai="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",si=Jo.trim(),oi=/color\([^)]*\)/gi,Ct=/(color\(|color-mix\()/i,ii=document.createElement("canvas"),wt=ii.getContext("2d"),La=/^data:image\/svg\+xml/i,ri=/\.svg($|[?#])/i,at=512,sn="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Da=96,_a=25.4,on=210,xt=297,St=Math.round(on/_a*Da),qt=Math.round(xt/_a*Da),li=2,Ba=/safari/i,ci=/(iphone|ipad|ipod)/i,Qn=/(iphone|ipad|ipod)/i,di=/(crios|fxios|edgios|opios)/i,Tt="[reservations/pdf]";let C=null,A=null,me=1,et=null,tt=null,qe=null,He=null,st=!1;function Be(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!C?.statusIndicator||!C?.statusText)return;C.statusKind=e;const o=t||Ta(e);C.statusText.textContent=o,C.statusSpinner&&(C.statusSpinner.hidden=!s),C.statusAction&&(C.statusAction.hidden=!0,C.statusAction.onclick=null,n&&typeof a=="function"&&(C.statusAction.textContent=n,C.statusAction.hidden=!1,C.statusAction.onclick=r=>{r.preventDefault(),a()})),C.statusIndicator.hidden=!1,requestAnimationFrame(()=>{C.statusIndicator.classList.add("is-visible")})}function ot(e){!C?.statusIndicator||!C?.statusText||(C.statusKind=null,C.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{C?.statusIndicator&&(C.statusIndicator.hidden=!0,C.statusAction&&(C.statusAction.hidden=!0,C.statusAction.onclick=null),C.statusSpinner&&(C.statusSpinner.hidden=!1))},220))}function rn(){return!!window?.bootstrap?.Modal}function ui(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),qe||(qe=document.createElement("div"),qe.className="modal-backdrop fade show",qe.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(qe)),He||(He=t=>{t.key==="Escape"&&ln(e)},document.addEventListener("keydown",He));try{e.focus({preventScroll:!0})}catch{}}}function ln(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),qe&&(qe.remove(),qe=null),He&&(document.removeEventListener("keydown",He),He=null))}function mi(e){if(e){if(rn()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}ui(e)}}function pi(){if(st)return;st=!0;const e=i("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=i("reservations.quote.toast.retry","إعادة المحاولة"),n=i("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!C?.modal?.classList.contains("show"),s=()=>{C?.modal?.classList.contains("show")&&(Be("render"),st=!1,Ne())};ta({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Ea}),a&&Be("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function kn(){const e={};return Object.entries(An).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function ja(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function fi(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Pa(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Ra(){return Object.fromEntries(Pt.map(({id:e})=>[e,!1]))}function $n(e,t){return e.sectionExpansions||(e.sectionExpansions=Ra()),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function gi(e,t){return $n(e,t)?.[t]!==!1}function Cn(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function hi(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return ci.test(e)}function bi(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Ba.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Na(){return hi()&&bi()}function Rt(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Qn.test(e)||Qn.test(t),s=/Macintosh/i.test(e)&&n>1;return Ba.test(e)&&!di.test(e)&&(a||s)}function Kt(e,...t){try{console.log(`${Tt} ${e}`,...t)}catch{}}function be(e,...t){try{console.warn(`${Tt} ${e}`,...t)}catch{}}function vi(e,t,...n){try{t?console.error(`${Tt} ${e}`,t,...n):console.error(`${Tt} ${e}`,...n)}catch{}}function le(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function yi(e,t="لا توجد بيانات للعرض."){const n=E(i(e,t));return le(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Kn(e,t){return Array.isArray(e)&&e.length?e:[yi(t)]}function cn(e,t="#000"){if(!wt||!e)return t;try{return wt.fillStyle="#000",wt.fillStyle=e,wt.fillStyle||t}catch{return t}}function wi(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=cn(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}const xi=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Fa(e=""){return xi.test(e)}function Si(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(o,...r){if(typeof o!="string"||!Fa(o))return a.call(this,o,...r);let l,c=!1;try{"direction"in this&&(l=this.direction,l!=="rtl"&&(this.direction="rtl"),c=!0)}catch{}try{if(!c){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,o,...r)}finally{if(c&&l!==void 0&&l!=="rtl")try{this.direction=l}catch{}else if(!c){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Ma(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(oi,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const qi=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function za(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;qi.forEach(r=>{const l=s[r];if(l&&Ct.test(l)){const c=r.replace(/[A-Z]/g,p=>`-${p.toLowerCase()}`),d=r==="backgroundColor"?"#ffffff":s.color||"#000000",u=cn(l,d);a.style.setProperty(c,u,"important")}});const o=s.backgroundImage;if(o&&Ct.test(o)){const r=cn(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",r,"important")}})}function Oa(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(o=>{const r=a[o];if(r&&Ct.test(r)){const l=o.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),c=o==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(l,c,"important")}});const s=a.backgroundImage;s&&Ct.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function Gn(e,t=at){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Ii(e){if(!e)return{width:at,height:at};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Gn(t,0):0,s=n?Gn(n,0):0;if(a>0&&s>0)return{width:a,height:s};const o=e.getAttribute?.("viewBox");if(o){const r=o.trim().split(/[\s,]+/).map(l=>parseFloat(l||"0"));if(r.length>=4){const[,,l,c]=r;a=a||(Number.isFinite(l)&&l>0?l:0),s=s||(Number.isFinite(c)&&c>0?c:0)}}return{width:a||at,height:s||at}}function Ha(e=""){return typeof e!="string"?!1:La.test(e)||ri.test(e)}function Ei(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Ai(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=o=>{const r=o?.message||`Unable to load image from ${e}`;a(new Error(r))},s.src=e})}async function Ua(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const o=await Ai(s),r=n.createElement("canvas"),l=Math.max(t.width||o.naturalWidth||o.width||0,1),c=Math.max(t.height||o.naturalHeight||o.height||l,1);r.width=l,r.height=c;const d=r.getContext("2d");return d.clearRect(0,0,l,c),d.drawImage(o,0,0,l,c),r.toDataURL("image/png")}catch(o){return console.warn("[reservations/pdf] failed to rasterize SVG content",o),null}finally{URL.revokeObjectURL(s)}}async function ki(e){if(!e)return null;if(La.test(e))return Ei(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function $i(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Ha(t))return!1;const n=await ki(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",sn),!1;const a=await Ua(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",sn),!1)}async function Ci(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Ii(e),s=await Ua(n,a),r=(e.ownerDocument||document).createElement("img");r.setAttribute("src",s||sn),r.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),r.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&r.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&r.setAttribute("style",e.getAttribute("style"));const l=e.getAttribute("width"),c=e.getAttribute("height");return l&&r.setAttribute("width",l),c&&r.setAttribute("height",c),e.parentNode?.replaceChild(r,e),!!s}async function Va(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Ha(s.getAttribute?.("src"))&&a.push($i(s))}),n.forEach(s=>{a.push(Ci(s))}),a.length&&await Promise.allSettled(a)}function Ti(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const o=(w,P=0)=>{const H=parseFloat(w);return Number.isFinite(H)?H:P},r=o(s.paddingTop),l=o(s.paddingBottom),c=o(s.paddingRight),d=o(s.paddingLeft),u=o(s.borderRadius),p=o(s.fontSize,14),f=(()=>{const w=s.lineHeight;if(!w||w==="normal")return p*1.6;const P=o(w,p*1.6);return P>0?P:p*1.6})(),g=Math.max(e.clientWidth||0,e.scrollWidth||0,o(s.width,0));if(g<=0)return null;const h=Math.max(1,g-d-c),b=e.textContent||"",S=b.split(/\r?\n/),x=n.createElement("canvas"),m=x.getContext("2d");if(!m)return null;const R=s.fontStyle||"normal",L=s.fontVariant||"normal",F=s.fontWeight||"400",y=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",_=w=>w.join(" "),$=[],N=w=>m.measureText(w).width;m.font=`${R} ${L} ${F} ${I} ${p}px ${y}`,S.forEach(w=>{const P=w.trim();if(P.length===0){$.push("");return}const H=P.split(/\s+/);let Y=[];H.forEach((Z,ie)=>{const J=Z.trim();if(!J)return;const ue=_(Y.concat(J));if(N(ue)<=h||Y.length===0){Y.push(J);return}$.push(_(Y)),Y=[J]}),Y.length&&$.push(_(Y))}),$.length||$.push("");const v=r+l+$.length*f,j=Math.ceil(Math.max(1,g)*t),B=Math.ceil(Math.max(1,v)*t);x.width=j,x.height=B,x.style.width=`${Math.max(1,g)}px`,x.style.height=`${Math.max(1,v)}px`,m.scale(t,t);const D=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){m.save(),m.beginPath();const w=Math.max(1,g),P=Math.max(1,v),H=Math.min(u,w/2,P/2);m.moveTo(H,0),m.lineTo(w-H,0),m.quadraticCurveTo(w,0,w,H),m.lineTo(w,P-H),m.quadraticCurveTo(w,P,w-H,P),m.lineTo(H,P),m.quadraticCurveTo(0,P,0,P-H),m.lineTo(0,H),m.quadraticCurveTo(0,0,H,0),m.closePath(),m.clip()}if(m.fillStyle=D,m.fillRect(0,0,Math.max(1,g),Math.max(1,v)),m.font=`${R} ${L} ${F} ${I} ${p}px ${y}`,m.fillStyle=s.color||"#000000",m.textBaseline="top",m.textAlign="right","direction"in m)try{m.direction="rtl"}catch{}const z=Math.max(0,g-c);let M=r;$.forEach(w=>{const P=w.length?w:" ";m.fillText(P,z,M,h),M+=f});const O=n.createElement("img");let K;try{K=x.toDataURL("image/png")}catch(w){return be("note canvas toDataURL failed",w),null}return O.src=K,O.alt=b,O.style.width=`${Math.max(1,g)}px`,O.style.height=`${Math.max(1,v)}px`,O.style.display="block",O.setAttribute("data-quote-note-image","true"),{image:O,canvas:x,totalHeight:v,width:g}}function Li(e,{pixelRatio:t=1}={}){if(!e||!Rt())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Fa(a.textContent||""))return;let s;try{s=Ti(a,{pixelRatio:t})}catch(o){be("failed to rasterize note content",o),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function dn(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){vi(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const o=i("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),r=n||o,l=i("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),c=i("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Be("export"),Ja()):(Be("render"),st=!1,Ne())};if(ta({message:r,duration:9e3,actionLabel:d?c:void 0,onAction:d?u:void 0,linkLabel:l,linkHref:Ea}),C?.modal?.classList.contains("show")&&Be("error",{message:r,actionLabel:d?c:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function un({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){be("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){be("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Tn(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",o=>n(o)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=o=>n(o),document.head.appendChild(s)})}function Wn(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Xn(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Di(){const e=Xn();return e||(tt||(tt=Tn(ni).catch(t=>{throw tt=null,t}).then(()=>{const t=Xn();if(!t)throw tt=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),tt)}async function _i(){const e=Wn();return e||(et||(et=Tn(ai).catch(t=>{throw et=null,t}).then(()=>{const t=Wn();if(!t)throw et=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),et)}async function Bi(){if(window.html2pdf||await Tn(ti),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}wi(),Si()}function E(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ji(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function Pi(){const e=window.localStorage?.getItem?.(Ia),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Ri(){const t=Pi()+1;return{sequence:t,quoteNumber:ji(t)}}function Ni(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Ia,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Fi(){try{const e=window.localStorage?.getItem?.(nn);if(!e)return null;const t=JSON.parse(e);return t&&typeof t=="object"?t:null}catch(e){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",e),null}}function Mi(e){try{if(!e){window.localStorage?.removeItem?.(nn);return}window.localStorage?.setItem?.(nn,JSON.stringify(e))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",t)}}function zi(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Oi(e){if(!e)return null;const t=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(s=>$a.has(s)),n={},a=e.fields||{};return Object.entries(Ca).forEach(([s,o])=>{const r=a[s];if(r==null)return;const{ids:l,emptyExplicitly:c}=zi(r);if(!l&&!c)return;const d=Array.isArray(l)?l.filter(u=>o.has(u)):[];(d.length>0||c)&&(n[s]=d)}),{version:1,sections:t,fields:n}}function Qa(e){const t=Oi(e);t&&Mi(t)}function Hi(e){if(!e)return;const t=Fi();if(!t)return;const n=Array.isArray(t.sections)?t.sections.filter(a=>$a.has(a)):[];if(n.length&&(e.sections=new Set(n)),t.fields&&typeof t.fields=="object"){const a=ja(e.fields||kn());Object.entries(t.fields).forEach(([s,o])=>{const r=Ca[s];if(!r)return;const l=Array.isArray(o)?o.filter(c=>r.has(c)):[];a[s]=new Set(l)}),e.fields=a}}function Ui(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Ka(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(q(String(n)));if(Number.isFinite(a))return a}return 0}function Vi(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(q(String(n)));if(Number.isFinite(a))return a}return Ka(e)}function Qi(e){const t=_t()||[],{technicians:n=[]}=X(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(o=>{if(!o||o.id==null)return;const r=String(o.id),l=s.get(r)||{};s.set(r,{...l,...o})}),(e.technicians||[]).map(o=>s.get(String(o))).filter(Boolean)}function Ki(e,t,n){const{projectLinked:a}=Pe(e,n),s=da(e.start,e.end),l=(Array.isArray(e.items)?e.items:[]).reduce((K,w)=>K+(Number(w?.qty)||1)*(Number(w?.price)||0),0)*s,c=t.reduce((K,w)=>K+Ka(w),0),d=t.reduce((K,w)=>K+Vi(w),0),u=c*s,p=d*s,f=l+p,g=parseFloat(e.discount)||0,h=e.discountType==="amount"?g:f*(g/100),b=Math.max(0,f-h),S=a?!1:e.applyTax,x=Number(e.cost),m=Number.isFinite(x),R=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,L=R!=null?parseFloat(q(String(R).replace("%","").trim())):NaN,F=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let I=(F!=null?F===!0||F===1||F==="1"||String(F).toLowerCase()==="true":Number.isFinite(L)&&L>0)&&Number.isFinite(L)?Number(L):0;S&&I<=0&&(I=ve);let _=I>0?Math.max(0,b*(I/100)):0;_=Number(_.toFixed(2));const $=b+_;let N=S?$*.15:0;(!Number.isFinite(N)||N<0)&&(N=0),N=Number(N.toFixed(2));const v=$+N,j=Number.isFinite(v)?Number(v.toFixed(2)):0,B=a?j:m?x:j,D=Math.max(0,l+p-h),z=Math.max(0,D-u),M={equipmentTotal:l,crewTotal:p,crewCostTotal:u,discountAmount:h,subtotalAfterDiscount:b,taxableAmount:$,taxAmount:N,finalTotal:B,companySharePercent:I,companyShareAmount:_,netProfit:z},O={equipmentTotal:q(l.toFixed(2)),crewTotal:q(p.toFixed(2)),discountAmount:q(h.toFixed(2)),subtotalAfterDiscount:q(b.toFixed(2)),taxableAmount:q($.toFixed(2)),taxAmount:q(N.toFixed(2)),finalTotal:q(B.toFixed(2)),companySharePercent:q(I.toFixed(2)),companyShareAmount:q(_.toFixed(2)),netProfit:q(z.toFixed(2))};return{totals:M,totalsDisplay:O,rentalDays:s}}function Ga({reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:o,rentalDays:r,currencyLabel:l,sections:c,fieldSelections:d={},quoteNumber:u,quoteDate:p,terms:f=ce}){const g=q(String(e?.reservationId??e?.id??"")),h=e.start?q(Ue(e.start)):"-",b=e.end?q(Ue(e.end)):"-",S=t?.customerName||t?.full_name||t?.name||"-",x=t?.phone||"-",m=t?.email||"-",R=t?.company||t?.company_name||"-",L=q(x),F=n?.title||n?.name||i("reservations.details.project.none","غير مرتبط بمشروع"),y=n?.code||n?.projectCode||"",I=q(String(r)),_=e?.notes||"",$=Array.isArray(f)&&f.length?f:ce,N=ja(d),v=(U,ae)=>Pa(N,U,ae),j=U=>c?.has?.(U),B=`<div class="quote-placeholder">${E(i("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,D=(U,ae)=>`<div class="info-plain__item">${E(U)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${E(ae)}</strong></div>`,z=(U,ae,{variant:Le="inline"}={})=>Le==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(U)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(ae)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(U)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(ae)}</span>
    </span>`,M=(U,ae)=>`<div class="payment-row">
      <span class="payment-row__label">${E(U)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(ae)}</span>
    </div>`,O=[];v("customerInfo","customerName")&&O.push(D(i("reservations.details.labels.customer","العميل"),S)),v("customerInfo","customerCompany")&&O.push(D(i("reservations.details.labels.company","الشركة"),R)),v("customerInfo","customerPhone")&&O.push(D(i("reservations.details.labels.phone","الهاتف"),L)),v("customerInfo","customerEmail")&&O.push(D(i("reservations.details.labels.email","البريد"),m));const K=j("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(i("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${O.length?`<div class="info-plain">${O.join("")}</div>`:B}
      </section>`:"",w=[];v("reservationInfo","reservationId")&&w.push(D(i("reservations.details.labels.reservationId","رقم الحجز"),g||"-")),v("reservationInfo","reservationStart")&&w.push(D(i("reservations.details.labels.start","بداية الحجز"),h)),v("reservationInfo","reservationEnd")&&w.push(D(i("reservations.details.labels.end","نهاية الحجز"),b)),v("reservationInfo","reservationDuration")&&w.push(D(i("reservations.details.labels.duration","عدد الأيام"),I));const P=j("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${E(i("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${w.length?`<div class="info-plain">${w.join("")}</div>`:B}
      </section>`:"",H=[];v("projectInfo","projectTitle")&&H.push(D(i("reservations.details.labels.project","المشروع"),F)),v("projectInfo","projectCode")&&H.push(D(i("reservations.details.labels.code","الرمز"),y||"-"));const Y=j("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${E(i("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${H.length?`<div class="info-plain">${H.join("")}</div>`:B}
      </section>`:"",Z=[];v("financialSummary","equipmentTotal")&&Z.push(z(i("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${o.equipmentTotal} ${l}`)),v("financialSummary","crewTotal")&&Z.push(z(i("reservations.details.labels.crewTotal","إجمالي الفريق"),`${o.crewTotal} ${l}`)),v("financialSummary","discountAmount")&&Z.push(z(i("reservations.details.labels.discount","الخصم"),`${o.discountAmount} ${l}`)),v("financialSummary","taxAmount")&&Z.push(z(i("reservations.details.labels.tax","الضريبة"),`${o.taxAmount} ${l}`));const ie=v("financialSummary","finalTotal"),J=[];ie&&J.push(z(i("reservations.details.labels.total","الإجمالي النهائي"),`${o.finalTotal} ${l}`,{variant:"final"}));const ue=J.length?`<div class="totals-final">${J.join("")}</div>`:"",V=j("financialSummary")?!Z.length&&!ie?`<section class="quote-section quote-section--financial">${B}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(i("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${Z.length?`<div class="totals-inline">${Z.join("")}</div>`:""}
            ${ue}
          </div>
        </section>`:"",ee=Aa.filter(U=>v("items",U.id)),pe=ee.length>0,mt=pe?ee.map(U=>`<th>${E(U.labelKey?i(U.labelKey,U.fallback):U.fallback)}</th>`).join(""):"",pt=Array.isArray(e.items)&&e.items.length>0?e.items.map((U,ae)=>`<tr>${ee.map(Le=>`<td>${Le.render(U,ae)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ee.length,1)}" class="empty">${E(i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,ft=j("items")?pe?`<section class="quote-section quote-section--table">
            <h3>${E(i("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${mt}</tr>
              </thead>
              <tbody>${pt}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(i("reservations.details.items.title","المعدات"))}</h3>
            ${B}
          </section>`:"",Oe=ka.filter(U=>v("crew",U.id)),gt=Oe.length>0,Nt=gt?Oe.map(U=>`<th>${E(U.labelKey?i(U.labelKey,U.fallback):U.fallback)}</th>`).join(""):"",Ft=a.length?a.map((U,ae)=>`<tr>${Oe.map(Le=>`<td>${Le.render(U,ae)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Oe.length,1)}" class="empty">${E(i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ne=j("crew")?gt?`<section class="quote-section quote-section--table">
            <h3>${E(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Nt}</tr>
              </thead>
              <tbody>${Ft}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${B}
          </section>`:"",ht=j("notes")?`<section class="quote-section">
        <h3>${E(i("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${E(_||i("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",we=[];v("payment","beneficiary")&&we.push(M(i("reservations.quote.labels.beneficiary","اسم المستفيد"),ge.beneficiaryName)),v("payment","bank")&&we.push(M(i("reservations.quote.labels.bank","اسم البنك"),ge.bankName)),v("payment","account")&&we.push(M(i("reservations.quote.labels.account","رقم الحساب"),q(ge.accountNumber))),v("payment","iban")&&we.push(M(i("reservations.quote.labels.iban","رقم الآيبان"),q(ge.iban)));const Mt=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(i("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${we.length?we.join(""):B}</div>
      </div>
      <p class="quote-approval-note">${E(ge.approvalNote)}</p>
    </section>`,zt=`<footer class="quote-footer">
        <h4>${E(i("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${$.map(U=>`<li>${E(U)}</li>`).join("")}</ul>
      </footer>`,Te=[];K&&P?Te.push(le(`<div class="quote-section-row">${K}${P}</div>`,{blockType:"group"})):(P&&Te.push(le(P)),K&&Te.push(le(K))),Y&&Te.push(le(Y));const Ye=[];ft&&Ye.push(le(ft,{blockType:"table",extraAttributes:'data-table-id="items"'})),ne&&Ye.push(le(ne,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Je=[];V&&Je.push(le(V,{blockType:"summary"})),ht&&Je.push(le(ht));const Ot=[le(Mt,{blockType:"payment"}),le(zt,{blockType:"footer"})],re=[...Kn(Te,"reservations.quote.placeholder.page1"),...Ye,...Kn(Je,"reservations.quote.placeholder.page2"),...Ot],Ht=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(ge.logoUrl)}" alt="${E(ge.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(i("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${E(ge.companyName)}</p>
        <p class="quote-company-cr">${E(i("reservations.quote.labels.cr","السجل التجاري"))}: ${E(ge.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${E(u)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${E(p)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${si}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ht}
          ${re.join("")}
        </div>
      </div>
    </div>
  `}function Gi(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{o(),t()},s=()=>{o(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},o=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function rt(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),o=a.map(l=>Gi(l)),r=[s,...o].map(l=>l.catch(c=>(be("asset load failed",c),pi(),null)));await Promise.all(r),await new Promise(l=>n.requestAnimationFrame(()=>l()))}async function Wa(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),o=e.querySelector("[data-quote-source]"),r=o?.querySelector("[data-quote-header-template]");if(!s||!o||!r)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Va(o),await rt(o),s.innerHTML="";const l=Array.from(o.querySelectorAll(":scope > [data-quote-block]"));let c=null,d=null;const u=y=>{y.style.margin="0 auto",y.style.breakInside="avoid",y.style.pageBreakInside="avoid",y.style.pageBreakAfter="auto",y.style.breakAfter="auto"},p=()=>{const y=a.createElement("div"),I=s.childElementCount===0;if(y.className="quote-page",y.dataset.pageIndex=String(s.childElementCount),I){y.classList.add("quote-page--primary");const $=r.cloneNode(!0);$.removeAttribute("data-quote-header-template"),y.appendChild($)}else y.classList.add("quote-page--continuation");const _=a.createElement("main");_.className="quote-body",y.appendChild(_),s.appendChild(y),u(y),c=y,d=_},f=()=>{(!c||!d||!d.isConnected)&&p()},g=()=>{if(!c||!d||d.childElementCount>0)return;const y=c;c=null,d=null,y.parentNode&&y.parentNode.removeChild(y)},h=()=>{c=null,d=null},b=()=>c?c.scrollHeight-c.clientHeight>li:!1,S=(y,{allowOverflow:I=!1}={})=>(f(),d.appendChild(y),b()&&!I?(d.removeChild(y),g(),!1):!0),x=y=>{const I=y.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!S(I)&&(h(),!S(I)&&S(I,{allowOverflow:!0}))},m=y=>{const I=y.querySelector("table");if(!I){x(y);return}const _=y.querySelector("h3"),$=I.querySelector("thead"),N=Array.from(I.querySelectorAll("tbody tr"));if(!N.length){x(y);return}let v=null,j=0;const B=(z=!1)=>{const M=y.cloneNode(!1);M.removeAttribute("data-quote-block"),M.removeAttribute("data-block-type"),M.removeAttribute("data-table-id"),M.classList.add("quote-section--table-fragment"),z&&M.classList.add("quote-section--table-fragment--continued");const O=_?_.cloneNode(!0):null;O&&M.appendChild(O);const K=I.cloneNode(!1);K.classList.add("quote-table--fragment"),$&&K.appendChild($.cloneNode(!0));const w=a.createElement("tbody");return K.appendChild(w),M.appendChild(K),{section:M,body:w}},D=(z=!1)=>v||(v=B(z),S(v.section)||(h(),S(v.section)||S(v.section,{allowOverflow:!0})),v);N.forEach(z=>{D(j>0);const M=z.cloneNode(!0);if(v.body.appendChild(M),b()&&(v.body.removeChild(M),v.body.childElementCount||(d.removeChild(v.section),v=null,g()),h(),v=null,D(j>0),v.body.appendChild(M),b())){v.section.classList.add("quote-section--table-fragment--overflow"),j+=1;return}j+=1}),v=null};if(!l.length)return;l.forEach(y=>{y.getAttribute("data-block-type")==="table"?m(y):x(y)});const R=Array.from(s.children),L=[];if(R.forEach((y,I)=>{const _=y.querySelector(".quote-body");if(I!==0&&(!_||_.childElementCount===0)){y.remove();return}L.push(y)}),!n){const y=a.defaultView||window,I=Math.min(3,Math.max(1,y.devicePixelRatio||1)),_=Rt()?Math.min(2,I):I;L.forEach($=>Li($,{pixelRatio:_}))}L.forEach((y,I)=>{const _=I===0;y.style.pageBreakAfter="auto",y.style.breakAfter="auto",y.style.pageBreakBefore=_?"auto":"always",y.style.breakBefore=_?"auto":"page",n?y.style.boxShadow="":y.style.boxShadow="none"});const F=L[L.length-1]||null;c=F,d=F?.querySelector(".quote-body")||null,await rt(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Ln(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Wi(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[o,r]=await Promise.all([_i(),Di()]),l=e.ownerDocument||document,c=l?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,c,l?.documentElement?.getAttribute?.("dir")].some(y=>typeof y=="string"&&y.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,f=Cn(),g=Na(),h=Rt();let b;h?b=1.5:g?b=Math.min(1.7,Math.max(1.2,p*1.1)):f?b=Math.min(1.8,Math.max(1.25,p*1.2)):b=Math.min(2,Math.max(1.6,p*1.4));const S=h||g?.9:f?.92:.95,x=new o({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),m={scale:b,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let R=0;const L=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let y=0;y<s.length;y+=1){const I=s[y];await Va(I),await rt(I);const _=I.ownerDocument||document,$=_.createElement("div");Object.assign($.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const N=I.cloneNode(!0);N.style.width=`${St}px`,N.style.maxWidth=`${St}px`,N.style.minWidth=`${St}px`,N.style.height=`${qt}px`,N.style.maxHeight=`${qt}px`,N.style.minHeight=`${qt}px`,N.style.position="relative",N.style.background="#ffffff",Ln(N),$.appendChild(N),_.body.appendChild($);let v;try{await rt(N),v=await r(N,{...m,scale:b,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(w){throw dn(w,"pageCapture",{toastMessage:L}),w}finally{$.parentNode?.removeChild($)}if(!v)continue;const j=v.width||1,D=(v.height||1)/j;let z=on,M=z*D,O=0;if(M>xt){const w=xt/M;M=xt,z=z*w,O=Math.max(0,(on-z)/2)}const K=v.toDataURL("image/jpeg",S);R>0&&x.addPage(),x.addImage(K,"JPEG",O,0,z,M,`page-${R+1}`,"FAST"),R+=1,await new Promise(w=>window.requestAnimationFrame(w))}}catch(y){throw un({safariWindowRef:n,mobileWindowRef:a}),y}if(R===0)throw un({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(g||h){const y=x.output("blob");if(h){const I=URL.createObjectURL(y);ot();try{window.location.assign(I)}catch(_){be("mobile safari blob navigation failed",_)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(y),_=()=>g&&n&&!n.closed?n:a&&!a.closed?a:null,$=(v,j)=>{if(ot(),!v){window.location.assign(j);return}try{v.location.replace(j),v.focus?.()}catch(B){be("direct blob navigation failed",B);try{v.document.open(),v.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(i("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${j}" title="PDF preview"></iframe></body></html>`),v.document.close()}catch(D){be("iframe blob delivery failed",D),window.location.assign(j)}}},N=_();$(N,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{ot();const y=x.output("bloburl"),I=document.createElement("a");I.href=y,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(y),I.remove()},2e3)}}function Ne(){if(!A||!C)return;const{previewFrame:e}=C;if(!e)return;const t=Ga({reservation:A.reservation,customer:A.customer,project:A.project,technicians:A.technicians,totals:A.totals,totalsDisplay:A.totalsDisplay,rentalDays:A.rentalDays,currencyLabel:A.currencyLabel,sections:A.sections,fieldSelections:A.fields,quoteNumber:A.quoteNumber,quoteDate:A.quoteDateLabel,terms:A.terms});Be("render"),e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{try{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(Ma(s),za(s,a),Oa(s,a));const o=n?.getElementById("quotation-pdf-root");try{o&&(await Wa(o,{context:"preview"}),Ln(o))}catch(f){console.error("[reservations/pdf] failed to layout preview document",f)}const r=Array.from(n?.querySelectorAll?.(".quote-page")||[]),l=n?.querySelector(".quote-preview-pages"),c=St;let d=18;if(l&&n?.defaultView){const f=n.defaultView.getComputedStyle(l),g=parseFloat(f.rowGap||f.gap||`${d}`);Number.isFinite(g)&&g>=0&&(d=g)}const u=qt,p=r.length?r.length*u+Math.max(0,(r.length-1)*d):u;if(e.dataset.baseWidth=String(c),e.dataset.baseHeight=String(p),e.style.width=`${c}px`,e.style.minWidth=`${c}px`,e.style.height=`${p}px`,e.style.minHeight=`${p}px`,C?.previewFrameWrapper&&!C?.userAdjustedZoom){const f=C.previewFrameWrapper.clientWidth-24;f>0&&f<c?me=Math.max(f/c,.3):me=1}Ya(me)}finally{ot()}},{once:!0})}function Xi(e){if(!A)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?A.sections.add(n):A.sections.delete(n),Qa(A),Xa(),Ne())}function Yi(e){if(!A)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=A.fields||(A.fields=kn()),o=fi(s,n);t.checked?o.add(a):o.delete(a),Qa(A),Ne()}function Ji(e){if(!A)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&($n(A,n),A.sectionExpansions[n]=t.open)}function Xa(){if(!C?.toggles||!A)return;const{toggles:e}=C,t=A.fields||{};$n(A);const n=Pt.map(({id:a,labelKey:s,fallback:o})=>{const r=i(s,o),l=A.sections.has(a),c=An[a]||[],d=gi(A,a),u=c.length?`<div class="quote-toggle-sublist">
          ${c.map(p=>{const f=Pa(t,a,p.id),g=l?"":"disabled",h=p.labelKey?i(p.labelKey,p.fallback):p.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${p.id}" ${f?"checked":""} ${g}>
                <span>${E(h)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${a}" ${d?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${a}" ${l?"checked":""}>
            <span>${E(r)}</span>
          </label>
          ${c.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${u}
      </details>
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",Xi)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",Yi)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",Ji)})}function Zi(){if(C?.modal)return C;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${E(i("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${E(i("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${E(i("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${E(i("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${E(i("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${E(i("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${E(i("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),o=e.querySelector("[data-quote-terms-reset]"),r=e.querySelector("[data-quote-download]"),l=e.querySelector(".modal-header"),c=l?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",l&&l.insertBefore(u,c||null);const p=document.createElement("iframe");p.className="quote-preview-frame",p.setAttribute("title",i("reservations.quote.previewTitle","معاينة عرض السعر")),p.setAttribute("loading","lazy"),p.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${E(i("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${E(i("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${E(i("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const g=document.createElement("div");g.className="quote-preview-frame-wrapper",g.appendChild(p),n.innerHTML="";const h=document.createElement("div");h.className="quote-preview-scroll",h.appendChild(g),n.appendChild(h);const b=document.createElement("div");b.className="quote-preview-status",b.setAttribute("role","status"),b.setAttribute("aria-live","polite"),b.hidden=!0,b.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${E(Ta("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(b),u.appendChild(f),r?.addEventListener("click",async()=>{if(A){r.disabled=!0;try{await Ja()}finally{r.disabled=!1}}});const S=()=>{rn()||ln(e)};d.forEach(L=>{L?.addEventListener("click",S)}),c&&!d.includes(c)&&c.addEventListener("click",S),e.addEventListener("click",L=>{rn()||L.target===e&&ln(e)}),C={modal:e,toggles:t,preview:n,previewScroll:h,previewFrameWrapper:g,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:r,statusIndicator:b,statusText:b.querySelector("[data-quote-status-text]"),statusSpinner:b.querySelector("[data-quote-status-spinner]"),statusAction:b.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:o,statusKind:null,userAdjustedZoom:!1};const x=f.querySelector("[data-zoom-out]"),m=f.querySelector("[data-zoom-in]"),R=f.querySelector("[data-zoom-reset]");return x?.addEventListener("click",()=>Yn(-.1)),m?.addEventListener("click",()=>Yn(.1)),R?.addEventListener("click",()=>Lt(1,{markManual:!0})),s&&s.addEventListener("input",tr),o&&o.addEventListener("click",nr),Lt(me),C}function Lt(e,{silent:t=!1,markManual:n=!1}={}){me=Math.min(Math.max(e,.25),2.2),n&&C&&(C.userAdjustedZoom=!0),Ya(me),!t&&C?.zoomValue&&(C.zoomValue.textContent=`${Math.round(me*100)}%`)}function Yn(e){Lt(me+e,{markManual:!0})}function Ya(e){if(!C?.previewFrame||!C.previewFrameWrapper)return;const t=C.previewFrame,n=C.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Cn()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function er(){if(!C?.meta||!A)return;const{meta:e}=C;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${E(i("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${E(A.quoteNumber)}</strong></div>
      <div><span>${E(i("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${E(A.quoteDateLabel)}</strong></div>
    </div>
  `}function Dn(){if(!C?.termsInput)return;const e=(A?.terms&&A.terms.length?A.terms:ce).join(`
`);C.termsInput.value!==e&&(C.termsInput.value=e)}function tr(e){if(!A)return;const t=an(e?.target?.value??"");if(t.length){A.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{A.terms=[...ce],Dn();const n=ce.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Ne()}function nr(e){if(e?.preventDefault?.(),!A)return;A.terms=[...ce];const t=document.getElementById("reservation-terms");t&&(t.value=ce.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=ce.join(`
`)),Dn(),Ne()}async function Ja(){if(!A)return;Be("export");const t=!Cn()&&Na(),n=Rt(),a=null,s=!n&&t?window.open("","_blank"):null;(c=>{if(c)try{c.document.open(),c.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(i("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${E(i("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${E(i("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),c.document.close()}catch(d){be("failed to prime download window",d)}})(s);let r=null;const l=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Bi(),Kt("html2pdf ensured");const c=Ga({reservation:A.reservation,customer:A.customer,project:A.project,technicians:A.technicians,totals:A.totals,totalsDisplay:A.totalsDisplay,rentalDays:A.rentalDays,currencyLabel:A.currencyLabel,sections:A.sections,fieldSelections:A.fields,quoteNumber:A.quoteNumber,quoteDate:A.quoteDateLabel,terms:A.terms});r=document.createElement("div"),r.innerHTML=c,Object.assign(r.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(r),Ma(r),za(r),Oa(r),Kt("export container prepared");const d=r.firstElementChild;if(d){d.setAttribute("dir","rtl"),d.style.direction="rtl",d.style.textAlign="right",d.setAttribute("data-theme","light"),d.classList.remove("dark","dark-mode"),d.style.margin="0",d.style.padding="0",d.style.width="210mm",d.style.maxWidth="210mm",d.style.marginLeft="auto",d.style.marginRight="auto",d.scrollTop=0,d.scrollLeft=0;try{await Wa(d,{context:"export"}),await rt(d),Ln(d),Kt("layout complete for export document")}catch(p){dn(p,"layoutQuoteDocument",{suppressToast:!0})}}const u=`quotation-${A.quoteNumber}.pdf`;await Wi(d,{filename:u,safariWindowRef:s,mobileWindowRef:a}),A.sequenceCommitted||(Ni(A.quoteSequence),A.sequenceCommitted=!0)}catch(c){un({container:r,safariWindowRef:s,mobileWindowRef:a}),r=null,dn(c,"exportQuoteAsPdf",{toastMessage:l})}finally{r&&r.parentNode&&r.parentNode.removeChild(r),ot()}}function ar(){const e=Zi();e?.modal&&(st=!1,me=1,C&&(C.userAdjustedZoom=!1),Lt(me,{silent:!0}),Xa(),er(),Dn(),Ne(),mi(e.modal))}async function sr({reservation:e,customer:t,project:n}){if(!e){k(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Qi(e),{totalsDisplay:s,totals:o,rentalDays:r}=Ki(e,a,n),l=i("reservations.create.summary.currency","SR"),{sequence:c,quoteNumber:d}=Ri(),u=new Date,p=ei();A={reservation:e,customer:t,project:n,technicians:a,totals:o,totalsDisplay:s,rentalDays:r,currencyLabel:l,sections:new Set(Pt.filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Ra(),fields:kn(),terms:p,quoteSequence:c,quoteNumber:d,quoteDate:u,quoteDateLabel:Ui(u),sequenceCommitted:!1},Hi(A),ar()}function or({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=_t(),{reservations:o=[],customers:r=[],technicians:l=[],projects:c=[]}=X(),d=Array.isArray(s)?s:l||[],u=new Map((c||[]).map(S=>[String(S.id),S])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!o||o.length===0){p.innerHTML=`<p>${i("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const f=t||Vo(),g=new Map(r.map(S=>[String(S.id),S])),h=new Map(d.map(S=>[String(S.id),S])),b=Wo({reservations:o,filters:f,customersMap:g,techniciansMap:h,projectsMap:u});if(b.length===0){p.innerHTML=`<p>${i("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${Xo({entries:b,customersMap:g,techniciansMap:h,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(S=>{const x=Number(S.dataset.reservationIndex);Number.isNaN(x)||S.addEventListener("click",()=>{typeof n=="function"&&n(x)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(S=>{const x=Number(S.dataset.reservationIndex);Number.isNaN(x)||S.addEventListener("click",m=>{m.stopPropagation(),typeof a=="function"&&a(x,m)})})}function ir(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:o=[],projects:r=[]}=X(),l=s[e];if(!l)return k(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const c=o.find(x=>String(x.id)===String(l.customerId)),d=l.projectId?r.find(x=>String(x.id)===String(l.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const x=_t()||[];u.innerHTML=Yo(l,c,x,e,d)}const p=document.getElementById("reservationDetailsModal"),f=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},g=document.getElementById("reservation-details-edit-btn");g&&(g.onclick=()=>{f(),typeof t=="function"&&t(e,{reservation:l,customer:c,getEditContext:a})});const h=document.getElementById("reservation-details-delete-btn");h&&(h.onclick=()=>{f(),typeof n=="function"&&n(e,{reservation:l,customer:c})});const b=u?.querySelector('[data-action="open-project"]');b&&d&&b.addEventListener("click",()=>{f();const x=d?.id!=null?String(d.id):"",m=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=m});const S=document.getElementById("reservation-details-export-btn");return S&&(S.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),S.blur();try{await sr({reservation:l,customer:c,project:d})}catch(m){console.error("❌ [reservations] export to PDF failed",m),k(i("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function ut(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:it(e,n),end:it(t,a)}}function Fe(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=i("reservations.create.equipment.none","لا توجد معدات"),a=i("reservations.create.summary.currency","SR"),s=i("reservations.create.equipment.imageAlt","صورة"),o=i("reservations.equipment.actions.increase","زيادة الكمية"),r=i("reservations.equipment.actions.decrease","تقليل الكمية"),l=i("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Jn(t);return}const c=je(e);t.innerHTML=c.map(d=>{const u=d.items[0]||{},p=Re(u)||d.image,f=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',g=q(String(d.count)),h=Number.isFinite(Number(d.unitPrice))?Number(d.unitPrice):0,b=Number.isFinite(Number(d.totalPrice))?Number(d.totalPrice):h*d.count,S=`${q(h.toFixed(2))} ${a}`,x=`${q(b.toFixed(2))} ${a}`,m=d.barcodes.map(L=>q(String(L||""))).filter(Boolean),R=m.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${m.map(L=>`<li>${L}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${R}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${r}">−</button>
              <span class="reservation-qty-value">${g}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${o}">+</button>
            </div>
          </td>
          <td>${S}</td>
          <td>${x}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Jn(t)}function rr(e){const{index:t,items:n}=Me(),s=je(n).find(l=>l.key===e);if(!s)return;const o=s.itemIndices[s.itemIndices.length-1];if(o==null)return;const r=n.filter((l,c)=>c!==o);ze(t,r),Fe(r),ye()}function lr(e){const{index:t,items:n}=Me(),a=n.filter(s=>Bt(s)!==e);a.length!==n.length&&(ze(t,a),Fe(a),ye())}function cr(e){const{index:t,items:n}=Me(),s=je(n).find(S=>S.key===e);if(!s)return;const{start:o,end:r}=ut();if(!o||!r){k(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:l=[]}=X(),c=t!=null&&l[t]||null,d=c?.id??c?.reservationId??null,u=new Set(n.map(S=>G(S.barcode))),{equipment:p=[]}=X(),f=(p||[]).find(S=>{const x=G(S?.barcode);return!x||u.has(x)||Bt({desc:S?.desc||S?.description||S?.name||"",price:Number(S?.price)||0})!==e||!pa(S)?!1:!Ae(x,o,r,d)});if(!f){k(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const g=G(f.barcode),h=Ge(f);if(!h){k(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...n,{id:h,equipmentId:h,barcode:g,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:Re(f)}];ze(t,b),Fe(b),ye()}function Jn(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:o}=n.dataset;if(a==="decrease-edit-group"&&s){rr(s);return}if(a==="increase-edit-group"&&s){cr(s);return}if(a==="remove-edit-group"&&s){lr(s);return}if(a==="remove-edit-item"){const r=Number(o);Number.isNaN(r)||dr(r)}}),e.dataset.groupListenerAttached="true")}function ye(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",ye),a.dataset.listenerAttached="true"),Ve(a);const s=q(t?.value||"0");t&&(t.value=s);const o=parseFloat(s)||0,r=n?.value||"percent",l=!!document.getElementById("edit-res-project")?.value,c=document.getElementById("edit-res-tax"),d=l?!1:c?.checked||!1,u=a?.value||"unpaid";Ve(a,u),d&&de("edit-res-company-share");let p=Qe("edit-res-company-share");d&&(!Number.isFinite(p)||p<=0)&&(de("edit-res-company-share"),p=Qe("edit-res-company-share"));const{items:f=[]}=Me(),{start:g,end:h}=ut();e.innerHTML=po({items:f,discount:o,discountType:r,applyTax:d,paidStatus:u,start:g,end:h,companySharePercent:p})}function dr(e){if(e==null)return;const{index:t,items:n}=Me();if(!Array.isArray(n))return;const a=n.filter((s,o)=>o!==e);ze(t,a),Fe(a),ye()}function ur(e){const t=e?.value??"",n=G(t);if(!n)return;const a=jt(n);if(!a){k(i("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=ke(a);if(s!=="available"){k(We(s));return}const o=G(n),{index:r,items:l=[]}=Me();if(l.findIndex(S=>G(S.barcode)===o)>-1){k(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=ut();if(!d||!u){k(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=X(),f=r!=null&&p[r]||null,g=f?.id??f?.reservationId??null;if(Ae(o,d,u,g)){k(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const h=Ge(a);if(!h){k(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...l,{id:h,equipmentId:h,barcode:o,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];ze(r,b),e&&(e.value=""),Fe(b),ye()}function Dt(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=wa(t),a=G(n?.barcode||t);if(!n||!a){k(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=ke(n);if(s!=="available"){k(We(s));return}const{start:o,end:r}=ut();if(!o||!r){k(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:l,items:c=[]}=Me();if(c.some(b=>G(b.barcode)===a)){k(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=X(),p=l!=null&&u[l]||null,f=p?.id??p?.reservationId??null;if(Ae(a,o,r,f)){k(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const g=Ge(n);if(!g){k(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const h=[...c,{id:g,equipmentId:g,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];ze(l,h),Fe(h),ye(),e.value=""}function Za(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Dt(e))});const t=()=>{xa(e.value,"edit-res-equipment-description-options")&&Dt(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{ye()});typeof window<"u"&&(window.getEditReservationDateRange=ut);function mr(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){tn(e);return}Dt(e)}}function qr(){Xe(),Za()}function pr(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let lt=null,he=[],mn=null,se={},Gt=!1;function pn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),o=!!e;if(n&&(n.value=o?"true":"false"),a){const r=a.dataset.confirmLabel||"✅ تم التأكيد",l=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=o?r:l,a.dataset.state=o?"confirmed":"pending",a.classList.toggle("btn-success",o&&!t),a.classList.toggle("btn-outline-secondary",!o||t),a.disabled=t,a.setAttribute("aria-pressed",o?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function fn(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Me(){return{index:lt,items:he}}function ze(e,t){lt=typeof e=="number"?e:null,he=Array.isArray(t)?[...t]:[]}function es(){lt=null,he=[],vo()}function fr(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function nt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function gr(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),o=t?.projectId?String(t.projectId):"",r=Array.isArray(e)?[...e].sort((c,d)=>String(d.createdAt||d.start||"").localeCompare(String(c.createdAt||c.start||""))):[],l=[`<option value="">${nt(a)}</option>`];r.forEach(c=>{l.push(`<option value="${nt(c.id)}">${nt(c.title||a)}</option>`)}),o&&!r.some(c=>String(c.id)===o)&&l.push(`<option value="${nt(o)}">${nt(s)}</option>`),n.innerHTML=l.join(""),o?n.value=o:n.value=""}function ts(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&n.checked&&(n.checked=!1),n&&(n.disabled=!0,n.classList.add("disabled"));else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1),n&&(n.disabled=!1,n.classList.remove("disabled"))}gn("tax")}function gn(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const o=se?.updateEditReservationSummary;typeof o=="function"&&o()};if(Gt){a();return}Gt=!0;const s=()=>{Gt=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(ve)),t.disabled){n.checked=!1,k(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),de("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?de("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function Zn(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:o,ensureModal:r}={}){const{customers:l,projects:c}=X(),u=ua()?.[e];if(!u){k(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}se={...se,reservation:u,projects:c||[]},t?.(),gr(c||[],u);const p=u.projectId&&c?.find?.(B=>String(B.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:g}=Pe(u,p),h=u.items?u.items.map(B=>({...B,equipmentId:B.equipmentId??B.equipment_id??B.id,barcode:G(B?.barcode)})):[];ze(e,h);const b=i("reservations.list.unknownCustomer","غير معروف"),S=l?.find?.(B=>String(B.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const m=document.getElementById("edit-res-customer");m&&(m.value=S?.customerName||b);const R=typeof a=="function"?a(u.start):{date:"",time:""},L=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",R.date),n?.("edit-res-start-time",R.time),n?.("edit-res-end",L.date),n?.("edit-res-end-time",L.time);const F=document.getElementById("edit-res-notes");F&&(F.value=u.notes||"");const y=document.getElementById("edit-res-discount");y&&(y.value=q(u.discount??0));const I=document.getElementById("edit-res-discount-type");I&&(I.value=u.discountType||"percent");const _=u.projectId?!1:!!u.applyTax,$=document.getElementById("edit-res-tax");$&&($.checked=_);const N=document.getElementById("edit-res-company-share");if(N){const B=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,D=B!=null?Number.parseFloat(q(String(B).replace("%","").trim())):NaN,z=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,M=z!=null?z===!0||z===1||z==="1"||String(z).toLowerCase()==="true":Number.isFinite(D)&&D>0,O=M&&Number.isFinite(D)&&D>0?D:ve,K=_||M;N.checked=K,N.dataset.companyShare=String(O)}pn(f,{disable:g});const v=document.getElementById("edit-res-paid");v&&(v.value=u.paid===!0||u.paid==="paid"?"paid":"unpaid"),fo((u.technicians||[]).map(B=>String(B))),s?.(h),ts(),o?.();const j=document.getElementById("editReservationModal");mn=fr(j,r),mn?.show?.()}async function hr({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:o,handleReservationsMutation:r}={}){if(lt===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),c=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",p=document.getElementById("edit-res-notes")?.value||"",f=q(document.getElementById("edit-res-discount")?.value||"0"),g=parseFloat(f)||0,h=document.getElementById("edit-res-discount-type")?.value||"percent",b=fn(),S=document.getElementById("edit-res-paid")?.value||"unpaid",x=document.getElementById("edit-res-project")?.value||"",m=go(),R=document.getElementById("edit-res-company-share"),L=document.getElementById("edit-res-tax");if(!l||!d){k(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const F=typeof e=="function"?e:(V,ee)=>`${V}T${ee||"00:00"}`,y=F(l,c),I=F(d,u);if(y&&I&&new Date(y)>new Date(I)){k(i("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const $=ua()?.[lt];if(!$){k(i("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(he)||he.length===0&&m.length===0){k(i("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const N=typeof t=="function"?t:()=>!1,v=$.id??$.reservationId;for(const V of he){const ee=ke(V.barcode);if(ee==="reserved"){const pe=G(V.barcode);if(!N(pe,y,I,v))continue}if(ee!=="available"){k(We(ee));return}}for(const V of he){const ee=G(V.barcode);if(N(ee,y,I,v)){k(i("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const j=typeof n=="function"?n:()=>!1;for(const V of m)if(j(V,y,I,v)){k(i("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const B=Array.isArray(se.projects)&&se.projects.length?se.projects:X().projects||[],D=x&&B.find(V=>String(V.id)===String(x))||null,z={...$,projectId:x?String(x):null,confirmed:b},{effectiveConfirmed:M,projectLinked:O,projectStatus:K}=Pe(z,D);let w=!!R?.checked,P=!!L?.checked;if(O&&(w&&(R.checked=!1,w=!1),P=!1),!O&&w!==P){k(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}P&&(de("edit-res-company-share"),w=!!R?.checked);let H=w?getCompanySharePercent("edit-res-company-share"):null;w&&(!Number.isFinite(H)||H<=0)&&(de("edit-res-company-share"),H=getCompanySharePercent("edit-res-company-share"));const Y=w&&P&&Number.isFinite(H)&&H>0,Z=O?!1:P,ie=sa(he,g,h,Z,m,{start:y,end:I,companySharePercent:Y?H:0});let J=$.status??"pending";O?J=D?.status??K??J:["completed","cancelled"].includes(String(J).toLowerCase())||(J=b?"confirmed":"pending");const ue=oa({reservationCode:$.reservationCode??$.reservationId??null,customerId:$.customerId,start:y,end:I,status:J,title:$.title??null,location:$.location??null,notes:p,projectId:x?String(x):null,totalAmount:ie,discount:g,discountType:h,applyTax:Z,paidStatus:S,confirmed:M,items:he.map(V=>({...V,equipmentId:V.equipmentId??V.id})),technicians:m,companySharePercent:Y?H:null,companyShareEnabled:Y});try{const V=await ho($.id||$.reservationId,ue);await bo(),k(i("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),es(),r?.({type:"updated",reservation:V}),s?.(),o?.(),mn?.hide?.()}catch(V){console.error("❌ [reservationsEdit] Failed to update reservation",V);const ee=ia(V)?V.message:i("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");k(ee,"error")}}function Ir(e={}){se={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=se,o=document.getElementById("edit-res-discount");o&&!o.dataset.listenerAttached&&(o.addEventListener("input",()=>{o.value=q(o.value),t?.()}),o.dataset.listenerAttached="true");const r=document.getElementById("edit-res-discount-type");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>t?.()),r.dataset.listenerAttached="true");const l=document.getElementById("edit-res-tax");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{gn("tax")}),l.dataset.listenerAttached="true");const c=document.getElementById("edit-res-company-share");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{gn("share")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-project");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{ts();const h=Array.isArray(se.projects)&&se.projects.length?se.projects:X().projects||[],b=d.value&&h.find(L=>String(L.id)===String(d.value))||null,x={...se?.reservation??{},projectId:d.value||null,confirmed:fn()},{effectiveConfirmed:m,projectLinked:R}=Pe(x,b);pn(m,{disable:R}),t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-confirmed-btn");u&&!u.dataset.listenerAttached&&(u.addEventListener("click",()=>{if(u.disabled)return;const h=!fn();pn(h),t?.()}),u.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{hr(se).catch(h=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",h)})}),p.dataset.listenerAttached="true");const f=document.getElementById("edit-res-equipment-barcode");if(f&&!f.dataset.listenerAttached){let h=null;const b=()=>{f.value?.trim()&&(clearTimeout(h),h=null,n?.(f))};f.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),b())});const S=()=>{if(clearTimeout(h),!f.value?.trim())return;const{start:x,end:m}=getEditReservationDateRange();!x||!m||(h=setTimeout(()=>{b()},150))};f.addEventListener("input",S),f.addEventListener("change",b),f.dataset.listenerAttached="true"}Za?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{es(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}function Er(){return So().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=X()||{};yo(e||[]),Sa()})}function _n(e=null){Sa(),ns(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function br(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function hn(){return{populateEquipmentDescriptionLists:Xe,setFlatpickrValue:pr,splitDateTime:na,renderEditItems:Fe,updateEditReservationSummary:ye,addEquipmentByDescription:mr,addEquipmentToEditingReservation:ur,addEquipmentToEditingByDescription:Dt,combineDateTime:it,hasEquipmentConflict:Ae,hasTechnicianConflict:aa,renderReservations:ns,handleReservationsMutation:_n,ensureModal:br}}function ns(e="reservations-list",t=null){or({containerId:e,filters:t,onShowDetails:as,onConfirmReservation:os})}function as(e){return ir(e,{getEditContext:hn,onEdit:(t,{reservation:n})=>{is(t,n)},onDelete:ss})}function ss(e){return ea()?window.confirm(i("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?wo(e,{onAfterChange:_n}):!1:(so(),!1)}function os(e){return xo(e,{onAfterChange:_n})}function is(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",o)}Zn(e,hn());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",o)}Zn(e,hn());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const o=t.id??t.reservationId;n.set("reservationEditId",String(o));try{localStorage.setItem("pendingReservationEditId",String(o)),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",r)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(o){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",o)}}oo({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(o=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",o)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Ar(){typeof window>"u"||(window.showReservationDetails=as,window.deleteReservation=ss,window.confirmReservation=os,window.editReservation=is)}export{qa as a,Yo as b,Ar as c,Sr as d,Ir as e,qr as f,Sa as g,hn as h,xr as i,W as j,_n as k,Er as l,ns as r,as as s,ye as u};
