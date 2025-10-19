import{d as ne,n as v,t as o,h as $,z as Ar,k as De,j as ua,B as ma,o as $r,u as kr}from"./auth.js";import{n as J,D as Pe,l as En,o as Wn,p as ht,q as pa,t as Tr,v as je,w as Fe,x as In,y as Cr,z as Pr,A as fa,h as ga,B as ya,C as ha,E as va,F as _r,s as jt,i as ba,G as wa,H as Lr,I as xa,J as Sa,f as Ea,K as en,g as Ia,L as Br,M as Dr,u as Nr,a as jr,N as Fr,k as Rr}from"./reservationsService.js";import{n as de,s as qn,p as Ke,q as rt,t as Ft,i as An,r as Ge,b as Mr,v as Hr,w as zr,g as Or}from"./projectsService.js";const Vr=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Ur=new Set(["maintenance","reserved","retired"]);function Qr(e){const t=String(e??"").trim().toLowerCase();return t&&Vr.get(t)||"available"}function Kr(e){return e?typeof e=="object"?e:Rt(e):null}function Re(e){const t=Kr(e);return t?Qr(t.status||t.state||t.statusLabel||t.status_label):"available"}function qa(e){return!Ur.has(Re(e))}function We(e={}){return e.image||e.imageUrl||e.img||""}function Gr(e){if(!e)return null;const t=J(e),{equipment:n=[]}=ne();return(n||[]).find(a=>J(a?.barcode)===t)||null}function Rt(e){const t=J(e);if(!t)return null;const{equipment:n=[]}=ne();return(n||[]).find(a=>J(a?.barcode)===t)||null}let tn=null,Aa=[],nn=new Map,an=new Map,kt=new Map,Yt=!1;function Tt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ct(e){return v(String(e||"")).trim().toLowerCase()}function Wr(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=v(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function $a(e){const t=v(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function ka(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Ta(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Ca(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=v(String(t))}}function ot(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function $n(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function kn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Pa(e,t,{allowPartial:n=!1}={}){const a=de(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,l)=>{l.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function sn(e,t={}){return Pa(nn,e,t)}function rn(e,t={}){return Pa(an,e,t)}function Te(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function _a(e){Aa=Array.isArray(e)?[...e]:[]}function Tn(){return Aa}function Cn(e){return e&&Tn().find(t=>String(t.id)===String(e))||null}function Xn(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function at(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??Pe,a=v(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:Pe}function ve(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??Pe,a=v(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=Pe),t.dataset.companyShare=String(s),t.checked=!0}function on(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Yt){Y();return}Yt=!0;const a=()=>{Yt=!1,Y()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Pe)),t.disabled){n.checked=!1,$(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),ve()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ve():n.checked&&(n.checked=!1));a()}function Xr(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Yn(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Jn(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Ne({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=$n();if(!n||!a||!s)return;const r=En()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),l=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;nn=new Map;const c=r.filter(f=>f&&f.id!=null).map(f=>({id:String(f.id),label:Jn(f)||l})).filter(f=>{if(!f.label)return!1;const g=de(f.label);return!g||d.has(g)?!1:(d.add(g),nn.set(g,f),!0)}).sort((f,g)=>f.label.localeCompare(g.label,void 0,{sensitivity:"base"}));s.innerHTML=c.map(f=>`<option value="${Tt(f.label)}"></option>`).join("");const u=t?"":n.value,m=e?String(e):a.value?String(a.value):"",p=m?r.find(f=>String(f.id)===m):null;if(p){const f=Jn(p)||l;a.value=String(p.id),n.value=f,n.dataset.selectedId=String(p.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function wt({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=kn();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Tn()||[],l=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",l);const d=[...i].filter(b=>b&&b.id!=null).sort((b,h)=>String(h.createdAt||h.start||"").localeCompare(String(b.createdAt||b.start||""))),c=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;an=new Map;const p=d.map(b=>{const h=Xn(b)||u;return{id:String(b.id),label:h}}).filter(b=>{if(!b.label)return!1;const h=de(b.label);return!h||m.has(h)?!1:(m.add(h),an.set(h,b),!0)});r.innerHTML=p.map(b=>`<option value="${Tt(b.label)}"></option>`).join("");const f=e?String(e):s.value?String(s.value):"",g=f?d.find(b=>String(b.id)===f):null;if(g){const b=Xn(g)||u;s.value=String(g.id),a.value=b,a.dataset.selectedId=String(g.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":c}function Pt(e,t,n){const{date:a,time:s}=pa(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const l=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,l)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const l=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,l)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function La(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||wt({selectedValue:a});const r=(En()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";Ne(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const l=Yn(e,"start"),d=Yn(e,"end");l&&Pt("res-start","res-start-time",l),d&&Pt("res-end","res-end-time",d);const c=document.getElementById("res-notes");c&&e.description&&(t||!c.value)&&(c.value=e.description),st(),Y()}function Ba({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ne(),s=Array.isArray(a)?a:[];_a(s);const r=t!=null?String(t):n.value?String(n.value):"";wt({selectedValue:r,projectsList:s}),st(),Y()}function st(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled"));else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1),n&&(n.disabled=!1,n.classList.remove("disabled"))}on("tax")}function Pn(){const{input:e,hidden:t}=kn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?rn(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Cn(r.id);i?La(i,{skipProjectSelectUpdate:!0}):(st(),Y())}else t.value="",e.dataset.selectedId="",st(),Y()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?rn(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function _n(){const{input:e,hidden:t}=$n();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?sn(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),Y()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?sn(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Yr(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),!n||!n.projectId)return;document.getElementById("res-project")&&(wt({selectedValue:String(n.projectId)}),st());const i=Cn(n.projectId);if(i?La(i,{forceNotes:!!n.forceNotes}):Y(),n.start&&Pt("res-start","res-start-time",n.start),n.end&&Pt("res-end","res-end-time",n.end),n.customerId){const d=(En()||[]).find(c=>String(c.id)===String(n.customerId));d?.id!=null&&Ne({selectedValue:String(d.id)})}else Ne({selectedValue:""})}function xt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:ht(e,n),end:ht(t,a)}}function Da(e){const t=Ct(e);if(t){const l=kt.get(t);if(l)return l}const{description:n,barcode:a}=$a(e);if(a){const l=Rt(a);if(l)return l}const s=de(n||e);if(!s)return null;let r=wa();if(!r?.length){const l=ne();r=Array.isArray(l?.equipment)?l.equipment:[],r.length&&Sa(r)}const i=r.find(l=>de(l?.desc||l?.description||"")===s);return i||r.find(l=>de(l?.desc||l?.description||"").includes(s))||null}function Na(e,t="equipment-description-options"){const n=Ct(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>Ct(d.value)===n)||kt.has(n))return!0;const{description:s}=$a(e);if(!s)return!1;const r=de(s);return r?(wa()||[]).some(l=>de(l?.desc||l?.description||"")===r):!1}const Jr={available:0,reserved:1,maintenance:2,retired:3};function Zr(e){return Jr[e]??5}function Zn(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function eo(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Zn(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Zn(n)})`}function it(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=qn(),a=ne(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Sa(r);const i=new Map;r.forEach(c=>{const u=Wr(c),m=Ct(u);if(!m||!u)return;const p=Re(c),f=Zr(p),g=i.get(m);if(!g){i.set(m,{normalized:m,value:u,bestItem:c,bestStatus:p,bestPriority:f,statuses:new Set([p])});return}g.statuses.add(p),f<g.bestPriority&&(g.bestItem=c,g.bestStatus=p,g.bestPriority=f,g.value=u)}),kt=new Map;const d=Array.from(i.values()).sort((c,u)=>c.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(c=>{kt.set(c.normalized,c.bestItem);const u=eo(c),m=Tt(c.value);if(u===c.value)return`<option value="${m}"></option>`;const p=Tt(u);return`<option value="${m}" label="${p}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function to(e,t){const n=J(e);if(!n)return!1;const{start:a,end:s}=xt();if(!a||!s)return $(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(je().some(c=>J(c.barcode)===n))return $(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(Fe(n,a,s))return $(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const i=Rt(n);if(!i)return $(o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1;const l=Re(i);if(l==="maintenance"||l==="retired")return $(ot(l)),!1;const d=rt(i);return d?(In({id:d,equipmentId:d,barcode:n,desc:i.desc,qty:1,price:i.price,image:We(i)}),t&&(t.value=""),Me(),Y(),$(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):($(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")),!1)}function ln(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Da(t);if(!n){$(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Gr(n.barcode),s=Re(a||n);if(s==="maintenance"||s==="retired"){$(ot(s));return}const r=J(n.barcode);if(!r){$(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=rt(n);if(!i){$(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const l={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:We(n)},{start:d,end:c}=xt();if(!d||!c){$(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(je().some(p=>J(p.barcode)===r)){$(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(Fe(r,d,c)){$(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}In(l),Me(),Y(),$(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function no(){it();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ln(e))});const t=()=>{Na(e.value,"equipment-description-options")&&ln(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Me(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=je(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),l=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const c=Ke(n);t.innerHTML=c.map(u=>{const m=u.items[0]||{},p=We(m)||u.image,f=p?`<img src="${p}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',g=v(String(u.count)),b=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,h=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):b*u.count,S=`${v(b.toFixed(2))} ${s}`,y=`${v(h.toFixed(2))} ${s}`,I=u.barcodes.map(z=>v(String(z||""))).filter(Boolean),C=I.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${I.map(z=>`<li>${z}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${C}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${l}">−</button>
              <span class="reservation-qty-value">${g}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}">+</button>
            </div>
          </td>
          <td>${S}</td>
          <td>${y}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function ao(e){const t=je(),a=Ke(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Cr(s),Me(),Y())}function so(e){const t=je(),n=t.filter(a=>Ft(a)!==e);n.length!==t.length&&(xa(n),Me(),Y())}function ro(e){const t=je(),a=Ke(t).find(m=>m.key===e);if(!a)return;const{start:s,end:r}=xt();if(!s||!r){$(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(m=>J(m.barcode))),{equipment:l=[]}=ne(),d=(l||[]).find(m=>{const p=J(m?.barcode);return!p||i.has(p)||Ft({desc:m?.desc||m?.description||m?.name||"",price:Number(m?.price)||0})!==e||!qa(m)?!1:!Fe(p,s,r)});if(!d){$(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const c=J(d.barcode),u=rt(d);if(!u){$(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}In({id:u,equipmentId:u,barcode:c,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:We(d)}),Me(),Y()}function Y(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(v(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),r=a?!1:s?.checked||!1,i=document.getElementById("res-payment-status"),l=i?.value||"unpaid",{start:d,end:c}=xt();r&&ve();const u=at(),m=document.getElementById("res-payment-progress-type"),p=document.getElementById("res-payment-progress-value"),f=ka(m),g=Ta(p);Wn({selectedItems:je(),discount:t,discountType:n,applyTax:r,paidStatus:l,paymentProgressType:f,paymentProgressValue:g,start:d,end:c,companySharePercent:u,paymentHistory:[]});const b=Wn.lastResult;b?(Ca(p,b.paymentProgressValue),i&&(i.value=b.paymentStatus,Te(i,b.paymentStatus))):Te(i,l)}function oo(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",l=>{l.target.value=v(l.target.value),Y()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",Y),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{on("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{on("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{Te(s),Y()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",l=>{r.dataset.userSelected="true",Y()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",l=>{l.target.value=v(l.target.value),Y()}),i.dataset.listenerAttached="true"),Y()}function io(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){Y();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),Y()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function ea(){const{input:e,hidden:t}=$n(),{input:n,hidden:a}=kn(),{customers:s}=ne();let r=t?.value?String(t.value):"";if(!r&&e?.value){const M=sn(e.value,{allowPartial:!0});M&&(r=String(M.id),t&&(t.value=r),e.value=M.label,e.dataset.selectedId=r)}const i=s.find(M=>String(M.id)===r);if(!i){$(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const l=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const M=rn(n.value,{allowPartial:!0});M&&(d=String(M.id),a&&(a.value=d),n.value=M.label,n.dataset.selectedId=d)}const c=document.getElementById("res-start").value,u=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",p=document.getElementById("res-end-time")?.value||"00:00";if(!c||!u){$(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const f=`${c}T${m}`,g=`${u}T${p}`,b=new Date(f),h=new Date(g);if(Number.isNaN(b.getTime())||Number.isNaN(h.getTime())||b>=h){$(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const S=Pr(),y=je();if(y.length===0&&S.length===0){$(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const I=document.getElementById("res-notes")?.value||"",C=parseFloat(v(document.getElementById("res-discount")?.value))||0,z=document.getElementById("res-discount-type")?.value||"percent",w=document.getElementById("res-payment-status"),E=w?.value||"unpaid",_=document.getElementById("res-payment-progress-type"),D=document.getElementById("res-payment-progress-value"),F=ka(_),x=Ta(D),L=d?Cn(d):null,R=Xr(L);if(d&&!L){$(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const M of y){const te=Re(M.barcode);if(te==="maintenance"||te==="retired"){$(ot(te));return}}for(const M of y){const te=J(M.barcode);if(Fe(te,f,g)){$(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const M of S)if(fa(M,f,g)){$(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const V=document.getElementById("res-tax"),j=document.getElementById("res-company-share"),O=!!d,H=O?!1:V?.checked||!1,B=!!j?.checked;if(!O&&B!==H){$(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let q=B?at():null;B&&(!Number.isFinite(q)||q<=0)&&(ve(),q=at());const N=B&&H&&Number.isFinite(q)&&q>0;H&&ve();const Q=ga(y,C,z,H,S,{start:f,end:g,companySharePercent:N?q:0}),Z=Ar(),U=ya({totalAmount:Q,progressType:F,progressValue:x,history:[]});D&&Ca(D,U.paymentProgressValue);const oe=[];U.paymentProgressValue!=null&&U.paymentProgressValue>0&&oe.push({type:U.paymentProgressType||F,value:U.paymentProgressValue,amount:U.paidAmount,percentage:U.paidPercent,recordedAt:new Date().toISOString()});const X=ha({manualStatus:E,paidAmount:U.paidAmount,paidPercent:U.paidPercent,totalAmount:Q});w&&(w.value=X,Te(w,X));const re=va({reservationCode:Z,customerId:l,start:f,end:g,status:R?"confirmed":"pending",title:null,location:null,notes:I,projectId:d||null,totalAmount:Q,discount:C,discountType:z,applyTax:H,paidStatus:X,confirmed:R,items:y.map(M=>({...M,equipmentId:M.equipmentId??M.id})),technicians:S,companySharePercent:N?q:null,companyShareEnabled:N,paidAmount:U.paidAmount,paidPercentage:U.paidPercent,paymentProgressType:U.paymentProgressType,paymentProgressValue:U.paymentProgressValue,paymentHistory:oe});try{const M=await _r(re);qn(),it(),jt(),lo(),$(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof tn=="function"&&tn({type:"created",reservation:M})}catch(M){console.error("❌ [reservations/createForm] Failed to create reservation",M);const te=ba(M)?M.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");$(te,"error")}}function lo(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Ne({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),r=document.getElementById("res-project-input");s&&(s.value=""),r&&(r.value="",r.dataset.selectedId=""),wt({selectedValue:"",resetInput:!0});const i=document.getElementById("equipment-description");i&&(i.value="");const l=document.getElementById("res-payment-status");l&&(l.value="unpaid",Te(l,"unpaid"));const d=document.getElementById("res-payment-progress-type");d&&(d.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Lr(),xa([]),Me(),st(),Y()}function co(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){ao(s);return}if(a==="increase-group"&&s){ro(s);return}if(a==="remove-group"&&s){so(s);return}}),e.dataset.listenerAttached="true")}function uo(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{const s=e.value;s?.trim()&&(clearTimeout(t),t=null,to(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim())return;const{start:r,end:i}=xt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function mo(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await ea()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await ea()}),t.dataset.listenerAttached="true")}function Gi({onAfterSubmit:e}={}){tn=typeof e=="function"?e:null;const{customers:t,projects:n}=ne();Tr(t||[]),Ne(),_n(),_a(n||[]),Ba({projectsList:n}),Pn(),it(),no(),io(),oo(),co(),uo(),mo(),Yr(),Y(),Me()}function ja(){it(),Ba(),Ne(),_n(),Pn(),Me(),Y()}if(typeof document<"u"){const e=()=>{Ne(),wt({projectsList:Tn()}),_n(),Pn(),Y()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}typeof window<"u"&&(window.getCompanySharePercent=at);function Fa(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Ue(t),endDate:Ue(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Ue(n),endDate:Ue(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Ue(n),endDate:Ue(a)}}return e==="upcoming"?{startDate:Ue(t),endDate:""}:{startDate:"",endDate:""}}function po(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=v(t?.value||"").trim(),i=v(n?.value||"").trim(),l=a?.value||"";if(new Set(["","today","week","month"]).has(l)||(l="",a&&(a.value=""),_t(t),_t(n),r="",i=""),!r&&!i&&l){const c=Fa(l);r=c.startDate,i=c.endDate}return{searchTerm:de(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:l}}function Wi(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=v(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{fo(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const l=document.getElementById("clear-filters");l&&!l.dataset.listenerAttached&&(l.addEventListener("click",()=>{n&&(n.value=""),_t(a),_t(s),r&&(r.value=""),i&&(i.value=""),t()}),l.dataset.listenerAttached="true")}function fo(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Fa(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Ue(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function _t(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Et(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function go(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function yo(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=go(n);if(a!==null)return a}return null}function ta(e,t=0){const n=yo(e);if(n!=null)return n;const a=Et(e.createdAt??e.created_at);if(a!=null)return a;const s=Et(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Et(e.start);if(r!=null)return r;const i=Et(e.end);if(i!=null)return i;const l=Number(e.id??e.reservationId);return Number.isFinite(l)?l:Number.isFinite(t)?t:0}function ho({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((y,I)=>({reservation:y,index:I})),i=t.searchTerm||"",l=t.searchReservationId||"",d=t.searchCustomerName||"",c=t.searchProjectId||"",u=t.startDate||"",m=t.endDate||"",p=t.status||"",f=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,g=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,b=u?new Date(`${u}T00:00:00`):null,h=m?new Date(`${m}T23:59:59`):null,S=r.filter(({reservation:y})=>{const I=n.get(String(y.customerId)),C=s?.get?.(String(y.projectId)),z=y.start?new Date(y.start):null,w=An(y),{effectiveConfirmed:E}=Ge(y,C);if(f!=null&&String(y.customerId)!==String(f)||g!=null&&!(Array.isArray(y.technicians)?y.technicians.map(L=>String(L)):[]).includes(String(g))||p==="confirmed"&&!E||p==="pending"&&E||p==="completed"&&!w||b&&z&&z<b||h&&z&&z>h)return!1;if(l){const x=[y.reservationId,y.id,y.reservation_id,y.reservationCode,y.reservation_code,y.code,y.reference,y.referenceNumber,y.reference_number],L=de(x.filter(V=>V!=null&&V!=="").map(String).join(" ")).replace(/\s+/g,""),R=l.replace(/\s+/g,"");if(!L.includes(R))return!1}if(d&&!de(I?.customerName||"").includes(d))return!1;if(c){const x=[y.projectId,y.project_id,y.projectID,C?.id,C?.projectCode,C?.project_code],L=de(x.filter(V=>V!=null&&V!=="").map(String).join(" ")).replace(/\s+/g,""),R=c.replace(/\s+/g,"");if(!L.includes(R))return!1}if(!i)return!0;const _=y.items?.map?.(x=>`${x.barcode} ${x.desc}`).join(" ")||"",D=(y.technicians||[]).map(x=>a.get(String(x))?.name).filter(Boolean).join(" ");return de([y.reservationId,I?.customerName,y.notes,_,D,C?.title].filter(Boolean).join(" ")).includes(i)});return S.sort((y,I)=>{const C=ta(y.reservation,y.index),z=ta(I.reservation,I.index);return C!==z?z-C:I.index-y.index}),S}function vo({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),l=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),c=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),m=o("reservations.list.status.pending","⏳ غير مؤكد"),p=o("reservations.list.payment.paid","💳 مدفوع"),f=o("reservations.list.payment.unpaid","💳 غير مدفوع"),g=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),b=o("reservations.list.actions.confirm","✔️ تأكيد"),h=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),S=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),y={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:I,index:C})=>{const z=t.get(String(I.customerId)),w=I.projectId?a?.get?.(String(I.projectId)):null,E=An(I),_=I.paidStatus??I.paid_status??(I.paid===!0||I.paid==="paid"?"paid":"unpaid"),D=_==="paid",F=_==="partial",{effectiveConfirmed:x,projectLinked:L}=Ge(I,w),R=x?"status-confirmed":"status-pending",V=D?"status-paid":F?"status-partial":"status-unpaid";let j=`<span class="reservation-chip status-chip ${R}">${x?u:m}</span>`;const O=D?p:F?g:f;let H=`<span class="reservation-chip status-chip ${V}">${O}</span>`,B=D?" tile-paid":F?" tile-partial":" tile-unpaid";E&&(B+=" tile-completed");let q="";E&&(j=`<span class="reservation-chip status-chip status-completed">${u}</span>`,H=`<span class="reservation-chip status-chip status-completed">${O}</span>`,q=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const N=!L&&!x?`<button class="tile-confirm" data-reservation-index="${C}" data-action="confirm">${b}</button>`:"",Q=N?`<div class="tile-actions">${N}</div>`:"",Z=I.items?.length||0,U=(I.technicians||[]).map(me=>n.get(String(me))).filter(Boolean),oe=U.map(me=>me.name).join(c)||"—",X=v(String(I.reservationId??"")),re=I.start?v(De(I.start)):"-",M=I.end?v(De(I.end)):"-",te=v(String(I.cost??0)),qe=v(String(Z)),we=I.notes?v(I.notes):l,xe=d.replace("{count}",qe),ue=I.applyTax?`<small>${r}</small>`:"";let Se=h;return I.projectId&&(Se=w?.title?v(w.title):S),`
      <div class="${N?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${B}"${q} data-reservation-index="${C}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${X}</div>
          <div class="tile-badges">
            ${j}
            ${H}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${y.client}</span>
            <span class="tile-value">${z?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${y.project}</span>
            <span class="tile-value">${Se}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${y.start}</span>
            <span class="tile-value tile-inline">${re}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${y.end}</span>
            <span class="tile-value tile-inline">${M}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${y.cost}</span>
            <span class="tile-value">${te} ${s} ${ue}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${y.equipment}</span>
            <span class="tile-value">${xe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${y.crew}</span>
            <span class="tile-value">${U.length?oe:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${we}</span>
          </div>
        </div>
        ${Q}
      </div>
    `}).join("")}function ge(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function bo(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=Ge(e,s),l=e.paid===!0||e.paid==="paid",d=An(e),c=e.items||[],u=Ke(c),{technicians:m=[]}=ne(),p=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(m)?m:[]),f=new Map;p.forEach(k=>{if(!k||k.id==null)return;const G=String(k.id),ae=f.get(G)||{};f.set(G,{...ae,...k})});const g=(e.technicians||[]).map(k=>f.get(String(k))).filter(Boolean),b=ua(),h=Ea(e.start,e.end),S=(k={})=>{const G=[k.dailyWage,k.daily_rate,k.dailyRate,k.wage,k.rate];for(const ae of G){if(ae==null)continue;const fe=parseFloat(v(String(ae)));if(Number.isFinite(fe))return fe}return 0},y=(k={})=>{const G=[k.dailyTotal,k.daily_total,k.totalRate,k.total,k.total_wage];for(const ae of G){if(ae==null)continue;const fe=parseFloat(v(String(ae)));if(Number.isFinite(fe))return fe}return S(k)},C=c.reduce((k,G)=>k+(G.qty||1)*(G.price||0),0)*h,z=g.reduce((k,G)=>k+S(G),0),w=g.reduce((k,G)=>k+y(G),0),E=z*h,_=w*h,D=C+_,F=parseFloat(e.discount)||0,x=e.discountType==="amount"?F:D*(F/100),L=Math.max(0,D-x),R=r?!1:e.applyTax,V=Number(e.cost),j=Number.isFinite(V),O=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,H=O!=null?parseFloat(v(String(O))):NaN;let N=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(H)&&H>0)&&Number.isFinite(H)?H:0;R&&N<=0&&(N=Pe);let Q=N>0?Math.max(0,L*(N/100)):0;const Z=L+Q,U=R?Z*.15:0,oe=Number.isFinite(U)&&U>0?Number(U.toFixed(2)):0,X=Z+oe,re=Number.isFinite(X)?Number(X.toFixed(2)):0,M=r?re:j?V:re;N>0&&(Q=Number(Math.max(0,L*(N/100)).toFixed(2)));const te=v(String(e.reservationId??e.id??"")),qe=e.start?v(De(e.start)):"-",we=e.end?v(De(e.end)):"-",xe=v(String(g.length)),ue=v(C.toFixed(2)),Se=v(x.toFixed(2)),le=v(L.toFixed(2)),me=v(oe.toFixed(2)),W=v((Number.isFinite(M)?M:0).toFixed(2)),se=v(String(h)),ee=o("reservations.create.summary.currency","SR"),He=o("reservations.details.labels.discount","الخصم"),_e=o("reservations.details.labels.tax","الضريبة (15%)"),Vt=o("reservations.details.labels.crewTotal","إجمالي الفريق"),Ut=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ze=o("reservations.details.labels.duration","عدد الأيام"),lt=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),ct=o("reservations.details.labels.netProfit","💵 صافي الربح"),Qt=o("reservations.create.equipment.imageAlt","صورة"),pe={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Kt=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),K=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),ie=o("reservations.details.technicians.roleUnknown","غير محدد"),Oe=o("reservations.details.technicians.phoneUnknown","غير متوفر"),qs=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),As=o("reservations.list.status.confirmed","✅ مؤكد"),$s=o("reservations.list.status.pending","⏳ غير مؤكد"),ks=o("reservations.list.payment.paid","💳 مدفوع"),Ts=o("reservations.list.payment.unpaid","💳 غير مدفوع"),Cs=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),Ps=o("reservations.list.status.completed","📁 منتهي"),_s=o("reservations.details.labels.id","🆔 رقم الحجز"),Ls=o("reservations.details.section.bookingInfo","بيانات الحجز"),Bs=o("reservations.details.section.paymentSummary","ملخص الدفع"),Ds=o("reservations.details.labels.finalTotal","المجموع النهائي"),Ns=o("reservations.details.section.crew","😎 الفريق الفني"),js=o("reservations.details.crew.count","{count} عضو"),Fs=o("reservations.details.section.items","📦 المعدات المرتبطة"),Rs=o("reservations.details.items.count","{count} عنصر"),Ms=o("reservations.details.actions.edit","✏️ تعديل"),Hs=o("reservations.details.actions.delete","🗑️ حذف"),zs=o("reservations.details.labels.customer","العميل"),Os=o("reservations.details.labels.contact","رقم التواصل"),Vs=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Us=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Qs=o("reservations.details.actions.openProject","📁 فتح المشروع"),Ks=o("reservations.details.labels.start","بداية الحجز"),Gs=o("reservations.details.labels.end","نهاية الحجز"),Ws=o("reservations.details.labels.notes","ملاحظات"),Xs=o("reservations.list.noNotes","لا توجد ملاحظات"),Ys=o("reservations.details.labels.itemsCount","عدد المعدات"),Js=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Zs=o("reservations.paymentHistory.title","سجل الدفعات"),er=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),tr=o("reservations.list.unknownCustomer","غير معروف"),Gt=e.paidStatus??e.paid_status??(l?"paid":"unpaid"),zn=Gt==="partial",nr=Gt==="paid"?ks:zn?Cs:Ts,ar=u.reduce((k,G)=>k+(Number(G.quantity)||0),0),sr=v(String(ar)),On=Rs.replace("{count}",sr),rr=js.replace("{count}",xe),or=e.notes?v(e.notes):Xs,ir=v(_.toFixed(2)),lr=v(String(N)),cr=v(Q.toFixed(2)),dr=`${lr}% (${cr} ${ee})`,ur=Math.max(0,C+_-x),Vn=Math.max(0,ur-E),mr=v(Vn.toFixed(2)),Le=[{icon:"💼",label:Js,value:`${ue} ${ee}`}];Le.push({icon:"😎",label:Vt,value:`${ir} ${ee}`}),x>0&&Le.push({icon:"💸",label:He,value:`${Se} ${ee}`}),Le.push({icon:"📊",label:Ut,value:`${le} ${ee}`}),R&&oe>0&&Le.push({icon:"🧾",label:_e,value:`${me} ${ee}`}),N>0&&Le.push({icon:"🏦",label:lt,value:dr}),Math.abs(Vn-(M??0))>.009&&Le.push({icon:"💵",label:ct,value:`${mr} ${ee}`}),Le.push({icon:"💰",label:Ds,value:`${W} ${ee}`});const pr=Le.map(({icon:k,label:G,value:ae})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${k} ${G}</span>
      <span class="summary-details-value">${ae}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let dt=[];Array.isArray(e.paymentHistory)?dt=e.paymentHistory:Array.isArray(e.payment_history)&&(dt=e.payment_history);const fr=Array.isArray(e.paymentLogs)?e.paymentLogs:[],Un=Array.isArray(dt)&&dt.length>0?dt:fr,gr=Un.length?`<ul class="reservation-payment-history-list">${Un.map(k=>{const G=k?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):k?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),ae=Number.isFinite(Number(k?.amount))&&Number(k.amount)>0?`${v(Number(k.amount).toFixed(2))} ${ee}`:"—",fe=Number.isFinite(Number(k?.percentage))&&Number(k.percentage)>0?`${v(Number(k.percentage).toFixed(2))}%`:"—",et=k?.recordedAt?v(De(k.recordedAt)):"—",tt=k?.note?`<div class="payment-history-note">${ge(v(k.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${ge(G)}</span>
              <span class="payment-history-entry__amount">${ae}</span>
              <span class="payment-history-entry__percent">${fe}</span>
              <span class="payment-history-entry__date">${et}</span>
            </div>
            ${tt}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${ge(er)}</div>`,Qn=[{text:i?As:$s,className:i?"status-confirmed":"status-pending"},{text:nr,className:Gt==="paid"?"status-paid":zn?"status-partial":"status-unpaid"}];d&&Qn.push({text:Ps,className:"status-completed"});const yr=Qn.map(({text:k,className:G})=>`<span class="status-chip ${G}">${k}</span>`).join(""),Ve=(k,G,ae)=>`
    <div class="res-info-row">
      <span class="label">${k} ${G}</span>
      <span class="value">${ae}</span>
    </div>
  `;let Wt="";if(e.projectId){let k=ge(Us);if(s){const G=s.title||o("projects.fallback.untitled","مشروع بدون اسم");k=`${ge(G)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${ge(Qs)}</button>`}Wt=`
      <div class="res-info-row">
        <span class="label">📁 ${Vs}</span>
        <span class="value">${k}</span>
      </div>
    `}const Ae=[];Ae.push(Ve("👤",zs,t?.customerName||tr)),Ae.push(Ve("📞",Os,t?.phone||"—")),Ae.push(Ve("🗓️",Ks,qe)),Ae.push(Ve("🗓️",Gs,we)),Ae.push(Ve("📦",Ys,On)),Ae.push(Ve("⏱️",ze,se)),Ae.push(Ve("📝",Ws,or)),Wt&&Ae.push(Wt);const hr=Ae.join(""),vr=u.length?u.map(k=>{const G=k.items[0]||{},ae=We(G)||k.image,fe=ae?`<img src="${ae}" alt="${Qt}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',et=Number(k.quantity)||Number(k.count)||0,tt=v(String(et)),Kn=Number.isFinite(Number(k.unitPrice))?Number(k.unitPrice):0,Sr=Number.isFinite(Number(k.totalPrice))?Number(k.totalPrice):Kn*et,Er=`${v(Kn.toFixed(2))} ${ee}`,Ir=`${v(Sr.toFixed(2))} ${ee}`,Gn=k.barcodes.map(Xt=>v(String(Xt||""))).filter(Boolean),qr=Gn.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Gn.map(Xt=>`<li>${Xt}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${fe}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${ge(G.desc||G.description||G.name||k.description||"-")}</div>
                  ${qr}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${ge(pe.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${tt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${ge(pe.unitPrice)}">${Er}</td>
            <td class="reservation-modal-items-table__cell" data-label="${ge(pe.total)}">${Ir}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${ge(pe.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Kt}</td></tr>`,br=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${pe.item}</th>
            <th>${pe.quantity}</th>
            <th>${pe.unitPrice}</th>
            <th>${pe.total}</th>
            <th>${pe.actions}</th>
          </tr>
        </thead>
        <tbody>${vr}</tbody>
      </table>
    </div>
  `,wr=g.map((k,G)=>{const ae=v(String(G+1)),fe=k.role||ie,et=k.phone||Oe,tt=k.wage?qs.replace("{amount}",v(String(k.wage))).replace("{currency}",ee):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ae}</span>
          <span class="technician-name">${k.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${fe}</div>
          <div>📞 ${et}</div>
          ${tt?`<div>💰 ${tt}</div>`:""}
        </div>
      </div>
    `}).join(""),xr=g.length?`<div class="reservation-technicians-grid">${wr}</div>`:`<ul class="reservation-modal-technicians"><li>${K}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${_s}</span>
          <strong>${te}</strong>
        </div>
        <div class="status-chips">
          ${yr}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Ls}</h6>
          ${hr}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Bs}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${pr}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Zs}</h6>
              ${gr}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Ns}</span>
          <span class="count">${rr}</span>
        </div>
        ${xr}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Fs}</span>
          <span class="count">${On}</span>
        </div>
        ${br}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Ms}</button>
        ${b?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Hs}</button>`:""}
      </div>
    </div>
  `}const wo=`@page {
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
`,Ra="reservations.quote.sequence",cn="reservations.quote.togglePrefs.v1",Ma="https://help.artratio.sa/guide/quote-preview",$e={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},xo=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],he=[...xo];function dn(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...he]}function So(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=dn(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=dn(t.value);if(a.length)return a}const n=he.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...he]}const Mt=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Ha=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(v(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>A(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>A(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>A(v(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>A(v(Number(e?.price||0).toFixed(2)))}],za=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(v(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>A(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>A(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>A(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Ln={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Ha.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:za.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Oa=new Set(Mt.map(({id:e})=>e)),Va=Object.fromEntries(Object.entries(Ln).map(([e,t=[]])=>[e,new Set(t.map(n=>n.id))]));function Ua(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const Eo="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Io="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",qo="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Ao=wo.trim(),$o=/color\([^)]*\)/gi,Lt=/(color\(|color-mix\()/i,ko=document.createElement("canvas"),It=ko.getContext("2d"),Qa=/^data:image\/svg\+xml/i,To=/\.svg($|[?#])/i,ft=512,un="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Ka=96,Ga=25.4,mn=210,qt=297,At=Math.round(mn/Ga*Ka),$t=Math.round(qt/Ga*Ka),Co=2,Wa=/safari/i,Po=/(iphone|ipad|ipod)/i,na=/(iphone|ipad|ipod)/i,_o=/(crios|fxios|edgios|opios)/i,Bt="[reservations/pdf]";let P=null,T=null,Ee=1,ut=null,mt=null,Be=null,nt=null,gt=!1;function Qe(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!P?.statusIndicator||!P?.statusText)return;P.statusKind=e;const r=t||Ua(e);P.statusText.textContent=r,P.statusSpinner&&(P.statusSpinner.hidden=!s),P.statusAction&&(P.statusAction.hidden=!0,P.statusAction.onclick=null,n&&typeof a=="function"&&(P.statusAction.textContent=n,P.statusAction.hidden=!1,P.statusAction.onclick=i=>{i.preventDefault(),a()})),P.statusIndicator.hidden=!1,requestAnimationFrame(()=>{P.statusIndicator.classList.add("is-visible")})}function yt(e){!P?.statusIndicator||!P?.statusText||(P.statusKind=null,P.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{P?.statusIndicator&&(P.statusIndicator.hidden=!0,P.statusAction&&(P.statusAction.hidden=!0,P.statusAction.onclick=null),P.statusSpinner&&(P.statusSpinner.hidden=!1))},220))}function pn(){return!!window?.bootstrap?.Modal}function Lo(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Be||(Be=document.createElement("div"),Be.className="modal-backdrop fade show",Be.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Be)),nt||(nt=t=>{t.key==="Escape"&&fn(e)},document.addEventListener("keydown",nt));try{e.focus({preventScroll:!0})}catch{}}}function fn(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Be&&(Be.remove(),Be=null),nt&&(document.removeEventListener("keydown",nt),nt=null))}function Bo(e){if(e){if(pn()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Lo(e)}}function Do(){if(gt)return;gt=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!P?.modal?.classList.contains("show"),s=()=>{P?.modal?.classList.contains("show")&&(Qe("render"),gt=!1,Xe())};ma({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Ma}),a&&Qe("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Bn(){const e={};return Object.entries(Ln).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function Xa(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function No(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Ya(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Ja(){return Object.fromEntries(Mt.map(({id:e})=>[e,!1]))}function Dn(e,t){return e.sectionExpansions||(e.sectionExpansions=Ja()),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function jo(e,t){return Dn(e,t)?.[t]!==!1}function Nn(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Fo(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Po.test(e)}function Ro(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Wa.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Za(){return Fo()&&Ro()}function Ht(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=na.test(e)||na.test(t),s=/Macintosh/i.test(e)&&n>1;return Wa.test(e)&&!_o.test(e)&&(a||s)}function Jt(e,...t){try{console.log(`${Bt} ${e}`,...t)}catch{}}function Ce(e,...t){try{console.warn(`${Bt} ${e}`,...t)}catch{}}function Mo(e,t,...n){try{t?console.error(`${Bt} ${e}`,t,...n):console.error(`${Bt} ${e}`,...n)}catch{}}function ye(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Ho(e,t="لا توجد بيانات للعرض."){const n=A(o(e,t));return ye(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function aa(e,t){return Array.isArray(e)&&e.length?e:[Ho(t)]}function gn(e,t="#000"){if(!It||!e)return t;try{return It.fillStyle="#000",It.fillStyle=e,It.fillStyle||t}catch{return t}}function zo(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=gn(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}const Oo=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function es(e=""){return Oo.test(e)}function Vo(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!es(r))return a.call(this,r,...i);let l,d=!1;try{"direction"in this&&(l=this.direction,l!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const c=this.canvas;c&&c.style?.direction!=="rtl"&&(c.__artRatioOriginalDirection=c.style.direction,c.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&l!==void 0&&l!=="rtl")try{this.direction=l}catch{}else if(!d){const c=this.canvas;c&&c.__artRatioOriginalDirection!==void 0&&(c.style.direction=c.__artRatioOriginalDirection,delete c.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function ts(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace($o,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Uo=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function ns(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;Uo.forEach(i=>{const l=s[i];if(l&&Lt.test(l)){const d=i.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),c=i==="backgroundColor"?"#ffffff":s.color||"#000000",u=gn(l,c);a.style.setProperty(d,u,"important")}});const r=s.backgroundImage;if(r&&Lt.test(r)){const i=gn(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",i,"important")}})}function as(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(r=>{const i=a[r];if(i&&Lt.test(i)){const l=r.replace(/[A-Z]/g,c=>`-${c.toLowerCase()}`),d=r==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(l,d,"important")}});const s=a.backgroundImage;s&&Lt.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function sa(e,t=ft){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Qo(e){if(!e)return{width:ft,height:ft};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?sa(t,0):0,s=n?sa(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(l=>parseFloat(l||"0"));if(i.length>=4){const[,,l,d]=i;a=a||(Number.isFinite(l)&&l>0?l:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||ft,height:s||ft}}function ss(e=""){return typeof e!="string"?!1:Qa.test(e)||To.test(e)}function Ko(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Go(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function rs(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Go(s),i=n.createElement("canvas"),l=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||l,1);i.width=l,i.height=d;const c=i.getContext("2d");return c.clearRect(0,0,l,d),c.drawImage(r,0,0,l,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Wo(e){if(!e)return null;if(Qa.test(e))return Ko(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Xo(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!ss(t))return!1;const n=await Wo(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",un),!1;const a=await rs(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",un),!1)}async function Yo(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Qo(e),s=await rs(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||un),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const l=e.getAttribute("width"),d=e.getAttribute("height");return l&&i.setAttribute("width",l),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function os(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{ss(s.getAttribute?.("src"))&&a.push(Xo(s))}),n.forEach(s=>{a.push(Yo(s))}),a.length&&await Promise.allSettled(a)}function Jo(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(q,N=0)=>{const Q=parseFloat(q);return Number.isFinite(Q)?Q:N},i=r(s.paddingTop),l=r(s.paddingBottom),d=r(s.paddingRight),c=r(s.paddingLeft),u=r(s.borderRadius),m=r(s.fontSize,14),p=(()=>{const q=s.lineHeight;if(!q||q==="normal")return m*1.6;const N=r(q,m*1.6);return N>0?N:m*1.6})(),f=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(f<=0)return null;const g=Math.max(1,f-c-d),b=e.textContent||"",h=b.split(/\r?\n/),S=n.createElement("canvas"),y=S.getContext("2d");if(!y)return null;const I=s.fontStyle||"normal",C=s.fontVariant||"normal",z=s.fontWeight||"400",w=s.fontFamily||"sans-serif",E=s.fontStretch||"normal",_=q=>q.join(" "),D=[],F=q=>y.measureText(q).width;y.font=`${I} ${C} ${z} ${E} ${m}px ${w}`,h.forEach(q=>{const N=q.trim();if(N.length===0){D.push("");return}const Q=N.split(/\s+/);let Z=[];Q.forEach((U,oe)=>{const X=U.trim();if(!X)return;const re=_(Z.concat(X));if(F(re)<=g||Z.length===0){Z.push(X);return}D.push(_(Z)),Z=[X]}),Z.length&&D.push(_(Z))}),D.length||D.push("");const x=i+l+D.length*p,L=Math.ceil(Math.max(1,f)*t),R=Math.ceil(Math.max(1,x)*t);S.width=L,S.height=R,S.style.width=`${Math.max(1,f)}px`,S.style.height=`${Math.max(1,x)}px`,y.scale(t,t);const V=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){y.save(),y.beginPath();const q=Math.max(1,f),N=Math.max(1,x),Q=Math.min(u,q/2,N/2);y.moveTo(Q,0),y.lineTo(q-Q,0),y.quadraticCurveTo(q,0,q,Q),y.lineTo(q,N-Q),y.quadraticCurveTo(q,N,q-Q,N),y.lineTo(Q,N),y.quadraticCurveTo(0,N,0,N-Q),y.lineTo(0,Q),y.quadraticCurveTo(0,0,Q,0),y.closePath(),y.clip()}if(y.fillStyle=V,y.fillRect(0,0,Math.max(1,f),Math.max(1,x)),y.font=`${I} ${C} ${z} ${E} ${m}px ${w}`,y.fillStyle=s.color||"#000000",y.textBaseline="top",y.textAlign="right","direction"in y)try{y.direction="rtl"}catch{}const j=Math.max(0,f-d);let O=i;D.forEach(q=>{const N=q.length?q:" ";y.fillText(N,j,O,g),O+=p});const H=n.createElement("img");let B;try{B=S.toDataURL("image/png")}catch(q){return Ce("note canvas toDataURL failed",q),null}return H.src=B,H.alt=b,H.style.width=`${Math.max(1,f)}px`,H.style.height=`${Math.max(1,x)}px`,H.style.display="block",H.setAttribute("data-quote-note-image","true"),{image:H,canvas:S,totalHeight:x,width:f}}function Zo(e,{pixelRatio:t=1}={}){if(!e||!Ht())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!es(a.textContent||""))return;let s;try{s=Jo(a,{pixelRatio:t})}catch(r){Ce("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function yn(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Mo(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,l=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),c=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Qe("export"),ps()):(Qe("render"),gt=!1,Xe())};if(ma({message:i,duration:9e3,actionLabel:c?d:void 0,onAction:c?u:void 0,linkLabel:l,linkHref:Ma}),P?.modal?.classList.contains("show")&&Qe("error",{message:i,actionLabel:c?d:void 0,onAction:c?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function hn({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Ce("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Ce("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function jn(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function ra(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function oa(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function ei(){const e=oa();return e||(mt||(mt=jn(Io).catch(t=>{throw mt=null,t}).then(()=>{const t=oa();if(!t)throw mt=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),mt)}async function ti(){const e=ra();return e||(ut||(ut=jn(qo).catch(t=>{throw ut=null,t}).then(()=>{const t=ra();if(!t)throw ut=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),ut)}async function ni(){if(window.html2pdf||await jn(Eo),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}zo(),Vo()}function A(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ai(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function si(){const e=window.localStorage?.getItem?.(Ra),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ri(){const t=si()+1;return{sequence:t,quoteNumber:ai(t)}}function oi(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Ra,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function ii(){try{const e=window.localStorage?.getItem?.(cn);if(!e)return null;const t=JSON.parse(e);return t&&typeof t=="object"?t:null}catch(e){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",e),null}}function li(e){try{if(!e){window.localStorage?.removeItem?.(cn);return}window.localStorage?.setItem?.(cn,JSON.stringify(e))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",t)}}function ci(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function di(e){if(!e)return null;const t=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(s=>Oa.has(s)),n={},a=e.fields||{};return Object.entries(Va).forEach(([s,r])=>{const i=a[s];if(i==null)return;const{ids:l,emptyExplicitly:d}=ci(i);if(!l&&!d)return;const c=Array.isArray(l)?l.filter(u=>r.has(u)):[];(c.length>0||d)&&(n[s]=c)}),{version:1,sections:t,fields:n}}function is(e){const t=di(e);t&&li(t)}function ui(e){if(!e)return;const t=ii();if(!t)return;const n=Array.isArray(t.sections)?t.sections.filter(a=>Oa.has(a)):[];if(n.length&&(e.sections=new Set(n)),t.fields&&typeof t.fields=="object"){const a=Xa(e.fields||Bn());Object.entries(t.fields).forEach(([s,r])=>{const i=Va[s];if(!i)return;const l=Array.isArray(r)?r.filter(d=>i.has(d)):[];a[s]=new Set(l)}),e.fields=a}}function mi(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function ls(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(v(String(n)));if(Number.isFinite(a))return a}return 0}function pi(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(v(String(n)));if(Number.isFinite(a))return a}return ls(e)}function fi(e){const t=jt()||[],{technicians:n=[]}=ne(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),l=s.get(i)||{};s.set(i,{...l,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function gi(e,t,n){const{projectLinked:a}=Ge(e,n),s=Ea(e.start,e.end),l=(Array.isArray(e.items)?e.items:[]).reduce((B,q)=>B+(Number(q?.qty)||1)*(Number(q?.price)||0),0)*s,d=t.reduce((B,q)=>B+ls(q),0),c=t.reduce((B,q)=>B+pi(q),0),u=d*s,m=c*s,p=l+m,f=parseFloat(e.discount)||0,g=e.discountType==="amount"?f:p*(f/100),b=Math.max(0,p-g),h=a?!1:e.applyTax,S=Number(e.cost),y=Number.isFinite(S),I=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,C=I!=null?parseFloat(v(String(I).replace("%","").trim())):NaN,z=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let E=(z!=null?z===!0||z===1||z==="1"||String(z).toLowerCase()==="true":Number.isFinite(C)&&C>0)&&Number.isFinite(C)?Number(C):0;h&&E<=0&&(E=Pe);let _=E>0?Math.max(0,b*(E/100)):0;_=Number(_.toFixed(2));const D=b+_;let F=h?D*.15:0;(!Number.isFinite(F)||F<0)&&(F=0),F=Number(F.toFixed(2));const x=D+F,L=Number.isFinite(x)?Number(x.toFixed(2)):0,R=a?L:y?S:L,V=Math.max(0,l+m-g),j=Math.max(0,V-u),O={equipmentTotal:l,crewTotal:m,crewCostTotal:u,discountAmount:g,subtotalAfterDiscount:b,taxableAmount:D,taxAmount:F,finalTotal:R,companySharePercent:E,companyShareAmount:_,netProfit:j},H={equipmentTotal:v(l.toFixed(2)),crewTotal:v(m.toFixed(2)),discountAmount:v(g.toFixed(2)),subtotalAfterDiscount:v(b.toFixed(2)),taxableAmount:v(D.toFixed(2)),taxAmount:v(F.toFixed(2)),finalTotal:v(R.toFixed(2)),companySharePercent:v(E.toFixed(2)),companyShareAmount:v(_.toFixed(2)),netProfit:v(j.toFixed(2))};return{totals:O,totalsDisplay:H,rentalDays:s}}function cs({reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:r,rentalDays:i,currencyLabel:l,sections:d,fieldSelections:c={},quoteNumber:u,quoteDate:m,terms:p=he}){const f=v(String(e?.reservationId??e?.id??"")),g=e.start?v(De(e.start)):"-",b=e.end?v(De(e.end)):"-",h=t?.customerName||t?.full_name||t?.name||"-",S=t?.phone||"-",y=t?.email||"-",I=t?.company||t?.company_name||"-",C=v(S),z=n?.title||n?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),w=n?.code||n?.projectCode||"",E=v(String(i)),_=e?.notes||"",D=Array.isArray(p)&&p.length?p:he,F=Xa(c),x=(K,ie)=>Ya(F,K,ie),L=K=>d?.has?.(K),R=`<div class="quote-placeholder">${A(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,V=(K,ie)=>`<div class="info-plain__item">${A(K)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${A(ie)}</strong></div>`,j=(K,ie,{variant:Oe="inline"}={})=>Oe==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${A(K)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${A(ie)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${A(K)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${A(ie)}</span>
    </span>`,O=(K,ie)=>`<div class="payment-row">
      <span class="payment-row__label">${A(K)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${A(ie)}</span>
    </div>`,H=[];x("customerInfo","customerName")&&H.push(V(o("reservations.details.labels.customer","العميل"),h)),x("customerInfo","customerCompany")&&H.push(V(o("reservations.details.labels.company","الشركة"),I)),x("customerInfo","customerPhone")&&H.push(V(o("reservations.details.labels.phone","الهاتف"),C)),x("customerInfo","customerEmail")&&H.push(V(o("reservations.details.labels.email","البريد"),y));const B=L("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${H.length?`<div class="info-plain">${H.join("")}</div>`:R}
      </section>`:"",q=[];x("reservationInfo","reservationId")&&q.push(V(o("reservations.details.labels.reservationId","رقم الحجز"),f||"-")),x("reservationInfo","reservationStart")&&q.push(V(o("reservations.details.labels.start","بداية الحجز"),g)),x("reservationInfo","reservationEnd")&&q.push(V(o("reservations.details.labels.end","نهاية الحجز"),b)),x("reservationInfo","reservationDuration")&&q.push(V(o("reservations.details.labels.duration","عدد الأيام"),E));const N=L("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:R}
      </section>`:"",Q=[];x("projectInfo","projectTitle")&&Q.push(V(o("reservations.details.labels.project","المشروع"),z)),x("projectInfo","projectCode")&&Q.push(V(o("reservations.details.labels.code","الرمز"),w||"-"));const Z=L("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${Q.length?`<div class="info-plain">${Q.join("")}</div>`:R}
      </section>`:"",U=[];x("financialSummary","equipmentTotal")&&U.push(j(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${r.equipmentTotal} ${l}`)),x("financialSummary","crewTotal")&&U.push(j(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${r.crewTotal} ${l}`)),x("financialSummary","discountAmount")&&U.push(j(o("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${l}`)),x("financialSummary","taxAmount")&&U.push(j(o("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${l}`));const oe=x("financialSummary","finalTotal"),X=[];oe&&X.push(j(o("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${l}`,{variant:"final"}));const re=X.length?`<div class="totals-final">${X.join("")}</div>`:"",M=L("financialSummary")?!U.length&&!oe?`<section class="quote-section quote-section--financial">${R}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${A(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${U.length?`<div class="totals-inline">${U.join("")}</div>`:""}
            ${re}
          </div>
        </section>`:"",te=Ha.filter(K=>x("items",K.id)),qe=te.length>0,we=qe?te.map(K=>`<th>${A(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join(""):"",ue=Array.isArray(e.items)&&e.items.length>0?e.items.map((K,ie)=>`<tr>${te.map(Oe=>`<td>${Oe.render(K,ie)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(te.length,1)}" class="empty">${A(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,Se=L("items")?qe?`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${we}</tr>
              </thead>
              <tbody>${ue}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.items.title","المعدات"))}</h3>
            ${R}
          </section>`:"",le=za.filter(K=>x("crew",K.id)),me=le.length>0,W=me?le.map(K=>`<th>${A(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join(""):"",se=a.length?a.map((K,ie)=>`<tr>${le.map(Oe=>`<td>${Oe.render(K,ie)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(le.length,1)}" class="empty">${A(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ee=L("crew")?me?`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${W}</tr>
              </thead>
              <tbody>${se}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${R}
          </section>`:"",He=L("notes")?`<section class="quote-section">
        <h3>${A(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${A(_||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",_e=[];x("payment","beneficiary")&&_e.push(O(o("reservations.quote.labels.beneficiary","اسم المستفيد"),$e.beneficiaryName)),x("payment","bank")&&_e.push(O(o("reservations.quote.labels.bank","اسم البنك"),$e.bankName)),x("payment","account")&&_e.push(O(o("reservations.quote.labels.account","رقم الحساب"),v($e.accountNumber))),x("payment","iban")&&_e.push(O(o("reservations.quote.labels.iban","رقم الآيبان"),v($e.iban)));const Vt=`<section class="quote-section">
      <div class="payment-block">
        <h3>${A(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${_e.length?_e.join(""):R}</div>
      </div>
      <p class="quote-approval-note">${A($e.approvalNote)}</p>
    </section>`,Ut=`<footer class="quote-footer">
        <h4>${A(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${D.map(K=>`<li>${A(K)}</li>`).join("")}</ul>
      </footer>`,ze=[];B&&N?ze.push(ye(`<div class="quote-section-row">${B}${N}</div>`,{blockType:"group"})):(N&&ze.push(ye(N)),B&&ze.push(ye(B))),Z&&ze.push(ye(Z));const lt=[];Se&&lt.push(ye(Se,{blockType:"table",extraAttributes:'data-table-id="items"'})),ee&&lt.push(ye(ee,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const ct=[];M&&ct.push(ye(M,{blockType:"summary"})),He&&ct.push(ye(He));const Qt=[ye(Vt,{blockType:"payment"}),ye(Ut,{blockType:"footer"})],pe=[...aa(ze,"reservations.quote.placeholder.page1"),...lt,...aa(ct,"reservations.quote.placeholder.page2"),...Qt],Kt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${A($e.logoUrl)}" alt="${A($e.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${A(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${A($e.companyName)}</p>
        <p class="quote-company-cr">${A(o("reservations.quote.labels.cr","السجل التجاري"))}: ${A($e.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${A(u)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${A(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Ao}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Kt}
          ${pe.join("")}
        </div>
      </div>
    </div>
  `}function yi(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function vt(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(l=>yi(l)),i=[s,...r].map(l=>l.catch(d=>(Ce("asset load failed",d),Do(),null)));await Promise.all(i),await new Promise(l=>n.requestAnimationFrame(()=>l()))}async function ds(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await os(r),await vt(r),s.innerHTML="";const l=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,c=null;const u=w=>{w.style.margin="0 auto",w.style.breakInside="avoid",w.style.pageBreakInside="avoid",w.style.pageBreakAfter="auto",w.style.breakAfter="auto"},m=()=>{const w=a.createElement("div"),E=s.childElementCount===0;if(w.className="quote-page",w.dataset.pageIndex=String(s.childElementCount),E){w.classList.add("quote-page--primary");const D=i.cloneNode(!0);D.removeAttribute("data-quote-header-template"),w.appendChild(D)}else w.classList.add("quote-page--continuation");const _=a.createElement("main");_.className="quote-body",w.appendChild(_),s.appendChild(w),u(w),d=w,c=_},p=()=>{(!d||!c||!c.isConnected)&&m()},f=()=>{if(!d||!c||c.childElementCount>0)return;const w=d;d=null,c=null,w.parentNode&&w.parentNode.removeChild(w)},g=()=>{d=null,c=null},b=()=>d?d.scrollHeight-d.clientHeight>Co:!1,h=(w,{allowOverflow:E=!1}={})=>(p(),c.appendChild(w),b()&&!E?(c.removeChild(w),f(),!1):!0),S=w=>{const E=w.cloneNode(!0);E.removeAttribute?.("data-quote-block"),E.removeAttribute?.("data-block-type"),E.removeAttribute?.("data-table-id"),!h(E)&&(g(),!h(E)&&h(E,{allowOverflow:!0}))},y=w=>{const E=w.querySelector("table");if(!E){S(w);return}const _=w.querySelector("h3"),D=E.querySelector("thead"),F=Array.from(E.querySelectorAll("tbody tr"));if(!F.length){S(w);return}let x=null,L=0;const R=(j=!1)=>{const O=w.cloneNode(!1);O.removeAttribute("data-quote-block"),O.removeAttribute("data-block-type"),O.removeAttribute("data-table-id"),O.classList.add("quote-section--table-fragment"),j&&O.classList.add("quote-section--table-fragment--continued");const H=_?_.cloneNode(!0):null;H&&O.appendChild(H);const B=E.cloneNode(!1);B.classList.add("quote-table--fragment"),D&&B.appendChild(D.cloneNode(!0));const q=a.createElement("tbody");return B.appendChild(q),O.appendChild(B),{section:O,body:q}},V=(j=!1)=>x||(x=R(j),h(x.section)||(g(),h(x.section)||h(x.section,{allowOverflow:!0})),x);F.forEach(j=>{V(L>0);const O=j.cloneNode(!0);if(x.body.appendChild(O),b()&&(x.body.removeChild(O),x.body.childElementCount||(c.removeChild(x.section),x=null,f()),g(),x=null,V(L>0),x.body.appendChild(O),b())){x.section.classList.add("quote-section--table-fragment--overflow"),L+=1;return}L+=1}),x=null};if(!l.length)return;l.forEach(w=>{w.getAttribute("data-block-type")==="table"?y(w):S(w)});const I=Array.from(s.children),C=[];if(I.forEach((w,E)=>{const _=w.querySelector(".quote-body");if(E!==0&&(!_||_.childElementCount===0)){w.remove();return}C.push(w)}),!n){const w=a.defaultView||window,E=Math.min(3,Math.max(1,w.devicePixelRatio||1)),_=Ht()?Math.min(2,E):E;C.forEach(D=>Zo(D,{pixelRatio:_}))}C.forEach((w,E)=>{const _=E===0;w.style.pageBreakAfter="auto",w.style.breakAfter="auto",w.style.pageBreakBefore=_?"auto":"always",w.style.breakBefore=_?"auto":"page",n?w.style.boxShadow="":w.style.boxShadow="none"});const z=C[C.length-1]||null;d=z,c=z?.querySelector(".quote-body")||null,await vt(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Fn(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function hi(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([ti(),ei()]),l=e.ownerDocument||document,d=l?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,l?.documentElement?.getAttribute?.("dir")].some(w=>typeof w=="string"&&w.toLowerCase().startsWith("rtl")),m=typeof window<"u"&&window.devicePixelRatio||1,p=Nn(),f=Za(),g=Ht();let b;g?b=1.5:f?b=Math.min(1.7,Math.max(1.2,m*1.1)):p?b=Math.min(1.8,Math.max(1.25,m*1.2)):b=Math.min(2,Math.max(1.6,m*1.4));const h=g||f?.9:p?.92:.95,S=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),y={scale:b,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let I=0;const C=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let w=0;w<s.length;w+=1){const E=s[w];await os(E),await vt(E);const _=E.ownerDocument||document,D=_.createElement("div");Object.assign(D.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const F=E.cloneNode(!0);F.style.width=`${At}px`,F.style.maxWidth=`${At}px`,F.style.minWidth=`${At}px`,F.style.height=`${$t}px`,F.style.maxHeight=`${$t}px`,F.style.minHeight=`${$t}px`,F.style.position="relative",F.style.background="#ffffff",Fn(F),D.appendChild(F),_.body.appendChild(D);let x;try{await vt(F),x=await i(F,{...y,scale:b,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(q){throw yn(q,"pageCapture",{toastMessage:C}),q}finally{D.parentNode?.removeChild(D)}if(!x)continue;const L=x.width||1,V=(x.height||1)/L;let j=mn,O=j*V,H=0;if(O>qt){const q=qt/O;O=qt,j=j*q,H=Math.max(0,(mn-j)/2)}const B=x.toDataURL("image/jpeg",h);I>0&&S.addPage(),S.addImage(B,"JPEG",H,0,j,O,`page-${I+1}`,"FAST"),I+=1,await new Promise(q=>window.requestAnimationFrame(q))}}catch(w){throw hn({safariWindowRef:n,mobileWindowRef:a}),w}if(I===0)throw hn({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(f||g){const w=S.output("blob");if(g){const E=URL.createObjectURL(w);yt();try{window.location.assign(E)}catch(_){Ce("mobile safari blob navigation failed",_)}finally{setTimeout(()=>URL.revokeObjectURL(E),6e4)}}else{const E=URL.createObjectURL(w),_=()=>f&&n&&!n.closed?n:a&&!a.closed?a:null,D=(x,L)=>{if(yt(),!x){window.location.assign(L);return}try{x.location.replace(L),x.focus?.()}catch(R){Ce("direct blob navigation failed",R);try{x.document.open(),x.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${A(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${L}" title="PDF preview"></iframe></body></html>`),x.document.close()}catch(V){Ce("iframe blob delivery failed",V),window.location.assign(L)}}},F=_();D(F,E),setTimeout(()=>URL.revokeObjectURL(E),6e4)}}else{yt();const w=S.output("bloburl"),E=document.createElement("a");E.href=w,E.download=t,E.rel="noopener",E.style.display="none",document.body.appendChild(E),E.click(),setTimeout(()=>{URL.revokeObjectURL(w),E.remove()},2e3)}}function Xe(){if(!T||!P)return;const{previewFrame:e}=P;if(!e)return;const t=cs({reservation:T.reservation,customer:T.customer,project:T.project,technicians:T.technicians,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms});Qe("render"),e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{try{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(ts(s),ns(s,a),as(s,a));const r=n?.getElementById("quotation-pdf-root");try{r&&(await ds(r,{context:"preview"}),Fn(r))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const i=Array.from(n?.querySelectorAll?.(".quote-page")||[]),l=n?.querySelector(".quote-preview-pages"),d=At;let c=18;if(l&&n?.defaultView){const p=n.defaultView.getComputedStyle(l),f=parseFloat(p.rowGap||p.gap||`${c}`);Number.isFinite(f)&&f>=0&&(c=f)}const u=$t,m=i.length?i.length*u+Math.max(0,(i.length-1)*c):u;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(m),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${m}px`,e.style.minHeight=`${m}px`,P?.previewFrameWrapper&&!P?.userAdjustedZoom){const p=P.previewFrameWrapper.clientWidth-24;p>0&&p<d?Ee=Math.max(p/d,.3):Ee=1}ms(Ee)}finally{yt()}},{once:!0})}function vi(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?T.sections.add(n):T.sections.delete(n),is(T),us(),Xe())}function bi(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=T.fields||(T.fields=Bn()),r=No(s,n);t.checked?r.add(a):r.delete(a),is(T),Xe()}function wi(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Dn(T,n),T.sectionExpansions[n]=t.open)}function us(){if(!P?.toggles||!T)return;const{toggles:e}=P,t=T.fields||{};Dn(T);const n=Mt.map(({id:a,labelKey:s,fallback:r})=>{const i=o(s,r),l=T.sections.has(a),d=Ln[a]||[],c=jo(T,a),u=d.length?`<div class="quote-toggle-sublist">
          ${d.map(m=>{const p=Ya(t,a,m.id),f=l?"":"disabled",g=m.labelKey?o(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${m.id}" ${p?"checked":""} ${f}>
                <span>${A(g)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${a}" ${c?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${a}" ${l?"checked":""}>
            <span>${A(i)}</span>
          </label>
          ${d.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${u}
      </details>
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",vi)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",bi)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",wi)})}function xi(){if(P?.modal)return P;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${A(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${A(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${A(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${A(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${A(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${A(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${A(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),l=e.querySelector(".modal-header"),d=l?.querySelector(".btn-close"),c=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",l&&l.insertBefore(u,d||null);const m=document.createElement("iframe");m.className="quote-preview-frame",m.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),m.setAttribute("loading","lazy"),m.setAttribute("frameborder","0");const p=document.createElement("div");p.className="quote-preview-zoom-controls",p.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${A(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${A(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${A(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const f=document.createElement("div");f.className="quote-preview-frame-wrapper",f.appendChild(m),n.innerHTML="";const g=document.createElement("div");g.className="quote-preview-scroll",g.appendChild(f),n.appendChild(g);const b=document.createElement("div");b.className="quote-preview-status",b.setAttribute("role","status"),b.setAttribute("aria-live","polite"),b.hidden=!0,b.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${A(Ua("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(b),u.appendChild(p),i?.addEventListener("click",async()=>{if(T){i.disabled=!0;try{await ps()}finally{i.disabled=!1}}});const h=()=>{pn()||fn(e)};c.forEach(C=>{C?.addEventListener("click",h)}),d&&!c.includes(d)&&d.addEventListener("click",h),e.addEventListener("click",C=>{pn()||C.target===e&&fn(e)}),P={modal:e,toggles:t,preview:n,previewScroll:g,previewFrameWrapper:f,zoomControls:p,zoomValue:p.querySelector("[data-zoom-value]"),previewFrame:m,meta:a,downloadBtn:i,statusIndicator:b,statusText:b.querySelector("[data-quote-status-text]"),statusSpinner:b.querySelector("[data-quote-status-spinner]"),statusAction:b.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const S=p.querySelector("[data-zoom-out]"),y=p.querySelector("[data-zoom-in]"),I=p.querySelector("[data-zoom-reset]");return S?.addEventListener("click",()=>ia(-.1)),y?.addEventListener("click",()=>ia(.1)),I?.addEventListener("click",()=>Dt(1,{markManual:!0})),s&&s.addEventListener("input",Ei),r&&r.addEventListener("click",Ii),Dt(Ee),P}function Dt(e,{silent:t=!1,markManual:n=!1}={}){Ee=Math.min(Math.max(e,.25),2.2),n&&P&&(P.userAdjustedZoom=!0),ms(Ee),!t&&P?.zoomValue&&(P.zoomValue.textContent=`${Math.round(Ee*100)}%`)}function ia(e){Dt(Ee+e,{markManual:!0})}function ms(e){if(!P?.previewFrame||!P.previewFrameWrapper)return;const t=P.previewFrame,n=P.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Nn()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Si(){if(!P?.meta||!T)return;const{meta:e}=P;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${A(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${A(T.quoteNumber)}</strong></div>
      <div><span>${A(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${A(T.quoteDateLabel)}</strong></div>
    </div>
  `}function Rn(){if(!P?.termsInput)return;const e=(T?.terms&&T.terms.length?T.terms:he).join(`
`);P.termsInput.value!==e&&(P.termsInput.value=e)}function Ei(e){if(!T)return;const t=dn(e?.target?.value??"");if(t.length){T.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{T.terms=[...he],Rn();const n=he.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Xe()}function Ii(e){if(e?.preventDefault?.(),!T)return;T.terms=[...he];const t=document.getElementById("reservation-terms");t&&(t.value=he.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=he.join(`
`)),Rn(),Xe()}async function ps(){if(!T)return;Qe("export");const t=!Nn()&&Za(),n=Ht(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${A(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${A(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${A(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(c){Ce("failed to prime download window",c)}})(s);let i=null;const l=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await ni(),Jt("html2pdf ensured");const d=cs({reservation:T.reservation,customer:T.customer,project:T.project,technicians:T.technicians,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms});i=document.createElement("div"),i.innerHTML=d,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),ts(i),ns(i),as(i),Jt("export container prepared");const c=i.firstElementChild;if(c){c.setAttribute("dir","rtl"),c.style.direction="rtl",c.style.textAlign="right",c.setAttribute("data-theme","light"),c.classList.remove("dark","dark-mode"),c.style.margin="0",c.style.padding="0",c.style.width="210mm",c.style.maxWidth="210mm",c.style.marginLeft="auto",c.style.marginRight="auto",c.scrollTop=0,c.scrollLeft=0;try{await ds(c,{context:"export"}),await vt(c),Fn(c),Jt("layout complete for export document")}catch(m){yn(m,"layoutQuoteDocument",{suppressToast:!0})}}const u=`quotation-${T.quoteNumber}.pdf`;await hi(c,{filename:u,safariWindowRef:s,mobileWindowRef:a}),T.sequenceCommitted||(oi(T.quoteSequence),T.sequenceCommitted=!0)}catch(d){hn({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,yn(d,"exportQuoteAsPdf",{toastMessage:l})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),yt()}}function qi(){const e=xi();e?.modal&&(gt=!1,Ee=1,P&&(P.userAdjustedZoom=!1),Dt(Ee,{silent:!0}),us(),Si(),Rn(),Xe(),Bo(e.modal))}async function Ai({reservation:e,customer:t,project:n}){if(!e){$(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=fi(e),{totalsDisplay:s,totals:r,rentalDays:i}=gi(e,a,n),l=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:c}=ri(),u=new Date,m=So();T={reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:l,sections:new Set(Mt.filter(p=>p.defaultSelected).map(p=>p.id)),sectionExpansions:Ja(),fields:Bn(),terms:m,quoteSequence:d,quoteNumber:c,quoteDate:u,quoteDateLabel:mi(u),sequenceCommitted:!1},ui(T),qi()}function $i({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=jt(),{reservations:r=[],customers:i=[],technicians:l=[],projects:d=[]}=ne(),c=Array.isArray(s)?s:l||[],u=new Map((d||[]).map(h=>[String(h.id),h])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||po(),f=new Map(i.map(h=>[String(h.id),h])),g=new Map(c.map(h=>[String(h.id),h])),b=ho({reservations:r,filters:p,customersMap:f,techniciansMap:g,projectsMap:u});if(b.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${vo({entries:b,customersMap:f,techniciansMap:g,projectsMap:u})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(h=>{const S=Number(h.dataset.reservationIndex);Number.isNaN(S)||h.addEventListener("click",()=>{typeof n=="function"&&n(S)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(h=>{const S=Number(h.dataset.reservationIndex);Number.isNaN(S)||h.addEventListener("click",y=>{y.stopPropagation(),typeof a=="function"&&a(S,y)})})}function ki(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ne(),l=s[e];if(!l)return $(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r.find(S=>String(S.id)===String(l.customerId)),c=l.projectId?i.find(S=>String(S.id)===String(l.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const S=jt()||[];u.innerHTML=bo(l,d,S,e,c)}const m=document.getElementById("reservationDetailsModal"),p=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},f=document.getElementById("reservation-details-edit-btn");f&&(f.onclick=()=>{p(),typeof t=="function"&&t(e,{reservation:l,customer:d,getEditContext:a})});const g=document.getElementById("reservation-details-delete-btn");g&&(g.onclick=()=>{p(),typeof n=="function"&&n(e,{reservation:l,customer:d})});const b=u?.querySelector('[data-action="open-project"]');b&&c&&b.addEventListener("click",()=>{p();const S=c?.id!=null?String(c.id):"",y=S?`projects.html?project=${encodeURIComponent(S)}`:"projects.html";window.location.href=y});const h=document.getElementById("reservation-details-export-btn");return h&&(h.onclick=async S=>{S?.preventDefault?.(),S?.stopPropagation?.(),h.blur();try{await Ai({reservation:l,customer:d,project:c})}catch(y){console.error("❌ [reservations] export to PDF failed",y),$(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function St(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:ht(e,n),end:ht(t,a)}}function Ye(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,ca(t);return}const d=Ke(e);t.innerHTML=d.map(c=>{const u=c.items[0]||{},m=We(u)||c.image,p=m?`<img src="${m}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',f=v(String(c.count)),g=Number.isFinite(Number(c.unitPrice))?Number(c.unitPrice):0,b=Number.isFinite(Number(c.totalPrice))?Number(c.totalPrice):g*c.count,h=`${v(g.toFixed(2))} ${a}`,S=`${v(b.toFixed(2))} ${a}`,y=c.barcodes.map(C=>v(String(C||""))).filter(Boolean),I=y.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${y.map(C=>`<li>${C}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${c.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${c.description||"-"}</div>
                ${I}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${c.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${c.key}" aria-label="${i}">−</button>
              <span class="reservation-qty-value">${f}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${c.key}" aria-label="${r}">+</button>
            </div>
          </td>
          <td>${h}</td>
          <td>${S}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${c.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join(""),ca(t)}function Ti(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function zt(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Ot();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,la();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${v(Number(s.amount).toFixed(2))} ${n}`:"—",l=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${v(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?v(De(s.recordedAt)):"—",c=Ti(s?.type),u=s?.note?v(s.note):"";return`
      <tr>
        <td>${c}</td>
        <td>${i}</td>
        <td>${l}</td>
        <td>${d}</td>
        <td>${u}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${r}" aria-label="${o("reservations.paymentHistory.actions.delete","حذف الدفعة")}">🗑️</button>
        </td>
      </tr>
    `}).join("");e.innerHTML=`
    <div class="reservation-payment-history__table-wrapper">
      <table class="table table-sm reservation-payment-history__table">
        <thead>
          <tr>
            <th>${o("reservations.paymentHistory.headers.method","نوع الدفعة")}</th>
            <th>${o("reservations.paymentHistory.headers.amount","المبلغ")}</th>
            <th>${o("reservations.paymentHistory.headers.percent","النسبة")}</th>
            <th>${o("reservations.paymentHistory.headers.date","التاريخ")}</th>
            <th>${o("reservations.paymentHistory.headers.note","ملاحظات")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${a}</tbody>
      </table>
    </div>
  `,la()}function Ci(){const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=ys(e);let a=hs(t);if(!Number.isFinite(a)||a<=0){$(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=en.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,l=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let c=null,u=null;if(n==="percent"){const p=Math.max(0,100-i);if(p<=1e-4){$(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const f=Math.min(a,p);if(f!==a){const g=v(f.toFixed(2));$(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",g)),a=f}u=Number(a.toFixed(2)),r>0&&(c=a/100*r)}else{const p=Math.max(0,r-l);if(p<=1e-4){$(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const f=Math.min(a,p);if(f!==a){const g=`${v(f.toFixed(2))} ${d}`;$(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",g)),a=f}c=Number(a.toFixed(2)),r>0&&(u=c/r*100)}c!=null&&(c=Number(c.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const m={type:n,value:a,amount:c,percentage:u,recordedAt:new Date().toISOString()};Fi(m),Mn(Ot()),zt(),be(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),$(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function la(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",Ci),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;const s=Number(a.dataset.index);Number.isNaN(s)||(Ri(s),Mn(Ot()),zt(),be(),$(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Pi(e){const{index:t,items:n}=Je(),s=Ke(n).find(l=>l.key===e);if(!s)return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((l,d)=>d!==r);Ze(t,i),Ye(i),be()}function _i(e){const{index:t,items:n}=Je(),a=n.filter(s=>Ft(s)!==e);a.length!==n.length&&(Ze(t,a),Ye(a),be())}function Li(e){const{index:t,items:n}=Je(),s=Ke(n).find(h=>h.key===e);if(!s)return;const{start:r,end:i}=St();if(!r||!i){$(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:l=[]}=ne(),d=t!=null&&l[t]||null,c=d?.id??d?.reservationId??null,u=new Set(n.map(h=>J(h.barcode))),{equipment:m=[]}=ne(),p=(m||[]).find(h=>{const S=J(h?.barcode);return!S||u.has(S)||Ft({desc:h?.desc||h?.description||h?.name||"",price:Number(h?.price)||0})!==e||!qa(h)?!1:!Fe(S,r,i,c)});if(!p){$(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const f=J(p.barcode),g=rt(p);if(!g){$(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...n,{id:g,equipmentId:g,barcode:f,desc:p.desc||p.description||p.name||s.description||"",qty:1,price:Number.isFinite(Number(p.price))?Number(p.price):s.unitPrice,image:We(p)}];Ze(t,b),Ye(b),be()}function ca(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Pi(s);return}if(a==="increase-edit-group"&&s){Li(s);return}if(a==="remove-edit-group"&&s){_i(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Bi(i)}}),e.dataset.groupListenerAttached="true")}function be(){const e=document.getElementById("edit-res-summary");if(!e)return;zt();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Te(a),be()}),a.dataset.listenerAttached="true");const s=v(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",l=!!document.getElementById("edit-res-project")?.value,d=document.getElementById("edit-res-tax"),c=l?!1:d?.checked||!1,u=a?.dataset?.userSelected==="true",m=u&&a?.value||"unpaid";c&&ve("edit-res-company-share");let p=at("edit-res-company-share");c&&(!Number.isFinite(p)||p<=0)&&(ve("edit-res-company-share"),p=at("edit-res-company-share"));const{items:f=[],payments:g=[]}=Je(),{start:b,end:h}=St(),S=en({items:f,discount:r,discountType:i,applyTax:c,paidStatus:m,start:b,end:h,companySharePercent:p,paymentHistory:g});e.innerHTML=S;const y=en.lastResult;if(y&&a){const I=y.paymentStatus;u?Te(a,a.value):(a.value!==I&&(a.value=I),a.dataset&&delete a.dataset.userSelected,Te(a,I))}else a&&Te(a,a.value)}function Bi(e){if(e==null)return;const{index:t,items:n}=Je();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Ze(t,a),Ye(a),be()}function Di(e){const t=e?.value??"",n=J(t);if(!n)return;const a=Rt(n);if(!a){$(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Re(a);if(s==="maintenance"||s==="retired"){$(ot(s));return}const r=J(n),{index:i,items:l=[]}=Je();if(l.findIndex(h=>J(h.barcode)===r)>-1){$(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:c,end:u}=St();if(!c||!u){$(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:m=[]}=ne(),p=i!=null&&m[i]||null,f=p?.id??p?.reservationId??null;if(Fe(r,c,u,f)){$(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const g=rt(a);if(!g){$(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...l,{id:g,equipmentId:g,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Ze(i,b),e&&(e.value=""),Ye(b),be()}function Nt(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Da(t),a=J(n?.barcode||t);if(!n||!a){$(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Re(n);if(s==="maintenance"||s==="retired"){$(ot(s));return}const{start:r,end:i}=St();if(!r||!i){$(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:l,items:d=[]}=Je();if(d.some(b=>J(b.barcode)===a)){$(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ne(),m=l!=null&&u[l]||null,p=m?.id??m?.reservationId??null;if(Fe(a,r,i,p)){$(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const f=rt(n);if(!f){$(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...d,{id:f,equipmentId:f,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Ze(l,g),Ye(g),be(),e.value=""}function fs(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Nt(e))});const t=()=>{Na(e.value,"edit-res-equipment-description-options")&&Nt(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{be()});typeof window<"u"&&(window.getEditReservationDateRange=St,window.renderEditPaymentHistory=zt);function Ni(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){ln(e);return}Nt(e)}}function Xi(){it(),fs()}function ji(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let bt=null,ke=[],Ie=[],vn=null,ce={},Zt=!1;function bn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",l=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:l,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function wn(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Je(){return{index:bt,items:ke,payments:Ie}}function Ze(e,t,n=Ie){bt=typeof e=="number"?e:null,ke=Array.isArray(t)?[...t]:[],Ie=Array.isArray(n)?[...n]:[]}function gs(){bt=null,ke=[],Fr(),Ie=[]}function Ot(){return[...Ie]}function Mn(e){Ie=Array.isArray(e)?[...e]:[]}function Fi(e){e&&(Ie=[...Ie,e])}function Ri(e){!Number.isInteger(e)||e<0||(Ie=Ie.filter((t,n)=>n!==e))}function Mi(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function ys(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function hs(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Hi(e,t){if(e){e.value="";return}}function pt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function vs(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(v(String(e.value??""))),a=Number.parseFloat(v(String(e.amount??""))),s=Number.parseFloat(v(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,l=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=l==="amount"?r??null:l==="percent"?i??null:Number.isFinite(n)?n:null,c=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:l,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:c}}function zi(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,c)=>String(c.createdAt||c.start||"").localeCompare(String(d.createdAt||d.start||""))):[],l=[`<option value="">${pt(a)}</option>`];i.forEach(d=>{l.push(`<option value="${pt(d.id)}">${pt(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&l.push(`<option value="${pt(r)}">${pt(s)}</option>`),n.innerHTML=l.join(""),r?n.value=r:n.value=""}function bs(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&n.checked&&(n.checked=!1),n&&(n.disabled=!0,n.classList.add("disabled"));else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1),n&&(n.disabled=!1,n.classList.remove("disabled"))}xn("tax")}function xn(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=ce?.updateEditReservationSummary;typeof r=="function"&&r()};if(Zt){a();return}Zt=!0;const s=()=>{Zt=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Pe)),t.disabled){n.checked=!1,$(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),ve("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ve("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function da(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:l,projects:d}=ne(),u=Ia()?.[e];if(!u){$(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ce={...ce,reservation:u,projects:d||[]},t?.(),zi(d||[],u);const m=u.projectId&&d?.find?.(B=>String(B.id)===String(u.projectId))||null,{effectiveConfirmed:p,projectLinked:f}=Ge(u,m),g=u.items?u.items.map(B=>({...B,equipmentId:B.equipmentId??B.equipment_id??B.id,barcode:J(B?.barcode)})):[],h=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(B=>vs(B)).filter(Boolean);Ze(e,g,h);const S=o("reservations.list.unknownCustomer","غير معروف"),y=l?.find?.(B=>String(B.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const I=document.getElementById("edit-res-id");I&&(I.value=u.reservationId||u.id);const C=document.getElementById("edit-res-customer");C&&(C.value=y?.customerName||S);const z=typeof a=="function"?a(u.start):{date:"",time:""},w=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",z.date),n?.("edit-res-start-time",z.time),n?.("edit-res-end",w.date),n?.("edit-res-end-time",w.time);const E=document.getElementById("edit-res-notes");E&&(E.value=u.notes||"");const _=document.getElementById("edit-res-discount");_&&(_.value=v(u.discount??0));const D=document.getElementById("edit-res-discount-type");D&&(D.value=u.discountType||"percent");const F=u.projectId?!1:!!u.applyTax,x=document.getElementById("edit-res-tax");x&&(x.checked=F);const L=document.getElementById("edit-res-company-share");if(L){const B=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,q=B!=null?Number.parseFloat(v(String(B).replace("%","").trim())):NaN,N=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,Q=N!=null?N===!0||N===1||N==="1"||String(N).toLowerCase()==="true":Number.isFinite(q)&&q>0,Z=Q&&Number.isFinite(q)&&q>0?q:Pe,U=F||Q;L.checked=U,L.dataset.companyShare=String(Z)}bn(p,{disable:f});const R=document.getElementById("edit-res-paid"),V=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");R&&(R.value=V,R.dataset&&delete R.dataset.userSelected);const j=document.getElementById("edit-res-payment-progress-type"),O=document.getElementById("edit-res-payment-progress-value");if(j?.dataset?.userSelected&&delete j.dataset.userSelected,j&&(j.value="percent"),Hi(O),Br((u.technicians||[]).map(B=>String(B))),s?.(g),typeof window<"u"){const B=window?.renderEditPaymentHistory;typeof B=="function"&&B()}bs(),r?.();const H=document.getElementById("editReservationModal");vn=Mi(H,i),vn?.show?.()}async function Oi({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:r,handleReservationsMutation:i}={}){if(bt===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",c=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",p=v(document.getElementById("edit-res-discount")?.value||"0"),f=parseFloat(p)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent",b=wn(),h=document.getElementById("edit-res-paid"),S=h?.dataset?.userSelected==="true",y=S&&h?.value||"unpaid",I=document.getElementById("edit-res-payment-progress-type"),C=document.getElementById("edit-res-payment-progress-value"),z=ys(I),w=hs(C),E=document.getElementById("edit-res-project")?.value||"",_=Dr(),D=document.getElementById("edit-res-company-share"),F=document.getElementById("edit-res-tax");if(!l||!c){$(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const x=typeof e=="function"?e:(W,se)=>`${W}T${se||"00:00"}`,L=x(l,d),R=x(c,u);if(L&&R&&new Date(L)>new Date(R)){$(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const j=Ia()?.[bt];if(!j){$(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ke)||ke.length===0&&_.length===0){$(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const O=typeof t=="function"?t:()=>!1,H=j.id??j.reservationId;for(const W of ke){const se=Re(W.barcode);if(se==="reserved"){const ee=J(W.barcode);if(!O(ee,L,R,H))continue}if(se!=="available"){$(ot(se));return}}for(const W of ke){const se=J(W.barcode);if(O(se,L,R,H)){$(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const B=typeof n=="function"?n:()=>!1;for(const W of _)if(B(W,L,R,H)){$(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const q=Array.isArray(ce.projects)&&ce.projects.length?ce.projects:ne().projects||[],N=E&&q.find(W=>String(W.id)===String(E))||null,Q={...j,projectId:E?String(E):null,confirmed:b},{effectiveConfirmed:Z,projectLinked:U,projectStatus:oe}=Ge(Q,N);let X=!!D?.checked,re=!!F?.checked;if(U&&(X&&(D.checked=!1,X=!1),re=!1),!U&&X!==re){$(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}re&&(ve("edit-res-company-share"),X=!!D?.checked);let M=X?getCompanySharePercent("edit-res-company-share"):null;X&&(!Number.isFinite(M)||M<=0)&&(ve("edit-res-company-share"),M=getCompanySharePercent("edit-res-company-share"));const te=X&&re&&Number.isFinite(M)&&M>0,qe=U?!1:re,we=ga(ke,f,g,qe,_,{start:L,end:R,companySharePercent:te?M:0});let xe=Ot();if(Number.isFinite(w)&&w>0){const W=we;let se=null,ee=null;z==="amount"?(se=w,W>0&&(ee=w/W*100)):(ee=w,W>0&&(se=w/100*W));const He=vs({type:z,value:w,amount:se,percentage:ee,recordedAt:new Date().toISOString()});He&&(xe=[...xe,He],Mn(xe)),C&&(C.value="")}const ue=ya({totalAmount:we,history:xe}),Se=ha({manualStatus:y,paidAmount:ue.paidAmount,paidPercent:ue.paidPercent,totalAmount:we});h&&!S&&(h.value=Se,h.dataset&&delete h.dataset.userSelected);let le=j.status??"pending";U?le=N?.status??oe??le:["completed","cancelled"].includes(String(le).toLowerCase())||(le=b?"confirmed":"pending");const me=va({reservationCode:j.reservationCode??j.reservationId??null,customerId:j.customerId,start:L,end:R,status:le,title:j.title??null,location:j.location??null,notes:m,projectId:E?String(E):null,totalAmount:we,discount:f,discountType:g,applyTax:qe,paidStatus:Se,confirmed:Z,items:ke.map(W=>({...W,equipmentId:W.equipmentId??W.id})),technicians:_,companySharePercent:te?M:null,companyShareEnabled:te,paidAmount:ue.paidAmount,paidPercentage:ue.paidPercent,paymentProgressType:ue.paymentProgressType,paymentProgressValue:ue.paymentProgressValue,paymentHistory:xe});try{const W=await Nr(j.id||j.reservationId,me);await jr(),qn(),Mr(),$(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),gs(),i?.({type:"updated",reservation:W}),s?.(),r?.(),vn?.hide?.()}catch(W){console.error("❌ [reservationsEdit] Failed to update reservation",W);const se=ba(W)?W.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");$(se,"error")}}function Yi(e={}){ce={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ce,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=v(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const l=document.getElementById("edit-res-tax");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{xn("tax")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{xn("share")}),d.dataset.listenerAttached="true");const c=document.getElementById("edit-res-payment-progress-type");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{c.dataset.userSelected="true",t?.()}),c.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=v(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const m=document.getElementById("edit-res-project");m&&!m.dataset.listenerAttached&&(m.addEventListener("change",()=>{bs();const h=Array.isArray(ce.projects)&&ce.projects.length?ce.projects:ne().projects||[],S=m.value&&h.find(w=>String(w.id)===String(m.value))||null,I={...ce?.reservation??{},projectId:m.value||null,confirmed:wn()},{effectiveConfirmed:C,projectLinked:z}=Ge(I,S);bn(C,{disable:z}),t?.()}),m.dataset.listenerAttached="true");const p=document.getElementById("edit-res-confirmed-btn");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{if(p.disabled)return;const h=!wn();bn(h),t?.()}),p.dataset.listenerAttached="true");const f=document.getElementById("save-reservation-changes");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{Oi(ce).catch(h=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",h)})}),f.dataset.listenerAttached="true");const g=document.getElementById("edit-res-equipment-barcode");if(g&&!g.dataset.listenerAttached){let h=null;const S=()=>{g.value?.trim()&&(clearTimeout(h),h=null,n?.(g))};g.addEventListener("keydown",I=>{I.key==="Enter"&&(I.preventDefault(),S())});const y=()=>{if(clearTimeout(h),!g.value?.trim())return;const{start:I,end:C}=getEditReservationDateRange();!I||!C||(h=setTimeout(()=>{S()},150))};g.addEventListener("input",y),g.addEventListener("change",S),g.dataset.listenerAttached="true"}fs?.();const b=document.getElementById("editReservationModal");b&&!b.dataset.cleanupAttached&&(b.addEventListener("hidden.bs.modal",()=>{gs(),t?.(),s?.([])}),b.dataset.cleanupAttached="true")}function Ji(){return Or().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ne()||{};Rr(e||[]),ja()})}function Hn(e=null){ja(),ws(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Vi(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Sn(){return{populateEquipmentDescriptionLists:it,setFlatpickrValue:ji,splitDateTime:pa,renderEditItems:Ye,updateEditReservationSummary:be,addEquipmentByDescription:Ni,addEquipmentToEditingReservation:Di,addEquipmentToEditingByDescription:Nt,combineDateTime:ht,hasEquipmentConflict:Fe,hasTechnicianConflict:fa,renderReservations:ws,handleReservationsMutation:Hn,ensureModal:Vi}}function ws(e="reservations-list",t=null){$i({containerId:e,filters:t,onShowDetails:xs,onConfirmReservation:Es})}function xs(e){return ki(e,{getEditContext:Sn,onEdit:(t,{reservation:n})=>{Is(t,n)},onDelete:Ss})}function Ss(e){return ua()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Hr(e,{onAfterChange:Hn}):!1:($r(),!1)}function Es(e){return zr(e,{onAfterChange:Hn})}function Is(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}da(e,Sn());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}da(e,Sn());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}kr({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Zi(){typeof window>"u"||(window.showReservationDetails=xs,window.deleteReservation=Ss,window.confirmReservation=Es,window.editReservation=Is)}export{Fa as a,bo as b,Zi as c,Wi as d,Yi as e,Xi as f,ja as g,Sn as h,Gi as i,Y as j,Hn as k,Ji as l,ws as r,xs as s,be as u};
