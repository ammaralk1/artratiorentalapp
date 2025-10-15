import{d as Y,t as i,n as h,h as q,z as Fs,k as Re,j as Un,o as Rs,u as Ms}from"./auth.js";import{n as Q,l as ln,o as zs,p as et,D as be,q as Kn,t as Os,v as Se,w as qe,x as dn,y as Hs,z as Vs,A as Qn,h as Gn,B as Wn,C as Us,s as kt,i as Xn,E as Yn,F as Ks,G as Zn,H as Jn,f as ea,I as Qs,g as ta,J as Gs,K as Ws,u as Xs,a as Ys,L as Zs,k as Js}from"./reservationsService.js";import{n as ae,s as na,p as Be,q as Oe,t as At,i as un,r as Le,v as eo,w as to,g as no}from"./projectsService.js";const ao=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),so=new Set(["maintenance","reserved","retired"]);function oo(e){const t=String(e??"").trim().toLowerCase();return t&&ao.get(t)||"available"}function io(e){return e?typeof e=="object"?e:$t(e):null}function Ie(e){const t=io(e);return t?oo(t.status||t.state||t.statusLabel||t.status_label):"available"}function aa(e){return!so.has(Ie(e))}function De(e={}){return e.image||e.imageUrl||e.img||""}function ro(e){if(!e)return null;const t=Q(e),{equipment:n=[]}=Y();return(n||[]).find(a=>Q(a?.barcode)===t)||null}function $t(e){const t=Q(e);if(!t)return null;const{equipment:n=[]}=Y();return(n||[]).find(a=>Q(a?.barcode)===t)||null}let Ot=null,sa=[],Ht=new Map,Vt=new Map,ht=new Map,Rt=!1;function vt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function yt(e){return h(String(e||"")).trim().toLowerCase()}function co(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function oa(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function He(e){switch(e){case"maintenance":return i("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return i("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return i("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return i("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function mn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function pn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function ia(e,t,{allowPartial:n=!1}={}){const a=ae(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const o=[];return e.forEach((c,r)=>{r.includes(a)&&o.push(c)}),o.length===1?o[0]:null}function Ut(e,t={}){return ia(Ht,e,t)}function Kt(e,t={}){return ia(Vt,e,t)}function Me(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function ra(e){sa=Array.isArray(e)?[...e]:[]}function fn(){return sa}function gn(e){return e&&fn().find(t=>String(t.id)===String(e))||null}function Ln(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||i("projects.fallback.untitled","مشروع بدون اسم")}function tt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??be,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:be}function ie(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??be,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=be),t.dataset.companyShare=String(s),t.checked=!0}function Qt(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Rt){G();return}Rt=!0;const a=()=>{Rt=!1,G()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(be)),t.disabled){n.checked=!1,q(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),ie()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ie():n.checked&&(n.checked=!1));a()}function lo(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Dn(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function jn(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function xe({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=mn();if(!n||!a||!s)return;const o=ln()||[],c=i("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),r=i("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",c);const l=new Set;Ht=new Map;const d=o.filter(b=>b&&b.id!=null).map(b=>({id:String(b.id),label:jn(b)||r})).filter(b=>{if(!b.label)return!1;const g=ae(b.label);return!g||l.has(g)?!1:(l.add(g),Ht.set(g,b),!0)}).sort((b,g)=>b.label.localeCompare(g.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(b=>`<option value="${vt(b.label)}"></option>`).join("");const u=t?"":n.value,m=e?String(e):a.value?String(a.value):"",p=m?o.find(b=>String(b.id)===m):null;if(p){const b=jn(p)||r;a.value=String(p.id),n.value=b,n.dataset.selectedId=String(p.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function st({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:o}=pn();if(!a||!s||!o)return;const c=Array.isArray(t)?t:fn()||[],r=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",r);const l=[...c].filter(w=>w&&w.id!=null).sort((w,v)=>String(v.createdAt||v.start||"").localeCompare(String(w.createdAt||w.start||""))),d=n?"":a.value,u=i("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;Vt=new Map;const p=l.map(w=>{const v=Ln(w)||u;return{id:String(w.id),label:v}}).filter(w=>{if(!w.label)return!1;const v=ae(w.label);return!v||m.has(v)?!1:(m.add(v),Vt.set(v,w),!0)});o.innerHTML=p.map(w=>`<option value="${vt(w.label)}"></option>`).join("");const b=e?String(e):s.value?String(s.value):"",g=b?l.find(w=>String(w.id)===b):null;if(g){const w=Ln(g)||u;s.value=String(g.id),a.value=w,a.dataset.selectedId=String(g.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function wt(e,t,n){const{date:a,time:s}=Kn(n),o=document.getElementById(e),c=document.getElementById(t);if(o){if(a)if(o._flatpickr){const r=o._flatpickr.config?.dateFormat||"Y-m-d";o._flatpickr.setDate(a,!1,r)}else o.value=a;else o._flatpickr?o._flatpickr.clear():o.value="";o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0}))}if(c){if(s)if(c._flatpickr){const r=c._flatpickr.config?.dateFormat||"H:i";c._flatpickr.setDate(s,!1,r)}else c.value=s;else c._flatpickr?c._flatpickr.clear():c.value="";c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))}}function ca(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||st({selectedValue:a});const o=(ln()||[]).find(u=>String(u.id)===String(e.clientId)),c=o?.id!=null?String(o.id):"";xe(c?{selectedValue:c}:{selectedValue:"",resetInput:!0});const r=Dn(e,"start"),l=Dn(e,"end");r&&wt("res-start","res-start-time",r),l&&wt("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),ze(),G()}function la({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:Y(),s=Array.isArray(a)?a:[];ra(s);const o=t!=null?String(t):n.value?String(n.value):"";st({selectedValue:o,projectsList:s}),ze(),G()}function ze(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled"));else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1),n&&(n.disabled=!1,n.classList.remove("disabled"))}Qt("tax")}function bn(){const{input:e,hidden:t}=pn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),o=s?Kt(s,{allowPartial:a}):null;if(o){t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id);const c=gn(o.id);c?ca(c,{skipProjectSelectUpdate:!0}):(ze(),G())}else t.value="",e.dataset.selectedId="",ze(),G()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Kt(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function hn(){const{input:e,hidden:t}=mn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),o=s?Ut(s,{allowPartial:a}):null;o?(t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id)):(t.value="",e.dataset.selectedId=""),G()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ut(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function uo(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const r=decodeURIComponent(t);n=JSON.parse(r)}catch(r){console.warn("⚠️ [reservations/createForm] Failed to decode project context",r)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),!n||!n.projectId)return;document.getElementById("res-project")&&(st({selectedValue:String(n.projectId)}),ze());const c=gn(n.projectId);if(c?ca(c,{forceNotes:!!n.forceNotes}):G(),n.start&&wt("res-start","res-start-time",n.start),n.end&&wt("res-end","res-end-time",n.end),n.customerId){const l=(ln()||[]).find(d=>String(d.id)===String(n.customerId));l?.id!=null&&xe({selectedValue:String(l.id)})}else xe({selectedValue:""})}function ot(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:et(e,n),end:et(t,a)}}function da(e){const t=yt(e);if(t){const r=ht.get(t);if(r)return r}const{description:n,barcode:a}=oa(e);if(a){const r=$t(a);if(r)return r}const s=ae(n||e);if(!s)return null;let o=Yn();if(!o?.length){const r=Y();o=Array.isArray(r?.equipment)?r.equipment:[],o.length&&Jn(o)}const c=o.find(r=>ae(r?.desc||r?.description||"")===s);return c||o.find(r=>ae(r?.desc||r?.description||"").includes(s))||null}function ua(e,t="equipment-description-options"){const n=yt(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>yt(l.value)===n)||ht.has(n))return!0;const{description:s}=oa(e);if(!s)return!1;const o=ae(s);return o?(Yn()||[]).some(r=>ae(r?.desc||r?.description||"")===o):!1}const mo={available:0,reserved:1,maintenance:2,retired:3};function po(e){return mo[e]??5}function _n(e){switch(e){case"available":return i("reservations.equipment.status.available","متاح");case"reserved":return i("reservations.equipment.status.reserved","محجوز");case"maintenance":return i("reservations.equipment.status.maintenance","صيانة");case"retired":return i("reservations.equipment.status.retired","خارج الخدمة");default:return i("reservations.equipment.status.unknown","الحالة غير معروفة")}}function fo(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${_n(n)}`;const a=i("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${_n(n)})`}function Ve(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=na(),a=Y(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],o=Array.isArray(s)?s:[];Jn(o);const c=new Map;o.forEach(d=>{const u=co(d),m=yt(u);if(!m||!u)return;const p=Ie(d),b=po(p),g=c.get(m);if(!g){c.set(m,{normalized:m,value:u,bestItem:d,bestStatus:p,bestPriority:b,statuses:new Set([p])});return}g.statuses.add(p),b<g.bestPriority&&(g.bestItem=d,g.bestStatus=p,g.bestPriority=b,g.value=u)}),ht=new Map;const l=Array.from(c.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{ht.set(d.normalized,d.bestItem);const u=fo(d),m=vt(d.value);if(u===d.value)return`<option value="${m}"></option>`;const p=vt(u);return`<option value="${m}" label="${p}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function go(e,t){const n=Q(e);if(!n)return!1;const{start:a,end:s}=ot();if(!a||!s)return q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(Se().some(d=>Q(d.barcode)===n))return q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(qe(n,a,s))return q(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const c=$t(n);if(!c)return q(i("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1;const r=Ie(c);if(r!=="available")return q(He(r)),!1;const l=Oe(c);return l?(dn({id:l,equipmentId:l,barcode:n,desc:c.desc,qty:1,price:c.price,image:De(c)}),t&&(t.value=""),Ee(),G(),q(i("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")),!1)}function Gt(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=da(t);if(!n){q(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=ro(n.barcode),s=Ie(a||n);if(s!=="available"){q(He(s));return}const o=Q(n.barcode);if(!o){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c=Oe(n);if(!c){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r={id:c,equipmentId:c,barcode:o,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:De(n)},{start:l,end:d}=ot();if(!l||!d){q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(Se().some(p=>Q(p.barcode)===o)){q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(qe(o,l,d)){q(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}dn(r),Ee(),G(),e.value=""}function bo(){Ve();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Gt(e))});const t=()=>{ua(e.value,"equipment-description-options")&&Gt(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Ee(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Se(),a=i("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=i("reservations.create.summary.currency","SR"),o=i("reservations.create.equipment.imageAlt","صورة"),c=i("reservations.equipment.actions.increase","زيادة الكمية"),r=i("reservations.equipment.actions.decrease","تقليل الكمية"),l=i("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=Be(n);t.innerHTML=d.map(u=>{const m=u.items[0]||{},p=De(m)||u.image,b=p?`<img src="${p}" alt="${o}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',g=h(String(u.count)),w=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):w*u.count,x=`${h(w.toFixed(2))} ${s}`,f=`${h(v.toFixed(2))} ${s}`,T=u.barcodes.map(D=>h(String(D||""))).filter(Boolean),L=T.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${T.map(D=>`<li>${D}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${b}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${L}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${r}">−</button>
              <span class="reservation-qty-value">${g}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${c}">+</button>
            </div>
          </td>
          <td>${x}</td>
          <td>${f}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function ho(e){const t=Se(),a=Be(t).find(o=>o.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Hs(s),Ee(),G())}function vo(e){const t=Se(),n=t.filter(a=>At(a)!==e);n.length!==t.length&&(Zn(n),Ee(),G())}function yo(e){const t=Se(),a=Be(t).find(m=>m.key===e);if(!a)return;const{start:s,end:o}=ot();if(!s||!o){q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const c=new Set(t.map(m=>Q(m.barcode))),{equipment:r=[]}=Y(),l=(r||[]).find(m=>{const p=Q(m?.barcode);return!p||c.has(p)||At({desc:m?.desc||m?.description||m?.name||"",price:Number(m?.price)||0})!==e||!aa(m)?!1:!qe(p,s,o)});if(!l){q(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=Q(l.barcode),u=Oe(l);if(!u){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}dn({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:De(l)}),Ee(),G()}function G(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(h(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),o=a?!1:s?.checked||!1,c=document.getElementById("res-payment-status")?.value||"unpaid",{start:r,end:l}=ot();o&&ie();const d=tt(),u=document.getElementById("res-payment-status");Me(u,c),zs({selectedItems:Se(),discount:t,discountType:n,applyTax:o,paidStatus:c,start:r,end:l,companySharePercent:d})}function wo(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",o=>{o.target.value=h(o.target.value),G()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",G),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{Qt("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{Qt("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{Me(s),G()}),s.dataset.listenerAttached="true"),Me(s)}function xo(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){G();return}const o=t.dataset.syncedWithStart;(!t.value?.trim()||o!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),G()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Pn(){const{input:e,hidden:t}=mn(),{input:n,hidden:a}=pn(),{customers:s}=Y();let o=t?.value?String(t.value):"";if(!o&&e?.value){const j=Ut(e.value,{allowPartial:!0});j&&(o=String(j.id),t&&(t.value=o),e.value=j.label,e.dataset.selectedId=o)}const c=s.find(j=>String(j.id)===o);if(!c){q(i("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const r=c.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const j=Kt(n.value,{allowPartial:!0});j&&(l=String(j.id),a&&(a.value=l),n.value=j.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",p=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){q(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const b=`${d}T${m}`,g=`${u}T${p}`,w=new Date(b),v=new Date(g);if(Number.isNaN(w.getTime())||Number.isNaN(v.getTime())||w>=v){q(i("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const x=Vs(),f=Se();if(f.length===0&&x.length===0){q(i("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const T=document.getElementById("res-notes")?.value||"",L=parseFloat(h(document.getElementById("res-discount")?.value))||0,D=document.getElementById("res-discount-type")?.value||"percent",y=document.getElementById("res-payment-status")?.value||"unpaid",E=l?gn(l):null,N=lo(E);if(l&&!E){q(i("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const j of f){const z=Ie(j.barcode);if(z!=="available"){q(He(z));return}}for(const j of f){const z=Q(j.barcode);if(qe(z,b,g)){q(i("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const j of x)if(Qn(j,b,g)){q(i("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const P=document.getElementById("res-tax"),O=document.getElementById("res-company-share"),A=!!l,S=A?!1:P?.checked||!1,$=!!O?.checked;if(!A&&$!==S){q(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let B=$?tt():null;$&&(!Number.isFinite(B)||B<=0)&&(ie(),B=tt());const _=$&&S&&Number.isFinite(B)&&B>0;S&&ie();const F=Gn(f,L,D,S,x,{start:b,end:g,companySharePercent:_?B:0}),V=Fs(),M=Wn({reservationCode:V,customerId:r,start:b,end:g,status:N?"confirmed":"pending",title:null,location:null,notes:T,projectId:l||null,totalAmount:F,discount:L,discountType:D,applyTax:S,paidStatus:y,confirmed:N,items:f.map(j=>({...j,equipmentId:j.equipmentId??j.id})),technicians:x,companySharePercent:_?B:null,companyShareEnabled:_});try{const j=await Us(M);na(),Ve(),kt(),So(),q(i("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ot=="function"&&Ot({type:"created",reservation:j})}catch(j){console.error("❌ [reservations/createForm] Failed to create reservation",j);const z=Xn(j)?j.message:i("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");q(z,"error")}}function So(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),xe({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),o=document.getElementById("res-project-input");s&&(s.value=""),o&&(o.value="",o.dataset.selectedId=""),st({selectedValue:"",resetInput:!0});const c=document.getElementById("equipment-description");c&&(c.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Me(r,"unpaid")),Ks(),Zn([]),Ee(),ze(),G()}function qo(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){ho(s);return}if(a==="increase-group"&&s){yo(s);return}if(a==="remove-group"&&s){vo(s);return}}),e.dataset.listenerAttached="true")}function Io(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{const s=e.value;s?.trim()&&(clearTimeout(t),t=null,go(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim())return;const{start:o,end:c}=ot();!o||!c||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Eo(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Pn()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Pn()}),t.dataset.listenerAttached="true")}function Qi({onAfterSubmit:e}={}){Ot=typeof e=="function"?e:null;const{customers:t,projects:n}=Y();Os(t||[]),xe(),hn(),ra(n||[]),la({projectsList:n}),bn(),Ve(),bo(),xo(),wo(),qo(),Io(),Eo(),uo(),G(),Ee()}function ma(){Ve(),la(),xe(),hn(),bn(),Ee(),G()}if(typeof document<"u"){const e=()=>{xe(),st({projectsList:fn()}),hn(),bn(),G()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function pa(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Te(t),endDate:Te(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const o=new Date(n);return o.setDate(n.getDate()+6),{startDate:Te(n),endDate:Te(o)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Te(n),endDate:Te(a)}}return e==="upcoming"?{startDate:Te(t),endDate:""}:{startDate:"",endDate:""}}function ko(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let o=h(t?.value||"").trim(),c=h(n?.value||"").trim(),r=a?.value||"";if(new Set(["","today","week","month"]).has(r)||(r="",a&&(a.value=""),xt(t),xt(n),o="",c=""),!o&&!c&&r){const d=pa(r);o=d.startDate,c=d.endDate}return{searchTerm:ae(e?.value||""),startDate:o,endDate:c,status:s?.value||"",quickRange:r}}function Gi(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const o=document.getElementById("reservation-date-range");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>{Ao(o.value),t()}),o.dataset.listenerAttached="true");const c=document.getElementById("reservation-status-filter");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",t),c.dataset.listenerAttached="true");const r=document.getElementById("clear-filters");r&&!r.dataset.listenerAttached&&(r.addEventListener("click",()=>{n&&(n.value=""),xt(a),xt(s),o&&(o.value=""),c&&(c.value=""),t()}),r.dataset.listenerAttached="true")}function Ao(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=pa(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Te(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function xt(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function pt(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function $o(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Co(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=$o(n);if(a!==null)return a}return null}function Nn(e,t=0){const n=Co(e);if(n!=null)return n;const a=pt(e.createdAt??e.created_at);if(a!=null)return a;const s=pt(e.updatedAt??e.updated_at);if(s!=null)return s;const o=pt(e.start);if(o!=null)return o;const c=pt(e.end);if(c!=null)return c;const r=Number(e.id??e.reservationId);return Number.isFinite(r)?r:Number.isFinite(t)?t:0}function To({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const o=e.map((f,T)=>({reservation:f,index:T})),c=t.searchTerm||"",r=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",m=t.endDate||"",p=t.status||"",b=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,g=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,w=u?new Date(`${u}T00:00:00`):null,v=m?new Date(`${m}T23:59:59`):null,x=o.filter(({reservation:f})=>{const T=n.get(String(f.customerId)),L=s?.get?.(String(f.projectId)),D=f.start?new Date(f.start):null,y=un(f),{effectiveConfirmed:E}=Le(f,L);if(b!=null&&String(f.customerId)!==String(b)||g!=null&&!(Array.isArray(f.technicians)?f.technicians.map(S=>String(S)):[]).includes(String(g))||p==="confirmed"&&!E||p==="pending"&&E||p==="completed"&&!y||w&&D&&D<w||v&&D&&D>v)return!1;if(r){const A=[f.reservationId,f.id,f.reservation_id,f.reservationCode,f.reservation_code,f.code,f.reference,f.referenceNumber,f.reference_number],S=ae(A.filter(B=>B!=null&&B!=="").map(String).join(" ")).replace(/\s+/g,""),$=r.replace(/\s+/g,"");if(!S.includes($))return!1}if(l&&!ae(T?.customerName||"").includes(l))return!1;if(d){const A=[f.projectId,f.project_id,f.projectID,L?.id,L?.projectCode,L?.project_code],S=ae(A.filter(B=>B!=null&&B!=="").map(String).join(" ")).replace(/\s+/g,""),$=d.replace(/\s+/g,"");if(!S.includes($))return!1}if(!c)return!0;const N=f.items?.map?.(A=>`${A.barcode} ${A.desc}`).join(" ")||"",P=(f.technicians||[]).map(A=>a.get(String(A))?.name).filter(Boolean).join(" ");return ae([f.reservationId,T?.customerName,f.notes,N,P,L?.title].filter(Boolean).join(" ")).includes(c)});return x.sort((f,T)=>{const L=Nn(f.reservation,f.index),D=Nn(T.reservation,T.index);return L!==D?D-L:T.index-f.index}),x}function Bo({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=i("reservations.create.summary.currency","SR"),o=i("reservations.list.taxIncludedShort","(شامل الضريبة)"),c=i("reservations.list.unknownCustomer","غير معروف"),r=i("reservations.list.noNotes","لا توجد ملاحظات"),l=i("reservations.list.itemsCountShort","{count} عنصر"),d=i("reservations.list.crew.separator","، "),u=i("reservations.list.status.confirmed","✅ مؤكد"),m=i("reservations.list.status.pending","⏳ غير مؤكد"),p=i("reservations.list.payment.paid","💳 مدفوع"),b=i("reservations.list.payment.unpaid","💳 غير مدفوع"),g=i("reservations.list.actions.confirm","✔️ تأكيد"),w=i("reservations.list.project.unlinked","غير مرتبط بمشروع"),v=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),x={client:i("reservations.list.labels.client","👤 العميل"),project:i("reservations.list.labels.project","📁 المشروع"),start:i("reservations.list.labels.start","🗓️ بداية الحجز"),end:i("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:i("reservations.list.labels.cost","💵 التكلفة"),equipment:i("reservations.list.labels.equipment","📦 المعدات"),crew:i("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:f,index:T})=>{const L=t.get(String(f.customerId)),D=f.projectId?a?.get?.(String(f.projectId)):null,y=un(f),E=f.paid===!0||f.paid==="paid",{effectiveConfirmed:N,projectLinked:P}=Le(f,D),O=N?"status-confirmed":"status-pending",A=E?"status-paid":"status-unpaid";let S=`<span class="reservation-chip status-chip ${O}">${N?u:m}</span>`,$=`<span class="reservation-chip status-chip ${A}">${E?p:b}</span>`,B=E?" tile-paid":" tile-unpaid";y&&(B+=" tile-completed");let _="";y&&(S=`<span class="reservation-chip status-chip status-completed">${u}</span>`,$=`<span class="reservation-chip status-chip status-completed">${E?p:b}</span>`,_=` data-completed-label="${i("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const F=!P&&!N?`<button class="tile-confirm" data-reservation-index="${T}" data-action="confirm">${g}</button>`:"",V=F?`<div class="tile-actions">${F}</div>`:"",M=f.items?.length||0,j=(f.technicians||[]).map(de=>n.get(String(de))).filter(Boolean),z=j.map(de=>de.name).join(d)||"—",ee=h(String(f.reservationId??"")),se=f.start?h(Re(f.start)):"-",re=f.end?h(Re(f.end)):"-",W=h(String(f.cost??0)),le=h(String(M)),U=f.notes?h(f.notes):r,X=l.replace("{count}",le),Ue=f.applyTax?`<small>${o}</small>`:"";let ke=w;return f.projectId&&(ke=D?.title?h(D.title):v),`
      <div class="${F?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${B}"${_} data-reservation-index="${T}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ee}</div>
          <div class="tile-badges">
            ${S}
            ${$}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${x.client}</span>
            <span class="tile-value">${L?.customerName||c}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.project}</span>
            <span class="tile-value">${ke}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.start}</span>
            <span class="tile-value tile-inline">${se}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.end}</span>
            <span class="tile-value tile-inline">${re}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.cost}</span>
            <span class="tile-value">${W} ${s} ${Ue}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.equipment}</span>
            <span class="tile-value">${X}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${x.crew}</span>
            <span class="tile-value">${j.length?z:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${U}</span>
          </div>
        </div>
        ${V}
      </div>
    `}).join("")}function ft(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Lo(e,t,n=[],a,s=null){const{projectLinked:o,effectiveConfirmed:c}=Le(e,s),r=e.paid===!0||e.paid==="paid",l=un(e),d=e.items||[],u=Be(d),{technicians:m=[]}=Y(),p=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(m)?m:[]),b=new Map;p.forEach(k=>{if(!k||k.id==null)return;const H=String(k.id),J=b.get(H)||{};b.set(H,{...J,...k})});const g=(e.technicians||[]).map(k=>b.get(String(k))).filter(Boolean),w=Un(),v=ea(e.start,e.end),x=(k={})=>{const H=[k.dailyWage,k.daily_rate,k.dailyRate,k.wage,k.rate];for(const J of H){if(J==null)continue;const pe=parseFloat(h(String(J)));if(Number.isFinite(pe))return pe}return 0},f=(k={})=>{const H=[k.dailyTotal,k.daily_total,k.totalRate,k.total,k.total_wage];for(const J of H){if(J==null)continue;const pe=parseFloat(h(String(J)));if(Number.isFinite(pe))return pe}return x(k)},L=d.reduce((k,H)=>k+(H.qty||1)*(H.price||0),0)*v,D=g.reduce((k,H)=>k+x(H),0),y=g.reduce((k,H)=>k+f(H),0),E=D*v,N=y*v,P=L+N,O=parseFloat(e.discount)||0,A=e.discountType==="amount"?O:P*(O/100),S=Math.max(0,P-A),$=o?!1:e.applyTax,B=Number(e.cost),_=Number.isFinite(B),F=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,V=F!=null?parseFloat(h(String(F))):NaN;let z=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(V)&&V>0)&&Number.isFinite(V)?V:0;$&&z<=0&&(z=be);let ee=z>0?Math.max(0,S*(z/100)):0;const se=S+ee,re=$?se*.15:0,W=Number.isFinite(re)&&re>0?Number(re.toFixed(2)):0,le=se+W,U=Number.isFinite(le)?Number(le.toFixed(2)):0,X=o?U:_?B:U;z>0&&(ee=Number(Math.max(0,S*(z/100)).toFixed(2)));const Ue=h(String(e.reservationId??e.id??"")),ke=e.start?h(Re(e.start)):"-",Ae=e.end?h(Re(e.end)):"-",de=h(String(g.length)),it=h(L.toFixed(2)),En=h(A.toFixed(2)),Tt=h(S.toFixed(2)),rt=h(W.toFixed(2)),Ne=h((Number.isFinite(X)?X:0).toFixed(2)),ct=h(String(v)),te=i("reservations.create.summary.currency","SR"),Bt=i("reservations.details.labels.discount","الخصم"),lt=i("reservations.details.labels.tax","الضريبة (15%)"),dt=i("reservations.details.labels.crewTotal","إجمالي الفريق"),ve=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),Lt=i("reservations.details.labels.duration","عدد الأيام"),Dt=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),$e=i("reservations.details.labels.netProfit","💵 صافي الربح"),Ke=i("reservations.create.equipment.imageAlt","صورة"),ue={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},jt=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),_t=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),Pt=i("reservations.details.technicians.roleUnknown","غير محدد"),R=i("reservations.details.technicians.phoneUnknown","غير متوفر"),Z=i("reservations.details.technicians.wage","{amount} {currency} / اليوم"),me=i("reservations.list.status.confirmed","✅ مؤكد"),Ua=i("reservations.list.status.pending","⏳ غير مؤكد"),Ka=i("reservations.list.payment.paid","💳 مدفوع"),Qa=i("reservations.list.payment.unpaid","💳 غير مدفوع"),Ga=i("reservations.list.status.completed","📁 منتهي"),Wa=i("reservations.details.labels.id","🆔 رقم الحجز"),Xa=i("reservations.details.section.bookingInfo","بيانات الحجز"),Ya=i("reservations.details.section.paymentSummary","ملخص الدفع"),Za=i("reservations.details.labels.finalTotal","المجموع النهائي"),Ja=i("reservations.details.section.crew","😎 الفريق الفني"),es=i("reservations.details.crew.count","{count} عضو"),ts=i("reservations.details.section.items","📦 المعدات المرتبطة"),ns=i("reservations.details.items.count","{count} عنصر"),as=i("reservations.details.actions.edit","✏️ تعديل"),ss=i("reservations.details.actions.delete","🗑️ حذف"),os=i("reservations.details.labels.customer","العميل"),is=i("reservations.details.labels.contact","رقم التواصل"),rs=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const cs=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),ls=i("reservations.details.actions.openProject","📁 فتح المشروع"),ds=i("reservations.details.labels.start","بداية الحجز"),us=i("reservations.details.labels.end","نهاية الحجز"),ms=i("reservations.details.labels.notes","ملاحظات"),ps=i("reservations.list.noNotes","لا توجد ملاحظات"),fs=i("reservations.details.labels.itemsCount","عدد المعدات"),gs=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),bs=i("reservations.details.labels.paymentStatus","حالة الدفع"),hs=i("reservations.list.unknownCustomer","غير معروف"),kn=r?Ka:Qa,vs=u.reduce((k,H)=>k+(Number(H.quantity)||0),0),ys=h(String(vs)),An=ns.replace("{count}",ys),ws=es.replace("{count}",de),xs=e.notes?h(e.notes):ps,Ss=h(N.toFixed(2)),qs=h(String(z)),Is=h(ee.toFixed(2)),Es=`${qs}% (${Is} ${te})`,$n=Math.max(0,(X??0)-W-ee-E),ks=h($n.toFixed(2)),ye=[{icon:"💳",label:bs,value:kn},{icon:"📦",label:fs,value:An},{icon:"⏱️",label:Lt,value:ct},{icon:"💼",label:gs,value:`${it} ${te}`}];ye.push({icon:"😎",label:dt,value:`${Ss} ${te}`}),A>0&&ye.push({icon:"💸",label:Bt,value:`${En} ${te}`}),ye.push({icon:"📊",label:ve,value:`${Tt} ${te}`}),$&&W>0&&ye.push({icon:"🧾",label:lt,value:`${rt} ${te}`}),z>0&&ye.push({icon:"🏦",label:Dt,value:Es}),Math.abs($n-(X??0))>.009&&ye.push({icon:"💵",label:$e,value:`${ks} ${te}`}),ye.push({icon:"💰",label:Za,value:`${Ne} ${te}`});const As=ye.map(({icon:k,label:H,value:J})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${k} ${H}</span>
      <span class="summary-details-value">${J}</span>
    </div>
  `).join(""),Cn=[{text:c?me:Ua,className:c?"status-confirmed":"status-pending"},{text:kn,className:r?"status-paid":"status-unpaid"}];l&&Cn.push({text:Ga,className:"status-completed"});const $s=Cn.map(({text:k,className:H})=>`<span class="status-chip ${H}">${k}</span>`).join(""),Qe=(k,H,J)=>`
    <div class="res-info-row">
      <span class="label">${k} ${H}</span>
      <span class="value">${J}</span>
    </div>
  `;let Nt="";if(e.projectId){let k=ft(cs);if(s){const H=s.title||i("projects.fallback.untitled","مشروع بدون اسم");k=`${ft(H)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${ft(ls)}</button>`}Nt=`
      <div class="res-info-row">
        <span class="label">📁 ${rs}</span>
        <span class="value">${k}</span>
      </div>
    `}const Ce=[];Ce.push(Qe("👤",os,t?.customerName||hs)),Ce.push(Qe("📞",is,t?.phone||"—")),Ce.push(Qe("🗓️",ds,ke)),Ce.push(Qe("🗓️",us,Ae)),Ce.push(Qe("📝",ms,xs)),Nt&&Ce.push(Nt);const Cs=Ce.join(""),Ts=u.length?u.map(k=>{const H=k.items[0]||{},J=De(H)||k.image,pe=J?`<img src="${J}" alt="${Ke}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',ut=Number(k.quantity)||Number(k.count)||0,mt=h(String(ut)),Tn=Number.isFinite(Number(k.unitPrice))?Number(k.unitPrice):0,js=Number.isFinite(Number(k.totalPrice))?Number(k.totalPrice):Tn*ut,_s=`${h(Tn.toFixed(2))} ${te}`,Ps=`${h(js.toFixed(2))} ${te}`,Bn=k.barcodes.map(Ft=>h(String(Ft||""))).filter(Boolean),Ns=Bn.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Bn.map(Ft=>`<li>${Ft}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td>
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${pe}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${ft(H.desc||H.description||H.name||k.description||"-")}</div>
                  ${Ns}
                </div>
              </div>
            </td>
            <td>
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${mt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td>${_s}</td>
            <td>${Ps}</td>
            <td>
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${jt}</td></tr>`,Bs=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${ue.item}</th>
            <th>${ue.quantity}</th>
            <th>${ue.unitPrice}</th>
            <th>${ue.total}</th>
            <th>${ue.actions}</th>
          </tr>
        </thead>
        <tbody>${Ts}</tbody>
      </table>
    </div>
  `,Ls=g.map((k,H)=>{const J=h(String(H+1)),pe=k.role||Pt,ut=k.phone||R,mt=k.wage?Z.replace("{amount}",h(String(k.wage))).replace("{currency}",te):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${J}</span>
          <span class="technician-name">${k.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${pe}</div>
          <div>📞 ${ut}</div>
          ${mt?`<div>💰 ${mt}</div>`:""}
        </div>
      </div>
    `}).join(""),Ds=g.length?`<div class="reservation-technicians-grid">${Ls}</div>`:`<ul class="reservation-modal-technicians"><li>${_t}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Wa}</span>
          <strong>${Ue}</strong>
        </div>
        <div class="status-chips">
          ${$s}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Xa}</h6>
          ${Cs}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${Ya}</h6>
            <div class="summary-details">
              ${As}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Ja}</span>
          <span class="count">${ws}</span>
        </div>
        ${Ds}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${ts}</span>
          <span class="count">${An}</span>
        </div>
        ${Bs}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${i("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${as}</button>
        ${w?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${ss}</button>`:""}
      </div>
    </div>
  `}const Do=`@page {
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
`,fa="reservations.quote.sequence",fe={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},jo=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],vn=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],ga=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>I(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>I(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>I(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>I(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>I(h(Number(e?.price||0).toFixed(2)))}],ba=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>I(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>I(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>I(e?.role||i("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>I(e?.phone||i("reservations.details.technicians.phoneUnknown","غير متوفر"))}],ha={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"companyShare",labelKey:"reservations.details.labels.companyShare",fallback:"🏦 نسبة الشركة"},{id:"netProfit",labelKey:"reservations.details.labels.netProfit",fallback:"صافي الربح"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:ga.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:ba.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},_o="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Po="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",No="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Fo=Do.trim(),Ro=/color\([^)]*\)/gi,St=/(color\(|color-mix\()/i,Mo=document.createElement("canvas"),gt=Mo.getContext("2d"),va=/^data:image\/svg\+xml/i,zo=/\.svg($|[?#])/i,Ye=512,Wt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",ya=96,wa=25.4,Xt=210,bt=297,Ze=Math.round(Xt/wa*ya),Je=Math.round(bt/wa*ya),Oo=2,xa=/safari/i,Ho=/(iphone|ipad|ipod)/i,Vo=/(iphone|ipad|ipod)/i,Uo=/(crios|fxios|edgios|opios)/i,qt="[reservations/pdf]";let K=null,C=null,ce=1,Ge=null,We=null,we=null,Fe=null;function Yt(){return!!window?.bootstrap?.Modal}function Ko(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),we||(we=document.createElement("div"),we.className="modal-backdrop fade show",we.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(we)),Fe||(Fe=t=>{t.key==="Escape"&&Zt(e)},document.addEventListener("keydown",Fe));try{e.focus({preventScroll:!0})}catch{}}}function Zt(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),we&&(we.remove(),we=null),Fe&&(document.removeEventListener("keydown",Fe),Fe=null))}function Qo(e){if(e){if(Yt()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Ko(e)}}function Sa(){const e={};return Object.entries(ha).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function Go(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Wo(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function qa(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Ia(){return Object.fromEntries(vn.map(({id:e})=>[e,!1]))}function yn(e,t){return e.sectionExpansions||(e.sectionExpansions=Ia()),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Xo(e,t){return yn(e,t)?.[t]!==!1}function wn(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Yo(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Ho.test(e)}function Zo(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=xa.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Ea(){return Yo()&&Zo()}function Jo(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"";return Vo.test(e)&&xa.test(e)&&!Uo.test(e)}function Mt(e,...t){try{console.log(`${qt} ${e}`,...t)}catch{}}function Jt(e,...t){try{console.warn(`${qt} ${e}`,...t)}catch{}}function ei(e,t,...n){try{t?console.error(`${qt} ${e}`,t,...n):console.error(`${qt} ${e}`,...n)}catch{}}function oe(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function ti(e,t="لا توجد بيانات للعرض."){const n=I(i(e,t));return oe(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Fn(e,t){return Array.isArray(e)&&e.length?e:[ti(t)]}function en(e,t="#000"){if(!gt||!e)return t;try{return gt.fillStyle="#000",gt.fillStyle=e,gt.fillStyle||t}catch{return t}}function ni(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=en(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function ka(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Ro,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const ai=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function Aa(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;ai.forEach(c=>{const r=s[c];if(r&&St.test(r)){const l=c.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),d=c==="backgroundColor"?"#ffffff":s.color||"#000000",u=en(r,d);a.style.setProperty(l,u,"important")}});const o=s.backgroundImage;if(o&&St.test(o)){const c=en(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",c,"important")}})}function $a(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(o=>{const c=a[o];if(c&&St.test(c)){const r=o.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),l=o==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(r,l,"important")}});const s=a.backgroundImage;s&&St.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function Rn(e,t=Ye){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function si(e){if(!e)return{width:Ye,height:Ye};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Rn(t,0):0,s=n?Rn(n,0):0;if(a>0&&s>0)return{width:a,height:s};const o=e.getAttribute?.("viewBox");if(o){const c=o.trim().split(/[\s,]+/).map(r=>parseFloat(r||"0"));if(c.length>=4){const[,,r,l]=c;a=a||(Number.isFinite(r)&&r>0?r:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Ye,height:s||Ye}}function Ca(e=""){return typeof e!="string"?!1:va.test(e)||zo.test(e)}function oi(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function ii(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=o=>{const c=o?.message||`Unable to load image from ${e}`;a(new Error(c))},s.src=e})}async function Ta(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const o=await ii(s),c=n.createElement("canvas"),r=Math.max(t.width||o.naturalWidth||o.width||0,1),l=Math.max(t.height||o.naturalHeight||o.height||r,1);c.width=r,c.height=l;const d=c.getContext("2d");return d.clearRect(0,0,r,l),d.drawImage(o,0,0,r,l),c.toDataURL("image/png")}catch(o){return console.warn("[reservations/pdf] failed to rasterize SVG content",o),null}finally{URL.revokeObjectURL(s)}}async function ri(e){if(!e)return null;if(va.test(e))return oi(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function ci(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Ca(t))return!1;const n=await ri(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Wt),!1;const a=await Ta(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Wt),!1)}async function li(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=si(e),s=await Ta(n,a),c=(e.ownerDocument||document).createElement("img");c.setAttribute("src",s||Wt),c.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),c.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&c.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&c.setAttribute("style",e.getAttribute("style"));const r=e.getAttribute("width"),l=e.getAttribute("height");return r&&c.setAttribute("width",r),l&&c.setAttribute("height",l),e.parentNode?.replaceChild(c,e),!!s}async function Ba(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Ca(s.getAttribute?.("src"))&&a.push(ci(s))}),n.forEach(s=>{a.push(li(s))}),a.length&&await Promise.allSettled(a)}function tn(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){ei(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const o=n||i("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى.");if(q(o),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function nn({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Jt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Jt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function xn(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",o=>n(o)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=o=>n(o),document.head.appendChild(s)})}function Mn(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function zn(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function di(){const e=zn();return e||(We||(We=xn(Po).catch(t=>{throw We=null,t}).then(()=>{const t=zn();if(!t)throw We=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),We)}async function ui(){const e=Mn();return e||(Ge||(Ge=xn(No).catch(t=>{throw Ge=null,t}).then(()=>{const t=Mn();if(!t)throw Ge=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Ge)}async function mi(){if(window.html2pdf||await xn(_o),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}ni()}function I(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function pi(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function fi(){const e=window.localStorage?.getItem?.(fa),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function gi(){const t=fi()+1;return{sequence:t,quoteNumber:pi(t)}}function bi(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(fa,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function hi(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function La(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function vi(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return La(e)}function yi(e){const t=kt()||[],{technicians:n=[]}=Y(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(o=>{if(!o||o.id==null)return;const c=String(o.id),r=s.get(c)||{};s.set(c,{...r,...o})}),(e.technicians||[]).map(o=>s.get(String(o))).filter(Boolean)}function wi(e,t,n){const{projectLinked:a}=Le(e,n),s=ea(e.start,e.end),r=(Array.isArray(e.items)?e.items:[]).reduce((V,M)=>V+(Number(M?.qty)||1)*(Number(M?.price)||0),0)*s,l=t.reduce((V,M)=>V+La(M),0),d=t.reduce((V,M)=>V+vi(M),0),u=l*s,m=d*s,p=r+m,b=parseFloat(e.discount)||0,g=e.discountType==="amount"?b:p*(b/100),w=Math.max(0,p-g),v=a?!1:e.applyTax,x=Number(e.cost),f=Number.isFinite(x),T=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,L=T!=null?parseFloat(h(String(T).replace("%","").trim())):NaN,D=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let E=(D!=null?D===!0||D===1||D==="1"||String(D).toLowerCase()==="true":Number.isFinite(L)&&L>0)&&Number.isFinite(L)?Number(L):0;v&&E<=0&&(E=be);let N=E>0?Math.max(0,w*(E/100)):0;N=Number(N.toFixed(2));const P=w+N;let O=v?P*.15:0;(!Number.isFinite(O)||O<0)&&(O=0),O=Number(O.toFixed(2));const A=P+O,S=Number.isFinite(A)?Number(A.toFixed(2)):0,$=a?S:f?x:S,B=Math.max(0,$-O-N-u),_={equipmentTotal:r,crewTotal:m,crewCostTotal:u,discountAmount:g,subtotalAfterDiscount:w,taxableAmount:P,taxAmount:O,finalTotal:$,companySharePercent:E,companyShareAmount:N,netProfit:B},F={equipmentTotal:h(r.toFixed(2)),crewTotal:h(m.toFixed(2)),discountAmount:h(g.toFixed(2)),subtotalAfterDiscount:h(w.toFixed(2)),taxableAmount:h(P.toFixed(2)),taxAmount:h(O.toFixed(2)),finalTotal:h($.toFixed(2)),companySharePercent:h(E.toFixed(2)),companyShareAmount:h(N.toFixed(2)),netProfit:h(B.toFixed(2))};return{totals:_,totalsDisplay:F,rentalDays:s}}function Da({reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:o,rentalDays:c,currencyLabel:r,sections:l,fieldSelections:d={},quoteNumber:u,quoteDate:m}){const{companySharePercent:p=0,companyShareAmount:b=0,netProfit:g=0}=s||{},w=h(String(e?.reservationId??e?.id??"")),v=e.start?h(Re(e.start)):"-",x=e.end?h(Re(e.end)):"-",f=t?.customerName||t?.full_name||t?.name||"-",T=t?.phone||"-",L=t?.email||"-",D=t?.company||t?.company_name||"-",y=h(T),E=n?.title||n?.name||i("reservations.details.project.none","غير مرتبط بمشروع"),N=n?.code||n?.projectCode||"",P=h(String(c)),O=e?.notes||"",A=Go(d),S=(R,Z)=>qa(A,R,Z),$=R=>l?.has?.(R),B=`<div class="quote-placeholder">${I(i("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,_=(R,Z)=>`<div class="info-plain__item">${I(R)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${I(Z)}</strong></div>`,F=(R,Z,{variant:me="inline"}={})=>me==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${I(R)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${I(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${I(R)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${I(Z)}</span>
    </span>`,V=(R,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${I(R)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${I(Z)}</span>
    </div>`,M=[];S("customerInfo","customerName")&&M.push(_(i("reservations.details.labels.customer","العميل"),f)),S("customerInfo","customerCompany")&&M.push(_(i("reservations.details.labels.company","الشركة"),D)),S("customerInfo","customerPhone")&&M.push(_(i("reservations.details.labels.phone","الهاتف"),y)),S("customerInfo","customerEmail")&&M.push(_(i("reservations.details.labels.email","البريد"),L));const j=$("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${I(i("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:B}
      </section>`:"",z=[];S("reservationInfo","reservationId")&&z.push(_(i("reservations.details.labels.reservationId","رقم الحجز"),w||"-")),S("reservationInfo","reservationStart")&&z.push(_(i("reservations.details.labels.start","بداية الحجز"),v)),S("reservationInfo","reservationEnd")&&z.push(_(i("reservations.details.labels.end","نهاية الحجز"),x)),S("reservationInfo","reservationDuration")&&z.push(_(i("reservations.details.labels.duration","عدد الأيام"),P));const ee=$("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${I(i("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:B}
      </section>`:"",se=[];S("projectInfo","projectTitle")&&se.push(_(i("reservations.details.labels.project","المشروع"),E)),S("projectInfo","projectCode")&&se.push(_(i("reservations.details.labels.code","الرمز"),N||"-"));const re=$("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${I(i("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${se.length?`<div class="info-plain">${se.join("")}</div>`:B}
      </section>`:"",W=[];if(S("financialSummary","equipmentTotal")&&W.push(F(i("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${o.equipmentTotal} ${r}`)),S("financialSummary","crewTotal")&&W.push(F(i("reservations.details.labels.crewTotal","إجمالي الفريق"),`${o.crewTotal} ${r}`)),S("financialSummary","discountAmount")&&W.push(F(i("reservations.details.labels.discount","الخصم"),`${o.discountAmount} ${r}`)),S("financialSummary","taxAmount")&&W.push(F(i("reservations.details.labels.tax","الضريبة"),`${o.taxAmount} ${r}`)),p>0&&S("financialSummary","companyShare")){const R=o.companySharePercent??h(p.toFixed(2)),Z=o.companyShareAmount??h(b.toFixed(2)),me=`${R}% (${Z} ${r})`;W.push(F(i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),me))}const le=S("financialSummary","finalTotal"),U=S("financialSummary","netProfit")&&Number.isFinite(g)&&Math.abs((g??0)-(s?.finalTotal??0))>.009,X=[];le&&X.push(F(i("reservations.details.labels.total","الإجمالي النهائي"),`${o.finalTotal} ${r}`,{variant:"final"})),U&&X.push(F(i("reservations.details.labels.netProfit","💵 صافي الربح"),`${o.netProfit} ${r}`,{variant:"final"}));const Ue=X.length?`<div class="totals-final">${X.join("")}</div>`:"",ke=$("financialSummary")?!W.length&&!le?`<section class="quote-section quote-section--financial">${B}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${I(i("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${W.length?`<div class="totals-inline">${W.join("")}</div>`:""}
            ${Ue}
          </div>
        </section>`:"",Ae=ga.filter(R=>S("items",R.id)),de=Ae.length>0,it=de?Ae.map(R=>`<th>${I(R.labelKey?i(R.labelKey,R.fallback):R.fallback)}</th>`).join(""):"",Tt=Array.isArray(e.items)&&e.items.length>0?e.items.map((R,Z)=>`<tr>${Ae.map(me=>`<td>${me.render(R,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ae.length,1)}" class="empty">${I(i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,rt=$("items")?de?`<section class="quote-section quote-section--table">
            <h3>${I(i("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${it}</tr>
              </thead>
              <tbody>${Tt}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${I(i("reservations.details.items.title","المعدات"))}</h3>
            ${B}
          </section>`:"",Ne=ba.filter(R=>S("crew",R.id)),ct=Ne.length>0,te=ct?Ne.map(R=>`<th>${I(R.labelKey?i(R.labelKey,R.fallback):R.fallback)}</th>`).join(""):"",Bt=a.length?a.map((R,Z)=>`<tr>${Ne.map(me=>`<td>${me.render(R,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ne.length,1)}" class="empty">${I(i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,lt=$("crew")?ct?`<section class="quote-section quote-section--table">
            <h3>${I(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${te}</tr>
              </thead>
              <tbody>${Bt}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${I(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${B}
          </section>`:"",dt=$("notes")?`<section class="quote-section">
        <h3>${I(i("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${I(O||i("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ve=[];S("payment","beneficiary")&&ve.push(V(i("reservations.quote.labels.beneficiary","اسم المستفيد"),fe.beneficiaryName)),S("payment","bank")&&ve.push(V(i("reservations.quote.labels.bank","اسم البنك"),fe.bankName)),S("payment","account")&&ve.push(V(i("reservations.quote.labels.account","رقم الحساب"),h(fe.accountNumber))),S("payment","iban")&&ve.push(V(i("reservations.quote.labels.iban","رقم الآيبان"),h(fe.iban)));const Lt=`<section class="quote-section">
      <div class="payment-block">
        <h3>${I(i("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ve.length?ve.join(""):B}</div>
      </div>
      <p class="quote-approval-note">${I(fe.approvalNote)}</p>
    </section>`,Dt=`<footer class="quote-footer">
        <h4>${I(i("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${jo.map(R=>`<li>${I(R)}</li>`).join("")}</ul>
      </footer>`,$e=[];j&&ee?$e.push(oe(`<div class="quote-section-row">${j}${ee}</div>`,{blockType:"group"})):(ee&&$e.push(oe(ee)),j&&$e.push(oe(j))),re&&$e.push(oe(re));const Ke=[];rt&&Ke.push(oe(rt,{blockType:"table",extraAttributes:'data-table-id="items"'})),lt&&Ke.push(oe(lt,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const ue=[];ke&&ue.push(oe(ke,{blockType:"summary"})),dt&&ue.push(oe(dt));const jt=[oe(Lt,{blockType:"payment"}),oe(Dt,{blockType:"footer"})],_t=[...Fn($e,"reservations.quote.placeholder.page1"),...Ke,...Fn(ue,"reservations.quote.placeholder.page2"),...jt],Pt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${I(fe.logoUrl)}" alt="${I(fe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${I(i("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${I(fe.companyName)}</p>
        <p class="quote-company-cr">${I(i("reservations.quote.labels.cr","السجل التجاري"))}: ${I(fe.commercialRegistry)}</p>
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
      <style>${Fo}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Pt}
          ${_t.join("")}
        </div>
      </div>
    </div>
  `}function xi(e){return!e||e.complete&&e.naturalHeight!==0?Promise.resolve():new Promise(t=>{const n=()=>t();e.addEventListener("load",n,{once:!0}),e.addEventListener("error",n,{once:!0})})}async function nt(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),o=a.map(r=>xi(r)),c=[s,...o].map(r=>r.catch(l=>(Jt("asset load failed",l),null)));await Promise.all(c),await new Promise(r=>n.requestAnimationFrame(()=>r()))}async function ja(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),o=e.querySelector("[data-quote-source]"),c=o?.querySelector("[data-quote-header-template]");if(!s||!o||!c)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Ba(o),await nt(o),s.innerHTML="";const r=Array.from(o.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=y=>{y.style.margin="0 auto",y.style.breakInside="avoid",y.style.pageBreakInside="avoid",y.style.pageBreakAfter="auto",y.style.breakAfter="auto"},m=()=>{const y=a.createElement("div"),E=s.childElementCount===0;if(y.className="quote-page",y.dataset.pageIndex=String(s.childElementCount),E){y.classList.add("quote-page--primary");const P=c.cloneNode(!0);P.removeAttribute("data-quote-header-template"),y.appendChild(P)}else y.classList.add("quote-page--continuation");const N=a.createElement("main");N.className="quote-body",y.appendChild(N),s.appendChild(y),u(y),l=y,d=N},p=()=>{(!l||!d||!d.isConnected)&&m()},b=()=>{if(!l||!d||d.childElementCount>0)return;const y=l;l=null,d=null,y.parentNode&&y.parentNode.removeChild(y)},g=()=>{l=null,d=null},w=()=>l?l.scrollHeight-l.clientHeight>Oo:!1,v=(y,{allowOverflow:E=!1}={})=>(p(),d.appendChild(y),w()&&!E?(d.removeChild(y),b(),!1):!0),x=y=>{const E=y.cloneNode(!0);E.removeAttribute?.("data-quote-block"),E.removeAttribute?.("data-block-type"),E.removeAttribute?.("data-table-id"),!v(E)&&(g(),!v(E)&&v(E,{allowOverflow:!0}))},f=y=>{const E=y.querySelector("table");if(!E){x(y);return}const N=y.querySelector("h3"),P=E.querySelector("thead"),O=Array.from(E.querySelectorAll("tbody tr"));if(!O.length){x(y);return}let A=null,S=0;const $=(_=!1)=>{const F=y.cloneNode(!1);F.removeAttribute("data-quote-block"),F.removeAttribute("data-block-type"),F.removeAttribute("data-table-id"),F.classList.add("quote-section--table-fragment"),_&&F.classList.add("quote-section--table-fragment--continued");const V=N?N.cloneNode(!0):null;V&&F.appendChild(V);const M=E.cloneNode(!1);M.classList.add("quote-table--fragment"),P&&M.appendChild(P.cloneNode(!0));const j=a.createElement("tbody");return M.appendChild(j),F.appendChild(M),{section:F,body:j}},B=(_=!1)=>A||(A=$(_),v(A.section)||(g(),v(A.section)||v(A.section,{allowOverflow:!0})),A);O.forEach(_=>{B(S>0);const F=_.cloneNode(!0);if(A.body.appendChild(F),w()&&(A.body.removeChild(F),A.body.childElementCount||(d.removeChild(A.section),A=null,b()),g(),A=null,B(S>0),A.body.appendChild(F),w())){A.section.classList.add("quote-section--table-fragment--overflow"),S+=1;return}S+=1}),A=null};if(!r.length)return;r.forEach(y=>{y.getAttribute("data-block-type")==="table"?f(y):x(y)});const T=Array.from(s.children),L=[];T.forEach((y,E)=>{const N=y.querySelector(".quote-body");if(E!==0&&(!N||N.childElementCount===0)){y.remove();return}L.push(y)}),L.forEach((y,E)=>{const N=E===0;y.style.pageBreakAfter="auto",y.style.breakAfter="auto",y.style.pageBreakBefore=N?"auto":"always",y.style.breakBefore=N?"auto":"page",n?y.style.boxShadow="":y.style.boxShadow="none"});const D=L[L.length-1]||null;l=D,d=D?.querySelector(".quote-body")||null,await nt(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Sn(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Si(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[o,c]=await Promise.all([ui(),di()]),r=typeof window<"u"&&window.devicePixelRatio||1,l=wn(),d=Ea(),u=Jo();let m;u?m=1.5:d?m=Math.min(1.7,Math.max(1.2,r*1.1)):l?m=Math.min(1.8,Math.max(1.25,r*1.2)):m=Math.min(2,Math.max(1.6,r*1.4));const p=u||d?.9:l?.92:.95,b=new o({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),g={scale:m,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!0,removeContainer:!1,logging:!0};let w=0;const v=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let f=0;f<s.length;f+=1){const T=s[f];await Ba(T),await nt(T);const L=T.ownerDocument||document,D=L.createElement("div");Object.assign(D.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const y=T.cloneNode(!0);y.style.width=`${Ze}px`,y.style.maxWidth=`${Ze}px`,y.style.minWidth=`${Ze}px`,y.style.height=`${Je}px`,y.style.maxHeight=`${Je}px`,y.style.minHeight=`${Je}px`,y.style.position="relative",y.style.background="#ffffff",Sn(y),D.appendChild(y),L.body.appendChild(D);let E;try{await nt(y),E=await c(y,{...g,scale:m,width:Ze,height:Je,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(_){throw tn(_,"pageCapture",{toastMessage:v}),_}finally{D.parentNode?.removeChild(D)}if(!E)continue;const N=E.width||1,O=(E.height||1)/N;let A=Xt,S=A*O,$=0;if(S>bt){const _=bt/S;S=bt,A=A*_,$=Math.max(0,(Xt-A)/2)}const B=E.toDataURL("image/jpeg",p);w>0&&b.addPage(),b.addImage(B,"JPEG",$,0,A,S,`page-${w+1}`,"FAST"),w+=1,await new Promise(_=>window.requestAnimationFrame(_))}}catch(f){throw nn({safariWindowRef:n,mobileWindowRef:a}),f}if(w===0)throw nn({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(d||a&&!a.closed){const f=b.output("blob"),T=URL.createObjectURL(f);d?n&&!n.closed?(n.location.href=T,n.focus?.()):window.open(T,"_blank"):a&&!a.closed&&(a.location.href=T,a.focus?.()),setTimeout(()=>URL.revokeObjectURL(T),6e4)}else b.save(t)}function qn(){if(!C||!K)return;const{previewFrame:e}=K;if(!e)return;const t=Da({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(ka(s),Aa(s,a),$a(s,a));const o=n?.getElementById("quotation-pdf-root");try{o&&(await ja(o,{context:"preview"}),Sn(o))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const c=Array.from(n?.querySelectorAll?.(".quote-page")||[]),r=n?.querySelector(".quote-preview-pages"),l=Ze;let d=18;if(r&&n?.defaultView){const p=n.defaultView.getComputedStyle(r),b=parseFloat(p.rowGap||p.gap||`${d}`);Number.isFinite(b)&&b>=0&&(d=b)}const u=Je,m=c.length?c.length*u+Math.max(0,(c.length-1)*d):u;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(m),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${m}px`,e.style.minHeight=`${m}px`,K?.previewFrameWrapper&&!K?.userAdjustedZoom){const p=K.previewFrameWrapper.clientWidth-24;p>0&&p<l?ce=Math.max(p/l,.3):ce=1}Pa(ce)},{once:!0})}function qi(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?C.sections.add(n):C.sections.delete(n),_a(),qn())}function Ii(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=C.fields||(C.fields=Sa()),o=Wo(s,n);t.checked?o.add(a):o.delete(a),qn()}function Ei(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(yn(C,n),C.sectionExpansions[n]=t.open)}function _a(){if(!K?.toggles||!C)return;const{toggles:e}=K,t=C.fields||{};yn(C);const n=vn.map(({id:a,labelKey:s,fallback:o})=>{const c=i(s,o),r=C.sections.has(a),l=ha[a]||[],d=Xo(C,a),u=l.length?`<div class="quote-toggle-sublist">
          ${l.map(m=>{const p=qa(t,a,m.id),b=r?"":"disabled",g=m.labelKey?i(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${m.id}" ${p?"checked":""} ${b}>
                <span>${I(g)}</span>
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
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",qi)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",Ii)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",Ei)})}function ki(){if(K?.modal)return K;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(d),n.innerHTML="";const p=document.createElement("div");p.className="quote-preview-scroll",p.appendChild(m),n.appendChild(p),l.appendChild(u),s?.addEventListener("click",async()=>{if(C){s.disabled=!0;try{await $i()}finally{s.disabled=!1}}});const b=()=>{Yt()||Zt(e)};r.forEach(x=>{x?.addEventListener("click",b)}),c&&!r.includes(c)&&c.addEventListener("click",b),e.addEventListener("click",x=>{Yt()||x.target===e&&Zt(e)}),K={modal:e,toggles:t,preview:n,previewFrameWrapper:m,zoomControls:u,zoomValue:u.querySelector("[data-zoom-value]"),previewFrame:d,meta:a,downloadBtn:s,userAdjustedZoom:!1};const g=u.querySelector("[data-zoom-out]"),w=u.querySelector("[data-zoom-in]"),v=u.querySelector("[data-zoom-reset]");return g?.addEventListener("click",()=>On(-.1)),w?.addEventListener("click",()=>On(.1)),v?.addEventListener("click",()=>It(1,{markManual:!0})),It(ce),K}function It(e,{silent:t=!1,markManual:n=!1}={}){ce=Math.min(Math.max(e,.25),2.2),n&&K&&(K.userAdjustedZoom=!0),Pa(ce),!t&&K?.zoomValue&&(K.zoomValue.textContent=`${Math.round(ce*100)}%`)}function On(e){It(ce+e,{markManual:!0})}function Pa(e){if(!K?.previewFrame||!K.previewFrameWrapper)return;const t=K.previewFrame,n=K.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",wn()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Ai(){if(!K?.meta||!C)return;const{meta:e}=K;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${I(i("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${I(C.quoteNumber)}</strong></div>
      <div><span>${I(i("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${I(C.quoteDateLabel)}</strong></div>
    </div>
  `}async function $i(){if(!C)return;const e=wn(),t=!e&&Ea(),n=e?window.open("","_blank"):null,a=t?window.open("data:text/html;charset=utf-8,"+encodeURIComponent(""),"_blank"):null;let s=null;const o=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await mi(),Mt("html2pdf ensured");const c=Da({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel});s=document.createElement("div"),s.innerHTML=c,Object.assign(s.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(s),ka(s),Aa(s),$a(s),Mt("export container prepared");const r=s.firstElementChild;if(r){r.setAttribute("dir","rtl"),r.style.direction="rtl",r.style.textAlign="right",r.setAttribute("data-theme","light"),r.classList.remove("dark","dark-mode"),r.style.margin="0",r.style.padding="0",r.style.width="210mm",r.style.maxWidth="210mm",r.style.marginLeft="auto",r.style.marginRight="auto",r.scrollTop=0,r.scrollLeft=0;try{await ja(r,{context:"export"}),await nt(r),Sn(r),Mt("layout complete for export document")}catch(d){tn(d,"layoutQuoteDocument",{suppressToast:!0})}}const l=`quotation-${C.quoteNumber}.pdf`;await Si(r,{filename:l,safariWindowRef:a,mobileWindowRef:n}),C.sequenceCommitted||(bi(C.quoteSequence),C.sequenceCommitted=!0)}catch(c){nn({container:s,safariWindowRef:a,mobileWindowRef:n}),s=null,tn(c,"exportQuoteAsPdf",{toastMessage:o})}finally{s&&s.parentNode&&s.parentNode.removeChild(s)}}function Ci(){const e=ki();e?.modal&&(ce=1,K&&(K.userAdjustedZoom=!1),It(ce,{silent:!0}),_a(),Ai(),qn(),Qo(e.modal))}async function Ti({reservation:e,customer:t,project:n}){if(!e){q(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=yi(e),{totalsDisplay:s,totals:o,rentalDays:c}=wi(e,a,n),r=i("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=gi(),u=new Date;C={reservation:e,customer:t,project:n,technicians:a,totals:o,totalsDisplay:s,rentalDays:c,currencyLabel:r,sections:new Set(vn.filter(m=>m.defaultSelected).map(m=>m.id)),sectionExpansions:Ia(),fields:Sa(),quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:hi(u),sequenceCommitted:!1},Ci()}function Bi({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=kt(),{reservations:o=[],customers:c=[],technicians:r=[],projects:l=[]}=Y(),d=Array.isArray(s)?s:r||[],u=new Map((l||[]).map(v=>[String(v.id),v])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!o||o.length===0){m.innerHTML=`<p>${i("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||ko(),b=new Map(c.map(v=>[String(v.id),v])),g=new Map(d.map(v=>[String(v.id),v])),w=To({reservations:o,filters:p,customersMap:b,techniciansMap:g,projectsMap:u});if(w.length===0){m.innerHTML=`<p>${i("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${Bo({entries:w,customersMap:b,techniciansMap:g,projectsMap:u})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(v=>{const x=Number(v.dataset.reservationIndex);Number.isNaN(x)||v.addEventListener("click",()=>{typeof n=="function"&&n(x)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(v=>{const x=Number(v.dataset.reservationIndex);Number.isNaN(x)||v.addEventListener("click",f=>{f.stopPropagation(),typeof a=="function"&&a(x,f)})})}function Li(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:o=[],projects:c=[]}=Y(),r=s[e];if(!r)return q(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=o.find(x=>String(x.id)===String(r.customerId)),d=r.projectId?c.find(x=>String(x.id)===String(r.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const x=kt()||[];u.innerHTML=Lo(r,l,x,e,d)}const m=document.getElementById("reservationDetailsModal"),p=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},b=document.getElementById("reservation-details-edit-btn");b&&(b.onclick=()=>{p(),typeof t=="function"&&t(e,{reservation:r,customer:l,getEditContext:a})});const g=document.getElementById("reservation-details-delete-btn");g&&(g.onclick=()=>{p(),typeof n=="function"&&n(e,{reservation:r,customer:l})});const w=u?.querySelector('[data-action="open-project"]');w&&d&&w.addEventListener("click",()=>{p();const x=d?.id!=null?String(d.id):"",f=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=f});const v=document.getElementById("reservation-details-export-btn");return v&&(v.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),v.blur();try{await Ti({reservation:r,customer:l,project:d})}catch(f){console.error("❌ [reservations] export to PDF failed",f),q(i("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function Ct(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:et(e,n),end:et(t,a)}}function je(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=i("reservations.create.equipment.none","لا توجد معدات"),a=i("reservations.create.summary.currency","SR"),s=i("reservations.create.equipment.imageAlt","صورة"),o=i("reservations.equipment.actions.increase","زيادة الكمية"),c=i("reservations.equipment.actions.decrease","تقليل الكمية"),r=i("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Hn(t);return}const l=Be(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},m=De(u)||d.image,p=m?`<img src="${m}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',b=h(String(d.count)),g=Number.isFinite(Number(d.unitPrice))?Number(d.unitPrice):0,w=Number.isFinite(Number(d.totalPrice))?Number(d.totalPrice):g*d.count,v=`${h(g.toFixed(2))} ${a}`,x=`${h(w.toFixed(2))} ${a}`,f=d.barcodes.map(L=>h(String(L||""))).filter(Boolean),T=f.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${f.map(L=>`<li>${L}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${T}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${c}">−</button>
              <span class="reservation-qty-value">${b}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${o}">+</button>
            </div>
          </td>
          <td>${v}</td>
          <td>${x}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${r}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Hn(t)}function Di(e){const{index:t,items:n}=_e(),s=Be(n).find(r=>r.key===e);if(!s)return;const o=s.itemIndices[s.itemIndices.length-1];if(o==null)return;const c=n.filter((r,l)=>l!==o);Pe(t,c),je(c),he()}function ji(e){const{index:t,items:n}=_e(),a=n.filter(s=>At(s)!==e);a.length!==n.length&&(Pe(t,a),je(a),he())}function _i(e){const{index:t,items:n}=_e(),s=Be(n).find(v=>v.key===e);if(!s)return;const{start:o,end:c}=Ct();if(!o||!c){q(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:r=[]}=Y(),l=t!=null&&r[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(v=>Q(v.barcode))),{equipment:m=[]}=Y(),p=(m||[]).find(v=>{const x=Q(v?.barcode);return!x||u.has(x)||At({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!aa(v)?!1:!qe(x,o,c,d)});if(!p){q(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const b=Q(p.barcode),g=Oe(p);if(!g){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const w=[...n,{id:g,equipmentId:g,barcode:b,desc:p.desc||p.description||p.name||s.description||"",qty:1,price:Number.isFinite(Number(p.price))?Number(p.price):s.unitPrice,image:De(p)}];Pe(t,w),je(w),he()}function Hn(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:o}=n.dataset;if(a==="decrease-edit-group"&&s){Di(s);return}if(a==="increase-edit-group"&&s){_i(s);return}if(a==="remove-edit-group"&&s){ji(s);return}if(a==="remove-edit-item"){const c=Number(o);Number.isNaN(c)||Pi(c)}}),e.dataset.groupListenerAttached="true")}function he(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",he),a.dataset.listenerAttached="true"),Me(a);const s=h(t?.value||"0");t&&(t.value=s);const o=parseFloat(s)||0,c=n?.value||"percent",r=!!document.getElementById("edit-res-project")?.value,l=document.getElementById("edit-res-tax"),d=r?!1:l?.checked||!1,u=a?.value||"unpaid";Me(a,u),d&&ie("edit-res-company-share");let m=tt("edit-res-company-share");d&&(!Number.isFinite(m)||m<=0)&&(ie("edit-res-company-share"),m=tt("edit-res-company-share"));const{items:p=[]}=_e(),{start:b,end:g}=Ct();e.innerHTML=Qs({items:p,discount:o,discountType:c,applyTax:d,paidStatus:u,start:b,end:g,companySharePercent:m})}function Pi(e){if(e==null)return;const{index:t,items:n}=_e();if(!Array.isArray(n))return;const a=n.filter((s,o)=>o!==e);Pe(t,a),je(a),he()}function Ni(e){const t=e?.value??"",n=Q(t);if(!n)return;const a=$t(n);if(!a){q(i("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Ie(a);if(s!=="available"){q(He(s));return}const o=Q(n),{index:c,items:r=[]}=_e();if(r.findIndex(v=>Q(v.barcode)===o)>-1){q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=Ct();if(!d||!u){q(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:m=[]}=Y(),p=c!=null&&m[c]||null,b=p?.id??p?.reservationId??null;if(qe(o,d,u,b)){q(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const g=Oe(a);if(!g){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const w=[...r,{id:g,equipmentId:g,barcode:o,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Pe(c,w),e&&(e.value=""),je(w),he()}function Et(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=da(t),a=Q(n?.barcode||t);if(!n||!a){q(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Ie(n);if(s!=="available"){q(He(s));return}const{start:o,end:c}=Ct();if(!o||!c){q(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:r,items:l=[]}=_e();if(l.some(w=>Q(w.barcode)===a)){q(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=Y(),m=r!=null&&u[r]||null,p=m?.id??m?.reservationId??null;if(qe(a,o,c,p)){q(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const b=Oe(n);if(!b){q(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...l,{id:b,equipmentId:b,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Pe(r,g),je(g),he(),e.value=""}function Na(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Et(e))});const t=()=>{ua(e.value,"edit-res-equipment-description-options")&&Et(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{he()});function Fi(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Gt(e);return}Et(e)}}function Wi(){Ve(),Na()}function Ri(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let at=null,ge=[],an=null,ne={},zt=!1;function sn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),o=!!e;if(n&&(n.value=o?"true":"false"),a){const c=a.dataset.confirmLabel||"✅ تم التأكيد",r=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=o?c:r,a.dataset.state=o?"confirmed":"pending",a.classList.toggle("btn-success",o&&!t),a.classList.toggle("btn-outline-secondary",!o||t),a.disabled=t,a.setAttribute("aria-pressed",o?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function on(){return document.getElementById("edit-res-confirmed")?.value==="true"}function _e(){return{index:at,items:ge}}function Pe(e,t){at=typeof e=="number"?e:null,ge=Array.isArray(t)?[...t]:[]}function Fa(){at=null,ge=[],Zs()}function Mi(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Xe(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function zi(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),o=t?.projectId?String(t.projectId):"",c=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],r=[`<option value="">${Xe(a)}</option>`];c.forEach(l=>{r.push(`<option value="${Xe(l.id)}">${Xe(l.title||a)}</option>`)}),o&&!c.some(l=>String(l.id)===o)&&r.push(`<option value="${Xe(o)}">${Xe(s)}</option>`),n.innerHTML=r.join(""),o?n.value=o:n.value=""}function Ra(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&n.checked&&(n.checked=!1),n&&(n.disabled=!0,n.classList.add("disabled"));else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1),n&&(n.disabled=!1,n.classList.remove("disabled"))}rn("tax")}function rn(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const o=ne?.updateEditReservationSummary;typeof o=="function"&&o()};if(zt){a();return}zt=!0;const s=()=>{zt=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(be)),t.disabled){n.checked=!1,q(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),ie("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ie("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function Vn(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:o,ensureModal:c}={}){const{customers:r,projects:l}=Y(),u=ta()?.[e];if(!u){q(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ne={...ne,reservation:u,projects:l||[]},t?.(),zi(l||[],u);const m=u.projectId&&l?.find?.($=>String($.id)===String(u.projectId))||null,{effectiveConfirmed:p,projectLinked:b}=Le(u,m),g=u.items?u.items.map($=>({...$,equipmentId:$.equipmentId??$.equipment_id??$.id,barcode:Q($?.barcode)})):[];Pe(e,g);const w=i("reservations.list.unknownCustomer","غير معروف"),v=r?.find?.($=>String($.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const f=document.getElementById("edit-res-customer");f&&(f.value=v?.customerName||w);const T=typeof a=="function"?a(u.start):{date:"",time:""},L=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",T.date),n?.("edit-res-start-time",T.time),n?.("edit-res-end",L.date),n?.("edit-res-end-time",L.time);const D=document.getElementById("edit-res-notes");D&&(D.value=u.notes||"");const y=document.getElementById("edit-res-discount");y&&(y.value=h(u.discount??0));const E=document.getElementById("edit-res-discount-type");E&&(E.value=u.discountType||"percent");const N=u.projectId?!1:!!u.applyTax,P=document.getElementById("edit-res-tax");P&&(P.checked=N);const O=document.getElementById("edit-res-company-share");if(O){const $=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,B=$!=null?Number.parseFloat(h(String($).replace("%","").trim())):NaN,_=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,F=_!=null?_===!0||_===1||_==="1"||String(_).toLowerCase()==="true":Number.isFinite(B)&&B>0,V=F&&Number.isFinite(B)&&B>0?B:be,M=N||F;O.checked=M,O.dataset.companyShare=String(V)}sn(p,{disable:b});const A=document.getElementById("edit-res-paid");A&&(A.value=u.paid===!0||u.paid==="paid"?"paid":"unpaid"),Gs((u.technicians||[]).map($=>String($))),s?.(g),Ra(),o?.();const S=document.getElementById("editReservationModal");an=Mi(S,c),an?.show?.()}async function Oi({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:o,handleReservationsMutation:c}={}){if(at===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const r=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",p=h(document.getElementById("edit-res-discount")?.value||"0"),b=parseFloat(p)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent",w=on(),v=document.getElementById("edit-res-paid")?.value||"unpaid",x=document.getElementById("edit-res-project")?.value||"",f=Ws(),T=document.getElementById("edit-res-company-share"),L=document.getElementById("edit-res-tax");if(!r||!d){q(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const D=typeof e=="function"?e:(U,X)=>`${U}T${X||"00:00"}`,y=D(r,l),E=D(d,u);if(y&&E&&new Date(y)>new Date(E)){q(i("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const P=ta()?.[at];if(!P){q(i("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ge)||ge.length===0&&f.length===0){q(i("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const U of ge){const X=Ie(U.barcode);if(X!=="available"){q(He(X));return}}const O=typeof t=="function"?t:()=>!1;for(const U of ge){const X=Q(U.barcode);if(O(X,y,E,P.id??P.reservationId)){q(i("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const A=typeof n=="function"?n:()=>!1;for(const U of f)if(A(U,y,E,P.id??P.reservationId)){q(i("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const S=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:Y().projects||[],$=x&&S.find(U=>String(U.id)===String(x))||null,B={...P,projectId:x?String(x):null,confirmed:w},{effectiveConfirmed:_,projectLinked:F,projectStatus:V}=Le(B,$);let M=!!T?.checked,j=!!L?.checked;if(F&&(M&&(T.checked=!1,M=!1),j=!1),!F&&M!==j){q(i("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}j&&(ie("edit-res-company-share"),M=!!T?.checked);let z=M?getCompanySharePercent("edit-res-company-share"):null;M&&(!Number.isFinite(z)||z<=0)&&(ie("edit-res-company-share"),z=getCompanySharePercent("edit-res-company-share"));const ee=M&&j&&Number.isFinite(z)&&z>0,se=F?!1:j,re=Gn(ge,b,g,se,f,{start:y,end:E,companySharePercent:ee?z:0});let W=P.status??"pending";F?W=$?.status??V??W:["completed","cancelled"].includes(String(W).toLowerCase())||(W=w?"confirmed":"pending");const le=Wn({reservationCode:P.reservationCode??P.reservationId??null,customerId:P.customerId,start:y,end:E,status:W,title:P.title??null,location:P.location??null,notes:m,projectId:x?String(x):null,totalAmount:re,discount:b,discountType:g,applyTax:se,paidStatus:v,confirmed:_,items:ge.map(U=>({...U,equipmentId:U.equipmentId??U.id})),technicians:f,companySharePercent:ee?z:null,companyShareEnabled:ee});try{const U=await Xs(P.id||P.reservationId,le);await Ys(),q(i("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),Fa(),c?.({type:"updated",reservation:U}),s?.(),o?.(),an?.hide?.()}catch(U){console.error("❌ [reservationsEdit] Failed to update reservation",U);const X=Xn(U)?U.message:i("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");q(X,"error")}}function Xi(e={}){ne={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ne,o=document.getElementById("edit-res-discount");o&&!o.dataset.listenerAttached&&(o.addEventListener("input",()=>{o.value=h(o.value),t?.()}),o.dataset.listenerAttached="true");const c=document.getElementById("edit-res-discount-type");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>t?.()),c.dataset.listenerAttached="true");const r=document.getElementById("edit-res-tax");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{rn("tax")}),r.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{rn("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-project");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{Ra();const g=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:Y().projects||[],w=d.value&&g.find(L=>String(L.id)===String(d.value))||null,x={...ne?.reservation??{},projectId:d.value||null,confirmed:on()},{effectiveConfirmed:f,projectLinked:T}=Le(x,w);sn(f,{disable:T}),t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-confirmed-btn");u&&!u.dataset.listenerAttached&&(u.addEventListener("click",()=>{if(u.disabled)return;const g=!on();sn(g),t?.()}),u.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Oi(ne).catch(g=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",g)})}),m.dataset.listenerAttached="true");const p=document.getElementById("edit-res-equipment-barcode");if(p&&!p.dataset.listenerAttached){let g=null;const w=()=>{p.value?.trim()&&(clearTimeout(g),g=null,n?.(p))};p.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),w())});const v=()=>{if(clearTimeout(g),!p.value?.trim())return;const{start:x,end:f}=getEditReservationDateRange();!x||!f||(g=setTimeout(()=>{w()},150))};p.addEventListener("input",v),p.addEventListener("change",w),p.dataset.listenerAttached="true"}Na?.();const b=document.getElementById("editReservationModal");b&&!b.dataset.cleanupAttached&&(b.addEventListener("hidden.bs.modal",()=>{Fa(),t?.(),s?.([])}),b.dataset.cleanupAttached="true")}function Yi(){return no().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=Y()||{};Js(e||[]),ma()})}function In(e=null){ma(),Ma(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Hi(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function cn(){return{populateEquipmentDescriptionLists:Ve,setFlatpickrValue:Ri,splitDateTime:Kn,renderEditItems:je,updateEditReservationSummary:he,addEquipmentByDescription:Fi,addEquipmentToEditingReservation:Ni,addEquipmentToEditingByDescription:Et,combineDateTime:et,hasEquipmentConflict:qe,hasTechnicianConflict:Qn,renderReservations:Ma,handleReservationsMutation:In,ensureModal:Hi}}function Ma(e="reservations-list",t=null){Bi({containerId:e,filters:t,onShowDetails:za,onConfirmReservation:Ha})}function za(e){return Li(e,{getEditContext:cn,onEdit:(t,{reservation:n})=>{Va(t,n)},onDelete:Oa})}function Oa(e){return Un()?window.confirm(i("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?eo(e,{onAfterChange:In}):!1:(Rs(),!1)}function Ha(e){return to(e,{onAfterChange:In})}function Va(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",o)}Vn(e,cn());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",o)}Vn(e,cn());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const o=t.id??t.reservationId;n.set("reservationEditId",String(o));try{localStorage.setItem("pendingReservationEditId",String(o)),localStorage.removeItem("pendingReservationEditIndex")}catch(c){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",c)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(o){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",o)}}Ms({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(o=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",o)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Zi(){typeof window>"u"||(window.showReservationDetails=za,window.deleteReservation=Oa,window.confirmReservation=Ha,window.editReservation=Va)}export{pa as a,Lo as b,Zi as c,Gi as d,Xi as e,Wi as f,ma as g,cn as h,Qi as i,G as j,In as k,Yi as l,Ma as r,za as s,he as u};
